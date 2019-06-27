declare module 'harmony' {
  import * as EventEmitter from 'events';
  import * as WebSocket from 'ws';
  interface Activity {
    applicationID: string,
    assets: object,
    details: string,
    flags: object,
    instance: boolean,
    name: string,
    party: object,
    timestamps: object,
    type: number,
    url: string
  }
  interface CategoryChannel {
    id: string,
    guildID: string,
    name: string,
    type: number,
    permissionOverwrites: Map<string, PermissionOverwrite>,
    position: number
  }
  type Channel = CategoryChannel | GroupChannel | NewsChannel | PrivateChannel | StoreChannel | TextChannel | VoiceChannel;
  interface Client {
    emitter: EventEmitter,
    guilds: Map<string, Guild>,
    messageLimit: number,
    privateChannels: Map<string, PrivateChannel>,
    shards: Shard[],
    user: User
  }
  interface Emoji {
    animated: boolean,
    id: string,
    managed: boolean,
    name: string,
    requireColons: boolean,
    roles: string[],
    user: User
  }
  interface GroupChannel {
    applicationID: string,
    icon: string,
    id: string,
    lastMessageID: string,
    messages: Map<string, Message>,
    recipients: User[],
    type: number
  }
  interface Guild {
    afkChannelID: string,
    afkTimeout: number,
    applicationID: string,
    available: boolean,
    banner: string,
    channels: Map<string, GuildChannel>,
    defaultMessageNotifications: number,
    description: string,
    embedChannelID: string,
    embedEnabled: boolean,
    emojis: Map<string, Emoji>,
    explicitContentFilter: number,
    features: string[],
    icon: string,
    id: string,
    maxMembers: number,
    maxPresences: number,
    memberCount: number,
    members: Map<string, Member>,
    mfaLevel: number,
    name: string,
    ownerID: string,
    preferredLocale: string,
    premiumSubscriptionCount: number,
    premiumTier: number,
    region: string,
    roles: Map<string, Role>,
    shardID: number,
    splash: string,
    systemChannelFlags: number,
    systemChannelID: string,
    vanityURLCode: string,
    verificationLevel: number,
    widgetEnabled: boolean,
    widgetChannelID: string
  }
  type GuildChannel = CategoryChannel | NewsChannel | StoreChannel | TextChannel | VoiceChannel;
  interface Member {
    deaf: boolean,
    joinedAt: number,
    mute: boolean,
    nick: string,
    premiumSince: string,
    presence: Presence,
    roles: string[],
    user: User
  }
  interface Message {
    activity: object,
    application: object[],
    attachments: object[],
    author: User,
    channelID: string,
    content: string,
    editedTimestamp: string,
    embeds: object[],
    guildID: string,
    id: string,
    mentionEveryone: boolean,
    mentions: User[],
    mentionRoles: Role[],
    nonce: string,
    pinned: boolean,
    reactions: Map<string, object>,
    tts: boolean,
    type: number
  }
  interface NewsChannel {
    id: string,
    guildID: string,
    lastMessageID: string,
    messages: Map<string, Message>,
    name: string,
    nsfw: boolean,
    parentID: string,
    position: string,
    permissionOverwrites: Map<string, PermissionOverwrite>,
    topic: string,
    type: number
  }
  interface PermissionOverwrite {
    allow: number,
    deny: number,
    id: string,
    type: string
  }
  interface PrivateChannel {
    id: string,
    lastMessageID: string,
    messages: Map<string, Message>,
    recipient: User,
    type: number
  }
  interface Presence {
    activities: Activity[],
    clientStatus: object,
    game: Activity,
    status: string
  }
  interface Role {
    color: number,
    hoist: boolean,
    id: string,
    managed: boolean,
    name: string,
    mentionable: boolean,
    permissions: number,
    position: number
  }
  interface Shard {
    id: number,
    interval: object,
    seq: number,
    sessionID: string,
    ws: WebSocket
  }
  interface StoreChannel {
    id: string,
    guildID: string,
    name: string,
    parentID: string,
    position: number,
    permissionOverwrites: Map<string, PermissionOverwrite>,
    type: number
  }
  interface TextChannel {
    id: string,
    guildID: string,
    lastMessageID: string,
    messages: Map<string, Message>,
    name: string,
    nsfw: boolean,
    parentID: string,
    position: string,
    permissionOverwrites: Map<string, PermissionOverwrite>,
    rateLimitPerUser: number,
    topic: string,
    type: number
  }
  interface User {
    avatar: string,
    discriminator: string,
    id: string,
    username: string
  }
  interface VoiceChannel {
    bitrate: number,
    id: string,
    guildID: string,
    name: string,
    parentID: string,
    position: number,
    permissionOverwrites: Map<string, PermissionOverwrite>,
    type: number,
    userLimit: number
  }
  export const events: {
    channelCreate: (client: Client, data: object) => Channel[],
    channelDelete: (client: Client, data: object) => Channel[],
    channelUpdate: (client: Client, data: object) => Channel[],
    guildCreate: (client: Client, data: object) => Guild[],
    guildDelete: (client: Client, data: object) => Guild[],
    guildEmojisUpdate: (client: Client, data: object) => [Map<string, Emoji>, Guild],
    guildMemberAdd: (client: Client, data: object) => [Member, Guild],
    guildMemberRemove: (client: Client, data: object) => [Member, Guild],
    guildMemberUpdate: (client: Client, data: object) => [Member, Guild],
    guildRoleCreate: (client: Client, data: object) => [Role, Guild],
    guildRoleDelete: (client: Client, data: object) => [Role, Guild],
    guildRoleUpdate: (client: Client, data: object) => [Role, Guild],
    guildUpdate: (client: Client, data: object) => Guild[],
    messageCreate: (client: Client, data: object) => Message[],
    messageDelete: (client: Client, data: object) => Message[],
    messageUpdate: (client: Client, data: object) => Message[],
    presenceUpdate: (client: Client, data: object) => [Presence, Guild]
  };
  export const interfaces: {
    channel: {
      categoryChannel: (data: object) => CategoryChannel,
      create: (data: object) => Channel,
      groupChannel: (data: object) => GroupChannel,
      mapPermissionOverwrites: (permissionOverwrites: object[]) => Map<string, PermissionOverwrite>,
      newsChannel: (data: object) => NewsChannel,
      privateChannel: (data: object) => PrivateChannel,
      textChannel: (data: object) => TextChannel,
      update: (channel: Channel, data: object) => void,
      voiceChannel: (data: object) => VoiceChannel
    },
    emoji: {
      create: (data: object) => Emoji,
      update: (emoji: Emoji, data: object) => void
    },
    guild: {
      create: (data: object, shardID: number) => Guild,
      update: (guild: Guild, data: object) => void
    },
    member: {
      create: (data: object) => Member,
      update: (member: Number, data: object) => void
    },
    message: {
      create: (data: object, client: Client) => Message,
      getContent: (data: object, client: Client) => string,
      joinMessages: string[],
      update: (message: Message, data: object) => void
    },
    presence: {
      create: (data: object) => Presence,
      game: (data: object) => Activity,
      update: (presence: Presence, data: object) => void
    },
    role: {
      create: (data: object) => Role,
      update: (role: Role, data: object) => void
    }
  };
  export const request: (method: string, path: string, token?: string, body?: object, reason?: string) => Promise<object>;
  export const rest: {
    bulkDeleteMessages: (token: string, channelID: string, messages: string[]) => Promise<void>,
    createChannel: (token: string, guildID: string, options: object) => Promise<object>,
    createInvite: (token: string, options?: {
      max_age?: number,
      max_uses?: number,
      temporary: boolean,
      unique: boolean
    }) => Promise<object>,
    createMessage: (token: string, channelID: string, options: {
      content?: string,
      embed: object,
      nonce: string,
      tts: boolean
    }) => Promise<object>,
    createPrivateChannel: (token: string, userID: string) => Promise<object>,
    createReaction: (token: string, channelID: string, messageID: string, emoji: string) => Promise<void>,
    deleteAllReactions: (token: string, channelID: string, messageID: string) => Promise<void>,
    deleteMessage: (token: string, channelID: string, messageID: string) => Promise<object>,
    deleteChannel: (token: string, channelID: string) => Promise<void>,
    deleteReaction: (token: string, channelID: string, messageID: string, emoji: string, user?: string) => Promise<void>,
    deleteInvite: (token: string, inviteCode: string) => Promise<void>,
    deleteOverwrite: (token: string, channelID: string, overwriteID: string) => Promise<void>,
    editChannel: (token: string, channelID: string, options: object) => Promise<void>,
    editChannelPositions: (token: string, channelID: string, channels: object[]) => Promise<void>,
    editMessage: (token: string, channelID: string, messageID: string, options: {
      content?: string,
      embed?: object
    }) => Promise<object>,
    editOverwrite: (token: string, channelID: string, options: {
      allow: number,
      deny: number,
      type: string
    }) => Promise<void>,
    getBotGateway: (token: string) => Promise<object>,
    getChannel: (token: string, channelID: string) => Promise<object>,
    getChannelInvites: (token: string, channelID: string) => Promise<object[]>,
    getChannels: (token: string, guildID: string) => Promise<object[]>,
    getGateway: () => Promise<object>,
    getGuildInvites: (token: string, guildID: string) => Promise<object[]>,
    getInvite: (token: string, inviteCode: string) => Promise<object>,
    getMessage: (token: string, channelID: string, messageID: string) => Promise<object>,
    getMessages: (token: string, channelID: string, options?: {
      after?: string,
      before?: string,
      around?: string,
      limit?: number
    }) => Promise<object[]>,
    getPinnedMessages: (token: string, channelID: string) => Promise<object[]>,
    getReactionUsers: (token: string, channelID: string, emoji: string, options?: {
      after?: string,
      before?: string,
      around?: string,
      limit?: number
    }) => Promise<object[]>,
    pinMessage: (token: string, channelID: string, messageID: string) => Promise<void>,
    typeIn: (token: string, channelID: string) => Promise<void>,
    unpinMessage: (token: string, channelID: string, messageID: string) => Promise<void>
  };
  export const util: {
    id: {
      toSnowflake: (timestamp: number) => number,
      toTimestamp: (snowflake: string | number) => number
    },
    write: (msg: string, type: number) => boolean
  };
  export const version: number;
  export const ws: {
    connect: (token: string, shardCount?: number, client?: Client) => Promise<object>,
    createClient: (token: string, count?: number) => object,
    createShard: (id: number, ws: WebSocket) => Shard,
    identifyShard: (token: string, client: Client, shard: Shard) => void,
    sendWS: (ws: WebSocket, op: number, d: object) => void,
    spawnShard: (token: string, client: Client, url: string, id: number) => object,
    updateStatus: (shard: Shard, data: {
      game?: {
        name: string,
        type: number
      },
      status?: string
    }) => void
  };
}
