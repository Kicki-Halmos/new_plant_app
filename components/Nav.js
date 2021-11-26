import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import firebase from '../firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

const Nav = () => {
 /* const [user, userLoading, userError] = useAuthState(firebase.auth());
  const logoutHandler = () => {
    firebase.auth().signOut();
  };*/
  return (
    <Link href='/' passHref>
      <div className='h-1/6 text-center text-2xl pt-10 font-bold sm:text-3xl'>
        Water Your Plants ☘️
      </div>
    </Link>
   
  );
};

export default Nav;
