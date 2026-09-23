// ISOISÄN LINSSIN 1873 3D-KERROS (web js/linssit/isoisa-1873.js pallolle:
// pallovektorit laji historia + linssit.merkit CSS2D-nimet). Toteuttaa IIsoisaNakyma:
//
//   rajat — yksi viivamesh per luokka Natiivisepän Viiva-materiaalin kopiolla
//           (KarttaKerrokset.reitit.maa, paksuus ruutupisteinä kuten VesistotKerros):
//           luokka 1 valtionraja yhtenäisenä musteena #4a3320, luokka 2 vasalli
//           katkoviivana #8a6a48 (web: ohuempi katkoviiva);
//   nimet — TextMeshPro kuten vesistöjen nimet: joka kehys kameraan päin ja
//           ruutupisteiden kokoon, takapuolen nimet piiloon normaalilla. Näkyvyys
//           kokoluokittain kameran korkeudesta ja ruututörmäys arvojärjestyksessä
//           (Isoisa1873Nimet, webin säännöt) jarrutettuna 150 ms:iin kuten webissä:
//           nimet vaihtuvat vasta, kun kamera on hetken levossa.
//
// css .pallolauta-isoisa-nimi: harvennetut kapiteelit (letter-spacing 0,14–0,34 em),
// muste rgba(58, 40, 24, 0.92) paperihehkulla; vasalli kursiivilla, alusmaa vaaleampi,
// maakunta 10 px. Fontti on toistaiseksi kaupunkien nimiöiden fontti (atlasantiikva
// myöhemmin Natiivi-UI:n fonttien mukana).
//
// Jonot: rajat 3001 (vesistöjen penkereiden taso), nimet 3005 kuten kaupunkien nimiöt.
using System.Collections.Generic;
using System.Linq;
using CesiumForUnity;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Isoisa;
using Matkakirja.Linssit.Vesistot;
using TMPro;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class IsoisaKerros : MonoBehaviour, IIsoisaNakyma
    {
        const float Etuna = 0.02f;
        const int JonoRajat = 3001, JonoNimet = 3005;
        /// <summary>Rajojen nosto: pienin viivanosto (5 km), jotta maastolaatat eivät peitä viivaa.</summary>
        static readonly double Korkeus = VesistotPallolle.Metreina(0);
        const double NimenKorkeus = 0.004 * 6_371_000;

        sealed class Nimi
        {
            public Nimi1873 d;
            public Transform juuri;
            public TextMeshPro t;
            public Vector3 pinta, normaali;
            public bool sallittu;   // näkyvyys + törmäys (jarrutettu)
        }

        CesiumGeoreference georeferenssi;
        Camera kamera;
        TMP_FontAsset fontti;
        Material viivaPohja;
        readonly List<Material> viivat = new List<Material>();
        readonly List<Material> muut = new List<Material>();
        readonly List<Mesh> meshit = new List<Mesh>();
        readonly List<Nimi> nimet = new List<Nimi>();
        float seuraavaLuokitus;
        Vector3 viimeKamera;
        Quaternion viimeKierto;

        public static IsoisaKerros Luo(PalloKierto kierto)
        {
            var g = kierto.georeferenssi;
            var go = new GameObject("IsoisaKerros");
            go.transform.SetParent(g.transform, false);
            var k = go.AddComponent<IsoisaKerros>();
            k.georeferenssi = g;
            k.kamera = kierto.GetComponent<Camera>();
            var kartta = KarttaKerrokset.Instanssi;
            k.fontti = kartta != null && kartta.merkit != null ? kartta.merkit.fontti : null;
            k.viivaPohja = kartta != null && kartta.reitit != null ? kartta.reitit.maa : null;
            if (k.viivaPohja == null) Debug.LogWarning("MATKAKIRJA isoisä 1873: Viiva-materiaali puuttuu (KarttaKerrokset.reitit.maa), rajat jäävät pois");
            if (k.fontti == null) Debug.LogWarning("MATKAKIRJA isoisä 1873: fontti puuttuu (KarttaKerrokset.merkit.fontti), nimet jäävät pois");
            return k;
        }

        // ── IIsoisaNakyma ────────────────────────────────────────────────

        public void Rajat(IReadOnlyList<Rajaviiva> lista)
        {
            // Luokka 1: yhtenäinen muste 1,4 pt; luokka 2: ohuempi katkoviiva (jakso 0,5°, puolet täynnä).
            Viivat("Rajat 1873", lista.Where(v => v.Luokka != 2).Select(v => v.Pisteet), "#4a3320", 1.4, Vector4.zero);
            Viivat("Vasallirajat 1873", lista.Where(v => v.Luokka == 2).Select(v => v.Pisteet), "#8a6a48", 1.0, new Vector4(0.5f, 0.55f, 0, 0));
        }

        public void Nimet(IReadOnlyList<Nimi1873> lista)
        {
            if (fontti == null || nimet.Count > 0) return;
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            var materiaali = new Material(fontti.material) { renderQueue = JonoNimet };
            muut.Add(materiaali);
            foreach (var d in lista)
            {
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(d.Lon, d.Lat, NimenKorkeus));
                double3 u = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
                var juuri = new GameObject("Nimi 1873 " + d.Teksti).transform;
                juuri.SetParent(transform, false);
                var t = new GameObject("Nimi").AddComponent<TextMeshPro>();
                t.transform.SetParent(juuri, false);
                t.font = fontti;
                t.fontSharedMaterial = materiaali;
                t.text = d.Teksti;
                (float koko, float harvennus) = d.Koko switch
                {
                    NimenKoko.Suuri => (15f, 34f),
                    NimenKoko.Keski => (13f, 26f),
                    NimenKoko.Pieni => (11f, 18f),
                    _ => (10f, 14f),
                };
                t.fontSize = koko;
                t.characterSpacing = harvennus;   // letter-spacing em/100
                t.color = d.Koko == NimenKoko.Maakunta ? new Color32(96, 72, 48, 217)
                    : d.Luokka == 3 ? new Color32(96, 74, 52, 204) : new Color32(58, 40, 24, 235);
                if (d.Luokka == 2) t.fontStyle = FontStyles.Italic;
                t.alignment = TextAlignmentOptions.Center;
                t.textWrappingMode = TextWrappingModes.NoWrap;
                t.outlineWidth = 0.2f;
                t.outlineColor = new Color32(247, 241, 226, 242);
                t.rectTransform.sizeDelta = new Vector2(600, 40);
                // TMP:n 3D-tekstin fonttikoko 10 = 1 yksikkö; juuren mittakaava on 1 yksikkö/piste.
                t.transform.localScale = Vector3.one * 10f;
                juuri.gameObject.SetActive(false);
                nimet.Add(new Nimi { d = d, juuri = juuri, t = t, pinta = (float3)u, normaali = (float3)math.normalize(u - keskus) });
            }
            seuraavaLuokitus = 0;
        }

        public void Pois() => Destroy(gameObject);

        /// <summary>Mittareille: näkyvien nimien määrä (web nakyvia).</summary>
        public int Nakyvia => nimet.Count(n => n.juuri.gameObject.activeSelf);

        // ── Rakennus (kuten VesistotKerros.Viivat) ───────────────────────

        Vector3 Unityyn(LatLon p, double korkeus)
        {
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(p.Lon, p.Lat, korkeus));
            return (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
        }

        void Viivat(string nimi, IEnumerable<IReadOnlyList<LatLon>> polut, string vari, double paksuus, Vector4 katko)
        {
            if (viivaPohja == null) return;
            var paikat = new List<Vector3>();
            var seuraavat = new List<Vector3>();
            var puolet = new List<Vector2>();
            var kolmiot = new List<int>();
            var u = new List<Vector3>();
            foreach (var polku in polut)
            {
                int n = polku.Count;
                if (n < 2) continue;
                u.Clear();
                for (int i = 0; i < n; i++) u.Add(Unityyn(polku[i], Korkeus));
                int pohja = paikat.Count;
                double matka = 0;
                for (int i = 0; i < n; i++)
                {
                    if (i > 0) matka += Kameramatikka.KulmaAsteina(polku[i - 1], polku[i]);
                    Vector3 seur = i < n - 1 ? u[i + 1] : u[i] + (u[i] - u[i - 1]);
                    for (int s = 0; s < 2; s++)
                    {
                        paikat.Add(u[i]);
                        seuraavat.Add(seur);
                        puolet.Add(new Vector2(s == 0 ? -1 : 1, (float)matka));
                    }
                }
                for (int i = 0; i < n - 1; i++)
                {
                    int a = pohja + i * 2;
                    kolmiot.Add(a); kolmiot.Add(a + 1); kolmiot.Add(a + 2);
                    kolmiot.Add(a + 1); kolmiot.Add(a + 3); kolmiot.Add(a + 2);
                }
            }
            if (kolmiot.Count == 0) return;
            var mesh = new Mesh { name = nimi, indexFormat = paikat.Count > 65535 ? IndexFormat.UInt32 : IndexFormat.UInt16 };
            meshit.Add(mesh);
            mesh.SetVertices(paikat);
            mesh.SetUVs(0, seuraavat);
            mesh.SetUVs(1, puolet);
            mesh.SetTriangles(kolmiot, 0);
            mesh.RecalculateBounds();
            var m = new Material(viivaPohja) { renderQueue = JonoRajat };
            var c = ColorUtility.TryParseHtmlString(vari, out var cc) ? cc : Color.magenta;
            m.SetColor("_BaseColor", new Color(c.r, c.g, c.b, 1f));
            m.SetFloat("_Paksuus", (float)paksuus);
            m.SetVector("_Katko", katko);
            viivat.Add(m);
            var go = new GameObject(nimi);
            go.transform.SetParent(transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterial = m;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
        }

        // ── Kehys ─────────────────────────────────────────────────────────

        void Update()
        {
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            foreach (var m in viivat) m.SetFloat("_Kerroin", kerroin);
        }

        void LateUpdate()
        {
            if (kamera == null || nimet.Count == 0) return;
            var kt = kamera.transform;
            var gt = georeferenssi.transform;
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            float pisteita = Screen.height / kerroin;

            // Jarru: kamera liikkuu → luokitus 150 ms levon jälkeen (web NAKYVYYDEN_JARRU_MS).
            if (kt.position != viimeKamera || kt.rotation != viimeKierto)
            {
                viimeKamera = kt.position;
                viimeKierto = kt.rotation;
                seuraavaLuokitus = Time.unscaledTime + (float)Isoisa1873Nimet.Jarru;
            }
            bool luokittele = seuraavaLuokitus >= 0 && Time.unscaledTime >= seuraavaLuokitus;

            foreach (var p in nimet)
            {
                Vector3 paikka = gt.TransformPoint(p.pinta);
                Vector3 kohti = kt.position - paikka;
                float etaisyys = kohti.magnitude;
                bool edessa = etaisyys > 0 && Vector3.Dot(gt.TransformDirection(p.normaali), kohti / etaisyys) > 0.05f;
                bool nakyy = edessa && p.sallittu;
                if (p.juuri.gameObject.activeSelf != nakyy) p.juuri.gameObject.SetActive(nakyy);
                if (!nakyy) continue;
                float lahella = etaisyys * (1f - Etuna);
                p.juuri.SetPositionAndRotation(kt.position - kohti / etaisyys * lahella, kt.rotation);
                p.juuri.localScale = Vector3.one * (2f * lahella * tanPuoli / pisteita);
            }
            if (luokittele)
            {
                seuraavaLuokitus = -1;
                Luokittele(kerroin);
            }
        }

        /// <summary>Näkyvyys korkeudesta ja törmäykset ruudulla (web paivita: 1. korkeusraja, 2. törmäys).</summary>
        void Luokittele(float kerroin)
        {
            var gt = georeferenssi.transform;
            double3 keskusU = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            Vector3 keskus = gt.TransformPoint((float3)keskusU);
            double korkeus = Vector3.Distance(kamera.transform.position, keskus) - Isoisa1873Nimet.Sade;
            var laatikot = new List<Nimilaatikko>();
            var kt = kamera.transform;
            foreach (var p in nimet)
            {
                p.sallittu = false;
                if (!Isoisa1873Nimet.Nakyy(p.d.Koko, korkeus)) continue;
                Vector3 paikka = gt.TransformPoint(p.pinta);
                Vector3 kohti = kt.position - paikka;
                float etaisyys = kohti.magnitude;
                if (!(etaisyys > 0) || Vector3.Dot(gt.TransformDirection(p.normaali), kohti / etaisyys) <= 0.05f) continue;
                Vector3 r = kamera.WorldToScreenPoint(paikka);
                if (r.z <= 0) continue;
                // Tekstin koko pisteinä (fonttikoko 10 = 1 yksikkö × 10) → pikselit.
                Vector2 koko = p.t.GetPreferredValues(p.d.Teksti) * 10f * kerroin;
                laatikot.Add(new Nimilaatikko(p.d.Avain, Isoisa1873Nimet.Arvo(p.d.Koko),
                    r.x - koko.x / 2, r.y - koko.y / 2, r.x + koko.x / 2, r.y + koko.y / 2));
                p.sallittu = true;
            }
            var piiloon = Isoisa1873Nimet.RatkaiseTormaykset(laatikot, Isoisa1873Nimet.RakoPx * kerroin);
            if (piiloon.Count > 0)
                foreach (var p in nimet) if (p.sallittu && piiloon.Contains(p.d.Avain)) p.sallittu = false;
        }

        void OnDestroy()
        {
            foreach (var m in meshit) if (m != null) Destroy(m);
            foreach (var m in viivat) if (m != null) Destroy(m);
            foreach (var m in muut) if (m != null) Destroy(m);
        }
    }
}
