// ELÄVÄ OPAS (omistaja 5.10.2026 klo 17.5x, Päätoimittaja; Linssiseppä): Unity-osa. Silmukka on ytimessä (OpasSilmukka),
// Cesium-näkymä CesiumKaupunki-luokassa ja UI KierrosTaulussa (avausruutu, kohteen nimi; teksti vain, jos ääntä ei ole).
//
// WORKER (Pelikoodari, Pulun worker): POST {PuluChat.Palvelin}/opas/seuraava {istunto, toive, kaupunki, sijainti, nahdyt, kieli}
// → {id, nimi, alarivi, lat, lon, koko_m, korkeus_m, teksti, aani, kesto_s}. Natiivi pyytää seuraavan heti, kun kappale alkaa
// soida (esihaku), ja pelaajan toive (Pulu-chat, sanelu; PuluChat.Sieppaa-koukku, Natiivi-UI bb27e664) keskeyttää.
// ÄÄNI: kappaleen mp3 ladataan heti vastauksen tultua ja soitetaan saapuessa; puhe merkitään puhujaksi (Repliikki), jolloin
// pelin muut kanavat väistyvät. Kertoja-kytkin pois tai lataus epäonnistui → teksti ruudulle ja kesto kesto_s:stä.
// TESTITILA ("opas testi"): Kööpenhaminan 15 kohdetta järjestyksessä ilman workeria ja ääntä (KoopenhaminaTesti).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class OpasSovitin : ILinssi
    {
        public static readonly LinssiTiedot OpasTiedot = new LinssiTiedot
        {
            Id = "opas",
            Nimi = "Elävä opas",
            Lyhyt = "Opas lentää kanssasi minne haluat ja kertoo paikoista.",
            Jarjestys = 98,
            Ikoni = "<path d=\"M12 3a6 6 0 0 0-6 6c0 4.5 6 12 6 12s6-7.5 6-12a6 6 0 0 0-6-6zm0 8.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z\"/>",
            Valokuva = true,
            Kesken = true,
            Lahde = new Lahde
            {
                Aineisto = "Cesium ion (Google Photorealistic 3D Tiles tai World Terrain, Bing ja OSM Buildings); Wikipedia",
                Lisenssi = "Cesium ion- ja Google-ehdot; Wikipedia CC BY-SA",
                Osoite = "https://cesium.com/platform/cesium-ion/content/",
                Haettu = "2026-10-05",
            },
        };

        /// <summary>Avausruudun tekstit (KierrosTaulu).</summary>
        public const string Otsikko = "ELÄVÄ OPAS", Alaotsikko = "KERRO, MITÄ HALUAT NÄHDÄ";
        /// <summary>Workerin polku ja aikaraja (s).</summary>
        public const string Polku = "/opas/seuraava";
        public const int AikarajaS = 30;

        public static OpasSovitin Viimeisin { get; private set; }
        public static event Action<OpasSovitin> Vaihtui;
        /// <summary>Testitila ilman workeria (komento "opas testi 1|0").</summary>
        public static bool Testi;
        /// <summary>Kamera pysäytetty paikalleen (komento "opas pysayta 1|0"; kuvaparit samasta kulmasta), silmukka odottaa.</summary>
        public static bool Pysaytetty;
        /// <summary>Testiotsake (komento "opas testiotsake 1"): worker palauttaa kerronnan ilman ääntä (ei ElevenLabs-kulutusta simussa).</summary>
        public static bool Testiotsake;
        /// <summary>PCM-suoratoisto (Pöllön aani_pcm) käytössä. OLETUS PÄÄLLÄ (Päätoimittaja 6.10. 13.2x, juna 148): Pöllön kylmä mp3 alkaa
        /// ~14 s:ssa, PCM-virta ~0,9 s:ssa (mitattu 6.10. 13.1x). Virran virheessä mp3-varapolku (LataaPcm). Komento "opas pcm 0|1".</summary>
        public static bool PcmKaytossa = true;
        /// <summary>Kappaleen äänen avain: PCM-virta vain kytkimellä, muuten mp3.</summary>
        static string AaniAvain(OpasKohde k) => k == null ? null : PcmKaytossa ? k.AaniAvain : (string.IsNullOrEmpty(k.Aani) ? null : k.Aani);
        /// <summary>Aloituskaupunki (komento "opas kaupunki <nimi>"); ensimmäinen pyyntö on tämä toive.</summary>
        public static string Aloituskaupunki = "Kööpenhamina";

        /// <summary>
        /// Koukku elokuvamaiselle kameralle (Siirtoseppä, juna 145, OpasCinemachine.cs): kutsutaan joka kehys KyydinKameraEnnen-vaiheessa
        /// (−50) heti sen jälkeen, kun PalloKierto.Kuvaa on asettanut silmukan asennon (paikka, asento, lähi- ja kaukotaso).
        /// Kuuntelija voi ohjata kameraa (Brain ManualUpdate) ennen Cesiumin laattavalintaa.
        /// </summary>
        public static event Action<Camera, OpasSilmukka> KameraKuvattu;
        /// <summary>Kertojan kappale soi (Natiivi-UI: vastaussirut vasta kappaleen jälkeen).</summary>
        public static bool KertojaPuhuu => Viimeisin != null && Viimeisin.puhuu;
        /// <summary>Oppaan linssi auki (Natiivi-UI: chatin syöte oppaalle).</summary>
        public static bool Auki => Viimeisin != null && Viimeisin.silmukka != null && Viimeisin.Virhe == null;

        /// <summary>Pelaajan toive chatista; true = otettu oppaalle (Pulun workeria ei kutsuta).</summary>
        public static bool Toive(string teksti)
        {
            if (!Auki || string.IsNullOrWhiteSpace(teksti)) return false;
            Viimeisin.o.Kirjaa("opas: toive \"" + teksti.Trim() + "\"");
            var v = Viimeisin;
            var kys = v.silmukka.OdottaaVastausta && v.viimeKysymys != null ? v.viimeKysymys : v.silmukka.Nykyinen;
            string ryhma = OpasSiltalauseet.RyhmaToiveelle(teksti, kys?.Vaihtoehdot, kys?.VaihtoehtojenRyhmat);
            v.silmukka.Toive(teksti);
            v.Silta(ryhma, true);
            return true;
        }

        /// <summary>
        /// Kaupungin vaihto valikosta (Natiivi-UI OpasValikko.KohdeValittu): puhe katkeaa ja seuraava pyyntö menee valittuun
        /// paikkaan (kaupunki ja sijainti). true = otettu oppaalle.
        /// </summary>
        public static bool VaihdaKaupunki(string nimi, double lat, double lon) => VaihdaKaupunki(nimi, lat, lon, null);

        /// <summary>Kuten yllä, maan ISO-koodilla (samannimiset kaupungit, esim. Jerusalem IL/PS); nimi sanotaan Williamin äänellä.</summary>
        public static bool VaihdaKaupunki(string nimi, double lat, double lon, string iso)
        {
            if (!Auki || string.IsNullOrWhiteSpace(nimi)) return false;
            (lat, lon) = Keskusta(lat, lon);   // Natural Earth -piste → kaupungin keskusta (Wikidata P625)
            Aloituskaupunki = nimi.Trim();
            Viimeisin.pakotettuSijainti = (lat, lon);
            Viimeisin.o.Kirjaa($"opas: kaupunki vaihtuu → {Aloituskaupunki} ({lat:F3}, {lon:F3})");
            if (!Viimeisin.AvaaKaupunki(lat, lon, Aloituskaupunki)) return false;
            Viimeisin.silmukka.VaihdaPaikka(lat, lon, nimi.Trim());   // kamera lentää heti kaupungin yleiskuvaan (Natiivi-UI 6.10. 00.2x)
            var v = Viimeisin;
            if (!v.SanoNimi(nimiaanet?.Kaupungille(iso, nimi))) v.Silta(OpasSiltalauseet.Kaupunki, true);
            return true;
        }

        /// <summary>Maan valinta Vaihda kohde -valikossa (Natiivi-UI, juna 146): maan nimi Williamin äänellä heti. true = sanottiin.</summary>
        public static bool MaaValittu(string iso)
        {
            if (!Auki || string.IsNullOrEmpty(iso)) return false;
            return Viimeisin.SanoNimi(nimiaanet?.Maalle(iso));
        }
        (double lat, double lon)? pakotettuSijainti;

        readonly LinssiOhjain o;
        readonly PalloKierto kierto;
        readonly CesiumKaupunki kaupunki;
        readonly Dictionary<string, double> maaKorkeudet = new Dictionary<string, double>(StringComparer.Ordinal);
        readonly Dictionary<string, AudioClip> klipit = new Dictionary<string, AudioClip>(StringComparer.Ordinal);
        ILinssiYmparisto y;
        OpasSilmukka silmukka;
        AudioSource puhe;
        string istunto;
        int testiIndeksi, paivitetty = -1;
        float puheLoppuu = -1f;
        bool puhuu;

        public OpasSovitin(LinssiOhjain o, PalloKierto kierto)
        {
            this.o = o; this.kierto = kierto;
            kaupunki = new CesiumKaupunki(kierto, o.Kirjaa);
        }
        public LinssiTiedot Tiedot => OpasTiedot;
        bool ILinssi.Auki => silmukka != null;
        public OpasSilmukka Silmukka => silmukka;
        /// <summary>Avauksen virhe tai näkymän myöhempi virhe (tunnuksen haku Pöllöstä epäonnistui); UI näyttää sen ja sulkee linssin.</summary>
        public string Virhe { get => virhe ?? (nakymaAuki ? kaupunki.Virhe : null); private set => virhe = value; }
        string virhe;
        bool nakymaAuki;
        public float Latausaste => kaupunki.Latausaste;
        /// <summary>Kertojan teksti ruudulle: vain kun puhe ei soi (PUHE ÄÄNENÄ -sääntö).</summary>
        public string TekstiRuudulle => silmukka != null && !puhuu && tekstina != null && !ChatKaytossa ? tekstina.Teksti : null;

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            y = ymparisto;
            Virhe = null;
            Viimeisin = this;
            var alku = OpasSilmukka.Avauskuva(KoopenhaminaTesti.Alku.Lat, KoopenhaminaTesti.Alku.Lon);
            silmukka = new OpasSilmukka(alku);
            // AVAUS ILMAN KARTTAA (omistaja 6.10. 14.2x, juna 149): täkyavauksessa Cesium avataan vasta pelaajan valinnasta
            // (AvaaKaupunki), joten aloitusvalikko aukeaa heti eikä yhtään laattaa ladata ennen valintaa.
            kaupunkiOdottaa = TakyAvaus && !Testi;
            if (!kaupunkiOdottaa && !kaupunki.Avaa(alku.Lat, alku.Lon, 45))
            {
                Virhe = OpasTiedot.Nimi + ": " + kaupunki.Virhe;
                Vaihtui?.Invoke(this);
                return;
            }
            nakymaAuki = true;
            KytkeNimilappu(true);
            istunto = Guid.NewGuid().ToString("N");
            testiIndeksi = 0;
            if (kierto != null) SyoteLukko.Esta(this);
            y.Pelikerrokset(false);
            y.MusiikkiPitoon(true);
            y.Peite(true);
            if (!kaupunkiOdottaa) o.StartCoroutine(PeitePois());   // simu 18.39: peite jäi päälle ja tummensi koko näkymän
            if (puhe == null)
            {
                puhe = o.gameObject.AddComponent<AudioSource>();
                puhe.playOnAwake = false; puhe.spatialBlend = 0f; puhe.loop = false;
            }
            KytkeChat(true);   // chat ei aukea itsestään (opas kevyeksi, Päätoimittaja 5.10.): vain valikon "Näytä teksti" -rivistä
            silmukka.Pyyda += Pyyda;
            silmukka.Saapui += Saapui;
            silmukka.Hiljenna += Hiljenna;
            silmukka.Kysyy += Kysyy;
            silmukka.LentoAlkaa += LentoAlkoi;
            // Siirto ilman lentoa (omistaja 6.10. 12.0x): origo heti kohteeseen, latausaste kohdekameran laatoista.
            silmukka.SiirtoAlkaa += (la, lo) => { kaupunki.SiirraOrigo(la, lo, MaaPisteessa(la, lo) is double m && !double.IsNaN(m) ? m : 45); o.Kirjaa($"opas: siirrytään {silmukka.SiirtoNimi} ({la:F3}, {lo:F3})"); };
            silmukka.LatausEdistys = () => kaupunki.Latausaste / 100.0;
            // Maaston korkeus kohdekehykseen (simu 6.10. 12.42: Praha aukesi 45 m:n arviolla mäen sisältä): näyte pisteeseen.
            silmukka.MaaPisteessa = MaaPisteessa;
            silmukka.MaaTarvitaan += (la, lo) => o.StartCoroutine(KorkeusPisteessa(la, lo));
            silmukka.KehysKorjattu += (arvio, m) => o.Kirjaa($"opas: kehyksen maa {arvio:F0} → {m:F0} m (näyte)");
            if (silta == null)
            {
                silta = o.gameObject.AddComponent<AudioSource>();
                silta.playOnAwake = false; silta.spatialBlend = 0f; silta.loop = false;
            }
            if (siltalauseet == null && !Testi) o.StartCoroutine(LataaSiltalauseet());
            if (nimiaanet == null && !nimiaLadataan && !Testi) o.StartCoroutine(LataaNimiaanet());
            silmukka.AlkaaPuhua += AlkaaPuhua;
            if (o.GetComponent<KyydinKameraEnnen>() == null) o.gameObject.AddComponent<KyydinKameraEnnen>();
            KyydinKameraEnnen.Ajo = PaivitaKamera;
            // TÄKYAVAUS (omistaja TF 144): kun UI näyttää täkyluettelon (TakyAvaus), opas ei pyydä mitään ennen pelaajan valintaa.
            if (TakyAvaus && !Testi) { takyt = null; o.StartCoroutine(LataaTakyt()); }
            else silmukka.Aloita(Aloituskaupunki);
            PaivitaKamera();
            Vaihtui?.Invoke(this);
            o.Kirjaa($"opas: auki{(kaupunkiOdottaa ? " (aloitusvalikko, kartta valinnasta)" : "")}, data {kaupunki.Kaytossa}, {(Testi ? "TESTI (ei workeria)" : "worker " + PuluChat.Palvelin + Polku)}{(PolloTestitunnus.Asetettu ? ", testitunnus asetettu" : "")}");
        }

        // Natiivi-UI:n koukku (PuluChat.Sieppaa, haara natiivi-ui/pulu-sieppaus) heijastuksella, jotta tämä kääntyy myös ilman sitä.
        static Delegate vanhaSieppaus;
        static void KytkeChat(bool paalle)
        {
            // Natiivi-UI:n OpasValikko (hampurilainen): KohdeValittu(nimi, lat, lon) ja Nayta(bool), jos luokka on käännöksessä.
            var valikko = typeof(PuluChat).Assembly.GetType("Matkakirja.Natiivi.OpasValikko");
            var kv = valikko?.GetField("KohdeValittu", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static);
            if (kv != null && kv.FieldType == typeof(Action<string, double, double>))
                kv.SetValue(null, paalle ? (Action<string, double, double>)((n, la, lo) => VaihdaKaupunki(n, la, lo)) : null);
            var nayta = valikko?.GetMethod("Nayta", new[] { typeof(bool) });
            if (nayta != null)
            {
                object olio = nayta.IsStatic ? null : valikko.GetMethod("Hae", Type.EmptyTypes)?.Invoke(null, null);
                if (nayta.IsStatic || olio != null) nayta.Invoke(olio, new object[] { paalle });
            }
            var kentta = typeof(PuluChat).GetField("Sieppaa", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static);
            if (kentta == null || kentta.FieldType != typeof(Func<string, bool>)) return;
            // Mikrofoni ja kirjoitus suoraan oppaalle keskusteluna (omistaja 6.10. 11.57): vastaus ja toiminto /opas/kysy:stä.
            if (paalle) { vanhaSieppaus = kentta.GetValue(null) as Delegate; kentta.SetValue(null, (Func<string, bool>)Puhu); }
            else kentta.SetValue(null, vanhaSieppaus);
        }

        /// <summary>Aloitusvalikko: opas auki, paikkaa ei valittu, Cesium ei auki (UI piirtää läpinäkymättömän tumman taustan).</summary>
        public static bool Avausvalikko => Auki && Viimeisin.kaupunkiOdottaa;
        bool kaupunkiOdottaa;

        /// <summary>Ensimmäinen valinta: Cesium auki suoraan kohteeseen, ja paikka avautuu siirtoruudun kautta. true = auki.</summary>
        bool AvaaKaupunki(double lat, double lon, string nimi)
        {
            if (!kaupunkiOdottaa) return true;
            kaupunkiOdottaa = false;
            double maa = MaaPisteessa(lat, lon);
            if (!kaupunki.Avaa(lat, lon, double.IsNaN(maa) ? 45 : maa))
            {
                Virhe = OpasTiedot.Nimi + ": " + kaupunki.Virhe;
                Vaihtui?.Invoke(this);
                return false;
            }
            o.StartCoroutine(PeitePois());
            silmukka.PakotaSiirto = true;
            o.Kirjaa($"opas: kartta auki valinnasta → {nimi} ({lat:F3}, {lon:F3})");
            return true;
        }

        public void Paivita()
        {
            if (silmukka == null || Virhe != null) return;
            PaivitaKamera();
        }

        void PaivitaKamera()
        {
            if (silmukka == null || Virhe != null || paivitetty == Time.frameCount) return;
            paivitetty = Time.frameCount;
            if (kaupunkiOdottaa) return;   // aloitusvalikko: ei kameraa eikä laattoja (puhetta ei vielä ole)
            bool loppui = !tauolla && (pcmNyt != null ? pcmNyt.Loppui : Time.unscaledTime >= puheLoppuu && (puhe == null || !puhe.isPlaying));
            if (puhuu && loppui)
            {
                if (pcmNyt != null) { if (pcmNyt.Katkoja > 0) o.Kirjaa($"opas: PCM-virrassa {pcmNyt.Katkoja} katkoa"); pcmNyt = null; if (puhe != null) puhe.Stop(); }
                puhuu = false; y.Repliikki(false); silmukka.AaniLoppui();
            }
            kaupunki.PidaMaski();
            kaupunki.PaivitaAvauslataus();   // ion-logo avauslatauksen ajan (Natiivi-UI KrediititTiivis)
            // OSM-tekijätieto aina oppaan ajan: worker käyttää Nominatimia koordinaatteihin ja reittiviivoihin (ODbL, juna 146).
            KrediititTiivis.OsmNakyvissa = true;
            KrediititTiivis.Paivita(true);   // kapealla ruudulla logot + "Data sources" (Googlen policy)
            if (Pysaytetty) { y.Kuvaa(silmukka.Asento); return; }
            var ennen = silmukka.Vaihe;
            LueTapit();
            bool siirtyy = silmukka.Siirtymassa;
            if (siirtyy != siirtymaEdellinen) { siirtymaEdellinen = siirtyy; if (siirtyy) SiirtymaAlkaa?.Invoke(silmukka.SiirtoNimi); else SiirtymaValmis?.Invoke(); }
            if (silmukka.Aloitettu) PaivitaKohteet();
            if (!tauolla && pelaajanToimi > 0 && !puhuu && Time.unscaledTime - pelaajanToimi > OdotusLauseS) { pelaajanToimi = -1f; Silta(OpasSiltalauseet.Odotus, false); }
            silmukka.Paivita(Time.unscaledDeltaTime, MaaKorkeus, () => kaupunki.Valmis);
            if (silmukka.Vaihe != ennen) o.Kirjaa($"opas: {ennen} → {silmukka.Vaihe} {(silmukka.Nykyinen?.Nimi ?? "")}, laatat {kaupunki.Latausaste:F0} %");
            if (silmukka.Vaihe != ennen && silmukka.Vaihe == OpasVaihe.Lentaa) OpasKorostusKuva.Piilota();
            y.Kuvaa(silmukka.Asento);
            KameraKuvattu?.Invoke(kierto != null ? kierto.GetComponent<Camera>() : null, silmukka);
            // Esilataus: lennon aikana laskeutumiskehys, muuten esihaetun kohteen kehys (OpasKuvaus, sama kuin lento).
            var esi = silmukka.Esilataus(MaaKorkeus);
            if (esi.HasValue) kaupunki.AsetaEsikamera(esi.Value);
            else kaupunki.EsikameraPois();   // ei esilattavaa: piilokamera ei pidä vanhoja laattoja elossa
        }

        double MaaKorkeus(OpasKohde k) => maaKorkeudet.TryGetValue(Avain(k), out var h) ? h : MaaPisteessa(k.Lat, k.Lon);
        double MaaPisteessa(double lat, double lon) => pisteKorkeudet.TryGetValue(PisteAvain(lat, lon), out var h) ? h : double.NaN;
        static string PisteAvain(double lat, double lon) => lat.ToString("F4") + "," + lon.ToString("F4");
        readonly Dictionary<string, double> pisteKorkeudet = new Dictionary<string, double>(StringComparer.Ordinal);
        readonly HashSet<string> pisteNaytteet = new HashSet<string>(StringComparer.Ordinal);
        static string Avain(OpasKohde k) => k.Id ?? (k.Lat.ToString("F5") + "," + k.Lon.ToString("F5"));

        // ── Pyynnöt workerille (tai testilista) ──────────────────────────────
        void Pyyda(int n, string toive)
        {
            if (Testi) { o.StartCoroutine(TestiVastaus(n)); return; }
            o.StartCoroutine(Hae(n, toive));
        }

        // ---- KYSY, LIIKU, KAUPUNKIKIERROS, KESKUSTELU (omistaja 6.10. 11.57; Pelikoodarin endpointit, Natiivi-UI:n nimet) ----
        /// <summary>Kysy-lista: vastauksen jatkokysymykset ensin, sitten paikan kysymykset; null = latautuu.</summary>
        public static IReadOnlyList<string> Kysymykset => Viimeisin?.kysymykset;
        /// <summary>Liiku-lista: kaupungin 12 tärkeintä (GET /opas/liiku); null = latautuu.</summary>
        public static IReadOnlyList<OpasTaky> Kohteet => Viimeisin?.kohteet;
        public static bool KierrosKaynnissa => Viimeisin?.silmukka != null && Viimeisin.silmukka.KierrosKaynnissa;
        string[] kysymykset, jatkoKysymykset = Array.Empty<string>();
        List<OpasTaky> kohteet;
        string kohteetKaupunki;
        readonly List<(string rooli, string teksti)> historia = new List<(string, string)>();
        int kysyLaskuri;

        /// <summary>Liiku-listan kohde: lento heti (yli 30 km siirtoruudulla), pysähdys pyydetään samalla.</summary>
        public static bool Siirry(OpasTaky t)
        {
            if (!Auki || t == null || string.IsNullOrEmpty(t.Nimi)) return false;
            var v = Viimeisin;
            if (v.tauolla) Tauko(false);
            v.o.Kirjaa($"opas: liiku {t.Nimi}");
            v.silmukka.Liiku(t.Nimi, t.Lat, t.Lon);
            return true;
        }

        /// <summary>Sama kuin Siirry (Natiivi-UI:n nimi Liiku-listalle).</summary>
        public static bool Liiku(OpasTaky t) => Siirry(t);

        /// <summary>Kaupunkikierros: Liiku-listan kohteet järjestyksessä, lyhyt kerronta kullekin.</summary>
        public static bool Kaupunkikierros()
        {
            var v = Viimeisin;
            if (!Auki || v.kohteet == null || v.kohteet.Count == 0) return false;
            if (v.tauolla) Tauko(false);
            var jono = new List<(string, double, double)>();
            foreach (var t in v.kohteet) jono.Add((t.Nimi, t.Lat, t.Lon));
            v.o.Kirjaa($"opas: kaupunkikierros {jono.Count} kohdetta");
            v.silmukka.AloitaKierros(jono);
            return true;
        }

        /// <summary>Kysy-listan kysymys: sama keskustelureitti kuin mikki ja näppäimistö.</summary>
        public static bool Kysy(string kysymys) => Puhu(kysymys);

        /// <summary>Mikki ja näppäimistö suoraan oppaalle: POST /opas/kysy → vastaus (Williamin ääni) ja toiminto.</summary>
        public static bool Puhu(string teksti)
        {
            if (!Auki || string.IsNullOrWhiteSpace(teksti)) return false;
            var v = Viimeisin;
            if (v.tauolla) Tauko(false);
            v.o.Kirjaa("opas: kysy \"" + teksti.Trim() + "\"");
            v.Silta(OpasSiltalauseet.Kuittaus, true);
            v.o.StartCoroutine(v.KysyWorkerilta(teksti.Trim()));
            return true;
        }

        IEnumerator KysyWorkerilta(string kysymys)
        {
            var nyt = silmukka.Nykyinen; var kehys = silmukka.NykyinenKehys;
            var sb = new StringBuilder("{");
            sb.Append("\"istunto\":\"").Append(istunto).Append("\",\"kaupunki\":\"").Append(Escape(Aloituskaupunki)).Append("\",");
            if (nyt != null && kehys != null && !nyt.Kysymys)
                sb.Append("\"paikka\":{\"id\":").Append(nyt.Id == null ? "null" : "\"" + Escape(nyt.Id) + "\"").Append(",\"nimi\":\"").Append(Escape(nyt.Nimi ?? ""))
                  .Append("\",\"lat\":").Append(kehys.Lat.ToString("F5", System.Globalization.CultureInfo.InvariantCulture))
                  .Append(",\"lon\":").Append(kehys.Lon.ToString("F5", System.Globalization.CultureInfo.InvariantCulture)).Append("},");
            else sb.Append("\"paikka\":null,");
            sb.Append("\"kysymys\":\"").Append(Escape(kysymys)).Append("\",\"historia\":[");
            for (int i = Math.Max(0, historia.Count - 6); i < historia.Count; i++)
            {
                if (i > Math.Max(0, historia.Count - 6)) sb.Append(',');
                sb.Append("{\"rooli\":\"").Append(historia[i].rooli).Append("\",\"teksti\":\"").Append(Escape(historia[i].teksti)).Append("\"}");
            }
            sb.Append("],\"kaydyt\":[");
            bool eka = true;
            foreach (var id in silmukka.Nahdyt) { if (!eka) sb.Append(','); sb.Append('"').Append(Escape(id)).Append('"'); eka = false; }
            sb.Append("],\"kieli\":\"fi\",\"krediitit\":[\"osm\"]}");
            using var r = Pyynto("/opas/kysy", sb.ToString());
            float t0 = Time.realtimeSinceStartup;
            yield return r.SendWebRequest();
            if (silmukka == null) yield break;
            var v = r.result == UnityWebRequest.Result.Success ? OpasKysyVastaus.Lue(MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>) : null;
            o.Kirjaa($"opas: kysy-vastaus {(v == null ? "VIRHE " + r.responseCode : v.Toiminto + (v.ToimintoNimi != null ? " " + v.ToimintoNimi : ""))} ({Time.realtimeSinceStartup - t0:F1} s)");
            if (v == null) yield break;
            historia.Add(("pelaaja", kysymys));
            if (!string.IsNullOrWhiteSpace(v.Teksti)) historia.Add(("opas", v.Teksti));
            while (historia.Count > 12) historia.RemoveAt(0);
            jatkoKysymykset = v.Jatkokysymykset ?? Array.Empty<string>();
            kysymykset = OpasKysyVastaus.Yhdista(jatkoKysymykset, nyt?.Kysymykset ?? kysymykset);
            // Vastaus kerrotaan paikalla (toiminnoton) tai toiminnon kuittauksena (siirry/kaupunki/kierros), sitten toiminto.
            var vastaus = new OpasKohde { Id = "kysy-" + (++kysyLaskuri), Nimi = nyt?.Nimi, Alarivi = nyt?.Alarivi, Teksti = v.Teksti, Aani = v.Aani, AaniPcm = v.AaniPcm,
                KestoS = v.KestoS, Lat = kehys?.Lat ?? silmukka.Asento.Lat, Lon = kehys?.Lon ?? silmukka.Asento.Lon, KokoM = nyt?.KokoM ?? 100, Kuvat = nyt?.Kuvat,
                Korostus = nyt?.Korostus, Kysymykset = kysymykset };
            switch (v.Toiminto)
            {
                case OpasToiminto.Siirry:
                    if (!double.IsNaN(v.ToimintoLat)) { SoitaKuittaus(v); silmukka.Liiku(v.ToimintoNimi ?? kysymys, v.ToimintoLat, v.ToimintoLon); }
                    break;
                case OpasToiminto.Kohde:
                {
                    var t = kohteet?.Find(x => x.Id == v.ToimintoId);
                    if (t != null) { SoitaKuittaus(v); silmukka.Liiku(t.Nimi, t.Lat, t.Lon); }
                    else if (!string.IsNullOrWhiteSpace(v.Teksti)) { Valmistele(vastaus); silmukka.Esita(vastaus); }
                    break;
                }
                case OpasToiminto.Kaupunki:
                    if (!double.IsNaN(v.ToimintoLat)) { SoitaKuittaus(v); VaihdaKaupunki(v.ToimintoNimi, v.ToimintoLat, v.ToimintoLon); }
                    break;
                case OpasToiminto.Kierros: SoitaKuittaus(v); Kaupunkikierros(); break;
                case OpasToiminto.Tauko: Tauko(true); break;
                case OpasToiminto.Jatka: Tauko(false); break;
                default:
                    if (!string.IsNullOrWhiteSpace(v.Teksti)) { Valmistele(vastaus); silmukka.Esita(vastaus); }
                    break;
            }
        }

        /// <summary>Toiminnon kuittaus ("Lennetään Nyhavniin.") siltalauseen kanavalla; pysähdyksen kerronta jatkaa sen perään.</summary>
        void SoitaKuittaus(OpasKysyVastaus v)
        {
            if (string.IsNullOrEmpty(v.Aani) || silta == null || !Asetukset.Paalla(Kytkin.Kertoja)) return;
            o.StartCoroutine(SoitaUrl(v.Aani));
        }

        IEnumerator SoitaUrl(string url)
        {
            using var p = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.MPEG);
            p.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            PolloTestitunnus.Lisaa(p);
            p.timeout = 10;
            yield return p.SendWebRequest();
            if (p.result != UnityWebRequest.Result.Success || silmukka == null || puhuu) yield break;
            silta.clip = DownloadHandlerAudioClip.GetContent(p); silta.volume = 1f; silta.Play();
        }

        /// <summary>Saapuessa: pysähdyksen omat kysymykset, muuten GET /opas/kysymykset (worker esihakee ne jo taustalla).</summary>
        void PaivitaKysymykset(OpasKohde k)
        {
            jatkoKysymykset = Array.Empty<string>();
            if (k.Kysymykset != null && k.Kysymykset.Length > 0) { kysymykset = k.Kysymykset; return; }
            kysymykset = null;
            if (!Testi && !string.IsNullOrEmpty(k.Id)) o.StartCoroutine(HaeKysymykset(k));
        }

        IEnumerator HaeKysymykset(OpasKohde k)
        {
            using var r = Pyynto($"/opas/kysymykset?paikka={UnityWebRequest.EscapeURL(k.Id)}&nimi={UnityWebRequest.EscapeURL(k.Nimi ?? "")}&kaupunki={UnityWebRequest.EscapeURL(Aloituskaupunki)}");
            yield return r.SendWebRequest();
            if (silmukka == null || silmukka.Nykyinen?.Id != k.Id) yield break;
            string[] lista = null;
            if (r.result == UnityWebRequest.Result.Success && MiniJson.Jasenna(r.downloadHandler.text) is Dictionary<string, object> j
                && j.TryGetValue("kysymykset", out var ko) && ko is IList<object> l)
            {
                var t = new List<string>();
                foreach (var x in l) if (x is string s && !string.IsNullOrWhiteSpace(s)) t.Add(s.Trim());
                lista = t.ToArray();
            }
            k.Kysymykset = lista;
            kysymykset = OpasKysyVastaus.Yhdista(jatkoKysymykset, lista ?? Array.Empty<string>());
            o.Kirjaa($"opas: kysymykset {kysymykset.Length} ({k.Nimi})");
        }

        /// <summary>Liiku-lista kaupungin vaihtuessa (ja avauksessa): GET /opas/liiku?kaupunki=…</summary>
        void PaivitaKohteet()
        {
            if (Testi || string.IsNullOrEmpty(Aloituskaupunki) || kohteetKaupunki == Aloituskaupunki) return;
            kohteetKaupunki = Aloituskaupunki; kohteet = null;
            o.StartCoroutine(HaeKohteet(Aloituskaupunki));
        }

        IEnumerator HaeKohteet(string kaupunki)
        {
            var a = silmukka.Asento;
            using var r = Pyynto($"/opas/liiku?kaupunki={UnityWebRequest.EscapeURL(kaupunki)}&lat={a.Lat.ToString("F4", System.Globalization.CultureInfo.InvariantCulture)}&lon={a.Lon.ToString("F4", System.Globalization.CultureInfo.InvariantCulture)}");
            yield return r.SendWebRequest();
            if (silmukka == null || kohteetKaupunki != kaupunki) yield break;
            kohteet = r.result == UnityWebRequest.Result.Success ? OpasTaky.Lue(MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>) : new List<OpasTaky>();
            o.Kirjaa($"opas: liiku-lista {kohteet.Count} ({kaupunki}, {(r.result == UnityWebRequest.Result.Success ? "ok" : r.responseCode.ToString())})");
        }

        /// <summary>Pöllö-pyyntö natiiviotsakkein (GET, tai POST jos body).</summary>
        UnityWebRequest Pyynto(string polku, string body = null)
        {
            var r = body == null ? UnityWebRequest.Get(PuluChat.Palvelin + polku)
                : new UnityWebRequest(PuluChat.Palvelin + polku, "POST") { uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(body)), downloadHandler = new DownloadHandlerBuffer() };
            r.timeout = AikarajaS;
            if (body != null) r.SetRequestHeader("Content-Type", "application/json");
            r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            string koodi = Asetukset.PolloKoodi;
            if (!string.IsNullOrEmpty(koodi)) r.SetRequestHeader(Lukijaaani.KoodiOtsake, koodi);
            PolloTestitunnus.Lisaa(r);
            return r;
        }

        // Natiivi-UI:n nimet siirtoruudulle (tapahtumat reunoista PaivitaKamerassa).
        public static event Action<string> SiirtymaAlkaa;
        public static event Action SiirtymaValmis;
        public static float SiirtymaEdistyminen => SiirtymaEdistys;
        bool siirtymaEdellinen;

        // ---- KUVASUURENNOKSEN SUMENNUS (omistaja 12.1x): kevyt Gaussian-syväterävyys koko kuvalle ja kamera seis ----
        UnityEngine.Rendering.Volume sumennus;
        bool vanhaJalkikasittely, sumeana;
        /// <summary>Natiivi-UI: Kuvasuurennoksen AukiMuuttui → KuvaSumennus = auki (sama kuin Sumenna).</summary>
        public static bool KuvaSumennus { get => Viimeisin != null && Viimeisin.sumeana; set => Sumenna(value); }
        public static void Sumenna(bool paalle)
        {
            var v = Viimeisin;
            if (v == null || v.silmukka == null || v.sumeana == paalle) return;
            v.sumeana = paalle;
            v.silmukka.KameraSeis = paalle;
            var kamera = v.kaupunki.Kamera;
            if (kamera == null) return;
            var lisa = UnityEngine.Rendering.Universal.CameraExtensions.GetUniversalAdditionalCameraData(kamera);
            if (paalle)
            {
                if (v.sumennus == null)
                {
                    var go = new GameObject("OpasSumennus");
                    v.sumennus = go.AddComponent<UnityEngine.Rendering.Volume>();
                    v.sumennus.isGlobal = true; v.sumennus.priority = 100;
                    var profiili = ScriptableObject.CreateInstance<UnityEngine.Rendering.VolumeProfile>();
                    var dof = profiili.Add<UnityEngine.Rendering.Universal.DepthOfField>(true);
                    dof.mode.Override(UnityEngine.Rendering.Universal.DepthOfFieldMode.Gaussian);
                    dof.gaussianStart.Override(0f); dof.gaussianEnd.Override(1f); dof.gaussianMaxRadius.Override(1.5f); dof.highQualitySampling.Override(false);
                    v.sumennus.sharedProfile = profiili;
                }
                v.sumennus.weight = 1f; v.sumennus.enabled = true;
                if (lisa != null) { v.vanhaJalkikasittely = lisa.renderPostProcessing; lisa.renderPostProcessing = true; }
            }
            else
            {
                if (v.sumennus != null) v.sumennus.enabled = false;
                if (lisa != null) lisa.renderPostProcessing = v.vanhaJalkikasittely;
            }
            v.o.Kirjaa($"opas: sumennus {(paalle ? "päälle" : "pois")}");
        }

        // ---- SIIRTO ILMAN LENTOA (UI: tumma ruutu "Siirrytään", nimi ja latauspalkki; Natiivi-UI) ----
        public static bool Siirtymassa => Viimeisin?.silmukka != null && Viimeisin.silmukka.Siirtymassa;
        public static string SiirtymaNimi => Viimeisin?.silmukka?.SiirtoNimi;
        /// <summary>0–1: kohdekameran laattojen todellinen latausaste; näkymä aukeaa 0,95:ssä (enintään 25 s).</summary>
        public static float SiirtymaEdistys => Viimeisin?.silmukka != null ? (float)Viimeisin.silmukka.SiirtoEdistys : 0f;

        // ---- KAUPUNKIEN KESKUSTAT (Päätoimittaja 6.10. 00.4x: Amsterdam laskeutui Natural Earthin pisteeseen 2,5 km keskustasta) ----
        /// <summary>
        /// Valikon kaupunkipisteet ovat Natural Earthin asutuspaikkoja, jotka voivat olla kilometrien päässä keskustasta. Korjaustaulu
        /// Resources/Opas/keskustat.json: "lat,lon" (4 desimaalia, paikat.json:n arvot) → Wikidata P625 (NE:n WIKIDATAID), vain kun
        /// ero on 250 m – 30 km. Muuten piste sellaisenaan.
        /// </summary>
        public static (double lat, double lon) Keskusta(double lat, double lon)
        {
            if (keskustat == null)
            {
                keskustat = new Dictionary<string, (double, double)>(StringComparer.Ordinal);
                var ta = Resources.Load<TextAsset>("Opas/keskustat");
                if (ta != null && MiniJson.Jasenna(ta.text) is Dictionary<string, object> j && j.TryGetValue("keskustat", out var ko) && ko is Dictionary<string, object> kd)
                    foreach (var kv in kd)
                        if (kv.Value is IList<object> l && l.Count >= 2)
                            keskustat[kv.Key] = (Convert.ToDouble(l[0], System.Globalization.CultureInfo.InvariantCulture), Convert.ToDouble(l[1], System.Globalization.CultureInfo.InvariantCulture));
            }
            string avain = lat.ToString("F4", System.Globalization.CultureInfo.InvariantCulture) + "," + lon.ToString("F4", System.Globalization.CultureInfo.InvariantCulture);
            return keskustat.TryGetValue(avain, out var k) ? k : (lat, lon);
        }
        static Dictionary<string, (double, double)> keskustat;

        // ---- TAUKO JA TÄKYLUETTELO (omistaja TF 144, juna 146; UI Natiivi-UI heijastuksella) ----
        /// <summary>UI asettaa true, kun se näyttää täkyluettelon avauksessa; muuten opas alkaa kuten ennen (vanha UI).</summary>
        public static bool TakyAvaus;
        /// <summary>Täkyt (null = latautuu, tyhjä = ei saatu); UI lukee avauksessa.</summary>
        public static IReadOnlyList<OpasTaky> Takyt => Viimeisin?.takyt;
        public static bool Tauolla => Viimeisin != null && Viimeisin.tauolla;
        List<OpasTaky> takyt;
        bool tauolla;
        float taukoAlku;

        /// <summary>Pause (UI:n II/▶): kerronta, siltalause, lento ja kierto seis; jatka palauttaa ne kohdasta. true = otettu oppaalle.</summary>
        public static bool Tauko(bool paalle)
        {
            if (!Auki) return false;
            var v = Viimeisin;
            if (v.tauolla == paalle) return true;
            v.tauolla = paalle; v.silmukka.Tauolla = paalle;
            if (paalle)
            {
                v.taukoAlku = Time.unscaledTime;
                v.puhe?.Pause(); v.silta?.Pause();
                if (v.nimiSoitto != null) { v.o.StopCoroutine(v.nimiSoitto); v.nimiSoitto = null; }
            }
            else
            {
                float kesto = Time.unscaledTime - v.taukoAlku;
                if (v.puheLoppuu < float.MaxValue) v.puheLoppuu += kesto;   // klipin loppu siirtyy tauon verran
                if (v.pelaajanToimi > 0) v.pelaajanToimi += kesto;
                v.puhe?.UnPause(); v.silta?.UnPause();
            }
            v.o.Kirjaa($"opas: {(paalle ? "tauko" : "jatkuu")}");
            return true;
        }

        /// <summary>Pelaajan täkyvalinta: opas alkaa (tai siirtyy) kohteen kaupunkiin ja pyytää kohteen. true = otettu oppaalle.</summary>
        public static bool Valitse(OpasTaky t)
        {
            if (!Auki || t == null || string.IsNullOrEmpty(t.Nimi)) return false;
            var v = Viimeisin;
            if (!string.IsNullOrEmpty(t.Kaupunki)) Aloituskaupunki = t.Kaupunki;
            v.pakotettuSijainti = (t.Lat, t.Lon);
            v.o.Kirjaa($"opas: täky valittu {t.Nimi} ({t.Kaupunki}, {t.Iso2})");
            if (v.tauolla) Tauko(false);
            if (v.kaupunkiOdottaa)
            {
                // Aloitusvalikosta: kartta auki kohteeseen ja siirtoruutu heti; workerin pysähdys pyydetään samalla (Liiku).
                if (!v.AvaaKaupunki(t.Lat, t.Lon, t.Nimi)) return false;
                v.silmukka.Liiku(t.Nimi, t.Lat, t.Lon);
            }
            else v.silmukka.Toive(t.Nimi);
            v.Silta(OpasSiltalauseet.Kuittaus, true);
            return true;
        }
        /// <summary>Kuten Valitse(OpasTaky) luettelon indeksillä (heijastuksen helpottamiseksi).</summary>
        public static bool Valitse(int indeksi) => Takyt != null && indeksi >= 0 && indeksi < Takyt.Count && Valitse(Takyt[indeksi]);

        /// <summary>Aloituksen suosikit (omistaja 6.10. 14.2x: jopa 50; Pelikoodari #4054 GET /opas/kohteet?n=50). Kylmä 50 kestää
        /// workerilla 30–60 s, joten aikarajan jälkeen haetaan tavalliset 8 täkyä (lämpimät) ennen kuin luovutetaan.</summary>
        public const int SuosikkejaMax = 50;
        public const int SuosikitAikarajaS = 20;

        IEnumerator LataaTakyt()
        {
            List<OpasTaky> lista = null; string tila = "";
            foreach (var polku in new[] { "/opas/kohteet?n=" + SuosikkejaMax, "/opas/kohteet" })
            {
                using var r = UnityWebRequest.Get(PuluChat.Palvelin + polku);
                r.timeout = SuosikitAikarajaS;
                r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
                r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
                PolloTestitunnus.Lisaa(r);
                yield return r.SendWebRequest();
                if (silmukka == null) yield break;
                tila += (tila.Length > 0 ? ", " : "") + polku + " " + (r.result == UnityWebRequest.Result.Success ? "ok" : r.responseCode.ToString());
                if (r.result != UnityWebRequest.Result.Success) continue;
                lista = OpasTaky.Lue(MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>);
                if (lista.Count > 0) break;
            }
            takyt = lista ?? new List<OpasTaky>();
            o.Kirjaa($"opas: täkyt {takyt.Count} ({tila})");
            if (takyt.Count == 0 && !silmukka.Aloitettu)
            {
                // Ei täkyjä: vanha alku (Kööpenhamina) ja kartta auki heti.
                var a = KoopenhaminaTesti.Alku;
                if (AvaaKaupunki(a.Lat, a.Lon, Aloituskaupunki)) silmukka.Aloita(Aloituskaupunki);
            }
        }

        // ---- MAIDEN JA KAUPUNKIEN NIMET (juna 146; Ydin OpasNimiaanet) ----
        public const string NimetOsoite = "https://media.matkakirja.app/aanet/opas/nimet-v1/nimet.json",
            MaatOsoite = "https://media.matkakirja.app/aanet/opas/maat-v1/maat.json";
        static OpasNimiaanet nimiaanet;
        static bool nimiaLadataan;
        static readonly Dictionary<string, AudioClip> nimiKlipit = new Dictionary<string, AudioClip>(StringComparer.Ordinal);
        Coroutine nimiSoitto;

        /// <summary>Nimi tai nimi + jatko heti (leikkeet haetaan tarvittaessa, ~0,3 s). false = ei aineistoa → siltalause käy.</summary>
        bool SanoNimi(NimiLeike[] leikkeet)
        {
            pelaajanToimi = Time.unscaledTime;
            if (silmukka != null && silmukka.Siirtymassa) return true;   // ei puhetta latausruudun aikana
            if (leikkeet == null || leikkeet.Length == 0 || silta == null || !Asetukset.Paalla(Kytkin.Kertoja)) return false;
            if (nimiSoitto != null) o.StopCoroutine(nimiSoitto);
            nimiSoitto = o.StartCoroutine(SoitaNimi(leikkeet));
            return true;
        }

        IEnumerator SoitaNimi(NimiLeike[] leikkeet)
        {
            if (silta.isPlaying) silta.Stop();
            foreach (var l in leikkeet)
            {
                if (!nimiKlipit.TryGetValue(l.Url, out var c) || c == null)
                {
                    using var p = UnityWebRequestMultimedia.GetAudioClip(l.Url, AudioType.MPEG);
                    p.timeout = 8;
                    yield return p.SendWebRequest();
                    if (p.result != UnityWebRequest.Result.Success) { o.Kirjaa($"opas: nimi {l.Id} ei latautunut ({p.responseCode})"); continue; }
                    c = DownloadHandlerAudioClip.GetContent(p);
                    if (nimiKlipit.Count > 64) nimiKlipit.Clear();   // pieni välimuisti: kukin leike ~20–60 kt
                    nimiKlipit[l.Url] = c;
                }
                if (silmukka == null || puhuu) yield break;   // kerronta ehti alkaa: nimi jää pois
                silta.clip = c; silta.volume = 1f; silta.Play();
                o.Kirjaa($"opas: nimi {l.Id} \"{l.Teksti}\"");
                while (silta.isPlaying) yield return null;
            }
            nimiSoitto = null;
        }

        IEnumerator LataaNimiaanet()
        {
            nimiaLadataan = true;
            Dictionary<string, object> n = null, m = null;
            using (var r = UnityWebRequest.Get(NimetOsoite)) { r.timeout = 15; yield return r.SendWebRequest(); if (r.result == UnityWebRequest.Result.Success) n = MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>; }
            using (var r = UnityWebRequest.Get(MaatOsoite)) { r.timeout = 15; yield return r.SendWebRequest(); if (r.result == UnityWebRequest.Result.Success) m = MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>; }
            nimiaanet = OpasNimiaanet.Lue(n, m);
            nimiaLadataan = false;
            o.Kirjaa(nimiaanet != null ? "opas: nimiäänet ladattu" : "opas: nimiäänet ei latautunut");
        }

        // ---- SILTALAUSEET (juna 146; Ydin OpasSiltalauseet) ----
        public const string SiltalauseetOsoite = "https://media.matkakirja.app/aanet/opas/siltalauseet-v1/siltalauseet.json";
        const float OdotusLauseS = 6f, SiltaOdotusS = 5f;
        AudioSource silta;
        OpasSiltalauseet siltalauseet;
        readonly Dictionary<string, AudioClip> siltaKlipit = new Dictionary<string, AudioClip>(StringComparer.Ordinal);
        float pelaajanToimi = -1f;
        OpasKohde siltaOdottaa;

        /// <summary>Lause ryhmästä heti (ei toistoa istunnossa); pelaajan valinnasta käynnistää myös 6 s:n odotus-lauseen ajastimen.
        /// Ei soi, jos Kertoja on pois tai kerronta jo soi.</summary>
        void Silta(string ryhma, bool pelaajalta)
        {
            if (pelaajalta) pelaajanToimi = Time.unscaledTime;
            if (silmukka != null && silmukka.Siirtymassa) return;   // kertoja odottaa näkymän aukeamista (omistaja 12.0x)
            if (siltalauseet == null || silta == null || !Asetukset.Paalla(Kytkin.Kertoja) || puhuu || silta.isPlaying) return;
            var l = siltalauseet.Valitse(ryhma, ryhma == OpasSiltalauseet.Odotus ? null : OpasSiltalauseet.Kuittaus, x => siltaKlipit.ContainsKey(x.Url));
            if (l == null) return;
            silta.clip = siltaKlipit[l.Url]; silta.volume = 1f; silta.Play();
            o.Kirjaa($"opas: siltalause {l.Id} ({ryhma}) \"{l.Teksti}\"");
        }

        /// <summary>Kierroksen siirtymä: automaattinen lento soittaa "kierros" (yli 20 km "lento"); toiveen lento soitti jo valinnasta.</summary>
        void LentoAlkoi(OpasKohde k, double matkaM, bool toiveesta)
        {
            if (!toiveesta) Silta(matkaM > 20000 ? OpasSiltalauseet.Lento : OpasSiltalauseet.Kierros, false);
        }

        IEnumerator SoitaSillanJalkeen(OpasKohde k)
        {
            float t0 = Time.realtimeSinceStartup;
            while (silta != null && silta.isPlaying && Time.realtimeSinceStartup - t0 < SiltaOdotusS) yield return null;
            yield return new WaitForSecondsRealtime(0.25f);   // pieni hengähdys lauseen ja kerronnan väliin
            if (silmukka == null) yield break;
            Soita(k);
        }

        /// <summary>Siltalauseiden JSON ja kaikki mp3:t kerran avauksessa (94 × ~2 s, ~4 Mt; 4 rinnakkain).</summary>
        IEnumerator LataaSiltalauseet()
        {
            using (var r = UnityWebRequest.Get(SiltalauseetOsoite))
            {
                r.timeout = 15;
                yield return r.SendWebRequest();
                if (r.result != UnityWebRequest.Result.Success) { o.Kirjaa($"opas: siltalauseet ei latautunut ({r.responseCode})"); yield break; }
                siltalauseet = OpasSiltalauseet.Lue(MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>);
            }
            if (siltalauseet == null) { o.Kirjaa("opas: siltalauseet: virheellinen JSON"); yield break; }
            var jono = new Queue<Siltalause>(siltalauseet.Kaikki());
            int kesken = 0, ok = 0;
            float t0 = Time.realtimeSinceStartup;
            IEnumerator Yksi(Siltalause l)
            {
                kesken++;
                using (var p = UnityWebRequestMultimedia.GetAudioClip(l.Url, AudioType.MPEG))
                {
                    ((DownloadHandlerAudioClip)p.downloadHandler).compressed = true;
                    p.timeout = 20;
                    yield return p.SendWebRequest();
                    if (p.result == UnityWebRequest.Result.Success) { var c = DownloadHandlerAudioClip.GetContent(p); if (c != null) { siltaKlipit[l.Url] = c; ok++; } }
                }
                kesken--;
            }
            while (jono.Count > 0 || kesken > 0)
            {
                while (jono.Count > 0 && kesken < 4) o.StartCoroutine(Yksi(jono.Dequeue()));
                yield return null;
            }
            o.Kirjaa($"opas: siltalauseet {ok}/{siltalauseet.Maara} ladattu {Time.realtimeSinceStartup - t0:F1} s:ssa");
            // Avauksen lause, jos kerronta ei vielä soi (worker suunnittelee ensimmäistä pysähdystä).
            if (silmukka != null && !puhuu) Silta(OpasSiltalauseet.Aloitus, false);
        }

        /// <summary>
        /// Tappiohjaus (juna 145): Natiivi-UI:n OpasTapit (UI-kokoonpano, luetaan heijastuksella kuten OpasValikko, jotta
        /// linssit kääntyy ilman UI-haaraa) silmukalle; komento "opas tapit kierto korkeus etäisyys s" ohittaa kestoksi (simutesti).
        /// Akselit (Päätoimittaja 5.10. 21.4x, hyväksytty): oikea ↔ kiertää (Oikea.x), oikea ↕ nostaa/laskee (Oikea.y), vasen ylös
        /// lähentää ja alas loitontaa (etäisyys = −Vasen.y). Järjestys Siirtosepän OpasOhjaus.Paivita(kierto, korkeus, etäisyys).
        /// </summary>
        /// <summary>
        /// Kohteen nimilappu (Natiivi-UI OpasNimilappu, juna 145; UI-kokoonpano heijastuksella): nasta kohteen yläpuolella (maa + korkeus,
        /// 5–80 m) pysähdyksellä, kamera kaupunkinäkymän pääkamera. Sulje irrottaa.
        /// </summary>
        void KytkeNimilappu(bool paalle)
        {
            var t = typeof(PuluChat).Assembly.GetType("Matkakirja.Natiivi.OpasNimilappu");
            if (t == null) return;
            const System.Reflection.BindingFlags F = System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static;
            Func<Vector3?> kohde = null; Func<Camera> kamera = null;
            if (paalle)
            {
                kohde = () =>
                {
                    var l = silmukka; var k = l?.Nykyinen; var kehys = l?.NykyinenKehys;
                    if (k == null || kehys == null || k.Kysymys) return null;
                    double nosto = Math.Max(5, Math.Min(80, k.KorkeusM > 0 ? k.KorkeusM : k.KokoM * 0.3));
                    return kaupunki.MaailmaPiste(k.Lat, k.Lon, kehys.MaaM + nosto);
                };
                kamera = () => kaupunki.Kamera;
            }
            t.GetField("Kohde", F)?.SetValue(null, kohde);
            t.GetField("Kamera", F)?.SetValue(null, kamera);
        }

        void LueTapit()
        {
            if (Time.unscaledTime < tapitTestiLoppuu) { silmukka.Tapit = tapitTesti; silmukka.PelaajaOhjaa = true; return; }
            if (!tapitHaettu)
            {
                tapitHaettu = true;
                var t = typeof(PuluChat).Assembly.GetType("Matkakirja.Natiivi.OpasTapit");
                const System.Reflection.BindingFlags F = System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static;
                tapVasen = t?.GetProperty("Vasen", F); tapOikea = t?.GetProperty("Oikea", F); tapKosketaan = t?.GetProperty("Kosketaan", F);
            }
            if (tapVasen == null || tapOikea == null || tapKosketaan == null) { silmukka.Tapit = default; silmukka.PelaajaOhjaa = false; return; }
            var v = (Vector2)tapVasen.GetValue(null); var o2 = (Vector2)tapOikea.GetValue(null);
            silmukka.Tapit = (o2.x, o2.y, -v.y);
            silmukka.PelaajaOhjaa = (bool)tapKosketaan.GetValue(null);
        }
        bool tapitHaettu;
        System.Reflection.PropertyInfo tapVasen, tapOikea, tapKosketaan;
        static (double, double, double) tapitTesti;
        static float tapitTestiLoppuu = -1f;
        /// <summary>Komento "opas tapit k h e s" (LinssiOhjain): akselit −1…1 kestoksi s sekuntia.</summary>
        public static void TestiTapit(double kierto, double korkeus, double etaisyys, float s)
        {
            tapitTesti = (Mathf.Clamp((float)kierto, -1, 1), Mathf.Clamp((float)korkeus, -1, 1), Mathf.Clamp((float)etaisyys, -1, 1));
            tapitTestiLoppuu = Time.unscaledTime + Mathf.Max(0, s);
        }

        /// <summary>Virheen jälkeen: 429 → "Opas lepää hetken" (kerran virhesarjaa kohden); luovutus → linssi kiinni viestillä
        /// (KierrosTaulu näyttää Virheen tilarivillä ja sulkee).</summary>
        void VirheIlmoitus(string viesti)
        {
            var l = silmukka;
            if (l == null) return;
            if (l.Luovutti)
            {
                Virhe = l.ViimeKoodi == 429 ? (viesti ?? "Opas lepää tänään. Palaa huomenna.") : "Opas ei vastaa juuri nyt. Yritä hetken päästä uudelleen.";
                o.Kirjaa($"opas: luovutti, {l.Virheita} virhettä (viimeisin {l.ViimeKoodi}), linssi kiinni");
                return;
            }
            o.Kirjaa($"opas: virhe {l.Virheita}/{OpasSilmukka.VirheitaMax} ({l.ViimeKoodi}), seuraava yritys {l.VirheTauko:F0} s:n päästä");
        }

        /// <summary>Workerin virhevastauksen "viesti"-kenttä (Pöllö #4018, 429), tai null.</summary>
        static string WorkerinViesti(string json)
        {
            if (string.IsNullOrEmpty(json)) return null;
            try { return (MiniJson.Jasenna(json) as Dictionary<string, object>)?.TryGetValue("viesti", out var v) == true ? v as string : null; }
            catch { return null; }
        }

        IEnumerator TestiVastaus(int n)
        {
            yield return new WaitForSecondsRealtime(0.8f);
            var lista = KoopenhaminaTesti.Kohteet;
            var k = lista[testiIndeksi++ % lista.Length];
            k.Teksti ??= k.Nimi + ": " + k.Alarivi + ".";
            Valmistele(k);
            silmukka?.Vastaus(n, k);
        }

        IEnumerator Hae(int n, string toive)
        {
            var a = silmukka.Asento;
            double sLat = a.Lat, sLon = a.Lon;
            if (pakotettuSijainti is (double, double) ps) { sLat = ps.lat; sLon = ps.lon; pakotettuSijainti = null; }
            if (silmukka.PyynnonSijainti is (double, double) pk) { sLat = pk.lat; sLon = pk.lon; silmukka.PyynnonSijainti = null; }
            var kt = silmukka.KierrosTieto;
            var sb = new StringBuilder("{");
            sb.Append("\"istunto\":\"").Append(istunto).Append("\",");
            sb.Append("\"toive\":").Append(toive == null ? "null" : "\"" + Escape(toive) + "\"").Append(',');
            sb.Append("\"kaupunki\":\"").Append(Escape(Aloituskaupunki)).Append("\",");
            sb.Append("\"sijainti\":{\"lat\":").Append(sLat.ToString("F5", System.Globalization.CultureInfo.InvariantCulture))
              .Append(",\"lon\":").Append(sLon.ToString("F5", System.Globalization.CultureInfo.InvariantCulture)).Append("},");
            sb.Append("\"nahdyt\":[");
            bool eka = true;
            foreach (var id in silmukka.Nahdyt) { if (!eka) sb.Append(','); sb.Append('"').Append(Escape(id)).Append('"'); eka = false; }
            sb.Append("],\"kieli\":\"fi\"");
            // Kaupunkikierros: lyhyt kerronta ja järjestysnumero (omistaja 11.57).
            if (kt.numero > 0) sb.Append(",\"kierros\":{\"numero\":").Append(kt.numero).Append(",\"maara\":").Append(kt.maara).Append("},\"lyhyt\":true");
            // Näytettävät tekijätiedot (Pelikoodari #4028, ODbL): worker palauttaa OSM-pohjaista dataa vain, kun "osm" on mukana.
            sb.Append(",\"krediitit\":[\"osm\"]");
            // "Kerro lisää" ei toista edellistä kappaletta (Pelikoodari #4011).
            var ed = silmukka.Nykyinen?.Teksti;
            if (!string.IsNullOrEmpty(ed)) sb.Append(",\"edellinen_teksti\":\"").Append(Escape(ed)).Append('"');
            sb.Append('}');
            using var r = new UnityWebRequest(PuluChat.Palvelin + Polku, "POST")
            {
                uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(sb.ToString())),
                downloadHandler = new DownloadHandlerBuffer(),
                timeout = AikarajaS,
            };
            r.SetRequestHeader("Content-Type", "application/json");
            r.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            PolloTestitunnus.Lisaa(r);
            r.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            string koodi = Asetukset.PolloKoodi;   // kehittäjäkoodi Keychainista kuten Pulun chatissa; ei lokiin
            if (!string.IsNullOrEmpty(koodi)) r.SetRequestHeader(Lukijaaani.KoodiOtsake, koodi);
            if (Testiotsake) r.SetRequestHeader("x-matkakirja-testi", "1");
            float t0 = Time.realtimeSinceStartup;
            yield return r.SendWebRequest();
            if (silmukka == null) yield break;
            OpasKohde k = null;
            if (r.result == UnityWebRequest.Result.Success)
                k = OpasKohde.Lue(MiniJson.Jasenna(r.downloadHandler.text) as Dictionary<string, object>);
            o.Kirjaa($"opas: vastaus {n} {(k == null ? "VIRHE " + r.responseCode + " " + r.error : k.Kysymys ? "kysymys (" + (k.Vaihtoehdot?.Length ?? 0) + " vaihtoehtoa)" : k.Nimi)} ({Time.realtimeSinceStartup - t0:F1} s), ääni {(k?.Aani != null ? "url" : "ei")}");
            if (k != null) Valmistele(k);
            double odota = 0;
            if (k == null && double.TryParse(r.GetResponseHeader("Retry-After"), System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var ra)) odota = ra;
            silmukka.Vastaus(n, k, k == null ? (int)r.responseCode : 0, odota);
            if (k == null) VirheIlmoitus(r.responseCode == 429 ? WorkerinViesti(r.downloadHandler?.text) : null);
        }

        static string Escape(string s) => s.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\n", " ");

        /// <summary>Vastauksen tultua: maaston korkeus näytteenä ja äänen lataus (molemmat ehtivät lennon aikana).</summary>
        void Valmistele(OpasKohde k)
        {
            if (!k.Kysymys) o.StartCoroutine(Korkeus(k));
            if (PcmKaytossa && !string.IsNullOrEmpty(k.AaniPcm)) { if (!klipit.ContainsKey(k.AaniPcm) && !pcmVirrat.ContainsKey(k.AaniPcm)) o.StartCoroutine(LataaPcm(k)); }
            else if (!string.IsNullOrEmpty(k.Aani) && !klipit.ContainsKey(k.Aani)) o.StartCoroutine(LataaAani(k.Aani));
        }

        /// <summary>PCM-virrat avaimittain (Pöllön aani_pcm) ja soiva virta (loppu tunnistetaan siitä, ei klipin pituudesta).</summary>
        readonly Dictionary<string, PcmVirta> pcmVirrat = new Dictionary<string, PcmVirta>(StringComparer.Ordinal);
        PcmVirta pcmNyt;
        /// <summary>Toisto alkaa, kun virrassa on näin paljon puskuria (s) tai lataus on valmis.</summary>
        const float PcmPuskuriS = 0.5f;

        /// <summary>PCM-virran lataus: klippi valmiina (klipit[avain]), kun puskuria on PcmPuskuriS; lataus jatkuu taustalla loppuun.</summary>
        IEnumerator LataaPcm(OpasKohde k)
        {
            string avain = k.AaniPcm;
            var virta = new PcmVirta(k.AaniTaajuus, (float)k.KestoS);
            pcmVirrat[avain] = virta;
            using var p = new UnityWebRequest(avain, "GET") { downloadHandler = virta, timeout = AikarajaS + 30, disposeDownloadHandlerOnDispose = false };   // virta elää klipin mukana
            p.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            PolloTestitunnus.Lisaa(p);
            p.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            float t0 = Time.realtimeSinceStartup;
            var op = p.SendWebRequest();
            while (!op.isDone && virta.PuskuroituS < PcmPuskuriS) yield return null;
            if (p.result == UnityWebRequest.Result.ConnectionError || p.result == UnityWebRequest.Result.ProtocolError || virta.KirjoitettuS <= 0f)
            {
                while (!op.isDone) yield return null;
                o.Kirjaa($"opas: PCM-virta epäonnistui ({p.responseCode} {p.error}), mp3-varapolku");
                pcmVirrat.Remove(avain);
                if (!string.IsNullOrEmpty(k.Aani) && !klipit.ContainsKey(k.Aani)) { yield return LataaAani(k.Aani); if (klipit.TryGetValue(k.Aani, out var mp3)) klipit[avain] = mp3; }
                else klipit[avain] = null;
                yield break;
            }
            klipit[avain] = virta.Klippi("opas-pcm", (float)k.KestoS);
            o.Kirjaa($"opas: PCM-virta soittovalmis {Time.realtimeSinceStartup - t0:F1} s:ssa ({virta.PuskuroituS:F1} s puskurissa)");
            while (!op.isDone) yield return null;
            o.Kirjaa($"opas: PCM-virta valmis {Time.realtimeSinceStartup - t0:F1} s, {virta.KirjoitettuS:F1} s ääntä");
        }

        IEnumerator Korkeus(OpasKohde k)
        {
            var pinta = kaupunki.Pinta;
            if (pinta == null) yield break;
            var tehtava = pinta.SampleHeightMostDetailed(new double3(k.Lon, k.Lat, 0));
            while (!tehtava.IsCompleted) yield return null;
            if (tehtava.IsFaulted || tehtava.Result == null || tehtava.Result.sampleSuccess == null || tehtava.Result.sampleSuccess.Length == 0) yield break;
            if (tehtava.Result.sampleSuccess[0]) maaKorkeudet[Avain(k)] = pisteKorkeudet[PisteAvain(k.Lat, k.Lon)] = tehtava.Result.longitudeLatitudeHeightPositions[0].z;
        }

        /// <summary>Kohdekehyksen maa pisteeseen (silmukka.MaaTarvitaan); epäonnistuessa arvio 45 m, jottei siirto jää odottamaan.</summary>
        IEnumerator KorkeusPisteessa(double lat, double lon)
        {
            string a = PisteAvain(lat, lon);
            var pinta = kaupunki.Pinta;
            if (pinta == null || pisteKorkeudet.ContainsKey(a) || !pisteNaytteet.Add(a)) yield break;
            float t0 = Time.realtimeSinceStartup;
            var tehtava = pinta.SampleHeightMostDetailed(new double3(lon, lat, 0));
            while (!tehtava.IsCompleted) yield return null;
            pisteNaytteet.Remove(a);
            var tulos = tehtava.IsFaulted ? null : tehtava.Result;
            bool ok = tulos?.sampleSuccess != null && tulos.sampleSuccess.Length > 0 && tulos.sampleSuccess[0];
            pisteKorkeudet[a] = ok ? tulos.longitudeLatitudeHeightPositions[0].z : OpasSilmukka.MaaArvioM;
            o.Kirjaa($"opas: maa ({lat:F4}, {lon:F4}) {(ok ? "" : "näyte epäonnistui, arvio ")}{pisteKorkeudet[a]:F0} m, {Time.realtimeSinceStartup - t0:F1} s");
        }

        IEnumerator LataaAani(string url)
        {
            using var p = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.MPEG);
            ((DownloadHandlerAudioClip)p.downloadHandler).streamAudio = false;
            p.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
            PolloTestitunnus.Lisaa(p);
            p.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
            p.timeout = AikarajaS;
            yield return p.SendWebRequest();
            if (p.result != UnityWebRequest.Result.Success) { o.Kirjaa("opas: ääni ei latautunut: " + p.error); klipit[url] = null; yield break; }
            klipit[url] = DownloadHandlerAudioClip.GetContent(p);
        }

        // ── Saapuminen ja puhe ───────────────────────────────────────────────
        void Saapui(OpasKohde k)
        {
            kaupunki.SiirraOrigo(k.Lat, k.Lon, MaaKorkeus(k) is double m && !double.IsNaN(m) ? m : 45);
            if (puhuttu != k) AlkaaPuhua(k);   // ei aloitettu lennon lopussa (esim. sama paikka): nyt
            if (!k.Id?.StartsWith("kysy-") ?? true) PaivitaKysymykset(k);
            saapumisia++;
            o.StartCoroutine(Siivoa());
            o.Kirjaa($"opas: saapui {k.Nimi} ({k.Lat:F4}, {k.Lon:F4}), ääni {(puhuu ? "soi" : "ei")}, laatat {kaupunki.Latausaste:F0} %");
            o.Kirjaa($"opas: kuvat {k.Kuvat?.Length ?? 0} (tekijällä {System.Linq.Enumerable.Count(k.Kuvat ?? Array.Empty<OpasKuva>(), x => !string.IsNullOrEmpty(x.Tekija))}), hylätty yhteensä {OpasKuva.Hylatyt}");
            OpasKorostusKuva.Nayta(k, silmukka?.NykyinenKehys?.MaaM ?? (MaaKorkeus(k) is double mk && !double.IsNaN(mk) ? mk : 45), kaupunki.Georef);   // Siirtoseppä: korostus (juna 145)
        }

        /// <summary>Kappale tai kysymys ääneen; ilman ääntä (testi, Kertoja pois, lataus kesken) teksti ruudulle kestoksi.</summary>
        void Soita(OpasKohde k)
        {
            // Siltalause soi vielä: kerronta alkaa pehmeästi sen perään (enintään SiltaOdotusS).
            if (silta != null && silta.isPlaying && siltaOdottaa != k) { siltaOdottaa = k; o.StartCoroutine(SoitaSillanJalkeen(k)); return; }
            siltaOdottaa = null;
            Hiljenna();
            tekstina = null;
            bool kertoja = Asetukset.Paalla(Kytkin.Kertoja);
            // Ääni latautuu vielä (simu 19.0x: saapumiset ilman ääntä): odotetaan enintään AaniOdotusS ennen tekstiä.
            string avain = AaniAvain(k);
            if (kertoja && !string.IsNullOrEmpty(avain) && !klipit.ContainsKey(avain) && aaniOdotus != k) { aaniOdotus = k; o.StartCoroutine(OdotaAani(k)); return; }
            aaniOdotus = null;
            if (kertoja && !string.IsNullOrEmpty(avain) && klipit.TryGetValue(avain, out var klippi) && klippi != null && puhe != null)
            {
                puhe.clip = klippi; puhe.volume = 1f; puhe.Play();
                puhuu = true; y.Repliikki(true);
                pelaajanToimi = -1f;   // kerronta alkoi: odotus-lausetta ei tarvita
                pcmNyt = pcmVirrat.TryGetValue(avain, out var v) ? v : null;
                puheLoppuu = pcmNyt != null ? float.MaxValue : Time.unscaledTime + klippi.length;
                return;
            }
            o.Kirjaa($"opas: kappale tekstinä ({(!kertoja ? "Kertoja pois" : string.IsNullOrEmpty(avain) ? "ei ääntä vastauksessa" : "ääni ei latautunut")})");
            tekstina = k;
            double s = k.KestoS > 0 ? k.KestoS : KierrosLento.PysahdysKesto(k.Teksti);
            o.StartCoroutine(TekstiLoppuu(s, k));
        }
        OpasKohde tekstina, aaniOdotus;
        const float AaniOdotusS = 10f;   // #4018: mp3 valmistuu GETissä ~8–9 s tekstin jälkeen (toiveen polku)

        IEnumerator OdotaAani(OpasKohde k)
        {
            float t0 = Time.realtimeSinceStartup;
            string avain = AaniAvain(k);
            while (silmukka != null && !klipit.ContainsKey(avain) && Time.realtimeSinceStartup - t0 < AaniOdotusS) yield return null;
            if (silmukka == null || (silmukka.Nykyinen != k && !(silmukka.OdottaaVastausta && viimeKysymys == k))) yield break;
            o.Kirjaa($"opas: ääni {(klipit.ContainsKey(avain) ? "latautui" : "ei latautunut")} {Time.realtimeSinceStartup - t0:F1} s:ssa");
            Soita(k);
        }

        int saapumisia;
        OpasKohde puhuttu;

        /// <summary>Kappale alkaa noin 3 s ennen saapumista (Päätoimittaja 5.10. 19.4x: hiljaisuus pysähdysten välissä enintään ~3 s).</summary>
        void AlkaaPuhua(OpasKohde k)
        {
            if (k == null || puhuttu == k) return;
            puhuttu = k;
            VapautaVanhatAanet(k);
            Soita(k);
            KysymysChattiin(k);   // kappale ja sen vaihtoehdot Pulu-chatiin (Natiivi-UI 18.0x)
        }

        /// <summary>Muut kuin nykyinen ja esihaettu kappale pois muistista (AudioClip vapautetaan).</summary>
        void VapautaVanhatAanet(OpasKohde nyt)
        {
            var pidetaan = new HashSet<string>();
            if (AaniAvain(nyt) != null) pidetaan.Add(AaniAvain(nyt));
            if (AaniAvain(silmukka?.Seuraava) != null) pidetaan.Add(AaniAvain(silmukka.Seuraava));
            if (AaniAvain(viimeKysymys) != null && silmukka != null && silmukka.OdottaaVastausta) pidetaan.Add(AaniAvain(viimeKysymys));
            var pois = new List<string>();
            foreach (var kv in klipit) if (!pidetaan.Contains(kv.Key)) pois.Add(kv.Key);
            foreach (var u in pois) { if (klipit[u] != null && (puhe == null || puhe.clip != klipit[u])) UnityEngine.Object.Destroy(klipit[u]); klipit.Remove(u); pcmVirrat.Remove(u); }
        }

        /// <summary>Pysähdyksen alussa (kamera kiertää hitaasti): käyttämättömät resurssit pois ja muistierittely lokiin.</summary>
        IEnumerator Siivoa()
        {
            yield return new WaitForSecondsRealtime(1.5f);
            if (silmukka == null) yield break;
            var op = Resources.UnloadUnusedAssets();
            while (!op.isDone) yield return null;
            o.Kirjaa($"opas: {saapumisia}. pysähdys, " + kaupunki.Muisti());
        }

        IEnumerator TekstiLoppuu(double s, OpasKohde k)
        {
            double t = 0;
            while (t < s) { if (!tauolla) t += Time.unscaledDeltaTime; yield return null; }   // tauko pysäyttää myös tekstikappaleen
            if (silmukka != null && tekstina == k && !puhuu) { tekstina = null; silmukka.AaniLoppui(); }
        }

        /// <summary>
        /// Workerin kysymys: William kysyy ääneen, ja vaihtoehdot näkyvät Pulu-chatissa kahtena jatkokysymyksenä
        /// (Natiivi-UI: UiNakymat.Chat.Vastaa, heijastuksella, jotta tämä kääntyy myös ilman sitä). Valinta tulee Toive-kutsuna.
        /// </summary>
        void Kysyy(OpasKohde k)
        {
            if ((!PcmKaytossa || string.IsNullOrEmpty(k.AaniPcm)) && !string.IsNullOrEmpty(k.Aani) && !klipit.ContainsKey(k.Aani)) { o.StartCoroutine(SoitaLadattuna(k)); }
            else Soita(k);   // PCM: Soita odottaa virtaa (OdotaAani)
            KysymysChattiin(k);
            o.Kirjaa($"opas: kysyy \"{k.Teksti}\" [{string.Join(" | ", k.Vaihtoehdot ?? Array.Empty<string>())}]");
        }

        IEnumerator SoitaLadattuna(OpasKohde k)
        {
            yield return LataaAani(k.Aani);
            if (silmukka != null && silmukka.OdottaaVastausta) Soita(k);
        }

        /// <summary>Viimeisin kysymys ja vaihtoehdot (UI näyttää ne myös ilman chattia).</summary>
        public OpasKohde Kysymys => silmukka != null && silmukka.OdottaaVastausta ? viimeKysymys : null;
        OpasKohde viimeKysymys;

        /// <summary>Pulu-chat on käytettävissä (Natiivi-UI): kappale näytetään vain siellä, ei kertojalaatikossa.</summary>
        public static bool ChatKaytossa => ChatVastaa(out _, out _) != null;

        static System.Reflection.MethodInfo ChatVastaa(out object chat, out System.Reflection.ParameterInfo[] p)
        {
            chat = null; p = null;
            var ui = UiNakymat.Hae();
            chat = ui?.GetType().GetField("Chat")?.GetValue(ui) ?? ui?.GetType().GetProperty("Chat")?.GetValue(ui);
            var m = chat?.GetType().GetMethod("Vastaa");
            p = m?.GetParameters();
            return m;
        }

        /// <summary>Chat auki oppaalle (Natiivi-UI: Chat.AvaaOppaalle()) tai kiinni (Chat.SuljeOppaalta()), jos metodit ovat olemassa.</summary>
        static void ChatOppaalle(bool auki)
        {
            try
            {
                ChatVastaa(out var chat, out _);
                var m = chat?.GetType().GetMethod(auki ? "AvaaOppaalle" : "SuljeOppaalta", Type.EmptyTypes);
                m?.Invoke(chat, null);
            }
            catch (Exception) { }
        }

        void KysymysChattiin(OpasKohde k)
        {
            if (k.Kysymys) viimeKysymys = k;
            try
            {
                var vastaa = ChatVastaa(out var chat, out var p);
                if (vastaa == null) return;
                object jatkot = k.Vaihtoehdot ?? Array.Empty<string>();
                if (p.Length == 2 && !p[1].ParameterType.IsAssignableFrom(jatkot.GetType()))
                    jatkot = p[1].ParameterType.IsAssignableFrom(typeof(List<string>)) ? new List<string>(k.Vaihtoehdot ?? Array.Empty<string>()) : null;
                vastaa.Invoke(chat, p.Length == 2 ? new[] { (object)k.Teksti, jatkot } : new object[] { k.Teksti });
            }
            catch (Exception e) { o.Kirjaa("opas: kysymys chattiin epäonnistui: " + e.GetType().Name); }
        }

        void Hiljenna()
        {
            pcmNyt = null;
            if (puhe != null && puhe.isPlaying) puhe.Stop();
            if (puhuu) { puhuu = false; y.Repliikki(false); }
        }

        public string Muisti() => "opas: " + kaupunki.Muisti();

        public string Tila() => silmukka == null ? "opas: kiinni"
            : $"opas: {kaupunki.Kaytossa} {silmukka.Vaihe} {(silmukka.Nykyinen?.Nimi ?? "-")}, seuraava {(silmukka.Seuraava?.Nimi ?? "-")}, nähty {System.Linq.Enumerable.Count(silmukka.Nahdyt)}, laatat {kaupunki.Latausaste:F0} %"
              + (Testi ? ", TESTI" : "") + (Virhe != null ? ", VIRHE " + Virhe : "");

        /// <summary>Peite pois vasta, kun kaupunkia näkyy (laatat ≥ PeiteRaja %, enintään PeiteMaxS): ei tasaista värilaattaa avauksessa
        /// (omistaja TF 144, toisto 6.10. 00.04). Vähintään 0,3 s (simu 18.39: peite jäi päälle ilman ajastinta).</summary>
        System.Collections.IEnumerator PeitePois()
        {
            float t0 = Time.realtimeSinceStartup;
            yield return new WaitForSecondsRealtime(0.3f);
            while (silmukka != null && kaupunki.Latausaste < PeiteRaja && Time.realtimeSinceStartup - t0 < PeiteMaxS) yield return null;
            y?.Peite(false);
            o.Kirjaa($"opas: peite pois {Time.realtimeSinceStartup - t0:F1} s, laatat {kaupunki.Latausaste:F0} %");
        }
        const float PeiteRaja = 35f, PeiteMaxS = 4f;

        public void Sulje()
        {
            OpasKorostusKuva.Piilota(true);
            KyydinKameraEnnen.Ajo = null;
            KytkeNimilappu(false);
            Sumenna(false);
            kysymykset = null; kohteet = null; kohteetKaupunki = null; historia.Clear(); siirtymaEdellinen = false;
            if (silta != null && silta.isPlaying) silta.Stop();
            pelaajanToimi = -1f;
            if (nimiaanet == null) nimiaLadataan = false;   // lataus katkesi sulkuun: uusi yritys seuraavassa avauksessa
            nimiSoitto = null;
            KrediititTiivis.OsmNakyvissa = false;
            KrediititTiivis.Paivita(false);
            Hiljenna();
            KytkeChat(false);
            ChatOppaalle(false);
            y?.KuvausLoppui();
            bool avattiin = nakymaAuki;
            nakymaAuki = false;
            kaupunki.Sulje();
            SyoteLukko.Vapauta(this);
            if (avattiin)
            {
                y?.Pelikerrokset(true);
                y?.MusiikkiPitoon(false);
            }
            silmukka = null; paivitetty = -1; Virhe = null; puhuu = false; tauolla = false; takyt = null;
            foreach (var k in klipit.Values) if (k != null) UnityEngine.Object.Destroy(k);
            klipit.Clear();
            pcmVirrat.Clear(); pcmNyt = null;
            maaKorkeudet.Clear();
            Vaihtui?.Invoke(null);
        }
    }
}
