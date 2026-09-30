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
            instanssi = this;
        }

        /// <summary>
        /// Kellon varaama yläreuna (pt paneelin yläreunasta: turva-alue + 10 + kellon korkeus + 8), myös ennen kuin kello
        /// näkyy. Valintanäkymän kamera (v3f, Natiiviseppä) rajaa valittavat kaupungit tämän alapuolelle, ettei kello peitä
        /// oikean yläkulman kaupunkia (v3f-laiteajo 28.9. 14.30: Moskovan rengas ja nimi kellon alla).
        /// </summary>
        public static float YlaVaraus => instanssi == null ? 0f : instanssi.Varaus();
        static Pelikellonaytto instanssi;
        /// <summary>Kellon korkeus ennen ensimmäistä asettelua (kello 27 + päivä 12,3 + täyte, iPhone 17 28.9.).</summary>
        const float OletusKorkeus = 56f, VarausAla = 8f;

        float Varaus()
        {
            var t = kerros.Reunat(UiKerros.Traileri);
            float h = juuri.resolvedStyle.height;
            if (float.IsNaN(h) || h <= 0f) h = OletusKorkeus;
            return t.y + Yla + h + VarausAla;
        }

        /// <summary>Testikomento (ui pelikello): näkyykö ja mitä.</summary>
        public string Kuvaus => (nakyy ? "näkyy " : "piilossa ") + Pelikello.KelloTeksti + " · " + Pelikello.PaivaTeksti
            + (Pelikello.Lennossa ? " (lennossa)" : "") + $" · yläraja {YlaVaraus:0} pt";

        void Paivita()
        {
            var ui = UiNakymat.Hae();
            bool valinta = ui != null && ui.Aloitus != null && ui.Aloitus.ValitseePallolla;
            if (valinta && !valinnassa && !Pelikello.Lennossa) Pelikello.Tunnit = 0; // uusi valinta: lähtöhetki
            valinnassa = valinta;
            Pelikello.Valinnassa = valinta; // v3f: päivän ja yön raja valinnasta asti (Kartta/Paivanvalo.cs)
            if (valinta && !Pelikello.Lennossa) Pelikello.Etene(Time.unscaledDeltaTime);
            // Linssi auki (esim. Olavinlinna avattu aloitusvalinnasta): kello pois, ettei se jää linssin "Sulje linssi"
            // -napin alle oikeaan yläkulmaan (Laitetestaaja 1.1 (76) 83763fc7: × osui "Päivä 1/80" -riviin). Kello etenee silti.
            bool linssi = ui != null && ui.Linssit != null && ui.Linssit.Auki != null;
            // Tietoja-kortti (tekijätiedot, Valikot-kerros 40 kellon Traileri-kerroksen 45 alla) auki: kello pois kortin ajaksi
            // kuten webissä (Laitetestaaja 1.1 (79), savukierros-1179: PÄIVÄ 1/80 piirtyi kortin päälle aloitusvalinnassa).
            bool tietoja = ui != null && ui.Tietoja != null && ui.Tietoja.Auki;
            bool nayta = (valinta || Pelikello.Lennossa) && !linssi && !tietoja;

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
