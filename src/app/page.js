import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const products = [
    {
      title: "Daftar chiziqli, 36 varaq, 5 dona",
      price: 17500,
      status: "Sotuvda",
      image: "/images/daftar.png",
    },
    {
      title: "Rangli qalamlar to‘plami 24 ta",
      price: 19000,
      status: "Sotuvda",
      image: "/images/qalam.png",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Mening tovarlarim</h2>
      <div className="grid grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </div>
  );
}
