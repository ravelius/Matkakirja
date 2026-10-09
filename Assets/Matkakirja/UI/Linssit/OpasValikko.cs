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
using Matkakirja.Linssit;
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

        // KAUPUNKIOPAS KARTTAELEMENTTINÄ (omistaja 7.10. 08.3x, Päätoimittaja; LS1:n kaupunkitila): kartan kuumailmapallo avaa yhden
        // kaupungin oppaan. Silloin ei aloitusvalintaa (täkyt / paikat) eikä ☰:n Vaihda kohde -riviä; laaja Elävä opas ennallaan.
        /// <summary>LS1 OpasSovitin.Kaupunkitila (linssiseppa/kaupunkitila-159): opas avattiin kartan elementistä yhteen kaupunkiin.
        /// Testi `ui opasvalikko kaupunkitila on|off|auto`; LS1:n testi `opas kaupunkitila Praha`.</summary>
        public static Func<bool> KaupunkitilaKysely = () => OpasSovitin.Kaupunkitila;
        static bool? testiKaupunkitila;
        static bool Kaupunkitila => testiKaupunkitila ?? (KaupunkitilaKysely?.Invoke() ?? false);

        // SALLITUT KAUPUNGIT (omistaja 7.10. 00.4x, Päätoimittaja: vapaa haku pois, pelaajat vain hyvän 3D:n kaupunkeihin; juna 157):
        // Vaihda kohde ja aloitusvalikon paikat näyttävät vain LS1:n OpasSovitin.SallitutKaupungit-listan kaupungit (maanosa › maa ›
        // kaupunki karsiutuu niiden mukaan). Tyhjä lista = palvelin ei vielä palauta kenttää → ei rajausta (vanha lista varalla).
        // Vastaavuus nimellä (kirjainkoosta riippumatta) tai alle SallittuKm:n päässä keskipisteestä (nimen kirjoitusasu voi erota).
        const double SallittuKm = 25.0;

        // Simu 04.35: 36 sallittua → 46 riviä (lähiöt 25 km:n sisällä) ja Kreeta puuttui (ei samannimistä asutuspaikkaa). Nyt
        // jokaisesta sallitusta tasan yksi rivi sallitun omalla nimellä ja paikalla; maa ja maanosa samannimisestä tai lähimmästä
        // asutuspaikasta (enintään MaaHakuKm). Tulos välimuistiin listan ja aineiston mukaan.
        const double MaaHakuKm = 250.0;
        static IReadOnlyList<Kaupunki> sallitutVali;
        static object sallitutAvain, kaikkiAvain;

        static IReadOnlyList<Kaupunki> VainSallitut(IReadOnlyList<Kaupunki> kaikki)
        {
            var s = OpasSovitin.SallitutKaupungit;
            if (kaikki == null || s == null || s.Count == 0) return kaikki;
            if (ReferenceEquals(s, sallitutAvain) && ReferenceEquals(kaikki, kaikkiAvain)) return sallitutVali;
            var tulos = new List<Kaupunki>();
            foreach (var t in s)
            {
                Kaupunki? paras = null; double lahin = double.MaxValue;
                foreach (var k in kaikki)
                {
                    if (string.Equals(k.Nimi, t.Nimi, StringComparison.OrdinalIgnoreCase) && EtaisyysKm(k.Lat, k.Lon, t.Lat, t.Lon) < MaaHakuKm) { paras = k; break; }
                    double e = EtaisyysKm(k.Lat, k.Lon, t.Lat, t.Lon);
                    if (e < lahin && e < MaaHakuKm) { lahin = e; paras = k; }
                }
                if (paras is Kaupunki p) tulos.Add(new Kaupunki(t.Nimi, p.Maa, p.Maanosa, t.Lat, t.Lon, p.Vakiluku, p.Iso));
                else Debug.Log($"MATKAKIRJA opas: sallittu {t.Nimi} ilman maata (ei asutuspaikkaa {MaaHakuKm:0} km:n sisällä)");
            }
            sallitutAvain = s; kaikkiAvain = kaikki; sallitutVali = tulos;
            return tulos;
        }

        /// <summary>Suosikit (täkyt) vain sallituilta alueilta (LS1 SallittuPiste; tyhjä lista = kaikki).</summary>
        static IEnumerable<OpasTaky> SallitutTakyt() =>
            (OpasSovitin.Takyt ?? (IReadOnlyList<OpasTaky>)Array.Empty<OpasTaky>()).Where(t => OpasSovitin.SallittuPiste(t.Lat, t.Lon));

        void Torjunta(string t)
        {
            if (!nakyy) return;
            var chat = UiNakymat.Hae()?.Chat;
            Debug.Log("MATKAKIRJA opas: torjunta tekstinä (" + ((chat?.Auki ?? false) ? "chat" : "kertojan laatikko") + ")");
            if (chat?.Auki ?? false) chat.Vastaa(t); else KierrosTaulu.Ilmoitus(t);
        }

        static double EtaisyysKm(double la1, double lo1, double la2, double lo2)
        {
            double r = Math.PI / 180.0, dla = (la2 - la1) * r, dlo = (lo2 - lo1) * r;
            double a = Math.Sin(dla / 2) * Math.Sin(dla / 2) + Math.Cos(la1 * r) * Math.Cos(la2 * r) * Math.Sin(dlo / 2) * Math.Sin(dlo / 2);
            return 6371.0 * 2.0 * Math.Asin(Math.Min(1.0, Math.Sqrt(a)));
        }
        static readonly Dictionary<string, string> Maanosat = new Dictionary<string, string>
        {
            ["Europe"] = "ui.manner.eurooppa", ["Asia"] = "ui.manner.aasia", ["Africa"] = "ui.manner.afrikka", ["North America"] = "ui.manner.pohjois-amerikka",   // arvot Kieli.T-avaimia
            ["South America"] = "ui.manner.etela-amerikka", ["Oceania"] = "ui.manner.oseania", ["Antarctica"] = "ui.manner.etelamanner", ["Seven seas (open ocean)"] = "ui.manner.valtameret",
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
                        string mo = c.Count > 5 && c[5] is string m ? (Maanosat.TryGetValue(m, out var fi) ? Kieli.T(fi) : m) : Kieli.T("ui.opas.kaikki-maat");
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

        /// <summary>Editorin Play-tila ilman domain reloadia (asettelutesti): vanha instanssi viittaisi tuhottuun UiKerrokseen.</summary>
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaViimeisin() => Viimeisin = null;

        const int Kaupunkeja = 12;

        VisualElement napit, rivinIkkuna, liuku;
        Button mikkiNappi, vakanen;
        // VÄKÄNEN (omistaja 6.10. 19.5x, Päätoimittaja): Kysy, Liiku, mikki ja näppäimistö piilossa vasemman reunan OHJAUSNAPPI-
        // väkäsen › alla; napautus liu'uttaa ne esiin oikealle (--tk-kesto-liuku 240 ms) ja väkänen kääntyy ‹:ksi. Rivi sulkeutuu
        // väkäsestä tai napin valinnasta. Ensimmäisellä kerralla rivi on 3 s auki ja liukuu sitten väkäsen alle.
        const string EsittelyAvain = "matkakirja-opas-nappirivi-esitelty";
        const int EsittelyMs = 3000;
        bool riviAuki;
        IVisualElementScheduledItem esittely;
        bool nappiNakyy;
        enum Nakyma { Paa, Takyt, Maanosat, Maat, Kaupungit, Kysy, Liiku, Mika, Aika, Lahteet, Aanet }

        /// <summary>Oppaan linssi auki (✕ pois, LinssiUi.PaivitaSulku).</summary>
        public static bool Nakyy => Viimeisin != null && Viimeisin.nakyy;

        /// <summary>Alarivin (väkänen tai kierroksen esitysrivi) yläreuna paneelin koordinaateissa, kun rivi näkyy; muuten null.
        /// NytRivi asettuu tämän yläpuolelle (LS1:n kuva-arkki beb3fe9d, iPad vaaka: rivi peitti väkäsen alareunan).</summary>
        internal static float? AlarivinYla
        {
            get
            {
                var v = Viimeisin;
                if (v == null || !v.nakyy) return null;
                var r = v.esitysNakyy ? v.esitysRivi : v.nappiNakyy ? v.napit : null;
                return r != null && r.panel != null && r.resolvedStyle.display == DisplayStyle.Flex ? r.worldBound.yMin : (float?)null;
            }
        }

        public readonly VisualElement Juuri;
        readonly VisualElement ryhma, valikko, sirurivi;
        readonly Button puhuSiru, taukoNappi, seuraavaNappi;
        // OHJAINRIVI (omistaja 6.10. 23.3x, juna 156): ‖/▶ ja ›| OHJAUSNAPPI-ryhmänä oikean tapin alla (iPhonella tapin ja
        // nappirivin välissä); näkyy koko oppaan ajan, myös lennolla, joten tauko ei enää ole ☰:n vieressä.
        readonly VisualElement ohjainRivi;
        bool taukoNakyy;
        // OPPAAN KUVAT (omistaja 5.10.2026 klo 19.3x): pieni kuvakortti NOSTOKORTTI-pohjan kuvakehyksellä pysähdyksen ajan,
        // napautus → nostojen kuvasuurennos tekijä- ja lisenssirivein; havainnekuva aina merkitty HAVAINNEKUVA. Kytkin oikeassa
        // yläkulmassa OHJAUSNAPPI-pohjalla (julistekuvake, pois-tilassa vino viiva), oletus päällä, valinta muistetaan.
        const string KuvatAvain = "matkakirja-opas-kuvat";
        const string KuvaPoisIkoni = Ikonit.PilleriJulisteet + "<path d=\"M3.2 3.6 20.8 20.4\"/>";
        const float KuvaRako = 8f;
        // KUVANAPPI (omistaja 6.10. 19.5x): pieni neliö nappi.ohjaus-iso (56 pt) iPhonella, iPadilla samassa suhteessa ruudun
        // lyhyeen sivuun; kulma.nappi, ei kehystä; nipun kuvamäärä pienenä numeropäänä. HAVAINNEKUVA vain kokoruudun lähderivillä.
        const float KuvaViiteLyhyt = 393f;
        float KuvaKoko
        {
            get
            {
                float lyhyt = Mathf.Min(Juuri.layout.width, Juuri.layout.height);
                // Omistaja 7.10. 21.4x ("vievät nyt liikaa huomiota"): pienemmäksi, iPadilla enintään 1,15 × (ennen ruudun suhteessa ~2 ×),
                // puhelimella nappi.ohjaus (40) iso-koon (56) sijaan.
                float suhde = UiKerros.Tabletti && lyhyt > 0f && !float.IsNaN(lyhyt) ? Mathf.Clamp(lyhyt / KuvaViiteLyhyt, 1f, 1.15f) : 1f;
                return Mathf.Round((UiKerros.Tabletti ? Tyylikirja.Nappi.OhjausIso : Tyylikirja.Nappi.Ohjaus) * suhde);
            }
        }
        readonly VisualElement kuvaKortti, kuvaEl;
        readonly OpasKuvanosto kuvanosto;
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
        float TapitAla => nappiNakyy || esitysNakyy ? krediittiAla + NappiriviKorkeus + KuvaRako : krediittiAla;
        /// <summary>Ohjainrivin (‖ ›|) alareuna; tapit sen yläpuolella (PaivitaTapit).</summary>
        float ohjainAla;
        /// <summary>Tapit sisemmäs ja ylemmäs leveällä ruudulla (omistaja 6.10. 23.3x, juna 156: iPadilla peukalot eivät ulotu
        /// alakulmiin): tapin keskikohta 17 % leveydestä reunasta ja kolmasosa korkeudesta alhaalta. Puhelimella kulmissa.</summary>
        const float TappiSivuOsuus = 0.17f, TappiKorkeusOsuus = 1f / 3f, LeveaLyhyt = 600f;
        bool LeveaRuutu => Mathf.Min(Juuri.layout.width, Juuri.layout.height) >= LeveaLyhyt;
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
            Matkakirja.Linssit.YksityiskohtaKortti.Napit = NappienLaatikot;
            kerros.TurvaMuuttui += () => { if (aloitus && Auki) AsetteleAloitus(); }; // kierto aloituksen aikana
            Juuri = Rakenne.El("mk-linnavalikko", kerros.Turva(kerrosNro), PickingMode.Ignore);
            Juuri.style.position = Position.Absolute;
            Juuri.style.left = 0; Juuri.style.right = 0; Juuri.style.top = 0; Juuri.style.bottom = 0;
            Juuri.style.display = DisplayStyle.None;
            ryhma = Ohjausnappi.Ryhma(Juuri);
            // PAUSE (omistaja 5.10.2026 klo 23.5x): OHJAUSNAPPI-ryhmässä, sama tauko-pohja kuin astrokuvan II (II ↔ ▶).
            // LOPETA KIERROS (omistaja 6.10. 16.4x): ■ OHJAUSNAPPI tauon vasemmalla, näkyy vain kierroksen aikana (PaivitaTauko).
            lopetaNappi = Ohjausnappi.Nappi(Ikonit.Lopeta, Kieli.T("ui.opas.lopeta-kierros"), LopetaKierros, ryhma);
            lopetaNappi.style.display = DisplayStyle.None;
            ohjainRivi = Ohjausnappi.Ryhma(Juuri);
            ohjainRivi.style.top = StyleKeyword.Auto;
            taukoNappi = Ohjausnappi.Nappi(Ikonit.Tauko, Kieli.T("ui.opas.tauko"), () => { OpasSovitin.Tauko(!OpasSovitin.Tauolla); Debug.Log("MATKAKIRJA opas: tauko-nappi → " + OpasSovitin.Tauolla); }, ohjainRivi);
            seuraavaNappi = Ohjausnappi.Nappi(Ikonit.Seuraava, Kieli.T("ui.opas.seuraava-kohde"), () => Debug.Log("MATKAKIRJA opas: seuraava-nappi → " + OpasSovitin.Seuraava()), ohjainRivi);
            // Omistaja 6.10. 12.1x: "piilota pause ja kuva nappi hampurilaisen sisään": ruudulla vain ☰; tauko ja kuvat valikon riveinä.
            // Omistaja 6.10. 16.3x: tauko taas aina näkyvissä ☰:n vasemmalla (kumoaa 12.1x:n tauon osalta); kuvat jäävät ☰:n sisään.
            // Juna 156: tauko siirtyi ohjainriville oikean tapin alle (Seuraavan viereen); ylänurkassa ■ ja ☰.
            nappi = Ohjausnappi.Nappi(Ikonit.Valikko, Kieli.T("ui.linssivalikko.valikko"), () => { Debug.Log("MATKAKIRJA opas: ☰ " + (Auki ? "kiinni" : "auki")); if (Auki) Sulje(); else Avaa(Nakyma.Paa); }, ryhma);
            // VUOROKAUDENAIKA (omistaja 6.10. 18.5x): OHJAUSNAPPI vasempaan yläkulmaan; kuvake = voimassa oleva tila.
            // SÄÄTILA (omistaja 8.10. 09.1x–09.2x "kumpikin toiminto saman napin alle"; Päätoimittaja): sama nappi avaa listan, jossa
            // AIKA (päivä | yö) ja SÄÄ (pois | automaatti | käsin); valinta Ydin Saatila-luokkaan (LS1 tehosteet, Pelikoodari säähaku).
            // ☀ suoraan oikeaan ryhmään ☰:n vasemmalle (SijoitaAikaNappi); erillinen vasen ryhmä jäi tyhjäksi (poistettu 9.10.).
            aikaNappi = Ohjausnappi.Nappi(Ikonit.Viiva["paiva"], Kieli.T("ui.opas.aika-ja-saa"), () => { SuljeSaaVihje(); if (Auki && nakyma == Nakyma.Aika) Sulje(); else Avaa(Nakyma.Aika); }, ryhma);
            aikaNappi.RemoveFromHierarchy(); ryhma.Insert(0, aikaNappi);   // ☀ ■ ☰ -järjestys
            // iPhone pystyssä ☀ Dynamic Islandin vasemmalle (OHJAUSNAPPI-ryhmän vasen muunnelma, SijoitaAikaNappi).
            ryhmaVasen = Ohjausnappi.Ryhma(Juuri);
            ryhmaVasen.AddToClassList("mk-ohjausryhma--vasen");
            ryhmaVasen.style.display = DisplayStyle.None;
            // Kartan "© OpenStreetMap" -maininnan napautus avaa ☰ › Lähteet (omistaja 9.10. 09.5x, KrediititTiivis).
            KrediititTiivis.AvaaLahteet = () => { Avaa(Nakyma.Lahteet); };
            LueSaatila();

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
            kerros.JokaRuutu += PaivitaYoTeema;

            // Irrallinen sirurivi alareunan keskelle (Googlen ja Cesiumin merkinnät jäävät sen alle).
            sirurivi = Rakenne.El("tk-teema-harmaa mk-chat__sirut mk-chat__sirut--irrallaan", Juuri, PickingMode.Ignore);
            sirurivi.style.display = DisplayStyle.None;
            sirurivi.style.opacity = 0f;
            puhuSiru = Rakenne.Nappi(null, "mk-chat__siru mk-chat__siru--ikoni", () => { NaytaTeksti(); UiNakymat.Hae()?.Chat?.AloitaSanelu(); }, null, PuluChat.MikkiIkoni);
            puhuSiru.tooltip = Kieli.T("ui.opas.puhu-tai-kirjoita");
            // NELJÄ NAPPIA (omistaja 6.10. 11.5x: kaksi kysymyssirua pois; Kysy, Liiku, mikrofoni ja näppäimistö keskellä alhaalla,
            // LIIKU-nappipohja pyöristetyin kulmin, tekstit ja kuvakkeet keskitettyinä). Harmaa teema rivin tk-teema-harmaasta.
            napit = Rakenne.El("tk-teema-harmaa mk-opas-napit mk-opas-napit--vakanen", Juuri, PickingMode.Ignore);
            napit.style.display = DisplayStyle.None;
            napit.style.opacity = 0f;
            napit.style.left = OpasTapit.Reuna;
            napit.style.height = NappiriviKorkeus;
            vakanen = Ohjausnappi.Nappi(Ikonit.NuoliOikea, Kieli.T("ui.opas.nayta-napit"), () => { LopetaEsittely(); AsetaRiviAuki(!riviAuki); }, napit);
            rivinIkkuna = Rakenne.El("mk-opas-napit__ikkuna", napit, PickingMode.Ignore);
            liuku = Rakenne.El("mk-opas-napit__liuku", rivinIkkuna, PickingMode.Ignore);
            liuku.style.display = DisplayStyle.None;
            OpasNappi(Kieli.T("ui.opas.kysy"), Ikonit.Puhekupla, () => Avaa(Nakyma.Kysy), Kieli.T("ui.opas.valmiit-kysymykset-oppaalle"));
            // JATKA KIERROSTA (omistaja 6.10. 16.3x, Päätoimittaja): kysymys keskeyttää kaupunkikierroksen; vastauksen jälkeen
            // nappirivin lasipohjalla oleva nappi keskitettynä rivin yläpuolelle (LS1: KierrosJatkettavissa, JatkaKierrosta()).
            jatkaRivi = Rakenne.El("tk-teema-harmaa mk-opas-napit", Juuri, PickingMode.Ignore);
            jatkaRivi.style.display = DisplayStyle.None;
            jatkaNappi = Rakenne.Nappi(null, "mk-liiku__nappi mk-opas-nappi", JatkaKierrosta, jatkaRivi);
            jatkaNappi.tooltip = Kieli.T("ui.opas.jatka-keskeytynytta-kaupunkikierrosta");
            jatkaIkoni = Rakenne.Ikoni(Ikonit.Toista, "mk-ikoni mk-opas-nappi__ikoni", jatkaNappi);
            jatkaTeksti = Rakenne.Teksti(Kieli.T("ui.opas.jatka-kierrosta"), "mk-nappi__teksti mk-opas-nappi__teksti", jatkaNappi);
            Kirjasimet.Aseta(jatkaTeksti, Kirjasin.ModerniLihava);
            // MIKÄ TÄMÄ ON? (omistaja 6.10. 16.4x, juna 152; LS1 MikaTama*): vapaassa tilassa havainnekuvan paikalla nappirivin
            // vieressä (puhelimella rivin yllä oikealla), nappirivin lasipohjalla; haun aikana odotustila. Pieni tähtäin ruudun
            // keskelle (katsepiste = keskikohdan maapiste).
            mikaRivi = Rakenne.El("tk-teema-harmaa mk-opas-napit", Juuri, PickingMode.Ignore);
            mikaRivi.style.display = DisplayStyle.None;
            mikaRivi.style.left = StyleKeyword.Auto; mikaRivi.style.right = StyleKeyword.Auto;
            mikaNappi = Rakenne.Nappi(null, "mk-liiku__nappi mk-opas-nappi", MikaTamaOn, mikaRivi);
            mikaNappi.tooltip = Kieli.T("ui.opas.mika-tama-on-lahin-tunnettu");
            Rakenne.Ikoni(Ikonit.Tahtain, "mk-ikoni mk-opas-nappi__ikoni", mikaNappi);
            mikaTeksti = Rakenne.Teksti(Kieli.T("ui.opas.mika-tama-on"), "mk-nappi__teksti mk-opas-nappi__teksti", mikaNappi);
            Kirjasimet.Aseta(mikaTeksti, Kirjasin.ModerniLihava);
            tahtain = Rakenne.El("tk-teema-harmaa mk-opas-tahtain", Juuri, PickingMode.Ignore);
            Rakenne.Ikoni(Ikonit.Tahtain, "mk-ikoni mk-opas-tahtain__ikoni", tahtain);
            tahtain.style.display = DisplayStyle.None;
            OpasNappi(Kieli.T("ui.opas.liiku"), Ikonit.Viiva["kompassi"], () => Avaa(Nakyma.Liiku), Kieli.T("ui.opas.lahikohteet-ja-kaupunkikierros"));
            // Omistaja 16.3x "paremmin linjaan": tekstinapit samanlevyisiksi (leveimmän mukaan), sisältö keskellä.
            liuku.RegisterCallback<GeometryChangedEvent>(_ =>
            {
                var tekstilliset = liuku.Children().Where(c => !c.ClassListContains("mk-opas-nappi--ikoni")).ToList();
                if (tekstilliset.Count < 2) return;
                float lev = 0f;
                foreach (var c in tekstilliset) lev = Mathf.Max(lev, c.layout.width);
                if (lev <= 0 || float.IsNaN(lev)) return;
                foreach (var c in tekstilliset) if (Mathf.Abs(c.resolvedStyle.width - lev) > 0.5f) c.style.width = lev;
            });
            mikkiNappi = OpasNappi(null, PuluChat.MikkiIkoni, Puhu, Kieli.T("ui.opas.puhu-oppaalle"));
            OpasNappi(null, PuluChat.NappaimistoIkoni, Kirjoita, Kieli.T("ui.opas.kirjoita-oppaalle"));
            // KYSY AINA NÄKYVISSÄ (omistaja 7.10. 10.1x, Pariisin kaupunkiesitys): kierroksen ajan Kysy, mikrofoni ja näppäimistö
            // keskellä alhaalla samalla nappirivin pohjalla (mk-opas-napit, LIIKU-nappipohja) väkäsen ja Liikun tilalla.
            esitysRivi = Rakenne.El("tk-teema-harmaa mk-opas-napit", Juuri, PickingMode.Ignore);
            esitysRivi.style.display = DisplayStyle.None;
            esitysRivi.style.height = NappiriviKorkeus;
            OpasNappi(Kieli.T("ui.opas.kysy"), Ikonit.Puhekupla, () => Avaa(Nakyma.Kysy), Kieli.T("ui.opas.valmiit-kysymykset-oppaalle"), esitysRivi);
            OpasNappi(null, PuluChat.MikkiIkoni, Puhu, Kieli.T("ui.opas.puhu-oppaalle"), esitysRivi);
            OpasNappi(null, PuluChat.NappaimistoIkoni, Kirjoita, Kieli.T("ui.opas.kirjoita-oppaalle"), esitysRivi);
            // VAPAA LENTO (omistaja 9.10.2026: "saisi olla se vapaa lento nappi ja sitten kun se on kytketty päälle olisi palaa
            // kierrokselle tms nappi"): kierroksen nappirivin kuvakenappi (LIIKU-pohja, kompassi kuten vapaan tilan tappi); LS1 tallentaa
            // keskeytyskohdan. Näkyy vain, kun LS1:n OpasSovitin.VapaaLentoKaytettavissa on true (rajapinta heijastuksella).
            vapaaNappi = OpasNappi(null, Ikonit.Viiva["kompassi"], AloitaVapaaLento, Kieli.T("ui.opas.vapaa-lento"), esitysRivi);
            vapaaNappi.style.display = DisplayStyle.None;
            kerros.JokaRuutu += PaivitaSirut;
            // Googlen ja Cesiumin krediitit (logot muuttamattomina, Googlen ehdot): sirurivi niiden yläpuolelle, tarkistus 2 × s.
            sirurivi.schedule.Execute(SovitaKrediitteihin).Every(500);

            RakennaSiirtyma(kerros.Juuri(kerrosNro));
            RakennaKirjoitus();
            kuvaKortti = Rakenne.El("mk-ohjausnappi mk-ohjausnappi--iso mk-ohjausnappi--kuva tk-teema-harmaa", Juuri, PickingMode.Position);
            kuvaKortti.tooltip = Kieli.T("ui.opas.kuvat");
            kuvaKortti.style.position = Position.Absolute;
            kuvaKortti.style.display = DisplayStyle.None;
            kuvaKortti.style.opacity = 0f;
            kuvaKortti.style.transitionProperty = new List<StylePropertyName> { new StylePropertyName("opacity") };
            kuvaKortti.style.transitionDuration = new List<TimeValue> { new TimeValue(Tyylikirja.Kesto.Sulku / 1000f) };
            kuvaEl = Rakenne.El("mk-ohjausnappi__kuva", kuvaKortti, PickingMode.Ignore);
            // Tummempi (omistaja 7.10. 21.4x): kuvan päälle himmennys.kevyt-kerros (tyylikirjan himmennys), numero sen päällä.
            var kuvaHimmennys = Rakenne.El(null, kuvaKortti, PickingMode.Ignore);
            kuvaHimmennys.style.position = Position.Absolute;
            kuvaHimmennys.style.left = 0; kuvaHimmennys.style.right = 0; kuvaHimmennys.style.top = 0; kuvaHimmennys.style.bottom = 0;
            kuvaHimmennys.style.backgroundColor = (Color)Tyylikirja.Himmennys.Kevyt;
            kuvaHimmennys.style.borderTopLeftRadius = kuvaHimmennys.style.borderTopRightRadius = Tyylikirja.Kulma.Nappi;
            kuvaHimmennys.style.borderBottomLeftRadius = kuvaHimmennys.style.borderBottomRightRadius = Tyylikirja.Kulma.Nappi;
            // Nipun kuvamäärä nostokortin kuvalaskurin pohjalla (numeropää kulmassa, vain kun kuvia on useampi).
            kuvaLaskuri = Rakenne.Teksti("", "mk-nosto__laskuri", kuvaKortti);
            kuvaLaskuri.pickingMode = PickingMode.Ignore;
            Kirjasimet.Aseta(kuvaLaskuri, Kirjasin.Moderni);
            kuvaLaskuri.style.display = DisplayStyle.None;
            kuvaKortti.RegisterCallback<ClickEvent>(_ => SuurennaKuva());
            kuvaKortti.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            kerros.JokaRuutu += PaivitaKuva;
            // KUVANOSTO (omistaja TF 168): yksityiskohtakuva pienenä reunaan, napautuksesta suurena (LS1:n ajoitus).
            kuvanosto = new OpasKuvanosto(Juuri);
            kerros.JokaRuutu += () =>
            {
                var chat = UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
                kuvanosto.Este = !nakyy || Auki || (chat?.Auki ?? false) || (siirtyma != null && siirtyma.style.display != DisplayStyle.None);
            };
            kerros.JokaRuutu += PaivitaTauko;
            // TÄKYLUETTELO (omistaja 5.10.2026 klo 23.5x): opas alkaa täkyillä ja odottaa valintaa (Linssiseppä 3bbb18d2).
            OpasSovitin.TakyAvaus = true;

            // Kameran tapit (juna 145): alakulmiin vain pysähdyksellä (OpasTapit).
            tapit = new OpasTapit(Juuri);
            nimilappu = new OpasNimilappu(Juuri);
            kerros.JokaRuutu += PaivitaTapit;
            // SÄÄTILAN ENSIKERRAN VIHJE (omistaja 8.10. 09.2x): NIMILAPPU-pohjan lappu ja viiva ☾-napin alle (ei nastaa).
            RakennaSaaVihje();
            kerros.JokaRuutu += PaivitaSaaVihje;
            // METROLINJA (omistaja 7.10. 10.2x): kierroksen eteneminen vasemmassa reunassa keskellä (OpasMetrolinja).
            metro = new OpasMetrolinja(Juuri);
            kerros.JokaRuutu += PaivitaMetro;
            OpasSovitin.LatausKuvaVaihtui += LatausKuvaVaihtui;
            // Sallitut saapuvat oppaan avauksessa (aloitusvalikko jo auki): lista uudelleen, jotta rajaamaton ei jää näkyviin.
            OpasSovitin.SallitutVaihtui += () => { if (nakyy && Auki) Rakenna(); };
            // Kaupunkitilaan siirryttäessä mahdollinen aloitusvalinta kiinni ja ☰ ilman Vaihda kohde -riviä.
            OpasSovitin.KaupunkitilaVaihtui += () => { if (!nakyy) return; if (Kaupunkitila && aloitus) Sulje(); else if (Auki) Rakenna(); };
            // Torjunta tekstinä (LS1 sallitut-157): "vie minut X" / Liiku / kaupunki listan ulkopuolelle, kun siltalause ei soinut.
            // Oppaan chat ei aukea itsestään (Vastaa jäi näkymättömiin): auki olevaan chattiin vastauksena, muuten kertojan laatikkoon.
            OpasSovitin.TorjuntaTeksti += Torjunta;
            Viimeisin = this;
        }

        /// <summary>Oppaan linssi auki / kiinni.</summary>
        public void Nayta(bool nakyy)
        {
            if (nakyy == this.nakyy && Juuri.style.display == (nakyy ? DisplayStyle.Flex : DisplayStyle.None)) return;
            this.nakyy = nakyy;
            Juuri.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (nakyy) saaVihje.Alkoi(Time.unscaledTime); else saaVihje.Loppui();
            if (!nakyy) { Sulje(); SiirtymaPeru(); }
            var ui = UiNakymat.Olemassa ? UiNakymat.Hae() : null;
            ui?.Chat?.OpasTila(nakyy);
            // Linssi avautuu täkyluetteloon (valikko auki täkynäkymässä); sulkeutuu valinnasta.
            // Varapolku (Päätoimittaja 6.10. 00.2x, junan 146 VIE-ehto): valikko avautuu vain, kun täkyjä on; jos ne eivät tule
            // (GET /opas/kohteet puuttuu tai epäonnistuu) 4 s:ssa, opas avautuu kuten ennen ilman valikkoa.
            // Linssisepän avausvalikko (juna 149): opas auki ilman paikkaa ja ilman karttaa → aloitus heti (suosikit täyttyvät perässä).
            if (nakyy && Kaupunkitila) Debug.Log("MATKAKIRJA opas: kaupunkitila, ei aloitusvalintaa");
            else if (nakyy && OpasSovitin.Avausvalikko) AvaaAloitus();
            else if (nakyy && OpasSovitin.TakyAvaus)
            {
                float raja = Time.realtimeSinceStartup + 4f;
                IVisualElementScheduledItem odotus = null;
                odotus = Juuri.schedule.Execute(() =>
                {
                    if (!this.nakyy || Auki || Kaupunkitila) { odotus.Pause(); return; }
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
        OpasMetrolinja metro;
        float metroKoysiVasen;

        /// <summary>Vuorokausinappi: iPhonella oikean yläkulman ryhmään ■ ≡ -nappien vasemmalle (omistaja 12.3x), iPadilla vasemmalle.</summary>
        void SijoitaAikaNappi()
        {
            if (float.IsNaN(Juuri.layout.width) || Juuri.layout.width <= 0 || Juuri.panel == null) return;
            bool pysty = PuhelinPysty;
            // IPHONE PYSTY (omistajan TF 169 -palaute 9.10.2026, pallo Pariisissa): ☀ ja ☰ ylös Dynamic Islandin vasemmalle ja oikealle
            // puolelle, ■ alas ⏸:n vasemmalle (ohjainrivi alariville, PaivitaTapit). Muualla ☀ ■ ☰ oikeassa ryhmässä kuten ennen.
            var isa = pysty ? ryhmaVasen : ryhma;   // omistaja 14.2x: myös iPadilla oikean ryhmän riviin (metrolinja vasempaan yläkulmaan)
            if (aikaNappi.parent != isa || isa.IndexOf(aikaNappi) != 0) { aikaNappi.RemoveFromHierarchy(); isa.Insert(0, aikaNappi); }
            var lopetaIsa = pysty ? ohjainRivi : ryhma;
            if (lopetaNappi.parent != lopetaIsa)
            {
                lopetaNappi.RemoveFromHierarchy();
                if (pysty) ohjainRivi.Insert(0, lopetaNappi); else ryhma.Insert(Mathf.Max(0, ryhma.IndexOf(nappi)), lopetaNappi);
            }
            if (pysty)
            {
                var t = UiKerros.Hae().Reunat(kerrosNro);
                float pw = Juuri.panel.visualTree.layout.width;
                float yla = Mathf.Max(10f, t.y - 50f) - t.y;   // Islandin tasolle (kuten PuhelinMetro), turva-alueen koordinaateissa
                float napinLeveys = Tyylikirja.Vali.S + Tyylikirja.Nappi.Ohjaus;   // .mk-ohjausnappi: vasen marginaali + nappi
                float vasen = pw * 0.5f - IslandLeveysPt * 0.5f - KuvaRako - napinLeveys - t.x;
                float oikea = pw * 0.5f + IslandLeveysPt * 0.5f + KuvaRako - Tyylikirja.Vali.S - t.x;
                ryhmaVasen.style.top = yla; ryhmaVasen.style.left = vasen; ryhmaVasen.style.right = StyleKeyword.Auto;
                ryhma.style.top = yla; ryhma.style.left = oikea; ryhma.style.right = StyleKeyword.Auto;
                ryhmaVasen.style.display = DisplayStyle.Flex;
            }
            else if (ryhma.style.left.keyword != StyleKeyword.Null)
            {
                ryhma.style.top = StyleKeyword.Null; ryhma.style.left = StyleKeyword.Null; ryhma.style.right = StyleKeyword.Null;
                ryhmaVasen.style.display = DisplayStyle.None;
            }
        }

        /// <summary>iPhone pystyssä (puhelin = ei LeveaRuutu): ☀/☰ Islandin vierellä, Kysy-rivi vasemmalla ja ■ ⏸ ⏭ oikealla alarivillä.</summary>
        bool PuhelinPysty => !LeveaRuutu && Juuri.layout.height > Juuri.layout.width;
        VisualElement ryhmaVasen;

        /// <summary>
        /// Metrolinja kierroksen ajan (ei valikon tai chatin aikana) vasempaan reunaan keskelle: kaistaan otsikon (☾A:n alla, ~57 pt)
        /// ja vasemman tapin / esitysrivin väliin, korkeus enintään 40 % ruudusta.
        /// </summary>
        void PaivitaMetro()
        {
            var chat = UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
            bool nayta = nakyy && !Auki && !(chat?.Auki ?? false) && (metro.Testi || OpasSovitin.KierrosIndeksi >= 0);
            // Historiaosion otsikko lennon aikana (LS1 c50c4dcc5, juna 170); testikomento ohittaa.
            OpasMetrolinja.HistoriaOtsikko = testiHistoria ? testiHistoriaOtsikko : OpasSovitin.HistoriaOtsikko;
            float h = Juuri.layout.height, w = Juuri.layout.width;
            if (float.IsNaN(h) || h <= 0) return;
            // Omistaja 12.3x: iPhonella (pysty ja vaaka) vasempaan yläkulmaan, vuorokausinappi oikean ryhmän riviin; iPadilla
            // vasen reuna keskellä otsikon ja tappien välissä kuten ennen.
            SijoitaAikaNappi();
            metro.Keskita = LeveaRuutu;
            float yla = LeveaRuutu ? 8f + Tyylikirja.Nappi.Ohjaus + 8f + 57f + 8f : 8f;
            float ala = tapit.Nakyy ? h - (tapit.Ala + OpasTapit.Halkaisija + KuvaRako) : h - (TapitAla + KuvaRako);
            float vasen = OpasTapit.Reuna;
            // Matala ruutu (iPhone vaaka, LS1:n still 7.10.: 8 asemaa ~45 pt:n kaistassa, nimet litistyivät): linja vasemman tapin
            // oikealle puolelle, jolloin kaista ulottuu esitysriviin asti.
            if (ala - yla < OpasMetrolinja.VahinRivi * metro.Maara && tapit.Nakyy)
            {
                vasen = OpasTapit.Reuna + OpasTapit.Halkaisija + KuvaRako;
                ala = h - (TapitAla + KuvaRako);
            }
            // iPad (omistaja 7.10. 13.3x): ihan vasempaan reunaan pienellä marginaalilla (turva-alueen ulkopuolelle), köyden
            // vasemmalle puolelle; pystysuunnassa ennallaan.
            if (LeveaRuutu && Juuri.panel != null) vasen = ReunaPt - UiKerros.Hae().Reunat(kerrosNro).x;
            metro.Kompakti = false; metro.IslandAlaY = 0f;
            if (!LeveaRuutu && Juuri.panel != null) { PuhelinMetro(nayta, w, h); return; }
            // Omistaja 14.2x: iPadilla vasempaan yläkulmaan 6 pt reunasta, linja ja kaikki nimet köyden päällä (ei rajausta).
            if (Juuri.panel != null)
            {
                metro.Keskita = false;
                metro.Paivita(nayta, 8f, 8f + h * 0.4f, h * 0.4f, w * 0.3f, vasen);
                return;
            }
            metro.Paivita(nayta, yla, ala, Mathf.Max(h * 0.4f, OpasMetrolinja.VahinRivi * metro.Maara), LeveaRuutu ? w * 0.3f : w * 0.42f, vasen);
        }

        /// <summary>
        /// iPhone (omistaja 7.10. 13.3x): metrolinja ihan vasempaan laitaan turva-alueen ulkopuolelle, Dynamic Islandin viereen
        /// – pystyssä vasempaan ylänurkkaan Islandin tasolle sen vasemmalle puolelle, vaakana vasempaan laitaan köyden vasemmalle
        /// puolelle ylänurkan ja Islandin väliin. Pyöristetty kulma ei saa leikata tekstiä (KulmaVaraPt) eikä Island peittää sitä
        /// (Island-mitat iPhonen pt:inä). Jos kaikki pysäkit eivät mahdu nimineen, nykyinen ja viereiset nimellä, muut pisteinä.
        /// </summary>
        void PuhelinMetro(bool nayta, float w, float h)
        {
            var t = UiKerros.Hae().Reunat(kerrosNro);   // turva-alueen reunat paneelin pisteinä: x vasen, y ylä, z oikea, w ala
            float pw = Juuri.panel.visualTree.layout.width, ph = Juuri.panel.visualTree.layout.height;
            bool pysty = ph > pw;
            float x, y, korkeus, leveys;
            if (pysty)
            {
                // Island ylhäällä keskellä (~126 × 37 pt, yläreuna ~11 pt). TF 169 (9.10.2026): ☀ Islandin vasemmalla, joten linja
                // alkaa Islandin alapuolelta (alareuna ~48 pt) vasemmasta ylänurkasta; ei kavennettuja Island-rivejä.
                x = KulmaVaraPt; y = Mathf.Max(56f, t.y - 50f);
                metro.IslandAlaY = 0f;
                leveys = pw * 0.48f;
                korkeus = Mathf.Min(ph * 0.4f, OpasMetrolinja.AsemaValiPt * metro.Maara);
            }
            else
            {
                // Omistaja 13.3x ja 14.2x: vaakana heti Dynamic Islandin oikean reunan jälkeen ylhäällä; nimet kokonaan köyden päällä
                // (ei katkaisua eikä pisteiksi supistusta).
                x = t.x > 20f ? IslandOikeaPt + KuvaRako : 14f; y = 12f;
                korkeus = Mathf.Min(ph * 0.6f, OpasMetrolinja.AsemaValiPt * metro.Maara);
                leveys = pw * 0.45f;
            }
            // Juuri on turva-alueen sisällä: paikka turva-alueen koordinaateiksi (negatiivinen = ulkopuolella).
            float yJ = y - t.y, xJ = x - t.x;
            metro.Keskita = false;
            metro.Paivita(nayta, yJ, yJ + korkeus, korkeus, leveys, xJ);
        }

        /// <summary>Pyöristetyn kulman vara (pt) ja Dynamic Islandin pituus (pt) iPhonella.</summary>
        /// <summary>iPadin metrolinjan marginaali ruudun vasemmasta reunasta (pt).</summary>
        const float ReunaPt = 6f;
        const float KulmaVaraPt = 22f, IslandLeveysPt = 126f, IslandOikeaPt = 48f;

        VisualElement esitysRivi;
        bool esitysNakyy;
        /// <summary>Testi `ui opasvalikko esitys on|off|auto`: kierroksen esitysrivi ilman kierrosta.</summary>
        bool? testiEsitys;

        Button OpasNappi(string teksti, string ikoni, Action teko, string ohje, VisualElement isa = null)
        {
            var b = Rakenne.Nappi(null, "mk-liiku__nappi mk-opas-nappi" + (teksti == null ? " mk-opas-nappi--ikoni" : ""), () => { LopetaEsittely(); AsetaRiviAuki(false); teko(); }, isa ?? liuku);
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
            siirtymaKuva = Rakenne.El(null, siirtyma, PickingMode.Ignore);
            siirtymaKuva.style.position = Position.Absolute;
            siirtymaKuva.style.left = 0; siirtymaKuva.style.right = 0; siirtymaKuva.style.top = 0; siirtymaKuva.style.bottom = 0;
            siirtymaKuva.style.backgroundSize = new BackgroundSize(Length.Percent(100), Length.Percent(100));
            siirtymaKuva.style.display = DisplayStyle.None;
            // Kerroksellinen pallo (LATAUSKUVA-pohja) heti stillin päälle, liu'un ja tekstien alle.
            palloKerrokset = new Latauskuva(siirtyma);
            palloKerrokset.Juuri.RemoveFromHierarchy();
            siirtyma.Insert(siirtyma.IndexOf(siirtymaKuva) + 1, palloKerrokset.Juuri);
            // Kerrokset levylle valmiiksi (laitteen pysty- ja vaakarajaus), jotta ne ehtivät jo ensimmäiseen siirtymään.
            int pysty = Matkakirja.Linssit.LatausLiike.Rajausindeksi(Mathf.Min(Screen.width, Screen.height), Mathf.Max(Screen.width, Screen.height));
            foreach (int r in new[] { pysty, 2 })
                foreach (var k in new[] { "tausta-maaankkuri", "kori", "kupu" }) Kuvat.Esilataa(PalloKerrosUrl(r, k));
            // Tumma liuku leveän vaakaruudun alaosaan (4:3-rajauksesta näkyy vain kaista): kuvan oma alasävy (Tyylikirja.Kehys.Bg).
            siirtymaLiuku = Rakenne.El(null, siirtyma, PickingMode.Ignore);
            siirtymaLiuku.style.position = Position.Absolute;
            siirtymaLiuku.style.left = 0; siirtymaLiuku.style.right = 0; siirtymaLiuku.style.bottom = 0;
            siirtymaLiuku.style.height = Length.Percent(LiukuOsuus * 100f);
            siirtymaLiuku.style.backgroundSize = new BackgroundSize(Length.Percent(100), Length.Percent(100));
            siirtymaLiuku.style.display = DisplayStyle.None;
            // Teksti ja palkki yhdessä kääreessä: iPadilla kääre isonnetaan 1,4-kertaiseksi (sama iPad-isonnus kuin
            // mk-kartuscha--tabletti ja mk-maakunnat--tabletti; ei uutta tyyliä).
            siirtymaTeksti = Rakenne.El(null, siirtyma, PickingMode.Ignore);
            siirtymaTeksti.style.alignItems = Align.Center;
            siirtymaTeksti.style.transformOrigin = new TransformOrigin(Length.Percent(50), Length.Percent(100));
            // Omistaja 7.10. 15.3x: "tuon 'siirrytään' -tekstin voi ottaa kokonaan pois" → vain kaupungin nimi ja palkki.
            siirtymaNimi = Rakenne.Teksti("", "mk-ajattelija__nimi", siirtymaTeksti);
            siirtymaNimi.pickingMode = PickingMode.Ignore; siirtymaNimi.style.unityTextAlign = TextAnchor.MiddleCenter; Kirjasimet.Aseta(siirtymaNimi, Kirjasin.Lcd);
            siirtymaPalkki = new Latauspalkki(siirtymaTeksti);
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
            OpasSovitin.PalloTekstuuriValmis += () => UiKerros.PaaSaikeessa(() => { if (siirtyma.style.display != DisplayStyle.None && OpasSovitin.Kaupunkitila && (!palloNakyy || palloNimi != OpasSovitin.PalloKuvaRuudulle())) AsetaPalloKuva(true); });
            // KIERTO (omistaja 8.10.: "jos pelaaja vaihtaa … orientaatiota pystyn ja vaakan välillä, niin kuva pitäisi päivittyä niin,
            // että ei jää mustia palkkeja"): ruudun koon muuttuessa näkyvä kuva sovitetaan heti peittäväksi uuteen kokoon, ja jos
            // rajaus vaihtuu (puhelin / iPad pysty / vaaka), uusi rajaus haetaan muistiin ja vaihdetaan valmistuessa; ion-logo uuteen paikkaan.
            siirtyma.RegisterCallback<GeometryChangedEvent>(e => { if (e.oldRect.size != e.newRect.size) Kierretty(); });
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
            siirtymaAlku = Time.realtimeSinceStartup;
            siirtymaKerta++;
            AsetaPalloKuva(OpasSovitin.Kaupunkitila);
            // Taustaäänet hiljaisiksi latauskuvan ajaksi (omistaja TF 168: "saisiko äänet pois taustalta kun kip latautuu?").
            AaniVaimennus.Aseta(true, "pallon latauskuva");
            // Kaupunkitila voi alkaa hetken siirtymän jälkeen (BUILD 167 -ajo 9.10.: Pariisi ja Tukholma mustina 20 s): kuva pyydetään,
            // kun tila alkaa, vaikka kiertoa tai PalloTekstuuriValmista ei tule.
            int pk = siirtymaKerta;
            siirtyma.schedule.Execute(() => { if (pk == siirtymaKerta && siirtyma.style.display != DisplayStyle.None && OpasSovitin.Kaupunkitila && palloNimi == null && !palloKerroksetNakyy) AsetaPalloKuva(true); })
                .Every(150).Until(() => pk != siirtymaKerta || siirtyma.style.display == DisplayStyle.None || palloNimi != null || palloKerroksetNakyy);
            // Ion-logo vain siirtymän omana (tasavälein, omistaja 15.3x); krediittikerroksen oma logo piiloon siirtymän ajaksi
            // (PaivitaAvausIon: IonOmaPiirto), muuten se piirtyi kiinteästi 10 pt vasemmalle krediittirivien päälle.
            AsetaSiirtymaIon();
            Debug.Log("MATKAKIRJA opas: siirtymä alkaa → " + nimi);
            siirtymaKierros?.Pause();
            // Varmistus (Päätoimittaja 15.4x: "peitto pois käytöstä ja tuhotaan aina, kun opas suljetaan missä vaiheessa tahansa"):
            // jos opas ei ole enää auki millä tahansa reitillä (linssi pois, uusi peli, virhe), ruutu puretaan heti.
            siirtymaKierros = siirtyma.schedule.Execute(() =>
            {
                if (testiEdistyminen == null && (!nakyy || !OpasSovitin.Auki)) { SiirtymaPeru(); return; }
                siirtymaPalkki.Arvo = testiEdistyminen ?? OpasSovitin.SiirtymaEdistyminen;
            }).Every(100);
        }

        // Omistaja 7.10. 15.3x: "Cesium-logon voisi sijoittaa niin, että se on yhtä paljon irti vasemmalta kuin alhaalta": sama väli
        // ruudun vasemmasta ja alareunasta, turva-alueen sisällä (kotipalkki, vaakanäkymän Dynamic Island).
        void AsetaSiirtymaIon()
        {
            // Paneelin koko (ruudun kerros on jo asetettu; siirtymä voi olla vielä display None ilman leveyttä).
            float pw = siirtyma.panel?.visualTree.worldBound.width ?? 0f;
            if (!(pw > 0f)) pw = siirtyma.parent?.worldBound.width ?? 0f;
            float sk = pw > 0f && UiRuutu.Leveys > 0 ? pw / UiRuutu.Leveys : 1f / Mathf.Max(1f, UiKerros.PikseliaPisteessa);
            var sa = UiRuutu.Turva;
            float vali = Mathf.Max(sa.xMin, sa.yMin) * sk + KrediititTiivis.TyhjaSivuPt;
            AsetaIon(siirtymaIon, vali, vali);
            Debug.Log($"MATKAKIRJA opas: siirtymän ion-logo {vali:0} pt vasemmasta ja alhaalta (paneeli {pw:0}, turva {sa.xMin:0}/{sa.yMin:0} px)");
        }

        void PaivitaAvausIon()
        {
            // Aloituksen aikana ei logoa (simu 15.45: ion-logo piirtyi paikkalistan päälle; Cesium ei ole vielä auki).
            bool siirtymaAuki = siirtyma != null && siirtyma.style.display != DisplayStyle.None;
            bool nayta = nakyy && !aloitus && !siirtymaAuki && KrediititTiivis.AvausLatautuu && KrediititTiivis.IonLogoKuva != null;
            KrediititTiivis.IonOmaPiirto = nayta || siirtymaAuki;
            // Siirtymän logo heti, kun Cesiumin ion-kuva on saatavilla (ensimmäisessä siirtymässä se voi tulla vasta perässä).
            if (siirtymaAuki && siirtymaIon.style.display == DisplayStyle.None && KrediititTiivis.IonLogoKuva != null) AsetaSiirtymaIon();
            if (!nayta) { if (avausIon.style.display != DisplayStyle.None) avausIon.style.display = DisplayStyle.None; return; }
            // Cesiumin paikka: Googlen logon yläpuolella (sen mitattu yläreuna; simu 6.10. 13.13: laskettu paikka osui logon päälle).
            float h = avausIon.parent?.worldBound.height ?? 0f, g = KrediititTiivis.GoogleYlaOsuus;
            AsetaIon(avausIon, g > 0f && h > 0f ? g * h + 2f : KrediititTiivis.TyhjaAlaPt + KrediititTiivis.RiviPt * 1.3f + 2f + KrediititTiivis.LogoPt + 2f);
            avausIon.BringToFront();
        }

        /// <summary>Cesium ion -logo (Cesiumin oma kuva muuttamattomana) vasempaan alakulmaan krediittien koossa.</summary>
        static void AsetaIon(VisualElement e, float ala, float vasen = KrediititTiivis.TyhjaSivuPt)
        {
            var t = KrediititTiivis.IonLogoKuva;
            e.style.display = t != null && t.height > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            if (t == null || t.height <= 0) return;
            float h = KrediititTiivis.LogoPt;
            e.style.backgroundImage = new StyleBackground(t as Texture2D);
            e.style.height = h; e.style.width = h * t.width / t.height;
            e.style.left = vasen;   // oletus Cesiumin krediittien tapaan ruudun alakulmasta
            e.style.bottom = ala;
        }

        // KUUMAILMAPALLON LATAUSKUVA (Päätoimittaja 7.10. 13.5x, Codex PR #4143, data/latauskuvat/kuumailmapallo.json): kaupunkitilan
        // siirtymän taustana havainnekuva (pallo keskellä 40–63 %, alin 25 % tummaa tekstille). Kolme rajausta R2:ssa; laite ja
        // asento valitsevat. Ladataan välimuistiin (Documents/latauskuvat/), kun sallittujen kaupunkien lista saapuu, ja tekstuuri
        // luetaan levyltä siirtymän alkaessa ja vapautetaan sen jälkeen. Ei kuvaa vielä → musta ruutu kuten ennen.
        VisualElement siirtymaKuva;
        bool palloNakyy;
        VisualElement siirtymaLiuku, siirtymaTeksti;
        static Texture2D liukuKuva;
        /// <summary>Liu'un korkeus ruudusta ja kuvan yläreunan kohta leveällä vaakaruudulla (kupu ja ilma näkyviin, PT 14.5x).</summary>
        const float LiukuOsuus = 0.5f, VaakaKuvanAlku = 0.12f, IpadIsonnus = 1.4f;

        static Texture2D LiukuKuva()
        {
            if (liukuKuva != null) return liukuKuva;
            const int n = 64;
            liukuKuva = new Texture2D(1, n, TextureFormat.RGBA32, false) { wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear, name = "pallo-liuku" };
            Color32 bg = Tyylikirja.Kehys.Bg;
            for (int y = 0; y < n; y++)
            {
                // y = 0 alareuna (tekstuurin rivi 0 on alhaalla): täysi sävy alimmassa 45 %:ssa, sitten pehmeä S ylös.
                float u = Mathf.Clamp01((y / (float)(n - 1) - 0.45f) / 0.55f);
                bg.a = (byte)Mathf.RoundToInt(255f * (1f - u * u * (3f - 2f * u)));
                liukuKuva.SetPixel(0, y, bg);
            }
            liukuKuva.Apply(false, true);
            return liukuKuva;
        }

        /// <summary>Ruudun koko muuttui siirtymän ollessa auki (kierto): kuva peittäväksi heti, oikea rajaus perään.</summary>
        void Kierretty()
        {
            if (siirtyma.style.display == DisplayStyle.None) return;
            if (palloNakyy && palloKuvaNyt != null) SovitaPalloKuva(palloKuvaNyt);
            if (palloKerroksetNakyy) SovitaPalloKerrokset();
            if (OpasSovitin.Kaupunkitila && palloNimi != OpasSovitin.PalloKuvaRuudulle()) AsetaPalloKuva(true);
            AsetaSiirtymaIon();
            Debug.Log($"MATKAKIRJA opas: siirtymä kierretty {siirtyma.worldBound.width:0}×{siirtyma.worldBound.height:0}, rajaus {OpasSovitin.PalloKuvaRuudulle()} (näkyy {palloNimi ?? "-"})");
        }

        string palloNimi;
        Texture2D palloKuvaNyt;

        /// <summary>Kuvan paikka itse (peittävä skaala, LatausLiike.Peita): leveällä vaakaruudulla yläreuna kohtaan VaakaKuvanAlku
        /// (kupu ilmoineen näkyviin) ja tumma liuku alaosaan tekstille; muuten keskitetty. Ei mustia palkkeja missään koossa.</summary>
        void SovitaPalloKuva(Texture2D t)
        {
            var koko = siirtyma.parent?.worldBound.size ?? Vector2.one;
            float w = Mathf.Max(koko.x, 1f), h = Mathf.Max(koko.y, 1f);
            bool levea = w > h * 1.5f;
            var (x, y, kw, kh) = Matkakirja.Linssit.LatausLiike.Peita(w, h, t.width / (double)Mathf.Max(1, t.height), levea ? VaakaKuvanAlku : -1);
            siirtymaKuva.style.right = StyleKeyword.Auto; siirtymaKuva.style.bottom = StyleKeyword.Auto;
            siirtymaKuva.style.width = (float)kw; siirtymaKuva.style.height = (float)kh;
            siirtymaKuva.style.left = (float)x; siirtymaKuva.style.top = (float)y;
            siirtymaLiuku.style.display = levea ? DisplayStyle.Flex : DisplayStyle.None;
            if (levea) siirtymaLiuku.style.backgroundImage = new StyleBackground(LiukuKuva());
            siirtymaTeksti.style.marginBottom = h * 0.07f;
        }

        void AsetaPalloKuva(bool nayta)
        {
            string n = nayta ? OpasSovitin.PalloKuvaRuudulle() : null;
            if (n == null)
            {
                palloNakyy = false;
                palloNimi = null; palloKuvaNyt = null;
                palloLiike?.Pause();
                PiilotaPalloKerrokset();
                Latauskuva.AsetaRajaus(siirtymaKuva, null);
                siirtymaKuva.style.backgroundSize = new BackgroundSize(Length.Percent(100), Length.Percent(100));
                siirtymaKuva.style.display = DisplayStyle.None;
                siirtymaLiuku.style.display = DisplayStyle.None;
                siirtymaTeksti.style.scale = StyleKeyword.Null;
                siirtymaKuva.style.backgroundImage = StyleKeyword.Null;
                siirtyma.style.justifyContent = StyleKeyword.Null; siirtymaTeksti.style.marginBottom = StyleKeyword.Null;
                OpasSovitin.VapautaPalloTekstuuri();
                return;
            }
            // Teksti ja palkki kuvan tummaan alaosaan (pallo jää keskelle näkyviin). Leveä vaakaruutu (iPhone 2,2:1) näyttää 4:3-rajauksesta
            // vain kaistan: kohdistus 35 %:iin pitää pallon kokonaan ruudulla ja tekstin tummassa osassa (simu 14.13: 50 % leikkasi pallon).
            siirtyma.style.justifyContent = Justify.FlexEnd;
            var koko = siirtyma.parent?.worldBound.size ?? Vector2.one;
            // Kääreen marginaali (ei ruudun pehmuste: absoluuttinen ion-logo mitataan ruudun reunasta).
            siirtymaTeksti.style.marginBottom = Mathf.Max(koko.y, 1f) * 0.07f;
            // Kerrokset haetaan heti, stillistä riippumatta (BUILD 167 -ajo 9.10.: kuormassa vaakastillin purku ei valmistunut
            // siirtymän aikana, ja kerrokset odottivat sitä → musta ruutu). Kumpi ehtii ensin, näkyy.
            HaePalloKerrokset(n);
            var t = OpasSovitin.PalloTekstuuri(n);
            if (t == null)
            {
                Debug.Log($"MATKAKIRJA opas: pallon latauskuva purkuun {n} ({Time.realtimeSinceStartup - siirtymaAlku:F1} s siirtymästä)");
                OpasSovitin.PalloTekstuuriMuistiin(n);   // valmistuessa PalloTekstuuriValmis → tänne uudelleen
                return;
            }
            SovitaPalloKuva(t);
            palloNimi = n; palloKuvaNyt = t;
            siirtymaTeksti.style.scale = UiKerros.Tabletti ? new Scale(new Vector3(IpadIsonnus, IpadIsonnus, 1f)) : (StyleScale)StyleKeyword.Null;
            // Kierron rajausvaihto (kuva jo näkyvissä) vaihtaa suoraan ilman häivytystä mustasta.
            bool myohassa = !palloNakyy && siirtyma.resolvedStyle.opacity > 0.5f && Time.realtimeSinceStartup - siirtymaAlku > 0.3f;
            siirtymaKuva.style.backgroundImage = new StyleBackground(t);
            siirtymaKuva.style.display = DisplayStyle.Flex;
            if (!palloNakyy) KaynnistaPalloLiike();
            palloNakyy = true;
            if (myohassa)
            {
                // Myöhässä saapunut kuva häivytetään esiin (ei äkillistä vaihtoa mustasta).
                siirtymaKuva.style.opacity = 0f;
                siirtymaKuva.style.transitionProperty = new List<StylePropertyName> { "opacity" };
                siirtymaKuva.style.transitionDuration = new List<TimeValue> { new TimeValue(0.5f, TimeUnit.Second) };
                siirtymaKuva.schedule.Execute(() => siirtymaKuva.style.opacity = 1f).ExecuteLater(16);
            }
            else siirtymaKuva.style.opacity = 1f;
            Debug.Log($"MATKAKIRJA opas: pallon latauskuva näkyviin {n} ({t.width}×{t.height}){(myohassa ? $", myöhässä {Time.realtimeSinceStartup - siirtymaAlku:F1} s" : "")}");
        }
        float siirtymaAlku;
        int siirtymaKerta;

        // LATAUSKUVA-POHJA STILL-KUVALLE (omistaja 8.10. "latauskuvat kevyesti animoiduiksi"; Päätoimittaja): kunnes pallon kerrokset
        // (tausta, kupu, kori) tulevat, nykyinen still-kuva lähentyy hitaasti keskeltä (LatausLiike.Lahentyminen 1,00 → 1,04 / 8 s ja
        // takaisin) taustan rajauksena; 33 ms UI-ajastin, ei täyttä ruudunpäivitystä.
        IVisualElementScheduledItem palloLiike;
        float palloLiikeAlku;

        // KERROKSELLINEN PALLO (omistaja 8.10.: "ilmapallo kuva pitää tehdä kahdesta osasta uudestaan niin että pallo heiluu hitaasti
        // ruudulla ja köysi piirretään vektorina", "heilunnaksi riittää hyvin vähäeleinen liike", ankkuriköysi; LS1 sopi 17.5x, että
        // Natiivi-UI kytkee): Codexin tausta (maa-ankkuri), kori ja kupu R2:sta Kuvat.Hae-reitillä; kun kaikki kolme ovat saatavilla,
        // ne korvaavat stillin (häivytys), muuten still lähentyy kuten ennen. Kupu heiluu yläosastaan ±0,6° / 3 pt / 7,5 s, kori ±0,5°
        // / 2 pt eri vaiheessa; 4 riippuköyttä korin kulmista kuvun alareunaan ja ankkuriköysi korista maahan vektoreina (Latauskuva.
        // Koysi). Kiinnityspisteet Sisältökirjurin mittauksesta (alfa-bbox, osuudet koko kuvasta, sisaltokirjuri-vertailu/
        // pallo-kiinnityspisteet-osuuksina.json). Tausta polulta 20261008b (Codexin korjattu, saumaton; Sisältökirjuri tarkisti 8.10.),
        // kupu ja kori 20261008; puuttuessa still pysyy.
        const string PalloKerrosJuuri = "https://media.matkakirja.app/julisteet/latauskuva-kuumailmapallo-kerrokset/";
        static string PalloKerrosUrl(int rajaus, string kerros) =>
            PalloKerrosJuuri + (kerros == "tausta-maaankkuri" ? "20261008b" : "20261008") + "/latauskuva-pallo-" + PalloKerrosRajaus[rajaus] + "-" + kerros + ".png";
        static readonly string[] PalloKerrosRajaus = { "iphone", "ipad-pysty", "ipad-vaaka" };
        /// <summary>Rajauksittain: kuvun 4 ja korin 4 kiinnityspistettä (takavasen, takaoikea, etuvasen, etuoikea), kuvun ja korin
        /// kääntöpiste, ankkuriköyden korin piste ja maa-ankkuri.</summary>
        static readonly (Vector2[] Kupu, Vector2[] Kori, Vector2 KupuKaanto, Vector2 KoriKaanto, Vector2 Ankkuri, Vector2 Maa)[] PalloPisteet =
        {
            (new[] { new Vector2(0.4732f, 0.4657f), new Vector2(0.5423f, 0.4657f), new Vector2(0.4922f, 0.4705f), new Vector2(0.5233f, 0.4713f) },
             new[] { new Vector2(0.4888f, 0.5455f), new Vector2(0.5302f, 0.5455f), new Vector2(0.4870f, 0.5486f), new Vector2(0.5302f, 0.5486f) },
             new Vector2(0.5069f, 0.3301f), new Vector2(0.5095f, 0.5467f), new Vector2(0.5095f, 0.5590f), new Vector2(0.5186f, 0.7913f)),
            (new[] { new Vector2(0.4840f, 0.4657f), new Vector2(0.5266f, 0.4657f), new Vector2(0.4957f, 0.4705f), new Vector2(0.5149f, 0.4713f) },
             new[] { new Vector2(0.4936f, 0.5455f), new Vector2(0.5191f, 0.5455f), new Vector2(0.4926f, 0.5486f), new Vector2(0.5191f, 0.5486f) },
             new Vector2(0.5048f, 0.3301f), new Vector2(0.5064f, 0.5467f), new Vector2(0.5064f, 0.5590f), new Vector2(0.5120f, 0.7913f)),
            (new[] { new Vector2(0.4880f, 0.3415f), new Vector2(0.5199f, 0.3415f), new Vector2(0.4968f, 0.3479f), new Vector2(0.5112f, 0.3489f) },
             new[] { new Vector2(0.4952f, 0.4479f), new Vector2(0.5144f, 0.4479f), new Vector2(0.4944f, 0.4521f), new Vector2(0.5144f, 0.4521f) },
             new Vector2(0.5036f, 0.1606f), new Vector2(0.5048f, 0.4495f), new Vector2(0.5048f, 0.4660f), new Vector2(0.5090f, 0.7759f)),
        };
        Latauskuva palloKerrokset;
        readonly Texture2D[] palloKerrosKuvat = new Texture2D[3];
        int palloKerrosRajaus = -1, palloKerrosKerta;
        bool palloKerroksetNakyy;

        void HaePalloKerrokset(string stilliNimi)
        {
            int r = System.Array.FindIndex(PalloKerrosRajaus, x => stilliNimi.Contains("-" + x + "."));
            if (r < 0 || r == palloKerrosRajaus) return;
            palloKerrosRajaus = r;
            int kerta = ++palloKerrosKerta;
            var nimet = new[] { "tausta-maaankkuri", "kori", "kupu" };
            for (int i = 0; i < 3; i++)
            {
                int j = i;
                Kuvat.Hae(PalloKerrosUrl(r, nimet[i]), t =>
                {
                    if (kerta != palloKerrosKerta || siirtyma.style.display == DisplayStyle.None) return;
                    if (palloKerrosKuvat[j] != null && palloKerrosKuvat[j] != t) Kuvat.Vapauta(palloKerrosKuvat[j]);
                    palloKerrosKuvat[j] = t;
                    if (t != null) Kuvat.Kiinnita(t);
                    if (palloKerrosKuvat[0] != null && palloKerrosKuvat[1] != null && palloKerrosKuvat[2] != null) NaytaPalloKerrokset(r);
                });
            }
        }

        void NaytaPalloKerrokset(int r)
        {
            var p = PalloPisteet[r];
            var koydet = new List<Latauskuva.Koysi>();
            for (int i = 0; i < 4; i++)
                koydet.Add(new Latauskuva.Koysi { KiintoKerros = 0, Kiinto = p.Kori[i], Kerros = 1, Kiinnitys = p.Kupu[i], LeveysPt = 1f, Riippuma = 0.02f });
            koydet.Add(Latauskuva.Koysi.Ankkuri(p.Maa, 0, p.Ankkuri));
            palloKerrokset.Aseta(palloKerrosKuvat[0], new[]
            {
                new Latauskuva.Kerros { Kuva = palloKerrosKuvat[1], Paikka = new Rect(0, 0, 1, 1), Kaanto = p.KoriKaanto,
                    Liike = new Matkakirja.Linssit.LatausLiike.Profiili { KulmaAste = 0.5, NousuPt = 2, JaksoS = 7.5, Vaihe = -0.6 } },
                new Latauskuva.Kerros { Kuva = palloKerrosKuvat[2], Paikka = new Rect(0, 0, 1, 1), Kaanto = p.KupuKaanto,
                    Liike = new Matkakirja.Linssit.LatausLiike.Profiili { KulmaAste = 0.6, NousuPt = 3, JaksoS = 7.5 } },
            }, koydet);
            palloKerroksetNakyy = true;
            SovitaPalloKerrokset();
            bool myohassa = siirtyma.resolvedStyle.opacity > 0.5f && Time.realtimeSinceStartup - siirtymaAlku > 0.3f;
            palloKerrokset.Nayta(true, myohassa);
            // Still pois kerrosten alta (ei kaksoiskuvaa reunoilla); häivytyksen ajan näkyvissä.
            siirtymaKuva.schedule.Execute(() => { if (palloKerroksetNakyy) { palloLiike?.Pause(); siirtymaKuva.style.visibility = Visibility.Hidden; } })
                .StartingIn(myohassa ? Tyylikirja.Kesto.Avaus + 50 : 0);
            Debug.Log($"MATKAKIRJA opas: pallon kerroksellinen latauskuva {PalloKerrosRajaus[r]}");
        }

        void SovitaPalloKerrokset()
        {
            var t = palloKerrosKuvat[0];
            if (t == null) return;
            var koko = siirtyma.parent?.worldBound.size ?? Vector2.one;
            float w = Mathf.Max(koko.x, 1f), h = Mathf.Max(koko.y, 1f);
            var (x, y, kw, kh) = Matkakirja.Linssit.LatausLiike.Peita(w, h, t.width / (double)Mathf.Max(1, t.height), w > h * 1.5f ? VaakaKuvanAlku : -1);
            palloKerrokset.Sovita(new Rect((float)x, (float)y, (float)kw, (float)kh));
        }

        void PiilotaPalloKerrokset()
        {
            palloKerrosKerta++;
            palloKerrosRajaus = -1;
            palloKerroksetNakyy = false;
            palloKerrokset?.Nayta(false);
            palloKerrokset?.Aseta(null);
            siirtymaKuva.style.visibility = StyleKeyword.Null;
            for (int i = 0; i < 3; i++) { if (palloKerrosKuvat[i] != null) Kuvat.Vapauta(palloKerrosKuvat[i]); palloKerrosKuvat[i] = null; }
        }

        void KaynnistaPalloLiike()
        {
            palloLiikeAlku = Time.unscaledTime;
            if (palloLiike == null)
                palloLiike = siirtymaKuva.schedule.Execute(() =>
                {
                    if (!palloNakyy) return;
                    Latauskuva.AsetaRajaus(siirtymaKuva, Matkakirja.Linssit.LatausLiike.Lahentyminen(Time.unscaledTime - palloLiikeAlku, 0, 0));
                }).Every(Latauskuva.PaivitysMs);
            else palloLiike.Resume();
        }

        /// <summary>Kohde ladattu: musta ruutu häipyy (Cupolan häivytys) ja näkymä aukeaa.</summary>
        public void SiirtymaValmis()
        {
            if (siirtyma.style.display == DisplayStyle.None) return;
            siirtymaKierros?.Pause();
            siirtymaPalkki.Arvo = 1f;
            AaniVaimennus.Aseta(false, "kierros alkaa");
            siirtyma.AddToClassList("mk-astroavaus--haipyy");
            siirtyma.schedule.Execute(() => siirtyma.style.opacity = 0f).ExecuteLater(16);
            // Kertalaskuri (NUI 7.10. 15.4x): häivytyksen jälkeen piiloon aina, ellei uusi siirtymä alkanut välissä (peiton tarkistus
            // jätti ruudun display Flexiksi, jos häivytys katkesi).
            int kerta = siirtymaKerta;
            siirtyma.schedule.Execute(() => { if (kerta == siirtymaKerta) { siirtyma.style.display = DisplayStyle.None; AsetaPalloKuva(false); } }).StartingIn(1200);
            testiEdistyminen = null;
            KrediititTiivis.CesiumNakyviin = false;
            Debug.Log("MATKAKIRJA opas: siirtymä valmis");
        }

        float? testiEdistyminen;

        /// <summary>Opas suljettiin kesken siirtymän (LS2 7.10. 15.3x, 68429b27: koko ruudun siirtymä jäi poimittavaksi eikä
        /// SiirtymaValmis tullut, kartan napautukset eivät menneet läpi): ruutu pois heti, kuva ja palkki vapaiksi.</summary>
        void SiirtymaPeru()
        {
            if (siirtyma == null || siirtyma.style.display == DisplayStyle.None) return;
            siirtymaKierros?.Pause();
            siirtyma.RemoveFromClassList("mk-astroavaus--haipyy");
            siirtyma.style.display = DisplayStyle.None;
            AsetaPalloKuva(false);
            AaniVaimennus.Aseta(false, "siirtymä peruttu");
            testiEdistyminen = null;
            KrediititTiivis.CesiumNakyviin = false;
            Debug.Log("MATKAKIRJA opas: siirtymä peruttu (opas suljettu)");
        }

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
            kentta.textEdition.placeholder = Kieli.T("ui.opas.kysy-oppaalta");
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
            laheta.tooltip = Kieli.T("ui.opas.laheta-oppaalle");
            kirjoitus.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
        }

        /// <summary>Kierroksella kohteen viisi valmista kysymystä (LS1 KysyKysymykset, omistaja 7.10. 10.1x), muuten oppaan kysymykset.</summary>
        static IReadOnlyList<string> KysyLista => TestiKysymykset ??
            (OpasSovitin.KierrosIndeksi >= 0 && OpasSovitin.KysyKysymykset is IReadOnlyList<string> kk && kk.Count > 0 ? kk : OpasSovitin.Kysymykset);

        /// <summary>Asettelutesti (Editor/Testit/AsetteluTestit.cs): Kysy-listan kysymykset ilman oppaan dataa; null = oikeat.</summary>
        public static IReadOnlyList<string> TestiKysymykset;

        /// <summary>Asettelutesti: paneeli (valikko) ja ruudulla pysyvät avainnapit nimineen.</summary>
        public VisualElement TestiJuuri => Juuri;
        public VisualElement TestiValikko => valikko;
        public IEnumerable<(string Nimi, VisualElement E)> TestiAvainnapit()
        {
            yield return ("☰", nappi);
            yield return ("☀/☾", aikaNappi);
            yield return ("■ lopeta", lopetaNappi);
            yield return ("tauko", taukoNappi);
            yield return ("seuraava", seuraavaNappi);
            yield return ("väkänen", vakanen);
            yield return ("Kysy-rivi", esitysRivi);
        }

        void RakennaKysy()
        {
            Vieritys();
            Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.kysy-oppaalta-2"), "mk-linssivalitsin__valiotsikko", rivit), Kirjasin.ModerniLihava);
            // Omistaja 7.10. 10.3x: ensimmäisenä "Kerro lisää" (LS1:n KysyKysymykset tuo sen kierroksella listan kärkeen,
            // OpasSovitin.KerroLisaaTeksti), sitten viisi valmista kysymystä ja lopuksi mikrofoni ja näppäimistö (PuhuJaKirjoita).
            if (!(KysyLista is IReadOnlyList<string> kys) || kys.Count == 0)
            {
                Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.kysymykset-latautuvat"), "mk-linssivalikko__lahde", rivit), Kirjasin.Moderni);
                valikko.schedule.Execute(() => { if (Auki && nakyma == Nakyma.Kysy && KysyLista is IReadOnlyList<string> k && k.Count > 0) Rakenna(); })
                    .Every(500).Until(() => !Auki || nakyma != Nakyma.Kysy || KysyLista is IReadOnlyList<string> k2 && k2.Count > 0);
                PuhuJaKirjoita();
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
            PuhuJaKirjoita();
        }

        /// <summary>Kysy-valikon loppuun mikrofoni ja näppäimistö (omistaja 7.10. 10.3x) TOIMINTO-riveinä.</summary>
        void PuhuJaKirjoita()
        {
            Viiva();
            Komento(Kieli.T("ui.opas.puhu-oppaalle"), Puhu, rivit);
            Komento(Kieli.T("ui.opas.kirjoita-oppaalle"), Kirjoita, rivit);
        }

        void RakennaLiiku()
        {
            Vieritys();
            Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.mihin-siirrytaan"), "mk-linssivalitsin__valiotsikko", rivit), Kirjasin.ModerniLihava);
            var kohteet = OpasSovitin.Kohteet;
            if (kohteet == null)
            {
                Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.kohteet-latautuvat"), "mk-linssivalikko__lahde", rivit), Kirjasin.Moderni);
                valikko.schedule.Execute(() => { if (Auki && nakyma == Nakyma.Liiku && OpasSovitin.Kohteet != null) Rakenna(); })
                    .Every(500).Until(() => !Auki || nakyma != Nakyma.Liiku || OpasSovitin.Kohteet != null);
            }
            else foreach (var k in kohteet) LiikuRivi(k);
            // Kaupunkikierros-rivi poistettu (omistaja 7.10. 10.3x): esitys on yksi (avaus → kierros lyhyillä versioilla), ei kahdennusta.
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
        Button jatkaNappi, vapaaNappi;
        SvgIkoni jatkaIkoni;
        Label jatkaTeksti;
        bool jatkaPaluuna;
        bool? testiVapaa, testiPaluu;

        // --- VAPAA LENTO ja PALUU KIERROKSELLE (omistaja 9.10.2026; logiikka LS1:n OpasSovitin, rajapinta sovittu 9.10.):
        //   bool VapaaLentoKaytettavissa, bool AloitaVapaaLento(), bool PaluuKierrokselleKaytettavissa, bool PalaaKierrokselle().
        // Suoraan LS1:n rajapintaan (5b23a3b02, juna 170; heijastus pois: puuttuva rajapinta kaatuu käännökseen).
        bool VapaaLentoKaytettavissa => testiVapaa ?? OpasSovitin.VapaaLentoKaytettavissa;
        bool PaluuKaytettavissa => testiPaluu ?? OpasSovitin.PaluuKierrokselleKaytettavissa;

        void AloitaVapaaLento()
        {
            Debug.Log("MATKAKIRJA opas: vapaa lento");
            testiVapaa = null;
            OpasSovitin.AloitaVapaaLento();
        }

        void PalaaKierrokselle()
        {
            Debug.Log("MATKAKIRJA opas: palaa kierrokselle");
            testiPaluu = null;
            OpasSovitin.PalaaKierrokselle();
        }
        bool? testiJatka;
        bool testiHistoria;
        string testiHistoriaOtsikko;
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
            if (nappi && kuvaKortti.style.display != DisplayStyle.None) kuvaKortti.style.display = DisplayStyle.None;   // havainnekuvan paikalla
            var td = vapaa && !Auki ? DisplayStyle.Flex : DisplayStyle.None;
            if (tahtain.style.display != td) tahtain.style.display = td;
            string teksti = Kieli.T(lataa ? "ui.opas.haetaan" : "ui.opas.mika-tama-on");
            if (mikaTeksti.text != teksti) mikaTeksti.text = teksti;
            mikaNappi.SetEnabled(!lataa);
            if (nappi)
            {
                // Havainnekuvan paikalla oikeassa reunassa (OikeaAla).
                mikaRivi.style.left = StyleKeyword.Auto;
                mikaRivi.style.right = OpasTapit.Reuna;
                float ma = OikeaAla(mikaRivi.layout.width);
                if (mikaRivi.style.bottom.value.value != ma) mikaRivi.style.bottom = ma;
            }
            // Vaihtoehdot (≥ 2) Liiku-listan pohjalla; 0 → ilmoitus listassa; 1 kerrotaan suoraan (LS1).
            var v = OpasSovitin.MikaTamaVaihtoehdot;
            if (v != null && v != mikaNaytetty && (v.Count == 0 || v.Count >= 2)) { mikaNaytetty = v; Avaa(Nakyma.Mika); }
            if (v == null) mikaNaytetty = null;
        }

        void RakennaMika()
        {
            Vieritys();
            Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.mika-tama-on-2"), "mk-linssivalitsin__valiotsikko", rivit), Kirjasin.ModerniLihava);
            var v = OpasSovitin.MikaTamaVaihtoehdot ?? (IReadOnlyList<Matkakirja.Linssit.Kierros.OpasTaky>)Array.Empty<Matkakirja.Linssit.Kierros.OpasTaky>();
            if (v.Count == 0) { Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.lahella-ei-ole-tunnettua-kohdetta"), "mk-linssivalikko__lahde", rivit), Kirjasin.Moderni); return; }
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

        /// <summary>
        /// Näkyvät napit ja tapit ruutupikseleinä (origo vasen alakulma) yksityiskohtakortin väistöön (Päätoimittaja 7.10. 21.5x):
        /// kaikkien UI-dokumenttien Buttonit ja mk-tappi-elementit, joiden ketju on näkyvissä; koko ruudun kokoiset (taustat) pois.
        /// </summary>
        static List<KorttiAsettelu.Laatikko> NappienLaatikot()
        {
            var l = new List<KorttiAsettelu.Laatikko>();
            float sw = UiRuutu.Leveys, sh = UiRuutu.Korkeus;
            foreach (var doc in UnityEngine.Object.FindObjectsByType<UIDocument>(FindObjectsSortMode.None))
            {
                var juuri = doc != null && doc.isActiveAndEnabled ? doc.rootVisualElement : null;
                if (juuri?.panel == null) continue;
                float pw = juuri.panel.visualTree.layout.width, sk = pw > 0 ? sw / pw : 1f;
                juuri.Query<VisualElement>().Where(e => e is Button || e.ClassListContains("mk-tappi")).ForEach(e =>
                {
                    if (!NakyvaKetju(e)) return;
                    var r = e.worldBound;
                    if (!(r.width > 1f && r.height > 1f) || r.width * r.height * sk * sk > 0.25f * sw * sh) return;
                    l.Add(new KorttiAsettelu.Laatikko(r.xMin * sk, sh - r.yMax * sk, r.xMax * sk, sh - r.yMin * sk));
                });
            }
            return l;
        }

        static bool NakyvaKetju(VisualElement e)
        {
            for (var p = e; p != null; p = p.parent)
            {
                var st = p.resolvedStyle;
                if (st.display == DisplayStyle.None || st.visibility == Visibility.Hidden || st.opacity < 0.05f) return false;
            }
            return true;
        }

        static string Etaisyys(double m) => m < 1000 ? $"{Math.Round(m / 10) * 10:0} m" : $"{m / 1000:0.0} km".Replace('.', ',');

        /// <summary>LS1: kierros keskeytetty kysymykseen ja vastaus kuultu.</summary>
        static bool KierrosKeskeytetty => OpasSovitin.KierrosJatkettavissa;

        void JatkaKierrosta()
        {
            if (jatkaPaluuna) { PalaaKierrokselle(); return; }
            Debug.Log("MATKAKIRJA opas: jatka kierrosta");
            testiJatka = null;
            OpasSovitin.JatkaKierrosta();
        }

        void PaivitaJatka()
        {
            var c0 = UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
            // Sama rivi kahteen käyttöön: kysymyksen jälkeen "Jatka kierrosta", vapaassa lennossa "Palaa kierrokselle" (9.10.).
            bool paluu = !(testiJatka ?? KierrosKeskeytetty) && PaluuKaytettavissa;
            bool nayta = nappiNakyy && !Auki && !(c0?.Auki ?? false) && ((testiJatka ?? KierrosKeskeytetty) || paluu);
            if (paluu != jatkaPaluuna)
            {
                jatkaPaluuna = paluu;
                jatkaTeksti.text = paluu ? Kieli.T("ui.opas.palaa-kierrokselle") : Kieli.T("ui.opas.jatka-kierrosta");
                jatkaNappi.tooltip = paluu ? Kieli.T("ui.opas.palaa-kohtaan-jossa-kierros-keskeytyi") : Kieli.T("ui.opas.jatka-keskeytynytta-kaupunkikierrosta");
                var uusi = new SvgIkoni(paluu ? Ikonit.Viiva["nuoli"] : Ikonit.Toista);
                uusi.AddToClassList("mk-ikoni"); uusi.AddToClassList("mk-opas-nappi__ikoni");
                jatkaNappi.Insert(jatkaNappi.IndexOf(jatkaIkoni), uusi);
                jatkaIkoni.RemoveFromHierarchy(); jatkaIkoni = uusi;
            }
            var vd = VapaaLentoKaytettavissa ? DisplayStyle.Flex : DisplayStyle.None;
            if (vapaaNappi.style.display != vd) vapaaNappi.style.display = vd;
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
            // Kierroksen ajan esitysrivi (Kysy, mikki, näppäimistö) keskellä väkäsrivin tilalla.
            bool esitys = napitNakyy && (testiEsitys ?? OpasSovitin.KierrosKaynnissa);
            var ed = esitys ? DisplayStyle.Flex : DisplayStyle.None;
            if (esitysRivi.style.display != ed) esitysRivi.style.display = ed;
            esitysNakyy = esitys;
            if (esitys) { esitysRivi.style.bottom = krediittiAla; napitNakyy = false; }
            // TF 169 (9.10.2026): iPhone pystyssä Kysy, mikrofoni ja näppäimistö vasempaan reunaan (oikealla samalla korkeudella ■ ⏸ ⏭).
            bool vasemmalle = PuhelinPysty;
            var jc = vasemmalle ? new StyleEnum<Justify>(Justify.FlexStart) : new StyleEnum<Justify>(StyleKeyword.Null);
            if (esitysRivi.style.justifyContent != jc) esitysRivi.style.justifyContent = jc;
            var pl = vasemmalle ? new StyleLength(OpasTapit.Reuna - Tyylikirja.Vali.Xs) : new StyleLength(StyleKeyword.Null);
            if (esitysRivi.style.paddingLeft != pl) esitysRivi.style.paddingLeft = pl;
            if (napitNakyy != nappiNakyy)
            {
                nappiNakyy = napitNakyy;
                if (napitNakyy) { napit.style.display = DisplayStyle.Flex; napit.schedule.Execute(() => { if (nappiNakyy) napit.style.opacity = 1f; }); AloitaEsittely(); }
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
            var chat = UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
            bool riviNakyy = nakyy && !Auki && !(chat?.Auki ?? false);
            var rd = riviNakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (ohjainRivi.style.display != rd) ohjainRivi.style.display = rd;
            if (!nakyy) { tapit.Paivita(false, krediittiAla, OpasTapit.Reuna); nimilappu.Paivita(null); return; }
            var l = OpasSovitin.Viimeisin?.Silmukka;
            bool pysahdys = l != null && l.Nykyinen != null && (l.Vaihe == OpasVaihe.Puhuu || l.Vaihe == OpasVaihe.Odottaa);
            // Seuraava vain, kun ohitettavaa on (LS1: SeuraavaKaytettavissa); paikka säilyy, jottei tauko hyppää.
            var sv = testiSeuraava ?? OpasSovitin.SeuraavaKaytettavissa ? Visibility.Visible : Visibility.Hidden;
            if (seuraavaNappi.style.visibility != sv) seuraavaNappi.style.visibility = sv;

            // Paikat: puhelimella ohjainrivi nappirivin yläpuolelle oikeaan reunaan ja tapit sen yläpuolelle (junan 148b video:
            // oikea tappi peitti näppäimistönapin); leveällä ruudulla tapit sisemmäs ja ylemmäs, rivi oikean tapin alle keskelle.
            float w = Juuri.layout.width, h = Juuri.layout.height;
            float rivi = Tyylikirja.Nappi.Ohjaus, riviLeveys = ohjainRivi.layout.width;
            if (float.IsNaN(riviLeveys) || riviLeveys <= 0f) riviLeveys = 2f * (Tyylikirja.Nappi.Ohjaus + 8f);
            float sivu = OpasTapit.Reuna, tappiAla = TapitAla + rivi + KuvaRako;
            if (LeveaRuutu && !float.IsNaN(w) && !float.IsNaN(h))
            {
                sivu = Mathf.Round(Mathf.Max(OpasTapit.Reuna, w * TappiSivuOsuus - OpasTapit.Halkaisija * 0.5f));
                tappiAla = Mathf.Round(Mathf.Max(tappiAla, h * TappiKorkeusOsuus - OpasTapit.Halkaisija * 0.5f));
            }
            ohjainAla = tappiAla - KuvaRako - rivi;
            // Rivin oikea reuna tapin keskilinjalle niin, että rivi on tapin alla keskellä; ei ruudun reunan yli.
            float riviOikea = Mathf.Max(OpasTapit.Reuna, sivu + OpasTapit.Halkaisija * 0.5f - riviLeveys * 0.5f);
            if (PuhelinPysty && !float.IsNaN(w))
            {
                // TF 169 (9.10.2026): ■ ⏸ ⏭ samalle korkeudelle kuin Kysy-rivi oikeaan reunaan; jos rivi ei mahdu Kysy-rivin viereen
                // (vapaa lento -nappi mukana kapealla puhelimella), sen yläpuolelle oikeaan reunaan.
                riviOikea = OpasTapit.Reuna;
                ohjainAla = krediittiAla + (NappiriviKorkeus - rivi) * 0.5f;
                float esitysOikea = 0f;
                if (esitysNakyy)
                    foreach (var c in esitysRivi.Children())
                        if (c.resolvedStyle.display != DisplayStyle.None) esitysOikea = Mathf.Max(esitysOikea, Juuri.WorldToLocal(c.worldBound).xMax);
                if (esitysOikea + KuvaRako > w - riviOikea - riviLeveys) ohjainAla = krediittiAla + NappiriviKorkeus + KuvaRako;
            }
            if (ohjainRivi.style.right.value.value != riviOikea) ohjainRivi.style.right = riviOikea;
            if (ohjainRivi.style.bottom.value.value != ohjainAla) ohjainRivi.style.bottom = ohjainAla;

            tapit.Vapaa(VapaaTila);
            tapit.Paivita((pysahdys || VapaaTila) && !Auki && !(chat?.Auki ?? false), tappiAla, sivu);
            // Kohteen nimilappu pysähdyksellä (myös valikon aikana; chat peittää sen joka tapauksessa).
            nimilappu.Paivita(pysahdys && !(chat?.Auki ?? false) ? l.Nykyinen.Nimi : null);
            float siruAla = krediittiAla;
            if (tapit.Nakyy && siruNakyy && !LeveaRuutu)
            {
                float leveys = 0f;
                foreach (var c in sirurivi.Children()) leveys += c.layout.width + 8f;
                float vapaa = w - 2f * (OpasTapit.Reuna + OpasTapit.Halkaisija + KuvaRako);
                if (leveys > vapaa) siruAla = tappiAla + OpasTapit.Halkaisija + KuvaRako;
            }
            if (sirurivi.style.bottom.value.value != siruAla) sirurivi.style.bottom = siruAla;
        }
        /// <summary>Testi `ui opasvalikko seuraava on|off|auto`: Seuraava-napin näkyvyys ilman käynnissä olevaa opasta.</summary>
        bool? testiSeuraava;

        // --- oppaan kuvat --------------------------------------------------------------------------------

        void VaihdaKuvat()
        {
            KuvatPaalla = !KuvatPaalla;
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
                    int maara = NykyisetKuvat().Count;
                    kuvaLaskuri.text = maara > 1 ? maara.ToString() : "";
                    kuvaLaskuri.style.display = maara > 1 ? DisplayStyle.Flex : DisplayStyle.None;
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
            float koko = KuvaKoko;
            if (kuvaKortti.style.width.value.value != koko) { kuvaKortti.style.width = koko; kuvaKortti.style.height = koko; kuvaKortti.style.minHeight = koko; }
            // Oikean tapin keskilinjalle (iPhonella), iPadilla reunaan; pohja nappirivin nappien alareunaan.
            float oikea = Mathf.Max(OpasTapit.Reuna, OpasTapit.Reuna + (OpasTapit.Halkaisija - koko) * 0.5f);
            if (kuvaKortti.style.right.value.value != oikea) kuvaKortti.style.right = oikea;
            float ala = OikeaAla(koko);
            float h = Juuri.resolvedStyle.height;
            if (siruNakyy && !float.IsNaN(h) && sirurivi.layout.height > 0) ala = Mathf.Max(ala, h - sirurivi.layout.yMin + KuvaRako);
            if (kuvaKortti.style.bottom.value.value != ala) kuvaKortti.style.bottom = ala;
        }

        /// <summary>
        /// Oikean reunan elementin (kuvanappi, Mikä tämä on?) alareuna: oikean tapin yläpuolella, kun tapit näkyvät; muuten
        /// nappirivin linjalla, kun avoin rivi ei ulotu sen kohdalle, ja muuten rivin yläpuolella.
        /// </summary>
        float OikeaAla(float leveys)
        {
            float linja = krediittiAla + (NappiriviKorkeus - Tyylikirja.Nappi.Korkeus) * 0.5f;
            if (!LeveaRuutu) return tapit.Nakyy ? tapit.Ala + OpasTapit.Halkaisija + KuvaRako : ohjainAla + Tyylikirja.Nappi.Ohjaus + KuvaRako;
            if (!nappiNakyy) return linja;
            var rb = (riviAuki ? rivinIkkuna : vakanen).worldBound;
            if (rb.width <= 0 || float.IsNaN(rb.xMax)) return linja;
            float riviOikea = Juuri.WorldToLocal(rb).xMax;
            return riviOikea + KuvaRako + leveys + OpasTapit.Reuna <= Juuri.layout.width ? linja : krediittiAla + NappiriviKorkeus + KuvaRako;
        }

        /// <summary>Väkäsen rivi auki/kiinni: liuku esiin väkäsestä oikealle (--tk-kesto-liuku), väkänen › ↔ ‹.</summary>
        void AsetaRiviAuki(bool auki)
        {
            if (auki == riviAuki) return;
            riviAuki = auki;
            vakanen.Clear();
            vakanen.Add(new SvgIkoni(auki ? Ikonit.Takaisin : Ikonit.NuoliOikea));
            vakanen.tooltip = auki ? Kieli.T("ui.opas.piilota-napit") : Kieli.T("ui.opas.nayta-napit");
            vakanen.EnableInClassList("mk-valittu", auki);
            if (auki)
            {
                liuku.style.display = DisplayStyle.Flex;
                liuku.schedule.Execute(() => { if (riviAuki) napit.AddToClassList("mk-opas-napit--auki"); });
            }
            else
            {
                napit.RemoveFromClassList("mk-opas-napit--auki");
                liuku.schedule.Execute(() => { if (!riviAuki) liuku.style.display = DisplayStyle.None; }).StartingIn(Tyylikirja.Kesto.Liuku);
            }
            Debug.Log("MATKAKIRJA opas: nappirivi " + (auki ? "auki" : "kiinni"));
        }

        /// <summary>Ensimmäinen kerta: rivi 3 s auki, sitten väkäsen alle (muistetaan PlayerPrefsissä).</summary>
        void AloitaEsittely()
        {
            if (esittely != null || PlayerPrefs.GetInt(EsittelyAvain, 0) == 1) return;
            AsetaRiviAuki(true);
            esittely = napit.schedule.Execute(() => { LopetaEsittely(); AsetaRiviAuki(false); }).StartingIn(EsittelyMs);
        }

        void LopetaEsittely()
        {
            if (PlayerPrefs.GetInt(EsittelyAvain, 0) == 1 && esittely == null) return;
            esittely?.Pause();
            PlayerPrefs.SetInt(EsittelyAvain, 1); PlayerPrefs.Save();
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
            foreach (var x in kaikki.Count > 0 ? kaikki : new[] { k }) sarja.Add(Lehtikuvaksi(x, l?.Nimi));
            suurennos.Avaa(sarja, 0);
            Debug.Log($"MATKAKIRJA opas: kuvat suurennettu ({sarja.Count})");
        }

        /// <summary>Oppaan kuva suurennoksen kuvaksi: selite (havainnekuvalla HAVAINNEKUVA) ja lähderivi tekijä · lisenssi.</summary>
        static LehtiKuva Lehtikuvaksi(OpasKuva x, string nimi)
        {
            string teksti = !string.IsNullOrWhiteSpace(x.Selite) ? x.Selite : nimi;
            string selite = x.Havainnekuva ? "HAVAINNEKUVA" + (teksti != null ? " · " + teksti : "") : teksti;
            return new LehtiKuva
            {
                Lahde = x.Url, Lyhyt = selite, Selite = selite,
                LahdeRivi = string.Join(" · ", new[] { x.Tekija, x.Lisenssi }.Where(y => !string.IsNullOrEmpty(y))),
            };
        }

        // KUVA LATAUKSEN AJAKSI (omistaja 6.10. 23.3x: "näyttää automaattisesti yhden kuvan 80 % kokoisena", juna 156; LS1
        // OpasSovitin.LatausKuva): saavuttaessa, kun laattoja on alle rajan, kohteen ensimmäinen kuva KUVASUURENNOS-pohjan
        // kokoruututilassa 80 %:n kokoisena lähderiveineen. LS1 poistaa kuvan (laatat valmiit, aikaraja, lento, Seuraava);
        // napautus sulkee sen kuten muunkin suurennoksen. Kaupunkikamera ei pysähdy (lataus jatkuu kuvan alla).
        Kuvasuurennos latausSuurennos;
        const float LatausKuvaOsuus = 0.8f;

        // OMISTAJA TF 169 (9.10.2026 klo 10.0x): "Älä enää avaa niitä melkein koko ruudun kuvia automaattisesti isolle, vaan pidä niitä vain
        // alareunassa klikattavina" → ei automaattista suurennosta koskaan, ei myöskään latauksen varakuvana. Kohteen kuvat ovat oikean
        // alareunan kuvakortissa (lisäkuvat, napautus suurentaa) ja kertojan tarinakuvat kuvanostossa (lentävät näkyviin).
        public static bool LatausKuvaAuto = false;

        void LatausKuvaVaihtui(OpasKuva k)
        {
            if (k == null) { if (latausSuurennos?.Auki ?? false) { latausSuurennos.Sulje(); Debug.Log("MATKAKIRJA opas: latauskuva suljettu"); } return; }
            if (!LatausKuvaAuto) { Debug.Log("MATKAKIRJA opas: latauskuva ei suurennu automaattisesti (TF 169) " + k.Url); return; }
            if (!nakyy || !KuvatPaalla || (suurennos?.Auki ?? false)) return;
            latausSuurennos ??= new Kuvasuurennos(UiKerros.Hae().Juuri(UiKerros.Valikot)) { Tayteen = true, Kokoruutu = true, LahdeKokoruudussa = true, Osuus = LatausKuvaOsuus, Lahentyy = true };
            latausSuurennos.Avaa(new[] { Lehtikuvaksi(k, OpasSovitin.Viimeisin?.Silmukka?.Nykyinen?.Nimi) }, 0);
            Debug.Log("MATKAKIRJA opas: latauskuva näkyviin " + k.Url);
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
            valikko.style.width = StyleKeyword.Null;
            rivit = null;
            nykyiset.Clear();
            var kaikki = VainSallitut(Kaupungit?.Invoke());
            if (aloitus) RakennaAloitus();
            switch (nakyma)
            {
                case Nakyma.Paa:
                    // Päätoimittaja 5.10. klo 20.4x: pään kolme riviä samalla TOIMINTO-rivipohjalla (kultareunus), Vaihda kohde ›-merkillä.
                    // Kaupunkitilassa (kartan kuumailmapallo avasi yhden kaupungin oppaan) ei kohteen vaihtoa (omistaja 7.10. 08.3x).
                    if (!Kaupunkitila) Alanakyma(Kieli.T("ui.opas.vaihda-kohde"), () => Avaa(Nakyma.Takyt), toiminto: true);
                    // Tauko ja kuvat valikon riveinä, tila tekstissä (omistaja 6.10. 12.1x).
                    Komento(KuvatPaalla ? Kieli.T("ui.opas.kuvat-paalla") : Kieli.T("ui.opas.kuvat-pois"), VaihdaKuvat);
                    Komento(Kieli.T("ui.opas.nayta-teksti"), NaytaTeksti);
                    // MIKSERI (omistaja 9.10.2026 klo 00.5x: "mikseriin pitäisi päästä kun ollaan kuumailmapallossa"): sama Äänentasot-
                    // paneeli kuin päävalikon Peli › Mikseri (kertoja ja puhe, repliikit, musiikki, tehosteet, äänimaisema, sää);
                    // aukeaa pallon päälle (Valikot-kerros), lento jatkuu taustalla.
                    // Omistaja 9.10. 09.5x: vain kehittäjäkoodilla.
                    if (Asetukset.Kehittaja) Komento(Kieli.T("ui.opas.mikseri"), () =>
                    {
                        var at = UiNakymat.Hae()?.Aanentasot;
                        if (at == null) return;
                        // ☰:n alle kuten oppaan muut listat (katselmointi 9.10.); pohja ennallaan.
                        if (nappi.panel != null) at.YlaOhitus = nappi.worldBound.yMax + 8f;
                        at.AvaaOsa(Aanentasot.Osa.Aanet);
                    });
                    // LÄHTEET (omistaja 7.10. 22.5x: kuvien tekijät eivät näy kuvissa, vaan täällä; sama alanäkymä kuin linnan Lähteet).
                    Alanakyma(Kieli.T("ui.opas.lahteet"), () => Avaa(Nakyma.Lahteet));
                    Viiva();
                    Komento(Kieli.T("ui.opas.poistu-linssista"), () => UiNakymat.Hae()?.Linssit?.SuljeLinssi());
                    break;
                case Nakyma.Takyt:
                    if (aloitus) RakennaAloitusPaikat(kaikki); else RakennaTakyt(kaikki);
                    break;
                case Nakyma.Lahteet:
                    Takaisin(Kieli.T("ui.opas.lahteet"), Nakyma.Paa);
                    Komento(Kieli.T("ui.opas.kartta-aineistot"), () => { KrediititTiivis.NaytaKaikki(); Debug.Log("MATKAKIRJA opas: kartta-aineistot"); });
                    // Kenttä-äänitysten nimeämiset (Pelikoodari 8.10.2026, CC BY / BY-SA): oma alanäkymä.
                    Alanakyma(Kieli.T("ui.opas.aanet"), () => Avaa(Nakyma.Aanet));
                    // Säätiedot (Pelikoodari 8.10.: /opas/saa, MET Norwayn lisenssiehto): aina näkyvissä, kun sää on käytettävissä.
                    Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T(SaaLahde), "mk-linssivalikko__lahde", Kohde), Kirjasin.Moderni);
                    // Korkeusmallit (Päätoimittaja 8.10.2026: LS1:n korkeuslukija 25d32fd39; tekstit Karttasepän korkeus-20261008-jsoneista).
                    foreach (var k in KorkeusLahteet) Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T(k), "mk-linssivalikko__lahde", Kohde), Kirjasin.Moderni);
                    // Elävän kaupungin aineistot (LS1 8.10.2026: ElavaKaupunki.Krediitti, esim. OSM ODbL ja ESA WorldCover; null = ei riviä).
                    string elava = ElavaKrediitti();
                    if (!string.IsNullOrWhiteSpace(elava)) Kirjasimet.Aseta(Rakenne.Teksti(elava.Trim(), "mk-linssivalikko__lahde", Kohde), Kirjasin.Moderni);
                    // Oma vesipinta (LS2: OSM, ESA WorldCover) kartan ruudulta tänne (omistaja 9.10. 09.5x: ruudulla vain © OpenStreetMap).
                    string vesi = KaupunkiVesi.KrediittiNyt;
                    if (!string.IsNullOrWhiteSpace(vesi)) Kirjasimet.Aseta(Rakenne.Teksti(vesi.Trim(), "mk-linssivalikko__lahde", Kohde), Kirjasin.Moderni);
                    // Omat 3D-mallit (Päätoimittaja 9.10.2026: Concorde, Riddarholmen, Notre-Dame, Giza): mallit.json:n kohdekohtaiset
                    // tekijärivit (LS2 0bf2ed7b2: CesiumOmatMallit.Lahderivit; tyhjä, kunnes json on saapunut).
                    foreach (var m in Matkakirja.Linssit.CesiumOmatMallit.Lahderivit)
                        if (!string.IsNullOrWhiteSpace(m)) Kirjasimet.Aseta(Rakenne.Teksti(m.Trim(), "mk-linssivalikko__lahde", Kohde), Kirjasin.Moderni);
                    Viiva();
                    Vieritys();
                    var lahteet = KuvaLahteet();
                    if (lahteet.Count == 0) Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.ei-kuvalahteita"), "mk-linssivalikko__lahde", rivit), Kirjasin.Moderni);
                    foreach (var l in lahteet) Kirjasimet.Aseta(Rakenne.Teksti(l, "mk-linssivalikko__lahde", rivit), Kirjasin.Moderni);
                    // Historiaosioiden tekstilähteet osion nimellä (LS1 c50c4dcc5: OpasSovitin.HistoriaLahteet; kuvat ovat KuvaLahteissa).
                    foreach (var l in HistoriaLahteet()) Kirjasimet.Aseta(Rakenne.Teksti(l, "mk-linssivalikko__lahde", rivit), Kirjasin.Moderni);
                    break;
                case Nakyma.Aanet:
                    Takaisin(Kieli.T("ui.opas.aanet"), Nakyma.Lahteet);
                    Vieritys();
                    // Ryhmät (Päätoimittaja 9.10.2026, juna 171): väliotsikko (sama pohja kuin "MIKÄ TÄMÄ ON?") ja rivit aakkosittain.
                    var aanet = AaniLahteet();
                    if (aanet.Count == 0) Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.ei-aanilahteita"), "mk-linssivalikko__lahde", rivit), Kirjasin.Moderni);
                    foreach (var (ryhma, ryhmanRivit) in aanet)
                    {
                        Kirjasimet.Aseta(Rakenne.Teksti(ryhma.ToUpperInvariant(), "mk-linssivalitsin__valiotsikko", rivit), Kirjasin.ModerniLihava);
                        foreach (var l in ryhmanRivit) Kirjasimet.Aseta(Rakenne.Teksti(l, "mk-linssivalikko__lahde", rivit), Kirjasin.Moderni);
                    }
                    break;
                case Nakyma.Kysy:
                    RakennaKysy();
                    // UI-kuva-arkki 9.10.2026 (19059ffb7, iPhone vaaka): sisällön mittainen paneeli rivitti kysymykset kahdelle riville,
                    // jolloin Puhu oppaalle ja Kirjoita oppaalle jäivät vierityksen taakse ilman vihjettä. Matalalla vaakaruudulla
                    // paneeli 45 % leveäksi (peittoraja); RajaaLeveys pitää sen turva-alueen sisällä.
                    if (!LeveaRuutu && !PuhelinPysty && Juuri.layout.width > 0) valikko.style.width = Mathf.Round(Juuri.layout.width * 0.45f);
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
                    Takaisin(Kieli.T("ui.opas.vaihda-kohde"), Nakyma.Paa);
                    if (kaikki == null || kaikki.Count == 0) { Tyhja(Kieli.T("ui.opas.kaupungit-latautuvat")); break; }
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
        static bool OnTakyja => OpasSovitin.Takyt != null && SallitutTakyt().Any();


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
            bool pino = !UiKerros.Tabletti && UiRuutu.Korkeus > UiRuutu.Leveys;
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
            Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.valitse-paikka"), "mk-linssivalitsin__valiotsikko", aloitusVasen), Kirjasin.ModerniLihava);
            aloitusPaikat = Lista(aloitusVasen);
            aloitusOikea = Rakenne.El("mk-opas-aloitus__sarake", valikko, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.suosikit"), "mk-linssivalitsin__valiotsikko", aloitusOikea), Kirjasin.ModerniLihava);
            aloitusSuosikit = Lista(aloitusOikea);
            if (OnTakyja) foreach (var t in SallitutTakyt().Take(SuosikitMax)) TakyRivi(t, aloitusSuosikit);
            else
            {
                Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.suosikit-latautuvat"), "mk-linssivalikko__lahde", aloitusSuosikit), Kirjasin.Moderni);
                // Täkyt saapuvat: vain suosikkisarake täyttyy (paikkasarake ja sen vieritys pysyvät).
                var sarake = aloitusSuosikit;
                sarake.schedule.Execute(() =>
                {
                    if (!aloitus || aloitusSuosikit != sarake || !OnTakyja) return;
                    sarake.Clear();
                    foreach (var t in SallitutTakyt().Take(SuosikitMax)) TakyRivi(t, sarake);
                }).Every(500).Until(() => !aloitus || aloitusSuosikit != sarake || OnTakyja && sarake.childCount > 1);
            }
            AsetteleAloitus();
        }

        /// <summary>Aloituksen paikkasarake: maanosat (sisältö vaihtuu sarakkeessa › maa › kaupunki) ja Poistu linssistä.</summary>
        void RakennaAloitusPaikat(IReadOnlyList<Kaupunki> kaikki)
        {
            Vieritys();
            if (kaikki == null || kaikki.Count == 0) Tyhja(Kieli.T("ui.opas.kaupungit-latautuvat"));
            else foreach (var m in kaikki.Select(k => k.Maanosa).Where(m => !string.IsNullOrEmpty(m)).Distinct().OrderBy(m => m))
            {
                string mm = m;
                Alanakyma(mm, () => { maanosa = mm; Avaa(Nakyma.Maat); });
            }
            Viiva();
            Komento(Kieli.T("ui.opas.poistu-linssista"), () => UiNakymat.Hae()?.Linssit?.SuljeLinssi());
        }

        void RakennaTakyt(IReadOnlyList<Kaupunki> kaikki)
        {
            Vieritys();
            // Ilman täkyjä (ei vastausta tai tyhjä) ei tyhjää otsikkoa eikä latausriviä: pelkät maanosat kuten ennen täkyjä.
            // Lista ei myöskään rakennu uudelleen täkyjen saapuessa, jotta rivit eivät siirry sormen alta.
            if (OnTakyja)
            {
                Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.mihin-lennetaan"), "mk-linssivalitsin__valiotsikko", rivit), Kirjasin.ModerniLihava);
                foreach (var t in SallitutTakyt()) TakyRivi(t);
                Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.tai-valitse-paikka"), "mk-linssivalitsin__valiotsikko", rivit), Kirjasin.ModerniLihava);
            }
            if (kaikki == null || kaikki.Count == 0) { Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.kaupungit-latautuvat"), "mk-linssivalikko__lahde", rivit), Kirjasin.Moderni); return; }
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
        // Nimet Kieli-avaimina (juna 172/173): näytettäessä Kieli.T.
        static readonly (PalloAika Arvo, string Nimi)[] AikaValinnat = { (PalloAika.Paiva, "ui.opas.aika.paiva"), (PalloAika.Yo, "ui.opas.aika.yo") };
        static readonly (PalloSaa Arvo, string Nimi)[] SaaValinnat =
        {
            (PalloSaa.Pois, "ui.opas.saa.pois"), (PalloSaa.Selkea, "ui.opas.saa.selkea"), (PalloSaa.Pilvinen, "ui.opas.saa.pilvinen"), (PalloSaa.Sade, "ui.opas.saa.sade"),
            (PalloSaa.Sumu, "ui.opas.saa.sumu"), (PalloSaa.Lumi, "ui.opas.saa.lumi"), (PalloSaa.Ukkonen, "ui.opas.saa.ukkonen"),
        };
        const string SaatilaAvain = "matkakirja-pallo-saatila";
        /// <summary>Säätietojen lähderivi (CC BY 4.0 -ehto; Pelikoodarin worker /opas/saa).</summary>
        static readonly string[] KorkeusLahteet =
        {
            "ui.opas.lahde.korkeus-pariisi", "ui.opas.lahde.korkeus-muut", "ui.opas.lahde.rakennukset",   // Kieli-avaimet
        };

        const string SaaLahde = "ui.opas.lahde.saa";   // Kieli-avain

        /// <summary>LS1:n silta (junat 165–166): KaupunkiKuva.Valinta "paiva" | "yo" = voimassa oleva Saatila.Aika.</summary>
        static string AikaValinta { get => KaupunkiKuva.Valinta ?? "paiva"; set => KaupunkiKuva.Valinta = value; }

        /// <summary>LS1: KaupunkiKuva.Nyt (paiva | yo), voimassa oleva tila.</summary>
        static string AikaNyt => KaupunkiKuva.Nyt ?? "paiva";

        static string Avain(PalloAika a) => a == PalloAika.Yo ? "yo" : "paiva";
        static string Nimi(PalloAika a) => Kieli.T(AikaValinnat.FirstOrDefault(x => x.Arvo == a).Nimi);
        static string Nimi(PalloSaa s) => Kieli.T(SaaValinnat.FirstOrDefault(x => x.Arvo == s).Nimi);

        /// <summary>
        /// Tallennettu säätila (PlayerPrefs; oletus LIVE pois, päivä, sää pois) Saatila-luokkaan; jokainen muutos tallennetaan ja
        /// voimassa oleva aika kirjoitetaan LS1:n sillalle.
        /// </summary>
        static bool saatilaLuettu;
        static void LueSaatila()
        {
            if (saatilaLuettu) return;
            saatilaLuettu = true;
            Saatila.Lue(PlayerPrefs.GetString(SaatilaAvain, ""));
            // Säävalinnat poistuivat listasta (9.10.2026): tallennettu käsisää (esim. ukkonen) ei saa jäädä päälle → selkeä (pois).
            if (Saatila.SaaValinta != PalloSaa.Pois) Saatila.Lue((Saatila.Live ? "1" : "0") + "|" + Saatila.AikaValinta + "|" + PalloSaa.Pois);
            AikaValinta = Avain(Saatila.Aika);
            Saatila.Muuttui += () =>
            {
                PlayerPrefs.SetString(SaatilaAvain, Saatila.Tallenne); PlayerPrefs.Save();
                if (AikaValinta != Avain(Saatila.Aika)) AikaValinta = Avain(Saatila.Aika);
            };
        }

        const string SaaVihjeAvain = "matkakirja-saatila-vihje-nahty";
        const string SaaVihjeTeksti = "ui.opas.saa-vihje";   // Kieli-avain
        SaaVihje saaVihje;
        Label saaVihjeLappu;
        VisualElement saaVihjeViiva;
        bool saaVihjeNakyy;

        void RakennaSaaVihje()
        {
            saaVihje = new SaaVihje(PlayerPrefs.GetInt(SaaVihjeAvain, 0) == 1);
            saaVihjeViiva = Rakenne.El("tk-teema-harmaa mk-opas-nimilappu__viiva", Juuri, PickingMode.Ignore);
            saaVihjeLappu = Rakenne.Teksti(Kieli.T(SaaVihjeTeksti), "tk-teema-harmaa mk-opas-nimilappu", Juuri);
            saaVihjeLappu.style.whiteSpace = WhiteSpace.Normal;
            saaVihjeLappu.style.maxWidth = 220f;
            Kirjasimet.Aseta(saaVihjeLappu, Kirjasin.Moderni);
            saaVihjeLappu.RegisterCallback<PointerDownEvent>(e => { e.StopPropagation(); SuljeSaaVihje(); });
            saaVihjeLappu.style.display = DisplayStyle.None; saaVihjeViiva.style.display = DisplayStyle.None;
        }

        /// <summary>Napautus kuplaan tai ☾-nappiin: pois eikä tule enää.</summary>
        void SuljeSaaVihje()
        {
            if (saaVihje == null || saaVihje.Nahty && !saaVihjeNakyy) return;
            saaVihje.Suljettu();
            TallennaSaaVihje();
            AsetaSaaVihje(false);
        }

        void TallennaSaaVihje()
        {
            if (!saaVihje.Nahty || PlayerPrefs.GetInt(SaaVihjeAvain, 0) == 1) return;
            PlayerPrefs.SetInt(SaaVihjeAvain, 1); PlayerPrefs.Save();
        }

        /// <summary>Joka ruudulla: ensimmäisellä pallokerralla 15 s alusta 5 s näkyvissä (SaaVihje); ei valikon, chatin eikä siirtymän aikana.</summary>
        void PaivitaSaaVihje()
        {
            if (saaVihje == null) return;
            var chat = UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
            bool este = Auki || (chat?.Auki ?? false) || (siirtyma != null && siirtyma.style.display != DisplayStyle.None);
            bool n = nakyy && saaVihje.Nakyy(Time.unscaledTime, Saatila.Live, este);
            TallennaSaaVihje();
            AsetaSaaVihje(n);
            if (!n || aikaNappi.panel == null) return;
            // ☾-napin alle: viiva napin keskeltä alas 12 pt, lappu viivan päähän napin vasemmasta reunasta (ruudun sisällä).
            var nb = Juuri.WorldToLocal(aikaNappi.worldBound);
            float x = nb.center.x, y = nb.yMax + 4f;
            saaVihjeViiva.style.left = x - 0.75f; saaVihjeViiva.style.top = y; saaVihjeViiva.style.height = 12f;
            saaVihjeLappu.style.top = y + 12f;
            // Ruudun sisään (pallotilan katselmointi 9.10.: ☀ on ☰:n vieressä oikealla, lappu leikkautui oikeasta reunasta).
            float lev = Juuri.layout.width, lw = saaVihjeLappu.layout.width;
            if (float.IsNaN(lw) || lw <= 0) lw = 220f;
            float vasen = Mathf.Max(8f, nb.xMin);
            if (!float.IsNaN(lev) && lev > 0) vasen = Mathf.Clamp(Mathf.Min(vasen, nb.xMax - lw), 8f, Mathf.Max(8f, lev - lw - 8f));
            saaVihjeLappu.style.left = vasen;
        }

        void AsetaSaaVihje(bool n)
        {
            if (n == saaVihjeNakyy) return;
            saaVihjeNakyy = n;
            foreach (var e in new VisualElement[] { saaVihjeLappu, saaVihjeViiva })
            {
                if (n)
                {
                    e.style.display = DisplayStyle.Flex;
                    var el = e;
                    el.schedule.Execute(() => { if (saaVihjeNakyy) el.AddToClassList("mk-opas-nimilappu--nakyy"); });
                }
                else
                {
                    e.RemoveFromClassList("mk-opas-nimilappu--nakyy");
                    var el = e;
                    el.schedule.Execute(() => { if (!saaVihjeNakyy) el.style.display = DisplayStyle.None; }).StartingIn(Tyylikirja.Kesto.Sulku);
                }
            }
            Debug.Log("MATKAKIRJA opas: säätilan vihje " + (n ? "näkyviin" : "pois"));
        }

        /// <summary>Sään kuvake (Ikonit.Viiva): selkeä = aurinko; null = sää pois.</summary>
        static string SaaKuvake(PalloSaa s) => s switch
        {
            PalloSaa.Selkea => "paiva", PalloSaa.Pilvinen => "pilvi", PalloSaa.Sade => "sade", PalloSaa.Sumu => "sumu",
            PalloSaa.Lumi => "lumi", PalloSaa.Ukkonen => "ukkonen", _ => null,
        };

        /// <summary>
        /// ☾-nappi: LIVE päällä → vain teksti LIVE läpikuultavalla oranssilla pohjalla (omistaja 8.10. 09.1x; tila.live-kuulto, koko ja
        /// kulma ennallaan); muuten ajan kuvake ja sen kulmassa pieni sääkuvake, kun sää ei ole pois.
        /// </summary>
        void PaivitaAika()
        {
            string nyt = AikaNyt;
            string k = nyt + "|" + Saatila.Saa + "|" + Saatila.Live;
            if (k != aikaKuvake && Ikonit.Viiva.TryGetValue(nyt, out var svg))
            {
                aikaKuvake = k;
                aikaNappi.Clear();
                aikaNappi.EnableInClassList("mk-ohjausnappi--live", Saatila.Live);
                if (Saatila.Live) Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.live"), "mk-ohjausnappi__live", aikaNappi), Kirjasin.ModerniLihava);
                else
                {
                    aikaNappi.Add(new SvgIkoni(svg));
                    if (SaaKuvake(Saatila.Saa) is string sk && Ikonit.Viiva.TryGetValue(sk, out var ssvg))
                    {
                        var pieni = new SvgIkoni(ssvg);
                        pieni.AddToClassList("mk-ohjausnappi__saa");
                        aikaNappi.Add(pieni);
                    }
                }
                aikaNappi.tooltip = Kieli.T(Saatila.Live ? "ui.opas.aika.tooltip-live" : "ui.opas.aika.tooltip", Nimi(Saatila.Aika), Nimi(Saatila.Saa).ToLowerInvariant());
            }
            if (aikaNappi.parent?.panel != null && Juuri.panel != null) nimilappu.Este = Juuri.WorldToLocal(aikaNappi.parent.worldBound);
        }

        /// <summary>
        /// ☾-lista (omistaja 8.10.2026 klo 09.1x): ylimpänä LIVE omassa korostetussa laatikossaan (päällä tila-live oranssi, pois
        /// teeman toiminto-harmaa), sitten AIKA (päivä, yö) ja SÄÄ (pois … ukkonen) ✓-merkein. LIVE kytkee molemmat kohteen
        /// todellisiin ja palauttaa pois kytkettäessä käsivalinnat; käsivalinta LIVEn aikana sammuttaa LIVEn (Saatila).
        /// </summary>
        void RakennaAika()
        {
            var live = Komento(Kieli.T("ui.opas.live"), () => { Saatila.Live = !Saatila.Live; aikaKuvake = null; Debug.Log("MATKAKIRJA opas: live " + (Saatila.Live ? "päälle" : "pois")); }, valikko);
            live.AddToClassList("mk-linssivalikko__live");
            live.EnableInClassList("mk-valittu", Saatila.Live);
            live.tooltip = Saatila.Live ? Kieli.T("ui.opas.live-paalla-kohteen-kellonaika-ja") : Kieli.T("ui.opas.live-pois");
            // SÄÄVALINNAT POIS (omistaja 9.10.2026: "en ole varma tarvitaanko eri säätiloja, tosin jonkun verran ukkosta ja sadetta voisi
            // tulla jossain kohdissa itsestään"; Päätoimittaja, juna 170): vain LIVE ja vuorokaudenaika; sää tulee itsestään (LS1, LS2).
            // Lista on niin lyhyt, että sama asettelu käy pystyyn ja vaakaan (ei sarakkeita).
            Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.opas.aika"), "mk-linssivalitsin__valiotsikko", valikko), Kirjasin.ModerniLihava);
            foreach (var (arvo, nimi) in AikaValinnat)
            {
                var a = arvo;
                Komento(Kieli.T(nimi) + (!Saatila.Live && a == Saatila.Aika ? "  ✓" : ""), () =>
                {
                    Saatila.AikaValinta = a; aikaKuvake = null;
                    Debug.Log("MATKAKIRJA opas: aika " + Avain(a));
                });
            }
        }

        bool yoTeema;

        /// <summary>Yöllä listat tummalla teemalla (omistaja 9.10.2026 "Tee vain niin"), päivällä harmaalla.</summary>
        void PaivitaYoTeema()
        {
            bool yo = Saatila.Aika == PalloAika.Yo;
            if (yo == yoTeema) return;
            yoTeema = yo;
            valikko.EnableInClassList("tk-teema-harmaa", !yo);
            valikko.EnableInClassList("tk-teema-tumma", yo);
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
            taukoNappi.tooltip = tauolla ? Kieli.T("ui.opas.jatka") : Kieli.T("ui.opas.tauko");
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
            b.tooltip = Kieli.T("ui.opas.takaisin");
            Viiva();
        }

        void Tyhja(string teksti) => Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-linssivalikko__lahde", Kohde), Kirjasin.Moderni);

        void Viiva() => Rakenne.El("mk-linssivalikko__viiva", Kohde, PickingMode.Ignore);

        /// <summary>
        /// Nykyisen kaupungin yksityiskohtakuvien tekijät (LS1: OpasSovitin.KuvaLahteet, (Kohde, Tekija, Lisenssi, Havainnekuva)
        /// heijastuksella): "kohde · tekijä · lisenssi"; havainnekuvassa "kohde · Havainnekuva"; kukin kerran.
        /// </summary>
        static List<string> KuvaLahteet()
        {
            var tulos = new List<string>();
            // Suoraan LS1:n OpasSovitin.KuvaLahteet (9.10.: heijastus pois, puuttuva rajapinta kaatuu käännökseen).
            var lista = OpasSovitin.KuvaLahteet;
            if (lista == null) return tulos;
            foreach (var (kohdeN, tekijaN, lisenssiN, havainne) in lista)
            {
                string kohde = kohdeN, tekija = (tekijaN ?? "").Trim(), lisenssi = (lisenssiN ?? "").Trim();
                var osat = new List<string>();
                if (!string.IsNullOrWhiteSpace(kohde)) osat.Add(kohde.Trim());
                if (havainne) osat.Add(Kieli.T("ui.opas.lahde.havainnekuva"));
                else { if (tekija.Length > 0) osat.Add(tekija); if (lisenssi.Length > 0) osat.Add(lisenssi); }
                string rivi = string.Join(" · ", osat);
                // Havainnekuva näkyy aina (tekijä usein tyhjä, LS1); muu kuva vain, jos tekijä tai lisenssi on annettu.
                if ((havainne || osat.Count > 1) && !tulos.Contains(rivi)) tulos.Add(rivi);
            }
            return tulos;
        }

        /// <summary>Nykyisen kaupungin historiaosioiden lähteet "otsikko · url" (LS1: OpasSovitin.HistoriaLahteet); kukin kerran.</summary>
        static List<string> HistoriaLahteet()
        {
            var tulos = new List<string>();
            var lista = OpasSovitin.HistoriaLahteet;
            if (lista == null) return tulos;
            foreach (var (otsikko, urlit) in lista)
            {
                if (urlit == null) continue;
                foreach (var u in urlit)
                {
                    if (string.IsNullOrWhiteSpace(u)) continue;
                    string rivi = string.IsNullOrWhiteSpace(otsikko) ? u.Trim() : otsikko.Trim() + " · " + u.Trim();
                    if (!tulos.Contains(rivi)) tulos.Add(rivi);
                }
            }
            return tulos;
        }

        /// <summary>LS1:n ElavaKaupunki.Krediitti suoraan (9.10.: heijastus pois, puuttuva rajapinta kaatuu käännökseen); null = ei riviä.</summary>
        static string ElavaKrediitti() => ElavaKaupunki.Krediitti;

        [Serializable] sealed class AaniNimeaminen { public string lahde, nimi, tekija, lisenssi, url, ryhma; }
        [Serializable] sealed class AaniLahdeTiedosto { public AaniNimeaminen[] nimeamiset; }

        /// <summary>
        /// Pelin kenttä-äänitysten nimeämiset (Pelikoodari 8.10.2026: 43 CC BY / BY-SA -äänitystä maisemakoreissa ja kaupunkien
        /// äänissä sekä pallon äänimaiseman 3 CC BY -ääntä, yhteensä 46; 9.10. +5: proomu, sumutorvi ja Olavinlinnan läpipeluun luuta, varusteet ja yölinnut = 51; +3 elävän kaupungin lokit ja kyyhkyt = 54; lisenssikatselmus +19 Pulun tehosteet, äänimaisema v2 ja Ihmisen matka v2 = 73; +2 Pariisin lapset ja raitiovaunu = 75; lisenssiehto): "nimi · tekijä · lisenssi" kuten kuvalähteet. Data: kopio webin data/aanilahteet.json:sta
        /// (Resources/Lahteet), joten näkyy myös ilman verkkoa; päivitys kopioimalla tiedosto uudelleen.
        /// </summary>
        static List<(string Ryhma, List<string> Rivit)> AaniLahteet()
        {
            var tulos = new List<(string ryhma, string rivi)>();
            var ta = Resources.Load<TextAsset>("Lahteet/aanilahteet");
            if (ta == null) return new List<(string, List<string>)>();
            AaniLahdeTiedosto d = null;
            try { d = JsonUtility.FromJson<AaniLahdeTiedosto>(ta.text); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA opas: aanilahteet.json: " + e.Message); }
            if (d?.nimeamiset == null) return new List<(string, List<string>)>();
            foreach (var a in d.nimeamiset)
            {
                var osat = new[] { a?.nimi, a?.tekija, a?.lisenssi }.Where(x => !string.IsNullOrWhiteSpace(x)).Select(x => x.Trim()).ToList();
                if (osat.Count < 2) continue;
                tulos.Add((a.ryhma, string.Join(" · ", osat)));
            }
            // Ryhmät kiinteässä järjestyksessä, rivit aakkosittain (Ydin AaniLahdeRyhmat; puuttuva "ryhma" → Muut).
            return Matkakirja.Linssit.Kierros.AaniLahdeRyhmat.Ryhmittele(tulos);
        }

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
                // Vuorokaudenajan lista napin alle: vasemmassa puoliskossa napin vasen reuna, oikeassa napin oikea reuna (TF 167:
                // ☀ ☰:n vieressä oikealla → lista leikkautui oikeasta reunasta).
                var an = aikaNappi.worldBound;
                var ay = isa.WorldToLocal(new Vector2(an.xMin, an.yMax));
                var ao = isa.WorldToLocal(new Vector2(an.xMax, an.yMax));
                float lev = isa.resolvedStyle.width;
                valikko.style.top = ay.y + 8;
                if (!float.IsNaN(lev) && (ay.x + ao.x) / 2f > lev / 2f) { valikko.style.left = StyleKeyword.Auto; valikko.style.right = Mathf.Max(0, lev - ao.x); RajaaLeveys(ao.x - TurvaVasen(lev)); }
                else { valikko.style.left = ay.x; valikko.style.right = StyleKeyword.Auto; RajaaLeveys(lev - ay.x - TurvaOikea(lev)); }
                SovitaKorkeus();
                return;
            }
            valikko.style.left = StyleKeyword.Auto;
            var n = nappi.worldBound;
            var yla = isa.WorldToLocal(new Vector2(n.xMax, n.yMax));
            float leveys = isa.resolvedStyle.width;
            valikko.style.top = yla.y + 8;
            valikko.style.right = float.IsNaN(leveys) ? 10 : Mathf.Max(0, leveys - yla.x);
            if (!float.IsNaN(leveys)) RajaaLeveys(yla.x - TurvaVasen(leveys));
            SovitaKorkeus();
        }

        // PANEELI RUUDUN SISÄÄN (pallon UI-katselmointi 9.10.2026, TF 172 iPhone pysty: Kysy oppaalta -lista leikkautui vasemmasta
        // reunasta, koska ☰:n oikeaan reunaan kiinnitetty paneeli levisi pisimmän rivin mittaiseksi): leveys enintään napista
        // turva-alueen reunaan (8 pt väli); rivit rivittyvät kuten ennenkin. Ei vaikuta, kun paneeli mahtuu.
        void RajaaLeveys(float tila) => valikko.style.maxWidth = tila > 0 ? Mathf.Max(240f, tila - 8f) : StyleKeyword.Null;

        /// <summary>Turva-alueen vasen ja oikea reuna paneelin isän pisteinä (Dynamic Island ja pyöristetyt kulmat).</summary>
        static float TurvaVasen(float isanLeveys) => UiRuutu.Leveys > 0 ? UiRuutu.Turva.xMin * isanLeveys / UiRuutu.Leveys : 0f;
        static float TurvaOikea(float isanLeveys) => UiRuutu.Leveys > 0 ? (UiRuutu.Leveys - UiRuutu.Turva.xMax) * isanLeveys / UiRuutu.Leveys : 0f;

        /// <summary>Valikko turva-alueen sisään; pitkät listat (maat, kaupungit) vierittyvät.</summary>
        void SovitaKorkeus()
        {
            if (!Auki || aloitus) return;
            var isa = valikko.parent;
            float korkeus = isa != null ? isa.resolvedStyle.height : float.NaN;
            float ylaR = valikko.resolvedStyle.top;
            if (float.IsNaN(korkeus) || korkeus <= 0 || float.IsNaN(ylaR)) { valikko.schedule.Execute(SovitaKorkeus).StartingIn(16); return; }
            float sk = UiRuutu.Korkeus > 0 ? korkeus / UiRuutu.Korkeus : 1f;
            valikko.style.maxHeight = Mathf.Max(120f, korkeus - ylaR - UiRuutu.Turva.yMin * sk - 8f);
        }

        void TarkistaOhiNapautus()
        {
            var osoitin = Pointer.current;
            if (osoitin == null || !osoitin.press.wasPressedThisFrame || valikko.panel == null) return;
            var ruutu = osoitin.position.ReadValue();
            var p = RuntimePanelUtils.ScreenToPanel(valikko.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            // ☰-OSUMAN DIAGNOSTIIKKA (juna 156, oikean yläkulman osumavika: simussa 18/20 ja 19/20): painallus ☰:n lähellä →
            // mihin UITK:n poiminta osuu ja onko valikko auki (lokista erottuu ohi-osuma, toinen elementti tai sulku-avaus).
            if (Vector2.Distance(p, nappi.worldBound.center) < 40f && Juuri.panel != null)
            {
                var osuma = Juuri.panel.Pick(p);
                Debug.Log($"MATKAKIRJA opas: ☰-painallus {p.x:0},{p.y:0} (ero {p.x - nappi.worldBound.center.x:0},{p.y - nappi.worldBound.center.y:0}), "
                          + $"auki {Auki}, poiminta [{(osuma == null ? "-" : string.Join(".", osuma.GetClasses()) + "#" + osuma.name)}], "
                          + $"laajennettu {nappi.ContainsPoint(nappi.WorldToLocal(p))}");
            }
            if (!Auki) return;
            // Ohi-napautus ei saa sulkea, kun painallus osuu ☰:n laajennettuun osuma-alaan (Kosketusnappi 44 pt): muuten sulku
            // tässä ja ☰:n klikkaus perään avasivat valikon uudelleen, eli napautus näytti menevän ohi.
            if (!valikko.worldBound.Contains(p) && !nappi.ContainsPoint(nappi.WorldToLocal(p)))
            {
                Debug.Log($"MATKAKIRJA opas: ohi-napautus sulki valikon {p.x:0},{p.y:0}");
                Sulje();
            }
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
                case "kuvanosto":
                {
                    // ui opasvalikko kuvanosto [url|suureksi|pois]: kuvanoston koe ilman kierrosta.
                    string a = o.Length > 1 ? o[1] : "";
                    if (a == "pois") kuvanosto.Piilota();
                    else if (a == "suureksi") kuvanosto.GetType().GetMethod("Suureksi", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)?.Invoke(kuvanosto, null);
                    else kuvanosto.Nayta(new Matkakirja.Linssit.Kierros.OpasYksityiskohdat.Kuva
                    {
                        Url = a.StartsWith("http") ? a : "https://media.matkakirja.app/julisteet/olavinlinna-kortti/20261008/esittely.jpg",
                        Kuvateksti = "Kuvanoston koe", Ankkuri = "koe",
                    });
                    return "opas: " + kuvanosto.Kuvaus();
                }
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
                case "historia":
                    // ui opasvalikko historia [otsikko…|pois]: historiaosion otsikko metrolinjaan (testi ohittaa LS1:n HistoriaOtsikon; pois = LS1).
                    if (o.Length > 1) { testiHistoria = o[1] != "pois"; testiHistoriaOtsikko = testiHistoria ? string.Join(" ", o, 1, o.Length - 1) : null; }
                    return "opas: " + metro.HistoriaKuvaus();
                case "vipu":
                    // ui opasvalikko vipu [asento −2…1]: vapaan lennon nopeusvipu (OpasTapit, juna 170).
                    return "opas: " + tapit.VipuKuvaus(o.Length > 1 && float.TryParse(o[1], System.Globalization.NumberStyles.Float,
                        System.Globalization.CultureInfo.InvariantCulture, out var va) ? va : (float?)null);
                case "moniosuma":
                    // ui opasvalikko moniosuma [tulos]: kaksi Input System -sormea tappeihin yhtä aikaa (MoniosumaTesti, juna 170).
                    if (o.Length > 1 && o[1] == "tulos") return "opas: moniosuma " + MoniosumaTesti.Viimeisin;
                    return "opas: " + MoniosumaTesti.Aja(UiKerros.Hae(), Juuri, tapit.Nakyy ? tapit.VasenLaatikko : default,
                        tapit.Nakyy ? tapit.OikeaLaatikko : default, () => (OpasTapit.Vasen, OpasTapit.Oikea, OpasTapit.Kosketaan));
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
                case "saavihje":
                    // `ui opasvalikko saavihje [nollaa]`: tila; nollaa = vihje tulee uudelleen (testi).
                    if (o.Length > 1 && o[1] == "nollaa") { PlayerPrefs.DeleteKey(SaaVihjeAvain); saaVihje = new SaaVihje(false); saaVihje.Alkoi(Time.unscaledTime); }
                    return $"opas: säätilan vihje {(saaVihjeNakyy ? "näkyy" : "piilossa")}, nähty {saaVihje.Nahty} @ {saaVihjeLappu.worldBound}";
                case "aika":
                    // `ui opasvalikko aika [live|paiva|yo|pois|selkea|…]`: lista auki tai valinnat suoraan (live = kytkin).
                    for (int j = 1; j < o.Length; j++)
                    {
                        if (o[j] == "live") Saatila.Live = !Saatila.Live;
                        else if (o[j] == "paiva" || o[j] == "yo") Saatila.AikaValinta = o[j] == "yo" ? PalloAika.Yo : PalloAika.Paiva;
                        else if (System.Enum.TryParse(o[j], true, out PalloSaa sv) && System.Enum.IsDefined(typeof(PalloSaa), sv)) Saatila.SaaValinta = sv;
                        aikaKuvake = null;
                    }
                    if (o.Length == 1) Avaa(Nakyma.Aika);
                    return $"opas: live {(Saatila.Live ? "päällä" : "pois")}, aika {Saatila.Aika} (KaupunkiKuva {AikaValinta} / {AikaNyt}), sää {Saatila.Saa}, tallenne {Saatila.Tallenne}";
                case "vapaalento":
                    // ui opasvalikko vapaalento [paluu|pois]: Vapaa lento -nappi tai Palaa kierrokselle -rivi näkyviin (testi).
                    if (o.Length > 1 && o[1] == "pois") { testiVapaa = testiPaluu = null; return "opas: vapaa lento -testi pois"; }
                    if (o.Length > 1 && o[1] == "paluu") { testiPaluu = true; testiVapaa = false; return "opas: palaa kierrokselle näkyy (testi)"; }
                    testiVapaa = true; testiPaluu = false;
                    return "opas: vapaa lento -nappi näkyy (testi)";
                case "jatka":
                    testiJatka = o.Length > 1 ? o[1] != "pois" : true;
                    return "opas: jatka kierrosta " + (testiJatka == true ? "näkyy (testi)" : "pois");
                case "pysty":
                {
                    // ui opasvalikko pysty: iPhone-pystyasettelun tarkistus (TF 169): ☀/☰ Islandin vierellä, ■ ⏸ ⏭ ja Kysy-rivi samalla korkeudella.
                    Rect B(VisualElement e) => e.worldBound;
                    float pw = Juuri.panel?.visualTree.layout.width ?? 0f;
                    Rect island = new Rect(pw * 0.5f - IslandLeveysPt * 0.5f, 11f, IslandLeveysPt, 37f);
                    Rect ra = B(aikaNappi), rv = B(nappi), ro = B(ohjainRivi), re = B(esitysRivi);
                    float esitysY = 0f; int n = 0;
                    foreach (var lapsi in esitysRivi.Children()) if (lapsi.resolvedStyle.display != DisplayStyle.None) { esitysY += lapsi.worldBound.center.y; n++; }
                    esitysY = n > 0 ? esitysY / n : float.NaN;
                    bool islandOk = !ra.Overlaps(island) && !rv.Overlaps(island) && ra.xMax <= island.xMin && rv.xMin >= island.xMax;
                    bool riviOk = n > 0 && Mathf.Abs(ro.center.y - esitysY) < 2f;
                    return $"opas: pysty {PuhelinPysty}, ☀ {ra.xMin:0},{ra.yMin:0} ☰ {rv.xMin:0},{rv.yMin:0} island {island.xMin:0}–{island.xMax:0} {(islandOk ? "ok" : "VIKA")}; "
                         + $"■ {(lopetaNappi.parent == ohjainRivi ? "ohjainrivillä" : "ylhäällä")}, ohjainrivi y {ro.center.y:0} vs Kysy-rivi y {esitysY:0} "
                         + $"{(riviOk ? "samalla korkeudella ok" : "eri korkeudella")} (Kysy-rivi {re.xMin:0}–, ohjainrivi {ro.xMin:0}–{ro.xMax:0})";
                }
                case "napit":
                {
                    var r = napit.worldBound;
                    if (o.Length > 1 && o[1] == "auki") { LopetaEsittely(); AsetaRiviAuki(true); }
                    else if (o.Length > 1 && o[1] == "kiinni") { LopetaEsittely(); AsetaRiviAuki(false); }
                    else if (o.Length > 1 && o[1] == "esittely") { PlayerPrefs.DeleteKey(EsittelyAvain); esittely = null; return "opas: nappirivin esittely nollattu"; }
                    var osat = new[] { vakanen }.Concat(liuku.Children()).Select(c => $"{c.tooltip} {c.worldBound.xMin:0}–{c.worldBound.xMax:0} y{c.worldBound.center.y:0.0} {c.worldBound.width:0}×{c.worldBound.height:0}").ToArray();
                    return $"opas: napit {(nappiNakyy ? "näkyy" : "piilossa")} rivi {(riviAuki ? "auki" : "kiinni")}, kuva {kuvaKortti.worldBound.width:0}×{kuvaKortti.worldBound.height:0} y{kuvaKortti.worldBound.center.y:0.0} @ {r.xMin:0},{r.yMin:0} {r.width:0}×{r.height:0}, keskikohta {r.center.x:0}/{(Juuri.panel?.visualTree.layout.width ?? 0) / 2:0}: {string.Join(" | ", osat)}";
                }
                case "kysy": Avaa(Nakyma.Kysy); return "opas: kysy-lista";
                case "krediitit": return "opas: " + KrediititTiivis.Kuvaus();
                case "krediittivertailu": return "opas: " + KrediititTiivis.Vertaa();
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
                case "otsikko":
                    KierrosTaulu.Testiotsikko = o.Length > 1 && o[1] != "pois" ? o[1] : null;
                    return "opas: " + KierrosTaulu.OtsikkoKuvaus;
                case "seuraava":
                    // `ui opasvalikko seuraava on|off|auto`: napin näkyvyys testissä; ilman argumenttia kuten napin painallus.
                    if (o.Length > 1) { testiSeuraava = o[1] == "on" ? true : o[1] == "off" ? false : (bool?)null; return "opas: seuraava-testi " + o[1]; }
                    return "opas: seuraava → " + OpasSovitin.Seuraava();
                case "ohjain":
                {
                    Rect r = ohjainRivi.worldBound, t = taukoNappi.worldBound, sn = seuraavaNappi.worldBound;
                    return $"opas: ohjainrivi {(ohjainRivi.resolvedStyle.display == DisplayStyle.Flex ? "näkyy" : "piilossa")} @ {r.xMin:0},{r.yMin:0} {r.width:0}×{r.height:0}, "
                         + $"tauko {t.center.x:0},{t.center.y:0}, seuraava {(seuraavaNappi.resolvedStyle.visibility == Visibility.Visible ? "näkyy" : "piilossa")} {sn.center.x:0},{sn.center.y:0}, "
                         + $"valikkonappi {nappi.worldBound.center.x:0},{nappi.worldBound.center.y:0} {nappi.worldBound.width:0}×{nappi.worldBound.height:0}, "
                         + $"leveä {LeveaRuutu}, ruutu {Juuri.layout.width:0}×{Juuri.layout.height:0}; " + tapit.Kuvaus();
                }
                case "latauskuva":
                    // `ui opasvalikko latauskuva [pois]`: testikuva (Nyhavn) latauskuvana ilman saapumista.
                    if (o.Length > 1 && o[1] == "pois") { LatausKuvaVaihtui(null); return "opas: latauskuva pois"; }
                    LatausKuvaVaihtui(new OpasKuva { Url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Nyhavn%2C_Copenhagen%2C_20220618_1728_7354.jpg/960px-Nyhavn%2C_Copenhagen%2C_20220618_1728_7354.jpg", Tekija = "Jakub Hałun", Lisenssi = "CC BY-SA 4.0", Selite = "Nyhavnin kanava" });
                    return "opas: latauskuva " + (latausSuurennos?.Auki ?? false ? "auki" : "ei avattu (opas kiinni tai kuvat pois)");
                case "maat": maanosa = o.Length > 1 ? o[1] : maanosa; Avaa(Nakyma.Maat); return "opas: maat " + maanosa;
                case "kaupungit":
                    var p = o.Length > 1 ? o[1].Split('|') : new string[0];
                    if (p.Length == 2) { maanosa = p[0]; maa = p[1]; }
                    Avaa(Nakyma.Kaupungit);
                    return $"opas: kaupungit {maanosa} / {maa}";
                case "metro":
                    // `ui opasvalikko metro <i>|auto`: testilinja Pariisin kohteilla ilman kierrosta.
                    metro.Testi = o.Length > 1 && o[1] != "auto";
                    if (metro.Testi && int.TryParse(o[1], out int mi)) metro.TestiIndeksi = mi;
                    { var kr = OpasSovitin.KoriVasenKoysiNorm; return "opas: " + metro.Kuvaus() + $", köysi {kr.xMin:0.000}–{kr.xMax:0.000} × {kr.yMin:0.00}–{kr.yMax:0.00}, köysiraja {metroKoysiVasen:0}"; }
                case "esitys":
                    if (o.Length > 1) testiEsitys = o[1] == "on" ? true : o[1] == "off" ? false : (bool?)null;
                    { var r = esitysRivi.worldBound; return $"opas: esitysrivi {(esitysRivi.resolvedStyle.display == DisplayStyle.Flex ? "näkyy" : "piilossa")} @ {r.xMin:0},{r.yMin:0} {r.width:0}×{r.height:0}, väkäsrivi {(nappiNakyy ? "näkyy" : "piilossa")}"; }
                case "kaupunkitila":
                    if (o.Length > 1) testiKaupunkitila = o[1] == "on" ? true : o[1] == "off" ? false : (bool?)null;
                    return "opas: kaupunkitila " + Kaupunkitila;
                case "torjunta": Torjunta(OpasSovitin.EiSallittuTeksti); return "opas: torjunta";
                case "sallitut":
                {
                    var kaikki = Kaupungit?.Invoke(); var vain = VainSallitut(kaikki);
                    return $"opas: sallitut {OpasSovitin.SallitutKaupungit?.Count ?? 0} → valikossa {vain?.Count ?? 0}/{kaikki?.Count ?? 0} kaupunkia, "
                         + $"suosikit {SallitutTakyt().Count()}/{OpasSovitin.Takyt?.Count ?? 0}"
                         + (vain != null && vain.Count <= 40 ? ": " + string.Join(", ", vain.Select(k => k.Nimi)) : "");
                }
                default: Avaa(Nakyma.Paa); return "opas: valikko (" + (VainSallitut(Kaupungit?.Invoke())?.Count ?? 0) + " kaupunkia)";
            }
        }
    }
}
