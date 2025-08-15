// Direct M-Pesa Sandbox API Test
const https = require('https');
const crypto = require('crypto');

// M-Pesa Sandbox Credentials
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const BUSINESS_SHORTCODE = process.env.MPESA_BUSINESS_SHORTCODE;
const PASSKEY = process.env.MPESA_PASSKEY;
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL;

// Helper function to make HTTP requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ status: res.statusCode, data: jsonBody });
        } catch (error) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Step 1: Get Access Token
async function getAccessToken() {
  console.log('🔑 Getting M-Pesa access token...');
  
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  
  const options = {
    hostname: 'sandbox.safaricom.co.ke',
    path: '/oauth/v1/generate?grant_type=client_credentials',
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`
    }
  };

  try {
    const response = await makeRequest(options);
    
    console.log('Token Response Status:', response.status);
    console.log('Token Response Data:', response.data);
    
    if (response.status === 200 && response.data.access_token) {
      console.log('✅ Access token obtained successfully');
      return response.data.access_token;
    } else {
      console.log('❌ Failed to get access token');
      return null;
    }
  } catch (error) {
    console.error('❌ Token request error:', error.message);
    return null;
  }
}

// Step 2: Send STK Push
async function sendSTKPush(accessToken, phone = '254708374149', amount = 1) {
  console.log('\n📱 Sending STK Push...');
  console.log('Phone:', phone);
  console.log('Amount: KSh', amount);
  
  // Generate timestamp and password
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  const password = Buffer.from(`${BUSINESS_SHORTCODE}${PASSKEY}${timestamp}`).toString('base64');
  
  console.log('Timestamp:', timestamp);
  console.log('Password generated:', password.substring(0, 20) + '...');
  
  const stkData = {
    BusinessShortCode: BUSINESS_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone,
    PartyB: BUSINESS_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: CALLBACK_URL,
    AccountReference: 'GZ-Radio-Test',
    TransactionDesc: 'Test Payment for G\'z Radio'
  };
  
  const options = {
    hostname: 'sandbox.safaricom.co.ke',
    path: '/mpesa/stkpush/v1/processrequest',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    console.log('STK Push Data:', JSON.stringify(stkData, null, 2));
    
    const response = await makeRequest(options, stkData);
    
    console.log('\nSTK Push Response Status:', response.status);
    console.log('STK Push Response Data:', JSON.stringify(response.data, null, 2));
    
    if (response.status === 200 && response.data.ResponseCode === '0') {
      console.log('✅ STK Push sent successfully!');
      console.log('📋 Checkout Request ID:', response.data.CheckoutRequestID);
      console.log('📋 Merchant Request ID:', response.data.MerchantRequestID);
      console.log('📱 Check phone', phone, 'for M-Pesa prompt');
      return response.data;
    } else {
      console.log('❌ STK Push failed');
      console.log('Error Code:', response.data.ResponseCode);
      console.log('Error Description:', response.data.ResponseDescription);
      return null;
    }
  } catch (error) {
    console.error('❌ STK Push error:', error.message);
    return null;
  }
}

// Main test function
async function testMpesaSandbox() {
  console.log('🧪 Testing M-Pesa Sandbox API Direct Connection');
  console.log('=' .repeat(60));
  
  // Step 1: Get access token
  const accessToken = await getAccessToken();
  
  if (!accessToken) {
    console.log('\n❌ Cannot proceed without access token');
    return;
  }
  
  // Step 2: Send STK Push
  const stkResult = await sendSTKPush(accessToken);
  
  if (stkResult) {
    console.log('\n🎉 Test completed successfully!');
    console.log('Next steps:');
    console.log('1. Check the test phone for M-Pesa prompt');
    console.log('2. Complete the payment on the phone');
    console.log('3. M-Pesa will send callback to:', CALLBACK_URL);
  } else {
    console.log('\n❌ Test failed');
  }
  
  console.log('\n' + '=' .repeat(60));
}

// Test different scenarios
async function runAllTests() {
  console.log('🚀 Running comprehensive M-Pesa Sandbox tests\n');
  
  // Test 1: Standard test
  console.log('📋 TEST 1: Standard Payment (KSh 1)');
  await testMpesaSandbox();
  
  console.log('\n📋 TEST 2: Different Amount (KSh 10)');
  const accessToken = await getAccessToken();
  if (accessToken) {
    await sendSTKPush(accessToken, '254708374149', 10);
  }
  
  console.log('\n📋 TEST 3: Different Phone Number');
  const accessToken2 = await getAccessToken();
  if (accessToken2) {
    await sendSTKPush(accessToken2, '254711082300', 1);
  }
  
  console.log('\n🏁 All tests completed!');
}

// Run the tests
if (require.main === module) {
  const testType = process.argv[2] || 'basic';
  
  if (testType === 'all') {
    runAllTests().catch(console.error);
  } else {
    testMpesaSandbox().catch(console.error);
  }
}

module.exports = { testMpesaSandbox, runAllTests };
