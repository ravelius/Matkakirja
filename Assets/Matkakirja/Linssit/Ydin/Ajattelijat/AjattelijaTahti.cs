// AJATTELIJAN KUVA JA ÄÄNI SAMAAN TAHTIIN (omistaja TF 133, 3.10.2026 klo 23.4x: introssa iskut "ovat lähellä mutta eivät
// ihan osu"; Päätoimittaja: PlayScheduled samaan dspTime-hetkeen, kello dspTimesta, laitteen viive kompensoituna).
//
// Ennen kohtauksen kello oli puheraidan AudioSource.time (kelloa siirrettiin vain puskurin välein) tai prologissa ruutujen
// summa, ja raidat käynnistettiin Play():lla seuraavassa puskurissa; laitteen ulostulon viivettä (Core Audio, Bluetooth) ei
// huomioitu, joten kuva oli ääntä edellä viiveen verran. Nyt yksi kello kaikelle:
//   - ankkuri dspNolla = äänikellon (AudioSettings.dspTime) hetki, jolloin kohtauksen ruutu 0 KUULUISI;
//   - äänet ajastetaan PlayScheduledilla: kytkin dspNolla + kytkin/30, puhe ja musiikki dspNolla + prologi.loppu/30;
//   - kuvan ruutu = (dspNyt − dspNolla − viive) · 30, missä viive = ulostulon viive − näytön viive: ruutu g näkyy silloin, kun
//     sen ääni kuuluu.
// Puhdas C#: ankkurin ja ajastusten laskenta (Linssit-testit AjattelijaTahtiTestit); Unity-puoli AjattelijatSovitin.
using System;

namespace Matkakirja.Linssit.Ajattelijat
{
    public static class AjattelijaTahti
    {
        /// <summary>Lyhin etumatka ajastukselle (s): PlayScheduled menneeseen hetkeen soittaisi heti ja myöhässä.</summary>
        public const double Etumatka = 0.05;

        /// <summary>Ankkuri niin, että kuva jatkaa ruudusta g nyt ilman hyppyä: dspNolla = dspNyt − viive − g / 30.</summary>
        public static double Ankkuri(double dspNyt, double g, double viive) => dspNyt - viive - g / AjattelijaAikajana.RuutuaSekunnissa;

        /// <summary>
        /// Ankkuri, jolla ensimmäinen ajastettava ääni (ruudussa ensimmainen) ehtii vähintään Etumatkan päähän. Jos laitteen viive
        /// on suuri (Bluetooth), kuva odottaa mustassa prologissa sen verran (ruutu ei kasva ennen kuin ääni ehtii).
        /// </summary>
        public static double Ankkuri(double dspNyt, double g, double viive, double ensimmainen)
        {
            double a = Ankkuri(dspNyt, g, viive);
            double alin = dspNyt + Etumatka - ensimmainen / AjattelijaAikajana.RuutuaSekunnissa;
            return Math.Max(a, alin);
        }

        /// <summary>Kuvan ruutu äänikellon hetkellä dspNyt.</summary>
        public static double Ruutu(double dspNyt, double dspNolla, double viive) =>
            (dspNyt - dspNolla - viive) * AjattelijaAikajana.RuutuaSekunnissa;

        /// <summary>Äänikellon hetki, jolloin ruudun r ääni alkaa (PlayScheduled).</summary>
        public static double Hetki(double dspNolla, double r) => dspNolla + r / AjattelijaAikajana.RuutuaSekunnissa;

        /// <summary>
        /// Raidan ajastus: alkaa ruudusta alku (prologi.loppu). Jos sen hetki on jo ohi (ääni latautui myöhässä), raita liittyy
        /// kesken: alku Etumatkan päähän ja kohta raidan sisällä niin, että näyte osuu samaan ruutuun kuin ajoissa alkanut.
        /// </summary>
        public static (double hetki, double kohta) Ajastus(double dspNyt, double dspNolla, double alku)
        {
            double h = Hetki(dspNolla, alku);
            if (h >= dspNyt + Etumatka) return (h, 0);
            double t = dspNyt + Etumatka;
            return (t, t - h);
        }

