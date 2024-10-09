"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Google = void 0;
const oslo_1 = require("oslo");
const oauth2_1 = require("oslo/oauth2");
const authorizeEndpoint = "https://accounts.google.com/o/oauth2/v2/auth";
const tokenEndpoint = "https://oauth2.googleapis.com/token";
class Google {
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
            authenticateWith: "request_body",
            credentials: this.clientSecret,
            codeVerifier
        });
        const tokens = {
            accessToken: result.access_token,
            refreshToken: result.refresh_token ?? null,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
            idToken: result.id_token
        };
        return tokens;
    }
    async refreshAccessToken(refreshToken) {
        const result = await this.client.refreshAccessToken(refreshToken, {
            authenticateWith: "request_body",
            credentials: this.clientSecret
        });
        const tokens = {
            accessToken: result.access_token,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s"))
        };
        return tokens;
    }
}
exports.Google = Google;
