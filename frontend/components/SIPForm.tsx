import { useState } from 'react';
import { createSIPPlan } from '../utils/contract-interactions';

export default function SIPForm() {
  const [formData, setFormData] = useState({
    totalAmount: '',
    amountPerInterval: '',
    frequency: '',
    maturity: '',
    destAddress: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const plan = {
        totalAmount: Number(formData.totalAmount) * 1000000, // Convert to microSTX
        amountPerInterval: Number(formData.amountPerInterval) * 1000000,
        frequency: Number(formData.frequency),
        maturity: Number(formData.maturity),
        destAddress: formData.destAddress
      };

      const result = await createSIPPlan(plan);
      console.log('SIP Plan created:', result);
    } catch (error) {
      console.error('Error creating SIP:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Total Amount (STX)</label>
        <input
          type="number"
          value={formData.totalAmount}
          onChange={(e) => setFormData({...formData, totalAmount: e.target.value})}
          min="100"
          required
        />
      </div>
      {/* Add other form fields similarly */}
      <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
        Create SIP Plan
      </button>
    </form>
  );
}