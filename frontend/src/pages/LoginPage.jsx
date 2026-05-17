import { useState,useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router"

const LoginPage = () => {
    const {login,loading} = useAuth()
    const [formData,setFormData] = useState({
        email:'',
        password:''
    })
    let navigate = useNavigate()

    const handleFormSubmit =async(e) => {
        e.preventDefault()
        console.log(formData)
        const res = await login(formData)
        console.log(res)

        if(res.success){
            alert("login successful")
            navigate('/')
        }else{
            alert(res.message)
        }

    }


    return (
        <form 
        onSubmit={handleFormSubmit}
        className="flex flex-col space-y-5 max-w-lg m-6 md:mx-auto my-10 bg-neutral-200  rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-medium">Log in to your account</h2>
            <div>
                <label htmlFor="email" className="text-sm block mb-2.5">Email</label>
                <div className="relative">
                    <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3">{/*<Mail/>*/}</div>
                    <input type="email" id="email" required className=" block w-full ps-10 pe-3 py-2.5 bg-neutral-100 rounded-md" 
                    onChange={(e) => {setFormData({
                        ...formData,
                        email:e.target.value
                    })}}
                    value={formData.email}
                    placeholder="my@email.com"/>
                </div>
            </div>
            <div>
                <label htmlFor="password" className="text-sm block mb-2.5">Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3">{/*<Key />*/}</div>
                    <input type="password" id="password" required className=" block w-full ps-10 pe-3 py-2.5 bg-neutral-100 rounded-md"
                    onChange={(e) => {setFormData({
                        ...formData,
                        password:e.target.value
                    })}}
                    value={formData.password}
                    placeholder="********" />
                </div>
            </div>
            <button className="text-blue-400 inline-flex cursor-pointer">Forgot password?</button>
            <button className="bg-blue-500 p-2 rounded-lg text-white "> {loading ? <Loader  className="animate-spin mx-auto"/>:'Log in'} </button>
            <h3>Don't have an account yet? <a to={'/signup'} className="text-blue-400">Sign up</a></h3>

        </form>
    )
}

export default LoginPage
