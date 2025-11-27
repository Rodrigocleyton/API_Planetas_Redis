const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const ms = Date.now() - start;
        const payload = {
            level: 'INFO',
            ts: new Date().toISOString(),
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            ms
        }
        console.log(JSON.stringify(payload))
    })
    next();
}

module.exports = { requestLogger}