import { Router } from 'express';
import { HttpExpressAdapter } from './adapter/express.adapter';
import { container } from 'tsyringe';
import { CreateOfferHandler } from './handlers/createOffer.handler';
import { DeleteOfferHandler } from './handlers/deleteOffer.handler';
import { ListOfferHandler } from './handlers/listOffers.handler';
export const router = Router();

router.post('/offers/create', HttpExpressAdapter.create(container.resolve(CreateOfferHandler)));

router.delete('/offers/delete', HttpExpressAdapter.create(container.resolve(DeleteOfferHandler)));

router.get('/offers', HttpExpressAdapter.create(container.resolve(ListOfferHandler)));


