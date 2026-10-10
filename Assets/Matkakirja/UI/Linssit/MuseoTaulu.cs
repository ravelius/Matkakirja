// TAIDEMUSEON NÄKYMÄ (Linssiseppä 10.10.2026, PT 09.5x): vain olemassa olevia pohjia (UI-POHJAT-sääntö 1.10.), ei uusia tyylejä.
//  - Salin kuva koko ruudulle LinssiUi.MustaKerroksessa kuten dioraamassa (DioraamaTaulu): kartan UI jää alle. Kierroksella kuva
//    ottaa kosketukset; vapaassa kulussa ei (SeikkailuTapit lukee vedon katseeksi vain, kun UI ei peitä sormea).
//  - Teoksen nimi ja taiteilija vasemmassa yläkulmassa: Lontoon kierroksen otsikkopohja (mk-aikajana-havainne__otsikko +
//    __kuvateksti, KierrosTaulu), näkyy pysähdyksessä ja vapaassa kulussa katsotulle teokselle.
//  - Ohjausnapit (OHJAUSNAPPI-pohja, Ohjausnappi.Ryhma) alhaalla keskellä: edellinen, tauko/jatka, seuraava, vapaa kulku ↔
//    kierros, esittely. Kuvakkeet olemassa olevista (Ikonit.Takaisin, Tauko, Seuraava, saapas, kirja).
//  - Esittely (Natiivi-UI 10.10., PT 09.5x): KORTTI-pohja (Kortti pohja: true). Kapiteeli "taiteilija · vuosi", otsikko teos,
//    alkuperäinen nimi, tekniikka ja mitat, lyhyt kuvateksti ja lähderivi "kokoelma · lisenssi" (havainnekuva merkitään kuten
//    nostoissa). Kaiutin (KortinLukija) lukee esittelyn kertojan äänellä, ja Esittele-nappi aloittaa luennan heti: esittely
//    kuuluu napista. Paikka kuten NOSTOKORTTI: KAPEA alareunaan ohjausnappien yläpuolelle (enintään Peitto.Max %), muuten
//    sivukortti oikealle (Pohja.Sivukortti). Sulku KORTTI-pohjan mukaan: ohinapautus ja Esc (kierros on tauolla kortin ajan).
//  - Huone (PT 10.10. 10.5x, Raamattu NIMIKYLTIT HETKEN, INFO NAPAUTUKSESTA; kuten linnan huonekortti DioraamaTaulussa): huoneeseen
//    tultaessa huonekortti näkyy tiiviinä (vain nimi) Nimikyltti.NakyyMs ja häivytetään. Teksti (2–3 virkettä) vain napautuksesta:
//    kyltin napautus tai Esittele-nappi, kun teosta ei ole (MuseoSovitin.HuoneKortti). Sama paikka, sulku ja kierroksen tauko
//    kuin esittelyssä; kortit sulkevat toisensa (MuseoSovitin).
//  - Poistu (PT 10.10. museo2, EI TURHIA ✕-NAPPEJA): oikeassa yläkulmassa linssien ✕:n paikalla sama nappirivi ja nappi kuin
//    Myllyssä ja oppaan latausruudussa (mk-kortti__napit + mk-nappi--toiminto, ui.pelit.poistu); LinssiUi piilottaa ✕:n museon ajaksi.
using System.Linq;
using Matkakirja.Linssit.Museo;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class MuseoTaulu
    {
        const float KorttiOsuus = 0.42f;
        readonly VisualElement nakyma, otsikko, ryhma, korttiJuuri, poistuRivi;
        readonly Label nimi, alarivi, kKapiteeli, kNimi, kAlkuperainen, kTekniikka, kKuvateksti, kLahde;
        readonly Button tauko, vapaa, esittele, edellinen, seuraava;
        readonly Kortti kortti, huoneKortti;
        readonly Label hNimi, hTeksti;
        readonly Nimikyltti huoneKyltti;
        readonly KortinLukija lukija, hLukija;
        bool auki, korttiNakyy, luennalla, huoneAuki;
        string korttiTeos;
        EventCallback<PointerDownEvent> ohi;

        /// <summary>Museo auki (LinssiUi.PaivitaSulku: ✕ pois, Poistu-nappi tilalle).</summary>
        public bool Auki => auki;

        public MuseoTaulu(UiKerros kerros)
        {
            nakyma = Rakenne.El("mk-museo-nakyma", kerros.Juuri(LinssiUi.MustaKerros), PickingMode.Position);
            nakyma.style.position = Position.Absolute;
            nakyma.style.left = 0; nakyma.style.right = 0; nakyma.style.top = 0; nakyma.style.bottom = 0;
            nakyma.style.backgroundColor = MuseoNayttamo.Tausta;
            nakyma.style.display = DisplayStyle.None;
            MuseoNayttamo.KuvaVaihtui += AsetaKuva;

            var yla = kerros.Juuri(LinssiUi.Ylakerros);
            otsikko = Rakenne.El("mk-museo-otsikko", yla, PickingMode.Ignore);
            otsikko.style.position = Position.Absolute;
            otsikko.style.left = 28; otsikko.style.top = 76; otsikko.style.right = 110;
            otsikko.style.alignItems = Align.FlexStart;
            otsikko.style.display = DisplayStyle.None;
            nimi = Rakenne.Teksti("", "mk-aikajana-havainne__otsikko", otsikko);
            Kirjasimet.Aseta(nimi, Kirjasin.Goottilainen);
            nimi.style.fontSize = Tyylikirja.Koko.Nimio; nimi.style.whiteSpace = WhiteSpace.Normal; nimi.style.unityTextAlign = TextAnchor.LowerLeft;
            alarivi = Rakenne.Teksti("", "mk-aikajana-havainne__kuvateksti", otsikko);
            Kirjasimet.Aseta(alarivi, Kirjasin.Antiikva);
            alarivi.style.fontSize = 19; alarivi.style.whiteSpace = WhiteSpace.Normal;
            foreach (var t in new[] { nimi, alarivi })
            {
                t.style.textShadow = new TextShadow { offset = new Vector2(0, 2), blurRadius = 14, color = Tyylikirja.Himmennys.Kuva };
                t.style.unityTextOutlineWidth = 0.8f;
                t.style.unityTextOutlineColor = (Color)Tyylikirja.Himmennys.Tumma;
            }

            var turva = kerros.Turva(LinssiUi.Ylakerros);
            ryhma = Ohjausnappi.Ryhma(turva);
            ryhma.style.position = Position.Absolute;
            // OHJAUSNAPPI-ryhmän pohjatyyli on oikea yläkulma (top/right): top pois, muuten ryhmä venyy koko korkeudelle ja napit
            // keskittyvät ruudun keskelle (LS1:n kuva-arkki 10.10. 11.4x, iPad vaaka).
            ryhma.style.top = StyleKeyword.Auto;
            ryhma.style.bottom = 24; ryhma.style.left = 0; ryhma.style.right = 0;
            ryhma.style.justifyContent = Justify.Center;
            ryhma.style.display = DisplayStyle.None;
            edellinen = Ohjausnappi.Nappi(Ikonit.Takaisin, Kieli.T("ui.museo.edellinen"), MuseoSovitin.Edellinen, ryhma);
            tauko = Ohjausnappi.Nappi(Ikonit.Tauko, Kieli.T("ui.museo.tauko"), MuseoSovitin.Tauko, ryhma);
            seuraava = Ohjausnappi.Nappi(Ikonit.Seuraava, Kieli.T("ui.museo.seuraava"), MuseoSovitin.Seuraava, ryhma);
            vapaa = Ohjausnappi.Nappi(Ikonit.Viiva["saapas"], Kieli.T("ui.museo.vapaa-kulku"), MuseoSovitin.VapaaTaiKierros, ryhma);
            esittele = Ohjausnappi.Nappi(Ikonit.Viiva["kirja"], Kieli.T("ui.museo.esittele"), () =>
            {
                // Esittely kuuluu napista: avaus aloittaa luennan (kaiutin keskeyttää), toinen painallus sulkee.
                // Ei teosta (vapaa kulku käytävällä): sama nappi avaa huoneen kortin.
                if (MuseoSovitin.Aktiivinen?.Teos == null && MuseoSovitin.Aktiivinen?.NykyinenHuone != null) { MuseoSovitin.HuoneKortti(); return; }
                luennalla = !MuseoSovitin.EsittelyAuki;
                MuseoSovitin.Esittele();
            }, ryhma);

            poistuRivi = Rakenne.El("mk-kortti__napit", turva, PickingMode.Ignore);
            poistuRivi.style.position = Position.Absolute;
            poistuRivi.style.top = 16; poistuRivi.style.right = 16;
            poistuRivi.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(Rakenne.Nappi(Kieli.T("ui.pelit.poistu"), "mk-nappi--toiminto", () =>
            {
                Debug.Log("MATKAKIRJA museo: Poistu");
                UiNakymat.Hae()?.Linssit?.SuljeLinssi();
            }, poistuRivi), Kirjasin.Kone);

            korttiJuuri = Rakenne.El("mk-museo-kortti", turva, PickingMode.Ignore);
            korttiJuuri.style.position = Position.Absolute;
            korttiJuuri.style.justifyContent = Justify.FlexEnd;
            korttiJuuri.style.display = DisplayStyle.None;
            kortti = new Kortti(null, pohja: true);
            korttiJuuri.Add(kortti);
            kortti.style.display = DisplayStyle.None;
            kortti.Sisus.pickingMode = PickingMode.Position;
            var ylarivi = Rakenne.El(null, kortti.Sisus, PickingMode.Ignore);
            ylarivi.style.flexDirection = FlexDirection.Row;
            ylarivi.style.justifyContent = Justify.SpaceBetween;
            ylarivi.style.alignItems = Align.Center;
            kKapiteeli = Rakenne.Teksti("", "mk-kortti__kapiteeli", ylarivi);
            Kirjasimet.Aseta(kKapiteeli, Tyylikirja.Kirjain.Kapiteeli);
            kKapiteeli.style.flexGrow = 1; kKapiteeli.style.flexShrink = 1; kKapiteeli.style.flexBasis = 0; kKapiteeli.style.whiteSpace = WhiteSpace.Normal;
            lukija = new KortinLukija(ylarivi, Kieli.T("ui.nosto.kuuntele-kortti"), saatimet: true, rajaus: () => kortti.worldBound);
            kNimi = Rakenne.Teksti("", "mk-kortti__otsikko", kortti.Sisus); kNimi.style.whiteSpace = WhiteSpace.Normal;
            Kirjasimet.Aseta(kNimi, Tyylikirja.Kirjain.Otsikko);
            kAlkuperainen = Rakenne.Teksti("", "mk-kortti__teksti", kortti.Sisus); kAlkuperainen.style.whiteSpace = WhiteSpace.Normal;
            Kirjasimet.Aseta(kAlkuperainen, Tyylikirja.Kirjain.Apuri);
            kTekniikka = Rakenne.Teksti("", "mk-kortti__teksti", kortti.Sisus); kTekniikka.style.whiteSpace = WhiteSpace.Normal;
            Kirjasimet.Aseta(kTekniikka, Tyylikirja.Kirjain.Leipa);
            kKuvateksti = Rakenne.Teksti("", "mk-kortti__teksti", kortti.Sisus); kKuvateksti.style.whiteSpace = WhiteSpace.Normal;
            Kirjasimet.Aseta(kKuvateksti, Tyylikirja.Kirjain.Leipa);
            // Lähderivi konekirjoituksella kuten kysymyskortin kuvalähde (Kirjasin.Kone), ei omaa kokoa.
            kLahde = Rakenne.Teksti("", "mk-kortti__teksti", kortti.Sisus); kLahde.style.whiteSpace = WhiteSpace.Normal;
            Kirjasimet.Aseta(kLahde, Kirjasin.Kone);
            Nappaimisto.Rekisteroi("museo-esittely", 60, () => MuseoSovitin.EsittelyAuki, null, null, () => MuseoSovitin.Esittele(false));

            huoneKortti = new Kortti(null, pohja: true);
            korttiJuuri.Add(huoneKortti);
            huoneKortti.Sisus.pickingMode = PickingMode.Position;
            // Otsikkorivi: nimi ja kaiutin (KortinLukija; omistaja 6.9.2026 "Kaikissa missä on tekstiä" luenta), kaiutin vain avatussa kortissa.
            var hRivi = Rakenne.El(null, huoneKortti.Sisus, PickingMode.Ignore);
            hRivi.style.flexDirection = FlexDirection.Row;
            hRivi.style.justifyContent = Justify.SpaceBetween;
            hRivi.style.alignItems = Align.Center;
            hNimi = Rakenne.Teksti("", "mk-kortti__otsikko", hRivi); hNimi.style.whiteSpace = WhiteSpace.Normal; hNimi.style.flexGrow = 1; hNimi.style.flexShrink = 1; hNimi.style.flexBasis = 0;
            Kirjasimet.Aseta(hNimi, Tyylikirja.Kirjain.Otsikko);
            hLukija = new KortinLukija(hRivi, Kieli.T("ui.nosto.kuuntele-kortti"), saatimet: true, rajaus: () => huoneKortti.worldBound);
            hTeksti = Rakenne.Teksti("", "mk-kortti__teksti", huoneKortti.Sisus); hTeksti.style.whiteSpace = WhiteSpace.Normal;
            Kirjasimet.Aseta(hTeksti, Tyylikirja.Kirjain.Leipa);
            huoneKortti.style.display = DisplayStyle.None;
            huoneKortti.Sisus.RegisterCallback<ClickEvent>(_ => { if (!MuseoSovitin.HuoneKorttiAuki) MuseoSovitin.HuoneKortti(true); });
            huoneKyltti = new Nimikyltti(huoneKortti);
            MuseoSovitin.HuoneVaihtui += HuoneVaihtui;
            Nappaimisto.Rekisteroi("museo-huone", 60, () => MuseoSovitin.HuoneKorttiAuki, null, null, () => MuseoSovitin.HuoneKortti(false));

            MuseoSovitin.Vaihtui += Paivita;
            kerros.JokaRuutu += () => { if (auki) AsetteleKortti(); };
        }

        void AsetaKuva(RenderTexture kuva) =>
            nakyma.style.backgroundImage = kuva != null ? new StyleBackground(Background.FromRenderTexture(kuva)) : new StyleBackground(StyleKeyword.None);

        void AsetteleKortti()
        {
            var isa = korttiJuuri.parent;
            if (isa == null) return;
            float W = isa.layout.width, H = isa.layout.height, m = Tyylikirja.Vali.M;
            if (float.IsNaN(W) || W <= 0 || H <= 0) return;
            // Nappirivin yläreuna (ei bottom + korkeus: venynyt ryhmä antoi negatiivisen tilan ja ~50 pt:n kortin).
            float napit = H - ryhma.layout.yMin + m;
            if (float.IsNaN(napit) || napit < m || napit > H * 0.5f) napit = 24f + Tyylikirja.Nappi.Ohjaus + m;
            if (Pohja.Leveys(W) == Pohja.Luokka.Kapea)
            {
                korttiJuuri.style.left = m; korttiJuuri.style.right = m; korttiJuuri.style.width = StyleKeyword.Auto;
                korttiJuuri.style.top = StyleKeyword.Auto; korttiJuuri.style.bottom = napit;
                korttiJuuri.style.maxHeight = Mathf.Round(Mathf.Min(H - napit - m, H * Tyylikirja.Peitto.Max / 100f));
                korttiJuuri.style.justifyContent = Justify.FlexEnd;
            }
            else
            {
                // Yläpalkin tai linssin ✕-ryhmän (OHJAUSNAPPI oikeassa yläkulmassa) alta.
                float yla = Mathf.Max(Ylapalkki.Varaus, Tyylikirja.Vali.S + Tyylikirja.Nappi.Ohjaus) + m;
                korttiJuuri.style.left = StyleKeyword.Auto; korttiJuuri.style.right = m; korttiJuuri.style.width = Pohja.Sivukortti(W);
                korttiJuuri.style.top = yla; korttiJuuri.style.bottom = napit;
                korttiJuuri.style.maxHeight = StyleKeyword.None;
                korttiJuuri.style.justifyContent = Justify.FlexStart;   // sivukortti yläpalkin alta (NOSTOKORTTI)
            }
        }

        /// <summary>KORTTI-sulku: napautus kortin ja Esittele-napin ohi sulkee (seuraavasta kosketuksesta, ei avaavasta).</summary>
        void Ohinapautus(bool paalle)
        {
            var puu = korttiJuuri.panel?.visualTree;
            if (ohi != null) { puu?.UnregisterCallback(ohi, TrickleDown.TrickleDown); ohi = null; }
            if (!paalle || puu == null) return;
            korttiJuuri.schedule.Execute(() =>
            {
                if (!(MuseoSovitin.EsittelyAuki || MuseoSovitin.HuoneKorttiAuki) || ohi != null) return;
                ohi = e =>
                {
                    var t = e.target as VisualElement;
                    if (t != null && ((korttiNakyy && kortti.Contains(t)) || (huoneAuki && huoneKortti.Contains(t)) || esittele.Contains(t) || lukija.Juuri.Contains(t) || hLukija.Juuri.Contains(t))) return;
                    if (t != null && t.panel != korttiJuuri.panel) return;
                    // Lukijan valikko auki: ohinapautus sulkee vain valikon (KortinLukija), ei korttia.
                    if (puu.Q(className: "mk-lukija-valikko") != null) return;
                    UiKerros.OhiSulki();
                    if (MuseoSovitin.HuoneKorttiAuki) MuseoSovitin.HuoneKortti(false); else MuseoSovitin.Esittele(false);
                };
                puu.RegisterCallback(ohi, TrickleDown.TrickleDown);
            });
        }

        void Paivita()
        {
            var s = MuseoSovitin.Aktiivinen;
            auki = s != null && s.Auki;
            nakyma.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            ryhma.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            poistuRivi.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            if (UiNakymat.Olemassa) UiNakymat.Hae().Linssit?.PaivitaSulku();
            if (!auki) { otsikko.style.display = DisplayStyle.None; NaytaKortti(false); NaytaHuone(false); return; }
            var k = s.Kierros;
            bool vapaana = k != null && k.Vaihe == MuseoVaihe.Vapaa;
            nakyma.pickingMode = vapaana ? PickingMode.Ignore : PickingMode.Position;
            tauko.tooltip = vapaana ? Kieli.T("ui.museo.takaisin-kierrokselle") : k != null && k.Tauolla ? Kieli.T("ui.museo.jatka") : Kieli.T("ui.museo.tauko");
            vapaa.tooltip = vapaana ? Kieli.T("ui.museo.kierros") : Kieli.T("ui.museo.vapaa-kulku");
            edellinen.SetEnabled(!vapaana); seuraava.SetEnabled(!vapaana);
            vapaa.EnableInClassList("mk-valittu", vapaana);
            var r = s.Teos;
            bool naytaTeos = r != null && k != null && (k.Vaihe == MuseoVaihe.Pysahtyy || vapaana);
            otsikko.style.display = naytaTeos && !MuseoSovitin.EsittelyAuki ? DisplayStyle.Flex : DisplayStyle.None;
            esittele.SetEnabled(r != null);
            if (r != null)
            {
                var t = r.Teos;
                nimi.text = t.Otsikko;
                alarivi.text = $"{t.Taiteilija}, {t.Vuosi}";
                if (korttiTeos != t.Id)
                {
                    korttiTeos = t.Id;
                    kKapiteeli.text = $"{t.Taiteilija} · {t.Vuosi}";
                    kNimi.text = t.Otsikko;
                    Rivi(kAlkuperainen, t.Alkuperainen);
                    Rivi(kTekniikka, string.IsNullOrEmpty(t.Tekniikka) ? t.Mitat : $"{Isolla(t.Tekniikka)}, {t.Mitat}");
                    Rivi(kKuvateksti, t.Kuvateksti);
                    // Havainnekuva kuten nostoissa (ui.nosto.havainnekuva) lähderivin perään.
                    string lahde = string.Join(" · ", new[] { t.Lahde, t.Lisenssi }.Where(x => !string.IsNullOrWhiteSpace(x)));
                    if (t.Havainnekuva) lahde = (lahde.Length > 0 ? lahde + " · " : "") + Kieli.T("ui.nosto.havainnekuva");
                    Rivi(kLahde, lahde);
                    lukija.Aseta(new[] { t.Otsikko, $"{t.Taiteilija}, {t.Vuosi}.", t.Kuvateksti }, omistaja: "museo:" + t.Id);
                }
            }
            NaytaKortti(MuseoSovitin.EsittelyAuki && r != null);
            NaytaHuone(MuseoSovitin.HuoneKorttiAuki && s.NykyinenHuone != null);
        }

        void HuoneVaihtui(Huone h)
        {
            if (h == null) { huoneKortti.style.display = DisplayStyle.None; PaivitaJuuri(); return; }
            hNimi.text = h.Nimi;
            hTeksti.text = h.Teksti ?? "";
            hTeksti.style.display = DisplayStyle.None;
            hLukija.Pysayta(); hLukija.Juuri.style.display = DisplayStyle.None;
            huoneKortti.style.display = korttiNakyy ? DisplayStyle.None : DisplayStyle.Flex;
            huoneKyltti.Nayta(h.Id);   // tiivis kyltti ~3 s ja häivytys (Nimikyltti)
            PaivitaJuuri();
        }

        void NaytaHuone(bool nakyy)
        {
            if (nakyy == huoneAuki) { if (nakyy) AsetteleKortti(); return; }
            huoneAuki = nakyy;
            hTeksti.style.display = nakyy && hTeksti.text.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            if (nakyy) { huoneKortti.style.display = DisplayStyle.Flex; huoneKyltti.Nayta(); }
            // Kaiutin vain avatussa kortissa (tiivis kyltti on pelkkä nimi); Aseta näyttää sen, kun tekstiä on ≥ KortinLukija.Vahimmais.
            if (nakyy) hLukija.Aseta(new[] { hNimi.text, hTeksti.text }, omistaja: "museo-huone:" + hNimi.text);
            else { hLukija.Pysayta(); hLukija.Juuri.style.display = DisplayStyle.None; }
            huoneKyltti.Pida(nakyy);
            Ohinapautus(nakyy || korttiNakyy);
            PaivitaJuuri();
            if (nakyy) Rakenne.Nayta(huoneKortti, true, Tyylikirja.Kesto.Avaus);
        }

        /// <summary>Juuri näkyy, kun esittely, huonekortti tai huoneen kyltti on esillä (kyltti häivyttää itsensä).</summary>
        void PaivitaJuuri()
        {
            bool jokin = auki && (korttiNakyy || huoneKortti.style.display == DisplayStyle.Flex);
            korttiJuuri.style.display = jokin ? DisplayStyle.Flex : DisplayStyle.None;
            if (jokin) AsetteleKortti();
        }

        void NaytaKortti(bool nakyy)
        {
            if (nakyy == korttiNakyy) { if (nakyy) AsetteleKortti(); return; }
            korttiNakyy = nakyy;
            kortti.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (nakyy) huoneKortti.style.display = DisplayStyle.None;   // kortit sulkevat toisensa
            Ohinapautus(nakyy || huoneAuki);
            PaivitaJuuri();
            if (!nakyy) { lukija.Pysayta(); luennalla = false; return; }
            Rakenne.Nayta(kortti, true, Tyylikirja.Kesto.Avaus);
            if (luennalla) { luennalla = false; if (lukija.Juuri.style.display == DisplayStyle.Flex && !lukija.Lukee) lukija.Paina(); }
        }

        static void Rivi(Label l, string teksti)
        {
            l.text = teksti ?? "";
            l.style.display = string.IsNullOrWhiteSpace(teksti) ? DisplayStyle.None : DisplayStyle.Flex;
        }

        static string Isolla(string s) => string.IsNullOrEmpty(s) ? s : char.ToUpperInvariant(s[0]) + s.Substring(1);
    }
}
