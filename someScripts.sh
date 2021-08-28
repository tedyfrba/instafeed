docker run -d --name instafeed-mongo  -p 27017:27017 -v c:/Users/tadeo.granese/Project/tedyfrba/instafeed-mongo:/data/db mongo
docker exec -it instafeed-mongo bash