# Use a small and secure base image
FROM node:lts-alpine

# Set environment variables
ENV NODE_ENV=production

# Set working directory (Best Practice)
WORKDIR /usr/src/app

# Add a non-root user (Security Best Practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /usr/src/app

# Copy package files first (Leverage Docker caching)
COPY package*.json package-lock.json ./

# Install dependencies efficiently
RUN npm ci --omit=dev

# Copy only necessary files (Better performance)
COPY . .

# Switch to the non-root user
USER appuser

# Expose the application port (if applicable)
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
