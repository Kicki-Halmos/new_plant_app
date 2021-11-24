import Head from 'next/head';
import Script from 'next/script'
import Nav from './Nav';

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>Water your plants</title>
        <link
          rel='icon'
          href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☘️</text></svg>'
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Gentium+Book+Basic:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <main className='text-center h-screen text-text bg-bg'>{props.children}</main>
    </>
  );
};

export default Layout;
