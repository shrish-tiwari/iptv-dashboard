import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import AuthInput from '../components/reusable/AuthInput';
import PlanCard from '../components/register/PlanCard'; 
import { fetchCompanies, fetchPlans, registerUser, updatePlan } from '../api/authService';
import { useAuth } from '../hooks/useAuth'; 
import toast from 'react-hot-toast';
import { FaLock } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const { user, login, logout, loading: authLoading } = useAuth(); 
  const [step, setStep] = useState(1);
  const [companies, setCompanies] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingPlans, setFetchingPlans] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  // 1. Logic: Refresh/Persistence Check
  useEffect(() => {
    if (!authLoading && user) {
      const savedStep = localStorage.getItem('regStep');
      if (!user.planId && !user.activePlan && savedStep === '2') {
        setStep(2);
        if (user.companyId) loadPlans(user.companyId);
      } else if (user.planId || user.activePlan) {
        navigate('/');
      }
    }
  }, [user, authLoading]);

  // 2. Load Companies
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const res = await fetchCompanies();
        const rawData = res.data?.companies || res.data || res.companies || [];
        setCompanies(Array.isArray(rawData) ? rawData : []);
      } catch (err) { console.error("❌ Companies Error:", err); }
    };
    loadCompanies();
  }, []);

  const loadPlans = async (companyId) => {
    if (!companyId) return;
    setFetchingPlans(true);
    try {
      const planRes = await fetchPlans(companyId);
      const rawPlans = planRes.data?.plans || planRes.data?.data || planRes.data?.plan || [];
      setPlans(Array.isArray(rawPlans) ? rawPlans : []);
    } catch (err) {
      console.log("Plan load error:", err);
    } finally { setFetchingPlans(false); }
  };

  // 3. Step 1 Submit (FIXED: Registration & Plans Logic separated)
  const onInfoSubmit = async (data) => {
    setLoading(true);
    const loadingToast = toast.loading("Processing your registration...");
    let success = false;

    try {
      const response = await registerUser(data);
      const userData = response.data?.user || response.data;
      login(userData); 
      localStorage.setItem('regStep', '2'); 
      toast.success("Account Registered! Select a plan.", { id: loadingToast });
      success = true;
    } catch (error) {
      const msg = error.response?.data?.message || "Registration error occurred";
      // Agar user pehle se hai toh aage badhne do
      if (msg.toLowerCase().includes("already") || error.response?.status === 409) {
          toast.success("Welcome back! Redirecting to plans...", { id: loadingToast });
          success = true;
      } else {
          toast.error(msg, { id: loadingToast });
      }
    } finally { 
      setLoading(false); 
      if (success) {
        setStep(2);
        loadPlans(data.companyId);
      }
    }
  };

  // 4. Step 3 Submit (Updated with /api/user/plan-update)
  const onFinalSubmit = async () => {
    const planId = selectedPlan?.id || selectedPlan?._id;
    if (!planId) return toast.error("Please select a plan first");
    
    setLoading(true);
    const loadingToast = toast.loading("Activating your plan...");
    try {
      // Nayi API call
      await updatePlan({
        planId: planId,
        duration: parseInt(selectedPlan.duration || 0)
      });
      
      localStorage.removeItem('regStep'); 
      toast.success("Plan Activated Successfully!", { id: loadingToast });
      navigate('/'); 
    } catch (error) {
      const msg = error.response?.data?.message || "Payment verification failed";
      toast.error(msg, { id: loadingToast });
    } finally { setLoading(false); }
  };

  if (authLoading) return <div className="h-screen bg-black flex items-center justify-center text-white font-bold text-xl">Verifying Session...</div>;

  return (
    <div className={`min-h-screen font-sans ${step === 2 ? 'bg-white' : 'bg-black'} transition-colors duration-500`}>
      {step !== 2 && (
        <div className="absolute inset-0 z-0">
          <img src="https://assets.nflxext.com/ffe/siteui/vlv3/74d37a05-9017-45d1-993c-9017bc0a31ce/eb9141a0-388e-4f0e-89a3-5c3b318d9d51/IN-en-20240108-popsignuptwoweeks-perspective_alpha_website_large.jpg" className="w-full h-full object-cover opacity-30" alt="bg" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      )}

      <header className={`relative z-10 px-10 py-6 flex justify-between items-center ${step === 2 ? 'border-b' : ''}`}>
        <h1 className="text-red-600 text-4xl font-black tracking-tighter cursor-pointer" onClick={() => navigate('/')}>IPTV</h1>
        {step === 1 && <Link to="/login" className="text-white font-bold hover:underline text-sm md:text-base">Sign In</Link>}
      </header>

      <main className="relative z-10 flex items-center justify-center py-10 px-4">
        {step === 1 && (
          <div className="w-full max-w-[450px] bg-black/80 p-8 md:p-14 rounded-md border border-zinc-800">
            <h1 className="text-3xl font-bold text-white mb-8">Sign Up</h1>
            <form onSubmit={handleSubmit(onInfoSubmit)} className="flex flex-col gap-4">
              <AuthInput name="name" type="text" placeholder="Full Name" register={register} error={errors.name} validation={{ required: "Name required" }} />
              <AuthInput name="email" type="email" placeholder="Email" register={register} error={errors.email} validation={{ required: "Email required" }} />
              <AuthInput name="password" type="password" placeholder="Password" register={register} error={errors.password} validation={{ required: "Password required" }} />
              <select {...register("companyId", { required: "Select Company" })} className="w-full p-4 bg-[#333] text-white rounded outline-none border-b-2 border-transparent focus:border-red-600 appearance-none">
                <option value="">Select Company</option>
                {companies.map((c) => <option key={c.id || c._id} value={c.id || c._id}>{c.name}</option>)}
              </select>
              <button type="submit" disabled={loading} className="bg-red-600 text-white font-bold py-4 rounded mt-4 text-xl hover:bg-red-700">
                {loading ? "Registering..." : "Next"}
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-7xl w-full mx-auto px-4 text-black">
            <p className="text-gray-700 text-sm mb-1 uppercase tracking-wide">Step 2 of 3</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Choose your plan</h1>
            <div className="flex flex-wrap gap-6 justify-center">
              {plans.length > 0 ? plans.map((plan, idx) => (
                <PlanCard key={plan.id || plan._id || idx} plan={plan} index={idx} isSelected={(selectedPlan?.id || selectedPlan?._id) === (plan.id || plan._id)} onSelect={setSelectedPlan} />
              )) : <p className="text-center w-full">Loading plans for your company...</p>}
            </div>
            <div className="mt-12 flex flex-col items-center">
              <button onClick={() => selectedPlan ? setStep(3) : toast.error("Select a plan")} className="bg-red-600 text-white px-20 py-4 rounded-md text-xl font-bold hover:bg-red-700 transition shadow-lg">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-[450px] bg-white p-10 rounded shadow-2xl text-gray-800">
            <h1 className="text-3xl font-bold mb-6 text-black">Finish and Pay</h1>
            <div className="mb-6 bg-gray-100 p-4 rounded border-l-4 border-red-600">
                <p className="text-xs text-zinc-500 uppercase">Selected Plan</p>
                <div className="flex justify-between items-center"><p className="font-bold text-black">{selectedPlan?.name}</p><button onClick={() => setStep(2)} className="text-blue-600 text-xs font-bold underline">Change</button></div>
            </div>
            <div className="space-y-3">
              <input type="text" value="4242 4242 4242 4242" disabled className="w-full border p-4 rounded bg-gray-50" />
              <div className="flex gap-3"><input type="text" value="12/28" disabled className="flex-1 border p-4 rounded bg-gray-50" /><input type="text" value="123" disabled className="flex-1 border p-4 rounded bg-gray-50" /></div>
            </div>
            <button onClick={onFinalSubmit} disabled={loading} className="w-full bg-red-600 text-white font-bold py-4 rounded-md mt-10 text-xl hover:bg-red-700 transition-all shadow-md">
              {loading ? "Activating..." : "Confirm Payment"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Register;