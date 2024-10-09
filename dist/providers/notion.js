"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notion = void 0;
const oauth2_1 = require("oslo/oauth2");
const authorizeEndpoint = "https://api.notion.com/v1/oauth/authorize";
const tokenEndpoint = "https://api.notion.com/v1/oauth/token";
class Notion {
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
            credentials: this.clientSecret
        });
        const tokens = {
            accessToken: result.access_token
        };
        return tokens;
    }
}
exports.Notion = Notion;
