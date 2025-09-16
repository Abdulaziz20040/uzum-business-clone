import React from "react";
import { Plus } from "lucide-react";

export default function Product360Upload({ imageFile, handleImageUpload }) {
    return (
        <div className="mb-8 bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">360 rasm</h2>

            <div className="gap-6">
                <div className="flex gap-4 mb-4 w-[600px]">
                    <div className="bg-white rounded-lg w-[250px] p-4 border border-gray-200">
                        <h3 className="font-medium mb-3 text-gray-800">Format</h3>
                        <p className="text-sm text-gray-600">Arxiv .P3D, .ZIP</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 w-[250px] border border-gray-200">
                        <h3 className="font-medium mb-2 text-gray-800">Faylning hajmi</h3>
                        <p className="text-sm text-gray-600">10 Mb dan katta emas</p>
                    </div>
                </div>

                <div className="mt-10 w-[140px] md:mt-0">
                    <div className="bg-white rounded-lg border-2 border-dashed border-gray-200 h-full">
                        <label className="cursor-pointer block h-full">
                            <input
                                type="file"
                                accept=".p3d,.zip,.P3D,.ZIP"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <div className="flex flex-col items-center justify-center h-full py-8 px-6">
                                <Plus className="w-6 h-6 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600 font-medium text-center">
                                    360 rasm qo'shish
                                </p>
                                {imageFile && (
                                    <p className="text-xs text-green-600 mt-2 text-center">
                                        {imageFile.name}
                                    </p>
                                )}
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
