using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// KATEGORIASYMBOLIT OIKEINA 3D-ESINEINÄ (omistaja 26.9.2026 klo 21.5x: 3D-nostot ovat NOSTOT-paneelin kategoriasymbolit,
    /// samat joka maassa; tarkennus 27.9. klo 00.1x: EI pursotettua 2D-kuvamerkkiä, vaan oikea 3D-esine kuten lipputanko,
    /// "visuaalisesti yhtä hyvä kuin 2D"). Kartoitus nosto → symboli: KategoriaKartoitus.
    ///
    /// TYÖNJAKO: mallit tekee Mallinseppä samalla kaavalla kuin erikoismallit (Symbolimallit.Erikoismallit.cs), yksi tiedosto
    /// symbolia kohden, esim. Kategoriamallit/Kaari.cs:
    /// <code>
    /// static readonly bool kaariMalli = RekisteroiKategoria(Kategoriasymboli.Kaari,
    ///     new Erikoismalli { Runko = KaariRunko, Lod1 = KaariLod1 });
    /// </code>
    /// Natiiviseppä tekee piirron: tason 1 kappaleet, tasojen 2–3 GPU-instanssit (Lod1), ääriviivan, varjostimen (kaiverrusilme:
    /// seepiaramppi kärkialfalla 0, ääriviiva, myöhemmin viivoitus), maavarjon ja perspektiivin. Mallin avaruus kuten
    /// erikoismalleilla: +Y ylös, +Z pohjoinen, suurin vaakamitta ~1, juuri maassa. Symboli, jolla ei ole rekisteröityä mallia,
    /// piirretään toistaiseksi arkkityyppinä (tasojen 2–3 vanha kirjasto).
    ///
    /// KOLMIOBUDJETTI: LOD0 ≤ <see cref="SymLod0Katto"/> (taso 1, yksittäiset), LOD1 ≤ <see cref="SymLod1Katto"/> (tasot 2–3,
    /// satoja instansseja: historia 547, vuori 294). Ylitys = varoitus lokiin.
    /// </summary>
    public sealed partial class Symbolimallit
    {
        public const int SymLod0Katto = 800, SymLod1Katto = 200;

        /// <summary>Kategoriasymbolit käytössä (komento `symbolit kategoriat 1|0`, oletus 1; A/B-vertailu arkkityyppeihin).</summary>
        public static bool Kategoriat = true;
        /// <summary>Symbolin +Z ruudun ylös-suuntaan (komento `symbolit kategoriat ruutu|pohjoinen`); oikeat 3D-esineet
        /// oletuksena pohjoiseen kuten rakennukset ja erikoismallit.</summary>
        public static bool KategoriaRuutuYlos;

        static void NollaaKategoriat() { Kategoriat = true; KategoriaRuutuYlos = false; }

        static Erikoismalli[] kategoriaMallit;
        static Erikoismalli[] KategoriaMallit => kategoriaMallit ??= new Erikoismalli[KategoriaKartoitus.Lukumaara];

        /// <summary>Rekisteröi kategoriasymbolin mallin (staattisen kentän alustuksessa, ks. luokan kuvaus).</summary>
        static bool RekisteroiKategoria(Kategoriasymboli s, Erikoismalli malli)
        {
            if (malli == null || malli.Runko == null) { Debug.LogError($"MATKAKIRJA symbolimallit: virheellinen kategoriamalli {s}"); return false; }
            if (KategoriaMallit[(int)s] != null) { Debug.LogError($"MATKAKIRJA symbolimallit: kategoriamalli {s} rekisteröity kahdesti"); return false; }
            KategoriaMallit[(int)s] = malli;
            return true;
        }

        /// <summary>Onko symbolilla rekisteröity malli. Muut kategoriat pysyvät arkkityyppeinä.</summary>
        public static bool SymboliRakennettu(Kategoriasymboli s) => KategoriaMallit[(int)s] != null;

        static readonly Mesh[,] symVerkot = new Mesh[KategoriaKartoitus.Lukumaara, 2];
        static readonly int[,] symKolmiot = new int[KategoriaKartoitus.Lukumaara, 2];

        /// <summary>Kategoriasymbolin verkko (lod 0 tai 1; Lod1 puuttuessa LOD0), rakennetaan kerran; null, jos ei mallia.</summary>
        public static Mesh SymbolinVerkko(Kategoriasymboli s, int lod)
        {
            var malli = KategoriaMallit[(int)s];
            if (malli == null) return null;
            lod = lod <= 0 || malli.Lod1 == null ? 0 : 1;
            var m = symVerkot[(int)s, lod];
            if (m != null) return m;
            m = lod == 0 ? malli.Runko() : malli.Lod1();
            int n = m != null ? m.triangles.Length / 3 : 0;
            if (n > (lod == 0 ? SymLod0Katto : SymLod1Katto))
                Debug.LogWarning($"MATKAKIRJA symbolimallit: kategoriasymboli {s} LOD{lod} {n} kolmiota yli budjetin");
            symKolmiot[(int)s, lod] = n;
            return symVerkot[(int)s, lod] = m;
        }

        /// <summary>Kategoriasymbolin kolmiot (lod 0 tai 1); 0, jos ei mallia.</summary>
        public static int SymbolinKolmiot(Kategoriasymboli s, int lod)
        {
            var malli = KategoriaMallit[(int)s];
            if (malli == null || SymbolinVerkko(s, lod) == null) return 0;
            return symKolmiot[(int)s, lod <= 0 || malli.Lod1 == null ? 0 : 1];
        }

        // ---- Mallin indeksi: arkkityypit 0..A−1, kategoriasymbolit A..A+K−1 (tasojen 2–3 erät, tila) ----

        const int MalliLukumaara = ArkkityyppiKartoitus.Lukumaara + KategoriaKartoitus.Lukumaara;

        /// <summary>Piirretäänkö noston malli kategoriasymbolina: symboli rakennettu ja käytössä, erikoismalli voittaa aina.</summary>
        static bool KayttaaSymbolia(Tieto t) =>
            Kategoriat && t != null && t.Erikois == null && t.Symboli.HasValue && SymboliRakennettu(t.Symboli.Value);

        static int MalliIndeksi(Tieto t) => KayttaaSymbolia(t) ? ArkkityyppiKartoitus.Lukumaara + (int)t.Symboli.Value : (int)t.Tyyppi;

        static Mesh MallinVerkko(int i, int lod) => i < ArkkityyppiKartoitus.Lukumaara
            ? ArkkityypinVerkko((Arkkityyppi)i, lod)
            : SymbolinVerkko((Kategoriasymboli)(i - ArkkityyppiKartoitus.Lukumaara), lod);

        static int MallinKolmiot(int i, int lod) => i < ArkkityyppiKartoitus.Lukumaara
            ? ArkkityypinKolmiot((Arkkityyppi)i, lod)
            : SymbolinKolmiot((Kategoriasymboli)(i - ArkkityyppiKartoitus.Lukumaara), lod);

        static string MallinNimi(int i) => i < ArkkityyppiKartoitus.Lukumaara
            ? ((Arkkityyppi)i).ToString()
            : "symboli:" + (Kategoriasymboli)(i - ArkkityyppiKartoitus.Lukumaara);
    }
}
