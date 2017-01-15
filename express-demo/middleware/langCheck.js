function langCheck(req, res, next) {
    var cookie = req.cookies.lang;
    if (cookie === undefined) {
        console.log('no cookie found. I am hungry.');
        res.cookie('lang', 'zh-TW', { maxAge: 900000, httpOnly: true });
    } else {
        console.log('Cookie was found. Nom nom nom.');
    }

    // passing to the next function
    next();
}

module.exports = langCheck;