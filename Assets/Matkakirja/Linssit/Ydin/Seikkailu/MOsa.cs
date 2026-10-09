// HISTORIAMOOTTORI M-OSA (Siirtoseppä 8.10.2026; pelattavuusmalli-olavinlinna.md kohdat 2.6 ja 8.2 huoneet 7–9). Puhtaat säännöt:
// - Kiipeily: otteelta seuraavalle 0,6 s (ote:kellotorni-1…10), aloitettu siirtymä viedään loppuun, ei hyppyä. Puuska (tuuli:puuska-N
//   otteen kohdalla, kerran per ote) varoittaa 1,5 s ja kestää 2,5 s; liike puuskassa lipsauttaa (ote pitää, 0,5 s toipuminen), toinen
//   liike samassa puuskassa = toinen lipsahdus peräkkäin → himmennys 0,4 s ja alkuun. Lyhty yllä: valopiiri
//   kasvaa seinällä 2 s, sitten valo 4 s; liike valossa → havaittu (hälytys ja tyrmä sovittimessa). Ei putoamiskuvaa, ei kuolemaa.
//   Otetyypit (LR v45y, PT 9.10. kohta 2.6): VOIMA kuluu seinällä (täysi 1 → 0 VoimaS:ssa; kapealla × KapeaKulutus), loppuessa ote
//   pettää (himmennys ja alkuun kuten toinen lipsahdus). KAPEA ote: siirtymä sille KapeaOteS ja tarkkuus — perillä pysähdys
//   KapeaPysahdysS ennen jatkoa, muuten lipsahdus (ote pitää). LEPO-ote: voima palautuu LepoPalautus/s, suojassa puuskalta (tukeva).
// - Kilpilukko: kaksi kääntyvää kilpeä, oikea asento 45° toisiaan kohti ±10° → kansi aukeaa; väärä → kolahdus 6 m, ei rangaistusta.
// - Tiilet: 6 tiiltä × 2 raapaisua; ensimmäinen irrotettu putoaa aina kalliolle (14 m), muut: hidas veto komeroon, nopea pudottaa;
//   toinen putoava 10 s:n sisällä → vartija kurkistaa.
// - Lukittu ovi: ilman avainta kahva kolahtaa 6 m; avaimella hidas avaus äänetön, nopea narahtaa (aani_nopea_m).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Seikkailu
{
    public sealed class Kiipeily
    {
        public const double OteS = 0.6, ToipuminenS = 0.5, PuuskaVaroitusS = 1.5, PuuskaS = 2.5, HimmennysS = 0.4, LyhtyVaroitusS = 2.0, LyhtyS = 4.0;
        public const double VoimaS = 30, KapeaKulutus = 1.6, LepoPalautus = 0.25, KapeaOteS = 1.0, KapeaPysahdysS = 0.35;
        public readonly int Otteita;
        readonly HashSet<int> puuskaOtteet, kapeat, levot;
        /// <summary>Voima 0–1 (1 = levännyt); 0 → ote pettää.</summary>
        public double Voima { get; private set; } = 1;
        public bool Kapea(int ote) => kapeat.Contains(ote);
        public bool Lepo(int ote) => levot.Contains(ote);
        /// <summary>Kapealla otteella pysähdys kesken (tarkka ote): jatko ennen KapeaPysahdysS:ää lipsauttaa.</summary>
        public bool KapeaOdottaa => Siirtyy == 0 && Kapea(Ote) && kapeaPysahdys > 0;
        double kapeaPysahdys;
        readonly HashSet<int> puuskatKayty = new HashSet<int>();
        /// <summary>Nykyinen ote (0-pohjainen) ja siirtymän osuus seuraavaan (0…1; suunta Siirtyy).</summary>
        public int Ote { get; private set; }
        public double Osuus { get; private set; }
        public int Siirtyy { get; private set; }
        public bool PuuskaVaroittaa => puuskaVaroitus > 0;
        public bool Puuska => puuska > 0;
        public bool LyhtyVaroittaa => lyhtyVaroitus > 0;
        public bool LyhtyValaisee => lyhty > 0;
        /// <summary>Lipsahdukset tässä puuskassa (nollautuu puuskan päättyessä).</summary>
        public int Lipsahdukset { get; private set; }
        /// <summary>Tapahtumat (kerran; sovitin nollaa): lipsahti, putosi (himmennys alkaa), havaittu lyhdyn valossa.</summary>
        public bool Lipsahti, Putosi, Havaittu;
        /// <summary>Viimeisin putoaminen johtui voiman loppumisesta (ei lipsahduksista); sovitin nollaa.</summary>
        public bool VoimaLoppui;
        public bool Himmenee => himmennys > 0;
        /// <summary>Viimeiseltä otteelta eteenpäin: perillä (komeron kynnys).</summary>
        public bool Perilla { get; private set; }
        double puuskaVaroitus, puuska, lyhtyVaroitus, lyhty, himmennys, toipuminen;

        public Kiipeily(int otteita, IEnumerable<int> puuskaOtteet = null, IEnumerable<int> kapeat = null, IEnumerable<int> levot = null)
        {
            Otteita = Math.Max(1, otteita);
            this.puuskaOtteet = new HashSet<int>(puuskaOtteet ?? Array.Empty<int>());
            this.kapeat = new HashSet<int>(kapeat ?? Array.Empty<int>());
            this.levot = new HashSet<int>(levot ?? Array.Empty<int>());
        }

        // Ajastimet päättyvät pyöristysvaralla (0,05 s:n askelin 2,5 s ei jää kehystä yli).
        static bool Loppui(ref double x, double dt) { x -= dt; if (x > 1e-6) return false; x = 0; return true; }

        /// <summary>Lyhty kulkee yläpuolella (sovitin ajastaa kerran): varoitus 2 s, sitten valo 4 s.</summary>
        public void LyhtyYlla() { if (lyhty <= 0 && lyhtyVaroitus <= 0) lyhtyVaroitus = LyhtyVaroitusS; }

        /// <summary>suunta +1 = eteen (seuraava ote), −1 = taakse, 0 = paikallaan.</summary>
        public void Paivita(double dt, int suunta)
        {
            if (himmennys > 0)
            {
                if (Loppui(ref himmennys, dt)) { Ote = 0; Osuus = 0; Siirtyy = 0; Lipsahdukset = 0; puuskaVaroitus = puuska = toipuminen = kapeaPysahdys = 0; puuskatKayty.Clear(); Voima = 1; }
                return;
            }
            if (Perilla) return;
            // Voima: lepo-otteella (paikallaan) palautuu, muuten kuluu; kapealla (otteella tai siirtymässä sille) nopeammin.
            bool lepaa = Siirtyy == 0 && Lepo(Ote);
            bool kapealla = Kapea(Ote) || Siirtyy != 0 && Kapea(Ote + Siirtyy);
            Voima = lepaa ? Math.Min(1, Voima + LepoPalautus * dt) : Math.Max(0, Voima - dt / VoimaS * (kapealla ? KapeaKulutus : 1));
            if (Voima <= 1e-9) { Putosi = true; VoimaLoppui = true; himmennys = HimmennysS; toipuminen = 0; return; }
            if (kapeaPysahdys > 0 && suunta == 0) Loppui(ref kapeaPysahdys, dt);
            if (puuskaVaroitus > 0 && Loppui(ref puuskaVaroitus, dt)) { puuska = PuuskaS; Lipsahdukset = 0; }
            else if (puuska > 0 && Loppui(ref puuska, dt)) { Lipsahdukset = 0; toipuminen = 0; }
            // Lyhdyn kello kulkee myös lipsahduksen toipumisen aikana (LS2 8.10.: varoitus venyi 2,0 → 2,5 s).
            if (lyhtyVaroitus > 0 && Loppui(ref lyhtyVaroitus, dt)) lyhty = LyhtyS;
            else if (lyhty > 0) lyhty -= dt;
            if (toipuminen > 0 && !Loppui(ref toipuminen, dt)) return;
            // Lyhdyn valossa kesken jäänyt siirtymä odottaa, ellei pelaaja ohjaa, ja vain ohjattu liike havaitaan (LS2 8.10.: paikallaan oleva
            // havaittiin, kun puuska päättyi lyhdyn valossa ja puuskan pysäyttämä siirtymä jatkui itsestään).
            bool odottaa = lyhty > 0 && suunta == 0 && Siirtyy != 0;
            if (lyhty > 0 && suunta != 0) { Havaittu = true; lyhty = 0; }
            if (puuska > 0 && !lepaa)
            {
                // Liike puuskassa: ote lipsuu ja pitää (0,5 s toipuminen), toinen liike samassa puuskassa → putoaa (himmennys, alkuun).
                if (suunta != 0)
                {
                    Lipsahdukset++; Lipsahti = true; Osuus = 0; Siirtyy = 0; toipuminen = ToipuminenS;
                    if (Lipsahdukset >= 2) { Putosi = true; himmennys = HimmennysS; toipuminen = 0; }
                }
                return;
            }
            if (Siirtyy == 0)
            {
                // Tarkka ote: kapealta lähdettäessä ennen pysähdystä lipsahdus (ote pitää, toipuminen).
                if (suunta != 0 && KapeaOdottaa) { Lipsahti = true; toipuminen = ToipuminenS; kapeaPysahdys = KapeaPysahdysS; return; }
                if (suunta > 0 && Ote == Otteita - 1) { Perilla = true; return; }
                if (suunta > 0 && Ote < Otteita - 1 || suunta < 0 && Ote > 0) Siirtyy = Math.Sign(suunta);
                else return;
            }
            if (odottaa) return;
            Osuus += dt / (Kapea(Ote + Siirtyy) ? KapeaOteS : OteS);
            if (Osuus >= 1 - 1e-6)
            {
                Ote += Siirtyy; Osuus = 0; Siirtyy = 0;
                if (Kapea(Ote)) kapeaPysahdys = KapeaPysahdysS;
                if (puuskaOtteet.Contains(Ote) && !Lepo(Ote) && puuskatKayty.Add(Ote)) puuskaVaroitus = PuuskaVaroitusS;   // lepo-ote on suojassa
            }
        }
    }

    public enum KilpiTulos { Ei, Kolahdus, Auki }

    public sealed class Kilpilukko
    {
        public readonly double TavoiteAste, SallittuAste;
        /// <summary>Kilpien kierrot asteina (positiivinen = toista kohti).</summary>
        public double Kilpi1, Kilpi2;
        public bool Auki { get; private set; }
        public Kilpilukko(double tavoiteAste = 45, double sallittuAste = 10) { TavoiteAste = tavoiteAste; SallittuAste = sallittuAste; }
        public void Kaanna(int kilpi, double asteet) { if (Auki) return; if (kilpi == 1) Kilpi1 = Rajaa(Kilpi1 + asteet); else Kilpi2 = Rajaa(Kilpi2 + asteet); }
        static double Rajaa(double a) => Math.Max(-90, Math.Min(90, a));
        /// <summary>Pelaaja kokeilee kantta: oikea asento → Auki, muuten kolahdus (6 m, ei rangaistusta).</summary>
        public KilpiTulos Kokeile()
        {
            if (Auki) return KilpiTulos.Auki;
            if (Math.Abs(Kilpi1 - TavoiteAste) <= SallittuAste && Math.Abs(Kilpi2 - TavoiteAste) <= SallittuAste) { Auki = true; return KilpiTulos.Auki; }
            return KilpiTulos.Kolahdus;
        }
        public const double KolahdusM = 6;
    }

    public enum TiiliTulos { Ei, Raapaisu, Komeroon, Putosi }

    public sealed class Tiilet
    {
        public const int Raapaisuja = 2; public const double PutoaaM = 14, KurkistusValiS = 10, NopeaVetoMs = 0.5;
        readonly int[] raapaisut; readonly bool[] irti;
        double kello, viimePutoaminen = double.NegativeInfinity; bool ensimmainen = true;
        /// <summary>Vartija kurkistaa (toinen putoava 10 s:n sisällä; sovitin: lyhty koholla 6 s, jähmety). Kerran per tapahtuma.</summary>
        public bool Kurkistaa;
        public Tiilet(int maara = 6) { raapaisut = new int[maara]; irti = new bool[maara]; }
        public int Maara => irti.Length;
        public bool Irti(int i) => irti[i];
        /// <summary>Jatko tallennuksesta: tiili on jo irti (ei ääntä eikä kurkistusta; ensimmäinen putoaminen on tapahtunut).</summary>
        public void AsetaIrti(int i) { if (i < 0 || i >= irti.Length) return; irti[i] = true; ensimmainen = false; }
        public bool KaikkiIrti { get { foreach (var b in irti) if (!b) return false; return true; } }
        public void Paivita(double dt) => kello += dt;
        /// <summary>Raapaisu veitsellä; toinen raapaisu irrottaa: ensimmäinen irrotettu putoaa aina, muut vedon nopeuden mukaan.</summary>
        public TiiliTulos Raavi(int i, double vetoMs = 0)
        {
            if (i < 0 || i >= irti.Length || irti[i]) return TiiliTulos.Ei;
            if (++raapaisut[i] < Raapaisuja) return TiiliTulos.Raapaisu;
            irti[i] = true;
            bool putoaa = ensimmainen || vetoMs >= NopeaVetoMs; ensimmainen = false;
            if (!putoaa) return TiiliTulos.Komeroon;
            if (kello - viimePutoaminen <= KurkistusValiS) Kurkistaa = true;
            viimePutoaminen = kello;
            return TiiliTulos.Putosi;
        }
    }

    public enum OviTulos { Lukossa, AukiHiljaa, AukiNarahtaa }

    public static class LukittuOvi
    {
        public const double KahvaM = 6;
        /// <summary>Oven avaus: lukko ja avain (merkin avain-kenttä) pelaajan avaimista; nopea avaus narahtaa (aani_nopea_m).</summary>
        public static OviTulos Avaa(bool lukossa, string avain, ICollection<string> avaimet, bool nopea)
        {
            if (lukossa && (string.IsNullOrEmpty(avain) || avaimet == null || !avaimet.Contains(avain))) return OviTulos.Lukossa;
            return nopea ? OviTulos.AukiNarahtaa : OviTulos.AukiHiljaa;
        }
    }
}
