import { createGame } from './game/Game';

const container = document.getElementById('game');

if (!container) {
  throw new Error('Missing #game container in index.html');
}

document.title = 'Pigeon Plaza Manager';

createGame(container);