// IHMISEN MATKA II: TEHOSTEKERROS (omistaja 25.9.2026, Raamattu "IHMISEN MATKA II"; suunnitelma
// docs/raportit/ihmisen-matka-2-suunnitelma-20260925.md, Fable hyväksyi 25.9.).
//
// Sama esitys (Esitys.cs) kuin I:ssä; IhmisenMatkaKerros välittää sen kutsut (Musta, Valot, Jakso, SytytaKohde,
// Kuva, Loppu) myös tälle komponentille, joka kertoo tarinan valolla. Ydin ei muutu.
//
// ERÄ 1 (omistajan kolme vaatimusta; tekstityksen logiikka on IhmisenMatkaKerroksessa):
//   KUVA ISOMMAKSI JA KARTTA VÄISTÄÄ: havainnekuvan alue lasketaan ruudun muodosta (puhelin pystyssä: yläpuolisko
//   koko leveydeltä; vaaka: oikea puolisko; iPad pystyssä: yläosa 80 %:n levyisenä). Kartan katsekohde siirtyy
//   projektion pääpisteen siirrolla (KarttaKerrokset.Linssisiirto, Natiiviseppä) kuvan alta vapaalle alueelle, joten
//   kamera, kallistus ja eleet eivät muutu. UI (Natiivi-UI) sijoittaa kuvan IhmisenMatkaKerros.KuvanAlue-alueeseen.
//   VANAT EIVÄT NÄY KUVAN ALTA: VanaKerros häivyttää kaistan kuvan alueelta (Vana.shader _KuvanAlue), sisään ja ulos
//   kuvan tahdissa (KuvanHaivytysS).
//
// ERÄT 2–5 (valokeila, sumu, äänimaisemat, vapaat kädet) rakentuvat samoihin koukkuihin.
using System.Collections.Generic;
using Matkakirja.Linssit.Aikajana;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public class IhmisenMatka2Tehosteet : MonoBehaviour
    {
        /// <summary>Kuvan ja kartan väistön liuku (s): sama tahti kuin kuvan sisääntulo (UI 0,4–0,5 s) pidennettynä.</summary>
        public const float SiirtoS = 0.9f;
        /// <summary>Vanojen häivytys kuvan alueelta (s).</summary>
        public const float KuvanHaivytysS = 0.4f;
        /// <summary>Kuvan reunavara ruudun reunaan (pt).</summary>
        public const float ReunaPt = 12f;
        /// <summary>Linssin yläpalkin varaus turva-alueen alla (pt): nimi, Tauko, ☰ ja vuosiluku (LINSSIEN YLÄPALKKI iPHONELLA).</summary>
        public const float YlapalkkiPt = 96f;
        /// <summary>Aikaselaimen varaus alareunassa (pt).</summary>
        public const float AlapalkkiPt = 104f;
        /// <summary>Havainnekuvien kuvasuhde (ämpärin kuvat 1536 × 1024).</summary>
        public const float Kuvasuhde = 1.5f;

        IhmisenMatkaKerros kerros;
        Dictionary<string, (double Lat, double Lon)> paikat;
        string kuvaKohde;
        float kuvanPeitto;
        bool siirtoPaalla;
        int ruutuW, ruutuH;

        /// <summary>Kuvan alue ruudun osuuksina (origo vasen yläkulma); null, kun kuvaa ei ole.</summary>
        public Rect? KuvanAlue { get; private set; }

        public void Kytke(IhmisenMatkaKerros k, PalloKierto kierto, Dictionary<string, (double Lat, double Lon)> paikkaIndeksi)
        {
            kerros = k;
            paikat = paikkaIndeksi;
            LinssiOhjain.Instanssi?.Kirjaa("ihmisen matka II: tehosteet kytketty");
        }

        public void Musta(bool paalla, double feidiMs) { }

        public void Valot(double feidiMs) { }

        public void Jakso(int i, KertomusJakso jakso) { }

        public void SytytaKohde(string kohde) { }

        /// <summary>Esitys näyttää löytöpaikan kuvan (tai null = kuva pois): kuvan alue ja kartan väistö.</summary>
        public void Kuva(string kohde)
        {
            kuvaKohde = kohde;
            if (kohde == null)
            {
                KuvanAlue = null;
                if (siirtoPaalla) KarttaKerrokset.LinssisiirtoPois(Kesto(SiirtoS));
                siirtoPaalla = false;
                return;
            }
            Asettele();
        }

        public void Loppu()
        {
            KuvanAlue = null;
            if (siirtoPaalla) KarttaKerrokset.LinssisiirtoPois(Kesto(SiirtoS));
            siirtoPaalla = false;
        }

        static float Kesto(float s) => LinssiOhjain.Instanssi != null && LinssiOhjain.Instanssi.VahennettyLiike ? 0f : s;

        /// <summary>
        /// Kuvan alue ja kartan väistö ruudun muodosta. Pisteet muunnetaan pikseleiksi LinssiOhjain.Pistekerroin-kertoimella
        /// (sama kuin UI:n pt). Katsekohde siirretään kuvan ulkopuolisen vapaan alueen keskelle.
        /// </summary>
        void Asettele()
        {
            float W = Screen.width, H = Screen.height;
            if (W < 1 || H < 1) return;
            ruutuW = Screen.width; ruutuH = Screen.height;
            float pt = Mathf.Max(1f, LinssiOhjain.Pistekerroin);
            Rect turva = Screen.safeArea;                        // origo vasen alakulma
            float ylaTurva = H - turva.yMax, alaTurva = turva.yMin;
            float vasenTurva = turva.xMin, oikeaTurva = W - turva.xMax;
            float reuna = ReunaPt * pt;
            float yla = ylaTurva + YlapalkkiPt * pt;           // kuvan yläraja (ylhäältä)
            float ala = H - alaTurva - AlapalkkiPt * pt;       // vapaan alueen alaraja (ylhäältä)

            float x, y, w, h, dx = 0f, dy = 0f;
            if (W >= H)
            {
                // VAAKA: kuva oikealle puolelle, kohde vasemman vapaan alueen keskelle.
                w = Mathf.Min(0.52f * W, (ala - yla) * Kuvasuhde);
                h = w / Kuvasuhde;
                x = W - oikeaTurva - reuna - w;
                y = yla + Mathf.Max(0f, ((ala - yla) - h) * 0.5f);
                float xk = (vasenTurva + reuna + (x - reuna)) * 0.5f;
                dx = xk / W - 0.5f;
            }
            else
            {
                // PYSTY: puhelimella koko leveys (92 %), iPadilla 80 %; kohde kuvan alapuolisen vapaan alueen keskelle.
                bool puhelin = W / H < 0.62f;
                w = Mathf.Min((puhelin ? 1f : 0.8f) * (W - vasenTurva - oikeaTurva) - 2f * reuna, (ala - yla) * 0.55f * Kuvasuhde);
                h = w / Kuvasuhde;
                x = (W - w) * 0.5f;
                y = yla;
                float yk = (y + h + ala) * 0.5f;
                dy = -(yk / H - 0.5f);
            }
            KuvanAlue = new Rect(x / W, y / H, w / W, h / H);
            KarttaKerrokset.Linssisiirto(Mathf.Clamp(dx, -0.5f, 0.5f), Mathf.Clamp(dy, -0.5f, 0.5f), Kesto(SiirtoS));
            siirtoPaalla = true;
            LinssiOhjain.Instanssi?.Kirjaa($"ihmisen matka II: kuva {kuvaKohde} alue {KuvanAlue.Value.x:0.00},{KuvanAlue.Value.y:0.00} " +
                $"{KuvanAlue.Value.width:0.00}×{KuvanAlue.Value.height:0.00}, väistö {dx:0.00},{dy:0.00}");
        }

        void Update()
        {
            // Ruudun kierto kesken kuvan: alue ja väistö uudelleen.
            if (kuvaKohde != null && (Screen.width != ruutuW || Screen.height != ruutuH)) Asettele();
            float tavoite = KuvanAlue.HasValue ? 1f : 0f;
            float kesto = Kesto(KuvanHaivytysS);
            kuvanPeitto = kesto <= 0f ? tavoite : Mathf.MoveTowards(kuvanPeitto, tavoite, Time.unscaledDeltaTime / kesto);
            var v = kerros != null ? kerros.Vanat : null;
            if (v != null)
            {
                if (KuvanAlue.HasValue) v.kuvanAlue = KuvanAlue.Value;
                v.kuvanPeitto = kuvanPeitto;
            }
        }

        void OnDestroy()
        {
            // Linssi suljettiin: kartan pääpiste heti paikalleen (kamera palaa omalla ajollaan).
            if (siirtoPaalla) KarttaKerrokset.LinssisiirtoPois(0f);
            siirtoPaalla = false;
            KuvanAlue = null;
        }
    }
}
