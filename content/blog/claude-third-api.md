---
title: Claude APP 也能用第三方 API 了？！
description: 本文简要介绍了在 Claude APP 中不登录 Anthropic 账号，而使用第三方 API 的方法。
date: 2026-04-29
update: 2026-05-27
categories: [教程]
tags: [Claude, AI 工具]
isFeatured: false
---

之前我写过一篇 [手把手教你配好 Claude Code](/blog/claude-code)，讲的是怎么在 Claude Code 里配第三方 API。

不仅仅是 Claude Code，Claude 桌面客户端也是一个非常不错的 AI Agent 工具。与 Claude Code 一样，Claude APP 在国内不仅需要科学上网，还需要登录 Anthropic 账号才能使用。

事实上，与 Claude Code 一样，Claude APP 也支持使用第三方 API，这样就不需要登录 Anthropic 账号了。

## 下载 Claude APP

前往 Claude 官网下载桌面客户端：https://claude.com/download 。对于 macOS 用户，可以使用 `brew install claude` 命令安装。**此步骤需要科学上网。**

> 注意：笔者写稿时，通过 winget 安装的 Claude APP 无法使用其核心的 Cowork 模式，因此不建议从 winget 安装。

## 启用开发者模式

打开软件，不需要登录。

- 对于 Windows 版，找到软件左上角的三横线按钮，点击后会显示软件工具菜单。
- 对于 macOS 版，软件工具菜单就在屏幕顶部的菜单栏。

找到 “Help” 一栏，点击 “Trouble Shooting”，点击里面的“Enable Developer Mode” 选项。在弹出的提示中点击 “Enable” 即可启用开发者模式。

完成后软件会自动重新启动，并进入开发者模式。

## 启用 CC Switch 路由功能

由于 Claude APP 仅允许使用 Claude 系列的模型。如果你使用的是 DeepSeek、GLM 等其他厂商的模型，那么你需要启用 CC Switch 路由功能。

通过路由功能，CC Switch 可以在本地启动一个代理服务器，夹在你的 CLI 工具和上游 API 之间，能够将不同格式的 API 转换为统一的 Anthropic 格式的 API。这意味着通过路由功能，你的 Claude Code 能够轻松接入不提供 Anthropic API 的 API 平台。

事实上，大多数的 API 平台都提供了 Anthropic API 的兼容接口，为什么还要特意去用路由功能代理呢？代理功能不仅能转换 API 格式，还能把模型的名称映射为 Claude 系列的模型，以绕过 Claude APP 对于第三方模型名称的限制。

在 CC Switch 中找到“Claude Desktop”一栏，如果没有显示的话，需要去设置中打开。配置完供应商之后，在设置 -> 路由设置中找到路由开关并启用即可。做完上述操作后就可以享用 Claude APP 了。
