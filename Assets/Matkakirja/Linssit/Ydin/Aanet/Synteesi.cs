// LINSSIEN SYNTEESI (web js/sound.js: tone, hissNopea ja knock sekä SOUNDS.keksinto ja SOUNDS.vuosi) PCM-näytteiksi.
//
// Web soittaa Keksintöjen kilahduksen ja vuosinaksahduksen Web Audio -solmuilla, jotka se rakentaa joka kerta
// uudelleen. Natiivi laskee saman signaalin kerran näytteiksi (Unity: AudioClip.Create, Linssit/Unity/
// LinssiTehosteet) ja soittaa valmiita klippejä. Laskenta noudattaa Web Audio -spesifikaatiota ja Chromiumin
// toteutusta:
//   - AudioParam: setValueAtTime ja exponentialRampToValueAtTime, v0·(v1/v0)^((t−t0)/(t1−t0)); viimeinen arvo pysyy.
//     Webin rampit alkavat ja päättyvät 0,0001:een (Pohja).
//   - OscillatorNode 'sine': vaihe 0 aloitushetkellä, stop(t0 + dur + 0,06) (LoppuvaraS).
//   - BiquadFilterNode (Audio EQ Cookbook, Chromiumin biquad.cc): ALI- JA YLIPÄÄSTÖN Q ON DESIBELEINÄ (resonanssi
//     10^(Q/20); vuosinaksun q 0,7 on siis 1,08, ei Butterworth), kaistanpäästön Q lineaarinen. Automatisoitu
//     taajuus lasketaan näyte näytteeltä (a-rate). Kertoimet ja tila doublena, tulos float kuten Chromiumissa.
//   - Kohina: 1 s:n tasajakaumapuskuri [−1, 1) silmukkana. knock aloittaa uuden lähteen, joten se lukee puskurin
//     ALUSTA (samassa istunnossa aina sama kohinapätkä); hissNopea kierrättää yhtä kanavaa, joka soi koko ajan
//     (voimakkuus 0,0001 lyöntien välissä), joten jokainen lyönti saa eri pätkän ja suotimen lämpimän tilan.
// Kultaiset näytteet (Linssit-testit/kultaiset/tee-tehosteet.mjs) on renderöity Chromiumissa pelin omalla
// Sound-luokalla; testit vertaavat näyte näytteeltä.
//
// Satunnaisheitto (web jitter, ±3 % taajuuteen ja voimakkuuteen) arvotaan kutsujan arvalla samassa järjestyksessä
// kuin web kutsuu jitteriä: sama arpa antaa saman klipin (testit, muunnelmat). Tulos on tehosteväylän (sfx.bus)
// signaali: kuiva haara 0,82, master 0,24 ja tehosteiden säädin kuuluvat soittajalle.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Aanet
{
    /// <summary>BiquadFilterNoden tyypit, joita linssien äänet käyttävät.</summary>
    public enum Suodin { Alipaasto, Ylipaasto, Kaistanpaasto }

    /// <summary>xorshift32-kohina välillä [−1, 1) float-tarkkuudella (sama sarja kuin kultaisten näytteiden Chromium-ajossa).</summary>
    public sealed class Kohina
    {
        uint x;
        public Kohina(uint siemen) { x = siemen == 0 ? 0x2545F491u : siemen; }

        public float Seuraava()
        {
            x ^= x << 13;
            x ^= x >> 17;
            x ^= x << 5;
            return (float)(x / 4294967296.0 * 2 - 1);
        }

        /// <summary>Kohinapuskuri (web: yhden sekunnin puskuri näytetaajuudella).</summary>
        public float[] Puskuri(int naytteita)
        {
            var p = new float[naytteita];
            for (int i = 0; i < p.Length; i++) p[i] = Seuraava();
            return p;
        }
    }

    /// <summary>Yksikanavainen BiquadFilterNode (Chromium biquad.cc: Direct Form I, kertoimet normalisoitu a0:lla).</summary>
    public struct Biquad
    {
        double b0, b1, b2, a1, a2, x1, x2, y1, y2;

        /// <summary>Kertoimet taajuudesta (Hz) ja Q:sta; tila säilyy (webin automaatio vaihtaa kertoimia kesken soiton).</summary>
        public void Aseta(Suodin tyyppi, double hz, double q, int taajuus)
        {
            double c = hz / (taajuus / 2.0);   // Chromium: taajuus Nyquistin osuutena
            switch (tyyppi)
            {
                case Suodin.Alipaasto:
                    c = Math.Max(0, Math.Min(1, c));
                    if (c >= 1) Normalisoi(1, 0, 0, 1, 0, 0);
                    else if (c > 0)
                    {
                        double w = Math.PI * c, alfa = Math.Sin(w) / (2 * Math.Pow(10, q / 20)), cos = Math.Cos(w), beta = (1 - cos) / 2;
                        Normalisoi(beta, 2 * beta, beta, 1 + alfa, -2 * cos, 1 - alfa);
                    }
                    else Normalisoi(0, 0, 0, 1, 0, 0);
                    break;
                case Suodin.Ylipaasto:
                    c = Math.Max(0, Math.Min(1, c));
                    if (c >= 1) Normalisoi(0, 0, 0, 1, 0, 0);
                    else if (c > 0)
                    {
                        double w = Math.PI * c, alfa = Math.Sin(w) / (2 * Math.Pow(10, q / 20)), cos = Math.Cos(w), beta = (1 + cos) / 2;
                        Normalisoi(beta, -2 * beta, beta, 1 + alfa, -2 * cos, 1 - alfa);
                    }
                    else Normalisoi(1, 0, 0, 1, 0, 0);
                    break;
                default:
                    c = Math.Max(0, c);
                    q = Math.Max(0, q);
                    if (c > 0 && c < 1)
                    {
                        if (q > 0)
                        {
                            double w = Math.PI * c, alfa = Math.Sin(w) / (2 * q);
                            Normalisoi(alfa, 0, -alfa, 1 + alfa, -2 * Math.Cos(w), 1 - alfa);
                        }
                        else Normalisoi(1, 0, 0, 1, 0, 0);
                    }
                    else Normalisoi(0, 0, 0, 1, 0, 0);
                    break;
            }
        }

        void Normalisoi(double nb0, double nb1, double nb2, double na0, double na1, double na2)
        {
            double k = 1 / na0;
            b0 = nb0 * k; b1 = nb1 * k; b2 = nb2 * k; a1 = na1 * k; a2 = na2 * k;
        }

        public float Suodata(float x)
        {
            float y = (float)(b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2);
            x2 = x1; x1 = x;
            y2 = y1; y1 = y;
            return y;
        }
    }

    public static class Synteesi
    {
        /// <summary>Webin rampit alkavat ja päättyvät tähän (setValueAtTime(0.0001) … exponentialRamp(0.0001)).</summary>
        public const double Pohja = 0.0001;
        /// <summary>web jitter(arvo): oletusheitto ±3 %.</summary>
        public const double Heitto = 0.03;
        /// <summary>Lähde soi verhon jälkeen vielä tämän (web osc.stop / src.stop(t0 + dur + 0,06)).</summary>
        public const double LoppuvaraS = 0.06;
        /// <summary>hissNopea: nousu 12 ms (web t0 + 0,012).</summary>
        public const double SuhinanNousuS = 0.012;
        /// <summary>knock: nousu 4 ms, lyhin vaimeneminen 30 ms, osasävelten lyheneminen 22 % ja voiman jakaja (i + 1,4).</summary>
        public const double KopsahduksenNousuS = 0.004, KopsahduksenMinimiS = 0.03, OsasavelenLyheneminen = 0.22, OsasavelenJakaja = 1.4;
        /// <summary>Taajuuspyyhkäisyn alaraja (web Math.max(sweepTo, 40)).</summary>
        public const double PyyhkaisynMinimiHz = 40;

        /// <summary>web jitter: arvo · (1 + (r·2 − 1) · osuus), r ∈ [0, 1).</summary>
        public static double Heita(double arvo, double r, double osuus = Heitto) => arvo * (1 + (r * 2 - 1) * osuus);

        /// <summary>Web Audion exponentialRampToValueAtTime hetkellä t (välillä t0…t1).</summary>
        public static double Ramppi(double v0, double v1, double t0, double t1, double t) =>
            t1 <= t0 ? v1 : v0 * Math.Pow(v1 / v0, (t - t0) / (t1 - t0));

        /// <summary>
        /// Webin verho: Pohja hetkellä alku → huippu (eksponentiaalisesti) hetkeen alku + nousu → Pohja hetkeen
        /// alku + loppu, sen jälkeen Pohja pysyy.
        /// </summary>
        public static double Verho(double t, double alku, double huippu, double nousuS, double loppuS)
        {
            double tn = alku + nousuS, tl = alku + loppuS;
            if (t < tn) return Ramppi(Pohja, huippu, alku, tn, t);
            if (t < tl) return Ramppi(huippu, Pohja, tn, tl, t);
            return Pohja;
        }

        /// <summary>Näytteiden määrä kestolle (pyöristys lähimpään).</summary>
        public static int Naytteita(double sekuntia, int taajuus) => (int)Math.Round(sekuntia * taajuus);

        /// <summary>Ensimmäinen näyte, joka soi hetkellä t tai sen jälkeen (Chromium: aloitus pyöristetään ylöspäin).</summary>
        static int Kehys(double t, int taajuus) => (int)Math.Ceiling(t * taajuus - 1e-9);

        /// <summary>web tone() siniaallolla (ilman to-liukua): heitto taajuuteen ja voimakkuuteen, lisätään ulos-puskuriin.</summary>
        public static void Savel(float[] ulos, int taajuus, double alkuS, double hz, double kestoS, double gain, double attackS,
            Func<double> arpa)
        {
            double f = Heita(hz, arpa()), g = Heita(gain, arpa());
            int alku = Kehys(alkuS, taajuus), loppu = Math.Min(ulos.Length, Kehys(alkuS + kestoS + LoppuvaraS, taajuus));
            double w = 2 * Math.PI * f;
            for (int n = Math.Max(0, alku); n < loppu; n++)
            {
                double t = (double)n / taajuus;
                ulos[n] += (float)(Verho(t, alkuS, g, attackS, kestoS) * Math.Sin(w * (t - alkuS)));
            }
        }

        /// <summary>
        /// web hissNopea(): kierrätetty suhinakanava (kohina → suodin → voimakkuus) yhdelle lyönnille hetkestä alkuS
        /// puskurin loppuun. Kanava on soinut ennen lyöntiä: esirullaS sekuntia kohinaa suotimen läpi taajuudella
        /// esirullaHz (edellisen lyönnin loppu), jotta suotimen tila on lämmin. kohinanKohta = kanavan kohta puskurissa.
        /// </summary>
        public static void Suhina(float[] ulos, int taajuus, double alkuS, double kestoS, double gain, Suodin tyyppi, double hz,
            double? pyyhkaisyHz, double q, float[] kohina, int kohinanKohta, Func<double> arpa, double esirullaS = 0, double esirullaHz = 0)
        {
            double f0 = Heita(hz, arpa()), g = Heita(gain, arpa());
            double f1 = pyyhkaisyHz is double p ? Math.Max(p, PyyhkaisynMinimiHz) : f0;
            int k = ((kohinanKohta % kohina.Length) + kohina.Length) % kohina.Length;
            var s = new Biquad();
            int esi = Naytteita(esirullaS, taajuus);
            if (esi > 0)
            {
                s.Aseta(tyyppi, esirullaHz > 0 ? esirullaHz : f1, q, taajuus);
                for (int i = 0; i < esi; i++) { s.Suodata(kohina[k]); k = (k + 1) % kohina.Length; }
            }
            int alku = Math.Max(0, Kehys(alkuS, taajuus));
            double edellinen = double.NaN;
            for (int n = alku; n < ulos.Length; n++)
            {
                double t = (double)n / taajuus;
                double f = t < alkuS + kestoS ? Ramppi(f0, f1, alkuS, alkuS + kestoS, t) : f1;
                if (f != edellinen) { s.Aseta(tyyppi, f, q, taajuus); edellinen = f; }
                float y = s.Suodata(kohina[k]);
                k = (k + 1) % kohina.Length;
                ulos[n] += (float)(y * Verho(t, alkuS, g, SuhinanNousuS, kestoS));
            }
        }

        /// <summary>
        /// web knock(): kohinapurske kaistanpäästöjen läpi; jokainen taajuus on oma lähteensä, joka lukee kohinapuskurin
        /// alusta. Ylemmät osasävelet ovat hiljaisempia (voima / (i + 1,4)) ja vaimenevat nopeammin (kesto · (1 − 0,22 i)).
        /// </summary>
        public static void Kopsahdus(float[] ulos, int taajuus, double alkuS, IReadOnlyList<double> hz, double kestoS, double gain,
            double q, float[] kohina, Func<double> arpa)
        {
            int alku = Math.Max(0, Kehys(alkuS, taajuus));
            int loppu = Math.Min(ulos.Length, Kehys(alkuS + kestoS + LoppuvaraS, taajuus));
            for (int i = 0; i < hz.Count; i++)
            {
                double f = Heita(hz[i], arpa()), g = Heita(gain / (i + OsasavelenJakaja), arpa());
                double kesto = Math.Max(kestoS * (1 - i * OsasavelenLyheneminen), KopsahduksenMinimiS);
                var s = new Biquad();
                s.Aseta(Suodin.Kaistanpaasto, f, q, taajuus);
                for (int n = alku; n < loppu; n++)
                {
                    double t = (double)n / taajuus;
                    float y = s.Suodata(kohina[(n - alku) % kohina.Length]);
                    ulos[n] += (float)(y * Verho(t, alkuS, g, KopsahduksenNousuS, kesto));
                }
            }
        }

        // ── Linssien tehosteet (web SOUNDS) ─────────────────────────────────────────────────────

        /// <summary>
        /// KEKSINNÖN KILAHDUS (web SOUNDS.keksinto, omistaja 3.9.2026: "todella yksinkertaiseen"): C6 1046,5 Hz 0,4 s
        /// voimalla 0,05 ja hiljainen oktaavi 2093 Hz 0,24 s voimalla 0,01 kymmenen millisekuntia myöhemmin; nousu 8 ms.
        /// </summary>
        public static float[] Keksinto(int taajuus, Func<double> arpa)
        {
            var ulos = new float[Naytteita(KeksinnonKestoS, taajuus)];
            Savel(ulos, taajuus, 0, 1046.5, 0.4, 0.05, 0.008, arpa);
            Savel(ulos, taajuus, 0.01, 2093, 0.24, 0.01, 0.008, arpa);
            return ulos;
        }

        /// <summary>Kilahduksen klipin pituus: C6:n verho 0,4 s + lähteen loppuvara 0,06 s.</summary>
        public const double KeksinnonKestoS = 0.4 + LoppuvaraS;

        /// <summary>
        /// VUOSILUVUN NAKSAHDUS (web SOUNDS.vuosi, omistaja 3.9.2026): mekaanisen laskurin naksu. Kierrätetyn kanavan
        /// ylipäästösuhina 28 ms (5 200 → 3 200 Hz eksponentiaalisesti, q 0,7 dB, voima 0,014) ja sen päällä yksi
        /// kuiva kopsahdus 2 400 Hz (kaistanpäästö Q 12, voima 0,03 / 1,4, vaimeneminen 30 ms, lähde 82 ms).
        /// suhinanKohta = kanavan kohta kohinapuskurissa; esirullaS lämmittää suotimen edellisen lyönnin taajuudella.
        /// </summary>
        public static float[] Vuosi(int taajuus, Func<double> arpa, float[] kohina, int suhinanKohta = 0, double esirullaS = 0)
        {
            var ulos = new float[Naytteita(VuodenKestoS, taajuus)];
            Suhina(ulos, taajuus, 0, 0.028, 0.014, Suodin.Ylipaasto, 5200, 3200, 0.7, kohina, suhinanKohta, arpa, esirullaS, 3200);
            Kopsahdus(ulos, taajuus, 0, new[] { 2400.0 }, 0.022, 0.03, 12, kohina, arpa);
            return ulos;
        }

        /// <summary>Naksun klipin pituus: kopsahduksen 22 ms + lähteen loppuvara 0,06 s.</summary>
        public const double VuodenKestoS = 0.022 + LoppuvaraS;
    }
}
