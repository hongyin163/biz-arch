
function createChunkConfig(entryName, chunkName, mods, priority) {
    const name = `${entryName}-${chunkName}`;
    return {
        [name]: {
            test: (module) => {
                return mods.some((p) => new RegExp(p).test(module.resource));
            },
            priority,
            maxInitialRequests: 5, // The default limit is too small to showcase the effect
            maxSize: 0,
            minSize: 0, // This is example is too small to create commons chunks
            chunks: (chunk) => chunk.name === entryName,
            name,
        },
    };
}

function getJsChunckGroup(entries={}) {
    const cacheGroups = {
        default: false,
    };
    Object.keys(entries).reduce((preChunk, entry) => {
        const item = entries[entry];
        const vender = {};// createVenderChunkConfig(entry);
        const split = item.split || {};
        const chunks = Object.keys(split);
        const chunkObj = chunks.reduce((pre, name, i) => {
            const mods = split[name];
            return Object.assign(pre, createChunkConfig(entry, name, mods, 100 - i));
        }, vender);

        return Object.assign(preChunk, chunkObj);
    }, cacheGroups);

    return cacheGroups;
}

export function getSplicChunkConfig(entries) {
    const defaultConfig = {
        default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
        },
        // 打包重复出现的代码
        vendor: {
            test: /[\\/]node_modules[\\/]/,
            maxInitialRequests: 3,
            maxAsyncRequests: 3,
            minSize: 30000,
            maxSize: 500000,
            chunks: 'async',
            name: 'vendor',
        },
    };

    const customChunkConfig = getJsChunckGroup(entries);

    const cacheGroups = Object.assign(defaultConfig, customChunkConfig);

    const splitChunks = {
        cacheGroups,
    };
    return splitChunks;
}
