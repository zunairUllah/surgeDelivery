# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies for building)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application using Parcel
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Create a simple Express server
COPY server.js ./

# Start the application using Node
CMD ["node", "server.js"]
