export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-1">
          {title}
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          {subtitle}
        </p>

        {children}
      </div>
    </div>
  );
}
