// RAHAPULA (Natiivi-UI; omistaja 11.10.2026 Päätoimittajan kautta, juna 182): kun pelaaja on oikeassa paikassa (pallon maassa,
// Olavinlinnan nostossa, Tromssassa raketilla) mutta rahat eivät riitä, tilarivin tilalle tulee ilmoitus ja OK-nappi:
// "Rahat eivät riitä" / "Kuumailmapallo maksaa £200, sinulla on £120." Olemassa oleva vahvistusdialogi yhdellä napilla
// (Vahvistus.Ilmoita). Yksi yhteinen funktio kaikille maksullisille kohteille: kutsu ENNEN maksua (Maksa* jää varaksi).
using Matkakirja.Peli;

namespace Matkakirja.Natiivi
{
    public static class Rahapula
    {
        /// <summary>
        /// true = rahat riittävät (jatka maksuun); false = ilmoitus näytetty, älä avaa. kohde = näyttönimi lauseen alkuun
        /// ("Kuumailmapallo", "Olavinlinna-peli", "Raketti ISS:lle"), hinta puntina.
        /// </summary>
        public static bool Tarkista(string kohde, int hinta)
        {
            var p = PeliOhjain.Instanssi?.Matka?.Tila?.Pelaaja;
            if (p == null || p.Raha >= hinta) return true;
            UnityEngine.Debug.Log($"MATKAKIRJA rahapula: {kohde} {hinta}, rahaa {p.Raha}");
            if (UiNakymat.Olemassa)
                UiNakymat.Hae().Vahvistus.Ilmoita(Kieli.T("ui.rahapula.otsikko"),
                    Kieli.T("ui.rahapula.teksti", kohde, PeliApu.Valuutta + hinta, PeliApu.Valuutta + p.Raha), Kieli.T("ui.rahapula.ok"));
            return false;
        }
    }
}
