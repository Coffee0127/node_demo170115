var fs = require('fs');

function render(template, data, res) {
    var view = fs.readFileSync('./' + template + '.html');
    var header = fs.readFileSync('./header.html');
    var footer = fs.readFileSync('./footer.html');
    res.write(header);
    res.write(view, {});    // {} any information could be passed
    res.write(footer);
}

module.exports.render = render;