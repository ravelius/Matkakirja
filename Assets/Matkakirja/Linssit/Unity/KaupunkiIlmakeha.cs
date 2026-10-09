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
        /// <summary>Kauko-utu (omistaja 9.10. "vähän sumua kauemmas (ehkä)", maltillisesti): ilmaperspektiivin matka × kerroin.
        /// Aamusumu veden yllä: auringon noustessa (itä, korkeus −2…14°) Aamusumu × häivytys (VesiPinta, toinen kerros).</summary>
        public static float KaukoUtu = 1.4f, Aamusumu = 1f;
        /// <summary>Yötila = loppuilta (omistaja 9.10.: "taivaassa näkyisi vielä purppuraa"): yövalinnalla ilmakehän aurinko enintään
        /// IltaAurinkoAst horisontin alla (sininen hetki, purppura ja iltarusko taivaanrannassa); kaupungin valot LS1:n yötilan mukaan.</summary>
        public static float IltaAurinkoAst = -7f;
        /// <summary>Valotuksen kerroin hämärässä (aurinko −7°): taivaan purppura ja iltarusko näkyviin (LUT:n radianssi on pieni).</summary>
        public static float HamaraValotus = 18f;
        /// <summary>Kameran korkeus maasta (m) viimeisestä Paivita-kutsusta (CesiumKaupunki: aluskerros korkealla).</summary>
        public static float KameraKorkeusM;
        /// <summary>SADEPILVET (PT junaan 171: "tummat matalat pilvet"): kuuron tummuus laskee pilvikerroksen pohjan SadePohjaM:iin ja
        /// paksuntaa sen SadePaksuusM:iin (nimbostratus); pohja pysyy vähintään 150 m kameran yläpuolella (kerros näkyy alhaalta).</summary>
        public static float SadePohjaM = 700f, SadePaksuusM = 1800f;
        static Vector3 salamaSuunta = Vector3.up; static float salamaVoima, salamaAika = -10f;
        /// <summary>LS1:n salama (juna 171): välähdys pilviin suunnassa (maailma, kamerasta salamaan), voima 0–1. Kutsu välähdyksen
        /// ajan joka kehys; vaimenee itse 0,3 s:ssa viimeisestä kutsusta.</summary>
        public static void Salama(Vector3 suunta, float voima)
        {
            if (suunta.sqrMagnitude > 1e-6f) salamaSuunta = suunta.normalized;
            salamaVoima = Mathf.Clamp01(voima); salamaAika = Time.unscaledTime;
        }
        /// <summary>Sinisen hetken gradientin voima (asetus "sininenhetki"; 0 = vain fysikaalinen taivas).</summary>
        public static float SininenHetki = 1f;
        static float taivasValotus = 1f;
        public static bool IltaYolla = true;
        /// <summary>Kaupungin valojen osuus 0–1 (KaupunkiKuva, LS1:n KaupunkiYovalot): valojen heijastus omaan veteen (Natiiviseppä 9.10.:
        /// Seine yöllä lähes musta).</summary>
        public static float YoOsuus;
        public static float Valotus = 12f, ApVoima = 1f, VarjoVoima = 0.45f, PilviJaksoM = 30000f, PilviKorkeusM = (float)Matkakirja.Linssit.Ilmakeha.KaupunkiPilvet.PohjaM;
        /// <summary>Pallon pilvikerros taivaskupolissa (raportin kohta 6a; omistaja 9.10. "pilviä voisi vähän lisätä taivaalle"): oletus
        /// päällä kehityskaupungeissa (kuten ilmakehä), asetus "pilvet 0|1" pakottaa. Pohja = PilviKorkeusM, paksuus PilviPaksuusM.</summary>
        public static bool? PilvetPakotettu;
        public static bool Pilvet => PilvetPakotettu ?? kehitys;
        /// <summary>Tuuli (m/s, x itä, y pohjoinen): pilvikentän ja pilvien varjojen siirtymä sekä laivojen savu (VeneSavu).</summary>
        public static Vector2 TuuliMs = new Vector2(6f, 2f);
        public static float PilviPaksuusM = (float)Matkakirja.Linssit.Ilmakeha.KaupunkiPilvet.PaksuusM;
        static float voima;
        static Texture2D lapaisy, pilvet; static Texture3D taivas, ap, apLapaisy;
        static bool ladattu, puuttuu;
        static readonly int IdLapaisy = Shader.PropertyToID("_IlmLapaisy"), IdTaivas = Shader.PropertyToID("_IlmTaivas"), IdAp = Shader.PropertyToID("_IlmAp"),
            IdApLapaisy = Shader.PropertyToID("_IlmApLapaisy"), IdPilvet = Shader.PropertyToID("_IlmPilvet"), IdAurinko = Shader.PropertyToID("_IlmAurinko"),
            IdParam = Shader.PropertyToID("_IlmParam"), IdPilviParam = Shader.PropertyToID("_IlmPilviParam"), IdTuuli = Shader.PropertyToID("_IlmTuuli"),
            IdMaailma = Shader.PropertyToID("_IlmMaailma"), IdPilviKerros = Shader.PropertyToID("_IlmPilviKerros"), IdSaa = Shader.PropertyToID("_IlmSaa"), IdHamara = Shader.PropertyToID("_IlmHamara"), IdSalama = Shader.PropertyToID("_IlmSalama");

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
            Kaupunki(lat, lon); KameraKorkeusM = korkeusM;
            if (IltaYolla && KaupunkiKuva.Nyt == "yo") aurinkoKorkeusAst = Mathf.Max(aurinkoKorkeusAst, IltaAurinkoAst);
            voima = Mathf.MoveTowards(voima, Paalla ? 1f : 0f, Time.unscaledDeltaTime);
            Shader.SetGlobalVector(IdHamara, Vector4.zero);   // varhaisessa paluussa ei vanhaa sinistä hetkeä
            if (voima <= 0f && !Paalla && !KaupunkiVesi.Nakyvissa) return;   // vesi tarvitsee taivaan arvot heijastukseen
            if (!Lataa()) { voima = 0f; return; }
            float k = aurinkoKorkeusAst * Mathf.Deg2Rad, a = aurinkoAtsimuuttiAst * Mathf.Deg2Rad;
            var s = new Vector3(Mathf.Cos(k) * Mathf.Sin(a), Mathf.Sin(k), Mathf.Cos(k) * Mathf.Cos(a));
            Shader.SetGlobalVector(IdAurinko, new Vector4(s.x, s.y, s.z, 90f - aurinkoKorkeusAst));
            // Hämärän valotus (simu 9.10. 03.5x: loppuillan taivas täysin musta): silmä sopeutuu, joten valotus kasvaa auringon laskiessa
            // horisontin alle (−7°: ×HamaraValotus), muuten hämärätaivaan radianssi (~1/100 päivästä) häviää mustaan.
            float hamara = Mathf.Clamp01(-aurinkoKorkeusAst / 7f);
            Shader.SetGlobalVector(IdParam, new Vector4(Mathf.Max(0f, korkeusM), Valotus, ApVoima * voima, voima));
            taivasValotus = Mathf.Lerp(1f, HamaraValotus, hamara * hamara);   // vain taivas ja veden heijastus (_IlmMaailma.w)
            // Kuuro (LS1): peitto lähes täyteen, pilvet tummuvat, varjot vahvistuvat; märkyys laattoihin (Ydin KaupunkiKuuro).
            pilvisyys = (float)Matkakirja.Linssit.Kierros.KaupunkiKuuro.Peitto(Mathf.Clamp01(pilvisyys));
            float tumma = (float)Matkakirja.Linssit.Kierros.KaupunkiKuuro.Tummuus;
            Shader.SetGlobalVector(IdPilviParam, new Vector4(pilvisyys, VarjoVoima * voima * (1f + tumma), PilviJaksoM, PilviKorkeusM));
            Shader.SetGlobalVector(IdSaa, new Vector4((float)Matkakirja.Linssit.Kierros.KaupunkiKuuro.Markyys * voima, tumma,
                (float)Matkakirja.Linssit.Ilmakeha.AamuSumu.Voima(aurinkoKorkeusAst, aurinkoAtsimuuttiAst) * Aamusumu,
                (float)Matkakirja.Linssit.Kierros.KaupunkiKuuro.Sateenkaari(aurinkoKorkeusAst) * voima));
            Shader.SetGlobalVector(IdTuuli, new Vector4(tuuliM.x, tuuliM.y, 0f, 0f));
            Shader.SetGlobalVector(IdMaailma, new Vector4(1f / Mathf.Max(1e-6f, mitta), Mathf.Max(1f, KaukoUtu), YoOsuus, taivasValotus));
            float pohjaNyt = Mathf.Max(Mathf.Lerp(PilviKorkeusM, SadePohjaM, tumma), korkeusM + 150f), paksuusNyt = Mathf.Lerp(PilviPaksuusM, SadePaksuusM, tumma);
            Shader.SetGlobalVector(IdPilviKerros, new Vector4(Pilvet && Paalla ? 1f : 0f, pohjaNyt, paksuusNyt, 0f));
            float salamaNyt = salamaVoima * Mathf.Clamp01(1f - (Time.unscaledTime - salamaAika) / 0.3f);
            Shader.SetGlobalVector(IdSalama, new Vector4(salamaSuunta.x, salamaSuunta.y, salamaSuunta.z, salamaNyt));
            // Sininen hetki (PT 9.10., Ilmakeha.hlsl IlmSininenHetki): täysi auringon ollessa ≤ −7° (yö-valinta = loppuilta), valotuksen
            // kompensointi jälkikäsittelyn EV:stä (KaupunkiKuva.KoriValotusEV, loppuillalla ~−1,5), rajattu 1–4.
            float sininen = Mathf.Clamp01((-aurinkoKorkeusAst - 2f) / 5f) * SininenHetki * voima;
            Shader.SetGlobalVector(IdHamara, new Vector4(sininen, Mathf.Clamp(Mathf.Pow(2f, -KaupunkiKuva.KoriValotusEV), 1f, 4f), 0f, 0f));
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
