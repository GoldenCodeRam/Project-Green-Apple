FROM alpine:3.13

WORKDIR /server

RUN apk add --update redis

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

RUN pip3 install redis

COPY ./ ./

EXPOSE 8080

RUN chmod u+x ./start.sh

CMD sh start.sh