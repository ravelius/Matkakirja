// Matkamuistot (Peli/Matkamuistot.cs; elävän linnan voudin sinetti, Pelikoodari 29.9.2026): löytö kerran, pisteet,
// tallennus versiossa 8 ja vanha tallennus ilman kenttää, Laukun Matkamuistot-lista.
using System.Linq;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    static class MatkamuistoTestit
    {
        static Matka Uusi() => Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(5L), "Fogg", "pariisi", KultaisetApu.Laattamaarat);

        [Testi] static void LoytoKirjataanKerranJaAntaaPisteet()
        {
            var m = Uusi();
            var p = m.Tila.Pelaaja;
            int ennen = p.Xp;
            var eka = Matkamuistot.Loyda(p, m.Kokemus, "voudin-sinetti");
            Oleta.Tosi(eka != null, "ensimmäinen löytö");
            Oleta.Sama(ennen + Matkamuistot.EtsinnanPisteet, p.Xp);
            Oleta.Tosi(Matkamuistot.Loyda(p, m.Kokemus, "voudin-sinetti") == null, "toinen kutsu ei löydä");
            Oleta.Sama(ennen + Matkamuistot.EtsinnanPisteet, p.Xp);
            Oleta.Sama(1, p.Matkamuistot.Count);
        }

        [Testi] static void TuntematonEiMuutaMitaan()
        {
            var m = Uusi();
            int ennen = m.Tila.Pelaaja.Xp;
            Oleta.Tosi(Matkamuistot.Loyda(m.Tila.Pelaaja, m.Kokemus, "ei-ole") == null, "tuntematon");
            Oleta.Sama(ennen, m.Tila.Pelaaja.Xp);
            Oleta.Sama(0, m.Tila.Pelaaja.Matkamuistot.Count);
        }

        [Testi] static void TallennusSailyttaaJaVanhaIlmanKenttaa()
        {
            var m = Uusi();
            Oleta.Tosi(!m.Tallenna().Contains("\"matkamuistot\""), "tyhjää ei kirjoiteta");
            Matkamuistot.Loyda(m.Tila.Pelaaja, m.Kokemus, "voudin-sinetti");
            var json = m.Tallenna();
            Oleta.Tosi(json.Contains("\"matkamuistot\":[\"voudin-sinetti\"]"), "kirjoitettu");
            var l = Matka.Lataa(KultaisetApu.Verkko, json);
            Oleta.Tosi(Matkamuistot.Loydetty(l.Tila.Pelaaja, "voudin-sinetti"), "luettu takaisin");
            var vanha = Matka.Lataa(KultaisetApu.Verkko, json.Replace(",\"matkamuistot\":[\"voudin-sinetti\"]", "")
                .Replace("\"versio\":" + Pelitila.TallennusVersio, "\"versio\":7"));
            Oleta.Sama(0, vanha.Tila.Pelaaja.Matkamuistot.Count);
        }

        [Testi] static void LaukkuListaaLoydetyt()
        {
            var m = Uusi();
            Oleta.Sama(0, Laukku.Rakenna(m, null).Matkamuistot.Count);
            Matkamuistot.Loyda(m.Tila.Pelaaja, m.Kokemus, "voudin-sinetti");
            var d = Laukku.Rakenna(m, null);
            Oleta.Sama("Voudin sinetti", d.Matkamuistot.Single().Nimi);
            Oleta.Tosi(d.Matkamuistot.Single().KuvaUrl.EndsWith("voudin-sinetti.jpg"), "kuva");
        }
    }
}
