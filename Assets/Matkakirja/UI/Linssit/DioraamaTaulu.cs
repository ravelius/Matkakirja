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
        /// <summary>Huone, jonka kortin pelaaja on pyytänyt napautuksella (DioraamaSyote); null = ei korttia (omistaja 5.10. 23.0x).</summary>
        public static string KorttiTila;
        /// <summary>Yleisnäkymän nimilaput näkyvissä (napautus tyhjään vaihtaa; omistaja 5.10. 23.0x: vain pelaajan napautuksesta).</summary>
        public static bool LaputNakyvissa;
        /// <summary>Huoneen nimi saapuessa: näkyy NimiS, häivytys NimiHaivytysS (omistaja 5.10. 23.1x).</summary>
        public const float NimiS = 3f, NimiHaivytysS = 0.6f;
        string saapumisTila; float saapumisHetki, nimiAlfa = 1f;
        readonly Label otsikko, teksti, lainaus, lahde, laskuri, seuraava, puhuja;
        readonly LiviaKuva pulu;
        readonly List<Label> laput = new List<Label>();
        readonly List<VisualElement> nastat = new List<VisualElement>(), viivat = new List<VisualElement>();

        bool puluPiilotettu;
        readonly Button kuoriNappi, paluuNappi;
        /// <summary>Omistaja 5.10. (TF 141): "Piilota kuori valinta nappi hampurilaiseen" — kehittäjän kuorivalinta on LinnaValikon
        /// päänäkymässä; ruudun nappi pysyy rakennettuna mutta piilossa.</summary>
        static readonly bool KuoriRuudulla = false;
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
            // Kuunnelman aikana kortin napautus ohittaa rivin (ennen nimipalkin napautus), muuten dioraaman napautus.
            lauta.RegisterCallback<PointerDownEvent>(_ =>
            {
                if (kuunnelma != null && kuunnelma.OhitaRivi()) return;
                DioraamaSovitin.Linssi?.Napauta(DioraamaSovitin.ViimeisinT);
            });

            // Laskuri omalle rivilleen otsikon yläpuolelle: rivissä rinnakkain rivittyvä otsikko mitattiin yhden rivin
            // korkuiseksi ja sen toinen rivi peitti tekstin (savuke 29.9.).
            laskuri = Rakenne.Teksti("", "mk-dioraama__laskuri", lauta);
            Kirjasimet.Aseta(laskuri, Kirjasin.Kone);
            laskuri.style.color = new Color(Teksti.r, Teksti.g, Teksti.b, 0.65f);
            laskuri.style.fontSize = 11;

            // Puhujan nimi KORTTI-pohjan kapiteelina otsikon yläpuolella (omistaja 2.10. 17.4x, loki d6b00328f: nimipalkki pois).
            puhuja = Rakenne.Teksti("", "mk-kortti__kapiteeli mk-dioraama__puhuja", lauta);
            Kirjasimet.Aseta(puhuja, Kirjasin.Kone);
            puhuja.style.display = DisplayStyle.None;

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
            kuunteleNappi.style.borderTopLeftRadius = Tyylikirja.Kulma.Nappi; kuunteleNappi.style.borderTopRightRadius = Tyylikirja.Kulma.Nappi;
            kuunteleNappi.style.borderBottomLeftRadius = Tyylikirja.Kulma.Nappi; kuunteleNappi.style.borderBottomRightRadius = Tyylikirja.Kulma.Nappi;
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
            kuoriNappi.style.display = KuoriRuudulla && Asetukset.Kehittaja && !LinssiOhjain.EsittelylinssitAuki ? DisplayStyle.Flex : DisplayStyle.None;
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

            kuunnelma = new KuunnelmaKaistale();
            // Kohtaukset v2: vuoron puhuja (hahmon id) henkilön nimeksi kuten käsikirjoituksen repliikeissä.
            KuunnelmaKaistale.PuhujanNimi = id =>
            {
                var r = DioraamaSovitin.Linssi?.Rakennus;
                var tilaId = DioraamaSovitin.ViimeisinNakyma?.KohdeTila;
                var tila = r != null && tilaId != null ? r.Tila(tilaId) : null;
                if (tila != null)
                    foreach (var h in tila.Hahmot)
                        if (h.Id == id && h.HenkiloId != null && r.Henkilot != null && r.Henkilot.TryGetValue(h.HenkiloId, out var hk) && !string.IsNullOrEmpty(hk.Nimi))
                            return hk.Nimi;
                return id;
            };
            // PUHUJAKUVA (omistaja 5.10.2026 klo 14.3x): puhujan muotokuva pään yläpuolella; Siirtoseppä kytkee ankkurin ja puhujan.
            puhujakuva = new Puhujakuva(juuri);
            Viimeisin = this;

            // NIMIRUUTU (Päätoimittaja 4.10.): saapumisen latausodotuksen ajan ISS-avausruudun pohja (mk-astroavaus, ei uutta tyyliä):
            // rakennuksen nimi, viiva ja alarivi; häivytetään, kun kevyt kuori on valmis ja linna nousee sumusta.
            nimiruutu = Rakenne.El("mk-astroavaus", kerros.Juuri(LinssiUi.Ylakerros), PickingMode.Ignore);
            nimiruutu.style.display = DisplayStyle.None;
            var nimiOtsikko = Rakenne.El("mk-astroavaus__otsikko", nimiruutu, PickingMode.Ignore);
            Kirjasimet.Aseta(nimiOtsikko, Kirjasin.Kone);
            nimiruudunNimi = Rakenne.Teksti("", "mk-astroavaus__nimi", nimiOtsikko);
            Kirjasimet.Aseta(nimiruudunNimi, Kirjasin.KoneLihava);
            Rakenne.El("mk-astroavaus__viiva", nimiOtsikko, PickingMode.Ignore);
            Rakenne.Teksti(DioraamaSovitin.SaapumisAlarivi, "mk-astroavaus__lahde", nimiOtsikko);
            // LATAUSPALKKI (omistaja 5.10.2026 klo 12.5x) korvaa tekstit "Linna latautuu…" / "Vielä pieni hetki…": EDISTYMINEN-pohjan
            // ohut palkki alarivin alla tumman teeman väreillä. Palkki on alusta asti paikallaan läpinäkyvänä, joten otsikko ei liiku
            // sen ilmestyessä (Päätoimittaja 4.10.). Edistyminen: LatausEdistyminen (Siirtoseppä kytkee linnan latauksen).
            latauspalkki = new Latauspalkki(nimiOtsikko);
            latauspalkki.Juuri.AddToClassList("tk-teema-tumma");

            avainsana = Rakenne.El("mk-astroavaus__otsikko--haipyy", kerros.Juuri(LinssiUi.Ylakerros), PickingMode.Ignore);
            avainsana.style.position = Position.Absolute;
            avainsana.style.left = 28; avainsana.style.bottom = 24;
            avainsana.style.alignItems = Align.FlexStart;
            avainsana.style.opacity = 0f;
            avainsanaVuosi = Rakenne.Teksti("", "mk-aikajana-havainne__otsikko", avainsana);
            Kirjasimet.Aseta(avainsanaVuosi, Kirjasin.Goottilainen);
            avainsanaVuosi.style.fontSize = 44; avainsanaVuosi.style.unityTextAlign = TextAnchor.LowerLeft;
            avainsanaSanat = Rakenne.Teksti("", "mk-aikajana-havainne__kuvateksti", avainsana);
            Kirjasimet.Aseta(avainsanaSanat, Kirjasin.Antiikva);
            avainsanaSanat.style.fontSize = 19; avainsanaSanat.style.unityTextAlign = TextAnchor.UpperLeft;

            DioraamaSovitin.PeittaaRuutu = OsuukoPaneeliin;
            DioraamaSovitin.Vaihtui += Kytke;
            kerros.JokaRuutu += Paivita;
            // Linnan valikko ja pienoiskartta (omistaja 2.10. 14.44): ‹, ↻, säätönappi ja ✕ pois ruudulta.
            Linna = new LinnaValikko(kerros, LinssiUi.RadioKerros);
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
                Linna?.Nayta(kytketty && !peitetty);
            }
        }

        /// <summary>Linnan valikko ja pienoiskartta (LinnaValikko); LinssiUi piilottaa ✕:n, kun linna on auki.</summary>
        public LinnaValikko Linna { get; private set; }
        public bool Kytketty => kytketty;

        void Kytke(PoikkileikkausLinssi uusi)
        {
            kytketty = uusi != null;
            if (kuoriNappi != null) kuoriNappi.style.display = KuoriRuudulla && Asetukset.Kehittaja && !LinssiOhjain.EsittelylinssitAuki ? DisplayStyle.Flex : DisplayStyle.None;
            juuri.style.display = kytketty && !peitetty ? DisplayStyle.Flex : DisplayStyle.None;
            Linna?.Nayta(kytketty && !peitetty);
            UiNakymat.Hae()?.Linssit?.PaivitaSulku();
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
            foreach (var el in new VisualElement[] { paluuNappi, uusintaNappi, puluAlue, kuunteleNappi })
                if (el != null && el.resolvedStyle.display != DisplayStyle.None && el.panel != null
                    && el.worldBound.Contains(RuntimePanelUtils.ScreenToPanel(el.panel, new Vector2(ruutu.x, Screen.height - ruutu.y))))
                    return true;
            // Savuke 1139 (4.10.): linnan valikko (LinnaValikko, mk-linssivalikko) ja muut napit ruudulla eivät välitä
            // napautusta dioraamalle (valikon huonevalinnan irrotus kohdisti edellisen huoneen uudelleen). Valikko on omassa
            // kerroksessaan, joten auki oleva valikko estää koko eleen (myös sulkevan napautuksen valikon ulkopuolelle).
            if (Linna != null && Linna.Auki) return true;
            // Pulun chat on auki: sen sulkija peittää koko ruudun (napautus sulkee chatin), joten mikään ele ei valu linnaan
            // (Natiivisepän löydös juna 142e: chatin kysymysnapin napautus avasi Muurinharjan; chat on eri UI-kerroksessa).
            if (UiNakymat.Olemassa && UiNakymat.Hae().Chat?.Auki == true) return true;
            if (juuri.panel != null)
            {
                for (var el = juuri.panel.Pick(RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(ruutu.x, Screen.height - ruutu.y)));
                     el != null; el = el.parent)
                {
                    if (el is Button) return true;
                    foreach (var luokka in el.GetClasses()) if (luokka.StartsWith("mk-linssivalikko", System.StringComparison.Ordinal)) return true;
                }
            }
            if (juuri.style.display == DisplayStyle.None || lauta.resolvedStyle.display == DisplayStyle.None) return false;
            var paneelipiste = RuntimePanelUtils.ScreenToPanel(lauta.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            return lauta.worldBound.Contains(paneelipiste);
        }

        readonly VisualElement nimiruutu;
        readonly Puhujakuva puhujakuva;
        // AVAINSANAT (Päätoimittaja 5.10., omistajan TF 141 -palaute "muutamia vuosilukuja sekä muita lyhyitä sanoja luennan tueksi"):
        // vasen alakulma ilman laatikkoa, vuosiluku goottilaisella ja 1–3 sanaa antiikvalla (havainteen kultaiset varjostetut tyylit),
        // häivytys sisään kun kertoja sanoo asian (kertojan klipin soittokohta ≥ t_s) ja pois AvainsanaS:n jälkeen.
        readonly VisualElement avainsana;
        readonly Label avainsanaVuosi, avainsanaSanat;
        Avainsana avainsanaNyt;
        internal const float AvainsanaS = 4f; // myös DioraamaTimelinen avainsanaraidan klippien kesto
        readonly Label nimiruudunNimi;
        readonly Latauspalkki latauspalkki;
        bool nimiruutuAuki, virheIlmoitettu;
        float nimiruutuAlku;
        /// <summary>Kortin tiivistys keskustelun ajaksi (KuunnelmaKaistale.Keskustelu) ja vaihdon hetki häivytykseen.</summary>
        bool korttiTiivis;
        float tiivisVaihto = -1f;

        /// <summary>Palkki näkyy vasta, kun odotus on kestänyt tämän verran (nopea lataus ei välähdä palkkia).</summary>
        const float PalkkiS = 1f;

        /// <summary>
        /// Linnan latauksen edistyminen 0–1 (NaN tai null = ei tietoa: palkki ei näy). Siirtoseppä kytkee DioraamaSovittimen
        /// latauksen tähän; Natiivi-UI vain näyttää arvon.
        /// </summary>
        public static System.Func<float> LatausEdistyminen;

        /// <summary>Testi `ui linnapalkki &lt;0–1&gt;|pois`: nimiruutu auki annetulla edistymisellä ilman latausta (stillit).</summary>
        static float? testiEdistyminen;
        internal static string TestiPalkki(string arg)
        {
            arg = (arg ?? "").Trim();
            if (arg == "pois" || arg.Length == 0) { testiEdistyminen = null; return "linnapalkki: pois"; }
            if (!float.TryParse(arg, System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var v))
                return "linnapalkki: anna 0–1 tai pois";
            testiEdistyminen = Mathf.Clamp01(v);
            return "linnapalkki: " + testiEdistyminen.Value.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture)
                + (Viimeisin == null ? " (dioraamataulua ei ole: avaa linssi)" : "");
        }

        void PaivitaNimiruutu()
        {
            // Lataushäiriö: olemassa oleva virheviesti tilarivillä ja linssi kiinni (ei loputonta odotusta).
            if (DioraamaSovitin.LatausVirhe != null && !virheIlmoitettu)
            {
                virheIlmoitettu = true;
                UiNakymat.Hae()?.Tilarivi.Viesti(DioraamaSovitin.LatausVirhe, 5f);
                UiNakymat.Hae()?.Linssit?.SuljeLinssi();
            }
            bool testi = testiEdistyminen.HasValue;
            bool odotus = testi || (DioraamaSovitin.SaapumisOdotus || DioraamaSovitin.RakennusLatautuu) && DioraamaSovitin.LatausVirhe == null;
            string nimi = testi && string.IsNullOrEmpty(DioraamaSovitin.SaapumisNimi) ? "OLAVINLINNA" : DioraamaSovitin.SaapumisNimi;
            if (odotus && nimiruudunNimi.text != nimi) nimiruudunNimi.text = nimi;
            if (odotus && !nimiruutuAuki)
            {
                nimiruutuAuki = true;
                virheIlmoitettu = false;
                nimiruutuAlku = Time.unscaledTime;
                latauspalkki.Nollaa();
                nimiruutu.RemoveFromClassList("mk-astroavaus--haipyy");
                nimiruutu.style.opacity = 1f;
                nimiruutu.style.display = DisplayStyle.Flex;
            }
            if (odotus)
            {
                float kulunut = Time.unscaledTime - nimiruutuAlku;
                float e = testiEdistyminen ?? (LatausEdistyminen != null ? LatausEdistyminen() : float.NaN);
                if (!float.IsNaN(e)) latauspalkki.Arvo = e;
                bool nayta = !float.IsNaN(e) && kulunut >= PalkkiS;
                if (nayta != latauspalkki.Nakyy)
                {
                    latauspalkki.Nayta(nayta);
                    Debug.Log($"MATKAKIRJA linssit: nimiruutu: latauspalkki {(nayta ? "esiin" : "pois")} {e:P0} {kulunut:F1} s");
                }
            }
            else if (!odotus && nimiruutuAuki)
            {
                nimiruutuAuki = false;
                if (latauspalkki.Nakyy) latauspalkki.Arvo = 1f;   // valmis: täyttö loppuun nimiruudun häipyessä
                Debug.Log($"MATKAKIRJA linssit: nimiruutu: häivytys {Time.unscaledTime - nimiruutuAlku:F1} s avauksesta");
                nimiruutu.AddToClassList("mk-astroavaus--haipyy");
                nimiruutu.style.opacity = 0f;
                nimiruutu.schedule.Execute(() => { if (!nimiruutuAuki) nimiruutu.style.display = DisplayStyle.None; }).StartingIn(1200);
            }
        }

        void PaivitaAvainsana(Rakennus rakennus, Nakyma nakyma)
        {
            Avainsana nyt = null;
            if (nakyma.KertojaJakso >= 0 && nakyma.KertojaJakso < rakennus.Kertoja.Count && !(Linna?.Auki ?? false))
            {
                var j = rakennus.Kertoja[nakyma.KertojaJakso];
                if (j.Avainsanat.Count > 0 && DioraamaAanet.PuheenKohta(j.Aani) is float kohta)
                    foreach (var a in j.Avainsanat)
                        if (kohta >= a.Ts && kohta < a.Ts + AvainsanaS) nyt = a;
            }
            if (nyt == avainsanaNyt) return;
            if (nyt != null)
            {
                avainsanaVuosi.text = nyt.Vuosi ?? "";
                avainsanaVuosi.style.display = string.IsNullOrEmpty(nyt.Vuosi) ? DisplayStyle.None : DisplayStyle.Flex;
                avainsanaSanat.text = nyt.Sanat ?? "";
                // Kierrosaika lokiin (linna-unity-suunnitelma 2b: timeline-A/B, avainsanat ±100 ms).
                Debug.Log($"MATKAKIRJA linssit: avainsana {nyt.Vuosi} {nyt.Sanat} ({nyt.Ts:F1} s, kierros +{DioraamaTimeline.S(DioraamaSovitin.ViimeisinT - DioraamaTimeline.KierrosAlku)} s, {(DioraamaTimeline.OhjaaKertojaa ? "timeline" : "ydin")})");
            }
            avainsana.style.opacity = nyt != null ? 1f : 0f;
            avainsanaNyt = nyt;
        }

        void Paivita()
        {
            PaivitaNimiruutu();
            // Natiivisepän itsetarkistus 4.10. (juna 141, vaaka): auki olevan linnan valikon läpi näkyi huonekortti ja Kuuntele
            // piirtyi rivien päälle → kortti, Kuuntele, Pulu ja nimilaput piiloon valikon ajaksi (näkyvyys; asettelu jatkuu).
            var valikonAikana = Linna != null && Linna.Auki ? (StyleEnum<Visibility>)Visibility.Hidden : StyleKeyword.Null;
            lauta.style.visibility = kuunteleNappi.style.visibility = pulu.style.visibility = puluAlue.style.visibility
                = lappuKerros.style.visibility = valikonAikana;
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
            // ‹ ja ↻ korvautuvat pienoiskartalla ja valikolla (omistaja 2.10. 14.44); napit jäävät piiloon.
            if (paluuNappi != null) paluuNappi.style.display = DisplayStyle.None;
            if (linssi == null || rakennus == null || kamera == null || nakymaTaiEi == null || DioraamaSovitin.SaapumisOdotus)
            {
                lauta.style.display = DisplayStyle.None;
                pulu.style.display = DisplayStyle.None;
                puluAlue.style.display = DisplayStyle.None;
                uusintaNappi.style.display = DisplayStyle.None;
                kertojaLaatikko.RemoveFromClassList("mk-nakyy");
                PiilotaLaput();
                PaivitaJaksonNimet(rakennus, kamera, null);
                Linna?.NaytaTauko(false);
                LopetaKuunnelma("ei näkymää");
                return;
            }
            Nakyma nakyma = nakymaTaiEi.Value;
            double tNyt = DioraamaSovitin.ViimeisinT;
            PaivitaJaksonNimet(rakennus, kamera, nakyma);

            // UUSI LINNA: kertojan kierros — vain teksti ja kamera; Pulu, taulu ja laput pois.
            bool kierros = nakyma.KertojaJakso >= 0 || linssi.KertojaKaynnissa(tNyt);
            Linna?.NaytaTauko(kierros);
            // Kehittäjän kuorinappi: ei esittelylinssien reitillä eikä kertojan tai infotaulun aikana (Päätoimittaja 30.9.).
            bool infoAuki = nakyma.KohdeTila != null && rakennus.Tila(nakyma.KohdeTila)?.Infotaulu != null;
            kuoriNappi.style.display = KuoriRuudulla && Asetukset.Kehittaja && !LinssiOhjain.EsittelylinssitAuki && !kierros && !infoAuki
                ? DisplayStyle.Flex : DisplayStyle.None;
            PaivitaAvainsana(rakennus, nakyma);
            if (nakyma.KertojaTeksti != null) kertojaTeksti.text = nakyma.KertojaTeksti;
            // Omistaja 2.10. 14.1x (loki 14.09, kumoaa 30.9.:n tekstilaatikon): kertojan jakso puheen aikana ilman tekstiä;
            // koko teksti vain, jos jaksolla ei ole ääntä tai Kertoja on pois. (Jaksoilla ei ole lyhyttä otsikkoa.)
            string jaksonAani = nakyma.KertojaJakso >= 0 && nakyma.KertojaJakso < rakennus.Kertoja.Count ? rakennus.Kertoja[nakyma.KertojaJakso].Aani : null;
            kertojaLaatikko.EnableInClassList("mk-nakyy", nakyma.KertojaTeksti != null && !DioraamaAanet.Puhutaan(jaksonAani));
            uusintaNappi.style.display = DisplayStyle.None; // valikon "Esittely uudelleen" (omistaja 14.44)
            if (kierros)
            {
                lauta.style.display = DisplayStyle.None;
                pulu.style.display = DisplayStyle.None;
                puluAlue.style.display = DisplayStyle.None;
                PiilotaLaput();
                LopetaKuunnelma("kierros");
                return;
            }
            var infoTila = nakyma.KohdeTila != null ? rakennus.Tila(nakyma.KohdeTila) : null;
            if (infoTila?.Infotaulu != null) { PaivitaInfotaulu(linssi, infoTila, nakyma, tNyt, kamera); return; }
            // Uusi linna, yleisnäkymä (Natiivi-UI:n katselmus 30.9.): Pulu vasempaan alakulmaan, ei linnan päälle; napautus
            // näyttää linnan pulu.teksti-kuplan, jos sellainen on.
            if (nakyma.KohdeTila == null && rakennus.Kertoja != null && rakennus.Kertoja.Count > 0)
            {
                // Tilasta palattaessa kuunnelma loppuu (dccb82a5: keittiön kaistale jäi yleisnäkymään).
                LopetaKuunnelma("yleisnäkymä");
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
                // Nimilaput (omistaja 4.10. 18.4x): aina yleisnäkymässä esittelyn jälkeen; Pulun alue varataan lapuilta.
                PaivitaLaput(rakennus, kamera, nakyma, new Rect(vasen2 + 8, ph2 - ala2 - koko2 - 106, koko2 + 20, koko2 + 20));
                puluKupla = rakennus.PuluTeksti; puluAani = rakennus.PuluAani;
                bool kupla = !string.IsNullOrEmpty(puluKupla);
                puluAlue.style.display = kupla ? DisplayStyle.Flex : DisplayStyle.None;
                if (kupla) { puluAlue.style.left = vasen2 + 12; puluAlue.style.top = ph2 - ala2 - koko2 - 102; puluAlue.style.width = koko2 * 58f / 70f + 12; puluAlue.style.height = koko2 + 12; }
                return;
            }
            LopetaKuunnelma("muu tila");
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
            puhuja.style.display = DisplayStyle.None;
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

        // KESKIAIKAISET LAPUT (omistaja 4.10. 20.4x: "linna vaaka … laput vielä enemmän keskiaikaisen näköisiä … mahdollisimman
        // lähellä selitettävää kohdetta"): tyylit a (pergamentti + sinettivaha), b (tammilauta, kultakirjaimet), c (käsikirjoitus +
        // initiaali) Linnanrakentajan toimituksesta olavinlinna-laput-v1 (Resources/LinnaLaput/<tyyli>/, mitat.json; fontit
        // Resources/Fontit, OFL). Kortti ja nimilaput samalla tyylillä; kortti selitettävän kohteen viereen osoitinviivalla.
        // Omistaja 4.10. 21.1x valitsi tyylin C (käsikirjoituksen sivu): se on uuden linnan (kertojan esittely) lappujen tyyli;
        // vanhat dioraamat pysyvät paperikortissa. Tyylikirjaan linnan teemana Natiivi-UI:n kuittauksella.
        const string LinnanTyyli = "c";
        string LappuTyyli;
        void PaivitaTyyli(Rakennus r) => LappuTyyli = r?.Kertoja != null && r.Kertoja.Count > 0 ? LinnanTyyli : null;
        StyleColor alkuTausta, alkuReuna, alkuMuste, alkuPehmea;
        bool alkuTallessa;
        string kaytossaTyyli = "", lapuissaTyyli = "";
        sealed class KeskiaikaTyyli
        {
            public Texture2D Kortti, Nimilappu, Sinetti, Initiaali;
            public int[] KorttiSlice = { 0, 0, 0, 0 }, LappuSlice = { 0, 0, 0, 0 };
            public float[] KorttiSis = { 18, 16, 18, 16 }, LappuSis = { 9, 3, 9, 3 };
            public Color Otsikko, Teksti, Kapiteeli, LappuTeksti, Viiva, InitiaaliVari;
        }
        readonly Dictionary<string, KeskiaikaTyyli> keskiaikaTyylit = new Dictionary<string, KeskiaikaTyyli>();
        VisualElement korttiViiva, korttiNasta, sinettiEl, initiaaliEl;
        Label initiaaliKirjain;
        bool initiaaliKaytossa;

        // Värit tulevat datasta (mitat.json), eivät koodin vakioista: heksa → Color Vector4-muunnoksella.
        static Color Heksa(string h, Color oletus)
        {
            if (string.IsNullOrEmpty(h) || h[0] != '#' || h.Length < 7) return oletus;
            try
            {
                float Kanava(int i) => System.Convert.ToInt32(h.Substring(i, 2), 16) / 255f;
                return (Color)new Vector4(Kanava(1), Kanava(3), Kanava(5), h.Length >= 9 ? Kanava(7) : 1f);
            }
            catch (System.FormatException) { return oletus; }
        }

        KeskiaikaTyyli KeskiaikaTyyliHae(string t)
        {
            if (keskiaikaTyylit.TryGetValue(t, out var k)) return k;
            k = new KeskiaikaTyyli
            {
                Kortti = Resources.Load<Texture2D>($"LinnaLaput/{t}/kortti"), Nimilappu = Resources.Load<Texture2D>($"LinnaLaput/{t}/nimilappu"),
                Sinetti = Resources.Load<Texture2D>($"LinnaLaput/{t}/sinetti"), Initiaali = Resources.Load<Texture2D>($"LinnaLaput/{t}/initiaali"),
                Otsikko = Teksti, Teksti = Teksti, Kapiteeli = Teksti, LappuTeksti = Teksti, Viiva = Pergamentti, InitiaaliVari = Teksti,
            };
            var mitat = Resources.Load<TextAsset>("LinnaLaput/mitat");
            try
            {
                var juuriJ = mitat != null ? Matkakirja.Peli.MiniJson.Jasenna(mitat.text) as Dictionary<string, object> : null;
                var o = juuriJ != null && juuriJ.TryGetValue(t, out var ov) ? ov as Dictionary<string, object> : null;
                if (juuriJ != null && juuriJ.TryGetValue("fontit", out var fv) && fv is Dictionary<string, object> fd && fd.TryGetValue("otsikko", out var fo) && fo is string fs)
                    Kirjasimet.AsetaLinnanOtsikko("Fontit/" + System.IO.Path.GetFileNameWithoutExtension(fs));
                int[] Luvut(object x, int[] oletus) { if (!(x is List<object> l) || l.Count < 4) return oletus; var r = new int[4]; for (int i = 0; i < 4; i++) r[i] = System.Convert.ToInt32(l[i]); return r; }
                float[] Desim(object x, float[] oletus) { if (!(x is List<object> l) || l.Count < 4) return oletus; var r = new float[4]; for (int i = 0; i < 4; i++) r[i] = System.Convert.ToSingle(l[i]); return r; }
                object K(Dictionary<string, object> d, params string[] polku) { object c = d; foreach (var p in polku) { if (!(c is Dictionary<string, object> dd) || !dd.TryGetValue(p, out c)) return null; } return c; }
                if (o != null)
                {
                    k.KorttiSlice = Luvut(K(o, "kortti", "slice"), k.KorttiSlice); k.LappuSlice = Luvut(K(o, "nimilappu", "slice"), k.LappuSlice);
                    k.KorttiSis = Desim(K(o, "sisennys", "kortti"), k.KorttiSis); k.LappuSis = Desim(K(o, "sisennys", "nimilappu"), k.LappuSis);
                    k.Otsikko = Heksa(K(o, "varit", "otsikko") as string, k.Otsikko); k.Teksti = Heksa(K(o, "varit", "teksti") as string, k.Teksti);
                    k.Kapiteeli = Heksa(K(o, "varit", "kapiteeli") as string, k.Kapiteeli); k.LappuTeksti = Heksa(K(o, "varit", "nimilappu") as string, k.LappuTeksti);
                    k.Viiva = Heksa(K(o, "varit", "viiva") as string, k.Viiva); k.InitiaaliVari = Heksa(K(o, "initiaali", "vari") as string, k.Otsikko);
                }
            }
            catch (System.Exception e) { Debug.LogWarning("MATKAKIRJA linssit: lapputyyli " + t + ": mitat.json: " + e.Message); }
            Debug.Log($"MATKAKIRJA linssit: poikki: lapputyyli {t}: kortti {(k.Kortti != null ? k.Kortti.width + "×" + k.Kortti.height : "puuttuu")}, nimilappu {(k.Nimilappu != null ? "ok" : "puuttuu")}, mitat {(mitat != null ? "ok" : "puuttuu")}");
            keskiaikaTyylit[t] = k;
            return k;
        }

        static void AsetaTausta(VisualElement e, Texture2D tex, int[] slice)
        {
            e.style.backgroundImage = tex != null ? new StyleBackground(tex) : (StyleBackground)StyleKeyword.Null;
            e.style.unitySliceLeft = slice[0]; e.style.unitySliceTop = slice[1]; e.style.unitySliceRight = slice[2]; e.style.unitySliceBottom = slice[3];
            e.style.unitySliceScale = 1f / 3f; // @3x-kuvat pisteinä
            e.style.backgroundColor = StyleKeyword.Null;
            e.style.borderTopWidth = e.style.borderBottomWidth = e.style.borderLeftWidth = e.style.borderRightWidth = 0;
        }

        void AsetaKeskiaikainen()
        {
            // Paperikortin alkuperäiset värit talteen ennen ensimmäistä vaihtoa (ei uusia värivakioita, pohjavahti).
            if (!alkuTallessa)
            {
                alkuTallessa = true; alkuTausta = lauta.style.backgroundColor; alkuReuna = lauta.style.borderTopColor;
                alkuMuste = otsikko.style.color; alkuPehmea = laskuri.style.color;
            }
            if (string.IsNullOrEmpty(LappuTyyli))
            {
                lauta.style.backgroundImage = StyleKeyword.Null;
                lauta.style.backgroundColor = alkuTausta;
                lauta.style.borderTopColor = lauta.style.borderBottomColor = lauta.style.borderLeftColor = lauta.style.borderRightColor = alkuReuna;
                lauta.style.borderTopWidth = lauta.style.borderBottomWidth = lauta.style.borderLeftWidth = lauta.style.borderRightWidth = 8;
                otsikko.style.color = teksti.style.color = lainaus.style.color = kuunteleNappi.style.color = alkuMuste;
                laskuri.style.color = lahde.style.color = seuraava.style.color = alkuPehmea; puhuja.style.color = StyleKeyword.Null;
                Kirjasimet.Aseta(otsikko, Kirjasin.LukuLihava); Kirjasimet.Aseta(teksti, Kirjasin.Luku); Kirjasimet.Aseta(lainaus, Kirjasin.LukuKursiivi);
                Kirjasimet.Aseta(puhuja, Kirjasin.Kone);
                otsikko.style.fontSize = 16; otsikko.style.marginLeft = 0; puhuja.style.marginLeft = 0;
                lauta.style.paddingTop = 12; lauta.style.paddingBottom = 12; lauta.style.paddingLeft = 14; lauta.style.paddingRight = 14;
                if (sinettiEl != null) { sinettiEl.style.display = DisplayStyle.None; initiaaliEl.style.display = DisplayStyle.None; initiaaliKaytossa = false; teksti.style.marginLeft = 0; }
                return;
            }
            var k = KeskiaikaTyyliHae(LappuTyyli);
            AsetaTausta(lauta, k.Kortti, k.KorttiSlice);
            lauta.style.paddingLeft = k.KorttiSis[0]; lauta.style.paddingTop = k.KorttiSis[1]; lauta.style.paddingRight = k.KorttiSis[2]; lauta.style.paddingBottom = k.KorttiSis[3];
            Kirjasimet.Aseta(otsikko, Kirjasin.Goottilainen); Kirjasimet.Aseta(teksti, Kirjasin.Antiikva); Kirjasimet.Aseta(lainaus, Kirjasin.AntiikvaKursiivi);
            Kirjasimet.Aseta(puhuja, Kirjasin.Antiikva);
            otsikko.style.fontSize = 22;
            otsikko.style.color = k.Otsikko; teksti.style.color = lainaus.style.color = kuunteleNappi.style.color = k.Teksti;
            puhuja.style.color = laskuri.style.color = lahde.style.color = seuraava.style.color = k.Kapiteeli;
            if (korttiViiva == null)
            {
                korttiViiva = Rakenne.El("mk-dioraama__lappuviiva", lauta, PickingMode.Ignore);
                korttiViiva.style.position = Position.Absolute; korttiViiva.style.height = 1.5f;
                korttiViiva.style.transformOrigin = new TransformOrigin(Length.Percent(0), Length.Percent(50));
                korttiNasta = Rakenne.El("mk-dioraama__lappunasta", lauta, PickingMode.Ignore);
                korttiNasta.style.position = Position.Absolute; korttiNasta.style.width = 7; korttiNasta.style.height = 7;
                korttiNasta.style.borderTopLeftRadius = korttiNasta.style.borderTopRightRadius = korttiNasta.style.borderBottomLeftRadius = korttiNasta.style.borderBottomRightRadius = 4;
                sinettiEl = Rakenne.El("mk-dioraama__sinetti", lauta, PickingMode.Ignore);
                sinettiEl.style.position = Position.Absolute; sinettiEl.style.width = 32; sinettiEl.style.height = 32; sinettiEl.style.right = -10; sinettiEl.style.bottom = -10;
                initiaaliEl = Rakenne.El("mk-dioraama__initiaali", lauta, PickingMode.Ignore);
                initiaaliEl.style.position = Position.Absolute; initiaaliEl.style.width = 28; initiaaliEl.style.height = 28;
                initiaaliKirjain = Rakenne.Teksti("", "mk-dioraama__initiaalikirjain", initiaaliEl);
                initiaaliKirjain.style.unityTextAlign = TextAnchor.MiddleCenter; initiaaliKirjain.style.fontSize = 22;
                initiaaliKirjain.style.width = Length.Percent(100); initiaaliKirjain.style.height = Length.Percent(100);
                Kirjasimet.Aseta(initiaaliKirjain, Kirjasin.Goottilainen);
            }
            korttiViiva.style.backgroundColor = k.Viiva; korttiNasta.style.backgroundColor = k.Viiva;
            sinettiEl.style.backgroundImage = k.Sinetti != null ? new StyleBackground(k.Sinetti) : (StyleBackground)StyleKeyword.Null;
            sinettiEl.style.display = k.Sinetti != null ? DisplayStyle.Flex : DisplayStyle.None;
            initiaaliEl.style.backgroundImage = k.Initiaali != null ? new StyleBackground(k.Initiaali) : (StyleBackground)StyleKeyword.Null;
            initiaaliKaytossa = k.Initiaali != null;
            initiaaliEl.style.display = initiaaliKaytossa ? DisplayStyle.Flex : DisplayStyle.None;
            initiaaliEl.style.left = k.KorttiSis[0]; initiaaliEl.style.top = k.KorttiSis[1];
            initiaaliKirjain.style.color = k.InitiaaliVari;
            // Initiaali aloittaa leipätekstin kuten käsikirjoituksessa (kuvatarkistus 4.10. 21.4x: otsikosta lohkaistu kirjain
            // luki "appeli"); teksti riippuu initiaalin oikealla puolella, otsikko ja kapiteeli ehjinä.
            teksti.style.marginLeft = k.Initiaali != null ? 34f : 0f;
            otsikko.style.marginLeft = 0; puhuja.style.marginLeft = 0;
        }

        void AsetaNimilappuTyyli(Label lappu, VisualElement nasta, VisualElement viiva)
        {
            if (string.IsNullOrEmpty(LappuTyyli))
            {
                lappu.style.backgroundImage = StyleKeyword.Null; lappu.style.backgroundColor = Pergamentti; lappu.style.color = Teksti;
                Kirjasimet.Aseta(lappu, Kirjasin.Kone); lappu.style.fontSize = 12;
                lappu.style.paddingLeft = 8; lappu.style.paddingRight = 8; lappu.style.paddingTop = 3; lappu.style.paddingBottom = 3;
                nasta.style.backgroundColor = Pergamentti; viiva.style.backgroundColor = Pergamentti;
                return;
            }
            var k = KeskiaikaTyyliHae(LappuTyyli);
            AsetaTausta(lappu, k.Nimilappu, k.LappuSlice);
            lappu.style.color = k.LappuTeksti;
            Kirjasimet.Aseta(lappu, Kirjasin.Goottilainen); lappu.style.fontSize = 15;
            lappu.style.paddingLeft = k.LappuSis[0]; lappu.style.paddingTop = k.LappuSis[1]; lappu.style.paddingRight = k.LappuSis[2]; lappu.style.paddingBottom = k.LappuSis[3];
            nasta.style.backgroundColor = k.Viiva; viiva.style.backgroundColor = k.Viiva;
        }

        /// <summary>Tilan leikkausikkunan rajat paneelin koordinaateissa (leikkauslaatikon kulmat ruudulle), tai null.</summary>
        Rect? LeikkausRuudulla(Camera kamera, Tila tila)
        {
            if (kamera == null || juuri.panel == null) return null;
            var a = tila.LeikkausMin ?? tila.RajaMin; var b = tila.LeikkausMax ?? tila.RajaMax;
            float x0 = float.MaxValue, y0 = float.MaxValue, x1 = float.MinValue, y1 = float.MinValue;
            for (int i = 0; i < 8; i++)
            {
                var v = new Matkakirja.Linssit.Dioraama.V3((i & 1) == 0 ? a.X : b.X, (i & 2) == 0 ? a.Y : b.Y, (i & 4) == 0 ? a.Z : b.Z);
                var r = kamera.WorldToScreenPoint(DioraamaNayttamo.UnityPiste(v));
                if (r.z <= 0f) continue;
                var p = RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(r.x, Screen.height - r.y));
                x0 = Mathf.Min(x0, p.x); y0 = Mathf.Min(y0, p.y); x1 = Mathf.Max(x1, p.x); y1 = Mathf.Max(y1, p.y);
            }
            return x1 > x0 ? Rect.MinMaxRect(x0, y0, x1, y1) : (Rect?)null;
        }

        /// <summary>
        /// UUSI LINNA (omistaja 30.9.2026): huoneen infotaulu ruudun alaosaan (nimi, 1–2 riviä, lähteet) ja aktiivisen
        /// etsintävaiheen rivi korostettuna; Pulu istuu taulun vasemmassa yläkulmassa, napautus näyttää pulu.teksti-kuplan.
        /// Näkyy, kun tilaan on lennetty perille (leikkausikkuna auki).
        /// </summary>
        void PaivitaInfotaulu(PoikkileikkausLinssi linssi, Tila tila, Nakyma nakyma, double t, Camera kamera = null)
        {
            PaivitaTyyli(DioraamaSovitin.Linssi?.Rakennus);
            if ((LappuTyyli ?? "") != kaytossaTyyli) { kaytossaTyyli = LappuTyyli ?? ""; AsetaKeskiaikainen(); }
            PiilotaLaput();
            // 4.10. (iPad v28: huoneesta toiseen siirryttäessä k1 alkoi kahdesti, myös BUILD 137): siirtymän alussa leikkaus on
            // vielä EDELLISEN tilan (osuus ≈ 1) → perillä vain, kun leikkaus on tämän tilan.
            var leikkaus = linssi.LeikkausHetkella(t);
            bool perilla = leikkaus.tila == tila.Id && leikkaus.osuus >= 0.99;
            var info = tila.Infotaulu;
            // OMISTAJA 5.10. 23.0x ("kappeli teksti on turha ja häiritsevä … info kylttejä vain jos pelaaja klikkaa jotain"):
            // huonekortti vain, kun pelaaja on napauttanut tässä huoneessa (KorttiTila, DioraamaSyote); kuunnelma ja Pulu jatkuvat.
            // Tarkennus 23.1x ("kappeli nimi saisi vain olla hetken ja sitten hävitä"): saapuessa nimi (tiivis otsikkorivi) NimiS
            // ja häivytys NimiHaivytysS, sitten pois; täysi kortti vain napautuksesta.
            if (!perilla) saapumisTila = null;
            else if (saapumisTila != tila.Id) { saapumisTila = tila.Id; saapumisHetki = Time.unscaledTime; }
            float nimiIka = Time.unscaledTime - saapumisHetki;
            bool pyydetty = KorttiTila == tila.Id;
            nimiAlfa = pyydetty ? 1f : 1f - Mathf.Clamp01((nimiIka - NimiS) / NimiHaivytysS);
            bool korttiNakyy = perilla && (pyydetty || nimiAlfa > 0f);
            if (perilla && !pyydetty && nimiIka < NimiS + NimiHaivytysS) Matkakirja.Ruudunpaivitys.Herata(0.25f);   // häivytys etenee myös kevyessä tilassa
            lauta.style.display = korttiNakyy ? DisplayStyle.Flex : DisplayStyle.None;
            lauta.style.opacity = perilla ? 1f : 0f;
            lauta.style.translate = new Translate(0, perilla ? 0 : 8);
            if (!perilla) { pulu.style.display = DisplayStyle.None; puluAlue.style.display = DisplayStyle.None; LopetaKuunnelma("ei perillä"); return; }

            float pw = juuri.layout.width, ph = juuri.layout.height;
            if (float.IsNaN(pw) || pw <= 0) { pw = Screen.width; ph = Screen.height; }
            lauta.style.width = Mathf.Max(220f, pw * (ph > pw ? 0.82f : 0.40f));
            float tauluLeveys = float.IsNaN(lauta.layout.width) || lauta.layout.width <= 0 ? 300f : lauta.layout.width;
            float tauluKorkeus = float.IsNaN(lauta.layout.height) || lauta.layout.height <= 0 ? 140f : lauta.layout.height;
            float x = (pw - tauluLeveys) * 0.5f, y = ph - tauluKorkeus - Mathf.Max(24f, ph * 0.05f);
            Vector2? kohdeRuutu = null;
            if (!string.IsNullOrEmpty(LappuTyyli) && kamera != null && juuri.panel != null)
            {
                // Kortti selitettävän kohteen viereen (tilan elävä kohde, muuten leikkauksen keskus), sille puolelle, jossa tilaa.
                var lr = LeikkausRuudulla(kamera, tila);
                Vector2? kp = null;
                if (tila.Elava != null)
                {
                    var r = kamera.WorldToScreenPoint(DioraamaNayttamo.UnityPiste(tila.Elava.Kohde));
                    if (r.z > 0f) kp = RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(r.x, Screen.height - r.y));
                }
                if (!kp.HasValue && lr.HasValue) kp = lr.Value.center;
                if (kp.HasValue)
                {
                    kohdeRuutu = kp;
                    float skK = Screen.width > 0 ? pw / Screen.width : 1f;
                    float vasenT = 12f + Screen.safeArea.xMin * skK, oikeaT = pw - 12f - (Screen.width - Screen.safeArea.xMax) * skK;
                    float ylaT = 70f + (Screen.height - Screen.safeArea.yMax) * skK, alaT = ph - 12f - Screen.safeArea.yMin * skK;
                    // Vaaka (iPhone 874 × 402): leveämpi kortti, jotta kolmen rivin teksti ja lainaus mahtuvat 45 %:n korkeuteen
                    // (kuvatarkistus 4.10. 22.1x: Keittiön lainaus valui alareunan kehyksen yli).
                    lauta.style.width = Mathf.Clamp(pw * (pw > ph ? 0.44f : 0.78f), 220f, 390f);
                    var a = kp.Value;
                    bool oikealle = a.x < pw * 0.5f;
                    x = Mathf.Clamp(oikealle ? a.x + 44f : a.x - 44f - tauluLeveys, vasenT, oikeaT - tauluLeveys);
                    y = Mathf.Clamp(a.y - tauluKorkeus * 0.5f, ylaT, alaT - tauluKorkeus);
                }
            }
            // TIIVIS KORTTI KESKUSTELUN AJAN (omistaja 5.10.2026 Päätoimittajan kautta: kortti ei saa peittää näyttämöä, puhujien
            // vartalot ja eleet näkyviin): KuunnelmaKaistale.Keskustelu (Siirtoseppä; tosi myös vuorojen välitauoilla) → kortista
            // jää otsikkorivi näyttämön yläreunaan keskelle, teksti, lainaus ja osoitinviiva piiloon; täysi kortti palaa keskustelun
            // jälkeen. Vaihto häivyttäen 200 ms (--tk-kesto-sulku).
            bool tiivis = KuunnelmaKaistale.Keskustelu || KorttiTila != tila.Id;   // pyytämättä vain nimi (otsikkorivi)
            if (tiivis != korttiTiivis) { korttiTiivis = tiivis; tiivisVaihto = Time.unscaledTime; }
            if (tiivis)
            {
                float skT = Screen.width > 0 ? pw / Screen.width : 1f;
                lauta.style.width = StyleKeyword.Auto;
                float tl = float.IsNaN(lauta.layout.width) || lauta.layout.width <= 0 ? 160f : lauta.layout.width;
                x = (pw - tl) * 0.5f;
                y = 12f + (Screen.height - Screen.safeArea.yMax) * skT;
                kohdeRuutu = null;
            }
            lauta.style.opacity = Mathf.Clamp01((Time.unscaledTime - tiivisVaihto) / 0.2f) * nimiAlfa;
            if (lauta.style.opacity.value < 1f && nimiAlfa > 0f) Matkakirja.Ruudunpaivitys.Herata(0.25f);
            lauta.style.left = x; lauta.style.top = y;
            if (korttiViiva != null)
            {
                bool viivaNakyy = kohdeRuutu.HasValue;
                korttiViiva.style.display = korttiNasta.style.display = viivaNakyy ? DisplayStyle.Flex : DisplayStyle.None;
                if (viivaNakyy)
                {
                    // Osoitinviiva kortin lähimmästä reunapisteestä kohteeseen (lauta-koordinaateissa).
                    var a = kohdeRuutu.Value - new Vector2(x, y);
                    var reunaP = new Vector2(Mathf.Clamp(a.x, 0f, tauluLeveys), Mathf.Clamp(a.y, 0f, tauluKorkeus));
                    float pit = Vector2.Distance(reunaP, a);
                    korttiViiva.style.left = reunaP.x; korttiViiva.style.top = reunaP.y - 0.75f; korttiViiva.style.width = pit;
                    korttiViiva.style.rotate = new Rotate(new Angle(Mathf.Atan2(a.y - reunaP.y, a.x - reunaP.x) * Mathf.Rad2Deg, AngleUnit.Degree));
                    korttiNasta.style.left = a.x - 3.5f; korttiNasta.style.top = a.y - 3.5f;
                }
            }

            laskuri.text = "";
            otsikko.text = info.Nimi ?? tila.Nimi ?? "";
            bool initiaali = initiaaliEl != null && initiaaliKaytossa && !string.IsNullOrEmpty(LappuTyyli);
            var rivit = new List<string>(); var lahteet = new List<string>();
            foreach (var (rt, rl) in info.Rivit)
            {
                if (!string.IsNullOrEmpty(rt)) rivit.Add(rt);
                if (!string.IsNullOrEmpty(rl) && rl != "TARKISTAMATTA" && !lahteet.Contains(rl)) lahteet.Add(rl);
            }
            teksti.text = string.Join("\n", rivit);
            if (initiaaliEl != null) initiaaliEl.style.display = initiaali && teksti.text.Length > 1 ? DisplayStyle.Flex : DisplayStyle.None;
            if (initiaali && teksti.text.Length > 1)
            {
                initiaaliKirjain.text = teksti.text.Substring(0, 1); teksti.text = teksti.text.Substring(1);
                if (!float.IsNaN(teksti.layout.y)) initiaaliEl.style.top = teksti.layout.y + 1f;
                initiaaliEl.style.left = teksti.layout.x - 34f >= 0f ? teksti.layout.x - 34f : 0f;
            }
            teksti.style.display = rivit.Count > 0 && !tiivis ? DisplayStyle.Flex : DisplayStyle.None;
            if (tiivis && initiaaliEl != null) initiaaliEl.style.display = DisplayStyle.None;
            // Lähderivi pois paikkakortista (omistaja 2.10. 14.44): lähteet valikon Lähteet-näkymässä.
            lahde.text = "";
            lahde.style.display = DisplayStyle.None;
            puluKupla = tila.PuluTeksti; puluAani = tila.PuluAani;
            bool puluNakyy = !string.IsNullOrEmpty(puluKupla);

            // Kuunnelma alkaa, kun tilaan on tultu perille (kierroksen aikana tänne ei tulla).
            bool kuunneltava = tila.Kuunnelma != null && tila.Kuunnelma.Count > 0;
            if (kuunneltava && kuunnelma.TilaId != tila.Id) { Debug.Log($"MATKAKIRJA linssit: poikki: kuunnelma {tila.Id} alkaa (edellinen {kuunnelma.TilaId ?? "-"})"); kuunnelmaTila = tila; kuunnelma.Aloita(tila); }
            else if (!kuunneltava) LopetaKuunnelma("ei kuunneltava");
            kuunnelma.Paivita();

            // Puhuja kortin kapiteelina otsikon yläpuolella ja repliikki samaan korttiin vain, jos sitä ei puhuta ääneen
            // (omistaja 2.10. 17.4x, loki d6b00328f; 14.09: ääneen puhuttu ei tekstinä). Kuunnelman rivi ensin, sitten
            // hahmon repliikki. Pulun vanhat käsikirjoitusrivit eivät kuulu infotauluun (Pulu kertoo lisää kuplassa).
            // Päätoimittaja 5.10. 15.0x: huonekortti on huoneen kortti; puhujan nimi vain tekstinä näytetyn repliikin
            // yhteydessä (ääni tai Kertoja pois). Ääneen puhuttaessa puhujan näyttää puhujakuva, ei kortin kapiteeli.
            string nimi = null, repliikki = null;
            if (kuunnelma.Nimi != null) { if (kuunnelma.Teksti != null) { nimi = kuunnelma.Nimi; repliikki = kuunnelma.Teksti; } }
            else if (!string.IsNullOrEmpty(nakyma.Repliikki) && nakyma.Puhuja != null && nakyma.Puhuja != "pulu"
                     && !DioraamaAanet.Puhutaan(nakyma.AskeleenAani))
            {
                nimi = PuhujanNimi(DioraamaSovitin.Linssi.Rakennus, nakyma).ToUpperInvariant();
                repliikki = nakyma.Repliikki;
            }
            puhuja.text = nimi ?? "";
            puhuja.style.display = string.IsNullOrEmpty(nimi) || tiivis ? DisplayStyle.None : DisplayStyle.Flex;
            // Etsinnän vihje riviksi (korostettuna kursiivilla) repliikin sijaan.
            string vihje = DioraamaEtsinta.AktiivinenRivi;
            string puhe = !string.IsNullOrEmpty(vihje) ? vihje : repliikki != null ? "”" + repliikki + "”" : null;
            lainaus.text = puhe ?? "";
            lainaus.style.display = puhe != null && !tiivis ? DisplayStyle.Flex : DisplayStyle.None;
            seuraava.style.display = DisplayStyle.None;

            bool kuuntele = kuunneltava && !kuunnelma.Kaynnissa;
            kuunteleNappi.style.display = kuuntele ? DisplayStyle.Flex : DisplayStyle.None;
            if (kuuntele)
            {
                float nl = float.IsNaN(kuunteleNappi.layout.width) || kuunteleNappi.layout.width <= 0 ? 110f : kuunteleNappi.layout.width;
                kuunteleNappi.style.left = x + tauluLeveys - nl;
                kuunteleNappi.style.top = y - 8f - 34f;
            }
            puluNakyy &= korttiNakyy;   // Pulun hahmo istuu kortilla: piiloon kortin mukana
            pulu.style.display = puluNakyy ? DisplayStyle.Flex : DisplayStyle.None;
            puluAlue.style.display = puluNakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (!puluNakyy) return;
            const float koko = 64f;
            float puluLeveys = koko * (58f / 70f);
            pulu.MiniKorkeus(koko);
            // Istuu kortin vasemmalla yläkulmalla (omistaja 17.4x): jalat kehyksen 8 pt:n renkaassa, ei tekstin päällä.
            float px = x + 2f, py = y - koko + 6f;
            pulu.style.left = px; pulu.style.top = py;
            puluAlue.style.left = px - 6f; puluAlue.style.top = py - 6f;
            puluAlue.style.width = puluLeveys + 12f; puluAlue.style.height = koko + 12f;
        }

        void LopetaKuunnelma(string syy)
        {
            if (kuunnelma == null) return;
            // 4.10. iPad v28: huoneesta toiseen siirryttäessä k1 alkoi kahdesti → syy lokiin (kuunnelma alkaa alusta seuraavalla Aloita).
            if (kuunnelma.TilaId != null) { Debug.Log($"MATKAKIRJA linssit: poikki: kuunnelma {kuunnelma.TilaId} loppui ({syy})"); kuunnelma.Lopeta(); }
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
        // NIMILAPUT (omistaja 4.10.): 18.4x tuotantoon yleisnäkymään; 19.1x "liian sekava … laput vasta kun kohteet näkyvät
        // selvemmin"; 19.3x "lappuja voi näkyä myös kauempaa mutta ei kaikkia" ja "kannattaakin näkyä ainakin yksi". Laput käydään
        // läpi tärkeysjärjestyksessä (tila.lappujarjestys); ensimmäinen ruudulla oleva näkyy aina, ja kukin muu, jos sen nasta on
        // vähintään Kynnys pt:n päässä jo valittujen nastoista eikä sen nasta jää valitun
        // lapun alle ja lappu mahtuu päällekkäisyyttä ja risteäviä viivoja välttäen. Kukin lappu häivytetään erikseen (0,35 s).
        // 4.10. 21.1x (Päätoimittaja: vaakana perusnäkymässä noin 3): 70 pt, ja saman pohjan kerrokset (Fatabuuri/Kierreportaat)
        // ovat yksi paikka — alempi tärkeysjärjestyksessä tulee esiin vasta zoomattaessa.
        public static float Kynnys = 70f;
        const float LappuHaivytysS = 0.35f;
        /// <summary>"poikki laput": viimeisin valinta (näkyvät laput järjestyksessä ja piilotettujen syyt).</summary>
        public static string LappuMittaus { get; private set; } = "ei mitattu";
        sealed class LappuTila { public Label Lappu; public VisualElement Nasta, Viiva; public float Alfa; public Rect Paikka; public Vector2 Ankkuri, Kohta; public bool Sijoitettu; }
        readonly Dictionary<string, LappuTila> lappuTilat = new Dictionary<string, LappuTila>();
        string edellinenValinta = "";

        LappuTila Lappu(Tila tila)
        {
            if (lappuTilat.TryGetValue(tila.Id, out var lt)) return lt;
            lt = LuoLappu(tila.Nimi ?? tila.Id);
            laput.Add(lt.Lappu); nastat.Add(lt.Nasta); viivat.Add(lt.Viiva);
            lappuTilat[tila.Id] = lt;
            return lt;
        }

        /// <summary>Nimilappu (lappu, nasta, viiva) linnan lapputyylillä, piilossa; kutsuja sijoittaa.</summary>
        LappuTila LuoLappu(string teksti)
        {
            var uusi = Rakenne.Teksti("", "mk-dioraama__lappu", lappuKerros);
            uusi.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(uusi, Kirjasin.Kone);
            uusi.style.position = Position.Absolute;
            uusi.style.fontSize = 12;
            uusi.style.color = Teksti;
            uusi.style.backgroundColor = Pergamentti;
            uusi.style.paddingLeft = 8; uusi.style.paddingRight = 8; uusi.style.paddingTop = 3; uusi.style.paddingBottom = 3;
            uusi.style.borderTopLeftRadius = Tyylikirja.Kulma.Pieni; uusi.style.borderTopRightRadius = Tyylikirja.Kulma.Pieni;
            uusi.style.borderBottomLeftRadius = Tyylikirja.Kulma.Pieni; uusi.style.borderBottomRightRadius = Tyylikirja.Kulma.Pieni;
            uusi.text = teksti;
            var viiva = Rakenne.El("mk-dioraama__lappuviiva", lappuKerros, PickingMode.Ignore);
            viiva.style.position = Position.Absolute; viiva.style.height = 1.5f; viiva.style.backgroundColor = Pergamentti;
            viiva.style.transformOrigin = new TransformOrigin(Length.Percent(0), Length.Percent(50));
            var nasta = Rakenne.El("mk-dioraama__lappunasta", lappuKerros, PickingMode.Ignore);
            nasta.style.position = Position.Absolute; nasta.style.width = 7; nasta.style.height = 7;
            nasta.style.backgroundColor = Pergamentti;
            nasta.style.borderTopLeftRadius = 4; nasta.style.borderTopRightRadius = 4; nasta.style.borderBottomLeftRadius = 4; nasta.style.borderBottomRightRadius = 4;
            nasta.style.borderTopWidth = 1; nasta.style.borderBottomWidth = 1; nasta.style.borderLeftWidth = 1; nasta.style.borderRightWidth = 1;
            nasta.style.borderTopColor = Teksti; nasta.style.borderBottomColor = Teksti; nasta.style.borderLeftColor = Teksti; nasta.style.borderRightColor = Teksti;
            foreach (var el in new VisualElement[] { uusi, nasta, viiva }) { el.style.display = DisplayStyle.None; el.style.opacity = 0f; }
            var lt = new LappuTila { Lappu = uusi, Nasta = nasta, Viiva = viiva };
            AsetaNimilappuTyyli(uusi, nasta, viiva);
            return lt;
        }

        // --- KERTOJAN JAKSON NIMET (Linnanrakentaja 6.10.2026, tornit-jakso) -------------------------------------------------
        // jakso.nimet[]: nimi nimilappupohjalla (sama lappu ja nasta kuin huoneiden nimilapuissa), nasta paikan projektiossa ja lappu
        // sen yläpuolella keskitettynä. Näkyy kertojan klipin kohdassa alku_s … alku_s + kesto_s (oletus 3 s, Nimikyltti.NakyyMs),
        // häivytys kuten lapuissa. Ilman soivaa kertojaa (äänetön tai Kertoja pois) nimiä ei näytetä.
        readonly Dictionary<JaksonNimi, LappuTila> jaksonNimet = new Dictionary<JaksonNimi, LappuTila>();

        void PaivitaJaksonNimet(Rakennus rakennus, Camera kamera, Nakyma? nakyma)
        {
            KertojaJakso jakso = null;
            float? kohta = null;
            if (rakennus?.Kertoja != null && kamera != null && nakyma is Nakyma n && n.KertojaJakso >= 0 && n.KertojaJakso < rakennus.Kertoja.Count)
            {
                jakso = rakennus.Kertoja[n.KertojaJakso];
                if (jakso.Nimet.Count > 0) kohta = DioraamaAanet.PuheenKohta(jakso.Aani);
            }
            if (jakso != null && kohta.HasValue)
                foreach (var nimi in jakso.Nimet)
                    if (!jaksonNimet.ContainsKey(nimi)) jaksonNimet[nimi] = LuoLappu(nimi.Teksti);
            if (jaksonNimet.Count == 0) return;
            foreach (var kv in jaksonNimet)
            {
                var nimi = kv.Key; var lt = kv.Value;
                bool aktiivinen = jakso != null && kohta.HasValue && jakso.Nimet.Contains(nimi) && kohta >= nimi.Alku && kohta < nimi.Alku + nimi.Kesto;
                Vector3 r = aktiivinen ? kamera.WorldToScreenPoint(DioraamaNayttamo.UnityPiste(nimi.Paikka)) : default;
                bool ruudulla = aktiivinen && r.z > 0f;
                lt.Alfa = Mathf.MoveTowards(lt.Alfa, ruudulla ? 1f : 0f, Time.unscaledDeltaTime / LappuHaivytysS);
                if (ruudulla)
                {
                    var p = RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(r.x, Screen.height - r.y));
                    float w = float.IsNaN(lt.Lappu.layout.width) || lt.Lappu.layout.width <= 0 ? 60f : lt.Lappu.layout.width;
                    float h = float.IsNaN(lt.Lappu.layout.height) || lt.Lappu.layout.height <= 0 ? 22f : lt.Lappu.layout.height;
                    lt.Ankkuri = p; lt.Paikka = new Rect(p.x - w * 0.5f, p.y - h - 10f, w, h);
                }
                bool nakyy = lt.Alfa > 0.001f;
                lt.Lappu.style.display = lt.Nasta.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
                lt.Viiva.style.display = DisplayStyle.None;
                if (!nakyy) continue;
                lt.Lappu.style.opacity = lt.Nasta.style.opacity = lt.Alfa;
                lt.Lappu.style.left = lt.Paikka.x; lt.Lappu.style.top = lt.Paikka.y;
                lt.Nasta.style.left = lt.Ankkuri.x - 3.5f; lt.Nasta.style.top = lt.Ankkuri.y - 3.5f;
                lt.Lappu.BringToFront();
            }
            lappuKerros.style.display = DisplayStyle.Flex;
        }

        static bool SamaPohja(Tila a, Tila b) =>
            System.Math.Min(a.RajaMax.X, b.RajaMax.X) > System.Math.Max(a.RajaMin.X, b.RajaMin.X)
            && System.Math.Min(a.RajaMax.Z, b.RajaMax.Z) > System.Math.Max(a.RajaMin.Z, b.RajaMin.Z);

        int Jarjestys(Rakennus rakennus, Tila t)
        {
            return t.LappuJarjestys ?? 1000 + rakennus.Tilat.IndexOf(t);
        }

        void PaivitaLaput(Rakennus rakennus, Camera kamera, Nakyma nakyma, Rect? estetty = null)
        {
            // Uusi linna (kertojan esittely): laput yleisnäkymässä (omistaja 4.10.); vanhat dioraamat datan nimilaput-kentän mukaan.
            bool uusiLinna = rakennus.Kertoja != null && rakennus.Kertoja.Count > 0;
            if (uusiLinna && !LaputNakyvissa) { PiilotaLaput(); return; }   // omistaja 5.10. 23.0x: nimilaput vain napautuksesta
            var ehdokkaat = new List<(Tila Tila, Vector2 Nasta)>();
            float pw = juuri.layout.width, ph = juuri.layout.height;
            if (float.IsNaN(pw) || pw <= 0) { pw = Screen.width; ph = Screen.height; }
            if (nakyma.KohdeTila == null && (rakennus.Nimilaput || uusiLinna))
                foreach (var tila in rakennus.Tilat)
                {
                    if (!tila.Kohdistettava) continue;
                    var keski = new Matkakirja.Linssit.Dioraama.V3((tila.RajaMin.X + tila.RajaMax.X) / 2, (tila.RajaMin.Y + tila.RajaMax.Y) / 2, (tila.RajaMin.Z + tila.RajaMax.Z) / 2);
                    Vector3 r = kamera.WorldToScreenPoint(DioraamaNayttamo.UnityPiste(keski));
                    // Ruudun tai turva-alueen ulkopuolella oleva tila ei saa lappua eikä nastaa (lähempi kamera rajaa osan linnasta
                    // pois; vaakana Dynamic Island on vasemmassa tai oikeassa reunassa, Päätoimittaja 4.10.).
                    if (r.z <= 0f || !Screen.safeArea.Contains(new Vector2(r.x, r.y))) continue;
                    ehdokkaat.Add((tila, RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(r.x, Screen.height - r.y))));
                }
            PaivitaTyyli(rakennus);
            ehdokkaat.Sort((a, b) => Jarjestys(rakennus, a.Tila).CompareTo(Jarjestys(rakennus, b.Tila)));
            if ((LappuTyyli ?? "") != lapuissaTyyli) { lapuissaTyyli = LappuTyyli ?? ""; foreach (var lt0 in lappuTilat.Values) AsetaNimilappuTyyli(lt0.Lappu, lt0.Nasta, lt0.Viiva); }

            // Sijoitusalue: turva-alueen sisällä, Pulu ja yläkulmien pienoiskartta ja valikko vapaina.
            const float reuna = 10f, vali = 3f;
            float sk = Screen.width > 0 ? pw / Screen.width : 1f, ylaTurva = (Screen.height - Screen.safeArea.yMax) * sk;
            float xMin = reuna + Screen.safeArea.xMin * sk, xMax = pw - reuna - (Screen.width - Screen.safeArea.xMax) * sk;
            float yMin = reuna + 60f + ylaTurva, yMax = ph - reuna - Screen.safeArea.yMin * sk;
            var esteet = new List<Rect>();
            if (estetty.HasValue) esteet.Add(estetty.Value);
            esteet.Add(new Rect(0, 0, Screen.safeArea.xMin * sk + 90f, ylaTurva + 140f));
            esteet.Add(new Rect(pw - (Screen.width - Screen.safeArea.xMax) * sk - 90f, 0, 90f + (Screen.width - Screen.safeArea.xMax) * sk, ylaTurva + 140f));
            // Laput säteittäin nastaryhmän keskeltä ulospäin (kuvatarkistus 4.10.).
            var keskus = Vector2.zero;
            foreach (var e in ehdokkaat) keskus += e.Nasta;
            if (ehdokkaat.Count > 0) keskus /= ehdokkaat.Count;

            var valitut = new List<(Tila Tila, Vector2 Nasta, Rect Lappu)>();
            var janat = new List<(Vector2 A, Vector2 B)>();
            var syyt = new List<string>();
            var nakyvat = new HashSet<string>();
            foreach (var (tila, nasta) in ehdokkaat)
            {
                var lt = Lappu(tila);
                bool ensimmainen = valitut.Count == 0;
                string syy = null;
                if (!ensimmainen)
                    foreach (var v in valitut)
                    {
                        if (Vector2.Distance(v.Nasta, nasta) < Kynnys) { syy = $"{tila.Id}: {Vector2.Distance(v.Nasta, nasta):F0} pt {v.Tila.Id}"; break; }
                        if (v.Lappu.Contains(nasta)) { syy = $"{tila.Id}: nasta {v.Tila.Id}-lapun alla"; break; }
                    }
                if (syy == null)
                {
                    float w = float.IsNaN(lt.Lappu.layout.width) || lt.Lappu.layout.width <= 0 ? 60f : lt.Lappu.layout.width;
                    float h = float.IsNaN(lt.Lappu.layout.height) || lt.Lappu.layout.height <= 0 ? 22f : lt.Lappu.layout.height;
                    var varatut = new List<Rect>(esteet);
                    foreach (var v in valitut) { varatut.Add(v.Lappu); varatut.Add(new Rect(v.Nasta.x - 4f, v.Nasta.y - 4f, 8f, 8f)); }
                    varatut.Add(new Rect(nasta.x - 4f, nasta.y - 4f, 8f, 8f));
                    var ulos = nasta - keskus;
                    ulos = ulos.sqrMagnitude < 1f ? Vector2.down : ulos.normalized;
                    Rect paras = default; bool loytyi = false;
                    for (int etaisyys = 1; etaisyys <= 4 && !loytyi; etaisyys++)
                    {
                        float dy = (h * 0.5f + 8f) * etaisyys, dx = (w * 0.5f + 10f) * etaisyys;
                        var suunnat = new List<Vector2> { new Vector2(0, -dy), new Vector2(0, dy), new Vector2(dx, 0), new Vector2(-dx, 0),
                            new Vector2(dx, -dy), new Vector2(-dx, -dy), new Vector2(dx, dy), new Vector2(-dx, dy) };
                        suunnat.Sort((e1, e2) => Vector2.Dot(e2.normalized, ulos).CompareTo(Vector2.Dot(e1.normalized, ulos)));
                        foreach (var e in suunnat)
                        {
                            var c = nasta + e;
                            var r2 = new Rect(c.x - w * 0.5f, c.y - h * 0.5f, w, h);
                            r2.x = Mathf.Clamp(r2.x, xMin, xMax - w); r2.y = Mathf.Clamp(r2.y, yMin, yMax - h);
                            bool osuu = false;
                            foreach (var v in varatut)
                                if (r2.xMin < v.xMax + vali && r2.xMax > v.xMin - vali && r2.yMin < v.yMax + vali && r2.yMax > v.yMin - vali) { osuu = true; break; }
                            var k2 = new Vector2(Mathf.Clamp(nasta.x, r2.xMin, r2.xMax), Mathf.Clamp(nasta.y, r2.yMin, r2.yMax));
                            if (!osuu) foreach (var (ja, jb) in janat) if (Risteaa(nasta, k2, ja, jb) || JanaOsuu(ja, jb, r2)) { osuu = true; break; }
                            if (!osuu) foreach (var v in valitut) if (JanaOsuu(nasta, k2, v.Lappu)) { osuu = true; break; }
                            if (!osuu) { paras = r2; loytyi = true; break; }
                        }
                    }
                    if (!loytyi && ensimmainen)
                    { paras = new Rect(Mathf.Clamp(nasta.x - w * 0.5f, xMin, xMax - w), Mathf.Clamp(nasta.y - h - 8f, yMin, yMax - h), w, h); loytyi = true; }
                    if (!loytyi) syy = $"{tila.Id}: ei tilaa";
                    else
                    {
                        var kohta = new Vector2(Mathf.Clamp(nasta.x, paras.xMin, paras.xMax), Mathf.Clamp(nasta.y, paras.yMin, paras.yMax));
                        valitut.Add((tila, nasta, paras));
                        janat.Add((nasta, kohta));
                        lt.Paikka = paras; lt.Ankkuri = nasta; lt.Kohta = kohta; lt.Sijoitettu = true;
                        nakyvat.Add(tila.Id);
                    }
                }
                if (syy != null) syyt.Add(syy);
            }

            // Häivytys lappukohtaisesti; piiloon menevä lappu häipyy viimeisessä paikassaan, ruudulta poistunut heti.
            var ruudulla = new HashSet<string>();
            foreach (var e in ehdokkaat) ruudulla.Add(e.Tila.Id);
            foreach (var kv in lappuTilat)
            {
                var lt = kv.Value;
                float tavoite = nakyvat.Contains(kv.Key) ? 1f : 0f;
                lt.Alfa = ruudulla.Contains(kv.Key) ? Mathf.MoveTowards(lt.Alfa, tavoite, Time.unscaledDeltaTime / LappuHaivytysS) : 0f;
                bool nakyy = lt.Alfa > 0.001f && lt.Sijoitettu;
                lt.Lappu.style.display = lt.Nasta.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
                float pituus = Vector2.Distance(lt.Ankkuri, lt.Kohta);
                lt.Viiva.style.display = nakyy && pituus > 4f ? DisplayStyle.Flex : DisplayStyle.None;
                if (!nakyy) { if (lt.Alfa <= 0.001f) lt.Sijoitettu = nakyvat.Contains(kv.Key); continue; }
                lt.Lappu.style.opacity = lt.Nasta.style.opacity = lt.Viiva.style.opacity = lt.Alfa;
                lt.Lappu.style.left = lt.Paikka.x; lt.Lappu.style.top = lt.Paikka.y;
                lt.Nasta.style.left = lt.Ankkuri.x - 3.5f; lt.Nasta.style.top = lt.Ankkuri.y - 3.5f;
                lt.Viiva.style.left = lt.Ankkuri.x; lt.Viiva.style.top = lt.Ankkuri.y - 0.75f; lt.Viiva.style.width = pituus;
                lt.Viiva.style.rotate = new Rotate(new Angle(Mathf.Atan2(lt.Kohta.y - lt.Ankkuri.y, lt.Kohta.x - lt.Ankkuri.x) * Mathf.Rad2Deg, AngleUnit.Degree));
                lt.Lappu.BringToFront();
            }
            lappuKerros.style.opacity = 1f;
            lappuKerros.style.display = DisplayStyle.Flex;
            string valinta = string.Join(",", System.Linq.Enumerable.Select(valitut, v => v.Tila.Id));
            if (valinta != edellinenValinta && ehdokkaat.Count > 0)
            {
                edellinenValinta = valinta;
                Debug.Log($"MATKAKIRJA linssit: poikki: nimilaput {valitut.Count}/{ehdokkaat.Count}: {valinta}");
            }
            LappuMittaus = $"näkyvät {valitut.Count}/{ehdokkaat.Count} [{valinta}], piilossa: {(syyt.Count > 0 ? string.Join("; ", syyt) : "-")}, kynnys {Kynnys:F0} pt";
        }

        /// <summary>Kulkeeko jana suorakulmion läpi (päätepiste sisällä tai leikkaa reunan).</summary>
        static bool JanaOsuu(Vector2 a, Vector2 b, Rect r)
        {
            if (r.Contains(a) || r.Contains(b)) return true;
            var p1 = new Vector2(r.xMin, r.yMin); var p2 = new Vector2(r.xMax, r.yMin); var p3 = new Vector2(r.xMax, r.yMax); var p4 = new Vector2(r.xMin, r.yMax);
            return Risteaa(a, b, p1, p2) || Risteaa(a, b, p2, p3) || Risteaa(a, b, p3, p4) || Risteaa(a, b, p4, p1);
        }

        static bool Risteaa(Vector2 a, Vector2 b, Vector2 c, Vector2 d)
        {
            float Ristitulo(Vector2 o, Vector2 p, Vector2 q) => (p.x - o.x) * (q.y - o.y) - (p.y - o.y) * (q.x - o.x);
            float d1 = Ristitulo(c, d, a), d2 = Ristitulo(c, d, b), d3 = Ristitulo(a, b, c), d4 = Ristitulo(a, b, d);
            return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
        }

        void PiilotaLaput()
        {
            for (int k = 0; k < laput.Count; k++) laput[k].style.display = DisplayStyle.None;
            for (int k = 0; k < nastat.Count; k++) { nastat[k].style.display = DisplayStyle.None; viivat[k].style.display = DisplayStyle.None; }
        }

        static bool TaulunPuoliOikealla(Rakennus rakennus, string kohdeTilaId)
        {
            var tila = kohdeTilaId != null ? rakennus.Tila(kohdeTilaId) : null;
            return tila == null || tila.Taulupuoli != "vasen";
        }
    }
}
