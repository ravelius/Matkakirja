// KUUMAILMAPALLON ELOKUVAMAINEN JÄLKIKÄSITTELY (omistaja 9.10.2026 ~01.4x: "voiko grafiikkaa parantaa vielä jollain? tietyn
// tyyppinen pehmennys ja rae ja värien tummennus"; Päätoimittaja: yksi profiili, vain pallotilassa, ei säätimiä pelaajalle;
// Natiiviseppä, juna 170). Googlen 3D-laatat ovat litteän kirkkaita ja pakkausjälkiset → oma globaali URP-Volume KaupunkiKuvan
// volyymin (prioriteetti 60) päälle prioriteetilla 70; ohittaa VAIN omat parametrinsa, joten KaupunkiKuvan vuorokausi
// (WhiteBalance, ColorAdjustments-valotus/kontrasti, SplitToning) jää voimaan:
//  1) tummennus ja sävy: ShadowsMidtonesHighlights (varjot ja keskisävyt hieman tummemmiksi, viileät varjot, lämmin valo) +
//     ColorAdjustments.saturation maltillisemmaksi; yöllä kevyempi (KaupunkiKuva.Nyt == "yo")
//  2) kevyt liikkuva filmirae (FilmGrain Medium1) peittää laattojen pakkausjäljet ja sulaneet kohdat
//  3) hento pehmennys vain kaukana (DepthOfField Gaussian, alku ≥ 4 km: ei tilt-shift-pienoismallia) + kevyt hehku (Bloom)
//  4) kevyt vinjetti
// Ei sumua eikä ilmaperspektiiviä (LS2:n KaupunkiIlmakeha hoitaa ne) → ei tuplaannu. Lämpö (Lampo.Kuuma): rae, pehmennys ja
// hehku pois, sävytys ja vinjetti jäävät (halvat). Kameran jälkikäsittely ja syvyystekstuuri kytketään KaupunkiKuvassa
// (Kaytossa), joka myös palauttaa ne. A/B: Documents/kaupunki-filmi-pois.txt → ei filmiä (kuvapari ennen/jälkeen).
using System.IO;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public static class KaupunkiFilmi
    {
        /// <summary>Filmi tässä avauksessa (A/B-tiedosto puuttuu).</summary>
        public static bool Kaytossa =>
            !File.Exists(Path.Combine(Application.persistentDataPath, "kaupunki-filmi-pois.txt"));

        public const int Prioriteetti = 70;
        public const float PehmennysAlkuM = 4000f, PehmennysLoppuM = 25000f;

        static GameObject go;
        static Volume volyymi;
        /// <summary>Kuvapari ennen/jälkeen kesken näkymän (komento `opas filmi pois|paalle`): Volume-paino 0/1.</summary>
        public static bool Nakyy
        {
            get => volyymi != null && volyymi.weight > 0f;
            set { if (volyymi != null) volyymi.weight = value ? 1f : 0f; }
        }
        static VolumeProfile profiili;
        static ShadowsMidtonesHighlights smh;
        static ColorAdjustments varit;
        static FilmGrain rae;
        static DepthOfField pehmennys;
        static Bloom hehku;
        static Vignette vinjetti;
        static bool kuuma, yo;

        /// <summary>Kaupunkinäkymän avaus (KaupunkiKuva.Avattu, kun Kaytossa).</summary>
        public static void Avaa()
        {
            if (go != null) return;
            go = new GameObject("KaupunkiFilmi Volume");
            var v = volyymi = go.AddComponent<Volume>();
            v.isGlobal = true;
            v.priority = Prioriteetti;
            profiili = ScriptableObject.CreateInstance<VolumeProfile>();
            smh = profiili.Add<ShadowsMidtonesHighlights>(true);
            varit = profiili.Add<ColorAdjustments>(false);   // vain saturaatio ohitetaan (muut KaupunkiKuvalta)
            rae = profiili.Add<FilmGrain>(false);
            rae.type.Override(FilmGrainLookup.Medium1);
            rae.response.Override(0.8f);
            pehmennys = profiili.Add<DepthOfField>(false);
            pehmennys.mode.Override(DepthOfFieldMode.Gaussian);
            pehmennys.gaussianStart.Override(PehmennysAlkuM);
            pehmennys.gaussianEnd.Override(PehmennysLoppuM);
            pehmennys.gaussianMaxRadius.Override(0.8f);
            pehmennys.highQualitySampling.Override(false);
            hehku = profiili.Add<Bloom>(false);
            hehku.threshold.Override(1.0f);
            hehku.scatter.Override(0.6f);
            vinjetti = profiili.Add<Vignette>(false);
            vinjetti.smoothness.Override(0.45f);
            v.sharedProfile = profiili;
            kuuma = Matkakirja.Lampo.Kuuma;
            yo = KaupunkiKuva.Nyt == "yo";
            Sovella();
            KaupunkiKuva.Vaihtui -= Vaihtui; KaupunkiKuva.Vaihtui += Vaihtui;
            Matkakirja.Lampo.Muuttui -= LampoMuuttui; Matkakirja.Lampo.Muuttui += LampoMuuttui;
            Debug.Log($"MATKAKIRJA kaupunki: filmi päällä ({(yo ? "yö" : "päivä")}{(kuuma ? ", kuuma: rae/pehmennys/hehku pois" : "")})");
        }

        /// <summary>Kaupunkinäkymän sulku (KaupunkiKuva.Suljettu).</summary>
        public static void Sulje()
        {
            KaupunkiKuva.Vaihtui -= Vaihtui;
            Matkakirja.Lampo.Muuttui -= LampoMuuttui;
            if (go != null) Object.Destroy(go);
            if (profiili != null) Object.Destroy(profiili);
            go = null; volyymi = null; profiili = null; smh = null; varit = null; rae = null; pehmennys = null; hehku = null; vinjetti = null;
        }

        static void Vaihtui(string v) { bool y = v == "yo"; if (y != yo) { yo = y; Sovella(); } }
        static void LampoMuuttui(Matkakirja.Lampotaso _) { bool k = Matkakirja.Lampo.Kuuma; if (k != kuuma) { kuuma = k; Sovella(); } }

        /// <summary>Profiilin arvot päivä/yö ja lämmön mukaan (puhdas arvovalinta: KaupunkiFilmiArvot, Ydin-testit).</summary>
        static void Sovella()
        {
            if (profiili == null) return;
            var a = Matkakirja.Linssit.Kierros.KaupunkiFilmiArvot.Valitse(yo, kuuma);
            smh.shadows.Override(new Vector4(a.VarjoR, a.VarjoG, a.VarjoB, a.VarjoTummennus));
            smh.midtones.Override(new Vector4(1f, 1f, 1f, a.KeskiTummennus));
            smh.highlights.Override(new Vector4(a.ValoR, a.ValoG, a.ValoB, 0f));
            varit.saturation.Override(a.Saturaatio);
            rae.active = a.Rae > 0f; rae.intensity.Override(a.Rae);
            pehmennys.active = a.Pehmennys;
            hehku.active = a.Hehku > 0f; hehku.intensity.Override(a.Hehku);
            vinjetti.intensity.Override(a.Vinjetti);
        }
    }
}
