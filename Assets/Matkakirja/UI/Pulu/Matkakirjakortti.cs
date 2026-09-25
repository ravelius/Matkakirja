// MATKAKIRJAKORTTI (Natiivi-UI, erä 5): webin .fact-card (#fact-voice, #fact-place,
// #fact-text) ja isoisän luennan esitys.
//
//   ATEENA, ELOKUUSSA 1873                               [kaiutin ))) ]
//   Pölyä ja puhetta kullasta.                           (kursiivi, himmeä)
//   Ateenassa kahvilan isäntä piti Schliemannia nerona…  (kirjoituskone 50 ms/sana)
//   [pikkukuva] [pikkukuva]                              (luentakuvat + PuluCam)
//
// Tumma nahkapaneeli (--panel #2a1f16 + kultainen yläliukuma), American
// Typewriter, vasen yläkulma yläpalkin alla, leveys min(340, 62 %). Lappu ("pieni",
// yhden rivin pergamenttikaistale, napautus avaa) webin asetaPaivakirjanKoko-säännöillä:
// puhelimessa merkintä alkaa lappuna (web PUHELIN_KYSELY; iPad ei ole puhelin), ja
// kertojan luennan aikana tekstit ovat piilossa KAIKILLA laitteilla (omistaja 15.9.2026,
// Raamattu "TEKSTIT PIILOON KAIKILLA LAITTEILLA"): auki oleva kortti kutistuu, kun
// kertoja alkaa, eikä luennan loppu avaa sitä (KARTTAUUDISTUKSEN PAATOKSET 38/1). Kaiutin on Kertoja-kytkin (webin #fact-kuuntele,
// omistaja 25.8.2026) ja sen kolme kaarta toimivat VU-mittarina kertojan äänestä
// (kynnykset 0,04 / 0,10 / 0,20; vain opacity).
//
// iPHONE (omistaja 24.9.2026, löydös 20): lappu on kaupunkipilleri rahapillerin alla, samanlevyinen ja samaa
// tyyliä ("Ateena"; pitkä nimi lyhenee yhdelle riville). Napautus avaa kortin kuten ennenkin; auki oleva
// kortti asettuu pillereiden alle (Kiinnita(Ylapalkki)).
//
// Kortin sisällön valitsee Saapumisesitys (Matkakirjamerkinnat.cs): fokusvirran
// merkintä, aarremerkintä, pakin saapumisteksti, saapumishavainto tai arvottu
// paikkatieto ("Matkalla — X"). Saapumistekstillä ja -havainnolla on kaupungin
// valokuva pikkukuvana (web #fact-valokuva), joka avaa kuvapinon. Merkinnän mukaan kortissa on lihavoitu
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
        IVisualElementScheduledItem kirjoitus;
        bool pieni;
        // Webin luentavahti (ui.js, 200 ms): tekstipiilo päällä kertojan ajan + välirauha.
        const long ValirauhaMs = 900 + 400; // SAAPUMISEN_KUPLA_LUENNAN_JALKEEN_MS + 400
        bool luentaPiilo;
        float kertojaLoppui = -1f;
        string wiki;
        Merkinta merkinta;
        Action kirjoitettu;

        public bool Nakyy => kortti.style.display == DisplayStyle.Flex;
        /// <summary>Kortin laatikko paneelissa (nopan lepopaikan kulmavalinta, web factCard.dataset.corner).</summary>
        public Rect Laatikko => kortti.worldBound;

        /// <summary>Kortti on yhden rivin lappu (ei auki).</summary>
        public bool Lappuna => Nakyy && pieni;

        /// <summary>Karttaselite auki: kortti väistyy paneelin alta (kortti on ylemmällä kerroksella).</summary>
        public void SeliteVaisto(bool v)
        {
            kortti.EnableInClassList("mk-matkakirja--selite", v);
            if (v) kortti.pickingMode = PickingMode.Ignore;
            else if (!kortti.ClassListContains("mk-matkakirja--vaistyy")) kortti.pickingMode = PickingMode.Position;
        }

        /// <summary>Lappu häipyy offline-pillerin vuoron ajaksi (sama yläkulma; OfflineTilaUi.Vuorottele).</summary>
        public void Vaisty(bool v)
        {
            if (kortti.ClassListContains("mk-matkakirja--vaistyy") == v) return;
            kortti.EnableInClassList("mk-matkakirja--vaistyy", v);
            kortti.pickingMode = v ? PickingMode.Ignore : PickingMode.Position;
        }
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
            // Kuvien lennon maali (web lennataKuvatMatkakirjaan: .fact-card): näkyvän kortin laatikko, muuten ei lentoa.
            Kuvat.Maali = () => kortti.panel != null && kortti.resolvedStyle.display != DisplayStyle.None
                && kortti.resolvedStyle.opacity > 0.01f ? kortti.worldBound : default;

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
            kortti.schedule.Execute(Luentavahti).Every(200);
            Asetukset.Muuttui += _ => PaivitaKaiutin();
            Asettele();
            PaivitaKaiutin();
        }

        Ylapalkki ylapalkki;

        /// <summary>iPhonen kaupunkipilleri seuraa rahapilleriä (UiNakymat kytkee).</summary>
        public void Kiinnita(Ylapalkki y)
        {
            ylapalkki = y;
            Ylapalkki.PalkkiPiilossaMuuttui += PaivitaPalkkipiilo;
            Ylapalkki.AukiMuuttui += _ => PaivitaPalkkipiilo();
            y.PilleriMuuttui += Asettele;
            Asettele();
        }

        static bool Kaupunkipilleri => Ylapalkki.Kelluva;
        /// <summary>Löydös 73: iPhonella pienennetty lappu näyttää vain kaupungin nimen ja on tekstinsä levyinen.</summary>
        static bool VainNimi => Ylapalkki.Puhelin;

        /// <summary>
        /// Löydös 68: iPhonen vaakamuodossa pienennetty lappu häviää yläpalkin mukana ja palaa, kun palkki avataan
        /// väkäsnapista.
        /// </summary>
        void PaivitaPalkkipiilo()
        {
            bool piiloon = Ylapalkki.Puhelin && pieni && Ylapalkki.PalkkiPiilossa && !Ylapalkki.Auki;
            if (kortti.ClassListContains("mk-matkakirja--palkinpiilo") == piiloon) return;
            kortti.EnableInClassList("mk-matkakirja--palkinpiilo", piiloon);
            kortti.pickingMode = piiloon ? PickingMode.Ignore : PickingMode.Position;
        }

        void Asettele()
        {
            var ylapilleri = ylapalkki?.Pilleri;
            bool kiinni = Kaupunkipilleri && ylapilleri != null && ylapilleri.panel != null
                && ylapilleri.resolvedStyle.display == DisplayStyle.Flex && ylapilleri.worldBound.width > 0 && kortti.parent != null;
            kortti.EnableInClassList("mk-matkakirja--pilleri", Kaupunkipilleri);
            if (!kiinni)
            {
                kortti.style.top = Ylapalkki.Varaus + 8;
                kortti.style.left = StyleKeyword.Null;
                kortti.style.width = StyleKeyword.Null;
                return;
            }
            var paikka = kortti.parent.WorldToLocal(ylapilleri.worldBound);
            kortti.style.top = paikka.yMax + 6;
            kortti.style.left = paikka.xMin;
            // Lappu samanlevyisenä kuin rahapilleri; auki oleva kortti omalla leveydellään (USS).
            if (pieni) kortti.style.width = paikka.width;
            else kortti.style.width = StyleKeyword.Null;
            // Pillerin kaiutin on mittari, ei kytkin: napautus avaa kortin (tekstin) kuten muu pilleri.
            kaiutin.pickingMode = pieni ? PickingMode.Ignore : PickingMode.Position;
        }

        /// <summary>Kaupunkipillerin teksti: kaupungin nimi (sisällöstä, muuten otsikon alku ennen pilkkua).</summary>
        static string KaupunginNimi(Merkinta m)
        {
            string nimi = m.Kaupunki != null ? UiSisalto.Kaupunki(m.Kaupunki)?.Nimi : null;
            if (!string.IsNullOrEmpty(nimi)) return nimi;
            string o = m.Otsikko ?? "";
            int i = o.IndexOfAny(new[] { ',', '·' });
            return (i > 0 ? o.Substring(0, i) : o).Trim();
        }

        /// <summary>
        /// Linssi päällä (web: satelliitti peittää kortin, keksinnöt/topografia/radio piilottavat .fact-card):
        /// kortti ja luentakuvat piiloon näkyvyydellä, jolloin merkintä ja kirjoitus säilyvät.
        /// </summary>
        public void NaytaSallittu(bool sallitaan)
        {
            kortti.style.visibility = sallitaan ? Visibility.Visible : Visibility.Hidden;
            Kuvat.NaytaSallittu(sallitaan);
        }

        /// <summary>
        /// Web puhelinTila (max-width 699 / max-height 520 CSS-pikseliä): iPhone kyllä, iPad ei. Tabletti tunnistetaan
        /// kuten pisteskaalassa (UiKerros.Tabletti), koska simulaattorin deviceModel ei ala "iPad".
        /// </summary>
        static bool Puhelin => Application.platform == RuntimePlatform.IPhonePlayer
            ? !UiKerros.Tabletti : Screen.width < Screen.height;

        /// <summary>Web tekstitPiilossa: puhelin tai kertojan luenta.</summary>
        bool TekstitPiilossa => Puhelin || luentaPiilo;

        /// <summary>Testikomentoa varten: miksi kortti on lappu (ui matkakirja).</summary>
        public string Tila => $"pieni {pieni}, puhelin {Puhelin} (tabletti {UiKerros.Tabletti}, malli {SystemInfo.deviceModel}), luentapiilo {luentaPiilo}, kertoja {Aanet.KertojaPuhuu}";

        /// <summary>
        /// Webin luentavahti: kertojan alkaessa auki oleva kortti kutistuu lapuksi; puheenvuorojen
        /// välissä piilo pysyy välirauhan ajan (ei välähdystä). Loppu ei avaa korttia millään laitteella.
        /// </summary>
        PalloKierto kierto;

        /// <summary>
        /// Web kutistaKortinLiikkeesta (mapPanen napautus, raahaus, nipistys): pelaajan napautus tai ele kartalla kutistaa
        /// auki olevan kortin lapuksi. Kertojan luennan aikana kortti ei nouse takaisin (omistaja 15.9.2026), joten
        /// palautusajastinta ei tarvita. Lapun oma napautus avaa kortin (PointerDown yllä).
        /// </summary>
        void KytkeKartta()
        {
            if (kierto != null) return;
            kierto = UnityEngine.Object.FindAnyObjectByType<PalloKierto>();
            if (kierto == null) return;
            kierto.Napautettu += _ => KartanLiike();
            // Veto ja nipistys (web kartan raahaus, nipistys ja pallolaudan veto); kamera-ajo ei herätä.
            kierto.PelaajanEle += KartanLiike;
        }

        /// <summary>Lappu auki (web asetaPaivakirjanKoko(false), lapun napautus); testikomento ui matkakirja auki.</summary>
        public void Avaa()
        {
            if (Nakyy) AsetaPieni(false);
        }

        public void KartanLiike()
        {
            if (Nakyy && !pieni) AsetaPieni(true);
        }

        void Luentavahti()
        {
            KytkeKartta();
            bool kertoja = Aanet.KertojaPuhuu;
            float nyt = Time.realtimeSinceStartup;
            if (kertoja) kertojaLoppui = nyt;
            bool piiloon = kertoja || (kertojaLoppui >= 0f && (nyt - kertojaLoppui) * 1000f < ValirauhaMs);
            if (!piiloon) kertojaLoppui = -1f;
            if (piiloon == luentaPiilo) return;
            luentaPiilo = piiloon;
            if (piiloon && Nakyy && !pieni) AsetaPieni(true);
        }

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
            otsikko.text = m.PaikkaAika ? m.Otsikko ?? "" : (m.Otsikko ?? "Matkapäiväkirja").ToUpperInvariant();
            otsikko.EnableInClassList("mk-matkakirja__otsikko--paikka", m.PaikkaAika);
            // Lappu: otsikko ja lyhyt paikkarivi (web #fact-voice + .fact-place-lyhyt).
            string ly = m.Lyhyt ?? m.Paikkarivi;
            lyhyt.text = Kaupunkipilleri || VainNimi ? KaupunginNimi(m) : otsikko.text + (string.IsNullOrEmpty(ly) ? "" : " · " + ly);
            tunnelma.text = m.Paikkarivi ?? "";
            tunnelma.EnableInClassList("mk-matkakirja__tunnelma--paikka", !m.Tunnelma);
            Piiloon(tunnelma, string.IsNullOrEmpty(m.Paikkarivi));
            Piiloon(kaiutin, !m.Kaiutin);
            wiki = m.Wiki;
            Piiloon(kuvanappi, wiki == null);
            lahderivi.Clear();
            Piiloon(lahderivi, true);
            pikkukuvat.Clear();
            if (m.Valokuvat.Count > 0) LisaaValokuva(m.Valokuvat);
            AsetaPieni(TekstitPiilossa);
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
            teksti.text = loput.Length > 0 ? nakyva + (n > 0 ? " " : "") + "<alpha=#00>" + loput : nakyva;
        }

        void Kirjoitettu()
        {
            NaytaLahteet();
            var k = kirjoitettu;
            kirjoitettu = null;
            try { k?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
        }

        void AsetaPieni(bool p)
        {
            pieni = p;
            kortti.EnableInClassList("mk-matkakirja--pieni", p);
            kortti.EnableInClassList("mk-matkakirja--nimi", p && VainNimi && !Kaupunkipilleri);
            PaivitaPalkkipiilo();
            Asettele();
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

        /// <summary>
        /// Web naytaFactValokuva: muistikirjan kyljen pikkukuva (pinon ensimmäinen), napautus avaa
        /// koko pinon postikortteina (web naytaPostikortti, Postikortti alla). Latausvirhe
        /// piilottaa pikkukuvan (web factValokuvaKuva error). Ei userDataa: luennan pikkukuvien
        /// sarja (LisaaPikkukuva) ei poimi tätä.
        /// </summary>
        void LisaaValokuva(List<VirtaKuva> pino)
        {
            var eka = pino[0];
            var el = Rakenne.El("mk-matkakirja__pikkukuva mk-matkakirja__valokuva", pikkukuvat);
            el.tooltip = eka.Lyhyt;
            Natiivi.Kuvat.Hae(eka.Osoite, t =>
            {
                if (t != null) el.style.backgroundImage = new StyleBackground(t);
                else el.style.display = DisplayStyle.None;
            });
            el.RegisterCallback<PointerDownEvent>(e =>
            {
                e.StopPropagation();
                Postikortti.Avaa(pino); // E13: web naytaPostikortti
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

        /// <summary>"Katso kuva" (web openWikiArticle): pelin oma Lue lisää -ikkuna (WikiIkkuna).</summary>
        void AvaaWiki()
        {
            if (string.IsNullOrEmpty(wiki)) return;
            UiNakymat.Hae()?.Wiki.Avaa(wiki);
        }

        // --- kaiutin: Kertoja-kytkin ja VU-mittari -----------------------------------

        /// <summary>Kortin kaiutin käänsi kertojan päälle (web factKuuntele: vain kortin nappi aloittaa merkinnän luennan).</summary>
        public event Action KertojaPaalleKortista;

        void VaihdaKertoja()
        {
            bool paalle = !Asetukset.Paalla(Kytkin.Kertoja);
            Asetukset.Aseta(Kytkin.Kertoja, paalle);
            if (paalle) KertojaPaalleKortista?.Invoke();
        }

        void PaivitaKaiutin()
        {
            bool paalla = Asetukset.Paalla(Kytkin.Kertoja);
            kaiutin.EnableInClassList("mk-mykistetty", !paalla);
            // E20: web paivitaKaiutinTila (title tilan mukaan).
            kaiutin.tooltip = paalla ? "Luenta päällä — mykistä" : "Luenta pois — kytke päälle";
        }

        void Mittari()
        {
            // iPhonen kaupunkipillerissä kaiutin näkyy lapussakin (löydös 21: sykkii luennan aikana).
            if (!Nakyy || (pieni && !Kaupunkipilleri)) return;
            float rms = 0;
            if (Aanet.KertojaPuhuu)
            {
                // Aito äänitaso: kertojan oma AudioSource, kun luenta soi siitä; muuten (Pelikoodarin Puhe) kuulijan miksaus.
                var lahde = Aanet.Kertojasoitin;
                if (lahde != null && lahde.isPlaying) lahde.GetOutputData(naytteet, 0);
                else AudioListener.GetOutputData(naytteet, 0);
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

    /// <summary>
    /// E13 (web naytaPostikortti ja postikorttiSulkija, css .postikortti): matkakirjan valokuvapino vinoina
    /// postikortteina ruudun keskellä (leveys ja kuva-ikkuna webin @media-portain, nosto −52 %). Päällimmäinen kallistuu −4,5°,
    /// alemmat +4° ja siirtyvät (14, 30) px ilman tekstejä. Kuva-ikkuna rajattuna,
    /// kuvateksti 0,86rem ja lähde 0,6rem kirjoituskoneella, laskuri "i/n" oikeassa alakulmassa. Pinossa
    /// vasen reunakaista (24 %) vie edelliseen ja oikea seuraavaan, keskiosa pitää kortin; napautus kortin
    /// ohi sulkee (yhden kuvan kortti mistä tahansa). Ei varjoa eikä harmaasävyä (UITK:ssa ei box-shadow- eikä
    /// filter-ominaisuutta).
    /// </summary>
    public static class Postikortti
    {
        static VisualElement verho;
        static readonly List<VisualElement> kortit = new List<VisualElement>();
        static int indeksi;

        public static void Avaa(List<VirtaKuva> pino)
        {
            Sulje();
            if (pino == null || pino.Count == 0) return;
            var juuri = UiKerros.Hae().Juuri(UiKerros.Traileri);
            verho = Rakenne.El("mk-postikortti__verho", juuri);
            verho.RegisterCallback<PointerDownEvent>(Napautus);
            float w = juuri.panel != null ? juuri.panel.visualTree.layout.width : 393f;
            float h = juuri.panel != null ? juuri.panel.visualTree.layout.height : 852f;
            var pinoEl = Rakenne.El("mk-postikortti", verho, PickingMode.Ignore);
            // Web @media: ≥ 700 px min(88vw, 76vh, 720) ja kuva min(52vh, 500); ≥ 1000 × 760 min(84vw, 82vh, 880) ja
            // min(60vh, 600); ≥ 1500 × 950 min(76vw, 84vh, 1040) ja min(64vh, 760); muuten min(84vw, 460) ja min(48vh, 330).
            float leveys, kuvaKorkeus;
            if (w >= 1500f && h >= 950f) { leveys = Mathf.Min(w * 0.76f, h * 0.84f, 1040f); kuvaKorkeus = Mathf.Min(h * 0.64f, 760f); }
            else if (w >= 1000f && h >= 760f) { leveys = Mathf.Min(w * 0.84f, h * 0.82f, 880f); kuvaKorkeus = Mathf.Min(h * 0.6f, 600f); }
            else if (w >= 700f) { leveys = Mathf.Min(w * 0.88f, h * 0.76f, 720f); kuvaKorkeus = Mathf.Min(h * 0.52f, 500f); }
            else { leveys = Mathf.Min(w * 0.84f, 460f); kuvaKorkeus = Mathf.Min(h * 0.48f, 330f); }
            pinoEl.style.width = Mathf.Round(leveys);
            kortit.Clear();
            indeksi = 0;
            for (int i = 0; i < pino.Count; i++)
            {
                var k = pino[i];
                var kortti = Rakenne.El("mk-postikortti__kortti", pinoEl, PickingMode.Ignore);
                var kuva = Rakenne.El("mk-postikortti__kuva", kortti, PickingMode.Ignore);
                kuva.style.height = Mathf.Round(kuvaKorkeus);
                Kuvat.Hae(k.Osoite, t => { if (t != null) kuva.style.backgroundImage = new StyleBackground(t); });
                // Web: lähde (.kuvalahde 0,6rem #8a7a60) kuvatekstin sisällä sen perässä.
                string kuvateksti = k.Selite ?? k.Lyhyt ?? "";
                if (!string.IsNullOrEmpty(k.Lahde))
                    kuvateksti += (kuvateksti.Length > 0 ? " " : "") + "<size=9.6><color=#8a7a60>" + k.Lahde + "</color></size>";
                var teksti = Rakenne.Teksti(kuvateksti, "mk-postikortti__teksti", kortti);
                Kirjasimet.Aseta(teksti, Kirjasin.Kone);
                teksti.style.display = kuvateksti.Length == 0 ? DisplayStyle.None : DisplayStyle.Flex;
                if (pino.Count > 1) Kirjasimet.Aseta(Rakenne.Teksti($"{i + 1}/{pino.Count}", "mk-postikortti__laskuri", kortti), Kirjasin.Kone);
                kortit.Add(kortti);
            }
            Jarjesta();
        }

        public static bool Auki => verho != null;

        public static void Sulje()
        {
            verho?.RemoveFromHierarchy();
            verho = null;
            kortit.Clear();
        }

        /// <summary>Päällimmäinen ilman alla-luokkaa ja muiden päälle; muut sen alle pinoon.</summary>
        static void Jarjesta()
        {
            for (int i = 0; i < kortit.Count; i++)
                kortit[i].EnableInClassList("mk-postikortti__kortti--alla", i != indeksi);
            if (kortit.Count > 0) kortit[indeksi].BringToFront();
        }

        static void Napautus(PointerDownEvent e)
        {
            e.StopPropagation();
            if (kortit.Count == 0) { Sulje(); return; }
            var paalla = kortit[indeksi];
            var p = (Vector2)e.position;
            bool kortilla = kortit.Any(k => k.worldBound.Contains(p));
            if (kortit.Count < 2 || !kortilla) { Sulje(); return; }
            // Web gallerianVyohyke: reunakaistat 24 % kortin leveydestä, keskiosa 52 % pitää kortin.
            var r = paalla.worldBound;
            float x = (p.x - r.xMin) / Mathf.Max(1f, r.width);
            int askel = x < 0.24f ? -1 : x > 0.76f ? 1 : 0;
            if (askel == 0) return;
            indeksi = (indeksi + askel + kortit.Count) % kortit.Count;
            Jarjesta();
        }
    }
}
