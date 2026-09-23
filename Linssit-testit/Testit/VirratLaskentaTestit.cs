// Kultaiset testit: Dijkstran saapumisajat, edeltäjäketjut, yhdistys ja
// kesto (web js/aikajana-virrat-laskenta.js laskeVirta, laskeKentat).
//
// Kentät vertaillaan TAVUTARKASTI (FNV-1a koko taulukosta) ja otosruutujen
// arvoina: sama Float32-aika, sama edeltäjä ja sama nauhamerkintä joka
// ruudussa tarkoittaa, että keon tasapelit ratkesivat samassa järjestyksessä.
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.InteropServices;
using Matkakirja.Linssit.Virrat;
using static Matkakirja.Linssit.Testit.VirratApu;

namespace Matkakirja.Linssit.Testit
{
    public static class VirratLaskentaTestit
    {
        static void VertaaKentta(Dictionary<string, object> odotettu, VirranKentta k, string nimi)
        {
            Oleta.Sama(S(odotettu, "tunnus"), k.Tunnus ?? nimi, "tunnus");
            var saavutettu = 0;
            foreach (var a in k.Aika) if (a != 0) saavutettu += 1;
            Oleta.Sama(I(odotettu["saavutettu"]), saavutettu, nimi + ": saavutettuja ruutuja");
            var kohdat = Otos;
            var otos = O(odotettu, "otos");
            OtosSama(L(otos, "aika"), kohdat, (i) => k.Aika[i], nimi + ".aika");
            OtosSama(L(otos, "meri"), kohdat, (i) => k.Meri[i], nimi + ".meri");
            OtosSama(L(otos, "edeltaja"), kohdat, (i) => k.Edeltaja[i], nimi + ".edeltaja");
            OtosSama(L(otos, "nauhaPiste"), kohdat, (i) => k.NauhaPiste[i], nimi + ".nauhaPiste");
            OtosSama(L(otos, "nauhaNro"), kohdat, (i) => k.NauhaNro[i], nimi + ".nauhaNro");
            var t = O(odotettu, "tiiviste");
            Oleta.Sama(S(t, "aika"), Fnv(k.Aika), nimi + ".aika tiiviste");
            Oleta.Sama(S(t, "meri"), Fnv(k.Meri), nimi + ".meri tiiviste");
            Oleta.Sama(S(t, "edeltaja"), Fnv(k.Edeltaja), nimi + ".edeltaja tiiviste");
            Oleta.Sama(S(t, "nauhaPiste"), Fnv(k.NauhaPiste), nimi + ".nauhaPiste tiiviste");
            Oleta.Sama(S(t, "nauhaNro"), Fnv(k.NauhaNro), nimi + ".nauhaNro tiiviste");
        }

        [Testi] static void ViisiVirtaaTavutarkasti()
        {
            var odotetut = L(Kultaiset, "virrat");
            var kentat = Laskettu.Edeltajat;
            Oleta.Sama(5, kentat.Count);
            for (var n = 0; n < kentat.Count; n += 1) VertaaKentta(O(odotetut[n]), kentat[n], kentat[n].Tunnus);
        }

        [Testi] static void RetkiTavutarkasti()
        {
            var odotetut = L(Kultaiset, "virrat");
            VertaaKentta(O(odotetut[odotetut.Count - 1]), Retki, "retki");
            Oleta.Sama(S(Kultaiset, "retki"), Fnv(Laskettu.Retki), "kooste: retken ajat");
        }

        [Testi] static void KoeVirtaReunatapaukset()
        {
            // Synteettinen virta: nopeustaulu, luisu: null, hajonta, lähde ilman aikaa,
            // nauha meriSateella ja portti ilman lon-rajaa (siemen 7).
            var virta = AineistonLukija.LueVirta(Kultaiset["koeVirta"]);
            Oleta.Sama(true, virta.Portit[0].LuisuPois, "luisu: null säilyy");
            Oleta.Tosi(double.IsNaN(virta.Lahteet[1].Aika), "lähde ilman aikaa");
            var k = VirtaLaskenta.LaskeVirta(virta, new Ymparisto { Maa = Maa, Rannikko = Laskettu.Rannikko, Siemen = 7 });
            VertaaKentta(O(Kultaiset, "koe"), k, "koe");
        }

        [Testi] static void SiirtymatJaYhdiste()
        {
            var odotetut = L(Kultaiset, "siirtymat");
            Oleta.Sama(odotetut.Count, Laskettu.Siirtymat.Count, "siirtymiä");
            for (var n = 0; n < odotetut.Count; n += 1)
            {
                var o = O(odotetut[n]);
                var s = Laskettu.Siirtymat[n];
                Oleta.Sama(S(o, "tunnus"), s.Tunnus);
                Oleta.Sama(I(o["kohde"]), s.Kohde);
                Oleta.Sama(S(o, "virta"), s.Virta);
                Oleta.Sama(I(o["lue"]), s.Lue);
            }
            var y = O(Kultaiset, "yhdiste");
            var kohdat = Otos;
            var otos = O(y, "otos");
            OtosSama(L(otos, "aika"), kohdat, (i) => Laskettu.Aika[i], "yhdiste.aika");
            OtosSama(L(otos, "virta"), kohdat, (i) => Laskettu.Virta[i], "yhdiste.virta");
            OtosSama(L(otos, "meri"), kohdat, (i) => Laskettu.Meri[i], "yhdiste.meri");
            OtosSama(L(otos, "meriVirta"), kohdat, (i) => Laskettu.MeriVirta[i], "yhdiste.meriVirta");
            var t = O(y, "tiiviste");
            Oleta.Sama(S(t, "aika"), Fnv(Laskettu.Aika), "yhdiste.aika tiiviste");
            Oleta.Sama(S(t, "virta"), Fnv(Laskettu.Virta), "yhdiste.virta tiiviste");
            Oleta.Sama(S(t, "meri"), Fnv(Laskettu.Meri), "yhdiste.meri tiiviste");
            Oleta.Sama(S(t, "meriVirta"), Fnv(Laskettu.MeriVirta), "yhdiste.meriVirta tiiviste");
            Oleta.Sama(S(Kultaiset, "rannikko"), Fnv(Laskettu.Rannikko), "rannikko");
            var v = O(Kultaiset, "vanha");
            OtosSama(L(v, "otos"), kohdat, (i) => Laskettu.Vanha[i], "vanha");
            Oleta.Sama(S(v, "tiiviste"), Fnv(Laskettu.Vanha), "vanha tiiviste");
        }

