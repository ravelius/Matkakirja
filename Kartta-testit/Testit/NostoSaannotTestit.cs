// NOSTOKERROKSEN PORTIT (löydös 50 osa B): NostoSaannot-säännöt webin mukaan (js/pallolauta/nostot.js:957/977,
// kaupunkiliuska.js:58/132, nostot.js:925/1969, nimet.js:292–303) ja koepaketin laskelma Ranskasta ja Kreikasta.
// Koepaketti (valinnainen): NOSTOT_KOE=<paketin kansio> tai oletus /Users/Shared/Claude/sisalto-koe/v49.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja;
using Matkakirja.Peli;

namespace Matkakirja.Kartta.Testit
{
    static class NostoSaannotTestit
    {
        static readonly NostoSaannot.Keskus Pariisi = new NostoSaannot.Keskus("Pariisi", 48.8566, 2.3522);

        [Testi]
        static void LahizoomiOsuudesta()
        {
            Oleta.Tosi(!NostoSaannot.LahizoomiAuki(1.0), "saapumisnäkymä 1,0 kiinni");
            Oleta.Tosi(NostoSaannot.LahizoomiAuki(0.7), "kynnys 0,7 auki");
            Oleta.Tosi(NostoSaannot.LahizoomiAuki(0.5), "porras 0,5 auki");
            Oleta.Tosi(!NostoSaannot.LahizoomiAuki(0.0), "tuntematon raja kiinni");
            Oleta.Tosi(!NostoSaannot.LahizoomiAuki(1.2), "saapumisnäkymää kauempana kiinni");
        }

        [Testi]
        static void PorttiPaastaaLahiJaPidattaaTaso3()
        {
            var N = NostoSaannot.Syy.Nakyy;
            Oleta.Sama(N, NostoSaannot.Portti(N, 2, false), "taso 2 heti (myös lahizoom-lippu)");
            Oleta.Sama(N, NostoSaannot.Portti(N, 1, false), "taso 1 heti");
            Oleta.Sama(NostoSaannot.Syy.Taso3, NostoSaannot.Portti(N, 3, false), "taso 3 odottaa");
            Oleta.Sama(N, NostoSaannot.Portti(N, 3, true), "taso 3 lähizoomissa");
            Oleta.Sama(NostoSaannot.Syy.Meri, NostoSaannot.Portti(NostoSaannot.Syy.Meri, 2, true), "datan syy voittaa lähelläkin");
        }

        [Testi]
        static void EtaisyysHaversine()
        {
            double d = NostoSaannot.EtaisyysKm(48.8566, 2.3522, 48.8049, 2.1204); // Pariisi–Versailles
            Oleta.Tosi(d > 17 && d < 18, "Pariisi–Versailles ~17,6 km, saatu " + d);
            Oleta.Tosi(NostoSaannot.EtaisyysKm(0, 179.9, 0, -179.9) < 23, "päivämääräraja");
        }

        [Testi]
        static void KaupunginSisainenNimestaJaSateesta()
        {
            var k = new List<NostoSaannot.Keskus> { Pariisi };
            Oleta.Sama(NostoSaannot.Syy.KaupunginNimi, NostoSaannot.KaupunginSisainen(" pariisi ", 47.0, 1.0, false, k, out var n1), "paikka = kaupunki");
            Oleta.Sama("Pariisi", n1);
            Oleta.Sama(NostoSaannot.Syy.KaupunginSade, NostoSaannot.KaupunginSisainen(null, 48.8622, 2.3325, false, k, out _), "Tuileries ≤ 12 km");
            Oleta.Sama(NostoSaannot.Syy.Nakyy, NostoSaannot.KaupunginSisainen("Versailles", 48.8049, 2.1204, false, k, out _), "Versailles 17 km jää kartalle");
            Oleta.Sama(NostoSaannot.Syy.Nakyy, NostoSaannot.KaupunginSisainen("Pariisi", 48.8566, 2.3522, true, k, out _), "kaupunkinosto ei ole sisäinen");
            Oleta.Sama(NostoSaannot.Syy.Nakyy, NostoSaannot.KaupunginSisainen("", 10, 10, false, new List<NostoSaannot.Keskus> { new NostoSaannot.Keskus("", 50, 50) }, out _), "tyhjä nimi ei osu");
        }

        [Testi]
        static void MeriNimikerroksesta()
        {
            var meret = new HashSet<string> { "valimeri", "egeanmeri", "englannin-kanaali" };
            Oleta.Sama("valimeri", NostoSaannot.MerinimenTunnus("Välimeri"));
            Oleta.Sama("englannin-kanaali", NostoSaannot.MerinimenTunnus("≈ Englannin kanaali"));
            Oleta.Tosi(NostoSaannot.OnMeri("luonto", "valimeri", "Välimeri", meret), "tunnus");
            Oleta.Tosi(NostoSaannot.OnMeri("luonto", "x", "Egeanmeri", meret), "nimen tunnus");
            Oleta.Tosi(!NostoSaannot.OnMeri("luonto", "kreetanmeri", "Kreetanmeri", meret), "ei nimikerroksessa → nosto");
            Oleta.Tosi(!NostoSaannot.OnMeri("historia", "valimeri", "Välimeri", meret), "vain luonto");
            Oleta.Tosi(!NostoSaannot.OnMeri("luonto", "valimeri", "Välimeri", new HashSet<string>()), "tyhjä joukko");
        }

