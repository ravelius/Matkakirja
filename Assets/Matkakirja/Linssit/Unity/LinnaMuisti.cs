// LINNAN MUISTIBUDJETTI (omistaja 8.10.2026 19.5x: "lisää muistin käyttöä niin paljon kuin pystyy"; Natiiviseppä). Unity-kääre
// puhtaalle laskennalle (Ydin/Dioraama/LinnaMuistibudjetti.cs): vapaa muisti jetsam-rajaan (iOS os_proc_available_memory,
// IssKameraKuva.VapaaMuistiMt; Mac ja muualla −1 = laiteluokka ennallaan).
//
// ISTUNTO: budjetti lasketaan KERRAN ensimmäisestä kyselystä (esilataus kartalla tai linnan avaus) ja pidetään, kunnes linna
// suljetaan (Nollaa), jotta esilataus ja avaus valitsevat samat tiedostot. Avauksessa esilatauksen budjetille vain turva-
// tarkistus: jos vapaa on sen jälkeen laskenut niin, ettei valittu taso enää mahdu (esim. 3D-kaupunki välissä), lasketaan
// uudelleen. Muu ennen avausta tehty kysely (esim. kuorinapin teksti kartalla) lasketaan avauksessa aina uudelleen.
// HÄTÄVAHTI linnan ollessa auki (2 s): vapaa alle HataMt → lokiin ja UI-kuvien LRU puoleen (palautuu sulkiessa); tasoa ei vaihdeta
// kesken. Kehittäjäohitus: Documents/linna-vapaa-muisti.txt = vapaa muisti Mt (esim. "3200"; ≤ 64 tulkitaan gigatavuiksi).
using System;
using System.IO;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class LinnaMuisti
    {
        static LinnaLaatu? tulos;
        static bool auki, hataKaytetty, esiladattu;
        static float tarkistettu;
        static long pieninVapaa = long.MaxValue, kuvatRajaEnnen = -1;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void NollaaKaikki() { tulos = null; auki = false; hataKaytetty = false; esiladattu = false; pieninVapaa = long.MaxValue; kuvatRajaEnnen = -1; }

        /// <summary>Istunnon laatu (lasketaan ensimmäisellä kyselyllä).</summary>
        public static LinnaLaatu Nyt => tulos ??= Laske("kysely");

        /// <summary>Vapaa muisti jetsam-rajaan (Mt); −1 = ei tiedossa (editori, simulaattori, Mac ilman tietoa).</summary>
        public static long VapaaMuisti()
        {
            try
            {
                var p = Path.Combine(Application.persistentDataPath, "linna-vapaa-muisti.txt");
                if (File.Exists(p) && double.TryParse(File.ReadAllText(p).Trim(), System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var v) && v > 0)
                    return (long)(v <= 64 ? v * 1024 : v);
            }
            catch (Exception) { }
#if UNITY_STANDALONE_OSX && !UNITY_EDITOR
            // Mac: ei jetsam-rajaa, ja MacLaatu.VapaaGt (vapaat sivut) on pieni, koska macOS pitää muistin välimuisteissa →
            // budjetti pudottaisi 16 Gt:n Macin turvatasolle. Laiteluokka ennallaan (Natiiviseppä 8.10.2026).
            return -1;
#else
            return IssKameraKuva.VapaaMuistiMt();
#endif
        }

        static LinnaLaatu Laske(string syy)
        {
            long vapaa = VapaaMuisti();
            var t = LinnaMuistibudjetti.Laske((int)Math.Min(vapaa, int.MaxValue), SystemInfo.deviceModel, SystemInfo.systemMemorySize,
                DioraamaLaatu.Laiteluokka, (long)Screen.width * Screen.height);
            Debug.Log($"MATKAKIRJA linnamuisti: vapaa {(vapaa >= 0 ? vapaa + " Mt" : "ei tiedossa")}, budjetti {(t.BudjettiMt >= 0 ? t.BudjettiMt + " Mt" : "-")}, " +
                      $"taso {t} (tarve ~{t.TarveMt} Mt, {t.Peruste}; {syy}, {SystemInfo.deviceModel}, RAM {SystemInfo.systemMemorySize} Mt)");
            return t;
        }

        /// <summary>Esilatauksen tiedostolista (DioraamaEsilataus.Tiedostot): budjetti lasketaan nyt ja avaus pitää sen.</summary>
        public static void Esilataus()
        {
            if (auki) return;
            if (tulos == null || !esiladattu) tulos = Laske("esilataus");
            esiladattu = true;
        }

        /// <summary>Linnan avaus (DioraamaSovitin.Avaa): laskee budjetin, tai tarkistaa esilatauksen budjetin turvallisuuden.</summary>
        public static void Avaus()
        {
            bool esi = esiladattu && tulos != null;
            auki = true; hataKaytetty = false; esiladattu = false; pieninVapaa = long.MaxValue; tarkistettu = Time.realtimeSinceStartup;
            if (!esi) { tulos = Laske("avaus"); return; }
            var t = tulos.Value;
            if (t.VapaaMt < 0) return;
            long vapaa = VapaaMuisti();
            if (vapaa >= 0 && t.TarveMt > vapaa - LinnaMuistibudjetti.Marginaali((int)Math.Min(vapaa, int.MaxValue)))
                tulos = Laske($"avaus: vapaa laski {t.VapaaMt} → {vapaa} Mt esilatauksen jälkeen");
        }

        /// <summary>Hätävahti joka ruutu linnan ollessa auki (DioraamaSovitin.Paivita); tarkistaa 2 s välein.</summary>
        public static void Vahti()
        {
            if (!auki || Time.realtimeSinceStartup - tarkistettu < 2f) return;
            tarkistettu = Time.realtimeSinceStartup;
            long v = VapaaMuisti();
            if (v < 0) return;
            if (v < pieninVapaa) pieninVapaa = v;
            if (hataKaytetty || v >= LinnaMuistibudjetti.HataMt) return;
            hataKaytetty = true;
            long ennen = Kuvat.MuistiRaja / 1048576, uusi = Math.Max(32, ennen / 2);
            if (kuvatRajaEnnen < 0) kuvatRajaEnnen = ennen;
            Kuvat.AsetaRaja(uusi);
            Debug.LogWarning($"MATKAKIRJA linnamuisti: HÄTÄ vapaa {v} Mt (budjetti {Nyt.BudjettiMt} Mt, taso {Nyt}) → kuvien LRU {ennen} → {uusi} Mt");
        }

        /// <summary>Linna suljettu (DioraamaSovitin.Sulje): pienin vapaa lokiin (kalibrointi), kuvien LRU takaisin, budjetti unohtuu.</summary>
        public static void Nollaa()
        {
            if (auki && pieninVapaa != long.MaxValue)
                Debug.Log($"MATKAKIRJA linnamuisti: suljettu, pienin vapaa {pieninVapaa} Mt (budjetti {tulos?.BudjettiMt ?? -1} Mt, tarve ~{tulos?.TarveMt ?? 0} Mt)");
            if (kuvatRajaEnnen > 0) { Kuvat.AsetaRaja(kuvatRajaEnnen); kuvatRajaEnnen = -1; }
            tulos = null; auki = false; hataKaytetty = false; esiladattu = false; pieninVapaa = long.MaxValue;
        }

        public static string Kuvaus()
        {
            var t = Nyt;
            return $"linnamuisti: vapaa {(t.VapaaMt >= 0 ? t.VapaaMt + " Mt" : "ei tiedossa")}, budjetti {(t.BudjettiMt >= 0 ? t.BudjettiMt + " Mt" : "-")}, " +
                   $"taso {t} (tarve ~{t.TarveMt} Mt, {t.Peruste})";
        }
    }
}
