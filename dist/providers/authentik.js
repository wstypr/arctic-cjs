"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentik = void 0;
const oauth2_1 = require("oslo/oauth2");
const oslo_1 = require("oslo");
class Authentik {
    client;
    clientSecret;
    constructor(realmURL, clientId, clientSecret, redirectURI) {
        const authorizeEndpoint = realmURL + "/application/o/authorize/";
        const tokenEndpoint = realmURL + "/application/o/token/";
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
            codeVerifier,
            credentials: this.clientSecret
        });
        const tokens = {
            accessToken: result.access_token,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
            refreshToken: result.refresh_token ?? null,
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
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
            refreshToken: result.refresh_token ?? null,
            idToken: result.id_token
        };
        return tokens;
    }
}
exports.Authentik = Authentik;
