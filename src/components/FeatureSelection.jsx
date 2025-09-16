"use client";
import React from "react";
import { ChevronDown } from "lucide-react";

function FeatureSelection({ selectedFeature, setSelectedFeature }) {
    return (
        <div className="mb-8 bg-white rounded-lg p-6">
            <h2 className="text-[20px] font-medium mb-4 text-gray-900">
                Xususiyatlarni tanlash
                <span className="text-gray-500 font-normal text-lg ml-2">
                    (Majburiy emas, maksimal 5 ta)
                </span>
            </h2>

            {/* Uchta karta */}
            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-3 text-md">
                        Tovarlar qanday guruhlanadi
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Masalan, O&apos;lcham tavsifli futbolka — XS, S, M, L, XL, 2XL
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-3 text-md">
                        Har xil turdagi tovarlar bo&apos;lsa
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Masalan, telefon uchun g&apos;ilof va telefonni guruhlash mumkin emas
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-3 text-md">
                        Kerakli tavsif mavjud bo&apos;lmasa
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        O&apos;zining noyob tavsifini yaratish mumkin
                    </p>
                </div>
            </div>

            {/* Link */}
            <div className="mb-6">
                <a
                    href="#"
                    className="text-[#7F4DFF] hover:text-[#7843fd] text-sm font-medium"
                >
                    Yo&apos;riqnomada batafsil
                </a>
            </div>

            {/* Dropdown */}
            <div className="mb-6">
                <div className="relative">
                    <select
                        className="w-full md:w-80 p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 appearance-none cursor-pointer text-base"
                        value={selectedFeature}
                        onChange={(e) => setSelectedFeature(e.target.value)}
                    >
                        <option value="">Xususiyat qo&apos;shish</option>
                        <option value="size">O&apos;lcham</option>
                        <option value="color">Rang</option>
                        <option value="material">Material</option>
                    </select>
                    <ChevronDown className="absolute left-72 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
            </div>
        </div>
    );
}

export default FeatureSelection;
