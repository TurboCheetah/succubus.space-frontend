FROM node:16-alpine AS deps

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ .yarn/

RUN yarn install --immutable

FROM node:16-alpine AS builder

WORKDIR /app

ENV GROUP=nodejs
ENV USER=nextjs
ENV UID=1001
ENV GID=1001

RUN addgroup \
    --system \
    --gid "${GID}" \
    "${GROUP}"
RUN adduser \
    --system \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    "${USER}"

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM gcr.io/distroless/nodejs:16 as runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["server.js"]
