# dgm-viz
Visualizaciones de algunos de los datasets más descargados en [datos.gob.mx](http://datos.gob.mx/).

## Instalación
0. `git clone https://github.com/mxabierto/dgm-viz.git`
1. `cd visualizaciones/`
    * `bower install`
2. `cd ..`
3. `python3 -m http.server 6000`
4. Ir a [localhost:6000/visualizaciones](http://localhost:6000/visualizaciones)

### Instalación - Usando [Docker](https://docs.docker.com/engine/getstarted/)

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
