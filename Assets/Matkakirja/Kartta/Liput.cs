using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using UnityEngine;
using UnityEngine.Experimental.Rendering;

namespace Matkakirja
{
    /// <summary>
    /// LIPUT TUULESSA (löydös 144, Natiiviseppä 26.9.2026): lipun arvokas aaltoilu UI Toolkitin taustakuvaksi. Natiivi-UI
    /// hakee lipun tekstuurin (Kuvat.Hae) ja pyytää siitä kahvan <see cref="Aaltoile"/>(lähde, w, h); kahvan
    /// <see cref="Aalto.Kuva"/> on pieni RenderTexture, jonka UI näyttää (Background.FromRenderTexture), ja
    /// <see cref="Aalto.Paivittyi"/> kertoo, milloin kuva vaihtui (MarkDirtyRepaint). Rajapinta: RAJAPINTA.md luku 3e.
    ///
    /// TEKNIIKKA: Graphics.Blit aaltovarjostimella (Resources/Lippuaalto.shader) suoraan w × h -kokoiseen RT:hen: ei
    /// kameraa, ei verkkoa, yksi täyden ruudun nelikulmio per lippu ja päivitys. Lippuja on ruudulla kerrallaan muutama
    /// (kartussin lippu, tervehdysten pikkuliput), ja kukin on muutamia tuhansia pikseleitä, joten GPU-työ on mitätön
    /// (arvio alle 0,02 ms/lippu laitteella). RT on sRGB (R8G8B8A8_SRGB): UITK lukee sen kuten tavallisen tekstuurin
    /// lineaarisessa väriavaruudessa; alfa on tavallinen (ei esikerrottu), ja läpinäkyvien reunapikselien väri on lipun
    /// reunaväri (varjostin puristaa näytteen reunaan), joten bilineaarinen suodatus ei tuo tummaa reunusta.
    ///
    /// LÄMPÖ (Raamattu LÄMPÖ JA VIRRANKULUTUS NATIIVISSA): yksi yhteinen ajuri (piilotettu LiputAjuri, DontDestroyOnLoad),
    /// joka piirtää enintään <see cref="Fps"/> kertaa sekunnissa ja vain kahvat, joilla <see cref="Aalto.Nakyy"/> on tosi.
    /// Kun mikään ei näy, ajuri ei tee mitään (ei Blitiä, ei tapahtumia). Aaltoilu on jatkuva idle-animaatio, joten se
    /// seuraa JOUTOSYKETTÄ (<see cref="Joutosyke.Aika"/> ja <see cref="Joutosyke.Voima"/>) kuten aarrepisteen syke: levossa
    /// (3 s ilman aitoa aktiivisuutta, Lampopaatos.SykeLepoS) lippu asettuu 0,3 s:ssa suoraksi, piirretään kerran ja jää
    /// paikalleen; kosketus jatkaa aaltoa siitä, mihin se jäi. Kun Joutosyke muuttuu jatkuvaksi (Lampopaatos.SykeJaatyy,
    /// komento `syke jatkuva`), liput seuraavat. <see cref="SeuraaSyketta"/> = false: oma kello (unscaledTime) ja täysi
    /// voima aina, kun lippu näkyy (vertailuun, komento `liput jatkuva`). Ajuri on PallonLepon animaatio "liput" niin
    /// kauan kuin näkyvä lippu muuttuu, joten Ruudunpaivitys piirtää 30 fps:llä (LEPO) eikä harvenna (PAIKALLAAN);
    /// asettunut lippu ei estä lepoa.
    ///
    /// ARVOKAS AALTO (Fable/omistaja: ei lepatusta): kaksi päällekkäistä siniaaltoa (jaksot 3,0 ja 3,7 s), siirtymä kasvaa
    /// tangosta (vasen reuna, u = 0, pysyy paikallaan) oikeaan reunaan enintään ~4 % lipun korkeudesta, ja kankaan kaltevuus
    /// varjostaa ±7 %. Lippu piirretään <see cref="Reuna"/>:n verran pienempänä joka reunalta (92 %), jotta siirtymä ei
    /// leikkaa kuvaa; UI suurentaa elementin kertoimella 1 / (1 − 2 · Reuna), jos lipun näkyvä koko halutaan ennalleen.
    ///
    /// VARA: jos varjostin puuttuu, kahva saa alkuperäisen kuvan (Blit ilman aaltoa, kerran) ja lokiin varoitus; ei kaatumista.
    /// Komennot: `liput tila | jatkuva | syke | koe nimi [aika]` (Komennot.cs).
    /// </summary>
    public static class Liput
    {
        /// <summary>Päivitysten katto sekunnissa (näkyvät liput yhdessä).</summary>
        public const int Fps = 30;
        /// <summary>Läpinäkyvä marginaali RT:n joka reunalla (osuus): lippu piirretään 1 − 2 · Reuna = 92 %:n kokoisena.</summary>
        public const float Reuna = 0.04f;
        /// <summary>RT:n sivun rajat pikseleinä.</summary>
        public const int PieninSivu = 2, SuurinSivu = 1024;

