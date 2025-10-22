// Pendle 协议相关的 TypeScript 类型定义

/**
 * 链ID枚举
 */
export enum ChainId {
  ETHEREUM = 1,
  ARBITRUM = 42161,
  OPTIMISM = 10,
  BSC = 56,
  POLYGON = 137,
  MANTLE = 5000,
}

/**
 * 链名称映射
 */
export const CHAIN_NAMES: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: 'Ethereum',
  [ChainId.ARBITRUM]: 'Arbitrum',
  [ChainId.OPTIMISM]: 'Optimism',
  [ChainId.BSC]: 'BSC',
  [ChainId.POLYGON]: 'Polygon',
  [ChainId.MANTLE]: 'Mantle',
};

/**
 * 市场状态
 */
export interface Market {
  address: string;
  chainId: ChainId;
  name: string;
  symbol: string;
  expiry: string; // ISO 8601 日期
  pt: {
    address: string;
    price: number;
  };
  yt: {
    address: string;
    price: number;
  };
  underlyingAsset: {
    address: string;
    symbol: string;
    decimals: number;
  };
  tvl: number;
  volume24h: number;
  liquidity: number;
  impliedApy: number; // 隐含APY（固定收益）
  underlyingApy: number; // 底层APY（浮动收益）
  longYieldApy: number; // Long Yield APY
}

/**
 * 市场概览统计
 */
export interface MarketOverview {
  totalTvl: number;
  totalVolume24h: number;
  activeMarkets: number;
  averageApy: number;
}

/**
 * 历史数据点
 */
export interface HistoricalDataPoint {
  timestamp: number;
  value: number;
}

/**
 * 市场历史数据
 */
export interface MarketHistory {
  apy: HistoricalDataPoint[];
  tvl: HistoricalDataPoint[];
  volume: HistoricalDataPoint[];
}

/**
 * API响应：市场列表
 */
export interface MarketsResponse {
  results: Market[];
  total: number;
}

/**
 * 市场筛选器
 */
export interface MarketFilters {
  chainId?: ChainId;
  minApy?: number;
  minTvl?: number;
  search?: string;
  sortBy?: 'apy' | 'tvl' | 'volume' | 'expiry';
  sortOrder?: 'asc' | 'desc';
}

/**
 * 资产信息
 */
export interface Asset {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoUrl?: string;
}

/**
 * 收益类型
 */
export type YieldType = 'FIXED' | 'FLOATING' | 'LONG_YIELD';

/**
 * 图表数据类型
 */
export interface ChartData {
  name: string;
  value: number;
  timestamp?: number;
}
