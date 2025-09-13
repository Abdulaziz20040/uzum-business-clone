'use client'

import React, { useRef, useState } from 'react';
import { Select, Input, Dropdown, Menu } from 'antd';
import "../../app/globals.css"
import { Bold, ChevronDown, ImageIcon, Italic, Link, Pilcrow, Plus, Redo, Undo } from 'lucide-react';
import { CategorySelector } from '@/components/CategorySelector';
import { FaAngleDown } from "react-icons/fa6";


const { Option } = Select;

export default function ProductCreationPage() {
    const [nameUz, setNameUz] = useState('');
    const [nameRu, setNameRu] = useState('');
    const [uzbekDescription, setUzbekDescription] = useState('');
    const [russianDescription, setRussianDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uzbekDescription1, setUzbekDescription1] = useState("");
    const [russianDescription1, setRussianDescription1] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [selectedFeature, setSelectedFeature] = useState('');
    const [uzbekFeedback, setUzbekFeedback] = useState('');
    const [russianFeedback, setRussianFeedback] = useState('');


    // --- Har bir editor uchun ref ---
    const uzbekEditorRef = useRef(null);
    const russianEditorRef = useRef(null);

    // Fayl tanlash
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles((prev) => [...prev, ...files]);
    };

    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    // --- Matn formatlash funksiyasi ---
    const formatText = (command, value = null) => {
        if (command === "createLink") {
            const url = prompt("Havola URL manzilini kiriting:");
            if (url) {
                document.execCommand(command, false, url);
            }
        } else {
            document.execCommand(command, false, value);
        }
    };

    // --- Fayldan rasm qo‘shish ---
    const insertImageFromFile = (e, editorRef, setState) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (editorRef.current) {
                    editorRef.current.focus();
                    document.execCommand("insertImage", false, event.target.result);
                    setState(editorRef.current.innerHTML);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const paragraphMenu = (formatText) => (
        <Menu>
            <Menu.Item key="p" onClick={() => formatText("formatBlock", "<p>")}>
                Paragraph
            </Menu.Item>
            <Menu.Item key="h2" onClick={() => formatText("formatBlock", "<h2>")}>
                Heading 2
            </Menu.Item>
            <Menu.Item key="h3" onClick={() => formatText("formatBlock", "<h3>")}>
                Heading 3
            </Menu.Item>
            <Menu.Item key="h4" onClick={() => formatText("formatBlock", "<h4>")}>
                Heading 4
            </Menu.Item>
        </Menu>
    );




    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideoFile(file);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    return (
        <div className="bg-gray-50 h-full">
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center relative w-full">
                        <div className=' flex flex-col'>
                            <span className="text-sm text-gray-500 mr-2">Mening tovarlarim</span>
                            <span className="text-xl font-medium text-gray-900">Tovarni yaratish</span>
                        </div>

                        {/* Steps */}
                        <div className="flex items-center space-x-4 absolute right-10">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                    1
                                </div>
                                <span className="ml-2 text-sm text-gray-900">Tovar kartochkasi</span>
                            </div>
                            <div className="w-8 h-px bg-gray-300"></div>
                            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                                2
                            </div>
                            <div className="w-8 h-px bg-gray-300"></div>
                            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                                3
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center text-sm text-gray-600">
                            <div className="w-4 h-4 bg-gray-800 rounded-full mr-2"></div>
                            <span>Yo'l-yo'riqlarni berkitish</span>
                        </div>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm w-[225px]">
                            Saqlash va davom etish
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 py-6 h-[84vh] hide-scrollbar overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="max-w-6xl mx-auto">
                    {/* Required fields notice */}
                    <div className="mb-4">
                        <p className="text-black text-sm">
                            <span className="text-red-500">*</span> — To'ldirilishi shart bo'lgan maydonlar
                        </p>
                    </div>

                    {/* Product Category */}
                    <div className="mb-8 bg-white rounded-lg p-6">
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-gray-900 mb-2">
                                Tovar toifasi <span className="text-red-500">*</span>
                            </label>
                            <div className="text-[#7f4dff] text-sm mb-4 cursor-pointer hover:underline">
                                Yo'riqnomada batafsil
                            </div>
                        </div>
                        <CategorySelector />
                    </div>

                    {/* Product Name */}
                    <div className="mb-8 bg-white rounded-lg p-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tovar nomi o'zbek tilida <span className="text-red-500">*</span>
                                </label>
                                <div className="relative max-w-lg">
                                    <Input
                                        placeholder="Tovarning aniq nomi"
                                        value={nameUz}
                                        onChange={(e) => setNameUz(e.target.value)}
                                        className="w-full"
                                        size="large"
                                        style={{ paddingRight: '60px' }}
                                    />
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                                        {nameUz.length}/90
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tovar nomi rus tilida <span className="text-red-500">*</span>
                                </label>
                                <div className="relative max-w-lg">
                                    <Input
                                        placeholder="Tovarning aniq nomi"
                                        value={nameRu}
                                        onChange={(e) => setNameRu(e.target.value)}
                                        className="w-full"
                                        size="large"
                                        style={{ paddingRight: '60px' }}
                                    />
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                                        {nameRu.length}/90
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Qisqacha tavsif */}
                    <div className="bg-white rounded-lg p-6 mb-8">
                        <h1 className="text-[18px] font-bold text-gray-900 mb-4">
                            Tovar qisqacha tavsifi <span className="text-red-500">*</span>
                        </h1>

                        {/* Uzbek */}
                        <div className="mb-6">
                            <label className="block text-[16px] font-medium text-gray-800 mb-3">
                                O‘zbekcha tavsif <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={uzbekDescription}
                                onChange={(e) => setUzbekDescription(e.target.value)}
                                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl text-base text-gray-600 bg-gray-50 resize-none outline-none focus:border-blue-400 focus:bg-white transition-all"
                                maxLength={390}
                                placeholder="Potentsial xaridorni qiziqtiring"
                            />
                            <div className="text-sm text-gray-400">{uzbekDescription.length}/390</div>
                        </div>

                        {/* Russian */}
                        <div>
                            <label className="block text-[16px] font-medium text-gray-800 mb-3">
                                Ruscha tavsif <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={russianDescription}
                                onChange={(e) => setRussianDescription(e.target.value)}
                                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl text-base text-gray-600 bg-gray-50 resize-none outline-none focus:border-blue-400 focus:bg-white transition-all"
                                maxLength={390}
                                placeholder="Potentsial xaridorni qiziqtiring"
                            />
                            <div className="text-sm text-gray-400">{russianDescription.length}/390</div>
                        </div>
                    </div>

                    {/* Tovar tavsifi */}
                    <div className="mb-8 bg-white rounded-lg p-6">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                            Tovar tavsifi <span className="text-red-500">*</span>
                        </h1>

                        {/* Uzbek Editor */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">
                                Tovar tavsifi o‘zbek tilida
                            </label>
                            <div className="border border-gray-300 h-[50.8px] p-2 flex items-center gap-6 bg-gray-50 rounded-t-lg">
                                <button onClick={() => formatText("undo")}><Undo size={20} /></button>
                                <button onClick={() => formatText("redo")}><Redo size={20} /></button>
                                <Dropdown overlay={paragraphMenu(formatText)} trigger={['click']}>
                                    <button className=' flex items-center gap-2 border p-1 rounded border-gray-300 px-2'>paragraph  <FaAngleDown /></button>
                                </Dropdown>
                                <button onClick={() => formatText("bold")}><Bold size={20} /></button>
                                <button onClick={() => formatText("italic")}><Italic size={20} /></button>
                                <button onClick={() => formatText("createLink")}><Link size={20} /></button>

                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="uzbek-image-upload"
                                        className="hidden"
                                        onChange={(e) => insertImageFromFile(e, uzbekEditorRef, setUzbekDescription1)}
                                    />
                                    <button onClick={() => document.getElementById("uzbek-image-upload").click()}>
                                        <ImageIcon size={16} />
                                    </button>
                                </div>
                            </div>
                            <div
                                ref={uzbekEditorRef}
                                contentEditable
                                className="border-1 border-t-0 border-gray-400 outline-none rounded-b-lg min-h-[432px] p-4 bg-white"
                                dangerouslySetInnerHTML={{ __html: uzbekDescription1 }}
                                onInput={(e) => setUzbekDescription1(e.target.innerHTML)}
                                suppressContentEditableWarning={true}
                            />
                        </div>

                        {/* Russian Editor */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Tovar tavsifi rus tilida
                            </label>
                            <div className="border border-gray-300 h-[50.8px] p-2 flex items-center gap-6 bg-gray-50 rounded-t-lg">
                                <button onClick={() => formatText("undo")}><Undo size={20} /></button>
                                <button onClick={() => formatText("redo")}><Redo size={20} /></button>
                                <Dropdown overlay={paragraphMenu(formatText)} trigger={['click']}>
                                    <button className=' flex items-center gap-2 border p-1 rounded border-gray-300 px-2'>paragraph  <FaAngleDown /></button>
                                </Dropdown>
                                <button onClick={() => formatText("bold")}><Bold size={20} /></button>
                                <button onClick={() => formatText("italic")}><Italic size={20} /></button>
                                <button onClick={() => formatText("createLink")}><Link size={20} /></button>

                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="russian-image-upload"
                                        className="hidden"
                                        onChange={(e) => insertImageFromFile(e, russianEditorRef, setRussianDescription1)}
                                    />
                                    <button onClick={() => document.getElementById("russian-image-upload").click()}>
                                        <ImageIcon size={16} />
                                    </button>
                                </div>
                            </div>
                            <div
                                ref={russianEditorRef}
                                contentEditable
                                className="border-1 border-t-0 border-gray-400 rounded-b-lg outline-none min-h-[432px] p-4 bg-white"
                                dangerouslySetInnerHTML={{ __html: russianDescription1 }}
                                onInput={(e) => setRussianDescription1(e.target.innerHTML)}
                                suppressContentEditableWarning={true}
                            />
                        </div>
                    </div>

                    {/* Video Section */}
                    <div className="mb-8 bg-white rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-black">Video</h2>

                        <div className=" gap-6">
                            {/* Left side - Format and Description cards (one row) */}
                            <div className="flex gap-4 mb-4">
                                {/* Format Card */}
                                <div className="bg-white rounded-lg p-4 border border-gray-200 w-[300px]">
                                    <h3 className="font-medium mb-3 text-gray-800">Format</h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li>• 1080×1440</li>
                                        <li>• 3 Mb dan katta emas</li>
                                    </ul>
                                </div>

                                {/* Description Card */}
                                <div className="bg-white rounded-lg p-4 border border-gray-200 w-[300px]">
                                    <h3 className="font-medium mb-2 text-gray-800">Video sotishga yordam beradi</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Sifatli video tovarni xaridorlarga yaxshiroq ko'rsatishga imkon beradi
                                    </p>
                                </div>
                            </div>

                            {/* Right side - Upload Area (pastdan) */}
                            <div className="mt-10 w-[140px] md:mt-0">
                                <div className="bg-white rounded-lg border-2 border-dashed border-gray-200">
                                    <label className="cursor-pointer ">
                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={handleVideoUpload}
                                            className="hidden"
                                        />
                                        <div className="flex flex-col items-center justify-center py-8 px-6">
                                            <Plus className="w-6 h-6 text-gray-400 mb-2" />
                                            <p className="text-sm text-center text-gray-600 font-medium">Video qo'shish</p>
                                            {videoFile && (
                                                <p className="text-xs text-green-600 mt-2 text-center">
                                                    {videoFile.name}
                                                </p>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 360 rasm Section */}
                    <div className='mb-8 bg-white rounded-lg p-6'>
                        <h2 className="text-xl font-semibold mb-4 text-black">360 rasm</h2>

                        <div className="gap-6">
                            {/* Left side - Format and Size cards */}
                            <div className="flex gap-4 mb-4 w-[600px]">
                                {/* Format Card */}
                                <div className="bg-white rounded-lg w-[250px] p-4 border border-gray-200">
                                    <h3 className="font-medium mb-3 text-gray-800">Format</h3>
                                    <p className="text-sm text-gray-600">Arxiv .P3D, .ZIP</p>
                                </div>

                                {/* File size Card */}
                                <div className="bg-white rounded-lg p-4 w-[250px] border border-gray-200">
                                    <h3 className="font-medium mb-2 text-gray-800">Faylning hajmi</h3>
                                    <p className="text-sm text-gray-600">10 Mb dan katta emas</p>
                                </div>
                            </div>

                            {/* Right side - Upload Area */}
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
                                            <p className="text-sm text-gray-600 font-medium text-center">360 rasm qo'shish</p>
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


                    {/* Xususiyatlarni tanlash */}
                    <div className="mb-8 bg-white rounded-lg p-6">
                        <h2 className="text-[20px] font-medium mb-4 text-gray-900">
                            Xususiyatlarni tanlash
                            <span className="text-gray-500 font-normal text-lg ml-2">(Majburiy emas, maksimal 5 ta)</span>
                        </h2>

                        {/* Three cards in a row */}
                        <div className="grid grid-cols-3 gap-6 mb-6">
                            {/* Card 1 */}
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                                <h3 className="font-semibold text-gray-900 mb-3 text-md">
                                    Tovarlar qanday guruhlanadi
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Masalan, O'lcham tavsifli futbolka — XS, S, M, L, XL, 2XL
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                                <h3 className="font-semibold text-gray-900 mb-3 text-md">
                                    Har xil turdagi tovarlar bo'lsa
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Masalan, telefon uchun g'ilof va telefonni guruhlash mumkin emas
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white border border-gray-200 rounded-lg p-5">
                                <h3 className="font-semibold text-gray-900 mb-3 text-md">
                                    Kerakli tavsif mavjud bo'lmasa
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    O'zining noyob tavsifini yaratish mumkin
                                </p>
                            </div>
                        </div>

                        {/* Link */}
                        <div className="mb-6">
                            <a href="#" className="text-[#7F4DFF] hover:text-[#7843fd] text-sm font-medium">
                                Yo'riqnomada batafsil
                            </a>
                        </div>

                        {/* Dropdown */}
                        <div className="mb-6">
                            <div className="relative">
                                <select
                                    className="w-full md:w-80 p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 appearance-none cursor-pointer text-base"
                                    value={selectedFeature}
                                    onChange={(e) => setSelectedFeature(e.target.value)}
                                >
                                    <option value="">Xususiyat qo'shish</option>
                                    <option value="size">O'lcham</option>
                                    <option value="color">Rang</option>
                                    <option value="material">Material</option>
                                </select>
                                <ChevronDown className="absolute left-72 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                            </div>
                        </div>

                        {/* Yellow info box
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-gray-800 text-sm">
                                Tavsifni faqat toifa tanlangdan keyin qo'shish mumkin.{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-700 underline font-medium">
                                    Tovarning toifasini tanlash
                                </a>
                            </p>
                        </div> */}
                    </div>


                    {/* Tovar xususiyatlari */}
                    <div className="mb-8 bg-white rounded-lg p-6">
                        <h2 className="text-[20px] font-medium mb-4 text-gray-900">Tovar xususiyatlari</h2>

                        {/* Three info cards */}
                        <div className="grid grid-cols-3 gap-8 mb-6">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 text-md">
                                    Xususiyatlar nimaga muhim
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Bu xaridorlarga yordam beradi, sotuvlarni oshiradi va qaytarishlarning sonini kamaytiradi
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 text-md">
                                    Xususiyatlarning misolari
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Material, ishlab chiqaruvchi mamlakat, o'lchamlar, yosh chekolari, quvvati, tarkib, kafolat
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 text-md">
                                    Qancha batafsil bo'lsa, shuncha yaxshi
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Bu kartochkaning Google va Yandexda chiqarilishini yaxshilaydi
                                </p>
                            </div>
                        </div>

                        {/* Link */}
                        <div className="mb-8">
                            <a href="#" className="text-[#7F4DFF] hover:text-[#7843fd] text-sm font-medium">
                                Yo'riqnomada batafsil
                            </a>
                        </div>

                        {/* Text areas */}
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


                    {/* Oʻlchamli setka */}
                    <div className="mb-8 bg-white rounded-lg p-6">
                        <h2 className="text-lg font-semibold">Oʻlchamli setka</h2>

                        {/* Card */}
                        <div className="mt-4 flex  items-center justify-between gap-3">
                            <div className=" p-4 border border-gray-300 rounded-lg w-[400px] ">
                                <h3 className="font-semibold text-[13px]">Oʻlchamlar nimaga muhim</h3>
                                <p className="text-[12px] text-gray-600 mt-1">
                                    Bu xaridorga toʻg‘ri keladigan oʻlchamni tanlashga yordam beradi va
                                    qaytarishlarning sonini kamaytiradi
                                </p>
                            </div>
                            <div className=" p-4 border border-gray-300 rounded-lg w-[400px]">
                                <h3 className="font-semibold text-[13px]">Ayniqsa kiyimlarda</h3>
                                <p className="text-[12px] text-gray-600 mt-1">
                                    Suhbatlarga koʻra taxminan 60% xaridorlar Kiyim va Poyabzallar
                                    toifalarida oʻlchamlarni koʻrishadi
                                </p>
                            </div>
                            <div className=" p-4 border border-gray-300 rounded-lg w-[400px]">
                                <h3 className="font-semibold text-[13px]">Imkon qadar batafsil</h3>
                                <p className="text-[12px] text-gray-600 mt-1">
                                    Masalan, kiyim uchun santimetrlarni koʻrsating: S oʻlchami (bel
                                    aylanasi 80–90 sm, sonlar aylanasi 90–98 sm)
                                </p>
                            </div>
                            <div className=" p-4 border border-gray-300 rounded-lg w-[400px] h-[112px]">
                                <h3 className="font-semibold text-[13px]">Yana nima koʻrsatish mumkin</h3>
                                <p className="text-[12px] text-gray-600 mt-1">
                                    Maydon tovarning katta-kichikligi va vazni uchun mos keladi
                                </p>
                            </div>
                        </div>

                        {/* Link + Button */}
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

                    {/* Tarkib */}
                    <div className="mb-8 bg-white rounded-lg p-6">
                        <h2 className="text-lg font-semibold">Tarkib</h2>

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

                    {/* Foydalanish boʻyicha yoʻriqnoma */}
                    <div className="mb-8 bg-white rounded-lg p-6">
                        <h2 className="text-lg font-semibold">Foydalanish boʻyicha yoʻriqnoma</h2>

                        {/* Card */}
                        <div className="mt-4 flex  items-center gap-3">
                            <div className=" p-4 border border-gray-300 rounded-lg w-[300px] ">
                                <h3 className="font-semibold text-[13px]">Tovardan qanday foydalanishni aytib bering</h3>
                                <p className="text-[12px] text-gray-600 mt-1">
                                    Bu texnik tomondan murakkab tovarlarni sotishda yordam beradi
                                </p>
                            </div>
                            <div className=" p-4 border border-gray-300 rounded-lg w-[300px]">
                                <h3 className="font-semibold text-[13px]">Mijozlarga mahsulotni tushunishga yordam bering</h3>
                                <p className="text-[12px] text-gray-600 mt-1">
                                    Maslahat, yo‘l-yo‘riqlar xizmat muddatini uzaytiradi va buzilishning oldini oladi
                                </p>
                            </div>
                        </div>

                        {/* Link + Button */}
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

                    {/* Sertifikatlar */}
                    <div className="mb-8 bg-white rounded-lg p-6">
                        <h2 className="text-lg font-semibold">Sertifikatlar</h2>

                        {/* Card */}
                        <div className="mt-4 flex  items-center gap-3">
                            <div className=" p-4 border border-gray-300 rounded-lg w-[300px] ">
                                <h3 className="font-semibold text-[13px]">Qayerdan olinadi</h3>
                                <p className="text-[12px] text-gray-600 mt-1">
                                    Davlat akkreditatsiya markazi (DAM) beradi
                                </p>
                            </div>
                            <div className=" p-4 border border-gray-300 rounded-lg w-[300px]">
                                <h3 className="font-semibold text-[13px]">Format</h3>

                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>•  JPEG, JPG, PNG</li>
                                    <li>•   5 Mb dan katta emas</li>
                                </ul>
                            </div>
                            <div className=" p-4 border border-gray-300 rounded-lg w-[300px]">
                                <h3 className="font-semibold text-[13px]">Agar faqat PDF formatda bo‘lsa</h3>
                                <p className="text-[12px] text-gray-600 mt-1">
                                    Har bir sahifani skrinshot qilib rasmini qo‘shing


                                </p>
                            </div>
                        </div>

                        {/* Link + Button */}
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

                </div>
            </div>
        </div>
    );
}
