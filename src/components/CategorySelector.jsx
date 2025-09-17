import { Button, Select } from "antd";
import { useState, useEffect } from "react";
import { RightOutlined } from '@ant-design/icons';

const { Option } = Select;

export function CategorySelector({ onSubmit, defaultValues }) {
    const [level1, setLevel1] = useState('');
    const [level2, setLevel2] = useState('');
    const [level3, setLevel3] = useState('');
    const [level4, setLevel4] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (defaultValues && defaultValues.length === 4) {
            setLevel1(defaultValues[0]);
            setLevel2(defaultValues[1]);
            setLevel3(defaultValues[2]);
            setLevel4(defaultValues[3]);
        }
    }, [defaultValues]);

    const categories = {
        stationery: {
            label: 'Kanselyariya tovarlari',
            subcategories: {
                paper: {
                    label: "Qogʻoz mahsulotlari",
                    subcategories: {
                        notebooks: {
                            label: 'Daftarlar',
                            subcategories: {
                                set: "Daftarlar to'plami",
                                spiral: 'Spiral daftar',
                                hardcover: 'Qattiq muqovali daftar'
                            }
                        }
                    }
                }
            }
        },
        clothing: {
            label: 'Kiyim-kechak',
            subcategories: {
                mens: {
                    label: 'Erkaklar kiyimi',
                    subcategories: {
                        shirts: {
                            label: "Ko'ylaklar",
                            subcategories: {
                                casual: 'Kundalik',
                                formal: 'Rasmiy'
                            }
                        }
                    }
                }
            }
        }
    };

    const getLabels = () => ([
        categories[level1].label,
        categories[level1].subcategories[level2].label,
        categories[level1].subcategories[level2].subcategories[level3].label,
        categories[level1].subcategories[level2].subcategories[level3].subcategories[level4]
    ]);

    const handleSubmit = () => {
        if (level1 && level2 && level3 && level4) {
            const labels = getLabels();
            setSubmitted(true);
            onSubmit?.({ keys: [level1, level2, level3, level4], labels });
        }
    };

    const handleEdit = () => {
        setSubmitted(false);
        // tanlangan qiymatlar parentda saqlanib qoladi, shuning uchun qayta ochilganda selectlar to‘liq tanlangan bo‘ladi
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
                                <RightOutlined style={{ fontSize: 12, color: '#9CA3AF' }} className="mx-2" />
                            )}
                        </span>
                    ))}
                </div>
                <div className="mt-2">
                    <Button
                        onClick={handleEdit}
                        style={{ backgroundColor: 'black', color: 'white', border: 'none' }}
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
            <Select
                className="w-[400px]"
                placeholder="Toifani tanlang"
                size="large"
                value={level1 || undefined}
                onChange={(v) => { setLevel1(v); setLevel2(''); setLevel3(''); setLevel4(''); }}
            >
                {Object.entries(categories).map(([k, c]) => <Option key={k} value={k}>{c.label}</Option>)}
            </Select>

            {level1 && (
                <Select
                    className="w-[400px]"
                    placeholder="Ichki toifani tanlang"
                    size="large"
                    value={level2 || undefined}
                    onChange={(v) => { setLevel2(v); setLevel3(''); setLevel4(''); }}
                >
                    {Object.entries(categories[level1].subcategories).map(([k, c]) => <Option key={k} value={k}>{c.label}</Option>)}
                </Select>
            )}

            {level2 && (
                <Select
                    className="w-[400px]"
                    placeholder="Ichki toifani tanlang"
                    size="large"
                    value={level3 || undefined}
                    onChange={(v) => { setLevel3(v); setLevel4(''); }}
                >
                    {Object.entries(categories[level1].subcategories[level2].subcategories).map(([k, c]) => <Option key={k} value={k}>{c.label}</Option>)}
                </Select>
            )}

            {level3 && (
                <Select
                    className="w-[400px]"
                    placeholder="Ichki toifani tanlang"
                    size="large"
                    value={level4 || undefined}
                    onChange={setLevel4}
                >
                    {Object.entries(categories[level1].subcategories[level2].subcategories[level3].subcategories).map(([k, label]) => <Option key={k} value={k}>{label}</Option>)}
                </Select>
            )}

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
