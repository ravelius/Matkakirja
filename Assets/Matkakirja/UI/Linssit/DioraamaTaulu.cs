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

        bool puluPiilotettu;
        readonly Button kuoriNappi;

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

            // Kehittäjätilan kuoren laatutasovalitsin (Olavinlinna, omistajan toive 29.9.: "kehittäjätilaan tasovalitsin"):
            // napautus kiertää auto → huippu → normaali → kevyt; valinta muistetaan laitteeseen (DioraamaUlkokuori).
            kuoriNappi = Rakenne.Nappi(DioraamaUlkokuori.ValintaTeksti(), "mk-dioraama__kuoritaso", DioraamaUlkokuori.SeuraavaPakotus, juuri);
            kuoriNappi.style.position = Position.Absolute;
            kuoriNappi.style.left = 12; kuoriNappi.style.bottom = 24;
            kuoriNappi.style.backgroundColor = new Color(0.1f, 0.08f, 0.06f, 0.6f);
            kuoriNappi.style.color = Color.white;
            kuoriNappi.style.fontSize = 12;
            kuoriNappi.style.paddingLeft = 10; kuoriNappi.style.paddingRight = 10; kuoriNappi.style.paddingTop = 6; kuoriNappi.style.paddingBottom = 6;
            kuoriNappi.style.borderTopLeftRadius = 8; kuoriNappi.style.borderTopRightRadius = 8;
            kuoriNappi.style.borderBottomLeftRadius = 8; kuoriNappi.style.borderBottomRightRadius = 8;
            var kuoriTeksti = kuoriNappi.Q<Label>();
            if (kuoriTeksti != null) { kuoriTeksti.style.color = Color.white; kuoriTeksti.style.fontSize = 12; }
            kuoriNappi.style.display = Asetukset.Kehittaja ? DisplayStyle.Flex : DisplayStyle.None;
            DioraamaUlkokuori.PakotusVaihtui += () =>
            {
                var l = kuoriNappi?.Q<Label>();
                if (l != null) l.text = DioraamaUlkokuori.ValintaTeksti(); else if (kuoriNappi != null) kuoriNappi.text = DioraamaUlkokuori.ValintaTeksti();
            };

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
            if (kuoriNappi != null) kuoriNappi.style.display = Asetukset.Kehittaja ? DisplayStyle.Flex : DisplayStyle.None;
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
            if (juuri.style.display == DisplayStyle.None || lauta.resolvedStyle.display == DisplayStyle.None) return false;
            var paneelipiste = RuntimePanelUtils.ScreenToPanel(lauta.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            return lauta.worldBound.Contains(paneelipiste);
        }

        void Paivita()
        {
            var linssi = DioraamaSovitin.Linssi;
            var rakennus = linssi?.Rakennus;
            var kamera = DioraamaSovitin.AktiivinenKamera;
            var nakymaTaiEi = DioraamaSovitin.ViimeisinNakyma;
            if (linssi == null || rakennus == null || kamera == null || nakymaTaiEi == null)
            {
                lauta.style.display = DisplayStyle.None;
                pulu.style.display = DisplayStyle.None;
                return;
            }
            Nakyma nakyma = nakymaTaiEi.Value;

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
            bool lainausNakyy = !string.IsNullOrEmpty(puhe) && puhe != teksti.text;
            lainaus.style.display = lainausNakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (lainausNakyy) lainaus.text = PuhujanNimi(rakennus, nakyma) + ": ”" + puhe + "”";

            string seuraavaRivi = SeuraavaRivi(rakennus, nakyma, taulu.Kohdat.Count);
            seuraava.text = seuraavaRivi ?? "";
            seuraava.style.display = seuraavaRivi != null ? DisplayStyle.Flex : DisplayStyle.None;
        }

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
            if (nakyma.KohdeTila == null)
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
                    lappu.style.left = p.x - lw * 0.5f;
                    lappu.style.top = p.y - 10f;
                    lappu.style.display = DisplayStyle.Flex;
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
