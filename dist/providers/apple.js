"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apple = void 0;
const oslo_1 = require("oslo");
const encoding_1 = require("oslo/encoding");
const jwt_1 = require("oslo/jwt");
const oauth2_1 = require("oslo/oauth2");
const authorizeEndpoint = "https://appleid.apple.com/auth/authorize";
const tokenEndpoint = "https://appleid.apple.com/auth/token";
class Apple {
    client;
    credentials;
    constructor(credentials, redirectURI) {
        this.client = new oauth2_1.OAuth2Client(credentials.clientId, authorizeEndpoint, tokenEndpoint, {
            redirectURI
        });
        this.credentials = credentials;
    }
    async createAuthorizationURL(state, options) {
        return await this.client.createAuthorizationURL({
            state,
            scopes: options?.scopes
        });
    }
    async validateAuthorizationCode(code) {
        const result = await this.client.validateAuthorizationCode(code, {
            authenticateWith: "request_body",
            credentials: await this.createClientSecret()
        });
        const tokens = {
            accessToken: result.access_token,
            refreshToken: result.refresh_token ?? null,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
            idToken: result.id_token
        };
        return tokens;
    }
    async refreshAccessToken(refreshToken) {
        const result = await this.client.refreshAccessToken(refreshToken, {
            authenticateWith: "request_body",
            credentials: await this.createClientSecret()
        });
        const tokens = {
            accessToken: result.access_token,
            accessTokenExpiresAt: (0, oslo_1.createDate)(new oslo_1.TimeSpan(result.expires_in, "s")),
            idToken: result.id_token
        };
        return tokens;
    }
    async createClientSecret() {
        const audience = "https://appleid.apple.com";
        const payload = {};
        const jwt = await (0, jwt_1.createJWT)("ES256", parsePKCS8PEM(this.credentials.certificate), payload, {
            headers: {
                kid: this.credentials.keyId
            },
            issuer: this.credentials.teamId,
            includeIssuedTimestamp: true,
            expiresIn: new oslo_1.TimeSpan(5, "m"),
            audiences: [audience],
            subject: this.credentials.clientId
        });
        return jwt;
    }
}
exports.Apple = Apple;
function parsePKCS8PEM(pkcs8) {
    return encoding_1.base64.decode(pkcs8
        .replace("-----BEGIN PRIVATE KEY-----", "")
        .replace("-----END PRIVATE KEY-----", "")
        .replaceAll("\r", "")
        .replaceAll("\n", "")
        .trim(), {
        strict: false
    });
}
