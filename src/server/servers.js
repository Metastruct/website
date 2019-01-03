const request = require("request-promise-native")

module.exports = app => {
    const gameservers = app.config.gameservers

    // https://g2cf.metastruct.net/app/playerlist?server=# gives a better result though
    app.get("/servers.json", async (req, res) => {
        let info = {}

        for (const name in gameservers) {
            if (gameservers.hasOwnProperty(name)) {
                const data = gameservers[name]

                if (data.serverid) {
                    try {
                        let _info = JSON.parse(await request(`https://g2cf.metastruct.net/app/playerlist?server=${data.serverid}`))
                        delete _info.players
                        _info.serverinfo.address = data.address
                        _info.serverinfo.port = data.port
                        info[name] = _info
                    } catch (e) {}
                }
            }
        }

        res.json(info)
    })
}
