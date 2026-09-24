// PELIAPU: pelisilmukan (PeliOhjain) puhdas logiikka ilman UnityEngineä,
// jotta sen voi testata dotnetilla (Peli-testit/Testit/PeliApuTestit.cs,
// ./kaanna.sh PeliApu). Pelaajan teot kulkevat aina Matkan julkisen
// rajapinnan kautta; tämä tiedosto vain päättää, mitä pelaajalle tarjotaan
// ja mihin kamera ajetaan (Pelikoodari, erä 3, 23.9.2026).
//
//   Vaihtoehdot  — matkavalinnan rivit napautettuun kaupunkiin
//   Matkusta     — valittu tapa Matkan teoiksi (peru, valitse, heitä, liiku)
//   ValitseSiirto— nopan siirroista napautettu kaupunki tai lähin sitä kohti
//   SiirtoKohteet — nopan siirtokohteet kartalle (web moveOptions), Valintavihje — pöllön vihjeen ajastin
//   Koordinaatti — kaupungin tai reitin askeleen lat/lon (isoympyrä a→b)
//   AjoKesto     — kamera-ajon kesto 1,5–3 s matkan pituuden mukaan
//   KirjoitaAtomisesti — tallennus tmp-tiedostoon ja siirto paikalleen
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using Matkakirja.Peli;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// Nopan siirtokohde kartalle (web vaihe 'move': korostettu kohde, js/pallolauta/merkit.js kohdeElementti).
    /// Kaupunki: iso kohdemerkki nimen kera; reitin varren piste (Kaupunki null): pieni merkki ilman nimeä.
    /// Napautus: PeliOhjain.ValitseSiirto(Avain).
    /// </summary>
    public sealed class SiirtoKohde
    {
        /// <summary>Siirron avain ("c:pariisi" tai "e:reitti:askel"), PeliOhjain.ValitseSiirto ottaa tämän.</summary>
        public string Avain;
        /// <summary>Kohdekaupungin tunnus; null = reitin varren piste.</summary>
        public string Kaupunki;
        /// <summary>Kaupungin nimi merkin lappuun; null reitin varrella (web: pistemerkillä ei nimeä).</summary>
        public string Nimi;
        public double Lat, Lon;
        /// <summary>Käytetyt askeleet (polun pituus; kaupunkiin voi pysähtyä ennen silmälukua).</summary>
        public int Askeleet;
    }

    /// <summary>
    /// Pöllön valintavihjeen ajastin (web js/ui.js paivitaValintavihje, peruValintavihje, kartallaKosketettu).
    /// Siirtovaiheen alusta ViiveMs ilman kartan kosketusta: Nayta kerran. Kosketus peruu ajastimen (ja vie
    /// näkyvän kuplan), eikä ajastinta viritetä uudelleen ennen kuin odotus on välillä päättynyt.
    /// </summary>
    public sealed class Valintavihje
    {
        /// <summary>Web VALINTAVIHJEEN_VIIVE.</summary>
        public const int ViiveMs = 15000;
        /// <summary>Web VALINTAVIHJEEN_TEKSTI (polloVihje).</summary>
        public const string Teksti = "Napauta korostettua kohdetta kartalla, niin matka jatkuu.";
        public enum Muutos { Ei, Nayta, Pois }

        /// <summary>Viive millisekunteina (testit voivat lyhentää, kuten web valintavihjeViive).</summary>
        public int Viive = ViiveMs;
        bool vaihe;       // web valintavihjeVaihe
        double? loppuu;   // web valintavihjeAjastin
        bool nakyy;

        /// <summary>Onko ajastin käynnissä.</summary>
        public bool Kay => loppuu.HasValue;
        public bool Nakyy => nakyy;

        /// <summary>Joka ruutu: odottaako peli valintaa kartalta, ja kello sekunteina.</summary>
        public Muutos Paivita(bool odottaaValintaa, double nytS)
        {
            if (!odottaaValintaa)
            {
                bool pois = vaihe && nakyy;
                vaihe = false; loppuu = null; nakyy = false;
                return pois ? Muutos.Pois : Muutos.Ei;
            }
            if (!vaihe) { vaihe = true; loppuu = nytS + Viive / 1000.0; return Muutos.Ei; }
            if (loppuu.HasValue && nytS >= loppuu.Value) { loppuu = null; nakyy = true; return Muutos.Nayta; }
            return Muutos.Ei;
        }

        /// <summary>Kartan kosketus (veto, nipistys tai napautus): ajastin pois, kupla pois; ei uutta tässä vaiheessa.</summary>
        public Muutos Kosketettu()
        {
            if (!vaihe) return Muutos.Ei;
            loppuu = null;
            bool pois = nakyy;
            nakyy = false;
            return pois ? Muutos.Pois : Muutos.Ei;
        }
    }

    /// <summary>
    /// Liiku-nappi piiloon kerronnan ajaksi (löydös 45, web js/ui.js kaynnistaLuentavahti + css body.luenta-aanessa
    /// .monitoimi-nappi display: none). Kysytään VahtiMs välein: piilossa, kun joku on äänessä (isoisä, saapumispuhe,
    /// Livia), ja Valirauha puheenvuoron jälkeen, jottei nappi välähdä kahden puheen välissä. Ohita pysäyttää puheen,
    /// joten nappi palaa välirauhan jälkeen.
    /// Varaventtiili koskee vain hiljaista odotusta (luento pyydetty, ääni ei kuulu): se päästää napin esiin
    /// Varaventtiili ms:n jälkeen, ettei jumiin jäänyt lataus jätä umpikujaa. Webin venttiili laskee koko puheen
    /// ajasta ja välähdyttää napin 30 s:n välein pitkän luennan keskellä (mitattu Ateena 24.9.: t 33,4 s näkyvissä
    /// 0,2 s); sitä ei tuoda natiiviin, koska web tarkoittaa venttiilillä roikkuvaa vuoroa, ei soivaa luentaa.
    /// </summary>
    public sealed class LuentaPiilo
    {
        /// <summary>Web LUENTAVAHDIN_VALI_MS.</summary>
        public const int VahtiMs = 200;
        /// <summary>Web LUENNAN_VALIRAUHA_MS = SAAPUMISEN_KUPLA_LUENNAN_JALKEEN_MS 900 + 400.</summary>
        public const int ValirauhaMs = 1300;
        /// <summary>Web LUENNAN_VARAVENTTIILI_MS.</summary>
        public const int VaraventtiiliMs = 30000;

        double? aaniLoppui;   // web puheLoppui: viimeisin hetki, jolloin joku oli äänessä
        double? odotusAlkoi;  // hiljaisen odotuksen alku (varaventtiilin kello)

        public bool Piilossa { get; private set; }

        /// <summary>
        /// kuuluu: jokin puhe soi (isoisä, saapumispuhe tai Livia). odottaa: luento on pyydetty mutta ei vielä soi
        /// (lataus tai viive). Palauttaa, onko Liiku piilossa.
        /// </summary>
        public bool Paivita(bool kuuluu, bool odottaa, double nytMs)
        {
            if (kuuluu) { aaniLoppui = nytMs; odotusAlkoi = null; return Piilossa = true; }
            if (odottaa)
            {
                odotusAlkoi ??= nytMs;
                if (nytMs - odotusAlkoi.Value < VaraventtiiliMs) return Piilossa = true;
            }
            else odotusAlkoi = null;
            if (aaniLoppui.HasValue && nytMs - aaniLoppui.Value < ValirauhaMs) return Piilossa = true;
            aaniLoppui = null;
            return Piilossa = false;
        }
    }

    /// <summary>Yksi matkavalinnan rivi (bussi, lento, liftaus tai laiva).</summary>
    public sealed class MatkaVaihtoehto
    {
        public Kulkutapa Tapa;
        /// <summary>Hinta puntina (laivalla lippu vain satamasta lähdettäessä).</summary>
        public int Hinta;
        /// <summary>Heitetäänkö noppaa (liftaus, laiva); bussi ja lento vievät perille.</summary>
        public bool Noppa;
        /// <summary>Lyhin askelmäärä kohteeseen tällä tavalla; null = ei reittiä.</summary>
        public int? Askelia;
        public string Nimi;
        public string Selite;
        /// <summary>Mannerlento (Kaupat.MannerLento, web actionMannerLento): Tapa = Lento ilman lentokenttää.</summary>
        public bool Mannerlento;
        /// <summary>Seitsemän peninkulman askel (Linssiomistus.VapaaSiirtyminen): ilman noppaa, hinta 0, vie vuoron.</summary>
        public bool Vapaa;
    }

    /// <summary>Matkan tulos käyttöliittymälle: minne kamera ajaa ja avataanko lehti.</summary>
    public sealed class MatkanTulos
    {
        public bool Ok;
        public string Virhe;
        public Kulkutapa Tapa;
        public int? Noppa;
        public Sijainti Lahto;
        public Sijainti Kohde;
        /// <summary>Kaupunki, johon saavuttiin (Matka.Saapui), tai null reitin varrella.</summary>
        public string Saapui;
        /// <summary>Kuljettu polku lähdön jälkeen (web path; nappulan matkapisteet), null lennossa.
        /// Matka.Tila.ViimePolku nollautuu jo seuraavan vuoron alussa, joten se kirjataan tähän.</summary>
        public List<Sijainti> Polku;
        /// <summary>Mannerlento (web actionMannerLento): lento ilman siirtymäraitaa (äänet B7 erä 5).</summary>
        public bool Mannerlento;
        public bool Liikkui => !Lahto.Equals(Kohde);
    }

    public static class PeliApu
    {
        public const string Valuutta = "puntaa";
        /// <summary>Web ui.js vaihe 'roll': paluunapin nimi (iconButton('nuoli', …)).</summary>
        public const string VaihdaTeksti = "Vaihda matkustustapa";

        /// <summary>
        /// Pelinappulan matkapisteet (Kartta/Nappula.Aja): lähtö ja reitin askeleet (Matka.Tila.ViimePolku,
        /// lähtö ei mukana kuten webin path) tai pelkkä kohde, jos polkua ei ole. Tuntemattomat ohitetaan.
        /// </summary>
        public static List<(double Lat, double Lon)> Matkapisteet(IReittiverkko v, Sijainti lahto, IReadOnlyList<Sijainti> polku, Sijainti kohde)
        {
            var pisteet = new List<(double, double)>();
            void Lisaa(Sijainti s)
            {
                var k = Koordinaatti(v, s);
                if (k.HasValue && (pisteet.Count == 0 || pisteet[pisteet.Count - 1] != (k.Value.Lat, k.Value.Lon))) pisteet.Add((k.Value.Lat, k.Value.Lon));
            }
            Lisaa(lahto);
            if (polku != null && polku.Count > 0) foreach (var s in polku) Lisaa(s);
            else Lisaa(kohde);
            return pisteet;
        }

        // --- nimet ------------------------------------------------------------

        public static string TavanNimi(Kulkutapa t) => t switch
        {
            Kulkutapa.Bussi => "Bussi",
            Kulkutapa.Lento => "Lento",
            Kulkutapa.Maa => "Liftaus",
            Kulkutapa.Meri => "Laiva",
            _ => "Tutki",
        };

        /// <summary>Komentorivin tapa: bussi, lento, liftaus|maa|noppa, laiva|meri.</summary>
        public static Kulkutapa? TapaTekstista(string s)
        {
            switch ((s ?? "").Trim().ToLowerInvariant())
            {
                case "bussi": return Kulkutapa.Bussi;
                case "lento": case "lenna": return Kulkutapa.Lento;
                case "liftaus": case "maa": case "noppa": return Kulkutapa.Maa;
                case "laiva": case "meri": return Kulkutapa.Meri;
                default: return null;
            }
        }

        public static string AikaNimi(Vuorokaudenaika a) => a switch
        {
            Vuorokaudenaika.Aamu => "aamu",
            Vuorokaudenaika.Keskipaiva => "keskipäivä",
            Vuorokaudenaika.Ilta => "ilta",
            _ => "yö",
        };

        public static string KaupunginNimi(IReittiverkko v, string id) =>
            id != null && v.Kaupungit.TryGetValue(id, out var k) && !string.IsNullOrEmpty(k.Nimi) ? k.Nimi : id;

        /// <summary>"Pariisi" tai "Pariisi–Lontoo" (reitin varrella).</summary>
        public static string SijaintiNimi(IReittiverkko v, Sijainti s)
        {
            if (s.Kaupungissa) return KaupunginNimi(v, s.Kaupunki);
            return v.Reitit.TryGetValue(s.Reitti, out var r)
                ? KaupunginNimi(v, r.A) + "–" + KaupunginNimi(v, r.B) : s.Reitti;
        }

        /// <summary>Tilarivin teksti: "300 puntaa · päivä 1 · aamu · Pariisi".</summary>
        public static string TilaTeksti(IReittiverkko v, Pelitila t) =>
            $"{t.Pelaaja.Raha} {Valuutta} · päivä {t.Paiva()} · {AikaNimi(t.Vuorokaudenaika())} · {SijaintiNimi(v, t.Pelaaja.Sijainti)}";

        // --- koordinaatit ---------------------------------------------------

        const double Rad = Math.PI / 180.0;

        /// <summary>Isoympyräkulma asteina kahden pisteen välillä.</summary>
        public static double Kulma(double lat1, double lon1, double lat2, double lon2)
        {
            double c = Math.Sin(lat1 * Rad) * Math.Sin(lat2 * Rad)
                     + Math.Cos(lat1 * Rad) * Math.Cos(lat2 * Rad) * Math.Cos((lon2 - lon1) * Rad);
            return Math.Acos(Math.Max(-1, Math.Min(1, c))) / Rad;
        }

        /// <summary>Piste isoympyrällä a→b osuudella t (0 = a, 1 = b). Lon väliltä [-180, 180].</summary>
        public static (double Lat, double Lon) Isoympyra(double lat1, double lon1, double lat2, double lon2, double t)
        {
            double x1 = Math.Cos(lat1 * Rad) * Math.Cos(lon1 * Rad), y1 = Math.Cos(lat1 * Rad) * Math.Sin(lon1 * Rad), z1 = Math.Sin(lat1 * Rad);
            double x2 = Math.Cos(lat2 * Rad) * Math.Cos(lon2 * Rad), y2 = Math.Cos(lat2 * Rad) * Math.Sin(lon2 * Rad), z2 = Math.Sin(lat2 * Rad);
            double d = Kulma(lat1, lon1, lat2, lon2) * Rad;
            double a, b;
            if (d < 1e-9) return (lat1, Kiedo(lon1));
            if (Math.PI - d < 1e-6) { a = 1 - t; b = t; } // vastapisteet: suunta on mielivaltainen
            else { a = Math.Sin((1 - t) * d) / Math.Sin(d); b = Math.Sin(t * d) / Math.Sin(d); }
            double x = a * x1 + b * x2, y = a * y1 + b * y2, z = a * z1 + b * z2;
            double n = Math.Sqrt(x * x + y * y + z * z);
            if (n < 1e-12) return (lat1, Kiedo(lon1));
            return (Math.Asin(Math.Max(-1, Math.Min(1, z / n))) / Rad, Math.Atan2(y, x) / Rad);
        }

        static double Kiedo(double lon) => ((lon % 360.0) + 540.0) % 360.0 - 180.0;

        /// <summary>
        /// Sijainnin lat/lon: kaupunki sellaisenaan, reitin askel idx isoympyrällä
        /// a→b osuudella idx/askeleet. null = tuntematon kaupunki tai reitti.
        /// </summary>
        public static (double Lat, double Lon)? Koordinaatti(IReittiverkko v, Sijainti s)
        {
            if (s.Kaupungissa)
                return v.Kaupungit.TryGetValue(s.Kaupunki, out var k) ? (k.Lat, k.Lon) : ((double, double)?)null;
            if (s.Reitti == null || !v.Reitit.TryGetValue(s.Reitti, out var r)) return null;
            if (!v.Kaupungit.TryGetValue(r.A, out var a) || !v.Kaupungit.TryGetValue(r.B, out var b)) return null;
            double t = r.Askeleet > 0 ? (double)s.Askel / r.Askeleet : 0.5;
            return Isoympyra(a.Lat, a.Lon, b.Lat, b.Lon, Math.Max(0, Math.Min(1, t)));
        }

        /// <summary>Kamera-ajon kesto sekunteina: 1,5 s lähelle, 3 s yli 45° matkalle.</summary>
        public static float AjoKesto(double kulmaAsteina) =>
            (float)(1.5 + 1.5 * Math.Max(0, Math.Min(1, kulmaAsteina / 45.0)));

        /// <summary>Kapeamman suunnan kaari (astetta), jolla lähtö ja kohde näkyvät yhtä aikaa.</summary>
        public static double YleiskuvanKaari(double kulmaAsteina, double lahin = 18.6) =>
            Math.Max(lahin, Math.Min(140.0, kulmaAsteina * 1.6 + 6.0));

        // --- reitit ---------------------------------------------------------

        static ReitinLaji? TavanLaji(Kulkutapa t) =>
            t == Kulkutapa.Maa ? ReitinLaji.Maa : t == Kulkutapa.Meri ? ReitinLaji.Meri : (ReitinLaji?)null;

        /// <summary>Yhden askeleen naapurit (kuten Reittiverkko.Askeleet, mutta IReittiverkon kautta, ilman peruutuskieltoa).</summary>
        static IEnumerable<Sijainti> Naapurit(IReittiverkko v, Sijainti p, ReitinLaji? laji)
        {
            if (p.Kaupungissa)
            {
                foreach (var eid in v.Naapurireitit(p.Kaupunki))
                {
                    if (!v.Reitit.TryGetValue(eid, out var e)) continue;
                    if (laji != null && e.Laji != laji.Value) continue;
                    bool alusta = e.A == p.Kaupunki;
                    var toinen = alusta ? e.B : e.A;
                    if (e.Askeleet <= 1) yield return Sijainti.KaupungissaSijainti(toinen);
                    else yield return Sijainti.ReitillaSijainti(eid, alusta ? 1 : e.Askeleet - 1);
                }
            }
            else if (p.Reitti != null && v.Reitit.TryGetValue(p.Reitti, out var e))
            {
                foreach (var idx in new[] { p.Askel - 1, p.Askel + 1 })
                {
                    if (idx <= 0) yield return Sijainti.KaupungissaSijainti(e.A);
                    else if (idx >= e.Askeleet) yield return Sijainti.KaupungissaSijainti(e.B);
                    else yield return Sijainti.ReitillaSijainti(e.Id, idx);
                }
            }
        }

        /// <summary>Lyhin askelmäärä kaupunkiin (leveyshaku; maa- tai merireitit tavan mukaan). null = ei reittiä.</summary>
        public static int? AskeliaKohteeseen(IReittiverkko v, Sijainti lahto, string kohde, Kulkutapa tapa)
        {
            if (kohde == null) return null;
            if (lahto.Kaupungissa && lahto.Kaupunki == kohde) return 0;
            var laji = TavanLaji(tapa);
            var nahty = new HashSet<string> { lahto.Avain };
            var jono = new Queue<(Sijainti, int)>();
            jono.Enqueue((lahto, 0));
            while (jono.Count > 0)
            {
                var (p, n) = jono.Dequeue();
                foreach (var s in Naapurit(v, p, laji))
                {
                    if (s.Kaupungissa && s.Kaupunki == kohde) return n + 1;
                    if (nahty.Add(s.Avain)) jono.Enqueue((s, n + 1));
                }
            }
            return null;
        }

        /// <summary>
        /// Nopan siirroista: napautettu kaupunki, jos se on siirroissa; muuten
        /// se, josta on vähiten askelia perille (sitten lyhin isoympyrä, sitten
        /// siirtojen järjestys). Ilman tavoitetta ensimmäinen kaupunki, muuten ensimmäinen.
        /// </summary>
        public static string ValitseSiirto(IReittiverkko v, IReadOnlyDictionary<string, Siirto> siirrot, string tavoite, Kulkutapa tapa)
        {
            if (siirrot == null || siirrot.Count == 0) return null;
            if (tavoite != null && siirrot.ContainsKey("c:" + tavoite)) return "c:" + tavoite;
            if (tavoite == null || !v.Kaupungit.TryGetValue(tavoite, out var kohde))
                return siirrot.FirstOrDefault(s => s.Value.Kohde.Kaupungissa).Key ?? siirrot.Keys.First();

            string paras = null;
            int parasAskel = int.MaxValue;
            double parasKulma = double.MaxValue;
            foreach (var s in siirrot)
            {
                int askel = AskeliaKohteeseen(v, s.Value.Kohde, tavoite, tapa) ?? int.MaxValue;
                var k = Koordinaatti(v, s.Value.Kohde);
                double kulma = k.HasValue ? Kulma(k.Value.Lat, k.Value.Lon, kohde.Lat, kohde.Lon) : double.MaxValue;
                if (askel < parasAskel || (askel == parasAskel && kulma < parasKulma - 1e-9))
                {
                    paras = s.Key; parasAskel = askel; parasKulma = kulma;
                }
            }
            return paras;
        }

        // --- matkavalinta ---------------------------------------------------

        static bool OnNoppatapa(Kulkutapa t) => t == Kulkutapa.Maa || t == Kulkutapa.Meri;

        /// <summary>
        /// Tavat, jotka pelaaja voi nyt valita. Toiminta-vaiheessa Matka.Kulkutavat.
        /// Heitto-vaiheessa (Matka valitsi ainoan noppatavan, esim. Pariisissa
        /// liftauksen, tai matka on kesken reitillä) valittu tapa ja kaupungissa
        /// bussi, jos Matka sallii perumisen (MuitaTapojaTarjolla).
        /// </summary>
        public static List<Kulkutapa> ValittavatTavat(Matka m)
        {
            var t = m.Tila;
            if (t.Vaihe == Vaihe.Toiminta) return m.Kulkutavat().Where(x => x != Kulkutapa.Pysy).ToList();
            var tavat = new List<Kulkutapa>();
            if (t.Vaihe != Vaihe.Heitto) return tavat;
            if (t.Kulkutapa.HasValue && OnNoppatapa(t.Kulkutapa.Value)) tavat.Add(t.Kulkutapa.Value);
            if (m.MuitaTapojaTarjolla()) tavat.Add(Kulkutapa.Bussi);
            return tavat;
        }

        /// <summary>
        /// Matkavalinnan rivit napautettuun kaupunkiin järjestyksessä bussi,
        /// lento, liftaus, laiva. Bussi vain naapuriin ja lento vain
        /// lentoreitille (Matkan omat kohdelistat, jotka tarkistavat myös rahan);
        /// liftaus ja laiva ovat noppamatkoja, jotka tarjotaan aina kun tapa on
        /// käytettävissä — noppa vie perille tai lähimmäs reittiä pitkin.
        /// </summary>
        public static List<MatkaVaihtoehto> Vaihtoehdot(Matka m, string kohde)
        {
            var tulos = new List<MatkaVaihtoehto>();
            var p = m.Tila.Pelaaja;
            if (kohde == null || !m.Verkko.Kaupungit.ContainsKey(kohde)) return tulos;
            if (p.Sijainti.Kaupungissa && p.Sijainti.Kaupunki == kohde) return tulos;
            var tavat = ValittavatTavat(m);

            if (tavat.Contains(Kulkutapa.Bussi) && m.BussiKohteet().Contains(kohde))
                tulos.Add(new MatkaVaihtoehto
                {
                    Tapa = Kulkutapa.Bussi, Hinta = Vakiot.BussiHinta, Askelia = AskeliaKohteeseen(m.Verkko, p.Sijainti, kohde, Kulkutapa.Maa),
                    Nimi = "Bussi", Selite = $"{Vakiot.BussiHinta} {Valuutta} · perillä heti, aika ei kulu",
                });
            if (tavat.Contains(Kulkutapa.Lento) && m.LentoKohteet().Contains(kohde))
                tulos.Add(new MatkaVaihtoehto
                {
                    Tapa = Kulkutapa.Lento, Hinta = Vakiot.LentoHinta,
                    Nimi = "Lento", Selite = $"{Vakiot.LentoHinta} {Valuutta} · perillä, vie vuoron",
                });
            else if (Mannerlento(m, kohde) is MannerlentoKohde ml)
                tulos.Add(MannerlentoVaihtoehto(ml));
            foreach (var tapa in new[] { Kulkutapa.Maa, Kulkutapa.Meri })
            {
                if (!tavat.Contains(tapa)) continue;
                var askelia = AskeliaKohteeseen(m.Verkko, p.Sijainti, kohde, tapa);
                // Laivalippu satamasta; kesken merimatkan (tai jo valittuna) hinta on odottava maksu.
                int hinta = tapa == Kulkutapa.Meri
                    ? (m.Tila.Vaihe == Vaihe.Heitto ? m.Tila.OdottavaMaksu : (p.Sijainti.Kaupungissa ? Vakiot.MeriHinta : 0))
                    : 0;
                string matka = askelia.HasValue ? $"{askelia} askelta perille" : "ei suoraa reittiä, noppa vie lähemmäs";
                bool kesken = !p.Sijainti.Kaupungissa;
                tulos.Add(new MatkaVaihtoehto
                {
                    Tapa = tapa, Hinta = hinta, Noppa = true, Askelia = askelia,
                    Nimi = kesken ? "Jatka matkaa" : TavanNimi(tapa),
                    Selite = (hinta > 0 ? $"{hinta} {Valuutta}" : "ilmainen") + " · noppa · " + matka,
                });
            }
            return tulos;
        }

        // --- Liiku-vuo: tapa ensin, kohde sitten (web renderTravelChoice vaihe B) ------------------

        /// <summary>
        /// Kohderivit valitulle tavalle (web vaihe B): bussi "Kaupunki (50 p)" naapureihin (busDestinations),
        /// lento "Kaupunki (300 p)" (airportDestinations) ja perään mannerlennot "Lennä Oseaniaan: Sydney (300 p)",
        /// laiva yksi rivi "Laivalla (100 p)" (kohde null: valitsee tavan, noppa heitetään heittonapista).
        /// Liftaus: tyhjä (web doWalk heittää heti; kohde valitaan kartalta, SiirtoKohteet).
        /// </summary>
        public static List<(string Kohde, MatkaVaihtoehto Rivi)> KohdeRivit(Matka m, Kulkutapa tapa, IReadOnlyList<MannerlentoKohde> mannerlennot = null)
        {
            var rivit = new List<(string, MatkaVaihtoehto)>();
            switch (tapa)
            {
                case Kulkutapa.Bussi:
                    foreach (var k in m.BussiKohteet())
                        rivit.Add((k, new MatkaVaihtoehto { Tapa = Kulkutapa.Bussi, Hinta = Vakiot.BussiHinta, Nimi = $"{KaupunginNimi(m.Verkko, k)} ({Vakiot.BussiHinta} p)" }));
                    break;
                case Kulkutapa.Lento:
                    foreach (var k in m.LentoKohteet())
                        rivit.Add((k, new MatkaVaihtoehto { Tapa = Kulkutapa.Lento, Hinta = Vakiot.LentoHinta, Nimi = $"{KaupunginNimi(m.Verkko, k)} ({Vakiot.LentoHinta} p)" }));
                    foreach (var k in mannerlennot ?? new Kaupat(m).MannerLennot())
                        rivit.Add((k.Kaupunki, new MatkaVaihtoehto
                        {
                            Tapa = Kulkutapa.Lento, Hinta = Vakiot.LentoHinta, Mannerlento = true,
                            Nimi = $"{KauppaVakiot.MannerlentoNappi(k)} ({Vakiot.LentoHinta} p)",
                        }));
                    break;
                case Kulkutapa.Meri:
                    if (m.Kulkutavat().Contains(Kulkutapa.Meri))
                        rivit.Add((null, new MatkaVaihtoehto { Tapa = Kulkutapa.Meri, Hinta = Vakiot.MeriHinta, Noppa = true, Nimi = $"Laivalla ({Vakiot.MeriHinta} p)" }));
                    break;
            }
            return rivit;
        }

        /// <summary>
        /// Nopan siirtokohteet kartalle (web vaihe 'move': game.moveOptions, js/game.js). Kaikki siirrot ovat
        /// laillisia, mutta kartalla tarjotaan suunnittain (polun ensimmäinen askel) vain kaupungit; jos
        /// suunnalla ei ole kaupunkia nopan päässä, sen suunnan reitin varren pisteet tarjotaan, jottei suunta
        /// katoa. Järjestys: kaupungit nimen mukaan, sitten reitin varren pisteet (testikomento `rivi i`).
        /// Paikka on sijainnin lat/lon (Koordinaatti); kohde ilman koordinaattia jää pois (web pallonKohta null).
        /// </summary>
        public static List<SiirtoKohde> SiirtoKohteet(Matka m)
        {
            var t = m.Tila;
            var kohteet = new List<SiirtoKohde>();
            if (t.Vaihe != Vaihe.Siirto || t.Siirrot == null) return kohteet;
            var suunnat = new Dictionary<string, List<KeyValuePair<string, Siirto>>>();
            var jarjestys = new List<string>();
            foreach (var s in t.Siirrot)
            {
                var suunta = s.Value.Polku != null && s.Value.Polku.Count > 0 ? s.Value.Polku[0].Avain : s.Key;
                if (!suunnat.TryGetValue(suunta, out var lista)) { suunnat[suunta] = lista = new List<KeyValuePair<string, Siirto>>(); jarjestys.Add(suunta); }
                lista.Add(s);
            }
            var tarjottavat = new List<KeyValuePair<string, Siirto>>();
            foreach (var suunta in jarjestys)
            {
                var lista = suunnat[suunta];
                var kaupungit = lista.Where(s => s.Value.Kohde.Kaupungissa).ToList();
                tarjottavat.AddRange(kaupungit.Count > 0 ? kaupungit : lista);
            }
            foreach (var s in tarjottavat.Distinct()
                         .OrderBy(s => s.Value.Kohde.Kaupungissa ? 0 : 1)
                         .ThenBy(s => SijaintiNimi(m.Verkko, s.Value.Kohde), StringComparer.Ordinal).ThenBy(s => s.Key, StringComparer.Ordinal))
            {
                var k = Koordinaatti(m.Verkko, s.Value.Kohde);
                if (!k.HasValue) continue;
                var kaupunki = s.Value.Kohde.Kaupungissa ? s.Value.Kohde.Kaupunki : null;
                kohteet.Add(new SiirtoKohde
                {
                    Avain = s.Key, Kaupunki = kaupunki, Nimi = kaupunki != null ? KaupunginNimi(m.Verkko, kaupunki) : null,
                    Lat = k.Value.Lat, Lon = k.Value.Lon, Askeleet = s.Value.Polku?.Count ?? 0,
                });
            }
            return kohteet;
        }

        /// <summary>Mannerlento kohteeseen, jos se on nyt tarjolla (web mannerLennot), muuten null.</summary>
        public static MannerlentoKohde Mannerlento(Matka m, string kohde) =>
            new Kaupat(m).MannerLennot().FirstOrDefault(k => k.Kaupunki == kohde);

        /// <summary>Matkavalinnan rivi mannerlennolle (web MANNERLENTO_NAPPI, hinta kuten lennossa).</summary>
        public static MatkaVaihtoehto MannerlentoVaihtoehto(MannerlentoKohde k) => new MatkaVaihtoehto
        {
            Tapa = Kulkutapa.Lento, Hinta = Vakiot.LentoHinta, Mannerlento = true,
            Nimi = KauppaVakiot.MannerlentoNappi(k),
            Selite = $"{Vakiot.LentoHinta} {Valuutta} · mannerlento, vie vuoron",
        };

        /// <summary>
        /// Toteuttaa valinnan Matkan teoilla: Heitto-vaiheessa ensin
        /// PeruKulkutapa, jos valittiin muu kuin jo valittu noppatapa; bussi →
        /// Bussi, lento → Lenna (mannerlento → Kaupat.MannerLento), noppatapa → ValitseKulkutapa + Heita + Liiku
        /// (ValitseSiirto). Saapuminen luetaan Matka.Saapui-tapahtumasta.
        /// </summary>
        /// <summary>Peninkulman askeleen rivi matkavalintaan (ensimmäiseksi).</summary>
        public static MatkaVaihtoehto VapaaVaihtoehto() => new MatkaVaihtoehto
        {
            Tapa = Kulkutapa.Lento, Hinta = 0, Vapaa = true,
            Nimi = "Seitsemän peninkulman askel", Selite = "ilmainen · ilman noppaa, vie vuoron",
        };

        public static MatkanTulos Matkusta(Matka m, string kohde, Kulkutapa tapa, bool mannerlento = false,
            Func<string, TekoTulos> vapaaSiirtyminen = null, string siirto = null)
        {
            var tulos = new MatkanTulos { Tapa = tapa, Lahto = m.Tila.Pelaaja.Sijainti };
            if (m.Tila.Vaihe == Vaihe.Siirto && m.Tila.Kulkutapa.HasValue && OnNoppatapa(m.Tila.Kulkutapa.Value))
                tulos.Tapa = tapa = m.Tila.Kulkutapa.Value;
            string saapui = null;
            Action<Pelaaja, string, bool> kuuntelija = (_, k, __) => saapui = k;
            m.Saapui += kuuntelija;
            try
            {
                TekoTulos r;
                if (vapaaSiirtyminen != null)
                {
                    // Peninkulma purkaa esivalinnan itse (VapaaSiirtyminen).
                    r = vapaaSiirtyminen(kohde);
                    if (!r.Ok) return Epaonnistui(tulos, m, r.Virhe);
                    tulos.Ok = true;
                    tulos.Tapa = Kulkutapa.Lento;
                    tulos.Kohde = m.Tila.Pelaaja.Sijainti;
                    tulos.Saapui = saapui;
                    return tulos;
                }
                if (m.Tila.Vaihe == Vaihe.Heitto && !(OnNoppatapa(tapa) && m.Tila.Kulkutapa == tapa))
                {
                    r = m.PeruKulkutapa();
                    if (!r.Ok) return Epaonnistui(tulos, m, r.Virhe);
                }
                switch (tapa)
                {
                    case Kulkutapa.Bussi:
                        tulos.Polku = m.BussiPolku(KaupunkiJossa(m), kohde);
                        r = m.Bussi(kohde);
                        break;
                    case Kulkutapa.Lento:
                        if (!mannerlento) { r = m.Lenna(kohde); break; }
                        tulos.Mannerlento = true;
                        var ml = new Kaupat(m).MannerLento(kohde);
                        r = ml.Ok ? TekoTulos.Onnistui() : TekoTulos.Epaonnistui(ml.Virhe);
                        break;
                    case Kulkutapa.Maa:
                    case Kulkutapa.Meri:
                        if (m.Tila.Vaihe == Vaihe.Siirto)
                        {
                            // Tallennus jäi heiton ja siirron väliin: noppa on jo heitetty.
                            tulos.Noppa = m.Tila.Noppa;
                            // Pelaajan valitsema siirto (Liiku-vuo: noppa ensin, kohde sitten) tai lähin tavoitetta.
                            var jatko = siirto ?? ValitseSiirto(m.Verkko, m.Tila.Siirrot, kohde, m.Tila.Kulkutapa ?? tapa);
                            tulos.Polku = Polku(m, jatko);
                            r = m.Liiku(jatko);
                            break;
                        }
                        if (m.Tila.Vaihe == Vaihe.Toiminta)
                        {
                            r = m.ValitseKulkutapa(tapa);
                            if (!r.Ok) break;
                        }
                        r = m.Heita();
                        if (!r.Ok) break;
                        tulos.Noppa = r.Noppa;
                        if (m.Tila.Vaihe == Vaihe.Siirto)
                        {
                            var avain = ValitseSiirto(m.Verkko, m.Tila.Siirrot, kohde, m.Tila.Kulkutapa ?? tapa);
                            tulos.Polku = Polku(m, avain);
                            r = m.Liiku(avain);
                        }
                        break;
                    default: r = TekoTulos.Epaonnistui("Tuota tapaa ei voi valita kartalta"); break;
                }
                if (!r.Ok) return Epaonnistui(tulos, m, r.Virhe);
                tulos.Ok = true;
                tulos.Kohde = m.Tila.Pelaaja.Sijainti;
                tulos.Saapui = saapui;
                return tulos;
            }
            finally { m.Saapui -= kuuntelija; }
        }

        static string KaupunkiJossa(Matka m) => m.Tila.Pelaaja.Sijainti.Kaupungissa ? m.Tila.Pelaaja.Sijainti.Kaupunki : null;

        static List<Sijainti> Polku(Matka m, string avain) =>
            avain != null && m.Tila.Siirrot != null && m.Tila.Siirrot.TryGetValue(avain, out var s) ? new List<Sijainti>(s.Polku) : null;

        static MatkanTulos Epaonnistui(MatkanTulos t, Matka m, string virhe)
        {
            t.Ok = false;
            t.Virhe = virhe;
            t.Kohde = m.Tila.Pelaaja.Sijainti;
            return t;
        }

        // --- tallennus ------------------------------------------------------

        /// <summary>
        /// Kirjoittaa tekstin ensin viereiseen .tmp-tiedostoon ja siirtää sen
        /// paikalleen (File.Replace = rename, joten kaatuminen ei jätä puolikasta
        /// tallennusta). Varareittinä kopio, jos alusta ei tue korvaamista.
        /// </summary>
        public static void KirjoitaAtomisesti(string polku, string teksti)
        {
            var kansio = Path.GetDirectoryName(polku);
            if (!string.IsNullOrEmpty(kansio)) Directory.CreateDirectory(kansio);
            var tmp = polku + ".tmp";
            File.WriteAllText(tmp, teksti, new UTF8Encoding(false));
            if (!File.Exists(polku)) { File.Move(tmp, polku); return; }
            try { File.Replace(tmp, polku, null); }
            catch (Exception e) when (e is PlatformNotSupportedException || e is IOException || e is UnauthorizedAccessException)
            {
                File.Copy(tmp, polku, true);
                File.Delete(tmp);
            }
        }

        /// <summary>Laattamäärät muodossa {"counts":{…}} järjestys säilyttäen (Laattamaarat.Lue lukee sen).</summary>
        public static string LaattamaaratJson(Laattamaarat m) =>
            "{\"counts\":{" + string.Join(",", m.Maarat.Select(kv => Json(kv.Key) + ":" + kv.Value.ToString(CultureInfo.InvariantCulture))) + "}}";

        // --- testikomentojen tila -------------------------------------------

        /// <summary>JSON-merkkijono lainausmerkkeineen; null → null.</summary>
        public static string Json(string s)
        {
            if (s == null) return "null";
            var sb = new StringBuilder(s.Length + 2).Append('"');
            foreach (var c in s)
            {
                if (c == '"') sb.Append("\\\"");
                else if (c == '\\') sb.Append("\\\\");
                else if (c < 0x20) sb.Append("\\u").Append(((int)c).ToString("x4", CultureInfo.InvariantCulture));
                else sb.Append(c);
            }
            return sb.Append('"').ToString();
        }

        /// <summary>
        /// Pelin tila tiedostoon Documents/peli-tila.json (PeliKomennot 'tila').
        /// silmukka = PeliOhjaimen tila (Lataa, Kartta, Dialogi, Matkalla, Lehti, Virhe).
        /// </summary>
        public static string TilaJson(Matka m, string silmukka, string dialogi, IEnumerable<MatkaVaihtoehto> vaihtoehdot,
            string tavoite, bool lehtiAuki, string viesti, string virhe, MatkanTulos viimeisin)
        {
            var sb = new StringBuilder("{");
            void K(string n, string arvo, bool eka = false) { if (!eka) sb.Append(','); sb.Append(Json(n)).Append(':').Append(arvo); }
            string I(int x) => x.ToString(CultureInfo.InvariantCulture);
            K("silmukka", Json(silmukka), true);
            if (m != null)
            {
                var t = m.Tila;
                var p = t.Pelaaja;
                K("vaihe", Json(t.Vaihe.ToString()));
                K("sijainti", Json(p.Sijainti.Avain));
                K("kaupunki", Json(p.Sijainti.Kaupungissa ? p.Sijainti.Kaupunki : null));
                K("raha", I(p.Raha));
                K("paiva", I(t.Paiva()));
                K("tunnit", I(t.Tunnit()));
                K("aika", Json(AikaNimi(t.Vuorokaudenaika())));
                K("kulkutapa", Json(t.Kulkutapa?.ToString()));
                K("kaydyt", "[" + string.Join(",", p.Kaydyt.OrderBy(x => x, StringComparer.Ordinal).Select(Json)) + "]");
                K("tilarivi", Json(TilaTeksti(m.Verkko, t)));
            }
            K("dialogi", Json(dialogi));
            K("vaihtoehdot", "[" + string.Join(",", (vaihtoehdot ?? Enumerable.Empty<MatkaVaihtoehto>())
                .Select(v => "{\"tapa\":" + Json(v.Tapa.ToString()) + ",\"nimi\":" + Json(v.Nimi) + ",\"hinta\":" + I(v.Hinta)
                    + ",\"noppa\":" + (v.Noppa ? "true" : "false") + ",\"askelia\":" + (v.Askelia.HasValue ? I(v.Askelia.Value) : "null") + "}")) + "]");
            K("tavoite", Json(tavoite));
            K("lehtiAuki", lehtiAuki ? "true" : "false");
            K("viesti", Json(viesti));
            K("virhe", Json(virhe));
            if (viimeisin != null)
                K("viimeisin", "{\"ok\":" + (viimeisin.Ok ? "true" : "false") + ",\"tapa\":" + Json(viimeisin.Tapa.ToString())
                    + ",\"noppa\":" + (viimeisin.Noppa.HasValue ? I(viimeisin.Noppa.Value) : "null")
                    + ",\"lahto\":" + Json(viimeisin.Lahto.Avain) + ",\"kohde\":" + Json(viimeisin.Kohde.Avain)
                    + ",\"saapui\":" + Json(viimeisin.Saapui) + ",\"virhe\":" + Json(viimeisin.Virhe) + "}");
            return sb.Append('}').ToString();
        }
    }

    /// <summary>
    /// Äänitapahtumien tunnukset webin sfx.play-nimin (js/sound.js), jotta Natiivi-UI:n
    /// äänimoottori voi käyttää samaa aanitaulut-kokoelmaa. PeliOhjain.Aani kertoo tunnuksen.
    /// </summary>
    public static class Aanitunnukset
    {
        public const string Oikein = "correct", Vaarin = "wrong", Vihje = "hint", Puolitus = "swipe",
            KysymysAuki = "quizOpen", Tikitys = "tick", AikaLoppui = "timeout",
            Saapuminen = "arrive", Noppa = "dieLand", Kolikot = "coin";

        /// <summary>Web EVENT_SOUND[kind] ?? 'turn'; aarre kuuluu paljastukseen (null).</summary>
        public static string Tapahtuma(string laji)
        {
            switch (laji)
            {
                case "treasure": return null;
                case "fare": return "ferry";
                case "flight": return "flight";
                case "aid": return "coin";
                case "stuck": return "stuck";
                default: return "turn";
            }
        }

        /// <summary>Web treasureSound(type) ilman rosvoa (rosvolaatat poistettu pelistä).</summary>
        public static string Aarre(string tyyppi)
        {
            switch (tyyppi)
            {
                case "star": return "star";
                case "empty": return "empty";
                default: return "gem";
            }
        }
    }
}
