FROM bitnami/mongodb-exporter:latest

USER root

# Descarga y descomprime el archivo
ADD https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz /tmp/
RUN chmod +r /tmp/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -xzvf /tmp/dockerize-linux-amd64-v0.6.1.tar.gz -C /tmp && \
    mv /tmp/dockerize /usr/local/bin/ && \
    chmod +x /usr/local/bin/dockerize

