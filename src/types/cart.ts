export type CartItem = {
    id: number;
    name: string;
    price: number;
    currency: "$" | "€" | "₺";
    type: "education" | "blog";
}

export type Address = {
    country: string,
    city: string,
    addressLine: string,
    postalCode: string
}