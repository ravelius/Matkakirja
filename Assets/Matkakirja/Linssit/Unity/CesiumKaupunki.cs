// CESIUM-KAUPUNKINÄKYMÄ (Linssiseppä 5.10.2026): yhteinen osa kaupunkikierrokselle (KierrosSovitin) ja elävälle oppaalle
// (OpasSovitin). Luo Cesium ionin tilesetit pallon georeferenssiin, piilottaa oman pallon ja pergamenttipohjan, siirtää origon,
// pitää esilatauskameran ja Cesiumin krediitit ruudulla ja palauttaa kaiken sulkiessa.
//
// DATA: Google Photorealistic 3D Tiles (ion 2275207; omistaja 17.4x, kehitys/testi) yksinään, tai World Terrain (1) + Bing (2)
// + OSM Buildings (96188). Jos Googlen tileset ei lataudu (tunnuksella ei oikeutta → 401/404), näkymä vaihtaa itse ionin
// erillisdataan ja kirjaa syyn. EHDOT: kaupunkinäkymässä vain valitun lähteen data — oma pallo ja Pohjapallo piiloon, siirtymä
// mustan avausruudun kautta, Googlen/Bingin logo ja tekijätiedot muuttamattomina ruudulle, ei offline-tallennusta (vain Cesiumin
// oma välimuisti otsakkeiden max-age-rajoissa), ei omia malleja Googlen sisällöstä.
//
// TUNNUS: ei repoon eikä käännökseen; laitteen Documents/cesium-ion-tunnus.txt (kehitys) — ei lokiin.
// KAMERA: pallon oma kamera PalloKierto.Kuvaa-metodilla ennen Cesiumin laattavalintaa (KyydinKameraEnnen, −50). ESILATAUS:
// piilokamera additionalCameras-listassa (native CameraManager ottaa myös pois päältä olevat kamerat).
using System;
using System.Collections.Generic;
using System.IO;
using CesiumForUnity;
using Matkakirja.Linssit;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class CesiumKaupunki
    {
        public const float MaastoSse = 16f, RakennusSse = 24f, GoogleSse = 16f;
        /// <summary>
        /// MUISTIKATTO (Päätoimittaja 5.10. 18.5x, pakollinen ennen koetta): simun RSS nousi Google-SSE 12:lla 1,6 → 5,3 Gt ja SSE 8:lla
        /// 7,7 Gt. Välimuisti (maximumCachedBytes: käyttämättömät laatat) 256 Mt ja Googlen SSE vähintään GoogleSseMin
        /// kuvanlaadun asetuksista riippumatta (KaupunkiKuva voi nostaa, ei laskea alle). Rinnakkaiset lataukset 8.
        /// </summary>
        public const long MaastoValimuisti = 128L << 20, RakennusValimuisti = 192L << 20, GoogleValimuisti = 256L << 20;
        public const float GoogleSseMin = 16f;
        /// <summary>
        /// SSE NÄYTÖN KORKEUDEN MUKAAN (omistajan iPad Pro kaatui 6.10. kahdesti oppaan kohteen latauksessa): Cesiumin näyttövirhe on
        /// pikseleinä näkymän korkeudesta, joten iPad Pro 13" (2064 px vaaka) tarkentaa 1,7× syvemmälle ja lataa ~3× laattoja kuin
        /// iPhone (1206 px), jolla muistikatto mitattiin. SSE kerrotaan lyhyen sivun suhteella viitekorkeuteen (ei koskaan alle 1):
        /// sama kulmatarkkuus ja laattamäärä kuin iPhonella.
        /// </summary>
        public const float ViiteKorkeusPx = 1206f;
        /// <summary>Näytön kerroin (iPhone-vastaava laattamäärä): iPad Pro 13" 1,71, iPhone 1.</summary>
        public static float NayttoKerroin => Mathf.Max(1f, Mathf.Min(Screen.width, Screen.height) / ViiteKorkeusPx);
        /// <summary>Käytössä oleva kerroin: avauksessa vapaan muistin mukaan valittu (ValitseKerroin), muuten näytön kerroin.</summary>
        public static float SseKerroin => kerroin > 0f ? kerroin : NayttoKerroin;
        static float kerroin = -1f;
        /// <summary>Googlen välimuisti tälle avaukselle (KaupunkiMuistibudjetti; oletus GoogleValimuisti 256 Mt).</summary>
        static long googleValimuisti = GoogleValimuisti;

        // ---- KAKSIVAIHEINEN TARKKUUS (Päätoimittaja 6.10. 19.3x, juna 153: TF 151 ajaa omistajan iPad Prolla kertoimella ~1,0, ja
        // simussa 1,00 latautui ~3× hitaammin kuin 1,71) ----
        // Tilesetin SSE on tavoitetarkkuudella (kerroin ≥ AlarajaKerroin), mutta lennon, siirron ja saapumisen ajan laatat
        // valitaan KARKEALLA kameralla, jonka pikselikorkeus on kerroin/NayttoKerroin pääkamerasta (näyttövirhe ∝ pikselikorkeus,
        // ks. Kartta/LiikeLaatat.cs: sama valinta kuin SSE × NayttoKerroin ILMAN tilesetin uudelleenluontia). Kun laatat ≥ 99 % ja
        // kamera on paikallaan (sovitin: Tarkenna), valinta siirtyy pääkameraan ja lisätarkkuus tulee tarkentumisena.
        public const float AlarajaKerroin = 1.3f;

        // ---- MAC-LAATU (Natiiviseppä 7.10. 01.3x, natiiviseppa/mac MacLaatu; omistajan MacBook Air M4 16 Gt) ----
        // Macilla tarkkuus tulee MacLaatu-profiilista (fyysinen ja vapaa muisti), ei näytön koosta eikä alarajakertoimesta;
        // välimuisti profiilista; kuorma (lämpö, kehysaika) > KuormaRaja → laatat valitaan karkealla kameralla pikselikertoimella
        // 1/Kuorma myös levossa, ilman tilesetin uudelleenluontia.
#if UNITY_STANDALONE_OSX
        static bool Mac => Matkakirja.MacLaatu.Kaytossa;
        static float MacKuorma => Mac ? Mathf.Max(1f, Matkakirja.MacLaatu.Kuorma) : 1f;
        static long GoogleValimuistiNyt => Mac && Matkakirja.MacLaatu.Valimuisti > 0 ? Matkakirja.MacLaatu.Valimuisti : googleValimuisti;
#else
        static bool Mac => false;
        static float MacKuorma => 1f;
        static long GoogleValimuistiNyt => googleValimuisti;
#endif
        public const float KuormaRaja = 1.05f, KuormaPois = 1.02f;
        bool kuormaValinta;
        Camera karkea;
        bool karkeaKaytossa;
        float karkeaAlku = -1f, tarkkaAlku = -1f;
        /// <summary>Karkean kameran pikselikerroin (1 = ei karkeaa vaihetta, iPhone).</summary>
        float KarkeaSkaala => Mathf.Clamp(Mathf.Min(Mac ? 1f : SseKerroin / NayttoKerroin, 1f / MacKuorma), 0.2f, 1f);
        public bool KarkeaKaytossa => karkeaKaytossa;

        /// <summary>Lennon, siirron tai avauksen alussa: laatat karkealla kameralla (saapuminen yhtä nopea kuin 1,71:llä).</summary>
        public void Karkeaksi()
        {
            if (!auki || hallinta == null || kamera == null || KarkeaNyt >= 0.999f || karkeaKaytossa) return;
            if (karkea == null)
            {
                karkea = new GameObject("Kaupunki karkea valinta").AddComponent<Camera>();
                karkea.transform.SetParent(kamera.transform, false);
                karkea.enabled = false; karkea.cullingMask = 0;
            }
            if (!hallinta.additionalCameras.Contains(karkea)) hallinta.additionalCameras.Add(karkea);
            hallinta.useMainCamera = false;
            if (lahiKaytossa) AsetaLahikamera(null);   // A3: lennon ajaksi pois
            karkeaKaytossa = true; karkeaAlku = Time.realtimeSinceStartup; tarkkaAlku = -1f;
            PaivitaKarkea();
            kirjaa($"kaupunki: tarkkuus karkea (valinta {NayttoKerroin:F2}, tavoite {SseKerroin:F2}, pikselit ×{KarkeaSkaala:F2})");
        }

        /// <summary>Laatat ≥ 99 % ja kamera paikallaan: valinta pääkameraan (tarkentuu tavoitekertoimeen).</summary>
        public void Tarkenna()
        {
            if (!karkeaKaytossa || hallinta == null || muistiPysaytys) return;   // muistihädässä valinta jää karkealle
            if (MacKuorma > KuormaRaja) kuormaValinta = true;   // Mac kuormassa: valinta jää karkealle (1/Kuorma)
            else
            {
                if (karkea != null) hallinta.additionalCameras.Remove(karkea);
                hallinta.useMainCamera = true;
            }
            karkeaKaytossa = false; tarkkaAlku = Time.realtimeSinceStartup; tarkkaLaski = false;
            kirjaa($"kaupunki: tarkkuus tarkentuu → {SseKerroin:F2} ({(karkeaAlku > 0 ? Time.realtimeSinceStartup - karkeaAlku : 0):F1} s karkeana)");
        }

        // ---- LÄHITARKKUUS (Linssiseppä 8.10.2026, suunnitelma A3): pysähdyksellä tarkentumisen jälkeen kohdetta kohti suunnattu
        // kapea lisäkamera Cesiumin laattavalintaan (kenttäkulma / LahiKerroin, sama pikselikorkeus): kohteen ympäriltä valitaan
        // laatat kertoimella SseKerroin / LahiKerroin (tavoite SSE 8), muu näkymä ennallaan. L samasta budjetista kuin SSE-kerroin
        // (KaupunkiMuistibudjetti.ValitseLahella). Pois lennon ja siirron ajaksi (Karkeaksi). Komento `opas lahi 0|1`.
        public static bool LahiSallittu = true;
        /// <summary>Kerroin samasta muistibudjetista kuin SSE (KaupunkiMuistibudjetti.ValitseLahella avauksessa): kohteen ympärillä SSE 8;
        /// 1 = ei lähikameraa (kevennetty laite, tuntematon muisti, koko kuva jo SSE 8 tai pakotettu kerroin).</summary>
        public static float LahiKerroin => !LahiSallittu ? 1f : lahiBudjetti;
        static float lahiBudjetti = 1f;
        Camera lahi; bool lahiKaytossa;
        public bool LahiKaytossa => lahiKaytossa;

        /// <summary>Joka kehys oppaasta: kohde maailmassa (null = pois). Vain tarkentuneena (ei karkeaa valintaa) ja Mac-kuorman alla.</summary>
        public void AsetaLahikamera(Vector3? kohde)
        {
            float k = LahiKerroin;
            bool paalle = kohde.HasValue && k > 1.01f && auki && hallinta != null && kamera != null && !karkeaKaytossa && !kuormaValinta;
            if (!paalle)
            {
                if (lahiKaytossa && hallinta != null && lahi != null) hallinta.additionalCameras.Remove(lahi);
                if (lahiKaytossa) kirjaa("kaupunki: lähitarkkuus pois");
                lahiKaytossa = false;
                return;
            }
            if (lahi == null)
            {
                lahi = new GameObject("Kaupunki lähitarkkuus").AddComponent<Camera>();
                lahi.enabled = false; lahi.cullingMask = 0;
            }
            var t = kamera.transform; var suunta = kohde.Value - t.position;
            if (suunta.sqrMagnitude < 1f) suunta = t.forward;
            lahi.transform.SetPositionAndRotation(t.position, Quaternion.LookRotation(suunta, Vector3.up));
            lahi.fieldOfView = kamera.fieldOfView / k;
            lahi.nearClipPlane = kamera.nearClipPlane; lahi.farClipPlane = kamera.farClipPlane;
            lahi.pixelRect = kamera.pixelRect; lahi.aspect = kamera.aspect;
            if (!lahiKaytossa)
            {
                if (!hallinta.additionalCameras.Contains(lahi)) hallinta.additionalCameras.Add(lahi);
                lahiKaytossa = true;
                kirjaa($"kaupunki: lähitarkkuus päällä (kenttäkulma / {k:F2}, Google-SSE kohteen ympärillä ~{GoogleSse * SseKerroin / k:F0}, muu {GoogleSse * SseKerroin:F0})");
            }
        }

        void PaivitaKarkea()
        {
            PaivitaKuormaValinta();
            if (!(karkeaKaytossa || kuormaValinta) || karkea == null || kamera == null) return;
            karkea.fieldOfView = kamera.fieldOfView;
            karkea.nearClipPlane = kamera.nearClipPlane; karkea.farClipPlane = kamera.farClipPlane;
            var r0 = kamera.pixelRect; float sk = KarkeaNyt;
            karkea.pixelRect = new Rect(r0.x, r0.y, Mathf.Max(8f, r0.width * sk), Mathf.Max(8f, r0.height * sk));
            karkea.aspect = kamera.aspect;
        }

        /// <summary>Mac levossa: kuorma yli KuormaRajan → laattavalinta karkealle kameralle (1/Kuorma), alle KuormaPoisin → pääkameraan.</summary>
        void PaivitaKuormaValinta()
        {
            if (!Mac || !auki || hallinta == null || kamera == null || karkeaKaytossa) return;
            float k = MacKuorma;
            if (!kuormaValinta && k > KuormaRaja)
            {
                if (karkea == null)
                {
                    karkea = new GameObject("Kaupunki karkea valinta").AddComponent<Camera>();
                    karkea.transform.SetParent(kamera.transform, false);
                    karkea.enabled = false; karkea.cullingMask = 0;
                }
                if (!hallinta.additionalCameras.Contains(karkea)) hallinta.additionalCameras.Add(karkea);
                hallinta.useMainCamera = false;
                kuormaValinta = true;
                kirjaa($"kaupunki: Mac-kuorma {k:F2} → laattavalinta karkealla (pikselit ×{KarkeaSkaala:F2}), profiili {MacProfiili}");
            }
            else if (kuormaValinta && k < KuormaPois)
            {
                if (karkea != null) hallinta.additionalCameras.Remove(karkea);
                hallinta.useMainCamera = true;
                kuormaValinta = false;
                kirjaa($"kaupunki: Mac-kuorma {k:F2} → laattavalinta pääkameraan");
            }
        }

#if UNITY_STANDALONE_OSX
        static string MacProfiili => Mac ? $"{Matkakirja.MacLaatu.Profiili} (SSE {Matkakirja.MacLaatu.GoogleSse:F0}, välimuisti {Matkakirja.MacLaatu.Valimuisti >> 20} Mt, kuorma {Matkakirja.MacLaatu.Kuorma:F2})" : "-";
#else
        static string MacProfiili => "-";
#endif

        /// <summary>Tarkentumisen jälkeen 99 %:iin kulunut aika lokiin kerran (latausajan mittaus).</summary>
        bool tarkkaLaski;
        void SeuraaTarkentumista()
        {
            if (tarkkaAlku < 0) return;
            // Mittaus vasta, kun uudet laatat ovat ehtineet pudottaa latausasteen (simu 19.4x: "99 % 0,0 s" samassa kehyksessä).
            if (Latausaste < ValmisProsentti) { tarkkaLaski = true; return; }
            if (!tarkkaLaski && Time.realtimeSinceStartup - tarkkaAlku < 3f) return;
            tarkkaLaski = false;
            kirjaa($"kaupunki: tarkentunut {SseKerroin:F2}:een, 99 % {Time.realtimeSinceStartup - tarkkaAlku:F1} s:ssa");
            tarkkaAlku = -1f;
        }

        /// <summary>
        /// TARKKUUS MUISTIN MUKAAN (Päätoimittaja 6.10. 16.2x, omistaja: "näkyykö grafiikka nyt huonompana"): kerroin valitaan
        /// kaupungin avautuessa os_proc_available_memory():n mukaan niin, että kaupungin arvioidun huipun jälkeen vapaata jää
        /// vähintään MarginaaliGt (muistioikeudella vara on suurempi → tarkempi kuva), aina välillä 1…NayttoKerroin.
        /// Kaupungin muistin kasvu kertoimella k ≈ KaupunkiGt × (NayttoKerroin / k)^Eksponentti, missä KaupunkiGt on laitteen
        /// kasvu iPhone-vastaavalla laattamäärällä (simu 6.10.: Akropolis 1,3 Gt × laitekerroin 1,85 ≈ 2,4 Gt) ja eksponentti
        /// laattojen ja tekstuurien mitattu riippuvuus (1396 → 743 laattaa, 1450 → 942 Mt kertoimella 1,71). Hätävahti: jos
        /// vapaa muisti laskee alle HataGt:n näkymän aikana, kerroin nousee kerran ×1,3 (laatat latautuvat uudelleen, ei kaatumista).
        /// </summary>
        public const double MarginaaliGt = 1.5, KaupunkiGt = 2.4, Eksponentti = 0.8, HataGt = 1.0;   // HataGt 0,7 → 1,0 (juna 173, PT: kaupungissa aina ~0,8–1 Gt vapaata)

        /// <summary>Prosessin vapaa muisti ennen jetsam-rajaa (tavua); −1 = ei tiedossa (editori, simu palauttaa 0).</summary>
        public static long VapaaMuisti()
        {
            // VAIN TESTIKÄYTTÖÖN (Päätoimittaja 6.10. 17.1x: still-pari simulla, kehityskäännös ei saa muistioikeutta):
            // Documents/kaupunki-vapaa-muisti.txt "7.0" = vapaa muisti 7 Gt (simu palauttaa muuten 0 → ei tiedossa).
            try
            {
                var p = Path.Combine(Application.persistentDataPath, "kaupunki-vapaa-muisti.txt");
                if (File.Exists(p) && double.TryParse(File.ReadAllText(p).Trim(), System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var gt) && gt > 0)
                    return (long)(gt * 1e9);
            }
            catch (Exception) { }
#if UNITY_IOS && !UNITY_EDITOR
            long v = (long)os_proc_available_memory();
            return v > 0 ? v : -1;
#else
            return -1;
#endif
        }
#if UNITY_IOS && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern System.UIntPtr os_proc_available_memory();
#endif

        /// <summary>Kerroin vapaasta muistista (Gt) ja näytön kertoimesta; vapaa ≤ 0 = ei tiedossa → näytön kerroin.</summary>
        public static float KerroinMuistille(double vapaaGt, float naytto)
        {
            if (naytto <= 1f || vapaaGt <= 0) return Mathf.Max(1f, naytto);
            double budjetti = vapaaGt - MarginaaliGt;
            if (budjetti <= 0.1) return naytto;
            double k = naytto * System.Math.Pow(KaupunkiGt / budjetti, 1.0 / Eksponentti);
            return Mathf.Clamp((float)k, 1f, naytto);
        }

        /// <summary>Kehittäjän kuvapari: Documents/kaupunki-sse-kerroin.txt pakottaa kertoimen (esim. 1.71 = nykyinen, 1 = täysi).</summary>
        static float PakotettuKerroin()
        {
            try
            {
                var p = Path.Combine(Application.persistentDataPath, "kaupunki-sse-kerroin.txt");
                if (File.Exists(p) && float.TryParse(File.ReadAllText(p).Trim(), System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var v) && v >= 1f) return v;
            }
            catch (Exception) { }
            return -1f;
        }

        float muistiTarkistettu, muistiKirjattu;
        bool hataKaytetty, muistiPysaytys, pysaytettyTassa, hataSeis;
        /// <summary>Hädän toinen porras (juna 173, LS1 iPad 22.4x: karkea valinta ei pysäyttänyt kasvua 1207 → 1388 laattaa): alle tämän
        /// (Gt) laattojen lataus seis (suspendUpdate; näkymä voi jäädä karkeaksi, ei kaatumista), jatkuu yli HataGt + HataPalautusGt.</summary>
        public const double HataSeisGt = 0.6;
        long minVapaa = long.MaxValue;
        /// <summary>Oppaan tauko (OpasSovitin.Tauko): laatat valmiina → lataus seis tauon ajaksi (muisti ei kasva).</summary>
        public bool Tauko;
        /// <summary>Muistihädän vapautusraja: lataus jatkuu, kun vapaata on taas HataGt + tämä (Gt).</summary>
        public const double HataPalautusGt = 0.3;
        /// <summary>Karkean valinnan pikselikerroin muistihädässä (myös iPadilla, jossa KarkeaSkaala voi olla 1).</summary>
        public const float HataSkaala = 0.5f;   // 0,6 → 0,5 (juna 173: 0,6 ei vapauttanut tarpeeksi ennen jetsamia)
        float KarkeaNyt => muistiPysaytys ? Mathf.Min(KarkeaSkaala, HataSkaala) : KarkeaSkaala;

        /// <summary>Kerran 2 s:ssa näkymän aikana. MUISTIHÄTÄ (omistaja TF 169 10.0x: tauolla Kuninkaanlinnan kohdalla koko näkymä katosi,
        /// rakentui hitaasti ja peli kaatui; LS2 + PT 9.10.): EI SSE:n eikä välimuistin vaihtoa — Cesium3DTileset-asettimet kutsuvat
        /// RecreateTileset():iä (koko tileset ladataan alusta, muistipiikki). Sen sijaan vapaa muisti alle HataGt → laattavalinta karkealle
        /// kameralle (pikselit × HataSkaala, Natiiviseppä: hienot laatat vapautuvat välimuistin rajoissa, ei recreatea) ja lähikamera pois;
        /// yli HataGt + HataPalautusGt → tarkentuu normaalisti. Testi: Documents/kaupunki-vapaa-muisti.txt "0.5".</summary>
        void Muistivahti()
        {
            if (!auki || maasto == null || Time.realtimeSinceStartup - muistiTarkistettu < 2f) return;
            muistiTarkistettu = Time.realtimeSinceStartup;
            long v = VapaaMuisti();
            if (v > 0 && v < minVapaa) minVapaa = v;
            // Laitemittaus (Päätoimittaja: huippu ja vapaa muisti ennen/jälkeen): vapaa nyt ja pienin 15 s välein.
            if (v > 0 && Time.realtimeSinceStartup - muistiKirjattu > 15f)
            { muistiKirjattu = Time.realtimeSinceStartup; kirjaa($"kaupunki: vapaa muisti {v / 1e9:F2} Gt (pienin {minVapaa / 1e9:F2} Gt), kerroin {SseKerroin:F2}, laatat {Latausaste:F0} %"); }
            if (v <= 0) return;
            if (!muistiPysaytys && v / 1e9 < HataGt)
            {
                muistiPysaytys = hataKaytetty = true;
                karkeaKaytossa = false; Karkeaksi();   // karkea valinta (HataSkaala) ja lähikamera pois; Tarkenna ei palauta hädän aikana
                kirjaa($"kaupunki: MUISTIHÄTÄ vapaa {v / 1e9:F2} Gt → laattavalinta karkea (pikselit ×{KarkeaNyt:F2}; ei SSE-vaihtoa)");
            }
            else if (muistiPysaytys && v / 1e9 > HataGt + HataPalautusGt)
            { muistiPysaytys = false; hataSeis = false; kirjaa($"kaupunki: muisti vapaa {v / 1e9:F2} Gt → hätä ohi, tarkentuu normaalisti"); }
            if (muistiPysaytys && !hataSeis && v / 1e9 < HataSeisGt)
            { hataSeis = true; kirjaa($"kaupunki: MUISTIHÄTÄ 2 vapaa {v / 1e9:F2} Gt → laattojen lataus seis"); }
        }

        /// <summary>Joka kehys: laattojen päivitys seis tauolla, kun laatat ovat valmiit ja kamera paikallaan (tauko pysäyttää lennon ja kierron),
        /// ei muistihädässä (karkea valinta tarvitsee päivityksen vapauttaakseen hienot laatat).</summary>
        void PaivitaPysaytys()
        {
            if (!auki || maasto == null) return;
            bool halu = (Tauko && !muistiPysaytys && Latausaste >= ValmisProsentti) || hataSeis;
            if (halu == pysaytettyTassa) return;
            pysaytettyTassa = halu;
            maasto.suspendUpdate = halu;
            if (rakennukset != null) rakennukset.suspendUpdate = halu;
            kirjaa($"kaupunki: laattojen päivitys {(halu ? "seis" : "jatkuu")} ({(hataSeis ? "muistihätä 2" : muistiPysaytys ? "muistihätä" : Tauko ? "tauko" : "normaali")})");
        }
        public const long GoogleAsset = 2275207;
        public const uint Rinnakkain = 12;   // 8 → 12 (omistaja TF 144: nopeampi lento, saapuessa laatat 68 %)
        /// <summary>Laattojen valmiusraja (%): ComputeLoadProgress on arvio, joten 100 ei aina täyty.</summary>
        public const float ValmisProsentti = 99f;
        /// <summary>Taivaan väri kaupunkinäkymässä (pallon avaruuden musta ei sovi horisonttiin).</summary>
        static readonly Color Taivas = new Color(0.78f, 0.84f, 0.89f);
        /// <summary>
        /// KAUPUNGIN OMA PIIRTOKERROS (Päätoimittaja 5.10. 21.0x, VIE-este: pysähdyksissä kermanvärisiä aukkoja ja karkeita kolmioita):
        /// kaupungin tilesetit (ja Cesiumin laattaoliot, jotka perivät tilesetin kerroksen) tällä kerroksella, ja pääkamera piirtää
        /// kaupunkinäkymän ajan VAIN sen. Pelin pallon kerrokset (kermahuntu, pohja, merkit) eivät voi näkyä laattojen raoista.
        /// Kerrokset 8–14 ja UI-kamerat 24–40 ovat muiden käytössä.
        /// </summary>
        public const int Kerros = 15;
        int vanhaMaski;
        (double, double, double, double, double, double) vanhaAsento;
        bool asentoTalteen;

        /// <summary>Datalähde (komennot "lontoo data …" ja "opas data …"): Google oletus, Ion, Oma = testitila ilman ionia.</summary>
        public enum Lahde { Google, Ion, Oma }
        public static Lahde Data = Lahde.Google;
        public static string TunnusPolku => Path.Combine(Application.persistentDataPath, "cesium-ion-tunnus.txt");

        readonly PalloKierto kierto;
        readonly Action<string> kirjaa;
        GameObject juuri;
        Cesium3DTileset maasto, rakennukset;
        Camera esikamera, kamera;
        CesiumCameraManager hallinta;
        CesiumGeoreference georef;
        CesiumOmatMallit omat;
        KaupunkiVesi vesi;   // oma vesipinta (LS2 8.10., omistaja 20.2x B); oletus pois
        public KaupunkiVesi Vesi => vesi;
        /// <summary>Omat mallit (Giza-pilotti): tekijärivi CesiumOmatMallit.Tekijat.</summary>
        public CesiumOmatMallit OmatMallit => omat;
        double3 vanhaOrigo;
        Cesium3DTileset palloTileset;
        Pohjapallolaskenta.Tila pohjaTila;
        bool palloOli, pohjaOli, auki;
        CameraClearFlags vanhaTyhjennys;
        Color vanhaTausta;
        string tunnus;

        public CesiumKaupunki(PalloKierto kierto, Action<string> kirjaa) { this.kierto = kierto; this.kirjaa = kirjaa; omat = new CesiumOmatMallit(kirjaa); vesi = new KaupunkiVesi(kirjaa); }

        /// <summary>
        /// KUVANLAADUN KOUKUT (Siirtoseppä 5.10., kaupunkikuvan parannukset junaan 144): Avattu kutsutaan, kun näkymä ja tilesetit
        /// on luotu (myös Google → Ion -vaihdon jälkeen), Suljettu ennen palautusta. Laatukoodi asuu omassa tiedostossaan ja
        /// rajautuu kaupunkinäkymään näiden kautta.
        /// </summary>
        public static event Action<CesiumKaupunki> Avattu, Suljettu;
        /// <summary>Pallon kamera (näkymän ajan) ja tilesetit: Google tai maasto (Pinta) ja OSM-rakennukset (null Googlella).</summary>
        public Camera Kamera => kamera;

        /// <summary>
        /// Avauslataus (Natiivi-UI 6.10. 12.2x, KrediititTiivis.AvausLatautuu): Cesium ion -logo näkyy vain linssin avauslatauksen ajan.
        /// Sovitin kutsuu joka kehys; tila nousee avauksessa ja laskee, kun ensimmäinen näkymä on valmis (laatat ≥ 95 % tai 8 s).
        /// Heijastuksella, jotta tämä kääntyy ilman UI-haaraa.
        /// </summary>
        public void PaivitaAvauslataus()
        {
            float kulunut = Time.realtimeSinceStartup - avausAika;
            // Vähintään 1,5 s: tyhjä näkymä raportoi 100 % ennen kuin laattoja on edes valittu.
            bool latautuu = auki && avausAika >= 0 && kulunut < 8f && (kulunut < 1.5f || Latausaste < 95f);
            if (!latautuu) avausAika = -1f;
            AsetaAvausLatautuu(latautuu);
        }
        float avausAika = -1f;
        static bool? avausEdellinen;
        static System.Reflection.PropertyInfo avausOminaisuus;
        static System.Reflection.FieldInfo avausKentta;
        static bool avausHaettu;
        static void AsetaAvausLatautuu(bool arvo)
        {
            if (avausEdellinen == arvo) return;
            avausEdellinen = arvo;
            if (!avausHaettu)
            {
                avausHaettu = true;
                var t = typeof(CesiumKaupunki).Assembly.GetType("Matkakirja.Natiivi.KrediititTiivis");
                const System.Reflection.BindingFlags F = System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static;
                avausOminaisuus = t?.GetProperty("AvausLatautuu", F); avausKentta = t?.GetField("AvausLatautuu", F);
            }
            if (avausOminaisuus != null && avausOminaisuus.CanWrite) avausOminaisuus.SetValue(null, arvo);
            else avausKentta?.SetValue(null, arvo);
        }
        /// <summary>Maantieteellinen piste (korkeus ellipsoidista, m) Unityn maailmaan georeferenssin kautta; null, jos näkymä kiinni.</summary>
        public Vector3? MaailmaPiste(double lat, double lon, double korkeus)
        {
            if (!auki || georef == null || !georef.isActiveAndEnabled) return null;
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, korkeus));
            var u = georef.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            return new Vector3((float)u.x, (float)u.y, (float)u.z);
        }
        /// <summary>Joka kehys näkymän ajan (sovitin): pääkamera piirtää vain kaupungin kerroksen, vaikka elävä kerros olisi
        /// palauttanut avauskehyksessä oman tallennetun maskinsa.</summary>
        public void PidaMaski()
        {
            if (auki && kamera != null && kamera.cullingMask != 1 << Kerros) kamera.cullingMask = 1 << Kerros;
            if (auki && kamera != null) omat.Kamera(kamera.transform.position);
            Muistivahti();
            PaivitaPysaytys();
            if (KaupunkiIlmakeha.KameraKorkeusM > AluskerrosKorkeusM) TarkistaReiat();   // kaukomaa myös kiinteällä kameralla (simu 9.10. 10.4x: ei laukeamista)
            PaivitaKarkea();
            SeuraaTarkentumista();
            LaattaTekstuurit.Seuraa(maasto);   // diagnostiikka 15 s välein vain asetuksella tai tasolla > 0
        }
        public Cesium3DTileset Rakennukset => rakennukset;

        /// <summary>Käytössä oleva lähde (Google voi vaihtua Ioniin latausvirheen jälkeen).</summary>
        public Lahde Kaytossa { get; private set; }
        public string Virhe { get; private set; }
        public CesiumGeoreference Georef => georef;
        /// <summary>Georeferenssin origo lokiin (kiinteän kameran vertailu).</summary>
        public string OrigoTeksti => georef == null ? "-" : $"{georef.latitude:F5}, {georef.longitude:F5}, {georef.height:F0} m, skaala {georef.transform.localScale.x:F4}";
        /// <summary>Tileset korkeuden näytteenottoon (Google tai maasto).</summary>
        public Cesium3DTileset Pinta => maasto;
        /// <summary>Laattojen latausaste 0–100 (pienempi kahdesta tilesetistä).</summary>
        public float Latausaste => maasto == null ? 0f : rakennukset == null ? maasto.ComputeLoadProgress() : Mathf.Min(maasto.ComputeLoadProgress(), rakennukset.ComputeLoadProgress());
        public bool Valmis => Latausaste >= ValmisProsentti;

        /// <summary>Workerista haettu tunnus (muistissa istunnon ajan, ei levylle eikä lokiin).</summary>
        static string haettuTunnus;
        /// <summary>Tunnuksen reitti Pöllössä (Pelikoodari; salaisuus CESIUM_ION_TOKEN workerin ympäristössä).</summary>
        public const string TunnusReitti = "/opas/tunnus";

        static string LueTunnus()
        {
            try { if (File.Exists(TunnusPolku)) { var t = File.ReadAllText(TunnusPolku).Trim(); if (t.Length > 0) return t; } }
            catch (Exception) { }
            return haettuTunnus;
        }

        /// <summary>Tunnus Pöllöstä (pelaajan laite): GET {PuluChat.Palvelin}/opas/tunnus → {"tunnus": "..."}; natiivin otsakkeet.</summary>
        System.Collections.IEnumerator HaeTunnus(Lahde data)
        {
            using (var r = UnityEngine.Networking.UnityWebRequest.Get(PuluChat.Palvelin + TunnusReitti))
            {
                r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
                PolloTestitunnus.Lisaa(r);
                r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
                r.timeout = 15;
                yield return r.SendWebRequest();
                if (!auki) yield break;
                string t = null;
                if (r.result == UnityEngine.Networking.UnityWebRequest.Result.Success)
                    t = (Matkakirja.Peli.MiniJson.Jasenna(r.downloadHandler.text) as System.Collections.Generic.Dictionary<string, object>) is { } j
                        && j.TryGetValue("tunnus", out var v) ? v as string : null;
                if (string.IsNullOrEmpty(t))
                {
                    kirjaa($"kaupunki: tunnuksen haku epäonnistui (HTTP {r.responseCode})");
                    Virhe = "Cesium ion -tunnus puuttuu";
                    yield break;
                }
                haettuTunnus = tunnus = t;
                kirjaa("kaupunki: tunnus haettu Pöllöstä");
                LuoData(data);
            }
        }

        /// <summary>Avaa näkymän origon ympärille. false = virhe (Virhe kertoo syyn; mitään ei muutettu).</summary>
        public bool Avaa(double origoLat, double origoLon, double origoKorkeus)
        {
            Virhe = null;
            var data = Data;
            tunnus = LueTunnus();
            bool haettava = string.IsNullOrEmpty(tunnus) && data != Lahde.Oma;
            georef = kierto != null ? kierto.georeferenssi : null;
            kamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            if (georef == null || kamera == null) { Virhe = "pallon kamera puuttuu"; return false; }
            auki = true;
            avausAika = Time.realtimeSinceStartup;
            // Juna 174 (iPad-jetsam 9.10.): taustan esilataus seis ja muiden kohdekaupunkien saapumislaatat perutaan kaupungin ajaksi.
            Matkakirja.Esilataaja.KaupunkiAuki = true;
            int perutut = Matkakirja.KarttaKerrokset.PeruTaustaSaapumiset();
            if (perutut > 0) kirjaa($"kaupunki: taustan saapumislaatat peruttu ({perutut} erää), esilataus seis kaupungin ajaksi");
            googleUusinnat = 0;
            // Tarkkuus muistin mukaan ennen tilesettien luontia (LuoTileset käyttää SseKerrointa).
            long vapaa = VapaaMuisti();
            float pakotettu = PakotettuKerroin();
            // Tavoite muistista, alaraja AlarajaKerroin (Päätoimittaja: jos 1,0 ei näytä paremmalta kuin 1,3, 1,3 jää); pakotus ohittaa.
            // Täysi laiteluokka (omistaja 8.10. 19.5x "lisää muistin käyttöä"; juna 170): lattia 0,5 (SSE 8) ja välimuisti ylijäämästä
            // (KaupunkiMuistibudjetti, Ydin; muut laitteet ja tuntematon vapaa täsmälleen ennallaan).
            // A3 (Linssiseppä): lähikamera samasta budjetista (KaupunkiMuistibudjetti.ValitseLahella; yksi muistibudjetti, PT 22.4x).
            // Juna 174: kehityskaupungin oma sisältö (omat mallit, vesi, ilmakehä, äänet, intro) kiinteänä eränä budjetista.
            double omaGt = Kehityskaupungit.Lahella(origoLat, origoLon) != null ? Matkakirja.Linssit.Kierros.KaupunkiMuistibudjetti.OmaSisaltoGt : 0;
            var valinta = Matkakirja.Linssit.Kierros.KaupunkiMuistibudjetti.ValitseLahella(vapaa / 1e9, NayttoKerroin, DioraamaLaatu.Laiteluokka, -1, omaGt, KaupunkiKuva.PieniMuisti);
            kerroin = pakotettu > 0 ? pakotettu : (float)valinta.Kerroin;
            googleValimuisti = valinta.Valimuisti;
            lahiBudjetti = pakotettu > 0 ? 1f : (float)valinta.Lahi;
#if UNITY_STANDALONE_OSX
            // Mac: profiilin SSE suoraan (ei näyttö- eikä alarajakerrointa); GoogleSseMin-lattia skaalautuu samalla kertoimella.
            if (Mac && pakotettu <= 0 && Matkakirja.MacLaatu.GoogleSse > 0) kerroin = Matkakirja.MacLaatu.GoogleSse / GoogleSse;
#endif
            karkeaKaytossa = false; kuormaValinta = false; tarkkaAlku = -1f;
            hataKaytetty = muistiPysaytys = pysaytettyTassa = Tauko = hataSeis = false; muistiTarkistettu = 0f; muistiKirjattu = 0f; minVapaa = long.MaxValue;
            kirjaa($"kaupunki: muisti vapaa {(vapaa > 0 ? (vapaa / 1e9).ToString("F2") + " Gt" : "ei tiedossa")}, näyttö {Screen.width}×{Screen.height} (kerroin {NayttoKerroin:F2}) → SSE-kerroin {kerroin:F2}{(pakotettu > 0 ? " (pakotettu)" : "")}, välimuisti {GoogleValimuistiNyt >> 20} Mt{(Mac ? $", Mac-profiili {MacProfiili}" : "")}");

            // Pallon tileset: ei SetActivea (pallo on samassa oliossa kuin georeferenssi → SetOrigin heitti "Initialize"-poikkeuksen, simu 18.0x).
            palloTileset = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.pallo : null;
            // EI enabled = false (simu 23.16, BUILD 144: tilesetin sammutus ja käynnistys jätti pallon pohjarasterin pois →
            // meri tumma, maa kermaa, "tumma vinovyö"). Pallo jää ladatuksi mutta sen päivitys pysäytetään (ei uusia laattoja
            // kaupungin kameralle), ja pääkamera piirtää vain kaupungin kerroksen (Kerros), joten pallo ei näy.
            palloOli = palloTileset != null && palloTileset.suspendUpdate;
            if (palloTileset != null) palloTileset.suspendUpdate = true;
            // Pohjapallo on myös georeferenssin oliossa: piilotus sen omalla tilalla (komento "pallo pohja pois"), ei SetActivella.
            pohjaTila = Pohjapallo.Tila;
            pohjaOli = true;
            Pohjapallo.Tila = Pohjapallolaskenta.Tila.Pois;
            // Elävä kerros pois näkymän ajaksi ja pääkameran OMA maski talteen (kerros on voinut vaihtaa sen kaappauksen ajaksi).
            Matkakirja.ElavaKerros.Estetty = true;
            vanhaTyhjennys = kamera.clearFlags; vanhaTausta = kamera.backgroundColor;
            vanhaMaski = Matkakirja.ElavaKerros.TallennettuMaski ?? kamera.cullingMask;
            kamera.clearFlags = CameraClearFlags.SolidColor; kamera.backgroundColor = Taivas;
            kamera.cullingMask = 1 << Kerros;

            vanhaOrigo = new double3(georef.longitude, georef.latitude, georef.height);
            // Pallon kameran oma asento talteen: kuvaus (PalloKierto.Kuvaa) jättää sen kaupungin korkeuteen (~300 m), ja suljettaessa
            // pallo näkyi pelkkänä pergamenttina horisontin alla (Laitetestaaja 5.10., juna 144 e95826b4, toistettu simulla 22.11).
            vanhaAsento = (kierto.leveys, kierto.pituus, kierto.korkeus, kierto.kallistus, kierto.suuntima, kierto.katseKorkeus);
            asentoTalteen = true;
            // Pallon maaston rako pois kaupunkinäkymän ajaksi (Natiiviseppä 18a9e4d3, LS1:n juurisyy 7.10. 01.0x): pallon tilesetin
            // näyte × korkeuskerroin 2 nosti oppaan kameraa väärin (sama kiinteä kamera 22° / 24,9° / 33,9°); oppaan oma törmäysraja
            // Googlen pinnasta (OpasOhjaus, lähiluotain) on ainoa raja.
            if (kierto != null) kierto.MaastoRakoPois = true;
            SiirraOrigo(origoLat, origoLon, origoKorkeus);

            juuri = new GameObject("Cesium-kaupunki");
            juuri.transform.SetParent(georef.transform, false);
            esikamera = new GameObject("Kaupunki esilataus").AddComponent<Camera>();
            esikamera.transform.SetParent(juuri.transform, false);
            esikamera.enabled = false;
            esikamera.cullingMask = 0;
            Cesium3DTileset.OnCesium3DTilesetLoadFailure += LatausVirhe;
            reiat.Nollaa(); Application.logMessageReceivedThreaded -= LokiRivi; Application.logMessageReceivedThreaded += LokiRivi;
            // Pelaajan laitteella tunnus haetaan ensin Pöllöstä; tilesetit luodaan vasta sitten (ei 401-latausvirhettä).
            if (haettava) kierto.StartCoroutine(HaeTunnus(data));
            else LuoData(data);
            KarttaKerrokset.RuutukrediititNakyviin = true;
            // Pallon karttatekstit ja -viivat pois samasta kuvasta (simu 18.39: "ISO-BRITANNIA" näkyi Googlen kuvan päällä).
            PallonViivat(false);
            return true;
        }

        void LuoData(Lahde data)
        {
            Kaytossa = data;
            if (hallinta != null && esikamera != null) hallinta.additionalCameras.Remove(esikamera);
            if (hallinta != null && lahi != null) hallinta.additionalCameras.Remove(lahi);
            lahiKaytossa = false;   // A3: uusi tileset ja hallinta → lisätään seuraavassa kehyksessä uudelleen
            ReittikameratPois();
            omat.Sulje(); vesi.Sulje();
            PoistaAluskerros();
            if (maasto != null) UnityEngine.Object.Destroy(maasto.gameObject);
            if (rakennukset != null) UnityEngine.Object.Destroy(rakennukset.gameObject);
            maasto = null; rakennukset = null;
            if (data == Lahde.Oma)
            {
                maasto = LuoTileset("Kaupunki maasto (oma testi)", 0, MaastoSse, MaastoValimuisti);
                maasto.tilesetSource = CesiumDataSource.FromUrl;
                maasto.url = KarttaKerrokset.Instanssi != null && KarttaKerrokset.Instanssi.pallo != null ? KarttaKerrokset.Instanssi.pallo.url : null;
            }
            else if (data == Lahde.Google)
            {
                maasto = LuoTileset("Kaupunki Google 3D", GoogleAsset, GoogleSse, GoogleValimuistiNyt);
                // Ilmaperspektiivi ja pilvien varjot (LS2 8.10.; renderöintitehoste, Map Tiles -ehdot: Karttaseppä 8.10. kohta 2).
                // Ilmakehän poikkeus ei saa estää LuoDatan loppua (vesi, Karkeaksi, Avattu; LS1:n katselmointi 8.10.).
                try
                {
                    KaupunkiKuva.LueAsetukset();   // asetukset (ilmakeha/vesi) ennen materiaalia ja vettä, ei vasta KaupunkiKuvan avauksessa
                    if (georef != null) KaupunkiIlmakeha.Kaupunki(georef.latitude, georef.longitude);   // kehityskaupungeissa oletus päällä
                    if (KaupunkiIlmakeha.LaattaMateriaali() is Material im) maasto.opaqueMaterial = im;
                }
                catch (Exception e) { Debug.Log("MATKAKIRJA kaupunki: ilmakehä ohitettu: " + e.Message); }
            }
            else
            {
                maasto = LuoTileset("Kaupunki maasto", 1, MaastoSse, MaastoValimuisti);
                var bing = maasto.gameObject.AddComponent<CesiumIonRasterOverlay>();
                bing.ionAssetID = 2;
                bing.ionAccessToken = tunnus;
                rakennukset = LuoTileset("Kaupunki rakennukset", 96188, RakennusSse, RakennusValimuisti);
                rakennukset.gameObject.SetActive(true);
            }
            maasto.gameObject.SetActive(true);
            hallinta = CesiumCameraManager.GetOrCreate(maasto.gameObject);
            if (hallinta != null && !hallinta.additionalCameras.Contains(esikamera)) hallinta.additionalCameras.Add(esikamera);
            kirjaa("kaupunki: data " + data);
            // Omat mallit (Giza-pilotti 7.10.): vain Googlen datalla, leikkaus Googlen tilesetiin (CesiumOmatMallit).
            if (data == Lahde.Google && georef != null) omat.Avaa(juuri.transform, maasto, georef.latitude, georef.longitude, Kerros);
            if (data == Lahde.Google && georef != null)
                try { vesi.Avaa(juuri.transform, georef.latitude, georef.longitude, Kerros); }
                catch (Exception e) { Debug.Log("MATKAKIRJA kaupunki: vesi ohitettu: " + e.Message); }
            if (auki) { karkeaKaytossa = false; Karkeaksi(); }   // uusi data (avaus tai Google/ion-vaihto): saapuminen karkeana
            if (auki) Avattu?.Invoke(this);
            // Muistikatto kuvanlaadun koukun jälkeen: Googlen SSE ei alle GoogleSseMin:n (asetin luo tilesetin uudelleen vain jos muuttuu).
            float sseMin = GoogleSseMin * SseKerroin;
            if (data == Lahde.Google && maasto != null && maasto.maximumScreenSpaceError < sseMin - 0.01f)
            {
                kirjaa($"kaupunki: Google-SSE {maasto.maximumScreenSpaceError:F0} → {sseMin:F1} (muistikatto, näyttö {Screen.width}×{Screen.height}, kerroin {SseKerroin:F2})");
                maasto.maximumScreenSpaceError = sseMin;
            }
            if (maasto != null && maasto.maximumCachedBytes > (data == Lahde.Google ? GoogleValimuistiNyt : MaastoValimuisti))
                maasto.maximumCachedBytes = data == Lahde.Google ? GoogleValimuistiNyt : MaastoValimuisti;
        }

        // GOOGLEN TIILIREIÄT (Varsova 7.10.; Päätoimittaja 8.10. junaan 166): Cesiumin natiivi loki "status code 404 for tile content
        // https://tile.googleapis.com/…" → GoogleTiiliReiat; kun kaupungissa on ≥ Raja reikää, aluskerros täyttää reiät: pelkkä
        // maastomuoto (Cesium World Terrain, karkea, AluskerrosSyvyysM Googlen pinnan alla) yhdellä tasaisella horisontin/sumun
        // sävyllä (Varjostimet/ReikaTayte). EI karttakuvaa (Päätoimittaja 8.10.: ei Bingiä Googlen laattojen kanssa, Raamatun
        // kaupunkinäkymälinja ja Map Tiles -ehdot). Ei vaikuta latausasteeseen; vain Googlen datalla.
        readonly Matkakirja.Linssit.Kierros.GoogleTiiliReiat reiat = new Matkakirja.Linssit.Kierros.GoogleTiiliReiat();
        Cesium3DTileset aluskerros;
        Material aluskerrosMat;
        static readonly int IdVari = Shader.PropertyToID("_Vari");
        public const float AluskerrosSse = 24f, AluskerrosSyvyysM = 15f;
        /// <summary>KAUKOMAA (PT 9.10.: Tukholma korkealta → Googlen laattojen ulkopuolella maa puuttuu, taivas näkyy ja omat vedet leijuvat;
        /// vapaan lennon katto 12 km). Testiasetukset: "sumukarsinta 0|1" (Cesiumin enableFogCulling Googlen tilesetille, null = oletus)
        /// ja "aluskerros 1" (aluskerros päälle ilman reikiä).</summary>
        public static bool? SumuKarsinta;
        public static bool AluskerrosPakotettu;
        /// <summary>Aluskerros päälle, kun kamera nousee tämän yli (m maasta): korkealta näkyy Googlen 3D-laattojen latausalueen reuna, jonka
        /// takana ei ollut maata (PT 9.10.). Kerran luotuna se jää (ei välkettä noustessa ja laskiessa).</summary>
        public static float AluskerrosKorkeusM = 1200f;
        public bool AluskerrosPaalla => aluskerros != null;
        void LokiRivi(string viesti, string pino, LogType tyyppi) => reiat.Kirjaa(viesti);

        /// <summary>Joka kehys (OpasSovitin): aluskerros päälle, kun reikiä on kertynyt.</summary>
        public void TarkistaReiat()
        {
            if (aluskerrosMat != null && kamera != null) aluskerrosMat.SetColor(IdVari, RenderSettings.fog ? RenderSettings.fogColor : kamera.backgroundColor);
            if (maasto != null && SumuKarsinta.HasValue && maasto.enableFogCulling != SumuKarsinta.Value)
            { maasto.enableFogCulling = SumuKarsinta.Value; kirjaa($"kaupunki: sumukarsinta {(SumuKarsinta.Value ? "päällä" : "pois")} (kaukomaan testi)"); }
            if (aluskerros != null || !auki || Kaytossa != Lahde.Google || string.IsNullOrEmpty(tunnus) || juuri == null || !(reiat.AluskerrosTarvitaan || AluskerrosPakotettu || KaupunkiIlmakeha.KameraKorkeusM > AluskerrosKorkeusM)) return;
            var sh = Resources.Load<Shader>("Varjostimet/ReikaTayte");
            if (sh == null) { kirjaa("kaupunki: reikätäytteen varjostin puuttuu"); return; }
            aluskerrosMat = new Material(sh) { name = "ReikaTayte" };
            aluskerros = LuoTileset("Kaupunki aluskerros (Googlen reiät)", 1, AluskerrosSse, MaastoValimuisti);
            aluskerros.forbidHoles = false;
            aluskerros.opaqueMaterial = aluskerrosMat;   // vain muoto, tasainen sävy, ei kuvaa
            aluskerros.transform.localPosition = new Vector3(0f, -AluskerrosSyvyysM, 0f);   // georeferenssin paikallinen ylös = y origossa
            aluskerros.gameObject.SetActive(true);
            kirjaa($"kaupunki: {(reiat.AluskerrosTarvitaan ? $"Googlen 404-tiiliä {reiat.Maara}" : $"kamera {KaupunkiIlmakeha.KameraKorkeusM:F0} m")} → aluskerros (maastomuoto ilman kuvaa, sumun sävy, {AluskerrosSyvyysM:F0} m alla) täyttää reiät");
        }

        void PoistaAluskerros()
        {
            if (aluskerros != null) UnityEngine.Object.Destroy(aluskerros.gameObject);
            if (aluskerrosMat != null) UnityEngine.Object.Destroy(aluskerrosMat);
            aluskerros = null; aluskerrosMat = null;
        }

        Cesium3DTileset LuoTileset(string nimi, long asset, float sse, long valimuisti)
        {
            // Pois päältä asetusten ajaksi: jokainen asetin kutsuisi muuten RecreateTileset():iä.
            var go = new GameObject(nimi) { layer = Kerros };
            go.SetActive(false);
            go.transform.SetParent(juuri.transform, false);
            var t = go.AddComponent<Cesium3DTileset>();
            t.tilesetSource = CesiumDataSource.FromCesiumIon;
            t.ionAssetID = asset;
            t.ionAccessToken = tunnus;
            t.maximumScreenSpaceError = sse * SseKerroin;   // iso näyttö: sama laattamäärä kuin iPhonella
            t.maximumCachedBytes = valimuisti;
            t.maximumSimultaneousTileLoads = Rinnakkain;
            t.preloadAncestors = true;
            t.preloadSiblings = false;
            // Ei aukkoja: vanhempi laatta pysyy, kunnes kaikki lapset ovat latautuneet (Päätoimittaja 5.10. 21.0x, VIE-este).
            t.forbidHoles = true;
            t.createPhysicsMeshes = false;
            t.showCreditsOnScreen = true;
            LaattaTekstuurit.Kytke(t);   // proto 9.10.: perusvärikuvien pienennys (oletus pois; "laattapienennys" asetuksissa)
            return t;
        }

        void LatausVirhe(Cesium3DTilesetLoadFailureDetails d)
        {
            if (!auki || d.tileset == null || d.tileset != maasto) return;
            // Viesti voi sisältää osoitteen: ei kirjata sellaisenaan (tunnus kyselyparametrissa).
            kirjaa($"kaupunki: tilesetin lataus epäonnistui ({Kaytossa}, tyyppi {d.type}, HTTP {d.httpStatusCode})");
            Virhe429TaiMuu(d.httpStatusCode);
        }

        /// <summary>Testikomento "opas testi429" (Päätoimittaja 6.10. 18.0x): käsitellään kuin Googlen root-pyyntö olisi saanut 429:n.</summary>
        public void TestiVirhe429()
        {
            if (!auki) return;
            kirjaa($"kaupunki: TESTI 429 ({Kaytossa})");
            Virhe429TaiMuu(429);
        }

        /// <summary>
        /// Ion-varalla (Google epäonnistui) uusi Google-yritys seuraavan kohteen lennon tai siirron alussa (Päätoimittaja: "yritä
        /// Googlea uudelleen seuraavassa kohteessa"); laatat latautuvat lennon aikana.
        /// </summary>
        public void YritaGoogleUudelleen()
        {
            if (!auki || Data != Lahde.Google || Kaytossa != Lahde.Ion || vaihtoJonossa) return;
            // Kesken kaupungin vain yksi yritys: uusi 429 palaa heti ion-varaan (uusintojen tauot näkyisivät tyhjänä kaupunkina).
            googleUusinnat = GoogleUusintoja;
            kirjaa("kaupunki: ion-varalla, Google uudelleen seuraavassa kohteessa");
            LuoData(Lahde.Google);
        }

        void Virhe429TaiMuu(long http)
        {
            // Ei tuhota tilesetiä sen omassa virhekutsussa (simu 18.20: sovellus pysähtyi heti "data Ion" -rivin jälkeen):
            // vaihto seuraavaan kehykseen.
            // GOOGLE 429 (6.10. 17.43: "3D Tiles root requests per minute" Cesium ionin jaetussa Google-projektissa, ajoittainen
            // maailmanlaajuinen ruuhka): uusi yritys GoogleUusintoja kertaa kasvavalla tauolla ennen ion-varaa (valkoiset OSM-talot).
            if (Kaytossa == Lahde.Google && !vaihtoJonossa && http == 429 && googleUusinnat < GoogleUusintoja)
            { vaihtoJonossa = true; kierto.StartCoroutine(UusiGoogle(GoogleUusintaS[googleUusinnat++])); return; }
            if (Kaytossa == Lahde.Google && !vaihtoJonossa) { vaihtoJonossa = true; kierto.StartCoroutine(VaihdaIoniin()); }
        }
        bool vaihtoJonossa;
        public const int GoogleUusintoja = 3;
        static readonly float[] GoogleUusintaS = { 3f, 5f, 8f };
        int googleUusinnat;

        System.Collections.IEnumerator UusiGoogle(float s)
        {
            kirjaa($"kaupunki: Google 429, uusi yritys {googleUusinnat}/{GoogleUusintoja} {s:F0} s:n päästä");
            yield return new WaitForSecondsRealtime(s);
            vaihtoJonossa = false;
            if (auki && Kaytossa == Lahde.Google) LuoData(Lahde.Google);
        }

        System.Collections.IEnumerator VaihdaIoniin()
        {
            yield return null;
            yield return null;
            vaihtoJonossa = false;
            if (auki && Kaytossa == Lahde.Google) LuoData(Lahde.Ion);
        }

        /// <summary>
        /// Cesiumin ruutukrediittien (Googlen/Bingin logo ja tekijätiedot, Cesium ion) korkeus pisteinä ruudun alareunasta, 0 = ei näkyvissä.
        /// Natiivi-UI asettaa oppaan sirut tämän yläpuolelle. Krediittien sisältöä ja logojen kokoa ei muuteta (Googlen ehdot).
        /// </summary>
        public static float KrediititKorkeusPt
        {
            get
            {
                if (!KarttaKerrokset.RuutukrediititNakyviin) return 0f;
                var cs = CesiumCreditSystem.GetDefaultCreditSystem();
                var juuri = cs != null ? cs.GetComponent<UnityEngine.UIElements.UIDocument>()?.rootVisualElement : null;
                if (juuri == null || juuri.panel == null) return 0f;
                float ylin = float.MaxValue, ala = juuri.worldBound.yMax;
                foreach (var e in UnityEngine.UIElements.UQueryExtensions.Query<UnityEngine.UIElements.VisualElement>(juuri).ToList())
                    if (e != juuri && e.resolvedStyle.display != UnityEngine.UIElements.DisplayStyle.None && e.worldBound.height > 0 && e.childCount == 0)
                        ylin = Mathf.Min(ylin, e.worldBound.yMin);
                return ylin == float.MaxValue ? 0f : Mathf.Max(0f, ala - ylin);
            }
        }

        /// <summary>Alue- ja merinimet, rajat, rannikko, reitit ja napakannet (pelin oletus: näkyvissä); pelikerrokset hoitaa sovitin.</summary>
        static readonly string[] Viivat = { "aluenimet", "rajat", "rannikko", "reitit", "napakannet" };
        static void PallonViivat(bool nakyy)
        {
            var k = KarttaKerrokset.Instanssi;
            if (k == null) return;
            foreach (var v in Viivat) k.Nakyvyys(v, nakyy);
        }

        /// <summary>Georeferenssin origo uuteen paikkaan (kamera lasketaan ECEF:stä joka kehys, joten kuva ei hyppää).</summary>
        public void SiirraOrigo(double lat, double lon, double korkeus)
        {
            if (georef == null || !georef.isActiveAndEnabled) return;
            // Toinen kaupunki (siirto yli 30 km): reiät lasketaan alusta, aluskerros pois.
            if (Matkakirja.Linssit.Kierros.KierrosLento.EtaisyysM(georef.latitude, georef.longitude, lat, lon) > 30000) { reiat.Nollaa(); PoistaAluskerros(); }
            georef.Initialize();
            georef.SetOriginLongitudeLatitudeHeight(lon, lat, korkeus);
            PaivitaKorkeusKerroin();
            if (auki && Kaytossa == Lahde.Google) omat.Paivita(lat, lon);
        }

        /// <summary>Origo kohteeseen vain, jos se on yli rajaM:n päässä nykyisestä (saapumisen nykäys, Päätoimittaja 8.10. 07.5x);
        /// omat mallit päivitetään joka tapauksessa. true = siirrettiin.</summary>
        public bool SiirraOrigoTarvittaessa(double lat, double lon, double korkeus, double rajaM)
        {
            if (georef == null || !georef.isActiveAndEnabled) return false;
            if (Matkakirja.Linssit.Kierros.KierrosLento.EtaisyysM(georef.latitude, georef.longitude, lat, lon) < rajaM)
            {
                if (auki && Kaytossa == Lahde.Google) omat.Paivita(lat, lon);
                return false;
            }
            SiirraOrigo(lat, lon, korkeus);
            return true;
        }

        /// <summary>Paikallinen ylös-suunta Unityn maailmassa pisteessä p (ellipsoidin normaali; oppaan lähiluotain).</summary>
        public Vector3 Ylos(Vector3 p)
        {
            if (georef == null) return Vector3.up;
            var gt = georef.transform;
            double3 ecef = georef.TransformUnityPositionToEarthCenteredEarthFixed((float3)gt.InverseTransformPoint(p));
            double3 n = math.normalize(CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(ecef));
            return ((Vector3)gt.TransformDirection((float3)georef.TransformEarthCenteredEarthFixedDirectionToUnity(n))).normalized;
        }

        /// <summary>
        /// Pallon tileset-varjostimen shaderglobaalit (maan keskipiste, akseli, LentoVaraUV-akselit) lasketaan georeferenssin
        /// origosta vain KorkeusKerroin.Asetassa, eikä niitä päivitetä origon siirtyessä. Kaupunkinäkymän jälkeen pallon rinnevalon
        /// tasaus käänsi normaalit kaupunkiorigon kehyksessä → tumma vyö ja kermareuna (Siirtoseppä 6.10. 00.3x; toisto simulla).
        /// Sama kerroin, joten Muuttui ei laukea.
        /// </summary>
        void PaivitaKorkeusKerroin()
        {
            if (georef != null) Matkakirja.KorkeusKerroin.Aseta(Matkakirja.KorkeusKerroin.Arvo, georef);
        }

        // ESILATAUKSEN EHTORAJAT (Päätoimittaja 7.10.2026 klo 00.4x, Googlen ehtojen tarkistus; ÄLÄ LÖYSENNÄ ilman uutta tarkistusta):
        // Map Tiles API -ohjeet: "must not pre-fetch, index, store, or cache any Content except under the limited conditions
        // stated in the terms"; yleisehdot 3.2.3(a) kieltävät esilatauksen "for use outside the Services". Sallittu on sama kuin
        // Cesiumin oma toiminta (CesiumJS preloadFlightDestinations, oletus true; Unityssä additionalCameras):
        //   1. esikamera vain reitin SEURAAVAAN pysähdykseen, joka näytetään noin minuutin sisällä; ei varastoa useasta kohteesta,
        //   2. EsikameraPois heti, kun suunnitelma muuttuu (toive, Seuraava, kierroksen loppu),
        //   3. ei offline-käyttöä eikä omaa laattatallennusta; levylle vain Cesium Nativen HTTP-välimuisti, joka noudattaa
        //      Googlen otsakkeita ("your client must respect the max-age value"; laatat: private, max-age=14400, must-revalidate,
        //      ETag → If-None-Match). CesiumRuntimeSettings 1024/1000 rajaa vain koon, ei pidennä säilytysaikaa.
        /// <summary>Esilatauskamera kuvakulmaan: sama laskenta kuin PalloKierto (kohde, suuntima, kallistus pystystä, etäisyys).</summary>
        public void AsetaEsikamera(Kuvakulma k, float skaala = 1f)
        {
            if (esikamera == null || georef == null) return;
            if (hallinta != null && !hallinta.additionalCameras.Contains(esikamera)) hallinta.additionalCameras.Add(esikamera);
            Suuntaa(esikamera, k);
            if (skaala < 0.999f) { var r = esikamera.pixelRect; esikamera.pixelRect = new Rect(r.x, r.y, Mathf.Max(8f, r.width * skaala), Mathf.Max(8f, r.height * skaala)); }
        }

        /// <summary>
        /// Reitin esilatauskamerat (OpasSilmukka.ReittiEsilataus, Päätoimittaja 8.10. 07.4x): lennon välinäkymät seuraavaan pysähdykseen
        /// samoilla ehtorajoilla kuin esikamera (vain heti näytettävä reitti; 0 näkymää → kaikki pois laattavalinnasta).
        /// </summary>
        public void AsetaReittikamerat(Kuvakulma[] nakymat, int maara)
        {
            if (georef == null || juuri == null || nakymat == null) maara = 0;
            while (reittikamerat.Count < maara)
            {
                var c = new GameObject("Kaupunki reitin esilataus").AddComponent<Camera>();
                c.transform.SetParent(juuri.transform, false);
                c.enabled = false; c.cullingMask = 0;
                reittikamerat.Add(c);
            }
            for (int i = 0; i < reittikamerat.Count; i++)
            {
                var c = reittikamerat[i];
                if (c == null || hallinta == null) continue;
                if (i < maara)
                {
                    Suuntaa(c, nakymat[i]);
                    // Puolikas tarkkuus (video2 8.10.: neljä täyttä näkymää eivät latautuneet 30 s:n pysähdyksessä, lähtö 76 %:ssa):
                    // lennossa riittää karkeampi laatta, kunhan reikiä ei jää.
                    var r = c.pixelRect; c.pixelRect = new Rect(r.x, r.y, Mathf.Max(8f, r.width * ReittiSkaala), Mathf.Max(8f, r.height * ReittiSkaala));
                    if (!hallinta.additionalCameras.Contains(c)) hallinta.additionalCameras.Add(c);
                }
                else hallinta.additionalCameras.Remove(c);
            }
        }

        public void ReittikameratPois()
        {
            if (hallinta == null) return;
            foreach (var c in reittikamerat) if (c != null) hallinta.additionalCameras.Remove(c);
        }

        readonly List<Camera> reittikamerat = new List<Camera>();
        public const float ReittiSkaala = 0.5f;

        /// <summary>Piilokamera kuvakulmaan: sama laskenta kuin PalloKierto (kohde, suuntima, kallistus pystystä, etäisyys).</summary>
        void Suuntaa(Camera kam, Kuvakulma k)
        {
            double3 kohde = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(k.Lon, k.Lat, k.KatseKorkeusM));
            double3 ylos = math.normalize(CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(kohde));
            double3 ita = math.normalize(math.cross(new double3(0, 0, 1), ylos));
            double3 pohj = math.cross(ylos, ita);
            double s = math.radians(k.Suuntima), kl = math.radians(k.Kallistus);
            double3 vaaka = math.cos(s) * pohj + math.sin(s) * ita;
            double3 suunta = math.sin(kl) * vaaka - math.cos(kl) * ylos;
            double3 silma = kohde - suunta * k.EtaisyysM;
            var gt = georef.transform;
            var p = gt.TransformPoint((float3)georef.TransformEarthCenteredEarthFixedPositionToUnity(silma));
            var t = gt.TransformPoint((float3)georef.TransformEarthCenteredEarthFixedPositionToUnity(kohde));
            var yl = gt.TransformDirection((float3)georef.TransformEarthCenteredEarthFixedDirectionToUnity(ylos));
            kam.transform.SetPositionAndRotation(p, Quaternion.LookRotation(t - p, yl));
            if (kamera != null)
            {
                kam.fieldOfView = kamera.fieldOfView;
                kam.aspect = kamera.aspect;
                kam.nearClipPlane = kamera.nearClipPlane;
                kam.farClipPlane = kamera.farClipPlane;
                // Esilataus samalla valinnalla kuin karkea vaihe (lennon kohde ei lataa tavoitetarkkuutta etukäteen).
                var r0 = kamera.pixelRect; float sk = karkeaKaytossa ? KarkeaSkaala : 1f;
                kam.pixelRect = new Rect(r0.x, r0.y, Mathf.Max(8f, r0.width * sk), Mathf.Max(8f, r0.height * sk));
            }
        }

        /// <summary>
        /// Esilatauskamera pois laattavalinnasta (Päätoimittaja 5.10. muistiepäily): kun seuraavaa kohdetta ei ole, piilokamera ei pidä
        /// edellisen esilatauksen laattoja elossa. AsetaEsikamera kytkee sen takaisin.
        /// </summary>
        public void EsikameraPois()
        {
            if (hallinta != null && esikamera != null && hallinta.additionalCameras.Contains(esikamera)) hallinta.additionalCameras.Remove(esikamera);
        }

        /// <summary>Muistierittely lokiin (simun RSS:n kasvun syy): Unity-varaukset, tekstuurit, meshit, äänileikkeet ja Cesiumin laatat.</summary>
        public string Muisti()
        {
            long Mt(long b) => b >> 20;
            int laattoja = juuri != null ? juuri.GetComponentsInChildren<MeshFilter>(true).Length : 0;
            return $"muisti: varattu {Mt(UnityEngine.Profiling.Profiler.GetTotalAllocatedMemoryLong())} Mt, varaus {Mt(UnityEngine.Profiling.Profiler.GetTotalReservedMemoryLong())} Mt, " +
                   $"mono {Mt(UnityEngine.Profiling.Profiler.GetMonoUsedSizeLong())} Mt, tekstuurit {Mt((long)Texture.currentTextureMemory)} Mt ({Texture.nonStreamingTextureCount} kpl), " +
                   $"meshejä {Resources.FindObjectsOfTypeAll<Mesh>().Length}, kaupungin laattoja {laattoja}, äänileikkeitä {Resources.FindObjectsOfTypeAll<AudioClip>().Length}";
        }

        /// <summary>Suurimmat tekstuurit lokiin (juna 173, iPad-jetsam: kaupungin avauksessa +760 Mt tekstuureja ennen laattoja): tyypeittäin
        /// summat (Texture2D, RenderTexture, Texture3D, Cubemap, muut) ja n suurinta (nimi, koko, mitat, muoto, MSAA). Komento "opas tekstuurit [n]".</summary>
        public static string Tekstuurit(int n = 20)
        {
            var kaikki = Resources.FindObjectsOfTypeAll<Texture>();
            var rivit = new System.Collections.Generic.List<(long Tavut, string Kuvaus)>(kaikki.Length);
            var tyypit = new System.Collections.Generic.Dictionary<string, long>();
            foreach (var t in kaikki)
            {
                if (t == null) continue;
                long b = UnityEngine.Profiling.Profiler.GetRuntimeMemorySizeLong(t);
                string tyyppi = t.GetType().Name;
                tyypit[tyyppi] = (tyypit.TryGetValue(tyyppi, out var v) ? v : 0) + b;
                string muoto = t is RenderTexture rt ? $"{rt.graphicsFormat}/{rt.depthStencilFormat} msaa{rt.antiAliasing}" : t is Texture2D t2 ? t2.format.ToString() : t.graphicsFormat.ToString();
                rivit.Add((b, $"{(t.name.Length > 0 ? t.name : "(nimetön)")} {t.width}×{t.height} {muoto} {b >> 20} Mt"));
            }
            rivit.Sort((x, y) => y.Tavut.CompareTo(x.Tavut));
            var sb = new System.Text.StringBuilder($"tekstuurit: {kaikki.Length} kpl, ");
            foreach (var kv in System.Linq.Enumerable.OrderByDescending(tyypit, x => x.Value)) sb.Append($"{kv.Key} {kv.Value >> 20} Mt, ");
            sb.Append($"currentTextureMemory {(long)Texture.currentTextureMemory >> 20} Mt; suurimmat:");
            for (int i = 0; i < Mathf.Min(n, rivit.Count); i++) sb.Append(" | ").Append(rivit[i].Kuvaus);
            return sb.ToString();
        }

        public void Sulje()
        {
            if (!auki) return;
            Suljettu?.Invoke(this);
            auki = false;
            Matkakirja.Esilataaja.KaupunkiAuki = false;
            Cesium3DTileset.OnCesium3DTilesetLoadFailure -= LatausVirhe;
            Application.logMessageReceivedThreaded -= LokiRivi;
            PoistaAluskerros();
            avausAika = -1f; AsetaAvausLatautuu(false);
            if (hallinta != null && esikamera != null) hallinta.additionalCameras.Remove(esikamera);
            ReittikameratPois(); reittikamerat.Clear();   // tuhoutuvat juuren mukana
            if (hallinta != null && karkea != null) hallinta.additionalCameras.Remove(karkea);
            if (hallinta != null) hallinta.useMainCamera = true;
            if (karkea != null) UnityEngine.Object.Destroy(karkea.gameObject);
            karkea = null; karkeaKaytossa = false; kuormaValinta = false; tarkkaAlku = -1f;
            if (hallinta != null && lahi != null) hallinta.additionalCameras.Remove(lahi);
            if (lahi != null) UnityEngine.Object.Destroy(lahi.gameObject);
            lahi = null; lahiKaytossa = false;
            omat.Sulje(); vesi.Sulje();
            LaattaTekstuurit.Nollaa();
            if (juuri != null) UnityEngine.Object.Destroy(juuri);
            juuri = null; maasto = null; rakennukset = null; esikamera = null; hallinta = null;
            KarttaKerrokset.RuutukrediititNakyviin = false;
            PallonViivat(true);
            if (kierto != null) kierto.MaastoRakoPois = false;
            if (georef != null && georef.isActiveAndEnabled) { georef.Initialize(); georef.SetOriginLongitudeLatitudeHeight(vanhaOrigo.x, vanhaOrigo.y, vanhaOrigo.z); PaivitaKorkeusKerroin(); }
            if (asentoTalteen && kierto != null)
            {
                asentoTalteen = false;
                (kierto.leveys, kierto.pituus, kierto.korkeus, kierto.kallistus, kierto.suuntima, kierto.katseKorkeus) = vanhaAsento;
                kierto.SeurantaLoppui();
                kierto.Aseta();
                kirjaa($"kaupunki: pallon kamera palautettu ({vanhaAsento.Item1:F2}, {vanhaAsento.Item2:F2}, {vanhaAsento.Item3 / 1000:F0} km)");
            }
            if (palloTileset != null) palloTileset.suspendUpdate = palloOli;
            if (pohjaOli) Pohjapallo.Tila = pohjaTila;
            palloTileset = null; pohjaOli = false;
            if (kamera != null) { kamera.clearFlags = vanhaTyhjennys; kamera.backgroundColor = vanhaTausta; kamera.cullingMask = vanhaMaski; }
            Matkakirja.ElavaKerros.Estetty = false;
            georef = null; kamera = null; tunnus = null;
        }
    }
}
