exports.handler = async (event, context) => {
  // Add CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Better error handling for JSON parsing
    let email, consent;
    try {
      const body = JSON.parse(event.body || '{}');
      email = body.email;
      consent = body.consent;
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      };
    }

    // Validate input
    if (!email || !consent) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email and consent are required' })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Buttondown API integration
    const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY || '52ca1fee-4e89-4b46-961e-a10240c1c00f';
    
    console.log('Using API key:', BUTTONDOWN_API_KEY ? 'Found' : 'Missing');

    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        tags: ['website-signup'],
        metadata: {
          source: 'gz-radio-website',
          consent_date: new Date().toISOString(),
          user_agent: event.headers['user-agent'] || 'unknown'
        }
      })
    });

    if (response.ok) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: 'Successfully subscribed to newsletter!' 
        })
      };
    } else {
      const errorData = await response.text();
      console.error('Buttondown API error:', errorData);
      
      // Handle duplicate email gracefully
      if (response.status === 400 && errorData.includes('already exists')) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            success: true, 
            message: 'You are already subscribed!' 
          })
        };
      }

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to subscribe. Please try again.' })
      };
    }

  } catch (error) {
    console.error('Newsletter signup error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
