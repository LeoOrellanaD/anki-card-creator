export function isDev(): boolean {
  return process.env.NODE_ENV === 'development' || process.env.ELECTRON_IS_DEV === 'true';
}