const Contactus = () => {
  return (
    <div className="max-w-[600px] mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold text-slate-title mb-2">Contact Us</h1>
      <p className="text-slate-muted mb-8">
        We'd love to hear from you. Send us a message and we'll respond as soon
        as possible.
      </p>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-slate-body mb-1.5">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-3 border border-slate-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-swiggy-orange/30 focus:border-swiggy-orange transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-body mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-slate-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-swiggy-orange/30 focus:border-swiggy-orange transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-body mb-1.5">
            Message
          </label>
          <textarea
            rows="4"
            placeholder="How can we help?"
            className="w-full px-4 py-3 border border-slate-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-swiggy-orange/30 focus:border-swiggy-orange transition-all resize-none"
          />
        </div>
        <button
          type="submit"
          className="bg-swiggy-orange text-white font-semibold text-sm px-8 py-3 rounded-lg hover:bg-swiggy-orange-dark transition-colors shadow-button active:scale-[0.98]"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};
export default Contactus;
