FROM node:18.18-alpine

# Install pnpm
RUN npm install -g pnpm

# Create the directory on the node image
# where our Next.js app will live
RUN mkdir -p /app

# Set /app as the working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY package*.json ./

# Install dependencies in /app
RUN pnpm install

# Copy the rest of our Next.js folder into /app
COPY . .

# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Set the entrypoint to pnpm
ENTRYPOINT ["pnpm", "run", "dev"]

# Pass the arguments to the entrypoint
CMD ["-H", "0.0.0.0"]