// Kultaiset testit: kohina, laatikot, portin luisu ja laatikkomaskit
// (web js/aikajana-virrat-laskenta.js; kultaiset/tee-kultaiset.mjs).
using System.Collections.Generic;
using Matkakirja.Linssit.Virrat;
using static Matkakirja.Linssit.Testit.VirratApu;
using LL = Matkakirja.Linssit.Virrat.Laatikot;

namespace Matkakirja.Linssit.Testit
{
    public static class VirratLaatikkoTestit
    {
        static List<Laatikko> KoeLaatikot()
        {
            var ulos = new List<Laatikko>();
            foreach (var a in L(O(Kultaiset, "perus"), "laatikot")) ulos.Add(AineistonLukija.LueLaatikko(a));
            return ulos;
        }

        [Testi] static void KohinaBittitarkka()
        {
            foreach (var a in L(O(Kultaiset, "perus"), "kohina"))
            {
                var r = L(a);
                var saatu = LL.Kohina(D(r[0]), D(r[1]), I(r[2]), D(r[3]));
                Oleta.Sama(D(r[4]), saatu, $"kohina({D(r[0]):R}, {D(r[1]):R}, {I(r[2])}, {D(r[3])})");
            }
        }

        [Testi] static void LaatikossaJaSyvyys()
        {
            var laatikot = KoeLaatikot();
            var p = O(Kultaiset, "perus");
            foreach (var a in L(p, "laatikossa"))
            {
                var r = L(a);
                var l = laatikot[I(r[2])];
                Oleta.Sama((bool)r[5], LL.Laatikossa(D(r[0]), D(r[1]), l, D(r[3]), I(r[4])),
                    $"laatikossa({D(r[0]):R}, {D(r[1]):R}, #{I(r[2])}, {D(r[3])}, {I(r[4])})");
            }
            // Satunnaisilla leveysasteilla cos φ voi erota V8:sta ulpin (glibc vs
            // fdlibm); ruudukon leveysasteilla ero on nolla (maskien tiivisteet).
            var ulpEroja = 0;
            var syvyydet = L(p, "syvyys");
            foreach (var a in syvyydet)
            {
                var r = L(a);
                var l = laatikot[I(r[2])];
                var saatu = LL.LaatikonSyvyys(D(r[0]), D(r[1]), l, D(r[3]), I(r[4]));
                if (saatu == D(r[5])) continue;
                ulpEroja += 1;
                Oleta.Tosi(System.Math.Abs(saatu - D(r[5])) <= 1e-12,
                    $"syvyys({D(r[0]):R}, {D(r[1]):R}, #{I(r[2])}, {D(r[3])}, {I(r[4])}): odotettu {D(r[5]):R}, saatu {saatu:R}");
            }
            System.Console.WriteLine($"      laatikon syvyys satunnaispisteissä: {ulpEroja}/{syvyydet.Count} eroaa ulpin");
            var pois = Aineisto.Virrat[0].Pois;
            foreach (var a in L(p, "laatikoidenSyvyys"))
            {
                var r = L(a);
                var saatu = LL.LaatikoidenSyvyys(D(r[0]), D(r[1]), pois, 1.5, 3);
                Oleta.Tosi(System.Math.Abs(saatu - D(r[2])) <= 1e-12, $"laatikoidenSyvyys: odotettu {D(r[2]):R}, saatu {saatu:R}");
            }
            Oleta.Sama(double.NegativeInfinity, LL.LaatikoidenSyvyys(0, 0, new Laatikko[0]));
        }

        [Testi] static void PortinLuisu()
        {
            foreach (var a in L(O(Kultaiset, "perus"), "portinLuisu"))
            {
                var r = L(a);
                var nv = I(r[0]);
                var portti = nv >= 0
                    ? Aineisto.Virrat[nv].Portit[I(r[1])]
                    : new Portti { Avautuu = 1000, LuisuPois = true };
                var l = LL.Luisu(portti);
                if (r[2] == null) { Oleta.Sama(false, l.HasValue, "luisu: null → ei kaistaa"); continue; }
                Oleta.Sama(D(r[2]), l.Value.Leveys);
                Oleta.Sama(D(r[3]), l.Value.Vuodet);
            }
        }

        [Testi] static void LaatikkoMaskitSamat()
        {
            foreach (var a in L(O(Kultaiset, "perus"), "laatikkoMaski"))
            {
                var o = O(a);
                var virta = Aineisto.Virrat[I(o["virta"])];
                var lista = S(o, "lista") == "alue" ? virta.Alue : virta.Pois;
                var m = LL.LaatikkoMaski(lista, D(o["reuna"]), I(o["siemen"]), maa: (bool)o["maa"] ? Maa : null);
                Oleta.Sama(S(o, "tiiviste"), Fnv(m), $"{virta.Tunnus}.{S(o, "lista")} reuna {D(o["reuna"])}");
            }
        }

        [Testi] static void PehmeaLaatikkoSama()
        {
            var p = O(Kultaiset, "perus");
            var kohdat = Otos;
            var m = LL.LaatikkoPehmea(Aineisto.Vanha.Alue, 3, 42, 2, maa: Maa);
            var k = O(p, "laatikkoPehmea");
            OtosSama(L(k, "otos"), kohdat, (i) => m[i], "vanha pehmeä");
            Oleta.Sama(S(k, "tiiviste"), Fnv(m), "vanha pehmeä tiiviste");
            var m2 = LL.LaatikkoPehmea(Aineisto.Virrat[0].Pois, 1.5, 5, 1);
            var k2 = O(p, "laatikkoPehmeaIlmanMaata");
            OtosSama(L(k2, "otos"), kohdat, (i) => m2[i], "pehmeä ilman maata");
            Oleta.Sama(S(k2, "tiiviste"), Fnv(m2));
        }
    }
}
