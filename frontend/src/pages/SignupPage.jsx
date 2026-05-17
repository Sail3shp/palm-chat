import { useState,useEffect } from "react"
import { Link,useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"
import api from "../utils/axiosInstance"
const SignupPage = () => {
    const [formData,setFormData] = useState({
        username:'',
        email:'',
        password:''
    })
    const {register} = useAuth()
    const navigate = useNavigate()

    const handleFormSubmit =async(e) => {
        e.preventDefault()
        try {
            const res = await register(formData) 
            if(res.success){
                alert('account successfully registered')
                navigate('/')
            }
        } catch (error) {
            console.log(error) 
        }

    }
    return (
        <form 
        onSubmit={handleFormSubmit}
        className="flex flex-col space-y-5 max-w-lg md:mx-auto my-10 bg-neutral-200  rounded-lg shadow-xl p-6 m-6">
            <h2 className="text-2xl font-medium">Create an account</h2>
            <div>
                <label htmlFor="username" className="text-sm block mb-2.5">Username</label>
                <div className="relative">
                    <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3">{/*<UserIcon />*/}</div>
                    <input type="text" id="username" required className=" block w-full ps-10 pe-3 py-2.5 bg-neutral-100 rounded-md"
                    onChange={(e) => setFormData({...formData,username:e.target.value})}
                    placeholder="john doe"/>
                </div>
            </div>
            <div>
                <label htmlFor="email" className="text-sm block mb-2.5">Email</label>
                <div className="relative">
                    <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3">{/*<Mail/>*/}</div>
                    <input type="email" id="email" required 
                    onChange={(e) => setFormData({...formData,email:e.target.value})}
                    className=" block w-full ps-10 pe-3 py-2.5 bg-neutral-100 rounded-md" placeholder="my@email.com"/>
                </div>
            </div>
            <div>
                <label htmlFor="password" className="text-sm block mb-2.5">Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3">{/*<Key />*/}</div>
                    <input type="password" id="password" required className=" block w-full ps-10 pe-3 py-2.5 bg-neutral-100 rounded-md"
                    onChange={(e) => setFormData({...formData,password:e.target.value})}
                    placeholder="********" />
                </div>
            </div>
            <button className="bg-blue-500 p-2 rounded-lg cursor-pointer transition text-white duration-100  ">Create an account </button>
            <p>Already have an account? <Link to={'/login'} className="text-lg font-medium text-blue-500">Login</Link></p>

        </form>
    )
}

export default SignupPage