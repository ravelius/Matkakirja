// KAUPUNGIN KOHDEKARTTA (Natiivi-UI): nähtävyyskartta, webin js/nahtavyydet.js
// piirraKaupunkiKartta + avaaKarttaSuurennos ja js/karttazoom.js kytkeKarttaZoom
// (speksi docs/raportit/natiivi-ui-nahtavyydet-opas-speksi-20260923.md kohta 3b).
//
// RAKENNE: kehys (overflow hidden, korkeus = leveys × ydinalueen suhde) → lava
// (absoluuttinen, kuvan kokoinen, left/top = −ydinalueen kulma, style.scale + translate,
// transform-origin 0 0) → taustakuva + pisteet (lavan pikseleinä). Levossa näkyy
// täsmälleen ydinrajaus (web ydinAla), reunus paljastuu zoomatessa (REUNUS_AUKEAA 1,25).
//
// PISTEET
//   piirros       40 × 40, skaalautuu kartan mukana (web: "Kuvat pitäisi pysyä saman
//                 kokoisina suhteessa karttaan"). Ensimmäinen napautus valitsee: piirros
//                 liukuu kehyksen keskelle ja laatikko kasvaa 37,5 %:iin kehyksen
//                 korkeudesta (160 ms; kuva on 200 % laatikosta, osuma-ala puolet), kyltti
//                 "n · Nimi" jalan alle; toinen napautus → KohdeAvattu. Päällekkäiset
//                 hajautetaan (web hajautaPiirrospisteet, 46 px, reuna 24 px).
//   numeroympyrä  vain Numeroympyrat-kartoilla piirroksettomille: 26 px, ei skaalaudu
//                 zoomin mukana, väistää päällekkäisyydet (laskeNumeroympyroidenVaisto)
//                 ja piirtää osoitinviivan alkuperäiseen paikkaan, kun väistö ≥ 16 px.
//                 Napautus → KohdeAvattu.
//   muut          piirroksettomia ei piirretä (web PAATOKSET 34 kohta 18 a–b).
//   pienet nimet  vain zoomattuna (opacity-siirtymä 0,35 s).
//
// ELEET (karttazoom.js): zoom 1–3 (kokoruudussa katto = koko ruudun korkeus), nipistys
// kahdella osoittimella, raahaus vain zoomattuna, kaksoisnapautus 1 ↔ 2 (kokoruudussa tai
// zoomattuna), rulla editorissa. Levossa yhden sormen veto EI jää tänne: kehys ei kaappaa
// osoitinta eikä pysäytä tapahtumaa, joten ympäröivä ScrollView vierittää sivua.
// Napautus (liike < 6 px) karttaan levossa ilman valintaa → KokoruutuPyydetty.
//
// KOKORUUTU (Kohdekartan.AvaaKokoruutu): tumma pohja UiKerros.Traileri-kerroksessa,
// kortti keskellä (leveys min(98 % ruudusta, 85 % korkeudesta × suhde)), ×, sama kartta,
// alla kohdeluettelo napattavina riveinä ja lähderivi. Zoomatessa kortti levenee
// 98 %:iin ruudusta ja kartta korkeutta myöten (web levita), luettelo piiloon.
//
// Kyltin jalka mitataan piirroksen alimmasta peittävästä rivistä (web mittaaAlareuna):
// tekstuuri on nonReadable, joten 64 × 64 -blit + AsyncGPUReadback.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class KohdekarttaNakyma : VisualElement
    {
        const float Napautusraja = 6f, Raahausraja = 4f, Askel = 1.5f, Pienin = 1f, Peruskatto = 3f, ReunusAukeaa = 1.25f;
        const float Piirroskoko = 40f, Valintaosuus = 0.375f, HajautusVali = 46f, HajautusReuna = 24f;
        const float KyltinRako = 3f, NimenRako = 6f, NimenSivusiirto = 29.6f;
        const string Kokoruutuikoni = "<path d=\"M14 4h6v6\"/><path d=\"M10 20H4v-6\"/><path d=\"M20 4l-7 7\"/><path d=\"M4 20l7-7\"/>";

        /// <summary>Toinen napautus piirrokseen, napautus numeroympyrään (vain avattavat kohteet).</summary>
        public event Action<KohdekarttaKohde> KohdeAvattu;
        /// <summary>Napautus karttaan levossa (ei kohteen päällä, liike &lt; 6 px) tai "⤢ Kokoruutu".</summary>
        public event Action KokoruutuPyydetty;

        // Kokoruudun levitys (Kohdekartan): zoomin muutos, katto ja lavan naulaus.
        internal event Action<float> ZoomMuuttui;
        internal Func<float> Katto;

        readonly Kohdekartta kartta;
        readonly bool kokoruutu;
        readonly VisualElement kehys, lava, kuva;
        readonly List<Piste> pisteet = new List<Piste>();
        float kuvaSuhde; // korkeus / leveys
        Vector2 lavaKoko;
        bool naulattu, hajautettu;
        float? korkeusOhitus;
        float k = 1f, tx, ty, ilmoitettu = 1f;
        Piste valittu;

        // Eleet
        readonly Dictionary<int, Vector2> sormet = new Dictionary<int, Vector2>();
        Napautus napautus;
        (int Id, Vector2 Alku, float Tx, float Ty)? raahaus;
        bool raahattiin, elettaKesken;
        float nipistysEtaisyys, nipistysKerroin;
        Vector2 nipistysPiste;
        float edellinenAika = -10f;
        Vector2 edellinenPaikka;

        sealed class Napautus
        {
            public int Id;
            public Vector2 Alku;
            public Piste Piste;
            public bool Valinta;
        }

        sealed class Piste
        {
            public KohdekarttaKohde Kohde;
            public bool Piirros;
            public VisualElement Juuri, Kuva, Ympyra;
            public Label Kyltti, Nimi;
            public Osoitin Osoitin;
            public Vector2 Osuus, SiirtoPx, Vaisto;
            public string Url;
        }

        public KohdekarttaNakyma(Kohdekartta kartta, bool kokoruutu = false)
        {
            this.kartta = kartta;
            this.kokoruutu = kokoruutu;
            AddToClassList("mk-kohdekartta");
            if (kokoruutu) AddToClassList("mk-kohdekartta--kokoruutu");
            kuvaSuhde = kartta.Leveys > 0 && kartta.Korkeus > 0 ? kartta.Suhde : 0f;

            if (!kokoruutu)
            {
                var tyokalut = Rakenne.El("mk-kohdekartta__tyokalut", this, PickingMode.Ignore);
                var nappi = Rakenne.Nappi("KOKORUUTU", "mk-kohdekartta__kokoruutu", () => KokoruutuPyydetty?.Invoke(), tyokalut, Kokoruutuikoni);
                nappi.tooltip = "Avaa kartta kokoruudulle";
                Kirjasimet.Aseta(nappi, Kirjasin.Kone);
            }

            kehys = Rakenne.El("mk-kohdekartta__kehys", this);
            lava = Rakenne.El("mk-kohdekartta__lava", kehys, PickingMode.Ignore);
            lava.style.transformOrigin = new TransformOrigin(0, 0);
            kuva = Rakenne.El("mk-kohdekartta__kuva", lava, PickingMode.Ignore);
            // Löydös 63 (web .kartta-mittajana): mittakaavajana ydinalueen vasempaan alakulmaan (3,2 % / 5 %),
            // leveys prosentteina kuvasta; lavan lapsena se skaalautuu kartan mukana kuten webissä.
            if (kartta.JanaOsuus > 0f)
            {
                var ydin = kartta.Ydin;
                var jana = Rakenne.El("mk-kohdekartta__mittajana", lava, PickingMode.Ignore);
                jana.style.width = Length.Percent(kartta.JanaOsuus * 100f);
                jana.style.left = Length.Percent((ydin.x + 0.032f * ydin.width) * 100f);
                jana.style.bottom = Length.Percent((1f - ydin.y - 0.95f * ydin.height) * 100f);
                Rakenne.El("mk-kohdekartta__mittajanakaista", jana, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti(kartta.JanaTeksti, "mk-kohdekartta__mittajanateksti", jana), Kirjasin.Kone);
            }
            if (!string.IsNullOrEmpty(kartta.KuvaUrl))
                Kuvat.Hae(kartta.KuvaUrl, t =>
                {
                    Debug.Log($"MATKAKIRJA kohdekartta {kartta.Kaupunki}: kuva {(t == null ? "puuttuu" : t.width + " × " + t.height)} ({kartta.KuvaUrl})");
                    if (t == null) return;
                    kuva.style.backgroundImage = new StyleBackground(t);
                    if (kuvaSuhde <= 0f && t.width > 0) { kuvaSuhde = (float)t.height / t.width; Asettele(); }
                });

            foreach (var kohde in kartta.Kohteet)
            {
                bool piirros = !string.IsNullOrEmpty(kohde.Piirros);
                if (!piirros && !kartta.Numeroympyrat) continue;
                pisteet.Add(piirros ? LuoPiirros(kohde) : LuoYmpyra(kohde));
            }

            if (!kokoruutu && !string.IsNullOrEmpty(kartta.Lahde))
                Kirjasimet.Aseta(Rakenne.Teksti(kartta.Lahde, "mk-kohdekartta__lahde", this), Kirjasin.Kone);

            kehys.RegisterCallback<GeometryChangedEvent>(_ => Asettele());
            kehys.RegisterCallback<PointerDownEvent>(OsoitinAlas);
            kehys.RegisterCallback<PointerMoveEvent>(OsoitinLiikkuu);
            kehys.RegisterCallback<PointerUpEvent>(OsoitinYlos);
            kehys.RegisterCallback<PointerCancelEvent>(e => Peru(e.pointerId));
            kehys.RegisterCallback<PointerCaptureOutEvent>(e => Peru(e.pointerId));
            kehys.RegisterCallback<WheelEvent>(Rulla);
        }

        public Kohdekartta Kartta => kartta;
        public float Zoom => k;

        // --- pisteet ---------------------------------------------------------------------

        Piste LuoPiirros(KohdekarttaKohde kohde)
        {
            var p = new Piste { Kohde = kohde, Piirros = true, Url = kohde.Piirros, Osuus = new Vector2(kohde.X, kohde.Y) / 100f, SiirtoPx = kohde.Siirto };
            p.Juuri = Rakenne.El("mk-kohdekartta__piirros", lava);
            p.Juuri.userData = p;
            p.Kuva = Rakenne.El("mk-kohdekartta__piirroskuva", p.Juuri, PickingMode.Ignore);
            p.Kyltti = Rakenne.Teksti($"{kohde.Numero} · {kohde.Nimi}", "mk-kohdekartta__kyltti", p.Juuri);
            Kirjasimet.Aseta(p.Kyltti, Kirjasin.Kone);
            p.Nimi = Nimilappu(kohde, p.Juuri);
            Kuvat.Hae(kohde.Piirros, t =>
            {
                // Puuttuva piirros vie koko merkin (web onVirhe → piste.remove()).
                if (t == null) { p.Juuri.RemoveFromHierarchy(); pisteet.Remove(p); if (valittu == p) valittu = null; return; }
                p.Kuva.style.backgroundImage = new StyleBackground(t);
                MittaaJalka(kohde.Piirros, t, osuus =>
                {
                    p.Kyltti.style.top = Length.Percent(-50f + 200f * osuus + KyltinRako);
                    p.Nimi.style.top = Length.Percent(100f * osuus + NimenRako);
                });
            });
            return p;
        }

        Piste LuoYmpyra(KohdekarttaKohde kohde)
        {
            var p = new Piste { Kohde = kohde, Osuus = new Vector2(kohde.X, kohde.Y) / 100f, SiirtoPx = kohde.Siirto };
            // Ankkuri on 0 × 0 pisteen kohdalla: vastaskaalaus 1/zoom ja väistö sen ympäri.
            p.Juuri = Rakenne.El("mk-kohdekartta__ankkuri", lava, PickingMode.Ignore);
            p.Juuri.style.transformOrigin = new TransformOrigin(0, 0);
            p.Osoitin = new Osoitin();
            p.Juuri.Add(p.Osoitin);
            p.Ympyra = Rakenne.El("mk-kohdekartta__ympyra", p.Juuri);
            p.Ympyra.userData = p;
            Kirjasimet.Aseta(Rakenne.Teksti(kohde.Numero.ToString(), "mk-kohdekartta__numero", p.Ympyra), Kirjasin.LukuLihava);
            p.Nimi = Nimilappu(kohde, p.Juuri);
            p.Nimi.AddToClassList("mk-kohdekartta__nimi--ympyra");
            return p;
        }

        static Label Nimilappu(KohdekarttaKohde kohde, VisualElement isa)
        {
            var l = Rakenne.Teksti(kohde.Nimi, "mk-kohdekartta__nimi", isa);
            Kirjasimet.Aseta(l, Kirjasin.Kone);
            float siirto = kohde.NimiPuoli == "vasen" ? -NimenSivusiirto : kohde.NimiPuoli == "oikea" ? NimenSivusiirto : 0f;
            if (siirto != 0f) l.style.marginLeft = -37f + siirto;
            return l;
        }

        // --- asettelu --------------------------------------------------------------------

        float Reunat => kehys.resolvedStyle.borderTopWidth + kehys.resolvedStyle.borderBottomWidth;
        float Suhde => kuvaSuhde > 0f ? kuvaSuhde : 0.75f;

        /// <summary>Näkyvän (ydin)alueen korkeus / leveys.</summary>
        internal float NakyvaSuhde => Suhde * kartta.Ydin.height / Mathf.Max(0.001f, kartta.Ydin.width);

        /// <summary>Ydinalueen koko levossa (lavan pikseleinä = kehyksen sisämitat levossa).</summary>
        internal Vector2 LepoKoko => new Vector2(kartta.Ydin.width * lavaKoko.x, kartta.Ydin.height * lavaKoko.y);

        /// <summary>Kokoruudun levitys: lava pysyy pikselikoossaan, vaikka kehys muuttuu.</summary>
        internal void Naulaa(bool paalla, float? korkeus = null)
        {
            naulattu = paalla && lavaKoko.x > 0;
            korkeusOhitus = naulattu ? korkeus : null;
            Asettele();
        }

        void Asettele()
        {
            float w = kehys.contentRect.width;
            if (float.IsNaN(w) || w < 20f) return;
            var y = kartta.Ydin;
            float korkeus = korkeusOhitus ?? Mathf.Round(w * NakyvaSuhde);
            kehys.style.height = korkeus + Reunat;
            if (!naulattu)
            {
                float lw = w / Mathf.Max(0.001f, y.width), lh = lw * Suhde;
                lavaKoko = new Vector2(lw, lh);
                lava.style.width = lw;
                lava.style.height = lh;
                lava.style.left = -y.x * lw;
                lava.style.top = -y.y * lh;
                SijoitaPisteet();
            }
            Piirra(false);
        }

        void SijoitaPisteet()
        {
            if (!hajautettu && lavaKoko.x >= 40f && lavaKoko.y >= 2 * HajautusReuna + HajautusVali) { Hajauta(); hajautettu = true; }
            foreach (var p in pisteet)
            {
                if (p == valittu) { SijoitaValittu(); continue; }
                var paikka = Vector2.Scale(p.Osuus, lavaKoko) + p.SiirtoPx;
                p.Juuri.style.left = paikka.x;
                p.Juuri.style.top = paikka.y;
            }
            Vaista();
        }

        /// <summary>web hajautaPiirrospisteet: päällekkäiset piirrokset erilleen ydinalueen sisällä.</summary>
        void Hajauta()
        {
            var piirrokset = pisteet.FindAll(p => p.Piirros);
            if (piirrokset.Count < 2) return;
            float W = lavaKoko.x, K = lavaKoko.y;
            var y = kartta.Ydin;
            float x0 = y.x * W + HajautusReuna, x1 = y.xMax * W - HajautusReuna;
            float y0 = y.y * K + HajautusReuna, y1 = y.yMax * K - HajautusReuna;
            var paikat = piirrokset.ConvertAll(p => Vector2.Scale(p.Osuus, lavaKoko));
            Vector2 Rajaa(Vector2 v) => new Vector2(Mathf.Min(Mathf.Max(v.x, x0), x1), Mathf.Min(Mathf.Max(v.y, y0), y1));
            for (int kierros = 0; kierros < 60; kierros++)
            {
                bool liikkui = false;
                for (int a = 0; a < paikat.Count; a++)
                    for (int b = a + 1; b < paikat.Count; b++)
                    {
                        var d = paikat[b] - paikat[a];
                        float pituus = d.magnitude;
                        if (pituus >= HajautusVali) continue;
                        if (pituus < 0.001f) { d = Vector2.right; pituus = 1f; }
                        var siirto = d / pituus * ((HajautusVali - pituus) / 2f);
                        paikat[a] -= siirto;
                        paikat[b] += siirto;
                        liikkui = true;
                    }
                for (int i = 0; i < paikat.Count; i++) paikat[i] = Rajaa(paikat[i]);
                if (!liikkui) break;
            }
            for (int i = 0; i < piirrokset.Count; i++)
            {
                var r = Rajaa(paikat[i]);
                piirrokset[i].Osuus = new Vector2(r.x / W, r.y / K);
                piirrokset[i].SiirtoPx = Vector2.zero;
            }
        }

        /// <summary>web vaistaNumeroympyrat + laskeNumeroympyroidenVaisto (halkaisija 26, rako 4, enintään 24 px).</summary>
        void Vaista()
        {
            var ympyrat = pisteet.FindAll(p => !p.Piirros);
            if (ympyrat.Count < 2) return;
            const float Min = 26f + 4f, Enintaan = 24f;
            var paikat = ympyrat.ConvertAll(p => Vector2.Scale(p.Osuus, lavaKoko));
            var v = new Vector2[ympyrat.Count];
            for (int kierros = 0; kierros < 120; kierros++)
            {
                bool liikkui = false;
                for (int a = 0; a < paikat.Count; a++)
                    for (int b = a + 1; b < paikat.Count; b++)
                    {
                        var d = (paikat[b] + v[b]) - (paikat[a] + v[a]);
                        float pituus = d.magnitude;
                        if (pituus >= Min) continue;
                        if (pituus < 0.001f) { d = Vector2.right; pituus = 1f; }
                        var puoli = d / pituus * ((Min - pituus) / 2f);
                        v[a] -= puoli;
                        v[b] += puoli;
                        liikkui = true;
                    }
                for (int i = 0; i < v.Length; i++) if (v[i].magnitude > Enintaan) v[i] = v[i].normalized * Enintaan;
                if (!liikkui) break;
            }
            for (int i = 0; i < ympyrat.Count; i++)
            {
                var p = ympyrat[i];
                p.Vaisto = v[i].magnitude < 2f ? Vector2.zero : v[i];
                p.Osoitin.Aseta(p.Vaisto);
            }
        }

        // --- zoom ------------------------------------------------------------------------

        float Ylaraja()
        {
            float katto = Katto?.Invoke() ?? 0f;
            return katto > Peruskatto ? katto : Peruskatto;
        }

        static float Rajaa(float arvo, float ala, float yla) => Mathf.Min(yla, Mathf.Max(ala, arvo));

        void Piirra(bool silea)
        {
            float W = lavaKoko.x, H = lavaKoko.y;
            if (W <= 0f || H <= 0f) return;
            k = Mathf.Clamp(k, Pienin, Ylaraja());
            var y = kartta.Ydin;
            float reunus = Mathf.Clamp01((k - 1f) / (ReunusAukeaa - 1f));
            float x0 = y.x * W, y0 = y.y * H, kW = y.width * W, kH = y.height * H;
            var sisa = kehys.contentRect;
            float iW = Mathf.Max(kW, sisa.width), iH = Mathf.Max(kH, sisa.height);
            tx = Rajaa(tx, x0 + iW - k * (x0 + kW + reunus * (W - x0 - kW)), x0 - k * (x0 * (1f - reunus)));
            ty = Rajaa(ty, y0 + iH - k * (y0 + kH + reunus * (H - y0 - kH)), y0 - k * (y0 * (1f - reunus)));
            bool zoomattu = k > 1.001f;
            if (!zoomattu) { tx = 0f; ty = 0f; }
            lava.EnableInClassList("mk-kohdekartta__lava--silea", silea);
            lava.style.translate = new Translate(tx, ty);
            lava.style.scale = new Scale(new Vector2(k, k));
            EnableInClassList("mk-kohdekartta--zoomattu", zoomattu);

            // Vastaskaalaus: kyltit, piirrosten nimet ja numeroympyrät pysyvät ruudulla samankokoisina.
            float s = 1f / k;
            var vasta = new Scale(new Vector2(s, s));
            foreach (var p in pisteet)
            {
                if (p.Piirros)
                {
                    p.Kyltti.style.scale = vasta;
                    p.Nimi.style.scale = vasta;
                }
                else
                {
                    p.Juuri.style.scale = vasta;
                    p.Juuri.style.translate = new Translate(p.Vaisto.x * s, p.Vaisto.y * s);
                }
            }
            if (valittu != null) SijoitaValittu();

            if (Mathf.Abs(k - ilmoitettu) > 0.0005f)
            {
                ilmoitettu = k;
                ZoomMuuttui?.Invoke(k);
            }
        }

        /// <summary>Kehyksen sisäpiste (ruudun paneelikoordinaatti) lavan asettelukoordinaatistoon (ennen muunnosta).</summary>
        Vector2 Lavalle(Vector2 paneeli)
        {
            var y = kartta.Ydin;
            return kehys.WorldToLocal(paneeli) - kehys.contentRect.position + new Vector2(y.x * lavaKoko.x, y.y * lavaKoko.y);
        }

        void Zoomaa(float uusi, Vector2 paneeli, bool silea = false)
        {
            float kohde = Mathf.Clamp(uusi, Pienin, Ylaraja());
            if (Mathf.Abs(kohde - k) < 0.0005f) return;
            var m = Lavalle(paneeli);
            float suhde = kohde / k;
            tx = m.x - (m.x - tx) * suhde;
            ty = m.y - (m.y - ty) * suhde;
            k = kohde;
            Piirra(silea);
        }

        Vector2 Keskipiste => kehys.LocalToWorld(kehys.contentRect.center);

        /// <summary>Zoomaa kehyksen keskipisteeseen (web napit: askel ×1,5).</summary>
        public void Lahenna() => Zoomaa(k * Askel, Keskipiste, true);
        public void Loitonna() => Zoomaa(k / Askel, Keskipiste, true);
        public void Nollaa() { k = 1f; tx = 0f; ty = 0f; Piirra(true); }

        // --- valinta ---------------------------------------------------------------------

        void Valitse(Piste p)
        {
            Tyhjenna();
            valittu = p;
            p.Juuri.AddToClassList("mk-kohdekartta__piirros--liike");
            p.Juuri.AddToClassList("mk-kohdekartta__piirros--valittu");
            p.Juuri.BringToFront();
            SijoitaValittu();
        }

        void SijoitaValittu()
        {
            var p = valittu;
            if (p == null || lavaKoko.x <= 0f) return;
            var sisa = kehys.contentRect;
            var y = kartta.Ydin;
            // Kehyksen keskipiste lavan koordinaateissa: c = −ydin + t + k·p.
            var keski = sisa.size / 2f + new Vector2(y.x * lavaKoko.x, y.y * lavaKoko.y);
            p.Juuri.style.left = (keski.x - tx) / k;
            p.Juuri.style.top = (keski.y - ty) / k;
            float koko = Valintaosuus * sisa.height / k;
            p.Juuri.style.width = koko;
            p.Juuri.style.height = koko;
        }

        void Tyhjenna()
        {
            var p = valittu;
            if (p == null) return;
            valittu = null;
            p.Juuri.RemoveFromClassList("mk-kohdekartta__piirros--valittu");
            p.Juuri.style.width = Piirroskoko;
            p.Juuri.style.height = Piirroskoko;
            var paikka = Vector2.Scale(p.Osuus, lavaKoko) + p.SiirtoPx;
            p.Juuri.style.left = paikka.x;
            p.Juuri.style.top = paikka.y;
        }

        /// <summary>Tyhjentää piirroksen valinnan (esim. näkymän sulkeutuessa).</summary>
        public void TyhjennaValinta() => Tyhjenna();

        static Piste PisteKohdasta(IEventHandler kohde)
        {
            for (var e = kohde as VisualElement; e != null; e = e.parent)
                if (e.userData is Piste p) return p.Kohde.Avattava ? p : null;
            return null;
        }

        void PisteNapautettu(Piste p)
        {
            if (!p.Piirros) { KohdeAvattu?.Invoke(p.Kohde); return; }
            if (p == valittu) { KohdeAvattu?.Invoke(p.Kohde); return; }
            Valitse(p);
        }

        // --- eleet -----------------------------------------------------------------------

        bool Zoomattu => k > Pienin + 0.001f;

        void OsoitinAlas(PointerDownEvent e)
        {
            if (e.pointerType == UnityEngine.UIElements.PointerType.mouse && e.button != 0) return;
            if (e.isPrimary) { sormet.Clear(); elettaKesken = false; }
            var osuma = PisteKohdasta(e.target);
            bool oliValinta = valittu != null;
            if (osuma == null || !osuma.Piirros) Tyhjenna();
            sormet[e.pointerId] = e.position;
            raahattiin = false;

            if (sormet.Count >= 2)
            {
                // Nipistys: molemmat osoittimet tänne, sivu ei vieri.
                napautus = null;
                raahaus = null;
                raahattiin = true;
                elettaKesken = true;
                edellinenAika = -10f;
                foreach (var id in sormet.Keys) if (!kehys.HasPointerCapture(id)) kehys.CapturePointer(id);
                AloitaNipistys();
                e.StopPropagation();
                return;
            }

            napautus = new Napautus { Id = e.pointerId, Alku = e.position, Piste = osuma, Valinta = oliValinta };
            if (Zoomattu)
            {
                raahaus = (e.pointerId, (Vector2)e.position, tx, ty);
                kehys.CapturePointer(e.pointerId);
                e.StopPropagation();
            }
            else if (kokoruutu)
            {
                // Kokoruudussa ei ole vieritettävää sivua: osoitin pidetään tässä.
                kehys.CapturePointer(e.pointerId);
            }
        }

        void AloitaNipistys()
        {
            var (keski, etaisyys) = Kaksi();
            if (etaisyys < 24f) { nipistysEtaisyys = 0f; return; }
            var m = Lavalle(keski);
            nipistysEtaisyys = etaisyys;
            nipistysKerroin = k;
            nipistysPiste = new Vector2((m.x - tx) / k, (m.y - ty) / k);
        }

        (Vector2 Keski, float Etaisyys) Kaksi()
        {
            Vector2 a = default, b = default;
            int n = 0;
            foreach (var p in sormet.Values) { if (n == 0) a = p; else if (n == 1) b = p; n++; }
            return n >= 2 ? ((a + b) / 2f, Vector2.Distance(a, b)) : (a, 0f);
        }

        void OsoitinLiikkuu(PointerMoveEvent e)
        {
            if (!sormet.ContainsKey(e.pointerId)) return;
            sormet[e.pointerId] = e.position;
            if (napautus != null && napautus.Id == e.pointerId && Vector2.Distance(e.position, napautus.Alku) > Napautusraja) napautus = null;

            if (sormet.Count >= 2 && elettaKesken)
            {
                if (nipistysEtaisyys <= 0f) { AloitaNipistys(); e.StopPropagation(); return; }
                var (keski, etaisyys) = Kaksi();
                k = Mathf.Clamp(nipistysKerroin * etaisyys / nipistysEtaisyys, Pienin, Ylaraja());
                var m = Lavalle(keski);
                tx = m.x - nipistysPiste.x * k;
                ty = m.y - nipistysPiste.y * k;
                Piirra(false);
                e.StopPropagation();
                return;
            }

            if (raahaus is { } r && r.Id == e.pointerId)
            {
                var d = (Vector2)e.position - r.Alku;
                if (!raahattiin && d.magnitude < Raahausraja) { e.StopPropagation(); return; }
                raahattiin = true;
                tx = r.Tx + d.x;
                ty = r.Ty + d.y;
                Piirra(false);
                e.StopPropagation();
            }
        }

        void OsoitinYlos(PointerUpEvent e)
        {
            bool oli = sormet.Remove(e.pointerId);
            if (kehys.HasPointerCapture(e.pointerId)) kehys.ReleasePointer(e.pointerId);
            if (raahaus is { } r && r.Id == e.pointerId) raahaus = null;
            if (elettaKesken)
            {
                e.StopPropagation();
                if (sormet.Count == 1) { nipistysEtaisyys = 0f; } // yksi sormi jäi: ei napautusta
                if (sormet.Count == 0) elettaKesken = false;
                napautus = null;
                return;
            }
            var alku = napautus;
            napautus = null;
            if (!oli || alku == null || alku.Id != e.pointerId || raahattiin) return;
            if (Vector2.Distance(e.position, alku.Alku) > Napautusraja) return;

            if (alku.Piste != null)
            {
                edellinenAika = -10f;
                PisteNapautettu(alku.Piste);
                e.StopPropagation();
                return;
            }

            // Kaksoisnapautus (karttazoom.js): 1 ↔ 2 napautuskohtaan.
            if (kokoruutu || Zoomattu)
            {
                float nyt = Time.unscaledTime;
                bool osuma = nyt - edellinenAika < 0.38f && Vector2.Distance(e.position, edellinenPaikka) < 30f;
                edellinenAika = osuma ? -10f : nyt;
                edellinenPaikka = e.position;
                if (osuma)
                {
                    if (Zoomattu) Nollaa();
                    else Zoomaa(2f, e.position, true);
                    e.StopPropagation();
                    return;
                }
            }

            if (!kokoruutu && !alku.Valinta && !Zoomattu) KokoruutuPyydetty?.Invoke();
        }

        void Peru(int id)
        {
            if (!sormet.Remove(id)) return;
            if (napautus != null && napautus.Id == id) napautus = null;
            if (raahaus is { } r && r.Id == id) raahaus = null;
            if (sormet.Count == 0) elettaKesken = false;
            else if (elettaKesken) nipistysEtaisyys = 0f;
        }

        void Rulla(WheelEvent e)
        {
            bool sisaan = e.delta.y < 0f;
            if (sisaan ? k >= Ylaraja() - 0.001f : k <= Pienin + 0.001f) return;
            Zoomaa(k * Mathf.Exp(-e.delta.y * 16f / 620f), e.mousePosition);
            e.StopPropagation();
        }

        // --- kyltin jalka ----------------------------------------------------------------

        const int Mittaruutu = 64, MusteenRaja = 24;
        static readonly Dictionary<string, float> jalat = new Dictionary<string, float>();
        static readonly Dictionary<string, List<Action<float>>> mittauksessa = new Dictionary<string, List<Action<float>>>();

        /// <summary>
        /// web jalanOsuus(mittaaAlareuna): kuvan alimman peittävän rivin paikka piirroslaatikon
        /// korkeuden osuutena (contain-sovitus huomioiden). Mittaamaton = 1 (koko kuvan alle).
        /// </summary>
        static void MittaaJalka(string url, Texture2D t, Action<float> valmis)
        {
            if (jalat.TryGetValue(url, out var o)) { valmis(o); return; }
            if (mittauksessa.TryGetValue(url, out var jono)) { jono.Add(valmis); return; }
            float s = t.height > 0 ? (float)t.width / t.height : 1f;
            if (!(s > 1f)) s = 1f;
            float Osuus(float alareuna) => (1f - 1f / s) / 2f + alareuna / s;
            if (!SystemInfo.supportsAsyncGPUReadback) { jalat[url] = Osuus(1f); valmis(jalat[url]); return; }
            mittauksessa[url] = new List<Action<float>> { valmis };
            var rt = RenderTexture.GetTemporary(Mittaruutu, Mittaruutu, 0, RenderTextureFormat.ARGB32);
            Graphics.Blit(t, rt);
            AsyncGPUReadback.Request(rt, 0, TextureFormat.RGBA32, pyynto =>
            {
                float alareuna = 1f;
                if (!pyynto.hasError)
                {
                    var data = pyynto.GetData<Color32>();
                    // Rivi 0 on kuvan alareuna (Unityn tekstuurikäytäntö): ensimmäinen peittävä rivi alhaalta.
                    for (int rivi = 0; rivi < Mittaruutu; rivi++)
                    {
                        bool muste = false;
                        for (int x = 0; x < Mittaruutu && !muste; x++) muste = data[rivi * Mittaruutu + x].a > MusteenRaja;
                        if (muste) { alareuna = (Mittaruutu - rivi) / (float)Mittaruutu; break; }
                    }
                }
                RenderTexture.ReleaseTemporary(rt);
                float tulos = Osuus(alareuna);
                jalat[url] = tulos;
                if (!mittauksessa.TryGetValue(url, out var odottajat)) return;
                mittauksessa.Remove(url);
                foreach (var v in odottajat) { try { v(tulos); } catch (Exception ex) { Debug.LogException(ex); } }
            });
        }

        /// <summary>Numeroympyrän osoitinviiva alkuperäiseen paikkaan (web .kohde-osoitin, väistö ≥ 16 px).</summary>
        sealed class Osoitin : VisualElement
        {
            static readonly Color Muste = new Color32(0x2c, 0x23, 0x18, 255);
            Vector2 v;

            public Osoitin()
            {
                pickingMode = PickingMode.Ignore;
                AddToClassList("mk-kohdekartta__osoitin");
                generateVisualContent += Piirra;
            }

            public void Aseta(Vector2 vaisto)
            {
                if (vaisto == v) return;
                v = vaisto;
                MarkDirtyRepaint();
            }

            void Piirra(MeshGenerationContext mgc)
            {
                float pituus = v.magnitude;
                if (pituus < 16f) return;
                var suunta = -v / pituus;
                var p = mgc.painter2D;
                p.strokeColor = Muste;
                p.fillColor = Muste;
                p.lineWidth = 2f;
                p.BeginPath();
                p.MoveTo(suunta * 12f);
                p.LineTo(suunta * pituus);
                p.Stroke();
                p.BeginPath();
                p.Arc(suunta * pituus, 3f, Angle.Degrees(0f), Angle.Degrees(360f));
                p.Fill();
            }
        }
    }

    /// <summary>Kohdekartan kokoruutu (web avaaKarttaSuurennos) ja testiapu.</summary>
    public static class Kohdekartan
    {
        sealed class Kokoruutu
        {
            public VisualElement Tausta, Kortti;
            public KohdekarttaNakyma Nakyma;
            public ScrollView Selitteet;
            public Label Lahde;
            public bool Levitetty, Tarkistettu;
        }

        static Kokoruutu auki;

        public static bool Auki => auki != null;

        /// <summary>
        /// Avaa kartan kokoruudulle: postikorttikehys + ×, sama kartta isona, alla kohdeluettelo
        /// napattavina riveinä ja lähderivi. Kohteen avaus sulkee kokoruudun ja kutsuu avaa.
        /// </summary>
        public static void AvaaKokoruutu(Kohdekartta k, Action<KohdekarttaKohde> avaa)
        {
            if (k == null) return;
            Sulje();
            var kerros = UiKerros.Hae();
            var r = new Kokoruutu();
            auki = r;
            r.Tausta = Rakenne.El("mk-kohdekartta-kokoruutu", kerros.Juuri(UiKerros.Traileri));
            r.Tausta.style.display = DisplayStyle.None;
            var reunat = kerros.Reunat(UiKerros.Traileri);
            r.Tausta.style.paddingLeft = reunat.x;
            r.Tausta.style.paddingTop = reunat.y;
            r.Tausta.style.paddingRight = reunat.z;
            r.Tausta.style.paddingBottom = reunat.w;
            r.Tausta.RegisterCallback<PointerDownEvent>(e => { if (e.target == r.Tausta) Sulje(); });

            r.Kortti = Rakenne.El("mk-kohdekartta-kokoruutu__kortti", r.Tausta);
            r.Nakyma = new KohdekarttaNakyma(k, kokoruutu: true);
            r.Kortti.Add(r.Nakyma);
            void Avaa(KohdekarttaKohde kohde)
            {
                Sulje();
                avaa?.Invoke(kohde);
            }
            r.Nakyma.KohdeAvattu += Avaa;

            var sulku = Rakenne.Nappi("×", "mk-kohdekartta-kokoruutu__sulku", Sulje, r.Kortti);
            sulku.tooltip = "Sulje suurennettu kartta";

            if (k.Kohteet.Count > 0)
            {
                r.Selitteet = new ScrollView(ScrollViewMode.Vertical);
                r.Selitteet.AddToClassList("mk-kohdekartta-kokoruutu__selitteet");
                r.Selitteet.verticalScrollerVisibility = ScrollerVisibility.Hidden;
                r.Selitteet.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
                r.Kortti.Add(r.Selitteet);
                foreach (var kohde in k.Kohteet)
                {
                    VisualElement rivi;
                    if (kohde.Avattava)
                    {
                        var kk = kohde;
                        rivi = Rakenne.Nappi(kohde.Nimi, "mk-kohdekartta-kokoruutu__selite mk-kohdekartta-kokoruutu__selite--nappi", () => Avaa(kk), r.Selitteet.contentContainer);
                    }
                    else rivi = Rakenne.Teksti(kohde.Nimi, "mk-kohdekartta-kokoruutu__selite", r.Selitteet.contentContainer);
                    Kirjasimet.Aseta(rivi, Kirjasin.Kone);
                }
            }
            if (!string.IsNullOrEmpty(k.Lahde))
            {
                r.Lahde = Rakenne.Teksti(k.Lahde, "mk-kohdekartta-kokoruutu__lahde", r.Kortti);
                Kirjasimet.Aseta(r.Lahde, Kirjasin.Kone);
            }

            // Katto = koko ruudun korkeus (web ruudunKatto), levitys zoomatessa (web levita).
            r.Nakyma.Katto = () =>
            {
                var (_, vh) = Ala(r);
                float lepo = r.Nakyma.LepoKoko.y;
                return vh > 0f && lepo > 0f ? vh * 0.98f / lepo : 0f;
            };
            r.Nakyma.ZoomMuuttui += kerroin => Levita(r, kerroin);
            r.Tausta.RegisterCallback<GeometryChangedEvent>(_ => { r.Tarkistettu = false; Mitoita(r); });
            r.Kortti.RegisterCallback<GeometryChangedEvent>(_ => TarkistaKorkeus(r));

            Rakenne.Nayta(r.Tausta, true, 200);
            SyoteLukko.Esta(r);
        }

        public static void Sulje()
        {
            var r = auki;
            if (r == null) return;
            auki = null;
            SyoteLukko.Vapauta(r);
            Rakenne.Nayta(r.Tausta, false, 180);
            r.Tausta.schedule.Execute(() => r.Tausta.RemoveFromHierarchy()).StartingIn(200);
        }

        static (float Vw, float Vh) Ala(Kokoruutu r)
        {
            var a = r.Tausta.contentRect;
            return (float.IsNaN(a.width) ? 0f : a.width, float.IsNaN(a.height) ? 0f : a.height);
        }

        /// <summary>web mitoitaKarttaSuurennos: leveys = min(98 % ruudusta, 85 % korkeudesta × suhde).</summary>
        static void Mitoita(Kokoruutu r)
        {
            var (vw, vh) = Ala(r);
            if (vw <= 0f || vh <= 0f) return;
            if (r.Selitteet != null) r.Selitteet.style.maxHeight = Mathf.Round(vh * 0.2f);
            r.Kortti.style.maxHeight = Mathf.Round(vh * 0.98f);
            if (r.Levitetty) { Levita(r, r.Nakyma.Zoom); return; }
            float suhde = 1f / Mathf.Max(0.01f, r.Nakyma.NakyvaSuhde);
            r.Kortti.style.width = Mathf.Round(Mathf.Min(vw * 0.98f, vh * 0.85f * suhde));
        }

        /// <summary>Kortti ruutua korkeampi (pitkä luettelo): kavennetaan, enintään puoleen leveydestä.</summary>
        static void TarkistaKorkeus(Kokoruutu r)
        {
            if (r.Levitetty || r.Tarkistettu) return;
            var (vw, vh) = Ala(r);
            float h = r.Kortti.layout.height;
            if (vw <= 0f || vh <= 0f || float.IsNaN(h)) return;
            float yli = h - vh * 0.98f;
            if (yli <= 1f) return;
            r.Tarkistettu = true;
            float suhde = 1f / Mathf.Max(0.01f, r.Nakyma.NakyvaSuhde);
            float leveys = r.Kortti.layout.width;
            r.Kortti.style.width = Mathf.Round(Mathf.Max(leveys - yli * suhde, vw * 0.5f));
        }

        static void Levita(Kokoruutu r, float kerroin)
        {
            var (vw, vh) = Ala(r);
            bool levitetty = kerroin > 1.001f && vw > 0f && vh > 0f;
            if (!levitetty)
            {
                if (!r.Levitetty) return;
                r.Levitetty = false;
                r.Kortti.RemoveFromClassList("mk-kohdekartta-kokoruutu__kortti--levitetty");
                r.Nakyma.Naulaa(false);
                r.Tarkistettu = false;
                Mitoita(r);
                return;
            }
            if (!r.Levitetty) r.Nakyma.Naulaa(true);
            r.Levitetty = true;
            r.Kortti.AddToClassList("mk-kohdekartta-kokoruutu__kortti--levitetty");
            var lepo = r.Nakyma.LepoKoko;
            r.Kortti.style.width = Mathf.Round(Mathf.Min(vw * 0.98f, lepo.x * kerroin));
            r.Nakyma.Naulaa(true, Mathf.Round(Mathf.Min(vh * 0.98f, lepo.y * kerroin)));
        }

        /// <summary>
        /// Testikomento: kaupungin kohdekartta minipopupissa (kokoruutu = false) tai suoraan kokoruudulla.
        /// Kohteen avaus kirjoitetaan lokiin (ja tilariville, jos annettu).
        /// </summary>
        public static void Testaa(string kaupunki, bool kokoruutu = false, Action<string> ilmoita = null)
        {
            void Avattu(KohdekarttaKohde kohde)
            {
                string viesti = $"Kohdekartta: avaa {kohde.Numero} · {kohde.Nimi}" + (kohde.Juttu != null ? " (juttu)" : kohde.Wiki != null ? " (wiki)" : "");
                Debug.Log("MATKAKIRJA ui " + viesti);
                ilmoita?.Invoke(viesti);
            }
            Kohdekartat.Hae(kaupunki, k =>
            {
                if (k == null) { ilmoita?.Invoke("Kohdekartta: ei karttaa kaupungille " + kaupunki); Debug.LogWarning("MATKAKIRJA ui kohdekartta puuttuu: " + kaupunki); return; }
                if (kokoruutu) { AvaaKokoruutu(k, Avattu); return; }
                Minipopup.Avaa("Nähtävyydet", s =>
                {
                    var n = new KohdekarttaNakyma(k);
                    n.KohdeAvattu += Avattu;
                    n.KokoruutuPyydetty += () => AvaaKokoruutu(k, Avattu);
                    s.Add(n);
                });
            });
        }
    }
}
