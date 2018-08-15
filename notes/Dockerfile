FROM node:9.5

RUN mkdir -p /notesapp
COPY authorization/ /notesapp/authorization
COPY controllers/ /notesapp/controllers/
COPY db/ /notesapp/db/
COPY routes/ /notesapp/routes/
COPY models/ /notesapp/models/
COPY tests/ notesapp/tests/
COPY app.js server.js /notesapp/
COPY jwtRS256.pub.key package.json package-lock.json /notesapp/


WORKDIR /notesapp

ENV PORT="3000"
# ENV REST_LISTEN="0.0.0.0"

RUN apt-get update -y  \
    && apt-get -y install curl python build-essential git ca-certificates  \
    && npm install --unsafe-perm 

EXPOSE 3000
CMD npm run docker

