// ELÄVÄN KAUPUNGIN LINNUT JA RAITIOVAUNUN KELLO (Linssiseppä 9.10.2026; PT junaan 173, Pelikoodarin aanet/pallo-soundly-v1, Ydin
// PalloSoundlyAanet): puhdas logiikka; Unity (ElavaKaupunki) antaa kehyksittäin näkyvät lintuparvet ja raitiovaunut (kuten ohiajot
// ajoneuvot) ja soittaa tapahtumat 3D-poolista lähteen mukana. Kaikki valinnat siemenestä (deterministinen). PT: vain lähellä lähdettä.
//  LOKIT: lokki-huuto LokkiValiMinS–LokkiValiMaxS välein lähimmästä näkyvästä lokkiparvesta alle LokkiM (3D), muuten lähimmästä
//    laiturista (kamera matalalla); lokki-parvi hiljaisena 2D-taustana, kun kamera on alle LokkiParviKorkeusM:n ja lokkiparvi tai
//    laituri alle LokkiParviM:n (liukuu 2,5 s).
//  KYYHKYT: kamera alle KyyhkyKorkeusM; lähin näkyvä kyyhkyparvi tai aukio alle KyyhkyM → kujerrus tai siivet (parvessa siivet
//    useammin) KyyhkyValiMinS–KyyhkyValiMaxS välein, ei samaa peräkkäin.
//  RAITIOVAUNUN KELLO: lähin näkyvä raitiovaunu alle RaitioKelloM (3D) RaitioValiMinS–RaitioValiMaxS välein (harvoin).
// Puhdas C#: KaupunkiAanetTestit.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aanet;

namespace Matkakirja.Linssit.Elava
{
    public sealed class SoundlyAanet
    {
        public const double LokkiM = 200, LokkiTaysiM = 25, LokkiValiMinS = 6, LokkiValiMaxS = 20, LokkiParviM = 150, LokkiParviKorkeusM = 80, LokkiParviTaysiM = 30;
        public const double KyyhkyM = 60, KyyhkyKorkeusM = 60, KyyhkyTaysiM = 8, KyyhkyHiljaM = 80, KyyhkyValiMinS = 12, KyyhkyValiMaxS = 35, SiivetOsuus = 0.3, SiivetParviOsuus = 0.6;
        public const double RaitioKelloM = 150, RaitioTaysiM = 30, RaitioValiMinS = 60, RaitioValiMaxS = 180;
        public enum Laji { Lokki, Kyyhky, Raitio }
        /// <summary>Tapahtuma: Avain = parven tai raitiovaunun avain (Unity: lähde seuraa sitä), −1 = kiinteä paikka (laituri, aukio).</summary>
        public sealed class Tapahtuma { public string Tunnus; public Laji Laji; public int Avain = -1; public double X, Y, Z, Taso, EtaisyysM; }

        public readonly List<Tapahtuma> Kerrat = new List<Tapahtuma>();
        /// <summary>lokki-parvi-silmukan liu'utettu taso (ennen maisemaa, väistöä ja mikseriä).</summary>
        public double LokkiParvi;

        readonly Random rnd;
        readonly List<(double X, double Z, double Y)> laiturit; readonly List<(double X, double Z)> aukiot;
        readonly HakuRuudukko laituriR = new HakuRuudukko(), aukioR = new HakuRuudukko();
        readonly List<(int Avain, double X, double Y, double Z, bool Kyyhky)> parvet = new List<(int, double, double, double, bool)>();
        readonly List<(int Avain, double X, double Y, double Z)> raitiot = new List<(int, double, double, double)>();
        readonly List<int> hae = new List<int>();
        double nyt, kx, ky, kz, korkeus, seuraavaLokki = double.NaN, seuraavaKyyhky, seuraavaRaitio;
        string edLokki, edKyyhky, edRaitio;

        public SoundlyAanet(int siemen, List<(double X, double Z, double Y)> laiturit, List<(double X, double Z)> aukiot)
        {
            rnd = new Random(siemen);
            this.laiturit = laiturit ?? new List<(double, double, double)>(); this.aukiot = aukiot ?? new List<(double, double)>();
            for (int i = 0; i < this.laiturit.Count; i++) laituriR.Lisaa(i, this.laiturit[i].X, this.laiturit[i].Z);
            for (int i = 0; i < this.aukiot.Count; i++) aukioR.Lisaa(i, this.aukiot[i].X, this.aukiot[i].Z);
        }

