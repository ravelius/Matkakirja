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
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.TextCore.Text;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public enum Kirjasin { Kone, KoneLihava, Luku, LukuLihava, LukuKursiivi, Kauno }

    public static class Kirjasimet
    {
        static readonly Dictionary<Kirjasin, FontDefinition?> valimuisti = new Dictionary<Kirjasin, FontDefinition?>();

        static (string Perhe, string Tyyli)[] Ehdokkaat(Kirjasin k) => k switch
        {
            Kirjasin.Kone => new[] { ("American Typewriter", "Regular"), ("Courier New", "Regular"), ("Courier", "Regular") },
            Kirjasin.KoneLihava => new[] { ("American Typewriter", "Semibold"), ("American Typewriter", "Bold"), ("Courier New", "Bold") },
            Kirjasin.Luku => new[] { ("Iowan Old Style", "Roman"), ("Iowan Old Style", "Regular"), ("Charter", "Roman"), ("Palatino", "Regular"), ("Georgia", "Regular") },
            Kirjasin.LukuLihava => new[] { ("Iowan Old Style", "Bold"), ("Charter", "Bold"), ("Palatino", "Bold"), ("Georgia", "Bold") },
            Kirjasin.LukuKursiivi => new[] { ("Iowan Old Style", "Italic"), ("Charter", "Italic"), ("Palatino", "Italic"), ("Georgia", "Italic") },
            Kirjasin.Kauno => new[] { ("Snell Roundhand", "Regular"), ("Savoye LET", "Plain"), ("Bradley Hand", "Bold") },
            _ => new (string, string)[0],
        };

        /// <summary>Fontin määritys (null = ei löytynyt: käytetään teeman varafonttia).</summary>
        public static FontDefinition? Hae(Kirjasin k)
        {
            if (valimuisti.TryGetValue(k, out var d)) return d;
            d = null;
            foreach (var (perhe, tyyli) in Ehdokkaat(k))
            {
                FontAsset fa = null;
                try { fa = FontAsset.CreateFontAsset(perhe, tyyli, 90); }
                catch (System.Exception e) { Debug.LogWarning($"MATKAKIRJA ui: fontti {perhe} {tyyli}: {e.Message}"); }
                if (fa == null) continue;
                fa.name = perhe + " " + tyyli;
                d = FontDefinition.FromSDFFont(fa);
                Debug.Log($"MATKAKIRJA ui: {k} = {perhe} {tyyli}");
                break;
            }
            if (d == null) Debug.LogWarning("MATKAKIRJA ui: järjestelmäfonttia ei löytynyt: " + k + " (varafontti EB Garamond)");
            valimuisti[k] = d;
            return d;
        }

        /// <summary>Asettaa elementin (ja perivien lasten) fontin.</summary>
        public static T Aseta<T>(T e, Kirjasin k) where T : VisualElement
        {
            var d = Hae(k);
            if (d.HasValue) e.style.unityFontDefinition = d.Value;
            return e;
        }
    }
}
