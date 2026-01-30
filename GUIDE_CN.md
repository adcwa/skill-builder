# Skill Builder - 完整使用指南

## 项目概述

`skill-builder` 是一个交互式 CLI 工具,用于创建符合 skills.sh 规范的自定义 skill。

## 核心特性

✅ **交互式创建** - 通过友好的问答式界面创建 skill
✅ **规范检查** - 自动验证 skill.json、README.md 等文件
✅ **双运行时支持** - 支持 Node.js 和 Python
✅ **模板生成** - 自动生成完整的项目结构和代码框架
✅ **安全优先** - 内置安全配置引导
✅ **即用即走** - 支持 npx 直接使用,无需安装

## 安装方式

### 方式 1: npx (推荐)

```bash
npx skill-builder create
```

### 方式 2: 全局安装

```bash
npm install -g skill-builder
skill-builder create
```

### 方式 3: 本地开发

```bash
git clone <repo>
cd skill-builder
npm install
node index.js create
```

## 使用方法

### 创建新 Skill

```bash
npx skill-builder create
```

系统会引导你输入:

1. **基础信息**
   - Skill 名称 (kebab-case)
   - 人类可读标题
   - 一句话描述 (≤120 字符)
   - 作者信息

2. **运行时选择**
   - Node.js
   - Python

3. **标签和许可证**
   - 2-5 个标签
   - 开源协议选择

4. **命令配置**
   - 至少一个命令
   - 命令名称和描述

5. **安全配置**
   - 是否修改文件
   - 是否需要确认

### 验证现有 Skill

```bash
cd your-skill-directory
npx skill-builder validate
```

验证内容包括:
- skill.json 必需字段
- README.md 推荐章节
- 入口文件是否存在且可执行
- 命名规范
- 描述长度

## 生成的文件结构

### Node.js Skill

```
my-skill/
├── skill.json          # Skill 元数据
├── package.json        # npm 配置
├── index.js            # CLI 入口 (可执行)
├── README.md           # 完整文档
├── .gitignore          # Git 忽略规则
└── examples/           # 使用示例
    └── README.md
```

### Python Skill

```
my-skill/
├── skill.json          # Skill 元数据
├── main.py             # CLI 入口 (可执行)
├── requirements.txt    # Python 依赖
├── README.md           # 完整文档
├── .gitignore          # Git 忽略规则
└── examples/           # 使用示例
    └── README.md
```

## 生成文件详解

### 1. skill.json

符合 skills.sh 规范的元数据文件:

```json
{
  "name": "my-skill",
  "title": "My Skill",
  "description": "Does something useful",
  "version": "0.1.0",
  "author": "yourname",
  "license": "MIT",
  "runtime": "node",
  "entry": "index.js",
  "tags": ["cli", "tool"],
  "commands": [
    {
      "name": "run",
      "description": "Run the command"
    }
  ]
}
```

### 2. README.md

包含所有必需章节:
- Install - 安装说明
- Usage - 使用方法
- Examples - 使用示例
- Safety - 安全说明
- License - 许可证信息

### 3. 入口文件

#### Node.js (index.js)

```javascript
#!/usr/bin/env node

// 完整的 CLI 框架
// - 参数解析
// - 帮助信息
// - 版本信息
// - 命令处理
```

#### Python (main.py)

```python
#!/usr/bin/env python3

# 完整的 CLI 框架
# - argparse 配置
# - 子命令支持
# - 帮助信息
# - 版本信息
```

## 实际使用示例

### 示例 1: 创建 Node.js 文件处理工具

```bash
$ npx skill-builder create

? Skill name: file-merger
? Title: File Merger
? Description: Merge multiple files into one
? Author: yourname
? Runtime: Node.js
? Tags: files, cli, merge, tools
? License: MIT

Commands:
? Command name: merge
? Description: Merge files into one output file
? Add another? No

Safety:
? Modify files? No
? Need confirmation? Yes

✅ Skill "file-merger" created successfully!

Next steps:
  cd file-merger
  npm install
  node index.js --help
```

### 示例 2: 创建 Python 数据分析工具

```bash
$ npx skill-builder create

? Skill name: csv-analyzer
? Title: CSV Analyzer
? Description: Analyze and report CSV file statistics
? Author: yourname
? Runtime: Python
? Tags: data, csv, analytics, cli
? License: MIT

Commands:
? Command name: analyze
? Description: Analyze CSV file
? Add another? Yes

? Command name: export
? Description: Export analysis results
? Add another? No

✅ Skill "csv-analyzer" created successfully!

Next steps:
  cd csv-analyzer
  pip install -r requirements.txt
  python main.py --help
```

## 验证示例

```bash
$ cd file-merger
$ npx skill-builder validate

🔍 Skill Validator

Checking skill.json...
Checking README.md...
Checking entry file...

✅ Skill validation passed!

Your skill appears to be compliant with skills.sh requirements.
```

## 开发工作流

1. **创建 Skill**
   ```bash
   npx skill-builder create
   ```

2. **实现功能**
   - 编辑 `index.js` 或 `main.py`
   - 实现各个命令的逻辑

3. **本地测试**
   ```bash
   node index.js <command>
   # 或
   python main.py <command>
   ```

4. **验证合规性**
   ```bash
   npx skill-builder validate
   ```

5. **发布到 skills.sh**
   - 提交到 Git
   - 发布到 skills.sh registry

## 规范要求

### 命名规范

- ✅ `my-skill` (kebab-case, 小写)
- ❌ `MySkill` (PascalCase)
- ❌ `my_skill` (snake_case)
- ❌ `mySkill` (camelCase)

### 描述规范

- 长度 ≤ 120 字符
- 清晰描述功能
- 面向用户

### 标签规范

- 2-5 个标签
- 小写
- 相关且准确

### 命令规范

- 小写
- kebab-case
- 有清晰描述

## 常见问题

### Q: 如何添加依赖?

**Node.js:**
```bash
cd your-skill
npm install <package>
```

**Python:**
```bash
cd your-skill
pip install <package>
echo "<package>" >> requirements.txt
```

### Q: 如何测试生成的 skill?

```bash
# Node.js
node index.js --help
node index.js <command>

# Python
python main.py --help
python main.py <command>
```

### Q: 如何发布到 skills.sh?

1. 确保 skill 通过验证
2. 提交到 GitHub
3. 在 skills.sh 注册
4. 提交 PR 到 registry

### Q: 可以修改生成的文件吗?

可以!生成的文件只是起点,你应该:
- 实现命令逻辑
- 添加错误处理
- 完善文档
- 添加测试

## 技术细节

### 依赖项

- `prompts` - 交互式命令行输入
- `chalk` - 彩色终端输出

### 支持的运行时

- Node.js ≥ 14.0.0
- Python ≥ 3.6

### 生成的模板特性

**Node.js:**
- ✅ 完整的参数解析
- ✅ --help 和 --version 支持
- ✅ 错误处理框架
- ✅ bin 配置,可全局安装

**Python:**
- ✅ argparse 配置
- ✅ 子命令支持
- ✅ --help 和 --version 支持
- ✅ shebang,可直接执行

## 贡献

欢迎贡献! 可以:
- 提交 issue
- 提交 PR
- 改进文档
- 添加新模板

## 许可证

MIT License

## 相关链接

- [skills.sh 官网](https://skills.sh)
- [开发文档](https://skills.sh/docs)
- [规范说明](./skill_builder_spec.md)
- [快速开始](./QUICKSTART.md)

---

🦞 The Lobster Way
