// Source - https://stackoverflow.com/a
// Posted by broofa, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-09, License - CC BY-SA 4.0

export function generateUUID() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16),
  );
}
