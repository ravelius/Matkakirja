using System;
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
    ///
    /// Build 13 (pariteetti B4/B5/B23): maa- ja merireitin alla pergamenttivarjo, välipisteissä askelhelmet
    /// (sama polku kuin viivalla), lentokaari webin paraabelina ja listan kaarissa paikallaan pysyvä katko.
    /// </summary>
    public class Reitit : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;
        public Material maa, meri, lento, korostus;
        [Tooltip("Askelhelmen levy: Kohdemerkki-varjostin (Rakennus: Siirtokohde-materiaali). Tyhjä = Siirtokohdemerkit.materiaali.")]
        public Material helmi;
        [Tooltip("Viivan korkeus ellipsoidin yläpuolella, metreinä.")]
        public double viivanKorkeus = 5000.0;
        [Tooltip("Lentokaaren huippu pallon säteinä 180°:n matkalla (LENTOKAAREN_KORKEUS).")]
        public double kaarenKorkeus = 0.5;

        class Kaupunki { public string id; public double lat, lon; public double2 lauta; public bool lautaOn; }

        class Reitti
        {
            public string id, laji, tyyppi, a, b;
            public double askelia = 1; // askelhelmet (päätaso askelia, raaka data.steps)
            public List<double2> via;
            public List<double3> pisteet; // (lat, lon, korkeus), laskettu tarvittaessa
            public List<(double X, double Y)> polku; // korjattu laudan polku (helmet), vain maa- ja merireitillä
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
                    askelia = MiniJson.Luku(r, "askelia") ?? (d != null ? MiniJson.Luku(d, "steps") : null) ?? 1,
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
            if (odottavaPeli != null) { var ids = odottavaPeli; odottavaPeli = null; NaytaPeli(ids); }
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
            foreach (var r in l) naytetyt.Add(PiirraMatka(r));
        }

        /// <summary>
        /// PELIN MATKAREITIT (pelitilan ainoa reittiohjaus; web ui.matkareittienValinta → reittiTunnukset,
        /// js/ui.js:7885): täsmälleen annetut reitit tavallisella tyylillä (maa/meri-materiaali) pergamenttivarjon
        /// ja askelhelmien kanssa, vanhat pois (korostus jää). Tunnus on pelin reittitunnus "a|b" (verkko.Reitit),
        /// haku kumpaan suuntaan tahansa. null tai tyhjä = kaikki pois 250 ms:n häivytyksellä (web
        /// pathTransitionDuration). PeliOhjain kutsuu vain muutoksessa.
        /// </summary>
        public void NaytaPeli(IReadOnlyList<string> ids)
        {
            // Kutsu tulee vain muutoksessa: ennen kuin data on ladattu, viimeisin joukko odottaa Startin loppuun.
            if (!Valmis) { odottavaPeli = ids == null ? null : new List<string>(ids); return; }
            if (ids == null || ids.Count == 0)
            {
                if (naytetyt.Count == 0) return;
                var pois = new List<GameObject>(naytetyt);
                naytetyt.Clear();
                haipuvat.AddRange(pois);
                StartCoroutine(Haivyta(pois, haivytysKesto));
                return;
            }
            Tyhjenna(false);
            var piirretyt = new HashSet<Reitti>();
            foreach (var t in ids)
            {
                var r = HaeTunnus(t, out _);
                if (r != null && piirretyt.Add(r)) naytetyt.Add(PiirraMatka(r));
            }
        }

        [Tooltip("Matkareittien poiston häivytys sekunteina (web pathTransitionDuration = lauta.js:682 MERKKIEN_SIIRTYMA_MS 250).")]
        public float haivytysKesto = 0.25f;
        readonly List<GameObject> haipuvat = new List<GameObject>();
        List<string> odottavaPeli;

        /// <summary>Reitti tunnuksella "a|b" (kumpaan suuntaan tahansa) tai datan id:llä; kaanteinen = data on b→a.</summary>
        Reitti HaeTunnus(string tunnus, out bool kaanteinen)
        {
            kaanteinen = false;
            if (string.IsNullOrEmpty(tunnus)) return null;
            int i = tunnus.IndexOf('|');
            if (i > 0)
            {
                string a = tunnus.Substring(0, i);
                var r = Hae(a, tunnus.Substring(i + 1));
                if (r != null) { kaanteinen = r.a != a; return r; }
            }
            return reitit.Find(x => x.id == tunnus);
        }

        /// <summary>
        /// REITIN ASKELPISTE samalta polulta kuin piirretty viiva (web siirto.js:264 pointAlong(reitit.poly(reitti),
        /// idx / steps)): polku ReittiGeometria.LaudanPolku + Korjaa, piste ReittiMitat.PisteMatkalla. id "a|b"
        /// (A = a), osuus 0–1 kaaren pituudesta a:sta b:hen; jos data on tallennettu b→a, osuus lasketaan silti
        /// a:sta. Reitti ilman laudan pisteitä (tai lento): isoympyrä. null, jos reittiä ei ole tai data ei ole valmis.
        /// Pelikoodari: PeliApu.ReittiPiste = reitit.ReittiPiste.
        /// </summary>
        public (double Lat, double Lon)? ReittiPiste(string id, double osuus)
        {
            if (!Valmis) return null;
            var r = HaeTunnus(id, out bool kaanteinen);
            if (r == null) return null;
            double t = Math.Max(0.0, Math.Min(1.0, kaanteinen ? 1.0 - osuus : osuus));
            Pisteet(r); // laskee r.polku maa- ja merireiteille
            if (r.polku != null && r.polku.Count > 0)
            {
                var p = ReittiMitat.PisteMatkalla(r.polku, t);
                var ll = ReittiGeometria.Asteiksi(p.X, p.Y);
                return (ll.x, ll.y);
            }
            var A = kaupungit[r.a];
            var B = kaupungit[r.b];
            var g = ReittiGeometria.Isoympyra(A.lat, A.lon, B.lat, B.lon, t);
            return (g.x, g.y);
        }

        /// <summary>Häivyttää reitit (viivat, varjot, helmet) peittävyydestä nollaan ja tuhoaa ne.</summary>
        IEnumerator Haivyta(List<GameObject> pois, float kesto)
        {
            var levyt = new List<(Renderer r, MaterialPropertyBlock b, Color vari, Color reuna, bool helmi)>();
            foreach (var g in pois)
            {
                if (g == null) continue;
                foreach (var mr in g.GetComponentsInChildren<MeshRenderer>(true))
                {
                    var b = new MaterialPropertyBlock();
                    mr.GetPropertyBlock(b);
                    bool onHelmi = helmi != null && mr.sharedMaterial == helmi;
                    var vari = onHelmi ? HelmenTaytto : mr.sharedMaterial != null ? mr.sharedMaterial.GetColor("_BaseColor") : Color.clear;
                    levyt.Add((mr, b, vari, HelmenReuna, onHelmi));
                }
            }
            for (float t = 0; t < kesto; t += Time.unscaledDeltaTime)
            {
                float k = 1f - Mathf.Clamp01(t / kesto);
                foreach (var (r, b, vari, reuna, onHelmi) in levyt)
                {
                    if (r == null) continue;
                    if (onHelmi)
                    {
                        b.SetColor("_Taytto", new Color(vari.r, vari.g, vari.b, vari.a * k));
                        b.SetColor("_Viivavari", new Color(reuna.r, reuna.g, reuna.b, reuna.a * k));
                    }
                    else b.SetColor("_BaseColor", new Color(vari.r, vari.g, vari.b, vari.a * k));
                    r.SetPropertyBlock(b);
                }
                yield return null;
            }
            foreach (var g in pois)
            {
                haipuvat.Remove(g);
                if (g != null) Destroy(g);
            }
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

        /// <summary>
        /// Lentolista auki (web matkareittienValinta → lennot): lentokaaret lähdöstä jokaiseen kohteeseen
        /// webin värillä rgba(150,54,40,.6) ilman kirkastusta (reitit.js:214, 368). Katko on paikallaan; vain
        /// <paramref name="elava"/>-kohteen kaaren katko liikkuu (web valittu lento ui.lentoKaari.b,
        /// arcDashAnimateTime reitit.js:372). Pelikoodarin ohjain kutsuu listan avautuessa; null tai tyhjä = pois.
        /// Kaaria ei napauteta (valinta listasta).
        /// </summary>
        public void Lentokaaret(string lahto, IReadOnlyCollection<string> kohteet, string elava = null)
        {
            foreach (var g in lentokaaret) Destroy(g);
            lentokaaret.Clear();
            if (lahto == null || kohteet == null || !kaupungit.ContainsKey(lahto)) return;
            Valmistele();
            foreach (var k in kohteet)
                if (k != lahto && kaupungit.ContainsKey(k))
                    lentokaaret.Add(Piirra(new Reitti { id = "lista:" + lahto + "-" + k, laji = "lento", a = lahto, b = k },
                        (k == elava ? elavaLento : listaLento) ?? lento));
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
        public void SovitaKohteet(IEnumerable<string> kohteet, double marginaali = PalloKierto.KohdesovitusMarginaali)
        {
            var kierto = FindAnyObjectByType<PalloKierto>();
            if (kierto == null || kohteet == null) return;
            var pisteet = new List<(double lat, double lon)>();
            foreach (var k in kohteet)
                if (k != null && kaupungit.TryGetValue(k, out var c)) pisteet.Add((c.lat, c.lon));
            // Web sovitaLentokohteet: rajaukseen myös pelaajan paikka (kohteidenRajaus).
            var n = FindAnyObjectByType<Nappula>();
            kierto.SovitaPisteet(pisteet, marginaali, PalloKierto.KohdesovitusKesto, n != null && n.Nakyy ? (n.Lat, n.Lon) : null);
        }

        bool nakyvat = true;

        /// <summary>Reitit näkyvissä (KarttaKerrokset "reitit"); lento palauttaa tämän perillä.</summary>
        public bool Nakyvissa => nakyvat;

        /// <summary>KarttaKerrokset "reitit": piirretyt reitit piiloon tai näkyviin.</summary>
        public void Nakyvat(bool nakyy)
        {
            nakyvat = nakyy;
            foreach (var g in naytetyt) g.SetActive(nakyy);
            foreach (var g in haipuvat) if (g != null) g.SetActive(nakyy);
            foreach (var g in lentokaaret) g.SetActive(nakyy);
            if (korostettu != null) korostettu.SetActive(nakyy);
        }

        public void Tyhjenna(bool myosKorostus = true)
        {
            foreach (var g in naytetyt) Destroy(g);
            naytetyt.Clear();
            // Helmet ovat reittien lapsia: tuhotut karsitaan LateUpdatessa (häivytettävät elävät vielä hetken).
            if (myosKorostus && korostettu != null) { Destroy(korostettu); korostettu = null; }
        }

        Material Materiaali(Reitti r)
        {
            if (r.laji != "lento") return r.laji == "sea" || r.tyyppi == "sea" ? meri : maa;
            Valmistele();
            return listaLento ?? lento;
        }

        // Ajonaikaiset kopiot (ei uusia materiaaliassetteja): varjo maareitin materiaalista, lentokaaret
        // lento-materiaalista paikallaan pysyvällä ja liikkuvalla katkolla.
        Material varjo, listaLento, elavaLento;

        /// <summary>Pergamenttivarjo reitit.js:221 REITIN_VARIT.varjo rgba(250,243,226,.3), 4 pt (reitit.js:67).</summary>
        static readonly Color VarjonVari = new Color(250f / 255f, 243f / 255f, 226f / 255f, 0.3f);
        /// <summary>Valitun lennon katkon liike: jakso 0,35° (LENTOKAAREN_KATKO_AST) 2,4 s:ssa (LENTOKAAREN_ELO_MS).</summary>
        const float LennonKatkoLiike = 0.35f / 2.4f;

        void Valmistele()
        {
            if (varjo == null && maa != null)
            {
                varjo = new Material(maa) { name = "Reitti-varjo" };
                varjo.SetColor("_BaseColor", VarjonVari);
                varjo.SetFloat("_Paksuus", ReittiMitat.VarjonPaksuusPt);
                // Musteviivan alle myös piirtojärjestyksessä (Viiva: ZWrite Off, sama jono).
                varjo.renderQueue = maa.renderQueue - 1;
            }
            if (listaLento == null && lento != null)
            {
                // Väri suoraan lento-materiaalista (Rakennus: 150,54,40,153 = webin .6), ei kirkastusta.
                listaLento = new Material(lento) { name = "Lento (lista)" };
                var k = lento.GetVector("_Katko");
                listaLento.SetVector("_Katko", new Vector4(k.x, k.y, 0, k.w));
                elavaLento = new Material(lento) { name = "Lento (valittu)" };
                elavaLento.SetVector("_Katko", new Vector4(k.x, k.y, LennonKatkoLiike, k.w));
            }
        }

        void Update()
        {
            float kerroin = PalloKierto.Pistekerroin;
            foreach (var m in new[] { maa, meri, lento, korostus, varjo, listaLento, elavaLento })
                if (m != null) m.SetFloat("_Kerroin", kerroin);
        }

        /// <summary>
        /// Matkareitti kuten webin reitinMuisti (reitit.js:405–471): musteviiva, maa- ja merireitillä sen alla
        /// pergamenttivarjo (hitusen alempana, reitit.js:452) ja välipisteissä askelhelmet (reitit.js:426–444).
        /// Varjo ja helmet ovat viivan lapsia: Tyhjenna ja Nakyvat koskevat niitä samalla.
        /// </summary>
        GameObject PiirraMatka(Reitti r)
        {
            var go = Piirra(r, Materiaali(r));
            if (r.laji == "lento" || r.polku == null) return go;
            Valmistele();
            if (varjo != null)
            {
                var v = Piirra(r, varjo, viivanKorkeus * (1.0 - ReittiMitat.VarjonKorkeusSuhde));
                v.name = "Varjo " + r.id;
                v.transform.SetParent(go.transform, false);
            }
            Helmet(r, go.transform);
            return go;
        }

        List<double3> Pisteet(Reitti r)
        {
            if (r.pisteet != null) return r.pisteet;
            var A = kaupungit[r.a];
            var B = kaupungit[r.b];
            var ulos = new List<double3>();
            if (r.laji == "lento" || !A.lautaOn || !B.lautaOn)
            {
                // Lentokaari: isoympyrä, joka nousee keskeltä paraabelina matkan pituuden mukaan
                // (web reitit.js:284 lentokaarenKorkeus ja :300 lentokaarenKohta, 4 t (1 − t)).
                double kulma = ReittiGeometria.Kulma(A.lat, A.lon, B.lat, B.lon);
                double huippu = r.laji == "lento"
                    ? ReittiMitat.LentokaarenHuippu(kulma, kaarenKorkeus) * CesiumWgs84Ellipsoid.GetMaximumRadius()
                    : 0;
                int n = math.max(16, (int)(kulma * 2));
                for (int i = 0; i <= n; i++)
                {
                    double t = (double)i / n;
                    var p = ReittiGeometria.Isoympyra(A.lat, A.lon, B.lat, B.lon, t);
                    ulos.Add(new double3(p.x, p.y, viivanKorkeus + huippu * ReittiMitat.KaarenNousu(t)));
                }
            }
            else
            {
                // Mutkien tiiviste lasketaan verkkopelin reitin tunnuksesta edgeId(a, b) = "a|b".
                var polku = ReittiGeometria.LaudanPolku(r.a + "|" + r.b, r.tyyppi ?? (r.laji == "sea" ? "sea" : null), A.lauta, B.lauta, r.via);
                polku = ReittiGeometria.Korjaa(polku,
                    ReittiGeometria.Siirtyma(A.lauta, A.lat, A.lon),
                    ReittiGeometria.Siirtyma(B.lauta, B.lat, B.lon));
                r.polku = polku.ConvertAll(p => (p.x, p.y));
                foreach (var p in polku)
                {
                    var ll = ReittiGeometria.Asteiksi(p.x, p.y);
                    ulos.Add(new double3(ll.x, ll.y, viivanKorkeus));
                }
            }
            return r.pisteet = ulos;
        }

        /// <param name="lasku">Metriä viivan korkeuden alle (pergamenttivarjo).</param>
        GameObject Piirra(Reitti r, Material materiaali, double lasku = 0)
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
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(p.y, p.x, p.z - lasku));
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

        // ── ASKELHELMET (pariteetti B5) ──────────────────────────────────────────────
        // reitit.js:100–109 ja 426–444: välipisteissä i / askelia (i = 1 … askelia − 1) 15 pt ympyrä, 2,2 pt
        // tumma reunus rgba(74,58,36,.88) ja pergamenttitäyte rgba(250,243,226,.9); päätekaupungeissa ei helmeä.
        // Paikka korjatulta laudan polulta pointAlong-kaavalla (ReittiMitat.PisteMatkalla), sama polku kuin viivalla.
        // Levy on Kohdemerkki-varjostin ilman haloa ja katkoa (MaterialPropertyBlock), koko vakio näytön
        // pisteinä kuten Siirtokohdemerkeissä: neliö tuodaan näkösädettä pitkin pinnan eteen.

        sealed class Helmi { public Transform juuri; public Vector3 pinta, normaali; }
        static readonly Predicate<Helmi> OnTuhottu = h => h.juuri == null;

        readonly List<Helmi> helmet = new List<Helmi>();
        MaterialPropertyBlock helmiLohko;
        Mesh helmiNelio;
        Camera kamera;
        /// <summary>Hitusen vähemmän kuin Siirtokohdemerkit.Etuna (0,3): siirtokohteen rengas piirtyy helmen päälle.</summary>
        const float HelmenEtuna = 0.29f;
        /// <summary>Neliön sivu: ulkohalkaisija + reunan pehmennys.</summary>
        const float HelmenNelio = ReittiMitat.HelmenHalkaisijaPt + 4f;
        static readonly Color HelmenTaytto = new Color(250f / 255f, 243f / 255f, 226f / 255f, 0.9f);
        static readonly Color HelmenReuna = new Color(74f / 255f, 58f / 255f, 36f / 255f, 0.88f);

        void Helmet(Reitti r, Transform isanta)
        {
            if (helmi == null) helmi = Siirtokohdemerkit.Instanssi != null ? Siirtokohdemerkit.Instanssi.materiaali : null;
            if (helmi == null || r.polku == null || r.polku.Count < 2) return;
            var osuudet = ReittiMitat.HelmienOsuudet(r.askelia);
            if (osuudet.Count == 0) return;
            helmiNelio ??= Nelio();
            if (helmiLohko == null)
            {
                helmiLohko = new MaterialPropertyBlock();
                helmiLohko.SetFloat("_Sade", ReittiMitat.HelmenKeskiSadePt);
                helmiLohko.SetFloat("_Viiva", ReittiMitat.HelmenReunaPt);
                helmiLohko.SetFloat("_Koko", HelmenNelio);
                helmiLohko.SetFloat("_HaloViiva", 0f);
                // Yhtenäinen reunus: katko pidempi kuin kehä (2π · 6,4 ≈ 40 pt).
                helmiLohko.SetVector("_Katko", new Vector4(1000f, 0f, 0f, 0f));
                helmiLohko.SetColor("_Taytto", HelmenTaytto);
                helmiLohko.SetColor("_Viivavari", HelmenReuna);
                // Halo pois (peitto 0); sävy reunuksen musteesta, jolloin täytteen alle jää webin tapaan
                // kymmenesosa tummasta levystä (reunuslevy pergamentin alla, reitit.js:440).
                helmiLohko.SetColor("_Halovari", new Color(HelmenReuna.r, HelmenReuna.g, HelmenReuna.b, 0f));
            }
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            for (int i = 0; i < osuudet.Count; i++)
            {
                var p = ReittiMitat.PisteMatkalla(r.polku, osuudet[i]);
                var ll = ReittiGeometria.Asteiksi(p.X, p.Y);
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(ll.y, ll.x, viivanKorkeus));
                double3 u = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
                var juuri = new GameObject("Helmi " + r.id + "#" + (i + 1)).transform;
                juuri.SetParent(isanta, false);
                var q = new GameObject("Levy").transform;
                q.SetParent(juuri, false);
                q.localScale = new Vector3(HelmenNelio, HelmenNelio, 1);
                q.gameObject.AddComponent<MeshFilter>().sharedMesh = helmiNelio;
                var mr = q.gameObject.AddComponent<MeshRenderer>();
                mr.sharedMaterial = helmi;
                mr.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                mr.receiveShadows = false;
                mr.SetPropertyBlock(helmiLohko);
                helmet.Add(new Helmi { juuri = juuri, pinta = (float3)u, normaali = (float3)math.normalize(u - keskus) });
            }
        }

        void LateUpdate()
        {
            if (helmet.Count == 0) return;
            if (helmet.Exists(OnTuhottu)) helmet.RemoveAll(OnTuhottu);
            if (helmet.Count == 0) return;
            if (kamera == null) kamera = Camera.main;
            if (kamera == null) return;
            var kt = kamera.transform;
            var gt = georeferenssi.transform;
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float pikseleita = Screen.height / PalloKierto.Pistekerroin;
            foreach (var h in helmet)
            {
                if (h.juuri == null) continue;
                Vector3 paikka = gt.TransformPoint(h.pinta);
                Vector3 kohti = kt.position - paikka;
                float etaisyys = kohti.magnitude;
                bool edessa = !PalloKierto.PorttiSumea && Vector3.Dot(gt.TransformDirection(h.normaali), kohti / etaisyys) > 0.12f;
                if (h.juuri.gameObject.activeSelf != edessa) h.juuri.gameObject.SetActive(edessa);
                if (!edessa) continue;
                float lahella = etaisyys * (1f - HelmenEtuna);
                h.juuri.SetPositionAndRotation(kt.position - kohti / etaisyys * lahella, kt.rotation);
                h.juuri.localScale = Vector3.one * (2f * lahella * tanPuoli / pikseleita);
            }
        }

        static Mesh Nelio()
        {
            var m = new Mesh { name = "Helmi" };
            m.vertices = new[] { new Vector3(-0.5f, -0.5f), new Vector3(0.5f, -0.5f), new Vector3(-0.5f, 0.5f), new Vector3(0.5f, 0.5f) };
            m.uv = new[] { new Vector2(0, 0), new Vector2(1, 0), new Vector2(0, 1), new Vector2(1, 1) };
            m.triangles = new[] { 0, 2, 1, 1, 2, 3 };
            m.RecalculateBounds();
            return m;
        }
    }
}
