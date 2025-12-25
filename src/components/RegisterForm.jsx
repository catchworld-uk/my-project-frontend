import {Lock, Mail, UserPlus, User} from "lucide-react";
import {Link} from "react-router-dom";
import {UseAuth} from "./Auth.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function RenderCreateForm() {
    const {register} = UseAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "confirmPassword": ""
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});


    function handleInputChange(field, value) {
        setFormData(prev => ({ ...prev, [field]: value }));

        const errorKeyMap = {
            firstName: "first_name",
            lastName: "last_name",
            email: "email",
            password: "password",
            confirmPassword: "confirm_password",
        };

        const errorKey = errorKeyMap[field];

        setError(prev => ({
            ...prev,
            [errorKey]: "",
            register: ""
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if(loading) return;
        setLoading(true);

        try {
            await register(formData.email, formData.password, formData.confirmPassword, formData.firstName, formData.lastName);
            navigate('/login')
        } catch (error) {
            setError(error);
            setFormData(previous => ({...previous, confirmPassword: "", password: ""}))
        } finally {
            setLoading(false);
        }
    }



    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                    First Name
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"/>
                    <input type="text"
                           value={formData.firstName}
                           onChange={e => handleInputChange("firstName", e.target.value)}
                           className="w-full pl-11 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white
                                        placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-al"
                           placeholder="Enter your first name"
                           id="firstName"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"/>
                    <input type="text"
                           value={formData.lastName}
                           onChange={e => handleInputChange("lastName", e.target.value)}
                           className="w-full pl-11 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white
                                        placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-al"
                           placeholder="Enter your last name"
                           id="lastName"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="emailAddress" className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input type="email"
                           value={formData.email}
                           onChange={e => handleInputChange("email", e.target.value)}
                           className="w-full pl-11 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white
                                        placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-al"
                           placeholder="Enter your Flair email"
                           id="emailAddress"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"/>
                    <input type="password"
                           value={formData.password}
                           onChange={e => handleInputChange('password', e.target.value)}
                           className="w-full pl-11 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white
                                        placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-al"
                           placeholder="Enter your password"
                           id="password"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                    Confirm Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"/>
                    <input type="password"
                           value={formData.confirmPassword}
                           onChange={e => handleInputChange("confirmPassword", e.target.value)}
                           className="w-full pl-11 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white
                                        placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-al"
                           placeholder="Confirm your password"
                           id="confirmPassword"
                    />
                </div>
            </div>

            {error.email && <p className="block text-sm font-medium text-white text-center mt-1">{error.email}</p>}
            {error.password && <p className="block text-sm font-medium text-white text-center mt-1">{error.password}</p>}
            {
                !loading &&
                formData.email &&
                formData.password &&
                formData.firstName &&
                formData.lastName &&
                formData.confirmPassword ? (
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg
                 hover:bg-blue-500 transition-all duration-200 font-medium
                 shadow-lg hover:shadow-xl transform hover:scale-[1.02]
                 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        Create Account
                    </button>
                ) : (
                    <button
                        type="button"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg
                 transition-all duration-200 font-medium shadow-lg
                 opacity-50 cursor-not-allowed"
                        disabled
                    >
                        Create Account
                    </button>
                )
            }
        </form>
    )

}


function RegisterForm() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
            <div className="relative z-10 w-full max-w-md">
                <div className="w-full max-w-md">
                    <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8">
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-blue-600 rounded-xl">
                                    <UserPlus className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                            <p className="text-slate-400">Join FlairDispatch</p>
                        </div>
                        <RenderCreateForm />
                        <div className="mt-6 text-center">
                            <Link
                                to="/login"
                                className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                            >
                                ← Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default RegisterForm