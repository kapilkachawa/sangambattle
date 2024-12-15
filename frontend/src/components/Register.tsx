import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import PaymentQRCode from '../assets/paymentqr.png'; 

// TypeScript interface for form data
interface RegistrationData {
  college: string;
  teamName: string;
  teamLeaderName: string;
  teamLeaderWhatsApp: string;
  teamLeaderUID: string;
  teamLeaderInGameName: string;
  player2Name: string;
  player2UID: string;
  player2InGameName: string;
  player3Name: string;
  player3UID: string;
  player3InGameName: string;
  player4Name: string;
  player4UID: string;
  player4InGameName: string;
  paymentProof: File | null;
}

// Main Registration Component
export function Register({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    college: '',
    teamName: '',
    teamLeaderName: '',
    teamLeaderWhatsApp: '',
    teamLeaderUID: '',
    teamLeaderInGameName: '',
    player2Name: '',
    player2UID: '',
    player2InGameName: '',
    player3Name: '',
    player3UID: '',
    player3InGameName: '',
    player4Name: '',
    player4UID: '',
    player4InGameName: '',
    paymentProof: null
  });

  // Validation state
  const [errors, setErrors] = useState<Partial<RegistrationData>>({});

  // Validation function
  const validateStep = (step: number): boolean => {
    const newErrors: Partial<RegistrationData> = {};

    switch (step) {
      case 1:
        if (!formData.college) {
          newErrors.college = 'College is required';
        }
        break;
      case 2:
        if (!formData.teamName) newErrors.teamName = 'Team Name is required';
        if (!formData.teamLeaderName) newErrors.teamLeaderName = 'Team Leader Name is required';
        if (!formData.teamLeaderWhatsApp) newErrors.teamLeaderWhatsApp = 'WhatsApp Number is required';
        if (!formData.teamLeaderUID || formData.teamLeaderUID.length !== 11) newErrors.teamLeaderUID = 'UID must be 11 digits';
        if (!formData.teamLeaderInGameName) newErrors.teamLeaderInGameName = 'In-Game Name is required';
        break;
      case 3:
        if (!formData.player2Name) newErrors.player2Name = 'Player 2 Name is required';
        if (!formData.player2UID || formData.player2UID.length !== 11) newErrors.player2UID = 'Player 2 UID must be 11 digits';
        if (!formData.player2InGameName) newErrors.player2InGameName = 'Player 2 In-Game Name is required';
        break;
      case 4:
        if (!formData.player3Name) newErrors.player3Name = 'Player 3 Name is required';
        if (!formData.player3UID || formData.player3UID.length !== 11) newErrors.player3UID = 'Player 3 UID must be 11 digits';
        if (!formData.player3InGameName) newErrors.player3InGameName = 'Player 3 In-Game Name is required';
        break;
      case 5:
        if (!formData.player4Name) newErrors.player4Name = 'Player 4 Name is required';
        if (!formData.player4UID || formData.player4UID.length !== 11) newErrors.player4UID = 'Player 4 UID must be 11 digits';
        if (!formData.player4InGameName) newErrors.player4InGameName = 'Player 4 In-Game Name is required';
        break;
      case 6:
        if (!formData.paymentProof) {
          newErrors.paymentProof = 'Payment proof is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form navigation methods
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // Dynamic form data update method
  const updateFormData = (field: string, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for the field when it's updated
    setErrors(prev => {
      const newErrors = {...prev};
      delete newErrors[field as keyof RegistrationData];
      return newErrors;
    });
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the final step
    if (!validateStep(currentStep)) {
      return;
    }

    // Ensure a file is selected
    if (!formData.paymentProof) {
      toast.error('Please upload a payment proof', {
        duration: 5000,
        position: 'top-center',
        style: { background: '#ff0000', color: '#fff' },
      });
      return;
    }
    
    // Create FormData for file upload
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSubmit.append(key, value);
      }
    });

    try {
      // API call to backend
      const response = await axios.post('http://localhost:5000/api/register', formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Success toast
      toast.success('Registration Successful! We\'ll contact you with further details soon.', {
        duration: 5000,
        position: 'top-center',
        style: { background: '#333', color: '#fff' },
      });
      
      // Close modal
      onClose();
    } catch (error) {
      // Error toast
      toast.error('Registration Failed. Please try again.', {
        duration: 5000,
        position: 'top-center',
        style: { background: '#ff0000', color: '#fff' },
      });
      console.error('Registration Error:', error);
    }
  };

  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    <>
      {/* Add Toaster for notifications */}
      <Toaster />
      
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative"
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-semibold text-center mb-4">Team Registration</h2>

          {/* Step 1: College Selection */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-4"
            >
              {/* Guidelines Section */}
              <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-bold text-green-500 mb-2">Guidelines</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><strong>Registration Fee:</strong> ₹100 per member (₹400 for a team of four).</li>
                  <li><strong>Eligibility:</strong> Open to all college students across the city.</li>
                  <li><strong>Deadline:</strong> Submit your registration by <strong>18th December 2024, 11:59 PM IST</strong>.</li>
                  <li>Ensure all details are accurate; incorrect or incomplete submissions will lead to disqualification.</li>
                  <li>Team captains must provide an active WhatsApp number for communication.</li>
                  <li>Payment must be made via the QR code during registration, and the payment screenshot should be uploaded.</li>
                  <li>Teams without payment proof by the deadline will not be registered.</li>
                  <li>Adhere to the event guidelines as outlined in the rulebook.</li>
                  <li>For any queries, contact us via Call, Email, or Instagram.</li>
                </ul>
              </div>

              {/* College Selection Dropdown */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-400">College</label>
                <select
                  className="block w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring focus:ring-green-500"
                  value={formData.college}
                  onChange={(e) => updateFormData('college', e.target.value)}
                  required
                >
                  <option value="">Select your college</option>
                  <option value="Sangam University">Sangam University</option>
                  <option value="Swift College">Swift College</option>
                  <option value="Punit College">Punit College</option>
                </select>
                {errors.college && <p className="text-red-500 text-sm">{errors.college}</p>}
              </div>

              {/* Next Button */}
              <div className="flex justify-between">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
                  onClick={nextStep}
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Team Leader Details */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-white">Team Leader Details</h3>
              
              {/* Team Name Input */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-400">Team Name</label>
                <input
                  type="text"
                  value={formData.teamName}
                  onChange={(e) => updateFormData('teamName', e.target.value)}
                  className="block w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring focus:ring-green-500"
                  required
                />
                {errors.teamName && <p className="text-red-500 text-sm">{errors.teamName}</p>}

                {/* Team Leader Name */}
                <label className="text-gray-400">Team Leader Name</label>
                <input
                  type="text"
                  value={formData.teamLeaderName}
                  onChange={(e) => updateFormData('teamLeaderName', e.target.value)}
                  className="block w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring focus:ring-green-500"
                  required
                />
                {errors.teamLeaderName && <p className="text-red-500 text-sm">{errors.teamLeaderName}</p>}

                {/* Team Leader WhatsApp */}
                <label className="text-gray-400">Team Leader WhatsApp Number</label>
                <input
                  type="tel"
                  value={formData.teamLeaderWhatsApp}
                  onChange={(e) => updateFormData('teamLeaderWhatsApp', e.target.value)}
                  className="block w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring focus:ring-green-500"
                  pattern="[0-9]{10}"
                  required
                />
                {errors.teamLeaderWhatsApp && <p className="text-red-500 text-sm">{errors.teamLeaderWhatsApp}</p>}

                {/* Team Leader UID */}
                <label className="text-gray-400">Team Leader UID (11 digits)</label>
                <input
                  type="text"
                  value={formData.teamLeaderUID}
                  onChange={(e) => updateFormData('teamLeaderUID', e.target.value)}
                  className="block w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring focus:ring-green-500"
                  pattern="[0-9]{11}"
                  required
                />
                {errors.teamLeaderUID && <p className="text-red-500 text-sm">{errors.teamLeaderUID}</p>}

                {/* Team Leader In-Game Name */}
                <label className="text-gray-400">Team Leader In-Game Name</label>
                <input
                  type="text"
                  value={formData.teamLeaderInGameName}
                  onChange={(e) => updateFormData('teamLeaderInGameName', e.target.value)}
                  className="block w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring focus:ring-green-500"
                  required
                />
                {errors.teamLeaderInGameName && <p className="text-red-500 text-sm">{errors.teamLeaderInGameName}</p>}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
                  onClick={nextStep}
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {/* Steps 3-5: Additional Player Details */}
          {[3, 4, 5].map((step) => (
            currentStep === step && (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-white">
                  Player {step - 1} Details
                </h3>
                <div className="flex flex-col space-y-2">
                  {/* Player Name */}
                  <label className="text-gray-400">Player {step - 1} Name</label>
                  <input
                    type="text"
                    value={formData[`player${step - 1}Name` as keyof RegistrationData]}
                    onChange={(e) => updateFormData(`player${step - 1}Name`, e.target.value)}
                    className="block w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring focus:ring-green-500"
                    required
                  />
                  {errors[`player${step - 1}Name` as keyof RegistrationData] && 
                    <p className="text-red-500 text-sm">
                      {errors[`player${step - 1}Name` as keyof RegistrationData]}
                    </p>
                  }

                  {/* Player UID */}
                  <label className="text-gray-400">Player {step - 1} UID (11 digits)</label>
                  <input
                    type="text"
                    value={formData[`player${step - 1}UID` as keyof RegistrationData]}
                    onChange={(e) => updateFormData(`player${step - 1}UID`, e.target.value)}
                    className="block w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring focus:ring-green-500"
                    pattern="[0-9]{11}"
                    required
                  />
                  {errors[`player${step - 1}UID` as keyof RegistrationData] && 
                    <p className="text-red-500 text-sm">
                      {errors[`player${step - 1}UID` as keyof RegistrationData]}
                    </p>
                  }

                  {/* Player In-Game Name */}
                  <label className="text-gray-400">Player {step - 1} In-Game Name</label>
                  <input
                    type="text"
                    value={formData[`player${step - 1}InGameName` as keyof RegistrationData]}
                    onChange={(e) => updateFormData(`player${step - 1}InGameName`, e.target.value)}
                    className="block w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring focus:ring-green-500"
                    required
                  />
                  {errors[`player${step - 1}InGameName` as keyof RegistrationData] && 
                    <p className="text-red-500 text-sm">
                      {errors[`player${step - 1}InGameName` as keyof RegistrationData]}
                    </p>
                  }
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <button
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
                    onClick={nextStep}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )
          ))}

          {/* Step 6: Payment */}
          {currentStep === 6 && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-4"
            >
              {/* Payment Guidelines */}
              <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-bold text-green-500 mb-2">Payment Guidelines</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Scan the below QR Code to pay ₹400 per team.</li>
                  <li>Upload a screenshot of the payment.</li>
                  <li>Ensure the payment transaction ID is clearly visible in the screenshot for verification.</li>
                </ul>
              </div>

              {/* Payment QR Code */}
              <div className="flex justify-center">
                <img src={PaymentQRCode} alt="QR Code" className="w-40 h-40" />
              </div>

              {/* File Upload */}
              <div className="flex flex-col space-y-2 mt-4">
                <label className="text-gray-400 text-xs italic">
                  Upload 1 supported file: image. Max 2 MB.
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    updateFormData('paymentProof', file);
                  }}
                  className="block w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600"
                  accept="image/*"
                  required
                />
                {errors.paymentProof && <p className="text-red-500 text-sm">{errors.paymentProof}</p>}
                {formData.paymentProof && (
                  <p className="text-green-500 text-sm">
                    File selected: {formData.paymentProof.name}
                  </p>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
}