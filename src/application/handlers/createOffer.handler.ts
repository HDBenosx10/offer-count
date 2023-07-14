import { CreateOffer } from '../usecases/create-offer/createOffer';
import { HttpHandler } from '../../infrastructure/http/httpHandler';
import { HttpRequest, HttpResponse, HttpStatusCode } from '../../infrastructure/http/http';
import { CreateOfferDTO } from '../../domain/dtos/createOffer.dto';
import { injectable } from 'tsyringe';

@injectable()
export class CreateOfferHandler implements HttpHandler {
  constructor(private readonly usecase: CreateOffer) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const body = req.body as CreateOfferDTO;
    const offer = await this.usecase.execute({
      userId: body.userId,
      sellerWalletId: body.sellerWalletId,
      tokenId: body.tokenId,
      amount: body.amount,
      unitPrice: body.unitPrice,
      currency: body.currency
    });
    return {
      status: HttpStatusCode.CREATED,
      body: offer
    };
  }
}
