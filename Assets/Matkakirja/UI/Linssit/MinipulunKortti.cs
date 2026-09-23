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
// Valmiit kysymykset vastataan aineiston tekstillä ilman mallikutsua
// (astronaut-kysymykset.json vastaukset); vapaa kysymys menee samaa reittiä kuin
// kartan pulu (PuluChat.KysyUlkoisesti: sama konteksti, historia ja lukko).
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
        static Dictionary<string, List<(string Kysymys, string Vastaus)>> vastaukset;
        static bool vastauksetHaussa;

        readonly VisualElement kortti, ehdotukset;
        readonly ScrollView virta;
        readonly TextField kentta;
        string tunnus;
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
            Kirjasimet.Aseta(kentta, Kirjasin.Luku);
            var laheta = Rakenne.Nappi("↑", "mk-minipuluKortti__laheta", () => KysyVapaasti(kentta.value), syote);
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
            HaeVastaukset(null);
        }

        // --- kysymykset ------------------------------------------------------------------

        /// <summary>Valmis kysymys: aineiston vastaus ilman mallikutsua (webin sääntö).</summary>
        void KysyValmis(Button pilleri, string kohde, string kysymys)
        {
            foreach (var b in ehdotukset.Children()) b.RemoveFromClassList("mk-valittu");
            pilleri.AddToClassList("mk-valittu");
            Kupla(false, kysymys);
            var odottaa = Kupla(true, "…", odottaa: true);
            HaeVastaukset(() =>
            {
                if (kohde != tunnus) return;
                string vastaus = null;
                if (vastaukset != null && vastaukset.TryGetValue(kohde ?? "", out var l))
                    vastaus = l.FirstOrDefault(x => x.Kysymys == kysymys).Vastaus;
                if (vastaus == null)
                {
                    // Aineistossa ei vastausta: kysytään mallilta kuten vapaa kysymys.
                    odottaa.RemoveFromHierarchy();
                    Laheta(kysymys);
                    return;
                }
                Valmis(odottaa, vastaus);
            });
        }

        void KysyVapaasti(string teksti)
        {
            teksti = (teksti ?? "").Trim();
            if (teksti.Length == 0) return;
            kentta.value = "";
            Kupla(false, teksti);
            Laheta(teksti);
        }

        void Laheta(string kysymys)
        {
            var odottaa = Kupla(true, "…", odottaa: true);
            var chat = UiNakymat.Hae()?.Chat;
            string oma = tunnus;
            bool lahti = chat != null && chat.KysyUlkoisesti(kysymys, vastaus =>
            {
                if (oma != tunnus || odottaa.parent == null) return;
                Valmis(odottaa, vastaus);
            });
            if (!lahti) Valmis(odottaa, chat == null ? "Livia ei ole nyt tavoitettavissa." : "Hetkinen, mietin vielä edellistä kysymystä.");
        }

        Label Kupla(bool livia, string teksti, bool odottaa = false)
        {
            var k = Rakenne.Teksti(teksti ?? "", livia ? "mk-minipuluKortti__vastaus" : "mk-minipuluKortti__oma", virta);
            Kirjasimet.Aseta(k, livia ? Kirjasin.Luku : Kirjasin.Kone);
            k.EnableInClassList("mk-odottaa", odottaa);
            if (livia) Aanet.PulunTehoste("pulu.kujerrus");
            virta.schedule.Execute(() => virta.ScrollTo(k));
            return k;
        }

        void Valmis(Label kupla, string vastaus)
        {
            kupla.RemoveFromClassList("mk-odottaa");
            kupla.text = vastaus ?? "";
            // Vastaus luetaan alusta: kuplan yläreuna näkyviin kerran (webin ankkurointi).
            virta.schedule.Execute(() => virta.scrollOffset = new Vector2(0, Mathf.Max(0, kupla.layout.y - 4)));
        }

        // --- aineisto --------------------------------------------------------------------

        static readonly List<Action> odottajat = new List<Action>();

        static void HaeVastaukset(Action valmis)
        {
            if (vastaukset != null) { valmis?.Invoke(); return; }
            if (valmis != null) odottajat.Add(valmis);
            if (vastauksetHaussa) return;
            vastauksetHaussa = true;
            UiKerros.Hae().StartCoroutine(LinssiSisalto.Hae("moduulit/js/linssit/astronaut-kysymykset.json", teksti =>
            {
                vastauksetHaussa = false;
                vastaukset = new Dictionary<string, List<(string, string)>>();
                try { if (teksti != null) Lue(teksti); }
                catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui minipulu: " + e.Message); }
                var o = odottajat.ToList();
                odottajat.Clear();
                foreach (var a in o) a();
            }));
        }

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;

        static void Lue(string json)
        {
            var v = Ob(MiniJson.Kentta(Ob(MiniJson.Jasenna(json)), "exportit"));
            var kaikki = Ob(MiniJson.Kentta(v, "ASTRONAUTIN_KYSYMYKSET"));
            if (kaikki == null) return;
            foreach (var pari in kaikki)
            {
                var l = new List<(string, string)>();
                if (MiniJson.Kentta(Ob(pari.Value), "vastaukset") is List<object> vv)
                    foreach (var x in vv.Select(Ob).Where(x => x != null))
                        l.Add((MiniJson.Teksti(x, "kysymys"), MiniJson.Teksti(x, "vastaus")));
                vastaukset[pari.Key] = l;
            }
        }
    }
}
