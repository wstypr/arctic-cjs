"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keycloak = void 0;
const oauth2_1 = require("oslo/oauth2");
const oslo_1 = require("oslo");
class Keycloak {
    client;
    realmURL;
    clientSecret;
    constructor(realmURL, clientId, clientSecret, redirectURI) {
        this.realmURL = realmURL;
        const authorizeEndpoint = this.realmURL + "/protocol/openid-connect/auth";
        const tokenEndpoint = this.realmURL + "/protocol/openid-connect/token";
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
            refreshToken: result.refresh_token,
            refreshTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.refresh_expires_in, "s")),
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
            refreshToken: result.refresh_token,
            refreshTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.refresh_expires_in, "s")),
            idToken: result.id_token
        };
        return tokens;
    }
}
exports.Keycloak = Keycloak;
