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
using System.Linq;
using Matkakirja.Linssit.Museo;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class MuseoTaulu
    {
        const float KorttiOsuus = 0.42f;
        readonly VisualElement nakyma, otsikko, ryhma, korttiJuuri;
        readonly Label nimi, alarivi, kKapiteeli, kNimi, kAlkuperainen, kTekniikka, kKuvateksti, kLahde;
        readonly Button tauko, vapaa, esittele, edellinen, seuraava;
        readonly Kortti kortti;
        readonly KortinLukija lukija;
        bool auki, korttiNakyy, luennalla;
        string korttiTeos;
        EventCallback<PointerDownEvent> ohi;

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
            esittele = Ohjausnappi.Nappi(Ikonit.Viiva["kirja"], Kieli.T("ui.museo.esittele"), () =>
            {
                // Esittely kuuluu napista: avaus aloittaa luennan (kaiutin keskeyttää), toinen painallus sulkee.
                luennalla = !MuseoSovitin.EsittelyAuki;
                MuseoSovitin.Esittele();
            }, ryhma);

            korttiJuuri = Rakenne.El("mk-museo-kortti", turva, PickingMode.Ignore);
            korttiJuuri.style.position = Position.Absolute;
            korttiJuuri.style.justifyContent = Justify.FlexEnd;
            korttiJuuri.style.display = DisplayStyle.None;
            kortti = new Kortti(null, pohja: true);
            korttiJuuri.Add(kortti);
            kortti.Sisus.pickingMode = PickingMode.Position;
            var ylarivi = Rakenne.El(null, kortti.Sisus, PickingMode.Ignore);
            ylarivi.style.flexDirection = FlexDirection.Row;
            ylarivi.style.justifyContent = Justify.SpaceBetween;
            ylarivi.style.alignItems = Align.Center;
            kKapiteeli = Rakenne.Teksti("", "mk-kortti__kapiteeli", ylarivi);
            Kirjasimet.Aseta(kKapiteeli, Tyylikirja.Kirjain.Kapiteeli);
            kKapiteeli.style.flexShrink = 1; kKapiteeli.style.whiteSpace = WhiteSpace.Normal;
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
            float napit = ryhma.resolvedStyle.bottom + ryhma.layout.height + m;
            if (float.IsNaN(napit)) napit = m;
            if (Pohja.Leveys(W) == Pohja.Luokka.Kapea)
            {
                korttiJuuri.style.left = m; korttiJuuri.style.right = m; korttiJuuri.style.width = StyleKeyword.Auto;
                korttiJuuri.style.top = StyleKeyword.Auto; korttiJuuri.style.bottom = napit;
                korttiJuuri.style.maxHeight = Mathf.Round(Mathf.Min(H - napit - m, H * Tyylikirja.Peitto.Max / 100f));
                korttiJuuri.style.justifyContent = Justify.FlexEnd;
            }
            else
            {
                float yla = Ylapalkki.Varaus + m;
                korttiJuuri.style.left = StyleKeyword.Auto; korttiJuuri.style.right = m; korttiJuuri.style.width = Pohja.Sivukortti(W);
                korttiJuuri.style.top = yla; korttiJuuri.style.bottom = napit;
                korttiJuuri.style.maxHeight = StyleKeyword.None;
                korttiJuuri.style.justifyContent = Justify.Center;
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
                if (!MuseoSovitin.EsittelyAuki || ohi != null) return;
                ohi = e =>
                {
                    var t = e.target as VisualElement;
                    if (t != null && (korttiJuuri.Contains(t) || esittele.Contains(t) || lukija.Juuri.Contains(t))) return;
                    if (t != null && t.panel != korttiJuuri.panel) return;
                    // Lukijan valikko auki: ohinapautus sulkee vain valikon (KortinLukija), ei korttia.
                    if (puu.Q(className: "mk-lukija-valikko") != null) return;
                    UiKerros.OhiSulki();
                    MuseoSovitin.Esittele(false);
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
            if (!auki) { otsikko.style.display = DisplayStyle.None; NaytaKortti(false); return; }
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
                    kKapiteeli.text = $"{t.Taiteilija} · {t.Vuosi}".ToUpperInvariant();
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
        }

        void NaytaKortti(bool nakyy)
        {
            if (nakyy == korttiNakyy) { if (nakyy) AsetteleKortti(); return; }
            korttiNakyy = nakyy;
            korttiJuuri.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            Ohinapautus(nakyy);
            if (!nakyy) { lukija.Pysayta(); luennalla = false; return; }
            AsetteleKortti();
            Rakenne.Nayta(korttiJuuri, true, Tyylikirja.Kesto.Avaus);
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
