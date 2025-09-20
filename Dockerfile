# Use Python slim base
FROM python:3.11-slim

# Install dependencies
RUN apt-get update && apt-get install -y ffmpeg curl git

# Upgrade pip and install yt-dlp
RUN pip install --upgrade yt-dlp

# Install Node
RUN apt-get install -y nodejs npm

# Set working directory
WORKDIR /app

# Copy Node files
COPY package*.json ./
RUN npm install --production
COPY server.js ./

# Expose port
EXPOSE 3000

# Start Node server
CMD ["node", "server.js"]