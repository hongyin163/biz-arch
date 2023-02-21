'use strict';
import { basename } from 'path';
import { Router } from 'express';
let router = Router();

export default function createRouter(entries) {
    for (const key in entries) {
        let item = entries[key];
        let routes = item.routes;
        let viewPath = item.template;
        let viewName = basename(viewPath,'.html');
        router.get(routes, (req, res, next) => {
            res.render(viewName);
        });
    }
    return router;
};
