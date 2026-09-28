using System.Collections.Generic;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja
{
    /// <summary>
    /// ALOITUSLENNON ILMA (v3e, omistaja 28.9.2026 Fablen kautta, sanatarkasti: "Ja voisiko lentokoneen siivistä lähteä ilma- tai
    /// pölyvana ja moottorista myös? ... Tai ehkä riittäisi, että siinä loppukohtauksessa, kun kamera on jo aika ylhäällä Atenan
    /// päällä, niin silloin muutama lintu lentäisi diakonaalisesti näytön poikki." Natiiviseppä; lintujen tyyli Linssisepän
    /// elävien hetkien parvesta, ElavatHetket.PiirraParvi):
    ///   VANAT: yläsiiven kärjistä ohuet vaaleat ilmavanat ja pakoputkesta hento pölyvana (ei savua). Näytteet ECEF:nä (lähtöpisteen
    ///   siirto ei riko), nauha kameraan päin, pituus enintään <see cref="PituusSiipina"/> koneen siipiväliä (kone on symbolikokoinen
    ///   ja sen nopeus vaihtelee 5–300 km/s), häivytys matkan ja iän mukaan. Näkyy vain, kun kone on ruudulla yli ~4 % leveydestä
    ///   (lähestymisen loppu, ohitus ja pakitus). Syvyystesti: kone ja maasto peittävät vanan.
    ///   LINNUT: loppukohtauksessa (<see cref="LinnutAlkuS"/>–<see cref="LinnutLoppuS"/>, kamera nousee Ateenan ylle ja kääntyy
    ///   suoraan alas) neljä mustelintua vinottain ruudun poikki vasemmalta alhaalta oikealle ylös: kaksi kapeaa läiskää linnulla,
    ///   siivet lyövät 2,2 Hz ja välillä liitävät. Linnut ovat kameran ja maan välissä (koko ruutupisteinä), joten maa loittonee
    ///   niiden takana.
    /// Varjostin Ilmavana (Pehmeapisteen muunnos, ZTest materiaalista). Kytkin <see cref="Paalla"/> (komento "lento v3 ilma 0|1").
    /// </summary>
    public sealed class AloituslennonIlma : MonoBehaviour
    {
        /// <summary>Kehittäjäkytkin: vanat ja linnut aloituslennolla (1, oletus) tai ilman (0, A/B).</summary>
        public static bool Paalla = true;

        /// <summary>Vanan enimmäispituus koneen siipiväleinä ja ikä (s).</summary>
        public const float PituusSiipina = 5f, IkaEnintaanS = 2.6f;
        /// <summary>Lintujen ylitys lennon ajassa (s).</summary>
        public const float LinnutAlkuS = 12.3f, LinnutLoppuS = 14.8f;

        /// <summary>Vanan lähtöpisteet koneen avaruudessa (+Z nokka, +Y ylös, +X oikea; yläsiiven kärkiväli 1): yläsiiven kärjet ja
        /// pakoputken pää vasemmalla kyljellä etuohjaamon alla (TigerMoth.cs).</summary>
        static readonly Vector3[] Lahteet = { new Vector3(-0.5f, 0.134f, 0.13f), new Vector3(0.5f, 0.134f, 0.13f), new Vector3(-0.048f, -0.052f, 0.02f) };
        /// <summary>Vanan väri, peitto ja puolileveys siipivälinä (alussa; levenee 2,5-kertaiseksi loppuun).</summary>
        static readonly Color KarkiVari = new Color(1f, 0.985f, 0.94f), PolyVari = new Color(0.62f, 0.57f, 0.5f);
        const float KarkiPeitto = 0.55f, PolyPeitto = 0.3f, KarkiLeveys = 0.012f, PolyLeveys = 0.03f;

        struct Nayte { public float T; public double3 Ecef; public float Siipi; }

        CesiumGeoreference georeferenssi;
        Camera kamera;
        readonly List<Nayte>[] naytteet = { new List<Nayte>(), new List<Nayte>(), new List<Nayte>() };
        Material vanaMat, lintuMat;
        Mesh vanaMesh, lintuMesh;
        readonly List<Vector3> paikat = new List<Vector3>();
        readonly List<Color> varit = new List<Color>();
        readonly List<Vector2> kulmat = new List<Vector2>();
        readonly List<int> kolmiot = new List<int>();
        readonly List<Vector3> pisteet = new List<Vector3>();

        /// <summary>Luo ilman georeferenssin alle (paikat sen avaruudessa); null, jos varjostin puuttuu tai kytkin pois.</summary>
        public static AloituslennonIlma Luo(CesiumGeoreference g, Camera kamera)
        {
            if (!Paalla || g == null || kamera == null) return null;
            var s = Resources.Load<Shader>("Ilmavana");
            if (s == null) { Debug.LogWarning("MATKAKIRJA aloituslennon ilma: Ilmavana-varjostin puuttuu"); return null; }
            var go = new GameObject("Aloituslennon ilma");
            go.transform.SetParent(g.transform, false);
            var ilma = go.AddComponent<AloituslennonIlma>();
            ilma.georeferenssi = g;
            ilma.kamera = kamera;
            ilma.vanaMat = new Material(s) { name = "Ilmavana", renderQueue = 3013 };
            ilma.vanaMat.SetFloat("_Ydin", 2.6f);
            ilma.vanaMat.SetFloat("_Halo", 0.25f);
            ilma.vanaMat.SetFloat("_ZTest", (float)CompareFunction.LessEqual);
            ilma.lintuMat = new Material(s) { name = "Aloituslennon linnut", renderQueue = 3014 };
            ilma.lintuMat.SetFloat("_Ydin", 5f);
            ilma.lintuMat.SetFloat("_Halo", 0f);
            ilma.lintuMat.SetFloat("_ZTest", (float)CompareFunction.Always);
            ilma.vanaMesh = Kappale(go.transform, "Ilmavanat", ilma.vanaMat);
            ilma.lintuMesh = Kappale(go.transform, "Linnut", ilma.lintuMat);
            return ilma;
        }

        static Mesh Kappale(Transform isa, string nimi, Material m)
        {
            var go = new GameObject(nimi);
            go.transform.SetParent(isa, false);
            var mesh = new Mesh { name = nimi };
            mesh.MarkDynamic();
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterial = m;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
            return mesh;
        }

        void OnDestroy()
        {
            if (vanaMat != null) Destroy(vanaMat);
            if (lintuMat != null) Destroy(lintuMat);
            if (vanaMesh != null) Destroy(vanaMesh);
            if (lintuMesh != null) Destroy(lintuMesh);
        }

        /// <summary>
        /// Lennon kehys (Nappula.V3Ajo koneen asettamisen jälkeen): t = radan aika (s), runko = TigerMothKone.Runko (elo mukana),
        /// siipiM = koneen symbolinen siipiväli (m), koko = koneen siipiväli ruudun leveydestä (AloituslennonRata.Mitta).
        /// </summary>
        public void Paivita(float t, Transform runko, double siipiM, double koko)
        {
            if (georeferenssi == null || kamera == null) return;
            var gt = georeferenssi.transform;
            Vector3 kameraL = gt.InverseTransformPoint(kamera.transform.position);
            // Uudet näytteet: lähtöpisteet maailmaan ja ECEF:ksi.
            if (runko != null)
                for (int j = 0; j < Lahteet.Length; j++)
                {
                    var l = gt.InverseTransformPoint(runko.TransformPoint(Lahteet[j]));
                    var ecef = georeferenssi.TransformUnityPositionToEarthCenteredEarthFixed(new double3(l.x, l.y, l.z));
                    var lista = naytteet[j];
                    lista.Add(new Nayte { T = t, Ecef = ecef, Siipi = (float)siipiM });
                    while (lista.Count > 0 && t - lista[0].T > IkaEnintaanS) lista.RemoveAt(0);
                }
            // Peitto koneen koon mukaan: kaukaa (alle ~4 % leveydestä) vana olisi alle pikselin levyinen välkkyvä viiva.
            float peitto = Mathf.SmoothStep(0f, 1f, Mathf.InverseLerp(0.035f, 0.09f, (float)koko));
            Tyhjenna();
            if (peitto > 0.01f && siipiM > 0)
                for (int j = 0; j < Lahteet.Length; j++)
                {
                    bool karki = j < 2;
                    Nauha(naytteet[j], kameraL, (float)siipiM, karki ? KarkiVari : PolyVari, (karki ? KarkiPeitto : PolyPeitto) * peitto,
                        karki ? KarkiLeveys : PolyLeveys, karki ? PituusSiipina : PituusSiipina * 0.6f, t);
                }
            Aseta(vanaMesh);
            Tyhjenna();
            Linnut(t, kameraL);
            Aseta(lintuMesh);
        }

        /// <summary>Kameraan päin käännetty nauha uusimmasta näytteestä (lähtöpiste) vanhimpaan: peitto kasvaa lähtöpisteen takana
        /// (ei piirry koneen päälle) ja häipyy matkan (siipiväleinä) ja iän mukaan; nauha levenee vanhetessaan.</summary>
        void Nauha(List<Nayte> n, Vector3 kameraL, float siipiNyt, Color vari, float peitto, float leveys, float pituus, float t)
        {
            if (n.Count < 2) return;
            pisteet.Clear();
            for (int i = 0; i < n.Count; i++) pisteet.Add((Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(n[i].Ecef));
            int pohja = paikat.Count;
            float matka = 0f;
            Vector3 ed = Vector3.zero;
            int lkm = 0;
            for (int i = n.Count - 1; i >= 0; i--)
            {
                var p = pisteet[i];
                if (lkm > 0) matka += (p - ed).magnitude;
                float s = matka / Mathf.Max(1f, siipiNyt);
                if (s > pituus) break;
                // Tangentti naapureista, sivu kameraan nähden kohtisuoraan.
                var tangentti = pisteet[Mathf.Min(n.Count - 1, i + 1)] - pisteet[Mathf.Max(0, i - 1)];
                var sivu = Vector3.Cross(tangentti, kameraL - p);
                if (sivu.sqrMagnitude < 1e-12f) sivu = Vector3.up;
                sivu.Normalize();
                float u = s / pituus, ika = (t - n[i].T) / IkaEnintaanS;
                float alfa = peitto * Mathf.SmoothStep(0f, 1f, s / 0.35f) * (1f - u) * (1f - u) * Mathf.Clamp01(1f - ika);
                float puoli = leveys * n[i].Siipi * (1f + 1.5f * u);
                var c = new Color(vari.r, vari.g, vari.b, alfa);
                paikat.Add(p - sivu * puoli); paikat.Add(p + sivu * puoli);
                varit.Add(c); varit.Add(c);
                kulmat.Add(new Vector2(0f, -1f)); kulmat.Add(new Vector2(0f, 1f));
                if (lkm > 0)
                {
                    int k = pohja + (lkm - 1) * 2;
                    kolmiot.Add(k); kolmiot.Add(k + 1); kolmiot.Add(k + 2);
                    kolmiot.Add(k + 1); kolmiot.Add(k + 3); kolmiot.Add(k + 2);
                }
                ed = p;
                lkm++;
            }
        }

        /// <summary>
        /// Neljä lintua vinottain ruudun poikki (vasemmalta alhaalta oikealle ylös) loppukohtauksessa: paikka ruudulla ajasta,
        /// maailmassa kameran säteellä etäisyydellä 30 % silmän korkeudesta (kameran ja maan välissä), koko ruutupisteinä.
        /// </summary>
        void Linnut(float t, Vector3 kameraL)
        {
            if (t < LinnutAlkuS - 0.5f || t > LinnutLoppuS + 0.5f) return;
            var gt = georeferenssi.transform;
            Vector3 eteen = gt.InverseTransformDirection(kamera.transform.forward).normalized;
            Vector3 oikea = gt.InverseTransformDirection(kamera.transform.right).normalized;
            Vector3 yla = gt.InverseTransformDirection(kamera.transform.up).normalized;
            float tanV = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad), tanH = tanV * kamera.aspect;
            var silma = georeferenssi.TransformUnityPositionToEarthCenteredEarthFixed(new double3(kameraL.x, kameraL.y, kameraL.z));
            float korkeus = (float)math.max(10_000.0, math.length(silma) - CesiumWgs84Ellipsoid.GetMaximumRadius());
            float etaisyys = 0.3f * korkeus;
            // Pisteen pituus metreinä linnun etäisyydellä (kuten ElavatHetket.Pt).
            float pt = 2f * PalloKierto.Pistekerroin * etaisyys * tanV / Mathf.Max(1, Screen.height);
            var muste = new Color(0.16f, 0.12f, 0.09f, 0.85f);
            for (int i = 0; i < 4; i++)
            {
                // Löyhä muodostelma: viive, sivusiirto ja oma aaltoilu.
                float viive = i * 0.12f, u = Mathf.InverseLerp(LinnutAlkuS + viive, LinnutLoppuS + viive, t);
                if (u <= 0f || u >= 1f) continue;
                float sx = -1.2f + 2.45f * u + (i % 2 == 0 ? 0.06f : -0.08f) * i * 0.5f + 0.02f * Mathf.Sin(t * 1.9f + i);
                float sy = -0.95f + 1.75f * u + (i % 2 == 0 ? -0.05f : 0.07f) * i * 0.5f + 0.015f * Mathf.Sin(t * 2.3f + i * 1.7f);
                var paikka = kameraL + (eteen + oikea * (sx * tanH) + yla * (sy * tanV)) * etaisyys;
                // Siivet: lyönti 2,2 Hz, välillä liito (siivet loivassa v:ssä), linnuittain eri vaiheessa.
                float liito = Mathf.SmoothStep(0f, 1f, Mathf.Clamp01(Mathf.Sin(t * 1.3f + i * 2.1f) * 2f - 0.6f));
                float nousu = Mathf.Lerp(25f + 20f * Mathf.Sin(t * Mathf.PI * 2f * 2.2f + i * 0.7f), 14f, liito) * Mathf.Deg2Rad;
                const float s = 1.5f;
                Laiska(paikka + (-oikea * Mathf.Cos(nousu) + yla * Mathf.Sin(nousu)) * (4.1f * s * pt), oikea, yla, Mathf.PI - nousu, 4.6f * s * pt, 1f * s * pt, muste);
                Laiska(paikka + (oikea * Mathf.Cos(nousu) + yla * Mathf.Sin(nousu)) * (4.1f * s * pt), oikea, yla, nousu, 4.6f * s * pt, 1f * s * pt, muste);
            }
        }

        /// <summary>Kameraan päin käännetty läiskä (ElavatHetket.Laiska): keskipiste, kulma ruudulla, puolikoot metreinä.</summary>
        void Laiska(Vector3 c, Vector3 oikea, Vector3 yla, float kulma, float puoliPituus, float puoliLeveys, Color vari)
        {
            Vector3 a = (oikea * Mathf.Cos(kulma) + yla * Mathf.Sin(kulma)) * puoliPituus;
            Vector3 b = (-oikea * Mathf.Sin(kulma) + yla * Mathf.Cos(kulma)) * puoliLeveys;
            int pohja = paikat.Count;
            paikat.Add(c - a - b); paikat.Add(c + a - b); paikat.Add(c + a + b); paikat.Add(c - a + b);
            for (int i = 0; i < 4; i++) varit.Add(vari);
            kulmat.Add(new Vector2(-1, -1)); kulmat.Add(new Vector2(1, -1)); kulmat.Add(new Vector2(1, 1)); kulmat.Add(new Vector2(-1, 1));
            kolmiot.Add(pohja); kolmiot.Add(pohja + 1); kolmiot.Add(pohja + 2);
            kolmiot.Add(pohja); kolmiot.Add(pohja + 2); kolmiot.Add(pohja + 3);
        }

        void Tyhjenna() { paikat.Clear(); varit.Clear(); kulmat.Clear(); kolmiot.Clear(); }

        void Aseta(Mesh m)
        {
            m.Clear();
            m.SetVertices(paikat); m.SetColors(varit); m.SetUVs(0, kulmat); m.SetTriangles(kolmiot, 0);
            // Rajat suuriksi: nauha ja linnut ovat georeferenssin avaruudessa satojen km:n päässä origosta (ei turhaa karsintaa).
            m.bounds = new Bounds(Vector3.zero, Vector3.one * 2e7f);
        }
    }
}
