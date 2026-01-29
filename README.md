# dinq-autopilot

[English](#english) | [中文](#中文)

---

<div id="english"></div>

## English

### Use Code Agent to Automatically Manage Your Dinq Cards

dinq-autopilot lets you create and manage Dinq cards through natural language - just talk to your AI coding assistant (Claude Code, Cursor, Windsurf, Codex, etc.), and cards appear on your Dinq profile automatically.

**Example:**
```
You: "Create a GitHub card for my profile github.com/username"
AI:  ✅ GitHub card created!

You: "Create a token stats card - 50000 input, 30000 output tokens"
AI:  ✅ Token stats card created!

You: "List all my cards"
AI:  📋 Your cards:
     1. [GITHUB] username
     2. [TOKEN_STATS] This month
```

<!-- Demo GIF will go here -->

---

### Quick Start

**1. Install**
```bash
npm install -g dinq-autopilot
```

**2. Login**
```bash
dinq-autopilot login
```
Follow the browser prompt to get your Dinq API token from [dinq.me/autopilot](https://dinq.me/autopilot)

**3. Use**

In Claude Code:
```bash
claude
> Create a note card titled "Meeting Notes" with content "Discussed Q1 roadmap"
```

In Cursor:
```
Cmd+K → "Add my LinkedIn profile to Dinq: linkedin.com/in/username"
```

That's it! The autopilot automatically calls Dinq API and creates cards for you.

---

### What You Can Do

**Create Cards:**
- Token usage statistics (auto-track your AI usage)
- Social media profiles (GitHub, LinkedIn, Twitter, Spotify, etc.)
- Career trajectory (AI-generated timeline from your bio)
- Custom notes (Markdown-powered)
- Batch import multiple platforms at once

**Manage Cards:**
- List all cards
- Delete cards
- Update existing cards

**All Through Natural Language** - No clicking, no forms, no context switching.

---

### Supported Tools

Works with any MCP-compatible AI coding assistant:

- **Claude Code**
- **Cursor**
- **Windsurf**
- **Codex**
- **VS Code** (with Cline extension)
- Any other MCP client

---

### How It Works

```
You → AI Assistant → dinq-autopilot (MCP Server) → Dinq API → Card Created ✅
```

Built on [Model Context Protocol (MCP)](https://modelcontextprotocol.io) - the open standard for connecting AI assistants to external tools.

---

### Configuration

After running `dinq-autopilot login`, the tool automatically configures itself in your AI assistant. Your API token is stored locally and never shared.

Manual configuration: See [examples/](./examples) for Claude Code, Cursor, and other tools.

---

### License

MIT

---

<div id="中文"></div>

## 中文

### 使用 Code Agent 自动操作你的 Dinq 卡片

dinq-autopilot 让你通过自然语言创建和管理 Dinq 卡片 - 只需对你的 AI 编程助手（Claude Code、Cursor、Windsurf、Codex 等）说话，卡片就会自动出现在你的 Dinq 主页上。

**示例：**
```
你：「为我的 GitHub 主页 github.com/username 创建一张卡片」
AI： ✅ GitHub 卡片已创建！

你：「创建一个 token 统计卡片 - 输入 50000，输出 30000 tokens」
AI： ✅ Token 统计卡片已创建！

你：「列出我所有的卡片」
AI： 📋 你的卡片：
     1. [GITHUB] username
     2. [TOKEN_STATS] 本月统计
```

<!-- 演示 GIF 将放在这里 -->

---

### 快速开始

**1. 安装**
```bash
npm install -g dinq-autopilot
```

**2. 登录**
```bash
dinq-autopilot login
```
根据浏览器提示从 [dinq.me/autopilot](https://dinq.me/autopilot) 获取你的 Dinq API token

**3. 使用**

在 Claude Code 中：
```bash
claude
> 创建一个笔记卡片，标题是「会议记录」，内容是「讨论了 Q1 路线图」
```

在 Cursor 中：
```
Cmd+K → 「把我的 LinkedIn 加到 Dinq：linkedin.com/in/username」
```

就这样！自动驾驶会自动调用 Dinq API 为你创建卡片。

---

### 你可以做什么

**创建卡片：**
- Token 使用统计（自动追踪 AI 使用情况）
- 社交媒体资料（GitHub、LinkedIn、Twitter、Spotify 等）
- 职业轨迹（AI 根据你的简介生成时间线）
- 自定义笔记（支持 Markdown）
- 批量导入多个平台

**管理卡片：**
- 列出所有卡片
- 删除卡片
- 更新现有卡片

**全部通过自然语言完成** - 无需点击、无需填表、无需切换窗口。

---

### 支持的工具

适用于任何兼容 MCP 的 AI 编程助手：

- **Claude Code**
- **Cursor**
- **Windsurf**
- **Codex**
- **VS Code**（配合 Cline 扩展）
- 任何其他 MCP 客户端

---

### 工作原理

```
你 → AI 助手 → dinq-autopilot (MCP 服务器) → Dinq API → 卡片创建 ✅
```

基于 [模型上下文协议 (MCP)](https://modelcontextprotocol.io) 构建 - 连接 AI 助手与外部工具的开放标准。

---

### 配置说明

运行 `dinq-autopilot login` 后，工具会自动在你的 AI 助手中完成配置。你的 API token 存储在本地，不会被分享。

手动配置：查看 [examples/](./examples) 目录，有 Claude Code、Cursor 等工具的配置示例。

---

### 开源协议

MIT
