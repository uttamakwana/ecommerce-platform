export interface IProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface IProductReview {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

export interface IProductMeta {
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  qrCode: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: IProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IProductMeta;
  images: string[];
  thumbnail: string;
}

export interface IProductCategory {
  slug: string;
  name: string;
  url: string;
}

export interface IProductListingResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}

export interface IProductListingQueryArgs {
  limit?: number;
  skip?: number;
  sortBy?: keyof IProduct;
  order?: "asc" | "desc";
  category?: IProductCategory["slug"];
  search?: string;
}
