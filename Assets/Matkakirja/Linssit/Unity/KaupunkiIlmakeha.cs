// KAUPUNKINÄKYMÄN ILMAKEHÄ (Linssiseppä 2, 8.10.2026; PT: pallon maisema Unreal-tasolle, kohdat 1–3, omistaja 19.5x ja 20.0x):
// Karttasepän sironta-LUTit (Resources/Ilmakeha) globaaleiksi varjostinarvoiksi joka kehys. Kolme liitosta Linssisepän koodiin:
//  1) KaupunkiKuva.LateUpdate kutsuu Paivita (kori-lohko: sama aurinko kuin pallon korilla),
//  2) LuoKupoli käyttää TaivasMateriaali()a (IlmakehaTaivas) DioraamaTaivaan sijaan, kun Paalla,
//  3) CesiumKaupunki antaa Googlen tilesetille LaattaMateriaali()n (IlmakehaLaatat: ilmaperspektiivi ja pilvien varjot), kun Paalla.
// Map Tiles -ehdot: renderöintitehosteet (varjostus, sumu, ilmakehä) eivät ole rajoitettuja, kuten Cesiumin omat; ei sisällön
// tunnistusta, ei tallennusta, krediitit ennallaan (Karttaseppä 8.10., vesimaski-google-ehdot-20261008.md kohta 2).
// OLETUS (omistaja 21.1x, PT): päällä kehityskaupungeissa (Kehityskaupungit: Tukholma, Pariisi), muualla pois; asetus "ilmakeha 0|1"
// (kaupunki-kuva-asetukset.txt) pakottaa. Varjostimen ollessa rikki (isSupported false) materiaalia ei käytetä (Google ei muutu).
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class KaupunkiIlmakeha
    {
        /// <summary>Asetuksen pakotus (null = kehityskaupungeissa päällä).</summary>
        public static bool? Pakotettu;
        public static bool Paalla => Pakotettu ?? kehitys;
        static bool kehitys;
        /// <summary>Nykyinen kaupunki (kameran georeferenssi): kehityskaupungissa oletus päällä.</summary>
        public static void Kaupunki(double lat, double lon)
        {
            bool k = Matkakirja.Linssit.Kehityskaupungit.Lahella(lat, lon) != null;
            if (k != kehitys || !kaupunkiKirjattu) { kaupunkiKirjattu = true; Debug.Log($"MATKAKIRJA kaupunki: ilmakehä kaupunki {lat:F4},{lon:F4} → kehityskaupunki {k}, pakotettu {(Pakotettu?.ToString() ?? "-")}"); }
            kehitys = k;
        }
        static bool kaupunkiKirjattu;
        /// <summary>Valotus (radianssi × valotus ennen sävytystä; Karttaseppä: 10–30), ilmaperspektiivin voima, pilvien varjon voima.</summary>
        public static float Valotus = 12f, ApVoima = 1f, VarjoVoima = 0.45f, PilviJaksoM = 30000f, PilviKorkeusM = (float)Matkakirja.Linssit.Ilmakeha.KaupunkiPilvet.PohjaM;
        /// <summary>Pallon pilvikerros taivaskupolissa (raportin kohta 6a, PT 23.28): asetus "pilvet 0|1", oletus pois kuvapariin asti.
        /// Pohja = PilviKorkeusM (sama kuin pilvien varjoilla), paksuus PilviPaksuusM.</summary>
        public static bool Pilvet;
        /// <summary>Tuuli (m/s, x itä, y pohjoinen): pilvikentän ja pilvien varjojen siirtymä sekä laivojen savu (VeneSavu).</summary>
        public static Vector2 TuuliMs = new Vector2(6f, 2f);
        public static float PilviPaksuusM = (float)Matkakirja.Linssit.Ilmakeha.KaupunkiPilvet.PaksuusM;
        static float voima;
        static Texture2D lapaisy, pilvet; static Texture3D taivas, ap, apLapaisy;
        static bool ladattu, puuttuu;
        static readonly int IdLapaisy = Shader.PropertyToID("_IlmLapaisy"), IdTaivas = Shader.PropertyToID("_IlmTaivas"), IdAp = Shader.PropertyToID("_IlmAp"),
            IdApLapaisy = Shader.PropertyToID("_IlmApLapaisy"), IdPilvet = Shader.PropertyToID("_IlmPilvet"), IdAurinko = Shader.PropertyToID("_IlmAurinko"),
            IdParam = Shader.PropertyToID("_IlmParam"), IdPilviParam = Shader.PropertyToID("_IlmPilviParam"), IdTuuli = Shader.PropertyToID("_IlmTuuli"),
            IdMaailma = Shader.PropertyToID("_IlmMaailma"), IdPilviKerros = Shader.PropertyToID("_IlmPilviKerros"), IdSaa = Shader.PropertyToID("_IlmSaa");

        static Texture3D Lue3D(string nimi, int w, int h, int d)
        {
            var t = Resources.Load<TextAsset>("Ilmakeha/" + nimi);
            if (t == null || t.bytes.Length != w * h * d * 8) { Debug.Log($"MATKAKIRJA kaupunki: ilmakehä {nimi} puuttuu tai väärä koko"); return null; }
            var x = new Texture3D(w, h, d, TextureFormat.RGBAHalf, false) { name = "Ilmakeha:" + nimi, wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            x.SetPixelData(t.bytes, 0); x.Apply(false, true); Resources.UnloadAsset(t);
            return x;
        }

        static bool Lataa()
        {
            if (ladattu || puuttuu) return ladattu;
            var l = Resources.Load<TextAsset>("Ilmakeha/lapaisy");
            if (l != null && l.bytes.Length == 256 * 64 * 8)
            {
                lapaisy = new Texture2D(256, 64, TextureFormat.RGBAHalf, false, true) { name = "Ilmakeha:lapaisy", wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
                lapaisy.LoadRawTextureData(l.bytes); lapaisy.Apply(false, true); Resources.UnloadAsset(l);
            }
            taivas = Lue3D("taivas", 96, 64, 96); ap = Lue3D("ilmaperspektiivi", 32, 32, 96); apLapaisy = Lue3D("ilmaperspektiivi-lapaisy", 32, 32, 96);
            pilvet = Resources.Load<Texture2D>("Ilmakeha/pilvet-tiheys");
            if (pilvet == null)
            {
                // Varana tasainen kenttä (ei pilvien varjoja), ettei koko ilmakehä jää pois kuvan takia.
                Debug.Log("MATKAKIRJA kaupunki: ilmakehä: pilvet-tiheys puuttuu, pilvien varjot pois");
                pilvet = new Texture2D(1, 1, TextureFormat.RGBA32, false, true) { name = "Ilmakeha:pilvet-tyhja" }; pilvet.SetPixel(0, 0, Color.clear); pilvet.Apply();
            }
            if (lapaisy == null || taivas == null || ap == null || apLapaisy == null)
            {
                Debug.Log($"MATKAKIRJA kaupunki: ilmakehä PUUTTUU: läpäisy {(lapaisy != null)}, taivas {(taivas != null)}, ilmaperspektiivi {(ap != null)}/{(apLapaisy != null)} (läpäisy-TextAsset {(l != null ? l.bytes.Length.ToString() : "null")} t)");
                puuttuu = true; return false;
            }
            Shader.SetGlobalTexture(IdLapaisy, lapaisy); Shader.SetGlobalTexture(IdTaivas, taivas); Shader.SetGlobalTexture(IdAp, ap);
            Shader.SetGlobalTexture(IdApLapaisy, apLapaisy); Shader.SetGlobalTexture(IdPilvet, pilvet);
            ladattu = true;
            Debug.Log("MATKAKIRJA kaupunki: ilmakehän LUTit ladattu (taivas 96×64×96, ilmaperspektiivi 32×32×96, läpäisy 256×64, pilvet)");
            return true;
        }

        /// <summary>Joka kehys (KaupunkiKuva): kameran korkeus maasta (m), auringon korkeus ja atsimuutti (astetta; x itä, z pohjoinen),
        /// pilvisyys 0–1, tuulen siirtymä (m), maailman mittakaava (maailmayksikköä metriä kohden, georeferenssin skaala).</summary>
        public static void Paivita(double lat, double lon, float korkeusM, float aurinkoKorkeusAst, float aurinkoAtsimuuttiAst, float pilvisyys, Vector2 tuuliM, float mitta)
        {
            Kaupunki(lat, lon);
            voima = Mathf.MoveTowards(voima, Paalla ? 1f : 0f, Time.unscaledDeltaTime);
            if (voima <= 0f && !Paalla && !KaupunkiVesi.Nakyvissa) return;   // vesi tarvitsee taivaan arvot heijastukseen
            if (!Lataa()) { voima = 0f; return; }
            float k = aurinkoKorkeusAst * Mathf.Deg2Rad, a = aurinkoAtsimuuttiAst * Mathf.Deg2Rad;
            var s = new Vector3(Mathf.Cos(k) * Mathf.Sin(a), Mathf.Sin(k), Mathf.Cos(k) * Mathf.Cos(a));
            Shader.SetGlobalVector(IdAurinko, new Vector4(s.x, s.y, s.z, 90f - aurinkoKorkeusAst));
            Shader.SetGlobalVector(IdParam, new Vector4(Mathf.Max(0f, korkeusM), Valotus, ApVoima * voima, voima));
            // Kuuro (LS1): peitto lähes täyteen, pilvet tummuvat, varjot vahvistuvat; märkyys laattoihin (Ydin KaupunkiKuuro).
            pilvisyys = (float)Matkakirja.Linssit.Kierros.KaupunkiKuuro.Peitto(Mathf.Clamp01(pilvisyys));
            float tumma = (float)Matkakirja.Linssit.Kierros.KaupunkiKuuro.Tummuus;
            Shader.SetGlobalVector(IdPilviParam, new Vector4(pilvisyys, VarjoVoima * voima * (1f + tumma), PilviJaksoM, PilviKorkeusM));
            Shader.SetGlobalVector(IdSaa, new Vector4((float)Matkakirja.Linssit.Kierros.KaupunkiKuuro.Markyys * voima, tumma, 0f, 0f));
            Shader.SetGlobalVector(IdTuuli, new Vector4(tuuliM.x, tuuliM.y, 0f, 0f));
            Shader.SetGlobalVector(IdMaailma, new Vector4(1f / Mathf.Max(1e-6f, mitta), 0f, 0f, 0f));
            Shader.SetGlobalVector(IdPilviKerros, new Vector4(Pilvet && Paalla ? 1f : 0f, PilviKorkeusM, PilviPaksuusM, 0f));
        }

        /// <summary>Kupolin materiaali (IlmakehaTaivas), null jos pois tai LUTit puuttuvat (silloin vanha DioraamaTaivas).</summary>
        public static Material TaivasMateriaali()
        {
            if (!Paalla || !Lataa()) return null;
            var sh = Shader.Find("Matkakirja/Linssit/IlmakehaTaivas");
            if (sh == null || !sh.isSupported) { Debug.Log("MATKAKIRJA kaupunki: ilmakehän taivasvarjostin ei käytettävissä, vanha kupoli"); return null; }
            return new Material(sh) { name = "KaupunkiKuva:ilmakehä" };
        }

        /// <summary>Googlen tilesetin materiaali (IlmakehaLaatat: Cesiumin unlit-ominaisuudet + ilmaperspektiivi ja pilvien varjot).</summary>
        public static Material LaattaMateriaali()
        {
            if (!Paalla || !Lataa()) return null;
            if (laattaMat != null) return laattaMat;   // yksi materiaali koko istunnolle (LS1:n katselmointi: ei uutta joka avauksella)
            var sh = Shader.Find("Matkakirja/Linssit/IlmakehaLaatat");
            if (sh == null || !sh.isSupported) { Debug.Log("MATKAKIRJA kaupunki: ilmakehän laattavarjostin ei käytettävissä, Cesiumin oma"); return null; }
            return laattaMat = new Material(sh) { name = "CesiumKaupunki:ilmakehä" };
        }
        static Material laattaMat;

        public static string Kuvaus() => $"ilmakehä {(Paalla ? "päällä" : "pois")} (voima {voima:F2}, valotus {Valotus:F0}, pilvikerros {(Pilvet ? "päällä" : "pois")}, LUTit {(ladattu ? "ladattu" : puuttuu ? "PUUTTUU" : "ei vielä")})";
    }
}
