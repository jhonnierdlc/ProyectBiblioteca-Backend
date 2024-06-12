# Usa una imagen base de Node.js más reciente
FROM node:16 as build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Exponer el puerto 5000 (ajústalo si es necesario)
EXPOSE 80

# Inicia la aplicación
CMD ["npm", "start"]