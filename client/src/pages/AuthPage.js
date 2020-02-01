import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from './../hooks/http.hook';
import { useMessage } from './../hooks/message.hook';
import { AuthContext } from './../context/AuthContext';

export const AuthPage = () => {
   const auth = useContext(AuthContext);
   const message = useMessage();
   const { loading, request, error, clearError } = useHttp();
   const [form, setForm] = useState({
      email: '',
      password: ''
   });

   useEffect(() => {
      message(error);
      clearError();
   }, [error, message, clearError]);

   const formChangeHandler = event => {
      setForm({ ...form, [event.target.name]: event.target.value });
   };

   const registerHandler = async () => {
      try {
         const data = await request('/auth/register', 'POST', { ...form });
         message(data.message);
      } catch (error) {}
   };

   const loginHandler = async () => {
      try {
         const data = await request('/auth/login', 'POST', { ...form });
         auth.login(data.token, data.userId);
      } catch (error) {}
   };

   return (
      <div className='row'>
         <div className='col s6 offset-s3'>
            <h1>Cut the link</h1>
            <div className='card blue darken-1'>
               <div className='card-content white-text'>
                  <span className='card-title'>Авторизация</span>
                  <div>
                     <div className='input-field'>
                        <input
                           placeholder='Введите email'
                           id='email'
                           name='email'
                           type='text'
                           className='yellow-input'
                           value={form.email}
                           onChange={formChangeHandler}
                        />
                        <label htmlFor='email' className='active'>
                           Email
                        </label>
                     </div>

                     <div className='input-field'>
                        <input
                           placeholder='Введите пароль'
                           id='password'
                           name='password'
                           type='password'
                           className='yellow-input'
                           value={form.password}
                           onChange={formChangeHandler}
                        />
                        <label htmlFor='password' className='active'>
                           Пароль
                        </label>
                     </div>
                  </div>
               </div>
               <div className='card-action'>
                  <button
                     className='btn yellow darken-4'
                     style={{ marginRight: 10 }}
                     disabled={loading}
                     onClick={loginHandler}
                  >
                     Войти
                  </button>
                  <button
                     className='btn grey lighten-1 black-text'
                     onClick={registerHandler}
                     disabled={loading}
                  >
                     Регистрация
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};
