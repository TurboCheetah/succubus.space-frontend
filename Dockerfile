FROM node:18-alpine AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm \
    && pnpm i --prod --frozen-lockfile

ENV GROUP=nodejs
ENV USER=nextjs
ENV UID=1001
ENV GID=1001

RUN addgroup \
    --system \
    --gid "${GID}" \
    "${GROUP}" \
    && adduser \
    --system \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    "${USER}"

COPY . .

RUN pnpm build

FROM gcr.io/distroless/nodejs:18 as runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=deps /etc/passwd /etc/passwd
COPY --from=deps /etc/group /etc/group
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/public ./public
COPY --from=deps --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=deps --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["server.js"]
