# Notion 集成设置指南

## 1. 创建 Notion 集成

1. 访问 [Notion Developers](https://developers.notion.com/)
2. 点击 "New integration"
3. 填写集成名称和描述
4. 选择工作区
5. 设置权限：
   - Read content: ✅
   - Update content: ✅ (如果需要编辑功能)
   - Insert content: ✅ (如果需要创建功能)

## 2. 获取集成 Token

创建完成后，复制 "Internal Integration Token"，这就是你的 `NOTION_TOKEN`。

## 3. 创建 Notion 数据库

在你的 Notion 工作区中创建一个新的数据库，包含以下属性：

### 必需属性：
- **Title** (Title): 博客标题
- **Digest** (Text): 博客摘要/内容
- **URLName** (Text): URL 友好的名称
- **Categories** (Multi-select): 分类
- **Tags** (Multi-select): 标签
- **Status** (Select): 发布状态
- **CreatedAt** (Created time): 创建时间（自动）
- **UpdatedAt** (Last edited time): 更新时间（自动）

### 状态选项配置：
Status 属性应该配置为选择器类型，包含以下选项：

#### 待办 (To Do)
- **构思中** (Conceiving) - 设置为默认值

#### 进行中 (In Progress)  
- **草稿** (Draft)
- **正在编辑** (Editing)

#### 已完成 (Done)
- **已发布** (Published)

### 可选属性：
- **Description** (Text): 博客描述
- **Cover** (Files & media): 封面图片

## 4. 获取数据库 ID

1. 在 Notion 中打开你的数据库
2. 复制 URL 中的数据库 ID：
   ```
   https://www.notion.so/workspace/DATABASE_ID?v=...
   ```
   其中 `DATABASE_ID` 就是你需要的内容

## 5. 设置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
# Notion API 配置
NOTION_TOKEN=your_notion_integration_token_here
NOTION_DATABASE_ID=your_notion_database_id_here
```

## 6. 共享数据库

将你的 Notion 数据库共享给你的集成：
1. 在数据库页面点击 "Share"
2. 搜索你的集成名称
3. 选择并添加

## 7. 安装依赖

```bash
pnpm install
```

## 工作流程

### 博客发布流程：
1. **构思中** → 创建新博客条目，设置默认状态
2. **草稿** → 开始编写内容
3. **正在编辑** → 内容编辑和修改阶段
4. **已发布** → 完成编辑，发布到博客网站

### 状态说明：
- 只有 **已发布** 状态的文章才会在博客网站中显示
- **构思中**、**草稿**、**正在编辑** 状态的文章不会公开显示
- 可以通过修改 Status 字段来控制文章的可见性

## 注意事项

- Notion API 有速率限制，建议设置适当的缓存策略
- 数据库属性名称必须与代码中的映射完全匹配
- Status 字段用于控制文章的可见性，只有"已发布"状态的文章会显示
- 首次使用前，确保数据库中有一些测试数据
- 建议在 Status 字段中设置默认值为"构思中"
