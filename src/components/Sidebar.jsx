"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { usePathname } from "next/navigation";
import "../app/globals.css";

// --- SVG Iconlar Component ko'rinishida ---
const IconProducts = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="to-red" opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M5.4515 3.3893C5.99521 2.84017 6.74957 2.5 7.58339 2.5H12.4167C13.2505 2.5 14.0049 2.84017 14.5486 3.3893C14.7175 3.38972 14.8885 3.43295 15.0452 3.52344L18.6807 5.6224C19.159 5.89854 19.3229 6.51013 19.0467 6.98842L17.8332 9.09034C17.5571 9.56863 16.9455 9.7325 16.4672 9.45636L15.4167 8.84988V15.6667C15.4167 16.219 14.969 16.6667 14.4167 16.6667H5.58339C5.0311 16.6667 4.58339 16.219 4.58339 15.6667V8.8504L3.53384 9.45636C3.05555 9.7325 2.44396 9.56863 2.16781 9.09034L0.954271 6.98842C0.678129 6.51013 0.842003 5.89854 1.3203 5.6224L4.9558 3.52344C5.11224 3.43312 5.28294 3.38987 5.4515 3.3893Z" fill="white"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.60097 2.5C8.4338 2.5 8.27768 2.58355 8.18495 2.72265L7.76242 3.35645C7.61522 3.57724 7.66615 3.87458 7.87844 4.0338L9.16672 5L8.36874 10.5858C8.34648 10.7416 8.39888 10.8988 8.51016 11.0101L9.6465 12.1464C9.84176 12.3417 10.1583 12.3417 10.3536 12.1464L11.4899 11.0101C11.6012 10.8988 11.6536 10.7416 11.6314 10.5858L10.8334 5L12.1217 4.0338C12.3339 3.87458 12.3849 3.57724 12.2377 3.35645L11.8151 2.72265C11.7224 2.58355 11.5663 2.5 11.3991 2.5H8.60097Z" fill="white"></path>
    </svg>
);

const IconShipments = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="to-red" opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M6.6668 2.5H5.33347C4.2289 2.5 3.33347 3.39543 3.33347 4.5V17.1667C3.33347 18.2712 4.22889 19.1667 5.33346 19.1667H14.6668C15.7714 19.1667 16.6668 18.2712 16.6668 17.1667V4.5C16.6668 3.39543 15.7714 2.5 14.6668 2.5H13.3335V2.91667C13.3335 3.60702 12.7738 4.16667 12.0835 4.16667H7.9168C7.22644 4.16667 6.6668 3.60702 6.6668 2.91667V2.5Z" fill="white"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8335 1.66659L12.0001 1.66659C12.2763 1.66659 12.5001 1.89044 12.5001 2.16659V2.83325C12.5001 3.10939 12.2763 3.33325 12.0001 3.33325H8.00012C7.72398 3.33325 7.50012 3.10939 7.50012 2.83325V2.16658C7.50012 1.89044 7.72398 1.66659 8.00012 1.66659L9.16679 1.66659C9.16679 1.20635 9.53989 0.833252 10.0001 0.833252C10.4604 0.833252 10.8335 1.20635 10.8335 1.66659Z" fill="white"></path>
        <rect x="8.33347" y="7.5" width="5.83333" height="1.66667" rx="0.833333" fill="white"></rect>
        <rect x="5.83347" y="7.5" width="1.66667" height="1.66667" rx="0.833333" fill="white"></rect>
        <rect x="5.83347" y="10.8333" width="1.66667" height="1.66667" rx="0.833333" fill="white"></rect>
        <rect x="8.33347" y="10.8333" width="5.83333" height="1.66667" rx="0.833333" fill="white"></rect>
        <rect x="5.83347" y="14.1667" width="1.66667" height="1.66667" rx="0.833334" fill="white"></rect>
        <rect x="8.33347" y="14.1667" width="5.83333" height="1.66667" rx="0.833334" fill="white"></rect>
    </svg>
);

