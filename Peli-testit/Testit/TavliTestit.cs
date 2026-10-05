// Tavli (Peli/Pelit/Tavli.cs, Portes) ja sen botti (Peli/Pelit/TavliBotti.cs): alkuasetelma, pakkosäännöt, tuplat,
// palkki ja sisääntulo, lyönti, poisto, voitto, osumatodennäköisyydet (koko 36 heiton luettelo, ristiintarkistus
// vuorogeneraattorilla), deduplikointi, askel kerrallaan -eteneminen, Tee/Peru sekä botin tasot ja nopeus.
// ./kaanna.sh Tavli. Täysi botin mittaus (400 + 400 peliä, ~3–5 min): TAVLI_TAYSI=1 ./kaanna.sh TavliTestit.BotinTaysiMittaus
// Mittaus 5.10.2026 (Mac Studio, kuormitettu kone): vaikea–helppo 307/400 (76,8 %), vaikea–normaali 260/400 (65,0 %).
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using Matkakirja.Peli.Pelit;

namespace Matkakirja.Peli.Testit
{
    public static class TavliTestit
    {
        /// <summary>Asema lyhyesti: "13:2 20:1 8:-2" (piste:määrä, + vaalea, − tumma); muut nappulat poistettuja.</summary>
        static Tavli A(string pisteet, int palkki0 = 0, int palkki1 = 0, int vuoro = 0)
        {
            var p = new int[24];
            foreach (var osa in pisteet.Split(' ', StringSplitOptions.RemoveEmptyEntries))
            {
                var ab = osa.Split(':');
                p[int.Parse(ab[0], CultureInfo.InvariantCulture)] = int.Parse(ab[1], CultureInfo.InvariantCulture);
            }
            return Tavli.Asemasta(string.Join(",", p.Select(x => x.ToString(CultureInfo.InvariantCulture))) + "|" + palkki0 + "," + palkki1 + "|" + vuoro);
        }

        static List<TavliAskel> Askeleet(Tavli t) { var l = new List<TavliAskel>(); t.LaillisetAskeleet(l); return l; }
        static string Vuorot(Tavli t) => string.Join(" / ", t.LaillisetVuorot().Select(v => v.ToString()));

        [Testi] static void Alkuasetelma()
        {
            var t = new Tavli();
            for (int p = 0; p < 2; p++)
            {
                int n = Enumerable.Range(0, 24).Where(i => t.Omistaja(i) == p).Sum(i => t.Maara(i));
                Oleta.Sama(15, n, $"pelaajalla {p} 15 laudalla");
                Oleta.Sama(167, t.Pip(p), $"pip {p}");
                Oleta.Sama(0, t.Palkilla(p));
                Oleta.Sama(0, t.Poistettu(p));
            }
            // Vaalean koti a0–a5 (oikea alanurkka): 5 nappulaa a5:ssä, takimmaiset 2 a23:ssa (tumman koti).
            Oleta.Sama("0:5 0:3 0:5 0:2", $"{t.Omistaja(5)}:{t.Maara(5)} {t.Omistaja(7)}:{t.Maara(7)} {t.Omistaja(12)}:{t.Maara(12)} {t.Omistaja(23)}:{t.Maara(23)}");
            Oleta.Sama("1:2 1:5 1:3 1:5", $"{t.Omistaja(0)}:{t.Maara(0)} {t.Omistaja(11)}:{t.Maara(11)} {t.Omistaja(16)}:{t.Maara(16)} {t.Omistaja(18)}:{t.Maara(18)}");
            Oleta.Sama(Tavli.Alkuasema, t.Asema());
            Oleta.Sama(t.Asema(), Tavli.Asemasta(t.Asema()).Asema(), "Asema ↔ Asemasta");
            Oleta.Sama((int?)null, t.Lopputulos());
            Oleta.Sama(1, new Tavli(1).Vuorossa, "aloittaja");
        }

        [Testi] static void PakkosaantoMolemmatNopat()
        {
            // Vaalea a13 ja a20, heitto 6-5. Tumma sulkee a8, a9 ja a2. 20→14 (6) jättäisi viitosen käyttämättä
            // (14→9 ja 13→8 suljettu), joten sitä ei tarjota: ainoa laillinen vuoro käyttää molemmat nopat.
            var t = A("13:1 20:1 8:-2 9:-2 2:-2");
            t.AsetaHeitto(6, 5);
            var v = t.LaillisetVuorot();
            Oleta.Sama(1, v.Count, Vuorot(t));
            Oleta.Sama(2, v[0].Pituus);
            Oleta.Sama(2, t.AskeleitaVuorossa);
            var eka = Askeleet(t);
            Oleta.Sama("a13→a7 (6), a20→a15 (5)", string.Join(", ", eka), "askel kerrallaan sama pakko");
            Oleta.Tosi(t.EtsiAskel(20, 14) == null, "20→14 ei kelpaa");
        }

