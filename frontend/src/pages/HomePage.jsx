import { Link } from "react-router"
import {BadgeCheck} from 'lucide-react'

const HomePage = () => {
    return (
        <section className="max-w-7xl mx-auto px-2 md:px-4 pt-16 md:pt-32 pb-20 md:pb-40 grid md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-start gap-8">
                <div className="inline-flex items-center gap-2 bg-blue-400/20 px-4 py-1.5 rounded-full">
                    <span className="material-symbols-outlined text-[18px] text-md text-blue-600" ><BadgeCheck /></span>
                    <span className="text-md text-blue-600 uppercase tracking-wider">Trusted by 5M+ users</span>
                </div>
                <h1 className="font-semibold text-4xl text-on-surface">
                    Messaging made simple. <br />
                    <span className="text-blue-400">Connections made real.</span>
                </h1>
                <p className="font-md text-lg  max-w-lg">
                    Step into a new era of communication. Connect brings your world closer with high-fidelity messaging, privacy by design, and a vibrant community interface.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <Link to={'/login'} className="bg-blue-400  tracking-wide font-bold text-lg text-white px-20 py-4 rounded-xl font-headline-md text-headline-md shadow-cta hover:brightness-110 active:scale-95 transition-all">
                       Login 
                    </Link>
                    <button className="bg-blue-200 text-primary px-10 py-4 rounded-xl font-headline-md text-headline-md hover:bg-surface-container-high transition-all">
                        Learn More
                    </button>
                </div>
            </div>
            <div className="relative">
                <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10"></div>
                <img alt="Connect App Mockup" className="w-full h-auto drop-shadow-2xl rounded-4xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxBzQ5GhlpBQ9KeriIt5aeOGne47Mcd6CXpDgK38eNaZI0Blo1KveNB0kS4wVc0s053PJcQGdSI-98yBIeEAAWcnJrraaEt2oN7pBFAj8JIVnEl12pI34b0xHQiPDA-B3doNWTpLJqVdWKWrjg7Eejt_-jWfMXzAlGLkSPUfuZoNf9fUut99YZZ4xzA-elehPThvXmcvWes869Roj3hluzWptYHKhx56DH-OG1L4RdLuYGRELdEYCKF0E2JNco72L6G_Z12qK38_s" />
            </div>
        </section>
    )
}

export default HomePage