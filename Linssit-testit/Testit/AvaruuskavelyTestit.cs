// Avaruuskävely: kyydin Ulkona-tila, vaiheiden tilakone, auringonnousun haku ISS:ltä ja vertailukuvan valinta.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class AvaruuskavelyTestit
    {
        static readonly IssHetki Iss = new IssHetki(new LatLon(50, 10), 420_000, 60);

        [Testi] static void UlkonaKatsooRadanSivulleLaatatPiirtyvat()
        {
            var k = IssKuvakulma.Ulkona(Iss);
            // 30° alas 420 km:stä: kohteen zeniittikulma asin(6791/6371 · sin 60°) = 67,4° (laite 29.9. kavely2: laatat piirtyvät
            // kentällä 70°; pitkällä objektiivilla yli ~55° ei piirtynyt). 45°: 48,9°.
            Oleta.Tosi(Math.Abs(IssKuvakulma.UlkonaKatseAlas - 30) < 1e-9, "oletus 30°");
            Oleta.Tosi(Math.Abs(k.Kallistus - 67.4) < 0.2, "kallistus noin 67°: " + k);
            Oleta.Tosi(Math.Abs(IssKuvakulma.Ikkuna(Iss, 45).Kallistus - 48.9) < 0.2, "45°: 48,9°");
            double suunta = IssKuvakulma.Suunta(Iss.Paikka.Lat, Iss.Paikka.Lon, k.Lat, k.Lon);
            Oleta.Tosi(Math.Abs(((suunta - (Iss.Suuntima + 90)) % 360 + 540) % 360 - 180) < 0.01, $"radan oikealle puolelle: {suunta:0.00}°");
            // Sama kaava kuin ikkunassa: silmä ISS:ssä (etäisyys ja keskuskulma kolmiosta).
            var ikkuna = IssKuvakulma.Ikkuna(new IssHetki(Iss.Paikka, Iss.KorkeusM, Iss.Suuntima + 90), IssKuvakulma.UlkonaKatseAlas);
            Oleta.Tosi(Math.Abs(ikkuna.EtaisyysM - k.EtaisyysM) < 1 && Math.Abs(ikkuna.Kallistus - k.Kallistus) < 1e-9, "Ikkunan kaava");
        }

        [Testi] static void KyytiUlosJaSisaan()
        {
            var kyyti = new IssKyyti();
            var alku = IssKuvakulma.Kauko(50, 10, 8_000_000, 0, 0);
            kyyti.Ulos(alku, 45, 0, false);
            Oleta.Sama(KyydinTila.Kauko, kyyti.Tila, "kaukonäkymästä ei ulos");
            kyyti.Napauta(alku, Iss, 45, 0, true);
            kyyti.Paivita(0, Iss, 45, out var seuranta, out _, out _);
            Oleta.Sama(KyydinTila.Seuranta, kyyti.Tila);
            kyyti.Ulos(seuranta, 45, 1, false);
            Oleta.Sama(KyydinTila.Ulkona, kyyti.Tila);
            kyyti.Paivita(3, Iss, 45, out var kesken, out double kk, out _);
            Oleta.Tosi(kyyti.Siirtyy && kk > 45 && kk < IssKuvakulma.UlkonaKentta, $"siirtymä kesken 2 s / 4 s: kenttä {kk:0.0}");
            kyyti.Paivita(1 + IssKyyti.UlosS, Iss, 45, out var ulkona, out double kentta, out _);
            Oleta.Tosi(!kyyti.Siirtyy, "perillä 4 s:ssa");
            var odotettu = IssKuvakulma.Ulkona(Iss);
            Oleta.Tosi(Math.Abs(ulkona.Kallistus - odotettu.Kallistus) < 1e-9 && Math.Abs(kentta - IssKuvakulma.UlkonaKentta) < 1e-9, "Ulkona-asento");
            kyyti.Napauta(ulkona, Iss, kentta, 6, false);
            Oleta.Sama(KyydinTila.Ulkona, kyyti.Tila, "napautus ei vie ulkoa (tilakone ohjaa)");
            kyyti.Sisaan(ulkona, kentta, 6, false);
            Oleta.Sama(KyydinTila.Seuranta, kyyti.Tila, "sisään seurantaan");
            kyyti.Paivita(6 + IssKyyti.SisaanS, Iss, 45, out var sisalla, out _, out _);
            Oleta.Tosi(Math.Abs(sisalla.Kallistus - IssKuvakulma.SeurannanKallistus) < 1e-9, "seurannan asento");
        }

        [Testi] static void TilakoneKulkeeVaiheetJarjestyksessa()
        {
            var a = new Avaruuskavely();
            var vaiheet = new List<KavelynVaihe>();
            a.Vaihtui += v => vaiheet.Add(v);
            var simu = new DateTime(2026, 9, 29, 12, 0, 0, DateTimeKind.Utc);
            a.Aloita(0);
            Oleta.Sama(KavelynVaihe.Ilmalukko, a.Vaihe);
            Oleta.Tosi(a.Ohje != null, "ilmalukossa ohje");
            a.Paivita(30, simu);
            Oleta.Sama(KavelynVaihe.Ilmalukko, a.Vaihe, "ilmalukko odottaa napautusta");
            a.Napauta(30);
            Oleta.Sama(KavelynVaihe.Ulos, a.Vaihe);
            Oleta.Sama("luukku", a.Repliikki?.Tunnus, "luukun repliikki ulos lähtiessä");
            a.Napauta(31);
            Oleta.Sama(KavelynVaihe.Ulos, a.Vaihe, "siirtymää ei ohiteta");
            a.Paivita(30 + Avaruuskavely.UlosS, simu);
            Oleta.Sama(KavelynVaihe.Koysi, a.Vaihe);
            a.Napauta(40);
            Oleta.Sama(KavelynVaihe.Auringonnousu, a.Vaihe);
            var nousu = simu.AddMinutes(20);
            a.AsetaNousu(nousu);
            a.Napauta(41);
            a.Paivita(41, nousu.AddSeconds(-Avaruuskavely.EnnenS));
            Oleta.Sama(KavelynVaihe.Auringonnousu, a.Vaihe, "kelaus perillä, nousua odotetaan");
            a.Paivita(48, nousu.AddSeconds(Avaruuskavely.JalkeenS));
            Oleta.Sama(KavelynVaihe.Pulu, a.Vaihe);
            Oleta.Tosi(a.NousuHetki == null, "nousu unohtuu vaiheen jälkeen");
            Oleta.Sama("nousu", a.Repliikki?.Tunnus);
            a.Paivita(48 + Avaruuskavely.PuluS, simu);
            Oleta.Sama(KavelynVaihe.Kuva, a.Vaihe);
            Oleta.Sama("kuva", a.Repliikki?.Tunnus);
            a.Napauta(60);
            Oleta.Sama(KavelynVaihe.Vertailu, a.Vaihe);
            a.Napauta(70);
            Oleta.Sama(KavelynVaihe.Takaisin, a.Vaihe);
            a.Paivita(70 + Avaruuskavely.TakaisinS, simu);
            Oleta.Sama(KavelynVaihe.Ei, a.Vaihe);
            Oleta.Tosi(!a.Kaynnissa);
            Oleta.Sama("Ilmalukko Ulos Koysi Auringonnousu Pulu Kuva Vertailu Takaisin Ei", string.Join(" ", vaiheet));
        }

        [Testi] static void PuluNopeutuuNapautuksellaJaNousunVara()
        {
            var a = new Avaruuskavely();
            var simu = new DateTime(2026, 9, 29, 12, 0, 0, DateTimeKind.Utc);
            a.Aloita(0); a.Napauta(0); a.Paivita(Avaruuskavely.UlosS, simu); a.Napauta(5);
            // Ei nousua (esim. rata koko ajan auringossa): vaihe päättyy NousuVaraS:n jälkeen.
            a.Paivita(5 + Avaruuskavely.NousuVaraS - 0.1, simu);
            Oleta.Sama(KavelynVaihe.Auringonnousu, a.Vaihe);
            a.Paivita(5 + Avaruuskavely.NousuVaraS, simu);
            Oleta.Sama(KavelynVaihe.Pulu, a.Vaihe);
            a.Napauta(8);
            Oleta.Sama(KavelynVaihe.Kuva, a.Vaihe, "napautus nopeuttaa Pulun");
            a.Lopeta(9);
            Oleta.Sama(KavelynVaihe.Ei, a.Vaihe, "keskeytys suoraan pois");
            a.Napauta(10);
            Oleta.Sama(KavelynVaihe.Ei, a.Vaihe, "napautus ei aloita");
        }

        /// <summary>Päiväntasaajan rata ilman maan pyörimistä: alapiste kiertää itään kierroksessa, korkeus 420 km.</summary>
        static LatLon Tasaaja(DateTime t, DateTime t0) =>
            new LatLon(0, ((t - t0).TotalSeconds / IssNyt.KierrosS * 360 + 540) % 360 - 180);

        [Testi] static void NousuOnVarjonReunalla()
        {
            var t0 = new DateTime(2026, 9, 22, 12, 0, 0, DateTimeKind.Utc);
            var n = Avaruuskavely.SeuraavaNousu(t => Tasaaja(t, t0), _ => 420, t0);
            Oleta.Tosi(n.HasValue, "nousu löytyy");
            double s = (n.Value - t0).TotalSeconds;
            Oleta.Tosi(s > 0 && s <= IssNyt.KierrosS, $"yhden kierroksen sisällä: {s:0} s");
            Oleta.Tosi(Avaruuskavely.Valoisuus(n.Value, Tasaaja(n.Value, t0), 420) > 0, "nousun jälkeen valossa");
            var ennen = n.Value.AddSeconds(-Avaruuskavely.NousuTarkkuusS);
            Oleta.Tosi(Avaruuskavely.Valoisuus(ennen, Tasaaja(ennen, t0), 420) <= 0, "puoli sekuntia ennen varjossa");
            // Aurinko on nousuhetkellä 90° + dip (dip = acos(6371 / 6791) = 20,3°) alapisteestä.
            Aurinko.Alihajapiste(Aika.Jd(n.Value), out double alat, out double alon);
            var p = Tasaaja(n.Value, t0);
            double kulma = IssKuvakulma.Kaari(p.Lat, p.Lon, alat, alon);
            Oleta.Tosi(Math.Abs(kulma - 110.3) < 0.1, $"aurinko {kulma:0.00}° alapisteestä");
            // Valossa aloitettu haku löytää seuraavan nousun, ei nykyistä valoa.
            var valossa = n.Value.AddMinutes(5);
            var seuraava = Avaruuskavely.SeuraavaNousu(t => Tasaaja(t, t0), _ => 420, valossa);
            // Alapiste kiertää itään maan suhteen ja alihajapiste länteen 360° vuorokaudessa: jakso 1 / (1/5574 + 1/86400) = 5 236 s.
            double ero = (seuraava.Value - n.Value).TotalSeconds, jakso = 1 / (1 / IssNyt.KierrosS + 1 / 86400.0);
            Oleta.Tosi(Math.Abs(ero - jakso) < 5, $"seuraava kierroksen päästä: {ero:0} s (odotus {jakso:0} s)");
        }

        [Testi] static void NousuTodellisellaRadalla()
        {
            var alku = new DateTime(2026, 9, 29, 6, 0, 0, DateTimeKind.Utc);
            var n = Avaruuskavely.SeuraavaNousu(alku);
            Oleta.Tosi(n.HasValue && (n.Value - alku).TotalSeconds <= 2 * IssNyt.KierrosS, $"nousu: {n}");
            var k = Avaruuskavely.KelausHetki(n.Value, alku);
            Oleta.Tosi(k.HasValue && Math.Abs((n.Value - k.Value).TotalSeconds - Avaruuskavely.EnnenS) < 1e-6, "kelaus 4 s ennen nousua");
            Oleta.Tosi(Avaruuskavely.KelausHetki(n.Value, n.Value.AddSeconds(-2)) == null, "nousu 2 s päässä: ei kelausta");
        }

        [Testi] static void VertailukuvaLahimmastaKohteesta()
        {
            var kohteet = new List<Havaintokohde>
            {
                new Havaintokohde { Tunnus = "etna", Lat = 37.75, Lon = 14.99 },
                new Havaintokohde { Tunnus = "alpit", Lat = 46.5, Lon = 9.8 },
                new Havaintokohde { Tunnus = "tuntematon", Lat = double.NaN, Lon = 0 },
            };
            var l = Avaruuskavely.LahinKohde(kohteet, 48, 11);
            Oleta.Sama("alpit", l?.Kohde.Tunnus);
            Oleta.Tosi(l.Value.Km > 150 && l.Value.Km < 250, $"{l.Value.Km:0} km");
            Oleta.Tosi(Avaruuskavely.LahinKohde(null, 0, 0) == null, "ei kohteita");
        }

        [Testi] static void KohtiAurinkoaJaSuunnanOhitus()
        {
            var k = IssKuvakulma.Ulkona(Iss, 200);
            double suunta = IssKuvakulma.Suunta(Iss.Paikka.Lat, Iss.Paikka.Lon, k.Lat, k.Lon);
            Oleta.Tosi(Math.Abs(suunta - 200) < 0.01, $"annettu suunta: {suunta:0.00}");
            // Auringon suunta alapisteestä osoittaa alihajapisteeseen.
            var t = new DateTime(2026, 9, 29, 6, 0, 0, DateTimeKind.Utc);
            var p = IssNyt.Paikka(t);
            Aurinko.Alihajapiste(Aika.Jd(t), out double alat, out double alon);
            Oleta.Tosi(Math.Abs(Avaruuskavely.AuringonSuunta(t) - IssKuvakulma.Suunta(p.Lat, p.Lon, alat, alon)) < 1e-9, "auringon suunta");
        }

        [Testi] static void ReunavaloVoimakasVainNousussa()
        {
            var alku = new DateTime(2026, 9, 29, 6, 0, 0, DateTimeKind.Utc);
            var n = Avaruuskavely.SeuraavaNousu(alku).Value;
            Oleta.Tosi(Avaruuskavely.ReunaValo(n.AddSeconds(-30)) < 0.01, "varjossa ei reunavaloa");
            double nousussa = Avaruuskavely.ReunaValo(n.AddSeconds(10));
            Oleta.Tosi(nousussa > 0.8, $"nousun jälkeen voimakas: {nousussa:0.00}");
            double myohemmin = Avaruuskavely.ReunaValo(n.AddMinutes(10));
            Oleta.Tosi(Math.Abs(myohemmin - Avaruuskavely.ReunaPohja) < 0.01, $"päivällä pohja: {myohemmin:0.00}");
        }

        [Testi] static void RepliikitIlmanTageja()
        {
            Oleta.Sama("Luukku on auki! Kiinnitä köysi kaiteeseen ennen kuin päästät irti – täällä ei ole alas, on vain ympäri.",
                Avaruuskavely.Luukku.Teksti);
            Oleta.Tosi(Avaruuskavely.Kuva.Teksti.StartsWith("Hymyile"), Avaruuskavely.Kuva.Teksti);
            Oleta.Tosi(!Avaruuskavely.Nousu.Teksti.Contains("["), "ei tageja");
        }
    }
}
