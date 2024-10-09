"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shikimori = void 0;
const oauth2_1 = require("oslo/oauth2");
const authorizeEndpoint = "https://shikimori.one/oauth/authorize";
const tokenEndpoint = "https://shikimori.one/oauth/token";
class Shikimori {
    client;
    clientSecret;
    constructor(clientId, clientSecret, redirectURI) {
        this.client = new oauth2_1.OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
            redirectURI
        });
        this.clientSecret = clientSecret;
    }
    createAuthorizationURL(state, scopes) {
        return this.client.createAuthorizationURL({ state, scopes });
    }
    async validateAuthorizationCode(code) {
        const result = await this.client.validateAuthorizationCode(code, {
            authenticateWith: "request_body",
            credentials: this.clientSecret
        });
        return {
            accessToken: result.access_token,
            refreshToken: result.refresh_token,
            accessTokenExpiresAt: new Date((result.created_at + result.expires_in) * 1000)
        };
    }
    async refreshAccessToken(refreshToken) {
        const result = await this.client.refreshAccessToken(refreshToken, {
            authenticateWith: "request_body",
            credentials: this.clientSecret
        });
        return {
            accessToken: result.access_token,
            refreshToken: result.refresh_token,
            accessTokenExpiresAt: new Date((result.created_at + result.expires_in) * 1000)
        };
    }
}
exports.Shikimori = Shikimori;
