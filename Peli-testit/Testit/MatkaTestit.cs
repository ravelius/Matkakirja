// Matkan (Peli/Matka.cs) ja pelitilan (Peli/Pelitila.cs) testit:
// yksikkötestit pienellä verkolla (ValeVerkko) ja kultainen jälki
// Kultaiset/matkajalki.json, jonka verkkopelin js/game.js tuotti
// (Kultaiset/tee-matkajalki.mjs). Käsikirjoitus on sama kuin skriptissä.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    /// <summary>Sama deterministinen käsikirjoitus kuin tee-matkajalki.mjs:ssä.</summary>
    sealed class Kasikirjoitus
    {
        public int Valinnat;
        public int Heitot;

        public string Seuraava(Matka m)
        {
            var t = m.Tila;
            TekoTulos tulos;
            string teko;
            if (t.Vaihe == Vaihe.Toiminta)
            {
                var tavat = m.Kulkutavat();
                if (tavat.Count == 0) throw new Exception("ei tapoja");
                var tapa = tavat[Valinnat % tavat.Count];
                Valinnat++;
                if (tapa == Kulkutapa.Bussi)
                {
                    var kohde = m.BussiKohteet().OrderBy(k => k, StringComparer.Ordinal).First();
                    teko = "bus:" + kohde;
                    tulos = m.Bussi(kohde);
                }
                else if (tapa == Kulkutapa.Lento)
                {
                    var kohde = m.LentoKohteet().OrderBy(k => k, StringComparer.Ordinal).First();
                    teko = "fly:" + kohde;
                    tulos = m.Lenna(kohde);
                }
                else
                {
                    teko = "travel:" + MatkaTestit.Web(tapa);
                    tulos = m.ValitseKulkutapa(tapa);
                }
            }
            else if (t.Vaihe == Vaihe.Heitto)
            {
                if (m.MuitaTapojaTarjolla() && Heitot % 4 == 3) { teko = "cancel"; tulos = m.PeruKulkutapa(); }
                else { teko = "roll"; tulos = m.Heita(); }
                Heitot++;
            }
            else if (t.Vaihe == Vaihe.Siirto)
            {
                var avain = t.Siirrot.Keys.OrderBy(k => k, StringComparer.Ordinal).First();
                teko = "move:" + avain;
                tulos = m.Liiku(avain);
            }
            else throw new Exception("odottamaton vaihe " + t.Vaihe);
            if (!tulos.Ok) throw new Exception(teko + " epäonnistui: " + tulos.Virhe);
            return teko;
        }
    }

    public static class MatkaTestit
    {
        const int MaxTeot = 400;   // sama kuin skriptin MAX_TEOT

        public static string Web(Kulkutapa t) => t switch
        {
            Kulkutapa.Maa => "land", Kulkutapa.Bussi => "bus", Kulkutapa.Meri => "sea",
            Kulkutapa.Lento => "fly", _ => "stay",
        };

        static string Web(Vaihe v) => v switch
        {
            Vaihe.Toiminta => "action", Vaihe.Heitto => "roll", Vaihe.Siirto => "move",
            Vaihe.Kysymys => "quiz", Vaihe.Ohi => "over", _ => "pickstart",
        };

        static string Web(Vuorokaudenaika v) => v switch
        {
            Vuorokaudenaika.Aamu => "aamu", Vuorokaudenaika.Keskipaiva => "keskipäivä",
            Vuorokaudenaika.Ilta => "ilta", _ => "yö",
        };

        /// <summary>Matkan tila samana rivinä kuin jäljen askel (kentät skriptin tila()-järjestyksessä).</summary>
        static string Rivi(string teko, Matka m)
        {
            var t = m.Tila;
            var p = t.Pelaaja;
            return string.Join(" ", new[]
            {
                teko, Web(t.Vaihe), p.Sijainti.Avain, p.Raha.ToString(CultureInfo.InvariantCulture),
                t.Noppa?.ToString(CultureInfo.InvariantCulture) ?? "null",
                t.VuoroLaskuri.ToString(CultureInfo.InvariantCulture), t.Paiva().ToString(CultureInfo.InvariantCulture),
                Web(t.Vuorokaudenaika()), t.Tunnit().ToString(CultureInfo.InvariantCulture),
                m.Satunnainen.Kutsuja.ToString(CultureInfo.InvariantCulture),
                t.Kulkutapa.HasValue ? Web(t.Kulkutapa.Value) : "null",
                t.AutoMatka ? "true" : "false", t.JatkaAutomaattisesti ? "true" : "false",
                t.OdottavaMaksu.ToString(CultureInfo.InvariantCulture),
                p.Kaydyt.Count.ToString(CultureInfo.InvariantCulture),
                "[" + string.Join(",", m.Kulkutavat().Select(Web)) + "]",
            });
        }

        static string Luku(object o) => o == null ? "null" : ((double)o).ToString(CultureInfo.InvariantCulture);

        static string Rivi(Dictionary<string, object> a)
        {
            string S(string k) => MiniJson.Teksti(a, k) ?? "null";
            string N(string k) => Luku(MiniJson.Kentta(a, k));
            string B(string k) => MiniJson.Totuus(a, k) ? "true" : "false";
            var tavat = MiniJson.Taulukko(MiniJson.Kentta(a, "tavat")).Cast<string>();
            return string.Join(" ", new[]
            {
                S("teko"), S("vaihe"), S("sijainti"), N("raha"), N("die"), N("turnCount"), N("dayCount"),
                S("timeOfDay"), N("tunnit"), N("rngCalls"), S("travelMode"), B("autoTravel"),
                B("jatkaAutomaattisesti"), N("pendingFare"), N("kaydyt"), "[" + string.Join(",", tavat) + "]",
            });
        }

        static Dictionary<string, object> jalki;
        static Dictionary<string, object> Jalki => jalki ??= MiniJson.Objekti(MiniJson.Jasenna(
            File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "matkajalki.json"))));

        /// <summary>
        /// Toistaa yhden ajon. tallennaVali > 0: joka tallennaVali:nnen teon
        /// jälkeen peli tallennetaan ja ladataan, ja jatketaan ladatulla.
        /// Palauttaa askelten määrän.
        /// </summary>
        static int ToistaAjo(Dictionary<string, object> ajo, int tallennaVali)
        {
            var siemen = (long)(double)MiniJson.Kentta(ajo, "seed");
            var alku = MiniJson.Teksti(ajo, "start");
            var askeleet = MiniJson.Taulukko(MiniJson.Kentta(ajo, "askeleet")).Select(MiniJson.Objekti).ToList();
            int vuorot = (int)MiniJson.Luku(Jalki, "vuorot").Value;
            var nimi = $"siemen {siemen} {alku}";

            // Web kulutti konstruktorissa arvontoja laattojen jakoon: kelataan samaan kohtaan.
            var rng = new Satunnainen(siemen);
            rng.Kelaa((long)MiniJson.Luku(ajo, "rngAlussa").Value);
            var m = Matka.UusiPeli(KultaisetApu.Verkko, rng, "Fogg", alku);

            int i = 0;
            void Vertaa(string teko)
            {
                if (i >= askeleet.Count) throw new Exception($"{nimi}: C# jatkoi jäljen jälkeen ({teko})");
                var odotettu = Rivi(askeleet[i]);
                var saatu = Rivi(teko, m);
                if (odotettu != saatu)
                    throw new Exception($"{nimi} askel {i}:\n  web {odotettu}\n  C#  {saatu}");
                i++;
            }
            Vertaa("alku");
            if (MiniJson.Luku(ajo, "raha") is double raha)
            {
                m.Tila.Pelaaja.Raha = (int)raha;
                m.Tila.Vaihe = Vaihe.Toiminta;
                m.AloitaVuoro();
                Vertaa("raha:" + (int)raha);
            }
            var kasikirjoitus = new Kasikirjoitus { Valinnat = (int)(MiniJson.Luku(ajo, "alkuValinta") ?? 0) };
            for (int n = 0; n < MaxTeot && m.Tila.VuoroLaskuri <= vuorot; n++)
            {
                Vertaa(kasikirjoitus.Seuraava(m));
                if (tallennaVali > 0 && (n + 1) % tallennaVali == 0)
                    m = Matka.Lataa(KultaisetApu.Verkko, m.Tallenna());
            }
            Oleta.Sama(askeleet.Count, i, nimi + ": jäljen pituus");
            return i;
        }

        [Testi] static void KultainenMatkajalki()
        {
            int yht = 0;
            var ajot = MiniJson.Taulukko(MiniJson.Kentta(Jalki, "jaljet")).Select(MiniJson.Objekti).ToList();
            Oleta.Tosi(ajot.Count >= 6, "ajoja");
            foreach (var ajo in ajot) yht += ToistaAjo(ajo, 0);
            Oleta.Tosi(yht > 500, "askelia " + yht);
        }

        [Testi] static void KultainenMatkajalkiTallennuksenYli()
        {
            foreach (var ajo in MiniJson.Taulukko(MiniJson.Kentta(Jalki, "jaljet")).Select(MiniJson.Objekti))
                ToistaAjo(ajo, 7);
        }

        // --- yksikkötestit pienellä verkolla ---------------------------------

        static Matka Uusi(string alku, long siemen = 1) => Matka.UusiPeli(ValeVerkko.Pieni(), new Satunnainen(siemen), "Fogg", alku);

        [Testi] static void KelloJohdetaanKierroksista()
        {
            var t = new Pelitila();
            Oleta.Sama(0, t.Tunnit()); Oleta.Sama(1, t.Paiva()); Oleta.Sama(Vuorokaudenaika.Aamu, t.Vuorokaudenaika());
            t.VuoroLaskuri = 2; Oleta.Sama(6, t.Tunnit()); Oleta.Sama(Vuorokaudenaika.Keskipaiva, t.Vuorokaudenaika());
            t.VuoroLaskuri = 3; Oleta.Sama(Vuorokaudenaika.Ilta, t.Vuorokaudenaika());
            t.VuoroLaskuri = 4; Oleta.Sama(18, t.Tunnit()); Oleta.Sama(Vuorokaudenaika.Yo, t.Vuorokaudenaika());
            t.VuoroLaskuri = 5; Oleta.Sama(2, t.Paiva()); Oleta.Sama(Vuorokaudenaika.Aamu, t.Vuorokaudenaika());
        }

        [Testi] static void KulkutavatJarjestyksessaJaIlmanAutomaattia()
        {
            var m = Uusi("ala");
            Oleta.Sama("Maa,Bussi,Meri,Lento", string.Join(",", m.Kulkutavat()));
            Oleta.Tosi(!m.Tila.AutoMatka, "useampi noppatapa → ei automaattia");
            Oleta.Sama(Vaihe.Toiminta, m.Tila.Vaihe);
            Oleta.Sama(0, m.Tila.Pelaaja.Kaydyt.Count, "aloituskaupunkia ei kirjata (web)");
        }

        [Testi] static void SaarellaLaivaValitaanItsestaanJaLippuVeloitetaanSiirrossa()
        {
            var m = Uusi("saari");
            Oleta.Tosi(m.Tila.AutoMatka, "ainoa noppatapa");
            Oleta.Sama(Vaihe.Heitto, m.Tila.Vaihe);
            Oleta.Sama(Kulkutapa.Meri, m.Tila.Kulkutapa.Value);
            Oleta.Sama(Vakiot.MeriHinta, m.Tila.OdottavaMaksu);
            Oleta.Tosi(!m.Tila.JatkaAutomaattisesti, "kaupungissa noppa kuuluu napille");
            Oleta.Sama(300, m.Tila.Pelaaja.Raha, "ei vielä veloitettu");
            Oleta.Tosi(m.Heita().Ok, "heitto");
            Oleta.Tosi(m.Liiku(m.Tila.Siirrot.Keys.First()).Ok, "siirto");
            Oleta.Sama(200, m.Tila.Pelaaja.Raha);
            Oleta.Sama(2, m.Tila.VuoroLaskuri);
        }

        [Testi] static void ReitillaMatkaJatkuuIlmaiseksiJaItsestaan()
        {
            var m = Uusi("ala");
            m.Tila.Pelaaja.Sijainti = Sijainti.ReitillaSijainti("ala|saari", 1);
            m.AloitaVuoro();
            Oleta.Sama(Vaihe.Heitto, m.Tila.Vaihe);
            Oleta.Sama(Kulkutapa.Meri, m.Tila.Kulkutapa.Value);
            Oleta.Sama(0, m.Tila.OdottavaMaksu, "merellä ei uutta lippua");
            Oleta.Tosi(m.Tila.JatkaAutomaattisesti && m.JatkaMatkaaItsestaan(), "jatkolippu");
            Oleta.Tosi(!m.PeruKulkutapa().Ok, "reitillä ei ole muuta tapaa");
            m.Heita();
            Oleta.Tosi(!m.JatkaMatkaaItsestaan(), "noppa heitetty");
        }

        [Testi] static void BussiVeloittaaEikaKuluttaAikaa()
        {
            var m = Uusi("ala");
            var saapumiset = new List<string>();
            var tapahtumat = new List<string>();
            m.Saapui += (p, k, uusi) => saapumiset.Add(k + (uusi ? "+" : ""));
            m.Tapahtui += (laji, _) => tapahtumat.Add(laji);
            Oleta.Sama("bee", string.Join(",", m.BussiKohteet()), "vain maareitit");
            Oleta.Tosi(!m.Bussi("saari").Ok, "bussi ei aja laivareittiä");
            Oleta.Tosi(m.Bussi("bee").Ok, "bussi");
            Oleta.Sama(250, m.Tila.Pelaaja.Raha);
            Oleta.Sama(1, m.Tila.VuoroLaskuri, "aika ei kulu");
            Oleta.Sama("c:bee", m.Tila.Pelaaja.Sijainti.Avain);
            Oleta.Sama("bee+", string.Join(",", saapumiset));
            Oleta.Sama("fare", string.Join(",", tapahtumat));
            // Bee: maa + bussi → noppatapoja yksi → automaatti, mutta bussi yhä tarjolla.
            Oleta.Tosi(m.Tila.AutoMatka && m.MuitaTapojaTarjolla(), "bussi ei estä automaattia");
            Oleta.Tosi(m.PeruKulkutapa().Ok, "paluu valintaan");
            Oleta.Sama(Vaihe.Toiminta, m.Tila.Vaihe);
            Oleta.Tosi(!m.Tila.AutoMatka, "esivalinta purkautui");
            Oleta.Tosi(m.Bussi("ala").Ok, "takaisin");
            Oleta.Sama("bee+,ala+", string.Join(",", saapumiset), "ala oli aloitus, ei käyty");
            Oleta.Tosi(m.Bussi("bee").Ok, "uudestaan");
            Oleta.Sama("bee+,ala+,bee", string.Join(",", saapumiset));
            Oleta.Sama(150, m.Tila.Pelaaja.Raha);
        }

        [Testi] static void BussiPolkuKulkeeReitinVarren()
        {
            var m = Uusi("bee");
            Oleta.Sama("e:ala|bee:1,c:ala", string.Join(",", m.BussiPolku("bee", "ala")));
            Oleta.Sama("e:ala|bee:1,c:bee", string.Join(",", m.BussiPolku("ala", "bee")));
            Oleta.Sama("c:cee", string.Join(",", m.BussiPolku("bee", "cee")));
        }

        [Testi] static void LentoVieVuoronJaRahat()
        {
            var m = Uusi("ala");
            Oleta.Sama("cee", string.Join(",", m.LentoKohteet()));
            Oleta.Tosi(!m.Lenna("bee").Ok, "ei lentoa");
            Oleta.Tosi(m.Tila.Kulkutapa == null, "hylätty lento ei jätä tapaa");
            Oleta.Tosi(m.Lenna("cee").Ok, "lento");
            Oleta.Sama(0, m.Tila.Pelaaja.Raha);
            Oleta.Sama(2, m.Tila.VuoroLaskuri);
            Oleta.Tosi(m.Tila.Pelaaja.Kaydyt.Contains("cee"), "käyty");
            Oleta.Sama(0, m.LentoKohteet().Count, "ei rahaa uuteen lentoon");
            Oleta.Tosi(m.Tila.AutoMatka && m.Tila.Kulkutapa == Kulkutapa.Maa, "rahatta vain liftaus");
        }

        [Testi] static void NoppatapaIlmanReittejaJumittaaJaKuluttaaVuoron()
        {
            // Web: actionTravel('fly') → findMoves ilman lentokaaria → jumissa.
            var m = Uusi("ala");
            var tapahtumat = new List<string>();
            m.Tapahtui += (laji, _) => tapahtumat.Add(laji);
            Oleta.Tosi(m.ValitseKulkutapa(Kulkutapa.Lento).Ok, "valinta");
            var t = m.Heita();
            Oleta.Tosi(t.Ok && t.Noppa >= 1 && t.Noppa <= 6, "heitto");
            Oleta.Sama(Vaihe.Toiminta, m.Tila.Vaihe);
            Oleta.Sama(2, m.Tila.VuoroLaskuri);
            Oleta.Sama("stuck", string.Join(",", tapahtumat));
        }

        [Testi] static void PankkiapuJumissa()
        {
            var m = Uusi("saari");
            var tapahtumat = new List<string>();
            m.Tapahtui += (laji, _) => tapahtumat.Add(laji);
            m.Tila.Pelaaja.Raha = 40;
            m.Tila.Vaihe = Vaihe.Toiminta;
            m.AloitaVuoro();
            Oleta.Sama(140, m.Tila.Pelaaja.Raha);
            Oleta.Sama("aid", string.Join(",", tapahtumat));
            Oleta.Sama(Kulkutapa.Meri, m.Tila.Kulkutapa.Value);
            // Tavoitteet ratkaisevat myös: tavoite vain laivan takana ja rahat alle lipun.
            var m2 = Uusi("bee");
            m2.Tila.Vaihe = Vaihe.Toiminta;   // web travelModes vaatii vaiheen 'action'
            m2.Tavoitteet = () => new[] { "saari" };
            m2.Tila.Pelaaja.Raha = 60;
            Oleta.Tosi(m2.TarvitseeApua(m2.Tila.Pelaaja), "saari laivan takana");
            m2.Tila.Pelaaja.Raha = 100;
            Oleta.Tosi(!m2.TarvitseeApua(m2.Tila.Pelaaja), "lippuraha riittää");
            m2.Tavoitteet = () => new string[0];
            m2.Tila.Pelaaja.Raha = 0;
            Oleta.Tosi(!m2.TarvitseeApua(m2.Tila.Pelaaja), "ei tavoitteita");
        }

        [Testi] static void KoukutPysyJaSaapumisPysahdys()
        {
            var m = Matka.UusiPeli(ValeVerkko.Pieni(), new Satunnainen(3), "Fogg", "bee");
            Oleta.Tosi(m.Tila.AutoMatka, "ilman koukkua automaatti");
            m.TehtavaTarjolla = _ => true;
            m.PysaytaSaapuessa = _ => true;
            m.Tila.Vaihe = Vaihe.Toiminta;
            m.AloitaVuoro();
            Oleta.Sama("Maa,Bussi,Pysy", string.Join(",", m.Kulkutavat()));
            Oleta.Tosi(!m.Tila.AutoMatka, "Pysy estää automaatin");
            Oleta.Tosi(!m.ValitseKulkutapa(Kulkutapa.Pysy).Ok, "ilman Tutki-koukkua");
            m.Tutki = _ => { m.Tila.Vaihe = Vaihe.Kysymys; return TekoTulos.Onnistui(); };
            Oleta.Tosi(m.ValitseKulkutapa(Kulkutapa.Pysy).Ok, "Tutki-koukku");
            Oleta.Sama(Vaihe.Kysymys, m.Tila.Vaihe);
            m.Tila.Vaihe = Vaihe.Toiminta;
            Oleta.Tosi(m.Bussi("cee").Ok, "bussi");
            Oleta.Sama(Vaihe.Toiminta, m.Tila.Vaihe, "vuoro jäi auki pysähdykseen");
            Oleta.Sama(Kulkutapa.Bussi, m.Tila.Kulkutapa.Value, "vuoroa ei aloitettu uudelleen");
        }

        [Testi] static void VaaratVaiheetHylataan()
        {
            var m = Uusi("ala");
            Oleta.Tosi(!m.Heita().Ok, "heitto ilman tapaa");
            Oleta.Tosi(!m.Liiku("c:bee").Ok, "siirto ilman heittoa");
            Oleta.Tosi(!m.PeruKulkutapa().Ok, "peru ilman tapaa");
            Oleta.Tosi(!m.ValitseKulkutapa(Kulkutapa.Bussi).Ok, "bussi ei ole noppatapa");
            Oleta.Tosi(m.ValitseKulkutapa(Kulkutapa.Maa).Ok, "maa");
            Oleta.Tosi(!m.ValitseKulkutapa(Kulkutapa.Maa).Ok, "toinen valinta");
            Oleta.Tosi(!m.Bussi("bee").Ok, "bussi heittovaiheessa");
            Oleta.Tosi(m.Heita().Ok, "heitto");
            Oleta.Tosi(!m.Liiku("c:olematon").Ok, "laiton siirto");
        }

        [Testi] static void TallennusMeneeJaPalaa()
        {
            var m = Uusi("ala", 11);
            m.Tila.Pelaaja.Nimi = "Fogg \"nuorempi\"\\";
            m.ValitseKulkutapa(Kulkutapa.Maa);
            m.Heita();
            var json = m.Tallenna();
            var t = Pelitila.FromJson(json);
            Oleta.Sama(json, t.ToJson(), "sama teksti");
            var l = Matka.Lataa(ValeVerkko.Pieni(), json);
            Oleta.Sama(Vaihe.Siirto, l.Tila.Vaihe);
            Oleta.Sama(m.Tila.Noppa, l.Tila.Noppa);
            Oleta.Sama(string.Join(",", m.Tila.Siirrot.Keys), string.Join(",", l.Tila.Siirrot.Keys), "siirrot laskettu uudelleen");
            Oleta.Sama(m.Satunnainen.Kutsuja, l.Satunnainen.Kutsuja);
            Oleta.Sama(m.Satunnainen.Seuraava(), l.Satunnainen.Seuraava(), "sama arvontakohta");
            Oleta.Sama("Fogg \"nuorempi\"\\", l.Tila.Pelaaja.Nimi);
            var r = Pelitila.LueSijainti("e:ala|saari:1");
            Oleta.Sama("ala|saari", r.Reitti); Oleta.Sama(1, r.Askel);
        }
    }
}
