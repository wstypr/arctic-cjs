"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roblox = void 0;
const oslo_1 = require("oslo");
const oauth2_1 = require("oslo/oauth2");
const authorizeEndpoint = "https://apis.roblox.com/oauth/v1/authorize";
const tokenEndpoint = "https://apis.roblox.com/oauth/v1/token";
class Roblox {
    client;
    clientSecret;
    constructor(clientId, clientSecret, redirectURI) {
        this.client = new oauth2_1.OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
            redirectURI
        });
        this.clientSecret = clientSecret;
    }
    async createAuthorizationURL(state, codeVerifier, options) {
        const scopes = options?.scopes ?? [];
        return await this.client.createAuthorizationURL({
            state,
            codeVerifier,
            scopes: [...scopes, "openid"]
        });
    }
    async validateAuthorizationCode(code, codeVerifier) {
        const result = await this.client.validateAuthorizationCode(code, {
            credentials: this.clientSecret,
            codeVerifier,
            authenticateWith: "request_body" // Roblox doesn't support HTTP basic auth
        });
        const tokens = {
            accessToken: result.access_token,
            refreshToken: result.refresh_token,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
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
            refreshToken: result.refresh_token,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
            idToken: result.id_token
        };
        return tokens;
    }
}
exports.Roblox = Roblox;
