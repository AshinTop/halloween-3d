# Embedding Ghost Lanterns 3D

Serve the directory over HTTPS with `index.html` as the entry point. This is a buildless static game with local ES modules, authored geometry and synthesized sound. It makes no external API or asset requests.

```html
<iframe
  src="/halloween/ghost-lanterns/index.html?embed=1"
  title="Ghost Lanterns 3D — Halloween puzzle"
  allow="clipboard-write"
  style="display:block;width:100%;aspect-ratio:16/9;min-height:300px;border:0"
></iframe>
```

The game automatically detects iframe embedding; `?embed=1` forces the same layout in a standalone QA tab. It does not read or modify the parent page. A restrictive sandbox must permit scripts; the host should choose its origin policy. No fullscreen or gamepad permission is needed. The host owns fullscreen.

## Real host dimensions

Crazy3D's current host uses a desktop 16:9 iframe with a 300 px minimum height. At widths of 992 px or less, it uses `calc(100vh - 200px)`, a 460 px maximum, and the same 300 px minimum. Fullscreen allows flexible height; the host has a 45 px desktop toolbar. The embedded game fills the iframe viewport without document scrolling and reserves space at the upper right for host controls.

The short layout keeps the whole puzzle, stats, Undo, Restart, Share and Hint actions visible. Gardens and Help open modal panels, and the Gardens dialog includes Daily moonlight. On larger screens, a side journal explains the current puzzle. On small screens this text remains accessible through Help and Gardens rather than displacing the board. Dialog content can scroll internally.

The parent QA session verified 960×540, 390×460, 390×300, and 844×340 without page overflow or inaccessible controls and completed the first puzzle in the flat board mode. A subsequent visual pass verified the Canvas 3D backend, corrected platform occlusion, exercised rotation and restart, completed the first 3D puzzle, and completed the 4×4 ninth garden in four clicks inside a 390×300 iframe. Its 374×196 canvas and projected controls remained inside the frame after resizing. These are browser viewport tests, not physical phone or GPU performance measurements.

## Rendering and diagnostics

The renderer first requests a WebGL context. When available, it renders original triangle meshes with depth testing, normal lighting, an orthographic camera, and orbit controls. When a browser provides no WebGL context, Canvas 2D draws a low-poly version of the same three-dimensional geometry: world coordinates, camera matrix, projection, normal lighting and triangle depth sorting remain real 3D. This compatibility renderer is not a static image or CSS-perspective board. It uses fewer pumpkin subdivisions and redraws on changes and brief feedback animations. A separate, complete flat 2D board is available from the view button. If WebGL initialization fails after creating a context, or that context is lost, the flat board is the final fallback.

Inspect `#scene` for QA:

- `data-webgl-status`: `ready`, `unavailable`, `initialization-error`, or `context-lost`.
- `data-renderer`: `webgl` or `canvas-3d` after successful scene initialization.
- `data-render-mode`: current player view, `3d` or `2d`.
- `data-renderer-error`: actual initialization reason if applicable.

Shader errors include compiler/linker messages in console diagnostics. A missing GPU context is not reported as a shader failure. In the cloud QA environment, the browser did not provide a WebGL context; that backend's final GPU appearance therefore remains unverified there.

`ResizeObserver` listens to the canvas itself. Hidden canvases with zero dimensions defer rendering; showing or resizing the iframe requests a fresh matrix, buffer size and projected button positions. DOM controls and visual meshes use the same projection. Automated matrix tests cover 3×3/4×4 gardens, 16 camera angles, narrow and wide viewports, platform/marker bounds, resizing and painter depth order. Device pixel ratio is capped at 2 for reasonable memory use.

## Input, persistence and sharing

Tap/click uses native buttons placed at the projected lantern positions. Arrow keys move board focus, Enter/Space activate, U undoes, R restarts, H hints. Sound requires a user interaction. Language, sound, best records and current regular-level progress stay on the device. Storage failure does not stop play.

`#p=...` encodes the starting board, dimensions and soul pairs. Incoming data is validated and checked for solvability. Daily boards use a deterministic UTC date seed. Clipboard restrictions leave a selectable manual-copy link. The user can finish every puzzle without audio, GPU support, network access after loading, or a fullscreen API.
