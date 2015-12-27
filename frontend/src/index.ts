/// <reference path="../typings/tsd.d.ts" />

import {ClientMessageType, GameObjectType, PlayerState, ChangeStateMsg} from 'common/Protocol'
import {EventEmitter, EventListener} from 'common/Event'
import {CONNECTION_PORT} from 'common/Config'

import {GameConnection} from './GameConnection'

const connection = new GameConnection('42')
connection.connectedEvent.on(() => {
  connection.send({
    type: ClientMessageType.HelloMsg,
    payload: {
      nickname: 'Deda',
      gameId: connection.gameId
    }
  })
})

const VIEWPORT_WIDTH = 600
const VIEWPORT_HEIGHT = 400

function createCanvas(): CanvasRenderingContext2D {
  const canvas = document.createElement('canvas')
  const wrapper = document.querySelector('.wrapper')
  canvas.width = VIEWPORT_WIDTH
  canvas.height = VIEWPORT_HEIGHT
  wrapper.appendChild(canvas)
  return canvas.getContext('2d')
}

const context = createCanvas()

connection.syncEvent.on(sync => {
  context.clearRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT)
  context.beginPath()
  sync.objects.forEach(({type, state}) => {
    if (type === GameObjectType.Player) {
      const {position: {x, y}} = state as PlayerState
      context.rect(x, y, 25, 25)
      context.fillStyle = 'rgb(57, 164, 119)'
      context.fill()
    }
  })
  context.closePath();
})

const enum KeyCode {
  ArrowUp = 38,
  ArrowDown = 40,
  ArrowLeft = 37,
  ArrowRight = 39,
  Space = 32
}

const playerState: ChangeStateMsg = {
  left: false,
  right: false,
  jump: false,
  fall: false
}

function update() {
  connection.send({
    type: ClientMessageType.ChangeStateMsg,
    payload: playerState
  })
}

document.body.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.keyCode === KeyCode.ArrowLeft) {
    playerState.left = true
    update()
  }
  else if (event.keyCode === KeyCode.ArrowRight) {
    playerState.right = true
    update()
  }
  else if (event.keyCode === KeyCode.ArrowUp) {
    playerState.jump = true
    update()
  }
  else if (event.keyCode === KeyCode.ArrowDown) {
    playerState.fall = true
    update()
  }
})

document.body.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.keyCode === KeyCode.ArrowLeft) {
    playerState.left = false
    update()
  }
  else if (event.keyCode === KeyCode.ArrowRight) {
    playerState.right = false
    update()
  }
  else if (event.keyCode === KeyCode.ArrowUp) {
    playerState.jump = false
    update()
  }
  else if (event.keyCode === KeyCode.ArrowDown) {
    playerState.fall = false
    update()
  }
})
