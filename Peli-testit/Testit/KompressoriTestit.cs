// Äänimaiseman kompressori (Peli/Aani/Kompressori.cs, B7 §2.2): Chromiumin DynamicsCompressorin portti.
// Kultaiset arvot on renderöity Chromium 151:n OfflineAudioContextissa (48 kHz, DynamicsCompressorNode
// threshold −24, knee 18, ratio 4, attack 0,01, release 0,35; tulo mono-DC-portaat 0,01 → 1,0 → 0,01).
// Portti tuotti saman ajon bitilleen samana (ja stereosignaalilla 44,1 kHz:ssä ero ≤ 2,4e−7).
using System;

namespace Matkakirja.Peli.Testit
{
    static class KompressoriTestit
    {
        const int Sr = 48000;

        static void Lahella(double odotettu, double saatu, double tol, string viesti = "")
        {
            if (!(Math.Abs(odotettu - saatu) <= tol)) throw new Exception($"odotettu {odotettu:R}, saatu {saatu:R} (tol {tol}) {viesti}");
        }

        static double Db(double x) => 20 * Math.Log10(x);

        /// <summary>DC-portaat kuten kultaisessa ajossa: 0–0,5 s 0,01; 0,5–1,5 s 1,0; 1,5–3 s 0,01. Stereo lomitettuna.</summary>
        static float Porras(int i) => i >= Sr / 2 && i < Sr * 3 / 2 ? 1f : 0.01f;

        static float[] AjaPortaat(int puskuri, int kanavia = 2)
        {
            int n = Sr * 3;
            var ulos = new float[n];
            var k = Kompressori.Maisema();
            var b = new float[puskuri * kanavia];
            for (int p = 0; p < n; p += puskuri)
            {
                int m = Math.Min(puskuri, n - p);
                if (m != puskuri) b = new float[m * kanavia];
                for (int i = 0; i < m; i++) for (int c = 0; c < kanavia; c++) b[i * kanavia + c] = Porras(p + i);
                k.Prosessoi(b, kanavia, Sr);
                for (int i = 0; i < m; i++) ulos[p + i] = b[i * kanavia];
            }
            return ulos;
        }

        /// <summary>Kokonaisvahvistus dB:nä ulostulon kohdassa i (tulo on viivästetty 288 näytettä).</summary>
        static double VahvistusDb(float[] ulos, int i) => Db(ulos[i] / Porras(i - 288));

        // =====================================================================
        // STAATTINEN KÄYRÄ JA MAKEUP
        // =====================================================================

        [Testi] static void KayraOnLineaarinenKynnykseenAsti()
        {
            var k = Kompressori.Maisema();
            foreach (var x in new[] { 0.0001f, 0.001f, 0.01f, 0.05f, 0.0630f })
                Oleta.Sama(x, k.Kayra(x), "kynnyksen (−24 dB = 0,0631) alla 1:1");
        }

        [Testi] static void KayranTunnetutArvot()
        {
            var k = Kompressori.Maisema();
            Lahella(4.782231, k.K, 1e-5, "polven k (KAtSlope(1/4))");
            Lahella(6.3988, Db(k.Makeup), 1e-3, "makeup (1 / Saturate(1))^0,6");
            // 0 dBFS: −10,665 dB puristus + 6,399 makeup = −4,266 dB (Chromium DC 1,0: 0,611938).
            Lahella(-4.2659, k.KayraDb(0), 1e-3, "0 dBFS");
            Lahella(-40 + 6.3988, k.KayraDb(-40), 1e-3, "−40 dBFS: vain makeup");
            // Polven jälkeen (≥ −6 dB) kaltevuus on tasan 1/ratio.
            Lahella(1.5, k.KayraDb(0) - k.KayraDb(-6), 1e-3, "−6 → 0 dB: 6 / 4");
            Lahella(2.5, k.KayraDb(6) - k.KayraDb(-4), 1e-3, "−4 → +6 dB: 10 / 4");
            // Polvessa (−24…−6 dB) kaltevuus laskee 1:stä kohti 1/4:ää eikä käyrä hyppää.
            double edellinen = double.MaxValue;
            for (double db = -24; db <= -6.0001; db += 0.5)
            {
                double s = (k.KayraDb((float)db + 0.1f) - k.KayraDb((float)db)) / 0.1;
                Oleta.Tosi(s <= edellinen + 1e-3 && s > 0.2 && s <= 1.001, $"kaltevuus {s} kohdassa {db} dB");
                edellinen = s;
            }
            Lahella(k.KayraDb(-6.001f), k.KayraDb(-5.999f), 2e-3, "jatkuva polven lopussa");
        }

