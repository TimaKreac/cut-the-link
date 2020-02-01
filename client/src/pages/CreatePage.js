import React, { useContext, useState } from 'react';
import { useHttp } from './../hooks/http.hook';
import { AuthContext } from './../context/AuthContext';
import { useHistory } from 'react-router-dom';

export const CreatePage = () => {
   const auth = useContext(AuthContext);
   const history = useHistory();
   const { request } = useHttp();
   const [link, setLink] = useState('');

   const onPressEnter = async e => {
      if (e.key === 'Enter') {
         try {
            const data = await request(
               '/link/generate',
               'POST',
               {
                  from: link
               },
               {
                  authorization: `Bearer ${auth.token}`
               }
            );
            console.log(data);
            history.push(`/detail/${data.link._id}`);
         } catch (error) {}
      }
   };

   return (
      <div className='row'>
         <div className='col s8 offset-s2' style={{ paddingTop: '2rem' }}>
            <div className='input-field'>
               <input
                  id='link'
                  type='text'
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  onKeyPress={onPressEnter}
               />
               <label htmlFor='link' className='active'>
                  Вставьте ссылку
               </label>
            </div>
         </div>
      </div>
   );
};
