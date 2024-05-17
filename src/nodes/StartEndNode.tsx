import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";

export type StartEndNodeData = {
  label?: string;
};

export function StartEndNode({ data }: NodeProps<StartEndNodeData>) {
  return (
    <div className="flex flex-col bg-lime-200 rounded-full h-10 w-28 justify-center items-center text-slate-950 text-center p-2 shadow shadow-slate-300 hover:shadow-slate-500 transition duration-300 ">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-green-200 rounded-full shadow shadow-bbg-green-200 hover:bg-green-400 hover:shadow-bbg-green-400 transition duration-300"
      ></Handle>

      {data.label && (
        <span className="text-slate-950 text-xs capitalize">{data.label}</span>
      )}

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-red-200 rounded-full shadow shadow-bbg-red-200 hover:bg-red-400 hover:shadow-bbg-red-400 transition duration-300"
      />
    </div>
  );
}
