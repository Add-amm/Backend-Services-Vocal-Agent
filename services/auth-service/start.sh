#!/bin/sh

echo "Waiting for MySQL to be ready..."

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo ".env file not found!"
fi

# Checks if a password is set
if [ -n "$MYSQL_PASSWORD" ]; then
  PASS="-p$MYSQL_PASSWORD"
else
  PASS=""
fi

# Loop until MySQL is ready
until mysql --ssl=OFF -h"$DB_HOST" -P"$DB_PORT" -u"$MYSQL_USER" $PASS "$MYSQL_DATABASE" -e"SELECT 1;" > /dev/null 2>&1
do
  echo "MySQL is unavailable - sleeping"
  sleep 2
done

echo "MySQL is ready. Starting application..."

# Start your app
exec npm start