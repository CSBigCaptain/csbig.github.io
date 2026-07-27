---
title: 在微信里养一只“龙虾”
description: 本文详细地介绍了如何将电脑中的 OpenClaw 与微信进行连接，从而在微信中与 OpenClaw 进行交流。介绍了安装 OpenClaw、配置 AI 模型、安装微信插件以及连接多个微信账号的步骤。
date: 2026-03-27
categories: [教程]
tags: [OpenClaw, AI 工具, 微信]
isFeatured: true
schemaOrg:
  - type: 'BlogPosting'
    headline: '在微信里养一只“龙虾”'
    description: '本文详细地介绍了如何将电脑中的 OpenClaw 与微信进行连接，从而在微信中与 OpenClaw 进行交流。介绍了安装 OpenClaw、配置 AI 模型、安装微信插件以及连接多个微信账号的步骤。'
    author:
      type: 'Person'
      name: 'CSBigCaptain'
    datePublished: '2026-06-16'
---

最近“龙虾”的爆火，掀起了一股“养虾热”。越来越多的人了解到了 OpenClaw 这个强大的 AI 小玩具。相对于其他的 Agent，OpenClaw 安装简单，且社区插件丰富，能够轻易接入 Telegram、Discord、飞书等聊天软件。

对于机器人一向是严打态度的微信，居然也顺势推出了自己的 OpenClaw 微信插件。那么借这次机会，我们来聊聊怎么在微信里养一只属于自己的“虾”。

## 准备条件

- 一台能够 7x24 小时在线的电脑，亦或是一个云服务器（不需要对外暴露 OpenClaw 端口）。
- 一个 API Key，需要自行去相关 AI 服务商购买。由于 **OpenClaw 会消耗巨量的 Tokens**，因此只建议购买 Coding Plan 这样的月付套餐来搭配龙虾使用。
- 将手机微信更新到最新版本，目前电脑版不支持 OpenClaw 插件。
- 一定的电脑操作经验：OpenClaw 并非大众软件，有一定使用门槛，不适合缺乏使用经验的同学使用。

<!-- eslint-disable markdown/no-missing-link-fragments -->

