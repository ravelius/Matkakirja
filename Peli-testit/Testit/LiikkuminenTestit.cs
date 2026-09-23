// Liiku-liu'un napit ja Vaihda matkustustapa (Peli/Liikkuminen.cs, Matka.VaihtoTarjolla):
// kultainen jälki Kultaiset/kulkutapajalki.json (tee-kulkutapajalki.mjs lukee webin ui.js:n
// estosyyt) samalla käsikirjoituksella kuin matkajälki, ja Liiku-vuon kohde- ja siirtorivit.
// ./kaanna.sh Liikkuminen
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    public static class LiikkuminenTestit
    {
        static string Web(Kulkutapa t) => MatkaTestit.Web(t);

        static string Rivi(string teko, Matka m)
        {
            var t = m.Tila;
            var osat = new List<string> { teko };
            if (t.Vaihe == Vaihe.Heitto) osat.Add("vaihto=" + (m.VaihtoTarjolla() ? "true" : "false"));
            if (t.Vaihe == Vaihe.Toiminta)
                foreach (var n in Liikkuminen.Napit(m))
                    osat.Add($"{Web(n.Laji)}:{(n.Estetty ? "estetty" : "ok")}:{n.Syy ?? "-"}:{(n.Korostettu ? "*" : "")}");
            return string.Join(" | ", osat);
        }

        static string Rivi(Dictionary<string, object> a)
        {
            var osat = new List<string> { MiniJson.Teksti(a, "teko") };
            if (MiniJson.Kentta(a, "vaihto") is bool v) osat.Add("vaihto=" + (v ? "true" : "false"));
            foreach (var n in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(a, "napit")).Cast<List<object>>())
                osat.Add($"{n[0]}:{((bool)n[1] ? "estetty" : "ok")}:{(n[2] as string) ?? "-"}:{((bool)n[3] ? "*" : "")}");
            return string.Join(" | ", osat);
        }

        [Testi] static void KultainenKulkutapajalki()
        {
            var jalki = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Path.Combine(KultaisetApu.Juuri, "Kultaiset", "kulkutapajalki.json"))));
            int vuorot = (int)MiniJson.Luku(jalki, "vuorot").Value, yht = 0, napit = 0;
            foreach (var ajo in MiniJson.Taulukko(MiniJson.Kentta(jalki, "jaljet")).Cast<Dictionary<string, object>>())
            {
                var siemen = (long)(double)MiniJson.Kentta(ajo, "seed");
                var nimi = $"siemen {siemen} {MiniJson.Teksti(ajo, "start")}";
                var askeleet = MiniJson.Taulukko(MiniJson.Kentta(ajo, "askeleet")).Cast<Dictionary<string, object>>().ToList();
                var m = Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(siemen), "Fogg", MiniJson.Teksti(ajo, "start"), KultaisetApu.Laattamaarat);
                int i = 0;
                void Vertaa(string teko)
                {
                    if (i >= askeleet.Count) throw new Exception($"{nimi}: C# jatkoi jäljen jälkeen ({teko})");
                    string web = Rivi(askeleet[i]), cs = Rivi(teko, m);
                    if (web != cs) throw new Exception($"{nimi} askel {i}:\n  web {web}\n  C#  {cs}");
                    if (m.Tila.Vaihe == Vaihe.Toiminta) napit++;
                    i++;
                }
                Vertaa("alku");
                if (MiniJson.Luku(ajo, "raha") is double raha)
                {
                    m.Tila.Pelaaja.Raha = (int)raha;
                    m.Tila.Vaihe = Vaihe.Toiminta;
                    m.AloitaVuoro();
                    Vertaa("raha:" + (int)raha);
                }
                var k = new Kasikirjoitus { Valinnat = (int)(MiniJson.Luku(ajo, "alkuValinta") ?? 0) };
                for (int n = 0; n < 400 && m.Tila.VuoroLaskuri <= vuorot; n++) Vertaa(k.Seuraava(m));
                Oleta.Sama(askeleet.Count, i, nimi + ": jäljen pituus");
                yht += i;
            }
            Oleta.Tosi(yht > 500 && napit > 50, $"askelia {yht}, nappirivejä {napit}");
        }

        static Matka Pariisissa(int raha = 300)
        {
            var m = Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(12345), "Fogg", "pariisi");
            if (m.Tila.Vaihe == Vaihe.Heitto) Oleta.Tosi(m.PeruKulkutapa().Ok, "esivalinta pois");
            m.Tila.Pelaaja.Raha = raha;
            return m;
        }

        [Testi] static void NapitTeksteinJaHinnoin()
        {
            var n = Liikkuminen.Napit(Pariisissa());
            Oleta.Sama("Liftaus,Bussilla,Laivalla,Lentäen", string.Join(",", n.Select(x => x.Teksti)));
            Oleta.Sama("0,50,100,300", string.Join(",", n.Select(x => x.Hinta)));
            Oleta.Tosi(!n[0].Estetty && n[0].Korostettu && !n[1].Estetty, "liftaus ja bussi");
            Oleta.Tosi(!Liikkuminen.LiikuEstetty(n), "Liiku käytössä");
            var koyha = Liikkuminen.Napit(Pariisissa(10));
            Oleta.Sama("bussilippu maksaa 50 puntaa", koyha[1].Syy);
            Oleta.Tosi(koyha[3].Estetty, "lento ilman rahaa");
            // Heittovaiheessa liukua ei ole (web: noppa ja Vaihda): tyhjä ja Liiku harmaa.
            var h = Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(12345), "Fogg", "pariisi");
            Oleta.Sama(Vaihe.Heitto, h.Tila.Vaihe);
            Oleta.Sama(0, Liikkuminen.Napit(h).Count);
            Oleta.Tosi(Liikkuminen.LiikuEstetty(Liikkuminen.Napit(h)), "harmaa");
        }

        [Testi] static void KohdeRivitJaSiirrot()
        {
            var m = Pariisissa();
            var bussi = PeliApu.KohdeRivit(m, Kulkutapa.Bussi);
            Oleta.Tosi(bussi.Count > 0 && bussi.All(r => r.Rivi.Nimi.EndsWith(" (50 p)")), "bussirivit");
            Oleta.Sama(m.BussiKohteet().Count, bussi.Count);
            var lento = PeliApu.KohdeRivit(m, Kulkutapa.Lento);
            Oleta.Sama(m.LentoKohteet().Count, lento.Count, "ei mannerlentoja alussa");
            Oleta.Tosi(lento.All(r => r.Rivi.Nimi.EndsWith(" (300 p)")), "lentorivit");
            Oleta.Sama(0, PeliApu.KohdeRivit(m, Kulkutapa.Meri).Count, "Pariisista ei laivaa");
            Oleta.Sama(0, PeliApu.KohdeRivit(m, Kulkutapa.Maa).Count, "liftaus heittää heti");

            // Liftaus: tapa + heitto, sitten pelaajan valitsema siirto (web doWalk → actionMove).
            Oleta.Tosi(m.ValitseKulkutapa(Kulkutapa.Maa).Ok && m.Heita().Ok, "heitto");
            var siirrot = PeliApu.SiirtoRivit(m);
            Oleta.Sama(m.Tila.Siirrot.Count, siirrot.Count);
            var viimeinen = siirrot[siirrot.Count - 1].Avain;
            var t = PeliApu.Matkusta(m, null, Kulkutapa.Maa, siirto: viimeinen);
            Oleta.Tosi(t.Ok, t.Virhe);
            Oleta.Sama(viimeinen, t.Kohde.Avain, "valittu siirto, ei lähin tavoitetta");
        }

        [Testi] static void LaivaRiviSatamasta()
        {
            var m = Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(3), "Fogg", "lontoo");
            if (m.Tila.Vaihe == Vaihe.Heitto) m.PeruKulkutapa();
            var n = Liikkuminen.Napit(m).Single(x => x.Laji == Kulkutapa.Meri);
            if (n.Estetty) return; // lauta ilman Lontoon satamaa: ei tarkistettavaa
            var r = PeliApu.KohdeRivit(m, Kulkutapa.Meri).Single();
            Oleta.Sama("Laivalla (100 p)", r.Rivi.Nimi);
            Oleta.Tosi(r.Kohde == null, "laiva valitsee tavan, noppa heittonapista");
        }
    }
}
