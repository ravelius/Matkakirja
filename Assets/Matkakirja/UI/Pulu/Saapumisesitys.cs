// SAAPUMISESITYS (Natiivi-UI, erä 5): webin annostelu matkakirja → Livia
// (js/fokusvirta.js, js/ui.js renderFact ja aloitaMerkinta) natiivin tapahtumista.
//
//   PeliOhjain.LuentoAlkoi(kaupunki)  → fokusvirran merkintä kirjoittuu, isoisän
//                                       luentakuva pakkaan, luentakuva2 9 s kohdalla
//   PeliOhjain.LuentoLoppui(kaupunki) → Livian kommentti(t) kuplaan äänineen,
//                                       PuluCam-kuvat pakkaan 4 s välein, kuvat
//                                       häipyvät 6 s hiljaisuuden jälkeen ja
//                                       lentävät kortin pikkukuviksi
//   PeliOhjain.MatkaPerilla(kaupunki) → saapuminen: kun silmukka on taas kartalla
//                                       (traileri ja lehti ohi), kortti kertoo
//                                       kaupungista (Matkakirjamerkinnat.cs):
//                                       fokuskaupunki = virran merkintä (otsikko
//                                       heti, teksti luennan alkaessa; ilman
//                                       luentoa suoraan ja Livia perään), muu
//                                       kaupunki = saapumisteksti tai -havainto
//                                       (kokoelma saapumistekstit): äänite soi
//                                       sekunnin kuluttua, jos se vastaa tekstiä
//                                       (nyt Kairo), muuten web lukee lukija-tekstin
//                                       puhesynteesillä (Puhe.Lue); vain Kertoja
//                                       päällä ja kerran peräkkäin (web luettuSaapuminen).
//                                       Reitin varrella (null) kortti EI vaihdu
//                                       (omistajan päätös); tyhjään korttiin tulee
//                                       paikkatieto "Matkalla — X".
//   laatta kääntyy fokuskaupungissa    → aarremerkintä (web aarreLoytyi: laatta oli
//                                       kaupungissa ja katosi); voittaa saapumis-
//                                       merkinnän, kunnes saavutaan muualle.
//   uusi tai jatkettu matka            → kortti pelaajan sijainnista (web visitCity
//                                       lähtökaupungissa; reitillä arvottu tieto).
//   aloitusnäkymä                      → kortti piiloon ja tyhjäksi (web pickstart).
// Intro ja lento-alku (kaupunki null) eivät avaa korttia.
//
// Livian saapumisrepliikit (kokoelma liviansaapumiset, web LIVIAN_SAAPUMISET): webissä
// fokusmoodissa pollo.kommentti voittaa taulun, ja kaikki 10 riviä ovat fokuskaupunkeja,
// joilla kommentti on; kaupungeilla ilman fokusvirtaa rivejä ei ole. Natiivi on aina
// fokusmoodissa (LehtiTila.Fokusmoodi), joten taulu ei tuo tähän yhtään kuplaa.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Saapumisesitys
    {
        /// <summary>Kuinka kauan fokuskaupungin merkintä odottaa luentoa, ennen kuin se kirjoitetaan ilman sitä.</summary>
        const long LuentoOdotusMs = 6000;

        readonly Matkakirjakortti kortti;
        readonly Pulu pulu;
        readonly HashSet<string> kommentoitu = new HashSet<string>();
        IVisualElementScheduledItem vaihto, luentoOdotus;
        string kaupunki;

        PeliOhjain ohjain;
        Matka nahtyMatka;
        /// <summary>Saapuminen, joka näytetään kun silmukka on kartalla (MatkaPerilla → Kartta).</summary>
        string odottavaSaapuminen;
        /// <summary>Kaupungit, joiden luento on alkanut tässä istunnossa (Luennat.OtaLuento soittaa kerran).</summary>
        readonly HashSet<string> luentoAlkanut = new HashSet<string>();
        // Web fokusaarreMerkinta / fokusaarreOdottaa / fokusaarreKerrottu.
        string aarreLippu;
        /// <summary>Web luettuSaapuminen: viimeksi luettu saapumismerkintä (sama ei ala uudelleen peräkkäin).</summary>
        string luettuSaapuminen;
        readonly HashSet<string> aarreOdottaa = new HashSet<string>();
        readonly HashSet<string> aarreKerrottu = new HashSet<string>();

        /// <summary>
        /// Löydös 177 (Uusi peli): istunnon muistit pois kuten webin uudelleenlatauksessa — pulun kaupunkikommentit,
        /// alkaneet luennot ja viimeksi luettu saapuminen (aarteet ja kortti nollautuvat jo uuden matkan tunnistuksessa).
        /// </summary>
        public void Nollaa()
        {
            kommentoitu.Clear();
            luentoAlkanut.Clear();
            luettuSaapuminen = null;
        }

        public Saapumisesitys(Matkakirjakortti kortti, Pulu pulu)
        {
            this.kortti = kortti;
            this.pulu = pulu;
            kortti.Kuvat.Lahti += kortti.LisaaPikkukuva;
        }

        static IVisualElementScheduler Ajastin => UiKerros.Hae().Juuri(UiKerros.Tilarivi).schedule;

        public void Kytke(PeliOhjain o)
        {
            ohjain = o;
            o.LuentoAlkoi += (k, _) => Alkoi(k);
            o.LuentoLoppui += Loppui;
            o.MatkaPerilla += Perilla;
            // A7/C14 (löydökset 53–54): heitto, siirto, maailmahyppy ja Ohita vaientavat paikan puheen.
            o.PaikanPuheVaiennettu += () => UiKerros.PaaSaikeessa(VaiennaPaikanPuhe);
            o.TilaMuuttui += TarkistaAarre;
            // Aloituslento alkaa: kortti ja luentakuvat pois lennon tieltä (web renderFact aloituslentoKesken).
            o.AloituslentoAlkoi += _ => UiKerros.PaaSaikeessa(() => { kortti.Piilota(); kortti.Kuvat.Tyhjenna(false); });
            Ajastin.Execute(Tarkkaile).Every(300);
            // Kortin kaiutin päälle: äänite alkaa (web factKuuntele aloittaa merkinnän luennan). E8: valikon
            // Kertoja-kytkin ei käynnistä luentaa (web kaannaKertoja), vain kortin oma nappi.
            kortti.KertojaPaalleKortista += () =>
            {
                var m = kortti.Merkinta;
                if (kortti.Nakyy && m?.AaniUrl != null && m.Kaiutin && !Aanet.KertojaPuhuu)
                    Puhe.Hae().Soita(m.AaniUrl);
            };
            // Kortti avattiin kesken luennon (esim. UI syntyi myöhemmin).
            if (o.SoivaLuento != null) Alkoi(o.SoivaLuento.Kaupunki);
        }

        // --- pelin tila ----------------------------------------------------------

        /// <summary>Silmukan tila: aloitusnäkymä, uusi matka ja odottava saapuminen (300 ms välein).</summary>
        void Tarkkaile()
        {
            var o = ohjain;
            if (o == null) return;
            if (o.Tila == SilmukanTila.Aloitus)
            {
                if (nahtyMatka != null || kortti.Avain != null) { kortti.Tyhjenna(); nahtyMatka = null; }
                return;
            }
            if (o.Tila != SilmukanTila.Kartta || o.Matka == null) return;
            if (o.Matka != nahtyMatka)
            {
                // Uusi tai jatkettu matka: kortti sijainnista (web visitCity / tallennuksen lataus).
                nahtyMatka = o.Matka;
                aarreLippu = null;
                aarreOdottaa.Clear();
                aarreKerrottu.Clear();
                kortti.Tyhjenna();
                var s = o.Matka.Tila.Pelaaja.Sijainti;
                if (s.Kaupungissa) odottavaSaapuminen = s.Kaupunki;
                else Reitilla();
            }
            TarkistaAarre();
            if (odottavaSaapuminen != null)
            {
                var k = odottavaSaapuminen;
                odottavaSaapuminen = null;
                Saapui(k);
            }
        }

        void Perilla(string k)
        {
            if (k == null) { Reitilla(); return; }
            // Aarremerkintä kuuluu käyntiin: toiseen kaupunkiin saavuttaessa lippu laskee.
            if (aarreLippu != k) aarreLippu = null;
            odottavaSaapuminen = k;
        }

        /// <summary>Reitin varrella kortti ei vaihdu; tyhjään korttiin arvottu paikkatieto (web factKey null).</summary>
        void Reitilla()
        {
            if (kortti.Avain != null) return;
            var o = ohjain;
            if (o?.Matka == null) return;
            var p = o.Matka.Tila.Pelaaja;
            var k = Matkakirjamerkinnat.ReitinKaupunki(o.Verkko, p.Sijainti);
            if (k == null) return;
            bool reitilla = !p.Sijainti.Kaupungissa;
            int vuoro = o.Matka.Tila.VuoroLaskuri, pelaaja = p.Id;
            Matkakirjamerkinnat.Lataa(() =>
            {
                if (kortti.Avain != null) return;
                var m = Matkakirjamerkinnat.Satunnainen(k, reitilla, vuoro, pelaaja);
                if (m != null) kortti.Nayta(m);
            });
        }

        /// <summary>Saavuttiin kaupunkiin ja silmukka on kartalla: kaupungin merkintä korttiin.</summary>
        public void Saapui(string k)
        {
            if (string.IsNullOrEmpty(k)) return;
            Matkakirjamerkinnat.Lataa(() =>
            {
                var v = Fokusvirrat.Hae(k);
                var m = aarreLippu == k ? Matkakirjamerkinnat.Aarre(v) : null;
                bool fokus = false;
                if (m == null && (m = Matkakirjamerkinnat.Fokus(v)) != null) fokus = true;
                m ??= Matkakirjamerkinnat.Saapuminen(k) ?? Matkakirjamerkinnat.Havainto(k);
                if (m == null) return;
                // Sama merkintä jo kortissa (web factKey): ei kirjoiteta uudelleen.
                if (kortti.Avain == m.Avain && kortti.Nakyy) return;
                luentoOdotus?.Pause();
                if (!fokus) { kortti.Nayta(m); LueSaapuminen(m); return; }
                // Fokusmerkintä odottaa luentoa (web aloitaMerkinta): otsikko heti, teksti luennan alkaessa.
                kaupunki = k;
                bool luentoTulossa = ohjain?.Luennat?.Luento(k) != null && !luentoAlkanut.Contains(k)
                    && Asetukset.Paalla(Kytkin.Kertoja);
                kortti.Nayta(m, kirjoita: false);
                if (!luentoTulossa) { KirjoitaIlmanLuentoa(k); return; }
                // C16: ensisaapumisen luenta odottaa pulun paljastusta (PeliOhjain.LuentaLykatty) — odotus jatkuu,
                // kunnes lykkäys on purettu (luenta alkoi → Alkoi, tai ei alkanut → kirjoitus ilman sitä).
                IVisualElementScheduledItem odotus = null;
                odotus = luentoOdotus = Ajastin.Execute(() =>
                {
                    if (ohjain?.LuentaLykatty(k) == true) return;
                    odotus.Pause();
                    KirjoitaIlmanLuentoa(k);
                }).StartingIn(LuentoOdotusMs).Every(500);
            });
        }

        /// <summary>
        /// Web renderFact saapumishaarat: äänite (playDiaryVoice) tai puhesynteesi (lueMerkinta,
        /// persoona "merkinnat") sekunnin hengähdyksen jälkeen, jos kortissa on yhä sama merkintä.
        /// Kertoja pois = ei luentaa. Sama merkintä uudelleen peräkkäin ei aloita alusta.
        /// </summary>
        void LueSaapuminen(Merkinta m)
        {
            if (m.AaniUrl == null && m.Lukija == null) return;
            if (luettuSaapuminen == m.Avain) return;
            luettuSaapuminen = m.Avain;
            if (!Asetukset.Paalla(Kytkin.Kertoja)) return;
            Ajastin.Execute(() =>
            {
                if (kortti.Avain != m.Avain || !Asetukset.Paalla(Kytkin.Kertoja)) return;
                if (m.AaniUrl != null) Puhe.Hae().Soita(m.AaniUrl);
                else Puhe.Hae().Lue(m.Lukija);
            }).StartingIn(1000);
        }

        /// <summary>Fokusmerkintä ilman luentoa (kuultu jo, kertoja pois): kirjoitus, sitten Livian vuoro (web fokusvirtaMerkintaLuettu).</summary>
        void KirjoitaIlmanLuentoa(string k)
        {
            if (kortti.Avain != "fokus:" + k || !kortti.Kirjoittamatta) return;
            kortti.Kirjoita(() =>
            {
                // Livia vasta hiljaisuudessa: ei isoisän (esim. intron) päälle (web: kupla odottaa luennan loppua).
                IVisualElementScheduledItem odota = null;
                odota = Ajastin.Execute(() =>
                {
                    if (Aanet.KertojaPuhuu) return;
                    odota.Pause();
                    if (kortti.Avain == "fokus:" + k) Loppui(k);
                }).Every(400);
            });
        }

        /// <summary>
        /// Web aarreLoytyi: fokuskaupungin laatta nähtiin ja se on nyt poissa → aarremerkintä
        /// (kerran per kaupunki), jos laudalla on sellainen.
        /// </summary>
        void TarkistaAarre()
        {
            var o = ohjain;
            var k = o?.PelaajanKaupunki;
            if (k == null || o.Matka == null || Fokusvirrat.Hae(k) == null) return;
            if (o.Matka.LaattaTassa(k)) { aarreOdottaa.Add(k); return; }
            if (!aarreOdottaa.Remove(k) || aarreKerrottu.Contains(k)) return;
            aarreKerrottu.Add(k);
            Aarre(k);
        }

        /// <summary>Aarremerkintä korttiin heti (myös testikomento). false = laudalla ei ole aarremerkintää.</summary>
        public bool Aarre(string k)
        {
            var m = Matkakirjamerkinnat.Aarre(Fokusvirrat.Hae(k));
            if (m == null) return false;
            aarreLippu = k;
            luentoOdotus?.Pause();
            kortti.Nayta(m);
            return true;
        }

        // --- luento ---------------------------------------------------------------

        /// <summary>
        /// Luento alkoi (myös testikomento ilman ääntä): fokusmerkintä kirjoittuu ja kuvat alkavat.
        /// pakota = kirjoita uudelleen, vaikka sama merkintä on jo kortissa (testikomento).
        /// </summary>
        public void Alkoi(string k, bool pakota = false)
        {
            if (string.IsNullOrEmpty(k)) return;
            // Web renderFact: aloituslennon aikana (aloituslentoKesken) matkakirjakorttia ei piirretä —
            // intro-luento soi lennon päällä ilman korttia ja luentakuvia, jotta kone ja pallo näkyvät.
            if (!pakota && Lennolla) return;
            kaupunki = k;
            luentoAlkanut.Add(k);
            Matkakirjamerkinnat.Lataa(() =>
            {
                if (kaupunki != k) return;
                var v = Fokusvirrat.Hae(k);
                if (v == null) return;
                luentoOdotus?.Pause();
                // Aarremerkintä voittaa saapumismerkinnän (web fokusvirtaMatkakirja).
                var m = (aarreLippu == k ? Matkakirjamerkinnat.Aarre(v) : null) ?? Matkakirjamerkinnat.Fokus(v);
                if (m != null)
                {
                    if (pakota || kortti.Avain != m.Avain || !kortti.Nakyy) kortti.Nayta(m);
                    else kortti.Kirjoita();
                }
                kortti.Kuvat.Tyhjenna(false);
                if (v.Luentakuvat.Count > 0) kortti.Kuvat.Lisaa(v.Luentakuvat[0]);
                vaihto?.Pause();
                if (v.Luentakuvat.Count > 1)
                    vaihto = Ajastin
                        .Execute(() => { if (kaupunki == k) kortti.Kuvat.Lisaa(v.Luentakuvat[1]); })
                        .StartingIn(Luentakuvasarja.VaihtoMs);
            });
        }

        /// <summary>Luento loppui: Livian vuoro (kerran per kaupunkikäynti), sitten kuvat pois.</summary>
        static bool Lennolla => PeliOhjain.Instanssi != null && PeliOhjain.Instanssi.AloituslentoKaynnissa;

        public void Loppui(string k)
        {
            if (Lennolla) return;
            vaihto?.Pause();
            if (string.IsNullOrEmpty(k) || k != kaupunki) return;
            var v = Fokusvirrat.Hae(k);
            // Ohita tai lähtö (PeliOhjain.LuentoOhitettu, web luennanOhitus): pulun kommenttia ei aloiteta.
            if (v == null || kommentoitu.Contains(k) || v.PuluKommentit.Count == 0 || ohjain?.LuentoOhitettu == true)
            {
                kortti.Kuvat.Hiljeni();
                return;
            }
            kommentoitu.Add(k);
            vuoro = -1;
            // C12 (web SAAPUMISKUPLAN_TAUKO_MS): kommentti 900 ms luennan jälkeen, ellei paikan puhetta vaiennettu.
            // C16 (web fokusvirtaSaapumiskupla → odotaPaljastus): Livian tuurauspaljastus ensin, kommentti sen jälkeen.
            IVisualElementScheduledItem tauko = null;
            tauko = Ajastin.Execute(() =>
            {
                if (LivianPaljastus.Kesken) return;
                tauko.Pause();
                if (kaupunki == k && vuoro == -1) Kommentti(v, 0);
            }).StartingIn(KommentinTaukoMs).Every(300);
        }

        int vuoro = -1;
        const int KommentinTaukoMs = 900;

        /// <summary>
        /// Web vaiennaLivianKaupunkipuhe + polloKuplatPois: Livian ääni seis, kaupungin ajastimet (kommenttiketju,
        /// luennan odotus, kuvien vaihto) pois ja kuplapino häivytyksellä pois. Sanottu jää chatin historiaan.
        /// </summary>
        void VaiennaPaikanPuhe()
        {
            vuoro = int.MaxValue; // Kommentti(v, i) ei enää jatka ketjua tässä kaupungissa
            vaihto?.Pause();
            luentoOdotus?.Pause();
            Aanet.Pysayta(AaniKanava.Puhe);
            pulu.Kuplat.TyhjennaKaikki();
            // Luennan kuvapakka ei jää seuraavan paikan päälle (Pelikoodarin havainto c535aea: maailmahypyssä Ateenan
            // kuva jäi Lontoon trailerin alle ja sen jälkeen): kuvat lentävät vielä tämän paikan matkakirjaan.
            kortti.Kuvat.Tyhjenna(true);
        }

        void Kommentti(Saapumisvirta v, int i)
        {
            // Kuittaus ja lukuajan ajastin voivat molemmat pyytää seuraavaa: vain kerran.
            if (i <= vuoro) return;
            vuoro = i;
            if (i >= v.PuluKommentit.Count) { kortti.Kuvat.Hiljeni(); return; }
            var juuri = UiKerros.Hae().Juuri(UiKerros.Tilarivi);
            // PuluCam-kuvat liittyvät pakkaan hänen puheenvuoronsa alussa (4 s välein).
            if (i == 0) for (int n = 0; n < v.PuluKuvat.Count; n++)
            {
                var kuva = v.PuluKuvat[n];
                juuri.schedule.Execute(() => kortti.Kuvat.Lisaa(kuva)).StartingIn(n * Luentakuvasarja.PuluVaihtoMs); // C10: 0 ms, 4 s välein
            }
            var teksti = v.PuluKommentit[i];
            pulu.Sano(teksti, KommentinAani(v.Kaupunki, i, teksti), null, () => Kommentti(v, i + 1));
            // Ilman kuittausta seuraava kommentti lukuajan jälkeen.
            juuri.schedule.Execute(() => { if (i + 1 < v.PuluKommentit.Count) Kommentti(v, i + 1); else kortti.Kuvat.Hiljeni(); })
                .StartingIn((long)PuluKuplat.Lukuaika(teksti) + 280);
        }

        /// <summary>
        /// Web soitaLivianKaupunkiAani(k, 'kommentti', {kupla, teksti}): kommentti on kaupungin tiedosto 3, koska
        /// numerot 1–2 ovat varattuja (LIVIAN_KAUPUNKILAHTEET, alustus ja huudahdus poistettu). Ämpärin osoite on
        /// versioitu polku (LIVIAN_VERSIOIDUT_AANET) ja ääni soi vain, jos kuplan teksti vastaa äänitteen tiivistettä
        /// (LIVIAN_AANITETYT); muuten kupla puhuu äänettä. Kentässä on yksi äänitetty kupla, joten toinen on äänetön.
        /// Löydös 49: aiemmin haettiin livia-&lt;k&gt;-1.mp3, jota ei ole (404).
        /// </summary>
        internal static string KommentinAani(string kaupunki, int kupla, string teksti)
        {
            if (kupla != 0 || kaupunki == null || !KommenttiAanet.TryGetValue(kaupunki, out var a)
                || a.Tiiviste != SahketehtavaNakyma.Tiiviste(teksti)) return null;
            return Aanet.Juuri + "aanet/pulu/versiot/" + a.Polku;
        }

        /// <summary>Web LIVIAN_VERSIOIDUT_AANET ja LIVIAN_AANITETYT, avaimet &lt;kaupunki&gt;-3 (origin/main 25.9.2026).</summary>
        static readonly Dictionary<string, (string Polku, string Tiiviste)> KommenttiAanet = new Dictionary<string, (string, string)>
        {
            ["ateena"] = ("fd6db48feef7/pulu-c4a91d1229f96eaac265/livia-ateena-3.mp3", "572e0e85"),
            ["sofia"] = ("fd6db48feef7/pulu-c4a91d1229f96eaac265/livia-sofia-3.mp3", "83dd2f15"),
            ["istanbul"] = ("6e3a07e879bb/pulu-b3a8d61baa0c4dd24123/livia-istanbul-3.mp3", "b735c27a"),
            ["bukarest"] = ("439bf050af65/pulu-3388cdde59d36a971f1a/livia-bukarest-3.mp3", "cd09de32"),
            ["sarajevo"] = ("6e3a07e879bb/pulu-b3a8d61baa0c4dd24123/livia-sarajevo-3.mp3", "92b480b3"),
            ["budapest"] = ("439bf050af65/pulu-415d0075be837be8c5bd/livia-budapest-3.mp3", "e19e0b8e"),
            ["wien"] = ("6e3a07e879bb/pulu-b3a8d61baa0c4dd24123/livia-wien-3.mp3", "731e30e6"),
            ["praha"] = ("439bf050af65/pulu-415d0075be837be8c5bd/livia-praha-3.mp3", "08430cab"),
            ["krakova"] = ("439bf050af65/pulu-0090303ae274b1313286/livia-krakova-3.mp3", "9330c2aa"),
            ["varsova"] = ("439bf050af65/pulu-0090303ae274b1313286/livia-varsova-3.mp3", "4fa709ba"),
            ["pietari"] = ("439bf050af65/pulu-0090303ae274b1313286/livia-pietari-3.mp3", "28ee75f5"),
            ["moskova"] = ("439bf050af65/pulu-0090303ae274b1313286/livia-moskova-3.mp3", "e5622fea"),
            ["kiova"] = ("439bf050af65/pulu-0090303ae274b1313286/livia-kiova-3.mp3", "a67f5827"),
            ["odessa"] = ("439bf050af65/pulu-0090303ae274b1313286/livia-odessa-3.mp3", "ae3305cd"),
            ["helsinki"] = ("439bf050af65/pulu-415d0075be837be8c5bd/livia-helsinki-3.mp3", "dd535c7c"),
            ["tampere"] = ("439bf050af65/pulu-0090303ae274b1313286/livia-tampere-3.mp3", "4db3b5df"),
            ["tallinna"] = ("439bf050af65/pulu-415d0075be837be8c5bd/livia-tallinna-3.mp3", "801b5b9b"),
            ["riika"] = ("439bf050af65/pulu-85a34cad2355457c7e9b/livia-riika-3.mp3", "e043cafb"),
            ["vilna"] = ("439bf050af65/pulu-0090303ae274b1313286/livia-vilna-3.mp3", "4003404e"),
            ["kreeta"] = ("439bf050af65/pulu-0090303ae274b1313286/livia-kreeta-3.mp3", "041f72e7"),
            ["sisilia"] = ("31ae6dfacd1d/pulu-d93f186a007678c0aa11/livia-sisilia-3.mp3", "a37e58c6"),
            ["islanti"] = ("31ae6dfacd1d/pulu-d93f186a007678c0aa11/livia-islanti-3.mp3", "31082cf9"),
            ["alpit"] = ("31ae6dfacd1d/pulu-d93f186a007678c0aa11/livia-alpit-3.mp3", "1101111e"),
            ["lappi"] = ("4ac41585d691/pulu-c8223a43f6c9ab4c7102/livia-lappi-3.mp3", "0ece225d"),
            ["tromssa"] = ("4ac41585d691/pulu-c8223a43f6c9ab4c7102/livia-tromssa-3.mp3", "d2fb66d9"),
            ["lontoo"] = ("439bf050af65/pulu-415d0075be837be8c5bd/livia-lontoo-3.mp3", "c1e6acd2"),
            ["dublin"] = ("439bf050af65/pulu-85a34cad2355457c7e9b/livia-dublin-3.mp3", "e388ef88"),
            ["edinburgh"] = ("439bf050af65/pulu-85a34cad2355457c7e9b/livia-edinburgh-3.mp3", "c0efe2b9"),
            ["pariisi"] = ("439bf050af65/pulu-3388cdde59d36a971f1a/livia-pariisi-3.mp3", "3402cfd2"),
            ["marseille"] = ("439bf050af65/pulu-85a34cad2355457c7e9b/livia-marseille-3.mp3", "8814b515"),
            ["lissabon"] = ("439bf050af65/pulu-85a34cad2355457c7e9b/livia-lissabon-3.mp3", "89015d27"),
            ["madrid"] = ("6e3a07e879bb/pulu-b3a8d61baa0c4dd24123/livia-madrid-3.mp3", "a8201121"),
            ["barcelona"] = ("439bf050af65/pulu-85a34cad2355457c7e9b/livia-barcelona-3.mp3", "d2428411"),
            ["granada"] = ("439bf050af65/pulu-0090303ae274b1313286/livia-granada-3.mp3", "fb52306b"),
            ["sevilla"] = ("439bf050af65/pulu-415d0075be837be8c5bd/livia-sevilla-3.mp3", "be8d8750"),
            ["amsterdam"] = ("439bf050af65/pulu-85a34cad2355457c7e9b/livia-amsterdam-3.mp3", "b233f7ab"),
            ["berliini"] = ("439bf050af65/pulu-3388cdde59d36a971f1a/livia-berliini-3.mp3", "a71ce16b"),
            ["venetsia"] = ("439bf050af65/pulu-85a34cad2355457c7e9b/livia-venetsia-3.mp3", "eb6f4836"),
            ["firenze"] = ("439bf050af65/pulu-85a34cad2355457c7e9b/livia-firenze-3.mp3", "3684f4df"),
            ["rooma"] = ("6e3a07e879bb/pulu-b3a8d61baa0c4dd24123/livia-rooma-3.mp3", "df365a1f"),
            ["dubrovnik"] = ("439bf050af65/pulu-415d0075be837be8c5bd/livia-dubrovnik-3.mp3", "4bf19705"),
            ["tukholma"] = ("439bf050af65/pulu-415d0075be837be8c5bd/livia-tukholma-3.mp3", "adbbef5c"),
            ["oslo"] = ("439bf050af65/pulu-85a34cad2355457c7e9b/livia-oslo-3.mp3", "b15f2275"),
            ["bergen"] = ("439bf050af65/pulu-415d0075be837be8c5bd/livia-bergen-3.mp3", "01049c89"),
            ["kobenhavn"] = ("439bf050af65/pulu-415d0075be837be8c5bd/livia-kobenhavn-3.mp3", "88635dca"),
        };

        // --- testikomento -----------------------------------------------------------

        /// <summary>
        /// ui matkakirja &lt;kaupunki&gt; [laji]: fokus | aarre | saapuminen | kaari | havainto |
        /// satunnainen | reitti; ilman lajia kuten saapuessa. Ei ääntä, ei luentakuvia eikä
        /// Livian vuoroa. tulos saa kuvauksen näytetystä tai virheen.
        /// </summary>
        public void Testi(string k, string laji, Action<string> tulos)
        {
            Matkakirjamerkinnat.Lataa(() =>
            {
                var v = Fokusvirrat.Hae(k);
                int vuoro = ohjain?.Matka?.Tila.VuoroLaskuri ?? 1;
                Merkinta m;
                switch (laji)
                {
                    case "fokus": m = Matkakirjamerkinnat.Fokus(v); break;
                    case "aarre": m = Matkakirjamerkinnat.Aarre(v); break;
                    case "saapuminen": m = Matkakirjamerkinnat.Saapuminen(k, kaariSaa: false); break;
                    case "kaari": m = Matkakirjamerkinnat.Saapuminen(k); if (m?.Laji != "kaari") m = null; break;
                    case "havainto": m = Matkakirjamerkinnat.Havainto(k); break;
                    case "satunnainen": m = Matkakirjamerkinnat.Satunnainen(k, false, vuoro, 0); break;
                    case "reitti": m = Matkakirjamerkinnat.Satunnainen(k, true, vuoro, 0); break;
                    case "":
                        m = Matkakirjamerkinnat.Fokus(v) ?? Matkakirjamerkinnat.Saapuminen(k) ?? Matkakirjamerkinnat.Havainto(k);
                        break;
                    default: tulos("ui matkakirja <kaupunki> [fokus|aarre|saapuminen|kaari|havainto|satunnainen|reitti]"); return;
                }
                if (m == null) { tulos(k + ": ei merkintää (" + (laji.Length > 0 ? laji : "saapuminen") + ")"); return; }
                luentoOdotus?.Pause();
                kortti.Nayta(m);
                tulos(m.Laji + " · " + m.Otsikko + " · " + m.Paikkarivi + (m.Wiki != null ? " · kuva: " + m.Wiki : "")
                      + (m.Lahteet.Count > 0 ? " · lähde: " + string.Join(", ", m.Lahteet) : "")
                      + (m.Valokuvat.Count > 0 ? " · valokuvia " + m.Valokuvat.Count : "")
                      + (m.AaniUrl != null ? " · äänite: " + m.AaniUrl : m.Lukija != null ? " · lukija " + m.Lukija.Length + " merkkiä" : "")
                      + " · kortti: " + kortti.Tila);
            });
        }
    }
}
