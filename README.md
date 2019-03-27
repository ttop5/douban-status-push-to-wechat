# douban-status-push-to-wechat

将豆瓣的某个用户的动态实时推送到微信，做一只快乐又及时的舔狗🐶

## 准备工作

#### 1. 获取豆瓣用户的数字 ID

目前只支持整数型 id，字母型的 id 可以通过头像图片链接来找到其整数型 id，图片命名规则ul[uid]-*.jpg

#### 2. Server 酱申请 SCKEY

申请地址：[http://sc.ftqq.com/3.version](http://sc.ftqq.com/3.version])


## 如何使用

相关依赖：

- git
- npm
- node
- make
- docker

部署操作：

```bash
1. 克隆代码
git clone git@github.com:ttop5/douban-status-push-to-wechat.git

2. 修改配置
export USERID=xxxxxx
export SCKEY=xxxxxx

3. 安装依赖
npm install

4. 启动服务
nohup npm start > log &

```

Docker 支持：

```
1. 构建
make build

2. 启动服务
docker run --rm -ti -e USERID=<USERID> -e SCKEY=<SCKEY> douban-status-push-to-wechat:<tag>

```


## 未来计划

如果之后有动力继续写下去的话：

- [x] 支持豆瓣单用户动态推送；
- [ ] 支持多用户监控推送;
- [ ] 支持其他社交平台，如微博等；
- [ ] 支持后台界面配置；
- [ ] 提供傻瓜式公有云服务；
- [ ] ......


## 已知问题

移动端部分转发动态接口不返回，在桌面 web 端接口上却是返回的，官方两个接口返回结果不一致，不知是 bug 还是有意为之。


## 开源许可

[MIT](https://github.com/ttop5/douban-status-push-to-wechat/blob/master/LICENSE)


## 写在最后

一切不平等的关系都是从舔狗开始的；舔狗舔到最后一无所有；舔狗不得好死! —— 鲁迅

相关链接：[https://github.com/ttop5/blog/issues/31](https://github.com/ttop5/blog/issues/31)
