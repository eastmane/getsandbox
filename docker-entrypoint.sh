#!/bin/sh
set -e

# if command starts with an option, prepend sandbox run
if [ "${1:0:1}" = '-' ]; then
  set -- java -jar /usr/bin/sandbox run "$@"
fi

echo "Passthrough command"
exec "$@"
