// PELIOHJAIN: SAAPUMISLUENTA KESKEN / PÄÄTTYI (löydös 162, omistaja 26.9.2026 klo 11.5x, sitova). Kartan
// saapumisanimaatio (Linssisepän ElavaKartta.Saavu) odottaa, kunnes saapumisluenta on päättynyt: luennan aikana
// kortti ja isot luentakuvat peittävät kartan. Tilakone on Saapumisluenta.cs:ssä (Peli-testit); tässä sen syötöt.
//
// Kesken on tosi saapumisesta (Perilla, ennen MatkaPerilla-tapahtumaa) siihen asti, kun luenta päättyy:
//   loppu          luento soi loppuun (PuheMuuttui → Loppui)
//   ohita          Ohita-nappi / kortin luentakuvien Ohita (OhitaLuento → VaiennaPaikanPuhe)
//   lähtö          heitto, siirto tai maailmahyppy vaiensi paikan puheen (VaiennaPaikanPuhe)
//   ääni pois      Kertoja-kytkin pois: luentaa ei soiteta lainkaan (SoitaLuento palauttaa virheen) tai kytkin
//                  käännettiin pois kesken luennan
//   ei luentaa     kaupungilla ei ole luentoa (tai sama merkintä luettiin juuri edellisellä saapumisella)
//   radio soi | ei soi | ei soinut | keskeytetty   luenta ei päässyt soimaan tai katosi (vahti Update-silmukassa)
//
// ÄÄNI POIS -HETKI (web-malli): web ui.js aloitaMerkinta (~13766) käynnistää luentatehtävän, joka kertojan ollessa
// pois vain vaientaa (stopDiaryVoice) — merkintä kirjoittuu pieneen korttiin ilman ääntä, eikä natiivissa tule isoja
// luentakuvia (Saapumisesitys.Alkoi vasta LuentoAlkoi-tapahtumasta). Kartta on siis näkyvissä, joten luenta päättyy
// HETI, kun se olisi alkanut (trailerin jälkeen SaavuLehteen), eikä odota kortin sulkemista.
using System;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        readonly Saapumisluenta saapumisluenta = new Saapumisluenta();
        bool saapumisluentaKytketty;

        /// <summary>
        /// Saapumisluenta on kesken: tosi saapumisesta (ennen MatkaPerilla-tapahtumaa) siihen asti, kun luenta on
        /// päättynyt millä tahansa tavalla (loppu, ohita, ääni pois, ei luentaa, lähtö). Tosi myös trailerin,
        /// ensisaapumisen lykkäyksen ja luennan alkuviiveen ajan.
        /// </summary>
        public bool SaapumisluentaKesken => saapumisluenta.Kesken;

        /// <summary>
        /// Saapumisluenta päättyi (kaupunki, syy: loppu | ohita | lähtö | ääni pois | ei luentaa | radio soi | ei soi |
        /// ei soinut | keskeytetty). Nousee TÄSMÄLLEEN KERRAN per kaupunkiin saapuminen, pääsäikeessä.
        /// </summary>
        public event Action<string, string> SaapumisluentaPaattyi;

        /// <summary>Testikomento 'saapumisluenta tila'.</summary>
        public string SaapumisluentaTila =>
            (saapumisluenta.Kesken ? "kesken " + saapumisluenta.Kaupunki + (saapumisluenta.Odotettu != null
                ? " (luento " + (saapumisluenta.Odotettu.Id ?? saapumisluenta.Odotettu.Kaupunki) + (soivaLuento == saapumisluenta.Odotettu ? " soi)" : " jonossa)")
                : Tila == SilmukanTila.Traileri ? " (traileri)" : LuentaLykatty(saapumisluenta.Kaupunki) ? " (lykätty)" : " (esivaihe)")
                : "ei kesken") + ", viimeisin " + (saapumisluenta.Viimeisin ?? "-");

        void KytkeSaapumisluenta()
        {
            if (saapumisluentaKytketty) return;
            saapumisluentaKytketty = true;
            saapumisluenta.Paattyi += (k, syy) =>
            {
                Debug.Log("MATKAKIRJA peli: saapumisluenta päättyi " + k + " (" + syy + ")");
                try { SaapumisluentaPaattyi?.Invoke(k, syy); } catch (Exception e) { Debug.LogException(e); }
            };
        }

        /// <summary>Perilla: kaupunkiin saapuminen alkaa (ennen MatkaPerilla-tapahtumaa, jotta kuuntelija näkee Kesken).</summary>
        void SaapumisluentaAlkaa(string kaupunki)
        {
            KytkeSaapumisluenta();
            if (kaupunki == null) return;
            saapumisluenta.Saapui(kaupunki);
            Debug.Log("MATKAKIRJA peli: saapumisluenta kesken " + kaupunki);
        }

        /// <summary>
        /// Soittaa saapumisen luennon (SaavuLehteen, AloitaLykattyLuenta) ja pitää saapumisluennan kesken sen loppuun;
        /// l == null tai soitto ei onnistu → päättyy heti. Palauttaa SoitaLuennan virheen tai null.
        /// </summary>
        string SoitaSaapumisluento(string kaupunki, Luento l, float viiveS, string syyIlman = "ei luentaa")
        {
            if (l == null) { saapumisluenta.Paata(kaupunki, syyIlman); return "luentoa ei ole"; }
            saapumisluenta.Jonossa(kaupunki, l);
            var virhe = SoitaLuento(l, viiveS);
            if (virhe != null) saapumisluenta.Paata(kaupunki, SyyVirheesta(virhe));
            return virhe;
        }

        static string SyyVirheesta(string virhe) => virhe == "luennat pois päältä" ? "ääni pois" : virhe;

        /// <summary>PuheMuuttui(false): soiva luento loppui; syy päätellään tilasta.</summary>
        void SaapumisluentoLoppui(Luento l)
        {
            string syy = LuentoOhitettu ? "ohita" : !Puhe.Paalla ? "ääni pois" : puhe != null && puhe.SoivaUrl != null ? "keskeytetty" : "loppu";
            saapumisluenta.Loppui(l, syy);
        }

        /// <summary>VaiennaPaikanPuhe: ohita tai paikasta lähtö päättää kesken olevan saapumisluennan.</summary>
        void SaapumisluentaVaiennettu(string syy) => saapumisluenta.Paata(null, syy);

        /// <summary>
        /// Update: luento jäi soimatta (lataus petti, toinen puhe korvasi, kertoja pois ennen alkua) tai esivaihe
        /// (traileri, lykkäys) katosi ilman luentaa (esim. uusi matka) → päättyy, ettei Kesken jää ikuiseksi.
        /// Perilla → SaavuLehteen kulkee synkronisesti, joten tila Matkalla näkyy vahdille vain ennen saapumista.
        /// </summary>
        void VahdiSaapumisluentaa()
        {
            if (!saapumisluenta.Kesken) return;
            bool esivaihe = Tila == SilmukanTila.Matkalla || Tila == SilmukanTila.Traileri || LuentaLykatty(saapumisluenta.Kaupunki);
            string syy = !Puhe.Paalla ? "ääni pois"
                : soivaLuento != null && soivaLuento == saapumisluenta.Odotettu ? "keskeytetty" : "ei soinut";
            saapumisluenta.Vahdi(esivaihe, puhe != null ? puhe.SoivaUrl : null, syy);
        }
    }
}
