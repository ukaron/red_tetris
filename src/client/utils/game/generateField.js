import { getRandomInt } from "./createPull";

function getRandomSeed() {
  return getRandomInt(0, 1);
}

function getEmptySeed() {
  return 0;
}

function generateField(playFieldSize, seedCallback) {
  return Array.from({ length: playFieldSize.height }).map(() =>
    Array.from({ length: playFieldSize.width }).map(() => seedCallback()));
}

export function generateRandomField(playFieldSize) {
  return generateField(playFieldSize, getRandomSeed);
}

export function generateEmptyField(playFieldSize) {
  return generateField(playFieldSize, getEmptySeed);
}
