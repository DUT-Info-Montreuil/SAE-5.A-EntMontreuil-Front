FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -legacy-peer-deps
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
