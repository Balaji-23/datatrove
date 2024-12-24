# Stage 1: Build the React app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:stable-alpine

# Copy the built React app from the build stage to Nginx's default HTML directory
COPY --from=build usr/src/app/dist usr/share/nginx/html

# Expose port 80 to serve the app
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
