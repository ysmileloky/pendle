# 🚀 Bandwagon Host 部署完成指南

## ✅ 部署状态

你的 Pendle DeFi 数据追踪面板已成功部署到 Bandwagon Host 服务器！

### 当前配置

- **服务器IP**: 21.0.0.74
- **应用端口**: 3000
- **进程管理**: PM2
- **应用状态**: ✅ Online
- **开机自启**: ✅ 已配置

## 🌐 访问你的面板

### 方式一：通过公网IP访问（需要开放端口）

```
http://你的公网IP:3000
```

**注意**: `21.0.0.74` 可能是内网IP，你需要使用 Bandwagon Host 分配给你的**公网IP地址**。

### 如何查找你的公网IP：

1. 登录 [Bandwagon Host 控制面板](https://bwh89.net/)
2. 点击你的VPS
3. 在 "Main controls" 页面查看 **IP Address**
4. 使用该IP访问：`http://你的公网IP:3000`

### 方式二：绑定域名访问（推荐）

如果你有域名，可以配置为：`https://pendle.你的域名.com`

## 🔧 Bandwagon Host 控制面板配置

### 开放 3000 端口

Bandwagon Host 需要在控制面板开放端口：

1. 登录 [Bandwagon Host 控制面板](https://bwh89.net/)
2. 进入你的 VPS 管理页面
3. 找到 **Firewall** 或 **KiwiVM** 控制面板
4. 添加防火墙规则：
   - **端口**: 3000
   - **协议**: TCP
   - **动作**: ALLOW

### 或者关闭防火墙（不推荐，仅测试用）

在 KiwiVM 控制面板中可以临时关闭防火墙测试访问。

## 📱 PM2 管理命令

### 查看应用状态
```bash
pm2 status
```

### 查看日志
```bash
pm2 logs pendle-dashboard
```

### 重启应用
```bash
pm2 restart pendle-dashboard
```

### 停止应用
```bash
pm2 stop pendle-dashboard
```

### 删除应用
```bash
pm2 delete pendle-dashboard
```

### 更新代码后重新部署
```bash
cd /home/user/pendle
git pull
npm install
npm run build
pm2 restart pendle-dashboard
```

## 🔐 配置 Nginx 反向代理（可选）

如果你想使用 80 端口访问，可以配置 Nginx：

### 1. 安装 Nginx
```bash
apt update && apt install nginx -y
```

### 2. 创建 Nginx 配置
```bash
cat > /etc/nginx/sites-available/pendle << 'EOF'
server {
    listen 80;
    server_name 你的域名或IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
```

### 3. 启用配置
```bash
ln -s /etc/nginx/sites-available/pendle /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

现在可以直接通过 `http://你的IP` 访问（不需要 :3000）

## 🌟 绑定域名（推荐）

### 1. DNS 配置

在你的域名服务商添加 A 记录：
```
类型: A
名称: pendle (或 @)
值: 你的Bandwagon公网IP
TTL: 自动或3600
```

### 2. 配置 SSL 证书（HTTPS）

使用 Let's Encrypt 免费证书：

```bash
# 安装 Certbot
apt install certbot python3-certbot-nginx -y

# 自动获取并配置证书
certbot --nginx -d pendle.你的域名.com

# 自动续期
certbot renew --dry-run
```

配置完成后，访问：`https://pendle.你的域名.com`

## 🎯 完整部署检查清单

- [x] ✅ Node.js 和 npm 已安装
- [x] ✅ 项目已构建（npm run build）
- [x] ✅ PM2 已安装并启动应用
- [x] ✅ PM2 开机自启已配置
- [ ] ⏳ Bandwagon 防火墙开放 3000 端口
- [ ] ⏳ 测试公网IP访问
- [ ] （可选）配置 Nginx 反向代理
- [ ] （可选）绑定域名
- [ ] （可选）配置 SSL 证书

## 🐛 故障排查

### 无法访问面板

**1. 检查应用是否运行**
```bash
pm2 status
```
如果状态不是 "online"，运行：
```bash
pm2 restart pendle-dashboard
pm2 logs pendle-dashboard
```

**2. 检查端口**
```bash
curl http://localhost:3000
```
如果能看到HTML内容 = 应用正常，问题在防火墙或网络

**3. 确认公网IP**
登录 Bandwagon 控制面板查看实际的公网IP地址

**4. 检查防火墙**
在 Bandwagon KiwiVM 控制面板确认：
- 3000 端口已开放
- 或者防火墙已关闭（测试用）

**5. 检查安全组**
某些 VPS 提供商有额外的安全组设置，确认允许入站流量到 3000 端口

### 应用崩溃

查看日志：
```bash
pm2 logs pendle-dashboard --lines 50
```

重启应用：
```bash
pm2 restart pendle-dashboard
```

### 更新失败

```bash
cd /home/user/pendle
pm2 stop pendle-dashboard
git pull
npm install
npm run build
pm2 start pendle-dashboard
```

## 📞 需要帮助？

如果遇到问题：

1. 运行 `pm2 logs pendle-dashboard` 查看错误日志
2. 在 Bandwagon 控制面板检查防火墙设置
3. 确认使用的是正确的公网IP地址
4. 查看 `USAGE_GUIDE.md` 了解应用使用方法

## 🎉 下一步

1. **测试访问** - 在 Mac 浏览器输入 `http://你的公网IP:3000`
2. **查看文档** - 访问 `http://你的公网IP:3000/docs.html`
3. **绑定域名** - 让访问更方便和专业
4. **配置HTTPS** - 保证数据传输安全

---

**恭喜！** 你的 Pendle DeFi 数据追踪面板已成功部署！🚀
