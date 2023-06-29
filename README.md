Requisitos (Requirements):
- nodejs (v16.17.0)
- npm (v8.15.0)
- git

clonar (Clone):
- git clone https://github.com/GestionGastos/gestion_gastos_backend.git
- agregar el archivo .env

Ejecutar docker build para crear la imagen de node desde la raiz del proyecto (Execute docker build to create the node image from the project root):
- docker build -t budget-backend-server:v1 .

Instalar las dependencias localmente, desde el directorio raiz (Install the depedencies locally from the root):
- npm install

Create una nueva red para conectar los contenedores de frontend y de backend si la red no exite (Create a new network to connect the frontend and backend containers if the network doesn't exist):
- docker network create -d bridge budget-servers-network

Ejecutar docker run para crear el contenedor en windows desde la raiz del proyecto (Execute docker run to create the container on windows from the project root):
- docker run -d -p 8080:80 --name=budget-backend -v C:\<tu directorio\gestion_gastos_backend:/app --network=budget-servers-network budget-backend-server:v1

Para checkear el REST API utilize la url debajo (To ckeck the REST API use the url below):
- http://localhost:8080/users/
