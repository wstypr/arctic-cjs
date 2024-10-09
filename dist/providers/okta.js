"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Okta = void 0;
const oauth2_1 = require("oslo/oauth2");
const oslo_1 = require("oslo");
class Okta {
    client;
    clientSecret;
    constructor(oktaDomain, clientId, clientSecret, redirectURI, options) {
        let authorizeEndpoint;
        let tokenEndpoint;
        if (options?.authorizationServerId) {
            authorizeEndpoint = `${oktaDomain}/oauth2/${options.authorizationServerId}/v1/authorize`;
            tokenEndpoint = `${oktaDomain}/oauth2/${options.authorizationServerId}/v1/token`;
        }
        else {
            authorizeEndpoint = `${oktaDomain}/oauth2/v1/authorize`;
            tokenEndpoint = `${oktaDomain}/oauth2/v1/token`;
        }
        this.client = new oauth2_1.OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
            redirectURI
        });
        this.clientSecret = clientSecret;
    }
    async createAuthorizationURL(state, codeVerifier, options) {
        const url = await this.client.createAuthorizationURL({
            codeVerifier,
            scopes: [...(options?.scopes ?? []), "openid"]
        });
        url.searchParams.set("state", state);
        return url;
    }
    async validateAuthorizationCode(code, codeVerifier) {
        const result = await this.client.validateAuthorizationCode(code, {
            codeVerifier,
            credentials: this.clientSecret,
            authenticateWith: "request_body"
        });
        const tokens = {
            accessToken: result.access_token,
            refreshToken: result.refresh_token ?? null,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
            idToken: result.id_token,
            deviceSecret: result.device_secret ?? null
        };
        return tokens;
    }
    async refreshAccessToken(refreshToken, options) {
        const result = await this.client.refreshAccessToken(refreshToken, {
            credentials: this.clientSecret,
            authenticateWith: "request_body",
            scopes: options?.scopes ?? []
        });
        const tokens = {
            accessToken: result.access_token,
            refreshToken: result.refresh_token ?? null,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
            idToken: result.id_token,
            deviceSecret: result.device_secret ?? null
        };
        return tokens;
    }
}
exports.Okta = Okta;
