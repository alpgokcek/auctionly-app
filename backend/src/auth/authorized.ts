import { Request, Response } from "express";

export function isAuthorized(opts: { hasRole: Array<'ADMIN' | 'MODERATOR' | 'USER'>, allowSameUser?: boolean }) {
    return (req: Request, res: Response, next: Function) => {
        const { role, uid } = res.locals
        const { id } = req.params

        if (opts.allowSameUser && id && uid === id)
            return next();

        if (!role)
            return res.status(403).send();

        if (opts.hasRole.includes(role))
            return next();

        return res.status(403).send();
    }
}

export function isSuperAdmin(opts: { allowSameUser?: boolean }) {
    return (req: Request, res: Response, next: Function) => {
        const { role, uid } = res.locals
        const { id } = req.params

        if (opts.allowSameUser && id && uid === id)
            return next();

        if (!role)
            return res.status(403).send();

        if ('SUPER_ADMIN' === role)
            return next();

        return res.status(403).send();
    }
}