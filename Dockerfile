# Use official Node 16 image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY . .

# Expose port 8080 inside container
EXPOSE 8080

# Run the app
CMD ["node", "index.js"]
