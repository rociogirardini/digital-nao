# Se utiliza la imagen de node
FROM node:latest

# Se establece el directorio de trabajo
WORKDIR /reto-3/site

# Se copian los archivos necesarios al contenedor
COPY reto-3/site/package.json .
COPY reto-3/site/src/ ./src

# Se instalan las dependencias
RUN npm install --production

# Se expone el puerto que utiliza la aplicación
EXPOSE 8080

# Se ejecuta el comando para iniciar la aplicación
CMD ["npm", "start"]