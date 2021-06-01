module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    moduleDirectories: ['node_modules', 'src'],
    testMatch: [
        '**/__tests__/**/*.test.ts'
    ]
};