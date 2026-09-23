// MATKAKIRJAKORTTI (Natiivi-UI, erä 5): webin .fact-card (#fact-voice, #fact-place,
// #fact-text) ja isoisän luennan esitys.
//
//   ATEENA, ELOKUUSSA 1873                               [kaiutin ))) ]
//   Pölyä ja puhetta kullasta.                           (kursiivi, himmeä)
//   Ateenassa kahvilan isäntä piti Schliemannia nerona…  (kirjoituskone 50 ms/sana)
//   [pikkukuva] [pikkukuva]                              (luentakuvat + PuluCam)
//
// Tumma nahkapaneeli (--panel #2a1f16 + kultainen yläliukuma), American
// Typewriter, vasen yläkulma yläpalkin alla, leveys min(340, 62 %). Puhelimessa
// kortti pienenee merkinnän jälkeen yhden rivin pilleriksi ("pieni", pergamentti-
// kaistale), napautus avaa. Kaiutin on Kertoja-kytkin (webin #fact-kuuntele,
// omistaja 25.8.2026) ja sen kolme kaarta toimivat VU-mittarina kertojan äänestä
// (kynnykset 0,04 / 0,10 / 0,20; vain opacity).
//
// Luennan kuvat (Luentakuvasarja) ja Ohita-nappi kuuluvat samaan esitykseen:
// kuvat alkavat, kun luento todella alkaa (PeliOhjain.LuentoAlkoi), toinen
// luentakuva 9 s kohdalla, Livian kommentti ja PuluCam-kuvat luennon jälkeen.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Matkakirjakortti
    {
        public const float SanaMs = 50f;
        const string KaiutinRunko = "M4.2 9.3h3.2l4.4-3.6v12.6l-4.4-3.6H4.2z";
        static readonly string[] Kaaret =
        {
            "M14.6 9.6a3.4 3.4 0 0 1 0 4.8",
            "M17.1 7.2a6.8 6.8 0 0 1 0 9.6",
            "M19.6 4.8a10.2 10.2 0 0 1 0 14.4",
        };
        static readonly float[] Kynnykset = { 0.04f, 0.10f, 0.20f };

        readonly UiKerros kerros;
        readonly VisualElement kortti, pikkukuvat;
        readonly Label otsikko, tunnelma, teksti, lyhyt;
        readonly Button kaiutin;
        readonly SvgIkoni[] kaaret = new SvgIkoni[3];
        readonly float[] kaariTaso = new float[3];
        readonly float[] naytteet = new float[256];
        public readonly Luentakuvasarja Kuvat;

        string[] sanat;
        int naytetty;
        IVisualElementScheduledItem kirjoitus, pienennys;
        bool pieni;
        string kaupunki;

        public bool Nakyy => kortti.style.display == DisplayStyle.Flex;

        public Matkakirjakortti(UiKerros kerros)
        {
            this.kerros = kerros;
            var turva = kerros.Turva(UiKerros.Tilarivi);
            // Kuvapakka ensin: se jää kortin alle (webin z-index 3 < rail 4).
            Kuvat = new Luentakuvasarja(kerros, turva);

            kortti = Rakenne.El("mk-matkakirja", turva);
            kortti.style.display = DisplayStyle.None;
            // linear-gradient(180deg, rgba(217,161,59,.07), transparent) paneelin päällä.
            var paneeli = Kuviot.Vari("#2a1f16");
            Rakenne.Tausta(kortti, Kuviot.Pysty("matkakirja", Color.Lerp(paneeli, Kuviot.Vari("#d9a13b"), 0.07f), paneeli));
            Kirjasimet.Aseta(kortti, Kirjasin.Kone);
            kortti.RegisterCallback<PointerDownEvent>(_ => { if (pieni) AsetaPieni(false); });

            var ylarivi = Rakenne.El("mk-matkakirja__ylarivi", kortti, PickingMode.Ignore);
            otsikko = Rakenne.Teksti("Matkapäiväkirja", "mk-matkakirja__otsikko", ylarivi);
            lyhyt = Rakenne.Teksti("", "mk-matkakirja__lyhyt", ylarivi);
            kaiutin = Rakenne.Nappi(null, "mk-matkakirja__kaiutin", VaihdaKertoja, ylarivi);
            kaiutin.tooltip = "Kertoja";
            var kuvake = Rakenne.El("mk-kaiutin", kaiutin, PickingMode.Ignore);
            Rakenne.Ikoni(KaiutinRunko, "mk-kaiutin__osa", kuvake);
            for (int i = 0; i < 3; i++) kaaret[i] = Rakenne.Ikoni(Kaaret[i], "mk-kaiutin__osa mk-kaiutin__kaari", kuvake);
            Rakenne.El("mk-kaiutin__vinoviiva", kuvake, PickingMode.Ignore);

            tunnelma = Rakenne.Teksti("", "mk-matkakirja__tunnelma", kortti);
            teksti = Rakenne.Teksti("", "mk-matkakirja__teksti", kortti);
            teksti.enableRichText = true;
            pikkukuvat = Rakenne.El("mk-matkakirja__pikkukuvat", kortti, PickingMode.Ignore);

            kerros.TurvaMuuttui += Asettele;
            kerros.JokaRuutu += Mittari;
            Asetukset.Muuttui += _ => PaivitaKaiutin();
            Asettele();
            PaivitaKaiutin();
        }

        void Asettele() => kortti.style.top = Ylapalkki.Korkeus + 8;

        /// <summary>Näyttää kaupungin merkinnän ja aloittaa kirjoituskoneen (luento alkaa samalla hetkellä).</summary>
        public void Nayta(Saapumisvirta v)
        {
            if (v == null || string.IsNullOrEmpty(v.Teksti)) return;
            kaupunki = v.Kaupunki;
            var (o, t) = v.Otsikko();
            otsikko.text = o ?? "Matkapäiväkirja";
            otsikko.EnableInClassList("mk-matkakirja__otsikko--paikka", o != null);
            lyhyt.text = o ?? "";
            tunnelma.text = t ?? "";
            tunnelma.style.display = string.IsNullOrEmpty(t) ? DisplayStyle.None : DisplayStyle.Flex;
            pikkukuvat.Clear();
            AsetaPieni(false);
            kortti.style.display = DisplayStyle.Flex;
            Kirjoita(v.Teksti);
        }

        public void Piilota()
        {
            kirjoitus?.Pause();
            pienennys?.Pause();
            kortti.style.display = DisplayStyle.None;
        }

        /// <summary>
        /// Kirjoituskone sanoittain (webin typeText, 'fact'-paikka: tasainen 50 ms/sana, ei kynän ääntä).
        /// Koko teksti varaa tilansa heti (näkymätön loppu), joten kortti ei hypi.
        /// </summary>
        void Kirjoita(string koko)
        {
            kirjoitus?.Pause();
            sanat = koko.Split(' ');
            naytetty = 0;
            PaivitaTeksti();
            kirjoitus = teksti.schedule.Execute(() =>
            {
                naytetty++;
                PaivitaTeksti();
                if (naytetty >= sanat.Length) { kirjoitus.Pause(); Kirjoitettu(); }
            }).Every((long)SanaMs);
        }

        void PaivitaTeksti()
        {
            string nakyva = string.Join(" ", sanat, 0, Mathf.Min(naytetty, sanat.Length));
            string loput = naytetty < sanat.Length ? string.Join(" ", sanat, naytetty, sanat.Length - naytetty) : "";
            teksti.text = loput.Length > 0 ? nakyva + " <alpha=#00>" + loput + "</alpha>" : nakyva;
        }

        void Kirjoitettu()
        {
            // Puhelimessa kortti pienenee merkinnän jälkeen (webin asetaPaivakirjanKoko), kun luento on ohi.
            pienennys?.Pause();
            pienennys = kortti.schedule.Execute(() =>
            {
                if (!Aanet.KertojaPuhuu && Screen.width < Screen.height) AsetaPieni(true);
            }).Every(1500);
        }

        void AsetaPieni(bool p)
        {
            pieni = p;
            kortti.EnableInClassList("mk-matkakirja--pieni", p);
            if (p) pienennys?.Pause();
        }

        /// <summary>Luennan jälkeen: pikkukuvat kortin loppuun (webin paivitaMatkakirjanPikkukuvat).</summary>
        public void LisaaPikkukuva(VirtaKuva k)
        {
            var el = Rakenne.El("mk-matkakirja__pikkukuva", pikkukuvat);
            el.tooltip = k.Lyhyt;
            Natiivi.Kuvat.Hae(k.Osoite, t => { if (t != null) el.style.backgroundImage = new StyleBackground(t); });
            el.RegisterCallback<PointerDownEvent>(e => { e.StopPropagation(); Kuvat.Suurenna(k); });
        }

        // --- kaiutin: Kertoja-kytkin ja VU-mittari -----------------------------------

        void VaihdaKertoja() => Asetukset.Aseta(Kytkin.Kertoja, !Asetukset.Paalla(Kytkin.Kertoja));

        void PaivitaKaiutin()
        {
            bool paalla = Asetukset.Paalla(Kytkin.Kertoja);
            kaiutin.EnableInClassList("mk-mykistetty", !paalla);
        }

        void Mittari()
        {
            if (!Nakyy || pieni) return;
            float rms = 0;
            if (Aanet.KertojaPuhuu)
            {
                AudioListener.GetOutputData(naytteet, 0);
                double s = 0;
                for (int i = 0; i < naytteet.Length; i++) s += naytteet[i] * naytteet[i];
                rms = Mathf.Sqrt((float)(s / naytteet.Length));
            }
            float dt = Time.unscaledDeltaTime;
            for (int i = 0; i < 3; i++)
            {
                float tavoite = rms >= Kynnykset[i] ? 1f : 0.2f;
                // Nousu ~18 ms, lasku ~120 ms (webin kaiutinmittari).
                float nopeus = tavoite > kaariTaso[i] ? dt / 0.018f : dt / 0.12f;
                kaariTaso[i] = Mathf.MoveTowards(kaariTaso[i], tavoite, nopeus);
                kaaret[i].style.opacity = kaariTaso[i];
            }
        }
    }
}
