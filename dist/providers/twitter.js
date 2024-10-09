"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Twitter = void 0;
const oauth2_1 = require("oslo/oauth2");
const authorizeEndpoint = "https://twitter.com/i/oauth2/authorize";
const tokenEndpoint = "https://api.twitter.com/2/oauth2/token";
class Twitter {
    client;
    clientSecret;
    constructor(clientId, clientSecret, redirectURI) {
        this.client = new oauth2_1.OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
            redirectURI
        });
        this.clientSecret = clientSecret;
    }
    async createAuthorizationURL(state, codeVerifier, options) {
        return await this.client.createAuthorizationURL({
            state,
            codeVerifier,
            scopes: options?.scopes ?? []
        });
    }
    async validateAuthorizationCode(code, codeVerifier) {
        const result = await this.client.validateAuthorizationCode(code, {
            credentials: this.clientSecret,
            codeVerifier
        });
        const tokens = {
            accessToken: result.access_token,
            refreshToken: result.refresh_token ?? null
        };
        return tokens;
    }
    async refreshAccessToken(refreshToken) {
        const result = await this.client.refreshAccessToken(refreshToken, {
            credentials: this.clientSecret
        });
        const tokens = {
            accessToken: result.access_token,
            refreshToken: result.refresh_token ?? null
        };
        return tokens;
    }
}
exports.Twitter = Twitter;
