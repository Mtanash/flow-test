import { useCallback, useRef, useState } from "react";
import type { Node, OnConnect, ReactFlowInstance } from "reactflow";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";
import actionImage from "./assets/action.svg";
import decisionImage from "./assets/decision.svg";
import startEndImage from "./assets/start-end.svg";

import "reactflow/dist/style.css";

import { Button, Layout } from "antd";
import { edgeTypes, initialEdges } from "./edges";
import { initialNodes, nodeTypes } from "./nodes";
import toaster from "./toaster";
const { Header, Sider, Content } = Layout;

const flowKey = "reactFlow";

const dndNodes = [
  {
    id: "1",
    type: "decision",
    image: decisionImage,
  },
  {
    id: "2",
    type: "action",
    image: actionImage,
  },
  {
    id: "3",
    type: "startend",
    image: startEndImage,
  },
];

export default function App() {
  const reactFlowWrapper = useRef(null);
  const { setViewport } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((edges) =>
        addEdge({ ...connection, type: connection?.sourceHandle || "" }, edges)
      );
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("eventType");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance
        ? reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          })
        : { x: 0, y: 0 };

      const newNode: Node = {
        id: uuidv4(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      toaster.success("Saved successfully");
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flowData = localStorage.getItem(flowKey);

      if (!flowData) {
        return toaster.error("Nothing to restore");
      }

      const flow = JSON.parse(flowData);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
        toaster.success("Restored successfully");
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider trigger={null} width={300}>
        {/* react flow draggable nodes */}
        <div
          style={{
            padding: 24,
            margin: "24px",
            background: "#ddd",
            borderRadius: 8,
            height: "calc(100% - 48px)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: 16,
              margin: 0,
            }}
          >
            Drag these nodes to the Flow
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              paddingTop: 24,
            }}
          >
            {dndNodes.map((node) => (
              <div
                key={node.id}
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData("eventType", node.type);
                  event.dataTransfer.effectAllowed = "move";
                }}
                className="cursor-pointer flex flex-col items-center justify-center bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img src={node.image} alt="node" width={70} height={70} />
                <p className="text-slate-950 text-center text-sm capitalize overflow-hidden text-ellipsis whitespace-nowrap max-w-full truncate">
                  {node.type}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#fff" }}>
          <div className="w-full h-14 flex items-center justify-between px-4">
            <h1 className="text-slate-950 text-3xl font-bold">Chart Flow</h1>
            {/* buttons */}
            <div className="flex gap-4 items-center">
              <Button type="primary" size="large" onClick={onSave}>
                Save Flow
              </Button>

              <Button size="large" onClick={onRestore}>
                Load Flow
              </Button>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
            borderRadius: 8,
          }}
        >
          <div
            ref={reactFlowWrapper}
            style={{
              height: "100%",
            }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
            >
              <Background />
              <MiniMap />
              <Controls />
            </ReactFlow>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
