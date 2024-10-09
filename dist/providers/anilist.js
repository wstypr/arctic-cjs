"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AniList = void 0;
const oauth2_1 = require("oslo/oauth2");
const authorizeEndpoint = "https://anilist.co/api/v2/oauth/authorize";
const tokenEndpoint = "https://anilist.co/api/v2/oauth/token";
class AniList {
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
exports.AniList = AniList;
