// UI:n testikomennot ilman kosketusta (Natiivi-UI), samalla tiedostoperiaatteella
// kuin PeliKomennot: Mac kirjoittaa sovelluksen Documents-kansioon tiedoston
// ui-komento.txt, sovellus lukee sen sekunnin välein, poistaa sen ja ajaa rivit
// jonossa. Rivit ja tulokset kirjataan Documents/ui-loki.txt:hen.
//
//   ui valikko | ui asetukset | ui sulje      avaa päävalikon / äänentasot, sulkee
//   ui matka                                  esimerkkimatkavalinta (ilman peliä)
//   ui kortti [kaupunki] [oma]                kaupunkikortti (oletus firenze, ilman peliä; oma = Tutki + Mannerlento)
//   ui kysymys [laji]                         esimerkkikysymys ilman peliä: visa (oletus), vaite,
//                                             kuva, lippu, pulma [id],
//                                             tulos [laattatyyppi], kohtaaminen,
//                                             kohtaaminen-tervehdys (KysymysEsimerkki.cs)
//   ui selite                                 karttaselite auki (Nostot-välilehti)
//   ui aloitus [portti|avaus|valinta|jatka]   aloitusnäkymä ilman peliä (valinta → ilmoitus)
//   ui aloita [kaupunki] | ui jatka           automaatio: ohittaa aloitusnäkymän (UusiMatka / Jatka);
//                                             listan ulkopuolinen kaupunki (pariisi) = oletuslähtö Pariisi
//   ui lehti <kaupunki> [sivu] | ui lehti sivu n | ui lehti kuva | ui maalehti <ISO> [aihe] | ui lehti sisallys
//   ui lehti tehtava | tehtava-pois | viimeinen  alapalkin tehtävänappi (keksitty tila) / viimeinen sivu (Maa-liite)
//   ui nosto <valoId>                         nostokortti: skandaali:<id> | hetki:<id> | elaintaky:<ISO> | kohde:<id>[@ISO]
//   ui huipennus                              matkan huipennus (kaikki aarteet) esimerkkiluvuin
//   ui laukku [esimerkki]                     matkalaukku (pelin data; esimerkki = keksitty sisältö)
//   ui julisteet [n]                          julistegalleria, n ensimmäistä voitettuna (oletus 7)
//   ui tietaja [pisteet]                      Tietäjän tie -minipopup (oletus 120)
//   ui seloste                                laukku esimerkillä + Aarnin luettelon pikkuseloste
//   ui offline demo|verkoton|verkko|pois      offline-tilan pilleri: keksitty lataus / verkon tila
//   ui maakunnat [kortti] [ISO:tunnus]        karttaselite Maakunnat-välilehdellä, valinta, kortti
//   ui pulu sano [teksti] | aani [lähde n] | ele id | tilanne laji | tunne t | pois | paalle
//   ui tietoja                                tekijätiedot ja lähteet
//   ui chat [kysymys]                         pulun keskustelu auki / kysy
//   ui traileri [kaupunki]                    saapumistraileri ilman puhetta (oletus lontoo)
//   ui luento [kaupunki] [loppu]              matkakirjakortti + luentakuvat (oletus ateena); loppu = Livian vuoro
//   ui kartuscha [ISO3] [auki]                kartuscha maalle ilman peliä (oletus ITA)
//   ui heitto [teksti]                        kartan toimintonappi näkyviin
//   ui viesti teksti                          tilarivin hetkellinen viesti
//   ui tila teksti                            tilarivin teksti
//   ui pois | ui paalle                       koko UI piiloon / näkyviin
//   ui osuma x y                              osuuko piste (pikseleinä, origo vasen ala) UI:hin
//   ui livia [ele] [p] [astro|leiju|puhe|mini] Livia (152 × 304) keskellä kerrosta 40 (oletus blink 0.5)
//   ui livia kierros [astro|leiju|puhe]       kaikki eleet peräkkäin oikeassa ajassa (videotarkistus)
//   ui livia pois                             Livia pois
//   ui linssi valitsin|peite|selite|astro|kuva|sumu|vertailu|maa|keksinnot|matka|sulje|pois
//                                             linssien UI esimerkkiaineistolla (Linssit/LinssiKomennot.cs)
//   kuva nimi                                 Documents/ui-nimi.png (koko ruutu)
//   odota s                                   seuraava rivi s sekunnin päästä
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class UiKomennot : MonoBehaviour
    {
        readonly Queue<string> jono = new Queue<string>();
        string polku, loki;
        float tarkistus, odotus;

        // ui livia: testikuva ilman peliä.
        VisualElement liviaKehys;
        LiviaKuva livia;
        Label liviaNimi;
        readonly LiviaTila liviaTila = new LiviaTila();
        bool liviaElaa, liviaPuhe;
        int kierros = -1;
        float kierrosAlku;
        const float KierrosTauko = 0.4f;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista() => UiKerros.Hae().gameObject.AddComponent<UiKomennot>();

        void Start()
        {
            polku = Path.Combine(Application.persistentDataPath, "ui-komento.txt");
            loki = Path.Combine(Application.persistentDataPath, "ui-loki.txt");
        }

        void Update()
        {
            if (polku == null) return;
            if (Time.unscaledTime >= tarkistus)
            {
                tarkistus = Time.unscaledTime + 1f;
                try
                {
                    if (File.Exists(polku))
                    {
                        foreach (var rivi in File.ReadAllLines(polku)) if (rivi.Trim().Length > 0) jono.Enqueue(rivi.Trim());
                        File.Delete(polku);
                    }
                }
                catch (IOException e) { Debug.LogWarning("MATKAKIRJA ui-komento: " + e.Message); }
            }
            while (jono.Count > 0 && Time.unscaledTime >= odotus)
            {
                var rivi = jono.Dequeue();
                string tulos;
                try { tulos = Aja(rivi); }
                catch (System.Exception e) { tulos = "VIRHE " + e.Message; }
                Kirjaa(rivi + " → " + (tulos ?? "ok"));
            }
            PaivitaLivia();
        }

        void Kirjaa(string teksti)
        {
            Debug.Log("MATKAKIRJA ui-komento: " + teksti);
            try { File.AppendAllText(loki, System.DateTime.Now.ToString("HH:mm:ss ") + teksti + "\n"); }
            catch (IOException) { }
        }

        string Aja(string rivi)
        {
            var osat = rivi.Split(new[] { ' ' }, 3, System.StringSplitOptions.RemoveEmptyEntries);
            string k = osat[0].ToLowerInvariant();
            if (k == "odota" && osat.Length > 1)
            {
                odotus = Time.unscaledTime + float.Parse(osat[1], CultureInfo.InvariantCulture);
                return null;
            }
            if (k == "kuva" && osat.Length > 1)
            {
                // Mobiilissa CaptureScreenshot tulkitsee nimen suhteessa persistentDataPathiin.
                var nimi = "ui-" + osat[1] + ".png";
                ScreenCapture.CaptureScreenshot(Application.isMobilePlatform ? nimi : Path.Combine(Application.persistentDataPath, nimi));
                // Kaappaus tapahtuu vasta ruudun lopussa: seuraava rivi odottaa, ettei kuvaan tule sen tila.
                odotus = Time.unscaledTime + 0.3f;
                return nimi;
            }
            if (k != "ui" || osat.Length < 2) return "tuntematon komento";
            string loput = osat.Length > 2 ? osat[2] : "";
            var ui = UiNakymat.Hae();
            switch (osat[1].ToLowerInvariant())
            {
                case "valikko": ui.Valikko.Avaa(); return null;
                case "asetukset": ui.Aanentasot.Avaa(); return null;
                case "sulje": ui.SuljeKaikki(); return null;
                case "matka": ui.Esimerkkimatka(); return null;
                case "pulu":
                {
                    var pu = ui.Pulu;
                    var pk = loput.Split(new[] { ' ' }, 2);
                    string arvo = pk.Length > 1 ? pk[1] : "";
                    switch (pk[0])
                    {
                        case "sano": pu.Sano(arvo.Length > 0 ? arvo : "Minä olen Livia. Kirjekyyhky, en mikään pulu."); return null;
                        case "aani":
                        {
                            var a = arvo.Split(' ');
                            string lahde = a[0].Length > 0 ? a[0] : "avaus";
                            int n = a.Length > 1 ? int.Parse(a[1]) - 1 : 0;
                            pu.Sano("(" + lahde + " " + (n + 1) + ")", Pulu.AaniOsoite(lahde, n));
                            return Pulu.AaniOsoite(lahde, n);
                        }
                        case "ele": return pu.Ele(arvo) ? null : "tuntematon ele " + arvo;
                        case "tilanne": return pu.Tilanne(arvo) ? null : "ei elettä (väli, puhe tai tuntematon)";
                        case "tunne": return pu.Tunne(arvo) ? null : "ei elettä";
                        case "pois": pu.Nayta(false); return null;
                        case "paalle": pu.Nayta(true); return null;
                        default: return "ui pulu sano|aani|ele|tilanne|tunne|pois|paalle";
                    }
                }
                case "luento":
                {
                    var lk = loput.Split(' ');
                    string kaup = lk[0].Length > 0 ? lk[0] : "ateena";
                    if (lk.Length > 1 && lk[1] == "loppu") ui.Saapuminen.Loppui(kaup); else ui.Saapuminen.Alkoi(kaup);
                    return null;
                }
                case "traileri":
                {
                    string tk = loput.Length > 0 ? loput : "lontoo";
                    ui.Traileri.Nayta(tk, null, () => Kirjaa("traileri valmis: " + tk));
                    return null;
                }
                case "chat":
                    if (loput.Length > 0) ui.Chat.Kysy(loput); else ui.Chat.Vaihda();
                    return null;
                case "tietoja": ui.Tietoja.Avaa(); return null;
                case "aloitus":
                    ui.Aloitus.Testaa(loput.Length > 0 ? loput : "portti", id => ui.Tilarivi.Viesti("Lähtö: " + id));
                    return null;
                case "aloita":
                case "jatka":
                {
                    var o = PeliOhjain.Instanssi;
                    if (o == null) return "peli ei ole käynnissä";
                    // Automaatio: mikä tahansa kaupunki kelpaa; lähtökaupunkilistan ulkopuolinen (esim. pariisi,
                    // PeliOhjain.AloitusKaupunki) aloittaa oletuslähdöstä UusiMatka(null).
                    string lahto = loput.Length > 0 ? loput.ToLowerInvariant() : null;
                    if (lahto != null && !o.Lahtokaupungit().Exists(k => k.Id == lahto)) lahto = null;
                    string v = osat[1].ToLowerInvariant() == "jatka" ? o.Jatka() : o.UusiMatka(lahto);
                    if (v == null) ui.Aloitus.Piilota();
                    return v;
                }
                case "lehti":
                case "maalehti":
                {
                    var l = loput.Split(' ');
                    if (osat[1] == "lehti" && (l[0] == "sivu" || l[0] == "kuva" || l[0] == "sisallys" || l[0] == "tehtava" || l[0] == "tehtava-pois" || l[0] == "viimeinen"))
                    {
                        ui.Lehti.Testaa(l[0], l.Length > 1 && int.TryParse(l[1], out var sn) ? sn : 0);
                        return null;
                    }
                    if (osat[1] == "maalehti") ui.Lehti.Nayta(LehtiLaji.Maa, l[0].Length > 0 ? l[0] : "ITA", l.Length > 1 ? l[1] : null);
                    else ui.Lehti.Nayta(LehtiLaji.Kaupunki, l[0].Length > 0 ? l[0] : "firenze", null, l.Length > 1 && int.TryParse(l[1], out var s) ? s : (int?)null);
                    return null;
                }
                case "nosto":
                    ui.Nostokortti.Avaa(loput.Length > 0 ? loput : "skandaali:shakkiturkkilainen");
                    return null;
                case "huipennus":
                    ui.Huipennus.Nayta(new MatkanYhteenveto { Paivat = 83, Kaupungit = 41, Aarteet = 6, AarteitaKaikkiaan = 6 },
                        () => ui.Aloitus.NaytaAvaus(id => ui.Tilarivi.Viesti("Lähtö: " + id)));
                    return null;
                case "laukku":
                    ui.Valikko.Sulje(); ui.Aanentasot.Sulje();
                    ui.Matkalaukku.Testaa(loput == "esimerkki" ? new System.Func<LaukkuNaytto>(Matkalaukku.Esimerkki) : null);
                    return null;
                case "julisteet":
                {
                    int n = int.TryParse(loput, out var m) ? m : 7;
                    UiSisalto.Lataa(() => ui.Julistegalleria.Avaa(System.Linq.Enumerable.Select(System.Linq.Enumerable.Take(UiSisalto.Julisteet, n), j => j.Id)));
                    return null;
                }
                case "tietaja":
                    Tietajagalleria.Avaa(int.TryParse(loput, out var tp) ? tp : 120);
                    return null;
                case "seloste":
                {
                    ui.Valikko.Sulje(); ui.Aanentasot.Sulje();
                    ui.Matkalaukku.Testaa(Matkalaukku.Esimerkki);
                    ui.Matkalaukku.AvaaTilastot();
                    var juuri = ui.Kerros.Juuri(UiKerros.Valikot);
                    juuri.schedule.Execute(() =>
                    {
                        var b = juuri.Q(className: "mk-laukku__osiorivi")?.Q<Button>(className: "mk-seloste-nappi");
                        if (b != null) Pikkuseloste.Avaa(b, Matkalaukku.AarniSeloste);
                    }).StartingIn(400);
                    return null;
                }
                case "offline":
                    switch (loput)
                    {
                        case "demo": OfflineTilaUi.TestiLataus.Kaynnista(); return null;
                        case "verkoton": ui.OfflineTila.TestaaVerkoton(true); return null;
                        case "verkko": ui.OfflineTila.TestaaVerkoton(false); return null;
                        case "pois": OfflineTilaUi.TestiLataus.Lopeta(); ui.OfflineTila.TestaaVerkoton(null); return null;
                        default: return "ui offline demo|verkoton|verkko|pois";
                    }
                case "maakunnat":
                {
                    bool kortti = loput == "kortti" || loput.StartsWith("kortti ");
                    string avain = (kortti ? loput.Substring(6) : loput).Trim();
                    ui.Karttaselite.Avaa();
                    ui.Karttaselite.VaihdaValilehti(true);
                    ui.Karttaselite.Maakunnat.Testaa(avain.Length > 0 ? avain : null, kortti);
                    return null;
                }
                case "selite": ui.Karttaselite.Avaa(); ui.Karttaselite.VaihdaValilehti(false); return UiPalvelut.KarttaValot == null ? "ei KarttaValot-palvelua: vain selitykset" : null;
                case "kartuscha":
                {
                    var ks = loput.Split(' ');
                    ui.Kartuscha.Testaa(ks[0].Length > 0 ? ks[0].ToUpperInvariant() : "ITA", ks.Length > 1 && ks[1] == "auki");
                    return null;
                }
                case "kortti":
                {
                    // "ui kortti <id> oma": oman kaupungin rivit (Tutki, Mannerlento) Liiku-rivin sijaan.
                    var ko = loput.Split(' ');
                    bool oma = ko.Length > 1 && ko[1] == "oma";
                    ui.Kaupunkikortti.Nayta(ko[0].Length > 0 ? ko[0] : "firenze", null, new KaupunkiToiminnot
                    {
                        LueLehti = () => ui.Tilarivi.Viesti("Lue lehti"),
                        Liiku = oma ? null : () => ui.Tilarivi.Viesti("Liiku"),
                        Mannerlento = oma ? () => ui.Tilarivi.Viesti("Mannerlento") : null,
                        MannerlentoTeksti = oma ? "Mannerlento (300 £)" : null,
                        Sulje = () => { },
                    });
                    return null;
                }
                case "kysymys": return ui.Esimerkkikysymys(loput);
                case "heitto": ui.Matkavalinta.NaytaHeitto(loput.Length > 0 ? loput : "Heitä noppaa · Lontoo", () => ui.Tilarivi.Viesti("Noppa: 4")); return null;
                case "viesti": ui.Tilarivi.Viesti(loput, 4f); return null;
                case "tila": ui.Tilarivi.Aseta(loput); return null;
                case "pois": UiKerros.Hae().Nayta(false); return null;
                case "paalle": UiKerros.Hae().Nayta(true); return null;
                case "livia": return Livia(loput);
                case "linssi": return LinssiKomennot.Aja(ui, loput);
                case "osuma":
                {
                    var xy = loput.Split(' ');
                    var p = new Vector2(float.Parse(xy[0], CultureInfo.InvariantCulture), float.Parse(xy[1], CultureInfo.InvariantCulture));
                    return UiKerros.Peittaa(p) ? "peittää" : "vapaa";
                }
                default: return "tuntematon ui-komento";
            }
        }

        // --- ui livia ------------------------------------------------------------------

        string Livia(string loput)
        {
            var osat = new List<string>(loput.Split(new[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries));
            if (osat.Count > 0 && osat[0] == "pois")
            {
                liviaKehys?.RemoveFromHierarchy();
                liviaKehys = null; livia = null; kierros = -1;
                return null;
            }
            bool mini = osat.Remove("mini");
            liviaTila.Astronautti = osat.Remove("astro");
            liviaTila.Leiju = osat.Remove("leiju") ? 1 : 0;
            liviaPuhe = osat.Remove("puhe");
            liviaTila.Puhe = -1;
            NaytaLivia(mini);
            if (osat.Count > 0 && osat[0] == "kierros")
            {
                kierros = 0;
                kierrosAlku = Time.unscaledTime;
                liviaElaa = true;
                float yhteensa = 0;
                foreach (var e in LiviaEleet.Kaikki) yhteensa += LiviaEleet.KestoMs(e) / 1000f + KierrosTauko;
                return LiviaEleet.Kaikki.Count + " elettä, " + yhteensa.ToString("0", CultureInfo.InvariantCulture) + " s";
            }
            kierros = -1;
            string ele = osat.Count > 0 ? osat[0] : "blink";
            float p = 0.5f;
            if (osat.Count > 1 && !float.TryParse(osat[1], NumberStyles.Float, CultureInfo.InvariantCulture, out p)) return "p ei ole luku: " + osat[1];
            if (!LiviaEleet.Olemassa(ele)) return "tuntematon ele " + ele;
            liviaTila.Ele = ele;
            liviaTila.P = Mathf.Clamp01(p);
            // Puhe ja leijunta liikkuvat kellon mukaan, muuten kuva on paikallaan.
            liviaElaa = liviaPuhe || liviaTila.Leiju > 0;
            AsetaLivia();
            return null;
        }

        void NaytaLivia(bool mini)
        {
            if (liviaKehys != null) liviaKehys.RemoveFromHierarchy();
            liviaKehys = new VisualElement { name = "ui-livia", pickingMode = PickingMode.Ignore };
            var s = liviaKehys.style;
            s.position = Position.Absolute;
            s.left = 0; s.top = 0; s.right = 0; s.bottom = 0;
            s.alignItems = Align.Center;
            s.justifyContent = Justify.Center;
            livia = new LiviaKuva(mini);
            if (mini) { livia.style.width = 58 * 2; livia.style.height = 70 * 2; }
            liviaKehys.Add(livia);
            liviaNimi = new Label { pickingMode = PickingMode.Ignore };
            liviaNimi.style.marginTop = 8;
            liviaNimi.style.fontSize = 13;
            liviaNimi.style.color = new Color(0.27f, 0.2f, 0.12f);
            liviaNimi.style.backgroundColor = new Color(0.95f, 0.91f, 0.8f, 0.85f);
            liviaNimi.style.paddingLeft = 6; liviaNimi.style.paddingRight = 6;
            liviaKehys.Add(liviaNimi);
            UiKerros.Hae().Turva(UiKerros.Valikot).Add(liviaKehys);
        }

        void AsetaLivia()
        {
            if (livia == null) return;
            if (liviaPuhe) liviaTila.Puhe = Time.unscaledTime * 1000f % 1500f / 1500f;
            livia.Aseta(liviaTila);
            liviaNimi.text = liviaTila.Ele + " " + liviaTila.P.ToString("0.00", CultureInfo.InvariantCulture) + " — " + LiviaEleet.Nimi(liviaTila.Ele);
        }

        void PaivitaLivia()
        {
            if (livia == null || !liviaElaa) return;
            if (kierros >= 0)
            {
                var kaikki = LiviaEleet.Kaikki;
                float kesto = LiviaEleet.KestoMs(kaikki[kierros]) / 1000f;
                float t = Time.unscaledTime - kierrosAlku;
                if (t > kesto + KierrosTauko)
                {
                    kierros = (kierros + 1) % kaikki.Count;
                    kierrosAlku = Time.unscaledTime;
                    t = 0;
                    kesto = LiviaEleet.KestoMs(kaikki[kierros]) / 1000f;
                }
                liviaTila.Ele = kaikki[kierros];
                liviaTila.P = kesto > 0 ? Mathf.Clamp01(t / kesto) : 1;
            }
            AsetaLivia();
        }
    }
}