        [Testi]
        static void KarttakerroinSaapumisesta()
        {
            Oleta.Tosi(Math.Abs(NostoSaannot.Karttakerroin(1000, 1000) - 1) < 1e-9, "saapuessa 1");
            Oleta.Tosi(Math.Abs(NostoSaannot.Karttakerroin(1000, 500) - 2) < 0.006, "porras 2");
            Oleta.Tosi(Math.Abs(NostoSaannot.Karttakerroin(1000, 250) - 4) < 0.012, "porras 4");
            Oleta.Tosi(Math.Abs(NostoSaannot.Karttakerroin(1000, 100000) - 0.2) < 0.001, "alaraja 0,2");
            Oleta.Sama(1.0, NostoSaannot.Karttakerroin(0, 500), "tuntematon vertailu");
            Oleta.Sama(NostoSaannot.Karttakerroin(1000, 499.9), NostoSaannot.Karttakerroin(1000, 500.0), "porras: heilahdus ei muuta");
        }

        [Testi]
        static void PiirtopisteAnkkuristaJaPuoli()
        {
            var uusi = (Dictionary<string, object>)MiniJson.Jasenna(
                "{\"lat\":48.8055,\"lon\":2.12,\"ladottu\":{\"lat\":47.689,\"lon\":2.6138},\"ankkuri\":{\"lat\":48.8055,\"lon\":2.12},\"puoli\":\"vasen\"}");
            Oleta.Tosi(NostoSaannot.Piirtopiste(uusi, out var la, out var lo) && la == 48.8055 && lo == 2.12, "ankkuri voittaa ladotun");
            Oleta.Tosi(NostoSaannot.OnAnkkuri(uusi), "ankkuroitu");
            Oleta.Sama("vasen", NostoSaannot.Puoli(uusi));
            var nolla = (Dictionary<string, object>)MiniJson.Jasenna(
                "{\"lat\":48.8622,\"lon\":2.3325,\"ladottu\":{\"lat\":48.4614,\"lon\":2.6138},\"ankkuri\":null,\"puoli\":null}");
            Oleta.Tosi(NostoSaannot.Piirtopiste(nolla, out la, out lo) && la == 48.4614 && lo == 2.6138, "ankkuri null → ladottu");
            Oleta.Tosi(!NostoSaannot.OnAnkkuri(nolla), "null ei ankkuri");
            Oleta.Sama(null, NostoSaannot.Puoli(nolla));
            var vanha = (Dictionary<string, object>)MiniJson.Jasenna("{\"lat\":35.3415,\"lon\":25.133,\"ladottu\":null}");
            Oleta.Tosi(NostoSaannot.Piirtopiste(vanha, out la, out lo) && la == 35.3415 && lo == 25.133, "vanha paketti → oma paikka");
            Oleta.Sama(null, NostoSaannot.Puoli(vanha), "vanha paketti ilman puolta");
            Oleta.Sama(null, NostoSaannot.Puoli((Dictionary<string, object>)MiniJson.Jasenna("{\"puoli\":\"koillinen\"}")), "tuntematon kylki");
        }

        /// <summary>Koepaketin v50 ankkurit: Versailles ja Iraklion piirtyvät omaan paikkaansa (web mitat kohta 4).</summary>
        [Testi]
        static void KoepaketinAnkkurit()
        {
            string kansio = Environment.GetEnvironmentVariable("NOSTOT_KOE_ANKKURI") ?? "/Users/Shared/Claude/sisalto-koe/v50";
            string kv = Path.Combine(kansio, "kokoelmat", "karttavalot.json");
            if (!File.Exists(kv)) { Console.WriteLine("  (koepakettia ei ole: " + kv + ")"); return; }
            var valot = MiniJson.Alkiot(File.ReadAllText(kv)).ToList();
            int ankkureita = valot.Count(NostoSaannot.OnAnkkuri), puolia = valot.Count(a => NostoSaannot.Puoli(a) != null);
            Console.WriteLine($"  {kansio}: {valot.Count} valoa, ankkuri {ankkureita}, puoli {puolia}");
            foreach (var (tunnus, lat, lon) in new[] { ("nosto-maalehti-peilisali", 48.8055, 2.12), ("iraklion", 35.3415, 25.133) })
            {
                var a = valot.FirstOrDefault(v => MiniJson.Teksti(v, "tunnus") == tunnus);
                Oleta.Tosi(a != null && NostoSaannot.OnAnkkuri(a), tunnus + " ankkuroitu");
                NostoSaannot.Piirtopiste(a, out var la, out var lo);
                Oleta.Tosi(NostoSaannot.EtaisyysKm(la, lo, lat, lon) < 0.1, tunnus + " ankkurissa, saatu " + la + "," + lo);
            }
        }

