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
//   [silmä]   Nähtävyydet          (web liuskan rivi: kaupungilla on kohdekartta)
//   [kirja]   Turistiopas          (web liuskan rivi: kaupungilla on oppaan artikkeli)
//   [kompassi] Liiku tänne
//   [kone]    Mannerlento (300 £)    (omassa kaupungissa, mantereen aarre löytynyt)
//   ───────                          (hiusviiva, web liuskan PAATOKSET 34 kohta 8)
//   ● Kadonneet ihmeet (2)           (nostokategoriat haitarina, KaupunkiNostot; toisen avaus
//   ● Skandaalit (3)                  sulkee edellisen, saman napautus sulkee)
//        Mona Lisan varkaus          (kohderivi: kortti kiinni ja nosto auki, web liuska = null)
//   ▾ lisää / ▴ edelliset            (kelausrivit kortin ala- ja yläreunassa, kun sisältö ei mahdu:
//                                     web kelattuLiuska ja kelauksenAskel, askel = ikkuna − 2 riviä)
//
// Näyttödata tulee sisältöpaketista (UiSisalto, Kuvat); toiminnot antaa
// PeliOhjain (Pelikoodarin KaupunkiToiminnot, null = rivi piiloon). Kortti ei
// ole modaalinen (RAJAPINTA): ei himmennystä eikä syötelukkoa, pallo pyörii
// kortin ohi, toisen kaupungin napautus vaihtaa sisällön (Nayta uudelleen).
// Kortti peittää vain oman alueensa (UiKerros.Peittaa → SyoteLukko).
// Korvaa 3D:n NimiKortin, kun pelisilmukka on päällä (UiNakymat).
using System;
using System.Collections.Generic;
using System.Linq;
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
        readonly ScrollView vieritys;
        readonly Button kelausYlos, kelausAlas;
        readonly Kortti kortti;
        readonly Label maa, nimio, kuvateksti, lahde, johdanto;
        readonly VisualElement lippu;
        KaupunkiToiminnot toiminnot;
        string kaupunki;
        OpasArtikkeli opas;
        bool nahtavyyksia;
        KaupunkiTiedot tiedot;
        /// <summary>Nostokategoriat (null = ei vielä ladattu), avattu kategoria (null = kaikki kiinni).</summary>
        List<NostoKategoria> kategoriat;
        string avattu;
        readonly List<Action> nostoOdottajat = new List<Action>();

        /// <summary>Kelausrivin askel = näkyvä ala miinus kaksi riviä (web kelauksenAskel).</summary>
        const float RivinKorkeus = 40f;
        static readonly string KelausYlosIkoni = "<path d=\"M5.5 15 12 8.5 18.5 15\"/>";

        public bool Auki { get; private set; }
        /// <summary>Kortin alue (pulu hyppää kortin yläpuolelle).</summary>
        public VisualElement Alue => alue;
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
            // Kelausrivit vierityksen ulkopuolella: näkyvät vain, kun sisältöä on piilossa ylä- tai alapuolella.
            kelausYlos = Kelausrivi("edelliset", KelausYlosIkoni, -1);
            kortti.Sisus.Add(kelausYlos);
            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-kaupunkikortti__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Sisus.Add(vieritys);
            kelausAlas = Kelausrivi("lisää", Ikonit.NuoliAlas, 1);
            kortti.Sisus.Add(kelausAlas);
            vieritys.verticalScroller.valueChanged += _ => PaivitaKelaus();
            vieritys.contentContainer.RegisterCallback<GeometryChangedEvent>(_ => PaivitaKelaus());
            vieritys.contentViewport.RegisterCallback<GeometryChangedEvent>(_ => PaivitaKelaus());

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
            kerros.JokaRuutu += TarkistaOhiNapautus;
        }

        // E1 (web kaupunkiliuska ilman sulkunappia): kartan napautus kortin ohi sulkee, samoin saman merkin
        // uudelleennapautus (peli avaa saman kaupungin uudelleen → sulku jää voimaan). Veto ei sulje (web
        // kuunteleSulkevaNapautus: liike < 6 px ja kesto < 700 ms).
        Vector2 ohiAlku;
        float ohiAika = -1f;

        void TarkistaOhiNapautus()
        {
            if (!Auki) { ohiAika = -1f; return; }
            var osoitin = UnityEngine.InputSystem.Pointer.current;
            if (osoitin == null || alue.panel == null) return;
            var r = osoitin.position.ReadValue();
            var p = RuntimePanelUtils.ScreenToPanel(alue.panel, new Vector2(r.x, Screen.height - r.y));
            if (osoitin.press.wasPressedThisFrame)
            {
                var kortti = alue.childCount > 0 ? alue[0] : alue;
                bool sisalla = kortti.worldBound.Contains(p);
                ohiAika = sisalla ? -1f : Time.unscaledTime;
                ohiAlku = p;
            }
            if (!osoitin.press.wasReleasedThisFrame || ohiAika < 0f) return;
            bool napautus = (p - ohiAlku).magnitude < 6f && Time.unscaledTime - ohiAika < 0.7f;
            ohiAika = -1f;
            if (!napautus) return;
            string k = kaupunki;
            // Seuraavassa ruudussa: toisen kaupungin napautus on jo vaihtanut kortin sisällön, eikä sitä suljeta.
            alue.schedule.Execute(() => { if (Auki && kaupunki == k) Sulje(); }).StartingIn(50);
        }

        void Asettele()
        {
            var r = kerros.Reunat(UiKerros.Matkavalinta);
            alue.style.paddingBottom = r.w + 14;
            alue.style.paddingLeft = r.x + 12;
            alue.style.paddingRight = r.z + 12;
            alue.style.paddingTop = r.y + Ylapalkki.Varaus + 12;
        }

        public void Nayta(string kaupunkiId, string nimi, KaupunkiToiminnot t)
        {
            if (kaupunki != kaupunkiId) nostoOdottajat.Clear();
            kaupunki = kaupunkiId;
            opas = null;
            nahtavyyksia = false;
            tiedot = null;
            kategoriat = null;
            avattu = null;
            vieritys.scrollOffset = Vector2.zero;
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
            tiedot = k;
            RakennaRivit(k);
            // Nostokategoriat (web liuskan kategoriarivit): kaupungin sisäiset nostot aiheittain.
            KaupunkiNostot.Hae(k.Id, l =>
            {
                if (!Auki || kaupunki != k.Id) return;
                kategoriat = l;
                RakennaRivit(k);
                var odottajat = nostoOdottajat.ToArray();
                nostoOdottajat.Clear();
                foreach (var a in odottajat) a();
            });
            // Nähtävyydet-rivi, kun kaupungilla on kohdekartta (web KAUPUNKIKARTAT).
            Kohdekartat.Hae(k.Id, kk =>
            {
                if (kk == null || !Auki || kaupunki != k.Id) return;
                nahtavyyksia = true;
                RakennaRivit(k);
            });
            // Turistiopas-rivi, kun oppaan artikkeli on (kaupunkilehdet ladataan tarvittaessa).
            LehtiSisalto.HaeOpas(k.Id, o =>
            {
                if (o == null || !Auki || kaupunki != k.Id) return;
                opas = o;
                RakennaRivit(k);
            });
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
            if (nahtavyyksia)
            {
                string id = kaupunki;
                Rivi(Ikonit.Viiva["silma"], "Nähtävyydet", null, () => UiNakymat.Hae()?.Nahtavyysnakyma.Avaa(id));
            }
            if (opas != null)
            {
                var o = opas;
                Rivi(Ikonit.Viiva["kirja"], "Turistiopas", null, () => UiNakymat.Hae()?.Nahtavyydet.AvaaOpas(o));
            }
            // Tutki kaupunkia -riviä ei ole (Fablen tarkastus A6: fokusmoodi korvaa, Pelikoodarin vihreä piste).
            if (t.Mannerlento != null) Rivi(Ikonit.Viiva["kone"], t.MannerlentoTeksti ?? "Mannerlento", null, t.Mannerlento);
            if (t.Liiku != null) Rivi(Ikonit.Viiva["kompassi"], t.LiikuTeksti ?? "Liiku tänne", null, t.Liiku);
            Haitari();
            // E1: webin kaupunkiliuskassa ei sulkunappia (ui.js "Sulje-nappi poistui"); sulku merkin uudelleen-
            // napautuksesta tai kartalta (ohi-napautus).
        }

        // --- nostokategoriat haitarina (web liuskanRivit) -----------------------------------

        VisualElement Haitari()
        {
            if (kategoriat == null || kategoriat.Count == 0) return null;
            VisualElement avattuRivi = null;
            // Hiusviiva erottaa yläryhmän kategorioista (web PAATOKSET 34 kohta 8).
            Rakenne.El("mk-liuska__hiusviiva", rivit, PickingMode.Ignore);
            foreach (var kat in kategoriat)
            {
                var k = kat;
                bool auki = avattu == k.Aihe;
                var b = Rakenne.Nappi(null, "mk-liuska__rivi mk-liuska__kategoria", () => { if (Auki) VaihdaKategoria(k.Aihe); }, rivit);
                b.EnableInClassList("mk-liuska__rivi--auki", auki);
                var pallo = Rakenne.El("mk-liuska__pallo", b, PickingMode.Ignore);
                pallo.style.backgroundColor = Kuviot.Vari(k.Vari);
                Rakenne.Teksti(k.Otsikko, "mk-liuska__nimi", b);
                if (!auki) continue;
                avattuRivi = b;
                foreach (var n in k.Jasenet)
                {
                    var nosto = n;
                    var r = Rakenne.Nappi(null, "mk-liuska__rivi mk-liuska__kohde", () => { if (Auki) AvaaNosto(nosto); }, rivit);
                    Rakenne.Teksti(nosto.Nimi, "mk-liuska__nimi", r);
                }
            }
            return avattuRivi;
        }

        /// <summary>Kategorian napautus: avaa (edellinen sulkeutuu) tai sulkee avatun. Uusi alkaa aina alusta.</summary>
        void VaihdaKategoria(string aihe)
        {
            avattu = avattu == aihe ? null : aihe;
            rivit.Clear();
            RakennaRivit(tiedot);
            // Web: kelaus nollautuu kategorian vaihtuessa; natiivissa avattu rivi vieritetään näkyviin.
            if (avattu == null) return;
            foreach (var e in rivit.Children())
                if (e.ClassListContains("mk-liuska__rivi--auki")) { Rakenne.Vierita(vieritys, e, 60); break; }
        }

        /// <summary>Kohderivi: kortti kiinni (web liuska = null) ja noston kortti auki.</summary>
        void AvaaNosto(KaupunkiNosto n)
        {
            Sulje();
            n.Avaa();
        }

        // --- kelausrivit (web kelattuLiuska) ------------------------------------------------

        Button Kelausrivi(string teksti, string ikoni, int suunta)
        {
            var b = Rakenne.Nappi(teksti, "mk-liuska__kelaus", () => { if (Auki) Kelaa(suunta); }, null, ikoni);
            Kirjasimet.Aseta(b, Kirjasin.Kone);
            b.style.display = DisplayStyle.None;
            return b;
        }

        float Liikkumavara => Mathf.Max(0f, vieritys.contentContainer.layout.height - vieritys.contentViewport.layout.height);

        void PaivitaKelaus()
        {
            float vara = Liikkumavara, y = vieritys.scrollOffset.y;
            bool ylos = vara > 1f && y > 1f, alas = vara > 1f && y < vara - 1f;
            var ny = ylos ? DisplayStyle.Flex : DisplayStyle.None;
            var na = alas ? DisplayStyle.Flex : DisplayStyle.None;
            if (kelausYlos.style.display != ny) kelausYlos.style.display = ny;
            if (kelausAlas.style.display != na) kelausAlas.style.display = na;
        }

        /// <summary>Kelausrivi siirtää näkyvää alaa; kortti pysyy auki (web kohta 5).</summary>
        public void Kelaa(int suunta)
        {
            float ikkuna = vieritys.contentViewport.layout.height;
            if (float.IsNaN(ikkuna) || ikkuna <= 0) return;
            float askel = Mathf.Max(RivinKorkeus, ikkuna - 2 * RivinKorkeus);
            float y = Mathf.Clamp(vieritys.scrollOffset.y + suunta * askel, 0f, Liikkumavara);
            vieritys.scrollOffset = new Vector2(0, y);
            PaivitaKelaus();
        }

        // --- testikomento (ui kaupunki <id> …) ---------------------------------------------

        /// <summary>Kutsuu toiminnon, kun nykyisen kaupungin nostokategoriat on ladottu korttiin.</summary>
        public void KunNostot(Action a)
        {
            if (a == null) return;
            if (Auki && kategoriat != null) a();
            else nostoOdottajat.Add(a);
        }

        /// <summary>Kategoriat tekstinä: "Skandaalit (3): Mona Lisan varkaus, …; Muut (1): …".</summary>
        public string Kuvaus() => kategoriat == null ? "ei ladattu" : kategoriat.Count == 0 ? "ei nostoja"
            : string.Join("; ", kategoriat.Select(k => k.Otsikko + ": " + string.Join(", ", k.Jasenet.Select(n => n.Nimi))));

        /// <summary>Avaa kategorian aiheella tai järjestysnumerolla (1…); null = ensimmäinen.</summary>
        public string AvaaKategoria(string aihe)
        {
            if (kategoriat == null || kategoriat.Count == 0) return "ei nostokategorioita";
            var k = aihe == null ? kategoriat[0]
                : int.TryParse(aihe, out var nro) && nro >= 1 && nro <= kategoriat.Count ? kategoriat[nro - 1]
                : kategoriat.Find(x => x.Aihe == aihe || string.Equals(x.Nimi, aihe, StringComparison.OrdinalIgnoreCase));
            if (k == null) return "ei kategoriaa " + aihe;
            if (avattu != k.Aihe) VaihdaKategoria(k.Aihe);
            return null;
        }

        /// <summary>Napauttaa avatun kategorian n:ttä kohderiviä (1…).</summary>
        public string NapautaKohde(int n)
        {
            var k = kategoriat?.Find(x => x.Aihe == avattu);
            if (k == null) return "ei avattua kategoriaa";
            if (n < 1 || n > k.Maara) return "kohteita on " + k.Maara;
            AvaaNosto(k.Jasenet[n - 1]);
            return null;
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
