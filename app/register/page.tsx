'use client';

import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono flex overflow-hidden">
      
      {/* LEFT PANEL: Contextual Info */}
      <div className="hidden lg:flex flex-col w-[35%] border-r border-neutral-800 p-12 bg-neutral-950 relative">
        <div className="space-y-12 my-auto">
           <div>
             <h1 className="text-4xl font-bold mb-4">INTELLIGENCE<br/>INTAKE</h1>
             <p className="text-sm text-neutral-500 leading-relaxed">
               Generic AI fails in regulated industries. Our consultant applies specialized agents trained on the specific constraints of your sector.
             </p>
           </div>
           
           {/* Decorative List */}
           <ul className="space-y-4 text-xs tracking-widest text-neutral-400">
             <li className="flex items-center gap-4">
               <span className="w-1 h-1 bg-white"></span>
               <span>REGULATORY MAPPING</span>
             </li>
             <li className="flex items-center gap-4">
               <span className="w-1 h-1 bg-white"></span>
               <span>WORKFLOW INTEGRATION</span>
             </li>
             <li className="flex items-center gap-4">
               <span className="w-1 h-1 bg-white"></span>
               <span>ROI FORECASTING</span>
             </li>
           </ul>
        </div>

        <div className="absolute bottom-12 left-12 text-[10px] text-neutral-600 uppercase">
          V.4.0.2 // STABLE
        </div>
      </div>

      {/* RIGHT PANEL: Complex Form Grid */}
      <div className="w-full lg:w-[65%] flex flex-col p-8 lg:p-20 overflow-y-auto">
        
        <div className="max-w-2xl mx-auto w-full">
          <div className="mb-12 flex justify-between items-end border-b border-neutral-800 pb-6">
            <h2 className="text-2xl font-bold">CONFIGURE PROFILE</h2>
            <span className="text-xs text-emerald-500 border border-emerald-500/30 px-2 py-1 bg-emerald-500/10">
              SECURE_CONNECTION
            </span>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            
            {/* Identity Section */}
            <div className="md:col-span-2 text-xs text-neutral-500 border-b border-neutral-900 pb-2 mb-4 uppercase tracking-widest">
              01 // Identity
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider text-neutral-400">First Name</label>
              <input 
                type="text" 
                className="w-full bg-neutral-900/50 border border-neutral-800 p-4 text-sm focus:border-white focus:bg-black transition-all outline-none"
                placeholder="ALEX"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider text-neutral-400">Last Name</label>
              <input 
                type="text" 
                className="w-full bg-neutral-900/50 border border-neutral-800 p-4 text-sm focus:border-white focus:bg-black transition-all outline-none"
                placeholder="CHEN"
              />
            </div>

            {/* Organization Section */}
            <div className="md:col-span-2 text-xs text-neutral-500 border-b border-neutral-900 pb-2 mt-4 mb-4 uppercase tracking-widest">
              02 // Organization
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase tracking-wider text-neutral-400">Work Email</label>
              <input 
                type="email" 
                className="w-full bg-neutral-900/50 border border-neutral-800 p-4 text-sm focus:border-white focus:bg-black transition-all outline-none"
                placeholder="name@company.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider text-neutral-400">Role / Title</label>
              <select className="w-full bg-neutral-900/50 border border-neutral-800 p-4 text-sm focus:border-white focus:bg-black transition-all outline-none appearance-none text-neutral-300">
                <option>CTO / VP Engineering</option>
                <option>Product Manager</option>
                <option>Procurement Lead</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider text-neutral-400">Security Key</label>
              <input 
                type="password" 
                className="w-full bg-neutral-900/50 border border-neutral-800 p-4 text-sm focus:border-white focus:bg-black transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Action Area */}
            <div className="md:col-span-2 mt-8">
              <button className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex justify-between px-6 items-center group">
                <span>Initialize Sequence</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </button>
              
              <p className="text-center mt-6 text-xs text-neutral-500">
                Already have a session ID? <Link href="/login" className="text-white underline">Access Terminal</Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}