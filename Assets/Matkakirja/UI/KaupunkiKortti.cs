// KAUPUNKIKORTTI (Natiivi-UI, erä 2): kaupungin napautus pallolla.
//
// Verkkopelin kaupunkiliuska (js/pallolauta/kaupunkiliuska.js) ja kaupunkilehden
// masto (#arrival-dialog, css .lehti-ylarivi/.lehti-nimio) yhdeksi pergamentti-
// kortiksi ruudun alaosaan:
//
//   [lippu] ITALIA
//            F I R E N Z E                 (nimiö: Iowan, versaalit, harva)
//   [ kansikuva, kuvateksti ja lähde ]
//   Johdanto (lehden "kaupunki"-aiheen johdanto)
//   [lehti]   Lue kaupunkilehti   · Nykytaide, Luonto …
//   [kompassi] Liiku tänne
//   [lasi]    Tutki kaupunkia        (omassa kaupungissa)
//                              [Sulje]
//
// Näyttödata tulee sisältöpaketista (UiSisalto, Kuvat); toiminnot antaa
// PeliOhjain (Pelikoodarin KaupunkiToiminnot, null = rivi piiloon). Kortti ei
// ole modaalinen (RAJAPINTA): ei himmennystä eikä syötelukkoa, pallo pyörii
// kortin ohi, toisen kaupungin napautus vaihtaa sisällön (Nayta uudelleen).
// Kortti peittää vain oman alueensa (UiKerros.Peittaa → SyoteLukko).
// Korvaa 3D:n NimiKortin, kun pelisilmukka on päällä (UiNakymat).
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class KaupunkiKortti : IKaupunkiKortti
    {
        public const string LehtiIkoni =
            "<path d=\"M4.5 5.5h12v13H7a2.5 2.5 0 0 1-2.5-2.5z\"/><path d=\"M16.5 8.5h3v8a2 2 0 0 1-2 2\"/>"
            + "<path d=\"M7.5 9h6M7.5 12h6M7.5 15h3.5\"/>";

        readonly UiKerros kerros;
        readonly VisualElement alue, kuvaKehys, kuva, rivit;
        readonly Kortti kortti;
        readonly Label maa, nimio, kuvateksti, lahde, johdanto;
        readonly VisualElement lippu;
        KaupunkiToiminnot toiminnot;
        string kaupunki;

        public bool Auki { get; private set; }
        public string Kaupunki => Auki ? kaupunki : null;

        public KaupunkiKortti(UiKerros kerros)
        {
            this.kerros = kerros;
            var juuri = kerros.Juuri(UiKerros.Matkavalinta);
            kerros.Turva(UiKerros.Matkavalinta);

            // Läpinäkyvä alue ruudun alaosaan; vain kortti itse ottaa kosketukset.
            alue = Rakenne.El("mk-kaupunkikortti-alue", juuri, PickingMode.Ignore);
            alue.style.display = DisplayStyle.None;

            kortti = new Kortti("mk-kaupunkikortti");
            alue.Add(kortti);
            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-kaupunkikortti__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Sisus.Add(vieritys);

            var masto = Rakenne.El("mk-masto", vieritys, PickingMode.Ignore);
            var ylarivi = Rakenne.El("mk-masto__ylarivi", masto, PickingMode.Ignore);
            lippu = Rakenne.El("mk-masto__lippu", ylarivi, PickingMode.Ignore);
            maa = Rakenne.Teksti("", "mk-masto__maa", ylarivi);
            Kirjasimet.Aseta(ylarivi, Kirjasin.Kone);
            nimio = Rakenne.Teksti("", "mk-masto__nimio", masto);
            Kirjasimet.Aseta(nimio, Kirjasin.LukuLihava);
            Rakenne.El("mk-masto__viiva", masto, PickingMode.Ignore);

            kuvaKehys = Rakenne.El("mk-kansikuva", vieritys, PickingMode.Ignore);
            kuva = Rakenne.El("mk-kansikuva__kuva", kuvaKehys, PickingMode.Ignore);
            kuvateksti = Rakenne.Teksti("", "mk-kansikuva__teksti", kuvaKehys);
            Kirjasimet.Aseta(kuvateksti, Kirjasin.LukuKursiivi);
            lahde = Rakenne.Teksti("", "mk-kansikuva__lahde", kuvaKehys);

            johdanto = Rakenne.Teksti("", "mk-kaupunkikortti__johdanto", vieritys);
            rivit = Rakenne.El("mk-kaupunkikortti__rivit", vieritys, PickingMode.Ignore);
            Kirjasimet.Aseta(rivit, Kirjasin.Kone);

            kerros.TurvaMuuttui += Asettele;
        }

        void Asettele()
        {
            var r = kerros.Reunat(UiKerros.Matkavalinta);
            alue.style.paddingBottom = r.w + 14;
            alue.style.paddingLeft = r.x + 12;
            alue.style.paddingRight = r.z + 12;
            alue.style.paddingTop = r.y + Ylapalkki.Korkeus + 12;
        }

        public void Nayta(string kaupunkiId, string nimi, KaupunkiToiminnot t)
        {
            kaupunki = kaupunkiId;
            toiminnot = t ?? new KaupunkiToiminnot();
            nimio.text = (nimi ?? kaupunkiId ?? "").ToUpperInvariant();
            maa.text = "";
            lippu.style.display = DisplayStyle.None;
            kuvaKehys.style.display = DisplayStyle.None;
            kuva.style.backgroundImage = StyleKeyword.None;
            johdanto.text = "";
            johdanto.style.display = DisplayStyle.None;
            RakennaRivit(null);
            Asettele();
            if (!Auki)
            {
                Auki = true;
                Rakenne.Nayta(alue, true, 320);
            }

            UiSisalto.Lataa(() => { if (Auki && kaupunki == kaupunkiId) Tayta(UiSisalto.Kaupunki(kaupunkiId)); });
        }

        void Tayta(KaupunkiTiedot k)
        {
            if (k == null) return;
            maa.text = (k.MaaNimi ?? "").ToUpperInvariant();
            if (k.Lippu.Count > 0)
                Kuvat.Hae(k.Lippu[0], t =>
                {
                    if (t == null || kaupunki != k.Id) return;
                    lippu.style.backgroundImage = new StyleBackground(t);
                    lippu.style.width = 15f * t.width / Mathf.Max(1, t.height);
                    lippu.style.display = DisplayStyle.Flex;
                });
            if (!string.IsNullOrEmpty(k.Johdanto))
            {
                johdanto.text = k.Johdanto;
                johdanto.style.display = DisplayStyle.Flex;
            }
            var kansi = k.Kansikuvat.Count > 0 ? k.Kansikuvat[0] : null;
            string tiedosto = kansi?.Tiedosto ?? k.JulisteTiedosto;
            if (tiedosto != null)
            {
                kuvateksti.text = kansi?.Lyhyt ?? k.JulisteOtsikko ?? "";
                kuvateksti.style.display = string.IsNullOrEmpty(kuvateksti.text) ? DisplayStyle.None : DisplayStyle.Flex;
                lahde.text = kansi?.Lahde ?? "";
                lahde.style.display = string.IsNullOrEmpty(lahde.text) ? DisplayStyle.None : DisplayStyle.Flex;
                Kuvat.Hae(tiedosto, t =>
                {
                    if (t == null || kaupunki != k.Id) return;
                    kuva.style.backgroundImage = new StyleBackground(t);
                    kuvaKehys.style.display = DisplayStyle.Flex;
                });
            }
            RakennaRivit(k);
        }

        void RakennaRivit(KaupunkiTiedot k)
        {
            rivit.Clear();
            var t = toiminnot;
            if (t.LueLehti != null && (k == null || k.Lehti))
            {
                string aiheet = k != null && k.Aiheet.Count > 0 ? string.Join(" · ", k.Aiheet.GetRange(0, Mathf.Min(3, k.Aiheet.Count))) : null;
                Rivi(LehtiIkoni, "Lue kaupunkilehti", aiheet, t.LueLehti);
            }
            if (t.Tutki != null) Rivi(Ikonit.Viiva["suurennuslasi"], t.TutkiTeksti ?? "Tutki kaupunkia", null, t.Tutki);
            if (t.Liiku != null) Rivi(Ikonit.Viiva["kompassi"], t.LiikuTeksti ?? "Liiku tänne", null, t.Liiku);
            var napit = Rakenne.El("mk-kortti__napit", rivit, PickingMode.Ignore);
            Rakenne.Nappi("Sulje", "mk-nappi--haamu", Sulje, napit);
        }

        void Rivi(string ikoni, string nimi, string selite, Action toiminto)
        {
            var b = Rakenne.Nappi(null, "mk-valintarivi", () => { if (Auki) toiminto(); }, rivit, ikoni);
            var tekstit = Rakenne.El("mk-valintarivi__tekstit", b, PickingMode.Ignore);
            Rakenne.Teksti(nimi, "mk-valintarivi__nimi", tekstit);
            if (!string.IsNullOrEmpty(selite)) Rakenne.Teksti(selite, "mk-valintarivi__selite", tekstit);
        }

        /// <summary>Piilottaa kortin kutsumatta Sulje-toimintoa (kutsuja siirtyy muualle).</summary>
        public void Piilota()
        {
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(alue, false, 250);
        }

        /// <summary>Sulje-nappi tai ohi-napautus: piilottaa ja kertoo kutsujalle.</summary>
        public void Sulje()
        {
            if (!Auki) return;
            var s = toiminnot?.Sulje;
            Piilota();
            s?.Invoke();
        }
    }
}