        /// <summary>Tosi (oletus): aaltoilu seuraa Joutosykettä (levossa asettuu). Epätosi: jatkuva, oma kello.</summary>
        public static bool SeuraaSyketta = true;

        static readonly int AikaId = Shader.PropertyToID("_Aika");
        static readonly int VoimaId = Shader.PropertyToID("_Voima");
        static readonly int ReunaId = Shader.PropertyToID("_Reuna");
        static readonly int KokoId = Shader.PropertyToID("_Koko");

        static readonly List<Aalto> kahvat = new List<Aalto>();
        static readonly Func<bool> muuttuuEhto = Muuttuu;
        static readonly Func<bool> jatkuvaEhto = MuuttuuJatkuva;
        static Material materiaali;
        static bool varjostinHaettu;
        static LiputAjuri ajuri;
        static int luotu, piirtoja;
        static float seuraava;

        /// <summary>
        /// Aaltoilevan lipun kahva. UI lukee <see cref="Kuva"/>n, kuuntelee <see cref="Paivittyi"/>-tapahtumaa ja asettaa
        /// <see cref="Nakyy"/>n; vapautus <see cref="Liput.Vapauta"/>. Kutsut pääsäikeestä.
        /// </summary>
        public sealed class Aalto
        {
            /// <summary>Piirretty lippu (w × h, sRGB, tavallinen alfa). Sama olio koko kahvan eliniän.</summary>
            public RenderTexture Kuva { get; internal set; }
            /// <summary>Lähdetekstuuri (Kuvat.Hae). Ei omisteta: vapautus ei tuhoa sitä.</summary>
            public Texture Lahde { get; internal set; }
            /// <summary>Kuva piirrettiin uudelleen tässä kehyksessä (UI: MarkDirtyRepaint).</summary>
            public event Action Paivittyi;

            /// <summary>Lippu on ruudulla: vain näkyvät päivitetään. Oletus epätosi (kuva on silti piirretty kerran suorana).</summary>
            public bool Nakyy
            {
                get => nakyy;
                set
                {
                    if (nakyy == value) return;
                    nakyy = value;
                    // Näkyviin tullessa kuva ajan tasalle heti seuraavassa ajurin kierroksessa (katon ohi).
                    if (value) likainen = true;
                }
            }

            /// <summary>Tosi: liehuu aina täydellä voimalla omalla kellolla, ei seuraa Joutosykettä (löydös 161: kohdemaan
            /// lipputanko liehuu koko ajan elävällä kerroksella). Oletus epätosi.</summary>
            public bool Jatkuva;

            internal bool nakyy, likainen, vapautettu, staattinen;
            internal float vaihe, piirrettyAika = float.NaN, piirrettyVoima = float.NaN;

            internal void Ilmoita()
            {
                var t = Paivittyi;
                if (t == null) return;
                try { t(); }
                catch (Exception e) { Debug.LogException(e); }
            }

            internal void Irrota() => Paivittyi = null;
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            // Editorin pelitila ilman domain reloadia: edellisen ajon RT:t pois (HideAndDontSave ei tuhoudu itsestään).
            for (int i = kahvat.Count - 1; i >= 0; i--) Vapauta(kahvat[i]);
            kahvat.Clear();
            Tuhoa(materiaali);
            materiaali = null;
            varjostinHaettu = false;
            ajuri = null;
            luotu = piirtoja = 0;
            seuraava = 0f;
            SeuraaSyketta = true;
        }

