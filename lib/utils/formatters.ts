import { format, formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

/**
 * 格式化大数字（K, M, B）
 */
export function formatLargeNumber(num: number, decimals: number = 2): string {
  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(decimals)}B`;
  }
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(decimals)}M`;
  }
  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(decimals)}K`;
  }
  return `$${num.toFixed(decimals)}`;
}

/**
 * 格式化百分比
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * 格式化日期
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'yyyy-MM-dd', { locale: zhCN });
}

/**
 * 格式化相对时间（距离现在）
 */
export function formatTimeAgo(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: zhCN });
}

/**
 * 格式化到期日
 */
export function formatExpiry(expiry: string): string {
  const expiryDate = new Date(expiry);
  const now = new Date();
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntilExpiry < 0) {
    return '已到期';
  }

  if (daysUntilExpiry === 0) {
    return '今天到期';
  }

  if (daysUntilExpiry === 1) {
    return '明天到期';
  }

  if (daysUntilExpiry <= 30) {
    return `${daysUntilExpiry}天后到期`;
  }

  return formatDate(expiry);
}

/**
 * 格式化钱包地址（缩短显示）
 */
export function formatAddress(address: string, prefixLength: number = 6, suffixLength: number = 4): string {
  if (address.length <= prefixLength + suffixLength) {
    return address;
  }
  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
}

/**
 * 获取APY的颜色类名
 */
export function getApyColorClass(apy: number): string {
  if (apy >= 20) return 'text-green-600';
  if (apy >= 10) return 'text-green-500';
  if (apy >= 5) return 'text-yellow-600';
  return 'text-gray-600';
}

/**
 * 计算市场健康度（基于流动性和TVL）
 */
export function calculateMarketHealth(liquidity: number, tvl: number): 'high' | 'medium' | 'low' {
  const ratio = liquidity / tvl;
  if (ratio >= 0.5) return 'high';
  if (ratio >= 0.2) return 'medium';
  return 'low';
}

/**
 * 格式化数字（千分位逗号）
 */
export function formatNumberWithCommas(num: number): string {
  return num.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
