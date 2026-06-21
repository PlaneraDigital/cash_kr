export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-6">Privacy Policy</h1>
        <div className="prose prose-blue text-gray-600">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mb-4">
            At DeviceKart, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information when you use our website and services.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you create or modify your account, request services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, and device details.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            We may use the information we collect to provide, maintain, and improve our services, including processing your transactions and sending you related information such as confirmations and invoices.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at support@devicekart.example.com.
          </p>
        </div>
      </div>
    </div>
  );
}
