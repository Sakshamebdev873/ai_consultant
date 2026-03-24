'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllReports, getReportById } from '../../hooks/useReportForm';

type ViewState = 'list' | 'detail';

export default function ReportsDashboard() {
  // ─── UI & Data State ───
  const [view, setView] = useState<ViewState>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [reports, setReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);

  // ─── Fetch All Reports on Load ───
  useEffect(() => {
    loadReportsList();
  }, []);

  const loadReportsList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllReports();
      setReports(data);
      setView('list');
    } catch (err: any) {
      setError(err.message || 'Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  };

  const loadReportDetail = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getReportById(id);
      setSelectedReport(data);
      setView('detail');
    } catch (err: any) {
      setError(err.message || 'Failed to load report details');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-indigo-500/30">
      
      {/* ─── HEADER ─── */}
      <header className="border-b border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">
              {view === 'list' ? 'Reports' : 'Report Details'}
            </h1>
          </div>
          <Link 
            href="/consultation" 
            className="bg-zinc-100 text-zinc-900 hover:bg-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors shadow-sm"
          >
            New Consultation
          </Link>
        </div>
      </header>

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-300 rounded-full animate-spin"></div>
            <p className="text-sm text-zinc-500">Loading data...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-6 text-center max-w-lg mx-auto">
            <h3 className="text-red-400 font-medium mb-2">Failed to load</h3>
            <p className="text-zinc-400 text-sm mb-4">{error}</p>
            <button 
              onClick={loadReportsList} 
              className="bg-zinc-800 text-zinc-200 hover:bg-zinc-700 px-4 py-2 rounded-md text-sm transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ════════ VIEW: LIST ALL REPORTS ════════ */}
        {!isLoading && !error && view === 'list' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {reports.length === 0 ? (
              <div className="border border-dashed border-zinc-800 rounded-2xl p-16 text-center flex flex-col items-center justify-center">
                <div className="bg-zinc-900 p-4 rounded-full mb-4">
                  <svg className="w-6 h-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>
                <h3 className="text-lg font-medium text-zinc-200 mb-1">No reports generated yet</h3>
                <p className="text-zinc-500 text-sm max-w-sm mb-6">Create your first AI consultation to start analyzing your battery production workflows.</p>
                <Link href="/consultation" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                  Start a consultation →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((r) => (
                  <div 
                    key={r.id} 
                    onClick={() => loadReportDetail(r.id)}
                    className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 hover:bg-zinc-800/50 hover:border-zinc-700 cursor-pointer transition-all group flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-medium text-zinc-500 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                        {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-xs font-medium text-indigo-400/80">
                        Score: {r.confidence_score}%
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-zinc-100 mb-2 leading-tight group-hover:text-indigo-300 transition-colors">
                      {r.problem_domain || 'Unclassified Domain'}
                    </h3>
                    
                    <p className="text-sm text-zinc-400 mb-6 flex-1 line-clamp-2">
                      Battery Chemistry: <span className="text-zinc-300">{r.battery_type || 'N/A'}</span>
                    </p>
                    
                    <div className="pt-4 border-t border-zinc-800/80 flex justify-between items-center text-sm">
                      <span className="text-zinc-500">{r.tools_recommended?.length || 0} Tools Found</span>
                      <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">View Report →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ════════ VIEW: REPORT DETAIL ════════ */}
        {!isLoading && !error && view === 'detail' && selectedReport && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            
            {/* Back Button */}
            <button 
              onClick={() => setView('list')} 
              className="text-zinc-500 hover:text-zinc-300 text-sm font-medium mb-8 flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Back to Reports
            </button>
            
            <div className="space-y-8">
              {/* Header Info */}
              <div>
                <h1 className="text-3xl font-semibold text-zinc-100 tracking-tight mb-3">
                  {selectedReport.problem_domain || 'Consultation Report'}
                </h1>
                <div className="flex gap-4 text-sm text-zinc-500">
                  <span>Created on {new Date(selectedReport.created_at).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Chemistry: {selectedReport.battery_type || 'N/A'}</span>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-8">
                <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">Executive Summary</h2>
                <p className="text-zinc-300 leading-relaxed">
                  {selectedReport.executive_summary || selectedReport.full_report_json?.roi?.executive_summary || "No summary generated."}
                </p>
              </div>

              {/* Grid: Diagnosis & ROI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Diagnosis */}
                {selectedReport.full_report_json?.diagnosis && (
                  <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-8">
                    <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-6">Diagnostic Analysis</h2>
                    <div className="space-y-6">
                      <div>
                        <span className="text-xs text-zinc-500 block mb-1.5">Impact Level</span>
                        <span className="inline-block bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-md text-sm font-medium border border-indigo-500/20">
                          {selectedReport.full_report_json.diagnosis.impact_level || 'Medium'}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-zinc-500 block mb-1.5">Root Cause</span>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {selectedReport.full_report_json.diagnosis.root_cause_analysis || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ROI */}
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-8 flex flex-col justify-between">
                  <div>
                    <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-6">Financial Impact</h2>
                    <div className="text-xs text-zinc-500 mb-1">Estimated Annual Savings</div>
                    <div className="text-3xl font-semibold text-zinc-100 tracking-tight">
                      ${selectedReport.roi_min?.toLocaleString()} <span className="text-xl text-zinc-600 font-normal mx-1">-</span> ${selectedReport.roi_max?.toLocaleString()}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-zinc-800/80">
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Metric</div>
                      <div className="text-sm text-zinc-300 font-medium">{selectedReport.roi_metric || 'Cost Reduction'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Payback Period</div>
                      <div className="text-sm text-zinc-300 font-medium">{selectedReport.full_report_json?.roi?.payback_period_months || '?'} Months</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Tools */}
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-8">
                <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-6">Recommended AI Solutions</h2>
                <div className="grid grid-cols-1 gap-4">
                  {selectedReport.full_report_json?.solution?.recommended_tools?.map((tool: any, idx: number) => (
                    <div key={idx} className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-5">
                      <div className="flex justify-between items-start mb-2">
                        <strong className="text-zinc-100 text-lg">{tool.tool_name}</strong>
                        <span className="bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1 rounded-md">
                          Fit: {tool.fit_score}%
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                        {tool.why_recommended}
                      </p>
                      <div className="flex items-center text-xs text-zinc-500 gap-4">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          {tool.pricing_tier}
                        </span>
                        {tool.implementation_weeks && (
                          <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {tool.implementation_weeks} weeks to implement
                          </span>
                        )}
                      </div>
                    </div>
                  )) || <p className="text-zinc-500 text-sm">No tools detailed in this report.</p>}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}