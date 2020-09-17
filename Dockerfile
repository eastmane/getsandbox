FROM jeanblanchard/java:jre-8

# Add sandbox user account
RUN apk --update add curl \
  && adduser -D -h /sandbox sandbox \
  # Install sandbox pre-built binary
  && cd /usr/bin \
  && curl -skL -O "https://storage.googleapis.com/sandbox-releases/worker-cli/worker-cli-latest.jar" \
  && mv worker-cli-latest.jar sandbox \
  && apk del curl \
  && rm -f /var/cache/apk/*

COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY main.js /sandbox/main.js

WORKDIR /sandbox
USER sandbox

ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 8080

CMD ["java", "-jar", "/usr/bin/sandbox", "--port=8080", "--quiet", "run"]