const { transform } = require("typescript");

module.exports = {
    transform: {
        '^.+\\.svelte$': 'svelte-test/transform',
    },
};