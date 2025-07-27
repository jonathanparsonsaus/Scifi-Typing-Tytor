// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY_FILE = path.join(__dirname, 'api-key.txt');

// Helper functions for API key management
function saveApiKey(apiKey) {
    try {
        fs.writeFileSync(API_KEY_FILE, apiKey.trim(), 'utf8');
        console.log('✅ API key saved to file');
        return true;
    } catch (error) {
        console.error('❌ Error saving API key:', error);
        return false;
    }
}

function loadApiKey() {
    try {
        if (fs.existsSync(API_KEY_FILE)) {
            const apiKey = fs.readFileSync(API_KEY_FILE, 'utf8').trim();
            console.log('🔑 API key loaded from file');
            return apiKey;
        }
    } catch (error) {
        console.error('❌ Error loading API key:', error);
    }
    return null;
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve your HTML file from 'public' folder

// Endpoint to save API key
app.post('/api/save-key', (req, res) => {
    try {
        const { apiKey } = req.body;
        
        if (!apiKey || !apiKey.trim()) {
            return res.status(400).json({ error: 'API key is required' });
        }

        const success = saveApiKey(apiKey);
        if (success) {
            res.json({ success: true, message: 'API key saved successfully' });
        } else {
            res.status(500).json({ error: 'Failed to save API key' });
        }
    } catch (error) {
        console.error('Error in save-key endpoint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to get saved API key
app.get('/api/get-key', (req, res) => {
    try {
        const apiKey = loadApiKey();
        res.json({ apiKey: apiKey || '' });
    } catch (error) {
        console.error('Error in get-key endpoint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Proxy endpoint for OpenAI API
app.post('/api/generate-story', async (req, res) => {
    try {
        let { apiKey, storyLength } = req.body;
        
        // If no API key provided in request, try to load from file
        if (!apiKey) {
            apiKey = loadApiKey();
        }
        
        if (!apiKey) {
            return res.status(400).json({ error: 'No API key available. Please save an API key first.' });
        }

        const lengthMap = {
            'short': '50-100 words',
            'medium': '100-200 words',
            'long': '200-300 words'
        };

        const wordCount = lengthMap[storyLength] || '100-200 words';

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{
                    role: 'user',
                    content: `Write an engaging sci-fi story for typing practice. Make it exactly ${wordCount}. Include space adventures, aliens, futuristic technology, or other sci-fi elements. Make it exciting but appropriate for all ages. Focus on action and adventure. Don't include quotation marks or special characters that might be hard to type.`
                }],
                max_tokens: 500,
                temperature: 0.8
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            return res.status(response.status).json({ 
                error: `OpenAI API error: ${response.status}`,
                details: errorData
            });
        }

        const data = await response.json();
        res.json({ story: data.choices[0].message.content.trim() });

    } catch (error) {
        console.error('Error generating story:', error);
        res.status(500).json({ 
            error: 'Internal server error', 
            details: error.message 
        });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Sci-Fi Typing Tutor server running at http://localhost:${PORT}`);
    console.log(`🌐 Network access: http://[YOUR_IP]:${PORT}`);
    console.log(`📁 Place your HTML file in the 'public' folder as 'index.html'`);
    console.log(`🔑 API key file: ${API_KEY_FILE}`);
    
    // Check if API key already exists
    const existingKey = loadApiKey();
    if (existingKey) {
        console.log(`✅ Found existing API key (${existingKey.substring(0, 7)}...)`);
    } else {
        console.log(`⚠️  No API key found - users will need to set one`);
    }
    
    // Try to show the actual IP address
    const networkInterfaces = os.networkInterfaces();
    
    console.log('\n📡 Available network addresses:');
    Object.keys(networkInterfaces).forEach(interfaceName => {
        networkInterfaces[interfaceName].forEach(interface => {
            if (interface.family === 'IPv4' && !interface.internal) {
                console.log(`   http://${interface.address}:${PORT}`);
            }
        });
    });
});
