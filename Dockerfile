ARG MONGODB_URI 

FROM alpine AS builder
RUN apk add --update nodejs npm
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


FROM alpine AS runner
RUN apk add --update nodejs npm

ARG MONGODB_URI

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

ENV MONGODB_URI $MONGODB_URI

EXPOSE 4000

CMD [ "npm", "start" ]

