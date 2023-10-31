cd frontend

### For dev

#### Run with create-react-app dev server, attach volume from local to cotainer (except node_modules)

```
docker-compose up
```

or

```
docker build -f Dockerfile.dev .
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app imageID
```

### FOR prod

#### Build static html and served by Nginx

```
docker build .
docker run -p 8080:80 imageID
```
