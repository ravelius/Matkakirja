// PULUN KESKUSTELU (Natiivi-UI, chat): webin js/pollo.js -paneeli natiivina.
//
// Avautuu pulun napautuksesta, sulkeutuu napautuksesta paneelin ohi tai pulun
// uudesta napautuksesta (webissä ei yläpalkkia eikä ruksia, omistaja 12.8.2026).
// Paperi #f5f0e2, muste #211d18. Viestivirta: Livian vastaukset Iowan Old
// Stylella (rivinvaihdot säilyvät), pelaajan kysymykset kirjoituskonefontilla
// pillerissä. Ensimmäisellä avauksella tervehdys (kaanon, TERVEHDYS_* webissä,
// ydin lihavoituna). Odotusrivi Livian omilla "mietinnöillä" (LIVIAN_MIETINNAT,
// pitkä versio 6 s jälkeen), jatkokysymykset (jatkot, enintään 2) ja
// ehdotukset avattaessa (tehtava "ehdotukset", enintään 2) siruina virrassa.
//
// Pyyntö pollo-workerille kuten webissä (ei striimiä): POST {tehtava:"vastaus",
// kysymys, konteksti (yksi merkkijono ≤ 5000), historia (6 viimeistä onnistunutta),
// kehys aloitus|jatko|puhuttelu}; natiivi tunnistautuu x-matkakirja-natiivi +
// User-Agent (Puhe.cs, PR #2956). 429 → workerin oma viesti (päivä-/kuukausiraja),
// ei uusintaa. Sijaintikysymys ("missä …") ja vastauksen paikka → kamera lentää
// paikkaan (webin pulu-paikka) ja "‹ Palaa" vie takaisin.
// Kaiutin (webin .pollo-kaiutin, pysyvä kytkin) lukee vastaukset Puhe.Lue(…, "pollo").
// PUHEKESKUSTELU (web #3546, omistaja 28.9.2026 Fablen kautta): saneltu kysymys on puhevuoro, jonka vastaus
// luetaan aina kaiutinvivusta riippumatta; sanelun tilarivi kertoo Mietin → Puhun → tyhjä, ja mikki on
// vuoron ajan "Hiljennä Pulu".
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class PuluChat
    {
        public const string Palvelin = "https://matkakirja-pollo.samireivinen.workers.dev";
        const int HistoriaKatto = 6, KontekstiKatto = 5000, KysymysKatto = 300;
        const string AaniAvain = "matkakirja-pollo-aani";

        static string TervehdysAlku => Kieli.T("ui.pulu.tervehdys-alku");
        static string TervehdysYdin => Kieli.T("ui.pulu.tervehdys-ydin");
        static string TervehdysLoppu => Kieli.T("ui.pulu.tervehdys-loppu");
        static string EiSaanut => Kieli.T("ui.pulu.ei-saanut");
        static string EiTullut => Kieli.T("ui.pulu.ei-tullut");

        static readonly string[] Yleiset =
        {
            "Hetki, pululla pulla suussa..", "Odotas, sulka jäi mustepulloon..", "Kaivan sähkeitä, siellä oli jotain tästä..",
            "Hetkinen, lento vastatuuleen..", "Annas kun mietin. Tai ei — kysyn joltain viisaammalta..", "Odota, järjestän ajatukseni oksalle..",
            "Muistan lukeneeni tästä. Mistäs se nyt olikaan..", "Setä tiesi tästä jotain. Mietin hetken..", "Pieni hetki, untuvia sähkekoneessa..",
            "Katsotaas. Nokka kirjaan, siipi kartalle..", "Hetki vain, kynä on väärässä siivessä..", "Odotas, luen omat muistiinpanoni. Käsiala on kanan..",
            "Hetkinen, kirjastonhoitaja on pöllö ja pöllö nukkuu päivisin..", "Pieni hetki, arkiston ovi on jumissa..", "Hetki, tarkistan asian kahdesta paikasta..",
            "Odotas, pudotin muistiinpanot katolle..", "Pieni hetki, tästä on jossain sähke..", "Nokka kiinni, minä ajattelen..",
            "Hetkinen, siivet ovat vielä märät sateesta..", "Odota, tämä vaatii kaksi kierrosta tornin ympäri..", "Annas kun kaivan tämän muistista. Siellä on ruuhkaa..",
            "Pieni hetki, pulla ensin ja tieto sitten..", "Hetki vain, kartta on väärinpäin..", "Odotas, luen sen pienellä painetun kohdan..",
            "Katsotaas, mistä tämä lankakerä alkaa..", "Hetkinen, kysyn asiaa oikealta linnulta..", "Pieni hetki, arkiston hyllyt ovat minua korkeammalla..",
            "Odota, tässä on kaksi vastausta ja minä valitsen paremman..", "Hetki, murut pois kirjan päältä..", "Annas kun istun alas. Tämä on istumakysymys..",
            "Pieni hetki, sähkekone rätisee taas..", "Odotas, muistin juuri jotain ja unohdin sen..", "Hetkinen, tämä osui johonkin minkä olen itse nähnyt..",
            "Katson tästä ikkunasta, näkyisikö vastaus..", "Pieni hetki, järjestän faktat riviin..", "Hetki, tuuli vei yhden sivun..",
        };
        /// <summary>Web LIVIAN_MIETINNAT.vastaus (myös sähketehtävän odotusrivi).</summary>
        internal static readonly string[] Vastausmietinnat =
        {
            "Hyvä kysymys. Käyn kysymässä pöllöltä, pieni hetki..", "Tää on pöllön heiniä. Vien viestin, palaan pian..",
            "Minä tiedän kenelle tämä kuuluu. Käyn lentämässä..", "Otan tämän kysymyksen mukaani. Kaksi kaartoa ja palaan..",
            "Tämän minä tiedän. Tai tiedän kenen luota se löytyy..", "Hyvä että kysyit. Käyn hakemassa tarkan luvun..",
            "Tästä on kirjoitettu. Etsin mistä..", "Sopiva kysymys minulle. Hetki, tarkistan etten muista väärin..",
            "Tuohon on vastaus. Se on vain hieman kaukana..",
        };
        static readonly string[] Pitkat =
        {
            "No nyt kesti. Pöllöllä on pitkä puheenvuoro..", "Vieläkin menossa. Vastatuuli oli luvattua kovempi..",
            "Kohta tulee. Arkistossa oli enemmän pölyä kuin muistin..", "Kestää vielä. Löysin matkalta kaksi mielenkiintoista sivupolkua..",
            "Pian. Sain vastauksen, mutta se oli väärään kysymykseen..", "Vielä hetki. Tämä on isompi asia kuin miltä se näytti..",
            "Anteeksi viive. Pöllö puhuu hitaasti ja pitkästi..",
        };

        static readonly Regex Paikkakysymys = new Regex(@"\b(missä|mihin|mistä|minne)\b|kartalla|kartalle|kartalta|sijaits|sijainti|paikanna", RegexOptions.IgnoreCase);
        static readonly Regex Puhuttelu = new Regex(@"\b(pulu|pöllö|pollo|livia|columba(\s+livia)?|kyyhky)\b", RegexOptions.IgnoreCase);

        readonly UiKerros kerros;
        readonly Pulu pulu;
        readonly VisualElement sulkija, paneeli;
        readonly Button pinNappi;
        bool pienennetaan;
        const string PinOmistaja = "pulu";
        bool PinNakyvissa => Auki && Pinnaus.Nykyinen != null && Pinnaus.Nykyinen.Omistaja == PinOmistaja && !Pinnaus.Pienena;

        /// <summary>
        /// CHATIN PIN (omistaja 6.10.2026: "kun chatissa painetaan pin päälle, chat pitää nousta ruudun yläreunaan ja korvata siellä
        /// mahdollisesti oleva pinnattu nosto. chat ikkuna jää sinne vielä kokonaisena näkyviin, mutta jos pelaaja sitten liikuttaa
        /// karttaa tms. niin chat ikkuna pienenee yhdeksi riviksi"): pinnattu chat asettuu yläreunaan (Asettele), pinnattu nosto
        /// sulkeutuu sen tieltä (sen Pienenna), ja kartan liike pienentää chatin PINNATTU PALKKI -riviksi (Pinnaus).
        /// </summary>
        void VaihdaPin()
        {
            var vanha = Pinnaus.Nykyinen;
            Pinnaus.Vaihda(new Pinnaus.Kohde
            {
                Omistaja = PinOmistaja, Otsikko = Kieli.T("ui.pulu.otsikko"),
                Pienenna = () => { if (Auki) { pienennetaan = true; Sulje(); pienennetaan = false; } },
                Palauta = () => Avaa(false),
                Irti = PaivitaPin,
            });
            if (Pinnaus.Nykyinen?.Omistaja != PinOmistaja) return;
            if (vanha != null && vanha.Omistaja != PinOmistaja) vanha.Pienenna?.Invoke();
            // Kysy-napista avattu nosto on yleensä yhä auki yläreunassa (sen pinnaus päättyy Pulun luennan alkaessa): chat korvaa sen.
            var nosto = UiNakymat.Olemassa ? UiNakymat.Hae().Nostokortti : null;
            if (nosto != null && nosto.Auki) nosto.Sulje();
        }

        bool ylhaalla;

        /// <summary>Pinnattuna sulkija ja syötelukko pois: kartta liikkuu chatin ohi (pienentää sen palkiksi).</summary>
        void PaivitaPin()
        {
            bool p = PinNakyvissa;
            if (Auki && p != ylhaalla) Asettele();
            pinNappi.EnableInClassList("mk-valittu", p);
            pinNappi.tooltip = Kieli.T(p ? "ui.nosto.poista-pinnaus" : "ui.nosto.pinnaa");
            sulkija.pickingMode = p ? PickingMode.Ignore : PickingMode.Position;
            if (!Auki) return;
            if (p) SyoteLukko.Vapauta(this); else SyoteLukko.Esta(this);
        }
        readonly ScrollView virta;
        readonly TextField kentta;
        readonly Button palaa;
        /// <summary>Ylärivin lukija (KortinLukija, Pulun ääni) ja sen valikon auto-luennan kytkimen tilateksti.</summary>
        readonly KortinLukija lukija;
        Label autolukuTila;
        readonly List<(string Rooli, string Teksti)> historia = new List<(string, string)>();
        readonly System.Random arpa = new System.Random();
        bool tervehditty, kysyy;
        /// <summary>Löydös 177: Uusi peli kasvattaa; kesken ollut vastaus ei kirjoitu uuden pelin chattiin.</summary>
        int sukupolvi;
        string viimeMietinta;
        int ehdotusPoletti, kuvaPoletti;
        Button naytaKuplat;
        readonly Kuvasuurennos suurennos;
        (double Lat, double Lon, double Korkeus)? paluupaikka;

        public bool Auki { get; private set; }
        /// <summary>Asettelutesti: chatin paneeli ja pinnaus (sama kuin pin-napin painallus).</summary>
        public VisualElement TestiPaneeli => paneeli;
        public void TestiPinnaa() => VaihdaPin();

        /// <summary>
        /// LINSSITILA (omistaja 30.9.2026 klo 23.5x, astronautin kamera: "pululla saisi olla myös tässä striimiluenta. tee
        /// pululle aina samat napit kaikkialle peliin"). Linssin minipulu avaa TÄMÄN chatin (MinipulunKortti on sovitin):
        /// samat napit samassa järjestyksessä (puhekupla, kynä | ≡, kaiutin; alarivi näppäimistö, mikki), vain teema
        /// vaihtuu (mk-chat--linssi: tumma lasi, vihreä reuna) ja paikka on minipulun yläpuolella. Kohteen valmiit
        /// kysymykset näkyvät sirunappeina ja kulkevat mallille kuten vapaa kysymys (web vastaaKysymykseen 17.9.).
        /// </summary>
        public bool Linssissa { get; private set; }
        Func<Rect> linssiAnkkuri;
        string linssiTunnus;
        bool avataanLinssiin, linssiAuki;

        /// <param name="teema">PULU-pohjan linssiteema (tyylikirja pohjat.PULU, web #3831): "lasi-avaruus" (ISS, satelliitti,
        /// astronautin kamera; oletus) tai "lasi" (lämmin lasi, esim. Sokrates). Kartalla paperi (Avaa).</param>
        public void AvaaLinssissa(Func<Rect> ankkuri, string tunnus, IReadOnlyList<string> valmiit, string teema = "lasi-avaruus")
        {
            linssiAnkkuri = ankkuri;
            if (!Linssissa)
            {
                Linssissa = true;
                var t = teema == "lasi" ? Tyylikirja.Lasi : Tyylikirja.LasiAvaruus;
                paneeli.AddToClassList("mk-chat--linssi");
                paneeli.EnableInClassList("mk-chat--lasi", teema == "lasi"); // lämmin lasi: Pohjat/pulu.uss
                // Paperiarkki (Kuviot.AsetaArkki) asettaa taustan inline-tyylinä, joka ohittaa USS:n: lasiteema myös inlinenä
                // (1.10. simulaattorikuva: vaalea teksti paperilla).
                paneeli.style.backgroundImage = StyleKeyword.None;
                paneeli.style.backgroundColor = (Color)t.Pinta;
                var reuna = (Color)t.Reunus;
                paneeli.style.borderTopColor = reuna; paneeli.style.borderBottomColor = reuna;
                paneeli.style.borderLeftColor = reuna; paneeli.style.borderRightColor = reuna;
            }
            linssiTunnus = tunnus;
            Paikka("linssi:" + tunnus);
            linssiAuki = UiNakymat.Olemassa && UiNakymat.Hae().Linssit?.Auki != null;
            avataanLinssiin = true;
            if (!Auki) Avaa(false);
            avataanLinssiin = false;
            // Napeissa vain nykyisen kohteen kysymykset (Päätoimittaja 1.10.: kartan jatkot ja ehdotukset näkyivät Etnan
            // rinnalla). Historia jää vieritettäväksi yläpuolelle; uudet napit ovat lopussa, ja virta vierii niihin.
            PoistaSirut();
            NaytaKohteenValmiit(valmiit);
            // Astronautin kuva auki (juna 147, simu 6.10. 01.2x: linssin yleiset valmiit peittivät kuvan sirut): kuvan omat
            // sirut workerilta (kuva-kenttä, #4038), jos kohteella ei ole omia valmiita kysymyksiä.
            string kuva = KuvaKentta();
            if ((valmiit == null || valmiit.Count == 0) && kuva.Length > 0) { edellinenKuva = kuva; HaeEhdotukset(); }
            // Ilman kohteen kysymyksiä linssin tilan valmiit kysymykset (astronautin kamera 4.10.2026: pallo, kuvat, ohjaamo),
            // muuten avaus silti uusimpaan viestiin.
            else if ((valmiit == null || valmiit.Count == 0) && !NaytaLinssinValmiit())
                virta.schedule.Execute(() => virta.scrollOffset = new Vector2(0f, Mathf.Max(0f, virta.contentContainer.layout.height - virta.contentViewport.layout.height))).ExecuteLater(30);
            Asettele();
        }

        void PoistuLinssista()
        {
            if (!Linssissa) return;
            Linssissa = false;
            linssiAnkkuri = null;
            paneeli.RemoveFromClassList("mk-chat--linssi");
            paneeli.RemoveFromClassList("mk-chat--lasi");
            paneeli.style.borderTopColor = StyleKeyword.Null; paneeli.style.borderBottomColor = StyleKeyword.Null;
            paneeli.style.borderLeftColor = StyleKeyword.Null; paneeli.style.borderRightColor = StyleKeyword.Null;
            Kuviot.AsetaArkki(paneeli);
            foreach (var e in sirualue.Query(className: "mk-chat__kohdevalmiit").ToList()) e.RemoveFromHierarchy();
        }

        void NaytaKohteenValmiit(IReadOnlyList<string> valmiit, Aihe aihe = null)
        {
            foreach (var e in sirualue.Query(className: "mk-chat__kohdevalmiit").ToList()) e.RemoveFromHierarchy();
            if (valmiit == null || valmiit.Count == 0) return;
            var ryhma = Rakenne.El("mk-chat__sirut mk-chat__kohdevalmiit", sirualue, PickingMode.Ignore);
            // Avatessa tasan kaksi kysymystä (omistaja 16.4x); vastauksen jälkeen workerin kaksi jatkoa korvaavat ne.
            foreach (var q in valmiit.Take(2))
            {
                string kysymys = q;
                Kirjasimet.Aseta(Rakenne.Nappi(kysymys, "mk-chat__siru", () => Kysy(kysymys, aihe: aihe), ryhma), Kirjasin.Kone);
            }
            Vierita(VirranLoppu());
        }

        /// <summary>Pulun äänikeskustelun koenappi (vain kehittäjätilassa; UI/Pulu/PuluRealtimeNappi.cs).</summary>
        readonly PuluRealtimeNappi realtime;

        public PuluChat(UiKerros kerros, Pulu pulu)
        {
            this.kerros = kerros;
            this.pulu = pulu;
            Kuvanakyma.KuvaVaihtui += () => UiKerros.PaaSaikeessa(KuvaVaihtui);
            // Pulun omalla kerroksella: se nousee lehden päälle lehden ajaksi (UiNakymat.PulunKerros).
            var juuri = kerros.Juuri(Pulu.Kerros);
            sulkija = Rakenne.El("mk-sulkija", juuri);
            sulkija.style.display = DisplayStyle.None;
            sulkija.RegisterCallback<PointerDownEvent>(e => { Sulje(); e.StopPropagation(); });

            paneeli = Rakenne.El("mk-chat", juuri);
            // Löydös 91 (web .pollo-paneeli: --pollo-paperi + --paper-noise multiply): paperikohina kuten lippukortissa.
            Kuviot.AsetaArkki(paneeli);
            paneeli.style.display = DisplayStyle.None;
            // Ylärivi (omistaja 29.9.2026: "pulun chattiin pitää saada samat äänikontrollit ja asetusten säädöt kuin
            // nostoissa ... chat ikkunan yläreunaan ... näytä puhekuplat sekä ehdota sisältöä napit ikoneiksi").
            // Vasemmalla kuvakkeet (teksti saavutettavuusnimenä), oikealla nostokortin lukijarivi [valikko][kaiutin].
            var ylarivi = Rakenne.El("mk-chat__ylarivi", paneeli, PickingMode.Ignore);
            naytaKuplat = Rakenne.Nappi(null, "mk-chat__ikoninappi", () => { Sulje(); pulu.NaytaViimeisinKupla(); }, ylarivi, Ikonit.Puhekupla);
            naytaKuplat.tooltip = Kieli.T("ui.pulu.nayta-kuplat");
            // "Ehdota sisältöä" (web .pollo-ehdota): chat väistyy ja ehdotuslomake aukeaa tilanteen kanssa.
            var ehdota = Rakenne.Nappi(null, "mk-chat__ikoninappi", EhdotaSisaltoa, ylarivi, Ikonit.Kyna);
            ehdota.tooltip = Kieli.T("ui.pulu.ehdota-sisaltoa");
            // PIN-KUVAKE (omistaja 5.10.2026 klo 23.3x): samassa koossa kuin rivin muut kuvakkeet.
            pinNappi = Rakenne.Nappi(null, "mk-chat__ikoninappi mk-chat__pin", VaihdaPin, ylarivi, Ikonit.Viiva["pin"]);
            pinNappi.tooltip = Kieli.T("ui.nosto.pinnaa");
            Pinnaus.Muuttui += PaivitaPin;
            Rakenne.El("mk-chat__ylarivi-vali", ylarivi, PickingMode.Ignore);
            // Nostokortin lukija Pulun äänellä: kaiutin lukee viimeisimmän vastauksen (keskeytys, jatko, VU), valikossa
            // kappaleet, kelaus ja nopeus. Ääni-valitsimen paikalla auto-luennan kytkin (entinen alarivin kaiutinvipu).
            lukija = new KortinLukija(ylarivi, Kieli.T("ui.pulu.kuuntele-vastaus"), "mk-chat__lukija", saatimet: true,
                rajaus: () => paneeli.worldBound, persoona: "pollo", aaniRivi: RakennaAutoluku);
            // PULU-CHAT-POHJA (omistaja 5.10.2026 klo 16.4x–16.5x): kaiutin on kaikkialla kaksitilainen kytkin: Auto (kaiutin, jokainen
            // vastaus luetaan) tai ei luentaa (kaiutin ja yksi vino viiva). Tila on yhteinen koko pelissä ja tallentuu (AaniAvain).
            // Lukija jää taustalle luennan välineeksi; sen luku/tauko-nappia ja ≡-valikkoa ei näytetä chatissa.
            lukija.Juuri.style.display = DisplayStyle.None;
            // PULUN LUENNAN TAUKO (omistaja 6.10.2026: "pulun chattiin tarvitaan myös pause nappi pulun luennalle"): sama II/▶ kuin
            // oppaassa ja pinnatussa palkissa, kaiuttimen vieressä; näkyy vain, kun Pulun oma luenta soi tai on tauolla.
            taukoNappi = Rakenne.Nappi(null, "mk-chat__ikoninappi mk-chat__tauko", VaihdaTauko, ylarivi, Ikonit.Tauko);
            taukoNappi.tooltip = Kieli.T("ui.yleinen.tauko");
            taukoNappi.style.display = DisplayStyle.None;
            paneeli.schedule.Execute(PaivitaTauko).Every(50);
            kaiutinNappi = Rakenne.Nappi(null, "mk-chat__ikoninappi mk-chat__kaiutin", VaihdaAani, ylarivi, AaniPaalla ? Ikonit.Viiva["kaiutin"] : Ikonit.Viiva["kaiutin-pois"]);
            PaivitaKaiutin();
            // Pulu lukee jo vastausta automaattisesti (virkevirta): kaiutin keskeyttää ja jatkaa sitä eikä aloita alusta.
            lukija.Nappi.RegisterCallback<PointerDownEvent>(e =>
            {
                if (!OmaLuentaKaynnissa) return;
                var p = Puhe.Instanssi;
                if (p.Tauolla) p.Jatka(); else p.Tauko();
                lukija.Nappi.EnableInClassList("mk-lukija--keskeytetty", p.Tauolla);
                e.StopImmediatePropagation();
            }, TrickleDown.TrickleDown);
            virta = new ScrollView(ScrollViewMode.Vertical);
            virta.AddToClassList("mk-chat__virta");
            virta.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            virta.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            paneeli.Add(virta);
            // KYSYMYSSIRUT KIINNI (Päätoimittaja 5.10.2026 klo 17.2x: pitkän vastauksen jälkeen jatkot jäivät näkymän alle): sirut omaan
            // alueeseensa vierityksen ulkopuolelle syöttökentän yläpuolelle, aina näkyviin; vastauksen alku jää luettavaksi.
            sirualue = Rakenne.El("mk-chat__sirualue", paneeli, PickingMode.Ignore);

            // Syöte (web rakennaSyote): sanelun tilarivi, kirjoitusrivi (kenttä + →) ja matala nappirivi
            // (näppäimistö 1, mikrofoni 2; kaiutin siirtyi ylärivin lukijaan 29.9.2026). Sanelutilassa kirjoitusrivi on piilossa.
            var syote = Rakenne.El("mk-chat__syote", paneeli, PickingMode.Ignore);
            saneluTila = Rakenne.Teksti("", "mk-chat__sanelutila", syote);
            var rivi = Rakenne.El("mk-chat__rivi", syote, PickingMode.Ignore);
            lomake = rivi;
            kentta = new TextField { maxLength = KysymysKatto };
            kentta.AddToClassList("mk-chat__kentta");
            kentta.textEdition.placeholder = Kieli.T("ui.pulu.kysy-pululta");
            kentta.RegisterCallback<KeyDownEvent>(e => { if (e.keyCode == KeyCode.Return || e.keyCode == KeyCode.KeypadEnter) { Kysy(kentta.value); e.StopPropagation(); } });
            // iOS (LS1:n todistusajo 6.10., sama vika kuin oppaan rivissä): järjestelmän oma syöttörivi (✓/×) pois, ja näppäimistön
            // Valmis lähettää kuten Return (siirtymä Valmiiksi, ettei kesken vastauksen jäänyt teksti lähde myöhemmin uudelleen).
            kentta.textEdition.hideMobileInput = true;
            var nappaimistoTila = TouchScreenKeyboard.Status.Visible;
            kentta.schedule.Execute(() =>
            {
                var k = kentta.textEdition.touchScreenKeyboard;
                var tila = k != null ? k.status : TouchScreenKeyboard.Status.Visible;
                if (tila == TouchScreenKeyboard.Status.Done && nappaimistoTila != TouchScreenKeyboard.Status.Done) Kysy(kentta.value);
                nappaimistoTila = tila;
            }).Every(100);
            rivi.Add(kentta);
            var laheta = Rakenne.Nappi(null, "mk-chat__laheta", () => Kysy(kentta.value), rivi, Ikonit.Nuoli);
            laheta.tooltip = Kieli.T("ui.pulu.laheta");
            var nappirivi = Rakenne.El("mk-chat__nappirivi", syote, PickingMode.Ignore);
            var kirjoita = Rakenne.Nappi(null, "mk-chat__nappula mk-chat__kirjoita", () => VaihdaTilaan(false, kohdista: true), nappirivi, NappaimistoIkoni);
            kirjoita.tooltip = Kieli.T("ui.pulu.kirjoita-kysymys");
            mikki = Rakenne.Nappi(null, "mk-chat__nappula mk-chat__mikki", VaihdaSanelu, nappirivi);
            mikkiIkoni = Rakenne.Ikoni(MikkiIkoni, "mk-ikoni", mikki);
            lopetaIkoni = Rakenne.Ikoni(PysaytysIkoni, "mk-ikoni", mikki);
            lopetaTeksti = Rakenne.Teksti(Kieli.T("ui.pulu.lopeta"), "mk-chat__mikkiteksti", mikki);
            // Puhu Pululle alarivillä näppäimistön ja mikrofonin rinnalla samalla tyylillä (omistaja 2.10.2026 klo 13.53: "puhu pululle
            // nappi pitäisi olla samalla rivillä kahden alimmaisen napin kanssa samalla tyylillä"; web #3849).
            realtime = new PuluRealtimeNappi(nappirivi, Viesti, () => Konteksti(), LopetaSanelu);
            MerkitseMikki(false);
            sanelussa = Sanelu.Saatavilla; // web: tila = saneluTuettu() ? 'sanelu' : 'kirjoitus'
            NaytaSyote();
            AsetaSaneluTila(null);
            // Web onaudiostart / sanelu-alkoi: mikrofoni oikeasti auki.
            Sanelu.MikrofoniAuki += () => { if (kuuntelee && saneluTila.text == SaneluKaynnistyy) AsetaSaneluTila(SaneluKuuntelee); };
            Kirjasimet.Aseta(paneeli, Kirjasin.Luku);
            Kirjasimet.Aseta(rivi, Kirjasin.Kone);
            Kirjasimet.Aseta(nappirivi, Kirjasin.Kone);

            // Webin "Palaa" kartan oikeassa yläkulmassa lennon jälkeen.
            palaa = Rakenne.Nappi("", "mk-chat__palaa", Palaa, kerros.Turva(UiKerros.Tilarivi));
            palaa.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(palaa, Kirjasin.Kone);

            suurennos = new Kuvasuurennos(juuri);
            // Näppäimistö (Mac/iPad, Nappaimisto): Esc sulkee ensin chatin kuvapopupin, sitten chatin, ei samalla
            // painalluksella linssiä tai korttia sen alla (web: Esc sulkee päällimmäisen); ↑ ↓ vierittävät keskustelua.
            // Kuvasuurennos (100) on tämän (90) edellä.
            Nappaimisto.Rekisteroi("pulu-chat", 90, () => Auki, null,
                d => virta.scrollOffset = new Vector2(0f, Mathf.Max(0f, virta.scrollOffset.y + d * 80f)),
                () => { if (KuvakorttiAuki) kuvakortti.Sulje(); else Sulje(); });
            kerros.TurvaMuuttui += Asettele;
            // Linssi sulkeutui chatin ollessa linssitilassa: chat sulkeutuu linssin mukana (ei jää vihreänä kartalle).
            paneeli.schedule.Execute(() =>
            {
                if (Linssissa && Auki && linssiAuki && UiNakymat.Olemassa && UiNakymat.Hae().Linssit?.Auki == null) Sulje();
                // Linssi (esim. linna) avautui kartan chatin ollessa auki: chat sulkeutuu, ettei se jää linnan päälle eikä sen
                // napautus valu linnanäkymään (Natiivisepän löydös juna 142e: chat Berliinistä linnan päällä avasi Muurinharjan).
                var nyt = UiNakymat.Olemassa ? UiNakymat.Hae().Linssit?.Auki : null;
                if (Auki && !Linssissa && nyt != null && !ReferenceEquals(nyt, linssiAvatessa)) { Debug.Log("MATKAKIRJA ui chat: linssi avautui, chat kiinni"); Sulje(); }
            }).Every(400);
            Asettele();
        }

        /// <summary>Ylärivin "Ehdota sisältöä" (myös testikomento ui chat ehdota): chat väistyy, lomake auki.</summary>
        public void EhdotaSisaltoa()
        {
            Debug.Log("MATKAKIRJA ui chat: Ehdota sisältöä");
            if (!UiNakymat.Olemassa) return;
            Sulje();
            UiNakymat.Hae().Palaute.Avaa();
        }

        float korkeus = -1f;

        /// <summary>
        /// Web livianChatAsettelu (js/livia-chat-tila.js, pariteetti #29): chat jättää oikeaan alakulmaan tilan pulun
        /// suurimmalle ilmeelle (88 × 104, lehdessä 72 %). Oikea reuna max(42, turva + 24) ja ala turva + 20 ruudun
        /// reunoista; paneeli päättyy 12 pt ilmeen oikeaa reunaa aiemmin ja 6 pt sen yläpuolelle, leveys enintään 384,
        /// yläraja max(96, turva + 12, ylärivin ala + 12), korkeus enintään 640 ja 68 % ruudusta. Matalalla ruudulla
        /// (< 480) paneeli on ilmeen vasemmalla puolella alareunaan asti.
        /// </summary>
        void Asettele()
        {
            var r = kerros.Reunat(UiKerros.Valikot);
            if (Linssissa && AsetteleLinssiin(r)) return;
            palaa.style.top = Ylapalkki.Varaus + 56;
            var koko = paneeli.parent?.layout ?? default;
            float w = koko.width, h = koko.height;
            if (float.IsNaN(w) || float.IsNaN(h) || w <= 0 || h <= 0) { paneeli.schedule.Execute(Asettele); return; }
            bool sivulla = h < 480f;
            float oikea = w - Mathf.Max(sivulla ? 24f : 42f, r.z + 24f), ala = h - r.w - 20f;
            bool lehti = UiNakymat.Olemassa && UiNakymat.Hae().Lehti?.Auki == true;
            float ilmeYla = ala - 104f * (lehti ? 0.72f : 1f), ilmeVasen = oikea - 88f;
            float pOikea = sivulla ? ilmeVasen - 6f : oikea - 12f;
            float pAla = sivulla ? ala : ilmeYla - 6f;
            float pYla = Mathf.Max(Mathf.Max(sivulla ? 12f : 96f, r.y + 12f), sivulla ? 0f : r.y + Ylapalkki.Varaus + 12f);
            float pVasen = Mathf.Max(r.x + 12f, pOikea - 384f);
            korkeus = Mathf.Max(0f, Mathf.Min(640f, sivulla ? 640f : h * 0.68f, pAla - pYla));
            // Pinnattu chat yläreunaan (omistaja 6.10.2026): sama leveys ja korkeus, yläreuna yläpalkin alle.
            ylhaalla = PinNakyvissa;
            if (ylhaalla && !sivulla) pAla = pYla + korkeus;
            var st = paneeli.style;
            st.left = pVasen;
            st.right = StyleKeyword.Auto;
            st.width = Mathf.Max(0f, pOikea - pVasen);
            // Pinnattuna ankkuri yläreunaan (asettelutesti 9.10.2026 23.11, Päätoimittaja): alareunasta ankkuroitu sisällön mittainen
            // chat jäi varauksen pohjalle (iPhone pysty y 521 ennen ja jälkeen pinnauksen).
            if (ylhaalla && !sivulla) { st.top = pYla; st.bottom = StyleKeyword.Auto; }
            else { st.top = StyleKeyword.Null; st.bottom = h - pAla; }
            st.minHeight = 0f;
            st.maxHeight = korkeus;
            AsetaKorkeus();
        }

        const float LinssiVahKorkeus = 160f;

        /// <summary>Linssitila: paneelin oikea reuna minipulun oikeaan reunaan, alareuna 8 pt minipulun yläpuolelle; alle
        /// LinssiVahKorkeus tilaa ankkurin yläpuolella → false (tavallinen asettelu).</summary>
        bool AsetteleLinssiin(Vector4 r)
        {
            var par = paneeli.parent;
            var a = linssiAnkkuri?.Invoke() ?? default;
            var koko = par?.layout ?? default;
            if (par == null || a.width <= 0 || float.IsNaN(koko.width) || koko.width <= 0) return false;
            var l = par.WorldToLocal(a);
            float ala = l.yMin - 8f, yla = Mathf.Max(r.y + 12f, 12f);
            // Yläreunan ankkuri (oppaan ☰ iPhonen vaakatilassa, asettelutesti 10.10.2026): yläpuolella ei tilaa, ylärivin kuvakkeet
            // jäivät ruudun yli (y −14) → tavallinen chat-asettelu (Päätoimittaja 10.10.2026).
            if (ala - yla < LinssiVahKorkeus) return false;
            // Vaakasuunnassa turva-alueen sisään (sivujen sensorialueet iPhonen vaakatilassa), 12 pt reunasta.
            float vasen = r.x + 12f, oikea = koko.width - r.z - 12f;
            float lev = Mathf.Min(360f, Mathf.Max(0f, oikea - vasen));
            korkeus = Mathf.Max(0f, Mathf.Min(520f, ala - yla));
            var st = paneeli.style;
            st.left = Mathf.Clamp(l.xMax - lev, vasen, Mathf.Max(vasen, oikea - lev));
            st.right = StyleKeyword.Auto;
            st.width = lev;
            st.bottom = koko.height - ala;
            st.minHeight = 0f;
            st.maxHeight = korkeus;
            AsetaKorkeus();
            return true;
        }

        /// <summary>Tuore keskustelu sisällön mittainen (web .livia-chat-tila.pollo-alku height auto), muuten täysi korkeus.</summary>
        void Alku(bool alku)
        {
            paneeli.EnableInClassList("mk-chat--alku", alku);
            AsetaKorkeus();
        }

        void AsetaKorkeus()
        {
            if (korkeus < 0f) return;
            paneeli.style.height = matala || paneeli.ClassListContains("mk-chat--alku") ? new StyleLength(StyleKeyword.Auto) : korkeus;
        }

        // --- avaus ja sulkeminen -------------------------------------------------

        public void Vaihda() { if (Auki) Sulje(); else Avaa(); }

        public void Avaa()
        {
            AsetaMatala(false);
            var lk = LinssiKysymykset.Nykyinen();
            Paikka(lk != null ? "linssi:" + lk.Avain : "kartta");
            Avaa(true);
        }

        /// <summary>
        /// KESKUSTELU PAIKOITTAIN (Päätoimittaja 5.10.2026 klo 17.2x: maakuntakortti näytti edellisen ISS-keskustelun vastauksen):
        /// uudessa paikassa (eri linssi, kohde tai kortti) chat alkaa puhtaana kyseisen paikan avauksella; saman paikan uudelleenavaus
        /// jatkaa samaa keskustelua. Kesken olevaa vastausta ei katkaista.
        /// </summary>
        void Paikka(string uusi)
        {
            if (uusi == paikka) return;
            bool vaihtuu = paikka != null && !kysyy;
            Debug.Log($"MATKAKIRJA ui chat: paikka {paikka ?? "-"} → {uusi}" + (vaihtuu ? " (uusi keskustelu)" : ""));
            if (kysyy) return;   // vastaus tulossa: paikka vaihtuu seuraavalla avauksella
            paikka = uusi;
            if (!vaihtuu) return;
            virta.Clear();
            sirualue.Clear();
            historia.Clear();
            keskustelunAihe = null;
            valmisKohta = null;
            valmisPaketti = null;
            lukija.Vaihtui();
            Tervehdi();
        }
        string paikka;

        /// <summary>
        /// NOSTOKORTTI-pohjan Kysy-nappi (omistaja 1.10.2026, kohdekortti kokeiluun, loki f344f1034): chat aukeaa kortin
        /// aiheella, ja kortin valmiit kysymykset ovat siruina (kysyminen kortin aiheen kanssa). Ei ehdotushakua.
        /// </summary>
        /// <param name="kohta">PULUN VALMIIT (omistaja 9.10.2026, juna 173): nostokortin kohta paketissa (PuluValmiitLataus.Kohta), maa ISO3.
        /// Kun maan paketissa on kohta, sirut ovat paketin viisi kysymystä (2 näkyy, loput vierittämällä) ja vastaus tulee valmiina.</param>
        public void AvaaKortista(Aihe aihe, IReadOnlyList<string> valmiit, string kohta = null, string maa = null)
        {
            Paikka("kortti:" + ValmiidenAvain(aihe));
            Avaa(false);
            PoistaSirut();
            NaytaKohteenValmiit(valmiit, aihe);
            AsetaMatala(valmiit != null && valmiit.Count > 0);
            Asettele();
            AsetaValmisKohta(kohta, maa, aihe, true);
        }

        // --- Pulun valmiit vastaukset (Peli/PuluValmiit.cs, PuluValmiitLataus.cs) ------------------------------------

        PuluValmiit valmisPaketti;
        string valmisKohta;
        Aihe valmisAihe;

        /// <summary>Keskustelun kohta valmiisiin vastauksiin; sirut = kohdan kysymykset, kun paketti on (nayta).</summary>
        void AsetaValmisKohta(string kohta, string maa, Aihe aihe, bool nayta)
        {
            valmisKohta = kohta;
            valmisAihe = aihe;
            valmisPaketti = null;
            if (kohta == null || maa == null) return;
            PuluValmiitLataus.Hae(maa, p =>
            {
                if (valmisKohta != kohta || p == null || !p.Kohdat.ContainsKey(kohta)) return;
                valmisPaketti = p;
                if (nayta && Auki && !kysyy) NaytaValmiinKohdanKysymykset();
            });
        }

        string ValmiidenKysytytAvain => "valmis:" + valmisKohta;

        /// <summary>
        /// Kohdan kysymättömät valmiit kysymykset sirupohjalla (mk-chat__siru) samaan sarakkeeseen: kaksi näkyy, loput tulevat esiin
        /// vierittämällä (omistaja 9.10.2026: "näkymässä 2 kysymystä, loput vierittämällä"). 0 = ei lohkoa.
        /// </summary>
        int NaytaValmiinKohdanKysymykset()
        {
            foreach (var e in sirualue.Query(className: "mk-chat__kohdevalmiit").ToList()) e.RemoveFromHierarchy();
            if (valmisPaketti == null || valmisKohta == null || !valmisPaketti.Kohdat.TryGetValue(valmisKohta, out var k)) return 0;
            valmiitKysytyt.TryGetValue(ValmiidenKysytytAvain, out var kysytyt);
            var jaljella = k.Kysymykset.Where(v => kysytyt == null || !kysytyt.Contains(v.Kysymys)).ToList();
            if (jaljella.Count == 0) return 0;
            var vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-chat__sirut");
            vieritys.AddToClassList("mk-chat__kohdevalmiit");
            vieritys.AddToClassList("mk-chat__sirut--vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            sirualue.Add(vieritys);
            var aihe = valmisAihe;
            foreach (var v in jaljella)
            {
                string kysymys = v.Kysymys;
                Kirjasimet.Aseta(Rakenne.Nappi(kysymys, "mk-chat__siru", () => Kysy(kysymys, aihe: aihe), vieritys.contentContainer), Kirjasin.Kone);
            }
            Vierita(VirranLoppu());
            return jaljella.Count;
        }

        /// <summary>Valmis vastaus samaan kuplaan ja luentaan kuin workerin vastaus; ei verkkoa. Tosi = vastattu.</summary>
        bool VastaaValmiista(string kysymys)
        {
            if (valmisKohta == null) return false;
            var p = valmisPaketti;
            var v = p?.Vastaa(valmisKohta, kysymys);
            if (v == null) return false;
            if (!valmiitKysytyt.TryGetValue(ValmiidenKysytytAvain, out var kysytyt)) valmiitKysytyt[ValmiidenKysytytAvain] = kysytyt = new HashSet<string>();
            kysytyt.Add(v.Kysymys);
            historia.Add(("kayttaja", kysymys));
            pulu.ChatVastausAlkoi();
            // Live vain kehittäjälle: linkki vain käsitteeseen, jolla on valmis "Kerro lisää" -vastaus (ei kuollutta linkkiä).
            bool rajaa = PuluValmiitLataus.LiveVainKehittajalle && !Asetukset.Kehittaja;
            string kohta = valmisKohta;
            var kupla = Viesti("mk-chat__livia", Kasitelinkit(v.Teksti, rajaa ? k => p.OnLisaa(kohta, k) : (Func<string, bool>)null));
            KytkeKasitelinkit(kupla);
            string nakyva = Nakyva(v.Teksti);
            pulu.Tilanne("answer", nakyva);
            AsetaLukijalle(v.Teksti);
            if (!Auki) PeruLuenta();
            else LueVastaus(Puhuttava(v.Teksti));
            VahdiPuheVuoroa();
            historia.Add(("pollo", nakyva));
            // Jatkot valmiista; live vain kehittäjälle → kohdan kysymättömät kysymykset (jatkoon ei olisi vastausta).
            if (!rajaa) Sirut(v.Jatkot, "mk-chat__jatkot", true);
            else NaytaValmiinKohdanKysymykset();
            Debug.Log("MATKAKIRJA pulu: valmis vastaus " + kohta + " / " + kysymys);
            return true;
        }

        bool matala;

        /// <summary>
        /// MATALA KYSY (omistaja 6.10.2026: "jos nostossa valitsee kysy, niin pulun chatissa ei saa näkyä silloin mitään muuta kuin
        /// kohteeseen liittyvät kysymykset ... avata pulun chat ikkuna vain niin matalana että siinä näkyy pelkät uudet
        /// kysymysvaihtoehdot"): keskusteluvirta piiloon ja paneeli sisällön mittaiseksi (ylärivi, kysymyssirut, syöte). Vanha
        /// keskustelu säilyy; kysymys palauttaa virran, joka vierii uusimpaan (vanha jää ylös piiloon).
        /// </summary>
        void AsetaMatala(bool m)
        {
            if (m == matala) return;
            matala = m;
            virta.style.display = m ? DisplayStyle.None : StyleKeyword.Null;
            AsetaKorkeus();
            if (!m) Vierita(VirranLoppu());
        }

        /// <param name="ehdotukset">false = avaus kysymyksen takia (Kysy): ei rinnakkaista ehdotushakua, joka hidasti
        /// vastausta (iPad 28.9.: ensimmäinen virke 12 s, kun chat avattiin kysymyksellä; iPhone auki olleena 5 s)</param>
        void Avaa(bool ehdotukset)
        {
            if (Auki) return;
            // Muu avausreitti kuin linssin pulu (kartta, kortit): kartan teema (1.10. simulaattorikuva: vihreä teema jäi kartalle).
            if (Linssissa && !avataanLinssiin) PoistuLinssista();
            Auki = true;
            linssiAvatessa = UiNakymat.Olemassa ? UiNakymat.Hae().Linssit?.Auki : null;
            sulkija.style.display = DisplayStyle.Flex;
            // Web pollo.js animoiAvaus(paneeli, nappi): kasvaa avaajan (Pulun tai napin) kohdalta, 220/200 ms.
            Ponnahdus.Avaa(paneeli);
            SyoteLukko.Esta(this);
            PaivitaPin();
            Aanisoitin.Hiljennys("pollo", true);
            pulu.Tilanne("chatOpen");
            naytaKuplat.style.display = pulu.KuplaPalautettavissa ? DisplayStyle.Flex : DisplayStyle.None;
            realtime.PaivitaNakyvyys();
            if (!tervehditty) { tervehditty = true; Tervehdi(); }
            PuluHaku.Valmistele(); // web: indeksi laiskasti chatin ensimmäisellä avauksella
            Alku(historia.Count == 0);
            Asettele(); // lehti auki → pienempi pulu (web pieniPulu)
            // Linssin valmiit kysymykset tervehdyksen tilalla (web naytaValmiit → naytaLinssinValmiit).
            // AINA TASAN 2 KYSYMYSTÄ (omistaja 5.10.2026 klo 16.4x; simu 17.1x: uudelleen avattaessa edellisen vastauksen 2 jatkoa
            // ja 2 uutta ehdotusta pinoutuivat 4:ksi): linssin kysymykset korvaavat vanhat; muuten edellisen vastauksen jatkot jäävät,
            // ja uusia ehdotuksia haetaan vain, jos siruja ei ole.
            bool vanhatSirut = sirualue.Q(className: "mk-chat__sirut") != null;
            // Astronautin kuva auki (juna 147): kuvan omat sirut workerilta linssin yleisten valmiiden tilalle.
            string kuva = KuvaKentta();
            if (kuva.Length > 0)
            {
                if (kuva != edellinenKuva || !vanhatSirut) { edellinenKuva = kuva; PoistaSirut(); if (ehdotukset) HaeEhdotukset(); }
                return;
            }
            if (LinssiKysymykset.Nykyinen() != null) PoistaSirut();
            if (!NaytaLinssinValmiit() && ehdotukset && !vanhatSirut) HaeEhdotukset();
        }

        // --- linssin valmiit kysymykset (web naytaLinssinValmiit, vastaaLinssinValmiilla) ------------

        readonly Dictionary<string, HashSet<string>> linssiKysytyt = new Dictionary<string, HashSet<string>>();
        /// <summary>Linssi, joka oli auki chatin avautuessa (uuden linssin avautuminen sulkee kartan chatin).</summary>
        object linssiAvatessa;

        /// <summary>Jäljellä olevat valmiit kysymykset napeiksi; tosi, jos linssi tarjoaa kysymyksiä.</summary>
        bool NaytaLinssinValmiit()
        {
            var lk = LinssiKysymykset.Nykyinen();
            if (lk == null) return false;
            foreach (var e in sirualue.Query(className: "mk-chat__linssivalmiit").ToList()) e.RemoveFromHierarchy();
            linssiKysytyt.TryGetValue(lk.Avain, out var kysytyt);
            var jaljella = lk.Kysymykset.Where(k => kysytyt == null || !kysytyt.Contains(k)).Take(2).ToList();   // tasan 2 (omistaja 16.4x)
            if (jaljella.Count == 0) return true;
            var ryhma = Rakenne.El("mk-chat__sirut mk-chat__linssivalmiit", sirualue, PickingMode.Ignore);
            foreach (var t in jaljella)
            {
                string kysymys = t;
                var b = Rakenne.Nappi(kysymys, "mk-chat__siru", () => VastaaLinssinValmiilla(lk, kysymys), ryhma);
                Kirjasimet.Aseta(b, Kirjasin.Kone);
            }
            Vierita(VirranLoppu());
            return true;
        }

        /// <summary>
        /// MAAKUNTAKORTIN KYSYMYS (omistajan kortti 30.9.2026 klo 22.5x): kortin Pulun kysymys pelaajan viestinä ja valmis
        /// vastaus heti ilman tekoälykutsua (sama malli kuin Ihmisen matka -linssin valmiskysymykset, VastaaLinssinValmiilla).
        /// Chat avautuu kortin päälle (UiNakymat.ChatinKerros), ja jatkokysymykset kulkevat kortin aiheella, kunnes chat
        /// suljetaan (keskustelunAihe).
        /// </summary>
        /// <summary>
        /// NOSTOKORTTI-pohjan Kysy-nappi kortille, jonka kysymyksillä on valmiit vastaukset (maakuntakortti, web #3791):
        /// chat aukeaa, kysymykset siruina; sirun napautus näyttää valmiin vastauksen ilman mallikutsua (VastaaValmiilla).
        /// </summary>
        public void AvaaValmiilla(Aihe aihe, IReadOnlyList<(string Q, string A)> kysymykset)
        {
            Paikka("kortti:" + ValmiidenAvain(aihe));
            if (!Auki) Avaa(false);
            PoistaSirut();
            valmiitAihe = aihe;
            valmiit = kysymykset;
            NaytaJaljellaOlevat();
            AsetaMatala(kysymykset != null && kysymykset.Count > 0);
            Asettele();
        }

        // KYSYMÄTTÄ JÄÄNEET VALMIIT KYSYMYKSET (omistaja TF 140, 4.10.2026 klo 22.2x, Maakunnat/Sachsen: "Ei tule lisäkysymyksiä";
        // web pollo.js naytaLinssinValmiit): valmis vastaus ei avaa dynaamisia jatkokysymyksiä, joten kortin kysymättä jääneet
        // kysymykset jäävät tarjolle vastauksen alle, kunnes jokainen on kysytty (sitten ei tyhjää lohkoa). Kysytyt muistetaan
        // aiheittain chatin sulkemisen yli (web linssiKysytyt); uusi peli nollaa.
        IReadOnlyList<(string Q, string A)> valmiit;
        Aihe valmiitAihe;
        readonly Dictionary<string, HashSet<string>> valmiitKysytyt = new Dictionary<string, HashSet<string>>();

        static string ValmiidenAvain(Aihe aihe) => aihe == null ? "" : aihe.Otsake + "|" + aihe.Nimi;

        /// <summary>Kysymättä jääneet napeiksi; palauttaa niiden määrän (0 = ei lohkoa).</summary>
        int NaytaJaljellaOlevat()
        {
            foreach (var e in sirualue.Query(className: "mk-chat__kohdevalmiit").ToList()) e.RemoveFromHierarchy();
            if (valmiit == null || valmiit.Count == 0) return 0;
            valmiitKysytyt.TryGetValue(ValmiidenAvain(valmiitAihe), out var kysytyt);
            var jaljella = valmiit.Where(x => kysytyt == null || !kysytyt.Contains(x.Q.Trim())).Take(2).ToList();   // tasan 2 (omistaja 16.4x)
            if (jaljella.Count == 0) return 0;
            var aihe = valmiitAihe;
            var ryhma = Rakenne.El("mk-chat__sirut mk-chat__kohdevalmiit", sirualue, PickingMode.Ignore);
            foreach (var (q, a) in jaljella)
            {
                string kysymys = q, vastaus = a;
                Kirjasimet.Aseta(Rakenne.Nappi(kysymys, "mk-chat__siru", () => VastaaValmiilla(kysymys, vastaus, aihe), ryhma), Kirjasin.Kone);
            }
            Vierita(VirranLoppu());
            return jaljella.Count;
        }

        /// <summary>
        /// EI VALMIITA VASTAUKSIA (omistaja 5.10.2026 klo 16.4x: "pululla ei saisi olla koskaan valmiiksi kirjoitettuja vastauksia,
        /// vain valmiita kysymyksiä"): kortin valmis vastaus on taustatietoa (Pelikoodarin worker, kenttä taustatieto) elävälle
        /// vastaukselle, joka tulee samaa reittiä kuin kirjoitettu kysymys ja tuo kaksi uutta jatkokysymystä.
        /// </summary>
        public void VastaaValmiilla(string kysymys, string vastaus, Aihe aihe)
        {
            kysymys = (kysymys ?? "").Trim();
            if (kysymys.Length == 0 || kysyy) return;
            AsetaMatala(false);
            var avain = ValmiidenAvain(aihe);
            if (!valmiitKysytyt.TryGetValue(avain, out var kysytyt)) valmiitKysytyt[avain] = kysytyt = new HashSet<string>();
            kysytyt.Add(kysymys);
            if (!string.IsNullOrWhiteSpace(vastaus)) taustat[kysymys] = (vastaus, null, null);
            keskustelunAihe = aihe;
            Kysy(kysymys, aihe: aihe);
        }

        /// <summary>Linssin valmis kysymys: tallennettu vastaus ja lähde taustatiedoksi, vastaus elävänä (omistaja 16.4x).</summary>
        void VastaaLinssinValmiilla(LinssiKysymys lk, string kysymys)
        {
            if (kysyy) return;
            if (!linssiKysytyt.TryGetValue(lk.Avain, out var kysytyt)) linssiKysytyt[lk.Avain] = kysytyt = new HashSet<string>();
            kysytyt.Add(kysymys);
            if (lk.Vastaukset.TryGetValue(kysymys.Trim(), out var v) && !string.IsNullOrWhiteSpace(v.Vastaus))
            {
                var l = v.Lahteet.Count > 0 ? v.Lahteet[0] : default;
                taustat[kysymys.Trim()] = (v.Vastaus, l.Url, l.Otsikko);
            }
            Kysy(kysymys);
        }

        /// <summary>Valmiin kysymyksen taustatieto workerille (kysymys → valmis vastaus ja lähde); ei näytetä pelaajalle.</summary>
        readonly Dictionary<string, (string Teksti, string Url, string Otsikko)> taustat = new Dictionary<string, (string, string, string)>();

        public void Sulje()
        {
            // Pinnattu chat ei sulkeudu (ohinapautus, Esc, linssin vahti): se pienenee palkiksi ja puhe jatkuu.
            if (PinNakyvissa && !pienennetaan) { Pinnaus.Pienenna(); return; }
            if (!pienennetaan) AsetaMatala(false);
            keskustelunAihe = null;
            LopetaSanelu();
            // Web sulje: luenta pysähtyy ja puhevuoro päättyy. PUHE LOPPUU CHATIN MUKANA (omistaja TF 1.0.37: "se ei lopettanut
            // puhumista, vaikka lähdin pois pulun chatista"): kesken oleva vastaus ei aloita eikä jatka luentaa suljetussa
            // chatissa (luentaHiljennetty), ja Pulun puhe (myös latautuva pala) pysähtyy riippumatta kaiutinvivusta.
            if (kysyy) luentaHiljennetty = true;
            PeruLuenta();
            lukija.Pysayta();
            if (Auki) PysaytaPulunPuhe();
            LopetaPuheVuoro();
            suurennos.Sulje();
            kuvakortti?.Sulje();
            if (!Auki) return;
            Auki = false;
            sulkija.style.display = DisplayStyle.None;
            Ponnahdus.Sulje(paneeli);
            // Linssiteema pois vasta sulkuanimaation jälkeen (ei väriväläystä), jos chat ei avautunut uudelleen.
            if (Linssissa) paneeli.schedule.Execute(() => { if (!Auki) { PoistuLinssista(); Asettele(); } }).ExecuteLater(260);
            SyoteLukko.Vapauta(this);
            Aanisoitin.Hiljennys("pollo", false);
            pulu.Tilanne("chatClose");
            realtime.Lopeta(); // web sulje: äänikeskustelun koe sulkeutuu chatin mukana
            kentta.Blur();
        }

        /// <summary>
        /// Löydös 177 (Uusi peli, PeliOhjain.MuistitTyhjennetty): keskustelu, historia ja tervehdys alusta kuten webin
        /// uudelleenlatauksessa; kesken olevat ehdotus- ja kuvahaut sekä vastaus hylätään.
        /// </summary>
        public void Nollaa()
        {
            Sulje();
            sukupolvi++;
            ehdotusPoletti++;
            kuvaPoletti++;
            historia.Clear();
            linssiKysytyt.Clear();
            valmiitKysytyt.Clear();
            valmiit = null;
            valmiitAihe = null;
            virta.Clear();
            kentta.SetValueWithoutNotify("");
            tervehditty = false;
            viimeMietinta = null;
            Alku(true);
        }

        void Tervehdi()
        {
            var v = Viesti("mk-chat__livia", TervehdysAlku + "<b>" + TervehdysYdin + "</b>" + TervehdysLoppu);
            v.enableRichText = true;
        }

        Label Viesti(string luokka, string teksti)
        {
            var l = Rakenne.Teksti(teksti, "mk-chat__viesti " + luokka, virta);
            if (luokka == "mk-chat__pelaaja") Kirjasimet.Aseta(l, Kirjasin.Kone);
            Vierita(l);
            return l;
        }

        void Vierita(VisualElement e) => Rakenne.Vierita(virta, e, 30);

        /// <summary>Kiinnitetyt kysymyssirut (vierityksen ulkopuolella syöttökentän yläpuolella).</summary>
        VisualElement sirualue;

        /// <summary>Virran viimeinen viesti (sirut ovat omassa alueessaan): avaus vierittää viimeisimpään.</summary>
        VisualElement VirranLoppu() => virta.contentContainer.childCount > 0 ? virta.contentContainer[virta.contentContainer.childCount - 1] : virta.contentContainer;

        void Sirut(IList<string> tekstit, string luokka, bool jatko)
        {
            if (tekstit == null || tekstit.Count == 0) return;
            var ryhma = Rakenne.El("mk-chat__sirut " + luokka, sirualue, PickingMode.Ignore);
            for (int i = 0; i < Mathf.Min(2, tekstit.Count); i++)
            {
                string t = tekstit[i];
                var b = Rakenne.Nappi(t, "mk-chat__siru", () => { ryhma.RemoveFromHierarchy(); Kysy(t, jatko); }, ryhma);
                Kirjasimet.Aseta(b, Kirjasin.Kone);
            }
            Vierita(VirranLoppu());
        }

        void PoistaSirut()
        {
            foreach (var e in sirualue.Query(className: "mk-chat__sirut").ToList()) e.RemoveFromHierarchy();
        }

        // --- kysymys ------------------------------------------------------------------

        /// <summary>Kortin aihe kysymyksen mukana (web polloKysy { aihe }, js/fokusnosto.js nostonAihe).</summary>
        public sealed class Aihe
        {
            public string Otsake, Nimi, Tyyppi, Teksti;
        }

        /// <summary>
        /// KORTIN AIHE KONTEKSTIIN (omistajan löydös 30.9.2026, TF 1.1 (78/79), iPad: Segovian akvedukti → "Miten
        /// akveduktin ikä selvitettiin?" → pulu: "Kysymyksessä ei kerrota, mistä akveduktista on kyse"). Nostokortin
        /// kysymykset ja korostetut sanat antavat kortin otsikon ja tekstin; ne kulkevat vain tämän kysymyksen
        /// kontekstissa (jatkot nojaavat historiaan, jossa ensimmäinen vastaus jo nimeää aiheen).
        /// </summary>
        public static Aihe NostonAihe(Nosto n)
        {
            if (n == null || string.IsNullOrWhiteSpace(n.Otsikko)) return null;
            string teksti = string.Join(" ", new[] { n.Ingressi, n.Teksti }.Where(t => !string.IsNullOrWhiteSpace(t)));
            bool kohde = n.Laji == NostoLaji.Kohde;
            return new Aihe
            {
                Otsake = kohde ? "Kartalla auki oleva kohdetietoruutu" : "Kortti, josta pelaaja kysyy",
                Nimi = n.Otsikko,
                Tyyppi = kohde && !string.IsNullOrWhiteSpace(n.Luokka) ? n.Luokka.ToLowerInvariant() : null,
                Teksti = teksti.Length > 0 ? teksti : null,
            };
        }

        Aihe kysymyksenAihe;
        /// <summary>Kortin aihe, joka jatkuu saman keskustelun jatkokysymyksissä (VastaaValmiilla); pois chatin sulkeutuessa.</summary>
        Aihe keskustelunAihe;
        const int KohteenKatto = 900;

        /// <param name="puhe">saneltu kysymys = puhevuoro (web kysy { puhe: true }): vastaus luetaan aina</param>
        /// <param name="aihe">kortti, josta kysytään (NostonAihe); null = ei korttia</param>
        /// <summary>
        /// SIEPPAUS (Linssiseppä 5.10.2026, elävä opas): asetettuna ja tosi palauttaessaan kysymys ei mene Pulun workerille, vaan
        /// sieppaaja vastaa <see cref="Vastaa"/>-kutsulla. Pelaajan viesti näkyy chatissa kuten aina.
        /// </summary>
        public static Func<string, bool> Sieppaa;

        /// <summary>
        /// Sieppaajan vastaus samaan chattiin: teksti Pulun kuplana ja tasan 2 jatkokysymystä kiinnitettyinä siruina (korvaavat
        /// edelliset). Kaiuttimen Auto-tilassa vastaus luetaan Pulun äänellä kuten workerin vastaus.
        /// </summary>
        /// <summary>
        /// ELÄVÄ OPAS (Linssiseppä 5.10.2026): chat auki oppaan linssissä lämpimällä lasiteemalla (oma paikka "opas", keskustelu alkaa
        /// puhtaana); kappaleet tulevat Vastaa-kutsulla, pelaajan toiveet Sieppaa-koukun kautta. Ankkuri oletuksena Pulu.
        /// </summary>
        public void AvaaOppaalle(Func<Rect> ankkuri = null)
        {
            AvaaLinssissa(ankkuri ?? (() => pulu.Laatikko), "opas", null, "lasi");
            Asetu(OppaanJatkot);
        }

        /// <summary>Oppaan näppäimistönappi (omistaja 6.10.): sama keskustelu syöttörivi kirjoitustilassa ja kohdistettuna.</summary>
        public void AvaaOppaalleKirjoitus(Func<Rect> ankkuri = null)
        {
            AvaaOppaalle(ankkuri);
            VaihdaTilaan(false, kohdista: true);
        }

        /// <summary>
        /// OPAS KEVYEKSI (omistaja 5.10.2026 Päätoimittajan kautta: "raskaan oloinen"): oppaan aikana chat ei aukea itsestään eikä
        /// lue (kertoja puhuu); kappaleet ja kaksi jatkoa kertyvät tähän keskusteluun, joka aukeaa valikon Näytä teksti -rivistä.
        /// Jatkot näkyvät myös irrallisena sirurivinä (OpasValikko). Keskustelu alkaa ja päättyy puhtaana (ei tervehdystä).
        /// </summary>
        public void OpasTila(bool paalla)
        {
            if (paalla == oppaalle) return;
            Nollaa();
            oppaalle = paalla;
            tervehditty = paalla;
            AsetaOppaanJatkot(null);
        }
        bool oppaalle;

        /// <summary>Oppaan viimeisimmän kappaleen tai kysymyksen kaksi vaihtoehtoa (tyhjä, kun pelaaja on jo valinnut).</summary>
        public IReadOnlyList<string> OppaanJatkot => oppaanJatkot;
        readonly List<string> oppaanJatkot = new List<string>();
        public event Action OppaanJatkotMuuttui;

        /// <summary>Oppaan kysymys vanheni ilman pelaajan valintaa (silmukka valitsi itse): irralliset sirut pois.</summary>
        public void TyhjennaOppaanJatkot() { if (oppaanJatkot.Count > 0) AsetaOppaanJatkot(null); }

        void AsetaOppaanJatkot(IList<string> jatkot)
        {
            oppaanJatkot.Clear();
            if (jatkot != null) for (int i = 0; i < jatkot.Count && oppaanJatkot.Count < 2; i++)
                    if (!string.IsNullOrWhiteSpace(jatkot[i])) oppaanJatkot.Add(jatkot[i]);
            OppaanJatkotMuuttui?.Invoke();
        }

        /// <summary>Chatin avautuessa oppaalle viimeisimmät jatkot sen omiksi siruiksi (vain jos niitä ei jo ole).</summary>
        void Asetu(IReadOnlyList<string> jatkot)
        {
            if (jatkot.Count == 0 || virta.Q(className: "mk-chat__sirut") != null) return;
            Sirut(new List<string>(jatkot), "mk-chat__jatkot", true);
        }

        /// <summary>Oppaan päättyessä chat kiinni (sama kuin Sulje; nimi oppaan kytkentää varten).</summary>
        public void SuljeOppaalta() => Sulje();

        public void Vastaa(string teksti, IList<string> jatkot = null)
        {
            if (string.IsNullOrWhiteSpace(teksti)) return;
            if (!Auki && !oppaalle) Avaa(false);
            PoistaSirut();
            var kupla = Viesti("mk-chat__livia", Lukijaaani.PoistaPuhetagit(teksti));
            kupla.enableRichText = false;
            historia.Add(("pollo", teksti));
            AsetaLukijalle(teksti);
            // Oppaalla kertoja puhuu kappaleen itse: Pulun ääni ei lue päälle.
            if (AaniPaalla && !oppaalle) Puhe.Hae()?.Lue(teksti, "pollo");
            if (jatkot != null && jatkot.Count > 0) Sirut(jatkot, "mk-chat__jatkot", true);
            if (oppaalle) AsetaOppaanJatkot(jatkot);
            Vierita(kupla);
        }

        /// <param name="kohta">nostokortin kohta ja maa valmiisiin vastauksiin (kortin kysymyssiru suljetusta chatista)</param>
        public void Kysy(string kysymys, bool jatko = false, bool puhe = false, Aihe aihe = null, string kohta = null, string maa = null)
        {
            kysymys = (kysymys ?? "").Trim();
            if (kysymys.Length == 0 || kysyy) return;
            AsetaMatala(false);
            kysymyksenAihe = aihe ?? keskustelunAihe;
            // Kortin kysymys suljetusta chatista (nostokortin sirut ja korostetut sanat): kortti on oma paikkansa.
            if (!Auki && aihe != null) Paikka("kortti:" + ValmiidenAvain(aihe));
            // Paikan jälkeen: paikan vaihto nollaa valmiin kohdan.
            if (kohta != null && kohta != valmisKohta) AsetaValmisKohta(kohta, maa, aihe, false);
            if (kysymys.Length > KysymysKatto) kysymys = kysymys.Substring(0, KysymysKatto);
            if (!Auki && !(oppaalle && Sieppaa != null)) Avaa(false);
            if (oppaalle) AsetaOppaanJatkot(null);
            LopetaPuheVuoro();
            // Uusi kysymys: edellisen vastauksen luenta ylärivin lukijassa seis (uusi vastaus luetaan omana luentanaan).
            lukija.Vaihtui();
            luentaHiljennetty = false;
            luentaVirta = null;
            luettuun = 0;
            if (puhe)
            {
                puheVuoro = new PuheVuoro { Alku = Time.realtimeSinceStartupAsDouble };
                AsetaPuheTila("miettii");
            }
            kentta.value = "";
            PoistaSirut();
            ehdotusPoletti++;
            Alku(false);
            Viesti("mk-chat__pelaaja", kysymys);
            // Toinen vastaaja (esim. Linssisepän elävä opas, OpasSovitin): sieppaus vastaa itse Vastaa-kutsulla eikä Pulun workeria
            // kutsuta. Sama chat, samat napit ja kaksi kysymystä (PULU-CHAT-pohja, omistaja 5.10.2026).
            if (Sieppaa != null && Sieppaa(kysymys))
            {
                historia.Add(("kayttaja", kysymys));
                // Saneltu toive: sieppaaja (opas) vastaa omalla äänellään, joten Pulun puhevuoro ei jää "Mietin…"-tilaan.
                if (puhe) LopetaPuheVuoro(hiljaa: true);
                return;
            }
            // Valmis vastaus paketista ennen workeria (omistaja 9.10.2026); muuten live kuten ennen.
            if (VastaaValmiista(kysymys)) { if (puhe && !LuentaPaalla) LopetaPuheVuoro(); return; }
            bool paikkaa = Paikkakysymys.IsMatch(kysymys);
            // Oma paikkahakemisto ensin (webin ratkaisePaikka): kamera lähtee heti.
            bool lensi = paikkaa && LennaTunnettuun(kysymys);
            UiKerros.Hae().StartCoroutine(Pyyda(kysymys, jatko, paikkaa, lensi));
        }

        string Kehys(string kysymys, bool jatko) => Puhuttelu.IsMatch(kysymys) ? "puhuttelu" : jatko ? "jatko" : "aloitus";

        sealed class Tulos
        {
            public string Vastaus, Virhe;
            public bool Uusittava;
            /// <summary>Striimi katkesi (virhe-tapahtuma tai virta loppui ilman loppua): Vastaus = kertynyt teksti.</summary>
            public bool Katkesi;
            public List<string> Jatkot;
            public Dictionary<string, object> Paikka;
            /// <summary>Striimin palat yhteensä (web kertyma): virkevirran viimeinen vajaa virke luetaan tästä.</summary>
            public string Kertynyt;
        }

        /// <summary>
        /// Pyyntö workerille paneelin kontekstilla, historialla ja kehyksellä; onnistunut
        /// vastaus menee historiaan. Kutsuja pitää kysyy-lukon (yksi pyyntö kerrallaan).
        /// </summary>
        /// <param name="raaka">striimin kertymä sellaisenaan (käsite- ja puhetagit mukana) virkevirran luennalle</param>
        IEnumerator Laheta(string kysymys, bool jatko, Action<Tulos> valmis, Action<string> osittain = null, Action<string> raaka = null)
        {
            string konteksti = Konteksti(HaeAineisto(kysymys));
            // Todennus (kehittäjä): kontekstin alku lokiin, aineisto-osio pois (kortin aihe näkyy näkymärivin perässä).
            if (Asetukset.Kehittaja)
            {
                int aineistoAlkaa = konteksti.IndexOf("\n\nPELIN", StringComparison.Ordinal);
                var lokiin = (aineistoAlkaa > 0 ? konteksti.Substring(0, aineistoAlkaa) : konteksti).Replace("\n", " | ");
                Debug.Log("MATKAKIRJA pulu konteksti: " + (lokiin.Length > 500 ? lokiin.Substring(0, 500) + "…" : lokiin));
            }
            var runko = new StringBuilder("{\"tehtava\":\"vastaus\",\"kysymys\":").Append(PeliApu.Json(kysymys))
                .Append(",\"konteksti\":").Append(PeliApu.Json(konteksti))
                .Append(KuvaKentta())
                .Append(",\"kehys\":").Append(PeliApu.Json(Kehys(kysymys, jatko)))
                // Äänitagit (omistaja 27.9. klo 23.1x): tämä versio siivoaa ne näytöltä (Nakyva), joten worker saa liittää
                // kehotteeseen tagisäännön; vanhat versiot eivät lähetä kenttää eivätkä saa tageja (web PR #3513).
                .Append(",\"puhetagit\":1")
                // Vastaus luetaan ääneen (kaiutin tai saneltu kysymys): worker lisää ohjeen "aloita lyhyellä virkkeellä"
                // välimuistirajan jälkeen (Pelikoodari 28.9.), jotta ensimmäinen luentapala valmistuu nopeasti.
                .Append(LuentaPaalla ? ",\"luetaan\":1" : "")
                .Append(",\"historia\":[");
            int alku = Mathf.Max(0, historia.Count - HistoriaKatto);
            for (int i = alku; i < historia.Count; i++)
            {
                if (i > alku) runko.Append(',');
                runko.Append("{\"rooli\":").Append(PeliApu.Json(historia[i].Rooli)).Append(",\"teksti\":").Append(PeliApu.Json(historia[i].Teksti)).Append('}');
            }
            runko.Append(']');
            // Valmiin kysymyksen taustatieto (Pelikoodarin worker 5.10.2026: "PULUN TAUSTATIETO", ei näytetä sellaisenaan).
            if (taustat.TryGetValue(kysymys, out var tt))
            {
                string teksti = tt.Teksti.Length > 1200 ? tt.Teksti.Substring(0, 1200) : tt.Teksti;
                runko.Append(",\"taustatieto\":[{\"teksti\":").Append(PeliApu.Json(teksti)).Append(",\"lahde\":")
                    .Append(string.IsNullOrEmpty(tt.Url) ? "null" : "{\"url\":" + PeliApu.Json(tt.Url) + ",\"title\":" + PeliApu.Json(tt.Otsikko ?? "") + "}")
                    .Append("}]");
            }
            // Striimi (web pyydaStriimi, oletus): palat kuplaan heti, worker jatkaa sanarajaan pysähtyneen vastauksen.
            runko.Append(",\"striimi\":true}");

            var t = new Tulos();
            var sse = new SseKasittelija(osittain, raaka);
            using (var r = Pyynto(runko.ToString(), sse, 90))
            {
                yield return r.SendWebRequest();
                bool striimi = (r.GetResponseHeader("content-type") ?? "").Contains("event-stream");
                var json = striimi ? sse.Loppu : Rakenne.Olio(Jasenna(sse.Teksti));
                if (Asetukset.Kehittaja && r.responseCode != 200)
                    Debug.Log($"MATKAKIRJA pulu: HTTP {r.responseCode} {MiniJson.Teksti(json, "virhe") ?? (r.responseCode == 403 ? sse.Teksti : r.error)}");
                if (r.responseCode == 403) { t.Virhe = EiSaanut; t.Uusittava = true; }
                else if (striimi && json == null)
                {
                    // Virta katkesi (virhe-tapahtuma tai loppu puuttuu): kertynyt teksti ilman linkkejä, ei historiaan.
                    t.Katkesi = true;
                    t.Uusittava = true;
                    t.Vastaus = sse.Kertynyt;
                    if (string.IsNullOrWhiteSpace(t.Vastaus)) { t.Katkesi = false; t.Virhe = sse.Virhe ?? EiSaanut; }
                }
                else if (r.result != UnityWebRequest.Result.Success)
                {
                    t.Virhe = MiniJson.Teksti(json, "viesti") ?? EiSaanut;
                    var syy = MiniJson.Teksti(json, "virhe");
                    t.Uusittava = syy != "paivaraja" && syy != "kuukausiraja";
                }
                else if (json != null)
                {
                    t.Vastaus = MiniJson.Teksti(json, "vastaus");
                    var syy = MiniJson.Teksti(json, "syy");
                    if (string.IsNullOrEmpty(t.Vastaus)) { t.Vastaus = EiTullut; t.Uusittava = true; }
                    else if (syy != null && syy != "kieltaytyi") t.Uusittava = true;
                    if (Rakenne.Lista(MiniJson.Kentta(json, "jatkot")) is List<object> j)
                    {
                        t.Jatkot = new List<string>();
                        foreach (var x in j) if (x is string s) t.Jatkot.Add(s);
                    }
                    t.Paikka = Rakenne.Olio(MiniJson.Kentta(json, "paikka"));
                    if (syy == null) { historia.Add(("kayttaja", kysymys)); historia.Add(("pollo", Nakyva(t.Vastaus))); }
                }
                else t.Virhe = EiSaanut;
                t.Kertynyt = sse.Kertynyt;
            }
            valmis(t);
        }

        // --- vastauksen kuva (web liitaVastausKuva, naytaVastausKuva, avaaWikiKuva) ---------------

        static readonly Regex KasiteKuvio = new Regex(@"\[\[([^\[\]\n]{1,60})\]\]");
        static readonly Regex PelkkaLuku = new Regex(@"^\d{1,4}(?:[.\-–]\d{1,4})?$");
        static readonly Regex HuonoKuva = new Regex(@"montage|collage|kollaasi|mosaic|banner|coat|vaakuna|flag|lippu|locator|\bmap\b|kartta|logo|seal|icon|graph|diagram|chart|topography|density|evolution|\.svg$", RegexOptions.IgnoreCase);
        static readonly string[] WikiKielet = { "fi", "en" };

        /// <summary>Kuvan aihe: vastauksen ensimmäinen käsite [[aihe|muoto]] (ei pelkkä luku), muuten kysymys.</summary>
        static string VastauskuvanAihe(string vastaus, string kysymys)
        {
            foreach (Match m in KasiteKuvio.Matches(vastaus ?? ""))
            {
                string k = m.Groups[1].Value.Trim();
                int p = k.IndexOf('|');
                string aihe = (p < 0 ? k : k.Substring(0, p)).Trim();
                if (aihe.Length == 0 && p >= 0) aihe = k.Substring(p + 1).Split('|')[^1].Trim();
                if (aihe.Length > 0 && !PelkkaLuku.IsMatch(aihe)) return aihe;
            }
            string siisti = Regex.Replace(Nakyva(kysymys ?? ""), @"\s+", " ").Trim().TrimEnd('?', '!', '.').Trim();
            return siisti.Length > 0 ? siisti : null;
        }

        internal sealed class WikiYhteenveto { public string Kieli, Otsikko, Tiivistelma, Kuva, Osoite; }

        // Myös matkakirjakortin "Katso kuva" (Matkakirjakortti.AvaaWiki): webin fi → en -järjestys.
        internal static IEnumerator HaeYhteenveto(string otsikko, string[] kielet, Action<WikiYhteenveto> valmis)
        {
            WikiYhteenveto vara = null;
            foreach (var kieli in kielet)
            {
                using (var r = UnityWebRequest.Get($"https://{kieli}.wikipedia.org/api/rest_v1/page/summary/{Uri.EscapeDataString(otsikko)}"))
                {
                    yield return r.SendWebRequest();
                    if (r.result != UnityWebRequest.Result.Success) continue;
                    var o = Rakenne.Olio(Jasenna(r.downloadHandler.text));
                    if (o == null || MiniJson.Teksti(o, "type") == "disambiguation") continue;
                    string tiiv = (MiniJson.Teksti(o, "extract") ?? "").Trim();
                    if (tiiv.Length == 0) continue;
                    var y = new WikiYhteenveto
                    {
                        Kieli = kieli, Otsikko = MiniJson.Teksti(o, "title") ?? otsikko, Tiivistelma = tiiv,
                        Kuva = MiniJson.Teksti(Rakenne.Olio(MiniJson.Kentta(o, "originalimage")), "source")
                            ?? MiniJson.Teksti(Rakenne.Olio(MiniJson.Kentta(o, "thumbnail")), "source"),
                        Osoite = MiniJson.Teksti(Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(MiniJson.Kentta(o, "content_urls")), "desktop")), "page"),
                    };
                    if (tiiv.Length >= 200) { valmis(y); yield break; }
                    vara ??= y;
                }
            }
            valmis(vara);
        }

        /// <summary>Otsikko vastaa aihetta (web otsikkoVastaa): hakutulos ei saa viedä sivuun.</summary>
        static bool OtsikkoVastaa(string aihe, string otsikko)
        {
            string a = (aihe ?? "").ToLowerInvariant().Trim(), o = (otsikko ?? "").ToLowerInvariant().Trim();
            if (a.Length == 0 || o.Length == 0) return false;
            if (Regex.IsMatch(o, @"\(.+\)") && !Regex.IsMatch(a, @"\(.+\)")) return false;
            if (a == o || a.Contains(o) || o.Contains(a)) return true;
            int i = 0;
            while (i < a.Length && i < o.Length && a[i] == o[i]) i++;
            int lyhin = Mathf.Min(a.Length, o.Length);
            return lyhin >= 4 && i >= Mathf.Max(4, Mathf.CeilToInt(lyhin * 0.7f));
        }

        /// <summary>Web haeKuvallinenArtikkeli: suora nimi ensin, haku varalle; kuva ei saa olla kartta, lippu tms.</summary>
        static IEnumerator HaeKuvallinen(string aihe, Action<WikiYhteenveto> valmis)
        {
            bool Kelpaa(WikiYhteenveto y) => y?.Kuva != null && !HuonoKuva.IsMatch(y.Kuva);
            WikiYhteenveto suora = null;
            yield return HaeYhteenveto(aihe, WikiKielet, y => suora = y);
            if (Kelpaa(suora)) { valmis(suora); yield break; }
            if (suora != null) { valmis(null); yield break; }
            foreach (var kieli in WikiKielet)
            {
                string osuma = null;
                using (var r = UnityWebRequest.Get($"https://{kieli}.wikipedia.org/w/api.php?action=query&list=search&srsearch={Uri.EscapeDataString(aihe)}&srlimit=1&srnamespace=0&format=json&origin=*"))
                {
                    yield return r.SendWebRequest();
                    if (r.result != UnityWebRequest.Result.Success) continue;
                    var haku = Rakenne.Lista(MiniJson.Kentta(Rakenne.Olio(MiniJson.Kentta(Rakenne.Olio(Jasenna(r.downloadHandler.text)), "query")), "search"));
                    osuma = haku != null && haku.Count > 0 ? MiniJson.Teksti(Rakenne.Olio(haku[0]), "title") : null;
                }
                if (osuma == null || !OtsikkoVastaa(aihe, osuma)) continue;
                WikiYhteenveto y = null;
                yield return HaeYhteenveto(osuma, new[] { kieli }, x => y = x);
                if (Kelpaa(y)) { valmis(y); yield break; }
            }
            valmis(null);
        }

        /// <summary>
        /// Vastauksen kuva kuplan oikeaan yläkulmaan (web .pollo-vastauskuva, 5,2 rem): napautus →
        /// kuva isompana (web avaaWikiKuva: kuva, tiivistelmä ja lähde, ei ilman lähdettään).
        /// Ei yhteyttä tai ei kuvaa = kuvaton vastaus, joka on kelvollinen.
        /// </summary>
        /// <summary>
        /// Kupla kääreeseen, jonka oikeaan laitaan kuva tulee (web float: right). Kuva ei saa olla Labelin
        /// lapsi: lapsellinen tekstielementti ei enää mittaa tekstiään, jolloin korkeudeksi jäi min-height
        /// ja teksti valui Tallenna-rivin ja jatkokysymysten päälle (Laitetestaaja A5, iPad 24.9.).
        /// </summary>
        static VisualElement Kuvallinen(Label kupla)
        {
            if (kupla.parent != null && kupla.parent.ClassListContains("mk-chat__kuvallinen")) return kupla.parent;
            var isa = kupla.parent;
            var kaare = new VisualElement();
            kaare.AddToClassList("mk-chat__kuvallinen");
            if (isa != null) isa.Insert(isa.IndexOf(kupla), kaare);
            kaare.Add(kupla);
            return kaare;
        }

        IEnumerator VastausKuva(Label kupla, string vastaus, string kysymys)
        {
            int poletti = ++kuvaPoletti;
            // Web paikallinenVastausKuva: oman aineiston nähtävyysjutun kuva ennen Wikipediaa; napautus avaa jutun.
            foreach (var kat in viimeisetKatkelmat)
            {
                var r = kat.Reitti;
                if (r?.Tyyppi != "nahtavyys" || !ReittiAvattavissa(r)) continue;
                var (kk, kohde) = Nahtavyys(r);
                var oma = kohde?.Juttu?.Kuvat.Count > 0 ? kohde.Juttu.Kuvat[0] : null;
                if (oma == null || string.IsNullOrEmpty(oma.Lahde)) continue;
                NostoSisalto.HaeKuva(oma.Lahde, tex =>
                {
                    if (tex == null || poletti != kuvaPoletti || kupla.panel == null) return;
                    var nappi = Rakenne.El("mk-chat__vastauskuva", Kuvallinen(kupla));
                    nappi.tooltip = Kieli.T("ui.pulu.nayta-kuva-isompana");
                    nappi.style.backgroundImage = new StyleBackground(tex);
                    nappi.AddManipulator(new Clickable(() => AvaaLinkki(r)));
                    Vierita(kupla);
                });
                yield break;
            }
            string aihe = VastauskuvanAihe(vastaus, kysymys);
            if (aihe == null) yield break;
            WikiYhteenveto y = null;
            yield return HaeKuvallinen(aihe, x => y = x);
            if (y == null || poletti != kuvaPoletti || kupla.panel == null) yield break;
            Kuvat.Hae(y.Kuva, t =>
            {
                if (t == null || kupla.panel == null) return;
                var nappi = Rakenne.El("mk-chat__vastauskuva", Kuvallinen(kupla));
                nappi.tooltip = Kieli.T("ui.pulu.nayta-kuva-isompana");
                nappi.style.backgroundImage = new StyleBackground(t);
                // E12 (web avaaWikiKuva): kuvatekstinä vain artikkelin otsikko ja lähdelinkki, ei tiivistelmää.
                nappi.AddManipulator(new Clickable(() => suurennos.Avaa(new List<LehtiKuva>
                {
                    new LehtiKuva { Lahde = y.Kuva, Otsikko = y.Otsikko, Lyhyt = y.Otsikko, LahdeRivi = Kieli.T("ui.pulu.kuva-wikipedia", y.Otsikko), LahdeUrl = y.Osoite },
                })));
                Vierita(kupla);
            });
        }

        // --- nähtävyyslinkki ja kuvakortti (web avaaLinkki, avaaKuvapopup, avaaKohde, reittiAvattavissa) ---

        PuluKuvakortti kuvakortti;

        /// <summary>Pulun kuvakortti (luodaan ensimmäisellä käytöllä nähtävyysarkin jälkeen).</summary>
        public PuluKuvakortti Kuvakortti => kuvakortti ??= new PuluKuvakortti(kerros);

        /// <summary>Kuvakortti auki (ei luo korttia; UiNakymat.KuvaSumea lukee joka ruudussa).</summary>
        public bool KuvakorttiAuki => kuvakortti != null && kuvakortti.Auki;

        /// <summary>
        /// Web reittiAvattavissa (tyyppi nahtavyys): kohdekartta kuuluu kaupunkiin, jossa pelaaja
        /// seisoo, ja kohteella on juttu. Rikkinäinen linkki on pahempi kuin puuttuva.
        /// </summary>
        public static bool NahtavyysAvattavissa(Kohdekartta k, KohdekarttaKohde kohde)
        {
            if (k == null || kohde?.Juttu == null || string.IsNullOrEmpty(kohde.Juttu.Teksti)) return false;
            var o = PeliOhjain.Instanssi;
            if (o?.Matka == null) return false;
            var s = o.Matka.Tila.Pelaaja.Sijainti;
            return s.Kaupungissa && s.Kaupunki == k.Kaupunki;
        }

        /// <summary>
        /// Web avaaLinkki nähtävyysjuttuun: jutulla on kuva → ensin kuvakortti (kuva, pitkä
        /// kuvateksti · lähde, "Avaa juttu"), muuten juttu suoraan. Juttu aukeaa nähtävyysarkkiin
        /// chatin päälle ja chat jää alle (omistaja 18.8.2026: sulku ei pudota kartalle); aikarivillä
        /// ei kohdenumeroa (web avaaNahtavyys numero null). ohitaSijainti vain testikomennolle.
        /// </summary>
        public bool AvaaNahtavyys(Kohdekartta k, KohdekarttaKohde kohde, bool ohitaSijainti = false)
        {
            if (ohitaSijainti ? kohde?.Juttu == null || string.IsNullOrEmpty(kohde.Juttu.Teksti) : !NahtavyysAvattavissa(k, kohde)) return false;
            var kuva = kohde.Juttu.Kuvat.Count > 0 ? kohde.Juttu.Kuvat[0] : null;
            if (kuva == null || string.IsNullOrEmpty(kuva.Lahde)) return AvaaJuttu(k, kohde);
            suurennos.Sulje();
            Kuvakortti.Nayta(kuva, () => AvaaJuttu(k, kohde));
            return true;
        }

        static bool AvaaJuttu(Kohdekartta k, KohdekarttaKohde kohde)
        {
            if (!UiNakymat.Olemassa) return false;
            UiNakymat.Hae().Nahtavyydet.AvaaKohde(k, kohde, false);
            return true;
        }

        // --- käsitelinkit (web jasennaKasitteet, a.pollo-kasitelinkki) --------------------------------

        const int KasitteidenKatto = 12;

        /// <summary>
        /// Vastauksen [[käsite|muoto]] → pisteviivalla alleviivattu linkki (näkyvä muoto); napautus
        /// kysyy "Kerro lisää: aihe" perusmuodosta. Muu teksti suojataan rich textiltä.
        /// </summary>
        /// <param name="linkitettava">null = jokainen käsite linkiksi; muuten vain ne, joille tosi (valmiit vastaukset ilman liveä)</param>
        static string Kasitelinkit(string vastaus, Func<string, bool> linkitettava = null)
        {
            string koko = vastaus ?? "";
            var sb = new StringBuilder();
            int kohta = 0, n = 0;
            // Linkkien välinen pala siivotaan erikseen: sen alun välilyönti säilyy (PoistaPuhetagit poistaa rivin alun
            // tyhjän, ja ilman tätä "[[Akropolis]] on" näkyi "Akropolison", TF 1.0.34).
            string Suojaa(string x)
            {
                int alku = 0;
                while (alku < x.Length && (x[alku] == ' ' || x[alku] == '\t')) alku++;
                return x.Substring(0, alku) + Nakyva(x.Substring(alku)).Replace("[[", "").Replace("]]", "").Replace("<", "<noparse><</noparse>");
            }
            foreach (Match m in KasiteKuvio.Matches(koko))
            {
                if (n >= KasitteidenKatto) break;
                string k = m.Groups[1].Value.Trim();
                if (k.Length == 0) continue;
                int p = k.IndexOf('|');
                string aihe = (p < 0 ? k : k.Substring(0, p)).Trim();
                string muoto = p < 0 ? k : k.Substring(p + 1).Split('|')[^1].Trim();
                if (aihe.Length == 0) aihe = muoto;
                sb.Append(Suojaa(koko.Substring(kohta, m.Index - kohta)));
                if (linkitettava != null && !linkitettava(aihe))
                {
                    sb.Append(Suojaa(muoto));
                    kohta = m.Index + m.Length;
                    continue;
                }
                sb.Append("<link=\"").Append(aihe.Replace("\"", "")).Append("\"><color=#6b5a44><u>").Append(muoto.Replace("<", "")).Append("</u></color></link>");
                kohta = m.Index + m.Length;
                n++;
            }
            sb.Append(Suojaa(koko.Substring(kohta)));
            return sb.ToString();
        }

        void KytkeKasitelinkit(Label kupla)
        {
            kupla.pickingMode = PickingMode.Position;
            kupla.RegisterCallback<UnityEngine.UIElements.Experimental.PointerUpLinkTagEvent>(e =>
            {
                if (string.IsNullOrEmpty(e.linkID) || kysyy) return;
                Kysy(PuluValmiit.KerroLisaaKysymys(e.linkID), true);
            });
        }

        /// <summary>Wiki-linkit [[…]] ja putkimerkintä pois näkyvästä tekstistä.</summary>
        static string Nakyva(string vastaus) => Lukijaaani.PoistaPuhetagit(Puhuttava(vastaus));

        /// <summary>
        /// Puheeseen menevä vastaus: käsitelinkit tekstiksi, mutta xAI-puhetagit ([sigh], [laugh], &lt;fast&gt;…&lt;/fast&gt;,
        /// omistaja 27.9. klo 23.1x) jäävät — ne kuuluvat vain äänessä, näytölle Nakyva poistaa ne.
        /// </summary>
        static string Puhuttava(string vastaus) => Regex.Replace(vastaus ?? "", @"\[\[(?:[^\]|]*\|)?([^\]]*)\]\]", "$1");

        IEnumerator Pyyda(string kysymys, bool jatko, bool paikkakysymys, bool joLennetty)
        {
            kysyy = true;
            int suku = sukupolvi;
            var odotus = Viesti("mk-chat__odottaa", Mietinta(true));
            var pitka = odotus.schedule.Execute(() => odotus.text = Pitkat[arpa.Next(Pitkat.Length)]).StartingIn(6000);
            // Löydös 66: pulu salamana ulos odottamaan (web aloitaLivianOdotus → chatDashOut), ei "hetkinen"-hymyä.
            pulu.ChatOdotusAlkoi();

            Tulos t = null;
            Label osittainen = null;
            double lahti = Time.realtimeSinceStartupAsDouble;
            yield return Laheta(kysymys, jatko, x => t = x, teksti =>
            {
                // Ensimmäinen pala korvaa mietintärivin kuplalla, joka kasvaa paloittain (web striimikupla).
                if (string.IsNullOrEmpty(teksti)) return;
                if (osittainen == null)
                {
                    // Mittari: tekstin viive erikseen puheen viiveestä (puheviive = tämä + luettava raja + synteesi).
                    Debug.Log($"MATKAKIRJA pulu: ensimmäinen tekstipala {(Time.realtimeSinceStartupAsDouble - lahti) * 1000:0} ms");
                    pulu.ChatVastausAlkoi(); // web ilmoitaVastaus → waitingAnswer: dashBack → dustOff → bookStudy
                    pitka.Pause();
                    odotus.style.display = DisplayStyle.None;
                    osittainen = Viesti("mk-chat__livia", teksti);
                    osittainen.enableRichText = false;
                }
                else osittainen.text = teksti;
            }, SyotaLuennalle);
            pitka.Pause();
            odotus.RemoveFromHierarchy();
            osittainen?.RemoveFromHierarchy();
            kysyy = false;
            if (suku != sukupolvi) { pulu.ChatOdotusLoppui(); yield break; } // Uusi peli välissä (löydös 177)
            // Virhe tai katkos: pulu vain takaisin; muuten (ei striimiä, koko vastaus kerralla) sama paluuketju.
            if (t.Katkesi || t.Virhe != null) { pulu.ChatOdotusLoppui(); PeruLuenta(); LopetaPuheVuoro(); }
            else pulu.ChatVastausAlkoi();

            if (t.Katkesi)
            {
                // Web: kertynyt teksti ilman linkkejä, "Ajatus katkesi kesken lauseen." ja uusinta; ei historiaan.
                var kesken = Viesti("mk-chat__livia", Nakyva(t.Vastaus).TrimEnd() + "\n\n" + Kieli.T("ui.pulu.ajatus-katkesi"));
                kesken.enableRichText = false;
                pulu.Tilanne("emotion", tunne: "hammentynyt", voimakkuus: 0.5f);
                Sirut(new[] { Kieli.T("ui.pulu.yrita-uudelleen") }, "mk-chat__uusinta", jatko);
                yield break;
            }
            if (t.Virhe != null)
            {
                Viesti("mk-chat__livia", t.Virhe);
                pulu.Tilanne("emotion", tunne: t.Uusittava ? "hammentynyt" : "vakava", voimakkuus: 0.5f);
                if (t.Uusittava) Sirut(new[] { Kieli.T("ui.pulu.yrita-uudelleen") }, "mk-chat__uusinta", jatko);
                yield break;
            }
            string nakyva = Nakyva(t.Vastaus);
            var kupla = Viesti("mk-chat__livia", Kasitelinkit(t.Vastaus));
            KytkeKasitelinkit(kupla);
            if (!t.Uusittava) Matkakirjalinkit();
            UiKerros.Hae().StartCoroutine(VastausKuva(kupla, t.Vastaus, kysymys));
            pulu.Tilanne("answer", nakyva);
            if (!t.Uusittava) AsetaLukijalle(t.Vastaus);
            // Virkevirta luki jo alun striimin aikana: loppu perään (web paataLuenta), muuten koko vastaus nyt.
            // Mikki hiljensi tai chat suljettiin kesken vastauksen: ei luentaa tälle vastaukselle.
            if (luentaHiljennetty || !Auki) PeruLuenta();
            else if (!PaataLuenta(t)) LueVastaus(Puhuttava(t.Vastaus));
            VahdiPuheVuoroa();
            if (paikkakysymys && !joLennetty && t.Paikka != null) LennaPaikkaan(t.Paikka);
            if (!t.Uusittava) PoimintaRivi(kysymys, nakyva);
            if (t.Uusittava) Sirut(new[] { Kieli.T("ui.pulu.yrita-uudelleen") }, "mk-chat__uusinta", jatko);
            else Sirut(t.Jatkot, "mk-chat__jatkot", true);
        }

        // --- pöllöpoiminta (web liitaPoimintaNapit, js/pollopoiminnat.js) -------------------------

        /// <summary>
        /// Web nykyinenPoimintaAvain: auki oleva nähtävyysjuttu voittaa lehden (juttu:kaupunki:nimi),
        /// muuten lehden sivu (aihe:omistaja:aihe). null = mitään artikkelia ei ole auki.
        /// </summary>
        static string PoimintaAvain()
        {
            if (!UiNakymat.Olemassa) return null;
            var ui = UiNakymat.Hae();
            return ui.Nahtavyydet?.AukiAvain ?? ui.Lehti?.AukiAvain;
        }

        /// <summary>
        /// Hyvän vastauksen perään "Ehdota tallennettavaksi": pari lähtee ehdotuskanavaan omistajan
        /// kuratointiin (ei näy pelissä ennen hyväksyntää). Kehittäjätilassa "Tallenna juttuun": pari
        /// tallentuu laitteelle (PoimintaVarasto), näkyy heti pillerinä auki olevassa jutussa ja lähtee
        /// taustalla myös kanavaan tarkenteella (web liitaPoimintaNapit).
        /// Ei nappia, jos vastausta ei voi kiinnittää artikkeliin (esim. chat avattu kartalta).
        /// </summary>
        void PoimintaRivi(string kysymys, string vastaus)
        {
            string avain = PoimintaAvain();
            if (avain == null || string.IsNullOrEmpty(kysymys) || string.IsNullOrEmpty(vastaus)) return;
            bool kehittaja = Asetukset.Kehittaja;
            var rivi = Rakenne.El("mk-chat__poimintarivi", virta, PickingMode.Ignore);
            Label tila = null;
            Button nappi = null;
            nappi = Rakenne.Nappi(Kieli.T(kehittaja ? "ui.pulu.tallenna-juttuun" : "ui.pulu.ehdota-tallennettavaksi"), "mk-chat__poimintanappi", () =>
            {
                nappi.SetEnabled(false);
                var kentat = new List<(string, string)>
                {
                    ("laji", ""), ("teksti", "Pöllöpoiminta\n\nKysymys: " + kysymys + "\n\nVastaus: " + vastaus),
                    ("sivu", avain), ("tarkenne", kehittaja ? "Pöllöpoiminta (kehittäjä)" : "Pöllöpoiminta"),
                };
                if (kehittaja)
                {
                    bool ok = PoimintaVarasto.Tallenna(avain, kysymys, vastaus);
                    tila.text = Kieli.T(ok ? "ui.pulu.tallennettu" : "ui.pulu.oli-jo-tallessa");
                    // Alla oleva juttu on yhä auki: pillerit päivittyvät heti.
                    Poimintapillerit.Paivita(avain);
                    if (!ok) return;
                    // Kanava on varareitti: epäonnistuminen ei haittaa (vientilohko Kehittäjälehdessä).
                    Palautekanava.Postita("/laheta", kentat, null, t =>
                    {
                        if (rivi.panel != null && t.Ok) tila.text = Kieli.T("ui.pulu.tallennettu-jonoon");
                    });
                    return;
                }
                tila.text = Kieli.T("ui.pulu.lahetetaan");
                Palautekanava.Postita("/laheta", kentat, null, t =>
                {
                    if (rivi.panel == null) return;
                    if (t.Ok) { tila.text = Kieli.T("ui.pulu.ehdotus-lahti"); return; }
                    tila.text = t.Estetty ? Palautekanava.Virheviesti(t) : Kieli.T("ui.pulu.ehdotus-ei-lahtenyt");
                    nappi.SetEnabled(true);
                });
            }, rivi);
            Kirjasimet.Aseta(nappi, Kirjasin.Luku);
            tila = Rakenne.Teksti("", "mk-chat__poimintatila", rivi);
            Vierita(rivi);
        }

        /// <summary>
        /// Kysymys paneelin ulkopuolelta (webin polloUlkoinenKysymys: astronautin minipulu):
        /// sama palvelin, konteksti, historia ja yhden pyynnön lukko, vastaus kutsujalle
        /// (virheessä selittävä teksti). false = tyhjä kysymys tai pyyntö jo kesken.
        /// </summary>
        public bool KysyUlkoisesti(string kysymys, Action<string> valmis)
        {
            kysymys = (kysymys ?? "").Trim();
            if (kysymys.Length == 0 || kysyy) return false;
            if (kysymys.Length > KysymysKatto) kysymys = kysymys.Substring(0, KysymysKatto);
            kysyy = true;
            kysymyksenAihe = null;
            UiKerros.Hae().StartCoroutine(Laheta(kysymys, false, t =>
            {
                kysyy = false;
                valmis?.Invoke(t.Virhe ?? Nakyva(t.Vastaus));
            }));
            return true;
        }

        public bool Kysyy => kysyy;

        UnityWebRequest Pyynto(string runko, DownloadHandler lukija = null, int aikaraja = 45)
        {
            var r = new UnityWebRequest(Palvelin, "POST")
            {
                uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(runko)) { contentType = "application/json" },
                downloadHandler = lukija ?? new DownloadHandlerBuffer(),
                timeout = aikaraja,
            };
            r.SetRequestHeader("Content-Type", "application/json");
            r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            // Kehittäjäkoodi (web x-pollo-kehittaja): omistajan laitteella ohittaa päivärajan, jonka web ja natiivi
            // samasta verkosta jakavat. Vain Keychainista (Asetukset.PolloKoodi), ei koskaan koodissa eikä lokissa;
            // App Store -käännöksessä ei otsaketta.
            string koodi = Asetukset.PolloKoodi;
            if (!string.IsNullOrEmpty(koodi)) r.SetRequestHeader(Lukijaaani.KoodiOtsake, koodi);
            // Roolien simuajot (juna 146, Päätoimittaja): Pöllön testitunnus vain ajonaikaisesta POLLO_TESTITUNNUS-muuttujasta.
            PolloTestitunnus.Lisaa(r);
            return r;
        }

        /// <summary>
        /// Web pyydaStriimi: SSE-virran luku (event: pala | loppu | virhe, data: yksi JSON-rivi, tapahtumat \n\n:llä).
        /// ReceiveData kutsutaan pääsäikeessä; palat kasataan ja välitetään kuplaan [[…]]-merkinnät poistettuina.
        /// Jos vastaus ei ole striimi (virhe-JSON tai vanha worker), koko runko jää Tekstiin.
        /// </summary>
        sealed class SseKasittelija : DownloadHandlerScript
        {
            readonly Action<string> osittain, raaka;
            readonly StringBuilder puskuri = new StringBuilder(), kaikki = new StringBuilder(), kertynyt = new StringBuilder();
            readonly Decoder dekooderi = Encoding.UTF8.GetDecoder();
            public Dictionary<string, object> Loppu;
            public string Virhe;
            public string Teksti => kaikki.ToString();
            public string Kertynyt => kertynyt.ToString();

            public SseKasittelija(Action<string> osittain, Action<string> raaka = null) : base(new byte[4096])
            {
                this.osittain = osittain;
                this.raaka = raaka;
            }

            protected override bool ReceiveData(byte[] data, int pituus)
            {
                if (data == null || pituus <= 0) return true;
                var merkit = new char[dekooderi.GetCharCount(data, 0, pituus)];
                dekooderi.GetChars(data, 0, pituus, merkit, 0);
                kaikki.Append(merkit);
                puskuri.Append(merkit);
                Pura();
                return true;
            }

            void Pura()
            {
                while (true)
                {
                    string p = puskuri.ToString().Replace("\r\n", "\n");
                    int raja = p.IndexOf("\n\n", StringComparison.Ordinal);
                    if (raja < 0) { puskuri.Clear().Append(p); return; }
                    string tapahtuma = p.Substring(0, raja);
                    puskuri.Clear().Append(p.Substring(raja + 2));
                    string laji = null;
                    var dataRivit = new StringBuilder();
                    foreach (var rivi in tapahtuma.Split('\n'))
                    {
                        if (rivi.StartsWith("event:", StringComparison.Ordinal)) laji = rivi.Substring(6).Trim();
                        else if (rivi.StartsWith("data:", StringComparison.Ordinal)) dataRivit.Append(rivi.Substring(5).TrimStart());
                    }
                    var o = Rakenne.Olio(Jasenna(dataRivit.ToString()));
                    if (laji == "pala")
                    {
                        kertynyt.Append(MiniJson.Teksti(o, "teksti") ?? "");
                        osittain?.Invoke(PoistaKesken(kertynyt.ToString()));
                        raaka?.Invoke(kertynyt.ToString());
                    }
                    else if (laji == "loppu") Loppu = o;
                    else if (laji == "virhe") Virhe = MiniJson.Teksti(o, "viesti");
                }
            }

            /// <summary>Web poistaKasiteMerkinnat: valmiit [[a|b]] → b, ja keskeneräinen [[… lopussa piiloon.</summary>
            static string PoistaKesken(string t)
            {
                t = Lukijaaani.PoistaKeskenTagi(Nakyva(t));
                int kesken = t.LastIndexOf("[[", StringComparison.Ordinal);
                return kesken >= 0 && t.IndexOf("]]", kesken, StringComparison.Ordinal) < 0 ? t.Substring(0, kesken) : t;
            }
        }

        static object Jasenna(string t)
        {
            if (string.IsNullOrEmpty(t)) return null;
            try { return MiniJson.Jasenna(t); } catch { return null; }
        }

        string Mietinta(bool vastaus)
        {
            string m;
            int n = Yleiset.Length + (vastaus ? Vastausmietinnat.Length : 0);
            do
            {
                int i = arpa.Next(n);
                m = i < Yleiset.Length ? Yleiset[i] : Vastausmietinnat[i - Yleiset.Length];
            } while (m == viimeMietinta && n > 1);
            viimeMietinta = m;
            return m;
        }

        // --- ehdotukset avattaessa ------------------------------------------------------

        void HaeEhdotukset()
        {
            if (kysyy || virta.Q(className: "mk-chat__ehdotukset") != null) return;
            UiKerros.Hae().StartCoroutine(Ehdotukset(++ehdotusPoletti));
        }

        IEnumerator Ehdotukset(int poletti)
        {
            var odotus = Viesti("mk-chat__odottaa mk-chat__ehdotus-odotus", Mietinta(false));
            using var r = Pyynto("{\"tehtava\":\"ehdotukset\",\"konteksti\":" + PeliApu.Json(Konteksti()) + KuvaKentta() + "}");
            yield return r.SendWebRequest();
            odotus.RemoveFromHierarchy();
            if (poletti != ehdotusPoletti || r.result != UnityWebRequest.Result.Success) yield break; // ei kriittinen
            var lista = Rakenne.Lista(MiniJson.Kentta(Rakenne.Olio(Jasenna(r.downloadHandler.text)), "ehdotukset"));
            if (lista == null) yield break;
            var tekstit = new List<string>();
            foreach (var x in lista) if (x is string s && s.Length > 0) tekstit.Add(s);
            if (KuvaKentta().Length > 0) Debug.Log($"MATKAKIRJA pulu: kuvan sirut {tekstit.Count}: {string.Join(" | ", tekstit)}");
            Sirut(tekstit, "mk-chat__ehdotukset", false);
        }

        /// <summary>
        /// Astronautin kuva ruudulla (juna 147, Pelikoodarin worker PR #4038): ",\"kuva\":{…}" ehdotus- ja vastauspyyntöön, jotta
        /// sirut ja vastaus ovat kuvan kontekstissa; tyhjä, kun kuvaa ei ole auki (vanha muoto, worker toimii kuten ennen).
        /// </summary>
        static string KuvaKentta()
        {
            var linssit = UiNakymat.Olemassa ? UiNakymat.Hae()?.Linssit : null;
            if (linssit?.Auki?.Tiedot?.Id != LinssiUi.AstronauttiId) return "";
            var j = linssit.Astronautti?.Kuva?.KuvaJson;
            return string.IsNullOrEmpty(j) ? "" : ",\"kuva\":" + j;
        }

        string edellinenKuva;

        /// <summary>Kuva vaihtui: edellisen kuvan sirut pois ja uudet kuvan mukaan, jos chat on auki (Kuvanakyma.KuvaVaihtui).</summary>
        void KuvaVaihtui()
        {
            string uusi = KuvaKentta();
            if (uusi == edellinenKuva) return;
            edellinenKuva = uusi;
            ehdotusPoletti++;
            PoistaSirut();
            foreach (var e in virta.Query(className: "mk-chat__ehdotus-odotus").ToList()) e.RemoveFromHierarchy();
            if (Auki && !kysyy) HaeEhdotukset();
        }

        // --- konteksti (webin kokoaKonteksti, yksi merkkijono) ------------------------------

        // --- pelin oma aineisto (web haeAineisto, kokoaKonteksti, poimiLinkit; PuluHaku.cs) ------

        const int AineistonKatto = 1900;
        List<PuluHaku.Katkelma> viimeisetKatkelmat = new List<PuluHaku.Katkelma>();

        /// <summary>Web haeAineisto: osuvimmat katkelmat; oman kaupungin ja maan jutut painavat enemmän.</summary>
        List<PuluHaku.Katkelma> HaeAineisto(string kysymys)
        {
            PuluHaku.Valmistele();
            var o = PeliOhjain.Instanssi;
            string kaupunki = null;
            if (o?.Matka != null && o.Matka.Tila.Pelaaja.Sijainti.Kaupungissa) kaupunki = o.Matka.Tila.Pelaaja.Sijainti.Kaupunki;
            string maa = UiSisalto.Kaupunki(kaupunki)?.Maa;
            // Minitehtävän fakta vain, kun pelaaja on vastannut siihen (web tehtavaRatkaistu).
            viimeisetKatkelmat = PuluHaku.Hae(kysymys, kaupunki, maa,
                aihe => kaupunki != null && (o?.Kaupat?.MinitehtavaVastattu(kaupunki, aihe) ?? false));
            return viimeisetKatkelmat;
        }

        /// <summary>Web reittiAvattavissa: lehti on olemassa; nähtävyysjuttu vain siinä kaupungissa, jossa pelaaja on.</summary>
        static bool ReittiAvattavissa(PuluHaku.Reitti r)
        {
            if (r == null) return false;
            switch (r.Tyyppi)
            {
                case "maalehti": return UiSisalto.Maa(r.Tunniste) != null;
                case "kaupunkilehti": return UiSisalto.Kaupunki(r.Tunniste) != null;
                case "nahtavyys":
                    var (k, kohde) = Nahtavyys(r);
                    return k != null && NahtavyysAvattavissa(k, kohde);
                default: return false;
            }
        }

        static (Kohdekartta, KohdekarttaKohde) Nahtavyys(PuluHaku.Reitti r)
        {
            var k = Kohdekartat.Kaikki.FirstOrDefault(x => x.Kaupunki == r.Tunniste);
            var kohde = k?.Kohteet.FirstOrDefault(x => x.Nimi == r.Kohde && x.Juttu != null);
            return kohde == null ? (null, null) : (k, kohde);
        }

        /// <summary>Web poimiLinkit: eri reitit, vain avattavat, enintään kaksi.</summary>
        List<PuluHaku.Reitti> PoimiLinkit()
        {
            var nahdyt = new HashSet<string>();
            var ulos = new List<PuluHaku.Reitti>();
            foreach (var k in viimeisetKatkelmat)
            {
                var r = k.Reitti;
                if (r == null) continue;
                string avain = r.Tyyppi + ":" + r.Tunniste + ":" + (r.Sivu ?? r.Kohde ?? "");
                if (nahdyt.Contains(avain) || !ReittiAvattavissa(r)) continue;
                nahdyt.Add(avain);
                ulos.Add(r);
                if (ulos.Count >= PuluHaku.LinkkiKatto) break;
            }
            return ulos;
        }

        /// <summary>Web liitaMatkakirjalinkit: "Matkakirja: A · B" vastauksen alle, pienempänä kuin puhe.</summary>
        void Matkakirjalinkit()
        {
            var linkit = PoimiLinkit();
            if (linkit.Count == 0) return;
            var sb = new StringBuilder("Matkakirja: ");
            for (int i = 0; i < linkit.Count; i++)
            {
                if (i > 0) sb.Append(" · ");
                string nimi = linkit[i].Nimi ?? linkit[i].Otsikko ?? linkit[i].Leima ?? "lue";
                sb.Append("<link=\"").Append(i).Append("\"><color=#7a5514><u>").Append(nimi.Replace("<", "")).Append("</u></color></link>");
            }
            var rivi = Viesti("mk-chat__matkakirja", sb.ToString());
            rivi.enableRichText = true;
            rivi.pickingMode = PickingMode.Position;
            rivi.RegisterCallback<UnityEngine.UIElements.Experimental.PointerUpLinkTagEvent>(e =>
            {
                if (int.TryParse(e.linkID, out int i) && i >= 0 && i < linkit.Count) AvaaLinkki(linkit[i]);
            });
        }

        /// <summary>
        /// Web avaaLinkki/avaaKohde: nähtävyys kuvakortin kautta chatin päälle; lehti on kokoruudun tila,
        /// joten chat väistyy ja lehti aukeaa oikealle sivulle.
        /// </summary>
        bool AvaaLinkki(PuluHaku.Reitti r)
        {
            if (r == null || !UiNakymat.Olemassa) return false;
            var ui = UiNakymat.Hae();
            var o = PeliOhjain.Instanssi;
            switch (r.Tyyppi)
            {
                case "nahtavyys":
                    var (k, kohde) = Nahtavyys(r);
                    return k != null && AvaaNahtavyys(k, kohde);
                case "maalehti":
                    Sulje();
                    if (o == null || o.LueMaalehti(r.Tunniste, r.Sivu) != null) ui.Lehti.Nayta(LehtiLaji.Maa, r.Tunniste, r.Sivu);
                    return true;
                case "kaupunkilehti":
                    Sulje();
                    if (o != null && o.LueLehti(r.Tunniste) == null) ui.Lehti.SiirryAiheeseen(r.Sivu);
                    else ui.Lehti.Nayta(LehtiLaji.Kaupunki, r.Tunniste, r.Sivu);
                    return true;
            }
            return false;
        }

        string Konteksti(List<PuluHaku.Katkelma> aineisto = null)
        {
            var sb = new StringBuilder();
            var o = PeliOhjain.Instanssi;
            sb.Append("Lauta: Maailmankartta");
            string kaupunki = null;
            /*
             * ASTRONAUTIN KAMERASSA EI OLE SIJAINTIA (web pollo.js lueNakyma + astronautinKameraPaalla,
             * omistajan build 9 -löydös 35): pelaaja on radalla, ei kaupungissa, joten kaupunki, maa,
             * matkapäivä ja isoisän merkintä jäävät pois. Tilalle avoin valokuva ja sen näkyvä selite
             * (web kokoaKonteksti: heti näkymärivin perässä).
             */
            var linssit = UiNakymat.Hae()?.Linssit;
            bool avaruudessa = linssit?.Auki?.Tiedot?.Id == LinssiUi.AstronauttiId;
            if (avaruudessa)
            {
                sb.Append("\nNäkymä: Astronautin kamera: valokuva avaruudesta, ei pelaajan sijaintia");
                if (linssit.Astronautti?.Kuva?.AvoinKuva is var (nimi, seutu, selite) && !string.IsNullOrWhiteSpace(nimi))
                {
                    sb.Append("\nAvattu valokuva avaruudesta: ").Append(nimi.Trim());
                    if (!string.IsNullOrWhiteSpace(seutu)) sb.Append(" (").Append(seutu.Trim()).Append(')');
                    if (!string.IsNullOrWhiteSpace(selite)) sb.Append("\nValokuvan selite: ").Append(selite.Trim());
                }
            }
            else if (o?.Matka != null)
            {
                var s = o.Matka.Tila.Pelaaja.Sijainti;
                if (s.Kaupungissa) kaupunki = s.Kaupunki;
                var k = UiSisalto.Kaupunki(kaupunki);
                if (k != null)
                {
                    sb.Append("\nKaupunki, jossa pelaaja on: ").Append(k.Nimi);
                    if (k.MaaNimi != null) sb.Append("\nMaa, jossa pelaaja on: ").Append(k.MaaNimi);
                }
                sb.Append("\nMatkapäivä: ").Append(o.Matka.Tila.Paiva());
                // Avoin linssi kartan tilalle (web pollo.js avoinLinssi, Päätoimittaja 1.10.2026): Ihmisen matkan aikana
                // näkymä oli "kartta". Lehti ja kortti voittavat linssin kuten webissä.
                var linssi = linssit?.Auki?.Tiedot;
                string pohja = linssi != null ? "linssi auki: " + (string.IsNullOrWhiteSpace(linssi.Nimi) ? linssi.Id : linssi.Nimi.Trim()) : "kartta";
                sb.Append("\nNäkymä: ").Append(o.LehtiAuki ? "kaupunkilehti" : o.KorttiKaupunki != null ? "kaupunkikortti: " + (UiSisalto.Kaupunki(o.KorttiKaupunki)?.Nimi ?? o.KorttiKaupunki) : pohja);
            }
            // Kortin aihe (web kokoaKonteksti kohde) vain kysymyksen omassa pyynnössä (aineisto != null), ei ehdotuksissa.
            return KontekstinLoppu(sb, aineisto != null ? kysymyksenAihe : null, avaruudessa ? null : kaupunki, aineisto);
        }

        /// <summary>
        /// PULUN ESIGENEROINTI (omistaja 9.10.2026, PuluVienti): kohdan konteksti samassa muodossa kuin pelaajan pyynnössä, kun pelaaja
        /// on kohteen kaupungissa ja kartalla, mutta ilman matkapäivää (vaihtelee pelaajittain).
        /// </summary>
        internal static string EsigenerointiKonteksti(Aihe aihe, string kaupunki, List<PuluHaku.Katkelma> aineisto)
        {
            var sb = new StringBuilder("Lauta: Maailmankartta");
            var k = UiSisalto.Kaupunki(kaupunki);
            if (k != null)
            {
                sb.Append("\nKaupunki, jossa pelaaja on: ").Append(k.Nimi);
                if (k.MaaNimi != null) sb.Append("\nMaa, jossa pelaaja on: ").Append(k.MaaNimi);
            }
            sb.Append("\nNäkymä: kartta");
            return KontekstinLoppu(sb, aihe, k != null ? kaupunki : null, aineisto);
        }

        /// <summary>Kontekstin loppu: kortin aihe, isoisän merkintä (kaupunki) ja pelin aineisto; katto KontekstiKatto.</summary>
        static string KontekstinLoppu(StringBuilder sb, Aihe aihe, string kaupunki, List<PuluHaku.Katkelma> aineisto)
        {
            if (aihe?.Nimi != null)
            {
                sb.Append('\n').Append(aihe.Otsake).Append(": ").Append(aihe.Nimi.Trim());
                if (aihe.Tyyppi != null) sb.Append(" (").Append(aihe.Tyyppi).Append(')');
                if (aihe.Teksti != null)
                {
                    var t0 = aihe.Teksti.Trim();
                    sb.Append("\nTietoruudun teksti: ").Append(t0.Length > KohteenKatto ? t0.Substring(0, KohteenKatto - 1) + "…" : t0);
                }
            }
            var v = Fokusvirrat.Hae(kaupunki);
            if (v?.Teksti != null)
                sb.Append("\nIsoisän matkakirjamerkintä: ").Append(v.Teksti.Length > 900 ? v.Teksti.Substring(0, 900) : v.Teksti);
            var t = sb.ToString();
            if (aineisto != null && aineisto.Count > 0)
            {
                var osio = new StringBuilder("\n\nPELIN TARKISTETTUA AINEISTOA (käytä ensisijaisesti tätä):");
                foreach (var pala in aineisto)
                {
                    string rivi = "\n- [" + pala.Leima + "] " + pala.Teksti;
                    if (osio.Length + rivi.Length > AineistonKatto) break;
                    osio.Append(rivi);
                }
                if (t.Length + osio.Length <= KontekstiKatto) t += osio.ToString();
            }
            return t.Length > KontekstiKatto ? t.Substring(0, KontekstiKatto) : t;
        }

        // --- paikka kartalla (webin pulu-paikka) -----------------------------------------

        bool LennaTunnettuun(string teksti)
        {
            // Pisin osuva kaupungin nimi kysymyksessä (oma aineisto ennen mallin koordinaatteja).
            KaupunkiTiedot paras = null;
            foreach (var k in UiSisalto.Kaikki)
                if (!string.IsNullOrEmpty(k.Nimi) && k.Nimi.Length > (paras?.Nimi.Length ?? 2)
                    && teksti.IndexOf(k.Nimi, StringComparison.OrdinalIgnoreCase) >= 0) paras = k;
            if (paras == null || double.IsNaN(paras.Lat)) return false;
            Lenna(paras.Lat, paras.Lon, paras.Nimi);
            return true;
        }

        void LennaPaikkaan(Dictionary<string, object> p)
        {
            var nimi = MiniJson.Teksti(p, "nimi");
            if (nimi != null && LennaTunnettuun(nimi)) return;
            var lat = MiniJson.Luku(p, "lat");
            var lon = MiniJson.Luku(p, "lon");
            if (lat.HasValue && lon.HasValue) Lenna(lat.Value, lon.Value, nimi ?? "");
        }

        void Lenna(double lat, double lon, string nimi)
        {
            var kierto = UnityEngine.Object.FindAnyObjectByType<PalloKierto>();
            if (kierto == null) return;
            paluupaikka ??= (kierto.leveys, kierto.pituus, kierto.korkeus);
            kierto.Aja(lat, lon, kierto.KorkeusKaarelle(18.6), 1.5f, null);
            palaa.Q<Label>(className: "mk-nappi__teksti").text = nimi.Length > 0 ? Kieli.T("ui.pulu.palaa-nimi", nimi) : Kieli.T("ui.pulu.palaa");
            palaa.style.display = DisplayStyle.Flex;
            Viesti("mk-chat__paikkarivi", Kieli.T("ui.pulu.naytan-kartalla", nimi));
        }

        void Palaa()
        {
            palaa.style.display = DisplayStyle.None;
            if (paluupaikka == null) return;
            var (lat, lon, korkeus) = paluupaikka.Value;
            paluupaikka = null;
            UnityEngine.Object.FindAnyObjectByType<PalloKierto>()?.Aja(lat, lon, korkeus, 1.2f, null);
        }

        // --- ääni ---------------------------------------------------------------------------

        static bool AaniPaalla => PlayerPrefs.GetInt(AaniAvain, 0) == 1;

        // --- puhekeskustelu (web luentaPaalla, asetaPuheTila, puheAlkoi, lopetaPuheVuoro, vahdiPuheVuoroa) ---

        static string PuheMiettii => Kieli.T("ui.pulu.mietin");
        static string PuhePuhuu => Kieli.T("ui.pulu.puhun");

        sealed class PuheVuoro { public double Alku; public Puhe Kuunneltu; public IVisualElementScheduledItem Vahti; }

        PuheVuoro puheVuoro;
        string puheTila;

        /// <summary>Viimeisimmän puhevuoron viive kysymyksen lähdöstä ensimmäiseen ääneen, ms (-1 = ei vielä; web 2,4–3,2 s).</summary>
        public static double ViimeisinPuheViive { get; private set; } = -1;

        /// <summary>Testikomento ui chat puhetila: tila (miettii/puhuu/-), vuoro auki, viimeisin viive.</summary>
        public string PuheTilaTeksti => $"{puheTila ?? "-"} vuoro={(puheVuoro != null ? "auki" : "ei")} viive={(ViimeisinPuheViive < 0 ? "-" : ViimeisinPuheViive.ToString("0") + " ms")}";

        /// <summary>Luetaanko vastaus ääneen: kaiutinvipu TAI saneltu kysymys (puhekeskustelu).</summary>
        bool LuentaPaalla => AaniPaalla || puheVuoro != null;

        /// <summary>Sanelun tilarivi ja mikki puhevuoron mukaan: "miettii" | "puhuu" | null (web asetaPuheTila).</summary>
        void AsetaPuheTila(string tila)
        {
            string vanha = puheTila;
            puheTila = tila;
            // Tilarivi on sanelun: tyhjennetään vain oma puherivi, ei sanelun virhelausetta.
            if (tila != null || saneluTila.text == PuheMiettii || saneluTila.text == PuhePuhuu)
                AsetaSaneluTila(tila == "puhuu" ? PuhePuhuu : tila == "miettii" ? PuheMiettii : null);
            mikki.EnableInClassList("mk-chat__mikki--puhevuoro", tila != null);
            if (!kuuntelee) mikki.tooltip = Kieli.T(tila != null ? "ui.pulu.hiljenna" : "ui.pulu.kysy-aaneen");
            if (vanha != tila) Debug.Log("MATKAKIRJA pulu: puhetila " + (tila ?? "-"));
        }

        /// <summary>Vastaus ääneen (kaiutin tai puhevuoro); puhevuorossa ensimmäinen ääni vaihtaa "Mietin" → "Puhun".</summary>
        void LueVastaus(string teksti)
        {
            if (!LuentaPaalla || string.IsNullOrWhiteSpace(teksti)) { LopetaPuheVuoro(); return; }
            var puhe = Puhe.Hae();
            var vuoro = puheVuoro;
            KuunteleVuoroa(puhe);
            // Pulun ääni lukee palavirtana (Puhe.Virta): ensimmäinen lyhyt pala soi ennen kuin koko vastaus on syntetisoitu.
            bool alkoi = puhe != null && puhe.Lue(teksti, "pollo", loppu: () => { if (puheVuoro == vuoro) LopetaPuheVuoro(); });
            if (vuoro != null && !alkoi) LopetaPuheVuoro();
        }

        /// <summary>Puhevuoro kuulee Pulun puheen alun (Puhe.Puhuu) "Mietin" → "Puhun" -vaihtoa ja viivettä varten.</summary>
        void KuunteleVuoroa(Puhe puhe)
        {
            var vuoro = puheVuoro;
            if (vuoro == null || puhe == null || vuoro.Kuunneltu != null) return;
            vuoro.Kuunneltu = puhe;
            puhe.Puhuu += PuheMuuttui;
        }

        /// <summary>
        /// Varavahti (web vahdiPuheVuoroa 400 ms): vuoro päättyy, kun Pulun puhe ei enää lataa eikä soi (luentaa ei
        /// syntynyt, synteesi petti, luenta korvattiin toisella äänellä tai pysäytettiin muualta). Palan uusinnan tauko
        /// (Puhe.SoitaPalat 1–4 s, ViimeVirhe asetettu) ei vielä lopeta vuoroa, luovutettu pala 5 s:n jälkeen.
        /// </summary>
        void VahdiPuheVuoroa()
        {
            var vuoro = puheVuoro;
            if (vuoro == null || vuoro.Vahti != null) return;
            double hiljaaAlkaen = -1;
            vuoro.Vahti = paneeli.schedule.Execute(() =>
            {
                if (puheVuoro != vuoro) return;
                var p = vuoro.Kuunneltu ?? Puhe.Instanssi;
                bool pulunPuhe = p != null && (p.SoivaUrl?.StartsWith("puhe:pollo:", StringComparison.Ordinal) ?? false);
                double nyt = Time.realtimeSinceStartupAsDouble;
                if (pulunPuhe) { hiljaaAlkaen = -1; return; }
                if (hiljaaAlkaen < 0) hiljaaAlkaen = nyt;
                if (p?.ViimeVirhe == null || nyt - hiljaaAlkaen >= 5.0) LopetaPuheVuoro();
            }).Every(400).StartingIn(400);
        }

        // --- virkevirta: luenta striimin rinnalla (web syotaLuennalle, luettavaRaja, paataLuenta, peruLuenta) ---

        /// <summary>
        /// Virkevirta päällä (oletus, web): luenta alkaa ensimmäisestä valmiista virkkeestä kesken striimin. Pois =
        /// vastaus luetaan valmiina (vertailumittaus, komento ui chat virta pois|paalle).
        /// </summary>
        public static bool Virkevirta = true;

        /// <summary>Web VIRKKEEN_RAJA: välimerkki, valinnainen lainaus- tai sulkumerkki, sitten tyhjä tai loppu.</summary>
        static readonly Regex VirkkeenRaja = new Regex(@"[.!?…][""»)\]]?(\s|$)");

        Puhe.Virtaluenta luentaVirta;
        int luettuun;
        /// <summary>Mikki hiljensi tämän vastauksen: virta ei käynnisty uudelleen kesken striimin (kaiutin päällä).</summary>
        bool luentaHiljennetty;

        /// <summary>
        /// Web luettavaRaja: kuinka pitkälti kertymä on varmasti valmista luettavaksi. Avoimen [[:n jälkeinen odottaa
        /// sulkua, ja raja on viimeisen virkkeen lopussa (kesken lauseen katkaistu lausuma kuulostaisi änkytykseltä).
        /// </summary>
        /// <param name="alku">
        /// ENSIMMÄINEN PALA (Päätoimittaja 28.9.: yhden virkkeen vastaus odotti koko virkkeen, iPhone 6,9 s / iPad 14,7 s;
        /// sama sääntö webiin, Pelikoodari): kun mitään ei ole vielä luettu eikä virkettä ole valmiina, raja on
        /// ensimmäinen lauseke-ero [,;:] tai " – "/" — " vähintään 3 sanan jälkeen, muuten 8. kokonaisen sanan jälkeinen tyhjä.
        /// </param>
        internal static int LuettavaRaja(string teksti, bool alku = false)
        {
            string koko = teksti ?? "";
            int auki = koko.LastIndexOf("[[", StringComparison.Ordinal), kiinni = koko.LastIndexOf("]]", StringComparison.Ordinal);
            string varma = auki > kiinni ? koko.Substring(0, auki) : koko;
            int raja = 0;
            foreach (Match m in VirkkeenRaja.Matches(varma)) raja = m.Index + m.Length;
            if (raja > 0 || !alku) return raja;
            foreach (Match m in LausekeRaja.Matches(varma))
                if (Sanoja(varma.Substring(0, m.Index)) >= EkapalanLausekeSanat) return m.Index + m.Length;
            int sanoja = 0;
            foreach (Match m in KokonainenSana.Matches(varma))
                if (++sanoja == EkapalanSanat) return m.Index + m.Length;
            return 0;
        }

        const int EkapalanLausekeSanat = 3, EkapalanSanat = 8;
        /// <summary>Lauseke-ero: [,;:] tai ajatusviiva välilyöntien välissä, perässä tyhjä (luku "1,5" ei katkaise).</summary>
        static readonly Regex LausekeRaja = new Regex(@"(?:[,;:]|\s[–—])\s");
        /// <summary>Sana, jonka perässä on tyhjä (puolikas sana striimin lopussa ei kelpaa).</summary>
        static readonly Regex KokonainenSana = new Regex(@"\S*[\p{L}\p{N}]\S*\s+");

        /// <summary>Sanat, joissa on kirjain tai numero (irrallinen ajatusviiva ei ole sana).</summary>
        static int Sanoja(string t) => Regex.Matches(t, @"\S*[\p{L}\p{N}]\S*").Count;

        /// <summary>Striimin pala luennalle (web syotaLuennalle): virta käynnistyy laiskasti ensimmäisestä valmiista virkkeestä.</summary>
        void SyotaLuennalle(string kertynyt)
        {
            if (!Virkevirta || !LuentaPaalla || luentaHiljennetty || !Auki) return;
            int raja = LuettavaRaja(kertynyt, luettuun == 0);
            if (raja <= luettuun) return;
            if (luentaVirta == null)
            {
                var puhe = Puhe.Hae();
                if (puhe == null) return;
                var vuoro = puheVuoro;
                KuunteleVuoroa(puhe);
                Puhe.Virtaluenta virta = null;
                virta = puhe.LueVirtana("pollo", () =>
                {
                    if (luentaVirta == virta) luentaVirta = null;
                    if (vuoro != null && puheVuoro == vuoro) LopetaPuheVuoro();
                });
                luentaVirta = virta;
                if (virta == null) return;
            }
            // Kaiutin kytketty kesken striimin: luettuun = 0, joten jo saapunut alku luetaan ensin (web).
            string pala = Puhuttava(kertynyt.Substring(luettuun, raja - luettuun)).Trim();
            luettuun = raja;
            if (pala.Length > 0) luentaVirta.Lisaa(pala);
        }

        /// <summary>Striimin loppu luennalle (web paataLuenta): viimeinen vajaa virke ja päätös. true = virta hoiti vastauksen.</summary>
        bool PaataLuenta(Tulos t)
        {
            var virta = luentaVirta;
            int mihin = luettuun;
            luentaVirta = null;
            luettuun = 0;
            if (virta == null || !virta.Voimassa) return virta != null;
            // Loppu-tapahtuman vastaus jatkaa samaa tekstiä (worker jatkaa sanarajaan pysähtyneen); muuten kertymä.
            string kertynyt = t.Kertynyt ?? "";
            string lahde = t.Vastaus != null && mihin <= kertynyt.Length && t.Vastaus.Length >= mihin
                && string.CompareOrdinal(t.Vastaus, 0, kertynyt, 0, mihin) == 0 ? t.Vastaus : kertynyt;
            string hanta = mihin < lahde.Length ? Puhuttava(lahde.Substring(mihin)).Trim() : "";
            if (hanta.Length > 0) virta.Lisaa(hanta);
            virta.Paata();
            return true;
        }

        /// <summary>Kesken jäänyt virtaluenta pois (sulku, virhe, mikki): web peruLuenta.</summary>
        void PeruLuenta()
        {
            var virta = luentaVirta;
            luentaVirta = null;
            luettuun = 0;
            if (virta != null && virta.Voimassa) Puhe.Instanssi?.Pysayta(0.2f);
        }

        void PuheMuuttui(bool puhuu)
        {
            // Puhe.Puhuu(true) = ensimmäisen palan klippi käynnistyi (AloitaKlippi → Play): nyt kuuluu ääni.
            var vuoro = puheVuoro;
            if (!puhuu || vuoro == null || puheTila == "puhuu") return;
            ViimeisinPuheViive = (Time.realtimeSinceStartupAsDouble - vuoro.Alku) * 1000.0;
            Debug.Log($"MATKAKIRJA pulu: puheviive {ViimeisinPuheViive:0} ms (kysymyksen lähdöstä ensimmäiseen ääneen)");
            AsetaPuheTila("puhuu");
        }

        /// <summary>Puhevuoro loppuu: luenta valmis, virhe, uusi kysymys, chatin sulku tai mikki (hiljaa).</summary>
        void LopetaPuheVuoro(bool hiljaa = false)
        {
            var vuoro = puheVuoro;
            if (vuoro == null && puheTila == null) return;
            puheVuoro = null;
            if (vuoro != null)
            {
                vuoro.Vahti?.Pause();
                if (vuoro.Kuunneltu != null) vuoro.Kuunneltu.Puhuu -= PuheMuuttui;
            }
            if (hiljaa)
            {
                // Vastaus voi yhä virrata: luenta ei saa käynnistyä uudelleen tämän vastauksen aikana.
                if (kysyy) luentaHiljennetty = true;
                PeruLuenta();
                PysaytaPulunPuhe();
            }
            AsetaPuheTila(null);
        }

        /// <summary>Pysäyttää Pulun luennan (latautuva tai soiva), ei muiden persoonien puhetta.</summary>
        static void PysaytaPulunPuhe()
        {
            var p = Puhe.Instanssi;
            if (p != null && (p.SoivaUrl?.StartsWith("puhe:pollo:", StringComparison.Ordinal) ?? false)) p.Pysayta(0.2f);
        }

        /// <summary>Testikomento (ui chat aani): kaiutinkytkin kuin napautus; palauttaa uuden tilan.</summary>
        public bool VaihdaAaniTesti() { VaihdaAani(); return AaniPaalla; }

        /// <summary>Testikomento ui chat lukija [valikko]: kaiuttimen napautus (tai valikko auki); tila lokiin.</summary>
        public string LukijaTesti(bool valikko)
        {
            if (valikko) lukija.AvaaValikko(); else lukija.Paina();
            return valikko ? "valikko" : lukija.Lukee ? "lukee" : "hiljaa";
        }

        void VaihdaAani()
        {
            PlayerPrefs.SetInt(AaniAvain, AaniPaalla ? 0 : 1);
            PlayerPrefs.Save();
            PaivitaKaiutin();
            Debug.Log("MATKAKIRJA ui chat: kaiutin " + (AaniPaalla ? "Auto" : "ei luentaa"));
            // Ei luentaa: käynnissä oleva Pulun luenta loppuu heti.
            if (!AaniPaalla && OmaLuentaKaynnissa) Puhe.Instanssi?.Pysayta(0.3f);
            if (AaniPaalla)
            {
                var viimeinen = virta.Query<Label>(className: "mk-chat__livia").Last();
                if (viimeinen != null && !kysyy) Puhe.Hae()?.Lue(viimeinen.text, "pollo");
            }
        }

        // --- sanelu (web vaihdaSanelu, aloitaNatiiviSanelu, saneluVirhe; Sanelu.cs Pelikoodarilta) -----

        static string SaneluKuuntelee => Kieli.T("ui.pulu.kuuntelen");
        static string SaneluKaynnistyy => Kieli.T("ui.pulu.kaynnistan-mikrofonia");
        internal const string MikkiIkoni = "<rect x=\"9\" y=\"2.8\" width=\"6\" height=\"11.4\" rx=\"3\"/>"
            + "<path d=\"M5.6 11.4a6.4 6.4 0 0 0 12.8 0\"/><path d=\"M12 17.8v3.4M8.6 21.2h6.8\"/>";
        const string PysaytysIkoni = "<rect class=\"taytto\" x=\"7.2\" y=\"7.2\" width=\"9.6\" height=\"9.6\" rx=\"1.6\"/>";
        internal const string NappaimistoIkoni = "<rect x=\"2.4\" y=\"6.2\" width=\"19.2\" height=\"11.6\" rx=\"2.2\"/>"
            + "<path d=\"M6 10h.01M9.3 10h.01M12.6 10h.01M15.9 10h.01M19.2 10h.01\"/>"
            + "<path d=\"M6 13h.01M9.3 13h.01M12.6 13h.01M15.9 13h.01M19.2 13h.01\"/><path d=\"M8.4 15.6h7.2\"/>";

        Label saneluTila;
        VisualElement lomake;
        Button mikki;
        VisualElement mikkiIkoni, lopetaIkoni, lopetaTeksti;
        bool sanelussa, kuuntelee;

        void AsetaSaneluTila(string t)
        {
            saneluTila.text = t ?? "";
            saneluTila.style.display = string.IsNullOrEmpty(t) ? DisplayStyle.None : DisplayStyle.Flex; // web :empty
        }

        /// <summary>Web naytaSyote: mikki vain, kun laite osaa sanella; sanelutilassa kirjoitusrivi piiloon.</summary>
        void NaytaSyote()
        {
            bool osaa = Sanelu.Saatavilla;
            mikki.style.display = osaa ? DisplayStyle.Flex : DisplayStyle.None;
            lomake.style.display = sanelussa && osaa ? DisplayStyle.None : DisplayStyle.Flex;
        }

        /// <summary>Web vaihdaTilaan: sanelu lopetetaan aina, kirjoitustilassa kenttä kohdistetaan pyydettäessä.</summary>
        void VaihdaTilaan(bool sanelu, bool kohdista = false)
        {
            LopetaSanelu();
            sanelussa = sanelu;
            NaytaSyote();
            if (!sanelu && kohdista) kentta.Focus();
        }

        void MerkitseMikki(bool paalla)
        {
            if (paalla && !kuuntelee) pulu.Tilanne("microphone");
            kuuntelee = paalla;
            mikki.EnableInClassList("mk-chat__mikki--kuuntelee", paalla);
            mikki.tooltip = Kieli.T(paalla ? "ui.pulu.lopeta-sanelu" : "ui.pulu.kysy-aaneen");
            mikkiIkoni.style.display = paalla ? DisplayStyle.None : DisplayStyle.Flex;
            lopetaIkoni.style.display = lopetaTeksti.style.display = paalla ? DisplayStyle.Flex : DisplayStyle.None;
        }

        /// <summary>Testikomento ui chat mikki: mikin napautus (puhevuorossa hiljentää Pulun).</summary>
        public void MikkiTesti() => VaihdaSanelu();

        /// <summary>Mikkinappi: kuunnellessa lopettaa ja lähettää (Sanelu.Lopeta → valmis), muuten aloittaa.</summary>
        /// <summary>Sanelu käyntiin, jos se ei jo ole (oppaan puhu/kirjoita-siru, omistaja 5.10.2026).</summary>
        public void AloitaSanelu()
        {
            if (Sanelu.Saatavilla && !Sanelu.Kaynnissa && puheVuoro == null) VaihdaSanelu();
        }

        void VaihdaSanelu()
        {
            // Puhevuoron aikana mikki hiljentää Pulun (web vaihdaSanelu): luenta seis, tilarivi tyhjäksi, vastaus jää.
            if (puheVuoro != null) { LopetaPuheVuoro(hiljaa: true); return; }
            if (Sanelu.Kaynnissa) { Sanelu.Lopeta(); return; }
            if (!sanelussa) { sanelussa = true; NaytaSyote(); }
            MerkitseMikki(true);
            AsetaSaneluTila(SaneluKaynnistyy);
            Sanelu.Aloita(
                osittainen: t => AsetaSaneluTila(string.IsNullOrWhiteSpace(t) ? SaneluKuuntelee : t.Trim()),
                valmis: t =>
                {
                    MerkitseMikki(false);
                    string teksti = (t ?? "").Trim();
                    AsetaSaneluTila(null);
                    // Tyhjä valmis = pelaaja lopetti ennen kuin mitään tunnistettiin (web: ei kysymystä, ei moitetta).
                    if (teksti.Length > 0) Kysy(teksti, puhe: true);
                },
                virhe: lause =>
                {
                    MerkitseMikki(false);
                    AsetaSaneluTila(lause);
                    if (Sanelu.ViimeisinVirhe == SaneluVirhe.Lupa)
                    {
                        sanelussa = false;
                        NaytaSyote();
                        Virhereaktio(0.5f);
                    }
                    else Virhereaktio(0.3f);
                });
        }

        void Virhereaktio(float voimakkuus) { if (Auki) pulu.Tilanne("error", tunne: "hammentynyt", voimakkuus: voimakkuus); }

        /// <summary>Web lopetaSanelu ilman lähetystä (paneeli kiinni, tilan vaihto).</summary>
        void LopetaSanelu()
        {
            if (Sanelu.Kaynnissa) Sanelu.Peruuta();
            if (kuuntelee) MerkitseMikki(false);
            AsetaSaneluTila(null);
        }

        Button kaiutinNappi;

        void PaivitaKaiutin()
        {
            if (autolukuTila != null) autolukuTila.text = Kieli.T(AaniPaalla ? "ui.yleinen.paalla" : "ui.yleinen.pois");
            if (kaiutinNappi == null) return;
            var ikoni = kaiutinNappi.Q<SvgIkoni>();
            if (ikoni != null) ikoni.Polku = AaniPaalla ? Ikonit.Viiva["kaiutin"] : Ikonit.Viiva["kaiutin-pois"];
            kaiutinNappi.tooltip = Kieli.T(AaniPaalla ? "ui.pulu.luenta-paalla" : "ui.pulu.luenta-pois");
        }

        /// <summary>Lukijan valikon rivi ääni-valitsimen paikalla: "Lue vastaukset automaattisesti" (kaiutinvipu).</summary>
        void RakennaAutoluku(VisualElement saadot)
        {
            autolukuTila = KortinLukija.KytkinRivi(saadot, Kieli.T("ui.pulu.lue-automaattisesti"), VaihdaAani);
            PaivitaKaiutin();
        }

        Button taukoNappi;
        bool taukoTauolla;

        /// <summary>
        /// Pulun luenta soi, on tauolla tai palojen välissä. Vastausvirta (luentaVirta) päättyy jo tekstin valmistuttua, vaikka
        /// ääni soi vielä, joten tauko tunnistetaan soivasta persoonasta (pollo), ei virrasta.
        /// </summary>
        bool PulunLuentaKesken
        {
            get
            {
                var p = Puhe.Instanssi;
                if (p == null || lukija.Lukee) return false;
                return p.PuluaaniSoi || (p.Tauolla && p.SoivaPersoona == "pollo") || luentaVirta != null;
            }
        }

        /// <summary>Tauko pyydetty palojen välissä (Puhe.Tauko onnistuu vasta, kun seuraava pala soi): yritetään uudelleen.</summary>
        bool taukoPyydetty;

        void VaihdaTauko()
        {
            var p = Puhe.Instanssi;
            if (p == null || !PulunLuentaKesken) return;
            if (p.Tauolla || taukoPyydetty) { taukoPyydetty = false; p.Jatka(); }
            else if (!p.Tauko()) taukoPyydetty = true;
            PaivitaTauko();
        }

        void PaivitaTauko()
        {
            var p = Puhe.Instanssi;
            // Myös palojen välissä (luentaVirta auki), ettei nappi välky virkkeiden välillä.
            bool nakyy = Auki && (PulunLuentaKesken || taukoPyydetty);
            if (!nakyy) taukoPyydetty = false;
            else if (taukoPyydetty && p != null && !p.Tauolla && p.Tauko()) taukoPyydetty = false;
            taukoNappi.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            bool tauolla = nakyy && (taukoPyydetty || (p != null && p.Tauolla));
            if (tauolla == taukoTauolla) return;
            taukoTauolla = tauolla;
            taukoNappi.Clear();
            taukoNappi.Add(new SvgIkoni(tauolla ? Ikonit.Toista : Ikonit.Tauko));
            taukoNappi.tooltip = Kieli.T(tauolla ? "ui.yleinen.jatka" : "ui.yleinen.tauko");
        }

        /// <summary>Pulun oma automaattinen luenta soi tai on tauolla (ei ylärivin lukijan käynnistämä).</summary>
        bool OmaLuentaKaynnissa
        {
            get
            {
                var p = Puhe.Instanssi;
                if (p == null || lukija.Lukee) return false;
                return p.PuluaaniSoi || (p.Tauolla && (luentaVirta != null || puheVuoro != null));
            }
        }

        /// <summary>Valmis vastaus ylärivin lukijalle (luettavaksi uudelleen, keskeytettäväksi tai kelattavaksi).</summary>
        void AsetaLukijalle(string vastaus)
        {
            if (string.IsNullOrWhiteSpace(vastaus)) return;
            lukija.Aseta(new[] { Puhuttava(vastaus) }, Kieli.T("ui.pulu.kuuntele-vastaus"));
            // Chatissa lukijan rivi on piilossa (kaksitilainen kaiutin, omistaja 16.4x).
            lukija.Juuri.style.display = DisplayStyle.None;
            lukija.Nappi.RemoveFromClassList("mk-lukija--keskeytetty");
        }
    }
}
