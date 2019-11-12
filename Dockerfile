FROM jeanblanchard/java:jre-8

# Add sandbox user account
RUN apk --update add curl tar \
  && adduser -D -h /sandbox sandbox \
  # Install sandbox pre-built binary
  && cd /usr/bin \
  && curl -sk -O "https://s3.amazonaws.com/sandbox-binaries/runtime-binary.tar" \
  && tar xf runtime-binary.tar \
  && rm -rf runtime-binary.tar \
  && apk del curl tar \
  && rm -f /var/cache/apk/*

COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY main.js /usr/local/sandbox/main.js

WORKDIR /sandbox
USER sandbox

ENTRYPOINT ["/docker-entrypoint.sh"]

ARG PORT=8080
ENV PORT=${PORT}
ENV STATE_FILE="state.json"
ENV RUNTIME_VERSION="VERSION_2"

EXPOSE ${PORT}

CMD ["java", "-jar", "/usr/bin/sandbox", "--state=${STATE_FILE}", "--port=${PORT}", "--runtimeVersion=${RUNTIME_VERSION}", "run"]
