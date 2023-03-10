# react 嵌套路由页面 404

```
reactjs 刷新包含嵌套路由的页面时得到“404 not found”，因为Vite不会将所有路由重定向到index.html

我可以使用React路由器的useNavigate钩子转到嵌套路由，如localhost:3000/nested/route，但一旦重新加载，我就会得到一个404未找到错误，因为它出于某种原因试图查找localhost:3000/nested/route/index.html。
如何将Vite in dev配置为具有客户端路由的SPA，以便将所有请求重定向到根目录index.html？
[嵌套路由页面404](https://www.saoniuhuo.com/question/detail-2355634.html)
```

# 解决方案

```
通过在我的index.html中添加一个base标签修复：
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.png" />
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    <meta name="description" content="My App" />
    <title>My App</title>
    <base href="/" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <script type="module" src="src/index.tsx"></script>
    <div id="root"></div>
  </body>
</html>
```

"npm run lint:eslint --fix",
"prettier --write --loglevel warn",
