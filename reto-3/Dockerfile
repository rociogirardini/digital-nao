# Se utiliza la imagen de node
FROM node:latest

# Se establece el directorio de trabajo
WORKDIR /app

# Se copian los archivos necesarios al contenedor
COPY package.json .
COPY package-lock.json .
COPY src/ ./src

# Se instalan las dependencias
RUN npm install --production

# Se expone el puerto que utiliza la aplicación
EXPOSE 3000

# Se ejecuta el comando para iniciar la aplicación
CMD ["npm", "start"]