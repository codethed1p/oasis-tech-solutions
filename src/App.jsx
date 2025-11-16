import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

const OasisTechSolutions = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    contactMethod: 'either'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      const response = await fetch('https://formspree.io/f/xeovlbrr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          contactMethod: formData.contactMethod,
          _replyto: formData.email
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            service: '',
            message: '',
            contactMethod: 'either'
          });
        }, 5000);
      } else {
        alert('There was an error sending your message. Please try again or call directly.');
      }
    } catch (error) {
      alert('There was an error sending your message. Please try again or call directly.');
    }
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const Logo = () => (
    <div className="flex items-center gap-3">
      <img src="/logo.png" alt="Oasis Tech Solutions Logo" className="w-12 h-12 lg:w-14 lg:h-14" />
    </div>
  );

  const Navigation = () => (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="px-4 lg:px-12 xl:px-16">
        <div className="flex justify-between items-center h-16 lg:h-24 xl:h-32 gap-4">
          {/* Logo - Left */}
          <button onClick={() => navigateTo('home')} className="flex items-center flex-shrink-0">
            <img src="/logo.png" alt="Oasis Tech Solutions" className="h-12 md:h-16 lg:h-20 xl:h-28" />
          </button>
          
          {/* Navigation - Center (Desktop only) */}
          <div className="hidden md:flex gap-3 lg:gap-8">
            {['home', 'services', 'about', 'contact'].map(page => (
              <button
                key={page}
                onClick={() => navigateTo(page)}
                className={`capitalize font-medium transition-colors text-sm lg:text-base xl:text-lg ${
                  currentPage === page 
                    ? 'text-lime-600' 
                    : 'text-gray-600 hover:text-lime-500'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Contact Button - Right (Desktop only) */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <a href="tel:7608957162" className="flex items-center gap-1 lg:gap-2 text-gray-600 hover:text-lime-600 transition-colors">
              <Phone size={16} className="lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
              <span className="font-medium text-sm lg:text-base xl:text-lg">760-895-7162</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <div className="py-2">
              {['home', 'services', 'about', 'contact'].map(page => (
                <button
                  key={page}
                  onClick={() => navigateTo(page)}
                  className="block w-full text-left px-4 py-3 capitalize hover:bg-gray-50 transition-colors"
                >
                  {page}
                </button>
              ))}
            </div>
            <div className="px-4 pt-2 border-t border-gray-100">
              <a href="tel:7608957162" className="flex items-center gap-2 text-lime-600 font-semibold py-3">
                <Phone size={18} />
                <span>760-895-7162</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div>
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Technology Support You Can Trust
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              Serving Palm Desert and the Coachella Valley with patient, reliable IT help for homes and small businesses.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Whether your computer is running slow, you need help backing up precious photos, or you're struggling with a new printer—we're here to help. At Oasis Tech Solutions, we believe technology should work for you, not frustrate you. We take the time to explain, teach, and solve your tech challenges with care.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigateTo('contact')}
                className="bg-lime-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-lime-700 transition-colors"
              >
                Get Help Today
              </button>
              <button 
                onClick={() => navigateTo('services')}
                className="bg-white text-lime-600 px-8 py-3 rounded-lg font-semibold border-2 border-lime-600 hover:bg-lime-50 transition-colors"
              >
                Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How We Can Help</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Data Backup & Recovery',
                description: 'Never lose another photo, document, or important file. We\'ll set up reliable backup solutions that work automatically—whether in the cloud or on physical drives.'
              },
              {
                title: 'Computer Performance',
                description: 'Is your computer slow or running out of space? We\'ll clean it up, upgrade what\'s needed, and get you running smoothly again.'
              },
              {
                title: 'Security & Protection',
                description: 'Stay safe from scams, viruses, and suspicious websites. We\'ll teach you what to watch for and set up tools like password managers and antivirus software.'
              },
              {
                title: 'Home Security Cameras',
                description: 'Make your security cameras easy to access and understand. We\'ll help you view footage, adjust settings, and keep your home protected.'
              },
              {
                title: 'Printer Setup & Troubleshooting',
                description: 'New printer giving you headaches? We\'ll get it connected, install drivers, and make sure it works with all your devices.'
              },
              {
                title: 'Remote & On-Site Support',
                description: 'Can\'t leave home? No problem. We offer remote support for quick fixes and on-site visits when hands-on help is needed.'
              }
            ].map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-stone-50 to-amber-50 p-6 rounded-lg border border-stone-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button 
              onClick={() => navigateTo('services')}
              className="text-lime-600 font-semibold hover:text-lime-700 inline-flex items-center gap-1"
            >
              See All Services <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Palm Desert Trusts Oasis Tech Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Patient & Clear Communication</h3>
              <p className="text-gray-600">We explain things in ways anyone can understand - no tech jargon. No question is too simple—we're here to teach, not talk down to you.</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl">🏡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Local & Reliable</h3>
              <p className="text-gray-600">We're part of the Coachella Valley community. When you call, you get someone who understands the area and genuinely wants to help.</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Experienced & Skilled</h3>
              <p className="text-gray-600">With 15+ years building computer systems and 8+ years of professional IT experience across multiple business sectors, we have the skills to solve your problems right the first time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-lime-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Solve Your Tech Problems?</h2>
          <p className="text-xl mb-8">Let's get your technology working the way it should. Reach out today for a consultation.</p>
          <button 
            onClick={() => navigateTo('contact')}
            className="bg-white text-lime-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );

  const ServicesPage = () => (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Our Services</h1>
        <p className="text-xl text-gray-600 mb-12">Comprehensive IT support for your home or small business in the Coachella Valley.</p>

        <div className="space-y-12">
          <ServiceSection 
            title="Data Backup & Recovery"
            content={
              <>
                <p className="mb-4">Your digital life is valuable—photos, documents, financial records. Losing them shouldn't be a possibility. We help you set up automatic backup solutions tailored to your needs:</p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">
                  <li>Cloud-based backups (Backblaze, Google Drive, iCloud)</li>
                  <li>Local backup drives (external hard drives, NAS systems)</li>
                  <li>Hybrid solutions for maximum protection</li>
                  <li>Data recovery if something goes wrong</li>
                </ul>
                <p>We'll configure everything and teach you how it works so you have peace of mind.</p>
              </>
            }
          />

          <ServiceSection 
            title="Computer Performance & Upgrades"
            content={
              <>
                <p className="mb-4">A slow computer doesn't mean you need a new one. Often, simple fixes or affordable upgrades can make a huge difference:</p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">
                  <li>Cleanup and optimization (remove unused programs, clear temporary files)</li>
                  <li>Hardware upgrades (more memory, faster storage)</li>
                  <li>Operating system updates and reinstallation if needed</li>
                  <li>Storage management (organize files, free up space, set up external storage)</li>
                </ul>
                <p>We'll assess your computer and recommend the most cost-effective solution.</p>
              </>
            }
          />

          <ServiceSection 
            title="Security & Online Safety"
            content={
              <>
                <p className="mb-4">The internet can be a minefield of scams, phishing emails, and malicious websites. We help you stay protected:</p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">
                  <li>Security awareness training (how to spot scams and phishing attempts)</li>
                  <li>Password manager setup (LastPass, 1Password, Bitwarden)</li>
                  <li>Antivirus and anti-malware installation</li>
                  <li>Safe browsing practices and browser security settings</li>
                  <li>Two-factor authentication setup for important accounts</li>
                </ul>
                <p>Our goal is to make you confident and secure online.</p>
              </>
            }
          />

          <ServiceSection 
            title="Home Security Camera Support"
            content={
              <>
                <p className="mb-4">Security cameras are only useful if you can actually access and use them. We make your security system easy:</p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">
                  <li>Camera system setup and configuration</li>
                  <li>Mobile app installation and training</li>
                  <li>Remote viewing setup (access footage from anywhere)</li>
                  <li>Troubleshooting connectivity issues</li>
                  <li>Recording and storage options (cloud or local)</li>
                </ul>
                <p>You'll know exactly how to check on your home anytime you want.</p>
              </>
            }
          />

          <ServiceSection 
            title="Printer Setup & Troubleshooting"
            content={
              <>
                <p className="mb-4">Printers can be surprisingly complicated. We take the frustration out of the process:</p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">
                  <li>New printer installation (unboxing to first print)</li>
                  <li>Network printer setup (wireless printing from any device)</li>
                  <li>Driver installation and updates</li>
                  <li>Scanning and copying configuration</li>
                  <li>Troubleshooting print quality, paper jams, and error messages</li>
                </ul>
                <p>We'll make sure your printer just works.</p>
              </>
            }
          />

          <ServiceSection 
            title="General Troubleshooting & Training"
            content={
              <>
                <p className="mb-4">Technology problems come in all shapes and sizes. If you're stuck, we can help:</p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">
                  <li>Device troubleshooting (computers, tablets, smartphones)</li>
                  <li>Software installation and updates</li>
                  <li>Email configuration (Outlook, Gmail, Apple Mail)</li>
                  <li>Microsoft 365, Azure, and cloud services setup and administration</li>
                  <li>Smart home device setup (Alexa, Google Home, smart thermostats)</li>
                  <li>One-on-one training for any technology you want to learn</li>
                </ul>
                <p>We'll spend the time you need to understand and fix the issue.</p>
              </>
            }
          />

          <ServiceSection 
            title="Remote & On-Site Support"
            content={
              <>
                <div className="mb-4">
                  <p className="font-semibold mb-2">Remote Support:</p>
                  <p className="text-gray-600">For many issues, we can connect to your computer remotely and fix problems without leaving your home. Fast, convenient, and secure.</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">On-Site Visits:</p>
                  <p className="text-gray-600">When hands-on help is needed—like hardware installation or camera setup—we'll come to you anywhere in the Palm Desert and Coachella Valley area.</p>
                </div>
              </>
            }
          />
        </div>

        <div className="mt-16 bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Not Sure What You Need?</h2>
          <p className="text-gray-600 mb-6">Contact us and describe your tech challenge. We'll figure out the best way to help.</p>
          <button 
            onClick={() => navigateTo('contact')}
            className="bg-lime-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-lime-700 transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );

  const ServiceSection = ({ title, content }) => (
    <div className="border-l-4 border-lime-600 pl-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">{title}</h2>
      <div className="text-gray-600">{content}</div>
    </div>
  );

  const AboutPage = () => (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">About Oasis Tech Solutions</h1>
        <p className="text-xl text-gray-600 mb-12">Technology help from someone who cares about getting it right.</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Hi, I'm Andrew Carpenter, and I started Oasis Tech Solutions to serve the Palm Desert and Coachella Valley community with honest, patient IT support.
          </p>

          <p className="text-gray-600 mb-6">
            I've been building and troubleshooting computer systems for over 15 years, with 8+ years of professional IT experience across multiple business sectors. I've supported hundreds of employees at major companies, helped small businesses solve everyday tech problems, and worked everywhere from manufacturing plants to architectural firms and major technology companies.
          </p>

          <p className="text-gray-600 mb-8">
            But here's what I've learned: the most important part of tech support isn't just fixing the problem—it's making sure you understand what happened and feel confident moving forward.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-900">Why I Do This</h2>
          <p className="text-gray-600 mb-6">
            Living in Palm Desert, I've met so many people who feel overwhelmed by technology. Maybe your computer is acting up and you don't know who to call. Maybe you're worried about losing family photos. Maybe you just want someone to explain things clearly without making you feel like you're asking a dumb question.
          </p>

          <p className="text-gray-600 mb-8">
            That's where I come in. I believe everyone deserves patient, reliable tech help—not rushed service or confusing jargon.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-900">My Approach</h2>
          <p className="text-gray-600 mb-4">When you work with me, you get:</p>
          <ul className="list-disc list-inside space-y-2 mb-8 text-gray-600">
            <li>Clear explanations in ways anyone can understand</li>
            <li>Patient teaching—I'll show you how things work so you can feel more confident</li>
            <li>Honest recommendations—I'll never upsell you something you don't need</li>
            <li>Reliable follow-up—if something isn't working right, I'll make it right</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-gray-900">Background & Credentials</h2>
          <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600">
            <li>15+ years building and troubleshooting computer systems</li>
            <li>8+ years of professional IT experience across multiple business sectors</li>
            <li>Experience with Windows, Mac, iOS, Android, and network systems</li>
            <li>Microsoft 365, Azure, and cloud services setup and administration</li>
          </ul>

          <p className="text-gray-600 mb-8">
            I've worked across manufacturing, architecture, and technology sectors—managing everything from network infrastructure to everyday user support. Now, I'm bringing that experience to serve you.
          </p>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Serving the Coachella Valley</h2>
            <p className="text-gray-600">
              We provide remote and on-site IT support throughout Palm Desert, Rancho Mirage, Indian Wells, La Quinta, Indio, and surrounding areas.
            </p>
          </div>

          <div className="text-center bg-lime-600 text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
            <p className="mb-6">Whether you need help with a specific problem or ongoing tech support, I'm here to help.</p>
            <button 
              onClick={() => navigateTo('contact')}
              className="bg-white text-lime-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => {
  const [localFormData, setLocalFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    contactMethod: 'either'
  });
  const [localFormSubmitted, setLocalFormSubmitted] = useState(false);

  const handleLocalFormChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocalSubmit = async () => {
    if (!localFormData.name || !localFormData.email || !localFormData.phone || !localFormData.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      const response = await fetch('https://formspree.io/f/xeovlbrr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: localFormData.name,
          email: localFormData.email,
          phone: localFormData.phone,
          service: localFormData.service,
          message: localFormData.message,
          contactMethod: localFormData.contactMethod,
          _replyto: localFormData.email
        }),
      });

      if (response.ok) {
        setLocalFormSubmitted(true);
        setTimeout(() => {
          setLocalFormSubmitted(false);
          setLocalFormData({
            name: '',
            email: '',
            phone: '',
            service: '',
            message: '',
            contactMethod: 'either'
          });
        }, 5000);
      } else {
        alert('There was an error sending your message. Please try again or call directly.');
      }
    } catch (error) {
      alert('There was an error sending your message. Please try again or call directly.');
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Get in Touch</h1>
        <p className="text-xl text-gray-600 mb-12">Describe your tech challenge and we'll find the best way to help.</p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Send a Message</h2>
            {localFormSubmitted ? (
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <p className="text-green-800 font-semibold">Thank you for your message!</p>
                <p className="text-green-700 mt-2">We'll respond within 24 hours, usually much sooner.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={localFormData.name}
                    onChange={handleLocalFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={localFormData.email}
                    onChange={handleLocalFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Phone *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={localFormData.phone}
                    onChange={handleLocalFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Service Needed</label>
                  <select 
                    name="service"
                    value={localFormData.service}
                    onChange={handleLocalFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="backup">Data Backup</option>
                    <option value="performance">Computer Performance</option>
                    <option value="security">Security & Protection</option>
                    <option value="cameras">Camera Support</option>
                    <option value="printer">Printer Setup</option>
                    <option value="troubleshooting">General Troubleshooting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Message *</label>
                  <textarea 
                    name="message"
                    rows="4"
                    value={localFormData.message}
                    onChange={handleLocalFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">Preferred Contact Method</label>
                  <div className="space-y-2">
                    {['phone', 'email', 'either'].map(method => (
                      <label key={method} className="flex items-center">
                        <input 
                          type="radio" 
                          name="contactMethod"
                          value={method}
                          checked={localFormData.contactMethod === method}
                          onChange={handleLocalFormChange}
                          className="mr-2"
                        />
                        <span className="capitalize text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={handleLocalSubmit}
                  className="w-full bg-lime-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-lime-700 transition-colors"
                >
                  Send Message
                </button>

                <p className="text-sm text-gray-600 italic">
                  We'll respond within 24 hours, usually much sooner. For urgent issues, please call directly.
                </p>
              </div>
            )}
          </div>

          {/* Rest of ContactPage remains the same */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Phone className="text-lime-600 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <a href="tel:7608957162" className="text-lime-600 hover:text-lime-700">760-895-7162</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-lime-600 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <a href="mailto:contact@oasistechsolutions.net" className="text-lime-600 hover:text-lime-700">
                    contact@oasistechsolutions.net
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-lime-600 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Service Area</p>
                  <p className="text-gray-600">Palm Desert and the Coachella Valley</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-stone-50 to-amber-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold mb-2 text-gray-900">Hours</h3>
              <div className="space-y-1 text-gray-600">
                <p>Monday - Friday: 8 AM - 6 PM</p>
                <p>Saturday: 9 AM - 4 PM</p>
                <p>Sunday: By appointment</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg">
              <h3 className="font-bold mb-3 text-gray-900">Where We Serve</h3>
              <p className="text-gray-600 mb-3">
                Oasis Tech Solutions provides remote and on-site IT support throughout the Coachella Valley, including:
              </p>
              <div className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
                <p>• Palm Desert</p>
                <p>• Rancho Mirage</p>
                <p>• Indian Wells</p>
                <p>• La Quinta</p>
                <p>• Indio</p>
                <p>• Cathedral City</p>
                <p>• Desert Hot Springs</p>
                <p>• Coachella</p>
              </div>
              <p className="text-gray-600 mt-3 italic text-sm">
                Not sure if we serve your area? Contact us and ask!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  const Footer = () => (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src="/logo.png" alt="Oasis Tech Solutions" className="h-16 lg:h-20 mb-4" />
            <p className="text-sm">760-895-7162</p>
            <p className="text-sm">contact@oasistechsolutions.net</p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['home', 'services', 'about', 'contact'].map(page => (
                <button
                  key={page}
                  onClick={() => navigateTo(page)}
                  className="block capitalize hover:text-white transition-colors"
                >
                  {page}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Service Area</h3>
            <p className="text-sm mb-2">Palm Desert & Coachella Valley</p>
            <p className="text-sm font-semibold text-white mb-1">Hours:</p>
            <p className="text-sm">Mon-Fri 8-6, Sat 9-4</p>
            <p className="text-sm">Sun by appointment</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2025 Oasis Tech Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'services' && <ServicesPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      <Footer />
    </div>
  );
};

export default OasisTechSolutions;