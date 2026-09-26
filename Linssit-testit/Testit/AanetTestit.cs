// Linssien äänet: Keksintöjen kilahdus ja vuosinaksahdus webin äänikonetta vasten (kultaiset/tehosteet.json, Chromiumin
// renderöimä pelin oma js/sound.js), Web Audion suotimet ja heitto sekä kilahdusten ja naksahdusten ajoitus
// (web aikajana.js keksinnonAani ja naksahda).
using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Aanet;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Testit
{
    public static class AanetTestit
    {
        static string Polku(string nimi) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", nimi);
        static JsonElement K() => JsonDocument.Parse(File.ReadAllText(Polku("tehosteet.json"))).RootElement;
        static double[] Luvut(JsonElement e, double kerroin) => e.EnumerateArray().Select(v => v.GetDouble() / kerroin).ToArray();
        static readonly Func<double> IlmanHeittoa = () => 0.5;

        // ── Synteesi webin näytteitä vasten ────────────────────────────────────────────────────────────

        [Testi] static void KohinaKutenChromium()
        {
            var k = K();
            var kohina = new Kohina(k.GetProperty("siemen").GetUInt32());
            foreach (var v in k.GetProperty("kohina").EnumerateArray())
                Oleta.Sama((float)v.GetDouble(), kohina.Seuraava());
        }

        [Testi] static void KilahdusKutenWeb()
        {
            var k = K();
            int f = k.GetProperty("taajuus").GetInt32();
            double kerroin = k.GetProperty("kerroin").GetDouble();
            var w = k.GetProperty("keksinto");
            var oma = Synteesi.Keksinto(f, IlmanHeittoa);
            Oleta.Sama(w.GetProperty("pituus").GetInt32(), oma.Length, "pituus 0,46 s");
            Oleta.Tosi(w.GetProperty("hiljaaJalkeen").GetBoolean(), "web on hiljaa klipin jälkeen");
            // C6 yksin ennen oktaavia (0–10 ms) näyte näytteeltä: taajuus, vaihe ja eksponenttiverho.
            var alku = Luvut(w.GetProperty("alku"), kerroin);
            int oktaavi = (int)Math.Round(0.01 * f);
            double ero = 0;
            for (int i = 0; i < oktaavi; i++) ero = Math.Max(ero, Math.Abs(oma[i] - alku[i]));
            Oleta.Tosi(ero < 5e-7, $"C6 näyte näytteeltä, ero {ero:E2}");
            // Koko kesto 2 ms:n RMS-verhona: oktaavin vaihe ei vaikuta (ks. tee-tehosteet.mjs, renderöintijakso).
            int ikkuna = w.GetProperty("ikkuna").GetInt32();
            var rms = Luvut(w.GetProperty("rms"), kerroin);
            double suhteellinen = 0;
            for (int j = 0; j < rms.Length; j++)
            {
                double s = 0;
                for (int i = j * ikkuna; i < (j + 1) * ikkuna; i++) s += oma[i] * oma[i];
                double r = Math.Sqrt(s / ikkuna);
                suhteellinen = Math.Max(suhteellinen, Math.Abs(r - rms[j]) / (rms[j] + 1e-5));
            }
            Oleta.Tosi(suhteellinen < 0.02, $"RMS-verho, suurin suhteellinen ero {suhteellinen:P2}");
        }

        [Testi] static void NaksahdusKutenWeb()
        {
            var k = K();
            int f = k.GetProperty("taajuus").GetInt32();
            var w = k.GetProperty("vuosi");
            var kohina = new Kohina(k.GetProperty("siemen").GetUInt32()).Puskuri(f);
            var oma = Synteesi.Vuosi(f, IlmanHeittoa, kohina);
            Oleta.Sama(w.GetProperty("pituus").GetInt32(), oma.Length, "pituus 82 ms");
            var web = Luvut(w.GetProperty("naytteet"), k.GetProperty("kerroin").GetDouble());
            double ero = 0;
            for (int i = 0; i < web.Length; i++) ero = Math.Max(ero, Math.Abs(oma[i] - web[i]));
            // Ylipäästön Q desibeleinä, taajuuspyyhkäisy näyte näytteeltä, kaistanpäästö ja kohinan kierto: float-tarkkuus
            // (Chromium 7e-9; WebKitin renderöimää vasten 6e-8, SELAIN=webkit tee-tehosteet.mjs).
            Oleta.Tosi(ero < 1e-7, $"näyte näytteeltä, ero {ero:E2}");
        }

        // ── Web Audion palikat ────────────────────────────────────────────────────────────────────────

        static double Vaste(Suodin tyyppi, double hz, double q, double sini)
        {
            const int F = 48000;
            var s = new Biquad();
            s.Aseta(tyyppi, hz, q, F);
            double huippu = 0;
            for (int n = 0; n < F / 10; n++)
            {
                float y = s.Suodata((float)Math.Sin(2 * Math.PI * sini * n / F));
                if (n > F / 20) huippu = Math.Max(huippu, Math.Abs(y));
            }
            return huippu;
        }

        [Testi] static void YlipaastonQOnDesibeleina()
        {
            // Web Audio: ali- ja ylipäästön Q on dB (resonanssi 10^(Q/20)); vuosinaksun q 0,7 → 1,084 rajataajuudella.
            double v = Vaste(Suodin.Ylipaasto, 3200, 0.7, 3200);
            Oleta.Tosi(Math.Abs(v - Math.Pow(10, 0.7 / 20)) < 0.01, "ylipäästö f0:ssa " + v);
            Oleta.Tosi(Vaste(Suodin.Ylipaasto, 3200, 0.7, 200) < 0.01, "ylipäästö vaimentaa matalat");
            Oleta.Tosi(Math.Abs(Vaste(Suodin.Alipaasto, 3200, 0, 3200) - 1) < 0.01, "alipäästö Q 0 dB → 1");
        }

        [Testi] static void KaistanpaastonHuippuOnYksi()
        {
            Oleta.Tosi(Math.Abs(Vaste(Suodin.Kaistanpaasto, 2400, 12, 2400) - 1) < 0.01, "kaistanpäästö f0:ssa");
            // Oktaavi alempana 1/√(1 + Q²(f/f0 − f0/f)²) = 0,055.
            double v = Vaste(Suodin.Kaistanpaasto, 2400, 12, 1200);
            Oleta.Tosi(Math.Abs(v - 1 / Math.Sqrt(1 + 144 * 2.25)) < 0.005, "Q 12 on kapea: " + v);
        }

        [Testi] static void HeittoKuinWebinJitter()
        {
            Oleta.Sama(1046.5, Synteesi.Heita(1046.5, 0.5));
            Oleta.Tosi(Math.Abs(Synteesi.Heita(100, 0) - 97) < 1e-12 && Math.Abs(Synteesi.Heita(100, 1) - 103) < 1e-12, "±3 %");
            var r = new Random(7);
            var a = Synteesi.Keksinto(48000, r.NextDouble);
            var b = Synteesi.Keksinto(48000, r.NextDouble);
            Oleta.Tosi(a.Length == b.Length && !a.SequenceEqual(b), "muunnelmat eroavat");
            double huippu = a.Max(Math.Abs);
            Oleta.Tosi(huippu > 0.045 && huippu < 0.06, "huippu 0,05 ± 3 % (+ oktaavi) " + huippu);
        }

        [Testi] static void NaksahdusLammitetyllaKanavalla()
        {
            // Kierrätetty kanava on soinut ennen lyöntiä: eri kohinapätkä ja lämmin suodin, sama verho ja taso.
            var kohina = new Kohina(99).Puskuri(48000);
            var kylma = Synteesi.Vuosi(48000, IlmanHeittoa, kohina);
            var lammin = Synteesi.Vuosi(48000, IlmanHeittoa, kohina, suhinanKohta: 12345, esirullaS: 0.005);
            Oleta.Tosi(!kylma.SequenceEqual(lammin), "eri pätkä");
            double Rms(float[] x, int a, int b) => Math.Sqrt(x.Skip(a).Take(b - a).Sum(v => (double)v * v) / (b - a));
            double r1 = Rms(kylma, 0, 1344), r2 = Rms(lammin, 0, 1344);
            Oleta.Tosi(Math.Abs(r1 - r2) / r1 < 0.25, $"sama taso 28 ms: {r1:E2} / {r2:E2}");
            Oleta.Tosi(Rms(lammin, 1440, 3936) < 2e-4, "vaimennut 30 ms:n jälkeen");
        }

        // ── Ajoitus (web aikajana.js naksahda, keksinnonAani) ──────────────────────────────────────────

        [Testi] static void NaksahdusVainElavastaVaihdoksesta()
        {
            var a = new KeksintojenAanet();
            Oleta.Tosi(!a.Kello(1769.2, true, 0), "ensimmäinen asetus ei ole vaihdos");
            Oleta.Tosi(!a.Kello(1769.9, true, 100), "sama vuosi");
            Oleta.Tosi(a.Kello(1770.0, true, 200), "vuosi vaihtui käyvällä kellolla");
            Oleta.Tosi(!a.Kello(1771.0, true, 300), "alle 125 ms edellisestä");
            Oleta.Sama(1, a.Harvennettuja);
            Oleta.Tosi(a.Kello(1772.0, true, 325), "125 ms kulunut");
            Oleta.Tosi(!a.Kello(1790.0, false, 1000), "kello seis (selaus): hiljaa");
            Oleta.Tosi(!a.Kello(1790.5, true, 1100), "selauksen vuosi on jo näytetty");
            a.Nollaa();
            Oleta.Tosi(!a.Kello(1765.0, true, 2000), "alusta: ei naksua");
            Oleta.Sama(2, a.Naksuja);
        }

        [Testi] static void KilahdusEiMerkkipaalullaEikaHiljaisella()
        {
            var a = new KeksintojenAanet();
            Oleta.Tosi(a.Sytyta(new Pysakki { Vuosi = 1769 }), "keksintö");
            Oleta.Tosi(!a.Sytyta(new Pysakki { Vuosi = 1873, Paalu = true }), "merkkipaalu 1873");
            Oleta.Tosi(!a.Sytyta(new Pysakki { Vuosi = 1800, Hiljainen = true }), "hiljainen pysäkki");
            Oleta.Sama(1, a.Kilahduksia);
        }
    }
}
