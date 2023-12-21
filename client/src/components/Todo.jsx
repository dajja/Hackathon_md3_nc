import React, { useEffect, useState } from 'react'
import publicAxios from './../config/publicAxios';
import privateAxios from './../config/privateAxios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export default function Todo() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [flag, setFlag] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState(null);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const fetchData = async () => {
        try {
            let res = await publicAxios.get('/todo');
            setTodos(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchData();
    }, [flag])
    const handleClick = async () => {
        try {
            let res;
            if (!isEdit) {
                res = await privateAxios.post('/todo', { name: input })
            } else {
                res = await privateAxios.put(`/todo/${id}`, { name: input });
                setIsEdit(false);
            }
            setFlag(!flag);
            alert(res.data.message);
            setInput('');
        } catch (err) {
            alert(err.response.data.message)
            if (err.response.data.type == 1) {
                navigate("/");
            }
        }
    }
    const handleEdit = async (value) => {
        setInput(value.name)
        setIsEdit(true);
        setId(value.id);
    }
    const handleDelete = async (id) => {
        try {
            let res = await privateAxios.delete(`/todo/${id}`);
            alert(res.data.message);
            setFlag(!flag);
        } catch (err) {
            alert(err.response.data.message)
            if (err.response.data.type == 1) {
                navigate("/");
            }
        }
    }
    return (
        <div>
            <div className='bg-indigo-200 min-h-[732px]' >
                <div className='flex justify-center items-center flex-col py-12'>
                    <div>Xin chào, {todos?.find(e => e.id == decoded.id)?.name}</div>
                    <div className='bg-white p-4 w-[450px]'>
                        <strong className='text-2xl'>Todo List</strong>
                        <div className='flex mt-6 gap-1.5 mb-3 w-full'>
                            <input type="text" className='border border-slate-400 rounded px-2 py-1 w-10/12' placeholder='Add your new todo' onChange={(e) => setInput(e.target.value)} value={input} />
                            <button className=' bg-violet-500 rounded w-2/12 flex justify-center' onClick={handleClick}>{isEdit ? 'Edit' : 'Add'}</button>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            {todos.length > 0 && todos.map((e, i) => (
                                <div className='flex justify-between bg-slate-200 gap-10' key={e.id}>
                                    <div className='py-2 px-3' >{e.name}</div>
                                    <div className='flex'>
                                        <button className='bg-slate-100' onClick={() => handleEdit(e)}>Edit</button>
                                        <button className='bg-red-500' onClick={() => handleDelete(e.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
