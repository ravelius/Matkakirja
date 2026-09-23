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

        class Merkki
        {
            public Sisalto.Kaupunki kaupunki;
            public Transform juuri;
            public Transform pisteT;
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
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                    new double3(k.lon, k.lat, 5000.0));
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
            Debug.Log($"MATKAKIRJA kaupungit: {merkit.Count} merkkiä, tärkeys {(paketinTarkeys ? "paketista" : "päätelty")}");
        }

        /// <summary>Napautus: lähin näkyvä merkki osuma-alueen sisällä (tai nimiö), muuten kortti piiloon.</summary>
        void Napautus(Vector2 ruutu)
        {
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            Merkki paras = null;
            float parasEtaisyys = osumaSade * kerroin;
            foreach (var m in merkit)
            {
                if (!m.juuri.gameObject.activeSelf) continue;
                Vector3 p = kamera.WorldToScreenPoint(m.juuri.position);
                float d = Vector2.Distance(ruutu, p);
                // Näkyvän nimiön päällä napautus osuu myös.
                if (m.nimio.enabled)
                {
                    var koko = m.koko * kerroin;
                    if (ruutu.x >= p.x && ruutu.x <= p.x + koko.x && Mathf.Abs(ruutu.y - p.y) <= koko.y * 0.5f)
                        d = Mathf.Min(d, 1f);
                }
                if (d < parasEtaisyys) { parasEtaisyys = d; paras = m; }
            }
            if (paras == null) { kortti?.Piilota(); return; }
            ValitseKaupunki(paras.kaupunki);
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
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            float pikseleita = Screen.height / kerroin;
            varatut.Clear();
            int naytetty = 0;

            foreach (var m in merkit)
            {
                Vector3 paikka = gt.TransformPoint(m.pinta);
                Vector3 kohti = kt.position - paikka;
                float etaisyys = kohti.magnitude;
                Vector3 normaali = gt.TransformDirection(m.normaali);
                bool edessa = Vector3.Dot(normaali, kohti / etaisyys) > 0.12f;
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
                bool mahtuu = true;
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
