// KOSKETUSVIERITYS (Natiivi-UI, löydös 51, 25.9.2026): oma pystyvieritys kosketukselle UI Toolkitin ScrollViewin tilalle.
//
// Mitattu iPad 503000D1 (pisteskaala ×2), sama heitto 120 pt / 96 ms: UITK:n ScrollView liu'utti lehteä 234 pt eikä
// scrollDecelerationRate vaikuttanut heittoon (0,01–0,5 → sama matka), Safari 653 pt ja tämä 680 pt. Hidas veto on
// 1:1 molemmissa. (Tahmeuden varsinainen syy oli kainalon taiton heilunta, LehtiKainalo.LeveaNosto.)
//
// Tämä kuuntelee ScrollViewin ISÄÄ (TrickleDown ajetaan ennen ScrollViewin omia käsittelijöitä) ja pysäyttää
// kosketuksen PointerMove-tapahtumat, jolloin ScrollView ei vieritä itse. Veto: sisältö seuraa sormea 1:1 (paneelin
// yksiköt = pisteet), kynnys 8 pt pystysuunnassa; vedon alkaessa osoitin kaapataan isälle, jolloin lasten napit
// peruuntuvat eivätkä laukea irrotuksessa. Irrotus: nopeus viimeiseltä 80 ms:lta ja iOS:n normaali hidastuvuus
// (UIScrollView.DecelerationRate.normal 0,998 / ms), reunalla pysähtyy. Hiiri ja kynä kulkevat ScrollViewin omaa reittiä.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Kosketusvieritys
    {
        /// <summary>Koelippu vertailuun: false = UITK:n oma kosketusvieritys (ui lehti vieritys unity|oma).</summary>
        public static bool Kaytossa = true;

        const float Kynnys = 8f, Hidastuvuus = 0.998f, Pysahdys = 10f, NayteMs = 80f;

        readonly VisualElement isa;
        readonly Func<ScrollView> kohde;
        readonly List<(float t, float y)> naytteet = new List<(float, float)>();
        int id = -1;
        bool vetaa;
        Vector2 alku;
        float offset0, nopeus;
        ScrollView sv;
        IVisualElementScheduledItem liuku;

        Kosketusvieritys(VisualElement isa, Func<ScrollView> kohde)
        {
            this.isa = isa;
            this.kohde = kohde;
            isa.RegisterCallback<PointerDownEvent>(Alas, TrickleDown.TrickleDown);
            isa.RegisterCallback<PointerMoveEvent>(Liike, TrickleDown.TrickleDown);
            isa.RegisterCallback<PointerUpEvent>(Ylos, TrickleDown.TrickleDown);
            // Kaapattuna isä on itse kohde: irrotus myös kohdevaiheessa (id-vahti estää tuplakäsittelyn).
            isa.RegisterCallback<PointerUpEvent>(Ylos);
            isa.RegisterCallback<PointerCancelEvent>(_ => Lopeta(false), TrickleDown.TrickleDown);
            isa.RegisterCallback<PointerCaptureOutEvent>(e => { if (e.pointerId == id && vetaa) Lopeta(true); });
        }

        /// <summary>Liittää vierityksen isään, jonka lapsi kohde() on (sivu voi vaihtua).</summary>
        public static void Liita(VisualElement isa, Func<ScrollView> kohde) => new Kosketusvieritys(isa, kohde);

        static bool Kosketus(IPointerEvent e) => e.pointerType == UnityEngine.UIElements.PointerType.touch;

        // Vieritysalue: ScrollViewin vierityspalkin yläraja tai sisällön ja näkymän erotus (suurempi).
        float Suurin => sv == null ? 0f
            : Mathf.Max(0f, sv.verticalScroller.highValue, sv.contentContainer.worldBound.height - sv.contentViewport.worldBound.height);

        void Alas(PointerDownEvent e)
        {
            if (!Kaytossa || !Kosketus(e) || id >= 0) return;
            sv = kohde();
            if (sv == null) return;
            liuku?.Pause();
            liuku = null;
            id = e.pointerId;
            vetaa = false;
            alku = e.position;
            offset0 = sv.scrollOffset.y;
            naytteet.Clear();
            naytteet.Add((Time.unscaledTime * 1000f, e.position.y));
        }

        void Liike(PointerMoveEvent e)
        {
            if (!Kaytossa || !Kosketus(e)) return;
            // ScrollView ei saa vierittää itse kosketuksella (se liikutti sisältöä moninkertaisesti).
            e.StopPropagation();
            if (e.pointerId != id || sv == null) return;
            var d = (Vector2)e.position - alku;
            if (!vetaa)
            {
                if (Mathf.Abs(d.y) < Kynnys || Mathf.Abs(d.y) < Mathf.Abs(d.x)) return;
                vetaa = true;
                // Vedon aikana lasten napit peruuntuvat (PointerCaptureOut) eivätkä laukea irrotuksessa.
                if (!isa.HasPointerCapture(id)) isa.CapturePointer(id);
                alku = e.position; // ei hyppyä kynnyksen verran
                offset0 = sv.scrollOffset.y;
                d = Vector2.zero;
            }
            sv.scrollOffset = new Vector2(sv.scrollOffset.x, Mathf.Clamp(offset0 - d.y, 0f, Suurin));
            float t = Time.unscaledTime * 1000f;
            naytteet.Add((t, e.position.y));
            while (naytteet.Count > 2 && t - naytteet[0].t > NayteMs) naytteet.RemoveAt(0);
        }

        void Ylos(PointerUpEvent e)
        {
            if (e.pointerId != id) return;
            bool veti = vetaa;
            if (veti)
            {
                e.StopPropagation();
                float t = Time.unscaledTime * 1000f;
                naytteet.Add((t, e.position.y));
                while (naytteet.Count > 2 && t - naytteet[0].t > NayteMs) naytteet.RemoveAt(0);
                var a = naytteet[0];
                var b = naytteet[naytteet.Count - 1];
                float dt = b.t - a.t;
                // Sormen nopeus alaspäin (pt/ms) → sisällön siirtymä ylöspäin.
                nopeus = dt > 1f ? -(b.y - a.y) / dt : 0f;
            }
            Lopeta(veti);
        }

        void Lopeta(bool liu)
        {
            int oli = id;
            id = -1;
            vetaa = false;
            // Vapautus laukaisee PointerCaptureOutin: tila nollattu ensin, ettei se aloita toista liukua.
            if (oli >= 0 && isa.HasPointerCapture(oli)) isa.ReleasePointer(oli);
            if (!liu || sv == null || Mathf.Abs(nopeus) * 1000f < Pysahdys) return;
            var kohdeSv = sv;
            float edellinen = Time.unscaledTime * 1000f;
            liuku = kohdeSv.schedule.Execute(() =>
            {
                Ruudunpaivitys.Herata(0.1f); // lämpö: täysi taajuus animaation ajan
                float nyt = Time.unscaledTime * 1000f, dt = Mathf.Max(0f, nyt - edellinen);
                edellinen = nyt;
                // Sijainti integroituna: v(t) = v0 · k^t, siirtymä dt:n aikana v · (k^dt − 1) / ln k.
                float k = Mathf.Pow(Hidastuvuus, dt), lnk = Mathf.Log(Hidastuvuus);
                float siirto = nopeus * (k - 1f) / lnk;
                nopeus *= k;
                float y = kohdeSv.scrollOffset.y + siirto, suurin = Suurin;
                bool reuna = y <= 0f || y >= suurin;
                kohdeSv.scrollOffset = new Vector2(kohdeSv.scrollOffset.x, Mathf.Clamp(y, 0f, suurin));
                if (reuna || Mathf.Abs(nopeus) * 1000f < Pysahdys) { liuku?.Pause(); liuku = null; }
            }).Every(0);
        }
    }
}
