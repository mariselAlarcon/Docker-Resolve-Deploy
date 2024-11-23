FROM node:20
#Directorio de trabajo 
WORKDIR /app
#Copiando archivos de dependencias
COPY package*.json ./
#Instalando las dependencias
RUN npm install
COPY . .

COPY ./wait-for-mongo.sh /usr/local/bin/wait-for-mongo.sh

# Haz que el script de espera sea ejecutable
RUN chmod +x /usr/local/bin/wait-for-mongo.sh

EXPOSE 3000
# Establece el comando de inicio del contenedor, primero ejecuta el script de espera y luego arranca la app
CMD ["wait-for-mongo.sh"]