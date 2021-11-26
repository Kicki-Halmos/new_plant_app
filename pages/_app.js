import 'tailwindcss/tailwind.css';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import { Provider } from 'react-redux';
import store from '../store/index';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Nav />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
