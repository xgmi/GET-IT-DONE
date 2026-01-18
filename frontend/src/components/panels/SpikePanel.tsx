import { useState } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { Task } from 'shared/types';

interface SpikePanelProps {
  task: Task;
  onTaskUpdate?: (description: string) => Promise<void>;
}

interface ParsedSpike {
  title?: string;
  goal?: string;
  summary?: string;
  impact?: string;
  findings?: string;
  plan?: string;
  acceptance?: string;
  tickets?: string;
}

function parseSpike(markdown: string): ParsedSpike {
  const sections: ParsedSpike = {};

  // Extract title (first h1)
  const titleMatch = markdown.match(/^#\s+(.+?)(?:\s+-\s+Research\s+Spike)?$/m);
  if (titleMatch) sections.title = titleMatch[1].trim();

  // Extract sections by heading
  const goalMatch = markdown.match(/##\s+🎯\s+Goal\s*\n+([\s\S]*?)(?=\n##|\n---|\n\*\*|$)/i);
  if (goalMatch) sections.goal = goalMatch[1].trim();

  const summaryMatch = markdown.match(/##\s+📊\s+Executive\s+Summary\s*\n+([\s\S]*?)(?=\n##|\n---|\n\*\*|$)/i);
  if (summaryMatch) sections.summary = summaryMatch[1].trim();

  const impactMatch = markdown.match(/##\s+🚀\s+Impact\s+&\s+Use\s+Cases\s*\n+([\s\S]*?)(?=\n##|\n---|\n\*\*|$)/i);
  if (impactMatch) sections.impact = impactMatch[1].trim();

  const findingsMatch = markdown.match(/##\s+🔍\s+Research\s+Findings\s*\n+([\s\S]*?)(?=\n##|\n---|\n\*\*|$)/i);
  if (findingsMatch) sections.findings = findingsMatch[1].trim();

  const planMatch = markdown.match(/##\s+📖\s+Plan\s+of\s+Attack\s+\(Opinionated\s+Implementation\s+Plan\)\s*\n+([\s\S]*?)(?=\n##|\n---|\n\*\*|$)/i);
  if (planMatch) sections.plan = planMatch[1].trim();

  const acceptanceMatch = markdown.match(/##\s+✅\s+Acceptance\s+Criteria\s*\n+([\s\S]*?)(?=\n##|\n---|\n\*\*|$)/i);
  if (acceptanceMatch) sections.acceptance = acceptanceMatch[1].trim();

  const ticketsMatch = markdown.match(/##\s+🎟️\s+Potential\s+Tickets\s*\n+([\s\S]*?)$/i);
  if (ticketsMatch) sections.tickets = ticketsMatch[1].trim();

  return sections;
}

function extractTickets(ticketsSection: string): Array<{ title: string; description: string }> {
  const tickets: Array<{ title: string; description: string }> = [];

  // Match numbered list items with bold titles
  const ticketRegex = /^\d+\.\s+\*\*(.+?)\*\*:\s*(.+?)(?=\n\d+\.|\n###|\n##|$)/gms;
  let match;

  while ((match = ticketRegex.exec(ticketsSection)) !== null) {
    tickets.push({
      title: match[1].trim(),
      description: match[2].trim(),
    });
  }

  return tickets;
}

export function SpikePanel({ task, onTaskUpdate }: SpikePanelProps) {
  const [inputMode, setInputMode] = useState<'url' | 'text'>('text');
  const [githubUrl, setGithubUrl] = useState('');
  const [spikeText, setSpikeText] = useState(task.description || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsedSpike = parseSpike(task.description || '');
  const hasSpike = task.description && task.description.length > 0;

  const handleFetchFromUrl = async () => {
    if (!githubUrl) return;

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement GitHub discussion fetching
      // For now, show a placeholder message
      setError('GitHub URL fetching will be implemented in the next step.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch spike from URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSpike = async () => {
    if (!onTaskUpdate) return;

    setIsSaving(true);
    setError(null);

    try {
      await onTaskUpdate(spikeText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save spike');
    } finally {
      setIsSaving(false);
    }
  };

  const handleMakeTasks = async () => {
    // TODO: Implement task creation from spike tickets
    console.log('Make tasks from spike');
  };

  if (!hasSpike) {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-8 w-8 text-muted-foreground" />
              <div>
                <h2 className="text-2xl font-bold">Research Spike</h2>
                <p className="text-sm text-muted-foreground">
                  Add a research spike document to guide implementation
                </p>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <Button
                variant={inputMode === 'text' ? 'default' : 'outline'}
                onClick={() => setInputMode('text')}
                className="flex-1"
              >
                Paste Text
              </Button>
              <Button
                variant={inputMode === 'url' ? 'default' : 'outline'}
                onClick={() => setInputMode('url')}
                className="flex-1"
              >
                GitHub URL
              </Button>
            </div>

            {inputMode === 'text' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Spike Document (Markdown)
                  </label>
                  <Textarea
                    value={spikeText}
                    onChange={(e) => setSpikeText(e.target.value)}
                    placeholder="Paste your research spike document here..."
                    className="min-h-[400px] font-mono text-sm"
                  />
                </div>
                <Button
                  onClick={handleSaveSpike}
                  disabled={!spikeText || isSaving}
                  className="w-full"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Save Spike
                    </>
                  )}
                </Button>
              </div>
            )}

            {inputMode === 'url' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    GitHub Discussion URL
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/owner/repo/discussions/123"
                      className="flex-1"
                    />
                    <Button
                      onClick={handleFetchFromUrl}
                      disabled={!githubUrl || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Fetching...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Fetch
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Paste a URL to a GitHub discussion containing your spike document
                  </p>
                </div>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render parsed spike
  const tickets = parsedSpike.tickets ? extractTickets(parsedSpike.tickets) : [];

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {parsedSpike.title && (
            <div className="border-b pb-4">
              <h1 className="text-3xl font-bold">{parsedSpike.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">Research Spike</p>
            </div>
          )}

          {parsedSpike.goal && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🎯</span> Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm">{parsedSpike.goal}</p>
              </CardContent>
            </Card>
          )}

          {parsedSpike.summary && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📊</span> Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-sm">{parsedSpike.summary}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {parsedSpike.impact && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🚀</span> Impact & Use Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm">{parsedSpike.impact}</p>
              </CardContent>
            </Card>
          )}

          {parsedSpike.findings && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🔍</span> Research Findings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-sm">{parsedSpike.findings}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {parsedSpike.plan && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>📖</span> Plan of Attack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-sm">{parsedSpike.plan}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {parsedSpike.acceptance && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>✅</span> Acceptance Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-sm">{parsedSpike.acceptance}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {tickets.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span>🎟️</span> Potential Tickets ({tickets.length})
                  </CardTitle>
                  <Button onClick={handleMakeTasks} variant="default">
                    Make Tasks
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tickets.map((ticket, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="font-medium text-sm mb-1">{ticket.title}</div>
                      <div className="text-xs text-muted-foreground">{ticket.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