        [Testi] static void HiljainenSignaaliSaaMakeupin()
        {
            // Web-maisema soi hiljaisilla tasoilla noin +6,4 dB kaavaa kovempaa (Chromiumin makeup).
            var u = AjaPortaat(1024);
            Lahella(6.3987, VahvistusDb(u, (int)(0.49 * Sr) + 288), 1e-3, "asettunut −40 dBFS");
            Lahella(6.3987, VahvistusDb(u, (int)(2.9 * Sr) + 288), 1e-3, "vapautuksen jälkeen");
            // Siniaalto −30 dBFS: huippuarvo × makeup.
            var k = Kompressori.Maisema();
            var b = new float[Sr * 2];
            for (int i = 0; i < Sr; i++) b[2 * i] = b[2 * i + 1] = (float)(0.0316 * Math.Sin(2 * Math.PI * 440 * i / Sr));
            k.Prosessoi(b, 2, Sr);
            float huippu = 0;
            for (int i = Sr / 2; i < Sr; i++) huippu = Math.Max(huippu, Math.Abs(b[2 * i]));
            Lahella(6.3988, Db(huippu / 0.0316), 0.01, "sini −30 dBFS");
        }

        // =====================================================================
        // CHROMIUMIN KULTAINEN AJO
        // =====================================================================

        static readonly (int i, double arvo)[] Kultaiset =
        {
            (5088, 0.015987897291779518), (14688, 0.020867716521024704), (23808, 0.020889846608042717),
            (24336, 0.801297128200531), (24384, 0.7389070391654968), (24528, 0.649834156036377),
            (24768, 0.6169369220733643), (25248, 0.6120218634605408), (48288, 0.6119379997253418),
            (72336, 0.006296290550380945), (72768, 0.006938016042113304), (74688, 0.01145198941230774),
            (77088, 0.015646260231733322), (81888, 0.019608724862337112), (89088, 0.02088985964655876),
            (120288, 0.020889846608042717),
        };

        [Testi] static void SamaKuinChromium()
        {
            var u = AjaPortaat(128);
            foreach (var (i, arvo) in Kultaiset) Lahella(arvo, u[i], 2e-6 * Math.Max(1, arvo * 10), "näyte " + i);
        }

        [Testi] static void PuskurinKokoEiVaikuta()
        {
            var a = AjaPortaat(128);
            foreach (var p in new[] { 1, 441, 1024, 4096 })
            {
                var b = AjaPortaat(p);
                for (int i = 0; i < a.Length; i++)
                    if (a[i] != b[i]) throw new Exception($"puskuri {p}: näyte {i} {b[i]:R} ≠ {a[i]:R}");
            }
        }

        [Testi] static void MonoJaStereoSamat()
        {
            var s = AjaPortaat(1024, 2);
            var m = AjaPortaat(1024, 1);
            for (int i = 0; i < s.Length; i++) if (s[i] != m[i]) throw new Exception("näyte " + i);
        }

        [Testi] static void PreDelayOn6ms()
        {
            var u = AjaPortaat(1024);
            for (int i = 0; i < 288; i++) Oleta.Sama(0f, u[i], "viive " + i);
            Oleta.Tosi(u[288] > 0, "ensimmäinen näyte 288:ssa (6 ms × 48 kHz)");
            var k = Kompressori.Maisema();
            k.Prosessoi(new float[64], 2, 44100);
            Oleta.Sama(264, k.Viive, "44,1 kHz: floor(0,006 × 44100)");
        }

        // =====================================================================
        // ATTACK JA RELEASE
        // =====================================================================

