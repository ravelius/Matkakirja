using System;
using System.Collections.Generic;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// MAAMERKIT (omistajan kortti 24.9.2026): jokaisella kaupungilla yksi matalapolyinen 3D-tunnusrakennus
    /// (Lontoo: Big Ben + Tower Bridge, Ateena: Akropolis) kaupungin koordinaatissa maaston päällä.
    /// Mallit ovat omaa proseduraalista Blender-geometriaa (Maamerkit/Lahde~/maamerkit.py, CC0);
    /// uuden kaupungin lisääminen: Maamerkit/LUE.md.
    ///
    /// Mitoitus: malli on metreinä oikeassa mittakaavassa (origo jalassa, +Z pohjoinen, +Y ylös). Ruudulla
    /// se on vähintään <see cref="minPt"/> pistettä korkea, mutta kerroin on enintään <see cref="maxKerroin"/>;
    /// jos malli jäisi suurimmallakin kertoimella alle <see cref="piiloPt"/> pisteen, se painuu maahan
    /// (ei hyppää pois). Kerroin pehmennetään (log-asteikolla), ja näkyviin tulo ja poisto kasvattavat mallin
    /// maasta / painavat sen maahan <see cref="kasvuS"/> sekunnissa. Varjot pois.
    ///
    /// Rajapinta (Natiiviseppä kytkee Nappula.Lentoon): <see cref="Nayta"/>(kaupunki-idt) ja <see cref="Piilota"/>.
    /// </summary>
    public class Maamerkit : MonoBehaviour
    {
        /// <summary>Yksi maamerkki: sijainti ja mitat. Sama muoto sopii sisältöpakettiin (LUE.md: kokoelma "maamerkit").</summary>
        [Serializable]
        public class Rivi
        {
            [Tooltip("Mallin id = FBX:n ja tekstuurin nimi (lontoo → lontoo.fbx, Tekstuurit/lontoo_vari.png).")]
            public string id;
            [Tooltip("Kaupungin id sisältöpaketissa (Nayta-kutsun avain).")]
            public string kaupunki;
            public double lat, lon;
            [Tooltip("Maaston korkeus jalan kohdalla, metriä merenpinnasta (sama taso kuin pallon maasto).")]
            public double korkeusM;
            [Tooltip("Kierto pohjoisesta myötäpäivään, asteina.")]
            public float suunta;
            [Tooltip("Mallin korkeus jalasta huippuun metreinä (mitoitus ruudulle).")]
            public float korkeus;
        }

        /// <summary>Mallin prefab (FBX) ja materiaali (URP Lit atlaksella); Rakennus.LuoPallo täyttää.</summary>
        [Serializable]
        public class Malli
        {
            public string id;
            public GameObject prefab;
            public Material materiaali;
        }

        public CesiumGeoreference georeferenssi;
        public Camera kamera;
        public Malli[] mallit = new Malli[0];
        public List<Rivi> taulukko = Oletustaulukko();

        [Header("Koko ruudulla (iOS-pisteinä, PalloKierto.Pistekerroin)")]
        [Tooltip("Malli on ruudulla vähintään näin korkea, kunhan kerroin riittää.")]
        public float minPt = 40f;
        [Tooltip("Suurin liioittelukerroin todelliseen kokoon nähden.")]
        public float maxKerroin = 60f;
        [Tooltip("Suurimmallakin kertoimella tätä pienempi malli painetaan maahan.")]
        public float piiloPt = 6f;
        [Tooltip("Kasvu maasta / painuminen maahan, sekunteja.")]
        public float kasvuS = 0.6f;
        [Tooltip("Kertoimen pehmennyksen aikavakio, sekunteja (ei hyppimistä kameran hypätessä).")]
        public float pehmennysS = 0.25f;

        /// <summary>
        /// Oletustaulukko (pilotti). Sijainti = sisältöpaketin kaupunkipiste; korkeus = maaston korkeus jalan kohdalla.
        /// Mallien korkeudet: maamerkit.py:n loki ("VALMIS … korkeus").
        /// </summary>
        public static List<Rivi> Oletustaulukko() => new List<Rivi>
        {
            new Rivi { id = "lontoo", kaupunki = "lontoo", lat = 51.5051, lon = -0.115, korkeusM = 10, suunta = 0, korkeus = 97.2f },
            new Rivi { id = "ateena", kaupunki = "ateena", lat = 37.9699, lon = 23.741, korkeusM = 70, suunta = 0, korkeus = 101.7f },
        };

        class Esiintyma
        {
            public Rivi rivi;
            public Transform t;
            public Quaternion kierto;   // georeferenssin paikallisessa avaruudessa
            public Vector3 paikka;      // georeferenssin paikallisessa avaruudessa
            public Vector3 ylos;        // georeferenssin paikallisessa avaruudessa
            public bool haluttu;
            public float nakyvyys;      // 0..1 (kasvu)
            public float logKerroin = float.NaN;
        }

        readonly Dictionary<string, Esiintyma> esiintymat = new Dictionary<string, Esiintyma>();
        readonly HashSet<string> naytettavat = new HashSet<string>();
        bool varoitettu;

        /// <summary>Näyttää annettujen kaupunkien maamerkit (muut painuvat maahan). null tai tyhjä = kaikki pois.</summary>
        public void Nayta(IEnumerable<string> kaupunkiIdt)
        {
            naytettavat.Clear();
            if (kaupunkiIdt != null)
                foreach (var id in kaupunkiIdt)
                    if (!string.IsNullOrEmpty(id)) naytettavat.Add(id);
            foreach (var r in taulukko)
                if (r != null && naytettavat.Contains(r.kaupunki) && !esiintymat.ContainsKey(r.id)) Luo(r);
            foreach (var e in esiintymat.Values) e.haluttu = naytettavat.Contains(e.rivi.kaupunki);
        }

        /// <summary>Kaikki maamerkit painuvat maahan.</summary>
        public void Piilota() => Nayta(null);

        /// <summary>Onko kaupungille maamerkki taulukossa (ja malli).</summary>
        public bool OnMaamerkki(string kaupunkiId)
        {
            foreach (var r in taulukko)
                if (r != null && r.kaupunki == kaupunkiId && EtsiMalli(r.id) != null) return true;
            return false;
        }

        /// <summary>Korvaa taulukon (esim. sisältöpaketin kokoelmasta). Olemassa olevat esiintymät luodaan uudelleen.</summary>
        public void AsetaTaulukko(IEnumerable<Rivi> rivit)
        {
            foreach (var e in esiintymat.Values) if (e.t != null) Destroy(e.t.gameObject);
            esiintymat.Clear();
            taulukko = new List<Rivi>(rivit ?? Array.Empty<Rivi>());
            Nayta(new List<string>(naytettavat));
        }

        Malli EtsiMalli(string id)
        {
            if (mallit == null) return null;
            foreach (var m in mallit) if (m != null && m.id == id && m.prefab != null) return m;
            return null;
        }

        void Luo(Rivi r)
        {
            var malli = EtsiMalli(r.id);
            if (malli == null || georeferenssi == null)
            {
                if (!varoitettu)
                {
                    varoitettu = true;
                    Debug.LogWarning($"MATKAKIRJA maamerkit: mallia '{r.id}' tai georeferenssiä ei ole (Rakennus.LuoPallo)");
                }
                return;
            }
            var go = Instantiate(malli.prefab, georeferenssi.transform, false);
            go.name = "Maamerkki " + r.id;
            foreach (var mr in go.GetComponentsInChildren<Renderer>())
            {
                mr.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                mr.receiveShadows = false;
                if (malli.materiaali != null)
                {
                    var m = mr.sharedMaterials;
                    for (int i = 0; i < m.Length; i++) m[i] = malli.materiaali;
                    mr.sharedMaterials = m;
                }
            }
            // Paikallinen itä–pohjoinen–ylös-kehys ECEF:ssä → georeferenssin avaruuteen.
            double la = math.radians(r.lat), lo = math.radians(r.lon);
            double3 ylosE = new double3(math.cos(la) * math.cos(lo), math.cos(la) * math.sin(lo), math.sin(la));
            double3 pohjoinenE = new double3(-math.sin(la) * math.cos(lo), -math.sin(la) * math.sin(lo), math.cos(la));
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(r.lon, r.lat, r.korkeusM));
            var e = new Esiintyma
            {
                rivi = r,
                t = go.transform,
                paikka = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef),
                ylos = ((Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(ylosE)).normalized,
            };
            var pohjoinen = ((Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(pohjoinenE)).normalized;
            e.kierto = Quaternion.LookRotation(pohjoinen, e.ylos) * Quaternion.Euler(0f, r.suunta, 0f);
            go.transform.localPosition = e.paikka;
            go.transform.localRotation = e.kierto;
            go.transform.localScale = Vector3.zero;
            go.SetActive(false);
            esiintymat[r.id] = e;
        }

        void LateUpdate()
        {
            if (esiintymat.Count == 0) return;
            if (kamera == null) kamera = Camera.main;
            if (kamera == null || georeferenssi == null) return;
            var gt = georeferenssi.transform;
            var kp = kamera.transform.position;
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float kerroinPt = PalloKierto.Pistekerroin;
            float dt = Time.unscaledDeltaTime;
            float pehmennys = pehmennysS > 0 ? 1f - Mathf.Exp(-dt / pehmennysS) : 1f;
            float kasvu = kasvuS > 0 ? dt / kasvuS : 1f;

            foreach (var e in esiintymat.Values)
            {
                Vector3 p = gt.TransformPoint(e.paikka);
                Vector3 kohti = kp - p;
                float d = kohti.magnitude;
                Vector3 ylos = gt.TransformDirection(e.ylos);
                // Metriä pikseliä kohden mallin kohdalla; pikseleitä pistettä kohden = Pistekerroin.
                float mPerPt = 2f * d * tanPuoli / Mathf.Max(1, Screen.height) * kerroinPt;
                float korkeus = Mathf.Max(1f, e.rivi.korkeus);
                float k = Mathf.Clamp(minPt * mPerPt / korkeus, 1f, Mathf.Max(1f, maxKerroin));
                float ruudullaPt = korkeus * k / Mathf.Max(1e-6f, mPerPt);
                bool nakyy = e.haluttu && ruudullaPt >= piiloPt && Vector3.Dot(ylos, kohti / Mathf.Max(d, 1e-3f)) > -0.05f;

                e.nakyvyys = Mathf.MoveTowards(e.nakyvyys, nakyy ? 1f : 0f, kasvu);
                float lk = Mathf.Log(k);
                e.logKerroin = float.IsNaN(e.logKerroin) ? lk : Mathf.Lerp(e.logKerroin, lk, pehmennys);
                bool aktiivinen = e.nakyvyys > 0f;
                if (e.t.gameObject.activeSelf != aktiivinen) e.t.gameObject.SetActive(aktiivinen);
                if (!aktiivinen) { e.logKerroin = float.NaN; continue; }
                // Kasvu maasta: pysty ensin pehmeästi (easeOutCubic), leveys hieman perässä.
                float a = e.nakyvyys, pysty = 1f - Mathf.Pow(1f - a, 3f), vaaka = Mathf.Lerp(0.6f, 1f, pysty);
                float s = Mathf.Exp(e.logKerroin);
                e.t.localScale = new Vector3(s * vaaka, s * pysty, s * vaaka);
            }
        }
    }
}
