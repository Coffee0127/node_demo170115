var express = require('express');
// Router() express built-in function
var router = express.Router();

router.get('/', (req, res) => {
    // 不需要加註附檔名
    res.render('index');
});

// 擴充 express，而非 export function
module.exports = router;