        [Testi] static void NopeusJaYlitys()
        {
            var p = O(Kultaiset, "perus");
            var paavirta = Aineisto.Virrat[0].Nopeus;
            foreach (var a in L(p, "nopeus"))
            {
                var r = L(a);
                Oleta.Sama(D(r[1]), VirtaLaskenta.NopeusHetkella(paavirta, D(r[0])), "nopeus " + D(r[0]));
                Oleta.Sama(D(r[2]), VirtaLaskenta.NopeusHetkella(Nopeus.VakioNopeus(1.2), D(r[0])));
            }
            foreach (var a in L(p, "ylitys"))
            {
                var r = L(a);
                var ikkuna = new[] { D(L(r[1])[0]), D(L(r[1])[1]) };
                var saatu = r[2] == null
                    ? VirtaLaskenta.YlityksenSaapuminen(D(r[0]), ikkuna)
                    : VirtaLaskenta.YlityksenSaapuminen(D(r[0]), ikkuna, D(r[2]));
                Oleta.Sama(D(r[3]), saatu, "ylitys " + D(r[0]));
            }
        }

        [Testi] static void VaiheetJarjestyksessa()
        {
            var vaiheet = new List<string>();
            Kentat viimeinen = null;
            foreach (var v in VirtaLaskenta.LaskeKentatVaiheittain(Aineisto, Maa))
            {
                vaiheet.Add(v.Vaihe);
                if (v.Kentat != null) viimeinen = v.Kentat;
            }
            Oleta.Sama("paavirta,eurooppa,siperia,amerikat,tyynimeri,valmis", string.Join(",", vaiheet));
            Oleta.Sama(Fnv(Laskettu.Aika), Fnv(viimeinen.Aika), "vaiheittain = kerralla");
        }

        [StructLayout(LayoutKind.Sequential)]
        struct Aikaarvo { public long Sek; public int Usek; int tayte; }
        [StructLayout(LayoutKind.Sequential)]
        struct Kaytto
        {
            public Aikaarvo Kayttaja, Jarjestelma;
            public long M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12, M13, M14;
        }
        [DllImport("libc")] static extern int getrusage(int kuka, out Kaytto kaytto);

        /// <summary>Prosessin CPU-aika (ms) getrusagella; NaN, jos ei saatavilla.</summary>
        static double Suoritinaika()
        {
            try
            {
                if (getrusage(0, out var k) != 0) return double.NaN;
                return (k.Kayttaja.Sek + k.Jarjestelma.Sek) * 1000.0 + (k.Kayttaja.Usek + k.Jarjestelma.Usek) / 1000.0;
            }
            catch (Exception) { return double.NaN; }
        }

        /// <summary>
        /// KESTO: kaikki viisi virtaa + yhdistys + retki + vanha, kuten puhelin
        /// ajaa linssin avauksessa. Ensimmäinen ajo sisältää JIT-käännöksen
        /// (IL2CPP-puhelimessa sitä ei ole), toinen on lämmin. Seinäkello
        /// kertoo myös koneen kuorman; tavoite (< 1,5 s Macilla) tarkistetaan
        /// prosessin CPU-ajasta, jottei rinnakkaisten sessioiden kuorma kaada ajoa.
        /// </summary>
        [Testi] static void KestoKokoAineistolle()
        {
            var maa = Ruudukko.PuraMaamaski(Aineisto.Maamaski.Juoksut);
            (double seina, double cpu) Aja(string otsikko)
            {
                var cpu0 = Suoritinaika();
                var kello = Stopwatch.StartNew();
                var edellinen = cpu0;
                var rivi = new List<string>();
                foreach (var v in VirtaLaskenta.LaskeKentatVaiheittain(Aineisto, maa))
                {
                    var nyt = Suoritinaika();
                    rivi.Add($"{v.Vaihe} {nyt - edellinen:F0}");
                    edellinen = nyt;
                }
                var yhteensa = kello.Elapsed.TotalMilliseconds;
                var cpu = Suoritinaika() - cpu0;
                Console.WriteLine($"      {otsikko}: CPU {string.Join(", ", rivi)} ms; yhteensä CPU {cpu:F0} ms, seinäkello {yhteensa:F0} ms");
                return (yhteensa, cpu);
            }
            Aja("kylmä");
            var (seina, cpuAika) = Aja("lämmin");
            var js = O(O(Kultaiset, "lahde"), "kestotMs");
            Console.WriteLine($"      vertailu: JS (Node, tee-kultaiset.mjs) seinäkello {D(js["yhteensa"]):F0} ms, CPU {D(js["cpuYhteensa"]):F0} ms");
            if (double.IsNaN(cpuAika)) Oleta.Tosi(seina < 5000, $"laskenta kesti {seina:F0} ms");
            else Oleta.Tosi(cpuAika < 1500, $"laskenta vei {cpuAika:F0} ms CPU-aikaa (tavoite < 1500)");
        }
    }
}
