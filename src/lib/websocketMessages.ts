export const WebSocketMessageStatus = {
  WAIT: 'wait',
  START: 'start',
  PLAY: 'play',
} as const;

export type WebSocketMessageStatus =
  (typeof WebSocketMessageStatus)[keyof typeof WebSocketMessageStatus];
