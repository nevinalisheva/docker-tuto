# Docker 101 Step 02

## Dockerfile

Docker can build images automatically by reading the instructions from a Dockerfile.

A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Using docker build users can create an automated build that executes several command-line instructions in succession.

## Dockerfile Example

In this folder, we have a basic express server. Let's imagine that we want to create a docker image for this project.

What do we need ?

- Node Js
- The package.json file
- Run npm install
- All the files to run the project
- Specify the port that the project is running on
- run the command to start the project

We could create a dockerfile to run all the operation:

```
# The image we want to uuse
FROM node

# Set the working directory
WORKDIR /app


# Copy package.json
COPY package.json ./

# Instruction to run to install
RUN npm install

# We copy the curent folder to the curent folder on the FS of the container
COPY . ./

# Set the port we want to expose (just for information)
EXPOSE 3000

# Will be executed when the container start
CMD ["node", "app.js"]
```

Once we have this file create, we simply have to run `docker build .` command to build the image.

Once the image is build we can simply tun
