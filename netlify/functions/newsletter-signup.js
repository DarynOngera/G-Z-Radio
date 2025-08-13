exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email, consent } = JSON.parse(event.body);

    // Validate input
    if (!email || !consent) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and consent are required' })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Buttondown API integration
    const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;
    
    if (!BUTTONDOWN_API_KEY) {
      console.error('BUTTONDOWN_API_KEY not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

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
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
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
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
          body: JSON.stringify({ 
            success: true, 
            message: 'You are already subscribed!' 
          })
        };
      }

      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to subscribe. Please try again.' })
      };
    }

  } catch (error) {
    console.error('Newsletter signup error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
