FROM node:20.18.1-alpine3.20 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm
RUN apk update --no-cache && apk add --no-cache \
    tzdata \
    python3 \
    make \
    g++ \
    pixman-dev \
    cairo-dev \
    pango-dev \
    pkgconfig
COPY . /app
WORKDIR /app

FROM base AS builder
ENV NODE_OPTIONS="--max-old-space-size=8192"
RUN --mount=type=cache,id=pnpm-cunoe-blog-next,target=/pnpm/store pnpm install --frozen-lockfile
RUN cp '.env.local.example' '.env.local'
RUN pnpm run build

FROM node:20.18.1-alpine3.20 AS final
ENV TZ=Asia/Shanghai
WORKDIR /app

RUN apk update --no-cache && \
    apk add --no-cache \
    libstdc++ \
    libgcc \
    libjpeg-turbo \
    cairo \
    pango \
    giflib \
    fontconfig \
    ttf-dejavu

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=builder /usr/share/zoneinfo/Asia/Shanghai /usr/share/zoneinfo/Asia/Shanghai

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD [ "node", "server.js" ]
