import type { Node, NodeTypes } from "reactflow";
import { ActionNode } from "./ActionNode";
import { DecisionNode } from "./DecisionNode";
import { StartEndNode } from "./StartEndNode";

export const initialNodes = [] satisfies Node[];

export const nodeTypes = {
  action: ActionNode,
  decision: DecisionNode,
  startend: StartEndNode,
} satisfies NodeTypes;
