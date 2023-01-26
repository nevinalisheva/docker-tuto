# Docker 101 Step 03

## Docker-compose

Now that you know what Docker is, and you know how to run and create Docker images, it's time to see one of the most powerfull tool from Docker: Compose.

Docker-compose is a tool that yo can use to define and run multi-container application.

### What does that mean?

Most of the time, your application will consist of multiple containers. For example in the case of a full stack application, your application will consist of a frontend (that might use a specific stack such as Node.js, PHP, etc..) and a backend (that also uses node.js - maybe not the same version) and we could even image other layers such as a database, middleware and so on.

Docker-compose will allow you to define multiple container in a configuration file and then thanks to the Docker-CLI you'll be able to manage them easily (start and stop them, check the logs, etc...).

This will make your deployment process easier and faster!

## Create a Docker-compose file

As said previously, Docker-compose files are used to configure and run application. Docker-compose file are created using the yaml format.

The yaml format is a Unicode based data-serialization language; used for configuration files. In yaml file, you need to be very careful with the indentation as it affects the interpretation of the configuration you are trying to make.

The first part of the docker-compose file is the version. The version needs to be defined related to the version of Docker you're using. Most of the time it's best to use the latest version.

You can check your Docker version by running `docker --version` and then check the [specifications](https://docs.docker.com/compose/compose-file/compose-versioning/) to find out which version to use.

In our case, we want to use the latest version so 3.8.

```
version: "3.8"
```

Then, the next step is to start defining our services. For example, our frontend.

```
services:
  frontend:
```

### Defining a service

Now, inside a service, there is a couple option we can use. Let's start by giving a name to our container:

```
services:
  frontend:
    container_name: app_frontend
```

We will be able after to use this name to reference this specific container (remember, we will have more than one container).

Now, we need to tell Docker where to find the Docker image for this container. We have already created the Dockerfile, so we can tell docker that the dockerfile to build and use for this container is located in `./Front`.

```
services:
  frontend:
    container_name: app_frontend
    build: './Front'
```

Let's keep it short and let's give it a try !
