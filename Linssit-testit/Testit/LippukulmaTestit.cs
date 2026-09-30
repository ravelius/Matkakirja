// Lipputanko maan oikeaan yläkulmaan (Lippukulma, omistaja 29.9.2026 klo 23.2x): Italia, Norja ja Ranska paketin
// maarajoilla, kaikki maat mantereella sisämaassa, ja pieni kuvitteellinen maa.
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Maat;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class LippukulmaTestit
    {
        static MaatAineisto aineisto;
        static MaatAineisto A() => aineisto ??= MaatAineisto.Lue(
            MiniJson.Jasenna(File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "paketti", "maarajat.json"))), null, null, null);

        static (double Lat, double Lon) P(string iso) => Lippukulma.Laske(A().Hae(iso)) ?? throw new Exception("ei paikkaa " + iso);

        [Testi] static void ItaliaKoilliseen()
        {
            var p = P("ITA");
            // Friuli–Venezia Giulia (Puglia 40–41,5° N ei kelpaa).
            Oleta.Tosi(p.Lat > 45.3 && p.Lat < 47.1 && p.Lon > 12.3 && p.Lon < 14.0, $"{p.Lat} {p.Lon}");
        }

        [Testi] static void NorjaFinnmarkiin()
        {
            var p = P("NOR");
            Oleta.Tosi(p.Lat > 69.3 && p.Lon > 25.5, $"{p.Lat} {p.Lon}");
        }

        [Testi] static void RanskaKoilliseen()
        {
            var p = P("FRA");
            // Alsace–Lorraine–Ardennit (mantereen koilliskulma).
            Oleta.Tosi(p.Lat > 48.0 && p.Lat < 51.0 && p.Lon > 5.5 && p.Lon < 8.3, $"{p.Lat} {p.Lon}");
        }

        [Testi] static void KaikkiMaatMantereella()
        {
            int n = 0;
            foreach (var m in A().Maat.Values)
            {
                var p = Lippukulma.Laske(m);
                Oleta.Tosi(p.HasValue, m.Id);
                Oleta.Tosi(new MaaOsuma(new[] { m }).Hae(p.Value.Lat, p.Value.Lon) == m.Id, $"{m.Id} {p.Value.Lat} {p.Value.Lon}");
                n++;
            }
            Oleta.Tosi(n > 100, n.ToString());
        }

        [Testi] static void KaupunkiVaistetaan()
        {
            var m = new Maa { Id = "KOE" };
            m.Renkaat.Add(new[] { (0.0, 40.0), (10.0, 40.0), (10.0, 45.0), (0.0, 45.0), (0.0, 40.0) });
            var ilman = Lippukulma.Laske(m).Value;
            Oleta.Tosi(ilman.Lat > 44.5 && ilman.Lon > 9.6, $"{ilman}");
            var kanssa = Lippukulma.Laske(m, new[] { (ilman.Lat, ilman.Lon) }).Value;
            Oleta.Tosi(Math.Abs(kanssa.Lat - ilman.Lat) + Math.Abs(kanssa.Lon - ilman.Lon) > 0.2, $"{kanssa}");
        }

        [Testi] static void KelpaaRajaa()
        {
            var m = new Maa { Id = "KOE" };
            m.Renkaat.Add(new[] { (0.0, 40.0), (10.0, 40.0), (10.0, 45.0), (0.0, 45.0), (0.0, 40.0) });
            // Yläpaneeli peittää leveydet > 43,5°: paikka koilliskulmaa lähimpänä sen alapuolella.
            var p = Lippukulma.Laske(m, null, (lat, lon) => lat <= 43.5).Value;
            Oleta.Tosi(p.Lat <= 43.5 && p.Lat > 43.0 && p.Lon > 9.5, $"{p}");
            Oleta.Tosi(Lippukulma.Laske(m, null, (lat, lon) => false) == null);
        }

        [Testi] static void SisamaaHarvennettuna()
        {
            var ita = Lippukulma.Sisamaa(A().Hae("ITA"), 4);
            Oleta.Tosi(ita.Count > 200 && ita.Count < 20000, ita.Count.ToString());
            var osuma = new MaaOsuma(new[] { A().Hae("ITA") });
            foreach (var p in ita) Oleta.Tosi(osuma.Hae(p.Lat, p.Lon) == "ITA", $"{p}");
        }

        [Testi] static void TyhjaMaa() => Oleta.Tosi(Lippukulma.Laske(new Maa { Id = "X" }) == null);
    }
}
