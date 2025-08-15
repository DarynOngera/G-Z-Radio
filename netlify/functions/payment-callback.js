// M-Pesa Payment Callback Handler
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
    const callbackData = JSON.parse(event.body);
    
    console.log('Payment callback received:', JSON.stringify(callbackData, null, 2));

    // Extract callback data
    const { Body } = callbackData;
    const { stkCallback } = Body;
    
    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata
    } = stkCallback;

    // Process successful payment
    if (ResultCode === 0) {
      // Extract payment details from metadata
      const metadata = CallbackMetadata?.Item || [];
      const paymentDetails = {};
      
      metadata.forEach(item => {
        switch (item.Name) {
          case 'Amount':
            paymentDetails.amount = item.Value;
            break;
          case 'MpesaReceiptNumber':
            paymentDetails.receiptNumber = item.Value;
            break;
          case 'TransactionDate':
            paymentDetails.transactionDate = item.Value;
            break;
          case 'PhoneNumber':
            paymentDetails.phoneNumber = item.Value;
            break;
        }
      });

      console.log('Payment successful:', {
        merchantRequestId: MerchantRequestID,
        checkoutRequestId: CheckoutRequestID,
        ...paymentDetails
      });

      // Here you would:
      // 1. Update database with payment status
      // 2. Grant access to premium content (for music payments)
      // 3. Process order fulfillment (for merchandise payments)
      // 4. Send confirmation emails/SMS
      
      // For now, just log the successful payment
      console.log('Payment processed successfully');

    } else {
      // Payment failed or was cancelled
      console.log('Payment failed:', {
        merchantRequestId: MerchantRequestID,
        checkoutRequestId: CheckoutRequestID,
        resultCode: ResultCode,
        resultDesc: ResultDesc
      });
    }

    // Always return success to M-Pesa to acknowledge receipt
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ResultCode: 0,
        ResultDesc: 'Callback received successfully'
      })
    };

  } catch (error) {
    console.error('Callback processing error:', error);
    
    // Still return success to M-Pesa to avoid retries
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ResultCode: 0,
        ResultDesc: 'Callback processed'
      })
    };
  }
};
