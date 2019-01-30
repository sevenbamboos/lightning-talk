# Derived from official mysql image (our base image)
FROM mysql
# Add a database
ENV MYSQL_DATABASE company
ENV MYSQL_USER developer
ENV MYSQL_PASSWORD 12345678

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./script/ /docker-entrypoint-initdb.d/
