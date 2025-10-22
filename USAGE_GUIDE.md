# Pendle DeFi 数据面板 - 使用指南

## 项目概述

这是一个为编程小白设计的 Pendle DeFi 数据追踪面板，可以实时监控 Pendle 协议的各种关键指标。

## 快速启动（3步即可运行）

### 第1步：安装依赖
```bash
npm install
```

### 第2步：启动开发服务器
```bash
npm run dev
```

### 第3步：打开浏览器
访问 http://localhost:3000

就这么简单！你的数据面板已经运行起来了！

## 面板功能详解

### 1. 顶部统计卡片
面板顶部显示4个关键指标：

- **总锁定价值 (TVL)**: 所有市场的总资金量
- **24小时交易量**: 过去一天的交易总额
- **活跃市场**: 当前正在运行的市场数量
- **平均 APY**: 所有市场的平均年化收益率

### 2. 历史趋势图表
中间区域显示两个图表：

- **APY 趋势图**: 显示选中市场的收益率变化
- **TVL 趋势图**: 显示选中市场的资金量变化

💡 **小技巧**: 点击任意市场卡片，图表会自动更新显示该市场的历史数据！

### 3. 市场列表
底部展示所有可用的市场，有两种查看方式：

#### 卡片视图（默认）
- 每个市场一张卡片
- 显示详细的APY信息
- 包含TVL、交易量、流动性
- 到期日倒计时

#### 表格视图
- 紧凑的表格布局
- 支持点击列标题排序
- 适合对比多个市场

💡 **小技巧**: 点击右上角的网格/表格图标切换视图！

## 数据指标说明

### APY（年化收益率）
面板展示3种不同的APY：

1. **固定APY** (绿色高亮)
   - 购买PT代币锁定的收益率
   - 到期时保证获得的收益
   - 适合保守投资者

2. **浮动APY**
   - 底层资产的原生收益率
   - 会随市场波动
   - 实时更新

3. **Long Yield APY** (紫色)
   - 做多收益的策略APY
   - 适合看好未来收益增长的用户

### 其他重要指标

- **TVL (Total Value Locked)**: 市场中锁定的总资金
- **流动性**: 可以立即用于交易的资金池深度
- **24h交易量**: 过去24小时的交易总额
- **到期日**: 市场的结束时间

## 如何使用面板做决策

### 场景1: 寻找高收益市场
1. 切换到表格视图
2. 点击"固定APY"列标题排序
3. 查看顶部的高APY市场
4. 点击市场查看历史趋势
5. 确认APY稳定性

### 场景2: 评估市场安全性
1. 查看市场的TVL和流动性
2. TVL越高 = 市场越成熟
3. 流动性/TVL比例 > 50% = 高健康度
4. 检查到期日，避免即将到期的市场

### 场景3: 对比不同链的机会
1. 查看卡片右上角的链标识
2. 对比同类资产在不同链上的APY
3. 考虑gas费和桥接成本
4. 选择性价比最高的链

## 支持的区块链

- **Ethereum** - 以太坊主网（蓝色标签）
- **Arbitrum** - Layer 2，低手续费
- **Optimism** - Layer 2，快速确认
- **BSC** - 币安智能链
- **Polygon** - 侧链，极低费用
- **Mantle** - 新兴Layer 2

## 常见问题

### Q: 数据多久更新一次？
A: 当前版本使用模拟数据演示。连接真实API后，数据会实时更新。

### Q: 如何连接真实的Pendle API？
A: 在 `lib/services/pendle.ts` 文件中，将模拟数据替换为真实的API调用。API文档: https://api-v2.pendle.finance/core/docs

### Q: 可以添加价格预警吗？
A: 当前版本暂不支持，已在未来计划中。你可以自己扩展这个功能！

### Q: 支持移动端吗？
A: 支持！面板使用响应式设计，在手机上也能完美显示。

### Q: 如何部署到生产环境？
A: 推荐使用Vercel（最简单）：
```bash
npm install -g vercel
vercel
```

## 文件结构说明（便于修改）

```
pendle/
├── app/
│   ├── page.tsx          👈 主页面，修改这里调整布局
│   └── layout.tsx        👈 全局布局和元数据
│
├── components/           👈 所有UI组件
│   ├── StatCard.tsx     👈 统计卡片
│   ├── MarketCard.tsx   👈 市场卡片
│   ├── MarketTable.tsx  👈 市场表格
│   ├── APYChart.tsx     👈 APY图表
│   └── TVLChart.tsx     👈 TVL图表
│
├── lib/
│   ├── services/
│   │   └── pendle.ts    👈 API调用，连接真实数据
│   └── utils/
│       └── formatters.ts 👈 格式化工具
│
└── types/
    └── pendle.ts        👈 数据类型定义
```

## 自定义和扩展

### 修改颜色主题
编辑 `app/globals.css` 和组件中的 Tailwind 类名

### 添加新的统计卡片
在 `app/page.tsx` 中复制一个 `<StatCard>` 组件并修改参数

### 添加新的图表
在 `components/` 创建新组件，参考 `APYChart.tsx` 的写法

### 连接钱包
安装 wagmi 或 web3-react 库，在 `app/layout.tsx` 中添加Provider

## 技术支持

如遇到问题：

1. 检查 Node.js 版本（需要 18+）
2. 删除 `node_modules` 和 `package-lock.json`，重新 `npm install`
3. 查看浏览器控制台的错误信息
4. 参考 README.md 中的详细文档

## 下一步学习建议

作为编程小白，建议按以下顺序学习：

1. **熟悉项目** - 先把面板跑起来，点击各种功能
2. **修改文字** - 尝试修改卡片标题、按钮文字
3. **调整样式** - 改变颜色、字体大小
4. **添加功能** - 参考现有组件，添加新的统计卡片
5. **连接API** - 学习如何调用真实的Pendle API
6. **深入学习** - TypeScript、React Hooks、Next.js

## 学习资源

- **Next.js 教程**: https://nextjs.org/learn
- **React 中文文档**: https://react.dev/learn
- **TypeScript 入门**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Pendle 协议文档**: https://docs.pendle.finance/

---

祝你使用愉快！如有问题随时查看文档或寻求帮助。
