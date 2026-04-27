/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ChevronLeft, ChevronRight, Info, Clock, CheckCircle2, LayoutGrid, Search, User, RefreshCw, AlertCircle, Film } from 'lucide-react';
import { INITIAL_DATA, Class, Module } from './types.ts';
import { fetchLessonsFromDrive, DriveFile } from './services/driveService.ts';

declare const google: any;

export default function App() {
  const [selectedClass, setSelectedClass] = useState<Class | null>(INITIAL_DATA[0].classes[0]);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  return (
    <div className="flex h-screen bg-brand-bg text-brand-text overflow-hidden font-sans text-sm selection:bg-white/10">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-brand-sidebar border-r border-white/5 flex flex-col z-20">
        <div className="p-5 overflow-y-auto flex-grow h-full custom-scrollbar">
          <h1 className="text-lg font-extrabold tracking-tighter text-gray-300 mb-6 flex items-center gap-2">
            <Film className="w-5 h-5 text-gray-400" />
            STUDIO<span className="font-light">FLIX</span>
          </h1>

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
                      onClick={() => setSelectedClass(cls)}
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
      <main className="flex-grow flex flex-col p-6 overflow-y-auto">
        <header className="flex items-center justify-between h-8 mb-6">
          <div className="flex items-center gap-2 text-xs">
            <span className="opacity-40 uppercase tracking-widest text-[10px]">
              {INITIAL_DATA.find(m => m.classes.some(c => c.id === selectedClass?.id))?.title}
            </span>
            <span className="opacity-20">/</span>
            <span className="font-bold truncate max-w-[200px]">{selectedClass?.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
              <User className="w-3.5 h-3.5 text-gray-600" />
            </div>
          </div>
        </header>

        {/* Video Stage */}
        <div className="w-full flex-shrink-0 bg-black rounded-xl overflow-hidden shadow-2xl relative mb-6 border border-white/5 group/stage">
          <div className="aspect-video w-full">
            <AnimatePresence mode="wait">
              {selectedClass?.videoUrl ? (
                <motion.iframe
                  key={selectedClass.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={selectedClass.videoUrl}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                  style={{ border: 'none' }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900/50">
                  <Play className="w-10 h-10 text-gray-800 mb-2" />
                  <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Vídeo indisponível</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Info & Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <section className="glass-panel rounded-lg p-5">
              <div className="text-[9px] uppercase font-black text-brand-muted tracking-widest mb-1 opacity-50">
                Class Info
              </div>
              <h2 className="text-xl font-black mb-2 tracking-tighter">{selectedClass?.title}</h2>
              <p className="text-brand-muted text-[11px] leading-relaxed max-w-4xl opacity-80">
                {selectedClass?.description}
              </p>
            </section>

            <section>
              <div className="flex items-baseline justify-between mb-4 border-b border-white/5 pb-2">
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40">Course Structure</h3>
                <span className="text-[9px] text-gray-600 font-mono">
                  {INITIAL_DATA.find(m => m.classes.some(c => c.id === selectedClass?.id))?.classes.length} CLASSES
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {INITIAL_DATA.find(m => m.classes.some(c => c.id === selectedClass?.id))?.classes.map(cls => (
                  <motion.div
                    key={cls.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedClass(cls)}
                    className={`aspect-video rounded overflow-hidden relative cursor-pointer group border transition-all ${
                      selectedClass?.id === cls.id 
                        ? 'border-white/40 bg-white/5' 
                        : 'border-white/5 hover:border-white/10'
                    }`}
                  >
                    <img src={cls.thumbnail} alt={cls.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    {selectedClass?.id === cls.id && (
                      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                    )}
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="glass-panel p-5 rounded-lg text-center space-y-3 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-0.5 bg-white/5" />
              <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Your Progress</div>
              <div className="relative pt-1">
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400 w-[25%] rounded-full transition-all duration-1000" />
                </div>
              </div>
              <div className="flex justify-between items-center text-[9px] font-bold text-gray-500 px-1">
                <span>COMPLETED</span>
                <span className="text-white/40">25%</span>
              </div>
            </div>
            
            <div className="glass-panel p-5 rounded-lg border border-white/5 flex flex-col items-center justify-center gap-2 opacity-30 hover:opacity-50 transition-opacity cursor-help">
              <Info className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-[8px] uppercase font-black tracking-widest">Questions? Support</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
