"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discord = void 0;
const oauth2_1 = require("oslo/oauth2");
const oslo_1 = require("oslo");
const authorizeEndpoint = "https://discord.com/oauth2/authorize";
const tokenEndpoint = "https://discord.com/api/oauth2/token";
class Discord {
    client;
    clientSecret;
    constructor(clientId, clientSecret, redirectURI) {
        this.client = new oauth2_1.OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
            redirectURI
        });
        this.clientSecret = clientSecret;
    }
    async createAuthorizationURL(state, options) {
        return await this.client.createAuthorizationURL({
            state,
            scopes: options?.scopes ?? []
        });
    }
    async validateAuthorizationCode(code) {
        const result = await this.client.validateAuthorizationCode(code, {
            credentials: this.clientSecret
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
exports.Discord = Discord;
