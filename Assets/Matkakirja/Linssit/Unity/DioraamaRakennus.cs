// DIORAAMAN RAKENNUS (Poikkileikkaus-linssi, Linnanrakentaja erä 1, 29.9.2026): yksi GameObject per tila,
// rakennettu rakennuskoneen (A1, tools/dioraama/rakenna.mjs) leipomasta glb:stä (DioraamaGlb.Lue, unityyn: true
// — koordinaatit ja kolmioiden kiertosuunta ovat jo Unity-avaruudessa, ei lisämuunnosta). Materiaali on jaettu
// PINNAN mukaan (ei tilan): kaikki tilat, joissa on esim. "kivi"-pintaa, käyttävät samaa Material-oliota.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaRakennus
    {
        static readonly int IdVari = Shader.PropertyToID("_Vari"), IdLampo = Shader.PropertyToID("_Lampo"),
            IdPohjaKuva = Shader.PropertyToID("_PohjaKuva"), IdVirtaus = Shader.PropertyToID("_Virtaus"),
            IdTila = Shader.PropertyToID("_Tila"), IdKuvioTyyppi = Shader.PropertyToID("_KuvioTyyppi"),
            IdKuvioParametrit = Shader.PropertyToID("_KuvioParametrit");
        static readonly Color OletusVari = new Color(0.72f, 0.68f, 0.61f), OletusLampo = new Color(1f, 0.6902f, 0.3765f);
        /// <summary>Kuvio.Tyyppi (era 2b, dioraama-rajapinnat-era2b-20260929.md kohta 2) → DioraamaKuviot.hlsl:n
        /// DioraamaKuvio()-funktion tyyppi-indeksi. Puuttuva/tunnistamaton tyyppi ("tasainen" mukaan lukien) = 0.</summary>
        static readonly Dictionary<string, float> KuvioTyyppinumero = new Dictionary<string, float>(StringComparer.Ordinal)
        {
            ["tasainen"] = 0, ["kivi"] = 1, ["puu"] = 2, ["lankku"] = 3, ["rappaus"] = 4, ["tiili"] = 5,
            ["kallio"] = 6, ["vesi"] = 7, ["metalli"] = 8, ["kangas"] = 9, ["olki"] = 10,
        };

        readonly Transform juuri;
        /// <summary>Valaistu (era 2b, oikea URP-valaistus) ja vanha valaisematon varara -- ks. Valaistus-ominaisuus.</summary>
        readonly Shader varjostinValaistu, varjostinMaalattu;
        readonly Dictionary<string, Material> materiaalit = new Dictionary<string, Material>();
        readonly Dictionary<string, GameObject> tilat = new Dictionary<string, GameObject>();
        // AsetaPinta (Codexin maalattu pohjakuva, erä 2) voi saapua ennen kuin pintaa käyttävä tila on latautunut
        // eikä materiaalia siis vielä ole: kuva jää tähän odottamaan, ja MateriaaliPinnalle asettaa sen heti kun
        // materiaali syntyy. viimeisinRakennus muistaa Pinnat-taulukon AsetaPinta-kutsua varten (sillä ei ole omaa
        // Rakennus-parametria, ks. dioraama-rajapinnat-era2-20260929.md kohta 3): MateriaaliPinnalle päivittää sen
        // aina kun materiaalia haetaan/luodaan, joten se on tuore aina kun materiaali kyseiselle pinnalle on olemassa.
        readonly Dictionary<string, Texture2D> odottavatPohjakuvat = new Dictionary<string, Texture2D>();
        Rakennus viimeisinRakennus;

        public DioraamaRakennus(Transform juuri)
        {
            this.juuri = juuri;
            varjostinValaistu = Resources.Load<Shader>("Varjostimet/DioraamaValaistu");
            varjostinMaalattu = Resources.Load<Shader>("Varjostimet/DioraamaMaalattu");
            varjostinLeivottu = Resources.Load<Shader>("Varjostimet/DioraamaLeivottu");
        }

        // --- LEIVOTTU VALO (Olavinlinna uudella tavalla, Siirtoseppä 29.9.2026) ---------------------------------
        // Tila, jolla on valoatlas (Tila.ValoAtlas) ja jonka KAIKILLA primitiiveillä on UV1 (Blenderin toinen UV-kartta),
        // piirretään DioraamaLeivottu-varjostimella: yksi materiaali per tila (atlas on tilakohtainen), ei reaaliaikaisia
        // varjoja. Muut tilat kuten ennen (pintakohtainen maalattu/valaistu materiaali).
        readonly Shader varjostinLeivottu;
        static readonly int IdValoAtlas = Shader.PropertyToID("_ValoAtlas"), IdValoVain = Shader.PropertyToID("_ValoVain");
        /// <summary>Kävelyosien valo-kloonit (LR 8.10., juna 169): pintamateriaali × tilan valoatlas; avain tila|pinta.</summary>
        readonly Dictionary<string, (string Tila, Material Pohja, Material Klooni)> valoKloonit = new Dictionary<string, (string, Material, Material)>();
        readonly Dictionary<string, Material> leivotut = new Dictionary<string, Material>();
        /// <summary>Tilan liput (pinta "lippu"): sama atlas, heiluva materiaali (DioraamaLeivottu _Heilunta 1).</summary>
        readonly Dictionary<string, Material> leivotutLiput = new Dictionary<string, Material>();
        static readonly int IdHeilunta = Shader.PropertyToID("_Heilunta");
        readonly Dictionary<string, Texture2D> odottavatValoAtlakset = new Dictionary<string, Texture2D>();
        readonly Dictionary<string, List<DioraamaTyhja>> tyhjat = new Dictionary<string, List<DioraamaTyhja>>();

        /// <summary>Tilan Blender-tyhjät (valo:/liekki:/ikkuna:) tilan GameObjectin avaruudessa; tyhjä lista, jos ei ole.</summary>
        public List<DioraamaTyhja> Tyhjat(string tilaId) => tyhjat.TryGetValue(tilaId ?? "", out var l) ? l : new List<DioraamaTyhja>();

        /// <summary>Leivottujen tilojen määrä (testikysely "poikki tila").</summary>
        public int Leivottuja => leivotut.Count;

        /// <summary>Tilan leivottu valoatlas (DioraamaSovitin.LataaValoAtlas). Voi saapua ennen tilan glb:tä.</summary>
        public void AsetaValoAtlas(string tilaId, Texture2D kuva)
        {
            if (string.IsNullOrEmpty(tilaId) || kuva == null) return;
            odottavatValoAtlakset[tilaId] = kuva;
            if (leivotut.TryGetValue(tilaId, out var m) && m != null) m.SetTexture(IdValoAtlas, kuva);
            foreach (var k in valoKloonit.Values) if (k.Tila == tilaId && k.Klooni != null) k.Klooni.SetTexture(IdValoAtlas, kuva);
            if (leivotutLiput.TryGetValue(tilaId, out var l) && l != null) l.SetTexture(IdValoAtlas, kuva);
        }

        public int TilojaLadattu => tilat.Count;
        public IReadOnlyDictionary<string, GameObject> Tilat => tilat;
        public int Kolmiot { get; private set; }
        public int Karjet { get; private set; }
        public int Materiaaleja => materiaalit.Count;
        public int Renderereita { get; private set; }

        bool valaistus = true;
        /// <summary>Kytkin "poikki valaistus 0|1" (DioraamaSovitin.Komento): tosi = DioraamaValaistu (era 2b,
        /// oikea URP-valo+varjo), epätosi = vanha valaisematon DioraamaMaalattu (varalla, ks. tiedoston
        /// alkukommentti). Vaihtaa KAIKKIEN jo luotujen materiaalien varjostimen suoraan (Material.shader) --
        /// materiaalien tallennetut ominaisuudet (_Vari, _Tila, _KuvioTyyppi, _PohjaKuva…) säilyvät, koska
        /// molemmat varjostimet käyttävät samoja propertynimiä (ks. DioraamaValaistu.shader-kommentti).</summary>
        public bool Valaistus
        {
            get => valaistus;
            set
            {
                valaistus = value;
                var s = NykyinenVarjostin();
                if (s == null) return;
                foreach (var m in materiaalit.Values) if (m != null) m.shader = s;
            }
        }

        Shader NykyinenVarjostin() => valaistus ? varjostinValaistu : varjostinMaalattu;

        /// <summary>"poikki pinnat a|b" (kehittäjätilan A/B-vertailu, kohta 2: "Taulussa A/B-kytkin vain
        /// kehittäjätilassa"): pakottaa KAIKKIEN jo luotujen materiaalien _Tila-arvon kertaluonteisesti (ei
        /// pysyvä tila -- seuraava AsetaPinta-kutsu palauttaa kyseisen pinnan B:hen normaalisti).</summary>
        public void PakotaTilaKaikille(bool b)
        {
            // B koskee vain pintoja, joilla on Codexin kuva (muut pysyvät A:na); pakotus muistetaan myöhemmin
            // latautuville kuville (katselmointi 29.9.: A/B-kuva ei saa sekoittua kesken latauksen).
            pakotettuTila = b ? 1 : 0;
            foreach (var m in materiaalit.Values) if (m != null) m.SetFloat(IdTila, b && kuvalliset.Contains(m) ? 1f : 0f);
        }

        int pakotettuTila = -1; // -1 = ei pakotusta, 0 = A, 1 = B
        readonly HashSet<Material> kuvalliset = new HashSet<Material>();

        public bool SisaltaaTilan(string id) => tilat.ContainsKey(id);

        /// <summary>Kokin maalattu pohjakuva pinnalle (Codexin JPG, erä 2, dioraama-rajapinnat-era2-20260929.md
        /// kohta 3): jaettuun pinnan materiaaliin _PohjaKuva, _Vari valkoiseksi (väri tulee nyt kuvasta, ei enää
        /// tasaväristä) ja _Virtaus = (VirtausU/ToistoU, VirtausV/ToistoV) UV/s (vain vesi virtaa). Jos materiaalia
        /// ei vielä ole (pintaa käyttävä tila ei ole vielä latautunut), kuva jää odottamaan MateriaaliPinnalle-
        /// kutsuun asti.</summary>
        public void AsetaPinta(string pintaId, Texture2D kuva)
        {
            if (string.IsNullOrEmpty(pintaId) || kuva == null) return;
            odottavatPohjakuvat[pintaId] = kuva;
            if (materiaalit.TryGetValue(pintaId, out var m)) AsetaPohjakuvaMateriaaliin(m, pintaId, kuva, viimeisinRakennus);
        }

        void AsetaPohjakuvaMateriaaliin(Material m, string pintaId, Texture2D kuva, Rakennus rakennus)
        {
            m.SetTexture(IdPohjaKuva, kuva);
            if (!m.shader.name.Contains("Valaistu")) m.SetColor(IdVari, Color.white); // valaisematon B: kuva sellaisenaan; valaistu B ohittaa _Varin, joten A säilyttää pinnan värin
            kuvalliset.Add(m);
            m.SetFloat(IdTila, pakotettuTila == 0 ? 0f : 1f); // era 2b: B vain kun tekstuuri on ladattu (ellei A pakotettu)
            double virtausU = 0, virtausV = 0;
            if (rakennus?.Pinnat != null && rakennus.Pinnat.TryGetValue(pintaId, out var pinta))
            {
                if (pinta.ToistoU != 0) virtausU = pinta.VirtausU / pinta.ToistoU;
                if (pinta.ToistoV != 0) virtausV = pinta.VirtausV / pinta.ToistoV;
            }
            m.SetVector(IdVirtaus, new Vector4((float)virtausU, (float)virtausV, 0, 0));
            // Valo-kloonit perivät pohjakuvan ja tilan (kävelyosat, juna 169).
            foreach (var k in valoKloonit.Values)
                if (k.Pohja == m && k.Klooni != null)
                {
                    k.Klooni.CopyPropertiesFromMaterial(m); k.Klooni.SetFloat(IdValoVain, 1f);
                    if (odottavatValoAtlakset.TryGetValue(k.Tila, out var atlas)) k.Klooni.SetTexture(IdValoAtlas, atlas);
                }
        }

        /// <summary>Kävelyosan pinnan materiaali, jossa valo tulee tilan valoatlaksesta (UV1) eikä reaaliaikaisista valoista.</summary>
        Material ValoKlooni(string tilaId, Rakennus rakennus, string pinta)
        {
            var pohja = MateriaaliPinnalle(rakennus, pinta);
            string avain = tilaId + "|" + pohja.name;
            if (valoKloonit.TryGetValue(avain, out var k) && k.Klooni != null) return k.Klooni;
            var m = new Material(pohja) { name = pohja.name + "@" + tilaId };
            m.SetFloat(IdValoVain, 1f);
            if (odottavatValoAtlakset.TryGetValue(tilaId, out var atlas)) m.SetTexture(IdValoAtlas, atlas);
            valoKloonit[avain] = (tilaId, pohja, m);
            return m;
        }

        /// <summary>Rakentaa yhden tilan glb-tavuista. Palauttaa false (ja kirjaa syyn), jos glb ei kelvannut —
        /// linssi ei kaadu, tila jää vain puuttumaan (dioraama-rajapinnat-20260929.md kohta 6).</summary>
        public bool LisaaTila(Rakennus rakennus, Tila tila, byte[] glbTavut, Action<string> kirjaa)
        {
            if (SisaltaaTilan(tila.Id)) return true;
            if (NykyinenVarjostin() == null) { kirjaa?.Invoke("poikki: Dioraama-varjostin puuttuu (" + (valaistus ? "DioraamaValaistu" : "DioraamaMaalattu") + ")"); return false; }
            if (glbTavut == null || glbTavut.Length == 0) { kirjaa?.Invoke($"poikki: {tila.Id} glb tyhjä"); return false; }

            GlbMalli malli;
            try { malli = DioraamaGlb.Lue(glbTavut, true); }
            catch (Exception e) { kirjaa?.Invoke($"poikki: {tila.Id} glb virhe: {e.Message}"); return false; }
            if (malli?.Osat == null || malli.Osat.Count == 0) { kirjaa?.Invoke($"poikki: {tila.Id} glb ilman osia"); return false; }

            int kaikkiKarjet = 0;
            foreach (var osa in malli.Osat) kaikkiKarjet += (osa.Paikat?.Length ?? 0) / 3;
            tyhjat[tila.Id] = DioraamaTyhja.Lue(malli);
            bool leivottu = !string.IsNullOrEmpty(tila.ValoAtlas) && varjostinLeivottu != null;
            if (leivottu) foreach (var osa in malli.Osat) if (osa.Uv1 == null || osa.Uv1.Length < (osa.Paikat?.Length ?? 0) / 3 * 2) leivottu = false;
            // Kävelyosa: atlas on pelkkä valo → pintamateriaalin kloonit (DioraamaValaistu _ValoVain), ei DioraamaLeivottua.
            bool valoVain = leivottu && tila.ValoVain && valaistus;
            if (valoVain) leivottu = false;
            if (!string.IsNullOrEmpty(tila.ValoAtlas) && !leivottu && !valoVain) kirjaa?.Invoke($"poikki: {tila.Id} valoatlas ilman UV1:tä tai varjostinta (maalattu varalla)");
            var uv1t = leivottu || valoVain ? new Vector2[kaikkiKarjet] : null;
            Material leivottuMateriaali = null;
            if (leivottu)
            {
                leivottuMateriaali = new Material(varjostinLeivottu) { name = "Dioraama/Leivottu:" + tila.Id };
                // Kohdistamaton tila (tunnelma) leikataan kuoren tavoin, jottei se jää kellumaan leikkauskäytävään.
                leivottuMateriaali.SetFloat("_Leikattava", tila.Kohdistettava ? 0f : 1f);
                if (odottavatValoAtlakset.TryGetValue(tila.Id, out var atlas)) leivottuMateriaali.SetTexture(IdValoAtlas, atlas);
                leivotut[tila.Id] = leivottuMateriaali;
            }
            var paikat = new Vector3[kaikkiKarjet];
            var normaalit = new Vector3[kaikkiKarjet];
            var uvt = new Vector2[kaikkiKarjet];
            var varit = new Color32[kaikkiKarjet];
            var materiaalitJarjestyksessa = new Material[malli.Osat.Count];
            var kolmiotOsittain = new int[malli.Osat.Count][];
            int kv = 0, kolmioita = 0;
            for (int oi = 0; oi < malli.Osat.Count; oi++)
            {
                var osa = malli.Osat[oi];
                int n = (osa.Paikat?.Length ?? 0) / 3;
                for (int i = 0; i < n; i++)
                {
                    paikat[kv + i] = new Vector3(osa.Paikat[i * 3], osa.Paikat[i * 3 + 1], osa.Paikat[i * 3 + 2]);
                    normaalit[kv + i] = osa.Normaalit != null && osa.Normaalit.Length >= (i + 1) * 3
                        ? new Vector3(osa.Normaalit[i * 3], osa.Normaalit[i * 3 + 1], osa.Normaalit[i * 3 + 2]) : Vector3.up;
                    uvt[kv + i] = osa.Uv != null && osa.Uv.Length >= (i + 1) * 2 ? new Vector2(osa.Uv[i * 2], osa.Uv[i * 2 + 1])
                        : LaatikkoUv(paikat[kv + i], normaalit[kv + i]) / ToistoPinnalle(rakennus, osa.Pinta);
                    // glTF:n UV:n origo on vasen yläkulma, Unityn tekstuurin vasen alakulma: atlas-UV käännetään (v → 1 − v).
                    if (uv1t != null) uv1t[kv + i] = new Vector2(osa.Uv1[i * 2], 1f - osa.Uv1[i * 2 + 1]);
                    varit[kv + i] = osa.Varit != null && osa.Varit.Length >= (i + 1) * 4
                        ? new Color32(osa.Varit[i * 4], osa.Varit[i * 4 + 1], osa.Varit[i * 4 + 2], osa.Varit[i * 4 + 3])
                        : new Color32(255, 0, 0, 255);
                }
                int[] lahde = osa.Kolmiot ?? Array.Empty<int>();
                var kolmiot = new int[lahde.Length];
                for (int i = 0; i < lahde.Length; i++) kolmiot[i] = lahde[i] + kv;
                kolmiotOsittain[oi] = kolmiot;
                kolmioita += kolmiot.Length / 3;
                materiaalitJarjestyksessa[oi] = leivottu ? (osa.Pinta == "lippu" ? LippuMateriaali(tila.Id, leivottuMateriaali) : leivottuMateriaali)
                    : valoVain ? ValoKlooni(tila.Id, rakennus, osa.Pinta) : MateriaaliPinnalle(rakennus, osa.Pinta);
                kv += n;
            }

            var mesh = new Mesh { name = "Dioraama:" + tila.Id, indexFormat = IndexFormat.UInt32 };
            mesh.SetVertices(paikat);
            mesh.SetNormals(normaalit);
            mesh.SetUVs(0, uvt);
            if (uv1t != null) mesh.SetUVs(1, uv1t);
            mesh.SetColors(varit);
            mesh.subMeshCount = malli.Osat.Count;
            for (int oi = 0; oi < malli.Osat.Count; oi++) mesh.SetTriangles(kolmiotOsittain[oi], oi);
            mesh.RecalculateBounds();

            var go = new GameObject("Tila:" + tila.Id) { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(juuri, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var renderer = go.AddComponent<MeshRenderer>();
            renderer.sharedMaterials = materiaalitJarjestyksessa;
            // era 2b (kohta 2): aurinko+lamput+tuli heittävät ja vastaanottavat varjoja. Ei haittaa Valaistus=false
            // -tilassa (DioraamaMaalattu ei kirjoita ShadowCaster-passia eikä lue varjokarttaa -- renderer-liput
            // jäävät silloin vaikutuksettomiksi).
            // Leivottu tila: valo ja varjot ovat jo atlaksessa (ei varjokarttaa, halvempi iPhonella).
            renderer.shadowCastingMode = leivottu ? ShadowCastingMode.Off : ShadowCastingMode.On;
            renderer.receiveShadows = !leivottu;

            tilat[tila.Id] = go;
            Kolmiot += kolmioita;
            Karjet += kaikkiKarjet;
            Renderereita++;
            return true;
        }

        Material LippuMateriaali(string tilaId, Material pohja)
        {
            if (leivotutLiput.TryGetValue(tilaId, out var m) && m != null) return m;
            m = new Material(pohja) { name = pohja.name + ":lippu" };
            m.SetFloat(IdHeilunta, 1f);
            leivotutLiput[tilaId] = m;
            return m;
        }

        /// <summary>Olavinlinna: jaetun pinnan materiaali muille näkymille (kuoren alla oleva järvi käyttää pintaa "vesi").</summary>
        public Material PinnanMateriaali(Rakennus rakennus, string pintaId) =>
            rakennus != null && NykyinenVarjostin() != null ? MateriaaliPinnalle(rakennus, pintaId) : null;

        /// <summary>UV:ttömän glb:n (Linnanrakentajan kavely-osat: vain paikat, normaalit ja pintanimi) laatikkoprojektio metreinä:
        /// hallitsevan normaaliakselin taso, kuten pintojen koko_m- ja toisto_m-kuviot olettavat.</summary>
        static Vector2 LaatikkoUv(Vector3 p, Vector3 n)
        {
            float ax = Mathf.Abs(n.x), ay = Mathf.Abs(n.y), az = Mathf.Abs(n.z);
            return ay >= ax && ay >= az ? new Vector2(p.x, p.z) : ax >= az ? new Vector2(p.z, p.y) : new Vector2(p.x, p.y);
        }

        /// <summary>Pinnan toisto_m (laatikko-UV:n jakaja, kuten Linnanrakentajan viennin UV:t: metrit / toisto); 1 jos puuttuu.</summary>
        static float ToistoPinnalle(Rakennus rakennus, string pintaId)
        {
            if (pintaId == null || rakennus?.Pinnat == null) return 1f;
            if (!rakennus.Pinnat.TryGetValue(pintaId, out var p) && !(PintaAliakset.TryGetValue(pintaId, out var a) && rakennus.Pinnat.TryGetValue(a, out p))) return 1f;
            return p.ToistoU > 0 ? (float)p.ToistoU : 1f;
        }

        /// <summary>Kävelyosien pintanimet, joita rakennus.jsonin pinnoissa ei ole: lähin olemassa oleva pinta.</summary>
        static readonly Dictionary<string, string> PintaAliakset = new Dictionary<string, string> { ["laasti"] = "rappaus", ["laatta"] = "kivilattia" };

        /// <summary>Historiamoottori E3: tilan leivottu materiaali (_Kirkkaus: kynttilöiden sammuminen himmentää huoneen), tai null.</summary>
        public Material LeivottuMateriaali(string tilaId) => leivotut.TryGetValue(tilaId, out var m) ? m : null;

        Material MateriaaliPinnalle(Rakennus rakennus, string pintaId)
        {
            if (pintaId != null && rakennus?.Pinnat != null && !rakennus.Pinnat.ContainsKey(pintaId) && PintaAliakset.TryGetValue(pintaId, out var alias)
                && rakennus.Pinnat.ContainsKey(alias)) pintaId = alias;
            viimeisinRakennus = rakennus;
            string avain = pintaId ?? "?";
            if (materiaalit.TryGetValue(avain, out var m)) return m;
            Color vari = OletusVari;
            double hehku = 0;
            Kuvio kuvio = null;
            if (pintaId != null && rakennus.Pinnat != null && rakennus.Pinnat.TryGetValue(pintaId, out var pinta))
            {
                if (string.IsNullOrEmpty(pinta.Vari) || !ColorUtility.TryParseHtmlString(pinta.Vari, out vari)) vari = OletusVari;
                hehku = pinta.Hehku;
                kuvio = pinta.Kuvio; // ei koskaan null DioraamaData.Pinta:ssa, mutta pinta itse voi puuttua ylhäältä
            }
            m = new Material(NykyinenVarjostin()) { name = "Dioraama/" + avain };
            // sRGB-hex → lineaarinen (varjostin ei tee tätä materiaaliväreille, ks. DioraamaMaalattu.shader-kommentti).
            m.SetColor(IdVari, vari); // SetColor muuntaa sRGB:n lineaariseksi itse (lineaarinen väriavaruus)
            Color lampo = hehku > 0 ? Color.Lerp(OletusLampo, new Color(1f, 0.35f, 0.08f), Mathf.Clamp01((float)hehku)) : OletusLampo;
            m.SetColor(IdLampo, lampo);
            // era 2b (DioraamaValaistu.shader): _Tila alkaa A:sta (0) -- AsetaPohjakuvaMateriaaliin vaihtaa B:hen (1)
            // kun Codexin pohjakuva latautuu tälle pinnalle. Kuvion tyyppi/parametrit DioraamaKuvio()-kutsulle;
            // DioraamaMaalattu ei käytä näitä (harmiton, ks. Valaistus-ominaisuuden kommentti).
            m.SetFloat(IdTila, 0f);
            m.SetFloat(IdKuvioTyyppi, KuvioTyyppinumero.TryGetValue(kuvio?.Tyyppi ?? "tasainen", out var tyyppiNro) ? tyyppiNro : 0f);
            m.SetVector(IdKuvioParametrit, new Vector4((float)(kuvio?.KokoU ?? 0), (float)(kuvio?.KokoV ?? 0),
                (float)(kuvio?.Sauma ?? 0), (float)(kuvio?.Vaihtelu ?? 0)));
            materiaalit[avain] = m;
            // Pohjakuva voi olla ladattu jo ennen tätä tilaa (toinen tila käytti samaa pintaa aiemmin): aseta heti.
            if (odottavatPohjakuvat.TryGetValue(avain, out var kuva)) AsetaPohjakuvaMateriaaliin(m, avain, kuva, rakennus);
            return m;
        }

        public void Tyhjenna()
        {
            foreach (var go in tilat.Values)
            {
                if (go == null) continue;
                var mf = go.GetComponent<MeshFilter>();
                if (mf != null && mf.sharedMesh != null) UnityEngine.Object.Destroy(mf.sharedMesh);
                UnityEngine.Object.Destroy(go);
            }
            tilat.Clear();
            foreach (var m in materiaalit.Values) if (m != null) UnityEngine.Object.Destroy(m);
            materiaalit.Clear(); kuvalliset.Clear();
            foreach (var m in leivotut.Values) if (m != null) UnityEngine.Object.Destroy(m);
            leivotut.Clear(); tyhjat.Clear();
            foreach (var m in leivotutLiput.Values) if (m != null) UnityEngine.Object.Destroy(m);
            leivotutLiput.Clear();
            foreach (var k in valoKloonit.Values) if (k.Klooni != null) UnityEngine.Object.Destroy(k.Klooni);
            valoKloonit.Clear();
            odottavatValoAtlakset.Clear(); // tekstuurit omistaa DioraamaSovitin (ladatutValoAtlakset)
            odottavatPohjakuvat.Clear();
            viimeisinRakennus = null;
            Kolmiot = 0; Karjet = 0; Renderereita = 0;
        }
    }
}
