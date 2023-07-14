import { HttpRequest, HttpResponse } from './http';

export interface HttpHandler {
  handle(request: HttpRequest): Promise<HttpResponse>
}
