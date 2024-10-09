"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitLab = void 0;
const oauth2_1 = require("oslo/oauth2");
const oslo_1 = require("oslo");
class GitLab {
    client;
    clientSecret;
    constructor(clientId, clientSecret, redirectURI, options) {
        const domain = options?.domain ?? "https://gitlab.com";
        const authorizeEndpoint = domain + "/oauth/authorize";
        const tokenEndpoint = domain + "/oauth/token";
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
            refreshToken: result.refresh_token
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
            refreshToken: result.refresh_token
        };
        return tokens;
    }
}
exports.GitLab = GitLab;
