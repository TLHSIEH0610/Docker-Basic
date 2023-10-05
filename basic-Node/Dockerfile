# use a node pre-installed alpine.
FROM node:alpine

# Any following command will be executed relative to thie path in the container.
WORKDIR /user/app

#split the copy into two step to save some resource when re-build the image
# Install dependencies
COPY ./package.json ./
# copy the rest files into the WORKDIR
RUN npm install
COPY ./ ./

# Default Command
CMD ["npm","start"]