        double Vali(double a, double b) => a + (b - a) * rnd.NextDouble();

        /// <summary>Kehyksen alku: kamera paketin ENU:ssa (ky = korkeus paketissa) ja korkeus maasta (NaN = ei tiedossa).</summary>
        public void Aloita(double nytS, double kameraX, double kameraY, double kameraZ, double korkeusMaasta)
        {
            nyt = nytS; kx = kameraX; ky = kameraY; kz = kameraZ; korkeus = korkeusMaasta;
            parvet.Clear(); raitiot.Clear(); Kerrat.Clear();
            if (double.IsNaN(seuraavaLokki)) { seuraavaLokki = nyt + Vali(3, 12); seuraavaKyyhky = nyt + Vali(5, 15); seuraavaRaitio = nyt + Vali(20, 60); }
        }

        /// <summary>Näkyvä lintuparvi (paikka paketin ENU:ssa, y = korkeus paketissa).</summary>
        public void Parvi(int avain, double x, double y, double z, bool kyyhky) => parvet.Add((avain, x, y, z, kyyhky));
        /// <summary>Näkyvä raitiovaunu.</summary>
        public void Raitio(int avain, double x, double y, double z) => raitiot.Add((avain, x, y, z));

        double D3(double x, double y, double z) { double dx = x - kx, dy = y - ky, dz = z - kz; return Math.Sqrt(dx * dx + dy * dy + dz * dz); }

