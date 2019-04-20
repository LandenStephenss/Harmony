/**
 * Type definitions for Apacheli/Harmony discord lib, by o_Hinoki.
 */

export as namespace Harmony;


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


export namespace rest {
    export namespace channel {
        export function channel(
            channelID: string
        ): string;

        export function guildChannels(
            guildID: string
        ): string;

        export function permission(
            channelID: string, 
            overwriteID: string
        ): string;

        export function typings(
            channelID: string
        ): string;

        export function getChannel(
            token: string, 
            channelID: string
        ): Promise;

        export function getChannels(
            token: string, 
            guildID: string
        ): Promise;

        export function createChannel(
            token: string, 
            guildID: string, 
            options: ChannelOptions
        ): Promise;

        export function createPrivateChannel(
            token: string,
            userID: string
        ): Promise;

        export function editChannel(
            token: string,
            channelID: string,
            options: ChannelOptions
        ): Promise;

        export function editChannelPositions(
            token: string,
            guildID: string,
            channel: {
                id: string,
                position: number
            }
        ): Promise<void>;

        export function deleteChannel(
            token: string,
            channelID: string
        ): Promise;

        export function editOverwrite(
            token: string, 
            channelID: string, 
            overwriteID: string, 
            options: {
                allow: number,
                deny: number,
                type: string
            }
        )

        export function deleteOverwrite(
            token: string, 
            channelID: string, 
            overwrite: stringID
        )

        export function triggerTypingIndicator(
            token: string,
            channelID: string
        )
    };
    
    export namespace gateway {
        export function getGateway(): Promise;

        export function getBotGateway(
            token: string
        ): Promise; 
    };
    
    export namespace guild {
        export function guild(
            guildID: string
        ): string;

        export function meGuild(
            guildID: string
        ): string;

        export function ban(
            guildID: string, 
            userID: string
        ): string;

        export function bans(
            guildID: string
        ): string;

        export function member(
            guildID: string, 
            userID: string
        ): string;

        export function members(
            guildID: string
        ): string;

        export function memberRole(
            guildID: string, 
            userID: string, 
            roleID: string
        ): string;

        export function prune(
            guildID: string
        ): string;

        export function role(
            guildID: string, 
            roleID: string
        ): string;

        export function roles(
            guildID: string
        ): string;

        export function regions(
            guildID: string
        ): string;

        export function integration(
            guildID: string, 
            integrationID: string
        ): string;

        export function integrations(
            guildID: string
        ): string;

        export function sync(
            guildID: string
        ): string;

        export function vanity(
            guildID: string
        ): string;

        export function embed(
            guildID: string
        ): string;

        export function auditLogs(
            guildID: string
        ): string;

        export function emoji(
            guildID: string, 
            emojiID: string
        ): string;

        export function emojis(
            guildID: string
        ): string;

        export function getGuild(
            token: string, 
            guildID: string
        ): Promise<object>;

