
module.exports = (app: any, PORT: Number) => {
    app.listen(PORT, () => {
        console.log(`Running on <http://localhost:${PORT}>`)
    })
}
