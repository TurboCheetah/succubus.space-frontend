FROM node:16-alpine
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ .yarn/
RUN yarn install --immutable
COPY . .
RUN yarn build
EXPOSE 3000
ENV NODE_ENV production
CMD ["yarn", "start"]
