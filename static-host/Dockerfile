FROM ubuntu AS blog_build
WORKDIR /hugo
COPY ./blog ./
RUN apt update
RUN apt install -y hugo
RUN hugo

FROM nginx
COPY ./default /var/www/default
COPY ./eatkelp /var/www/eatkelp
COPY ./prestorecording /var/www/prestorecording
COPY ./resume /var/www/resume
COPY --from=blog_build /hugo/public /var/www/blog
COPY ./certs /etc/nginx/certs
COPY ./nginx.conf /etc/nginx/nginx.conf