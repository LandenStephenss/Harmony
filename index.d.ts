/**
 * Type definitions for Apacheli/Harmony discord lib, by o_Hinoki.
 */


interface ChannelOptions {
    type: number,
    topic: string,
    bitrate: number,
    user_limit: number,
    rate_limit_per_user: number
    position: number,
    permission_overwrites: object[],
    parent_id: string,
    nsfw: boolean
}
declare namespace Harmony {
    namespace rest {
        namespace channel {
            function channel(
                channelID: string
            ): string;

            function guildChannels(
                guildID: string
            ): string;

            function permission(
                channelID: string,
                overwriteID: string
            ): string;

            function typings(
                channelID: string
            ): string;

            function getChannel(
                token: string,
                channelID: string
            ): Promise;

            function getChannels(
                token: string,
                guildID: string
            ): Promise;

            function createChannel(
                token: string,
                guildID: string,
                options: ChannelOptions
            ): Promise;

            function createPrivateChannel(
                token: string,
                userID: string
            ): Promise;

            function editChannel(
                token: string,
                channelID: string,
                options: ChannelOptions
            ): Promise;

            function editChannelPositions(
                token: string,
                guildID: string,
                channel: {
                    id: string,
                    position: number
                }
            ): Promise<void>;

            function deleteChannel(
                token: string,
                channelID: string
            ): Promise;

            function editOverwrite(
                token: string,
                channelID: string,
                overwriteID: string,
                options: {
                    allow: number,
                    deny: number,
                    type: string
                }
            )

            function deleteOverwrite(
                token: string,
                channelID: string,
                overwrite: stringID
            )

            function triggerTypingIndicator(
                token: string,
                channelID: string
            )
        };

        namespace gateway {
            function getGateway(): Promise;

            function getBotGateway(
                token: string
            ): Promise;
        };

        namespace guild {
            function guild(
                guildID: string
            ): string;

            function meGuild(
                guildID: string
            ): string;

            function ban(
                guildID: string,
                userID: string
            ): string;

            function bans(
                guildID: string
            ): string;

            function member(
                guildID: string,
                userID: string
            ): string;

            function members(
                guildID: string
            ): string;

            function memberRole(
                guildID: string,
                userID: string,
                roleID: string
            ): string;

            function prune(
                guildID: string
            ): string;

            function role(
                guildID: string,
                roleID: string
            ): string;

            function roles(
                guildID: string
            ): string;

            function regions(
                guildID: string
            ): string;

            function integration(
                guildID: string,
                integrationID: string
            ): string;

            function integrations(
                guildID: string
            ): string;

            function sync(
                guildID: string
            ): string;

            function vanity(
                guildID: string
            ): string;

            function embed(
                guildID: string
            ): string;

            function auditLogs(
                guildID: string
            ): string;

            function emoji(
                guildID: string,
                emojiID: string
            ): string;

            function emojis(
                guildID: string
            ): string;

            function getGuild(
                token: string,
                guildID: string
            ): Promise<object>;

            function createGuild(
                token: string,
                options: {
                    name: string,
                    region: string,
                    icon: string,
                    verification_level: number,
                    default_message_notifications: number,
                    explicit_content_filter: number
                    roles: object[],
                    channels: object[]
                }
            ): Promise<object>;

            function editGuild(
                token: string,
                guildID: string,
                options: {
                    name: string,
                    region: string,
                    verification_level: number,
                    default_message_notifications: number,
                    explicit_content_filter: number,
                    afk_channel_id: string,
                    afk_timeout: number,
                    icon: string,
                    owner_id: string,
                    splash: string,
                    system_channel_id: string
                }
            ): Promise<Object>;

            function deleteGuild(
                token: string,
                guildID: string
            ): Promise<void>;

            function leaveGuild(
                token: string,
                guildID: string
            ): Promise<void>;

            function getBan(
                token: string,
                guildID: string,
                userID: string
            ): Promise<Object>;

            function getBans(
                token: string,
                guildID: string
            ): Promise<Object[]>;

            function getMember(
                token: string,
                guildID: string,
                userID: string
            ): Promise<Object>;

            function getMembers(
                token: string,
                guildID: string,
                options: {
                    limit: number,
                    after: string
                }
            ): Promise<Object[]>;

            function editMember(
                token: string,
                guildID: string,
                userID: string,
                options: {
                    nick: string,
                    mute: boolean,
                    deaf: boolean,
                    channel_id: string
                }
            ): Promise;

