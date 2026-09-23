// Kultaiset testit: ruudun tila, virran väri, kameran painopisteet ja
// kenttien tarkennus piirtoresoluutioon (web js/aikajana-virrat-laskenta.js).
using System.Collections.Generic;
using Matkakirja.Linssit.Virrat;
using static Matkakirja.Linssit.Testit.VirratApu;

namespace Matkakirja.Linssit.Testit
{
    public static class VirratTilaTestit
    {
        [Testi] static void RuudunTilaJaRintama()
        {
            foreach (var a in L(Kultaiset, "tila"))
            {
                var r = L(a);
                var t = VirranTilat.Tila(D(r[0]), D(r[1]), (bool)r[2]);
                var nimi = $"tila({D(r[0])}, {D(r[1])}, {r[2]})";
                Oleta.Sama(D(r[3]), t.W, nimi + ".w");
                Oleta.Sama(D(r[4]), t.Peitto, nimi + ".peitto");
            }
            foreach (var a in L(Kultaiset, "rintama"))
            {
                var r = L(a);
                Oleta.Sama(D(r[1]), VirranTilat.RintamanLeveys(D(r[0])));
            }
        }

        static void SamaRgb(object odotettu, Rgb saatu, string nimi)
        {
            var o = L(odotettu);
            Oleta.Sama(D(o[0]), saatu.R, nimi + ".r");
            Oleta.Sama(D(o[1]), saatu.G, nimi + ".g");
            Oleta.Sama(D(o[2]), saatu.B, nimi + ".b");
        }

        [Testi] static void HeksaJaVirranVari()
        {
            foreach (var a in L(Kultaiset, "heksa"))
            {
                var r = L(a);
                SamaRgb(r[1], VirranTilat.HeksaRgb((string)r[0]), (string)r[0]);
            }
            var virrat = new List<Virta>(Aineisto.Virrat) { Aineisto.Retki };
            foreach (var a in L(Kultaiset, "varit"))
            {
                var r = L(a);
                var v = virrat[I(r[0])];
                var savy = VirranTilat.Vari(v.Vari, D(r[1]));
                SamaRgb(r[2], savy.Vanha, $"{v.Tunnus}@{D(r[1])}.vanha");
                SamaRgb(r[3], savy.Rintama, $"{v.Tunnus}@{D(r[1])}.rintama");
            }
        }

        [Testi] static void RintamienPainopisteet()
        {
            foreach (var a in L(Kultaiset, "painopisteet"))
            {
                var o = O(a);
                var nyt = D(o["nyt"]);
                HashSet<int> ohita = null;
                if (o["ohita"] is List<object> lista)
                {
                    ohita = new HashSet<int>();
                    foreach (var x in lista) ohita.Add(I(x));
                }
                var saatu = VirranTilat.RintamienPainopisteet(Laskettu.Aika, Laskettu.Virta, nyt, ohita: ohita);
                var odotettu = L(o, "tulos");
                Oleta.Sama(odotettu.Count, saatu.Count, $"painopisteitä @{nyt}");
                for (var k = 0; k < odotettu.Count; k += 1)
                {
                    var p = O(odotettu[k]);
                    var s = saatu[k];
                    var nimi = $"@{nyt} #{k}";
                    Oleta.Sama(I(p["virta"]), s.Virta, nimi + " virta (järjestys)");
                    // Painosumma kertyy ruuduittain cos φ:llä: fdlibm vs glibc voi erota ulpin.
                    Lahella(D(p["paino"]), s.Paino, nimi + " paino");
                    Lahella(D(p["lat"]), s.Lat, nimi + " lat");
                    Lahella(D(p["lon"]), s.Lon, nimi + " lon");
                    Lahella(D(p["hajonta"]), s.Hajonta, nimi + " hajonta", 1e-7);
                }
            }
            foreach (var a in L(Kultaiset, "kamera"))
            {
                var r = L(a);
                Oleta.Sama(D(r[1]), VirranTilat.KameranLeveysAsteina(D(r[0])));
            }
        }

        [Testi] static void TarkennusPiirtoresoluutioon()
        {
            var t = O(Kultaiset, "tarkennus");
            var peitto = Ruudukko.PuraPeitto(Aineisto.Maamaski.Peitot);
            var tarkka = Tarkennus.TarkennaKentat(Laskettu, Maa, peitto);
            Oleta.Sama(I(t["leveys"]), tarkka.Leveys);
            Oleta.Sama(I(t["korkeus"]), tarkka.Korkeus);
            Oleta.Sama(I(t["koko"]), tarkka.Koko);
            Oleta.Sama(I(t["n"]), tarkka.Indeksi.Length, "aktiivisia pikseleitä");
            var taulut = new Dictionary<string, System.Array>
            {
                ["indeksi"] = tarkka.Indeksi, ["aika"] = tarkka.Aika, ["paino"] = tarkka.Paino,
                ["virta"] = tarkka.Virta, ["virta2"] = tarkka.Virta2, ["sekoitus"] = tarkka.Sekoitus,
                ["meri"] = tarkka.Meri, ["meriPaino"] = tarkka.MeriPaino, ["meriVirta"] = tarkka.MeriVirta,
                ["retki"] = tarkka.Retki, ["retkiPaino"] = tarkka.RetkiPaino, ["vanha"] = tarkka.Vanha,
            };
            var kohdat = new List<int>();
            foreach (var a in L(t, "otosKohdat")) kohdat.Add(I(a));
            var otos = O(t, "otos");
            var tiiviste = O(t, "tiiviste");
            foreach (var kv in taulut)
            {
                var taulu = kv.Value;
                OtosSama(L(otos, kv.Key), kohdat, (i) => System.Convert.ToDouble(taulu.GetValue(i)), "tarkka." + kv.Key);
                Oleta.Sama(S(tiiviste, kv.Key), Fnv(taulu), "tarkka." + kv.Key + " tiiviste");
            }
            // Kerroin 1 ilman peittoa, retkeä ja vanhaa.
            var k1 = O(t, "kerroin1");
            var ilman = new Kentat { Aika = Laskettu.Aika, Virta = Laskettu.Virta, Meri = Laskettu.Meri, MeriVirta = Laskettu.MeriVirta };
            var t1 = Tarkennus.TarkennaKentat(ilman, Maa, null, kerroin: 1);
            Oleta.Sama(I(k1["n"]), t1.Indeksi.Length, "kerroin 1: pikseleitä");
            Oleta.Sama(null, t1.Retki);
            var tt = O(k1, "tiiviste");
            Oleta.Sama(S(tt, "indeksi"), Fnv(t1.Indeksi));
            Oleta.Sama(S(tt, "aika"), Fnv(t1.Aika));
            Oleta.Sama(S(tt, "paino"), Fnv(t1.Paino));
            Oleta.Sama(S(tt, "virta"), Fnv(t1.Virta));
            Oleta.Sama(S(tt, "virta2"), Fnv(t1.Virta2));
            Oleta.Sama(S(tt, "sekoitus"), Fnv(t1.Sekoitus));
            Oleta.Sama(S(tt, "meri"), Fnv(t1.Meri));
            Oleta.Sama(S(tt, "meriPaino"), Fnv(t1.MeriPaino));
            Oleta.Sama(S(tt, "meriVirta"), Fnv(t1.MeriVirta));
        }
    }
}
