import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import PosterGrid from '../components/marketing/PosterGrid';
import AuthInput from '../components/reusable/AuthInput';
import { fetchCompanies, loginUser, logoutUser } from '../api/authService'; // logoutUser import kiya
import { useAuth } from '../hooks/useAuth'; 
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  // 1. Load Companies
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchCompanies();
        const data = res.data?.companies || res.companies;
        setCompanies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Error fetching companies:", err);
      }
    };
    loadData();
  }, []);

  // 2. Login Submission
  const onSubmit = async (data) => {
    setLoading(true);
    const loadingToast = toast.loading("Verifying your account...");
    const payload = {
      email: data.email,
      password: data.password,
      companyId: data.companyId
    };

    try {
      const response = await loginUser(payload);
      const userData = response.data?.user || response.data;
      login(userData);

      if(response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }

      // Check for Plan
      if (!userData.planId && !userData.activePlan) {
        localStorage.setItem('regStep', '2'); 
        toast.success("Please complete your plan selection.", { id: loadingToast });
        navigate('/register'); 
      } else {
        toast.success("Login Successful!", { id: loadingToast });
        navigate('/'); 
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Invalid credentials or company";
      toast.error(msg, { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  // 3. FIX: Signup fresh start logic
  const handleStartFreshSignup = async () => {
    // Hum direct API call karenge logout ki taaki hard-refresh na ho
    try {
      await logoutUser(); // Cookie clear karega
    } catch (err) {
      console.log("Session already clear");
    }
    
    // Frontend cleanup bina refresh ke
    localStorage.removeItem('regStep');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Ab redirect karo signup par
    navigate('/register');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-black overflow-hidden">
      <PosterGrid />
      <header className="relative z-20 px-10 py-8">
         <h1 className="text-[#E50914] text-5xl font-black tracking-tighter select-none cursor-pointer" onClick={() => navigate('/')}>IPTV</h1>
      </header>

      <div className="relative z-10 flex-grow flex items-center justify-center pb-24 px-4">
        <div className="w-full max-w-[450px] bg-black/85 p-10 md:p-14 rounded shadow-2xl border border-zinc-800">
          <h1 className="text-3xl font-bold text-white mb-8">Sign In</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <AuthInput 
               name="email" type="email" placeholder="Email" 
               register={register} error={errors.email} 
               validation={{required: "Email is required"}} 
            />
            
            <AuthInput 
               name="password" type="password" placeholder="Password" 
               register={register} error={errors.password} 
               validation={{required: "Password is required"}} 
            />
            
            <div className="flex flex-col gap-1">
              <select 
                {...register("companyId", { required: "Please select company" })}
                className={`w-full p-4 bg-[#333] text-white rounded outline-none border-b-2 transition-all 
                  ${errors.companyId ? 'border-orange-600' : 'border-transparent focus:border-red-600'}`}
              >
                <option value="">Select Company</option>
                {companies.map((c) => (
                  <option key={c.id || c._id} value={c.id || c._id}>{c.name}</option>
                ))}
              </select>
              {errors.companyId && <p className="text-orange-600 text-xs">{errors.companyId.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="bg-[#E50914] text-white font-bold py-3.5 rounded mt-4 hover:bg-[#c10710] disabled:bg-gray-700 transition-all text-lg">
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="flex items-center justify-between text-zinc-400 text-sm">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-red-600" id="rem" />
                <label htmlFor="rem">Remember me</label>
              </div>
              <span className="hover:underline cursor-pointer">Need help?</span>
            </div>

            <p className="text-zinc-500 mt-10 text-base text-center">
              New to IPTV? 
              <button type="button" onClick={handleStartFreshSignup} className="text-white hover:underline font-medium ml-1">
                Sign up now.
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;