FROM alpine:latest

RUN apk update && apk add --no-cache mongodb-tools bash

RUN mkdir -p /backups

COPY backup.sh /usr/local/bin/backup.sh

RUN chmod +x /usr/local/bin/backup.sh

CMD ["/usr/local/bin/backup.sh"]
