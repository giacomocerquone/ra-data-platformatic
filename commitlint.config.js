module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 100],
    "scope-case": [2, "always", "kebab-case"],
    "scope-empty": [2, "never"],
    "scope-enum": [2, "always", ["ui", "api", "rest-dp", "gql-dp"]],
  },
};
