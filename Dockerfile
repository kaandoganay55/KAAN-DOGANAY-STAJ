FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install dependencies
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY --from=deps /app/frontend/node_modules ./frontend/node_modules

# Copy source files
COPY . .

# Set environment to production
ENV NODE_ENV production

# Build both frontend and backend
RUN yarn build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy built files
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/frontend/.next/standalone ./frontend/.next/standalone
COPY --from=builder /app/frontend/.next/static ./frontend/.next/static
COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder /app/backend/package.json ./backend/

# Install production dependencies
RUN cd backend && yarn install --production --frozen-lockfile

# Start the app
WORKDIR /app/backend
CMD ["node", "dist/index.js"] 