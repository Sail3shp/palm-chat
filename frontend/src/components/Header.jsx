import { Link } from "react-router"
import { useAuth } from "../context/AuthContext"
const Header = () => {
    const { user,logout } = useAuth()
    return (
        <header className="bg-neutral-400/40 flex justify-between p-4 text-center items-center">
            <Link to={'/'} className="text-xl font-semibold tracking-wide">Palm-Chat</Link>
            <nav className="flex gap-6">
                {!user &&
                    <>
                        <Link to={'/register'}> Register</Link>
                        <Link to={'/login'}> Login</Link>
                    </>
                }
                {user && <button onClick={logout} className="cursor-pointer">Logout</button>}
                <Link to={'/chat'}> Chat</Link>
            </nav>
        </header>
    )
}

export default Header