import 'tailwindcss/tailwind.css';
import Layout from '../Components/Layout';
import Nav from '../Components/Nav';
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
