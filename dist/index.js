"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2RequestError = exports.generateState = exports.generateCodeVerifier = exports.FortyTwo = exports.Zoom = exports.Yandex = exports.Yahoo = exports.WorkOS = exports.VK = exports.Twitter = exports.Twitch = exports.Tumblr = exports.Tiltify = exports.Strava = exports.Spotify = exports.Slack = exports.Shikimori = exports.Salesforce = exports.Roblox = exports.Reddit = exports.Patreon = exports.Osu = exports.Okta = exports.Notion = exports.MyAnimeList = exports.MicrosoftEntraId = exports.LinkedIn = exports.Linear = exports.Line = exports.Lichess = exports.Keycloak = exports.Kakao = exports.Google = exports.GitLab = exports.GitHub = exports.Intuit = exports.Figma = exports.Facebook = exports.Dropbox = exports.Dribbble = exports.Discord = exports.Coinbase = exports.Box = exports.Bitbucket = exports.Authentik = exports.Auth0 = exports.Atlassian = exports.Apple = exports.AniList = exports.AmazonCognito = void 0;
var amazon_cognito_js_1 = require("./providers/amazon-cognito.js");
Object.defineProperty(exports, "AmazonCognito", { enumerable: true, get: function () { return amazon_cognito_js_1.AmazonCognito; } });
var anilist_js_1 = require("./providers/anilist.js");
Object.defineProperty(exports, "AniList", { enumerable: true, get: function () { return anilist_js_1.AniList; } });
var apple_js_1 = require("./providers/apple.js");
Object.defineProperty(exports, "Apple", { enumerable: true, get: function () { return apple_js_1.Apple; } });
var atlassian_js_1 = require("./providers/atlassian.js");
Object.defineProperty(exports, "Atlassian", { enumerable: true, get: function () { return atlassian_js_1.Atlassian; } });
var auth0_js_1 = require("./providers/auth0.js");
Object.defineProperty(exports, "Auth0", { enumerable: true, get: function () { return auth0_js_1.Auth0; } });
var authentik_js_1 = require("./providers/authentik.js");
Object.defineProperty(exports, "Authentik", { enumerable: true, get: function () { return authentik_js_1.Authentik; } });
var bitbucket_js_1 = require("./providers/bitbucket.js");
Object.defineProperty(exports, "Bitbucket", { enumerable: true, get: function () { return bitbucket_js_1.Bitbucket; } });
var box_js_1 = require("./providers/box.js");
Object.defineProperty(exports, "Box", { enumerable: true, get: function () { return box_js_1.Box; } });
var coinbase_js_1 = require("./providers/coinbase.js");
Object.defineProperty(exports, "Coinbase", { enumerable: true, get: function () { return coinbase_js_1.Coinbase; } });
var discord_js_1 = require("./providers/discord.js");
Object.defineProperty(exports, "Discord", { enumerable: true, get: function () { return discord_js_1.Discord; } });
var dribbble_js_1 = require("./providers/dribbble.js");
Object.defineProperty(exports, "Dribbble", { enumerable: true, get: function () { return dribbble_js_1.Dribbble; } });
var dropbox_js_1 = require("./providers/dropbox.js");
Object.defineProperty(exports, "Dropbox", { enumerable: true, get: function () { return dropbox_js_1.Dropbox; } });
var facebook_js_1 = require("./providers/facebook.js");
Object.defineProperty(exports, "Facebook", { enumerable: true, get: function () { return facebook_js_1.Facebook; } });
var figma_js_1 = require("./providers/figma.js");
Object.defineProperty(exports, "Figma", { enumerable: true, get: function () { return figma_js_1.Figma; } });
var intuit_js_1 = require("./providers/intuit.js");
Object.defineProperty(exports, "Intuit", { enumerable: true, get: function () { return intuit_js_1.Intuit; } });
var github_js_1 = require("./providers/github.js");
Object.defineProperty(exports, "GitHub", { enumerable: true, get: function () { return github_js_1.GitHub; } });
var gitlab_js_1 = require("./providers/gitlab.js");
Object.defineProperty(exports, "GitLab", { enumerable: true, get: function () { return gitlab_js_1.GitLab; } });
var google_js_1 = require("./providers/google.js");
Object.defineProperty(exports, "Google", { enumerable: true, get: function () { return google_js_1.Google; } });
var kakao_js_1 = require("./providers/kakao.js");
Object.defineProperty(exports, "Kakao", { enumerable: true, get: function () { return kakao_js_1.Kakao; } });
var keycloak_js_1 = require("./providers/keycloak.js");
Object.defineProperty(exports, "Keycloak", { enumerable: true, get: function () { return keycloak_js_1.Keycloak; } });
var lichess_js_1 = require("./providers/lichess.js");
Object.defineProperty(exports, "Lichess", { enumerable: true, get: function () { return lichess_js_1.Lichess; } });
var line_js_1 = require("./providers/line.js");
Object.defineProperty(exports, "Line", { enumerable: true, get: function () { return line_js_1.Line; } });
var linear_js_1 = require("./providers/linear.js");
Object.defineProperty(exports, "Linear", { enumerable: true, get: function () { return linear_js_1.Linear; } });
var linkedin_js_1 = require("./providers/linkedin.js");
Object.defineProperty(exports, "LinkedIn", { enumerable: true, get: function () { return linkedin_js_1.LinkedIn; } });
var microsoft_entra_id_js_1 = require("./providers/microsoft-entra-id.js");
Object.defineProperty(exports, "MicrosoftEntraId", { enumerable: true, get: function () { return microsoft_entra_id_js_1.MicrosoftEntraId; } });
var myanimelist_js_1 = require("./providers/myanimelist.js");
Object.defineProperty(exports, "MyAnimeList", { enumerable: true, get: function () { return myanimelist_js_1.MyAnimeList; } });
var notion_js_1 = require("./providers/notion.js");
Object.defineProperty(exports, "Notion", { enumerable: true, get: function () { return notion_js_1.Notion; } });
var okta_js_1 = require("./providers/okta.js");
Object.defineProperty(exports, "Okta", { enumerable: true, get: function () { return okta_js_1.Okta; } });
var osu_js_1 = require("./providers/osu.js");
Object.defineProperty(exports, "Osu", { enumerable: true, get: function () { return osu_js_1.Osu; } });
var patreon_js_1 = require("./providers/patreon.js");
Object.defineProperty(exports, "Patreon", { enumerable: true, get: function () { return patreon_js_1.Patreon; } });
var reddit_js_1 = require("./providers/reddit.js");
Object.defineProperty(exports, "Reddit", { enumerable: true, get: function () { return reddit_js_1.Reddit; } });
var roblox_js_1 = require("./providers/roblox.js");
Object.defineProperty(exports, "Roblox", { enumerable: true, get: function () { return roblox_js_1.Roblox; } });
var salesforce_js_1 = require("./providers/salesforce.js");
Object.defineProperty(exports, "Salesforce", { enumerable: true, get: function () { return salesforce_js_1.Salesforce; } });
var shikimori_js_1 = require("./providers/shikimori.js");
Object.defineProperty(exports, "Shikimori", { enumerable: true, get: function () { return shikimori_js_1.Shikimori; } });
var slack_js_1 = require("./providers/slack.js");
Object.defineProperty(exports, "Slack", { enumerable: true, get: function () { return slack_js_1.Slack; } });
var spotify_js_1 = require("./providers/spotify.js");
Object.defineProperty(exports, "Spotify", { enumerable: true, get: function () { return spotify_js_1.Spotify; } });
var strava_js_1 = require("./providers/strava.js");
Object.defineProperty(exports, "Strava", { enumerable: true, get: function () { return strava_js_1.Strava; } });
var tiltify_js_1 = require("./providers/tiltify.js");
Object.defineProperty(exports, "Tiltify", { enumerable: true, get: function () { return tiltify_js_1.Tiltify; } });
var tumblr_js_1 = require("./providers/tumblr.js");
Object.defineProperty(exports, "Tumblr", { enumerable: true, get: function () { return tumblr_js_1.Tumblr; } });
var twitch_js_1 = require("./providers/twitch.js");
Object.defineProperty(exports, "Twitch", { enumerable: true, get: function () { return twitch_js_1.Twitch; } });
var twitter_js_1 = require("./providers/twitter.js");
Object.defineProperty(exports, "Twitter", { enumerable: true, get: function () { return twitter_js_1.Twitter; } });
var vk_js_1 = require("./providers/vk.js");
Object.defineProperty(exports, "VK", { enumerable: true, get: function () { return vk_js_1.VK; } });
var workos_js_1 = require("./providers/workos.js");
Object.defineProperty(exports, "WorkOS", { enumerable: true, get: function () { return workos_js_1.WorkOS; } });
var yahoo_js_1 = require("./providers/yahoo.js");
Object.defineProperty(exports, "Yahoo", { enumerable: true, get: function () { return yahoo_js_1.Yahoo; } });
var yandex_js_1 = require("./providers/yandex.js");
Object.defineProperty(exports, "Yandex", { enumerable: true, get: function () { return yandex_js_1.Yandex; } });
var zoom_js_1 = require("./providers/zoom.js");
Object.defineProperty(exports, "Zoom", { enumerable: true, get: function () { return zoom_js_1.Zoom; } });
var _42_js_1 = require("./providers/42.js");
Object.defineProperty(exports, "FortyTwo", { enumerable: true, get: function () { return _42_js_1.FortyTwo; } });
var oauth2_1 = require("oslo/oauth2");
Object.defineProperty(exports, "generateCodeVerifier", { enumerable: true, get: function () { return oauth2_1.generateCodeVerifier; } });
Object.defineProperty(exports, "generateState", { enumerable: true, get: function () { return oauth2_1.generateState; } });
Object.defineProperty(exports, "OAuth2RequestError", { enumerable: true, get: function () { return oauth2_1.OAuth2RequestError; } });
