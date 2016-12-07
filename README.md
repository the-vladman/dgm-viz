# dgm-viz
Visualizaciones de los 50 datasets más descargados en [datos.gob.mx](http://datos.gob.mx/).

-## Instalación      +Usando [Docker](https://docs.docker.com/engine/getstarted/)
 -0. `git clone https://github.com/mxabierto/dgm-viz.git`        +
 -1. `cd visualizaciones/`       +```
 -    * `bower install`      +docker run --rm \
 -2. `cd ..`         +--name dgm-viz \
 -3. `python3 -m http.server 6000`       +-p '8080:80' \
 -4. Ir a [localhost:6000/visualizaciones](http://localhost:6000/visualizaciones)

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
