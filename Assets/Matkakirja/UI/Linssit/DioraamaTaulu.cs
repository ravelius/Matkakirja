// POIKKILEIKKAUS-LINSSIN OPETUSTAULU (Natiivi-UI, Linnanrakentaja erä 1, 29.9.2026): MaapallonVuosiNakyma-mallilla
// (DioraamaSovitin.Vaihtui/ViimeisinNakyma/ViimeisinT, ei ILinssiYmparisto:a tässä kerroksessa). Pulu (LiviaKuva)
// seuraa dioraaman 3D-laskeutumispistettä ruudulla, ja sen vieressä (Tila.Taulupuoli) on pergamenttitaulu:
// otsikko, aktiivinen kohta lainauksena ja "n/N". Napautus taulua = seuraava (PoikkileikkausLinssi.Napauta).
//
// Kytkentä: LinssiUi-konstruktori luo tämän ("Dioraama = new DioraamaTaulu(kerros);", Vuosi-paneelin malli).
// Taulu: kohdan teksti sellaisenaan; hahmon repliikki ja Pulun reaktio (Nakyma.Puhuja/Repliikki) lainauksena sen alla.
// Yleisnäkymässä kohdistettavien tilojen nimet ovat pieninä lappuina tilan keskellä (napautettavat tilat näkyviin).
using Matkakirja.Linssit.Dioraama;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaTaulu
    {
        const float PeittoOsuusPros = 45f;
        // Minipulu (lintu rajattuna, 58 × 70): kokopulun kuvassa lintu jäi 64 pt:n laatikossa liian pieneksi (savuke 29.9.).
        const float PuluMinPt = 56f, PuluMaxPt = 96f, PuluEtaisyysvertailuM = 14f;
        const int AnimaatioMs = 220;
        static readonly Color Pergamentti = new Color(0.9373f, 0.9020f, 0.8235f, 0.94f);
        static readonly Color Teksti = new Color(0.2039f, 0.1569f, 0.1137f);

        readonly VisualElement juuri, lauta, nakyma, lappuKerros;
        readonly Label otsikko, teksti, lainaus, lahde, laskuri, seuraava;
        readonly LiviaKuva pulu;
        readonly List<Label> laput = new List<Label>();
        readonly List<(Label Lappu, Rect Rect)> sijoitukset = new List<(Label, Rect)>();

        bool puluPiilotettu;
        readonly Button kuoriNappi, paluuNappi;
        readonly VisualElement etsintaKortti;
        readonly Label etsintaOtsikko, etsintaTeksti;
        float etsintaLoppuu;
        // UUSI LINNA (omistaja 30.9.2026): kertojan tekstilaatikko (ihmisen matkan / aikajanojen tyyli), ↻-uusinta ja
        // Pulun napautusalue (huoneen infotaulun kulmassa; napautus näyttää pulu.teksti-kuplan etsintäkortin paikalla).
        readonly VisualElement kertojaKehys, kertojaLaatikko, puluAlue;
        readonly Label kertojaTeksti;
        readonly Button uusintaNappi;
        /// <summary>OHJAUSNAPPI-koe (OhjausryhmaKoe): linnan ‹ ja ↻ ryhmään.</summary>
        internal Button Paluu => paluuNappi;
        internal Button Uusinta => uusintaNappi;
        internal static void PyydaPaluu() => DioraamaSovitin.PyydaPaluu();
        internal static void KertojaUudelleen() => DioraamaSovitin.Linssi?.KertojaUudelleen(DioraamaSovitin.ViimeisinT);
        string puluKupla, puluAani;
        // KUUNNELMA (Päätoimittaja 30.9.2026): tekstityskaistale infotaulun yläpuolella Pulun oikealla puolella ja
        // infotaulun "Kuuntele"-nappi (alusta uudelleen).
        readonly KuunnelmaKaistale kuunnelma;
        readonly Button kuunteleNappi;
        Tila kuunnelmaTila;

        public DioraamaTaulu(UiKerros kerros)
        {
            // Näyttämön kuva koko ruudulle kerrokseen MustaKerros (24): peittää kartan UI:n (nimet, tilarivi, Liiku)
            // ja ottaa kosketukset, jotteivät ne valu alla oleviin nappeihin (DioraamaSyote lukee sormet itse).
            nakyma = Rakenne.El("mk-dioraama-nakyma", kerros.Juuri(LinssiUi.MustaKerros), PickingMode.Position);
            nakyma.style.position = Position.Absolute;
            nakyma.style.left = 0; nakyma.style.right = 0; nakyma.style.top = 0; nakyma.style.bottom = 0;
            nakyma.style.backgroundColor = DioraamaNayttamo.TaustaVari;
            nakyma.style.display = DisplayStyle.None;
            DioraamaNayttamo.KuvaVaihtui += AsetaKuva;
            AsetaKuva(DioraamaNayttamo.NykyinenKuva);

            // Sama kerros kuin MaapallonVuosiNakyma (Pulun 35 päällä); ei uutta LinssiUi-vakiota tässä erässä.
            juuri = Rakenne.El("mk-dioraama", kerros.Juuri(LinssiUi.RadioKerros), PickingMode.Ignore);
            juuri.style.position = Position.Absolute;
            juuri.style.left = 0; juuri.style.right = 0; juuri.style.top = 0; juuri.style.bottom = 0;
            juuri.style.display = DisplayStyle.None;

            pulu = new LiviaKuva(mini: true);
            lappuKerros = Rakenne.El("mk-dioraama__laput", juuri, PickingMode.Ignore);
            lappuKerros.style.position = Position.Absolute;
            lappuKerros.style.left = 0; lappuKerros.style.right = 0; lappuKerros.style.top = 0; lappuKerros.style.bottom = 0;
            pulu.style.position = Position.Absolute;
            juuri.Add(pulu);

            lauta = Rakenne.El("mk-dioraama__lauta", juuri);
            lauta.style.position = Position.Absolute;
            lauta.style.minWidth = 220;
            lauta.style.maxHeight = Length.Percent(PeittoOsuusPros);
            lauta.style.backgroundColor = Pergamentti;
            lauta.style.borderTopLeftRadius = 10; lauta.style.borderTopRightRadius = 10;
            lauta.style.borderBottomLeftRadius = 10; lauta.style.borderBottomRightRadius = 10;
            lauta.style.paddingTop = 12; lauta.style.paddingBottom = 12; lauta.style.paddingLeft = 14; lauta.style.paddingRight = 14;
            lauta.style.borderTopWidth = 8; lauta.style.borderBottomWidth = 8; lauta.style.borderLeftWidth = 8; lauta.style.borderRightWidth = 8;
            var reunaVari = new Color(Pergamentti.r, Pergamentti.g, Pergamentti.b, 0.55f);
            lauta.style.borderTopColor = reunaVari; lauta.style.borderBottomColor = reunaVari;
            lauta.style.borderLeftColor = reunaVari; lauta.style.borderRightColor = reunaVari;
            // Läpinäkyvyys + 8 pt liuku, alle 250 ms (speksin animaatiovaatimus).
            lauta.style.transitionProperty = new List<StylePropertyName> { new StylePropertyName("opacity"), new StylePropertyName("translate") };
            lauta.style.transitionDuration = new List<TimeValue> { new TimeValue(AnimaatioMs, TimeUnit.Millisecond) };
            lauta.RegisterCallback<PointerDownEvent>(_ => DioraamaSovitin.Linssi?.Napauta(DioraamaSovitin.ViimeisinT));

            // Laskuri omalle rivilleen otsikon yläpuolelle: rivissä rinnakkain rivittyvä otsikko mitattiin yhden rivin
            // korkuiseksi ja sen toinen rivi peitti tekstin (savuke 29.9.).
            laskuri = Rakenne.Teksti("", "mk-dioraama__laskuri", lauta);
            Kirjasimet.Aseta(laskuri, Kirjasin.Kone);
            laskuri.style.color = new Color(Teksti.r, Teksti.g, Teksti.b, 0.65f);
            laskuri.style.fontSize = 11;

            otsikko = Rakenne.Teksti("", "mk-dioraama__otsikko", lauta);
            Kirjasimet.Aseta(otsikko, Kirjasin.LukuLihava);
            otsikko.style.color = Teksti;
            otsikko.style.fontSize = 16;
            otsikko.style.whiteSpace = WhiteSpace.Normal;
            otsikko.style.marginTop = 2;

            teksti = Rakenne.Teksti("", "mk-dioraama__teksti", lauta);
            Kirjasimet.Aseta(teksti, Kirjasin.Luku);
            teksti.style.color = Teksti;
            teksti.style.whiteSpace = WhiteSpace.Normal;
            teksti.style.fontSize = 15;
            teksti.style.marginTop = 6;

            lainaus = Rakenne.Teksti("", "mk-dioraama__lainaus", lauta);
            Kirjasimet.Aseta(lainaus, Kirjasin.LukuKursiivi);
            lainaus.style.color = Teksti;
            lainaus.style.whiteSpace = WhiteSpace.Normal;
            lainaus.style.fontSize = 14;
            lainaus.style.marginTop = 6;

            lahde = Rakenne.Teksti("", "mk-dioraama__lahde", lauta);
            Kirjasimet.Aseta(lahde, Kirjasin.Luku);
            lahde.style.color = new Color(Teksti.r, Teksti.g, Teksti.b, 0.65f);
            lahde.style.fontSize = 11;
            lahde.style.marginTop = 4;
            lahde.style.whiteSpace = WhiteSpace.Normal; // pitkä lähderivi rivittyy (ei leikkaudu oikeasta reunasta)

            // Kiertue (era 3 kohta 5): himmeä "Seuraavaksi: <tila> ›" -rivi taulun alaosaan; ei nappia, taulun napautus siirtää.
            seuraava = Rakenne.Teksti("", "mk-dioraama__seuraava", lauta);
            Kirjasimet.Aseta(seuraava, Kirjasin.Luku);
            seuraava.style.color = new Color(Teksti.r, Teksti.g, Teksti.b, 0.5f);
            seuraava.style.fontSize = 12;
            seuraava.style.marginTop = 8;
            seuraava.style.whiteSpace = WhiteSpace.Normal;
            seuraava.style.display = DisplayStyle.None;

            // Kuuntele uudelleen: infotaulun oikean yläkulman yläpuolelle kaistaleen paikalle (kaistale on silloin poissa;
            // laudan sisällä nappi peitti tekstirivin, 357bce14-kuva). Ei sekoitu yleisnäkymän ↻-kertojaan vasemmassa yläkulmassa.
            kuunteleNappi = Rakenne.Nappi("Kuuntele", "mk-dioraama__kuuntele", () => { if (kuunnelmaTila != null) kuunnelma.Aloita(kuunnelmaTila, true); },
                juuri, Ikonit.PaivitaVersio);
            kuunteleNappi.style.position = Position.Absolute;
            kuunteleNappi.style.flexDirection = FlexDirection.Row; kuunteleNappi.style.alignItems = Align.Center;
            kuunteleNappi.style.height = 34;
            kuunteleNappi.style.backgroundColor = new Color(Pergamentti.r, Pergamentti.g, Pergamentti.b, 0.92f);
            kuunteleNappi.style.borderTopLeftRadius = 17; kuunteleNappi.style.borderTopRightRadius = 17;
            kuunteleNappi.style.borderBottomLeftRadius = 17; kuunteleNappi.style.borderBottomRightRadius = 17;
            kuunteleNappi.style.color = Teksti;
            kuunteleNappi.style.paddingLeft = 10; kuunteleNappi.style.paddingRight = 12; kuunteleNappi.style.paddingTop = 4; kuunteleNappi.style.paddingBottom = 4;
            var kuunteleTeksti = kuunteleNappi.Q<Label>();
            if (kuunteleTeksti != null) { Kirjasimet.Aseta(kuunteleTeksti, Kirjasin.Kone); kuunteleTeksti.style.fontSize = 11; kuunteleTeksti.style.color = Teksti; kuunteleTeksti.style.marginLeft = 4; }
            kuunteleNappi.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            kuunteleNappi.style.display = DisplayStyle.None;

            // Kehittäjätilan kuoren laatutasovalitsin (Olavinlinna, omistajan toive 29.9.: "kehittäjätilaan tasovalitsin"):
            // napautus kiertää auto → huippu → normaali → kevyt; valinta muistetaan laitteeseen (DioraamaUlkokuori).
            kuoriNappi = Rakenne.Nappi(DioraamaUlkokuori.ValintaTeksti(), "mk-dioraama__kuoritaso", DioraamaUlkokuori.SeuraavaPakotus, juuri);
            kuoriNappi.style.position = Position.Absolute;
            // Oikeaan yläkulmaan sulkunapin alle (Päätoimittaja 30.9.: vasemmassa alakulmassa se peitti kertojan laatikon ja infotaulun).
            kuoriNappi.style.right = 14; kuoriNappi.style.top = 110;
            kuoriNappi.style.backgroundColor = new Color(0.1f, 0.08f, 0.06f, 0.6f);
            kuoriNappi.style.color = Color.white;
            kuoriNappi.style.fontSize = 12;
            kuoriNappi.style.paddingLeft = 10; kuoriNappi.style.paddingRight = 10; kuoriNappi.style.paddingTop = 6; kuoriNappi.style.paddingBottom = 6;
            kuoriNappi.style.borderTopLeftRadius = 8; kuoriNappi.style.borderTopRightRadius = 8;
            kuoriNappi.style.borderBottomLeftRadius = 8; kuoriNappi.style.borderBottomRightRadius = 8;
            var kuoriTeksti = kuoriNappi.Q<Label>();
            if (kuoriTeksti != null) { kuoriTeksti.style.color = Color.white; kuoriTeksti.style.fontSize = 12; }
            kuoriNappi.style.display = Asetukset.Kehittaja && !LinssiOhjain.EsittelylinssitAuki ? DisplayStyle.Flex : DisplayStyle.None;
            DioraamaUlkokuori.PakotusVaihtui += () =>
            {
                var l = kuoriNappi?.Q<Label>();
                if (l != null) l.text = DioraamaUlkokuori.ValintaTeksti(); else if (kuoriNappi != null) kuoriNappi.text = DioraamaUlkokuori.ValintaTeksti();
            };

            // Elävä linna (käsikirjoitus kohta 3): ‹-nappi vasempaan yläkulmaan tilassa → takaisin yleisnäkymään.
            paluuNappi = Rakenne.Nappi("‹", "mk-dioraama__paluu", DioraamaSovitin.PyydaPaluu, juuri);
            paluuNappi.style.position = Position.Absolute;
            paluuNappi.style.left = 14; paluuNappi.style.top = 58;
            paluuNappi.style.width = 44; paluuNappi.style.height = 44;
            paluuNappi.style.backgroundColor = new Color(Pergamentti.r, Pergamentti.g, Pergamentti.b, 0.9f);
            paluuNappi.style.borderTopLeftRadius = 22; paluuNappi.style.borderTopRightRadius = 22;
            paluuNappi.style.borderBottomLeftRadius = 22; paluuNappi.style.borderBottomRightRadius = 22;
            var paluuTeksti = paluuNappi.Q<Label>();
            if (paluuTeksti != null) { paluuTeksti.style.fontSize = 24; paluuTeksti.style.color = Teksti; paluuTeksti.style.unityTextAlign = TextAnchor.MiddleCenter; }
            paluuNappi.style.display = DisplayStyle.None;

            // Uusintanappi (↻) samaan kulmaan kuin ‹: näkyy yleisnäkymässä, kun kertojan kierros on käyty.
            // ↻-merkkiä ei ole kirjasimessa (1.1 (73) -kuva: laatikko), joten ikoni: Ikonit.PaivitaVersio (kaareva nuoli).
            uusintaNappi = Rakenne.Nappi(null, "mk-dioraama__uusinta", () => DioraamaSovitin.Linssi?.KertojaUudelleen(DioraamaSovitin.ViimeisinT), juuri, Ikonit.PaivitaVersio);
            uusintaNappi.style.position = Position.Absolute;
            uusintaNappi.style.left = 14; uusintaNappi.style.top = 58;
            uusintaNappi.style.width = 44; uusintaNappi.style.height = 44;
            uusintaNappi.style.backgroundColor = new Color(Pergamentti.r, Pergamentti.g, Pergamentti.b, 0.9f);
            uusintaNappi.style.borderTopLeftRadius = 22; uusintaNappi.style.borderTopRightRadius = 22;
            uusintaNappi.style.borderBottomLeftRadius = 22; uusintaNappi.style.borderBottomRightRadius = 22;
            uusintaNappi.style.color = Teksti;
            uusintaNappi.style.alignItems = Align.Center; uusintaNappi.style.justifyContent = Justify.Center;
            uusintaNappi.tooltip = "Kertoja uudelleen";
            uusintaNappi.style.display = DisplayStyle.None;

            // Kertojan teksti (Linssit.uss .mk-aikajana-kertomus): tumma läpikuultava laatikko alareunaan, häivytys 380 ms.
            // Ei ota kosketuksia: napautus menee dioraamalle (DioraamaSyote → seuraava jakso).
            kertojaKehys = Rakenne.El("mk-aikajana-kertomus", juuri, PickingMode.Ignore);
            kertojaKehys.style.bottom = 44;
            kertojaLaatikko = Rakenne.El("mk-aikajana-kertomus__laatikko", kertojaKehys, PickingMode.Ignore);
            kertojaTeksti = Rakenne.Teksti("", "mk-aikajana-kertomus__teksti", kertojaLaatikko);
            kertojaTeksti.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(kertojaTeksti, Kirjasin.Luku);

            // Pulun napautusalue (LiviaKuva ei ota kosketuksia): sama laatikko kuin Pulun kuva infotaulun kulmassa.
            puluAlue = Rakenne.El("mk-dioraama__pulualue", juuri, PickingMode.Position);
            puluAlue.style.position = Position.Absolute;
            puluAlue.style.display = DisplayStyle.None;
            puluAlue.RegisterCallback<PointerDownEvent>(e =>
            {
                if (string.IsNullOrEmpty(puluKupla)) return;
                // Pulun kertomus ääneen (Pelikoodari 1.10.2026, #3742: pulu.aani 12–22 s). Omistaja 2.10. 14.1x (loki 14.09):
                // puhuttua ei näytetä kuplana; teksti vain, jos ääntä ei ole tai Kertoja on pois.
                if (!DioraamaAanet.SoitaPulu(puluAani))
                {
                    etsintaOtsikko.text = "Pulu";
                    etsintaTeksti.text = puluKupla;
                    etsintaKortti.style.display = DisplayStyle.Flex;
                    etsintaKortti.style.opacity = 1f;
                    etsintaLoppuu = Time.unscaledTime + 9f;
                }
                e.StopPropagation();
            });

            // Etsintäkortti (voudin sinetti, DioraamaEtsinta.Nayta): pergamenttilappu yläosaan 7 s, napautus sulkee.
            etsintaKortti = Rakenne.El("mk-dioraama__etsinta", juuri);
            etsintaKortti.style.position = Position.Absolute;
            etsintaKortti.style.left = Length.Percent(8); etsintaKortti.style.right = Length.Percent(8); etsintaKortti.style.top = 110;
            etsintaKortti.style.backgroundColor = Pergamentti;
            etsintaKortti.style.paddingTop = 12; etsintaKortti.style.paddingBottom = 12; etsintaKortti.style.paddingLeft = 16; etsintaKortti.style.paddingRight = 16;
            etsintaKortti.style.borderTopLeftRadius = 10; etsintaKortti.style.borderTopRightRadius = 10;
            etsintaKortti.style.borderBottomLeftRadius = 10; etsintaKortti.style.borderBottomRightRadius = 10;
            etsintaKortti.style.transitionProperty = new List<StylePropertyName> { new StylePropertyName("opacity") };
            etsintaKortti.style.transitionDuration = new List<TimeValue> { new TimeValue(AnimaatioMs, TimeUnit.Millisecond) };
            etsintaOtsikko = Rakenne.Teksti("", "mk-dioraama__etsintaotsikko", etsintaKortti);
            Kirjasimet.Aseta(etsintaOtsikko, Kirjasin.LukuLihava);
            etsintaOtsikko.style.color = Teksti; etsintaOtsikko.style.fontSize = 15;
            etsintaTeksti = Rakenne.Teksti("", "mk-dioraama__etsintateksti", etsintaKortti);
            Kirjasimet.Aseta(etsintaTeksti, Kirjasin.LukuKursiivi);
            etsintaTeksti.style.color = Teksti; etsintaTeksti.style.fontSize = 14; etsintaTeksti.style.whiteSpace = WhiteSpace.Normal;
            etsintaTeksti.style.marginTop = 4;
            etsintaKortti.style.display = DisplayStyle.None;
            etsintaKortti.RegisterCallback<PointerDownEvent>(_ => etsintaLoppuu = 0f);
            DioraamaEtsinta.Nayta += (otsikko, teksti) =>
            {
                etsintaOtsikko.text = otsikko ?? "";
                etsintaTeksti.text = teksti ?? "";
                etsintaKortti.style.display = DisplayStyle.Flex;
                etsintaKortti.style.opacity = 1f;
                etsintaLoppuu = Time.unscaledTime + 7f;
            };

            // Tekstityskaistale viimeisenä: laudan ja Pulun päällä piirtojärjestyksessä (sijoitus ei kuitenkaan peitä niitä).
            kuunnelma = new KuunnelmaKaistale(juuri);
            Viimeisin = this;

            DioraamaSovitin.PeittaaRuutu = OsuukoPaneeliin;
            DioraamaSovitin.Vaihtui += Kytke;
            kerros.JokaRuutu += Paivita;
            Kytke(DioraamaSovitin.Linssi);
        }

        void AsetaKuva(RenderTexture kuva)
        {
            nakyma.style.backgroundImage = kuva != null ? new StyleBackground(Background.FromRenderTexture(kuva)) : new StyleBackground(StyleKeyword.None);
        }

        bool peitetty;
        bool kytketty;

        /// <summary>Linssivalitsin on auki linssin päällä (LinssiUi, Laitetestaaja 29.9.): taulu ja laput pois, jotteivät
        /// ne piirry valitsimen (kerros 25) päälle. Näyttämön kuva (kerros 24) jää valitsimen alle.</summary>
        public bool Peitetty
        {
            set
            {
                peitetty = value;
                juuri.style.display = kytketty && !peitetty ? DisplayStyle.Flex : DisplayStyle.None;
            }
        }

        void Kytke(PoikkileikkausLinssi uusi)
        {
            kytketty = uusi != null;
            if (kuoriNappi != null) kuoriNappi.style.display = Asetukset.Kehittaja && !LinssiOhjain.EsittelylinssitAuki ? DisplayStyle.Flex : DisplayStyle.None;
            juuri.style.display = kytketty && !peitetty ? DisplayStyle.Flex : DisplayStyle.None;
            nakyma.style.display = uusi != null ? DisplayStyle.Flex : DisplayStyle.None;
            // Kulman Pulu piiloon linssin ajaksi: dioraamassa Pulu liitää näyttämöllä (oma LiviaKuva).
            var p = Pulu.Hae();
            if (uusi != null && p.Nakyvissa) { p.Nayta(false); puluPiilotettu = true; }
            else if (uusi == null && puluPiilotettu) { p.Nayta(true); puluPiilotettu = false; }
            if (uusi != null) Paivita();
        }

        /// <summary>PalloKierto.UiPeittaa-mallilla: napautus lautaan ei saa myös osua 3D-näkymän AABB-testiin.</summary>
        bool OsuukoPaneeliin(Vector2 ruutu)
        {
            if (etsintaKortti != null && etsintaKortti.resolvedStyle.display != DisplayStyle.None && etsintaKortti.panel != null
                && etsintaKortti.worldBound.Contains(RuntimePanelUtils.ScreenToPanel(etsintaKortti.panel, new Vector2(ruutu.x, Screen.height - ruutu.y))))
                return true;
            // ‹-nappi ei saa välittää napautusta dioraamalle (muuten sama napautus voisi kohdistaa tilan uudelleen).
            foreach (var el in new VisualElement[] { paluuNappi, uusintaNappi, puluAlue, kuunnelma?.Juuri, kuunteleNappi })
                if (el != null && el.resolvedStyle.display != DisplayStyle.None && el.panel != null
                    && el.worldBound.Contains(RuntimePanelUtils.ScreenToPanel(el.panel, new Vector2(ruutu.x, Screen.height - ruutu.y))))
                    return true;
            if (juuri.style.display == DisplayStyle.None || lauta.resolvedStyle.display == DisplayStyle.None) return false;
            var paneelipiste = RuntimePanelUtils.ScreenToPanel(lauta.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            return lauta.worldBound.Contains(paneelipiste);
        }

        void Paivita()
        {
            var linssi = DioraamaSovitin.Linssi;
            var rakennus = linssi?.Rakennus;
            // Kehittäjän Kuori-nappi ×:n alle oikeaan reunaan (katselmus 1.1 (78): kiinteä top 110 osui × -nappiin).
            if (kuoriNappi != null && kuoriNappi.resolvedStyle.display != DisplayStyle.None)
            {
                var sr = UiNakymat.Hae()?.Linssit?.SulkuRajat ?? Rect.zero;
                var jr = juuri.worldBound;
                if (sr.height > 0 && jr.width > 0)
                {
                    kuoriNappi.style.top = sr.yMax - jr.yMin + 8f;
                    kuoriNappi.style.right = Mathf.Max(8f, jr.xMax - sr.xMax);
                }
            }
            var kamera = DioraamaSovitin.AktiivinenKamera;
            var nakymaTaiEi = DioraamaSovitin.ViimeisinNakyma;
            if (etsintaKortti != null && etsintaKortti.style.display == DisplayStyle.Flex && Time.unscaledTime > etsintaLoppuu)
                etsintaKortti.style.display = DisplayStyle.None;
            if (paluuNappi != null)
                paluuNappi.style.display = rakennus?.Saapuminen != null && nakymaTaiEi?.KohdeTila != null ? DisplayStyle.Flex : DisplayStyle.None;
            if (linssi == null || rakennus == null || kamera == null || nakymaTaiEi == null || DioraamaSovitin.SaapumisOdotus)
            {
                lauta.style.display = DisplayStyle.None;
                pulu.style.display = DisplayStyle.None;
                puluAlue.style.display = DisplayStyle.None;
                uusintaNappi.style.display = DisplayStyle.None;
                kertojaLaatikko.RemoveFromClassList("mk-nakyy");
                LopetaKuunnelma();
                return;
            }
            Nakyma nakyma = nakymaTaiEi.Value;
            double tNyt = DioraamaSovitin.ViimeisinT;

            // UUSI LINNA: kertojan kierros — vain teksti ja kamera; Pulu, taulu ja laput pois.
            bool kierros = nakyma.KertojaJakso >= 0 || linssi.KertojaKaynnissa(tNyt);
            // Kehittäjän kuorinappi: ei esittelylinssien reitillä eikä kertojan tai infotaulun aikana (Päätoimittaja 30.9.).
            bool infoAuki = nakyma.KohdeTila != null && rakennus.Tila(nakyma.KohdeTila)?.Infotaulu != null;
            kuoriNappi.style.display = Asetukset.Kehittaja && !LinssiOhjain.EsittelylinssitAuki && !kierros && !infoAuki
                ? DisplayStyle.Flex : DisplayStyle.None;
            if (nakyma.KertojaTeksti != null) kertojaTeksti.text = nakyma.KertojaTeksti;
            // Omistaja 2.10. 14.1x (loki 14.09, kumoaa 30.9.:n tekstilaatikon): kertojan jakso puheen aikana ilman tekstiä;
            // koko teksti vain, jos jaksolla ei ole ääntä tai Kertoja on pois. (Jaksoilla ei ole lyhyttä otsikkoa.)
            string jaksonAani = nakyma.KertojaJakso >= 0 && nakyma.KertojaJakso < rakennus.Kertoja.Count ? rakennus.Kertoja[nakyma.KertojaJakso].Aani : null;
            kertojaLaatikko.EnableInClassList("mk-nakyy", nakyma.KertojaTeksti != null && !DioraamaAanet.Puhutaan(jaksonAani));
            uusintaNappi.style.display = nakyma.KohdeTila == null && linssi.KertojaUusittavissa(tNyt) ? DisplayStyle.Flex : DisplayStyle.None;
            if (kierros)
            {
                lauta.style.display = DisplayStyle.None;
                pulu.style.display = DisplayStyle.None;
                puluAlue.style.display = DisplayStyle.None;
                for (int k = 0; k < laput.Count; k++) laput[k].style.display = DisplayStyle.None;
                LopetaKuunnelma();
                return;
            }
            var infoTila = nakyma.KohdeTila != null ? rakennus.Tila(nakyma.KohdeTila) : null;
            if (infoTila?.Infotaulu != null) { PaivitaInfotaulu(linssi, infoTila, nakyma, tNyt); return; }
            // Uusi linna, yleisnäkymä (Natiivi-UI:n katselmus 30.9.): Pulu vasempaan alakulmaan, ei linnan päälle; napautus
            // näyttää linnan pulu.teksti-kuplan, jos sellainen on.
            if (nakyma.KohdeTila == null && rakennus.Kertoja != null && rakennus.Kertoja.Count > 0)
            {
                // Tilasta palattaessa kuunnelma loppuu (dccb82a5: keittiön kaistale jäi yleisnäkymään).
                LopetaKuunnelma();
                for (int k = 0; k < laput.Count; k++) laput[k].style.display = DisplayStyle.None;
                lauta.style.display = DisplayStyle.None;
                float ph2 = juuri.layout.height; if (float.IsNaN(ph2) || ph2 <= 0) ph2 = Screen.height;
                const float koko2 = 64f;
                pulu.style.display = DisplayStyle.Flex;
                pulu.MiniKorkeus(koko2);
                // Turva-alueen sisään (linnakatselmus 1.10.: iPhone vaaka, kiinteä 18 pt jäi Dynamic Islandin alle).
                float pw2 = juuri.layout.width, vasen2 = 0f, ala2 = 0f;
                if (!float.IsNaN(pw2) && pw2 > 0 && Screen.width > 0)
                {
                    float sk2 = pw2 / Screen.width;
                    vasen2 = Screen.safeArea.xMin * sk2;
                    ala2 = Screen.safeArea.yMin * sk2;
                }
                pulu.style.left = vasen2 + 18; pulu.style.top = ph2 - ala2 - koko2 - 96;
                puluKupla = rakennus.PuluTeksti; puluAani = rakennus.PuluAani;
                bool kupla = !string.IsNullOrEmpty(puluKupla);
                puluAlue.style.display = kupla ? DisplayStyle.Flex : DisplayStyle.None;
                if (kupla) { puluAlue.style.left = vasen2 + 12; puluAlue.style.top = ph2 - ala2 - koko2 - 102; puluAlue.style.width = koko2 * 58f / 70f + 12; puluAlue.style.height = koko2 + 12; }
                return;
            }
            LopetaKuunnelma();
            puluAlue.style.display = DisplayStyle.None;

            // Pulu: 3D-laskeutumispiste → ruutupiste → paneelikoordinaatit (MaapallonVuosiSovitin-kommentin malli).
            Vector3 puluMaailma = DioraamaNayttamo.UnityPiste(nakyma.Pulu);
            Vector3 ruutu = kamera.WorldToScreenPoint(puluMaailma);
            if (ruutu.z > 0f)
            {
                pulu.style.display = DisplayStyle.Flex;
                var paneeliste = RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
                // Koko syvyyden mukaan (etäämpänä pienempi), rajattuna 64–110 pt:iin (tarkka käyrä jää laitetestiin).
                float koko = Mathf.Clamp(PuluMaxPt * (PuluEtaisyysvertailuM / Mathf.Max(0.5f, ruutu.z)), PuluMinPt, PuluMaxPt);
                float puluLeveys = koko * (58f / 70f);
                pulu.MiniKorkeus(koko);
                // Turva-alueen sisään (linnakatselmus 1.10., iPhone vaaka: laskeutumispiste osui vasempaan reunaan Dynamic
                // Islandin alle). Taulu seuraa rajattua pistettä.
                {
                    float jw = juuri.layout.width, jh = juuri.layout.height;
                    if (!float.IsNaN(jw) && jw > 0 && Screen.width > 0)
                    {
                        float sk = jw / Screen.width;
                        var sa = Screen.safeArea;
                        float vasen = sa.xMin * sk + 4f, oikea = jw - (Screen.width - sa.xMax) * sk - 4f;
                        float yla = (Screen.height - sa.yMax) * sk + 4f, ala = jh - sa.yMin * sk - 4f;
                        paneeliste.x = Mathf.Clamp(paneeliste.x, vasen + puluLeveys * 0.5f, Mathf.Max(vasen + puluLeveys * 0.5f, oikea - puluLeveys * 0.5f));
                        paneeliste.y = Mathf.Clamp(paneeliste.y, yla + koko, Mathf.Max(yla + koko, ala));
                    }
                }
                pulu.style.left = paneeliste.x - puluLeveys * 0.5f;
                pulu.style.top = paneeliste.y - koko;

                // Paneelin mitat (pt), ei Screen-pikseleitä: UI Toolkit skaalaa paneelin.
                float pw = juuri.layout.width, ph = juuri.layout.height;
                if (float.IsNaN(pw) || pw <= 0) { pw = Screen.width; ph = Screen.height; }
                // Leveys: pystyssä 64 % (kapea puhelin), vaakana 36 %; pinta-ala jää alle 45 %:n.
                lauta.style.width = Mathf.Max(220f, pw * (ph > pw ? 0.64f : 0.36f));
                bool oikealla = TaulunPuoliOikealla(rakennus, nakyma.KohdeTila);
                float tauluLeveys = float.IsNaN(lauta.layout.width) || lauta.layout.width <= 0 ? 260f : lauta.layout.width;
                float tauluKorkeus = float.IsNaN(lauta.layout.height) || lauta.layout.height <= 0 ? 160f : lauta.layout.height;
                // Pulun viereen marginaalilla, ettei taulu peitä Pulua: oikealla keskikohta + puoli pululeveyttä +
                // 12 pt, vasemmalla keskikohta - puoli pululeveyttä - 12 pt - taululeveys (aiemmin kiinteä ±24 pt
                // keskikohdasta peitti linnun oikean reunan, kun puluLeveys ylitti 2×24 pt, savuke 29.9.).
                float x = oikealla ? paneeliste.x + puluLeveys * 0.5f + 12f : paneeliste.x - puluLeveys * 0.5f - 12f - tauluLeveys;
                x = Mathf.Clamp(x, 8f, Mathf.Max(8f, pw - tauluLeveys - 8f));
                float y = Mathf.Clamp(paneeliste.y - koko - 8f, 8f, Mathf.Max(8f, ph - tauluKorkeus - 8f));
                if (nakyma.KohdeTila == null)
                {
                    // Yleisnäkymä: taulu ruudun alaosaan keskelle, ettei se peitä linnaa (savuke 29.9.).
                    x = (pw - tauluLeveys) * 0.5f;
                    y = ph - tauluKorkeus - Mathf.Max(24f, ph * 0.06f);
                }
                lauta.style.left = x;
                lauta.style.top = y;
            }
            else pulu.style.display = DisplayStyle.None;

            PaivitaLaput(rakennus, kamera, nakyma);

            var taulu = nakyma.KohdeTila != null ? rakennus.Tila(nakyma.KohdeTila)?.Taulu : rakennus.Taulu;
            bool auki = nakyma.TauluAuki && taulu?.Kohdat != null && taulu.Kohdat.Count > 0;
            lauta.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            lauta.style.opacity = auki ? 1f : 0f;
            lauta.style.translate = new Translate(0, auki ? 0 : 8);
            if (!auki) return;

            otsikko.text = taulu.Otsikko ?? "";
            bool luonnos = taulu.Tila == "luonnos";
            if (nakyma.Kohta < 0)
            {
                // Taulu on auki, mutta ensimmäinen kohta ei ole vielä alkanut: vain otsikko.
                laskuri.text = luonnos ? "luonnos" : "";
                teksti.text = "";
                teksti.style.display = DisplayStyle.None;
                lahde.style.display = DisplayStyle.None;
            }
            else
            {
                int i = Mathf.Clamp(nakyma.Kohta, 0, taulu.Kohdat.Count - 1);
                laskuri.text = $"{i + 1}/{taulu.Kohdat.Count}" + (luonnos ? " · luonnos" : "");
                var kohta = taulu.Kohdat[i];
                teksti.text = kohta.Teksti ?? "";
                teksti.style.display = DisplayStyle.Flex;
                bool naytaLahde = !string.IsNullOrEmpty(kohta.Lahde) && kohta.Lahde != "TARKISTAMATTA";
                lahde.text = naytaLahde ? kohta.Lahde : "";
                lahde.style.display = naytaLahde ? DisplayStyle.Flex : DisplayStyle.None;
            }
            // Hahmon repliikki tai Pulun reaktio lainauksena (kohdan oma teksti näkyy jo yllä).
            string puhe = nakyma.Repliikki;
            // Omistaja 2.10. 14.1x (loki 14.09): ääneen puhuttua repliikkiä ei näytetä tekstinä.
            bool lainausNakyy = !string.IsNullOrEmpty(puhe) && puhe != teksti.text && !DioraamaAanet.Puhutaan(nakyma.AskeleenAani);
            lainaus.style.display = lainausNakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (lainausNakyy) lainaus.text = PuhujanNimi(rakennus, nakyma) + ": ”" + puhe + "”";

            string seuraavaRivi = SeuraavaRivi(rakennus, nakyma, taulu.Kohdat.Count);
            seuraava.text = seuraavaRivi ?? "";
            seuraava.style.display = seuraavaRivi != null ? DisplayStyle.Flex : DisplayStyle.None;
        }

        /// <summary>
        /// UUSI LINNA (omistaja 30.9.2026): huoneen infotaulu ruudun alaosaan (nimi, 1–2 riviä, lähteet) ja aktiivisen
        /// etsintävaiheen rivi korostettuna; Pulu istuu taulun vasemmassa yläkulmassa, napautus näyttää pulu.teksti-kuplan.
        /// Näkyy, kun tilaan on lennetty perille (leikkausikkuna auki).
        /// </summary>
        void PaivitaInfotaulu(PoikkileikkausLinssi linssi, Tila tila, Nakyma nakyma, double t)
        {
            for (int k = 0; k < laput.Count; k++) laput[k].style.display = DisplayStyle.None;
            bool perilla = linssi.LeikkausHetkella(t).osuus >= 0.99;
            var info = tila.Infotaulu;
            lauta.style.display = perilla ? DisplayStyle.Flex : DisplayStyle.None;
            lauta.style.opacity = perilla ? 1f : 0f;
            lauta.style.translate = new Translate(0, perilla ? 0 : 8);
            if (!perilla) { pulu.style.display = DisplayStyle.None; puluAlue.style.display = DisplayStyle.None; LopetaKuunnelma(); return; }

            float pw = juuri.layout.width, ph = juuri.layout.height;
            if (float.IsNaN(pw) || pw <= 0) { pw = Screen.width; ph = Screen.height; }
            lauta.style.width = Mathf.Max(220f, pw * (ph > pw ? 0.82f : 0.40f));
            float tauluLeveys = float.IsNaN(lauta.layout.width) || lauta.layout.width <= 0 ? 300f : lauta.layout.width;
            float tauluKorkeus = float.IsNaN(lauta.layout.height) || lauta.layout.height <= 0 ? 140f : lauta.layout.height;
            float x = (pw - tauluLeveys) * 0.5f, y = ph - tauluKorkeus - Mathf.Max(24f, ph * 0.05f);
            lauta.style.left = x; lauta.style.top = y;

            laskuri.text = "";
            otsikko.text = info.Nimi ?? tila.Nimi ?? "";
            var rivit = new List<string>(); var lahteet = new List<string>();
            foreach (var (rt, rl) in info.Rivit)
            {
                if (!string.IsNullOrEmpty(rt)) rivit.Add(rt);
                if (!string.IsNullOrEmpty(rl) && rl != "TARKISTAMATTA" && !lahteet.Contains(rl)) lahteet.Add(rl);
            }
            teksti.text = string.Join("\n", rivit);
            teksti.style.display = rivit.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            lahde.text = string.Join(" · ", lahteet);
            lahde.style.display = lahteet.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            // Etsinnän vihje riviksi (korostettuna kursiivilla); muuten hahmon repliikki kuten ennen.
            string vihje = DioraamaEtsinta.AktiivinenRivi;
            // Pulun vanhat käsikirjoitusrivit eivät kuulu infotauluun (Pulu kertoo lisää kuplassa napautuksesta); vain
            // hahmon repliikki (1.1 (74) -kuva: "Pulu: …" toisti tekstiä taulussa).
            string puhe = !string.IsNullOrEmpty(vihje) ? vihje
                : !string.IsNullOrEmpty(nakyma.Repliikki) && nakyma.Puhuja != null && nakyma.Puhuja != "pulu"
                  && !DioraamaAanet.Puhutaan(nakyma.AskeleenAani) // omistaja 14.09: ääneen puhuttu ei kuplana
                    ? PuhujanNimi(DioraamaSovitin.Linssi.Rakennus, nakyma) + ": ”" + nakyma.Repliikki + "”" : null;
            lainaus.text = puhe ?? "";
            lainaus.style.display = puhe != null ? DisplayStyle.Flex : DisplayStyle.None;
            seuraava.style.display = DisplayStyle.None;

            puluKupla = tila.PuluTeksti; puluAani = tila.PuluAani;
            bool puluNakyy = !string.IsNullOrEmpty(puluKupla);

            // Kuunnelma alkaa, kun tilaan on tultu perille (kierroksen aikana tänne ei tulla); kaistale laudan yläpuolelle
            // Pulun oikealle puolelle (Pulu 64 pt laudan vasemmassa yläkulmassa, x + 6 … x + 59).
            bool kuunneltava = tila.Kuunnelma != null && tila.Kuunnelma.Count > 0;
            if (kuunneltava && kuunnelma.TilaId != tila.Id) { kuunnelmaTila = tila; kuunnelma.Aloita(tila); }
            else if (!kuunneltava) LopetaKuunnelma();
            float kuunnelmaVasen = puluNakyy ? x + 70f : x;
            kuunnelma.Paivita(kuunnelmaVasen, Mathf.Max(160f, x + tauluLeveys - kuunnelmaVasen), y - 8f);
            bool kuuntele = kuunneltava && !kuunnelma.Kaynnissa;
            kuunteleNappi.style.display = kuuntele ? DisplayStyle.Flex : DisplayStyle.None;
            if (kuuntele)
            {
                float nl = float.IsNaN(kuunteleNappi.layout.width) || kuunteleNappi.layout.width <= 0 ? 110f : kuunteleNappi.layout.width;
                kuunteleNappi.style.left = x + tauluLeveys - nl;
                kuunteleNappi.style.top = y - 8f - 34f;
            }
            pulu.style.display = puluNakyy ? DisplayStyle.Flex : DisplayStyle.None;
            puluAlue.style.display = puluNakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (!puluNakyy) return;
            const float koko = 64f;
            float puluLeveys = koko * (58f / 70f);
            pulu.MiniKorkeus(koko);
            float px = x + 6f, py = y - koko + 12f; // istuu taulun yläreunalla vasemmassa kulmassa
            pulu.style.left = px; pulu.style.top = py;
            puluAlue.style.left = px - 6f; puluAlue.style.top = py - 6f;
            puluAlue.style.width = puluLeveys + 12f; puluAlue.style.height = koko + 12f;
        }

        void LopetaKuunnelma()
        {
            if (kuunnelma == null) return;
            if (kuunnelma.TilaId != null) kuunnelma.Lopeta();
            kuunnelmaTila = null;
            kuunteleNappi.style.display = DisplayStyle.None;
        }

        /// <summary>Testikomennot (ui kuunnelma tila|ohita|alusta): viimeksi luotu taulu.</summary>
        public static DioraamaTaulu Viimeisin { get; private set; }
        public string KuunnelmaTila => kuunnelma.Tila;
        public void KuunnelmaAlusta() { if (kuunnelmaTila != null) kuunnelma.Aloita(kuunnelmaTila, true); }
        public bool KuunnelmaOhita() => kuunnelma.OhitaRivi();

        /// <summary>Kiertue (era 3 kohta 5): rivi taulun alaosaan, kun tilan viimeinen kohta näkyy tai käsikirjoitus on
        /// lopussa ja kiertue on olemassa; muuten null. Yleisnäkymässä (linnan avaustaulu) "Aloita kierros: …", kiertueen
        /// viimeisen tilan lopussa "Takaisin linnaan ›". Napautus taulua hoitaa siirtymän (PoikkileikkausLinssi.Napauta).</summary>
        static string SeuraavaRivi(Rakennus rakennus, Nakyma nakyma, int kohtia)
        {
            if (rakennus.Kiertue == null || rakennus.Kiertue.Count == 0) return null;
            int viimeinen = (nakyma.KohdeTila == null ? Mathf.Min(3, kohtia) : kohtia) - 1;
            if (!nakyma.KasikirjoitusLopussa && nakyma.Kohta != viimeinen) return null;
            string seuraavaId = Ohjaaja.SeuraavaKiertueella(rakennus, nakyma.KohdeTila);
            if (seuraavaId == null) return "Takaisin linnaan ›";
            var tila = rakennus.Tila(seuraavaId);
            string nimi = !string.IsNullOrEmpty(tila?.Nimi) ? tila.Nimi : seuraavaId;
            return (nakyma.KohdeTila == null ? "Aloita kierros: " : "Seuraavaksi: ") + nimi + " ›";
        }

        static string PuhujanNimi(Rakennus rakennus, Nakyma nakyma)
        {
            if (nakyma.Puhuja == null || nakyma.Puhuja == "pulu") return "Pulu";
            var tila = nakyma.KohdeTila != null ? rakennus.Tila(nakyma.KohdeTila) : null;
            if (tila != null)
                foreach (var h in tila.Hahmot)
                    if (h.Id == nakyma.Puhuja && h.HenkiloId != null && rakennus.Henkilot != null
                        && rakennus.Henkilot.TryGetValue(h.HenkiloId, out var henkilo) && !string.IsNullOrEmpty(henkilo.Nimi))
                        return henkilo.Nimi;
            return nakyma.Puhuja;
        }

        /// <summary>Yleisnäkymässä kohdistettavien tilojen nimilaput tilan rajojen keskelle (napautettavat tilat).</summary>
        void PaivitaLaput(Rakennus rakennus, Camera kamera, Nakyma nakyma)
        {
            int n = 0;
            sijoitukset.Clear();
            if (nakyma.KohdeTila == null && rakennus.Nimilaput)
            {
                foreach (var tila in rakennus.Tilat)
                {
                    if (!tila.Kohdistettava) continue;
                    var keski = new Matkakirja.Linssit.Dioraama.V3((tila.RajaMin.X + tila.RajaMax.X) / 2, (tila.RajaMin.Y + tila.RajaMax.Y) / 2, (tila.RajaMin.Z + tila.RajaMax.Z) / 2);
                    Vector3 r = kamera.WorldToScreenPoint(DioraamaNayttamo.UnityPiste(keski));
                    if (r.z <= 0f) continue;
                    if (n == laput.Count)
                    {
                        var uusi = Rakenne.Teksti("", "mk-dioraama__lappu", lappuKerros);
                        uusi.pickingMode = PickingMode.Ignore;
                        Kirjasimet.Aseta(uusi, Kirjasin.Kone);
                        uusi.style.position = Position.Absolute;
                        uusi.style.fontSize = 12;
                        uusi.style.color = Teksti;
                        uusi.style.backgroundColor = Pergamentti;
                        uusi.style.paddingLeft = 8; uusi.style.paddingRight = 8; uusi.style.paddingTop = 3; uusi.style.paddingBottom = 3;
                        uusi.style.borderTopLeftRadius = 9; uusi.style.borderTopRightRadius = 9;
                        uusi.style.borderBottomLeftRadius = 9; uusi.style.borderBottomRightRadius = 9;
                        laput.Add(uusi);
                    }
                    var lappu = laput[n++];
                    var p = RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(r.x, Screen.height - r.y));
                    lappu.text = tila.Nimi ?? tila.Id;
                    float lw = float.IsNaN(lappu.layout.width) ? 60f : lappu.layout.width;
                    float lh = float.IsNaN(lappu.layout.height) || lappu.layout.height <= 0 ? 22f : lappu.layout.height;
                    sijoitukset.Add((lappu, new Rect(p.x - lw * 0.5f, p.y - 10f, lw, lh)));
                    lappu.style.display = DisplayStyle.Flex;
                }
                // Olavinlinna (1.0.55: viisi tilaa Kellotornin ja pohjoissiiven kohdalla päällekkäin): lähekkäiset laput
                // porrastetaan ylöspäin ruudun y-järjestyksessä, kunnes ne eivät peitä toisiaan (3 pt väli).
                sijoitukset.Sort((a, b) => b.Rect.y.CompareTo(a.Rect.y));
                var varatut = new List<Rect>();
                foreach (var (lappu, rect) in sijoitukset)
                {
                    var r2 = rect;
                    for (int kierros = 0; kierros < 12; kierros++)
                    {
                        bool osuu = false;
                        foreach (var v in varatut)
                            if (r2.xMin < v.xMax + 3f && r2.xMax > v.xMin - 3f && r2.yMin < v.yMax + 3f && r2.yMax > v.yMin - 3f)
                            { r2.y = v.yMin - r2.height - 3f; osuu = true; }
                        if (!osuu) break;
                    }
                    varatut.Add(r2);
                    lappu.style.left = r2.x;
                    lappu.style.top = r2.y;
                }
            }
            for (int k = n; k < laput.Count; k++) laput[k].style.display = DisplayStyle.None;
        }

        static bool TaulunPuoliOikealla(Rakennus rakennus, string kohdeTilaId)
        {
            var tila = kohdeTilaId != null ? rakennus.Tila(kohdeTilaId) : null;
            return tila == null || tila.Taulupuoli != "vasen";
        }
    }
}
