// ASTRONAUTIN AVARUUS (web js/linssit/satelliitti-avaruus.js AVARUUDEN_TAUSTA #04060e,
// ILMAKEHAN_VARI #7fb6ff, ILMAKEHAN_KORKEUS 0,25): tumma avaruus pallon taakse ja
// ilmakehän sininen hehku pallon reunalle.
//
//   tausta    KarttaKerrokset.Taustavari (Natiivisepän rajapinta); purku palauttaa
//             pelin oman taustan (null)
//   hehku     kuori R × 1,25 (Ilmakeha-varjostin, three-glow-mesh: coefficient 0,1,
//             power 3,5, takapinnat, pallon kiekko hylätään)
//
//   pinta    KarttaKerrokset.PallonSavy (Natiivisepän rajapinta): pallon perusväri × Savy linssin
//             ajaksi (web PALLON_SAVY 0x999999 = 0,6; omistajan löydös 98 25.9.2026: "reilusti
//             tummemmaksi, jotta vihreät pisteet hehkuvat yökartalla" → 0,5). Pisteiden
//             screen-sekoitus (Havaintopiste) hehkuu vain tummalla pohjalla.
//
// Hehku ja tummennus häivytetään sisään linssin avautuessa (0,6 s); kaikki puretaan kerroksen mukana.
//
// ISS:N KYYTI (omistajan palaute 28.9.2026: "pitäisikö avaruuden musta näkyä paremmin maapallon horisontissa"):
// hehkun kuori (1,25 R) ympäröi kameran ISS:n korkeudella, jolloin koko taivas sinersi. Kyydissä hehku häipyy ja tilalle
// tulee Ilmakaari (kuori R + 120 km, analyyttinen kaari horisontin yllä ja usva maan päällä); musta avaruus yläpuolella.
// Siirtymä 0,8 s. A/B: VanhaIlmakeha = true pitää kyydissäkin vanhan hehkun (kuvapari).
//
// TAUSTAN VAHTI (Cupolan 1. kierros 28.9.: kermanvaalea taivas ja usva koko näkymässä, eli OmaTausta oli epätosi ja Aurinko
// piti horisonttiusvan ja pelin taustan koko linssin ajan): Taustavari lukee Camera.mainin, joka on null, kun pääkamera on
// pois (elävän kerroksen KERROS-tila tai peitto), jolloin tausta jää asettamatta. Tausta tarkistetaan joka kehys ja
// asetetaan uudelleen, jos OmaTausta ei ole voimassa, myös jos se palautui kesken linssin. Molemmat tapaukset lokiin.
using System;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class Avaruus : MonoBehaviour
    {
        public const float IlmakehanKorkeus = 0.25f;
        /// <summary>Pallon perusvärin kerroin linssin ajaksi (löydös 98; web 0,6).</summary>
        public const float Savy = 0.5f;
        const float HaivytysS = 0.6f;
        static readonly Color Tausta = new Color32(4, 6, 14, 255);
        static readonly Color Ilmakeha = new Color32(127, 182, 255, 255);
        const int Sektorit = 96, Kehat = 48;

        Material hehku, kaari, kaari2;
        RenderTexture lapinakyvyys;
        /// <summary>
        /// Fotorealismi osa 1 (30.9.2026): fysikaalinen ilmakehä (Ilmakeha2.shader, Rayleigh + Mie + otsoni, transmittanssi-LUT)
        /// Ilmakaaren analyyttisen kaaren ja usvan tilalle. A/B `astro kyyti ilmakeha2 0|1`.
        /// </summary>
        public static bool Ilmakeha2 = true;   // oletuksena päällä (Päätoimittaja 1.10.; LUT-passin vika korjattu c15426c9)
        /// <summary>
        /// Auringon valaistus HDR:nä (Ilmakeha2 _Voima). 4,5 = BMNG-maan kirkkaus vastaa albedoa ~0,1 (maa ~0,07 lineaarisena
        /// auringon 57°:ssä); Pythonin rinnakkaislaskenta 30.9.: nadirissa usva (0,02, 0,04, 0,10), reunalla 10 km:ssä
        /// (0,25, 0,27, 0,45) ja ekstinktio 89 %. Säädetään NASA-vertailusta (A/B `astro kyyti ilmavoima <x>`).
        /// Yksi arvo koko pallolle (Päätoimittaja 1.10.: ilmakehä sama kaikkialla, myös S2:n ja vuodenaikojen välillä): 2,5 —
        /// S2-vertailu (ISS067-E-286475, 3,5 ylivalotti ja sinersi S2:n) ja Egyptin BMNG (ISS028-E-14970: sävyero NASAan 4 % vs
        /// 11 % 3,5:llä). Aiemmin 30.9. (foto5) 3,5, kun 4,5 sinersi maan liikaa.
        /// </summary>
        public static float IlmanVoima = 2.5f;
        /// <summary>
        /// Horisontin kaaren kerroin kuvaputkessa (Päätoimittaja 1.10. Linssiseppä 2:n kautta: julisteen suurin wau-tekijä):
        /// Ilmakeha2 _KaariVoima vain, kun <see cref="Kuvaputki"/> on päällä; livenäkymässä aina 1. A/B `astro kyyti kaarivoima x`.
        /// </summary>
        public static float KuvanKaariVoima = 1f;
        /// <summary>
        /// Kuvaputken kaaren säätimet (Linssiseppä 2:n pyyntö 1.10. 19.5x, omistajan Cupola-mallikuvan kaari): Rayleighin
        /// skaalakorkeuden kerroin, sironnan sinisyys ja maan ilmaperspektiivi. Vain <see cref="Kuvaputki"/>; livenä aina 1.
        /// Komennot `astro kyyti kaarihr|kaarisini|utu x`.
        /// </summary>
        public static float KuvanHrKerroin = 1f, KuvanSiniKerroin = 1f, KuvanUtuKerroin = 1f;
        /// <summary>Kaaren valkoinen ydin (1 = ennallaan) ja syvänsininen hehku sen yllä (0 = pois); vain kuvaputki. `astro kyyti kaariydin|kaarisyva x`.</summary>
        public static float KuvanKaariYdin = 1f, KuvanKaariSyva = 0f;
        /// <summary>
        /// Kiertoratanousu kuvaputkessa (0 = pois, 1 = täysi; IssKameraKuva asettaa, kun aurinko on lähellä maan reunaa):
        /// Ilmakeha2 _NousuVoima, KyydinAurinko-flare ja Yokuori _AamuVoima. Päätoimittaja 1.10. 21.5x.
        /// </summary>
        public static float KuvanNousu = 0f;
        /// <summary>Kuvaputki päällä: valokuvauskulma (AstronauttiLinssi.Vertailu) tai pelaajan ISS-kamera (IssKameraKuva asettaa).</summary>
        public static bool KuvaputkiAsetettu;
        public static bool Kuvaputki => KuvaputkiAsetettu || Matkakirja.Linssit.Astronautti.AstronauttiLinssi.Vertailu.HasValue;
        /// <summary>Monisironnan osuus (Ilmakeha2 _Moni): 0,45 paksuntaa horisontin sinistä reunavyötä (0,25 oli ohut ja himmeä).</summary>
        public static float IlmanMoni = 0.3f;   // NASA-vertailu vaakana 30.9. (foto6): 0,45 sinersi päivän maan ja vaalensi meren
        Mesh kuori, kaariKuori;
        float peitto, kyyti, kyytiTavoite, aurinkoPaivitetty = -10f;
        DateTime aurinkoUtc;
        CesiumGeoreference g;

        /// <summary>A/B (`astro kyyti ilmakeha vanha|uusi`): kyydissäkin kaukonäkymän hehku.</summary>
        public static bool VanhaIlmakeha;
        /// <summary>Yön ilmahehkun voimakkuus (Ilmakaari _Hehku); laite cl4 28.9.: 0,32 oli liian kirkas.</summary>
        public const float IlmahehkunVoima = 0.12f;
        /// <summary>A/B (`astro kyyti hehku 0|1`): hämärän oranssi ja yön ilmahehku pois (ISS-realismi 3, kuvapari).</summary>
        public static bool HehkuPois;
        const float KyytiS = 0.8f, KaarenKorkeus = 120_000f;

        /// <summary>ISS:n kyyti päälle/pois: hehku häipyy ja ilmakehän kaari tulee tilalle (ellei A/B vanha).</summary>
        public void Kyyti(bool paalla) => kyytiTavoite = paalla && !VanhaIlmakeha ? 1f : 0f;

        public static Avaruus Luo(CesiumGeoreference georeferenssi, Transform isanta)
        {
            var go = new GameObject("Avaruus");
            go.transform.SetParent(isanta, false);
            var a = go.AddComponent<Avaruus>();
            a.Rakenna(georeferenssi);
            return a;
        }

        bool taustaOli;
        int taustaYritykset, taustaPalautui;

        /// <summary>Tausta Natiivisepän rajapinnalla (kameran tausta), joka kehys, jos OmaTausta ei ole voimassa (ks. alkukommentti).</summary>
        void AsetaTausta()
        {
            var kk = KarttaKerrokset.Instanssi;
            if (kk == null || kk.OmaTausta) return;
            if (taustaOli)
            {
                if (++taustaPalautui <= 3) Debug.Log("MATKAKIRJA linssit: avaruus: tausta palautui pelin omaksi kesken linssin, asetetaan uudelleen");
                taustaOli = false;
                taustaYritykset = 0;
            }
            kk.Taustavari(Tausta);
            taustaYritykset++;
            if (kk.OmaTausta)
            {
                taustaOli = true;
                if (taustaYritykset > 1) Debug.Log($"MATKAKIRJA linssit: avaruus: tausta asettui {taustaYritykset}. yrityksellä");
            }
            else if (taustaYritykset == 1)
                Debug.Log("MATKAKIRJA linssit: avaruus: tausta ei asettunut (pääkamera pois?), yritetään joka kehys");
        }

        void Rakenna(CesiumGeoreference g)
        {
            this.g = g;
            AsetaTausta();

            var hehkuVarjostin = Resources.Load<Shader>("Varjostimet/Ilmakeha");
            if (hehkuVarjostin == null) { Debug.LogWarning("MATKAKIRJA linssit: Ilmakeha-varjostin puuttuu"); return; }
            double sade = CesiumWgs84Ellipsoid.GetMaximumRadius();
            double3 keskus = g.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            var k = new GameObject("Ilmakeha");
            k.transform.SetParent(transform, false);
            k.transform.localPosition = (Vector3)(float3)keskus;
            // Pallokuori ECEF-akseleilla (akseleiden suunnalla ei ole väliä: kuori on pyöreä).
            int n = (Kehat + 1) * (Sektorit + 1);
            var paikat = new Vector3[n];
            float rk = (float)(sade * (1 + IlmakehanKorkeus));
            int i = 0;
            for (int kk = 0; kk <= Kehat; kk++)
            {
                float lat = Mathf.PI * (0.5f - kk / (float)Kehat);
                for (int s = 0; s <= Sektorit; s++, i++)
                {
                    float lon = 2 * Mathf.PI * s / Sektorit;
                    paikat[i] = new Vector3(Mathf.Cos(lat) * Mathf.Cos(lon), Mathf.Sin(lat), Mathf.Cos(lat) * Mathf.Sin(lon)) * rk;
                }
            }
            var kolmiot = new int[Kehat * Sektorit * 6];
            int t2 = 0;
            for (int kk = 0; kk < Kehat; kk++)
                for (int s = 0; s < Sektorit; s++)
                {
                    int a0 = kk * (Sektorit + 1) + s, b = a0 + 1, c = a0 + Sektorit + 1, d = c + 1;
                    kolmiot[t2++] = a0; kolmiot[t2++] = b; kolmiot[t2++] = c;
                    kolmiot[t2++] = b; kolmiot[t2++] = d; kolmiot[t2++] = c;
                }
            // Varjostin piirtää takapinnat (Cull Front), joten kierron suunnalla on väliä vain
            // siten, että toinen puoli näkyy; Cull Front + tämä kierto näyttää kaukaisen puolen.
            kuori = new Mesh { name = "Ilmakeha", indexFormat = IndexFormat.UInt32, vertices = paikat, triangles = kolmiot };
            kuori.RecalculateBounds();
            k.AddComponent<MeshFilter>().sharedMesh = kuori;
            var kr = k.AddComponent<MeshRenderer>();
            hehku = new Material(hehkuVarjostin);
            hehku.SetColor("_Vari", Ilmakeha);
            hehku.SetFloat("_Ontto", (float)sade);
            hehku.SetFloat("_Peitto", 0);
            kr.sharedMaterial = hehku;
            kr.shadowCastingMode = ShadowCastingMode.Off;
            RakennaKaari(g, keskus, sade, paikat.Length);
        }

        /// <summary>Ilmakehän kaaren kuori R + 120 km (sama pallokuori kuin hehkulla, vain säde eri).</summary>
        void RakennaKaari(CesiumGeoreference g, double3 keskus, double sade, int n)
        {
            var varjostin = Resources.Load<Shader>("Varjostimet/Ilmakaari");
            if (varjostin == null) { Debug.LogWarning("MATKAKIRJA linssit: Ilmakaari-varjostin puuttuu"); return; }
            var k = new GameObject("Ilmakaari");
            k.transform.SetParent(transform, false);
            k.transform.localPosition = (Vector3)(float3)keskus;
            float rk = (float)(sade + KaarenKorkeus);
            var paikat = new Vector3[n];
            int i = 0;
            for (int kk = 0; kk <= Kehat; kk++)
            {
                float lat = Mathf.PI * (0.5f - kk / (float)Kehat);
                for (int s = 0; s <= Sektorit; s++, i++)
                {
                    float lon = 2 * Mathf.PI * s / Sektorit;
                    paikat[i] = new Vector3(Mathf.Cos(lat) * Mathf.Cos(lon), Mathf.Sin(lat), Mathf.Cos(lat) * Mathf.Sin(lon)) * rk;
                }
            }
            kaariKuori = new Mesh { name = "Ilmakaari", indexFormat = IndexFormat.UInt32, vertices = paikat, triangles = kuori.triangles };
            // Etupinnat (usva) ja takapinnat (kaari): kolmioiden kierto ratkaisee, kumpi passi näkee kumman puolen.
            kaariKuori.RecalculateBounds();
            k.AddComponent<MeshFilter>().sharedMesh = kaariKuori;
            var kr = k.AddComponent<MeshRenderer>();
            kaari = new Material(varjostin) { name = "Ilmakaari" };
            kaari.SetFloat("_R", (float)sade);
            kaari.SetFloat("_Litistys", (float)(sade / CesiumWgs84Ellipsoid.GetMinimumRadius()));
            kaari.SetFloat("_Korkeus", KaarenKorkeus);
            kaari.SetFloat("_Peitto", 0);
            kr.sharedMaterial = kaari;
            kr.shadowCastingMode = ShadowCastingMode.Off;
            kr.enabled = false;
            ilmanSade = sade;
        }

        double ilmanSade;
        bool ilma2Yritetty;

        /// <summary>Fysikaalinen ilmakehä vasta ensimmäisellä käytöllä (A/B päälle): materiaali ja transmittanssi-LUT.</summary>
        void LuoIlmakeha2()
        {
            ilma2Yritetty = true;
            double sade = ilmanSade;
            var v2 = Resources.Load<Shader>("Varjostimet/Ilmakeha2");
            if (v2 != null && v2.isSupported)
            {
                kaari2 = new Material(v2) { name = "Ilmakeha2" };
                kaari2.SetFloat("_R", (float)sade);
                kaari2.SetFloat("_Litistys", (float)(sade / CesiumWgs84Ellipsoid.GetMinimumRadius()));
                kaari2.SetFloat("_Peitto", 0);
                // Transmittanssi-LUT kerran (256 × 64, puolitarkka): auringon valo mihin tahansa ilmakehän pisteeseen.
                lapinakyvyys = new RenderTexture(256, 64, 0, RenderTextureFormat.ARGBHalf)
                    { name = "IlmakehanLapinakyvyys", filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp, hideFlags = HideFlags.HideAndDontSave };
                lapinakyvyys.Create();
                Graphics.Blit(null, lapinakyvyys, kaari2, 0);
                kaari2.SetTexture("_Lapinakyvyys", lapinakyvyys);
            }
            else Debug.LogWarning("MATKAKIRJA linssit: Ilmakeha2-varjostin puuttuu tai ei tuettu, Ilmakaari käytössä");
        }

        void Update()
        {
            AsetaTausta();
            bool avaus = peitto < 1f, siirtyy = kyyti != kyytiTavoite;
            if (!avaus && !siirtyy && kyyti <= 0f) return;
            peitto = Mathf.MoveTowards(peitto, 1f, Time.unscaledDeltaTime / HaivytysS);
            kyyti = Mathf.MoveTowards(kyyti, kyytiTavoite, Time.unscaledDeltaTime / KyytiS);
            if (hehku != null) hehku.SetFloat("_Peitto", peitto * (1f - kyyti));
            if (avaus) KarttaKerrokset.PallonSavy(Mathf.Lerp(1f, Savy, peitto));
            if (kaari == null) return;
            PaivitaKaari();
        }

        MeshRenderer kaariPiirto;

        void PaivitaKaari()
        {
            kaariPiirto ??= transform.Find("Ilmakaari")?.GetComponent<MeshRenderer>();
            if (kaariPiirto == null) return;
            bool nakyy = kyyti > 0.001f;
            if (kaariPiirto.enabled != nakyy) kaariPiirto.enabled = nakyy;
            // Fysikaalinen ilmakehä (A/B): sama kuori, eri materiaali; LUT voi kadota (laite: taustalle ja takaisin) → uudelleen.
            if (Ilmakeha2 && kaari2 == null && !ilma2Yritetty) { LuoIlmakeha2(); aurinkoPaivitetty = -10f; }
            bool uusi = Ilmakeha2 && kaari2 != null;
            var m = uusi ? kaari2 : kaari;
            if (kaariPiirto.sharedMaterial != m) kaariPiirto.sharedMaterial = m;
            if (uusi && lapinakyvyys != null && !lapinakyvyys.IsCreated()) { lapinakyvyys.Create(); Graphics.Blit(null, lapinakyvyys, kaari2, 0); }
            if (uusi) { kaari2.SetFloat("_Peitto", kyyti); kaari2.SetFloat("_Voima", IlmanVoima); kaari2.SetFloat("_Moni", IlmanMoni); kaari2.SetFloat("_Hehku", HehkuPois ? 0f : IlmahehkunVoima); kaari2.SetFloat("_KaariVoima", Kuvaputki ? KuvanKaariVoima : 1f);
                kaari2.SetFloat("_HrKerroin", Kuvaputki ? KuvanHrKerroin : 1f); kaari2.SetFloat("_SiniKerroin", Kuvaputki ? KuvanSiniKerroin : 1f);
                kaari2.SetFloat("_UtuKerroin", Kuvaputki ? KuvanUtuKerroin : 1f);
                kaari2.SetFloat("_KaariYdin", Kuvaputki ? KuvanKaariYdin : 1f); kaari2.SetFloat("_KaariSyva", Kuvaputki ? KuvanKaariSyva : 0f); kaari2.SetFloat("_NousuVoima", Kuvaputki ? KuvanNousu : 0f); }
            kaari.SetFloat("_Peitto", kyyti);
            // Ilmahehku himmeämmäksi ja ohuemmaksi (laite cl4 28.9.: 0,32 piirsi kirkkaan vihreän viivan; ISS:n yökuvissa se on
            // ohut ja himmeä kellanvihreä kerros): voimakkuus 0,12, σ 4,5 km, sävy (0,55, 0,95, 0,5).
            kaari.SetFloat("_Hehku", HehkuPois ? 0f : IlmahehkunVoima);
            kaari.SetFloat("_HamaraVoima", HehkuPois ? 0f : 1f);
            if (!nakyy) return;
            // Kerran sekunnissa ja sekunnin välein simuloitua aikaa (web kaari.aseta): nopeutettuna joka kehys.
            var utc = Matkakirja.Linssit.Iss.IssNyt.Kello();
            if (Time.unscaledTime - aurinkoPaivitetty < 1f && Math.Abs((utc - aurinkoUtc).TotalSeconds) < 1) return;
            // Keskipiste, napa-akseli ja aurinko maailmassa (georeferenssi voi liikkua); aurinko liikkuu 0,25°/min.
            aurinkoPaivitetty = Time.unscaledTime;
            aurinkoUtc = utc;
            var gt = g.transform;
            double3 keskus = g.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            var kp = gt.TransformPoint((Vector3)(float3)keskus);
            var ak = gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(0, 0, 1))).normalized;
            var au = gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(Aurinko.AurinkoEcef(utc))).normalized;
            foreach (var mm in new[] { kaari, kaari2 })
            {
                if (mm == null) continue;
                mm.SetVector("_Keskus", kp); mm.SetVector("_Akseli", ak); mm.SetVector("_Aurinko", au);
            }
        }

        /// <summary>Vianetsintä (`astro kyyti ilmatila [debug 0–3]`): kameran etäisyys keskipisteestä, LUT-näytteet ja tila.</summary>
        public static string Tila(float? debug)
        {
            var a = FindAnyObjectByType<Avaruus>();
            if (a == null || a.kaari2 == null) return "ilmakeha2: ei materiaalia";
            if (debug.HasValue) a.kaari2.SetFloat("_Debug", debug.Value);
            var cam = Camera.main;
            Vector4 k = a.kaari2.GetVector("_Keskus");
            float et = cam != null ? Vector3.Distance(cam.transform.position, k) : -1f;
            string lut = "ei LUT:ia";
            if (a.lapinakyvyys != null && a.lapinakyvyys.IsCreated())
            {
                var t = new Texture2D(256, 64, TextureFormat.RGBAHalf, false);
                var ed = RenderTexture.active; RenderTexture.active = a.lapinakyvyys;
                t.ReadPixels(new Rect(0, 0, 256, 64), 0, 0); t.Apply(); RenderTexture.active = ed;
                Color c0 = t.GetPixel(255, 0), c1 = t.GetPixel(128, 0), c2 = t.GetPixel(255, 32);
                lut = $"T(h0, μ1) ({c0.r:0.000}, {c0.g:0.000}, {c0.b:0.000}), T(h0, μ0) ({c1.r:0.000}, {c1.g:0.000}, {c1.b:0.000}), T(h25k, μ1) ({c2.r:0.000}, {c2.g:0.000}, {c2.b:0.000})";
                Destroy(t);
            }
            return $"ilmakeha2 {(Ilmakeha2 ? "päällä" : "pois")}, piirto {(a.kaariPiirto != null && a.kaariPiirto.enabled)}, materiaali {(a.kaariPiirto != null ? a.kaariPiirto.sharedMaterial?.name : "-")}, "
                + $"_R {a.kaari2.GetFloat("_R"):0}, yläraja {a.kaari2.GetFloat("_Ylaraja"):0}, kamera–keskus {et:0} m (h {et - a.kaari2.GetFloat("_R"):0}), "
                + $"keskus {(Vector3)k}, lossy {a.transform.lossyScale}, voima {a.kaari2.GetFloat("_Voima"):0.0}, peitto {a.kaari2.GetFloat("_Peitto"):0.00}; {lut}";
        }

        void OnDestroy()
        {
            KarttaKerrokset.Instanssi?.Taustavari(null);
            KarttaKerrokset.PallonSavy(null);
            if (hehku != null) Destroy(hehku);
            if (kaari2 != null) Destroy(kaari2);
            if (lapinakyvyys != null) { lapinakyvyys.Release(); Destroy(lapinakyvyys); }
            if (kuori != null) Destroy(kuori);
            if (kaari != null) Destroy(kaari);
            if (kaariKuori != null) Destroy(kaariKuori);
        }
    }
}
