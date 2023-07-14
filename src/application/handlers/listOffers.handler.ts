import { HttpHandler } from '../../infrastructure/http/httpHandler';
import { HttpRequest, HttpResponse, HttpStatusCode } from '../../infrastructure/http/http';
import { ListOffers } from '../usecases/list-offers/listOffers';
import { injectable } from 'tsyringe';

@injectable()
export class ListOfferHandler implements HttpHandler {
  constructor(private readonly usecase: ListOffers) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const offers = await this.usecase.execute({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    });
    return {
      status: HttpStatusCode.OK,
      body: offers
    };
  }
}