        /// <summary>
        /// Uusi aaltoileva lippu <paramref name="lahde"/>sta w × h -pikseliseen RT:hen (UI-koko × paneelin skaala; rajataan
        /// <see cref="PieninSivu"/>–<see cref="SuurinSivu"/>). Kuva piirretään heti kerran suorana; aaltoilu alkaa, kun
        /// <see cref="Aalto.Nakyy"/> on tosi. Palauttaa aina kahvan (lähde null = läpinäkyvä kuva).
        /// </summary>
        public static Aalto Aaltoile(Texture lahde, int w, int h)
        {
            w = Mathf.Clamp(w, PieninSivu, SuurinSivu);
            h = Mathf.Clamp(h, PieninSivu, SuurinSivu);
            var kuvaus = new RenderTextureDescriptor(w, h, GraphicsFormat.R8G8B8A8_SRGB, 0)
            {
                useMipMap = false,
                autoGenerateMips = false,
                msaaSamples = 1,
            };
            var rt = new RenderTexture(kuvaus)
            {
                name = "Lippuaalto " + (lahde != null ? lahde.name : "-"),
                filterMode = FilterMode.Bilinear,
                wrapMode = TextureWrapMode.Clamp,
                hideFlags = HideFlags.HideAndDontSave,
            };
            rt.Create();
            // Liput eivät aaltoile tahdissa: vaihe kultaisen leikkauksen askelin (0–3 s).
            var a = new Aalto { Kuva = rt, Lahde = lahde, vaihe = (luotu++ * 0.618034f) % 1f * 3f };
            kahvat.Add(a);
            Varmista();
            Piirra(a, 0f, 0f);
            return a;
        }

        /// <summary>Vapauttaa kahvan RT:n ja irrottaa kuuntelijat. Lähdetekstuuri jää Kuvat-välimuistiin. Toistettava.</summary>
        public static void Vapauta(Aalto a)
        {
            if (a == null || a.vapautettu) return;
            a.vapautettu = true;
            a.nakyy = false;
            a.Irrota();
            kahvat.Remove(a);
            if (a.Kuva != null) a.Kuva.Release();
            Tuhoa(a.Kuva);
            a.Kuva = null;
            a.Lahde = null;
        }

        /// <summary>Kahvoja yhteensä / näkyvissä.</summary>
        public static int Kahvoja => kahvat.Count;
        public static int Nakyvia { get { int n = 0; foreach (var k in kahvat) if (k.nakyy) n++; return n; } }

        /// <summary>Tila lokiin (komento `liput tila`).</summary>
        public static string Kuvaus()
        {
            var ic = CultureInfo.InvariantCulture;
            float aika = SeuraaSyketta ? Joutosyke.Aika : Time.unscaledTime, voima = SeuraaSyketta ? Joutosyke.Voima : 1f;
            return $"liput: {kahvat.Count} kahvaa, {Nakyvia} näkyvissä, piirtoja {piirtoja}, varjostin " +
                   $"{(Materiaali() != null ? "ok" : "PUUTTUU (suora kuva)")}, kello {(SeuraaSyketta ? "joutosyke" : "jatkuva")} " +
                   $"(aika {aika.ToString("0.0", ic)} s, voima {voima.ToString("0.00", ic)}), muuttuu {Muuttuu()}";
        }

