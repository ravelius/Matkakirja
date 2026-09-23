// YLÄPALKKI JA TILARIVI (Natiivi-UI, erä 1): verkkopelin .topbar natiivina.
//
//   [logo]   ( laukku  300 £ · päivä 1 · aamu )   [ratas] [≡]
//
// Tausta linear-gradient(#3a2a1c → #251b12), alareunassa hiusviiva --line,
// ulottuu turva-alueen yläpuolelle (lovi, Dynamic Island). Keskellä
// "turn-pill" (webin renderTurnPill): laukun kuvake, raha ja kello; kun kellon
// teksti vaihtuu, se välähtää kultaisena (aika-valahdys 1,4 s). Sijainti ei ole
// pillerissä (kuten webissä): kaupungin nimi näkyy pallon nimikortissa.
// Rivi palauttaa koko tekstin testikomentoja varten.
//
// Viesti: verkkopelin .event-toast — kelluva kortti kartan yläkolmanneksessa
// (top 16 %), tumma liukuväri ja kultareuna, liukuu sisään alhaalta.
//
// Toteuttaa Pelikoodarin ITilarivi-rajapinnan (Scripts/Peli/NakymaSopimukset.cs).
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Ylapalkki : ITilarivi
    {
        public const float Korkeus = 50f;

        readonly VisualElement palkki, pilleri, ilmoitus;
        readonly Label raha, kello, ilmoitusTeksti;
        string rivi = "", kelloTeksti = "";
        IVisualElementScheduledItem ilmoitusAjastin, valahdysAjastin, rahaAjastin;

        /// <summary>Ratas- ja valikkonappi (Paavalikko ja Aanentasot ankkuroituvat näihin).</summary>
        public readonly Button Ratas, Valikko;
        public event Action PilleriPainettu;
        /// <summary>Tilapilleri (matkalaukku ankkuroituu sen alle).</summary>
        public VisualElement Pilleri => pilleri;

        public Ylapalkki(UiKerros kerros)
        {
            var juuri = kerros.Juuri(UiKerros.Tilarivi);
            kerros.Turva(UiKerros.Tilarivi);

            palkki = Rakenne.El("mk-ylapalkki", juuri);
            Rakenne.Tausta(palkki, Kuviot.Ylapalkki);

            var logo = Rakenne.El("mk-logo", palkki, PickingMode.Ignore);
            var logoKuva = Resources.Load<Texture2D>("MatkakirjaUI/logo");
            if (logoKuva != null) logo.style.backgroundImage = new StyleBackground(logoKuva);

            pilleri = Rakenne.Nappi(null, "mk-pilleri", () => PilleriPainettu?.Invoke(), palkki, Ikonit.Laukku);
            Kirjasimet.Aseta(pilleri, Kirjasin.Kone);
            raha = Rakenne.Teksti("", "mk-pilleri__raha", pilleri);
            kello = Rakenne.Teksti("", "mk-pilleri__kello", pilleri);
            pilleri.style.display = DisplayStyle.None;

            var napit = Rakenne.El("mk-ylapalkki__napit", palkki, PickingMode.Ignore);
            Ratas = Rakenne.Nappi(null, "mk-ikoninappi", null, napit, Ikonit.Ratas);
            Ratas.tooltip = "Äänentasot ja asetukset";
            Valikko = Rakenne.Nappi(null, "mk-ikoninappi", null, napit, Ikonit.Valikko);
            Valikko.tooltip = "Valikko";

            // Hetkellinen viesti (event-toast).
            ilmoitus = Rakenne.El("mk-ilmoitus", juuri, PickingMode.Ignore);
            Rakenne.Tausta(ilmoitus, Kuviot.Ilmoitus);
            ilmoitusTeksti = Rakenne.Teksti("", "mk-ilmoitus__teksti", ilmoitus);
            Kirjasimet.Aseta(ilmoitus, Kirjasin.KoneLihava);
            ilmoitus.style.display = DisplayStyle.None;

            Kirjasimet.Aseta(juuri, Kirjasin.Kone);
            kerros.TurvaMuuttui += () => Asettele(kerros);
            Asettele(kerros);
        }

        void Asettele(UiKerros kerros)
        {
            var r = kerros.Reunat(UiKerros.Tilarivi);
            palkki.style.paddingTop = r.y;
            palkki.style.paddingLeft = r.x + 10;
            palkki.style.paddingRight = r.z + 10;
            palkki.style.height = r.y + Korkeus;
        }

        /// <summary>Palkin alareuna paneelin pisteinä (pudotusvalikot asettuvat tämän alle).</summary>
        public float Alareuna => palkki.resolvedStyle.height > 0 ? palkki.resolvedStyle.height : Korkeus;

        // --- ITilarivi ------------------------------------------------------

        public string Rivi => rivi;

        /// <summary>PeliApu.TilaTeksti: "300 £ · päivä 1 · aamu · Pariisi".</summary>
        public void Aseta(string teksti)
        {
            teksti ??= "";
            if (teksti == rivi) return;
            rivi = teksti;
            var osat = teksti.Split(new[] { " · " }, StringSplitOptions.None);
            if (osat.Length < 3)
            {
                // Lataus- ja virhetekstit ("Haetaan matkakirjaa…") koko pillerissä.
                raha.text = teksti;
                kello.text = "";
                kello.style.display = DisplayStyle.None;
            }
            else
            {
                string uusiRaha = Raha(osat[0]);
                // Kukkaron muutos välähtää kuten kello (osto, palkkio, lento).
                if (uusiRaha != raha.text && raha.text.StartsWith("£")) Valahda(raha, ref rahaAjastin);
                raha.text = uusiRaha;
                string uusiKello = Iso(osat[1]) + ", " + osat[2];
                kello.style.display = DisplayStyle.Flex;
                if (uusiKello != kelloTeksti && kelloTeksti.Length > 0) Valahda(kello, ref valahdysAjastin);
                kelloTeksti = uusiKello;
                kello.text = "· " + uusiKello;
            }
            pilleri.style.display = teksti.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
        }

        /// <summary>Webin muoto "£250" ("250 puntaa" / "250 £" → "£250"), jotta pilleri mahtuu puhelimeen.</summary>
        static string Raha(string s)
        {
            var osat = s.Trim().Split(' ');
            if (osat.Length == 2 && int.TryParse(osat[0], out _) && (osat[1] == "£" || osat[1].StartsWith("punta")))
                return "£" + osat[0];
            return s;
        }

        static string Iso(string s) => string.IsNullOrEmpty(s) ? s : char.ToUpperInvariant(s[0]) + s.Substring(1);

        static void Valahda(Label l, ref IVisualElementScheduledItem ajastin)
        {
            l.AddToClassList("mk-valahdys");
            ajastin?.Pause();
            ajastin = l.schedule.Execute(() => l.RemoveFromClassList("mk-valahdys")).StartingIn(700);
        }

        public void Viesti(string teksti, float kestoS = 3f)
        {
            if (string.IsNullOrEmpty(teksti)) return;
            ilmoitusTeksti.text = teksti;
            Rakenne.Nayta(ilmoitus, true);
            ilmoitusAjastin?.Pause();
            ilmoitusAjastin = ilmoitus.schedule.Execute(() => Rakenne.Nayta(ilmoitus, false, 300))
                .StartingIn((long)(Mathf.Max(0.5f, kestoS) * 1000));
        }

        /// <summary>Koko palkki näkyviin tai pois (esim. lehti auki).</summary>
        public void NaytaPalkki(bool nakyy) => palkki.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
    }
}
