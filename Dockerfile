# Instalação das dependências e build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

ARG NEXT_PUBLIC_API_URL=http://localhost:3001
ARG NEXT_PUBLIC_FAQ_VOICE_SEARCH_DEBUG=
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_FAQ_VOICE_SEARCH_DEBUG=$NEXT_PUBLIC_FAQ_VOICE_SEARCH_DEBUG

RUN yarn build

# Ambiente de produção
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copiar arquivos essenciais do build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

RUN yarn install --frozen-lockfile --production=true

EXPOSE 3000
CMD ["yarn", "start"]
