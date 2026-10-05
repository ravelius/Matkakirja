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
        /// <summary>PCM-suoratoisto (Pöllön aani_pcm) käytössä. Oletus pois, kunnes virta on todennettu simulla äänen kanssa
        /// (Päätoimittaja 5.10. 20.3x: juna 144 ilman riskiä); pois-tilassa käytetään mp3:a (aani) kuten ennen. Komento "opas pcm 0|1".</summary>
        public static bool PcmKaytossa;
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
            Viimeisin.silmukka.Toive(teksti);
            return true;
        }

        /// <summary>
        /// Kaupungin vaihto valikosta (Natiivi-UI OpasValikko.KohdeValittu): puhe katkeaa ja seuraava pyyntö menee valittuun
        /// paikkaan (kaupunki ja sijainti). true = otettu oppaalle.
        /// </summary>
        public static bool VaihdaKaupunki(string nimi, double lat, double lon)
        {
            if (!Auki || string.IsNullOrWhiteSpace(nimi)) return false;
            Aloituskaupunki = nimi.Trim();
            Viimeisin.pakotettuSijainti = (lat, lon);
            Viimeisin.o.Kirjaa($"opas: kaupunki vaihtuu → {Aloituskaupunki} ({lat:F3}, {lon:F3})");
            Viimeisin.silmukka.VaihdaPaikka();
            return true;
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
            var alku = KoopenhaminaTesti.Alku;
            silmukka = new OpasSilmukka(alku);
            if (!kaupunki.Avaa(alku.Lat, alku.Lon, 45))
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
            o.StartCoroutine(PeitePois());   // simu 18.39: peite jäi päälle ja tummensi koko näkymän
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
            silmukka.AlkaaPuhua += AlkaaPuhua;
            if (o.GetComponent<KyydinKameraEnnen>() == null) o.gameObject.AddComponent<KyydinKameraEnnen>();
            KyydinKameraEnnen.Ajo = PaivitaKamera;
            silmukka.Aloita(Aloituskaupunki);
            PaivitaKamera();
            Vaihtui?.Invoke(this);
            o.Kirjaa($"opas: auki, data {kaupunki.Kaytossa}, {(Testi ? "TESTI (ei workeria)" : "worker " + PuluChat.Palvelin + Polku)}");
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
            if (paalle) { vanhaSieppaus = kentta.GetValue(null) as Delegate; kentta.SetValue(null, (Func<string, bool>)Toive); }
            else kentta.SetValue(null, vanhaSieppaus);
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
            bool loppui = pcmNyt != null ? pcmNyt.Loppui : Time.unscaledTime >= puheLoppuu && (puhe == null || !puhe.isPlaying);
            if (puhuu && loppui)
            {
                if (pcmNyt != null) { if (pcmNyt.Katkoja > 0) o.Kirjaa($"opas: PCM-virrassa {pcmNyt.Katkoja} katkoa"); pcmNyt = null; if (puhe != null) puhe.Stop(); }
                puhuu = false; y.Repliikki(false); silmukka.AaniLoppui();
            }
            kaupunki.PidaMaski();
            KrediititTiivis.Paivita(true);   // kapealla ruudulla logot + "Data sources" (Googlen policy)
            if (Pysaytetty) { y.Kuvaa(silmukka.Asento); return; }
            var ennen = silmukka.Vaihe;
            LueTapit();
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

        double MaaKorkeus(OpasKohde k) => maaKorkeudet.TryGetValue(Avain(k), out var h) ? h : double.NaN;
        static string Avain(OpasKohde k) => k.Id ?? (k.Lat.ToString("F5") + "," + k.Lon.ToString("F5"));

        // ── Pyynnöt workerille (tai testilista) ──────────────────────────────
        void Pyyda(int n, string toive)
        {
            if (Testi) { o.StartCoroutine(TestiVastaus(n)); return; }
            o.StartCoroutine(Hae(n, toive));
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
            if (tehtava.Result.sampleSuccess[0]) maaKorkeudet[Avain(k)] = tehtava.Result.longitudeLatitudeHeightPositions[0].z;
        }

        IEnumerator LataaAani(string url)
        {
            using var p = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.MPEG);
            ((DownloadHandlerAudioClip)p.downloadHandler).streamAudio = false;
            p.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
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
            saapumisia++;
            o.StartCoroutine(Siivoa());
            o.Kirjaa($"opas: saapui {k.Nimi} ({k.Lat:F4}, {k.Lon:F4}), ääni {(puhuu ? "soi" : "ei")}, laatat {kaupunki.Latausaste:F0} %");
            OpasKorostusKuva.Nayta(k, silmukka?.NykyinenKehys?.MaaM ?? (MaaKorkeus(k) is double mk && !double.IsNaN(mk) ? mk : 45), kaupunki.Georef);   // Siirtoseppä: korostus (juna 145)
        }

        /// <summary>Kappale tai kysymys ääneen; ilman ääntä (testi, Kertoja pois, lataus kesken) teksti ruudulle kestoksi.</summary>
        void Soita(OpasKohde k)
        {
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
            yield return new WaitForSecondsRealtime((float)s);
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

        System.Collections.IEnumerator PeitePois()
        {
            yield return new WaitForSecondsRealtime(0.3f);
            y?.Peite(false);
        }

        public void Sulje()
        {
            OpasKorostusKuva.Piilota(true);
            KyydinKameraEnnen.Ajo = null;
            KytkeNimilappu(false);
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
            silmukka = null; paivitetty = -1; Virhe = null; puhuu = false;
            foreach (var k in klipit.Values) if (k != null) UnityEngine.Object.Destroy(k);
            klipit.Clear();
            pcmVirrat.Clear(); pcmNyt = null;
            maaKorkeudet.Clear();
            Vaihtui?.Invoke(null);
        }
    }
}
