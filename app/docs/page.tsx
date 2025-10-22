'use client';

import { useEffect } from 'react';

export default function DocsPage() {
  useEffect(() => {
    // 重定向到静态HTML文档页面
    window.location.href = '/docs.html';
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '20px',
          animation: 'spin 1s linear infinite'
        }}>
          ⚡
        </div>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>正在加载文档...</h2>
        <p>如果没有自动跳转，请<a href="/docs.html" style={{ color: 'white', textDecoration: 'underline' }}>点击这里</a></p>
      </div>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
