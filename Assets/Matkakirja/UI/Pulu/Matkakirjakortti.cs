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
// Kortin sisällön valitsee Saapumisesitys (Matkakirjamerkinnat.cs): fokusvirran
// merkintä, aarremerkintä, pakin saapumisteksti, saapumishavainto tai arvottu
// paikkatieto ("Matkalla — X"). Merkinnän mukaan kortissa on lihavoitu
// ensimmäinen lause (.fact-lead), lähderivi tekstin perään (.source-line:
// "LÄHDE: fi.wikipedia.org") ja pieni kuvaikoni "Katso kuva" (#fact-image),
// joka avaa ilmiön Wikipedia-artikkelin. Webin openWikiArticle on pelin oma
// artikkelidialogi; natiivissa sitä ei ole, joten artikkeli aukeaa selaimeen
// samalla kielijärjestyksellä (fi, sitten en; PuluChat.HaeYhteenveto).
//
// Luennan kuvat (Luentakuvasarja) ja Ohita-nappi kuuluvat samaan esitykseen:
// kuvat alkavat, kun luento todella alkaa (PeliOhjain.LuentoAlkoi), toinen
// luentakuva 9 s kohdalla, Livian kommentti ja PuluCam-kuvat luennon jälkeen.
using System;
using System.Collections.Generic;
using System.Linq;
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
        // Web #fact-image: kehys, aurinko ja vuoret (24 × 24).
        const string KuvaIkoni = "<rect x=\"2.4\" y=\"4.4\" width=\"19.2\" height=\"15.2\" rx=\"2.2\"/>"
            + "<circle class=\"taytto\" cx=\"8.3\" cy=\"9.3\" r=\"1.6\"/>"
            + "<path class=\"taytto\" d=\"M4.6 17.4 L10 11.6 L13.4 15 L16.6 11.9 L19.4 17.4 Z\"/>";

        readonly UiKerros kerros;
        readonly VisualElement kortti, pikkukuvat, lahderivi;
        readonly Label otsikko, tunnelma, teksti, lyhyt;
        readonly Button kaiutin, kuvanappi;
        readonly SvgIkoni[] kaaret = new SvgIkoni[3];
        readonly float[] kaariTaso = new float[3];
        readonly float[] naytteet = new float[256];
        public readonly Luentakuvasarja Kuvat;

        string[] sanat;
        int naytetty, lihavia;
        IVisualElementScheduledItem kirjoitus, pienennys;
        bool pieni, wikiHaussa;
        string wiki;
        Merkinta merkinta;
        Action kirjoitettu;

        public bool Nakyy => kortti.style.display == DisplayStyle.Flex;
        /// <summary>Kortin merkinnän avain (web factKey), tai null.</summary>
        public string Avain => merkinta?.Avain;
        /// <summary>Otsikko on paikallaan, mutta teksti odottaa kirjoitusta (web: traileri/luento kesken).</summary>
        public bool Kirjoittamatta { get; private set; }
        /// <summary>Kirjoituskone on lyönyt merkinnän loppuun.</summary>
        public bool Valmis => merkinta != null && !Kirjoittamatta && sanat != null && naytetty >= sanat.Length;
        /// <summary>Näytetty merkintä (testikomennot).</summary>
        public Merkinta Merkinta => merkinta;

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
            lahderivi = Rakenne.El("mk-matkakirja__lahteet", kortti, PickingMode.Ignore);
            Piiloon(lahderivi, true);
            // Pieni kuvaikoni: avaa havainnossa mainitun ilmiön artikkelin (web #fact-image).
            kuvanappi = Rakenne.Nappi(null, "mk-matkakirja__kuva", AvaaWiki, kortti);
            kuvanappi.tooltip = "Katso kuva";
            Rakenne.Ikoni(KuvaIkoni, "mk-matkakirja__kuvaikoni", kuvanappi).pickingMode = PickingMode.Ignore;
            Piiloon(kuvanappi, true);
            pikkukuvat = Rakenne.El("mk-matkakirja__pikkukuvat", kortti, PickingMode.Ignore);

            kerros.TurvaMuuttui += Asettele;
            kerros.JokaRuutu += Mittari;
            Asetukset.Muuttui += _ => PaivitaKaiutin();
            Asettele();
            PaivitaKaiutin();
        }

        void Asettele() => kortti.style.top = Ylapalkki.Varaus + 8;

        /// <summary>
        /// Uusi merkintä korttiin: otsikko, paikkarivi ja kuvaikoni heti, teksti
        /// kirjoituskoneella (kirjoita = false: teksti odottaa Kirjoita()-kutsua, web
        /// aloitaMerkinta trailerin jälkeen). valmis kutsutaan viimeisen sanan jälkeen.
        /// </summary>
        public void Nayta(Merkinta m, bool kirjoita = true, Action valmis = null)
        {
            if (m == null) return;
            merkinta = m;
            kirjoitettu = valmis;
            kirjoitus?.Pause();
            pienennys?.Pause();
            otsikko.text = m.PaikkaAika ? m.Otsikko ?? "" : (m.Otsikko ?? "Matkapäiväkirja").ToUpperInvariant();
            otsikko.EnableInClassList("mk-matkakirja__otsikko--paikka", m.PaikkaAika);
            // Lappu: otsikko ja lyhyt paikkarivi (web #fact-voice + .fact-place-lyhyt).
            string ly = m.Lyhyt ?? m.Paikkarivi;
            lyhyt.text = otsikko.text + (string.IsNullOrEmpty(ly) ? "" : " · " + ly);
            tunnelma.text = m.Paikkarivi ?? "";
            tunnelma.EnableInClassList("mk-matkakirja__tunnelma--paikka", !m.Tunnelma);
            Piiloon(tunnelma, string.IsNullOrEmpty(m.Paikkarivi));
            Piiloon(kaiutin, !m.Kaiutin);
            wiki = m.Wiki;
            Piiloon(kuvanappi, wiki == null);
            lahderivi.Clear();
            Piiloon(lahderivi, true);
            pikkukuvat.Clear();
            AsetaPieni(false);
            kortti.style.display = DisplayStyle.Flex;
            sanat = null;
            teksti.text = "";
            Kirjoittamatta = true;
            if (kirjoita) Kirjoita();
        }

        /// <summary>Odottavan merkinnän kirjoitus alkaa (luento alkoi); jo kirjoitettua ei kirjoiteta uudelleen.</summary>
        public void Kirjoita(Action valmis = null)
        {
            if (merkinta == null || !Kirjoittamatta) return;
            if (valmis != null) kirjoitettu = valmis;
            Kirjoittamatta = false;
            // Uusi tieto häivähtää esiin (web .fact-text.fact-in): vain arvotulla havainnolla.
            if (merkinta.Laji == "reitti" || merkinta.Laji == "satunnainen")
                teksti.experimental.animation.Start(0f, 1f, 450, (e, v) => e.style.opacity = v);
            else teksti.style.opacity = 1f;
            Kirjoita(merkinta.Lihava, merkinta.Teksti);
        }

        public void Piilota()
        {
            kirjoitus?.Pause();
            pienennys?.Pause();
            kortti.style.display = DisplayStyle.None;
        }

        /// <summary>Tyhjentää kortin (web pickstart: uusiFactKey(null)); seuraava merkintä kirjoittuu varmasti.</summary>
        public void Tyhjenna()
        {
            Piilota();
            merkinta = null;
            Kirjoittamatta = false;
            sanat = null;
            teksti.text = "";
        }

        /// <summary>
        /// Kirjoituskone sanoittain (webin typeText, 'fact'-paikka: tasainen 50 ms/sana, ei kynän ääntä).
        /// Koko teksti varaa tilansa heti (näkymätön loppu), joten kortti ei hypi. Lihavoitu
        /// ensimmäinen lause kirjoittuu ensin (web .fact-lead), loput samalla koneella perään.
        /// </summary>
        void Kirjoita(string lihava, string koko)
        {
            kirjoitus?.Pause();
            var lista = new List<string>();
            if (!string.IsNullOrEmpty(lihava)) lista.AddRange(lihava.Split(' '));
            lihavia = lista.Count;
            if (!string.IsNullOrEmpty(koko)) lista.AddRange(koko.Split(' '));
            sanat = lista.ToArray();
            naytetty = 0;
            PaivitaTeksti();
            if (sanat.Length == 0) { Kirjoitettu(); return; }
            kirjoitus = teksti.schedule.Execute(() =>
            {
                naytetty++;
                PaivitaTeksti();
                if (naytetty >= sanat.Length) { kirjoitus.Pause(); Kirjoitettu(); }
            }).Every((long)SanaMs);
        }

        /// <summary>Sanat [alku, loppu) rich textinä: lihavoidut &lt;b&gt;-tagin sisään.</summary>
        string Osa(int alku, int loppu)
        {
            if (loppu <= alku) return "";
            int raja = Mathf.Clamp(lihavia, alku, loppu);
            string b = raja > alku ? "<b>" + string.Join(" ", sanat, alku, raja - alku) + "</b>" : "";
            string t = loppu > raja ? string.Join(" ", sanat, raja, loppu - raja) : "";
            return b.Length > 0 && t.Length > 0 ? b + " " + t : b + t;
        }

        void PaivitaTeksti()
        {
            int n = Mathf.Min(naytetty, sanat.Length);
            string nakyva = Osa(0, n);
            string loput = Osa(n, sanat.Length);
            teksti.text = loput.Length > 0 ? nakyva + (n > 0 ? " " : "") + "<alpha=#00>" + loput + "</alpha>" : nakyva;
        }

        void Kirjoitettu()
        {
            NaytaLahteet();
            var k = kirjoitettu;
            kirjoitettu = null;
            try { k?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
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
            el.userData = k;
            Natiivi.Kuvat.Hae(k.Osoite, t => { if (t != null) el.style.backgroundImage = new StyleBackground(t); });
            // Suurennos selattavana: kortin kaikki pikkukuvat (web avaaSuurennos ‹ ›).
            el.RegisterCallback<PointerDownEvent>(e =>
            {
                e.StopPropagation();
                var sarja = pikkukuvat.Children().Select(x => x.userData as VirtaKuva).Where(x => x != null).ToList();
                Kuvat.Suurenna(sarja, Mathf.Max(0, sarja.IndexOf(k)));
            });
        }

        // --- lähderivi ja kuvaikoni -------------------------------------------------

        /// <summary>
        /// Web sourceLine: "LÄHDE:" ja lähteet " · "-erottimin; verkko-osoite palvelimen
        /// nimenä linkkinä (avautuu selaimeen), sanallinen viite sellaisenaan.
        /// </summary>
        void NaytaLahteet()
        {
            lahderivi.Clear();
            var lahteet = merkinta?.Lahteet;
            if (lahteet == null || lahteet.Count == 0) { Piiloon(lahderivi, true); return; }
            Rakenne.Teksti("LÄHDE:", "mk-matkakirja__lahdeotsikko", lahderivi);
            for (int i = 0; i < lahteet.Count; i++)
            {
                if (i > 0) Rakenne.Teksti(" · ", "mk-matkakirja__lahde", lahderivi);
                string l = lahteet[i];
                if (Matkakirjamerkinnat.OnOsoite(l))
                {
                    string osoite = l.Trim();
                    var b = Rakenne.Nappi(Matkakirjamerkinnat.LahteenNimi(l), "mk-matkakirja__lahdelinkki", () => Application.OpenURL(osoite), lahderivi);
                    Kirjasimet.Aseta(b, Kirjasin.Kone);
                }
                else Rakenne.Teksti(l, "mk-matkakirja__lahde", lahderivi);
            }
            Piiloon(lahderivi, false);
        }

        // Piilotus luokalla eikä inline-tyylillä: lapun (--pieni) USS-säännöt saavat yhä piilottaa.
        static void Piiloon(VisualElement e, bool piiloon) => e.EnableInClassList("mk-matkakirja__piilo", piiloon);

        /// <summary>
        /// "Katso kuva" (web openWikiArticle): Wikipedian artikkeli, suomi ensin ja
        /// englanti varalle (web WIKI_LANGS, tynkä alle 200 merkkiä ei kelpaa ensimmäiseksi).
        /// Natiivissa ei ole pelin omaa artikkelidialogia, joten sivu aukeaa selaimeen.
        /// </summary>
        void AvaaWiki()
        {
            if (string.IsNullOrEmpty(wiki) || wikiHaussa) return;
            string otsikko = wiki;
            wikiHaussa = true;
            kuvanappi.SetEnabled(false);
            UiKerros.Hae().StartCoroutine(PuluChat.HaeYhteenveto(otsikko, new[] { "fi", "en" }, y =>
            {
                wikiHaussa = false;
                kuvanappi.SetEnabled(true);
                Application.OpenURL(!string.IsNullOrEmpty(y?.Osoite) ? y.Osoite
                    : "https://fi.wikipedia.org/wiki/" + Uri.EscapeDataString(otsikko.Replace(' ', '_')));
            }));
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
