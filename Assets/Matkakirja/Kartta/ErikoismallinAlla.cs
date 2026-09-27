using System;

namespace Matkakirja
{
    /// <summary>
    /// KATEGORIASYMBOLIT ERIKOISMALLIN ALLA (Linssisepän speksi 27.9.2026 klo 21.2x, Fablen päätös: yleinen korjaus, nostoja
    /// ei siirretä). Löydös: Český Krumlovin erikoismallin päälle piirtyi 0,4 km:n päässä olevan `kohde:vltava`-noston Aallot
    /// ja Kinderdijkin takarivin myllyjen päälle 15 km:n päässä olevan `kohde:hahmotelma-gouda`-noston Malja (erikoismalli on
    /// 1,5-kertainen ja tason 1 nostot ovat lähellä toisiaan). Puhdas geometria (ei UnityEngineä), testit
    /// Kartta-testit/Testit/ErikoismallinAllaTestit.cs; käyttö Symbolimallit.ErikoismallinAlla.cs ja Natiivi-UI:n NostotKartalla.
    ///
    ///  - KALUSTELAATIKKO on sama, jota nimiöt jo väistävät (commit 0bdc3626, Symbolimallit.LisaaKalusteet): mallin leveys
    ///    ruudulla jalan kohdalta ylöspäin mallin korkeussuhteella, + vara (4 pt) joka reunalla. Ruudun pikselit, y ylös.
    ///  - OSUMA (LAATIKKOLEIKKAUS 28.9.): toisen noston symbolin laatikko (<see cref="SymbolinLaatikko"/>) leikkaa mallin
    ///    laatikon → symboli piiloon. Ennen ehto oli jalkapiste laatikossa, mutta Linssisepän laiteajossa 27.9. klo 22.0x
    ///    Kinderdijkin sääntö ei lauennut: Goudan Maljan jalka oli laatikon yläpuolella ja malja myllyjen takarivin päällä.
    ///    HYSTEREESI 10 %: piilossa oleva palaa vasta, kun symbolin laatikko on 10 % suuremman mallin laatikon (leveys ja
    ///    korkeus × 1,1 keskipisteen ympäri) ulkopuolella, jottei zoomaus välkytä. Leveys 0 = pelkkä jalkapiste (<see cref="Osuu"/>).
    ///  - REUNAPISTE: suora erikoismallin jalasta noston todelliseen paikkaan leikkaa laatikon reunan; piste on siinä, joten
    ///    suunta on maantieteellisesti oikea. Jalka samassa pisteessä (suunta puuttuu) → suoraan alas jalan alle.
    ///  - MERKIN PAIKKA (<see cref="MerkinPaikka"/>): jalka laatikossa → reunapiste; jalka laatikon ulkopuolella (vain symboli
    ///    leikkasi laatikkoa) → noston oma paikka, koska jalka ei jää mallin alle eikä merkkiä siirretä turhaan.
    ///  - HÄIVYTYS 0,3 s kumpaankin suuntaan.
    ///  - REUNAPISTEEN koko enintään 6 pt (tasojen 2–3 minimerkki: musterengas r 3,4 yksikköä mitalla kerrottuna).
    /// </summary>
    public static class ErikoismallinAlla
    {
        /// <summary>Symbolin häivytys piiloon ja takaisin (s).</summary>
        public const float HaivytysS = 0.3f;
        /// <summary>Laatikon kasvu (osuus leveydestä ja korkeudesta), jonka sisällä jo piilotettu pysyy piilossa.</summary>
        public const float Hystereesi = 0.1f;
        /// <summary>Reunapisteen (musterenkaan) halkaisija enintään (pt).</summary>
        public const float PisteEnintaanPt = 6f;
        /// <summary>Minimerkin musterenkaan halkaisija mitan yksiköissä (web NOSTOSYM_PISTE_R 3,4 × 2, NostoMerkit.PisteRengas).</summary>
        public const float PisteHalkaisijaYks = 6.8f;

        /// <summary>Erikoismallin kalustelaatikko: jalka ruudulla (px), mallin leveys (px), korkeus/leveys-suhde ja vara (px).</summary>
        public static Ruutulaatikko Kalustelaatikko(float jalkaX, float jalkaY, float leveys, float suhde, float vara)
        {
            float h = leveys * suhde;
            return new Ruutulaatikko(jalkaX - leveys * 0.5f - vara, jalkaY - vara, jalkaX + leveys * 0.5f + vara, jalkaY + h + vara);
        }

        /// <summary>
        /// Symbolin ruutulaatikko (px, y ylös) jalasta: leveys jalan kohdalta, ylöspäin mallin korkeussuhteella (vähintään puolet
        /// leveydestä, koska ylhäältä katsottu malli ulottuu jalan ympärille) ja 0,3 × leveys jalan alle. Sama muoto kuin
        /// symbolien väistössä (Linssisepän speksi 28.9.), jotta kumpikin sääntö näkee symbolin samankokoisena.
        /// </summary>
        public static Ruutulaatikko SymbolinLaatikko(float jalkaX, float jalkaY, float leveys, float suhde)
        {
            leveys = Math.Max(0f, leveys);
            float h = Math.Max(0.5f * leveys, leveys * suhde);
            return new Ruutulaatikko(jalkaX - leveys * 0.5f, jalkaY - 0.3f * leveys, jalkaX + leveys * 0.5f, jalkaY + h);
        }

