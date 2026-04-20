# Use Node base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the project (this generates /out)
RUN npm run build

# Final stage (optional, just to extract output)
FROM alpine:latest AS runner

WORKDIR /app

# Copy static export
COPY --from=builder /app/out ./out

# Default command (just for debug if needed)
CMD ["ls", "-la", "out"]