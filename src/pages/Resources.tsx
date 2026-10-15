import { ArrowUpRight, BookOpen, ClipboardCheck, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { testingGuides } from "@/data/resources";
import { usePageSeo } from "@/hooks/use-page-seo";

const Resources = () => {
  usePageSeo({
    title: "Testing Guides & Resources | Hung Ta Instrument Malaysia",
    description: "Practical guides for tensile testing machine selection, calibration preparation, grips and UTM service. Resources for Malaysia factory and laboratory QA teams.",
    canonicalPath: "/resources/",
  });

  return (
    <main className="pt-20">
      <section className="bg-muted border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <p className="text-sm font-semibold text-accent mb-3">Technical resources</p>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-5">Testing Guides & Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">Practical information for factory and laboratory QA teams choosing equipment, planning calibration and arranging service.</p>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Application & service guides</h2>
            <div className="divide-y divide-border border-y border-border">
              {testingGuides.map((guide) => (
                <article key={guide.path} className="py-6">
                  <p className="text-xs uppercase font-semibold text-accent mb-2">{guide.category}</p>
                  <h3 className="text-xl font-bold mb-2"><a href={guide.path} className="hover:text-accent transition-colors">{guide.title}</a></h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">{guide.description}</p>
                  <a href={guide.path} className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-3 hover:text-accent">Read guide <ArrowUpRight className="w-4 h-4" /></a>
                </article>
              ))}
            </div>
          </div>
          <aside className="space-y-8">
            <div>
              <ClipboardCheck className="w-6 h-6 text-accent mb-3" />
              <h2 className="text-xl font-bold mb-3">Prepare an enquiry</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">Collect your sample or machine details before asking for a recommendation or quotation.</p>
              <a href="/testing-machine-enquiry-checklist.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center text-sm font-semibold underline"><FileText className="w-4 h-4" />Enquiry checklist (PDF)</a>
            </div>
            <div className="border-t border-border pt-6">
              <BookOpen className="w-6 h-6 text-accent mb-3" />
              <h2 className="text-xl font-bold mb-3">Product information</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">Compare machine specifications and available catalogue sheets in our product range.</p>
              <Link to="/products" className="text-sm font-semibold underline">Browse testing machines</Link>
            </div>
            <div className="border-t border-border pt-6">
              <h2 className="text-xl font-bold mb-3">Discuss your application</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">Send your material, sample dimensions, force range and test method to our Seremban team.</p>
              <Link to="/contact"><Button className="bg-accent text-white">Contact Hung Ta <ArrowUpRight className="w-4 h-4 ml-2" /></Button></Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Resources;
