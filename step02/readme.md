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

Once we have this file created, we simply have to run `docker build .` command to build the image.

We can also give a name and a tag to the image by using `-t`, for instance `step02:v1`.

Once the image is build, we can then simply run the image using `docker run (-d) -p 3000:3000 [id/name]`.

### .dockerignore

When rebuilding an image, we don't necessary want the `node_modules` to be copy again, it's very inneficient. To prevent that to happen, we can use a `.dockerignore` file and specify the file/folder that should be ignored when building the image.

Remember than our dockerfile is already installing the dependencies for us.

### Exercice

Let's create together a Dockerfile for a React Application !

## Volumes

Now let's try something. We've created a route that you can call and that will create a file inside the container. We've also created a route that allow you to read the file.

Let's call the route to create the file on our container `localhost:3000/createFile`. Now let's read it `localhost:3000/readFile`.

Everything work! Nice. Now what do you think will happen if you remove the container and re-run a new container. Do you think the file will still be there?

Unfortunately, no. But thanksfully, Docker has created Volume to help us solve this problem, so we can have a volume with the file that we will be able to mount on our containers.

### Create a volume

We can create a volume by using the command:

`docker volume create [name]`

Docker automatically creates a directory for the volume on the host under. This folder is difficult to localise on your local machine but you can view it using the Docker app.

We can also list all the volumes using the list command:

`docker volume list`

### Mounting a volume

It's possible to attach a volume to a container using the flag `-v [volume-name]:[destination-path]` when running a container.

Let's give it a try. Let's stop and remove our container `docker stop step02` - `docker rm step02` and let's recreate our container with a volume.

`docker run -d -p 3000:3000 --name step02 -v step02volume:/app/src/files step02:v1`

Now when go to the route to create a file => `localhost:3000/createFile`. You should see now the file inside the volume in docker desktop.

Now even if you delete the container, as soon as you mount the volume to it, the file will be present.

### Bind mounts

Now let's see another problem. Currently, if you try to change the `app.js` file, you need to rebuild the image and run a new container so that the changes are reflected on the container.

Wouldn't it be nice if we could tell docker to bind our local folder with the container folder?

It's possible thanks to the Bind Mount feature.

A Bind Mount is a storage area (file/directory) on your local machine available inside your container. So any changes you make to this storage space (file/directory) from the outside container will be reflected inside the docker container and vice-versa.

For example, if we want the files inside the `src` folder to be the same on our container as well as on our machine.

To create a bind mount, instead of specifying the name of a volume, simply specify the path of your folder like so:

`docker run -d -v "[localFolder]":"[containerfolder]"`

Let's give it a try with our app. Start by stopping and removing the container, then run this command:

`docker run -d -p 3000:3000 --name step02 -v "$(pwd)/src":"/app/src" step02:v3`

Now modify app.js and TADAM ! It work! Now try to call the route to create the file... Yeah! As you can see it work in both direction ;).
