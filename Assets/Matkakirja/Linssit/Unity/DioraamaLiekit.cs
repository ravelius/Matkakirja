// DIORAAMAN LIEKIT (Poikkileikkaus-linssi, Linnanrakentaja erä 2, 29.9.2026): tulisijojen, kynttilöiden ja
// soihtujen liekkikuvakkeet quadeina, additiivisena sylinteribillboardina kameraa kohti (kuten DioraamaHahmot,
// mutta additiivinen eikä alpha-cutout). Paikat/koot/vaiheet tulevat Tila.Liekit-listasta (LiekkiPaikka), atlas-
// ja ruudukkotiedot Rakennus.Liekit-sanakirjasta (Liekki). Ei Ytimen NakymaHetkella-ohjausta: liekki palaa aina
// kun sen tila on ladattu, ja ruutu lasketaan suoraan ajasta t (floor(t·fps + vaihe·ruudut) mod ruudut) -- ei siis
// HahmoNakyma-tyylistä näkyvyys/silmukka-hakua. Paivita ottaa silti Rakennus/Nakyma-parametrit DioraamaHahmot.
// Paivita-signatuuriyhteensopivuuden vuoksi (kuten Hahmotkaan ei käytä omaa rakennus-parametriaan).
//
// ENNEN ATLASTA: pehmeä oranssi paikkamerkki (ei tyhjää). Additiivinen Blend One One tekee kovareunaisesta tai
// tyhjästä neliöstä rumemman kuin hahmoilla (ei alpha-cutoutia peittämässä virhettä), joten pieni proseduraalinen
// pehmeä pisara -- sama idea kuin JS-puolen paikkamerkkiatlaksessa (dioraama-rajapinnat-era2-20260929.md kohta 2
// LIEKIT: "pehmeä pisara valkoisesta keskeltä oranssiin reunaan, alfa = kirkkaus") -- on parempi kuin räikeä kova
// neliö tai täysi tyhjyys ennen latausta.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaLiekit
    {
        static readonly int IdVoima = Shader.PropertyToID("_Voima"), IdMainTex = Shader.PropertyToID("_MainTex");
        static Texture2D paikkamerkkiKuva;

        sealed class Esiintyma
        {
            public string TilaId;
            public LiekkiPaikka Paikka;
            public Liekki Liekki;
            public GameObject Go;
            public MeshRenderer Renderer;
            public Mesh Mesh;
            public string AtlasAvain;
            public int ViimeRuutu = -1;
        }

        readonly Transform juuri;
        readonly Shader varjostin;
        readonly Dictionary<string, Material> atlasMateriaalit = new Dictionary<string, Material>();
        readonly Dictionary<string, Texture2D> atlasKuvat = new Dictionary<string, Texture2D>();
        readonly List<Esiintyma> esiintymat = new List<Esiintyma>();

        public DioraamaLiekit(Transform juuri)
        {
            this.juuri = juuri;
            varjostin = Resources.Load<Shader>("Varjostimet/DioraamaLiekki");
        }

        public int Maara => esiintymat.Count;
        public int AtlaksiaLadattu => atlasKuvat.Count;

        /// <summary>Karkea tekstuurimuistiarvio (RGBA32) "poikki mittaus" -komentoon (kuten DioraamaHahmot).</summary>
        public long TekstuuriTavuja()
        {
            long summa = 0;
            foreach (var t in atlasKuvat.Values) if (t != null) summa += (long)t.width * t.height * 4;
            return summa;
        }

        /// <summary>Atlas-osoitteet, joita tila tarvitsee mutta joita ei vielä ole (DioraamaSovitin lataa nämä).</summary>
        public void TarvittavatAtlakset(Rakennus rakennus, Tila tila, List<string> ulos)
        {
            if (rakennus.Liekit == null || tila.Liekit == null) return;
            foreach (var lp in tila.Liekit)
                if (rakennus.Liekit.TryGetValue(lp.LiekkiId, out var liekki) && !string.IsNullOrEmpty(liekki.Atlas)
                    && !atlasKuvat.ContainsKey(liekki.Atlas) && !ulos.Contains(liekki.Atlas))
                    ulos.Add(liekki.Atlas);
        }

        /// <summary>Atlas avaimella liekki.Atlas (paketin polku, sama avain kuin TarvittavatAtlakset ja esiintymien AtlasAvain).</summary>
        public void AsetaAtlas(string atlasAvain, Texture2D kuva)
        {
            if (string.IsNullOrEmpty(atlasAvain) || kuva == null) return;
            atlasKuvat[atlasAvain] = kuva;
            if (atlasMateriaalit.TryGetValue(atlasAvain, out var m)) m.SetTexture(IdMainTex, kuva);
            // Uusi kuva voi muuttaa atlaksen mittoja: pakota ruutu uudelleenlaskuun.
            foreach (var e in esiintymat) if (e.AtlasAvain == atlasAvain) e.ViimeRuutu = -1;
        }

        /// <summary>Luo tilan liekit (paikkamerkkiatlaksella, kunnes oikea lataantuu). Paikka ja koko ovat
        /// LiekkiPaikan kiinteitä arvoja, joten ne asetetaan kerran tässä -- vain ruutu ja kääntö kameraan
        /// päivittyvät Paivita-metodissa.</summary>
        public void LisaaTila(Rakennus rakennus, Tila tila, Action<string> kirjaa)
        {
            if (varjostin == null) { kirjaa?.Invoke("poikki: DioraamaLiekki-varjostin puuttuu"); return; }
            if (tila.Liekit == null) return;
            foreach (var paikka in tila.Liekit)
            {
                if (rakennus.Liekit == null || !rakennus.Liekit.TryGetValue(paikka.LiekkiId, out var liekki))
                {
                    kirjaa?.Invoke($"poikki: {tila.Id} liekki '{paikka.LiekkiId}' puuttuu");
                    continue;
                }
                float koko = Mathf.Max(0.001f, (float)paikka.Koko);
                float leveys = (float)liekki.KokoL * koko, korkeus = (float)liekki.KokoK * koko;
                var go = new GameObject("Liekki:" + tila.Id + "/" + paikka.LiekkiId) { layer = DioraamaNayttamo.Kerros };
                go.transform.SetParent(juuri, false);
                go.transform.position = DioraamaNayttamo.UnityPiste(paikka.Paikka);
                var mesh = LuoNelio(leveys, korkeus, (float)liekki.PivotX, (float)liekki.PivotY);
                go.AddComponent<MeshFilter>().sharedMesh = mesh;
                var renderer = go.AddComponent<MeshRenderer>();
                renderer.sharedMaterial = AtlasMateriaali(liekki.Atlas);
                renderer.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                renderer.receiveShadows = false;

                esiintymat.Add(new Esiintyma
                {
                    TilaId = tila.Id, Paikka = paikka, Liekki = liekki,
                    Go = go, Renderer = renderer, Mesh = mesh, AtlasAvain = liekki.Atlas,
                });
            }
        }

        Material AtlasMateriaali(string atlasAvain)
        {
            string avain = atlasAvain ?? "";
            if (atlasMateriaalit.TryGetValue(avain, out var m)) return m;
            m = new Material(varjostin) { name = "DioraamaLiekki/" + (avain.Length > 0 ? avain : "?") };
            m.SetFloat(IdVoima, 1f);
            m.SetTexture(IdMainTex, atlasKuvat.TryGetValue(avain, out var t) && t != null ? t : PaikkamerkkiKuva());
            atlasMateriaalit[avain] = m;
            return m;
        }

        /// <summary>Pehmeä oranssi pisara (valkoisesta keskeltä oranssiin reunaan, alfa = kirkkaus) ennen atlasta
        /// -- ks. tiedoston alkukommentti. Sama idea kuin JS-puolen proseduraalinen paikkamerkki.</summary>
        static Texture2D PaikkamerkkiKuva()
        {
            if (paikkamerkkiKuva != null) return paikkamerkkiKuva;
            const int koko = 16;
            var kuva = new Texture2D(koko, koko, TextureFormat.RGBA32, false)
            { name = "DioraamaLiekkiPaikkamerkki", filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp };
            var pikselit = new Color32[koko * koko];
            float keski = (koko - 1) * 0.5f;
            for (int y = 0; y < koko; y++)
                for (int x = 0; x < koko; x++)
                {
                    float dx = (x - keski) / keski, dy = (y - keski) / keski;
                    float kirkkaus = Mathf.Clamp01(1f - Mathf.Sqrt(dx * dx + dy * dy));
                    kirkkaus *= kirkkaus; // neliöity: pehmeämpi häivytys reunoilla
                    var vari = Color.Lerp(new Color(1f, 0.62f, 0.24f), new Color(1f, 0.93f, 0.78f), kirkkaus);
                    pikselit[y * koko + x] = new Color(vari.r, vari.g, vari.b, kirkkaus);
                }
            kuva.SetPixels32(pikselit);
            kuva.Apply(false, true);
            paikkamerkkiKuva = kuva;
            return paikkamerkkiKuva;
        }

        static Mesh LuoNelio(float leveys, float korkeus, float pivotX, float pivotY)
        {
            var mesh = new Mesh { name = "DioraamaLiekkiNelio" };
            float vasen = -leveys * pivotX, oikea = leveys * (1f - pivotX);
            float ala = -korkeus * pivotY, yla = korkeus * (1f - pivotY);
            mesh.vertices = new[] { new Vector3(vasen, ala, 0), new Vector3(oikea, ala, 0), new Vector3(oikea, yla, 0), new Vector3(vasen, yla, 0) };
            mesh.uv = new[] { new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1) };
            mesh.triangles = new[] { 0, 1, 2, 0, 2, 3 };
            mesh.RecalculateBounds();
            return mesh;
        }

        /// <summary>Joka ruutu: sylinteribillboard kameraa kohti ja atlaksen ruutu ajasta t. Rakennus/Nakyma-
        /// parametrit ovat mukana vain DioraamaHahmot.Paivita-signatuuriyhteensopivuuden vuoksi (ei käytetä, kuten
        /// Hahmotkaan ei käytä rakennus-parametriaan) -- liekillä ei ole Ytimen ohjaamaa näkyvyyttä/silmukkaa.</summary>
        public void Paivita(Rakennus rakennus, Nakyma nakyma, Camera kamera, double t)
        {
            foreach (var e in esiintymat)
            {
                if (kamera != null)
                {
                    Vector3 paikka = e.Go.transform.position;
                    Vector3 kameraan = kamera.transform.position - paikka;
                    kameraan.y = 0f;
                    if (kameraan.sqrMagnitude > 1e-6f) e.Go.transform.rotation = Quaternion.LookRotation(kameraan.normalized, Vector3.up);
                }

                int ruudut = e.Liekki.Ruudut, ruutuIndeksi = 0;
                if (ruudut > 0)
                {
                    double kohta = Math.Floor(t * e.Liekki.Fps + e.Paikka.Vaihe * ruudut);
                    ruutuIndeksi = (int)(((kohta % ruudut) + ruudut) % ruudut);
                }
                if (ruutuIndeksi != e.ViimeRuutu)
                {
                    e.ViimeRuutu = ruutuIndeksi;
                    AsetaRuutu(e.Mesh, e.Liekki, atlasKuvat.TryGetValue(e.AtlasAvain ?? "", out var kuva) ? kuva : null, ruutuIndeksi);
                }
            }
        }

        static void AsetaRuutu(Mesh mesh, Liekki liekki, Texture2D atlas, int ruutuIndeksi)
        {
            int leveysPx = Mathf.Max(1, liekki.RuutuL), korkeusPx = Mathf.Max(1, liekki.RuutuK);
            int sarakkeet = Mathf.Max(1, liekki.Sarakkeet);
            int rivit = Mathf.Max(1, Mathf.CeilToInt(Mathf.Max(1, liekki.Ruudut) / (float)sarakkeet));
            int atlasW = atlas != null ? atlas.width : leveysPx * sarakkeet;
            int atlasH = atlas != null ? atlas.height : korkeusPx * rivit;
            int rivi = ruutuIndeksi / sarakkeet, sarake = ruutuIndeksi % sarakkeet;
            float u0 = Mathf.Clamp01(sarake * leveysPx / (float)atlasW);
            float u1 = Mathf.Clamp01(u0 + leveysPx / (float)atlasW);
            float vYla = Mathf.Clamp01(1f - rivi * korkeusPx / (float)atlasH);
            float vAla = Mathf.Clamp01(vYla - korkeusPx / (float)atlasH);
            mesh.uv = new[] { new Vector2(u0, vAla), new Vector2(u1, vAla), new Vector2(u1, vYla), new Vector2(u0, vYla) };
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
        }
    }
}
