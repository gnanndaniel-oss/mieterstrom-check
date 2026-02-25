import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Zap, Building2, Battery, Euro, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const anbieter = await prisma.anbieter.findMany({
    take: 6,
    orderBy: {
      anzahlBewertungen: 'desc'
    }
  });

  return (
    <div className="w-full flex-1 mb-20">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900 border-b border-slate-800 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-blue-900/20 mix-blend-overlay z-0" />
        <div className="container relative z-10 px-4 mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-400">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Aktualisiert: Förderung 2026 integriert
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Mieterstrom-Anbieter <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">vergleichen</span> — Bis zu 15% Rendite.
            </h1>
            <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
              Finden Sie den passenden Mieterstrom-Dienstleister für Ihr Mehrfamilienhaus. Unabhängig. Kostenlos. In 2 Minuten.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white h-14 px-8 text-lg rounded-full shadow-lg shadow-green-600/20" asChild>
                <Link href="/rechner">Wirtschaftlichkeit berechnen <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full bg-white/5 border-slate-700 hover:bg-white/10 hover:text-white" asChild>
                <Link href="/vergleich">Alle Anbieter ansehen</Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-400 pt-4">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-500" /> 100% kostenlos</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-500" /> Unabhängig</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-500" /> DSGVO-konform</span>
            </div>
          </div>

          {/* Quick Calculator Card Hero */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400 fill-current" /> Schnell-Check
            </h3>

            <form action="/rechner" method="GET" className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Gebäudetyp</label>
                <select name="type" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl h-12 px-4 text-white focus:ring-2 focus:ring-green-500 outline-none">
                  <option value="bestand">Bestandsgebäude</option>
                  <option value="neubau">Neubau</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Anzahl Wohneinheiten</label>
                <select name="we" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl h-12 px-4 text-white focus:ring-2 focus:ring-green-500 outline-none">
                  <option value="3-6">3 - 6 Einheiten</option>
                  <option value="7-12">7 - 12 Einheiten</option>
                  <option value="13-20">13 - 20 Einheiten</option>
                  <option value="21-50">21 - 50 Einheiten</option>
                  <option value="50+">50+ Einheiten</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Postleitzahl</label>
                <input required name="plz" placeholder="z.B. 10115" pattern="[0-9]{5}" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl h-12 px-4 text-white focus:ring-2 focus:ring-green-500 outline-none placeholder:text-slate-500" />
              </div>
              <Button type="submit" className="w-full h-12 mt-4 bg-green-600 hover:bg-green-500 text-white rounded-xl text-lg font-semibold shadow-lg shadow-green-600/20">
                Jetzt vergleichen
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">In 3 Schritten zum passenden Anbieter</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Der Weg zum eigenen Mieterstrom-Projekt war noch nie so einfach. Sparen Sie Zeit und vergleichen Sie transparent.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-slate-100 z-0" />

            {[
              { step: 1, title: 'Gebäudedaten eingeben', desc: 'Beantworten Sie wenige Fragen zu Ihrem Objekt (Wohneinheiten, Dachfläche).', icon: Building2 },
              { step: 2, title: 'Anbieter vergleichen', desc: 'Unser Algorithmus zeigt Ihnen die besten Dienstleister für Ihr Projekt.', icon: Zap },
              { step: 3, title: 'Angebot erhalten', desc: 'Fordern Sie unverbindliche Angebote von bis zu 3 Anbietern an.', icon: CheckCircle2 },
            ].map((s) => (
              <div key={s.step} className="relative z-10 flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-green-50 border-4 border-white shadow-sm flex items-center justify-center mb-6">
                  <s.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center text-sm">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Warum sich Mieterstrom für Sie lohnt
              </h2>
              <p className="text-lg text-slate-600">
                Mit dem neuen Solarpaket I und der Gemeinschaftlichen Gebäudeversorgung (GGV) ist Mieterstrom so attraktiv wie nie.
              </p>

              <div className="space-y-6">
                {[
                  { title: "7-15% Rendite für Vermieter", desc: "Durch den Verkauf an Mieter und den gesetzlichen Mieterstromzuschlag generieren Sie beständige Einnahmen." },
                  { title: "Mindestens 10% Ersparnis für Mieter", desc: "Der Stromtarif muss gesetzlich mindestens 10% unter dem lokalen Grundversorgertarif liegen." },
                  { title: "Wertsteigerung & ESG-Score", desc: "Verbessern Sie die Energieeffizienzklasse Ihres Gebäudes und erfüllen Sie künftige ESG-Kriterien." },
                  { title: "Kein Eigenaufwand dank Dienstleistern", desc: "Vom Messkonzept bis zur jährlichen Abrechnung - Contracting-Partner übernehmen alle EVU-Pflichten." },
                ].map((adv, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{adv.title}</h4>
                      <p className="text-slate-600 mt-1">{adv.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full mt-4" asChild>
                <Link href="/mieterstrom-guide">Ratgeber lesen <ChevronRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <Battery className="w-10 h-10 text-blue-500 mb-4" />
                  <h4 className="font-bold text-lg mb-2 text-slate-900">Mit Gewerbespeicher</h4>
                  <p className="text-sm text-slate-600">Maximaler Eigenverbrauch (bis zu 90%) und höchste Rendite.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <Euro className="w-10 h-10 text-yellow-500 mb-4" />
                  <h4 className="font-bold text-lg mb-2 text-slate-900">Mieterstromzuschlag</h4>
                  <p className="text-sm text-slate-600">Bis zu 2,59 ct/kWh On-Top Förderung vom Staat gesichert für 20 Jahre.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-green-600/5 group-hover:bg-green-600/10 transition-colors" />
                  <div className="text-4xl font-black text-green-600 mb-2">96%</div>
                  <h4 className="font-bold text-lg mb-2 text-slate-900">Autarkie</h4>
                  <p className="text-sm text-slate-600">Unabhängigkeit von steigenden Strompreisen der Netzbetreiber.</p>
                </div>
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex items-center justify-center text-center flex-col h-48">
                  <Zap className="w-10 h-10 text-yellow-500 mb-4 fill-yellow-500 animate-pulse" />
                  <h4 className="font-bold text-lg">Jetzt umsteigen</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
