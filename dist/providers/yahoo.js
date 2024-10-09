"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yahoo = void 0;
const oauth2_1 = require("oslo/oauth2");
const oslo_1 = require("oslo");
const authorizeEndpoint = "https://api.login.yahoo.com/oauth2/request_auth";
const tokenEndpoint = "https://api.login.yahoo.com/oauth2/get_token";
class Yahoo {
    client;
    clientSecret;
    constructor(clientId, clientSecret, redirectURI) {
        this.client = new oauth2_1.OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
            redirectURI
        });
        this.clientSecret = clientSecret;
    }
    async createAuthorizationURL(state, options) {
        const scopes = options?.scopes ?? [];
        return await this.client.createAuthorizationURL({
            state,
            scopes: [...scopes, "openid"]
        });
    }
    async validateAuthorizationCode(code) {
        const result = await this.client.validateAuthorizationCode(code, {
            credentials: this.clientSecret
        });
        const tokens = {
            accessToken: result.access_token,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
            refreshToken: result.refresh_token,
            idToken: result.id_token
        };
        return tokens;
    }
    async refreshAccessToken(refreshToken) {
        const result = await this.client.refreshAccessToken(refreshToken, {
            credentials: this.clientSecret
        });
        const tokens = {
            accessToken: result.access_token,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
            refreshToken: result.refresh_token,
            idToken: result.id_token
        };
        return tokens;
    }
}
exports.Yahoo = Yahoo;
