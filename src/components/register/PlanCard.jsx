import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const PlanCard = ({ plan, isSelected, onSelect, index }) => {
  // Netflix-style Colors
  const gradients = [
    'from-blue-600 to-blue-800',   // Card 1
    'from-purple-600 to-purple-800', // Card 2
    'from-red-600 to-red-800',     // Card 3
  ];

  // Mapping details for visual look
  const detailsMapping = {
    Family: { quality: 'Good', res: '720p (HD)', devices: 'TV, computer, mobile, tablet', streams: '1' },
    Premium: { quality: 'Best', res: '4K (Ultra HD) + HDR', devices: 'TV, computer, mobile, tablet', streams: '4' },
    Standard: { quality: 'Great', res: '1080p (Full HD)', devices: 'TV, computer, mobile, tablet', streams: '2' },
    Basic: { quality: 'Good', res: '720p (HD)', devices: 'TV, computer, mobile, tablet', streams: '1' },
  };

  // Get plan name and find matching details, otherwise use 'Basic' as fallback
  const planName = plan.name || "Basic";
  const info = detailsMapping[planName] || detailsMapping['Basic'];

  return (
    <div 
      onClick={() => onSelect(plan)}
      className={`relative flex-1 min-w-[280px] max-w-[350px] border-2 rounded-2xl transition-all cursor-pointer bg-white text-gray-800 shadow-lg 
      ${isSelected ? 'border-purple-600 scale-105 ring-4 ring-purple-100 z-10' : 'border-gray-200 hover:border-gray-300'}`}
    >
      {/* Header */}
      <div className={`p-5 rounded-t-[14px] bg-gradient-to-br ${gradients[index % 3]} text-white h-32 flex flex-col justify-between`}>
        <div className="flex justify-between items-start">
          <span className="font-bold text-2xl tracking-tight">{planName}</span>
          {isSelected && <FaCheckCircle className="text-white text-2xl" />}
        </div>
        <span className="text-sm font-semibold opacity-90">{info.res}</span>
      </div>

      {/* Most Popular Badge for Middle Card */}
      {index === 1 && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest z-20">
          Most Popular
        </div>
      )}

      {/* Details List */}
      <div className="p-6 space-y-4 text-[14px]">
        <div className="flex flex-col">
          <p className="text-gray-500 font-medium">Monthly price</p>
          <p className="font-bold text-gray-900 text-lg">₹{plan.price || '19.99'}</p>
        </div>
        <hr className="border-gray-100" />
        <div className="flex flex-col">
          <p className="text-gray-500 font-medium">Video and sound quality</p>
          <p className="font-bold text-gray-900">{info.quality}</p>
        </div>
        <hr className="border-gray-100" />
        <div className="flex flex-col">
          <p className="text-gray-500 font-medium">Resolution</p>
          <p className="font-bold text-gray-900">{info.res}</p>
        </div>
        <hr className="border-gray-100" />
        <div className="flex flex-col">
          <p className="text-gray-500 font-medium">Supported devices</p>
          <p className="font-bold text-gray-900 leading-tight">{info.devices}</p>
        </div>
        <hr className="border-gray-100" />
        <div className="flex flex-col">
          <p className="text-gray-500 font-medium">Devices your household can watch at the same time</p>
          <p className="font-bold text-gray-900">{info.streams}</p>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;