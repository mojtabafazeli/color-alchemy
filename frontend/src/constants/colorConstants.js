export const BLACK = 'rgb(0,0,0)';
export const RED = 'rgb(255,0,0)';
export const GREEN = 'rgb(0,255,0)';
export const BLUE = 'rgb(0,0,255)';

export const MAX_FACTOR = (r, g, b) => 255 / Math.max(r, g, b, 255);
//To have some number to start comparing;
export const INITIAL_DELTA = 100;
export const SUCCESS_SCORE = 10;