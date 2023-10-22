FROM node:14-alpine

# Crea el directorio de trabajo
WORKDIR /usr/src/server

# Copia el archivo de dependencias
COPY ["package.json", "package-lock.json", "./"]

# Instala las dependencias con npm
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# CMD para ejecutar la aplicación
CMD ["npm", "start"]