using System.Collections;
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Peli;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Reitit pallolla verkkopelin tapaan (js/pallolauta/reitit.js). Koko reittiverkko
    /// on jo laattojen sisällä, joten pallolle piirretään vain elävä kerros:
    /// valitun kaupungin naapurireitit (maa hento muste, meri sinertävä), sen
    /// lentokaaret (poltettu sinooperi) ja korostettu, valittu reitti.
    ///
    /// Maa- ja merireittien polku lasketaan samalla kaavalla kuin laattoihin
    /// poltettu viiva (ReittiGeometria), joten viiva osuu kartan reittiin.
    /// </summary>
    public class Reitit : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;
        public Material maa, meri, lento, korostus;
        [Tooltip("Viivan korkeus ellipsoidin yläpuolella, metreinä.")]
        public double viivanKorkeus = 5000.0;
        [Tooltip("Lentokaaren huippu pallon säteinä 180°:n matkalla (LENTOKAAREN_KORKEUS).")]
        public double kaarenKorkeus = 0.5;

        class Kaupunki { public string id; public double lat, lon; public double2 lauta; public bool lautaOn; }

        class Reitti
        {
            public string id, laji, tyyppi, a, b;
            public List<double2> via;
            public List<double3> pisteet; // (lat, lon, korkeus), laskettu tarvittaessa
        }

        readonly Dictionary<string, Kaupunki> kaupungit = new Dictionary<string, Kaupunki>();
        readonly List<Reitti> reitit = new List<Reitti>();
        readonly Dictionary<string, List<Reitti>> naapurit = new Dictionary<string, List<Reitti>>();
        readonly List<GameObject> naytetyt = new List<GameObject>();
        GameObject korostettu;

        public bool Valmis { get; private set; }

        IEnumerator Start()
        {
            string kt = null, rt = null;
            yield return Sisalto.HaeTeksti("kaupungit", t => kt = t);
            yield return Sisalto.HaeTeksti("reitit", t => rt = t);
            if (kt == null || rt == null) yield break;

            // Null-turvallisesti: yksi rikkinäinen alkio ei kaada koko luetteloa (MiniJson.Objekti heittää).
            var kaupunkiAlkiot = (MiniJson.Jasenna(kt) as Dictionary<string, object>)?.GetValueOrDefault("alkiot") as List<object>;
            var reittiAlkiot = (MiniJson.Jasenna(rt) as Dictionary<string, object>)?.GetValueOrDefault("alkiot") as List<object>;
            if (kaupunkiAlkiot == null || reittiAlkiot == null) { Debug.LogWarning("MATKAKIRJA reitit: kaupungit tai reitit ilman alkioita"); yield break; }
            foreach (var o in kaupunkiAlkiot)
            {
                if (!(o is Dictionary<string, object> k)) continue;
                var c = new Kaupunki
                {
                    id = MiniJson.Teksti(k, "id"),
                    lat = MiniJson.Luku(k, "lat") ?? 0,
                    lon = MiniJson.Luku(k, "lon") ?? 0,
                };
                // Laudan piste: päätason lauta {x, y} (1.26+, 2.0), vanhassa paketissa raaka data.x/y.
                // Reitin polku lasketaan siitä kuten verkkopelissä.
                var lauta = MiniJson.Kentta(k, "lauta") as Dictionary<string, object> ?? Paataso.Raaka(k);
                if (lauta != null && MiniJson.Luku(lauta, "x") is double x && MiniJson.Luku(lauta, "y") is double y)
                {
                    c.lauta = new double2(x, y);
                    c.lautaOn = true;
                }
                if (c.id != null) kaupungit[c.id] = c;
            }
            foreach (var o in reittiAlkiot)
            {
                if (!(o is Dictionary<string, object> r)) continue;
                // Päätaso ensin (laji "maa"/"sea"/"lento", via), raaka data vain vanhassa paketissa (Paataso).
                var d = Paataso.Raaka(r);
                var reitti = new Reitti
                {
                    id = MiniJson.Teksti(r, "id"),
                    laji = MiniJson.Teksti(r, "laji"),
                    a = MiniJson.Teksti(r, "a"),
                    b = MiniJson.Teksti(r, "b"),
                    tyyppi = MiniJson.Teksti(r, "laji") == "sea" ? "sea" : d != null ? MiniJson.Teksti(d, "type") : null,
                };
                if ((MiniJson.Kentta(r, "via") ?? (d != null ? MiniJson.Kentta(d, "via") : null)) is List<object> via && via.Count > 0)
                {
                    reitti.via = new List<double2>();
                    foreach (var v in via)
                    {
                        if (!(v is List<object> xy) || xy.Count < 2) continue;
                        reitti.via.Add(new double2(System.Convert.ToDouble(xy[0]), System.Convert.ToDouble(xy[1])));
                    }
                }
                if (reitti.a == null || reitti.b == null || !kaupungit.ContainsKey(reitti.a) || !kaupungit.ContainsKey(reitti.b)) continue;
                reitit.Add(reitti);
                Lisaa(reitti.a, reitti);
                Lisaa(reitti.b, reitti);
            }
            Valmis = true;
            Debug.Log($"MATKAKIRJA reitit: {reitit.Count} reittiä, {kaupungit.Count} kaupunkia");
        }

        void Lisaa(string kaupunki, Reitti r)
        {
            if (!naapurit.TryGetValue(kaupunki, out var l)) naapurit[kaupunki] = l = new List<Reitti>();
            l.Add(r);
        }

        /// <summary>Onko kaupunkien välillä reitti (kumpaan suuntaan tahansa)?</summary>
        public bool OnReitti(string a, string b) => Hae(a, b) != null;

        Reitti Hae(string a, string b)
        {
            if (!naapurit.TryGetValue(a, out var l)) return null;
            return l.Find(r => (r.a == a && r.b == b) || (r.a == b && r.b == a));
        }

        /// <summary>Näyttää kaupungin naapurireitit ja lentokaaret (vanhat pois).</summary>
        public void NaytaNaapurit(string kaupunki)
        {
            Tyhjenna(false);
            if (!naapurit.TryGetValue(kaupunki, out var l)) return;
            foreach (var r in l) naytetyt.Add(Piirra(r, Materiaali(r)));
        }

        /// <summary>Korostaa reitin a–b (valittu matka). Palauttaa false, jos reittiä ei ole.</summary>
        public bool Korosta(string a, string b)
        {
            if (korostettu != null) Destroy(korostettu);
            var r = Hae(a, b);
            if (r == null) return false;
            korostettu = Piirra(r, korostus);
            return true;
        }

        readonly List<GameObject> lentokaaret = new List<GameObject>();
        Material kirkasLento;

        /// <summary>
        /// Lentolista auki (web matkareittienValinta → lennot): kirkkaat lentokaaret lähdöstä jokaiseen
        /// kohteeseen. Pelikoodarin ohjain kutsuu listan avautuessa; null tai tyhjä = pois.
        /// Kaaria ei napauteta (valinta listasta).
        /// </summary>
        public void Lentokaaret(string lahto, IReadOnlyCollection<string> kohteet)
        {
            foreach (var g in lentokaaret) Destroy(g);
            lentokaaret.Clear();
            if (lahto == null || kohteet == null || !kaupungit.ContainsKey(lahto)) return;
            if (kirkasLento == null && lento != null)
            {
                kirkasLento = new Material(lento) { name = "Lento (lista)" };
                var c = lento.GetColor("_BaseColor");
                kirkasLento.SetColor("_BaseColor", new Color(c.r, c.g, c.b, Mathf.Min(1f, c.a * 2f + 0.2f)));
            }
            foreach (var k in kohteet)
                if (k != lahto && kaupungit.ContainsKey(k))
                    lentokaaret.Add(Piirra(new Reitti { id = "lista:" + lahto + "-" + k, laji = "lento", a = lahto, b = k }, kirkasLento ?? lento));
        }

        /// <summary>
        /// Vapaa kaari annettuja pisteitä pitkin (x = lat, y = lon, z = korkeus m ellipsoidista) samalla viivalla kuin
        /// reitit; materiaali null = korostus (liikkuva katko). Kutsuja omistaa olion (Destroy), ja se näkyy kerroksen
        /// näkyvyydestä riippumatta. Nappula: valitun lennon kaari lennon ajan (pariteetti B24, web ui.js:20691 lentoKaari).
        /// </summary>
        public GameObject PiirraKaari(string id, List<double3> pisteet, Material materiaali = null)
        {
            if (pisteet == null || pisteet.Count < 2 || georeferenssi == null) return null;
            var go = Piirra(new Reitti { id = id, laji = "lento", pisteet = pisteet }, materiaali != null ? materiaali : korostus);
            go.SetActive(true);
            return go;
        }

        /// <summary>
        /// Kamera sovittaa kaupungit ruutuun vain loitontaen ja vain, jos ne eivät jo mahdu
        /// (web sovitaKohteetNakyviin, KOHDESOVITUKSEN_MARGINAALI).
        /// </summary>
        public void SovitaKohteet(IEnumerable<string> kohteet, double marginaali = 0.12)
        {
            var kierto = FindAnyObjectByType<PalloKierto>();
            if (kierto == null || kohteet == null) return;
            var pisteet = new List<(double lat, double lon)>();
            foreach (var k in kohteet)
                if (k != null && kaupungit.TryGetValue(k, out var c)) pisteet.Add((c.lat, c.lon));
            kierto.SovitaPisteet(pisteet, marginaali);
        }

        bool nakyvat = true;

        /// <summary>Reitit näkyvissä (KarttaKerrokset "reitit"); lento palauttaa tämän perillä.</summary>
        public bool Nakyvissa => nakyvat;

        /// <summary>KarttaKerrokset "reitit": piirretyt reitit piiloon tai näkyviin.</summary>
        public void Nakyvat(bool nakyy)
        {
            nakyvat = nakyy;
            foreach (var g in naytetyt) g.SetActive(nakyy);
            foreach (var g in lentokaaret) g.SetActive(nakyy);
            if (korostettu != null) korostettu.SetActive(nakyy);
        }

        public void Tyhjenna(bool myosKorostus = true)
        {
            foreach (var g in naytetyt) Destroy(g);
            naytetyt.Clear();
            if (myosKorostus && korostettu != null) { Destroy(korostettu); korostettu = null; }
        }

        Material Materiaali(Reitti r) => r.laji == "lento" ? lento : r.laji == "sea" || r.tyyppi == "sea" ? meri : maa;

        void Update()
        {
            float kerroin = PalloKierto.Pistekerroin;
            foreach (var m in new[] { maa, meri, lento, korostus })
                if (m != null) m.SetFloat("_Kerroin", kerroin);
        }

        List<double3> Pisteet(Reitti r)
        {
            if (r.pisteet != null) return r.pisteet;
            var A = kaupungit[r.a];
            var B = kaupungit[r.b];
            var ulos = new List<double3>();
            if (r.laji == "lento" || !A.lautaOn || !B.lautaOn)
            {
                // Lentokaari: isoympyrä, joka nousee keskeltä matkan pituuden mukaan.
                double kulma = ReittiGeometria.Kulma(A.lat, A.lon, B.lat, B.lon);
                double huippu = r.laji == "lento"
                    ? kaarenKorkeus * math.clamp(kulma / 180.0, 0.02, 1.0) * CesiumWgs84Ellipsoid.GetMaximumRadius()
                    : 0;
                int n = math.max(16, (int)(kulma * 2));
                for (int i = 0; i <= n; i++)
                {
                    double t = (double)i / n;
                    var p = ReittiGeometria.Isoympyra(A.lat, A.lon, B.lat, B.lon, t);
                    ulos.Add(new double3(p.x, p.y, viivanKorkeus + huippu * math.sin(math.PI_DBL * t)));
                }
            }
            else
            {
                // Mutkien tiiviste lasketaan verkkopelin reitin tunnuksesta edgeId(a, b) = "a|b".
                var polku = ReittiGeometria.LaudanPolku(r.a + "|" + r.b, r.tyyppi ?? (r.laji == "sea" ? "sea" : null), A.lauta, B.lauta, r.via);
                polku = ReittiGeometria.Korjaa(polku,
                    ReittiGeometria.Siirtyma(A.lauta, A.lat, A.lon),
                    ReittiGeometria.Siirtyma(B.lauta, B.lat, B.lon));
                foreach (var p in polku)
                {
                    var ll = ReittiGeometria.Asteiksi(p.x, p.y);
                    ulos.Add(new double3(ll.x, ll.y, viivanKorkeus));
                }
            }
            return r.pisteet = ulos;
        }

        GameObject Piirra(Reitti r, Material materiaali)
        {
            var pisteet = Pisteet(r);
            int n = pisteet.Count;
            var paikat = new Vector3[n * 2];
            var seuraavat = new Vector3[n * 2];
            var puolet = new Vector2[n * 2];
            var u = new Vector3[n];
            for (int i = 0; i < n; i++)
            {
                var p = pisteet[i];
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(p.y, p.x, p.z));
                u[i] = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            }
            double matka = 0;
            for (int i = 0; i < n; i++)
            {
                if (i > 0) matka += ReittiGeometria.Kulma(pisteet[i - 1].x, pisteet[i - 1].y, pisteet[i].x, pisteet[i].y);
                // Viimeisellä pisteellä suunta jatkuu edellisestä.
                Vector3 seur = i < n - 1 ? u[i + 1] : u[i] + (u[i] - u[i - 1]);
                for (int s = 0; s < 2; s++)
                {
                    int j = i * 2 + s;
                    paikat[j] = u[i];
                    seuraavat[j] = seur;
                    puolet[j] = new Vector2(s == 0 ? -1 : 1, (float)matka);
                }
            }
            var kolmiot = new int[(n - 1) * 6];
            for (int i = 0, t = 0; i < n - 1; i++)
            {
                int a = i * 2;
                kolmiot[t++] = a; kolmiot[t++] = a + 1; kolmiot[t++] = a + 2;
                kolmiot[t++] = a + 1; kolmiot[t++] = a + 3; kolmiot[t++] = a + 2;
            }
            var mesh = new Mesh { name = "Reitti " + r.id };
            mesh.vertices = paikat;
            mesh.SetUVs(0, seuraavat);
            mesh.SetUVs(1, puolet);
            mesh.triangles = kolmiot;
            mesh.RecalculateBounds();
            var go = new GameObject("Reitti " + r.id);
            go.transform.SetParent(georeferenssi.transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            go.AddComponent<MeshRenderer>().sharedMaterial = materiaali;
            go.SetActive(nakyvat);
            return go;
        }
    }
}
