# Halloween 3D Puzzle Game — Ghost Lanterns 3D

**One little tap changes the night. Light every pumpkin and guide the ghosts home.**

Ghost Lanterns 3D is a Halloween logic puzzle built around the classic Lights Out rule. Tap a pumpkin lantern to flip it and its orthogonal neighbors, then find a sequence that lights the entire garden. Twelve handcrafted starting puzzles introduce 3 × 3 and 4 × 4 boards, while paired “soul lanterns” add a small strategic surprise.

Part of **Midnight Candy Club**, created for the Halloween collection at [crazy3d.org](https://crazy3d.org).

**[GitHub Pages deployment target](https://ashintop.github.io/halloween-3d/)** · **[Watch the visual introduction](docs/media/intro.mp4)** · **[Embedding guide](EMBEDDING.md)**

**Deployment status:** GitHub Pages is not live yet. The `ashintop.github.io` links in this document are intended deployment addresses. Use the local-run instructions until the hosted game has been published and verified.

[Video player and transcript (deployment target)](https://ashintop.github.io/halloween-3d/intro.html) · [Captioned MP4 file](docs/media/intro.mp4). The 24-second silent introduction uses actual game screenshots; it is not a live gameplay recording.

![Ghost Lanterns 3D Halloween logic puzzle with a low-poly pumpkin garden, progress counters, and level controls](docs/images/gameplay.jpg)

## What makes this pumpkin puzzle different?

- **12 progressive campaign puzzles** with 3 × 3 and 4 × 4 gardens.
- **Classic Lights Out logic** with a clear goal: turn every lantern on.
- **Soul lantern pairs** from the fifth level onward. Directly tapping a marked lantern also flips its distant partner once.
- **A real three-dimensional garden**, built from original pumpkin geometry, a raised garden base, lighting, and a rotating orthographic camera.
- **Automatic Canvas software 3D fallback** when WebGL is unavailable, plus a complete optional flat 2D board.
- **Unlimited undo, restart and an exact solver-backed hint** from the current board state.
- **Shortest-solution references**, local best move counts, and records of whether hints were used.
- **A daily puzzle keyed to the UTC date**, and links that share the starting puzzle exactly.
- **English and Simplified Chinese**, touch, mouse and keyboard support, optional synthesized chimes, and reduced-motion support.
- **No external 3D library, downloaded models, runtime CDN, account, or server.**

## How to play

1. Tap a pumpkin lantern. Its own state and the states of its up, down, left and right neighbors flip.
2. Keep going until every lantern is lit.
3. From level 5, watch for violet soul-pair markings. Directly clicking either partner flips the other partner too.
4. Use Undo to explore another route, or ask for a Hint when you need a nudge.
5. Try a shorter solution, the next garden, or today's moonlight puzzle.

### The soul-pair rule

A soul link reacts only when one of its members is the lantern you directly click. It does not trigger recursively from a neighboring lantern's change. If the partner is already one of the ordinary affected neighbors, it still flips only once. This makes every move reversible and keeps the rule predictable.

### Controls

| Action | Input |
| --- | --- |
| Flip a lantern | Click, tap, or activate the focused lantern button |
| Move focus between lanterns | Arrow keys while the garden is focused |
| Undo | **U** or Undo button |
| Restart | **R** or Restart button |
| Request a hint | **H** or Hint button |
| Rotate the garden | Left / right camera buttons when shown |
| Flat 2D view | View toggle in the player |
| Select a level, daily puzzle, or share | The corresponding player buttons |

## Three ways to see the same puzzle

| Rendering mode | What it does |
| --- | --- |
| Native WebGL | Renders the original low-poly geometry with normal-based lighting and an orthographic camera |
| Canvas software 3D | Projects the same world coordinates and camera, lights the geometry, and depth-sorts triangle faces using Canvas 2D |
| Flat 2D | Presents the full playable board as large ordinary buttons |

The game chooses software 3D automatically if a WebGL context cannot be created. The software path is a geometric 3D projection, not a static image. The flat mode remains available as an explicit user choice.

The project’s browser review verified the software 3D and flat paths in an environment without WebGL. It does **not** claim a measured GPU frame rate or verified WebGL appearance on a physical device. Actual performance depends on the browser and hardware.

## Puzzles, hints, and local progress

The solver models the puzzle over GF(2), performs elimination, and examines the remaining solution space to choose a minimum-length set of clicks. The Hint button uses the current board, so it remains useful after exploring or undoing moves.

Campaign progress, the current campaign puzzle session, preferences, and best move records are stored in the current browser. There is no account or leaderboard. A shared link contains the **starting board and soul-pair configuration**, rather than a recording of your moves; it opens the same challenge for another player.

Daily puzzles use the UTC date. Their generation starts from a solved board and applies valid moves, so the generated starting state has a solution.

## Run locally and test

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173/`. The game uses ES modules, so serve it through HTTP. No dependency installation or build step is needed.

```sh
npm test
```

The **9 focused tests** cover classic adjacency, non-recursive soul links, reversible moves, complete solutions for every campaign puzzle, an independent minimum-click enumeration for 3 × 3 boards, invalid share parameters, and complete solutions for 365 daily puzzles. Projection tests cover camera rotation, resizing, narrow-frame bounds, and depth ordering.

## Compact-player walkthrough

![Ghost Lanterns 3D in a compact host iframe, showing the pumpkin garden and puzzle controls](docs/images/mobile.jpg)

Tap a lantern to flip it and its neighbors, then watch the lit count. Undo and Hint remain available in the compact player. The optional flat board provides another view of exactly the same puzzle.

*Actual interface captured in a browser iframe sized for the host player. This is a compact-window illustration, not a physical-phone test.*

## Embedding

The player adapts to its actual iframe size, including **960 × 540**, **390 × 460**, **390 × 300**, and **844 × 340** CSS pixels. The main site's navigation or fullscreen toolbar should sit outside the iframe. `?embed=1` can request the compact presentation explicitly; iframe detection also enables it automatically. See [EMBEDDING.md](EMBEDDING.md).

```html
<iframe src="https://ashintop.github.io/halloween-3d/?embed=1"
  title="Ghost Lanterns 3D" width="960" height="540"
  allow="fullscreen" allowfullscreen
  style="display:block;width:100%;border:0"></iframe>
```

Modern Canvas and ES-module support are required. WebGL is optional because the software and flat views are available. Sounds are synthesized only after a user interaction and can be switched off.

## Frequently asked questions

**Is every campaign garden solvable?**  
Yes. The game stores valid starting puzzles and tests their complete solver-generated winning sequences.

**Do soul links create a chain reaction?**  
No. Only directly clicking a paired lantern activates its partner, and each affected lantern flips once.

**Can I play without WebGL?**  
Yes. The automatic Canvas software renderer and optional flat board both work without a WebGL context.

**Does the hint always suggest the next move from the original solution?**  
No. It solves your current board state, including changes made during experimentation.

## Creation credits

Created for Ashin's Midnight Candy Club with AI-assisted puzzle design, programming, documentation, testing, and review. The pumpkin geometry, garden artwork, rendering paths, and synthesized chimes were developed in code for this project. Actual-interface screenshots and the captioned visual introduction accompany the source; they do not establish an unmeasured GPU performance claim.

## More from Midnight Candy Club

- [Ghostkeeper Maze 3D](https://github.com/AshinTop/halloween-haunted-maze) — explore first-person corridors and rescue three little lantern spirits.
- [Pumpkin 2048](https://github.com/AshinTop/halloween-2048) — merge candlelit numbers and solve limited-move Lantern Trials.
- [Witch’s Potion Match](https://github.com/AshinTop/halloween-potion-match) — brew Halloween potions through match-three puzzles.
- [Moonlit Mirrors](https://github.com/AshinTop/halloween-mirror-hearts) — guide a pair of ghosts through mirrored movement puzzles.

If you enjoyed lighting the garden, **[star this repository](https://github.com/AshinTop/halloween-3d)** to support the project and find it again. Useful bug reports include the level or shared link, rendering mode, browser, and device.
