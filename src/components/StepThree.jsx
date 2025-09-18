"use client";
import React, { useState } from "react";

function StepTwo({ formData }) {
    const [country, setCountry] = useState("Ko'rsatilmagan");
    const [brand, setBrand] = useState("Tovar belgisi mavjud ...");
    const [model, setModel] = useState("Modeli yo'q");

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6 max-w-4xl">
                <h1 className="text-lg font-semibold text-gray-800 mb-3">
                    Mahsulot xususiyatlari
                </h1>
                <div className="text-sm text-gray-600 leading-relaxed">
                    <div className="mb-2 font-semibold text-gray-700">
                        Tovar xususiyatlari tovarlarni qidirishda, katalogda va saralashlarda filtrlash uchun ishlatiladi.
                    </div>
                    <div className="text-gray-600">
                        Xususiyatlarni qo'shing va ularning qiymatlarini ko'rsating. Bu mijozlarga mahsulotingizni topishini osonlashtiradi.
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded border border-gray-300 overflow-hidden max-w-4xl">
                {/* Table Header */}
                <div className="grid grid-cols-4 bg-gray-100 border-b border-gray-300">
                    <div className="px-3 py-2.5 text-xs font-medium text-gray-600 border-r border-gray-300">
                        Tovar
                    </div>
                    <div className="px-3 py-2.5 text-xs font-medium text-gray-600 border-r border-gray-300">
                        Ishlab chiqarish mamlakati <span className="text-red-500">*</span>
                    </div>
                    <div className="px-3 py-2.5 text-xs font-medium text-gray-600 border-r border-gray-300">
                        Brend <span className="text-red-500">*</span>
                    </div>
                    <div className="px-3 py-2.5 text-xs font-medium text-gray-600">
                        Model <span className="text-red-500">*</span>
                    </div>
                </div>

                {/* Table Row */}
                <div className="grid grid-cols-4 bg-white">
                    {/* Product Column */}
                    <div className="px-4 py-4 border-r border-gray-300 flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                            <img
                                src="https://i.pinimg.com/1200x/36/70/c8/3670c849fdbacc33028ec736ec3d6804.jpg"
                                alt="SLOM"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                            {formData.skuName || "Nomalum"}
                        </span>
                    </div>

                    {/* Country Select */}
                    <div className="px-4 py-4 border-r border-gray-300">
                        <div className="relative">
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full appearance-none bg-white border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 cursor-pointer"
                            >
                                <option>Ko'rsatilmagan</option>
                                <option>O'zbekiston</option>
                                <option>Xitoy</option>
                                <option>Rossiya</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Brand Select */}
                    <div className="px-4 py-4 border-r border-gray-300">
                        <div className="relative">
                            <select
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="w-full appearance-none bg-white border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 cursor-pointer"
                            >
                                <option>Tovar belgisi mavjud ...</option>
                                <option>Nike</option>
                                <option>Adidas</option>
                                <option>Samsung</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Model Select */}
                    <div className="px-4 py-4">
                        <div className="relative">
                            <select
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="w-full appearance-none bg-white border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 cursor-pointer"
                            >
                                <option>Modeli yo'q</option>
                                <option>Model A</option>
                                <option>Model B</option>
                                <option>Model C</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StepTwo;