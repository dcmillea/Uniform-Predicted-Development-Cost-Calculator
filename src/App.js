import React, { useState } from 'react';
import { Calculator, Home, TrendingUp } from 'lucide-react';

function App() {
  const [inputs, setInputs] = useState({
    sqft: 2000,
    bedrooms: 3,
    bathrooms: 2,
    qualityLevel: 1.0,
    regionMultiplier: 1.0,
    landPrice: 100000,
    landGrade: 1.0,
    inspectionCost: 5000,
    sitePrepCost: 15000,
    materialMultiplier: 1.0,
    laborMultiplier: 1.0,
    contractorFee: 15000,
    subcontractorCost: 10000,
    bankFees: 5000,
    loanInterest: 8000,
    contingency: 0.15,
    baselineCost: 200
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  // Calculate construction cost
  const baseTotal = inputs.sqft * inputs.baselineCost;
  const constructionCost = (baseTotal * inputs.qualityLevel * inputs.regionMultiplier * 
                           inputs.materialMultiplier * inputs.laborMultiplier * inputs.landGrade) + 
                           inputs.subcontractorCost;

  // Calculate soft costs
  const softCosts = inputs.contractorFee + inputs.inspectionCost + inputs.sitePrepCost + 
                    inputs.bankFees + inputs.loanInterest;

  // Calculate risk/contingency
  const riskCost = inputs.contingency * (constructionCost + softCosts);

  // Calculate UPDC
  const updc = inputs.landPrice + constructionCost + softCosts + riskCost;
  const costPerSqft = updc / inputs.sqft;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">UPDC Calculator</h1>
          </div>
          <p className="text-gray-600">Uniform Predicted Development Cost for Raw Land & Residential Construction</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Input Form */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-indigo-600" />
              Input Parameters
            </h2>

            {/* Property Parameters */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Property & Home</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Square Footage</label>
                  <input
                    type="number"
                    name="sqft"
                    value={inputs.sqft}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={inputs.bedrooms}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    step="0.5"
                    name="bathrooms"
                    value={inputs.bathrooms}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Quality Level (0.8-1.4)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="qualityLevel"
                    value={inputs.qualityLevel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Baseline Cost/sqft ($)</label>
                  <input
                    type="number"
                    name="baselineCost"
                    value={inputs.baselineCost}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Region Multiplier</label>
                  <input
                    type="number"
                    step="0.1"
                    name="regionMultiplier"
                    value={inputs.regionMultiplier}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Land Parameters */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Land</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Land Price ($)</label>
                  <input
                    type="number"
                    name="landPrice"
                    value={inputs.landPrice}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Land Grade (0.7-1.6)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="landGrade"
                    value={inputs.landGrade}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Inspection Cost ($)</label>
                  <input
                    type="number"
                    name="inspectionCost"
                    value={inputs.inspectionCost}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Site Prep Cost ($)</label>
                  <input
                    type="number"
                    name="sitePrepCost"
                    value={inputs.sitePrepCost}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Market Variables */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Market & Time</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Material Multiplier</label>
                  <input
                    type="number"
                    step="0.1"
                    name="materialMultiplier"
                    value={inputs.materialMultiplier}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Labor Multiplier</label>
                  <input
                    type="number"
                    step="0.1"
                    name="laborMultiplier"
                    value={inputs.laborMultiplier}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Contractor & Financing */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Contractor & Financing</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Contractor Fee ($)</label>
                  <input
                    type="number"
                    name="contractorFee"
                    value={inputs.contractorFee}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Subcontractor Cost ($)</label>
                  <input
                    type="number"
                    name="subcontractorCost"
                    value={inputs.subcontractorCost}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Bank Fees ($)</label>
                  <input
                    type="number"
                    name="bankFees"
                    value={inputs.bankFees}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Loan Interest ($)</label>
                  <input
                    type="number"
                    name="loanInterest"
                    value={inputs.loanInterest}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Contingency (0.1-0.2)</label>
                  <input
                    type="number"
                    step="0.05"
                    name="contingency"
                    value={inputs.contingency}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                Results
              </h2>

              <div className="space-y-4">
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Total UPDC</div>
                  <div className="text-3xl font-bold text-indigo-600">
                    ${updc.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Cost per Sq Ft</div>
                  <div className="text-2xl font-semibold text-gray-700">
                    ${costPerSqft.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-700 mb-3">Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Land Price:</span>
                      <span className="font-medium">${inputs.landPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Construction:</span>
                      <span className="font-medium">${constructionCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Soft Costs:</span>
                      <span className="font-medium">${softCosts.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contingency:</span>
                      <span className="font-medium">${riskCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Recommendation</h3>
                  <div className={`text-sm p-3 rounded-md ${
                    costPerSqft < 300 ? 'bg-green-50 text-green-700' :
                    costPerSqft < 400 ? 'bg-yellow-50 text-yellow-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {costPerSqft < 300 ? '✓ Economical - Good value' :
                     costPerSqft < 400 ? '⚠ Consider negotiating land price' :
                     '✗ High cost - Review parameters'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-4 text-center text-sm text-gray-600">
          UPDC Model - Predictive Cost Estimation for Raw Land & Construction
        </div>
      </div>
    </div>
  );
}

export default App;