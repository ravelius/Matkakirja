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
//
// ERA 2B (agentti P5, herkkyystarkistus): AstettaPerPikseli=0,15°/pt -> da (±20°) saturoituu ~133 pt:n vedolla,
// dk (±10°) ~67 pt:llä — iPhonen (375–430 pt leveä, 667–926 pt korkea) ruudulla molemmat ovat selvästi alle
// yhden ruudun mitan, eli täysi kierto/kallistus ei vaadi koko ruudun mittaista vetoa (järkevä peukalotuntuma).
// RajaaKierto (Kameraliike, kohta 1/5) kiristää tätä tarvittaessa vielä tilan/yleisnäkymän omiin rajoihin —
// ks. Sovita alla, joka kutsuu PoikkileikkausLinssi.RajaaPelaajanAsento-metodia PelaajanAsennon jälkeen.
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

        /// <summary>Pelaajan lisäämä poikkeama viimeisimpään Kohdista-asentoon (veto/nipistys), RAJATTUNA
        /// PoikkileikkausLinssi.RajaaPelaajanAsento-metodilla (era 2b, kohta 1/5: Kameraliike.RajaaKierto tilan/
        /// yleisnäkymän kierto-rajoihin); nollataan uudella Kohdistalla. DioraamaSovitin.Linssi (staattinen,
        /// samat instanssi kuin Sovittimen sisäinen linssi-kenttä) on ainoa reitti tähän — DioraamaSovitin.cs:ää
        /// ei muuteta tätä varten (ks. Kohdista/Paivita-metodit siellä, joita tämä erä ei koske).</summary>
        public Asento Sovita(Asento perus)
        {
            var pelaajan = Kameraliike.PelaajanAsento(perus, kokonaisDa, kokonaisDk, kokonaisZoom);
            return DioraamaSovitin.Linssi != null ? DioraamaSovitin.Linssi.RajaaPelaajanAsento(perus, pelaajan) : pelaajan;
        }

        float aloitusAika;

        public void NollaaPoikkeama() { kokonaisDa = 0; kokonaisDk = 0; kokonaisZoom = 1; kaksiKaynnissa = false; }

        public void Paivita(Rakennus rakennus, double t)
        {
            var sormet = Kosketus.activeTouches;
            int n = sormet.Count;
            // Leijunta (era 2b, "poikki drift") ei etene kesken vedon/nipistyksen: PoikkileikkausLinssi.Leijunta
            // lukee tämän NakymaHetkellässä joka kehys (ks. sen alkukommentti).
            if (DioraamaSovitin.Linssi != null) DioraamaSovitin.Linssi.VetoKaynnissa = n > 0;

            if (n == 0)
            {
                // Savuke 1139 (4.10.): valikon huonevalinta saman kosketuksen aikana → irrotus ei ole dioraaman napautus.
                if (DioraamaSovitin.ValikkoPyysi >= aloitusAika - 0.05f) tamaEleEstetty = true;
                if (edellisetSormet == 1 && !tamaEleEstetty && liikeSitenAlusta < NapautusKynnysPx) Napauta(rakennus, aloitusKohta, t);
                // Elävä linna (käsikirjoitus kohta 3): nopea pyyhkäisy alas tilassa → takaisin yleisnäkymään.
                else if (edellisetSormet == 1 && !tamaEleEstetty && rakennus?.Saapuminen != null && DioraamaSovitin.ViimeisinNakyma?.KohdeTila != null)
                {
                    Vector2 d = edellinenYhdenSormenKohta - aloitusKohta;
                    if (-d.y > Screen.height * 0.12f && Mathf.Abs(d.x) < -d.y * 0.6f && Time.unscaledTime - aloitusAika < 0.45f)
                        sovitin.Yleisnakymaan(t);
                }
                edellisetSormet = 0;
                kaksiKaynnissa = false;
                return;
            }

            if (edellisetSormet == 0 && n >= 1)
            {
                aloitusKohta = edellinenYhdenSormenKohta = sormet[0].screenPosition;
                aloitusAika = Time.unscaledTime;
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
                // Paluu kahdesta sormesta yhteen: jatketaan nykyisestä kohdasta (ei hyppyä nipistystä edeltävään pisteeseen).
                if (kaksiKaynnissa) edellinenYhdenSormenKohta = sormet[0].screenPosition;
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
            DioraamaAanet.Napautettu();
            // Elävä linna: saapumiskaaren aikana napautus ohittaa kaaren (loppuun 1 s:ssa), ei kohdista.
            var linssi = DioraamaSovitin.Linssi;
            if (linssi != null && linssi.SaapuminenKaynnissa(t)) { linssi.Napauta(t); return; }
            // Uusi linna (30.9.): kertojan kierroksella napautus siirtää seuraavaan jaksoon, ei kohdista huonetta.
            if (linssi != null && linssi.KertojaKaynnissa(t)) { linssi.Napauta(t); return; }
            // Etsintä (voudin sinetti): aktiivisen vaiheen kimallus ensin.
            if (nayttamo?.Etsinta != null && nayttamo.Etsinta.Napauta(rakennus, ruutu, kamera)) return;
            // Elävä kohde (tila.elava): lähin kohde ruudulla, kun napautus osuu sen säteen (metreinä, ruudulle
            // projisoituna, vähintään 28 pt) sisään. Nimilappuja ei ole, joten kohde on se, mitä tilassa tapahtuu.
            string elava = null;
            float elavaLahin = float.PositiveInfinity;
            foreach (var tila in rakennus.Tilat)
            {
                if (!tila.Kohdistettava || tila.Elava == null) continue;
                var k = DioraamaNayttamo.UnityPiste(tila.Elava.Kohde);
                var r = kamera.WorldToScreenPoint(k);
                if (r.z <= 0f) continue;
                var reuna = kamera.WorldToScreenPoint(k + kamera.transform.right * (float)tila.Elava.Sade);
                float sadePx = Mathf.Max(28f * (Screen.dpi > 0 ? Screen.dpi / 163f : 2f), Vector2.Distance(r, reuna));
                float d = Vector2.Distance(new Vector2(r.x, r.y), ruutu);
                if (d <= sadePx && d < elavaLahin) { elavaLahin = d; elava = tila.Id; }
            }
            if (elava != null) { sovitin.Kohdista(elava, t); return; }

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
