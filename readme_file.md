# 🚀 Sci-Fi Typing Tutor

An interactive typing tutor that uses AI to generate engaging sci-fi stories while tracking your typing speed, accuracy, and progress in real-time. Features a futuristic interface with glowing effects and space-themed design.

![Sci-Fi Typing Tutor Interface](https://img.shields.io/badge/Status-Active-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🤖 AI-Powered Story Generation
- Uses OpenAI's API to create unique sci-fi stories
- Three length options: Short (50-100 words), Medium (100-200 words), Long (200-300 words)
- Stories feature space adventures, aliens, futuristic technology, and more
- Fallback to pre-written stories when API is unavailable

### 📊 Real-Time Performance Tracking
- **Words Per Minute (WPM)** - Live calculation as you type
- **Accuracy Percentage** - Tracks errors vs correct words
- **Progress Indicator** - Visual completion percentage
- **Timer** - Elapsed time display with minutes:seconds format

### 🎯 Interactive Typing Interface
- **Word highlighting** - Current word glows with sci-fi effects
- **Error detection** - Incorrect words turn red immediately
- **Completed words** fade out as you progress
- **Spacebar support** - Natural word-by-word progression
- **Backspace support** - Correct mistakes within words

### 🌐 Network Sharing
- **Shared API keys** - Save once, use across all network devices
- **Multi-device access** - Use from phones, tablets, other computers
- **Persistent storage** - API keys survive server restarts

### 🎨 Futuristic Design
- Space-themed color scheme with glowing cyan effects
- Animated borders and smooth transitions
- Responsive design for all screen sizes
- Dark theme optimized for extended typing sessions

## 🛠️ Installation

### Prerequisites
- Node.js 14+ installed on your system
- OpenAI API key (optional, for AI-generated stories)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/scifi-typing-tutor.git
   cd scifi-typing-tutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Local access: `http://localhost:3000`
   - Network access: Use the IP addresses shown in terminal

### Alternative Installation Methods

#### Method 1: Simple Static Server (No AI Generation)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npm install -g http-server
http-server -p 8000

# Using PHP
php -S localhost:8000
```
Then open `http://localhost:8000` and navigate to your HTML file.

#### Method 2: Development Mode
```bash
npm run dev  # Uses nodemon for auto-restart
```

## 🔧 Configuration

### Setting Up OpenAI API Key

1. **Get an API key** from [OpenAI](https://platform.openai.com/api-keys)
2. **In the app interface:**
   - Enter your API key in the configuration panel
   - Click "Save Key"
   - The key is saved to `api-key.txt` on the server
   - All users on your network can now generate AI stories

### Network Access Setup

The server automatically binds to all network interfaces (`0.0.0.0`). When you start the server, it will display available network addresses:

```
🚀 Sci-Fi Typing Tutor server running at http://localhost:3000
📡 Available network addresses:
   http://192.168.1.100:3000
   http://192.168.0.165:3000
```

Other devices on your network can access these URLs directly.

### Firewall Configuration

If other devices can't connect:

**Windows:**
- Allow Node.js through Windows Firewall
- Or temporarily disable firewall for testing

**macOS:**
```bash
sudo pfctl -d  # Disable firewall temporarily
```

**Linux:**
```bash
sudo ufw allow 3000  # Allow port 3000
```

## 📁 Project Structure

```
scifi-typing-tutor/
├── server.js              # Express server with API endpoints
├── package.json           # Node.js dependencies and scripts
├── api-key.txt           # Auto-generated API key storage (gitignored)
├── public/
│   └── index.html        # Main application interface
├── node_modules/         # Dependencies (auto-generated)
└── README.md            # This file
```

## 🔌 API Endpoints

### `GET /api/get-key`
Retrieves the saved OpenAI API key.

### `POST /api/save-key`
Saves an OpenAI API key to the server.
```json
{
  "apiKey": "sk-..."
}
```

### `POST /api/generate-story`
Generates a new sci-fi story using the saved API key.
```json
{
  "storyLength": "medium"  // "short", "medium", or "long"
}
```

## 🚀 Usage

1. **Start the server** using `npm start`
2. **Open the application** in your browser
3. **Set your API key** (optional, for AI stories)
4. **Choose story length** and click "Generate New Story"
5. **Start typing** the displayed text
6. **Watch your stats** improve in real-time!

### Tips for Better Typing Practice
- Focus on accuracy first, speed will follow
- Use the spacebar to advance between words naturally
- Take breaks to avoid fatigue
- Try different story lengths to challenge yourself
- Practice regularly for consistent improvement

## 🛠️ Development

### Running in Development Mode
```bash
npm run dev  # Auto-restarts server on file changes
```

### Adding New Features
- **Stories**: Add to the `fallbackStories` array in the HTML file
- **Themes**: Modify CSS variables for different color schemes
- **Stats**: Extend the stats tracking in the `updateStats()` method
- **API**: Add new endpoints in `server.js`

### Environment Variables
```bash
PORT=3000  # Server port (default: 3000)
```

## 🐛 Troubleshooting

### Common Issues

**"This site can't be reached" from other devices:**
- Ensure both devices are on the same network
- Check firewall settings
- Try using different network addresses shown in terminal

**"API key not working":**
- Verify your OpenAI API key is valid
- Check your OpenAI account has available credits
- Ensure the key has proper permissions

**"Server won't start":**
- Check if port 3000 is already in use
- Try a different port: `PORT=3001 npm start`
- Verify Node.js is installed correctly

**"Stories not generating":**
- Check browser console for errors
- Verify API key is saved properly
- Fallback stories should still work

### Getting Help
- Check the browser console for error messages
- Review server logs in the terminal
- Ensure all dependencies are installed with `npm install`

## 📝 License

MIT License - feel free to use, modify, and distribute this project.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 🌟 Features Coming Soon

- [ ] Multiple typing modes (words, sentences, paragraphs)
- [ ] User profiles and history tracking
- [ ] Leaderboards for network competitions
- [ ] Custom story themes beyond sci-fi
- [ ] Keyboard heatmap visualization
- [ ] Mobile app version
- [ ] Offline mode improvements

## 📊 Stats & Metrics

The application tracks comprehensive typing metrics:
- **Real-time WPM calculation**
- **Character-level accuracy tracking**
- **Error rate analysis**
- **Session progress monitoring**
- **Time-based performance metrics**

## 🎯 Perfect For

- **Students** learning to type faster
- **Professionals** improving keyboard skills
- **Gamers** wanting better reaction times  
- **Writers** building muscle memory
- **Anyone** who loves sci-fi and wants to type better!

---

**Happy typing, space cadet! 🚀✨**

*Made with ❤️ for the typing community*