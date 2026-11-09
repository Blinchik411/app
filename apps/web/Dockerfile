FROM node:22-alpine
RUN npm i -g pnpm@10
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile && pnpm --filter web build
WORKDIR /app/apps/web
EXPOSE 3000
CMD ["pnpm", "start"]
