import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-950 to-gray-900/95 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 mt-12 sm:mt-16 lg:mt-20 border-t border-white/10 backdrop-blur-lg">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h3 className="text-white text-xl sm:text-2xl mb-4 sm:mb-6 font-bold">
            Follow us
          </h3>
          <div className="flex gap-6 sm:gap-8 justify-center">
            <button
              type="button"
              onClick={() => window.open("https://facebook.com", "_blank")}
              className="text-white/60 text-2xl sm:text-3xl hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative group bg-transparent border-0 cursor-pointer"
            >
              <FacebookOutlined />
              <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </button>
            <button
              type="button"
              onClick={() => window.open("https://instagram.com", "_blank")}
              className="text-white/60 text-2xl sm:text-3xl hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative group bg-transparent border-0 cursor-pointer"
            >
              <InstagramOutlined />
              <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </button>
            <button
              type="button"
              onClick={() => window.open("https://twitter.com", "_blank")}
              className="text-white/60 text-2xl sm:text-3xl hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative group bg-transparent border-0 cursor-pointer"
            >
              <TwitterOutlined />
              <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </button>
          </div>
        </div>

        <div className="text-center pt-8 sm:pt-10 border-t border-white/10">
          <p className="text-white/40 m-0 text-xs sm:text-sm">
            &copy; 2026 Fesmic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
