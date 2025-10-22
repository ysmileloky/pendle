import axios, { AxiosInstance } from 'axios';
import { ChainId, Market, MarketOverview, MarketHistory, HistoricalDataPoint } from '@/types/pendle';

/**
 * Pendle API 客户端
 */
class PendleAPIClient {
  private client: AxiosInstance;
  private baseURL = 'https://api-v2.pendle.finance/core';

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * 获取所有市场列表
   */
  async getMarkets(chainId?: ChainId): Promise<Market[]> {
    try {
      // 模拟API响应，因为实际API可能需要认证
      // 在生产环境中，这里应该是真实的API调用
      const mockMarkets: Market[] = [
        {
          address: '0x9eC4c502D989F04FfA9312C9D6E3F872EC91A0F9',
          chainId: ChainId.ETHEREUM,
          name: 'PT-eETH-27DEC2024',
          symbol: 'PT-eETH',
          expiry: '2024-12-27T00:00:00Z',
          pt: {
            address: '0x...',
            price: 0.98,
          },
          yt: {
            address: '0x...',
            price: 0.02,
          },
          underlyingAsset: {
            address: '0x...',
            symbol: 'eETH',
            decimals: 18,
          },
          tvl: 125000000,
          volume24h: 5600000,
          liquidity: 85000000,
          impliedApy: 12.5,
          underlyingApy: 3.2,
          longYieldApy: 15.8,
        },
        {
          address: '0x8eC4c502D989F04FfA9312C9D6E3F872EC91A0F8',
          chainId: ChainId.ARBITRUM,
          name: 'PT-GLP-28MAR2025',
          symbol: 'PT-GLP',
          expiry: '2025-03-28T00:00:00Z',
          pt: {
            address: '0x...',
            price: 0.95,
          },
          yt: {
            address: '0x...',
            price: 0.05,
          },
          underlyingAsset: {
            address: '0x...',
            symbol: 'GLP',
            decimals: 18,
          },
          tvl: 45000000,
          volume24h: 2300000,
          liquidity: 32000000,
          impliedApy: 18.3,
          underlyingApy: 8.5,
          longYieldApy: 22.1,
        },
        {
          address: '0x7eC4c502D989F04FfA9312C9D6E3F872EC91A0F7',
          chainId: ChainId.ETHEREUM,
          name: 'PT-stETH-26DEC2024',
          symbol: 'PT-stETH',
          expiry: '2024-12-26T00:00:00Z',
          pt: {
            address: '0x...',
            price: 0.97,
          },
          yt: {
            address: '0x...',
            price: 0.03,
          },
          underlyingAsset: {
            address: '0x...',
            symbol: 'stETH',
            decimals: 18,
          },
          tvl: 280000000,
          volume24h: 12000000,
          liquidity: 195000000,
          impliedApy: 8.7,
          underlyingApy: 3.5,
          longYieldApy: 11.2,
        },
        {
          address: '0x6eC4c502D989F04FfA9312C9D6E3F872EC91A0F6',
          chainId: ChainId.ARBITRUM,
          name: 'PT-rETH-27JUN2025',
          symbol: 'PT-rETH',
          expiry: '2025-06-27T00:00:00Z',
          pt: {
            address: '0x...',
            price: 0.92,
          },
          yt: {
            address: '0x...',
            price: 0.08,
          },
          underlyingAsset: {
            address: '0x...',
            symbol: 'rETH',
            decimals: 18,
          },
          tvl: 68000000,
          volume24h: 3400000,
          liquidity: 48000000,
          impliedApy: 14.6,
          underlyingApy: 4.2,
          longYieldApy: 17.9,
        },
        {
          address: '0x5eC4c502D989F04FfA9312C9D6E3F872EC91A0F5',
          chainId: ChainId.OPTIMISM,
          name: 'PT-sUSD-29MAR2025',
          symbol: 'PT-sUSD',
          expiry: '2025-03-29T00:00:00Z',
          pt: {
            address: '0x...',
            price: 0.96,
          },
          yt: {
            address: '0x...',
            price: 0.04,
          },
          underlyingAsset: {
            address: '0x...',
            symbol: 'sUSD',
            decimals: 18,
          },
          tvl: 28000000,
          volume24h: 980000,
          liquidity: 19000000,
          impliedApy: 9.2,
          underlyingApy: 2.8,
          longYieldApy: 10.5,
        },
      ];

      if (chainId) {
        return mockMarkets.filter(m => m.chainId === chainId);
      }

      return mockMarkets;
    } catch (error) {
      console.error('Error fetching markets:', error);
      throw error;
    }
  }

  /**
   * 获取市场概览统计
   */
  async getMarketOverview(): Promise<MarketOverview> {
    try {
      const markets = await this.getMarkets();

      const totalTvl = markets.reduce((sum, market) => sum + market.tvl, 0);
      const totalVolume24h = markets.reduce((sum, market) => sum + market.volume24h, 0);
      const averageApy = markets.reduce((sum, market) => sum + market.impliedApy, 0) / markets.length;

      return {
        totalTvl,
        totalVolume24h,
        activeMarkets: markets.length,
        averageApy,
      };
    } catch (error) {
      console.error('Error fetching market overview:', error);
      throw error;
    }
  }

  /**
   * 获取市场历史数据
   */
  async getMarketHistory(marketAddress: string, days: number = 30): Promise<MarketHistory> {
    try {
      // 模拟历史数据
      const now = Date.now();
      const dayInMs = 24 * 60 * 60 * 1000;

      const generateData = (baseValue: number, variance: number): HistoricalDataPoint[] => {
        return Array.from({ length: days }, (_, i) => ({
          timestamp: now - (days - i) * dayInMs,
          value: baseValue + (Math.random() - 0.5) * variance,
        }));
      };

      return {
        apy: generateData(12, 4),
        tvl: generateData(50000000, 10000000),
        volume: generateData(2000000, 1000000),
      };
    } catch (error) {
      console.error('Error fetching market history:', error);
      throw error;
    }
  }

  /**
   * 根据地址获取单个市场
   */
  async getMarket(marketAddress: string): Promise<Market | null> {
    try {
      const markets = await this.getMarkets();
      return markets.find(m => m.address.toLowerCase() === marketAddress.toLowerCase()) || null;
    } catch (error) {
      console.error('Error fetching market:', error);
      throw error;
    }
  }
}

// 导出单例实例
export const pendleAPI = new PendleAPIClient();

// 导出类以便测试
export default PendleAPIClient;
