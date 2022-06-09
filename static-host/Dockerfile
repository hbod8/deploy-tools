# FROM node AS admin_build
# WORKDIR /app
# COPY ./admin/package.json ./admin/package-lock.json ./
# RUN npm install
# COPY admin/ ./
# RUN npm run build

FROM nginx
# COPY --from=admin_build ./app/dist/admin /var/www/admin.harry.technology
COPY ./default /var/www/default
COPY ./eatkelp /var/www/eatkelp
COPY ./prestorecording /var/www/prestorecording
COPY ./resume /var/www/resume
COPY ./blog /var/www/blog
COPY ./certs /etc/nginx/certs
COPY ./nginx.conf /etc/nginx/nginx.conf