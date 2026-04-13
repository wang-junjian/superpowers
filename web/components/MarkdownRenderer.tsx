export default function MarkdownRenderer({ content }: { content: string }) {
  // Simple markdown renderer - no external dependencies
  // Supports basic markdown: headings, bold, italic, lists, code blocks, links

  function renderMarkdown(text: string): string {
    let html = text;

    // Code blocks (```code```)
    html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
      return `<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">${escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code (`code`)
    html = html.replace(/`([^`]+)`/g, (match, code) => {
      return `<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">${escapeHtml(code)}</code>`;
    });

    // Headings (# H1, ## H2, etc.)
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>');

    // Bold (**text**)
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>');

    // Italic (*text*)
    html = html.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');

    // Links [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-primary-600 hover:text-primary-700 underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // Lists (- item or * item)
    html = html.replace(/^[-*] (.*$)/gim, '<li class="ml-6 list-disc">$1</li>');

    // Wrap consecutive li elements in ul
    html = html.replace(/(<li.*<\/li>\n?)+/g, (match) => {
      return `<ul class="my-4 space-y-1">${match}</ul>`;
    });

    // Paragraphs (double newlines)
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');

    return html;
  }

  function escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const renderedHtml = renderMarkdown(content);

  return (
    <div
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
