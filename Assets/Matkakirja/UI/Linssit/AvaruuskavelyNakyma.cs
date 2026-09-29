// AVARUUSKÄVELYN NÄKYMÄ (Linssiseppä 2, 29.9.2026; suunnitelma docs/raportit/avaruuskavely-suunnitelma-20260929.md):
// Codexin kerrokset (~/Documents/Codex/2026-09-29/avaruuskavely-kerrokset, manifest.json; tuonti tyokalut/kavely_kerrokset.py):
// iPhone pysty 1290 × 2796 ja iPad vaaka 2732 × 2048, ruudun peittävänä (cover, keskitetty). Ilmalukko: luukku (avautuu
// saranastaan ulospäin, 2D:ssä vaakapuristuksena saranan ympäri), kehys ja valovuoto. Ulkona takaa eteen: rakenne, paneeli,
// kaide, köysi, käsine (irti / kiinni), visiiri ja valokerrokset valo-rakenne / -kaide / -käsine. UI Toolkitissa ei ole
// additiivista sekoitusta: valokerrokset alfasekoituksella, voimakkuus ISS:n auringosta (Avaruuskavely.Aurinkoisuus), ja
// metallin sävy tummuu varjossa (maavalo 0,28) — auringonnousu pyyhkäisee etualan. Vertailukortti: oma kuvakaappaus ja
// astronautin NASA-kuva kortin kuva-alueisiin, tekstit alle. Pulun repliikit puhekuplana ja kypäräradiona (KavelyAanet).
// Kaikki päästää kosketukset läpi: napautus menee AstronauttiKerroksen kautta AstronauttiLinssi.NapautaIss → Avaruuskavely.
// Tila luetaan linssin tilakoneesta 30 kertaa sekunnissa kävelyn aikana (10 kertaa kyydissä muuten).
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    /// <summary>Codexin kerrosten variantti (generoitu KavelyKerrokset.Rajaukset.cs).</summary>
    public static partial class KavelyKerrokset
    {
        public sealed class Variantti
        {
            public Vector2 Kangas, Karabiini, KoysiAnkkuri, Sarana;
            public Rect Vapaa, Aukko;
            public float HorisonttiY, LuukunKulma;
        }

        static readonly Dictionary<string, Texture2D> kuvat = new Dictionary<string, Texture2D>();

        /// <summary>Kerroksen kuva Resources/KavelyKerrokset/&lt;laite&gt;/&lt;nimi&gt; (välimuistissa), null = puuttuu.</summary>
        public static Texture2D Kuva(string laite, string nimi)
        {
            string avain = laite + "/" + nimi;
            if (!kuvat.TryGetValue(avain, out var t))
            {
                t = Resources.Load<Texture2D>("KavelyKerrokset/" + avain);
                if (t == null) Debug.LogWarning("MATKAKIRJA avaruuskävely: kerros puuttuu " + avain);
                kuvat[avain] = t;
            }
            return t;
        }
    }

    public sealed class AvaruuskavelyNakyma
    {
        /// <summary>Ulos-vaiheen ajoitus (s, IssKyyti.UlosS = 4): luukku avautuu, ilmalukko häipyy, etuala liukuu paikalleen.</summary>
        const float LuukkuS = 1.2f, LukkoPoisAlku = 1.0f, LukkoPoisS = 1.0f, EtualaAlku = 1.2f, EtualaS = 1.8f, EtualanLiuku = 0.28f;
        /// <summary>Maavalo varjossa (metallin sävy) ja valokerrosten enimmäisvoimakkuus.</summary>
        const float Varjossa = 0.28f, ValoMax = 1f;

        static readonly string[] Ulko = { "rakenne", "paneeli", "kaide", "koysi", "kasine-irti", "kasine-kiinni", "visiiri", "valo-rakenne", "valo-kaide", "valo-kasine" };
        static readonly string[] Lukko = { "ilmalukko-luukku", "ilmalukko-kehys", "ilmalukko-valo" };

        readonly VisualElement juuri, kangas, lukko, ulko, korttiJuuri, kortti, oma, nasa;
        readonly Label ohje, omaTeksti, nasaTeksti;
        readonly Dictionary<string, VisualElement> kerrokset = new Dictionary<string, VisualElement>();
        readonly List<VisualElement> perus = new List<VisualElement>(), valot = new List<VisualElement>();
        IVisualElementScheduledItem kysely;
        KavelynVaihe vaihe = KavelynVaihe.Ei;
        string sanottu, laite;
        KavelyKerrokset.Variantti v;
        double vaiheAlkoi;
        Texture2D omaKuva;
        KavelyAanet aanet;

        public KavelynVaihe Vaihe => vaihe;
        /// <summary>Kävely alkoi (AstronautinNakyma sulkee Pulun taulun, jos se jäi auki).</summary>
        public event System.Action Alkoi;

        public AvaruuskavelyNakyma(UiKerros kerros)
        {
            juuri = Rakenne.El("mk-kavely", kerros.Juuri(LinssiUi.Ylakerros), PickingMode.Ignore);
            Tayta(juuri);
            juuri.style.overflow = Overflow.Hidden;
            juuri.style.display = DisplayStyle.None;
            juuri.RegisterCallback<GeometryChangedEvent>(_ => Mitoita());
            kangas = Rakenne.El("mk-kavely__kangas", juuri, PickingMode.Ignore);
            kangas.style.position = Position.Absolute;
            ulko = Rakenne.El("mk-kavely__ulko", kangas, PickingMode.Ignore);
            Tayta(ulko);
            lukko = Rakenne.El("mk-kavely__lukko", kangas, PickingMode.Ignore);
            Tayta(lukko);

            ohje = Rakenne.Teksti("", "mk-kavely__ohje", juuri);
            ohje.style.position = Position.Absolute;
            ohje.style.left = Length.Percent(6); ohje.style.right = Length.Percent(6); ohje.style.bottom = Length.Percent(5);
            ohje.style.unityTextAlign = TextAnchor.MiddleCenter;
            ohje.style.color = Color.white; ohje.style.fontSize = 17;
            ohje.style.backgroundColor = new Color(0, 0, 0, 0.5f);
            ohje.style.paddingLeft = ohje.style.paddingRight = 12; ohje.style.paddingTop = ohje.style.paddingBottom = 8;
            ohje.style.borderTopLeftRadius = ohje.style.borderTopRightRadius = ohje.style.borderBottomLeftRadius = ohje.style.borderBottomRightRadius = 14;
            Kirjasimet.Aseta(ohje, Kirjasin.Kone);

            // Vertailukortti keskelle (1600 × 1000), kuva-alueet ja tekstit manifestin mukaan.
            korttiJuuri = Rakenne.El("mk-kavely__korttijuuri", juuri, PickingMode.Ignore);
            Tayta(korttiJuuri);
            korttiJuuri.style.alignItems = Align.Center; korttiJuuri.style.justifyContent = Justify.Center;
            korttiJuuri.style.backgroundColor = new Color(0, 0, 0, 0.45f);
            kortti = Rakenne.El("mk-kavely__kortti", korttiJuuri, PickingMode.Ignore);
            var kk = KavelyKerrokset.KortinKangas;
            oma = Alue(kortti, KavelyKerrokset.KuvaVasen, kk);
            nasa = Alue(kortti, KavelyKerrokset.KuvaOikea, kk);
            foreach (var e in new[] { oma, nasa }) { e.style.backgroundSize = new BackgroundSize(BackgroundSizeType.Cover); }
            var kehys = Rakenne.El("mk-kavely__kortti-kehys", kortti, PickingMode.Ignore);
            Tayta(kehys);
            kehys.userData = "kortti";
            omaTeksti = Teksti(Alue(kortti, KavelyKerrokset.TekstiVasen, kk));
            nasaTeksti = Teksti(Alue(kortti, KavelyKerrokset.TekstiOikea, kk));
            korttiJuuri.style.display = DisplayStyle.None;
        }

        /// <summary>Kyyti alkoi / päättyi (AstronautinNakyma): tilaa kysytään linssiltä vain kyydin aikana.</summary>
        public void Kyydissa(bool auki)
        {
            if (auki) { kysely ??= juuri.schedule.Execute(Paivita).Every(33); kysely.Resume(); }
            else { kysely?.Pause(); Aseta(KavelynVaihe.Ei, null); }
        }

        static AstronauttiLinssi Linssi() => Object.FindAnyObjectByType<AstronauttiKerros>()?.Linssi;

        void Paivita()
        {
            var l = Linssi();
            Aseta(l?.Kavely?.Vaihe ?? KavelynVaihe.Ei, l);
            if (vaihe != KavelynVaihe.Ei) Animoi();
        }

        // ---- kerrokset ----

        /// <summary>Variantti ruudun muodon mukaan (vaaka = iPad, pysty = iPhone), kerrokset kerran per variantti.</summary>
        void Mitoita()
        {
            float W = juuri.layout.width, H = juuri.layout.height;
            if (float.IsNaN(W) || W <= 0 || H <= 0) return;
            string uusi = W > H ? "ipad" : "iphone";
            if (uusi != laite) Rakenna(uusi);
            if (v == null) return;
            // Cover: kangas peittää ruudun, keskitetty.
            float m = Mathf.Max(W / v.Kangas.x, H / v.Kangas.y);
            kangas.style.width = v.Kangas.x * m; kangas.style.height = v.Kangas.y * m;
            kangas.style.left = (W - v.Kangas.x * m) / 2; kangas.style.top = (H - v.Kangas.y * m) / 2;
            float kw = Mathf.Min(W * 0.92f, H * 0.8f * 1.6f);
            kortti.style.width = kw; kortti.style.height = kw / 1.6f;
            float fs = Mathf.Clamp(kw / 1600f * 34f, 12f, 26f);
            omaTeksti.style.fontSize = fs; nasaTeksti.style.fontSize = fs;
        }

        void Rakenna(string uusi)
        {
            laite = uusi;
            KavelyKerrokset.Variantit.TryGetValue(uusi, out v);
            ulko.Clear(); lukko.Clear(); kerrokset.Clear(); perus.Clear(); valot.Clear();
            if (v == null) return;
            foreach (var n in Ulko) Lisaa(ulko, n, n.StartsWith("valo-"));
            foreach (var n in Lukko) Lisaa(lukko, n, n == "ilmalukko-valo");
            // Luukku kääntyy saranastaan (vasen reuna): 2D:ssä vaakapuristus saranan ympäri.
            if (kerrokset.TryGetValue("ilmalukko-luukku", out var luukku) && KavelyKerrokset.Rajaukset.TryGetValue(uusi + "/ilmalukko-luukku", out var r))
                luukku.style.transformOrigin = new TransformOrigin(Length.Percent((v.Sarana.x - r.x) / r.width * 100f), Length.Percent((v.Sarana.y - r.y) / r.height * 100f));
            var kehys = kortti.Q(className: "mk-kavely__kortti-kehys");
            var kt = KavelyKerrokset.Kuva(uusi, "vertailukortti");
            if (kehys != null && kt != null) kehys.style.backgroundImage = new StyleBackground(kt);
            Debug.Log($"avaruuskävely: kerrokset {uusi} ({kerrokset.Count})");
        }

        void Lisaa(VisualElement isa, string nimi, bool valo)
        {
            var t = KavelyKerrokset.Kuva(laite, nimi);
            if (t == null || !KavelyKerrokset.Rajaukset.TryGetValue(laite + "/" + nimi, out var r)) return;
            var e = Rakenne.El("mk-kavely__kerros", isa, PickingMode.Ignore);
            e.style.position = Position.Absolute;
            e.style.left = Length.Percent(r.x / v.Kangas.x * 100f); e.style.top = Length.Percent(r.y / v.Kangas.y * 100f);
            e.style.width = Length.Percent(r.width / v.Kangas.x * 100f); e.style.height = Length.Percent(r.height / v.Kangas.y * 100f);
            e.style.backgroundImage = new StyleBackground(t);
            e.style.backgroundSize = new BackgroundSize(BackgroundSizeType.Contain);
            kerrokset[nimi] = e;
            (valo ? valot : perus).Add(e);
        }

        VisualElement K(string nimi) => kerrokset.TryGetValue(nimi, out var e) ? e : null;

        static void Nayta(VisualElement e, bool nakyy) { if (e != null) e.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None; }

        /// <summary>Kehys: ilmalukon avautuminen, etualan liuku ja auringon valo.</summary>
        void Animoi()
        {
            if (v == null) Mitoita();
            float t = (float)(Time.realtimeSinceStartupAsDouble - vaiheAlkoi);
            bool vahennetty = LinssiUi.VahennettyLiike();
            // Ilmalukko ja Ulos: luukku 0 → 1 (avautuu), ilmalukko häipyy, etuala liukuu.
            float auki = vaihe == KavelynVaihe.Ilmalukko ? 0f : vahennetty ? 1f : Mathf.Clamp01(t / LuukkuS);
            float lukkoNakyy = vaihe == KavelynVaihe.Ilmalukko ? 1f : vaihe == KavelynVaihe.Ulos && !vahennetty ? 1f - Mathf.Clamp01((t - LukkoPoisAlku) / LukkoPoisS) : 0f;
            float etuala = vaihe == KavelynVaihe.Ilmalukko ? 0f : vaihe == KavelynVaihe.Ulos && !vahennetty ? Pehmea(Mathf.Clamp01((t - EtualaAlku) / EtualaS)) : 1f;
            if (vaihe == KavelynVaihe.Takaisin) etuala = 1f - Mathf.Clamp01(t / (float)Avaruuskavely.TakaisinS);
            var luukku = K("ilmalukko-luukku");
            if (luukku != null)
            {
                // Avautuu ulospäin katsojan vasemmalle (Codex 105–108°): leveys kosinina, reuna tummuu.
                float kulma = auki * v.LuukunKulma * Mathf.Deg2Rad;
                luukku.style.scale = new Scale(new Vector2(Mathf.Max(0.001f, Mathf.Cos(Mathf.Min(kulma, Mathf.PI / 2 - 0.01f))), 1f));
                luukku.style.opacity = kulma > Mathf.PI / 2 ? 0f : 1f;
            }
            var lv = K("ilmalukko-valo");
            if (lv != null) lv.style.opacity = auki;
            lukko.style.opacity = lukkoNakyy;
            Nayta(lukko, lukkoNakyy > 0.001f);
            ulko.style.opacity = etuala;
            ulko.style.translate = new Translate(0, Length.Percent((1f - etuala) * EtualanLiuku * 100f));
            Nayta(ulko, etuala > 0.001f);
            Nayta(K("kasine-irti"), vaihe <= KavelynVaihe.Koysi);
            Nayta(K("kasine-kiinni"), vaihe > KavelynVaihe.Koysi);
            // Aurinko: valokerrokset ja metallin sävy (maavalo varjossa).
            float sun = (float)Avaruuskavely.Aurinkoisuus(IssNyt.Kello());
            float s = Mathf.Lerp(Varjossa, 1f, sun);
            var savy = new Color(s, s, Mathf.Lerp(Varjossa * 1.25f, 1f, sun), 1f);
            foreach (var e in perus) e.style.unityBackgroundImageTintColor = savy;
            float reuna = (float)Avaruuskavely.ReunaValo(IssNyt.Kello());
            foreach (var e in valot) e.style.opacity = reuna * ValoMax;
        }

        static float Pehmea(float x) => x * x * (3 - 2 * x);

        // ---- vaiheet ----

        /// <summary>
        /// Pulun repliikit (kupla ja kypäräradio) avaruuskävelyllä. Omistaja 29.9.2026: "Ota pulun ääni toistaiseksi kokonaan pois
        /// ISS-kohtauksesta." Pulu näkyy, mutta ei puhu; vaiheiden ajoitus ennallaan. A/B `astro kavely pulu 1`.
        /// </summary>
        public static bool PuluPuhuu;

        void Aseta(KavelynVaihe uusi, AstronauttiLinssi l)
        {
            var k = l?.Kavely;
            ohje.text = k?.Ohje ?? "";
            ohje.style.display = string.IsNullOrEmpty(ohje.text) ? DisplayStyle.None : DisplayStyle.Flex;
            // Repliikki kerran vaiheen alussa (sama repliikki köydellä ei toistu).
            var rep = PuluPuhuu ? k?.Repliikki : null;
            if (rep.HasValue && rep.Value.Tunnus != sanottu)
            {
                sanottu = rep.Value.Tunnus;
                Pulu.Hae()?.Sano(rep.Value.Teksti, naytaAina: true);
                Aanet().Pulu(rep.Value.Tunnus);
                Debug.Log($"avaruuskävely: Pulu \"{rep.Value.Teksti}\"");
            }
            if (uusi == vaihe) return;
            var vanha = vaihe;
            vaihe = uusi;
            vaiheAlkoi = Time.realtimeSinceStartupAsDouble;
            if (uusi == KavelynVaihe.Ei) sanottu = null;
            if (vanha == KavelynVaihe.Ei && uusi != KavelynVaihe.Ei) Alkoi?.Invoke();
            Debug.Log($"avaruuskävely: {vanha} → {uusi}");
            juuri.style.display = uusi == KavelynVaihe.Ei ? DisplayStyle.None : DisplayStyle.Flex;
            korttiJuuri.style.display = uusi == KavelynVaihe.Vertailu ? DisplayStyle.Flex : DisplayStyle.None;
            if (uusi != KavelynVaihe.Ei) Animoi();
            if (vanha == KavelynVaihe.Kuva && uusi == KavelynVaihe.Vertailu) UiKerros.Hae().StartCoroutine(OtaKuva(l));
            Aanet().Vaihe(vanha, uusi);
        }

        KavelyAanet Aanet() => aanet != null ? aanet : aanet = KavelyAanet.Luo();

        /// <summary>Oma kuva: ohje ja kortti piiloon (etuala jää kuvaan), ruutu kehyksen lopussa, sitten kortti.</summary>
        IEnumerator OtaKuva(AstronauttiLinssi l)
        {
            korttiJuuri.style.visibility = Visibility.Hidden;
            ohje.style.visibility = Visibility.Hidden;
            yield return null;
            yield return new WaitForEndOfFrame();
            if (omaKuva != null) Object.Destroy(omaKuva);
            omaKuva = ScreenCapture.CaptureScreenshotAsTexture();
            korttiJuuri.style.visibility = Visibility.Visible;
            ohje.style.visibility = Visibility.Visible;
            oma.style.backgroundImage = new StyleBackground(omaKuva);
            var utc = IssNyt.Kello();
            var p = IssNyt.Paikka(utc);
            omaTeksti.text = $"Oma kuva ISS:n kaiteelta\n{Paikka(p.Lat, p.Lon)}";
            Debug.Log($"avaruuskävely: kuva {omaKuva.width}×{omaKuva.height}");
            nasa.style.backgroundImage = StyleKeyword.None;
            var vv = l?.KavelynVertailu;
            if (vv == null) { nasaTeksti.text = "Astronautin kuvaa ei löytynyt"; yield break; }
            var kohde = vv.Value.Kohde;
            nasaTeksti.text = $"Astronautin kuva (NASA)\n{kohde.Nimi} · {KyydinTeksti.Luku(vv.Value.Km)} km alapisteestä";
            var h = kohde.Havainnot.Count > 0 ? kohde.Havainnot[kohde.OletusIndeksi] : null;
            string osoite = h?.Pikku ?? h?.Kuva;
            Debug.Log($"avaruuskävely: vertailu {kohde.Tunnus} {vv.Value.Km:0} km {osoite}");
            if (!string.IsNullOrEmpty(osoite))
                Kuvat.Hae(osoite, t => { if (t != null && vaihe == KavelynVaihe.Vertailu) nasa.style.backgroundImage = new StyleBackground(t); });
        }

        static string Paikka(double lat, double lon) =>
            $"{System.Math.Abs(lat):0.0}° {(lat >= 0 ? "N" : "S")}, {System.Math.Abs(lon):0.0}° {(lon >= 0 ? "E" : "W")}";

        static void Tayta(VisualElement e)
        {
            e.style.position = Position.Absolute;
            e.style.left = 0; e.style.top = 0; e.style.right = 0; e.style.bottom = 0;
        }

        static VisualElement Alue(VisualElement isa, Rect r, Vector2 kangas)
        {
            var e = Rakenne.El("mk-kavely__alue", isa, PickingMode.Ignore);
            e.style.position = Position.Absolute;
            e.style.left = Length.Percent(r.xMin / kangas.x * 100f); e.style.top = Length.Percent(r.yMin / kangas.y * 100f);
            e.style.width = Length.Percent(r.width / kangas.x * 100f); e.style.height = Length.Percent(r.height / kangas.y * 100f);
            return e;
        }

        static Label Teksti(VisualElement isa)
        {
            var l = Rakenne.Teksti("", "mk-kavely__teksti", isa);
            l.style.color = new Color(0.93f, 0.9f, 0.84f, 1f);
            l.style.whiteSpace = WhiteSpace.Normal;
            Kirjasimet.Aseta(l, Kirjasin.Kone);
            return l;
        }
    }

    /// <summary>
    /// Avaruuskävelyn äänet (Pelikoodari 29.9.2026, ElevenLabs, lokit/avaruuskavely-aanet/aanet.json): ilmalukon paineentasaus,
    /// luukku, karabiini, suljin ja saumaton hengityssilmukka kypärässä, sekä Pulun kolme repliikkiä kypäräradiona. WAV
    /// Resources/KavelyAanet/ (mp3:n kooderiviive pois, silmukka näytetarkka). Quindar-piippaus (2 525 Hz, 250 ms) ennen Pulun
    /// radiorepliikkiä tehdään tässä (NASA:n radioliikenteen merkkiääni).
    /// </summary>
    public sealed class KavelyAanet : MonoBehaviour
    {
        public const float QuindarHz = 2525, QuindarS = 0.25f, HengitysVoima = 0.35f;
        AudioSource kerta, puhe, hengitys;
        AudioClip quindar;
        Coroutine puhuu;

        public static KavelyAanet Luo()
        {
            var go = new GameObject("KavelyAanet");
            DontDestroyOnLoad(go);
            var a = go.AddComponent<KavelyAanet>();
            AudioSource L(bool silmukka)
            {
                var s = go.AddComponent<AudioSource>();
                s.playOnAwake = false; s.spatialBlend = 0; s.loop = silmukka;
                return s;
            }
            a.kerta = L(false);
            a.puhe = L(false);
            a.hengitys = L(true);
            a.hengitys.clip = Klippi("hengitys-silmukka");
            // Quindar: siniaalto 2 525 Hz, 5 ms:n reunat (ei napsahdusta), −12 dBFS.
            int n = (int)(44100 * QuindarS);
            var d = new float[n];
            for (int i = 0; i < n; i++)
                d[i] = 0.25f * Mathf.Sin(2 * Mathf.PI * QuindarHz * i / 44100f) * Mathf.Clamp01(Mathf.Min(i, n - 1 - i) / 220f);
            a.quindar = AudioClip.Create("quindar", n, 1, 44100, false);
            a.quindar.SetData(d, 0);
            return a;
        }

        static AudioClip Klippi(string nimi)
        {
            var c = Resources.Load<AudioClip>("KavelyAanet/" + nimi);
            if (c == null) Debug.LogWarning("MATKAKIRJA avaruuskävely: ääni puuttuu " + nimi);
            return c;
        }

        void Tehoste(string nimi)
        {
            var c = Klippi(nimi);
            if (c != null) kerta.PlayOneShot(c, Matkakirja.Natiivi.Aanet.Taso(AaniKanava.Tehoste));
        }

        /// <summary>Vaiheen tehosteet ja hengitys (ulkona Ulos…Vertailu).</summary>
        public void Vaihe(KavelynVaihe vanha, KavelynVaihe uusi)
        {
            switch (uusi)
            {
                case KavelynVaihe.Ilmalukko: Tehoste("ilmalukko-paine"); break;
                case KavelynVaihe.Ulos: Tehoste("ilmalukko-luukku"); break;
                case KavelynVaihe.Auringonnousu when vanha == KavelynVaihe.Koysi: Tehoste("karabiini"); break;
                case KavelynVaihe.Vertailu: Tehoste("suljin"); break;
            }
            bool ulkona = uusi >= KavelynVaihe.Ulos && uusi <= KavelynVaihe.Vertailu;
            hengitys.volume = HengitysVoima * Matkakirja.Natiivi.Aanet.Taso(AaniKanava.Tehoste);
            if (ulkona && !hengitys.isPlaying && hengitys.clip != null) { hengitys.time = 0; hengitys.Play(); }
            else if (!ulkona && hengitys.isPlaying) hengitys.Stop();
            if (uusi == KavelynVaihe.Ei || uusi == KavelynVaihe.Takaisin) Hiljaa();
        }

        /// <summary>Pulun repliikki kypäräradiossa: quindar, sitten ääni (luukku = 1, nousu = 2, kuva = 3).</summary>
        public void Pulu(string tunnus)
        {
            string nimi = tunnus switch { "luukku" => "pulu-1", "nousu" => "pulu-2", "kuva" => "pulu-3", _ => null };
            if (nimi == null) return;
            Hiljaa();
            puhuu = StartCoroutine(Puhu(Klippi(nimi)));
        }

        IEnumerator Puhu(AudioClip c)
        {
            float taso = Matkakirja.Natiivi.Aanet.Taso(AaniKanava.Puhe);
            puhe.PlayOneShot(quindar, taso);
            yield return new WaitForSecondsRealtime(QuindarS + 0.1f);
            if (c == null) yield break;
            puhe.clip = c;
            puhe.volume = taso;
            puhe.Play();
            LinssiOhjain.Instanssi?.Kirjaa($"avaruuskävely: Pulu soi {c.name} {c.length:F2} s");
        }

        void Hiljaa()
        {
            if (puhuu != null) StopCoroutine(puhuu);
            puhuu = null;
            puhe.Stop();
        }
    }
}
