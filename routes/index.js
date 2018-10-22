const express = require('express');
const router = express.Router();

const app = express();

// Webページ(HTMLファイル)のリクエストの処理
app.use('/', express.static('./public')); // publicフォルダのファイルを公開

module.exports = router;
