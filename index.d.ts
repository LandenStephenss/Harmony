declare module 'harmony' {
  import * as WebSocket from 'ws';
  export const request: (method: string, path: string, token?: string, body?: object) => Promise<object>;
  export const rest: {
    createMessage: (token: string, channelID: string, data: {
      content?: string,
      embed?: object,
      nonce?: string,
      tts?: boolean
    }) => Promise<object>,
    getBotGateway: (token: string) => Promise<object>,
    getGateway: () => Promise<object>
  };
  export const write: (msg: string, type: number) => boolean;
  export const ws: {
    connect: (token: string, shardCount?: number, client?: object) => Promise<object>,
    createClient: (token: string, count?: number, addMethods?: boolean) => object,
    createShard: (id: number, ws: WebSocket) => object,
    identifyShard: (token: string, client: object, shard: { ws: WebSocket }) => void,
    sendWS: (ws: WebSocket, op: number, d: object) => void,
    spawnShard: (token: string, client: object, url: string, id: number) => object,
    updateStatus: (shard: object, data: {
      game?: {
        name: string,
        type: number
      },
      status?: string
    }) => void
  };
}