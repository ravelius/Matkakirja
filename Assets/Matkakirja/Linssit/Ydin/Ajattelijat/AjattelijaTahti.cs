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
