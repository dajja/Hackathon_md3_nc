import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import publicAxios from '../config/publicAxios';

export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const handleLogin = async () => {
        try {
            let res = await publicAxios.post('/login', user);
            alert(res.data.message);
            localStorage.setItem('token', res.data.token);
            navigate('/todo');
        } catch (err) {
            alert(err.response.data.message);
        }
    }
    return (
        <>
            <div className='bg-indigo-200 min-h-[732px]' >
                <div className='flex justify-center items-center py-12'>
                    <div className='bg-white p-4 w-[450px]'>
                        <strong className='text-2xl justify-center flex'>Login</strong>
                        <div className='my-4 leading-8'>
                            <label htmlFor="">Email: </label> <br />
                            <input type="text" placeholder='nhap email' className='w-full border border-black px-2' onChange={(e) => setUser({ ...user, email: e.target.value })} /> <br />
                            <label htmlFor="">Password:  </label> <br />
                            <input type="password" placeholder='nhap mat khau' className='w-full border border-black px-2' onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        </div>
                        <button className='w-full' onClick={handleLogin}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}