        [Testi] static void PakkosaantoSuurempiNoppa()
        {
            // Yksi nappula a13, heitto 6-5, a2 suljettu: kumpikin noppa yksinään käy, mutta ei molemmat → suurempi (6).
            var t = A("13:1 2:-2");
            t.AsetaHeitto(5, 6);
            Oleta.Sama("a13→a7 (6)", Vuorot(t));
            Oleta.Sama("a13→a7 (6)", string.Join(", ", Askeleet(t)));
            // Jos 6 ei käy lainkaan (a7 suljettu), pienempi pelataan.
            var k = A("13:1 2:-2 7:-2");
            k.AsetaHeitto(6, 5);
            Oleta.Sama("a13→a8 (5)", Vuorot(k));
        }

        [Testi] static void TuplatNeljaAskelta()
        {
            var t = new Tavli();
            t.AsetaHeitto(6, 6);
            Oleta.Sama("6,6,6,6", string.Join(",", t.Jaljella));
            var v = t.LaillisetVuorot();
            Oleta.Tosi(v.Count > 1 && v.All(x => x.Pituus == 4 && x.Askeleet.All(s => s.Noppa == 6)), Vuorot(t));
            // Askel kerrallaan: neljä askelta, sitten valmis.
            for (int i = 0; i < 4; i++) { Oleta.Tosi(!t.VoiLopettaa(), "kesken"); t.TeeAskel(Askeleet(t)[0]); }
            Oleta.Sama(0, t.Jaljella.Count);
            Oleta.Tosi(t.VoiLopettaa(), "neljän jälkeen valmis");
            t.LopetaVuoro();
            Oleta.Sama(1, t.Vuorossa);
        }

        [Testi] static void PalkiltaSisaanEnsin()
        {
            var t = A("12:5 7:3 5:5 18:-5 0:-2", palkki0: 2);
            t.AsetaHeitto(3, 1);
            Oleta.Tosi(Askeleet(t).All(s => s.Palkilta), "ensin palkilta");
            Oleta.Tosi(t.LaillisetVuorot().All(v => v.Askeleet.All(s => s.Palkilta)), "kaksi palkilla → molemmat nopat sisääntuloon: " + Vuorot(t));
            Oleta.Sama("a21,a23", string.Join(",", t.LaillisetVuorot().Single().Askeleet.Select(s => Tavli.PisteenNimi(s.Mihin)).OrderBy(x => x)));
            // Yksi palkilla: ensimmäinen askel palkilta, toinen vapaa.
            var k = A("12:5 7:3 5:6 18:-5 0:-2", palkki0: 1);
            k.AsetaHeitto(3, 1);
            Oleta.Tosi(Askeleet(k).All(s => s.Palkilta), "yksi palkilla: ensin sisään");
            Oleta.Tosi(k.LaillisetVuorot().All(v => v.Askeleet.Count(s => s.Palkilta) == 1), "toinen askel vapaa");
        }

        [Testi] static void SisaantuloEstyySuljetulle()
        {
            // Tumma sulkee a21 ja a23 (vaalean sisääntulot nopilla 3 ja 1) → ei siirtoja; vuoro on tyhjä ja valmis.
            var t = A("12:5 5:5 21:-2 23:-2", palkki0: 1);
            t.AsetaHeitto(3, 1);
            Oleta.Sama(0, t.AskeleitaVuorossa);
            Oleta.Sama("ei siirtoa", Vuorot(t));
            Oleta.Tosi(t.VoiLopettaa(), "tyhjä vuoro valmis heti");
            t.LopetaVuoro();
            Oleta.Sama(1, t.Vuorossa);
            // Vain a23 suljettu: sisään kolmosella a21:een, sitten ykkönen vapaasti.
            var k = A("12:5 5:5 23:-2", palkki0: 1);
            k.AsetaHeitto(3, 1);
            Oleta.Sama("a21", string.Join(",", Askeleet(k).Select(s => Tavli.PisteenNimi(s.Mihin))));
            // Tumma palkilta: noppa d → a(d − 1).
            var m = A("0:2 12:-5", palkki1: 1, vuoro: 1);
            m.AsetaHeitto(2, 1);
            Oleta.Sama("a1", string.Join(",", Askeleet(m).Select(s => Tavli.PisteenNimi(s.Mihin))), "a0 suljettu, a1 auki");
        }

