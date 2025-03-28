const express = require('express');
const app = express();
const PORT = 3000;

// 设置模板引擎
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static('public'));

// 测试页面
app.get('/', (req, res) => {
    res.render('index', { message: '欢迎来到照片打印服务！' });
});

app.listen(PORT, () => {
    console.log(`服务器正在运行：http://localhost:${PORT}`);
});
