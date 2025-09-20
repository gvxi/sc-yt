FROM python:3.11-slim AS builder
RUN apt-get update && apt-get install -y curl ffmpeg
RUN pip install yt-dlp

FROM node:20-slim
WORKDIR /app
COPY --from=builder /usr/local/bin/yt-dlp /usr/local/bin/yt-dlp
COPY package*.json ./
RUN npm install --production
COPY server.js ./
EXPOSE 3000
CMD ["node", "server.js"]
