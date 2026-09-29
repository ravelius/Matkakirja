// AVARUUSKÄVELYN NÄKYMÄ (Linssiseppä 2, 29.9.2026; suunnitelma docs/raportit/avaruuskavely-suunnitelma-20260929.md):
// PAIKKAMERKIT ennen Codexin kerroksia — harmaat laatikot luukulle (ilmalukko), kaiteelle ja käsineelle karabiineineen,
// vaiheen ohje ruudun alalaidassa ja vertailukortti (oma kuva | astronautin NASA-kuva lähimmästä kohteesta). Pulun
// repliikit puhekuplana (Pulu.Sano, näkyy aina) ja kypäräradiona (KavelyAanet). Kaikki päästää kosketukset
// läpi: napautus menee AstronauttiKerroksen kautta AstronauttiLinssi.NapautaIss → Avaruuskavely.Napauta.
// Tila luetaan linssin tilakoneesta 10 kertaa sekunnissa kyydin aikana (linssi luodaan joka avauksella uudelleen).
using System.Collections;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class AvaruuskavelyNakyma
    {
        static readonly Color Harmaa = new Color(0.55f, 0.56f, 0.58f, 0.92f), Tumma = new Color(0.16f, 0.17f, 0.19f, 0.96f);

        readonly VisualElement juuri, luukku, kaide, kasine, kortti, oma, nasa;
        readonly Label ohje, karabiini, nasaNimi;
        IVisualElementScheduledItem kysely;
        KavelynVaihe vaihe = KavelynVaihe.Ei;
        string sanottu;
        Texture2D omaKuva;
        KavelyAanet aanet;

        public KavelynVaihe Vaihe => vaihe;

        public AvaruuskavelyNakyma(UiKerros kerros)
        {
            juuri = Rakenne.El("mk-kavely", kerros.Juuri(LinssiUi.Ylakerros), PickingMode.Ignore);
            Tayta(juuri);
            juuri.style.display = DisplayStyle.None;

            // Ilmalukko: Questin luukku sisältä (paikkamerkki), luukku liukuu ylös avattaessa.
            luukku = Laatikko(juuri, Tumma);
            Tayta(luukku);
            var kansi = Laatikko(luukku, Harmaa);
            kansi.style.left = Length.Percent(18); kansi.style.right = Length.Percent(18);
            kansi.style.top = Length.Percent(22); kansi.style.bottom = Length.Percent(22);
            kansi.style.borderTopLeftRadius = kansi.style.borderTopRightRadius = 40;
            kansi.style.borderBottomLeftRadius = kansi.style.borderBottomRightRadius = 40;
            Merkki("LUUKKU (paikkamerkki)", kansi);
            luukku.style.transitionProperty = new StyleList<StylePropertyName>(new System.Collections.Generic.List<StylePropertyName> { new StylePropertyName("translate") });
            luukku.style.transitionDuration = new StyleList<TimeValue>(new System.Collections.Generic.List<TimeValue> { new TimeValue(1.2f, TimeUnit.Second) });

            // Ulkona: kaide ruudun alaosassa ja käsine oikeassa alakulmassa (karabiini irti / kiinni).
            kaide = Laatikko(juuri, Harmaa);
            kaide.style.left = 0; kaide.style.right = 0; kaide.style.bottom = Length.Percent(16); kaide.style.height = Length.Percent(4);
            Merkki("KAIDE", kaide);
            kasine = Laatikko(juuri, Harmaa);
            kasine.style.right = Length.Percent(4); kasine.style.bottom = Length.Percent(4);
            kasine.style.width = Length.Percent(34); kasine.style.height = Length.Percent(18);
            Merkki("KÄSINE", kasine);
            karabiini = Merkki("", kasine);

            ohje = Rakenne.Teksti("", "mk-kavely__ohje", juuri);
            ohje.style.position = Position.Absolute;
            ohje.style.left = Length.Percent(6); ohje.style.right = Length.Percent(40); ohje.style.bottom = Length.Percent(6);
            ohje.style.color = Color.white; ohje.style.fontSize = 17;
            ohje.style.backgroundColor = new Color(0, 0, 0, 0.55f);
            ohje.style.paddingLeft = ohje.style.paddingRight = 12; ohje.style.paddingTop = ohje.style.paddingBottom = 8;
            ohje.style.borderTopLeftRadius = ohje.style.borderTopRightRadius = ohje.style.borderBottomLeftRadius = ohje.style.borderBottomRightRadius = 14;
            Kirjasimet.Aseta(ohje, Kirjasin.Kone);

            // Vertailukortti: oma kuva | NASA-kuva (Codexin kehys tulee myöhemmin).
            kortti = Laatikko(juuri, Tumma);
            kortti.style.left = Length.Percent(5); kortti.style.right = Length.Percent(5);
            kortti.style.top = Length.Percent(18); kortti.style.bottom = Length.Percent(22);
            kortti.style.flexDirection = FlexDirection.Row;
            kortti.style.paddingLeft = kortti.style.paddingRight = kortti.style.paddingTop = kortti.style.paddingBottom = 10;
            oma = Puolikas(kortti, "OMA KUVA", out _);
            nasa = Puolikas(kortti, "ASTRONAUTTI (NASA)", out nasaNimi);
        }

        /// <summary>Kyyti alkoi / päättyi (AstronautinNakyma): tilaa kysytään linssiltä vain kyydin aikana.</summary>
        public void Kyydissa(bool auki)
        {
            if (auki) { kysely ??= juuri.schedule.Execute(Paivita).Every(100); kysely.Resume(); }
            else { kysely?.Pause(); Aseta(KavelynVaihe.Ei, null); }
        }

        static AstronauttiLinssi Linssi() => Object.FindAnyObjectByType<AstronauttiKerros>()?.Linssi;

        void Paivita()
        {
            var l = Linssi();
            var k = l?.Kavely;
            Aseta(k?.Vaihe ?? KavelynVaihe.Ei, l);
        }

        void Aseta(KavelynVaihe uusi, AstronauttiLinssi l)
        {
            var k = l?.Kavely;
            ohje.text = k?.Ohje ?? "";
            ohje.style.display = string.IsNullOrEmpty(ohje.text) ? DisplayStyle.None : DisplayStyle.Flex;
            // Repliikki kerran vaiheen alussa (sama repliikki köydellä ei toistu).
            var rep = k?.Repliikki;
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
            if (uusi == KavelynVaihe.Ei) sanottu = null;
            Debug.Log($"avaruuskävely: {vanha} → {uusi}");
            juuri.style.display = uusi == KavelynVaihe.Ei ? DisplayStyle.None : DisplayStyle.Flex;
            // Luukku: ilmalukossa koko ruutu, ulos lähtiessä liukuu ylös (vähennetty liike: pois heti).
            bool lukossa = uusi == KavelynVaihe.Ilmalukko;
            luukku.style.display = lukossa || uusi == KavelynVaihe.Ulos ? DisplayStyle.Flex : DisplayStyle.None;
            luukku.style.translate = new Translate(0, lukossa ? Length.Percent(0) : Length.Percent(-100));
            bool ulkona = uusi >= KavelynVaihe.Ulos && uusi <= KavelynVaihe.Kuva;
            kaide.style.display = kasine.style.display = ulkona ? DisplayStyle.Flex : DisplayStyle.None;
            karabiini.text = uusi <= KavelynVaihe.Koysi ? "karabiini: IRTI" : "karabiini: KIINNI";
            kortti.style.display = uusi == KavelynVaihe.Vertailu ? DisplayStyle.Flex : DisplayStyle.None;
            if (vanha == KavelynVaihe.Kuva && uusi == KavelynVaihe.Vertailu) UiKerros.Hae().StartCoroutine(OtaKuva(l));
            Aanet().Vaihe(vanha, uusi);
        }

        KavelyAanet Aanet() => aanet != null ? aanet : aanet = KavelyAanet.Luo();

        /// <summary>Oma kuva: kerrokset piiloon, ruutu kehyksen lopussa, sitten kortti (NASA-kuva lähimmästä kohteesta).</summary>
        IEnumerator OtaKuva(AstronauttiLinssi l)
        {
            juuri.style.visibility = Visibility.Hidden;
            yield return null;
            yield return new WaitForEndOfFrame();
            if (omaKuva != null) Object.Destroy(omaKuva);
            omaKuva = ScreenCapture.CaptureScreenshotAsTexture();
            juuri.style.visibility = Visibility.Visible;
            oma.style.backgroundImage = new StyleBackground(omaKuva);
            Debug.Log($"avaruuskävely: kuva {omaKuva.width}×{omaKuva.height}");
            nasa.style.backgroundImage = StyleKeyword.None;
            var v = l?.KavelynVertailu;
            if (v == null) { nasaNimi.text = "ei NASA-kohdetta"; yield break; }
            var kohde = v.Value.Kohde;
            nasaNimi.text = $"{kohde.Nimi} · {KyydinTeksti.Luku(v.Value.Km)} km";
            var h = kohde.Havainnot.Count > 0 ? kohde.Havainnot[kohde.OletusIndeksi] : null;
            string osoite = h?.Pikku ?? h?.Kuva;
            Debug.Log($"avaruuskävely: vertailu {kohde.Tunnus} {v.Value.Km:0} km {osoite}");
            if (!string.IsNullOrEmpty(osoite))
                Kuvat.Hae(osoite, t => { if (t != null && vaihe == KavelynVaihe.Vertailu) nasa.style.backgroundImage = new StyleBackground(t); });
        }

        static void Tayta(VisualElement e)
        {
            e.style.position = Position.Absolute;
            e.style.left = 0; e.style.top = 0; e.style.right = 0; e.style.bottom = 0;
        }

        static VisualElement Laatikko(VisualElement isa, Color vari)
        {
            var e = Rakenne.El("mk-kavely__laatikko", isa, PickingMode.Ignore);
            e.style.position = Position.Absolute;
            e.style.backgroundColor = vari;
            e.style.alignItems = Align.Center;
            e.style.justifyContent = Justify.Center;
            return e;
        }

        static Label Merkki(string teksti, VisualElement isa)
        {
            var l = Rakenne.Teksti(teksti, "mk-kavely__merkki", isa);
            l.style.color = new Color(1, 1, 1, 0.85f);
            l.style.fontSize = 14;
            Kirjasimet.Aseta(l, Kirjasin.KoneLihava);
            return l;
        }

        static VisualElement Puolikas(VisualElement isa, string otsikko, out Label alla)
        {
            var p = Rakenne.El("mk-kavely__puolikas", isa, PickingMode.Ignore);
            p.style.flexGrow = 1; p.style.flexBasis = 0;
            p.style.marginLeft = p.style.marginRight = 5;
            p.style.backgroundColor = new Color(0.3f, 0.31f, 0.33f, 1);
            p.style.backgroundSize = new BackgroundSize(BackgroundSizeType.Cover);
            p.style.justifyContent = Justify.SpaceBetween;
            Merkki(otsikko, p);
            alla = Merkki("", p);
            return p;
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
