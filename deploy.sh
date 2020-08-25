sudo docker rm -f littlemallnodejs
sudo docker rmi -f littlemall/littlemallnodejs
sudo docker build -t littlemall/littlemallnodejs .
sudo docker run --name littlemallnodejs -p 7001:7001 -d littlemall/littlemallnodejs