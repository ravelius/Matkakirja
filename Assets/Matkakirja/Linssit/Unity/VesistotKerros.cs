// VESISTÖLINSSIN 3D-KERROS (web js/linssit/vesistot.js pallolle: Globe.gl
// polygonsData, pathsData ja CSS2D-nimet). Toteuttaa IVesistojenNakyman:
//
//   järvet — kaikki täytöt YHTENÄ meshinä omalla Tasavari-varjostimella
//            (Resources/Varjostimet/Tasavari.shader) ja reunat yhtenä
//            viivameshinä (Globe.gl polygonStroke = 1 px);
//   uomat  — yksi viivamesh per (laji, luokka): penkereet 1–2 ja uomat 1–3,
//            kukin monta erillistä nauhaa samassa meshissä. Materiaali on
//            Natiivisepän Viiva-materiaalin kopio (KarttaKerrokset.reitit.maa),
//            joten paksuus on ruutupisteitä kuten webin pathStroke. Kärkidata
//            kuten Kartta/Reitit.cs: paikka, seuraava (UV0) ja puoli + matka (UV1);
//   nimet  — TextMeshPro kuten havaintopisteissä: joka kehys kameraan päin ja
//            ruutupisteiden kokoon, takapuolen nimet piiloon normaalilla.
//
// PIIRTOJÄRJESTYS jonoilla (kaikki läpinäkyviä, ZWrite pois): järvet 3000,
// järvien reunat ja penkereet 3001, uomat luokittain 3002–3004 (pääjoki
// päällimmäisenä), nimet 3005 kuten kaupunkien nimiöt. Web piirtää samassa
// järjestyksessä: järvet, penkereet, uomat.
//
// KORKEUDET: webin JARVEN_KORKEUS 0,003 ja UOMAN_KORKEUS 0,004 ovat pallon
// säteitä (19 ja 25 km); VesistotPallolle.Metreina pitää vähintään 5 km:n
// noston kuten Natiivisepän viivoissa, jotta maastolaatat eivät peitä vettä.
// Takapuolen järvet ja uomat peittyvät pallon syvyyteen (ZTest LEqual).
using System.Collections.Generic;
using System.Linq;
using CesiumForUnity;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Vesistot;
using TMPro;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class VesistotKerros : MonoBehaviour, IVesistojenNakyma
    {
        const float Etuna = 0.02f;
        const int JonoJarvet = 3000, JonoPenkat = 3001, JonoUomat = 3002, JonoNimet = 3005;
        const float NimenKoko = 13f;

        sealed class Nimi
        {
            public Transform juuri;
            public Vector3 pinta, normaali;
        }

        CesiumGeoreference georeferenssi;
        Camera kamera;
        TMP_FontAsset fontti;
        Material viivaPohja;
        Shader tasavari;
        readonly List<Material> viivat = new List<Material>();
        readonly List<Material> muut = new List<Material>();
        readonly List<Mesh> meshit = new List<Mesh>();
        readonly List<Nimi> nimet = new List<Nimi>();

        public static VesistotKerros Luo(PalloKierto kierto)
        {
            var g = kierto.georeferenssi;
            var go = new GameObject("VesistotKerros");
            go.transform.SetParent(g.transform, false);
            var k = go.AddComponent<VesistotKerros>();
            k.georeferenssi = g;
            k.kamera = kierto.GetComponent<Camera>();
            var kartta = KarttaKerrokset.Instanssi;
            k.fontti = kartta != null && kartta.merkit != null ? kartta.merkit.fontti : null;
            k.viivaPohja = kartta != null && kartta.reitit != null ? kartta.reitit.maa : null;
            k.tasavari = Resources.Load<Shader>("Varjostimet/Tasavari");
            if (k.viivaPohja == null) Debug.LogWarning("MATKAKIRJA vesistöt: Viiva-materiaali puuttuu (KarttaKerrokset.reitit.maa), joet jäävät pois");
            if (k.tasavari == null) Debug.LogWarning("MATKAKIRJA vesistöt: Tasavari-varjostin puuttuu, järvien täyttö jää pois");
            return k;
        }

        // ── IVesistojenNakyma ─────────────────────────────────────────────

        // Verkot ja nimet rakennetaan Kehysjonolla (2 ms/kehys): vesistöjen avaus vei iPadilla 15,7 ms
        // (ui piikit 24.9., ajo 4). Järjestys säilyy: järvet, reunat, uomat ryhmittäin, nimet.
        public void Jarvet(IReadOnlyList<Jarvi> jarvet) => jono.Lisaa(() => RakennaJarvet(jarvet));

        void RakennaJarvet(IReadOnlyList<Jarvi> jarvet)
        {
            if (jarvet.Count == 0) return;
            if (tasavari != null)
            {
                var paikat = new List<Vector3>();
                var kolmiot = new List<int>();
                foreach (var j in jarvet)
                {
                    if (j.Verkko == null || j.Verkko.Kolmiot.Count == 0) continue;
                    int pohja = paikat.Count;
                    double h = VesistotPallolle.Metreina(j.Korkeus);
                    foreach (var p in j.Verkko.Karjet) paikat.Add(Unityyn(p, h));
                    foreach (var i in j.Verkko.Kolmiot) kolmiot.Add(pohja + i);
                }
                var mesh = UusiMesh("Järvet", paikat.Count);
                mesh.SetVertices(paikat);
                mesh.SetTriangles(kolmiot, 0);
                mesh.RecalculateBounds();
                var m = new Material(tasavari) { renderQueue = JonoJarvet };
                m.SetColor("_Vari", Vari(jarvet[0].Vari));
                muut.Add(m);
                Kappale("Järvet", mesh, m);
            }
            // Reuna: Globe.gl polygonStroke, yhden pikselin tumma viiva.
            var reunat = jarvet.Where(j => j.Reuna != null).ToList();
            if (reunat.Count > 0)
                Viivat("Järvien reunat", reunat.Select(j => (IReadOnlyList<LatLon>)j.Rengas),
                    VesistotPallolle.Metreina(reunat[0].Korkeus), reunat[0].Reuna, VesistotPallolle.JarvenReunaPx, JonoPenkat);
        }

        public void Uomat(IReadOnlyList<Vesipolku> polut)
        {
            // Yksi mesh per laji ja luokka; ryhmien järjestys pysyy (penkereet ensin).
            foreach (var ryhma in polut.GroupBy(p => (p.Laji, p.Tarkeys, p.Vari, p.Paksuus)))
            {
                var eka = ryhma.First();
                int jonoNro = eka.Laji == VesiLaji.Penger ? JonoPenkat : JonoUomat + Mathf.Clamp(3 - eka.Tarkeys, 0, 2);
                var pisteet = ryhma.Select(p => (IReadOnlyList<LatLon>)p.Pisteet).ToList();
                jono.Lisaa(() => Viivat($"{(eka.Laji == VesiLaji.Penger ? "Penkereet" : "Uomat")} {eka.Tarkeys}",
                    pisteet, VesistotPallolle.Metreina(eka.Korkeus), eka.Vari, eka.Paksuus, jonoNro));
            }
        }

        public void Nimet(IReadOnlyList<Vesinimi> lista)
        {
            if (fontti == null || nimetPyydetty) return;
            nimetPyydetty = true;
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            var materiaali = new Material(fontti.material) { renderQueue = JonoNimet };
            muut.Add(materiaali);
            double h = VesistotPallolle.Metreina(VesistotPallolle.UomanKorkeus);
            // Nimet kehys kerrallaan (Kehysjono): vesistöjen avaus 13 ms iPadilla (ui piikit 24.9.).
            foreach (var d in lista) jono.Lisaa(() => LuoNimi(d, keskus, materiaali, h));
        }

        readonly Kehysjono jono = new Kehysjono();
        bool nimetPyydetty;

        void LuoNimi(Vesinimi d, double3 keskus, Material materiaali, double h)
        {
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(d.Lon, d.Lat, h));
            double3 u = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            var juuri = new GameObject("Vesinimi " + d.Teksti).transform;
            juuri.SetParent(transform, false);
            var t = new GameObject("Nimi").AddComponent<TextMeshPro>();
            t.transform.SetParent(juuri, false);
            t.font = fontti;
            t.fontSharedMaterial = materiaali;
            t.text = d.Teksti;
            // css .pallolauta-vesinimi: kursiivi 13 px, tumma muste, vaalea hehku.
            t.fontSize = NimenKoko;
            t.fontStyle = FontStyles.Italic;
            t.characterSpacing = 6f;   // letter-spacing 0,06 em
            t.color = new Color32(20, 44, 68, 250);
            t.alignment = TextAlignmentOptions.Center;
            t.textWrappingMode = TextWrappingModes.NoWrap;
            t.outlineWidth = 0.2f;
            t.outlineColor = new Color32(247, 241, 226, 217);
            t.rectTransform.sizeDelta = new Vector2(400, 40);
            // TMP:n 3D-tekstin fonttikoko 10 = 1 yksikkö; juuren mittakaava on 1 yksikkö/piste.
            t.transform.localScale = Vector3.one * 10f;
            juuri.gameObject.SetActive(false);
            nimet.Add(new Nimi { juuri = juuri, pinta = (float3)u, normaali = (float3)math.normalize(u - keskus) });
        }

        public void Pois() => Destroy(gameObject);

        // ── Rakennus ──────────────────────────────────────────────────────

        Vector3 Unityyn(LatLon p, double korkeus)
        {
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(p.Lon, p.Lat, korkeus));
            return (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
        }

        static Color Vari(string hex) => ColorUtility.TryParseHtmlString(hex, out var c) ? c : Color.magenta;

        Mesh UusiMesh(string nimi, int karkia)
        {
            var mesh = new Mesh { name = nimi, indexFormat = karkia > 65535 ? IndexFormat.UInt32 : IndexFormat.UInt16 };
            meshit.Add(mesh);
            return mesh;
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

        /// <summary>
        /// Monta erillistä nauhaa yhteen meshiin (kärkidata kuten Kartta/Reitit.cs).
        /// Nauhojen välillä ei ole kolmioita, joten ne eivät yhdisty toisiinsa.
        /// </summary>
        void Viivat(string nimi, IEnumerable<IReadOnlyList<LatLon>> polut, double korkeus, string vari, double paksuus, int jono)
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
                for (int i = 0; i < n; i++) u.Add(Unityyn(polku[i], korkeus));
                int pohja = paikat.Count;
                double matka = 0;
                for (int i = 0; i < n; i++)
                {
                    if (i > 0) matka += Kameramatikka.KulmaAsteina(polku[i - 1], polku[i]);
                    // Viimeisellä pisteellä suunta jatkuu edellisestä.
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
            var mesh = UusiMesh(nimi, paikat.Count);
            mesh.SetVertices(paikat);
            mesh.SetUVs(0, seuraavat);
            mesh.SetUVs(1, puolet);
            mesh.SetTriangles(kolmiot, 0);
            mesh.RecalculateBounds();
            var m = new Material(viivaPohja) { renderQueue = jono };
            var c = Vari(vari);
            m.SetColor("_BaseColor", new Color(c.r, c.g, c.b, 1f));
            m.SetFloat("_Paksuus", (float)paksuus);
            m.SetVector("_Katko", Vector4.zero);   // yhtenäinen viiva
            viivat.Add(m);
            Kappale(nimi, mesh, m);
        }

        // ── Kehys ─────────────────────────────────────────────────────────

        void Update()
        {
            // Pisteet → pikselit kuten Reitit.Update (viivan paksuus ruutupisteinä).
            float kerroin = LinssiOhjain.Pistekerroin;
            foreach (var m in viivat) m.SetFloat("_Kerroin", kerroin);
        }

        void LateUpdate()
        {
            jono.Aja();
            if (kamera == null || nimet.Count == 0) return;
            var kt = kamera.transform;
            var gt = georeferenssi.transform;
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float kerroin = LinssiOhjain.Pistekerroin;
            float pisteita = Screen.height / kerroin;
            foreach (var p in nimet)
            {
                Vector3 paikka = gt.TransformPoint(p.pinta);
                Vector3 kohti = kt.position - paikka;
                float etaisyys = kohti.magnitude;
                // Takapuolen nimi piiloon: pinnan normaali poispäin kamerasta.
                bool edessa = etaisyys > 0 && Vector3.Dot(gt.TransformDirection(p.normaali), kohti / etaisyys) > 0.05f;
                if (p.juuri.gameObject.activeSelf != edessa) p.juuri.gameObject.SetActive(edessa);
                if (!edessa) continue;
                float lahella = etaisyys * (1f - Etuna);
                p.juuri.SetPositionAndRotation(kt.position - kohti / etaisyys * lahella, kt.rotation);
                p.juuri.localScale = Vector3.one * (2f * lahella * tanPuoli / pisteita);
            }
        }

        void OnDestroy()
        {
            foreach (var m in meshit) if (m != null) Destroy(m);
            foreach (var m in viivat) if (m != null) Destroy(m);
            foreach (var m in muut) if (m != null) Destroy(m);
        }
    }
}
