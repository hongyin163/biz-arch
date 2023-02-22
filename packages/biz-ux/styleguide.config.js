const path = require('path');
const fs = require('fs');
const pkg = require('./package.json');
const webpackConfig = require('./build/webpack.styleguide');

module.exports = {
    title: `BizUX v${pkg.version}`,
    require: [
        // path.join(__dirname, 'dist/biz-ux.css'),
        path.join(__dirname, 'static/style/doc.css'),
    ],
    webpackConfig: webpackConfig,
    ignore: [
        '**/_util/**',
        '**/_common/**',
        '**/style/**',
        '**/__tests__/**',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/*.spec.{js,jsx,ts,tsx}',
        '**/*.d.ts',
        'template/**/*'
    ],
    // propsParser: require('react-docgen-typescript').parse,
    propsParser: require('react-docgen-typescript').withDefaultConfig({
        savePropValueAsString: true,
    }).parse,
    components: 'components/*/index.tsx',
    assetsDir: 'static',
    ribbon: {
        // Link to open on the ribbon click (required)
        url: '',
        // Text to show on the ribbon (optional)
        text: 'Fork me on igit'
    },
    usageMode: 'expand',
    pagePerSection: process.env.NODE_ENV === 'production',
    sections: [
        {
            name: 'BizUX 介绍',
            content: 'docs/introduction.md',
        },
        {
            name: '快速上手',
            content: 'docs/guide.md'
        },
        {
            name: '组件库',
            content: 'docs/ui.md',
            components: 'components/*/index.tsx',
            exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
            usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },
        {
            name: '开发规范',
            sections: [
                {
                    name: '组件开发规范',
                    content: 'docs/dev-spec.md',
                    description: ''
                },
                // {
                //     name: '组件单测规范',
                //     content: 'docs/test-spec.md',
                //     description: ''
                // },
                // {
                //     name: '文档书写规范',
                //     content: 'docs/doc-spec.md',
                //     description: ''
                // }
            ]
        },
        {
            name: '技术文章',
            sections: [
                {
                    name: '极简的 Form 表单方案',
                    content: 'docs/tech/form.md',
                    description: ''
                },
                {
                    name: '基于 React 的滚动条方案',
                    content: 'docs/tech/scroll.md',
                    description: ''
                },
                {
                    name: '如何简化网络请求接口开发',
                    content: 'docs/tech/build-api.md',
                    description: ''
                },
                {
                    name: 'Reudx 开发简化实践',
                    content: 'docs/tech/redux.md',
                    description: ''
                },
                {
                    name: 'BixUX 组件库开发总结（一）',
                    content: 'docs/tech/ux-intro-1.md',
                    description: ''
                },
                {
                    name: 'BixUX 组件库开发总结（二）',
                    content: 'docs/tech/ux-intro-2.md',
                    description: ''
                }
            ]
        }
    ],
    updateExample(props, exampleFilePath) {
        // props.settings are passed by any fenced code block, in this case
        const { settings, lang } = props;
        // "../mySourceCode.js"
        if (typeof settings.file === 'string') {
            // "absolute path to mySourceCode.js"
            const filepath = path.resolve(exampleFilePath, settings.file);
            // displays the block as static code
            // settings.static = true
            // no longer needed
            delete settings.file;
            return {
                content: fs.readFileSync(filepath, 'utf8'),
                settings,
                lang
            };
        }
        return props;
    },
    theme: {
        color: {
            // link: '#1AB58F',
            linkHover: '#1AB58F'
        },
        fontFamily: {
            base: '-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
        },
        fontSize: {
            base: 15,
            text: 16,
            small: 14,
            h1: 30,
            h2: 24,
            h3: 18,
            h4: 16,
            h5: 14,
            h6: 12,
        }
    },
    styles: {
        // Logo: {
        //     // We're changing the LogoRenderer component
        //     logo: {
        //         // fontSize:'30px',
        //         padding:'0 16px',
        //     }
        // }
        StyleGuide: {
            sidebar: {
                width: '250px',
            }
        }
    }
};
