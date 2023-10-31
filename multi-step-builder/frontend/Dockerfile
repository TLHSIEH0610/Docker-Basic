# tag this phase with a name "builder"
FROM node:16-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
# create build folder and static files in the work directory(/app/build)
RUN npm run build

FROM nginx
# --from=builder : copy file from builder phase
COPY --from=builder /app/build /usr/share/nginx/html