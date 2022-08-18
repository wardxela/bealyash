export interface ProfileBooster {
  booster: {
    value: number;
  } | null;
}

export function getBoosterValue(profile: ProfileBooster | undefined) {
  if (!profile || !profile.booster) {
    return 1;
  }

  return profile.booster.value;
}
