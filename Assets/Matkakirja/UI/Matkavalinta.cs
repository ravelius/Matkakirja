// MATKAVALINTA (Natiivi-UI, erä 1): Pelikoodarin IMatkaValinta UI Toolkitilla.
//
// E5 (Fable 24.9., web renderTravelChoice): kohteet ovat toimintorivin leveitä nappeja suoraan kartan
// päällä (web .actions: ikoniTekstiNappi 'wide' "Pariisi (50 p)"), ei himmennystä, otsikkoa eikä
// alaotsikkoa ("kartan päälle ei kirjoiteta mitään"); paluu koko levyisellä nuoli-ikoninapilla
// (iconButton('nuoli', 'Takaisin')). Mitat webistä (iPhone 393 / iPad 834): rivi 44 px, väli 6,4 px,
// leveys min(549, ruutu − 44) keskellä, pohja rgba(250,243,226,.72), reuna 1 px rgba(122,85,20,.35),
// pyöristys 10 px, American Typewriter 18,4 px #46331f, ikoni ja teksti keskellä. Selite (natiivin
// kaupungin napautuksen polku) pienenä tekstin perässä; webin Liiku-polun riveillä sitä ei ole.
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
        readonly Label otsikko, alaotsikko, heittoTeksti;
        readonly SvgIkoni heittoIkoni;
        Action<int> valittu;
        Action peru, heita, vaihda;
        readonly Button vaihtoNappi, liikuNappi;
        readonly VisualElement liiku, liuku;
        bool liukuAuki, liikuNakyy, sallittu = true;
        // Nopan jälkeen ei enää avata siirtolistaa (Pelikoodari 24.9.: web näyttää vain renkaat kartalla), joten
        // pakollista listaa ei ole; kenttä jää, jos jokin valinta joskus vaatii sen.
        bool pakollinen;

        public bool Auki { get; private set; }
        /// <summary>Ei korttia, jonka yläpuolelle pulu hyppäisi: webissä pulu jää toimintorivin päälle (E5).</summary>
        public VisualElement KorttiAlue => null;
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
            liiku.EnableInClassList("mk-liiku--puhelin", Ylapalkki.Kelluva); // iPhone: kevyempi nappi (omistaja 24.9.)
            Rakenne.Teksti(Liikkuminen.LiikuTeksti, "mk-nappi__teksti", liikuNappi);
            Kirjasimet.Aseta(liiku, Kirjasin.KoneLihava);

            // --- kohdevalinta toimintorivinä (web .actions, E5) ---
            himmennys = Rakenne.El("mk-matkavalinta", juuri, PickingMode.Ignore);
            himmennys.style.display = DisplayStyle.None;
            // Otsikko ja alaotsikko vain testilokille (Otsikko), eivät näy (web: kartan päälle ei kirjoiteta).
            otsikko = new Label();
            alaotsikko = new Label();
            rivit = Rakenne.El("mk-matkavalinta__rivit", himmennys, PickingMode.Ignore);
            Kirjasimet.Aseta(rivit, Kirjasin.Kone);

            kerros.TurvaMuuttui += Asettele;
        }

        void Asettele()
        {
            // Web .actions: 22 px sivuilta, enintään 549 px keskellä, alareuna 32 px (turva-alueen yläpuolella).
            var r = kerros.Reunat(UiKerros.Matkavalinta);
            float leveys = himmennys.panel != null ? himmennys.panel.visualTree.layout.width : 0f;
            if (!(leveys > 0f)) return;
            rivit.style.width = Mathf.Round(Mathf.Min(549f, leveys - r.x - r.z - 44f));
            rivit.style.bottom = Mathf.Max(32f, r.w + 12f);
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
                // Liiku-polun rivit ovat kohteita ("Lontoo (50 p)"): ikoni valitusta kulkutavasta (web: bussi/kone/purje).
                string ikoniNimi = IkoniNimelle(nimi);
                if (ikoniNimi == "kompassi" && valittuTapa.HasValue) ikoniNimi = TavanIkoni(valittuTapa.Value);
                Ikonit.Viiva.TryGetValue(ikoniNimi, out var ikoni);
                var b = Rakenne.Nappi(null, "mk-valintarivi", () => { if (Auki) valittu?.Invoke(indeksi); }, rivit, ikoni);
                Rakenne.Teksti(nimi, "mk-valintarivi__nimi", b);
                if (!string.IsNullOrEmpty(selite)) Rakenne.Teksti(selite, "mk-valintarivi__selite", b);
            }
            pakollinen = false;
            if (!pakollinen)
            {
                var takaisin = Rakenne.Nappi(null, "mk-valintarivi mk-valintarivi--takaisin", Peruuta, rivit, Ikonit.Viiva["nuoli"]);
                takaisin.tooltip = "Takaisin";
            }

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

        /// <summary>
        /// Maan kortti auki (web body.infotaulu-auki .monitoimi-nappi: opacity 0, visibility hidden 0,18 s):
        /// Liiku väistyy, jottei se peitä kortin rivejä.
        /// </summary>
        public void VaistaLiiku(bool vaista)
        {
            liiku.EnableInClassList("mk-liiku--vaistyy", vaista);
            liikuNappi.pickingMode = vaista ? PickingMode.Ignore : PickingMode.Position;
            if (vaista) SuljeLiuku();
        }

        // --- Liiku (PeliOhjain.Kulkutavat, LiikuMuuttui) --------------------------------

        IReadOnlyList<KulkutapaNappi> tavat = Array.Empty<KulkutapaNappi>();
        /// <summary>Liiku-liu'usta viimeksi valittu tapa (kohderivien ikoni); testikomento kulkutapa ohittaa liu'un.</summary>
        Kulkutapa? valittuTapa;
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
            valittuTapa = t.Laji;
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
            // Rivit kartan päällä ilman himmennystä: vain napit peittävät (web .actions).
            return (Auki || HeittoNakyy || liikuNakyy) && kerros.PeittaaPisteen(ruutu);
        }
    }
}
