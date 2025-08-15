const crypto = require('crypto');

// Payment Gateway Handler for M-Pesa STK Push
exports.handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('Payment gateway called with:', { 
      method: event.httpMethod, 
      body: event.body ? 'present' : 'missing' 
    });
    
    const { phone, amount, type, items } = JSON.parse(event.body);
    console.log('Parsed request:', { phone, amount, type, itemCount: items?.length || 0 });
    
    // Validate input
    if (!phone || !amount || !type) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Validate phone number format (Kenyan format)
    if (!/^254\d{9}$/.test(phone)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Invalid phone number format. Use 254XXXXXXXXX' })
      };
    }

    // M-Pesa Sandbox API configuration (using your working credentials)
    const consumerKey = process.env.MPESA_CONSUMER_KEY || 'pYKnZuuiIZJwiFCzjfHuvm8JyPrInXucAfEMk9vOJ6NRIrhH';
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET || 'dqAW02BRFLyB2NSacjRKVRQayjDwBureGnUYzmA5Ybi1ehusH6ho92WMpNcNC7aP';
    const businessShortCode = process.env.MPESA_BUSINESS_SHORTCODE || '174379';
    const passkey = process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
    // Use deployed site URL for callback if not set in environment
    const callbackUrl = process.env.MPESA_CALLBACK_URL || `${event.headers.origin || 'https://ongera.netlify.app'}/.netlify/functions/payment-callback`;

    console.log('M-Pesa Configuration:', {
      hasConsumerKey: !!consumerKey,
      consumerKeyLength: consumerKey?.length,
      consumerKeyStart: consumerKey?.substring(0, 10) + '...',
      hasConsumerSecret: !!consumerSecret,
      consumerSecretLength: consumerSecret?.length,
      businessShortCode,
      hasPasskey: !!passkey,
      passkeyLength: passkey?.length,
      callbackUrl
    });

    if (!consumerKey || !consumerSecret || !passkey) {
      console.error('Missing M-Pesa credentials:', { 
        hasConsumerKey: !!consumerKey, 
        hasConsumerSecret: !!consumerSecret, 
        hasPasskey: !!passkey 
      });
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Payment service configuration error' })
      };
    }

    // Generate access token
    console.log('Generating M-Pesa access token...');
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    console.log('Generated auth string length:', auth.length);
    console.log('Auth string preview:', auth.substring(0, 20) + '...');
    
    // Get access token (using sandbox URL)
    const authUrl = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    console.log('Calling auth URL:', authUrl);
    
    const tokenResponse = await fetch(authUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    console.log('Token response status:', tokenResponse.status);
    console.log('Token response headers:', Object.fromEntries(tokenResponse.headers.entries()));
    
    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token request failed:', { 
        status: tokenResponse.status, 
        statusText: tokenResponse.statusText,
        error: errorText,
        url: authUrl,
        authHeader: `Basic ${auth.substring(0, 20)}...`
      });
      throw new Error(`Failed to get access token: ${tokenResponse.statusText} - ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    console.log('Token data received:', { hasAccessToken: !!tokenData.access_token });
    const accessToken = tokenData.access_token;

    // Generate timestamp and password
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString('base64');

    // Determine account reference based on payment type
    let accountReference, transactionDesc;
    
    if (type === 'music') {
      accountReference = `GZ-MUSIC-${Date.now()}`;
      transactionDesc = 'G\'z Radio Premium Music Access';
    } else if (type === 'merchandise') {
      accountReference = `GZ-MERCH-${Date.now()}`;
      transactionDesc = 'G\'z Radio Merchandise Purchase';
    } else {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Invalid payment type' })
      };
    }

    // STK Push request
    const stkPushPayload = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: phone,
      PartyB: businessShortCode,
      PhoneNumber: phone,
      CallBackURL: callbackUrl,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc
    };

    // Send STK Push request (using sandbox URL)
    const stkUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    const stkResponse = await fetch(stkUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stkPushPayload)
    });

    const stkData = await stkResponse.json();

    if (stkData.ResponseCode === '0') {
      // Store transaction details for callback processing
      // In production, you'd store this in a database
      console.log('Payment initiated:', {
        checkoutRequestId: stkData.CheckoutRequestID,
        merchantRequestId: stkData.MerchantRequestID,
        type,
        amount,
        phone,
        items: type === 'merchandise' ? items : null
      });

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: true,
          message: 'Payment request sent. Please check your phone to complete the transaction.',
          checkoutRequestId: stkData.CheckoutRequestID,
          merchantRequestId: stkData.MerchantRequestID
        })
      };
    } else {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: false,
          error: stkData.errorMessage || 'Payment initiation failed'
        })
      };
    }

  } catch (error) {
    console.error('Payment gateway error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};
