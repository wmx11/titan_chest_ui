FROM nginx:alpine

RUN rm /etc/nginx/conf.d/*

COPY ./app.conf /etc/nginx/conf.d/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]