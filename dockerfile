FROM node:20.9-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install --force
COPY . .
EXPOSE 4200
ENTRYPOINT [ "ng" ]
CMD ["serve", "--host", "0.0.0.0", "--port", "4200"]
