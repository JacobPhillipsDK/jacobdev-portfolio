# syntax=docker.io/docker/dockerfile:1

# Stage 1: Base image with Node.js
FROM node:18-alpine AS base

# Install libc6-compat for compatibility if needed
RUN apk add --no-cache libc6-compat

# Create the application directory
WORKDIR /app

# Stage 2: Dependency Installation
FROM base AS deps

# Copy package manager lockfiles and configuration files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Install dependencies based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage 3: Build the application
FROM base AS builder
WORKDIR /app

# Copy dependencies and source code from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry (optional)
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage 4: Production setup
FROM base AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files for production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set permissions
RUN mkdir .next && chown nextjs:nodejs .next

USER nextjs

# Expose the default Next.js port
EXPOSE 3000

# Run the app
CMD ["node", "server.js"]
