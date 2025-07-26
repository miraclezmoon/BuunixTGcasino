# Use the official Node LTS image
FROM node:18-alpine

# Set working dir
WORKDIR /app

# Copy package definitions
COPY package.json package-lock.json ./

# Install only production deps
RUN npm ci --omit=dev

# Copy the rest of your code
COPY . .

# Expose port if needed
EXPOSE 3001

# Start your server with tsx
CMD ["npx", "tsx", "src/server.ts"]
