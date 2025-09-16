"use client"
import React, { useState, useEffect } from 'react';
import { Search, MoreHorizontal, Grid, List, RefreshCw, Plus, Rocket } from 'lucide-react';
import Link from 'next/link';
import { Select } from 'antd'; // ✅ Antd Select

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("id");

  // 🔹 API'dan ma'lumotlarni olish
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://1b91559cc9edc1c6.mokky.dev/card");
        const data = await res.json();

        // API ma'lumotlarini frontend formatiga o'tkazish
        const formattedData = data.map((item) => {
          const status = determineStatus();
          return {
            id: item.id,
            title: item.nameUz || "Nomi mavjud emas",
            image: extractImageFromDescription(item.uzbekDescription1) || "https://via.placeholder.com/204x271?text=Rasm+mavjud+emas",
            status: status,
            statusColor: getStatusColor(status),
            rating: "0.00",
            views: item.uzbekFeedback || "0",
            conversion: "0%",
            sold: "0",
            returned: "0",
            damaged: "0",
            category: item.categorySelected ? "Kategoriya mavjud" : "Kategoriya mavjud emas",
            productId: item.id,
            sku: `SKU${item.id.toString().padStart(6, '0')}`,
            price: "Narxi mavjud emas",
            moderation: item.categorySelected ? "Tekshirildi" : "Incomplete",
            brand: item.brand || "Brend mavjud emas",
            country: item.country || "Mamlakat mavjud emas",
            guarantee: item.guarantee || "Kafolat mavjud emas"
          };
        });

        setProducts(formattedData);
        setFilteredProducts(formattedData);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };
    fetchProducts();
  }, []);

  // Yordamchi funksiyalar
  const extractImageFromDescription = (description) => {
    if (!description) return null;
    const imgMatch = description.match(/<img[^>]+src="([^"]+)"/);
    return imgMatch ? imgMatch[1] : null;
  };

  const determineStatus = () => {
    const statuses = ["Sotuvda", "Tugagan", "Sotuvda emas"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Sotuvda": return "bg-green-100 text-green-800";
      case "Tugagan": return "bg-red-100 text-red-800";
      case "Sotuvda emas": return "bg-gray-100 text-gray-800";
      case "Bloklangan": return "bg-red-100 text-red-800";
      case "Arxiv": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // 🔹 Tabs countlarni hisoblash
  const tabCounts = {
    all: products.length,
    active: products.filter(p => p.status === "Sotuvda").length,
    ending: products.filter(p => p.status === "Tugagan").length,
    inactive: products.filter(p => p.status === "Sotuvda emas").length,
    blocked: products.filter(p => p.status === "Bloklangan").length,
    archived: products.filter(p => p.status === "Arxiv").length,
    incomplete: products.filter(p => p.moderation === "Incomplete").length,
  };

  const tabs = [
    { key: 'all', label: 'Barcha tovarlar', count: tabCounts.all },
    { key: 'active', label: 'Sotuvdagi', count: tabCounts.active },
    { key: 'ending', label: 'Tugayapti', count: tabCounts.ending },
    { key: 'inactive', label: 'Sotuvda bo\'lmaganlar', count: tabCounts.inactive },
    { key: 'blocked', label: 'Bloklanganlar', count: tabCounts.blocked },
    { key: 'archived', label: 'Arxivdagilar', count: tabCounts.archived },
    { key: 'incomplete', label: 'Xususiyatlar to\'ldirilmagan', count: tabCounts.incomplete },
  ];

  // 🔹 Search + Sort + Tab filter
  useEffect(() => {
    let result = [...products];

    // Tab filter
    if (activeTab === "active") {
      result = result.filter(p => p.status === "Sotuvda");
    } else if (activeTab === "ending") {
      result = result.filter(p => p.status === "Tugagan");
    } else if (activeTab === "inactive") {
      result = result.filter(p => p.status === "Sotuvda emas");
    } else if (activeTab === "blocked") {
      result = result.filter(p => p.status === "Bloklangan");
    } else if (activeTab === "archived") {
      result = result.filter(p => p.status === "Arxiv");
    } else if (activeTab === "incomplete") {
      result = result.filter(p => p.moderation === "Incomplete");
    }

    // Search filter
    if (searchTerm) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortOption === "id") {
      result.sort((a, b) => a.id - b.id);
    } else if (sortOption === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "price") {
      result.sort((a, b) => a.id - b.id); // ID bo'yicha sort qilish, chunki narx yo'q
    } else if (sortOption === "views") {
      result.sort((a, b) => parseInt(b.views) - parseInt(a.views));
    }

    setFilteredProducts(result);
  }, [searchTerm, sortOption, products, activeTab]);

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
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/204x271?text=Rasm+mavjud+emas";
            }}
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
            <span className="font-medium">{product.rating}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Ko'rishlar</span>
            <span className="font-medium">{product.views}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Konversiya</span>
            <span className="font-medium">{product.conversion}</span>
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
            <span className="font-medium text-xs">{product.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Saqlash</span>
            <span className="font-medium">Ozod</span>
          </div>
        </div>
      </div>

      {/* FBO/FBS Section - Rasmda ko'rsatilgandek */}
      <div className="flex gap-4 mb-3 text-xs">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-600 flex items-center gap-1">
              FBO
              <span className="w-3 h-3 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-[8px] text-gray-600">?</span>
              </span>
            </span>
            <span className="font-medium">0</span>
          </div>
          <div className="text-gray-500 text-[10px]">Jo'natish uchun</div>
          <div className="font-medium">0</div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-600 flex items-center gap-1">
              FBS
              <span className="w-3 h-3 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-[8px] text-gray-600">?</span>
              </span>
            </span>
            <span className="font-medium">0</span>
          </div>
          <div className="text-gray-500 text-[10px]">Jo'natish uchun</div>
          <div className="font-medium">0</div>
        </div>
      </div>

      {/* Product Title */}
      <h3 className="text-sm font-medium text-gray-900 mb-2">
        {product.title}
      </h3>

      {/* Moderation and IDs */}
      <div className="text-xs text-gray-600 mb-3">
        <div className="mb-1">
          Moderatsiya: <span className={`font-medium ${product.moderation === 'Tekshirildi' ? 'text-green-600' : 'text-orange-600'}`}>
            {product.moderation}
          </span>
        </div>
        <div>
          ID: <span className="font-medium">{product.productId}</span> | SKU: <span className="font-medium">{product.sku}</span>
        </div>
      </div>

      {/* Price and Button */}
      <div className="flex justify-between items-end">
        <div>
          <div className="text-xs text-gray-500 mb-1">boshlab</div>
          <div className="text-lg font-semibold text-gray-900">{product.price}</div>
        </div>
        <button className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-600 text-xs font-medium rounded-md transition-colors flex items-center gap-1">
          <span>Tovarni targ'ibot qilish</span>
          <Rocket size={12} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-[93.70vh] bg-[#e6e8ed] flex flex-col">
      {/* Header */}
      <div className="bg-[#ffffff] px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Mening tovarlarim</h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg bg-white">
              <RefreshCw size={16} />
              Narxlarni yangilash
            </button>
            <Link href={"/creatProduct"}>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                <Plus size={16} />
                Tovar kartochkasini yaratish
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-[#e6e8ed] px-6">
          {/* Tabs */}
          <div className="flex items-center gap-1 mb-4 mt-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === tab.key ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                {tab.label} {tab.count > 0 && <span className="ml-1">({tab.count})</span>}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Select
                value={sortOption}
                onChange={setSortOption}
                style={{ width: 200 }}
                options={[
                  { value: 'id', label: 'Karta raqami bo\'yicha' },
                  { value: 'title', label: 'Nom bo\'yicha' },
                  { value: 'price', label: 'Narx bo\'yicha' },
                  { value: 'views', label: 'Ko\'rishlar bo\'yicha' },
                ]}
              />
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

          {/* Products */}
          <div className={`pb-6 ${viewMode === 'grid' ? 'grid grid-cols-3 gap-6' : 'space-y-4'}`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;