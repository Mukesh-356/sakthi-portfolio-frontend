// import React, { useRef, useEffect, useState } from 'react';
// import { gsap } from 'gsap';
// import axios from 'axios';

// const Contact = () => {
//   const formRef = useRef(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const tl = gsap.timeline();
//     tl.fromTo('.contact-heading',
//       { y: 50, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1 }
//     ).fromTo('.contact-form',
//       { x: -50, opacity: 0 },
//       { x: 0, opacity: 1, duration: 0.8 },
//       '-=0.5'
//     ).fromTo('.contact-info',
//       { x: 50, opacity: 0 },
//       { x: 0, opacity: 1, duration: 0.8 },
//       '-=0.5'
//     );
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   e.stopPropagation();
  
//   console.log('🔄 Form submission started...');
//   setIsSubmitting(true);
//   setSubmitStatus('');
//   setErrorMessage('');

//   try {
//     console.log('📤 Sending form data to backend...');
    
//     // Increase timeout to 30 seconds and remove withCredentials
//     const res = await axios.post('http://localhost:5000/api/contact', formData, {
//       timeout: 30000, // 30 seconds timeout
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
    
//     console.log('✅ Backend response received:', res.data);
    
//     if (res.data.success) {
//       setSubmitStatus('success');
//       setFormData({ name: '', email: '', message: '' });
      
//       setTimeout(() => {
//         setSubmitStatus('');
//       }, 5000);
//     } else {
//       setSubmitStatus('error');
//       setErrorMessage(res.data.message || 'Failed to send message.');
//     }
//   } catch (error) {
//     console.error('❌ Form submission error:', error);
    
//     let errorMsg = 'Failed to send message. Please try again.';
    
//     if (error.code === 'ECONNABORTED') {
//       errorMsg = 'Request took too long. But your message might have been sent - please check your email for confirmation.';
//     } else if (error.response) {
//       errorMsg = error.response.data?.message || `Server error: ${error.response.status}`;
//     } else if (error.request) {
//       errorMsg = 'No response from server, but your message might have been sent. Please check your email.';
//     } else {
//       errorMsg = error.message;
//     }
    
