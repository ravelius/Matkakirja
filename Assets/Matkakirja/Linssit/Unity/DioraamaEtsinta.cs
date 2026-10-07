// DIORAAMAN ETSINTÄ: VOUDIN SINETTI (elävä linna, käsikirjoitus 29.9. kohta 4; Siirtoseppä, data Linnanrakentajalta).
// RAKENNUS.etsinnat[] kertoo etsinnän (id = matkamuiston id, vaiheiden tilat järjestyksessä, faktakortti), tila.etsinta[]
// vaiheet (repliikki | vihje | loyto, kohde + säde) ja tila.esineet[] irtoesineet omina glb:inään (arkun kansi saranalla,
// sinetti). Toiminta:
//   - vaihe näkyy kimalluksena (DioraamaSyke.shader, pieni) vasta, kun sen tila on avattuna ja edellinen vaihe on tehty
//   - napautus kimallukseen: teksti etsintäkortille (DioraamaTaulu kuuntelee Nayta-tapahtumaa), vaihe tehdyksi
//     (PlayerPrefs "dioraama-etsinta-<id>")
//   - löytövaihe: kansi kääntyy saranan ympäri (0,9 s), sinetti nousee ja häviää, ja pelipuoli saa löydön
//     (PeliOhjain.LoydaMatkamuisto, Pelikoodari: tietäjäpisteet, tallennus, Aarteet, löytökortti)
//   - jos matkamuisto on jo löydetty (PeliOhjain.OnMatkamuisto), arkku on auki ja tyhjä eikä kimallusta ole.
// Pelirajapinnan metodit (LoydaMatkamuisto, OnMatkamuisto) haetaan heijastuksella, koska ne tulevat Pelikoodarin haarasta
// (pelikoodari/matkamuisto); ne ovat julkisia ja testikomennon käyttämiä, joten IL2CPP ei karsi niitä. Puuttuva rajapinta kirjataan lokiin, eikä etsintä kaadu.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaEtsinta
    {
        /// <summary>Etsintäkortti (otsikko, teksti) — DioraamaTaulu näyttää sen hetken.</summary>
        public static event Action<string, string> Nayta;

        /// <summary>DioraamaSovitin: puolilähikuva käynnissä → kimallus himmennetään (napautettavuus säilyy).</summary>
        public static bool Himmennys; float himmennysNyt = 1f;
        static readonly int IdKoko = Shader.PropertyToID("_Koko"), IdPeitto = Shader.PropertyToID("_Peitto"),
            IdAika = Shader.PropertyToID("_Aika"), IdVari = Shader.PropertyToID("_Vari"), IdTila = Shader.PropertyToID("_Tila");
        const float KansiS = 0.9f, SinettiS = 1.2f;

        readonly Transform juuri;
        readonly Shader kimallusVarjostin, esineVarjostin;
        GameObject kimallus;
        Material kimallusM;
        Mesh kimallusMesh;
        float kimallusPeitto;
        EtsintaVaihe aktiivinen;
        Tila aktiivinenTila;

        sealed class EsineGo { public GameObject Go, Kaantaja; public Esine Data; public Vector3 Akseli; public List<Material> M = new List<Material>(); }
        readonly Dictionary<string, EsineGo> esineet = new Dictionary<string, EsineGo>();
        // Käynnissä oleva löytöanimaatio.
        EsineGo avautuva, nouseva;
        float loytoAlku = -1f;
        // Löytö: pelin matkamuistokortti (koko ruudun) vasta kun kansi on auki ja sinetti noussut (1.0.59 V11: kortti
        // peitti arkun heti napautuksesta). Oma etsintäkortti näytetään samalla hetkellä vain, jos pelirajapinta puuttuu
        // tai vaiheessa on Pulun kommentti.
        string loytoId, loytoOtsikko, loytoTeksti;

        public DioraamaEtsinta(Transform juuri)
        {
            this.juuri = juuri;
            kimallusVarjostin = Resources.Load<Shader>("Varjostimet/DioraamaSyke");
            esineVarjostin = Resources.Load<Shader>("Varjostimet/DioraamaValaistu");
        }

        // --- tila ja pelirajapinta ---------------------------------------------------------------------------------------

        static string Avain(string id) => "dioraama-etsinta-" + id;
        static int Tehty(string id) => PlayerPrefs.GetInt(Avain(id), 0);
        static void Merkitse(string id, int vaihe) { PlayerPrefs.SetInt(Avain(id), vaihe); PlayerPrefs.Save(); }

        static object Ohjain() => Matkakirja.Natiivi.PeliOhjain.Instanssi;

        static bool? Kutsu(string metodi, string id)
        {
            var o = Ohjain();
            var m = o?.GetType().GetMethod(metodi, new[] { typeof(string) });
            if (m == null) return null;
            try { return m.Invoke(o, new object[] { id }) as bool?; } catch (Exception e) { Debug.LogWarning("MATKAKIRJA etsintä: " + metodi + ": " + e.Message); return null; }
        }

        /// <summary>Onko etsinnän matkamuisto jo pelitilassa (pelipuoli ratkaisee; varalla laitteen oma merkintä).</summary>
        static bool Loydetty(Etsinta e) => Kutsu("OnMatkamuisto", e.Id) == true || Tehty(e.Id) >= e.Vaiheet.Count;

        /// <summary>Kehittäjälle ("poikki etsinta alusta"): laitteen vaihemerkinnät nollaan (pelitilan matkamuisto säilyy).</summary>
        public static void Nollaa(Rakennus r) { if (r?.Etsinnat != null) foreach (var e in r.Etsinnat) Merkitse(e.Id, 0); }

        public static string Tila(Rakennus r)
        {
            if (r?.Etsinnat == null || r.Etsinnat.Count == 0) return "ei etsintöjä";
            var s = new List<string>();
            foreach (var e in r.Etsinnat) s.Add($"{e.Id} {Tehty(e.Id)}/{e.Vaiheet.Count}{(Kutsu("OnMatkamuisto", e.Id) == true ? " (löydetty)" : "")}");
            return string.Join(", ", s);
        }

        // --- esineet ------------------------------------------------------------------------------------------------------

        /// <summary>Lataa tilan irtoesineet (glb maailmakoordinaateissa). Kansi saa kääntäjän saranan kohdalle.</summary>
        public IEnumerator LataaEsineet(Rakennus rakennus, Tila tila, Func<string, string> url, Action<string> kirjaa)
        {
            if (tila?.Esineet == null) yield break;
            foreach (var e in tila.Esineet)
            {
                if (string.IsNullOrEmpty(e.Id) || string.IsNullOrEmpty(e.Tiedosto) || esineet.ContainsKey(tila.Id + "/" + e.Id)) continue;
                byte[] tavut = null;
                using (var p = UnityWebRequest.Get(url(e.Tiedosto)))
                {
                    p.timeout = 30;
                    yield return p.SendWebRequest();
                    if (p.result == UnityWebRequest.Result.Success) tavut = p.downloadHandler.data;
                }
                if (tavut == null) { kirjaa?.Invoke($"poikki: esine {e.Id} ei latautunut"); continue; }
                GlbMalli malli;
                try { malli = DioraamaGlb.Lue(tavut, true); }
                catch (Exception x) { kirjaa?.Invoke($"poikki: esine {e.Id} virhe: {x.Message}"); continue; }
                var eg = Rakenna(tila.Id, e, malli);
                if (eg != null) { esineet[tila.Id + "/" + e.Id] = eg; kirjaa?.Invoke($"poikki: esine {tila.Id}/{e.Id} valmis"); }
                PaivitaLoydetty(rakennus);
            }
        }

        EsineGo Rakenna(string tilaId, Esine e, GlbMalli malli)
        {
            if (esineVarjostin == null || malli.Osat.Count == 0) return null;
            int kv = 0;
            foreach (var o in malli.Osat) kv += o.Paikat.Length / 3;
            var paikat = new Vector3[kv]; var normaalit = new Vector3[kv]; var varit = new Color32[kv];
            var mesh = new Mesh { name = "Esine:" + tilaId + "/" + e.Id, indexFormat = IndexFormat.UInt32, subMeshCount = malli.Osat.Count };
            var eg = new EsineGo { Data = e };
            int v0 = 0;
            var kolmiot = new List<int[]>();
            foreach (var o in malli.Osat)
            {
                int n = o.Paikat.Length / 3;
                for (int i = 0; i < n; i++)
                {
                    paikat[v0 + i] = new Vector3(o.Paikat[i * 3], o.Paikat[i * 3 + 1], o.Paikat[i * 3 + 2]);
                    normaalit[v0 + i] = o.Normaalit != null ? new Vector3(o.Normaalit[i * 3], o.Normaalit[i * 3 + 1], o.Normaalit[i * 3 + 2]) : Vector3.up;
                    varit[v0 + i] = new Color32(255, 0, 0, 255); // AO 1, ei lämpöä
                }
                var k = new int[o.Kolmiot.Length];
                for (int i = 0; i < k.Length; i++) k[i] = o.Kolmiot[i] + v0;
                kolmiot.Add(k);
                var m = new Material(esineVarjostin) { name = "Esine:" + e.Id };
                var c = o.Vari != null && o.Vari.Length >= 3 ? new Color(o.Vari[0], o.Vari[1], o.Vari[2]) : new Color(0.45f, 0.36f, 0.26f);
                m.SetColor(IdVari, c.gamma); // baseColorFactor on lineaarinen, SetColor odottaa sRGB:tä
                m.SetFloat(IdTila, 0f);
                eg.M.Add(m);
                v0 += n;
            }
            mesh.SetVertices(paikat); mesh.SetNormals(normaalit); mesh.SetColors(varit);
            for (int i = 0; i < kolmiot.Count; i++) mesh.SetTriangles(kolmiot[i], i);
            mesh.RecalculateBounds();

            eg.Go = new GameObject("Esine:" + tilaId + "/" + e.Id) { layer = DioraamaNayttamo.Kerros };
            eg.Go.transform.SetParent(juuri, false);
            var osa = new GameObject("Malli") { layer = DioraamaNayttamo.Kerros };
            if (e.Sarana.HasValue)
            {
                // Kääntäjä saranan kohdalla; malli siirretään sen alle (kärjet ovat maailmakoordinaateissa).
                var sarana = DioraamaNayttamo.UnityPiste(e.Sarana.Value);
                eg.Kaantaja = new GameObject("Sarana") { layer = DioraamaNayttamo.Kerros };
                eg.Kaantaja.transform.SetParent(eg.Go.transform, false);
                eg.Kaantaja.transform.position = sarana;
                osa.transform.SetParent(eg.Kaantaja.transform, false);
                osa.transform.localPosition = -sarana;
                var a = e.Akseli.HasValue ? e.Akseli.Value : new Matkakirja.Linssit.Dioraama.V3(1, 0, 0);
                eg.Akseli = new Vector3((float)a.X, (float)a.Y, (float)-a.Z).normalized;
            }
            else osa.transform.SetParent(eg.Go.transform, false);
            osa.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = osa.AddComponent<MeshRenderer>();
            r.sharedMaterials = eg.M.ToArray();
            r.shadowCastingMode = ShadowCastingMode.On;
            r.receiveShadows = true;
            return eg;
        }

        EsineGo Hae(string tilaId, string id) => id != null && esineet.TryGetValue(tilaId + "/" + id, out var e) ? e : null;

        /// <summary>Jo löydetty: kansi auki, sinetti piilossa (esim. toisella käynnillä).</summary>
        void PaivitaLoydetty(Rakennus r)
        {
            if (r?.Etsinnat == null) return;
            foreach (var e in r.Etsinnat)
            {
                if (!Loydetty(e)) continue;
                foreach (var t in r.Tilat)
                    foreach (var v in t.Etsinta)
                    {
                        if (v.Etsinta != e.Id || v.Tyyppi != "loyto") continue;
                        var kansi = Hae(t.Id, v.Kansi);
                        if (kansi?.Kaantaja != null && avautuva != kansi) kansi.Kaantaja.transform.localRotation = Quaternion.AngleAxis(-(float)kansi.Data.Avaa, kansi.Akseli);
                        var esine = Hae(t.Id, v.Esine);
                        if (esine?.Go != null && nouseva != esine) esine.Go.SetActive(false);
                    }
            }
        }

        // --- joka ruutu ja napautus -----------------------------------------------------------------------------------------

        public void Paivita(Rakennus r, string kohdeTila, double t, bool vahennettyLiike)
        {
            aktiivinen = null; aktiivinenTila = null;
            if (r?.Etsinnat != null && kohdeTila != null)
            {
                var tila = r.Tila(kohdeTila);
                foreach (var v in tila?.Etsinta ?? new List<EtsintaVaihe>())
                {
                    var e = r.Etsinnat.Find(x => x.Id == v.Etsinta);
                    if (e == null || Loydetty(e) || Tehty(e.Id) + 1 != v.Vaihe) continue;
                    aktiivinen = v; aktiivinenTila = tila;
                    break;
                }
            }
            AktiivinenRivi = aktiivinen?.Rivi;
            PaivitaKimallus(t, vahennettyLiike);
            AnimoiLoyto();
        }

        /// <summary>Uusi linna (30.9.2026): kohdistetun tilan aktiivisen etsintävaiheen lyhyt rivi (`etsinta[].rivi`)
        /// infotauluun (DioraamaTaulu); null = ei aktiivista vaihetta tai riviä.</summary>
        public static string AktiivinenRivi { get; private set; }

        void PaivitaKimallus(double t, bool vahennettyLiike)
        {
            kimallusPeitto = Mathf.MoveTowards(kimallusPeitto, aktiivinen != null && loytoAlku < 0 ? 1f : 0f, Time.unscaledDeltaTime / 0.35f);
            if (kimallusPeitto <= 0f) { if (kimallus != null) kimallus.SetActive(false); return; }
            if (kimallusVarjostin == null) return;
            if (kimallus == null)
            {
                kimallusMesh = new Mesh { name = "Kimallus" };
                kimallusMesh.SetVertices(new[] { Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero });
                kimallusMesh.SetUVs(0, new[] { new Vector2(-1, -1), new Vector2(1, -1), new Vector2(1, 1), new Vector2(-1, 1) });
                kimallusMesh.SetTriangles(new[] { 0, 1, 2, 0, 2, 3 }, 0);
                kimallusMesh.bounds = new Bounds(Vector3.zero, Vector3.one * 6f);
                kimallusM = new Material(kimallusVarjostin) { name = "Kimallus" };
                kimallusM.SetColor(IdVari, new Color(1f, 0.9f, 0.62f));
                kimallus = new GameObject("Kimallus") { layer = DioraamaNayttamo.Kerros };
                kimallus.transform.SetParent(juuri, false);
                kimallus.AddComponent<MeshFilter>().sharedMesh = kimallusMesh;
                var rr = kimallus.AddComponent<MeshRenderer>();
                rr.sharedMaterial = kimallusM;
                rr.shadowCastingMode = ShadowCastingMode.Off;
                rr.receiveShadows = false;
            }
            if (aktiivinen != null)
            {
                kimallus.transform.position = DioraamaNayttamo.UnityPiste(aktiivinen.Kohde);
                kimallusM.SetFloat(IdKoko, Mathf.Max(0.6f, (float)aktiivinen.Sade * 1.4f));
            }
            kimallus.SetActive(true);
            // Keskustelun puolilähikuvassa kimallus himmenee (Siirtoseppä 7.10.: keittiön sinettivihje oli kokin kasvojen edessä).
            himmennysNyt = Mathf.MoveTowards(himmennysNyt, Himmennys ? 0f : 1f, Time.unscaledDeltaTime / 0.4f);   // Päätoimittaja 7.10.: piiloon keskustelukuvissa
            kimallusM.SetFloat(IdPeitto, kimallusPeitto * 0.9f * himmennysNyt);
            kimallusM.SetFloat(IdAika, vahennettyLiike ? 0.4f : (float)(t * 1.3 % 3600.0));
        }

        /// <summary>Napautus tilassa: osuuko aktiiviseen vaiheeseen (kohteen säde ruudulle projisoituna, vähintään 36 pt).
        /// Tosi = napautus käytetty (ei kohdisteta muuta).</summary>
        public bool Napauta(Rakennus r, Vector2 ruutu, Camera kamera)
        {
            if (aktiivinen == null || kamera == null || loytoAlku >= 0) return false;
            var k = DioraamaNayttamo.UnityPiste(aktiivinen.Kohde);
            var p = kamera.WorldToScreenPoint(k);
            if (p.z <= 0f) return false;
            var reuna = kamera.WorldToScreenPoint(k + kamera.transform.right * (float)aktiivinen.Sade);
            float sade = Mathf.Max(36f * (Screen.dpi > 0 ? Screen.dpi / 163f : 2f), Vector2.Distance(p, reuna));
            if (Vector2.Distance(new Vector2(p.x, p.y), ruutu) > sade) return false;
            return Suorita(r);
        }

        /// <summary>Aktiivisen vaiheen suoritus (napautus tai kehittäjän "poikki etsinta seuraava"). Tosi = suoritettiin.</summary>
        public bool Suorita(Rakennus r)
        {
            if (aktiivinen == null || loytoAlku >= 0 || r?.Etsinnat == null) return false;
            var e = r.Etsinnat.Find(x => x.Id == aktiivinen.Etsinta);
            Merkitse(e.Id, aktiivinen.Vaihe);
            string otsikko = aktiivinen.Tyyppi == "repliikki" && !string.IsNullOrEmpty(aktiivinen.Hahmo)
                ? Isolla(aktiivinen.Hahmo) : aktiivinen.Tyyppi == "loyto" ? e.Nimi ?? "Löytö" : "Vihje";
            string teksti = aktiivinen.Teksti;
            if (aktiivinen.Tyyppi == "loyto")
            {
                teksti = (e.Kuvaus ?? "") + (e.Kortti.Count > 0 ? "\n\n" + e.Kortti[0].Teksti : "");
                avautuva = Hae(aktiivinenTila.Id, aktiivinen.Kansi);
                nouseva = Hae(aktiivinenTila.Id, aktiivinen.Esine);
                loytoAlku = Time.unscaledTime;
                loytoId = e.Id;
            }
            // Pulun kommentti (Päätoimittajan teksti datassa) kortin loppuun; paikkamerkkejä ei näytetä.
            if (!string.IsNullOrEmpty(aktiivinen.Pulu) && !aktiivinen.Pulu.StartsWith("PAIKKAMERKKI", StringComparison.Ordinal))
                teksti = (string.IsNullOrEmpty(teksti) ? "" : teksti + "\n\n") + "Pulu: " + aktiivinen.Pulu;
            Debug.Log($"MATKAKIRJA linssit: poikki: etsintä {e.Id} vaihe {aktiivinen.Vaihe}/{e.Vaiheet.Count} ({aktiivinen.Tyyppi})");
            if (loytoId != null) { loytoOtsikko = otsikko; loytoTeksti = teksti; if (avautuva == null && nouseva == null) PaataLoyto(); }
            else Nayta?.Invoke(otsikko, teksti);
            return true;
        }

        void PaataLoyto()
        {
            string id = loytoId; loytoId = null;
            if (id == null) return;
            var tulos = Kutsu("LoydaMatkamuisto", id);
            if (tulos == null) Debug.LogWarning("MATKAKIRJA etsintä: PeliOhjain.LoydaMatkamuisto puuttuu (pelipuolen haara ei tässä käännöksessä)");
            if (tulos == null || (loytoTeksti != null && loytoTeksti.Contains("Pulu: "))) Nayta?.Invoke(loytoOtsikko, loytoTeksti);
            loytoOtsikko = loytoTeksti = null;
        }

        static string Isolla(string s) => string.IsNullOrEmpty(s) ? s : char.ToUpperInvariant(s[0]) + s.Substring(1);

        void AnimoiLoyto()
        {
            if (loytoAlku < 0) return;
            float kulunut = Time.unscaledTime - loytoAlku;
            if (avautuva?.Kaantaja != null)
            {
                float u = Mathf.SmoothStep(0f, 1f, Mathf.Clamp01(kulunut / KansiS));
                avautuva.Kaantaja.transform.localRotation = Quaternion.AngleAxis(-(float)avautuva.Data.Avaa * u, avautuva.Akseli);
            }
            if (nouseva?.Go != null)
            {
                float u = Mathf.Clamp01((kulunut - KansiS * 0.6f) / SinettiS);
                nouseva.Go.transform.position = Vector3.up * (0.3f * Mathf.SmoothStep(0f, 1f, u));
                if (u >= 1f) nouseva.Go.SetActive(false);
            }
            if (kulunut > KansiS * 0.6f + SinettiS + 0.1f) { loytoAlku = -1f; avautuva = null; nouseva = null; PaataLoyto(); }
        }

        public void Tyhjenna()
        {
            PaataLoyto(); // linssi suljettiin kesken arkun avautumisen: löytö kirjataan silti peliin
            foreach (var e in esineet.Values)
            {
                if (e.Go != null)
                {
                    foreach (var mf in e.Go.GetComponentsInChildren<MeshFilter>()) if (mf.sharedMesh != null) UnityEngine.Object.Destroy(mf.sharedMesh);
                    UnityEngine.Object.Destroy(e.Go);
                }
                foreach (var m in e.M) if (m != null) UnityEngine.Object.Destroy(m);
            }
            esineet.Clear();
            if (kimallus != null) UnityEngine.Object.Destroy(kimallus);
            if (kimallusM != null) UnityEngine.Object.Destroy(kimallusM);
            if (kimallusMesh != null) UnityEngine.Object.Destroy(kimallusMesh);
            kimallus = null; kimallusM = null; kimallusMesh = null;
            avautuva = null; nouseva = null; loytoAlku = -1f; aktiivinen = null; AktiivinenRivi = null;
        }
    }
}
