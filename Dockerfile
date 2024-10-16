FROM node:19-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy package.json and package-lock.json (if available)
COPY package*.json ./
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install 
# Copy the rest of the project files
COPY . .
# Build the app
RUN npm run build
# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
