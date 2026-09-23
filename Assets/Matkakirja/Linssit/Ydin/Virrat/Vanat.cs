// VANAT: leviäminen PÄÄREITTINÄ, ei mantereen täyttönä (Raamattu "VIRRAT
// VANOINA", omistaja 6.9.2026; web js/aikajana-virrat-laskenta.js osio
// "vanat", docs/moduulit/ihmisen-matka-vanat.md luku 2.1).
//
// Vanaa ei piirretä käsin: se JOHDETAAN samasta saapumisaikakentästä, joka
// värjää ruudut. Dijkstran edeltäjäketju päätepisteestä lähteeseen on se
// polku, jota pitkin väri mallissa sinne kulki — ylitykset, portit ja
// nauhat mukaan lukien — ja jokainen kärki kantaa oman saapumisaikansa.
// Käsin annetaan vain päätepisteet (VanatAineisto) ja Afrikan kotipesät.
//
// Polku yksinkertaistetaan Douglas–Peuckerilla, tihennetään ajan mukaan
// (portin tasanne ei saa liukua), tasoitetaan Chaikinilla ja ajat
// pakotetaan monotonisiksi. Kärjet pyöristetään kuten webissä
// (+x.toFixed(3), Math.round), jotta tulos on sama luku luvulta.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Virrat
{
    /// <summary>Vanan kärki: paikka asteina ja saapumisaika (vuosia sitten).</summary>
    public readonly struct VananKarki
    {
        public readonly double Lat, Lon, Aika;
        public VananKarki(double lat, double lon, double aika) { Lat = lat; Lon = lon; Aika = aika; }
        public override string ToString() => $"[{Lat}, {Lon}, {Aika}]";
    }

    public sealed class Vana
    {
        public string Tunnus;
        /// <summary>Päätevirta (vanan tunnusväri).</summary>
        public string Virta;
        public double Paksuus;
        public List<VananKarki> Pisteet;
        /// <summary>Kärjen oma virta: selkäranka kulkee kolmen virran läpi.</summary>
        public List<string> Virrat;
    }

    /// <summary>Afrikan kotipesä: pehmeäreunainen laikku, joka syttyy pysäkin hetkellä.</summary>
    public sealed class Kotipesa
    {
        public string Tunnus;
        public double Lat, Lon, Aika, Sade;
    }

    public sealed class VanatTulos
    {
        public List<Vana> Vanat = new List<Vana>();
        public List<Kotipesa> Kotipesat = new List<Kotipesa>();
    }

    public static class Vanat
    {
        /// <summary>Vartija: edeltäjäketju ei voi olla ruudukkoa pidempi.</summary>
        const int VananVartija = 30000;

        /// <summary>Raakapolun piste (webin { lat, lon, aika, virta } -olio).</summary>
        sealed class PolunPiste
        {
            public double Lat, Lon, Aika;
            public string Virta;
            public PolunPiste Kopio() => new PolunPiste { Lat = Lat, Lon = Lon, Aika = Aika, Virta = Virta };
        }

        /// <summary>Kahden pisteen etäisyys kilometreinä (tasoapproksimaatio riittää ruudukolla).</summary>
        public static double VanaKm(double lat1, double lon1, double lat2, double lon2)
        {
            var f1 = lat1 * Ruudukko.Rad;
            var f2 = lat2 * Ruudukko.Rad;
            var dl = lon2 - lon1;
            while (dl > 180) dl -= 360;
            while (dl < -180) dl += 360;
            return 6371 * JsLuvut.Hypot(dl * Ruudukko.Rad * JsLuvut.Cos((f1 + f2) / 2), f2 - f1);
        }

        /// <summary>Vanan pituus kilometreinä.</summary>
        public static double VananPituusKm(IReadOnlyList<VananKarki> pisteet)
        {
            double s = 0;
            for (var k = 1; k < pisteet.Count; k += 1) s += VanaKm(pisteet[k - 1].Lat, pisteet[k - 1].Lon, pisteet[k].Lat, pisteet[k].Lon);
            return s;
        }

        /// <summary>Onko piste enintään `raja` km:n päässä jonkin vanan kärjestä (halpa tasoetäisyys).</summary>
        static bool LahellaVanoja(PolunPiste piste, List<Vana> vanat, double raja)
        {
            var cosLat = JsLuvut.Cos(piste.Lat * Ruudukko.Rad);
            var latRaja = raja / Ruudukko.KmAsteella;
            foreach (var v in vanat)
            {
                foreach (var p in v.Pisteet)
                {
                    var dLat = p.Lat - piste.Lat;
                    if (dLat > latRaja || dLat < -latRaja) continue;
                    var dLon = p.Lon - piste.Lon;
                    while (dLon > 180) dLon -= 360;
                    while (dLon < -180) dLon += 360;
                    var dx = dLon * cosLat;
                    if (JsLuvut.Hypot(dx, dLat) * Ruudukko.KmAsteella <= raja) return true;
                }
            }
            return false;
        }

        /// <summary>
        /// Edeltäjäpolku päätepisteestä lähteeseen, käännettynä lähteestä
        /// päätepisteeseen. Ylitys on ketjussa tavallinen särmä; nauhan
        /// ruudussa hypätään nauhan pisteitä taaksepäin; siirtymä jatkuu
        /// toisen virran lukupisteestä; virran omassa lähteessä hypätään
        /// rungon lähimpään vanhempaan ruutuun.
        /// </summary>
        static List<PolunPiste> Edeltajapolku(Dictionary<string, VirranKentta> kentat, List<Siirtyma> siirtymat, VirranKentta runko,
            string tunnus, double lat, double lon, byte[] maa, int leveys, int korkeus)
        {
            var polku = new List<PolunPiste>();
            kentat.TryGetValue(tunnus ?? "", out var k);
            var i = Ruudukko.LahinMaa(maa, lat, lon, 4, leveys, korkeus);
            var vartija = 0;
            while (k != null && i >= 0 && vartija < VananVartija)
            {
                vartija += 1;
                var p = Ruudukko.RuudunKeskus(i, leveys);
                polku.Add(new PolunPiste { Lat = p.Lat, Lon = p.Lon, Aika = k.Aika[i], Virta = k.Tunnus });
                if (k.NauhaPiste[i] >= 0)
                {
                    var nro = k.NauhaNro[i];
                    var nauha = nro >= 0 && nro < k.Nauhat.Length ? k.Nauhat[nro] : null;
                    if (nauha == null) break;
                    for (int q = k.NauhaPiste[i]; q >= 0; q -= 1)
                    {
                        var np = nauha.Pisteet[q];
                        polku.Add(new PolunPiste { Lat = np[0], Lon = np[1], Aika = np[2], Virta = k.Tunnus });
                    }
                    var alku = Ruudukko.LahinMaa(maa, nauha.Pisteet[0][0], nauha.Pisteet[0][1], 4, leveys, korkeus);
                    // Nauhan alun ruudusta jatketaan, jos se on saatu muualta kuin nauhasta.
                    if (alku >= 0 && k.NauhaPiste[alku] < 0 && k.Edeltaja[alku] >= 0) { i = k.Edeltaja[alku]; continue; }
                    // Muuten lähin ei-nauharuutu, joka on nauhan alkua vanhempi.
                    i = alku >= 0 ? VanhinLahella(k, alku, nauha.Pisteet[0][2], leveys, korkeus, 8, true) : -1;
                    continue;
                }
                Siirtyma s = null;
                foreach (var x in siirtymat) if (x.Tunnus == k.Tunnus && x.Kohde == i) { s = x; break; }
                if (s != null)
                {
                    kentat.TryGetValue(s.Virta ?? "", out var toinen);
                    if (toinen == null || s.Lue < 0) break;
                    k = toinen;
                    i = s.Lue;
                    continue;
                }
                if (k.Edeltaja[i] < 0)
                {
                    // Virran oma lähde: jatka rungossa, jos se on ehtinyt tänne aiemmin.
                    if (runko != null && k.Tunnus != runko.Tunnus)
                    {
                        var j = VanhinLahella(runko, i, k.Aika[i], leveys, korkeus, 8, false);
                        if (j >= 0) { k = runko; i = j; continue; }
                    }
                    break;
                }
                i = k.Edeltaja[i];
            }
            polku.Reverse();
            return polku;
        }

        /// <summary>Lähin ruutu (säde 8), jonka aika kentässä on ≥ `vahintaan`; vanhin voittaa.</summary>
        static int VanhinLahella(VirranKentta kentta, int keski, double vahintaan, int leveys, int korkeus, int sade, bool nauhatPois)
        {
            var r0 = keski / leveys;
            var c0 = keski - r0 * leveys;
            var paras = -1;
            double parasAika = 0;
            for (var dr = -sade; dr <= sade; dr += 1)
            {
                var r = r0 + dr;
                if (r < 0 || r >= korkeus) continue;
                for (var dc = -sade; dc <= sade; dc += 1)
                {
                    var j = r * leveys + ((c0 + dc + leveys) % leveys);
                    if (nauhatPois && kentta.NauhaPiste[j] >= 0) continue;
                    double a = kentta.Aika[j];
                    if (a > parasAika && a >= vahintaan) { paras = j; parasAika = a; }
                }
            }
            return paras;
        }

        /// <summary>Douglas–Peucker: säilytettävien pisteiden indeksit (etäisyys km).</summary>
        static List<int> DpIndeksit(List<PolunPiste> pisteet, double tolKm, int alku, int loppu)
        {
            if (loppu <= alku + 1) return loppu > alku ? new List<int> { alku, loppu } : new List<int> { alku };
            var a = pisteet[alku];
            var b = pisteet[loppu];
            var paras = alku;
            double parasD = -1;
            var dlon = b.Lon - a.Lon;
            while (dlon > 180) dlon -= 360;
            while (dlon < -180) dlon += 360;
            for (var k = alku + 1; k < loppu; k += 1)
            {
                var p = pisteet[k];
                var cl = JsLuvut.Cos(p.Lat * Ruudukko.Rad);
                var plon = p.Lon - a.Lon;
                while (plon > 180) plon -= 360;
                while (plon < -180) plon += 360;
                var vx = dlon * cl;
                var vy = b.Lat - a.Lat;
                var px = plon * cl;
                var py = p.Lat - a.Lat;
                var l2 = vx * vx + vy * vy;
                var u = l2 > 0 ? Math.Max(0, Math.Min(1, (px * vx + py * vy) / l2)) : 0;
                var d = JsLuvut.Hypot(px - u * vx, py - u * vy) * Ruudukko.KmAsteella;
                if (d > parasD) { parasD = d; paras = k; }
            }
            if (parasD <= tolKm) return new List<int> { alku, loppu };
            var vasen = DpIndeksit(pisteet, tolKm, alku, paras);
            vasen.RemoveAt(vasen.Count - 1);
            vasen.AddRange(DpIndeksit(pisteet, tolKm, paras, loppu));
            return vasen;
        }

        /// <summary>
        /// Aikatihennys: raakapisteitä palautetaan säilytettyjen kärkien väliin,
        /// kun aikaväli ylittää `rajaV` vuotta tai `osuus`-osan vanhemmasta ajasta.
        /// </summary>
        static List<int> TihennaAjoilla(List<PolunPiste> raaka, List<int> indeksit, double rajaV, double osuus)
        {
            var ulos = new List<int> { indeksit[0] };
            for (var n = 1; n < indeksit.Count; n += 1)
            {
                var ia = ulos[ulos.Count - 1];
                var ib = indeksit[n];
                var ed = raaka[ia];
                for (var j = ia + 1; j < ib; j += 1)
                {
                    var p = raaka[j];
                    var raja = Math.Max(rajaV, osuus * ed.Aika);
                    if (ed.Aika - p.Aika > raja || (j + 1 < raaka.Count && p.Aika - raaka[j + 1].Aika > raja))
                    {
                        ulos.Add(j);
                        ed = p;
                    }
                }
                ulos.Add(ib);
            }
            return ulos;
        }

        /// <summary>Chaikin-tasoitus (päät kiinni); ajat liukuvat lineaarisesti.</summary>
        static List<PolunPiste> ChaikinTasoitus(List<PolunPiste> pisteet, int kierroksia)
        {
            var p = pisteet;
            for (var n = 0; n < kierroksia; n += 1)
            {
                if (p.Count < 3) break;
                var u = new List<PolunPiste>(p.Count * 2) { p[0] };
                for (var k = 0; k + 1 < p.Count; k += 1)
                {
                    var a = p[k];
                    var b = p[k + 1];
                    var dlon = b.Lon - a.Lon;
                    while (dlon > 180) dlon -= 360;
                    while (dlon < -180) dlon += 360;
                    u.Add(new PolunPiste
                    {
                        Lat = a.Lat + 0.25 * (b.Lat - a.Lat),
                        Lon = Ruudukko.KierraLon(a.Lon + 0.25 * dlon),
                        Aika = a.Aika + 0.25 * (b.Aika - a.Aika),
                        Virta = a.Virta,
                    });
                    u.Add(new PolunPiste
                    {
                        Lat = a.Lat + 0.75 * (b.Lat - a.Lat),
                        Lon = Ruudukko.KierraLon(a.Lon + 0.75 * dlon),
                        Aika = a.Aika + 0.75 * (b.Aika - a.Aika),
                        Virta = b.Virta,
                    });
                }
                u.Add(p[p.Count - 1]);
                p = u;
            }
            return p;
        }

        /// <summary>Ajat monotonisesti laskeviksi (kello kulkee yhteen suuntaan).</summary>
        static void MonotonisetAjat(List<PolunPiste> pisteet)
        {
            for (var k = 1; k < pisteet.Count; k += 1)
            {
                if (pisteet[k].Aika > pisteet[k - 1].Aika) pisteet[k].Aika = pisteet[k - 1].Aika;
            }
        }

        /// <summary>
        /// Vanat kentästä: selkäranka ensin, sitten haarat aineiston
        /// järjestyksessä (katkaistuna siitä, missä ne viimeksi kulkevat
        /// paksumman vanan vieressä) ja nauhavirran nauhat sellaisinaan;
        /// lisäksi Afrikan kotipesät pysäkkien ajoilla.
        /// </summary>
        public static VanatTulos JohdaVanat(Kentat kentat, VanatAineisto aineisto, byte[] maa,
            int leveys = Ruudukko.Leveys, int korkeus = Ruudukko.Korkeus, IReadOnlyList<Pysakki> pysakit = null)
        {
            var tulos = new VanatTulos();
            var edeltajat = kentat?.Edeltajat;
            if (edeltajat == null || edeltajat.Count == 0 || aineisto == null || maa == null) return tulos;
            var siirtymat = kentat.Siirtymat ?? new List<Siirtyma>();
            var kentanVirrat = new Dictionary<string, VirranKentta>();
            foreach (var e in edeltajat) kentanVirrat[e.Tunnus ?? ""] = e;
            var runko = edeltajat[0];
            var y = aineisto.Yksinkertaistus ?? new Yksinkertaistus();
            var vanat = tulos.Vanat;

            void Johda(string tunnus, VananPaate paate, bool katkaise)
            {
                var raaka = Edeltajapolku(kentanVirrat, siirtymat, runko, paate.Virta, paate.Paate.Lat, paate.Paate.Lon, maa, leveys, korkeus);
                if (raaka.Count < 2) return;
                // HAARAN KATKAISU: haara alkaa kärjestä, jossa se VIIMEKSI on
                // haaranEroKm:n päässä jostakin jo johdetusta paksummasta vanasta.
                var alku = 0;
                if (katkaise)
                {
                    var paksummat = vanat.FindAll((v) => v.Paksuus > paate.Paksuus);
                    if (paksummat.Count > 0)
                    {
                        var viimeLahella = -1;
                        for (var k = 0; k < raaka.Count; k += 1)
                        {
                            if (LahellaVanoja(raaka[k], paksummat, y.HaaranEroKm)) viimeLahella = k;
                        }
                        if (viimeLahella >= raaka.Count - 2) return; // haara kulkee kokonaan rungon päällä
                        alku = Math.Max(0, viimeLahella);
                    }
                }
                var osa = raaka.GetRange(alku, raaka.Count - alku);
                if (osa.Count < 2) return;
                var indeksit = TihennaAjoilla(osa, DpIndeksit(osa, y.DpKm, 0, osa.Count - 1), y.AikaV, y.AikaOsuus);
                var kopiot = new List<PolunPiste>(indeksit.Count);
                foreach (var k in indeksit) kopiot.Add(osa[k].Kopio());
                var karjet = ChaikinTasoitus(kopiot, y.Chaikin);
                MonotonisetAjat(karjet);
                // Kärki kantaa oman virtansa sävyn (Arabia oranssi, ei turkoosi).
                var pisteet = new List<VananKarki>(karjet.Count);
                var virrat = new List<string>(karjet.Count);
                foreach (var p in karjet)
                {
                    pisteet.Add(new VananKarki(JsLuvut.ToFixed(p.Lat, 3), JsLuvut.ToFixed(Ruudukko.KierraLon(p.Lon), 3), JsLuvut.Round(p.Aika)));
                    virrat.Add(p.Virta ?? paate.Virta);
                }
                vanat.Add(new Vana { Tunnus = tunnus, Virta = paate.Virta, Paksuus = paate.Paksuus, Pisteet = pisteet, Virrat = virrat });
            }

            if (aineisto.Selkaranka != null) Johda(aineisto.Selkaranka.Tunnus ?? "selkaranka", aineisto.Selkaranka, false);
            foreach (var haara in aineisto.Haarat ?? new VananPaate[0]) Johda(haara.Tunnus, haara, true);

            // Tyynenmeren nauhat ovat jo polylinjoja aikoineen: merivirta nauhana.
            if (aineisto.Nauhat != null)
            {
                var nauhaVirta = edeltajat.Find((k) => k.Tunnus == aineisto.Nauhat);
                var nauhat = nauhaVirta?.Nauhat ?? new Nauha[0];
                for (var k = 0; k < nauhat.Length; k += 1)
                {
                    var pisteet = new List<VananKarki>();
                    var virrat = new List<string>();
                    foreach (var p in nauhat[k].Pisteet)
                    {
                        pisteet.Add(new VananKarki(p[0], p[1], p[2]));
                        virrat.Add(aineisto.Nauhat);
                    }
                    vanat.Add(new Vana
                    {
                        Tunnus = aineisto.Nauhat + "-" + (k + 1),
                        Virta = aineisto.Nauhat,
                        Paksuus = aineisto.NauhanPaksuus,
                        Pisteet = pisteet,
                        Virrat = virrat,
                    });
                }
            }

            // KOTIPESÄT: Afrikan kolme riippumatonta lähdettä laikkuina, ei linjana.
            foreach (var pesa in aineisto.Kotipesat ?? new KotipesaAsetus[0])
            {
                Pysakki t = null;
                if (pysakit != null) foreach (var s in pysakit) if (s.Tunnus == pesa.Tunnus) { t = s; break; }
                if (t == null) continue;
                tulos.Kotipesat.Add(new Kotipesa { Tunnus = pesa.Tunnus, Lat = t.Lat, Lon = t.Lon, Aika = t.VuosiaSitten, Sade = pesa.Sade });
            }
            return tulos;
        }
    }
}
