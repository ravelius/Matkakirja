// ELÄVÄ KARTTA, kohta 4: KIRJOITETTU MAAILMA (Linssiseppä 26.9.2026; Raamattu ELÄVÄ KARTTA kohta 4, omistajan hyväksymä
// video 14,5–18 s). Kuljettu reitti on isoisän kynänjälki (Kynaviiva-varjostin punaisella musteella, isoympyräkaaret
// kaupungista toiseen), ja uusin osuus piirtyy KynanKestoS:ssa saapumisen jälkeen; vanhat ovat valmiina, joten levossa
// mikään ei muutu (lepopiirto: herätys vain piirron ajaksi). Käydyt kaupungit hehkuvat kaukana pallolla (väliaikainen
// Pehmeapiste-hehku; Natiivisepän yövalomaski korvaa sen), ja hehku häipyy lähelle zoomatessa.
//
// Reitti: ElavaMatka.Reitti, oletuksena pelin kuljettu reitti (Pelikoodarin PeliOhjain.KuljettuReitti: uusi osuus
// lisätään vasta, kun kamera on perillä, KuljettuReittiKasvoi). Hehku tulee käytyjen kaupunkien joukosta
// (Pelaaja.Kaydyt), testissä reitistä. Osuus kulkee laudan reittiviivaa pitkin (PeliApu.ReittiPiste, lyhin maa- tai
// meripolku kulkutavan mukaan), lento ja polkua vailla oleva osuus isoympyränä. Testi: "elava reitti <kaupunki> <kaupunki> …" (korvaa reitin) ja "elava reitti pois".
using System;
using System.Collections.Generic;
using System.Linq;
using CesiumForUnity;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Elava;
using Matkakirja.Peli;
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

        public const float KynanKestoS = 1.1f, ViivaPt = 5.5f;
        /// <summary>Tummanpunainen, läpikuultava (omistaja 26.9. klo 09.5x).</summary>
        static readonly Color Vari = new Color(0.50f, 0.02f, 0.03f, 0.65f);
        /// <summary>Hehku näkyy, kun kamera on vähintään HehkuAlkaaM korkeudella, ja on täysi HehkuTaysiM:ssä.</summary>
        public const double HehkuAlkaaM = 2_500_000, HehkuTaysiM = 6_000_000;
        public const float HehkuPt = 26f;
        /// <summary>Viiva häipyy matalalla (1,8 km:n nosto erottuisi maastosta): näkyy HehkuAlkaaM:n sijaan jo ViivaAlkaaM:stä.</summary>
        public const double ViivaAlkaaM = 8_000, ViivaTaysiM = 25_000;

        static ElavaMatka instanssi;

        // Pelin reitti ilman kehysvarauksia: kopio kasvaa KuljettuReittiKasvoi-tapahtumasta (kamera perillä), ja koko
        // reitti tahdistetaan, kun pelaaja tai peli vaihtuu (listan viite) tai reitti lyhenee.
        static readonly List<string> kuljettu = new List<string>();
        static readonly List<Kulkutapa?> kuljettuTavat = new List<Kulkutapa?>();
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
                    if (b != null && (kuljettu.Count == 0 || kuljettu[kuljettu.Count - 1] != b)) { kuljettu.Add(b); kuljettuTavat.Add(tapa); }
                };
            }
            var r = po.KuljettuReitti;
            if (!ReferenceEquals(r, kuljettuLahde) || r.Count < kuljettu.Count)
            {
                kuljettuLahde = r;
                kuljettu.Clear();
                kuljettuTavat.Clear();
                foreach (var p in r)
                    if (p?.Kaupunki != null && (kuljettu.Count == 0 || kuljettu[kuljettu.Count - 1] != p.Kaupunki)) { kuljettu.Add(p.Kaupunki); kuljettuTavat.Add(p.Tapa); }
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
        // Laudan reittiviivat eivät olleet vielä valmiina (ReittiPiste null): rakennetaan uudelleen ilman piirtoa.
        static bool viivatKesken;
        int uusintoja;
        float seuraavaUusinta;
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

        /// <summary>Testikomento "elava reitti <kaupungit…> | pois | vari r g b a [pt]".</summary>
        public static void Testi(string[] kaupungit, LinssiOhjain o)
        {
            if (kaupungit.Length >= 5 && kaupungit[0] == "vari")
            {
                float F(int i) => float.Parse(kaupungit[i], System.Globalization.CultureInfo.InvariantCulture);
                var vari = new Color(F(1), F(2), F(3), F(4));
                float pt = kaupungit.Length >= 6 ? F(5) : ViivaPt;
                if (instanssi != null && instanssi.viiva != null)
                {
                    instanssi.viiva.SetColor("_BaseColor", vari);
                    instanssi.viiva.SetFloat("_Paksuus", pt);
                    PallonLepo.Muuttui("elävä reitti");
                }
                o.Kirjaa($"elävä: reitin väri {vari}, {pt} pt");
                return;
            }
            testiReitti = kaupungit.Length == 1 && kaupungit[0] == "pois" ? null : kaupungit.ToList();
            o.Kirjaa("elävä: testireitti " + (testiReitti == null ? "pois" : string.Join(" → ", testiReitti)));
        }

        void Start()
        {
            var s = Resources.Load<Shader>("Varjostimet/Kynaviiva");
            if (s != null) { viiva = new Material(s); roskat.Add(viiva); viiva.SetColor("_BaseColor", Vari); viiva.SetFloat("_Paksuus", ViivaPt); }
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
            if (!Sama(reitti ?? Tyhja, piirretty))
                RakennaReitti(reitti?.ToList() ?? Tyhja, testiReitti == null && ReferenceEquals(reitti, kuljettu) ? new List<Kulkutapa?>(kuljettuTavat) : null);
            else if (viivatKesken && uusintoja < 10 && aika >= seuraavaUusinta)
            {
                viivatKesken = false; uusintoja++; seuraavaUusinta = aika + 2;
                piirretty = new List<string>();   // seuraava kehys rakentaa koko reitin uudelleen (ei piirtoanimaatiota)
            }
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
        void RakennaReitti(List<string> reitti, List<Kulkutapa?> tavat)
        {
            valotLikaiset = true;
            bool jatkuu = reitti.Count > piirretty.Count && piirretty.Count > 0 && reitti.Take(piirretty.Count).SequenceEqual(piirretty);
            piirretty = reitti;
            uusiAlku = jatkuu ? aika : -100;
            var paikat = new List<Vector3>(); var seuraavat = new List<Vector3>(); var puolet = new List<Vector2>();
            var piirto = new List<Vector4>(); var kolmiot = new List<int>();
            for (int i = 1; i < reitti.Count; i++)
            {
                var viiva = OsuudenPisteet(reitti[i - 1], reitti[i], tavat != null && i < tavat.Count ? tavat[i] : null);
                if (viiva == null) continue;
                bool uusin = i == reitti.Count - 1;
                var u = new List<Vector3>();
                var matkat = new List<float>();
                double kulma = 0;
                for (int s = 0; s < viiva.Count; s++)
                {
                    if (s > 0) kulma += Kameramatikka.KulmaAsteina(viiva[s - 1], viiva[s]);
                    u.Add(Paikka(viiva[s], 1800)); matkat.Add((float)kulma);
                }
                if (kulma < 1e-6) continue;
                float alku = uusin ? uusiAlku : -100, kesto = uusin ? KynanKestoS : 0.01f;
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

        /// <summary>Osuuden a → b pisteet: laudan reittiviivaa pitkin lyhintä maa- tai meripolkua (kulkutavan mukaan; tuntematon
        /// tapa hyväksyy molemmat), lento ja polkua vailla oleva osuus isoympyränä 0,5°:n välein. null = kaupunki puuttuu.</summary>
        static List<LatLon> OsuudenPisteet(string a, string b, Kulkutapa? tapa)
        {
            if (!Kaupunki(a, out var pa) || !Kaupunki(b, out var pb)) return null;
            var v = PeliOhjain.Instanssi?.Verkko;
            if (tapa != Kulkutapa.Lento && v != null && PeliApu.ReittiPiste != null)
            {
                var polku = LyhinPolku(v, a, b, tapa);
                if (polku != null)
                {
                    var pisteet = new List<LatLon>();
                    for (int i = 1; i < polku.Count && pisteet != null; i++)
                    {
                        if (!Kaupunki(polku[i - 1], out var q0) || !Kaupunki(polku[i], out var q1)) { pisteet = null; break; }
                        int n = Mathf.Clamp((int)Math.Ceiling(Kameramatikka.KulmaAsteina(q0, q1) / 0.2), 6, 120);
                        for (int k = i == 1 ? 0 : 1; k <= n; k++)
                        {
                            var p = PeliApu.ReittiPiste(polku[i - 1] + "|" + polku[i], (double)k / n);
                            if (!p.HasValue) { pisteet = null; viivatKesken = true; break; }
                            pisteet.Add(new LatLon(p.Value.Lat, p.Value.Lon));
                        }
                    }
                    if (pisteet != null && pisteet.Count >= 2) return pisteet;
                }
            }
            double kulma = Kameramatikka.KulmaAsteina(pa, pb);
            int osia = Math.Max(1, (int)Math.Ceiling(kulma / 0.5));
            var ympyra = new List<LatLon>(osia + 1);
            for (int s = 0; s <= osia; s++) ympyra.Add(Kameramatikka.IsoympyranPiste(pa, pb, (double)s / osia));
            return ympyra;
        }

        /// <summary>Lyhin polku (kaarien määrä) laudan maa- tai merireittejä pitkin; null, jos yli 12 kaarta tai ei yhteyttä.</summary>
        static List<string> LyhinPolku(IReittiverkko v, string a, string b, Kulkutapa? tapa)
        {
            if (a == b) return null;
            var edellinen = new Dictionary<string, string> { [a] = null };
            var jono = new Queue<string>();
            jono.Enqueue(a);
            while (jono.Count > 0 && !edellinen.ContainsKey(b))
            {
                var c = jono.Dequeue();
                var naapurit = v.Naapurireitit(c);
                if (naapurit == null) continue;
                foreach (var id in naapurit)
                {
                    if (!v.Reitit.TryGetValue(id, out var r)) continue;
                    if (tapa == Kulkutapa.Meri ? r.Laji != ReitinLaji.Meri : tapa.HasValue && r.Laji != ReitinLaji.Maa) continue;
                    string n = r.A == c ? r.B : r.A;
                    if (n == null || edellinen.ContainsKey(n)) continue;
                    edellinen[n] = c;
                    jono.Enqueue(n);
                }
            }
            if (!edellinen.ContainsKey(b)) return null;
            var polku = new List<string>();
            for (var c = b; c != null; c = edellinen[c]) polku.Add(c);
            polku.Reverse();
            return polku.Count <= 13 ? polku : null;
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
