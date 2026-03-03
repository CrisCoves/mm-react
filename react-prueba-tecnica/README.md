# Prueba técnica para Juniors y Trainees de React en Live Coding.

APIs:

- Facts Random: https://catfact.ninja/fact
- Imagen random: https://cataas.com/cat/says/hello

- Recupera un hecho aleatorio de gatos de la primera API
- Recuperar la primera palabra del hecho
- Muestra una imagen de un gato con la primera palabra del hecho recuperado usando la segunda API
- Añadir un botón para que el hecho se actualice.

- viendo la API vemos el endpoint para usar: ´https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true´




#### Notas dev a la hora de crear el proyecto:
No creamos el proyecto con create-react-app, sino que lo hacemos a mano, así que lo primero que vamos a hacer es crear el proyecto con npm init y luego
instalamos el plugin de react (midu no cree que en esto te pongan pegas, 
pero es algo que te va a ayudar a la hora de crear el proyecto y a la hora de escribir código, así que es algo que te recomiendo que hagas).

-> instalamos el plugin de react para vite (la -E es para que se instale la última versión, no una versión concreta, 
porque el plugin de react para vite se actualiza muy a menudo y no queremos tener problemas de compatibilidad).:
pnpm install @vitejs/plugin-react -E
(para qué sirve el plugin de react para vite? Pues para que vite pueda entender el código de react, es decir, para que vite pueda compilar el código de
react y convertirlo en código que el navegador pueda entender. Sirve para habilitar el soporte completo de React en proyectos Vite, permitiendo el uso de JSX/TSX,
habilitando la actualización rápida en caliente (HMR - Hot Module Replacement) para ver cambios instantáneamente sin recargar la página, y utilizando herramientas como Babel.js o Oxc para transformar el código.).

-> instalamos react y react-dom
pnpm install react react-dom -E

(react es la librería principal de React, que nos permite crear componentes y gestionar el estado de nuestra aplicación. react-dom es la librería que nos permite renderizar nuestros componentes
en el DOM del navegador (tiene los bindings con el navegador).)

-> creamos el archivo de configuración de vite (vite.config.js) y añadimos el siguiente código:
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'    

export default defineConfig({
  plugins: [react()]
})


Qué es el punto de entrada de tu aplicación? Es el archivo donde se renderiza el componente raíz de tu aplicación, es decir, el componente que va a contener a todos los demás componentes de tu aplicación.
En este caso, el punto de entrada de nuestra aplicación es el archivo main.js, que se encuentra en la carpeta src. En este archivo, vamos a importar react y react-dom, y vamos a renderizar 
el componente raíz de nuestra aplicación (App) en el DOM del navegador. El código de este archivo sería el siguiente:
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello World!</h1>);
     

Este es el punto de entrada de mi aplicación React. Aquí es donde se monta el componente raíz de la aplicación en el DOM.
El archivo main.js es el encargado de renderizar el componente App dentro del elemento con id "app".
Desde aquí, se puede empezar a construir la estructura de la aplicación y agregar funcionalidades según sea necesario.
NOTA! El main.js está fuera de la carpeta src!!!
<script type="module" src="/main.js"></script>

Si ejecutamos pnpm run ev, veremos que nos da un error "The JSX syntax extension is not currently enabled". -> Tenemos que cambiar la extensión de main.js a main.jsx (recordar cambiarlo también en el index.html!)

A continuación muy recomendado, instalar un linter!!!
-> pnpm install standard -D

 y ademés en el package.son incluir:
 "eslintConfig": {
   "extends": ".node_modules/standard/eslintrc.json"
 }

-> Empezamos! creamos archivo app.jsx dentro de src:
IMportante que conforme vas programando se vaya viendo algo
