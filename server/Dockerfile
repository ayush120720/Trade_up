FROM node:18-alpine AS builder
WORKDIR /app

COPY server/package*.json ./
RUN npm ci --silent

COPY server/ ./

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./
EXPOSE 5000
CMD ["node", "index.js"]
