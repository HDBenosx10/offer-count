import express from 'express';
import { HttpHandler } from '../../infrastructure/http/httpHandler';
import { DomainValidationError } from '../../domain/errors/domainValidation.error';

export class HttpExpressAdapter {
  static create(handler: HttpHandler) {
    return async (req: express.Request, res: express.Response) => {
      try {
        const body = req.body;
        const response = await handler.handle({
          params: req.params,
          body,
          query: req.query,
        });
        return res.status(response.status).json(response.body);
      } catch (error) {
        if (error instanceof DomainValidationError) {
          return res.status(400).json({
            message: error.message,
          });
        }

        return res.status(500).json({
          message:
            process.env.NODE_ENV === 'production'
              ? 'Internal Server Error'
              : (error as Error).message,
        });
      }
    };
  }
}