        /// <summary>Näytteitä portaan (viivästämätön tulo) jälkeen, kunnes osuus dB-muutoksesta on saavutettu.</summary>
        static double AikaMs(float[] u, int porras, double alku, double loppu, double osuus)
        {
            double raja = alku + (loppu - alku) * osuus;
            for (int n = 0; n < Sr; n++)
            {
                double g = VahvistusDb(u, porras + n);
                if (loppu < alku ? g <= raja : g >= raja) return n * 1000.0 / Sr;
            }
            return double.PositiveInfinity;
        }

        [Testi] static void AttackOnKymmenenMillisekunnin()
        {
            var u = AjaPortaat(512);
            double hiljaa = VahvistusDb(u, Sr / 2 - 1), kova = VahvistusDb(u, Sr + 288);
            Lahella(-4.2659, kova, 1e-3, "asettunut 0 dBFS");
            // Chromium: 63 % 5,46 ms, 90 % 9,17 ms, 99 % 15,0 ms (6 ms:n lookahead mukana).
            double t63 = AikaMs(u, Sr / 2, hiljaa, kova, 0.632), t90 = AikaMs(u, Sr / 2, hiljaa, kova, 0.9);
            double t99 = AikaMs(u, Sr / 2, hiljaa, kova, 0.99);
            Lahella(5.458, t63, 0.05, "63 %");
            Lahella(9.167, t90, 0.05, "90 %");
            Lahella(15.0, t99, 0.05, "99 %");
            Oleta.Tosi(t63 < 10 && t99 < 20, "attack 10 ms");
            // Lookahead: vahvistus laskee ennen kuin kova näyte tulee ulos (288 näytettä portaan jälkeen).
            Oleta.Tosi(VahvistusDb(u, Sr / 2 + 287) < 0, "puristus alkaa ennen kovaa näytettä");
        }

        [Testi] static void ReleaseOn350Millisekunnin()
        {
            var u = AjaPortaat(512);
            double kova = VahvistusDb(u, Sr + 288), hiljaa = VahvistusDb(u, (int)(2.9 * Sr));
            int porras = Sr * 3 / 2;
            // Chromium (adaptiivinen vapautus): 50 % 54,7 ms, 63 % 74,7 ms, 90 % 166 ms, 99 % 271 ms.
            Lahella(54.667, AikaMs(u, porras, kova, hiljaa, 0.5), 0.05, "50 %");
            Lahella(74.708, AikaMs(u, porras, kova, hiljaa, 0.632), 0.05, "63 %");
            Lahella(166.125, AikaMs(u, porras, kova, hiljaa, 0.9), 0.05, "90 %");
            Lahella(271.479, AikaMs(u, porras, kova, hiljaa, 0.99), 0.05, "99 %");
            Lahella(6.3987, VahvistusDb(u, porras + Sr * 35 / 100), 1e-3, "350 ms: takaisin makeupissa");
        }

        // =====================================================================
        // TASO JA ÄÄNISÄIE
        // =====================================================================

        [Testi] static void TasoKerrotaanKompressorinJalkeen()
        {
            // Taso ei muuta puristusta (web: kompressori → gain): 0,25 × taso 1:n ulostulo.
            var a = Kompressori.Maisema(); var b = Kompressori.Maisema();
            var x = new float[2048]; var y = new float[2048];
            for (int i = 0; i < 1024; i++) x[2 * i] = x[2 * i + 1] = y[2 * i] = y[2 * i + 1] = (float)Math.Sin(i * 0.05);
            for (int kierros = 0; kierros < 20; kierros++)
            {
                var xx = (float[])x.Clone(); var yy = (float[])y.Clone();
                a.Prosessoi(xx, 2, Sr);
                b.Prosessoi(yy, 2, Sr, 0.25f, 0.25f);
                for (int i = 0; i < xx.Length; i++) Lahella(xx[i] * 0.25, yy[i], 1e-7, "näyte " + i);
            }
            // Taso yli 1:n sallitaan (web-gain), eikä sitä leikata.
            var c = Asettunut();
            var z = FillDc(0.01f);
            c.Prosessoi(z, 2, Sr, 3f, 3f);
            Lahella(0.01 * 3 * c.Makeup, z[2047], 1e-6, "taso 3");
        }

