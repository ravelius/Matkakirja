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

        /// <summary>MP3:n alun tiedot Xing/Info- ja LAME-tagista: kehykset, näytteet kehyksessä, enkooderin viive ja loppujen täyte.</summary>
        public readonly struct Mp3Tiedot
        {
            public readonly int Kehyksia, KehyksenNaytteet, Viive, Tayte;
            public Mp3Tiedot(int k, int n, int v, int t) { Kehyksia = k; KehyksenNaytteet = n; Viive = v; Tayte = t; }
            /// <summary>Koko dekoodattu pituus ilman leikkausta.</summary>
            public long Naytteita => (long)Kehyksia * KehyksenNaytteet;
        }

        /// <summary>MP3-dekooderin oma viive (LAME/ffmpeg: 529 näytettä), joka lisätään tagin enkooderiviiveeseen.</summary>
        public const int DekooderinViive = 529;

        /// <summary>
        /// MP3-ALKUVIIVE (Linssiseppä 2 4.10.2026, Päätoimittaja: poista LAME-alkuviive natiivista): ajattelijan v14-musiikin
        /// alussa on 576 + 529 = 1105 näytettä hiljaisuutta (23 ms 48 kHz:llä), jonka ffmpeg ja selaimet leikkaavat tagin mukaan.
        /// Lukee ID3v2:n yli ensimmäisen kehyksen Xing/Info-tagin ja sen LAME-laajennuksen (viive 12 bittiä, täyte 12 bittiä);
        /// null = ei tagia (tasan alkava raita, tai muu kuin MP3).
        /// </summary>
        public static Mp3Tiedot? Mp3Alku(byte[] b)
        {
            if (b == null || b.Length < 200) return null;
            int i = 0;
            if (b[0] == 'I' && b[1] == 'D' && b[2] == '3' && b.Length > 10)
                i = 10 + ((b[6] & 0x7f) << 21 | (b[7] & 0x7f) << 14 | (b[8] & 0x7f) << 7 | (b[9] & 0x7f)) + ((b[5] & 0x10) != 0 ? 10 : 0);
            for (; i + 4 < b.Length; i++) if (b[i] == 0xFF && (b[i + 1] & 0xE0) == 0xE0) break;
            if (i + 4 >= b.Length) return null;
            int versio = (b[i + 1] >> 3) & 3, kerros = (b[i + 1] >> 1) & 3, kanavat = (b[i + 3] >> 6) & 3;
            if (kerros != 1) return null;                                   // vain Layer III
            bool mpeg1 = versio == 3;
            int sivu = mpeg1 ? (kanavat == 3 ? 17 : 32) : (kanavat == 3 ? 9 : 17);
            int x = i + 4 + sivu;
            if (x + 120 + 24 > b.Length) return null;
            string tag = System.Text.Encoding.ASCII.GetString(b, x, 4);
            if (tag != "Xing" && tag != "Info") return null;
            int liput = b[x + 4] << 24 | b[x + 5] << 16 | b[x + 6] << 8 | b[x + 7];
            int o = x + 8, kehyksia = 0;
            if ((liput & 1) != 0) { kehyksia = b[o] << 24 | b[o + 1] << 16 | b[o + 2] << 8 | b[o + 3]; o += 4; }
            if ((liput & 2) != 0) o += 4;
            if ((liput & 4) != 0) o += 100;
            if ((liput & 8) != 0) o += 4;
            int viive = 0, tayte = 0;
            if (o + 24 <= b.Length)
            {
                viive = b[o + 21] << 4 | b[o + 22] >> 4;
                tayte = (b[o + 22] & 0x0F) << 8 | b[o + 23];
            }
            return new Mp3Tiedot(kehyksia, mpeg1 ? 1152 : 576, viive, tayte);
        }

        /// <summary>
        /// Ohitettavat näytteet raidan alusta: jos dekooderi EI leikannut (näytteitä ≈ kehykset × näytteet), viive + 529;
        /// jos leikkasi (tai tagia ei ole), 0.
        /// </summary>
        public static int Mp3Ohitus(Mp3Tiedot? t, long naytteita)
        {
            if (t == null || t.Value.Kehyksia <= 0 || t.Value.Viive <= 0) return 0;
            return naytteita >= t.Value.Naytteita - t.Value.KehyksenNaytteet / 2 ? t.Value.Viive + DekooderinViive : 0;
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
