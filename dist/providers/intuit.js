"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Intuit = void 0;
const oauth2_1 = require("oslo/oauth2");
const oslo_1 = require("oslo");
const authorizeEndpoint = "https://appcenter.intuit.com/connect/oauth2";
const tokenEndpoint = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";
class Intuit {
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
            refreshTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.x_refresh_token_expires_in, "s")),
            idToken: result.id_token
        };
        return tokens;
    }
    async refreshAccessToken(accessToken) {
        const result = await this.client.refreshAccessToken(accessToken, {
            credentials: this.clientSecret
        });
        const tokens = {
            accessToken: result.access_token,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
            refreshToken: result.refresh_token,
            refreshTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.x_refresh_token_expires_in, "s")),
            idToken: result.id_token
        };
        return tokens;
    }
}
exports.Intuit = Intuit;
