export interface IProductDimensions {
    width: number;
    height: number;
    depth: number;
}

export interface IProductReview {
    rating: number;
    comment: string;
    // DummyJSON serializes these as ISO strings, not Date objects.
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface IProductMeta {
    createdAt: string;
    updatedAt: string;
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
    tags: string[],
    brand: string;
    sku: string;
    weight: number;
    dimensions: IProductDimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: IProductReview[],
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: IProductMeta,
    images: string[],
    thumbnail: string;
}

export interface IProductCategory {
    slug: string;
    name: string;
    url: string;
}

export interface IProductListingResponse {
    total: number;
    limit: number;
    skip: number;
    products: IProduct[];
}

export type TCartItem = IProduct & { quantity: number };

export interface IProductListingQueryArgs { limit?: number; skip?: number; sortBy?: keyof IProduct, order?: "asc" | "desc"; search?: string; category?: IProductCategory["slug"] }

/** Shipping/contact details captured during checkout. */
export interface IShippingDetails {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

/** Payment details captured during checkout (never persisted in full). */
export interface IPaymentDetails {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
}

export interface IOrderLine {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
    quantity: number;
}

/** A placed order — persisted locally to power the confirmation screen. */
export interface IOrder {
    id: string;
    createdAt: string;
    items: IOrderLine[];
    shipping: IShippingDetails;
    paymentLast4: string;
    totals: {
        subtotal: number;
        discount: number;
        shipping: number;
        tax: number;
        total: number;
    };
}