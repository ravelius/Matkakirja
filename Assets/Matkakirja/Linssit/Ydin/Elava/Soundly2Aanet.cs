// ELÄVÄN KAUPUNGIN SOUNDLY v2 -ÄÄNET (Linssiseppä 10.10.2026; juna 182, Pelikoodarin aanet/pallo-soundly-v2, Ydin PalloSoundly2Aanet):
// puhdas logiikka kuten SoundlyAanet; Unity (ElavaKaupunki) soittaa 3D-tapahtumat lähdepoolista ja 2D-tapahtumat (kaukainen torvi)
// omasta 2D-lähteestään, tuulen 2D-silmukkana. Kaikki valinnat siemenestä (deterministinen). Paikat KaupunkiAanetin pisteistä.
//  LOKIT: kamera alle KaupunkiAanet.KorkeusRajaM ja laituri (samat kuin satama-vesi) alle LokkiM → lokki-01…05 jommastakummasta
//    kahdesta lähimmästä laiturista 8–14 m veden yllä, LokkiValiMinS–LokkiValiMaxS välein. Vain kaupungeissa, joissa laitureita on.
//  KYYHKYT: kamera alle KyyhkyKorkeusM ja tori tai aukio alle KyyhkyM → kujerrus tai harvemmin (SiivetOsuus) siivet,
//    KyyhkyValiMinS–KyyhkyValiMaxS välein, ei samaa peräkkäin.
//  LAIVAN TORVI KAUKAA: satamakaupungissa (laitureita ≥ 1) ja korkeus tiedossa → 2D TorviValiMinS–TorviValiMaxS välein.
//  RAITIOVAUNUN KELLO: OhiajonKello raitiovaunun ohiajon alkaessa: osuudella RaitioOsuus, enintään RaitioValiMinS välein, samaan vaunuun.
//  TUULI: tuuli-tasainen-01:n taso pallon korkeudesta (PalloSoundly2Aanet.TuuliKorkeudesta), liukuu KaupunkiAanet.TaustaLiukuS.
// Kun v2:n klipit on ladattu, Unity sammuttaa erän 1 laituri-lokit, aukio-kyyhkyt ja raitiovaunun kellot (SoundlyAanet-liput),
// ettei samaa lintua tai kelloa kuulu kahdesti; erän 1 parvien äänet jatkuvat.
// Puhdas C#: Soundly2AanetTestit.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aanet;

namespace Matkakirja.Linssit.Elava
{
    public sealed class Soundly2Aanet
    {
        public const double LokkiM = 200, LokkiTaysiM = 25, LokkiValiMinS = 8, LokkiValiMaxS = 25;
        public const double KyyhkyM = 60, KyyhkyKorkeusM = 60, KyyhkyTaysiM = 8, KyyhkyHiljaM = 80, KyyhkyValiMinS = 10, KyyhkyValiMaxS = 30, SiivetOsuus = 0.25;
        public const double TorviValiMinS = 60, TorviValiMaxS = 180;
        public const double RaitioOsuus = 0.35, RaitioValiMinS = 45;
        public enum Laji { Lokki, Kyyhky, Torvi }
        /// <summary>Tapahtuma: KolmeD = paikassa (X, Y, Z paketin ENU:ssa, Y absoluuttinen); muuten 2D ilman paikkaa.</summary>
        public sealed class Tapahtuma { public string Tunnus; public Laji Laji; public bool KolmeD; public double X, Y, Z, Taso, EtaisyysM; }

        public readonly List<Tapahtuma> Kerrat = new List<Tapahtuma>();
        /// <summary>Tuulen liu'utettu taso (ennen maisemaa, väistöä ja mikseriä).</summary>
        public double Tuuli;
        /// <summary>Onko klippi saatavilla (Unity: ladattu); null = kaikki. Suodattaa sarjan, tyhjä → alkuperäinen.</summary>
        public Predicate<string> Saatavilla;

        readonly Random rnd;
        readonly List<(double X, double Z, double Y)> laiturit; readonly List<(double X, double Z)> torit;
        readonly HakuRuudukko laituriR = new HakuRuudukko(), toriR = new HakuRuudukko();
        readonly List<int> hae = new List<int>();
        readonly List<(int I, double D)> lahella = new List<(int, double)>();
        double nyt, kx, ky, kz, korkeus, seuraavaLokki = double.NaN, seuraavaKyyhky, seuraavaTorvi, edRaitio = double.NegativeInfinity;
        string edLokki, edKyyhky, edTorvi, edKello;

