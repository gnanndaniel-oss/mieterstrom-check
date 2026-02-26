import Link from "next/link";
import { ShieldAlert, Users, LayoutDashboard, Database, MessageSquare, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 z-[100] flex bg-slate-100 flex-col md:flex-row h-screen">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-slate-900 text-white flex flex-col shrink-0">
                <div className="p-6 flex items-center justify-between md:justify-start gap-3 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <ShieldAlert className="w-6 h-6 text-emerald-400" />
                        <span className="font-bold text-xl">Admin Panel</span>
                    </div>
                    {/* Mobile Close or Menu could go here if needed */}
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </Link>
                    <Link href="/admin/leads" className="flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5" /> Leads
                        </div>
                    </Link>
                    <Link href="/admin/anbieter" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                        <Database className="w-5 h-5" /> Anbieter
                    </Link>
                    <Link href="/admin/anfragen" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                        <MessageSquare className="w-5 h-5" /> Anfragen
                    </Link>
                </nav>
                <div className="p-4 border-t border-slate-800 flex flex-col gap-4">
                    <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                        <LogOut className="w-4 h-4" /> Zurück zur Website
                    </Link>
                    <div className="text-xs text-slate-600 text-center">
                        mieterstrom-check.de
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50 relative">
                {children}
            </div>
        </div>
    );
}
