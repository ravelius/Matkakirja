// PÖLLÖN SÄHKETEHTÄVÄ (Natiivi-UI, 23.9.2026): Pelikoodarin ISahketehtavaNakyma UI Toolkitilla.
//
// Web js/fokusvirta.js piirraSahketehtava, piirraSahke, kirjoitaSahke, piirraSahkePullat ja
// sahkeOsui; tyylit css/fokusvirta.css "PÖLLÖN SÄHKETEHTÄVÄ" → Resources/MatkakirjaUI/Sahketehtava.uss.
// Pelilogiikka ja istunnon tila ovat Pelikoodarin (Scripts/Peli/Sahketehtava.cs, PeliOhjain.Sahke.cs):
// tämä vain piirtää SahkeKortin ja kutsuu SahketehtavaToimintoja. Ohjain kutsuu Nayta jokaisen teon
// jälkeen (ohilyönti, pullat, kuittaus), ja kortti rakennetaan aina datasta uudelleen.
//
//   SÄHKE                                                  ✕   ← ylärivi ja hahmo ("Pöllöltä, …")
//   ┌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ┐   ← rei'itetty reuna
//   │ (SOFIA)   S Ä H K Ö S A N O M A          N:o 4711 │   ← leima (kaupunki), nimiö, lomakenumero
//   │ ══════════════════════════════════════════════════ │
//   │ [LIVIALLE STOP]                                   │   ← liimatut liuskat, kirjoittuvat rivi
//   │ [▌MISSÄ BULGARIASSA LÖYTYI …]                     │     kerrallaan (SahkeAikataulu); STOP haalea,
//   └ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ◌ ┘     kysymysrivi korostettu
//   KOHDE  [— valitse Bulgarian luettelosta — ⌄]             ← hakemistovalinta (oma valitsin)
//   VUOSI  [____]                                            ← numerokenttä
//   TAI KIRJOITA VASTAUS OMIN SANOIN [……]  [Lähetä omin sanoin]
//   EI TÄSMÄÄ STOP TARKISTA KOHDE STOP                       ← edellinen ohilyönti / odotus / virhe
//   Livian vinkki (kahden ohilyönnin jälkeen)
//   Sähkeen palkkio nyt 150 puntaa. …                        ← maksurivi
//   [Osta kozunak Livialle (50 £) — vinkki]                  ← pullat: kaksi napautusta, kassaportti
//   [Osta puolikas kozunak (25 £) — suora linkki]
//   [Lähetä sähke pöllölle]  [Myöhemmin]
//
// Lähetetty sähke (Livia lennossa): sama paperi paluutahdilla ja "Selvä". Kuittaus (oikea vastaus):
// vastaussähke, Livian kuittaus ja fakta kappaleina, "Anna Livian mennä".
//
// Livian repliikit eivät ole kortilla vaan pulun kuplissa (PeliOhjain.LivianKuplat → LivianKuplat):
// johdanto ja odotus 450 ms kortin jälkeen, vinkki ja linkin saate heti, paluu kuplasarjana; oikein
// vain äänenä (teksti on kuittauskortilla). Sofian sähkevaiheet on äänitetty (web LIVIAN_KAUPUNKILAHTEET,
// tiivisteportti livianTiiviste): muut kaupungit ovat äänettömiä.
//
// Sähkehakemisto (web sisaltohakemisto): SahkeHakemistot kokoaa maan otsikot neljästä lähteestä
// (maalehti, maan kaupunkien lehdet, fokusvirtojen otsikot, karttakohteet) ja palvelee
// PeliOhjain.SahkeHakemisto-koukkua. Ensimmäisellä avauksella lista voi olla vielä haussa: valitsin
// päivittyy, kun se valmistuu.
//
// Säikeet: ohjaimen kutsut voivat tulla muualta kuin pääsäikeestä → UiKerros.PaaSaikeessa.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class SahketehtavaNakyma : ISahketehtavaNakyma
    {
        /// <summary>Web SAHKE_LOMAKE_OSOITE: 1870-luvun lennätinlomake (3:4); ladataan kerran, CSS-lomake varana.</summary>
        public const string LomakekuvaOsoite = "https://media.matkakirja.app/kohtaamiset/kuvitus/sahke-lomake-1873-v1.jpg";

        const int PullaVarmistusMs = 6000;   // web PULLA_VARMISTUS_MS
        const int SaateViiveMs = 450;        // web SAHKE_SAATE_VIIVE_MS
        const string PullaKoyhaLivia = "Ei se mitään, kyllä minä ymmärrän. — Livia sanoo sen vähän liian nopeasti.";
        const string PullaVarmistusOhje = "Toinen napautus maksaa. Muuten tarjous raukeaa.";
        const string OdotusVara = "Vien tämän pöllölle, pieni hetki..";
        const string VapaaTyhja = "Kirjoita ensin vastaus omin sanoin.";
        const string ValitsinOletus = "— valitse luettelosta —";

        /// <summary>Web PULLA_NIMET (js/fokustehtavat.js): maan pullavastine, muuten "makea pulla".</summary>
        static readonly Dictionary<string, string> PullaNimet = new Dictionary<string, string>
        {
            ["GRC"] = "tsoureki", ["BGR"] = "kozunak", ["BIH"] = "hurmašica", ["ROU"] = "cozonac", ["TUR"] = "simit",
            ["ITA"] = "maritozzo", ["DEU"] = "Franzbrötchen", ["HUN"] = "kakaós csiga", ["HRV"] = "kroštule",
            ["AUT"] = "Buchtel", ["FRA"] = "brioche", ["GBR"] = "scone", ["SWE"] = "kanelbulle", ["DNK"] = "wienerbrød",
        };

        static readonly Regex StopSana = new Regex(@"\bSTOP\b");

        readonly UiKerros kerros;
        readonly int paaSaie;
        readonly VisualElement juuri, himmennys, napit;
        readonly Kortti kortti;
        readonly Label ylarivi, otsikko;
        readonly ScrollView vieritys;

        SahkeKortti nakyva;
        string korttiAvain, viimeSahke;
        SahketehtavaToiminnot toiminnot = new SahketehtavaToiminnot();
        Sahketehtava tehtava;
        string kaupunki, iso;
        int sukupolvi;

        // Lomakkeen elementit (rakennetaan joka Nayta-kutsussa uudelleen).
        VisualElement paperi;
        Label tulos;
        TextField vapaaKentta;
        readonly Dictionary<string, Func<string>> arvot = new Dictionary<string, Func<string>>();
        readonly List<Action> hakemistoPaivittyi = new List<Action>();
        List<string> hakemisto = new List<string>();
        bool hakemistoHaussa;
        string vapaaAvain, vapaaTeksti;
        bool odottaa;

        // Hakemiston valitsin (web <select>) kortin päällä.
        VisualElement valitsin;

        Kirjoitus kirjoitus;

        // Livian kuplat: viimeisin kaupunki (kortin tunnistus) ja käynnissä oleva sarja.
        string kuplaKaupunki, avausKaupunki;
        int kuplaRuutu = -1, sarjaVuoro;

        static Texture2D lomakekuva;
        static bool lomakekuvaHaettu;

        public bool Auki { get; private set; }

        /// <summary>Testikomento: ei tehosteita eikä Livian ääntä (kuplat näkyvät).</summary>
        public bool Hiljaa { get; set; }

        /// <summary>Viimeksi näytetty kortti (testikomennot), tai null.</summary>
        public SahkeKortti Nakyva => Auki ? nakyva : null;

        public SahketehtavaNakyma(UiKerros kerros)
        {
            this.kerros = kerros;
            paaSaie = Thread.CurrentThread.ManagedThreadId;
            juuri = kerros.Juuri(UiKerros.Pelidialogit);
            kerros.Turva(UiKerros.Pelidialogit); // turva-alueen reunat lasketaan vain kerroksille, joilla on turva

            himmennys = Rakenne.El("mk-himmennys mk-st-tausta", juuri);
            himmennys.style.display = DisplayStyle.None;
            kortti = new Kortti("mk-st");
            himmennys.Add(kortti);
            var sisus = kortti.Sisus;

            var paa = Rakenne.El("mk-st__paa", sisus, PickingMode.Ignore);
            var paateksti = Rakenne.El("mk-st__paateksti", paa, PickingMode.Ignore);
            ylarivi = Rakenne.Teksti("SÄHKE", "mk-st__ylarivi", paateksti);
            Kirjasimet.Aseta(ylarivi, Kirjasin.Kone);
            otsikko = Rakenne.Teksti("", "mk-st__otsikko", paateksti);
            Kirjasimet.Aseta(otsikko, Kirjasin.KoneLihava);
            // ✕ puuttuu kirjasimista: kertomerkki (kuten sähkeliuskassa).
            var sulje = Rakenne.Nappi("×", "mk-st__sulje", SuljeKasin, paa);
            sulje.tooltip = "Sulje sähke";

            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-st__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            sisus.Add(vieritys);

            napit = Rakenne.El("mk-st__napit", sisus, PickingMode.Ignore);

            // Web: napautus sähkeeseen tai mihin tahansa kortin nappiin täyttää kirjoituksen heti.
            sisus.RegisterCallback<PointerDownEvent>(e =>
            {
                if (kirjoitus == null || !(e.target is VisualElement v)) return;
                if ((paperi != null && paperi.Contains(v)) || v is Button || v.GetFirstAncestorOfType<Button>() != null) kirjoitus.Ohita();
            }, TrickleDown.TrickleDown);
            kerros.TurvaMuuttui += Asettele;
        }

        bool PaaSaie => Thread.CurrentThread.ManagedThreadId == paaSaie;

        void Paa(Action a)
        {
            if (PaaSaie) a();
            else UiKerros.PaaSaikeessa(a);
        }

        void Asettele()
        {
            var r = kerros.Reunat(UiKerros.Pelidialogit);
            himmennys.style.paddingTop = r.y + 10;
            himmennys.style.paddingBottom = r.w + 10;
            himmennys.style.paddingLeft = r.x + 8;
            himmennys.style.paddingRight = r.z + 8;
        }

        void Tehoste(string avain)
        {
            if (!Hiljaa) Aanet.PulunTehoste(avain);
        }

        // =====================================================================
        // ISahketehtavaNakyma
        // =====================================================================

        public void Nayta(SahkeKortti k, SahketehtavaToiminnot t)
        {
            if (k == null) { Sulje(); return; }
            Auki = true; // heti: ohjain voi kysyä samassa ruudussa
            // Testikomennon kortti on hiljainen; pelin oma kortti soi taas normaalisti.
            Hiljaa = testiToiminnot != null && ReferenceEquals(t, testiToiminnot);
            // Avauksen Livian kuplat tulivat samassa ruudussa: niiden kaupunki on kortin kaupunki.
            avausKaupunki = PaaSaie && kuplaRuutu == Time.frameCount ? kuplaKaupunki : null;
            Paa(() =>
            {
                if (!Auki) return;
                // Tehtävän tekstit (napit, leima, hakemiston maa) fokusvirroista. Kokoelma on yleensä jo luettu
                // saapumisessa; muuten odotetaan sitä enintään 0,7 s ja piirretään sitten oletusteksteillä.
                if (Fokusvirrat.Valmis) { Piirra(k, t, true); return; }
                int oma = ++sukupolvi;
                bool piirretty = false;
                void Kerran()
                {
                    if (piirretty || !Auki || oma != sukupolvi) return;
                    piirretty = true;
                    Piirra(k, t, true);
                }
                Fokusvirrat.Lataa(Kerran);
                juuri.schedule.Execute(Kerran).StartingIn(700);
            });
        }

        public void Sulje()
        {
            Auki = false;
            Paa(() =>
            {
                if (Auki) return; // uusi kortti ehti jo tilalle
                sukupolvi++;
                kirjoitus?.Pysayta();
                kirjoitus = null;
                SuljeValitsin();
                vapaaKentta?.Blur();
                odottaa = false;
                Rakenne.Nayta(himmennys, false, 260);
            });
        }

        /// <summary>✕: web suljeKasin (paperin kahina ja kortti kiinni).</summary>
        void SuljeKasin()
        {
            Tehoste("pulu.sahke");
            if (toiminnot?.Sulje != null) Teko(toiminnot.Sulje);
            else Sulje();
        }

        static void Teko(Action a)
        {
            try { a?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
        }

        // =====================================================================
        // PIIRTO
        // =====================================================================

        void Piirra(SahkeKortti k, SahketehtavaToiminnot t, bool animoi)
        {
            int oma = ++sukupolvi;
            bool piilossa = himmennys.style.display == DisplayStyle.None || !himmennys.ClassListContains("mk-auki");
            var vanhaVieritys = vieritys.scrollOffset;
            nakyva = k;
            toiminnot = t ?? new SahketehtavaToiminnot();
            odottaa = false;
            kirjoitus?.Pysayta();
            kirjoitus = null;
            SuljeValitsin();
            arvot.Clear();
            hakemistoPaivittyi.Clear();
            tulos = null;
            vapaaKentta = null;
            paperi = null;

            TunnistaTehtava(k, piilossa);
            // Sama kortti uudelleen (ohilyönti, pulla): vieritys säilyy; uusi vaihe tai avaus alkaa ylhäältä.
            var avain = kaupunki + "|" + (k.Kuittaus ? "kuittaus" : k.Lomake ? "lomake" : "lahetetty");
            bool uusi = piilossa || avain != korttiAvain;
            if (uusi) viimeSahke = null;
            korttiAvain = avain;
            ylarivi.text = SahkeTeksti.JsIsot(string.IsNullOrEmpty(k.Otsikko) ? "Sähke" : k.Otsikko);
            otsikko.text = k.Hahmo ?? tehtava?.Hahmo ?? "Pöllöltä";

            vieritys.Clear();
            napit.Clear();
            var sisalto = vieritys.contentContainer;
            var leima = kaupunki != null ? UiSisalto.Kaupunki(kaupunki)?.Nimi ?? Isolla(kaupunki) : null;
            RakennaPaperi(sisalto, k.Sahke ?? "", leima);
            var himmea = Rakenne.El("mk-st__himmea", sisalto, PickingMode.Ignore);

            if (k.Kuittaus) RakennaKuittaus(k, himmea);
            else if (!k.Lomake)
                Ensisijainen("Selvä", () => { Tehoste("pulu.sahke"); Teko(toiminnot.Sulje); }, napit);
            else RakennaLomake(k, himmea, oma);

            // Kirjoitus kerran istunnossa (Animoi); liikettä vähentävä asetus kumoaa (web liikeRajoitettu).
            if (animoi && k.Animoi && k.Aikataulu != null && k.Aikataulu.Rivit.Count > 0 && !LinssiUi.VahennettyLiike())
                kirjoitus = new Kirjoitus(this, k.Aikataulu);

            Asettele();
            if (uusi) vieritys.scrollOffset = Vector2.zero;
            else vieritys.schedule.Execute(() => { if (oma == sukupolvi) vieritys.scrollOffset = vanhaVieritys; });
            if (piilossa) Rakenne.Nayta(himmennys, true, 320);
        }

        /// <summary>
        /// Kortin kaupunki ja tehtävä: SahkeKortti.Kaupunki ja HakemistoMaa (Pelikoodari 5f31a79). Varana
        /// (vanha kortti ilman kaupunkia) tunnistus fokusvirroista hahmon ja sähkeen perusteella; vihjeenä
        /// avauksen Livian kuplat, saman kortin edellinen kaupunki tai pelaajan kaupunki.
        /// </summary>
        void TunnistaTehtava(SahkeKortti k, bool uusiAvaus)
        {
            if (!string.IsNullOrEmpty(k.Kaupunki) && Fokusvirrat.Hae(k.Kaupunki)?.Sahketehtava is Matkakirja.Natiivi.Sahketehtava suora)
            {
                tehtava = suora;
                kaupunki = k.Kaupunki;
                iso = k.HakemistoMaa ?? suora.HakemistoMaa ?? UiSisalto.Kaupunki(kaupunki)?.Maa;
                return;
            }
            var pelaaja = PeliOhjain.Instanssi?.PelaajanKaupunki;
            var vihje = avausKaupunki ?? (uusiAvaus ? pelaaja ?? kaupunki : kaupunki ?? pelaaja);
            var ehdokkaat = Fokusvirrat.Kaikki.Where(v => v.Sahketehtava != null).Select(v => v.Sahketehtava)
                .Where(s => s.Hahmo == k.Hahmo && (k.Sahke == s.Sahke || k.Sahke == s.Lahetetty || k.Sahke == s.Vastaussahke)).ToList();
            var valittu = ehdokkaat.Count == 1 ? ehdokkaat[0]
                : ehdokkaat.FirstOrDefault(s => s.Kaupunki == vihje) ?? ehdokkaat.FirstOrDefault()
                ?? (vihje != null ? Fokusvirrat.Hae(vihje)?.Sahketehtava : null);
            tehtava = valittu;
            kaupunki = valittu?.Kaupunki ?? vihje;
            iso = valittu?.HakemistoMaa ?? UiSisalto.Kaupunki(kaupunki)?.Maa;
        }

        static string Isolla(string s) => string.IsNullOrEmpty(s) ? s : char.ToUpperInvariant(s[0]) + s.Substring(1);

        // --- paperi: otsake, leima ja liuskat ---------------------------------------

        void RakennaPaperi(VisualElement isa, string teksti, string leima)
        {
            paperi = Rakenne.El("mk-st__paperi", isa);
            Reiat(paperi, "mk-st__reiat--yla");
            var otsake = Rakenne.El("mk-st__otsake", paperi, PickingMode.Ignore);
            if (!string.IsNullOrEmpty(leima))
            {
                // Leima on koristetta (web aria-hidden): kaupunki ja "Sähköasema" pyöreässä musteleimassa.
                var merkki = Rakenne.El("mk-st__leima", otsake, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti(SahkeTeksti.JsIsot(leima), "mk-st__leima-nimi", merkki), Kirjasin.KoneLihava);
                Kirjasimet.Aseta(Rakenne.Teksti("SÄHKÖASEMA", "mk-st__leima-asema", merkki), Kirjasin.Kone);
            }
            Kirjasimet.Aseta(Rakenne.Teksti("SÄHKÖSANOMA", "mk-st__nimio", otsake), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Teksti("N:o " + Numero(teksti), "mk-st__numero", otsake), Kirjasin.Kone);
            Rakenne.El("mk-st__tuplaviiva", paperi, PickingMode.Ignore);

            var liuskat = Rakenne.El("mk-st__liuskat", paperi, PickingMode.Ignore);
            int i = 0;
            foreach (var rivi in Regex.Split(teksti ?? "", @"\s*\n\s*").Where(r => r.Length > 0))
            {
                var l = Rakenne.Teksti("", "mk-st__rivi mk-st__rivi--k" + (i % 5 + 1), liuskat);
                if (SahkeTulkinta.KysymysRivi.IsMatch(rivi)) l.AddToClassList("mk-st__rivi--kysymys");
                Kirjasimet.Aseta(l, l.ClassListContains("mk-st__rivi--kysymys") ? Kirjasin.KoneLihava : Kirjasin.Kone);
                l.enableRichText = true;
                l.text = Ladonta(SahkeTeksti.JsIsot(rivi), int.MaxValue);
                i++;
            }
            Reiat(paperi, "mk-st__reiat--ala");
            KaytaLomakekuvaa(paperi);
        }

        static void Reiat(VisualElement isa, string luokka)
        {
            var r = Rakenne.El("mk-st__reiat " + luokka, isa, PickingMode.Ignore);
            for (int i = 0; i < 48; i++) Rakenne.El("mk-st__reika", r, PickingMode.Ignore);
        }

        /// <summary>Web sahkeNumero: sama sähke saa aina saman lomakenumeron (1000–9999).</summary>
        static int Numero(string teksti)
        {
            int summa = 0;
            var s = teksti ?? "";
            for (int i = 0; i < s.Length; i++)
            {
                int cp = char.IsHighSurrogate(s[i]) && i + 1 < s.Length ? char.ConvertToUtf32(s[i], s[++i]) : s[i];
                summa = (int)(((long)summa * 31 + cp) % 9000);
            }
            return 1000 + summa;
        }

        /// <summary>
        /// Liuskan teksti: näkyvät merkit, STOP haaleana (web .fokusvirta-sahke-stop; keskeneräinen "STO" ei
        /// täsmää) ja kirjoittamaton loppu läpinäkyvänä, jotta liuska ei kasva kirjoittaessa.
        /// </summary>
        static string Ladonta(string teksti, int naytetaan)
        {
            teksti ??= "";
            int n = Mathf.Clamp(naytetaan, 0, teksti.Length);
            var nakyva = teksti.Substring(0, n);
            var sb = new StringBuilder();
            int alku = 0;
            foreach (Match m in StopSana.Matches(nakyva))
            {
                sb.Append(Suojaa(nakyva.Substring(alku, m.Index - alku)));
                sb.Append("<alpha=#70>STOP<alpha=#FF>");
                alku = m.Index + m.Length;
            }
            sb.Append(Suojaa(nakyva.Substring(alku)));
            if (n < teksti.Length) sb.Append("<alpha=#00>").Append(Suojaa(teksti.Substring(n)));
            return sb.ToString();
        }

        static string Suojaa(string s) => s.IndexOf('<') < 0 ? s : s.Replace("<", "<noparse><</noparse>");

        /// <summary>
        /// Web varmistaSahkeLomakekuva: generoitu lennätinlomake korvaa CSS-koristelun, kun kuva on saatu
        /// (kerran istunnossa); ilman verkkoa lomake pysyy USS:n piirtämänä. Mitat 3:4 ja sisennykset 8 % / 9 %.
        /// </summary>
        void KaytaLomakekuvaa(VisualElement p)
        {
            if (lomakekuva != null) { AsetaLomakekuva(p); return; }
            if (lomakekuvaHaettu) return;
            lomakekuvaHaettu = true;
            Kuvat.Hae(LomakekuvaOsoite, t =>
            {
                lomakekuva = t;
                if (t != null) Paa(() => AsetaLomakekuva(paperi));
            });
        }

        static void AsetaLomakekuva(VisualElement p)
        {
            if (p == null || p.panel == null || lomakekuva == null || p.ClassListContains("mk-st__paperi--kuva")) return;
            p.AddToClassList("mk-st__paperi--kuva");
            p.style.backgroundImage = new StyleBackground(lomakekuva);
            void Mitoita(float w)
            {
                if (float.IsNaN(w) || w <= 0) return;
                p.style.paddingTop = p.style.paddingBottom = w * 0.08f;
                p.style.paddingLeft = p.style.paddingRight = w * 0.09f;
                p.style.minHeight = w * 4f / 3f;
            }
            p.RegisterCallback<GeometryChangedEvent>(e => { if (!Mathf.Approximately(e.oldRect.width, e.newRect.width)) Mitoita(e.newRect.width); });
            Mitoita(p.layout.width);
        }

        // --- kuittaus ja lähetetty ----------------------------------------------------

        void RakennaKuittaus(SahkeKortti k, VisualElement isa)
        {
            var kuittaus = Rakenne.El("mk-st__kuittaus", isa, PickingMode.Ignore);
            Kirjasimet.Aseta(kuittaus, Kirjasin.Luku);
            foreach (var kappale in (k.Teksti ?? "").Split(new[] { "\n\n" }, StringSplitOptions.RemoveEmptyEntries))
                Rakenne.Teksti(kappale.Trim(), "mk-st__kappale", kuittaus);
            Ensisijainen(string.IsNullOrEmpty(k.Nappi) ? "Anna Livian mennä" : k.Nappi, () =>
            {
                Tehoste("pulu.sahke");
                Teko(toiminnot.Sulje);
            }, napit);
        }

        // --- lomake -------------------------------------------------------------------

        void RakennaLomake(SahkeKortti k, VisualElement isa, int oma)
        {
            Rakenne.El("mk-st__lomakeviiva", isa, PickingMode.Ignore);
            var lomake = Rakenne.El("mk-st__lomake", isa, PickingMode.Ignore);
            AsetaHakemisto(k, oma);
            foreach (var aukko in k.Aukot ?? new List<SahkeAukko>())
            {
                if (aukko == null) continue;
                var rivi = Rakenne.El("mk-st__aukko", lomake, PickingMode.Ignore);
                // Kentän nimi on lomakkeeseen PAINETTU sana kentän vasemmalla puolella ("KOHDE ______").
                Kirjasimet.Aseta(Rakenne.Teksti(SahkeTeksti.JsIsot(aukko.Otsake ?? ""), "mk-st__kentannimi", rivi), Kirjasin.Kone);
                if (aukko.Luku) RakennaLuku(aukko, rivi);
                else RakennaValinta(aukko, rivi);
            }

            // Vapaa vastaus lomakkeen rinnalla (vaihe 2); teksti muistetaan uudelleenpiirron yli.
            string avain = (kaupunki ?? "") + "|" + (tehtava?.Id ?? k.Hahmo);
            if (k.Aukot != null && k.Aukot.Count > 0)
            {
                var vapaa = Rakenne.El("mk-st__vapaa", isa, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti(SahkeTeksti.JsIsot(nakyva?.VapaaOtsake ?? tehtava?.VapaaOtsake ?? "Tai kirjoita vastaus omin sanoin"), "mk-st__vapaaotsake", vapaa), Kirjasin.Kone);
                var kentta = new TextField { multiline = true, maxLength = 400 };
                kentta.AddToClassList("mk-st__vapaakentta");
                kentta.textEdition.placeholder = nakyva?.VapaaVihje ?? tehtava?.VapaaVihje ?? "Yhdellä lauseella, omin sanoin";
                kentta.tooltip = "Vastaus omin sanoin";
                if (vapaaAvain == avain && !string.IsNullOrEmpty(vapaaTeksti)) kentta.SetValueWithoutNotify(vapaaTeksti);
                kentta.RegisterValueChangedCallback(e => { vapaaAvain = avain; vapaaTeksti = e.newValue; });
                Kirjasimet.Aseta(kentta, Kirjasin.Kone);
                vapaa.Add(kentta);
                vapaaKentta = kentta;
                var vapaanapit = Rakenne.El("mk-st__vapaanapit", vapaa, PickingMode.Ignore);
                Toissijainen(nakyva?.LahetaVapaa ?? tehtava?.LahetaVapaa ?? "Lähetä omin sanoin", () => LahetaVapaa(avain), vapaanapit);
            }

            tulos = Rakenne.Teksti("", "mk-st__tulos", isa);
            Kirjasimet.Aseta(tulos, Kirjasin.Luku);
            tulos.style.display = DisplayStyle.None;
            // Pöllön paluusähke edellisestä ohilyönnistä; vieritetään näkyviin vain, kun se on uusi.
            if (!string.IsNullOrEmpty(k.ViimeSahke))
            {
                bool uusiSahke = k.ViimeSahke != viimeSahke;
                viimeSahke = k.ViimeSahke;
                NaytaTulos(k.ViimeSahke, "mk-st__tulos--vaarin", Kirjasin.Kone, uusiSahke);
            }
            if (k.Vinkki != null && k.Vinkki.Count > 0)
                Kirjasimet.Aseta(Rakenne.Teksti(string.Join(" ", k.Vinkki), "mk-st__vinkki", isa), Kirjasin.Luku);
            if (!string.IsNullOrEmpty(k.Maksurivi))
                Kirjasimet.Aseta(Rakenne.Teksti(k.Maksurivi, "mk-st__maksu", isa), Kirjasin.Luku);

            RakennaPullat(k, isa);

            Ensisijainen(nakyva?.Laheta ?? tehtava?.Laheta ?? "Lähetä sähke", Laheta, napit);
            Toissijainen("Myöhemmin", () => { Tehoste("pulu.sahke"); Teko(toiminnot.Sulje); }, napit);
        }

        void RakennaLuku(SahkeAukko aukko, VisualElement rivi)
        {
            var kentta = new TextField { maxLength = 6 };
            kentta.AddToClassList("mk-st__luku");
            kentta.keyboardType = TouchScreenKeyboardType.NumberPad;
            kentta.textEdition.placeholder = aukko.Vihje ?? "____";
            kentta.tooltip = aukko.Otsake;
            // Web input type=number: vain numerot (ja miinus alkuun).
            kentta.RegisterValueChangedCallback(e =>
            {
                var s = new string((e.newValue ?? "").Where((c, i) => char.IsDigit(c) || (c == '-' && i == 0)).ToArray());
                if (s != e.newValue) kentta.SetValueWithoutNotify(s);
            });
            Kirjasimet.Aseta(kentta, Kirjasin.Kone);
            rivi.Add(kentta);
            if (aukko.Id != null) arvot[aukko.Id] = () => (kentta.value ?? "").Trim();
        }

        void RakennaValinta(SahkeAukko aukko, VisualElement rivi)
        {
            string valittu = "";
            string tyhja = aukko.Vihje ?? ValitsinOletus;
            var nappi = Rakenne.Nappi("", "mk-st__valinta mk-st__valinta--tyhja", null, rivi);
            var teksti = nappi.Q<Label>(className: "mk-nappi__teksti");
            teksti.text = tyhja;
            Kirjasimet.Aseta(nappi, Kirjasin.Kone);
            Rakenne.Ikoni("<path d=\"M6.5 9.5 12 15l5.5-5.5\"/>", null, nappi);
            nappi.tooltip = aukko.Otsake;
            nappi.clicked += () => AvaaValitsin(aukko, valittu, arvo =>
            {
                valittu = arvo ?? "";
                teksti.text = valittu.Length > 0 ? valittu : tyhja;
                nappi.EnableInClassList("mk-st__valinta--tyhja", valittu.Length == 0);
            });
            if (aukko.Id != null) arvot[aukko.Id] = () => valittu;
        }

        void NaytaTulos(string teksti, string luokka = null, Kirjasin kirjasin = Kirjasin.Luku, bool vierita = true)
        {
            if (tulos == null) return;
            tulos.RemoveFromClassList("mk-st__tulos--vaarin");
            tulos.RemoveFromClassList("mk-st__tulos--odotus");
            Rakenne.Luokat(tulos, luokka);
            Kirjasimet.Aseta(tulos, kirjasin);
            tulos.text = teksti ?? "";
            tulos.style.display = string.IsNullOrEmpty(teksti) ? DisplayStyle.None : DisplayStyle.Flex;
            if (vierita && !string.IsNullOrEmpty(teksti)) Rakenne.Vierita(vieritys, tulos, 60);
        }

        // --- lähetys ----------------------------------------------------------------

        void Laheta()
        {
            if (odottaa || toiminnot.Laheta == null) return;
            var a = arvot.ToDictionary(p => p.Key, p => p.Value());
            SahkeVastausTulos r = null;
            try { r = toiminnot.Laheta(a); } catch (Exception e) { Debug.LogException(e); }
            // Ohilyönti ja osuma: ohjain on jo piirtänyt uuden kortin (paluusähke / kuittaus).
            if (r != null && (r.Laji == SahkeVastausLaji.Tyhja || r.Laji == SahkeVastausLaji.EiVastausta) && !string.IsNullOrEmpty(r.Teksti))
                NaytaTulos(r.Teksti, "mk-st__tulos--vaarin");
        }

        /// <summary>
        /// Web lahetaVapaa: paikallinen tulkinta ilmaiseksi (ohjain), muuten Livia vie tekstin pöllölle
        /// (enintään 10 s): kortti odotustilaan, napit ja kenttä kiinni, Livian mietintä tulosrivillä.
        /// Peli ei lukitu: kortin voi sulkea kesken.
        /// </summary>
        void LahetaVapaa(string avain)
        {
            if (odottaa || toiminnot.LahetaVapaa == null || vapaaKentta == null) return;
            var teksti = (vapaaKentta.value ?? "").Trim();
            if (teksti.Length == 0) { NaytaTulos(VapaaTyhja); return; }
            vapaaAvain = avain;
            vapaaTeksti = teksti;
            vapaaKentta.Blur();
            int oma = sukupolvi;
            bool valmisJo = false;
            odottaa = true;
            try
            {
                toiminnot.LahetaVapaa(teksti, r => Paa(() =>
                {
                    valmisJo = true;
                    if (!Auki) return;
                    // Ohjain piirsi kortin jo uudelleen (ohi, ei vastausta) tai vaihtoi kuittaukseen (osui).
                    if (oma == sukupolvi) { odottaa = false; Estetty(false); }
                    if (r != null && (r.Laji == SahkeVastausLaji.EiVastausta || r.Laji == SahkeVastausLaji.Tyhja))
                        NaytaTulos(r.Teksti ?? SahkeTulkinta.EiVastausta, "mk-st__tulos--vaarin");
                }));
            }
            catch (Exception e) { Debug.LogException(e); valmisJo = true; odottaa = false; }
            if (valmisJo || oma != sukupolvi) return;
            // Pöllön tuomio on matkalla.
            Estetty(true);
            var mietinnat = PuluChat.Vastausmietinnat;
            NaytaTulos(mietinnat.Length > 0 ? mietinnat[UnityEngine.Random.Range(0, mietinnat.Length)] : OdotusVara,
                "mk-st__tulos--odotus", Kirjasin.LukuKursiivi);
            Tehoste("pulu.sahke");
        }

        void Estetty(bool estetty)
        {
            foreach (var b in kortti.Sisus.Query<Button>().ToList())
                if (!b.ClassListContains("mk-st__sulje")) b.SetEnabled(!estetty);
            vapaaKentta?.SetEnabled(!estetty);
            foreach (var f in kortti.Sisus.Query<TextField>().ToList()) f.SetEnabled(!estetty);
        }

        // --- pullat -----------------------------------------------------------------

        void RakennaPullat(SahkeKortti k, VisualElement isa)
        {
            bool vinkki = k.VinkkiTarjolla && (k.VinkkiOstettu || toiminnot.OstaVinkki != null);
            bool linkki = k.LinkkiTarjolla && (k.LinkkiOstettu || toiminnot.OstaLinkki != null);
            if (!vinkki && !linkki) return;
            var kotelo = Rakenne.El("mk-st__pullat", isa, PickingMode.Ignore);
            var nimi = PullanNimi();
            if (vinkki)
                Pulla(kotelo, k.VinkkiHinta, k.VinkkiOstettu, toiminnot.OstaVinkki,
                    $"Osta {nimi} Livialle ({k.VinkkiHinta} £) — vinkki",
                    $"Varmista: {nimi} Livialle, {k.VinkkiHinta} £",
                    $"Kassa ei riitä: {nimi} {k.VinkkiHinta} £",
                    $"Livia sai kokonaisen pullan ({nimi}) ja sanoi vinkkinsä.");
            if (!linkki) return;
            Pulla(kotelo, k.LinkkiHinta, k.LinkkiOstettu, toiminnot.OstaLinkki,
                $"Osta puolikas {nimi} ({k.LinkkiHinta} £) — suora linkki",
                $"Varmista: puolikas {nimi}, {k.LinkkiHinta} £",
                $"Kassa ei riitä: puolikas {nimi} {k.LinkkiHinta} £",
                $"Livia sai puolikkaan pullan ({nimi}) ja näytti linkin.");
            // Ostettu linkki säilyy: kortti avattiin uudelleen, nappi kuuluu sinne edelleen.
            if (k.LinkkiOstettu)
            {
                var rivi = Rakenne.El("mk-st__linkki", kotelo, PickingMode.Ignore);
                Ensisijainen(k.LinkkiNappi ?? "Avaa Livian linkki", () =>
                {
                    Tehoste("pulu.sahke");
                    string virhe = null;
                    try { virhe = toiminnot.AvaaLinkki?.Invoke(); } catch (Exception e) { Debug.LogException(e); virhe = "Linkki ei auennut."; }
                    if (virhe != null && Auki) NaytaTulos(virhe, "mk-st__tulos--vaarin");
                }, rivi);
            }
        }

        string PullanNimi()
        {
            var maa = UiSisalto.Kaupunki(kaupunki)?.Maa ?? iso;
            return maa != null && PullaNimet.TryGetValue(maa, out var n) ? n : "makea pulla";
        }

        static int? Raha()
        {
            var m = PeliOhjain.Instanssi?.Matka;
            return m?.Tila?.Pelaaja?.Raha;
        }

        /// <summary>
        /// Web pullaOstosnappi: ensimmäinen napautus varmistaa (6 s), toinen maksaa; tyhjä kassa kertoo itsestään
        /// Livian äänellä; onnistunut osto jättää kuittausrivin (ohjain piirtää kortin uudelleen, raha leimana).
        /// </summary>
        void Pulla(VisualElement kotelo, int hinta, bool ostettu, Func<KauppaTulos> osta, string teksti, string varmistus, string koyha, string tehty)
        {
            var rivi = Rakenne.El("mk-st__pulla", kotelo, PickingMode.Ignore);
            if (ostettu || osta == null)
            {
                Kirjasimet.Aseta(Rakenne.Teksti(tehty, "mk-st__pullatehty", rivi), Kirjasin.LukuKursiivi);
                return;
            }
            bool odottaaVarmistusta = false;
            IVisualElementScheduledItem raukeaa = null;
            Button nappi = null;
            Label huomio = null;
            void Paivita()
            {
                var raha = Raha();
                var nappiTeksti = nappi.Q<Label>(className: "mk-nappi__teksti");
                if (raha.HasValue && raha.Value < hinta)
                {
                    odottaaVarmistusta = false;
                    nappi.SetEnabled(false);
                    nappi.RemoveFromClassList("mk-st__pullanappi--varmistus");
                    nappiTeksti.text = koyha;
                    huomio.text = PullaKoyhaLivia;
                    huomio.style.display = DisplayStyle.Flex;
                    return;
                }
                nappi.SetEnabled(true);
                nappi.EnableInClassList("mk-st__pullanappi--varmistus", odottaaVarmistusta);
                Kirjasimet.Aseta(nappi, odottaaVarmistusta ? Kirjasin.LukuLihava : Kirjasin.Luku);
                nappiTeksti.text = odottaaVarmistusta ? varmistus : teksti;
                huomio.text = odottaaVarmistusta ? PullaVarmistusOhje : "";
                huomio.style.display = odottaaVarmistusta ? DisplayStyle.Flex : DisplayStyle.None;
            }
            nappi = Rakenne.Nappi("", "mk-st__pullanappi", () =>
            {
                if (!odottaaVarmistusta)
                {
                    odottaaVarmistusta = true;
                    Paivita();
                    raukeaa?.Pause();
                    raukeaa = rivi.schedule.Execute(() => { odottaaVarmistusta = false; Paivita(); }).StartingIn(PullaVarmistusMs);
                    return;
                }
                raukeaa?.Pause();
                KauppaTulos r = null;
                try { r = osta(); } catch (Exception e) { Debug.LogException(e); }
                if (r == null || !r.Ok)
                {
                    // Kassa ehti tyhjentyä tai ostos on jo tehty: nappi kertoo tilanteen.
                    odottaaVarmistusta = false;
                    if (rivi.panel != null) Paivita();
                    return;
                }
                // Livian pullariemu (web ilmoitaLivianTilanne('bunGranted')); ohjain piirsi jo kuittausrivin.
                if (!Hiljaa && UiNakymat.Olemassa) UiNakymat.Hae().Pulu?.Tilanne("bunGranted");
                if (rivi.panel != null) { rivi.Clear(); Kirjasimet.Aseta(Rakenne.Teksti(tehty, "mk-st__pullatehty", rivi), Kirjasin.LukuKursiivi); }
            }, rivi);
            nappi.tooltip = teksti;
            huomio = Rakenne.Teksti("", "mk-st__pullahuomio", rivi);
            Kirjasimet.Aseta(huomio, Kirjasin.LukuKursiivi);
            Paivita();
        }

        // --- napit ------------------------------------------------------------------

        Button Ensisijainen(string teksti, Action painettu, VisualElement isa)
        {
            var b = Rakenne.Nappi(teksti, "mk-nappi--kulta mk-st__ensisijainen", painettu, isa);
            Rakenne.Tausta(b, Kuviot.Pysty("dialogi-kulta", Kuviot.Vari("#e9c169"), Kuviot.Vari("#d3a03c")));
            Kirjasimet.Aseta(b, Kirjasin.KoneLihava);
            return b;
        }

        Button Toissijainen(string teksti, Action painettu, VisualElement isa)
        {
            var b = Rakenne.Nappi(teksti, "mk-st__toissijainen", painettu, isa);
            Kirjasimet.Aseta(b, Kirjasin.Kone);
            return b;
        }

        // =====================================================================
        // HAKEMISTON VALITSIN (web <select>)
        // =====================================================================

        void AsetaHakemisto(SahkeKortti k, int oma)
        {
            hakemisto = k.Hakemisto ?? new List<string>();
            hakemistoHaussa = false;
            if (hakemisto.Count > 0 || string.IsNullOrEmpty(iso)) return;
            // Ohjaimen koukku ei vielä ehtinyt: lista valmistuu taustalla, valitsin päivittyy.
            var valmis = SahkeHakemistot.Valmis(iso);
            if (valmis != null) { hakemisto = valmis; return; }
            hakemistoHaussa = true;
            SahkeHakemistot.Lataa(iso, lista => Paa(() =>
            {
                if (oma != sukupolvi) return;
                hakemisto = lista ?? new List<string>();
                hakemistoHaussa = false;
                foreach (var a in hakemistoPaivittyi.ToArray()) a();
            }));
        }

        void AvaaValitsin(SahkeAukko aukko, string valittu, Action<string> valitse)
        {
            if (odottaa) return;
            kirjoitus?.Ohita();
            SuljeValitsin();
            var tausta = Rakenne.El("mk-st__valitsin-tausta", juuri);
            valitsin = tausta;
            // Taustan napautus peruu (kuten selaimen valikko).
            tausta.RegisterCallback<PointerDownEvent>(e => { if (e.target == tausta) { e.StopPropagation(); SuljeValitsin(); } });
            var laatikko = Rakenne.El("mk-st__valitsin", tausta);
            Rakenne.Tausta(laatikko, Kuviot.Pergamentti);
            var otsake = SahkeTeksti.JsIsot(aukko.Otsake ?? "Valitse");
            Kirjasimet.Aseta(Rakenne.Teksti(otsake + (string.IsNullOrEmpty(aukko.Vihje) ? "" : "  " + aukko.Vihje), "mk-st__valitsin-otsikko", laatikko), Kirjasin.Kone);
            var lista = new ScrollView(ScrollViewMode.Vertical);
            lista.AddToClassList("mk-st__valitsin-lista");
            lista.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            lista.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            laatikko.Add(lista);
            var valitsinNapit = Rakenne.El("mk-st__valitsin-napit", laatikko, PickingMode.Ignore);
            Toissijainen("Peru", SuljeValitsin, valitsinNapit);

            void Tayta()
            {
                lista.Clear();
                VisualElement valittuEl = null;
                var tyhjaTeksti = aukko.Vihje ?? ValitsinOletus;
                foreach (var (arvo, nakyva) in new[] { ("", tyhjaTeksti) }.Concat(hakemisto.Select(h => (h, h))))
                {
                    var b = Rakenne.Nappi(nakyva, "mk-st__vaihtoehto", () =>
                    {
                        valitse(arvo);
                        SuljeValitsin();
                    }, lista);
                    Kirjasimet.Aseta(b, arvo.Length == 0 ? Kirjasin.LukuKursiivi : Kirjasin.Luku);
                    if (arvo == valittu) { b.AddToClassList("mk-st__vaihtoehto--valittu"); valittuEl = b; }
                }
                if (hakemisto.Count == 0)
                    Kirjasimet.Aseta(Rakenne.Teksti(hakemistoHaussa ? "Luetteloa haetaan…"
                        : "Luettelo on tyhjä. Kirjoita vastaus omin sanoin.", "mk-st__valitsin-tyhja", lista), Kirjasin.LukuKursiivi);
                if (valittuEl != null) Rakenne.Vierita(lista, valittuEl, 30);
            }
            Tayta();
            hakemistoPaivittyi.Add(() => { if (valitsin == tausta) Tayta(); });
            Tehoste("pulu.sahke");
        }

        void SuljeValitsin()
        {
            valitsin?.RemoveFromHierarchy();
            valitsin = null;
        }

        // =====================================================================
        // KIRJOITUS RIVI KERRALLAAN (web kirjoitaSahke)
        // =====================================================================

        /// <summary>
        /// Rivit kirjoittuvat SahkeAikataulun tahdissa: tulevat liuskat varaavat paikkansa näkymättöminä
        /// (kortti ei kasva), kirjoittamaton loppu on läpinäkyvää, rivin lopussa lennättimen kilahdus.
        /// Lomake on kirjoituksen ajan himmeä mutta käytettävissä; napautus sähkeeseen tai nappiin täyttää
        /// kaiken heti.
        /// </summary>
        sealed class Kirjoitus
        {
            readonly SahketehtavaNakyma n;
            readonly SahkeAikataulu a;
            readonly List<Label> rivit;
            readonly int[] naytetty;
            readonly float alku;
            readonly IVisualElementScheduledItem ajo;
            bool ohi;

            public Kirjoitus(SahketehtavaNakyma n, SahkeAikataulu a)
            {
                this.n = n;
                this.a = a;
                rivit = n.paperi.Query<Label>(className: "mk-st__rivi").ToList();
                naytetty = new int[rivit.Count];
                for (int i = 0; i < rivit.Count; i++)
                {
                    rivit[i].AddToClassList("mk-st__rivi--odottaa");
                    rivit[i].text = Ladonta(Teksti(i), 0);
                }
                n.kortti.AddToClassList("mk-st--kirjoittaa");
                alku = Time.unscaledTime;
                ajo = n.kortti.schedule.Execute(Askel).Every(16);
            }

            string Teksti(int i) => SahkeTeksti.JsIsot(i < a.Rivit.Count ? a.Rivit[i].Teksti : "");

            void Askel()
            {
                if (ohi) return;
                if (n.kortti.panel == null || !n.Auki) { Pysayta(); return; }
                Ruudunpaivitys.Herata(0.1f); // lämpö: täysi taajuus animaation ajan
                float t = (Time.unscaledTime - alku) * 1000f;
                for (int i = 0; i < rivit.Count && i < a.Rivit.Count; i++)
                {
                    var r = a.Rivit[i];
                    if (t < r.Alku) break;
                    rivit[i].RemoveFromClassList("mk-st__rivi--odottaa");
                    int merkit = r.Merkkivali > 0 ? Mathf.Min(r.Merkit, Mathf.FloorToInt((t - r.Alku) / (float)r.Merkkivali)) : r.Merkit;
                    if (merkit == naytetty[i]) continue;
                    naytetty[i] = merkit;
                    rivit[i].text = Ladonta(Teksti(i), merkit);
                    // Rivin loppu: lennättimen kello (web sfx 'bling').
                    if (merkit >= r.Merkit) n.Tehoste("pulu.kilahdus");
                }
                if (t >= a.Kesto) Ohita();
            }

            /// <summary>Kaikki rivit valmiiksi heti (web ohita).</summary>
            public void Ohita()
            {
                if (ohi) return;
                Pysayta();
                for (int i = 0; i < rivit.Count; i++)
                {
                    rivit[i].RemoveFromClassList("mk-st__rivi--odottaa");
                    rivit[i].text = Ladonta(Teksti(i), int.MaxValue);
                }
            }

            public void Pysayta()
            {
                ohi = true;
                ajo?.Pause();
                n.kortti.RemoveFromClassList("mk-st--kirjoittaa");
                if (n.kirjoitus == this) n.kirjoitus = null;
            }
        }

        // =====================================================================
        // LIVIAN KUPLAT (PeliOhjain.LivianKuplat)
        // =====================================================================

        /// <summary>
        /// Web sahkeSaateKuplaan / polloPuheenvuoro / polloKuplasarja / soitaLivianKaupunkiSarja:
        /// johdanto ja odotus pienellä viiveellä kortin päälle, vinkki ja linkin saate heti, paluu
        /// kuplasarjana, oikein vain äänenä (teksti on kuittauskortilla). Seuraava kupla odottaa edellisen
        /// lukuajan tai äänitteen loppuun; sarja katkeaa, jos pelaaja on lähtenyt kaupungista.
        /// </summary>
        public void LivianKuplat(string kaupunkiId, string kentta, IReadOnlyList<string> kuplat)
        {
            if (kuplat == null || kuplat.Count == 0) return;
            kuplaKaupunki = kaupunkiId;
            kuplaRuutu = PaaSaie ? Time.frameCount : -1;
            var lista = kuplat.Where(s => !string.IsNullOrWhiteSpace(s)).ToList();
            Paa(() =>
            {
                int vuoro = ++sarjaVuoro;
                bool kuplina = kentta != "oikein";
                long viive = kentta == "johdanto" || kentta == "odotus" ? SaateViiveMs : 0;
                var ajastin = UiKerros.Hae().Juuri(UiKerros.Tilarivi).schedule;
                ajastin.Execute(() => Sarja(kaupunkiId, kentta, lista, 0, kuplina, vuoro)).StartingIn(viive);
            });
        }

        void Sarja(string kaupunkiId, string kentta, List<string> kuplat, int i, bool kuplina, int vuoro)
        {
            if (vuoro != sarjaVuoro || i >= kuplat.Count) return;
            var o = PeliOhjain.Instanssi;
            if (i > 0 && !Hiljaa && o != null && o.Matka != null && o.PelaajanKaupunki != kaupunkiId) return;
            var teksti = kuplat[i];
            var url = Hiljaa ? null : LivianAani(kaupunkiId, kentta, i, teksti);
            if (!kuplina && url == null) return; // äänetön kuittaus: teksti on jo kortilla
            bool jatkettu = false;
            void Seuraava()
            {
                if (jatkettu) return;
                jatkettu = true;
                Sarja(kaupunkiId, kentta, kuplat, i + 1, kuplina, vuoro);
            }
            if (kuplina) Pulu.Hae().Sano(teksti, url, null, Seuraava);
            else Aanet.Soita(AaniKanava.Puhe, url);
            if (i + 1 >= kuplat.Count) return;
            var ajastin = UiKerros.Hae().Juuri(UiKerros.Tilarivi).schedule;
            float luku = PuluKuplat.Lukuaika(teksti);
            if (url == null) { ajastin.Execute(Seuraava).StartingIn((long)luku + 280); return; }
            // Kupla odottaa puheen loppuun (web livianKuplanAjastin).
            Aanet.Hae(url, klippi => ajastin.Execute(Seuraava)
                .StartingIn((long)(klippi != null ? Mathf.Max(luku, klippi.length * 1000f + 300f) : luku + 280)));
        }

        /// <summary>
        /// Web LIVIAN_KAUPUNKILAHTEET (sähkevaiheet on äänitetty vain Sofiaan): kenttä → ensimmäisen kuplan
        /// indeksi ja kuplien määrä. Tiedosto livia-sofia-(indeksi+1).mp3, versio tiiviste-erä.
        /// </summary>
        static readonly Dictionary<string, Dictionary<string, (int Alku, int Maara)>> Aanilahteet = new Dictionary<string, Dictionary<string, (int, int)>>
        {
            ["sofia"] = new Dictionary<string, (int, int)>
            {
                ["johdanto"] = (4, 2), ["vinkki"] = (6, 2), ["linkkiSaate"] = (8, 1),
                ["oikein"] = (9, 2), ["odotus"] = (11, 1), ["paluu"] = (12, 2),
            },
        };

        /// <summary>Web LIVIAN_AANITETYT: tekstin tiiviste, jolla äänite on generoitu (eri teksti = ei ääntä).</summary>
        static readonly Dictionary<string, string> Aanitetyt = new Dictionary<string, string>
        {
            ["sofia-5"] = "1e64f9d0", ["sofia-6"] = "2618c9dd", ["sofia-7"] = "9118b3f7", ["sofia-8"] = "559c7574",
            ["sofia-9"] = "8f1fd7d8", ["sofia-10"] = "153d43f5", ["sofia-11"] = "a25842d0", ["sofia-12"] = "75c13aff",
            ["sofia-13"] = "bc7f04ef", ["sofia-14"] = "ced3fd34",
        };

        /// <summary>Web LIVIAN_AANIERAT: pulun ääni erä 4 (12.9.2026).</summary>
        const int AaniEra = 4;

        static string LivianAani(string kaupunkiId, string kentta, int kupla, string teksti)
        {
            if (kaupunkiId == null || kentta == null || !Aanilahteet.TryGetValue(kaupunkiId, out var kentat)
                || !kentat.TryGetValue(kentta, out var p) || kupla >= p.Maara) return null;
            int indeksi = p.Alku + kupla;
            if (!Aanitetyt.TryGetValue(kaupunkiId + "-" + (indeksi + 1), out var tiiviste) || tiiviste != Tiiviste(teksti)) return null;
            return Pulu.AaniOsoite(kaupunkiId, indeksi, tiiviste + "-" + AaniEra);
        }

        /// <summary>Web livianTiiviste: FNV-1a 32 koodipisteittäin trimmatusta tekstistä, 8 heksamerkkiä.</summary>
        internal static string Tiiviste(string teksti)
        {
            uint h = 0x811c9dc5;
            var s = (teksti ?? "").Trim();
            for (int i = 0; i < s.Length; i++)
            {
                int cp = char.IsHighSurrogate(s[i]) && i + 1 < s.Length ? char.ConvertToUtf32(s[i], s[++i]) : s[i];
                h ^= (uint)cp;
                h = unchecked(h * 0x01000193);
            }
            return h.ToString("x8");
        }

        // =====================================================================
        // TESTIKOMENTO 'ui sahketehtava [kaupunki] [tila]'
        // =====================================================================

        public const string TestiTilat = "tyhja | ohi | ohi2 | pullat | odotus | eivastausta | osui | lahetetty | sulje | tila";

        SahketehtavaTila testiTila;
        SahketehtavaToiminnot testiToiminnot;
        bool testiVinkki, testiLinkki;

        /// <summary>
        /// Esimerkkikortti ilman pelisilmukkaa oikealla sisällöllä (fokusvirrat, hakemisto) ja paikallisella
        /// SahketehtavaTilalla. Tilat: tyhja (oletus) | ohi (1 ohilyönti) | ohi2 (vinkki näkyy) | pullat (molemmat
        /// ostettu) | odotus (pöllön tuomio matkalla 8 s) | eivastausta | osui (kuittaus) | lahetetty | sulje | tila.
        /// Kaupunki oletuksena sofia. Hiljainen: ei tehosteita eikä Livian ääntä.
        /// </summary>
        public string Testaa(string args)
        {
            var sanat = (args ?? "").Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).Select(s => s.ToLowerInvariant()).ToList();
            var tilat = new[] { "tyhja", "ohi", "ohi2", "pullat", "odotus", "eivastausta", "osui", "kuittaus", "lahetetty", "sulje", "tila" };
            string tila = sanat.FirstOrDefault(s => tilat.Contains(s)) ?? "tyhja";
            string k = sanat.FirstOrDefault(s => !tilat.Contains(s)) ?? "sofia";
            if (tila == "sulje") { Sulje(); return "sähketehtävä suljettu"; }
            if (tila == "tila")
                return !Auki || nakyva == null ? "kiinni"
                    : $"auki: {kaupunki} {(nakyva.Kuittaus ? "kuittaus" : nakyva.Lomake ? "lomake" : "lähetetty")}, hakemisto {hakemisto.Count}{(hakemistoHaussa ? " (haussa)" : "")}, "
                      + $"palkkio {nakyva.Palkkio}, kirjoitus {(kirjoitus != null ? "käynnissä" : "valmis")}, odottaa {odottaa}";
            Hiljaa = true;
            Fokusvirrat.Lataa(() =>
            {
                var t = Fokusvirrat.Hae(k)?.Sahketehtava;
                if (t == null)
                {
                    var kaikki = string.Join(", ", Fokusvirrat.Kaikki.Where(v => v.Sahketehtava != null).Select(v => v.Kaupunki));
                    Debug.LogWarning($"MATKAKIRJA ui sähketehtävä: kaupungilla {k} ei ole sähketehtävää (on: {kaikki})");
                    return;
                }
                var maa = t.HakemistoMaa ?? UiSisalto.Kaupunki(k)?.Maa;
                SahkeHakemistot.Lataa(maa, lista => Paa(() => NaytaTesti(t, tila, lista)));
            });
            return $"sähketehtävä {k} {tila}: ladataan sisältö…";
        }

        void NaytaTesti(Sahketehtava t, string tila, List<string> lahteet)
        {
            testiTila = new SahketehtavaTila();
            testiVinkki = testiLinkki = tila == "pullat";
            var tyhja = new Dictionary<string, string>();
            if (tila == "ohi" || tila == "ohi2") testiTila.Laheta(t, tyhja);
            if (tila == "ohi2") testiTila.Laheta(t, tyhja);
            SahketehtavaToiminnot toim = null;
            SahkeKortti Kortti() => TestiPullat(SahketehtavaTila.Pullat(testiTila.Kortti(t, lahteet), t, null), t);
            void Kasittele(SahkeVastausTulos r)
            {
                if (r.Laji == SahkeVastausLaji.Osui)
                {
                    Nayta(testiTila.KuittausKortti(t), toim);
                    LivianKuplat(t.Kaupunki, "oikein", t.Oikein);
                    Debug.Log("MATKAKIRJA ui sähketehtävä: osui, Livia lentää (testissä ei paluuta)");
                }
                else if (r.Laji != SahkeVastausLaji.Pollolle) Nayta(Kortti(), toim);
                Debug.Log($"MATKAKIRJA ui sähketehtävä: {r.Laji} ohi {r.Ohi} palkkio {r.Palkkio}");
            }
            toim = new SahketehtavaToiminnot
            {
                Laheta = a => { var r = testiTila.Laheta(t, a); Kasittele(r); return r; },
                LahetaVapaa = (teksti, valmis) =>
                {
                    var r = testiTila.LahetaVapaa(t, teksti);
                    if (r.Laji != SahkeVastausLaji.Pollolle) { Kasittele(r); valmis?.Invoke(r); return; }
                    // Pöllöä ei kysytä testissä: "ei vastausta" odotuksen jälkeen (tila odotus: 8 s).
                    juuri.schedule.Execute(() =>
                    {
                        var r2 = testiTila.PollonTuomio(t, null);
                        Kasittele(r2);
                        valmis?.Invoke(r2);
                    }).StartingIn(tila == "odotus" ? 8000 : 2500);
                },
                OstaVinkki = t.Vinkki.Count > 0 ? () =>
                {
                    testiVinkki = true;
                    LivianKuplat(t.Kaupunki, "vinkki", t.Vinkki);
                    Nayta(Kortti(), toim);
                    return new KauppaTulos { Ok = true, Hinta = KauppaVakiot.SahkePullaVinkkiHinta };
                } : (Func<KauppaTulos>)null,
                OstaLinkki = t.Vastauslinkki != null ? () =>
                {
                    testiLinkki = true;
                    LivianKuplat(t.Kaupunki, "linkkiSaate", t.LinkkiSaate);
                    Nayta(Kortti(), toim);
                    return new KauppaTulos { Ok = true, Hinta = KauppaVakiot.SahkePullaLinkkiHinta };
                } : (Func<KauppaTulos>)null,
                AvaaLinkki = () =>
                {
                    var l = t.Vastauslinkki;
                    Sulje();
                    if (l?.Tyyppi == "kohde" && PeliOhjain.AvaaKohde != null) return PeliOhjain.AvaaKohde(l.Maa, l.Kohde) ? null : "kohde ei auennut";
                    Debug.Log($"MATKAKIRJA ui sähketehtävä: linkki {l?.Tyyppi} {l?.Kaupunki ?? l?.Maa} {l?.Sivu?.ToString() ?? l?.Kohde}");
                    return null;
                },
                Sulje = Sulje,
            };
            testiToiminnot = toim;

            kaupunki = t.Kaupunki;
            if (tila == "osui" || tila == "kuittaus" || tila == "lahetetty")
            {
                var oikeat = t.Aukot.Where(a => a.Id != null).ToDictionary(a => a.Id, a => a.Luku ? a.Oikea : a.Oikeat.FirstOrDefault());
                testiTila.Laheta(t, oikeat);
                if (tila == "lahetetty") Nayta(Kortti(), toim);
                else { Nayta(testiTila.KuittausKortti(t), toim); LivianKuplat(t.Kaupunki, "oikein", t.Oikein); }
                return;
            }
            var kortti0 = Kortti();
            LivianKuplat(t.Kaupunki, "johdanto", kortti0.Kuplat);
            Nayta(kortti0, toim);
            if (tila == "odotus" || tila == "eivastausta")
            {
                vapaaAvain = (kaupunki ?? "") + "|" + (t.Id ?? t.Hahmo);
                vapaaTeksti = "kultaa jossain";
                Paa(() =>
                {
                    kirjoitus?.Ohita();
                    if (vapaaKentta != null) vapaaKentta.SetValueWithoutNotify(vapaaTeksti);
                    LahetaVapaa(vapaaAvain);
                });
            }
        }

        SahkeKortti TestiPullat(SahkeKortti k, Sahketehtava t)
        {
            if (k == null || !k.Lomake) return k;
            k.VinkkiOstettu = k.VinkkiTarjolla && testiVinkki;
            k.LinkkiOstettu = k.LinkkiTarjolla && testiLinkki;
            k.LinkkiNappi = k.LinkkiOstettu ? t.Vastauslinkki?.Nappi : null;
            return k;
        }
    }

    /// <summary>
    /// Pöllön sähkehakemisto maalle (web sisaltohakemisto): maan lehden nostot, maan kaupunkien lehtien
    /// nostot, kaupunkien fokusvirtojen otsikot (täkyt, kohdenostot, täkynostojen nimiöt) ja maan
    /// karttakohteet nimellä. Aakkostus ja kaksoiskappaleet SahkeTulkinta.Hakemistolla. Kootaan kerran per maa
    /// (lehtien jäsennys taustasäikeessä) ja pidetään muistissa.
    /// </summary>
    public static class SahkeHakemistot
    {
        static readonly Dictionary<string, List<string>> valmiit = new Dictionary<string, List<string>>();
        static readonly Dictionary<string, List<Action<List<string>>>> kesken = new Dictionary<string, List<Action<List<string>>>>();

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { valmiit.Clear(); kesken.Clear(); }

        /// <summary>Valmis lista tai null (ei vielä koottu).</summary>
        public static List<string> Valmis(string maa) =>
            maa != null && valmiit.TryGetValue(maa.ToUpperInvariant(), out var l) ? l : null;

        /// <summary>PeliOhjain.SahkeHakemisto: valmis lista, tai null ja kokoaminen käyntiin (näkymä päivittyy itse).</summary>
        public static IEnumerable<string> Hae(string maa)
        {
            var l = Valmis(maa);
            if (l == null && !string.IsNullOrEmpty(maa)) Lataa(maa, null);
            return l;
        }

        /// <summary>Kokoaa (kerran) ja kutsuu valmis pääsäikeessä; tyhjä maa = tyhjä lista.</summary>
        public static void Lataa(string maa, Action<List<string>> valmis)
        {
            if (string.IsNullOrEmpty(maa)) { valmis?.Invoke(new List<string>()); return; }
            maa = maa.ToUpperInvariant();
            if (valmiit.TryGetValue(maa, out var l)) { valmis?.Invoke(l); return; }
            if (kesken.TryGetValue(maa, out var odottajat)) { if (valmis != null) odottajat.Add(valmis); return; }
            kesken[maa] = new List<Action<List<string>>>();
            if (valmis != null) kesken[maa].Add(valmis);
            UiKerros.Hae().StartCoroutine(Kokoa(maa));
        }

        static IEnumerator Kokoa(string maa)
        {
            var otsikot = new List<string>();
            bool ok = false;
            UiSisalto.Lataa(() => ok = true);
            while (!ok) yield return null;
            // 1–2: maan lehti ja maan kaupunkien lehdet (sama haku lataa molemmat kokoelmat).
            yield return LehtiSisalto.Hae(LehtiLaji.Maa, maa, _ => { });
            var kaupungit = UiSisalto.Kaikki.Where(k => k.Maa == maa).Select(k => k.Id).ToList();
            otsikot.AddRange(LehtiSisalto.NostoOtsikot(LehtiLaji.Maa, maa));
            foreach (var k in kaupungit) otsikot.AddRange(LehtiSisalto.NostoOtsikot(LehtiLaji.Kaupunki, k));
            // 3: fokusvirtojen omat otsikot.
            ok = false;
            Fokusvirrat.Lataa(() => ok = true);
            while (!ok) yield return null;
            foreach (var k in kaupungit) if (Fokusvirrat.Hae(k) is Saapumisvirta v) otsikot.AddRange(v.Otsikot);
            // 4: karttakohteet nimellä (kohdekortin otsikko).
            yield return NostoSisalto.Karttakohteet(maa, n => otsikot.AddRange(n));

            List<string> lista;
            try { lista = SahkeTulkinta.Hakemisto(otsikot); }
            catch (Exception e) { Debug.LogException(e); lista = otsikot.Distinct().ToList(); }
            valmiit[maa] = lista;
            Debug.Log($"MATKAKIRJA ui sähkehakemisto {maa}: {lista.Count} otsikkoa ({kaupungit.Count} kaupunkia)");
            if (!kesken.TryGetValue(maa, out var odottajat)) yield break;
            kesken.Remove(maa);
            foreach (var a in odottajat) { try { a(lista); } catch (Exception e) { Debug.LogException(e); } }
        }
    }
}
