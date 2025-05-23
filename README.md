Requirements:
- nodejs (v16.17.0)
- npm (v8.15.0)
- git

First, clone the repository:
```sh
git clone https://github.com/GestionGastos/gestion_gastos_backend.git
```
agregar el archivo .env

Execute docker build to create the node image from the project root
```sh
docker build -t budget-backend-server:v1 .
```

Install the depedencies locally from the root
```sh
npm install
```

Create a new network to connect the frontend and backend containers if the network doesn't exist
```sh
docker network create -d bridge budget-servers-network
```
Execute docker run to create the container on windows from the project root
```sh
docker run -d -p 8080:80 --name=budget-backend -v C:\<tu directorio\gestion_gastos_backend:/app --network=budget-servers-network budget-backend-server:v1
```

To ckeck the REST API use the url below
[http://localhost:8080/users/](http://localhost:8080)
