# Donaton proyecto fullstack III

  ## Requisitos
  - Entorno docker para ejecutar los contenedores (frontend, backend y bff)
  - Visual studio code
  - Node

## Ejecutar backend -> 
  - Clonar el repositorio que contiene los microservicios <link>https://github.com/brx2b/donaton_proyecto.git</link>
  - Para ejecutar el backend con los microservicios se debe compilar usando el comando <code> ./mvnw clean package -DskipTests </code> dentro de la carpeta raíz de cada microservicio (incluye Eureka y Gateway).
  - Una ves se compilen todos los microservicios se puede levantar el archivo docker compose en la carpeta raíz de los microservicios con el comando <code> docker-compose up -d --build </code>.

## Ejecutar BFF
  - Realizar build de el dockerfile de la carpeta raíz <code> docker build . -t donatonbff </code>
  - correr la imagen <code> docker run -p 400:4000 -d --name donatonbff 'dirección de la imagen' </code> en dirección pegar la id de la imagen (puedes verla con <code>docker ps -a </code>).
## Ejecutar frontend
  - Realizar build de el dockerfile de la carpeta raíz <code> docker build . -t donatonfrontend </code>
  - correr la imagen <code> docker run -p 5173:80 -d --name donatonfrontend 'dirección de la imagen' </code> en dirección pegar la id de la imagen (puedes verla con <code>docker ps -a </code>).
  - también puedes correr el frontend con <code> npm run dev </code> (node necesario y requiere instalar npm install en la consola)

Una ves corriendo los contenedores ir al <code> http://localhost:5173 </code>
