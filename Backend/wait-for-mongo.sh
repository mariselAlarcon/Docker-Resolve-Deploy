#!/bin/bash

# Tiempo de espera entre intentos
WAIT_TIME=5  # en segundos

# Número máximo de intentos
MAX_RETRIES=30  # 30 intentos (150 segundos)

# Contador de intentos
RETRY_COUNT=0

echo "Esperando a que MongoDB esté disponible..."

# Función para verificar si MongoDB está listo
check_mongo() {
  mongo --host=mongo_db --port=27017 --db=gym_db --username=admin --password=admin1234 --authenticationDatabase=admin --authenticationMechanism=SCRAM-SHA-1 --eval "db.adminCommand('ping')" > /dev/null 2>&1
}

# Reintentar hasta que MongoDB esté disponible
until check_mongo || [ $RETRY_COUNT -eq $MAX_RETRIES ]; do
  echo "MongoDB no está disponible aún. Intentando nuevamente en $WAIT_TIME segundos..."
  RETRY_COUNT=$((RETRY_COUNT+1))
  sleep $WAIT_TIME
done

# Si alcanzamos el máximo de reintentos, abortamos
if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
  echo "MongoDB no está disponible después de $MAX_RETRIES intentos. Abortando..."
  exit 1
fi

echo "MongoDB está listo, iniciando el backend..."

# Aquí inicia la aplicación del backend (puedes reemplazar esto por el comando de inicio de tu app)
npm start
