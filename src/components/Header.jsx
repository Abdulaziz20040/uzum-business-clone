"use client";
import React from "react";
import { Bell, ChevronDown, User, Store, Key, LogOut } from "lucide-react";
import { Dropdown, Menu } from "antd";

function Header() {
    const menu = (
        <Menu
            items={[
                {
                    key: "1",
                    icon: <User className="w-4 h-4 text-gray-600" />,
                    label: "Akauntni boshqarish",
                },
                {
                    key: "2",
                    icon: <Store className="w-4 h-4 text-gray-600" />,
                    label: "Do‘kon sahifasi",
                },
                {
                    key: "3",
                    icon: <Key className="w-4 h-4 text-gray-600" />,
                    label: "API kalitlar",
                },
                {
                    type: "divider",
                },
                {
                    key: "4",
                    icon: <LogOut className="w-4 h-4 text-red-500" />,
                    label: <span className="text-red-500">Tizimdan chiqish</span>,
                },
            ]}
        />
    );

    return (
        <div className="w-full flex items-center gap-2 justify-end px-6 py-3 bg-white shadow-sm">
            {/* Qo'ng'iroq ikonkasi */}
            <Bell className="w-5 h-5 text-gray-700 cursor-pointer" />

            {/* Profil bo‘limi */}
            <Dropdown menu={menu} trigger={["click"]}>
                <div className="flex items-center ml-6 cursor-pointer">
                    <span className="w-5 h-5 rounded-full bg-green-400 mr-2"></span>
                    <span className="text-gray-800 font-medium">Mening profilim</span>
                    <ChevronDown className="w-5 h-5 text-gray-700 ml-1" />
                </div>
            </Dropdown>
        </div>
    );
}

export default Header;
