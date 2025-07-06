"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Clipboard, Loader2 } from "lucide-react";

import { handleGenerateSummary } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  jobDescription: z.string().min(50, { message: "Please provide a more detailed job description (min 50 characters)." }),
  targetKeywords: z.string().min(3, { message: "Please enter at least one keyword (min 3 characters)." }),
});

type FormValues = z.infer<typeof formSchema>;

export function ResumeSummaryGenerator() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: "",
      targetKeywords: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setSummary("");
    try {
      const result = await handleGenerateSummary(values);
      setSummary(result.resumeSummary);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with the AI summary generator. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }
  
  const copyToClipboard = () => {
    if(!summary) return;
    navigator.clipboard.writeText(summary);
    toast({
      title: "Copied to clipboard!",
      description: "The summary has been copied to your clipboard.",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-2 border-accent/20">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary text-primary-foreground p-3 rounded-lg">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <CardTitle className="font-headline text-2xl">AI-Powered Summary</CardTitle>
            <CardDescription>Paste a job description to get a tailored resume summary.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste the full job description here..."
                      className="resize-y min-h-[150px] bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Your Key Skills / Keywords</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Project Management, React, UI/UX Design, Agile Methodologies"
                      className="resize-y min-h-[80px] bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : "Generate Summary"}
            </Button>
          </form>
        </Form>
        {(loading || summary) && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold font-headline mb-4">Generated Summary</h3>
            <Card className="bg-muted/50 relative">
              <CardContent className="p-6">
                {loading && (
                  <div className="flex items-center space-x-3">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <p className="text-muted-foreground">The AI is crafting your summary...</p>
                  </div>
                )}
                {summary && (
                    <>
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{summary}</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                            onClick={copyToClipboard}
                        >
                            <Clipboard className="w-4 h-4" />
                        </Button>
                    </>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
