"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyAnimeList = void 0;
const oslo_1 = require("oslo");
const oauth2_1 = require("oslo/oauth2");
const authorizeEndpoint = "https://myanimelist.net/v1/oauth2/authorize";
const tokenEndpoint = "https://myanimelist.net/v1/oauth2/token";
class MyAnimeList {
    client;
    clientSecret;
    constructor(clientId, clientSecret, options) {
        this.client = new oauth2_1.OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
            redirectURI: options?.redirectURI
        });
        this.clientSecret = clientSecret;
    }
    async createAuthorizationURL(state, codeVerifier) {
        return await this.client.createAuthorizationURL({
            state,
            codeVerifier,
            codeChallengeMethod: "plain"
        });
    }
    async validateAuthorizationCode(code, codeVerifier) {
        const result = await this.client.validateAuthorizationCode(code, {
            credentials: this.clientSecret,
            codeVerifier
        });
        const tokens = {
            accessToken: result.access_token,
            refreshToken: result.refresh_token,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s"))
        };
        return tokens;
    }
    async refreshAccessToken(refreshToken) {
        const result = await this.client.refreshAccessToken(refreshToken, {
            credentials: this.clientSecret
        });
        const tokens = {
            accessToken: result.access_token,
            refreshToken: result.refresh_token,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s"))
        };
        return tokens;
    }
}
exports.MyAnimeList = MyAnimeList;
