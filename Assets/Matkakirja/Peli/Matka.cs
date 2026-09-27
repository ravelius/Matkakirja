// MATKA: matkustuksen tilakone, suora portti verkkopelin js/game.js
// Game-luokasta (beginTurn, endTurn, travelModes, busDestinations,
// airportDestinations, actionTravel, actionCancelTravel, actionRoll,
// actionMove, actionBus, actionFly, rollDie) sekä erästä 3
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
//   PysaytaSaapuessa — web offerQuiz: tosi → vuoro ei pääty saapumiseen
//   Saapui           — web visitCity: XP, arrivalFact ja lehti kuuntelevat tätä
// Laattojen koukut (null = ei toteutettu):
//   LinssiKylkiaisena   — web linssiAarteenKylkiaisena (passi ei kuulu tänne; Linssiseppä)
// Muualla: pulmat (Pulmat.cs), kaupat ja mannerlennot (Kaupat.cs). Moninpelin
// voitto, tekoälypelaaja ja tapahtumakortit on poistettu (Fablen tarkastus A3, C1).
// TALOUS (talouden vaihe 1, 27.9.2026; Peli/Talous.cs): pankin apu (needsAid,
// STRANDED_AID) on poistettu. Tilalla päiväkulut vuorokauden vaihtuessa
// (VeloitaPaivakulut), rahattomuuden kahden vuorokauden varoitus
// (TarkistaRahattomuus), matkan loppu (PaataMatka) ja Odota-tapa.
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
        /// <summary>Saapumispysähdys (web offerQuiz). Tosi → vuoro ei pääty.</summary>
        public Func<Pelaaja, bool> PysaytaSaapuessa;
        /// <summary>Web linssiAarteenKylkiaisena(pelaaja, kaupunki, tyyppi): tavallisen löydön jälkeen.</summary>
        public Action<Pelaaja, string, string> LinssiKylkiaisena;

        /// <summary>Laatta käännettiin (pelaaja, löytö). Kirjanpito on jo tehty.</summary>
        public event Action<Pelaaja, Loyto> Loysi;

        /// <summary>Pelaaja saapui kaupunkiin (pelaaja, kaupunki, ensikäynti). Web visitCity.</summary>
        public event Action<Pelaaja, string, bool> Saapui;
        /// <summary>Näytölle animoitava tapahtuma (web emit): 'fare', 'flight', 'aid', 'stuck', 'treasure', 'rahat'.</summary>
        public event Action<string, string> Tapahtui;

        /// <summary>
        /// Rahatilanne muuttui (web emit 'rahat' + tilanne): (pelaaja, tilanne, otsikko, alaotsikko|null).
        /// Tilanne on Pulun avain: 'peli.vararikko.varoitus' (rahat loppuivat, kaksi päivää aikaa),
        /// 'peli.vararikko.selvisi' (kassa kunnossa, rästi maksettu) tai 'peli.vararikko.loppu'
        /// (moninpelissä pelaaja putosi). Sama otsikko tulee myös Tapahtui("rahat", otsikko).
        /// Matkan päättyminen (yksinpeli) näkyy tilasta: Vaihe Ohi ja Tila.MatkaPaattyi.
        /// </summary>
        public event Action<Pelaaja, string, string, string> Rahatilanne;

        /// <summary>
        /// Vuorokauden päiväkulu veloitettiin (pelaaja, kulu, maksettu): web say-rivi "Yö kaupungissa X:
        /// ruoka a £, majoitus b £". Maksettu &lt; kulu.Yhteensa, kun rahat eivät riittäneet (loput rästiin).
        /// </summary>
        public event Action<Pelaaja, Paivakulu, int> PaivakuluVeloitettiin;

        /// <summary>
        /// Pelistreak palkitsi (web emit 'rahat' + tilanne 'peli.streak', icon 'kukkaro'):
        /// (pelaaja, pituus, otsikko "Kolmas päivä peräkkäin matkalla", ala "+20 £" /
        /// "+50 £ ja viikkobonus +100 £"). Vain kun palkkio &gt; 0; lokirivi tulee Tapahtui("rahat", …).
        /// </summary>
        public event Action<Pelaaja, int, string, string> Pelistreak;

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
                Kuljettu = { new KuljettuPiste(aloitus, null) },
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
            // ODOTA (talouden vaihe 1): pankin apu poistui, joten rahaton pelaaja voi jäädä
            // kaupunkiin, josta ei pääse ilmaiseksi (saari ilman laivarahaa). Silloin vuoron voi
            // kuluttaa odottamalla — muuten aika ei kulkisi eikä kahden vuorokauden sääntö ratkeaisi.
            if (!tavat.Any(t => t != Kulkutapa.Pysy)) tavat.Add(Kulkutapa.Odota);
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

        /// <summary>Web beginTurn: nollaus, pudonneen ohitus, rahattomuuden tarkistus ja automaattivalinta.</summary>
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

            // Pudonnut pelaaja (rahat loppuivat, moninpeli) ei enää pelaa: vuoro siirtyy.
            if (p.Pudonnut)
            {
                PaataVuoro();
                return;
            }
            // Rahattomuuden varoitus: selvisikö kassa, vai päättyykö matka (talouden vaihe 1).
            TarkistaRahattomuus(p);
            if (Tila.Vaihe == Vaihe.Ohi) return;
            if (p.Pudonnut)
            {
                PaataVuoro();
                return;
            }

            // Automaattivalinta lasketaan NOPPATAVOISTA: bussilla ei heitetä, ja odotus
            // ei ole kulkutapa (pelaaja valitsee sen itse).
            var noppaTavat = Kulkutavat(p).Where(t => t != Kulkutapa.Bussi && t != Kulkutapa.Odota).ToList();
            Tila.AutoMatka = noppaTavat.Count == 1 && noppaTavat[0] != Kulkutapa.Pysy;
            if (Tila.AutoMatka) ValitseKulkutapa(noppaTavat[0]);

            // Matka kesken reitillä: heitto ilman nappia (käyttöliittymä heittää).
            Tila.JatkaAutomaattisesti = Tila.AutoMatka && Tila.Vaihe == Vaihe.Heitto && !p.Sijainti.Kaupungissa;
        }

        /// <summary>
        /// Web endTurn: vuoro vaihtuu. aikaKuluu=false (bussi) jättää
        /// kierroslaskurin, eli kellon, paikalleen. Uuden vuorokauden alkaessa
        /// kaikki pudottamattomat maksavat ruoan ja majoituksen (VeloitaPaivakulut).
        /// </summary>
        public void PaataVuoro(bool aikaKuluu = true)
        {
            if (Tila.Vaihe == Vaihe.Ohi) return;
            Tila.Vaihe = Vaihe.Toiminta;
            Tila.Vuorossa = (Tila.Vuorossa + 1) % Tila.Pelaajat.Count;
            if (Tila.Vuorossa == 0 && aikaKuluu)
            {
                int paivaEnnen = Tila.Paiva();
                Tila.VuoroLaskuri++;
                if (Tila.Paiva() > paivaEnnen) VeloitaPaivakulut();
            }
            // Web updateSchedule (isoisän aikataulu) tulee sisältöerässä.
            AloitaVuoro();
        }

        // --- talous: päiväkulut ja rahattomuus (web game.js, talouden vaihe 1) ----

        /// <summary>Kaupungin maan hintataso (web hintataso(cityId)): Kaupunki.Maa = web pack.map.cityCountry.</summary>
        public Hintataso HintatasoKaupungissa(string kaupunki) =>
            kaupunki != null && Verkko.Kaupungit.TryGetValue(kaupunki, out var k) ? Talous.MaanTaso(k.Maa) : Hintataso.Keski;

        /// <summary>
        /// Pelaajan päiväkulu nyt (web paivakulu). Kaupungissa ruoka + majoitus maan
        /// hintatasolla; reitillä yö kuluu kulkuneuvossa, joten vain ruoka (lähtöpään A hintataso).
        /// </summary>
        public Paivakulu PaivakuluNyt(Pelaaja p = null)
        {
            p ??= P;
            bool matkalla = !p.Sijainti.Kaupungissa;
            string paikka = matkalla
                ? (p.Sijainti.Reitti != null && Verkko.Reitit.TryGetValue(p.Sijainti.Reitti, out var r) ? r.A : null)
                : p.Sijainti.Kaupunki;
            var taso = paikka != null ? HintatasoKaupungissa(paikka) : Hintataso.Keski;
            double kerroin = Talous.Kerroin(taso);
            int ruoka = Talous.Pyorista(Talous.PaivakuluRuoka * kerroin);
            int majoitus = matkalla ? 0 : Talous.Pyorista(Talous.PaivakuluMajoitus * kerroin);
            return new Paivakulu(ruoka, majoitus, taso, matkalla);
        }

        /// <summary>Montako päivää kassa riittää nykyisellä päiväkululla (web kassaRiittaa; kassarivin arvio).</summary>
        public int KassaRiittaa(Pelaaja p = null)
        {
            p ??= P;
            int k = PaivakuluNyt(p).Yhteensa;
            return k > 0 ? Math.Max(0, p.Raha - p.Rasti) / k : int.MaxValue;
        }

        /// <summary>
        /// Vuorokautta jäljellä ennen matkan päättymistä (web rahattomuuttaJaljella;
        /// kassarivin "rahat loppu · N vrk"); null ilman varoitusta.
        /// </summary>
        public int? RahattomuuttaJaljella(Pelaaja p = null)
        {
            p ??= P;
            if (p.Rahaton == null) return null;
            int vuoroja = Math.Max(0, Talous.RahattomuusVuoroja - (Tila.VuoroLaskuri - p.Rahaton.AlkuVuoro));
            int vuorojaPaivassa = 24 / Vakiot.VuoronTunnit;
            return (vuoroja + vuorojaPaivassa - 1) / vuorojaPaivassa;
        }

        void IlmoitaRahat(Pelaaja p, string tilanne, string otsikko, string ala = null)
        {
            Tapahtui?.Invoke("rahat", otsikko);
            Rahatilanne?.Invoke(p, tilanne, otsikko, ala);
        }

        /// <summary>
        /// Web kirjaaPelipaiva (pelistreak, Peli/Pelistreak.cs): pelaajan teko laitteen paikallisella
        /// päivällä 'yyyy-MM-dd'. Sama päivä uudelleen ei tee mitään; eilisen jatko kasvattaa
        /// laskuria, muu aloittaa alusta. Palkkio kassaan heti. Pudonnut pelaaja ja päättynyt
        /// peli eivät kirjaa. Palauttaa (pituus, palkkio) tai null (sama päivä, ei kirjausta).
        /// Päivä annetaan aina ulkoa: pelilogiikka ei lue kelloa.
        /// </summary>
        public (int Pituus, int Palkkio)? KirjaaPelipaiva(string paivays, Pelaaja p = null)
        {
            p ??= P;
            if (p == null || p.Pudonnut || Tila.Vaihe == Vaihe.Ohi || !Streak.Kelpaa(paivays)) return null;
            var ennen = p.Streak;
            if (ennen != null && ennen.Paiva == paivays) return null;
            int pituus = 1;
            string armo = null;
            if (ennen != null && Streak.Kelpaa(ennen.Paiva))
            {
                if (Streak.PaivaaLisaa(ennen.Paiva, 1) == paivays)
                {
                    pituus = ennen.Pituus + 1;
                    armo = ennen.Armo;
                }
                else if (Streak.PaivaaLisaa(ennen.Paiva, 2) == paivays)
                {
                    // Yksi väliin jäänyt päivä: armopäivä, jos edellinen on vähintään ikkunan päässä (web kirjaaPelipaiva).
                    string valissa = Streak.PaivaaLisaa(ennen.Paiva, 1);
                    if (!Streak.Kelpaa(ennen.Armo) || string.CompareOrdinal(Streak.PaivaaLisaa(ennen.Armo, Streak.Armoikkuna), valissa) <= 0)
                    {
                        pituus = ennen.Pituus + 1;
                        armo = valissa;
                    }
                }
            }
            p.Streak = new StreakTila { Paiva = paivays, Pituus = pituus, Armo = armo };
            int palkkio = Streak.Palkkio(pituus);
            if (palkkio > 0)
            {
                p.Raha += palkkio;
                Tapahtui?.Invoke("rahat", Streak.Lokirivi(pituus));
                Pelistreak?.Invoke(p, pituus, Streak.Otsikko(pituus), Streak.Ala(pituus));
            }
            return (pituus, palkkio);
        }

        /// <summary>
        /// Web veloitaPaivakulut: vuorokausi vaihtui, jokainen pudottamaton pelaaja
        /// maksaa ruoan ja majoituksen. Jos rahat eivät riitä, maksetaan mitä on, loppu
        /// jää rästiin ja alkaa kahden vuorokauden varoitus (TarkistaRahattomuus).
        /// </summary>
        public void VeloitaPaivakulut()
        {
            foreach (var p in Tila.Pelaajat)
            {
                if (p.Pudonnut) continue;
                var k = PaivakuluNyt(p);
                if (p.Raha >= k.Yhteensa)
                {
                    p.Raha -= k.Yhteensa;
                    PaivakuluVeloitettiin?.Invoke(p, k, k.Yhteensa);
                    continue;
                }
                int maksettu = p.Raha;
                p.Raha = 0;
                p.Rasti += k.Yhteensa - maksettu;
                PaivakuluVeloitettiin?.Invoke(p, k, maksettu);
                if (p.Rahaton == null)
                {
                    p.Rahaton = new Rahattomuus { AlkuVuoro = Tila.VuoroLaskuri, Paiva = Tila.Paiva() };
                    IlmoitaRahat(p, "peli.vararikko.varoitus", "Rahat lopussa — kaksi päivää aikaa",
                        "Tehtävät, visat ja aarteet tuovat rahaa. Maateitse pääsee ilmaiseksi.");
                }
            }
        }

        /// <summary>
        /// Web tarkistaRahattomuus: vuoron alussa kassa selvisi (rästi maksetaan, kun
        /// raha ≥ rästi + päiväkulu), vai ovatko kaksi vuorokautta kuluneet, jolloin matka päättyy.
        /// </summary>
        public void TarkistaRahattomuus(Pelaaja p = null)
        {
            p ??= P;
            if (p.Rahaton == null) return;
            int rasti = p.Rasti;
            if (p.Raha >= rasti + PaivakuluNyt(p).Yhteensa)
            {
                p.Raha -= rasti;
                p.Rasti = 0;
                p.Rahaton = null;
                IlmoitaRahat(p, "peli.vararikko.selvisi", "Kassa kunnossa");
                return;
            }
            if (Tila.VuoroLaskuri - p.Rahaton.AlkuVuoro >= Talous.RahattomuusVuoroja) PaataMatka(p);
        }

        /// <summary>
        /// Web paataMatka: rahat loppuivat eikä kassa noussut kahdessa vuorokaudessa.
        /// Yksinpelissä matka päättyy (Vaihe Ohi, Tila.MatkaPaattyi; loppukortti ja jatko
        /// viimeisestä turvatallennuksesta). Moninpelissä vain tämä pelaaja putoaa;
        /// viimeinen jäljellä oleva voittaa (Tila.ViimeinenMatkalla).
        /// </summary>
        public void PaataMatka(Pelaaja p)
        {
            p.Pudonnut = true;
            var kaupunki = p.Sijainti.Kaupungissa && Verkko.Kaupungit.TryGetValue(p.Sijainti.Kaupunki, out var k) ? k.Nimi : null;
            var jaljella = Tila.Pelaajat.Where(x => !x.Pudonnut).ToList();
            if (jaljella.Count == 0)
            {
                Tila.MatkaPaattyi = new MatkanLoppu { Pelaaja = p.Id, Kaupunki = kaupunki, Paiva = Tila.Paiva() };
                Tila.Vaihe = Vaihe.Ohi;
                return;
            }
            if (jaljella.Count == 1 && Tila.Pelaajat.Count > 1)
            {
                Tila.Vaihe = Vaihe.Ohi;
                return;
            }
            IlmoitaRahat(p, "peli.vararikko.loppu", $"{p.Nimi} putosi pelistä");
        }

        /// <summary>Web visitCity: kirjaa käydyksi ja kertoo saapumisesta.</summary>
        void KirjaaKaynti(Pelaaja p)
        {
            if (!p.Sijainti.Kaupungissa) return;
            bool uusi = p.Kaydyt.Add(p.Sijainti.Kaupunki);
            KirjaaKuljettu(p);
            Saapui?.Invoke(p, p.Sijainti.Kaupunki, uusi);
        }

        /// <summary>
        /// Kuljettu reitti kasvoi (pelaaja, edellinen piste tai null, uusi piste): Elävä kartta kohta 4.
        /// Tulee logiikan hetkellä, ennen kamera-ajon loppua (PeliOhjain lykkää sen perille).
        /// </summary>
        public event Action<Pelaaja, KuljettuPiste, KuljettuPiste> KuljettuKasvoi;

        /// <summary>Uusi kaupunki reitin perään (sama kaupunki peräkkäin ei kasvata reittiä).</summary>
        void KirjaaKuljettu(Pelaaja p)
        {
            var kaupunki = p.Sijainti.Kaupunki;
            var edellinen = p.Kuljettu.Count > 0 ? p.Kuljettu[p.Kuljettu.Count - 1] : null;
            if (edellinen?.Kaupunki == kaupunki) return;
            // Nopan siirrossa tapa on esivalittu tai oletus maitse (Heita: Kulkutapa ?? Maa).
            var tapa = Tila.Kulkutapa ?? (Tila.Vaihe == Vaihe.Siirto ? Kulkutapa.Maa : (Kulkutapa?)null);
            var uusi = new KuljettuPiste(kaupunki, tapa);
            p.Kuljettu.Add(uusi);
            KuljettuKasvoi?.Invoke(p, edellinen, uusi);
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
            // Odota (web 'wait'): vuoro kuluu paikallaan.
            if (tapa == Kulkutapa.Odota)
            {
                PaataVuoro();
                return TekoTulos.Onnistui();
            }
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
