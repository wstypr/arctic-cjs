"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Salesforce = void 0;
const oauth2_1 = require("oslo/oauth2");
class Salesforce {
    client;
    clientSecret;
    constructor(clientId, clientSecret, redirectURI) {
        const authorizeEndpoint = "https://login.salesforce.com/services/oauth2/authorize";
        const tokenEndpoint = "https://login.salesforce.com/services/oauth2/token";
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
        return {
            accessToken: result.access_token,
            refreshToken: result.refresh_token ?? null,
            idToken: result.id_token
        };
    }
    async refreshAccessToken(refreshToken) {
        const result = await this.client.refreshAccessToken(refreshToken, {
            credentials: this.clientSecret
        });
        return {
            accessToken: result.access_token,
            refreshToken: result.refresh_token ?? null,
            idToken: result.id_token
        };
    }
}
exports.Salesforce = Salesforce;
