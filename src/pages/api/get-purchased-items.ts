import type { NextApiRequest, NextApiResponse } from "next";
import { getPurchasedItems } from "../../server/utils/queries";     
import { getToken } from "../../types/jwt"; 

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    
    const token = await getToken({ req, secret });
    const data = req.body as {
        email: string;
    }
    const items = await getPurchasedItems(data.email);
    res.status(200).json(items);
//   const data = req.body as {
//     cartItems: CartItem[];
//     address: Address;
//     email: string;
//   };

//   const form = await getCheckoutForm(data.cartItems, data.address);
//   await createPayment(data.email, data.cartItems, form.token);
//   res.status(201).json({ script: form.checkoutFormContent, form });
}