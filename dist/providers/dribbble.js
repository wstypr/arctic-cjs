"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dribbble = void 0;
const oauth2_1 = require("oslo/oauth2");
const authorizeEndpoint = "https://dribbble.com/oauth/authorize";
const tokenEndpoint = "https://dribbble.com/oauth/token";
class Dribbble {
    client;
    clientSecret;
    constructor(clientId, clientSecret, redirectURI) {
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
            accessToken: result.access_token
        };
        return tokens;
    }
}
exports.Dribbble = Dribbble;
