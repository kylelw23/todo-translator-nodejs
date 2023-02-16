# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /src/app

ENV PORT 8080

COPY package*.json ./

# Copy the current directory contents into the container at /app
COPY . ./

# Install app dependencies
RUN npm ci --production

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the app when the container launches
CMD ["npm", "start"]
