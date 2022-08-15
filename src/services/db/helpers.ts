export interface ProfileWithBooster {
  userId: number;
  boosterExpirationDate: Date | null;
  booster: {
    coefficient: number;
  } | null;
}

export function getBoosterCoefficient(profile: ProfileWithBooster | undefined) {
  if (!profile || !profile.boosterExpirationDate || !profile.booster) {
    return 0;
  }
  if (profile.boosterExpirationDate < new Date()) {
    return 0;
  }
  return profile.booster.coefficient;
}
