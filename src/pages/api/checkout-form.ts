import type { NextApiRequest, NextApiResponse } from "next";
import { getCheckoutForm } from "server/pay";
import { createPayment } from "server/utils/queries";
import { CartItem, Address } from "types/cart";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as {
    cartItems: CartItem[];
    address: Address;
    email: string;
  };

  const form = await getCheckoutForm(data.cartItems, data.address);
  await createPayment(data.email, data.cartItems, form.token);
  res.status(201).json({ script: form.checkoutFormContent, form });
}
