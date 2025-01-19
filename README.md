Bienvenido al proyecto de <em> Gestión de Tareas. </em>

Este proyecto es realizado con las siguientes tecnologías:

* Angular 14.2.2
* Ngx Store 14.3.1
* Tailwind 3.3.5
* Angular Material 13.0.0

La aplicación la puedes correr siguiendo los pasos a continuación:

1. Clona el proyecto en tu carpeta local
```
 https://github.com/macardenas/Trello_Angular.git
```
2. Instala las dependencias
```
npm install
```
o
```
npx npm install
```
3. Corre el proyecto a través del siguiente comando:
```
npm run start
```
4. Para correr los test:
```
npm run test
```

Estructura del proyecto:

Gestión de tareas

    +---app
    |   +---core
    |   |   +---const
    |   |   \---interfaces
    |   +---guards
    |   +---mock
    |   +---modules
    |   |   +---auth
    |   |   |   \---pages
    |   |   |       \---signing
    |   |   \---todo
    |   |       +---components
    |   |       |   +---board
    |   |       |   +---buttons-status
    |   |       |   +---dialogs
    |   |       |   |   +---confirm
    |   |       |   |   \---generic-information
    |   |       |   +---modal-board
    |   |       |   +---modal-columm
    |   |       |   +---modal-todo
    |   |       |   \---todo-item
    |   |       \---pages
    |   |           +---board-detail
    |   |           \---home
    |   +---services
    |   \---state
    |       +---actions
    |       +---reducers
    |       \---selectors
    +---assets
    |   \---img
    \---environments