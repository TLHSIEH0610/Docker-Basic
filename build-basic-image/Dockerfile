# Use an existing docker image as a base
From alpine

#Download and install a dependency (this is nothing to do with docker)
RUN apk add --update redis

# Tell the image what to do when it starts as a container
CMD ["redis-server"]