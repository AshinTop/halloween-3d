[English](README.md) · [简体中文](README.zh-CN.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [日本語](README.ja.md)

# Ghost Lanterns 3D 南瓜灯花园 — 万圣节三维翻灯解谜游戏

🎃 轻轻一点，夜色的一角就会改变。Ghost Lanterns 3D 把经典 Lights Out 翻灯规则装进小小南瓜花园：观察灯光、留意紫色灵魂连线，把每一盏灯点亮，迎接幽灵回家。十二个设计关卡和每日花园，都可以慢慢试、慢慢想。

**[立即试玩](https://halloween-3d.crazy3d.org/)** · [浏览全部 12 款万圣节游戏](https://github.com/AshinTop/halloween-games) · [⭐ 在 GitHub 点亮 Star](https://github.com/AshinTop/halloween-3d)

README 提供五种语言版本。**游戏界面目前仅支持英语和简体中文**；文档翻译不代表新增了对应界面语言。

![Ghost Lanterns 3D 万圣节南瓜花园，展示灯光计数、灵魂连线和解谜控制](docs/images/gameplay.jpg)

## 这款游戏有什么特别

- 十二个主线花园，包含 3×3 与 4×4 棋盘，目标是全部点亮。
- 第五关开始引入灵魂灯配对，让指定点击多影响一个伙伴。
- 有真实几何、光照和旋转镜头的三维场景，另有自动软件三维与可选平面棋盘。
- 无限撤销、重开，以及从当前局面求最少点击路线的提示。
- UTC 每日谜题、初始题面分享、本地记录、可关闭的铃声和减少动态效果支持。

## 怎么玩

点击一盏灯，会翻转它自己及**上、下、左、右**相邻灯的亮灭。亮灯变暗、暗灯变亮；角落和边缘的普通邻灯较少。所有灯同时点亮就完成花园，没有倒计时或总步数上限。

第五关开始，紫色标记代表灵魂配对。只有**直接点击**其中一盏，才会额外翻转它的伙伴一次。被邻接规则影响的灯不会继续传播灵魂效果。如果伙伴本来就在这次点击的普通影响范围内，也只翻转一次。

撤销可退回上一步，提示则重新求解当前局面并给出最少点击路线中的下一步。界面上的最短解参考数字对应初始题面。十二个主线关卡都有解；每日花园从完成状态出发，通过合法点击生成，因此也能解开。

## 操作方式

| 操作 | 输入方式 |
| --- | --- |
| 翻转一盏灯 | 点击或触摸；聚焦灯的按钮后按**回车 / 空格** |
| 选择灯 | 花园获得焦点后使用方向键 |
| 撤销、重开、提示 | **U / R / H**，或对应按钮 |
| 旋转花园 | 显示时使用左右镜头按钮 |
| 切换平面棋盘 | 视图切换按钮 |
| 选关、每日题目、分享 | 使用对应的播放器按钮 |

## 一点小策略

看一次点击影响的整个十字，别只盯着自己想点亮的那盏灯。暂时熄灭一盏灯，可能是在为最后一步做准备。同一盏灯连续点两次会恢复原局面，因此反复点击时可以停下来重新规划。灵魂连线只跟随你直接点击的灯，不跟随所有发生变化的灯。

## 存档与挑战链接

主线进度、当前主线局面、偏好、最佳步数和是否使用提示的记录保存在当前浏览器，没有账号或在线排行榜。每日题目按 **UTC 日期**选择，可能与你当地日期不同。

这个[灵魂配对花园链接](https://halloween-3d.crazy3d.org/#p=v1.3.26.0-8)包含初始棋盘、尺寸和配对信息。分享不会传输当前移动过程或回放；朋友打开的是同一道起始题，可以独立寻找解法。

## 实机界面截图与视频介绍

![Ghost Lanterns 3D 紧凑 iframe 中的花园、撤销与提示按钮](docs/images/mobile.jpg)

实际游戏在紧凑浏览器 iframe 中的截图，用于展示小窗口布局，不代表实体手机测试。

[打开视频播放器与文字介绍](https://halloween-3d.crazy3d.org/intro.html) · [下载 MP4](docs/media/intro.mp4)

**24 秒无声介绍视频**由真实游戏截图与字幕编排而成，用于介绍画面与玩法，并非连续操作录像或音效演示。

## 常见问题

### 没有 WebGL 还能玩吗？

可以。无法创建 WebGL 上下文时，会用 Canvas 和相同镜头投影真正的三维几何。也可以选择完整可玩的二维棋盘；渲染器初始化失败时同样能退回平面模式。

### 提示只照着固定攻略走吗？

不是。它会重新求解当前棋盘，找到最少点击路线；自己探索或撤销后仍可使用。

### WebGL 画面和帧率都验证了吗？

现有浏览器检查在不提供 WebGL 的环境中验证了软件三维与平面视图，不代表已经验证实体设备上的 WebGL 画面或测得 GPU 帧率。

## 本地运行与嵌入

在仓库根目录启动 HTTP 服务：

```sh
python3 -m http.server 4173
```

打开 **http://localhost:4173/**。无需构建或安装依赖；直接使用 `file://` 可能阻止 JavaScript 模块加载。

使用 Node 运行内置检查：

```sh
npm test
```

检查覆盖相邻影响、非递归灵魂连线、可逆点击、全部主线解法、3×3 最少点击结果、无效链接及 365 个每日题目。投影检查包括旋转、缩放适配、小窗口边界与深度排序。

```html
<iframe src="https://halloween-3d.crazy3d.org/?embed=1"
  title="Ghost Lanterns 3D"
  style="display:block;width:100%;height:540px;border:0"
  allow="fullscreen" allowfullscreen></iframe>
```

已检查的浏览器尺寸包括 **960×540、390×460、390×300、844×340**。布局以 iframe 自身尺寸为准，`?embed=1` 可请求紧凑模式。需要 Canvas 和 JavaScript 模块支持，WebGL 可选。声音只在主动交互后启动，也可关闭。

尺寸、存储、焦点和权限说明见[嵌入文档](EMBEDDING.md)。请按扣除主站工具栏后的实际剩余高度设置 iframe。

## 继续逛逛万圣节小游戏集

- **[Ghostkeeper Maze 3D](https://halloween-haunted-maze.crazy3d.org/)** · [源码](https://github.com/AshinTop/halloween-haunted-maze) — 进入第一人称迷宫，寻找三只灯笼精灵。
- **[Pumpkin 2048](https://halloween-2048.crazy3d.org/)** · [源码](https://github.com/AshinTop/halloween-2048) — 合成南瓜数字，挑战指定落点的灯笼试炼。
- **[Witch’s Potion Match](https://halloween-potion-match.crazy3d.org/)** · [源码](https://github.com/AshinTop/halloween-potion-match) — 交换魔药原料，触发连锁并点亮烛火。
- **[Moonlit Mirrors](https://halloween-mirror-hearts.crazy3d.org/)** · [源码](https://github.com/AshinTop/halloween-mirror-hearts) — 用镜像移动同时引导两只幽灵回家。

## 创作说明与支持

为 **AshinTop** 与 **Midnight Candy Club** 制作，由人主导、AI 辅助设计、编程和审查。插画与合成音效为本项目创作。游戏无需远程账号；托管服务可以独立加入脚本或请求日志。

喜欢的话，欢迎**[点亮 GitHub Star](https://github.com/AshinTop/halloween-3d)**。反馈问题时，请附浏览器、iframe 尺寸、挑战链接与复现步骤。
