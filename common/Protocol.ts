export interface Vec2d {
  x: number;
  y: number;
}

export interface BaseGameObjectState {
  id: string;
  position: Vec2d;
  orientation: Vec2d;
}

export interface PlayerState extends BaseGameObjectState {
  left: boolean;
  right: boolean;
  jump: boolean;
}

export type GameObjectState = PlayerState

export enum GameObjectType {
  Player
}

export interface GameObjectDescription {
  type: GameObjectType;
  state: GameObjectState;
}

// Server messages
export enum ServerMessageType {
  SyncMsg = 100,
  GameEnterMsg
}

export interface SyncMsg {
  timestamp: number;
  objects: GameObjectDescription[];
}

export interface GameEnterMsg extends SyncMsg {
  playerId: string;
}

export type ServerMessage = SyncMsg | GameEnterMsg

export interface ServerMessageContainer {
  type: ServerMessageType;
  payload: ServerMessage;
}

// Client messages

export enum ClientMessageType {
  HelloMsg = 200,
  ChangeStateMsg
}

export interface HelloMsg {
  nickname: string;
  gameId: string;
}

export interface ChangeStateMsg {
  left: boolean;
  right: boolean;
  jump: boolean;
  fall: boolean;
}

export type ClientMessage = HelloMsg | ChangeStateMsg

export interface ClientMessageContainer {
  type: ClientMessageType;
  payload: ClientMessage;
}