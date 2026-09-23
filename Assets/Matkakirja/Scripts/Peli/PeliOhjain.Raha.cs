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
        int rahaNahty;
        string rahaSyy;

        /// <summary>Tallennuksen jälkeen: saldo muuttui → RahaMuuttui (muutos, syy, saldo).</summary>
        void IlmoitaRaha()
        {
            if (matka == null) return;
            int saldo = matka.Tila.Pelaaja.Raha;
            int muutos = saldo - rahaNahty;
            var syy = rahaSyy;
            rahaNahty = saldo;
            rahaSyy = null;
            if (muutos == 0) return;
            // Teon oma tapahtumarivi punnista (matkan hinta, pankin apu, löytöpalkkio) on tarkin syy.
            var rivi = tapahtumat.Concat(kysymysLisat).LastOrDefault(t => t != null && t.Contains("punta"));
            syy ??= rivi ?? RahaSyyt.Oletus;
            try { RahaMuuttui?.Invoke(muutos, syy, saldo); } catch (Exception e) { UnityEngine.Debug.LogException(e); }
        }
    }
}
