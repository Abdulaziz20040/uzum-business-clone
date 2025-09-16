"use client";
import React, { useState } from "react";

function StepTwo({ onNext, onPrev }) {
    const [country, setCountry] = useState("Ko'rsatilmagan");
    const [brand, setBrand] = useState("Tovar belgisi mavjud emas");
    const [model, setModel] = useState("Modeli yo'q");

    return (
        <div className=" min-h-screen p-5">
            {/* Header */}
            <div className="mb-5">
                <h1 className="text-xl font-semibold text-gray-900 mb-2">
                    Mahsulot xususiyatlari
                </h1>
                <div className="text-sm text-gray-600 leading-relaxed">
                    <div className="mb-1">
                        <strong className="text-gray-800">
                            Tovar xususiyatlari tovarlarni qidirishda, katalogda va saralashlarda filtrlash uchun ishlatiladi.
                        </strong>
                    </div>
                    <div>
                        Xususiyatlarni qo'shing va ularning qiymatlarini ko'rsating. Bu mijozlarga mahsulotingizni topishini osonlashtiradi.
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded border border-gray-300 overflow-hidden max-w-4xl">
                {/* Table Header */}
                <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-300">
                    <div className="px-3 py-2 text-xs font-medium text-gray-700 border-r border-gray-300">
                        Tovar
                    </div>
                    <div className="px-3 py-2 text-xs font-medium text-gray-700 border-r border-gray-300">
                        Ishlab chiqarish mamlakati <span className="text-red-500">*</span>
                    </div>
                    <div className="px-3 py-2 text-xs font-medium text-gray-700 border-r border-gray-300">
                        Brend <span className="text-red-500">*</span>
                    </div>
                    <div className="px-3 py-2 text-xs font-medium text-gray-700">
                        Model <span className="text-red-500">*</span>
                    </div>
                </div>

                {/* Table Row */}
                <div className="grid grid-cols-4 bg-white">
                    {/* Product Column */}
                    <div className="px-3 py-3 border-r border-gray-300 flex items-center gap-2">
                        <div className="w-10 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                            <img
                                src="https://images.uzum.uz/cn1dpo925ku8ad8fua10/original.jpg"
                                alt="SLOM"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-xs font-medium text-gray-900">SLOM</span>
                    </div>

                    {/* Country Select */}
                    <div className="px-3 py-3 border-r border-gray-300">
                        <div className="relative">
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full appearance-none bg-gray-50 border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option>Ko'rsatilmagan</option>
                                <option>O'zbekiston</option>
                                <option>Xitoy</option>
                                <option>Rossiya</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Brand Select */}
                    <div className="px-3 py-3 border-r border-gray-300">
                        <div className="relative">
                            <select
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="w-full appearance-none bg-gray-50 border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option>Tovar belgisi mavjud emas</option>
                                <option>Nike</option>
                                <option>Adidas</option>
                                <option>Samsung</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Model Select */}
                    <div className="px-3 py-3">
                        <div className="relative">
                            <select
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="w-full appearance-none bg-gray-50 border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option>Modeli yo'q</option>
                                <option>Model A</option>
                                <option>Model B</option>
                                <option>Model C</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-2 mt-4">
                <button
                    onClick={onPrev}
                    className="px-3 py-1.5 bg-gray-500 text-white text-xs font-medium rounded hover:bg-gray-600 transition-colors"
                >
                    Orqaga
                </button>
                <button
                    onClick={onNext}
                    className="px-4 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                >
                    Saqlash va davom etish
                </button>
            </div>
        </div>
    );
}

export default StepTwo;