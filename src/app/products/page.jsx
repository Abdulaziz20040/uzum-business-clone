"use client"
import React, { useState } from 'react';
import { Search, MoreHorizontal, Grid, List, RefreshCw, Plus, Rocket, Info } from 'lucide-react';

const ProductManagement = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [viewMode, setViewMode] = useState('grid');

    const tabs = [
        { key: 'all', label: 'Barcha tovarlar', count: 6, active: true },
        { key: 'active', label: 'Sotuvdagi', count: 3, active: false },
        { key: 'ending', label: 'Tugayapti', count: 0, active: false },
        { key: 'inactive', label: 'Sotuvda bo\'lmaganlar', count: 3, active: false },
        { key: 'blocked', label: 'Bloklanganlar', count: 0, active: false },
        { key: 'archived', label: 'Arxivdagilar', count: 0, active: false },
        { key: 'incomplete', label: 'Xususiyatlar to\'ldirilmagan', count: 0, active: false },
    ];

    const products = [
        {
            id: 1,
            title: 'Daftar chiziqli, 36 varaq, 5 dona',
            price: '100 000 so\'m',
            status: 'Sotuvda',
            statusColor: 'bg-green-100 text-green-600',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=140&fit=crop',
            rating: 0.00,
            views: 75,
            conversion: '2.67%',
            sold: 3,
            returned: 0,
            damaged: 0,
            category: 'Ma\'lumotlar yo\'q',
            moderation: 'Tasdiqlangan',
            sku: 'ONATILI',
            productId: '1890410',
            fboCount: 1,
            fbsCount: 0,
            canPromote: true,
        },
        {
            id: 2,
            title: 'Rangli uchburchak qalamlar to\'plami 24 ta rang',
            price: '110 000 so\'m',
            status: 'Sotuvda',
            statusColor: 'bg-green-100 text-green-600',
            image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=140&fit=crop',
            rating: 0.00,
            views: 23,
            conversion: '4.35%',
            sold: 1,
            returned: 0,
            damaged: 0,
            category: 'Ma\'lumotlar yo\'q',
            moderation: 'Tasdiqlangan',
            sku: 'QALAM',
            productId: '1888631',
            fboCount: 3,
            fbsCount: 0,
            canPromote: true,
        },
        {
            id: 3,
            title: 'Maktab uchun to\'plam "Aqilli Start"',
            price: '90 so\'m',
            status: 'Tugadi',
            statusColor: 'bg-gray-100 text-gray-600',
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=140&fit=crop',
            rating: 0.00,
            views: 8,
            conversion: '12.5%',
            sold: 5,
            returned: 0,
            damaged: 0,
            category: 'A',
            moderation: 'Tasdiqlangan',
            sku: 'SET',
            productId: '1888529',
            fboCount: 0,
            fbsCount: 0,
            canPromote: false,
        },
        {
            id: 4,
            title: 'Penal',
            price: '85 000 so\'m',
            status: 'Tugadi',
            statusColor: 'bg-gray-100 text-gray-600',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=140&fit=crop',
            rating: 0.00,
            views: 79,
            conversion: '1.27%',
            sold: 1,
            returned: 0,
            damaged: 0,
            category: 'Ma\'lumotlar yo\'q',
            moderation: 'Tasdiqlangan',
            sku: 'PENAL',
            productId: '1887234',
            fboCount: 0,
            fbsCount: 0,
            canPromote: false,
        },
        {
            id: 5,
            title: 'Kitoblar to\'plami',
            price: '120 000 so\'m',
            status: 'Tugadi',
            statusColor: 'bg-gray-100 text-gray-600',
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=140&fit=crop',
            rating: 0.00,
            views: 54,
            conversion: '1.85%',
            sold: 1,
            returned: 0,
            damaged: 0,
            category: 'Ma\'lumotlar yo\'q',
            moderation: 'Tasdiqlangan',
            sku: 'BOOKS',
            productId: '1886123',
            fboCount: 0,
            fbsCount: 0,
            canPromote: false,
        },
        {
            id: 6,
            title: 'Office mahsulotlari to\'plami',
            price: '75 000 so\'m',
            status: 'Sotuvda',
            statusColor: 'bg-green-100 text-green-600',
            image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=200&h=140&fit=crop',
            rating: 0.00,
            views: 136,
            conversion: '2.21%',
            sold: 3,
            returned: 0,
            damaged: 0,
            category: 'Ma\'lumotlar yo\'q',
            moderation: 'Tasdiqlangan',
            sku: 'OFFICE',
            productId: '1885987',
            fboCount: 0,
            fbsCount: 0,
            canPromote: true,
        },
    ];


    const ProductCard = ({ product }) => (
        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            {/* Top: Image + Info */}
            <div className="flex gap-4 mb-3">
                {/* Left: Image */}
                <div className="relative w-[204px] h-[271px] flex-shrink-0">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <span className={`absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded ${product.statusColor}`}>
                        {product.status}
                    </span>
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={16} />
                    </button>
                </div>

                {/* Right: Product Info */}
                <div className="flex-1 space-y-1 text-xs">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Reyting</span>
                        <span className="font-medium">{product.rating.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Ko'rishlar</span>
                        <div className="flex items-center gap-1">
                            <span className="w-3 h-3 bg-gray-300 rounded-full flex items-center justify-center text-white" style={{ fontSize: '8px' }}>i</span>
                            <span className="font-medium">{product.views}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Konversiya</span>
                        <div className="flex items-center gap-1">
                            <span className="w-3 h-3 bg-gray-300 rounded-full flex items-center justify-center text-white" style={{ fontSize: '8px' }}>i</span>
                            <span className="font-medium">{product.conversion}</span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Sotilgan</span>
                        <span className="font-medium">{product.sold}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Qaytarilgan</span>
                        <span className="font-medium">{product.returned}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Yaroqsiz</span>
                        <span className="font-medium">{product.damaged}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Toifa</span>
                        <div className="flex items-center gap-1">
                            <span className="w-3 h-3 bg-gray-300 rounded-full flex items-center justify-center text-white" style={{ fontSize: '8px' }}>i</span>
                            <span className="font-medium">{product.category}</span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Saqlash</span>
                        <span className="font-medium">Ozod</span>
                    </div>
                </div>
            </div>

            {/* FBO/FBS Gray Section */}
            <div className="flex items-center justify-between text-xs bg-gray-50 rounded-md px-3 py-2 mb-3">
                <div className="flex items-center gap-2">
                    <span>FBO</span>
                    <span className="text-gray-500">Jo'natish uchun</span>
                    <div className="flex items-center gap-1">
                        <span className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">
                            {product.fboCount}
                        </span>
                        <span className="font-medium">{product.fboStock}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span>FBS</span>
                    <div className="flex items-center gap-1">
                        <span className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
                            {product.fbsCount}
                        </span>
                    </div>
                </div>
            </div>

            {/* Product Title */}
            <h3 className="text-sm font-medium text-gray-900 mb-2">
                {product.title}
            </h3>

            {/* Moderation and IDs */}
            <div className="text-xs text-gray-600 mb-3">
                <div className="mb-1">
                    Moderatsiya: <span className="text-green-600 font-medium">{product.moderation}</span>
                </div>
                <div>
                    ID: <span className="font-medium">{product.productId}</span> | SKU: <span className="font-medium">{product.sku}</span>
                </div>
            </div>

            {/* Price and Button */}
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-xs text-gray-500 mb-1">boshlab</div>
                    <div className="text-lg font-semibold text-gray-900">{product.price} so'm</div>
                </div>
                <button className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-600 text-xs font-medium rounded-md transition-colors flex items-center gap-1">
                    <span>Tovarni targ'ibot qilish</span>
                    <Rocket size={12} />
                </button>
            </div>
        </div>
    );


    return (
        <div className="h-[90vh] bg-[#e6e8ed] flex flex-col">
            {/* Header */}
            <div className="bg-[#ffffff] px-6 py-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Mening tovarlarim</h1>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg bg-white">
                            <RefreshCw size={16} />
                            Narxlarni yangilash
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                            <Plus size={16} />
                            Tovar kartochkasini yaratish
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="bg-[#e6e8ed] px-6">
                    {/* Tabs */}
                    <div className="flex items-center gap-1 mb-4 mt-4 overflow-x-auto">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors ${index === 0 ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.label} {tab.count > 0 && <span className="ml-1">{tab.count}</span>}
                            </button>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Ism, SKU yoki shtrix-kod bo'yicha izlash"
                                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
                                <option>Karta raqami bo'yicha</option>
                                <option>Nom bo'yicha</option>
                                <option>Narx bo'yicha</option>
                                <option>Ko'rishlar bo'yicha</option>
                            </select>

                            <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                                >
                                    <List size={16} />
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                                >
                                    <Grid size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products: 3 in row */}
                    <div className={`pb-6 ${viewMode === 'grid' ? 'grid grid-cols-3 gap-6' : 'space-y-4'}`}>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;
