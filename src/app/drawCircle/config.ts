
export interface Point {
  x: number;
  y: number;
}

export interface CircleResult {
  score: number;
  message: string;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  created_at: string;
}

export interface ScoreToken {
  score: number;
  token: string;
  timestamp: number;
}

export interface PeerCursor {
  id: string;
  x: number;
  y: number;
  name: string;
  color: string;
  ts: number;
}

export interface IssueTokenResponse {
  token: string;
  timestamp: number;
}

export type SocketEnvelope = {
  event?: string;
  payload?: {
    event?: string;
    payload?: unknown;
  };
};

export type SocketSendMessage = {
  topic: string;
  event: string;
  payload: unknown;
  ref: string;
};