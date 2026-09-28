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

        const string TervehdysAlku = "Olen Livia, pulu — tuuraan Viisasta Pöllöä, kunnes se palaa. ";
        const string TervehdysYdin = "Kysy mitä vain, niin autan sinua eteenpäin.";
        const string TervehdysLoppu = " Pelin tehtäviä en ratkaise puolestasi.";
        const string EiSaanut = "Livia ei saanut kysymyksestä kiinni. Yritä hetken päästä uudelleen.";
        const string EiTullut = "Vastaus jäi matkalle eikä tullut perille. Kokeile uudelleen.";

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
        readonly ScrollView virta;
        readonly TextField kentta;
        readonly Button kaiutin, palaa;
        readonly VisualElement kaiutinPaalla, kaiutinPois;
        /// <summary>Web POLLO_KAIUTIN_IKONI pois-tilassa: kaiuttimen runko ja vinoviiva (.pollo-kaiutin-vino), ei aaltoja.</summary>
        const string KaiutinPoisIkoni = "<path d=\"M4.2 9.3h3.2l4.4-3.6v12.6l-4.4-3.6H4.2z\"/><path d=\"M3.4 3.4l17.2 17.2\"/>";
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

        public PuluChat(UiKerros kerros, Pulu pulu)
        {
            this.kerros = kerros;
            this.pulu = pulu;
            // Pulun omalla kerroksella: se nousee lehden päälle lehden ajaksi (UiNakymat.PulunKerros).
            var juuri = kerros.Juuri(Pulu.Kerros);
            sulkija = Rakenne.El("mk-sulkija", juuri);
            sulkija.style.display = DisplayStyle.None;
            sulkija.RegisterCallback<PointerDownEvent>(e => { Sulje(); e.StopPropagation(); });

            paneeli = Rakenne.El("mk-chat", juuri);
            // Löydös 91 (web .pollo-paneeli: --pollo-paperi + --paper-noise multiply): paperikohina kuten lippukortissa.
            Kuviot.AsetaArkki(paneeli);
            paneeli.style.display = DisplayStyle.None;
            // Ylärivi (web .pollo-ylarivi): "Näytä puhekuplat" tuo ohi menneen repliikin takaisin.
            var ylarivi = Rakenne.El("mk-chat__ylarivi", paneeli, PickingMode.Ignore);
            naytaKuplat = Rakenne.Nappi("Näytä puhekuplat", "mk-chat__pilleri", () => { Sulje(); pulu.NaytaViimeisinKupla(); }, ylarivi);
            naytaKuplat.tooltip = "Tuo ohi menneet puhekuplat takaisin näkyviin";
            Kirjasimet.Aseta(naytaKuplat, Kirjasin.Luku);
            // "Ehdota sisältöä" (web .pollo-ehdota): chat väistyy ja ehdotuslomake aukeaa tilanteen kanssa.
            var ehdota = Rakenne.Nappi("Ehdota sisältöä", "mk-chat__pilleri", EhdotaSisaltoa, ylarivi);
            ehdota.tooltip = "Ehdota sisältöä tähän kohtaan peliä";
            Kirjasimet.Aseta(ehdota, Kirjasin.Luku);
            virta = new ScrollView(ScrollViewMode.Vertical);
            virta.AddToClassList("mk-chat__virta");
            virta.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            virta.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            paneeli.Add(virta);

            // Syöte (web rakennaSyote): sanelun tilarivi, kirjoitusrivi (kenttä + →) ja matala nappirivi
            // (näppäimistö 1, kaiutin 1, mikrofoni 2). Sanelutilassa kirjoitusrivi on piilossa.
            var syote = Rakenne.El("mk-chat__syote", paneeli, PickingMode.Ignore);
            saneluTila = Rakenne.Teksti("", "mk-chat__sanelutila", syote);
            var rivi = Rakenne.El("mk-chat__rivi", syote, PickingMode.Ignore);
            lomake = rivi;
            kentta = new TextField { maxLength = KysymysKatto };
            kentta.AddToClassList("mk-chat__kentta");
            kentta.textEdition.placeholder = "Kysy pululta…";
            kentta.RegisterCallback<KeyDownEvent>(e => { if (e.keyCode == KeyCode.Return || e.keyCode == KeyCode.KeypadEnter) { Kysy(kentta.value); e.StopPropagation(); } });
            rivi.Add(kentta);
            var laheta = Rakenne.Nappi(null, "mk-chat__laheta", () => Kysy(kentta.value), rivi, Ikonit.Nuoli);
            laheta.tooltip = "Lähetä";
            var nappirivi = Rakenne.El("mk-chat__nappirivi", syote, PickingMode.Ignore);
            var kirjoita = Rakenne.Nappi(null, "mk-chat__nappula mk-chat__kirjoita", () => VaihdaTilaan(false, kohdista: true), nappirivi, NappaimistoIkoni);
            kirjoita.tooltip = "Kirjoita kysymys";
            // Kaiutinvivun tila näkyy kuvakkeessa (web PR #3366, omistaja 27.9.): päällä aallot, pois vinoviiva.
            kaiutin = Rakenne.Nappi(null, "mk-chat__nappula mk-chat__kaiutin", VaihdaAani, nappirivi);
            kaiutinPaalla = Rakenne.Ikoni(Ikonit.Viiva["kaiutin"], "mk-chat__kaiutin-paalla", kaiutin);
            kaiutinPois = Rakenne.Ikoni(KaiutinPoisIkoni, "mk-chat__kaiutin-pois", kaiutin);
            kaiutin.tooltip = "Lue vastaukset ääneen";
            mikki = Rakenne.Nappi(null, "mk-chat__nappula mk-chat__mikki", VaihdaSanelu, nappirivi);
            mikkiIkoni = Rakenne.Ikoni(MikkiIkoni, "mk-ikoni", mikki);
            lopetaIkoni = Rakenne.Ikoni(PysaytysIkoni, "mk-ikoni", mikki);
            lopetaTeksti = Rakenne.Teksti("Lopeta", "mk-chat__mikkiteksti", mikki);
            MerkitseMikki(false);
            PaivitaKaiutin();
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
            kerros.TurvaMuuttui += Asettele;
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
            var st = paneeli.style;
            st.left = pVasen;
            st.right = StyleKeyword.Auto;
            st.width = Mathf.Max(0f, pOikea - pVasen);
            st.bottom = h - pAla;
            st.minHeight = 0f;
            st.maxHeight = korkeus;
            AsetaKorkeus();
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
            paneeli.style.height = paneeli.ClassListContains("mk-chat--alku") ? new StyleLength(StyleKeyword.Auto) : korkeus;
        }

        // --- avaus ja sulkeminen -------------------------------------------------

        public void Vaihda() { if (Auki) Sulje(); else Avaa(); }

        public void Avaa()
        {
            if (Auki) return;
            Auki = true;
            sulkija.style.display = DisplayStyle.Flex;
            Rakenne.Nayta(paneeli, true, 200);
            SyoteLukko.Esta(this);
            Aanisoitin.Hiljennys("pollo", true);
            pulu.Tilanne("chatOpen");
            naytaKuplat.style.display = pulu.KuplaPalautettavissa ? DisplayStyle.Flex : DisplayStyle.None;
            if (!tervehditty) { tervehditty = true; Tervehdi(); }
            PuluHaku.Valmistele(); // web: indeksi laiskasti chatin ensimmäisellä avauksella
            Alku(historia.Count == 0);
            Asettele(); // lehti auki → pienempi pulu (web pieniPulu)
            // Linssin valmiit kysymykset tervehdyksen tilalla (web naytaValmiit → naytaLinssinValmiit).
            if (!NaytaLinssinValmiit()) HaeEhdotukset();
        }

        // --- linssin valmiit kysymykset (web naytaLinssinValmiit, vastaaLinssinValmiilla) ------------

        readonly Dictionary<string, HashSet<string>> linssiKysytyt = new Dictionary<string, HashSet<string>>();

        /// <summary>Jäljellä olevat valmiit kysymykset napeiksi; tosi, jos linssi tarjoaa kysymyksiä.</summary>
        bool NaytaLinssinValmiit()
        {
            var lk = LinssiKysymykset.Nykyinen();
            if (lk == null) return false;
            foreach (var e in virta.Query(className: "mk-chat__linssivalmiit").ToList()) e.RemoveFromHierarchy();
            linssiKysytyt.TryGetValue(lk.Avain, out var kysytyt);
            var jaljella = lk.Kysymykset.Where(k => kysytyt == null || !kysytyt.Contains(k)).ToList();
            if (jaljella.Count == 0) return true;
            var ryhma = Rakenne.El("mk-chat__sirut mk-chat__linssivalmiit", virta, PickingMode.Ignore);
            foreach (var t in jaljella)
            {
                string kysymys = t;
                var b = Rakenne.Nappi(kysymys, "mk-chat__siru", () => VastaaLinssinValmiilla(lk, kysymys), ryhma);
                Kirjasimet.Aseta(b, Kirjasin.Kone);
            }
            Vierita(ryhma);
            return true;
        }

        void VastaaLinssinValmiilla(LinssiKysymys lk, string kysymys)
        {
            if (kysyy) return;
            if (!linssiKysytyt.TryGetValue(lk.Avain, out var kysytyt)) linssiKysytyt[lk.Avain] = kysytyt = new HashSet<string>();
            kysytyt.Add(kysymys);
            // Ilman valmista vastausta sama polku kuin kirjoitettu kysymys (web kysy).
            if (!lk.Vastaukset.TryGetValue(kysymys.Trim(), out var v)) { Kysy(kysymys); return; }
            PoistaSirut();
            ehdotusPoletti++;
            Alku(false);
            Viesti("mk-chat__pelaaja", kysymys);
            var kupla = Viesti("mk-chat__livia mk-chat__valmisvastaus", Lukijaaani.PoistaPuhetagit(v.Vastaus));
            kupla.enableRichText = false;
            if (v.Lahteet.Count > 0)
            {
                var rivi = Rakenne.El("mk-chat__valmislahteet", virta, PickingMode.Ignore);
                Kirjasimet.Aseta(Rakenne.Teksti("Lähde:", "mk-chat__valmislahde", rivi), Kirjasin.Luku);
                foreach (var (url, otsikko) in v.Lahteet)
                {
                    string u = url;
                    Kirjasimet.Aseta(Rakenne.Nappi(otsikko, "mk-chat__valmislinkki", () => Application.OpenURL(u), rivi), Kirjasin.Luku);
                }
            }
            LopetaPuheVuoro();
            if (AaniPaalla) Puhe.Hae()?.Lue(v.Vastaus, "pollo");
            historia.Add(("kayttaja", kysymys));
            historia.Add(("pollo", v.Vastaus));
            NaytaLinssinValmiit();
            Vierita(kupla);
        }

        public void Sulje()
        {
            LopetaSanelu();
            // Web sulje: luenta pysähtyy (pysaytaLukija, kun luentaPaalla) ja puhevuoro päättyy.
            PeruLuenta();
            if (Auki && LuentaPaalla) PysaytaPulunPuhe();
            LopetaPuheVuoro();
            suurennos.Sulje();
            kuvakortti?.Sulje();
            if (!Auki) return;
            Auki = false;
            sulkija.style.display = DisplayStyle.None;
            Rakenne.Nayta(paneeli, false, 200);
            SyoteLukko.Vapauta(this);
            Aanisoitin.Hiljennys("pollo", false);
            pulu.Tilanne("chatClose");
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

        void Sirut(IList<string> tekstit, string luokka, bool jatko)
        {
            if (tekstit == null || tekstit.Count == 0) return;
            var ryhma = Rakenne.El("mk-chat__sirut " + luokka, virta, PickingMode.Ignore);
            for (int i = 0; i < Mathf.Min(2, tekstit.Count); i++)
            {
                string t = tekstit[i];
                var b = Rakenne.Nappi(t, "mk-chat__siru", () => { ryhma.RemoveFromHierarchy(); Kysy(t, jatko); }, ryhma);
                Kirjasimet.Aseta(b, Kirjasin.Kone);
            }
            Vierita(ryhma);
        }

        void PoistaSirut()
        {
            foreach (var e in virta.Query(className: "mk-chat__sirut").ToList()) e.RemoveFromHierarchy();
        }

        // --- kysymys ------------------------------------------------------------------

        /// <param name="puhe">saneltu kysymys = puhevuoro (web kysy { puhe: true }): vastaus luetaan aina</param>
        public void Kysy(string kysymys, bool jatko = false, bool puhe = false)
        {
            kysymys = (kysymys ?? "").Trim();
            if (kysymys.Length == 0 || kysyy) return;
            if (kysymys.Length > KysymysKatto) kysymys = kysymys.Substring(0, KysymysKatto);
            if (!Auki) Avaa();
            LopetaPuheVuoro();
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
            var runko = new StringBuilder("{\"tehtava\":\"vastaus\",\"kysymys\":").Append(PeliApu.Json(kysymys))
                .Append(",\"konteksti\":").Append(PeliApu.Json(Konteksti(HaeAineisto(kysymys))))
                .Append(",\"kehys\":").Append(PeliApu.Json(Kehys(kysymys, jatko)))
                // Äänitagit (omistaja 27.9. klo 23.1x): tämä versio siivoaa ne näytöltä (Nakyva), joten worker saa liittää
                // kehotteeseen tagisäännön; vanhat versiot eivät lähetä kenttää eivätkä saa tageja (web PR #3513).
                .Append(",\"puhetagit\":1")
                .Append(",\"historia\":[");
            int alku = Mathf.Max(0, historia.Count - HistoriaKatto);
            for (int i = alku; i < historia.Count; i++)
            {
                if (i > alku) runko.Append(',');
                runko.Append("{\"rooli\":").Append(PeliApu.Json(historia[i].Rooli)).Append(",\"teksti\":").Append(PeliApu.Json(historia[i].Teksti)).Append('}');
            }
            // Striimi (web pyydaStriimi, oletus): palat kuplaan heti, worker jatkaa sanarajaan pysähtyneen vastauksen.
            runko.Append("],\"striimi\":true}");

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
                    nappi.tooltip = "Näytä kuva isompana";
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
                nappi.tooltip = "Näytä kuva isompana";
                nappi.style.backgroundImage = new StyleBackground(t);
                // E12 (web avaaWikiKuva): kuvatekstinä vain artikkelin otsikko ja lähdelinkki, ei tiivistelmää.
                nappi.AddManipulator(new Clickable(() => suurennos.Avaa(new List<LehtiKuva>
                {
                    new LehtiKuva { Lahde = y.Kuva, Otsikko = y.Otsikko, Lyhyt = y.Otsikko, LahdeRivi = "Kuva: Wikipedia — " + y.Otsikko, LahdeUrl = y.Osoite },
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
        static string Kasitelinkit(string vastaus)
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
                Kysy("Kerro lisää: " + e.linkID, true);
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
            yield return Laheta(kysymys, jatko, x => t = x, teksti =>
            {
                // Ensimmäinen pala korvaa mietintärivin kuplalla, joka kasvaa paloittain (web striimikupla).
                if (string.IsNullOrEmpty(teksti)) return;
                if (osittainen == null)
                {
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
                var kesken = Viesti("mk-chat__livia", Nakyva(t.Vastaus).TrimEnd() + "\n\nAjatus katkesi kesken lauseen.");
                kesken.enableRichText = false;
                pulu.Tilanne("emotion", tunne: "hammentynyt", voimakkuus: 0.5f);
                Sirut(new[] { "Yritä uudelleen" }, "mk-chat__uusinta", jatko);
                yield break;
            }
            if (t.Virhe != null)
            {
                Viesti("mk-chat__livia", t.Virhe);
                pulu.Tilanne("emotion", tunne: t.Uusittava ? "hammentynyt" : "vakava", voimakkuus: 0.5f);
                if (t.Uusittava) Sirut(new[] { "Yritä uudelleen" }, "mk-chat__uusinta", jatko);
                yield break;
            }
            string nakyva = Nakyva(t.Vastaus);
            var kupla = Viesti("mk-chat__livia", Kasitelinkit(t.Vastaus));
            KytkeKasitelinkit(kupla);
            if (!t.Uusittava) Matkakirjalinkit();
            UiKerros.Hae().StartCoroutine(VastausKuva(kupla, t.Vastaus, kysymys));
            pulu.Tilanne("answer", nakyva);
            // Virkevirta luki jo alun striimin aikana: loppu perään (web paataLuenta), muuten koko vastaus nyt.
            // Mikki hiljensi Pulun kesken striimin: ei luentaa tälle vastaukselle (myöskään kaiuttimella).
            if (luentaHiljennetty) PeruLuenta();
            else if (!PaataLuenta(t)) LueVastaus(Puhuttava(t.Vastaus));
            VahdiPuheVuoroa();
            if (paikkakysymys && !joLennetty && t.Paikka != null) LennaPaikkaan(t.Paikka);
            if (!t.Uusittava) PoimintaRivi(kysymys, nakyva);
            if (t.Uusittava) Sirut(new[] { "Yritä uudelleen" }, "mk-chat__uusinta", jatko);
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
            nappi = Rakenne.Nappi(kehittaja ? "Tallenna juttuun" : "Ehdota tallennettavaksi", "mk-chat__poimintanappi", () =>
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
                    tila.text = ok ? "Tallennettu juttuun." : "Oli jo tallessa.";
                    // Alla oleva juttu on yhä auki: pillerit päivittyvät heti.
                    Poimintapillerit.Paivita(avain);
                    if (!ok) return;
                    // Kanava on varareitti: epäonnistuminen ei haittaa (vientilohko Kehittäjälehdessä).
                    Palautekanava.Postita("/laheta", kentat, null, t =>
                    {
                        if (rivi.panel != null && t.Ok) tila.text = "Tallennettu juttuun · lähti myös kuratointijonoon.";
                    });
                    return;
                }
                tila.text = "Lähetetään…";
                Palautekanava.Postita("/laheta", kentat, null, t =>
                {
                    if (rivi.panel == null) return;
                    if (t.Ok) { tila.text = "Kiitos! Ehdotus lähti kuratointiin."; return; }
                    tila.text = t.Estetty ? Palautekanava.Virheviesti(t) : "Ehdotus ei lähtenyt. Yritä myöhemmin uudelleen.";
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
            using var r = Pyynto("{\"tehtava\":\"ehdotukset\",\"konteksti\":" + PeliApu.Json(Konteksti()) + "}");
            yield return r.SendWebRequest();
            odotus.RemoveFromHierarchy();
            if (poletti != ehdotusPoletti || r.result != UnityWebRequest.Result.Success) yield break; // ei kriittinen
            var lista = Rakenne.Lista(MiniJson.Kentta(Rakenne.Olio(Jasenna(r.downloadHandler.text)), "ehdotukset"));
            if (lista == null) yield break;
            var tekstit = new List<string>();
            foreach (var x in lista) if (x is string s && s.Length > 0) tekstit.Add(s);
            Sirut(tekstit, "mk-chat__ehdotukset", false);
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
                sb.Append("\nNäkymä: ").Append(o.LehtiAuki ? "kaupunkilehti" : o.KorttiKaupunki != null ? "kaupunkikortti: " + (UiSisalto.Kaupunki(o.KorttiKaupunki)?.Nimi ?? o.KorttiKaupunki) : "kartta");
            }
            var v = avaruudessa ? null : Fokusvirrat.Hae(kaupunki);
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
            palaa.Q<Label>(className: "mk-nappi__teksti").text = "‹ Palaa" + (nimi.Length > 0 ? " · " + nimi : "");
            palaa.style.display = DisplayStyle.Flex;
            Viesti("mk-chat__paikkarivi", "› Näytän kartalla: " + nimi);
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

        const string PuheMiettii = "Mietin…", PuhePuhuu = "Puhun… napauta mikkiä, jos haluat keskeyttää";

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
            if (!kuuntelee) mikki.tooltip = tila != null ? "Hiljennä Pulu" : "Kysy ääneen";
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
        internal static int LuettavaRaja(string teksti)
        {
            string koko = teksti ?? "";
            int auki = koko.LastIndexOf("[[", StringComparison.Ordinal), kiinni = koko.LastIndexOf("]]", StringComparison.Ordinal);
            string varma = auki > kiinni ? koko.Substring(0, auki) : koko;
            int raja = 0;
            foreach (Match m in VirkkeenRaja.Matches(varma)) raja = m.Index + m.Length;
            return raja;
        }

        /// <summary>Striimin pala luennalle (web syotaLuennalle): virta käynnistyy laiskasti ensimmäisestä valmiista virkkeestä.</summary>
        void SyotaLuennalle(string kertynyt)
        {
            if (!Virkevirta || !LuentaPaalla || luentaHiljennetty) return;
            int raja = LuettavaRaja(kertynyt);
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

        void VaihdaAani()
        {
            PlayerPrefs.SetInt(AaniAvain, AaniPaalla ? 0 : 1);
            PlayerPrefs.Save();
            PaivitaKaiutin();
            if (AaniPaalla)
            {
                var viimeinen = virta.Query<Label>(className: "mk-chat__livia").Last();
                if (viimeinen != null && !kysyy) Puhe.Hae()?.Lue(viimeinen.text, "pollo");
            }
        }

        // --- sanelu (web vaihdaSanelu, aloitaNatiiviSanelu, saneluVirhe; Sanelu.cs Pelikoodarilta) -----

        const string SaneluKuuntelee = "Kuuntelen…", SaneluKaynnistyy = "Käynnistän mikrofonia…";
        const string MikkiIkoni = "<rect x=\"9\" y=\"2.8\" width=\"6\" height=\"11.4\" rx=\"3\"/>"
            + "<path d=\"M5.6 11.4a6.4 6.4 0 0 0 12.8 0\"/><path d=\"M12 17.8v3.4M8.6 21.2h6.8\"/>";
        const string PysaytysIkoni = "<rect class=\"taytto\" x=\"7.2\" y=\"7.2\" width=\"9.6\" height=\"9.6\" rx=\"1.6\"/>";
        const string NappaimistoIkoni = "<rect x=\"2.4\" y=\"6.2\" width=\"19.2\" height=\"11.6\" rx=\"2.2\"/>"
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
            mikki.tooltip = paalla ? "Lopeta sanelu" : "Kysy ääneen";
            mikkiIkoni.style.display = paalla ? DisplayStyle.None : DisplayStyle.Flex;
            lopetaIkoni.style.display = lopetaTeksti.style.display = paalla ? DisplayStyle.Flex : DisplayStyle.None;
        }

        /// <summary>Testikomento ui chat mikki: mikin napautus (puhevuorossa hiljentää Pulun).</summary>
        public void MikkiTesti() => VaihdaSanelu();

        /// <summary>Mikkinappi: kuunnellessa lopettaa ja lähettää (Sanelu.Lopeta → valmis), muuten aloittaa.</summary>
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

        void PaivitaKaiutin()
        {
            bool paalla = AaniPaalla;
            kaiutin.EnableInClassList("mk-valittu", paalla);
            kaiutinPaalla.style.display = paalla ? DisplayStyle.Flex : DisplayStyle.None;
            kaiutinPois.style.display = paalla ? DisplayStyle.None : DisplayStyle.Flex;
        }
    }
}
