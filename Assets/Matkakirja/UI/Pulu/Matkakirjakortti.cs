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

        public bool Nakyy => nakyvissa; // sulkuanimaation aikana jo kiinni (Ponnahdus)
        /// <summary>Kortin rajat paneelissa (elämäpalkki väistää auki olevaa päiväkirjaa); tyhjä, kun ei näy.</summary>
        public Rect Rajat => Nakyy ? kortti.worldBound : Rect.zero;
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
            // Kun pikkukuvarivi on jo kortissa (merkinnän kuvat heti), lento laskeutuu sen kohdalle (rivin ensimmäisen kuvan keskelle).
            Kuvat.Maali = () =>
            {
                if (kortti.panel == null || kortti.resolvedStyle.display == DisplayStyle.None || kortti.resolvedStyle.opacity <= 0.01f) return default;
                var eka = pikkukuvat.childCount > 0 ? pikkukuvat[0].worldBound : default;
                return eka.width > 0f ? new Rect(eka.xMin, eka.center.y, kortti.worldBound.width, eka.height) : kortti.worldBound;
            };

            Kuvat.Kaistale = () => Rajat; // luentakuva kaistaleen alle oikeaan reunaan (omistaja 30.9.)
            kortti = Rakenne.El("mk-matkakirja", turva);
            kortti.style.display = DisplayStyle.None;
            // Avattu matkakirja paperina (omistaja 29.9.2026: "pohja on natiivissa yksivärinen, pitää olla paperin värinen ja
            // kuvioinen kuten webissä"): pergamentti (säteittäinen paperinsävy ja rae, sama kuin dialogeissa); pieni lappu
            // pysyy tasaisena (.mk-matkakirja--pieni peittää kuvan).
            Rakenne.Tausta(kortti, KermaValo);
            Kirjasimet.Aseta(kortti, Kirjasin.Kone);
            kortti.RegisterCallback<PointerDownEvent>(_ => { if (pieni) Muunna(false); });
            // Mitat talteen levossa (pehmeä liike päättyy täsmälleen USS:n asetteluun, ks. Muunna).
            kortti.RegisterCallback<GeometryChangedEvent>(_ =>
            {
                if (muutos != null || !nakyvissa || kortti.layout.width < 1f) return;
                if (pieni) lappuKoko = kortti.layout.size; else avoinLeveys = kortti.layout.width;
            });

            var ylarivi = Rakenne.El("mk-matkakirja__ylarivi", kortti, PickingMode.Ignore);
            otsikko = Rakenne.Teksti("Matkapäiväkirja", "mk-matkakirja__otsikko", ylarivi);
            lyhyt = Rakenne.Teksti("", "mk-matkakirja__lyhyt", ylarivi);
            // Webin lappu: otsikko lihavoituna (#fact-voice h2.paikka-aika, font-weight 700).
            Kirjasimet.Aseta(lyhyt, Kirjasin.KoneLihava);
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
        /// <summary>Löydös 73/87: pienennetty lappu on tekstinsä levyinen (web width: max-content) kaikilla laitteilla.</summary>
        static bool VainNimi => true;

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
                if (muutos == null) kortti.style.width = StyleKeyword.Null; // pehmeä liike omistaa leveyden
                return;
            }
            var paikka = kortti.parent.WorldToLocal(ylapilleri.worldBound);
            kortti.style.top = paikka.yMax + 6;
            kortti.style.left = paikka.xMin;
            // Lappu samanlevyisenä kuin rahapilleri; auki oleva kortti omalla leveydellään (USS).
            // Lappu sisältönsä levyinen kuten webissä (ennen iPhonella rahapillerin levyinen pilleri, löydös 20).
            if (muutos == null) kortti.style.width = StyleKeyword.Null;
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

        /// <summary>Puhelimessa merkintä alkaa lappuna, paitsi kertojan luennan aikana: omistaja 30.9.2026 (TF 1.0.68,
        /// Päätoimittaja): "otetaan isoisän matkakirja näkyviin automaattisesti luennan ajan" — kumoaa 15.9.:n linjan
        /// "TEKSTIT PIILOON KAIKILLA LAITTEILLA" (web tekstitPiilossa, PAATOKSET 38/1).</summary>
        bool TekstitPiilossa => Puhelin && !luentaPiilo;

        /// <summary>Testikomentoa varten: miksi kortti on lappu (ui matkakirja).</summary>
        public string Tila => $"pieni {pieni}, puhelin {Puhelin} (tabletti {UiKerros.Tabletti}, malli {SystemInfo.deviceModel}), luentapiilo {luentaPiilo}, kertoja {Aanet.KertojaPuhuu}";

        /// <summary>
        /// Luentavahti (omistaja 30.9.2026): kertojan alkaessa kortti AUKEAA (lappu → auki) ja pysyy auki luennan ajan;
        /// puheenvuorojen välissä tila pysyy välirauhan ajan (ei välähdystä). Luennan loppu ei kutista korttia; pelaajan
        /// kartan liike kutistaa sen tavalliseen tapaan vasta luennan jälkeen. (Ennen 30.9.: kertoja kutisti kortin.)
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
            if (Nakyy) Muunna(false);
        }

        public void KartanLiike()
        {
            // Luennan ajan kortti pysyy auki, vaikka pelaaja tutkii karttaa (omistaja 30.9.2026). Kutistukseen käytetty
            // napautus ei avaa maakuntalappua (omistaja 30.9.2026, maakunta automaattisesti).
            if (Nakyy && !pieni && !luentaPiilo) { Muunna(true); PalloKierto.Osui(); }
        }

        bool linssiKutisti;

        /// <summary>
        /// Web piirraLinssiSelite (linssipariteetti rivi 31): karttakerroksellisen linssin syttyminen kutistaa päiväkirjan
        /// lapuksi (kartan pitää näkyä selitteen ja päiväkirjan välistä) ja sammuminen palauttaa sen. Vain vaihtumishetkellä;
        /// palautus vain, jos kortti oli auki linssin syttyessä (puhelimen lappu jää lapuksi).
        /// </summary>
        public void Linssi(bool paalla)
        {
            if (paalla)
            {
                linssiKutisti = Nakyy && !pieni;
                if (linssiKutisti) Muunna(true);
            }
            else if (linssiKutisti)
            {
                linssiKutisti = false;
                if (Nakyy && pieni) Muunna(false);
            }
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
            if (piiloon && Nakyy && pieni) Muunna(false);
            // Löydös 87: isoisän luennon jälkeen lappu tiivistyy pelkkään kaupungin nimeen.
            if (!piiloon && merkinta != null && merkinta.Kaiutin && !luettu) { luettu = true; PaivitaLyhyt(true); }
        }

        bool luettu;
        IVisualElementScheduledItem lyhytAnimaatio;

        /// <summary>
        /// Lapun teksti WEBIN MALLIN MUKAAN (omistaja 30.9.2026; css .fact-card.pieni: #fact-voice + .fact-place-lyhyt,
        /// js/ui.js asetaPaikkarivi): matkakirjan merkinnällä (paikka ja aika otsikkona) pelkkä otsikko ("Edinburgh,
        /// elokuussa 1873") — lyhyt muoto jää tyhjäksi, koska otsikossa on jo kaupungin nimi (omistaja 8.9.2026); muilla
        /// merkinnöillä otsikko ja sen perässä lyhyt muoto himmeämpänä. Ennen luennon jälkeen pelkkä kaupungin nimi
        /// (löydös 87) ja iPhonella aina nimi (löydös 20). Löydös 97 (SÄÄNTÖ): lyhenevä teksti sulaa lopusta alkuun (0,6 s).
        /// </summary>
        string LapunTeksti(Merkinta m)
        {
            string o = otsikko.text ?? "";
            if (m.PaikkaAika) return o;
            string ly = m.Lyhyt ?? m.Paikkarivi ?? KaupunginNimi(m);
            return string.IsNullOrEmpty(ly) ? o : o + "  <color=#8a6c46>" + ly + "</color>";
        }

        void PaivitaLyhyt(bool animoi)
        {
            var m = merkinta;
            if (m == null) return;
            string uusi = LapunTeksti(m);
            lyhytAnimaatio?.Pause();
            string vanha = lyhyt.text ?? "";
            if (!animoi || LinssiUi.VahennettyLiike() || uusi.Contains('<') || vanha.Contains('<') || !vanha.StartsWith(uusi) || vanha.Length <= uusi.Length) { lyhyt.text = uusi; return; }
            float alku = Time.unscaledTime;
            lyhytAnimaatio = lyhyt.schedule.Execute(() =>
            {
                Ruudunpaivitys.Herata(0.1f); // lämpö: täysi taajuus animaation ajan
                float t = Mathf.Clamp01((Time.unscaledTime - alku) / 0.6f);
                int n = Mathf.RoundToInt(Mathf.Lerp(vanha.Length, uusi.Length, Mathf.SmoothStep(0f, 1f, t)));
                lyhyt.text = vanha.Substring(0, n).TrimEnd(' ', ',', '·');
                if (t >= 1f) { lyhyt.text = uusi; lyhytAnimaatio?.Pause(); }
            }).Every(16);
        }

        /// <summary>
        /// PEHMEÄ PIENENNYS JA AVAUS (omistaja 30.9.2026: "Pienennys animaatio pitää olla pehmeämpi"; korvaa löydöksen 97
        /// portaat, rivi 20 pt 45 ms:n välein). Webin mitat (css/styles.css body[data-mode] .fact-card: max-height 260 ms
        /// ease; .fact-card &gt; * opacity 160 ms ease): laatikko liukuu kortin ja lapun mittojen välillä 260 ms
        /// ease-in-out (cubic-bezier(0.42, 0, 0.58, 1)) leveydeltään ja korkeudeltaan vasemmasta yläkulmasta, ja sisältö
        /// häipyy 160 ms:ssä (pienennys) tai nousee laatikon perässä (avaus). Lapset ovat koko liikkeen ajan lopullisessa
        /// leveydessään eivätkä kutistu (laatikko leikkaa ne), joten teksti ei rivity uudelleen kesken liikkeen. Lapun teksti
        /// nousee näkyviin vasta laatikon asetuttua (120 ms). Lapun ja avoimen kortin mitat muistetaan edellisestä kerrasta,
        /// jotta liike päättyy täsmälleen USS:n asetteluun eikä lopussa hypähdä. Pieni liike: heti.
        /// </summary>
        public const float MuutosS = 0.26f, SisaltoS = 0.16f, LyhytS = 0.12f, SisaltoViiveS = 0.08f;
        IVisualElementScheduledItem muutos, lyhytNousu;
        Vector2 lappuKoko;
        float avoinLeveys;

        void Muunna(bool pieneksi)
        {
            if (!Nakyy) { AsetaPieni(pieneksi); return; }
            if (pieneksi == pieni && muutos == null) return;
            // Nykyinen näkyvä koko (myös kesken vastakkaisen liikkeen: suunta kääntyy siitä).
            float w0 = kortti.layout.width, h0 = kortti.layout.height;
            LopetaMuutos();
            if (LinssiUi.VahennettyLiike() || float.IsNaN(w0) || w0 < 1f || float.IsNaN(h0) || h0 < 1f) { AsetaPieni(pieneksi); return; }
            Ruudunpaivitys.Herata(MuutosS + 0.15f);
            if (pieneksi)
            {
                var (w1, h1) = LapunMitat();
                foreach (var c in kortti.Children()) { c.style.width = c.layout.width; c.style.flexShrink = 0f; }
                KiinnitaLaatikko(w0, h0);
                Aja(w0, h0, w1, () => h1, (t, k) =>
                {
                    float a = 1f - Mathf.Clamp01(t / SisaltoS);
                    foreach (var c in kortti.Children()) c.style.opacity = a;
                    Tausta(k);
                }, () =>
                {
                    VapautaLapset();
                    VapautaLaatikko();
                    AsetaPieni(true);
                    NostaLyhyt();
                });
                return;
            }
            // Avaus: avoin asettelu heti, mutta laatikko lapun kokoisena ja lapset näkymättöminä lopullisessa leveydessään.
            lyhytNousu?.Pause();
            lyhyt.style.opacity = StyleKeyword.Null;
            AsetaPieni(false);
            float leveys = AvoimenLeveys();
            float sisalto = Mathf.Max(1f, leveys - kortti.resolvedStyle.paddingLeft - kortti.resolvedStyle.paddingRight);
            foreach (var c in kortti.Children()) { c.style.width = sisalto; c.style.flexShrink = 0f; c.style.opacity = 0f; }
            KiinnitaLaatikko(w0, h0);
            // Korkeus seuraavasta asettelusta: lapset ovat jo lopullisessa leveydessään.
            muutos = kortti.schedule.Execute(() =>
            {
                muutos = null;
                // Tavoitekorkeus joka ruudulla asettelusta (laite mk3: ensimmäisellä ruudulla lapset eivät olleet vielä
                // asettuneet, laatikko kasvoi vain rivin korkuiseksi ja hyppäsi lopussa täyteen mittaan).
                Aja(w0, h0, leveys, AvoimenKorkeus, (t, k) =>
                {
                    float a = Mathf.Clamp01((t - SisaltoViiveS) / SisaltoS);
                    foreach (var c in kortti.Children()) c.style.opacity = a;
                    Tausta(1f - k);
                }, () =>
                {
                    VapautaLapset();
                    VapautaLaatikko();
                    Asettele();
                });
            });
        }

        void Aja(float w0, float h0, float w1, Func<float> h1, Action<float, float> sisalto, Action valmis)
        {
            float kulunut = 0f, edellinen = Time.unscaledTime;
            muutos = kortti.schedule.Execute(() =>
            {
                // Askel enintään 50 ms: raskas ruutu hidastaa liikettä eikä hyppää sen yli (kuten Ponnahdus).
                float nyt = Time.unscaledTime;
                kulunut += Mathf.Min(nyt - edellinen, 0.05f);
                edellinen = nyt;
                float k = Ponnahdus.Kaari(0.42f, 0f, 0.58f, 1f, kulunut / MuutosS);
                kortti.style.width = Mathf.Lerp(w0, w1, k);
                kortti.style.height = Mathf.Lerp(h0, h1(), k);
                sisalto(kulunut, k);
                if (kulunut < MuutosS) return;
                muutos?.Pause();
                muutos = null;
                valmis();
            }).Every(0);
        }

        void KiinnitaLaatikko(float w, float h)
        {
            kortti.style.overflow = Overflow.Hidden;
            kortti.style.maxHeight = StyleKeyword.None;
            kortti.style.maxWidth = StyleKeyword.None;
            kortti.style.width = w;
            kortti.style.height = h;
        }

        // Webin kaistale (USS .mk-matkakirja--pieni) ja kermavalo liukuvat toisiinsa liikkeen mukana: 0 = avattu kortti
        // (kermavalo, kulmat 12 px), 1 = lappu (pergamentti rgba(244, 231, 202, 0,86) ilman kermavaloa, kulmat 6 px).
        static readonly Color Kaistale = new Color(244f / 255f, 231f / 255f, 202f / 255f, 0.86f);

        void Tausta(float lappu)
        {
            kortti.style.backgroundColor = new Color(Kaistale.r, Kaistale.g, Kaistale.b, Kaistale.a * lappu);
            kortti.style.unityBackgroundImageTintColor = new Color(1f, 1f, 1f, 1f - lappu);
            float r = Mathf.Lerp(12f, 6f, lappu);
            kortti.style.borderTopLeftRadius = kortti.style.borderTopRightRadius = kortti.style.borderBottomLeftRadius = kortti.style.borderBottomRightRadius = r;
        }

        void VapautaLaatikko()
        {
            kortti.style.backgroundColor = StyleKeyword.Null;
            kortti.style.unityBackgroundImageTintColor = StyleKeyword.Null;
            kortti.style.borderTopLeftRadius = kortti.style.borderTopRightRadius = kortti.style.borderBottomLeftRadius = kortti.style.borderBottomRightRadius = StyleKeyword.Null;
            kortti.style.overflow = StyleKeyword.Null;
            kortti.style.maxHeight = StyleKeyword.Null;
            kortti.style.maxWidth = StyleKeyword.Null;
            kortti.style.width = StyleKeyword.Null;
            kortti.style.height = StyleKeyword.Null;
        }

        void VapautaLapset()
        {
            foreach (var c in kortti.Children())
            {
                c.style.width = StyleKeyword.Null;
                c.style.flexShrink = StyleKeyword.Null;
                c.style.opacity = StyleKeyword.Null;
            }
        }

        /// <summary>Kesken oleva liike pois ja kortti USS:n varaan (tila ei vaihdu).</summary>
        void LopetaMuutos()
        {
            if (muutos == null) return;
            muutos.Pause();
            muutos = null;
            VapautaLapset();
            VapautaLaatikko();
            Asettele();
        }

        /// <summary>Lapun teksti nousee laatikon asetuttua (120 ms).</summary>
        void NostaLyhyt()
        {
            lyhytNousu?.Pause();
            lyhyt.style.opacity = 0f;
            float alku = Time.unscaledTime;
            lyhytNousu = lyhyt.schedule.Execute(() =>
            {
                float a = Mathf.Clamp01((Time.unscaledTime - alku) / LyhytS);
                lyhyt.style.opacity = a;
                if (a >= 1f) { lyhyt.style.opacity = StyleKeyword.Null; lyhytNousu?.Pause(); }
            }).Every(0);
        }

        /// <summary>
        /// Lapun mitat: edellisen lapun asettelu (sama kaupunki ja pilleri), muuten USS:n mukaan — iPhonen pilleri rahapillerin
        /// levyinen ja 36 pt, muuten nimen levyinen (12,5 px:n teksti, pehmuste 10 + 10 pt, kaiutin 6 + 24 pt) ja 32 pt.
        /// </summary>
        (float W, float H) LapunMitat()
        {
            if (lappuKoko.x > 1f && lappuKoko.y > 1f) return (lappuKoko.x, lappuKoko.y);
            // Webin kaistale (USS .mk-matkakirja--pieni): rivi 1,5 × --pieni-rivi (iPad 12,8 px, puhelin 11,2 px), pehmuste
            // 0,2rem ja 0,5em, kaiutin 18 / 16 px + 5 px.
            float rivi = Puhelin ? 11.2f : 12.8f;
            string teksti = LapunTeksti(merkinta ?? new Merkinta());
            float koko = lyhyt.resolvedStyle.fontSize > 0f ? lyhyt.resolvedStyle.fontSize : rivi;
            float w = lyhyt.MeasureTextSize(teksti, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x * rivi / koko;
            bool kaiutinNakyy = !kaiutin.ClassListContains("mk-matkakirja__piilo");
            float leveys = w + 2f * rivi * 0.5f + (kaiutinNakyy ? (Puhelin ? 21f : 23f) : 0f);
            float katto = kortti.parent != null ? 0.96f * kortti.parent.layout.width : leveys;
            return (Mathf.Min(leveys, katto), 1.5f * rivi + 6.4f);
        }

        /// <summary>Avoimen kortin leveys: edellinen avoin asettelu, muuten USS (340 pt, enintään 62 %, puhelimella 97 %).</summary>
        float AvoimenLeveys()
        {
            if (avoinLeveys > 1f) return avoinLeveys;
            float isa = kortti.parent != null ? kortti.parent.layout.width : 393f;
            return Mathf.Min(340f, (Puhelin ? 0.97f : 0.62f) * isa);
        }

        /// <summary>Avoimen kortin korkeus lasten asettelusta (lopullisessa leveydessään), enintään USS:n 60 % tilasta.</summary>
        float AvoimenKorkeus()
        {
            var s = kortti.resolvedStyle;
            float h = s.paddingTop + s.paddingBottom + s.borderTopWidth + s.borderBottomWidth;
            foreach (var c in kortti.Children())
            {
                if (c.resolvedStyle.display == DisplayStyle.None) continue;
                h += c.layout.height + c.resolvedStyle.marginTop + c.resolvedStyle.marginBottom;
            }
            float katto = kortti.parent != null ? 0.6f * kortti.parent.layout.height : h;
            return Mathf.Min(h, katto);
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
            // Web h2 (font-weight 700): paikka ja aika lihavoituna ruskeana kirjoituskoneella.
            Kirjasimet.Aseta(otsikko, m.PaikkaAika ? Kirjasin.KoneLihava : Kirjasin.Kone);
            kortti.EnableInClassList("mk-matkakirja--puhelin", Puhelin);
            // Lappu: otsikko ja lyhyt paikkarivi (web #fact-voice + .fact-place-lyhyt).
            // Löydös 86/87: luennan ajan lappu on "Ateena, elokuussa 1873", luennon jälkeen pelkkä "Ateena" (merkintä ilman
            // luentaa on heti luettu).
            luettu = !m.Kaiutin;
            PaivitaLyhyt(false);
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
            LopetaMuutos();
            AsetaPieni(TekstitPiilossa);
            // Avaus ja sulku animoiden (omistaja 29.9.2026, Raamattu PR #3602; Ponnahdus = webin arvot); jo näkyvä vain päivittyy.
            if (!nakyvissa) Ponnahdus.Avaa(kortti);
            nakyvissa = true;
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
            {
                Ruudunpaivitys.Herata(0.5f); // lämpö: häivytys täydellä taajuudella
                teksti.experimental.animation.Start(0f, 1f, 450, (e, v) => e.style.opacity = v);
            }
            else teksti.style.opacity = 1f;
            Kirjoita(merkinta.Lihava, merkinta.Teksti);
        }

        bool nakyvissa;

        public void Piilota()
        {
            kirjoitus?.Pause();
            LopetaMuutos();
            if (!nakyvissa) { Ponnahdus.Lopeta(kortti); kortti.style.display = DisplayStyle.None; return; }
            nakyvissa = false;
            Ponnahdus.Sulje(kortti);
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
            // Webin riviväli (.fact-text line-height 1,45, puhelimella 1,35; natiivin fontin oma ~1,14).
            string rivivali = Puhelin ? "<line-height=1.35em>" : "<line-height=1.45em>";
            teksti.text = rivivali + (loput.Length > 0 ? nakyva + (n > 0 ? " " : "") + "<alpha=#00>" + loput : nakyva);
        }

        void Kirjoitettu()
        {
            NaytaLahteet();
            // Löydös 87: ilman kertojan luentaa (kertoja pois) merkintä on "luettu", kun teksti on kirjoitettu loppuun.
            if (!luentaPiilo && !Aanet.KertojaPuhuu && !luettu) { luettu = true; PaivitaLyhyt(true); }
            var k = kirjoitettu;
            kirjoitettu = null;
            try { k?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
        }

        void AsetaPieni(bool p)
        {
            pieni = p;
            kortti.EnableInClassList("mk-matkakirja--pieni", p);
            kortti.EnableInClassList("mk-matkakirja--nimi", p && VainNimi);
            PaivitaPalkkipiilo();
            Asettele();
        }

        static Texture2D kermaValo;

        /// <summary>
        /// Webin kermapaperi (css/styles.css body.pallolauta-paalla .fact-card::before, omistaja 30.9.2026 mallina): pehmeä
        /// soikea valo rgb(247, 238, 214), alfa 0,9 keskeltä (0–30 %), 0,62 (46 %), 0,28 (62 %), 0 (78 %) ellipsin säteestä.
        /// Valo on kortin laatikkoa suurempi (inset −46 % −22 %, farthest-corner) ja kortti leikkaa sen: reunoilla ~0,55,
        /// kulmissa ~0,3, joten kartta kuultaa läpi. Laskettu kortin suhteellisissa koordinaateissa (venyy kortin mukana).
        /// </summary>
        /// <summary>
        /// Webin sRGB-alfa lineaarisen väriavaruuden sekoitukseen (Päätoimittaja 30.9.2026: "webissä kartan nimet näkyvät
        /// tekstin alta, natiivin kermavalo on lähes peittävä"). Unity sekoittaa lineaarisesti, jolloin sama alfa peittää
        /// tumman musteen selvästi enemmän kuin selaimen sRGB-sekoitus: mitattu omistajan kaappauksesta Pariisin merkki
        /// kortin alla alfa 0,70 (web-kaava), natiivissa sama alfa näkyi noin 0,85:nä. Alfa valitaan niin, että kartan
        /// muste (sRGB noin 70/255) kuultaa kerman läpi samalla sävyllä kuin webissä.
        /// </summary>
        static float LineaarinenAlfa(float a)
        {
            if (a <= 0f || QualitySettings.activeColorSpace != ColorSpace.Linear) return a;
            const float muste = 70f / 255f, kerma = 238f / 255f;
            float kohde = Mathf.GammaToLinearSpace(a * kerma + (1f - a) * muste);
            float m = Mathf.GammaToLinearSpace(muste), k = Mathf.GammaToLinearSpace(kerma);
            return Mathf.Clamp01((kohde - m) / (k - m));
        }

        static Texture2D KermaValo
        {
            get
            {
                if (kermaValo != null) return kermaValo;
                const int N = 128;
                kermaValo = new Texture2D(N, N, TextureFormat.RGBA32, false) { name = "matkakirja-kermavalo", wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
                var px = new Color[N * N];
                var vari = new Color(247 / 255f, 238 / 255f, 214 / 255f);
                // ::beforen puolikkaat kortin mitoissa (0,5 + 0,22 ja 0,5 + 0,46), farthest-corner → säde × √2.
                float rx = 0.72f * 1.41421f, ry = 0.96f * 1.41421f;
                for (int y = 0; y < N; y++)
                for (int x = 0; x < N; x++)
                {
                    float dx = ((x + 0.5f) / N - 0.5f) / rx, dy = ((y + 0.5f) / N - 0.5f) / ry;
                    float d = Mathf.Sqrt(dx * dx + dy * dy);
                    float a = d <= 0.30f ? 0.9f : d <= 0.46f ? Mathf.Lerp(0.9f, 0.62f, (d - 0.30f) / 0.16f)
                        : d <= 0.62f ? Mathf.Lerp(0.62f, 0.28f, (d - 0.46f) / 0.16f) : d <= 0.78f ? Mathf.Lerp(0.28f, 0f, (d - 0.62f) / 0.16f) : 0f;
                    px[y * N + x] = new Color(vari.r, vari.g, vari.b, LineaarinenAlfa(a));
                }
                kermaValo.SetPixels(px);
                kermaValo.Apply(false, true);
                return kermaValo;
            }
        }

        /// <summary>
        /// Merkinnän kuvat kortin loppuun heti merkinnän tullessa (web paivitaMatkakirjanPikkukuvat renderFactissa: isoisän
        /// luentakuvat ja Pulun kuvat; Päätoimittaja 30.9.2026, omistajan web-kaappaus Pariisista). Luennan lento laskeutuu
        /// samoihin kuviin (LisaaPikkukuva ei lisää samaa kahdesti).
        /// </summary>
        public void AsetaPikkukuvat(IEnumerable<VirtaKuva> kuvat)
        {
            if (kuvat == null) return;
            foreach (var k in kuvat) LisaaPikkukuva(k);
        }

        /// <summary>Pikkukuva kortin loppuun (webin paivitaMatkakirjanPikkukuvat); sama osoite vain kerran.</summary>
        public void LisaaPikkukuva(VirtaKuva k)
        {
            if (k == null || string.IsNullOrEmpty(k.Osoite)) return;
            foreach (var c in pikkukuvat.Children()) if (c.userData is VirtaKuva v && v.Osoite == k.Osoite) return;
            var el = Rakenne.El("mk-matkakirja__pikkukuva", pikkukuvat);
            // Web .fact-pikkukuva: rotate(-1.4deg), parilliset +1.4deg (valokuvat pöydällä).
            el.style.rotate = new Rotate(pikkukuvat.childCount % 2 == 0 ? 1.4f : -1.4f);
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
                // Tekijä ja lisenssi Commonsista, jos lähteestä puuttuu (web taytaLahderivi fokusvirrassa, #3438).
                string kl = Kuvatekija.Taydenna(k.Lahde, k.Osoite);
                if (!string.IsNullOrEmpty(kl))
                    kuvateksti += (kuvateksti.Length > 0 ? " " : "") + "<size=9.6><color=#8a7a60>" + kl + "</color></size>";
                var teksti = Rakenne.Teksti(kuvateksti, "mk-postikortti__teksti", kortti);
                Kirjasimet.Aseta(teksti, Kirjasin.Kone);
                teksti.style.display = kuvateksti.Length == 0 ? DisplayStyle.None : DisplayStyle.Flex;
                if (pino.Count > 1) Kirjasimet.Aseta(Rakenne.Teksti($"{i + 1}/{pino.Count}", "mk-postikortti__laskuri", kortti), Kirjasin.Kone);
                kortit.Add(kortti);
            }
            Jarjesta();
            // Avaus ja sulku animoiden (omistaja 29.9.2026): pino kasvaa napautetun pikkukuvan kohdalta (Ponnahdus).
            Ponnahdus.Avaa(pinoEl);
        }

        public static bool Auki => verho != null;

        public static void Sulje()
        {
            if (verho == null) return;
            var vanha = verho;
            verho = null;
            kortit.Clear();
            // Sulkeutuva pino ei ota napautuksia; se poistuu, kun liike on valmis (uusi pino voi jo avautua päälle).
            vanha.UnregisterCallback<PointerDownEvent>(Napautus);
            vanha.pickingMode = PickingMode.Ignore;
            if (vanha.childCount == 0) { vanha.RemoveFromHierarchy(); return; }
            Ponnahdus.Sulje(vanha[0], vanha.RemoveFromHierarchy);
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
