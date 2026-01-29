# dinq-autopilot

[English](#english) | [中文](#中文)

---

<div id="english"></div>

## English

**AI Autopilot for Your Dinq Profile**

Auto-generate Dinq cards with Code Agents - Claude Code, Cursor, Windsurf & more.

### What is dinq-autopilot?

dinq-autopilot is an AI agent that automatically manages your [Dinq](https://dinq.me) profile through natural language commands. Built on the Model Context Protocol (MCP), it works seamlessly with Claude Code, Cursor, Windsurf, and other AI coding assistants.

**The Old Way:**
1. Open browser → dinq.me
2. Login → Click "Add Card" → Fill form → Save

**The Autopilot Way:**
```
You: "Create a token stats card for this week"
AI: ✅ Done!
```

### Features

- 🤖 Natural language control - Command your Dinq profile through conversational AI
- 📊 Token statistics - Track your Claude Code usage automatically
- 🔗 Social media cards - Batch import GitHub, LinkedIn, Twitter profiles
- 📝 Custom notes - Create markdown-powered note cards
- 🎯 Career trajectory - Generate professional timeline from your bio
- 🎨 Smart management - List, update, and delete cards

### Quick Start

**Installation:**
```bash
npm install -g dinq-autopilot
```

**Setup:**
```bash
dinq-autopilot setup
```

Get your Dinq API token from [dinq.me/settings/api](https://dinq.me/settings/api)

**Usage in Claude Code:**
```bash
claude

> Create a token stats card with 15000 input and 8000 output tokens
✅ Token statistics card created!

> Create a GitHub card for github.com/username
✅ GitHub card created!

> List all my cards
📋 Your cards: ...
```

### Available Commands

**Card Creation:**
- `create_token_stats_card` - Generate token usage statistics
- `create_github_card` - Create GitHub profile card
- `create_note_card` - Create custom note card
- `create_social_cards` - Batch import social profiles
- `create_career_trajectory` - Generate career timeline

**Card Management:**
- `list_cards` - View all your cards
- `delete_card` - Remove a card

### Supported Tools

- Claude Code
- Cursor
- Windsurf
- VS Code (with Cline)
- Any MCP-compatible AI tool

### Configuration

**Claude Code** (`~/.claude.json`):
```json
{
  "mcpServers": {
    "dinq-autopilot": {
      "command": "npx",
      "args": ["-y", "dinq-autopilot"],
      "env": {
        "DINQ_USER_TOKEN": "your_token_here"
      }
    }
  }
}
```

**Cursor** (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "dinq-autopilot": {
      "command": "npx",
      "args": ["-y", "dinq-autopilot"],
      "env": {
        "DINQ_USER_TOKEN": "your_token_here"
      }
    }
  }
}
```

### License

MIT

---

<div id="中文"></div>

## 中文

**你的 Dinq 个人资料 AI 自动驾驶**

使用 Code Agent 自动生成 Dinq 卡片 - 支持 Claude Code、Cursor、Windsurf 等。

### 这是什么？

dinq-autopilot 是一个 AI 代理，通过自然语言命令自动管理你的 [Dinq](https://dinq.me) 个人资料。基于模型上下文协议（MCP）构建，与 Claude Code、Cursor、Windsurf 等 AI 编程助手无缝协作。

**传统方式：**
1. 打开浏览器 → dinq.me
2. 登录 → 点击「添加卡片」→ 填表 → 保存

**自动驾驶方式：**
```
你：「创建一个本周的 token 统计卡片」
AI：✅ 完成！
```

### 功能特性

- 🤖 自然语言控制 - 通过对话式 AI 指挥你的 Dinq
- 📊 Token 统计 - 自动追踪 Claude Code 使用情况
- 🔗 社交媒体卡片 - 批量导入 GitHub、LinkedIn、Twitter 等
- 📝 自定义笔记 - 创建 Markdown 笔记卡片
- 🎯 职业轨迹 - 从个人简介生成专业时间线
- 🎨 智能管理 - 列出、更新、删除卡片

### 快速开始

**安装：**
```bash
npm install -g dinq-autopilot
```

**配置：**
```bash
dinq-autopilot setup
```

从 [dinq.me/settings/api](https://dinq.me/settings/api) 获取你的 Dinq API token

**在 Claude Code 中使用：**
```bash
claude

> 创建一个 token 统计卡片，输入 15000，输出 8000
✅ Token 统计卡片已创建！

> 为 github.com/username 创建 GitHub 卡片
✅ GitHub 卡片已创建！

> 列出我所有的卡片
📋 你的卡片：...
```

### 可用命令

**卡片创建：**
- `create_token_stats_card` - 生成 token 使用统计
- `create_github_card` - 创建 GitHub 卡片
- `create_note_card` - 创建自定义笔记
- `create_social_cards` - 批量导入社交媒体
- `create_career_trajectory` - 生成职业轨迹

**卡片管理：**
- `list_cards` - 查看所有卡片
- `delete_card` - 删除卡片

### 支持的工具

- Claude Code
- Cursor
- Windsurf
- VS Code（配合 Cline）
- 任何兼容 MCP 的 AI 工具

### 配置方法

**Claude Code** (`~/.claude.json`)：
```json
{
  "mcpServers": {
    "dinq-autopilot": {
      "command": "npx",
      "args": ["-y", "dinq-autopilot"],
      "env": {
        "DINQ_USER_TOKEN": "你的_token"
      }
    }
  }
}
```

**Cursor** (`~/.cursor/mcp.json`)：
```json
{
  "mcpServers": {
    "dinq-autopilot": {
      "command": "npx",
      "args": ["-y", "dinq-autopilot"],
      "env": {
        "DINQ_USER_TOKEN": "你的_token"
      }
    }
  }
}
```

### 开源协议

MIT
