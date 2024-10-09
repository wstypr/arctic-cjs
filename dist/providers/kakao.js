"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kakao = void 0;
const oslo_1 = require("oslo");
const oauth2_1 = require("oslo/oauth2");
const authorizeEndpoint = "https://kauth.kakao.com/oauth/authorize";
const tokenEndpoint = "https://kauth.kakao.com/oauth/token";
class Kakao {
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
    async refreshAccessToken(refreshToken) {
        const result = await this.client.refreshAccessToken(refreshToken, {
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
exports.Kakao = Kakao;
