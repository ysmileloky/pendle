# Pendle DeFi 数据追踪面板

一个实时追踪 Pendle 协议市场数据的 Web 应用，提供直观的数据可视化和市场分析。

## 功能特性

### 核心功能
- **实时市场数据** - 展示所有活跃的 Pendle 市场
- **多维度APY** - 显示固定APY、浮动APY和Long Yield APY
- **TVL追踪** - 监控总锁定价值和各市场TVL
- **交易量统计** - 24小时交易量和历史趋势
- **多链支持** - 支持 Ethereum、Arbitrum、Optimism、BSC、Polygon、Mantle

### 数据面板
- **概览统计** - 总TVL、24小时交易量、活跃市场数、平均APY
- **交互式图表** - APY历史趋势、TVL变化曲线
- **市场列表** - 卡片视图和表格视图切换
- **智能排序** - 按APY、TVL、交易量、到期日排序

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图表**: Recharts
- **图标**: Lucide React
- **HTTP客户端**: Axios
- **日期处理**: date-fns

## 项目结构

```
pendle/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 主面板页面
│   ├── layout.tsx         # 根布局
│   └── globals.css        # 全局样式
├── components/             # React组件
│   ├── StatCard.tsx       # 统计卡片
│   ├── MarketCard.tsx     # 市场卡片
│   ├── MarketTable.tsx    # 市场表格
│   ├── APYChart.tsx       # APY图表
│   └── TVLChart.tsx       # TVL图表
├── lib/                   # 核心逻辑
│   ├── services/
│   │   └── pendle.ts      # Pendle API服务
│   └── utils/
│       └── formatters.ts  # 格式化工具
├── types/                 # TypeScript类型
│   └── pendle.ts          # 数据类型定义
└── package.json
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 生产构建

```bash
npm run build
npm start
```

## API 集成

### Pendle API v2

本项目使用 Pendle API v2 获取数据：

```
基础URL: https://api-v2.pendle.finance/core
```

#### 主要端点

1. **获取市场列表**
   - 获取所有活跃市场的信息

2. **获取市场详情**
   - 获取单个市场的详细数据

3. **获取历史数据**
   - APY历史趋势
   - TVL历史趋势
   - 交易量历史数据

### 数据模型

```typescript
interface Market {
  address: string;           // 市场地址
  chainId: ChainId;         // 链ID
  name: string;             // 市场名称
  symbol: string;           // 代币符号
  expiry: string;           // 到期日
  tvl: number;              // 总锁定价值
  volume24h: number;        // 24小时交易量
  impliedApy: number;       // 固定APY
  underlyingApy: number;    // 浮动APY
  longYieldApy: number;     // Long Yield APY
}
```

## 使用指南

### 查看市场数据

1. **概览面板** - 顶部显示关键指标统计
2. **切换视图** - 使用右上角按钮在卡片视图和表格视图间切换
3. **查看详情** - 点击任意市场卡片查看该市场的历史趋势图
4. **排序数据** - 在表格视图中点击列标题进行排序

### 数据解读

- **固定APY** (Implied APY) - 购买PT代币获得的固定收益率
- **浮动APY** (Underlying APY) - 底层资产的原生收益率
- **Long Yield APY** - 做多收益策略的预期收益率
- **TVL** - 市场中锁定的总价值
- **流动性** - 可用于交易的池子深度

## 开发说明

### 添加新功能

1. **新增组件** - 在 `components/` 目录创建新组件
2. **API集成** - 在 `lib/services/pendle.ts` 添加新的API方法
3. **类型定义** - 在 `types/pendle.ts` 定义新的数据类型
4. **工具函数** - 在 `lib/utils/` 添加辅助函数

### 自定义样式

项目使用 Tailwind CSS，可以在以下位置自定义：

- `tailwind.config.ts` - Tailwind配置
- `app/globals.css` - 全局CSS样式

### 环境变量

如需配置API端点或其他环境变量，创建 `.env.local` 文件：

```env
NEXT_PUBLIC_PENDLE_API_URL=https://api-v2.pendle.finance/core
```

## 部署

### Vercel (推荐)

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker build -t pendle-dashboard .
docker run -p 3000:3000 pendle-dashboard
```

## 注意事项

1. **数据更新** - 当前使用模拟数据，生产环境需连接真实API
2. **网络请求** - 确保网络能访问 Pendle API
3. **浏览器兼容** - 推荐使用现代浏览器（Chrome, Firefox, Safari, Edge）

## 未来计划

- [ ] 集成真实Pendle API数据
- [ ] 添加用户钱包连接
- [ ] 实现交易功能
- [ ] 添加价格预警
- [ ] 支持更多图表类型
- [ ] 移动端响应式优化
- [ ] 添加暗黑模式
- [ ] 数据导出功能

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 GitHub Issue
- 发送邮件至项目维护者

---

**免责声明**: 本项目仅供学习和参考使用，不构成任何投资建议。使用前请自行评估风险。
