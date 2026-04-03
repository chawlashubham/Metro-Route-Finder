# ─── Stage 1: Build TypeScript backend ───────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY tsconfig.json ./
COPY src/ ./src/

RUN npm run build

# Prune dev-only deps
RUN npm prune --production

# ─── Stage 2: Runtime image ───────────────────────────────────────────────────
FROM node:20-alpine AS runner

LABEL org.opencontainers.image.title="Metro Route Finder API"
LABEL org.opencontainers.image.description="Production-grade Delhi Metro routing service"

WORKDIR /app

ENV NODE_ENV=production

# Only copy what we need
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/data ./dist/data

# Non-root user for security
RUN addgroup -g 1001 metro && adduser -u 1001 -G metro -s /bin/sh -D metro
USER metro

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]
