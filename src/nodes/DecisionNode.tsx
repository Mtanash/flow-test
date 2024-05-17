import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";

export type DecisionNodeData = {
  label?: string;
};

export function DecisionNode({ data }: NodeProps<DecisionNodeData>) {
  return (
    <div className="flex flex-col bg-yellow-200 h-10 w-28 rounded justify-center items-center text-slate-950 text-center p-2 shadow shadow-slate-300 hover:shadow-slate-500 transition duration-300 ">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-200 rounded-full shadow shadow-bbg-blue-200 hover:bg-blue-400 hover:shadow-bbg-blue-400 transition duration-300"
      />

      <Handle
        type="source"
        position={Position.Right}
        id="yes"
        className="w-3 h-3 bg-green-200 rounded-full shadow shadow-bbg-green-200 hover:bg-green-400 hover:shadow-bbg-green-400 transition duration-300"
      ></Handle>

      {data.label && (
        <span className="text-slate-950 text-xs capitalize">{data.label}</span>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        className="w-3 h-3 bg-red-200 rounded-full shadow shadow-bbg-red-200 hover:bg-red-400 hover:shadow-bbg-red-400 transition duration-300"
      />
    </div>
  );
}
