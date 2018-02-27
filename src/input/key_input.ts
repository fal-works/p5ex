/**
 * Holds a boolean value for each key which indicates if the key is currently down.
 */
export const keyDown = new Map<string, boolean>();

/**
 * Begins to listen key events. Default behaviors for arrow keys will be prevented.
 */
export function listenKey() {
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    keyDown.set(event.key, true);
    keyDown.set(event.code, true);

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'ArrowRight':
        return false;
      default:
        return;
    }
  });

  window.addEventListener('keyup', (event: KeyboardEvent) => {
    keyDown.set(event.key, false);
    keyDown.set(event.code, false);

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'ArrowRight':
        return false;
      default:
        return;
    }
  });
}

