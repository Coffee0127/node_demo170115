var fs = require('fs');

function render(template, data, res) {
    fs.readFile('./header.html', (err, header) => {
        fs.readFile('./' + template + '.html', (err, view) => {
            fs.readFile('./footer.html', (err, footer) => {
                res.write(header);
                res.write(view, {});    // {} any information could be passed
                res.write(footer);
            });
        });
    });
}

module.exports.render = render;