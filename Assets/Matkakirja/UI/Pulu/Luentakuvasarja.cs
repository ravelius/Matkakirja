// LUENTAKUVASARJA (Natiivi-UI, erä 5): webin "isot kuvat keskellä ruutua"
// (js/fokusvirta.js naytaLuentakuvasarja, css/fokusvirta.css ~2508–2740).
//
// Isoisän luentakuva avautuu keskelle ruutua vasta kun luento todella alkaa;
// luentakuva2 vaihtuu päälle 9 s kohdalla; Livian PuluCam-kuvat liittyvät
// pakkaan 4 s välein hänen kommenttinsa aikana. Kuvat eivät ristihäivy vaan
// pinoutuvat korteiksi vuorotellen kallistettuina (2,0° + 0,4° per kortti,
// siirto 14 × 8 pt, enintään 7) — omistaja 15.9.2026. Terävät reunat ja
// paperikehys, ei Ken Burnsia. Lyhyt kuvateksti paperikaistaleella kuvan alla
// (#f7f1e2). Viimeinen kuva häipyy 6 s hiljaisuuden jälkeen ja kuvat lentävät
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

        readonly VisualElement pakka, suurennos;
        readonly Button ohita;
        readonly List<VisualElement> kortit = new List<VisualElement>();
        readonly Label suurennosTeksti, suurennosLahde;
        readonly VisualElement suurennosKuva;
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

            // Suurennos (webin avaaSuurennos): koko ruutu, pitkä kuvateksti ja lähde.
            suurennos = Rakenne.El("mk-himmennys mk-himmennys--tumma mk-suurennos", kerros.Juuri(UiKerros.Valikot));
            suurennos.style.display = DisplayStyle.None;
            suurennos.RegisterCallback<PointerDownEvent>(_ => Rakenne.Nayta(suurennos, false, 200));
            suurennosKuva = Rakenne.El("mk-suurennos__kuva", suurennos, PickingMode.Ignore);
            suurennosTeksti = Rakenne.Teksti("", "mk-suurennos__teksti", suurennos);
            suurennosLahde = Rakenne.Teksti("", "mk-suurennos__lahde", suurennos);
            Kirjasimet.Aseta(suurennosTeksti, Kirjasin.Luku);
        }

        public bool Nakyy => kortit.Count > 0;

        /// <summary>Uusi kuva pakan päälle (lataa ensin; kuva, joka ei lataudu, jää pois).</summary>
        public void Lisaa(VirtaKuva k)
        {
            if (k == null) return;
            loppu?.Pause();
            ohita.style.display = DisplayStyle.Flex;
            Natiivi.Kuvat.Hae(k.Osoite, t =>
            {
                if (t == null) return;
                int n = kortit.Count;
                var kortti = Rakenne.El("mk-kuvakortti", pakka, PickingMode.Ignore);
                var kuva = Rakenne.El("mk-kuvakortti__kuva", kortti, PickingMode.Ignore);
                kuva.style.backgroundImage = new StyleBackground(t);
                float suhde = t.height > 0 ? (float)t.width / t.height : 1.5f;
                kuva.style.aspectRatio = suhde;
                if (!string.IsNullOrEmpty(k.Lyhyt))
                {
                    var teksti = Rakenne.Teksti(k.Lyhyt, "mk-kuvakortti__teksti", kortti);
                    Kirjasimet.Aseta(teksti, Kirjasin.Kone);
                }
                // Vuorotellen vasemmalle ja oikealle, kallistus kasvaa pakan mukana.
                float suunta = n % 2 == 0 ? -1f : 1f;
                kortti.style.rotate = new Rotate(new Angle(suunta * (Kallistus + KallistusLisa * n)));
                kortti.style.translate = new Translate(suunta * SiirtoX * Mathf.Min(n, 3) * 0.5f, SiirtoY * Mathf.Min(n, 3) * 0.5f);
                kortit.Add(kortti);
                naytetyt.Add(k);
                Rakenne.Nayta(kortti, true, 400);
                while (kortit.Count > Katto) { kortit[0].RemoveFromHierarchy(); kortit.RemoveAt(0); }
            });
        }

        /// <summary>Luento tai kommentti loppui: kuvat häipyvät 6 s hiljaisuuden jälkeen.</summary>
        public void Hiljeni(int viiveMs = LoppuMs)
        {
            loppu?.Pause();
            loppu = pakka.schedule.Execute(() => Tyhjenna(true)).StartingIn(viiveMs);
        }

        /// <summary>Kuvat pois; lento = kortin pikkukuviksi (Lahti-tapahtuma).</summary>
        public void Tyhjenna(bool lento)
        {
            loppu?.Pause();
            foreach (var k in kortit)
            {
                k.AddToClassList("mk-kuvakortti--lahtee");
                var poistettava = k;
                k.schedule.Execute(() => poistettava.RemoveFromHierarchy()).StartingIn(650);
            }
            kortit.Clear();
            if (lento) foreach (var k in naytetyt) Lahti?.Invoke(k);
            naytetyt.Clear();
            ohita.style.display = DisplayStyle.None;
        }

        void Ohita()
        {
            PeliOhjain.Instanssi?.OhitaLuento();
            Tyhjenna(true);
        }

        public void Suurenna(VirtaKuva k)
        {
            suurennosTeksti.text = k.Selite ?? k.Lyhyt ?? "";
            suurennosLahde.text = k.Lahde ?? "";
            suurennosKuva.style.backgroundImage = StyleKeyword.None;
            Natiivi.Kuvat.Hae(k.Osoite, t => { if (t != null) suurennosKuva.style.backgroundImage = new StyleBackground(t); });
            Rakenne.Nayta(suurennos, true, 250);
        }
    }
}
