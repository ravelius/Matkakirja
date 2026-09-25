// MINIPULUN KYSYMYSKORTTI (Natiivi-UI): webin .satelliitti-pulukortti
// (js/linssit/satelliitti.js, css/satelliitti.css) astronautin valokuvanäkymässä.
//
// Omistaja 16.9.2026: "Pulun chatti pitäisi toimia normaalisti vaikka itse pulu
// olisi pienemmän kokoinen." Kortti kasvaa minipulun yläpuolelle oikeaan
// alakulmaan (tumma lasi, vihreä reuna):
//   Kysy viisaalta pöllöltä pululta:        ×
//   [kohteen valmis kysymys] [toinen]       ← osa virtaa, vierivät pois kuten chatissa
//   pelaajan kysymys (oikealla) / Livian vastaus (vasemmalla)
//   [ Kysy mitä tahansa…            ] [↑]
// Valmiit ovat vain KYSYMYKSIÄ: pilleri lähettää kysymyksen samaa reittiä kuin vapaa
// kysymys ja kartan pulu (PuluChat.KysyUlkoisesti: sama konteksti, historia ja lukko).
// Webin sääntö 17.9. (js/linssit/satelliitti.js vastaaKysymykseen, Raamattu ASTRONAUTIN
// KAMERA LISAYS 14); esikirjoitetut vastaukset poistettu (omistajan build 9 -löydös 35).
// Ei striimiä (kuten natiivin chatissa): vastaus tulee kerralla, ja virta kelataan
// niin, että sen alku näkyy (web: vastaus luetaan alusta).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class MinipulunKortti
    {
        const int KysymysKatto = 300;

        readonly VisualElement kortti, ehdotukset;
        readonly ScrollView virta;
        readonly TextField kentta;
        readonly Button laheta;
        string tunnus;
        /// <summary>Kysymys matkalla (web kysymysKesken): ↑ pois käytöstä, minipulun leijunta tauolla.</summary>
        public bool Kesken { get; private set; }
        public bool Auki { get; private set; }
        public event Action<bool> AukiMuuttui;

        public MinipulunKortti(VisualElement isa)
        {
            kortti = Rakenne.El("mk-minipuluKortti", isa);
            kortti.style.display = DisplayStyle.None;
            // Kosketukset eivät valu kuvan zoomaukseen.
            kortti.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());

            var ylarivi = Rakenne.El("mk-minipuluKortti__ylarivi", kortti, PickingMode.Ignore);
            // Webin polloNimilappu: "Kysy ~~viisaalta pöllöltä~~ pululta:".
            var otsikko = Rakenne.Teksti("Kysy <s>viisaalta pöllöltä</s> pululta:", "mk-minipuluKortti__otsikko", ylarivi);
            otsikko.enableRichText = true;
            Kirjasimet.Aseta(otsikko, Kirjasin.KoneLihava);
            var sulje = Rakenne.Nappi("×", "mk-minipuluKortti__sulje", Sulje, ylarivi);
            sulje.tooltip = "Sulje kysymykset";

            virta = new ScrollView(ScrollViewMode.Vertical);
            virta.AddToClassList("mk-minipuluKortti__virta");
            virta.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            virta.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Add(virta);
            ehdotukset = Rakenne.El("mk-minipuluKortti__ehdotukset", virta, PickingMode.Ignore);

            var syote = Rakenne.El("mk-minipuluKortti__syote", kortti, PickingMode.Ignore);
            kentta = new TextField { maxLength = KysymysKatto };
            kentta.AddToClassList("mk-minipuluKortti__kentta");
            kentta.textEdition.placeholder = "Kysy mitä tahansa…";
            kentta.RegisterCallback<KeyDownEvent>(e =>
            {
                if (e.keyCode != KeyCode.Return && e.keyCode != KeyCode.KeypadEnter) return;
                KysyVapaasti(kentta.value);
                e.StopPropagation();
            });
            syote.Add(kentta);
            // Löydös 96: näppäimistön sulkeuduttua kosketukset osuvat taas pilleriin, ↑:hen ja ✕:ään.
            Rakenne.VapautaNappaimistonSulkeutuessa(kentta);
            Kirjasimet.Aseta(kentta, Kirjasin.Luku);
            laheta = Rakenne.Nappi(null, "mk-minipuluKortti__laheta", () => KysyVapaasti(kentta.value), syote, Ikonit.NuoliYlos);
            laheta.tooltip = "Lähetä kysymys";
        }

        public void Vaihda(Havaintokohde k) { if (Auki) Sulje(); else Avaa(k); }

        /// <summary>Kortti auki kohteen kysymyksillä; kohteen vaihtuessa virta alkaa alusta.</summary>
        public void Avaa(Havaintokohde k)
        {
            if (k?.Tunnus != tunnus) Tyhjenna(k);
            if (Auki) return;
            Auki = true;
            kortti.style.display = DisplayStyle.Flex;
            AukiMuuttui?.Invoke(true);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            kentta.Blur();
            kortti.style.display = DisplayStyle.None;
            AukiMuuttui?.Invoke(false);
        }

        void Tyhjenna(Havaintokohde k)
        {
            tunnus = k?.Tunnus;
            foreach (var c in virta.contentContainer.Children().Where(c => c != ehdotukset).ToList()) c.RemoveFromHierarchy();
            ehdotukset.Clear();
            kentta.value = "";
            if (k == null) return;
            string oma = tunnus;
            foreach (var kysymys in k.Kysymykset)
            {
                Button pilleri = null;
                pilleri = Rakenne.Nappi(null, "mk-minipuluKortti__kysymys", () => KysyValmis(pilleri, oma, kysymys), ehdotukset);
                var t = Rakenne.Teksti(kysymys, "mk-minipuluKortti__kysymysteksti", pilleri);
                Kirjasimet.Aseta(t, Kirjasin.Luku);
            }
            ehdotukset.style.display = k.Kysymykset.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
        }

        // --- kysymykset ------------------------------------------------------------------

        /// <summary>Valmis kysymys: pilleri valituksi ja kysymys mallille kuten vapaa kysymys.</summary>
        void KysyValmis(Button pilleri, string kohde, string kysymys)
        {
            if (kohde != tunnus || Kesken) return;
            foreach (var b in ehdotukset.Children()) b.RemoveFromClassList("mk-valittu");
            pilleri.AddToClassList("mk-valittu");
            Kupla(false, kysymys);
            Laheta(kysymys);
        }

        void KysyVapaasti(string teksti)
        {
            teksti = (teksti ?? "").Trim();
            if (teksti.Length == 0 || Kesken) return;
            kentta.value = "";
            Kupla(false, teksti);
            Laheta(teksti);
        }

        void Laheta(string kysymys)
        {
            var odottaa = Kupla(true, "…", odottaa: true);
            var chat = UiNakymat.Hae()?.Chat;
            string oma = tunnus;
            AsetaKesken(true);
            bool lahti = chat != null && chat.KysyUlkoisesti(kysymys, vastaus =>
            {
                AsetaKesken(false);
                if (oma != tunnus || odottaa.parent == null) return;
                Valmis(odottaa, vastaus);
            });
            // Web lahetaKysymys: virheen tekstit sanatarkasti.
            if (!lahti)
            {
                AsetaKesken(false);
                Valmis(odottaa, chat == null ? "Pulu ei saanut kysymyksestä kiinni. Yritä hetken päästä uudelleen." : "Pulu vastaa vielä edelliseen. Hetki vain.");
            }
        }

        void AsetaKesken(bool k)
        {
            Kesken = k;
            laheta.SetEnabled(!k);
        }

        /// <summary>
        /// Web .satelliitti-pulukortti: leveys min(320, ruutu − 24), korkeus min(62vh, 500); pienellä ruudulla (≤ 620 × 500)
        /// leveys min(280, ruutu − 24) ja virta enintään min(38vh, 240).
        /// </summary>
        public void Mitoita(float leveys, float korkeus)
        {
            if (float.IsNaN(leveys) || float.IsNaN(korkeus) || leveys <= 0 || korkeus <= 0) return;
            bool pieni = leveys <= 620f || korkeus <= 500f;
            kortti.style.width = Mathf.Min(pieni ? 280f : 320f, leveys - 24f);
            kortti.style.maxHeight = Mathf.Min(korkeus * 0.62f, 500f);
            virta.style.maxHeight = pieni ? Mathf.Min(korkeus * 0.38f, 240f) : StyleKeyword.Null;
            kortti.EnableInClassList("mk-minipuluKortti--pieni", pieni);
        }

        Label Kupla(bool livia, string teksti, bool odottaa = false)
        {
            var k = Rakenne.Teksti(teksti ?? "", livia ? "mk-minipuluKortti__vastaus" : "mk-minipuluKortti__oma", virta);
            Kirjasimet.Aseta(k, livia ? Kirjasin.Luku : Kirjasin.Kone);
            k.EnableInClassList("mk-odottaa", odottaa);
            if (livia) Aanet.PulunTehoste("pulu.kujerrus");
            Rakenne.Vierita(virta, k);
            return k;
        }

        void Valmis(Label kupla, string vastaus)
        {
            kupla.RemoveFromClassList("mk-odottaa");
            kupla.text = vastaus ?? "";
            // Vastaus luetaan alusta: kuplan yläreuna näkyviin kerran (webin ankkurointi).
            virta.schedule.Execute(() => virta.scrollOffset = new Vector2(0, Mathf.Max(0, kupla.layout.y - 4)));
        }
    }
}
