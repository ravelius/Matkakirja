// ELÄVÄN OPPAAN VALIKKO (Natiivi-UI 5.10.2026; omistaja 18.0x Päätoimittajan kautta): LinnaValikon pohja (OHJAUSNAPPI ☰ oikeaan
// yläkulmaan, LINSSIN VALIKKO -lista .mk-linssivalikko--pohja alanäkymineen), ei uusia tyylejä.
//
//   Pää      Vaihda kohde › · Näytä teksti · ─ · Poistu linssistä
//   Maanosat ‹ Vaihda kohde · Eurooppa › · Aasia › …
//   Maat     ‹ <maanosa> · maat aakkosjärjestyksessä (vierittyy)
//   Kaupungit ‹ <maa> · maan suurimmat kaupungit väkiluvun mukaan (enintään Kaupunkeja)
//
// Kaupungit: Natural Earthin asutuspaikat (sama aineisto kuin ISS-LCD:ssä) Kaupungit-koukusta (Linssiseppä/LS2 kytkee); valinta
// kutsuu KohdeValittu(nimi, lat, lon), jonka elävä opas (OpasSovitin) kytkee. Poistu sulkee linssin (LinssiUi.SuljeLinssi).
//
// OPAS KEVYEKSI (omistaja 5.10.2026 Päätoimittajan kautta: "raskaan oloinen"): kaupunki koko ruudulla, chat ei auki eikä ✕:ää
// (LinssiUi.PaivitaSulku), Pulun hahmo piilossa (UiNakymat.OpasPeittaaPulun). Kertojan lopetettua kappaleen tai kysyessä
// alareunan keskellä kaksi vaihtoehtoa PULU-pohjan siruina (irrallinen sirurivi, omistaja hyväksyi 19.0x) ja pieni
// puhu/kirjoita-siru, joka avaa nykyisen Pulu-chatin syöttöineen ja käynnistää sanelun; Näytä teksti avaa koko keskustelun samaan chattiin.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class OpasValikko
    {
        /// <summary>Asutuspaikka: nimi, maa (näkyvä nimi), maanosa (näkyvä nimi), sijainti ja väkiluku.</summary>
        public readonly struct Kaupunki
        {
            /// <summary>Iso = ISO 3166-1 alpha-2 (maa-aineistosta), puuttuessa paikat.json:n ADM0_A3.</summary>
            public readonly string Nimi, Maa, Maanosa, Iso;
            public readonly double Lat, Lon;
            public readonly long Vakiluku;
            public Kaupunki(string nimi, string maa, string maanosa, double lat, double lon, long vakiluku, string iso = null)
            { Nimi = nimi; Maa = maa; Maanosa = maanosa; Lat = lat; Lon = lon; Vakiluku = vakiluku; Iso = iso; }
        }

        /// <summary>Kaupunkiaineisto; oletuksena Resources/IssPaikat/paikat.json (LS2:n ISS-LCD:n Natural Earth -asutuspaikat).</summary>
        public static Func<IReadOnlyList<Kaupunki>> Kaupungit = Lue;

        static List<Kaupunki> luettu;
        static readonly Dictionary<string, string> Maanosat = new Dictionary<string, string>
        {
            ["Europe"] = "Eurooppa", ["Asia"] = "Aasia", ["Africa"] = "Afrikka", ["North America"] = "Pohjois-Amerikka",
            ["South America"] = "Etelä-Amerikka", ["Oceania"] = "Oseania", ["Antarctica"] = "Etelämanner", ["Seven seas (open ocean)"] = "Valtameret",
        };

        /// <summary>
        /// paikat.json: {"maanimet":{ISO3: nimi}, "paikat":[[nimi, lat, lon, ADM0_A3, POP_MAX, CONTINENT?], …]}. Maan nimi pelin
        /// maa-aineistosta (ISO3), sen puuttuessa "maanimet"-taulusta, muuten koodi; maanosa 6. sarakkeesta suomeksi, ilman sitä "Kaikki maat" (yksi ryhmä).
        /// </summary>
        static IReadOnlyList<Kaupunki> Lue()
        {
            if (luettu != null) return luettu;
            var t = Resources.Load<TextAsset>("IssPaikat/paikat");
            if (t == null) return null;
            var tulos = new List<Kaupunki>();
            try
            {
                var j = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(t.text));
                // Pienet maat ja alueet, joilla maa-aineistossa ei ole suomenkielistä nimeä (Päätoimittaja 6.10.: ALD, AND, FRO…).
                var varanimet = MiniJson.ObjektiTaiNull(MiniJson.Kentta(j, "maanimet"));
                if (MiniJson.Kentta(j, "paikat") is List<object> rivit)
                    foreach (var r in rivit)
                    {
                        if (!(r is List<object> c) || c.Count < 5) continue;
                        string iso = c[3] as string;
                        var maaTieto = LinssiOhjain.MaatAineisto?.Hae(iso);
                        string maa = maaTieto?.Nimi ?? iso;
                        if (maa == iso && varanimet != null && MiniJson.Teksti(varanimet, iso) is string fiNimi) maa = fiNimi;
                        // Oppaan äänet (Pelikoodarin nimet/maat-v1) käyttävät ISO 3166-1 alpha-2 -koodia (DK, IL, PS).
                        string iso2 = string.IsNullOrEmpty(maaTieto?.Iso2) ? iso : maaTieto.Iso2;
                        string mo = c.Count > 5 && c[5] is string m ? (Maanosat.TryGetValue(m, out var fi) ? fi : m) : "Kaikki maat";
                        tulos.Add(new Kaupunki(c[0] as string, maa, mo, Convert.ToDouble(c[1]), Convert.ToDouble(c[2]), Convert.ToInt64(c[4]), iso2));
                    }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA opas: paikat.json: " + e.Message); return null; }
            Debug.Log($"MATKAKIRJA opas: {tulos.Count} kaupunkia (IssPaikat/paikat)");
            // Maa-aineisto voi latautua myöhemmin: välimuistiin vasta, kun nimet ovat tulleet.
            if (LinssiOhjain.MaatAineisto != null) luettu = tulos;
            return tulos;
        }
        /// <summary>Valittu kohde (nimi, lat, lon): elävä opas siirtyy sinne.</summary>
        public static Action<string, double, double> KohdeValittu;
        /// <summary>Viimeksi luotu (testikomento ja KierrosTaulun näyttö).</summary>
        public static OpasValikko Viimeisin { get; private set; }

        /// <summary>Ainoa valikko (luodaan ensimmäisellä kutsulla linssin kerrokseen kuten LinnaValikko); oppaan kytkentä:
        /// <c>OpasValikko.Hae().Nayta(true|false)</c>.</summary>
        public static OpasValikko Hae() => Viimeisin ?? new OpasValikko(UiKerros.Hae(), LinssiUi.RadioKerros);

        const int Kaupunkeja = 12;

        VisualElement napit;
        Button mikkiNappi;
        bool nappiNakyy;
        enum Nakyma { Paa, Takyt, Maanosat, Maat, Kaupungit, Kysy, Liiku, Mika, Aika }

        /// <summary>Oppaan linssi auki (✕ pois, LinssiUi.PaivitaSulku).</summary>
        public static bool Nakyy => Viimeisin != null && Viimeisin.nakyy;

        public readonly VisualElement Juuri;
        readonly VisualElement ryhma, valikko, sirurivi;
        readonly Button puhuSiru, kuvaNappi, taukoNappi;
        bool taukoNakyy;
        // OPPAAN KUVAT (omistaja 5.10.2026 klo 19.3x): pieni kuvakortti NOSTOKORTTI-pohjan kuvakehyksellä pysähdyksen ajan,
        // napautus → nostojen kuvasuurennos tekijä- ja lisenssirivein; havainnekuva aina merkitty HAVAINNEKUVA. Kytkin oikeassa
        // yläkulmassa OHJAUSNAPPI-pohjalla (julistekuvake, pois-tilassa vino viiva), oletus päällä, valinta muistetaan.
        const string KuvatAvain = "matkakirja-opas-kuvat";
        const string KuvaPoisIkoni = Ikonit.PilleriJulisteet + "<path d=\"M3.2 3.6 20.8 20.4\"/>";
        const float KuvaLeveys = 132f, KuvaRako = 8f;
        readonly VisualElement kuvaKortti, kuvaKehys, kuvaEl, kuvaMerkki;
        readonly Label kuvaLaskuri;
        Kuvasuurennos suurennos;
        OpasKuva naytettyKuva;
        bool kuvaNakyy;
        int kuvaVersio;
        static bool KuvatPaalla { get => PlayerPrefs.GetInt(KuvatAvain, 1) == 1; set { PlayerPrefs.SetInt(KuvatAvain, value ? 1 : 0); PlayerPrefs.Save(); } }
        /// <summary>Testikomento: kuva nykyiselle pysähdykselle ilman workerin kuvia.</summary>
        OpasKuva testiKuva;
        bool nakyy, siruNakyy;
        OpasKohde odotettuKysymys;
        float krediittiAla = 40f;
        /// <summary>Oppaan nappirivin korkeus (mk-opas-nappi 44 pt).</summary>
        const float NappiriviKorkeus = 44f;
        float TapitAla => nappiNakyy ? krediittiAla + NappiriviKorkeus + KuvaRako : krediittiAla;
        readonly OpasTapit tapit;
        readonly OpasNimilappu nimilappu;
        int siruPoletti = -1;
        readonly Button nappi;
        Nakyma nakyma;
        string maanosa, maa;
        ScrollView rivit;
        public bool Auki { get; private set; }

        // ALOITUS ILMAN KARTTAA (omistaja 6.10. 13.4x, Päätoimittaja; Linssiseppä lataa vasta valinnan jälkeen): valikko koko ruutuna
        // tummalla teemalla, vasemmalla paikat (maanosat › maa › kaupunki, linssivalikon rivit) ja oikealla suosikit (täkyt
        // LINSSIRIVI-pohjalla, enintään 50). iPadilla ja vaakana kaksi saraketta, puhelimella pystyssä paikat ylhäällä, suosikit alla.
        bool aloitus;
        VisualElement aloitusVasen, aloitusOikea;
        ScrollView aloitusPaikat, aloitusSuosikit;
        Vector2 viimeKohta;
        readonly UiKerros uiKerros;
        readonly int kerrosNro;
        public const int SuosikitMax = 50;
        /// <summary>Rivien isä: aloituksessa paikkasarake, muuten valikko.</summary>
        VisualElement Kohde => aloitus && aloitusPaikat != null ? aloitusPaikat : valikko;

        public OpasValikko(UiKerros kerros, int kerrosNro)
        {
            uiKerros = kerros;
            this.kerrosNro = kerrosNro;
            kerros.TurvaMuuttui += () => { if (aloitus && Auki) AsetteleAloitus(); }; // kierto aloituksen aikana
            Juuri = Rakenne.El("mk-linnavalikko", kerros.Turva(kerrosNro), PickingMode.Ignore);
            Juuri.style.position = Position.Absolute;
            Juuri.style.left = 0; Juuri.style.right = 0; Juuri.style.top = 0; Juuri.style.bottom = 0;
            Juuri.style.display = DisplayStyle.None;
            ryhma = Ohjausnappi.Ryhma(Juuri);
            // PAUSE (omistaja 5.10.2026 klo 23.5x): OHJAUSNAPPI-ryhmässä, sama tauko-pohja kuin astrokuvan II (II ↔ ▶).
            // LOPETA KIERROS (omistaja 6.10. 16.4x): ■ OHJAUSNAPPI tauon vasemmalla, näkyy vain kierroksen aikana (PaivitaTauko).
            lopetaNappi = Ohjausnappi.Nappi(Ikonit.Lopeta, "Lopeta kierros", LopetaKierros, ryhma);
            lopetaNappi.style.display = DisplayStyle.None;
            taukoNappi = Ohjausnappi.Nappi(Ikonit.Tauko, "Tauko", () => OpasSovitin.Tauko(!OpasSovitin.Tauolla), ryhma);
            kuvaNappi = Ohjausnappi.Nappi(KuvatPaalla ? Ikonit.PilleriJulisteet : KuvaPoisIkoni, KuvatPaalla ? "Kuvat päällä" : "Kuvat pois",
                VaihdaKuvat, ryhma);
            // Omistaja 6.10. 12.1x: "piilota pause ja kuva nappi hampurilaisen sisään": ruudulla vain ☰; tauko ja kuvat valikon riveinä.
            // Omistaja 6.10. 16.3x: tauko taas aina näkyvissä ☰:n vasemmalla (kumoaa 12.1x:n tauon osalta); kuvat jäävät ☰:n sisään.
            kuvaNappi.style.display = DisplayStyle.None;
            nappi = Ohjausnappi.Nappi(Ikonit.Valikko, "Valikko", () => { if (Auki) Sulje(); else Avaa(Nakyma.Paa); }, ryhma);
            // VUOROKAUDENAIKA (omistaja 6.10. 18.5x): OHJAUSNAPPI vasempaan yläkulmaan; kuvake = voimassa oleva tila, A = automaattinen.
            var aikaRyhma = Ohjausnappi.Ryhma(Juuri);
            aikaRyhma.AddToClassList("mk-ohjausryhma--vasen");
            aikaNappi = Ohjausnappi.Nappi(Ikonit.Viiva["paiva"], "Vuorokaudenaika", () => { if (Auki && nakyma == Nakyma.Aika) Sulje(); else Avaa(Nakyma.Aika); }, aikaRyhma);

            // Elävä opas nykyajassa (omistaja 5.10.2026 klo 20.5x): LASI-lista harmaan lasin tokeneilla ja modernilla kirjasimella.
            valikko = Rakenne.El("mk-linssivalikko mk-linssivalikko--pohja tk-teema-harmaa", kerros.Juuri(kerrosNro));
            valikko.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(valikko, Kirjasin.Moderni);
            valikko.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            valikko.RegisterCallback<PointerDownEvent>(e => Napautus(e, 0, e), TrickleDown.TrickleDown);
            valikko.RegisterCallback<PointerMoveEvent>(e => Napautus(e, 1, e), TrickleDown.TrickleDown);
            valikko.RegisterCallback<PointerUpEvent>(e => Napautus(e, 2, e), TrickleDown.TrickleDown);
            // Juna 144 FAIL (Laitetestaaja 5.10., Amsterdam-rivi ei lauennut joka kerta): UITK:n ScrollView aloitti oman
            // kosketusvierityksensä jo sormen pienestä värinästä ja kaappasi osoittimen, jolloin rivin napautus peruuntui.
            // Oma liitos (kuten nostokortti ja lehti) pysäyttää ScrollViewin kosketusliikkeet; vieritys alkaa vasta 8 pt:n
            // pystyvedosta, ja sitä pienempi liike on napautus.
            Kosketusvieritys.Liita(valikko, () => aloitus && aloitusSuosikit != null && aloitusSuosikit.worldBound.Contains(viimeKohta) ? aloitusSuosikit : rivit);
            kerros.JokaRuutu += TarkistaOhiNapautus;

            // Irrallinen sirurivi alareunan keskelle (Googlen ja Cesiumin merkinnät jäävät sen alle).
            sirurivi = Rakenne.El("tk-teema-harmaa mk-chat__sirut mk-chat__sirut--irrallaan", Juuri, PickingMode.Ignore);
            sirurivi.style.display = DisplayStyle.None;
            sirurivi.style.opacity = 0f;
            puhuSiru = Rakenne.Nappi(null, "mk-chat__siru mk-chat__siru--ikoni", () => { NaytaTeksti(); UiNakymat.Hae()?.Chat?.AloitaSanelu(); }, null, PuluChat.MikkiIkoni);
            puhuSiru.tooltip = "Puhu tai kirjoita";
            // NELJÄ NAPPIA (omistaja 6.10. 11.5x: kaksi kysymyssirua pois; Kysy, Liiku, mikrofoni ja näppäimistö keskellä alhaalla,
            // LIIKU-nappipohja pyöristetyin kulmin, tekstit ja kuvakkeet keskitettyinä). Harmaa teema rivin tk-teema-harmaasta.
            napit = Rakenne.El("tk-teema-harmaa mk-opas-napit", Juuri, PickingMode.Ignore);
            napit.style.display = DisplayStyle.None;
            napit.style.opacity = 0f;
            OpasNappi("Kysy", Ikonit.Puhekupla, () => Avaa(Nakyma.Kysy), "Valmiit kysymykset oppaalle");
            // JATKA KIERROSTA (omistaja 6.10. 16.3x, Päätoimittaja): kysymys keskeyttää kaupunkikierroksen; vastauksen jälkeen
            // nappirivin lasipohjalla oleva nappi keskitettynä rivin yläpuolelle (LS1: KierrosJatkettavissa, JatkaKierrosta()).
            jatkaRivi = Rakenne.El("tk-teema-harmaa mk-opas-napit", Juuri, PickingMode.Ignore);
            jatkaRivi.style.display = DisplayStyle.None;
            var jatka = Rakenne.Nappi(null, "mk-liiku__nappi mk-opas-nappi", JatkaKierrosta, jatkaRivi);
            jatka.tooltip = "Jatka keskeytynyttä kaupunkikierrosta";
            Rakenne.Ikoni(Ikonit.Toista, "mk-ikoni mk-opas-nappi__ikoni", jatka);
            Kirjasimet.Aseta(Rakenne.Teksti("Jatka kierrosta", "mk-nappi__teksti mk-opas-nappi__teksti", jatka), Kirjasin.ModerniLihava);
            // MIKÄ TÄMÄ ON? (omistaja 6.10. 16.4x, juna 152; LS1 MikaTama*): vapaassa tilassa havainnekuvan paikalla nappirivin
            // vieressä (puhelimella rivin yllä oikealla), nappirivin lasipohjalla; haun aikana odotustila. Pieni tähtäin ruudun
            // keskelle (katsepiste = keskikohdan maapiste).
            mikaRivi = Rakenne.El("tk-teema-harmaa mk-opas-napit", Juuri, PickingMode.Ignore);
            mikaRivi.style.display = DisplayStyle.None;
            mikaRivi.style.left = StyleKeyword.Auto; mikaRivi.style.right = StyleKeyword.Auto;
            mikaNappi = Rakenne.Nappi(null, "mk-liiku__nappi mk-opas-nappi", MikaTamaOn, mikaRivi);
            mikaNappi.tooltip = "Mikä tämä on? Lähin tunnettu kohde tähtäimen kohdalta";
            Rakenne.Ikoni(Ikonit.Tahtain, "mk-ikoni mk-opas-nappi__ikoni", mikaNappi);
            mikaTeksti = Rakenne.Teksti("Mikä tämä on?", "mk-nappi__teksti mk-opas-nappi__teksti", mikaNappi);
            Kirjasimet.Aseta(mikaTeksti, Kirjasin.ModerniLihava);
            tahtain = Rakenne.El("tk-teema-harmaa mk-opas-tahtain", Juuri, PickingMode.Ignore);
            Rakenne.Ikoni(Ikonit.Tahtain, "mk-ikoni mk-opas-tahtain__ikoni", tahtain);
            tahtain.style.display = DisplayStyle.None;
            OpasNappi("Liiku", Ikonit.Viiva["kompassi"], () => Avaa(Nakyma.Liiku), "Lähikohteet ja kaupunkikierros");
            // Omistaja 16.3x "paremmin linjaan": tekstinapit samanlevyisiksi (leveimmän mukaan), sisältö keskellä.
            napit.RegisterCallback<GeometryChangedEvent>(_ =>
            {
                var tekstilliset = napit.Children().Where(c => !c.ClassListContains("mk-opas-nappi--ikoni")).ToList();
                if (tekstilliset.Count < 2) return;
                float lev = 0f;
                foreach (var c in tekstilliset) lev = Mathf.Max(lev, c.layout.width);
                if (lev <= 0 || float.IsNaN(lev)) return;
                foreach (var c in tekstilliset) if (Mathf.Abs(c.resolvedStyle.width - lev) > 0.5f) c.style.width = lev;
            });
            mikkiNappi = OpasNappi(null, PuluChat.MikkiIkoni, Puhu, "Puhu oppaalle");
            OpasNappi(null, PuluChat.NappaimistoIkoni, Kirjoita, "Kirjoita oppaalle");
            kerros.JokaRuutu += PaivitaSirut;
            // Googlen ja Cesiumin krediitit (logot muuttamattomina, Googlen ehdot): sirurivi niiden yläpuolelle, tarkistus 2 × s.
            sirurivi.schedule.Execute(SovitaKrediitteihin).Every(500);

            RakennaSiirtyma(kerros.Juuri(kerrosNro));
            RakennaKirjoitus();
            kuvaKortti = Rakenne.El("mk-nosto tk-teema-harmaa", Juuri, PickingMode.Position);
            kuvaKortti.style.position = Position.Absolute;
            kuvaKortti.style.right = 0;
            kuvaKortti.style.width = KuvaLeveys;
            kuvaKortti.style.maxWidth = KuvaLeveys;
            kuvaKortti.style.paddingTop = 6; kuvaKortti.style.paddingBottom = 6; kuvaKortti.style.paddingLeft = 6; kuvaKortti.style.paddingRight = 6;
            kuvaKortti.style.display = DisplayStyle.None;
            kuvaKortti.style.opacity = 0f;
            kuvaKortti.style.transitionProperty = new List<StylePropertyName> { new StylePropertyName("opacity") };
            kuvaKortti.style.transitionDuration = new List<TimeValue> { new TimeValue(Tyylikirja.Kesto.Sulku / 1000f) };
            kuvaKehys = Rakenne.El("mk-nosto__kuvakehys mk-nosto__kuvakehys--nyky", kuvaKortti, PickingMode.Ignore);
            kuvaKehys.style.height = Mathf.Round((KuvaLeveys - 12f) * 2f / 3f);
            kuvaEl = Rakenne.El("mk-nosto__kuva", kuvaKehys, PickingMode.Ignore);
            // USEAT KUVAT (omistaja 5.10.2026 klo 23.5x): kortissa yksi kuva ja nostokortin kuvalaskuri "+N" muiden määrästä.
            kuvaLaskuri = Rakenne.Teksti("", "mk-nosto__laskuri", kuvaKehys);
            kuvaLaskuri.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(kuvaLaskuri, Kirjasin.Moderni);
            kuvaLaskuri.style.display = DisplayStyle.None;
            kuvaMerkki = Rakenne.El("mk-nosto__kuvateksti mk-nosto__kuvateksti--kotelo", kuvaKortti, PickingMode.Ignore);
            var hm = Rakenne.Teksti("Havainnekuva".ToUpperInvariant(), "mk-nosto__havainne", kuvaMerkki);
            hm.tooltip = "Havainnekuva";
            Kirjasimet.Aseta(hm, Kirjasin.Moderni);
            kuvaKortti.RegisterCallback<ClickEvent>(_ => SuurennaKuva());
            kuvaKortti.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            kerros.JokaRuutu += PaivitaKuva;
            kerros.JokaRuutu += PaivitaTauko;
            // TÄKYLUETTELO (omistaja 5.10.2026 klo 23.5x): opas alkaa täkyillä ja odottaa valintaa (Linssiseppä 3bbb18d2).
            OpasSovitin.TakyAvaus = true;

            // Kameran tapit (juna 145): alakulmiin vain pysähdyksellä (OpasTapit).
            tapit = new OpasTapit(Juuri);
            nimilappu = new OpasNimilappu(Juuri);
            kerros.JokaRuutu += PaivitaTapit;
            Viimeisin = this;
        }

        /// <summary>Oppaan linssi auki / kiinni.</summary>
        public void Nayta(bool nakyy)
        {
            if (nakyy == this.nakyy && Juuri.style.display == (nakyy ? DisplayStyle.Flex : DisplayStyle.None)) return;
            this.nakyy = nakyy;
            Juuri.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (!nakyy) Sulje();
            var ui = UiNakymat.Olemassa ? UiNakymat.Hae() : null;
            ui?.Chat?.OpasTila(nakyy);
            // Linssi avautuu täkyluetteloon (valikko auki täkynäkymässä); sulkeutuu valinnasta.
            // Varapolku (Päätoimittaja 6.10. 00.2x, junan 146 VIE-ehto): valikko avautuu vain, kun täkyjä on; jos ne eivät tule
            // (GET /opas/kohteet puuttuu tai epäonnistuu) 4 s:ssa, opas avautuu kuten ennen ilman valikkoa.
            // Linssisepän avausvalikko (juna 149): opas auki ilman paikkaa ja ilman karttaa → aloitus heti (suosikit täyttyvät perässä).
            if (nakyy && OpasSovitin.Avausvalikko) AvaaAloitus();
            else if (nakyy && OpasSovitin.TakyAvaus)
            {
                float raja = Time.realtimeSinceStartup + 4f;
                IVisualElementScheduledItem odotus = null;
                odotus = Juuri.schedule.Execute(() =>
                {
                    if (!this.nakyy || Auki) { odotus.Pause(); return; }
                    if (OnTakyja || OpasSovitin.Avausvalikko) { odotus.Pause(); AvaaAloitus(); return; }
                    if (OpasSovitin.Takyt != null || Time.realtimeSinceStartup > raja)
                    {
                        odotus.Pause();
                        Debug.Log("MATKAKIRJA opas: ei täkyjä (" + (OpasSovitin.Takyt == null ? "ei vastausta" : "tyhjä") + "), valikko kiinni");
                    }
                }).StartingIn(300).Every(250);
            }
            ui?.OpasPeittaaPulun(nakyy);
            ui?.Linssit?.PaivitaSulku();
            siruPoletti = -1;
            siruNakyy = false;
            naytettyKuva = null; testiKuva = null; kuvaNakyy = false;
            kuvaKortti.style.display = DisplayStyle.None;
            kuvaKortti.style.opacity = 0f;
            if (!nakyy && suurennos != null && suurennos.Auki) suurennos.Sulje();
            sirurivi.style.display = DisplayStyle.None;
            sirurivi.style.opacity = 0f;
            napit.style.display = DisplayStyle.None;
            napit.style.opacity = 0f;
            nappiNakyy = false;
        }

        /// <summary>Koko keskustelu ja syöttö nykyiseen Pulu-chatiin (valikon Näytä teksti ja puhu/kirjoita-siru).</summary>
        void NaytaTeksti()
        {
            Sulje();
            var chat = UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
            if (chat == null) return;
            chat.AvaaOppaalle(() => sirurivi.worldBound.width > 0 ? sirurivi.worldBound : nappi.worldBound);
            Debug.Log("MATKAKIRJA opas: teksti auki");
        }

        /// <summary>
        /// Sirurivi joka ruudulla: kaksi vaihtoehtoa, kun kertoja on lopettanut (OpasSovitin.KertojaPuhuu) ja jatkoja on, sekä
        /// puhu/kirjoita-siru; ei chatin eikä valikon ollessa auki. Häivytys --tk-kesto-sulku (200 ms).
        /// </summary>
        /// <summary>Oppaan alarivin nappi LIIKU-pohjalla: teksti (Kysy, Liiku) tai pelkkä kuvake (mikrofoni, näppäimistö), keskitettynä.</summary>
        Button OpasNappi(string teksti, string ikoni, Action teko, string ohje)
        {
            var b = Rakenne.Nappi(null, "mk-liiku__nappi mk-opas-nappi" + (teksti == null ? " mk-opas-nappi--ikoni" : ""), teko, napit);
            b.tooltip = ohje;
            Rakenne.Ikoni(ikoni, "mk-ikoni mk-opas-nappi__ikoni", b);
            if (teksti != null) Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-nappi__teksti mk-opas-nappi__teksti", b), Kirjasin.ModerniLihava);
            return b;
        }

        // --- SIIRTYMÄ KAUPUNGIN ULKOPUOLELLE (omistaja 6.10. 12.0x): ei lentoa, vaan Cupolan alkutekstin musta ruutu (mk-astroavaus),
        // keskellä "Siirrytään" ja kohteen nimi (Lcd/VT323 kuten Cupolassa) sekä LATAUSPALKKI (EDISTYMINEN-pohja, tk-teema-tumma);
        // näkymä aukeaa häivyttäen, kun kohde on ladattu tarkaksi. Linssisepän OpasSovitin: SiirtymaAlkaa(string), SiirtymaEdistyminen
        // (0–1) ja SiirtymaValmis.
        VisualElement siirtyma;
        Label siirtymaNimi;
        Latauspalkki siirtymaPalkki;
        IVisualElementScheduledItem siirtymaKierros;

        VisualElement siirtymaIon, avausIon;

        // Koko ruutu (simu 6.10.: turva-alueen ulkopuolelle jäi kartta ja krediitit), kuten DioraamaTaulun nimiruutu.
        void RakennaSiirtyma(VisualElement kerrosJuuri)
        {
            siirtyma = Rakenne.El("mk-astroavaus tk-teema-tumma", kerrosJuuri, PickingMode.Position);
            siirtyma.style.display = DisplayStyle.None;
            var otsikko = Rakenne.Teksti("Siirrytään", "mk-ajattelija__vuodet", siirtyma);
            siirtymaNimi = Rakenne.Teksti("", "mk-ajattelija__nimi", siirtyma);
            foreach (var t in new[] { otsikko, siirtymaNimi }) { t.pickingMode = PickingMode.Ignore; t.style.unityTextAlign = TextAnchor.MiddleCenter; Kirjasimet.Aseta(t, Kirjasin.Lcd); }
            siirtymaPalkki = new Latauspalkki(siirtyma);
            // Cesium ion -logo vasemmassa alakulmassa latauksen ajan (omistaja 6.10. 12.2x): Cesiumin oma kuva muuttamattomana,
            // samassa koossa ja paikassa kuin krediiteissä (musta ruutu peittää Cesiumin krediittikerroksen).
            siirtymaIon = Rakenne.El(null, siirtyma, PickingMode.Ignore);
            siirtymaIon.style.position = Position.Absolute;
            siirtymaIon.style.unityBackgroundScaleMode = ScaleMode.ScaleToFit;
            // AVAUSLATAUS (Päätoimittaja 6.10. 12.4x: ion-logo jäi maanosavalikon paneelin alle, vain "C" näkyi): oppaassa ion-logo
            // piirretään avauslatauksen ajan tämän kerroksen päälle Googlen logon yläpuolelle, Cesiumin oma piiloon.
            avausIon = Rakenne.El(null, kerrosJuuri, PickingMode.Ignore);
            avausIon.style.position = Position.Absolute;
            avausIon.style.unityBackgroundScaleMode = ScaleMode.ScaleToFit;
            avausIon.style.display = DisplayStyle.None;
            kerrosJuuri.schedule.Execute(PaivitaAvausIon).Every(100);
            OpasSovitin.SiirtymaAlkaa += n => UiKerros.PaaSaikeessa(() => SiirtymaAlkaa(n));
            OpasSovitin.SiirtymaValmis += () => UiKerros.PaaSaikeessa(SiirtymaValmis);
        }

        /// <summary>Siirtymä alkaa: musta ruutu nimellä ja latauspalkilla (myös testi `ui opasvalikko siirtyma <nimi>`).</summary>
        public void SiirtymaAlkaa(string nimi)
        {
            if (!nakyy) return;
            Sulje();
            siirtymaNimi.text = (nimi ?? "").ToUpperInvariant();
            siirtymaPalkki.Nollaa();
            siirtyma.RemoveFromClassList("mk-astroavaus--haipyy");
            siirtyma.style.opacity = 1f;
            siirtyma.style.display = DisplayStyle.Flex;
            siirtyma.BringToFront();
            siirtymaPalkki.Nayta(true);
            KrediititTiivis.CesiumNakyviin = true;
            AsetaSiirtymaIon();
            Debug.Log("MATKAKIRJA opas: siirtymä alkaa → " + nimi);
            siirtymaKierros?.Pause();
            siirtymaKierros = siirtyma.schedule.Execute(() => siirtymaPalkki.Arvo = testiEdistyminen ?? OpasSovitin.SiirtymaEdistyminen).Every(100);
        }

        void AsetaSiirtymaIon() => AsetaIon(siirtymaIon, KrediititTiivis.TyhjaAlaPt);

        void PaivitaAvausIon()
        {
            // Aloituksen aikana ei logoa (simu 15.45: ion-logo piirtyi paikkalistan päälle; Cesium ei ole vielä auki).
            bool nayta = nakyy && !aloitus && KrediititTiivis.AvausLatautuu && KrediititTiivis.IonLogoKuva != null;
            KrediititTiivis.IonOmaPiirto = nayta;
            if (!nayta) { if (avausIon.style.display != DisplayStyle.None) avausIon.style.display = DisplayStyle.None; return; }
            // Cesiumin paikka: Googlen logon yläpuolella (sen mitattu yläreuna; simu 6.10. 13.13: laskettu paikka osui logon päälle).
            float h = avausIon.parent?.worldBound.height ?? 0f, g = KrediititTiivis.GoogleYlaOsuus;
            AsetaIon(avausIon, g > 0f && h > 0f ? g * h + 2f : KrediititTiivis.TyhjaAlaPt + KrediititTiivis.RiviPt * 1.3f + 2f + KrediititTiivis.LogoPt + 2f);
            avausIon.BringToFront();
        }

        /// <summary>Cesium ion -logo (Cesiumin oma kuva muuttamattomana) vasempaan alakulmaan krediittien koossa.</summary>
        static void AsetaIon(VisualElement e, float ala)
        {
            var t = KrediititTiivis.IonLogoKuva;
            e.style.display = t != null && t.height > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            if (t == null || t.height <= 0) return;
            float h = KrediititTiivis.LogoPt;
            e.style.backgroundImage = new StyleBackground(t as Texture2D);
            e.style.height = h; e.style.width = h * t.width / t.height;
            e.style.left = KrediititTiivis.TyhjaSivuPt;   // Cesiumin krediittien tapaan ruudun alakulmasta
            e.style.bottom = ala;
        }

        /// <summary>Kohde ladattu: musta ruutu häipyy (Cupolan häivytys) ja näkymä aukeaa.</summary>
        public void SiirtymaValmis()
        {
            if (siirtyma.style.display == DisplayStyle.None) return;
            siirtymaKierros?.Pause();
            siirtymaPalkki.Arvo = 1f;
            siirtyma.AddToClassList("mk-astroavaus--haipyy");
            siirtyma.schedule.Execute(() => siirtyma.style.opacity = 0f).ExecuteLater(16);
            siirtyma.schedule.Execute(() => { if (siirtyma.resolvedStyle.opacity < 0.01f) siirtyma.style.display = DisplayStyle.None; }).StartingIn(1200);
            testiEdistyminen = null;
            KrediititTiivis.CesiumNakyviin = false;
            Debug.Log("MATKAKIRJA opas: siirtymä valmis");
        }

        float? testiEdistyminen;

        /// <summary>Mikrofoni: sanelu suoraan oppaalle (ei Pulun chattia); toinen napautus lopettaa.</summary>
        void Puhu()
        {
            if (Sanelu.Kaynnissa) { Sanelu.Lopeta(); return; }
            if (!Sanelu.Saatavilla) { Debug.Log("MATKAKIRJA opas: sanelu ei saatavilla"); return; }
            mikkiNappi.AddToClassList("mk-valittu");
            Debug.Log("MATKAKIRJA opas: mikrofoni kuuntelee");
            Sanelu.Aloita(
                osittainen: _ => { },
                valmis: t =>
                {
                    mikkiNappi.RemoveFromClassList("mk-valittu");
                    string teksti = (t ?? "").Trim();
                    if (teksti.Length == 0) return;
                    PuhuOppaalle(teksti, "puhe");
                },
                virhe: _ => mikkiNappi.RemoveFromClassList("mk-valittu"));
        }

        /// <summary>Näppäimistö: Pulun syöttörivi oppaan keskustelussa kirjoitustilassa.</summary>
        void Kirjoita()
        {
            Sulje();
            bool auki = kirjoitus.style.display != DisplayStyle.Flex;
            kirjoitus.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            if (auki) { kentta.value = ""; kentta.schedule.Execute(() => kentta.Focus()).ExecuteLater(16); }
            Debug.Log("MATKAKIRJA opas: kirjoitus " + (auki ? "auki" : "kiinni"));
        }

        /// <summary>Mikin ja näppäimistön teksti suoraan oppaalle (LS1 OpasSovitin.Puhu); varalla Pulun sieppaus.</summary>
        void PuhuOppaalle(string teksti, string mista)
        {
            teksti = (teksti ?? "").Trim();
            if (teksti.Length == 0) return;
            Debug.Log($"MATKAKIRJA opas: {mista} oppaalle \"{teksti}\"");
            if (OpasSovitin.Puhu(teksti)) return;
            if (!(PuluChat.Sieppaa?.Invoke(teksti) ?? false)) UiNakymat.Hae()?.Chat?.Kysy(teksti, true);
        }

        // Näppäimistön syöttörivi: Pulun syöttörivin pohja (mk-chat__rivi, __kentta, __laheta) lasiteemassa napinrivin yläpuolella.
        VisualElement kirjoitus;
        TextField kentta;

        void RakennaKirjoitus()
        {
            kirjoitus = Rakenne.El("tk-teema-harmaa mk-chat--lasi mk-opas-kirjoitus", Juuri, PickingMode.Position);
            kirjoitus.style.display = DisplayStyle.None;
            var rivi = Rakenne.El("mk-chat__rivi", kirjoitus, PickingMode.Ignore);
            kentta = new TextField { maxLength = 300 };
            kentta.AddToClassList("mk-chat__kentta");
            kentta.textEdition.placeholder = "Kysy oppaalta…";
            Kirjasimet.Aseta(kentta, Kirjasin.Moderni);
            void Laheta() { var t = kentta.value; kentta.value = ""; kirjoitus.style.display = DisplayStyle.None; PuhuOppaalle(t, "kirjoitus"); }
            kentta.RegisterCallback<KeyDownEvent>(e => { if (e.keyCode == KeyCode.Return || e.keyCode == KeyCode.KeypadEnter) { Laheta(); e.StopPropagation(); } });
            // iOS (LS1:n todistusajo 6.10. 12.42): järjestelmän oma syöttörivi (✓/×) avautui tämän rivin lisäksi ja teksti jäi siihen →
            // oma rivi riittää (hideMobileInput), ja näppäimistön Valmis/Lähetä lähettää kuten Return.
            kentta.textEdition.hideMobileInput = true;
            kirjoitus.schedule.Execute(() =>
            {
                var k = kentta.textEdition.touchScreenKeyboard;
                if (k == null) return;
                if (k.status == TouchScreenKeyboard.Status.Done && !string.IsNullOrWhiteSpace(kentta.value)) Laheta();
            }).Every(100);
            rivi.Add(kentta);
            var laheta = Rakenne.Nappi(null, "mk-chat__laheta", Laheta, rivi, Ikonit.Nuoli);
            laheta.tooltip = "Lähetä oppaalle";
            kirjoitus.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
        }

        void RakennaKysy()
        {
            Vieritys();
            Kirjasimet.Aseta(Rakenne.Teksti("KYSY OPPAALTA", "mk-linssivalitsin__valiotsikko", rivit), Kirjasin.ModerniLihava);
            if (!(OpasSovitin.Kysymykset is IReadOnlyList<string> kys) || kys.Count == 0)
            {
                Kirjasimet.Aseta(Rakenne.Teksti("Kysymykset latautuvat…", "mk-linssivalikko__lahde", rivit), Kirjasin.Moderni);
                valikko.schedule.Execute(() => { if (Auki && nakyma == Nakyma.Kysy && OpasSovitin.Kysymykset is IReadOnlyList<string> k && k.Count > 0) Rakenna(); })
                    .Every(500).Until(() => !Auki || nakyma != Nakyma.Kysy || OpasSovitin.Kysymykset is IReadOnlyList<string> k2 && k2.Count > 0);
                return;
            }
            foreach (var q in kys)
            {
                string t = q;
                Action teko = () =>
                {
                    Sulje();
                    Debug.Log("MATKAKIRJA opas: kysy \"" + t + "\"");
                    if (!OpasSovitin.Kysy(t)) Valitse(t);
                };
                var b = Rakenne.Nappi(null, "mk-linssivalikko__kohta mk-linssivalikko__komento", () => Rivilta(teko), rivit);
                var n = Rakenne.Teksti(t, "mk-linssivalikko__nimi", b);
                n.style.whiteSpace = WhiteSpace.Normal;
                Kirjasimet.Aseta(n, Kirjasin.Moderni);
                b.tooltip = t;
                nykyiset.Add((b, teko));
            }
        }

        void RakennaLiiku()
        {
            Vieritys();
            Kirjasimet.Aseta(Rakenne.Teksti("MIHIN SIIRRYTÄÄN?", "mk-linssivalitsin__valiotsikko", rivit), Kirjasin.ModerniLihava);
            var kohteet = OpasSovitin.Kohteet;
            if (kohteet == null)
            {
                Kirjasimet.Aseta(Rakenne.Teksti("Kohteet latautuvat…", "mk-linssivalikko__lahde", rivit), Kirjasin.Moderni);
                valikko.schedule.Execute(() => { if (Auki && nakyma == Nakyma.Liiku && OpasSovitin.Kohteet != null) Rakenna(); })
                    .Every(500).Until(() => !Auki || nakyma != Nakyma.Liiku || OpasSovitin.Kohteet != null);
            }
            else foreach (var k in kohteet) LiikuRivi(k);
            // Alimpana aina Kaupunkikierros (omistaja 6.10.).
            Action kierros = () => { Sulje(); Debug.Log("MATKAKIRJA opas: kaupunkikierros"); OpasSovitin.Kaupunkikierros(); };
            // Kaupunkikierros kiinnitettynä paneelin alareunaan, aina näkyvissä (omistaja 16.3x); lista vierii sen yläpuolella.
            var kb = Rakenne.Nappi(null, "mk-linssivalikko__kohta mk-linssivalikko__komento", () => Rivilta(kierros), valikko);
            kb.style.flexShrink = 0;
            Kirjasimet.Aseta(Rakenne.Teksti("Kaupunkikierros", "mk-linssivalikko__nimi", kb), Kirjasin.ModerniLihava);
            kb.tooltip = "Kaupunkikierros";
            nykyiset.Add((kb, kierros));
        }

        void LiikuRivi(Matkakirja.Linssit.Kierros.OpasTaky t)
        {
            Action teko = () =>
            {
                Sulje();
                Debug.Log("MATKAKIRJA opas: siirry " + t.Nimi);
                if (!OpasSovitin.Liiku(t)) OpasSovitin.Valitse(t);
            };
            var b = Rakenne.Nappi(null, "mk-linssirivi mk-opas-taky", () => Rivilta(teko), rivit);
            b.tooltip = t.Nimi;
            // Kuvapaikka vain kuvalliselle kohteelle (junan 148b video: Liiku-listassa ei ole kuvia → tyhjät pyöreät paikat).
            if (!string.IsNullOrEmpty(t.KuvaUrl))
            {
                var kehys = Rakenne.El("mk-linssirivi__ikoni mk-linssirivi__kuva", b, PickingMode.Ignore);
                NostoSisalto.HaeKuva(t.KuvaUrl, tex => { if (tex != null && kehys.panel != null) kehys.style.backgroundImage = new StyleBackground(tex); });
            }
            var tekstit = Rakenne.El("mk-linssirivi__tekstit", b, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(t.Nimi ?? "", "mk-linssirivi__nimi", tekstit), Kirjasin.ModerniLihava);
            string ala = !string.IsNullOrEmpty(t.Alarivi) ? t.Alarivi : t.Koukku;
            if (!string.IsNullOrEmpty(ala)) Kirjasimet.Aseta(Rakenne.Teksti(ala, "mk-linssirivi__lyhyt", tekstit), Kirjasin.Moderni);
            nykyiset.Add((b, teko));
        }

        VisualElement jatkaRivi;
        bool? testiJatka;
        VisualElement mikaRivi, tahtain;
        Button mikaNappi;
        Label mikaTeksti;
        bool? testiMika;
        IReadOnlyList<Matkakirja.Linssit.Kierros.OpasTaky> mikaNaytetty;

        bool VapaaTila => testiMika ?? OpasSovitin.VapaaTila;

        void MikaTamaOn()
        {
            Debug.Log("MATKAKIRJA opas: mikä tämä on?");
            OpasSovitin.MikaTamaOn();
        }

        /// <summary>Mikä tämä on? -nappi, tähtäin ja vaihtoehtolista (Liiku-pohja) vapaan tilan mukaan.</summary>
        void PaivitaMika()
        {
            var c0 = UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
            bool vapaa = VapaaTila;
            bool lataa = OpasSovitin.MikaTamaLataa;
            bool nappi = nappiNakyy && !Auki && !(c0?.Auki ?? false) && (testiMika == true || OpasSovitin.MikaTamaKaytettavissa || lataa);
            var d = nappi ? DisplayStyle.Flex : DisplayStyle.None;
            if (mikaRivi.style.display != d) mikaRivi.style.display = d;
            var td = vapaa && !Auki ? DisplayStyle.Flex : DisplayStyle.None;
            if (tahtain.style.display != td) tahtain.style.display = td;
            string teksti = lataa ? "Haetaan…" : "Mikä tämä on?";
            if (mikaTeksti.text != teksti) mikaTeksti.text = teksti;
            mikaNappi.SetEnabled(!lataa);
            if (nappi && napit.childCount > 0)
            {
                // Havainnekuvan paikka: nappirivin viereen, kun tilaa on (iPad); muuten rivin yllä oikealla.
                float oikea = Juuri.WorldToLocal(napit[napit.childCount - 1].worldBound).xMax;
                float w = Juuri.layout.width, mw = mikaRivi.layout.width;
                bool vieressa = !float.IsNaN(oikea) && mw > 0 && oikea + KuvaRako + mw + OpasTapit.Reuna <= w;
                mikaRivi.style.left = vieressa ? oikea + KuvaRako : StyleKeyword.Auto;
                mikaRivi.style.right = vieressa ? StyleKeyword.Auto : (StyleLength)OpasTapit.Reuna;
                mikaRivi.style.bottom = vieressa ? krediittiAla : krediittiAla + NappiriviKorkeus + KuvaRako;
            }
            // Vaihtoehdot (≥ 2) Liiku-listan pohjalla; 0 → ilmoitus listassa; 1 kerrotaan suoraan (LS1).
            var v = OpasSovitin.MikaTamaVaihtoehdot;
            if (v != null && v != mikaNaytetty && (v.Count == 0 || v.Count >= 2)) { mikaNaytetty = v; Avaa(Nakyma.Mika); }
            if (v == null) mikaNaytetty = null;
        }

        void RakennaMika()
        {
            Vieritys();
            Kirjasimet.Aseta(Rakenne.Teksti("MIKÄ TÄMÄ ON?", "mk-linssivalitsin__valiotsikko", rivit), Kirjasin.ModerniLihava);
            var v = OpasSovitin.MikaTamaVaihtoehdot ?? (IReadOnlyList<Matkakirja.Linssit.Kierros.OpasTaky>)Array.Empty<Matkakirja.Linssit.Kierros.OpasTaky>();
            if (v.Count == 0) { Kirjasimet.Aseta(Rakenne.Teksti("Lähellä ei ole tunnettua kohdetta", "mk-linssivalikko__lahde", rivit), Kirjasin.Moderni); return; }
            foreach (var t in v)
            {
                var k = t;
                Action teko = () => { Sulje(); Debug.Log("MATKAKIRJA opas: mikä tämä on → " + k.Nimi); OpasSovitin.MikaTamaValitse(k); };
                var b = Rakenne.Nappi(null, "mk-linssirivi mk-opas-taky", () => Rivilta(teko), rivit);
                b.tooltip = k.Nimi;
                var tekstit = Rakenne.El("mk-linssirivi__tekstit", b, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti(k.Nimi ?? "", "mk-linssirivi__nimi", tekstit), Kirjasin.ModerniLihava);
                string ala = string.Join(" · ", new[] { k.Alarivi, double.IsNaN(k.EtaisyysM) ? null : Etaisyys(k.EtaisyysM) }.Where(x => !string.IsNullOrEmpty(x)));
                if (ala.Length > 0) Kirjasimet.Aseta(Rakenne.Teksti(ala, "mk-linssirivi__lyhyt", tekstit), Kirjasin.Moderni);
                nykyiset.Add((b, teko));
            }
        }

        static string Etaisyys(double m) => m < 1000 ? $"{Math.Round(m / 10) * 10:0} m" : $"{m / 1000:0.0} km".Replace('.', ',');

        /// <summary>LS1: kierros keskeytetty kysymykseen ja vastaus kuultu.</summary>
        static bool KierrosKeskeytetty => OpasSovitin.KierrosJatkettavissa;

        void JatkaKierrosta()
        {
            Debug.Log("MATKAKIRJA opas: jatka kierrosta");
            testiJatka = null;
            OpasSovitin.JatkaKierrosta();
        }

        void PaivitaJatka()
        {
            var c0 = UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
            bool nayta = nappiNakyy && !Auki && !(c0?.Auki ?? false) && (testiJatka ?? KierrosKeskeytetty);
            var d = nayta ? DisplayStyle.Flex : DisplayStyle.None;
            if (jatkaRivi.style.display != d) jatkaRivi.style.display = d;
            if (nayta) jatkaRivi.style.bottom = krediittiAla + NappiriviKorkeus + KuvaRako;
        }

        void PaivitaSirut()
        {
            if (!nakyy) return;
            PaivitaJatka();
            PaivitaMika();
            Valahdysvahti.Paivita(Juuri);
            // Neljä nappia näkyvät aina oppaassa, paitsi chatin tai valikon ollessa auki (vanha sirurivi ei enää näy).
            var c0 = UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
            bool napitNakyy = c0 != null && !c0.Auki && !Auki;
            if (napitNakyy != nappiNakyy)
            {
                nappiNakyy = napitNakyy;
                if (napitNakyy) { napit.style.display = DisplayStyle.Flex; napit.schedule.Execute(() => { if (nappiNakyy) napit.style.opacity = 1f; }); }
                else { napit.style.opacity = 0f; napit.schedule.Execute(() => { if (!nappiNakyy) napit.style.display = DisplayStyle.None; }).StartingIn(Tyylikirja.Kesto.Sulku); }
            }
            napit.style.bottom = krediittiAla;
            // Kirjoitusrivi näppäimistön yläpuolelle (junan 148b video: rivi jäi näppäimistön alle).
            float kirjoitusAla = krediittiAla + 52f;
            if (TouchScreenKeyboard.visible && Screen.height > 0 && Juuri.panel != null)
            {
                float kb = TouchScreenKeyboard.area.height / Screen.height * Juuri.panel.visualTree.layout.height;
                float alaVara = Juuri.panel.visualTree.layout.height - Juuri.worldBound.yMax;
                if (kb > 0f) kirjoitusAla = Mathf.Max(kirjoitusAla, kb - alaVara + KuvaRako);
            }
            if (kirjoitus.style.bottom.value.value != kirjoitusAla) kirjoitus.style.bottom = kirjoitusAla;
            if (VanhatSirut) PaivitaVanhatSirut();
        }

        /// <summary>A/B (`ui opasvalikko vanhatsirut 1`): vanha kahden sirun rivi neljän napin tilalla.</summary>
        static bool VanhatSirut;

        void PaivitaVanhatSirut()
        {
            if (!nakyy) return;
            var chat = UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
            if (chat == null) return;
            // Kysymyksen vaihtoehdot vanhenevat, kun silmukka lakkaa odottamasta (pelaaja ei valinnut, opas jatkoi itse).
            var kys = OpasSovitin.Viimeisin?.Kysymys;
            if (kys != null) odotettuKysymys = kys;
            else if (odotettuKysymys != null)
            {
                var vanhat = odotettuKysymys.Vaihtoehdot ?? Array.Empty<string>();
                odotettuKysymys = null;
                if (chat.OppaanJatkot.Count > 0 && vanhat.Contains(chat.OppaanJatkot[0])) chat.TyhjennaOppaanJatkot();
            }
            var jatkot = chat.OppaanJatkot;
            bool nayta = !chat.Auki && !Auki && !OpasSovitin.KertojaPuhuu;
            int poletti = nayta ? jatkot.Count == 0 ? 0 : string.Join("\n", jatkot).GetHashCode() | 1 : -1;
            if (poletti == siruPoletti) return;
            siruPoletti = poletti;
            if (nayta)
            {
                sirurivi.Clear();
                foreach (var j in jatkot)
                {
                    string t = j;
                    var b = Rakenne.Nappi(t, "mk-chat__siru", () => Valitse(t), sirurivi);
                    Kirjasimet.Aseta(b, Kirjasin.Moderni);
                }
                sirurivi.Add(puhuSiru);
            }
            if (nayta == siruNakyy) return;
            siruNakyy = nayta;
            if (nayta)
            {
                sirurivi.style.display = DisplayStyle.Flex;
                sirurivi.schedule.Execute(() => { if (siruNakyy) sirurivi.style.opacity = 1f; });
            }
            else
            {
                sirurivi.style.opacity = 0f;
                sirurivi.schedule.Execute(() => { if (!siruNakyy) sirurivi.style.display = DisplayStyle.None; }).StartingIn(Tyylikirja.Kesto.Sulku);
            }
        }

        /// <summary>
        /// Sirurivin alareuna krediittien yläpuolelle: CesiumKaupunki.KrediititKorkeusPt on Cesiumin oman paneelin yksiköissä
        /// ruudun alareunasta, joten se muunnetaan osuudeksi ruudusta ja siitä tämän paneelin turva-alueen yksiköihin.
        /// </summary>
        void SovitaKrediitteihin()
        {
            if (!nakyy || Juuri.panel == null) return;
            float ala = 40f;
            var cs = CesiumForUnity.CesiumCreditSystem.GetDefaultCreditSystem();
            var cj = cs != null ? cs.GetComponent<UIDocument>()?.rootVisualElement : null;
            float ch = cj != null ? cj.worldBound.height : 0f, k = CesiumKaupunki.KrediititKorkeusPt;
            float juuriH = Juuri.panel.visualTree.layout.height;
            if (ch > 0f && k > 0f && juuriH > 0f)
            {
                float alaVara = juuriH - Juuri.worldBound.yMax; // turva-alueen alareuna ruudun alareunasta
                ala = Mathf.Max(ala, Mathf.Round(k / ch * juuriH - alaVara + KuvaRako));
            }
            if (KrediititTiivis.KaikkiAuki && ala > krediittiAla) return;   // napautuksella avattu koko lähdelista ei nosta siruja
            if (krediittiAla != ala) Debug.Log($"MATKAKIRJA opas: sirut krediittien yläpuolelle {ala:0} pt (krediitit {k:0}/{ch:0})");
            krediittiAla = ala;
        }

        /// <summary>
        /// Testi `ui opasvalikko peitto`: näkyvien oppaan elementtien pinta-ala osuutena ruudusta (sirut, kuvakortti, ohjausnapit,
        /// avoin valikko, pysähdyksen otsikon tekstit). Päätoimittajan raja 45 %, tavoite ~15 %.
        /// </summary>
        string Peitto()
        {
            var juuri = Juuri.panel?.visualTree;
            if (juuri == null) return "opas: peitto ei paneelia";
            float koko = juuri.layout.width * juuri.layout.height, ala = 0f;
            var osat = new List<string>();
            void Lisaa(string nimi, VisualElement e)
            {
                if (e == null || e.resolvedStyle.display == DisplayStyle.None || e.resolvedStyle.opacity < 0.05f || e.worldBound.width <= 0) return;
                float a = e.worldBound.width * e.worldBound.height;
                ala += a; osat.Add($"{nimi} {a / koko * 100f:0.0}");
            }
            if (siruNakyy) foreach (var c in sirurivi.Children()) Lisaa("siru", c);
            if (kuvaNakyy) Lisaa("kuva", kuvaKortti);
            if (tapit.Nakyy) foreach (var t in Juuri.Query(className: "mk-tappi").ToList()) Lisaa("tappi", t);
            if (nimilappu.Nakyy) Lisaa("nimilappu", Juuri.Q(className: "mk-opas-nimilappu"));
            foreach (var c in ryhma.Children()) Lisaa("nappi", c);
            if (Auki) Lisaa("valikko", valikko);
            foreach (var o in juuri.Query(className: "mk-astroavaus__otsikko--haipyy").ToList())
                if (o.resolvedStyle.opacity > 0.05f) foreach (var t in o.Children()) Lisaa("otsikko", t);
            return $"opas: peitto {ala / koko * 100f:0.0} % ({string.Join(", ", osat)})";
        }

        /// <summary>
        /// Tapit näkyvät pysähdyksellä (Puhuu/Odottaa), eivät lennon, valikon tai chatin aikana. Sirurivi on niiden välissä; jos se
        /// ei mahdu tappien väliin (kapea pystyruutu), se nousee tappien yläpuolelle.
        /// </summary>
        void PaivitaTapit()
        {
            if (!nakyy) { tapit.Paivita(false, krediittiAla); nimilappu.Paivita(null); return; }
            var chat = UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
            var l = OpasSovitin.Viimeisin?.Silmukka;
            bool pysahdys = l != null && l.Nykyinen != null && (l.Vaihe == OpasVaihe.Puhuu || l.Vaihe == OpasVaihe.Odottaa);
            // Tapit nappirivin yläpuolelle, kun napit näkyvät (junan 148b video 6.10.: oikea tappi peitti näppäimistönapin).
            tapit.Paivita((pysahdys || VapaaTila) && !Auki && !(chat?.Auki ?? false), TapitAla);
            // Kohteen nimilappu pysähdyksellä (myös valikon aikana; chat peittää sen joka tapauksessa).
            nimilappu.Paivita(pysahdys && !(chat?.Auki ?? false) ? l.Nykyinen.Nimi : null);
            float siruAla = krediittiAla;
            if (tapit.Nakyy && siruNakyy)
            {
                float leveys = 0f;
                foreach (var c in sirurivi.Children()) leveys += c.layout.width + 8f;
                float vapaa = Juuri.layout.width - 2f * (OpasTapit.Reuna + OpasTapit.Halkaisija + KuvaRako);
                if (leveys > vapaa) siruAla = krediittiAla + OpasTapit.Halkaisija + KuvaRako;
            }
            if (sirurivi.style.bottom.value.value != siruAla) sirurivi.style.bottom = siruAla;
        }

        // --- oppaan kuvat --------------------------------------------------------------------------------

        void VaihdaKuvat()
        {
            KuvatPaalla = !KuvatPaalla;
            kuvaNappi.Clear();
            kuvaNappi.Add(new SvgIkoni(KuvatPaalla ? Ikonit.PilleriJulisteet : KuvaPoisIkoni));
            kuvaNappi.tooltip = KuvatPaalla ? "Kuvat päällä" : "Kuvat pois";
            Debug.Log("MATKAKIRJA opas: kuvat " + (KuvatPaalla ? "päällä" : "pois"));
        }

        /// <summary>Pysähdyksen ensimmäinen kuva (tai testikuva), kun pysähdys on käynnissä ja kytkin päällä.</summary>
        OpasKuva NykyinenKuva()
        {
            if (!KuvatPaalla) return null;
            var l = OpasSovitin.Viimeisin?.Silmukka;
            if (l == null || l.Nykyinen == null || !(l.Vaihe == OpasVaihe.Puhuu || l.Vaihe == OpasVaihe.Odottaa)) return null;
            if (testiKuva != null) return testiKuva;
            return l.Nykyinen.Kuvat != null && l.Nykyinen.Kuvat.Length > 0 ? l.Nykyinen.Kuvat[0] : null;
        }

        /// <summary>Pysähdyksen kaikki kuvat (testissä testikuvat), ensimmäinen on kortin kuva.</summary>
        IReadOnlyList<OpasKuva> NykyisetKuvat()
        {
            if (testiKuvat != null) return testiKuvat;
            var l = OpasSovitin.Viimeisin?.Silmukka?.Nykyinen;
            return l?.Kuvat ?? (IReadOnlyList<OpasKuva>)Array.Empty<OpasKuva>();
        }
        /// <summary>Testi `ui opasvalikko kuvatesti sarja`: kolme kuvaa samasta kohteesta (+2).</summary>
        OpasKuva[] testiKuvat;

        /// <summary>
        /// Joka ruudulla: kortti oikeaan reunaan sirurivin yläpuolelle (ei peitä vastaussiruja), häivytys 200 ms. Kuva ladataan
        /// nostojen kuvahaulla (NostoSisalto.HaeKuva); epäonnistunut lataus jättää kortin pois.
        /// </summary>
        void PaivitaKuva()
        {
            if (!nakyy) return;
            var k = NykyinenKuva();
            if (k != naytettyKuva)
            {
                naytettyKuva = k;
                AsetaKuvaNakyviin(false);
                if (k != null)
                {
                    int v = ++kuvaVersio;
                    kuvaMerkki.style.display = k.Havainnekuva ? DisplayStyle.Flex : DisplayStyle.None;
                    int muita = NykyisetKuvat().Count - 1;
                    kuvaLaskuri.text = muita > 0 ? "+" + muita : "";
                    kuvaLaskuri.style.display = muita > 0 ? DisplayStyle.Flex : DisplayStyle.None;
                    NostoSisalto.HaeKuva(k.Url, t =>
                    {
                        if (v != kuvaVersio || naytettyKuva != k) return;
                        if (t == null) { Debug.Log("MATKAKIRJA opas: kuva ei latautunut: " + k.Url); return; }
                        kuvaEl.style.backgroundImage = new StyleBackground(t);
                        AsetaKuvaNakyviin(true);
                    });
                }
            }
            if (!kuvaNakyy) return;
            // Vapaassa tilassa havainnekuvan paikalla on Mikä tämä on? -nappi.
            var kd = mikaRivi.style.display == DisplayStyle.Flex ? DisplayStyle.None : DisplayStyle.Flex;
            if (kuvaKortti.style.display != kd) kuvaKortti.style.display = kd;
            float h = Juuri.resolvedStyle.height;
            // Kortti oikean tapin yläpuolelle, kun tapit näkyvät.
            float ala = tapit.Nakyy ? TapitAla + OpasTapit.Halkaisija + KuvaRako : nappiNakyy ? krediittiAla + NappiriviKorkeus + KuvaRako : krediittiAla;
            if (siruNakyy && !float.IsNaN(h) && sirurivi.layout.height > 0) ala = Mathf.Max(ala, h - sirurivi.layout.yMin + KuvaRako);
            // Omistaja 6.10. 16.3x: pikkukuva nappirivin viereen samaan alareunaan, kun leveys riittää (iPad); muuten oikealle ylle.
            bool vieressa = false;
            if (nappiNakyy && napit.childCount > 0 && napit[napit.childCount - 1].worldBound.width > 0)
            {
                float oikea = Juuri.WorldToLocal(napit[napit.childCount - 1].worldBound).xMax;
                float w = Juuri.layout.width;
                if (!float.IsNaN(oikea) && oikea + KuvaRako + KuvaLeveys + OpasTapit.Reuna + OpasTapit.Halkaisija <= w)
                {
                    vieressa = true;
                    if (kuvaKortti.style.left.value.value != oikea + KuvaRako || kuvaKortti.style.left.keyword != StyleKeyword.Undefined) kuvaKortti.style.left = oikea + KuvaRako;
                    kuvaKortti.style.right = StyleKeyword.Auto;
                    ala = krediittiAla;
                }
            }
            if (!vieressa && kuvaKortti.style.right.value.value != 0) { kuvaKortti.style.left = StyleKeyword.Auto; kuvaKortti.style.right = 0; }
            if (kuvaKortti.style.bottom.value.value != ala) kuvaKortti.style.bottom = ala;
        }

        void AsetaKuvaNakyviin(bool nayta)
        {
            if (nayta == kuvaNakyy) return;
            kuvaNakyy = nayta;
            if (nayta)
            {
                kuvaKortti.style.display = DisplayStyle.Flex;
                kuvaKortti.schedule.Execute(() => { if (kuvaNakyy) kuvaKortti.style.opacity = 1f; });
            }
            else
            {
                kuvaKortti.style.opacity = 0f;
                kuvaKortti.schedule.Execute(() => { if (!kuvaNakyy) kuvaKortti.style.display = DisplayStyle.None; }).StartingIn(Tyylikirja.Kesto.Sulku);
            }
        }

        /// <summary>Napautus: nostojen kuvasuurennos (koko ruutu), alla tekijä · lisenssi; havainnekuvan selite HAVAINNEKUVA.</summary>
        void SuurennaKuva()
        {
            var k = naytettyKuva;
            if (k == null) return;
            if (suurennos == null)
            {
                suurennos = new Kuvasuurennos(UiKerros.Hae().Juuri(UiKerros.Valikot)) { Tayteen = true, Kokoruutu = true, LahdeKokoruudussa = true };
                suurennos.AukiMuuttui += auki => OpasSovitin.KuvaSumennus = auki;   // LS1: kaupunkikamera sumeaksi ja seis koko ruudun ajaksi
            }
            var l = OpasSovitin.Viimeisin?.Silmukka?.Nykyinen;
            // Kokoruutuselaus: nostojen Kuvasuurennos sarjana (pyyhkäisy ja ‹ ›), lähderivi ja selite kuvakohtaisesti.
            var kaikki = NykyisetKuvat();
            var sarja = new List<LehtiKuva>();
            foreach (var x in kaikki.Count > 0 ? kaikki : new[] { k })
            {
                string teksti = !string.IsNullOrWhiteSpace(x.Selite) ? x.Selite : l?.Nimi;
                string selite = x.Havainnekuva ? "HAVAINNEKUVA" + (teksti != null ? " · " + teksti : "") : teksti;
                sarja.Add(new LehtiKuva
                {
                    Lahde = x.Url, Lyhyt = selite, Selite = selite,
                    LahdeRivi = string.Join(" · ", new[] { x.Tekija, x.Lisenssi }.Where(y => !string.IsNullOrEmpty(y))),
                });
            }
            suurennos.Avaa(sarja, 0);
            Debug.Log($"MATKAKIRJA opas: kuvat suurennettu ({sarja.Count})");
        }

        /// <summary>Vaihtoehdon napautus: kysymys oppaalle saman chatin kautta (Sieppaa → OpasSovitin.Toive), chat pysyy kiinni.</summary>
        void Valitse(string teksti)
        {
            Debug.Log("MATKAKIRJA opas: valinta \"" + teksti + "\"");
            UiNakymat.Hae()?.Chat?.Kysy(teksti, true);
        }

        void Avaa(Nakyma n)
        {
            // Kysy, Liiku ja ☰ eivät kuulu aloitukseen (simu 17.11: Liiku-lista rakentui aloituksen paikkasarakkeeseen).
            if (aloitus && (n == Nakyma.Paa || n == Nakyma.Kysy || n == Nakyma.Liiku)) aloitus = false;
            nakyma = n;
            AsetaAloitusTyyli();
            Rakenna();
            if (Auki) return;
            Auki = true;
            Asettele();
            valikko.BringToFront();
            Ponnahdus.Avaa(valikko, origo: new TransformOrigin(Length.Percent(100), Length.Percent(0)));
            nappi.AddToClassList("mk-valittu");
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            if (nakyma == Nakyma.Mika) OpasSovitin.MikaTamaPeru();
            if (aloitus) { aloitus = false; valikko.schedule.Execute(() => { if (!Auki) AsetaAloitusTyyli(); }).StartingIn(Tyylikirja.Kesto.Sulku); }
            Ponnahdus.Sulje(valikko);
            nappi.RemoveFromClassList("mk-valittu");
        }

        void Rakenna()
        {
            // Vanhat rivit eivät irtoa heti (juna 144 FAIL, koe 4): UITK voi lähettää seuraavan kosketuksen vielä vanhalle
            // riville (kosketusvälimuisti). Piilossa valikon sisällä ne pysyvät valikon lapsina, joten Napautus näkee
            // kosketuksen ja ohjaa sen kosketuskohdan nykyiselle riville. Edellinen sukupolvi poistetaan seuraavassa rakennuksessa.
            if (vanhat == null)
            {
                vanhat = new VisualElement { pickingMode = PickingMode.Ignore };
                vanhat.style.position = Position.Absolute; vanhat.style.display = DisplayStyle.None;
            }
            vanhat.Clear();
            foreach (var c in valikko.Children().Where(c => c != vanhat).ToList()) vanhat.Add(c);
            valikko.Clear();
            valikko.Add(vanhat);
            rivit = null;
            nykyiset.Clear();
            var kaikki = Kaupungit?.Invoke();
            if (aloitus) RakennaAloitus();
            switch (nakyma)
            {
                case Nakyma.Paa:
                    // Päätoimittaja 5.10. klo 20.4x: pään kolme riviä samalla TOIMINTO-rivipohjalla (kultareunus), Vaihda kohde ›-merkillä.
                    Alanakyma("Vaihda kohde", () => Avaa(Nakyma.Takyt), toiminto: true);
                    // Tauko ja kuvat valikon riveinä, tila tekstissä (omistaja 6.10. 12.1x).
                    Komento(KuvatPaalla ? "Kuvat: päällä" : "Kuvat: pois", VaihdaKuvat);
                    Komento("Näytä teksti", NaytaTeksti);
                    Komento("Tietoja ja lähteet", () => { KrediititTiivis.NaytaKaikki(); Debug.Log("MATKAKIRJA opas: tietoja ja lähteet"); });
                    Viiva();
                    Komento("Poistu linssistä", () => UiNakymat.Hae()?.Linssit?.SuljeLinssi());
                    break;
                case Nakyma.Takyt:
                    if (aloitus) RakennaAloitusPaikat(kaikki); else RakennaTakyt(kaikki);
                    break;
                case Nakyma.Kysy:
                    RakennaKysy();
                    break;
                case Nakyma.Liiku:
                    RakennaLiiku();
                    break;
                case Nakyma.Mika:
                    RakennaMika();
                    break;
                case Nakyma.Aika:
                    RakennaAika();
                    break;
                case Nakyma.Maanosat:
                    Takaisin("Vaihda kohde", Nakyma.Paa);
                    if (kaikki == null || kaikki.Count == 0) { Tyhja("Kaupungit latautuvat…"); break; }
                    foreach (var m in kaikki.Select(k => k.Maanosa).Where(m => !string.IsNullOrEmpty(m)).Distinct().OrderBy(m => m))
                    {
                        string mm = m;
                        Alanakyma(mm, () => { maanosa = mm; Avaa(Nakyma.Maat); });
                    }
                    break;
                case Nakyma.Maat:
                    Takaisin(maanosa, Nakyma.Takyt);
                    Vieritys();
                    foreach (var m in (kaikki ?? Array.Empty<Kaupunki>()).Where(k => k.Maanosa == maanosa).Select(k => k.Maa)
                                 .Where(m => !string.IsNullOrEmpty(m)).Distinct().OrderBy(m => m))
                    {
                        string mm = m;
                        string iso = (kaikki ?? Array.Empty<Kaupunki>()).FirstOrDefault(k => k.Maa == mm && k.Maanosa == maanosa).Iso;
                        Alanakyma(mm, () => { maa = mm; Sano("MaaValittu", new[] { typeof(string) }, iso); Avaa(Nakyma.Kaupungit); }, rivit);
                    }
                    break;
                case Nakyma.Kaupungit:
                    Takaisin(maa, Nakyma.Maat);
                    Vieritys();
                    foreach (var k in (kaikki ?? Array.Empty<Kaupunki>()).Where(k => k.Maa == maa && k.Maanosa == maanosa)
                                 .OrderByDescending(k => k.Vakiluku).Take(Kaupunkeja))
                    {
                        var kk = k;
                        Komento(kk.Nimi, () =>
                        {
                            Debug.Log($"MATKAKIRJA opas: kohde {kk.Nimi} ({kk.Lat:0.###}, {kk.Lon:0.###})");
                            // Juna 146 (Linssiseppä 7ac53d22): ISO:lla, jolloin William sanoo valinnan ja samannimiset kaupungit
                            // (Jerusalem IL/PS) erottuvat; vanha 3-parametrinen koukku varalla.
                            if (!Sano("VaihdaKaupunki", new[] { typeof(string), typeof(double), typeof(double), typeof(string) }, kk.Nimi, kk.Lat, kk.Lon, kk.Iso))
                                KohdeValittu?.Invoke(kk.Nimi, kk.Lat, kk.Lon);
                        }, rivit);
                    }
                    break;
            }
            if (Auki) SovitaKorkeus();
        }

        // --- rivit (LinnaValikon pohja) ---------------------------------------------------------------

        /// <summary>
        /// JUNA 144 FAIL (Laitetestaaja 5.10., Amsterdam; toistettu kokeessa 3 22.36): rivin klikki rakensi listan uudelleen tai
        /// sulki valikon kesken oman PointerUp-käsittelynsä. Osoittimen kaappaus jäi irrotetulle elementille (rivi tai sen
        /// ScrollView), ja SEURAAVA napautus (kaupunkirivi tai ☰) katosi siihen; vasta toinen napautus toimi. Nyt kaappaukset
        /// vapautetaan heti klikissä ja varsinainen teko (uusi näkymä, sulku, kohteen vaihto) ajetaan seuraavassa ruudussa.
        /// </summary>
        void Rivilta(Action teko)
        {
            var p = valikko.panel;
            if (p != null)
                for (int id = 0; id < PointerId.maxPointers; id++)
                    if (p.GetCapturingElement(id) is VisualElement c) c.ReleasePointer(id);
            valikko.schedule.Execute(() =>
            {
                teko();
                // Koe 4 (22.48): kaappauksen vapautus ei riittänyt. UITK:n kosketusvälimuisti ("element under pointer") osoitti
                // ScrollViewn mukana poistettuun riviin, ja seuraava napautus meni sille. Mitätöinti uudelleenrakennuksen jälkeen.
                UiKerros.Hae()?.MitatoiKosketusvalimuisti();
            });
        }

        VisualElement vanhat;
        /// <summary>Nykyisen näkymän rivit ja niiden teot (Napautus).</summary>
        readonly List<(VisualElement Rivi, Action Teko)> nykyiset = new List<(VisualElement, Action)>();
        int painettuRivi = -1, painettuOsoitin = -1;
        Vector2 painettuKohta;

        /// <summary>
        /// RIVIN NAPAUTUS VALIKON TASOLLA (juna 144/145 FAIL, Amsterdam: ensimmäinen napautus uudelleen rakennettuun
        /// ScrollView-listaan katosi kolmessa korjausyrityksessä; toinen toimi). Valikko ratkaisee rivin itse kosketuskohdasta
        /// TrickleDown-vaiheessa ennen ScrollViewia ja rivin nappia, eikä tapahtuma jatku niille (ScrollView ei voi niellä sitä
        /// liikkeen pysäytyksenä, eikä napin oma klikki laukea kahdesti). Yli 8 pt:n liike on vierityseleen alku (Kosketusvieritys
        /// samalla valikolla) ja peruu napautuksen. Toimii myös, jos UITK:n kohde on vanha piilotettu rivi.
        /// </summary>
        /// <summary>Vieritetyn listan rivi on napautettavissa vain listan näkyvällä alueella (ei otsikon alla).</summary>
        static bool Nakyvissa(VisualElement rivi, Vector2 kohta)
        {
            for (var v = rivi.parent; v != null; v = v.parent)
                if (v is ScrollView sv) return sv.contentViewport.worldBound.Contains(kohta);
            return true;
        }

        void Napautus(IPointerEvent e, int vaihe, EventBase eb)
        {
            if (vaihe == 0)
            {
                var kohta = (Vector2)e.position;
                viimeKohta = kohta;
                painettuRivi = nykyiset.FindIndex(r => r.Rivi.panel != null && r.Rivi.resolvedStyle.display != DisplayStyle.None
                                                       && r.Rivi.worldBound.Contains(kohta) && Nakyvissa(r.Rivi, kohta));
                if (painettuRivi < 0) return;
                painettuOsoitin = e.pointerId;
                painettuKohta = e.position;
                eb.StopPropagation();
                return;
            }
            if (painettuRivi < 0 || e.pointerId != painettuOsoitin) return;
            if (vaihe == 1)
            {
                if (((Vector2)e.position - painettuKohta).sqrMagnitude > 64f) painettuRivi = -1; // veto: vieritys, ei napautus
                return;
            }
            int rivi = painettuRivi;
            painettuRivi = -1;
            eb.StopPropagation();
            if (rivi < nykyiset.Count && nykyiset[rivi].Rivi.worldBound.Contains(e.position))
            {
                Debug.Log("MATKAKIRJA opas: valikon rivi " + rivi);
                Rivilta(nykyiset[rivi].Teko);
            }
        }

        /// <summary>
        /// Oppaan valintakutsu heijastuksella (OpasSovitin junan 146 sillasta, Linssiseppä): MaaValittu(iso) ja
        /// VaihdaKaupunki(nimi, lat, lon, iso) sanovat valinnan Williamin äänellä. true = metodi löytyi ja palautti true/void.
        /// </summary>
        static bool Sano(string metodi, Type[] tyypit, params object[] arvot)
        {
            try
            {
                var m = typeof(OpasSovitin).GetMethod(metodi, System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static, null, tyypit, null);
                if (m == null) return false;
                var r = m.Invoke(null, arvot);
                return !(r is bool b) || b;
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA opas: " + metodi + ": " + e.GetType().Name); return false; }
        }

        /// <summary>
        /// TÄKYLUETTELO: Linssivalitsimen väliotsikko ja LINSSIRIVI-pohjan rivit (kuva, nimi, koukkurivi) workerin täkyistä
        /// (OpasSovitin.Takyt; null = latautuu, päivitetään 0,5 s välein), alla "Tai valitse paikka" ja maanosat.
        /// </summary>
        static bool OnTakyja => OpasSovitin.Takyt != null && OpasSovitin.Takyt.Count > 0;


        /// <summary>Aloitus koko ruutuna; Linssisepän varapolku (ei täkyjä → vanha alku kartalle) sulkee sen ilman valintaa.</summary>
        void AvaaAloitus()
        {
            aloitus = true;
            Avaa(Nakyma.Takyt);
            bool avausvalikolla = OpasSovitin.Avausvalikko;
            IVisualElementScheduledItem vahti = null;
            vahti = Juuri.schedule.Execute(() =>
            {
                if (!nakyy || !aloitus || !Auki) { vahti.Pause(); return; }
                avausvalikolla |= OpasSovitin.Avausvalikko;
                if (avausvalikolla && !OpasSovitin.Avausvalikko) { vahti.Pause(); Debug.Log("MATKAKIRJA opas: avausvalikko päättyi ilman valintaa, aloitus kiinni"); Sulje(); }
            }).Every(250);
        }

        /// <summary>Aloituksen teema ja koko ruutu päälle/pois (harmaa lasi ↔ tumma, ponnahdusvalikko ↔ koko ruutu).</summary>
        void AsetaAloitusTyyli()
        {
            valikko.EnableInClassList("tk-teema-harmaa", !aloitus);
            valikko.EnableInClassList("tk-teema-tumma", aloitus);
            valikko.EnableInClassList("mk-opas-aloitus", aloitus);
            if (!aloitus)
            {
                valikko.RemoveFromClassList("mk-opas-aloitus--pino");
                valikko.style.left = StyleKeyword.Null; valikko.style.bottom = StyleKeyword.Null;
                valikko.style.paddingLeft = valikko.style.paddingRight = valikko.style.paddingTop = valikko.style.paddingBottom = StyleKeyword.Null;
            }
        }

        /// <summary>Koko ruutu turva-alueen sisennyksin; puhelimella pystyssä sarakkeet päällekkäin.</summary>
        void AsetteleAloitus()
        {
            var r = uiKerros.Reunat(kerrosNro);
            valikko.style.top = 0; valikko.style.right = 0; valikko.style.left = 0; valikko.style.bottom = 0;
            valikko.style.maxHeight = StyleKeyword.Null;
            valikko.style.paddingLeft = r.x + Tyylikirja.Vali.L; valikko.style.paddingRight = r.z + Tyylikirja.Vali.L;
            valikko.style.paddingTop = r.y + Tyylikirja.Vali.L; valikko.style.paddingBottom = r.w + Tyylikirja.Vali.L;
            // Ruudun mitoista (simu 15.45: paneelin asettelu ei ollut vielä valmis, ja puhelin jäi kahdelle sarakkeelle).
            bool pino = !UiKerros.Tabletti && Screen.height > Screen.width;
            valikko.EnableInClassList("mk-opas-aloitus--pino", pino);
        }

        /// <summary>Kaksi saraketta: paikat (vasen / ylä) ja suosikit (oikea / ala).</summary>
        void RakennaAloitus()
        {
            ScrollView Lista(VisualElement isa)
            {
                var l = new ScrollView(ScrollViewMode.Vertical)
                { verticalScrollerVisibility = ScrollerVisibility.Hidden, horizontalScrollerVisibility = ScrollerVisibility.Hidden };
                l.AddToClassList("mk-opas-aloitus__lista");
                l.touchScrollBehavior = ScrollView.TouchScrollBehavior.Clamped;
                l.scrollDecelerationRate = 0f;
                isa.Add(l);
                return l;
            }
            aloitusVasen = Rakenne.El("mk-opas-aloitus__sarake mk-opas-aloitus__sarake--paikat", valikko, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("VALITSE PAIKKA", "mk-linssivalitsin__valiotsikko", aloitusVasen), Kirjasin.ModerniLihava);
            aloitusPaikat = Lista(aloitusVasen);
            aloitusOikea = Rakenne.El("mk-opas-aloitus__sarake", valikko, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("SUOSIKIT", "mk-linssivalitsin__valiotsikko", aloitusOikea), Kirjasin.ModerniLihava);
            aloitusSuosikit = Lista(aloitusOikea);
            if (OnTakyja) foreach (var t in OpasSovitin.Takyt.Take(SuosikitMax)) TakyRivi(t, aloitusSuosikit);
            else
            {
                Kirjasimet.Aseta(Rakenne.Teksti("Suosikit latautuvat…", "mk-linssivalikko__lahde", aloitusSuosikit), Kirjasin.Moderni);
                // Täkyt saapuvat: vain suosikkisarake täyttyy (paikkasarake ja sen vieritys pysyvät).
                var sarake = aloitusSuosikit;
                sarake.schedule.Execute(() =>
                {
                    if (!aloitus || aloitusSuosikit != sarake || !OnTakyja) return;
                    sarake.Clear();
                    foreach (var t in OpasSovitin.Takyt.Take(SuosikitMax)) TakyRivi(t, sarake);
                }).Every(500).Until(() => !aloitus || aloitusSuosikit != sarake || OnTakyja && sarake.childCount > 1);
            }
            AsetteleAloitus();
        }

        /// <summary>Aloituksen paikkasarake: maanosat (sisältö vaihtuu sarakkeessa › maa › kaupunki) ja Poistu linssistä.</summary>
        void RakennaAloitusPaikat(IReadOnlyList<Kaupunki> kaikki)
        {
            Vieritys();
            if (kaikki == null || kaikki.Count == 0) Tyhja("Kaupungit latautuvat…");
            else foreach (var m in kaikki.Select(k => k.Maanosa).Where(m => !string.IsNullOrEmpty(m)).Distinct().OrderBy(m => m))
            {
                string mm = m;
                Alanakyma(mm, () => { maanosa = mm; Avaa(Nakyma.Maat); });
            }
            Viiva();
            Komento("Poistu linssistä", () => UiNakymat.Hae()?.Linssit?.SuljeLinssi());
        }

        void RakennaTakyt(IReadOnlyList<Kaupunki> kaikki)
        {
            Vieritys();
            // Ilman täkyjä (ei vastausta tai tyhjä) ei tyhjää otsikkoa eikä latausriviä: pelkät maanosat kuten ennen täkyjä.
            // Lista ei myöskään rakennu uudelleen täkyjen saapuessa, jotta rivit eivät siirry sormen alta.
            if (OnTakyja)
            {
                Kirjasimet.Aseta(Rakenne.Teksti("MIHIN LENNETÄÄN?", "mk-linssivalitsin__valiotsikko", rivit), Kirjasin.ModerniLihava);
                foreach (var t in OpasSovitin.Takyt) TakyRivi(t);
                Kirjasimet.Aseta(Rakenne.Teksti("TAI VALITSE PAIKKA", "mk-linssivalitsin__valiotsikko", rivit), Kirjasin.ModerniLihava);
            }
            if (kaikki == null || kaikki.Count == 0) { Kirjasimet.Aseta(Rakenne.Teksti("Kaupungit latautuvat…", "mk-linssivalikko__lahde", rivit), Kirjasin.Moderni); return; }
            foreach (var m in kaikki.Select(k => k.Maanosa).Where(m => !string.IsNullOrEmpty(m)).Distinct().OrderBy(m => m))
            {
                string mm = m;
                Alanakyma(mm, () => { maanosa = mm; Avaa(Nakyma.Maat); }, rivit);
            }
        }

        void TakyRivi(Matkakirja.Linssit.Kierros.OpasTaky t, VisualElement isa = null)
        {
            Action teko = () => { Sulje(); Debug.Log("MATKAKIRJA opas: täky " + t.Nimi); OpasSovitin.Valitse(t); };
            var b = Rakenne.Nappi(null, "mk-linssirivi mk-opas-taky", () => Rivilta(teko), isa ?? rivit);
            b.tooltip = t.Nimi;
            // Kuvapaikka vain kuvalliselle suosikille (Pelikoodari 6.10.: /opas/kohteet?n=50, kuva voi olla null).
            if (!string.IsNullOrEmpty(t.KuvaUrl))
            {
                var kehys = Rakenne.El("mk-linssirivi__ikoni mk-linssirivi__kuva", b, PickingMode.Ignore);
                NostoSisalto.HaeKuva(t.KuvaUrl, tex => { if (tex != null && kehys.panel != null) kehys.style.backgroundImage = new StyleBackground(tex); });
            }
            var tekstit = Rakenne.El("mk-linssirivi__tekstit", b, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(t.Nimi ?? "", "mk-linssirivi__nimi", tekstit), Kirjasin.ModerniLihava);
            if (!string.IsNullOrEmpty(t.Koukku)) Kirjasimet.Aseta(Rakenne.Teksti(t.Koukku, "mk-linssirivi__lyhyt", tekstit), Kirjasin.Moderni);
            nykyiset.Add((b, teko));
        }

        Button lopetaNappi;
        bool? testiLopeta;
        Button aikaNappi;
        string aikaKuvake;
        static readonly (string Arvo, string Nimi)[] AikaValinnat = { ("auto", "Automaattinen"), ("aamu", "Aamu"), ("paiva", "Päivä"), ("ilta", "Ilta") };

        /// <summary>LS1: OpasSovitin.VuorokausiValinta (auto | aamu | paiva | ilta) heijastuksella; oletus auto.</summary>
        static string AikaValinta
        {
            get { try { return typeof(OpasSovitin).GetProperty("VuorokausiValinta", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static)?.GetValue(null) as string ?? "auto"; } catch { return "auto"; } }
            set { try { typeof(OpasSovitin).GetProperty("VuorokausiValinta", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static)?.SetValue(null, value); } catch (Exception e) { Debug.LogWarning("MATKAKIRJA opas: VuorokausiValinta: " + e.GetType().Name); } }
        }

        /// <summary>LS1: OpasSovitin.VuorokausiNyt (aamu | paiva | ilta | yo) heijastuksella; oletus paiva.</summary>
        static string AikaNyt
        {
            get { try { return typeof(OpasSovitin).GetProperty("VuorokausiNyt", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static)?.GetValue(null) as string ?? "paiva"; } catch { return "paiva"; } }
        }

        void PaivitaAika()
        {
            string nyt = AikaNyt, val = AikaValinta;
            string k = nyt + (val == "auto" ? ":A" : "");
            if (k != aikaKuvake && Ikonit.Viiva.TryGetValue(nyt, out var svg))
            {
                aikaKuvake = k;
                aikaNappi.Clear();
                aikaNappi.Add(new SvgIkoni(svg));
                if (val == "auto") Kirjasimet.Aseta(Rakenne.Teksti("A", "mk-ohjausnappi__merkki", aikaNappi), Kirjasin.ModerniLihava);
                aikaNappi.tooltip = "Vuorokaudenaika: " + (AikaValinnat.FirstOrDefault(x => x.Arvo == val).Nimi ?? val);
            }
            if (aikaNappi.parent?.panel != null && Juuri.panel != null) nimilappu.Este = Juuri.WorldToLocal(aikaNappi.parent.worldBound);
        }

        void RakennaAika()
        {
            Kirjasimet.Aseta(Rakenne.Teksti("VUOROKAUDENAIKA", "mk-linssivalitsin__valiotsikko", valikko), Kirjasin.ModerniLihava);
            string val = AikaValinta;
            foreach (var (arvo, nimi) in AikaValinnat)
            {
                string a = arvo;
                Komento(nimi + (a == val ? "  ✓" : ""), () => { AikaValinta = a; aikaKuvake = null; Debug.Log("MATKAKIRJA opas: vuorokaudenaika " + a); });
            }
        }

        void LopetaKierros()
        {
            Debug.Log("MATKAKIRJA opas: lopeta kierros");
            testiLopeta = null;
            OpasSovitin.LopetaKierros();
        }

        /// <summary>Pause-nappi II ↔ ▶ oppaan tauon mukaan (Linssisepän OpasSovitin.Tauolla).</summary>
        void PaivitaTauko()
        {
            if (!nakyy) return;
            // ■ myös keskeytetylle kierrokselle (LS1: KierrosKaynnissa || KierrosJatkettavissa).
            PaivitaAika();
            var ld = (testiLopeta ?? (OpasSovitin.KierrosKaynnissa || KierrosKeskeytetty)) ? DisplayStyle.Flex : DisplayStyle.None;
            if (lopetaNappi.style.display != ld) lopetaNappi.style.display = ld;
            bool tauolla = OpasSovitin.Tauolla;
            if (tauolla == taukoNakyy) return;
            taukoNakyy = tauolla;
            taukoNappi.Clear();
            taukoNappi.Add(new SvgIkoni(tauolla ? Ikonit.Toista : Ikonit.Tauko));
            taukoNappi.tooltip = tauolla ? "Jatka" : "Tauko";
            taukoNappi.EnableInClassList("mk-valittu", tauolla);
        }

        Button Komento(string teksti, Action teko, VisualElement isa = null)
        {
            Action t = () => { Sulje(); teko(); };
            var b = Rakenne.Nappi(teksti, "mk-linssivalikko__kohta mk-linssivalikko__komento", () => Rivilta(t), isa ?? Kohde);
            nykyiset.Add((b, t));
            Kirjasimet.Aseta(b, Kirjasin.Moderni);
            b.tooltip = teksti;
            return b;
        }

        void Alanakyma(string teksti, Action avaa, VisualElement isa = null, bool toiminto = false)
        {
            var b = Rakenne.Nappi(null, "mk-linssivalikko__kohta " + (toiminto ? "mk-linssivalikko__komento" : "mk-linssivalikko__kytkin"), () => Rivilta(avaa), isa ?? Kohde);
            nykyiset.Add((b, avaa));
            if (toiminto) { b.style.flexDirection = FlexDirection.Row; b.style.alignItems = Align.Center; b.style.justifyContent = Justify.SpaceBetween; }
            Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-linssivalikko__nimi", b), Kirjasin.Moderni);
            Kirjasimet.Aseta(Rakenne.Teksti("›", "mk-linssivalikko__tila", b), Kirjasin.ModerniLihava);
            b.tooltip = teksti;
        }

        void Takaisin(string otsikko, Nakyma minne)
        {
            Action t = () => Avaa(minne);
            var b = Rakenne.Nappi(null, "mk-linssivalikko__kohta mk-linssivalikko__kytkin", () => Rivilta(t), Kohde);
            nykyiset.Add((b, t));
            Kirjasimet.Aseta(Rakenne.Teksti("‹ " + otsikko, "mk-linssivalikko__nimi", b), Kirjasin.ModerniLihava);
            b.tooltip = "Takaisin";
            Viiva();
        }

        void Tyhja(string teksti) => Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-linssivalikko__lahde", Kohde), Kirjasin.Moderni);

        void Viiva() => Rakenne.El("mk-linssivalikko__viiva", Kohde, PickingMode.Ignore);

        void Vieritys()
        {
            if (aloitus && aloitusPaikat != null) { rivit = aloitusPaikat; return; }
            rivit = new ScrollView(ScrollViewMode.Vertical)
            { verticalScrollerVisibility = ScrollerVisibility.Hidden, horizontalScrollerVisibility = ScrollerVisibility.Hidden };
            rivit.style.flexShrink = 1;
            rivit.style.minHeight = 0; // omistaja 16.3x: pitkä lista meni ruudun yli (ScrollView ei kutistunut sisältöään pienemmäksi)
            // UITK:n oma kosketusvieritys pois (Kosketusvieritys hoitaa vedon): ei elastista ylitystä eikä inertiaa, jonka
            // pysäytys söi ensimmäisen napautuksen uuteen listaan.
            rivit.touchScrollBehavior = ScrollView.TouchScrollBehavior.Clamped;
            rivit.scrollDecelerationRate = 0f;
            valikko.Add(rivit);
        }

        /// <summary>Lista napin alle, oikea reuna napin oikeaan reunaan (LinnaValikko.Asettele).</summary>
        void Asettele()
        {
            var isa = valikko.parent;
            if (isa == null) return;
            if (aloitus) { AsetteleAloitus(); return; }
            if (nakyma == Nakyma.Aika && aikaNappi != null)
            {
                // Vuorokaudenajan lista vasemman yläkulman napin alle.
                var an = aikaNappi.worldBound;
                var ay = isa.WorldToLocal(new Vector2(an.xMin, an.yMax));
                valikko.style.top = ay.y + 8; valikko.style.left = ay.x; valikko.style.right = StyleKeyword.Auto;
                SovitaKorkeus();
                return;
            }
            valikko.style.left = StyleKeyword.Auto;
            var n = nappi.worldBound;
            var yla = isa.WorldToLocal(new Vector2(n.xMax, n.yMax));
            float leveys = isa.resolvedStyle.width;
            valikko.style.top = yla.y + 8;
            valikko.style.right = float.IsNaN(leveys) ? 10 : Mathf.Max(0, leveys - yla.x);
            SovitaKorkeus();
        }

        /// <summary>Valikko turva-alueen sisään; pitkät listat (maat, kaupungit) vierittyvät.</summary>
        void SovitaKorkeus()
        {
            if (!Auki || aloitus) return;
            var isa = valikko.parent;
            float korkeus = isa != null ? isa.resolvedStyle.height : float.NaN;
            float ylaR = valikko.resolvedStyle.top;
            if (float.IsNaN(korkeus) || korkeus <= 0 || float.IsNaN(ylaR)) { valikko.schedule.Execute(SovitaKorkeus).StartingIn(16); return; }
            float sk = Screen.height > 0 ? korkeus / Screen.height : 1f;
            valikko.style.maxHeight = Mathf.Max(120f, korkeus - ylaR - Screen.safeArea.yMin * sk - 8f);
        }

        void TarkistaOhiNapautus()
        {
            if (!Auki) return;
            var osoitin = Pointer.current;
            if (osoitin == null || !osoitin.press.wasPressedThisFrame || valikko.panel == null) return;
            var ruutu = osoitin.position.ReadValue();
            var p = RuntimePanelUtils.ScreenToPanel(valikko.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            if (!valikko.worldBound.Contains(p) && !nappi.worldBound.Contains(p)) Sulje();
        }

        /// <summary>Testikomento `ui opasvalikko valikko|maanosat|maat <maanosa>|kaupungit <maanosa>|<maa>|sulje`.</summary>
        public string Komento(string mita)
        {
            var o = (mita ?? "").Split(new[] { ' ' }, 2, StringSplitOptions.RemoveEmptyEntries);
            string k = o.Length > 0 ? o[0] : "valikko";
            Nayta(true);
            switch (k)
            {
                case "sulje": Sulje(); return "opas: valikko kiinni";
                case "teksti": NaytaTeksti(); return "opas: teksti auki";
                case "kuvatesti":
                    testiKuva = new OpasKuva
                    {
                        Url = o.Length > 1 && o[1].StartsWith("http") ? o[1]
                            : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Nyhavn%2C_Copenhagen%2C_20220618_1728_7354.jpg/960px-Nyhavn%2C_Copenhagen%2C_20220618_1728_7354.jpg",
                        Havainnekuva = o.Length > 1 && o[1] == "havainne", Tekija = o.Length > 1 && o[1] == "havainne" ? null : "Jakub Hałun", Lisenssi = "CC BY-SA 4.0",
                        Lahde = "https://commons.wikimedia.org/wiki/File:Nyhavn,_Copenhagen,_20220618_1728_7354.jpg", Selite = "Nyhavnin kanava",
                    };
                    naytettyKuva = null;
                    return "opas: testikuva" + (testiKuva.Havainnekuva ? " (havainnekuva)" : "");
                case "kuvat": VaihdaKuvat(); return "opas: kuvat " + (KuvatPaalla ? "päällä" : "pois");
                case "suurenna": SuurennaKuva(); return "opas: suurennos " + (naytettyKuva != null ? "auki" : "ei kuvaa");
                case "suurennos": return "opas: " + (suurennos?.Tausta() ?? "suurennos ei luotu");
                case "kuvasarja":
                    testiKuvat = new[]
                    {
                        new OpasKuva { Url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Nyhavn%2C_Copenhagen%2C_20220618_1728_7354.jpg/960px-Nyhavn%2C_Copenhagen%2C_20220618_1728_7354.jpg", Tekija = "Jakub Hałun", Lisenssi = "CC BY-SA 4.0", Selite = "Nyhavnin kanava" },
                        new OpasKuva { Url = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Copenhagen_-_Rundet%C3%A5rn_-_2013.jpg/960px-Copenhagen_-_Rundet%C3%A5rn_-_2013.jpg", Tekija = "Commons", Lisenssi = "CC BY-SA", Selite = "Pyöreä torni" },
                        new OpasKuva { Url = "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Christiansborg_Slot.jpg/960px-Christiansborg_Slot.jpg", Tekija = "Commons", Lisenssi = "CC BY-SA", Selite = "Christiansborg" },
                    };
                    testiKuva = testiKuvat[0];
                    naytettyKuva = null;
                    return "opas: testikuvasarja (3)";
                case "peitto": return Peitto();
                case "tapit": return "opas: " + tapit.Kuvaus();
                case "nimilappu": return "opas: " + nimilappu.Kuvaus();
                case "kuva":
                    var kb = kuvaKortti.worldBound;
                    return $"opas: kuva {(kuvaNakyy ? "näkyy" : "piilossa")} {naytettyKuva?.Url ?? "-"}, kortti {kb.xMin:0},{kb.yMin:0} {kb.width:0}×{kb.height:0}, kytkin {(KuvatPaalla ? "päällä" : "pois")}";
                case "lopeta":
                    testiLopeta = o.Length > 1 ? o[1] != "pois" : true;
                    return "opas: lopeta kierros " + (testiLopeta == true ? "näkyy (testi)" : "pois");
                case "mika":
                    testiMika = o.Length > 1 ? o[1] != "pois" : true;
                    return "opas: mikä tämä on " + (testiMika == true ? "näkyy (testi)" : "pois");
                case "aika":
                    Avaa(Nakyma.Aika); return "opas: vuorokaudenaika " + AikaValinta + " / " + AikaNyt;
                case "jatka":
                    testiJatka = o.Length > 1 ? o[1] != "pois" : true;
                    return "opas: jatka kierrosta " + (testiJatka == true ? "näkyy (testi)" : "pois");
                case "napit":
                {
                    var r = napit.worldBound;
                    var osat = napit.Children().Select(c => $"{c.tooltip} {c.worldBound.width:0}×{c.worldBound.height:0}").ToArray();
                    return $"opas: napit {(nappiNakyy ? "näkyy" : "piilossa")} @ {r.xMin:0},{r.yMin:0} {r.width:0}×{r.height:0}, keskikohta {r.center.x:0}/{(Juuri.panel?.visualTree.layout.width ?? 0) / 2:0}: {string.Join(" | ", osat)}";
                }
                case "kysy": Avaa(Nakyma.Kysy); return "opas: kysy-lista";
                case "krediitit": return "opas: " + KrediititTiivis.Kuvaus();
                case "lahteet": KrediititTiivis.NaytaKaikki(); return "opas: lähteet näkyviin";
                case "siirtyma":
                {
                    // ui opasvalikko siirtyma <nimi> | siirtyma 0.5 | siirtyma valmis
                    string a = o.Length > 1 ? string.Join(" ", o.Skip(1)) : "Rooma";
                    if (a == "valmis") { SiirtymaValmis(); return "opas: siirtymä valmis"; }
                    if (float.TryParse(a, System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out float f)) { testiEdistyminen = f; return $"opas: siirtymä {f:0.00}"; }
                    SiirtymaAlkaa(a); return "opas: siirtymä → " + a;
                }
                case "liiku": Avaa(Nakyma.Liiku); return "opas: liiku-lista";
                case "vanhatsirut": VanhatSirut = !VanhatSirut; return "opas: vanhat sirut " + VanhatSirut;
                case "sirut":
                    var c = UiNakymat.Hae()?.Chat;
                    var sb = sirurivi.worldBound;
                    return $"opas: sirut {(siruNakyy ? "näkyy" : "piilossa")} [{string.Join(" | ", c?.OppaanJatkot ?? Array.Empty<string>())}], "
                         + $"kertoja {(OpasSovitin.KertojaPuhuu ? "puhuu" : "hiljaa")}, rivi {sb.xMin:0},{sb.yMin:0} {sb.width:0}×{sb.height:0}";
                case "maanosat": Avaa(Nakyma.Maanosat); return "opas: maanosat";
                case "takyt": Avaa(Nakyma.Takyt); return $"opas: täkyt ({OpasSovitin.Takyt?.Count.ToString() ?? "latautuu"})";
                case "tauko": OpasSovitin.Tauko(!OpasSovitin.Tauolla); return "opas: tauolla " + OpasSovitin.Tauolla;
                case "maat": maanosa = o.Length > 1 ? o[1] : maanosa; Avaa(Nakyma.Maat); return "opas: maat " + maanosa;
                case "kaupungit":
                    var p = o.Length > 1 ? o[1].Split('|') : new string[0];
                    if (p.Length == 2) { maanosa = p[0]; maa = p[1]; }
                    Avaa(Nakyma.Kaupungit);
                    return $"opas: kaupungit {maanosa} / {maa}";
                default: Avaa(Nakyma.Paa); return "opas: valikko (" + (Kaupungit?.Invoke()?.Count ?? 0) + " kaupunkia)";
            }
        }
    }
}
