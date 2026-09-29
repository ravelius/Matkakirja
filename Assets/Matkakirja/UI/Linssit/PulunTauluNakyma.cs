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
// Pulun paikalla, kun Pulu ei ole näkyvissä. Napautuksella avattaessa puhuva Pulu vaikenee; automaattinen avaus ei
// koskaan vaienna. AVAUS KERRAN ITSESTÄÄN linssin paljastuksen jälkeen (web: tervetulon jälkeen, tai heti, jos tervetuloa
// ei ole; natiivissa ei vielä tervetuloa): Pulu hiljaa, 600 ms hengähdys, katto 90 s, ei jos pelaaja jo valitsi.
// SULKEVAT: ✕, rivin valinta, Kysy Pululta, uusi napautus avaajaan, napautus muualle (ei niele: ISS:n napautus vie silti
// kyytiin), linssin sulku. PAIKKA (PulunTaulu.Sijoita): Pulun yllä tai vasemmalla, ei koskaan Pulun eikä ISS-merkin
// päällä; auki ollessa mitataan 400 ms:n välein. Häivytys 160 ms (peitto ja 6 pt:n nousu), pieni liike pois: suoraan.
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
        IVisualElementScheduledItem seuranta, paikkaKierros, automaattiAjo, haivytys;

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
            var ylarivi = Rakenne.El("mk-astroTaulu__ylarivi", paneeli, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(PulunTaulu.Otsikko, "mk-astroTaulu__otsikko", ylarivi), Kirjasin.LukuLihava);
            var sulku = Rakenne.Nappi(null, "mk-astroTaulu__sulku", () => Sulje("sulku"), ylarivi);
            sulku.tooltip = "Sulje taulu";
            var ympyra = Rakenne.El("mk-astroTaulu__sulkuYmpyra", sulku, PickingMode.Ignore);
            Rakenne.Teksti("×", "mk-astroTaulu__sulkuMerkki", ympyra);
            rivit = Rakenne.El("mk-astroTaulu__rivit", paneeli, PickingMode.Ignore);
            var linkki = Rakenne.Nappi(null, "mk-astroTaulu__linkki", KysyPululta, paneeli);
            var linkkiTeksti = Rakenne.Teksti("<u>" + PulunTaulu.KysyTeksti + "</u>", "mk-astroTaulu__linkkiTeksti", linkki);
            linkkiTeksti.enableRichText = true;

            astro.Kuva.MinipuluNapautettu += () => Vaihda("minipulu");
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
                Sulje("linssi");
                PeruVaihto();
                automaattiAjo?.Pause();
                paikkaKierros?.Pause();
                nakymat.style.display = DisplayStyle.None;
                if (kytketty != null) { kytketty.PalloNapautettu -= PalloNapautettu; kytketty = null; }
                return;
            }
            linssiAlkoi = Time.unscaledTime;
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

        void PalloNapautettu() { if (Auki) Sulje("ulkopuoli"); }

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

        public bool Avaa(string syy)
        {
            if (!linssiAuki) return false;
            bool napautus = syy.StartsWith("napautus", StringComparison.Ordinal);
            if (napautus && Aanet.PuluPuhuu)
            {
                // Pelaajan napautus on pyyntö juuri nyt: puhe vaikenee (web vaikene). Automaattinen avaus ei vaienna.
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
            paneeli.style.display = DisplayStyle.Flex;
            Sijoita(false);
            Haivyta(true);
            seuranta?.Pause();
            seuranta = paneeli.schedule.Execute(() => Sijoita(true)).Every((long)PulunTaulu.SeurantaMs);
            return true;
        }

        public bool Sulje(string syy)
        {
            if (!Auki) return false;
            Auki = false;
            loki.Add("sulje:" + syy);
            seuranta?.Pause();
            Haivyta(false);
            return true;
        }

        void Haivyta(bool nakyviin)
        {
            haivytys?.Pause();
            var s = paneeli.style;
            if (LinssiUi.VahennettyLiike())
            {
                s.opacity = nakyviin ? 1f : 0f;
                s.translate = new Translate(0, 0);
                if (!nakyviin) s.display = DisplayStyle.None;
                return;
            }
            float alku = Time.unscaledTime, a0 = nakyviin ? 0f : paneeli.resolvedStyle.opacity, a1 = nakyviin ? 1f : 0f;
            haivytys = paneeli.schedule.Execute(() =>
            {
                Ruudunpaivitys.Herata(0.1f);
                float t = Mathf.Clamp01((Time.unscaledTime - alku) * 1000f / PulunTaulu.HaivytysMs);
                float k = Tiivistys.Ease(t);
                s.opacity = Mathf.Lerp(a0, a1, k);
                s.translate = new Translate(0, nakyviin ? 6f * (1f - k) : 6f * k);
                if (t < 1f) return;
                haivytys.Pause();
                if (!nakyviin) s.display = DisplayStyle.None;
            }).Every(16);
        }

        void Rakenna()
        {
            rivit.Clear();
            var l = Linssi();
            var nyt = Nykyinen(l);
            foreach (var r in PulunTaulu.Rivit(l != null && l.Auki, l != null && l.Kohteet.Count > 0, nyt))
            {
                string tunnus = r.Tunnus;
                var b = Rakenne.Nappi(null, "mk-astroTaulu__rivi" + (r.Aktiivinen ? " mk-valittu" : ""), () => Valitse(tunnus), rivit);
                b.tooltip = r.Otsikko;
                Kirjasimet.Aseta(Rakenne.Teksti(r.Otsikko, "mk-astroTaulu__riviOtsikko", b), Kirjasin.LukuLihava);
                Rakenne.Teksti(r.Selite, "mk-astroTaulu__riviSelite", b);
            }
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
            var valittu = PulunTaulu.Sijoita(pulu.Value, W, H, w, h, vaista, vainYlos ? paikka : null, ala);
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

        // --- automaattinen avaus ---------------------------------------------------------

        void AutomaattiKierros()
        {
            if (!linssiAuki || automaatti != Automaatti.Odottaa) return;
            if ((Time.unscaledTime - linssiAlkoi) * 1000f > PulunTaulu.AutomaattiKattoMs) { automaatti = Automaatti.Katto; return; }
            // Linssin oma paljastus (musta → otsikko → pallo) ohi: web avaruus.paljastettu().
            bool paljastettu = Linssi()?.Vaihe == AvauksenVaihe.Pois;
            if (!paljastettu || Aanet.PuluPuhuu) { automaattiAjo = paneeli.schedule.Execute(AutomaattiKierros).StartingIn((long)PulunTaulu.KyselyMs); return; }
            automaattiAjo = paneeli.schedule.Execute(() =>
            {
                if (!linssiAuki || automaatti != Automaatti.Odottaa) return;
                // Välissä alkanut puhe (esim. kupla) odotetaan vielä loppuun.
                if (Aanet.PuluPuhuu) { automaattiAjo = paneeli.schedule.Execute(AutomaattiKierros).StartingIn((long)PulunTaulu.KyselyMs); return; }
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
            var rivi = PulunTaulu.Rivi(tunnus);
            if (rivi == null) return;
            loki.Add("valitse:" + tunnus);
            Sulje("valinta");
            if (Nykyinen(Linssi()) == rivi.Moodi) return;
            SiirryMoodiin(rivi.Moodi, null);
        }

        /// <summary>
        /// "KYSY PULULTA": linssin ainoa chatti on valokuvan Pululla (kohteen kaksi valmista kysymystä + vapaa kenttä),
        /// joten linkki vie kuvamoodiin (lähimmän kohteen kuva, kyydistä ensin pois) ja avaa siellä minipulun kortin.
        /// </summary>
        void KysyPululta()
        {
            loki.Add("kysy");
            Sulje("kysy");
            if (Nykyinen(Linssi()) == AstroMoodi.Kuvat) astro.Kuva.AvaaPulukortti();
            else SiirryMoodiin(AstroMoodi.Kuvat, () => astro.Kuva.AvaaPulukortti());
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
        /// Testikomento `ui linssi taulu [auki|kiinni|pulu|valitse <tunnus>|kysy|ilman-pulua|pulu-takaisin|tila]`: auki/kiinni
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
            return $"taulu {(Auki ? "auki" : "kiinni")} {paikka ?? "-"} {r.xMin:0},{r.yMin:0}–{r.xMax:0},{r.yMax:0}, pulu {(p.HasValue ? p.Value.ToString() : "-")}, rivejä {rivit.childCount}, "
                + $"moodi {Nykyinen(l)}, kyyti {(l != null ? l.Kyyti.ToString() : "-")}{(l != null && l.KyytiSiirtyy ? " (siirtyy)" : "")}, "
                + $"nakymat {(nakymat.resolvedStyle.display == DisplayStyle.Flex ? "näkyy" : "piilossa")}, automaatti {automaatti}, "
                + $"loki [{string.Join(" ", loki.GetRange(Math.Max(0, loki.Count - 8), Math.Min(8, loki.Count)))}]";
        }
    }
}