        static float[] FillDc(float v) { var z = new float[2048]; for (int i = 0; i < z.Length; i++) z[i] = v; return z; }

        /// <summary>Kompressori 0,6 s DC 0,01:n jälkeen: Chromiumin alkutransientti (detektori 0 → hyökkäys) ohi.</summary>
        static Kompressori Asettunut()
        {
            var k = Kompressori.Maisema();
            for (int i = 0; i < 30; i++) k.Prosessoi(FillDc(0.01f), 2, Sr);
            return k;
        }

        [Testi] static void AlkutransienttiKutenChromiumissa()
        {
            // Chromium aloittaa detektorin nollasta, joten ensimmäiset ~0,3 s ovat hiljaisempia
            // (0,1 s: +4,08 dB, 0,3 s: +6,39 dB). Soitin nollaa kompressorin uuden klipin alussa
            // kuten web luo jokaiselle soittimelle uuden solmun; maiseman 1,8 s:n nousu peittää tämän.
            var u = AjaPortaat(1024);
            Lahella(4.0758, VahvistusDb(u, 5088), 1e-3, "0,1 s");
            Lahella(6.3895, VahvistusDb(u, 14688), 1e-3, "0,3 s");
        }

        [Testi] static void TasoInterpoloidaanPuskurinYli()
        {
            var k = Asettunut();
            var z = FillDc(0.01f);
            k.Prosessoi(z, 2, Sr, 0f, 1f);
            double g = 0.01 * k.Makeup;
            Lahella(g / 1024, z[0], g * 1e-4, "ensimmäinen kehys = 1/1024");
            Lahella(g * 512 / 1024, z[2 * 511], g * 1e-4, "puoliväli");
            Lahella(g, z[2046], g * 1e-4, "viimeinen kehys = tasoLoppu");
            Oleta.Sama(z[2046], z[2047], "kanavat samalla tasolla");
        }

        [Testi] static void NollausPalauttaaAlkutilan()
        {
            var a = Kompressori.Maisema();
            var x = FillDc(0.8f); a.Prosessoi(x, 2, Sr);
            a.Nollaa();
            var y = FillDc(0.3f); a.Prosessoi(y, 2, Sr);
            var b = Kompressori.Maisema();
            var z = FillDc(0.3f); b.Prosessoi(z, 2, Sr);
            for (int i = 0; i < y.Length; i++) Oleta.Sama(z[i], y[i], "näyte " + i);
        }

        [Testi] static void EiAllokoiAanisaikeessa()
        {
            var k = Kompressori.Maisema();
            var b = FillDc(0.5f);
            k.Prosessoi(b, 2, Sr); // näytetaajuus ja kanavat asetettu
            long ennen = GC.GetAllocatedBytesForCurrentThread();
            for (int i = 0; i < 100; i++) { k.Prosessoi(b, 2, Sr, 0.5f, 0.7f); k.Prosessoi(b, 1, 44100); k.Prosessoi(b, 2, 48000); }
            Oleta.Sama(0L, GC.GetAllocatedBytesForCurrentThread() - ennen, "tavuja");
        }

        [Testi] static void KelvotonSyoteEiKaada()
        {
            var k = Kompressori.Maisema();
            k.Prosessoi(null, 2, Sr);
            k.Prosessoi(new float[0], 2, Sr);
            k.Prosessoi(new float[3], 0, Sr);
            var b = FillDc(float.NaN);
            k.Prosessoi(b, 2, Sr);
            var c = FillDc(0.01f);
            for (int i = 0; i < 50; i++) { c = FillDc(0.01f); k.Prosessoi(c, 2, Sr); }
            Oleta.Tosi(!float.IsNaN(k.Vahvistus), "NaN ei jää tilaan");
            // Yli 8 kanavaa: vain taso.
            var d = new float[10 * 4]; for (int i = 0; i < d.Length; i++) d[i] = 1f;
            k.Prosessoi(d, 10, Sr, 0.5f, 0.5f);
            Oleta.Sama(0.5f, d[39]);
        }
    }
}
