'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Market, MarketOverview } from '@/types/pendle';
import { pendleAPI } from '@/lib/services/pendle';
import StatCard from '@/components/StatCard';
import MarketCard from '@/components/MarketCard';
import MarketTable from '@/components/MarketTable';
import APYChart from '@/components/APYChart';
import TVLChart from '@/components/TVLChart';
import { TrendingUp, DollarSign, Activity, BarChart3, Grid3X3, TableIcon, BookOpen } from 'lucide-react';
import { formatLargeNumber, formatPercentage } from '@/lib/utils/formatters';

export default function Dashboard() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [overview, setOverview] = useState<MarketOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [marketHistory, setMarketHistory] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (markets.length > 0 && !selectedMarket) {
      loadMarketHistory(markets[0]);
    }
  }, [markets]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [marketsData, overviewData] = await Promise.all([
        pendleAPI.getMarkets(),
        pendleAPI.getMarketOverview(),
      ]);
      setMarkets(marketsData);
      setOverview(overviewData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMarketHistory = async (market: Market) => {
    try {
      setSelectedMarket(market);
      const history = await pendleAPI.getMarketHistory(market.address);
      setMarketHistory(history);
    } catch (error) {
      console.error('Error loading market history:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pendle 数据面板</h1>
              <p className="text-gray-600 mt-1">实时追踪 Pendle 协议市场数据</p>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                href="/docs.html"
                className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                target="_blank"
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">项目文档</span>
              </Link>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <TableIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 统计卡片 */}
        {overview && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="总锁定价值 (TVL)"
              value={formatLargeNumber(overview.totalTvl)}
              icon={DollarSign}
              description="所有市场的总锁定价值"
            />
            <StatCard
              title="24小时交易量"
              value={formatLargeNumber(overview.totalVolume24h)}
              icon={Activity}
              description="过去24小时的交易量"
            />
            <StatCard
              title="活跃市场"
              value={overview.activeMarkets.toString()}
              icon={BarChart3}
              description="当前活跃的市场数量"
            />
            <StatCard
              title="平均 APY"
              value={formatPercentage(overview.averageApy)}
              icon={TrendingUp}
              description="所有市场的平均固定APY"
            />
          </div>
        )}

        {/* 图表区域 */}
        {marketHistory && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <APYChart data={marketHistory.apy} title={`${selectedMarket?.symbol} APY 趋势`} />
            <TVLChart data={marketHistory.tvl} title={`${selectedMarket?.symbol} TVL 趋势`} />
          </div>
        )}

        {/* 市场列表 */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">市场列表</h2>
          <p className="text-gray-600">点击市场查看详细历史数据</p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((market) => (
              <div
                key={market.address}
                onClick={() => loadMarketHistory(market)}
                className="cursor-pointer"
              >
                <MarketCard market={market} />
              </div>
            ))}
          </div>
        ) : (
          <MarketTable markets={markets} />
        )}
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p>Pendle DeFi 数据追踪面板</p>
            <p className="text-sm mt-1">数据来源: Pendle API v2</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
