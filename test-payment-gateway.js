// Local Test Script for M-Pesa Payment Gateway
const path = require('path');
const fs = require('fs');

// Load the payment gateway function
let handler;
try {
  const paymentGatewayPath = path.join(__dirname, 'netlify', 'functions', 'payment-gateway.js');
  const paymentGatewayCode = fs.readFileSync(paymentGatewayPath, 'utf8');
  
  // Create a simple module context
  const module = { exports: {} };
  const exports = module.exports;
  const require = (moduleName) => {
    if (moduleName === 'crypto') return require('crypto');
    throw new Error(`Module ${moduleName} not available in test context`);
  };
  
  // Execute the payment gateway code
  eval(paymentGatewayCode);
  handler = module.exports.handler;
} catch (error) {
  console.error('Failed to load payment gateway:', error.message);
  process.exit(1);
}

// Test the payment gateway function locally
async function testPaymentGateway() {
  console.log('🧪 Testing M-Pesa Payment Gateway locally...\n');

  // Mock event object (simulates Netlify function call)
  const mockEvent = {
    httpMethod: 'POST',
    headers: {
      'content-type': 'application/json',
      'origin': 'http://localhost:4321'
    },
    body: JSON.stringify({
      phone: '254708374149', // Safaricom test number
      amount: 1, // Small test amount
      type: 'music',
      description: 'Test Premium Music Access'
    })
  };

  // Mock context object
  const mockContext = {};

  try {
    console.log('📱 Sending test payment request...');
    console.log('Phone:', '254708374149');
    console.log('Amount: KSh 1');
    console.log('Type: music\n');

    const result = await handler(mockEvent, mockContext);
    
    console.log('📊 Response Status:', result.statusCode);
    console.log('📋 Response Headers:', result.headers);
    
    const responseBody = JSON.parse(result.body);
    console.log('📄 Response Body:', JSON.stringify(responseBody, null, 2));

    if (result.statusCode === 200 && responseBody.success) {
      console.log('\n✅ Payment gateway test SUCCESSFUL!');
      console.log('🎯 STK Push should be sent to phone 254708374149');
      console.log('📱 Check the test phone for M-Pesa prompt');
    } else {
      console.log('\n❌ Payment gateway test FAILED');
      console.log('Error:', responseBody.error);
      if (responseBody.details) {
        console.log('Details:', responseBody.details);
      }
    }

  } catch (error) {
    console.error('\n💥 Test script error:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Test different scenarios
async function runAllTests() {
  console.log('🚀 Starting M-Pesa Payment Gateway Tests\n');
  console.log('=' .repeat(50));
  
  // Test 1: Valid payment request
  console.log('\n📋 TEST 1: Valid Payment Request');
  await testPaymentGateway();
  
  console.log('\n' + '=' .repeat(50));
  
  // Test 2: Invalid phone number
  console.log('\n📋 TEST 2: Invalid Phone Number');
  const invalidPhoneEvent = {
    httpMethod: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      phone: '0708374149', // Invalid format
      amount: 1,
      type: 'music'
    })
  };
  
  try {
    const result = await handler(invalidPhoneEvent, {});
    const responseBody = JSON.parse(result.body);
    console.log('Status:', result.statusCode);
    console.log('Response:', responseBody);
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  console.log('\n' + '=' .repeat(50));
  
  // Test 3: Missing required fields
  console.log('\n📋 TEST 3: Missing Required Fields');
  const missingFieldsEvent = {
    httpMethod: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      phone: '254708374149'
      // Missing amount and type
    })
  };
  
  try {
    const result = await handler(missingFieldsEvent, {});
    const responseBody = JSON.parse(result.body);
    console.log('Status:', result.statusCode);
    console.log('Response:', responseBody);
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  console.log('\n🏁 All tests completed!');
}

// Run the tests
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = { testPaymentGateway, runAllTests };
