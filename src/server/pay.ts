import Iyzipay, { ThreeDSInitializePaymentRequestData } from "iyzipay";
import { CartItem, Address } from "types/cart";

export const getCheckoutForm = async (
  cartItems: CartItem[],
  Address: Address
) => {
  var iyzipay = new Iyzipay({
    apiKey: process.env.IYZICO_KEY,
    secretKey: process.env.IYZICO_SECRET,
    uri: "https://sandbox-api.iyzipay.com",
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const address = {
    contactName: "contactName",
    city: "ankara",
    country: "turkey",
    address: "1234 fasd 1234",
    zipCode: "34742",
  };

  const buyer = {
    id: "1",
    name: "deniz",
    surname: "ulug",
    identityNumber: "13273007980",
    email: "foo@bar.com",
    gsmNumber: "+905555434332",
    lastLoginDate: "2015-10-05 12:43:35",
    registrationDate: "2013-04-21 15:12:09",
    registrationAddress: "foo",
    city: "ankara",
    country: "turkey",
    ip: "85.34.78.112",
    zipCode: "34732",
  };

  var request: Iyzipay.ThreeDSInitializePaymentRequestData = {
    price: 500, //totalPrice
    locale: Iyzipay.LOCALE.TR,
    conversationId: "5",
    basketId: "B67832",
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    buyer: {
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      ip: "192.168.1.1",
      email: "john@doe.com",
      country: "Turkey",
      city: "Istanbul",
      identityNumber: "42359099786",
      surname: "Doe",
      name: "John",
      id: "1",
    },
    currency: "TRY",
    paidPrice: 500,
    shippingAddress: {
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      country: "Turkey",
      city: "Istanbul",
      contactName: "John Doe",
    },
    billingAddress: {
      contactName: "John Doe",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      country: "Turkey",
      city: "Istanbul",
    },
    basketItems: [
      {
        name: "Basket Item 1",
        price: 500,
        itemType: "VIRTUAL",
        id: "BI1",
        category1: "Collectibles",
      },
    ],
    // basketItems: cartItems.map((item, index) => ({
    //   name: item.name,
    //   id: item.id.toString(),
    //   price: item.price,
    //   category1: "cat1",
    //   itemType: "VIRTUAL",
    // })),
    callbackUrl: `${process.env.APP_URL}/api/checkout-form-callback`,
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    installments: 0,
    paymentCard: undefined
  };
  console.log("request: ", request);
  return new Promise<Iyzipay.CheckoutFormInitialResult>((resolve, reject) => {
    iyzipay.checkoutFormInitialize.create(request, function (err, result) {
      console.log({ msg: "iyzipay.payment.create", err, result });
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};
