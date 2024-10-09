"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slack = void 0;
const oauth2_1 = require("oslo/oauth2");
const authorizeEndpoint = "https://slack.com/openid/connect/authorize";
const tokenEndpoint = "https://slack.com/api/openid.connect.token";
class Slack {
    client;
    clientSecret;
    constructor(clientId, clientSecret, redirectURI) {
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
            credentials: this.clientSecret,
            authenticateWith: "request_body"
        });
        const tokens = {
            accessToken: result.access_token,
            idToken: result.id_token
        };
        return tokens;
    }
}
exports.Slack = Slack;
