'use client';

import React, { useState } from 'react';
import { Market } from '@/types/pendle';
import { formatLargeNumber, formatPercentage, formatExpiry, getApyColorClass } from '@/lib/utils/formatters';
import { CHAIN_NAMES } from '@/types/pendle';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface MarketTableProps {
  markets: Market[];
}

type SortField = 'apy' | 'tvl' | 'volume' | 'expiry';
type SortOrder = 'asc' | 'desc';

export default function MarketTable({ markets }: MarketTableProps) {
  const [sortField, setSortField] = useState<SortField>('apy');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedMarkets = [...markets].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    switch (sortField) {
      case 'apy':
        aValue = a.impliedApy;
        bValue = b.impliedApy;
        break;
      case 'tvl':
        aValue = a.tvl;
        bValue = b.tvl;
        break;
      case 'volume':
        aValue = a.volume24h;
        bValue = b.volume24h;
        break;
      case 'expiry':
        aValue = new Date(a.expiry).getTime();
        bValue = new Date(b.expiry).getTime();
        break;
      default:
        aValue = 0;
        bValue = 0;
    }

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-blue-600" />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                市场
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                链
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('apy')}
              >
                <div className="flex items-center">
                  固定APY
                  <SortIcon field="apy" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('tvl')}
              >
                <div className="flex items-center">
                  TVL
                  <SortIcon field="tvl" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('volume')}
              >
                <div className="flex items-center">
                  24h交易量
                  <SortIcon field="volume" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('expiry')}
              >
                <div className="flex items-center">
                  到期日
                  <SortIcon field="expiry" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedMarkets.map((market) => (
              <tr key={market.address} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{market.symbol}</div>
                    <div className="text-sm text-gray-500">{market.underlyingAsset.symbol}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {CHAIN_NAMES[market.chainId]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-bold ${getApyColorClass(market.impliedApy)}`}>
                    {formatPercentage(market.impliedApy)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatLargeNumber(market.tvl)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatLargeNumber(market.volume24h)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatExpiry(market.expiry)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
