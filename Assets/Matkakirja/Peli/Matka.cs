// MATKA: matkustuksen tilakone, suora portti verkkopelin js/game.js
// Game-luokasta (beginTurn, endTurn, travelModes, busDestinations,
// airportDestinations, actionTravel, actionCancelTravel, actionRoll,
// actionMove, actionBus, actionFly, needsAid, rollDie) sekä erästä 3
// laattojen jako konstruktorissa (enterWorld), revealToken, lukitseAarre:n
// laattaosa, noteRecord ja duelArmed-lippu. Kultaiset jäljet
// Kultaiset/matkajalki.json (matkustus) ja Kultaiset/pelijalki.json (koko
// peli laattoineen, Kultaiset/tee-pelijalki.mjs) vaativat, että sama
// käsikirjoitus tuottaa täsmälleen saman tilan joka teon jälkeen.
//
// LAAJUUS: yksinpeli vaellustilassa (roaming). Matka omistaa pelitilan,
// satunnaisuuden, laattamaailman (Tila.Laatat) ja Kokemuksen (tietäjäpisteet
// saapumisista ja löydöistä). Kysely (Peli/Kysely.cs) kytkeytyy koukkuihin:
//   TehtavaTarjolla  — web tehtavaTarjolla: tuo 'stay'-tavan (Pysy)
//   Tutki            — web actionQuiz: mitä Pysy tekee
//   Tavoitteet       — web needsAid: ohitus; oletus = kääntämättömät laatat
//                      (ilman laattamaailmaa kaikki kaupungit)
//   PysaytaSaapuessa — web offerQuiz: tosi → vuoro ei pääty saapumiseen
//   Saapui           — web visitCity: XP, arrivalFact ja lehti kuuntelevat tätä
// Laattojen koukut (null = ei toteutettu):
//   LinssiKylkiaisena   — web linssiAarteenKylkiaisena (passi ei kuulu tänne; Linssiseppä)
// Muualla: pulmat (Pulmat.cs), kaupat ja mannerlennot (Kaupat.cs). Moninpelin
// voitto, tekoälypelaaja ja tapahtumakortit on poistettu (Fablen tarkastus A3, C1).
// Puuttuu: porttikaupungit ja muut laudat (worlds), botit.
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Peli
{
    /// <summary>Teon tulos (web {ok, error, die, ...}).</summary>
    public sealed class TekoTulos
    {
        public bool Ok;
        public string Virhe;
        public int? Noppa;
        public static TekoTulos Onnistui(int? noppa = null) => new TekoTulos { Ok = true, Noppa = noppa };
        public static TekoTulos Epaonnistui(string virhe) => new TekoTulos { Ok = false, Virhe = virhe };
    }

    public sealed class Matka
    {
        public IReittiverkko Verkko { get; }
        public Satunnainen Satunnainen { get; }
        public Pelitila Tila { get; }
        /// <summary>Tietäjäpisteet (web awardXp): saapumiset, löydöt, kysymykset.</summary>
        public Kokemus Kokemus { get; }
        /// <summary>Laudan aarrelaatat (Tila.Laatat). null = peli ilman laattoja.</summary>
        public Laattamaailma Laatat => Tila.Laatat;
        /// <summary>Vaellustila (web roaming): yksinpeli. Pääaarre maksaa STAR_PRIZE.</summary>
        public bool Vaellus => Tila.Pelaajat.Count == 1;
        /// <summary>Viimeisin tavallinen löytö (web viimeAarre): istunnon viesti, ei tallenneta.</summary>
        public Loyto ViimeLoyto;
        /// <summary>Pöllön paljastus odottaa näyttämistä (web polloPaljastus). Ei tallenneta.</summary>
        public bool PolloPaljastus;

        // --- koukut myöhemmille erille ---------------------------------------

        /// <summary>Onko kaupungissa tehtävä (laatta, pulma, kohtaaminen) → 'stay'. Oletus: ei.</summary>
        public Func<Pelaaja, bool> TehtavaTarjolla;
        /// <summary>Pysy-tavan teko (web actionQuiz). Ilman koukkua Pysy ei ole käytettävissä.</summary>
        public Func<Pelaaja, TekoTulos> Tutki;
        /// <summary>Pankkiavun tavoitekaupungit, ohitus. null = kääntämättömät laatat (web tokens.keys()), ilman laattamaailmaa kaikki kaupungit.</summary>
        public Func<IEnumerable<string>> Tavoitteet;
        /// <summary>Saapumispysähdys (web offerQuiz). Tosi → vuoro ei pääty.</summary>
        public Func<Pelaaja, bool> PysaytaSaapuessa;
        /// <summary>Web linssiAarteenKylkiaisena(pelaaja, kaupunki, tyyppi): tavallisen löydön jälkeen.</summary>
        public Action<Pelaaja, string, string> LinssiKylkiaisena;

        /// <summary>Laatta käännettiin (pelaaja, löytö). Kirjanpito on jo tehty.</summary>
        public event Action<Pelaaja, Loyto> Loysi;

        /// <summary>Pelaaja saapui kaupunkiin (pelaaja, kaupunki, ensikäynti). Web visitCity.</summary>
        public event Action<Pelaaja, string, bool> Saapui;
        /// <summary>Näytölle animoitava tapahtuma (web emit): 'fare', 'flight', 'aid', 'stuck', 'treasure'.</summary>
        public event Action<string, string> Tapahtui;

        public Matka(IReittiverkko verkko, Satunnainen satunnainen, Pelitila tila = null)
        {
            Verkko = verkko ?? throw new ArgumentNullException(nameof(verkko));
            Satunnainen = satunnainen ?? throw new ArgumentNullException(nameof(satunnainen));
            Tila = tila ?? new Pelitila();
            Kokemus = new Kokemus(Tila);
            Kokemus.Kytke(this);
        }

        /// <summary>Laudan kaupungit järjestyksessä (web board.cities; laattojen jako).</summary>
        public static IReadOnlyList<Kaupunki> KaupunkiLista(IReittiverkko verkko) =>
            (verkko as Reittiverkko)?.KaupunkiLista ?? verkko.Kaupungit.Values.ToList();

        /// <summary>
        /// Uusi yksinpeli annetusta aloituskaupungista (web new Game, kun
        /// start on annettu): vaihe Toiminta ja ensimmäinen vuoro alkaa heti.
        /// Kuten webissä, aloituskaupunkia ei kirjata käydyksi.
        /// </summary>
        public static Matka UusiPeli(IReittiverkko verkko, Satunnainen satunnainen, string nimi, string aloitus)
        {
            var m = Luo(verkko, satunnainen, nimi, aloitus);
            m.AloitaVuoro();
            return m;
        }

        /// <summary>UusiPeli aarrelaatoin (web new Game): ks. Luo(…, Laattamaarat).</summary>
        public static Matka UusiPeli(IReittiverkko verkko, Satunnainen satunnainen, string nimi, string aloitus,
            Laattamaarat laatat, bool polloAarteena = false)
        {
            var m = Luo(verkko, satunnainen, nimi, aloitus, laatat, polloAarteena);
            m.AloitaVuoro();
            return m;
        }

        /// <summary>
        /// Luo aarrelaatoin kuten webin konstruktori: laatat jaetaan HETI
        /// (enterWorld: pinon sekoitus + jaaLaatat, maailmankartalla 279
        /// arvontaa) ennen pelaajia ja ensimmäistä vuoroa, samalla
        /// satunnaislähteellä. <paramref name="laatat"/> = paketin
        /// kokoelmat/laatat.json (Laattamaarat.Lue). Kutsuja kytkee koukut ja
        /// kutsuu AloitaVuoro().
        /// </summary>
        public static Matka Luo(IReittiverkko verkko, Satunnainen satunnainen, string nimi, string aloitus,
            Laattamaarat laatat, bool polloAarteena = false)
        {
            if (laatat == null) throw new ArgumentNullException(nameof(laatat));
            if (!verkko.Kaupungit.ContainsKey(aloitus)) throw new ArgumentException($"Tuntematon kaupunki {aloitus}");
            var maailma = Laattamaailma.Jaa(KaupunkiLista(verkko), laatat, satunnainen);
            var m = Luo(verkko, satunnainen, nimi, aloitus);
            m.Tila.Laatat = maailma;
            m.Tila.PolloAarteena = polloAarteena;
            m.Tila.PolloLoydetty = !polloAarteena;
            return m;
        }

        /// <summary>
        /// Peli ILMAN laattoja (erän 1 muoto, pienet testiverkot). Kuten
        /// UusiPeli, mutta ensimmäinen vuoro jää aloittamatta: kutsuja
        /// kytkee ensin koukut (Kysely, laatat), koska webin konstruktorin
        /// beginTurn laskee automaattivalinnan jo niiden kanssa. Sen jälkeen
        /// kutsutaan AloitaVuoro().
        /// </summary>
        public static Matka Luo(IReittiverkko verkko, Satunnainen satunnainen, string nimi, string aloitus)
        {
            if (!verkko.Kaupungit.ContainsKey(aloitus)) throw new ArgumentException($"Tuntematon kaupunki {aloitus}");
            var tila = new Pelitila();
            tila.Pelaajat.Add(new Pelaaja
            {
                Id = 0,
                Nimi = nimi,
                Aloitus = aloitus,
                Sijainti = Sijainti.KaupungissaSijainti(aloitus),
            });
            return new Matka(verkko, satunnainen, tila);
        }

        /// <summary>
        /// Jatkaa tallennuksesta (web fromJSON): satunnaislähde kelataan
        /// samaan kohtaan, siirrot lasketaan nopasta uudelleen ja
        /// jatkolippu johdetaan asemasta.
        /// </summary>
        public static Matka Lataa(IReittiverkko verkko, string json) => Lataa(verkko, json, null);

        /// <summary>
        /// Lataus, joka antaa vanhalle tallennukselle (versiot 1–2, erät 1–2:
        /// peli ilman laattoja) aarrelaatat. PERUSTELU: laatat ovat pelin
        /// ydin (Aarnin luettelo); tyhjä maailma jättäisi vanhan pelin ilman
        /// yhtään aarretta ja tehtäviksi vain kertatutkimiset. Jako tehdään
        /// pelin omalla satunnaislähteellä tallennuksen kohdasta, joten sama
        /// tallennus antaa aina saman jaon, ja seuraava tallennus on versio 3
        /// laattoineen. Jo lukitut kaupungit (Kyselytila.AarreLukot) menettävät
        /// laattansa kuten lukitseAarre (ainutkertainen aarre siirtyy).
        /// <paramref name="laatat"/> = null: vanha peli jatkuu ilman laattoja.
        /// Versio 3 käyttää aina tallennettua laattamaailmaa.
        /// </summary>
        public static Matka Lataa(IReittiverkko verkko, string json, Laattamaarat laatat)
        {
            var tila = Pelitila.FromJson(json, KaupunkiLista(verkko));
            var rng = new Satunnainen((long)tila.Siemen);
            rng.Kelaa(tila.Arvontoja);
            if (tila.Laatat == null && tila.LuettuVersio < 3 && laatat != null)
            {
                tila.Laatat = Laattamaailma.Jaa(KaupunkiLista(verkko), laatat, rng);
                foreach (var lukko in tila.Kysely.AarreLukot.OrderBy(k => k, StringComparer.Ordinal))
                    tila.Laatat.PoistaLukittu(lukko, rng);
            }
            var m = new Matka(verkko, rng, tila);
            tila.JatkaAutomaattisesti = tila.Vaihe == Vaihe.Heitto && !tila.Pelaaja.Sijainti.Kaupungissa;
            if (tila.Vaihe == Vaihe.Siirto && tila.Noppa.HasValue)
            {
                tila.Siirrot = verkko.Siirrot(tila.Pelaaja.Sijainti, tila.Noppa.Value, tila.Kulkutapa ?? Kulkutapa.Maa);
                if (tila.Siirrot.Count == 0) tila.Vaihe = Vaihe.Toiminta;
            }
            return m;
        }

        /// <summary>Tallennusteksti (siemen ja kulutus satunnaislähteestä).</summary>
        public string Tallenna()
        {
            Tila.Siemen = Satunnainen.Siemen;
            Tila.Arvontoja = Satunnainen.Kutsuja;
            return Tila.ToJson();
        }

        Pelaaja P => Tila.Pelaaja;

        /// <summary>Web rollDie: 1 + floor(rng() * 6).</summary>
        public int HeitaNoppaa() => 1 + (int)Math.Floor(Satunnainen.Seuraava() * 6);

        string KaupunkiJossa(Pelaaja p) => p.Sijainti.Kaupungissa ? p.Sijainti.Kaupunki : null;

        // --- kulkutavat -----------------------------------------------------

        /// <summary>Web airportDestinations: lentokentältä, jos rahaa on lentolippuun.</summary>
        public List<string> LentoKohteet(Pelaaja p = null)
        {
            p ??= P;
            var kohteet = new List<string>();
            var id = KaupunkiJossa(p);
            if (id == null || !Verkko.Kaupungit.TryGetValue(id, out var k) || !k.Lentokentta || p.Raha < Vakiot.LentoHinta)
                return kohteet;
            foreach (var r in Verkko.Lennot)
            {
                if (r.A == id) kohteet.Add(r.B);
                else if (r.B == id) kohteet.Add(r.A);
            }
            return kohteet;
        }

        /// <summary>
        /// Web travelModes, järjestys Maa, Bussi, Meri, Lento, Pysy (land, bus,
        /// sea, fly, stay). Kesken reittiä matka jatkuu reitin omalla lajilla.
        /// </summary>
        public List<Kulkutapa> Kulkutavat(Pelaaja p = null)
        {
            p ??= P;
            var tavat = new List<Kulkutapa>();
            if (Tila.Vaihe != Vaihe.Toiminta) return tavat;
            if (!p.Sijainti.Kaupungissa)
            {
                tavat.Add(Verkko.Reitit[p.Sijainti.Reitti].Laji == ReitinLaji.Meri ? Kulkutapa.Meri : Kulkutapa.Maa);
                return tavat;
            }
            var reitit = Verkko.Naapurireitit(p.Sijainti.Kaupunki).Select(id => Verkko.Reitit[id]).ToList();
            if (reitit.Any(r => r.Laji == ReitinLaji.Maa)) tavat.Add(Kulkutapa.Maa);
            if (BussiKohteet(p).Count > 0) tavat.Add(Kulkutapa.Bussi);
            if (reitit.Any(r => r.Laji == ReitinLaji.Meri) && p.Raha >= Vakiot.MeriHinta) tavat.Add(Kulkutapa.Meri);
            if (LentoKohteet(p).Count > 0) tavat.Add(Kulkutapa.Lento);
            if (TehtavaTarjolla != null && TehtavaTarjolla(p)) tavat.Add(Kulkutapa.Pysy);
            return tavat;
        }

        /// <summary>Web busDestinations: maareitin toinen pää, vaiheissa Toiminta ja Heitto, 50 p.</summary>
        public List<string> BussiKohteet(Pelaaja p = null)
        {
            p ??= P;
            var kohteet = new List<string>();
            if (Tila.Vaihe != Vaihe.Toiminta && Tila.Vaihe != Vaihe.Heitto) return kohteet;
            if (!p.Sijainti.Kaupungissa || p.Raha < Vakiot.BussiHinta) return kohteet;
            var id = p.Sijainti.Kaupunki;
            if (!Verkko.Kaupungit.ContainsKey(id)) return kohteet;
            foreach (var rid in Verkko.Naapurireitit(id))
            {
                var r = Verkko.Reitit[rid];
                if (r.Laji != ReitinLaji.Maa) continue;
                var toinen = r.A == id ? r.B : r.A;
                if (Verkko.Kaupungit.ContainsKey(toinen) && !kohteet.Contains(toinen)) kohteet.Add(toinen);
            }
            return kohteet;
        }

        /// <summary>Web busPath: reitin välipisteet lähdöstä kohteeseen ja kohdekaupunki.</summary>
        public List<Sijainti> BussiPolku(string lahto, string kohde)
        {
            var polku = new List<Sijainti>();
            var r = Verkko.HaeReitti(lahto, kohde);
            if (r != null)
            {
                bool eteen = r.A == lahto;
                for (int i = 1; i < r.Askeleet; i++)
                    polku.Add(Sijainti.ReitillaSijainti(r.Id, eteen ? i : r.Askeleet - i));
            }
            polku.Add(Sijainti.KaupungissaSijainti(kohde));
            return polku;
        }

        /// <summary>Web muitaTapojaTarjolla: bussi yhä valittavissa ennen heittoa.</summary>
        public bool MuitaTapojaTarjolla(Pelaaja p = null)
        {
            p ??= P;
            if (Tila.Vaihe != Vaihe.Heitto) return false;
            if (Tila.Kulkutapa == Kulkutapa.Bussi) return false;
            return BussiKohteet(p).Count > 0;
        }

        /// <summary>Web jatkaMatkaaItsestaan: saako käyttöliittymä heittää pelaajan puolesta nyt.</summary>
        public bool JatkaMatkaaItsestaan(Pelaaja p = null)
        {
            p ??= P;
            return Tila.JatkaAutomaattisesti && Tila.Vaihe == Vaihe.Heitto
                && Tila.Noppa == null && !p.Sijainti.Kaupungissa;
        }

        // --- vuoron kulku ---------------------------------------------------

        /// <summary>Web beginTurn: nollaus, pankkiapu ja automaattivalinta.</summary>
        public void AloitaVuoro()
        {
            if (Tila.Vaihe == Vaihe.Ohi) return;
            var p = P;
            Tila.Noppa = null;
            Tila.Siirrot = null;
            Tila.ViimePolku = null;
            Tila.Kulkutapa = null;
            Tila.OdottavaMaksu = 0;
            Tila.AutoMatka = false;
            Tila.JatkaAutomaattisesti = false;

            if (TarvitseeApua(p))
            {
                p.Raha += Vakiot.HataApu;
                Tapahtui?.Invoke("aid", $"{p.Nimi} sai pankilta {Vakiot.HataApu} puntaa");
            }

            // Automaattivalinta lasketaan NOPPATAVOISTA: bussilla ei heitetä.
            var noppaTavat = Kulkutavat(p).Where(t => t != Kulkutapa.Bussi).ToList();
            Tila.AutoMatka = noppaTavat.Count == 1 && noppaTavat[0] != Kulkutapa.Pysy;
            if (Tila.AutoMatka) ValitseKulkutapa(noppaTavat[0]);

            // Matka kesken reitillä: heitto ilman nappia (käyttöliittymä heittää).
            Tila.JatkaAutomaattisesti = Tila.AutoMatka && Tila.Vaihe == Vaihe.Heitto && !p.Sijainti.Kaupungissa;
        }

        /// <summary>
        /// Web needsAid: ei yhtään kulkutapaa, tai mikään tavoite ei ole
        /// rahoilla saavutettavissa. Vaellustilassa tavoitteet ovat laatat
        /// (tokens.keys()); kun kaikki on käännetty, apua ei tule.
        /// </summary>
        public bool TarvitseeApua(Pelaaja p)
        {
            if (!Kulkutavat(p).Any(t => t != Kulkutapa.Pysy)) return true;
            var tavoitteet = new HashSet<string>(Tavoitteet?.Invoke()
                ?? (Laatat != null ? Laatat.Laatat.Keys : Verkko.Kaupungit.Keys));
            if (tavoitteet.Count == 0) return false;
            // Web reachableCities(board, pos, money): sama BFS myös reitin varrelta.
            var saavutettavat = Verkko.Saavutettavat(p.Sijainti, p.Raha);
            return !tavoitteet.Any(saavutettavat.Contains);
        }

        /// <summary>
        /// Web endTurn: vuoro vaihtuu. aikaKuluu=false (bussi) jättää
        /// kierroslaskurin, eli kellon, paikalleen.
        /// </summary>
        public void PaataVuoro(bool aikaKuluu = true)
        {
            if (Tila.Vaihe == Vaihe.Ohi) return;
            Tila.Vaihe = Vaihe.Toiminta;
            Tila.Vuorossa = (Tila.Vuorossa + 1) % Tila.Pelaajat.Count;
            if (Tila.Vuorossa == 0 && aikaKuluu) Tila.VuoroLaskuri++;
            // Web updateSchedule (isoisän aikataulu) tulee sisältöerässä.
            AloitaVuoro();
        }

        /// <summary>Web visitCity: kirjaa käydyksi ja kertoo saapumisesta.</summary>
        void KirjaaKaynti(Pelaaja p)
        {
            if (!p.Sijainti.Kaupungissa) return;
            bool uusi = p.Kaydyt.Add(p.Sijainti.Kaupunki);
            Saapui?.Invoke(p, p.Sijainti.Kaupunki, uusi);
        }

        /// <summary>Web visitCity siirron ulkopuolelta (esim. vapaa siirtyminen).</summary>
        public void KirjaaSaapuminen(Pelaaja p = null) => KirjaaKaynti(p ?? P);

        /// <summary>Saapumisen jälkeen: pysähdys (koukku) tai vuoron päätös.</summary>
        void SaapumisenJalkeen(bool aikaKuluu)
        {
            if (PysaytaSaapuessa != null && PysaytaSaapuessa(P)) return;
            PaataVuoro(aikaKuluu);
        }

        // --- teot -----------------------------------------------------------

        /// <summary>Web actionTravel: valitsee noppatavan; laivalippu veloitetaan vasta siirrossa.</summary>
        public TekoTulos ValitseKulkutapa(Kulkutapa tapa)
        {
            if (Tila.Vaihe != Vaihe.Toiminta) return TekoTulos.Epaonnistui("Väärä vaihe");
            if (!Kulkutavat().Contains(tapa)) return TekoTulos.Epaonnistui("Tuo matkustustapa ei ole nyt käytettävissä");
            if (tapa == Kulkutapa.Pysy)
                return Tutki != null ? Tutki(P) : TekoTulos.Epaonnistui("Tutkiminen tulee myöhemmässä erässä");
            if (tapa == Kulkutapa.Bussi) return TekoTulos.Epaonnistui("Bussin kohde valitaan erikseen");

            var p = P;
            Tila.Kulkutapa = tapa;
            // Laivalippu maksetaan satamasta lähdettäessä; merellä jatketaan ilmaiseksi.
            Tila.OdottavaMaksu = tapa == Kulkutapa.Meri && p.Sijainti.Kaupungissa ? Vakiot.MeriHinta : 0;
            Tila.Vaihe = Vaihe.Heitto;
            return TekoTulos.Onnistui();
        }

        /// <summary>
        /// Web ui.js vaihe 'roll': "Vaihda matkustustapa" -nappi heittonapin viereen, kun
        /// <c>!game.autoTravel || game.muitaTapojaTarjolla()</c>. Sama ehto, jolla PeruKulkutapa onnistuu.
        /// </summary>
        public bool VaihtoTarjolla() =>
            Tila.Vaihe == Vaihe.Heitto && (!Tila.AutoMatka || MuitaTapojaTarjolla());

        /// <summary>Web actionCancelTravel: takaisin valintaan ennen heittoa.</summary>
        public TekoTulos PeruKulkutapa()
        {
            if (Tila.Vaihe != Vaihe.Heitto) return TekoTulos.Epaonnistui("Väärä vaihe");
            if (Tila.AutoMatka && !MuitaTapojaTarjolla()) return TekoTulos.Epaonnistui("Muita matkustustapoja ei ole");
            Tila.Kulkutapa = null;
            Tila.OdottavaMaksu = 0;
            Tila.Vaihe = Vaihe.Toiminta;
            // Esivalinta purkautuu: pelaajan itse valitsema tapa ei ole koneen esivalinta.
            Tila.AutoMatka = false;
            Tila.JatkaAutomaattisesti = false;
            return TekoTulos.Onnistui();
        }

        /// <summary>
        /// Vuoron alun automaattivalinta uudelleen, kun Pysy-tapa tuli tarjolle
        /// vasta vuoron alun jälkeen (Kysely kytketään, kun kysymykset ovat
        /// latautuneet): webissä Pysy estää esivalinnan (beginTurn), joten
        /// esivalittu noppatapa puretaan ennen heittoa. Palauttaa true, jos purettiin.
        /// </summary>
        public bool ArvioiEsivalinta()
        {
            if (Tila.Vaihe != Vaihe.Heitto || !Tila.AutoMatka || !P.Sijainti.Kaupungissa) return false;
            var valittu = Tila.Kulkutapa;
            Tila.Vaihe = Vaihe.Toiminta;
            bool pysy = Kulkutavat().Contains(Kulkutapa.Pysy);
            Tila.Vaihe = Vaihe.Heitto;
            if (!pysy) return false;
            Tila.Kulkutapa = null;
            Tila.OdottavaMaksu = 0;
            Tila.Vaihe = Vaihe.Toiminta;
            Tila.AutoMatka = false;
            Tila.JatkaAutomaattisesti = false;
            return valittu != null;
        }

        /// <summary>Web actionRoll: heitto ja siirrot; ilman siirtoja vuoro päättyy.</summary>
        public TekoTulos Heita()
        {
            if (Tila.Vaihe != Vaihe.Heitto) return TekoTulos.Epaonnistui("Valitse ensin matkustustapa");
            var p = P;
            int noppa = HeitaNoppaa();
            Tila.Noppa = noppa;
            Tila.Siirrot = Verkko.Siirrot(p.Sijainti, noppa, Tila.Kulkutapa ?? Kulkutapa.Maa);
            if (Tila.Siirrot.Count == 0)
            {
                Tapahtui?.Invoke("stuck", $"{p.Nimi} ei pysty liikkumaan");
                PaataVuoro();
                return TekoTulos.Onnistui(noppa);
            }
            Tila.Vaihe = Vaihe.Siirto;
            return TekoTulos.Onnistui(noppa);
        }

        /// <summary>Web actionMove: laivalippu, siirto, saapuminen ja vuoron päätös.</summary>
        public TekoTulos Liiku(string avain)
        {
            if (Tila.Vaihe != Vaihe.Siirto) return TekoTulos.Epaonnistui("Heitä ensin noppa");
            if (avain == null || Tila.Siirrot == null || !Tila.Siirrot.TryGetValue(avain, out var siirto))
                return TekoTulos.Epaonnistui("Tuo ei ole laillinen siirto");
            var p = P;
            int maksu = Tila.OdottavaMaksu;
            p.Raha -= maksu;
            p.Sijainti = siirto.Kohde;
            Tila.ViimePolku = siirto.Polku;
            Tila.OdottavaMaksu = 0;
            KirjaaKaynti(p);
            if (maksu != 0) Tapahtui?.Invoke("fare", $"Laivamatka −{maksu} puntaa");
            Tila.Siirrot = null;
            Tila.Noppa = null;
            SaapumisenJalkeen(true);
            return TekoTulos.Onnistui();
        }

        /// <summary>Web actionBus: 50 p naapurikaupunkiin, ei heittoa eikä aikaa.</summary>
        public TekoTulos Bussi(string kohde)
        {
            if (Tila.Vaihe != Vaihe.Toiminta) return TekoTulos.Epaonnistui("Väärä vaihe");
            var p = P;
            if (!BussiKohteet(p).Contains(kohde)) return TekoTulos.Epaonnistui("Bussi ei kulje tuonne");
            var lahto = p.Sijainti.Kaupunki;
            p.Raha -= Vakiot.BussiHinta;
            Tila.Kulkutapa = Kulkutapa.Bussi;
            Tila.OdottavaMaksu = 0;
            Tila.ViimePolku = BussiPolku(lahto, kohde);
            p.Sijainti = Sijainti.KaupungissaSijainti(kohde);
            KirjaaKaynti(p);
            Tapahtui?.Invoke("fare", $"Bussimatka −{Vakiot.BussiHinta} puntaa");
            Tila.Siirrot = null;
            Tila.Noppa = null;
            // AIKA EI KULU: bussi ostaa nimenomaan päiviä.
            SaapumisenJalkeen(false);
            return TekoTulos.Onnistui();
        }

        /// <summary>Web actionFly: lento toiseen lentokenttäkaupunkiin, 300 p, vie vuoron.</summary>
        public TekoTulos Lenna(string kohde)
        {
            if (Tila.Vaihe != Vaihe.Toiminta) return TekoTulos.Epaonnistui("Väärä vaihe");
            var p = P;
            // Web asettaa travelMode = 'fly' ennen kohteen tarkistusta; täällä vasta
            // hyväksytyn kohteen jälkeen, jottei hylätty lento jätä tapaa roikkumaan.
            if (!LentoKohteet(p).Contains(kohde)) return TekoTulos.Epaonnistui("Sinne ei ole lentoa");
            Tila.Kulkutapa = Kulkutapa.Lento;
            p.Raha -= Vakiot.LentoHinta;
            p.Sijainti = Sijainti.KaupungissaSijainti(kohde);
            KirjaaKaynti(p);
            Tila.ViimePolku = null;
            Tapahtui?.Invoke("flight", $"Lento kaupunkiin {Verkko.Kaupungit[kohde].Nimi}");
            SaapumisenJalkeen(true);
            return TekoTulos.Onnistui();
        }

        /// <summary>
        /// Web actionKehittajaSiirto (löydös 58): kehittäjän maailmanäkymässä kaupungin napautus siirtää pelaajan
        /// suoraan kaupunkiin. Laiska kuten webissä: päivä ei kulu, rahaa ei mene, noppaa ei heitetä eikä voittoa
        /// tarkisteta. Käynti kirjataan (web visitCity), jotta kortti ja päiväkirja näyttävät uuden kaupungin.
        /// Vaihe on Toiminta (web 'action'), joten lehti ei aukea itsestään.
        /// </summary>
        public TekoTulos KehittajaSiirto(string kaupunki)
        {
            if (kaupunki == null || !Verkko.Kaupungit.TryGetValue(kaupunki, out var k)) return TekoTulos.Epaonnistui("Tuntematon kaupunki");
            var p = P;
            p.Sijainti = Sijainti.KaupungissaSijainti(kaupunki);
            Tila.ViimePolku = new List<Sijainti> { p.Sijainti };
            KirjaaKaynti(p);
            Tila.Siirrot = null;
            Tila.Noppa = null;
            Tila.Kulkutapa = null;
            Tila.OdottavaMaksu = 0;
            Tila.AutoMatka = false;
            Tila.JatkaAutomaattisesti = false;
            Tila.Vaihe = Vaihe.Toiminta;
            Tapahtui?.Invoke("say", $"{p.Nimi} siirtyi kehittäjätilassa kaupunkiin {k.Nimi}.");
            return TekoTulos.Onnistui();
        }

        // --- rahan ja kauppojen tuki (Peli/Kaupat.cs) ------------------------

        /// <summary>
        /// Web actionMannerLento:n siirto-osa (Kaupat.MannerLento tarkistaa
        /// kohteen): 300 p, ei lentokenttäehtoa, saapuminen ja vuoron päätös.
        /// </summary>
        internal void MannerLennonSiirto(string kohde)
        {
            var p = P;
            Tila.Kulkutapa = Kulkutapa.Lento;
            p.Raha -= Vakiot.LentoHinta;
            p.Sijainti = Sijainti.KaupungissaSijainti(kohde);
            KirjaaKaynti(p);
            Tila.ViimePolku = null;
            Tapahtui?.Invoke("flight", $"Lento kaupunkiin {Verkko.Kaupungit[kohde].Nimi}");
            SaapumisenJalkeen(true);
        }

        /// <summary>Näytölle animoitava tapahtuma muista pelin osista (web emit).</summary>
        internal void Ilmoita(string laji, string teksti) => Tapahtui?.Invoke(laji, teksti);

        // --- aarrelaatat (web revealToken, lukitseAarre, noteRecord) ----------

        /// <summary>Web tokens.has(kaupunki): kääntämätön laatta.</summary>
        public bool LaattaTassa(string kaupunki) =>
            kaupunki != null && Laatat != null && Laatat.Laatat.ContainsKey(kaupunki);

        /// <summary>Web tokenHere: kaupunki, jossa pelaaja seisoo, jos siinä on laatta; muuten null.</summary>
        public string LaattaKaupungissa(Pelaaja p = null)
        {
            var k = KaupunkiJossa(p ?? P);
            return LaattaTassa(k) ? k : null;
        }

        /// <summary>
        /// Web revealToken: kääntää laatan vuorossa olevalle pelaajalle ja
        /// kirjaa löydön (finds, findManner, findMaa), rahat, tähdet,
        /// tietäjäpisteet (Kokemus.Anna) ja ennätyksen. Rosvolaattoja ei ole
        /// (poistettu pelistä, Raamattu 25.8.2026). Pöllö
        /// (Tila.PolloAarteena, oletus pois) korvaa ensimmäisen laatan.
        /// Palauttaa null, jos kaupungissa ei ole laattaa.
        /// </summary>
        public Loyto KaannaLaatta(string kaupunki)
        {
            if (Laatat == null) return null;
            var p = P;
            bool pollo = Tila.PolloAarteena && !Tila.PolloLoydetty;
            var l = Laatat.Kaanna(kaupunki, Satunnainen, Vaellus, pollo);
            if (l == null) return null;
            p.Loydot.Add(l.Tyyppi);
            p.LoytoMantereet.Add(l.Manner);
            p.LoytoMaat.Add(l.Maa);
            if (l.Pollo)
            {
                Tila.PolloLoydetty = true;
                PolloPaljastus = true;
                Loysi?.Invoke(p, l);
                return l;
            }
            ViimeLoyto = l;
            p.Raha += l.RahaLisays;
            p.Paaaarteet += l.PaaaarreLisays;
            if (l.TpLisays != 0) Kokemus.Anna(p, l.TpLisays);
            if (l.Ennatys) KirjaaEnnatys(p);
            Tapahtui?.Invoke("treasure", $"+{l.RahaLisays} puntaa");
            if (l.Tyyppi != Laattatyypit.Paaaarre) LinssiKylkiaisena?.Invoke(p, kaupunki, l.Tyyppi);
            Loysi?.Invoke(p, l);
            return l;
        }

        /// <summary>
        /// Web lukitseAarre:n laattaosa: laatta poistuu kääntämättä, ja pääaarre
        /// tai mantereen aarre siirtyy saman mantereen toiseen laattaan.
        /// Lukkojoukko on Kyselytila.AarreLukot (Kysely.LukitseAarre).
        /// Palauttaa poistetun tyypin tai null.
        /// </summary>
        public string LukitseLaatta(string kaupunki) => Laatat?.PoistaLukittu(kaupunki, Satunnainen);

        /// <summary>
        /// Web noteRecord: kerran pelissä ensimmäisen pääaarteen löytyessä;
        /// jos päivä ≤ RECORD_DAYS, +XP_RECORD ja merkintä. Palauttaa
        /// rikkomispäivän tai null.
        /// </summary>
        public int? KirjaaEnnatys(Pelaaja p = null)
        {
            if (Tila.EnnatysKirjattu) return null;
            Tila.EnnatysKirjattu = true;
            int paiva = Tila.Paiva();
            if (paiva > LaattaVakiot.EnnatysPaivat) return null;
            Kokemus.Anna(p ?? P, LaattaVakiot.TpEnnatys);
            Tila.EnnatysPaiva = paiva;
            return paiva;
        }

        /// <summary>Web takePolloPaljastus: palauttaa ja nollaa lipun.</summary>
        public bool OtaPolloPaljastus()
        {
            bool odottaa = PolloPaljastus;
            PolloPaljastus = false;
            return odottaa;
        }
    }
}