        /// <summary>
        /// Laitekoe ilman UI:ta (komento `liput koe nimi [aika]`): raidallinen koelippu 120 × 80 aaltoon hetkellä
        /// <paramref name="aika"/> täydellä voimalla, kuva PNG:nä polkuun. Palauttaa lokirivin.
        /// </summary>
        public static string Koe(string polku, float aika)
        {
            const int w = 120, h = 80;
            var lahde = new Texture2D(90, 60, TextureFormat.RGBA32, false) { name = "Koelippu", wrapMode = TextureWrapMode.Repeat };
            var px = new Color32[90 * 60];
            for (int y = 0; y < 60; y++)
            for (int x = 0; x < 90; x++)
            {
                // Kolme pystyraitaa ja tumma ruudukko 10 px välein: siirtymä ja varjostus erottuvat kuvasta.
                Color32 c = x < 30 ? new Color32(0, 140, 69, 255) : x < 60 ? new Color32(244, 245, 240, 255) : new Color32(205, 33, 42, 255);
                if (x % 10 == 0 || y % 10 == 0) c = new Color32(40, 32, 24, 255);
                px[y * 90 + x] = c;
            }
            lahde.SetPixels32(px);
            lahde.Apply(false);
            var a = Aaltoile(lahde, w, h);
            Piirra(a, aika, 1f);
            var ennen = RenderTexture.active;
            var luku = new Texture2D(w, h, TextureFormat.RGBA32, false);
            RenderTexture.active = a.Kuva;
            luku.ReadPixels(new Rect(0, 0, w, h), 0, 0, false);
            luku.Apply(false);
            RenderTexture.active = ennen;
            string tulos;
            try
            {
                File.WriteAllBytes(polku, luku.EncodeToPNG());
                tulos = $"liput koe: {polku} ({w} × {h}, aika {aika.ToString("0.00", CultureInfo.InvariantCulture)} s, " +
                        $"varjostin {(Materiaali() != null ? "ok" : "PUUTTUU")})";
            }
            catch (Exception e) { tulos = "liput koe: kirjoitus epäonnistui: " + e.Message; }
            Vapauta(a);
            Tuhoa(luku);
            Tuhoa(lahde);
            return tulos;
        }

        static void Tuhoa(UnityEngine.Object o)
        {
            if (o == null) return;
            if (Application.isPlaying) UnityEngine.Object.Destroy(o);
            else UnityEngine.Object.DestroyImmediate(o);
        }

        // ---- Ajuri ----

        static void Varmista()
        {
            if (ajuri != null || !Application.isPlaying) return;
            var go = new GameObject("LiputAjuri") { hideFlags = HideFlags.HideInHierarchy };
            UnityEngine.Object.DontDestroyOnLoad(go);
            ajuri = go.AddComponent<LiputAjuri>();
        }

        internal static void AjuriPois(LiputAjuri a)
        {
            if (ajuri == a) ajuri = null;
        }

        internal static void Rekisteroi(bool paalle)
        {
            // Jatkuvat (lipputanko) elävällä kerroksella: kartta ei piirry niiden takia (löydös 161 B).
            if (paalle) { PallonLepo.Animoi(muuttuuEhto, "liput"); ElavaKerros.Animoi(jatkuvaEhto, "lippu", Fps); }
            else { PallonLepo.Poista(muuttuuEhto); ElavaKerros.Poista(jatkuvaEhto); }
        }

        /// <summary>Aaltoilun kello ja voima tällä hetkellä.</summary>
        static void Tila(Aalto k, out float aika, out float voima)
        {
            // Jatkuva lippu seuraa silti sykettä, kun animaatiot ovat staattisia (lämpö, virransäästö; ElavaKerros.Staattinen).
            if ((SeuraaSyketta && !k.Jatkuva) || (k.Jatkuva && ElavaKerros.Staattinen)) { aika = Joutosyke.Aika; voima = Joutosyke.Voima; }
            else { aika = Time.unscaledTime; voima = 1f; }
        }

        /// <summary>Samannäköinen kuin viimeksi piirretty: suora lippu on sama ajasta riippumatta.</summary>
        static bool Sama(Aalto k, float aika, float voima) =>
            voima <= 0f ? k.piirrettyVoima <= 0f : k.piirrettyVoima == voima && k.piirrettyAika == aika;

        /// <summary>PallonLepon animaatioehto: jokin näkyvä lippu muuttuisi, jos se piirrettäisiin nyt.</summary>
        static bool Muuttuu()
        {
            if (kahvat.Count == 0) return false;
            foreach (var k in kahvat)
            {
                if (!k.nakyy || (k.Jatkuva && !ElavaKerros.Staattinen)) continue;
                Tila(k, out float aika, out float voima);
                if (k.likainen || (!k.staattinen && !Sama(k, aika, voima))) return true;
            }
            return false;
        }

        /// <summary>Elävän kerroksen ehto: jatkuva näkyvä lippu muuttuisi (lipputanko, löydös 161).</summary>
        static bool MuuttuuJatkuva()
        {
            if (ElavaKerros.Staattinen) return false;
            foreach (var k in kahvat)
            {
                // Jatkuva lippu liehuu aina (ajuri on voinut piirtää sen jo tässä kehyksessä ennen Ruudunpaivitystä).
                if (k.nakyy && k.Jatkuva && (!k.staattinen || k.likainen)) return true;
            }
            return false;
        }

