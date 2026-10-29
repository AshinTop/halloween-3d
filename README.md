[English](README.md) · [简体中文](README.zh-CN.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [日本語](README.ja.md)

# Ghost Lanterns 3D — Halloween Lights Out Puzzle Game

🎃 One touch can brighten a whole corner of the night. Ghost Lanterns 3D turns classic Lights Out into a small pumpkin garden: flip the lanterns, follow violet soul links, and welcome the ghosts home. Twelve authored puzzles and a daily garden invite a quiet moment of experimentation.

**[Play online](https://halloween-3d.crazy3d.org/)** · [Explore all 12 Halloween games](https://github.com/AshinTop/halloween-games) · [⭐ Star this repository](https://github.com/AshinTop/halloween-3d)

README translations cover five languages. The **game interface currently supports English and Simplified Chinese only**.

![Ghost Lanterns 3D Halloween pumpkin garden with light counters, soul-linked lanterns, and puzzle controls](docs/images/gameplay.jpg)

## What makes it special

- Twelve campaign gardens on 3×3 and 4×4 boards; the goal is to light every lantern.
- Soul-linked pairs introduced in level 5 add one extra connection to selected moves.
- A geometric 3D scene with lighting and camera rotation, plus automatic software 3D and an optional flat board.
- Unlimited undo, restart, and exact minimum-click hints from the current state.
- UTC daily puzzles, starting-board share links, local records, optional chimes, and reduced-motion support.

## How to play

Click a lantern to flip it and its neighbors **above, below, left, and right**. A lit lantern goes dark; a dark one lights up. Corners and edges affect fewer ordinary neighbors. Finish when the entire garden is lit. There is no timer or move limit.

From level 5, violet markings identify soul pairs. **Directly clicking** either partner flips the other once as well. A neighbor that changes does not pass this effect onward. If the partner is already an ordinary affected neighbor, it still flips only once.

Use Undo to retrace a move or Hint for a minimum-click solution’s next action from your current board. The displayed shortest-route reference describes the starting puzzle. Campaign gardens are solvable, and daily gardens are made by applying legal moves to a solved board.

## Controls

| Action | Input |
| --- | --- |
| Flip a lantern | Click / tap, or **Enter / Space** on its focused button |
| Choose a lantern | Arrow keys while the garden is focused |
| Undo / restart / hint | **U / R / H**, or the matching buttons |
| Rotate the garden | Left and right camera buttons when displayed |
| Switch to a flat board | View toggle |
| Choose a garden, daily puzzle, or share | The corresponding player buttons |

## A little strategy

Watch the whole cross of a move rather than only the lantern you want to light. Turning one light off can prepare the final step. Clicking the same lantern twice restores the board, so repeated clicks are usually a signal to rethink the route. The soul rule follows your direct click, not every light that changes.

## Progress and challenge links

Campaign progress, the current campaign session, preferences, best move counts, and hint-use records stay in the browser. There is no account or online leaderboard. The daily puzzle uses the **UTC date**, which can differ from your local date.

A [shared soul-pair garden](https://halloween-3d.crazy3d.org/#p=v1.3.26.0-8) contains its starting board, dimensions, and links. Sharing does not transmit your current moves or a replay. A friend receives the same puzzle to solve independently.

## Screenshots and video

![Ghost Lanterns 3D in a compact iframe with the garden and Undo and Hint controls](docs/images/mobile.jpg)

Actual game screenshot from a compact browser iframe; this demonstrates the small-window layout, not a physical-phone test.

[Video player and transcript](https://halloween-3d.crazy3d.org/intro.html) · [Download the MP4](docs/media/intro.mp4)

The **24-second silent introduction** combines actual screenshots and captions. It is a visual tour, not continuous gameplay footage or an audio demonstration.

## Frequently asked questions

### Can I play without WebGL?

Yes. When a WebGL context is unavailable, Canvas projects the actual 3D geometry using the same camera. A fully playable flat 2D board is also available. Renderer failure can fall back to the flat board.

### Does the hint follow a fixed walkthrough?

No. It solves the current board and finds a minimum-click route, including after your own experiments or undo actions.

### Has the WebGL appearance been verified?

Browser review exercised software 3D and flat views in an environment without WebGL. It does not establish physical-device WebGL appearance or a GPU frame-rate result.

## Run locally and embed

Serve the repository root over HTTP:

```sh
python3 -m http.server 4173
```

Open **http://localhost:4173/**. No build or dependencies are needed. Use HTTP: `file://` can block JavaScript modules.

Run the included Node checks:

```sh
npm test
```

Tests cover adjacency, non-recursive soul links, reversible moves, every campaign solution, minimum-click results for 3×3 puzzles, invalid links, and 365 daily solutions. Projection checks cover rotation, resizing, narrow frames, and depth ordering.

```html
<iframe src="https://halloween-3d.crazy3d.org/?embed=1"
  title="Ghost Lanterns 3D"
  style="display:block;width:100%;height:540px;border:0"
  allow="fullscreen" allowfullscreen></iframe>
```

Reviewed browser sizes include **960×540**, **390×460**, **390×300**, and **844×340**. The iframe’s own dimensions control the layout; `?embed=1` requests the compact presentation. Canvas and JavaScript modules are required, while WebGL is optional. Sound starts only after interaction and can be disabled.

See [EMBEDDING.md](EMBEDDING.md) for sizing, storage, input focus, and permissions. Measure available iframe height after the host toolbar.

## More little Halloween adventures

- **[Ghostkeeper Maze 3D](https://halloween-haunted-maze.crazy3d.org/)** · [Source](https://github.com/AshinTop/halloween-haunted-maze) — Explore first-person corridors and rescue three lantern spirits.
- **[Pumpkin 2048](https://halloween-2048.crazy3d.org/)** · [Source](https://github.com/AshinTop/halloween-2048) — Merge numbered pumpkins and solve positional Lantern Trials.
- **[Witch’s Potion Match](https://halloween-potion-match.crazy3d.org/)** · [Source](https://github.com/AshinTop/halloween-potion-match) — Swap ingredients, trigger cascades, and light recipe candles.
- **[Moonlit Mirrors](https://halloween-mirror-hearts.crazy3d.org/)** · [Source](https://github.com/AshinTop/halloween-mirror-hearts) — Guide two ghosts together through reflected puzzle boards.

## Credits and support

Created for **AshinTop** and **Midnight Candy Club** with human-directed, AI-assisted design, programming, and review. Artwork and synthesized sounds are original to this project. The game needs no remote account; hosting may independently add scripts or request logs.

Enjoyed playing? **[Leave a GitHub Star](https://github.com/AshinTop/halloween-3d)**. For bug reports, include browser, iframe size, challenge link, and reproduction steps.
