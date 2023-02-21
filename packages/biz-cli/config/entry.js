
let path = require('path');

function resPath(filePath) {
    return path.resolve(__dirname, '../src/', filePath);
}


module.exports = {
    'setting': {
        entry: resPath('setting/index.tsx'),
        template: resPath('views/setting.html'),
        routes: [
            '/cvhandler/page/setting/*',
            '/atsbuser/page/login'
        ]
    },
    'cv': {
        entry: resPath('cv/index.tsx'),
        template: resPath('views/cv.html'),
        routes: [
            '/cvhandler/page/candidate/*'
        ]
    },
    'interview': {
        entry: resPath('interview/index.tsx'),
        template: resPath('views/interview.html'),
        routes: [
            '/interview/page/*',
            '/interview/hr/page/*',
            '/interview/hrm/page/*'
        ]
    },
    'interview-c': {
        entry: resPath('interview-c/index.tsx'),
        template: resPath('views/interview-c.html'),
        routes: [
            '/interview-c/page/*',
            '/interview/m/page/*',
        ]
    },
    'job': {
        entry: resPath('job/index.tsx'),
        template: resPath('views/job.html'),
        routes: [
            '/newproject/page/job/*'
        ]
    },
    'home': {
        entry: resPath('home/index.tsx'),
        template: resPath('views/home.html'),
        routes: [
            '/page/home/'
        ]
    }
}
