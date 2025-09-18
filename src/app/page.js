"use client"
import React, { useState, useEffect } from 'react';
import { Search, MoreHorizontal, Grid, List, RefreshCw, Plus, Rocket, Info } from 'lucide-react';
import Link from 'next/link';
import { Select } from 'antd'; // ✅ Antd Select

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("id");
  const [open, setOpen] = useState(false);


  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);
  const handleClick = () => setOpen(!open);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://1b91559cc9edc1c6.mokky.dev/card");
        if (!res.ok) throw new Error("API xatosi!");
        const data = await res.json();

        const savedImages = JSON.parse(localStorage.getItem("productImages")) || {};

        const formattedData = data.map((item) => {
          return {
            id: item.id,
            title: item.nameUz || "Nomi mavjud emas",
            titleRu: item.nameRu || "Название не указано",
            descriptionUz: item.uzbekDescription || "",
            descriptionRu: item.russianDescription || "",
            image:
              (savedImages[item.id] && savedImages[item.id][0]) ||
              (item.images && item.images[0]) ||
              "https://i.pinimg.com/1200x/36/70/c8/3670c849fdbacc33028ec736ec3d6804.jpg",

            // Qo‘shimcha API ma’lumotlar
            sku: item.skuName || `SKU${item.id.toString().padStart(6, "0")}`,
            productId: item.id,
            barcode: item.barcode || "Barcode mavjud emas",
            mxikCode: item.mxikCode || "Mxik code mavjud emas",
            width: item.width || "0",
            length: item.length || "0",
            height: item.height || "0",
            weight: item.weight || "0",
            price: item.price ? `${item.price} so‘m` : "Narx kiritilmagan",
            discount: item.discount || "Chegirma yo'q",
            category: item.categorySelected ? "Kategoriya mavjud" : "Malumotlar yo'q",
            country: item.country || "Mamlakat ko‘rsatilmagan",
            brand: item.brand || "Brend yo'q",
            model: item.model || "Model mavjud emas",
            guarantee: item.guarantee || "Kafolat yo‘q",
            uzbekFeedback: item.uzbekFeedback || "Sharh yo‘q",
            russianFeedback: item.russianFeedback || "Отзывов нет",

            // Statik qiymatlar (hozircha API’da yo‘q)
            status: item.categorySelected ? "Sotuvda" : "Draft",
            statusColor: item.categorySelected ? " border border-gray-400 text-green-400" : "bg-gray-400 text-white",
            rating: "0.00",
            views: item.uzbekFeedback || "0",
            conversion: "0%",
            sold: "0",
            returned: "0",
            damaged: "0",
            moderation: item.categorySelected ? "Tekshirilyabdi" : "Incomplete",
          };
        });

        setProducts(formattedData);
        setFilteredProducts(formattedData);
      } catch (error) {
        console.error("❌ Xatolik:", error);
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


  const formatPrice = (price) => {
    if (!price) return "Narx kiritilmagan";

    const num = parseInt(price, 10);
    if (isNaN(num)) return "Narx kiritilmagan";

    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow w-[431px]">
      {/* Top: Image + Stats */}
      <div className="flex gap-4 mb-3">
        {/* Left: Image */}
        <div className="relative w-[163px] h-[217px] flex-shrink-0">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/120x120?text=Rasm+mavjud+emas"
            }}
          />
        </div>

        {/* Right: Stats and Controls */}
        <div className="flex-1 relative">
          <div className="relative">
            <div className="flex items-center gap-3">
              <button
                className={`text-xs font-medium px-2 py-1 w-[184px] rounded-[6px] ${product.statusColor}`}
              >
                {product.status}
              </button>

              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={handleClick}
                  className="text-black bg-[#f0f2f5] cursor-pointer rounded-[5px] p-1 hover:text-gray-600"
                >
                  <MoreHorizontal size={16} />
                </button>

                {/* Dropdown menu */}
                {open && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <ul className="py-1 text-[13px] text-gray-700">
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => alert("Tavsifni tahrirlash bosildi")}
                        >
                          Tavsifni tahrirlash
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => alert("SKU ni tahrirlash bosildi")}
                        >
                          Sku’ni tahrirlash
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => alert("Xususiyatlarni tahrirlash bosildi")}
                        >
                          Xususiyatlarni tahrirlash
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => alert("Arxivlash bosildi")}
                        >
                          Arxivlash
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Stats section with proper spacing from top controls */}
          <div className="mt-3 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Reyting</span>
              <span className="font-medium">{product.rating}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center gap-1">
                Ko'rishlar
                <Info size={12} className="text-gray-400" />
              </span>
              <span className="font-medium">{product.views}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center gap-1">
                Konversiya
                <Info size={12} className="text-gray-400" />
              </span>
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
              <span className="text-gray-600 flex items-center gap-1">
                Toifa
                <Info size={12} className="text-gray-400" />
              </span>
              <span className="font-medium text-xs">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Saqlash</span>
              <span className="font-medium">Ozod</span>
            </div>
          </div>
        </div>
      </div>

      {/* FBO/FBS Section */}
      <div className="flex gap-4 mb-3">
        <div className="w-[196px] bg-gray-50 rounded-lg p-3 h-[48px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
              FBO
              <Info size={12} className="text-gray-400" />
            </span>
            <span className="text-xs font-medium text-gray-900">{product.fboActive}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Jo'natish uchun</span>
            <span className="text-xs font-medium text-gray-900">{product.fboInactive}</span>
          </div>
        </div>

        <div className="w-[196px] bg-gray-50 rounded-lg p-3 h-[48px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
              FBS
              <Info size={12} className="text-gray-400" />
            </span>
            <span className="text-xs font-medium text-gray-900">{product.fbsActive}</span>
          </div>
        </div>
      </div>

      {/* Product Title */}
      <h3 className="text-sm font-medium text-gray-900 mb-2">{product.title}</h3>

      {/* Moderation and IDs */}
      <div className="text-xs text-[#797D86] mb-3">
        <div className="mb-1">
          Moderatsiya:{" "}
          <span className={`font-medium ${product.moderation === "Tekshirildi" ? "text-green-600" : "text-[#797D86]"}`}>
            {product.moderation}
          </span>
        </div>
        <div>
          ID: <span className="font-medium">{product.productId}</span> SKU:{" "}
          <span className="font-medium">{product.sku}</span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-3 flex items-center gap-3">
        <div className="text-[14px] text-gray-500 mb-1">boshlab</div>
        <div className="text-lg font-semibold text-gray-900">
          {formatPrice(product.price)}
        </div>

      </div>
      <button className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-[#7F4DFF] text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1">
        <span>Targ'ibot qilish imkoni yo'q</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M5.995 15.238a2.93 2.93 0 0 0-1.978.688c-.489.41-.857.986-1.136 1.557a11 11 0 0 0-.665 1.783 17 17 0 0 0-.46 2.134.75.75 0 0 0 .844.843 16.5 16.5 0 0 0 2.134-.46 11 11 0 0 0 1.782-.664c.572-.28 1.146-.647 1.557-1.135.944-1.117.953-2.853-.136-3.928l-.01-.009a2.93 2.93 0 0 0-1.932-.809m-2.56 5.327c.269-.06.57-.134.886-.224a9.6 9.6 0 0 0 1.537-.57c.484-.236.849-.493 1.068-.754l.001-.001c.475-.562.447-1.403-.04-1.888a1.43 1.43 0 0 0-1.904-.055v.001c-.262.22-.518.584-.754 1.068a9.6 9.6 0 0 0-.57 1.537 15 15 0 0 0-.224.886"
            clipRule="evenodd"
          ></path>
          <path
            fillRule="evenodd"
            d="M16.075 4.251a12.1 12.1 0 0 1 5.153-1.482c-.15 2.632-1.167 6.6-5.637 9.602a21.6 21.6 0 0 1-3.408 1.751L9.88 11.819a21.3 21.3 0 0 1 1.752-3.365l.004-.007.02-.032a12.1 12.1 0 0 1 4.419-4.164m-3.325 11.26a23 23 0 0 0 2.771-1.348c.052.247.102.528.14.825.064.491.092 1.007.048 1.478-.044.477-.158.855-.333 1.117-.34.508-1.129.941-1.995 1.256-.222.08-.437.148-.631.205zm-1.23 5.065a.75.75 0 0 0 .614.162h.002a12.4 12.4 0 0 0 1.756-.489c.89-.323 2.1-.89 2.731-1.832l.001-.001c.365-.548.522-1.2.578-1.811a8.4 8.4 0 0 0-.053-1.809 13 13 0 0 0-.269-1.422l-.015-.061C21.964 9.655 22.75 4.787 22.75 2a.75.75 0 0 0-.745-.75 13.63 13.63 0 0 0-11.303 5.889l-.076-.02a13 13 0 0 0-1.423-.268 8.4 8.4 0 0 0-1.808-.054c-.611.057-1.263.214-1.811.579h-.001c-.942.63-1.509 1.841-1.832 2.732a12.4 12.4 0 0 0-.489 1.758.75.75 0 0 0 .738.884h4.69l2.56 2.56V20a.75.75 0 0 0 .27.576M9.011 8.339c.305.039.593.09.845.144Q9.08 9.819 8.491 11.25H4.956c.057-.195.125-.409.205-.63.315-.867.748-1.657 1.256-1.997.262-.174.64-.288 1.117-.332a7 7 0 0 1 1.478.048"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

    </div>
  )


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