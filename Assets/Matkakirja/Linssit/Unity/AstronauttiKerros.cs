// ASTRONAUTIN KAMERAN 3D-KERROS (web js/linssit/satelliitti-avaruus.js,
// satelliitti-nimiot.js, astro-sumu.js). Toteuttaa IAstronautinNakyman pallon
// osat: tähdet, pilvikuori, 64 havaintopistettä nimineen, ISS ja sen rata.
// Käyttöliittymän osat (musta avausruutu, kuvanäkymä, avaruussumun harso)
// välitetään Natiivi-UI:lle staattisten koukkujen kautta.
//
// Pisteet ja nimet seuraavat Natiivisepän KaupunkiMerkit-mallia: juuri pallon
// pinnalla (+5 km), joka kehys käännetään kameraan ja skaalataan näytön
// pisteiksi, ja takapuolen merkit piilotetaan normaalilla.
using System;
using System.Collections.Generic;
using CesiumForUnity;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Astronautti;
using TMPro;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class AstronauttiKerros : MonoBehaviour, IAstronautinNakyma
    {
        // ── Natiivi-UI:n koukut ───────────────────────────────────────────
        /// <summary>Avausvaihe mustalle ruudulle ja otsikkokortille.</summary>
        public static Action<AvauksenVaihe> AvausKasittelija;
        /// <summary>Kuvanäkymä auki (kohde, havainnon indeksi) / kiinni (null, −1).</summary>
        public static Action<Havaintokohde, int> KuvaKasittelija;
        /// <summary>Avaruussumun harson peitto 0…1.</summary>
        public static Action<double> SumuKasittelija;

        const double MaanSade = 6_371_000, Nosto = 5000;
        const float Hehku = 28f, IssMerkki = 8f, Etuna = 0.02f;

        sealed class Piste
        {
            public Havaintokohde kohde;
            public Transform juuri;
            public TextMeshPro nimi;
            public Vector3 pinta, normaali;
            public Vector2 koko;
            public Kylki kylki = Kylki.Ala;
        }

        CesiumGeoreference georeferenssi;
        Camera kamera;
        PalloKierto kierto;
        TMP_FontAsset fontti;
        Material pisteMateriaali, issMateriaali, rataMateriaali;
        Mesh nelio;
        readonly List<Piste> pisteet = new List<Piste>();
        Tahtitaivas taivas;
        Pilvikuori pilvet;
        Avaruus avaruus;
        Transform iss;
        GameObject rata;
        Mesh rataMesh;
        float rataPaivitetty = -1;
        bool nimetNakyvissa;
        readonly Dictionary<string, Kylki> kyljet = new Dictionary<string, Kylki>();
        readonly List<NimionKohde> ladottavat = new List<NimionKohde>();
        float ladottu;

        /// <summary>Linssi, jolle napautukset välitetään.</summary>
        public AstronauttiLinssi Linssi;

        public static AstronauttiKerros Luo(PalloKierto kierto, string pilvienOsoite = null)
        {
            var g = kierto.georeferenssi;
            var go = new GameObject("AstronauttiKerros");
            go.transform.SetParent(g.transform, false);
            var k = go.AddComponent<AstronauttiKerros>();
            k.georeferenssi = g;
            k.kierto = kierto;
            k.kamera = kierto.GetComponent<Camera>();
            var merkit = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.merkit : null;
            k.fontti = merkit != null ? merkit.fontti : null;
            var varjostin = Resources.Load<Shader>("Varjostimet/Havaintopiste");
            k.pisteMateriaali = new Material(varjostin);
            k.issMateriaali = new Material(varjostin);
            k.issMateriaali.SetColor("_Vari", new Color32(0xf2, 0xf8, 0xff, 0xff));
            k.issMateriaali.SetColor("_Ydinvalo", Color.white);
            k.issMateriaali.SetFloat("_YtimenOsuus", 0.5f);
            var reitit = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.reitit : null;
            if (reitit != null && reitit.maa != null)
            {
                k.rataMateriaali = new Material(reitit.maa);
                k.rataMateriaali.SetColor("_BaseColor", new Color(16 / 255f, 26 / 255f, 44 / 255f, 0.62f));
                k.rataMateriaali.SetFloat("_Paksuus", 1.3f);
                k.rataMateriaali.SetVector("_Katko", new Vector4(1f, 1f, 0, 0));
            }
            k.nelio = Nelio();
            k.pilvienOsoite = pilvienOsoite;
            kierto.Napautettu += k.Napautus;
            return k;
        }

        string pilvienOsoite;

        // ── IAstronautinNakyma ────────────────────────────────────────────

        public void Avaus(AvauksenVaihe vaihe) => AvausKasittelija?.Invoke(vaihe);

        public void Kohteet(IReadOnlyList<Havaintokohde> kohteet)
        {
            taivas ??= Tahtitaivas.Luo(georeferenssi, Matkakirja.Linssit.Tahdet.AstronautinKerroin, LinssiOhjain.Instanssi?.VahennettyLiike ?? false);
            pilvet ??= Pilvikuori.Luo(georeferenssi, pilvienOsoite);
            // Tumma avaruus ja ilmakehän hehku (web AVARUUDEN_TAUSTA, ILMAKEHAN_VARI).
            avaruus ??= Avaruus.Luo(georeferenssi, georeferenssi.transform);
            if (pisteet.Count > 0) return;
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            foreach (var k in kohteet)
            {
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(k.Lon, k.Lat, Nosto));
                double3 u = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
                var juuri = new GameObject("Havainto " + k.Tunnus).transform;
                juuri.SetParent(transform, false);
                var p = new GameObject("Piste").transform;
                p.SetParent(juuri, false);
                p.gameObject.AddComponent<MeshFilter>().sharedMesh = nelio;
                var r = p.gameObject.AddComponent<MeshRenderer>();
                r.sharedMaterial = pisteMateriaali;
                r.shadowCastingMode = ShadowCastingMode.Off;
                p.localScale = new Vector3(Hehku, Hehku, 1);
                TextMeshPro nimi = null;
                Vector2 koko = Vector2.zero;
                if (fontti != null)
                {
                    nimi = new GameObject("Nimi").AddComponent<TextMeshPro>();
                    nimi.transform.SetParent(juuri, false);
                    nimi.font = fontti;
                    nimi.text = k.Nimi;
                    nimi.fontSize = 12;
                    nimi.color = new Color(0.92f, 0.97f, 0.94f);
                    nimi.alignment = TextAlignmentOptions.Center;
                    nimi.textWrappingMode = TextWrappingModes.NoWrap;
                    nimi.outlineWidth = 0.25f;
                    nimi.outlineColor = new Color32(8, 14, 22, 200);
                    nimi.rectTransform.sizeDelta = new Vector2(400, 40);
                    nimi.transform.localScale = Vector3.one * 10f;
                    nimi.ForceMeshUpdate();
                    koko = nimi.GetRenderedValues(false) * 10f;
                    nimi.enabled = false;
                }
                pisteet.Add(new Piste
                {
                    kohde = k, juuri = juuri, nimi = nimi, koko = koko,
                    pinta = (float3)u, normaali = (float3)math.normalize(u - keskus),
                });
            }
        }

        public void Nimet(bool nakyvissa) => nimetNakyvissa = nakyvissa;

        public void Pilvet(double peitto, double kiertoAsteina) => pilvet?.Aseta(peitto, kiertoAsteina);

        public void Sumu(double peitto) => SumuKasittelija?.Invoke(peitto);

        public void Tahdet(double peitto) => tahtienPeitto = (float)peitto;

        float tahtienPeitto = 1f;

        public void Iss(LatLon paikka, IReadOnlyList<LatLon> kaari)
        {
            if (iss == null)
            {
                iss = new GameObject("ISS").transform;
                iss.SetParent(transform, false);
                var m = new GameObject("Merkki").transform;
                m.SetParent(iss, false);
                m.gameObject.AddComponent<MeshFilter>().sharedMesh = nelio;
                m.gameObject.AddComponent<MeshRenderer>().sharedMaterial = issMateriaali;
                m.localScale = new Vector3(IssMerkki * 2, IssMerkki * 2, 1);
            }
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                new double3(paikka.Lon, paikka.Lat, Astronauttimatikka.IssKorkeus * MaanSade));
            issPinta = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            // Rata kiertyy hitaasti (solmu 360°/900 s): uusi mesh sekunnin välein riittää.
            if (rataMateriaali != null && Time.unscaledTime - rataPaivitetty >= 1f)
            {
                rataPaivitetty = Time.unscaledTime;
                RakennaRata(kaari);
            }
        }

        Vector3 issPinta;

        public void Kuva(Havaintokohde kohde, int indeksi) => KuvaKasittelija?.Invoke(kohde, indeksi);

        public void KuvaPois() => KuvaKasittelija?.Invoke(null, -1);

        public void Pois()
        {
            AvausKasittelija?.Invoke(AvauksenVaihe.Pois);
            SumuKasittelija?.Invoke(0);
            Destroy(gameObject);
        }

        // ── Piirto ────────────────────────────────────────────────────────

        void RakennaRata(IReadOnlyList<LatLon> kaari)
        {
            int n = kaari.Count;
            var paikat = new Vector3[n * 2];
            var seuraavat = new Vector3[n * 2];
            var puolet = new Vector2[n * 2];
            var u = new Vector3[n];
            for (int i = 0; i < n; i++)
            {
                var e = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                    new double3(kaari[i].Lon, kaari[i].Lat, Astronauttimatikka.IssKorkeus * MaanSade));
                u[i] = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(e);
            }
            for (int i = 0; i < n; i++)
            {
                Vector3 seur = i < n - 1 ? u[i + 1] : u[i] + (u[i] - u[i - 1]);
                for (int s = 0; s < 2; s++)
                {
                    paikat[i * 2 + s] = u[i];
                    seuraavat[i * 2 + s] = seur;
                    puolet[i * 2 + s] = new Vector2(s == 0 ? -1 : 1, i);
                }
            }
            var kolmiot = new int[(n - 1) * 6];
            for (int i = 0, t = 0; i < n - 1; i++)
            {
                int a = i * 2;
                kolmiot[t++] = a; kolmiot[t++] = a + 1; kolmiot[t++] = a + 2;
                kolmiot[t++] = a + 1; kolmiot[t++] = a + 3; kolmiot[t++] = a + 2;
            }
            if (rata == null)
            {
                rata = new GameObject("ISS-rata");
                rata.transform.SetParent(transform, false);
                rataMesh = new Mesh { name = "ISS-rata" };
                rata.AddComponent<MeshFilter>().sharedMesh = rataMesh;
                rata.AddComponent<MeshRenderer>().sharedMaterial = rataMateriaali;
            }
            rataMesh.Clear();
            rataMesh.vertices = paikat;
            rataMesh.SetUVs(0, seuraavat);
            rataMesh.SetUVs(1, puolet);
            rataMesh.triangles = kolmiot;
            rataMesh.RecalculateBounds();
        }

        void LateUpdate()
        {
            if (kamera == null) return;
            taivas?.Paivita(Time.unscaledDeltaTime, tahtienPeitto);
            var kt = kamera.transform;
            var gt = georeferenssi.transform;
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            float pikseleita = Screen.height / kerroin;
            bool ladotaan = nimetNakyvissa && Time.unscaledTime - ladottu >= (float)(Astronauttimatikka.LadonnanValiMs / 1000);
            if (ladotaan) { ladottu = Time.unscaledTime; ladottavat.Clear(); }

            foreach (var p in pisteet)
            {
                Vector3 paikka = gt.TransformPoint(p.pinta);
                Vector3 kohti = kt.position - paikka;
                float etaisyys = kohti.magnitude;
                bool edessa = Vector3.Dot(gt.TransformDirection(p.normaali), kohti / etaisyys) > 0.05f;
                if (p.juuri.gameObject.activeSelf != edessa) p.juuri.gameObject.SetActive(edessa);
                if (!edessa) continue;
                float lahella = etaisyys * (1f - Etuna);
                p.juuri.SetPositionAndRotation(kt.position - kohti / etaisyys * lahella, kt.rotation);
                p.juuri.localScale = Vector3.one * (2f * lahella * tanPuoli / pikseleita);
                if (ladotaan && p.nimi != null)
                {
                    Vector3 r = kamera.WorldToScreenPoint(paikka);
                    // Ladonta ruutupisteinä, y alaspäin kuten webissä.
                    ladottavat.Add(new NimionKohde(p.kohde.Tunnus, r.x / kerroin, (Screen.height - r.y) / kerroin, p.koko.x, p.koko.y));
                }
            }

            if (ladotaan)
            {
                var tulos = Astronauttimatikka.LadoNimiot(ladottavat, kyljet);
                kyljet.Clear();
                foreach (var kv in tulos) kyljet[kv.Key] = kv.Value;
            }
            foreach (var p in pisteet)
            {
                if (p.nimi == null) continue;
                var kylki = nimetNakyvissa && p.juuri.gameObject.activeSelf && kyljet.TryGetValue(p.kohde.Tunnus, out var k) ? k : Kylki.Piilo;
                bool nakyy = kylki != Kylki.Piilo;
                if (p.nimi.enabled != nakyy) p.nimi.enabled = nakyy;
                if (!nakyy) continue;
                var l = Astronauttimatikka.NimionLaatikko(new NimionKohde(p.kohde.Tunnus, 0, 0, p.koko.x, p.koko.y), kylki);
                // Laatikon keskipiste pisteen suhteen; y ylös juuren sisällä.
                p.nimi.transform.localPosition = new Vector3((float)(l.X + l.W / 2), (float)-(l.Y + l.H / 2), 0);
            }

            if (iss != null)
            {
                Vector3 paikka = gt.TransformPoint(issPinta);
                Vector3 kohti = kt.position - paikka;
                float etaisyys = kohti.magnitude;
                iss.SetPositionAndRotation(paikka, kt.rotation);
                iss.localScale = Vector3.one * (2f * etaisyys * tanPuoli / pikseleita);
            }
        }

        /// <summary>Lähin näkyvä havaintopiste 44 pt:n säteellä (web lahinLinssimerkki).</summary>
        void Napautus(Vector2 ruutu)
        {
            if (Linssi == null || kamera == null) return;
            float kerroin = Screen.dpi > 0 ? Mathf.Max(1f, Screen.dpi / 163f) : 1f;
            Piste paras = null;
            float parasEtaisyys = (float)Astronauttimatikka.OsumaSadePx * kerroin;
            foreach (var p in pisteet)
            {
                if (!p.juuri.gameObject.activeSelf) continue;
                Vector3 s = kamera.WorldToScreenPoint(georeferenssi.transform.TransformPoint(p.pinta));
                float d = Vector2.Distance(ruutu, s);
                if (d < parasEtaisyys) { parasEtaisyys = d; paras = p; }
            }
            if (paras != null) Linssi.Napauta(paras.kohde.Tunnus);
        }

        static Mesh Nelio()
        {
            var m = new Mesh { name = "Havaintopiste" };
            m.vertices = new[] { new Vector3(-0.5f, -0.5f), new Vector3(0.5f, -0.5f), new Vector3(-0.5f, 0.5f), new Vector3(0.5f, 0.5f) };
            m.uv = new[] { new Vector2(0, 0), new Vector2(1, 0), new Vector2(0, 1), new Vector2(1, 1) };
            m.triangles = new[] { 0, 2, 1, 1, 2, 3 };
            m.RecalculateBounds();
            return m;
        }

        void OnDestroy()
        {
            if (kierto != null) kierto.Napautettu -= Napautus;
            if (taivas != null) Destroy(taivas.gameObject);
            if (pilvet != null) Destroy(pilvet.gameObject);
            if (avaruus != null) Destroy(avaruus.gameObject);
            if (rataMesh != null) Destroy(rataMesh);
            Destroy(nelio);
            Destroy(pisteMateriaali);
            Destroy(issMateriaali);
            if (rataMateriaali != null) Destroy(rataMateriaali);
        }
    }
}
