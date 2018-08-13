FROM node:9.5

RUN mkdir -p /userauth
COPY controllers/ /userauth/controllers/
COPY db/ /userauth/db/
COPY routes/ /userauth/routes/
COPY user-server.js /userauth/
COPY jwtRS256.key package.json package-lock.json sequelize-postgres-docker.yaml /userauth/


WORKDIR /userauth

ENV PORT="3003"
ENV SEQUELIZE_CONNECT="sequelize-postgres-docker.yaml"
# ENV REST_LISTEN="0.0.0.0"

RUN apt-get update -y  \
    && apt-get -y install curl python build-essential git ca-certificates  \
    && npm install --unsafe-perm 

EXPOSE 3003
CMD npm run docker