        /// <summary>Laiturit [x, z, vesi] (KaupunkiAanet.Laiturit) ja torit sekä aukiot (KaupunkiAanet.Torit + Aukiot).</summary>
        public Soundly2Aanet(int siemen, List<(double X, double Z, double Y)> laiturit, List<(double X, double Z)> torit)
        {
            rnd = new Random(siemen);
            this.laiturit = laiturit ?? new List<(double, double, double)>(); this.torit = torit ?? new List<(double, double)>();
            for (int i = 0; i < this.laiturit.Count; i++) laituriR.Lisaa(i, this.laiturit[i].X, this.laiturit[i].Z);
            for (int i = 0; i < this.torit.Count; i++) toriR.Lisaa(i, this.torit[i].X, this.torit[i].Z);
        }

        public bool Satamakaupunki => laiturit.Count > 0;

        double Vali(double a, double b) => a + (b - a) * rnd.NextDouble();

        string Valitse(string[] sarja, string edellinen)
        {
            if (Saatavilla != null) { var s = Array.FindAll(sarja, x => Saatavilla(x)); if (s.Length > 0) sarja = s; }
            return ElavaValinta.Vaihtoehto(sarja, rnd, edellinen);
        }

        /// <summary>Kuuntelu (`opas kaupunkiaanet lokki2|kyyhky2|torvi`): seuraava tapahtuma heti, kun ehdot täyttyvät.</summary>
        public void Pakota(string mita)
        {
            if (mita == "lokki2") seuraavaLokki = double.NegativeInfinity;
            else if (mita == "kyyhky2") seuraavaKyyhky = double.NegativeInfinity;
            else if (mita == "torvi") seuraavaTorvi = double.NegativeInfinity;
        }

        /// <summary>Kehyksen alku: kamera paketin ENU:ssa (ky = korkeus paketissa) ja korkeus maasta (NaN = ei tiedossa).</summary>
        public void Aloita(double nytS, double kameraX, double kameraY, double kameraZ, double korkeusMaasta)
        {
            nyt = nytS; kx = kameraX; ky = kameraY; kz = kameraZ; korkeus = korkeusMaasta;
            Kerrat.Clear();
            if (double.IsNaN(seuraavaLokki)) { seuraavaLokki = nyt + Vali(4, 12); seuraavaKyyhky = nyt + Vali(5, 15); seuraavaTorvi = nyt + Vali(30, 90); }
        }

