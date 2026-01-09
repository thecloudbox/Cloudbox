FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY go.* ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -o chaosbox ./cmd/chaosbox

FROM alpine:3.18

RUN apk add --no-cache \
    iptables \
    iproute2 \
    stress-ng \
    mysql-client \
    curl

COPY --from=builder /app/chaosbox /usr/local/bin/

EXPOSE 8080 9090

ENTRYPOINT ["chaosbox"]
CMD ["server"]
