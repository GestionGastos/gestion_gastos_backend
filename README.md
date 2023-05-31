Requisitos
nodejs 
npm

clonar:


Execure docker build to create the node image
docker build -t budget-backend-server:v1 .

docker run -d -p 8080:80 --name=budget-backend -v $PWD/:/usr/src/app --network=budget-servers-network budget-backend-server:v1