Requisitos
- nodejs (v16.17.0)
- npm (v8.15.0)
- git

clonar:
- git clone https://github.com/GestionGastos/gestion_gastos_backend.git
- 
Execute docker build to create the node image on the project root
- docker build -t budget-backend-server:v1 .

Create a new network to connect the frontend and backend containers if the network doesn't exist
- docker network create -d bridge budget-servers-network

Execute docker run to create the container on windows on the project root
- docker run -d -p 8080:80 --name=budget-backend -v $PWD/:/usr/src/app --network=budget-servers-network budget-backend-server:v1

Check the rest api with the next url on the browser:
- http://localhost:8080/users/
