export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="text-2xl font-bold text-gray-900">Hirevision</div>
        <div className="hidden md:flex space-x-8">
          <a href="/#features" className="text-gray-600 hover:text-gray-900">Features</a>
          <a href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          <a href="/blog" className="text-gray-600 hover:text-gray-900">Blog</a>
        </div>
        <div className="flex space-x-4">
          <a href="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
            Login
          </a>
          <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
            Learn more
          </button>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Request Demo
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 mb-6 text-sm text-blue-600 bg-blue-100 rounded-full">
            <span className="mr-2">🆕</span>
            Create teams in Organisation
          </div>
          <h1 className="mb-6 text-5xl font-bold text-gray-900 leading-tight">
            Boost your hiring process with AI solution
          </h1>
          <p className="mb-8 text-xl text-gray-600 max-w-2xl mx-auto">
            Hirevision is used by numerous businesses, institutions, and recruiters to significantly enhance their screening and recruitment procedures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold">
              Request Demo
            </button>
            <button className="px-8 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
              Learn more
            </button>
          </div>
          <p className="text-gray-500 mb-8">Trusted already by 1.2k+</p>
          <p className="text-lg font-semibold text-gray-700">Already chosen by the world leaders</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-600 font-semibold mb-4">HOW IT WORKS</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Easy implementation in three easy steps
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Cutting-edge, user-friendly AI tool and growth analytics designed to boost user conversion, engagement, and retention.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <p className="text-blue-600 font-semibold mb-2">FEATURE</p>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Automated Candidate Ranking
              </h3>
              <p className="text-gray-600 mb-6">
                Let AI analyze and rank applicants based on qualifications, experience, and skills, ensuring you focus on the most promising candidates first.
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-700">
                Request demo →
              </button>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <p className="text-blue-600 font-semibold mb-2">FEATURE</p>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Real-Time Applicant Analytics
              </h3>
              <p className="text-gray-600 mb-6">
                Get comprehensive insights into candidate performance and interview metrics to make data-driven hiring decisions.
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-700">
                Request demo →
              </button>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <p className="text-blue-600 font-semibold mb-2">FEATURE</p>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Seamless Multilingual Support
              </h3>
              <p className="text-gray-600 mb-6">
                Conduct interviews in multiple languages with AI-powered translation and analysis capabilities.
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-700">
                Request demo →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-600 font-semibold mb-4">METRICS</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-12">Numbers speaking for themselves</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">75%</div>
              <p className="text-gray-600">Candidate match rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">4,000+</div>
              <p className="text-gray-600">Successful placement</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600">Operating countries</p>
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
                "We struggled to find the right talent globally, but with their automated candidate ranking, we quickly identified top-notch candidates who perfectly fit our requirements."
              </p>
              <p className="font-semibold text-gray-900">John Smith, HR Manager at ABC Tech Solutions.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">
                "As a fast-growing startup, we needed an efficient way to find skilled professionals from various regions. This AI tool exceeded our expectations."
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
                <li>Features</li>
                <li>Pricing</li>
                <li>Use case</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Blog</li>
                <li>Apps</li>
                <li>Learn</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Our Story</li>
                <li>Our Team</li>
                <li>Contact Us</li>
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