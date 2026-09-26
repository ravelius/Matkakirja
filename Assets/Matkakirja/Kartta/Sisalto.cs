using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja
{
    /// <summary>
    /// Verkkopelin sisältöpaketti ämpäristä (Siirtoseppä, tools/vienti):
    /// sisalto/&lt;pääversio&gt;/uusin.json → polku (esim. sisalto/1/v15/) → kokoelmat/*.json.
    /// Versiokansiot ovat muuttumattomia, joten haettu kokoelma tallennetaan
    /// laitteelle ja luetaan sieltä, jos verkkoa ei ole.
    /// </summary>
    public static class Sisalto
    {
        public const string Juuri = "https://media.matkakirja.app/";
        /// <summary>
        /// Paketin pääversio: 1 = verkkopelin kanssa jaettu (tuotanto), 2 = 2.0 (sisalto/2/, ei data-kenttää).
        /// Vaihto 2:een on Fablen päätös, kun 2.0 on ämpärissä. Kokeiluun Documents/sisalto-2.txt valitsee 2:n.
        /// </summary>
        public const int Paaversio = 1;
        public static int ValittuPaaversio =>
            File.Exists(Path.Combine(Application.persistentDataPath, "sisalto-2.txt")) ? 2 : Paaversio;
        /// <summary>Osoitin sisalto/&lt;pääversio&gt;/uusin.json (kaikki lukijat hakevat sen tästä).</summary>
        public static string Osoitin => Juuri + $"sisalto/{ValittuPaaversio}/uusin.json";

        [Serializable]
        public class OsoitinTiedot
        {
            public int versio;
            public string polku;
            public string skeemaversio;
        }

        [Serializable]
        public class Kaupunki
        {
            public string id;
            public string nimi;
            /// <summary>ISO3 (esim. "GRC").</summary>
            public string maa;
            public string maa2;
            public double lat;
            public double lon;
            public string tyyppi;
            public bool lentokentta;
            public bool aloitus;
            public bool saari;
            public string sijaintiLahde;
            /// <summary>Skeema 1.2: 0–3 (3 = pääkaupunki tai aloitus). -1 = ei paketissa.</summary>
            public int tarkeys = -1;
            /// <summary>Skeema 1.10: pintakorkeus metreinä merenpinnasta (null paketissa = 0).</summary>
            public double korkeus;
            /// <summary>
            /// Skeema 1.31: laudan oma nimen asettelu = webin maailmankartan la/lx/ly (js/karttanimet.js
            /// sijoitaKaupunginNimi ehdokas 0). null paketissa = tyhjä tasaus (JsonUtility) = ei asettelua.
            /// </summary>
            public NimionAnkkuri nimionAnkkuri;
        }

        [Serializable]
        public class NimionAnkkuri
        {
            /// <summary>"start"/"end"/"middle" (web la).</summary>
            public string tasaus;
            /// <summary>Perusviivan siirtymä pisteestä laudan yksiköinä, y alas (web lx, ly).</summary>
            public float dx, dy;
        }

        [Serializable]
        class Kokoelma<T>
        {
            public T[] alkiot;
        }

        static string Valimuisti(string polku) =>
            Path.Combine(Application.persistentDataPath, "sisalto", polku.Replace('/', Path.DirectorySeparatorChar));

        static string ViimeisinPolku => Path.Combine(Application.persistentDataPath, "sisalto", "viimeisin.txt");
        /// <summary>Viimeksi haettu osoitin (uusin.json) levyllä: lämmin käynnistys ei odota versiotarkistusta.</summary>
        static string OsoitinValimuisti => Path.Combine(Application.persistentDataPath, "sisalto", "osoitin.json");

        static string LueTiedosto(string polku)
        {
            try { return File.Exists(polku) ? File.ReadAllText(polku).Trim() : null; } catch (Exception) { return null; }
        }

        static string OsoittimenPolku(string osoitin)
        {
            try { var o = osoitin != null ? JsonUtility.FromJson<OsoitinTiedot>(osoitin) : null; return string.IsNullOrEmpty(o?.polku) ? null : o.polku; }
            catch (Exception) { return null; }
        }

        /// <summary>Tuore osoitin taustalla seuraavaa käynnistystä varten (ei vaihda tämän istunnon versiota).</summary>
        static IEnumerator PaivitaOsoitinTaustalla()
        {
            string tuore = null;
            yield return Esilataaja.Hae(() => { var q = UnityWebRequest.Get(Osoitin); q.timeout = 10; return q; }, Taso.TamaKaupunki, "sisalto",
                p => { if (p.result == UnityWebRequest.Result.Success) tuore = p.downloadHandler.text; });
            if (OsoittimenPolku(tuore) == null) yield break;
            string polku = OsoitinValimuisti;
            yield return Taustalla(() => { try { Kirjoita(polku, tuore); } catch (Exception) { } return tuore; }, _ => { });
            Debug.Log("MATKAKIRJA sisältö: tuore osoitin tallennettu taustalla (" + OsoittimenPolku(tuore) + ", käyttöön seuraavassa käynnistyksessä)");
        }

        /// <summary>Hakee kokoelman. valmis(null) = ei verkkoa eikä välimuistia.</summary>
        public static IEnumerator Hae<T>(string kokoelma, Action<T[]> valmis)
        {
            string teksti = null;
            yield return HaeTeksti(kokoelma, t => teksti = t);
            valmis(teksti == null ? null : JsonUtility.FromJson<Kokoelma<T>>(teksti).alkiot);
        }

        /// <summary>
        /// Hakee kokoelman raakatekstinä (sisäkkäiset taulukot, kuten reittien via,
        /// luetaan MiniJsonilla). Osoitin haetaan kerran istuntoa kohden.
        /// </summary>
        public static IEnumerator HaeTeksti(string kokoelma, Action<string> valmis) => HaeTeksti(kokoelma, valmis, false);

        /// <summary>
        /// Kuten yllä; valinnainen = true: puuttuva kokoelma (404, uudempi nippu kuin
        /// julkaistu paketti) kirjataan tavallisena lokirivinä eikä virheenä.
        /// </summary>
        public static IEnumerator HaeTeksti(string kokoelma, Action<string> valmis, bool valinnainen, Taso taso = Taso.Nakyva) =>
            HaePaketista("kokoelmat/" + kokoelma + ".json", valmis, valinnainen, taso);

        /// <summary>Hakee paketin tiedoston versiopolun alta (esim. "offline.json"), välimuistin kautta.</summary>
        /// <summary>
        /// Sisältöpaketin versiopolku (uusin.json) kerran istunnossa, jaettu PeliOhjaimen kanssa (Esilataaja erä 1:
        /// ennen osoitin haettiin kahdesti). Epäonnistunut haku: viimeisin.txt; null = ei verkkoa eikä välimuistia,
        /// ja seuraava kutsu yrittää uudelleen.
        /// </summary>
        public static IEnumerator VersioPolku(Action<string> valmis)
        {
            while (osoitinHaussa) yield return null;
            string versioPolku = istunnonPolku;
            if (versioPolku == null)
            {
                osoitinHaussa = true;
                // ESILATAUSPOLITIIKKA kohta 2 (Fable 26.9.): versiotarkistus ei estä pelaamista. Lämmin käynnistys käyttää
                // edellistä osoitinta heti (sama valinta kuin ennen, yhden käynnistyksen viiveellä) ja hakee tuoreen taustalla;
                // PakettiPaivitys (Siirtoseppä) hoitaa uuden version lataamisen ja käyttöönoton kuten ennenkin.
                string tallennettu = LueTiedosto(OsoitinValimuisti), aiempi = LueTiedosto(ViimeisinPolku);
                string tallennettuPolku = OsoittimenPolku(tallennettu) ?? aiempi;
                if (tallennettu != null && tallennettuPolku != null)
                {
                    versioPolku = PakettiPaivitys.Valitse(tallennettu, tallennettuPolku);
                    Debug.Log($"MATKAKIRJA sisältö: osoitin välimuistista ({versioPolku}), tuore haetaan taustalla");
                    osoitinHaussa = false;
                    istunnonPolku = versioPolku;
                    Esilataaja.AjaTaustalla(PaivitaOsoitinTaustalla());
                    KaynnistyksenEsilataus(versioPolku);
                    valmis(versioPolku);
                    yield break;
                }
                string osoitin = null, osoitinVirhe = null;
                yield return Esilataaja.Hae(() => { var q = UnityWebRequest.Get(Osoitin); q.timeout = 10; return q; }, Taso.Nakyva, "sisalto",
                    p => { if (p.result == UnityWebRequest.Result.Success) osoitin = p.downloadHandler.text; else osoitinVirhe = p.error; });
                try
                {
                    var o = osoitin != null ? JsonUtility.FromJson<OsoitinTiedot>(osoitin) : null;
                    versioPolku = string.IsNullOrEmpty(o?.polku) ? null : o.polku;
                    if (versioPolku != null)
                    {
                        Debug.Log($"MATKAKIRJA sisältö: versio {o.versio}, skeema {o.skeemaversio}, {o.polku}");
                        string talteen = OsoitinValimuisti, teksti = osoitin;
                        try { Directory.CreateDirectory(Path.GetDirectoryName(talteen)); Kirjoita(talteen, teksti); } catch (Exception) { }
                    }
                }
                catch (Exception e) { osoitinVirhe = "uusin.json ei jäsenny: " + e.Message; }
                if (versioPolku == null && File.Exists(ViimeisinPolku))
                {
                    versioPolku = File.ReadAllText(ViimeisinPolku).Trim();
                    Debug.LogWarning($"MATKAKIRJA sisältö: osoitin ei vastaa ({osoitinVirhe}), käytetään {versioPolku}");
                }
                // Taustapäivitys (Siirtoseppä): valmis versio varastosta, muuten laiska tila (PakettiPaivitys.cs).
                versioPolku = PakettiPaivitys.Valitse(osoitin, versioPolku);
                yield return PakettiPaivitys.HaeHakemistoKylmana(osoitin, versioPolku);
                osoitinHaussa = false;
                istunnonPolku = versioPolku;
                KaynnistyksenEsilataus(versioPolku);
            }
            valmis(versioPolku);
        }

        /*
         * KÄYNNISTYKSEN ESILATAUS (ESILATAUSPOLITIIKKA kohta 2 "käynnistys verhon takana", Fable 26.9.2026 klo 12.2x;
         * Esilataaja erä 5). Kylmä verkko-savuke (lokit/esilataaja-5/kylma, käännös 4cce8281): 44 kokoelmaa haettiin
         * laiskasti vasta tarpeessa ja pelaaja odotti niitä yhteensä ~15 s (käynnistys 5,4 s, aloitus 7,6 s, lento 4,8 s).
         * Ne pyydetään nyt kaikki heti, kun paketin versio tiedetään, siinä järjestyksessä kuin peli ne tarvitsee
         * (jonon Nro): Nakyva-pyyntö löytää ne levyltä (osuma) tai liittyy keskeneräiseen hakuun (YHTEINEN HAKU alla).
         * Taso SeuraavaRuutu: ei odota laattoja eikä pysähdy lämpöön; Nakyva ohittaa aina. Levyllä jo oleva ohitetaan
         * (lämmin käynnistys ei lue 3–11 Mt:n tiedostoja turhaan). Lista on mitattu; uusi laiska kokoelma näkyy
         * verkko-savukkeen HUDIT-listassa vaiheella kaynnistys/aloitus/lento, ja se lisätään tähän.
         */
        public static readonly string[] KaynnistyksenKokoelmat =
        {
            // käynnistys
            "kokoelmat/kaupungit.json", "offline.json", "kokoelmat/lippumaat.json", "kokoelmat/karttavalot.json",
            "kokoelmat/maakuntarajat.json", "kokoelmat/laatat.json", "kokoelmat/maamerkit.json", "kokoelmat/aanitaulut.json",
            "moduulit/js/packs/maakunnat-luonnehdinnat.json", "moduulit/js/karttatyokalu-maakunnat.json", "kokoelmat/julisteet.json",
            // aloitus (uusi matka)
            "kokoelmat/kysymykset.json", "kokoelmat/maat.json", "kokoelmat/saapumispuheet.json", "kokoelmat/tarinakaari.json",
            "kokoelmat/merinimet.json", "kokoelmat/fokusvirrat.json", "kokoelmat/paikallisaarteet.json", "kokoelmat/kohtaamiset.json",
            "kokoelmat/kohtaamiskuvat.json", "kokoelmat/kuvakysymykset.json", "kokoelmat/pulmat.json", "kokoelmat/elaintayt.json",
            "kokoelmat/paikkatiedot.json", "kokoelmat/saannot.json", "kokoelmat/luennat.json", "kokoelmat/lehtitehtavat.json",
            // aloituslento ja saapuminen
            "kokoelmat/saapumistekstit.json", "moduulit/js/packs/nimisto-1873.json", "moduulit/js/packs/maailmankartta-nimet.json",
            "moduulit/js/packs/maailmankartta-maasto.json", "moduulit/js/packs/viritysaanet.json", "moduulit/js/packs/radiot.json",
            "kokoelmat/radiot.json", "moduulit/js/linssit/radio.json", "moduulit/js/linssit/ihmisen-matka-kertomus.json",
            "moduulit/js/linssit/satelliitti-data.json", "moduulit/js/linssit/keksinnot.json", "moduulit/js/linssit/vesistot.json",
            "moduulit/js/linssit/astronaut-kysymykset.json", "moduulit/js/linssit/ihmisen-matka-data.json",
            "moduulit/js/linssit/maatiedot.json", "moduulit/js/linssit/ihmisen-matka.json", "kokoelmat/linssiaineisto.json",
            "moduulit/js/linssit/vertailu.json",
        };

        /// <summary>Käynnistyksen kokoelmat (listan alku): vain näille VANHA SISÄLTÖ -varareitti (PakettiPaivitys.VanhaSisalto).</summary>
        public const int KaynnistyksenOsuus = 11;
        static readonly HashSet<string> kaynnistyksenJoukko = new HashSet<string>(new ArraySegment<string>(KaynnistyksenKokoelmat, 0, KaynnistyksenOsuus));
        /// <summary>Tässä istunnossa tilannekuvasta luetut vanhat kokoelmat (mittarin "vanhaa sisältöä käytetty").</summary>
        public static readonly List<(string Kohde, string Lahde, double IkaVrk)> VanhaaKaytetty = new List<(string, string, double)>();

        static string esiladattuVersio;
        public static int KaynnistyksenEsilatauksia { get; private set; }

        static void KaynnistyksenEsilataus(string versioPolku)
        {
            if (versioPolku == null || versioPolku == esiladattuVersio) return;
            esiladattuVersio = versioPolku;
            int n = 0;
            foreach (var suht in KaynnistyksenKokoelmat)
            {
                string polku = versioPolku + suht;
                if (haussa.ContainsKey(polku)) continue;
                string tiedosto = PakettiPaivitys.Varastosta(versioPolku, suht) ?? Valimuisti(polku);
                if (File.Exists(tiedosto)) continue;
                n++;
                Esilataaja.AjaTaustalla(HaePaketista(suht, _ => { }, true, Taso.SeuraavaRuutu));
            }
            KaynnistyksenEsilatauksia = n;
            Debug.Log($"MATKAKIRJA sisältö: käynnistyksen esilataus {n}/{KaynnistyksenKokoelmat.Length} kokoelmaa ({versioPolku})");
        }

        public static IEnumerator HaePaketista(string suhteellinen, Action<string> valmis, bool valinnainen, Taso taso = Taso.Nakyva)
        {
            // Koekansio (testaus laitteella ja simulaattorissa): Documents/sisalto-koe/<suhteellinen>
            // voittaa julkaistun paketin versiosta riippumatta.
            string koe = Path.Combine(Application.persistentDataPath, "sisalto-koe",
                suhteellinen.Replace('/', Path.DirectorySeparatorChar));
            if (File.Exists(koe))
            {
                Debug.Log("MATKAKIRJA sisältö: koekansiosta " + suhteellinen);
                string koeTeksti = null;
                yield return Taustalla(() => File.ReadAllText(koe), t => koeTeksti = t);
                valmis(koeTeksti);
                yield break;
            }
            string versioPolku = null;
            yield return VersioPolku(v => versioPolku = v);
            if (versioPolku == null) { valmis(null); yield break; }

            string polku = versioPolku + suhteellinen;
            string tiedosto = PakettiPaivitys.Varastosta(versioPolku, suhteellinen) ?? Valimuisti(polku);
            string teksti = null;
            // VANHA SISÄLTÖ (Fable 26.9. klo 12.4x/13.0x): käynnistyksen kokoelma puuttuu tästä versiosta → pelaajan oma
            // vanhempi levyltä aina, buildin tilannekuva enintään 14 vrk; tuore on jo haussa (KaynnistyksenEsilataus) seuraavaa kertaa varten.
            // Varaston tiedosto luetaan omasta muuttujastaan: epäonnistunut luku ei saa johtaa siihen, että verkkohaku
            // kirjoittaa tuoreen sisällön vanhan tiivisteen nimelle (tiedosto-muuttuja jää tämän version polkuun).
            if (!File.Exists(tiedosto) && taso == Taso.Nakyva && kaynnistyksenJoukko.Contains(suhteellinen))
            {
                var vanha = PakettiPaivitys.VanhaSisalto(versioPolku, suhteellinen, out string vanhanLahde, out double ikaVrk);
                if (vanha != null)
                {
                    yield return Taustalla(() => File.ReadAllText(vanha), t => teksti = t);
                    if (teksti != null)
                    {
                        if (!VanhaaKaytetty.Exists(x => x.Kohde == suhteellinen)) VanhaaKaytetty.Add((suhteellinen, vanhanLahde, ikaVrk));
                        Debug.Log($"MATKAKIRJA sisältö: vanhaa sisältöä käytetty {suhteellinen} ({vanhanLahde}, {ikaVrk:0.0} vrk, käytössä {versioPolku})");
                    }
                }
            }
            if (teksti == null && File.Exists(tiedosto))
            {
                // Välimuistitiedosto on 3–11 Mt: luku ja purku pääsäikeessä maksoi 25–58 ms:n kehyksen
                // jokaisella kokoelmalla (Natiivi-UI:n piikkimittaus 24.9.), joten luetaan taustasäikeessä.
                // Epäonnistunut luku (esim. toinen haku kirjoittaa samaa tiedostoa) → haetaan verkosta.
                yield return Taustalla(() => File.ReadAllText(tiedosto), t => teksti = t);
            }
            VerkkoOdotus.Osuma("sisalto", teksti != null);
            // Esilataajan mittari: vain Nakyva-pyyntö; alempi taso on esilataus (Esilataaja.Hae avain alla).
            if (taso == Taso.Nakyva) Esilataaja.NakyvaPyynto(Juuri + polku, teksti != null);
            // YHTEINEN HAKU (Fablen jono 26.9., kohta 1 -analyysi: kaupungit.json haettiin kylmänä 3× rinnakkain tästä
            // funktiosta): sama polku jo haussa → odotetaan sen tulosta, ei toista verkkohakua.
            if (teksti == null && haussa.TryGetValue(polku, out var odottajat))
            {
                bool saatu = false;
                string jaettu = null;
                odottajat.Add(t => { jaettu = t; saatu = true; });
                while (!saatu) yield return null;
                if (taso == Taso.Nakyva) Esilataaja.NakyvaValmis(Juuri + polku);
                valmis(jaettu);
                yield break;
            }
            if (teksti == null)
            {
                haussa[polku] = new List<Action<string>>();
                byte[] tavut = null;
                long koodi = 0;
                string virhe = null;
                yield return Esilataaja.Hae(() => { var q = UnityWebRequest.Get(Juuri + polku); q.timeout = 20; return q; }, taso, "sisalto", k =>
                {
                    koodi = k.responseCode;
                    if (k.result == UnityWebRequest.Result.Success) tavut = k.downloadHandler.data; else virhe = k.error;
                }, avain: Juuri + polku);
                if (tavut == null)
                {
                    if (valinnainen && koodi == 404)
                        Debug.Log($"MATKAKIRJA sisältö: {polku} ei ole tässä paketissa (valinnainen)");
                    else
                        Debug.LogError($"MATKAKIRJA sisältö: {polku} epäonnistui: {virhe}");
                    Jaa(polku, null);
                    valmis(null);
                    yield break;
                }
                // Purku ja välimuistiin kirjoitus taustasäikeessä (tavut kopioidaan pääsäikeessä). Polut
                // lasketaan tässä: Application.persistentDataPath toimii vain pääsäikeessä. Kirjoitus
                // väliaikaistiedostoon ja siirto, koska useampi haku voi kirjoittaa saman kokoelman yhtä aikaa.
                string versio = versioPolku, viimeisin = ViimeisinPolku;
                yield return Taustalla(() =>
                {
                    var s = System.Text.Encoding.UTF8.GetString(tavut);
                    try
                    {
                        Directory.CreateDirectory(Path.GetDirectoryName(tiedosto));
                        Kirjoita(tiedosto, s);
                        Kirjoita(viimeisin, versio);
                    }
                    catch (Exception) { /* välimuisti on valinnainen */ }
                    return s;
                }, t => teksti = t);
                Jaa(polku, teksti);
            }
            valmis(teksti);
        }

        /// <summary>Käynnissä olevat verkkohaut polun mukaan ja niitä odottavat (pääsäie).</summary>
        static readonly Dictionary<string, List<Action<string>>> haussa = new Dictionary<string, List<Action<string>>>();

        static void Jaa(string polku, string teksti)
        {
            if (!haussa.TryGetValue(polku, out var odottajat)) return;
            haussa.Remove(polku);
            foreach (var o in odottajat) { try { o(teksti); } catch (Exception e) { Debug.LogException(e); } }
        }

        /// <summary>Kirjoitus väliaikaistiedostoon ja siirto paikalleen (lukija ei näe puolikasta tiedostoa).</summary>
        static void Kirjoita(string tiedosto, string sisalto)
        {
            string tmp = tiedosto + "." + Guid.NewGuid().ToString("N") + ".tmp";
            File.WriteAllText(tmp, sisalto);
            try
            {
                // Uudelleennimeäminen: samaa tiedostoa lukeva haku ei saa jakamisvirhettä (Mono tarkistaa vain avauksen).
                if (File.Exists(tiedosto)) File.Replace(tmp, tiedosto, null);
                else File.Move(tmp, tiedosto);
            }
            finally { if (File.Exists(tmp)) File.Delete(tmp); }
        }

        /// <summary>Ajaa työn taustasäikeessä ja odottaa kehyksittäin; virheessä tulos on null (kirjataan).</summary>
        static IEnumerator Taustalla(Func<string> tyo, Action<string> tulos)
        {
            var t = System.Threading.Tasks.Task.Run(tyo);
            while (!t.IsCompleted) yield return null;
            if (t.IsFaulted) Debug.LogError("MATKAKIRJA sisältö: luku epäonnistui: " + t.Exception?.GetBaseException().Message);
            tulos(t.IsFaulted ? null : t.Result);
        }

        static bool osoitinHaussa;
        static string istunnonPolku;
    }
}
