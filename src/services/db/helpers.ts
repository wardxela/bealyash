export interface ProfileBooster {
  booster: {
    coefficientOffset: number;
  };
}

const BOOSTER_COEFFICIENT_BASE = 100;

export function getBoosterCoefficient(profile: ProfileBooster | undefined) {
  if (!profile) {
    return BOOSTER_COEFFICIENT_BASE;
  }

  return BOOSTER_COEFFICIENT_BASE + profile.booster.coefficientOffset;
}
