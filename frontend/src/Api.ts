import {
  MAPS_METHOD, MapsRes,
  GAMES_METHOD, GamesRes,
  MAP_METHOD, MapReq, MapRes
} from 'common/API'

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw new Error(response.statusText)
  }
}

export function maps(): Promise<MapsRes> {
  return fetch(MAPS_METHOD)
    .then(checkStatus)
    .then(resp => resp.json())
}

export function games(): Promise<MapsRes> {
  return fetch(GAMES_METHOD)
    .then(checkStatus)
    .then(resp => resp.json())
}

export function map(id: string): Promise<MapRes> {
  const req: MapReq = { id }
  return fetch(MAP_METHOD, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    })
    .then(checkStatus)
    .then(resp => resp.json())
}
