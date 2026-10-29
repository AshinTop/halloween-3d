[English](README.md) · [简体中文](README.zh-CN.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [日本語](README.ja.md)

# Ghost Lanterns 3D — Puzle Lights Out de Halloween

🎃 Un toque puede iluminar todo un rincón de la noche. Ghost Lanterns 3D convierte la lógica de Lights Out en un pequeño jardín de calabazas. Cambia las luces, sigue los vínculos violetas y recibe a los fantasmas en casa con doce puzles diseñados y un jardín diario.

**[Jugar ahora](https://halloween-3d.crazy3d.org/)** · [Ver los 12 juegos de Halloween](https://github.com/AshinTop/halloween-games) · [⭐ Dar una estrella en GitHub](https://github.com/AshinTop/halloween-3d)

El README está disponible en cinco idiomas. La **interfaz del juego solo ofrece inglés y chino simplificado**.

![Jardín de Halloween Ghost Lanterns 3D con contadores de luz, parejas de almas y controles del puzle](docs/images/gameplay.jpg)

## Qué lo hace especial

- Doce jardines de campaña en tableros de 3×3 y 4×4: el objetivo es encender todas las luces.
- Parejas de almas desde el nivel 5, con una conexión adicional en ciertos movimientos.
- Escena geométrica 3D con iluminación y cámara giratoria, alternativa 3D por software y tablero plano opcional.
- Deshacer y reiniciar sin límite, con pistas de una solución de mínimo número de pulsaciones.
- Retos diarios según UTC, enlaces del tablero inicial, récords locales y campanillas opcionales.

## Cómo jugar

Pulsa una linterna para cambiar su estado y el de las vecinas de **arriba, abajo, izquierda y derecha**. Las encendidas se apagan y las apagadas se encienden. Las esquinas y los bordes tienen menos vecinas normales. Ganas cuando todo el jardín está iluminado, sin reloj ni límite de movimientos.

Desde el nivel 5, las marcas violetas señalan parejas de almas. **Pulsar directamente** una integrante cambia también a su pareja una vez. Una linterna modificada por proximidad no transmite el efecto. Si la pareja ya era una vecina afectada, cambia solo una vez.

Deshacer recupera el estado anterior. Hint calcula una solución mínima desde tu tablero actual; la referencia de ruta más corta corresponde al tablero inicial. Todos los jardines de campaña tienen solución. Los diarios se generan aplicando movimientos válidos a un tablero ya resuelto.

## Controles

| Acción | Cómo hacerlo |
| --- | --- |
| Cambiar una linterna | Clic, toque o **Intro / Espacio** en su botón enfocado |
| Seleccionar una linterna | Flechas con el jardín enfocado |
| Deshacer, reiniciar, pista | **U / R / H** o sus botones |
| Girar el jardín | Botones de cámara izquierda y derecha cuando aparezcan |
| Usar tablero plano | Selector de vista |
| Elegir nivel, diario o compartir | Botones correspondientes del jugador |

## Un poco de estrategia

Observa toda la cruz que cambia, no solo la luz que quieres encender. A veces apagar una linterna prepara el último movimiento. Pulsar dos veces la misma devuelve el tablero a su estado anterior; si repites mucho, prueba otra ruta. El vínculo de almas responde a tu pulsación directa, no a cada cambio de luz.

## Progreso y enlaces de desafío

El progreso de campaña, la sesión de campaña actual, las preferencias, los mejores resultados y el uso de pistas se guardan en el navegador. No hay cuenta ni clasificación en línea. El reto diario usa la **fecha UTC**, que puede diferir de tu fecha local.

Este [jardín con pareja de almas](https://halloween-3d.crazy3d.org/#p=v1.3.26.0-8) incluye tablero inicial, tamaño y vínculos. Compartir no envía tus movimientos actuales ni una repetición; otra persona recibe el mismo problema para resolverlo por su cuenta.

## Capturas y presentación en vídeo

![Ghost Lanterns 3D en un iframe compacto con jardín y botones de deshacer y pista](docs/images/mobile.jpg)

Captura real dentro de un iframe compacto. Muestra la distribución en una ventana pequeña, no una prueba en un teléfono físico.

[Reproductor y transcripción](https://halloween-3d.crazy3d.org/intro.html) · [Descargar el MP4](docs/media/intro.mp4)

La **presentación de 24 segundos, sin sonido**, combina capturas reales y rótulos. Es un recorrido visual, no una partida grabada de forma continua ni una muestra de audio.

## Preguntas frecuentes

### ¿Puedo jugar sin WebGL?

Sí. Si no existe un contexto WebGL, Canvas proyecta la geometría 3D real con la misma cámara. También hay un tablero 2D completo; un fallo del renderizador puede activar esa vista plana.

### ¿La pista sigue siempre una guía fija?

No. Resuelve el tablero actual y encuentra una ruta mínima, también después de experimentar o deshacer.

### ¿Se verificó el aspecto de WebGL?

La revisión en navegador comprobó las vistas 3D por software y plana en un entorno sin WebGL. No acredita el aspecto en dispositivos físicos ni una tasa de fotogramas de GPU.

## Ejecutar en local e insertar el juego

Sirve la raíz del repositorio mediante HTTP:

```sh
python3 -m http.server 4173
```

Abre **http://localhost:4173/**. No requiere compilación ni dependencias. Usa HTTP: `file://` puede bloquear los módulos JavaScript.

Ejecuta las comprobaciones incluidas con Node:

```sh
npm test
```

Las pruebas cubren vecindad, vínculos no recursivos, reversibilidad, soluciones de campaña, mínimos de 3×3, enlaces inválidos y 365 diarios. También revisan proyección, giro, cambio de tamaño, marcos estrechos y orden de profundidad.

```html
<iframe src="https://halloween-3d.crazy3d.org/?embed=1"
  title="Ghost Lanterns 3D"
  style="display:block;width:100%;height:540px;border:0"
  allow="fullscreen" allowfullscreen></iframe>
```

Se revisaron ventanas de **960×540**, **390×460**, **390×300** y **844×340**. El tamaño del iframe determina la distribución; `?embed=1` solicita la versión compacta. Se necesitan Canvas y módulos JavaScript; WebGL es opcional. El sonido empieza tras una interacción y puede desactivarse.

Consulta [EMBEDDING.md](EMBEDDING.md) para tamaño, almacenamiento, foco y permisos. Mide la altura restante después de la barra del sitio anfitrión.

## Más pequeñas aventuras de Halloween

- **[Ghostkeeper Maze 3D](https://halloween-haunted-maze.crazy3d.org/)** · [Código](https://github.com/AshinTop/halloween-haunted-maze) — Explora pasillos en primera persona y rescata tres espíritus-linterna.
- **[Pumpkin 2048](https://halloween-2048.crazy3d.org/)** · [Código](https://github.com/AshinTop/halloween-2048) — Combina calabazas numeradas y resuelve pruebas con casillas objetivo.
- **[Witch’s Potion Match](https://halloween-potion-match.crazy3d.org/)** · [Código](https://github.com/AshinTop/halloween-potion-match) — Intercambia ingredientes, provoca cascadas y enciende velas.
- **[Moonlit Mirrors](https://halloween-mirror-hearts.crazy3d.org/)** · [Código](https://github.com/AshinTop/halloween-mirror-hearts) — Guía a dos fantasmas a la vez por tableros reflejados.

## Créditos y apoyo

Creado para **AshinTop** y **Midnight Candy Club** con diseño, programación y revisión dirigidos por personas y asistidos por IA. Arte y sonidos sintetizados originales del proyecto. No necesita cuenta remota; el alojamiento puede añadir scripts o registros de solicitudes.

¿Te ha gustado? **[Dale una estrella en GitHub](https://github.com/AshinTop/halloween-3d)**. Para informar de errores, incluye navegador, tamaño del iframe, enlace y pasos para reproducirlos.
