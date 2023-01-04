const optionsJWT = {
    expiresIn: "1d",
    algorithm: "HS256"
}

// expiresIn : 30m, 12h, 1d | Blank for no expiration
// algorithm : RSASSA [ "HS256", "RS256", "RS384", "RS512" ]

const secretPhrase = "weddingManagerAPI";

module.exports = {
    optionsJWT,
    secretPhrase
}