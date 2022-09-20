FROM ubuntu AS blog_build_env
RUN apt update
RUN apt install -y hugo
WORKDIR /hugo
COPY ./blog ./

FROM blog_build_env AS harry_technology
RUN hugo --baseURL="https://harry.technology/"

FROM blog_build_env AS harrysaliba_com
RUN hugo --baseURL="https://harrysaliba.com/"

FROM nginx
COPY ./default /var/www/default
COPY ./eatkelp /var/www/eatkelp
COPY ./prestorecording /var/www/prestorecording
COPY ./resume /var/www/resume
COPY --from=harry_technology /hugo/public /var/www/harry.technology
COPY --from=harrysaliba_com /hugo/public /var/www/harrysaliba.com
COPY ./certs /etc/nginx/certs
COPY ./nginx.conf /etc/nginx/nginx.conf