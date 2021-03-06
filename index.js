const http = require('http');
const url = require('url');
const render = require('./renderer');

const port = process.env.PORT || 3000;

const header = {
  'Content-Type': 'text/plain; charset=UTF-8',
};

http.createServer(async (req, res) => {
  const { query } = url.parse(req.url, true);

  if (!query.url) {
    res.writeHead(404, header);
    res.end('Page not found.');
    return;
  }

  try {
    const html = await render(query.url);
    res.writeHead(200, header);
    res.end(html);
  } catch (e) {
    console.error(e);
    res.writeHead(500, header);
    res.end('Oops, An expected error seems to have occurred.');
  }
}).listen(port, () => {
  console.log(`Listen port on ${port}.`);
});
