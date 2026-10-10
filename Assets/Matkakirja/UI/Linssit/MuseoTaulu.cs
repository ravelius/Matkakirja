// TAIDEMUSEON NÄKYMÄ (Linssiseppä 10.10.2026, PT 09.5x): vain olemassa olevia pohjia (UI-POHJAT-sääntö 1.10.), ei uusia tyylejä.
//  - Salin kuva koko ruudulle LinssiUi.MustaKerroksessa kuten dioraamassa (DioraamaTaulu): kartan UI jää alle. Kierroksella kuva
//    ottaa kosketukset; vapaassa kulussa ei (SeikkailuTapit lukee vedon katseeksi vain, kun UI ei peitä sormea).
//  - Teoksen nimi ja taiteilija vasemmassa yläkulmassa: Lontoon kierroksen otsikkopohja (mk-aikajana-havainne__otsikko +
//    __kuvateksti, KierrosTaulu), näkyy pysähdyksessä ja vapaassa kulussa katsotulle teokselle.
//  - Ohjausnapit (OHJAUSNAPPI-pohja, Ohjausnappi.Ryhma) alhaalla keskellä: edellinen, tauko/jatka, seuraava, vapaa kulku ↔
//    kierros, esittely. Kuvakkeet olemassa olevista (Ikonit.Takaisin, Tauko, Seuraava, saapas, kirja).
//  - Esittely: KORTTI-pohja (Kortti pohja: true) oikeassa reunassa, enintään 45 % ruudusta: nimi, alkuperäinen nimi, taiteilija
//    ja vuosi, tekniikka ja mitat, kokoelma ja lisenssi. Napautus kortin ulkopuolelle ei sulje (kierros on tauolla kortin ajan).
//  - Poistu (PT 10.10. museo2, EI TURHIA ✕-NAPPEJA): oikeassa yläkulmassa linssien ✕:n paikalla sama nappirivi ja nappi kuin
//    Myllyssä ja oppaan latausruudussa (mk-kortti__napit + mk-nappi--toiminto, ui.pelit.poistu); LinssiUi piilottaa ✕:n museon ajaksi.
using Matkakirja.Linssit.Museo;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class MuseoTaulu
    {
        const float KorttiOsuus = 0.42f;
        readonly VisualElement nakyma, otsikko, ryhma, korttiJuuri, poistuRivi;
        readonly Label nimi, alarivi, kNimi, kAlkuperainen, kTaiteilija, kTekniikka, kLahde;
        readonly Button tauko, vapaa, esittele, edellinen, seuraava;
        readonly Kortti kortti;
        bool auki;

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
            nimi.style.fontSize = 34; nimi.style.whiteSpace = WhiteSpace.Normal; nimi.style.unityTextAlign = TextAnchor.LowerLeft;
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
            ryhma.style.bottom = 24; ryhma.style.left = 0; ryhma.style.right = 0;
            ryhma.style.justifyContent = Justify.Center;
            ryhma.style.display = DisplayStyle.None;
            edellinen = Ohjausnappi.Nappi(Ikonit.Takaisin, Kieli.T("ui.museo.edellinen"), MuseoSovitin.Edellinen, ryhma);
            tauko = Ohjausnappi.Nappi(Ikonit.Tauko, Kieli.T("ui.museo.tauko"), MuseoSovitin.Tauko, ryhma);
            seuraava = Ohjausnappi.Nappi(Ikonit.Seuraava, Kieli.T("ui.museo.seuraava"), MuseoSovitin.Seuraava, ryhma);
            vapaa = Ohjausnappi.Nappi(Ikonit.Viiva["saapas"], Kieli.T("ui.museo.vapaa-kulku"), MuseoSovitin.VapaaTaiKierros, ryhma);
            esittele = Ohjausnappi.Nappi(Ikonit.Viiva["kirja"], Kieli.T("ui.museo.esittele"), () => MuseoSovitin.Esittele(), ryhma);

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
            korttiJuuri.style.right = 16; korttiJuuri.style.top = 76; korttiJuuri.style.bottom = 96;
            korttiJuuri.style.justifyContent = Justify.Center;
            korttiJuuri.style.display = DisplayStyle.None;
            kortti = new Kortti(null, pohja: true);
            korttiJuuri.Add(kortti);
            kortti.Sisus.pickingMode = PickingMode.Position;
            kortti.Sisus.RegisterCallback<PointerDownEvent>(_ => MuseoSovitin.Esittele(false));
            kNimi = Rakenne.Teksti("", "mk-kortti__otsikko", kortti.Sisus); kNimi.style.whiteSpace = WhiteSpace.Normal; kNimi.style.fontSize = 24;
            Kirjasimet.Aseta(kNimi, Kirjasin.Goottilainen);
            kAlkuperainen = Rakenne.Teksti("", "mk-kortti__teksti", kortti.Sisus); kAlkuperainen.style.whiteSpace = WhiteSpace.Normal; kAlkuperainen.style.unityFontStyleAndWeight = FontStyle.Italic;
            kTaiteilija = Rakenne.Teksti("", "mk-kortti__teksti", kortti.Sisus); kTaiteilija.style.whiteSpace = WhiteSpace.Normal; kTaiteilija.style.marginTop = 8;
            kTekniikka = Rakenne.Teksti("", "mk-kortti__teksti", kortti.Sisus); kTekniikka.style.whiteSpace = WhiteSpace.Normal;
            kLahde = Rakenne.Teksti("", "mk-kortti__teksti", kortti.Sisus); kLahde.style.whiteSpace = WhiteSpace.Normal; kLahde.style.marginTop = 8; kLahde.style.fontSize = 14;

            MuseoSovitin.Vaihtui += Paivita;
            kerros.JokaRuutu += () => { if (auki) AsetteleKortti(); };
        }

        void AsetaKuva(RenderTexture kuva) =>
            nakyma.style.backgroundImage = kuva != null ? new StyleBackground(Background.FromRenderTexture(kuva)) : new StyleBackground(StyleKeyword.None);

        void AsetteleKortti()
        {
            float w = korttiJuuri.parent != null ? korttiJuuri.parent.resolvedStyle.width : 0;
            if (w > 0) korttiJuuri.style.width = Mathf.Min(420f, w * KorttiOsuus);
        }

        void Paivita()
        {
            var s = MuseoSovitin.Aktiivinen;
            auki = s != null && s.Auki;
            nakyma.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            ryhma.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            poistuRivi.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            if (UiNakymat.Olemassa) UiNakymat.Hae().Linssit?.PaivitaSulku();
            if (!auki) { otsikko.style.display = DisplayStyle.None; korttiJuuri.style.display = DisplayStyle.None; return; }
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
                nimi.text = r.Teos.Otsikko;
                alarivi.text = $"{r.Teos.Taiteilija}, {r.Teos.Vuosi}";
                kNimi.text = r.Teos.Otsikko;
                kAlkuperainen.text = r.Teos.Alkuperainen;
                kTaiteilija.text = $"{r.Teos.Taiteilija}, {r.Teos.Vuosi}";
                kTekniikka.text = $"{Isolla(r.Teos.Tekniikka)}, {r.Teos.Mitat}";
                kLahde.text = $"{r.Teos.Lahde} · {r.Teos.Lisenssi}";
            }
            korttiJuuri.style.display = MuseoSovitin.EsittelyAuki && r != null ? DisplayStyle.Flex : DisplayStyle.None;
            if (MuseoSovitin.EsittelyAuki) AsetteleKortti();
        }

        static string Isolla(string s) => string.IsNullOrEmpty(s) ? s : char.ToUpperInvariant(s[0]) + s.Substring(1);
    }
}
