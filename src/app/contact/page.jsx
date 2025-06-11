export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-16 md:px-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
      <form className="space-y-6 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Your Name</label>
          <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-3" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md p-3" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea rows="5" className="mt-1 block w-full border border-gray-300 rounded-md p-3"></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