        [Testi] static void LyontiPalkille()
        {
            // Vaalea a10, tumman yksinäinen a7: 3 lyö.
            var t = A("10:1 5:2 7:-1 18:-2");
            t.AsetaHeitto(3, 2);
            var s = t.TeeAskel(new TavliAskel(10, 7, 3));
            Oleta.Tosi(s.Lyonti, "lyönti tunnistettu");
            Oleta.Sama(1, t.Palkilla(1));
            Oleta.Sama(0, t.Omistaja(7));
            t.PeruAskel();
            Oleta.Sama(0, t.Palkilla(1));
            Oleta.Sama(1, t.Omistaja(7), "peru palauttaa lyödyn");
            // Lyöty tulee sisään vaalean kotialueelle (tumma: noppa d → a(d − 1)) ja voi lyödä takaisin.
            t.TeeAskel(new TavliAskel(10, 7, 3));
            t.TeeAskel(Askeleet(t).First());
            t.LopetaVuoro();
            t.AsetaHeitto(3, 4);
            Oleta.Tosi(Askeleet(t).All(x => x.Palkilta), "tumman ensin palkilta");
        }

        [Testi] static void PoistoVainKaikkiKotona()
        {
            var t = A("6:1 3:4 1:10 20:-2");
            t.AsetaHeitto(6, 2);
            Oleta.Tosi(t.LaillisetVuorot().SelectMany(v => v.Askeleet).All(s => !s.Poisto || s.Mista != 6), "a6 ei kotona");
            Oleta.Tosi(Askeleet(t).All(s => !s.Poisto), "ensimmäinen askel ei voi olla poisto");
            // Kun a6 tuodaan kotiin (6→4 kakkosella), kuutonen poistaa kauimmaisen.
            Oleta.Tosi(t.LaillisetVuorot().Any(v => v.Askeleet.Length == 2 && v.Askeleet[0].Mista == 6 && v.Askeleet[1].Poisto), Vuorot(t));
            var k = A("5:1 3:4 1:10 20:-2");
            k.AsetaHeitto(6, 4);
            Oleta.Tosi(Askeleet(k).Any(s => s.Poisto), "kaikki kotona → poisto");
        }

        [Testi] static void SuurempiSilmalukuPoistaaKauimmaisen()
        {
            // Vaalea a2 (etäisyys 3) ja a0 (1): kuutonen poistaa vain a2:n (kauimmainen); a0 vasta kun a2 on poissa.
            var t = A("2:1 0:1 20:-2");
            t.AsetaHeitto(6, 5);
            var eka = Askeleet(t);
            Oleta.Tosi(eka.Any(s => s.Mista == 2 && s.Poisto && s.Noppa == 6), "kuutonen a2:sta");
            Oleta.Tosi(!eka.Any(s => s.Mista == 0 && s.Poisto), "a0 ei ensin (kauempana a2)");
            Oleta.Sama(1, t.LaillisetVuorot().Count, "molemmat pois: " + Vuorot(t));
            // Tarkka silmäluku: a4 (5) nopalla 5; kuutosella a4 vain jos a5 tyhjä.
            var k = A("5:1 4:1 20:-2");
            k.AsetaHeitto(6, 5);
            var l = Askeleet(k);
            Oleta.Tosi(l.Any(s => s.Mista == 5 && s.Noppa == 6 && s.Poisto) && l.Any(s => s.Mista == 4 && s.Noppa == 5 && s.Poisto), "tarkat");
            Oleta.Tosi(!l.Any(s => s.Mista == 4 && s.Noppa == 6), "kuutonen ei a4:stä, kun a5 kauempana");
        }

        [Testi] static void VoittoJaMars()
        {
            var t = A("0:1 20:-2");
            t.AsetaHeitto(2, 1);
            Oleta.Sama(1, t.LaillisetVuorot().Count);
            t.TeeVuoro(t.LaillisetVuorot()[0]);
            Oleta.Sama((int?)0, t.Lopputulos(), "vaalea voitti");
            // Tumma on poistanut 13 (vain 2 laudalla) → tavallinen voitto.
            Oleta.Sama(1, t.Voittolaji());
            var m = A("0:1 20:-15");
            m.AsetaHeitto(1, 1);
            m.TeeVuoro(m.LaillisetVuorot()[0]);
            Oleta.Sama(2, m.Voittolaji(), "mars");
            var b = A("0:1 20:-14 3:-1");
            b.AsetaHeitto(1, 2);
            b.TeeVuoro(b.LaillisetVuorot()[0]);
            Oleta.Sama(3, b.Voittolaji(), "backgammon: tumma voittajan kotialueella");
            Oleta.Tosi(Askeleet(b).Count == 0, "päättyneessä ei askeleita");
        }

