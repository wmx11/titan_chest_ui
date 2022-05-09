FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g

FROM node:alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env ./

RUN npm run build

FROM node:alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD npm run start