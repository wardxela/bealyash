export function isValidSecretKey(secret: string) {
  return secret === process.env.SECRET_KEY;
}
