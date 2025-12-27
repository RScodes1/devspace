const flags = {
  NEW_DASHBOARD: true,
  EXPERIMENTAL_CODE_RUN: false,
};

const isFeatureEnabled = (flagName) => {
  return flags[flagName] === true;
};

module.exports = { isFeatureEnabled };
