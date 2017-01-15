var fs = require('fs');

function templateRender(values, view) {
    for (var key in values) {
        console.log(values[key]);
        view = view.replace('{{' +  key + '}}', values[key]);
    }
    return view;
}

function render(template, data, res) {
    var view = fs.readFileSync('./' + template + '.html', { encoding: 'UTF-8' });
    var header = fs.readFileSync('./header.html');
    var footer = fs.readFileSync('./footer.html');

    view = templateRender(data, view);

    res.write(header);
    res.write(view, {});    // {} any information could be passed
    res.write(footer);
    res.end();
}

module.exports.render = render;