using System.Collections;
using System.Collections.Generic;
using CesiumForUnity;
using TMPro;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Sisältöpaketin kaupungit pisteinä ja nimiöinä pallolla.
    ///
    /// Jokainen merkki kääntyy kameraan päin, ja sen koko pidetään vakiona
    /// näytön pikseleissä. Pallon takana olevat merkit piilotetaan. Nimiöt
    /// harvennetaan joka kehys: tärkeysjärjestyksessä (aloituskaupunki,
    /// lentokenttä, muut) nimiö näytetään vain, jos sen suorakulmio ei osu
    /// jo näytettyyn nimiöön. Kaukaa näkyvät vain tärkeimmät, ja lähempänä
    /// tilaa riittää useammille.
    /// </summary>
    public class KaupunkiMerkit : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;
        public Camera kamera;
        public PalloKierto kierto;
        public NimiKortti kortti;
        public Reitit reitit;

        /// <summary>KarttaKerrokset: "kaupungit" (pisteet ja nimiöt) ja "nimiot".</summary>
        public bool merkitNakyvat = true, nimiotNakyvat = true;

        /// <summary>
        /// Suodatin linsseille (Linssisepän radio: vain kanavakaupungit): null = kaikki näkyvät,
        /// muuten vain luettelon kaupungit. RAJAPINTA luku 2, NaytaKaupungit.
        /// </summary>
        public void NaytaVain(ICollection<string> kaupungit)
        {
            suodatin = kaupungit == null ? null : new HashSet<string>(kaupungit);
        }
        HashSet<string> suodatin;

        /// <summary>Kaupungin maa (ISO3) tai null.</summary>
        public string KaupunginMaa(string id)
        {
            var m = merkit.Find(x => x.kaupunki.id == id);
            return m?.kaupunki.maa;
        }

        /// <summary>Lähimmän kaupungin id annetusta pisteestä (enintään maxAste asteen päässä), muuten null.</summary>
        public string LahinId(double lat, double lon, double maxAste = 0.5)
        {
            string id = null;
            double paras = maxAste * maxAste;
            foreach (var m in merkit)
            {
                double dl = m.kaupunki.lat - lat, dp = (m.kaupunki.lon - lon) * math.cos(math.radians(lat));
                double d = dl * dl + dp * dp;
                if (d <= paras) { paras = d; id = m.kaupunki.id; }
            }
            return id;
        }

        /// <summary>Yksittäisen kaupungin pisteen korostusväri (null = pois). RAJAPINTA luku 2, Korosta.</summary>
        public void Korosta(string id, Color? vari)
        {
            var m = merkit.Find(x => x.kaupunki.id == id);
            if (m == null) return;
            var r = m.pisteT.GetComponent<MeshRenderer>();
            if (vari.HasValue)
            {
                korostusLohko ??= new MaterialPropertyBlock();
                korostusLohko.SetColor("_BaseColor", vari.Value);
                r.SetPropertyBlock(korostusLohko);
                m.pisteT.localScale = new Vector3(m.pisteKoko * 1.5f, m.pisteKoko * 1.5f, 1);
            }
            else
            {
                r.SetPropertyBlock(null);
                m.pisteT.localScale = new Vector3(m.pisteKoko, m.pisteKoko, 1);
            }
        }
        MaterialPropertyBlock korostusLohko;

        [Header("Aloitusvalinnan huomiorengas (web .pallolauta-huomio)")]
        [Tooltip("Matkakirja/Rengas (Rakennus.cs); väri #eab84e (web --kulta).")]
        public Material rengasMateriaali;
        [Tooltip("Renkaan säde pisteinä: KOHDEMERKIN_HUOMIO_PX 54 / 2. Napautus renkaan sisällä osuu kaupunkiin.")]
        public float rengasSade = 27f;
        [Tooltip("Viivan paksuus pisteinä (web stroke-width 2,6, non-scaling-stroke).")]
        public float rengasPaksuus = 2.6f;
        [Tooltip("Valitun kaupungin rengas (web .target-ring.pick.picked: #e8b23c, stroke-width 3).")]
        public Color rengasValittuVari = new Color32(0xe8, 0xb2, 0x3c, 0xff);
        public float rengasValittuPaksuus = 3f;

        /// <summary>
        /// ALOITUSVALINNAN HUOMIORENKAAT (Natiivi-UI:n lähtövalinta; web .pallolauta-huomio, js/pallolauta/merkit.js):
        /// sykkivä kultarengas (säde 27 pt, viiva 2,6 pt, syke 2,6 s: säde ×1,16 ja peitto 0,92 → 0,42) annettujen
        /// kaupunkien ympärille; <paramref name="valittu"/> (tai null) piirretään valitun värillä #e8b23c ja 3 pt:n
        /// viivalla. idt null tai tyhjä = kaikki renkaat pois. Rengas on kaupunkimerkin osa: se näkyy vain, kun
        /// merkki näkyy (NaytaVain-suodatin, pallon etupuoli, ei aloitusporttia PalloKierto.PorttiSumea), ja
        /// sen koko on vakio näytön pisteinä (Pistekerroin). Napautus renkaan sisällä osuu kaupunkiin
        /// (KaupunkiNapautettu). Kutsun voi tehdä ennen kuin merkit on rakennettu; renkaat tulevat valmistuessa.
        /// <paramref name="vari"/> korvaa kaikkien renkaiden värin (lennon lähtö ja kohde punaisina, omistaja 24.9.).
        /// </summary>
        public void Renkaat(IEnumerable<string> idt, string valittu = null, Color? vari = null)
        {
            rengasVari = vari;
            rengasIdt.Clear();
            if (idt != null)
                foreach (var id in idt)
                    if (!string.IsNullOrEmpty(id)) rengasIdt.Add(id);
            rengasValittu = valittu;
            PaivitaRenkaat();
        }

        readonly HashSet<string> rengasIdt = new HashSet<string>();
        string rengasValittu;
        Color? rengasVari;
        MaterialPropertyBlock rengasLohko;
        bool rengasVaroitettu;
        /// <summary>Neliön sivu pisteinä: suurin säde (1,16 × säde) + puolikas viiva + reunan pehmennys.</summary>
        float RengasNelio => 2f * (rengasSade * 1.16f + Mathf.Max(rengasPaksuus, rengasValittuPaksuus) * 0.5f + 2f);

        void PaivitaRenkaat()
        {
            if (rengasMateriaali == null)
            {
                if (rengasIdt.Count > 0 && !rengasVaroitettu)
                {
                    rengasVaroitettu = true;
                    Debug.LogWarning("MATKAKIRJA kaupungit: rengasMateriaali puuttuu (kohtaus rakennettava uudelleen, Rakennus.LuoPallo)");
                }
                return;
            }
            rengasLohko ??= new MaterialPropertyBlock();
            float sivu = RengasNelio;
            Color perus = rengasMateriaali.GetColor("_BaseColor");
            foreach (var m in merkit)
            {
                bool paalla = rengasIdt.Contains(m.kaupunki.id);
                if (paalla && m.rengas == null) m.rengas = TeeRengas(m);
                if (m.rengas == null) continue;
                if (m.rengas.gameObject.activeSelf != paalla) m.rengas.gameObject.SetActive(paalla);
                if (!paalla) continue;
                bool valittu = m.kaupunki.id == rengasValittu;
                m.rengas.localScale = new Vector3(sivu, sivu, 1);
                rengasLohko.Clear();
                rengasLohko.SetColor("_BaseColor", rengasVari ?? (valittu ? rengasValittuVari : perus));
                rengasLohko.SetFloat("_Paksuus", valittu ? rengasValittuPaksuus : rengasPaksuus);
                rengasLohko.SetFloat("_Sade", rengasSade);
                rengasLohko.SetFloat("_Koko", sivu);
                m.rengas.GetComponent<MeshRenderer>().SetPropertyBlock(rengasLohko);
            }
        }

        Transform TeeRengas(Merkki m)
        {
            var t = new GameObject("Rengas").transform;
            t.SetParent(m.juuri, false);
            t.gameObject.AddComponent<MeshFilter>().sharedMesh = nelio;
            var r = t.gameObject.AddComponent<MeshRenderer>();
            r.sharedMaterial = rengasMateriaali;
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            return t;
        }
        [Tooltip("Kaupunkiin saapumisen näkymä: kapeamman suunnan kaari asteina " +
                 "(verkkopelin PALLO_SUKELLUSLEVEYS 620 laudan yksikköä = 18,6°).")]
        public double saapumisKaari = 18.6;
        [Tooltip("Verkkopelin PALLOKAMERAN_AJO_MS.")]
        public float saapumisKesto = 1.4f;
        [Tooltip("Napautuksen osuma-alue pisteen ympärillä, näytön pisteinä.")]
        public float osumaSade = 22f;
        [Tooltip("Montako merkkiä rakennetaan kehystä kohden (käynnistysnykäyksen välttämiseksi).")]
        public int rakennusKehys = 24;
        public Material pisteMateriaali;
        public TMP_FontAsset fontti;
        public Color musteenVari = new Color(0.20f, 0.15f, 0.10f);

        [Header("Koot näytön pisteinä (iOS point, 1/163 tuumaa)")]
        public float piste = 9f;
        public float tarkeaPiste = 13f;
        public float kirjain = 13f;
        public float tarkeaKirjain = 15f;
        public float valistys = 3f;

        [Tooltip("Merkin korkeus pinnan (maasto tai ellipsoidi) yläpuolella, metreinä.")]
        public double nosto = 5000.0;
        [Tooltip("Lue kaupunkien pintakorkeus maastosta (SampleHeightMostDetailed). Pois oletuksena: " +
                 "iPadilla haku latasi tarkimmat laatat 266 kaupungille 47 s (23.9.). Korkeus tulee " +
                 "sisältöpakettiin (kaupungit.korkeus), ja 5 km:n nosto riittää siihen asti.")]
        public bool maastoKorkeudet = false;
        /// <summary>Pallo, jonka maastosta merkkien pintakorkeus luetaan (tyhjä = haetaan kohtauksesta).</summary>
        public Cesium3DTileset pallo;

        class Merkki
        {
            public Sisalto.Kaupunki kaupunki;
            public Transform juuri;
            public Transform pisteT;
            public Transform rengas; // aloitusvalinnan huomiorengas (Renkaat), luodaan tarvittaessa
            public TextMeshPro nimio;
            public Vector3 normaali;
            public Vector3 pinta; // paikka georeferenssin koordinaateissa
            public int tarkeys;
            public Vector2 koko; // nimiön koko pisteinä
            public float pisteKoko;
        }

        /// <summary>Osuus etäisyydestä, jonka verran merkki tuodaan pinnan eteen.</summary>
        const float Etuna = 0.3f;

        readonly List<Merkki> merkit = new List<Merkki>();
        readonly List<Rect> varatut = new List<Rect>();
        Mesh nelio;

        public int Naytetty { get; private set; }

        void Start()
        {
            if (kamera == null) kamera = Camera.main;
            nelio = Nelio();
            if (kierto != null) kierto.Napautettu += Napautus;
            StartCoroutine(Sisalto.Hae<Sisalto.Kaupunki>("kaupungit", k => StartCoroutine(Rakenna(k))));
            StartCoroutine(SeuraaMaastoa());
        }

        /// <summary>
        /// Nimiöt pinnalle: kun pallon lähde on maasto (Komennot "maasto paalle"), merkkien
        /// pintakorkeus luetaan maastosta kerran (Cesium SampleHeightMostDetailed, kaikki
        /// kaupungit yhdellä pyynnöllä); ellipsoidilla korkeus on 0. Merkki on aina
        /// <see cref="nosto"/> metriä pinnan yläpuolella.
        /// </summary>
        IEnumerator SeuraaMaastoa()
        {
            CesiumDataSource? edellinen = null;
            int kaupunkeja = -1;
            var odota = new WaitForSeconds(0.5f);
            while (true)
            {
                yield return odota;
                if (pallo == null) pallo = FindAnyObjectByType<Cesium3DTileset>();
                if (pallo == null || merkit.Count == 0) continue;
                if (pallo.tilesetSource == edellinen && merkit.Count == kaupunkeja) continue;
                edellinen = pallo.tilesetSource;
                kaupunkeja = merkit.Count;
                var kohteet = merkit.ToArray();
                var korkeudet = new double[kohteet.Length];
                for (int i = 0; i < kohteet.Length; i++) korkeudet[i] = kohteet[i].kaupunki.korkeus;
                if (edellinen == CesiumDataSource.FromUrl && maastoKorkeudet)
                {
                    var paikat = new double3[kohteet.Length];
                    for (int i = 0; i < kohteet.Length; i++)
                        paikat[i] = new double3(kohteet[i].kaupunki.lon, kohteet[i].kaupunki.lat, 0);
                    float alku = Time.realtimeSinceStartup;
                    var tehtava = pallo.SampleHeightMostDetailed(paikat);
                    while (!tehtava.IsCompleted) yield return null;
                    if (pallo.tilesetSource != edellinen) continue; // vaihtui kesken: uusi kierros
                    if (tehtava.IsFaulted || tehtava.Result == null)
                    {
                        Debug.LogWarning("MATKAKIRJA kaupungit: maaston korkeudet epäonnistuivat: " + tehtava.Exception?.GetBaseException().Message);
                        continue;
                    }
                    var tulos = tehtava.Result;
                    int onnistui = 0;
                    for (int i = 0; i < kohteet.Length; i++)
                        if (tulos.sampleSuccess[i]) { korkeudet[i] = tulos.longitudeLatitudeHeightPositions[i].z; onnistui++; }
                    Debug.Log($"MATKAKIRJA kaupungit: maastokorkeus {onnistui}/{kohteet.Length} kaupungille, " +
                              $"{(Time.realtimeSinceStartup - alku) * 1000f:0} ms");
                }
                AsetaKorkeudet(kohteet, korkeudet);
            }
        }

        void AsetaKorkeudet(Merkki[] kohteet, double[] korkeudet)
        {
            for (int i = 0; i < kohteet.Length; i++)
            {
                var k = kohteet[i].kaupunki;
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                    new double3(k.lon, k.lat, korkeudet[i] + nosto));
                kohteet[i].pinta = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            }
        }

        /// <summary>Tärkeys 0–2 merkin tyyliä varten: paketin 1.2-kenttä tai vanha päättely.</summary>
        static int Tarkeys(Sisalto.Kaupunki k, bool paketinTarkeys) =>
            paketinTarkeys ? (k.tarkeys >= 3 ? 2 : k.tarkeys == 2 ? 1 : 0)
                           : (k.aloitus ? 2 : k.lentokentta ? 1 : 0);

        /// <summary>Tarkempi järjestysluku harvennukseen (paketin 0–3 tai vanha 0–2).</summary>
        static int Jarjestys(Sisalto.Kaupunki k, bool paketinTarkeys) =>
            paketinTarkeys ? k.tarkeys : (k.aloitus ? 2 : k.lentokentta ? 1 : 0);

        IEnumerator Rakenna(Sisalto.Kaupunki[] kaupungit)
        {
            if (kaupungit == null) yield break;
            bool paketinTarkeys = System.Array.Exists(kaupungit, k => k.tarkeys > 0);
            var valmiit = new List<Merkki>();
            int kehyksessa = 0;
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            // Nimiöt piirretään pisteiden (Transparent+1) jälkeen, jotta piste ei peitä tekstiä.
            var nimioMateriaali = new Material(fontti.material) { renderQueue = 3005 };
            foreach (var k in kaupungit)
            {
                if (++kehyksessa > rakennusKehys) { kehyksessa = 0; yield return null; }
                int tarkeys = Tarkeys(k, paketinTarkeys);
                // Paketin korkeus (skeema 1.10; puuttuva = 0) + nosto. Maaston SampleHeight korvaa sen, jos päällä.
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                    new double3(k.lon, k.lat, k.korkeus + nosto));
                double3 u = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);

                var juuri = new GameObject("Kaupunki " + k.id).transform;
                juuri.SetParent(georeferenssi.transform, false);
                juuri.localPosition = (float3)u;

                var p = new GameObject("Piste").transform;
                p.SetParent(juuri, false);
                p.gameObject.AddComponent<MeshFilter>().sharedMesh = nelio;
                p.gameObject.AddComponent<MeshRenderer>().sharedMaterial = pisteMateriaali;
                float pk = tarkeys > 0 ? tarkeaPiste : piste;
                p.localScale = new Vector3(pk, pk, 1);

                var n = new GameObject("Nimiö").AddComponent<TextMeshPro>();
                n.transform.SetParent(juuri, false);
                n.font = fontti;
                n.fontSharedMaterial = nimioMateriaali;
                n.text = k.nimi;
                n.fontSize = tarkeys > 0 ? tarkeaKirjain : kirjain;
                n.fontStyle = tarkeys == 2 ? FontStyles.Bold : FontStyles.Normal;
                n.color = musteenVari;
                n.alignment = TextAlignmentOptions.MidlineLeft;
                n.textWrappingMode = TextWrappingModes.NoWrap;
                n.outlineWidth = 0.2f;
                n.outlineColor = new Color32(250, 243, 225, 220);
                var rt = n.rectTransform;
                rt.pivot = new Vector2(0, 0.5f);
                rt.sizeDelta = new Vector2(400, 40);
                // TMP:n 3D-tekstin fonttikoko 10 = 1 yksikkö; juuren mittakaava on 1 yksikkö/pikseli.
                n.transform.localScale = Vector3.one * 10f;
                n.transform.localPosition = new Vector3(pk * 0.5f + valistys, 0, 0);
                n.ForceMeshUpdate();
                var koko = n.GetRenderedValues(false) * 10f;

                juuri.gameObject.SetActive(false);
                valmiit.Add(new Merkki
                {
                    kaupunki = k, juuri = juuri, pisteT = p, nimio = n, tarkeys = Jarjestys(k, paketinTarkeys),
                    normaali = (float3)math.normalize(u - keskus),
                    pinta = (float3)u,
                    pisteKoko = pk,
                    koko = new Vector2(koko.x + pk * 0.5f + valistys, math.max(koko.y, pk)),
                });
            }
            // Tärkeimmät ensin; saman tärkeyden sisällä pidempi nimi ei saa etuoikeutta.
            valmiit.Sort((a, b) => b.tarkeys != a.tarkeys ? b.tarkeys - a.tarkeys : a.nimio.text.Length - b.nimio.text.Length);
            merkit.AddRange(valmiit);
            PaivitaRenkaat();
            Debug.Log($"MATKAKIRJA kaupungit: {merkit.Count} merkkiä, tärkeys {(paketinTarkeys ? "paketista" : "päätelty")}");
        }

        /// <summary>Napautus: lähin näkyvä merkki osuma-alueen sisällä (tai nimiö), muuten kortti piiloon.</summary>
        void Napautus(Vector2 ruutu)
        {
            var paras = Osuma(ruutu);
            if (paras == null) { kortti?.Piilota(); return; }
            ValitseKaupunki(paras.kaupunki);
        }

        /// <summary>Osuuko napautus näkyvään kaupunkimerkkiin (AiheValot: kaupunki voittaa valon).</summary>
        public bool OsuuKaupunkiin(Vector2 ruutu) => Osuma(ruutu) != null;

        Merkki Osuma(Vector2 ruutu)
        {
            float kerroin = PalloKierto.Pistekerroin;
            Merkki paras = null;
            float parasEtaisyys = float.MaxValue;
            foreach (var m in merkit)
            {
                if (!m.juuri.gameObject.activeSelf) continue; // suodatetut ja takapuolen merkit ovat pois
                Vector3 p = kamera.WorldToScreenPoint(m.juuri.position);
                float d = Vector2.Distance(ruutu, p);
                // Huomiorenkaan sisällä napautus osuu (säde 27 pt > osumaSade 22 pt).
                float raja = m.rengas != null && m.rengas.gameObject.activeSelf ? Mathf.Max(osumaSade, rengasSade) * kerroin : osumaSade * kerroin;
                // Näkyvän nimiön päällä napautus osuu myös.
                if (m.nimio.enabled)
                {
                    var koko = m.koko * kerroin;
                    if (ruutu.x >= p.x && ruutu.x <= p.x + koko.x && Mathf.Abs(ruutu.y - p.y) <= koko.y * 0.5f)
                        d = Mathf.Min(d, 1f);
                }
                if (d < raja && d < parasEtaisyys) { parasEtaisyys = d; paras = m; }
            }
            return paras;
        }

        string valittu;

        /// <summary>
        /// Lento kaupunkiin ja nimikortti saapuessa (myös ohjelmallisesti). Jos edellisestä
        /// valitusta kaupungista on reitti, se korostetaan lennon ajaksi; saavuttaessa
        /// näytetään uuden kaupungin naapurireitit.
        /// </summary>
        public void ValitseKaupunki(Sisalto.Kaupunki k)
        {
            kortti?.Piilota();
            kierto.IlmoitaKaupunki(k.id);
            if (reitit != null)
            {
                reitit.Tyhjenna();
                if (valittu != null && valittu != k.id) reitit.Korosta(valittu, k.id);
            }
            valittu = k.id;
            kierto.Aja(k.lat, k.lon, kierto.KorkeusKaarelle(saapumisKaari), saapumisKesto, () =>
            {
                kortti?.Nayta(k);
                if (reitit != null) { reitit.Tyhjenna(); reitit.NaytaNaapurit(k.id); }
            });
        }

        public bool ValitseKaupunki(string id)
        {
            var m = merkit.Find(x => x.kaupunki.id == id);
            if (m == null) return false;
            ValitseKaupunki(m.kaupunki);
            return true;
        }

        void LateUpdate()
        {
            if (merkit.Count == 0 || kamera == null) return;
            var kt = kamera.transform;
            var gt = georeferenssi.transform;
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            // Retina-näytöllä yksi piste on 2–3 pikseliä; mitoitus tehdään pisteinä.
            float kerroin = PalloKierto.Pistekerroin;
            float pikseleita = Screen.height / kerroin;
            varatut.Clear();
            int naytetty = 0;

            foreach (var m in merkit)
            {
                // Korkeuskerroin nostaa maastoa: merkki nousee saman verran (paketin pintakorkeudesta).
                Vector3 paikka = gt.TransformPoint(m.pinta + m.normaali * KorkeusKerroin.Lisays(m.kaupunki.korkeus));
                Vector3 kohti = kt.position - paikka;
                float etaisyys = kohti.magnitude;
                Vector3 normaali = gt.TransformDirection(m.normaali);
                // Aloitusportissa (PalloKierto.PorttiSumea) ei merkkejä eikä nimiöitä, kuten webin etusivupallossa.
                bool edessa = merkitNakyvat && !PalloKierto.PorttiSumea && (suodatin == null || suodatin.Contains(m.kaupunki.id))
                    && Vector3.Dot(normaali, kohti / etaisyys) > 0.12f;
                if (m.juuri.gameObject.activeSelf != edessa) m.juuri.gameObject.SetActive(edessa);
                if (!edessa) continue;

                // Merkki siirretään näkösädettä pitkin kameraa kohti: ruudulla se pysyy
                // samassa kohdassa, mutta kaareva pinta ei enää leikkaa sen neliötä.
                float lahella = etaisyys * (1f - Etuna);
                Vector3 edusta = kt.position - kohti / etaisyys * lahella;
                // Yksi yksikkö juuren sisällä = yksi näytön piste tällä etäisyydellä.
                float mk = 2f * lahella * tanPuoli / pikseleita;
                m.juuri.SetPositionAndRotation(edusta, kt.rotation);
                m.juuri.localScale = Vector3.one * mk;

                Vector3 ruutu = kamera.WorldToScreenPoint(paikka);
                var koko = m.koko * kerroin;
                var suorakulmio = new Rect(ruutu.x - 4 * kerroin, ruutu.y - koko.y * 0.5f - 2 * kerroin,
                    koko.x + 8 * kerroin, koko.y + 4 * kerroin);
                bool mahtuu = nimiotNakyvat;
                foreach (var v in varatut)
                    if (v.Overlaps(suorakulmio)) { mahtuu = false; break; }
                if (mahtuu)
                {
                    // Varataan nimiö ja oma piste: myöhempi nimiö ei saa peittää kumpaakaan.
                    float pp = m.pisteKoko * kerroin;
                    varatut.Add(suorakulmio);
                    varatut.Add(new Rect(ruutu.x - pp * 0.5f, ruutu.y - pp * 0.5f, pp, pp));
                    naytetty++;
                }
                if (m.nimio.enabled != mahtuu) m.nimio.enabled = mahtuu;
            }
            Naytetty = naytetty;
        }

        static Mesh Nelio()
        {
            var m = new Mesh { name = "Piste" };
            m.vertices = new[] { new Vector3(-0.5f, -0.5f), new Vector3(0.5f, -0.5f), new Vector3(-0.5f, 0.5f), new Vector3(0.5f, 0.5f) };
            m.uv = new[] { new Vector2(0, 0), new Vector2(1, 0), new Vector2(0, 1), new Vector2(1, 1) };
            m.triangles = new[] { 0, 2, 1, 1, 2, 3 };
            m.RecalculateBounds();
            return m;
        }
    }
}