//     setSubmitStatus('error');
//     setErrorMessage(errorMsg);
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   return (
//     <div className="min-h-screen pt-20 px-6 py-8">
//       <div className="container mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="contact-heading text-5xl font-bold mb-4">Get In Touch</h1>
//           <p className="text-gray-400 text-xl max-w-2xl mx-auto">
//             Have a project in mind? Let's discuss how we can bring your 3D vision to life.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
//           {/* Contact Form */}
//           <div className="contact-form">
//             <div className="glass-effect p-8 rounded-2xl">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Your Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     disabled={isSubmitting}
//                     className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors disabled:opacity-50"
//                     placeholder="Enter your name"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Email Address *</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     disabled={isSubmitting}
//                     className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors disabled:opacity-50"
//                     placeholder="Enter your email"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">Your Message *</label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     disabled={isSubmitting}
//                     rows="6"
//                     className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors resize-none disabled:opacity-50"
//                     placeholder="Tell me about your project..."
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Sending...
//                     </>
//                   ) : (
//                     'Send Message'
//                   )}
//                 </button>

//                 {/* Status Messages */}
//                 {submitStatus === 'success' && (
//                   <div className="p-4 bg-green-600 rounded-lg text-center animate-pulse">
//                     ✅ Message sent successfully! You will receive a confirmation email shortly.
//                   </div>
//                 )}

//                 {submitStatus === 'error' && (
//                   <div className="p-4 bg-red-600 rounded-lg text-center">
//                     ❌ {errorMessage}
//                     <br />
//                     <span className="text-sm opacity-80">Please check the console for details.</span>
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className="contact-info">
//             <div className="space-y-8">
//               <div className="glass-effect p-8 rounded-2xl">
//                 <h3 className="text-2xl font-bold mb-6">Let's Create Together</h3>
//                 <p className="text-gray-300 mb-6">
//                   I'm always excited to take on new challenges and collaborate on innovative 
//                   3D design projects. Whether you need architectural visualization, product 
//                   modeling, or creative animations, I'm here to help.
//                 </p>
                
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
//                       <span>📧</span>
//                     </div>
//                     <div>
//                       <p className="text-gray-400">Email</p>
//                       <p className="font-semibold">mukesh1152006@gmail.com</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-4">
//                     <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
//                       <span>💼</span>
//                     </div>
//                     <div>
//                       <p className="text-gray-400">Availability</p>
//                       <p className="font-semibold">Open for Projects</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-4">
//                     <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
//                       <span>⚡</span>
//                     </div>
//                     <div>
//                       <p className="text-gray-400">Response Time</p>
//                       <p className="font-semibold">Within 24 Hours</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Services Offered */}
//               <div className="glass-effect p-8 rounded-2xl">
//                 <h4 className="text-xl font-bold mb-4">Services I Offer</h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-slate-800 p-4 rounded-lg text-center">
//                     <p className="font-semibold">3D Modeling</p>
//                   </div>
//                   <div className="bg-slate-800 p-4 rounded-lg text-center">
//                     <p className="font-semibold">Animation</p>
//                   </div>
//                   <div className="bg-slate-800 p-4 rounded-lg text-center">
//                     <p className="font-semibold">Visualization</p>
//                   </div>
//                   <div className="bg-slate-800 p-4 rounded-lg text-center">
//                     <p className="font-semibold">Rendering</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';

const API_BASE_URL = 'https://sakthi-portfolio-backend-production.up.railway.app';

const Contact = () => {
  const formRef = useRef(null);
  const containerRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Advanced animations
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Background elements animation
    tl.fromTo('.floating-element',
      { 
        y: 100, 
        opacity: 0, 
        rotation: 180,
        scale: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        rotation: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: 'back.out(1.7)'
      }
    );

    // Main content entrance
    tl.fromTo('.contact-heading',
      { 
        y: 100, 
        opacity: 0,
        scale: 0.8 
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out'
      },
      '-=1'
    );

    // Form elements staggered entrance
    tl.fromTo('.form-element',
      { 
        x: -100, 
        opacity: 0,
        skewX: 10 
      },
      { 
        x: 0, 
        opacity: 1,
        skewX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      },
      '-=0.5'
    );

    // Info cards entrance
    tl.fromTo('.info-card',
      { 
        x: 100, 
        opacity: 0,
        rotationY: 90 
      },
      { 
        x: 0, 
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      },
      '-=0.3'
    );

    // Continuous floating animations
    floatingElementsRef.current.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          y: index % 2 === 0 ? -20 : 20,
          rotation: index % 2 === 0 ? 5 : -5,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    });

    // Particle animation
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: 4 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2
      });
    });

  }, []);

  // Input focus animations
  const handleInputFocus = (e) => {
    gsap.to(e.target.parentNode, {
      scale: 1.02,
      y: -5,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    gsap.to(e.target, {
      borderColor: '#3b82f6',
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
      duration: 0.3
    });
  };

  const handleInputBlur = (e) => {
    gsap.to(e.target.parentNode, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    gsap.to(e.target, {
      borderColor: '#374151',
      boxShadow: 'none',
      duration: 0.3
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsSubmitting(true);
    setSubmitStatus('');
    setErrorMessage('');

    // Submit animation
    const submitButton = e.target.querySelector('button[type="submit"]');
    gsap.to(submitButton, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    try {
      const res = await axios.post(`${API_BASE_URL}/api/contact`, formData, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (res.data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Success animation
        gsap.to('.success-indicator', {
          scale: 1.2,
          duration: 0.3,
          yoyo: true,
          repeat: 2
        });
        
        setTimeout(() => {
          setSubmitStatus('');
        }, 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(res.data.message || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen pt-20 px-6 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating 3D Shapes */}
        <div 
          ref={el => floatingElementsRef.current[0] = el}
          className="floating-element absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-2xl backdrop-blur-sm border border-blue-400/20"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        ></div>
        <div 
          ref={el => floatingElementsRef.current[1] = el}
          className="floating-element absolute bottom-32 right-32 w-24 h-24 bg-purple-500/10 rounded-full backdrop-blur-sm border border-purple-400/20"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
          }}
        ></div>
        <div 
          ref={el => floatingElementsRef.current[2] = el}
          className="floating-element absolute top-1/2 left-1/3 w-16 h-16 bg-green-500/10 rounded-full backdrop-blur-sm border border-green-400/20"
          style={{
            transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`
          }}
        ></div>

        {/* Animated Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              top: `${20 + i * 10}%`,
              left: `${10 + i * 12}%`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header with Advanced Animation */}
        <div className="text-center mb-16">
          <h1 className="contact-heading text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Let's Connect
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Ready to bring your <span className="text-blue-400 font-semibold">3D vision</span> to life? 
            Let's create something <span className="text-purple-400 font-semibold">extraordinary</span> together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Enhanced Contact Form */}
          <div className="relative">
            <div className="glass-effect p-8 rounded-3xl border border-slate-700 backdrop-blur-xl relative overflow-hidden">
              {/* Form Background Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-50"></div>
              
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="form-element">
                  <label className="block text-sm font-medium mb-3 text-gray-300">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-slate-800/50 rounded-xl border-2 border-slate-700 focus:border-blue-500 focus:outline-none transition-all duration-300 disabled:opacity-50 backdrop-blur-sm text-white placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-element">
                  <label className="block text-sm font-medium mb-3 text-gray-300">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-slate-800/50 rounded-xl border-2 border-slate-700 focus:border-blue-500 focus:outline-none transition-all duration-300 disabled:opacity-50 backdrop-blur-sm text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-element">
                  <label className="block text-sm font-medium mb-3 text-gray-300">Your Project Details *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                    disabled={isSubmitting}
                    rows="6"
                    className="w-full px-6 py-4 bg-slate-800/50 rounded-xl border-2 border-slate-700 focus:border-blue-500 focus:outline-none transition-all duration-300 resize-none disabled:opacity-50 backdrop-blur-sm text-white placeholder-gray-400"
                    placeholder="Describe your project vision, requirements, and timeline..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full form-element bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-5 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Crafting Your Message...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🚀</span>
                        Launch Project Discussion
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Enhanced Status Messages */}
                {submitStatus === 'success' && (
                  <div className="success-indicator p-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-center animate-pulse border border-green-400">
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-2xl">🎉</span>
                      <div>
                        <div className="font-bold">Message Sent Successfully!</div>
                        <div className="text-sm opacity-90">You'll hear back from me within 24 hours</div>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-6 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-center border border-red-400">
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-2xl">⚠️</span>
                      <div>
                        <div className="font-bold">Message Not Sent</div>
                        <div className="text-sm opacity-90">{errorMessage}</div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Enhanced Contact Information */}
          <div className="space-y-8">
            {/* Main Info Card */}
            <div className="info-card glass-effect p-8 rounded-3xl border border-slate-700 backdrop-blur-xl">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Let's Create Magic
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                I specialize in transforming ideas into stunning 3D realities. 
                From concept to final render, let's collaborate to create visual 
                experiences that captivate and inspire.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-5 p-4 bg-slate-800/50 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-xl shadow-lg">
                    📧
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Primary Email</p>
                    <p className="font-semibold text-white">mukesh1152006@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-5 p-4 bg-slate-800/50 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-xl shadow-lg">
                    💼
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Project Status</p>
                    <p className="font-semibold text-white">Available for New Projects</p>
                  </div>
                </div>

                <div className="flex items-center space-x-5 p-4 bg-slate-800/50 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-xl shadow-lg">
                    ⚡
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Response Time</p>
                    <p className="font-semibold text-white">Typically within 6-12 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="info-card glass-effect p-8 rounded-3xl border border-slate-700 backdrop-blur-xl">
              <h4 className="text-2xl font-bold mb-6 text-white">Expert 3D Services</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🏛️', name: 'Architectural Viz', color: 'from-blue-500 to-cyan-500' },
                  { icon: '📱', name: 'Product Design', color: 'from-purple-500 to-pink-500' },
                  { icon: '👤', name: 'Character Modeling', color: 'from-green-500 to-emerald-500' },
                  { icon: '🎬', name: '3D Animation', color: 'from-orange-500 to-red-500' },
                  { icon: '🎨', name: 'Texturing', color: 'from-yellow-500 to-amber-500' },
                  { icon: '💡', name: 'Lighting/Render', color: 'from-indigo-500 to-purple-500' }
                ].map((service, index) => (
                  <div 
                    key={index}
                    className="bg-slate-800/50 p-4 rounded-xl text-center hover:transform hover:scale-105 transition-all duration-300 border border-slate-700 group cursor-pointer"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <p className="font-semibold text-white text-sm">{service.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Timeline */}
            <div className="info-card glass-effect p-8 rounded-3xl border border-slate-700 backdrop-blur-xl">
              <h4 className="text-2xl font-bold mb-6 text-white">Project Process</h4>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Consultation', desc: 'Discuss your vision and requirements' },
                  { step: '02', title: 'Proposal', desc: 'Detailed project plan and timeline' },
                  { step: '03', title: 'Development', desc: 'Create and refine your 3D models' },
                  { step: '04', title: 'Delivery', desc: 'Final files and project completion' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 hover:bg-slate-800/30 rounded-lg transition-colors duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-sm font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{item.title}</div>
                      <div className="text-gray-400 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;