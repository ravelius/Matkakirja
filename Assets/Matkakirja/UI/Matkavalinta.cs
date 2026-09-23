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
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Matkavalinta : IMatkaValinta
    {
        public const float HeittoAlhaalta = 148f;

        readonly UiKerros kerros;
        readonly VisualElement himmennys, rivit, heitto;
        readonly Kortti kortti;
        readonly Label otsikko, alaotsikko, heittoTeksti;
        readonly SvgIkoni heittoIkoni;
        Action<int> valittu;
        Action peru, heita;

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
        public void NaytaSallittu(bool sallitaan) =>
            heitto.style.visibility = sallitaan ? Visibility.Visible : Visibility.Hidden;

        public void NaytaHeitto(string teksti, Action painettu)
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
        }

        public void PiilotaHeitto()
        {
            heita = null;
            if (!HeittoNakyy) return;
            HeittoNakyy = false;
            Rakenne.Nayta(heitto, false, 200);
        }

        public bool PeittaaPisteen(Vector2 ruutu)
        {
            if (Auki) return true;
            return HeittoNakyy && kerros.PeittaaPisteen(ruutu);
        }
    }
}
