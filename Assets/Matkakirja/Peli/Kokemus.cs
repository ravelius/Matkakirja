// KOKEMUS: tietäjäpisteet (web player.xp), tietäjätasot ja tietoprosentti
// suorana porttina verkkopelin js/game.js:stä (awardXp,
// tarkistaLinssikynnys, tarkistaTietajataso, visitCity, countAnswer,
// knowledgePercent) ja js/tietajatasot.js:stä (TIETAJATASOT,
// tietajataso, seuraavaTietajataso, tietajatasonNousut, tietajatasonOsuus).
//
// Anna() on AINOA portti, jonka läpi pisteet kulkevat (web awardXp):
// laattojen löydöt (Laatat.cs Loyto.TpLisays), kysymykset ja saapumiset
// kutsuvat sitä, jotta tasonnousut ja linssikynnykset huomataan kerran.
//
// KOUKUT:
//   KynnysYlitetty — web tarkistaLinssikynnys (linssit/omistus.js
//                    tarkistaKynnys): linssien omistus asuu passissa, joka
//                    ei kuulu pelilogiikkaan. Kutsutaan joka lisäyksellä.
//   TasoNousi      — web tarkistaTietajataso: pöllön onnittelukupla.
//                    Nousut jäävät myös jonoon NousuJono (web tietajaNousut),
//                    jonka käyttöliittymä tyhjentää OtaNousut()-kutsulla.
using System;
using System.Collections.Generic;

namespace Matkakirja.Peli
{
    /// <summary>Tietäjätaso (web TIETAJATASOT[i]).</summary>
    public sealed class Tietajataso
    {
        public int Taso;
        public string Nimi;
        public int Raja;
        public string Varssy;
        public string Onnittelu;
    }

    public sealed class Kokemus
    {
        // --- vakiot (js/game.js) --------------------------------------------

        public const int UusiKaupunki = 10;    // XP_NEW_CITY
        public const int UusiLauta = 50;       // XP_NEW_BOARD
        public const int VaikeaVastaus = 25;   // XP_HARD_ANSWER
        public const int Paaaarre = 100;       // XP_STAR
        public const int Pulma = 25;           // XP_PUZZLE
        public const int Tutkiminen = 15;      // XP_EXPLORE
        public const int Ennatys = 200;        // XP_RECORD
        public const string Lyhenne = "tp";    // TIETAJAPISTE_LYHENNE

        /// <summary>Web TIETAJATASOT (js/tietajatasot.js), rajat nousevassa järjestyksessä.</summary>
        public static readonly IReadOnlyList<Tietajataso> Tasot = new[]
        {
            new Tietajataso { Taso = 1, Nimi = "Untuvikko", Raja = 0,
                Varssy = "Pieni on pesästä lähtö, / suuri siitä tie alkavi.",
                Onnittelu = "Matka alkaa, Untuvikko! Isoisä kirjoitti ensimmäiselle sivulleen, että jokainen maailmanmatka alkaa yhdestä ainoasta askeleesta." },
            new Tietajataso { Taso = 2, Nimi = "Utelias kulkija", Raja = 150,
                Varssy = "Kysyvä ei tiellä eksy, / utelias uran löytää.",
                Onnittelu = "Sinusta on tullut Utelias kulkija! Kysymykset ovat matkan paras eväs — isoisäsi täytti niillä kokonaisen vihkon ennen lähtöä." },
            new Tietajataso { Taso = 3, Nimi = "Kartanlukija", Raja = 400,
                Varssy = "Monta on polkua maalla, / kartta kaikki kertoelee.",
                Onnittelu = "Sinusta on tullut Kartanlukija! Isoisäsi hymyilisi — kartta aukeaa sille, joka on oppinut katsomaan." },
            new Tietajataso { Taso = 4, Nimi = "Maailmanmatkaaja", Raja = 800,
                Varssy = "Matka kulkijansa mittaa, / maailma sylin avavi.",
                Onnittelu = "Sinusta on tullut Maailmanmatkaaja! Sen nimen isoisäsi kirjoitti passiinsa ammatiksi — nyt se on sinunkin." },
            new Tietajataso { Taso = 5, Nimi = "Löytöretkeilijä", Raja = 1400,
                Varssy = "Rohkea rajoille astuu, / löytäjälle maat aukeevat.",
                Onnittelu = "Sinusta on tullut Löytöretkeilijä! Aarni olisi kohottanut hattuaan: löytäminen alkaa siitä, että uskaltaa lähteä." },
            new Tietajataso { Taso = 6, Nimi = "Tarinankerääjä", Raja = 2200,
                Varssy = "Sanat saappaissa kulkevat, / tarinat tulevat kotiin.",
                Onnittelu = "Sinusta on tullut Tarinankerääjä! Isoisä sanoi, että matkalta tuodaan kotiin vain kahta lajia tavaraa: pölyä saappaissa ja tarinoita." },
            new Tietajataso { Taso = 7, Nimi = "Aarteentuntija", Raja = 3200,
                Varssy = "Kiilto ei kultaa todista, / tuntija todeksi tietää.",
                Onnittelu = "Sinusta on tullut Aarteentuntija! Nyt erotat kiillosta sen, mikä on oikeasti unohdettua — juuri sitä Aarnin luettelo vaatii." },
            new Tietajataso { Taso = 8, Nimi = "Maailmantuntija", Raja = 4500,
                Varssy = "Nimet muuttuvat paikoiksi, / paikat muistoiksi muuttuvat.",
                Onnittelu = "Sinusta on tullut Maailmantuntija! Maailma ei ole enää nimiä kartalla vaan paikkoja, joissa olet ollut." },
            new Tietajataso { Taso = 9, Nimi = "Isoisän perillinen", Raja = 6000,
                Varssy = "Kirja kädestä käteen käy, / tieto suvussa syvenee.",
                Onnittelu = "Sinusta on tullut Isoisän perillinen! Vuoden 1873 matkapäiväkirja on nyt yhtä paljon sinun kuin hänen." },
            new Tietajataso { Taso = 10, Nimi = "Tietäjä iänikuinen", Raja = 8000,
                Varssy = "Sanat saatu, synnyt tietty, / tie vie tietäjän kotihin.",
                Onnittelu = "Sinusta on tullut Tietäjä iänikuinen! Aarni, isoisäsi ja sinä — kolme nimeä samassa luettelossa. Kauemmas tämä matka ei vie." },
        };

