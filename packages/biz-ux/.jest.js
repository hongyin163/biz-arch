// const libDir = process.env.LIB_DIR;

// const transformIgnorePatterns = [
//   '/dist/',
//   'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
// ];

module.exports = {
    //   verbose: true,
    setupFiles: ['./tests/setup.js'],
    //   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'md'],
    //   modulePathIgnorePatterns: ['/_site/'],
    //   testPathIgnorePatterns: ['/node_modules/', 'dekko', 'node'],
    //   transform: {
    //     '\\.tsx?$': './node_modules/antd-tools/lib/jest/codePreprocessor',
    //     '\\.js$': './node_modules/antd-tools/lib/jest/codePreprocessor',
    //     '\\.md$': './node_modules/antd-tools/lib/jest/demoPreprocessor',
    //   },
    //   testRegex: `${libDir === 'dist' ? 'demo' : '.*'}\\.test\\.js$`,
    //   collectCoverageFrom: [
    //     'components/**/*.{ts,tsx}',
    //     '!components/*/style/index.tsx',
    //     '!components/style/index.tsx',
    //     '!components/*/locale/index.tsx',
    //     '!components/*/__tests__/**/type.tsx',
    //     '!components/**/*/interface.{ts,tsx}',
    //   ],
    //   transformIgnorePatterns,
    //   snapshotSerializers: ['enzyme-to-json/serializer'],
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.test.json',
        },
    },
    //   testURL: 'http://localhost',
};
