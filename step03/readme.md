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

And finally let's map the port as we did in the previous exercice:

```
services:
  frontend:
    container_name: app_frontend
    build: './Front'
    ports:
      - 3001:3000
```

Let's keep it short for now and let's give it a try ! To run your the file you just have to use the `docker-compose up -d` command.

Now you can go to `localhost:3001` and see your application running ! Wouhou :)

### Exercice

Now try to implement another service for the backend!

The good thing with docker-compose is that you can just re-run `docker-compose up -d` and it will automatically start the new services ! Nice right ?

/!\ Docker-compose up will not rebuild your image. If you need to rebuild your images, use the flag `--build` or `docker-compose build` before starting your containers.

### Add a database container

Now let's add a database service! Don't hesitate to check the documentation on docker hub to see how to implement it.

As you can see in the documentation, we can pass (and must pass) variable to a container, for that we could define them in our docker-compose file:

```
environment:
  - KEY: value
```

As we can see in the documentation for the MYSQL container to run, we need to provide a password under the `MYSQL_ROOT_PASSWORD` environment variable.

```
  mysql:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: example
```

By default, mysql will run on the port `3306` you can change the port by using the ports setting:

```
  mysql:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_TCP_PORT: 3307
    ports:
      - 3307:3306
```

### Volumes

It's possible to add volumes or bind mounts to a docker-compose:

```
volumes:
  - name:destination
  - /src:destination
```

Let's do that for our frontend:

```
  frontend:
    container_name: app_frontend
    build: ./Front
    volumes:
      - ./Front/src:/app/src
    ports:
      - 3001:3000
```

Be carrefull, if you share the full folder without the /src, you might not want to bind the `node_modules` folder to the container.

For that you can bypass this by creating a volume for the node_modules so that they won't be bind:

```
  backend:
    build: ./Back
    volumes:
      - ./Back:/app
      - /app/node_modules
```

## Docker-compose main commands

- Start the containers => `docker-compose up`
- Stop the containers => `docker-compose down`
- List the containers in the folder => `docker-compose ps`
- Start a specific service => `docker-compose up [service-name]`
- Check the containers logs => `docker-compose logs`
- Check a specific container logs => `docker-compose logs [service]`
