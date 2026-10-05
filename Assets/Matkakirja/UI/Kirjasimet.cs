// KIRJASIMET: verkkopelin fontit natiivissa (Natiivi-UI, 23.9.2026).
//
// Verkkopeli (css/styles.css :root) käyttää iOS:n järjestelmäfontteja:
//   --font-type  "American Typewriter" → kaikki käyttöliittymän teksti (napit, valikot, tilarivi)
//   --font-luku  "Iowan Old Style"     → pitkät lukutekstit (dialogien leipäteksti, juliste)
//   --font-kauno "Snell Roundhand"     → käsiala (isoisän merkinnät)
// Samat fontit ovat iOS:ssä ja macOS:ssä, joten ne luetaan käyttöjärjestelmästä
// (FontAsset.CreateFontAsset(perhe, tyyli)) eikä sovelluspakettiin lisätä mitään
// (omistaja: peli mahdollisimman pieni). Jos fonttia ei löydy (esim. Android),
// varana on projektin EB Garamond (Assets/Matkakirja/Fontit, Resources-viite teemassa).
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.TextCore.Text;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    /// <summary>Atlas = web --font-atlas (Liberation Serif kursiivi, UI/Resources/Fontit, OFL): kartan nimiöt ja kaupunkiliuska.</summary>
    public enum Kirjasin { Kone, KoneLihava, Luku, LukuLihava, LukuKursiivi, Kauno, KoneBold, Atlas, Goottilainen, Antiikva, AntiikvaKursiivi }

    public static class Kirjasimet
    {
        static readonly Dictionary<Kirjasin, FontDefinition?> valimuisti = new Dictionary<Kirjasin, FontDefinition?>();
        /// <summary>Saman fontin parikerronnaton muunnelma harvennetulle tekstille (HaeHarva).</summary>
        static readonly Dictionary<Kirjasin, FontDefinition?> harvat = new Dictionary<Kirjasin, FontDefinition?>();

        static (string Perhe, string Tyyli)[] Ehdokkaat(Kirjasin k) => k switch
        {
            Kirjasin.Kone => new[] { ("American Typewriter", "Regular"), ("Courier New", "Regular"), ("Courier", "Regular") },
            Kirjasin.KoneLihava => new[] { ("American Typewriter", "Semibold"), ("American Typewriter", "Bold"), ("Courier New", "Bold") },
            // Web font-weight 700 (anfangi): Safari valitsee American Typewriterin Boldin, ei Semiboldia.
            Kirjasin.KoneBold => new[] { ("American Typewriter", "Bold"), ("American Typewriter", "Semibold"), ("Courier New", "Bold") },
            Kirjasin.Luku => new[] { ("Iowan Old Style", "Roman"), ("Iowan Old Style", "Regular"), ("Charter", "Roman"), ("Palatino", "Regular"), ("Georgia", "Regular") },
            Kirjasin.LukuLihava => new[] { ("Iowan Old Style", "Bold"), ("Charter", "Bold"), ("Palatino", "Bold"), ("Georgia", "Bold") },
            Kirjasin.LukuKursiivi => new[] { ("Iowan Old Style", "Italic"), ("Charter", "Italic"), ("Palatino", "Italic"), ("Georgia", "Italic") },
            Kirjasin.Kauno => new[] { ("Snell Roundhand", "Regular"), ("Savoye LET", "Plain"), ("Bradley Hand", "Bold") },
            _ => new (string, string)[0],
        };

        /// <summary>Linnan lappujen otsikkofontti (Resources-polku): mitat.json "fontit.otsikko" voi vaihtaa sen (Päätoimittaja 4.10.:
        /// UnifrakturMaguntian K näytti R:ltä → luettavampi goottilainen).</summary>
        public static string LinnanOtsikko { get; private set; } = "Fontit/GrenzeGotisch-SemiBold";
        public static void AsetaLinnanOtsikko(string resurssi)
        {
            if (string.IsNullOrEmpty(resurssi) || resurssi == LinnanOtsikko) return;
            LinnanOtsikko = resurssi;
            valimuisti.Remove(Kirjasin.Goottilainen);
            harvat.Remove(Kirjasin.Goottilainen);
        }

        /// <summary>Fontin määritys (null = ei löytynyt: käytetään teeman varafonttia).</summary>
        public static FontDefinition? Hae(Kirjasin k)
        {
            if (valimuisti.TryGetValue(k, out var d)) return d;
            var fa = Luo(k, true);
            d = fa != null ? FontDefinition.FromSDFFont(fa) : (FontDefinition?)null;
            valimuisti[k] = d;
            return d;
        }

        /// <summary>
        /// KIRJAINVÄLI JA PARIKERRONTA (Natiivi-UI 5.10.2026, Tavlin "TAVL I" ja "O TTO M A A N I E N"): TextCore nollaa
        /// letter-spacingin jokaisesta kirjainparista, jolla on fontin kerning-tietue (GlyphPairAdjustmentRecord, lippu
        /// IgnoreSpacingAdjustments; UnityCsReference TextGeneratorParsing.cs), joten harvennettu kapiteeli on epätasainen:
        /// TA, AV ja TT jäävät tiiviiksi, LI ja OT harvenevat. Harvennettu teksti käyttää siksi saman fontin muunnelmaa ilman
        /// parikerrontaa (FontAsset.getFontFeatures = false); harvennus on silloin tasainen kuten webissä. Aseta valitsee tämän itse.
        /// </summary>
        public static FontDefinition? HaeHarva(Kirjasin k)
        {
            if (harvat.TryGetValue(k, out var d)) return d;
            var fa = Luo(k, false);
            d = fa != null ? FontDefinition.FromSDFFont(fa) : Hae(k);
            harvat[k] = d;
            return d;
        }

        /// <summary>Uusi dynaaminen FontAsset (null = ei löytynyt); kerronta = OpenType-parikerronta (GPOS) käytössä.</summary>
        static FontAsset Luo(Kirjasin k, bool kerronta)
        {
            FontAsset tulos = null;
            // Linnan keskiaikaiset laput (omistaja 4.10. 20.4x, Päätoimittaja): goottilainen otsikko ja vanha antiikva, OFL
            // (Linnanrakentajan toimitus olavinlinna-laput-v1, LAHTEET.md); puuttuva → varafontti.
            string linnanFontti = k == Kirjasin.Goottilainen ? LinnanOtsikko : k == Kirjasin.Antiikva ? "Fontit/IMFellEnglish-Regular"
                : k == Kirjasin.AntiikvaKursiivi ? "Fontit/IMFellEnglish-Italic" : null;
            if (linnanFontti != null)
            {
                var lf = Resources.Load<Font>(linnanFontti);
                tulos = lf != null ? FontAsset.CreateFontAsset(lf) : null;
                if (tulos != null) tulos.name = lf.name;
                else Debug.LogWarning("MATKAKIRJA ui: linnan fontti puuttuu (Resources/" + linnanFontti + ")");
            }
            else if (k == Kirjasin.Atlas)
            {
                var fontti = Resources.Load<Font>("Fontit/LiberationSerif-Italic");
                tulos = fontti != null ? FontAsset.CreateFontAsset(fontti) : null;
                if (tulos != null) tulos.name = "Liberation Serif Italic";
                else Debug.LogWarning("MATKAKIRJA ui: Liberation Serif puuttuu (Resources/Fontit)");
            }
            else
            {
                foreach (var (perhe, tyyli) in Ehdokkaat(k))
                {
                    try { tulos = FontAsset.CreateFontAsset(perhe, tyyli, 90); }
                    catch (System.Exception e) { Debug.LogWarning($"MATKAKIRJA ui: fontti {perhe} {tyyli}: {e.Message}"); }
                    if (tulos == null) continue;
                    tulos.name = perhe + " " + tyyli;
                    Debug.Log($"MATKAKIRJA ui: {k} = {perhe} {tyyli}{(kerronta ? "" : " (harva, ei parikerrontaa)")}");
                    break;
                }
                if (tulos == null && kerronta) Debug.LogWarning("MATKAKIRJA ui: järjestelmäfonttia ei löytynyt: " + k + " (varafontti EB Garamond)");
            }
            if (tulos != null && !kerronta) { tulos.getFontFeatures = false; tulos.name += " harva"; }
            return tulos;
        }

        // --- esilämmitys (UI-piikit 24.9.: fontin ensikäyttö 10–13 ms, GPOS-taulu ja glyfien rasterointi) ---------

        /// <summary>Suomen tekstin tavalliset merkit: rasteroidaan atlakseen levossa eikä ensimmäisellä näytöllä.</summary>
        const string Merkit = "aeinstlokuämvrjhypdögbfcwåzxq AEINSTLOKUÄMVRJHYPDÖGBFCWÅZXQ 0123456789 .,:;!?-–—()\"'’“”…%×·/&+°";
        const int MerkkejaRuudussa = 12;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void KaynnistaEsilammitys() => UiKerros.Hae().StartCoroutine(Esilammita());

        /// <summary>
        /// Fontit ja niiden merkit valmiiksi pienissä paloissa (yksi fontti tai 12 merkkiä ruutua kohti), jotta
        /// ensimmäinen lehti, kortti tai linssin selite ei maksa GPOS-taulua ja rasterointia avauskehyksessään.
        /// </summary>
        static IEnumerator Esilammita()
        {
            yield return new WaitForSecondsRealtime(1.5f);
            // Harvat muunnelmat (HaeHarva) kapiteeleille ja julisteille: Kone, KoneLihava ja LukuLihava ovat yleisimmät.
            var lammitettavat = new List<(Kirjasin K, bool Harva)>();
            foreach (Kirjasin k in System.Enum.GetValues(typeof(Kirjasin))) lammitettavat.Add((k, false));
            foreach (var k in new[] { Kirjasin.Kone, Kirjasin.KoneLihava, Kirjasin.LukuLihava }) lammitettavat.Add((k, true));
            foreach (var (k, harva) in lammitettavat)
            {
                var d = harva ? HaeHarva(k) : Hae(k);
                yield return null;
                var fa = d?.fontAsset;
                if (fa == null) continue;
                for (int i = 0; i < Merkit.Length; i += MerkkejaRuudussa)
                {
                    try { fa.TryAddCharacters(Merkit.Substring(i, Mathf.Min(MerkkejaRuudussa, Merkit.Length - i)), out _); }
                    catch (System.Exception e) { Debug.LogWarning("MATKAKIRJA ui: fontin esilämmitys " + k + ": " + e.Message); break; }
                    yield return null;
                }
            }
        }

        /// <summary>Elementin fontti ja se, onko harva muunnelma käytössä (Aseta).</summary>
        sealed class Valinta { public Kirjasin K; public bool Harva; }
        static readonly System.Runtime.CompilerServices.ConditionalWeakTable<VisualElement, Valinta> valinnat =
            new System.Runtime.CompilerServices.ConditionalWeakTable<VisualElement, Valinta>();

        /// <summary>
        /// Asettaa elementin (ja perivien lasten) fontin. Harvennettu teksti (ratkaistu letter-spacing > 0, esim. kapiteeli ja
        /// juliste) saa parikerronnattoman muunnelman (HaeHarva), muu teksti parikerronnan; tarkistus asettelun jälkeen.
        /// </summary>
        public static T Aseta<T>(T e, Kirjasin k) where T : VisualElement
        {
            if (valinnat.TryGetValue(e, out var v)) v.K = k;
            else
            {
                v = new Valinta { K = k };
                valinnat.Add(e, v);
                e.RegisterCallback<GeometryChangedEvent>(_ => Tarkista(e));
            }
            var d = v.Harva ? HaeHarva(k) : Hae(k);
            if (d.HasValue) e.style.unityFontDefinition = d.Value;
            return e;
        }

        static void Tarkista(VisualElement e)
        {
            if (!valinnat.TryGetValue(e, out var v)) return;
            bool harva = e.resolvedStyle.letterSpacing > 0.01f;
            if (harva == v.Harva) return;
            v.Harva = harva;
            var d = harva ? HaeHarva(v.K) : Hae(v.K);
            if (d.HasValue) e.style.unityFontDefinition = d.Value;
        }
    }
}
