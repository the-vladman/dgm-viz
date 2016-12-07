# dgm-viz
Visualizaciones de los 50 datasets más descargados en [datos.gob.mx](http://datos.gob.mx/).

### Instalación

Usando [Docker](https://docs.docker.com/engine/getstarted/)

```
docker run --rm \
--name dgm-viz \
-p '8080:80' \
-v $(pwd):/usr/share/nginx/html \
nginx
```

Usando [Docker Compose](https://docs.docker.com/compose/gettingstarted/)

```
docker-compose up
```
