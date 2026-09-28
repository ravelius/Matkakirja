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

        Material hehku, kaari;
        Mesh kuori, kaariKuori;
        float peitto, kyyti, kyytiTavoite, aurinkoPaivitetty = -10f;
        CesiumGeoreference g;

        /// <summary>A/B (`astro kyyti ilmakeha vanha|uusi`): kyydissäkin kaukonäkymän hehku.</summary>
        public static bool VanhaIlmakeha;
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
            kaari.SetFloat("_Peitto", kyyti);
            kaari.SetFloat("_Hehku", HehkuPois ? 0f : 0.32f);
            kaari.SetFloat("_HamaraVoima", HehkuPois ? 0f : 1f);
            if (!nakyy || Time.unscaledTime - aurinkoPaivitetty < 1f) return;
            // Keskipiste, napa-akseli ja aurinko maailmassa (georeferenssi voi liikkua); aurinko liikkuu 0,25°/min.
            aurinkoPaivitetty = Time.unscaledTime;
            var gt = g.transform;
            double3 keskus = g.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            kaari.SetVector("_Keskus", gt.TransformPoint((Vector3)(float3)keskus));
            kaari.SetVector("_Akseli", gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(new double3(0, 0, 1))).normalized);
            kaari.SetVector("_Aurinko", gt.TransformDirection((Vector3)(float3)g.TransformEarthCenteredEarthFixedDirectionToUnity(Aurinko.AurinkoEcef(Matkakirja.Linssit.Iss.IssNyt.Kello()))).normalized);
        }

        void OnDestroy()
        {
            KarttaKerrokset.Instanssi?.Taustavari(null);
            KarttaKerrokset.PallonSavy(null);
            if (hehku != null) Destroy(hehku);
            if (kuori != null) Destroy(kuori);
            if (kaari != null) Destroy(kaari);
            if (kaariKuori != null) Destroy(kaariKuori);
        }
    }
}
