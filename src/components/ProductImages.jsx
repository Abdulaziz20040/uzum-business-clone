"use client";
import React, { useEffect, useState } from "react";
import { Plus, MoreHorizontal, RotateCw, AlertCircle } from "lucide-react";
import { message } from "antd";

function ProductImages({ images, setImages }) {
    const [menuIndex, setMenuIndex] = useState(null);
    const [warning, setWarning] = useState("");

    // LocalStorage'dan yuklangan rasmlarni o'qish faqat boshida
    useEffect(() => {
        const storedImages = localStorage.getItem("productImages");
        if (storedImages && (!images || images.length === 0)) {
            setImages(JSON.parse(storedImages));
        }
    }, []);

    // LocalStorage'ga yozish
    const saveToLocalStorage = (newImages) => {
        localStorage.setItem("productImages", JSON.stringify(newImages));
    };

    // Rasm yuklash
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Fayl formati va hajmi tekshirish
        const validFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!validFormats.includes(file.type)) {
            setWarning(
                <>
                    Surat formati noto‘g‘ri. Iltimos JPEG, JPG, PNG yoki WebP formatida yuklang. <br />
                    <a href="https://images.uzum.uz/caguipe3p3gj5u389lfg/original.jpg" target="_blank" className="underline text-blue-600">Namuna olish</a>
                </>
            );
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setWarning(
                <>
                    Surat hajmi 5MB dan oshmasligi kerak. <br />
                    <a href="https://images.uzum.uz/caguipe3p3gj5u389lfg/original.jpg" target="_blank" className="underline text-blue-600">Namuna olish</a>
                </>
            );
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const width = img.width;
                const height = img.height;
                const ratio = width / height;

                if (width < 1080 || height < 1440 || Math.abs(ratio - 3 / 4) > 0.01) {
                    setWarning(
                        <div className="flex flex-col gap-1">
                            <div className="flex items-start gap-2">
                                {/* <AlertCircle className="w-5 h-5 text-yellow-600 mt-1" /> */}
                                <div className="flex flex-col gap-1">
                                    <span>
                                        Surat yuklangan, lekin uning tomonlar nisbati talablarga javob bermaydi
                                        va moderatsiyadan o‘tmasligi mumkin. Iltimos, tomonlar nisbati 3×4 boʻlgan suratni yuklang.
                                    </span>
                                    <a
                                        href="https://images.uzum.uz/caguipe3p3gj5u389lfg/original.jpg"
                                        target="_blank"
                                        className="underline text-blue-600"
                                    >
                                        Namuna yuklab olish
                                    </a>

                                    <span>
                                        Surat yuklangan, lekin uning oʻlchamlari 1080×1440px dan kam va moderatsiyadan oʻtmasligi mumkin.
                                        Kengligi kamida 1080px va balandligi 1440px boʻlgan suratni yuklang.
                                    </span>
                                    <a
                                        href="https://images.uzum.uz/caguipe3p3gj5u389lfg/original.jpg"
                                        target="_blank"
                                        className="underline text-blue-600"
                                    >
                                        Namuna yuklab olish
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    setWarning("");
                    const newImages = [...images, event.target.result];
                    setImages(newImages);
                    saveToLocalStorage(newImages);
                }
            };
        };
        reader.readAsDataURL(file);
    };

    // Rasmni o'chirish
    const handleDelete = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        saveToLocalStorage(newImages);
        setMenuIndex(null);
    };

    return (
        <div className="mb-8 bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Tovar umumiy rasmlari</h2>

            <div className="gap-6">
                {/* Left side - Format & Description cards */}
                <div className="flex gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200 w-[300px]">
                        <h3 className="font-medium mb-3 text-gray-800">Format</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• JPEG, JPG, WebP, PNG</li>
                            <li>• 1080*1440 (3 ga 4)</li>
                            <li>• 5 Mb dan katta emas</li>
                            <li>• Yaqindan va har xil burchaklardan</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200 w-[300px]">
                        <h3 className="font-medium mb-2 text-gray-800">Agar har xil ranglari bo‘lsa</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Ular uchun fotosuratni “Tavsiflar” joylashtirish mumkin
                        </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200 w-[300px]">
                        <h3 className="font-medium mb-2 text-gray-800">Fotosuratlar sotishga yordam beradi</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Har xil rakurslar va yaqindan olingan fotosuratlar tovar va materialni — ayniqsa kiyimlarni yaxshiroq ko‘rsatishga imkon beradi
                        </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200 w-[300px]">
                        <h3 className="font-medium mb-2 text-gray-800">Fotosuratlar moderatsiyadan o‘tadi</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Fotosuratlar tekshiruvdan o‘tishi uchun ularning sifati, formati va boshqa talablarga mosligi muhim
                        </p>
                    </div>
                </div>

                {/* Right side - Upload Area */}
                <div className="mt-10 flex gap-4 flex-wrap">
                    {/* Upload Box */}
                    <div className="w-[140px]">
                        <div className="bg-white rounded-lg border-2 border-dashed border-gray-200">
                            <label className="cursor-pointer flex flex-col items-center justify-center py-8 px-6">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <Plus className="w-6 h-6 text-gray-400 mb-2" />
                                <p className="text-sm text-center text-gray-600 font-medium">Rasm qo'shish</p>
                            </label>
                        </div>
                    </div>

                    {/* Yuklangan rasmlar */}
                    {images && images.map((img, index) => (
                        <div key={index} className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                            <img src={img} alt={`product-${index}`} className="w-full h-full object-cover" />

                            {/* Dot menu */}
                            <div
                                className="absolute top-1 right-1"
                                onClick={() => setMenuIndex(menuIndex === index ? null : index)}
                            >
                                <MoreHorizontal className="w-5 h-5 bg-white rounded-full p-1 cursor-pointer" />
                            </div>

                            {menuIndex === index && (
                                <div className="absolute top-6 right-1 bg-white shadow-lg rounded-md text-sm z-10">
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="block px-4 py-2 w-full text-left hover:bg-gray-100 flex items-center gap-1"
                                    >
                                        <RotateCw className="w-4 h-4" /> Bekor qilish
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Warning box */}
                {warning && (
                    <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded flex items-center gap-2">
                        <RotateCw className="w-4 h-4" /> {warning}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductImages;