        /// <summary>Tunnetut osumamäärät 36:sta suoralla etäisyydellä tyhjällä välillä (1–12 ja tuplien kaukolaukaukset).</summary>
        static readonly int[] TunnetutOsumat = { 0, 11, 12, 14, 15, 15, 17, 6, 6, 5, 3, 2, 3, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0 };

        /// <summary>Ristiintarkistus vuorogeneraattorilla: ne 36 järjestetyistä heitoista, joilla jokin ampujan laillinen
        /// kokonainen vuoro lyö kohteessa olevan puolustajan.</summary>
        static List<(int, int)> OsuvatGeneraattorilla(Tavli t, int kohde, int ampuja)
        {
            var l = new List<(int, int)>();
            var vuorot = new List<TavliVuoro>();
            for (int a = 1; a <= 6; a++)
                for (int b = 1; b <= 6; b++)
                {
                    t.Generoi(ampuja, a, b, vuorot);
                    bool osuu = false;
                    foreach (var v in vuorot)
                    {
                        foreach (var s in v.Askeleet) t.Siirra(ampuja, s);
                        if (t.Omistaja(kohde) != 1 - ampuja) osuu = true;
                        for (int i = v.Askeleet.Length - 1; i >= 0; i--) t.Palauta(ampuja, v.Askeleet[i]);
                    }
                    if (osuu) l.Add((a, b));
                }
            return l;
        }

        static string Heitot(IEnumerable<(int, int)> l) => string.Join(" ", l.Select(h => $"{h.Item1}{h.Item2}"));

        [Testi] static void OsumatodennakoisyydetSuorallaEtaisyydella()
        {
            // Tumma ampuja a0:ssa, vaalean yksinäinen a(d): etäisyys d.
            for (int d = 1; d <= 23; d++)
            {
                var t = A($"{d}:1 0:-1");
                var lista = Tavli.OsuvatHeitot(t, d, 1);
                Oleta.Sama(TunnetutOsumat[d], lista.Count, $"etäisyys {d}");
                Oleta.Sama(lista.Count, Tavli.OsumaTodennakoisyys(t, d, 1));
                Oleta.Sama(Heitot(OsuvatGeneraattorilla(t, d, 1)), Heitot(lista), $"36 heiton luettelo, etäisyys {d}");
            }
            // Koko luettelo kahdelle etäisyydelle.
            Oleta.Sama("11 12 13 14 15 16 21 31 41 51 61", Heitot(Tavli.OsuvatHeitot(A("1:1 0:-1"), 1, 1)));
            Oleta.Sama("16 25 34 43 52 61", Heitot(Tavli.OsuvatHeitot(A("7:1 0:-1"), 7, 1)));
            // Vaalea ampujana (liikkuu alaspäin): sama luku peilattuna.
            Oleta.Sama(17, Tavli.OsumaTodennakoisyys(A("17:-1 23:1"), 17, 0), "vaalea, etäisyys 6");
        }

        [Testi] static void OsumatodennakoisyysEstetyllaValilla()
        {
            // Etäisyys 8, välissä a4 suljettu (vaalea 2 nappulaa): 4-4 ja 2-2 estyvät, 6-2 ja 5-3 käyvät → 4/36.
            var t = A("8:1 4:2 0:-1");
            Oleta.Sama(4, Tavli.OsumaTodennakoisyys(t, 8, 1));
            Oleta.Sama(Heitot(OsuvatGeneraattorilla(t, 8, 1)), Heitot(Tavli.OsuvatHeitot(t, 8, 1)));
            // Etäisyys 3, välissä a1 ja a2 suljettu: vain suora 3 (11) ja 1-1 estyy, 2-1 estyy → 11/36.
            var k = A("3:1 1:2 2:2 0:-1");
            Oleta.Sama(11, Tavli.OsumaTodennakoisyys(k, 3, 1));
            Oleta.Sama(Heitot(OsuvatGeneraattorilla(k, 3, 1)), Heitot(Tavli.OsuvatHeitot(k, 3, 1)));
            // Kohteessa kaksi → ei lyötävää.
            Oleta.Sama(0, Tavli.OsumaTodennakoisyys(A("5:2 0:-1"), 5, 1));
        }

