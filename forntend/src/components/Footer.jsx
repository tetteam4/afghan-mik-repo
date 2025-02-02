import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12" dir="rtl">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        {/* Footer Links */}
        <div className="lg:w-1/3">
          <h4 className="font-bold mb-4">لینک ها</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300">
                صفحه اصلی
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                درباره ما
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                ارتباط با ما
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                حریم خصوصی
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:w-1/3">
          <h4 className="font-bold mb-4">تماس</h4>
          <p>ایمیل: info@afghanmarket.com</p>
          <p>تلفن: +93 777 777 777</p>
        </div>
        {/* Social media links */}
        <div className="lg:w-1/3">
          <h4 className="font-bold mb-4">شبکه های اجتماعی</h4>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>© {new Date().getFullYear()} افغان مارکت. تمامی حقوق محفوظ است.</p>
      </div>
    </footer>
  );
};

export default Footer;
