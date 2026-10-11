// PELIOHJAIN: KUKKARON MUUTOKSET NÄKYVIIN (Pelikoodari ↔ Natiivi-UI, 23.9.2026).
//
// Web näyttää jokaisesta rahan muutoksesta kukkaroleiman (kind 'stamp', icon 'kukkaro':
// "+40 puntaa · Lehden minitehtävä ratkesi"). Natiivissa raha muuttuu pelilogiikan monessa
// kohdassa (matka, kysymys, kaupat, tapahtumat), ja jokainen teko päättyy tallennukseen. Siksi
// muutos tunnistetaan tallennuksessa saldon erotuksesta, ja syyn antaa teon tekijä (rahaSyy) tai
// teon tapahtumarivi, jossa mainitaan punnat ("Bussimatka −5 puntaa").
using System;
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
            if (muutos == 0) { paivakuluSyy = null; return; }
            // Teon oma tapahtumarivi punnista (matkan hinta, löytöpalkkio) on tarkin syy (ei putken lokiriviä).
            var rivi = tapahtumat.Concat(kysymysLisat).LastOrDefault(t => t != null && t.Contains("£") && t != streakRivi);
            // Päiväkulu (talouden vaihe 1): teon oma raharivi on tarkempi, jos sama teko maksoi muutakin.
            syy ??= rivi ?? paivakuluSyy ?? RahaSyyt.Oletus;
            paivakuluSyy = null;
            try { RahaMuuttui?.Invoke(muutos, syy, saldo); } catch (Exception e) { UnityEngine.Debug.LogException(e); }
        }
    }
}