        [Testi] static void OsumatodennakoisyysPalkilta()
        {
            // Tumma palkilla (sisääntulo a(d − 1)), vaalean yksinäinen a2 (sisääntulo kolmosella).
            var yksi = A("2:1 10:2", palkki1: 1, vuoro: 1);
            Oleta.Sama(14, Tavli.OsumaTodennakoisyys(yksi, 2, 1), "yksi palkilla: kuin etäisyys 3");
            Oleta.Sama(Heitot(OsuvatGeneraattorilla(yksi, 2, 1)), Heitot(Tavli.OsuvatHeitot(yksi, 2, 1)));
            // Kaksi palkilla: ei-tuplissa vain sisääntulo voi osua (10), tuplista 3-3 ja 1-1 (kaksi sisään, kaksi askelta).
            var kaksi = A("2:1 10:2", palkki1: 2, vuoro: 1);
            Oleta.Sama(12, Tavli.OsumaTodennakoisyys(kaksi, 2, 1));
            Oleta.Sama(Heitot(OsuvatGeneraattorilla(kaksi, 2, 1)), Heitot(Tavli.OsuvatHeitot(kaksi, 2, 1)));
            // Yksi palkilla ja laudalla ampuja a14, kohde a17: muu nappula voi lyödä vain sillä nopalla, jota ei tarvita sisääntuloon.
            var muu = A("17:1 14:-1 3:2", palkki1: 1, vuoro: 1);
            Oleta.Sama(Heitot(OsuvatGeneraattorilla(muu, 17, 1)), Heitot(Tavli.OsuvatHeitot(muu, 17, 1)), "sisääntulo + toinen noppa");
        }

        [Testi] static void SisaantuloTodennakoisyys()
        {
            Oleta.Sama(27, Tavli.SisaantuloTodennakoisyys(3), "3 suljettua");
            Oleta.Sama("36,35,32,27,20,11,0", string.Join(",", Enumerable.Range(0, 7).Select(Tavli.SisaantuloTodennakoisyys)));
            // Asemasta: tumma sulkee a18, a20, a22 (vaalean sisääntulot 6, 4, 2) → 27 heitosta 36:sta vaalea pääsee sisään.
            var t = A("5:3 18:-2 20:-2 22:-2", palkki0: 1);
            Oleta.Sama(3, t.SuljetutSisaantulot(0));
            int sisaan = 0;
            var v = new List<TavliVuoro>();
            for (int a = 1; a <= 6; a++) for (int b = 1; b <= 6; b++) if (t.Generoi(0, a, b, v) > 0) sisaan++;
            Oleta.Sama(27, sisaan, "generaattori samaa mieltä");
            Oleta.Sama("Sisääntulo 27/36 (75 %)", t.Todennakoisyysrivi(0));
        }

        [Testi] static void Todennakoisyysrivi()
        {
            var t = A("7:1 12:2 0:-1 11:-2");
            Oleta.Sama("a7 osuma 6/36 (17 %)", t.Todennakoisyysrivi(0));
            Oleta.Sama("", A("7:2 0:-1").Todennakoisyysrivi(0));
        }

        [Testi] static void DeduplikointiAsematiivisteella()
        {
            // Yksi nappula, 2-1: 20→18→17 ja 20→19→17 ovat sama lopputila.
            var t = A("20:1 0:-2");
            t.AsetaHeitto(2, 1);
            Oleta.Sama(1, t.LaillisetVuorot().Count, Vuorot(t));
            // Kaksi nappulaa: a→a−2 & b→b−1, a→a−1 & b→b−2, a→a−3, b→b−3.
            var k = A("20:1 15:1 0:-2");
            k.AsetaHeitto(2, 1);
            Oleta.Sama(4, k.LaillisetVuorot().Count, Vuorot(k));
            // Alkuasema: kaikki lopputilat erilaisia, ja jokainen tunnettu avaus mukana.
            foreach (var (a, b) in new[] { (3, 1), (6, 6), (2, 1), (5, 5) })
            {
                var al = new Tavli();
                al.AsetaHeitto(a, b);
                var v = al.LaillisetVuorot();
                Oleta.Sama(v.Count, v.Select(x => x.Lopputila).Distinct().Count(), $"{a}-{b} uniikit");
            }
            // Riippumaton tarkistus: kaikki noppajärjestykset ilman karsintaa → samat lopputilat kuin generaattorilla.
            var sat = new Satunnainen(21);
            for (int k2 = 0; k2 < 60; k2++)
            {
                var asema = SatunnainenAsema(sat, (int)(sat.Seuraava() * 50));
                if (asema.Lopputulos() != null) continue;
                int a = 1 + (int)(sat.Seuraava() * 6), b = 1 + (int)(sat.Seuraava() * 6);
                var gen = new List<TavliVuoro>();
                asema.Generoi(asema.Vuorossa, a, b, gen);
                var naivi = NaiviLopputilat(asema, asema.Vuorossa, a, b);
                Oleta.Sama(naivi.Count, gen.Count, $"{asema.Asema()} {a}-{b}");
                Oleta.Tosi(gen.All(v => naivi.Contains(v.Lopputila)), "samat lopputilat");
            }
        }

