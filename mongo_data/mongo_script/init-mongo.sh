#!/bin/bash

# Inicializa la variable FORKED si no está definida
: "${FORKED:=}"

if [ -z "${FORKED}" ]; then
  echo >&2 '[init-mongo.sh] mongod para la inicialización va a apagarse'
  mongod --pidfilepath /tmp/docker-entrypoint-temp-mongod.pid --shutdown
  echo >&2 '[init-mongo.sh] el conjunto de réplicas se inicializará más tarde'
  
  FORKED=1 "${BASH_SOURCE[0]}" &
  unset FORKED
  mongodHackedArgs=(:)
  return
fi

echo '[init-mongo.sh] Proceso de MongoDB init completado, asegurando que MongoDB este listo para la inicialización del conjunto de replicas.'

mongo=( mongosh --username admin --password admin1234 --quiet )

tries=30
while true; do
	sleep 1
	if "${mongo[@]}" --eval 'quit(0)' &> /dev/null; then
		# Exito
		break
	fi
	(( tries-- ))
	if [ "$tries" -le 0 ]; then
		echo >&2
		echo >&2 '[init-mongo.sh] error: no se pudo iniciar Replica Set'
		echo >&2
		kill -STOP 1 # initdb no se ejecurá una segunda vez.
		exit 1
	fi
done

echo '[init-mongo.sh] Inicializando Replica Set...'
"${mongo[@]}" <<-EOF
	rs.initiate({
        _id: 'mongoReplicaSet', 
        members: [
        {_id: 0, host: 'mongo_db', priority: 2},
        {_id: 1, host: 'mongo_db1', priority: 1},
        {_id: 2, host: 'mongo_db2', priority: 1}
        ]
    });
EOF

echo '[init-mongo.sh] Esperando a que el Replica Set esté listo...'

# Esperar hasta que haya un nodo primario disponible en el Replica Set
until "${mongo[@]}" --eval "rs.status()" | grep 'PRIMARY'; do
  echo "[init-mongo.sh] Esperando a que el nodo primario esté disponible..."
  sleep 5
done

echo '[init-mongo.sh] Replica Set inicializado exitosamente. Procediendo con la restauración de la base de datos...'

mongorestore --username admin --password admin1234 --authenticationDatabase admin --drop --db gym_db --dir /data/dump
