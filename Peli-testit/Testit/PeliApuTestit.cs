// Pelisilmukan puhtaan logiikan (Scripts/Peli/PeliApu.cs) testit oikealla
// sisältöpaketilla (Kultaiset/paketti): matkavalinta Pariisista, bussi ja
// noppamatka Lontooseen, reitin askeleen koordinaatti, ajon kesto ja
// atominen tallennus. ./kaanna.sh PeliApu
using System;
using System.IO;
using System.Linq;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    public static class PeliApuTestit
    {
        static Matka UusiPariisissa(long siemen = 12345) =>
            Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(siemen), "Fogg", "pariisi");

        static void Lahella(double odotettu, double saatu, double sallittu, string viesti)
        {
            if (Math.Abs(odotettu - saatu) > sallittu) throw new Exception($"odotettu {odotettu}, saatu {saatu} {viesti}");
        }

        [Testi] static void IsoympyranPaatJaKeskipiste()
        {
            var a = PeliApu.Isoympyra(0, 0, 0, 90, 0);
            Lahella(0, a.Lat, 1e-9, "lat t=0"); Lahella(0, a.Lon, 1e-9, "lon t=0");
            var b = PeliApu.Isoympyra(0, 0, 0, 90, 1);
            Lahella(90, b.Lon, 1e-9, "lon t=1");
            var k = PeliApu.Isoympyra(0, 0, 0, 90, 0.5);
            Lahella(45, k.Lon, 1e-9, "päiväntasaajan keskipiste");
            // Pituuspiiriä pitkin navan yli: 60°N 0° → 60°N 180° kulkee pohjoisnavan kautta.
            var n = PeliApu.Isoympyra(60, 0, 60, 180, 0.5);
            Lahella(90, n.Lat, 1e-6, "napa");
            // Päivämäärärajan yli: 170° → -170° keskipiste on 180°, ei 0°.
            var r = PeliApu.Isoympyra(0, 170, 0, -170, 0.5);
            Lahella(180, Math.Abs(r.Lon), 1e-6, "päivämääräraja");
            Lahella(90, PeliApu.Kulma(0, 0, 0, 90), 1e-9, "kulma");
        }

        [Testi] static void ReitinAskelIsoympyralla()
        {
            var v = KultaisetApu.Verkko;
            var r = v.HaeReitti("pariisi", "lontoo");
            Oleta.Sama("lontoo|pariisi", r.Id);
            Oleta.Sama(3, r.Askeleet);
            var lontoo = v.Kaupungit["lontoo"]; var pariisi = v.Kaupungit["pariisi"];
            var k = PeliApu.Koordinaatti(v, Sijainti.ReitillaSijainti(r.Id, 1)).Value;
            var odotettu = PeliApu.Isoympyra(lontoo.Lat, lontoo.Lon, pariisi.Lat, pariisi.Lon, 1.0 / 3);
            Lahella(odotettu.Lat, k.Lat, 1e-12, "lat"); Lahella(odotettu.Lon, k.Lon, 1e-12, "lon");
            // Askel 1 on lähempänä A-päätä (Lontoo) kuin B-päätä.
            Oleta.Tosi(PeliApu.Kulma(k.Lat, k.Lon, lontoo.Lat, lontoo.Lon) < PeliApu.Kulma(k.Lat, k.Lon, pariisi.Lat, pariisi.Lon));
            var kp = PeliApu.Koordinaatti(v, Sijainti.KaupungissaSijainti("pariisi")).Value;
            Oleta.Sama(pariisi.Lat, kp.Lat); Oleta.Sama(pariisi.Lon, kp.Lon);
            Oleta.Tosi(PeliApu.Koordinaatti(v, Sijainti.KaupungissaSijainti("ei-ole")) == null, "tuntematon kaupunki");
            Oleta.Tosi(PeliApu.Koordinaatti(v, Sijainti.ReitillaSijainti("a|b", 1)) == null, "tuntematon reitti");
        }

        [Testi] static void AjonKestoJaYleiskuva()
        {
            Lahella(1.5, PeliApu.AjoKesto(0), 1e-6, "nolla");
            Lahella(3.0, PeliApu.AjoKesto(170), 1e-6, "pitkä");
            var v = KultaisetApu.Verkko;
            var l = v.Kaupungit["lontoo"]; var p = v.Kaupungit["pariisi"];
            var k = PeliApu.AjoKesto(PeliApu.Kulma(l.Lat, l.Lon, p.Lat, p.Lon));
            Oleta.Tosi(k >= 1.5f && k < 1.7f, "Pariisi–Lontoo " + k);
            Lahella(18.6, PeliApu.YleiskuvanKaari(3), 1e-9, "lähin");
            Lahella(140, PeliApu.YleiskuvanKaari(170), 1e-9, "suurin");
        }

        [Testi] static void UusiPeliPariisissaTarjoaaBussinJaLiftauksen()
        {
            var m = UusiPariisissa();
            // Pariisissa ainoa noppatapa on liftaus, joten Matka valitsee sen valmiiksi (web autoTravel).
            Oleta.Sama(Vaihe.Heitto, m.Tila.Vaihe);
            var v = PeliApu.Vaihtoehdot(m, "lontoo");
            Oleta.Sama("Bussi,Liftaus", string.Join(",", v.Select(x => x.Nimi)));
            Oleta.Sama(Vakiot.BussiHinta, v[0].Hinta);
            Oleta.Sama(false, v[0].Noppa);
            Oleta.Sama(0, v[1].Hinta);
            Oleta.Sama(true, v[1].Noppa);
            Oleta.Sama(3, v[1].Askelia ?? -1);
            Oleta.Sama(4, PeliApu.Vaihtoehdot(m, "marseille")[1].Askelia ?? -1);
            // Kaukainen kaupunki: ei bussia, liftaus lähemmäs.
            var kauko = m.Verkko.Kaupungit.Keys.First(k => !m.BussiKohteet().Contains(k) && k != "pariisi");
            Oleta.Sama("Liftaus", string.Join(",", PeliApu.Vaihtoehdot(m, kauko).Select(x => x.Nimi)));
            Oleta.Sama(0, PeliApu.Vaihtoehdot(m, "pariisi").Count, "oma kaupunki");
            Oleta.Sama(0, PeliApu.Vaihtoehdot(m, "ei-ole").Count, "tuntematon");
        }

        [Testi] static void MannerlentoMatkavalinnassaKunMantereenAarreLoytyi()
        {
            var m = Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(9L), "Fogg", "pariisi", KultaisetApu.Laattamaarat);
            Oleta.Sama(Vaihe.Heitto, m.Tila.Vaihe, "liftaus valittu valmiiksi");
            Oleta.Tosi(m.PeruKulkutapa().Ok, "bussi sallii perumisen");
            var kaukana = new Kaupat(m).MannerLennot();
            Oleta.Sama(0, kaukana.Count, "ei ennen Euroopan aarretta");
            var tahti = m.Laatat.Laatat.First(kv => kv.Value == Laattatyypit.Paaaarre && m.Laatat.MannerOf(kv.Key) == "europe").Key;
            m.KaannaLaatta(tahti);
            Oleta.Sama(Vaihe.Toiminta, m.Tila.Vaihe);
            var kohteet = new Kaupat(m).MannerLennot();
            Oleta.Tosi(kohteet.Count > 0 && kohteet.All(k => k.Manner != "europe"), "muut mantereet");
            var k0 = kohteet[0];
            var v = PeliApu.Vaihtoehdot(m, k0.Kaupunki);
            var ml = v.Single(x => x.Mannerlento);
            Oleta.Sama(Kulkutapa.Lento, ml.Tapa);
            Oleta.Sama(KauppaVakiot.MannerlentoNappi(k0), ml.Nimi);
            Oleta.Tosi(!v.Any(x => x.Tapa == Kulkutapa.Lento && !x.Mannerlento), "ei tavallista lentoa samaan");
            Oleta.Sama(0, PeliApu.Vaihtoehdot(m, "lontoo").Count(x => x.Mannerlento), "Eurooppaan ei mannerlentoa");
            int raha = m.Tila.Pelaaja.Raha;
            var t = PeliApu.Matkusta(m, k0.Kaupunki, Kulkutapa.Lento, true);
            Oleta.Tosi(t.Ok, t.Virhe);
            Oleta.Sama(k0.Kaupunki, t.Saapui, "perillä");
            Oleta.Sama(raha - Vakiot.LentoHinta, m.Tila.Pelaaja.Raha, "300 p");
            // Tavallisena lentona sama kohde epäonnistuu siististi (ei lentokenttäreittiä).
            Oleta.Tosi(!PeliApu.Matkusta(m, "pariisi", Kulkutapa.Lento, true).Ok, "ei toista mannerlentoa ilman aarretta");
        }

        [Testi] static void AanitunnuksetKutenWeb()
        {
            // js/ui-apurit.js EVENT_SOUND ja js/sound.js treasureSound.
            Oleta.Sama("ferry", Aanitunnukset.Tapahtuma("fare"));
            Oleta.Sama("coin", Aanitunnukset.Tapahtuma("aid"));
            Oleta.Sama("turn", Aanitunnukset.Tapahtuma("jotain"));
            Oleta.Sama(null, Aanitunnukset.Tapahtuma("treasure"));
            Oleta.Sama("star", Aanitunnukset.Aarre(Laattatyypit.Paaaarre));
            Oleta.Sama("gem", Aanitunnukset.Aarre(Laattatyypit.PieniAarre));
            Oleta.Sama("empty", Aanitunnukset.Aarre("empty"));
        }

        [Testi] static void NappulanMatkapisteetReitilta()
        {
            var m = UusiPariisissa();
            var lahto = m.Tila.Pelaaja.Sijainti;
            var t = PeliApu.Matkusta(m, "lontoo", Kulkutapa.Bussi);
            Oleta.Tosi(t.Ok, t.Virhe);
            var polku = t.Polku;
            Oleta.Tosi(polku != null && polku.Count > 0, "bussin polku kirjattu");
            var pisteet = PeliApu.Matkapisteet(KultaisetApu.Verkko, lahto, polku, t.Kohde);
            Oleta.Sama(polku.Count + 1, pisteet.Count, "lähtö + reitin askeleet");
            var a = PeliApu.Koordinaatti(KultaisetApu.Verkko, lahto).Value;
            var b = PeliApu.Koordinaatti(KultaisetApu.Verkko, t.Kohde).Value;
            Oleta.Tosi(pisteet[0] == (a.Lat, a.Lon) && pisteet[pisteet.Count - 1] == (b.Lat, b.Lon), "päät");
            // Ilman polkua (lento): lähtö ja kohde.
            Oleta.Sama(2, PeliApu.Matkapisteet(KultaisetApu.Verkko, lahto, null, t.Kohde).Count);
        }

        [Testi] static void BussiLontooseenSaapuuIlmanAikaa()
        {
            var m = UusiPariisissa();
            var t = PeliApu.Matkusta(m, "lontoo", Kulkutapa.Bussi);
            Oleta.Tosi(t.Ok, t.Virhe);
            Oleta.Sama("lontoo", t.Saapui);
            Oleta.Sama("c:lontoo", t.Kohde.Avain);
            Oleta.Sama("c:pariisi", t.Lahto.Avain);
            Oleta.Sama(Vakiot.AloitusRaha - Vakiot.BussiHinta, m.Tila.Pelaaja.Raha);
            Oleta.Sama(1, m.Tila.VuoroLaskuri, "bussi ei kuluta aikaa");
            Oleta.Tosi(m.Tila.Pelaaja.Kaydyt.Contains("lontoo"));
            // Lontoossa on lentokenttä: lento on tarjolla lentokohteisiin, kun rahaa riittäisi (250 < 300 → ei).
            Oleta.Tosi(!PeliApu.Vaihtoehdot(m, m.Verkko.Lennot.First(r => r.A == "lontoo" || r.B == "lontoo").B)
                .Any(x => x.Tapa == Kulkutapa.Lento), "lento ilman rahaa");
        }

        [Testi] static void LiftausVieLontooseenTaiReitilleSitaKohti()
        {
            int perille = 0, reitille = 0;
            for (long siemen = 1; siemen <= 40; siemen++)
            {
                var m = UusiPariisissa(siemen);
                var t = PeliApu.Matkusta(m, "lontoo", Kulkutapa.Maa);
                Oleta.Tosi(t.Ok, t.Virhe);
                int noppa = t.Noppa ?? -1;
                Oleta.Tosi(noppa >= 1 && noppa <= 6, "noppa " + noppa);
                if (noppa >= 3)
                {
                    Oleta.Sama("lontoo", t.Saapui, "siemen " + siemen);
                    perille++;
                }
                else
                {
                    // Reitti lontoo|pariisi: Pariisi on B-pää (askel 3), joten noppa n vie askeleelle 3 − n.
                    Oleta.Sama(null, t.Saapui);
                    Oleta.Sama(Sijainti.ReitillaSijainti("lontoo|pariisi", 3 - noppa).Avain, t.Kohde.Avain, "siemen " + siemen);
                    // Kesken reitin matka jatkuu napista: Heitto-vaihe ja sama tapa.
                    Oleta.Sama(Vaihe.Heitto, m.Tila.Vaihe);
                    Oleta.Tosi(m.JatkaMatkaaItsestaan());
                    var jatko = PeliApu.Vaihtoehdot(m, "lontoo");
                    Oleta.Sama("Jatka matkaa", string.Join(",", jatko.Select(x => x.Nimi)));
                    var t2 = PeliApu.Matkusta(m, "lontoo", Kulkutapa.Maa);
                    Oleta.Tosi(t2.Ok, t2.Virhe);
                    Oleta.Tosi(t2.Saapui != null || !t2.Kohde.Kaupungissa, "jatko");
                    reitille++;
                }
            }
            Oleta.Tosi(perille > 0 && reitille > 0, $"molemmat haarat: {perille}/{reitille}");
        }

        [Testi] static void VaaraTapaEpaonnistuuSiististi()
        {
            var m = UusiPariisissa();
            var t = PeliApu.Matkusta(m, "lontoo", Kulkutapa.Lento);
            Oleta.Sama(false, t.Ok);
            Oleta.Tosi(!string.IsNullOrEmpty(t.Virhe));
            Oleta.Sama("c:pariisi", m.Tila.Pelaaja.Sijainti.Avain);
            Oleta.Sama(Vakiot.AloitusRaha, m.Tila.Pelaaja.Raha);
            // Epäonnistunut lento perui esivalinnan: bussi toimii yhä.
            Oleta.Tosi(PeliApu.Matkusta(m, "lontoo", Kulkutapa.Bussi).Ok);
        }

        [Testi] static void SiirtoValitaanTavoitteenMukaan()
        {
            var v = KultaisetApu.Verkko;
            var lahto = Sijainti.KaupungissaSijainti("pariisi");
            var siirrot = v.Siirrot(lahto, 2, Kulkutapa.Maa);
            // Kahdella askeleella pääsee Brysseliin ja Luxemburgiin; tavoite valitaan suoraan.
            Oleta.Sama("c:bryssel", PeliApu.ValitseSiirto(v, siirrot, "bryssel", Kulkutapa.Maa));
            Oleta.Sama("c:luxemburg", PeliApu.ValitseSiirto(v, siirrot, "luxemburg", Kulkutapa.Maa));
            Oleta.Sama("e:lontoo|pariisi:1", PeliApu.ValitseSiirto(v, siirrot, "lontoo", Kulkutapa.Maa));
            Oleta.Tosi(PeliApu.ValitseSiirto(v, siirrot, null, Kulkutapa.Maa).StartsWith("c:"), "ilman tavoitetta kaupunki");
            Oleta.Sama(null, PeliApu.ValitseSiirto(v, null, "lontoo", Kulkutapa.Maa));
            Oleta.Sama(3, PeliApu.AskeliaKohteeseen(v, lahto, "lontoo", Kulkutapa.Maa) ?? -1);
            Oleta.Sama(0, PeliApu.AskeliaKohteeseen(v, lahto, "pariisi", Kulkutapa.Maa) ?? -1);
            Oleta.Sama(2, PeliApu.AskeliaKohteeseen(v, Sijainti.ReitillaSijainti("lontoo|pariisi", 2), "lontoo", Kulkutapa.Maa) ?? -1);
        }

        [Testi] static void TilarivinTekstiJaTavat()
        {
            var m = UusiPariisissa();
            Oleta.Sama("300 puntaa · päivä 1 · aamu · Pariisi", PeliApu.TilaTeksti(m.Verkko, m.Tila));
            Oleta.Sama("Lontoo–Pariisi", PeliApu.SijaintiNimi(m.Verkko, Sijainti.ReitillaSijainti("lontoo|pariisi", 1)));
            Oleta.Sama(Kulkutapa.Bussi, PeliApu.TapaTekstista("bussi"));
            Oleta.Sama(Kulkutapa.Maa, PeliApu.TapaTekstista("Liftaus"));
            Oleta.Sama(Kulkutapa.Meri, PeliApu.TapaTekstista("laiva"));
            Oleta.Sama(Kulkutapa.Lento, PeliApu.TapaTekstista("lento"));
            Oleta.Sama(null, PeliApu.TapaTekstista("juna"));
        }

        [Testi] static void TilaJsonOnJasennettavissa()
        {
            var m = UusiPariisissa();
            var t = PeliApu.Matkusta(m, "lontoo", Kulkutapa.Bussi);
            var json = PeliApu.TilaJson(m, "Kartta", null, PeliApu.Vaihtoehdot(m, "pariisi"), "lontoo", false, "Bussimatka \"−50\"", null, t);
            var o = MiniJson.Objekti(MiniJson.Jasenna(json));
            Oleta.Sama("Kartta", MiniJson.Teksti(o, "silmukka"));
            Oleta.Sama("c:lontoo", MiniJson.Teksti(o, "sijainti"));
            Oleta.Sama(250.0, MiniJson.Luku(o, "raha"));
            Oleta.Sama("lontoo", MiniJson.Teksti(MiniJson.Objekti(MiniJson.Kentta(o, "viimeisin")), "saapui"));
            Oleta.Tosi(MiniJson.Taulukko(MiniJson.Kentta(o, "vaihtoehdot")).Count > 0, "vaihtoehdot");
            Oleta.Sama("Bussimatka \"−50\"", MiniJson.Teksti(o, "viesti"));
        }

        [Testi] static void HeitonJaSiirronValiinJaanytTallennusJatkuu()
        {
            var m = UusiPariisissa(99);
            Oleta.Tosi(m.Heita().Ok);
            Oleta.Sama(Vaihe.Siirto, m.Tila.Vaihe);
            var ladattu = Matka.Lataa(KultaisetApu.Verkko, m.Tallenna());
            Oleta.Sama(Vaihe.Siirto, ladattu.Tila.Vaihe);
            // Valittu tapa (bussi) ohitetaan: noppa on jo heitetty, joten liikutaan liftaten.
            var t = PeliApu.Matkusta(ladattu, "lontoo", Kulkutapa.Bussi);
            Oleta.Tosi(t.Ok, t.Virhe);
            Oleta.Sama(Kulkutapa.Maa, t.Tapa);
            Oleta.Sama(m.Tila.Noppa, t.Noppa);
            Oleta.Tosi(t.Liikkui, "liikkui");
        }

        [Testi] static void LaatoillaSilmukkaJaTallennus()
        {
            var maarat = Laattamaarat.Lue(File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "laatat.json")));
            // Välimuistimuoto säilyttää järjestyksen (järjestys on osa jakoa).
            var kopio = Laattamaarat.Lue(PeliApu.LaattamaaratJson(maarat));
            Oleta.Sama(string.Join(",", maarat.Maarat), string.Join(",", kopio.Maarat));
            var m = Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(4242), "Fogg", "pariisi", maarat);
            Oleta.Tosi(m.Laatat != null && m.Laatat.Laatat.Count > 0, "laatat jaettu");
            Oleta.Tosi(PeliApu.Vaihtoehdot(m, "lontoo").Count > 0, "vaihtoehdot");
            var t = PeliApu.Matkusta(m, "lontoo", Kulkutapa.Bussi);
            Oleta.Tosi(t.Ok, t.Virhe);
            Oleta.Sama("lontoo", t.Saapui);
            var ladattu = Matka.Lataa(KultaisetApu.Verkko, m.Tallenna(), maarat);
            Oleta.Sama(m.Laatat.Laatat.Count, ladattu.Laatat.Laatat.Count);
            Oleta.Sama(m.Tallenna(), ladattu.Tallenna());
        }

        [Testi] static void TallennusAtomisestiJaTakaisin()
        {
            var kansio = Path.Combine(Path.GetTempPath(), "peliapu-" + Guid.NewGuid().ToString("N"));
            try
            {
                var polku = Path.Combine(kansio, "tallennus.json");
                var m = UusiPariisissa(777);
                PeliApu.KirjoitaAtomisesti(polku, m.Tallenna());
                PeliApu.Matkusta(m, "lontoo", Kulkutapa.Maa);
                var teksti = m.Tallenna();
                PeliApu.KirjoitaAtomisesti(polku, teksti);
                Oleta.Sama(teksti, File.ReadAllText(polku));
                Oleta.Tosi(!File.Exists(polku + ".tmp"), "tmp jäi");
                var ladattu = Matka.Lataa(KultaisetApu.Verkko, File.ReadAllText(polku));
                Oleta.Sama(m.Tila.Pelaaja.Sijainti.Avain, ladattu.Tila.Pelaaja.Sijainti.Avain);
                Oleta.Sama(m.Tila.Vaihe, ladattu.Tila.Vaihe);
                Oleta.Sama(m.Satunnainen.Kutsuja, ladattu.Satunnainen.Kutsuja);
            }
            finally { if (Directory.Exists(kansio)) Directory.Delete(kansio, true); }
        }
    }
}
