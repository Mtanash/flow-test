import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";

export type ActionNodeData = {
  label?: string;
};

export function ActionNode({ data }: NodeProps<ActionNodeData>) {
  return (
    <div className="flex flex-col bg-cyan-200 h-10 w-28 justify-center items-center text-slate-950 text-center p-2 shadow shadow-slate-300 hover:shadow-slate-500 transition duration-300 ">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-indigo-200 rounded-full shadow shadow-bbg-blue-200 hover:bg-indigo-400 hover:shadow-bbg-blue-400 transition duration-300"
      />

      {data.label && (
        <span className="text-slate-950 text-xs capitalize">{data.label}</span>
      )}

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-indigo-200 rounded-full shadow shadow-bbg-indigo-200 hover:bg-indigo-400 hover:shadow-bbg-indigo-400 transition duration-300"
      />
    </div>
  );
}
