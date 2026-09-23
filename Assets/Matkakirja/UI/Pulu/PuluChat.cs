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
        const string EiNatiivissa = "Livian keskustelu ei vielä ole auki tässä sovelluksessa. Kupla ja äänet toimivat.";

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
        static readonly string[] Vastausmietinnat =
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
        int ehdotusPoletti;
        (double Lat, double Lon, double Korkeus)? paluupaikka;

        public bool Auki { get; private set; }

        public PuluChat(UiKerros kerros, Pulu pulu)
        {
            this.kerros = kerros;
            this.pulu = pulu;
            var juuri = kerros.Juuri(UiKerros.Valikot);
            sulkija = Rakenne.El("mk-sulkija", juuri);
            sulkija.style.display = DisplayStyle.None;
            sulkija.RegisterCallback<PointerDownEvent>(e => { Sulje(); e.StopPropagation(); });

            paneeli = Rakenne.El("mk-chat", juuri);
            paneeli.style.display = DisplayStyle.None;
            virta = new ScrollView(ScrollViewMode.Vertical);
            virta.AddToClassList("mk-chat__virta");
            virta.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            virta.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            paneeli.Add(virta);

            var rivi = Rakenne.El("mk-chat__rivi", paneeli, PickingMode.Ignore);
            kentta = new TextField { maxLength = KysymysKatto };
            kentta.AddToClassList("mk-chat__kentta");
            kentta.textEdition.placeholder = "Kysy pululta…";
            kentta.RegisterCallback<KeyDownEvent>(e => { if (e.keyCode == KeyCode.Return || e.keyCode == KeyCode.KeypadEnter) { Kysy(kentta.value); e.StopPropagation(); } });
            rivi.Add(kentta);
            var laheta = Rakenne.Nappi(null, "mk-chat__laheta", () => Kysy(kentta.value), rivi, Ikonit.Nuoli);
            laheta.tooltip = "Lähetä";
            kaiutin = Rakenne.Nappi(null, "mk-chat__kaiutin", VaihdaAani, rivi, Ikonit.Viiva["kaiutin"]);
            kaiutin.tooltip = "Lue vastaukset ääneen";
            PaivitaKaiutin();
            Kirjasimet.Aseta(paneeli, Kirjasin.Luku);
            Kirjasimet.Aseta(rivi, Kirjasin.Kone);

            // Webin "Palaa" kartan oikeassa yläkulmassa lennon jälkeen.
            palaa = Rakenne.Nappi("", "mk-chat__palaa", Palaa, kerros.Turva(UiKerros.Tilarivi));
            palaa.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(palaa, Kirjasin.Kone);

            kerros.TurvaMuuttui += Asettele;
            Asettele();
        }

        void Asettele()
        {
            var r = kerros.Reunat(UiKerros.Valikot);
            paneeli.style.left = r.x + 11;
            paneeli.style.right = r.z + 11;
            paneeli.style.bottom = r.w + 11;
            palaa.style.top = Ylapalkki.Korkeus + 56;
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
            pulu.Tilanne("chatOpen");
            if (!tervehditty) { tervehditty = true; Tervehdi(); }
            paneeli.EnableInClassList("mk-chat--alku", historia.Count == 0);
            HaeEhdotukset();
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            sulkija.style.display = DisplayStyle.None;
            Rakenne.Nayta(paneeli, false, 200);
            SyoteLukko.Vapauta(this);
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
            public List<string> Jatkot;
            public Dictionary<string, object> Paikka;
        }

        /// <summary>
        /// Pyyntö workerille paneelin kontekstilla, historialla ja kehyksellä; onnistunut
        /// vastaus menee historiaan. Kutsuja pitää kysyy-lukon (yksi pyyntö kerrallaan).
        /// </summary>
        IEnumerator Laheta(string kysymys, bool jatko, Action<Tulos> valmis)
        {
            var runko = new StringBuilder("{\"tehtava\":\"vastaus\",\"kysymys\":").Append(PeliApu.Json(kysymys))
                .Append(",\"konteksti\":").Append(PeliApu.Json(Konteksti()))
                .Append(",\"kehys\":").Append(PeliApu.Json(Kehys(kysymys, jatko)))
                .Append(",\"historia\":[");
            int alku = Mathf.Max(0, historia.Count - HistoriaKatto);
            for (int i = alku; i < historia.Count; i++)
            {
                if (i > alku) runko.Append(',');
                runko.Append("{\"rooli\":").Append(PeliApu.Json(historia[i].Rooli)).Append(",\"teksti\":").Append(PeliApu.Json(historia[i].Teksti)).Append('}');
            }
            runko.Append("]}");

            var t = new Tulos();
            using (var r = Pyynto(runko.ToString()))
            {
                yield return r.SendWebRequest();
                var json = MiniJson.Objekti(Jasenna(r.downloadHandler?.text));
                if (r.responseCode == 403) t.Virhe = EiNatiivissa;
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
                    if (MiniJson.Taulukko(MiniJson.Kentta(json, "jatkot")) is List<object> j)
                    {
                        t.Jatkot = new List<string>();
                        foreach (var x in j) if (x is string s) t.Jatkot.Add(s);
                    }
                    t.Paikka = MiniJson.Objekti(MiniJson.Kentta(json, "paikka"));
                    if (syy == null) { historia.Add(("kayttaja", kysymys)); historia.Add(("pollo", Nakyva(t.Vastaus))); }
                }
                else t.Virhe = EiSaanut;
            }
            valmis(t);
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
            yield return Laheta(kysymys, jatko, x => t = x);
            pitka.Pause();
            odotus.RemoveFromHierarchy();
            kysyy = false;

            if (t.Virhe != null)
            {
                Viesti("mk-chat__livia", t.Virhe);
                pulu.Tilanne("emotion", tunne: t.Uusittava ? "hammentynyt" : "vakava", voimakkuus: 0.5f);
                if (t.Uusittava) Sirut(new[] { "Yritä uudelleen" }, "mk-chat__uusinta", jatko);
                yield break;
            }
            string nakyva = Nakyva(t.Vastaus);
            Viesti("mk-chat__livia", nakyva);
            pulu.Tilanne("answer", nakyva);
            if (AaniPaalla) Puhe.Hae()?.Lue(nakyva, "pollo");
            if (paikkakysymys && !joLennetty && t.Paikka != null) LennaPaikkaan(t.Paikka);
            if (t.Uusittava) Sirut(new[] { "Yritä uudelleen" }, "mk-chat__uusinta", jatko);
            else Sirut(t.Jatkot, "mk-chat__jatkot", true);
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

        UnityWebRequest Pyynto(string runko)
        {
            var r = new UnityWebRequest(Palvelin, "POST")
            {
                uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(runko)) { contentType = "application/json" },
                downloadHandler = new DownloadHandlerBuffer(),
                timeout = 45,
            };
            r.SetRequestHeader("Content-Type", "application/json");
            r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            return r;
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
            var lista = MiniJson.Taulukko(MiniJson.Kentta(MiniJson.Objekti(Jasenna(r.downloadHandler.text)), "ehdotukset"));
            if (lista == null) yield break;
            var tekstit = new List<string>();
            foreach (var x in lista) if (x is string s && s.Length > 0) tekstit.Add(s);
            Sirut(tekstit, "mk-chat__ehdotukset", false);
        }

        // --- konteksti (webin kokoaKonteksti, yksi merkkijono) ------------------------------

        string Konteksti()
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

        void PaivitaKaiutin() => kaiutin.EnableInClassList("mk-valittu", AaniPaalla);
    }
}
