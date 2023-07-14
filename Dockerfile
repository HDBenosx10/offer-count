FROM node:18-slim AS build
WORKDIR /app
COPY . .
RUN apt-get update
RUN apt-get install -y openssl
RUN yarn install --frozen-lockfile && \
    yarn build && \
    yarn prisma:generate

FROM --platform=linux/amd64 node:18-alpine AS runner
EXPOSE 8080
WORKDIR /app
COPY --from=build /app ./
CMD ["yarn", "start"]
