let options = {
    expiresIn: "1d", //30m, 12h, 1d | Blank for no expiration
    algorithm: "RS256" // RSASSA [ "RS256", "RS384", "RS512" ]
}

let secretPhrase = "@Microservices|Node";

module.exports = {
    options,
    secretPhrase
}