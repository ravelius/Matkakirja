// MATKA: matkustuksen tilakone, suora portti verkkopelin js/game.js
// Game-luokasta (beginTurn, endTurn, travelModes, busDestinations,
// airportDestinations, actionTravel, actionCancelTravel, actionRoll,
// actionMove, actionBus, actionFly, needsAid, rollDie). Kultainen jälki
// Kultaiset/matkajalki.json (Kultaiset/tee-matkajalki.mjs) vaatii, että
// sama käsikirjoitus tuottaa täsmälleen saman tilan joka teon jälkeen.
//
// TÄMÄN ERÄN LAAJUUS: yksinpeli vaellustilassa (roaming), matkustus,
// saapuminen, raha ja aika. Laatat, kysymykset, kaksintaistelut, XP ja
// pulmat puuttuvat; niille on koukut (erä 2: Peli/Kysely.cs asettaa kaksi
// ensimmäistä ja Peli/Kokemus.cs kuuntelee Saapui-tapahtumaa):
//   TehtavaTarjolla  — web tehtavaTarjolla: tuo 'stay'-tavan (Pysy)
//   Tutki            — web actionQuiz: mitä Pysy tekee
//   Tavoitteet       — web needsAid: laattakaupungit (null = kaikki, kuten
//                      alussa, kun jokaisessa kaupungissa on laatta)
//   PysaytaSaapuessa — web offerQuiz: tosi → vuoro ei pääty saapumiseen
//                      (seuraava erä asettaa Vaihe.Kysymys)
//   Saapui           — web visitCity: XP, arrivalFact ja lehti kuuntelevat tätä
// checkWin puuttuu: vaelluksessa se on aina epätosi.
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

        // --- koukut myöhemmille erille ---------------------------------------

        /// <summary>Onko kaupungissa tehtävä (laatta, pulma, kohtaaminen) → 'stay'. Oletus: ei.</summary>
        public Func<Pelaaja, bool> TehtavaTarjolla;
        /// <summary>Pysy-tavan teko (web actionQuiz). Ilman koukkua Pysy ei ole käytettävissä.</summary>
        public Func<Pelaaja, TekoTulos> Tutki;
        /// <summary>Pankkiavun tavoitekaupungit (web tokens). null = kaikki kaupungit.</summary>
        public Func<IEnumerable<string>> Tavoitteet;
        /// <summary>Saapumispysähdys (web offerQuiz). Tosi → vuoro ei pääty.</summary>
        public Func<Pelaaja, bool> PysaytaSaapuessa;

        /// <summary>Pelaaja saapui kaupunkiin (pelaaja, kaupunki, ensikäynti). Web visitCity.</summary>
        public event Action<Pelaaja, string, bool> Saapui;
        /// <summary>Näytölle animoitava tapahtuma (web emit): laji 'fare', 'flight', 'aid', 'stuck'.</summary>
        public event Action<string, string> Tapahtui;

        public Matka(IReittiverkko verkko, Satunnainen satunnainen, Pelitila tila = null)
        {
            Verkko = verkko ?? throw new ArgumentNullException(nameof(verkko));
            Satunnainen = satunnainen ?? throw new ArgumentNullException(nameof(satunnainen));
            Tila = tila ?? new Pelitila();
        }

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

        /// <summary>
        /// Kuten UusiPeli, mutta ensimmäinen vuoro jää aloittamatta: kutsuja
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
        public static Matka Lataa(IReittiverkko verkko, string json)
        {
            var tila = Pelitila.FromJson(json);
            var rng = new Satunnainen((long)tila.Siemen);
            rng.Kelaa(tila.Arvontoja);
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
        /// rahoilla saavutettavissa. Vaellustilassa tavoitteet ovat laatat.
        /// </summary>
        public bool TarvitseeApua(Pelaaja p)
        {
            if (!Kulkutavat(p).Any(t => t != Kulkutapa.Pysy)) return true;
            var tavoitteet = new HashSet<string>(Tavoitteet?.Invoke() ?? Verkko.Kaupungit.Keys);
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
    }
}
