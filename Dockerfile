# Install dependencies only when needed
FROM node:18-alpine AS deps
WORKDIR /app
RUN apk add --no-cache curl
COPY package.json package-lock.json .env ./
ENV NPM_CACHE_FOLDER=~/.npm
VOLUME ~/.npm
RUN npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
