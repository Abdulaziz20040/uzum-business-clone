import { Button, Tag } from "antd";

export default function ProductCard({ title, price, status, image }) {
    return (
        <div className="bg-white rounded-xl shadow p-4">
            <img src={image} alt={title} className="w-full h-40 object-cover rounded" />
            <h3 className="font-semibold mt-2">{title}</h3>
            <p className="text-gray-500">Boshlang‘ich narx: {price} so‘m</p>
            <Tag color={status === "Sotuvda" ? "green" : "red"}>{status}</Tag>
            <Button type="primary" className="mt-3 w-full">Targ‘ib qilish</Button>
        </div>
    );
}
