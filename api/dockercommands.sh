docker build -t cidr-api .

docker run --name cidr-api -p 8080:80 -d cidr-api

# to push to heroku master
# login to heroku
# heroku git: remote -a cidr-calc-api

git subtree push --prefix api heroku master