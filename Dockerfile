# Use Node.js image
FROM node:18

# Create working directory /app on the image
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json /app

# Install dependencies from package.json
RUN rm -rf node_modules
RUN npm install

# Copy all source code to /app
COPY . /app


# Declare the port the container listens to
EXPOSE 8077

# Run the serve service to serve the application
CMD ["npm", "start"]