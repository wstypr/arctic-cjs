"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth0 = void 0;
const oauth2_1 = require("oslo/oauth2");
class Auth0 {
    client;
    appDomain;
    clientSecret;
    constructor(appDomain, clientId, clientSecret, redirectURI) {
        this.appDomain = appDomain;
        const authorizeEndpoint = this.appDomain + "/authorize";
        const tokenEndpoint = this.appDomain + "/oauth/token";
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
            refreshToken: result.refresh_token,
            idToken: result.id_token
        };
        return tokens;
    }
}
exports.Auth0 = Auth0;
