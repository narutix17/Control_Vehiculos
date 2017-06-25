# Aplicacion para el Control de Mantenimientos - Movil #

## Correr el Programa ##

1. Instalar Android Studio de tal manera que se instalen todas las dependencias necesarias de Android (ADB).

2. Instalar [Node.js](https://nodejs.org/es/)

3. Ejecutar:
```
npm install -g cordova ionic
```
4. Ir al directorio donde se encuentra esta carpeta y ejecutar:
```
npm install
```
5. Ponga su celular Android en Developer Mode. Active el Debug Mode.

6. Conecte su celular por USB a la computadora.

7. Para poder ver que esta sucediendo en el celular, ver mensajes de consola ( `console.log("")` ), errores, etc. Ejecutar en el CMD:
```
adb logcat *:I
```
8. Para instalar la aplicacion y probarla en el dispositivo, ejecute los siguientes comandos en el CMD: (ubicandose en este directorio)
```
ionic cordova build android
adb install -r platforms/android/build/outputs/apk/android-debug.apk
```

El primer comando hace **build** de la aplicacion. El segundo la instala en el dispositivo. Luego tiene que buscar la aplicacion entre sus aplicaciones y correrla.

9. Para correr la aplicacion en el navegador:
```
ionic serve
```
Recuerde que en el navegador no funciona SQLITE. El navegador sirve para visualizar la estetica de la aplicacion rapidamente.

10. Para probar cualquier cambio que haga tiene que ejecutar el paso 8.

## Creando un nuevo Controlador ##

1. Crear el controlador dentro de `www/js/controllers/`
2. Siga la estructura de los otros controladores ya creados.
3. Importe el controlador en `www/index.html`, tal y como se importan el resto.


## Haciendo Validaciones ##

1. Utilizar las etiquetas de ng-*
2. Ver `www/templates/agregarVehiculo.html`
