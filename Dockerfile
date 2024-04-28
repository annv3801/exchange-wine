# Start from the official Node.js LTS image
FROM node:18

# Set the working directory
WORKDIR /app
EXPOSE 19067
# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy all files
COPY . .

# Build the Next.js app
RUN npm run build

# Run npm start script
CMD [ "npm", "run", "dev" ]