using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// NIMIÖT EIVÄT ERIKOISMALLIN PÄÄLLE (Fablen päätös 27.9. klo 10.3x; Mallinsepän löydös: Matterhornin maastokohdenimiö ja
    /// "Bernhardilainen" osuivat vuoren päälle). Näkyvät erikoismallit ja kaupunkien maamerkit annetaan nimiöladonnalle
    /// kalusteina (KaupunkiMerkit.Kalusteet), jolloin kaupunkien, alueiden ja nostojen nimiöt väistävät niitä kuten
    /// kartussia ja pulua. Laatikko: mallin leveys ruudulla (KokoNyt × KokoKerroin) jalan kohdalta ylöspäin mallin
    /// korkeussuhteella, + 4 pt vara. Kategoriasymbolit eivät ole kalusteita (nimiö kuuluu niiden viereen).
    /// </summary>
    public sealed partial class Symbolimallit
    {
        const float KalusteVaraPt = 4f;

        /// <summary>Onko nyt yhtään näkyvää erikoismallia (KaupunkiMerkit ei kokoa listaa turhaan).</summary>
        public static bool KalusteitaOn
        {
            get
            {
                if (instanssi == null) return false;
                foreach (var p in instanssi.kappaleet) if (p.Value.Malli < 0 && p.Value.R.enabled) return true;
                return false;
            }
        }

        /// <summary>Näkyvien erikoismallien ruutulaatikot (pikselit, y ylös) listaan.</summary>
        public static void LisaaKalusteet(List<Ruutulaatikko> ulos)
        {
            if (instanssi == null || instanssi.kamera == null) return;
            var kam = instanssi.kamera;
            float vara = KalusteVaraPt * PalloKierto.Pistekerroin;
            foreach (var p in instanssi.kappaleet)
            {
                var k = p.Value;
                if (k.Malli >= 0 || !k.R.enabled || k.LeveysPx <= 0f) continue;
                Vector3 r = kam.WorldToScreenPoint(k.JalkaMaailma);
                if (r.z <= 0f) continue;
                // Sama laatikko piilottaa muiden nostojen symbolit (Symbolimallit.ErikoismallinAlla.cs).
                ulos.Add(ErikoismallinAlla.Kalustelaatikko(r.x, r.y, k.LeveysPx, k.Suhde, vara));
            }
        }

        /// <summary>Verkon korkeus / suurin vaakamitta (ruutulaatikon korkeus leveydestä).</summary>
        static float Suhde(Mesh m)
        {
            if (m == null) return 1f;
            var b = m.bounds.size;
            return b.y / Mathf.Max(1e-4f, Mathf.Max(b.x, b.z));
        }
    }
}
