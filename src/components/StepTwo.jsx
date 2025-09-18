"use client";
import React, { useState, useEffect } from "react";
import "../app/globals.css"

function StepTwo({ formData, setFormData }) {
    const [activeTab, setActiveTab] = useState("Barchasi"); // Tab nazorati
    const [showModal, setShowModal] = useState(false); // Modal nazorati
    const [barcodeInput, setBarcodeInput] = useState(formData.barcode || ""); // Barcode input
    const [mxikCode, setMxikCode] = useState(formData.mxikCode || ""); // MXIK kod
    const [width, setWidth] = useState(formData.width || 0); // Kenglik
    const [length, setLength] = useState(formData.length || 0); // Uzunlik
    const [height, setHeight] = useState(formData.height || 0); // Balandlik
    const [weight, setWeight] = useState(formData.weight || 0); // Vazn
    const [price, setPrice] = useState(formData.price || ""); // Narx
    const [discount, setDiscount] = useState(formData.discount || ""); // Chegirma

    const [skuName, setSkuName] = useState(formData.skuName || "");

    // Automatic update formData when any field changes
    useEffect(() => {
        setFormData({
            ...formData,
            skuName,
            barcode: barcodeInput,
            mxikCode,
            width,
            length,
            height,
            weight,
            price,
            discount
        });
    }, [skuName, barcodeInput, mxikCode, width, length, height, weight, price, discount]);

    const handleChange = (e) => {
        setSkuName(e.target.value);
        // setFormData will auto-update via useEffect
    };

    return (
        <div className="bg-gray-50 h-[70vh] text-black">
            {/* SKU shakllanishi */}
            <div className="bg-white rounded-lg shadow p-6 w-[1064px] mx-auto mb-8">
                <h2 className="text-lg font-semibold mb-4">SKU shakllanishi</h2>
                <p className="text-sm text-gray-700 mb-2 w-[650px]">
                    SKU – ingliz tilida Stock Keeping Unit (tovar elementi identifikatori) – zaxiralarni hisobga olish
                    tovaringiz "Palto" va u ikkita rangda – qora va oq, shuningdek, uchta oʻlchamga – S, M va L
                    oʻlchamlarida mavjud. Shunda bu mahsulot oltita SKUga ega boʻladi – qora S, qora M, qora L, oq S,
                    oq M va oq L.
                    <br />
                    SKU nomi doʻkon identifikatori, mahsulot identifikatori va xususiyat identifikatoridan (agar
                    mavjud boʻlsa) iborat.
                </p>

                <p className="text-sm text-gray-700 mb-[6px]">
                    Quyida tovar va uning tavsiflari uchun <span className="font-semibold">noyob SKU</span>{" "}
                    belgilarini kiritganingizga <span className="font-semibold">ishonch hosil qiling.</span>
                </p>

                {/* Input */}
                <label className="block font-medium mb-2">TOVAR NOMI UCHUN SKU</label>
                <div className="text-sm text-gray-500 mb-2">Mahsulot SKU (100 tagacha harf yoki raqam)</div>
                <div className="relative">
                    <input
                        type="text"
                        value={skuName}
                        onChange={handleChange}
                        maxLength={100}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    />
                    <span className="absolute right-3 top-2 text-xs text-gray-500">
                        {skuName.length}/100
                    </span>
                </div>
            </div>

            {/* SKU Section faqat input to'ldirilsa chiqadi */}
            {skuName.trim() && (
                <div className="rounded-lg mx-auto">
                    {/* Tabs */}
                    <div className=" flex items-center gap-6">
                        <span className="pb-7 text-[20px] text-black">SKU</span>
                        <div className="flex gap-6 border-b  pt-1 mb-6 text-sm font-medium w-[300px]">
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
                    </div>

                    <div className="overflow-x-auto w-[1280px] scrollbar-thin max-h-[400px]">
                        <h3 className="text-base font-semibold mb-2">Tovar jadvali «{formData.nameUz || "Nomalum"}»</h3>

                        <div className="overflow-x-auto border border-gray-200 rounded">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-100 ">
                                    <tr>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[80px]">
                                            Tovar
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[120px]">
                                            Sotuvchi kodi
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[140px]">
                                            Holat
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[120px]">
                                            Shtrix-kod
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[100px]">
                                            MXIK
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[120px]">
                                            Kenglik, mm
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[120px]">
                                            Uzunlik, mm
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[120px]">
                                            Balandlik, mm
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[100px]">
                                            Vazn, g
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[180px]">
                                            Tavsiya qilinadigan narx
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[120px]">
                                            Narx, so'm
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[120px]">
                                            Chegirma, so'm
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[120px]">
                                            Sotish narxi, so'm
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[150px]">
                                            Dona uchun komissiya
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] border-r border-gray-200 min-w-[150px]">
                                            Dona uchun logistika to'lovi
                                        </th>
                                        <th className="p-3 text-left font-medium text-[#94979e] min-w-[150px]">
                                            Har bir dona uchun chiqarish
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    <tr className="border-t border-gray-200">
                                        {/* Rasm + Nomi */}
                                        <td className="p-3 border-r border-gray-200">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src="https://i.pinimg.com/1200x/36/70/c8/3670c849fdbacc33028ec736ec3d6804.jpg"
                                                    alt="product"
                                                    className="w-10 h-10 rounded object-cover"
                                                />
                                            </div>
                                        </td>

                                        {/* Sotuvchi kodi */}
                                        <td className="p-3 border-r border-gray-200">
                                            <span className="text-sm text-[#abb0ba]">{skuName || "yaratilmagan"}</span>
                                        </td>

                                        {/* Holat */}
                                        <td className="p-3 border-r border-gray-200">
                                            <button className=" border rounded p-1 border-[#797D86] text-[13px] text-[#797D86]">
                                                yaratilmagan
                                            </button>
                                        </td>

                                        {/* Shtrix kod */}
                                        <td className="p-3 border-r border-gray-200">
                                            <button
                                                onClick={() => setShowModal(true)}
                                                className="px-2 py-1 text-xs text-[text-sm text-[#7dacbb]"
                                            >
                                                O'zingiznikini belgilang
                                            </button>
                                        </td>

                                        {/* MXIK */}
                                        <td className="p-3 border-r border-gray-200">
                                            <input
                                                type="text"
                                                value={mxikCode}
                                                onChange={(e) => setMxikCode(e.target.value)}
                                                placeholder="kod yoki nomi"
                                                className="border border-gray-300 outline-none rounded-[13px] w-[173px] px-3 py-1.5 text-[#7e818c] text-[14px]"
                                            />
                                        </td>

                                        {/* Kenglik */}
                                        <td className="p-3 border-r border-gray-200">
                                            <input
                                                type="number"
                                                value={width}
                                                onChange={(e) => setWidth(e.target.value)}
                                                placeholder="mm"
                                                className="border w-[100px] outline-none border-gray-300 rounded px-2 py-1 text-xs"
                                            />
                                        </td>

                                        {/* Uzunlik */}
                                        <td className="p-3 border-r border-gray-200">
                                            <input
                                                type="number"
                                                value={length}
                                                onChange={(e) => setLength(e.target.value)}
                                                placeholder="mm"
                                                className="border w-[100px] outline-none border-gray-300 rounded px-2 py-1  text-xs"
                                            />
                                        </td>

                                        {/* Balandlik */}
                                        <td className="p-3 border-r border-gray-200">
                                            <input
                                                type="number"
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                                placeholder="mm"
                                                className="border w-[100px] outline-none border-gray-300 rounded px-2 py-1  text-xs"
                                            />
                                        </td>

                                        {/* Vazn */}
                                        <td className="p-3 border-r border-gray-200">
                                            <input
                                                type="number"
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                                placeholder="gg"
                                                className="border border-gray-300 rounded px-2 py-1 w-[100px] outline-none text-xs"
                                            />
                                        </td>

                                        {/* Tavsiya qilinadigan narx */}
                                        <td className="p-3 border-r border-gray-200 text-gray-500 text-xs">
                                            Hozircha narxni topmadik
                                        </td>

                                        {/* Narx, so'm */}
                                        <td className="p-3 border-r border-gray-200">
                                            <input
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                placeholder="so'm"
                                                className="border border-gray-300 rounded px-2 py-1 w-[130px] outline-none text-xs"
                                            />
                                        </td>

                                        {/* Chegirma, so'm */}
                                        <td className="p-3 border-r border-gray-200">
                                            <input
                                                type="number"
                                                value={discount}
                                                onChange={(e) => setDiscount(e.target.value)}
                                                placeholder="so'm"
                                                className="border border-gray-300 w-[130px] outline-none rounded px-2 py-1 text-xs"
                                            />
                                        </td>

                                        {/* Sotish narxi, so'm */}
                                        <td className="p-3 border-r border-gray-200 text-gray-500 text-xs">
                                            0
                                        </td>

                                        {/* Dona uchun komissiya */}
                                        <td className="p-3 border-r border-gray-200 text-gray-500 text-xs">
                                            0%
                                        </td>

                                        {/* Dona uchun logistika to'lovi */}
                                        <td className="p-3 border-r border-gray-200 text-gray-500 text-xs">
                                            0
                                        </td>

                                        {/* Har bir dona uchun chiqarish */}
                                        <td className="p-3 text-gray-500 text-xs">
                                            0
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">Shtrix-kod kiriting</h3>
                        <input
                            type="text"
                            value={barcodeInput}
                            onChange={(e) => setBarcodeInput(e.target.value)}
                            placeholder="Shtrix-kod kiriting"
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    // barcodeInput avtomatik formData ga kiritildi
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}

export default StepTwo;
