// SAAPUMISLUENTA KESKEN (löydös 162, omistaja 26.9.2026 klo 11.5x, sitova): kartan saapumisanimaatio
// (Linssisepän ElavaKartta, profiili Saapuminen) näytetään vasta saapumisluennan jälkeen — luennan aikana
// matkakirjakortti ja isot luentakuvat peittävät kartan, eikä pelaaja näe animaatiota.
//
// Tilakone kerran-per-saapuminen (Pelikoodari). Ei UnityEngineä: käännetään myös Peli-testeissä.
// PeliOhjain syöttää tapahtumat (PeliOhjain.Saapumisluenta.cs), Linssiseppä kuuntelee Kesken-tilaa
// (PeliOhjain.SaapumisluentaKesken) tai Paattyi-tapahtumaa (PeliOhjain.SaapumisluentaPaattyi).
//
//   Saapui(k)           Perilla, ENNEN MatkaPerilla-tapahtumaa: Kesken = true heti saapumisesta (myös trailerin,
//                       ensisaapumisen lykkäyksen ja luennan 0,6 s:n viiveen ajan — ei aukkoa ennen Puhe.Soi-tilaa)
//   Jonossa(k, luento)  luento pyydettiin soimaan (SaavuLehteen, AloitaLykattyLuenta): odotetaan sen loppua
//   Loppui(luento, syy) juuri tämä luento lakkasi soimasta (loppu, ohita, ääni pois, korvattu)
//   Paata(k, syy)       luentaa ei tule tai se keskeytyi (ei luentaa, ääni pois, radio soi, ohita, lähtö …)
//   Vahdi(...)          joka ruutu: jäikö luenta soimatta (lataus petti, toinen puhe korvasi) tai katosiko
//                       esivaihe (traileri/lykkäys) ilman luentaa — silloin päättyy, ettei Kesken jää ikuiseksi
//
// Paattyi nousee TÄSMÄLLEEN KERRAN per saapuminen: Paata/Loppui/Vahdi ovat tyhjiä, kun mitään ei ole kesken,
// ja uusi saapuminen päättää edellisen keskeneräisen (syy "keskeytetty") ennen omaa alkuaan.
using System;

namespace Matkakirja.Natiivi
{
    public sealed class Saapumisluenta
    {
        /// <summary>Saapumisen kaupunki, kun luenta on kesken; muuten null.</summary>
        public string Kaupunki { get; private set; }
        /// <summary>Saapumisesta luennan loppuun (millä tahansa tavalla) tosi.</summary>
        public bool Kesken => Kaupunki != null;
        /// <summary>Luento, jonka loppua odotetaan; null = esivaihe (traileri, lykkäys) tai ei kesken.</summary>
        public Luento Odotettu { get; private set; }
        /// <summary>Päättyi (kaupunki, syy): kerran per saapuminen.</summary>
        public event Action<string, string> Paattyi;
        /// <summary>Viimeisin päättyminen testikomentoa varten ("kaupunki (syy)").</summary>
        public string Viimeisin { get; private set; }

        /// <summary>
        /// Pelaaja saapui kaupunkiin (null = reitin varrella: ei saapumista). Sama kaupunki esivaiheessa jatkaa samaa
        /// saapumista (aloituslennon välikortti nostaa tilan jo ennen Perillaa) eikä päätä sitä.
        /// </summary>
        public void Saapui(string kaupunki)
        {
            if (string.IsNullOrEmpty(kaupunki)) return;
            if (Kesken && kaupunki == Kaupunki && Odotettu == null) return;
            if (Kesken) Paata(Kaupunki, "keskeytetty");
            Kaupunki = kaupunki;
            Odotettu = null;
        }

        /// <summary>Kaupungin luento pyydettiin soimaan; Kesken pysyy, kunnes juuri se loppuu.</summary>
        public void Jonossa(string kaupunki, Luento luento)
        {
            if (!Kesken || kaupunki != Kaupunki || luento == null) return;
            Odotettu = luento;
        }

        /// <summary>Luento lakkasi soimasta. Vain odotettu luento päättää (muut puheet, esim. lento-alku, ohitetaan).</summary>
        public bool Loppui(Luento luento, string syy) =>
            Kesken && luento != null && ReferenceEquals(luento, Odotettu) && Paata(Kaupunki, syy);

        /// <summary>Päättää kaupungin saapumisluennan (null = mikä tahansa kesken oleva). true = päättyi nyt.</summary>
        public bool Paata(string kaupunki, string syy)
        {
            if (!Kesken || (kaupunki != null && kaupunki != Kaupunki)) return false;
            var k = Kaupunki;
            Kaupunki = null;
            Odotettu = null;
            Viimeisin = k + " (" + syy + ")";
            Paattyi?.Invoke(k, syy);
            return true;
        }

        /// <summary>
        /// Ruutuvahti. esivaihe = traileri tai lykkäys on yhä käynnissä (luento voi vielä tulla);
        /// puheenUrl = Puheen soiva tai ladattava osoite (null = hiljaa); syy = päättymisen syy, jos luento jäi soimatta.
        /// </summary>
        public bool Vahdi(bool esivaihe, string puheenUrl, string syy)
        {
            if (!Kesken) return false;
            if (Odotettu == null) return !esivaihe && Paata(Kaupunki, "keskeytetty");
            return puheenUrl != Odotettu.Url && Paata(Kaupunki, syy);
        }
    }
}
