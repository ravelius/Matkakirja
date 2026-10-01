// YHTEINEN PELIKEHYS (Siirtoseppä 1.10.2026; Päätoimittajan erä, omistajan pyyntö "tee … mylly", loki 3e36c00c7;
// docs/pelikatalogi.md "Pelisuunnitelmakortit"). Kaikki tulevat kahden pelaajan vuoropelit (Mylly, Mangala, Hnefatafl,
// Sudet ja lampaat, Kettu ja hanhet …) käyttävät samaa runkoa:
//   - IVuoropeli<TSiirto>: pelin säännöt (lailliset siirrot, siirto, peruutus, päättyminen, arvio).
//   - Botti: negamax alfa-beta-karsinnalla; vaikeus = hakusyvyys + häiriö (satunnainen siirto todennäköisyydellä)
//     pelikatalogin linjauksen mukaan ("vaikeustaso säädetään hakusyvyydellä ja satunnaisilla ei-optimaaleilla siirroilla").
//   - Vastustaja: botti (helppo / normaali / vaikea) tai kaveri samalla laitteella (hotseat-vuorottelu).
//   - PeliTulos + Pelikehys: tulos matkakirjaan (rivi), pelistreak (pelattu peli on pelipäivän teko,
//     Matka.KirjaaPelipaiva) ja talous (rahapalkkio botin voitosta; ei Aarnin vihjeitä, kaanonkorjaus 1.10.).
// Puhdas C# (ei UnityEngineä): Peli-testit ajaa säännöt ja botin ilman editoria. Satunnaisuus aina Satunnainen-
// lähteestä (siemen ulkoa), joten botin siirrot ovat testeissä toistettavia.
using System;
using System.Collections.Generic;

namespace Matkakirja.Peli.Pelit
{
    /// <summary>Kahden pelaajan vuoropeli. Pelaajat 0 ja 1; pelaaja 0 aloittaa.</summary>
    public interface IVuoropeli<TSiirto>
    {
        /// <summary>Kumman vuoro (0 tai 1).</summary>
        int Vuorossa { get; }
        /// <summary>Lailliset siirrot vuorossa olevalle pelaajalle (tyhjä = ei siirtoja). Kirjoittaa listaan (ei varausta hakuun).</summary>
        void Siirrot(List<TSiirto> ulos);
        /// <summary>Tekee laillisen siirron ja vaihtaa vuoron.</summary>
        void Tee(TSiirto siirto);
        /// <summary>Peruu viimeisimmän Tee-kutsun (botin haku ja kumoa-nappi).</summary>
        void Peru();
        /// <summary>Päättynyt peli: voittaja 0/1, tasapeli −1. null = kesken. Ei laske siirtoja, jos peli tietää tilansa.</summary>
        int? Lopputulos();
        /// <summary>Heuristinen arvio annetun pelaajan näkökulmasta (suurempi = parempi); vain keskeneräiselle pelille.</summary>
        int Arvio(int pelaaja);
    }

    public enum Vastustaja { BottiHelppo, BottiNormaali, BottiVaikea, Kaveri }

    /// <summary>Negamax alfa-beta. Voitto = Voitto − syvyys (nopein voitto ensin), häviö päinvastoin, tasapeli 0.</summary>
    public static class Botti
    {
        public const int Voitto = 1_000_000;

        /// <summary>Vaikeustaso: hakusyvyys (puolisiirtoina) ja häiriö (todennäköisyys pelata satunnainen laillinen siirto).</summary>
        public static (int Syvyys, double Hairio) Taso(Vastustaja v) => v switch
        {
            Vastustaja.BottiHelppo => (1, 0.35),
            Vastustaja.BottiNormaali => (3, 0.10),
            Vastustaja.BottiVaikea => (5, 0.0),
            _ => throw new ArgumentException("kaveri ei ole botti"),
        };

        /// <summary>Botin siirto. Tasaväkiset parhaat arvotaan, jotta peli ei ole joka kerta sama.</summary>
        public static TSiirto Valitse<TSiirto>(IVuoropeli<TSiirto> peli, int syvyys, double hairio, Satunnainen sat)
        {
            var siirrot = new List<TSiirto>();
            peli.Siirrot(siirrot);
            if (siirrot.Count == 0) throw new InvalidOperationException("ei laillisia siirtoja");
            if (siirrot.Count == 1) return siirrot[0];
            if (hairio > 0 && sat.Seuraava() < hairio) return siirrot[(int)(sat.Seuraava() * siirrot.Count)];
            int paras = int.MinValue;
            var parhaat = new List<TSiirto>();
            foreach (var s in siirrot)
            {
                peli.Tee(s);
                int arvo = -Negamax(peli, syvyys - 1, -Voitto * 2, Voitto * 2, 1);
                peli.Peru();
                if (arvo > paras) { paras = arvo; parhaat.Clear(); parhaat.Add(s); }
                else if (arvo == paras) parhaat.Add(s);
            }
            return parhaat.Count == 1 ? parhaat[0] : parhaat[(int)(sat.Seuraava() * parhaat.Count)];
        }

        static int Negamax<TSiirto>(IVuoropeli<TSiirto> peli, int syvyys, int alfa, int beta, int taso)
        {
            int oma = peli.Vuorossa;
            var tulos = peli.Lopputulos();
            if (tulos.HasValue) return tulos.Value < 0 ? 0 : tulos.Value == oma ? Voitto - taso : -(Voitto - taso);
            if (syvyys <= 0) return peli.Arvio(oma);
            var siirrot = new List<TSiirto>();
            peli.Siirrot(siirrot);
            if (siirrot.Count == 0) return -(Voitto - taso); // ei siirtoja = häviö (jos peli ei määritä toisin Lopputuloksessa)
            int paras = int.MinValue;
            foreach (var s in siirrot)
            {
                peli.Tee(s);
                int arvo = -Negamax(peli, syvyys - 1, -beta, -alfa, taso + 1);
                peli.Peru();
                if (arvo > paras) paras = arvo;
                if (paras > alfa) alfa = paras;
                if (alfa >= beta) break;
            }
            return paras;
        }
    }

