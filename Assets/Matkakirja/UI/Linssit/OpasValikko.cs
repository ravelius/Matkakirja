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
            public readonly string Nimi, Maa, Maanosa;
            public readonly double Lat, Lon;
            public readonly long Vakiluku;
            public Kaupunki(string nimi, string maa, string maanosa, double lat, double lon, long vakiluku)
            { Nimi = nimi; Maa = maa; Maanosa = maanosa; Lat = lat; Lon = lon; Vakiluku = vakiluku; }
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
        /// paikat.json: {"paikat":[[nimi, lat, lon, ADM0_A3, POP_MAX, CONTINENT?], …]}. Maan nimi pelin maa-aineistosta (ISO3), muuten
        /// koodi; maanosa 6. sarakkeesta suomeksi, ilman sitä "Kaikki maat" (yksi ryhmä).
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
                if (MiniJson.Kentta(j, "paikat") is List<object> rivit)
                    foreach (var r in rivit)
                    {
                        if (!(r is List<object> c) || c.Count < 5) continue;
                        string iso = c[3] as string;
                        string maa = LinssiOhjain.MaatAineisto?.Hae(iso)?.Nimi ?? iso;
                        string mo = c.Count > 5 && c[5] is string m ? (Maanosat.TryGetValue(m, out var fi) ? fi : m) : "Kaikki maat";
                        tulos.Add(new Kaupunki(c[0] as string, maa, mo, Convert.ToDouble(c[1]), Convert.ToDouble(c[2]), Convert.ToInt64(c[4])));
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

        enum Nakyma { Paa, Maanosat, Maat, Kaupungit }

        /// <summary>Oppaan linssi auki (✕ pois, LinssiUi.PaivitaSulku).</summary>
        public static bool Nakyy => Viimeisin != null && Viimeisin.nakyy;

        public readonly VisualElement Juuri;
        readonly VisualElement ryhma, valikko, sirurivi;
        readonly Button puhuSiru, kuvaNappi;
        // OPPAAN KUVAT (omistaja 5.10.2026 klo 19.3x): pieni kuvakortti NOSTOKORTTI-pohjan kuvakehyksellä pysähdyksen ajan,
        // napautus → nostojen kuvasuurennos tekijä- ja lisenssirivein; havainnekuva aina merkitty HAVAINNEKUVA. Kytkin oikeassa
        // yläkulmassa OHJAUSNAPPI-pohjalla (julistekuvake, pois-tilassa vino viiva), oletus päällä, valinta muistetaan.
        const string KuvatAvain = "matkakirja-opas-kuvat";
        const string KuvaPoisIkoni = Ikonit.PilleriJulisteet + "<path d=\"M3.2 3.6 20.8 20.4\"/>";
        const float KuvaLeveys = 132f, KuvaRako = 8f;
        readonly VisualElement kuvaKortti, kuvaKehys, kuvaEl, kuvaMerkki;
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
        readonly OpasTapit tapit;
        readonly OpasNimilappu nimilappu;
        int siruPoletti = -1;
        readonly Button nappi;
        Nakyma nakyma;
        string maanosa, maa;
        ScrollView rivit;
        public bool Auki { get; private set; }

        public OpasValikko(UiKerros kerros, int kerrosNro)
        {
            Juuri = Rakenne.El("mk-linnavalikko", kerros.Turva(kerrosNro), PickingMode.Ignore);
            Juuri.style.position = Position.Absolute;
            Juuri.style.left = 0; Juuri.style.right = 0; Juuri.style.top = 0; Juuri.style.bottom = 0;
            Juuri.style.display = DisplayStyle.None;
            ryhma = Ohjausnappi.Ryhma(Juuri);
            kuvaNappi = Ohjausnappi.Nappi(KuvatPaalla ? Ikonit.PilleriJulisteet : KuvaPoisIkoni, KuvatPaalla ? "Kuvat päällä" : "Kuvat pois",
                VaihdaKuvat, ryhma);
            nappi = Ohjausnappi.Nappi(Ikonit.Valikko, "Valikko", () => { if (Auki) Sulje(); else Avaa(Nakyma.Paa); }, ryhma);

            // Elävä opas nykyajassa (omistaja 5.10.2026 klo 20.5x): LASI-lista harmaan lasin tokeneilla ja modernilla kirjasimella.
            valikko = Rakenne.El("mk-linssivalikko mk-linssivalikko--pohja tk-teema-harmaa", kerros.Juuri(kerrosNro));
            valikko.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(valikko, Kirjasin.Moderni);
            valikko.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            valikko.RegisterCallback<PointerDownEvent>(e => Uudelleenohjaa(e, true, e), TrickleDown.TrickleDown);
            valikko.RegisterCallback<PointerUpEvent>(e => Uudelleenohjaa(e, false, e), TrickleDown.TrickleDown);
            // Juna 144 FAIL (Laitetestaaja 5.10., Amsterdam-rivi ei lauennut joka kerta): UITK:n ScrollView aloitti oman
            // kosketusvierityksensä jo sormen pienestä värinästä ja kaappasi osoittimen, jolloin rivin napautus peruuntui.
            // Oma liitos (kuten nostokortti ja lehti) pysäyttää ScrollViewin kosketusliikkeet; vieritys alkaa vasta 8 pt:n
            // pystyvedosta, ja sitä pienempi liike on napautus.
            Kosketusvieritys.Liita(valikko, () => rivit);
            kerros.JokaRuutu += TarkistaOhiNapautus;

            // Irrallinen sirurivi alareunan keskelle (Googlen ja Cesiumin merkinnät jäävät sen alle).
            sirurivi = Rakenne.El("tk-teema-harmaa mk-chat__sirut mk-chat__sirut--irrallaan", Juuri, PickingMode.Ignore);
            sirurivi.style.display = DisplayStyle.None;
            sirurivi.style.opacity = 0f;
            puhuSiru = Rakenne.Nappi(null, "mk-chat__siru mk-chat__siru--ikoni", () => { NaytaTeksti(); UiNakymat.Hae()?.Chat?.AloitaSanelu(); }, null, PuluChat.MikkiIkoni);
            puhuSiru.tooltip = "Puhu tai kirjoita";
            kerros.JokaRuutu += PaivitaSirut;
            // Googlen ja Cesiumin krediitit (logot muuttamattomina, Googlen ehdot): sirurivi niiden yläpuolelle, tarkistus 2 × s.
            sirurivi.schedule.Execute(SovitaKrediitteihin).Every(500);

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
            kuvaMerkki = Rakenne.El("mk-nosto__kuvateksti mk-nosto__kuvateksti--kotelo", kuvaKortti, PickingMode.Ignore);
            var hm = Rakenne.Teksti("Havainnekuva".ToUpperInvariant(), "mk-nosto__havainne", kuvaMerkki);
            hm.tooltip = "Havainnekuva";
            Kirjasimet.Aseta(hm, Kirjasin.Moderni);
            kuvaKortti.RegisterCallback<ClickEvent>(_ => SuurennaKuva());
            kuvaKortti.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            kerros.JokaRuutu += PaivitaKuva;

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
        void PaivitaSirut()
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
            tapit.Paivita(pysahdys && !Auki && !(chat?.Auki ?? false), krediittiAla);
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
            float h = Juuri.resolvedStyle.height;
            // Kortti oikean tapin yläpuolelle, kun tapit näkyvät.
            float ala = tapit.Nakyy ? krediittiAla + OpasTapit.Halkaisija + KuvaRako : krediittiAla;
            if (siruNakyy && !float.IsNaN(h) && sirurivi.layout.height > 0) ala = Mathf.Max(ala, h - sirurivi.layout.yMin + KuvaRako);
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
            if (suurennos == null) suurennos = new Kuvasuurennos(UiKerros.Hae().Juuri(UiKerros.Valikot)) { Tayteen = true, Kokoruutu = true };
            var l = OpasSovitin.Viimeisin?.Silmukka?.Nykyinen;
            string teksti = !string.IsNullOrWhiteSpace(k.Selite) ? k.Selite : l?.Nimi;
            string selite = k.Havainnekuva ? "HAVAINNEKUVA" + (teksti != null ? " · " + teksti : "") : teksti;
            suurennos.Avaa(new List<LehtiKuva>
            {
                new LehtiKuva
                {
                    Lahde = k.Url, Lyhyt = selite, Selite = selite,
                    LahdeRivi = string.Join(" · ", new[] { k.Tekija, k.Lisenssi }.Where(x => !string.IsNullOrEmpty(x))),
                },
            });
            Debug.Log("MATKAKIRJA opas: kuva suurennettu " + k.Url);
        }

        /// <summary>Vaihtoehdon napautus: kysymys oppaalle saman chatin kautta (Sieppaa → OpasSovitin.Toive), chat pysyy kiinni.</summary>
        void Valitse(string teksti)
        {
            Debug.Log("MATKAKIRJA opas: valinta \"" + teksti + "\"");
            UiNakymat.Hae()?.Chat?.Kysy(teksti, true);
        }

        void Avaa(Nakyma n)
        {
            nakyma = n;
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
            Ponnahdus.Sulje(valikko);
            nappi.RemoveFromClassList("mk-valittu");
        }

        void Rakenna()
        {
            // Vanhat rivit eivät irtoa heti (juna 144 FAIL, koe 4): UITK voi lähettää seuraavan kosketuksen vielä vanhalle
            // riville (kosketusvälimuisti). Piilossa valikon sisällä ne pysyvät valikon lapsina, joten Uudelleenohjaa näkee
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
            switch (nakyma)
            {
                case Nakyma.Paa:
                    // Päätoimittaja 5.10. klo 20.4x: pään kolme riviä samalla TOIMINTO-rivipohjalla (kultareunus), Vaihda kohde ›-merkillä.
                    Alanakyma("Vaihda kohde", () => Avaa(Nakyma.Maanosat), toiminto: true);
                    Komento("Näytä teksti", NaytaTeksti);
                    Viiva();
                    Komento("Poistu linssistä", () => UiNakymat.Hae()?.Linssit?.SuljeLinssi());
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
                    Takaisin(maanosa, Nakyma.Maanosat);
                    Vieritys();
                    foreach (var m in (kaikki ?? Array.Empty<Kaupunki>()).Where(k => k.Maanosa == maanosa).Select(k => k.Maa)
                                 .Where(m => !string.IsNullOrEmpty(m)).Distinct().OrderBy(m => m))
                    {
                        string mm = m;
                        Alanakyma(mm, () => { maa = mm; Avaa(Nakyma.Kaupungit); }, rivit);
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
        /// <summary>Nykyisen näkymän rivit ja niiden teot (Uudelleenohjaa).</summary>
        readonly List<(VisualElement Rivi, Action Teko)> nykyiset = new List<(VisualElement, Action)>();
        int painettuVanhalle = -1;

        /// <summary>
        /// Kosketus, joka osuu piilotetulle vanhalle riville (UITK:n vanhentunut kohde), ohjataan kosketuskohdan nykyiselle
        /// riville: painallus muistetaan ja irrotus samalla rivillä laukaisee sen teon (kuten klikki).
        /// </summary>
        void Uudelleenohjaa(IPointerEvent e, bool alas, EventBase eb)
        {
            if (vanhat == null || !(eb.target is VisualElement t) || !vanhat.Contains(t)) return;
            eb.StopPropagation();
            int osuma = nykyiset.FindIndex(r => r.Rivi.panel != null && r.Rivi.worldBound.Contains(e.position));
            if (alas) { painettuVanhalle = osuma; Debug.Log($"MATKAKIRJA opas: kosketus vanhalle riville → nykyinen rivi {osuma}"); return; }
            if (osuma >= 0 && osuma == painettuVanhalle) Rivilta(nykyiset[osuma].Teko);
            painettuVanhalle = -1;
        }

        Button Komento(string teksti, Action teko, VisualElement isa = null)
        {
            Action t = () => { Sulje(); teko(); };
            var b = Rakenne.Nappi(teksti, "mk-linssivalikko__kohta mk-linssivalikko__komento", () => Rivilta(t), isa ?? valikko);
            nykyiset.Add((b, t));
            Kirjasimet.Aseta(b, Kirjasin.Moderni);
            b.tooltip = teksti;
            return b;
        }

        void Alanakyma(string teksti, Action avaa, VisualElement isa = null, bool toiminto = false)
        {
            var b = Rakenne.Nappi(null, "mk-linssivalikko__kohta " + (toiminto ? "mk-linssivalikko__komento" : "mk-linssivalikko__kytkin"), () => Rivilta(avaa), isa ?? valikko);
            nykyiset.Add((b, avaa));
            if (toiminto) { b.style.flexDirection = FlexDirection.Row; b.style.alignItems = Align.Center; b.style.justifyContent = Justify.SpaceBetween; }
            Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-linssivalikko__nimi", b), Kirjasin.Moderni);
            Kirjasimet.Aseta(Rakenne.Teksti("›", "mk-linssivalikko__tila", b), Kirjasin.ModerniLihava);
            b.tooltip = teksti;
        }

        void Takaisin(string otsikko, Nakyma minne)
        {
            Action t = () => Avaa(minne);
            var b = Rakenne.Nappi(null, "mk-linssivalikko__kohta mk-linssivalikko__kytkin", () => Rivilta(t), valikko);
            nykyiset.Add((b, t));
            Kirjasimet.Aseta(Rakenne.Teksti("‹ " + otsikko, "mk-linssivalikko__nimi", b), Kirjasin.ModerniLihava);
            b.tooltip = "Takaisin";
            Viiva();
        }

        void Tyhja(string teksti) => Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-linssivalikko__lahde", valikko), Kirjasin.Moderni);

        void Viiva() => Rakenne.El("mk-linssivalikko__viiva", valikko, PickingMode.Ignore);

        void Vieritys()
        {
            rivit = new ScrollView(ScrollViewMode.Vertical)
            { verticalScrollerVisibility = ScrollerVisibility.Hidden, horizontalScrollerVisibility = ScrollerVisibility.Hidden };
            rivit.style.flexShrink = 1;
            valikko.Add(rivit);
        }

        /// <summary>Lista napin alle, oikea reuna napin oikeaan reunaan (LinnaValikko.Asettele).</summary>
        void Asettele()
        {
            var isa = valikko.parent;
            if (isa == null) return;
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
            if (!Auki) return;
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
                case "peitto": return Peitto();
                case "tapit": return "opas: " + tapit.Kuvaus();
                case "nimilappu": return "opas: " + nimilappu.Kuvaus();
                case "kuva":
                    var kb = kuvaKortti.worldBound;
                    return $"opas: kuva {(kuvaNakyy ? "näkyy" : "piilossa")} {naytettyKuva?.Url ?? "-"}, kortti {kb.xMin:0},{kb.yMin:0} {kb.width:0}×{kb.height:0}, kytkin {(KuvatPaalla ? "päällä" : "pois")}";
                case "sirut":
                    var c = UiNakymat.Hae()?.Chat;
                    var sb = sirurivi.worldBound;
                    return $"opas: sirut {(siruNakyy ? "näkyy" : "piilossa")} [{string.Join(" | ", c?.OppaanJatkot ?? Array.Empty<string>())}], "
                         + $"kertoja {(OpasSovitin.KertojaPuhuu ? "puhuu" : "hiljaa")}, rivi {sb.xMin:0},{sb.yMin:0} {sb.width:0}×{sb.height:0}";
                case "maanosat": Avaa(Nakyma.Maanosat); return "opas: maanosat";
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
