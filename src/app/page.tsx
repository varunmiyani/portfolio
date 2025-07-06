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
    year: '2023', // Jul 2023 – Present
    type: 'work',
    title: 'Senior Software Engineer',
    entity: 'o9 Solutions Supply Chain',
    description: 'Currently working on React.js, jQuery, KendoUI in frontend and Node.js (Express, Sails) in backend for creating REST API’s. Responsibilities include Kendo UI migration, developing reusable components, and delivering features with accessibility and unit tests. Worked on o9 Platform using jQuery, Kendo UI, Karma, C# .net MVC.',
    tags: ['React.js', 'jQuery', 'Kendo UI', 'Node.js', 'Express', 'Sails', 'REST API', 'Karma', 'C# .net MVC'],
  },
  {
    year: '2021', // Sep 2021 – June 2023
    type: 'work',
    title: 'Senior Software Engineer (Frontend Lead)',
    entity: 'Namaste Credit Financial Products and Services',
    description: 'Led the frontend team, designed and delivered solutions, wrote technical specifications for every PRD, managed Git repository and JIRA tasks, developed secure and reusable React components, handled frontend and backend deployments (AWS), and provided post-release and production support. Delivered projects include City Union Bank (digital onboarding and loan sanction), NC Onboarding (digital onboarding for borrowers), and Loan Hub (Marketplace connecting borrowers and lenders).',
    tags: ['React.js', 'Node.js', 'Sails.js', 'MySQL', 'Git', 'JIRA', 'AWS', 'Frontend Lead'],
  },
  {
    year: '2017', // Feb 2017 – Aug 2021
    type: 'work',
    title: 'Full Stack Developer (Team Lead)',
    entity: 'SPINTeQ Automotive Products',
    description: 'Gathered requirements, acted as System Architect, led the dev team, created REST APIs, did UI-UX design, frontend and backend development, and mobility development. Managed Git, monitored progress, automated support activities (sms, email, telegram alerts, database backup), and managed Azure VMs. Maintained web & mobile applications for TMSA CV, PV and KYC, and TATA MOTORS PRODUCTS.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'PHP', 'CodeIgniter', 'PostgreSQL', 'MS SQL Server', 'Azure', 'Git', 'Team Lead'],
  },
   {
    year: '2017', // Feb 2017 – Aug 2021
    type: 'project',
    title: 'Auto Scheduler',
    entity: 'SPINTeQ Automotive Products',
    description: 'Auto schedule vehicle based on priority and availability of resources in workshop.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'PostgreSQL'],
  },
   {
    year: '2017', // Feb 2017 – Aug 2021
    type: 'project',
    title: 'FX',
    entity: 'SPINTeQ Automotive Products',
    description: 'Workshop Management System, Asset Tracking, Analytics, Dashboards, Reports.',
    tags: ['HTML', 'CSS', 'JavaScript', 'HighCharts.js', 'React.js', 'Node.js', 'Express.js', 'PHP', 'CodeIgniter', 'PostgreSQL'],
  },
   {
    year: '2017', // Feb 2017 – Aug 2021
    type: 'project',
    title: 'Insight, Revenue, KPI, Telegram',
    entity: 'SPINTeQ Automotive Products',
    description: 'Admin Dashboard, Workshop Revenue Dashboard, Monitoring Dealer and Region Performance, Auto Sending Workshop Status & KPI messages.',
    tags: ['HTML', 'CSS', 'JavaScript', 'HighCharts.js', 'Google Charts', 'Materialize', 'PHP', 'CodeIgniter', 'MS SQL Server', 'Windows Task Scheduler'],
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
              alt="Varun Miyani"
              width={128}
              height={128}
              className="rounded-full mb-6 ring-4 ring-primary/20"
              data-ai-hint="professional headshot"
            />
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">Varun Miyani</h1>
            <h2 className="mt-2 text-lg md:text-xl text-muted-foreground">Creative Frontend Engineer & Design Enthusiast</h2>
            <p className="mt-4 max-w-2xl text-center text-muted-foreground" data-ai-hint="update this with your personal summary">
              I craft beautiful, responsive, and user-centric web experiences. My passion lies in the intersection of clean code and thoughtful design.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <a href="#contact">
                  <Mail className="mr-2" /> Get in Touch
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/varun-miyani-resume.pdf" download data-ai-hint="Update this href to link to your actual resume file">
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
          <p>&copy; {new Date().getFullYear()} Varun Miyani. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
