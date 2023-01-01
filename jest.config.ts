const config = {
  testEnvironment: "node",

  moduleFileExtensions: ["json", "js", "ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

export default { ...config };
