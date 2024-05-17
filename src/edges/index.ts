import type { Edge, EdgeTypes } from "reactflow";
import NoEdge from "./NoEdge";
import YesEdge from "./YesEdge";

export const initialEdges = [] satisfies Edge[];

export const edgeTypes = {
  // Add your custom edge types here!
  yes: YesEdge,
  no: NoEdge,
} satisfies EdgeTypes;
