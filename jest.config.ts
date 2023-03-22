export default {
	clearMocks: true,
	collectCoverage: false,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	moduleDirectories: ["node_modules"],
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/*.spec.ts"],
	transform: {
		".+\\.ts$": "ts-jest",
	},
	moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "@test/(.*)": "<rootDir>/tests/$1",
  },
};