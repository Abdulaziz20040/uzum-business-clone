import React from "react";
import { ChevronDown } from "lucide-react";

export default function ProductFeatures({
    selectedFeature,
    setSelectedFeature,
    uzbekFeedback,
    setUzbekFeedback,
    russianFeedback,
    setRussianFeedback,
}) {
    return (
        <div className="mb-8 bg-white rounded-lg p-6">
            <h2 className="text-[20px] font-medium mb-4 text-gray-900">
                Tovar xususiyatlari

            </h2>

            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-3 text-md">
                        Xususiyatlar nimaga muhim
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Bu xaridorlarga yordam beradi, sotuvlarni oshiradi va qaytarishlarning sonini kamaytiradi
                    </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-3 text-md">
                        Xususiyatlarning misollari                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Material, ishlab chiqaruvchi mamlakat, o‘lchamlar, yosh cheklovlari, quvvati, tarkib, kafolat                    </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-3 text-md">
                        Qancha batafsil bo‘lsa, shuncha yaxshi

                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Bu kartochkaning Google va Yandexda chiqarilishini yaxshilaydi                    </p>
                </div>
            </div>

            <div className="mb-6">
                <a href="#" className="text-[#7F4DFF] hover:text-[#7843fd] text-sm font-medium">
                    Yo'riqnomada batafsil
                </a>
            </div>


            <div className="grid grid-cols-2 gap-6">
                <div className="relative">
                    <textarea
                        className="w-full h-11 outline-none p-2 border border-gray-300 rounded-lg resize-none placeholder-gray-400 text-base"
                        placeholder="O'zbek tilida asosiy xususiyat"
                        value={uzbekFeedback}
                        onChange={(e) => setUzbekFeedback(e.target.value)}
                        maxLength={255}
                    />
                    <div className="absolute bottom-3 right-4 text-sm text-gray-400">
                        {uzbekFeedback.length}/255
                    </div>
                </div>

                <div className="relative">
                    <textarea
                        className="w-full h-11 p-2 outline-none border border-gray-300 rounded-lg resize-none placeholder-gray-400 text-base"
                        placeholder="Rus tilida asosiy xususiyat"
                        value={russianFeedback}
                        onChange={(e) => setRussianFeedback(e.target.value)}
                        maxLength={255}
                    />
                    <div className="absolute bottom-3 right-4 text-sm text-gray-400">
                        {russianFeedback.length}/255
                    </div>
                </div>
            </div>
        </div>
    );
}
