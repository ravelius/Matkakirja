// LUENTAKUVASARJA (Natiivi-UI, erä 5): webin "isot kuvat keskellä ruutua"
// (js/fokusvirta.js naytaLuentakuvasarja, css/fokusvirta.css ~2508–2740).
//
// Isoisän luentakuva avautuu keskelle ruutua vasta kun luento todella alkaa;
// luentakuva2 vaihtuu päälle 9 s kohdalla; Livian PuluCam-kuvat liittyvät
// pakkaan 4 s välein hänen kommenttinsa aikana. Kuvat eivät ristihäivy vaan
// pinoutuvat korteiksi vuorotellen kallistettuina (2,0° + 0,4° per kortti,
// siirto 14 × 8 pt, enintään 7) — omistaja 15.9.2026. Terävät reunat ja
// paperikehys, ei Ken Burnsia. Lyhyt kuvateksti paperikaistaleella kuvan alla
// (#f7f1e2). Löydös 138 (omistaja, build 16): kehys ja kuvateksti pois, pelkkä kuva. Viimeinen kuva häipyy 6 s hiljaisuuden jälkeen ja kuvat lentävät
// matkakirjakortin pikkukuviksi. "Ohita" kelluu pakan alla ja pysäyttää
// luennon (PeliOhjain.OhitaLuento); kuvan napautus avaa suurennoksen.
// Pakka on kortin alla (webin z 3 < rail 4) eikä ota kosketuksia (kartta liikkuu).
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Luentakuvasarja
    {
        public const int VaihtoMs = 9000, PuluVaihtoMs = 4000, LoppuMs = 6000, Katto = 7;
        const float Kallistus = 2.0f, KallistusLisa = 0.4f, SiirtoX = 14f, SiirtoY = 8f;

        readonly VisualElement pakka;
        // Suurennos selattavana sarjana (webin avaaSuurennos ‹ ›): pitkä kuvateksti ja lähde.
        readonly Kuvasuurennos suurennos;
        readonly Button ohita;
        readonly List<VisualElement> kortit = new List<VisualElement>();
        IVisualElementScheduledItem loppu;

        /// <summary>Kutsutaan kun kuvat lähtevät (webin kuvien lento korttiin).</summary>
        public event Action<VirtaKuva> Lahti;
        readonly List<VirtaKuva> naytetyt = new List<VirtaKuva>();

        public Luentakuvasarja(UiKerros kerros, VisualElement turva)
        {
            pakka = Rakenne.El("mk-kuvapakka", turva, PickingMode.Ignore);
            ohita = Rakenne.Nappi("Ohita", "mk-ohita", Ohita, turva);
            Kirjasimet.Aseta(ohita, Kirjasin.Kone);
            ohita.style.display = DisplayStyle.None;
            // OHITA AINA LUENNAN AIKANA (omistaja TF 141, 5.10.2026 klo 00.5x: "Eikä siinä ole Ohita nappia"): myös muu
            // automaattinen luenta kuin fokusluento (saapumismerkinnän synteesi, kysymyksen repliikki) tuo saman Ohitan samaan
            // paikkaan kartalla. Tarkistus 4 kertaa sekunnissa.
            pakka.schedule.Execute(SeuraaMuutaLuentaa).Every(250);

            suurennos = new Kuvasuurennos(kerros.Juuri(UiKerros.Valikot));
        }

        public bool Nakyy => kortit.Count > 0;

        /// <summary>Arvioijakierros 30.9. (1.1 (75)): Ohita näkyy vain luennan aikana (Saapumisesitys.Alkoi → tosi,
        /// Loppui → epätosi). Livian kommentin PuluCam-kuvat eivät tuo Ohitaa takaisin.</summary>
        public bool LuentoKaynnissa
        {
            get => luentoKaynnissa;
            set
            {
                luentoKaynnissa = value;
                if (!value) { ohita.style.display = DisplayStyle.None; return; }
                // Omistaja 30.9. (TF 1.1 (81)): Ohita koko luennon ajan, myös kaupungeissa ilman luentakuvia (Bryssel,
                // Košice, Ljubljana, Luxemburg, Valletta: ennen Ohita ilmestyi vain ensimmäisen kuvan mukana). Paikka
                // seuraa kasvavaa kaistaletta.
                ohita.style.display = DisplayStyle.Flex;
                AsetaPaikka();
                paikanSeuranta ??= pakka.schedule.Execute(AsetaPaikka).Every(250);
                paikanSeuranta.Resume();
            }
        }
        bool luentoKaynnissa;

        /// <summary>Uusi kuva pakan päälle (lataa ensin; kuva, joka ei lataudu, jää pois).</summary>
        public void Lisaa(VirtaKuva k)
        {
            if (k == null) return;
            loppu?.Pause();
            ohita.style.display = luentoKaynnissa ? DisplayStyle.Flex : DisplayStyle.None;
            AsetaPaikka(); // Ohita heti oikeaan reunaan, ei ensin alas keskelle
            Natiivi.Kuvat.Hae(k.Osoite, t =>
            {
                if (t == null) return;
                int n = kortit.Count;
                var kortti = Rakenne.El("mk-kuvakortti", pakka, PickingMode.Ignore);
                var kuva = Rakenne.El("mk-kuvakortti__kuva", kortti, PickingMode.Ignore);
                kuva.style.backgroundImage = new StyleBackground(t);
                float suhde = t.height > 0 ? (float)t.width / t.height : 1.5f;
                kuva.style.aspectRatio = suhde;
                kortti.style.width = Leveys(suhde);
                // Löydös 138 (omistaja, build 16): ei kuvatekstiä kuvan alla (paperikehys pois, Pulu.uss).
                // Vuorotellen vasemmalle ja oikealle, kallistus kasvaa pakan mukana.
                float suunta = n % 2 == 0 ? -1f : 1f;
                kortti.style.rotate = new Rotate(new Angle(suunta * (Kallistus + KallistusLisa * n)));
                kortti.style.translate = new Translate(suunta * SiirtoX * Mathf.Min(n, 3) * 0.5f, SiirtoY * Mathf.Min(n, 3) * 0.5f);
                kortit.Add(kortti);
                naytetyt.Add(k);
                Rakenne.Nayta(kortti, true, 400);
                while (kortit.Count > Katto) { kortit[0].RemoveFromHierarchy(); kortit.RemoveAt(0); }
                AsetaPaikka();
                paikanSeuranta ??= pakka.schedule.Execute(AsetaPaikka).Every(250);
                paikanSeuranta.Resume();
            });
        }

        /// <summary>
        /// Löydös 90 (omistaja, build 13: isoisän kuvat isommiksi iPadilla): web css/fokusvirta.css .fokusvirta-luentakuva
        /// --luentakuva-leveys min(80vw, 22rem) ja --luentakuva-korkeus min(34vh, 15rem), tablettikaistalla (700–1400 px)
        /// molemmat × 1,5. iPad 834: 528 pt (ennen 420), iPhone 393: 314 pt. Pystykuva kapenee korkeuskattoon.
        /// </summary>
        float Leveys(float suhde)
        {
            var r = pakka.layout;
            float w = float.IsNaN(r.width) || r.width <= 0f ? Screen.width : r.width;
            float h = float.IsNaN(r.height) || r.height <= 0f ? Screen.height : r.height;
            float kerroin = w >= 700f && w <= 1400f ? 1.5f : 1f;
            // Omistaja 30.9. (TF 1.0.68): puolet pienempi kuin webin keskikuva (kuva kaistaleen alla oikeassa reunassa).
            float leveys = Mathf.Min(0.8f * w, 352f) * kerroin * 0.5f;
            float katto = Mathf.Min(0.34f * h, 240f) * kerroin * 0.5f;
            if (suhde > 0f && leveys / suhde > katto) leveys = katto * suhde;
            return Mathf.Round(leveys);
        }

        /// <summary>
        /// Omistaja 30.9. (TF 1.0.68): kuva ei enää keskellä ruutua, vaan puolikkaana matkakirjakaistaleen tekstin alla
        /// selvästi oikeassa reunassa, jotta kartta jää tutkittavaksi. Kaistaleen laatikko tulee Matkakirjakortilta
        /// (Kaistale = Rajat); kaistale kasvaa tekstin kirjoittuessa, joten paikka päivitetään 250 ms välein pakan näkyessä.
        /// Ilman näkyvää kaistaletta kuva asettuu oikeaan reunaan 28 % korkeudelle.
        /// </summary>
        void AsetaPaikka()
        {
            if (kortit.Count == 0 && !luentoKaynnissa && paikanSeuranta != null) { paikanSeuranta.Pause(); }
            var p = pakka.worldBound;
            if (float.IsNaN(p.height) || p.height <= 0f) return;
            var m = Kaistale?.Invoke() ?? default;
            float yla = m.height > 0f ? m.yMax - p.yMin + 12f : p.height * 0.28f;
            // Kortit ovat absoluuttisia: paikka suoraan kortille (1.0.70-kuva: säiliön täyte ei siirtänyt niitä, kuva
            // painui ruudun reunaan). 28 pt oikealta: pinon siirto (enintään 21 pt) ja kallistus jäävät ruudun sisään.
            float korkeus = 0f;
            foreach (var k in kortit)
            {
                float h = k.layout.height;
                if (!float.IsNaN(h)) korkeus = Mathf.Max(korkeus, h);
            }
            // Omistaja 30.9. (TF 1.1 (81), Macin iPad): Ohita ei näkynyt luennan aikana. iPadilla ja Macilla kaistale näyttää
            // koko luentotekstin ja kasvaa pitkäksi, jolloin kuva ja Ohita sen alla valuivat ruudun alareunan yli. Kuva ja
            // Ohita pysyvät nyt ruudun sisällä: paikka kaistaleen alla, mutta nostetaan niin, että Ohita mahtuu alareunaan.
            float ohitaKorkeus = float.IsNaN(ohita.layout.height) || ohita.layout.height <= 0f ? 44f : ohita.layout.height;
            float kuvanKorkeus = kortit.Count == 0 ? -18f : korkeus > 0f ? korkeus : 120f; // ilman kuvaa Ohita kaistaleen alle
            float alin = p.height - AlaVara - ohitaKorkeus - 18f - kuvanKorkeus;
            yla = Mathf.Max(0f, Mathf.Min(yla, alin));
            foreach (var k in kortit)
            {
                k.style.top = yla;
                k.style.right = 28f;
                k.style.left = StyleKeyword.Auto;
            }
            // Ohita kuvan alle oikeaan reunaan (Päätoimittaja 30.9.: 1.0.71:ssä Ohita peitti alhaalla Liiku-napin).
            // Pakka ja Ohita ovat samassa turva-säiliössä, joten pakan koordinaatit käyvät sellaisenaan.
            ohita.style.left = StyleKeyword.Auto;
            ohita.style.bottom = StyleKeyword.Auto;
            ohita.style.translate = new Translate(0, 0);
            ohita.style.right = 28f;
            ohita.style.top = yla + kuvanKorkeus + 18f; // kallistus ja pinon siirto mukaan
        }
        /// <summary>Ohitan alareunan vara: sama kuin USS:n alkuperäinen bottom 110 (Liiku-napin yläpuolella).</summary>
        const float AlaVara = 110f;
        IVisualElementScheduledItem paikanSeuranta;
        /// <summary>Matkakirjakaistaleen laatikko paneelissa (Matkakirjakortti.Rajat), tyhjä jos kaistale ei näy.</summary>
        public Func<Rect> Kaistale;

        /// <summary>Luento tai kommentti loppui: kuvat häipyvät 6 s hiljaisuuden jälkeen.</summary>
        public void Hiljeni(int viiveMs = LoppuMs)
        {
            loppu?.Pause();
            loppu = pakka.schedule.Execute(() => Tyhjenna(true)).StartingIn(viiveMs);
        }

        /// <summary>Kuvien lennon maali (Matkakirjakortti): kortin laatikko paneelissa tai tyhjä, jos kortti ei näy.</summary>
        public Func<Rect> Maali;

        /// <summary>Web fokusvirta.js KUVALENNON_MS, KUVALENNON_PORRAS_MS ja KUVALENNON_HAIVE_MS.</summary>
        const int LentoMs = 600, PorrasMs = 120, HaiveMs = 220;
        /// <summary>Web matkakirjanPikkukuvanLeveys: .fact-pikkukuva 3,1 rem.</summary>
        const float PikkukuvanLeveys = 49.6f;

        /// <summary>Kuvat pois; lento = kortin pikkukuviksi (Lahti-tapahtuma).</summary>
        public void Tyhjenna(bool lento)
        {
            loppu?.Pause();
            // Web lennataKuvatMatkakirjaan: kukin kuva lentää matkakirjalapun yläreunaan pikkukuvan kokoiseksi (600 ms),
            // seuraava 120 ms myöhemmin, ja häipyy perillä 220 ms:ssa. Ilman näkyvää korttia (tai vähennetty liike)
            // kuvat häipyvät paikallaan kuten ennen.
            var m = lento && !LinssiUi.VahennettyLiike() ? Maali?.Invoke() ?? default : default;
            int i = 0;
            foreach (var k in kortit)
            {
                var poistettava = k;
                var wb = k.worldBound;
                if (m.width > 0 && wb.width > 0)
                {
                    int viive = i * PorrasMs;
                    var t0 = k.resolvedStyle.translate;
                    var d = new Vector2(m.xMin + PikkukuvanLeveys * (0.5f + i) - wb.center.x, m.yMin - wb.center.y);
                    var st = k.style;
                    st.transitionProperty = new List<StylePropertyName> { "translate", "scale", "opacity" };
                    st.transitionDuration = new List<TimeValue> { new TimeValue(LentoMs, TimeUnit.Millisecond), new TimeValue(LentoMs, TimeUnit.Millisecond), new TimeValue(HaiveMs, TimeUnit.Millisecond) };
                    st.transitionDelay = new List<TimeValue> { new TimeValue(viive, TimeUnit.Millisecond), new TimeValue(viive, TimeUnit.Millisecond), new TimeValue(viive + LentoMs - HaiveMs, TimeUnit.Millisecond) };
                    st.transitionTimingFunction = new List<EasingFunction> { new EasingFunction(EasingMode.EaseInOut), new EasingFunction(EasingMode.EaseInOut), new EasingFunction(EasingMode.Linear) };
                    st.translate = new Translate(t0.x + d.x, t0.y + d.y);
                    float s = Mathf.Clamp(PikkukuvanLeveys / wb.width, 0.05f, 1f);
                    st.scale = new Scale(new Vector2(s, s));
                    st.opacity = 0f;
                    k.schedule.Execute(() => poistettava.RemoveFromHierarchy()).StartingIn(viive + LentoMs + 50);
                }
                else
                {
                    k.AddToClassList("mk-kuvakortti--lahtee");
                    k.schedule.Execute(() => poistettava.RemoveFromHierarchy()).StartingIn(650);
                }
                i++;
            }
            kortit.Clear();
            if (lento) foreach (var k in naytetyt) Lahti?.Invoke(k);
            naytetyt.Clear();
            ohita.style.display = DisplayStyle.None;
        }

        void Ohita()
        {
            // Lento ensin: OhitaLuento herättää PaikanPuheVaiennettu-tapahtuman, joka tyhjentää pakan.
            Tyhjenna(true);
            PeliOhjain.Instanssi?.OhitaLuento();
            // Muu automaattinen luenta (ei fokusluento, jota OhitaLuento pysäyttää) loppuu heti samasta napista.
            var p = Puhe.Instanssi;
            if (p != null && p.AutomaattinenSoi) p.Pysayta(0.15f);
            muuLuenta = false;
            Debug.Log("MATKAKIRJA ui ohita: luenta ohitettu");
        }

        bool muuLuenta;

        /// <summary>Muu automaattinen luenta kartalla (ei linssiä, ei lehteä): Ohita näkyviin, luennan loputtua pois.</summary>
        void SeuraaMuutaLuentaa()
        {
            var p = Puhe.Instanssi;
            var o = PeliOhjain.Instanssi;
            bool kartalla = o != null && (o.Tila == SilmukanTila.Kartta || o.Tila == SilmukanTila.Matkalla) && !o.AloituslentoKaynnissa
                && LinssiOhjain.Rekisteri?.Auki == null && !o.LehtiAuki;
            bool soi = kartalla && p != null && p.AutomaattinenSoi && !luentoKaynnissa;
            if (soi == muuLuenta) return;
            muuLuenta = soi;
            if (luentoKaynnissa) return;
            ohita.style.display = soi ? DisplayStyle.Flex : DisplayStyle.None;
            if (soi)
            {
                AsetaPaikka();
                paikanSeuranta ??= pakka.schedule.Execute(AsetaPaikka).Every(250);
                paikanSeuranta.Resume();
                Debug.Log("MATKAKIRJA ui ohita: näkyviin (automaattinen luenta " + (p.SoivaPersoona ?? "äänite") + ")");
            }
        }

        /// <summary>Suurennos sarjasta (luennan kuvat), alkaen kohdasta alku; ‹ › selaa.</summary>
        public void Suurenna(IReadOnlyList<VirtaKuva> sarja, int alku = 0)
        {
            if (sarja == null || sarja.Count == 0) return;
            var kuvat = new List<LehtiKuva>();
            foreach (var k in sarja)
                kuvat.Add(new LehtiKuva { Lahde = k.Osoite, Lyhyt = k.Lyhyt, Selite = k.Selite ?? k.Lyhyt, LahdeRivi = k.Lahde });
            suurennos.Avaa(kuvat, alku);
        }

        public void Suurenna(VirtaKuva k) => Suurenna(new List<VirtaKuva> { k });
    
        /// <summary>Linssi päällä: pakka ja Ohita piiloon näkyvyydellä (tila säilyy), kuten webin linssien piilotus.</summary>
        public void NaytaSallittu(bool sallitaan)
        {
            var v = sallitaan ? Visibility.Visible : Visibility.Hidden;
            pakka.style.visibility = v;
            ohita.style.visibility = v;
        }
    }
}
