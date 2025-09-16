import { Button, Select } from "antd";
import { useState } from "react";
import { RightOutlined } from '@ant-design/icons';

const { Option } = Select;

export function CategorySelector({ onSubmit }) {
    const [level1, setLevel1] = useState('');
    const [level2, setLevel2] = useState('');
    const [level3, setLevel3] = useState('');
    const [level4, setLevel4] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const categories = {
        electronics: {
            label: 'Elektronika',
            subcategories: {
                phones: {
                    label: 'Telefonlar',
                    subcategories: {
                        smartphones: {
                            label: 'Smartfonlar',
                            subcategories: {
                                iphone: 'iPhone',
                                samsung: 'Samsung',
                                xiaomi: 'Xiaomi'
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
                            label: 'Ko\'ylaklar',
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


    const handleSubmit = () => {
        if (level1 && level2 && level3 && level4) {
            setSubmitted(true);
            onSubmit(); // Qabul qilinganini StepOn ga bildiradi
        }
    };

    const handleEdit = () => setSubmitted(false);

    if (submitted) {
        const path = [
            categories[level1].label,
            categories[level1].subcategories[level2].label,
            categories[level1].subcategories[level2].subcategories[level3].label,
            categories[level1].subcategories[level2].subcategories[level3].subcategories[level4]
        ];

        return (
            <div className="mt-4 flex flex-col gap-2">
                {/* Breadcrumb style */}
                <div className="flex items-center gap-1 flex-wrap text-gray-700 font-medium">
                    {path.map((item, index) => (
                        <span key={index} className="flex items-center gap-1">
                            <span>{item}</span>
                            {index < path.length - 1 && <RightOutlined style={{ fontSize: '12px', color: '#7000FF' }} />}
                        </span>
                    ))}
                </div>

                {/* O'zgartirish tugmasi */}
                <Button
                    onClick={handleEdit}
                    className="mt-2 w-[107.85px] h-[40px]"
                    style={{
                        backgroundColor: "black",
                        color: "white"
                    }}
                >
                    O'zgartirish
                </Button>
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
                onChange={(value) => {
                    setLevel1(value);
                    setLevel2('');
                    setLevel3('');
                    setLevel4('');
                }}
            >
                {Object.entries(categories).map(([key, cat]) => (
                    <Option key={key} value={key}>{cat.label}</Option>
                ))}
            </Select>

            {/* Level 2 */}
            {level1 && (
                <Select
                    className="w-[400px]"
                    placeholder="Ichki toifani tanlang"
                    size="large"
                    value={level2 || undefined}
                    onChange={(value) => {
                        setLevel2(value);
                        setLevel3('');
                        setLevel4('');
                    }}
                >
                    {Object.entries(categories[level1].subcategories).map(([key, cat]) => (
                        <Option key={key} value={key}>{cat.label}</Option>
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
                    onChange={(value) => {
                        setLevel3(value);
                        setLevel4('');
                    }}
                >
                    {Object.entries(categories[level1].subcategories[level2].subcategories).map(([key, cat]) => (
                        <Option key={key} value={key}>{cat.label}</Option>
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
                    {Object.entries(categories[level1].subcategories[level2].subcategories[level3].subcategories).map(([key, label]) => (
                        <Option key={key} value={key}>{label}</Option>
                    ))}
                </Select>
            )}

            {/* Qabul qilish tugmasi */}
            <Button
                className="w-[107.85px] h-[40px]"
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
