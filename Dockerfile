FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias primero (mejor cache)
COPY package*.json ./
RUN npm ci --only=production=false

# Copiar el resto del código
COPY . .

# Construir la aplicación para producción
RUN npm run build

# ====================== ETAPA 2: Producción ======================
FROM nginx:alpine AS production

# Copiar la build de Vite al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx (opcional pero recomendado)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]