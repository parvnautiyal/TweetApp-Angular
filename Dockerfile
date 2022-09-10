FROM nginx:1.17.1-alpine
EXPOSE 4200
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/tweet-app /usr/share/nginx/html
