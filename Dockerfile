# Instalação das dependências e build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Ambiente de produção
FROM node:20-alpine AS runner
WORKDIR /app

# Copiar arquivos essenciais do build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

RUN npm install --omit=dev

EXPOSE 3000
CMD ["npm", "start"]