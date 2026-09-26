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

        // ==== LÖYDÖS 125: symbolit ja hehkupiste (web js/fokusnosto-symbolit.js, mitattu proto-3d/lokit/nostot-125) ====

        [Testi]
        static void MiniTunnusWebinTaulusta()
        {
            Oleta.Sama("vuori", NostoSaannot.MiniTunnus("luonto", "vuori"));
            Oleta.Sama("meri", NostoSaannot.MiniTunnus("luonto", "meri"), "meri aaltona");
            Oleta.Sama("meri", NostoSaannot.MiniTunnus("luonto", "joki"), "joki aaltona (NOSTOSYM_MINI_LAJIT)");
            Oleta.Sama("vuori", NostoSaannot.MiniTunnus("luonto", "jarvi"), "järvi kolmiona kuten webissä");
            Oleta.Sama("vuori", NostoSaannot.MiniTunnus("luonto", "saari"));
            Oleta.Sama("vuori", NostoSaannot.MiniTunnus("luonto", null), "laji puuttuu → webin oletus vuori (ei pistettä)");
            Oleta.Sama("huuto", NostoSaannot.MiniTunnus("huuto", "skandaali"));
            Oleta.Sama("elain", NostoSaannot.MiniTunnus("elain", null));
            Oleta.Sama("ihme", NostoSaannot.MiniTunnus("ihme", "historia"));
            Oleta.Sama("historia", NostoSaannot.MiniTunnus("historia", "kaupunki"));
            Oleta.Sama("huuto", NostoSaannot.MiniTunnus("tuntematon", null), "webin varamerkki");
            Oleta.Sama("huuto", NostoSaannot.MiniTunnus(null, null));
            foreach (var p in new[] { "silma", "historia", "ruoka", "kulttuuri", "tekniikka", "kauppa", "sana", "merenkulku", "urheilu", "kaupunki", "hetki" })
                Oleta.Tosi(NostoSaannot.OnPistemerkki(p), p + " on piste");
            foreach (var v in new[] { "vuori", "meri", "huuto", "elain", "ihme", null })
                Oleta.Tosi(!NostoSaannot.OnPistemerkki(v), (v ?? "null") + " ei ole piste");
        }

        [Testi]
        static void KuvamerkkiLajiEnsin()
        {
            Oleta.Sama("merkki-saari.png", NostoSaannot.Kuvamerkki("luonto", "saari"), "Santoríni");
            Oleta.Sama("merkki-joki.png", NostoSaannot.Kuvamerkki("luonto", "joki"));
            Oleta.Sama("merkki-kulttuuri.png", NostoSaannot.Kuvamerkki("kulttuuri", "urheilu"), "Olympia: laji ilman merkkiä → kategoria");
            Oleta.Sama("merkki-tekniikka.png", NostoSaannot.Kuvamerkki("kauppa", "tekniikka"), "Korintin kanava");
            Oleta.Sama("merkki-saari.png", NostoSaannot.Kuvamerkki("kauppa", "saari"), "Antikythera");
            Oleta.Sama("merkki-historia.png", NostoSaannot.Kuvamerkki("ihme", "historia"), "Rodoksen kolossi");
            Oleta.Sama("merkki-kauppa.png", NostoSaannot.Kuvamerkki("kauppa", "kaupunki"), "Ermoupoli");
            Oleta.Sama(null, NostoSaannot.Kuvamerkki("ihme", null));
            // Löydös 174b (26.9.): eläimet, skandaalit (kategoria huuto) ja hetket saivat omat merkit.
            Oleta.Sama("merkki-elain.png", NostoSaannot.Kuvamerkki("elain", "elain"));
            Oleta.Sama("merkki-huuto.png", NostoSaannot.Kuvamerkki("huuto", "skandaali"));
            Oleta.Sama("merkki-hetki.png", NostoSaannot.Kuvamerkki("hetki", "hetki"));
            Oleta.Sama("merkki-vuori.png", NostoSaannot.Kuvamerkki("luonto", null), "väliaikainen vara datalle ilman lajia");
            Oleta.Tosi(NostoSaannot.KuvamerkkiKaytossa(1, 0.52), "taso 1 aina");
            // Löydös 155 (build 20): kynnys 4 → 2,5 (NostoSaannot.TyyppimerkinKerroin, web samassa erässä).
            Oleta.Tosi(!NostoSaannot.KuvamerkkiKaytossa(2, 2.49), "taso 2 alle kertoimen 2,5");
            Oleta.Tosi(NostoSaannot.KuvamerkkiKaytossa(2, 2.5), "taso 2 kertoimesta 2,5");
        }

        [Testi]
        static void TasoJaSykeWebinMukaan()
        {
            Oleta.Sama(2, NostoSaannot.Taso(null), "puuttuva taso = 2 (web), ei 1");
            Oleta.Sama(1, NostoSaannot.Taso(1));
            Oleta.Sama(3, NostoSaannot.Taso(3));
            Oleta.Sama(2, NostoSaannot.Taso(0), "tuntematon arvo = 2");
            Oleta.Sama(2, NostoSaannot.Taso(1.5));
            Oleta.Tosi(Math.Abs(NostoSaannot.PisteenSyke(0.6, 1) - 1.07) < 1e-9, "neljännesjakso: 1,07");
            Oleta.Tosi(Math.Abs(NostoSaannot.PisteenSyke(1.8, 1) - 0.93) < 1e-9, "kolme neljännestä: 0,93");
            Oleta.Tosi(Math.Abs(NostoSaannot.PisteenSyke(0.6, 0) - 1) < 1e-12, "jäätynyt (voima 0) = 1");
            Oleta.Tosi(Math.Abs(NostoSaannot.PisteenSyke(0.6, 0.5) - 1.035) < 1e-9, "puolikas amplitudi");
        }

        /// <summary>Web keraa: eläintäyt koko laudalta, kun näkymän korkeus ≤ 34 / 0,75 = 45,3° eikä nappula liiku.</summary>
        [Testi]
        static void ElaintaytKokoLaudalta()
        {
            Oleta.Tosi(Math.Abs(NostoSaannot.ElaintakyNakyyKorkeus - 45.333) < 0.001, "raja 45,3°");
            Oleta.Tosi(NostoSaannot.ElaintaytNakyvat(16.3, false), "avauslennon jälkeen (Kreikka, 0,31 R) auki");
            Oleta.Tosi(NostoSaannot.ElaintaytNakyvat(8.5, false), "saapumisnäkymässä auki");
            Oleta.Tosi(!NostoSaannot.ElaintaytNakyvat(53.4, false), "koko pallo kiinni");
            Oleta.Tosi(!NostoSaannot.ElaintaytNakyvat(8.5, true), "nappula liikkuu → kiinni");
            Oleta.Tosi(!NostoSaannot.ElaintaytNakyvat(0, false), "tuntematon näkymä kiinni");
            string kv = Path.Combine(Environment.GetEnvironmentVariable("NOSTOT_125") ?? "/Users/Shared/Claude/proto-3d/lokit/nostot-125", "data", "karttavalot-v127.json");
            if (!File.Exists(kv)) return;
            var taky = MiniJson.Alkiot(File.ReadAllText(kv)).Where(a => MiniJson.Teksti(a, "lahde") == "elaintaky").ToList();
            Oleta.Tosi(taky.Count >= 100 && taky.Select(a => MiniJson.Teksti(a, "maa")).Distinct().Count() == taky.Count, "yksi täky per maa, saatu " + taky.Count);
            foreach (var (maa, nimio) in new[] { ("BGR", "Pelastuskarhu"), ("HUN", "Mangalitsa"), ("ROU", "Karhunpennut") })
                Oleta.Tosi(taky.Any(a => MiniJson.Teksti(a, "maa") == maa && MiniJson.Teksti(a, "nimio") == nimio), maa + " " + nimio + " (webin Ateenan kuvissa)");
        }

        [Testi]
        static void KaupunkimerkkiJaMerenNimio()
        {
            Oleta.Tosi(NostoSaannot.OnKaupunkimerkki("historia", "historia", "kaupunki"), "Marathon lajista");
            Oleta.Tosi(!NostoSaannot.OnKaupunkimerkki("kaupungit", "kaupunki", "historia"), "laji voittaa aiheen");
            Oleta.Tosi(NostoSaannot.OnKaupunkimerkki("kaupungit", "kaupunki", null), "ilman lajia aihe");
            Oleta.Tosi(!NostoSaannot.OnKaupunkimerkki("kulttuuri", "kulttuuri", null), "Kalamata ilman lajia: tavallinen (datan puute)");
            Oleta.Tosi(NostoSaannot.OnMerenNimio("meri") && !NostoSaannot.OnMerenNimio("joki") && !NostoSaannot.OnMerenNimio(null), "meren nimiö");
        }

        [Testi]
        static void HehkupisteWebinGradienteista()
        {
            const double e = 1e-9;
            Oleta.Tosi(Math.Abs(NostoSaannot.HehkunPeitto(0) - 0.45) < e && Math.Abs(NostoSaannot.HehkunPeitto(0.7) - 0.45) < e, "sisäympyrä 0,45");
            Oleta.Tosi(Math.Abs(NostoSaannot.HehkunPeitto(1.4) - 0.225) < e, "puolivälissä 0,225");
            Oleta.Tosi(NostoSaannot.HehkunPeitto(2.1) == 0 && NostoSaannot.HehkunPeitto(3) == 0, "2,1 r:stä ulos 0");
            // Sisus: polttopiste (−0,25; −0,25) = 0, reuna 1, keskipiste ratkaisusta (0,125 − √0,125) / −0,875.
            Oleta.Tosi(NostoSaannot.SisuksenOsuus(-0.25, -0.25) < 1e-6, "polttopiste vaalein");
            Oleta.Tosi(Math.Abs(NostoSaannot.SisuksenOsuus(1, 0) - 1) < 1e-6 && Math.Abs(NostoSaannot.SisuksenOsuus(0, -1) - 1) < 1e-6, "reuna 1");
            Oleta.Tosi(Math.Abs(NostoSaannot.SisuksenOsuus(0, 0) - (0.125 - Math.Sqrt(0.125)) / -0.875) < 1e-9, "keskipiste 0,261");
            Oleta.Tosi(NostoSaannot.SisuksenOsuus(0.5, 0.5) > NostoSaannot.SisuksenOsuus(-0.5, -0.5), "vaalea vasemmalla ylhäällä (y alas)");
            var vaalea = NostoSaannot.Vaalenna(NostoSaannot.PisteHarmaa, 0.42);
            Oleta.Sama(171.0, Math.Round(vaalea[0] * 255), "vaalenna #6f6a61 0,42 → r 171");
            var (r, g, b, a) = NostoSaannot.Hehkupiste(0, 0, 1);
            Oleta.Tosi(Math.Abs(a - (0.86 + 0.45 * 0.14)) < 1e-9, "keskellä kiekko häiveen päällä, saatu " + a);
            Oleta.Tosi(r > NostoSaannot.PisteHarmaa[0], "sisus harmaata vaaleampi");
            var (r2, _, _, a2) = NostoSaannot.Hehkupiste(1.5, 0, 0);
            Oleta.Tosi(Math.Abs(a2 - 0.45 * (1 - 0.8 / 1.4)) < 1e-9 && Math.Abs(r2 - NostoSaannot.PisteHarmaa[0]) < 1e-9, "kiekon ulkopuolella pelkkä harmaa häive");
            Oleta.Sama(0.0, NostoSaannot.Hehkupiste(2.2, 0, 0).A, "häiveen ulkopuolella läpinäkyvä");
        }

        /// <summary>
        /// Webin tuotannon datumit (lokit/nostot-125/web/web-kreikka-lajit.json, mitattu 25.9.2026): kategorialla ja
        /// lajilla natiivin säännöt antavat saman minimerkin, kuvamerkin ja kaupunkikoon kuin web kaikille Kreikan
        /// nostoille. Ilman lajia (karttavalot v127) listataan erot: ne ovat datan puutteita (Pelikoodarille).
        /// </summary>
        static readonly HashSet<string> Uudet174b = new HashSet<string> { "merkki-huuto.png", "merkki-elain.png", "merkki-hetki.png" };

        [Testi]
        static void WebinKreikanSymbolit()
        {
            string kansio = Environment.GetEnvironmentVariable("NOSTOT_125") ?? "/Users/Shared/Claude/proto-3d/lokit/nostot-125";
            string web = Path.Combine(kansio, "web", "web-kreikka-lajit.json"), kv = Path.Combine(kansio, "data", "karttavalot-v127.json");
            if (!File.Exists(web)) { Console.WriteLine("  (webin mittausta ei ole: " + web + ")"); return; }
            var rivit = ((List<object>)MiniJson.Jasenna(File.ReadAllText(web))).Cast<Dictionary<string, object>>()
                .Where(d => MiniJson.Teksti(d, "perhe") == "nosto").ToList();
            Oleta.Tosi(rivit.Count >= 50, "webin Kreikan nostoja " + rivit.Count);
            foreach (var d in rivit)
            {
                string kat = MiniJson.Teksti(d, "kategoria"), laji = MiniJson.Teksti(d, "laji"), nimi = MiniJson.Teksti(d, "nimi");
                Oleta.Sama(MiniJson.Teksti(d, "minimerkki"), NostoSaannot.MiniTunnus(kat, laji), nimi);
                string wk = MiniJson.Teksti(d, "kuvamerkki"), nk = NostoSaannot.Kuvamerkki(kat, laji);
                // Webin mittaus on 25.9. eli ennen löydöstä 174b: silloin huuto-, eläin- ja hetki-merkkejä ei ollut.
                if (wk == null && Uudet174b.Contains(nk ?? "")) continue;
                Oleta.Sama(wk == null ? null : Path.GetFileName(wk), nk, nimi + " kuvamerkki");
                Oleta.Sama(MiniJson.Kentta(d, "kaupunki") is bool kb && kb, NostoSaannot.OnKaupunkimerkki(MiniJson.Teksti(d, "aihe"), kat, laji), nimi + " kaupunki");
            }
            if (!File.Exists(kv)) return;
            // Datan puute: v127 ilman lajia → mikä natiivissa yhä eroaa webistä.
            var webinNimet = rivit.GroupBy(d => MiniJson.Teksti(d, "nimi")).ToDictionary(g => g.Key, g => g.First());
            var erot = new List<string>();
            int luontoPisteena = 0;
            foreach (var a in MiniJson.Alkiot(File.ReadAllText(kv)).Where(a => MiniJson.Teksti(a, "maa") == "GRC"))
            {
                string kat = MiniJson.Teksti(a, "kategoria"), laji = MiniJson.Teksti(a, "laji"), nimi = MiniJson.Teksti(a, "nimi");
                if (kat == "luonto" && NostoSaannot.OnPistemerkki(NostoSaannot.MiniTunnus(kat, laji))) luontoPisteena++;
                if (nimi == null || !webinNimet.TryGetValue(nimi, out var w)) continue;
                var syyt = new List<string>();
                if (NostoSaannot.MiniTunnus(kat, laji) != MiniJson.Teksti(w, "minimerkki")) syyt.Add("merkki " + MiniJson.Teksti(w, "minimerkki"));
                string wk = MiniJson.Teksti(w, "kuvamerkki");
                if (NostoSaannot.Kuvamerkki(kat, laji) != (wk == null ? null : Path.GetFileName(wk))) syyt.Add("kuvamerkki " + (wk == null ? "-" : Path.GetFileName(wk)));
                bool wKaup = MiniJson.Kentta(w, "kaupunki") is bool kb && kb;
                if (NostoSaannot.OnKaupunkimerkki(MiniJson.Teksti(a, "aihe"), kat, laji) != wKaup) syyt.Add("kaupunkikoko");
                if (NostoSaannot.OnMerenNimio(laji) != NostoSaannot.OnMerenNimio(MiniJson.Teksti(w, "laji"))) syyt.Add("meren nimiö");
                if (syyt.Count > 0) erot.Add($"{nimi} ({kat}, webin laji {MiniJson.Teksti(w, "laji")}): {string.Join(", ", syyt)}");
            }
            Console.WriteLine($"  v127 Kreikka ilman lajia: {erot.Count} nostoa eroaa webistä (datan puute)");
            foreach (var e in erot) Console.WriteLine("    " + e);
            Oleta.Sama(0, luontoPisteena, "yksikään luontonosto ei ole enää harmaa piste");
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
