/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ChevronLeft, ChevronRight, Info, Clock, CheckCircle2, LayoutGrid, Search, User, RefreshCw, AlertCircle, Film, Menu, X } from 'lucide-react';
import { INITIAL_DATA, Class, Module } from './types.ts';
import { fetchLessonsFromDrive, DriveFile } from './services/driveService.ts';

declare const google: any;

export default function App() {
  const [selectedClass, setSelectedClass] = useState<Class | null>(INITIAL_DATA[0].classes[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleClassSelect = (cls: Class) => {
    setSelectedClass(cls);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="flex h-screen bg-brand-bg text-brand-text overflow-hidden font-sans text-sm selection:bg-white/10 relative">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 lg:static lg:w-56 flex-shrink-0 bg-brand-sidebar border-r border-white/5 flex flex-col z-40 transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 overflow-y-auto flex-grow h-full custom-scrollbar">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg font-extrabold tracking-tighter text-gray-300 flex items-center gap-2">
              <Film className="w-5 h-5 text-gray-400" />
              STUDIO<span className="font-light">FLIX</span>
            </h1>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 opacity-60 hover:opacity-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {INITIAL_DATA.map((module, idx) => (
              <div key={module.id} className="relative">
                <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider mb-1.5 opacity-60">
                  {module.title}
                </div>
                <div className="space-y-0.5">
                  {module.classes.map((cls) => (
                    <div
                      key={cls.id}
                      onClick={() => handleClassSelect(cls)}
                      className={`group cursor-pointer p-2 rounded transition-all border-l-2 ${
                        selectedClass?.id === cls.id
                          ? 'bg-white/5 border-white/40 shadow-sm'
                          : 'border-transparent hover:bg-white/5 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="text-[12px] font-medium truncate leading-tight">
                        {module.title} / {cls.title}
                      </div>
                      <div className="flex items-center gap-1 text-[9px] text-gray-500 mt-0.5">
                        <Clock className="w-2.5 h-2.5" /> {cls.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-black/20 border-t border-white/5">
          <div className="text-[8px] text-gray-700 font-mono text-center uppercase tracking-tighter">
            v 1.2.1 • Build Stable
          </div>
        </div>
      </aside>

      {/* Main View */}
      <main className="flex-grow flex flex-col overflow-y-auto w-full">
        <div className="max-w-[1600px] mx-auto w-full p-3 sm:p-4 md:p-6 lg:p-10 space-y-4 sm:space-y-6 lg:space-y-8">
          <header className="flex items-center justify-between gap-4 h-10">
            <div className="flex items-center gap-3 min-w-0">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex flex-col sm:flex-row sm:items-center gap-0 lg:gap-2 text-xs min-w-0 font-medium">
                <span className="opacity-40 uppercase font-black tracking-[0.2em] text-[8px] sm:text-[9px] truncate">
                  {INITIAL_DATA.find(m => m.classes.some(c => c.id === selectedClass?.id))?.title}
                </span>
                <span className="opacity-20 hidden sm:inline text-[10px]">/</span>
                <span className="font-extrabold truncate text-[13px] sm:text-[15px] tracking-tight text-gray-100">
                  {selectedClass?.title}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-50" />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12">
            {/* Primary Content (Player + Info) */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="aspect-video bg-black rounded-xl lg:rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] relative border border-white/5">
                <AnimatePresence mode="wait">
                  {selectedClass?.videoUrl ? (
                    <motion.iframe
                      key={selectedClass.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src={selectedClass.videoUrl}
                      className="absolute top-1/2 left-1/2 w-[160%] h-[160%] -translate-x-1/2 -translate-y-[65%] md:w-[135%] md:h-[135%] md:-translate-y-[62%]"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      referrerPolicy="no-referrer"
                      style={{ border: 'none' }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-10">
                      <Film className="w-12 h-12 lg:w-16 h-16" />
                      <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] font-black">Video Unavailable</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              <div className="glass-panel rounded-xl lg:rounded-2xl p-5 sm:p-8 lg:p-10 space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <div className="text-[8px] sm:text-[9px] uppercase font-black text-white/30 tracking-[0.2em]">
                    Abstract Section
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-black tracking-tighter text-gray-100 leading-none">{selectedClass?.title}</h2>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-4xl font-medium">
                  {selectedClass?.description}
                </p>
              </div>
            </div>

            {/* Support Content (Structure + Stats) */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-6 lg:space-y-8">
              <section className="space-y-4">
                <div className="flex items-baseline justify-between border-b border-white/5 pb-4">
                  <h3 className="text-[9px] font-black uppercase tracking-[0.2em] opacity-30">Course Structure</h3>
                  <span className="text-[9px] text-white/20 font-bold">
                    {INITIAL_DATA.find(m => m.classes.some(c => c.id === selectedClass?.id))?.classes.length} LESSONS
                  </span>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                  {INITIAL_DATA.find(m => m.classes.some(c => c.id === selectedClass?.id))?.classes.map(cls => (
                    <motion.div
                      key={cls.id}
                      onClick={() => handleClassSelect(cls)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer group border transition-all duration-300 ${
                        selectedClass?.id === cls.id 
                          ? 'border-white/60 shadow-[0_0_24px_rgba(255,255,255,0.1)]' 
                          : 'border-white/5 hover:border-white/20'
                      }`}
                    >
                      <img src={cls.thumbnail} alt={cls.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="px-1.5 py-0.5 rounded-sm bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-bold text-white/90">
                          {cls.duration}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <div className="space-y-4">
                <div className="glass-panel p-8 rounded-2xl space-y-6 border border-white/5 text-center">
                  <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Module Retention</div>
                  <div className="relative pt-1">
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-white/30 w-[25%] rounded-full transition-all duration-1000" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-black">
                    <span className="text-white/20">PROGRESS</span>
                    <span className="text-white/50 tracking-tighter">25% COMPLETE</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-white/5 flex items-center justify-center gap-3 opacity-20 hover:opacity-50 transition-all cursor-help scale-95 hover:scale-100">
                  <Info className="w-4 h-4" />
                  <span className="text-[9px] uppercase font-black tracking-[0.2em]">Customer Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