        /// <summary>Web tietajataso(pisteet): suurin taso, jonka raja on saavutettu.</summary>
        public static Tietajataso TasoPisteille(int pisteet)
        {
            var osuma = Tasot[0];
            foreach (var t in Tasot)
            {
                if (pisteet >= t.Raja) osuma = t;
                else break;
            }
            return osuma;
        }

        /// <summary>Web seuraavaTietajataso: seuraava taso tai null huipulla.</summary>
        public static Tietajataso SeuraavaTaso(int pisteet)
        {
            foreach (var t in Tasot) if (pisteet < t.Raja) return t;
            return null;
        }

        /// <summary>Web tietajatasonNousut(ennen, jälkeen): ylitetyt rajat (taso 1 ei ole nousu).</summary>
        public static List<Tietajataso> Nousut(int ennen, int jalkeen)
        {
            var l = new List<Tietajataso>();
            if (jalkeen <= ennen) return l;
            foreach (var t in Tasot)
                if (t.Raja > 0 && t.Raja > ennen && t.Raja <= jalkeen) l.Add(t);
            return l;
        }

        /// <summary>Web tietajatasonOsuus: edistyminen kohti seuraavaa tasoa 0..1.</summary>
        public static double TasonOsuus(int pisteet)
        {
            var nyt = TasoPisteille(pisteet);
            var seuraava = SeuraavaTaso(pisteet);
            if (seuraava == null) return 1;
            double matka = seuraava.Raja - nyt.Raja;
            if (matka <= 0) return 1;
            return Math.Min(1, Math.Max(0, (pisteet - nyt.Raja) / matka));
        }

        // --- pelikohtainen osa ------------------------------------------------

        public Pelitila Tila { get; }

        /// <summary>Tietäjätason nousut odottamassa pöllön kuplaa (web tietajaNousut). Ei tallenneta.</summary>
        public readonly List<Tietajataso> NousuJono = new List<Tietajataso>();

        /// <summary>Pisteet ylittivät rajoja: (pelaaja, ennen, jälkeen). Web tarkistaLinssikynnys.</summary>
        public Action<Pelaaja, int, int> KynnysYlitetty;
        /// <summary>Pelaaja nousi tasolle (web tarkistaTietajataso; say-rivi ja kupla).</summary>
        public event Action<Pelaaja, Tietajataso> TasoNousi;

        public Kokemus(Pelitila tila) { Tila = tila ?? throw new ArgumentNullException(nameof(tila)); }

        /// <summary>
        /// Kytkee saapumisen pisteet ja havainnon matkaan (web visitCity):
        /// laudan ensimmäinen kaupunki +50 (uusi lauta), jokainen uusi
        /// kaupunki +10, ja joka saapuminen päivittää havainnon.
        /// </summary>
        public void Kytke(Matka matka)
        {
            matka.Saapui += Saapui;
        }

        /// <summary>Web visitCity (pisteosa). Matka on jo kirjannut käynnin, joten tyhjä lauta = 1 käynti.</summary>
        public void Saapui(Pelaaja p, string kaupunki, bool uusi)
        {
            Tila.Kysely.Havainto = kaupunki;
            if (!uusi) return;
            if (p.Kaydyt.Count == 1) Anna(p, UusiLauta);
            Anna(p, UusiKaupunki);
        }

        /// <summary>Web awardXp: ainoa pisteportti. Palauttaa annetun määrän.</summary>
        public int Anna(Pelaaja p, int maara)
        {
            int ennen = p.Xp;
            p.Xp = ennen + maara;
            KynnysYlitetty?.Invoke(p, ennen, p.Xp);
            foreach (var t in Nousut(ennen, p.Xp))
            {
                if (!p.Botti) NousuJono.Add(t);
                TasoNousi?.Invoke(p, t);
            }
            return maara;
        }

        /// <summary>Web takeTietajaNousut: palauttaa ja tyhjentää jonon.</summary>
        public List<Tietajataso> OtaNousut()
        {
            var l = new List<Tietajataso>(NousuJono);
            NousuJono.Clear();
            return l;
        }

        /// <summary>Web countAnswer: tietoprosentin laskurit.</summary>
        public static void KirjaaVastaus(Pelaaja p, bool oikein)
        {
            p.Kysytty++;
            if (oikein) p.Oikein++;
        }

        /// <summary>Web knowledgePercent: Math.round(oikein / kysytty × 100); null ennen ensimmäistä.</summary>
        public static int? Tietoprosentti(Pelaaja p)
        {
            if (p.Kysytty == 0) return null;
            return (int)Math.Floor((double)p.Oikein / p.Kysytty * 100 + 0.5);
        }
    }
}
