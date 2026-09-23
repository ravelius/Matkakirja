// Silta Natiivi-UI:n Maakunnat-välilehdeltä pallon maakuntaväritykseen (B17, Natiiviseppä).
// Maakunnat.Valittu(avain "ISO:tunnus") → KarttaKerrokset.maakunnat: rajat näkyviin ja
// valittu maakunta korostettuna (webin ui.karttatyokaluMaakunta-koukku).
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
        }

        static void Valitse(string avain)
        {
            var mk = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.maakunnat : null;
            if (mk == null) return;
            if (string.IsNullOrEmpty(avain)) { mk.KorostusPois(null); mk.MaaTila(false); return; }
            mk.MaaPerussavy(Perus);
            mk.KorostusPois(null);
            mk.Korosta(avain, Valittu);
            mk.MaaTila(true);
        }
    }
}
