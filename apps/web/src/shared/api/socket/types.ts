/**
 * Результат выполнения запроса через Socket.io Acknowledgment callback
 */
export type AckResponse<T = void> =
  { success: true; data: T } | { success: false; error: { code: string; message: string } };

/**
 * Доменная модель полезной нагрузки сообщения через сокет
 */
export interface SocketMessagePayload {
  id: string;
  channelId: string | null;
  conversationId: string | null;
  senderId: string;
  parentMessageId: string | null;
  content: string;
  clientGeneratedId?: string;
  clientMessageId?: string;
  editedAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  sender?: {
    id: string;
    username: string;
    avatarUrl?: string | null;
  };
}

/**
 * Доменная модель полезной нагрузки реакции на сообщение
 */
export interface SocketReactionPayload {
  id: string;
  messageId: string;
  userId: string;
  emoji: string;
  createdAt: string;
  action: 'added' | 'removed';
}

/**
 * Полезная нагрузка индикатора набора текста
 */
export interface TypingPayload {
  targetId: string; // channel_id или conversation_id
  targetType: 'channel' | 'conversation';
  userId: string;
  username: string;
  isTyping: boolean;
}

/**
 * Полезная нагрузка статуса присутствия пользователя (Presence)
 */
export interface PresencePayload {
  userId: string;
  status: 'online' | 'offline';
  lastSeenAt?: string;
}

/**
 * Строгие контракты событий от сервера к клиенту (ServerToClientEvents)
 */
export interface ServerToClientEvents {
  'message:new': (payload: SocketMessagePayload) => void;
  'message:updated': (payload: SocketMessagePayload) => void;
  'message:deleted': (payload: {
    messageId: string;
    channelId?: string | null;
    conversationId?: string | null;
  }) => void;
  'reaction:toggled': (payload: SocketReactionPayload) => void;
  'typing:update': (payload: TypingPayload) => void;
  'presence:update': (payload: PresencePayload) => void;
  'access:revoked': (payload: {
    targetId: string;
    targetType: 'channel' | 'conversation';
    reason?: string;
  }) => void;
}

/**
 * Строгие контракты событий от клиента к серверу (ClientToServerEvents)
 */
export interface ClientToServerEvents {
  'channel:join': (payload: { channelId: string }, callback?: (ack: AckResponse) => void) => void;
  'channel:leave': (payload: { channelId: string }, callback?: (ack: AckResponse) => void) => void;
  'conversation:join': (
    payload: { conversationId: string },
    callback?: (ack: AckResponse) => void,
  ) => void;
  'conversation:leave': (
    payload: { conversationId: string },
    callback?: (ack: AckResponse) => void,
  ) => void;
  'message:send': (
    payload: {
      content: string;
      channelId?: string | null;
      conversationId?: string | null;
      parentMessageId?: string | null;
      clientGeneratedId: string;
      clientMessageId?: string;
    },
    callback?: (ack: AckResponse<SocketMessagePayload>) => void,
  ) => void;
  'typing:start': (payload: { targetId: string; targetType: 'channel' | 'conversation' }) => void;
  'typing:stop': (payload: { targetId: string; targetType: 'channel' | 'conversation' }) => void;
  'message:read': (
    payload: {
      messageId: string;
      channelId?: string | null;
      conversationId?: string | null;
    },
    callback?: (ack: AckResponse) => void,
  ) => void;
}
