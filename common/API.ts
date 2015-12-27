// websocket endpoint for game connection
export const GAME_ENDPOINT = '/game'

// get maps list
export const MAPS_METHOD = '/maps'

export interface MapInfo {
  id: string;
  title: string;
  hash: string;
}

export interface MapsReq {}

export interface MapsRes {
  maps: MapInfo[];
}

// load map data
export const MAP_METHOD = '/map'

export interface MapReq {
  id: string;
}

export interface MapRes {
  id: string;
}

// get active games list
export const GAMES_METHOD = '/games'

export interface GameInfo {
  players: number;
  capacity: number;
  map: MapInfo;
}

export interface GamesReq {}

export interface GamesRes {
  games: GameInfo[];
}