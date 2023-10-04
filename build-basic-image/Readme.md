## Build image

```
docker build .
```

### Description

## From alpine

Step1 Download Alpine

## RUN apk add --update redis

Step2 (1)Create a temperary container using Alpine image (2)download redis (3)stop container and take the entire file system snapshot as a temperary image

## CMD ["redis-server"]

Step3 (1)Create a temperary container from step2's image (2)Add a primary command "redis-server" (3)stop container and take the entire file system snapshot as a new image