        /// <summary>Kehyksen loppu: tapahtumat Kerrat-listaan ja lokki-parven taso liukuu.</summary>
        public void Valitse(double dt)
        {
            bool tiedossa = !double.IsNaN(korkeus), matala = tiedossa && korkeus <= KaupunkiAanet.KorkeusRajaM;
            double maa = tiedossa ? ky - korkeus : ky;

            // ---- lokit ----
            int lp = -1; double lpD = double.MaxValue, lokkiVaaka = double.MaxValue;
            for (int i = 0; i < parvet.Count; i++)
            {
                if (parvet[i].Kyyhky) continue;
                double d = D3(parvet[i].X, parvet[i].Y, parvet[i].Z);
                if (d < lpD) { lp = i; lpD = d; }
                double vx = parvet[i].X - kx, vz = parvet[i].Z - kz; lokkiVaaka = Math.Min(lokkiVaaka, Math.Sqrt(vx * vx + vz * vz));
            }
            int la = Lahin(laituriR, i => (laiturit[i].X, laiturit[i].Z), LokkiM, out double laD);
            if (la >= 0) lokkiVaaka = Math.Min(lokkiVaaka, laD);
            if (nyt >= seuraavaLokki)
            {
                Tapahtuma t = null;
                if (lp >= 0 && lpD < LokkiM) t = new Tapahtuma { Avain = parvet[lp].Avain, X = parvet[lp].X, Y = parvet[lp].Y, Z = parvet[lp].Z, EtaisyysM = lpD };
                else if (matala && la >= 0)
                {
                    double y = double.IsNaN(laiturit[la].Y) ? maa : laiturit[la].Y + 6;
                    t = new Tapahtuma { X = laiturit[la].X, Y = y, Z = laiturit[la].Z, EtaisyysM = D3(laiturit[la].X, y, laiturit[la].Z) };
                }
                if (t != null && t.EtaisyysM < LokkiM)
                {
                    t.Laji = Laji.Lokki; t.Tunnus = edLokki = ElavaValinta.Vaihtoehto(PalloSoundlyAanet.LokkiHuuto, rnd, edLokki);
                    t.Taso = PalloSoundlyAanet.LokkiTaso * PalloElavaAanet.Etaisyystaso(t.EtaisyysM, LokkiTaysiM, LokkiM);
                    Kerrat.Add(t); seuraavaLokki = nyt + Vali(LokkiValiMinS, LokkiValiMaxS);
                }
            }
            double lokkiTavoite = tiedossa && lokkiVaaka < LokkiParviM
                ? PalloSoundlyAanet.LokkiParviTaso * PalloElavaAanet.Etaisyystaso(lokkiVaaka, LokkiParviTaysiM, LokkiParviM) * PalloElavaAanet.Etaisyystaso(korkeus, 20, LokkiParviKorkeusM) : 0;
            LokkiParvi = PalloElavaAanet.Liuku(LokkiParvi, lokkiTavoite, dt, KaupunkiAanet.TaustaLiukuS);

            // ---- kyyhkyt ----
            if (nyt >= seuraavaKyyhky && tiedossa && korkeus <= KyyhkyKorkeusM)
            {
                Tapahtuma t = null; bool parvessa = false; double paras = double.MaxValue;
                for (int i = 0; i < parvet.Count; i++)
                {
                    if (!parvet[i].Kyyhky) continue;
                    double d = D3(parvet[i].X, parvet[i].Y, parvet[i].Z);
                    if (d < KyyhkyHiljaM && d < paras) { paras = d; parvessa = true; t = new Tapahtuma { Avain = parvet[i].Avain, X = parvet[i].X, Y = parvet[i].Y, Z = parvet[i].Z, EtaisyysM = d }; }
                }
                int au = Lahin(aukioR, i => aukiot[i], KyyhkyM, out double auD);
                if (au >= 0)
                {
                    double d = Math.Sqrt(auD * auD + korkeus * korkeus);
                    if (d < paras) { parvessa = false; t = new Tapahtuma { X = aukiot[au].X, Y = maa + 0.5, Z = aukiot[au].Z, EtaisyysM = d }; }
                }
                if (t != null)
                {
                    bool siivet = rnd.NextDouble() < (parvessa ? SiivetParviOsuus : SiivetOsuus);
                    t.Laji = Laji.Kyyhky; t.Tunnus = edKyyhky = ElavaValinta.Vaihtoehto(siivet ? PalloSoundlyAanet.KyyhkySiivet : PalloSoundlyAanet.KyyhkyKujerrus, rnd, edKyyhky);
                    t.Taso = (siivet ? PalloSoundlyAanet.SiivetTaso : PalloSoundlyAanet.KujerrusTaso) * PalloElavaAanet.Etaisyystaso(t.EtaisyysM, KyyhkyTaysiM, KyyhkyHiljaM);
                    Kerrat.Add(t); seuraavaKyyhky = nyt + Vali(KyyhkyValiMinS, KyyhkyValiMaxS);
                }
            }

            // ---- raitiovaunun kello ----
            if (nyt >= seuraavaRaitio)
            {
                int rp = -1; double rD = double.MaxValue;
                for (int i = 0; i < raitiot.Count; i++) { double d = D3(raitiot[i].X, raitiot[i].Y, raitiot[i].Z); if (d < rD) { rp = i; rD = d; } }
                if (rp >= 0 && rD < RaitioKelloM)
                {
                    edRaitio = ElavaValinta.Vaihtoehto(PalloSoundlyAanet.RaitioKello, rnd, edRaitio);
                    Kerrat.Add(new Tapahtuma { Laji = Laji.Raitio, Tunnus = edRaitio, Avain = raitiot[rp].Avain, X = raitiot[rp].X, Y = raitiot[rp].Y, Z = raitiot[rp].Z, EtaisyysM = rD,
                        Taso = PalloSoundlyAanet.RaitioKelloTaso * PalloElavaAanet.Etaisyystaso(rD, RaitioTaysiM, RaitioKelloM) });
                    seuraavaRaitio = nyt + Vali(RaitioValiMinS, RaitioValiMaxS);
                }
            }
        }

        int Lahin(HakuRuudukko r, Func<int, (double X, double Z)> p, double sade, out double dMin)
        {
            dMin = double.MaxValue; int paras = -1;
            hae.Clear(); r.Hae(kx, kz, sade, hae);
            foreach (int i in hae)
            {
                var (x, z) = p(i); double dx = x - kx, dz = z - kz, d = Math.Sqrt(dx * dx + dz * dz);
                if (d < sade && (d < dMin || (d == dMin && i < paras))) { paras = i; dMin = d; }
            }
            return paras;
        }

        public string Tila() => $"linnut ja raitiovaunun kello: lokki {Math.Max(0, seuraavaLokki - nyt):F0} s, kyyhky {Math.Max(0, seuraavaKyyhky - nyt):F0} s, " +
            $"raitiovaunun kello {Math.Max(0, seuraavaRaitio - nyt):F0} s, lokkiparvi {LokkiParvi:F2}; parvia näkyvissä {parvet.Count}, raitiovaunuja {raitiot.Count}";
    }
}
