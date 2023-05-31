Requisitos
- nodejs 
- npm

clonar:
- https://github.com/GestionGastos/gestion_gastos_backend.git

Execute docker build to create the node image
- docker build -t budget-backend-server:v1 .

Execute docker run to create the container on windows
- docker run -d -p 8080:80 --name=budget-backend -v $PWD/:/usr/src/app --network=budget-servers-network budget-backend-server:v1

Check the rest api with the next url on the browser:
- http://localhost:8080/users/
