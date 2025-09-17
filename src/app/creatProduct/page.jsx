// StepForm.jsx
'use client';

import StepOn from "@/components/StepOne";
import StepTwo from "@/components/StepTwo";
import StepThree from "@/components/StepThree";
import React, { useState } from "react";

export default function StepForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const saveToLocal = (data) => {
        const existing = JSON.parse(localStorage.getItem("productData")) || {};
        const updated = { ...existing, ...data };
        localStorage.setItem("productData", JSON.stringify(updated));
        setFormData(updated);
    };

    const nextStep = async () => {
        try {
            if (step < 3) {
                saveToLocal(formData);
                setStep((prev) => prev + 1);
            } else {
                const payload = JSON.parse(localStorage.getItem("productData")) || {};
                const response = await fetch("https://1b91559cc9edc1c6.mokky.dev/card", {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) throw new Error("API xatosi!");
                const data = await response.json();
                console.log("✅ API javobi:", data);

                localStorage.removeItem("productData");
                alert("Mahsulot muvaffaqiyatli saqlandi!");
            }
        } catch (err) {
            console.error("❌ Xatolik:", err);
        }
    };

    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const steps = [
        { id: 1, title: "Asosiy ma'lumotlar" },
        { id: 2, title: "Qo‘shimcha ma'lumotlar" },
        { id: 3, title: "Tasdiqlash" },
    ];

    return (
        <div className="bg-gray-50 h-[93vh]">
            {/* Header + Steps + Buttons */}
            <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                    <span className="text-sm text-gray-500 mr-2">Mening tovarlarim</span>
                    <span className="text-xl font-medium text-gray-900">Tovarni yaratish</span>
                </div>

                {/* Stepper */}
                <div className="flex items-center space-x-4 ml-auto mr-6">
                    {steps.map((s, idx) => (
                        <div
                            key={s.id}
                            className="flex items-center cursor-pointer"
                            onClick={() => setStep(s.id)}
                        >
                            <div
                                className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm font-medium
                                ${step === s.id
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "border-gray-400 text-gray-600"}
                                `}
                            >
                                {s.id}
                            </div>

                            {/* 🔹 Faqat active bo‘lsa title chiqadi */}
                            {step === s.id && (
                                <span className="ml-2 text-sm">{s.title}</span>
                            )}

                            {idx < steps.length - 1 && (
                                <div className="w-6 h-px bg-gray-300 mx-2"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Buttons headerga ko‘chirildi */}
                <div className="flex items-center space-x-4">
                    {step > 1 && (
                        <button
                            onClick={prevStep}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
                        >
                            Orqaga
                        </button>
                    )}
                    <button
                        onClick={nextStep}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        {step === 3 ? "Yakunlash" : "Saqlash va davom etish"}
                    </button>
                </div>
            </div>

            {/* Step content */}
            <div className="p-6">
                {step === 1 && <StepOn formData={formData} setFormData={setFormData} />}
                {step === 2 && <StepTwo formData={formData} setFormData={setFormData} />}
                {step === 3 && <StepThree formData={formData} setFormData={setFormData} />}
            </div>
        </div>
    );
}
