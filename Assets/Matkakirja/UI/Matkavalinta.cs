// MATKAVALINTA (Natiivi-UI, erä 1): Pelikoodarin IMatkaValinta UI Toolkitilla.
//
// Pergamenttikortti ruudun alaosassa (peukalon ulottuvilla), himmennys kevyt
// (rgba(14,9,4,.35)), jotta pallo ja reitti näkyvät taustalla — verkkopelin
// matkavalinta on HUD-liuska eikä pimennä karttaa. Otsikko = kohdekaupunki,
// alaotsikko = raha · päivä · aika. Jokainen kulkutapa on leveä nappi
// (webin ikoniTekstiNappi 'wide'): viivaikoni (bussi, kone, peukalo, purje),
// nimi ja selite (hinta · kesto). Peruuta = .ghost-nappi; himmennyksen napautus
// peruu myös.
//
// Kartan toimintonappi ("Heitä noppaa → Lontoo", "Tutki kaupunkia") on webin
// button.primary: kultainen liukuväri, tumma teksti, nopan kuvake. Se istuu
// ruudun alareunassa nimikortin yläpuolella (UGUI-versiossa 148 pt alhaalta).
//
// LIIKU (web ui.js ~11988, omistaja 13.9.2026 "alareunassa on koko ajan näkyvillä pieni 'liiku'
// nappi"): kompassi + "Liiku" samassa paikassa kuin heittonappi. Napautus avaa kulkutapaliu'un
// (liftaus, bussi, laiva, lento; web .toimintorivi-liuku: pelkät ikonit), jonka napautus kutsuu
// PeliOhjain.ValitseKulkutapa; ohjain avaa kohteet tähän valintaan (Nayta). Estetty tapa on harmaa
// ja sen syy tulee tilariville (web title "Bussilla — syy"). Heittovaiheessa Kulkutavat() on tyhjä:
// Liiku piiloon, heittonappi ja sen vieressä "Vaihda matkustustapa" (IHeittoVaihto, web nuoli).
using System;
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Matkavalinta : IMatkaValinta, IHeittoVaihto
    {
        public const float HeittoAlhaalta = 148f;

        readonly UiKerros kerros;
        readonly VisualElement himmennys, rivit, heitto;
        readonly Kortti kortti;
        readonly Label otsikko, alaotsikko, heittoTeksti;
        readonly SvgIkoni heittoIkoni;
        Action<int> valittu;
        Action peru, heita, vaihda;
        readonly Button vaihtoNappi, liikuNappi;
        readonly VisualElement liiku, liuku;
        bool liukuAuki, liikuNakyy, sallittu = true;

        public bool Auki { get; private set; }
        /// <summary>Valinnan himmennys, jonka ensimmäinen lapsi on kortti (pulu hyppää sen yläpuolelle).</summary>
        public VisualElement KorttiAlue => himmennys;
        public bool HeittoNakyy { get; private set; }
        public string Otsikko => Auki ? otsikko.text : null;

        public Matkavalinta(UiKerros kerros)
        {
            this.kerros = kerros;
            var juuri = kerros.Juuri(UiKerros.Matkavalinta);
            var turva = kerros.Turva(UiKerros.Matkavalinta);
            Kirjasimet.Aseta(juuri, Kirjasin.Kone);

            // --- kartan toimintonappi (ei modaalinen) ---
            heitto = Rakenne.Nappi(null, "mk-nappi--kulta mk-toimintonappi", () => heita?.Invoke(), turva, Ikonit.Viiva["noppa"]);
            Rakenne.Tausta(heitto, Kuviot.Kulta);
            heittoIkoni = heitto.Q<SvgIkoni>();
            heittoTeksti = Rakenne.Teksti("", "mk-nappi__teksti", heitto);
            Kirjasimet.Aseta(heitto, Kirjasin.KoneLihava);
            heitto.style.bottom = HeittoAlhaalta;
            heitto.style.display = DisplayStyle.None;
            // "Vaihda matkustustapa" heittonapin oikealle puolelle (web iconButton('nuoli')).
            vaihtoNappi = Rakenne.Nappi(null, "mk-vaihtonappi", () => { var v = vaihda; v?.Invoke(); }, heitto, Ikonit.Viiva["nuoli"]);
            vaihtoNappi.tooltip = PeliApu.VaihdaTeksti;
            vaihtoNappi.style.display = DisplayStyle.None;

            // --- Liiku ja kulkutapaliuku (ei modaalinen) ---
            liiku = Rakenne.El("mk-liiku", turva, PickingMode.Ignore);
            liiku.style.bottom = HeittoAlhaalta;
            liiku.style.display = DisplayStyle.None;
            liuku = Rakenne.El("mk-liiku__liuku", liiku, PickingMode.Ignore);
            liuku.style.display = DisplayStyle.None;
            liikuNappi = Rakenne.Nappi(null, "mk-liiku__nappi", VaihdaLiuku, liiku, Ikonit.Viiva["kompassi"]);
            Rakenne.Teksti(Liikkuminen.LiikuTeksti, "mk-nappi__teksti", liikuNappi);
            Kirjasimet.Aseta(liiku, Kirjasin.KoneLihava);

            // --- modaalinen valinta ---
            himmennys = Rakenne.El("mk-himmennys mk-himmennys--kevyt", juuri);
            himmennys.style.display = DisplayStyle.None;
            himmennys.RegisterCallback<PointerDownEvent>(e => { if (e.target == himmennys) Peruuta(); });

            kortti = new Kortti("mk-matkavalinta");
            himmennys.Add(kortti);
            otsikko = Rakenne.Teksti("", "mk-kortti__otsikko", kortti.Sisus);
            Kirjasimet.Aseta(otsikko, Kirjasin.LukuLihava);
            alaotsikko = Rakenne.Teksti("", "mk-kortti__alaotsikko", kortti.Sisus);
            Kirjasimet.Aseta(alaotsikko, Kirjasin.LukuKursiivi);
            rivit = Rakenne.El("mk-matkavalinta__rivit", kortti.Sisus, PickingMode.Ignore);
            Kirjasimet.Aseta(rivit, Kirjasin.Kone);

            kerros.TurvaMuuttui += Asettele;
        }

        void Asettele()
        {
            // Kortti turva-alueen alareunan yläpuolelle (kotipalkki).
            var r = kerros.Reunat(UiKerros.Matkavalinta);
            himmennys.style.paddingBottom = r.w + 18;
            himmennys.style.paddingLeft = r.x + 12;
            himmennys.style.paddingRight = r.z + 12;
        }

        static string IkoniNimelle(string nimi)
        {
            var n = (nimi ?? "").ToLowerInvariant();
            if (n.Contains("bussi")) return "bussi";
            if (n.Contains("lento") || n.Contains("lennä")) return "kone";
            if (n.Contains("lift")) return "peukalo";
            if (n.Contains("laiva") || n.Contains("meri")) return "purje";
            return "kompassi";
        }

        // --- IMatkaValinta ------------------------------------------------------

        public void Nayta(string otsikkoTeksti, string ala, IReadOnlyList<(string Nimi, string Selite)> vaihtoehdot,
            Action<int> kunValittu, Action kunPeruttu)
        {
            valittu = kunValittu;
            peru = kunPeruttu;
            otsikko.text = otsikkoTeksti;
            alaotsikko.text = ala;
            rivit.Clear();
            int n = vaihtoehdot?.Count ?? 0;
            for (int i = 0; i < n; i++)
            {
                int indeksi = i;
                var (nimi, selite) = vaihtoehdot[i];
                Ikonit.Viiva.TryGetValue(IkoniNimelle(nimi), out var ikoni);
                var b = Rakenne.Nappi(null, "mk-valintarivi", () => { if (Auki) valittu?.Invoke(indeksi); }, rivit, ikoni);
                var tekstit = Rakenne.El("mk-valintarivi__tekstit", b, PickingMode.Ignore);
                Rakenne.Teksti(nimi, "mk-valintarivi__nimi", tekstit);
                if (!string.IsNullOrEmpty(selite)) Rakenne.Teksti(selite, "mk-valintarivi__selite", tekstit);
            }
            var alarivi = Rakenne.El("mk-kortti__napit", rivit, PickingMode.Ignore);
            Rakenne.Nappi("Peruuta", "mk-nappi--haamu", Peruuta, alarivi);

            Asettele();
            if (!Auki)
            {
                Auki = true;
                Rakenne.Nayta(himmennys, true, 320);
            }
        }

        public void Piilota()
        {
            peru = null;
            valittu = null;
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(himmennys, false, 250);
        }

        public void Peruuta()
        {
            if (!Auki) return;
            var p = peru;
            Piilota();
            p?.Invoke();
        }

        /// <summary>
        /// Linssi päällä (webissä pelin paneeli visibility: hidden linssin ajan): heittonappi
        /// piiloon näkyvyydellä, jolloin ohjaimen NaytaHeitto/PiilotaHeitto-tila säilyy.
        /// </summary>
        public void NaytaSallittu(bool sallitaan)
        {
            sallittu = sallitaan;
            heitto.style.visibility = sallitaan ? Visibility.Visible : Visibility.Hidden;
            liiku.style.visibility = sallitaan ? Visibility.Visible : Visibility.Hidden;
            if (!sallitaan) SuljeLiuku();
        }

        // --- Liiku (PeliOhjain.Kulkutavat, LiikuMuuttui) --------------------------------

        IReadOnlyList<KulkutapaNappi> tavat = Array.Empty<KulkutapaNappi>();
        bool liikuEstetty;

        static string TavanIkoni(Kulkutapa t) => t switch
        {
            Kulkutapa.Bussi => "bussi", Kulkutapa.Meri => "purje", Kulkutapa.Lento => "kone", _ => "peukalo",
        };

        /// <summary>Ohjaimen LiikuMuuttui/TilaMuuttui: napit uudelleen; tyhjä lista = Liiku piiloon.</summary>
        public void PaivitaLiiku(PeliOhjain o)
        {
            tavat = o?.Kulkutavat() ?? Array.Empty<KulkutapaNappi>();
            liikuEstetty = o == null || o.LiikuEstetty;
            bool nakyy = tavat.Count > 0;
            if (!nakyy) SuljeLiuku();
            liikuNappi.SetEnabled(!liikuEstetty);
            if (liikuEstetty) SuljeLiuku();
            if (liukuAuki) RakennaLiuku();
            if (nakyy != liikuNakyy)
            {
                liikuNakyy = nakyy;
                Rakenne.Nayta(liiku, nakyy, 200);
            }
            AsetteleLiiku();
        }

        // Heittonappi ja Liiku voivat näkyä yhtä aikaa (Tutki kaupunkia): Liiku sen yläpuolelle.
        void AsetteleLiiku() => liiku.style.bottom = HeittoAlhaalta + (HeittoNakyy ? 62f : 0f);

        /// <summary>Testikomento ui liiku: Liiku-napin napautus.</summary>
        public void TestaaLiiku() { PaivitaLiiku(PeliOhjain.Instanssi); if (!liukuAuki) VaihdaLiuku(); }

        void VaihdaLiuku()
        {
            if (liikuEstetty || !sallittu) return;
            if (liukuAuki) { SuljeLiuku(); return; }
            liukuAuki = true;
            // Web: liuku peittää pöllön napin, joten avautuessaan se sulkee chatin.
            if (UiNakymat.Olemassa) UiNakymat.Hae().Chat?.Sulje();
            RakennaLiuku();
            liikuNappi.AddToClassList("mk-valittu");
            Rakenne.Nayta(liuku, true, 180);
        }

        void SuljeLiuku()
        {
            if (!liukuAuki) return;
            liukuAuki = false;
            liikuNappi.RemoveFromClassList("mk-valittu");
            Rakenne.Nayta(liuku, false, 150);
        }

        void RakennaLiuku()
        {
            liuku.Clear();
            foreach (var t in tavat)
            {
                var tapa = t;
                var b = Rakenne.Nappi(null, "mk-liiku__tapa" + (tapa.Korostettu ? " mk-liiku__tapa--korostettu" : ""), () => ValitseTapa(tapa), liuku,
                    Ikonit.Viiva[TavanIkoni(tapa.Laji)]);
                b.tooltip = tapa.Estetty ? tapa.Teksti + " — " + tapa.Syy : tapa.Teksti;
                b.EnableInClassList("mk-liiku__tapa--estetty", tapa.Estetty);
            }
        }

        void ValitseTapa(KulkutapaNappi t)
        {
            if (t.Estetty)
            {
                // Web: harmaan napin title kertoo syyn; kosketuksessa syy tilariville.
                if (UiNakymat.Olemassa) UiNakymat.Hae().Tilarivi.Viesti(t.Teksti + " — " + t.Syy);
                return;
            }
            SuljeLiuku();
            var virhe = PeliOhjain.Instanssi?.ValitseKulkutapa(t.Laji);
            if (virhe != null && UiNakymat.Olemassa) UiNakymat.Hae().Tilarivi.Viesti(virhe);
        }

        // --- heittonappi (IMatkaValinta + IHeittoVaihto) ------------------------------------

        public void NaytaHeitto(string teksti, Action painettu, Action kunVaihda)
        {
            vaihda = kunVaihda;
            vaihtoNappi.style.display = kunVaihda != null ? DisplayStyle.Flex : DisplayStyle.None;
            NaytaHeittoNappi(teksti, painettu);
        }

        public void NaytaHeitto(string teksti, Action painettu)
        {
            vaihda = null;
            vaihtoNappi.style.display = DisplayStyle.None;
            NaytaHeittoNappi(teksti, painettu);
        }

        void NaytaHeittoNappi(string teksti, Action painettu)
        {
            heittoTeksti.text = teksti;
            heita = painettu;
            // Noppa vain nopan heittoon; muut toiminnot (Tutki kaupunkia) kompassilla.
            heittoIkoni.Polku = Ikonit.Viiva[(teksti ?? "").StartsWith("Heitä") ? "noppa" : "kompassi"];
            if (!HeittoNakyy)
            {
                HeittoNakyy = true;
                Rakenne.Nayta(heitto, true, 200);
            }
            AsetteleLiiku();
        }

        public void PiilotaHeitto()
        {
            heita = null;
            vaihda = null;
            if (!HeittoNakyy) return;
            HeittoNakyy = false;
            Rakenne.Nayta(heitto, false, 200);
            AsetteleLiiku();
        }

        public bool PeittaaPisteen(Vector2 ruutu)
        {
            if (Auki) return true;
            return (HeittoNakyy || liikuNakyy) && kerros.PeittaaPisteen(ruutu);
        }
    }
}
