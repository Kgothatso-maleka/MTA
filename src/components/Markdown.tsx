import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';

const CALLOUTS: Record<string, string> = {
  'key-terms': 'Key terms',
  'exam-trap': 'Exam trap',
  'on-the-job': 'On the job',
};

type AnyNode = {
  type: string;
  name?: string;
  value?: string;
  children?: AnyNode[];
  data?: Record<string, unknown>;
};

const plain = (n: AnyNode): string => (n.value ?? '') + (n.children ?? []).map(plain).join('');

/** Maps :::key-terms / :::exam-trap / :::on-the-job to styled asides; leaves everything else as text. */
const remarkCallouts: Plugin = () => (tree) => {
  visit(tree as never, (node: AnyNode, index: number | undefined, parent: AnyNode | undefined) => {
    if (node.type === 'containerDirective') {
      const label = node.name ? CALLOUTS[node.name] : undefined;
      if (label && node.name) {
        node.data = { hName: 'aside', hProperties: { className: ['callout', node.name] } };
        node.children = [
          {
            type: 'paragraph',
            data: { hName: 'div', hProperties: { className: ['callout-label'] } },
            children: [{ type: 'text', value: label }],
          },
          ...(node.children ?? []),
        ];
      } else {
        node.data = { hName: 'div' };
      }
    } else if ((node.type === 'textDirective' || node.type === 'leafDirective') && parent && index !== undefined) {
      const label = plain(node);
      parent.children![index] = { type: 'text', value: `:${node.name}${label ? `[${label}]` : ''}` };
    }
  });
};

export default function Markdown({ source }: { source: string }) {
  return (
    <ReactMarkdown skipHtml remarkPlugins={[remarkGfm, remarkDirective, remarkCallouts]}>{source}</ReactMarkdown>
  );
}
