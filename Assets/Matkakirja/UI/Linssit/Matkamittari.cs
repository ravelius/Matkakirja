// MATKAMITTARI: Ihmisen matkan vuosiluku numerorullina (omistaja 1.10.2026, loki 4b60cee9f: "webin mukaisena").
//
// Suora portti webin js/aikajana.js:stä: asetaMatkamittari (rullat, murto-osa, laskeva suunta, liuku 320 ms
// cubic-bezier(0.22, 0.9, 0.24, 1)), sumennaRullat (liike-epäterävyys: valotus 1/48 s, katto 0,7 numeroa, kynnys 0,04,
// tasoitus 0,35) ja kellonSelite (etunollat paikoillaan mutta näkymättöminä). Ulkoasu css/aikajana.css: .vuosi-numero
// 0,72 em × 1,1 em, kulma 3 px, pystyliukuväri 35 % → 0 → 35 %, tuhaterotin 0,3 em. Sumu on webin text-shadow-kopioiden
// vastine: kuusi puoliläpinäkyvää kopiota ±0,33/0,66/1 em × sumu pystysuunnassa (45/32/20 % × osuus), merkki himmenee
// 1 − 0,5 × osuus. 250 ms:n raja koskee UI-siirtymiä, ei jatkuvaa rullausta (Päätoimittaja 1.10.), joten 320 ms säilyy.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Matkamittari
    {
        public const float RullausMs = 320f;
        public const double ValotusS = 1.0 / 48.0;
        public const double SumuMax = 0.7;
        public const double SumunKynnys = 0.04;
        public const double SumunTasoitus = 0.35;
        static readonly float[] KopioSiirto = { -0.33f, 0.33f, -0.66f, 0.66f, -1f, 1f };
        static readonly float[] KopioPeitto = { 0.45f, 0.45f, 0.32f, 0.32f, 0.20f, 0.20f };

        sealed class Rivi
        {
            public Label Merkki;
            public Label[] Kopiot;
        }

        sealed class Rulla
        {
            public VisualElement Kehys;
            public Rivi Vanha, Uusi;
            public string Merkki;
            public double Sumu;
            public IVisualElementScheduledItem Liuku;
        }

        public readonly VisualElement Juuri;
        readonly List<Rulla> rullat = new List<Rulla>();
        readonly List<(VisualElement El, int K)> erottimet = new List<(VisualElement, int)>();
        float koko = 24f;
        string selite;

        public Matkamittari(VisualElement isa, int numerot = 6, bool ryhmitys = true)
        {
            Juuri = Rakenne.El("mk-matkamittari", isa, PickingMode.Ignore);
            for (int k = 0; k < numerot; k++)
            {
                var kehys = Rakenne.El("mk-matkamittari__rulla", Juuri, PickingMode.Ignore);
                kehys.style.backgroundImage = new StyleBackground(Liukuvari());
                var r = new Rulla { Kehys = kehys, Vanha = UusiRivi(kehys), Uusi = UusiRivi(kehys) };
                Siirra(r.Vanha, 100f);
                Siirra(r.Uusi, 100f);
                rullat.Add(r);
                int jaljella = numerot - 1 - k;
                if (ryhmitys && jaljella > 0 && jaljella % 3 == 0)
                    erottimet.Add((Rakenne.El("mk-matkamittari__erotin", Juuri, PickingMode.Ignore), k));
            }
            Koko = koko;
        }

        static Rivi UusiRivi(VisualElement kehys)
        {
            var l = Rakenne.Teksti("", "mk-matkamittari__merkki", kehys);
            Kirjasimet.Aseta(l, Kirjasin.Kone);
            return new Rivi { Merkki = l };
        }

        /// <summary>Fonttikoko px (web clamp 1,35–1,9 rem): rulla 0,72 em × 1,1 em, erotin 0,3 em.</summary>
        public float Koko
        {
            get => koko;
            set
            {
                koko = value;
                foreach (var r in rullat)
                {
                    r.Kehys.style.width = Mathf.Round(koko * 0.72f * 2f) / 2f;
                    r.Kehys.style.height = Mathf.Round(koko * 1.1f * 2f) / 2f;
                    foreach (var rivi in new[] { r.Vanha, r.Uusi })
                    {
                        rivi.Merkki.style.fontSize = koko;
                        if (rivi.Kopiot != null) foreach (var c in rivi.Kopiot) c.style.fontSize = koko;
                    }
                    r.Sumu = -1; // kopioiden px-siirrot uudelleen seuraavalla sumulla
                }
                foreach (var (el, _) in erottimet) el.style.width = Mathf.Round(koko * 0.3f * 2f) / 2f;
            }
        }

        public void Nayta(bool nakyy) => Juuri.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;

        /// <summary>Kaikki merkit pois (linssi kiinni): seuraava Aseta on ensimmäinen eikä liu'u.</summary>
        public void Nollaa()
        {
            foreach (var r in rullat)
            {
                r.Liuku?.Pause();
                r.Merkki = null;
                r.Vanha.Merkki.text = r.Uusi.Merkki.text = "";
                Siirra(r.Vanha, 100f);
                Siirra(r.Uusi, 100f);
            }
            Sumenna(0, true);
            selite = null;
        }

        /// <summary>
        /// Web asetaMatkamittari: lukema murto-osineen. <paramref name="liuku"/> = pysäytetty kello hyppää pysäkiltä toiselle
        /// (vaihtuvat numerot rullaavat yhdellä liikkeellä); <paramref name="heti"/> = ilman liikettä (avaus, vähennetty liike).
        /// Palauttaa, vaihtuiko jokin numero.
        /// </summary>
        public bool Aseta(double vuosi, bool liuku = false, bool heti = false, int askel = 1, int suunta = -1, bool murtoOsa = true)
        {
            double arvo = Math.Max(0, double.IsNaN(vuosi) || double.IsInfinity(vuosi) ? 0 : vuosi);
            bool alas = suunta < 0;
            double yksikot = arvo / askel;
            double kokonainen = alas ? Math.Ceiling(yksikot) : Math.Floor(yksikot);
            string teksti = ((long)(kokonainen * askel)).ToString().PadLeft(rullat.Count, '0');
            if (teksti.Length > rullat.Count) teksti = teksti.Substring(teksti.Length - rullat.Count);
            double osuus = heti || !murtoOsa ? 0 : Math.Abs(yksikot - kokonainen);
            bool siirtyma = liuku && !heti;
            int askelIndeksi = rullat.Count - 1 - (int)Math.Round(Math.Log10(askel));
            float s = alas ? -1f : 1f;
            char raja = alas ? '0' : '9';
            bool muuttui = false, alemmatRajalla = true;
            for (int k = rullat.Count - 1; k >= 0; k--)
            {
                var r = rullat[k];
                string merkki = teksti[k].ToString();
                string seuraava = (((teksti[k] - '0') + (alas ? 9 : 1)) % 10).ToString();
                double f = k <= askelIndeksi && alemmatRajalla ? osuus : 0;
                if (r.Merkki != merkki)
                {
                    muuttui = true;
                    if (siirtyma && r.Merkki != null)
                    {
                        // Hyppy: vanha numero liukuu pois, uusi tulee toiselta puolelta (web hypyt).
                        AsetaTeksti(r.Vanha, r.Merkki);
                        AsetaTeksti(r.Uusi, merkki);
                        r.Merkki = merkki;
                        Liu_u(r, s);
                        if (k <= askelIndeksi) alemmatRajalla = alemmatRajalla && teksti[k] == raja;
                        continue;
                    }
                    r.Merkki = merkki;
                }
                r.Liuku?.Pause();
                AsetaTeksti(r.Vanha, merkki);
                AsetaTeksti(r.Uusi, seuraava);
                Siirra(r.Vanha, (float)(Math.Round(-s * f * 100000) / 1000));
                Siirra(r.Uusi, (float)(Math.Round(s * (1 - f) * 100000) / 1000));
                if (k <= askelIndeksi) alemmatRajalla = alemmatRajalla && teksti[k] == raja;
            }
            return muuttui;
        }

        /// <summary>Web kellonSelite: etunollat paikoillaan mutta näkymättöminä (numeroiden paikat eivät hypi).</summary>
        public void Selite(string teksti)
        {
            if (teksti == selite) return;
            selite = teksti;
            int ensimmainen = teksti.Length - 1;
            for (int k = 0; k < teksti.Length; k++) if (teksti[k] != '0') { ensimmainen = k; break; }
            for (int k = 0; k < rullat.Count; k++)
                rullat[k].Kehys.style.visibility = k < ensimmainen ? Visibility.Hidden : Visibility.Visible;
            foreach (var (el, k) in erottimet) el.style.visibility = k < ensimmainen ? Visibility.Hidden : Visibility.Visible;
        }

        /// <summary>Web rullanSumu: kohde numeron korkeuksina lukeman muutosnopeudesta ja rullan painoarvosta.</summary>
        public static double RullanSumu(double nopeus, double painoarvo = 1)
        {
            if (!(painoarvo > 0) || double.IsNaN(nopeus) || double.IsInfinity(nopeus)) return 0;
            return Math.Min(SumuMax, Math.Abs(nopeus) / painoarvo * ValotusS);
        }

        /// <summary>Web tasoitaSumu: eksponentiaalinen tasoitus, kynnyksen alla terävä.</summary>
        public static double TasoitaSumu(double edellinen, double kohde, double tasoitus = SumunTasoitus)
        {
            double arvo = edellinen + (kohde - edellinen) * tasoitus;
            return arvo < SumunKynnys ? 0 : arvo;
        }

        /// <summary>Web sumennaRullat: nopeus = lukeman muutos sekunnissa; nollaa = terävä (pysäytys, vähennetty liike).</summary>
        public void Sumenna(double nopeus, bool nollaa = false)
        {
            int n = rullat.Count;
            for (int k = 0; k < n; k++)
            {
                var r = rullat[k];
                double painoarvo = Math.Pow(10, n - 1 - k);
                double edellinen = Math.Max(0, r.Sumu);
                double sumu = nollaa ? 0 : TasoitaSumu(edellinen, RullanSumu(nopeus, painoarvo));
                if (r.Sumu >= 0 && Math.Abs(sumu - r.Sumu) < 1e-6) continue;
                r.Sumu = sumu;
                float osuus = (float)Math.Min(1, sumu / SumuMax);
                foreach (var rivi in new[] { r.Vanha, r.Uusi })
                {
                    if (sumu <= 0)
                    {
                        rivi.Merkki.style.opacity = 1f;
                        if (rivi.Kopiot != null) foreach (var c in rivi.Kopiot) c.style.display = DisplayStyle.None;
                        continue;
                    }
                    rivi.Kopiot ??= LuoKopiot(rivi);
                    rivi.Merkki.style.opacity = 1f - osuus * 0.5f;
                    for (int i = 0; i < rivi.Kopiot.Length; i++)
                    {
                        var c = rivi.Kopiot[i];
                        c.style.display = DisplayStyle.Flex;
                        c.style.translate = new Translate(0, (float)(sumu * KopioSiirto[i] * koko));
                        c.style.opacity = KopioPeitto[i] * osuus;
                    }
                }
            }
        }

        Label[] LuoKopiot(Rivi rivi)
        {
            var kopiot = new Label[KopioSiirto.Length];
            for (int i = 0; i < kopiot.Length; i++)
            {
                var c = Rakenne.Teksti(rivi.Merkki.text, "mk-matkamittari__kopio", rivi.Merkki);
                Kirjasimet.Aseta(c, Kirjasin.Kone);
                c.style.fontSize = koko;
                kopiot[i] = c;
            }
            return kopiot;
        }

        static void AsetaTeksti(Rivi rivi, string teksti)
        {
            if (rivi.Merkki.text == teksti) return;
            rivi.Merkki.text = teksti;
            if (rivi.Kopiot != null) foreach (var c in rivi.Kopiot) c.text = teksti;
        }

        static void Siirra(Rivi rivi, float prosentti) =>
            rivi.Merkki.style.translate = new Translate(0, Length.Percent(prosentti));

        /// <summary>Web liuku: vanha 0 → 100 × s, uusi −100 × s → 0, 320 ms cubic-bezier(0.22, 0.9, 0.24, 1).</summary>
        void Liu_u(Rulla r, float s)
        {
            r.Liuku?.Pause();
            Siirra(r.Vanha, 0);
            Siirra(r.Uusi, -100f * s);
            double alku = Time.realtimeSinceStartupAsDouble;
            r.Liuku = r.Kehys.schedule.Execute(() =>
            {
                float t = Mathf.Clamp01((float)((Time.realtimeSinceStartupAsDouble - alku) * 1000.0 / RullausMs));
                float e = Kaari(t);
                Siirra(r.Vanha, 100f * s * e);
                Siirra(r.Uusi, -100f * s * (1f - e));
                if (t >= 1f) r.Liuku?.Pause();
            }).Every(0);
        }

        /// <summary>cubic-bezier(0.22, 0.9, 0.24, 1): y(x) Newtonin menetelmällä (web VUOSI_RULLAUS_KAARI).</summary>
        public static float Kaari(float x)
        {
            const float x1 = 0.22f, y1 = 0.9f, x2 = 0.24f, y2 = 1f;
            if (x <= 0f) return 0f;
            if (x >= 1f) return 1f;
            float t = x;
            for (int i = 0; i < 8; i++)
            {
                float bx = Bez(t, x1, x2) - x;
                float d = BezD(t, x1, x2);
                if (Mathf.Abs(bx) < 1e-5f || Mathf.Abs(d) < 1e-6f) break;
                t = Mathf.Clamp01(t - bx / d);
            }
            return Bez(t, y1, y2);
        }

        static float Bez(float t, float p1, float p2)
        {
            float u = 1f - t;
            return 3f * u * u * t * p1 + 3f * u * t * t * p2 + t * t * t;
        }

        static float BezD(float t, float p1, float p2)
        {
            float u = 1f - t;
            return 3f * u * u * p1 + 6f * u * t * (p2 - p1) + 3f * t * t * (1f - p2);
        }

        static Texture2D liukuvari;

        /// <summary>Web .vuosi-numero: linear-gradient(180deg, 35 % musta, 0 30 %, 0 70 %, 35 % musta); sävy Tyylikirja.Himmennys.</summary>
        static Texture2D Liukuvari()
        {
            if (liukuvari != null) return liukuvari;
            const int h = 40;
            liukuvari = new Texture2D(1, h, TextureFormat.RGBA32, false) { wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            for (int y = 0; y < h; y++)
            {
                float p = (y + 0.5f) / h;
                float a = p < 0.3f ? 0.35f * (1f - p / 0.3f) : p > 0.7f ? 0.35f * ((p - 0.7f) / 0.3f) : 0f;
                // Sävy tyylikirjasta (himmennys = webin musta varjo), alfa liukuvärin mukaan (pohjavahti: ei omia värejä).
                Color savy = Tyylikirja.Himmennys.Tumma;
                savy.a = a;
                liukuvari.SetPixel(0, y, savy);
            }
            liukuvari.Apply();
            return liukuvari;
        }
    }
}
