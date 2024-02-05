import axios, { AxiosResponse } from 'axios'
import { Payment, ProductsResponse } from '../Types/Product'

export class ProductHttpService {
  public static async getProducts(): Promise<ProductsResponse> {
    const response = await axios.get<ProductsResponse>(
      'https://c8036bd8-ea01-4f47-9ff1-dbf8001a0500.mock.pstmn.io/products',
      {
        data: JSON.stringify({ requestId: '12344556' }),
      },
    )
    return response.data
  }

  public static async buyProducts(checkout: Payment): Promise<AxiosResponse> {

    const response = await axios.post<Payment>(
      'https://c8036bd8-ea01-4f47-9ff1-dbf8001a0500.mock.pstmn.io/pay',
      {data : JSON.stringify(checkout)}
    )
    

    return response
  }
}
