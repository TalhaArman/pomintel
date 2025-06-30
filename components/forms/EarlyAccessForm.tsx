import React, { useState } from 'react';
import { EarlyAccessFormData } from '../../types';
import { SUPPLIER_TYPE_OPTIONS } from '../../constants';
import Dropdown from '../ui/Dropdown';
import { CheckCircleIcon } from '../IconComponents';

interface EarlyAccessFormProps {
  onClose: () => void;
}

const EarlyAccessForm: React.FC<EarlyAccessFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<EarlyAccessFormData>({
    name: '', phone: '', email: '', country: '', companyName: '', companyWebsite: '',
    type: SUPPLIER_TYPE_OPTIONS[0]?.value || '',
    monthlyVolume: '', pricePerKg: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.country || !formData.type) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'c74cd7ff-2723-44af-b9e6-fcd79504b4b4',
          ...formData
        })
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
  };

  const commonInputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm";
  const labelClasses = "block text-sm font-medium text-gray-700";
  const requiredSpan = <span className="text-red-500"> *</span>;

  if (isSubmitted) {
    return (
      <div className="text-center py-8 px-4">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          Your submission has been received. We will contact you shortly.
        </p>
        <button
          onClick={onClose}
          className="w-full sm:w-auto justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="text-sm text-gray-600">
          We're building a private directory of farmers, suppliers, exporters, importers, and buyers in the pomegranate trade. If you're active in this space, enter your info below to join our network.
        </p>
      </div>
      
      {/* Responsive Grid for form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        <div>
          <label htmlFor="name" className={labelClasses}>Name{requiredSpan}</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={commonInputClasses} required />
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>Phone Number / WhatsApp{requiredSpan}</label>
          <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} placeholder="Ex: +1-804-440-4440" className={commonInputClasses} required />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>Email{requiredSpan}</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" className={commonInputClasses} required />
        </div>

        <div>
          <label htmlFor="country" className={labelClasses}>Country{requiredSpan}</label>
          <input type="text" name="country" id="country" value={formData.country} onChange={handleChange} className={commonInputClasses} required />
        </div>
      
        <div>
          <label htmlFor="companyName" className={labelClasses}>Company Name</label>
          <input type="text" name="companyName" id="companyName" value={formData.companyName} onChange={handleChange} className={commonInputClasses} />
        </div>

        <div>
          <label htmlFor="companyWebsite" className={labelClasses}>Company Website</label>
          <input type="url" name="companyWebsite" id="companyWebsite" value={formData.companyWebsite} onChange={handleChange} placeholder="https://example.com" className={commonInputClasses} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="type" className={labelClasses}>Type{requiredSpan}</label>
          <Dropdown
              options={SUPPLIER_TYPE_OPTIONS}
              selectedValue={formData.type}
              onSelect={handleTypeChange}
              buttonClassName="w-full justify-between mt-1"
              menuClassName="w-full left-0" 
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="monthlyVolume" className={labelClasses}>What is your monthly volume availability of pomegranate? (in Kg)</label>
          <input type="number" name="monthlyVolume" id="monthlyVolume" value={formData.monthlyVolume} onChange={handleChange} className={commonInputClasses} />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="pricePerKg" className={labelClasses}>Price in USD per KG</label>
          <input type="number" step="0.01" name="pricePerKg" id="pricePerKg" value={formData.pricePerKg} onChange={handleChange} className={commonInputClasses} />
        </div>
      </div>

      {/* Responsive action buttons */}
      <div className="pt-2 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0">
        <button
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EarlyAccessForm;