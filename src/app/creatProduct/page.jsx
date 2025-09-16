"use client";
import StepThree from "../../components/StepThree";
import StepTwo from "../../components/StepTwo";
import StepOne from "../../components/StepOne";

import React, { useState } from "react";

export default function StepForm() {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="bg-gray-50 h-full">
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center relative w-full">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 mr-2">Mening tovarlarim</span>
                            <span className="text-xl font-medium text-gray-900">Tovarni yaratish</span>
                        </div>

                        {/* Steps */}
                        <div className="flex items-center space-x-4 absolute right-10">
                            <div className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
                                    ${step === 1 ? "bg-blue-500 text-white" : step > 1 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}>
                                    1
                                </div>
                                <span className="ml-2 text-sm text-gray-900">Tovar kartochkasi</span>
                            </div>
                            <div className="w-8 h-px bg-gray-300"></div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
                                ${step === 2 ? "bg-blue-500 text-white" : step > 2 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}>
                                2
                            </div>
                            <div className="w-8 h-px bg-gray-300"></div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
                                ${step === 3 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`}>
                                3
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="w-4 h-4 bg-gray-800 rounded-full mr-2"></div>
                            <span>Yo'l-yo'riqlarni berkitish</span>
                        </div>
                        {/* ✅ tugma stepni oshiradi */}
                        <button
                            onClick={nextStep}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm w-[225px]"
                        >
                            Saqlash va davom etish
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mt-6">
                {step === 1 && <StepOne onNext={nextStep} />}
                {step === 2 && <StepTwo onNext={nextStep} onPrev={prevStep} />}
                {step === 3 && <StepThree onPrev={prevStep} />}
            </div>
        </div>
    );
}
