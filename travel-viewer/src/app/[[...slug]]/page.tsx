import { getMarkdownContent, getFileTree } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Folder, FileText, ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  const tree = getFileTree();
  const paths: { slug: string[] }[] = [];

  function flatten(nodes: any[], currentPath: string[] = []) {
    nodes.forEach((node) => {
      const newPath = [...currentPath, node.name];
      paths.push({ slug: node.path.split('/') });
      if (node.children) {
        flatten(node.children, newPath);
      }
    });
  }

  flatten(tree);
  return [...paths, { slug: [] }];
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const content = await getMarkdownContent(slug || []);

  if (!content) {
    notFound();
  }

  if (content.type === "directory") {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{content.name}</h1>
          <p className="text-slate-500 italic">Select a file or folder to continue.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.children?.map((node) => (
            <Link
              key={node.path}
              href={`/${node.path}`}
              className="group flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-teal-500 hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-slate-50 group-hover:bg-teal-50 rounded-lg transition-colors">
                {node.type === "directory" ? (
                  <Folder className="w-6 h-6 text-teal-600" />
                ) : (
                  <FileText className="w-6 h-6 text-teal-600" />
                )}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-slate-900 group-hover:text-teal-700">
                  {node.name}
                </h3>
                <p className="text-xs text-slate-500 capitalize">{node.type}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500" />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <article className="prose prose-slate prose-headings:font-serif prose-headings:font-bold prose-h1:text-5xl prose-h1:mb-8 prose-p:text-lg prose-p:leading-relaxed prose-li:text-lg max-w-none">
      {content.metadata?.title && (
        <h1 className="mb-4">{content.metadata.title}</h1>
      )}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content.content}
      </ReactMarkdown>
    </article>
  );
}
