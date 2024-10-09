FROM node:22.9-alpine3.20

RUN apk update && apk add --no-cache \
    git \
    curl \
    zsh \
    bash \
    starship \
    openssh \
    make \
    gcc \
    musl-dev \
    linux-headers \
    openldap-clients \
    libaio \
    unzip \
    gcompat \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    font-noto-emoji \
    font-wqy-zenhei \
    && adduser -D -s /bin/zsh -u 1000 dev

USER dev

ENV PATH="/home/dev/.local/bin:${PATH}"
ENV ZSH_THEME starship
ENV HATSTALL_ENV=dev

# Define variáveis de ambiente para o Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium/ \
    CHROMIUM_FLAGS="--disable-software-rasterizer --disable-dev-shm-usage"

COPY .zshrc /home/dev

SHELL ["/bin/zsh", "-c"]

WORKDIR /workspace
COPY ../ .

CMD ["tail", "-f", "/dev/null"]