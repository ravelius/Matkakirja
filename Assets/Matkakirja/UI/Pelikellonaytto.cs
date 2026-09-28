// PELIKELLON NÄYTTÖ (Natiivi-UI, aloituslento v3f; omistaja 28.9.2026 klo 09.29 ja 09.38): oikeaan yläkulmaan etenevä
// kello ja sen alle "Päivä 1/80" jo aloituskaupungin valinnassa (kello etenee normaalivauhtia) ja lennon ajan (Nappula
// kirjoittaa Pelikello.Tunnit, kello kiihtyy). Webissä ei vielä mallia; asu seuraa natiivin yläpalkin pilleriä
// (tumma lasi, paperin värinen teksti), koska valinta alkaa yövalaistuksessa.
//
// Näkyy, kun Aloitusnakyma.ValitseePallolla tai Pelikello.Lennossa; esiin ja pois 250 ms:n häivytyksellä. Valinnan
// alussa pelitunnit nollataan (Lontoon lähtöhetki = Pelikello.AlkuKelloUtc, jonka v3f säätää). Levossa piirtoa
// herätetään vain, kun näytetty minuutti vaihtuu.
using Matkakirja;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Pelikellonaytto
    {
        const float Reuna = 12f, Yla = 10f, HaivytysS = 0.25f;

        readonly UiKerros kerros;
        readonly VisualElement juuri;
        readonly Label kello, paiva;
        bool valinnassa, nakyy;
        float peitto = 0f;
        string naytetty;

        public Pelikellonaytto(UiKerros kerros)
        {
            this.kerros = kerros;
            juuri = Rakenne.El("mk-pelikello", kerros.Juuri(UiKerros.Traileri), PickingMode.Ignore);
            kello = Rakenne.Teksti("", "mk-pelikello__kello", juuri);
            Kirjasimet.Aseta(kello, Kirjasin.KoneBold);
            paiva = Rakenne.Teksti("", "mk-pelikello__paiva", juuri);
            Kirjasimet.Aseta(paiva, Kirjasin.Kone);
            juuri.style.display = DisplayStyle.None;
            kerros.JokaRuutu += Paivita;
        }

        /// <summary>Testikomento (ui pelikello): näkyykö ja mitä.</summary>
        public string Kuvaus => (nakyy ? "näkyy " : "piilossa ") + Pelikello.KelloTeksti + " · " + Pelikello.PaivaTeksti
            + (Pelikello.Lennossa ? " (lennossa)" : "");

        void Paivita()
        {
            var ui = UiNakymat.Hae();
            bool valinta = ui != null && ui.Aloitus != null && ui.Aloitus.ValitseePallolla;
            if (valinta && !valinnassa && !Pelikello.Lennossa) Pelikello.Tunnit = 0; // uusi valinta: lähtöhetki
            valinnassa = valinta;
            if (valinta && !Pelikello.Lennossa) Pelikello.Etene(Time.unscaledDeltaTime);
            bool nayta = valinta || Pelikello.Lennossa;

            // Häivytys 250 ms (lennon kiihtyvä kello herättää piirron joka tapauksessa).
            float tavoite = nayta ? 1f : 0f;
            if (!Mathf.Approximately(peitto, tavoite))
            {
                peitto = Mathf.MoveTowards(peitto, tavoite, Time.unscaledDeltaTime / HaivytysS);
                juuri.style.opacity = peitto;
                Ruudunpaivitys.Herata(0.1f);
            }
            bool nakyvissa = peitto > 0.001f;
            if (nakyvissa != nakyy)
            {
                nakyy = nakyvissa;
                juuri.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            }
            if (!nakyy) return;

            var t = kerros.Reunat(UiKerros.Traileri);
            if (juuri.resolvedStyle.right != t.z + Reuna) juuri.style.right = t.z + Reuna;
            if (juuri.resolvedStyle.top != t.y + Yla) juuri.style.top = t.y + Yla;
            string k = Pelikello.KelloTeksti, p = Pelikello.PaivaTeksti.ToUpperInvariant();
            if (k + p == naytetty) return;
            naytetty = k + p;
            kello.text = k;
            paiva.text = p;
            Ruudunpaivitys.Herata(0.1f);
        }
    }
}
