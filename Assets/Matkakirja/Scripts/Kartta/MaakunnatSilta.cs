// Silta Natiivi-UI:n Maakunnat-välilehdeltä pallon maakuntaväritykseen (B17, Natiiviseppä).
// Maakunnat.Valittu(avain "ISO:tunnus") → KarttaKerrokset.maakunnat: täyttö ja rajat näkyviin ja
// valittu maakunta korostettuna (webin ui.karttatyokaluMaakunta-koukku).
// Oletusrajat (löydös 113): ilman valintaa kohdemaan rajat näkyvät ilman täyttöä (MaaKartta.oletusrajat);
// Maakunnat "Pois" (löydös 114) piilottaa ne (MaaKartta.OletusPois lukee Maakunnat.Poisin).
using Matkakirja.Linssit.Maat;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    static class MaakunnatSilta
    {
        static readonly Savy Valittu = new Savy(new Rgba(0.70f, 0.30f, 0.20f, 0.35f), new Rgba(0.45f, 0.16f, 0.10f, 0.95f));
        static readonly Savy Perus = new Savy(new Rgba(0, 0, 0, 0), new Rgba(0.23f, 0.18f, 0.13f, 0.55f));

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kytke()
        {
            Maakunnat.Valittu -= Valitse;
            Maakunnat.Valittu += Valitse;
            var mk = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.maakunnat : null;
            if (mk != null) mk.OletusPois = () => Maakunnat.Pois;
            // Elävä kartta (Natiivi-UI, build 19): maakunnan käsialanimi kartalle aluejaon keskipisteeseen
            // (MaaKartta.MaakunnanKeskus, Natiiviseppä); false → UI:n vara (karttavalojen mediaani).
            MaakuntaTiedot.Keskipiste = a =>
            {
                var m = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.maakunnat : null;
                return m != null && m.MaakunnanKeskus(a, out var la, out var lo) ? (la, lo) : ((double, double)?)null;
            };
        }

        static void Valitse(string avain)
        {
            var mk = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.maakunnat : null;
            if (mk == null) return;
            mk.OletusPois ??= () => Maakunnat.Pois;
            // Pois: korostus, täyttö ja rajat pois (oletusrajat eivät palaa, koska Maakunnat.Pois on tosi).
            if (string.IsNullOrEmpty(avain)) { mk.KorostusPois(null); mk.Taytto(false); mk.MaaTila(false); return; }
            mk.MaaPerussavy(Perus);
            mk.KorostusPois(null);
            mk.Korosta(avain, Valittu);
            mk.Taytto(true);
            mk.MaaTila(true);
        }
    }
}
