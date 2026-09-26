// ELÄVÄ KARTTA, kohta 4: KIRJOITETTU MAAILMA (Linssiseppä 26.9.2026; Raamattu ELÄVÄ KARTTA kohta 4, omistajan hyväksymä
// video 14,5–18 s). Kuljettu reitti on isoisän kynänjälki (Kynaviiva-varjostin punaisella musteella, isoympyräkaaret
// kaupungista toiseen), ja uusin osuus piirtyy KynanKestoS:ssa saapumisen jälkeen; vanhat ovat valmiina, joten levossa
// mikään ei muutu (lepopiirto: herätys vain piirron ajaksi). Käydyt kaupungit hehkuvat kaukana pallolla (väliaikainen
// Pehmeapiste-hehku; Natiivisepän yövalomaski korvaa sen), ja hehku häipyy lähelle zoomatessa.
//
// Reitti: ElavaMatka.Reitti, oletuksena pelin kuljettu reitti (Pelikoodarin PeliOhjain.KuljettuReitti: uusi osuus
// lisätään vasta, kun kamera on perillä, KuljettuReittiKasvoi). Hehku tulee käytyjen kaupunkien joukosta
// (Pelaaja.Kaydyt), testissä reitistä. Testi: "elava reitti <kaupunki> <kaupunki> …" (korvaa reitin) ja "elava reitti pois".
using System;
using System.Collections.Generic;
using System.Linq;
using CesiumForUnity;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Elava;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class ElavaMatka : MonoBehaviour
    {
        /// <summary>Kuljettu reitti kaupunkien tunnuksina aikajärjestyksessä (oletus PelinReitti); null = ei reittiä.</summary>
        public static Func<IReadOnlyList<string>> Reitti = PelinReitti;
        /// <summary>Testikomennon reitti (voittaa Reitin).</summary>
        static List<string> testiReitti;

        public const float KynanKestoS = 1.1f, ViivaPt = 2.4f;
        /// <summary>Hehku näkyy, kun kamera on vähintään HehkuAlkaaM korkeudella, ja on täysi HehkuTaysiM:ssä.</summary>
        public const double HehkuAlkaaM = 2_500_000, HehkuTaysiM = 6_000_000;
        public const float HehkuPt = 26f;
        /// <summary>Viiva häipyy matalalla (1,8 km:n nosto erottuisi maastosta): näkyy HehkuAlkaaM:n sijaan jo ViivaAlkaaM:stä.</summary>
        public const double ViivaAlkaaM = 8_000, ViivaTaysiM = 25_000;

        static ElavaMatka instanssi;

        // Pelin reitti ilman kehysvarauksia: kopio kasvaa KuljettuReittiKasvoi-tapahtumasta (kamera perillä), ja koko
        // reitti tahdistetaan, kun pelaaja tai peli vaihtuu (listan viite) tai reitti lyhenee.
        static readonly List<string> kuljettu = new List<string>();
        static object kuljettuLahde;
        static PeliOhjain kytkettyOhjain;

        static IReadOnlyList<string> PelinReitti()
        {
            var po = PeliOhjain.Instanssi;
            if (po == null) return null;
            if (kytkettyOhjain != po)
            {
                kytkettyOhjain = po;
                po.KuljettuReittiKasvoi += (a, b, tapa) =>
                {
                    if (b != null && (kuljettu.Count == 0 || kuljettu[kuljettu.Count - 1] != b)) kuljettu.Add(b);
                };
            }
            var r = po.KuljettuReitti;
            if (!ReferenceEquals(r, kuljettuLahde) || r.Count < kuljettu.Count)
            {
                kuljettuLahde = r;
                kuljettu.Clear();
                foreach (var p in r)
                    if (p?.Kaupunki != null && (kuljettu.Count == 0 || kuljettu[kuljettu.Count - 1] != p.Kaupunki)) kuljettu.Add(p.Kaupunki);
            }
            return kuljettu;
        }
        LinssiOhjain ohjain;
        PalloKierto kierto;
        CesiumGeoreference georeferenssi;
        Camera kamera;
        Material viiva, hehku;
        Mesh viivaMesh, hehkuMesh;
        readonly List<UnityEngine.Object> roskat = new List<UnityEngine.Object>();
        List<string> piirretty = new List<string>();
        static readonly List<string> Tyhja = new List<string>();
        readonly List<LatLon> valot = new List<LatLon>();
        float aika, uusiAlku = -100;
        Vector3 edellinenKamera;
        float edellinenHehku = -1;
        // Hehkun joukko lasketaan uudelleen vain, kun reitti rakennetaan tai käytyjen joukko muuttuu (ei kehysvarauksia).
        bool valotLikaiset = true;
        HashSet<string> kaydytViite;
        int kaydytMaara = -1;
        readonly List<Vector3> hPaikat = new List<Vector3>();
        readonly List<Color> hVarit = new List<Color>();
        readonly List<Vector2> hKulmat = new List<Vector2>();
        readonly List<int> hKolmiot = new List<int>();

        public static void Kytke(LinssiOhjain o)
        {
            var kierto = FindAnyObjectByType<PalloKierto>();
            if (kierto == null) return;
            var go = new GameObject("ElavaMatka");
            go.transform.SetParent(kierto.georeferenssi.transform, false);
            instanssi = go.AddComponent<ElavaMatka>();
            instanssi.ohjain = o;
            instanssi.kierto = kierto;
            instanssi.georeferenssi = kierto.georeferenssi;
            instanssi.kamera = kierto.GetComponent<Camera>();
        }

        /// <summary>Testikomento "elava reitti <kaupungit…> | pois".</summary>
        public static void Testi(string[] kaupungit, LinssiOhjain o)
        {
            testiReitti = kaupungit.Length == 1 && kaupungit[0] == "pois" ? null : kaupungit.ToList();
            o.Kirjaa("elävä: testireitti " + (testiReitti == null ? "pois" : string.Join(" → ", testiReitti)));
        }

        void Start()
        {
            var s = Resources.Load<Shader>("Varjostimet/Kynaviiva");
            if (s != null) { viiva = new Material(s); roskat.Add(viiva); viiva.SetColor("_BaseColor", new Color(0.70f, 0.16f, 0.12f, 0.95f)); viiva.SetFloat("_Paksuus", ViivaPt); }
            var p = Resources.Load<Shader>("Varjostimet/Pehmeapiste");
            if (p != null) { hehku = new Material(p); roskat.Add(hehku); hehku.SetFloat("_Lahde", (float)BlendMode.One); hehku.SetFloat("_Kohde", (float)BlendMode.One); hehku.SetFloat("_Ydin", 5); hehku.SetFloat("_Halo", 0.5f); }
            viivaMesh = new Mesh { name = "Kuljettu reitti", indexFormat = IndexFormat.UInt32 }; roskat.Add(viivaMesh);
            hehkuMesh = new Mesh { name = "Käydyt kaupungit" }; roskat.Add(hehkuMesh);
            if (viiva != null) Kappale("Kuljettu reitti", viivaMesh, viiva);
            if (hehku != null) Kappale("Käydyt kaupungit", hehkuMesh, hehku);
        }

        void Kappale(string nimi, Mesh mesh, Material m)
        {
            var go = new GameObject(nimi);
            go.transform.SetParent(transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterial = m;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
        }

        Vector3 Paikka(LatLon q, double korkeus)
        {
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(q.Lon, q.Lat, korkeus));
            return (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
        }

        static bool Kaupunki(string id, out LatLon paikka)
        {
            paikka = default;
            var po = PeliOhjain.Instanssi;
            if (id == null || po?.Verkko == null || !po.Verkko.Kaupungit.TryGetValue(id, out var k)) return false;
            paikka = new LatLon(k.Lat, k.Lon);
            return true;
        }

        void Update()
        {
            aika += Time.unscaledDeltaTime;
            if (georeferenssi == null || kamera == null || PeliOhjain.Instanssi?.Verkko == null) return;
            // Reitti kopioidaan vain muuttuessaan; asettamaton tai "pois" tyhjentää viivan.
            IReadOnlyList<string> reitti = testiReitti ?? Reitti?.Invoke();
            if (!Sama(reitti ?? Tyhja, piirretty)) RakennaReitti(reitti?.ToList() ?? Tyhja);
            // Maan keskipiste georeferenssin avaruudessa (origo on pinnalla, ei keskellä) ja kameran korkeus.
            var keskus = (Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            var kameraL = georeferenssi.transform.InverseTransformPoint(kamera.transform.position);
            double korkeus = (kameraL - keskus).magnitude - 6_371_000;
            if (viiva != null)
            {
                viiva.SetFloat("_Aika", aika);
                viiva.SetFloat("_Kerroin", LinssiOhjain.Pistekerroin);
                viiva.SetFloat("_Peitto", Mathf.Clamp01((float)((korkeus - ViivaAlkaaM) / (ViivaTaysiM - ViivaAlkaaM))));
                var kw = georeferenssi.transform.TransformPoint(keskus);
                viiva.SetVector("_Keskus", new Vector4(kw.x, kw.y, kw.z, 1));
            }
            PaivitaHehku(reitti, keskus, kameraL, korkeus);
        }

        static bool Sama(IReadOnlyList<string> a, List<string> b)
        {
            if (a.Count != b.Count) return false;
            for (int i = 0; i < a.Count; i++) if (a[i] != b[i]) return false;
            return true;
        }

        /// <summary>Reitti isoympyräkaarina (0,5° välein); uusin osuus piirtyy nyt, vanhat valmiina.</summary>
        void RakennaReitti(List<string> reitti)
        {
            valotLikaiset = true;
            bool jatkuu = reitti.Count > piirretty.Count && piirretty.Count > 0 && reitti.Take(piirretty.Count).SequenceEqual(piirretty);
            piirretty = reitti;
            uusiAlku = jatkuu ? aika : -100;
            var paikat = new List<Vector3>(); var seuraavat = new List<Vector3>(); var puolet = new List<Vector2>();
            var piirto = new List<Vector4>(); var kolmiot = new List<int>();
            for (int i = 1; i < reitti.Count; i++)
            {
                if (!Kaupunki(reitti[i - 1], out var a) || !Kaupunki(reitti[i], out var b)) continue;
                double kulma = Kameramatikka.KulmaAsteina(a, b);
                if (kulma < 1e-6) continue;
                int osia = Math.Max(1, (int)Math.Ceiling(kulma / 0.5));
                bool uusin = i == reitti.Count - 1;
                float alku = uusin ? uusiAlku : -100, kesto = uusin ? KynanKestoS : 0.01f;
                var u = new List<Vector3>();
                var matkat = new List<float>();
                for (int s = 0; s <= osia; s++) { u.Add(Paikka(Kameramatikka.IsoympyranPiste(a, b, (double)s / osia), 1800)); matkat.Add((float)(kulma * s / osia)); }
                int pohja = paikat.Count;
                for (int k = 0; k < u.Count; k++)
                {
                    Vector3 seur = k < u.Count - 1 ? u[k + 1] : u[k] + (u[k] - u[k - 1]);
                    for (int puoli = 0; puoli < 2; puoli++)
                    {
                        paikat.Add(u[k]); seuraavat.Add(seur);
                        puolet.Add(new Vector2(puoli == 0 ? -1 : 1, matkat[k]));
                        piirto.Add(new Vector4(alku, kesto, (float)kulma, 0));
                    }
                }
                for (int k = 0; k < u.Count - 1; k++)
                {
                    int q = pohja + k * 2;
                    kolmiot.AddRange(new[] { q, q + 1, q + 2, q + 1, q + 3, q + 2 });
                }
            }
            viivaMesh.Clear();
            viivaMesh.SetVertices(paikat); viivaMesh.SetUVs(0, seuraavat); viivaMesh.SetUVs(1, puolet); viivaMesh.SetUVs(2, piirto);
            viivaMesh.SetTriangles(kolmiot, 0);
            viivaMesh.RecalculateBounds();
            // Lepopiirto: vain uuden osuuden piirron ajan.
            if (jatkuu) PallonLepo.Herata(KynanKestoS + 0.2f, "elävä reitti");
            else PallonLepo.Muuttui("elävä reitti");
            ohjain?.Kirjaa($"elävä: kuljettu reitti {reitti.Count} kaupunkia{(jatkuu ? ", uusi osuus piirtyy" : "")}");
        }

        /// <summary>Käytyjen kaupunkien hehku kaukana: rakennetaan vain, kun kamera tai joukko muuttuu (lepo säilyy).</summary>
        void PaivitaHehku(IReadOnlyList<string> reitti, Vector3 keskus, Vector3 kameraL, double korkeus)
        {
            if (hehkuMesh == null) return;
            // Lähde: käydyt kaupungit (yövalot vain käydyissä), testireitillä reitti.
            var kaydyt = testiReitti == null ? PeliOhjain.Instanssi?.Matka?.Tila?.Pelaaja?.Kaydyt : null;
            if (!ReferenceEquals(kaydyt, kaydytViite) || (kaydyt?.Count ?? -1) != kaydytMaara)
            {
                kaydytViite = kaydyt; kaydytMaara = kaydyt?.Count ?? -1; valotLikaiset = true;
            }
            bool joukko = valotLikaiset;
            if (valotLikaiset)
            {
                valotLikaiset = false;
                valot.Clear();
                IEnumerable<string> lahde = (IEnumerable<string>)kaydyt ?? reitti;
                if (lahde != null) foreach (var id in lahde.Distinct()) if (Kaupunki(id, out var q)) valot.Add(q);
            }
            float voima = Mathf.Clamp01((float)((korkeus - HehkuAlkaaM) / (HehkuTaysiM - HehkuAlkaaM)));
            bool muuttui = joukko || (kameraL - edellinenKamera).sqrMagnitude > 1f || Mathf.Abs(voima - edellinenHehku) > 0.01f;
            if (!muuttui) return;
            edellinenKamera = kameraL; edellinenHehku = voima;
            hehkuMesh.Clear();
            if (voima <= 0.001f || valot.Count == 0) return;
            var paikat = hPaikat; var varit = hVarit; var kulmat = hKulmat; var kolmiot = hKolmiot;
            paikat.Clear(); varit.Clear(); kulmat.Clear(); kolmiot.Clear();
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            foreach (var q in valot)
            {
                var c = Paikka(q, 3000);
                Vector3 kohti = kameraL - c;
                float etaisyys = kohti.magnitude;
                float koko = HehkuPt * LinssiOhjain.Pistekerroin * etaisyys * tanPuoli / Mathf.Max(1, Screen.height);
                Vector3 k = kohti / Mathf.Max(1, etaisyys);
                Vector3 ylos = (c - keskus).normalized;
                if (Vector3.Dot(ylos, k) < 0.02f) continue;   // pallon takapuoli (ZTest Always)
                Vector3 oikea = Vector3.Cross(ylos, k).normalized * koko;
                Vector3 yla = Vector3.Cross(k, oikea).normalized * koko;
                int pohja = paikat.Count;
                paikat.Add(c - oikea - yla); paikat.Add(c + oikea - yla); paikat.Add(c + oikea + yla); paikat.Add(c - oikea + yla);
                var vari = new Color(1f, 0.74f, 0.35f, 0.85f * voima);
                for (int i = 0; i < 4; i++) varit.Add(vari);
                kulmat.Add(new Vector2(-1, -1)); kulmat.Add(new Vector2(1, -1)); kulmat.Add(new Vector2(1, 1)); kulmat.Add(new Vector2(-1, 1));
                kolmiot.AddRange(new[] { pohja, pohja + 1, pohja + 2, pohja, pohja + 2, pohja + 3 });
            }
            hehkuMesh.SetVertices(paikat); hehkuMesh.SetColors(varit); hehkuMesh.SetUVs(0, kulmat); hehkuMesh.SetTriangles(kolmiot, 0);
            hehkuMesh.RecalculateBounds();
        }

        void OnDestroy()
        {
            foreach (var o in roskat) if (o != null) Destroy(o);
            if (instanssi == this) instanssi = null;
        }
    }
}
