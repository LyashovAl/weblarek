import {
    IApi,
    IProductListResponse,
    IOrderRequest,
    IOrderResponse
} from '../types';

export class LarekApi {
  constructor(protected api: IApi) {
}
getProductList(): Promise<IProductListResponse> {
    return this.api.get<IProductListResponse>('/product/');
}
order(order: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>('/order', order);
}
}