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
            /// <summary>Laatutaso (omistaja 27.9. klo 13.0x, meri-laatu-speksi): MeriRakentajan verkot MeriMalli-varjostimella
            /// (B-seepiaramppi, kaiverrusreuna, ääriviiva, vesikerros). False = vanha Malli-varjostin.</summary>
            public bool Seepia;
            /// <summary>Kaukotaso roottorille (≤ 800 kolmiota), kun peitto on alle 0,5 (näytöksen häivytys, horisontti).</summary>
            public Func<Mesh> RoottoriKauko;
            public Func<float, float> Nakyy;
            public Action<Transform, Transform[], float, float> Animoi;
            public MeriAikataulu Aikataulu;
            // Ajonaikaiset: valittu kohdemaalle, ankkuri ja siirto rannikon suunnassa (pt).
            public bool Valittu;
            public Kohta Ankkuri;
            public bool AnkkuriAsetettu;
            public float SiirtoPt;
            /// <summary>Maiden määrä, joissa laji on mahdollinen (arvonnan paino 1 / Maita), lasketaan latauksessa.</summary>
            public int Maita;
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
            new Laji { Nimi = MeriLaiva.Nimi, Meret = MeriLaiva.Meret, KokoPt = MeriLaiva.KokoPt, Roottori = MeriLaiva.Roottori,
                RoottoriKauko = MeriLaiva.RoottoriKauko, Lapsi = MeriLaiva.Lapsi, Lapsia = MeriLaiva.Lapsia, Lapsi2 = MeriLaiva.Lapsi2,
                Lapsia2 = MeriLaiva.Lapsia2, Lapsi3 = MeriLaiva.Lapsi3, Lapsia3 = MeriLaiva.Lapsia3, Nakyy = MeriLaiva.Nakyy,
                Animoi = MeriLaiva.Animoi, Aikataulu = MeriLaiva.Aikataulu, Seepia = true },
            new Laji { Nimi = "valas", Meret = new[] { "atlantti", "jaameri" }, KokoPt = MeriGeometria.ValasKokoPt,
                Roottori = HoyryGeometria.Joki, Lapsi = MeriGeometria.ValaanSelka, Lapsia = 1, Lapsi2 = MeriGeometria.Suihku,
                Lapsia2 = MeriGeometria.Suihkuja, Lapsi3 = MeriGeometria.Pyrsto, Lapsia3 = 1,
                Nakyy = MeriGeometria.ValasNakyy, Animoi = MeriGeometria.ValasAnimoi, Aikataulu = MeriGeometria.ValasAikataulu },
            new Laji { Nimi = MeriPurjelaiva.Nimi, Meret = MeriPurjelaiva.Meret, KokoPt = MeriPurjelaiva.KokoPt,
                Roottori = MeriPurjelaiva.Roottori, Lapsi = MeriPurjelaiva.Lapsi, Lapsia = MeriPurjelaiva.Lapsia,
                Lapsi2 = MeriPurjelaiva.Lapsi2, Lapsia2 = MeriPurjelaiva.Lapsia2, Lapsi3 = MeriPurjelaiva.Lapsi3,
                Lapsia3 = MeriPurjelaiva.Lapsia3, Nakyy = MeriPurjelaiva.Nakyy, Animoi = MeriPurjelaiva.Animoi,
                Aikataulu = MeriPurjelaiva.Aikataulu },
            new Laji { Nimi = MeriKalastusvene.Nimi, Meret = MeriKalastusvene.Meret, KokoPt = MeriKalastusvene.KokoPt,
                Roottori = MeriKalastusvene.Roottori, Lapsi = MeriKalastusvene.Lapsi, Lapsia = MeriKalastusvene.Lapsia,
                Lapsi2 = MeriKalastusvene.Lapsi2, Lapsia2 = MeriKalastusvene.Lapsia2, Lapsi3 = MeriKalastusvene.Lapsi3,
                Lapsia3 = MeriKalastusvene.Lapsia3, Nakyy = MeriKalastusvene.Nakyy, Animoi = MeriKalastusvene.Animoi,
                Aikataulu = MeriKalastusvene.Aikataulu },
            new Laji { Nimi = MeriLautta.Nimi, Meret = MeriLautta.Meret, KokoPt = MeriLautta.KokoPt, Roottori = MeriLautta.Roottori,
                Lapsi = MeriLautta.Lapsi, Lapsia = MeriLautta.Lapsia, Lapsi2 = MeriLautta.Lapsi2, Lapsia2 = MeriLautta.Lapsia2,
                Nakyy = MeriLautta.Nakyy, Animoi = MeriLautta.Animoi, Aikataulu = MeriLautta.Aikataulu },
            new Laji { Nimi = MeriMajakkalaiva.Nimi, Meret = MeriMajakkalaiva.Meret, KokoPt = MeriMajakkalaiva.KokoPt,
                Roottori = MeriMajakkalaiva.Roottori, Lapsi = MeriMajakkalaiva.Lapsi, Lapsia = MeriMajakkalaiva.Lapsia,
                Lapsi2 = MeriMajakkalaiva.Lapsi2, Lapsia2 = MeriMajakkalaiva.Lapsia2, Lapsi3 = MeriMajakkalaiva.Lapsi3,
                Lapsia3 = MeriMajakkalaiva.Lapsia3, Nakyy = MeriMajakkalaiva.Nakyy, Animoi = MeriMajakkalaiva.Animoi,
                Aikataulu = MeriMajakkalaiva.Aikataulu },
            new Laji { Nimi = MeriHirvio.Nimi, Meret = MeriHirvio.Meret, KokoPt = MeriHirvio.KokoPt, Roottori = MeriHirvio.Roottori,
                Lapsi = MeriHirvio.Lapsi, Lapsia = MeriHirvio.Lapsia, Lapsi2 = MeriHirvio.Lapsi2, Lapsia2 = MeriHirvio.Lapsia2,
                Lapsi3 = MeriHirvio.Lapsi3, Lapsia3 = MeriHirvio.Lapsia3, Nakyy = MeriHirvio.Nakyy, Animoi = MeriHirvio.Animoi,
                Aikataulu = MeriHirvio.Aikataulu, Harvinainen = true },
            new Laji { Nimi = MeriDelfiinit.Nimi, Meret = MeriDelfiinit.Meret, KokoPt = MeriDelfiinit.KokoPt,
                Roottori = MeriDelfiinit.Roottori, Lapsi = MeriDelfiinit.Lapsi, Lapsia = MeriDelfiinit.Lapsia,
                Lapsi2 = MeriDelfiinit.Lapsi2, Lapsia2 = MeriDelfiinit.Lapsia2, Lapsi3 = MeriDelfiinit.Lapsi3,
                Lapsia3 = MeriDelfiinit.Lapsia3, Nakyy = MeriDelfiinit.Nakyy, Animoi = MeriDelfiinit.Animoi,
                Aikataulu = MeriDelfiinit.Aikataulu },
            new Laji { Nimi = MeriLokit.Nimi, Meret = MeriLokit.Meret, KokoPt = MeriLokit.KokoPt, Roottori = MeriLokit.Roottori,
                Lapsi = MeriLokit.Lapsi, Lapsia = MeriLokit.Lapsia, Lapsi2 = MeriLokit.Lapsi2, Lapsia2 = MeriLokit.Lapsia2,
                Lapsi3 = MeriLokit.Lapsi3, Lapsia3 = MeriLokit.Lapsia3, Nakyy = MeriLokit.Nakyy, Animoi = MeriLokit.Animoi,
                Aikataulu = MeriLokit.Aikataulu },
            new Laji { Nimi = MeriJaavuori.Nimi, Meret = MeriJaavuori.Meret, KokoPt = MeriJaavuori.KokoPt,
                Roottori = MeriJaavuori.Roottori, Lapsi = MeriJaavuori.Lapsi, Lapsia = MeriJaavuori.Lapsia, Lapsi2 = MeriJaavuori.Lapsi2,
                Lapsia2 = MeriJaavuori.Lapsia2, Lapsi3 = MeriJaavuori.Lapsi3, Lapsia3 = MeriJaavuori.Lapsia3, Nakyy = MeriJaavuori.Nakyy,
                Animoi = MeriJaavuori.Animoi, Aikataulu = MeriJaavuori.Aikataulu, VahintaanLat = 63 },
        };

        /// <summary>Kytkin (komento "elava elementit meri 0|1", oletus päällä): pois = ei meren koristeita.</summary>
        public static bool Paalla = true;

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
            foreach (var l in Lajit)
            {
                l.Maita = 0;
                foreach (var lista in tulos.Values) foreach (var k in lista) if (Sallittu(l, k)) { l.Maita++; break; }
            }
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
            if (!Paalla) nyt = null;
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
            // Painotettu arvonta: paino 1 / niiden maiden määrä, joissa laji on mahdollinen, joten harvinaisempien merien
            // lajit (jäävuori, valas, majakkalaiva) päätyvät omille rannikoilleen eivätkä huku yleislajien alle.
            uint h = Siemen(maa);
            for (int i = 0; i < 2 && ehdokkaat.Count > 0; i++)
            {
                float yht = 0f;
                foreach (var e in ehdokkaat) yht += 1f / Math.Max(1, e.Maita);
                float r = h % 1000003u / 1000003f * yht;
                int j = 0;
                while (j < ehdokkaat.Count - 1 && r >= 1f / Math.Max(1, ehdokkaat[j].Maita)) { r -= 1f / Math.Max(1, ehdokkaat[j].Maita); j++; }
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
