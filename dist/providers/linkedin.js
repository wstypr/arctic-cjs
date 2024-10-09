"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedIn = void 0;
const oauth2_1 = require("oslo/oauth2");
const oslo_1 = require("oslo");
const authorizeEndpoint = "https://www.linkedin.com/oauth/v2/authorization";
const tokenEndpoint = "https://www.linkedin.com/oauth/v2/accessToken";
class LinkedIn {
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
            authenticateWith: "request_body",
            credentials: this.clientSecret
        });
        const tokens = {
            idToken: result.id_token,
            accessToken: result.access_token,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
            refreshToken: result.refresh_token ?? null,
            refreshTokenExpiresAt: result.refresh_token_expires_in
                ? (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.refresh_token_expires_in, "s"))
                : null
        };
        return tokens;
    }
    async refreshAccessToken(accessToken) {
        const result = await this.client.refreshAccessToken(accessToken, {
            authenticateWith: "request_body",
            credentials: this.clientSecret
        });
        const tokens = {
            accessToken: result.access_token,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
            refreshToken: result.refresh_token,
            refreshTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.refresh_token_expires_in, "s"))
        };
        return tokens;
    }
}
exports.LinkedIn = LinkedIn;
