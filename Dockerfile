FROM nginx:latest
COPY build /usr/share/nginx/build
COPY default.conf /etc/nginx/conf.d/default.conf