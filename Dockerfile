# First stage: Build the application
FROM node:20-alpine AS build-stage
WORKDIR /app

# Build arguments for VITE environment variables
# I will add the enviroment variables as we go

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Second stage: Serve the application
FROM nginx:alpine AS production-stage

# Copy the build output to NGINX's html folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Add a custom NGINX configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]