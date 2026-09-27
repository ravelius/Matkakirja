// LIIKU JA VAIHDA MATKUSTUSTAPA (Pelikoodari 24.9.2026, haara pelikoodari/kulkutavat; Natiivi-UI:n pyyntö).
//
// Web js/ui.js: vaihe 'roll' (~11262) näyttää nopan ja "Vaihda matkustustapa" -napin, kun
// !game.autoTravel || game.muitaTapojaTarjolla() (Matka.VaihtoTarjolla); napin teko on
// game.actionCancelTravel (Matka.PeruKulkutapa).
//
// Liiku (~11988, renderTravelChoice ~11334): alareunan monitoiminappi avaa liu'un, jossa liftaus,
// bussi, laiva ja lento (Kulkutavat(), puhdas laskenta Peli/Liikkuminen.cs). Tapa valitaan ensin,
// kohde sen jälkeen (ValitseKulkutapa):
//   liftaus → tapa ja heitto samalla painalluksella (web doWalk), sitten nopan siirrot kartalle
//   bussi   → naapurit "Kaupunki (50 p)" → Matkusta (web doBus)
//   laiva   → "Laivalla (100 p)" → tapa valittu, heittonappi + Vaihda (web actionTravel('sea'))
//   lento   → lennot "Kaupunki (300 p)" ja mannerlennot → Matkusta (web doFly, actionMannerLento)
//
// NOPAN SIIRROT KARTALLA, EI LISTAA (web vaihe 'move', Laitetestaajan pariteettiero 24.9.2026): web ei näytä
// siirtovaiheessa korttia eikä tekstiä kartan päällä (ui.js turnCard: "kehotuksen kertovat kartan korostetut
// kohteet"). Kohteet ovat game.moveOptions (PeliApu.SiirtoKohteet): SiirtoKohteetMuuttui kertoo ne kartalle
// (Natiiviseppä piirtää renkaat: Siirtokohdemerkit, kytketty tässä), kaupunkimerkin tai renkaan napautus tai ValitseSiirto(avain) valitsee. Jos kartalla ei
// tapahdu mitään Valintavihje.ViiveMs:n (15 s) aikana, ValintavihjeAika herää (Natiivi-UI: pöllön kupla).
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        /// <summary>
        /// Liiku-napin tai heittonapin tila saattoi muuttua (vaihe, silmukan tila, raha): Natiivi-UI lukee
        /// Kulkutavat(), LiikuEstetty ja VaihtoTarjolla uudelleen. Herää PaivitaNakyma-kutsusta.
        /// </summary>
        public event Action LiikuMuuttui;

        /// <summary>
        /// Linssiportti (web linssikarttaEstaa / body.aikajana-paalla): Linssiseppä asettaa tämän
        /// (LinssiOhjain.KarttaEstetty). Tosi = Liiku, matkustus, Tutki ja lehden avaus estetty, syy "linssi auki".
        /// </summary>
        public static Func<bool> LinssiEstaa;
        public const string LinssiAukiSyy = "linssi auki";
        static bool LinssiAuki { get { try { return LinssiEstaa?.Invoke() == true; } catch { return false; } } }

        /// <summary>Linssiseppä kutsuu, kun portti vaihtuu (LinssiOhjain.PorttiMuuttui): Liiku luetaan uudelleen.</summary>
        public static void LinssiPorttiMuuttui() => Instanssi?.LiikuMuuttui?.Invoke();

        /// <summary>Näkyykö heittonapin vieressä "Vaihda matkustustapa" (web: !autoTravel || muitaTapojaTarjolla).</summary>
        public bool VaihtoTarjolla => matka != null && Tila == SilmukanTila.Kartta && matka.VaihtoTarjolla();

        /// <summary>
        /// Liiku-liu'un napit (web vaihe A): liftaus, bussi, laiva, lento tekstein, hinnoin ja estosyin.
        /// Tyhjä, kun matkustustapaa ei nyt valita (vaihe Heitto: heittonappi ja Vaihda; matka, kysymys, lehti).
        /// </summary>
        public IReadOnlyList<KulkutapaNappi> Kulkutavat()
        {
            if (matka == null || !Kaytossa || (Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Dialogi))
                return Array.Empty<KulkutapaNappi>();
            return Liikkuminen.Napit(matka, kaupat?.MannerLennot());
        }

        /// <summary>Liiku harmaana (web monitoimi.disabled): kaikki tavat estetty tai valintaa ei ole nyt.</summary>
        public bool LiikuEstetty => LinssiAuki || Liikkuminen.LiikuEstetty(Kulkutavat());

        /// <summary>
        /// Liiku-liu'un nappi (testikomento 'kulkutapa'): tapa ensin, kohteet sen jälkeen matkavalintaan
        /// (IMatkaValinta.Nayta). Estetty tapa palauttaa syyn. Palauttaa virheen tai null.
        /// </summary>
        public string ValitseKulkutapa(Kulkutapa laji)
        {
            if (matka == null) return "peli ei ole valmis";
            if (LinssiAuki) return LinssiAukiSyy;
            var nappi = Kulkutavat().FirstOrDefault(n => n.Laji == laji);
            if (nappi == null) return $"matkustustapaa ei valita nyt (silmukka {Tila}, vaihe {matka.Tila.Vaihe})";
            if (nappi.Estetty) return nappi.Teksti + " — " + nappi.Syy;
            PiilotaKortti();
            Tavoite = null;
            string ala = $"{matka.Tila.Pelaaja.Raha} {PeliApu.Valuutta} · päivä {matka.Tila.Paiva()} · {PeliApu.AikaNimi(matka.Tila.Vuorokaudenaika())}";
            switch (laji)
            {
                case Kulkutapa.Maa:
                {
                    dialogi.Piilota();
                    var r = matka.ValitseKulkutapa(Kulkutapa.Maa);
                    if (!r.Ok) { Virhe(r.Virhe); Kartalle(false); return r.Virhe; }
                    return HeitaJaValitse();
                }
                case Kulkutapa.Odota:
                {
                    // Talouden vaihe 1 (web actionTravel('wait')): vuoro kuluu paikallaan.
                    tapahtumat.Clear();
                    var r = matka.ValitseKulkutapa(Kulkutapa.Odota);
                    if (!r.Ok) { Virhe(r.Virhe); Kartalle(false); return r.Virhe; }
                    Tallenna();
                    if (tapahtumat.Count > 0) Viesti(string.Join(" · ", tapahtumat));
                    Kartalle(false);
                    return null;
                }
                case Kulkutapa.Meri:
                {
                    var rivit = PeliApu.KohdeRivit(matka, Kulkutapa.Meri);
                    NaytaRivit(nappi.Teksti, ala, rivit.Select(x => x.Rivi).ToList(), _ =>
                    {
                        var r = matka.ValitseKulkutapa(Kulkutapa.Meri);
                        if (!r.Ok) { Virhe(r.Virhe); Kartalle(false); return; }
                        Tallenna();
                        Kartalle(false); // heittonappi ja Vaihda (web vaihe 'roll')
                    });
                    return null;
                }
                default:
                {
                    var rivit = PeliApu.KohdeRivit(matka, laji, kaupat?.MannerLennot());
                    // Lentolista: kaaret kohteisiin ja sovitus ruutuun (web sovitaKohteetNakyviin; Natiiviseppä Reitit).
                    if (laji == Kulkutapa.Lento) NaytaLentokaaret(rivit.Select(x => x.Kohde).Where(k => k != null).ToList());
                    NaytaRivit(nappi.Teksti, ala, rivit.Select(x => x.Rivi).ToList(),
                        i => { PiilotaLentokaaret(); Matkusta(rivit[i].Kohde, rivit[i].Rivi.Tapa, rivit[i].Rivi.Mannerlento); },
                        () => { PiilotaLentokaaret(); Kartalle(false); });
                    return null;
                }
            }
        }

        /// <summary>
        /// Matkavalinnan rivi indeksillä (testikomento 'rivi'): Liiku-vuon kohdelistat (bussi, lento, laiva,
        /// mannerlento). Siirtovaiheessa ilman listaa i:s siirtokohde (SiirtoKohteet, sama järjestys).
        /// </summary>
        public string ValitseRivi(int indeksi)
        {
            if (Tila != SilmukanTila.Dialogi || riviValittu == null)
            {
                if (siirtoKohteet.Count == 0) return "rivilista ei ole auki eikä siirtokohteita ole";
                if (indeksi < 0 || indeksi >= siirtoKohteet.Count) return $"siirtokohde {indeksi} ei ole kartalla (0–{siirtoKohteet.Count - 1})";
                return ValitseSiirto(siirtoKohteet[indeksi].Avain);
            }
            if (indeksi < 0 || indeksi >= vaihtoehdot.Count) return $"rivi {indeksi} ei ole listalla (0–{vaihtoehdot.Count - 1})";
            var v = riviValittu;
            riviValittu = null;
            dialogi.Piilota();
            v(indeksi);
            return null;
        }

        Action<int> riviValittu;

        void NaytaRivit(string otsikko, string ala, List<MatkaVaihtoehto> rivit, Action<int> valittu, Action peruttu = null)
        {
            vaihtoehdot = rivit;
            DialogiKohde = null;
            Tila = SilmukanTila.Dialogi;
            dialogi.PiilotaHeitto();
            riviValittu = valittu;
            dialogi.Nayta(otsikko, ala, rivit.Select(v => (v.Nimi, v.Selite)).ToList(),
                i => { if (riviValittu == null) return; riviValittu = null; valittu(i); },
                peruttu ?? (() => Kartalle(false)));
            LiikuMuuttui?.Invoke();
        }

        /// <summary>
        /// Heitto ilman tavoitetta (web doWalk/doRoll ja vaihe 'move'): noppa ensin (PeliNakymat.Noppa),
        /// sitten nopan siirrot kartalle (SiirtoKohteet). Ilman siirtoja vuoro päättyy (web 'stuck').
        /// </summary>
        /// <summary>Web wait(260) nopan kallahduksen ja siirtokohteiden välissä.</summary>
        const float KohteidenTaukoS = 0.26f;

        static System.Collections.IEnumerator Viiveella(float s, Action a)
        {
            yield return new WaitForSecondsRealtime(s);
            a();
        }

        string HeitaJaValitse()
        {
            if (Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Dialogi) return "silmukka on tilassa " + Tila;
            // Noppa on jo heitetty: kohteet ovat kartalla, valinta napautuksella.
            if (matka.Tila.Vaihe == Vaihe.Siirto) { if (Tila != SilmukanTila.Kartta) Kartalle(false); else PaivitaSiirtoKohteet(); return null; }
            var lahto = matka.Tila.Pelaaja.Sijainti;
            tapahtumat.Clear();
            // Heitto vaientaa paikan puheen (web doRoll → vaiennaPaikanPuhe, löydökset 53–54).
            VaiennaPaikanPuhe();
            var r = matka.Heita();
            if (!r.Ok) { Virhe(r.Virhe); Kartalle(false); return r.Virhe; }
            dialogi.Piilota();
            dialogi.PiilotaHeitto();
            Tallenna();
            int noppa = r.Noppa ?? 0;
            Debug.Log($"MATKAKIRJA peli: noppa {noppa}, siirtoja {matka.Tila.Siirrot?.Count ?? 0}");
            Action jatko = () =>
            {
                // Siirtovaihe: kartalle, jossa kohteet korostuvat (PaivitaNakyma → PaivitaSiirtoKohteet).
                if (matka.Tila.Vaihe == Vaihe.Siirto) { Kartalle(false); return; }
                // Jumissa: vuoro päättyi jo (Matka.Heita); noppa häipyy.
                try { MatkaPerilla?.Invoke(null); } catch (Exception e) { Debug.LogException(e); }
                if (tapahtumat.Count > 0) Viesti(string.Join(" · ", tapahtumat));
                Kartalle(false);
            };
            var a = PeliApu.Koordinaatti(verkko, lahto);
            if (PeliNakymat.Noppa != null && Kaytossa && a.HasValue)
            {
                // Sama nopan vuo kuin Matkusta: jatko nopan valmis()-kutsusta tai varareitistä.
                Tila = SilmukanTila.Matkalla;
                matkaKohde = a.Value;
                int tunnus = ++noppaTunnus;
                // Web ui.js ~23580: nopan kallahduksen jälkeen wait(260) ennen kohdemerkkejä ja sovitusta
                // (liikkumisen pariteetti A10): silmäluku ehtii näkyä ennen kuin kartta liikkuu.
                noppaLiike = () => StartCoroutine(Viiveella(KohteidenTaukoS, () => { if (tunnus == noppaTunnus) jatko(); }));
                noppaLoppuu = Time.unscaledTime + NopanVaraS;
                try { PeliNakymat.Noppa(noppa, a.Value.Lat, a.Value.Lon, () => { if (tunnus == noppaTunnus) NoppaValmis(); }); }
                catch (Exception e) { Debug.LogException(e); NoppaValmis(); }
                return null;
            }
            Aanita(Aanitunnukset.Noppa);
            Viesti("Noppa " + noppa);
            jatko();
            return null;
        }

        // --- siirtokohteet kartalle ja pöllön valintavihje (web vaihe 'move') -------------------------

        /// <summary>
        /// Nopan siirtokohteet vaihtuivat (web: kohdemerkit laudalla). Natiiviseppä piirtää renkaat: kaupunki
        /// isona nimen kera, reitin varren piste (Kaupunki null) pienenä. Tyhjä lista = siirtovaihe päättyi,
        /// renkaat pois. Herää vain muutoksesta (uusi heitto, vaihe, silmukan tila, linssi).
        /// </summary>
        public event Action<IReadOnlyList<SiirtoKohde>> SiirtoKohteetMuuttui;

        /// <summary>Nykyiset siirtokohteet (tyhjä, kun peli ei odota siirron valintaa kartalta).</summary>
        public IReadOnlyList<SiirtoKohde> SiirtoKohteet => siirtoKohteet;

        /// <summary>
        /// Pöllön valintavihje (web paivitaValintavihje): siirtovaihe on odottanut Valintavihje.ViiveMs (15 000 ms)
        /// ilman kartan kosketusta. Parametri on webin vihjeteksti (Valintavihje.Teksti). Kerran vaihetta kohden.
        /// </summary>
        public event Action<string> ValintavihjeAika;

        /// <summary>Näytetty vihje pois (web polloVihjePois): kartan kosketus, valinta tai vaiheen loppu.</summary>
        public event Action ValintavihjePois;

        /// <summary>
        /// Siirtokohteen napautus kartalla (renkaan tai kaupunkimerkin avain, SiirtoKohde.Avain; web lauta.js
        /// valitseSiirto → ui.doMove). Vain kartalla tarjottu kohde kelpaa. Palauttaa virheen tai null.
        /// </summary>
        public string ValitseSiirto(string avain)
        {
            if (matka == null) return "peli ei ole valmis";
            if (LinssiAuki) return LinssiAukiSyy;
            if (NapautusSallittu != null && !NapautusSallittu()) return "radio soi";
            if (Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Dialogi) return "silmukka on tilassa " + Tila;
            if (avain == null || !siirtoKohteet.Any(k => k.Avain == avain)) return "ei siirtokohde: " + avain;
            return Siirry(avain);
        }

        IReadOnlyList<SiirtoKohde> siirtoKohteet = Array.Empty<SiirtoKohde>();
        bool kohteetNaytetty;
        object kohteidenLahde;
        readonly Valintavihje valintavihje = new Valintavihje();

        /// <summary>Näkyvätkö siirtokohteet nyt (web kohdevalinta: vaihe 'move', ei linssiä; silmukka ei matkalla).</summary>
        bool KohteetNakyvissa => matka != null && Kaytossa && matka.Tila.Vaihe == Vaihe.Siirto && matka.Tila.Siirrot != null
                                 && (Tila == SilmukanTila.Kartta || Tila == SilmukanTila.Dialogi) && !LinssiAuki;

        /// <summary>Laskee kohteet uudelleen, jos näkyvyys tai heitto vaihtui, ja kertoo kartalle (PaivitaNakyma, Update).</summary>
        void PaivitaSiirtoKohteet()
        {
            KytkeSiirtokohdemerkit();
            bool nayta = KohteetNakyvissa;
            object lahde = nayta ? matka.Tila.Siirrot : null;
            if (nayta == kohteetNaytetty && ReferenceEquals(lahde, kohteidenLahde)) return;
            kohteetNaytetty = nayta;
            kohteidenLahde = lahde;
            siirtoKohteet = nayta ? PeliApu.SiirtoKohteet(matka) : (IReadOnlyList<SiirtoKohde>)Array.Empty<SiirtoKohde>();
            if (nayta) Debug.Log($"MATKAKIRJA peli: siirtokohteet {string.Join(", ", siirtoKohteet.Select(k => k.Avain))}");
            try { SiirtoKohteetMuuttui?.Invoke(siirtoKohteet); } catch (Exception e) { Debug.LogException(e); }
            NaytaSiirtokohdemerkit();
            // ESILATAUSPOLITIIKKA kohta 5: kohteet näkyvät → kohdekaupunkien saapumistarpeet heti.
            EnnakoiSiirtoKohteet(siirtoKohteet);
        }

        /// <summary>Natiivisepän renkaat (Siirtokohdemerkit, Kartta-kokoonpano ei näe peliä): kytketty instanssi.</summary>
        Siirtokohdemerkit siirtokohdemerkit;

        /// <summary>Kytkee renkaat, kun instanssi ilmestyy tai vaihtuu (kohtaus, Rakennus), ja piirtää nykyiset kohteet.</summary>
        void KytkeSiirtokohdemerkit()
        {
            var m = Siirtokohdemerkit.Instanssi;
            if (m == siirtokohdemerkit) return;
            if (siirtokohdemerkit != null) siirtokohdemerkit.Napautettu -= SiirtokohdeNapautettu;
            siirtokohdemerkit = m;
            if (m == null) return;
            m.Napautettu += SiirtokohdeNapautettu;
            NaytaSiirtokohdemerkit();
        }

        void NaytaSiirtokohdemerkit()
        {
            if (siirtokohdemerkit == null) return;
            try
            {
                siirtokohdemerkit.Nayta(siirtoKohteet.Select(k => new Siirtokohdemerkit.Kohde
                    { Avain = k.Avain, Kaupunki = k.Kaupunki, Nimi = k.Nimi, Lat = k.Lat, Lon = k.Lon }).ToList());
            }
            catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>Reitin varren renkaan napautus (kaupungit tulevat KaupunkiNapautettu-reittiä): web valitseSiirto.</summary>
        void SiirtokohdeNapautettu(string avain)
        {
            KarttaKosketettu();
            var virhe = ValitseSiirto(avain);
            if (virhe != null) Debug.Log("MATKAKIRJA peli: siirtokohde " + avain + ": " + virhe);
        }

        /// <summary>
        /// Vihjeen ajastin joka ruutu (web paivitaValintavihje): odottaa = kohteet kartalla, silmukka kartalla,
        /// radio pois ja pöllö löydetty (web polloLoydetty !== false). Botteja ja katselutilaa natiivissa ei ole.
        /// </summary>
        void PaivitaValintavihje()
        {
            bool radio = false;
            try { radio = NapautusSallittu != null && !NapautusSallittu(); } catch { }
            bool odottaa = siirtoKohteet.Count > 0 && Tila == SilmukanTila.Kartta && !radio && matka.Tila.PolloLoydetty;
            Vihje(valintavihje.Paivita(odottaa, Time.unscaledTimeAsDouble));
        }

        /// <summary>Pallon kosketus (PalloKierto.Napautettu tai PelaajanEle; web kartallaKosketettu): ajastin ja kupla pois.</summary>
        void KarttaKosketettu() => Vihje(valintavihje.Kosketettu());
        void PalloNapautettu(Vector2 _) => KarttaKosketettu();

        void Vihje(Valintavihje.Muutos m)
        {
            try
            {
                if (m == Valintavihje.Muutos.Nayta) { Debug.Log("MATKAKIRJA peli: valintavihje"); ValintavihjeAika?.Invoke(Valintavihje.Teksti); }
                else if (m == Valintavihje.Muutos.Pois) ValintavihjePois?.Invoke();
            }
            catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>Nopan siirron avain napautetulle kaupungille ("c:id"), jos se on kartalla tarjottu kohde; muuten null.</summary>
        string SiirtoAvain(string kaupunki)
        {
            if (matka == null || kaupunki == null || matka.Tila.Vaihe != Vaihe.Siirto) return null;
            var avain = "c:" + kaupunki;
            return siirtoKohteet.Any(k => k.Avain == avain) || (matka.Tila.Siirrot != null && matka.Tila.Siirrot.ContainsKey(avain)) ? avain : null;
        }

        /// <summary>Valittu nopan siirto (web actionMove): liike ja saapuminen kuten Matkusta.</summary>
        string Siirry(string avain)
        {
            if (matka.Tila.Siirrot == null || !matka.Tila.Siirrot.TryGetValue(avain, out var s)) return "ei siirtoa " + avain;
            riviValittu = null;
            var tapa = matka.Tila.Kulkutapa ?? Kulkutapa.Maa;
            return Matkusta(s.Kohde.Kaupungissa ? s.Kohde.Kaupunki : null, tapa, siirto: avain);
        }

        /// <summary>
        /// TESTIKOMENTO `koetila mannerlento` (Laitetestaajan kuulokoe, ei pelaajalle): merkitsee oman mantereen
        /// pääaarteen löydetyksi ja nostaa rahan vähintään 1000 puntaan, jolloin Liiku → Lentäen tarjoaa
        /// mannerlennot (web mannerLennot-ehto). Tallentaa tilan. Palauttaa virheen tai null.
        /// </summary>
        public string KoetilaMannerlento()
        {
            if (matka == null) return "peli ei ole valmis";
            var p = matka.Tila.Pelaaja;
            if (!p.Sijainti.Kaupungissa) return "pelaaja ei ole kaupungissa";
            if (matka.Laatat == null) return "laattoja ei ole";
            var manner = matka.Laatat.MannerOf(p.Sijainti.Kaupunki);
            if (manner == null) return "manner tuntematon: " + p.Sijainti.Kaupunki;
            if (!matka.Laatat.PaaaarreLoytynyt(manner)) matka.Laatat.PaaaarteetLoydetty.Aseta(manner, p.Sijainti.Kaupunki);
            if (p.Raha < 1000) p.Raha = 1000;
            Tallenna();
            PaivitaNakyma();
            int n = kaupat?.MannerLennot().Count ?? 0;
            Debug.Log($"MATKAKIRJA peli: koetila mannerlento ({manner}), mannerlentoja {n}");
            return n > 0 ? null : $"mannerlentoja 0 (vaihe {matka.Tila.Vaihe}; vaaditaan Toiminta ja vaellus)";
        }

        static Reitit KarttaReitit => KarttaKerrokset.Instanssi != null && KarttaKerrokset.Instanssi.reitit != null
            ? KarttaKerrokset.Instanssi.reitit : UnityEngine.Object.FindAnyObjectByType<Reitit>();
        bool lentokaaretNakyvissa;

        void NaytaLentokaaret(List<string> kohteet)
        {
            var r = KarttaReitit;
            var sijainti = matka.Tila.Pelaaja.Sijainti;
            if (r == null || kohteet.Count == 0 || !sijainti.Kaupungissa) return;
            try { r.Lentokaaret(sijainti.Kaupunki, kohteet); r.SovitaKohteet(kohteet); lentokaaretNakyvissa = true; lentoKohteet = kohteet; }
            catch (Exception e) { Debug.LogException(e); }
            PaivitaPeliSuodatin();
        }

        void PiilotaLentokaaret()
        {
            if (!lentokaaretNakyvissa) return;
            lentokaaretNakyvissa = false;
            lentoKohteet = null;
            try { KarttaReitit?.Lentokaaret(null, null); } catch (Exception e) { Debug.LogException(e); }
            PaivitaPeliSuodatin();
        }

        /// <summary>Heittonappi; vaihda-kutsu vain IHeittoVaihto-näkymälle ja vain kun vaihto on tarjolla.</summary>
        void NaytaHeittonappi(string teksti, Action painettu)
        {
            Action vaihda = matka.VaihtoTarjolla() ? () => VaihdaKulkutapa() : (Action)null;
            if (dialogi is IHeittoVaihto v) v.NaytaHeitto(teksti, painettu, vaihda);
            else dialogi.NaytaHeitto(teksti, painettu);
        }

        /// <summary>
        /// "Vaihda matkustustapa" (web actionCancelTravel; testikomento 'vaihda'): takaisin
        /// matkustustavan valintaan ennen heittoa. Heittonappi piiloutuu, ja Liiku-liuku on taas käytössä.
        /// Palauttaa virheen tai null.
        /// </summary>
        public string VaihdaKulkutapa()
        {
            if (matka == null) return "peli ei ole valmis";
            if (Tila != SilmukanTila.Kartta) return "silmukka on tilassa " + Tila;
            var r = matka.PeruKulkutapa();
            if (!r.Ok) { Virhe(r.Virhe); return r.Virhe; }
            // Uusi valinta: vanha tavoite ei enää ohjaa noppaa.
            Tavoite = null;
            Tallenna();
            PaivitaNakyma();
            Debug.Log("MATKAKIRJA peli: matkustustapa vaihtoon (actionCancelTravel)");
            return null;
        }
    }
}
