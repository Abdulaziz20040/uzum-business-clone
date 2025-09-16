// StepOn.jsx
'use client'

import React, { useRef, useState, useEffect } from 'react';
import { Select, Input, Dropdown, Menu, Checkbox, message, Button } from 'antd';
import "../app/globals.css"
import { Bold, ImageIcon, Italic, Link, Plus, Redo, Undo } from 'lucide-react';
import { CategorySelector } from '@/components/CategorySelector';
import { FaAngleDown } from "react-icons/fa6";
import Product360Upload from './Product360Upload';
import ProductFeatures from './ProductFeatures';
import ProductDetails from './ProductDetails';
import ProductCertificates from './ProductCertificates';
import FeatureSelection from './FeatureSelection';
import SizeGrid from './SizeGrid';
import ProductImages from './ProductImages';

const { Option } = Select;

export default function StepOn({ formData, setFormData }) {
    // --- State’larni props orqali boshqarish ---
    const [nameUz, setNameUz] = useState(formData.nameUz || '');
    const [nameRu, setNameRu] = useState(formData.nameRu || '');
    const [uzbekDescription, setUzbekDescription] = useState(formData.uzbekDescription || '');
    const [russianDescription, setRussianDescription] = useState(formData.russianDescription || '');
    const [selectedFiles, setSelectedFiles] = useState(formData.selectedFiles || []);
    const [uzbekDescription1, setUzbekDescription1] = useState(formData.uzbekDescription1 || "");
    const [russianDescription1, setRussianDescription1] = useState(formData.russianDescription1 || "");
    const [videoFile, setVideoFile] = useState(formData.videoFile || null);
    const [imageFile, setImageFile] = useState(formData.imageFile || null);
    const [selectedFeature, setSelectedFeature] = useState(formData.selectedFeature || '');
    const [uzbekFeedback, setUzbekFeedback] = useState(formData.uzbekFeedback || '');
    const [russianFeedback, setRussianFeedback] = useState(formData.russianFeedback || '');
    const [country, setCountry] = useState(formData.country || null);
    const [brand, setBrand] = useState(formData.brand || null);
    const [model, setModel] = useState(formData.model || '');
    const [guarantee, setGuarantee] = useState(formData.guarantee || '');
    const [categorySelected, setCategorySelected] = useState(formData.categorySelected || false);
    const [disabled, setDisabled] = useState(false);
    // State alohida, har bir select uchun
    const [countryDisabled, setCountryDisabled] = useState(false);
    const [brandDisabled, setBrandDisabled] = useState(false);
    const [modelDisabled, setModelDisabled] = useState(false);

    const [images, setImages] = useState([]);
    const [createdProductId, setCreatedProductId] = useState(null);

    useEffect(() => {
        setFormData({
            ...formData,
            nameUz,
            nameRu,
            uzbekDescription,
            russianDescription,
            uzbekDescription1,
            russianDescription1,
            selectedFiles,
            videoFile,
            imageFile,
            selectedFeature,
            uzbekFeedback,
            russianFeedback,
            country,
            brand,
            model,
            guarantee,
            categorySelected,
        });
    }, [
        nameUz, nameRu, uzbekDescription, russianDescription,
        uzbekDescription1, russianDescription1,
        selectedFiles, videoFile, imageFile,
        selectedFeature, uzbekFeedback, russianFeedback,
        country, brand, model, guarantee, categorySelected,
    ]);


    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) setVideoFile(file); // va formData useEffect orqali yangilanadi
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) setImageFile(file); // va formData useEffect orqali yangilanadi
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prev => [...prev, ...files]); // formData update
    };


    // Tovar yaratish
    const handleSubmit = async (formData) => {
        const res = await fetch("https://1b91559cc9edc1c6.mokky.dev/card", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        setCreatedProductId(data.id); // API dan kelgan avtomatik ID
    };



    // --- Category selector submit ---
    const handleCategorySubmit = () => {
        setCategorySelected(true);
    };

    // --- Editor ref ---
    const uzbekEditorRef = useRef(null);
    const russianEditorRef = useRef(null);



    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    // --- Text formatting ---
    const formatText = (command, value = null) => {
        if (command === "createLink") {
            const url = prompt("Havola URL manzilini kiriting:");
            if (url) document.execCommand(command, false, url);
        } else {
            document.execCommand(command, false, value);
        }
    };

    // --- Insert image from file ---
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
            <Menu.Item key="p" onClick={() => formatText("formatBlock", "<p>")}>Paragraph</Menu.Item>
            <Menu.Item key="h2" onClick={() => formatText("formatBlock", "<h2>")}>Heading 2</Menu.Item>
            <Menu.Item key="h3" onClick={() => formatText("formatBlock", "<h3>")}>Heading 3</Menu.Item>
            <Menu.Item key="h4" onClick={() => formatText("formatBlock", "<h4>")}>Heading 4</Menu.Item>
        </Menu>
    );


    return (
        <div className="bg-gray-50 h-full">
            <div className="px-6 h-[74vh] hide-scrollbar overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
                        {!categorySelected && (
                            <CategorySelector onSubmit={handleCategorySubmit} />
                        )}
                    </div>



                    {/* Product Name */}
                    <div className="mb-8 bg-white rounded-lg p-6">
                        <div className="space-y-6">
                            <h2 className="text-[20px] font-medium mb-4 text-gray-900">
                                Tovar nomi
                                <span className="text-red-500 font-normal text-lg ml-2">*</span>
                            </h2>

                            {/* Three cards in a row */}
                            <div className=" flex items-center gap-2 mb-6">
                                {/* Card 1 */}
                                <div className="bg-white border border-gray-200 rounded-lg p-5 w-[300px] h-[144px]">
                                    <h3 className="font-semibold text-gray-900 mb-3 text-md">
                                        Nomlash sxemasi
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Tovarning turi + brend + model muhim tavsif
                                    </p>
                                </div>

                                {/* Card 2 */}
                                <div className="bg-white border border-gray-200 rounded-lg p-5 w-[300px]">
                                    <h3 className="font-semibold text-gray-900 mb-3 text-md">
                                        Hajmi 90 ta belgi


                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Qisqaroq nomlar raqobatchilar bilan mos kelishi mumkin — bu Yandex va Google izlashlaridagi ko‘rsatishlarni kamaytiradi


                                    </p>
                                </div>

                                {/* Card 3 */}
                                <div className="bg-white border border-gray-200 rounded-lg p-5 w-[300px]">
                                    <h3 className="font-semibold text-gray-900 mb-3 text-md">
                                        Bitta nomdagi variantlar


                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Yo‘l qo‘yiladi, lekin 90 ta belgidan ko‘p emas, masalan: Simsiz quloqchinlar AKG N 700


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

                            </div>

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


                    {categorySelected && (
                        <div>

                            {/* Ishlab chiqarilgan mamlakat */}
                            <div className="bg-white rounded-lg p-6 mb-8">
                                {/* Title */}
                                <h2 className="text-lg font-semibold text-black mb-3">
                                    Ishlab chiqarilgan mamlakat
                                </h2>

                                {/* Select */}
                                <Select
                                    value={countryDisabled ? null : country}
                                    onChange={(value) => setCountry(value)}
                                    placeholder="Mamlakatni tanlang"
                                    style={{ width: 380, height: 45 }}
                                    disabled={countryDisabled}
                                >
                                    <Option value="uz">O‘zbekiston</Option>
                                    <Option value="ru">Rossiya</Option>
                                    <Option value="us">AQSH</Option>
                                </Select>

                                {/* Checkbox */}
                                <div className="mt-4">
                                    <Checkbox
                                        checked={countryDisabled}
                                        onChange={(e) => {
                                            setCountryDisabled(e.target.checked);
                                            if (e.target.checked) setCountry(null); // bo'sh yuborish
                                        }}
                                    >                                        Mavjud emas ishlab chiqarilgan mamlakat
                                    </Checkbox>
                                </div>
                            </div>



                            {/* Brend */}
                            <div className="bg-white rounded-lg p-6 mb-8">
                                {/* Title */}
                                <h2 className="text-lg  font-semibold text-black mb-3">
                                    Brend <span className="text-red-500 ">*</span>
                                </h2>


                                {/* Card */}
                                <div className="mt-4 flex  items-center  gap-3">
                                    <div className=" p-4 border border-gray-300 rounded-lg w-[300px] ">
                                        <h3 className="font-semibold text-[13px]">Brend nimaga muhim</h3>
                                        <p className="text-[12px] text-gray-600 mt-1">
                                            Bu xaridorlarga tovarlarni tezroq va osonroq topishga yordam beradi


                                        </p>
                                    </div>
                                    <div className=" p-4 border border-gray-300 rounded-lg w-[300px] h-[95px]">
                                        <h3 className="font-semibold text-[13px]">Agar kerakli brend yo‘q bo‘lsa

                                        </h3>
                                        <p className="text-[12px] text-gray-600 mt-1">
                                            “Brend yo‘q” belgisini qo‘ying


                                        </p>
                                    </div>
                                    <div className=" p-4 border border-gray-300 rounded-lg w-[300px]">
                                        <h3 className="font-semibold text-[13px]">Brenddni tasdiqlang

                                        </h3>
                                        <p className="text-[12px] text-gray-600 mt-1">
                                            Ba’zi brendlarni tanlash uchun tasdiqlovchi hujjatlarni taqdim etish kerak Batafsil
                                        </p>
                                    </div>

                                </div>

                                {/* Link + Button */}
                                <div className="mt-4 mb-4">
                                    <a
                                        href="#"
                                        className="text-sm text-[#7F4DFF] hover:underline inline-block"
                                    >
                                        Yoʻriqnomada batafsil
                                    </a>
                                </div>

                                <Select
                                    value={brandDisabled ? null : brand}
                                    onChange={(v) => setBrand(v)}
                                    placeholder="Brendni tanlang"
                                    style={{ width: 380, height: 45 }}
                                    disabled={brandDisabled}
                                >
                                    <Option value="apple">Apple</Option>
                                    <Option value="samsung">Samsung</Option>
                                    <Option value="huawei">Huawei</Option>
                                </Select>

                                {/* Checkbox */}
                                <div className="mt-4">
                                    <Checkbox
                                        checked={brandDisabled}
                                        onChange={(e) => {
                                            setBrandDisabled(e.target.checked);
                                            if (e.target.checked) setBrand(null);
                                        }}
                                    >Mavjud emas Ishlab chiqarilgan Brend</Checkbox>
                                </div>
                            </div>


                            {/* Model */}
                            <div className="bg-white rounded-lg p-6 mb-8">
                                {/* Title */}
                                <h2 className="text-lg  font-semibold text-black mb-3">
                                    Model
                                </h2>


                                {/* Card */}
                                <div className="mt-4 flex  items-center  gap-3">
                                    <div className=" p-4 border border-gray-300 rounded-lg w-[300px] ">
                                        <h3 className="font-semibold text-[13px]">Model qanday ko‘rsatiladi</h3>
                                        <p className="text-[12px] text-gray-600 mt-1">
                                            Modelning to‘liq va aniq — brendsiz faqat bitta modelning nomi kerak, aks holda moderatsiyadan o‘tmasligi mumkin


                                        </p>
                                    </div>
                                    <div className=" p-4 border border-gray-300 rounded-lg w-[300px] h-[111px]">
                                        <h3 className="font-semibold text-[13px]">Masalan, agar tovar Apple MacBook bo‘lsa

                                        </h3>
                                        <p className="text-[12px] text-gray-600 mt-1">
                                            Unda model — Pro 13 256Gb Space Gray



                                        </p>
                                    </div>
                                    <div className=" p-4 border border-gray-300 rounded-lg w-[300px]">
                                        <h3 className="font-semibold text-[13px]">Muhim so‘zlarni yozmagan ma’qul


                                        </h3>
                                        <p className="text-[12px] text-gray-600 mt-1">
                                            Masalan: notebook, noutbuk, nout, kompyuter, компьютер, ноут, ноутбуки, noutbook, noutbuklar, для офиса
                                        </p>
                                    </div>

                                </div>

                                {/* Link + Button */}
                                <div className="mt-4 mb-4">
                                    <a
                                        href="#"
                                        className="text-sm text-[#7F4DFF] hover:underline inline-block"
                                    >
                                        Yoʻriqnomada batafsil
                                    </a>
                                </div>

                                <Select
                                    value={modelDisabled ? null : model}
                                    onChange={(v) => setModel(v)}
                                    placeholder="Modelni tanlang"
                                    style={{ width: 380, height: 45 }}
                                    disabled={modelDisabled}
                                >
                                    <Option value="pro13">Pro 13 256Gb Space Gray</Option>
                                    <Option value="air15">Air 15 512Gb Silver</Option>
                                </Select>

                                {/* Checkbox */}
                                <div className="mt-4">
                                    <Checkbox
                                        checked={modelDisabled}
                                        onChange={(e) => {
                                            setModelDisabled(e.target.checked);
                                            if (e.target.checked) setModel(null); // bo'sh yuborish
                                        }}
                                    >Mavjud emas Ishlab chiqarilgan model</Checkbox>
                                </div>
                            </div>

                            {/* Kafolatoylarda */}
                            <div className="bg-white rounded-lg p-6 mb-8">
                                {/* Title */}
                                <h2 className="text-lg  font-semibold text-black mb-3">
                                    Kafolat  <span className="text-gray-500 ">oylarda</span>
                                </h2>


                                {/* Card */}
                                <div className="mt-4 flex  items-center  gap-3 mb-4">
                                    <div className=" p-4 border border-gray-300 rounded-lg w-[300px] ">
                                        <h3 className="font-semibold text-[13px]">Agar muddat ko‘rsatilmasa</h3>
                                        <p className="text-[12px] text-gray-600 mt-1">
                                            Qonun bo‘yicha kafolat avtomatik ravishda 6 oy bo‘ladi

                                        </p>
                                    </div>
                                </div>


                                <Select
                                    value={guarantee} // <-- qo'shildi
                                    onChange={(value) => setGuarantee(value)} // <-- qo'shildi
                                    placeholder="Masalan, 24 yoki 12"
                                    style={{ width: 380, height: 45 }}
                                >
                                    <Option value="12">12 oy</Option>
                                    <Option value="24">24 oy</Option>
                                </Select>

                            </div>


                        </div>
                    )}


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
                    {categorySelected && (
                        <ProductImages
                            images={images}
                            setImages={setImages}
                        />
                    )}


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




                    <Product360Upload imageFile={imageFile} handleImageUpload={handleImageUpload} />
                    <FeatureSelection
                        selectedFeature={selectedFeature}
                        setSelectedFeature={setSelectedFeature}
                    />
                    <ProductFeatures
                        selectedFeature={selectedFeature}
                        setSelectedFeature={setSelectedFeature}
                        uzbekFeedback={uzbekFeedback}
                        setUzbekFeedback={setUzbekFeedback}
                        russianFeedback={russianFeedback}
                        setRussianFeedback={setRussianFeedback}
                    />

                    <ProductDetails />
                    <ProductCertificates />



                </div>
            </div>
        </div>
    );
}