        /// <summary>Kerran kehyksessä (LiputAjuri.LateUpdate, PallonLepon jälkeen: Joutosyke on päivitetty).</summary>
        internal static void Paivita()
        {
            if (kahvat.Count == 0) return;
            bool jokin = false;
            foreach (var k in kahvat) if (k.nakyy) { jokin = true; break; }
            if (!jokin) return;

            float nyt = Time.unscaledTime;
            const float vali = 1f / Fps;
            // Katto: 30 fps:n kehykset osuvat väliin pienellä värinällä, joten neljänneksen jousto (muuten joka toinen jäisi).
            bool vuoro = nyt >= seuraava - vali * 0.25f;
            bool piirsi = false;
            // Tapahtuman kuuntelija voi vapauttaa kahvan: kopio ennen kierrosta.
            var lista = kahvat.ToArray();
            foreach (var k in lista)
            {
                if (k.vapautettu || !k.nakyy) continue;
                bool rt = k.Kuva != null && !k.Kuva.IsCreated();
                if (rt) k.Kuva.Create();
                if (k.staattinen && !rt && !k.likainen) continue;
                Tila(k, out float aika, out float voima);
                if (!rt && !k.likainen && (!vuoro || Sama(k, aika, voima))) continue;
                Piirra(k, aika, voima);
                piirsi = true;
                k.Ilmoita();
            }
            if (piirsi && vuoro) seuraava = Mathf.Max(seuraava + vali, nyt);
        }

        static Material Materiaali()
        {
            if (materiaali != null || varjostinHaettu) return materiaali;
            varjostinHaettu = true;
            var varjostin = Resources.Load<Shader>("Lippuaalto");
            if (varjostin == null) varjostin = Shader.Find("Matkakirja/Lippuaalto");
            if (varjostin == null || !varjostin.isSupported)
            {
                Debug.LogWarning("MATKAKIRJA liput: varjostin Matkakirja/Lippuaalto puuttuu tai ei toimi, liput suorina");
                return null;
            }
            materiaali = new Material(varjostin) { name = "Lippuaalto", hideFlags = HideFlags.HideAndDontSave };
            return materiaali;
        }

        static void Piirra(Aalto k, float aika, float voima)
        {
            k.likainen = false;
            k.piirrettyAika = aika;
            k.piirrettyVoima = voima;
            var rt = k.Kuva;
            if (rt == null) return;
            var ennen = RenderTexture.active;
            if (k.Lahde == null)
            {
                // Lähde puuttuu (tai tuhottiin välimuistista): läpinäkyvä kuva.
                RenderTexture.active = rt;
                GL.Clear(false, true, Color.clear);
            }
            else
            {
                var m = Materiaali();
                if (m == null)
                {
                    Graphics.Blit(k.Lahde, rt);
                    k.staattinen = true;
                }
                else
                {
                    // Yhteinen materiaali: Graphics.Blit ottaa arvot talteen kutsuhetkellä, joten ominaisuudet per lippu.
                    m.SetFloat(AikaId, aika + k.vaihe);
                    m.SetFloat(VoimaId, Mathf.Clamp01(voima));
                    m.SetFloat(ReunaId, Reuna);
                    m.SetVector(KokoId, new Vector4(rt.width, rt.height, 1f / rt.width, 1f / rt.height));
                    Graphics.Blit(k.Lahde, rt, m, 0);
                }
            }
            RenderTexture.active = ennen;
            piirtoja++;
        }
    }

    /// <summary>
    /// Lippujen yhteinen ajuri (Liput.cs): LateUpdate PallonLepon (9990, päivittää Joutosykkeen) jälkeen ja ennen
    /// Ruudunpaivitystä (10000). Ei tee mitään, kun yksikään lippu ei näy.
    /// </summary>
    [DefaultExecutionOrder(9995)]
    [AddComponentMenu("")]
    public sealed class LiputAjuri : MonoBehaviour
    {
        void OnEnable() => Liput.Rekisteroi(true);
        void OnDisable() => Liput.Rekisteroi(false);
        void OnDestroy() => Liput.AjuriPois(this);
        void LateUpdate() => Liput.Paivita();
    }
}
