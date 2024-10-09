"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const oauth2_1 = require("oslo/oauth2");
const authorizeEndpoint = "https://account.box.com/api/oauth2/authorize";
const tokenEndpoint = "https://api.box.com/oauth2/token";
class Box {
    client;
    clientSecret;
    constructor(clientId, clientSecret, redirectURI) {
        this.client = new oauth2_1.OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
            redirectURI
        });
        this.clientSecret = clientSecret;
    }
    async createAuthorizationURL(state) {
        return await this.client.createAuthorizationURL({
            state
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
exports.Box = Box;
