import { HttpHandler } from '../../infrastructure/http/httpHandler';
import { HttpRequest, HttpResponse, HttpStatusCode } from '../../infrastructure/http/http';
import { DeleteOffer } from '../usecases/delete-offer/deleteOffer';
import { DeleteOfferDTO } from '../../domain/dtos/deleteOffer.dto';
import { injectable } from 'tsyringe';

@injectable()
export class DeleteOfferHandler implements HttpHandler {
  constructor(private readonly usecase: DeleteOffer) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const body = req.body as DeleteOfferDTO;
    await this.usecase.execute({
      userId: body.userId,
      offerId: body.offerId
    });
    return {
      status: HttpStatusCode.OK,
      body: 'OK'
    };
  }
}
