import { Button, Select } from "antd";
import { useState, useEffect } from "react";
import { RightOutlined } from "@ant-design/icons";

const { Option } = Select;

export function CategorySelector({ onSubmit, defaultValues }) {
    const [level1, setLevel1] = useState("");
    const [level2, setLevel2] = useState("");
    const [level3, setLevel3] = useState("");
    const [level4, setLevel4] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (defaultValues && defaultValues.length === 4) {
            setLevel1(defaultValues[0]);
            setLevel2(defaultValues[1]);
            setLevel3(defaultValues[2]);
            setLevel4(defaultValues[3]);
        }
    }, [defaultValues]);

    // Kategoriyalar (massiv emas, tree struktura)
    // categories.js
    // categories.js
    // categories.js
    const categories = [
        {
            id: 10003,
            title: "Aksessuarlar",
            children: [
                {
                    id: 11700,
                    title: "Tog' chang'i sport aksessuarlari",
                    children: [
                        { id: 21001, title: "Ko'zoynaklar" },
                        { id: 21002, title: "Shlyapalar" },
                        { id: 21003, title: "Qo'lqoplar" },
                    ],
                },
                {
                    id: 10023,
                    title: "Ayollar aksessuarlari",
                    children: [
                        {
                            id: 21010,
                            title: "Zargarlik buyumlari",
                            children: [
                                { id: 21011, title: "Sirg'alar" },
                                { id: 21012, title: "Marjonlar" },
                            ],
                        },
                        {
                            id: 21013,
                            title: "Sumkalar",
                            children: [
                                { id: 21014, title: "Kundalik sumkalar" },
                                { id: 21015, title: "Kecha sumkalari" },
                            ],
                        },
                    ],
                },
                {
                    id: 10021,
                    title: "Erkaklar aksessuarlari",
                    children: [
                        {
                            id: 21020,
                            title: "Soatlar",
                            children: [
                                { id: 21021, title: "Klassik soatlar" },
                                { id: 21022, title: "Sport soatlar" },
                            ],
                        },
                        {
                            id: 21023,
                            title: "Belbog'lar",
                            children: [
                                { id: 21024, title: "Charm belbog'lar" },
                                { id: 21025, title: "Matoli belbog'lar" },
                            ],
                        },
                    ],
                },
                {
                    id: 10024,
                    title: "Qizlar uchun aksessuarlar",
                    children: [
                        {
                            id: 21030,
                            title: "Soch buyumlari",
                            children: [
                                { id: 21031, title: "Soch qisqichlar" },
                                { id: 21032, title: "Soch tasmalari" },
                            ],
                        },
                    ],
                },
                {
                    id: 10022,
                    title: "Sayohat uchun aksessuarlar",
                    children: [
                        {
                            id: 21040,
                            title: "Chamadonlar",
                            children: [
                                { id: 21041, title: "Katta chamadonlar" },
                                { id: 21042, title: "Qo‘l chamadonlari" },
                            ],
                        },
                        { id: 21043, title: "Yo‘l yostiqlari" },
                    ],
                },
                {
                    id: 14587,
                    title: "Diniy aksessuarlar",
                    children: [
                        {
                            id: 21050,
                            title: "Tasbehlar",
                            children: [
                                { id: 21051, title: "Yog'och tasbehlar" },
                                { id: 21052, title: "To'qilgan tasbehlar" },
                            ],
                        },
                        { id: 21053, title: "Namoz gilamlari" },
                    ],
                },
                {
                    id: 10026,
                    title: "Oʻgʻil bolalar uchun aksessuarlar",
                    children: [
                        {
                            id: 21060,
                            title: "Shapkalar",
                            children: [
                                { id: 21061, title: "Qishki shapkalar" },
                                { id: 21062, title: "Yozgi shapkalar" },
                            ],
                        },
                        { id: 21063, title: "Kichik ryukzaklar" },
                    ],
                },
            ],
        },
        {
            id: 10014,
            title: "Kiyim",
            children: [
                {
                    id: 10116,
                    title: "Ayollar kiyimi",
                    children: [
                        {
                            id: 22001,
                            title: "Liboslar",
                            children: [
                                { id: 22002, title: "Kundalik liboslar" },
                                { id: 22003, title: "Kechki liboslar" },
                            ],
                        },
                        {
                            id: 22004,
                            title: "Ustki kiyim",
                            children: [
                                { id: 22005, title: "Paltolar" },
                                { id: 22006, title: "Kurtkalar" },
                            ],
                        },
                    ],
                },
                {
                    id: 10052,
                    title: "Erkaklar kiyimi",
                    children: [
                        {
                            id: 22010,
                            title: "Shimlar",
                            children: [
                                { id: 22011, title: "Klassik shimlar" },
                                { id: 22012, title: "Jinsilar" },
                            ],
                        },
                        {
                            id: 22013,
                            title: "Ustki kiyim",
                            children: [
                                { id: 22014, title: "Kurtkalar" },
                                { id: 22015, title: "Palto" },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 10007,
            title: "Bolalar tovarlari",
            children: [
                {
                    id: 23001,
                    title: "Oʻyinchoqlar",
                    children: [
                        { id: 23002, title: "Lego" },
                        { id: 23003, title: "Mashinalar" },
                        { id: 23004, title: "Qoʻgʻirchoqlar" },
                    ],
                },
                {
                    id: 23005,
                    title: "Bolalar kiyimlari",
                    children: [
                        {
                            id: 23006,
                            title: "Yozgi kiyimlar",
                            children: [
                                { id: 23007, title: "Futbolkalar" },
                                { id: 23008, title: "Shortiklar" },
                            ],
                        },
                        {
                            id: 23009,
                            title: "Qishki kiyimlar",
                            children: [
                                { id: 23010, title: "Kurtkalar" },
                                { id: 23011, title: "Shapkalar" },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 10006,
            title: "Dacha, bogʻ va tomorqa",
            children: [
                {
                    id: 24001,
                    title: "Basseynlar va aksessuarlar",
                    children: [
                        {
                            id: 24002,
                            title: "Basseynlar",
                            children: [
                                { id: 24003, title: "Puflama hovuzlar" },
                                { id: 24004, title: "Karkasli hovuzlar" },
                            ],
                        },
                        {
                            id: 24005,
                            title: "Aksessuarlar",
                            children: [
                                { id: 24006, title: "Filtrlar" },
                                { id: 24007, title: "Kimyoviy vositalar" },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 10011,
            title: "Kitoblar",
            children: [
                {
                    id: 10671,
                    title: "Badiiy adabiyot",
                    children: [
                        {
                            id: 25001,
                            title: "Romanlar",
                            children: [
                                { id: 25002, title: "Tarixiy romanlar" },
                                { id: 25003, title: "Fantastik romanlar" },
                            ],
                        },
                        {
                            id: 25004,
                            title: "She’riyat",
                            children: [
                                { id: 25005, title: "Zamonaviy she’rlar" },
                                { id: 25006, title: "Klassik she’rlar" },
                            ],
                        },
                    ],
                },
                {
                    id: 10672,
                    title: "Nobadiiy adabiyot",
                    children: [
                        {
                            id: 25010,
                            title: "Biografiyalar",
                            children: [
                                { id: 25011, title: "Mashhur insonlar" },
                                { id: 25012, title: "Ilm-fan arboblari" },
                            ],
                        },
                        {
                            id: 25013,
                            title: "Psixologiya",
                            children: [
                                { id: 25014, title: "Oila psixologiyasi" },
                                { id: 25015, title: "Shaxsiy rivojlanish" },
                            ],
                        },
                    ],
                },
            ],
        },
    ];




    const findCategory = (list, id) => list.find((c) => c.id === id);

    const getLabels = () => {
        const l1 = findCategory(categories, level1);
        const l2 = l1?.children ? findCategory(l1.children, level2) : null;
        const l3 = l2?.children ? findCategory(l2.children, level3) : null;
        const l4 = l3?.children ? findCategory(l3.children, level4) : null;

        return [l1?.title, l2?.title, l3?.title, l4?.title].filter(Boolean);
    };

    const handleSubmit = () => {
        if (level1 && level2 && level3 && level4) {
            const labels = getLabels();
            setSubmitted(true);
            onSubmit?.({ keys: [level1, level2, level3, level4], labels });
        }
    };

    const handleEdit = () => {
        setSubmitted(false);
    };

    if (submitted) {
        const path = getLabels();
        return (
            <div className="mt-4 flex flex-col gap-2">
                <div className="text-gray-900 text-sm font-normal">
                    {path.map((item, i) => (
                        <span key={i} className="inline-flex items-center">
                            <span>{item}</span>
                            {i < path.length - 1 && (
                                <RightOutlined
                                    style={{ fontSize: 12, color: "#9CA3AF" }}
                                    className="mx-2"
                                />
                            )}
                        </span>
                    ))}
                </div>
                <div className="mt-2">
                    <Button
                        onClick={handleEdit}
                        style={{ backgroundColor: "black", color: "white", border: "none" }}
                        className="w-[120px] h-[40px]"
                    >
                        O'zgartirish
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Level 1 */}
            <Select
                className="w-[400px]"
                placeholder="Toifani tanlang"
                size="large"
                value={level1 || undefined}
                onChange={(v) => {
                    setLevel1(v);
                    setLevel2("");
                    setLevel3("");
                    setLevel4("");
                }}
            >
                {categories.map((c) => (
                    <Option key={c.id} value={c.id}>
                        {c.title}
                    </Option>
                ))}
            </Select>

            {/* Level 2 */}
            {level1 && (
                <Select
                    className="w-[400px]"
                    placeholder="Ichki toifani tanlang"
                    size="large"
                    value={level2 || undefined}
                    onChange={(v) => {
                        setLevel2(v);
                        setLevel3("");
                        setLevel4("");
                    }}
                >
                    {findCategory(categories, level1)?.children?.map((c) => (
                        <Option key={c.id} value={c.id}>
                            {c.title}
                        </Option>
                    ))}
                </Select>
            )}

            {/* Level 3 */}
            {level2 && (
                <Select
                    className="w-[400px]"
                    placeholder="Ichki toifani tanlang"
                    size="large"
                    value={level3 || undefined}
                    onChange={(v) => {
                        setLevel3(v);
                        setLevel4("");
                    }}
                >
                    {findCategory(findCategory(categories, level1)?.children || [], level2)
                        ?.children?.map((c) => (
                            <Option key={c.id} value={c.id}>
                                {c.title}
                            </Option>
                        ))}
                </Select>
            )}

            {/* Level 4 */}
            {level3 && (
                <Select
                    className="w-[400px]"
                    placeholder="Ichki toifani tanlang"
                    size="large"
                    value={level4 || undefined}
                    onChange={setLevel4}
                >
                    {findCategory(
                        findCategory(
                            findCategory(categories, level1)?.children || [],
                            level2
                        )?.children || [],
                        level3
                    )
                        ?.children?.map((c) => (
                            <Option key={c.id} value={c.id}>
                                {c.title}
                            </Option>
                        ))}
                </Select>
            )}

            {/* Submit */}
            <Button
                className="w-[120px] h-[40px]"
                size="large"
                type="primary"
                onClick={handleSubmit}
                disabled={!(level1 && level2 && level3 && level4)}
            >
                Qabul qilish
            </Button>
        </div>
    );
}
