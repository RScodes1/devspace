const flags = {
  NEW_DASHBOARD: true,
  EXPERIMENTAL_CODE_RUN: false,
};

/**
 * Check if a feature is enabled
 */
const isFeatureEnabled = (flagName) => {
  return flags[flagName] === true;
};

module.exports = { isFeatureEnabled };
