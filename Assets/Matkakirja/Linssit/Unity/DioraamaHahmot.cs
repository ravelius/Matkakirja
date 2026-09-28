// DIORAAMAN HAHMOT (Poikkileikkaus-linssi, Linnanrakentaja erä 1, 29.9.2026): paikkamerkkihahmot
// (kokki, apulainen, vesipoika) quadeina, joissa sylinteribillboard kameraa kohti ja paikkamerkkiatlaksen
// ruutu (DioraamaData.Henkilo/Silmukka). Näkyvyys, silmukka ja ruutu tulevat Ytimen NakymaHetkella-kutsun
// Nakyma.Hahmot-listasta (Heratys.HahmonTila); tämä tiedosto vain piirtää sen, mitä Ydin päätti.
//
// TILAPÄINEN POIKKEAMA (raportoitu erän 1 luovutuksessa): Ohjaaja/Heratys (Ydin) eivät laske reittihahmon
// PAIKKAA, vain näkyvyyden/silmukan/ruudun. Reittihahmon paikka lasketaan siksi tässä deterministisesti ajasta t
// (edestakainen kulku pisteestä toiseen vakionopeudella, tauko päissä) — jos Ydin saa vastaavan funktion
// myöhemmin (esim. Ohjaaja.ReittiPaikka), tämä paikallinen laskenta pitäisi korvata sillä.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    // Alias nimiavaruuden SISÄLLÄ (ks. DioraamaNayttamo.cs): muuten ympäröivän Matkakirja-nimiavaruuden oma V3
    // (Kartta/NimiLadonta.cs) voittaisi tiedoston alun using-tuonnin.
    using V3 = Matkakirja.Linssit.Dioraama.V3;

    public sealed class DioraamaHahmot
    {
        static readonly int IdVari = Shader.PropertyToID("_Vari"), IdMainTex = Shader.PropertyToID("_MainTex");
        static Texture2D harmaaKuva;

        sealed class Esiintyma
        {
            public string TilaId, HahmoId;
            public Hahmo Hahmo;
            public Henkilo Henkilo;
            public GameObject Go;
            public MeshRenderer Renderer;
            public Mesh Mesh;
            public string AtlasAvain;
            public int ViimeRivi = -1, ViimeSarake = -1;
            public double ReitinVaihe;
            public double ReitinMatka, ReitinKulkuS;
            public double[] Kumulatiivinen;
        }

        readonly Transform juuri;
        readonly Shader varjostin;
        readonly Dictionary<string, Material> atlasMateriaalit = new Dictionary<string, Material>();
        readonly Dictionary<string, Texture2D> atlasKuvat = new Dictionary<string, Texture2D>();
        readonly List<Esiintyma> esiintymat = new List<Esiintyma>();
        readonly Dictionary<(string, string), HahmoNakyma> nakymaHaku = new Dictionary<(string, string), HahmoNakyma>();

        public DioraamaHahmot(Transform juuri)
        {
            this.juuri = juuri;
            varjostin = Resources.Load<Shader>("Varjostimet/DioraamaHahmo");
        }

        public int Maara => esiintymat.Count;
        public int AtlaksiaLadattu => atlasKuvat.Count;

        /// <summary>Karkea tekstuurimuistiarvio (RGBA32, ei mipmap-ylikuormaa mukaan) "poikki mittaus" -komentoon.</summary>
        public long TekstuuriTavuja()
        {
            long summa = 0;
            foreach (var t in atlasKuvat.Values) if (t != null) summa += (long)t.width * t.height * 4;
            return summa;
        }

        /// <summary>Atlas-osoitteet, joita tila tarvitsee mutta joita ei vielä ole (DioraamaSovitin lataa nämä).</summary>
        public void TarvittavatAtlakset(Rakennus rakennus, Tila tila, List<string> ulos)
        {
            if (rakennus.Henkilot == null) return;
            foreach (var h in tila.Hahmot)
                if (rakennus.Henkilot.TryGetValue(h.HenkiloId, out var henkilo) && !string.IsNullOrEmpty(henkilo.Atlas)
                    && !atlasKuvat.ContainsKey(henkilo.Atlas) && !ulos.Contains(henkilo.Atlas))
                    ulos.Add(henkilo.Atlas);
        }

        public void AsetaAtlas(string atlasAvain, Texture2D kuva)
        {
            if (string.IsNullOrEmpty(atlasAvain) || kuva == null) return;
            atlasKuvat[atlasAvain] = kuva;
            if (atlasMateriaalit.TryGetValue(atlasAvain, out var m)) m.SetTexture(IdMainTex, kuva);
            // Uusi kuva voi muuttaa atlaksen mittoja: pakota UV uudelleenlaskuun.
            foreach (var e in esiintymat) if (e.AtlasAvain == atlasAvain) e.ViimeRivi = -1;
        }

        /// <summary>Luo tilan hahmot (varhavat harmaana laatikkona, kunnes atlas latautuu).</summary>
        public void LisaaTila(Rakennus rakennus, Tila tila, Action<string> kirjaa)
        {
            if (varjostin == null) { kirjaa?.Invoke("poikki: DioraamaHahmo-varjostin puuttuu"); return; }
            if (tila.Hahmot == null) return;
            foreach (var hahmo in tila.Hahmot)
            {
                if (rakennus.Henkilot == null || !rakennus.Henkilot.TryGetValue(hahmo.HenkiloId, out var henkilo))
                {
                    kirjaa?.Invoke($"poikki: {tila.Id}/{hahmo.Id} henkilö '{hahmo.HenkiloId}' puuttuu");
                    continue;
                }
                float korkeus = Mathf.Max(0.1f, (float)henkilo.KorkeusM);
                float leveys = henkilo.RuutuK > 0 ? korkeus * henkilo.RuutuL / (float)henkilo.RuutuK : korkeus * 0.6f;
                var go = new GameObject("Hahmo:" + tila.Id + "/" + hahmo.Id) { layer = DioraamaNayttamo.Kerros };
                go.transform.SetParent(juuri, false);
                var mesh = LuoNelio(leveys, korkeus);
                go.AddComponent<MeshFilter>().sharedMesh = mesh;
                var renderer = go.AddComponent<MeshRenderer>();
                renderer.sharedMaterial = AtlasMateriaali(henkilo.Atlas);
                renderer.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                renderer.receiveShadows = false;
                renderer.enabled = false;

                var e = new Esiintyma
                {
                    TilaId = tila.Id, HahmoId = hahmo.Id, Hahmo = hahmo, Henkilo = henkilo,
                    Go = go, Renderer = renderer, Mesh = mesh, AtlasAvain = henkilo.Atlas,
                    ReitinVaihe = VaiheYksikko(hahmo.Id),
                };
                if (hahmo.Reitti != null) ValmisteleReitti(e, hahmo.Reitti);
                esiintymat.Add(e);
            }
        }

        Material AtlasMateriaali(string atlasAvain)
        {
            string avain = atlasAvain ?? "";
            if (atlasMateriaalit.TryGetValue(avain, out var m)) return m;
            m = new Material(varjostin) { name = "DioraamaHahmo/" + (avain.Length > 0 ? avain : "?") };
            m.SetColor(IdVari, Color.white);
            m.SetTexture(IdMainTex, atlasKuvat.TryGetValue(avain, out var t) && t != null ? t : HarmaaKuva());
            atlasMateriaalit[avain] = m;
            return m;
        }

        static Texture2D HarmaaKuva()
        {
            if (harmaaKuva != null) return harmaaKuva;
            harmaaKuva = new Texture2D(2, 2, TextureFormat.RGBA32, false) { name = "DioraamaHahmoHarmaa", filterMode = FilterMode.Bilinear };
            var p = new Color32(148, 148, 148, 255);
            harmaaKuva.SetPixels32(new[] { p, p, p, p });
            harmaaKuva.Apply(false, true);
            return harmaaKuva;
        }

        static Mesh LuoNelio(float leveys, float korkeus)
        {
            var mesh = new Mesh { name = "DioraamaHahmoNelio" };
            float puoli = leveys * 0.5f;
            mesh.vertices = new[] { new Vector3(-puoli, 0, 0), new Vector3(puoli, 0, 0), new Vector3(puoli, korkeus, 0), new Vector3(-puoli, korkeus, 0) };
            mesh.uv = new[] { new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1) };
            mesh.triangles = new[] { 0, 1, 2, 0, 2, 3 };
            mesh.RecalculateBounds();
            return mesh;
        }

        /// <summary>Joka ruutu: näkyvyys/silmukka/ruutu Ytimestä, paikka (staattinen tai reitti) ja sylinteribillboard.</summary>
        public void Paivita(Rakennus rakennus, Nakyma nakyma, Camera kamera, double t)
        {
            nakymaHaku.Clear();
            if (nakyma.Hahmot != null)
                foreach (var hn in nakyma.Hahmot) nakymaHaku[(hn.TilaId, hn.HahmoId)] = hn;

            foreach (var e in esiintymat)
            {
                if (!nakymaHaku.TryGetValue((e.TilaId, e.HahmoId), out var hn) || !hn.Naky)
                {
                    if (e.Renderer.enabled) e.Renderer.enabled = false;
                    continue;
                }
                if (!e.Renderer.enabled) e.Renderer.enabled = true;

                Vector3 paikka = e.Hahmo.Reitti != null ? ReittiPaikka(e, t) : DioraamaNayttamo.UnityPiste(e.Hahmo.Paikka);
                e.Go.transform.position = paikka;
                if (kamera != null)
                {
                    Vector3 kameraan = kamera.transform.position - paikka;
                    kameraan.y = 0f;
                    if (kameraan.sqrMagnitude > 1e-6f) e.Go.transform.rotation = Quaternion.LookRotation(kameraan.normalized, Vector3.up);
                }

                int rivi = 0, sarake = 0;
                if (e.Henkilo.Silmukat != null && hn.Silmukka != null && e.Henkilo.Silmukat.TryGetValue(hn.Silmukka, out var silmukka))
                {
                    rivi = silmukka.Rivi;
                    sarake = silmukka.Ruudut > 0 ? ((hn.Ruutu % silmukka.Ruudut) + silmukka.Ruudut) % silmukka.Ruudut : 0;
                }
                if (rivi != e.ViimeRivi || sarake != e.ViimeSarake)
                {
                    e.ViimeRivi = rivi; e.ViimeSarake = sarake;
                    AsetaRuutu(e.Mesh, e.Henkilo, atlasKuvat.TryGetValue(e.AtlasAvain ?? "", out var kuva) ? kuva : null, rivi, sarake, e.Hahmo.Peilattu);
                }
            }
        }

        static void AsetaRuutu(Mesh mesh, Henkilo henkilo, Texture2D atlas, int rivi, int sarake, bool peilattu)
        {
            int leveysPx = Mathf.Max(1, henkilo.RuutuL), korkeusPx = Mathf.Max(1, henkilo.RuutuK);
            int atlasW = atlas != null ? atlas.width : leveysPx * Mathf.Max(1, henkilo.Sarakkeet);
            int atlasH = atlas != null ? atlas.height : korkeusPx;
            float u0 = Mathf.Clamp01(sarake * leveysPx / (float)atlasW);
            float u1 = Mathf.Clamp01(u0 + leveysPx / (float)atlasW);
            float vYla = Mathf.Clamp01(1f - rivi * korkeusPx / (float)atlasH);
            float vAla = Mathf.Clamp01(vYla - korkeusPx / (float)atlasH);
            if (peilattu) (u0, u1) = (u1, u0);
            mesh.uv = new[] { new Vector2(u0, vAla), new Vector2(u1, vAla), new Vector2(u1, vYla), new Vector2(u0, vYla) };
        }

        // --- reittihahmon paikka (tilapäinen, ks. tiedoston alkukommentti) ------------------------------------

        void ValmisteleReitti(Esiintyma e, Reitti reitti)
        {
            int n = reitti.Pisteet?.Count ?? 0;
            e.Kumulatiivinen = new double[Math.Max(1, n)];
            double summa = 0;
            for (int i = 1; i < n; i++)
            {
                summa += (reitti.Pisteet[i] - reitti.Pisteet[i - 1]).Pituus;
                e.Kumulatiivinen[i] = summa;
            }
            e.ReitinMatka = summa;
            double nopeus = reitti.Nopeus > 0 ? reitti.Nopeus : 1.0;
            e.ReitinKulkuS = summa / nopeus;
        }

        /// <summary>Edestakainen kulku reitin pisteiden välillä vakionopeudella, tauko kummassakin päässä.</summary>
        static Vector3 ReittiPaikka(Esiintyma e, double t)
        {
            var reitti = e.Hahmo.Reitti;
            var pisteet = reitti.Pisteet;
            if (pisteet == null || pisteet.Count == 0) return e.Go.transform.position;
            if (pisteet.Count == 1 || e.ReitinMatka <= 0) return DioraamaNayttamo.UnityPiste(pisteet[0]);

            double tauko = Math.Max(0, reitti.Tauko);
            double kierto = 2 * e.ReitinKulkuS + 2 * tauko;
            if (kierto <= 0) return DioraamaNayttamo.UnityPiste(pisteet[0]);
            double vaihe = Mod(t + e.ReitinVaihe * kierto, kierto);
            double nopeus = reitti.Nopeus > 0 ? reitti.Nopeus : 1.0;
            double matka;
            if (vaihe < e.ReitinKulkuS) matka = vaihe * nopeus;
            else if (vaihe < e.ReitinKulkuS + tauko) matka = e.ReitinMatka;
            else if (vaihe < 2 * e.ReitinKulkuS + tauko) matka = e.ReitinMatka - (vaihe - e.ReitinKulkuS - tauko) * nopeus;
            else matka = 0;

            int seg = 0;
            while (seg < e.Kumulatiivinen.Length - 2 && e.Kumulatiivinen[seg + 1] < matka) seg++;
            double segAlku = e.Kumulatiivinen[seg], segLoppu = e.Kumulatiivinen[Math.Min(seg + 1, e.Kumulatiivinen.Length - 1)];
            double osuus = segLoppu > segAlku ? Math.Clamp((matka - segAlku) / (segLoppu - segAlku), 0.0, 1.0) : 0;
            V3 piste = V3.Lerp(pisteet[seg], pisteet[Math.Min(seg + 1, pisteet.Count - 1)], osuus);
            return DioraamaNayttamo.UnityPiste(piste);
        }

        static double Mod(double a, double m) => a - m * Math.Floor(a / m);

        /// <summary>Deterministinen 0..1-vaihe merkkijonosta (FNV-1a): reittihahmot eivät liiku tahdissa.</summary>
        static double VaiheYksikko(string id)
        {
            if (string.IsNullOrEmpty(id)) return 0;
            uint h = 2166136261;
            foreach (char c in id) { h ^= c; h *= 16777619; }
            return (h % 1000) / 1000.0;
        }

        public void Tyhjenna()
        {
            foreach (var e in esiintymat)
                if (e.Go != null)
                {
                    if (e.Mesh != null) UnityEngine.Object.Destroy(e.Mesh);
                    UnityEngine.Object.Destroy(e.Go);
                }
            esiintymat.Clear();
            foreach (var m in atlasMateriaalit.Values) if (m != null) UnityEngine.Object.Destroy(m);
            atlasMateriaalit.Clear();
            atlasKuvat.Clear();
            nakymaHaku.Clear();
        }
    }
}
