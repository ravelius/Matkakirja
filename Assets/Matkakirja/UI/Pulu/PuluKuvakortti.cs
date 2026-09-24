// PULUN KUVAKORTTI (Natiivi-UI): webin kevyt kuvapopup nähtävyyslinkin päällä
// (js/pollo.js avaaKuvapopup, css dialog.pollo-kuvatausta / .pollo-kuvakortti).
//
// Kun pulun linkki osoittaa nähtävyysjuttuun, jolla on kuva, ei hypätä suoraan juttuun:
// ensin paperikortti, jossa on jutun ensimmäinen kuva, sen PITKÄ kuvateksti · lähde
// (avattu kuva, CC BY -maininta) ja pieni "Avaa juttu" -nappi. Nappi sulkee kortin ja
// avaa jutun nähtävyysarkkiin; napautus kortin ohi sulkee kortin. Chat jää auki
// kortin alle (web: kortti on oma modaalinsa, chat ei sulkeudu).
//
// Kortti: paperi #f5f0e2, reuna rgba(122,85,20,.32), leveys min(640, ruutu − 2 rem);
// kuvan korkeus seuraa kuvan suhdetta, katto ruutu − 14 rem − turva-alueet (webin
// img.pollo-kuva max-height), jotta kuvateksti ja nappi mahtuvat näkyviin.
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class PuluKuvakortti
    {
        /// <summary>Chatin (40) päällä, samassa kerroksessa kuin nähtävyysarkki.</summary>
        const int Kerros = UiKerros.Traileri;

        readonly UiKerros ui;
        readonly VisualElement tausta, kortti, kuva;
        readonly Label teksti;
        readonly Button nappi;
        Action avaaJuttu;
        Texture2D kuvaTex;
        int versio;

        public bool Auki { get; private set; }

        public PuluKuvakortti(UiKerros ui)
        {
            this.ui = ui;
            var juuri = ui.Juuri(Kerros);
            tausta = Rakenne.El("mk-pulukuva", juuri);
            tausta.style.display = DisplayStyle.None;
            // Napautus kortin ohi sulkee vain kortin; chat jää auki alle.
            tausta.RegisterCallback<PointerDownEvent>(e =>
            {
                e.StopPropagation();
                if (e.target == tausta) Sulje();
            });
            kortti = Rakenne.El("mk-pulukuva__kortti", tausta);
            kuva = Rakenne.El("mk-pulukuva__kuva", kortti, PickingMode.Ignore);
            teksti = Rakenne.Teksti("", "mk-pulukuva__teksti", kortti);
            teksti.enableRichText = true;
            teksti.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(teksti, Kirjasin.Luku);
            nappi = Rakenne.Nappi("Avaa juttu", "mk-pulukuva__nappi", Avaa, kortti);
            Kirjasimet.Aseta(nappi, Kirjasin.Kone);
            ui.TurvaMuuttui += Mitoita;
            tausta.RegisterCallback<GeometryChangedEvent>(_ => Mitoita());
            kortti.RegisterCallback<GeometryChangedEvent>(_ => Mitoita());
        }

        /// <summary>
        /// Kortti auki: kuva (LehtiKuva.Lahde, NostoSisalto.HaeKuva-reitti), pitkä kuvateksti
        /// (Selite ?? Lyhyt) ja lähde; avaa = "Avaa juttu" (kortti sulkeutuu ensin).
        /// </summary>
        public void Nayta(LehtiKuva k, Action avaa)
        {
            if (k == null || string.IsNullOrEmpty(k.Lahde)) return;
            avaaJuttu = avaa;
            int v = ++versio;
            kuvaTex = null;
            kuva.style.backgroundImage = StyleKeyword.None;
            NostoSisalto.HaeKuva(k.Lahde, t =>
            {
                if (t == null || v != versio) return;
                kuvaTex = t;
                kuva.style.backgroundImage = new StyleBackground(t);
                Mitoita();
            });
            string pitka = k.Selite ?? k.Lyhyt ?? "";
            string lahde = k.LahdeRivi ?? "";
            teksti.text = Suojaa(pitka) + (lahde.Length > 0 ? "<size=91%><alpha=#CC>" + (pitka.Length > 0 ? " · " : "") + Suojaa(lahde) + "<alpha=#FF></size>" : "");
            teksti.style.display = pitka.Length + lahde.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            if (!Auki)
            {
                Auki = true;
                Rakenne.Nayta(tausta, true, 200);
                SyoteLukko.Esta(this);
            }
            Mitoita();
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            versio++;
            avaaJuttu = null;
            Rakenne.Nayta(tausta, false, 180);
            SyoteLukko.Vapauta(this);
        }

        void Avaa()
        {
            var a = avaaJuttu;
            Sulje();
            a?.Invoke();
        }

        /// <summary>Webin width: min(40rem, 100vw − 2rem) ja kuvan korkeuskatto 100dvh − 14rem − turva.</summary>
        void Mitoita()
        {
            var r = ui.Reunat(Kerros);
            tausta.style.paddingTop = r.y + 16f;
            tausta.style.paddingBottom = r.w + 16f;
            tausta.style.paddingLeft = r.x + 16f;
            tausta.style.paddingRight = r.z + 16f;
            float leveys = kortti.resolvedStyle.width, korkeus = tausta.resolvedStyle.height;
            if (float.IsNaN(leveys) || leveys <= 0 || float.IsNaN(korkeus) || korkeus <= 0) return;
            float sisaLeveys = leveys - 2 * 9.6f - 2f;
            float katto = Mathf.Max(120f, korkeus - 224f - r.y - r.w);
            float h = kuvaTex != null && kuvaTex.width > 0 ? sisaLeveys * kuvaTex.height / kuvaTex.width : sisaLeveys * 0.66f;
            kuva.style.height = Mathf.Min(h, katto);
        }

        static string Suojaa(string x) => string.IsNullOrEmpty(x) ? "" : "<noparse>" + x.Replace("</noparse>", "") + "</noparse>";
    }
}
