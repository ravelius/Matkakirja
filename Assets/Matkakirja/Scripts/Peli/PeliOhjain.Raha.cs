// PELIOHJAIN: KUKKARON MUUTOKSET NÄKYVIIN (Pelikoodari ↔ Natiivi-UI, 23.9.2026).
//
// Web näyttää jokaisesta rahan muutoksesta kukkaroleiman (kind 'stamp', icon 'kukkaro':
// "+40 puntaa · Lehden minitehtävä ratkesi"). Natiivissa raha muuttuu pelilogiikan monessa
// kohdassa (matka, kysymys, kaupat, tapahtumat), ja jokainen teko päättyy tallennukseen. Siksi
// muutos tunnistetaan tallennuksessa saldon erotuksesta, ja syyn antaa teon tekijä (rahaSyy) tai
// teon tapahtumarivi, jossa mainitaan punnat ("Bussimatka −5 puntaa").
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Natiivi
{
    /// <summary>Kukkaroleiman alarivit webin sanoin (js/ui.js, fokustehtavat.js, game.js).</summary>
    public static class RahaSyyt
    {
        public const string Kulttuuri = "Tunsit paikallista kulttuuria";
        public const string Juliste = "Juliste laukkuun";
        public const string Pulla = "pulla Livialle";
        public const string PuolikasPulla = "puolikas pulla Livialle";
        public const string Vihje = "Vihje";
        public const string Puolitus = "50:50";
        public const string Kaveriapu = "Kysy kaverilta";
        public const string Sahkepalkkio = "Sähkepalkkio";
        public const string PalloLento = "Kuumailmapallolento";
        public const string PalloLentoPalautus = "Kuumailmapallolento peruttu";
        public const string Olavinlinna = "Olavinlinna-peli";
        public const string OlavinlinnaPalautus = "Olavinlinna-peli peruttu";
        public const string Oletus = "Matkakassa";

        /// <summary>
        /// Lehden minitehtävä (web "Lehden minitehtävä ratkesi"). Fokustehtävän leima on webissä
        /// "&lt;nimilaatta&gt; ratkesi" (AARTEEN AVAUS, JULISTE …): näkymä antaa nimilaatan LehtiTeko.Selitteessä;
        /// ilman sitä yleinen "Lehden tehtävä ratkesi".
        /// </summary>
        public static string Minitehtava(string aihe) =>
            aihe != null && aihe.StartsWith(Matkakirja.Natiivi.Fokusdata.Etuliite + ":") ? "Lehden tehtävä ratkesi" : "Lehden minitehtävä ratkesi";
    }

    public sealed partial class PeliOhjain
    {
        /// <summary>
        /// Kuumailmapallolennon maksu (KauppaVakiot.PalloLentoHinta, kukkaroleima RahaSyyt.PalloLento).
        /// Rahat eivät riitä → tilarivin ilmoitus (sama kuin muissa kaupoissa) ja false: pallo ei avaudu.
        /// </summary>
        public bool MaksaPalloLento()
        {
            var r = KauppaTeko(k => k.PalloLento(), RahaSyyt.PalloLento);
            if (!r.Ok) Viesti(r.Virhe);
            return r.Ok;
        }

        /// <summary>Maksu takaisin, kun pallo ei auennut maksun jälkeen.</summary>
        public void PalautaPalloLento() => KauppaTeko(k => k.PalloLentoPalautus(), RahaSyyt.PalloLentoPalautus);

        /// <summary>
        /// Olavinlinna-pelin maksu (Kaupat.OlavinlinnanHinta: "Pelaa" £20, alusta = "Aloita alusta" £10; "Jatka" ei kutsu tätä).
        /// Rahat eivät riitä → tilarivin ilmoitus ja false: peli ei aukea. Kukkaroleima RahaSyyt.Olavinlinna.
        /// </summary>
        public bool MaksaOlavinlinna(bool alusta)
        {
            var r = KauppaTeko(k => k.Olavinlinna(alusta), RahaSyyt.Olavinlinna);
            if (!r.Ok) Viesti(r.Virhe);
            return r.Ok;
        }

        /// <summary>Maksu takaisin, kun peli ei auennut maksun jälkeen.</summary>
        public void PalautaOlavinlinna(bool alusta) => KauppaTeko(k => k.OlavinlinnaPalautus(alusta), RahaSyyt.OlavinlinnaPalautus);

        int rahaNahty;
        string rahaSyy;

        /// <summary>Tilarivin viesti ilman punta-rivejä: rahan muutos näkyy vain kukkaroleimassa (ei tuplaa, 11.10.2026).</summary>
        string TilariviIlmanRahaa(IEnumerable<string> rivit) => Matkakirja.Peli.Kulukertyma.IlmanRaharivia(rivit, streakRivi);

        /// <summary>Reitillä kertynyt matkakulu odottaa kaupunkia (yläpalkki pitää summan; Kartalle purkaa).</summary>
        public bool MatkakuluOdottaa => !kulut.Tyhja;

        /// <summary>Tallennuksen jälkeen: saldo muuttui → RahaMuuttui (muutos, syy, saldo).</summary>
        void IlmoitaRaha()
        {
            if (matka == null) return;
            int saldo = matka.Tila.Pelaaja.Raha;
            // Pelistreakin palkkio näkyy omana kuplanaan (Pelistreak), ei kukkaroleimana (web: ei stamp-leimaa).
            int muutos = saldo - rahaNahty - streakPalkkio;
            var syy = rahaSyy;
            rahaNahty = saldo;
            rahaSyy = null;
            streakPalkkio = 0;
            /*
             * MONEN PÄIVÄN MATKA YHTENÄ PÄIVITYKSENÄ (omistaja 11.10.2026, juna 182): reitillä (ei kaupungissa)
             * päiväkulut kertyvät eivätkä nouse leimaksi; kaupungissa kertymä lisätään tähän muutokseen ja syyksi
             * tulee yhteenveto (Kulukertyma.Syy). Yläpalkki pitää summan samalla odottamassa (UiNakymat RahaLykkays).
             */
            bool reitilla = !matka.Tila.Pelaaja.Sijainti.Kaupungissa;
            // Yksi leima koko tallennukselle (omistaja 11.10.2026): teon syy, lippurivit (matkan hinta, löytöpalkkio)
            // ja päiväkulu yhteen; ennen lippu voitti ja päiväkulu jäi näkymättä (Peli/Kukkaro.cs Yhdista).
            var rivit = tapahtumat.Concat(kysymysLisat).Where(t => Matkakirja.Peli.Kulukertyma.OnRaharivi(t, streakRivi)).ToList();
            if (reitilla && muutos < 0 && paivakuluSyy != null && syy == null)
            {
                kulut.Kerry(muutos);
                foreach (var r in rivit) kulut.Rivi(r);
                paivakuluSyy = null;
                return;
            }
            string kuluSyy = null;
            if (!reitilla && !kulut.Tyhja)
            {
                muutos += kulut.Muutos;
                kuluSyy = kulut.Syy();
                rivit = kulut.Rivit.Concat(rivit).ToList();
                kulut.Tyhjenna();
            }
            else if (!reitilla) kulut.Tyhjenna();
            if (muutos == 0) { paivakuluSyy = null; return; }
            syy = Matkakirja.Peli.Kulukertyma.Yhdista(syy, rivit, kuluSyy ?? paivakuluSyy) ?? RahaSyyt.Oletus;
            paivakuluSyy = null;
            try { RahaMuuttui?.Invoke(muutos, syy, saldo); } catch (Exception e) { UnityEngine.Debug.LogException(e); }
        }
    }
}
