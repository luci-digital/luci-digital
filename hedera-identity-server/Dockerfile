# Use a Node.js base image for JavaScript SDK
FROM node:16

# Set the working directory
WORKDIR /hedera-identity

# Copy package.json and install Hedera SDK
COPY package.json ./
RUN npm install @hashgraph/sdk

# Copy the rest of your application code
COPY . .

# Expose a port for the identity server (optional)
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]