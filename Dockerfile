# Use official lightweight Node image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (better layer caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy remaining application files
COPY . .

# Expose application port
EXPOSE 8080

# Run the application
CMD ["node", "index.js"]
