"use client";
import React, { useState } from "react";

function StepTwo() {
    const [skuName, setSkuName] = useState(""); // Input nazorati
    const [activeTab, setActiveTab] = useState("Barchasi"); // Tab nazorati

    return (
        <div className=" bg-gray-50 h-[70vh] text-black">
            {/* SKU shakllanishi */}
            <div className="bg-white rounded-lg shadow p-6  w-[1064px] mx-auto mb-8">
                <h2 className="text-lg font-semibold mb-4">SKU shakllanishi</h2>
                <p className="text-sm text-gray-700 mb-2 w-[650px]">
                    SKU – ingliz tilida Stock Keeping Unit (tovar elementi identifikatori) – zaxiralarni hisobga olish birligi. Har bir mumkin boʻlgan tovar varianti uchun SKU tayinlanadi. Misol uchun, sizning tovaringiz “Palto” va u ikkita rangda – qora va oq, shuningdek, uchta oʻlchamga – S, M va L oʻlchamlarida mavjud. Shunda bu mahsulot oltita SKUga ega boʻladi – qora S, qora M, qora L, oq S, oq M va oq L.
                    <br />
                    SKU nomi doʻkon identifikatori, mahsulot identifikatori va xususiyat identifikatoridan (agar mavjud boʻlsa) iborat.
                </p>

                <p className="text-sm text-gray-700 mb-[6px]">
                    Quyida tovar va uning tavsiflari uchun <span className="font-semibold">noyob SKU</span> belgilarini kiritganingizga <span className="font-semibold">ishonch hosil qiling.</span>
                </p>

                {/* Input */}
                <label className="block font-medium mb-2">TOVAR NOMI UCHUN SKU</label>
                <div className="text-sm text-gray-500 mb-2">Mahsulot SKU (100 tagacha harf yoki raqam)</div>
                <div className="relative">
                    <input
                        type="text"
                        value={skuName}
                        onChange={(e) => setSkuName(e.target.value)}
                        maxLength={100}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    />
                    <span className="absolute right-3 top-2 text-xs text-gray-500">
                        {skuName.length}/100
                    </span>
                </div>
            </div>

            {/* SKU Section faqat input to‘ldirilsa chiqadi */}
            {skuName.trim() && (
                <div className=" rounded-lg shadow mx-auto">
                    {/* Tabs */}
                    <div className="flex gap-6 border-b px-6 pt-4 text-sm font-medium">
                        <span className="pb-3  text-black">
                            SKU
                        </span>
                        {["Barchasi", "Faol", "Arxivdagilar"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 ${activeTab === tab
                                    ? "border-b-2 border-black text-black"
                                    : "text-gray-500 hover:text-black"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        <h3 className="text-base font-semibold mb-2">Tovar jadvali «Ed»</h3>

                        <div className="overflow-x-auto border border-gray-200 rounded">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 text-left font-medium text-gray-700 border-r border-gray-200 min-w-[180px]">Tovar</th>
                                        <th className="p-3 text-left font-medium text-gray-700 border-r border-gray-200 min-w-[120px]">Sotuvchi kodi</th>
                                        <th className="p-3 text-left font-medium text-gray-700 border-r border-gray-200 min-w-[140px]">Holat</th>
                                        <th className="p-3 text-left font-medium text-gray-700 border-r border-gray-200 min-w-[120px]">Shtrix-kod</th>
                                        <th className="p-3 text-left font-medium text-gray-700 border-r border-gray-200 min-w-[100px]">MXIK</th>
                                        <th className="p-3 text-left font-medium text-gray-700 border-r border-gray-200 min-w-[120px]">Kenglik, mm</th>
                                        <th className="p-3 text-left font-medium text-gray-700 border-r border-gray-200 min-w-[120px]">Uzunlik, mm</th>
                                        <th className="p-3 text-left font-medium text-gray-700 border-r border-gray-200 min-w-[120px]">Balandlik, mm</th>
                                        <th className="p-3 text-left font-medium text-gray-700 border-r border-gray-200 min-w-[100px]">Vazn, g</th>
                                        <th className="p-3 text-left font-medium text-gray-700 min-w-[180px]">Tavsiya qilinganlar</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    <tr className="border-t border-gray-200">
                                        {/* Rasm + Nomi */}
                                        <td className="p-3 border-r border-gray-200">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src="https://via.placeholder.com/40x40/8B5A3C/FFFFFF?text=S"
                                                    alt="product"
                                                    className="w-10 h-10 rounded object-cover"
                                                />
                                                <span className="font-medium text-gray-900">
                                                    {skuName}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Sotuvchi kodi */}
                                        <td className="p-3 border-r border-gray-200">
                                            <button className="px-2 py-1 text-xs text-blue-600 border border-blue-200 rounded hover:bg-blue-50">
                                                yaratilmagan
                                            </button>
                                        </td>

                                        {/* Holat */}
                                        <td className="p-3 border-r border-gray-200">
                                            <button className="px-2 py-1 text-xs text-blue-600 border border-blue-200 rounded hover:bg-blue-50">
                                                O'zingiznikini belgilang
                                            </button>
                                        </td>

                                        {/* Shtrix kod */}
                                        <td className="p-3 border-r border-gray-200">
                                            <select className="w-full border border-gray-300 rounded px-2 py-1 text-xs bg-white">
                                                <option>Kod yoki nomi</option>
                                                <option>123456789</option>
                                            </select>
                                        </td>

                                        {/* MXIK */}
                                        <td className="p-3 border-r border-gray-200">
                                            <input type="text" defaultValue="0" className="border border-gray-300 rounded px-2 py-1 w-12 text-xs" />
                                        </td>

                                        {/* Kenglik */}
                                        <td className="p-3 border-r border-gray-200">
                                            <input type="number" defaultValue="0" className="border border-gray-300 rounded px-2 py-1 w-12 text-xs" />
                                        </td>

                                        {/* Uzunlik */}
                                        <td className="p-3 border-r border-gray-200">
                                            <input type="number" defaultValue="0" className="border border-gray-300 rounded px-2 py-1 w-12 text-xs" />
                                        </td>

                                        {/* Balandlik */}
                                        <td className="p-3 border-r border-gray-200">
                                            <input type="number" defaultValue="0" className="border border-gray-300 rounded px-2 py-1 w-12 text-xs" />
                                        </td>

                                        {/* Vazn */}
                                        <td className="p-3 border-r border-gray-200">
                                            <input type="number" defaultValue="0" className="border border-gray-300 rounded px-2 py-1 w-12 text-xs" />
                                        </td>

                                        {/* Tavsiyalar */}
                                        <td className="p-3 text-gray-500 text-xs">
                                            Hozircha narxni to'ldiring
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StepTwo;
