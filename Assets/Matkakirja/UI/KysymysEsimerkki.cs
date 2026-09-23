// KYSYMYSNÄKYMÄN ESIMERKIT (Natiivi-UI, erä 3): testikomento 'ui kysymys …'.
//
// Rakentaa KysymysNaytto-olion käsin (ilman peliä ja kysymysdataa) ja toimii
// itse pienenä ohjaimena: vastaus, vihje, 50:50 ja Jatka muuttavat esimerkkiä
// ja kutsuvat Nayta uudestaan, ja aikaraja kuluu näkymän ajastimella
// (PaivitaAika ~30 kertaa sekunnissa), jotta kuvakaappaukset ja kokeilu
// laitteella toimivat ilman PeliOhjainta. Tekstit ovat verkkopelin tyylisiä.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class KysymysEsimerkki
    {
        public const string Lajit = "visa|vaite|kuva|lippu|pulma [id]|kaksintaistelu|tapahtumakortti|tulos";

        static KysymysNaytto d;
        static string vihje;
        static float jaljella;
        static IVisualElementScheduledItem ajastin;
        static bool kytketty;

        /// <summary>Näyttää esimerkin; palauttaa virheen tekstinä tai null.</summary>
        public static string Nayta(KysymysNakyma n, string arg, Action<string> ilmoitus)
        {
            var osat = (arg ?? "").Trim().ToLowerInvariant().Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string laji = osat.Length > 0 ? osat[0] : "visa";
            vihje = null;
            switch (laji)
            {
                case "visa": d = Visa(); break;
                case "vaite": d = Vaite(); break;
                case "kuva": d = Kuva(); break;
                case "lippu": d = Lippu(); break;
                case "pulma": d = Pulma(osat.Length > 1 ? osat[1] : "pylvaat"); break;
                case "kaksintaistelu": d = Kaksintaistelu(); break;
                case "tapahtumakortti": d = Tapahtumakortti(); break;
                case "tulos": d = Tulos(); break;
                default: return "tuntematon laji (" + Lajit + ")";
            }
            if (!kytketty) { kytketty = true; n.Piilotettu += () => ajastin?.Pause(); }
            var t = Toiminnot(n, ilmoitus);
            jaljella = d.Sekunnit ?? 0;
            n.Nayta(d, t);
            if (d.Sekunnit.HasValue) n.PaivitaAika(jaljella);
            ajastin?.Pause();
            if (d.Sekunnit.HasValue && !d.Vastattu)
            {
                var juuri = UiKerros.Hae().Juuri(UiKerros.Pelidialogit);
                ajastin = juuri.schedule.Execute(ts =>
                {
                    if (!n.Auki || d == null || d.Vastattu) { ajastin?.Pause(); return; }
                    jaljella -= ts.deltaTime / 1000f;
                    if (jaljella > 0) { n.PaivitaAika(jaljella); return; }
                    // Aika loppui: sama tulos kuin väärällä vastauksella, ilman valintaa.
                    d.Vastattu = true; d.AikaLoppui = true; d.Valittu = -1; d.Oikein = false;
                    Tuloksen(d);
                    n.Nayta(d, t);
                }).Every(33);
            }
            return null;
        }

        static KysymysToiminnot Toiminnot(KysymysNakyma n, Action<string> ilmoitus) => new KysymysToiminnot
        {
            Vastaa = i =>
            {
                if (d == null || d.Vastattu) return;
                d.Vastattu = true; d.Valittu = i; d.Oikein = i == d.Oikea;
                Tuloksen(d);
                n.Nayta(d, Toiminnot(n, ilmoitus));
            },
            Vihje = () =>
            {
                if (d == null || vihje == null) return;
                d.Viesti = null;
                if (d.Raha < d.VihjeHinta) d.Viesti = "Rahat eivät riitä vihjeeseen.";
                else { d.Raha -= d.VihjeHinta; d.Vihje = vihje; d.VihjeTarjolla = false; }
                n.Nayta(d, Toiminnot(n, ilmoitus));
                d.Viesti = null;
            },
            Puolita = () =>
            {
                if (d == null) return;
                d.Viesti = null;
                var vaarat = new List<int>();
                for (int i = 0; i < d.Vaihtoehdot.Count; i++) if (i != d.Oikea && !d.Piilotetut.Contains(i)) vaarat.Add(i);
                if (d.Laji == KysymysLaji.Kaksintaistelu)
                {
                    // Helpotus: rosvo vie puolet rahoista ja puolet vääristä pois (enintään kaksi kertaa).
                    int vie = d.Raha / 2;
                    d.Raha -= vie;
                    int pois = vaarat.Count / 2;
                    for (int i = 0; i < pois; i++) d.Piilotetut.Add(vaarat[i * 2 % vaarat.Count]);
                    int kerrat = d.Huomautus == null ? 1 : 2;
                    d.Huomautus = $"Rosvo on vienyt {(kerrat == 1 ? vie : 150 + vie)} puntaa.";
                    d.PuolitusHarmaa = kerrat >= 2 || d.Raha / 2 <= 0;
                    d.PuolitusTeksti = kerrat >= 2 ? "Helpotukset käytetty" : $"Helpotus (rosvo vie {d.Raha / 2} {d.Valuutta})";
                }
                else if (d.Raha < d.PuolitusHinta) d.Viesti = "Rahat eivät riitä 50:50:een.";
                else
                {
                    d.Raha -= d.PuolitusHinta;
                    d.Piilotetut.Add(vaarat[0]);
                    d.Piilotetut.Add(vaarat[vaarat.Count - 1]);
                    d.PuolitusTarjolla = false;
                }
                n.Nayta(d, Toiminnot(n, ilmoitus));
                d.Viesti = null;
            },
            Jatka = () =>
            {
                n.Piilota();
                d = null;
                ilmoitus?.Invoke("Jatka: esimerkki suljettu");
            },
        };

        /// <summary>Vastauksen jälkeen: apunapit pois (ohjaimessa KysymysApu.Nakyma tekee saman).</summary>
        static void Tuloksen(KysymysNaytto x)
        {
            x.VihjeTarjolla = false;
            x.PuolitusTarjolla = false;
            if (x.Laji == KysymysLaji.Kaksintaistelu)
                x.Loyto = x.Oikein ? "Voitit rosvon — saalis 220 puntaa!"
                    : (x.AikaLoppui ? "Aika loppui. " : "") + $"Rosvo vei rahat — oikea vastaus oli \"{x.Vaihtoehdot[x.Oikea]}\".";
            else if (x.Oikein && x.Loyto == null && x.Laji != KysymysLaji.Pulma)
                x.Loyto = "Löysit: Kätketty matka-arkku · +640 £";
        }

        // --- esimerkit -------------------------------------------------------------

        static KysymysNaytto Visa()
        {
            vihje = "Kaupunki oli tuolloin Habsburgien valtakunnan pääkaupunki, ja maailmannäyttely rakennettiin Praterin puistoon.";
            return new KysymysNaytto
            {
                Laji = KysymysLaji.Visa,
                Otsikko = "Budapest · aarrekysymys",
                Kehys = "Kahvilan tarjoilija kysyy",
                Kysymys = "Missä kaupungissa pidettiin maailmannäyttely vuonna 1873 — samana vuonna, jona isoisä lähti matkalleen?",
                Vaihtoehdot = new List<string> { "Pariisi", "Wien", "Lontoo", "Philadelphia" },
                Oikea = 1,
                VihjeTarjolla = true, VihjeHinta = 40,
                PuolitusTarjolla = true, PuolitusHinta = 80,
                Raha = 300,
                Sekunnit = 45,
                Fakta = "Wienin maailmannäyttely avattiin toukokuussa 1873 Praterin puistossa. Sen keskellä seisoi Rotunde, aikansa suurin kupolirakennus. Pörssiromahdus ja koleraepidemia pitivät kävijämäärät odotettua pienempinä.",
                Lahteet = new List<string> { "https://fi.wikipedia.org/wiki/Wienin_maailmann%C3%A4yttely", "Weltausstellung 1873 Wien" },
            };
        }

        static KysymysNaytto Vaite() => new KysymysNaytto
        {
            Laji = KysymysLaji.Vaite,
            Otsikko = "Lontoo · aarrekysymys",
            Paikka = "Lontoo",
            Kysymys = "Thamesin alla kulkee tunneli, jonka läpi voi kävellä joen yli kastelematta jalkojaan.",
            Vaihtoehdot = new List<string> { "Pitää yhä paikkansa", "Ei enää pidä" },
            Oikea = 0,
            Raha = 260,
            Sekunnit = 45,
            Fakta = "Thames Tunnel valmistui 1843 jalankulkutunneliksi. Nykyään sen läpi kulkevat Lontoon Overground-junat, joten jalan sitä ei enää kuljeta — mutta tunneli on yhä käytössä, ja isoisän kuvaama reitti joen ali on olemassa.",
            Lahteet = new List<string> { "https://en.wikipedia.org/wiki/Thames_Tunnel" },
        };

        static KysymysNaytto Kuva() => new KysymysNaytto
        {
            Laji = KysymysLaji.Kuva,
            Otsikko = "Rooma · aarrekysymys",
            Kehys = "Matkavalokuvaaja levittää vedoksensa pöytään ja kysyy",
            Kysymys = "Missä kaupungissa tämä kuva on otettu?",
            KuvaUrl = KysymysApu.CommonsUrl("Tour Eiffel Wikimedia Commons.jpg", 640),
            Vaihtoehdot = new List<string> { "Pariisi", "Wien", "Barcelona", "Praha" },
            Oikea = 0,
            PuolitusTarjolla = true, PuolitusHinta = 80,
            Raha = 120,
            Sekunnit = 45,
            Fakta = "Kuvassa on Pariisi. Valokuva: Benh Lieu Song (CC BY-SA 3.0).",
        };

        static KysymysNaytto Lippu() => new KysymysNaytto
        {
            Laji = KysymysLaji.Lippu,
            Otsikko = "Tukholma · aarrekysymys",
            Kehys = "Tullimies kääntää passia kädessään ja kysyy",
            Kysymys = "Minkä maan lippu tämä on?",
            KuvaUrl = KysymysApu.CommonsUrl("Flag of Finland.svg", 320),
            KuvaLahde = "Lippu: Wikimedia Commons",
            Vaihtoehdot = new List<string> { "Ruotsi", "Suomi", "Islanti", "Norja" },
            Oikea = 1,
            PuolitusTarjolla = true, PuolitusHinta = 80,
            Raha = 60,
            Sekunnit = 45,
            Fakta = "Lippu on Suomen.",
        };

        static KysymysNaytto Pulma(string id)
        {
            var d = new KysymysNaytto
            {
                Laji = KysymysLaji.Pulma,
                PulmaId = id,
                Raha = 300,
                VihjeTarjolla = true, VihjeHinta = 40,
            };
            switch (id)
            {
                case "pylvaat":
                    d.Otsikko = "Ateena · Pylväiden päät";
                    d.Kehys = "Piirroksessa: isoisän luonnos yhdestä pylväänpäästä. Vaihtoehdot ovat oikeita valokuvia — valitse se, jossa on samanlainen pää.";
                    d.Kysymys = "Piirsin luonnoskirjaani yhden pylväänpään, mutta unohdin kirjoittaa mistä temppelistä se oli. Etsi valokuvista pylväs, jolla on samanlainen pää.";
                    d.Luonnos = new Dictionary<string, object> { ["kysytty"] = "joonialainen" };
                    d.Vaihtoehdot = new List<string> { "Parthenonin pylväikkö", "Erekhtheionin pylväänpää", "Olympieionin pylväs", "Erekhtheionin karyatidi" };
                    d.VaihtoehtoKuvat = new List<string>
                    {
                        KysymysApu.CommonsUrl("Parthenon (30276156187).jpg", 480),
                        KysymysApu.CommonsUrl("Ionic capital from the Erechtheum at the British Museum.jpg", 480),
                        KysymysApu.CommonsUrl("A Corinthian capital (Temple of Olympian Zeus) on August 10, 2022.jpg", 480),
                        KysymysApu.CommonsUrl("Caryatid - Flickr - George M. Groutas.jpg", 480),
                    };
                    d.KuvaLahde = "Valokuvat: Phanatic (CC BY-SA 2.0), Yair Haklai (CC BY-SA 4.0), George E. Koronaios (CC BY-SA 4.0) ja George M. Groutas (CC BY 2.0), Wikimedia Commons.";
                    d.Oikea = 1;
                    vihje = "Katso pään muotoa: koruton laatta, kaksi kiehkuraa vai kokonainen lehtikimppu? Etsi sama muoto valokuvista.";
                    break;
                case "roomalaiset":
                    d.Otsikko = "Rooma · Kiveen hakatut luvut";
                    d.Kehys = "Piirroksessa: neljä kiveen hakattua lukua. Kolmen ensimmäisen arvo lukee vieressä; neljäs on ratkaistava.";
                    d.Kysymys = "Forumin kivissä on lukuja kaikkialla. Opas luki kolme niistä ääneen ja jätti neljännen minun ratkaistavakseni.";
                    d.Luonnos = new Dictionary<string, object>
                    {
                        ["rivit"] = new List<object> { "VI", "XIX", "XL" }, ["arvot"] = new List<object> { 6.0, 19.0, 40.0 }, ["kysytty"] = "XCIV",
                    };
                    d.Vaihtoehdot = new List<string> { "114", "94", "84", "96" };
                    d.Oikea = 1;
                    vihje = "Merkit lasketaan yhteen vasemmalta oikealle — paitsi kun pienempi merkki on suuremman edessä, jolloin se vähennetään.";
                    break;
                case "kuunvaiheet":
                    d.Otsikko = "Timbuktu · Kuunvaiheet";
                    d.Kehys = "Piirroksessa: käsikirjoitussivu ja kolme kuunvaihetta; pimeä osa on varjostettu.";
                    d.Kysymys = "Oppinut näytti käsikirjoitusta, johon kuunvaiheet oli piirretty järjestyksessä. Mikä vaihe tulee seuraavaksi?";
                    d.Luonnos = new Dictionary<string, object>
                    {
                        ["sarja"] = new List<object>
                        {
                            new Dictionary<string, object> { ["v"] = 0.82, ["peilaa"] = false },
                            new Dictionary<string, object> { ["v"] = 1.0, ["peilaa"] = false },
                            new Dictionary<string, object> { ["v"] = 0.82, ["peilaa"] = true },
                        },
                    };
                    d.Vaihtoehdot = new List<string> { "viimeinen neljännes", "täysikuu", "kasvava sirppi", "uusikuu" };
                    d.Oikea = 0;
                    break;
                default:
                    // Muut pulmat verkkopelin oletusluonnoksilla (piirtäjien oletusdata).
                    d.Otsikko = "Isoisän luonnoskirjasta · " + id;
                    d.Kehys = "Piirroksessa: isoisän luonnos (oletusdata).";
                    d.Kysymys = "Ratkaise luonnoksen pulma.";
                    d.Luonnos = null;
                    d.Vaihtoehdot = new List<string> { "Ensimmäinen", "Toinen", "Kolmas", "Neljäs" };
                    d.Oikea = 0;
                    break;
            }
            d.VihjeTarjolla = vihje != null;
            d.Fakta = "Pulma on päättelytehtävä: oikea ratkaisu näkyy piirroksesta.";
            return d;
        }

        static KysymysNaytto Kaksintaistelu() => new KysymysNaytto
        {
            Laji = KysymysLaji.Kaksintaistelu,
            Otsikko = "Rosvon kaksintaistelu — Fogg",
            Kehys = "Ryöstäjä tukkii tien. Väärä vastaus vie kaikki rahasi.",
            Kysymys = "Mikä joki virtaa Budapestin halki?",
            Vaihtoehdot = new List<string> { "Reinin", "Tonava", "Elbe", "Visla", "Dnepr", "Oder", "Po", "Rhône" },
            Oikea = 1,
            PuolitusTarjolla = true,
            PuolitusTeksti = "Helpotus (rosvo vie 150 £)",
            Raha = 300,
            Sekunnit = 45,
            Fakta = "Tonava jakaa Budapestin kukkulaiseen Budaan ja tasaiseen Pestiin. Kaupungit yhdistettiin yhdeksi vuonna 1873.",
            Lahteet = new List<string> { "https://fi.wikipedia.org/wiki/Budapest" },
        };

        static KysymysNaytto Tapahtumakortti() => new KysymysNaytto
        {
            Laji = KysymysLaji.Tapahtumakortti,
            Otsikko = "Lyon · tapahtuma",
            Kysymys = "Postivaunujen pyörä irtoaa mäessä, ja matkustajat joutuvat odottamaan sepän tuloa kylän majatalossa. Isäntä tarjoaa keittoa ja kertoo tarinoita silkinkutojien kapinasta.",
            Raha = 300,
            Vastattu = true,
            Oikein = true,
            Loyto = "Menetät vuoron",
            JatkaTeksti = "Jatka",
        };

        static KysymysNaytto Tulos()
        {
            var d = Visa();
            d.Vihje = vihje;
            d.VihjeTarjolla = false;
            d.Piilotetut = new List<int> { 0, 3 };
            d.PuolitusTarjolla = false;
            d.Raha = 180;
            d.Vastattu = true;
            d.Valittu = 1;
            d.Oikein = true;
            d.Loyto = "Löysit: Kätketty matka-arkku · +640 £\n+1 ◈";
            return d;
        }
    }
}
