"use client";
import React from "react";

function SizeGrid() {
    return (
        <div className="mb-8 bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold">Oʻlchamli setka</h2>

            {/* Karta to‘plami */}
            <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                <div className="p-4 border border-gray-300 rounded-lg w-[400px]">
                    <h3 className="font-semibold text-[13px]">Oʻlchamlar nimaga muhim</h3>
                    <p className="text-[12px] text-gray-600 mt-1">
                        Bu xaridorga toʻg‘ri keladigan oʻlchamni tanlashga yordam beradi va
                        qaytarishlarning sonini kamaytiradi
                    </p>
                </div>

                <div className="p-4 border border-gray-300 rounded-lg w-[400px]">
                    <h3 className="font-semibold text-[13px]">Ayniqsa kiyimlarda</h3>
                    <p className="text-[12px] text-gray-600 mt-1">
                        Suhbatlarga koʻra taxminan 60% xaridorlar Kiyim va Poyabzallar
                        toifalarida oʻlchamlarni koʻrishadi
                    </p>
                </div>

                <div className="p-4 border border-gray-300 rounded-lg w-[400px]">
                    <h3 className="font-semibold text-[13px]">Imkon qadar batafsil</h3>
                    <p className="text-[12px] text-gray-600 mt-1">
                        Masalan, kiyim uchun santimetrlarni koʻrsating: S oʻlchami (bel
                        aylanasi 80–90 sm, sonlar aylanasi 90–98 sm)
                    </p>
                </div>

                <div className="p-4 border border-gray-300 rounded-lg w-[400px] h-[112px]">
                    <h3 className="font-semibold text-[13px]">Yana nima koʻrsatish mumkin</h3>
                    <p className="text-[12px] text-gray-600 mt-1">
                        Maydon tovarning katta-kichikligi va vazni uchun mos keladi
                    </p>
                </div>
            </div>

            {/* Link + Tugma */}
            <div className="mt-4">
                <a
                    href="#"
                    className="text-sm text-[#7F4DFF] hover:underline inline-block"
                >
                    Yoʻriqnomada batafsil
                </a>
                <div className="mt-3">
                    <button className="px-5 py-2 rounded-xl bg-indigo-100 text-[#7F4DFF] font-medium">
                        Qoʻshish
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SizeGrid;
