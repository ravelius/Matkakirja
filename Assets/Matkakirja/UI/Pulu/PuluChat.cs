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
        readonly List<(string Rooli, string Teksti)> historia = new List<(string, string)>();
        readonly System.Random arpa = new System.Random();
        bool tervehditty, kysyy;
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
            kaiutin = Rakenne.Nappi(null, "mk-chat__nappula mk-chat__kaiutin", VaihdaAani, nappirivi, Ikonit.Viiva["kaiutin"]);
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

        void Asettele()
        {
            var r = kerros.Reunat(UiKerros.Valikot);
            paneeli.style.left = r.x + 11;
            paneeli.style.right = r.z + 11;
            paneeli.style.bottom = r.w + 11;
            palaa.style.top = Ylapalkki.Varaus + 56;
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
            paneeli.EnableInClassList("mk-chat--alku", historia.Count == 0);
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
            paneeli.RemoveFromClassList("mk-chat--alku");
            Viesti("mk-chat__pelaaja", kysymys);
            var kupla = Viesti("mk-chat__livia mk-chat__valmisvastaus", v.Vastaus);
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
            if (AaniPaalla) Puhe.Hae()?.Lue(v.Vastaus, "pollo");
            historia.Add(("kayttaja", kysymys));
            historia.Add(("pollo", v.Vastaus));
            NaytaLinssinValmiit();
            Vierita(kupla);
        }

        public void Sulje()
        {
            LopetaSanelu();
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

        public void Kysy(string kysymys, bool jatko = false)
        {
            kysymys = (kysymys ?? "").Trim();
            if (kysymys.Length == 0 || kysyy) return;
            if (kysymys.Length > KysymysKatto) kysymys = kysymys.Substring(0, KysymysKatto);
            if (!Auki) Avaa();
            kentta.value = "";
            PoistaSirut();
            ehdotusPoletti++;
            paneeli.RemoveFromClassList("mk-chat--alku");
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
        }

        /// <summary>
        /// Pyyntö workerille paneelin kontekstilla, historialla ja kehyksellä; onnistunut
        /// vastaus menee historiaan. Kutsuja pitää kysyy-lukon (yksi pyyntö kerrallaan).
        /// </summary>
        IEnumerator Laheta(string kysymys, bool jatko, Action<Tulos> valmis, Action<string> osittain = null)
        {
            var runko = new StringBuilder("{\"tehtava\":\"vastaus\",\"kysymys\":").Append(PeliApu.Json(kysymys))
                .Append(",\"konteksti\":").Append(PeliApu.Json(Konteksti(HaeAineisto(kysymys))))
                .Append(",\"kehys\":").Append(PeliApu.Json(Kehys(kysymys, jatko)))
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
            var sse = new SseKasittelija(osittain);
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
                string lahde = "Wikipedia · " + y.Otsikko;
                nappi.AddManipulator(new Clickable(() => suurennos.Avaa(new List<LehtiKuva>
                {
                    new LehtiKuva { Lahde = y.Kuva, Otsikko = y.Otsikko, Selite = y.Tiivistelma, LahdeRivi = lahde },
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
            string Suojaa(string x) => Nakyva(x).Replace("[[", "").Replace("]]", "").Replace("<", "<noparse><</noparse>");
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
        static string Nakyva(string vastaus) => Regex.Replace(vastaus ?? "", @"\[\[(?:[^\]|]*\|)?([^\]]*)\]\]", "$1");

        IEnumerator Pyyda(string kysymys, bool jatko, bool paikkakysymys, bool joLennetty)
        {
            kysyy = true;
            var odotus = Viesti("mk-chat__odottaa", Mietinta(true));
            var pitka = odotus.schedule.Execute(() => odotus.text = Pitkat[arpa.Next(Pitkat.Length)]).StartingIn(6000);
            pulu.Tilanne("answer", "hetkinen");

            Tulos t = null;
            Label osittainen = null;
            yield return Laheta(kysymys, jatko, x => t = x, teksti =>
            {
                // Ensimmäinen pala korvaa mietintärivin kuplalla, joka kasvaa paloittain (web striimikupla).
                if (string.IsNullOrEmpty(teksti)) return;
                if (osittainen == null)
                {
                    pitka.Pause();
                    odotus.style.display = DisplayStyle.None;
                    osittainen = Viesti("mk-chat__livia", teksti);
                    osittainen.enableRichText = false;
                }
                else osittainen.text = teksti;
            });
            pitka.Pause();
            odotus.RemoveFromHierarchy();
            osittainen?.RemoveFromHierarchy();
            kysyy = false;

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
            if (AaniPaalla) Puhe.Hae()?.Lue(nakyva, "pollo");
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
            readonly Action<string> osittain;
            readonly StringBuilder puskuri = new StringBuilder(), kaikki = new StringBuilder(), kertynyt = new StringBuilder();
            readonly Decoder dekooderi = Encoding.UTF8.GetDecoder();
            public Dictionary<string, object> Loppu;
            public string Virhe;
            public string Teksti => kaikki.ToString();
            public string Kertynyt => kertynyt.ToString();

            public SseKasittelija(Action<string> osittain) : base(new byte[4096]) { this.osittain = osittain; }

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
                    }
                    else if (laji == "loppu") Loppu = o;
                    else if (laji == "virhe") Virhe = MiniJson.Teksti(o, "viesti");
                }
            }

            /// <summary>Web poistaKasiteMerkinnat: valmiit [[a|b]] → b, ja keskeneräinen [[… lopussa piiloon.</summary>
            static string PoistaKesken(string t)
            {
                t = Nakyva(t);
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
            if (o?.Matka != null)
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

        /// <summary>Mikkinappi: kuunnellessa lopettaa ja lähettää (Sanelu.Lopeta → valmis), muuten aloittaa.</summary>
        void VaihdaSanelu()
        {
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
                    if (teksti.Length > 0) Kysy(teksti);
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

        void PaivitaKaiutin() => kaiutin.EnableInClassList("mk-valittu", AaniPaalla);
    }
}
