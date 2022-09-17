FROM matomo
RUN a2enmod ssl
COPY ./000-default.conf /etc/apache2/sites-available
COPY ./certs /ssl