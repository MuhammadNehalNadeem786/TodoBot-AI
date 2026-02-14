/** Chat types. Data from conversations + messages tables. */

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequest {
  message: string;
  conversation_id: number | null;
}

export interface ChatResponse {
  conversation_id: number;
  response: string;
  tool_calls?: unknown[];
}

/** Conversation from GET /api/{userId}/conversations */
export interface Conversation {
  id: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

/** Message from GET /api/{userId}/conversations/:id/messages */
export interface MessageFromApi {
  id: number;
  role: string;
  content: string;
  created_at: string;
}
