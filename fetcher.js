// define Node part
var https = require('https');
var fs = require('fs');

function fetchSite(site) {
    https.get(site, (res) => {
        console.log('get a response');

        var result = '';
        res.on('data', (chunk) => {
            // chunk ==> buffered stream
            result += chunk;
            // console.log(result);
        }).on('end', () => {
            fs.writeFile('Google.html', result, (err) => {
                if (err) throw err;
                console.log('It\'s saved!');
            });
        });
        // 從暫停的狀態中恢復
        res.resume();
    }).on('error', (e) => {
        console.log(`Got error: ${e.message}`);
    });
}

module.exports.fetchSite = fetchSite;

// console.log(process.argv);