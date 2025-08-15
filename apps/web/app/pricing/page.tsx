export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="text-2xl font-bold text-gray-900">
          <a href="/">Hirevision</a>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-600 hover:text-gray-900">Features</a>
          <a href="/pricing" className="text-blue-600 font-semibold">Pricing</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          <a href="/blog" className="text-gray-600 hover:text-gray-900">Blog</a>
        </div>
        <div className="flex space-x-4">
          <a href="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
            Login
          </a>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Request Demo
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-600 font-semibold mb-4">PRICING</p>
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            Pick a plan, start free.
          </h1>
          <p className="mb-12 text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your ideal plan. No obligation, cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-2">STARTER</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$19</span>
                <span className="text-gray-600">/mo</span>
              </div>
              <p className="text-gray-600 mb-6">What's included:</p>
              <ul className="space-y-3 mb-8">
                <li className="text-gray-600">For individuals</li>
                <li className="text-gray-600">1,000 API Calls/month</li>
                <li className="text-gray-600">Email customer support</li>
                <li className="text-gray-600">Storage 500MB</li>
                <li className="text-gray-600">AI Models: 5/month</li>
              </ul>
              <button className="w-full px-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 border-2 border-blue-600 rounded-lg shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  POPULAR
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">PRO</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-600">/mo</span>
              </div>
              <p className="text-gray-600 mb-6">What's included:</p>
              <ul className="space-y-3 mb-8">
                <li className="text-gray-600">2-10 Members</li>
                <li className="text-gray-600">10,000 API Calls/month</li>
                <li className="text-gray-600">Chat customer support</li>
                <li className="text-gray-600">Storage 1GB</li>
                <li className="text-gray-600">AI Models: 15/month</li>
              </ul>
              <button className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold">
                Get Started
              </button>
            </div>

            {/* Team Plan */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-2">TEAM</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$49</span>
                <span className="text-gray-600">/mo</span>
              </div>
              <p className="text-gray-600 mb-6">What's included:</p>
              <ul className="space-y-3 mb-8">
                <li className="text-gray-600">10+ Members</li>
                <li className="text-gray-600">100,000 API Calls/month</li>
                <li className="text-gray-600">Phone customer support</li>
                <li className="text-gray-600">Storage 5GB</li>
                <li className="text-gray-600">AI Models: 25/month</li>
              </ul>
              <button className="w-full px-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">FAQ</h2>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-12">We've got you covered</h3>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Does this app offer a free trial period?</h4>
              <p className="text-gray-600">
                All individual Framer subscriptions have been grandfathered into a Pro plan at your existing rate. 
                If you were on a Small Team plan, then all 5 seats have been converted over to Pro seats at your existing rate.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you offer?</h4>
              <p className="text-gray-600">We accept all major credit cards and PayPal for your convenience.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">How much does a subscription cost?</h4>
              <p className="text-gray-600">Our plans start at $19/month for individuals and scale with your team size and needs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">What is your refund policy?</h4>
              <p className="text-gray-600">We offer a 30-day money-back guarantee if you're not satisfied with our service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-600 font-semibold mb-4">TESTIMONIALS</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Don't take our word for it</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">
                "We struggled to find the right talent globally, but with their automated candidate ranking, we quickly identified top-notch candidates."
              </p>
              <p className="font-semibold text-gray-900">John Smith, HR Manager at ABC Tech Solutions.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">
                "As a fast-growing startup, we needed an efficient way to find skilled professionals. This AI tool exceeded our expectations."
              </p>
              <p className="font-semibold text-gray-900">Sarah Johnson, CEO of XYZ Innovations.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">
                "The platform's emphasis on diversity and inclusion impressed me, helping us create a more inclusive workforce."
              </p>
              <p className="font-semibold text-gray-900">Michael Chen, HR Director at Acme Enterprises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Sales */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Not finding what you're looking for?</h3>
          <button className="px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold">
            Contact Sales
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Make a lasting impression with Hirevision</h2>
          <p className="text-xl mb-8">
            Discover why hiring managers prefer Hirevision over the competition and what makes it the easiest, 
            most powerful video interviewing platform on the market
          </p>
          <button className="px-8 py-3 text-blue-600 bg-white rounded-lg hover:bg-gray-100 font-semibold">
            Duplicate in Framer
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Hirevision</h3>
              <p className="text-gray-400">Significantly enhance your screening and recruitment procedures.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/">Features</a></li>
                <li><a href="/pricing">Pricing</a></li>
                <li>Use case</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/blog">Blog</a></li>
                <li>Apps</li>
                <li>Learn</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Our Story</li>
                <li>Our Team</li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
            <p className="text-gray-400">Hirevision • Copyright © 2023</p>
            <div className="flex space-x-4 text-gray-400">
              <span>Terms of service</span>
              <span>Privacy policy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 