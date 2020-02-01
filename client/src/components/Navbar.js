import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from './../context/AuthContext';

export const Navbar = () => {
   const auth = useContext(AuthContext);
   const history = useHistory();
   const onLogout = e => {
      e.preventDefault();
      auth.logout();
      history.push('/');
   };

   return (
      <nav>
         <div
            className='nav-wrapper blue darken-4'
            style={{ padding: '0 30px' }}
         >
            <a href='/' className='brand-logo'>
               Cut the link
            </a>
            <ul id='nav-mobile' className='right hide-on-med-and-down'>
               <li>
                  <NavLink to='/create'>Создать</NavLink>
               </li>
               <li>
                  <NavLink to='/links'>Ссылки</NavLink>
               </li>
               <li>
                  <a href='/' onClick={onLogout}>
                     Выйти
                  </a>
               </li>
            </ul>
         </div>
      </nav>
   );
};
