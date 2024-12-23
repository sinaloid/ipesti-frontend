/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export const DropDown = ({ menu, link = "content"}) => {
    const src = "/" + link + "/";
    const [lang, setLang] = useState(localStorage.getItem("lang") || "FR");

    useEffect(() => {
        const storedLang = localStorage.getItem("lang");
        if (storedLang && storedLang !== lang) {
            setLang(storedLang);
        }
    }, [lang]);

    return (
        <ul
            className="dropdown-menu bg-dropdown mt-2"
            aria-labelledby="navbarDropdownMenuLink"
        >
            {menu.map((dataOne, idx) => (
                <li key={idx}>
                    <a
                        className="dropdown-item text-white"
                        href={src + dataOne.slug}
                    >
                        {lang === "en" ? dataOne.titre_en : dataOne.titre}
                    </a>
                </li>
            ))}
        </ul>
    );
};
