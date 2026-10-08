// DIORAAMAN LIEKIT (Poikkileikkaus-linssi, Linnanrakentaja erä 2/2b, 29.9.2026): tulisijojen, kynttilöiden ja
// soihtujen liekit. Paikat/koot/vaiheet tulevat Tila.Liekit-listasta (LiekkiPaikka), atlas- ja ruudukkotiedot
// Rakennus.Liekit-sanakirjasta (Liekki). Ei Ytimen NakymaHetkella-ohjausta: liekki palaa aina kun sen tila on
// ladattu. Paivita ottaa silti Rakennus/Nakyma-parametrit DioraamaHahmot.Paivita-signatuuriyhteensopivuuden
// vuoksi (kuten Hahmotkaan ei käytä omaa rakennus-parametriaan).
//
// ERA 2B (dioraama-rajapinnat-era2b-20260929.md kohta 6): OLETUS on 3D-liekki -- proseduraalinen pisaramesh
// (2 sisäkkäistä kerrosta, ydin+vaippa) + 24 kipinän mesh, molemmat rakennetaan KERRAN (VarmistaJaetutResurssit)
// ja JAETAAN kaikkien esiintymien kesken; DioraamaLiekki3D.shader laskee vääntymän/kipinöiden paikan ajasta
// kärkivarjostimessa, ei CPU-päivitystä joka ruutu. "poikki liekit 3d|atlas" (DioraamaSovitin.Komento) vaihtaa
// staattista Kolmiulotteinen-lippua; ATLAS on varalla (ennallaan, alla) siltä varalta että 3D-varjostin puuttuu
// tai omistaja haluaa vertailla. Kolme-lippu Esiintymässä kertoo, kumpaa tapaa se käyttää.
//
// ATLAS-VARALLE (ennen atlasta): pehmeä oranssi paikkamerkki (ei tyhjää). Additiivinen Blend One One tekee
// kovareunaisesta tai tyhjästä neliöstä rumemman kuin hahmoilla (ei alpha-cutoutia peittämässä virhettä), joten
// pieni proseduraalinen pehmeä pisara -- sama idea kuin JS-puolen paikkamerkkiatlaksessa (dioraama-rajapinnat-
// era2-20260929.md kohta 2 LIEKIT) -- on parempi kuin räikeä kova neliö tai täysi tyhjyys ennen latausta.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaLiekit
    {
        /// <summary>"poikki liekit 3d|atlas" (DioraamaSovitin.Komento): oletus 3D (era 2b kohta 6). Staattinen
        /// (kuten DioraamaNayttamo.DofPaalla), koska LisaaTila luo esiintymän geometrian sen mukaan -- vaihdos
        /// vaikuttaa seuraaviin LisaaTila-kutsuihin ("poikki lataa" lataa tilat uudelleen).</summary>
        public static bool Kolmiulotteinen = true;

        static readonly int IdVoima = Shader.PropertyToID("_Voima"), IdMainTex = Shader.PropertyToID("_MainTex");
        static readonly int IdAika = Shader.PropertyToID("_DioraamaAika");
        static Texture2D paikkamerkkiKuva;

        // 3D-liekin jaetut resurssit (VarmistaJaetutResurssit): luodaan kerran tätä DioraamaLiekit-instanssia
        // kohti (yksi nayttamo.Liekit koko linssin auki-oloajan) ja tuhotaan Tyhjennassa -- EI staattisia/ikuisia
        // kuten paikkamerkkiKuva, jotta ne oikeasti vapautuvat sulkiessa (spesifikaation vaatimus).
        Shader varjostin3D;
        Mesh liekkiMesh, kipinaMesh;
        Material liekkiMateriaali, kipinaMateriaali;
        bool varoitettu3D;

        sealed class Esiintyma
        {
            public string TilaId;
            public LiekkiPaikka Paikka;
            public Liekki Liekki;
            public GameObject Go;
            /// <summary>Tosi = 3D-liekki (jaettu mesh/materiaali, ei per-ruutu CPU-työtä, ks. Paivita).
            /// Epätosi = atlas-billboard (alla olevat Renderer/Mesh/AtlasAvain/ViimeRuutu käytössä).</summary>
            public bool Kolme;
            /// <summary>Elävä linna: täysi koko (syttyminen skaalaa 0 → Perus) ja syttymiskynnys kaaren osuutena (−1 = ei laskettu).</summary>
            public Vector3 Perus;
            public float Kynnys = -1f;
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

        /// <summary>Rakentaa 3D-liekin jaetut meshit ja materiaalit KERRAN tätä instanssia kohti (LisaaTila
        /// kutsuu joka tilalle, mutta liekkiMesh != null jälkeen tämä palaa heti). Jos varjostinta ei löydy
        /// Resources-kansiosta, jättää liekkiMesh/kipinaMesh nulliksi -- LisaaTila putoaa silloin atlas-varalle
        /// (varoittaa vain kerran, ettei loki tulvi tilaa/liekkiä kohti).</summary>
        void VarmistaJaetutResurssit(Action<string> kirjaa)
        {
            if (liekkiMesh != null || varoitettu3D) return;
            varjostin3D = Resources.Load<Shader>("Varjostimet/DioraamaLiekki3D");
            if (varjostin3D == null)
            {
                varoitettu3D = true;
                kirjaa?.Invoke("poikki: DioraamaLiekki3D-varjostin puuttuu, liekit atlas-varalla");
                return;
            }
            liekkiMesh = LuoLiekkiMesh();
            kipinaMesh = LuoKipinaMesh();
            liekkiMateriaali = new Material(varjostin3D) { name = "DioraamaLiekki3D/Liekki" };
            liekkiMateriaali.SetShaderPassEnabled("Kipinat", false);
            liekkiMateriaali.SetFloat(IdVoima, 1f);
            kipinaMateriaali = new Material(varjostin3D) { name = "DioraamaLiekki3D/Kipinat" };
            kipinaMateriaali.SetShaderPassEnabled("Liekki", false);
            kipinaMateriaali.SetFloat(IdVoima, 1f);
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
            if (tila.Liekit == null) return;
            bool kolme = Kolmiulotteinen;
            if (kolme) VarmistaJaetutResurssit(kirjaa);
            bool voi3D = kolme && liekkiMesh != null && kipinaMesh != null;
            if (!voi3D && varjostin == null) { kirjaa?.Invoke("poikki: DioraamaLiekki-varjostin puuttuu"); return; }

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

                if (voi3D)
                {
                    // Koko liekkipaikan Koko-kertoimesta (paikka.Koko) ja liekkipankin koko_m:stä (liekki.KokoL/
                    // KokoK) transform.localScalena -- jaettu pisaramesh on rakennettu yksikkökokoon (ks.
                    // LuoLiekkiMesh), joten epäsymmetrinen skaala tuottaa halutun leveys×korkeus-suhteen.
                    go.transform.localScale = new Vector3(Mathf.Max(0.01f, leveys), Mathf.Max(0.01f, korkeus), Mathf.Max(0.01f, leveys));
                    go.AddComponent<MeshFilter>().sharedMesh = liekkiMesh;
                    var runko = go.AddComponent<MeshRenderer>();
                    runko.sharedMaterial = liekkiMateriaali;
                    runko.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                    runko.receiveShadows = false;

                    var kipinaGo = new GameObject("Kipinat") { layer = DioraamaNayttamo.Kerros };
                    kipinaGo.transform.SetParent(go.transform, false);
                    kipinaGo.AddComponent<MeshFilter>().sharedMesh = kipinaMesh;
                    var kipinaRend = kipinaGo.AddComponent<MeshRenderer>();
                    kipinaRend.sharedMaterial = kipinaMateriaali;
                    kipinaRend.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                    kipinaRend.receiveShadows = false;

                    esiintymat.Add(new Esiintyma { TilaId = tila.Id, Paikka = paikka, Liekki = liekki, Go = go, Kolme = true });
                    continue;
                }

                // ATLAS-TILA (varalla, ks. tiedoston alkukommentti): entinen sylinteribillboard-nelikulmio.
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

        /// <summary>3D-liekin jaettu pisaramesh (era 2b kohta 6): venytetty pallo 16x10, kaksi sisäkkäistä
        /// kerrosta (vaippa+ydin) eri vaiheella niin että niiden verteksivääntö ei mene synkkaan. Yksikkökokoon
        /// rakennettu -- todellinen leveys/korkeus tulee GameObjectin transform.localScalesta (LisaaTila).
        /// KORJAUS 29.9.2026 (omistaja: "keltainen hehkupallo tulisijan päällä peittää hupun"): säde 0,45/0,25
        /// (oli 1/0,55, suhde 0,55 säilyy kerrosten välillä) -- noin 45 % entisestä, KAPEAMPI kuin yleinen
        /// ~60 % kokopienennys (LisaaPisaraKerros), koska pyöreä "pallo" oli ongelma, ei vain koko. Vaipan
        /// kirkkaus 0,6 -> 0,5 (omistajan pyytämä "_Voima vaipalle ~0,5" -- ydin pysyy 1,35:ssä, siis kirkkaana
        /// vaippaan nähden). Ydin (kirkkaus 1,35, vaihe 2,1) on edelleen kirkkaampi ja hieman lyhyempi/kapeampi
        /// kuin vaippa, kuten ennenkin.</summary>
        static Mesh LuoLiekkiMesh()
        {
            var verts = new List<Vector3>();
            var normit = new List<Vector3>();
            var uv0 = new List<Vector2>();
            var uv1 = new List<Vector2>();
            var tris = new List<int>();
            LisaaPisaraKerros(verts, normit, uv0, uv1, tris, sade: 0.45f, korkeusKerroin: 1f, vaihe: 0f, kirkkaus: 0.5f);
            LisaaPisaraKerros(verts, normit, uv0, uv1, tris, sade: 0.25f, korkeusKerroin: 0.82f, vaihe: 2.1f, kirkkaus: 1.35f);
            var mesh = new Mesh { name = "DioraamaLiekki3D" };
            mesh.SetVertices(verts);
            mesh.SetNormals(normit);
            mesh.SetUVs(0, uv0);
            mesh.SetUVs(1, uv1);
            mesh.SetTriangles(tris, 0);
            mesh.RecalculateBounds();
            // Verteksivääntö siirtää kärkiä hieman rajojen ulkopuolelle -- turvamarginaali, ettei renderer
            // katoa näkymästä väärän kulman/etäisyyden frustum-leikkauksessa. 0,2 (oli 0,35): mesh pieneni
            // KORJAUS 29.9.2026:ssa, entinen marginaali olisi suhteessa ylisuuri (vääntö on suhteellinen).
            var b = mesh.bounds; b.Expand(0.2f); mesh.bounds = b;
            return mesh;
        }

        /// <summary>Yksi pisarakerros (leveä tyvi, kapeneva kärki): lisää valmiiden listojen perään, kärki-
        /// indeksit jatkuvat automaattisesti edellisestä kerroksesta. uv0 = (ympärikulma 0..1, korkeus01 0..1),
        /// uv1 = (kerroksen ajanvaihe, kerroksen kirkkaus) -- DioraamaLiekki3D.shaderin vert/frag lukee näitä.</summary>
        static void LisaaPisaraKerros(List<Vector3> verts, List<Vector3> normit, List<Vector2> uv0, List<Vector2> uv1,
            List<int> tris, float sade, float korkeusKerroin, float vaihe, float kirkkaus)
        {
            const int SARAKKEET = 16, RIVIT = 10;
            int alku = verts.Count;
            for (int rivi = 0; rivi <= RIVIT; rivi++)
            {
                float v01 = rivi / (float)RIVIT; // 0 tyvi .. 1 kärki
                // Säde tyvestä kärkeen: cos-profiili on LEVEIMMILLÄÄN tyvessä (v01=0, vaakasuora tangentti ->
                // pyöreä avoin tyvi kuin pallon pinta hieman navan alta leikattuna) ja kapenee pehmeästi
                // terävään pisteeseen kärjessä (v01=1) -- EI kahta napaa (sin(theta) kapenisi väärin molemmista
                // päistä, kokeiltu ja hylätty katselmoinnissa).
                float r = sade * Mathf.Cos(v01 * Mathf.PI * 0.5f);
                // KORJAUS 29.9.2026 (omistaja: liekki peitti hupun): 0,96 = noin 60 % entisestä 1,6:sta --
                // yhdessä LuoLiekkiMeshin pienemmän saiteen kanssa tulisija (koko_m [0,42,0,52] liekit.js:ssä)
                // päätyy noin 0,5 m korkeaksi (0,52 × 0,96 ≈ 0,5) sen sijaan että peittäisi hupun.
                float y = v01 * korkeusKerroin * 0.96f;
                for (int sarake = 0; sarake <= SARAKKEET; sarake++)
                {
                    float u = sarake / (float)SARAKKEET;
                    float kulma = u * Mathf.PI * 2f;
                    float x = Mathf.Cos(kulma) * r, z = Mathf.Sin(kulma) * r;
                    verts.Add(new Vector3(x, y, z));
                    var n = new Vector3(x, r * 0.35f, z);
                    normit.Add(n.sqrMagnitude > 1e-6f ? n.normalized : Vector3.up);
                    uv0.Add(new Vector2(u, v01));
                    uv1.Add(new Vector2(vaihe, kirkkaus));
                }
            }
            for (int rivi = 0; rivi < RIVIT; rivi++)
                for (int sarake = 0; sarake < SARAKKEET; sarake++)
                {
                    int a = alku + rivi * (SARAKKEET + 1) + sarake, b = a + SARAKKEET + 1;
                    tris.Add(a); tris.Add(a + 1); tris.Add(b + 1);
                    tris.Add(a); tris.Add(b + 1); tris.Add(b);
                }
        }

        /// <summary>3D-liekin jaettu kipinämesh (era 2b kohta 6): 24 nelikulmiota YHDESSÄ meshissä. Todellinen
        /// paikka lasketaan DioraamaLiekki3D.shaderin Kipinat-passissa ajasta ja indeksistä (POSITION.xy =
        /// nelikulman paikallinen kulma -1..1, TEXCOORD0.x = kipinän indeksi) -- kärkien omat koordinaatit
        /// tässä eivät ole todellinen paikka, vain data varjostimelle, siksi bounds asetetaan käsin alla.</summary>
        static Mesh LuoKipinaMesh()
        {
            const int MAARA = 24;
            var verts = new Vector3[MAARA * 4];
            var uv0 = new Vector2[MAARA * 4];
            var tris = new int[MAARA * 6];
            Vector2[] kulmat = { new Vector2(-1, -1), new Vector2(1, -1), new Vector2(1, 1), new Vector2(-1, 1) };
            for (int i = 0; i < MAARA; i++)
            {
                int vBase = i * 4;
                for (int k = 0; k < 4; k++)
                {
                    verts[vBase + k] = new Vector3(kulmat[k].x, kulmat[k].y, 0f);
                    uv0[vBase + k] = new Vector2(i, 0f);
                }
                int tBase = i * 6;
                tris[tBase] = vBase; tris[tBase + 1] = vBase + 1; tris[tBase + 2] = vBase + 2;
                tris[tBase + 3] = vBase; tris[tBase + 4] = vBase + 2; tris[tBase + 5] = vBase + 3;
            }
            var mesh = new Mesh { name = "DioraamaKipinat" };
            mesh.SetVertices(verts);
            mesh.SetUVs(0, uv0);
            mesh.SetTriangles(tris, 0);
            // Käsin asetetut bounds (ks. summary): kipinät nousevat/ajelehtivat karkeasti tyvestä ~1,5 yksikköä
            // ylöspäin, ±0,15 sivuille, plus billboard-koon marginaali.
            mesh.bounds = new Bounds(new Vector3(0f, 0.8f, 0f), new Vector3(1.3f, 1.9f, 1.3f));
            return mesh;
        }

        /// <summary>Joka ruutu: sylinteribillboard kameraa kohti ja atlaksen ruutu ajasta t. Rakennus/Nakyma-
        /// parametrit ovat mukana vain DioraamaHahmot.Paivita-signatuuriyhteensopivuuden vuoksi (ei käytetä, kuten
        /// Hahmotkaan ei käytä rakennus-parametriaan) -- liekillä ei ole Ytimen ohjaamaa näkyvyyttä/silmukkaa.</summary>
        /// <summary>
        /// Olavinlinna (Siirtoseppä 29.9.2026): 3D-liekki Blenderin liekki:-tyhjästä (DioraamaTyhja, extras koko =
        /// liekin korkeus m, oletus 0,45; leveys 0,6 × korkeus). Sama jaettu pisaramesh ja kipinät kuin LisaaTila:n
        /// 3D-tilassa; ei liekkipankkia eikä atlasta. paikka on maailmassa.
        /// </summary>
        public void LisaaTyhja(string tilaId, DioraamaTyhja tyhja, Vector3 paikka, Action<string> kirjaa)
        {
            VarmistaJaetutResurssit(kirjaa);
            if (liekkiMesh == null || kipinaMesh == null) { kirjaa?.Invoke($"poikki: {tilaId} liekki:{tyhja.Id} ilman 3D-liekkiä"); return; }
            float korkeus = Mathf.Max(0.05f, tyhja.Luku("koko", 0.45f)), leveys = korkeus * 0.6f;
            var go = new GameObject("Liekki:" + tilaId + "/" + tyhja.Id) { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(juuri, false);
            go.transform.position = paikka;
            go.transform.localScale = new Vector3(leveys, korkeus, leveys);
            go.AddComponent<MeshFilter>().sharedMesh = liekkiMesh;
            var runko = go.AddComponent<MeshRenderer>();
            runko.sharedMaterial = liekkiMateriaali;
            runko.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            runko.receiveShadows = false;
            var kipinaGo = new GameObject("Kipinat") { layer = DioraamaNayttamo.Kerros };
            kipinaGo.transform.SetParent(go.transform, false);
            kipinaGo.AddComponent<MeshFilter>().sharedMesh = kipinaMesh;
            var kipinaRend = kipinaGo.AddComponent<MeshRenderer>();
            kipinaRend.sharedMaterial = kipinaMateriaali;
            kipinaRend.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            kipinaRend.receiveShadows = false;
            esiintymat.Add(new Esiintyma { TilaId = tilaId, Paikka = new LiekkiPaikka { LiekkiId = "tyhja:" + tyhja.Id, Koko = korkeus }, Go = go, Kolme = true,
                Perus = go.transform.localScale });
            kynnyksetLaskettu = false;
        }

        /// <summary>Tilan glb:n liekki:-solmut ovat sen liekit (Linnanrakentaja 2.10.2026: sama liekki piirtyi kahdesti, rakennus.json:n
        /// tila.Liekit-listasta ja solmusta). DioraamaSovitin kutsuu tätä, kun tilan glb:ssä on liekki:-solmuja: tilan JSON-liekit pois.</summary>
        /// <summary>Historiamoottori V7: valoisuus 0…1 pisteessä kaikista näkyvistä (aktiivisista) liekeistä: lähin liekki
        /// lineaarisesti säteeseen (tulisija ja soihtu 6 m, kynttilä 3 m koon mukaan), alaraja perusvalo.</summary>
        public float Valoisuus(Vector3 p, float perus = 0.25f)
        {
            float v = perus;
            foreach (var e in esiintymat)
            {
                if (e.Go == null || !e.Go.activeInHierarchy) continue;
                float sade = Mathf.Clamp(2.5f + 2.5f * (float)e.Paikka.Koko, 2.5f, 6f);
                float d = Vector3.Distance(e.Go.transform.position, p);
                if (d < sade) v = Mathf.Max(v, 1f - d / sade);
            }
            return Mathf.Clamp01(v);
        }

        /// <summary>Historiamoottori 8.10.: isot liekit (koko ≥ minKoko: soihdut ja tulisijat, valosäde ≥ 6 m) volumetrista hehkua varten.</summary>
        public void IsotLiekit(float minKoko, List<GameObject> ulos)
        {
            foreach (var e in esiintymat) if (e.Go != null && e.Paikka != null && e.Paikka.Koko >= minKoko) ulos.Add(e.Go);
        }

        /// <summary>Historiamoottori E3: tilan liekkien GameObjectit ja paikat (kynttilöiden sammutus ja sytytys).</summary>
        public List<(GameObject Go, Vector3 Paikka)> TilanLiekit(string tilaId)
        {
            var l = new List<(GameObject, Vector3)>();
            foreach (var e in esiintymat) if (e.TilaId == tilaId && e.Go != null) l.Add((e.Go, e.Go.transform.position));
            return l;
        }

        public int PoistaJsonLiekit(string tilaId)
        {
            return esiintymat.RemoveAll(e =>
            {
                if (e.TilaId != tilaId || (e.Paikka?.LiekkiId != null && e.Paikka.LiekkiId.StartsWith("tyhja:"))) return false;
                if (e.Mesh != null) UnityEngine.Object.Destroy(e.Mesh);
                if (e.Go != null) UnityEngine.Object.Destroy(e.Go);
                return true;
            });
        }

        bool kynnyksetLaskettu, kaikkiSyttyneet;

        /// <summary>Elävä linna: lyhdyn pieni 3D-liekki (6 cm) hahmon lapseksi, jaettu pisaramesh ja materiaali; ei kipinöitä.</summary>
        public GameObject LuoLyhty(Transform isa)
        {
            VarmistaJaetutResurssit(null);
            if (liekkiMesh == null || isa == null) return null;
            var go = new GameObject("Lyhty") { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(isa, false);
            go.transform.localScale = new Vector3(0.04f, 0.07f, 0.04f);
            go.AddComponent<MeshFilter>().sharedMesh = liekkiMesh;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterial = liekkiMateriaali;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            if (SeikkailuValot.Liekki(go.transform, DioraamaNayttamo.Kerros) != null) r.enabled = false;   // Candle VFX -liekki (PT 7.10.)
            return go;
        }

        /// <summary>
        /// Elävä linna, soihtujen syttyminen (käsikirjoitus 29.9. kohta 1: "soihdut syttyvät muureilla yksi kerrallaan"):
        /// tyhjistä tehdyt liekit syttyvät kaaren edetessä lähimmästä (kaaren loppukohde) kauimpaan, kynnykset
        /// 0,15…0,85 kaaren osuudesta, kasvu 0,06 osuuden aikana. osuus 1 = kaikki palavat (myös myöhemmin ladatut).
        /// </summary>
        public void Syttyminen(double osuus, Vector3 loppu)
        {
            if (osuus >= 1 && kaikkiSyttyneet) return;
            if (!kynnyksetLaskettu)
            {
                var tyhjat = esiintymat.FindAll(e => e.Kolme && e.Go != null && e.Paikka?.LiekkiId != null && e.Paikka.LiekkiId.StartsWith("tyhja:"));
                tyhjat.Sort((a, b) => (a.Go.transform.position - loppu).sqrMagnitude.CompareTo((b.Go.transform.position - loppu).sqrMagnitude));
                for (int i = 0; i < tyhjat.Count; i++) tyhjat[i].Kynnys = 0.15f + 0.7f * i / Mathf.Max(1, tyhjat.Count - 1);
                kynnyksetLaskettu = true;
            }
            bool kaikki = true;
            foreach (var e in esiintymat)
            {
                if (e.Kynnys < 0 || e.Go == null) continue;
                float k = Mathf.SmoothStep(0f, 1f, Mathf.Clamp01(((float)osuus - e.Kynnys) / 0.06f));
                if (k < 1f) kaikki = false;
                e.Go.transform.localScale = e.Perus * Mathf.Max(0.0001f, k);
                e.Go.SetActive(k > 0.001f);
            }
            kaikkiSyttyneet = kaikki && osuus >= 1;
        }

        public void Paivita(Rakennus rakennus, Nakyma nakyma, Camera kamera, double t)
        {
            // Globaali (ei per-esiintymä): DioraamaLiekki3D.shader lukee tämän _DioraamaAika-uniformista sekä
            // liekin vääntöön että kipinöiden paikkaan -- SAMA t kuin muualla dioraamassa (ei Unityn omaa
            // _Time:a), jotta "poikki aika" pysäyttää nämäkin kuten atlas-liekin ruudun ennen tätä.
            Shader.SetGlobalFloat(IdAika, (float)t);
            foreach (var e in esiintymat)
            {
                // Elävä linna: toisen tilan (tunnelma) liekki piiloon leikkauskäytävässä, kuten sen leivottu teline -- sekä
                // liekki:-solmusta että JSON-listasta tehty (2.10.: JSON-liekit jäivät leijumaan, kun teline katosi).
                if (e.Go != null && e.TilaId != DioraamaUlkokuori.LeikkausTila)
                {
                    var r = e.Go.GetComponent<MeshRenderer>();
                    bool piilo = DioraamaUlkokuori.Leikkauksessa(e.Go.transform.position);
                    if (r != null && r.enabled == piilo) { r.enabled = !piilo; foreach (var rr in e.Go.GetComponentsInChildren<MeshRenderer>()) rr.enabled = !piilo; }
                }
                // 3D-liekki laskee kaiken (vääntö, kipinöiden nousu/ajelehdus/sammuminen) kärkivarjostimessa
                // yllä asetetusta globaalista -- ei billboard-kääntöä (oikea 3D-mesh näyttää oikealta kaikista
                // kulmista) eikä per-ruutu CPU-työtä, ks. tiedoston alkukommentti.
                if (e.Kolme) continue;
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
            kynnyksetLaskettu = false; kaikkiSyttyneet = false;
            foreach (var e in esiintymat)
                if (e.Go != null)
                {
                    // e.Mesh on atlas-tilan OMA nelikulmio (per esiintymä); 3D-tilan liekki/kipinämesh ovat
                    // jaettuja (liekkiMesh/kipinaMesh) ja tuhotaan kerran alla, ei per esiintymä.
                    if (e.Mesh != null) UnityEngine.Object.Destroy(e.Mesh);
                    UnityEngine.Object.Destroy(e.Go); // tuhoaa myös 3D-tilan Kipinat-lapsiobjektin
                }
            esiintymat.Clear();
            foreach (var m in atlasMateriaalit.Values) if (m != null) UnityEngine.Object.Destroy(m);
            atlasMateriaalit.Clear();
            atlasKuvat.Clear();

            // 3D-liekin jaetut resurssit (spesifikaation vaatimus: jaetut meshit ja materiaalit tuhotaan tässä).
            if (liekkiMateriaali != null) { UnityEngine.Object.Destroy(liekkiMateriaali); liekkiMateriaali = null; }
            if (kipinaMateriaali != null) { UnityEngine.Object.Destroy(kipinaMateriaali); kipinaMateriaali = null; }
            if (liekkiMesh != null) { UnityEngine.Object.Destroy(liekkiMesh); liekkiMesh = null; }
            if (kipinaMesh != null) { UnityEngine.Object.Destroy(kipinaMesh); kipinaMesh = null; }
            varoitettu3D = false;
        }
    }
}