        /// <summary>Kehyksen loppu: tapahtumat Kerrat-listaan ja tuulen taso liukuu.</summary>
        public void Valitse(double dt)
        {
            bool tiedossa = !double.IsNaN(korkeus), matala = tiedossa && korkeus <= KaupunkiAanet.KorkeusRajaM;
            double maa = tiedossa ? ky - korkeus : ky, k2 = tiedossa ? korkeus * korkeus : 0;

            // ---- lokit laitureilla ----
            if (nyt >= seuraavaLokki && matala)
            {
                Lahimmat(laituriR, i => (laiturit[i].X, laiturit[i].Z), LokkiM, 2);
                if (lahella.Count > 0)
                {
                    int i = lahella[lahella.Count == 1 ? 0 : rnd.Next(lahella.Count)].I;
                    double y = (double.IsNaN(laiturit[i].Y) ? maa : laiturit[i].Y) + Vali(8, 14);
                    double dx = laiturit[i].X - kx, dy = y - ky, dz = laiturit[i].Z - kz, d = Math.Sqrt(dx * dx + dy * dy + dz * dz);
                    if (d < LokkiM)
                    {
                        edLokki = Valitse(PalloSoundly2Aanet.Lokki, edLokki);
                        Kerrat.Add(new Tapahtuma { Tunnus = edLokki, Laji = Laji.Lokki, KolmeD = true, X = laiturit[i].X, Y = y, Z = laiturit[i].Z, EtaisyysM = d,
                            Taso = PalloSoundly2Aanet.LokkiTaso * PalloElavaAanet.Etaisyystaso(d, LokkiTaysiM, LokkiM) });
                        seuraavaLokki = nyt + Vali(LokkiValiMinS, LokkiValiMaxS);
                    }
                }
            }

            // ---- kyyhkyt toreilla ja aukioilla ----
            if (nyt >= seuraavaKyyhky && tiedossa && korkeus <= KyyhkyKorkeusM)
            {
                Lahimmat(toriR, i => torit[i], KyyhkyM, 1);
                if (lahella.Count > 0)
                {
                    int i = lahella[0].I; double d = Math.Sqrt(lahella[0].D * lahella[0].D + k2);
                    if (d < KyyhkyHiljaM)
                    {
                        bool siivet = rnd.NextDouble() < SiivetOsuus;
                        edKyyhky = Valitse(siivet ? PalloSoundly2Aanet.KyyhkySiivet : PalloSoundly2Aanet.KyyhkyKujerrus, edKyyhky);
                        Kerrat.Add(new Tapahtuma { Tunnus = edKyyhky, Laji = Laji.Kyyhky, KolmeD = true, X = torit[i].X, Y = maa + 0.5, Z = torit[i].Z, EtaisyysM = d,
                            Taso = (siivet ? PalloSoundly2Aanet.SiivetTaso : PalloSoundly2Aanet.KujerrusTaso) * PalloElavaAanet.Etaisyystaso(d, KyyhkyTaysiM, KyyhkyHiljaM) });
                        seuraavaKyyhky = nyt + Vali(KyyhkyValiMinS, KyyhkyValiMaxS);
                    }
                }
            }

            // ---- laivan torvi kaukaa (2D, satamakaupungit) ----
            if (nyt >= seuraavaTorvi && tiedossa && Satamakaupunki)
            {
                edTorvi = Valitse(PalloSoundly2Aanet.TorviKaukana, edTorvi);
                Kerrat.Add(new Tapahtuma { Tunnus = edTorvi, Laji = Laji.Torvi, Taso = PalloSoundly2Aanet.TorviKaukanaTaso, EtaisyysM = double.NaN });
                seuraavaTorvi = nyt + Vali(TorviValiMinS, TorviValiMaxS);
            }

            Tuuli = PalloElavaAanet.Liuku(Tuuli, PalloSoundly2Aanet.TuuliKorkeudesta(korkeus), dt, KaupunkiAanet.TaustaLiukuS);
        }

        /// <summary>Raitiovaunun ohiajo alkaa (Ohiajot.Valitse palautti raitiovaunun, lähin kohta lahinM): kello samaan vaunuun
        /// osuudella RaitioOsuus, enintään RaitioValiMinS välein; (tunnus, taso) tai (null, 0).</summary>
        public (string Tunnus, double Taso) OhiajonKello(double nytS, double lahinM)
        {
            if (nytS - edRaitio < RaitioValiMinS || rnd.NextDouble() >= RaitioOsuus) return (null, 0);
            edRaitio = nytS;
            edKello = Valitse(PalloSoundly2Aanet.RaitioKello, edKello);
            return (edKello, PalloSoundly2Aanet.RaitioKelloTaso * Ohiajot.Taso(lahinM));
        }

        /// <summary>Enintään n lähintä pistettä alle säteen (vaaka) etäisyysjärjestyksessä listaan lahella.</summary>
        void Lahimmat(HakuRuudukko r, Func<int, (double X, double Z)> p, double sade, int n)
        {
            lahella.Clear(); hae.Clear(); r.Hae(kx, kz, sade, hae);
            foreach (int i in hae)
            {
                var (x, z) = p(i); double dx = x - kx, dz = z - kz, d = Math.Sqrt(dx * dx + dz * dz);
                if (d < sade) lahella.Add((i, d));
            }
            lahella.Sort((a, b) => a.D != b.D ? a.D.CompareTo(b.D) : a.I.CompareTo(b.I));
            if (lahella.Count > n) lahella.RemoveRange(n, lahella.Count - n);
        }

        public string Tila() => $"Soundly v2: lokki {Math.Max(0, seuraavaLokki - nyt):F0} s, kyyhky {Math.Max(0, seuraavaKyyhky - nyt):F0} s, " +
            $"torvi {(Satamakaupunki ? $"{Math.Max(0, seuraavaTorvi - nyt):F0} s" : "ei satamaa")}, tuuli {Tuuli:F3}; laiturit {laiturit.Count}, torit ja aukiot {torit.Count}";
    }
}
