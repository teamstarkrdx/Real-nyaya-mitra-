import { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useMutation } from '@tanstack/react-query';

interface VerificationResult {
  api: 'OpenAI' | 'Gemini';
  status: 'Real' | 'Fake';
  confidence: number;
  factors: {
    format: boolean;
    positioning: boolean;
    characters: boolean;
    blur: boolean;
    colors: boolean;
    keywords: boolean;
  };
}

export default function DocumentUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [results, setResults] = useState<VerificationResult[] | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const verifyMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('document', file);
      
      const response = await fetch('/api/verify-document', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Verification failed');
      }
      
      return await response.json();
    },
    onSuccess: (data) => {
      setResults(data.results);
    },
    onError: (error) => {
      console.error('Verification error:', error);
      setResults(null);
    }
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setResults(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setResults(null);
    }
  };

  const handleVerify = async () => {
    if (selectedFile) {
      verifyMutation.mutate(selectedFile);
    }
  };

  const matchingPercentage = results
    ? ((results[0].confidence + results[1].confidence) / 2).toFixed(1)
    : 0;

  return (
    <section className="py-16 md:py-24" id="document-verification">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Document Verification</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            AI Document Verification
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dual AI-powered authentication using OpenAI and Gemini
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  data-testid="input-file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">
                    {selectedFile ? selectedFile.name : 'Drop your document here'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse (PDF, JPG, PNG)
                  </p>
                </label>
              </div>

              {selectedFile && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm">{selectedFile.name}</span>
                  </div>
                  <Button
                    onClick={handleVerify}
                    disabled={verifyMutation.isPending}
                    data-testid="button-verify-document"
                    className="hover-elevate active-elevate-2"
                  >
                    {verifyMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Document'
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {results && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((result) => (
                  <Card
                    key={result.api}
                    className="hover-elevate transition-all"
                    data-testid={`result-${result.api.toLowerCase()}`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{result.api} Analysis</CardTitle>
                        <Badge
                          variant={result.status === 'Real' ? 'default' : 'destructive'}
                          className="text-sm"
                        >
                          {result.status === 'Real' ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <XCircle className="mr-1 h-3 w-3" />
                          )}
                          {result.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Confidence</span>
                          <span className="text-2xl font-bold">{result.confidence}%</span>
                        </div>
                        <Progress value={result.confidence} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Authentication Factors</p>
                        {Object.entries(result.factors).map(([factor, passed]) => (
                          <div
                            key={factor}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="capitalize">{factor}</span>
                            {passed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-muted/50">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Overall Match</p>
                  <p className="text-4xl font-bold">{matchingPercentage}%</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Both AI models analyzed the document
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
