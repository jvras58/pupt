FROM node:latest

RUN apt-get update && apt-get install -y \
    git \
    curl \
    zsh \
    bash \
    openssh-client \
    make \
    gcc \
    musl-dev \
    linux-headers-amd64 \
    ldap-utils \
    libaio-dev \
    unzip \
    chromium \
    libnss3 \
    libfreetype6 \
    libharfbuzz0b \
    ca-certificates \
    fonts-freefont-ttf \
    fonts-noto-color-emoji \
    && curl -fsSL https://starship.rs/install.sh | sh -s -- --yes


RUN mkdir -p /workspace && chmod -R 777 /workspace

ENV PATH="/root/.local/bin:${PATH}"
ENV ZSH_THEME starship
ENV HATSTALL_ENV=dev

# Define variáveis de ambiente para o Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    CHROME_BIN=/usr/bin/chromium \
    CHROME_PATH=/usr/lib/chromium/ \
    CHROMIUM_FLAGS="--disable-software-rasterizer --disable-dev-shm-usage"

COPY .zshrc /root

SHELL ["/bin/zsh", "-c"]

WORKDIR /workspace
COPY ../ .

CMD ["tail", "-f", "/dev/null"]