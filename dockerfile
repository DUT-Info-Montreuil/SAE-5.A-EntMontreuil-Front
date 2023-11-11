FROM node:latest AS builder
WORKDIR /app
COPY . /SAE-5.A-EntMonreuil-Front
RUN npm install
RUN npm run build --prod
FROM nginx:alpine
COPY --from=builder /app/dist/angular-app /usr/share/nginx/html
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
CMD ["/bin/sh", "./entrypoint.sh"]

