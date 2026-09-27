// MEREN KORISTEET TUOTANNOSSA (omistaja 27.9.2026 klo 07.4x: 10 lajia nykyisellä v3-koolla; lista, elämänideat ja
// valintasääntö docs/raportit/meren-koristeanimaatiot-20260926.md). Lajit piirtää ElavatElementit (Aihe, jolla Meri-laji):
//   - merikohdat sisältöpaketista kartta/merikohdat.json (Karttaseppä, 29 maata, 129 kohtaa: meri, lat, lon, suunta merelle)
//   - kohdemaa NostoKerros.NykyinenMaa; ei kohdemaata (maailmankartta) → ei koristeita
//   - maalle arvotaan siemenellä (ISO3) kaksi eri lajia sen meristä, joten sama maa näyttää saman parin; merihirviö on
//     kolmas, harvinainen laji kaikilla merillä (näytös 10 s / 5–10 min) ja väistää, jos pari on jo näkyvissä
//   - lajin ankkuri valitaan uudelleen vain, kun laji ei näy (tauolla tai ruudun ulkopuolella): lajin merien kohdista
//     ruudun keskustaa lähin, vähintään VahintaanPt:n päässä toisen lajin ankkurista (sama kohta → siirrot rannikon suunnassa)
//   - rannikon suunta = kohdan suunta merelle + 90°, joten mallin +z kulkee rannikkoa pitkin ja −x on merelle päin
// Mustameri kuuluu Välimeren lajeihin ja Kanaali Pohjanmeren lajeihin (listan merijako).
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class MeriKoristeet
    {
        /// <summary>Ruudulla näkyvien lajien vähimmäisväli (pt) ja saman kohdan lajien siirto rannikon suunnassa (pt).</summary>
        public const float VahintaanPt = 120f, SamaKohtaSiirtoPt = 140f;

        /// <summary>Yksi laji: mallit, aikataulu, animaatio ja meret (listan Meret-sarake).</summary>
        public sealed class Laji
        {
            public string Nimi;
            public string[] Meret;
            public float KokoPt;
            /// <summary>Harvinainen lisälaji (merihirviö): ei kuulu maan pariin, näytös vain kun pari ei ole näkyvissä.</summary>
            public bool Harvinainen;
            /// <summary>Vain pohjoisilla kohdilla (jäävuori: Jäämeri ja Pohjois-Atlantti).</summary>
            public double VahintaanLat = -90;
            public Func<Mesh> Roottori, Lapsi, Lapsi2, Lapsi3;
            public int Lapsia, Lapsia2, Lapsia3;
            public Func<float, float> Nakyy;
            public Action<Transform, Transform[], float, float> Animoi;
            public MeriAikataulu Aikataulu;
            // Ajonaikaiset: valittu kohdemaalle, ankkuri ja siirto rannikon suunnassa (pt).
            public bool Valittu;
            public Kohta Ankkuri;
            public bool AnkkuriAsetettu;
            public float SiirtoPt;
        }

        public struct Kohta
        {
            public string Meri;
            public double Lat, Lon;
            /// <summary>Suunta merelle asteina pohjoisesta; rannikko kulkee suuntaan Suunta + 90°.</summary>
            public float Suunta;
            public float Rannikko => (Suunta + 90f) % 360f;
            public bool Sama(Kohta k) => Math.Abs(Lat - k.Lat) < 1e-6 && Math.Abs(Lon - k.Lon) < 1e-6;
        }

        public static readonly Laji[] Lajit =
        {
            new Laji { Nimi = "merilaiva", Meret = new[] { "valimeri", "atlantti", "pohjanmeri", "itameri" }, KokoPt = MeriGeometria.LaivaKokoPt,
                Roottori = MeriGeometria.Laiva, Lapsi = HoyryGeometria.Siipiratas, Lapsia = 2, Lapsi2 = HoyryGeometria.Savupallo,
                Lapsia2 = HoyryGeometria.Palloja, Nakyy = MeriGeometria.LaivaNakyy, Animoi = MeriGeometria.LaivaAnimoi,
                Aikataulu = MeriGeometria.LaivaAikataulu },
            new Laji { Nimi = "valas", Meret = new[] { "atlantti", "jaameri" }, KokoPt = MeriGeometria.ValasKokoPt,
                Roottori = HoyryGeometria.Joki, Lapsi = MeriGeometria.ValaanSelka, Lapsia = 1, Lapsi2 = MeriGeometria.Suihku,
                Lapsia2 = MeriGeometria.Suihkuja, Lapsi3 = MeriGeometria.Pyrsto, Lapsia3 = 1,
                Nakyy = MeriGeometria.ValasNakyy, Animoi = MeriGeometria.ValasAnimoi, Aikataulu = MeriGeometria.ValasAikataulu },
        };

        static Dictionary<string, List<Kohta>> kohdat;
        static bool ladataan;
        static string maa;
        public static string Maa => maa;
        public static int KohtiaYhteensa { get; private set; }

        /// <summary>Merikohdat sisältöpaketista kerran (valinnainen: vanha paketti ilman tiedostoa = ei koristeita).</summary>
        public static IEnumerator Lataa()
        {
            if (kohdat != null || ladataan) yield break;
            ladataan = true;
            string teksti = null;
            yield return Sisalto.HaePaketista("kartta/merikohdat.json", t => teksti = t, true);
            var tulos = new Dictionary<string, List<Kohta>>();
            try
            {
                var maat = MiniJson.ObjektiTaiNull(MiniJson.Objekti(MiniJson.Jasenna(teksti ?? "{}")).GetValueOrDefault("maat"));
                if (maat != null)
                    foreach (var kv in maat)
                    {
                        var lista = new List<Kohta>();
                        foreach (var o in MiniJson.Taulukko(MiniJson.Objekti(kv.Value).GetValueOrDefault("kohdat")))
                        {
                            var k = MiniJson.Objekti(o);
                            lista.Add(new Kohta
                            {
                                Meri = Merijako(k.GetValueOrDefault("meri") as string),
                                Lat = Convert.ToDouble(k["lat"]), Lon = Convert.ToDouble(k["lon"]), Suunta = (float)Convert.ToDouble(k["suunta"]),
                            });
                        }
                        tulos[kv.Key] = lista;
                        KohtiaYhteensa += lista.Count;
                    }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA meren koristeet: merikohdat.json ei jäsenny: " + e.Message); }
            kohdat = tulos;
            ladataan = false;
            Debug.Log($"MATKAKIRJA meren koristeet: merikohdat {tulos.Count} maata, {KohtiaYhteensa} kohtaa");
        }

        /// <summary>Listan merijako: Mustameri Välimeren lajeille ja Kanaali Pohjanmeren lajeille.</summary>
        static string Merijako(string meri) => meri == "mustameri" ? "valimeri" : meri == "kanaali" ? "pohjanmeri" : meri;

        static bool Sallittu(Laji l, Kohta k) => Array.IndexOf(l.Meret, k.Meri) >= 0 && k.Lat >= l.VahintaanLat;

        /// <summary>Vakaa siemen merkkijonosta (FNV-1a).</summary>
        static uint Siemen(string s)
        {
            unchecked { uint h = 2166136261; foreach (char c in s) { h ^= c; h *= 16777619; } return h; }
        }

        /// <summary>
        /// Kohdemaa vaihtui: kaksi eri lajia maan meristä siemenellä (sama maa → sama pari), harvinainen merihirviö lisäksi,
        /// jos maalla on merikohtia. Ankkurit valitaan ElavatElementitin kehyksessä (ValitseAnkkuri), kun laji ei näy.
        /// </summary>
        public static void Kohdemaa(string nyt)
        {
            if (kohdat == null || nyt == maa) return;
            maa = nyt;
            foreach (var l in Lajit) { l.Valittu = false; l.AnkkuriAsetettu = false; l.SiirtoPt = 0f; }
            if (string.IsNullOrEmpty(maa) || !kohdat.TryGetValue(maa, out var lista) || lista.Count == 0) return;
            var ehdokkaat = new List<Laji>();
            foreach (var l in Lajit)
            {
                if (l.Harvinainen) { l.Valittu = true; continue; }
                foreach (var k in lista) if (Sallittu(l, k)) { ehdokkaat.Add(l); break; }
            }
            uint h = Siemen(maa);
            for (int i = 0; i < 2 && ehdokkaat.Count > 0; i++)
            {
                int j = (int)(h % (uint)ehdokkaat.Count);
                ehdokkaat[j].Valittu = true;
                ehdokkaat.RemoveAt(j);
                h = h / 7u + 1013904223u;
            }
            Debug.Log($"MATKAKIRJA meren koristeet: {maa} → {Kuvaus()}");
        }

        /// <summary>
        /// Lajin ankkuri (kutsutaan, kun laji ei näy): sallituista kohdista ruudun keskustaa lähin, joka on vähintään
        /// VahintaanPt:n päässä muiden valittujen lajien ankkureista; jos kaikki ovat liian lähellä, lähin ja siirto
        /// rannikon suunnassa (±SamaKohtaSiirtoPt). ruutu(kohta) = ruutupiste pisteinä tai null (horisontin takana).
        /// </summary>
        public static void ValitseAnkkuri(Laji l, Func<Kohta, Vector2?> ruutu, Vector2 keski)
        {
            if (!l.Valittu || kohdat == null || maa == null || !kohdat.TryGetValue(maa, out var lista)) return;
            Kohta? paras = null, lahin = null;
            float parasE = float.MaxValue, lahinE = float.MaxValue;
            foreach (var k in lista)
            {
                if (!Sallittu(l, k)) continue;
                var p = ruutu(k);
                float e = p.HasValue ? (p.Value - keski).magnitude : 1e6f;
                if (e < lahinE) { lahinE = e; lahin = k; }
                bool vapaa = true;
                foreach (var m in Lajit)
                {
                    if (m == l || !m.Valittu || !m.AnkkuriAsetettu) continue;
                    var q = ruutu(m.Ankkuri);
                    if (m.Ankkuri.Sama(k) || (p.HasValue && q.HasValue && (p.Value - q.Value).magnitude < VahintaanPt)) { vapaa = false; break; }
                }
                if (vapaa && e < parasE) { parasE = e; paras = k; }
            }
            if (paras.HasValue) { l.Ankkuri = paras.Value; l.SiirtoPt = 0f; l.AnkkuriAsetettu = true; }
            else if (lahin.HasValue)
            {
                l.Ankkuri = lahin.Value; l.AnkkuriAsetettu = true;
                // Sama kohta toisen lajin kanssa: ensimmäinen pohjoiseen, toinen etelään rannikon suunnassa.
                int jarj = 0;
                foreach (var m in Lajit) { if (m == l) break; if (m.Valittu && m.AnkkuriAsetettu && m.Ankkuri.Sama(lahin.Value)) jarj++; }
                l.SiirtoPt = jarj % 2 == 0 ? SamaKohtaSiirtoPt : -SamaKohtaSiirtoPt;
            }
        }

        public static string Kuvaus()
        {
            var b = new System.Text.StringBuilder();
            foreach (var l in Lajit)
                if (l.Valittu) b.Append(b.Length > 0 ? ", " : "").Append(l.Nimi).Append(l.AnkkuriAsetettu ? $" ({l.Ankkuri.Meri} {l.Ankkuri.Lat:F2} {l.Ankkuri.Lon:F2}{(l.SiirtoPt != 0 ? $" siirto {l.SiirtoPt:F0} pt" : "")})" : "");
            return b.Length > 0 ? b.ToString() : "ei lajeja";
        }
    }
}
