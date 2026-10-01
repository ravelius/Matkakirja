// PULUN TAULU (Linssiseppä 29.9.2026; web js/linssit/pulu-taulu.js ja css/satelliitti.css .astro-paneeli, PR #3590;
// omistaja 28.9.: moodien välillä "aina esille napauttamalla pulua"; logiikka Linssit/Ydin/Astronautti/PulunTaulu.cs).
//
//   Minne katsotaan?                        ✕     otsikko 13 pt himmeä, ✕ 44 pt:n osuma-ala ja 28 pt:n harmaa ympyrä
//   Maapallo              Koko Maa avaruudesta     rivi ≥ 44 pt: otsikko 15 pt lihava, selite 12 pt himmeä
//   ISS:n rinnalla        Asema radallaan          ISS-rivit vain, kun kyyti on; nykyinen moodi vihreänä
//   ISS:n sisälle         Cupolan ikkunasta alas
//   Astronauttien kuvat   Valokuvat avaruudesta
//   ─────────────────────────────────────
//   Kysy Pululta                                   linkki 44 pt: vie kuvamoodiin ja avaa minipulun kysymyskortin
//
// Leveys min(232, ruutu − 32) pt, tumma lasi rgba(6,13,10,0.8), vihreä reuna 0,28, kulmat 12 pt, ei varjoa.
// AVAAJAT: Pulun napautus linssissä (UiNakymat, Pulu.NapautusEstetty), valokuvan minipulu (Kuvanakyma) ja "Näkymät"-nappi
// Pulun paikalla, kun Pulu ei ole näkyvissä. Napautuksella avattaessa puhuva Pulu vaikenee ja tervetulo ohittuu; automaattinen
// avaus ei koskaan vaienna. AVAUS KERRAN ITSESTÄÄN linssin paljastuksen jälkeen (600 ms hengähdys, katto 90 s, ei jos pelaaja
// jo valitsi), myös Pulun tervetulon aikana: tervetulo puhuu taulun aikana ilman kuplaa (omistaja 29.9.2026, web
// pulu-taulu.js). Vain muu Pulun puhe siirtää avausta.
// SULKEVAT: ✕, rivin valinta, Kysy Pululta, uusi napautus avaajaan, napautus muualle (ei niele: ISS:n napautus vie silti
// kyytiin), linssin sulku. PAIKKA (PulunTaulu.Sijoita): Pulun yllä tai vasemmalla, ei koskaan Pulun eikä ISS-merkin
// päällä; auki ollessa mitataan 400 ms:n välein. AVAUS JA SULKU (Raamattu PR #3602, omistaja 29.9.2026): taulu kasvaa ja
// häivyttyy esiin avaajan (Pulu, minipulu, Näkymät) suunnasta ja sulkeutuu samaa reittiä (Ponnahdus, webin arvot 220/200 ms);
// pieni liike pois: suoraan.
// LAAJENNUS: LisaaRivi lisää rivin ISS-rivien jälkeen (Linssiseppä 2:n avaruuskävely, Päätoimittaja 29.9.2026).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Astronautti;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class PulunTauluNakyma
    {
        readonly UiKerros kerros;
        readonly AstronautinNakyma astro;
        readonly VisualElement juuri, paneeli, rivit;
        readonly Button nakymat;
        readonly List<string> loki = new List<string>();
        bool linssiAuki, pulunPaikalla = true;
        string paikka;
        float ala;
        IVisualElementScheduledItem seuranta, paikkaKierros, automaattiAjo;
        /// <summary>Avaajan keskipiste paneelin koordinaateissa: taulu kasvaa siitä ja sulkeutuu sinne.</summary>
        Vector2? avaajanPiste;

        /// <summary>Pulun ISS-tervetulo (web #3575): linssin ensimmäisellä kuultavalla avauksella ennen taulun automaattiavausta.</summary>
        public readonly PulunTervetuloNakyma Tervetulo;

        enum Automaatti { Odottaa, Avattu, Ohitettu, Valittu, Katto }
        Automaatti automaatti = Automaatti.Ohitettu;
        float linssiAlkoi;

        sealed class Vaihto
        {
            public AstroMoodi Tavoite;
            public int Toimia;
            public float Alku;
            public Action Perilla;
            public IVisualElementScheduledItem Ajo;
        }
        Vaihto vaihto;

        public bool Auki { get; private set; }
        /// <summary>Tapahtumaloki testikomennolle (web loki: avaa:syy, sulje:syy, valitse, toimi, moodi:tulos).</summary>
        public IReadOnlyList<string> Loki => loki;
        public string Paikka => paikka;

        public PulunTauluNakyma(UiKerros kerros, AstronautinNakyma astro)
        {
            this.kerros = kerros;
            this.astro = astro;
            juuri = kerros.Juuri(LinssiUi.Ylakerros);

            nakymat = Rakenne.Nappi(PulunTaulu.NakymatTeksti, "mk-astroNakymat", () => Vaihda("nakymat"), juuri);
            nakymat.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(nakymat, Kirjasin.Luku);

            paneeli = Rakenne.El("mk-astroTaulu", juuri);
            paneeli.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(paneeli, Kirjasin.Luku);
            // Kosketukset taulussa eivät valu kuvaan eivätkä palloon.
            paneeli.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            // Kasvun keskipiste pysyy avaajassa, vaikka taulun paikka tai korkeus asettuu vasta avauksen jälkeen.
            paneeli.RegisterCallback<GeometryChangedEvent>(_ => OrigoAvaajaan());
            var ylarivi = Rakenne.El("mk-astroTaulu__ylarivi", paneeli, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(PulunTaulu.Otsikko, "mk-astroTaulu__otsikko", ylarivi), Kirjasin.LukuLihava);
            var sulku = Rakenne.Nappi(null, "mk-astroTaulu__sulku", () => Sulje("sulku"), ylarivi);
            sulku.tooltip = "Sulje taulu";
            var ympyra = Rakenne.El("mk-astroTaulu__sulkuYmpyra", sulku, PickingMode.Ignore);
            Rakenne.Teksti("×", "mk-astroTaulu__sulkuMerkki", ympyra);
            rivit = Rakenne.El("mk-astroTaulu__rivit", paneeli, PickingMode.Ignore);
            // Sulkeutuva taulu (200 ms) ei enää toimi: linkki ja rivit vain auki ollessa.
            var linkki = Rakenne.Nappi(null, "mk-astroTaulu__linkki", () => { if (Auki) KysyPululta(); }, paneeli);
            var linkkiTeksti = Rakenne.Teksti("<u>" + PulunTaulu.KysyTeksti + "</u>", "mk-astroTaulu__linkkiTeksti", linkki);
            linkkiTeksti.enableRichText = true;

            astro.Kuva.MinipuluNapautettu += () => Vaihda("minipulu");
            Tervetulo = new PulunTervetuloNakyma(kerros);
        }

        readonly HashSet<VisualElement> kuunnellut = new HashSet<VisualElement>();

        /// <summary>Napautus muualle sulkee taulun: kaikkien UI-kerrosten juuret (TrickleDown, ei niele) ja pallo.</summary>
        void KytkeJuuret()
        {
            foreach (var (_, j) in kerros.Juuret)
                if (j != null && kuunnellut.Add(j)) j.RegisterCallback<PointerDownEvent>(UlkoNapautus, TrickleDown.TrickleDown);
            KytkePallo();
        }

        static AstronauttiLinssi Linssi() => UnityEngine.Object.FindAnyObjectByType<AstronauttiKerros>()?.Linssi;

        // --- linssin elinkaari -------------------------------------------------------

        AstronauttiKerros kytketty;

        /// <summary>AstronautinNakyma.Vaihtui: taulu elää astronautin linssin ajan.</summary>
        public void LinssiVaihtui(bool auki)
        {
            linssiAuki = auki;
            if (!auki)
            {
                Tervetulo.Pura();
                Sulje("linssi");
                PeruVaihto();
                automaattiAjo?.Pause();
                paikkaKierros?.Pause();
                nakymat.style.display = DisplayStyle.None;
                if (kytketty != null) { kytketty.PalloNapautettu -= PalloNapautettu; kytketty = null; }
                return;
            }
            linssiAlkoi = Time.unscaledTime;
            // Tervetulo (kerran per laite) ja taulu itsestään heti paljastuksen jälkeen (omistaja 29.9.2026).
            Tervetulo.Aloita();
            automaatti = Automaatti.Odottaa;
            automaattiAjo?.Pause();
            automaattiAjo = paneeli.schedule.Execute(AutomaattiKierros).StartingIn(0);
            pulunPaikalla = true;
            paikkaKierros?.Pause();
            paikkaKierros = paneeli.schedule.Execute(PaikkaKierros).Every((long)PulunTaulu.PulunPaikkaMs);
            PaikkaKierros();
        }

        void KytkePallo()
        {
            var k = UnityEngine.Object.FindAnyObjectByType<AstronauttiKerros>();
            if (k == kytketty) return;
            if (kytketty != null) kytketty.PalloNapautettu -= PalloNapautettu;
            kytketty = k;
            if (k != null) k.PalloNapautettu += PalloNapautettu;
        }

        void PalloNapautettu()
        {
            Tervetulo.Napautus();
            if (Auki) Sulje("ulkopuoli");
        }

        /// <summary>Näkymät-nappi Pulun paikalla, kun Pulu ei ole näkyvissä (web pulunPaikalla, 700 ms).</summary>
        void PaikkaKierros()
        {
            if (!linssiAuki) return;
            KytkePallo();
            bool nyt = Pulu.Hae().Nakyvissa;
            if (nyt != pulunPaikalla) loki.Add(nyt ? "pulu:paikalla" : "pulu:poissa");
            pulunPaikalla = nyt;
            var r = kerros.Reunat(LinssiUi.Kerros);
            nakymat.style.right = 57.6f + r.z;
            nakymat.style.bottom = 57.6f + r.w;
            nakymat.style.display = !nyt && !astro.Kuva.Auki ? DisplayStyle.Flex : DisplayStyle.None;
        }

        // --- avaus ja sulku -----------------------------------------------------------

        /// <summary>Pulun napautus linssissä (UiNakymat): avaa tai sulkee taulun.</summary>
        public void PulunNapautus() => Vaihda("pulu");

        public void Vaihda(string syy) { if (Auki) Sulje(syy); else Avaa("napautus:" + syy); }

        /// <summary>Soiko Livia juuri nyt: puhekanava tai tervetulon oma repliikki (web liviaPuhuu).</summary>
        bool LiviaPuhuu => Aanet.PuluPuhuu || Tervetulo.Puhuu;
        /// <summary>Muu kuin tervetulon puhe (web muuPuhe): tervetulon aikana puhekanavalla soi tervetulo, jonka aikana taulu on auki.</summary>
        bool MuuPuhe => !Tervetulo.Kesken && Aanet.PuluPuhuu;

        public bool Avaa(string syy)
        {
            if (!linssiAuki) return false;
            bool napautus = syy.StartsWith("napautus", StringComparison.Ordinal);
            if (napautus && LiviaPuhuu)
            {
                // Pelaajan napautus on pyyntö juuri nyt: tervetulo ohittuu ja puhe vaikenee (web tervetulo.ohita + vaikene).
                // Automaattinen avaus ei vaienna.
                Tervetulo.Ohita();
                Aanet.Pysayta(AaniKanava.Puhe);
                if (Puhe.Instanssi != null && Puhe.Instanssi.PuluaaniSoi) Puhe.Instanssi.Pysayta(0.3f);
                loki.Add("vaiensi");
            }
            // Pulun vanhat kuplat pois, ja kuvan kysymyskortti tekee tilaa (sama kulma).
            Pulu.Hae().Kuplat.TyhjennaKaikki();
            if (astro.Kuva.Auki) astro.Kuva.SuljePulukortti();
            KytkeJuuret();
            Auki = true;
            loki.Add("avaa:" + syy);
            if (automaatti == Automaatti.Odottaa) automaatti = Automaatti.Ohitettu;
            Rakenna();
            paikka = null;
            // Kasvaa esiin avaajan suunnasta (Raamattu AVAUS JA SULKU AINA ANIMOIDEN; Ponnahdus näyttää paneelin).
            avaajanPiste = AvaajanKeski();
            Ponnahdus.Avaa(paneeli, avaajanPiste);
            Sijoita(false);
            seuranta?.Pause();
            seuranta = paneeli.schedule.Execute(() =>
            {
                // Moodi vaihtui taulun ollessa auki (esim. ISS:n napautus kyytiin): nykyinen rivi vihreäksi (laitekuva 1.0.54).
                if (Auki && rakennettu != Nykyinen(Linssi())) Rakenna();
                Sijoita(true);
            }).Every((long)PulunTaulu.SeurantaMs);
            return true;
        }

        public bool Sulje(string syy)
        {
            if (!Auki) return false;
            Auki = false;
            loki.Add("sulje:" + syy);
            seuranta?.Pause();
            // Samaa reittiä takaisin avaajaan (myös ✕, ohinapautus, valinta ja linssin sulku).
            Ponnahdus.Sulje(paneeli);
            return true;
        }

        /// <summary>Kasvun keskipiste avaajaan skaalaamattoman laatikon koordinaateissa (sama kaava kuin Ponnahduksessa).</summary>
        void OrigoAvaajaan()
        {
            if (!avaajanPiste.HasValue || paneeli.parent == null || !(paneeli.layout.width > 0f)) return;
            var r = new Rect(paneeli.parent.worldBound.position + paneeli.layout.position, paneeli.layout.size);
            var p = avaajanPiste.Value;
            paneeli.style.transformOrigin = new TransformOrigin(Mathf.Clamp(p.x - r.x, 0f, r.width), Mathf.Clamp(p.y - r.y, 0f, r.height), 0f);
        }

        AstroMoodi? rakennettu;

        void Rakenna()
        {
            rivit.Clear();
            var l = Linssi();
            var nyt = Nykyinen(l);
            rakennettu = nyt;
            bool kyytiOn = l != null && l.Auki;
            // Käynnissä oleva lisärivi (esim. avaruuskävely) on valittu; silloin moodirivi ei ole.
            var lisaAktiivinen = kyytiOn ? lisarivit.Find(x => Kysy(x.Aktiivinen)) : null;
            foreach (var r in PulunTaulu.Rivit(kyytiOn, l != null && l.Kohteet.Count > 0, nyt))
            {
                string tunnus = r.Tunnus;
                Rivi(r.Otsikko, r.Selite, r.Aktiivinen && lisaAktiivinen == null, () => Valitse(tunnus));
                // Lisärivit ISS-rivien jälkeen, ennen kuvia (kyydin kanssa kuten ISS-rivit).
                if (tunnus == "iss-sisalle")
                    foreach (var x in lisarivit) { var y = x; Rivi(y.Otsikko, y.Selite, ReferenceEquals(y, lisaAktiivinen), () => Valitse(y.Tunnus)); }
            }
        }

        void Rivi(string otsikko, string selite, bool valittu, Action valinta)
        {
            var b = Rakenne.Nappi(null, "mk-astroTaulu__rivi" + (valittu ? " mk-valittu" : ""), () => { if (Auki) valinta(); }, rivit);
            b.tooltip = otsikko;
            Kirjasimet.Aseta(Rakenne.Teksti(otsikko, "mk-astroTaulu__riviOtsikko", b), Kirjasin.LukuLihava);
            // Pitkä selite (esim. avaruuskävely) rivittyy eikä leikkaudu taulun reunaan (laitekuva 1.0.54).
            Rakenne.Teksti(selite, "mk-astroTaulu__riviSelite", b).style.whiteSpace = WhiteSpace.Normal;
        }

        static bool Kysy(Func<bool> f) { try { return f != null && f(); } catch { return false; } }

        // --- laajennus: lisärivit ------------------------------------------------------------

        sealed class LisaRivi
        {
            public string Tunnus, Otsikko, Selite;
            public Func<bool> Aktiivinen;
            public Action Toiminto;
            public AstroMoodi? Lahto;
        }
        readonly List<LisaRivi> lisarivit = new List<LisaRivi>();

        /// <summary>
        /// LAAJENNUS (Linssiseppä 2:n avaruuskävely, Päätoimittaja 29.9.2026): lisärivi ISS-rivien jälkeen ja ennen kuvia. Näkyy
        /// kuten ISS-rivit (kyyti olemassa) ja on valittu (vihreä), kun aktiivinen() on tosi. Valinta sulkee taulun; jos lahto on
        /// annettu, askelkone vie ensin siihen moodiin (esim. kuva kiinni ja ISS:n rinnalle) ja kutsuu toiminto() vasta perillä.
        /// Sama tunnus korvaa aiemman rivin. Rivi rekisteröidään omasta koodista, jotta haarat eivät riipu toisistaan.
        /// </summary>
        public void LisaaRivi(string tunnus, string otsikko, string selite, Func<bool> aktiivinen, Action toiminto, AstroMoodi? lahto = null)
        {
            if (string.IsNullOrEmpty(tunnus) || toiminto == null) return;
            lisarivit.RemoveAll(x => x.Tunnus == tunnus);
            lisarivit.Add(new LisaRivi { Tunnus = tunnus, Otsikko = otsikko, Selite = selite, Aktiivinen = aktiivinen, Toiminto = toiminto, Lahto = lahto });
            if (Auki) Rakenna();
        }

        AstroMoodi Nykyinen(AstronauttiLinssi l) =>
            PulunTaulu.Nykyinen(astro.Kuva.Auki, l != null && l.Auki ? l.Kyyti : (Linssit.Iss.KyydinTila?)null);

        /// <summary>Taulu ei jää sormen tai Pulun alle: napautus muualle sulkee (web ulkoNapautus, ei niele).</summary>
        void UlkoNapautus(PointerDownEvent e)
        {
            if (!Auki) return;
            var p = (Vector2)e.position;
            if (paneeli.worldBound.Contains(p) || Avaajassa(p)) return;
            Sulje("ulkopuoli");
        }

        bool Avaajassa(Vector2 p) =>
            (Pulu.Hae().Nakyvissa && Pulu.Hae().Lintu.Contains(p)) || astro.Kuva.MinipulunLaatikko.Contains(p)
            || (nakymat.resolvedStyle.display == DisplayStyle.Flex && nakymat.worldBound.Contains(p));

        // --- sijoitus -------------------------------------------------------------------

        void Sijoita(bool vainYlos)
        {
            float W = juuri.layout.width, H = juuri.layout.height;
            if (float.IsNaN(W) || float.IsNaN(H) || W <= 0 || H <= 0) return;
            paneeli.style.width = Mathf.Min(PulunTaulu.Leveys, W - PulunTaulu.ReunaVara);
            var pulu = PulunLaatikko();
            if (!pulu.HasValue)
            {
                if (!vainYlos) { paikka = null; ala = 0; paneeli.style.right = PulunTaulu.OikeaReuna; paneeli.style.bottom = 128f; }
                return;
            }
            float w = paneeli.layout.width, h = paneeli.layout.height;
            if (float.IsNaN(w) || w <= 0) w = Mathf.Min(PulunTaulu.Leveys, W - PulunTaulu.ReunaVara);
            if (float.IsNaN(h) || h <= 0) h = 290f;
            var vaista = new List<Laatikko>();
            var l = UnityEngine.Object.FindAnyObjectByType<AstronauttiKerros>();
            if (l != null && l.IssRuudulla(out var px) && Screen.width > 0 && Screen.height > 0)
                vaista.Add(PulunTaulu.IssAlue(px.x * W / Screen.width, (Screen.height - px.y) * H / Screen.height));
            // Ylin sallittu yläreuna: turva-alue ja kyydissä lukemarivi (LIVE · ISS …, noin 44 pt) sen alla.
            float ylaMin = kerros.Reunat(LinssiUi.Kerros).y + (Linssi()?.Kyydissa == true ? 52f : PulunTaulu.YlaMin);
            var valittu = PulunTaulu.Sijoita(pulu.Value, W, H, w, h, vaista, vainYlos ? paikka : null, ala, ylaMin);
            paikka = valittu.Nimi;
            ala = valittu.Ala;
            paneeli.style.bottom = valittu.Ala;
            paneeli.style.right = valittu.Oikea ?? PulunTaulu.OikeaReuna;
            paneeli.style.maxHeight = Mathf.Max(120f, H - valittu.Ala - 12f - kerros.Reunat(LinssiUi.Kerros).y);
        }

        /// <summary>Pulun paikka (web pulunLaatikko): kuvan ollessa auki minipulu, muuten Pulu eleen varoineen, ilman Pulua Näkymät-nappi.</summary>
        Laatikko? PulunLaatikko()
        {
            Rect r;
            bool ele = false;
            if (astro.Kuva.Auki && astro.Kuva.MinipulunLaatikko.width > 0) r = astro.Kuva.MinipulunLaatikko;
            else if (Pulu.Hae().Nakyvissa && Pulu.Hae().Lintu.width > 0) { r = Pulu.Hae().Lintu; ele = true; }
            else if (nakymat.resolvedStyle.display == DisplayStyle.Flex && nakymat.worldBound.width > 0) r = nakymat.worldBound;
            else return null;
            // Pulu reagoi napautukseen eleellä, joka nostaa hahmoa (mitattu 28.9.: 90 pt napin yläreunasta).
            return new Laatikko(r.xMin, ele ? r.yMin - PulunTaulu.PulunEleenVaraPt : r.yMin, r.xMax, r.yMax);
        }

        /// <summary>Näkyvän avaajan keskipiste (testikomennon napautukseen): minipulu, Pulun lintu tai Näkymät-nappi.</summary>
        Vector2? AvaajanKeski()
        {
            if (astro.Kuva.Auki && astro.Kuva.MinipulunLaatikko.width > 0) return astro.Kuva.MinipulunLaatikko.center;
            if (Pulu.Hae().Nakyvissa && Pulu.Hae().Lintu.width > 0) return Pulu.Hae().Lintu.center;
            if (nakymat.resolvedStyle.display == DisplayStyle.Flex && nakymat.worldBound.width > 0) return nakymat.worldBound.center;
            return null;
        }

        // --- automaattinen avaus ---------------------------------------------------------

        void AutomaattiKierros()
        {
            if (!linssiAuki || automaatti != Automaatti.Odottaa) return;
            if ((Time.unscaledTime - linssiAlkoi) * 1000f > PulunTaulu.AutomaattiKattoMs) { automaatti = Automaatti.Katto; return; }
            // Linssin oma paljastus (musta → otsikko → pallo) ohi: web avaruus.paljastettu(). Tervetuloa ei odoteta.
            bool valmis = Linssi()?.Vaihe == AvauksenVaihe.Pois;
            if (!valmis || MuuPuhe) { automaattiAjo = paneeli.schedule.Execute(AutomaattiKierros).StartingIn((long)PulunTaulu.KyselyMs); return; }
            automaattiAjo = paneeli.schedule.Execute(() =>
            {
                if (!linssiAuki || automaatti != Automaatti.Odottaa) return;
                // Välissä alkanut muu puhe (esim. kupla) odotetaan vielä loppuun.
                if (MuuPuhe) { automaattiAjo = paneeli.schedule.Execute(AutomaattiKierros).StartingIn((long)PulunTaulu.KyselyMs); return; }
                // Pelaaja ehti jo valita (valokuva tai kyyti): taulua ei tuoda päälle.
                var l = Linssi();
                if (astro.Kuva.Auki || (l != null && l.Kyydissa)) { automaatti = Automaatti.Valittu; loki.Add("automaatti:valittu"); return; }
                automaatti = Automaatti.Avattu;
                Avaa("automaatti");
            }).StartingIn((long)PulunTaulu.HengahdysMs);
        }

        // --- moodista toiseen ---------------------------------------------------------------

        void Valitse(string tunnus)
        {
            var lisa = lisarivit.Find(x => x.Tunnus == tunnus);
            var rivi = PulunTaulu.Rivi(tunnus);
            if (rivi == null && lisa == null) return;
            loki.Add("valitse:" + tunnus);
            Sulje("valinta");
            if (lisa != null)
            {
                void Tee() { try { lisa.Toiminto(); } catch (Exception e) { Debug.LogWarning("MATKAKIRJA pulun taulu: " + tunnus + ": " + e.Message); } }
                if (lisa.Lahto.HasValue) SiirryMoodiin(lisa.Lahto.Value, Tee);
                else Tee();
                return;
            }
            if (Nykyinen(Linssi()) == rivi.Moodi) return;
            SiirryMoodiin(rivi.Moodi, null);
        }

        /// <summary>
        /// "KYSY PULULTA" (Pelikoodari 1.10.2026; omistaja 30.9. klo 23.5x: "tee pululle aina samat napit kaikkialle
        /// peliin", Päätoimittaja: linjaus koskee kaikkia näkymiä, myös ISS:ää ja Cupolaa): Pulun yhteinen chat avautuu
        /// PAIKALLAAN linssin teemalla. Kuvamoodissa minipulun kohdalle kohteen valmiine kysymyksineen (MinipulunKortti),
        /// muissa moodeissa (Maapallo, ISS:n rinnalla, Cupola) Pulun kohdalle ilman moodin vaihtoa. Ennen linkki vei aina
        /// kuvamoodiin, koska linssin ainoa chatti oli valokuvan minipulun kortti.
        /// </summary>
        void KysyPululta()
        {
            loki.Add("kysy");
            Sulje("kysy");
            if (Nykyinen(Linssi()) == AstroMoodi.Kuvat) { astro.Kuva.AvaaPulukortti(); return; }
            var chat = UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
            chat?.AvaaLinssissa(() => Pulu.Hae().Nakyvissa ? Pulu.Hae().Lintu : default, "astro:" + Nykyinen(Linssi()), null);
        }

        void PeruVaihto() { vaihto?.Ajo?.Pause(); vaihto = null; }

        /// <summary>Askelkone (web siirryMoodiin): yksi toimi kerrallaan 120 ms:n kierroksin, enintään 4 toimea, katto 15 s.</summary>
        public void SiirryMoodiin(AstroMoodi tavoite, Action perilla)
        {
            PeruVaihto();
            var oma = new Vaihto { Tavoite = tavoite, Alku = Time.unscaledTime, Perilla = perilla };
            vaihto = oma;
            void Kierros()
            {
                if (vaihto != oma || !linssiAuki) return;
                var l = Linssi();
                if (l == null || !l.Auki) { vaihto = null; return; }
                var askel = PulunTaulu.Askel(tavoite, astro.Kuva.Auki, l.Kyyti, l.KyytiSiirtyy);
                float kulunut = (Time.unscaledTime - oma.Alku) * 1000f;
                if (askel == MoodinAskel.Perilla || askel == MoodinAskel.Ei)
                {
                    loki.Add($"moodi:{tavoite}:{(askel == MoodinAskel.Perilla ? "perilla" : "ei")}");
                    vaihto = null;
                    if (askel == MoodinAskel.Perilla) oma.Perilla?.Invoke();
                    return;
                }
                if (kulunut > PulunTaulu.MoodinKattoMs || (askel != MoodinAskel.Odota && oma.Toimia >= PulunTaulu.MoodinToimia))
                {
                    loki.Add($"moodi:{tavoite}:luovutti");
                    vaihto = null;
                    return;
                }
                if (askel != MoodinAskel.Odota)
                {
                    oma.Toimia++;
                    loki.Add("toimi:" + askel);
                    TeeToimi(l, askel);
                }
                oma.Ajo = paneeli.schedule.Execute(Kierros).StartingIn((long)PulunTaulu.MoodinAskelMs);
            }
            Kierros();
        }

        void TeeToimi(AstronauttiLinssi l, MoodinAskel askel)
        {
            try
            {
                switch (askel)
                {
                    case MoodinAskel.SuljeKuva: l.SuljeKuva(); break;
                    case MoodinAskel.Poistu: l.PoistuKyydista(); break;
                    case MoodinAskel.Napauta: l.NapautaIss(); break;
                    case MoodinAskel.AvaaKuva:
                        var (lat, lon) = l.Katse;
                        var k = PulunTaulu.LahinKohde(l.Kohteet, lat, lon) ?? (l.Kohteet.Count > 0 ? l.Kohteet[0] : null);
                        if (k != null) l.Napauta(k.Tunnus);
                        break;
                }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA pulun taulu: toimi " + askel + ": " + e.Message); }
        }

        /// <summary>
        /// Testikomento `ui linssi taulu [auki|kiinni|pulu|valitse <tunnus>|kysy|ilman-pulua|pulu-takaisin|testirivi|tila]`: auki/kiinni
        /// suoraan, pulu = Pulun napautuksen polku (vaientaa puheen), valitse = rivin napautus (pallo|iss-rinnalla|iss-sisalle|
        /// kuvat), kysy = Kysy Pululta, ilman-pulua = Näkymät-nappi. Palauttaa tilan (paikka, alue, Pulun laatikko, moodi, loki).
        /// </summary>
        public string Testaa(string a1, string a2)
        {
            switch (a1)
            {
                case "auki": Avaa("testi"); break;
                case "kiinni": Sulje("testi"); break;
                case "pulu": PulunNapautus(); break;
                case "valitse": Valitse(a2); break;
                case "kysy": KysyPululta(); break;
                // Pulu pois näkyvistä ja takaisin: Näkymät-nappi Pulun paikalla (webin mallikuva 7).
                case "ilman-pulua": Pulu.Hae().Nayta(false); PaikkaKierros(); break;
                // Laajennuksen koe: lisärivi ISS-rivien jälkeen, valinta vie ensin ISS:n rinnalle ja kirjaa toiminnon.
                case "testirivi": LisaaRivi("testirivi", "Testirivi", "Laajennuksen koe", () => false, () => loki.Add("testirivi:toiminto"), AstroMoodi.Seuranta); break;
                case "pulu-takaisin": Pulu.Hae().Nayta(true); PaikkaKierros(); break;
            }
            return Tila();
        }

        /// <summary>Testikomennon tila: auki, paikka ja alue, rivit, moodi ja lokin loppu.</summary>
        public string Tila()
        {
            var r = paneeli.worldBound;
            var l = Linssi();
            var p = PulunLaatikko();
            var a = AvaajanKeski();
            return $"taulu {(Auki ? "auki" : "kiinni")} {paikka ?? "-"} {r.xMin:0},{r.yMin:0}–{r.xMax:0},{r.yMax:0}, pulu {(p.HasValue ? p.Value.ToString() : "-")}, "
                + $"avaaja {(a.HasValue ? $"{a.Value.x:0} {a.Value.y:0}" : "-")}, rivejä {rivit.childCount}, "
                + $"moodi {Nykyinen(l)}, kyyti {(l != null ? l.Kyyti.ToString() : "-")}{(l != null && l.KyytiSiirtyy ? " (siirtyy)" : "")}, "
                + $"nakymat {(nakymat.resolvedStyle.display == DisplayStyle.Flex ? "näkyy" : "piilossa")}, automaatti {automaatti}, "
                + $"tervetulo {(Tervetulo.Jakso != null ? Tervetulo.Jakso.Vaihe.ToString() : "-")}, "
                + $"peitto {paneeli.resolvedStyle.opacity:0.00} skaala {paneeli.resolvedStyle.scale.value.x:0.00}, "
                + $"loki [{string.Join(" ", loki.GetRange(Math.Max(0, loki.Count - 8), Math.Min(8, loki.Count)))}]";
        }
    }
}
