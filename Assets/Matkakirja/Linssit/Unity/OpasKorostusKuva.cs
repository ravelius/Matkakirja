// OPPAAN KOHTEEN KOROSTUS (omistaja 5.10.2026 juna 145: "Strøget-tien päälle korostusviiva tai muuta visuaalista nostoa";
// Päätoimittaja: rakennukselle tai alueelle pehmeä hehkuva rengas maahan (säde koko_m), kadulle ja kanavalle hehkuva viiva
// workerin reittipisteitä pitkin; hillitty harmaan lasin teeman sävy; häivytys sisään saapuessa). Siirtoseppä.
// Oma GameObject (ei johdettu Googlen laatoista, Googlen policy sallii omat 3D-objektit) kaupungin piirtokerroksessa
// (CesiumKaupunki.Kerros), georeferenssin lapsena; verteksit ECEF → georeferenssin paikallinen (origo siirtyy vain saapuessa,
// ja korostus luodaan siirron jälkeen ja piilotetaan ennen seuraavaa).
// Varjostin Sprites/Default (aina mukana, GraphicsSettings 10753): läpinäkyvä, verteksiväri × materiaalin väri, ZWrite pois.
// Kutsut (OpasSovitin): Saapui (origon siirron jälkeen) → Nayta(kohde, maa, georef), Puhuu → Lentaa ja Sulje → Piilota().
// Data: OpasKohde.Korostus (Ydin, Pelikoodarin muoto): "piste" | "alue" → rengas Pisteet[0]:n ympärille säteellä SadeM
// (0 → KokoM/2), "reitti" → viiva pisteiden kautta; ilman korostusta rengas kohteen ympärille.
// HENTO KOROSTUS (Linssiseppä 8.10.2026, suunnitelma A1, docs/raportit/pallo-elava-kaupunki-20261008.md): saapuessa hehku
// HehkuS ajan täydellä voimalla, sitten laskee HeikkoOsuuteen (kohde näkyy, korostus ei kilpaile kertojan kanssa); renkaan
// reunalle pehmeä valoverho ylöspäin (VerhoM, häipyy ylös), joka rakennusten takana jää niiden peittoon (ZTest, ei peitä kohdetta,
// Map Tiles C1); sävy lämmin kultareuna. Oma geometria laattojen päällä, ei Googlen geometrian muokkausta.
using System;
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit.Kierros;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class OpasKorostusKuva
    {
        /// <summary>Sävy: kylmä vaalea lasi (ei kirkas neon), huippualfa.</summary>
        public static readonly Color Savy = new Color(1f, 0.88f, 0.62f, 1f);   // A1: lämmin kultareuna (ennen kylmä lasi 0,86/0,93/1)
        public const float Alfa = 0.55f, HaivytysS = 0.9f, PoistoS = 0.5f, HengitysS = 3.2f, HengitysOsuus = 0.12f;
        /// <summary>A1: saapumisen hehku (s täydellä voimalla), lasku heikkoon (s) ja heikon voima.</summary>
        public const float HehkuS = 2.5f, HehkuLaskuS = 1.5f, HeikkoOsuus = 0.45f;
        /// <summary>A1: valoverhon korkeus renkaan reunalla (m; enintään puolet säteestä) ja sen alfa alhaalla.</summary>
        public const float VerhoM = 24f, VerhoAlfa = 0.32f;
        /// <summary>Oppaan korostusosuus 0–1 (OpasSilmukka.KorostusOsuus, sovitin joka kehys; Päätoimittaja 8.10. 07.5x): rengas
        /// sammuu lähdön valmistelussa ennen liikettä ja syttyy saapumisesta, ei yhdessä ruudussa.</summary>
        public static float Osuus = 1f;
        public const float RengasLeveysOsuus = 0.12f, RengasMinLeveysM = 6f, ViivaLeveysM = 9f, NostoM = 3f;
        public const int RengasJaot = 72;

        static KorostusAjo ajo;
        static Material materiaali;

        /// <summary>Näytä kohteen korostus (OpasKohde.Korostus tai oletusrengas KokoM/2).</summary>
        public static void Nayta(OpasKohde k, double maaM, CesiumGeoreference georef)
        {
            Piilota(true);
            if (k == null || georef == null) return;
            var kr = k.Korostus;
            Mesh mesh;
            if (kr != null && kr.Reitti && kr.Pisteet != null && kr.Pisteet.Length >= 2) mesh = Viiva(georef, kr.Pisteet, maaM + NostoM);
            else
            {
                double lat = k.Lat, lon = k.Lon, sade = Math.Max(25, k.KokoM * 0.5);
                if (kr != null && kr.Pisteet != null && kr.Pisteet.Length > 0) { lat = kr.Pisteet[0].lat; lon = kr.Pisteet[0].lon; if (kr.SadeM > 0) sade = Math.Max(15, kr.SadeM); }
                mesh = Rengas(georef, lat, lon, sade, maaM + NostoM);
            }
            if (mesh == null) return;
            var go = new GameObject("Opas korostus: " + k.Nimi) { layer = CesiumKaupunki.Kerros };
            go.transform.SetParent(georef.transform, false);   // verteksit georeferenssin paikallisessa avaruudessa (kuten AiheValot)
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterial = Materiaali();
            r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            r.receiveShadows = false;
            ajo = go.AddComponent<KorostusAjo>();
            ajo.Aloita(r, mesh);
            Debug.Log($"MATKAKIRJA linssit: opas: korostus {mesh.name} {k.Nimi} ({(kr?.Tyyppi ?? "oletus")})");
        }

        /// <summary>Lennon alussa: häivytä pois (heti = tuhoa saman tien).</summary>
        public static void Piilota(bool heti = false)
        {
            if (ajo == null) return;
            if (heti) { ajo.Tuhoa(); ajo = null; return; }
            ajo.Haivyta(); ajo = null;
        }

        static Material Materiaali()
        {
            if (materiaali != null) return materiaali;
            var s = Shader.Find("Sprites/Default") ?? Shader.Find("UI/Default");
            materiaali = new Material(s) { name = "OpasKorostusKuva", renderQueue = 3100 };
            return materiaali;
        }

        static Vector3 Unity(CesiumGeoreference g, double lat, double lon, double h)
        {
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, h));
            var u = g.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            return new Vector3((float)u.x, (float)u.y, (float)u.z);
        }

        /// <summary>Piste etäisyydellä (m) ja suuntimalla (°) kohteesta, pieni kulma-approksimaatio (kaupungin mittakaava).</summary>
        static (double lat, double lon) Siirra(double lat, double lon, double m, double suuntimaAst)
        {
            double r = suuntimaAst * math.PI_DBL / 180, dLat = m * math.cos(r) / 111320.0;
            double dLon = m * math.sin(r) / (111320.0 * math.cos(lat * math.PI_DBL / 180));
            return (lat + dLat, lon + dLon);
        }

        static Mesh Rengas(CesiumGeoreference g, double lat, double lon, double sade, double h)
        {
            double leveys = math.max(RengasMinLeveysM, sade * RengasLeveysOsuus);
            var v = new List<Vector3>(); var c = new List<Color>(); var t = new List<int>();
            for (int i = 0; i <= RengasJaot; i++)
            {
                double a = 360.0 * i / RengasJaot;
                foreach (var (m, al) in new[] { (sade - leveys, 0f), (sade, Alfa), (sade + leveys, 0f) })
                {
                    var (pl, pn) = Siirra(lat, lon, m, a);
                    v.Add(Unity(g, pl, pn, h)); c.Add(new Color(1, 1, 1, al));
                }
                if (i > 0) Nauha(t, (i - 1) * 3, i * 3);
            }
            // Valoverho renkaan keskiviivalta ylöspäin (A1): alhaalla VerhoAlfa, ylhäällä 0; kaksipuolinen kuten nauha.
            int v0 = v.Count; double korkeus = math.min(VerhoM, sade * 0.5);
            for (int i = 0; i <= RengasJaot; i++)
            {
                var (pl, pn) = Siirra(lat, lon, sade, 360.0 * i / RengasJaot);
                v.Add(Unity(g, pl, pn, h)); c.Add(new Color(1, 1, 1, VerhoAlfa));
                v.Add(Unity(g, pl, pn, h + korkeus)); c.Add(new Color(1, 1, 1, 0f));
                if (i > 0) { int a = v0 + (i - 1) * 2, b = v0 + i * 2; t.AddRange(new[] { a, b, a + 1, a + 1, b, b + 1, a, a + 1, b, a + 1, b + 1, b }); }
            }
            return Luo("rengas", v, c, t);
        }

        static Mesh Viiva(CesiumGeoreference g, (double lat, double lon)[] pisteet, double h)
        {
            var v = new List<Vector3>(); var c = new List<Color>(); var t = new List<int>();
            double puoli = ViivaLeveysM * 0.5;
            for (int i = 0; i < pisteet.Length; i++)
            {
                // Suunta pisteessä: edellisestä seuraavaan (päissä yksipuolinen); poikittain ± puoli leveyttä.
                var a = pisteet[math.max(0, i - 1)]; var b = pisteet[math.min(pisteet.Length - 1, i + 1)];
                double suunta = OpasSilmukka.Suunta(a.lat, a.lon, b.lat, b.lon);
                // Päät häivytetään (ei terävää loppua).
                float paa = pisteet.Length < 3 ? 1f : (i == 0 || i == pisteet.Length - 1 ? 0.35f : 1f);
                foreach (var (m, al) in new[] { (-puoli, 0f), (0.0, Alfa * paa), (puoli, 0f) })
                {
                    var (pl, pn) = Siirra(pisteet[i].lat, pisteet[i].lon, m, suunta + 90);
                    v.Add(Unity(g, pl, pn, h)); c.Add(new Color(1, 1, 1, al));
                }
                if (i > 0) Nauha(t, (i - 1) * 3, i * 3);
            }
            return Luo("viiva", v, c, t);
        }

        /// <summary>Kaksi 3 verteksin poikkileikkausta → 4 kolmiota (molemmat puolet: Sprites/Default ei karsi taustapintoja).</summary>
        static void Nauha(List<int> t, int a, int b)
        {
            t.AddRange(new[] { a, b, a + 1, a + 1, b, b + 1, a + 1, b + 1, a + 2, a + 2, b + 1, b + 2 });
        }

        static Mesh Luo(string nimi, List<Vector3> v, List<Color> c, List<int> t)
        {
            var m = new Mesh { name = nimi };
            m.SetVertices(v); m.SetColors(c); m.SetTriangles(t, 0); m.RecalculateBounds();
            return m;
        }
    }

    /// <summary>Häivytys sisään (HaivytysS), kevyt hengitys ja häivytys pois (PoistoS) materiaalin värillä.</summary>
    public sealed class KorostusAjo : MonoBehaviour
    {
        MeshRenderer r; Mesh mesh; MaterialPropertyBlock mpb; float alku, poisAlku = -1;
        static readonly int Vari = Shader.PropertyToID("_Color");

        public void Aloita(MeshRenderer renderer, Mesh m) { r = renderer; mesh = m; mpb = new MaterialPropertyBlock(); alku = Time.unscaledTime; Paivita(); }
        public void Haivyta() { if (poisAlku < 0) poisAlku = Time.unscaledTime; }
        public void Tuhoa() { if (mesh != null) Destroy(mesh); Destroy(gameObject); }

        void Update() => Paivita();

        void Paivita()
        {
            float t = Time.unscaledTime;
            float sisaan = Mathf.SmoothStep(0, 1, (t - alku) / OpasKorostusKuva.HaivytysS);
            float pois = poisAlku < 0 ? 1 : 1 - Mathf.SmoothStep(0, 1, (t - poisAlku) / OpasKorostusKuva.PoistoS);
            float hengitys = 1 - OpasKorostusKuva.HengitysOsuus * 0.5f * (1 - Mathf.Cos(2 * Mathf.PI * (t - alku) / OpasKorostusKuva.HengitysS));
            // A1: hehku saapuessa, sitten heikko (kohde jää esiin, korostus ei kilpaile).
            float hehku = Mathf.Lerp(1f, OpasKorostusKuva.HeikkoOsuus, Mathf.SmoothStep(0f, 1f, (t - alku - OpasKorostusKuva.HehkuS) / OpasKorostusKuva.HehkuLaskuS));
            var c = OpasKorostusKuva.Savy; c.a = sisaan * pois * hengitys * hehku * Mathf.SmoothStep(0f, 1f, OpasKorostusKuva.Osuus);
            mpb.SetColor(Vari, c); r.SetPropertyBlock(mpb);
            if (poisAlku >= 0 && pois <= 0) Tuhoa();
        }
    }
}
