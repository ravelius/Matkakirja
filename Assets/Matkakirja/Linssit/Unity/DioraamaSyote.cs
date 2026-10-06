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
using System;
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
        // KÄSIPYÖRITYS (omistaja 5.10., TF 141: "Miksi linnaa ei voi pyörittää koko kierrosta? Linnan käsin pyöritys on liian
        // nopea. Saisi liikkua pehmeämmin"): screenPosition on PIKSELEITÄ (iPhone 3×), joten 0,15°/px saturoi ±20°:n rajan jo
        // ~45 pt:n vedolla. Nyt kulma ruudun osuutena (koko leveys = 120°, koko korkeus = 40°), yleisnäkymässä vapaa 360°
        // (rakennus.json ei rajaa yleiskameraa), huoneessa tilan kierto-rajat; irrotuksen jälkeen inertia hiipuu ~0,5 s:ssa.
        const float AstettaLeveydella = 120f, AstettaKorkeudella = 40f, InertiaTau = 0.5f;
        double inertiaDa, edellinenDa;
        Kierto viimeKierto;
        bool viimeHuoneessa;
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
        // Eleen alun poikkeama (omistajan TF 141 -palaute 5.10.: uusi veto nollasi edellisen, kamera napsahti takaisin).
        double vetoAlkuDa, vetoAlkuDk, zoomAlku = 1;

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
            viimeKierto = perus.Kierto;
            viimeHuoneessa = DioraamaSovitin.ViimeisinNakyma?.KohdeTila != null;
            // Ytimen PelaajanAsento rajaa da:n ±20°:een (kultaiset vektorit): atsimuutti lisätään tässä, rajaus RajaaDa + RajaaKierto.
            var p0 = Kameraliike.PelaajanAsento(perus, 0, kokonaisDk, kokonaisZoom);
            var pelaajan = new Asento(p0.Kohde, p0.Atsimuutti + kokonaisDa, p0.Korkeus, p0.Etaisyys, p0.Fov, p0.Aukko, p0.Kierto);
            return DioraamaSovitin.Linssi != null ? DioraamaSovitin.Linssi.RajaaPelaajanAsento(perus, pelaajan) : pelaajan;
        }

        float aloitusAika;

        public void NollaaPoikkeama() { kokonaisDa = 0; kokonaisDk = 0; kokonaisZoom = 1; vetoAlkuDa = vetoAlkuDk = 0; zoomAlku = 1; kaksiKaynnissa = false; inertiaDa = 0; }

        /// <summary>Atsimuuttipoikkeama rajattuna: huoneessa tilan kierto-rajat (oletus ±55°), yleisnäkymässä vapaa (ei rajaa).</summary>
        double RajaaDa(double da)
        {
            if (!viimeHuoneessa && (viimeKierto == null || (viimeKierto.AtsimuuttiMin == null && viimeKierto.AtsimuuttiMax == null)))
                return Math.IEEERemainder(da, 360.0);
            var k = viimeKierto ?? Kierto.OletusTila;
            return Math.Clamp(da, k.AtsimuuttiMin ?? -180, k.AtsimuuttiMax ?? 180);
        }

        public void Paivita(Rakennus rakennus, double t)
        {
            var sormet = Kosketus.activeTouches;
            int n = sormet.Count;
            // Leijunta (era 2b, "poikki drift") ei etene kesken vedon/nipistyksen: PoikkileikkausLinssi.Leijunta
            // lukee tämän NakymaHetkellässä joka kehys (ks. sen alkukommentti).
            if (DioraamaSovitin.Linssi != null) DioraamaSovitin.Linssi.VetoKaynnissa = n > 0;

            if (n == 0)
            {
                // Inertia: irrotuksen nopeus hiipuu eksponentiaalisesti (vain atsimuutti; kallistus ja zoom pysähtyvät heti).
                if (Math.Abs(inertiaDa) > 0.3)
                {
                    float dt = Mathf.Min(Time.unscaledDeltaTime, 0.1f);
                    kokonaisDa = RajaaDa(kokonaisDa + inertiaDa * dt);
                    inertiaDa *= Math.Exp(-dt / InertiaTau);
                }
                else inertiaDa = 0;
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
                vetoAlkuDa = edellinenDa = kokonaisDa; vetoAlkuDk = kokonaisDk; inertiaDa = 0;
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
                // Uusi alku myös vedolle, jottei kahden sormen jälkeen yhden sormen veto napsahda eleen alun kohtaan.
                if (kaksiKaynnissa) { edellinenYhdenSormenKohta = aloitusKohta = sormet[0].screenPosition; vetoAlkuDa = edellinenDa = kokonaisDa; vetoAlkuDk = kokonaisDk; liikeSitenAlusta = NapautusKynnysPx; }
                kaksiKaynnissa = false;
                Vector2 p = sormet[0].screenPosition;
                liikeSitenAlusta += Vector2.Distance(p, edellinenYhdenSormenKohta);
                edellinenYhdenSormenKohta = p;
                if (liikeSitenAlusta >= NapautusKynnysPx)
                {
                    Vector2 d = p - aloitusKohta;
                    kokonaisDa = RajaaDa(vetoAlkuDa - d.x / Mathf.Max(1, Screen.width) * AstettaLeveydella);
                    kokonaisDk = Mathf.Clamp((float)vetoAlkuDk + d.y / Mathf.Max(1, Screen.height) * AstettaKorkeudella, -10f, 10f);
                    // Irrotusnopeus (°/s) pehmennettynä muutaman kehyksen yli; atsimuutin kääre ei hyppää (pieni ero).
                    float dtv = Mathf.Max(Time.unscaledDeltaTime, 1e-3f);
                    double muutos = Math.IEEERemainder(kokonaisDa - edellinenDa, 360.0);
                    inertiaDa = 0.7 * inertiaDa + 0.3 * Math.Clamp(muutos / dtv, -240, 240);
                    edellinenDa = kokonaisDa;
                }
            }
            else // n >= 2: nipistys (zoom) + kahden sormen kierto siirtää da:ta samalla tavalla kuin veto
            {
                Vector2 a = sormet[0].screenPosition, b = sormet[1].screenPosition;
                float vali = Vector2.Distance(a, b);
                if (!kaksiKaynnissa) { kaksiAlkuVali = Mathf.Max(1f, vali); kaksiKaynnissa = true; zoomAlku = kokonaisZoom; }
                else
                {
                    double raakaZoom = kaksiAlkuVali / Mathf.Max(1f, vali);
                    if (raakaZoom > ZoomYliRajan) { sovitin.Yleisnakymaan(t); edellisetSormet = n; return; }
                    kokonaisZoom = zoomAlku * raakaZoom;
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
            if (linssi != null && linssi.SaapuminenKaynnissa(t)) { Haara("saapumisen ohitus"); linssi.Napauta(t); return; }
            // Uusi linna (30.9.): kertojan kierroksella napautus siirtää seuraavaan jaksoon, ei kohdista huonetta.
            if (linssi != null && linssi.KertojaKaynnissa(t)) { Haara("kertojan jakso ohi"); linssi.Napauta(t); return; }
            // Etsintä (voudin sinetti): aktiivisen vaiheen kimallus ensin.
            if (nayttamo?.Etsinta != null && nayttamo.Etsinta.Napauta(rakennus, ruutu, kamera)) { Haara("etsintä"); return; }
            // Pulu napautuksesta (omistajan linnapalaute 5.10.): huoneessa napautus hahmoon → Pulun reaktio siihen hahmoon,
            // napautus huoneeseen → Pulun seuraava faktakohta (PoikkileikkausLinssi.Napauta(t, hahmo)). Muu huone kohdistuu kuten ennen.
            string nykyinen = DioraamaSovitin.ViimeisinNakyma?.KohdeTila;
            if (linssi != null && linssi.PuluNapautuksesta && nykyinen != null && rakennus.Tila(nykyinen) is Tila oma)
            {
                string hahmo = LahinHahmo(oma, ruutu, kamera);
                int kohta = hahmo == null ? LahinKohde(oma, ruutu, kamera) : -1;
                var sade0 = kamera.ScreenPointToRay(new Vector3(ruutu.x, ruutu.y, 0));
                if (hahmo != null || kohta >= 0 || UnityAabb(oma.RajaMin, oma.RajaMax).IntersectRay(sade0))
                {
                    DioraamaTaulu.KorttiTila = nykyinen;   // huonekortti vain pelaajan napautuksesta (omistaja 5.10. 23.0x)
                    // Keskustelun (kuunnelman) aikana Pulu odottaa vuoroaan: puhuu, kun keskustelu päättyy (ei keskeytä).
                    Haara($"pulu {(KuunnelmaKaistale.SoiNyt ? "jonoon" : "nyt")} ({nykyinen}/{hahmo ?? "-"}/{kohta})");
                    if (KuunnelmaKaistale.SoiNyt) DioraamaSovitin.PuluJonoon(nykyinen, hahmo, kohta);
                    else linssi.Napauta(t, hahmo, kohta);
                    return;
                }
            }
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
            if (elava != null) { Haara("elävä kohde → kohdista " + elava); sovitin.Kohdista(elava, t); return; }

            var sade = kamera.ScreenPointToRay(new Vector3(ruutu.x, ruutu.y, 0));
            string osuma = null;
            float lahin = float.PositiveInfinity;
            foreach (var tila in rakennus.Tilat)
            {
                if (!tila.Kohdistettava) continue;
                var rajat = UnityAabb(tila.RajaMin, tila.RajaMax);
                if (rajat.IntersectRay(sade, out float etaisyys) && etaisyys < lahin) { lahin = etaisyys; osuma = tila.Id; }
            }
            Haara(osuma != null ? "kohdista " + osuma + " (nykyinen " + (nykyinen ?? "-") + ")" : "tyhjä");
            if (osuma == null && nykyinen == null) DioraamaTaulu.LaputNakyvissa = !DioraamaTaulu.LaputNakyvissa;   // nimilaput napautuksesta
            if (osuma != null) sovitin.Kohdista(osuma, t); // napautus tyhjään: ei tehdä mitään
        }

        /// <summary>Napautuksen käsittelyhaara lokiin (Pulun jonon todennus oikealla tapilla, Siirtoseppä 5.10.).</summary>
        static void Haara(string h) => Debug.Log("MATKAKIRJA linssit: napautus → " + h);

        /// <summary>Huoneen hahmo, jonka vartalon (paikka + 0,9 m) ruutupisteen lähelle napautus osuu: säde on 0,6 m ruudulle
        /// projisoituna, vähintään 36 pt (sama mitoitus kuin elävällä kohteella). Vain hahmot, joilla on Pulun reaktio.</summary>
        static string LahinHahmo(Tila tila, Vector2 ruutu, Camera kamera)
        {
            string paras = null;
            float lahin = float.PositiveInfinity;
            float minPx = 36f * (Screen.dpi > 0 ? Screen.dpi / 163f : 2f);
            foreach (var h in tila.Hahmot)
            {
                if (h.Reaktio == null) continue;
                var p = DioraamaNayttamo.UnityPiste(h.Paikka) + Vector3.up * 0.9f;
                var r = kamera.WorldToScreenPoint(p);
                if (r.z <= 0f) continue;
                var reuna = kamera.WorldToScreenPoint(p + kamera.transform.right * 0.6f);
                float sadePx = Mathf.Max(minPx, Vector2.Distance(r, reuna));
                float d = Vector2.Distance(new Vector2(r.x, r.y), ruutu);
                if (d <= sadePx && d < lahin) { lahin = d; paras = h.Id; }
            }
            return paras;
        }

        /// <summary>Taulun kohta, jonka kohteen (taulu.kohdat[].kohde, kohtaukset v2) lähelle napautus osuu, tai −1. Päällekkäisistä
        /// valitaan pienin säde (Linnanrakentaja 5.10.: vihkimäristien 5,4 m:n kaari kattaa koko kappelin ja hagioskoopin 0,45 m).</summary>
        static int LahinKohde(Tila tila, Vector2 ruutu, Camera kamera)
        {
            var kohdat = tila.Taulu?.Kohdat;
            if (kohdat == null) return -1;
            int paras = -1;
            double pieninSade = double.PositiveInfinity;
            float lahin = float.PositiveInfinity;
            float minPx = 36f * (Screen.dpi > 0 ? Screen.dpi / 163f : 2f);
            for (int i = 0; i < kohdat.Count; i++)
            {
                if (!(kohdat[i].KohdePaikka is V3 kp)) continue;
                var p = DioraamaNayttamo.UnityPiste(kp);
                var r = kamera.WorldToScreenPoint(p);
                if (r.z <= 0f) continue;
                var reuna = kamera.WorldToScreenPoint(p + kamera.transform.right * (float)Math.Max(0.3, kohdat[i].KohdeSade));
                float sadePx = Mathf.Max(minPx, Vector2.Distance(r, reuna));
                float d = Vector2.Distance(new Vector2(r.x, r.y), ruutu);
                double sade = kohdat[i].KohdeSade;
                if (d <= sadePx && (sade < pieninSade || (sade == pieninSade && d < lahin))) { pieninSade = sade; lahin = d; paras = i; }
            }
            return paras;
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
