import React from "react";

export default function ProductDetails() {
    return (
        <>
            {/* Oʻlchamli setka */}
            <div className="mb-8 bg-white rounded-lg p-6">
                <h2 className="text-lg font-semibold">Oʻlchamli setka</h2>
                <div className="mt-4 flex items-center justify-between gap-3">
                    {/* 4 ta card */}
                    <div className="p-4 border border-gray-300 rounded-lg w-[400px]">
                        <h3 className="font-semibold text-[13px]">Oʻlchamlar nimaga muhim</h3>
                        <p className="text-[12px] text-gray-600 mt-1">
                            Bu xaridorga toʻg‘ri keladigan oʻlchamni tanlashga yordam beradi
                        </p>
                    </div>
                    <div className="p-4 border border-gray-300 rounded-lg w-[400px]">
                        <h3 className="font-semibold text-[13px]">Ayniqsa kiyimlarda</h3>
                        <p className="text-[12px] text-gray-600 mt-1">
                            Suhbatlarga koʻra taxminan 60% xaridorlar oʻlchamlarni koʻrishadi
                        </p>
                    </div>
                    <div className="p-4 border border-gray-300 rounded-lg w-[400px]">
                        <h3 className="font-semibold text-[13px]">Imkon qadar batafsil</h3>
                        <p className="text-[12px] text-gray-600 mt-1">
                            Masalan, kiyim uchun santimetrlarni koʻrsating
                        </p>
                    </div>
                    <div className="p-4 border border-gray-300 rounded-lg w-[400px] h-[112px]">
                        <h3 className="font-semibold text-[13px]">Yana nima koʻrsatish mumkin</h3>
                        <p className="text-[12px] text-gray-600 mt-1">
                            Maydon tovarning katta-kichikligi va vazni uchun mos keladi
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <a href="#" className="text-sm text-[#7F4DFF] hover:underline inline-block">
                        Yoʻriqnomada batafsil
                    </a>
                    <div className="mt-3">
                        <button className="px-5 py-2 rounded-xl bg-indigo-100 text-[#7F4DFF] font-medium">
                            Qoʻshish
                        </button>
                    </div>
                </div>
            </div>

            {/* Tarkib */}
            <div className="mb-8 bg-white rounded-lg p-6">
                <h2 className="text-lg font-semibold">Tarkib</h2>
                <div className="mt-4">
                    <a href="#" className="text-sm text-[#7F4DFF] hover:underline inline-block">
                        Yoʻriqnomada batafsil
                    </a>
                    <div className="mt-3">
                        <button className="px-5 py-2 rounded-xl bg-indigo-100 text-[#7F4DFF] font-medium">
                            Qoʻshish
                        </button>
                    </div>
                </div>
            </div>

            {/* Foydalanish boʻyicha yoʻriqnoma */}
            <div className="mb-8 bg-white rounded-lg p-6">
                <h2 className="text-lg font-semibold">Foydalanish boʻyicha yoʻriqnoma</h2>
                <div className="mt-4 flex items-center gap-3">
                    <div className="p-4 border border-gray-300 rounded-lg w-[300px]">
                        <h3 className="font-semibold text-[13px]">Tovardan qanday foydalanishni aytib bering</h3>
                        <p className="text-[12px] text-gray-600 mt-1">
                            Bu texnik tomondan murakkab tovarlarni sotishda yordam beradi
                        </p>
                    </div>
                    <div className="p-4 border border-gray-300 rounded-lg w-[300px]">
                        <h3 className="font-semibold text-[13px]">Mijozlarga mahsulotni tushunishga yordam bering</h3>
                        <p className="text-[12px] text-gray-600 mt-1">
                            Maslahat, yo‘l-yo‘riqlar xizmat muddatini uzaytiradi
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <a href="#" className="text-sm text-[#7F4DFF] hover:underline inline-block">
                        Yoʻriqnomada batafsil
                    </a>
                    <div className="mt-3">
                        <button className="px-5 py-2 rounded-xl bg-indigo-100 text-[#7F4DFF] font-medium">
                            Qoʻshish
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
