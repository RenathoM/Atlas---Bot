const test = require('node:test');
const assert = require('node:assert/strict');
const { getPlayerPosition, formationPositions } = require('../src/data/database');

test('retorna a posição da formação 4-3-3 para o índice informado', () => {
  assert.equal(getPlayerPosition({}, 0), 'LW');
  assert.equal(getPlayerPosition({}, 2), 'RW');
  assert.equal(getPlayerPosition({}, 5), 'RM');
  assert.equal(getPlayerPosition({}, 10), 'GK');
  assert.equal(getPlayerPosition({}, 11), 'LW');
});

test('preserva a posição informada no objeto do jogador', () => {
  assert.equal(getPlayerPosition({ position: 'CB' }, 0), 'CB');
});

test('expõe as posições da formação 4-3-3', () => {
  assert.deepEqual(formationPositions, ['LW', 'ST', 'RW', 'LM', 'CM', 'RM', 'LB', 'CB', 'CB', 'RB', 'GK']);
});
