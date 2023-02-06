## ÍNDICE
* [1. Rick & Morty Fanpage](#1-Rick-&-Morty-Fanpage )
* [2. Proyecto](#2-proyecto)
* [3. API](#3-api)
* [4. Decisiones técnicas](#4-decisiones-tecnicas)
* [5. Autor](#5-autor)
* [6. Resultado final](#6-resultado-final)

***
<img src="/frontend/src/assets/readme.jpeg" width="800">
</div>

# 1. Rick & Morty Fanpage

✍ Es una página web para los fans de la serie Rick and Morty. Permite a cualquier usuario crearse una cuenta de acceso y loguearse con ella; ver los personajes en tarjetas personalizadas, calificarlos, comentar la calificación asognada y agregarlos a la lista de personajes favoritos.

Este proyecto es contruido en una **Single-page Application** (SPA) responsive (con más de una vista / página).

***

## 2. Proyecto ✍🏼

###  🕵🏼 El proyecto contiene 3 módulos principales:

###  🕵🏼‍♀️ Autenticación

  - Inicio de sesión
    - Ingreso de email
    - Ingreso de contraseña
  - Registro para nuevos usuarios
    - Ingreso de nombre y apellido
    - Ingreso de nickname
    - Ingreso de email
    - Ingreso de constraseña

    El nickname y el email son únicos por usuario 

###  🕵🏼‍♀️ Personajes

  - Lista de personajes
    - Tarjetas
        - 1. Imagen del personaje
        - 2. Nombre en la serie
        - 3. Género
        - 4. Lista de episodios en el que aparece
        - 5. Estado( Vivo, muerto, desconocido)
        - 6. Botón "Agregar a mi lista"
  - Mi lista de personajes
    - Tarjetas
        - 1. Imagen del personaje
        - 2. Nombre en la serie
        - 3. Género
        - 4. Lista de episodios en el que aparece
        - 5. Estado( Vivo, muerto, desconocido)

    En ambas vistas existe un buscador tipo input que filtra los personajes

  - **📌 Tecnología empleada:**
    - Angular versión 12
    - Bootstrap versión 5

## 3. API 🕵🏽‍♂️ 
Se desarrolló una pequeña api para la creación, sesión de usuarios y la información de "Mi lista de personajes":
  
  - **📌 Tecnologías empleada:**
    - NodeJS versión 14
    - MongoDB versión 5
  - **📌 Vistas públicas:** 
    - Inicio de sesión / Login.
    - Registro de usuario
  - **📌 Vistas privadas:**
    - Lista de personajes 🧔 👨‍🦱 👴 👩‍🦰 👱‍♂️ 👳 👲
    - Mi lista de personajes


### 3.1 Ejecución ✍

Para la ejecución del backend:

- Instalar e iniciar MongoDB
- Descargar el proyecto
    - Ubicarnos en la carpeta backend y ejecutar el comando
        - npm i
- Una vez instaladas las dependencias ejecutar el comando
    - npm start

Para la ejecución del frontend:

- Instalar Angular
- Ubicarnos en la carpeta frontend y ejecutar el comando
    - ng serve

***
## 4. Decisiones técnicas 📍

- Para la implementación de la autenticación se utilizó JWT (Json Web Token)
- Para la calificación del personaje que se agrega en la lista se implementó un modal
- Para la comunicación entre servidores se utilizó CORS
- Para la implementación del buscador se utilizó ng2-search-filter

***
## 5. Autor 📍
- [Mariana Guanda](https://github.com/marianagdeveloper)

***
## 6. Resultado final 📍

### Vista: Inicio de sesión
<div align="center">
<img src="/frontend/src/assets/login.png">
</div>

**

### Vista: Registro de usuario
<div align="center">
<img src="/frontend/src/assets/signup.png">
</div>

**

### Vista: Personajes de Rick & Morty
<div align="center">
<img src="/frontend/src/assets/signup.png">
</div>

**

### Vista: Calificación y comentario de personajes favoritos
<div align="center">
<img src="/frontend/src/assets/record.png">
</div>

**

### Vista: Lista de personajes favoritos
<div align="center">
<img src="/frontend/src/assets/favorites.png">
</div>

**

### Vista: Lista de personajes favoritos
<div align="center">
<img src="/frontend/src/assets/favorites.png">
</div>




