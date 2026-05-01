import React from 'react';

const AuthInput = ({ type, placeholder, register, name, error, validation }) => {
  return (
    <div className="w-full mb-4">
      <input
        type={type}
        placeholder={placeholder}
        // Validation dynamic pass hoga
        {...register(name, validation)} 
        style={{ backgroundColor: '#333', color: 'white' }} 
        className={`w-full p-4 rounded outline-none border-b-2 transition-all placeholder:text-zinc-500
          ${error ? 'border-orange-600' : 'border-transparent focus:border-red-600'}`}
      />
      {error && <p className="text-orange-600 text-[11px] mt-1 px-1 font-semibold">{error.message || "This field is required"}</p>}
    </div>
  );
};

export default AuthInput;