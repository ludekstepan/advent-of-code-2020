module.exports = {
    verbose: true,
    transform: {
        '\\.txt$': 'jest-raw-loader',
        '\\.ts$': 'babel-jest',
    },
}
