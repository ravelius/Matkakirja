// ISS-KAMERAN JULISTE E v3 (omistajan hyväksymä vedos 1.10.2026 klo 22.02; kuvakaappaukset ja mitat
// proto-3d/_valmiit/hyvaksytyt-mallit/iss-juliste-e3-20261001/, Päätoimittaja 6.10. 08.0x: "tee tämän mukaan").
// Omistaja 6.10.: "juliste on 4:5 koska se on tarkoitettu julkaistavaksi esim instagramissa"; logo maapallon kaaren yläpuolella.
//   ┌──────────────── 4:5, MUSTA arkki, leveys W (≤ 2160) ─────────────┐
//   │ reuna 3,3 %                                                        │
//   │  ┌────────── kuva 0,934 W × 1,084 W, ohut vaalea kehys ─────────┐  │   logo 0,30 W, yläreuna 0,10 W kuvan yläreunasta
//   │  │                    MATKAKIRJA                                 │  │   (avaruudessa kaaren yllä, IssKameraKuva.LaajaKuvakulma)
//   │  │  ~~~~~~~~~~~~~~~~ maapallon kaari ~~~~~~~~~~~~~~~~~~~~~~~~~~  │  │
//   │  │  HELSINKI · SUOMENLAHTI          (valk. versaalit)  ╱▓▓▓▓▓▓▓  │  │   ISS-aurinkopaneelin siluetti oikeassa alakulmassa
//   │  │  60°10′N 24°56′E                 (kulta)          ╱▓▓▓▓▓▓▓▓▓  │  │
//   │  └───────────────────────────────────────────────────────────────┘  │
//   │                 INTERNATIONAL SPACE STATION ISS (kulta, harva)  (◉) │   alamarginaali 0,133 W, rivit keskellä;
//   │  21.6.2026 · 17.01 UTC · korkeus 420 km · … · aurinko 16° horisontin yllä │   ISS-sinetti (vektori, tyokalut/iss-sinetti)
//   │      Datalähde: Copernicus Sentinel-2, 10 m · Contains modified … 2025    │   oikealla kuvan oikean reunan tasalla
//   └────────────────────────────────────────────────────────────────────┘
// Kuvaan tulee S-käyrä (IssKameraKuva.Kontrasti) ennen tätä. Värit Tyylikirja.Kehys, fontit Kirjasimet.
// Renderöinti: UI Toolkit -paneeli omaan RenderTextureen (pohja Resources/MatkakirjaUI/Paneeli, teema käynnissä olevasta UI:sta),
// kaksi piirtoa, luku CPU:lle. Epäonnistuessa kutsuja tallentaa pelkän kuvan kuten ennen.
using System;
using System.Collections;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class IssJuliste
    {
        /// <summary>Julisteen tekstit.</summary>
        public struct Tiedot
        {
            /// <summary>Kuvan päälle vasempaan alakulmaan, esim. "Helsinki · Suomenlahti".</summary>
            public string Nimi;
            public double Lat, Lon;
            /// <summary>Tekninen rivi, esim. "21.6.2026 · 17.01 UTC · korkeus 420 km · … · aurinko 16° horisontin yllä".</summary>
            public string Tekninen;
            /// <summary>Datalähderivi, esim. "Datalähde: Copernicus Sentinel-2, 10 m · Contains modified Copernicus Sentinel data 2025".</summary>
            public string Lahde;
        }

        /// <summary>A/B `astro kyyti kuvaa juliste 0|1` (0 = pelkkä kuva kuten ennen).</summary>
        public static bool Kaytossa = true;

        // ---- CUPOLA-KEHYS (omistaja 6.10. 12.4x Päätoimittajan kautta: "todella mustan kupolan sisäosan … ikkuna on pystymallinen
        // … jätetään alas sitä mustaa ohjaamoa näkyviin, mihin voidaan sitten laittaa tekstiä ja logo"; Codexin tilaus dcc9b3f2) ----
        // Kehys-PNG 2160 × 2700, aukko alfasta (alfa < 0,5): kuva renderöidään aukon kokoisena ja kehys piirretään päälle; logo
        // avaruuteen ikkunan sisälle ja tekstit + ISS-sinetti ikkunan alle mustaan ohjaamoon; aurinkopaneeli pois. Ilman kehystä
        // (ei vielä ämpärissä tai haku epäonnistui) E v3 -asettelu kuten ennen.
        /// <summary>A/B `astro kyyti kuvaa kupolakehys 0|1`.</summary>
        public static bool KupolaKehys = true;
        public static string KehysOsoite = "https://media.matkakirja.app/karttanostot/20261006-juliste/iss-juliste-kupolakehys-2160x2700.png";
        static Texture2D kehys;
        /// <summary>Aukko osuuksina kehyksen leveydestä/korkeudesta, origo vasen yläkulma.</summary>
        static Rect aukko;
        /// <summary>
        /// Ikkunan suurennus (omistaja 6.10.: "Itse ehkä zoomaisin tuota ikkunaa hieman suuremmaksi"; Päätoimittaja 10–15 %): kehys ja
        /// aukko skaalataan vaakasuunnassa keskeltä ja pystysuunnassa aukon yläreunasta; kehyksen sivut rajautuvat, ohjaamo jää alle.
        /// </summary>
        public static float KehysZoom = 1.12f;
        /// <summary>Aukko suurennoksen jälkeen (osuuksina julisteesta).</summary>
        static Rect Aukko => new Rect(0.5f + (aukko.x - 0.5f) * KehysZoom, aukko.y, aukko.width * KehysZoom, aukko.height * KehysZoom);
        static bool kehysHaettu;
        public static bool KehysValmis => KupolaKehys && kehys != null && aukko.width > 0.2f && aukko.height > 0.2f;

        /// <summary>Kehys välimuistista tai ämpäristä kerran istunnossa (IssKameraKuva.Start); 404 → E v3.</summary>
        public static IEnumerator EsilataaKehys()
        {
            if (kehysHaettu) yield break;
            kehysHaettu = true;
            string polku = System.IO.Path.Combine(Application.persistentDataPath, "kuvat", "juliste-" + System.IO.Path.GetFileName(KehysOsoite));
            byte[] tavut = null;
            if (System.IO.File.Exists(polku)) tavut = System.IO.File.ReadAllBytes(polku);
            else
            {
                using var q = UnityEngine.Networking.UnityWebRequest.Get(KehysOsoite);
                yield return q.SendWebRequest();
                if (q.result != UnityEngine.Networking.UnityWebRequest.Result.Success) { Debug.Log("MATKAKIRJA linssit: juliste: kupolakehys " + q.error + " → E v3"); yield break; }
                tavut = q.downloadHandler.data;
                try { System.IO.Directory.CreateDirectory(System.IO.Path.GetDirectoryName(polku)); System.IO.File.WriteAllBytes(polku, tavut); } catch (Exception) { }
            }
            var tex = new Texture2D(2, 2, TextureFormat.RGBA32, false);
            if (!tex.LoadImage(tavut)) { UnityEngine.Object.Destroy(tex); yield break; }
            // Aukon rajat alfasta (rivit alhaalta ylös Unityssä).
            var px = tex.GetPixels32(); int tw = tex.width, th = tex.height, x0 = tw, x1 = -1, y0 = th, y1 = -1;
            for (int y = 0; y < th; y += 2)
                for (int x = 0; x < tw; x += 2)
                    if (px[y * tw + x].a < 128) { if (x < x0) x0 = x; if (x > x1) x1 = x; int yy = th - 1 - y; if (yy < y0) y0 = yy; if (yy > y1) y1 = yy; }
            if (x1 <= x0 || y1 <= y0) { UnityEngine.Object.Destroy(tex); Debug.Log("MATKAKIRJA linssit: juliste: kupolakehyksessä ei aukkoa → E v3"); yield break; }
            kehys = tex;
            aukko = new Rect(x0 / (float)tw, y0 / (float)th, (x1 - x0 + 2) / (float)tw, (y1 - y0 + 2) / (float)th);
            Debug.Log($"MATKAKIRJA linssit: juliste: kupolakehys {tw}×{th}, aukko {aukko.x:0.000} {aukko.y:0.000} {aukko.width:0.000} × {aukko.height:0.000}");
        }

        /// <summary>ISS-aurinkopaneelin siluetti kuvan oikeaan alakulmaan isona (E v3). A/B `astro kyyti kuvaa siluetti 0|1`. Jos
        /// kehittäjä on jo kytkenyt siluetin (`astro kyyti siluetti`), sen asettelu säilyy.</summary>
        public static bool Siluetti = true;
        /// <summary>Siiven tyvi (x, y kuvan korkeuden yksiköissä, y ylös), kulma (°) ja leveys; pituus. E v3:n mitoista (kuva 0,86:1).</summary>
        public static Vector4 SiluetinAsettelu = new Vector4(0.93f, -0.06f, 147f, 0.12f);
        public static float SiluetinPituus = 0.52f;
        static bool siluettiAsetettu; static Vector4 siluettiAsettelu0; static float siluettiPituus0, siluettiReunavalo0;

        /// <summary>Kuvauksen alussa (ennen renderöintiä): siluetti päälle julisteen asettelulla.</summary>
        public static void SiluettiKuvaan()
        {
            if (!Kaytossa || !Siluetti || KehysValmis || siluettiAsetettu || Matkakirja.Linssit.IssSiluetti.Paalla) return;   // kehyksellä ei paneelia
            siluettiAsettelu0 = Matkakirja.Linssit.IssSiluetti.Asettelu; siluettiPituus0 = Matkakirja.Linssit.IssSiluetti.Pituus;
            Matkakirja.Linssit.IssSiluetti.Asettelu = SiluetinAsettelu;
            Matkakirja.Linssit.IssSiluetti.Pituus = SiluetinPituus;
            siluettiReunavalo0 = Matkakirja.Linssit.IssSiluetti.Reunavalo;
            Matkakirja.Linssit.IssSiluetti.Reunavalo = 0f;   // Päätoimittaja 6.10.: ei kermaviivaa kesken reunaa
            Matkakirja.Linssit.IssSiluetti.Paalla = true;
            siluettiAsetettu = true;
        }

        /// <summary>Kuvauksen lopussa (finally): siluetti ennalleen.</summary>
        public static void SiluettiPois()
        {
            if (!siluettiAsetettu) return;
            Matkakirja.Linssit.IssSiluetti.Paalla = false;
            Matkakirja.Linssit.IssSiluetti.Asettelu = siluettiAsettelu0; Matkakirja.Linssit.IssSiluetti.Pituus = siluettiPituus0;
            Matkakirja.Linssit.IssSiluetti.Reunavalo = siluettiReunavalo0;
            siluettiAsetettu = false;
        }

        /// <summary>Julisteen enimmäisleveys (Instagram 2160 × 2700; Päätoimittaja 6.10.: "vähintään 1080 × 1350, mieluiten 2160 × 2700").</summary>
        public const int MaxLeveys = 2160;
        // E v3:n mitat osuutena julisteen leveydestä W (omistajan kuvakaappaus 1184 px: kuva 39–1145 × 677–1961).
        const float Reuna = 0.033f, KuvaKorkeus = 1.084f, LogoLeveys = 0.30f, LogoYla = 0.10f;
        const float NimiKoko = 0.024f, KoordKoko = 0.016f, NimiSisennys = 0.039f, NimiAla = 0.034f;
        const float Rivi1 = 0.0115f, Rivi2 = 0.0100f, Rivi3 = 0.0078f, Sinetti = 0.074f;

        /// <summary>Kuvan leveys julisteen leveydelle W (kehyksellä aukon leveys).</summary>
        public static int KuvanLeveys(int julisteW) => Mathf.RoundToInt(julisteW * Mathf.Min(1f, KehysValmis ? Aukko.width : 1f - 2f * Reuna));
        static int JulisteenLeveys(int kuvaW) => Mathf.RoundToInt(kuvaW / Mathf.Min(1f, KehysValmis ? Aukko.width : 1f - 2f * Reuna));
        /// <summary>Kuvan koko julisteeseen, jonka kuva-alan leveys on kuvaW (E v3: 0,934 W × 1,084 W; kehyksellä aukon muoto).</summary>
        public static (int w, int h) KuvanKoko(int kuvaW) => KehysValmis
            ? (kuvaW, Mathf.RoundToInt(JulisteenLeveys(kuvaW) * 1.25f * Aukko.height))
            : (kuvaW, Mathf.RoundToInt(JulisteenLeveys(kuvaW) * KuvaKorkeus));

        /// <summary>Koordinaatit asteina ja minuutteina kuten E v3: "60°10′N 24°56′E".</summary>
        public static string Koordinaatit(double lat, double lon)
        {
            static string Dm(double a)
            {
                int m = (int)Math.Round(Math.Abs(a) * 60);
                return $"{m / 60}°{m % 60:00}′";
            }
            return $"{Dm(lat)}{(lat >= 0 ? "N" : "S")} {Dm(lon)}{(lon >= 0 ? "E" : "W")}";
        }

        /// <summary>
        /// Juliste kuvasta (RGBA, kuvan oma koko). valmis saa JPG-tavut tai null (paneelia ei saatu → kutsuja tallentaa pelkän kuvan).
        /// </summary>
        public static IEnumerator Tee(Texture2D kuva, Tiedot t, Action<byte[]> valmis)
        {
            int w = kuva.width, h = kuva.height;
            bool muotoKehys = KehysValmis && Mathf.Abs((float)w / h - Aukko.width / (Aukko.height * 1.25f)) < 0.02f;
            int W = muotoKehys ? Mathf.RoundToInt(w / Mathf.Min(1f, Aukko.width)) : Mathf.RoundToInt(w / (1f - 2f * Reuna)), H = Mathf.RoundToInt(W * 1.25f);
            int reuna = Mathf.RoundToInt(W * Reuna);
            var pohja = Resources.Load<PanelSettings>(UiKerros.PaneeliPolku);
            ThemeStyleSheet teema = null;
            foreach (var d in UnityEngine.Object.FindObjectsByType<UIDocument>(FindObjectsSortMode.None))
                if (d.panelSettings != null && d.panelSettings.themeStyleSheet != null) { teema = d.panelSettings.themeStyleSheet; break; }
            if (pohja == null || teema == null) { valmis(null); yield break; }

            var rt = new RenderTexture(W, H, 0, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB) { name = "IssJuliste" };
            rt.Create();
            var asetukset = UnityEngine.Object.Instantiate(pohja);
            asetukset.name = "IssJuliste";
            asetukset.themeStyleSheet = teema;
            asetukset.targetTexture = rt;
            asetukset.scaleMode = PanelScaleMode.ConstantPixelSize;
            asetukset.scale = 1f;
            asetukset.clearColor = true;
            asetukset.colorClearValue = Color.black;
            asetukset.sortingOrder = -1000;
            var go = new GameObject("IssJuliste");
            go.SetActive(false);
            var doc = go.AddComponent<UIDocument>();
            doc.panelSettings = asetukset;
            go.SetActive(true);
            byte[] jpg = null;
            try
            {
                var juuri = doc.rootVisualElement;
                juuri.style.width = W; juuri.style.height = H;
                juuri.style.backgroundColor = Color.black;
                // Kehys vain, jos kuva on otettu aukon muotoon (e315f33e: kehys latautui kesken kuvauksen → E v3 -kuva venyi 2560 × 3200:aan).
                if (muotoKehys) RakennaKehyksella(juuri, kuva, t, W, H);
                else Rakenna(juuri, kuva, t, W, H, w, h, reuna);
            }
            catch (Exception e) { Debug.LogException(e); valmis(null); Siivoa(go, asetukset, rt); yield break; }
            // Kaksi piirtoa: asettelu ja fonttiatlas valmiiksi ennen lukua.
            yield return null; yield return null; yield return new WaitForEndOfFrame();
            try
            {
                var vanha = RenderTexture.active;
                RenderTexture.active = rt;
                var ulos = new Texture2D(W, H, TextureFormat.RGB24, false);
                ulos.ReadPixels(new Rect(0, 0, W, H), 0, 0);
                ulos.Apply(false);
                RenderTexture.active = vanha;
                jpg = ulos.EncodeToJPG(93);
                UnityEngine.Object.Destroy(ulos);
            }
            catch (Exception e) { Debug.LogException(e); jpg = null; }
            Siivoa(go, asetukset, rt);
            valmis(jpg);
        }

        static void Siivoa(GameObject go, PanelSettings asetukset, RenderTexture rt)
        {
            UnityEngine.Object.Destroy(go);
            UnityEngine.Object.Destroy(asetukset);
            rt.Release(); UnityEngine.Object.Destroy(rt);
        }

        static VisualElement Absoluuttinen(float vasen, float yla, float leveys, float korkeus)
        {
            var e = new VisualElement();
            e.style.position = Position.Absolute;
            e.style.left = vasen; e.style.top = yla; e.style.width = leveys; e.style.height = korkeus;
            return e;
        }

        static void Rakenna(VisualElement juuri, Texture2D kuva, Tiedot t, int W, int H, int w, int h, int reuna)
        {
            Color kulta = Tyylikirja.Kehys.Kulta, valkea = Tyylikirja.Kehys.Kerma, harmaa = Tyylikirja.Kehys.Muted;
            Color kehys = Tyylikirja.Kehys.InkLight; kehys.a = 0.35f;

            // Kuva ohuessa vaaleassa kehyksessä.
            var kuvaEl = Absoluuttinen(reuna, reuna, w, h);
            kuvaEl.style.backgroundImage = new StyleBackground(kuva);
            float viiva = Mathf.Max(1f, W * 0.0012f);
            kuvaEl.style.borderTopWidth = kuvaEl.style.borderBottomWidth = kuvaEl.style.borderLeftWidth = kuvaEl.style.borderRightWidth = viiva;
            kuvaEl.style.borderTopColor = kuvaEl.style.borderBottomColor = kuvaEl.style.borderLeftColor = kuvaEl.style.borderRightColor = kehys;
            juuri.Add(kuvaEl);

            // Matkakirjan logo avaruudessa kaaren yllä.
            var logo = Resources.Load<Texture2D>("MatkakirjaUI/logo");
            if (logo != null)
            {
                float lw = W * LogoLeveys, lh = lw * logo.height / logo.width;
                var logoEl = Absoluuttinen((W - lw) * 0.5f, reuna + W * LogoYla, lw, lh);
                logoEl.style.backgroundImage = new StyleBackground(logo);
                juuri.Add(logoEl);
            }

            // Paikannimi kuvan päällä vasemmassa alakulmassa: valkoiset versaalit ja kultaiset koordinaatit.
            var nimi = Absoluuttinen(reuna + W * NimiSisennys, 0, w * 0.6f, 0);
            nimi.style.top = StyleKeyword.Auto; nimi.style.height = StyleKeyword.Auto;
            nimi.style.bottom = H - reuna - h + W * NimiAla;
            nimi.style.flexDirection = FlexDirection.Column;
            nimi.style.alignItems = Align.FlexStart;
            juuri.Add(nimi);
            // Pehmeä tumma varjo: teksti erottuu myös pilven päällä (Manaus 41658bec: valkoinen valkoisella).
            Color varjo = Color.black; varjo.a = 0.75f;
            var tv = new TextShadow { offset = new Vector2(0, W * 0.0012f), blurRadius = W * 0.006f, color = varjo };
            var n1 = Rivi((t.Nimi ?? "").ToUpperInvariant(), Kirjasin.KoneBold, W * NimiKoko, valkea, 0.10f * W * NimiKoko, TextAnchor.MiddleLeft);
            var n2 = Rivi(Koordinaatit(t.Lat, t.Lon), Kirjasin.Kone, W * KoordKoko, kulta, 0.12f * W * KoordKoko, TextAnchor.MiddleLeft);
            n1.style.textShadow = tv; n2.style.textShadow = tv;
            nimi.Add(n1); nimi.Add(n2);

            // Alamarginaali: kolme riviä keskellä, ISS-sinetti oikealla kuvan oikean reunan tasalla.
            float ala = H - reuna - h;
            var teksti = Absoluuttinen(reuna, reuna + h, w, ala);
            teksti.style.flexDirection = FlexDirection.Column;
            teksti.style.alignItems = Align.Center;
            teksti.style.justifyContent = Justify.Center;
            juuri.Add(teksti);
            var r1 = Rivi("INTERNATIONAL SPACE STATION ISS", Kirjasin.Kone, W * Rivi1, kulta, 0.30f * W * Rivi1, TextAnchor.MiddleCenter);
            r1.style.marginBottom = W * 0.006f;
            teksti.Add(r1);
            if (!string.IsNullOrEmpty(t.Tekninen))
            {
                var r2 = Rivi(t.Tekninen, Kirjasin.Luku, W * Rivi2, valkea, 0, TextAnchor.MiddleCenter);
                r2.style.marginBottom = W * 0.004f;
                teksti.Add(r2);
            }
            teksti.Add(Rivi(string.IsNullOrEmpty(t.Lahde) ? "Contains modified Copernicus Sentinel data" : t.Lahde, Kirjasin.Luku, W * Rivi3, harmaa, 0, TextAnchor.MiddleCenter));

            var leima = Resources.Load<Texture2D>("IssKamera/iss-sinetti");
            if (leima != null)
            {
                float d = W * Sinetti;
                var sinetti = Absoluuttinen(reuna + w - d, reuna + h + (ala - d) * 0.5f, d, d);
                sinetti.style.backgroundImage = new StyleBackground(leima);
                juuri.Add(sinetti);
            }
        }

        /// <summary>Cupola-kehys: kuva aukkoon, kehys päälle, logo ikkunan yläosaan, tekstit ja sinetti mustaan ohjaamoon.</summary>
        static void RakennaKehyksella(VisualElement juuri, Texture2D kuva, Tiedot t, int W, int H)
        {
            Color kulta = Tyylikirja.Kehys.Kulta, valkea = Tyylikirja.Kehys.Kerma, harmaa = Tyylikirja.Kehys.Muted;
            var A = Aukko;
            float ax = A.x * W, ay = A.y * H, aw = A.width * W, ah = A.height * H;
            // Kuva hieman aukkoa suurempana (pehmeän reunan alle ei jää mustaa).
            var kuvaEl = Absoluuttinen(ax - W * 0.004f, ay - W * 0.004f, aw + W * 0.008f, ah + W * 0.008f);
            kuvaEl.style.backgroundImage = new StyleBackground(kuva);
            juuri.Add(kuvaEl);
            // Kehys samalla suurennoksella (keskeltä vaakaan, aukon yläreunasta pystyyn); reunat rajautuvat julisteen ulkopuolelle.
            var kehysEl = Absoluuttinen(W * 0.5f * (1 - KehysZoom), aukko.y * H * (1 - KehysZoom), W * KehysZoom, H * KehysZoom);
            kehysEl.style.backgroundImage = new StyleBackground(kehys);
            juuri.Add(kehysEl);
            // Logo avaruuteen ikkunan yläosaan (omistaja 6.10.: "matkakirjan logo pitää olla tuolla ylhäällä juuri niin kun se onkin").
            var logo = Resources.Load<Texture2D>("MatkakirjaUI/logo");
            if (logo != null)
            {
                float lw = W * LogoLeveys, lh = lw * logo.height / logo.width;
                var logoEl = Absoluuttinen(ax + (aw - lw) * 0.5f, ay + ah * 0.07f, lw, lh);
                logoEl.style.backgroundImage = new StyleBackground(logo);
                juuri.Add(logoEl);
            }
            // Ohjaamo: aukon alareunasta julisteen alareunaan.
            float y0 = ay + ah + W * 0.015f, alaH = H - y0 - W * 0.02f;
            float d = W * Sinetti * 1.35f;
            var teksti = Absoluuttinen(W * 0.08f, y0, W * 0.84f - d - W * 0.02f, alaH);
            teksti.style.flexDirection = FlexDirection.Column;
            teksti.style.alignItems = Align.FlexStart;
            teksti.style.justifyContent = Justify.Center;
            juuri.Add(teksti);
            var n1 = Rivi((t.Nimi ?? "").ToUpperInvariant(), Kirjasin.KoneBold, W * NimiKoko * 1.35f, valkea, 0.10f * W * NimiKoko * 1.35f, TextAnchor.MiddleLeft);
            n1.style.marginBottom = W * 0.004f; teksti.Add(n1);
            var n2 = Rivi(Koordinaatit(t.Lat, t.Lon), Kirjasin.Kone, W * KoordKoko * 1.3f, kulta, 0.12f * W * KoordKoko * 1.3f, TextAnchor.MiddleLeft);
            n2.style.marginBottom = W * 0.012f; teksti.Add(n2);
            var r1 = Rivi("INTERNATIONAL SPACE STATION ISS", Kirjasin.Kone, W * Rivi1 * 1.15f, kulta, 0.30f * W * Rivi1, TextAnchor.MiddleLeft);
            r1.style.marginBottom = W * 0.005f; teksti.Add(r1);
            if (!string.IsNullOrEmpty(t.Tekninen))
            {
                var r2 = Rivi(t.Tekninen, Kirjasin.Luku, W * Rivi2 * 1.1f, valkea, 0, TextAnchor.MiddleLeft);
                r2.style.whiteSpace = WhiteSpace.Normal; r2.style.marginBottom = W * 0.004f; teksti.Add(r2);
            }
            var r3 = Rivi(string.IsNullOrEmpty(t.Lahde) ? "Contains modified Copernicus Sentinel data" : t.Lahde, Kirjasin.Luku, W * Rivi3 * 1.1f, harmaa, 0, TextAnchor.MiddleLeft);
            r3.style.whiteSpace = WhiteSpace.Normal; teksti.Add(r3);
            var leima = Resources.Load<Texture2D>("IssKamera/iss-sinetti");
            if (leima != null)
            {
                var sinetti = Absoluuttinen(W * 0.92f - d, y0 + (alaH - d) * 0.5f, d, d);
                sinetti.style.backgroundImage = new StyleBackground(leima);
                juuri.Add(sinetti);
            }
        }

        static Label Rivi(string teksti, Kirjasin k, float koko, Color vari, float vali, TextAnchor tasaus)
        {
            var l = Kirjasimet.Aseta(new Label(teksti), k);
            l.style.fontSize = koko;
            l.style.color = vari;
            l.style.letterSpacing = vali;
            l.style.marginTop = l.style.marginBottom = 0;
            l.style.paddingTop = l.style.paddingBottom = l.style.paddingLeft = l.style.paddingRight = 0;
            l.style.unityTextAlign = tasaus;
            return l;
        }
    }
}
