// TAIDEMUSEON KUVAT: MUISTI JA LATAUS (PT 10.10.2026 09.5x, omistaja: "se on tärkeämpi projekti"; suunnitelma
// docs/raportit/linssi-taidemuseo-suunnitelma-20260924.md luvut 5 ja 6.4). Puhdas ydin, ei UnityEngineä:
//  - TeosPyramidi: teoksen kuvapyramidi. Seinätaso (seina.astcm, pitkä sivu ≤ 2048 px, ASTC 6×6 + mipit) näkyy aina;
//    yksityiskohta on 512 px:n ruutuina tasoilla, joiden pitkä sivu ylittää seinätason (yks/<z>/<x>_<y>.astc).
//    Taso z: kuva skaalattuna 1/2^(Zmax−z); Zmax = alkuperäinen koko (15 000 px → Zmax 5, tasot 3750/7500/15000).
//  - RuutuValinta: mikä taso ja mitkä ruudut tarvitaan, kun tiedetään, montako näytön pikseliä teoksen leveys vie ja
//    mikä osa teoksesta näkyy. Ruutuja enintään atlaksen paikkojen verran (muuten taso alas).
//  - RuutuVarasto: atlaksen paikat LRU:lla; nyt näkyviä ruutuja ei koskaan häädetä.
//  - MuseoBudjetti: laitteen muistin mukaan seinätason koko ja ruutupaikat; MUISTIHÄTÄ pienentää.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit
{
    /// <summary>Ruudun tunniste: teos, taso ja ruudun sarake/rivi (x vasemmalta, y ylhäältä).</summary>
    public readonly struct RuutuAvain : IEquatable<RuutuAvain>
    {
        public readonly string Teos; public readonly int Z, X, Y;
        public RuutuAvain(string teos, int z, int x, int y) { Teos = teos; Z = z; X = x; Y = y; }
        public bool Equals(RuutuAvain o) => Z == o.Z && X == o.X && Y == o.Y && string.Equals(Teos, o.Teos, StringComparison.Ordinal);
        public override bool Equals(object o) => o is RuutuAvain r && Equals(r);
        public override int GetHashCode() => ((Teos?.GetHashCode() ?? 0) * 397 ^ Z * 131071) ^ (X * 8191 + Y);
        /// <summary>Ämpärin suhteellinen polku teoksen kansiosta.</summary>
        public string Polku => "yks/" + Z + "/" + X + "_" + Y + ".astc";
        public override string ToString() => Teos + "/" + Polku;
    }

    public sealed class TeosPyramidi
    {
        public const int Ruutu = 512, SeinaMax = 2048;
        public readonly string Teos;
        public readonly int Leveys, Korkeus, Zmax, ZSeina;

        public TeosPyramidi(string teos, int leveys, int korkeus)
        {
            if (leveys < 1 || korkeus < 1) throw new ArgumentException("koko");
            Teos = teos; Leveys = leveys; Korkeus = korkeus;
            int pitka = Math.Max(leveys, korkeus);
            Zmax = 0; while ((Ruutu << Zmax) < pitka) Zmax++;
            // Seinätaso = ylin taso, jonka pitkä sivu mahtuu 2048 px:iin; yksityiskohtaa vain sen yläpuolella.
            ZSeina = Zmax; while (ZSeina > 0 && PitkaSivu(ZSeina) > SeinaMax) ZSeina--;
        }

        static int Jaa(int a, int z) => Math.Max(1, (a + (1 << z) - 1) >> z);
        public int LeveysTasolla(int z) => Jaa(Leveys, Zmax - z);
        public int KorkeusTasolla(int z) => Jaa(Korkeus, Zmax - z);
        int PitkaSivu(int z) => Math.Max(LeveysTasolla(z), KorkeusTasolla(z));
        public int Sarakkeita(int z) => (LeveysTasolla(z) + Ruutu - 1) / Ruutu;
        public int Riveja(int z) => (KorkeusTasolla(z) + Ruutu - 1) / Ruutu;
        public bool OnYksityiskohtaa => Zmax > ZSeina;
        /// <summary>Seinätason mitat (pitkä sivu ≤ 2048; ohita = ylimpiä mip-tasoja pois, 4 Gt:n laitteilla 1).</summary>
        public int SeinaLeveys(int ohita = 0) => Jaa(LeveysTasolla(ZSeina), ohita);
        public int SeinaKorkeus(int ohita = 0) => Jaa(KorkeusTasolla(ZSeina), ohita);
    }

    public static class MuseoMuisti
    {
        /// <summary>ASTC-lohkodatan koko tavuina (16 t/lohko); mipit = koko ketju 1×1:een asti.</summary>
        public static long AstcTavut(int w, int h, int lohko = 6, bool mipit = true)
        {
            long s = 0;
            while (true)
            {
                s += (long)((w + lohko - 1) / lohko) * ((h + lohko - 1) / lohko) * 16;
                if (!mipit || (w == 1 && h == 1)) return s;
                w = Math.Max(1, w / 2); h = Math.Max(1, h / 2);
            }
        }
        public static long SeinaTavut(TeosPyramidi p, int ohita = 0) => AstcTavut(p.SeinaLeveys(ohita), p.SeinaKorkeus(ohita));
        /// <summary>Yksi 512² ruutu ilman mipejä (ruutu näytetään lähes 1:1, mipit eivät maksa itseään).</summary>
        public static readonly long RuutuTavut = AstcTavut(TeosPyramidi.Ruutu, TeosPyramidi.Ruutu, 6, false);
    }

    public static class RuutuValinta
    {
        /// <summary>Tarvittava taso: pienin z, jonka leveys ≥ näytön pikselit teoksen leveydellä × laatu. Palauttaa
        /// ZSeina, jos seinätaso riittää (ei ruutuja).</summary>
        public static int Taso(TeosPyramidi p, double naytonPxTeoksenLeveydella, double laatu = 1.0)
        {
            double tarve = naytonPxTeoksenLeveydella * laatu;
            int z = p.ZSeina;
            while (z < p.Zmax && p.LeveysTasolla(z) < tarve) z++;
            return z;
        }

        /// <summary>Näkyvän alueen (u0..u1, v0..v1 teoksen osuutena, v ylhäältä) ruudut tasolla, jonka ruutumäärä mahtuu
        /// paikkoihin; järjestys: keskeltä ulos (keskimmäiset ladataan ensin). Tyhjä lista = seinätaso riittää.</summary>
        public static List<RuutuAvain> Ruudut(TeosPyramidi p, double naytonPx, double u0, double v0, double u1, double v1,
            int paikkoja, double laatu = 1.0)
        {
            var tulos = new List<RuutuAvain>();
            u0 = Rajaa(u0); u1 = Rajaa(u1); v0 = Rajaa(v0); v1 = Rajaa(v1);
            if (u1 <= u0 || v1 <= v0 || paikkoja <= 0) return tulos;
            for (int z = Taso(p, naytonPx, laatu); z > p.ZSeina; z--)
            {
                int c = p.Sarakkeita(z), r = p.Riveja(z);
                double lw = p.LeveysTasolla(z), lh = p.KorkeusTasolla(z);
                int x0 = (int)Math.Floor(u0 * lw / TeosPyramidi.Ruutu), x1 = Math.Min(c - 1, (int)Math.Ceiling(u1 * lw / TeosPyramidi.Ruutu) - 1);
                int y0 = (int)Math.Floor(v0 * lh / TeosPyramidi.Ruutu), y1 = Math.Min(r - 1, (int)Math.Ceiling(v1 * lh / TeosPyramidi.Ruutu) - 1);
                if ((x1 - x0 + 1) * (y1 - y0 + 1) > paikkoja) continue;   // ei mahdu → karkeampi taso
                double cx = (x0 + x1) / 2.0, cy = (y0 + y1) / 2.0;
                for (int y = y0; y <= y1; y++) for (int x = x0; x <= x1; x++) tulos.Add(new RuutuAvain(p.Teos, z, x, y));
                tulos.Sort((a, b) => ((a.X - cx) * (a.X - cx) + (a.Y - cy) * (a.Y - cy)).CompareTo((b.X - cx) * (b.X - cx) + (b.Y - cy) * (b.Y - cy)));
                return tulos;
            }
            return tulos;
        }

        static double Rajaa(double t) => t < 0 ? 0 : t > 1 ? 1 : t;
    }

    /// <summary>Ruutuatlaksen paikat (LRU). Pyyda(näkyvät) merkitsee nyt tarvittavat ja palauttaa puuttuvat latausjärjestyksessä;
    /// Lisaa(avain) antaa ladatulle ruudulle paikan ja häätää vanhimman, joka ei ole nyt näkyvissä (−1 = ei tilaa).</summary>
    public sealed class RuutuVarasto
    {
        readonly Dictionary<RuutuAvain, int> paikka = new Dictionary<RuutuAvain, int>();
        readonly Dictionary<RuutuAvain, long> kaytetty = new Dictionary<RuutuAvain, long>();
        readonly HashSet<RuutuAvain> nyt = new HashSet<RuutuAvain>();
        readonly Stack<int> vapaat = new Stack<int>();
        long kello;
        public int Paikkoja { get; private set; }
        public int Kaytossa => paikka.Count;

        public RuutuVarasto(int paikkoja) { Muuta(paikkoja); }

        /// <summary>Paikkamäärän muutos (MUISTIHÄTÄ tai laitteen budjetti). Palauttaa häädetyt (kutsuja tyhjentää paikat).</summary>
        public List<RuutuAvain> Muuta(int paikkoja)
        {
            var pois = new List<RuutuAvain>();
            paikkoja = Math.Max(0, paikkoja);
            var jarj = new List<KeyValuePair<RuutuAvain, int>>(paikka);
            jarj.Sort((a, b) => kaytetty[a.Key].CompareTo(kaytetty[b.Key]));
            foreach (var kv in jarj) if (kv.Value >= paikkoja || paikka.Count - pois.Count > paikkoja) pois.Add(kv.Key);
            foreach (var a in pois) { paikka.Remove(a); kaytetty.Remove(a); }
            Paikkoja = paikkoja;
            vapaat.Clear();
            var varatut = new HashSet<int>(paikka.Values);
            for (int i = paikkoja - 1; i >= 0; i--) if (!varatut.Contains(i)) vapaat.Push(i);
            return pois;
        }

        public List<RuutuAvain> Pyyda(IList<RuutuAvain> nakyvat)
        {
            kello++; nyt.Clear();
            var puuttuu = new List<RuutuAvain>();
            foreach (var a in nakyvat)
            {
                nyt.Add(a);
                if (paikka.ContainsKey(a)) kaytetty[a] = kello; else puuttuu.Add(a);
            }
            return puuttuu;
        }

        public bool Onko(RuutuAvain a, out int i) => paikka.TryGetValue(a, out i);

        public int Lisaa(RuutuAvain a, out RuutuAvain? haadetty)
        {
            haadetty = null;
            if (paikka.TryGetValue(a, out int olemassa)) { kaytetty[a] = kello; return olemassa; }
            int i;
            if (vapaat.Count > 0) i = vapaat.Pop();
            else
            {
                RuutuAvain? vanhin = null; long t = long.MaxValue;
                foreach (var kv in kaytetty) if (!nyt.Contains(kv.Key) && kv.Value < t) { t = kv.Value; vanhin = kv.Key; }
                if (vanhin == null) return -1;
                i = paikka[vanhin.Value]; paikka.Remove(vanhin.Value); kaytetty.Remove(vanhin.Value); haadetty = vanhin;
            }
            paikka[a] = i; kaytetty[a] = kello;
            return i;
        }
    }

    /// <summary>Museon muistibudjetti salia kohti (suunnitelma 6.4, PT 10.10.: ≤ 160 Mt): laite ja muistihätä → seinätason
    /// ohitus (0 = 2048 px, 1 = 1024 px) ja ruutupaikat 4096²-atlaksessa (64) tai 2048²-atlaksessa (16).</summary>
    public readonly struct MuseoBudjetti
    {
        public const long SaliTavut = 20L << 20, SeinatTavut = 60L << 20, RuudutTavut = 40L << 20, VeistoksetTavut = 40L << 20;
        public const long Yhteensa = SaliTavut + SeinatTavut + RuudutTavut + VeistoksetTavut;
        public readonly int SeinaOhita, RuutuPaikat;
        public MuseoBudjetti(int seinaOhita, int ruutuPaikat) { SeinaOhita = seinaOhita; RuutuPaikat = ruutuPaikat; }

        /// <summary>muistiGt = laitteen fyysinen muisti; hata 0 = normaali, 1 = MUISTIHÄTÄ (ruudut pois), 2 = vakava (myös seinät 1024).</summary>
        public static MuseoBudjetti Laitteelle(double muistiGt, int hata = 0)
        {
            bool pieni = muistiGt <= 4.5;
            int ohita = pieni || hata >= 2 ? 1 : 0;
            int paikat = hata >= 1 ? 0 : pieni ? 16 : 64;
            return new MuseoBudjetti(ohita, paikat);
        }

        /// <summary>Seinätasoja mahtuu budjettiin (teosten keskikoko huomioiden); esilataus ei ylitä tätä.</summary>
        public int SeiniaMahtuu(IList<TeosPyramidi> teokset)
        {
            long s = 0; int n = 0;
            foreach (var p in teokset) { s += MuseoMuisti.SeinaTavut(p, SeinaOhita); if (s > SeinatTavut) break; n++; }
            return n;
        }
    }

    public static class MuseoEsilataus
    {
        /// <summary>Kierroksen järjestyksessä: nykyinen + seuraavat n teosta seinätasolla (suunnitelma luku 5: 3 eteenpäin);
        /// salin avaus odottaa ensimmäiset avausOdottaa teosta.</summary>
        public static List<string> Seinat(IList<string> jarjestys, int nykyinen, int n = 3)
        {
            var t = new List<string>();
            for (int i = Math.Max(0, nykyinen); i < jarjestys.Count && t.Count <= n; i++) t.Add(jarjestys[i]);
            return t;
        }
        public const int AvausOdottaa = 4;
    }
}
