import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="keywords"
            content="cryptocurrency trading, trading community, investment knowledge, financial goals, cryptocurrency experiences, accurate information, support, self-development, progress, future shaping"
          />
          <meta
            name="description"
            content="SharpEye Trading is a trading community where we share our knowledge and experiences about cryptocurrencies. We understand that the most crucial investment one can make is in themselves. As we strive to develop ourselves, progress towards our financial goals, and shape our future, accurate information and support are invaluable. That's precisely why SharpEye Trading is here to meet your needs!"
          />
          <meta name="author" content="" />
          <link
            rel="shortcut icon"
            href="/assets/img/icons/home_15_icon.png"
            title="Favicon"
            sizes="16x16"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