const IconFbsDbs = () => (


    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="5" y="6" width="10" height="10" fill="white"></rect>
        <path d="M7.45005 13.4058V11.7058H9.15002V13.4058H7.45005Z" fill="#848689" class="to-red"></path>
        <path d="M10.85 13.4058V11.7058H12.55V13.4058H10.85Z" fill="#848689" class="to-red"></path>
        <path d="M10.85 10.0059V8.30589H9.15002V10.0059H10.85Z" fill="#848689" class="to-red"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4443 0.941895C10.1533 0.863118 9.84667 0.863118 9.55572 0.941895C9.21796 1.03335 8.9336 1.2566 8.70665 1.43478C7.19102 2.62473 5.66792 3.80545 4.14491 4.98609C3.70063 5.3305 3.25636 5.6749 2.81228 6.01953C2.49215 6.26796 2.21011 6.48684 1.99995 6.77099C1.81551 7.02036 1.67811 7.30129 1.5945 7.59998C1.49923 7.94032 1.49962 8.29733 1.50006 8.70255C1.50157 10.1013 1.50108 11.5 1.5006 12.8987C1.50036 13.5887 1.50012 14.2786 1.50012 14.9685C1.5001 15.4166 1.50009 15.8032 1.5261 16.1215C1.55356 16.4576 1.61418 16.7918 1.77805 17.1134C2.02252 17.5932 2.41262 17.9833 2.89242 18.2278C3.21404 18.3917 3.54827 18.4523 3.88431 18.4798C4.6731 18.5442 6.26841 18.4971 6.26841 18.4971L14.0603 18.5057C14.0603 18.5057 15.4344 18.5354 16.1157 18.4798C16.4517 18.4523 16.786 18.3917 17.1076 18.2278C17.5874 17.9833 17.9775 17.5932 18.222 17.1134C18.3858 16.7918 18.4464 16.4576 18.4739 16.1215C18.4999 15.8032 18.4999 15.4166 18.4999 14.9686C18.4999 14.2788 18.4996 13.589 18.4994 12.8992C18.4989 11.5003 18.4985 10.1014 18.4999 8.70256C18.5004 8.29733 18.5008 7.94033 18.4055 7.59998C18.3219 7.30129 18.1845 7.02036 18.0001 6.77099C17.7899 6.48683 17.5078 6.26796 17.1877 6.01952C16.7427 5.67418 16.2975 5.32906 15.8523 4.98395C14.3303 3.80401 12.8082 2.62405 11.2934 1.43478C11.0664 1.2566 10.782 1.03335 10.4443 0.941895ZM8.30003 6.60591C7.8306 6.60591 7.45005 6.98647 7.45005 7.4559V10.0059H6.60006C6.13062 10.0059 5.75007 10.3864 5.75007 10.8559V14.2558C5.75007 14.7252 6.13062 15.1058 6.60006 15.1058H13.4C13.8694 15.1058 14.25 14.7252 14.25 14.2558V10.8559C14.25 10.3864 13.8694 10.0059 13.4 10.0059H12.55V7.4559C12.55 6.98647 12.1694 6.60591 11.7 6.60591H8.30003Z" fill="#848689" class="to-red"></path>
    </svg>
);

const IconLabels = () => (

    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="to-red" opacity="0.3" d="M16.6668 5.83325H3.4486C2.39512 5.83325 1.66681 6.53836 1.66681 7.61475V12.4473C1.66681 13.5065 2.50014 14.1666 3.33348 14.1666L4.44459 14.1666V11.2152C4.44459 10.5451 4.98973 9.99992 5.65986 9.99992H14.3404C15.0106 9.99992 15.5557 10.5451 15.5557 11.2152V14.1666L16.5835 14.1666C17.6369 14.1666 18.3335 13.5001 18.3335 12.4466V7.49992C18.3335 6.48187 17.5001 5.83325 16.6668 5.83325Z" fill="white"></path>
        <path d="M14.3404 10.6943H5.65987C5.37237 10.6943 5.13904 10.9277 5.13904 11.2152V16.4235C5.13904 17.477 5.61334 18.3332 6.66681 18.3332H13.3335C14.387 18.3332 14.8613 17.477 14.8613 16.4235V11.2152C14.8613 10.9277 14.6279 10.6943 14.3404 10.6943ZM7.7432 13.1249H8.78487C9.07237 13.1249 9.3057 13.3582 9.3057 13.6457C9.3057 13.9332 9.07237 14.1666 8.78487 14.1666H7.7432C7.4557 14.1666 7.22237 13.9332 7.22237 13.6457C7.22237 13.3582 7.4557 13.1249 7.7432 13.1249ZM11.5626 16.2499H7.7432C7.4557 16.2499 7.22237 16.0166 7.22237 15.7291C7.22237 15.4416 7.4557 15.2082 7.7432 15.2082H11.5626C11.8501 15.2082 12.0835 15.4416 12.0835 15.7291C12.0835 16.0166 11.8501 16.2499 11.5626 16.2499Z" fill="white"></path>
        <path class="to-red" opacity="0.5" d="M5.00012 3.66675C5.00012 2.56218 5.89555 1.66675 7.00012 1.66675H13.0001C14.1047 1.66675 15.0001 2.56218 15.0001 3.66675V5.00008H5.00012V3.66675Z" fill="#A1A1A1"></path>
    </svg>
);

const IconMarketing = () => (

    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.2657 4.74005C14.7395 4.21395 13.8867 4.21362 13.3602 4.73932L4.79825 13.2881C4.26753 13.818 4.2672 14.6779 4.79751 15.2082C5.32782 15.7385 6.18772 15.7382 6.71762 15.2075L15.2664 6.64554C15.7921 6.11904 15.7918 5.26615 15.2657 4.74005Z" fill="white"></path>
        <path class="to-red" opacity="0.6" fill-rule="evenodd" clip-rule="evenodd" d="M5.77506 8.2142C7.12247 8.2142 8.21429 7.12267 8.21429 5.77373C8.21429 4.42478 7.12247 3.33325 5.77506 3.33325C4.42765 3.33325 3.33334 4.42478 3.33334 5.77373C3.33334 7.12267 4.42765 8.2142 5.77506 8.2142ZM14.2274 16.6666C15.5748 16.6666 16.6667 15.5751 16.6667 14.2261C16.6667 12.8747 15.5748 11.7856 14.2274 11.7856C12.88 11.7856 11.7857 12.8747 11.7857 14.2261C11.7857 15.5751 12.88 16.6666 14.2274 16.6666Z" fill="white"></path>
    </svg>

);

