import React from "react";

export default function ProductCertificates() {
    return (
        <div className="mb-8 bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold">Sertifikatlar</h2>

            <div className="mt-4 flex items-center gap-3">
                <div className="p-4 border border-gray-300 rounded-lg w-[300px]">
                    <h3 className="font-semibold text-[13px]">Qayerdan olinadi</h3>
                    <p className="text-[12px] text-gray-600 mt-1">
                        Davlat akkreditatsiya markazi (DAM) beradi
                    </p>
                </div>
                <div className="p-4 border border-gray-300 rounded-lg w-[300px]">
                    <h3 className="font-semibold text-[13px]">Format</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>• JPEG, JPG, PNG</li>
                        <li>• 5 Mb dan katta emas</li>
                    </ul>
                </div>
                <div className="p-4 border border-gray-300 rounded-lg w-[300px]">
                    <h3 className="font-semibold text-[13px]">Agar faqat PDF formatda bo‘lsa</h3>
                    <p className="text-[12px] text-gray-600 mt-1">
                        Har bir sahifani skrinshot qilib rasmini qo‘shing
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
    );
}