        /// <summary>Koepaketin laskelma: saapumisnäkymän portit (lähizoomi kiinni) Ranskalle ja Kreikalle.</summary>
        [Testi]
        static void KoepaketinRanskaJaKreikka()
        {
            string kansio = Environment.GetEnvironmentVariable("NOSTOT_KOE") ?? "/Users/Shared/Claude/sisalto-koe/v49";
            string kv = Path.Combine(kansio, "kokoelmat", "karttavalot.json"), ka = Path.Combine(kansio, "kokoelmat", "kaupungit.json");
            if (!File.Exists(kv) || !File.Exists(ka)) { Console.WriteLine("  (koepakettia ei ole: " + kv + ")"); return; }
            var meret = new HashSet<string>();
            string al = Path.Combine(kansio, "kokoelmat", "aluenimet.json"), mn = Path.Combine(kansio, "kokoelmat", "merinimet.json");
            if (File.Exists(al)) NostoSaannot.LisaaMerinimet(MiniJson.Alkiot(File.ReadAllText(al)), true, meret);
            if (File.Exists(mn)) NostoSaannot.LisaaMerinimet(MiniJson.Alkiot(File.ReadAllText(mn)), false, meret);
            var kaupungit = MiniJson.Alkiot(File.ReadAllText(ka))
                .Select(k => new NostoSaannot.Keskus(MiniJson.Teksti(k, "nimi"), MiniJson.Luku(k, "lat") ?? double.NaN, MiniJson.Luku(k, "lon") ?? double.NaN)).ToList();
            var valot = MiniJson.Alkiot(File.ReadAllText(kv)).Where(a => !(a.GetValueOrDefault("paakartalla") is bool pk) || pk).ToList();
            foreach (var (maa, odotettu) in new[] { ("FRA", 64), ("GRC", 62) })
            {
                var lista = valot.Where(a => MiniJson.Teksti(a, "maa") == maa).ToList();
                var keskukset = new List<NostoSaannot.Keskus>(kaupungit);
                foreach (var a in lista)
                    if (MiniJson.Teksti(a, "kategoria") == "kaupunki" || MiniJson.Teksti(a, "aihe") == "kaupungit")
                        keskukset.Add(new NostoSaannot.Keskus(MiniJson.Teksti(a, "nimi"), MiniJson.Luku(a, "lat") ?? double.NaN, MiniJson.Luku(a, "lon") ?? double.NaN));
                var syyt = new Dictionary<NostoSaannot.Syy, List<string>>();
                int lahi = 0, vanha = 0;
                foreach (var a in lista)
                {
                    var d = NostoSaannot.DatanSyy(MiniJson.Teksti(a, "aihe"), MiniJson.Teksti(a, "kategoria"), MiniJson.Teksti(a, "tunnus"),
                        MiniJson.Teksti(a, "nimi"), MiniJson.Teksti(a, "paikka"), MiniJson.Luku(a, "lat") ?? double.NaN, MiniJson.Luku(a, "lon") ?? double.NaN,
                        keskukset, meret, out _);
                    var s = NostoSaannot.Portti(d, (int)(MiniJson.Luku(a, "taso") ?? 1), false);
                    if (!syyt.TryGetValue(s, out var l)) syyt[s] = l = new List<string>();
                    l.Add(MiniJson.Teksti(a, "nimi"));
                    bool lz = a.GetValueOrDefault("lahizoom") is bool b && b;
                    if (lz) lahi++; else vanha++;
                }
                int n = syyt.TryGetValue(NostoSaannot.Syy.Nakyy, out var nak) ? nak.Count : 0;
                Console.WriteLine($"  {maa}: {lista.Count} pääkartan nostoa, ennen näkyi {vanha} (lahizoom-lippu piilotti {lahi}), nyt {n}");
                foreach (var p in syyt.Where(p => p.Key != NostoSaannot.Syy.Nakyy))
                    Console.WriteLine($"    {p.Key} {p.Value.Count}: {string.Join(", ", p.Value)}");
                if (kansio.TrimEnd('/').EndsWith("v49")) Oleta.Sama(odotettu, n, maa + " saapumisnäkymässä (v49)");
                string lahiNosto = maa == "FRA" ? "Reims" : "Meteor";
                Oleta.Tosi(nak.Any(x => x.Contains(lahiNosto)), lahiNosto + " (lahizoom-lippu) näkyy saapuessa");
            }
        }
    }
}