        export function createGuild(
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

        export function editGuild(
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

        export function deleteGuild(
            token: string, 
            guildID: string
        ): Promise<void>;

        export function leaveGuild(
            token: string, 
            guildID: string
        ): Promise<void>;

        export function getBan(
            token: string, 
            guildID: string, 
            userID: string
        ): Promise<Object>;

        export function getBans(
            token: string, 
            guildID: string
        ): Promise<Object[]>;

        export function getMember(
            token: string, 
            guildID: string, 
            userID: string
        ): Promise<Object>;

        export function getMembers(
            token: string, 
            guildID: string, 
            options: {
                limit: number, 
                after: string
            }
        ): Promise<Object[]>;

        export function editMember(
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

        export function addMemberRole(
            token: string, 
            guildID: string, 
            userID: string, 
            roleID: string
        ): Promise;

        export function removeMemberRole(
            token: string, 
            guildID: string, 
            userID: string, 
            roleID: string
        ): Promise;

        export function kickMember(
            token: string, 
            guildID: string, 
            userID: string
        ): Promise;

        export function banMember(
            token: string, 
            guildID: string, 
            userID: string, 
            days = null
        ): Promise;

        export function unbanMember(
            token: string, 
            guildID: string, 
            userID: string
        ): Promise;

        export function getPruneCount(
            token: string, 
            guildID: string, 
            option: { 
                days: number 
            }
        ): Promise;

        export function pruneMembers(
            token: string, 
            guildID, 
            options: {
                days: number
                compute_prune_count: boolean
            }
        ): Promise<void>;

        export function getRoles(
            token: string, 
            guildID: string
        ): Promise;

        export function createRole(
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

        export function deleteRole(
            token: string, 
            guildID: string, 
            roleID: string
        ): Promise<void>;

        export function editRole(
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

        export function editRolePositions(
            token: string, 
            guildID: string, 
            roles): Promise<object[]>;

        export function getVoiceRegions(
            token: string, 
            guildID: string): Promise<string[]>;

        export function getIntegrations(
            token: string, 
            guildID: string): Promise<object[]>;

        export function createIntegration(
            token: string, 
            guildID: string, 
            options: {
                type: string,
                id: string
            }
        ): Promise<void>;

        export function deleteIntegration(
            token: string, 
            guildID: string, 
            integrationID: string
        ): Promise<void>;

        export function editIntegration(
            token: string, 
            guildID: string, 
            integrationID: string, 
            options: {
                expire_behaviour: number,
                expire_grace_period: number,
                enable_emoticons: boolean
            }
        ): Promise<void>

        export function syncIntegration(
            token: string, 
            guildID: string
        ): Promise<void>;

        export function getEmbed(
            token: string, 
            guildID: string
        ): Promise<object>;

        export function editEmbed(
            token: string, 
            guildID: string, 
            options
        ): Promise<object>;

        export function getVanityURL(
            token: string, 
            guildID: string
        ): Promise<object>;

        export function getAuditLogs(
            token: string, 
            guildID: string, 
            options: {
                user_id: string,
                action: number,
                before: string,
                limit: number
            }
        ): Promise<object>;
        
        export function getEmoji(
            token: string, 
            guildID: string, 
            emojiID: string
        ): Promise<object>;

        export function getEmojis(
            token: string, 
            guildID: string
        ): Promise<object[]>;

        export function createEmoji(
            token: string, 
            guildID: string, 
            options
        ): Promise<object>;

        export function editEmoji(
            token: string, 
            guildID: string, 
            emojiID: string, 
            options
        ): Promise<object>;

        export function deleteEmoji(
            token: string, 
            guildID: string, 
            emojiID: string
        ): Promise<void>;
    };
    
    export namespace invite {
        export function getInvite(
            token: string, 
            inviteCode: string, 
            options
        ): Promise<object>;

        export function getChannelInvites(
            token: string, 
            channelID: string
        ): Promise<object[]>;

        export function getGuildInvites(
            token: string, 
            guildID: string
        ): Promise<object[]>;

        export function createInvite(
            token: string, 
            channelID: string, 
            options: {
                max_age: number,
                max_uses: number,
                temporary: boolean,
                unique: boolean
            }
        ): Promise;

        export function deleteInvite(
            token: string, 
            inviteCode: string
        ): Promise<void>;
    };
    
    export namespace message {
        export function message(channelID, messageID): string;

        export function messages(channelID): string;

        export function bulkDelete(channelID): string;

        export function pin(channelID, messageID): string;

        export function pins(channelID): string;

        export function reaction(channelID, messageID, emoji): string;

        export function reactions(channelID, messageID): string;

        export function userReaction(channelID, messageID, emoji, user = '@me'): string;

        export function getMessage(token, channelID, messageID): Promise<object>;

        export function getMessages(
            token, 
            channelID, 
            options: {
                after: string,
                before: string,
                around: string,
                limit: number
            }
        ): Promise<object[]>;

        export function createMessage(
            token: string, 
            channelID: string, 
            options: {
                content: string,
                embed: object,
                nonce: string,
                tts: boolean
            }
        ): Promise<object>;

        export function editMessage(
            token: string, 
            channelID: string, 
            messageID: string, 
            options: {
                content: string,
                embed: object
            }
        ): Promise<object>;

        export function deleteMessage(
            token: string, 
            channelID: string, 
            messageID: string
        ): Promise<void>;

        export function bulkDeleteMessages(
            token: string, 
            channelID: string, 
            messages: string[]
        ): Promise<void>;

        export function pinMessage(
            token: string, 
            channelID: string, 
            messageID: string
        ): Promise<void>;

        export function unpinMessage(
            token: string, 
            channelID: string, 
            messageID: string
        ): Promise<void>;

        export function getPinnedMessages(
            token: string, 
            channelID: string
        ): Promise<object[]>;

        export function getReactionUsers(
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

        export function createReaction(
            token: string, 
            channelID: string, 
            messageID: string, 
            emoji: string
        ): Promise<void>;

        export function deleteReaction(
            token: string, 
            channelID: string, 
            messageID: string, 
            emoji: string, 
            user: string
        ): Promise<void>;

        export function deleteAllReactions(
            token: string, 
            channelID: string, 
            messageID: string
        ): Promise<void>;
    };
    
    export namespace request {
        export function request(
            method: string, 
            path: string, 
            token: string, 
            body: string, 
            reason: string
        ): Promise<any>;
    };
    
    export namespace user {
        export function user(
            userID: string
        ): string;

        export function getUser(
            token: string, 
            userID: string
        ): Promise<object>;

        export function editSelf(
            token: string, 
            options: {
                username: string,
                avatar: string
            }
        ): Promise<object>;
    };
    
    export namespace webhook {
        export function webhook(
            webhookID: string
        ): string;

        export function tokenWebhook(
            webhookID: string, 
            webhookToken: string
        ): string;

        export function channelWebhooks(
            channelID: string
        ): string;

        export function guildWebhooks(
            guildID: string
        ): string;

        export function getWebhook(
            token: string, 
            webhookID: string
        ): Promise<object>;

        export function getWebhookFromToken(
            webhookID: string, 
            webhookToken: string
        ): Promise<object>;

        export function getChannelWebhooks(
            token: string, 
            channelID: string
        ): Promise<object[]>;

        export function getGuildWebhooks(
            token: string,
            guildID: string
        ): Promise<object[]>;

        export function createWebhook(
            token: string, 
            channelID: string, 
            options: {
                name: string,
                avatar: string
            }
        ): Promise<object>;

        export function deleteWebhook(
            token: string, 
            webhookID: string
        ): Promise<void>;

        export function deleteWebhookFromToken(
            webhookID: string, 
            webhookToken: string
        ): Promise<void>;
        
        export function editWebhook(
            token: string, 
            webhookID: string, 
            options: {
                name: string,
                avatar: string,
                channel_id: string
            }): Promise<void>;

        export function editWebhookFromToken(
            webhookID: string, 
            webhookToken: string, 
            options: {
                name: string,
                avatar: string,
                channel_id: string
            }
        ): Promise<void>;

        export function executeWebhook(
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

export namespace cdn {
    export const baseURL: string;

    export function emoji(
        emojiID: string, 
        format: string = 'png'
    ): string;

    export function icon(
        guildID: string,
        guildIcon: string,
        format: string = 'png'
    ): string;

    export function splash(
        guildID: string, 
        guildSplash: string, 
        format: string = 'png'
    ): string;

    export function banner(
        guildID: string, 
        guildBanner: string, 
        format: string = 'png'
    ): string;

    export function defaultAvatar(
        id: string,
        format: string = 'png'
    ): string;

    export function avatar(
        userID: string, 
        userAvatar: string, 
        format: string = 'png'
    ): string;
}

export namespace ws {
    /*
    export function sendWS(
        ws: WebSocket,
        op: number,
        d: any
    ): void;
    */

    export const clients = [];

    export function connect(
        token: string, 
        gatewayURL: string, 
        options: WebSocket.ClientOptions, 
        id: string, 
        shardCount: number, 
        z: any
    ): WebSocket;

    export function initializeShards(
        token: string,
        shardCount: number, 
        options: WebSocket.ClientOptions   
    ): WebSocket[];
}