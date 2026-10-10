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
            kaupunkiId = Matkakirja.Linssit.Kehityskaupungit.Lahella(lat, lon);
            bool k = kaupunkiId != null;
            if (k != kehitys || !kaupunkiKirjattu) { kaupunkiKirjattu = true; Debug.Log($"MATKAKIRJA kaupunki: ilmakehä kaupunki {lat:F4},{lon:F4} → kehityskaupunki {k}, pakotettu {(Pakotettu?.ToString() ?? "-")}"); }
            kehitys = k;
            LataaAerosoli(Matkakirja.Linssit.Kehityskaupungit.Lahella(lat, lon));
            PaivitaPilviIlmasto(Matkakirja.Linssit.Kehityskaupungit.Lahella(lat, lon));
        }

        // PILVIEN ILMASTO (LS2 10.10.; Karttaseppä ilmakeha/pilvet-v1, METAR 2016–2025): pilvikerroksen pohja ja paksuus kaupungin ja
        // kauden mukaan (Ydin PilviKaudet, pohja ≥ 900 m pallon yläpuolelle); asetukset "pilvipohja"/"pilvipaksuus" ohittavat, "pilvi-ilmasto 0|1".
        // Ladataan kerran laitteelle (Caches, versioitu polku), sitten kaupungin vaihtuessa vain haku muistista.
        public static bool PilviIlmasto = true, PilviAsetettu;
        static string pilviJson, pilviAvain; static bool pilviPyydetty;
        static void PaivitaPilviIlmasto(string id)
        {
            if (!PilviIlmasto || PilviAsetettu || id == null) return;
            string avain = id + "/" + Kausi(System.DateTime.Now.Month);
            if (pilviJson != null)
            {
                if (avain == pilviAvain) return;
                pilviAvain = avain;
                if (Matkakirja.Linssit.Ilmakeha.PilviKaudet.Hae(pilviJson, id, Kausi(System.DateTime.Now.Month)) is { } k)
                {
                    PilviKorkeusM = (float)k.PohjaM; PilviPaksuusM = (float)k.PaksuusM;
                    Debug.Log($"MATKAKIRJA kaupunki: pilvet {avain} (METAR): {k}");
                }
                return;
            }
            if (pilviPyydetty) return;
            pilviPyydetty = true;
            string tiedosto = System.IO.Path.Combine(Application.temporaryCachePath, "ilmakeha", "pilvet-v1", "pilvet-kaudet.json");
            try { if (System.IO.File.Exists(tiedosto)) { pilviJson = System.IO.File.ReadAllText(tiedosto); PaivitaPilviIlmasto(id); return; } }
            catch (System.Exception e) { Debug.Log($"MATKAKIRJA kaupunki: pilvet: välimuisti: {e.Message}"); }
            var r = UnityEngine.Networking.UnityWebRequest.Get(Matkakirja.Linssit.Ilmakeha.PilviKaudet.Osoite);
            r.timeout = 20;
            r.SendWebRequest().completed += _ =>
            {
                if (r.result == UnityEngine.Networking.UnityWebRequest.Result.Success && !string.IsNullOrEmpty(r.downloadHandler.text))
                {
                    pilviJson = r.downloadHandler.text;
                    try { System.IO.Directory.CreateDirectory(System.IO.Path.GetDirectoryName(tiedosto)); System.IO.File.WriteAllText(tiedosto, pilviJson); }
                    catch (System.Exception e) { Debug.Log($"MATKAKIRJA kaupunki: pilvet: välimuistiin: {e.Message}"); }
                    PaivitaPilviIlmasto(id);
                }
                else { Debug.Log($"MATKAKIRJA kaupunki: pilvet-kaudet ei latautunut ({r.error}), kiinteä pohja {PilviKorkeusM:F0} m"); pilviPyydetty = false; }
                r.Dispose();
            };
        }

        static string kaupunkiId;

        // OMIEN MALLIEN AURINKO (LS2 10.10.; PT laattavarjo-KOE: klo 16 omien mallien varjopuoli kääntyi, Googlen laatat pysyivät
        // kuvauslennon valossa). Laattojen valo on leivottu kuvauslennon auringosta, joten omat mallit (OmaMalli.shader, OmatVarjot)
        // valaistaan sen atsimuutista, mitattu kaupungeittain laattojen varjoista ylhäältä (laattavarjo-KOE 3a); vain korkeus seuraa
        // vuorokautta. Taivas, ilmaperspektiivi, pilvet ja vesi käyttävät todellista aurinkoa (_IlmAurinko).
        // Asetukset "omaleivottu 0|1" ja "omaatsimuutti <°>" (< 0 = kaupungin mitattu).
        public static bool OmaLeivottu = true;
        public static float OmaAtsimuuttiPakotettu = -1f;
        // Mittaus 10.10. 02.5x (ylhäältä 1°, pohjoinen ylös): Tukholma kaupungintalo ja Riddarholmen, varjot luoteeseen, pihojen eteläosa
        // varjossa → aurinko ~145° (±15°). Pariisi: varjot heikot (kesäillan kuvaus), pihojen länsi- ja pohjoisosa varjossa, etelään
        // antavat julkisivut tummia, Panthéonin kupoli valoisa luoteesta → ~300° (±20°).
        static readonly (string Id, float Atsimuutti)[] LeivottuAtsimuutti = { ("pariisi", 300f), ("tukholma", 145f) };
        /// <summary>Omien mallien auringon atsimuutti (°, 0 pohjoinen, 90 itä): leivottu kaupungissa, muuten todellinen.</summary>
        public static float OmaAtsimuutti(float todellinen)
        {
            if (OmaAtsimuuttiPakotettu >= 0f) return OmaAtsimuuttiPakotettu;
            if (!OmaLeivottu) return todellinen;
            foreach (var l in LeivottuAtsimuutti) if (l.Id == kaupunkiId) return l.Atsimuutti;
            return todellinen;
        }

        // MITATTU UTU (PT 9.10. ilta hyväksyi utu-A/B:n suosituksen; Karttaseppä ilmakeha-aerosoli-20261009): kaupungin ja vuodenajan
        // AERONET-aerosoli (AOD 550 Pariisi 0,11–0,17, Tukholma 0,07–0,10; Resourcesin taulukoissa ~0,005). Taulukot ämpäristä
        // (4 tiedostoa ~6,4 Mt/setti, sama muoto kuin Resources/Ilmakeha), varana Resourcesin taulukot. Mitatuilla taulukoilla kaukoutu
        // 1,4 → 1,0 (alaraja 1; kokeen "0,5" rajautui 1:een, joten hyväksytty kuva on 1,0) ja ilmaperspektiivin voima 1,0 → 0,7. Asetus "aerosoli 0|1".
        public static bool Aerosoli = true;
        public static string AerosoliJuuri = "https://media.matkakirja.app/ilmakeha/aerosoli-v1/";
        public static float KaukoUtuMitattu = 1f, ApVoimaMitattu = 0.7f;
        static string aerosoliAvain, aerosoliPyydetty;
        static Texture2D aLapaisy; static Texture3D aTaivas, aAp, aApLapaisy;
        static bool AerosoliKaytossa => Aerosoli && aerosoliAvain != null && aTaivas != null;
        static float KaukoUtuNyt => AerosoliKaytossa ? KaukoUtuMitattu : KaukoUtu;
        static float ApVoimaNyt => AerosoliKaytossa ? ApVoimaMitattu : ApVoima;
        /// <summary>Pohjoisen pallonpuoliskon kausi kuukaudesta (joulu–helmi talvi; Karttasepän kansiot).</summary>
        public static string Kausi(int kuukausi) => kuukausi == 12 || kuukausi <= 2 ? "talvi" : kuukausi <= 5 ? "kevat" : kuukausi <= 8 ? "kesa" : "syksy";

        static void LataaAerosoli(string id)
        {
            if (!Aerosoli || id == null) return;
            string avain = id + "/" + Kausi(System.DateTime.Now.Month);
            if (avain == aerosoliAvain || avain == aerosoliPyydetty) return;
            aerosoliPyydetty = avain;
            var nimet = new[] { "lapaisy", "taivas", "ilmaperspektiivi", "ilmaperspektiivi-lapaisy" };
            var koot = new[] { 256 * 64 * 8, 96 * 64 * 96 * 8, 32 * 32 * 96 * 8, 32 * 32 * 96 * 8 };
            var tavut = new byte[nimet.Length][]; int valmiit = 0;
            // LEVYVÄLIMUISTI (Natiivisepän ehto junaan 174): versioitu polku (aerosoli-v1 muuttumaton), ladataan vain kerran per laite.
            string kansio = System.IO.Path.Combine(Application.temporaryCachePath, "ilmakeha", "aerosoli-v1", avain);   // Caches (ei iCloud-varmuuskopiota; Natiiviseppä)
            for (int i = 0; i < nimet.Length; i++)
            {
                int n = i;
                string tiedosto = System.IO.Path.Combine(kansio, nimet[n] + ".bytes");
                try { if (System.IO.File.Exists(tiedosto) && new System.IO.FileInfo(tiedosto).Length == koot[n]) tavut[n] = System.IO.File.ReadAllBytes(tiedosto); }
                catch (System.Exception e) { Debug.Log($"MATKAKIRJA kaupunki: ilmakehä: välimuisti {nimet[n]}: {e.Message}"); }
                if (tavut[n] != null) { if (++valmiit == nimet.Length) Valmis(); continue; }
                var r = UnityEngine.Networking.UnityWebRequest.Get(AerosoliJuuri + avain + "/" + nimet[n] + ".bytes");
                r.timeout = 30;
                r.SendWebRequest().completed += _ =>
                {
                    if (r.result == UnityEngine.Networking.UnityWebRequest.Result.Success)
                    {
                        tavut[n] = r.downloadHandler.data;
                        if (tavut[n]?.Length == koot[n])
                            try { System.IO.Directory.CreateDirectory(kansio); System.IO.File.WriteAllBytes(tiedosto, tavut[n]); }
                            catch (System.Exception e) { Debug.Log($"MATKAKIRJA kaupunki: ilmakehä: välimuistiin {nimet[n]}: {e.Message}"); }
                    }
                    r.Dispose();
                    if (++valmiit == nimet.Length) Valmis();
                };
            }
            void Valmis()
            {
                    if (aerosoliPyydetty != avain) return;
                    if (tavut[0]?.Length != 256 * 64 * 8 || tavut[1]?.Length != 96 * 64 * 96 * 8 || tavut[2]?.Length != 32 * 32 * 96 * 8 || tavut[3]?.Length != 32 * 32 * 96 * 8)
                    { Debug.Log($"MATKAKIRJA kaupunki: ilmakehä: mitattu utu {avain} ei latautunut, Resourcesin taulukot"); aerosoliPyydetty = null; return; }
                    PoistaAerosoli();
                    aLapaisy = new Texture2D(256, 64, TextureFormat.RGBAHalf, false, true) { name = "Ilmakeha:lapaisy:" + avain, wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
                    aLapaisy.LoadRawTextureData(tavut[0]); aLapaisy.Apply(false, true);
                    aTaivas = Tee3D(tavut[1], 96, 64, 96, "taivas:" + avain); aAp = Tee3D(tavut[2], 32, 32, 96, "ap:" + avain); aApLapaisy = Tee3D(tavut[3], 32, 32, 96, "ap-lapaisy:" + avain);
                    aerosoliAvain = avain; AsetaTaulukot();
                    Debug.Log($"MATKAKIRJA kaupunki: ilmakehä: mitattu utu {avain} (AERONET), kaukoutu {KaukoUtuMitattu:F1}, ilmaperspektiivi {ApVoimaMitattu:F1}");
            }
        }

        static Texture3D Tee3D(byte[] b, int w, int h, int d, string nimi)
        {
            var x = new Texture3D(w, h, d, TextureFormat.RGBAHalf, false) { name = "Ilmakeha:" + nimi, wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            x.SetPixelData(b, 0); x.Apply(false, true); return x;
        }

        static void PoistaAerosoli()
        {
            if (aLapaisy != null) Object.Destroy(aLapaisy);
            if (aTaivas != null) Object.Destroy(aTaivas);
            if (aAp != null) Object.Destroy(aAp);
            if (aApLapaisy != null) Object.Destroy(aApLapaisy);
            aLapaisy = null; aTaivas = aAp = aApLapaisy = null; aerosoliAvain = null;
        }

        /// <summary>Globaalit taulukot: mitattu utu, jos ladattu ja päällä, muuten Resourcesin.</summary>
        static void AsetaTaulukot()
        {
            if (!ladattu) return;
            bool m = AerosoliKaytossa;
            Shader.SetGlobalTexture(IdLapaisy, m ? aLapaisy : lapaisy); Shader.SetGlobalTexture(IdTaivas, m ? (Texture)aTaivas : taivas);
            Shader.SetGlobalTexture(IdAp, m ? (Texture)aAp : ap); Shader.SetGlobalTexture(IdApLapaisy, m ? (Texture)aApLapaisy : apLapaisy);
        }
        static bool asetettuMitattu;
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
            IdOmaAurinko = Shader.PropertyToID("_OmaAurinko"),
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
            Shader.SetGlobalTexture(IdPilvet, pilvet);
            ladattu = true; AsetaTaulukot();
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
            float oa = OmaAtsimuutti(aurinkoAtsimuuttiAst) * Mathf.Deg2Rad;   // omat mallit: leivottu atsimuutti, sama korkeus
            Shader.SetGlobalVector(IdOmaAurinko, new Vector4(Mathf.Cos(k) * Mathf.Sin(oa), s.y, Mathf.Cos(k) * Mathf.Cos(oa), 90f - aurinkoKorkeusAst));
            // Hämärän valotus (simu 9.10. 03.5x: loppuillan taivas täysin musta): silmä sopeutuu, joten valotus kasvaa auringon laskiessa
            // horisontin alle (−7°: ×HamaraValotus), muuten hämärätaivaan radianssi (~1/100 päivästä) häviää mustaan.
            float hamara = Mathf.Clamp01(-aurinkoKorkeusAst / 7f);
            if (asetettuMitattu != AerosoliKaytossa) { asetettuMitattu = AerosoliKaytossa; AsetaTaulukot(); }   // asetus "aerosoli" kesken näkymän
            Shader.SetGlobalVector(IdParam, new Vector4(Mathf.Max(0f, korkeusM), Valotus, ApVoimaNyt * voima, voima));
            taivasValotus = Mathf.Lerp(1f, HamaraValotus, hamara * hamara);   // vain taivas ja veden heijastus (_IlmMaailma.w)
            // Kuuro (LS1): peitto lähes täyteen, pilvet tummuvat, varjot vahvistuvat; märkyys laattoihin (Ydin KaupunkiKuuro).
            pilvisyys = (float)Matkakirja.Linssit.Kierros.KaupunkiKuuro.Peitto(Mathf.Clamp01(pilvisyys));
            float tumma = (float)Matkakirja.Linssit.Kierros.KaupunkiKuuro.Tummuus;
            Shader.SetGlobalVector(IdPilviParam, new Vector4(pilvisyys, VarjoVoima * voima * (1f + tumma), PilviJaksoM, PilviKorkeusM));
            Shader.SetGlobalVector(IdSaa, new Vector4((float)Matkakirja.Linssit.Kierros.KaupunkiKuuro.Markyys * voima, tumma,
                (float)Matkakirja.Linssit.Ilmakeha.AamuSumu.Voima(aurinkoKorkeusAst, aurinkoAtsimuuttiAst) * Aamusumu,
                (float)Matkakirja.Linssit.Kierros.KaupunkiKuuro.Sateenkaari(aurinkoKorkeusAst) * voima));
            Shader.SetGlobalVector(IdTuuli, new Vector4(tuuliM.x, tuuliM.y, 0f, 0f));
            Shader.SetGlobalVector(IdMaailma, new Vector4(1f / Mathf.Max(1e-6f, mitta), Mathf.Max(1f, KaukoUtuNyt), YoOsuus, taivasValotus));
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
