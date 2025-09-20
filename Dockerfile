FROM python:3.11-bullseye

# Install dependencies
RUN apt-get update && \
    apt-get install -y ffmpeg curl git build-essential libffi-dev libssl-dev

# Upgrade pip and install yt-dlp
RUN pip install --upgrade pip yt-dlp

# Install Node
RUN apt-get install -y nodejs npm

# Set working directory
WORKDIR /app

# Copy Node files
COPY package*.json ./
RUN npm install --production
COPY server.js ./

EXPOSE 3000

# Start Node server
CMD ["node", "server.js"]