import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-slate-800 font-sans antialiased selection:bg-green-100 selection:text-[#2E7D32]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
