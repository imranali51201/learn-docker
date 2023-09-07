##  Mannual build images and run containers

Setup [Dockerfile](/Dockerfile), then run these commands

~~~bash  
  docker build --build-arg MONGODB_URI=`MONGODB_URI` nodejs:1.0 . 
~~~

To run that built image

~~~bash  
  docker run -d --name nodejs_container -p 5000:4000 nodejs:1.0
~~~

To create newtwork  

~~~bash  
  docker network create my-network
~~~

To create volume  

~~~bash  
  docker volume create my-volume
~~~

To add network to container add these extra parameter in run command  

~~~bash  
  --network my-network
~~~

To add volume to container add these extra parameter in run command  

~~~bash  
  -v my-volume:/data/db
~~~