        /// <summary>Kaikki lopputilat suoraviivaisesti (jokainen noppajärjestys, ei karsintaa): pisin käyttö ja suuremman nopan sääntö.</summary>
        static HashSet<TavliAvain> NaiviLopputilat(Tavli t, int p, int a, int b)
        {
            var lehdet = new List<(TavliAvain Avain, int Pituus, int Eka)>();
            void Kay(List<int> nopat, int syv, int eka)
            {
                bool jokin = false;
                foreach (int d in nopat.Distinct().ToList())
                {
                    var l = new List<TavliAskel>();
                    t.Askeleet(p, d, l);
                    foreach (var s in l)
                    {
                        jokin = true;
                        t.Siirra(p, s);
                        var loput = new List<int>(nopat); loput.Remove(d);
                        Kay(loput, syv + 1, syv == 0 ? d : eka);
                        t.Palauta(p, s);
                    }
                }
                if (!jokin) lehdet.Add((t.Avain(), t.Poistettu(p) == 15 ? (a == b ? 4 : 2) : syv, eka));
            }
            Kay(a == b ? new List<int> { a, a, a, a } : new List<int> { a, b }, 0, 0);
            int m = lehdet.Max(x => x.Pituus);
            var ok = lehdet.Where(x => x.Pituus == m).ToList();
            if (m == 1 && a != b && ok.Any(x => x.Eka == Math.Max(a, b))) ok = ok.Where(x => x.Eka == Math.Max(a, b)).ToList();
            return new HashSet<TavliAvain>(ok.Select(x => x.Avain));
        }

        /// <summary>Satunnainen kesken oleva asema satunnaispelillä.</summary>
        static Tavli SatunnainenAsema(Satunnainen sat, int vuoroja)
        {
            var t = new Tavli();
            for (int n = 0; n < vuoroja && t.Lopputulos() == null; n++)
            {
                t.Heita(sat);
                var v = t.LaillisetVuorot();
                t.TeeVuoro(v[(int)(sat.Seuraava() * v.Count)]);
            }
            return t;
        }

        [Testi] static void AskelKerrallaanPaatyyLailliseenVuoroon()
        {
            var sat = new Satunnainen(11);
            int tarkistettu = 0;
            for (int k = 0; k < 150; k++)
            {
                var t = SatunnainenAsema(sat, (int)(sat.Seuraava() * 60));
                if (t.Lopputulos() != null) continue;
                t.Heita(sat);
                var lailliset = new HashSet<TavliAvain>(t.LaillisetVuorot().Select(v => v.Lopputila));
                // Satunnaiset kävelyt askel kerrallaan päätyvät aina lailliseen lopputilaan oikealla askelmäärällä.
                for (int kavely = 0; kavely < 5; kavely++)
                {
                    int askelia = 0;
                    for (var l = Askeleet(t); l.Count > 0; l = Askeleet(t)) { t.TeeAskel(l[(int)(sat.Seuraava() * l.Count)]); askelia++; }
                    Oleta.Tosi(lailliset.Contains(t.Avain()), $"laillinen lopputila {t.Asema()}");
                    Oleta.Tosi(askelia == t.AskeleitaVuorossa || t.Lopputulos() != null, "askelmäärä");
                    while (t.TehdytAskeleet.Count > 0) t.PeruAskel();
                    tarkistettu++;
                }
                // Jokainen laillinen kokonainen vuoro on toistettavissa askel kerrallaan.
                foreach (var v in t.LaillisetVuorot())
                {
                    foreach (var s in v.Askeleet) { Oleta.Tosi(Askeleet(t).Contains(s), $"vuoron {v} askel {s} tarjolla"); t.TeeAskel(s); }
                    Oleta.Tosi(t.VoiLopettaa(), "valmis");
                    while (t.TehdytAskeleet.Count > 0) t.PeruAskel();
                }
            }
            Oleta.Tosi(tarkistettu > 400, $"tarkistettu {tarkistettu}");
        }

