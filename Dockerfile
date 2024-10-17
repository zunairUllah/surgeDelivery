# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Parcel project
RUN npm run build

# Expose the port that the app will run on
EXPOSE 8080

# Start the Express server
CMD ["node", "index.js"]
