import { turnLeft, turnRight, moveRobot, isOffGrid, processInstructions, type RobotPos } from './robots';
import { describe, test, expect } from 'vitest';

describe('robot helpers', () => {
  test('turnLeft rotates correctly', () => {
    expect(turnLeft('N')).toBe('W');
  });

  test('turnRight rotates correctly', () => {
    expect(turnRight('N')).toBe('E');
  });

  test('moveRobot moves forward in correct direction', () => {
    expect(moveRobot({ x: 1, y: 1, dir: 'N' })).toEqual({
      x: 1,
      y: 2,
      dir: 'N',
    });
  });

  test('isOffGrid detects positions outside grid', () => {
    const grid = { minX: 0, minY: 0, maxX: 5, maxY: 3 };

    expect(isOffGrid({ x: 6, y: 3, dir: 'E' }, grid)).toBe(true);
  });

  test('processInstructions returns final position for simple input', () => {
    const grid = { minX: 0, minY: 0, maxX: 5, maxY: 3 };
    const start = { x: 1, y: 1, dir: 'E' };
    const instructions = 'RFRFRFRF'.split('');

    expect(processInstructions(grid, start as RobotPos, instructions)).toBe('1 1 E');
  });
});
