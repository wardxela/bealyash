export interface ProfileBooster {
  booster: {
    coefficientOffset: number;
  } | null;
}

const BOOSTER_COEFFICIENT_BASE = 100;

export function getBoosterCoefficient(profile: ProfileBooster | undefined) {
  if (!profile || !profile.booster) {
    return BOOSTER_COEFFICIENT_BASE;
  }

  return BOOSTER_COEFFICIENT_BASE + profile.booster.coefficientOffset;
}
