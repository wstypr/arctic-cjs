"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrosoftEntraId = void 0;
const oslo_1 = require("oslo");
const oauth2_1 = require("oslo/oauth2");
class MicrosoftEntraId {
    client;
    clientSecret;
    constructor(tenant, clientId, clientSecret, redirectURI) {
        const authorizeEndpoint = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`;
        const tokenEndpoint = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`;
        this.client = new oauth2_1.OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
            redirectURI
        });
        this.clientSecret = clientSecret;
    }
    async createAuthorizationURL(state, codeVerifier, options) {
        const scopes = options?.scopes ?? [];
        const url = await this.client.createAuthorizationURL({
            state,
            codeVerifier,
            scopes: [...scopes, "openid"]
        });
        url.searchParams.set("nonce", "_");
        return url;
    }
    async validateAuthorizationCode(code, codeVerifier) {
        const result = await this.client.validateAuthorizationCode(code, {
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
            credentials: this.clientSecret
        });
        const tokens = {
            accessToken: result.access_token,
            refreshToken: result.refresh_token ?? null,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
            idToken: result.id_token
        };
        return tokens;
    }
}
exports.MicrosoftEntraId = MicrosoftEntraId;
