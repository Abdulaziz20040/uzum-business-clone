"use client";
import React from "react";
import { Drawer } from "antd";

function ProductDrawer({ product, onClose }) {
    return (
        <Drawer
            title={product?.title || "Mahsulot ma’lumotlari"}
            placement="right"
            width={400}
            onClose={onClose}
            open={!!product}
        >
            {product ? (
                <div>
                    <img
                        src={product.img}
                        alt={product.title}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <p className="mt-4 text-lg font-semibold">{product.title}</p>
                    <p className="text-gray-500">{product.price}</p>
                    <p className="mt-2">
                        Status:{" "}
                        <span
                            className={`px-2 py-1 text-xs rounded ${product.status === "Sotuvda"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                                }`}
                        >
                            {product.status}
                        </span>
                    </p>
                </div>
            ) : (
                <p>Mahsulot tanlanmadi</p>
            )}
        </Drawer>
    );
}

export default ProductDrawer;
