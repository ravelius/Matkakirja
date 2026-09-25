using System.Globalization;

namespace Matkakirja
{
    /// <summary>
    /// KERMASARJAN VALINTA (omistajan löydös 128, build 16 → 17: "Kermahuntu peittää nyt liikaa muita maita → peittoa
    /// alas", kuvapari, omistaja valitsee). Karttaseppä polttaa kerman peiton sarjaan (KERMA_PEITTO): nykyinen
    /// 2026-09-25-p080 (0,80) sekä vaihtoehdot 2026-09-25-p060 (0,60) ja 2026-09-25-p045 (0,45) samalla rakenteella
    /// (&lt;ISO&gt;/laatat.json, &lt;ISO&gt;/{z}/{x}/{y}.webp, _maailma/). Natiivi EI säädä hunnun peittoa itse (Fablen linjaus
    /// 25.9. klo 22.5x), vaan vaihtaa sarjakansiota: Varitaso.Versio, komento "vari sarja p080|p060|p045|oletus|&lt;versio&gt;".
    /// Omistajan valinnan jälkeen <see cref="Oletus"/> vaihdetaan valittuun sarjaan.
    ///
    /// Puhdas (testit Kartta-testit/Testit/KermasarjaTestit.cs): komennon nimi sarjaksi ja sarjan peitto nimestä
    /// (napakalottien kerma, NapaKannet.Kerma, seuraa sarjaa, jottei navalle jää eri sävyinen kiekko).
    /// </summary>
    public static class Kermasarja
    {
        /// <summary>Oletussarja (build 14:n pohjasta, peitto 0,80; löydös 22).</summary>
        public const string Oletus = "2026-09-25-p080";
        /// <summary>Lyhyen nimen ("p060") etuliite: saman pohjan sarjat.</summary>
        public const string Etuliite = "2026-09-25-";
        /// <summary>Peitto, jos nimessä ei ole "-pNNN"-päätettä (vanhat sarjat olivat 0,80).</summary>
        public const float OletusPeitto = 0.80f;

        /// <summary>
        /// Komennon sana sarjaksi: tyhjä tai "oletus" → <see cref="Oletus"/>, "p060" → "2026-09-25-p060", muu sellaisenaan
        /// (kauttaviivat reunoilta pois).
        /// </summary>
        public static string Nimi(string sana)
        {
            if (string.IsNullOrWhiteSpace(sana) || sana == "oletus") return Oletus;
            sana = sana.Trim().Trim('/');
            if (sana.Length == 4 && sana[0] == 'p' && char.IsDigit(sana[1]) && char.IsDigit(sana[2]) && char.IsDigit(sana[3]))
                return Etuliite + sana;
            return sana;
        }

        /// <summary>Sarjan peitto nimen päätteestä "-pNNN" (p080 → 0,80, p045 → 0,45); muuten <see cref="OletusPeitto"/>.</summary>
        public static float Peitto(string versio)
        {
            if (string.IsNullOrEmpty(versio)) return OletusPeitto;
            int i = versio.LastIndexOf("-p", System.StringComparison.Ordinal);
            if (i < 0 || versio.Length - i != 5) return OletusPeitto;
            return int.TryParse(versio.Substring(i + 2), NumberStyles.None, CultureInfo.InvariantCulture, out int n) && n <= 100
                ? n / 100f : OletusPeitto;
        }
    }
}
