import { Button, Select } from "antd";
import { useState } from "react";

export function CategorySelector() {
    const [level1, setLevel1] = useState('');
    const [level2, setLevel2] = useState('');
    const [level3, setLevel3] = useState('');
    const [level4, setLevel4] = useState('');


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
                },
                computers: {
                    label: 'Kompyuterlar',
                    subcategories: {
                        laptops: {
                            label: 'Noutbuklar',
                            subcategories: {
                                gaming: 'Gaming',
                                office: 'Ofis'
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
                },
                womens: {
                    label: 'Ayollar kiyimi',
                    subcategories: {
                        dresses: {
                            label: 'Ko\'ylaklar',
                            subcategories: {
                                summer: 'Yozgi',
                                winter: 'Qishki'
                            }
                        }
                    }
                }
            }
        },
        books: {
            label: 'Kitoblar',
            subcategories: {
                fiction: {
                    label: 'Badiiy adabiyot',
                    subcategories: {
                        novels: {
                            label: 'Romanlar',
                            subcategories: {
                                classic: 'Klassik',
                                modern: 'Zamonaviy'
                            }
                        }
                    }
                },
                technical: {
                    label: 'Texnik kitoblar',
                    subcategories: {
                        programming: {
                            label: 'Dasturlash',
                            subcategories: {
                                javascript: 'JavaScript',
                                python: 'Python'
                            }
                        }
                    }
                }
            }
        }
    };

    const handleLevel1Change = (value) => {
        setLevel1(value);
        setLevel2('');
        setLevel3('');
        setLevel4('');
    };

    const handleLevel2Change = (value) => {
        setLevel2(value);
        setLevel3('');
        setLevel4('');
    };

    const handleLevel3Change = (value) => {
        setLevel3(value);
        setLevel4('');
    };

    const handleLevel4Change = (value) => {
        setLevel4(value);
    };

    const isButtonActive = level1 && level2 && level3 && level4;

    return (
        <div>
            {/* Level 1 */}
            <Select
                placeholder="Toifani tanlang"
                className="w-full max-w-md"
                size="large"
                value={level1}
                onChange={handleLevel1Change}
            >
                {Object.entries(categories).map(([key, category]) => (
                    <Option key={key} value={key}>
                        {category.label}
                    </Option>
                ))}
            </Select>

            {/* Level 2 */}
            {level1 && (
                <Select
                    placeholder="Ichki toifani tanlang"
                    className="w-full max-w-md absolute top-4"
                    size="large"
                    value={level2}
                    onChange={handleLevel2Change}
                >
                    {Object.entries(categories[level1].subcategories).map(([key, subcategory]) => (
                        <Option key={key} value={key}>
                            {subcategory.label}
                        </Option>
                    ))}
                </Select>
            )}

            {/* Level 3 */}
            {level2 && (
                <Select
                    placeholder="Ichki toifani tanlang"
                    className="w-full max-w-md absolute top-8"
                    size="large"
                    value={level3}
                    onChange={handleLevel3Change}
                >
                    {Object.entries(categories[level1].subcategories[level2].subcategories).map(([key, subcategory]) => (
                        <Option key={key} value={key}>
                            {subcategory.label}
                        </Option>
                    ))}
                </Select>
            )}

            {/* Level 4 */}
            {level3 && (
                <Select
                    placeholder="Ichki toifani tanlang"
                    className="w-full max-w-md  absolute top-12"
                    size="large"
                    value={level4}
                    onChange={handleLevel4Change}
                >
                    {Object.entries(categories[level1].subcategories[level2].subcategories[level3].subcategories).map(([key, subcategory]) => (
                        <Option key={key} value={key}>
                            {subcategory}
                        </Option>
                    ))}
                </Select>
            )}

            {/* Submit Button */}
            <div className="mt-20">
                <Button
                    size="large"
                    className={`${isButtonActive
                        ? 'text-white border-0'
                        : 'bg-gray-100 border-gray-300 text-gray-700'
                        }`}
                    style={{
                        backgroundColor: isButtonActive ? '#7000FF' : undefined,
                        color: isButtonActive ? 'white' : undefined,
                    }}
                    disabled={!isButtonActive}
                >
                    Qabul qilish
                </Button>
            </div>
        </div>
    );
}