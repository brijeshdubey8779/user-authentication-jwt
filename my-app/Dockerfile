FROM node:20.18.2

WORKDIR /app

COPY my-app/package*.json .

RUN npm install && npm install -D tailwindcss postcss autoprefixer

COPY my-app/ .

# RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]