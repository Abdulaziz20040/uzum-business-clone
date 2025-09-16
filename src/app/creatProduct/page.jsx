// StepForm.jsx
'use client';

import StepOn from "@/components/StepOne";
import React, { useState } from "react";

export default function StepForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({}); // Barcha ma'lumotlar shu yerda bo'ladi

    const nextStep = async () => {
        try {
            if (step === 1) {
                // StepOn dan kelgan formData
                const payload = { ...formData };

                const response = await fetch("https://1b91559cc9edc1c6.mokky.dev/card", {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) throw new Error("API xatosi!");
                const data = await response.json();
                console.log("✅ API javobi:", data);

                // API dan kelgan avtomatik ID
                setFormData(prev => ({ ...prev, createdProductId: data.id }));
            }

            setStep(prev => Math.min(prev + 1, 3));
        } catch (err) {
            console.error("❌ Xatolik:", err);
        }
    };


    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="bg-gray-50 h-full">
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                    <span className="text-sm text-gray-500 mr-2">Mening tovarlarim</span>
                    <span className="text-xl font-medium text-gray-900">Tovarni yaratish</span>
                </div>
                <button
                    onClick={nextStep}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm w-[225px]"
                >
                    Saqlash va davom etish
                </button>
            </div>

            {/* Step Content */}
            <div className="mt-6">
                {step === 1 && (
                    <StepOn formData={formData} setFormData={setFormData} />
                )}
            </div>
        </div>
    );
}
