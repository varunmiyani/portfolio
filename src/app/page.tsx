import Image from 'next/image';
import { ArrowRight, Briefcase, Code, Copy, Download, Github, Linkedin, Loader2, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumeSummaryGenerator } from '@/components/resume-summary-generator';

type TimelineEvent = {
  year: string;
  type: 'work' | 'project';
  title: string;
  entity: string;
  description: string;
  tags: string[];
};

const timelineEvents: TimelineEvent[] = [
  {
    year: '2023',
    type: 'work',
    title: 'Senior Frontend Engineer',
    entity: 'Innovate Solutions',
    description: 'Led the development of a design system and component library, improving development velocity by 30%. Architected and built a new customer-facing analytics dashboard using Next.js, resulting in a 25% increase in user engagement.',
    tags: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Storybook'],
  },
  {
    year: '2022',
    type: 'project',
    title: 'Project Chronos',
    entity: 'Personal Project',
    description: 'An interactive timeline component for React, designed for easy integration and customization. Published as an open-source package on npm, gaining over 5,000 weekly downloads.',
    tags: ['React', 'TypeScript', 'Framer Motion', 'NPM'],
  },
  {
    year: '2021',
    type: 'work',
    title: 'Frontend Developer',
    entity: 'Creative Co.',
    description: 'Developed and maintained responsive user interfaces for e-commerce clients. Collaborated with UI/UX designers to translate wireframes into high-quality, pixel-perfect code.',
    tags: ['Vue.js', 'GraphQL', 'SCSS', 'Jest'],
  },
  {
    year: '2020',
    type: 'project',
    title: 'Data Visualizer',
    entity: 'University Capstone',
    description: 'A web application that creates beautiful, interactive charts and graphs from CSV data. Utilized D3.js for complex data visualization and provided users with multiple chart types.',
    tags: ['D3.js', 'JavaScript', 'HTML5 Canvas', 'Node.js'],
  },
  {
    year: '2019',
    type: 'work',
    title: 'Junior Web Developer Intern',
    entity: 'Digital Agency',
    description: 'Assisted the development team in building and maintaining client websites. Gained hands-on experience with HTML, CSS, JavaScript, and version control systems like Git.',
    tags: ['HTML', 'CSS', 'jQuery', 'Git'],
  },
];


const YearMarker = ({ year }: { year: string }) => (
  <div className="flex justify-center items-center my-8 md:my-12">
    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
      <span className="font-headline text-lg font-bold text-foreground bg-background px-4 py-1 rounded-full border">
        {year}
      </span>
    </div>
  </div>
);

const TimelineEventCard = ({ event, isRightSide }: { event: TimelineEvent, isRightSide: boolean }) => {
  const Icon = event.type === 'work' ? Briefcase : Code;
  return (
    <div className={`relative pl-12 md:pl-0 ${!isRightSide ? 'md:pr-[calc(50%_+_1.5rem)]' : 'md:pl-[calc(50%_+_1.5rem)]'}`}>
      <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Icon className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
              <CardDescription>{event.entity}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Dot on the timeline */}
      <div className="absolute left-4 top-5 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary md:left-1/2" />
    </div>
  );
};


export default function Home() {
  let lastYear: string | null = null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4">
        
        {/* Hero Section */}
        <section id="home" className="py-24 md:py-32 text-center">
          <div className="flex flex-col items-center">
             <Image
              src="https://placehold.co/128x128.png"
              alt="Alex Doe"
              width={128}
              height={128}
              className="rounded-full mb-6 ring-4 ring-primary/20"
              data-ai-hint="professional headshot"
            />
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">Alex Doe</h1>
            <h2 className="mt-2 text-lg md:text-xl text-muted-foreground">Creative Frontend Engineer & Design Enthusiast</h2>
            <p className="mt-4 max-w-2xl text-center text-muted-foreground">
              I craft beautiful, responsive, and user-centric web experiences. My passion lies in the intersection of clean code and thoughtful design.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <a href="#contact">
                  <Mail className="mr-2" /> Get in Touch
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/alex-doe-resume.pdf" download>
                  <Download className="mr-2" /> Download CV
                </a>
              </Button>
            </div>
             <div className="mt-8 flex justify-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-6 w-6" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-6 w-6" /></a>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="py-16 md:py-24">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-16">My Journey</h2>
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border -translate-x-1/2 md:left-1/2" />
            
            <div className="space-y-16">
              {timelineEvents.map((event, index) => {
                const showYear = event.year !== lastYear;
                if(showYear) lastYear = event.year;
                const isRightSide = index % 2 === 0;

                return (
                  <div key={index}>
                    {showYear && <YearMarker year={event.year} />}
                    <TimelineEventCard event={event} isRightSide={isRightSide} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Summary Generator Section */}
        <section id="contact" className="py-16 md:py-24">
           <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-4">Tailor Your Introduction</h2>
            <p className="max-w-3xl mx-auto text-center text-muted-foreground mb-12">
              Applying for a job? Use my AI-powered tool to generate a personalized resume summary tailored to the job description. Just paste the details below.
            </p>
          <ResumeSummaryGenerator />
        </section>

      </main>
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Alex Doe. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
