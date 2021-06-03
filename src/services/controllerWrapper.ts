import { Request, Response, NextFunction } from 'express';

type ControllerMethod = (req: Request, res: Response) => Promise<any>;

export default (controllerMethod: ControllerMethod) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controllerMethod(req, res);
        } catch (error) {
            next(error);
        }
    };
};