            function addMemberRole(
                token: string,
                guildID: string,
                userID: string,
                roleID: string
            ): Promise;

            function removeMemberRole(
                token: string,
                guildID: string,
                userID: string,
                roleID: string
            ): Promise;

            function kickMember(
                token: string,
                guildID: string,
                userID: string
            ): Promise;

            function banMember(
                token: string,
                guildID: string,
                userID: string,
                days = null
            ): Promise;

            function unbanMember(
                token: string,
                guildID: string,
                userID: string
            ): Promise;

            function getPruneCount(
                token: string,
                guildID: string,
                option: {
                    days: number
                }
            ): Promise;

            function pruneMembers(
                token: string,
                guildID,
                options: {
                    days: number
                    compute_prune_count: boolean
                }
            ): Promise<void>;

            function getRoles(
                token: string,
                guildID: string
            ): Promise;

            function createRole(
                token: string,
                guildID: string,
                options: {
                    name: string,
                    permissions: number,
                    color: number,
                    hoist: boolean,
                    mentionable: boolean
                }
            ): Promise;

            function deleteRole(
                token: string,
                guildID: string,
                roleID: string
            ): Promise<void>;

            function editRole(
                token: string,
                guildID: string,
                roleID: string,
                options: {
                    name: string,
                    permissions: number,
                    color: number,
                    hoist: boolean,
                    mentionable: boolean
                }
            ): Promise<object>;

            function editRolePositions(
                token: string,
                guildID: string,
                roles): Promise<object[]>;

            function getVoiceRegions(
                token: string,
                guildID: string): Promise<string[]>;

            function getIntegrations(
                token: string,
                guildID: string): Promise<object[]>;

            function createIntegration(
                token: string,
                guildID: string,
                options: {
                    type: string,
                    id: string
                }
            ): Promise<void>;

            function deleteIntegration(
                token: string,
                guildID: string,
                integrationID: string
            ): Promise<void>;

            function editIntegration(
                token: string,
                guildID: string,
                integrationID: string,
                options: {
                    expire_behaviour: number,
                    expire_grace_period: number,
                    enable_emoticons: boolean
                }
            ): Promise<void>

            function syncIntegration(
                token: string,
                guildID: string
            ): Promise<void>;

            function getEmbed(
                token: string,
                guildID: string
            ): Promise<object>;

            function editEmbed(
                token: string,
                guildID: string,
                options
            ): Promise<object>;

            function getVanityURL(
                token: string,
                guildID: string
            ): Promise<object>;

            function getAuditLogs(
                token: string,
                guildID: string,
                options: {
                    user_id: string,
                    action: number,
                    before: string,
                    limit: number
                }
            ): Promise<object>;

            function getEmoji(
                token: string,
                guildID: string,
                emojiID: string
            ): Promise<object>;

            function getEmojis(
                token: string,
                guildID: string
            ): Promise<object[]>;

            function createEmoji(
                token: string,
                guildID: string,
                options
            ): Promise<object>;

            function editEmoji(
                token: string,
                guildID: string,
                emojiID: string,
                options
            ): Promise<object>;

            function deleteEmoji(
                token: string,
                guildID: string,
                emojiID: string
            ): Promise<void>;
        };

        namespace invite {
            function getInvite(
                token: string,
                inviteCode: string,
                options
            ): Promise<object>;

            function getChannelInvites(
                token: string,
                channelID: string
            ): Promise<object[]>;

            function getGuildInvites(
                token: string,
                guildID: string
            ): Promise<object[]>;

            function createInvite(
                token: string,
                channelID: string,
                options: {
                    max_age: number,
                    max_uses: number,
                    temporary: boolean,
                    unique: boolean
                }
            ): Promise;

            function deleteInvite(
                token: string,
                inviteCode: string
            ): Promise<void>;
        };

        namespace message {
            function message(channelID, messageID): string;

            function messages(channelID): string;

            function bulkDelete(channelID): string;

            function pin(channelID, messageID): string;

            function pins(channelID): string;

            function reaction(channelID, messageID, emoji): string;

            function reactions(channelID, messageID): string;

            function userReaction(channelID, messageID, emoji, user = '@me'): string;

            function getMessage(token, channelID, messageID): Promise<object>;

            function getMessages(
                token,
                channelID,
                options: {
                    after: string,
                    before: string,
                    around: string,
                    limit: number
                }
            ): Promise<object[]>;

            function createMessage(
                token: string,
                channelID: string,
                options: {
                    content: string,
                    embed: object,
                    nonce: string,
                    tts: boolean
                }
            ): Promise<object>;

