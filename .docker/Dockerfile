# Use lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (cache dependencies)
COPY package.json yarn.lock .yarnrc.yml ./

# Enable Corepack and Yarn stable
RUN corepack enable && corepack prepare yarn@stable --activate

# Install dependencies in container
RUN yarn install --frozen-lockfile --network-timeout 600000

# Copy the rest of the project
COPY . .

# Expose dev server port
EXPOSE 5173

# Start dev server
CMD ["yarn", "dev"]
