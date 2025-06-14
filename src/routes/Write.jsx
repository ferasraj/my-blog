import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Write = () => {
  return (
    <>
      <SignedOut>
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
          <h2 className="text-2xl font-semibold mb-4">
            🚫 تحتاج إلى تسجيل الدخول
          </h2>
          <p className="mb-6">
            لعرض هذه الصفحة، يرجى تسجيل الدخول أو إنشاء حساب جديد.
          </p>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition"
            >
              تسجيل الدخول
            </Link>
            <Link
              to="/register"
              className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 transition"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="p-6">✍️ هنا صفحة الكتابة</div>
      </SignedIn>
    </>
  );
};

export default Write;
