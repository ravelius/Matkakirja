// Reittiverkon kultaiset testit: siirrot, polut ja saavutettavat kaupungit
// täsmälleen kuten verkkopelin js/rules.js (Kultaiset/siirrot.json).
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Matkakirja.Peli.Testit
{
    public static class ReittiverkkoTestit
    {
        static List<(string avain, int pituus, string polku)> Lajiteltu(IReadOnlyDictionary<string, Siirto> siirrot) =>
            siirrot.OrderBy(kv => kv.Key, StringComparer.Ordinal)
                .Select(kv => (kv.Key, kv.Value.Polku.Count, string.Join(",", kv.Value.Polku.Select(p => p.Avain))))
                .ToList();

        [Testi] static void PaketinYhteenvetoTasmaaLautaan()
        {
            var v = KultaisetApu.Verkko;
            var y = MiniJson.Objekti(KultaisetApu.Kultaiset["yhteenveto"]);
            Oleta.Sama((int)(double)y["kaupunkeja"], v.Kaupungit.Count, "kaupunkeja");
            Oleta.Sama((int)(double)y["maareitteja"], v.Reitit.Values.Count(r => r.Laji == ReitinLaji.Maa), "maareitteja");
            Oleta.Sama((int)(double)y["merireitteja"], v.Reitit.Values.Count(r => r.Laji == ReitinLaji.Meri), "merireitteja");
            Oleta.Sama((int)(double)y["lentoja"], v.Lennot.Count, "lentoja");
            Oleta.Sama((int)(double)y["askeleitaYhteensa"], v.Reitit.Values.Sum(r => r.Askeleet), "askeleet");
            Oleta.Sama((int)(double)y["maksutYhteensa"], v.Reitit.Values.Sum(r => r.Maksu), "maksut");
            Oleta.Sama(0, MiniJson.Taulukko(KultaisetApu.Kultaiset["erot"]).Count, "paketin ja laudan erot (tee-kultaiset.mjs)");
        }

        [Testi] static void KultaisetSiirrotJaPolut()
        {
            var v = KultaisetApu.Verkko;
            int n = 0;
            foreach (var t in KultaisetApu.Lista(KultaisetApu.Kultaiset, "tapaukset"))
            {
                var lahto = (string)t["lahto"];
                var silmaluku = (int)(double)t["silmaluku"];
                var tapa = (string)t["tapa"];
                var tunnus = $"{lahto} {silmaluku} {tapa}";
                var saatu = Lajiteltu(v.Siirrot(KultaisetApu.Sijainniksi(lahto), silmaluku, KultaisetApu.Tavaksi(tapa)));
                var odotettu = KultaisetApu.Lista(t, "siirrot").Select(s => (
                    (string)s["avain"], (int)(double)s["pituus"],
                    string.Join(",", MiniJson.Taulukko(s["polku"]).Cast<string>()))).ToList();
                Oleta.Sama(odotettu.Count, saatu.Count, "siirtojen määrä " + tunnus);
                for (int i = 0; i < odotettu.Count; i++)
                {
                    Oleta.Sama(odotettu[i].Item1, saatu[i].avain, tunnus);
                    Oleta.Sama(odotettu[i].Item2, saatu[i].pituus, tunnus + " " + odotettu[i].Item1);
                    Oleta.Sama(odotettu[i].Item3, saatu[i].polku, tunnus + " " + odotettu[i].Item1);
                }
                n++;
            }
            Oleta.Tosi(n >= 200, "tapauksia " + n);
        }

        /// <summary>Jokainen kaupunki ja reitin keskipiste × silmäluvut 1..6 × land/sea, tiivisteinä.</summary>
        [Testi] static void KattavatSiirrotTiivisteina()
        {
            var v = KultaisetApu.Verkko;
            var kattava = MiniJson.Objekti(KultaisetApu.Kultaiset["kattava"]);
            var tiivisteet = MiniJson.Objekti(kattava["tiivisteet"]);
            var vaarat = new List<string>();
            int tapauksia = 0;
            using var sha = SHA256.Create();
            foreach (var kv in tiivisteet)
            {
                var lahto = KultaisetApu.Sijainniksi(kv.Key);
                var rivit = new List<string>();
                foreach (var mode in new[] { "land", "sea" })
                    for (int silmaluku = 1; silmaluku <= 6; silmaluku++)
                    {
                        var lista = Lajiteltu(v.Siirrot(lahto, silmaluku, KultaisetApu.Tavaksi(mode)));
                        rivit.Add($"{silmaluku}|{mode}:" + string.Join(";", lista.Select(s => $"{s.avain}={s.pituus}={s.polku}")));
                        tapauksia++;
                    }
                var tiiviste = string.Concat(sha.ComputeHash(Encoding.UTF8.GetBytes(string.Join("\n", rivit))).Select(b => b.ToString("x2"))).Substring(0, 16);
                if (tiiviste != (string)kv.Value) vaarat.Add(kv.Key);
            }
            Oleta.Sama((int)(double)kattava["tapauksia"], tapauksia, "kattavia tapauksia");
            Oleta.Sama(0, vaarat.Count, "eroavat lähdöt: " + string.Join(" ", vaarat.Take(10)));
        }

        [Testi] static void KultaisetSaavutettavat()
        {
            var v = KultaisetApu.Verkko;
            foreach (var t in KultaisetApu.Lista(KultaisetApu.Kultaiset, "saavutettavat"))
            {
                var lahto = KultaisetApu.Sijainniksi((string)t["lahto"]);
                var raha = (int)(double)t["raha"];
                var odotettu = string.Join(",", MiniJson.Taulukko(t["kaupungit"]).Cast<string>());
                var saatu = string.Join(",", v.Saavutettavat(lahto, raha).OrderBy(s => s, StringComparer.Ordinal));
                Oleta.Sama(odotettu, saatu, $"{t["lahto"]} raha {raha}");
                if (lahto.Kaupungissa)
                    Oleta.Sama(odotettu, string.Join(",", v.Saavutettavat(lahto.Kaupunki, raha).OrderBy(s => s, StringComparer.Ordinal)));
            }
        }

        // --- pienet käsin tarkistetut säännöt pienellä laudalla -------------

        static Reittiverkko Pieni() => new Reittiverkko(
            new[] { "a", "b", "c", "d" }.Select(id => new Kaupunki { Id = id, Nimi = id }),
            new[]
            {
                new Reitti { Id = "a|b", A = "a", B = "b", Laji = ReitinLaji.Maa, Askeleet = 3 },
                new Reitti { Id = "b|c", A = "b", B = "c", Laji = ReitinLaji.Maa, Askeleet = 1 },
                new Reitti { Id = "c|d", A = "c", B = "d", Laji = ReitinLaji.Meri, Askeleet = 2, Maksu = 100 },
                new Reitti { Id = "lento:a|d", A = "a", B = "d", Laji = ReitinLaji.Lento },
            });

        [Testi] static void PieniLautaSiirrot()
        {
            var v = Pieni();
            Oleta.Sama(1, v.Lennot.Count);
            Oleta.Sama(3, v.Reitit.Count);
            Oleta.Sama("b|c", v.HaeReitti("c", "b").Id);
            Oleta.Tosi(v.HaeReitti("a", "d") == null, "lento ei ole laudan kaari");
            // a:sta 4 maata: reitille idx 1..3 → b (3 askelta, pysähdys ennen loppua sallittu) → c (4).
            var s = Lajiteltu(v.Siirrot(Sijainti.KaupungissaSijainti("a"), 4, Kulkutapa.Maa));
            Oleta.Sama("c:b=3=e:a|b:1,e:a|b:2,c:b;c:c=4=e:a|b:1,e:a|b:2,c:b,c:c",
                string.Join(";", s.Select(x => $"{x.avain}={x.pituus}={x.polku}")));
            // Reitin varrelta 1 askel: molempiin suuntiin.
            var r = Lajiteltu(v.Siirrot(Sijainti.ReitillaSijainti("a|b", 1), 1, Kulkutapa.Maa));
            Oleta.Sama("c:a;e:a|b:2", string.Join(";", r.Select(x => x.avain)));
            // Merellä maakaupungista ei lähde mitään, c:stä lähtee.
            Oleta.Sama(0, v.Siirrot(Sijainti.KaupungissaSijainti("a"), 3, Kulkutapa.Meri).Count);
            Oleta.Sama("e:c|d:1", string.Join(";", v.Siirrot(Sijainti.KaupungissaSijainti("c"), 1, Kulkutapa.Meri).Keys));
            // Lento, bussi ja pysy eivät liiku kaupungista laudan kaaria pitkin.
            Oleta.Sama(0, v.Siirrot(Sijainti.KaupungissaSijainti("b"), 2, Kulkutapa.Bussi).Count);
        }

        [Testi] static void PieniLautaSaavutettavat()
        {
            var v = Pieni();
            Oleta.Sama("a,b,c", string.Join(",", v.Saavutettavat("a", 99).OrderBy(x => x, StringComparer.Ordinal)));
            Oleta.Sama("a,b,c,d", string.Join(",", v.Saavutettavat("a", 100).OrderBy(x => x, StringComparer.Ordinal)));
            // Merireitin varrelta pääsee molempiin päihin ilman maksua.
            Oleta.Sama("a,b,c,d", string.Join(",", v.Saavutettavat(Sijainti.ReitillaSijainti("c|d", 1), 0).OrderBy(x => x, StringComparer.Ordinal)));
        }

        [Testi] static void KaksoisreittiHeittaa()
        {
            bool heitti = false;
            try
            {
                new Reittiverkko(new[] { new Kaupunki { Id = "a" }, new Kaupunki { Id = "b" } }, new[]
                {
                    new Reitti { Id = "a|b", A = "a", B = "b", Laji = ReitinLaji.Maa, Askeleet = 2 },
                    new Reitti { Id = "a|b", A = "a", B = "b", Laji = ReitinLaji.Meri, Askeleet = 2 },
                });
            }
            catch (ArgumentException) { heitti = true; }
            Oleta.Tosi(heitti, "kaksoisreitti");
        }
    }
}
