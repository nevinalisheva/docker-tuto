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