        [Testi] static void TeePeruJaSatunnaisetPelitPaattyvat()
        {
            var sat = new Satunnainen(5);
            for (int peli = 0; peli < 100; peli++)
            {
                var t = new Tavli(peli % 2);
                var tilat = new Stack<string>();
                int vuoroja = 0;
                while (t.Lopputulos() == null && vuoroja < 2000)
                {
                    tilat.Push(t.Asema());
                    t.Heita(sat);
                    var v = t.LaillisetVuorot();
                    Oleta.Tosi(v.Count > 0, "aina vähintään tyhjä vuoro");
                    t.TeeVuoro(v[(int)(sat.Seuraava() * v.Count)]);
                    vuoroja++;
                    for (int p = 0; p < 2; p++)
                    {
                        int n = t.Palkilla(p) + t.Poistettu(p) + Enumerable.Range(0, 24).Where(i => t.Omistaja(i) == p).Sum(i => t.Maara(i));
                        Oleta.Sama(15, n, "15 nappulaa");
                    }
                }
                Oleta.Tosi(t.Lopputulos() != null, "peli päättyy");
                Oleta.Sama(vuoroja, t.Siirtoja);
                if (peli < 10)
                    while (tilat.Count > 0) { t.PeruVuoro(); Oleta.Sama(tilat.Pop(), t.Asema(), "PeruVuoro palauttaa"); }
            }
        }

        // ---------- Botti ----------

        /// <summary>Yksi erä kahden botin kesken; palauttaa voittajan (0 = vaalea, aloittaa).</summary>
        static int Ottelu(Vastustaja vaalea, Vastustaja tumma, uint siemen, Action<Vastustaja, long, Tavli> ajastin = null)
        {
            var t = new Tavli();
            var noppa = new Satunnainen(siemen);
            var botti = new Satunnainen(siemen * 7919 + 1);
            var kello = new Stopwatch();
            while (t.Lopputulos() == null)
            {
                t.Heita(noppa);
                var taso = t.Vuorossa == 0 ? vaalea : tumma;
                kello.Restart();
                var v = TavliBotti.Valitse(t, taso, botti);
                ajastin?.Invoke(taso, kello.ElapsedTicks, t);
                t.TeeVuoro(v);
            }
            return t.Lopputulos().Value;
        }

        [Testi] static void BottiLyoJaPoistaa()
        {
            // Tumman yksinäinen vaalean kotialueella a5: 4-2 lyö ja tekee pisteen (9→5, 7→5): normaali ja vaikea.
            foreach (var taso in new[] { Vastustaja.BottiNormaali, Vastustaja.BottiVaikea })
            {
                var t = A("13:2 9:1 7:1 6:2 5:-1 18:-14");
                t.AsetaHeitto(4, 2);
                var v = TavliBotti.Valitse(t, taso, new Satunnainen(1));
                Oleta.Tosi(v.Askeleet.Any(s => s.Lyonti) && v.Askeleet.All(s => s.Mihin == 5), taso + ": " + v);
            }
            // Kilpajuoksu: botti poistaa mieluummin kuin siirtää kotialueella.
            var k = A("5:2 4:2 18:-2");
            k.AsetaHeitto(6, 5);
            var p = TavliBotti.Valitse(k, Vastustaja.BottiNormaali, new Satunnainen(1));
            Oleta.Tosi(p.Askeleet.All(s => s.Poisto), "poistaa kaksi: " + p);
        }

        [Testi] static void BotinValintaOnToistettava()
        {
            var t = SatunnainenAsema(new Satunnainen(3), 12);
            t.AsetaHeitto(4, 2);
            foreach (var taso in new[] { Vastustaja.BottiHelppo, Vastustaja.BottiNormaali, Vastustaja.BottiVaikea })
            {
                var a = TavliBotti.Valitse(t, taso, new Satunnainen(9));
                var b = TavliBotti.Valitse(t, taso, new Satunnainen(9));
                Oleta.Sama(a.Lopputila, b.Lopputila, "sama siemen → sama vuoro");
            }
            Oleta.Sama(0, t.TehdytAskeleet.Count, "botti ei muuta peliä");
        }