const IconFinances = () => (

    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2319_5177)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.791 12.834C19.5504 12.834 20.166 12.2184 20.166 11.459C20.166 10.6996 19.5504 10.084 18.791 10.084C18.0316 10.084 17.416 10.6996 17.416 11.459C17.416 12.2184 18.0316 12.834 18.791 12.834Z" fill="white"></path>
            <rect x="2.2002" y="4.99609" width="16.5" height="6.41667" rx="1" transform="rotate(-15 2.2002 4.99609)" fill="white"></rect>
            <path class="to-red" fill-rule="evenodd" clip-rule="evenodd" d="M3.83301 3.66797C2.72844 3.66797 1.83301 4.5634 1.83301 5.66797V16.3346C1.83301 17.4392 2.72844 18.3346 3.83301 18.3346H18.1663C19.2709 18.3346 20.1663 17.4392 20.1663 16.3346V14.3599C19.7496 14.5578 19.2834 14.6686 18.7913 14.6686C17.0194 14.6686 15.583 13.2322 15.583 11.4603C15.583 9.68837 17.0194 8.25195 18.7913 8.25195C19.2834 8.25195 19.7496 8.36273 20.1663 8.5607V5.66797C20.1663 4.5634 19.2709 3.66797 18.1663 3.66797H3.83301Z" fill="#666666"></path>
        </g>
        <defs>
            <clipPath id="clip0_2319_5177">
                <rect width="18.3333" height="17.6093" fill="white" transform="translate(1.83301 0.724609)"></rect>
            </clipPath>
        </defs>
    </svg>
);

const IconAnalytics = () => (

    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect class="to-red" opacity="0.6" x="14.1668" y="3.33325" width="2.5" height="10.8333" rx="1.25" fill="white"></rect>
        <rect class="to-red" opacity="0.6" x="10.0001" y="7.5" width="2.5" height="6.66667" rx="1.25" fill="white"></rect>
        <path d="M4.16679 15.8333H16.6668C17.127 15.8333 17.5001 16.2064 17.5001 16.6667C17.5001 17.1269 17.127 17.5 16.6668 17.5H3.33346C2.87322 17.5 2.50012 17.1269 2.50012 16.6667V3.33333C2.50012 2.8731 2.87322 2.5 3.33346 2.5C3.79369 2.5 4.16679 2.8731 4.16679 3.33333V15.8333Z" fill="white"></path>
        <rect class="to-red" opacity="0.6" x="5.83347" y="9.16675" width="2.5" height="5" rx="1.25" fill="white"></rect>
    </svg>
);

// --- Menu ro'yxatlari ---
const topMenu = [
    { name: "Tovarlar", icon: IconProducts, path: "/products" },
    { name: "Yuk xatlari", icon: IconShipments, path: "/shipments" },
    { name: "FBS/DBS", icon: IconFbsDbs, path: "/fbsdbs" },
    { name: "Yorliqlar", icon: IconLabels, path: "/labels" },
    { name: "Marketing", icon: IconMarketing, path: "/marketing" },
];

const bottomMenu = [
    { name: "Mablag'lar", icon: IconFinances, path: "/finances" },
    { name: "Analitika", icon: IconAnalytics, path: "/analytics" },
    // agar Hisobot ikoni ham bo'lsa qo‘shamiz
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    const renderMenu = (items, withDivider = false) => (
        <>
            {withDivider && <div className="border-t border-gray-700 my-2"></div>}
            <ul className="mt-2">
                {items.map((item, i) => {
                    const Icon = item.icon;
                    const active = pathname === item.path;
                    return (
                        <li key={i} className="mb-1">
                            <Link
                                href={item.path}
                                className={`group flex items-center text-white transition-colors
                                    ${collapsed ? "justify-center p-2" : "gap-3 p-3"}
                                    ${active ? "bg-[#2a2b31] text-white" : "hover:bg-[#2a2b31]"}`}
                            >
                                <Icon />
                                {!collapsed && <span>{item.name}</span>}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );

    return (
        <aside className={`h-screen bg-[#1e1f24] text-gray-300 flex flex-col transition-all duration-300 z-40
            ${collapsed ? "w-16" : "w-50"}`}
        >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {!collapsed ? (
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="logo" className="w-24 h-auto" />
                    </div>
                ) : (
                    <button onClick={() => setCollapsed(!collapsed)} className="text-gray-300 hover:text-red-500 mx-auto block">
                        <FiMenu size={22} />
                    </button>
                )}
                {!collapsed && (
                    <button onClick={() => setCollapsed(!collapsed)} className="text-gray-300 hover:text-red-500">
                        <FiMenu size={22} />
                    </button>
                )}
            </div>


            <nav className="flex-1 overflow-y-auto">
                {renderMenu(topMenu)}
                {renderMenu(bottomMenu, true)}
            </nav>
        </aside>
    );
}
