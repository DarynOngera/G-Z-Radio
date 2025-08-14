# 💳 M-Pesa Payment Gateway Setup Guide

This guide will help you configure the M-Pesa payment gateway for The G'z Radio website, enabling both premium music streaming payments and merchandise purchases.

## 🎯 Overview

The payment system supports two main use cases:
- **🎵 Premium Music Access**: Pay-to-listen streaming (KSh 99/week or KSh 299/month)
- **🛍️ Merchandise Purchases**: E-commerce checkout for clothing and accessories

## 📋 Prerequisites

1. **Safaricom Developer Account**: Register at [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. **M-Pesa Business Account**: Required for live payments
3. **Netlify Account**: For hosting serverless functions

## 🔧 M-Pesa API Setup

### Step 1: Create M-Pesa App
1. Log into Safaricom Developer Portal
2. Create a new app and select "M-Pesa Express (STK Push)"
3. Note down your **Consumer Key** and **Consumer Secret**

### Step 2: Get Business Shortcode
- **Sandbox**: Use `174379` (provided)
- **Production**: Use your actual M-Pesa business shortcode

### Step 3: Generate Passkey
- **Sandbox**: Use the test passkey provided by Safaricom
- **Production**: Generate from your M-Pesa business portal

## 🌐 Environment Configuration

### 1. Create Environment Variables

In your Netlify dashboard, go to **Site Settings > Environment Variables** and add:

```bash
# M-Pesa Configuration
MPESA_CONSUMER_KEY=your_consumer_key_here
MPESA_CONSUMER_SECRET=your_consumer_secret_here
MPESA_BUSINESS_SHORTCODE=174379
MPESA_PASSKEY=your_passkey_here
MPESA_CALLBACK_URL=https://your-site.netlify.app/.netlify/functions/payment-callback

# Newsletter (Optional)
BUTTONDOWN_API_KEY=your_buttondown_key_here
```

### 2. Update Callback URL

Replace `your-site.netlify.app` with your actual Netlify domain in:
- Environment variables
- M-Pesa app configuration on Safaricom portal

## 🚀 Deployment

### 1. Deploy to Netlify

The site is configured for Netlify deployment with:
- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

### 2. Test Payment Functions

After deployment, test the endpoints:
- Payment Gateway: `https://your-site.netlify.app/.netlify/functions/payment-gateway`
- Payment Callback: `https://your-site.netlify.app/.netlify/functions/payment-callback`

## 🧪 Testing

### Sandbox Testing
1. Use Safaricom sandbox credentials
2. Test phone numbers: `254708374149`, `254711082300`
3. Use test amounts: `1`, `10`, `100`

### Test Scenarios
1. **Premium Music Payment**:
   - Go to `/listen`
   - Select weekly (KSh 99) or monthly (KSh 299)
   - Enter test phone number
   - Complete M-Pesa prompt

2. **Merchandise Payment**:
   - Add items to cart
   - Click "Checkout"
   - Enter test phone number
   - Complete M-Pesa prompt

## 📱 User Experience Flow

### Premium Music Access
1. User visits `/listen` page
2. Premium gate displays pricing options
3. User selects plan and clicks "Get Premium"
4. Payment modal opens with phone input
5. M-Pesa STK push sent to phone
6. User completes payment on phone
7. Premium access granted automatically
8. Audio player unlocked

### Merchandise Purchase
1. User adds items to cart
2. Cart shows floating button with item count
3. User clicks cart and reviews items
4. User clicks "Checkout"
5. Payment modal opens with order summary
6. M-Pesa STK push sent to phone
7. User completes payment on phone
8. Order confirmed, cart cleared

## 🔒 Security Features

- **Phone Validation**: Kenyan format (254XXXXXXXXX)
- **Amount Validation**: Prevents negative/invalid amounts
- **Environment Variables**: Secure API key storage
- **Error Handling**: Comprehensive error management
- **Callback Verification**: Validates payment confirmations

## 📊 Monitoring & Analytics

### Payment Tracking
- All payments logged in browser localStorage
- Order history available in `/account` page
- Premium access status tracking

### Error Monitoring
- Check Netlify function logs for payment errors
- Monitor M-Pesa callback responses
- Track failed payment attempts

## 🛠️ Troubleshooting

### Common Issues

1. **"Payment system not available"**
   - Check environment variables are set
   - Verify Netlify functions are deployed
   - Check function logs for errors

2. **"Invalid phone number"**
   - Ensure format: 254XXXXXXXXX (Kenyan numbers only)
   - Remove spaces, dashes, or other characters

3. **"Payment failed"**
   - Check M-Pesa account balance
   - Verify business shortcode is active
   - Check callback URL is accessible

4. **Premium access not granted**
   - Check browser localStorage for `gz-premium-access`
   - Verify payment callback was received
   - Check function logs for callback processing

### Debug Steps
1. Open browser developer tools
2. Check console for JavaScript errors
3. Monitor network tab for API calls
4. Check Netlify function logs
5. Verify M-Pesa callback delivery

## 📞 Support

### M-Pesa Support
- Developer Portal: [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
- Documentation: M-Pesa Express API docs
- Support Email: apisupport@safaricom.co.ke

### Technical Support
- Check function logs in Netlify dashboard
- Review browser console for client-side errors
- Test with sandbox credentials first

## 🔄 Going Live

### Production Checklist
- [ ] Replace sandbox credentials with production keys
- [ ] Update business shortcode to live shortcode
- [ ] Test with real phone numbers and small amounts
- [ ] Update callback URL to production domain
- [ ] Monitor initial transactions closely
- [ ] Set up proper error alerting

### Post-Launch
- Monitor payment success rates
- Track user conversion from free to premium
- Analyze cart abandonment vs. payment completion
- Gather user feedback on payment experience

---

## 🎵 Ready to Rock!

Your M-Pesa payment gateway is now configured and ready to process payments for both premium music access and merchandise purchases. The system maintains the hip-hop aesthetic while providing a seamless, secure payment experience.

**Test thoroughly in sandbox before going live!** 🚀