        /// <summary>Sarja rinnakkain (4 säiettä; kukin peli omilla siemenillään, joten tulos on sama ajosta toiseen).</summary>
        static (int Voitot, int Peleja) SarjaRinnakkain(Vastustaja a, Vastustaja b, int pareja, uint alku)
        {
            int voitot = 0;
            System.Threading.Tasks.Parallel.For(0, pareja, new System.Threading.Tasks.ParallelOptions { MaxDegreeOfParallelism = 4 }, i =>
            {
                int v = (Ottelu(a, b, alku + (uint)i) == 0 ? 1 : 0) + (Ottelu(b, a, alku + (uint)i) == 1 ? 1 : 0);
                System.Threading.Interlocked.Add(ref voitot, v);
            });
            return (voitot, pareja * 2);
        }

        [Testi] static void VaikeaVoittaaHelponJaNormaalin()
        {
            // Savukoe tavalliseen ajoon: 80 + 80 peliä (keskivirhe ≈ 5 %-yks.), joten rajat ovat väljät (60 % ja 52 %).
            // Varsinainen mittari (400 + 400 peliä, tavoitteet ≥ 75 % ja ≥ 60 %): BotinTaysiMittaus (TAVLI_TAYSI=1).
            var (vh, nh) = SarjaRinnakkain(Vastustaja.BottiVaikea, Vastustaja.BottiHelppo, 40, 1000);
            var (vn, nn) = SarjaRinnakkain(Vastustaja.BottiVaikea, Vastustaja.BottiNormaali, 40, 2000);
            Console.WriteLine($"  vaikea–helppo {vh}/{nh} ({100.0 * vh / nh:0} %), vaikea–normaali {vn}/{nn} ({100.0 * vn / nn:0} %)");
            Oleta.Tosi(vh * 100 >= 60 * nh, $"vaikea–helppo {vh}/{nh}");
            Oleta.Tosi(vn * 100 >= 52 * nn, $"vaikea–normaali {vn}/{nn}");
        }

        [Testi] static void VaikeaBottiOnNopea()
        {
            long summa = 0, pisin = 0, n = 0;
            for (uint s = 0; s < 4; s++)
                Ottelu(Vastustaja.BottiVaikea, Vastustaja.BottiVaikea, 500 + s, (_, ticks, _) => { summa += ticks; n++; pisin = Math.Max(pisin, ticks); });
            double ms(long ticks) => ticks * 1000.0 / Stopwatch.Frequency;
            Console.WriteLine($"  vaikea botti: {n} vuoroa, keskimäärin {ms(summa) / n:0.0} ms, pisin {ms(pisin):0} ms");
            Oleta.Tosi(ms(pisin) < 1500, $"pisin {ms(pisin):0} ms");
        }

        [Testi] static void BotinTaysiMittaus()
        {
            if (Environment.GetEnvironmentVariable("TAVLI_TAYSI") != "1") return;
            var kello = Stopwatch.StartNew();
            long summa = 0, pisin = 0, n = 0;
            int vh = 0, vn = 0;
            string hitain = "";
            for (uint i = 0; i < 200; i++)
            {
                Action<Vastustaja, long, Tavli> aj = (taso, ticks, t) =>
                {
                    if (taso != Vastustaja.BottiVaikea) return;
                    summa += ticks; n++;
                    if (ticks > pisin) { pisin = ticks; hitain = $"{t.Asema()} heitto {t.Noppa1}-{t.Noppa2}, {t.LaillisetVuorot().Count} vuoroa"; }
                };
                if (Ottelu(Vastustaja.BottiVaikea, Vastustaja.BottiHelppo, 10000 + i, aj) == 0) vh++;
                if (Ottelu(Vastustaja.BottiHelppo, Vastustaja.BottiVaikea, 10000 + i, aj) == 1) vh++;
                if (Ottelu(Vastustaja.BottiVaikea, Vastustaja.BottiNormaali, 20000 + i, aj) == 0) vn++;
                if (Ottelu(Vastustaja.BottiNormaali, Vastustaja.BottiVaikea, 20000 + i, aj) == 1) vn++;
            }
            double ms(long ticks) => ticks * 1000.0 / Stopwatch.Frequency;
            Console.WriteLine($"  TÄYSI: vaikea–helppo {vh}/400 ({vh / 4.0:0.0} %), vaikea–normaali {vn}/400 ({vn / 4.0:0.0} %)");
            Console.WriteLine($"  TÄYSI: vaikean {n} vuoroa, keskimäärin {ms(summa) / n:0.0} ms, pisin {ms(pisin):0} ms; kesto {kello.Elapsed.TotalSeconds:0} s");
            Console.WriteLine($"  TÄYSI: hitain asema {hitain}");
            Oleta.Tosi(vh >= 300, $"vaikea–helppo {vh}/400");
            Oleta.Tosi(vn >= 240, $"vaikea–normaali {vn}/400");
        }
    }
}
