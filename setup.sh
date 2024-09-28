#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    color=$1
    message=$2
    echo -e "${color}${message}${NC}"
}

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    print_color $YELLOW "npm could not be found. Please install Node.js and npm first."
    exit 1
fi

# Install dependencies
print_color $GREEN "Installing dependencies..."
npm install @observablehq/plot @mui/material @emotion/react @emotion/styled @mui/icons-material

# Update package.json scripts
print_color $GREEN "Updating package.json scripts..."
npm pkg set scripts.dev="electron-vite dev"
npm pkg set scripts.build="electron-vite build"
npm pkg set scripts.preview="electron-vite preview"

# Start the development server
print_color $GREEN "Starting the development server..."
npm run dev

print_color $GREEN "Setup complete! Your development server should now be running."