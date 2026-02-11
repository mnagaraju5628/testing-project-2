# Use official lightweight Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy application source code
COPY . .

# Expose application port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