        /// <summary>
        /// Intron leikkaukset (aikajanan ruudut): kameran avain, jota edeltää paikallaan pysyvä avain (CONSTANT, ei ajoa) ja
        /// jossa paikka vaihtuu. Mittaukseen (Päätoimittaja 4.10.: kuvan ja iskun ero jokaiselle introleikkaukselle).
        /// </summary>
        public static System.Collections.Generic.List<double> Leikkaukset(System.Collections.Generic.IReadOnlyList<AikajanaKameraAvain> k, double enintaan)
        {
            var l = new System.Collections.Generic.List<double>();
            for (int i = 1; i < k.Count; i++)
            {
                if (k[i].R > enintaan) break;
                if (k[i - 1].Ajo) continue;   // liukuva ajo, ei leikkausta
                if (!Sama(k[i - 1].Paikka, k[i].Paikka) || !Sama(k[i - 1].Katse, k[i].Katse)) l.Add(k[i].R);
            }
            return l;
        }

        static bool Sama(double[] a, double[] b)
        {
            if (a == null || b == null || a.Length != b.Length) return a == b;
            for (int i = 0; i < a.Length; i++) if (Math.Abs(a[i] - b[i]) > 1e-9) return false;
            return true;
        }

        /// <summary>
        /// Musiikin isku hetken t (s) lähellä (±ikkuna s): 5 ms:n energiajaksojen suurin nousu (onset). Palauttaa iskun hetken
        /// (s, raidan aikaa) tai NaN, jos ikkunassa ei ole selvää nousua (alle 3 × mediaaninousu tai 15 % keskitasosta). Näytteet monona.
        /// </summary>
        public static double Isku(float[] mono, int taajuus, double alku, double t, double ikkuna = 0.2)
        {
            int jakso = Math.Max(1, taajuus / 200);
            int n = mono.Length / jakso;
            if (n < 3) return double.NaN;
            var e = new double[n];
            for (int j = 0; j < n; j++)
            {
                double s = 0;
                for (int i = j * jakso; i < (j + 1) * jakso; i++) s += mono[i] * mono[i];
                e[j] = Math.Sqrt(s / jakso);
            }
            var nousut = new double[n];
            int paras = -1; double suurin = 0;
            for (int j = 1; j < n; j++)
            {
                nousut[j] = Math.Max(0, e[j] - e[j - 1]);
                double hetki = alku + j * (double)jakso / taajuus;
                if (Math.Abs(hetki - t) <= ikkuna && nousut[j] > suurin) { suurin = nousut[j]; paras = j; }
            }
            var jarj = (double[])nousut.Clone();
            Array.Sort(jarj);
            double mediaani = jarj[n / 2];
            double keski = 0; foreach (var x in e) keski += x; keski /= n;
            // Selvä isku: nousu vähintään 3 × tavallinen nousu ja 15 % keskitasosta (tasainen sävy tai kohina ei kelpaa).
            if (paras < 0 || suurin < Math.Max(3 * mediaani, 0.15 * keski) || suurin < 1e-6) return double.NaN;
            return alku + paras * (double)jakso / taajuus;
        }

        /// <summary>
        /// Tasainen äänikello: AudioSettings.dspTime etenee puskurin kerrallaan (iOS 5–21 ms), joten sen väliin interpoloidaan
        /// reaaliajalla (enintään Raja s) ja arvo ei koskaan pienene. Kuvan ruutu ei näin nyi puskurin tahdissa.
        /// </summary>
        public sealed class Kello
        {
            public const double Raja = 0.1;
            double dsp = double.NaN, realKun, viimeisin = double.NegativeInfinity;

            public double Nyt(double dspNyt, double realNyt)
            {
                if (double.IsNaN(dsp) || dspNyt != dsp) { dsp = dspNyt; realKun = realNyt; }
                double arvo = dsp + Math.Min(Raja, Math.Max(0, realNyt - realKun));
                if (arvo < viimeisin) arvo = viimeisin;
                viimeisin = arvo;
                return arvo;
            }

            public void Nollaa() { dsp = double.NaN; viimeisin = double.NegativeInfinity; }
        }
    }
}