            function editMessage(
                token: string,
                channelID: string,
                messageID: string,
                options: {
                    content: string,
                    embed: object
                }
            ): Promise<object>;

            function deleteMessage(
                token: string,
                channelID: string,
                messageID: string
            ): Promise<void>;

            function bulkDeleteMessages(
                token: string,
                channelID: string,
                messages: string[]
            ): Promise<void>;

            function pinMessage(
                token: string,
                channelID: string,
                messageID: string
            ): Promise<void>;

            function unpinMessage(
                token: string,
                channelID: string,
                messageID: string
            ): Promise<void>;

            function getPinnedMessages(
                token: string,
                channelID: string
            ): Promise<object[]>;

            function getReactionUsers(
                token: string,
                channelID: string,
                messageID: string,
                emoji: string,
                options: {
                    after: string,
                    before: string,
                    limit: number
                }
            ): Promise<object[]>;

            function createReaction(
                token: string,
                channelID: string,
                messageID: string,
                emoji: string
            ): Promise<void>;

            function deleteReaction(
                token: string,
                channelID: string,
                messageID: string,
                emoji: string,
                user: string
            ): Promise<void>;

            function deleteAllReactions(
                token: string,
                channelID: string,
                messageID: string
            ): Promise<void>;
        };

        namespace request {
            function request(
                method: string,
                path: string,
                token: string,
                body: string,
                reason: string
            ): Promise<any>;
        };

        namespace user {
            function user(
                userID: string
            ): string;

            function getUser(
                token: string,
                userID: string
            ): Promise<object>;

            function editSelf(
                token: string,
                options: {
                    username: string,
                    avatar: string
                }
            ): Promise<object>;
        };

        namespace webhook {
            function webhook(
                webhookID: string
            ): string;

            function tokenWebhook(
                webhookID: string,
                webhookToken: string
            ): string;

            function channelWebhooks(
                channelID: string
            ): string;

            function guildWebhooks(
                guildID: string
            ): string;

            function getWebhook(
                token: string,
                webhookID: string
            ): Promise<object>;

            function getWebhookFromToken(
                webhookID: string,
                webhookToken: string
            ): Promise<object>;

            function getChannelWebhooks(
                token: string,
                channelID: string
            ): Promise<object[]>;

            function getGuildWebhooks(
                token: string,
                guildID: string
            ): Promise<object[]>;

            function createWebhook(
                token: string,
                channelID: string,
                options: {
                    name: string,
                    avatar: string
                }
            ): Promise<object>;

            function deleteWebhook(
                token: string,
                webhookID: string
            ): Promise<void>;

            function deleteWebhookFromToken(
                webhookID: string,
                webhookToken: string
            ): Promise<void>;

            function editWebhook(
                token: string,
                webhookID: string,
                options: {
                    name: string,
                    avatar: string,
                    channel_id: string
                }): Promise<void>;

            function editWebhookFromToken(
                webhookID: string,
                webhookToken: string,
                options: {
                    name: string,
                    avatar: string,
                    channel_id: string
                }
            ): Promise<void>;

            function executeWebhook(
                token: string,
                webhookID: string,
                webhookToken: string,
                options: {
                    content: string,
                    username: string,
                    avatar_url: string,
                    tts: boolean,
                    embeds: object[]
                }
            ): Promise<void>;
        };

    }

    namespace cdn {
        const baseURL: string;

        function emoji(
            emojiID: string,
            format: string = 'png'
        ): string;

        function icon(
            guildID: string,
            guildIcon: string,
            format: string = 'png'
        ): string;

        function splash(
            guildID: string,
            guildSplash: string,
            format: string = 'png'
        ): string;

        function banner(
            guildID: string,
            guildBanner: string,
            format: string = 'png'
        ): string;

        function defaultAvatar(
            id: string,
            format: string = 'png'
        ): string;

        function avatar(
            userID: string,
            userAvatar: string,
            format: string = 'png'
        ): string;
    }

    namespace ws {
        /*
        function sendWS(
            ws: WebSocket,
            op: number,
            d: any
        ): void;
        */

        const clients: Array;

        function connect(
            token: string,
            gatewayURL: string,
            options: WebSocket.ClientOptions,
            id: string,
            shardCount: number,
            z: any
        ): WebSocket;

        function initializeShards(
            token: string,
            shardCount: number,
            options: WebSocket.ClientOptions
        ): WebSocket[];
    }
};