如果你觉得这些条件有些难，可以移步到[焚决 — WorkBuddy](#焚决-workbuddy)部分。

<!-- eslint-enable markdown/no-missing-link-fragments -->

## 安装 OpenClaw

### 安装 Node.js

虽然 OpenClaw 官方提供了一键安装脚本，但是如果本机没有安装 Node，脚本会自动为你安装，我个人觉得先手动安装 Node 更可控一些。

前往 [Node.js 官网](https://nodejs.org/zh-cn/download/)下载。翻到下方下载适合平台的安装包（建议选择安装程序）。

### 下载 OpenClaw

建议使用下面的官方一键安装脚本：

macOS/Linux：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

Windows：

```ps
powershell -c "irm https://openclaw.ai/install.ps1 | iex"
```

如果你使用自动安装脚本，安装完成之后会出现一个快速配置的向导，如果你都看不懂，可以使用下面的参考配置：

| 配置项                                                        | 配置内容                                          |
| ------------------------------------------------------------- | ------------------------------------------------- |
| I understand this is powerful and inherently risky. Continue? | 选择 "Yes"                                        |
| Onboarding mode                                               | 选择 "QuickStart"                                 |
| Model/auth provider                                           | 选择 "Skip for now"，后续可以配置                 |
| Filter models by provider                                     | 选择 "All providers"                              |
| Default model                                                 | 使用默认配置                                      |
| Select channel (QuickStart)                                   | 选择 "Skip for now"，后续可以配置                 |
| Configure skills now? (recommended)                           | 选择 "No"，后续可以配置。                         |
| Enable hooks?                                                 | 按空格键选中 "Skip for now"，按回车键进入下一步。 |
| How do you want to hatch your bot?                            | 选择 "Hatch in TUI"。                             |

## 配置 OpenClaw

OpenClaw 的配置文件路径在 `~/.openclaw/openclaw.json`（如果没有需要手动创建），具体的配置方式因 AI 提供商而异，具体请参考平台文档。

也可以搜索“OpenClaw + 你使用的平台 + 模型配置教程”来找到相关的经验帖。

配置之后可以使用 `openclaw gateway` 来启动 OpenClaw 的网关服务，启动完成之后在浏览器中访问 `http://127.0.0.1:18789/` 或者 `http://localhost:18789/` 来进入 OpenClaw 的控制台，进入聊天界面并试着发送消息，如果有消息回复就说明配置成功了。

值得注意的是，如果你有多个配置需要管理，你可以使用[之前文章](/blog/claude-code#配置切换-cc-switch)提到的 CC Switch。

> OpenClaw 的安装脚本默认会安装系统服务，这可能会拖慢开机速度以及占用系统内存，如果你不需要 OpenClaw 开机自动运行，则建议使用下面的命令卸载服务：
>
> ```bash
> openclaw gateway uninstall
> ```
>
> 相反，如果你希望其能开机自动运行（这种情况一般针对云服务器），你会需要安装系统服务：
>
> ```bash
> openclaw gateway install
> ```

## 安装微信插件

### 自动安装

直接在终端运行下面的命令：

```bash
npx -y @tencent-weixin/openclaw-weixin-cli install
```

这个命令会自动把微信插件安装在 OpenClaw 的插件目录下，并自动进行微信登录，届时使用微信扫一扫扫描终端上显示的二维码完成登录。

### 手动安装

如果你在自动安装过程中遇到了问题，你可能需要进行手动安装。

微信插件 npm 包详情：https://npmx.dev/package/@tencent-weixin/openclaw-weixin

#### 安装插件

```bash
openclaw plugins install "@tencent-weixin/openclaw-weixin"
```

#### 启用插件

```bash
openclaw config set plugins.entries.openclaw-weixin.enabled true
```

#### 二维码登录

```bash
openclaw channels login --channel openclaw-weixin
```

终端将显示一个二维码。请用手机扫描并确认授权。确认后，登录凭证会自动保存在本地，无需其他操作。

## 连接多个用户

可以反复运行上面的登录命令以连接多个微信账号：

```bash
openclaw channels login --channel openclaw-weixin
```

在默认情况下，这多个登录的凭据会共享相同的上下文，为了避免多个微信号的聊天记录相互干扰，建议为每个微信号创建一个独立的上下文：

```bash
openclaw config set agents.mode per-channel-per-peer
```

这为每个“微信账号+消息发送者”组合提供了独立的 AI 记忆，避免了不同账号间的上下文干扰。

> 请注意，由于 OpenClaw 有敏感操作权限（如操作电脑中的文件），请勿将 OpenClaw 连接到陌生人微信，避免财产损失。

在你完成上面步骤之后，在终端中使用 `openclaw gateway` 命令以启动 OpenClaw，若控制台没有出现错误，一般就可以在微信中和你的“龙虾”进行交流了。

若想关闭，在终端中按 `Ctrl + C` 后，静待一段时间会自动退出。

## 焚决 — WorkBuddy

如果前面这些步骤对于你来说有些困难，比如不会安装 Node、不会用 npm、没钱买 Tokens 等等，那么可以使用一些开箱即用的成熟工具可能会更适合你。

腾讯推出了许多龙虾工具，有 [QClaw](https://qclaw.qq.com/)（腾讯电脑管家出品）和 [WorkBuddy](https://copilot.tencent.com/work/)（腾讯云出品）。由于我只用过 WorkBuddy，所以后面我就只拿 WorkBuddy 来举例了。

进入软件登录账号后，找到「助理」界面，按照提示绑定微信账号或者是 QQ 机器人即可。

> 请确保电脑中的 WorkBuddy 软件保持在线状态，否则你绑定的小龙虾「微信ClawBot」将无法正常工作。
