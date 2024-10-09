"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHub = void 0;
const oauth2_1 = require("oslo/oauth2");
class GitHub {
    client;
    clientSecret;
    constructor(clientId, clientSecret, options) {
        const baseUrl = options?.enterpriseDomain ?? "https://github.com";
        const authorizeEndpoint = baseUrl + "/login/oauth/authorize";
        const tokenEndpoint = baseUrl + "/login/oauth/access_token";
        this.client = new oauth2_1.OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
            redirectURI: options?.redirectURI
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
            accessToken: result.access_token
        };
        return tokens;
    }
}
exports.GitHub = GitHub;
