module.exports = {
  extends: [
    require.resolve('@umijs/fabric/dist/eslint'),
    'eslint:recommended',
    'plugin:react/recommended',
    'react-hooks',
  ],

  // in antd-design-pro
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },

  rules: {
    // your rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
