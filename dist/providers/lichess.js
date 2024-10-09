"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lichess = void 0;
const oauth2_1 = require("oslo/oauth2");
const authorizeEndpoint = "https://lichess.org/oauth";
const tokenEndpoint = "https://lichess.org/api/token";
class Lichess {
    client;
    constructor(clientId, redirectURI) {
        this.client = new oauth2_1.OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
            redirectURI
        });
    }
    async createAuthorizationURL(state, codeVerifier, options) {
        return await this.client.createAuthorizationURL({
            state,
            scopes: options?.scopes ?? [],
            codeVerifier
        });
    }
    async validateAuthorizationCode(code, codeVerifier) {
        const result = await this.client.validateAuthorizationCode(code, {
            codeVerifier
        });
        const tokens = {
            accessToken: result.access_token
        };
        return tokens;
    }
}
exports.Lichess = Lichess;
