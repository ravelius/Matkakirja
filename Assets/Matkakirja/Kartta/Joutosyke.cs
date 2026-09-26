using System.Globalization;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// JOUTOSYKE (Fable 25.9.2026 klo 20.1x, lämpöerä): kolmen jatkuvan idle-animaation yhteinen kello. Animaatiot ovat
    /// avoimen aarrepisteen syke (Karttapisteet), siirtokohteiden halo (Siirtokohdemerkit, Shaders/Kohdemerkki) sekä
    /// aloitusvalinnan renkaat ja halo (KaupunkiMerkit, Shaders/Rengas ja Kohdemerkki).
    ///
    /// Levossa ne pysähtyvät <see cref="Lampopaatos.SykeLepoS"/> viimeisen aidon aktiivisuuden jälkeen. Voima liukuu
    /// <see cref="Lampopaatos.SykeLiukuS"/>:ssa nollaan eli keskiasentoon (ei hyppyä), ja sykkeen oma aika pysähtyy. Sen
    /// jälkeen animaatioiden PallonLepo-ehdot palauttavat false, ja pallo saa levätä (Ruudunpaivitys PAIKALLAAN).
    ///
    /// Aito aktiivisuus (PallonLepo laskee): kosketus, kameran liike tai kamera-ajo, nappulan liike ja tilan muutos
    /// (PallonLepo.Herata tai Muuttui, esim. uusi valinta). Aktiivisuutta EIVÄT ole idle-animaatiot itse, laattojen
    /// lataus eivätkä valmistuneet verkot (PallonLepo.Valmistui). Aktiivisuus palauttaa sykkeen heti: voima nousee
    /// 0,3 s:ssa, ja aika jatkaa siitä, mihin se jäi.
    ///
    /// Varjostimet lukevat globaalit _SykeAika (Unityn _Time.y:n tilalla) ja _SykeVoima (0 = keskiasento); C# lukee
    /// <see cref="Aika"/> ja <see cref="Voima"/>. Kytkin: <see cref="Lampopaatos.SykeJaatyy"/> (oletus jatkuva kehyksen hinta -erästä alkaen) ja
    /// ajossa <see cref="Jaatyy"/> (komento syke jaatyy|jatkuva|tila).
    /// </summary>
    public static class Joutosyke
    {
        static readonly int AikaId = Shader.PropertyToID("_SykeAika");
        static readonly int VoimaId = Shader.PropertyToID("_SykeVoima");

        /// <summary>Jäädytys päällä (oletus Lampopaatos.SykeJaatyy); false = jatkuva syke kuten ennen lämpöerää.</summary>
        public static bool Jaatyy { get; set; } = Lampopaatos.SykeJaatyy;
        /// <summary>Sykkeen oma aika (s): etenee vain, kun syke elää.</summary>
        public static float Aika => tila.Aika;
        /// <summary>Näytön voima 0–1 (pehmennetty): 0 = keskiasento, 1 = täysi syke.</summary>
        public static float Voima { get; private set; } = 1f;
        /// <summary>Syke elää tai liukuu (voima yli 0): idle-animaatiot muuttavat kuvaa.</summary>
        public static bool Elaa => tila.Voima > 0f;

        static Lampopaatos.Syke tila = Lampopaatos.Syke.Alku;
        static float asetettuAika = float.NaN, asetettuVoima = float.NaN;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            Jaatyy = Lampopaatos.SykeJaatyy;
            tila = Lampopaatos.Syke.Alku;
            Voima = 1f;
            asetettuAika = asetettuVoima = float.NaN;
        }

        /// <summary>Aito aktiivisuus nyt (PallonLepo.Herata ja Muuttui): syke jatkuu heti.</summary>
        public static void Merkitse() => tila.Aktiivinen = Time.unscaledTime;

        /// <summary>Kerran kehyksessä (PallonLepo.Laske): kello, voima ja varjostimien globaalit (vain muuttuessa).</summary>
        internal static void Paivita(float nyt, float dt, bool aktiivisuus)
        {
            tila = Lampopaatos.SykeAskel(tila, nyt, dt, aktiivisuus, Jaatyy);
            Voima = Lampopaatos.SykePehmea(tila.Voima);
            if (tila.Aika != asetettuAika) { asetettuAika = tila.Aika; Shader.SetGlobalFloat(AikaId, tila.Aika); }
            if (Voima != asetettuVoima) { asetettuVoima = Voima; Shader.SetGlobalFloat(VoimaId, Voima); }
        }

        /// <summary>Tila lokiin (komento syke tila, pallo lepo).</summary>
        public static string Kuvaus()
        {
            var ic = CultureInfo.InvariantCulture;
            float lepo = Time.unscaledTime - tila.Aktiivinen;
            return $"syke {(Elaa ? (tila.Voima < 1f ? "liukuu" : "elää") : "jäätynyt keskiasentoon")} (voima {Voima.ToString("0.00", ic)}, " +
                   $"aika {tila.Aika.ToString("0.0", ic)} s, lepo {lepo.ToString("0.0", ic)} s, jäädytys " +
                   $"{(Jaatyy ? "päällä " + Lampopaatos.SykeLepoS.ToString("0.#", ic) + " s" : "pois (jatkuva)")})";
        }
    }
}
