// KYSYMYSNÄKYMÄ (Natiivi-UI, erä 3): Pelikoodarin IKysymysNakyma UI Toolkitilla.
//
// Verkkopelin tehtäväkortti #quiz-dialog (index.html, js/visa.js renderQuiz ja
// renderDuel, js/ui.js syncOptions ja sourceLine) pergamenttikorttina tumman
// himmennyksen päällä (pelidialogien kerros 30):
//
//   [PULMA] Pariisi · aarrekysymys                 ⧗ 38     ← .quiz-head + tiimalasi
//   ─────────────────────────────────────────────
//   [ pulman luonnos | valokuva | lippu ]                   ← .quiz-sketch / .quiz-photo
//   Kahvilan tarjoilija kysyy:                              ← kehys (kursiivi)
//   Kysymys kirjoituskoneella                               ← .quiz-question
//   ✎ ostettu vihje / rosvon huomautus                      ← .quiz-hint-text
//   (A) vaihtoehto  (B) …  yksi sarake kuten puhelimessa    ← .quiz-option
//   [ Oikein! · löytö · fakta · LÄHDE: … ]                  ← .quiz-result
//   ─────────────────────────────────────────────
//   [Vihje (40 £)]            [50:50 (80 £)]  [Jatka matkaa] ← menu: .lifeline, .primary
//
// Otsikkorivi ja napit pysyvät paikallaan; väli vierii (ScrollView), kun
// kortti ei mahdu puhelimen ruudulle. Tapahtumakortti (#event-dialog) käyttää
// samaa korttia: "Matkalla sattui", teksti, vaikutus ja Jatka.
//
// Kohtaaminen (erä 4, web visa.js "KOHTAAMISEN KAKSI SIVUA"): TervehdysVaihe =
// sivu 1: iso kohtaamiskuva kuvateksteineen, hahmon tervehdys kirjoituskoneella,
// viimeisen yrityksen varoitus ja AloitaTeksti-nappi (KysymysToiminnot.Aloita).
// Sivu 2 (kysymys): kuva pieneksi 104 pt tunnisteeksi, otsikkorivillä "yritys n/2".
// Tulos kahdessa vaiheessa (TulosVaihe): 1 = tuomio ja vaihtoehtojen värit,
// 2 = paljastus: löydön kuva (LaattaIkoni), oikea vastaus, ohjeet, "Vuoro
// vaihtuu", repliikki ja fakta kirjoituskoneella, lähteet ja Jatka. Napautus
// kortissa näyttää kirjoitettavan tekstin heti kokonaan.
//
// Sopimus (RAJAPINTA.md): ohjain kutsuu Nayta jokaisen teon jälkeen, ja näkymä
// rakentaa sisällön datasta uudelleen (ei omaa pelitilaa). PaivitaAika tulee
// joka ruudussa, kun Sekunnit != null. Syötelukko on ohjaimen: näkymä ei kutsu
// SyoteLukkoa. Himmennyksen napautus ei sulje kysymystä (modaalinen, kuten web).
// Tuomion ja paljastuksen ajoitus (0,9 s) on ohjaimen; TulosVaihe 0 vastatussa
// datassa (vanha ohjain, testiesimerkit) = paljastus suoraan.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class KysymysNakyma : IKysymysNakyma
    {
        const string Kirjaimet = "ABCDEFGH";
        const float ViestiKestoS = 3.5f;

        readonly UiKerros kerros;
        readonly VisualElement himmennys, paa, aika, napit;
        readonly Kortti kortti;
        readonly Label leima, kaupunki, sekunnit, viesti;
        readonly Tiimalasi tiimalasi;
        readonly ScrollView vieritys;
        KysymysNaytto nakyva;
        KysymysToiminnot toiminnot;
        string avain;
        bool odottaa;
        int? aikaraja;
        IVisualElementScheduledItem viestiPiiloon;
        // Vaiheet: edellinen näyttö (vaiheen vaihtuessa vieritys siirtyy) ja vaihtoehtojen esiinliuku kerran.
        int edellinenTulosVaihe;
        bool edellinenTervehdys, vaihtoehdotEsilla;
        Button aloitaNappi;
        VisualElement varoitus;

        // Kirjoituskone (web typeText: sana kerrallaan, tuleva teksti näkymättömänä paikallaan).
        const int TervehdysMs = 95, RepliikkiMs = 55;
        readonly Dictionary<string, int> kirjoitettu = new Dictionary<string, int>();
        readonly List<(Label Label, string Teksti, string[] Sanat, int Ms)> kirjoitusJono = new List<(Label, string, string[], int)>();
        Action kunKirjoitettu;
        IVisualElementScheduledItem kirjoitusAjo;

        public bool Auki { get; private set; }

        /// <summary>Viimeksi näytetty tila (testikomennot).</summary>
        public KysymysNaytto Nakyva => Auki ? nakyva : null;

        /// <summary>Kutsutaan Piilotan yhteydessä (testikomentojen esimerkkiajastin pysähtyy).</summary>
        public event Action Piilotettu;

        public KysymysNakyma(UiKerros kerros)
        {
            this.kerros = kerros;
            var juuri = kerros.Juuri(UiKerros.Pelidialogit);
            kerros.Turva(UiKerros.Pelidialogit); // turva-alueen reunat lasketaan vain kerroksille, joilla on turva

            himmennys = Rakenne.El("mk-himmennys mk-himmennys--tumma", juuri);
            himmennys.style.display = DisplayStyle.None;

            kortti = new Kortti("mk-kysymys");
            himmennys.Add(kortti);
            var sisus = kortti.Sisus;

            // --- otsikkorivi: leima, kaupunki ja tiimalasi ---
            paa = Rakenne.El("mk-kysymys__paa", sisus, PickingMode.Ignore);
            var paateksti = Rakenne.El("mk-kysymys__paateksti", paa, PickingMode.Ignore);
            leima = Rakenne.Teksti("", "mk-kysymys__leima", paateksti);
            Kirjasimet.Aseta(leima, Kirjasin.KoneLihava);
            kaupunki = Rakenne.Teksti("", "mk-kysymys__kaupunki", paateksti);
            Kirjasimet.Aseta(kaupunki, Kirjasin.LukuKursiivi);
            aika = Rakenne.El("mk-kysymys__aika", paa, PickingMode.Ignore);
            tiimalasi = new Tiimalasi();
            aika.Add(tiimalasi);
            sekunnit = Rakenne.Teksti("", "mk-kysymys__sekunnit", aika);
            Kirjasimet.Aseta(sekunnit, Kirjasin.KoneLihava);

            // --- vierivä sisältö ---
            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-kysymys__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            sisus.Add(vieritys);

            // --- viesti ja napit (aina näkyvissä kortin alareunassa) ---
            viesti = Rakenne.Teksti("", "mk-kysymys__viesti", sisus);
            Kirjasimet.Aseta(viesti, Kirjasin.LukuKursiivi);
            viesti.style.display = DisplayStyle.None;
            napit = Rakenne.El("mk-kysymys__napit", sisus, PickingMode.Ignore);
            Kirjasimet.Aseta(napit, Kirjasin.Kone);
            // Napautus missä tahansa kortissa näyttää kirjoitettavan tekstin heti kokonaan.
            sisus.RegisterCallback<PointerDownEvent>(_ => KirjoitusValmiiksi(), TrickleDown.TrickleDown);

            kerros.TurvaMuuttui += Asettele;
        }

        void Asettele()
        {
            // Kortti turva-alueen sisään (lovi, kotipalkki); himmennys peittää koko ruudun.
            var r = kerros.Reunat(UiKerros.Pelidialogit);
            himmennys.style.paddingTop = r.y + 10;
            himmennys.style.paddingBottom = r.w + 10;
            himmennys.style.paddingLeft = r.x + 8;
            himmennys.style.paddingRight = r.z + 8;
        }

        // --- IKysymysNakyma -------------------------------------------------------

        public void Nayta(KysymysNaytto d, KysymysToiminnot t)
        {
            if (d == null) { Piilota(); return; }
            string uusiAvain = d.Laji + "\u001f" + d.Otsikko + "\u001f" + d.Kysymys;
            bool uusi = uusiAvain != avain || !Auki;
            avain = uusiAvain;
            nakyva = d;
            toiminnot = t ?? new KysymysToiminnot();
            odottaa = false;

            bool tapahtuma = d.Laji == KysymysLaji.Tapahtumakortti;
            bool tervehdys = d.TervehdysVaihe && !d.Vastattu && !tapahtuma;
            int tulosVaihe = !d.Vastattu ? 0 : d.TulosVaihe <= 0 ? 2 : Mathf.Min(d.TulosVaihe, 2);
            if (uusi)
            {
                kirjoitettu.Clear();
                vaihtoehdotEsilla = false;
                edellinenTulosVaihe = 0;
                edellinenTervehdys = false;
            }
            bool sivuVaihtui = uusi || tervehdys != edellinenTervehdys;
            bool tulosVaihtui = tulosVaihe > 0 && tulosVaihe != edellinenTulosVaihe;

            // Kesken oleva kirjoitus jatkuu uusissa elementeissä samasta kohdasta.
            kirjoitusAjo?.Pause();
            kirjoitusJono.Clear();
            kunKirjoitettu = null;
            aloitaNappi = null;
            varoitus = null;

            RakennaPaa(d, uusi, tapahtuma, tervehdys);
            vieritys.Clear();
            var sisalto = vieritys.contentContainer;
            VisualElement tulos = null;
            if (tapahtuma) RakennaTapahtuma(d, sisalto);
            else if (tervehdys) RakennaTervehdys(d, sisalto);
            else tulos = RakennaKysymys(d, sisalto, tulosVaihe);
            RakennaNapit(d, tulosVaihe, tervehdys);
            NaytaViesti(d.Viesti);
            KirjoitusAloita();

            Asettele();
            if (sivuVaihtui) vieritys.scrollOffset = Vector2.zero;
            // Tuomio ja paljastus näkyviin (tulos on vaihtoehtojen alla, usein ruudun ulkopuolella).
            if (tulosVaihtui && tulos != null && !uusi)
                vieritys.schedule.Execute(() => { if (tulos.panel != null) vieritys.ScrollTo(tulos); }).StartingIn(60);
            edellinenTulosVaihe = tulosVaihe;
            edellinenTervehdys = tervehdys;
            if (!Auki)
            {
                Auki = true;
                Rakenne.Nayta(himmennys, true, 320);
            }
        }

        public void PaivitaAika(float jaljellaS)
        {
            if (!Auki || !aikaraja.HasValue) return;
            float jaljella = Mathf.Max(0, jaljellaS);
            int s = Mathf.CeilToInt(jaljella);
            string teksti = s.ToString();
            if (sekunnit.text != teksti) sekunnit.text = teksti;
            bool kiire = s <= 10;
            aika.EnableInClassList("mk-kysymys__aika--kiire", kiire);
            tiimalasi.Kiire = kiire;
            tiimalasi.Edistys = 1f - jaljella / Mathf.Max(1, aikaraja.Value);
            // hg-shake: kiireessä lasi keinuu −1,5° ↔ 1,5° sekunnin jaksolla.
            if (kiire && jaljella > 0)
            {
                float vaihe = Mathf.Repeat(Time.unscaledTime, 1f);
                float k = vaihe < 0.45f ? Mathf.SmoothStep(0, 1, vaihe / 0.45f) : Mathf.SmoothStep(1, 0, (vaihe - 0.45f) / 0.55f);
                tiimalasi.style.rotate = new Rotate(new Angle(-1.5f + 3f * k));
            }
            else tiimalasi.style.rotate = StyleKeyword.Null;
        }

        public void Piilota()
        {
            toiminnot = null;
            aikaraja = null;
            viestiPiiloon?.Pause();
            viesti.RemoveFromClassList("mk-auki");
            viesti.style.display = DisplayStyle.None;
            kirjoitusAjo?.Pause();
            kirjoitusJono.Clear();
            kunKirjoitettu = null;
            if (!Auki) return;
            Auki = false;
            avain = null;
            Rakenne.Nayta(himmennys, false, 250);
            Piilotettu?.Invoke();
        }

        // --- rakennus ---------------------------------------------------------------

        void RakennaPaa(KysymysNaytto d, bool uusi, bool tapahtuma, bool tervehdys)
        {
            paa.style.display = tapahtuma ? DisplayStyle.None : DisplayStyle.Flex;
            // Leima vain pulmissa ja valokuvissa (web: kehys kertoo muuten, kuka kysyy).
            string leimaTeksti = d.Laji switch
            {
                KysymysLaji.Pulma => "PULMA",
                KysymysLaji.Kuva => "VALOKUVA",
                KysymysLaji.Lippu => "LIPPU",
                _ => null,
            };
            leima.text = leimaTeksti ?? "";
            leima.style.display = leimaTeksti == null ? DisplayStyle.None : DisplayStyle.Flex;
            // Kohtaamisen yrityslaskuri otsikkoriville (web: "Kaupunki — kohtaaminen · yritys 1/2").
            string yritys = d.Yritys.HasValue && d.Yrityksia.HasValue ? $" · yritys {d.Yritys}/{d.Yrityksia}" : "";
            kaupunki.text = (d.Otsikko ?? "") + yritys;

            // Tiimalasi vain vastaamattomassa, aikarajallisessa kysymyksessä (pulmassa ei kelloa,
            // tervehdyssivulla aika ei kulu).
            bool kello = d.Sekunnit.HasValue && !d.Vastattu && !tapahtuma && !tervehdys;
            bool alkaa = kello && (uusi || !aikaraja.HasValue);
            aikaraja = kello ? d.Sekunnit : null;
            aika.style.display = kello ? DisplayStyle.Flex : DisplayStyle.None;
            if (!kello) return;
            if (alkaa)
            {
                sekunnit.text = d.Sekunnit.Value.ToString();
                aika.RemoveFromClassList("mk-kysymys__aika--kiire");
                tiimalasi.Kiire = false;
                tiimalasi.Edistys = 0;
                tiimalasi.style.rotate = StyleKeyword.Null;
                // hg-turn: lasi kääntyy ylösalaisesta oikein päin.
                tiimalasi.AddToClassList("mk-kysymys__tiimalasi--ylosalaisin");
                tiimalasi.schedule.Execute(() => tiimalasi.RemoveFromClassList("mk-kysymys__tiimalasi--ylosalaisin")).StartingIn(30);
            }
        }

        VisualElement RakennaKysymys(KysymysNaytto d, VisualElement s, int tulosVaihe)
        {
            // Kohtaamisen kysymyssivu: kuva pieneksi tunnisteeksi (web .quiz.kysymysvaihe).
            if (!string.IsNullOrEmpty(d.MuotokuvaUrl)) Muotokuva(s, d, false);

            // Pulman luonnos ja selite (Kehys = pulman selite).
            bool pulma = d.Laji == KysymysLaji.Pulma;
            if (pulma)
            {
                s.Add(new PulmaLuonnos(d.PulmaId, d.Luonnos));
                if (!string.IsNullOrEmpty(d.Kehys)) Kirjasimet.Aseta(Rakenne.Teksti(d.Kehys, "mk-kysymys__selite", s), Kirjasin.LukuKursiivi);
            }

            // Valokuva tai lippu.
            if (!string.IsNullOrEmpty(d.KuvaUrl) && (d.Laji == KysymysLaji.Kuva || d.Laji == KysymysLaji.Lippu))
                Kuva(s, d.KuvaUrl, d.Laji == KysymysLaji.Lippu, pulma ? null : d.KuvaLahde);

            // Kehys: kuka kysyy (web: "Kaupunki — kehys:"); väittämässä isoisän päiväkirja ja paikka.
            string kehys = pulma ? null : Kehys(d);
            if (!string.IsNullOrEmpty(kehys)) Kirjasimet.Aseta(Rakenne.Teksti(kehys, "mk-kysymys__kehys", s), Kirjasin.LukuKursiivi);

            var kysymys = Rakenne.Teksti(d.Kysymys ?? "", "mk-kysymys__kysymys", s);
            kysymys.enableRichText = false;
            Kirjasimet.Aseta(kysymys, Kirjasin.Kone);

            // Ostettu vihje; kaksintaistelussa rosvon huomautus samalla lapulla (web quiz-hint-text).
            if (!d.Vastattu)
            {
                if (!string.IsNullOrEmpty(d.Vihje)) Lappu(s, d.Vihje);
                if (!string.IsNullOrEmpty(d.Huomautus)) Lappu(s, d.Huomautus);
            }

            Vaihtoehdot(d, s);
            if (pulma && d.VaihtoehtoKuvat != null && !string.IsNullOrEmpty(d.KuvaLahde))
                Kirjasimet.Aseta(Rakenne.Teksti(d.KuvaLahde, "mk-kysymys__kuvalahteet", s), Kirjasin.Kone);

            return tulosVaihe == 0 ? null : tulosVaihe == 1 ? Tuomio(d, s) : Paljastus(d, s);
        }

        /// <summary>
        /// Tervehdyssivu (web SIVU 1): iso kohtaamiskuva ja kuvateksti, tervehdys
        /// kirjoituskoneella ja sen jälkeen varoitus ja Aloita-nappi (napitrivissä).
        /// </summary>
        void RakennaTervehdys(KysymysNaytto d, VisualElement s)
        {
            if (!string.IsNullOrEmpty(d.MuotokuvaUrl)) Muotokuva(s, d, true);
            if (!string.IsNullOrEmpty(d.Tervehdys))
                Kirjoitettava(d.Tervehdys, "mk-kysymys__tervehdys", s, Kirjasin.LukuKursiivi, TervehdysMs);
            if (!string.IsNullOrEmpty(d.Varoitus))
            {
                varoitus = Rakenne.El("mk-kysymys__varoitus", s, PickingMode.Ignore);
                var l = Rakenne.Teksti(d.Varoitus, "mk-kysymys__varoitusteksti", varoitus);
                l.enableRichText = false;
                Kirjasimet.Aseta(l, Kirjasin.LukuKursiivi);
                varoitus.style.display = DisplayStyle.None;
            }
            kunKirjoitettu = () =>
            {
                if (varoitus != null) varoitus.style.display = DisplayStyle.Flex;
                if (aloitaNappi != null) Rakenne.Nayta(aloitaNappi, true, 200);
            };
        }

        /// <summary>
        /// Kohtaamiskuva: iso (tervehdyssivu, object-fit contain, katto ~41 % ruudusta)
        /// kuvatekstin ja lähderivin kanssa, tai pieni 104 pt pyöristetty neliö (kysymyssivu).
        /// </summary>
        void Muotokuva(VisualElement s, KysymysNaytto d, bool iso)
        {
            var kuvio = Rakenne.El(iso ? "mk-kysymys__muotokuva" : "mk-kysymys__muotokuva mk-kysymys__muotokuva--pieni", s, PickingMode.Ignore);
            var kuva = Rakenne.El("mk-kysymys__muotokuvakuva", kuvio, PickingMode.Ignore);
            if (iso)
            {
                var teksti = Rakenne.El("mk-kysymys__muotokuvateksti", kuvio, PickingMode.Ignore);
                if (!string.IsNullOrEmpty(d.MuotokuvaLyhyt))
                {
                    var l = Rakenne.Teksti(d.MuotokuvaLyhyt, "mk-kysymys__muotokuvaselite", teksti);
                    l.enableRichText = false;
                    Kirjasimet.Aseta(l, Kirjasin.LukuKursiivi);
                }
                Kirjasimet.Aseta(Rakenne.Teksti("Matkakirjan kuvitus", "mk-kysymys__muotokuvalahde", teksti), Kirjasin.Kone);
            }
            string odotettu = avain;
            Kuvat.Hae(d.MuotokuvaUrl, t =>
            {
                if (avain != odotettu || kuva.panel == null) return;
                if (t == null) { kuvio.style.display = DisplayStyle.None; return; } // kortti piirtyy kuvattomana
                kuva.style.backgroundImage = new StyleBackground(t);
                if (!iso) return;
                float leveys = kuva.resolvedStyle.width;
                if (float.IsNaN(leveys) || leveys <= 0) leveys = 330;
                float suhde = (float)t.width / Mathf.Max(1, t.height);
                kuva.style.height = Mathf.Clamp(leveys / suhde, 140, 330);
            });
        }

        static string Kehys(KysymysNaytto d)
        {
            string k = d.Kehys;
            if (string.IsNullOrEmpty(k) && d.Laji == KysymysLaji.Vaite)
            {
                // Web openClaim-otsikko: isoisä puhuu, ja paikka on usein muu kuin pelaajan sijainti.
                string paikka = string.IsNullOrEmpty(d.Paikka) ? "" : " · " + d.Paikka;
                return $"Isoisän päiväkirjasta, 1873{paikka} — pitääkö tämä yhä paikkansa?";
            }
            if (string.IsNullOrEmpty(k)) return null;
            if (d.Laji == KysymysLaji.Vaite && !string.IsNullOrEmpty(d.Paikka)) k += " · " + d.Paikka;
            // "… kysyy" → "… kysyy:" (web: `${city.name} — ${quiz.frame}:`).
            return char.IsLetter(k[k.Length - 1]) ? k + ":" : k;
        }

        void Lappu(VisualElement s, string teksti)
        {
            var lappu = Rakenne.El("mk-kysymys__vihje", s, PickingMode.Ignore);
            var kyna = new SvgIkoni(Ikonit.Kyna);
            kyna.AddToClassList("mk-kysymys__vihjemerkki");
            lappu.Add(kyna);
            var l = Rakenne.Teksti(teksti, "mk-kysymys__vihjeteksti", lappu);
            l.enableRichText = false;
            Kirjasimet.Aseta(l, Kirjasin.LukuKursiivi);
        }

        void Kuva(VisualElement s, string url, bool lippu, string lahde)
        {
            var kehys = Rakenne.El("mk-kysymys__kuvakehys", s, PickingMode.Ignore);
            if (lippu) kehys.AddToClassList("mk-kysymys__kuvakehys--lippu");
            var kuva = Rakenne.El("mk-kysymys__kuva", kehys, PickingMode.Ignore);
            Label lahdeRivi = null;
            if (!string.IsNullOrEmpty(lahde))
            {
                lahdeRivi = Rakenne.Teksti(lahde, "mk-kysymys__kuvalahde", s);
                Kirjasimet.Aseta(lahdeRivi, Kirjasin.Kone);
            }
            string odotettu = avain;
            Kuvat.Hae(url, t =>
            {
                if (avain != odotettu || kuva.panel == null) return;
                if (t == null)
                {
                    // Kuva ei latautunut: kysymykseen voi silti vastata (web: tilalle jää teksti).
                    kehys.style.display = DisplayStyle.None;
                    if (lahdeRivi != null) lahdeRivi.style.display = DisplayStyle.None;
                    return;
                }
                kuva.style.backgroundImage = new StyleBackground(t);
                // object-fit: cover, max-height 220 px (lippu: contain, pienempi kehys).
                float leveys = kuva.resolvedStyle.width;
                if (float.IsNaN(leveys) || leveys <= 0) leveys = 320;
                float suhde = (float)t.width / Mathf.Max(1, t.height);
                kuva.style.height = lippu
                    ? Mathf.Clamp((leveys - 16) / suhde + 16, 70, 170)
                    : Mathf.Clamp(leveys / suhde, 120, 220);
            });
        }

        void Vaihtoehdot(KysymysNaytto d, VisualElement s)
        {
            int n = d.Vaihtoehdot?.Count ?? 0;
            if (n == 0) return;
            bool liuku = !vaihtoehdotEsilla && !d.Vastattu;
            vaihtoehdotEsilla = true;
            var lista = Rakenne.El("mk-kysymys__vaihtoehdot", s, PickingMode.Ignore);
            if (n > 4) lista.AddToClassList("mk-kysymys__vaihtoehdot--tiivis"); // kaksintaistelun 8 vaihtoehtoa
            for (int i = 0; i < n; i++)
            {
                int indeksi = i;
                bool pois = d.Piilotetut != null && d.Piilotetut.Contains(i);
                bool oikea = d.Vastattu && i == d.Oikea;
                bool vaara = d.Vastattu && i == d.Valittu && !d.Oikein;
                var b = Rakenne.Nappi(null, "mk-kysymys__vaihtoehto", () => Vastaa(indeksi), lista);
                b.AddToClassList(i % 2 == 0 ? "mk-kysymys__vaihtoehto--pariton" : "mk-kysymys__vaihtoehto--parillinen");
                if (oikea) b.AddToClassList("mk-kysymys__vaihtoehto--oikea");
                if (vaara) b.AddToClassList("mk-kysymys__vaihtoehto--vaara");
                if (pois) b.AddToClassList("mk-kysymys__vaihtoehto--pois");
                b.SetEnabled(!pois && !d.Vastattu);

                VisualElement rivi = b;
                string kuvaUrl = d.VaihtoehtoKuvat != null && i < d.VaihtoehtoKuvat.Count ? d.VaihtoehtoKuvat[i] : null;
                if (!string.IsNullOrEmpty(kuvaUrl))
                {
                    b.AddToClassList("mk-kysymys__vaihtoehto--kuvallinen");
                    var kuva = Rakenne.El("mk-kysymys__vaihtoehtokuva", b, PickingMode.Ignore);
                    Kuvat.Hae(kuvaUrl, t =>
                    {
                        if (kuva.panel == null) return;
                        if (t == null) kuva.style.display = DisplayStyle.None; // nimi jää, pulmaan voi vastata
                        else kuva.style.backgroundImage = new StyleBackground(t);
                    });
                    rivi = Rakenne.El("mk-kysymys__vaihtoehtorivi", b, PickingMode.Ignore);
                }
                var kirjain = Rakenne.Teksti(Kirjaimet[Mathf.Min(i, Kirjaimet.Length - 1)].ToString(), "mk-kysymys__kirjain", rivi);
                Kirjasimet.Aseta(kirjain, Kirjasin.KoneLihava);
                string teksti = d.Vaihtoehdot[i] ?? "";
                // Väärä valinta ja 50:50:n poistama yliviivataan (text-decoration: line-through).
                var l = Rakenne.Teksti(vaara || pois ? "<s>" + teksti.Replace("<", "‹") + "</s>" : teksti, "mk-kysymys__vaihtoehtoteksti", rivi);
                l.enableRichText = vaara || pois;
                Kirjasimet.Aseta(l, Kirjasin.Kone);

                // option-in: vaihtoehdot liukuvat esiin porrastetusti, kun ne tulevat ensi kerran näkyviin.
                if (liuku)
                {
                    b.AddToClassList("mk-kysymys__vaihtoehto--tulossa");
                    b.schedule.Execute(() => b.RemoveFromClassList("mk-kysymys__vaihtoehto--tulossa")).StartingIn(40 + i * 70);
                }
            }
        }

        /// <summary>Tulosvaihe 1 (web: tuomio 0,9 s): vain "Oikein!" / "Väärin." / "Aika loppui!".</summary>
        VisualElement Tuomio(KysymysNaytto d, VisualElement s)
        {
            var laatikko = TulosLaatikko(d, s);
            string tuomio = d.AikaLoppui ? "Aika loppui!" : d.Oikein ? "Oikein!" : "Väärin.";
            Kirjasimet.Aseta(Rakenne.Teksti(tuomio, "mk-kysymys__tuomio", laatikko), Kirjasin.KoneLihava);
            // Kätkön sulkeutuminen näkyy jo tuomiossa (web lukkoRivi).
            foreach (var rivi in Rivit(d.Loyto))
                if (rivi.StartsWith("Kätkö sulkeutui")) Ohje(laatikko, rivi);
            return laatikko;
        }

        /// <summary>
        /// Tulosvaihe 2 (web paljastus): löydön kuva vasemmalla, oikealla löytö tai
        /// oikea vastaus, ohjeet, "Vuoro vaihtuu", repliikki ja fakta (kirjoituskone), lähteet.
        /// </summary>
        VisualElement Paljastus(KysymysNaytto d, VisualElement s)
        {
            var laatikko = TulosLaatikko(d, s);
            laatikko.AddToClassList("mk-kysymys__tulos--paljastus");
            // Löydön oma kuva (manner-/maakohtainen aarre) ensin, laattatyypin kuva tai piirros varana.
            if (d.Oikein && (LaattaIkoni.Tunnettu(d.LoytoTyyppi) || !string.IsNullOrEmpty(d.LoytoKuvaUrl)))
                laatikko.Add(new LaattaIkoni(d.LoytoTyyppi, d.LoytoKuvaUrl));
            var runko = Rakenne.El("mk-kysymys__tulosrunko", laatikko, PickingMode.Ignore);

            // Kaksintaistelun Loyto kertoo jo oikean vastauksen ("Rosvo vei rahat — oikea vastaus oli …").
            bool oikeaErikseen = !d.Oikein && d.Laji != KysymysLaji.Kaksintaistelu
                && d.Oikea >= 0 && d.Vaihtoehdot != null && d.Oikea < d.Vaihtoehdot.Count;
            var rivit = Rivit(d.Loyto);
            if (oikeaErikseen) Vahva(runko, (d.AikaLoppui ? "Aika loppui. " : "") + $"Oikea vastaus oli \"{d.Vaihtoehdot[d.Oikea]}\".");
            else if (d.Oikein && rivit.Count == 0) Vahva(runko, string.IsNullOrEmpty(d.LoytoNimi) ? "Oikein!" : "Löysit: " + d.LoytoNimi);
            foreach (var rivi in rivit)
            {
                // Uuden yrityksen ohje ja kätkön sulkeutuminen punaruskealla (web .quiz-uusi-yritys, .quiz-lukko).
                if (rivi == KysymysApu.UusiYritysOhje || rivi.StartsWith("Kätkö sulkeutui")) Ohje(runko, rivi);
                else Vahva(runko, rivi);
            }
            // Löydön oma fakta (web: aarteen fakta, esim. Ivalojoen kultaryntäys) löytörivin alle.
            if (d.Oikein && !string.IsNullOrEmpty(d.LoytoFakta))
            {
                var lf = Rakenne.Teksti(d.LoytoFakta, "mk-kysymys__loytofakta", runko);
                lf.enableRichText = false;
                Kirjasimet.Aseta(lf, Kirjasin.LukuKursiivi);
            }
            if (d.VuoroVaihtuu) Kirjasimet.Aseta(Rakenne.Teksti(KysymysApu.VuoroVaihtuuRivi, "mk-kysymys__fakta", runko), Kirjasin.Luku);
            // Kätkökuva kaaren aarretekstin yläpuolelle (web .katko-kuva: keskellä, ≤ 170 pt).
            if (!string.IsNullOrEmpty(d.KatkoKuvaUrl)) Katko(runko, d.KatkoKuvaUrl);
            foreach (var rivi in Rivit(d.Repliikki))
                Kirjoitettava(rivi, "mk-kysymys__repliikki", runko, Kirjasin.LukuKursiivi, RepliikkiMs);
            if (!string.IsNullOrEmpty(d.Fakta))
                Kirjoitettava(d.Fakta, "mk-kysymys__fakta", runko, Kirjasin.Luku, RepliikkiMs);
            Lahteet(runko, d.Lahteet);
            return laatikko;
        }

        void Katko(VisualElement isa, string url)
        {
            var katko = Rakenne.El("mk-kysymys__katko", isa, PickingMode.Ignore);
            string odotettu = avain;
            Kuvat.Hae(url, t =>
            {
                if (avain != odotettu || katko.panel == null) return;
                if (t == null) { katko.style.display = DisplayStyle.None; return; } // web: onerror → kuva pois
                katko.style.backgroundImage = new StyleBackground(t);
                float leveys = katko.resolvedStyle.width;
                if (float.IsNaN(leveys) || leveys <= 0) leveys = 170;
                katko.style.height = Mathf.Clamp(leveys * t.height / Mathf.Max(1f, t.width), 60, 220);
            });
        }

        static VisualElement TulosLaatikko(KysymysNaytto d, VisualElement s)
        {
            var laatikko = Rakenne.El("mk-kysymys__tulos", s, PickingMode.Ignore);
            laatikko.AddToClassList(d.Oikein ? "mk-kysymys__tulos--oikein" : "mk-kysymys__tulos--vaarin");
            return laatikko;
        }

        static List<string> Rivit(string teksti)
        {
            var l = new List<string>();
            if (string.IsNullOrEmpty(teksti)) return l;
            foreach (var r in teksti.Split('\n')) if (r.Trim().Length > 0) l.Add(r.Trim());
            return l;
        }

        static void Ohje(VisualElement isa, string teksti)
        {
            var l = Rakenne.Teksti(teksti, "mk-kysymys__ohje", isa);
            l.enableRichText = false;
            Kirjasimet.Aseta(l, Kirjasin.LukuKursiivi);
        }

        static void Vahva(VisualElement isa, string teksti)
        {
            var l = Rakenne.Teksti(teksti, "mk-kysymys__vahva", isa);
            l.enableRichText = false;
            Kirjasimet.Aseta(l, Kirjasin.LukuLihava);
        }

        /// <summary>Web sourceLine: "LÄHDE:" ja lähteet pisteellä eroteltuina; verkko-osoitteesta palvelimen nimi linkkinä.</summary>
        static void Lahteet(VisualElement isa, List<string> lahteet)
        {
            if (lahteet == null) return;
            var rivi = Rakenne.El("mk-kysymys__lahde", null, PickingMode.Ignore);
            int n = 0;
            foreach (var raaka in lahteet)
            {
                var lahde = raaka?.Trim();
                if (string.IsNullOrEmpty(lahde)) continue;
                if (n++ == 0) Kirjasimet.Aseta(Rakenne.Teksti("LÄHDE:", "mk-kysymys__lahdeotsikko", rivi), Kirjasin.Kone);
                else Rakenne.Teksti(" · ", "mk-kysymys__lahdeteksti", rivi);
                bool url = (lahde.StartsWith("https://") || lahde.StartsWith("http://")) && lahde.IndexOf(' ') < 0;
                string nimi = lahde;
                if (url && Uri.TryCreate(lahde, UriKind.Absolute, out var u))
                    nimi = u.Host.StartsWith("www.") ? u.Host.Substring(4) : u.Host;
                var l = Rakenne.Teksti(nimi, "mk-kysymys__lahdeteksti", rivi);
                l.enableRichText = false;
                Kirjasimet.Aseta(l, Kirjasin.Luku);
                if (url)
                {
                    l.AddToClassList("mk-kysymys__lahdelinkki");
                    l.pickingMode = PickingMode.Position;
                    string osoite = lahde;
                    l.RegisterCallback<ClickEvent>(_ => Application.OpenURL(osoite));
                }
            }
            if (n > 0) isa.Add(rivi);
        }

        void RakennaTapahtuma(KysymysNaytto d, VisualElement s)
        {
            Kirjasimet.Aseta(Rakenne.Teksti("Matkalla sattui", "mk-kortti__otsikko", s), Kirjasin.LukuLihava);
            if (!string.IsNullOrEmpty(d.Otsikko))
                Kirjasimet.Aseta(Rakenne.Teksti(d.Otsikko, "mk-kysymys__tapahtumapaikka", s), Kirjasin.Kone);
            var teksti = Rakenne.Teksti(d.Kysymys ?? "", "mk-kysymys__tapahtumateksti", s);
            teksti.enableRichText = false;
            Kirjasimet.Aseta(teksti, Kirjasin.Luku);
            if (!string.IsNullOrEmpty(d.Loyto))
                Kirjasimet.Aseta(Rakenne.Teksti(d.Loyto, "mk-kysymys__vaikutus", s), Kirjasin.Kone);
        }

        void RakennaNapit(KysymysNaytto d, int tulosVaihe, bool tervehdys)
        {
            napit.Clear();
            napit.EnableInClassList("mk-kysymys__napit--keski", tervehdys);
            bool tapahtuma = d.Laji == KysymysLaji.Tapahtumakortti;
            if (tervehdys)
            {
                // "Aloita peli" / "Yritä viimeistä kertaa": näkyviin, kun tervehdys on kirjoitettu.
                aloitaNappi = Rakenne.Nappi(string.IsNullOrEmpty(d.AloitaTeksti) ? "Aloita peli" : d.AloitaTeksti,
                    "mk-nappi--kulta mk-kysymys__jatka mk-kysymys__aloita", () => Teko(toiminnot?.Aloita), napit);
                Rakenne.Tausta(aloitaNappi, Kuviot.Pysty("dialogi-kulta", Kuviot.Vari("#e9c169"), Kuviot.Vari("#d3a03c")));
                Kirjasimet.Aseta(aloitaNappi, Kirjasin.KoneLihava);
                aloitaNappi.style.display = DisplayStyle.None;
            }
            else if (!d.Vastattu && !tapahtuma)
            {
                // Vihje: tarjolla → hinta; ostettu → harmaa "Vihje ostettu" (web quizHint).
                if (d.VihjeTarjolla)
                {
                    var v = Rakenne.Nappi($"Vihje ({d.VihjeHinta} {d.Valuutta})", "mk-kysymys__apu mk-kysymys__vihjenappi", () => Teko(toiminnot?.Vihje), napit);
                    v.SetEnabled(d.Raha >= d.VihjeHinta);
                }
                else if (!string.IsNullOrEmpty(d.Vihje))
                    Rakenne.Nappi("Vihje ostettu", "mk-kysymys__apu mk-kysymys__vihjenappi", null, napit).SetEnabled(false);

                // 50:50 tai kaksintaistelun helpotus (kallo); käytetty → harmaa.
                if (d.PuolitusTarjolla)
                {
                    string teksti = d.PuolitusTeksti ?? $"50:50 ({d.PuolitusHinta} {d.Valuutta})";
                    bool kallo = d.Laji == KysymysLaji.Kaksintaistelu && !teksti.Contains("käytetty");
                    var p = Rakenne.Nappi(teksti, "mk-kysymys__apu", () => Teko(toiminnot?.Puolita), napit, kallo ? Ikonit.Viiva["kallo"] : null);
                    p.SetEnabled(!d.PuolitusHarmaa && d.Raha >= d.PuolitusHinta);
                }
                else if (d.Laji != KysymysLaji.Kaksintaistelu && d.Piilotetut != null && d.Piilotetut.Count > 0)
                    Rakenne.Nappi("50:50 käytetty", "mk-kysymys__apu", null, napit).SetEnabled(false);
            }
            if (d.Vastattu && tulosVaihe >= 2)
            {
                var j = Rakenne.Nappi(string.IsNullOrEmpty(d.JatkaTeksti) ? "Jatka" : d.JatkaTeksti, "mk-nappi--kulta mk-kysymys__jatka",
                    () => Teko(toiminnot?.Jatka), napit);
                Rakenne.Tausta(j, Kuviot.Pysty("dialogi-kulta", Kuviot.Vari("#e9c169"), Kuviot.Vari("#d3a03c")));
                Kirjasimet.Aseta(j, Kirjasin.KoneLihava);
            }
            napit.style.display = napit.childCount > 0 ? DisplayStyle.Flex : DisplayStyle.None;
        }

        // --- teot -------------------------------------------------------------------

        void Vastaa(int i)
        {
            if (!Auki || odottaa || nakyva == null || nakyva.Vastattu) return;
            var v = toiminnot?.Vastaa;
            if (v == null) return;
            odottaa = true; // tuplanapautus ennen ohjaimen seuraavaa Nayta-kutsua ei vastaa kahdesti
            v(i);
            if (Auki) himmennys.schedule.Execute(() => odottaa = false).StartingIn(400);
        }

        void Teko(Action a)
        {
            if (!Auki || odottaa || a == null) return;
            odottaa = true;
            a();
            // Jos ohjain ei päivittänyt näkymää (esim. teko hylättiin hiljaa), napit vapautuvat.
            if (Auki) himmennys.schedule.Execute(() => odottaa = false).StartingIn(400);
        }

        void NaytaViesti(string teksti)
        {
            if (string.IsNullOrEmpty(teksti)) return; // edellinen viesti häipyy omalla ajastimellaan
            viesti.text = teksti;
            viestiPiiloon?.Pause();
            Rakenne.Nayta(viesti, true, 250);
            viestiPiiloon = viesti.schedule.Execute(() => Rakenne.Nayta(viesti, false, 250)).StartingIn((long)(ViestiKestoS * 1000));
        }

        // --- kirjoituskone ------------------------------------------------------------

        /// <summary>Label, jonka teksti kirjoittuu sana kerrallaan (jatkaa kohdasta, johon edellinen rakennus jäi).</summary>
        Label Kirjoitettava(string teksti, string luokka, VisualElement isa, Kirjasin kirjasin, int ms)
        {
            var l = Rakenne.Teksti("", luokka, isa);
            Kirjasimet.Aseta(l, kirjasin);
            var sanat = teksti.Split(' ');
            kirjoitusJono.Add((l, teksti, sanat, ms));
            Kirjoita(l, teksti, sanat, kirjoitettu.TryGetValue(teksti, out var n) ? n : 0);
            return l;
        }

        /// <summary>Näkyvät sanat ja loput läpinäkyvinä, jotta rivitys ei hypi (web .pending { visibility: hidden }).</summary>
        static void Kirjoita(Label l, string teksti, string[] sanat, int n)
        {
            if (n >= sanat.Length) { l.enableRichText = false; l.text = teksti; return; }
            string nakyva = string.Join(" ", sanat, 0, n);
            string loput = (n > 0 ? " " : "") + string.Join(" ", sanat, n, sanat.Length - n);
            l.enableRichText = true;
            l.text = "<noparse>" + nakyva + "</noparse><alpha=#00><noparse>" + loput + "</noparse>";
        }

        void KirjoitusAloita()
        {
            if (Seuraava() < 0) { var v = kunKirjoitettu; kunKirjoitettu = null; v?.Invoke(); return; }
            kirjoitusAjo = himmennys.schedule.Execute(KirjoitusAskel).StartingIn(kirjoitusJono[Seuraava()].Ms);
        }

        int Seuraava()
        {
            for (int i = 0; i < kirjoitusJono.Count; i++)
            {
                var k = kirjoitusJono[i];
                if ((kirjoitettu.TryGetValue(k.Teksti, out var n) ? n : 0) < k.Sanat.Length) return i;
            }
            return -1;
        }

        void KirjoitusAskel()
        {
            int i = Seuraava();
            if (i < 0 || !Auki) return;
            var k = kirjoitusJono[i];
            int n = (kirjoitettu.TryGetValue(k.Teksti, out var m) ? m : 0) + 1;
            kirjoitettu[k.Teksti] = n;
            Kirjoita(k.Label, k.Teksti, k.Sanat, n);
            KirjoitusAloita();
        }

        /// <summary>Napautus: kaikki kesken olevat tekstit kerralla (ja tervehdyksen jälkeinen Aloita-nappi).</summary>
        void KirjoitusValmiiksi()
        {
            if (kirjoitusJono.Count == 0 || Seuraava() < 0) return;
            kirjoitusAjo?.Pause();
            foreach (var k in kirjoitusJono)
            {
                kirjoitettu[k.Teksti] = k.Sanat.Length;
                Kirjoita(k.Label, k.Teksti, k.Sanat, k.Sanat.Length);
            }
            var v = kunKirjoitettu;
            kunKirjoitettu = null;
            v?.Invoke();
        }

        // --- tiimalasi --------------------------------------------------------------

        /// <summary>
        /// Webin tiimalasi (index.html #hourglass, viewBox 44 × 68; visa.js setSand):
        /// puukehys, lasi, valuva hiekka ylhäällä suppilona ja alhaalla kekona,
        /// ohut virta kaulassa ja kiilto. Kiire (≤ 10 s) värjää hiekan punaiseksi.
        /// </summary>
        public sealed class Tiimalasi : VisualElement
        {
            static readonly Color Puu = Kuviot.Vari("#8a6534");
            static readonly Color Muste = Kuviot.Vari("#46331f");
            static readonly Color Hiekka = Kuviot.Vari("#c08a3e", 0.92f);
            static readonly Color Virta = Kuviot.Vari("#b07f38", 0.75f);
            static readonly Color Punainen = Kuviot.Vari("#a83c2c", 0.92f);
            float edistys;
            bool kiire;

            public Tiimalasi()
            {
                AddToClassList("mk-kysymys__tiimalasi");
                pickingMode = PickingMode.Ignore;
                generateVisualContent += Piirra;
            }

            /// <summary>0 = täysi yläkupu, 1 = kaikki valunut.</summary>
            public float Edistys
            {
                get => edistys;
                set { value = Mathf.Clamp01(value); if (Mathf.Abs(value - edistys) < 0.002f) return; edistys = value; MarkDirtyRepaint(); }
            }

            public bool Kiire
            {
                get => kiire;
                set { if (kiire == value) return; kiire = value; MarkDirtyRepaint(); }
            }

            void Piirra(MeshGenerationContext mgc)
            {
                var r = contentRect;
                float s = Mathf.Min(r.width / 44f, r.height / 68f);
                if (float.IsNaN(s) || s <= 0) return;
                var o = new Vector2(r.x + (r.width - 44 * s) * 0.5f, r.y + (r.height - 68 * s) * 0.5f);
                Vector2 P(float x, float y) => o + new Vector2(x, y) * s;
                var p = mgc.painter2D;
                p.lineJoin = LineJoin.Round;
                p.lineCap = LineCap.Round;

                // Puukehys: kansi, pohja ja kaksi pylvästä.
                p.fillColor = Puu;
                p.strokeColor = Muste;
                p.lineWidth = 1.1f * s;
                foreach (var (x, y, w, h, rr) in new[] { (3f, 1.4f, 38f, 5.2f, 1.8f), (3f, 61.4f, 38f, 5.2f, 1.8f), (5.4f, 6f, 2.6f, 56f, 1.2f), (36f, 6f, 2.6f, 56f, 1.2f) })
                {
                    Pyorea(p, P(x, y), w * s, h * s, rr * s);
                    p.Fill();
                    p.Stroke();
                }

                // Lasi.
                p.BeginPath();
                p.MoveTo(P(8, 7)); p.LineTo(P(36, 7)); p.LineTo(P(22.6f, 33.6f)); p.LineTo(P(22.6f, 34.4f));
                p.LineTo(P(36, 61)); p.LineTo(P(8, 61)); p.LineTo(P(21.4f, 34.4f)); p.LineTo(P(21.4f, 33.6f));
                p.ClosePath();
                p.fillColor = new Color(1, 1, 1, 0.16f);
                p.Fill();
                p.lineWidth = 1.2f * s;
                p.Stroke();

                // Hiekka (visa.js setSand).
                float t = edistys;
                const float Cx = 22;
                var hiekka = kiire ? Punainen : Hiekka;
                if (t < 0.999f)
                {
                    float pinta = 8.4f + t * 25.2f;
                    float puoli = Mathf.Max(0, 12.8f - (pinta - 8.4f) * 0.4901f);
                    float kuoppa = 1.5f * (1 - t) + 0.25f;
                    p.BeginPath();
                    p.MoveTo(P(Cx - puoli, pinta));
                    p.QuadraticCurveTo(P(Cx, pinta + kuoppa * 2), P(Cx + puoli, pinta));
                    p.LineTo(P(22.45f, 33.6f)); p.LineTo(P(21.55f, 33.6f));
                    p.ClosePath();
                    p.fillColor = hiekka;
                    p.Fill();
                }
                float taso = 60.2f - t * 25.8f;
                if (t > 0.004f && t < 0.999f)
                {
                    p.BeginPath();
                    p.MoveTo(P(21.55f, 33.6f)); p.LineTo(P(22.45f, 33.6f)); p.LineTo(P(22.45f, taso)); p.LineTo(P(21.55f, taso));
                    p.ClosePath();
                    p.fillColor = kiire ? new Color(Punainen.r, Punainen.g, Punainen.b, 0.75f) : Virta;
                    p.Fill();
                }
                if (t > 0.001f)
                {
                    float alaPuoli = Mathf.Min(12.8f, 0.45f + (taso - 34.4f) * 0.4787f);
                    float korkeus = 60.2f - taso;
                    float keko = Mathf.Min(2.6f, Mathf.Min(korkeus * 0.5f, (taso - 34.4f) * 0.4f));
                    p.BeginPath();
                    p.MoveTo(P(9.2f, 60.2f)); p.LineTo(P(34.8f, 60.2f)); p.LineTo(P(Cx + alaPuoli, taso));
                    p.QuadraticCurveTo(P(Cx, taso - keko * 2), P(Cx - alaPuoli, taso));
                    p.ClosePath();
                    p.fillColor = hiekka;
                    p.Fill();
                }

                // Kiilto.
                p.BeginPath();
                p.MoveTo(P(12.5f, 9.4f)); p.LineTo(P(18.5f, 9.4f)); p.LineTo(P(22, 30));
                p.strokeColor = new Color(1, 1, 1, 0.5f);
                p.lineWidth = 1.4f * s;
                p.Stroke();
            }

            static void Pyorea(Painter2D p, Vector2 a, float w, float h, float r)
            {
                r = Mathf.Min(r, Mathf.Min(w, h) * 0.5f);
                p.BeginPath();
                p.MoveTo(new Vector2(a.x + r, a.y));
                p.LineTo(new Vector2(a.x + w - r, a.y));
                p.ArcTo(new Vector2(a.x + w, a.y), new Vector2(a.x + w, a.y + r), r);
                p.LineTo(new Vector2(a.x + w, a.y + h - r));
                p.ArcTo(new Vector2(a.x + w, a.y + h), new Vector2(a.x + w - r, a.y + h), r);
                p.LineTo(new Vector2(a.x + r, a.y + h));
                p.ArcTo(new Vector2(a.x, a.y + h), new Vector2(a.x, a.y + h - r), r);
                p.LineTo(new Vector2(a.x, a.y + r));
                p.ArcTo(new Vector2(a.x, a.y), new Vector2(a.x + r, a.y), r);
                p.ClosePath();
            }
        }
    }
}
