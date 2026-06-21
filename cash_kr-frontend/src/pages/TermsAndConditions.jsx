export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-6">Terms & Conditions</h1>
        <div className="prose prose-blue text-gray-600">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mb-4">
            Please read these terms and conditions carefully before using our service. By accessing or using the DeviceKart platform, you agree to be bound by these terms.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Use of the Service</h2>
          <p className="mb-4">
            You must be at least 18 years old to use our service. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Device Sales</h2>
          <p className="mb-4">
            When you sell a device through our platform, you warrant that you are the legal owner of the device and have the right to sell it. The device must not be stolen, counterfeit, or subject to any financing agreements.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Quotations and Payments</h2>
          <p className="mb-4">
            The initial quote provided on our website is an estimate based on the condition you describe. The final price may be adjusted after physical inspection of the device. Payments will be processed promptly after final agreement.
          </p>
        </div>
      </div>
    </div>
  );
}
