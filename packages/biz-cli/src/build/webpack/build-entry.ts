
import entries from '../../entry';

function createEntry() {
    const entry = {};
    for (const key in entries) {
        if (entries.hasOwnProperty(key)) {
            const item = entries[key];
            Object.assign(entry, {
                [key]: [item.entry],
            });
        }
    }
    return entry;
}

function getBuildEntry(project) {
    let entry;
    if (project) {
        entry = {
            [project]: entries[project].entry,
        }
    } else {
        entry = createEntry();
    }
    return entry;
}

/**
 * 根据项目编码构建 webpack 入口配置，name为空，返回全部的配置
 * @param name 项目编码
 */
export default (name?: string) => {
    return getBuildEntry(name);
}
