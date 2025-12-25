import {Plane, Mail, Lock} from 'lucide-react'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {UseAuth} from "./Auth.jsx";
import { Link } from 'react-router-dom'

function RenderLoginSection() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const {login} = UseAuth(); // Using login function from context.



    function handleInputChange(field, value) {
        // Store new form data.
        setFormData(prev => ({...prev, [field]:value}))

        // Clear form on errors
        setErrors(prev => ({
            ...prev,
            [field]: '',
            login: ''
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if(loading) return;
        setLoading(true);

        try {
            await login(formData.email, formData.password);
            navigate('/homepage', { replace: true });
        } catch (error) {
            setErrors({ login: error.message });
            setFormData(prev => ({ ...prev, password: "" }));
        } finally {
            setLoading(false);
        }

    }


    return (
        <div className="w-full max-w-md">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-600 rounded-xl">
                            <Plane className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-slate-400">Sign into Flair Dispatch</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`w-full pl-11 pr-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500'
                                }`}
                                placeholder="Enter your Flair Email"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"/>
                            <input
                                // CHANGE THIS TO ALLOW USERS TO SEE PASWORD
                                id="password"
                                type="password"
                                value={formData.password}
                                // Add errors
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                placeholder="Enter your password"
                                className={`w-full pl-11 pr-12 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all} ${
                                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500'
                                }`}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Link
                            to="/"
                            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Forgot Password?

                        </Link>
                    </div>
                    {errors.login && <p className="block text-sm font-medium text-white text-center mt-1">{errors.login}</p>}
                    <button
                        type="submit"
                        // onClick={undefined}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none"
                        disabled={loading || !formData.email || !formData.password}
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-slate-400 text-sm">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}


function LoginForm() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

            <div className="relative z-10 w-full max-w-md">
                <RenderLoginSection />
            </div>
        </div>
    )
}

export default LoginForm;