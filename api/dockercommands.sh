docker build -t cidr-api .

docker run --name cidr-api -p 8080:80 -d cidr-api