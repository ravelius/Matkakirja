// Pallovalitsin (omistaja 3.10.2026, vain natiivi): pyöritettävä sijaintipallo kohdeselaimena — keskimmäinen kohde,
// inertia ja valintaviive (pysähtynyt JA sormi irti 0,5 s; uusi tartunta nollaa viiveen).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Astronautti;

namespace Matkakirja.Linssit.Testit
{
    public static class PallovalitsinTestit
    {
        static Havaintokohde K(string t, double lat, double lon, int kuvia = 1)
        {
            var k = new Havaintokohde { Tunnus = t, Nimi = t, Lat = lat, Lon = lon };
            for (int i = 0; i < kuvia; i++) k.Havainnot.Add(new Havainto { Id = t + i, Kuva = t + i + ".jpg" });
            return k;
        }

        [Testi] static void KeskimmainenOnLahinKatseenKeskipistetta()
        {
            var l = new List<Havaintokohde> { K("helsinki", 60.2, 24.9), K("rooma", 41.9, 12.5), K("kairo", 30.0, 31.2) };
            Oleta.Sama(1, Pallovalitsin.Keskimmainen(l, 43, 13), "Rooma lähin");
            Oleta.Sama(0, Pallovalitsin.Keskimmainen(l, 58, 22), "Helsinki lähin");
            Oleta.Sama(2, Pallovalitsin.Keskimmainen(l, 28, 33), "Kairo lähin");
        }

        [Testi] static void KeskimmainenVainEtupuoleltaJaKuvallisista()
        {
            var l = new List<Havaintokohde> { K("takana", 0, 180), K("ilman-kuvaa", 0, 1, 0), K("nan", double.NaN, 0) };
            Oleta.Sama(-1, Pallovalitsin.Keskimmainen(l, 0, 0), "takapuoli, kuvaton ja paikaton ohitetaan");
            l.Add(K("reuna", 0, 85));
            Oleta.Sama(3, Pallovalitsin.Keskimmainen(l, 0, 0), "etupuolen reunakin kelpaa");
            Oleta.Sama(-1, Pallovalitsin.Keskimmainen(null, 0, 0));
        }

        [Testi] static void KeskimmainenYliPaivamaararajan()
        {
            var l = new List<Havaintokohde> { K("fidzi", -17.7, 178.1), K("samoa", -13.8, -172.1), K("sydney", -33.9, 151.2) };
            Oleta.Sama(0, Pallovalitsin.Keskimmainen(l, -17, -179), "±180° ei katkaise etäisyyttä");
        }

        [Testi] static void VetoSiirtaaKatsettaJaRajaaNavat()
        {
            var v = new Pallovalitsin();
            v.Aseta(10, 170);
            v.Tartu(0);
            v.Veto(0, 20, 0.05);
            Oleta.Tosi(Math.Abs(v.Lon - (-170)) < 1e-9, "pituus kiertyy ±180°: " + v.Lon);
            v.Veto(200, 0, 0.1);
            Oleta.Sama(Pallovalitsin.MaxLat, v.Lat, "pohjoinen pysyy ylhäällä");
            Oleta.Sama(0.0, v.VLat, "navan rajalla ei pystyvauhtia");
        }

        [Testi] static void InertiaHidastuuJaPysahtyy()
        {
            var v = new Pallovalitsin();
            v.Aseta(0, 0);
            v.Tartu(0);
            v.Veto(0, 6, 0.02);
            v.Veto(0, 6, 0.04);
            double vauhti = v.Vauhti;
            Oleta.Tosi(vauhti > 200, "vauhti vedosta: " + vauhti);
            v.Irti(0.05);
            Oleta.Tosi(!v.Pysahtynyt, "jatkaa vauhdilla");
            double lon0 = v.Lon, t = 0.05;
            v.Askel(t += 1 / 60.0);
            Oleta.Tosi(v.Lon > lon0, "liukuu vedon suuntaan");
            Oleta.Tosi(v.Vauhti < vauhti, "hidastuu");
            Oleta.Tosi(!v.ValintaValmis(t), "ei valintaa liikkeessä");
            int askelia = 0;
            while (!v.Pysahtynyt && askelia++ < 600) v.Askel(t += 1 / 60.0);
            Oleta.Tosi(v.Pysahtynyt, "pysähtyy");
            Oleta.Tosi(t < 3, "pysähtyy alle 3 s:ssa: " + t);
            Oleta.Tosi(v.Lon - lon0 < Pallovalitsin.MaxVauhti * Pallovalitsin.HidastusS, "liuku rajattu: " + (v.Lon - lon0));
            Oleta.Tosi(!v.ValintaValmis(t + 0.4), "viive kesken");
            Oleta.Tosi(v.ValintaValmis(t + Pallovalitsin.ValintaViiveS), "valinta 0,5 s pysähdyksestä");
        }

        [Testi] static void SormiPaikallaanEnnenIrrotustaEiJataVauhtia()
        {
            var v = new Pallovalitsin();
            v.Aseta(0, 0);
            v.Tartu(0);
            v.Veto(0, 6, 0.02);
            v.Irti(0.5);
            Oleta.Tosi(v.Pysahtynyt, "vanhentunut veto");
            Oleta.Tosi(!v.ValintaValmis(0.9), "viive kesken");
            Oleta.Tosi(v.ValintaValmis(1.0), "valinta 0,5 s irrotuksesta");
        }

        [Testi] static void SormiKiinniEiValitseJaUusiTartuntaNollaaViiveen()
        {
            var v = new Pallovalitsin();
            v.Aseta(0, 0);
            v.Tartu(0);
            Oleta.Tosi(!v.ValintaValmis(5), "sormi kiinni: ei valintaa");
            v.Irti(5);
            Oleta.Tosi(!v.ValintaValmis(5.4), "viive kesken");
            v.Tartu(5.4);
            v.Irti(5.6);
            Oleta.Tosi(!v.ValintaValmis(6.0), "uusi tartunta nollasi viiveen");
            Oleta.Tosi(v.ValintaValmis(6.1));
            Oleta.Sama(0.0, v.Jaljella(6.1));
            v.Paata();
            Oleta.Tosi(!v.ValintaValmis(7), "valinta kerran");
            Oleta.Tosi(!v.Kaynnissa);
        }

        [Testi] static void TestikomennonVetoKestollaJaVauhdinKatto()
        {
            var v = new Pallovalitsin();
            v.Aseta(0, 0);
            v.Tartu(0);
            v.Veto(0, 90, 10, kestoS: 0.01);
            Oleta.Tosi(Math.Abs(v.Vauhti - Pallovalitsin.MaxVauhti) < 1e-6, "katto: " + v.Vauhti);
            v.Irti(20, pidaVauhti: true);
            Oleta.Tosi(!v.Pysahtynyt, "testikomento säilyttää vauhdin");
            var w = new Pallovalitsin();
            w.Aseta(0, 0);
            w.Tartu(0);
            w.Veto(0, 10, 0.02);
            w.Irti(0.03, inertia: false);
            Oleta.Tosi(w.Pysahtynyt, "pieni liike: ei inertiaa");
        }
    }
}
