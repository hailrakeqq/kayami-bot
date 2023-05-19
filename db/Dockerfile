FROM mongo:latest

COPY mongod.conf /etc/mongod.conf

EXPOSE 27018

CMD ["mongod", "--config", "/etc/mongod.conf"]