        /// <summary>
        /// Leikkaako symbolin laatikko mallin laatikon (reunat mukaan): <paramref name="joAlla"/> = symboli on jo tämän mallin alla
        /// piilossa, jolloin mallin laatikko on <see cref="Hystereesi"/>:n verran suurempi (pysyy piilossa). Nollakokoinen symboli
        /// on sama kuin <see cref="Osuu"/> jalkapisteellä.
        /// </summary>
        public static bool Leikkaa(Ruutulaatikko malli, Ruutulaatikko symboli, bool joAlla)
        {
            float k = joAlla ? 1f + Hystereesi : 1f;
            float mx = (malli.X0 + malli.X1) * 0.5f, my = (malli.Y0 + malli.Y1) * 0.5f;
            float sx = (symboli.X0 + symboli.X1) * 0.5f, sy = (symboli.Y0 + symboli.Y1) * 0.5f;
            return Math.Abs(sx - mx) <= 0.5f * (malli.Leveys * k + symboli.Leveys)
                   && Math.Abs(sy - my) <= 0.5f * (malli.Korkeus * k + symboli.Korkeus);
        }

        /// <summary>
        /// Osuuko piste laatikkoon: <paramref name="joAlla"/> = symboli on jo tämän laatikon alla piilossa, jolloin laatikko on
        /// <see cref="Hystereesi"/>:n verran suurempi (pysyy piilossa), muuten tarkka laatikko (reunat mukaan).
        /// </summary>
        public static bool Osuu(Ruutulaatikko l, float x, float y, bool joAlla)
        {
            float k = joAlla ? 1f + Hystereesi : 1f;
            float cx = (l.X0 + l.X1) * 0.5f, cy = (l.Y0 + l.Y1) * 0.5f;
            return Math.Abs(x - cx) <= 0.5f * l.Leveys * k && Math.Abs(y - cy) <= 0.5f * l.Korkeus * k;
        }

        /// <summary>
        /// Reunapiste: puolisuora jalasta (<paramref name="jx"/>, <paramref name="jy"/>) kohti noston paikkaa
        /// (<paramref name="nx"/>, <paramref name="ny"/>) leikkaa laatikon reunan. Jalka rajataan laatikkoon (vara 0 → alareuna).
        /// </summary>
        public static void ReunaPiste(Ruutulaatikko l, float jx, float jy, float nx, float ny, out float x, out float y)
        {
            float dx = nx - jx, dy = ny - jy;
            float pituus = (float)Math.Sqrt(dx * dx + dy * dy);
            if (pituus < 1e-3f) { dx = 0f; dy = -1f; }
            else { dx /= pituus; dy /= pituus; }
            float px = Math.Min(Math.Max(jx, l.X0), l.X1), py = Math.Min(Math.Max(jy, l.Y0), l.Y1);
            float t = float.PositiveInfinity;
            if (dx > 1e-6f) t = Math.Min(t, (l.X1 - px) / dx);
            else if (dx < -1e-6f) t = Math.Min(t, (l.X0 - px) / dx);
            if (dy > 1e-6f) t = Math.Min(t, (l.Y1 - py) / dy);
            else if (dy < -1e-6f) t = Math.Min(t, (l.Y0 - py) / dy);
            if (float.IsInfinity(t) || t < 0f) t = 0f;
            x = px + dx * t;
            y = py + dy * t;
        }

        /// <summary>
        /// Piilotetun noston merkin paikka: jalka (<paramref name="nx"/>, <paramref name="ny"/>) laatikossa → <see cref="ReunaPiste"/>;
        /// jalka laatikon ulkopuolella (laatikkoleikkaus: vain symboli ulottui mallin päälle) → jalka itse. Merkki ei hyppää rajalla:
        /// reunapiste lähestyy jalkaa, kun jalka lähestyy reunaa (mallin jalka laatikon sisällä, vara &gt; 0).
        /// </summary>
        public static void MerkinPaikka(Ruutulaatikko l, float jx, float jy, float nx, float ny, out float x, out float y)
        {
            if (Osuu(l, nx, ny, false)) ReunaPiste(l, jx, jy, nx, ny, out x, out y);
            else { x = nx; y = ny; }
        }

        /// <summary>Häivytys askeleen <paramref name="dt"/> (s) verran kohti piiloa (1) tai näkyvää (0), <see cref="HaivytysS"/>.</summary>
        public static float Haivyta(float piilo, bool piiloon, float dt)
        {
            float tavoite = piiloon ? 1f : 0f, askel = Math.Max(0f, dt) / HaivytysS;
            if (Math.Abs(tavoite - piilo) <= askel) return tavoite;
            return piilo + (tavoite > piilo ? askel : -askel);
        }

        /// <summary>Reunapisteen mitta (UI:n pt / mitan yksikkö): nimiön mitta, mutta rengas enintään <see cref="PisteEnintaanPt"/>.</summary>
        public static float PisteMitta(float mitta) => Math.Min(mitta, PisteEnintaanPt / PisteHalkaisijaYks);
    }
}
