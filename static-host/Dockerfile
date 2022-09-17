FROM ubuntu AS blog_build
RUN apt update
RUN apt install -y hugo
WORKDIR /hugo
COPY ./blog ./
RUN hugo

FROM nginx
COPY ./default /var/www/default
COPY ./eatkelp /var/www/eatkelp
COPY ./prestorecording /var/www/prestorecording
COPY ./resume /var/www/resume
COPY --from=blog_build /hugo/public /var/www/blog
COPY ./certs /etc/nginx/certs
COPY ./nginx.conf /etc/nginx/nginx.conf