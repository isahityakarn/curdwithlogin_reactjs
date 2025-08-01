#!/bin/bash

# Development startup script
echo "🚀 Starting development environment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📱 Frontend (React):${NC} This project runs on http://localhost:3000"
echo -e "${BLUE}🔄 Auto-reload:${NC} Enabled by default with React"
echo ""
echo -e "${GREEN}🔧 Backend Server:${NC} Should be running on http://localhost:5050"
echo -e "${GREEN}📍 Backend Location:${NC} /Users/sahityakarn/Documents/nodejs/node-curdwithlogin/"
echo -e "${GREEN}🔄 Auto-restart:${NC} Already configured with nodemon"
echo ""
echo "📋 Development Commands:"
echo "  Frontend: npm start (in this directory)"
echo "  Backend:  npm run server (in backend directory)"
echo ""
echo "✅ Ready for development!"
echo "   - Change frontend files → Browser auto-refreshes"
echo "   - Change backend files → Server auto-restarts"
