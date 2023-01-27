# Docker 101 Step 01

## What is Docker?

"Docker is an open platform for developing, shipping, and running applications.
Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.
With Docker, you can manage your infrastructure in the same ways you manage your applications. By taking advantage of Docker’s methodologies for shipping, testing, and deploying code quickly, you can significantly reduce the delay between writing code and running it in production."

Source [docker documentation](https://docs.docker.com/get-started/overview/)

### Why docker?

The compatibility with the os of the differents service can be an issue.

Everytime a developper is onboarded, he has to check and use the right os, right version f node, etc...

We have differents environment for Test production and dev. And it's hard to guarantee that all environments are the same.

With Docker, it's possible to run each component in a separate container with separate environments.

No matter which Os you have, you can run docker and you're good to go.

### Containers?

Containers are completely isolated environments. With their own processes, Network and Mounts, like virtual machines they all share the same OS kernel.

Containers exists for about 10 years. Docker utilizes "LXC containers".

Setup those environment is hard, but Docker makes it easy to use and set up.

Docker shares the underline kernel of the machine. If we have a system with ubuntu, Docker can run any OS on top of it if they are based on same kernel.

### What is an Image?

An image is a package or template used to create containers. We can find image on (docker hub)[https://hub.docker.com/] or create our own.

A docker container are running instance of images.

# How to download an Docker image?

To download a docker image, simply use the `docker pull` command.

Give it a try, try to pull the mongodb image from docker hub.

`docker pull nginx`

Nginx is an opensource webserver it's used by a lot of companies. Webserver are used to send response to request. Nginx will manage the icoming internet traffic and send the right resources.

## List the images available

Now, we can check that the image has been pull using the `docker image ls` command.

# Run a container

To run a container from an image, simply use the command `docker run` followed by the image name.

Ex: `docker run nginx`

Your container is now running! If you open another terminal and type `docker ps` you will see the list of the running containers.

we can also see that nginx is running on the port 80 on our container.

However, if you go to localhost:80, you won't be able to reach the container.

This is because we need to choose a port on the Docker host and map it to a port on the container. This is done by using the flag `-p` followed by the machine port `:` and the container port.

Ex: `docker run -p 8080:80 nginx` - We know that nginx docker image will run on 80 so we map the port 80 of this container to the port 8080 of our machine.

Now, if you go to localhost:8080, you should see the nginx server!

## Restart a container / Delete

When we stop the container, using ctrl + c or by closing the terminal, the container isn't deleted, we can restart the container by using its id.

To find the id of all running container, you can use the `docker ps` command. Then find the name of the container or id and run `docker stop [id]` to stop the container.

/!\ When a container is stopped it is not deleted, the container is simply stopped and you can restart it at all time.

If you want to restart a stopped container, simply run `docker ps` with the `-a` flag to list all container - including the one that aren't running, and then simply find the id of the container and restart it using `docker start` followed by the container name.

You will notice that, this time, we don't see the container's console, it's because by default, `docker start` run the container in detached mode (in the background). To run it in attach mode, simply add the `-a` flag.

`docker start [id] -a`

If you want to delete a container, simply run the `docker rm [id]` (the container must be stopped). If you want the container to be automatically removed as soon as the container is stopped you can add the `--rm` flag while running the container.

Ex: `docker run -p 8080:80 --rm nginx`

## Detach mode

As said previously, detach mode allow the container to run in the background. To run a container in detach mode, simply add the `-d` flag when using `docker run`.

Let's take another example than nginx!

`docker run -p 3001:2368 -d -e NODE_ENV=development ghost` will run a container with Ghost, an open source blogging platform.

Note: We use here the flag `-e` to setup environment variables. (in this case the NODE_ENV is needed to run the container)

Simply wait a few seconds and open localhost:3001.

## Check the logs

We can check the logs of a container using `docker logs [id]`

## Execute command

We can execute command inside of our container using the `docker exec` command.

Let's try to run a docker container with a mongodb instance.

`docker run -p 8080:80 -d nginx`

Then let's execute a command:

`docker exec [id] ls /etc/hosts`

## Name a container

Also it's possible to name a container instead of looking for the id. This can be done using the `--name` flag.

## Interactive mode

If we run a container, by default, we cannot interact with them, let's see an example:
`docker run --rm node`, when you run this container, you can see that nothing happen.

Try again now with the flag `-it`

## Attach to a running container

You can attach yourself to a running container using `docker container attach [id]`

Let's try it with a node container `docker run --rm -d --name some-node -it node`

Then let's attach t the container `docker container attach some-node`
