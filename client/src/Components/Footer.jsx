import React from "react";
import logo from '/assets/Brand_Assets/Text Mark.png'
import { Link } from "react-router-dom";

const footerNavs = [
    {
        href: "javascript:void(0)",
        name: "GitHub"
    },
    {
        href: "javascript:void(0)",
        name: "Documentation"
    },
    {
        href: "www.linkedin.com/in/yaseenthemernstackdeveloper",
        name: "Linkedin"
    },
    {
        href: "https://wa.me/923235973947",
        name: "Contact Developer"
    }
];

const Footer = () => (
    <footer className="pt-10 bg-[#010012] text-gray-300">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="space-y-6 sm:max-w-150 sm:mx-auto sm:text-center">
                <img src={logo} className="w-32 sm:mx-auto" alt="Logo" />
                <p>
                    AI Code Reviewer is an open-source project designed to help developers write cleaner, more reliable code with instant AI feedback.
                    Built for learning, collaboration, and improving code quality — free and open for all.
                </p>
                <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
                    <Link to='/app/codereview'
                    
                        className="block py-2 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
                    >
                        Launch Software
                    </Link>
                    <a
                        href="javascript:void(0)"
                        className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-200 hover:text-white font-medium duration-150 active:bg-gray-800 border border-gray-700 rounded-lg md:inline-flex"
                    >
                        Documentation
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>
            </div>
            <div className="mt-10 py-10 border-t border-gray-700 items-center justify-between sm:flex">
                <p className="text-gray-400">© 2025 Muhammad Yaseen. Released under the MIT License..</p>
                <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
                    {footerNavs.map((item, idx) => (
                        <li key={idx}>
                            <a
                                href={item.href}
                                target="_blank"
                                className="text-gray-300 hover:text-white duration-150"
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </footer>
);

export default Footer;