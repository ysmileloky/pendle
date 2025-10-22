import React from 'react';
import { Market } from '@/types/pendle';
import { formatLargeNumber, formatPercentage, formatExpiry, getApyColorClass } from '@/lib/utils/formatters';
import { CHAIN_NAMES } from '@/types/pendle';
import { TrendingUp, Droplets, Clock } from 'lucide-react';

interface MarketCardProps {
  market: Market;
}

export default function MarketCard({ market }: MarketCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all border border-gray-200 hover:border-blue-400">
      {/* 头部 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{market.symbol}</h3>
          <p className="text-sm text-gray-600">{market.underlyingAsset.symbol}</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
          {CHAIN_NAMES[market.chainId]}
        </span>
      </div>

      {/* APY信息 */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            固定APY
          </span>
          <span className={`text-lg font-bold ${getApyColorClass(market.impliedApy)}`}>
            {formatPercentage(market.impliedApy)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">浮动APY</span>
          <span className="text-sm font-semibold text-gray-700">
            {formatPercentage(market.underlyingApy)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Long Yield APY</span>
          <span className="text-sm font-semibold text-purple-600">
            {formatPercentage(market.longYieldApy)}
          </span>
        </div>
      </div>

      {/* 分隔线 */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* TVL和流动性 */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 flex items-center">
            <Droplets className="w-4 h-4 mr-1" />
            TVL
          </span>
          <span className="text-sm font-semibold text-gray-900">
            {formatLargeNumber(market.tvl)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">24h交易量</span>
          <span className="text-sm font-semibold text-gray-900">
            {formatLargeNumber(market.volume24h)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">流动性</span>
          <span className="text-sm font-semibold text-gray-900">
            {formatLargeNumber(market.liquidity)}
          </span>
        </div>
      </div>

      {/* 到期日 */}
      <div className="flex items-center justify-between bg-gray-50 rounded-md p-3">
        <span className="text-sm text-gray-600 flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          到期日
        </span>
        <span className="text-sm font-semibold text-gray-900">
          {formatExpiry(market.expiry)}
        </span>
      </div>
    </div>
  );
}
