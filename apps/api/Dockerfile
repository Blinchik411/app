FROM node:22-alpine
RUN apk add --no-cache openssl && npm i -g pnpm@10
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile && pnpm --filter api build
WORKDIR /app/apps/api
EXPOSE 4000
CMD ["sh", "-c", "pnpm db:deploy && node dist/main.js"]