    /// <summary>Yhden pelikerran tulos pelaajan (ihmisen, pelaaja 0) näkökulmasta; kaverin kanssa Voittaja kertoo kumpi voitti.</summary>
    public sealed class PeliTulos
    {
        /// <summary>Pelikatalogin tunnus (esim. "DEU-2") ja nimi pelaajalle (esim. "Mylly").</summary>
        public string PeliId, Nimi;
        /// <summary>Kohteen paikallinen nimi ja paikka matkakirjaan (esim. "Mühle", "Leipzig"); null = ei mainita.</summary>
        public string PaikallinenNimi, Paikka;
        public Vastustaja Vastustaja;
        /// <summary>0 = pelaaja (aloittaja), 1 = vastustaja/kaveri, −1 = tasapeli, −2 = luovutettu (pelaaja luovutti).</summary>
        public int Voittaja;
        public int Siirtoja;
        /// <summary>Laitteen paikallinen päivä yyyy-MM-dd (pelistreak).</summary>
        public string Paiva;

        public bool Botti => Vastustaja != Vastustaja.Kaveri;
        public bool PelaajaVoitti => Voittaja == 0;
    }

    /// <summary>Pelin talousmalli (docs/raportit/talous-suunnitelma-20260927.md kohta 3: "Peli (minipeli) 40–80 £"):
    /// rahapalkkio vain voitosta bottia vastaan, porrastettuna botin tason mukaan. Aarnin luettelon vihjeitä peleistä EI
    /// anneta (Päätoimittajan kaanonkorjaus 1.10.2026: Raamatun AARREVIHJEET — vihjeet ovat harvoja sivuhuomioita, eivät
    /// järjestelmä). Panos (huvipuistopelit) veloitetaan pelin alussa, ei kehyksessä.</summary>
    public sealed class PelinTalous
    {
        public int Panos;
        /// <summary>Palkkio botin voitosta: helppo, normaali, vaikea (£).</summary>
        public int Helppo, Normaali, Vaikea;

        /// <summary>Minipeli ilman panosta (Mylly ym. kohtaamiset): 40 / 60 / 80 £.</summary>
        public static readonly PelinTalous Minipeli = new PelinTalous { Helppo = 40, Normaali = 60, Vaikea = 80 };

        public int Palkkio(Vastustaja v) => v switch
        {
            Vastustaja.BottiHelppo => Helppo,
            Vastustaja.BottiNormaali => Normaali,
            Vastustaja.BottiVaikea => Vaikea,
            _ => 0,
        };
    }

    public static class Pelikehys
    {
        /// <summary>Palkkio vain botin voitosta millä tahansa tasolla (Päätoimittaja 1.10.2026). Kaveripeli samalla laitteella
        /// kirjataan matkakirjaan ja pelipäiväksi, mutta ei palkitse (molemmat kädet samassa laitteessa).</summary>
        public static bool Palkitaan(PeliTulos t) => t.Botti && t.PelaajaVoitti;

        public static int Rahapalkkio(PeliTulos t, PelinTalous talous) => Palkitaan(t) ? talous.Palkkio(t.Vastustaja) : 0;

        public static string VastustajanNimi(Vastustaja v) => v switch
        {
            Vastustaja.BottiHelppo => "botti (helppo)",
            Vastustaja.BottiNormaali => "botti (normaali)",
            Vastustaja.BottiVaikea => "botti (vaikea)",
            _ => "kaveri",
        };

        /// <summary>Matkakirjan rivi (pelaajan kielellä): "Mylly (Mühle), Leipzig: voitit botin (normaali) 31 siirrossa."</summary>
        public static string Matkakirjarivi(PeliTulos t)
        {
            string otsikko = t.Nimi + (t.PaikallinenNimi != null ? " (" + t.PaikallinenNimi + ")" : "") + (t.Paikka != null ? ", " + t.Paikka : "");
            string vast = VastustajanNimi(t.Vastustaja);
            string tulos;
            if (t.Voittaja == -2) tulos = "luovutit, vastassa " + vast;
            else if (t.Voittaja == -1) tulos = "tasapeli, vastassa " + vast;
            else if (!t.Botti) tulos = (t.Voittaja == 0 ? "aloittaja" : "toinen pelaaja") + " voitti kaveripelin";
            else tulos = t.PelaajaVoitti ? "voitit " + (vast.StartsWith("botti") ? "botin" + vast.Substring(5) : vast) : "hävisit, vastassa " + vast;
            return $"{otsikko}: {tulos} {t.Siirtoja} siirrossa.";
        }

        /// <summary>Pelikerran kirjaus matkaan: pelattu peli on pelipäivän teko (pelistreak, Matka.KirjaaPelipaiva) ja
        /// voittopalkkio kassaan (panos veloitetaan pelin alussa, ei tässä). Palauttaa streakin tuloksen (null = sama päivä
        /// jo kirjattu tai kelvoton päivä) ja maksetun palkkion.</summary>
        public static ((int Pituus, int Palkkio)? Streak, int Palkkio) Kirjaa(Matka matka, PeliTulos t, PelinTalous talous)
        {
            var streak = t.Paiva != null ? matka.KirjaaPelipaiva(t.Paiva) : null;
            int palkkio = Rahapalkkio(t, talous);
            if (palkkio > 0) matka.Tila.Pelaaja.Raha += palkkio;
            return (streak, palkkio);
        }
    }
}
