FROM node:20
#Directorio de trabajo 
WORKDIR /app
#Copiando archivos de dependencias
COPY package*.json ./
#Instalando las dependencias
RUN npm install
COPY . .
EXPOSE 3000
#Comandos 
CMD [ "npm","start" ]

