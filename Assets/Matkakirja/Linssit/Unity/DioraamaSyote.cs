// DIORAAMAN SYÖTE (Poikkileikkaus-linssi, Linnanrakentaja erä 1, 29.9.2026): napautus, veto ja nipistys, kun
// linssi on auki. Sama reitti kuin PalloKierron omalla eleellä (UnityEngine.InputSystem.EnhancedTouch.Touch,
// PalloKierto.cs käyttää samaa, EnhancedTouchSupport.Enable() on jo päällä), mutta täysin oma tila — pallon oma
// ele on estetty SyoteLukko.Esta-lukolla linssin auki ollessa (DioraamaSovitin.Avaa/Sulje).
//
// napautus  → säde dioraaman kamerasta → lähin Kohdistettava-tilan AABB (Unity-kehyksessä) → Sovitin.Kohdista;
//             napautus tyhjään ei tee mitään (ei nollaa yleisnäkymää eikä vaihda tilaa).
// veto      → da/dk (Kameraliike.PelaajanAsento): kokonaisliike sormen alas menosta asti, ei ruutu ruudulta,
//             jottei pieni tärinä kerry; nollautuu aina uuden Kohdista-kutsun yhteydessä.
// nipistys  → zoom samalla tavalla; sormien etääntyessä lähempi (zoom < 1). Reilusti rajan (1,3) yli asti
//             pinnistäminen palaa yleisnäkymään (Sovitin.Yleisnakymaan), kuten speksi pyytää.
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using Kosketus = UnityEngine.InputSystem.EnhancedTouch.Touch;

namespace Matkakirja.Natiivi
{
    // Alias nimiavaruuden SISÄLLÄ (ks. DioraamaNayttamo.cs): muuten ympäröivän Matkakirja-nimiavaruuden oma V3
    // (Kartta/NimiLadonta.cs) voittaisi tiedoston alun using-tuonnin.
    using V3 = Matkakirja.Linssit.Dioraama.V3;

    public sealed class DioraamaSyote
    {
        const float NapautusKynnysPx = 12f;
        const float AstettaPerPikseli = 0.15f;
        const float ZoomYliRajan = 1.5f; // PelaajanAsento puristaa 1,3:een asti; tämän yli pinnistys = yleisnäkymään

        readonly DioraamaSovitin sovitin;
        readonly DioraamaNayttamo nayttamo;

        int edellisetSormet;
        Vector2 aloitusKohta, edellinenYhdenSormenKohta;
        float liikeSitenAlusta;
        bool tamaEleEstetty;

        bool kaksiKaynnissa;
        float kaksiAlkuVali;
        double kokonaisDa, kokonaisDk, kokonaisZoom = 1;

        public DioraamaSyote(DioraamaSovitin sovitin, DioraamaNayttamo nayttamo)
        {
            this.sovitin = sovitin;
            this.nayttamo = nayttamo;
        }

        /// <summary>Pelaajan lisäämä poikkeama viimeisimpään Kohdista-asentoon (veto/nipistys); nollataan uudella Kohdistalla.</summary>
        public Asento Sovita(Asento perus) => Kameraliike.PelaajanAsento(perus, kokonaisDa, kokonaisDk, kokonaisZoom);

        public void NollaaPoikkeama() { kokonaisDa = 0; kokonaisDk = 0; kokonaisZoom = 1; kaksiKaynnissa = false; }

        public void Paivita(Rakennus rakennus, double t)
        {
            var sormet = Kosketus.activeTouches;
            int n = sormet.Count;

            if (n == 0)
            {
                if (edellisetSormet == 1 && !tamaEleEstetty && liikeSitenAlusta < NapautusKynnysPx) Napauta(rakennus, aloitusKohta, t);
                edellisetSormet = 0;
                kaksiKaynnissa = false;
                return;
            }

            if (edellisetSormet == 0 && n >= 1)
            {
                aloitusKohta = edellinenYhdenSormenKohta = sormet[0].screenPosition;
                liikeSitenAlusta = 0f;
                tamaEleEstetty = DioraamaSovitin.PeittaaRuutu != null && DioraamaSovitin.PeittaaRuutu(aloitusKohta);
            }

            if (tamaEleEstetty)
            {
                edellisetSormet = n;
                return;
            }

            if (n == 1)
            {
                kaksiKaynnissa = false;
                Vector2 p = sormet[0].screenPosition;
                liikeSitenAlusta += Vector2.Distance(p, edellinenYhdenSormenKohta);
                edellinenYhdenSormenKohta = p;
                if (liikeSitenAlusta >= NapautusKynnysPx)
                {
                    Vector2 d = p - aloitusKohta;
                    kokonaisDa = Mathf.Clamp(-d.x * AstettaPerPikseli, -20f, 20f);
                    kokonaisDk = Mathf.Clamp(d.y * AstettaPerPikseli, -10f, 10f);
                }
            }
            else // n >= 2: nipistys (zoom) + kahden sormen kierto siirtää da:ta samalla tavalla kuin veto
            {
                Vector2 a = sormet[0].screenPosition, b = sormet[1].screenPosition;
                float vali = Vector2.Distance(a, b);
                if (!kaksiKaynnissa) { kaksiAlkuVali = Mathf.Max(1f, vali); kaksiKaynnissa = true; }
                else
                {
                    double raakaZoom = kaksiAlkuVali / Mathf.Max(1f, vali);
                    if (raakaZoom > ZoomYliRajan) { sovitin.Yleisnakymaan(t); edellisetSormet = n; return; }
                    kokonaisZoom = raakaZoom;
                }
            }
            edellisetSormet = n;
        }

        void Napauta(Rakennus rakennus, Vector2 ruutu, double t)
        {
            var kamera = nayttamo != null ? nayttamo.Kamera : null;
            if (kamera == null || rakennus?.Tilat == null) return;
            var sade = kamera.ScreenPointToRay(new Vector3(ruutu.x, ruutu.y, 0));
            string osuma = null;
            float lahin = float.PositiveInfinity;
            foreach (var tila in rakennus.Tilat)
            {
                if (!tila.Kohdistettava) continue;
                var rajat = UnityAabb(tila.RajaMin, tila.RajaMax);
                if (rajat.IntersectRay(sade, out float etaisyys) && etaisyys < lahin) { lahin = etaisyys; osuma = tila.Id; }
            }
            if (osuma != null) sovitin.Kohdista(osuma, t); // napautus tyhjään: ei tehdä mitään
        }

        static Bounds UnityAabb(V3 min, V3 max)
        {
            Vector3 a = DioraamaNayttamo.UnityPiste(min), b = DioraamaNayttamo.UnityPiste(max);
            var rajat = new Bounds();
            rajat.SetMinMax(Vector3.Min(a, b), Vector3.Max(a, b));
            return rajat;
        }
    }
}
