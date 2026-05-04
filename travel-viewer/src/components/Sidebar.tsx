"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileNode } from "@/lib/markdown";
import { ChevronRight, ChevronDown, FileText, Folder, Map } from "lucide-react";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  tree: FileNode[];
}

export default function Sidebar({ tree }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 overflow-y-auto hidden lg:block">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 text-teal-600 font-bold text-xl">
          <Map className="w-6 h-6" />
          <span>Travel Planner</span>
        </Link>
      </div>
      <nav className="px-4 pb-8">
        <Tree nodes={tree} />
      </nav>
    </aside>
  );
}

function Tree({ nodes, level = 0 }: { nodes: FileNode[]; level?: number }) {
  return (
    <ul className={cn("space-y-1", level > 0 && "ml-4 mt-1 border-l border-slate-100")}>
      {nodes.map((node) => (
        <TreeNode key={node.path} node={node} level={level} />
      ))}
    </ul>
  );
}

function TreeNode({ node, level }: { node: FileNode; level: number }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const isDirectory = node.type === "directory";
  const isActive = pathname === `/${node.path}`;

  if (isDirectory) {
    return (
      <li>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center w-full gap-2 px-2 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
        >
          {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          <Folder className="w-4 h-4 text-teal-500/70" />
          <span>{node.name}</span>
        </button>
        {isOpen && node.children && <Tree nodes={node.children} level={level + 1} />}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={`/${node.path}`}
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md transition-colors",
          isActive
            ? "bg-teal-50 text-teal-700"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
        )}
      >
        <span className="w-4" /> {/* Spacer to align with chevron */}
        <FileText className={cn("w-4 h-4", isActive ? "text-teal-600" : "text-slate-400")} />
        <span>{node.name}</span>
      </Link>
    </li>
  );
}
