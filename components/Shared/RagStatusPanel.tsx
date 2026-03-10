
import React from 'react';
import { RagStatus } from '../../types/MapTypes';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
  status: RagStatus;
}

const RagStatusPanel: React.FC<Props> = ({ status }) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="text-secondary text-sm font-semibold uppercase tracking-widest mb-2 border-b border-secondary/20 pb-2">
        System Diagnostics
      </div>

      {/* Red Status */}
      <div className="bg-red-950/40 border border-red-500/30 rounded-lg p-4 flex flex-col gap-2 shadow-[0_0_10px_rgba(239,68,68,0.1)] hover:bg-red-950/60 transition-colors">
        <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-500/20 rounded-full shrink-0">
                <AlertCircle className="w-4 h-4 text-red-500" />
            </div>
            <h4 className="text-red-400 text-xs font-bold uppercase tracking-wider">Critical Alert</h4>
        </div>
        <p className="text-red-100 text-sm font-medium pl-1">{status.red}</p>
      </div>

      {/* Amber Status */}
      <div className="bg-amber-950/40 border border-amber-500/30 rounded-lg p-4 flex flex-col gap-2 shadow-[0_0_10px_rgba(245,158,11,0.1)] hover:bg-amber-950/60 transition-colors">
        <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/20 rounded-full shrink-0">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <h4 className="text-amber-400 text-xs font-bold uppercase tracking-wider">Warning</h4>
        </div>
        <p className="text-amber-100 text-sm font-medium pl-1">{status.amber}</p>
      </div>

      {/* Green Status */}
      <div className="bg-green-950/40 border border-brand-green/30 rounded-lg p-4 flex flex-col gap-2 shadow-[0_0_10px_rgba(5,229,96,0.1)] hover:bg-green-950/60 transition-colors">
         <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-green/20 rounded-full shrink-0">
                <CheckCircle className="w-4 h-4 text-brand-green" />
            </div>
            <h4 className="text-brand-green text-xs font-bold uppercase tracking-wider">Nominal</h4>
        </div>
        <p className="text-green-100 text-sm font-medium pl-1">{status.green}</p>
      </div>
      
      {/* Decorative Spacer/Filler if needed */}
      <div className="flex-1 min-h-[20px] rounded-lg border border-dashed border-secondary/10 bg-secondary/5 hidden lg:block relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,#000_25%,#000_50%,transparent_50%,transparent_75%,#000_75%,#000_100%)] bg-[length:10px_10px]" />
      </div>
    </div>
  );
};

export default RagStatusPanel;
