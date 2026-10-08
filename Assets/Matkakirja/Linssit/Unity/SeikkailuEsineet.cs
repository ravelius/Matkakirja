// HISTORIAMOOTTORI V4 / E2: POIMINTA JA HEITTO (Siirtoseppä 7.10.2026; pystyleikkeen keittiön harhautus: Fogg heittää esineen,
// kolahdus kuuluu vartijalle, joka lähtee etsimään äänen luota).
// - Esineet merkeistä esine:<id> { paikka, glb, heitettava } (Linnanrakentajan kavely/merkit.json; glb osat.jsonin kansiossa, oma kuva),
//   DioraamaMaasto-varjostimella kuten vene. Törmäys pallolla kerroksessa DioraamaNayttamo.Kerros (kapseli astuu yli, 0,35 m).
// - Toiminto (E-näppäin, peliohjaimen X, Natiivi-UI:n toimintonappi heijastuksella, testi "poikki kavely toiminto"): kädessä → heitto
//   katseen suuntaan (7 m/s eteen, 3,5 m/s ylös), muuten lähin heitettävä 1,2 m:n säteeltä käteen.
// - Ensimmäinen kova osuma (> 1,5 m/s): ääni vartijoille (SeikkailuVartijat.Aani, 12 m) ja kolahdus 3D:nä kuulokehyksestä.
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;
using UnityEngine.InputSystem;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuEsineet : MonoBehaviour
    {
        public static SeikkailuEsineet Aktiivinen { get; private set; }
        public const float PoimintaM = 1.2f, HeittoEteen = 7f, HeittoYlos = 3.5f, KuuluuM = 12f, ValitsinAste = 30f;
        static readonly int IdKuva = Shader.PropertyToID("_Kuva"), IdPohjaKuva = Shader.PropertyToID("_PohjaKuva"), IdTila = Shader.PropertyToID("_Tila");
        /// <summary>Kolahduksen klippi (rakennus.json aanet pikari-1); Sovitin asettaa.</summary>
        public static AudioClip KolahdusKlippi;
        /// <summary>Kolahdus (paikka): Sovitin soittaa kokin harhautusrepliikin, jos kokki on lähellä.</summary>
        public static event Action<Vector3> Kolahti;
        /// <summary>Tavallinen ääni (koputus, luukku): voudin sääntö huomaa vaarahetkellä.</summary>
        public static event Action<Vector3> Aanteli;
        /// <summary>Testi / kosketusnappi: seuraava ruutu tekee toiminnon.</summary>
        public static bool ToimintoPyydetty;

        enum Laji { Heitettava, Nostettava, Irrotettava, Kiintea, Kaadettava }
        sealed class Esine { public string Id; public GameObject Go; public Rigidbody Rb; public bool Heitetty, Kuului; public Laji Laji; public bool Irrotettu, Kaatunut; public Vector3 Ulos; public int Napautuksia; public double AaniM; }
        /// <summary>Veitsen raapaisu saumaan (E3c: ensimmäinen raapaisu laukaisee kappalaisen paluun).</summary>
        public static event Action Raapaistiin;
        /// <summary>Syvennyksen esine (kalkki, pateeni, liuskekivi) nostettiin (E3 vaihe 10: löytö).</summary>
        public static event Action<string> Nostettiin;
        public const int IrrotusNapautukset = 3;
        /// <summary>Koputuksen ääni (ontto kohta); Sovitin asettaa.</summary>
        public static AudioClip OnttoKlippi;
        readonly List<Esine> esineet = new List<Esine>();
        readonly List<UnityEngine.Object> luodut = new List<UnityEngine.Object>();
        Esine kadessa;
        Action<string> kirjaa;
        public string Lahin { get; private set; }
        /// <summary>Toimintonapin verbi (Natiivi-UI lukee suoraan; pelattavuusmalli 6): Poimi, Heitä, Laske, Aseta, Irrota, Avaa, Koputa
        /// sekä kynttilän ja luukun verbit (SeikkailuKynttilat.ToimintoVerbi); null = ei toimintoa (nappi piiloon).</summary>
        public string Toiminto { get; private set; }
        public string Kadessa => kadessa?.Id;

        public static IEnumerator Lataa(KavelyData d, string juuri, Func<string, string> url, Transform isa, Action<string> kirjaa)
        {
            Poista();
            if (d == null) yield break;
            var go = new GameObject("Seikkailu esineet") { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(isa, false);
            var se = go.AddComponent<SeikkailuEsineet>();
            se.kirjaa = kirjaa; Aktiivinen = se;
            malliJuuri = juuri; malliUrl = url;
            foreach (var m in d.Lajia("esine"))
            {
                GameObject eg = null;
                if (!string.IsNullOrEmpty(m.Glb)) yield return LataaMalli(m, go.transform, se.luodut, g => eg = g, kirjaa);
                // Paikkamerkki (Päätoimittaja 7.10.: puuttuvat mallit merkein, vaihdetaan kun peili päivittyy): tarjotin ja patapino.
                if (eg == null && se != null && (m.Kannettava || m.Kaadettava || m.Tunnus.StartsWith("avainnippu", StringComparison.Ordinal))) eg = se.Paikkamerkki(m, go.transform);
                if (eg == null || se == null) continue;
                var mesh = eg.GetComponent<MeshFilter>().sharedMesh;
                var sc = eg.AddComponent<SphereCollider>(); sc.center = mesh.bounds.center; sc.radius = Mathf.Max(0.04f, mesh.bounds.extents.magnitude * 0.6f);
                var rb = eg.AddComponent<Rigidbody>(); rb.mass = 0.6f; rb.isKinematic = true; rb.interpolation = RigidbodyInterpolation.Interpolate;
                rb.collisionDetectionMode = CollisionDetectionMode.ContinuousDynamic;
                // Arkku (huone 9, v44s) on kiinteä, kunnes sen kilpilukko tehdään (M-osa).
                var laji = m.Kiintea || m.Tunnus.StartsWith("arkku", StringComparison.Ordinal) ? Laji.Kiintea : m.Kaadettava ? Laji.Kaadettava : m.Irrotettava ? Laji.Irrotettava : m.Heitettava ? Laji.Heitettava : Laji.Nostettava;
                // Irrotettavan ulospäin = vastakkainen kuin "suunta seinään" (kierto_y), Unityssa (sin, 0, −cos) peilattuna.
                var ulos = m.KiertoY is double ka ? -new Vector3((float)Math.Sin(ka), 0f, (float)-Math.Cos(ka)) : Vector3.zero;
                var e = new Esine { Id = m.Tunnus, Go = eg, Rb = rb, Laji = laji, Ulos = ulos, AaniM = m.AaniM > 0 ? m.AaniM : KuuluuM };
                eg.AddComponent<Osuma>().Kun = (nopeus, kohta) => se.Osui(e, nopeus, kohta);
                se.esineet.Add(e);
            }
            // Liinanyytin sisältö (kalkki, pateeni, liuskekivi) näkyy vasta, kun nyytti avataan (E3 vaihe 10).
            if (se.esineet.Exists(x => x.Id == Nyytti)) foreach (var x in se.esineet) if (Array.IndexOf(NyytinSisalto, x.Id) >= 0) x.Go.SetActive(false);
            foreach (var x in se.esineet) if (x.Id.StartsWith("avainnippu", StringComparison.Ordinal)) x.Go.SetActive(false);   // tyrmä: Pulu tuo
            kirjaa?.Invoke($"seikkailu: esineet {se.esineet.Count} ({string.Join(", ", se.esineet.ConvertAll(x => x.Id))})");
        }

        public const string Nyytti = "liinanyytti", Kirja = "kirja", Tarjotin = "tarjotin";
        static readonly string[] NyytinSisalto = { "kalkki", "pateeni", "liuskekivi" };
        static string malliJuuri; static Func<string, string> malliUrl;

        /// <summary>Merkin glb-malli (Linnanrakentajan kavely-kansio) maailmaan merkin paikkaan ja kiertoon DioraamaMaasto-varjostimella;
        /// myös kappelin luukku ja ikuinen valo (SeikkailuKynttilat). Odottaa enintään 30 s, että esineiden lataus on asettanut juuren.</summary>
        public static IEnumerator LataaMalli(KavelyMerkki m, Transform isa, List<UnityEngine.Object> luodut, Action<GameObject> valmis, Action<string> kirjaa)
        {
            for (float t = 0; malliUrl == null && t < 30f; t += Time.unscaledDeltaTime) yield return null;
            if (malliUrl == null || string.IsNullOrEmpty(m.Glb)) yield break;
            byte[] b = null;
            yield return DioraamaLevyvalimuisti.Hae(malliUrl(malliJuuri + m.Glb), 60, t => b = t);
            if (b == null || isa == null) yield break;
            GlbMalli malli;
            try { malli = DioraamaGlb.Lue(b, true); } catch (Exception ex) { kirjaa?.Invoke($"seikkailu: malli {m.Nimi} glb virhe: {ex.Message}"); yield break; }
            var eg = new GameObject("Esine:" + m.Tunnus) { layer = DioraamaNayttamo.Kerros };
            eg.transform.SetParent(isa, false);
            eg.transform.position = new Vector3((float)m.X, (float)m.Y, (float)-m.Z);
            // kierto_y (glTF, rad) → Unity: z-peilaus kääntää kiertosuunnan.
            if (m.KiertoY is double ky) eg.transform.rotation = Quaternion.Euler(0f, (float)(-ky * 180 / Math.PI), 0f);
            Texture2D kuva = null;
            if (malli.Kuvat.Count > 0 && malli.Kuvat[0] != null)
            {
                kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true, false) { name = "Esine:" + m.Tunnus };
                if (kuva.LoadImage(malli.Kuvat[0], false)) luodut.Add(kuva); else { Destroy(kuva); kuva = null; }
            }
            // DioraamaValaistu (B, maalattu): tilan pistevalot ja Foggin kynttilä valaisevat esineen (kilpilaattojen kohokuva näkyy vain
            // matalasta sivuvalosta, v44k); vara DioraamaMaasto. Värikanavat: AO 1, ei lämpöä, B 0,5 (ei hehkua ilman värejä).
            var valaistu = Shader.Find("Matkakirja/Linssit/DioraamaValaistu");
            var varjostin = valaistu != null ? valaistu : Shader.Find("Matkakirja/Linssit/DioraamaMaasto");
            var mat = varjostin != null ? new Material(varjostin) { name = "Esine:" + m.Tunnus } : null;
            if (mat != null)
            {
                if (valaistu != null) { mat.SetFloat(IdTila, 1f); if (kuva != null) mat.SetTexture(IdPohjaKuva, kuva); }
                else if (kuva != null) mat.SetTexture(IdKuva, kuva);
                luodut.Add(mat);
            }
            var mesh = Mesh(malli); luodut.Add(mesh);
            if (valaistu != null) { var vc = new Color[mesh.vertexCount]; for (int i = 0; i < vc.Length; i++) vc[i] = new Color(1f, 0f, 0.5f, 1f); mesh.colors = vc; }
            eg.AddComponent<MeshFilter>().sharedMesh = mesh;
            var mr = eg.AddComponent<MeshRenderer>(); mr.sharedMaterial = mat; mr.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.On;
            valmis(eg);
        }

        /// <summary>Esineen paikka (näkyvä, ei kädessä) tai null; vihjeet (pelattavuusmalli 5).</summary>
        public Vector3? Paikka(string id)
        {
            var e = esineet.Find(x => x.Id == id);
            return e != null && e.Go != null && e.Go.activeInHierarchy && e != kadessa ? e.Go.transform.position : (Vector3?)null;
        }

        /// <summary>Lähin vielä irrottamaton kivi pisteestä (syvennyksen vihje) tai null.</summary>
        public Vector3? Irrottamaton(Vector3 p)
        {
            Vector3? paras = null; float pd = float.MaxValue;
            foreach (var e in esineet) if (e.Laji == Laji.Irrotettava && !e.Irrotettu && e.Go != null) { float d = (e.Go.transform.position - p).sqrMagnitude; if (d < pd) { pd = d; paras = e.Go.transform.position; } }
            return paras;
        }

        /// <summary>Lähin heitettävä esine pisteestä (harhautuksen vihje) tai null.</summary>
        public Vector3? Heitettava(Vector3 p)
        {
            Vector3? paras = null; float pd = float.MaxValue;
            foreach (var e in esineet) if (e.Laji == Laji.Heitettava && e != kadessa && e.Go != null && e.Go.activeInHierarchy) { float d = (e.Go.transform.position - p).sqrMagnitude; if (d < pd) { pd = d; paras = e.Go.transform.position; } }
            return paras;
        }

        /// <summary>Paikkamerkki puuttuvalle mallille: tarjotin litteä laatikko, patapino kolme päällekkäistä lieriötä; DioraamaValaistu.</summary>
        GameObject Paikkamerkki(KavelyMerkki m, Transform isa)
        {
            var eg = new GameObject("Esine:" + m.Tunnus + " (paikkamerkki)") { layer = DioraamaNayttamo.Kerros };
            eg.transform.SetParent(isa, false);
            eg.transform.position = new Vector3((float)m.X, (float)m.Y, (float)-m.Z);
            var sh = Shader.Find("Matkakirja/Linssit/DioraamaValaistu");
            var mat = sh != null ? new Material(sh) { name = "Paikkamerkki:" + m.Tunnus } : null;
            if (mat != null) { mat.SetColor("_Vari", m.Kaadettava ? new Color(0.18f, 0.17f, 0.16f) : new Color(0.45f, 0.32f, 0.2f)); luodut.Add(mat); }
            var osat = m.Kaadettava ? new[] { (PrimitiveType.Cylinder, new Vector3(0f, 0.1f, 0f), new Vector3(0.4f, 0.1f, 0.4f)), (PrimitiveType.Cylinder, new Vector3(0f, 0.3f, 0f), new Vector3(0.36f, 0.1f, 0.36f)), (PrimitiveType.Cylinder, new Vector3(0f, 0.5f, 0f), new Vector3(0.3f, 0.1f, 0.3f)) }
                : m.Tunnus.StartsWith("avainnippu", StringComparison.Ordinal) ? new[] { (PrimitiveType.Cube, new Vector3(0f, 0.015f, 0f), new Vector3(0.12f, 0.03f, 0.08f)) }
                : new[] { (PrimitiveType.Cube, new Vector3(0f, 0.02f, 0f), new Vector3(0.5f, 0.04f, 0.35f)) };
            var meshit = new List<CombineInstance>();
            foreach (var (tyyppi, paikka, koko) in osat)
            {
                var p = GameObject.CreatePrimitive(tyyppi); var mf = p.GetComponent<MeshFilter>();
                meshit.Add(new CombineInstance { mesh = mf.sharedMesh, transform = Matrix4x4.TRS(paikka, Quaternion.identity, koko) });
                Destroy(p);
            }
            var mesh = new Mesh { name = "Paikkamerkki:" + m.Tunnus }; mesh.CombineMeshes(meshit.ToArray(), true, true);
            var vc = new Color[mesh.vertexCount]; for (int i = 0; i < vc.Length; i++) vc[i] = new Color(1f, 0f, 0.5f, 1f); mesh.colors = vc;
            luodut.Add(mesh);
            eg.AddComponent<MeshFilter>().sharedMesh = mesh;
            var mr = eg.AddComponent<MeshRenderer>(); mr.sharedMaterial = mat;
            return eg;
        }

        /// <summary>Kaada (patapino): esine kaatuu kyljelleen, kolahdus kuuluu aani_m:n säteelle (vartijat tutkivat), ei uudelleen.</summary>
        void Kaada(SeikkailuPelaaja p, Esine e)
        {
            e.Kaatunut = true;
            p.KasiEle("laske");
            var suunta = e.Go.transform.position - p.transform.position; suunta.y = 0;
            var akseli = Vector3.Cross(Vector3.up, suunta.sqrMagnitude > 1e-4f ? suunta.normalized : p.Hahmo.forward);
            StartCoroutine(Kaatuu(e, akseli));
            SeikkailuVartijat.Aani(e.Go.transform.position, e.AaniM);
            SeikkailuAanet.Soita("kivi-kolahdus", e.Go.transform.position, 1f, 0.8f);
            if (KolahdusKlippi != null) AudioSource.PlayClipAtPoint(KolahdusKlippi, e.Go.transform.position, 0.9f);
            Kolahti?.Invoke(e.Go.transform.position);
            kirjaa?.Invoke($"seikkailu: kaadettu {e.Id} (kuuluu {e.AaniM:F0} m)");
        }

        static IEnumerator Kaatuu(Esine e, Vector3 akseli)
        {
            var alku = e.Go.transform.rotation; var loppu = Quaternion.AngleAxis(85f, akseli) * alku;
            for (float t = 0; t < 1f; t += Time.deltaTime / 0.5f) { if (e.Go == null) yield break; e.Go.transform.rotation = Quaternion.Slerp(alku, loppu, t * t); yield return null; }
        }

        /// <summary>Piilotettu esine näkyviin paikkaan (tyrmä: Pulu pudottaa avaimet olkiin).</summary>
        public void Nayta(string id, Vector3? paikka = null)
        {
            var e = esineet.Find(x => x.Id == id); if (e == null || e.Go == null) return;
            if (paikka is Vector3 pk) e.Go.transform.position = pk;
            e.Go.SetActive(true);
        }

        /// <summary>Tikkaat lähellä (kiipeily:tikkaat-*: alapää tai yläpää alle 1,0 m vaakatasossa ja 1,2 m pystyssä): (ala, ylä, suunta, ylhäältä).</summary>
        static (Vector3 Ala, Vector3 Yla, Vector3 Suunta, bool Ylhaalta)? Tikkaat(SeikkailuPelaaja p)
        {
            var d = SeikkailuKavely.Data; if (d == null || p == null || p.Kiipeilee) return null;
            var pp = p.transform.position;
            foreach (var m in d.Lajia("kiipeily"))
            {
                if (m.Yla == null) continue;
                var ala = new Vector3((float)m.X, (float)m.Y, (float)-m.Z); var yla = new Vector3((float)m.Yla[0], (float)m.Yla[1], (float)-m.Yla[2]);
                double ky = m.KiertoY ?? 0; var suunta = new Vector3((float)Math.Sin(-ky), 0f, (float)Math.Cos(-ky));   // glTF kierto_y → Unity yaw −θ
                bool Lahella(Vector3 q) { var v = q - pp; float dy = Mathf.Abs(v.y); v.y = 0; return v.magnitude < 1.0f && dy < 1.2f; }
                if (Lahella(ala)) return (ala, yla, suunta, false);
                if (Lahella(yla)) return (ala, yla, suunta, true);
            }
            return null;
        }

        /// <summary>Esine pois näkyvistä ja poiminnasta (kappalainen vie kirjan).</summary>
        public void Piilota(string id)
        {
            var e = esineet.Find(x => x.Id == id); if (e == null || e.Go == null) return;
            if (kadessa == e) kadessa = null;
            e.Go.SetActive(false);
            kirjaa?.Invoke($"seikkailu: {id} pois");
        }

        static Mesh Mesh(GlbMalli malli)
        {
            var p = new List<Vector3>(); var nr = new List<Vector3>(); var uv = new List<Vector2>(); var kol = new List<int>();
            // Solmujen maailmamatriisit vanhempiketjusta (7.10.: monisolmuiset mallit, tarjotin ja patapino, kasautuivat origoon).
            var mat = new Matrix4x4[malli.Solmut.Count]; var valmis = new bool[malli.Solmut.Count];
            Matrix4x4 Maailma(int i)
            {
                if (valmis[i]) return mat[i];
                var g = malli.Solmut[i];
                var oma = Matrix4x4.TRS(new Vector3(g.Translation[0], g.Translation[1], g.Translation[2]), new Quaternion(g.Rotation[0], g.Rotation[1], g.Rotation[2], g.Rotation[3]), new Vector3(g.Scale[0], g.Scale[1], g.Scale[2]));
                mat[i] = g.Vanhempi >= 0 && g.Vanhempi < malli.Solmut.Count && g.Vanhempi != i ? Maailma(g.Vanhempi) * oma : oma; valmis[i] = true;
                return mat[i];
            }
            for (int si = 0; si < malli.Solmut.Count; si++)
                foreach (var o in malli.Solmut[si].Osat)
                {
                    var sm = Maailma(si);
                    int a = p.Count, k = (o.Paikat?.Length ?? 0) / 3;
                    for (int i = 0; i < k; i++)
                    {
                        p.Add(sm.MultiplyPoint3x4(new Vector3(o.Paikat[i * 3], o.Paikat[i * 3 + 1], o.Paikat[i * 3 + 2])));
                        nr.Add(o.Normaalit != null && o.Normaalit.Length >= (i + 1) * 3 ? sm.MultiplyVector(new Vector3(o.Normaalit[i * 3], o.Normaalit[i * 3 + 1], o.Normaalit[i * 3 + 2])).normalized : Vector3.up);
                        uv.Add(o.Uv != null && o.Uv.Length >= (i + 1) * 2 ? new Vector2(o.Uv[i * 2], 1f - o.Uv[i * 2 + 1]) : Vector2.zero);
                    }
                    foreach (int ix in o.Kolmiot ?? Array.Empty<int>()) kol.Add(ix + a);
                }
            var m = new Mesh { name = "Esine" };
            m.SetVertices(p); m.SetNormals(nr); m.SetUVs(0, uv); m.SetTriangles(kol, 0); m.RecalculateBounds();
            return m;
        }

        void Update()
        {
            var p = SeikkailuPelaaja.Aktiivinen;
            if (p == null) return;
            if (p.Otteessa) { Toiminto = null; return; }   // vartijan otteessa toiminto = irtipääsy (SeikkailuVartijat lukee)
            // Lähin heitettävä (ei kädessä eikä lennossa).
            Esine lahin = null; float pd = float.MaxValue;
            var pp = p.transform.position + Vector3.up * 0.9f;
            foreach (var e in esineet)
            {
                if (e == kadessa || e.Go == null || !e.Go.activeSelf || e.Id == Kirja || e.Laji == Laji.Kiintea || e.Kaatunut) continue;   // kirja on kappalaisen; kilpilaatat seinässä
                if (e.Laji == Laji.Irrotettava && e.Irrotettu) continue;
                // Saumat napautettaviksi vasta viistovalossa (käsikirjoitus kohta 6; ilman kynttilöitä aina).
                if (e.Laji == Laji.Irrotettava && !e.Id.StartsWith("irtokivi", StringComparison.Ordinal) && SeikkailuKynttilat.Aktiivinen is SeikkailuKynttilat kyt && !kyt.SaumatNakyvat) continue;   // tyrmän irtokivi ilman viistovaloa
                if (e.Laji == Laji.Nostettava && Muurattu(e)) continue;   // syvennyksen esineet vasta, kun lähimmät kivet on irrotettu
                float d = (e.Go.transform.position - pp).sqrMagnitude;
                if (d >= PoimintaM * PoimintaM) continue;
                if (SeikkailuPelaaja.Ensimmainen && p.Silmat != null)
                {
                    // Valitsin (pelattavuusmalli 2.4): katseen suunnassa ±30°, lähin kulma voittaa (ei pelkkä etäisyys).
                    float kulma = Vector3.Angle(p.Silmat.forward, e.Go.transform.position - p.Silmat.position);
                    if (kulma > ValitsinAste) continue;
                    d = kulma;
                }
                if (d < pd) { pd = d; lahin = e; }
            }
            // Ei esinettä lähellä eikä kädessä → toiminto kynttilöille (E3: sammuta, sytytä, puhalla oma); nappi näkyy samoin ehdoin.
            var kynttilat = SeikkailuKynttilat.Aktiivinen;
            Lahin = lahin?.Id ?? (kadessa == null && kynttilat != null && kynttilat.ToimintoTarjolla(p) ? "kynttila" : null)
                ?? (kadessa == null && OnttoLahella(p) ? "koputa" : null)
                ?? (kadessa == null && Tikkaat(p) != null ? "tikkaat" : null);
            Toiminto = kadessa != null
                ? (SeikkailuTyrma.Aktiivinen is SeikkailuTyrma tyv && tyv.OviLahella(p) ? "Avaa"
                    : kadessa.Id == Tarjotin && SeikkailuVartijat.TarjotinVastaanottaja(p.transform.position) ? "Anna"
                    : kadessa.Laji == Laji.Heitettava ? "Heitä" : Alttari is Vector3 alt && Vector3.Distance(p.transform.position, alt) < 1.6f ? "Aseta" : "Laske")
                : lahin != null ? (lahin.Laji == Laji.Irrotettava ? "Irrota" : lahin.Laji == Laji.Kaadettava ? "Kaada" : lahin.Id == Nyytti ? "Avaa" : "Poimi")
                : Lahin == "kynttila" ? kynttilat.ToimintoVerbi(p)
                : Lahin == "koputa" ? "Koputa" : Lahin == "tikkaat" ? "Kiipeä" : null;
            bool toiminto = ToimintoPyydetty;
            ToimintoPyydetty = false;
            var kb = Keyboard.current; var gp = Gamepad.current;
            if (kb != null && kb.eKey.wasPressedThisFrame) toiminto = true;
            if (gp != null && gp.buttonWest.wasPressedThisFrame && !SeikkailuKasittely.KeskellaKohde()) toiminto = true;   // X käsiteltävän päällä: veto tai napautus
            if (!toiminto) return;
            if (kadessa != null && SeikkailuTyrma.Aktiivinen is SeikkailuTyrma ty && ty.OviLahella(p)) ty.AvaaOvi(p);
            else if (kadessa != null && kadessa.Id == Tarjotin && SeikkailuVartijat.AnnaTarjotin(p.transform.position))
            {
                // Torkkuva vartija herää eväisiin (pelattavuusmalli 8.1 huone 4): tarjotin hänelle, käteen jää kynttilä.
                var t = kadessa; kadessa = null; t.Go.SetActive(false); p.KasiEle("laske");
                kirjaa?.Invoke("seikkailu: tarjotin annettu vartijalle");
            }
            else if (kadessa != null) { if (kadessa.Laji == Laji.Heitettava) Heita(p); else Laske(p); }
            else if (lahin != null)
            {
                if (lahin.Laji == Laji.Irrotettava)
                {
                    // Käsikirjoitus vaihe 9: kolme napautusta veitsellä kiveä kohden; jokainen liikauttaa kiveä.
                    lahin.Napautuksia++;
                    p.KasiEle("raapaisu");
                    SeikkailuAanet.Soita("raapaisu", lahin.Go.transform.position, 0.8f, UnityEngine.Random.Range(0.92f, 1.08f));
                    Raapaistiin?.Invoke();
                    kirjaa?.Invoke($"seikkailu: raapaisu {lahin.Id} ({lahin.Napautuksia}/{IrrotusNapautukset})");
                    if (lahin.Napautuksia >= IrrotusNapautukset) StartCoroutine(Irrota(lahin));
                    else StartCoroutine(Liikahda(lahin));
                }
                else if (lahin.Laji == Laji.Kaadettava) Kaada(p, lahin);
                else Poimi(p, lahin);
            }
            else if (kynttilat != null && kynttilat.Toimi(p)) { }
            else if (OnttoLahella(p)) Koputa(p);
            else if (Tikkaat(p) is (Vector3 tAla, Vector3 tYla, Vector3 tSuunta, bool tYlh)) p.AloitaKiipeily(tAla, tYla, tSuunta, tYlh);
        }

        void Poimi(SeikkailuPelaaja p, Esine e)
        {
            if (e.Id == Nyytti)
            {
                // Fogg avaa nyytin: liina pois, kalkki, pateeni ja liuskekivi esiin syvennyksen pohjalle.
                e.Go.SetActive(false);
                foreach (var x in esineet) if (Array.IndexOf(NyytinSisalto, x.Id) >= 0 && x.Go != null) x.Go.SetActive(true);
                kirjaa?.Invoke("seikkailu: liinanyytti avattu");
                p.KasiEle("nyytti");
                Nostettiin?.Invoke(e.Id);
                return;
            }
            kadessa = e; e.Heitetty = false; e.Kuului = false;
            e.Rb.isKinematic = true;
            p.KasiEle("poiminta");
            // Kädet-v1: esine tarttuu kahvaan otteen ruudulla (poiminta r31); ilman käsiä heti.
            StartCoroutine(Viiveella(p.KasiTapahtuma("poiminta") ?? 0f, () =>
            {
                if (kadessa != e || e.Go == null || p == null) return;
                e.Go.transform.SetParent(p.Kasi, true);
                e.Go.transform.localPosition = p.KahvaKiinni ? Vector3.zero : SeikkailuPelaaja.Ensimmainen ? new Vector3(0.02f, -0.05f, 0.05f) : new Vector3(0.03f, -0.1f, 0f);
            }));
            kirjaa?.Invoke($"seikkailu: poimittu {e.Id}");
            if (e.Laji == Laji.Nostettava) Nostettiin?.Invoke(e.Id);
        }

        static IEnumerator Viiveella(float s, Action teko) { if (s > 0f) yield return new WaitForSeconds(s); teko(); }

        void Heita(SeikkailuPelaaja p)
        {
            var e = kadessa; kadessa = null;
            p.KasiEle("heitto");
            // Kädet-v1: esine irtoaa kahvasta ruudulla 20; ilman käsiä heti.
            StartCoroutine(Viiveella(p.KasiTapahtuma("heitto") ?? 0f, () => { if (e.Go != null && p != null) Paasta(e, p); }));
        }

        void Paasta(Esine e, SeikkailuPelaaja p)
        {
            e.Go.transform.SetParent(transform, true);
            e.Rb.isKinematic = false;
            var eteen = p.Hahmo.forward; eteen.y = 0; eteen.Normalize();
            // Katseen suunta, jos kamera on käännetty (heitto sinne, minne pelaaja katsoo).
            var k = Quaternion.Euler(0, (float)p.Tila.KameraYaw, 0) * Vector3.forward;
            if (k.sqrMagnitude > 0.5f) eteen = k;
            e.Rb.linearVelocity = eteen * HeittoEteen + Vector3.up * HeittoYlos;
            e.Rb.angularVelocity = UnityEngine.Random.insideUnitSphere * 8f;
            e.Heitetty = true;
            kirjaa?.Invoke($"seikkailu: heitetty {e.Id} suuntaan {eteen}");
        }

        /// <summary>Nostettu (kalkki, pateeni, liuskekivi) lasketaan varovasti eteen (ei heitetä: pyhä esine).</summary>
        void Laske(SeikkailuPelaaja p)
        {
            var e = kadessa; kadessa = null;
            p.KasiEle("laske");
            // E3 vaihe 11: alttarin lähellä kalkki ja pateeni asetetaan alttarille, liuskekivi laukkuun.
            if (Alttari is Vector3 al && Vector3.Distance(p.transform.position, al) < 1.6f) { e.Go.transform.SetParent(transform, true); AsetaAlttarille(e.Id); return; }
            // Kädet-v1: irrotus ruudulla 33 (esine jää käden kohdalle); ilman käsiä heti eteen.
            StartCoroutine(Viiveella(p.KasiTapahtuma("laske") ?? 0f, () =>
            {
                if (e.Go == null || p == null) return;
                e.Go.transform.SetParent(transform, true);
                if (!p.KahvaKiinni) e.Go.transform.position = p.transform.position + p.Hahmo.forward * 0.5f + Vector3.up * 0.9f;
                e.Rb.isKinematic = false; e.Rb.linearVelocity = Vector3.zero; e.Heitetty = false;
                kirjaa?.Invoke($"seikkailu: laskettu {e.Id}");
            }));
        }

        /// <summary>Pääalttarin paikka (SeikkailuKappeli asettaa) ja tapahtuma, kun esine asetetaan sille.</summary>
        public static Vector3? Alttari;
        public static event Action<string> AsetettiinAlttarille;

        /// <summary>Kalkki tai pateeni alttarille (pöydän pinnalle), liuskekivi laukkuun (piiloon); myös automaattisesti (10 s).</summary>
        public void AsetaAlttarille(string id)
        {
            var e = esineet.Find(x => x.Id == id); if (e == null || e.Go == null || !(Alttari is Vector3 al)) return;
            if (kadessa == e) kadessa = null;
            e.Go.transform.SetParent(transform, true);
            if (id == "liuskekivi") e.Go.SetActive(false);
            else { e.Rb.isKinematic = true; e.Go.transform.position = al + Vector3.up * 1.0f + (id == "pateeni" ? Vector3.right * 0.2f : Vector3.zero); e.Go.transform.rotation = Quaternion.identity; }
            SeikkailuAanet.Soita(id == "liuskekivi" ? "liina-avaus" : "hopea-kilahdus", e.Go.transform.position, 0.6f);
            kirjaa?.Invoke($"seikkailu: {id} {(id == "liuskekivi" ? "laukkuun" : "alttarille")}");
            AsetettiinAlttarille?.Invoke(id);
        }

        /// <summary>Kivi liukuu 0,3 m ulos seinästä (laastisauma antaa periksi) ja putoaa; kolahdus ei kuulu vartijoille (hiljainen työ).</summary>
        /// <summary>Kivi irtosi (tyrmän muunnelma 3: ryömintäaukko auki).</summary>
        public static event Action<string> Irrotettiin;

        IEnumerator Irrota(Esine e)
        {
            e.Irrotettu = true;
            Irrotettiin?.Invoke(e.Id);
            SeikkailuAanet.Soita("kivi-irtoaa", e.Go.transform.position, 0.8f);
            var alku = e.Go.transform.position; var loppu = alku + e.Ulos * 0.3f;
            for (float t = 0; t < 1f; t += Time.deltaTime / 1.2f) { if (e.Go == null) yield break; e.Go.transform.position = Vector3.Lerp(alku, loppu, t * t * (3 - 2 * t)); yield return null; }
            e.Rb.isKinematic = false; e.Rb.linearVelocity = e.Ulos * 0.4f;
            StartCoroutine(LaskuAani(e));
            kirjaa?.Invoke($"seikkailu: irrotettu {e.Id} (jäljellä {esineet.FindAll(x => x.Laji == Laji.Irrotettava && !x.Irrotettu).Count})");
        }

        /// <summary>Onko esineen edessä (1,0 m:n sisällä) vielä irrottamaton kivi.</summary>
        bool Muurattu(Esine e)
        {
            foreach (var k in esineet)
                if (k.Laji == Laji.Irrotettava && !k.Irrotettu && k.Go != null && (k.Go.transform.position - e.Go.transform.position).sqrMagnitude < 1f) return true;
            return false;
        }

        IEnumerator LaskuAani(Esine e)
        {
            yield return new WaitForSeconds(0.45f);
            if (e.Go != null) SeikkailuAanet.Soita("kivi-lasku", e.Go.transform.position, 0.7f);
        }

        IEnumerator Liikahda(Esine e)
        {
            var alku = e.Go.transform.position;
            for (float t = 0; t < 0.25f; t += Time.deltaTime) { if (e.Go == null) yield break; e.Go.transform.position = alku + e.Ulos * 0.012f * Mathf.Sin(t / 0.25f * Mathf.PI); yield return null; }
            if (e.Go != null) e.Go.transform.position = alku + e.Ulos * 0.01f * e.Napautuksia;
        }

        static bool OnttoLahella(SeikkailuPelaaja p)
        {
            var d = SeikkailuKavely.Data; if (d == null) return false;
            var c = p.transform.position + Vector3.up * 1.2f;
            foreach (var m in d.Lajia("ontto"))
                if (Vector3.Distance(new Vector3((float)m.X, (float)m.Y, (float)-m.Z), c) < 1.1f) return true;
            return false;
        }

        void Koputa(SeikkailuPelaaja p)
        {
            var c = p.transform.position + Vector3.up * 1.2f + p.Hahmo.forward * 0.4f;
            p.KasiEle("koputus");
            if (SeikkailuAanet.Aktiivinen != null && SeikkailuAanet.Aktiivinen.Valmis) SeikkailuAanet.Soita("koputus-ontto", c);
            else if (OnttoKlippi != null)
            {
                var a = SeikkailuKuulija.Lahde("Koputus", 1.5f, 15f); SeikkailuKuulija.Aseta(a, c);
                a.clip = OnttoKlippi; a.pitch = 0.75f; a.Play(); Destroy(a.gameObject, OnttoKlippi.length / 0.75f + 0.2f);
            }
            Aanteli?.Invoke(c);
            kirjaa?.Invoke("seikkailu: koputus kuulostaa ontolta");
        }

        void Osui(Esine e, float nopeus, Vector3 kohta)
        {
            if (!e.Heitetty || e.Kuului || nopeus < 1.5f) return;
            e.Kuului = true;
            SeikkailuVartijat.Aani(kohta, KuuluuM);
            Kolahti?.Invoke(kohta);
            if (e.Laji == Laji.Irrotettava || e.Id.StartsWith("kivi", StringComparison.Ordinal)) SeikkailuAanet.Soita("kivi-kolahdus", kohta);
            else if (KolahdusKlippi != null)
            {
                var a = SeikkailuKuulija.Lahde("Kolahdus:" + e.Id, 2f, 30f);
                SeikkailuKuulija.Aseta(a, kohta);
                a.clip = KolahdusKlippi; a.pitch = UnityEngine.Random.Range(0.9f, 1.1f); a.Play();
                Destroy(a.gameObject, KolahdusKlippi.length + 0.2f);
            }
            kirjaa?.Invoke($"seikkailu: kolahdus {e.Id} ({nopeus:F1} m/s) @ {kohta} → vartijoille {KuuluuM} m");
        }

        sealed class Osuma : MonoBehaviour
        {
            public Action<float, Vector3> Kun;
            void OnCollisionEnter(Collision c) => Kun?.Invoke(c.relativeVelocity.magnitude, c.contactCount > 0 ? c.GetContact(0).point : transform.position);
        }

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }

        void OnDestroy()
        {
            if (Aktiivinen == this) Aktiivinen = null;
            foreach (var o in luodut) if (o != null) Destroy(o);
        }
    }
}
