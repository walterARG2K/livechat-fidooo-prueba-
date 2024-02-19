# Proyecto de Prueba Técnica - LiveChat Fidooo

Este proyecto es un chat en tiempo real desarrollado como prueba técnica para Fidooo. Utiliza tecnologías como Next.js, React, TypeScript, Firebase (Authentication y Firestore), Redux Toolkit, React-Redux, y otras dependencias.

## Características Principales

- Autenticación con Firebase Authentication.
- Envío y recepción de mensajes en tiempo real con Firebase Firestore.
- Creación de salas de chat.
- Desarrollado con Next.js 14, React y TypeScript.
- Manejo del estado global con Redux Toolkit y React-Redux.
- Utilización de react-cookie, luxon y jwt-decode para funcionalidades específicas.

## Modo de Uso

A continuación se detallan los pasos para utilizar la aplicación:

#### 1. Inicia Sesión o Crea una cuenta

Primero, inicia sesión en la aplicación utilizando tu cuenta de usuario o crea una nueva cuenta.

#### 2. Navegación al Chat

Después de iniciar sesión, automáticamente serás redireccionado a el home, donde tendrás una variedad de opciones disponibles.

#### 3. Crear un Nuevo Chat (Opcional)

Si deseas crear un nuevo chat, haz clic en el botón para **'Crear un nuevo Chat'**. Deberás asignar un nombre a tu chat y una vez creado serás redireccionado al mismo.

#### 4. Unirte a un Chat Existente

Para unirte a un chat existente, haz clic en el botón **'Ingresar a un chat'**. Se te solicitará el código especifico del chat que deseas unirte, una vez realizado ese paso serás redireccionado al chat.

#### 5. Compartir el Código del Chat

Si eres el creador del chat o te encuentras ya en el chat, en la parte superior izquierda podrás ver un código compartelo para que otra persona pueda unirse a tu chat.

#### Notas Adicionales

- El botón 'Ingresar al Chat Global' te permitirá ingresar a un chat público donde todas las personas tienen acceso.

## Estructura del Proyecto

El proyecto sigue una estructura organizativa que facilita la escalabilidad y mantenimiento. A continuación, se presenta una breve descripción de cada carpeta:

- **`/app`**: Contiene las páginas de la aplicación organizadas por rutas.

- **`/components`**: Almacena componentes que manejan la información.

- **`/hooks`**: Contiene hooks personalizados, que se encargan de la información que va cambiando.

- **`/config`**: Guarda configuraciones específicas del proyecto, como la configuración de Firebase.

- **`/services`**: Contiene módulos que manejan llamadas a servicios externos, pueden tener funciones para autenticación, manejo de mensajes, etc.

- **`/redux`**: Almacena la configuración de Redux.

- **`/types`**: Contiene tipos globales utilizados en toda la aplicación.

- **`/utils`**: Guarda funciones de utilidad reutilizables.

- **`/ui`**: Contiene componentes de interfaz de usuario con poca lógica y mayor enfoque visual.

## Requisitos

Antes de comenzar, asegúrate de tener instalado Node.js en tu máquina.

## Inicialización del Proyecto

1. **Clona el Repositorio:**

   ```bash
   git clone git@github.com:walterARG2K/livechat-fidooo-prueba-.git
   cd livechat-fidooo-prueba
   ```

2. **Instala las Dependencias:**

```bash
npm install
```

3. **Configura el entorno:**

crea un archivo en la ruta raíz llamado .env

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_MULTIAVATAR_API_KEY=
```

4. **Inicia el modo desarrollo:**

```bash
npm run dev
```
