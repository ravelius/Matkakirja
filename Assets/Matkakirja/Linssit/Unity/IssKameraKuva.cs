// ISS-KAMERA, PELAAJAN KUVA (omistaja 1.10.2026): kuvan tekeminen saa kestää. Laukaisussa kello pysähtyy ja nykyinen
// kyydin näkymä työstetään: Karttasepän indeksistä parhaat Sentinel-2-kuvat, laite hakee ja purkaa näkymän tarvitsemat
// COG-laatat (10 m lähellä, 20–160 m kaukana), projisoi ne Web Mercatoriin pilvineen (Ydin/IssKamera) ja asettaa ne
// AstronauttiKerroksen S2-paikalle (KuvanPinta). Kamera renderöi suoraan kuvan kokoiseen RenderTextureen (Cesium valitsee
// laattojen tarkkuuden sen pikselikoon mukaan; filmi, ilmakehä ja siluetti tulevat kameran mukana, UI ei), ja valmis kuva
// tallentuu albumiin persistentDataPath/iss-albumi/<id>.jpg + .json (julisteen tekstikentät kuvaushetken arvoista).
//
//   testikomento   astro kyyti kuvaa [4:5|9:16|4:3] [leveys px], astro kyyti kuvaa tila
//   indeksi        Documents/iss-kamera/indeksi.json, jos on (testi), muuten S2Indeksi.Osoite (välimuistiin samaan paikkaan)
//   loki           "MATKAKIRJA linssit: iss-kamera: …" (vaiheet, megatavut, kestot)
// TARKKA ISS-KUVA (omistaja 4.10.2026 klo 11.44: "Kameranappi tekee VAIN tarkan ISS-kuvan", nappi aktiivinen vain kuvauspaikan
// kohdalla, yksi ilmainen kuva ja sitten kuvapaketit): Cupolan katseen ollessa kuvauspaikalla (AstronauttiLinssi.Kuvauspaikka)
// laukaisu käyttää Karttasepän valmista kuvauspaikan kuvaa (kuvauspaikat/v1/<tunniste>.jpg, 20 × 20 km) COG-haun sijaan:
// PaikanLaatat tekee siitä kuvan pinnan, kamera rajataan paikkaan ISS:ltä (Kuvauspaikat.Rajaus, AstronauttiLinssi.Vertailu kuvan
// ajaksi), ja laitteella tulevat ilmakehä, valo, pilvet ja kameran tuntu kuten ennen. Muualla Euroopassa COG-polku (kirjaus
// "vain kuvauspaikoilla" kumottu 4.10., loki #3934; A/B `astro kyyti kuvaa vapaa 0`). Ilmaisia kuvia Ilmaisia; paketit myöhemmin.
//   testikomennot  astro kyyti kuvaa paikka (tila), kuvaa nollaa (ilmainen kuva takaisin), kuvaa vapaa 0|1
//   aineisto       Documents/iss-kamera/kuvauspaikat.json ja kuvauspaikat/<tunniste>.jpg, jos on (testi), muuten ämpäri
// Käyttöliittymä (KUVAA-nappi, rajausruutu, edistyminen) tulee UI-pohjista (omistajan päätös 1.10.: A + Natiivi-UI).
using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CesiumForUnity;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;
using Matkakirja.Linssit.IssKamera;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public sealed class IssKameraKuva : MonoBehaviour
    {
        /// <summary>indeksi | otsakkeet | haku | työstö | renderöinti työn aikana; lopuksi valmis | ei maata | vain eurooppa | ei kuvauspaikkaa | keskeytyi.</summary>
        public static string Tila = "valmis";
        public static float Edistyminen;
        public static string ViimeisinKuva;
        /// <summary>Testissä laatat jäävät talteen (iss-kamera/laatat-<id>).</summary>
        public static bool SailytaLaatat;
        /// <summary>Ruutujen usvatasoitus (Uudelleenprojisointi.TasaaUsva); A/B `astro kyyti kuvaa usva 0|1`.</summary>
        public static bool UsvaTasoitus = true;
        /// <summary>Lisäodotus (s) latauksen tasaannuttua ennen kaappausta (laitekoe 5: 400 mm:n z14-kaistat; ComputeLoadProgress
        /// ei ilmeisesti laske rasterilatauksia). Testikomento `astro kyyti kuvaa odotus <s>`.</summary>
        public static float LisaOdotus = 8f;
        /// <summary>Maan ja meren kylläinen sininen kaukana (KuvanTyosto.MaanSini; 0 = pois). Testikomento `astro kyyti kuvaa sini <x>`.</summary>
        public static float MaanSini = 1f;
        /// <summary>Kiertoratanousun kerroin (Avaruus.KuvanNousu = kerroin × läheisyys maan reunaan). Testikomento `astro kyyti kuvaa nousu <x>`.</summary>
        public static float NousuKerroin = 1f;

        /// <summary>
        /// Kuvan kaari ja utu (omistaja/Päätoimittaja 1.10. 21.3x, lopullinen3 0b69f6d2, Cupola-mallikuva): kaari 6, Rayleigh-kerros 1,5,
        /// sinisyys 1,3, utu 1,2, ydin 1, syvänsininen hehku 1,5. Asetetaan kuvan ajaksi, jos säätimet ovat oletuksissaan
        /// (testikomennoilla `astro kyyti kaarivoima|kaarihr|kaarisini|utu|kaariydin|kaarisyva` asetetut arvot pysyvät).
        /// </summary>
        // Päätoimittaja 4.10. (maailmakamera): usva neutraaliksi sinivalkoiseksi; simu a10a2777 A/B: Rayleigh-kerros 1,5, sinisyys 1,3, utu 1,2
        // ja syvänsininen hehku 1,5 tekivät COG-kuvista violetteja (Sahara, Grand Canyon) → Rayleigh 1, sinisyys 1, utu 0,8, ei syvää hehkua.
        // Omistaja 6.10.: "Voisiko tuon ilmakehän halon värjätä voimakkaammin siniseksi"; Päätoimittaja 65fe6316: paksu ylivalottunut
        // valkoinen vyö ja sinertävä maa → sinisyys ennallaan (1; se sinersi myös maan utua ja teki Viron punaruskeista magentaa),
        // ytimen kerroin 0,55 (valkoinen viiva ohuemmaksi) ja syvänsininen hehku 1,5 (vain taivasta vasten, 5–45 km).
        // Omistajan viite 6.10. (Cupola-kuva): ei valkoista vyötä, ohut vaaleansininen–syaani reuna ja laaja pehmeä sininen mustaan
        // → kaarivoima 4, ydin 0,3 (maan utu reunalla ~1,8×, ei 5×), syvänsininen 3; valojen katto pitää sävyn (A/B 13.1x).
        // A/B 13388aa7 (Helsinki 14.1x): kolmesta paras voima 3, ydin 0,25, syvä 2,5 (ohuin valkoinen); valkoinen vyö jäi silti.
        // 6.10. 14.3x: halo piirretään 2D-gradienttina (Halo); sironta jää alle himmeänä: ei syvänsinistä varjostimessa, ja maan
        // reunan utu kertoimella 2 · 0,25 · 1,5 = 0,75 (ei valkoista vyötä).
        // Utu 1,25: sinertävä ilmaperspektiivi voimistuu reunaa kohti (Päätoimittaja 6.10., omistajan viite).
        const float KaariVoima = 1f, KaariHr = 1f, KaariSini = 1f, KaariUtu = 1.25f, KaariYdin = 1f, KaariSyva = 0f;

        static bool KaariOletuksissa() => Avaruus.KuvanKaariVoima == 1f && Avaruus.KuvanHrKerroin == 1f && Avaruus.KuvanSiniKerroin == 1f
            && Avaruus.KuvanUtuKerroin == 1f && Avaruus.KuvanKaariYdin == 1f && Avaruus.KuvanKaariSyva == 0f;

        static void AsetaKaari(float voima, float hr, float sini, float utu, float ydin, float syva)
        {
            Avaruus.KuvanKaariVoima = voima; Avaruus.KuvanHrKerroin = hr; Avaruus.KuvanSiniKerroin = sini;
            Avaruus.KuvanUtuKerroin = utu; Avaruus.KuvanKaariYdin = ydin; Avaruus.KuvanKaariSyva = syva;
        }
        /// <summary>Testi: lisäkuvia 10 s:n välein kaappauksen jälkeen (id-1.jpg …), `astro kyyti kuvaa sarja <n>`.</summary>
        public static int Sarja;
        const int Rinnakkain = 8;
        static IssKameraKuva olio;
        bool kaynnissa;

        /// <summary>Kuvaputki käynnissä (laukaisusta valmiiseen): Cupolan katseen veto ohitetaan (CupolaVeto, IssKatse.Lukittu).</summary>
        public static bool Kaynnissa => olio != null && olio.kaynnissa;

        /// <summary>
        /// true = kameranappi vain kuvauspaikoilla. Päätoimittaja 4.10. klo 14.0x (loki #3934): kirjaus "vain kuvauspaikoilla" kumottu,
        /// pelaaja kuvaa koko Euroopassa (2.10. linja, COG-polku); kuvauspaikalla käytetään valmista kuvaa (nopea, pilvetön).
        /// </summary>
        public static bool VainKuvauspaikat = false;
        /// <summary>Ilmaisia tarkkoja kuvia (omistaja: "yksi ilmainen kuva ja sitten kuvapaketit"); paketit (Ostettu) myöhemmin.</summary>
        public const int Ilmaisia = 1;
        const string OtettuAvain = "iss-kuvia-otettu";
        public static int Otettu => PlayerPrefs.GetInt(OtettuAvain, 0);
        /// <summary>
        /// Rajaton: ostot pois (IssKuvaKauppa.Kaytossa, omistaja 15.2x "otetaan ostot myöhemmin käyttöön") tai Pöllön kehittäjäkoodi
        /// (omistaja #3939; vain TF- ja kehityskäännökset, App Storessa Kehittaja aina false). Rajattomana ei laskuria eikä hintaa.
        /// </summary>
        public static bool Rajaton => !IssKuvaKauppa.Kaytossa || Asetukset.Kehittaja;
        public static int KuviaJaljella => Rajaton ? int.MaxValue : Math.Max(0, Ilmaisia + IssKuvaKauppa.Ostettu - Otettu);

        /// <summary>Valmis oma kuva kuvanäkymälle (Natiivi-UI: AvaaOmaKuva) ja jakoon; kutsutaan pääsäikeessä tallennuksen jälkeen.</summary>
        public readonly struct OmaKuva
        {
            public readonly string Polku, Pikkukuva, Paikka, Maa, Kuvateksti; public readonly DateTime Utc; public readonly double Lat, Lon;
            /// <summary>Lähderivi (Copernicus, GIBS) ja objektiivi (Natiivi-UI 6.10.: Pulun sirut ja LCD:n "KUVA VALMIS").</summary>
            public readonly string Lahde; public readonly bool Laaja;
            public OmaKuva(string polku, string paikka, string maa, DateTime utc, double lat, double lon, string pikkukuva = null,
                string lahde = null, bool laaja = false)
            {
                Polku = polku; Pikkukuva = pikkukuva ?? polku; Paikka = paikka ?? ""; Maa = maa ?? ""; Utc = utc; Lat = lat; Lon = lon;
                Lahde = lahde ?? ""; Laaja = laaja;
                var d = TimeZoneInfo.ConvertTimeFromUtc(DateTime.SpecifyKind(utc, DateTimeKind.Utc), TimeZoneInfo.Local);
                // Päätoimittaja 4.10.: "Oma kuva · Helsinki · 4.10.2026 klo 15.20" (paikka kuten LCD:ssä, kuvaushetki pelaajan vyöhykkeellä).
                Kuvateksti = "Oma kuva" + (Paikka.Length > 0 ? " · " + Paikka : "") + $" · {d.Day}.{d.Month}.{d.Year} klo {d.Hour}.{d.Minute:00}";
            }
        }
        public static event Action<OmaKuva> Valmis;
        /// <summary>
        /// Kuvaus alkoi (omistaja 6.10.: "pitäisi tulla jokin tieto että kuvaa otetaan ja näkyä lataus tai kehitys palkki"):
        /// Natiivi-UI näyttää kehityspalkin, jonka arvo on Edistyminen (0–1) ja vaihe Tila, kunnes Valmis tai Kaynnissa = false.
        /// </summary>
        public static event Action Aloitettu;

        /// <summary>
        /// Pelaajan kaikki kuvat uusin ensin (IssAlbumi: säilyy uudelleenkäynnistyksen yli; Natiivi-UI:n pikkukuvapino ja nuolet,
        /// myöhemmin Matkalaukun Julisteet).
        /// </summary>
        public static IReadOnlyList<OmaKuva> Albumi() =>
            IssAlbumi.Lista().Select(a => new OmaKuva(a.Polku, a.Paikka, a.Maa, a.Utc, a.Lat, a.Lon, a.Pikkukuva)).ToList();

        /// <summary>Kirjanpito, albumi (pikkukuva + tiedot), Kuviin tallennus ja tapahtuma valmiille kuvalle (molemmat polut).</summary>
        static void KuvaValmis(string polku, string paikka, string maa, DateTime utc, double lat, double lon, string lahde)
        {
            if (!Rajaton) { PlayerPrefs.SetInt(OtettuAvain, Otettu + 1); PlayerPrefs.Save(); }
            var a = IssAlbumi.Lisaa(new OmaKuva(polku, paikka, maa, utc, lat, lon), lahde);
            var k = new OmaKuva(polku, paikka, maa, utc, lat, lon, a.Pikkukuva, lahde, Laaja);
            Loki($"oma kuva: {k.Kuvateksti}, kuvia jäljellä {(Rajaton ? "rajaton (kehittäjä)" : KuviaJaljella.ToString())}");
            TallennaKuviin(polku);
            try { Valmis?.Invoke(k); } catch (Exception e) { Debug.LogException(e); }
        }

        static void TallennaKuviin(string polku)
        {
#if UNITY_IOS && !UNITY_EDITOR
            try { MatkakirjaValokuva_Tallenna(0, polku, KuviinValmis); } catch (Exception e) { Loki("Kuviin: " + e.Message); }
#endif
        }
#if UNITY_IOS && !UNITY_EDITOR
        delegate void KuviinFn(int pyynto, int tulos);
        static readonly KuviinFn KuviinValmis = KuviinTulos;
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern void MatkakirjaValokuva_Tallenna(int pyynto, string polku, KuviinFn valmis);
        [AOT.MonoPInvokeCallback(typeof(KuviinFn))]
        static void KuviinTulos(int pyynto, int tulos) => Loki("Kuviin: " + (tulos == 1 ? "tallennettu" : tulos == 0 ? "ei lupaa" : "virhe"));
#endif
        public static void NollaaKuvat() { PlayerPrefs.DeleteKey(OtettuAvain); PlayerPrefs.Save(); }
        /// <summary>
        /// Kameranappi, kun kuvia ei ole jäljellä (Tila "osta", kilvessä hinta): Applen ostoikkuna ja onnistuessa kuva heti.
        /// valmis(tulos) UI:lle (Peruttu → kilpi hintaan, Odottaa → ODOTTAA, Epaonnistui → EI ONNISTUNUT ~3 s).
        /// </summary>
        public static void OstaJaKuvaa(string muoto = "4:5", int leveys = 3240, Action<IssKuvaKauppa.Tulos> valmis = null)
        {
            Tila = "osto";
            IssKuvaKauppa.Osta(t =>
            {
                Tila = t == IssKuvaKauppa.Tulos.Onnistui ? "valmis" : t == IssKuvaKauppa.Tulos.Odottaa ? "odottaa" : "osta";
                if (t == IssKuvaKauppa.Tulos.Onnistui) Hae().Laukaise(muoto, leveys);
                valmis?.Invoke(t);
            });
        }

        /// <summary>Kuvauspaikka-aineiston ämpäripolku (Karttaseppä: kooste kuvauspaikat.json).</summary>
        public const string PaikatPolku = "kuvauspaikat/v1/kuvauspaikat.json";
        static bool paikatLadattu;

        /// <summary>Kuvauspaikat kerran (LinssiOhjain.LataaAstronautti): testitiedosto Documents/iss-kamera/kuvauspaikat.json tai ämpäri.</summary>
        public static IEnumerator LataaPaikat()
        {
            if (paikatLadattu) yield break;
            paikatLadattu = true;
            string json = null, testi = Path.Combine(Application.persistentDataPath, "iss-kamera", "kuvauspaikat.json");
            if (File.Exists(testi)) json = File.ReadAllText(testi);
            else
            {
                using var q = UnityWebRequest.Get(Kuvauspaikat.Juuri + PaikatPolku);
                yield return q.SendWebRequest();
                if (q.result == UnityWebRequest.Result.Success) json = q.downloadHandler.text;
                else Loki("kuvauspaikat: " + q.error);
            }
            if (string.IsNullOrEmpty(json)) yield break;
            try { Kuvauspaikat.Nykyiset = Kuvauspaikat.Jasenna(json); }
            catch (Exception e) { Loki("kuvauspaikat: " + e.Message); }
            Loki($"kuvauspaikat {Kuvauspaikat.Nykyiset.Count}: {string.Join(" ", Kuvauspaikat.Nykyiset.Select(p => p.Tunniste))}");
        }

        public static IssKameraKuva Hae()
        {
            if (olio == null) olio = new GameObject("IssKameraKuva").AddComponent<IssKameraKuva>();
            return olio;
        }

        static void Loki(string t) => Debug.Log("MATKAKIRJA linssit: iss-kamera: " + t);

        static Matkakirja.Linssit.Maat.MaaOsuma maaOsuma;
        /// <summary>Maarajojen osumatesti (LinssiOhjain.MaatAineisto) kerran luotuna; null, jos aineistoa ei ole vielä ladattu.</summary>
        static Matkakirja.Linssit.Maat.MaaOsuma MaaOsuma() =>
            maaOsuma ??= LinssiOhjain.MaatAineisto != null ? new Matkakirja.Linssit.Maat.MaaOsuma(LinssiOhjain.MaatAineisto) : null;

        /// <summary>Laukaisee kuvan (muoto "4:5" oletus, leveys pikseleinä). false = työstö jo käynnissä tai ei kyydissä.</summary>
#if UNITY_IOS && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern ulong os_proc_available_memory();
        /// <summary>Prosessin käytettävissä oleva muisti (Mt) ennen jetsam-rajaa (iOS 13+); muualla tai rajatta −1.</summary>
        public static long VapaaMuistiMt()
        {
            ulong v = os_proc_available_memory();
            // Simulaattorissa jetsam-rajaa ei ole (0 → −1 = ei rajaa); laitteella 0 = muisti lopussa → pienin leveys (Natiiviseppä 2.10.).
            if (v == 0) return Simulaattori ? -1 : 0;
            return (long)(v / (1024 * 1024));
        }
        static bool Simulaattori => System.Environment.GetEnvironmentVariable("SIMULATOR_DEVICE_NAME") != null
            || SystemInfo.deviceModel == "arm64" || SystemInfo.deviceModel == "x86_64";
#else
        public static long VapaaMuistiMt() => -1;
#endif

        /// <summary>
        /// Kuvan leveys vapaan muistin mukaan (Natiivisepän ehto 2.10.2026: iPad 00008103 4096 × 5120 → phys_footprint +1,9 Gt ja
        /// kaksi muistivaroitusta; valinta os_proc_available_memory():n mukaan kuvaushetkellä, ei RAMin): 4096 vain, kun vapaata on
        /// ≥ 3000 Mt, 3072 ≥ 1800, 2048 ≥ 1000, muuten 1536. Pyydetty leveys on yläraja.
        /// </summary>
        public static int LeveysMuistille(int pyydetty, long vapaaMt)
        {
            if (vapaaMt < 0) return pyydetty;
            int sallittu = vapaaMt >= 3000 ? 4096 : vapaaMt >= 1800 ? 3072 : vapaaMt >= 1000 ? 2048 : 1536;
            return Math.Min(pyydetty, sallittu);
        }

        public bool Laukaise(string muoto = "4:5", int leveys = 3240)
        {
            if (kaynnissa) { Loki("kuvaa: edellinen kuva vielä työn alla, napautus ohitettu"); return false; }
            long vapaa = VapaaMuistiMt();
            int sallittu = LeveysMuistille(leveys, vapaa);
            if (sallittu != leveys) Loki($"muisti: vapaata {vapaa} Mt → leveys {leveys} → {sallittu}");
            leveys = sallittu;
            var kerros = FindAnyObjectByType<AstronauttiKerros>();
            var kamera = FindAnyObjectByType<PalloKierto>()?.GetComponent<Camera>();
            var g = FindAnyObjectByType<CesiumGeoreference>();
            if (kerros == null || kamera == null || g == null) { Loki("ei kyytiä tai kameraa"); return false; }
            // Juliste (omistaja 6.10.): kuva renderöidään julisteen kuva-alan muotoon (lähes neliö), juliste enintään MaxLeveys.
            if (IssJuliste.Kaytossa)
            {
                leveys = Math.Min(leveys, IssJuliste.KuvanLeveys(IssJuliste.MaxLeveys));
                var (kw, kh) = IssJuliste.KuvanKoko(leveys);
                muoto = $"{kw}:{kh}";
            }
            var m = muoto.Split(':');
            int mw = m.Length == 2 && int.TryParse(m[0], out var a) ? a : 4, mh = m.Length == 2 && int.TryParse(m[1], out var b) ? b : 5;
            // Laaja ohittaa kuvauspaikat (ne ovat valmiita telerajauksia); juliste rajaa kuvan julisteen kuva-alaan (lähes neliö).
            var paikka = Laaja ? null : kerros.Linssi?.Kuvauspaikka();
            // Ilmaisen kuvan laskuri molemmille poluille (Päätoimittaja 4.10.: muuten COG antaa rajattomasti ilmaisia kuvia).
            if (KuviaJaljella <= 0) { Tila = "osta"; Loki($"kuvaa: ei kuvia jäljellä (otettu {Otettu}), osto {IssKuvaKauppa.Hinta ?? IssKuvaKauppa.HintaOletus}"); return false; }
            if (paikka != null)
            {
                Aanet.Tehoste(OhjaamonAanet.Laukaisin);   // laukaisimen aito naksahdus (Sisältökirjuri)
                StartCoroutine(AjoPaikka(kamera, kerros.Linssi, paikka, leveys, leveys * mh / mw, muoto));
                return true;
            }
            if (VainKuvauspaikat) { Tila = "ei kuvauspaikkaa"; Loki("kuvaa: katse ei ole kuvauspaikalla"); return false; }
            StartCoroutine(Ajo(kamera, g, leveys, leveys * mh / mw, muoto, kerros.Linssi));
            return true;
        }

        /// <summary>
        /// KUVAN BUDJETTI (Päätoimittaja 4.10.2026: kuva missä tahansa laitteella enintään ~30 Mt ja ~10 s; simussa Saharan Cupola-näkymä
        /// haki 173 Mt): kuvan pystykenttä enintään MaxKentta (kamera katsoo samaan katsepisteeseen kapeammalla objektiivilla) ja
        /// tarkkuus karkeutuu kaksinkertaisin askelin, kunnes TCI- ja SCL-laattojen arvioitu haku mahtuu Budjettiin (enintään 5 askelta).
        /// Testikomennot `astro kyyti kuvaa budjetti <Mt>` ja `astro kyyti kuvaa kentta <°>`.
        /// </summary>
        public static double BudjettiMt = 30, MaxKentta = 14;
        /// <summary>
        /// Julisteen (laaja kuva) budjetti: omistaja 1.10. "enintään ~100 Mt kuvaa kohden"; 6.10.: "Kuva siis haettiin tarkimmasta
        /// mahdollisesta aineistosta ja taivutettiin pallon muotoon". Testi `astro kyyti kuvaa julistebudjetti <Mt>`.
        /// </summary>
        public static double JulisteBudjettiMt = 100;
        /// <summary>Julisteen kuvaputki (E v3:n vedos 1.10.: `astro kyyti filmi 1` ja ilmavoima 3,5): vinjetti, filmirae ja ilmakehä kuvan ajaksi.</summary>
        public static float JulisteIlmanVoima = 3.5f;
        /// <summary>
        /// OBJEKTIIVI (omistaja 6.10.: "kuva otetaan myös liian tele linssillä tai ainakin jostain pitäisi pystyä valitsemaan myös se
        /// laajempi versio"): oletus LAAJA (pystykenttä enintään LaajaKentta ≈ 55 mm kinoa 4:5-pystykuvassa), TELE = MaxKentta
        /// (14°, ≈ 122 mm). Valitsimen tekee Natiivi-UI ohjaamon pohjilla; testikomento `astro kyyti kuvaa laaja 0|1`. Budjetti
        /// (30 Mt) karkeuttaa laajan kuvan tarvittaessa; kaukoalue tulee S2-mosaiikista, joten haku pysyy kohtuullisena.
        /// </summary>
        public static bool Laaja = true;
        public static double LaajaKentta = 30;
        /// <summary>Kuvan pystykentän yläraja valitulla objektiivilla.</summary>
        public static double KuvanMaxKentta => Laaja ? LaajaKentta : MaxKentta;
        /// <summary>COG-kuvan zeniittikulman yläraja (Päätoimittaja 4.10.: ≤ 55°, kamera virtuaalisesti radalla lähempänä kohdetta).</summary>
        public static double MaxKallistus = 55;
        /// <summary>
        /// LAAJAN KUVAN SOMMITTELU (omistaja 6.10.: "laajakuva helsingistä, missä näkyy itämerta", logo maapallon kaaren yläpuolella;
        /// Päätoimittaja: kaari ~20–25 % yläreunasta, logo mustassa avaruudessa): horisontin ja kohteen paikka osuutena kuvan
        /// yläreunasta (AstronauttiLinssi.LaajaKuvakulma). Testi `astro kyyti kuvaa sommittelu <kaari> <kohde>`.
        /// </summary>
        public static double LaajaKaari = 0.22, LaajaKohde = 0.62;
        /// <summary>Testikomento `astro kyyti kuvaa kohde lat lon`: seuraavan kuvan kohde (muuten Cupolan katseen keskipiste).</summary>
        public static (double Lat, double Lon)? KuvanKohde;
        /// <summary>
        /// Testikomento `astro kyyti kuvaa suunta <°>|pois`: laajan kuvan kameran suunta kohteesta (atsimuutti), muuten aluksen suunta.
        /// Helsinki 6.10. (2504ef45): kamera luoteesta kohti aamupäivän aurinkoa → Suomenlahti kiilsi valkoisena kuin jää.
        /// </summary>
        public static double? KuvanSuunta;
        /// <summary>
        /// Reunojen lisäkarkeus (Päätoimittaja 4.10.: "karkeammat COG-tasot reunoilla ja kaukana"; simu b3a14902: tasainen 4× karkeus teki
        /// Saharan koko kuvasta suttuisen z10:n): solun karkeus = budjettikerroin × (1 + ReunaKarkeus · r²), r = 0 keskellä … 1 kulmassa.
        /// </summary>
        public static double ReunaKarkeus = 3;

        IEnumerator Ajo(Camera kamera, CesiumGeoreference g, int W, int H, string muoto, AstronauttiLinssi linssi = null)
        {
            kaynnissa = true; Edistyminen = 0; string loppuTila = "keskeytyi";
            try { Aloitettu?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
            var kello = System.Diagnostics.Stopwatch.StartNew();
            string id = DateTime.UtcNow.ToString("yyyyMMdd-HHmmss");
            string juuri = Path.Combine(Application.persistentDataPath, "iss-kamera"), laatat = Path.Combine(juuri, "laatat-" + id);
            Directory.CreateDirectory(juuri);
            double kerroin0 = IssNyt.Simu.Kerroin;
            IssNyt.Simu.AsetaKerroin(0);   // kello seis: asema ei liiku työstön aikana
            Avaruus.KuvaputkiAsetettu = true;   // kuvaputki (Linssiseppä 9ecd7c79): päivällä ei tähtiä, KuvanKaariVoima
            // Kiilto kapeammaksi kuvassa (Ateena 4968e1fd: aallokko 0,02 ja voima 6 vaalensivat koko etualan meren maitomaiseksi).
            float aallokko0 = Yokuori.Aallokko, kiilto0 = Yokuori.KiillonVoima;
            Yokuori.Aallokko = 0.008f; Yokuori.KiillonVoima = 3.5f;
            bool kaariAsetettu = KaariOletuksissa();
            if (kaariAsetettu) AsetaKaari(KaariVoima, KaariHr, KaariSini, KaariUtu, KaariYdin, KaariSyva);
            bool filmi0 = Matkakirja.Linssit.Kyytipino.Filmi; float ilma0 = Avaruus.IlmanVoima;
            if (IssJuliste.Kaytossa) { Matkakirja.Linssit.Kyytipino.Filmi = true; Avaruus.IlmanVoima = JulisteIlmanVoima; }
            var utc = IssNyt.Kello();
            RenderTexture rt = null;
            bool kenttaRajattu = false;
            (double Lat, double Lon)? kohdePiste = null;
            try
            {
                // 0) kamera: kohde = pelaajan näkymän keskipiste, kamera virtuaalisesti radalla lähempänä (zeniittikulma ≤ MaxKallistus)
                // ja kenttä enintään MaxKentta (Vertailu ohittaa kyydin asennon kuvan ajaksi).
                if (linssi != null && linssi.Kyydissa)
                {
                    var keski = linssi.KyydinAsento;
                    if (KuvanKohde is (double, double) kohde) { kohdePiste = kohde; KuvanKohde = null; }
                    else kohdePiste = (keski.Lat, keski.Lon);
                    AstronauttiLinssi.VertailuKentta = Math.Min(kamera.fieldOfView, KuvanMaxKentta);
                    // Laaja: kaari ~22 % yläreunasta, logo avaruudessa sen yllä, kohde hieman keskikohdan alla (Päätoimittaja 6.10.).
                    AstronauttiLinssi.Vertailu = Laaja ? linssi.LaajaKuvakulma(kohdePiste.Value.Lat, kohdePiste.Value.Lon, AstronauttiLinssi.VertailuKentta, LaajaKaari, LaajaKohde, KuvanSuunta)
                                                       : linssi.JyrkkaKuvakulma(kohdePiste.Value.Lat, kohdePiste.Value.Lon, MaxKallistus);
                    kenttaRajattu = true;
                    Loki($"kamera: kohde ({keski.Lat:0.000}, {keski.Lon:0.000}), kallistus {keski.Kallistus:0.0}° → {AstronauttiLinssi.Vertailu.Value.Kallistus:0.0}°, "
                        + $"etäisyys {AstronauttiLinssi.Vertailu.Value.EtaisyysM / 1000:0} km, kenttä {AstronauttiLinssi.VertailuKentta:0.0}°");
                    // Kamera uuteen asentoon ennen kuvasuunnitelmaa: odota, kunnes asento ei enää muutu (Manaus 2504ef45: kahden ruudun
                    // jälkeen kamera oli vielä matkalla, joten suunnitelma ei kattanut vasenta alakulmaa → pilvetön kaista ja venyneet
                    // pilviläikät sen reunalla). Enintään 3 s.
                    yield return KameraAsettuu(kamera);
                }
                // 1) kamera ECEF:ksi (pystykenttä kuten näkymässä; kuvan muoto rajaa leveyden)
                var gt = g.transform;
                double3 Pos(Vector3 p) => g.TransformUnityPositionToEarthCenteredEarthFixed((float3)gt.InverseTransformPoint(p));
                double3 Suu(Vector3 d) => math.normalize(g.TransformUnityDirectionToEarthCenteredEarthFixed((float3)gt.InverseTransformDirection(d)));
                var t = kamera.transform; var p0 = Pos(t.position); var f = Suu(t.forward); var r = Suu(t.right); var u = Suu(t.up);
                var kk = new KuvaKamera { Paikka = (p0.x, p0.y, p0.z), Katse = (f.x, f.y, f.z), Oikea = (r.x, r.y, r.z), Ylos = (u.x, u.y, u.z),
                    PystykenttaAst = kamera.fieldOfView, Leveys = W, Korkeus = H };
                // Kiertoratanousu (Päätoimittaja 1.10. 21.5x): aurinko kameran paikasta katsottuna lähellä maan reunaa → värjäytymä,
                // suurempi flare, hämärän valo ja linssiheijastukset; täysi ±1,5°:n sisällä, pois 5°:ssa.
                var aEcef = math.normalize(global::Matkakirja.Aurinko.AurinkoEcef(utc));
                double reunaSuht = Math.Asin(math.dot(aEcef, math.normalize(p0))) * 180 / Math.PI + Math.Acos(6371000.0 / math.length(p0)) * 180 / Math.PI;
                double nl = Math.Max(0, Math.Min(1, (5 - Math.Abs(reunaSuht)) / 3.5));
                Avaruus.KuvanNousu = (float)(NousuKerroin * nl * nl * (3 - 2 * nl));
                var naytteet = Kuvasuunnitelma.Naytteet(kk);
                if (naytteet.Count == 0) { Loki("näkymässä ei maata"); loppuTila = "ei maata"; yield break; }
                Tila = "indeksi"; Loki($"laukaisu {id} {muoto} {W}×{H}, kenttä {kamera.fieldOfView:0.0}°, {naytteet.Count} solua, {utc:yyyy-MM-dd HH:mm:ss} UTC, vapaata {VapaaMuistiMt()} Mt");
                // Ohjaamo näkyviin haun ja työstön ajaksi (Natiivi-UI 6.10.: IssKyytiNakyma piilottaa ohjaamon, kun Vertailu on päällä,
                // ja KEHITETÄÄN-palkki jäi näkymättä koko kuvauksen ajan); kuvan asento palautetaan juuri ennen renderöintiä.
                var kuvanAsento = AstronauttiLinssi.Vertailu; double kuvanKentta = AstronauttiLinssi.VertailuKentta;
                if (kenttaRajattu) AstronauttiLinssi.Vertailu = null;

                // 2) indeksi: KOKO MAAILMA (omistaja 4.10.2026 klo 14.0x, loki #3936): maailma.json → näkymän alueet etusijassa,
                // vain niiden indeksit ladataan (2,7–9 Mt kukin, välimuisti Documents/iss-kamera/), ja ne yhdistetään (sama MGRS:
                // etusija voittaa, ruudulle alueen oma lut). Ilman luetteloa (ei vielä ämpärissä) Euroopan indeksi kuten ennen.
                double w = naytteet.Min(n => n.LonMin), s = naytteet.Min(n => n.LatMin), e = naytteet.Max(n => n.LonMax), nn = naytteet.Max(n => n.LatMax);
                S2Indeksi indeksi = null;
                bool maailma = false;
                string mJson = null;
                // Välimuisti versioittain (Karttaseppä 5.10.: v2 = toisen radan varakuvat): versioton tai vanha versio pois.
                foreach (var vanha in Directory.GetFiles(juuri, "*.json"))
                {
                    var nimi = Path.GetFileName(vanha);
                    if (System.Text.RegularExpressions.Regex.IsMatch(nimi, @"^(v\d+[a-z]?-)?(maailma|indeksi)[^/]*\.json$") && !nimi.StartsWith(S2Maailma.Versio + "-"))
                        try { File.Delete(vanha); } catch { }
                }
                yield return HaeTeksti(S2Maailma.Osoite, Path.Combine(juuri, S2Maailma.Versio + "-maailma.json"), t => mJson = t);
                if (!string.IsNullOrEmpty(mJson))
                {
                    S2Maailma m = null;
                    try { m = S2Maailma.Jasenna(mJson); } catch (Exception x) { Loki("maailma.json: " + x.Message); }
                    var nakymassa = m?.Nakymassa(w, s, e, nn) ?? new List<string>();
                    var osat = new List<(string, S2Indeksi)>();
                    foreach (var a in nakymassa)
                    {
                        string ij = null;
                        yield return HaeTeksti(m.Osoitteeksi(a), Path.Combine(juuri, S2Maailma.Versio + "-indeksi-" + a + ".json"), t => ij = t);
                        if (string.IsNullOrEmpty(ij)) continue;
                        try { osat.Add((a, S2Indeksi.Jasenna(ij))); } catch (Exception x) { Loki($"indeksi {a}: {x.Message}"); }
                    }
                    if (m != null)
                    {
                        indeksi = S2Indeksi.Yhdista(osat);
                        maailma = true;
                        Loki($"maailma: alueet {string.Join(" ", osat.Select(o => o.Item1))} (näkymässä {nakymassa.Count}), ruutuja {indeksi.Ruudut.Count}");
                    }
                }
                if (indeksi == null)
                {
                    string ej = null;
                    yield return HaeTeksti(S2Indeksi.Osoite, Path.Combine(juuri, S2Maailma.Versio + "-indeksi.json"), t => ej = t);
                    if (string.IsNullOrEmpty(ej)) { Loki("indeksi: ei saatu"); yield break; }
                    indeksi = S2Indeksi.Jasenna(ej);
                }
                var ehdokkaat = indeksi.Alueella(w, s, e, nn).ToList();
                var ruudut = Kuvasuunnitelma.Ruudut(naytteet, ehdokkaat.Select(x => x.Ruutu()).Where(x => x != null)).Keys.ToList();
                Loki($"indeksi {indeksi.Ruudut.Count} ruutua, näkymässä {ruudut.Count}: {string.Join(" ", ruudut.Select(x => x.Tunnus))}");
                // Savuke 1116: merellä kilpi jäi 0 %:iin / VALMIS:iin ilman palautetta. Päätoimittaja 2.10.: kuvausalue = koko Euroopan
                // S2-indeksi; kilpi kertoo syyn: meri → EI MAATA, maa Euroopan (indeksin rajauksen) ulkopuolella → VAIN EUROOPPA,
                // Euroopan sisällä ruutu puuttuu → EI KUVAUSPAIKKAA. Vesimaski Yokuoresta (puuttuu → ei päätellä merta).
                if (ruudut.Count == 0)
                {
                    var maalla = naytteet.Where(n => !Yokuori.OnVesi(n.Lat, n.Lon)).ToList();
                    // Savuke 1119: Mikronesian meren yllä muutama saari- tai kaukorannikon näyte antoi VAIN EUROOPPA →
                    // maata vasta, kun ≥ 3 % näytteistä (ja vähintään 3) on maalla.
                    if (Yokuori.VesiMaailma != null && maalla.Count < Math.Max(3, naytteet.Count * 0.03)) loppuTila = "ei maata";
                    else if (maailma) loppuTila = "ei kuvauspaikkaa";   // koko maailma: VAIN EUROOPPA -kilpi poistui (4.10.)
                    else
                    {
                        var pist = maalla.Count > 0 ? maalla : naytteet;
                        double la = pist.Average(n => n.Lat), lo = pist.Average(n => n.Lon);
                        var kaikki = indeksi.Ruudut.Values;
                        bool eurooppa = kaikki.Count > 0 && la >= kaikki.Min(r => r.S) && la <= kaikki.Max(r => r.N) && lo >= kaikki.Min(r => r.W) && lo <= kaikki.Max(r => r.E);
                        loppuTila = eurooppa ? "ei kuvauspaikkaa" : "vain eurooppa";
                    }
                    Loki($"ei S2-ruutuja näkymässä (indeksin ulkopuolella): {loppuTila}, maata {maalla.Count}/{naytteet.Count}");
                    yield break;
                }

                // 3) otsakkeet (TCI ja SCL)
                Tila = "otsakkeet";
                var ty = new KuvanTyosto { Ensisijainen = true }; ty.Data.Lut = indeksi.Lut;   // päällekkäiset S2-ruudut kerran (400 mm 86 → 51 Mt)
                var tci = new Dictionary<string, CogOtsake>(); var scl = new Dictionary<string, CogOtsake>();
                var sclUrl = ehdokkaat.ToDictionary(x => x.Tunnus, x => x.Valinnat[0].Scl);
                var otsakepyynnot = new List<(string tunnus, bool onScl, UnityWebRequest q)>();
                // Otsake ~4 kt (TCI) / ~4 kt (SCL): ensin 16 kt, puskurin ulkopuolelle jääneet uudelleen 64 kt:lla (50 mm: 172 ruutua).
                foreach (int koko in new[] { 16384, 65536 })
                {
                    otsakepyynnot.Clear();
                    foreach (var ru in ruudut)
                    {
                        if (!tci.ContainsKey(ru.Tunnus)) otsakepyynnot.Add((ru.Tunnus, false, Alue(ru.Url, 0, koko)));
                        if (!scl.ContainsKey(ru.Tunnus) && !string.IsNullOrEmpty(sclUrl[ru.Tunnus])) otsakepyynnot.Add((ru.Tunnus, true, Alue(sclUrl[ru.Tunnus], 0, koko)));
                    }
                    for (int i0 = 0; i0 < otsakepyynnot.Count; i0 += 24)   // enintään 24 rinnakkain
                    {
                        var era = otsakepyynnot.Skip(i0).Take(24).ToList();
                        foreach (var (_, _, q) in era) q.SendWebRequest();
                        while (era.Any(x => !x.q.isDone)) yield return null;
                    }
                    foreach (var (tunnus, onScl, q) in otsakepyynnot)
                    {
                        if (q.result == UnityWebRequest.Result.Success)
                            try { (onScl ? scl : tci)[tunnus] = CogOtsake.Jasenna(q.downloadHandler.data); }
                            catch (Exception x) { if (koko > 16384) Loki($"otsake {tunnus}: {x.Message}"); }
                        else Loki($"otsake {tunnus}{(onScl ? " SCL" : "")}: {q.error}");
                        q.Dispose();
                    }
                }
                foreach (var ru in ruudut) if (tci.TryGetValue(ru.Tunnus, out var o)) ty.Data.Ruudut.Add((ru, o));
                // Budjetti: suunnitelma karkeammaksi, kunnes arvioitu COG-haku (TCI + SCL, ennen mosaiikin säästöä) ≤ BudjettiMt.
                double karkeus = 1; long arvio = 0, budjetti = (long)(Laaja && IssJuliste.Kaytossa ? JulisteBudjettiMt : BudjettiMt);
                for (int kierros = 0; ; kierros++)
                {
                    ty.Suunnittele(naytteet.Select(n =>
                    {
                        var k = n;
                        double dx = (n.Sx + 0.5 - 24) / 24.0, dy = (n.Sy + 0.5 - 18) / 18.0, r2 = (dx * dx + dy * dy) / 2;
                        k.MetriaPikseli *= karkeus * (1 + ReunaKarkeus * r2);
                        return k;
                    }).ToList());
                    arvio = 0;
                    foreach (var (ru, o) in ty.Data.Ruudut)
                    {
                        foreach (var (taso, tx, tyy) in ty.HaettavatLaatat(ru, o, null, mosaiikkiKattaa: true)) arvio += o.Tasot[taso].Alue(tx, tyy).Item2;
                        if (scl.TryGetValue(ru.Tunnus, out var so)) foreach (var (taso, tx, tyy) in ty.HaettavatLaatat(ru, so, null, mosaiikkiKattaa: true)) arvio += so.Tasot[taso].Alue(tx, tyy).Item2;
                    }
                    if (arvio <= budjetti * 1e6 || kierros >= 5) break;
                    karkeus *= 2;
                }
                Loki($"budjetti: karkeus {karkeus:0}× (reunoilla +{ReunaKarkeus:0}×), arvio {arvio / 1e6:0.0} Mt (raja {budjetti:0} Mt), kenttä {kamera.fieldOfView:0.0}°{(kenttaRajattu ? " (rajattu)" : "")}");

                // 3b) kaukoalue S2-mosaiikista (lehdet z ≤ 10; 50 mm: ~100 Mt COG:ia → ~10–20 Mt): ladataan ja puretaan ensin,
                // jotta COG-haku ohittaa vain onnistuneet (404 tai mosaiikin ulkopuolella → COG).
                var mlista = ty.Lehdet().Where(l => KuvanTyosto.MosaiikinLaatta(l.z, l.x, l.y)).ToList();
                // Lähdelaatat: z ≤ 10 sellaisenaan, z11 = z10-isä (neljännes 2 × suurennettuna).
                var lahteet = mlista.Select(l => l.z > 10 ? (z: 10, x: l.x >> 1, y: l.y >> 1) : l).Distinct().ToList();
                var lahde = new Dictionary<(int, int, int), byte[]>();
                long mtavut = 0;
                for (int i0 = 0; i0 < lahteet.Count; i0 += 16)
                {
                    var era = lahteet.Skip(i0).Take(16).Select(l => (l, q: UnityWebRequest.Get(AstronauttiKerros.S2Juuri + KuvanTyosto.MosaiikinPolku(l.z, l.x, l.y)))).ToList();
                    foreach (var (_, q) in era) q.SendWebRequest();
                    while (era.Any(x => !x.q.isDone)) yield return null;
                    var tex = new Texture2D(2, 2, TextureFormat.RGBA32, false);
                    foreach (var (l, q) in era)
                    {
                        if (q.result == UnityWebRequest.Result.Success && tex.LoadImage(q.downloadHandler.data) && tex.width == 256 && tex.height == 256)
                        {
                            mtavut += q.downloadHandler.data.Length;
                            // RGB (3 tavua) ilman GetPixels32:n hallittua kopiota (iPad-mittaus 2.10.: 50 mm:n mosaiikki ~0,5 Gt hallittua
                            // muistia, jota IL2CPP:n keko ei palauta). Rivi 0 = alin → laatta: rivi 0 = pohjoinen.
                            // LoadImage vaihtaa JPG:n muotoon RGB24 (3 tavua/px): raakadata luetaan muodon mukaan (2.10.: Color32-luku
                            // RGB24:stä liu'utti rivit → vaakaraidat ja maa katosi, iPad 84b8556b ja savuke 115). Muut muodot GetPixels32:lla.
                            var rgb = new byte[256 * 256 * 3];
                            int bpp = tex.format == TextureFormat.RGB24 ? 3 : tex.format == TextureFormat.RGBA32 ? 4 : 0;
                            if (bpp > 0)
                            {
                                var raw = tex.GetPixelData<byte>(0);
                                for (int yy = 0; yy < 256; yy++)
                                    for (int xx = 0; xx < 256; xx++)
                                    {
                                        int i = ((255 - yy) * 256 + xx) * bpp, o = (yy * 256 + xx) * 3;
                                        rgb[o] = raw[i]; rgb[o + 1] = raw[i + 1]; rgb[o + 2] = raw[i + 2];
                                    }
                            }
                            else
                            {
                                var px = tex.GetPixels32();
                                for (int yy = 0; yy < 256; yy++)
                                    for (int xx = 0; xx < 256; xx++)
                                    {
                                        var c = px[(255 - yy) * 256 + xx]; int o = (yy * 256 + xx) * 3;
                                        rgb[o] = c.r; rgb[o + 1] = c.g; rgb[o + 2] = c.b;
                                    }
                            }
                            lahde[l] = rgb;
                        }
                        q.Dispose();
                    }
                    Destroy(tex);
                    Edistyminen = 0.1f * (i0 + era.Count) / Math.Max(1, lahteet.Count);
                }
                // Lehdet lasketaan lennossa piirron aikana (z ≤ 10 RGB → RGBA, z11 = z10-isän neljännes 2 × suurennettuna);
                // ennen kaikki ~1 200 lehteä pidettiin valmiina 256 kt:n RGBA-taulukkoina (~0,3 Gt).
                var lehdet = new HashSet<(int, int, int)>(mlista.Where(l => lahde.ContainsKey(l.z > 10 ? (10, l.x >> 1, l.y >> 1) : l)));
                byte[] MosaiikinLehti(int z, int x, int y)
                {
                    if (!lehdet.Contains((z, x, y))) return null;
                    var r2 = new byte[256 * 256 * 4];
                    if (z <= 10)
                    {
                        var m = lahde[(z, x, y)];
                        for (int i = 0, j = 0; i < r2.Length; i += 4, j += 3) { r2[i] = m[j]; r2[i + 1] = m[j + 1]; r2[i + 2] = m[j + 2]; r2[i + 3] = 255; }
                        return r2;
                    }
                    var isa = lahde[(10, x >> 1, y >> 1)];
                    int qx = (x & 1) * 128, qy = (y & 1) * 128;
                    for (int yy = 0; yy < 256; yy++)
                        for (int xx = 0; xx < 256; xx++)
                        {
                            float fx = Math.Min(254.999f, qx + (xx + 0.5f) / 2 - 0.5f), fy = Math.Min(254.999f, qy + (yy + 0.5f) / 2 - 0.5f);
                            fx = Math.Max(0, fx); fy = Math.Max(0, fy); int ix = (int)fx, iy = (int)fy; float ax = fx - ix, ay = fy - iy;
                            int o = (yy * 256 + xx) * 4, a00 = (iy * 256 + ix) * 3, a10 = a00 + 3, a01 = a00 + 768, a11 = a01 + 3;
                            for (int c = 0; c < 3; c++)
                                r2[o + c] = (byte)((isa[a00 + c] * (1 - ax) + isa[a10 + c] * ax) * (1 - ay) + (isa[a01 + c] * (1 - ax) + isa[a11 + c] * ax) * ay + 0.5f);
                            r2[o + 3] = 255;
                        }
                    return r2;
                }
                if (lehdet.Count > 0) ty.Mosaiikki = MosaiikinLehti;
                Loki($"mosaiikki {lehdet.Count}/{mlista.Count} lehteä ({lahde.Count} laattaa), {mtavut / 1e6:0.0} Mt");

                // 4) laatat: TCI näkymän tasoilta, SCL näkymän tasoilta (pilvimaski) ja karkeimmalta tasolta (maamaski)
                var haku = new List<(string url, long alku, long pit, Action<byte[]> valmis)>();
                void LisaaTci(S2Ruutu ru, CogOtsake o, Func<(int z, int x, int y), bool> suodin)
                {
                    foreach (var (taso, tx, tyy) in ty.HaettavatLaatat(ru, o, suodin))
                    {
                        var (alku, pit) = o.Tasot[taso].Alue(tx, tyy); var avain = (ru.Tunnus, taso, tx, tyy); var tt = o.Tasot[taso];
                        haku.Add((ru.Url, alku, pit, d => ty.Data.Pakatut[avain] = (tt, d)));   // puretaan piirrossa (Valimuistikatto)
                    }
                }
                void LisaaScl(S2Ruutu ru, CogOtsake so, Func<(int z, int x, int y), bool> suodin)
                {
                    ty.Data.Scl[ru.Tunnus] = so;
                    foreach (var (taso, tx, tyy) in ty.HaettavatLaatat(ru, so, suodin))
                    {
                        var (alku, pit) = so.Tasot[taso].Alue(tx, tyy); var avain = (ru.Tunnus + "|scl", taso, tx, tyy); var tt = so.Tasot[taso];
                        haku.Add((ru.Scl, alku, pit, d => ty.Data.Pakatut[avain] = (tt, d)));
                    }
                }
                foreach (var (ru, o) in ty.Data.Ruudut.ToList())
                {
                    LisaaTci(ru, o, null);
                    if (scl.TryGetValue(ru.Tunnus, out var so)) { ru.Scl ??= sclUrl[ru.Tunnus]; LisaaScl(ru, so, null); }
                }
                var sclPuretut = new ConcurrentDictionary<(string, int, int), byte[]>();
                foreach (var ru in ruudut)
                {
                    if (!scl.TryGetValue(ru.Tunnus, out var so)) continue;
                    var st = so.Tasot[so.Tasot.Count - 1]; string su = sclUrl[ru.Tunnus];
                    for (int x = 0; x < st.LaattojaX; x++) for (int y = 0; y < st.LaattojaY; y++)
                    {
                        var (alku, pit) = st.Alue(x, y); var avain = (ru.Tunnus, x, y);
                        haku.Add((su, alku, pit, d => sclPuretut[avain] = CogOtsake.PuraLaatta(st, d)));
                    }
                }
                var tila = new long[3];   // saatu, virheet, kokonais
                Tila = "haku"; Loki($"haku {haku.Count} laattaa, {haku.Sum(x => x.pit) / 1e6:0.0} Mt");
                yield return Lataa(haku, tila);

                // 4b) S2:n omat pilvet (SCL 3/8/9/10): varakuva (valinta 1) vain pilvisille lehdille (Päätoimittaja 1.10.)
                // Kierros 1: pilviset ja datattomat lehdet valinnalla 1; kierros 2: yhä datattomat valinnalla 2 (simu 58e081a1: tropiikissa
                // valinta 1 jakoi saman radan välin, ja Amazonian kiila näkyi BMNG:nä).
                // Kierros 2 (v2-indeksi, Karttaseppä 5.10.): datattomille ensin toisen radan täytekuva, jos ruudulla on sellainen
                // (valinnat 1–2 ovat samalta radalta ja jakavat aukon), kierros 3: valinta 2 niille, joilla täytekuva oli.
                for (int kierros = 1; kierros <= 3; kierros++)
                {
                var datattomat = ty.DatattomatLehdet();   // radan välinen kiila: varakuva toiselta päivältä tai radalta
                var pilviset = kierros == 1 ? ty.PilvisetLehdet() : new HashSet<(int z, int x, int y)>();
                pilviset.UnionWith(datattomat);
                if (pilviset.Count > 0)
                {
                    var varat = new List<(S2Ruutu vara, UnityWebRequest tq, UnityWebRequest sq)>();
                    foreach (var (ru, _) in ty.Data.Ruudut.Where(r => r.ruutu.Valinta == 0).ToList())
                    {
                        if (!indeksi.Ruudut.TryGetValue(ru.Mgrs, out var ir)) continue;
                        int tr = ir.ToisenRadanValinta;
                        int valinta = kierros == 1 ? 1 : kierros == 2 ? (tr > 0 ? tr : 2) : (tr > 0 ? 2 : -1);
                        var vara = valinta > 0 ? ir.Ruutu(valinta) : null;
                        if (vara == null) continue;
                        varat.Add((vara, Alue(vara.Url, 0, 16384), string.IsNullOrEmpty(vara.Scl) ? null : Alue(vara.Scl, 0, 16384)));
                    }
                    foreach (var v in varat) { v.tq.SendWebRequest(); v.sq?.SendWebRequest(); }
                    while (varat.Any(v => !v.tq.isDone || (v.sq != null && !v.sq.isDone))) yield return null;
                    haku.Clear(); int varoja = 0;
                    foreach (var (vara, tq, sq) in varat)
                    {
                        try
                        {
                            if (tq.result != UnityWebRequest.Result.Success) continue;
                            var vo = CogOtsake.Jasenna(tq.downloadHandler.data);
                            ty.Data.Ruudut.Add((vara, vo));
                            int ennen = haku.Count; LisaaTci(vara, vo, l => pilviset.Contains(l));
                            if (haku.Count == ennen) { ty.Data.Ruudut.RemoveAt(ty.Data.Ruudut.Count - 1); continue; }
                            varoja++;
                            if (sq != null && sq.result == UnityWebRequest.Result.Success) LisaaScl(vara, CogOtsake.Jasenna(sq.downloadHandler.data), l => pilviset.Contains(l));
                        }
                        catch (Exception x) { Loki($"varakuva {vara.Tunnus}: {x.Message}"); }
                        finally { tq.Dispose(); sq?.Dispose(); }
                    }
                    Loki($"pilvimaski {kierros}: {pilviset.Count} pilvistä tai datatonta ({datattomat.Count}) lehteä, {varoja} varakuvaa, {haku.Sum(x => x.pit) / 1e6:0.0} Mt");
                    if (haku.Count > 0) yield return Lataa(haku, tila);
                }
                }
                long saatu = tila[0];
                Loki($"haettu {saatu / 1e6:0.0} Mt, virheitä {tila[1]}, {kello.ElapsedMilliseconds / 1000.0:0.0} s");

                // 5) maamaski, pilvet ja laatat levylle
                Tila = "työstö";
                foreach (var ru in ruudut)
                    if (scl.TryGetValue(ru.Tunnus, out var so)) ty.LisaaMaamaski(ru, so, (x, y) => sclPuretut.TryGetValue((ru.Tunnus, x, y), out var l) ? l : null);
                var (az, korkeus) = AurinkoPisteessa(utc, naytteet.Average(n => n.Lat), naytteet.Average(n => n.Lon));
                var kentta = new Pilvikentta { MaaOsuus = ty.MaaOsuus, AurinkoAz = az, AurinkoKorkeus = korkeus }.Kalibroi();
                ty.Pilvet = kentta;
                // Kirkas alue pääkohteen ympärillä (omistaja 6.10.: pilvet sivuille, pääkohde ei peity): ~26 % kuvan leveydestä
                // täysin kirkas, vaimennus 54 %:iin asti (maan pinnalla kohteen etäisyydellä).
                if (IssJuliste.Kaytossa)
                {
                    var kesk = naytteet.OrderBy(q => Math.Abs(q.Sx - 24) + Math.Abs(q.Sy - 18)).First();
                    var (kLat, kLon) = kohdePiste ?? (kesk.Lat, kesk.Lon);
                    var kpE = Kuvasuunnitelma.Ecef(kLat, kLon);
                    double dKm = Math.Sqrt(Math.Pow(kk.Paikka.x - kpE.x, 2) + Math.Pow(kk.Paikka.y - kpE.y, 2) + Math.Pow(kk.Paikka.z - kpE.z, 2)) / 1000;
                    double vaaka = 2 * Math.Atan(Math.Tan(kk.PystykenttaAst * Math.PI / 360) * W / H);
                    double leveysKm = 2 * dKm * Math.Tan(vaaka / 2);
                    ty.SelkeaAlue = (kLat, kLon, 0.13 * leveysKm, 0.27 * leveysKm);
                    Loki($"selkeä alue: ({kLat:0.00}, {kLon:0.00}) {0.13 * leveysKm:0}–{0.27 * leveysKm:0} km");
                }
                // Päivän todelliset pilvet GIBS:stä, selkein 7 päivästä (omistaja 5.10. klo 15.5x); ei dataa → Pilvikenttä.
                string kuvanLahde = "Contains modified Copernicus Sentinel data", pilviTieto = "pilvikenttä";
                if (GibsPilvetPaalla)
                {
                    Tila = "pilvet";
                    GibsPilvet gp = null;
                    // Laaja kuva: alue ulottuu horisonttiin, joten koko alueen taso jää karkeaksi (z5–z6; juliste 6.10.: lähialueen
                    // pilvet litteinä laattoina). Lähempi puolisko (näytteet, joiden tarvittu resoluutio on mediaania tarkempi) haetaan
                    // tarkemmalta tasolta ensin; sen selkein päivä on myös koko alueen päivä (Päätoimittaja: selkein 7 vrk:sta siitä,
                    // mikä kuvassa näkyy tarkkana).
                    var mp = naytteet.Select(x => x.MetriaPikseli).OrderBy(x => x).ToList();
                    double raja = mp[mp.Count / 2];
                    var lahi = naytteet.Where(x => x.MetriaPikseli <= raja).ToList();
                    double lw = lahi.Min(x => x.LonMin), ls = lahi.Min(x => x.LatMin), le = lahi.Max(x => x.LonMax), ln = lahi.Max(x => x.LatMax);
                    // Päivä valitaan koko alueen karkealta tasolta lähialueen pilvisyyden mukaan; lähialue sitten vain sille päivälle
                    // tarkemmalta tasolta (2048 px → z8–9; Päätoimittaja 6.10.: z5 + z7 oli litteitä laikkuja ja laattasaumoja).
                    yield return HaeGibs(w, s, e, nn, x => gp = x, null, 1024, (lw, ls, le, ln));
                    // Koko alue valitulta päivältä tarkemmin (2048 px → z6; ca48b99e: z5 oli kaukana maitomainen kerros). Pysyvän
                    // valkoisen poisto jää karkealle (yksi päivä); lähialue alla vielä tarkemmin.
                    if (gp != null && GibsPilvet.TasoAlueelle(w, s, e, nn, 2048) > gp.Taso)
                    {
                        GibsPilvet koko = null;
                        yield return HaeGibs(w, s, e, nn, x => koko = x, gp.Paiva, 2048);
                        if (koko != null && koko.Taso > gp.Taso) gp = koko;
                    }
                    if (gp != null && GibsPilvet.TasoAlueelle(lw, ls, le, ln, 2048) > gp.Taso)
                    {
                        GibsPilvet tarkka = null;
                        yield return HaeGibs(lw, ls, le, ln, x => tarkka = x, gp.Paiva, 2048);
                        if (tarkka != null && tarkka.Taso > gp.Taso) gp.Tarkka = tarkka;
                    }
                    if (gp != null)
                    {
                        gp.Aseta(az, korkeus, kentta);
                        ty.Pilvet = gp; ty.PintaRajaaPilvet = true;
                        kuvanLahde += " · clouds " + GibsPilvet.Merkinta;
                        pilviTieto = $"GIBS {gp.Paiva:yyyy-MM-dd} z{gp.Taso}{(gp.Tarkka != null ? $" + lähialue z{gp.Tarkka.Taso}" : "")}, peitto {gp.Peitto * 100:0} %";
                    }
                }
                // Datattomat kiilat maalla läpinäkyviksi (BMNG alla), merellä merenväri (simu d753d794: sininen kiila Saharassa).
                // Maa: S2-ruutujen SCL-maamaski (rataväli ruudun neliön sisällä on SCL:ssä nodata = maa; avomerellä ei ruutuja)
                // tai pelin maarajat (simu 0cc5ad75: maarajoissa vain pelin 135 maata, Algeria puuttuu → kiila jäi).
                var maaOsuma = MaaOsuma();
                ty.Maalla = (la, lo) => ty.MaaOsuus(la, lo) > 0.5 || (maaOsuma != null && maaOsuma.HaeMaa(la, lo) != null);
                ty.MaanSini = MaanSini; ty.Kamera = kk.Paikka; ty.AurinkoEcef = (aEcef.x, aEcef.y, aEcef.z);   // pilvipeitto kasvaa etäisyyden mukaan (Cupola-mallikuva)
                var lista = ty.Laatat.ToList(); int kirjoitettu = 0;
                int ytimia = Math.Max(1, SystemInfo.processorCount - 1);   // vain pääsäikeessä (laitekoe 1.10.: säikeessä poikkeus)
                // Avomeri (ei S2-ruutua): TCI:n tyypillinen meri tci_lutin läpi, ettei täyttö erotu tummana kaistana (laitekoe 2).
                byte[] meri = { 14, 22, 30 };
                // Vesi tasoitetaan merenväriin (Ateena 8648c410: eri päivien meri suorina ruuturajoina), rannikon matala vesi 25 % jää.
                ty.Data.VesiTasoitus = 0.75; ty.Data.Meri = (byte[])meri.Clone();
                ty.Data.MaaLahella = ty.MaaOsuus;   // avomeri tasaisena, poikkeama vain rannikolla (simu 55448455 Kanaria)
                // Maailman indeksissä lut on ruuduittain: avomeren täyttö ensimmäisen näkymän ruudun alueen lutilla.
                var meriLut = ty.Data.Lut ?? ruudut.Select(x => x.Lut).FirstOrDefault(l => l != null);
                if (meriLut != null) for (int c = 0; c < 3; c++) meri[c] = meriLut[meri[c]];
                // Maailman indeksi: avomeri (täyttö ja S2:n vesi) mosaiikin avomeren väriin (simu f7310e55: Kanarian sauma 31,95° N).
                if (ty.Data.Lut == null && meriLut != null) { meri = (byte[])MosaiikinMeri.Clone(); ty.Data.MeriUlos = MosaiikinMeri; }
                // Usvatasoitus ruuduittain (simu d753d794: Amazonian eri päivien ruudut sameina lohkoina), taustasäikeessä (purku).
                if (UsvaTasoitus)
                {
                    var ut = Task.Run(() => Uudelleenprojisointi.TasaaUsva(ty.Data));
                    while (!ut.IsCompleted) yield return null;
                    if (ut.IsFaulted) Loki("usvatasoitus: " + ut.Exception?.GetBaseException().Message);
                    else Loki($"usvatasoitus {ut.Result.Count} ruutua: " + string.Join(", ", ut.Result.Where(u => u.r + u.g + u.b > 0.5)
                        .Select(u => $"{u.tunnus} −({u.r:0},{u.g:0},{u.b:0})")));
                }
                // Vesitaso ruuduittain (simu 10c31692 Kanaria: auringon heijastuksen päivien meri suorina saumoina avomerellä).
                {
                    var vt = Task.Run(() => Uudelleenprojisointi.TasaaVesi(ty.Data));
                    while (!vt.IsCompleted) yield return null;
                    if (vt.IsFaulted) Loki("vesitaso: " + vt.Exception?.GetBaseException().Message);
                    else Loki($"vesitaso {vt.Result.Count} ruutua: " + string.Join(", ", vt.Result.Select(v => $"{v.tunnus} ({v.r:0},{v.g:0},{v.b:0})")));
                }
                // Tasot tarkimmasta juureen (KuvanTyosto.PiirraKaikki): lehti datasta, isä lapsistaan.
                var tyot = Task.Run(() => ty.PiirraKaikki((l, rgba) =>
                {
                    // EncodeArrayToPNG olettaa rivin 0 alimmaksi (Unityn tekstuurijärjestys); laatassa rivi 0 = pohjoinen → käännetään.
                    // Laitekoe 6 (kaistadiagnoosi 1.10.): kääntämättä jokainen laatta oli pystysuunnassa peilattu → vaakakaistat.
                    var kaanto = new byte[rgba.Length];
                    for (int y = 0; y < 256; y++) Buffer.BlockCopy(rgba, y * 1024, kaanto, (255 - y) * 1024, 1024);
                    // Täyttö (alfa 254) ja data läpinäkymättömiksi; datattomat maalla (KuvanTyosto.Maalla, alfa 0) ja koonnin pehmeä reuna
                    // säilyvät, jolloin BMNG näkyy alta (simu 639975db: pakotettu 255 teki läpinäkyvistä mustia → tummansininen kiila).
                    for (int i = 3; i < kaanto.Length; i += 4) if (kaanto[i] >= 240) kaanto[i] = 255;
                    var png = ImageConversion.EncodeArrayToPNG(kaanto, UnityEngine.Experimental.Rendering.GraphicsFormat.R8G8B8A8_SRGB, 256, 256);
                    var polku = Path.Combine(laatat, ty.Polku(l.z, l.x, l.y) + ".png");
                    Directory.CreateDirectory(Path.GetDirectoryName(polku)); File.WriteAllBytes(polku, png);
                }, ytimia, meri, n => kirjoitettu = n));
                while (!tyot.IsCompleted) { Edistyminen = 0.6f + 0.25f * kirjoitettu / Math.Max(1, lista.Count); yield return null; }
                if (tyot.IsFaulted) { Loki("työstö: " + tyot.Exception?.GetBaseException().Message); yield break; }
                // Työstön data pois ennen renderöintiä (iPad-mittaus 2.10.: perustaso jäi kuvan jälkeen 3,2–4,0 Gt:iin).
                ty.Mosaiikki = null; lahde.Clear(); ty.Data.Vapauta(); sclPuretut.Clear();
                GC.Collect();
                int zmax = lista.Max(l => l.z);
                Loki($"laatat {lista.Count} (z6–{zmax}, juuri {ty.Rx}×{ty.Ry}), aurinko {az:0}° / {korkeus:0.0}°, {kello.ElapsedMilliseconds / 1000.0:0.0} s");

                // 6) pinta S2:n paikalle ja kamera kuvan kokoiseen tekstuuriin; odotus kunnes pallo on ladattu
                Tila = "renderöinti";
                if (kenttaRajattu)
                {
                    AstronauttiLinssi.Vertailu = kuvanAsento; AstronauttiLinssi.VertailuKentta = kuvanKentta;
                    yield return KameraAsettuu(kamera);
                }
                AstronauttiKerros.KuvanPinta = new AstronauttiKerros.Pinta { Url = "file://" + laatat + "/{z}/{x}/{reverseY}.png",
                    W = ty.W, S = ty.S, E = ty.E, N = ty.N, Rx = ty.Rx, Ry = ty.Ry, MaxTaso = zmax - KuvanTyosto.JuuriZ };
                rt = new RenderTexture(W, H, 24, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB) { name = "IssKameraKuva", antiAliasing = 1 };
                rt.Create();
                kamera.targetTexture = rt; kamera.ResetAspect();
                IssJuliste.SiluettiKuvaan();
                var pallo = KarttaKerrokset.Instanssi?.pallo;
                float alku2 = Time.realtimeSinceStartup, vakaa = -1;
                yield return new WaitForSecondsRealtime(2f);   // S2-paikka vaihtuu Kyyti-kierroksella (≤ 1 s)
                while (Time.realtimeSinceStartup - alku2 < 90)
                {
                    float lataus = pallo != null ? pallo.ComputeLoadProgress() : 100;
                    Edistyminen = 0.85f + 0.14f * lataus / 100f;
                    if (lataus >= 99.9f) { if (vakaa < 0) vakaa = Time.realtimeSinceStartup; else if (Time.realtimeSinceStartup - vakaa > 1.5f) break; }
                    else vakaa = -1;
                    yield return null;
                }
                Loki($"lataus tasaantui {Time.realtimeSinceStartup - alku2:0.0} s, pallo {(pallo != null ? pallo.ComputeLoadProgress() : 0):0.0} %, lisäodotus {LisaOdotus:0} s");
                yield return new WaitForSecondsRealtime(LisaOdotus);
                string albumi = Path.Combine(Application.persistentDataPath, "iss-albumi"); Directory.CreateDirectory(albumi);
                byte[] jpg = null;
                // Paikka kuten LCD:ssä (lähin kaupunki, vuori tai meri + maa) kuvan keskipisteestä, nimet sellaisinaan; julisteeseen.
                // Laajassa kuvassa kohde on keskikohdan alapuolella: nimi ja koordinaatit kohteesta.
                var keskus = naytteet.OrderBy(n => Math.Abs(n.Sx - 24) + Math.Abs(n.Sy - 18)).First();
                if (kohdePiste is (double, double) kpp) keskus = new Nayte { Sx = keskus.Sx, Sy = keskus.Sy, Lat = kpp.Lat, Lon = kpp.Lon, MetriaPikseli = keskus.MetriaPikseli };
                var (kp, km2) = IssSijainti.Nimet(IssSijainti.Nykyinen, keskus.Lat, keskus.Lon);
                for (int k = 0; k <= Sarja; k++)
                {
                    if (k > 0) yield return new WaitForSecondsRealtime(10f);
                    yield return new WaitForEndOfFrame();
                    var lukija = AsyncGPUReadback.Request(rt, 0, TextureFormat.RGBA32);
                    while (!lukija.done) yield return null;
                    if (lukija.hasError) { Loki("luku epäonnistui"); yield break; }
                    var kuva = new Texture2D(W, H, TextureFormat.RGBA32, false);
                    kuva.LoadRawTextureData(lukija.GetData<byte>()); kuva.Apply(false);
                    if (Avaruus.KuvanNousu > 0.01f) Heijastukset(kuva, kamera, W, H, Avaruus.KuvanNousu);
                    Valota(kuva);
                    Kehita(kuva);
                    Kontrasti(kuva, KuvanKontrasti);
                    ValojenKatto(kuva);
                    Halo(kuva, kk);
                    byte[] j = null;
                    if (k == 0 && IssJuliste.Kaytossa)
                    {
                        int? vuosi = null;
                        try { vuosi = ruudut.Select(r => ehdokkaat.First(x => x.Tunnus == r.Tunnus).Valinnat[0].Pvm).Where(v => v != null && v.Length >= 4)
                                .Select(v => int.Parse(v.Substring(0, 4), System.Globalization.CultureInfo.InvariantCulture)).DefaultIfEmpty().Max(); } catch (Exception) { }
                        var jt = new IssJuliste.Tiedot { Nimi = JulisteenNimi(keskus.Lat, keskus.Lon), Lat = keskus.Lat, Lon = keskus.Lon,
                            Tekninen = TekninenRivi(utc, kk, keskus.Lat, keskus.Lon, korkeus),
                            Lahde = DatalahdeRivi(vuosi > 2000 ? vuosi : null, pilviTieto.StartsWith("GIBS", StringComparison.Ordinal)) };
                        yield return IssJuliste.Tee(kuva, jt, b => j = b);
                        Loki(j != null ? "juliste: valmis" : "juliste: ei paneelia → pelkkä kuva");
                    }
                    j ??= kuva.EncodeToJPG(93); Destroy(kuva);
                    if (k == 0) jpg = j; else { File.WriteAllBytes(Path.Combine(albumi, $"{id}-{k}.jpg"), j); Loki($"sarjakuva {k} (+{10 * k} s)"); }
                }
                ViimeisinKuva = Path.Combine(albumi, id + ".jpg");
                File.WriteAllBytes(ViimeisinKuva, jpg);
                loppuTila = "valmis";
                File.WriteAllText(Path.ChangeExtension(ViimeisinKuva, ".json"), Tiedot(id, utc, kk, naytteet, muoto, az, korkeus, ruudut, ehdokkaat, saatu, kuvanLahde, pilviTieto));
                Edistyminen = 1;
                Loki($"VALMIS {ViimeisinKuva} ({jpg.Length / 1e6:0.0} Mt, {W}×{H}), yhteensä {kello.ElapsedMilliseconds / 1000.0:0.0} s, haettu {saatu / 1e6:0.0} Mt, pallo {(pallo != null ? pallo.ComputeLoadProgress() : 0):0.0} %");
                KuvaValmis(ViimeisinKuva, kp, km2, utc, keskus.Lat, keskus.Lon, kuvanLahde);
            }
            finally
            {
                if (kenttaRajattu) AstronauttiLinssi.Vertailu = null;
                IssJuliste.SiluettiPois();
                Matkakirja.Linssit.Kyytipino.Filmi = filmi0; Avaruus.IlmanVoima = ilma0;
                if (rt != null) { kamera.targetTexture = null; kamera.ResetAspect(); rt.Release(); Destroy(rt); }
                GC.Collect(); Resources.UnloadUnusedAssets();
                Loki($"muisti kuvan jälkeen: vapaata {VapaaMuistiMt()} Mt");
                StartCoroutine(KutistaValimuisti());
                AstronauttiKerros.KuvanPinta = null;
                Avaruus.KuvaputkiAsetettu = false;
                Avaruus.KuvanNousu = 0f;
                Yokuori.Aallokko = aallokko0; Yokuori.KiillonVoima = kiilto0;
                if (kaariAsetettu) AsetaKaari(1f, 1f, 1f, 1f, 1f, 0f);
                IssNyt.Simu.AsetaKerroin(kerroin0 > 0 ? kerroin0 : 1);
                if (!SailytaLaatat) try { if (Directory.Exists(laatat)) Directory.Delete(laatat, true); } catch { }
                Tila = loppuTila; kaynnissa = false;
            }
        }

        /// <summary>
        /// Tarkka kuva kuvauspaikalta: valmis kuva laatoiksi kuvan pinnaksi, kamera ISS:ltä paikkaan rajattuna, odotus kunnes pallo on
        /// ladattu, kaappaus albumiin kuten COG-polussa. Kello seis ja kuvaputken asetukset kuvan ajan.
        /// </summary>
        IEnumerator AjoPaikka(Camera kamera, AstronauttiLinssi linssi, Kuvauspaikka p, int W, int H, string muoto)
        {
            kaynnissa = true; Edistyminen = 0; string loppuTila = "keskeytyi";
            try { Aloitettu?.Invoke(); } catch (Exception e) { Debug.LogException(e); }
            var kello = System.Diagnostics.Stopwatch.StartNew();
            string id = DateTime.UtcNow.ToString("yyyyMMdd-HHmmss");
            string juuri = Path.Combine(Application.persistentDataPath, "iss-kamera"), laatat = Path.Combine(juuri, "laatat-" + id);
            Directory.CreateDirectory(juuri);
            double kerroin0 = IssNyt.Simu.Kerroin;
            IssNyt.Simu.AsetaKerroin(0);
            Avaruus.KuvaputkiAsetettu = true;
            float aallokko0 = Yokuori.Aallokko, kiilto0 = Yokuori.KiillonVoima;
            Yokuori.Aallokko = 0.008f; Yokuori.KiillonVoima = 3.5f;
            bool kaariAsetettu = KaariOletuksissa();
            if (kaariAsetettu) AsetaKaari(KaariVoima, KaariHr, KaariSini, KaariUtu, KaariYdin, KaariSyva);
            var utc = IssNyt.Kello();
            RenderTexture rt = null;
            try
            {
                // 1) kuvauspaikan kuva: testitiedosto tai ämpäri (välimuistiin samaan paikkaan)
                Tila = "haku"; Loki($"tarkka kuva {id} {p.Tunniste} {muoto} {W}×{H}, {utc:yyyy-MM-dd HH:mm:ss} UTC");
                string tiedosto = Path.Combine(juuri, "kuvauspaikat", p.Tunniste + ".jpg");
                byte[] data = File.Exists(tiedosto) ? File.ReadAllBytes(tiedosto) : null;
                if (data == null)
                {
                    using var q = UnityWebRequest.Get(Kuvauspaikat.Juuri + p.Kuva);
                    yield return q.SendWebRequest();
                    if (q.result != UnityWebRequest.Result.Success) { Loki($"kuva {p.Kuva}: {q.error}"); yield break; }
                    data = q.downloadHandler.data;
                    Directory.CreateDirectory(Path.GetDirectoryName(tiedosto)); File.WriteAllBytes(tiedosto, data);
                }
                Edistyminen = 0.1f;
                var tex = new Texture2D(2, 2, TextureFormat.RGBA32, false);
                if (!tex.LoadImage(data)) { Destroy(tex); Loki("kuvan purku epäonnistui"); yield break; }
                int kw = tex.width, kh = tex.height; var rgb = new byte[kw * kh * 3];
                // LoadImage: JPG → RGB24 (3 tavua), rivi 0 = alin → rgb rivi 0 = pohjoinen.
                int bpp = tex.format == TextureFormat.RGB24 ? 3 : tex.format == TextureFormat.RGBA32 ? 4 : 0;
                if (bpp > 0)
                {
                    var raw = tex.GetPixelData<byte>(0);
                    for (int yy = 0; yy < kh; yy++)
                        for (int xx = 0; xx < kw; xx++)
                        { int i = ((kh - 1 - yy) * kw + xx) * bpp, o = (yy * kw + xx) * 3; rgb[o] = raw[i]; rgb[o + 1] = raw[i + 1]; rgb[o + 2] = raw[i + 2]; }
                }
                else
                {
                    var px = tex.GetPixels32();
                    for (int yy = 0; yy < kh; yy++)
                        for (int xx = 0; xx < kw; xx++)
                        { var c = px[(kh - 1 - yy) * kw + xx]; int o = (yy * kw + xx) * 3; rgb[o] = c.r; rgb[o + 1] = c.g; rgb[o + 2] = c.b; }
                }
                Destroy(tex);

                // 2) laatat levylle säikeissä
                Tila = "työstö";
                double mpx = p.MPx > 0 ? p.MPx : p.KokoM / Math.Max(1, kw);
                var pl = new PaikanLaatat(rgb, kw, kh, p.W, p.S, p.E, p.N, mpx);
                var lista = pl.Laatat.ToList(); int kirjoitettu = 0;
                // Päivän pilvet GIBS:stä myös kuvauspaikkaan (selkein 7 päivästä); ei dataa → pilvetön kuten ennen.
                GibsPilvet gp = null; string paikanLahde = p.Lahde;
                if (GibsPilvetPaalla)
                {
                    Tila = "pilvet";
                    yield return HaeGibs(p.W, p.S, p.E, p.N, x => gp = x);
                    if (gp != null)
                    {
                        var (paz, pkor) = AurinkoPisteessa(utc, p.Lat, p.Lon);
                        gp.AurinkoAz = paz; gp.AurinkoKorkeus = pkor;
                        gp.Yksityiskohta = new Pilvikentta { AurinkoAz = paz, AurinkoKorkeus = pkor };
                        paikanLahde = (string.IsNullOrEmpty(p.Lahde) ? "" : p.Lahde + " · ") + "clouds " + GibsPilvet.Merkinta;
                    }
                    Tila = "työstö";
                }
                // SystemInfo vain pääsäikeessä (simu 38fa740d: "GetProcessorCount can only be called from the main thread").
                var rinnakkain = new ParallelOptions { MaxDegreeOfParallelism = Math.Max(1, SystemInfo.processorCount - 1) };
                var tyot = Task.Run(() => System.Threading.Tasks.Parallel.ForEach(lista, rinnakkain, l =>
                {
                    var rgba = pl.Piirra(l.z, l.x, l.y);
                    if (gp != null) KuvanTyosto.PiirraPilvet(gp, l.z, l.x, l.y, rgba, true,
                        IssJuliste.Kaytossa ? (p.Lat, p.Lon, 0.13 * p.KokoM / 1000, 0.27 * p.KokoM / 1000) : ((double, double, double, double)?)null);
                    var kaanto = new byte[rgba.Length];   // EncodeArrayToPNG: rivi 0 alin
                    for (int y = 0; y < 256; y++) Buffer.BlockCopy(rgba, y * 1024, kaanto, (255 - y) * 1024, 1024);
                    var png = ImageConversion.EncodeArrayToPNG(kaanto, UnityEngine.Experimental.Rendering.GraphicsFormat.R8G8B8A8_SRGB, 256, 256);
                    var polku = Path.Combine(laatat, $"{l.z - KuvanTyosto.JuuriZ}/{l.x - (pl.X0 << (l.z - KuvanTyosto.JuuriZ))}/{l.y - (pl.Y0 << (l.z - KuvanTyosto.JuuriZ))}.png");
                    Directory.CreateDirectory(Path.GetDirectoryName(polku)); File.WriteAllBytes(polku, png);
                    System.Threading.Interlocked.Increment(ref kirjoitettu);
                }));
                while (!tyot.IsCompleted) { Edistyminen = 0.15f + 0.45f * kirjoitettu / Math.Max(1, lista.Count); yield return null; }
                if (tyot.IsFaulted) { Loki("työstö: " + tyot.Exception?.GetBaseException().Message); yield break; }
                rgb = null; GC.Collect();
                Loki($"laatat {lista.Count} (z6–{pl.ZMax}, juuri {pl.Rx}×{pl.Ry}), kuva {kw}×{kh} {mpx:0.0} m/px, {kello.ElapsedMilliseconds / 1000.0:0.0} s");

                // 3) pinta, kamera paikkaan ISS:ltä (Vertailu = kyydin asennon ohitus) ja kuvan kokoinen tekstuuri
                Tila = "renderöinti";
                AstronauttiKerros.KuvanPinta = new AstronauttiKerros.Pinta { Url = "file://" + laatat + "/{z}/{x}/{reverseY}.png",
                    W = pl.JuuriW, S = pl.JuuriS, E = pl.JuuriE, N = pl.JuuriN, Rx = pl.Rx, Ry = pl.Ry, MaxTaso = pl.ZMax - KuvanTyosto.JuuriZ };
                var (asento, pysty) = linssi.KuvausRajaus(p, (double)W / H);
                AstronauttiLinssi.Vertailu = asento; AstronauttiLinssi.VertailuKentta = pysty;
                rt = new RenderTexture(W, H, 24, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB) { name = "IssKameraKuva", antiAliasing = 1 };
                rt.Create();
                kamera.targetTexture = rt; kamera.ResetAspect();
                IssJuliste.SiluettiKuvaan();
                var pallo = KarttaKerrokset.Instanssi?.pallo;
                float alku2 = Time.realtimeSinceStartup, vakaa = -1;
                yield return new WaitForSecondsRealtime(2f);
                while (Time.realtimeSinceStartup - alku2 < 90)
                {
                    float lataus = pallo != null ? pallo.ComputeLoadProgress() : 100;
                    Edistyminen = 0.6f + 0.39f * lataus / 100f;
                    if (lataus >= 99.9f) { if (vakaa < 0) vakaa = Time.realtimeSinceStartup; else if (Time.realtimeSinceStartup - vakaa > 1.5f) break; }
                    else vakaa = -1;
                    yield return null;
                }
                Loki($"lataus tasaantui {Time.realtimeSinceStartup - alku2:0.0} s, kenttä {pysty:0.00}°, etäisyys {asento.EtaisyysM / 1000:0} km, kallistus {asento.Kallistus:0.0}°");
                yield return new WaitForSecondsRealtime(LisaOdotus);
                yield return new WaitForEndOfFrame();
                var lukija = AsyncGPUReadback.Request(rt, 0, TextureFormat.RGBA32);
                while (!lukija.done) yield return null;
                if (lukija.hasError) { Loki("luku epäonnistui"); yield break; }
                var kuva = new Texture2D(W, H, TextureFormat.RGBA32, false);
                kuva.LoadRawTextureData(lukija.GetData<byte>()); kuva.Apply(false);
                Valota(kuva);
                Kehita(kuva);
                Kontrasti(kuva, KuvanKontrasti);
                ValojenKatto(kuva);
                byte[] jpg = null;
                if (IssJuliste.Kaytossa)
                {
                    var (_, pkor2) = AurinkoPisteessa(utc, p.Lat, p.Lon);
                    double pmm = (W >= H ? 24 : 24.0 * H / W) / 2 / Math.Tan(pysty * Math.PI / 360);
                    var jt = new IssJuliste.Tiedot { Nimi = JulisteenNimi(p.Lat, p.Lon, p.Nimi), Lat = p.Lat, Lon = p.Lon,
                        Tekninen = TekninenRivi(utc, pmm, asento.EtaisyysM / 1000, pkor2),
                        Lahde = string.IsNullOrEmpty(p.Lahde) ? DatalahdeRivi(null, gp != null) : p.Lahde + (gp != null ? " · pilvet " + GibsPilvet.Merkinta : "") };
                    yield return IssJuliste.Tee(kuva, jt, b => jpg = b);
                    Loki(jpg != null ? "juliste: valmis" : "juliste: ei paneelia → pelkkä kuva");
                }
                jpg ??= kuva.EncodeToJPG(93); Destroy(kuva);
                string albumi = Path.Combine(Application.persistentDataPath, "iss-albumi"); Directory.CreateDirectory(albumi);
                ViimeisinKuva = Path.Combine(albumi, id + ".jpg");
                File.WriteAllBytes(ViimeisinKuva, jpg);
                var iss = IssNyt.Paikka(utc); double km = IssNyt.KorkeusKm(utc);
                var ic = System.Globalization.CultureInfo.InvariantCulture;
                File.WriteAllText(Path.ChangeExtension(ViimeisinKuva, ".json"), string.Format(ic,
                    "{{\"id\":\"{0}\",\"aika_utc\":\"{1:yyyy-MM-ddTHH:mm:ssZ}\",\"muoto\":\"{2}\",\"leveys\":{3},\"korkeus\":{4},\"kuvauspaikka\":\"{5}\"," +
                    "\"paikka\":\"{6}\",\"maa\":\"{7}\",\"kohde\":{{\"lat\":{8:0.000},\"lon\":{9:0.000}}},\"korkeus_km\":{10:0.0},\"nopeus_kmh\":{11:0}," +
                    "\"etaisyys_km\":{12:0},\"kenttakulma\":{13:0.00},\"lahde\":\"{14}\"}}",
                    id, utc, muoto, W, H, p.Tunniste, p.Nimi, p.Maa, p.Lat, p.Lon, km, IssNyt.NopeusKmh(km), asento.EtaisyysM / 1000, pysty,
                    (paikanLahde ?? "").Replace("\"", "'")));
                loppuTila = "valmis"; Edistyminen = 1;
                Loki($"VALMIS {ViimeisinKuva} ({p.Nimi}, {jpg.Length / 1e6:0.0} Mt, {W}×{H}), yhteensä {kello.ElapsedMilliseconds / 1000.0:0.0} s");
                KuvaValmis(ViimeisinKuva, p.Nimi, p.Maa, utc, p.Lat, p.Lon, paikanLahde);
            }
            finally
            {
                AstronauttiLinssi.Vertailu = null;
                IssJuliste.SiluettiPois();
                if (rt != null) { kamera.targetTexture = null; kamera.ResetAspect(); rt.Release(); Destroy(rt); }
                AstronauttiKerros.KuvanPinta = null;
                Avaruus.KuvaputkiAsetettu = false;
                Yokuori.Aallokko = aallokko0; Yokuori.KiillonVoima = kiilto0;
                if (kaariAsetettu) AsetaKaari(1f, 1f, 1f, 1f, 1f, 0f);
                IssNyt.Simu.AsetaKerroin(kerroin0 > 0 ? kerroin0 : 1);
                if (!SailytaLaatat) try { if (Directory.Exists(laatat)) Directory.Delete(laatat, true); } catch { }
                GC.Collect();
                Tila = loppuTila; kaynnissa = false;
            }
        }

        /// <summary>Teksti välimuistista (tiedosto) tai verkosta (tallennetaan onnistuessa); null = ei saatu (404 ei välimuistiin).</summary>
        /// <summary>s2-eurooppa/v1-mosaiikin avomeren kiinteä väri (Karttaseppä: euromosaiikki-v2.mjs MERI, Ligurianmeren mediaani).</summary>
        static readonly byte[] MosaiikinMeri = { 48, 64, 85 };

        static IEnumerator HaeTeksti(string url, string tiedosto, Action<string> valmis)
        {
            if (File.Exists(tiedosto)) { valmis(File.ReadAllText(tiedosto)); yield break; }
            using var q = UnityWebRequest.Get(url);
            yield return q.SendWebRequest();
            if (q.result != UnityWebRequest.Result.Success) { Loki($"haku {Path.GetFileName(tiedosto)}: {q.error}"); valmis(null); yield break; }
            File.WriteAllBytes(tiedosto, q.downloadHandler.data);
            valmis(q.downloadHandler.text);
        }

        /// <summary>
        /// Kuvan automaattivalotus kuten kamerassa (Päätoimittaja 4.10.: usva ja valotus; simu a10a2777: Amazonia liian tumma): kuvan
        /// keskikirkkaus (Rec. 709, sRGB-tavuina) kohti ValotusTavoite; vain kirkastus, enintään ValotusMax-kertaiseksi (tummaa ei
        /// nosteta harmaaksi), kirkkaita kuvia ei tummenneta. Testikomento `astro kyyti kuvaa valotus <tavoite> [max]`.
        /// </summary>
        public static float ValotusTavoite = 0.36f, ValotusMax = 1.8f;

        /// <summary>
        /// KUVAN PARANNUS (Päätoimittaja 6.10., omistaja: "kuvaa oli paranneltu"; juliste E v2:n jälkikäsittely juliste-jalki.py 1.10.):
        /// S-käyrä luminanssiin voimalla 0,35 (smoothstep-sekoitus): mustat syvemmiksi, keskisävyt ennallaan, valot eivät pala puhki.
        /// Värisävy säilyy (sama muutos kaikkiin kanaviin = YCbCr:n Cb ja Cr ennallaan). A/B `astro kyyti kuvaa kontrasti <0–1>`.
        /// </summary>
        public static float KuvanKontrasti = 0.35f;

        static void Kontrasti(Texture2D kuva, float voima)
        {
            if (voima <= 0f) return;
            var lut = new int[256];
            for (int i = 0; i < 256; i++) { float t = i / 255f, sk = t * t * (3 - 2 * t); lut[i] = Mathf.Clamp(Mathf.RoundToInt(255f * (t * (1 - voima) + sk * voima)), 0, 255) - i; }
            var px = kuva.GetPixelData<Color32>(0);
            for (int i = 0; i < px.Length; i++)
            {
                var c = px[i];
                int y = (299 * c.r + 587 * c.g + 114 * c.b + 500) / 1000, d = lut[Mathf.Clamp(y, 0, 255)];
                if (d == 0) continue;
                px[i] = new Color32((byte)Mathf.Clamp(c.r + d, 0, 255), (byte)Mathf.Clamp(c.g + d, 0, 255), (byte)Mathf.Clamp(c.b + d, 0, 255), c.a);
            }
            kuva.Apply(false);
        }

        /// <summary>Julisteen Cupola-kehys ladataan valmiiksi (kuvan koko riippuu sen aukosta).</summary>
        void Start() => StartCoroutine(IssJuliste.EsilataaKehys());

        /// <summary>A/B `astro kyyti kuvaa kehitys 0|1`: Kuvankasittely.Kehita (omistaja 6.10.: sinisempi, enemmän wow-efektiä).</summary>
        public static bool Kehitys = true;

        /// <summary>A/B `astro kyyti kuvaa halo 0|1`: ilmakehän reuna 2D-gradienttina (Kuvankasittely.Halo).</summary>
        public static bool Halo2D = true;

        /// <summary>Horisontti sarakkeittain kameran geometriasta (ensimmäinen maahan osuva rivi ylhäältä, binäärihaku) ja halo.</summary>
        static void Halo(Texture2D kuva, KuvaKamera kk)
        {
            if (!Halo2D || !IssJuliste.Kaytossa) return;
            int W = kuva.width, H = kuva.height;
            double tv = Math.Tan(kk.PystykenttaAst * Math.PI / 360), th = tv * W / H;
            var raja = new float[W]; int loydetty = 0;
            for (int x = 0; x < W; x++)
            {
                double u = (2 * (x + 0.5) / W - 1) * th;
                bool Osuu(double yy)
                {
                    double v = (1 - 2 * yy / H) * tv;
                    var d = (kk.Katse.x + u * kk.Oikea.x + v * kk.Ylos.x, kk.Katse.y + u * kk.Oikea.y + v * kk.Ylos.y, kk.Katse.z + u * kk.Oikea.z + v * kk.Ylos.z);
                    return Kuvasuunnitelma.Osuma(kk.Paikka, d) != null;
                }
                if (Osuu(0) || !Osuu(H)) { raja[x] = -1; continue; }
                double lo = 0, hi = H;
                for (int k = 0; k < 24; k++) { double m = (lo + hi) / 2; if (Osuu(m)) hi = m; else lo = m; }
                raja[x] = (float)hi; loydetty++;
            }
            if (loydetty == 0) return;
            var data = kuva.GetPixelData<byte>(0); var t = data.ToArray();
            Kuvankasittely.Halo(t, W, H, raja, true);
            data.CopyFrom(t); kuva.Apply(false);
            Loki($"halo: horisontti {loydetty}/{W} sarakkeessa");
        }

        static void ValojenKatto(Texture2D kuva)
        {
            if (!Kehitys) return;
            var data = kuva.GetPixelData<byte>(0); var t = data.ToArray();
            Kuvankasittely.ValojenKatto(t);
            data.CopyFrom(t); kuva.Apply(false);
        }

        static void Kehita(Texture2D kuva)
        {
            if (!Kehitys) return;
            var kello = System.Diagnostics.Stopwatch.StartNew();
            var data = kuva.GetPixelData<byte>(0); var t = data.ToArray();
            Kuvankasittely.Kehita(t, kuva.width, kuva.height);
            data.CopyFrom(t); kuva.Apply(false);
            Loki($"kehitys: paikallinen kontrasti, sinisyys, hehku {kello.ElapsedMilliseconds} ms");
        }

        static void Valota(Texture2D kuva)
        {
            var px = kuva.GetPixelData<Color32>(0);
            double summa = 0; int n = 0;
            for (int i = 0; i < px.Length; i += 37) { var c = px[i]; summa += 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b; n++; }
            double keski = n > 0 ? summa / n / 255.0 : 1;
            float k = (float)Math.Max(1.0, Math.Min(ValotusMax, ValotusTavoite / Math.Max(0.01, keski)));
            Loki($"valotus: keskikirkkaus {keski:0.000}, kerroin {k:0.00}");
            if (k <= 1.01f) return;
            for (int i = 0; i < px.Length; i++)
            {
                var c = px[i];
                px[i] = new Color32((byte)Math.Min(255, c.r * k + 0.5f), (byte)Math.Min(255, c.g * k + 0.5f), (byte)Math.Min(255, c.b * k + 0.5f), c.a);
            }
            kuva.Apply(false);
        }

        /// <summary>Range-haut enintään Rinnakkain kerrallaan, purku säikeissä; tila: [0] saatu, [1] virheet.</summary>
        /// <summary>GIBS-pilvet ISS-kuvaan (Päätoimittaja 5.10.); A/B `astro kyyti kuvaa gibs 0|1`, pois → Pilvikenttä.</summary>
        public static bool GibsPilvetPaalla = true;

        /// <summary>
        /// GIBS-ruudut alueelle viimeisiltä 7 päivältä (eilinen UTC ensin; tämän päivän kuvat valmistuvat 3–6 h ylilennosta),
        /// kerros kerrallaan kaikille päiville rinnakkain: seuraava kerros (SNPP → NOAA-20 → Terra → Aqua) vain päiville, joilla
        /// edellisistä jäi aukkoja. Tyhjä ruutu on 1665 tavun musta JPEG.
        /// </summary>
        /// <param name="paiva">Pakotettu päivä (tarkka lähialue: vain se päivä haetaan, ei pysyvän valkoisen poistoa).</param>
        /// <param name="maxPx">Alueen enimmäisleveys pikseleinä tason valintaan (tarkka lähialue 2048 → z8–9).</param>
        /// <param name="paino">Selkeimmän päivän valinta tämän alueen (w, s, e, n) pilvisyydestä.</param>
        IEnumerator HaeGibs(double w, double s, double e, double n, Action<GibsPilvet> valmis, DateTime? paiva = null, int maxPx = 1024,
            (double w, double s, double e, double n)? paino = null)
        {
            int z = GibsPilvet.TasoAlueelle(w, s, e, n, maxPx);
            var (fx0, fy0) = GibsPilvet.Pikseli(n, w, z); var (fx1, fy1) = GibsPilvet.Pikseli(s, e, z);
            int x0 = (int)Math.Floor(fx0), y0 = (int)Math.Floor(fy0), W = (int)Math.Ceiling(fx1) - x0, H = (int)Math.Ceiling(fy1) - y0;
            if (W <= 0 || H <= 0) { valmis(null); yield break; }
            int R = GibsPilvet.Ruutu, tx0 = x0 / R, ty0 = y0 / R, tx1 = (x0 + W - 1) / R, ty1 = (y0 + H - 1) / R;
            var kello = System.Diagnostics.Stopwatch.StartNew();
            // Pilvet kuvan hetkeltä (pelin kello; Helsinki vedoksen valossa 21.6. sai lokakuun pilvet), tulevaisuudessa tältä päivältä.
            var tanaan = IssNyt.Kello().Date; if (tanaan > DateTime.UtcNow.Date) tanaan = DateTime.UtcNow.Date;
            // Selkein ±7 vrk kuvan päivästä (Päätoimittaja 6.10.: "kesäkuun selkein päivä ±7 vrk samalla valolla"); tulevaisuus pois.
            var paivat = new List<(DateTime paiva, byte[][] kerrokset)>();
            if (paiva.HasValue) paivat.Add((paiva.Value.Date, new byte[GibsPilvet.Kerrokset.Length][]));
            else for (int d = -7; d <= 7; d++)
                {
                    var pv = tanaan.AddDays(d);
                    if (pv < DateTime.UtcNow.Date) paivat.Add((pv, new byte[GibsPilvet.Kerrokset.Length][]));
                }
            long tavut = 0; int pyyntoja = 0;
            for (int k = 0; k < GibsPilvet.Kerrokset.Length; k++)
            {
                var pyynnot = new List<(UnityWebRequest q, int d, int tx, int ty)>();
                for (int d = 0; d < paivat.Count; d++)
                {
                    if (k > 0 && !GibsAukkoja(paivat[d].kerrokset, W, H)) continue;
                    for (int ty = ty0; ty <= ty1; ty++)
                        for (int tx = tx0; tx <= tx1; tx++)
                        {
                            var q = UnityWebRequest.Get(GibsPilvet.Osoite(GibsPilvet.Kerrokset[k], paivat[d].paiva, z, tx, ty));
                            q.timeout = 20; q.SendWebRequest(); pyynnot.Add((q, d, tx, ty));
                        }
                }
                if (pyynnot.Count == 0) break;
                while (pyynnot.Any(p => !p.q.isDone)) yield return null;
                foreach (var (q, d, tx, ty) in pyynnot)
                {
                    using (q)
                    {
                        if (q.result != UnityWebRequest.Result.Success) continue;
                        var data = q.downloadHandler.data; pyyntoja++; tavut += data.Length;
                        if (data.Length <= 1700) continue;   // tyhjä ruutu
                        var tex = new Texture2D(2, 2, TextureFormat.RGB24, false);
                        if (!tex.LoadImage(data)) { Destroy(tex); continue; }
                        var px = tex.GetPixels32(); int tw = tex.width, th = tex.height; Destroy(tex);
                        var rgb = paivat[d].kerrokset[k] ??= new byte[W * H * 3];
                        for (int j = 0; j < th; j++)
                        {
                            int gy = ty * R + j * R / th - y0; if (gy < 0 || gy >= H) continue;
                            for (int i = 0; i < tw; i++)
                            {
                                int gx = tx * R + i * R / tw - x0; if (gx < 0 || gx >= W) continue;
                                var c = px[(th - 1 - j) * tw + i]; int o = (gy * W + gx) * 3;   // Unityn rivit alhaalta ylös
                                rgb[o] = c.r; rgb[o + 1] = c.g; rgb[o + 2] = c.b;
                            }
                        }
                    }
                }
            }
            (int, int, int, int)? painoAlue = null;
            if (paino is (double, double, double, double) pa)
            {
                var (px0, py0) = GibsPilvet.Pikseli(pa.n, pa.w, z); var (px1, py1) = GibsPilvet.Pikseli(pa.s, pa.e, z);
                painoAlue = ((int)px0 - x0, (int)py0 - y0, (int)Math.Ceiling(px1) - x0, (int)Math.Ceiling(py1) - y0);
            }
            var t = Task.Run(() => GibsPilvet.Kokoa(x0, y0, W, H, paivat, z, paiva, painoAlue));
            while (!t.IsCompleted) yield return null;
            var g = t.IsFaulted ? null : t.Result;
            Loki($"gibs: z{z} {W}×{H} px, {pyyntoja} ruutua {tavut / 1e3:0} kt, {kello.ElapsedMilliseconds / 1000.0:0.0} s → "
                + (g == null ? (t.IsFaulted ? "virhe " + t.Exception?.GetBaseException().Message : "ei dataa") : $"{g.Paiva:yyyy-MM-dd}, peitto {g.Peitto * 100:0} %"));
            valmis(g);
        }

        /// <summary>Jääkö haetuista kerroksista aukkoja (yli 0,5 % pikseleistä ilman dataa)?</summary>
        static bool GibsAukkoja(byte[][] k, int W, int H)
        {
            int n = W * H, aukot = 0;
            for (int i = 0; i < n; i++)
            {
                bool data = false;
                foreach (var c in k) if (c != null && Math.Max(c[i * 3], Math.Max(c[i * 3 + 1], c[i * 3 + 2])) > 1) { data = true; break; }
                if (!data && ++aukot > n / 200) return true;
            }
            return false;
        }

        IEnumerator Lataa(List<(string url, long alku, long pit, Action<byte[]> valmis)> haku, long[] tila)
        {
            long tavut = haku.Sum(x => x.pit), tama = 0;
            var kesken = new List<(UnityWebRequest q, int i)>(); var purku = new List<Task>(); int seuraava = 0;
            while (seuraava < haku.Count || kesken.Count > 0)
            {
                while (kesken.Count < Rinnakkain && seuraava < haku.Count)
                {
                    var h = haku[seuraava]; var q = Alue(h.url, h.alku, h.pit); q.SendWebRequest(); kesken.Add((q, seuraava++));
                }
                yield return null;
                for (int k = kesken.Count - 1; k >= 0; k--)
                {
                    var (q, i) = kesken[k]; if (!q.isDone) continue;
                    kesken.RemoveAt(k);
                    if (q.result == UnityWebRequest.Result.Success)
                    {
                        var data = q.downloadHandler.data; var valmis = haku[i].valmis; tila[0] += data.Length; tama += data.Length;
                        purku.Add(Task.Run(() => { try { valmis(data); } catch (Exception x) { Debug.LogWarning("iss-kamera purku: " + x.Message); } }));
                    }
                    else tila[1]++;
                    q.Dispose();
                }
                Edistyminen = 0.6f * tama / Math.Max(1, tavut);
            }
            while (purku.Any(x => !x.IsCompleted)) yield return null;
        }

        static UnityWebRequest Alue(string url, long alku, long pit)
        {
            var q = UnityWebRequest.Get(url);
            q.SetRequestHeader("Range", $"bytes={alku}-{alku + pit - 1}");
            return q;
        }

        /// <summary>
        /// Pallon laattavälimuisti hetkeksi pieneksi kuvan jälkeen (Natiivisepän jatkoerä 2.10.: perustaso jäi ~0,25 Gt kyydin
        /// keskiarvon yläpuolelle): kuvan pinta on jo vaihtunut takaisin S2:een (AstronauttiKerros asettaa sen välimuistin ≤ 1 s:ssa),
        /// joten odotetaan 2 s, kutistetaan 64 Mt:iin 4 s:ksi (Cesium vapauttaa 4096-näkymän laatat) ja palautetaan entinen arvo.
        /// </summary>
        IEnumerator KutistaValimuisti()
        {
            yield return new WaitForSecondsRealtime(2f);
            var p = KarttaKerrokset.Instanssi?.pallo;
            if (p == null) yield break;
            long vanha = p.maximumCachedBytes, pieni = 64L * 1024 * 1024;
            if (vanha <= pieni) yield break;
            p.maximumCachedBytes = pieni;
            yield return new WaitForSecondsRealtime(4f);
            if (p != null && p.maximumCachedBytes == pieni) p.maximumCachedBytes = vanha;
            Loki($"välimuisti kutistettu ja palautettu {vanha / 1048576} Mt, vapaata {VapaaMuistiMt()} Mt");
        }

        /// <summary>
        /// Linssiheijastukset ja auringon hehku kuvaan (kiertoratanousu, Päätoimittaja 1.10. 21.5x: "hehku/bloom, säteet ja muutama
        /// heijastusläiskä kuvan halki"): lämmin hehku auringon ympärille ja heijastusläiskät auringosta kuvan keskipisteen kautta
        /// vastakkaiselle puolelle. Voimakkuus auringon näkyvyydestä (kiekon pikselien kirkkaus) × voima. Rivi 0 = alin (Unity).
        /// </summary>
        static void Heijastukset(Texture2D kuva, Camera kamera, int W, int H, float voima)
        {
            var v = kamera.WorldToViewportPoint(kamera.transform.position + KyydinTaivas.AurinkoMaailma * 1.0e6f);
            if (v.z <= 0) return;
            float sx = v.x * W, sy = v.y * H;
            if (sx < -0.5f * W || sx > 1.5f * W || sy < -0.5f * H || sy > 1.5f * H) return;
            var px = kuva.GetPixelData<Color32>(0);
            // näkyvyys: kirkkain 5 × 5 -näyte kiekon ympäriltä (kaaren takana osittain → himmeämpi)
            float nako = 0;
            for (int j = -2; j <= 2; j++)
                for (int i = -2; i <= 2; i++)
                {
                    int x = (int)sx + i * 4, y = (int)sy + j * 4;
                    if (x < 0 || y < 0 || x >= W || y >= H) continue;
                    var c = px[y * W + x]; nako = Math.Max(nako, (c.r + c.g + c.b) / 765f);
                }
            float k = voima * Mathf.Clamp01((nako - 0.5f) / 0.4f);
            if (k <= 0.01f) return;
            float cx = W * 0.5f, cy = H * 0.5f;
            void Lisaa(float x0, float y0, float sade, Color vari, float teho, bool rengas)
            {
                int ax = Math.Max(0, (int)(x0 - sade)), bx = Math.Min(W - 1, (int)(x0 + sade)), ay = Math.Max(0, (int)(y0 - sade)), by = Math.Min(H - 1, (int)(y0 + sade));
                for (int y = ay; y <= by; y++)
                    for (int x = ax; x <= bx; x++)
                    {
                        float d = Mathf.Sqrt((x - x0) * (x - x0) + (y - y0) * (y - y0)) / sade;
                        if (d >= 1) continue;
                        float w = rengas ? Mathf.Exp(-(d - 0.85f) * (d - 0.85f) / 0.004f) : Mathf.SmoothStep(1f, 0f, d) * (0.6f + 0.4f * d);
                        if (rengas == false && sade > 0.2f * H) w = Mathf.Exp(-d * 6f) + 0.25f * Mathf.Exp(-d * 2f) * (1 - d);
                        w *= teho * k * 255f;
                        int o = y * W + x; var c = px[o];
                        px[o] = new Color32((byte)Math.Min(255, c.r + vari.r * w), (byte)Math.Min(255, c.g + vari.g * w), (byte)Math.Min(255, c.b + vari.b * w), 255);
                    }
            }
            // hehku (bloom) auringon ympärille: lämmin, laaja
            Lisaa(sx, sy, 0.45f * H, new Color(1f, 0.72f, 0.42f), 0.55f, false);
            // heijastusläiskät akselilla aurinko → keskipiste → vastapuoli (f = 0 aurinko, 1 keskipiste)
            (float f, float r, Color c, float t, bool rg)[] haamut =
            {
                (0.45f, 0.016f, new Color(1f, 0.75f, 0.4f), 0.22f, false), (0.8f, 0.045f, new Color(0.45f, 0.85f, 0.75f), 0.07f, false),
                (1.25f, 0.026f, new Color(0.75f, 0.5f, 1f), 0.12f, false), (1.55f, 0.085f, new Color(0.5f, 0.9f, 0.6f), 0.06f, true),
                (1.9f, 0.02f, new Color(1f, 0.6f, 0.3f), 0.16f, false), (2.2f, 0.05f, new Color(0.6f, 0.75f, 1f), 0.05f, false),
            };
            foreach (var hm in haamut) Lisaa(sx + (cx - sx) * hm.f, sy + (cy - sy) * hm.f, hm.r * H, hm.c, hm.t, hm.rg);
        }

        /// <summary>Auringon atsimuutti (pohjoisesta myötäpäivään) ja korkeus (astetta) pisteessä hetkellä utc.</summary>
        static (double az, double korkeus) AurinkoPisteessa(DateTime utc, double lat, double lon)
        {
            Matkakirja.Linssit.Iss.Aurinko.Alihajapiste(Aika.Jd(utc), out double sla, out double slo);
            double f1 = lat * Math.PI / 180, f2 = sla * Math.PI / 180, dl = (slo - lon) * Math.PI / 180;
            double kulma = Math.Acos(Math.Max(-1, Math.Min(1, Math.Sin(f1) * Math.Sin(f2) + Math.Cos(f1) * Math.Cos(f2) * Math.Cos(dl))));
            double az = Math.Atan2(Math.Sin(dl) * Math.Cos(f2), Math.Cos(f1) * Math.Sin(f2) - Math.Sin(f1) * Math.Cos(f2) * Math.Cos(dl));
            return ((az * 180 / Math.PI + 360) % 360, 90 - kulma * 180 / Math.PI);
        }

        /// <summary>Odota, kunnes kamera ei enää liiku (4 peräkkäistä ruutua alle 1 m ja 0,01°), enintään 3 s.</summary>
        IEnumerator KameraAsettuu(Camera kamera)
        {
            // Manaus 2504ef45: kahden ruudun jälkeen kamera oli vielä matkalla → suunnitelma ei kattanut vasenta alakulmaa.
            Vector3 ep = kamera.transform.position; Quaternion eq = kamera.transform.rotation; int vakaat = 0;
            for (float alku = Time.realtimeSinceStartup; Time.realtimeSinceStartup - alku < 3f && vakaat < 4;)
            {
                yield return null;
                var tp = kamera.transform.position; var tq = kamera.transform.rotation;
                vakaat = (tp - ep).sqrMagnitude < 1f && Quaternion.Angle(tq, eq) < 0.01f ? vakaat + 1 : 0;
                ep = tp; eq = tq;
            }
            Loki($"kamera asettui ({(vakaat >= 4 ? "vakaa" : "aikaraja")})");
        }

        /// <summary>
        /// Julisteen nimi kuvan päälle (E v3 "HELSINKI · SUOMENLAHTI"): kaupunki ja lähin nimetty merialue ≤ 40 km, muuten
        /// kaupunki ja maa; merellä pelkkä meri.
        /// </summary>
        static string JulisteenNimi(double lat, double lon, string paikka = null)
        {
            var a = IssSijainti.Nykyinen;
            var (k, maa) = IssSijainti.Nimet(a, lat, lon);
            if (!string.IsNullOrEmpty(paikka)) k = paikka;
            if (string.IsNullOrEmpty(maa)) return k;   // merellä
            for (int r = 0; r <= 40; r += 10)
                for (int i = 0; i < (r == 0 ? 1 : 12); i++)
                {
                    IssKuvakulma.Kohde(lat, lon, i * 30, r / 111.2, out double mla, out double mlo, out _);
                    var m = IssSijainti.Merialue(a, mla, mlo);
                    if (!string.IsNullOrEmpty(m)) return $"{k} · {m}";
                }
            return k == maa ? k : $"{k} · {maa}";
        }

        static string Ryhmin(double x) => Math.Round(x).ToString("#,0", System.Globalization.CultureInfo.InvariantCulture).Replace(",", " ");

        /// <summary>
        /// Julisteen tekninen rivi (E v3): "21.6.2026 · 17.01 UTC · korkeus 420 km · nopeus 27 566 km/h · etäisyys 1 001 km · 47 mm ·
        /// f/4 · 1/800 s · ISO 100 · aurinko 16° horisontin yllä". Etäisyys kamerasta kohteeseen; valotus Valotus.cs:n mallista.
        /// </summary>
        static string TekninenRivi(DateTime utc, double mm, double etaisyysKm, double aurinko)
        {
            double km = IssNyt.KorkeusKm(utc);
            var (aukko, aika, iso) = Valotus.Laske(mm, etaisyysKm, aurinko, Matkakirja.Linssit.Kyytipino.Valotus - 0.5f);
            string a = aurinko >= 0 ? $"aurinko {Math.Round(aurinko):0}° horisontin yllä" : $"aurinko {Math.Round(-aurinko):0}° horisontin alla";
            return $"{utc.Day}.{utc.Month}.{utc.Year} · {utc.Hour}.{utc.Minute:00} UTC · korkeus {km:0} km · nopeus {Ryhmin(IssNyt.NopeusKmh(km))} km/h · "
                + $"etäisyys {Ryhmin(etaisyysKm)} km · {mm:0} mm · {Valotus.AukkoTeksti(aukko)} · {Valotus.AikaTeksti(aika)} · ISO {iso} · {a}";
        }

        static string TekninenRivi(DateTime utc, KuvaKamera kk, double lat, double lon, double aurinko)
        {
            double pysty = kk.Leveys >= kk.Korkeus ? 24 : 24.0 * kk.Korkeus / kk.Leveys;
            double mm = pysty / 2 / Math.Tan(kk.PystykenttaAst * Math.PI / 360);
            var kp = Kuvasuunnitelma.Ecef(lat, lon);
            double etaisyys = Math.Sqrt(Math.Pow(kk.Paikka.x - kp.x, 2) + Math.Pow(kk.Paikka.y - kp.y, 2) + Math.Pow(kk.Paikka.z - kp.z, 2)) / 1000;
            return TekninenRivi(utc, mm, etaisyys, aurinko);
        }

        /// <summary>Julisteen datalähde (E v3): "Datalähde: Copernicus Sentinel-2, 10 m · Contains modified Copernicus Sentinel data 2025".</summary>
        static string DatalahdeRivi(int? vuosi, bool gibs) =>
            "Datalähde: Copernicus Sentinel-2, 10 m · Contains modified Copernicus Sentinel data" + (vuosi.HasValue ? " " + vuosi.Value : "")
            + (gibs ? " · pilvet " + GibsPilvet.Merkinta : "");

        /// <summary>Julisteen tekstikentät kuvaushetken arvoista (Päätoimittaja 1.10.: paikka, koordinaatit, aika, korkeus, …, lähde).</summary>
        static string Tiedot(string id, DateTime utc, KuvaKamera kk, List<Nayte> naytteet, string muoto, double az, double korkeus,
            List<S2Ruutu> ruudut, List<S2IndeksiRuutu> ehdokkaat, long tavut, string lahde = "Contains modified Copernicus Sentinel data", string pilvet = null)
        {
            // Kameran paikka (kuvauskulma voi poiketa todellisesta radasta, laitekoe 2: JSONissa oli todellinen paikka).
            var (iLat, iLon) = Kuvasuunnitelma.Geodeettinen(kk.Paikka); var pinta = Kuvasuunnitelma.Ecef(iLat, iLon);
            double km = Math.Sqrt(Math.Pow(kk.Paikka.x - pinta.x, 2) + Math.Pow(kk.Paikka.y - pinta.y, 2) + Math.Pow(kk.Paikka.z - pinta.z, 2)) / 1000;
            var iss = (Lat: iLat, Lon: iLon);
            var keski = naytteet.OrderBy(n => Math.Abs(n.Sx - 24) + Math.Abs(n.Sy - 18)).First();
            // Polttoväli kinokoossa: kennon lyhyt sivu 24 mm; pystykuvassa pystysivu 24 · H / W (4:5 → 30 mm).
            double pysty = kk.Leveys >= kk.Korkeus ? 24 : 24.0 * kk.Korkeus / kk.Leveys;
            double mm = pysty / 2 / Math.Tan(kk.PystykenttaAst * Math.PI / 360);
            var kp = Kuvasuunnitelma.Ecef(keski.Lat, keski.Lon);
            double etaisyys = Math.Sqrt(Math.Pow(kk.Paikka.x - kp.x, 2) + Math.Pow(kk.Paikka.y - kp.y, 2) + Math.Pow(kk.Paikka.z - kp.z, 2)) / 1000;
            // Valotus (omistaja 1.10.: julisteen "400 mm · f/8 · 1/1000 s · ISO 200"): malli Valotus.cs, pelaajan säätö kompensaationa.
            var (aukko, aika, iso) = Valotus.Laske(mm, etaisyys, korkeus, Matkakirja.Linssit.Kyytipino.Valotus - 0.5f);
            var ic = System.Globalization.CultureInfo.InvariantCulture;
            var kuvat = ruudut.Select(r => ehdokkaat.First(x => x.Tunnus == r.Tunnus).Valinnat[0]).Select(v => $"\"{v.Id}\"");
            return string.Format(ic, "{{\"id\":\"{0}\",\"aika_utc\":\"{1:yyyy-MM-ddTHH:mm:ssZ}\",\"muoto\":\"{2}\",\"leveys\":{14},\"korkeus\":{15}," +
                "\"iss\":{{\"lat\":{3:0.000},\"lon\":{4:0.000}}},\"korkeus_km\":{5:0.0},\"nopeus_kmh\":{6:0},\"etaisyys_km\":{16:0}," +
                "\"kohde\":{{\"lat\":{7:0.000},\"lon\":{8:0.000},\"x\":{17:0},\"y\":{18:0}}},\"polttovali\":{9:0},\"aukko\":\"{19}\",\"aika\":\"{20}\",\"iso\":{21}," +
                "\"aurinko_deg\":{11:0.0},\"aurinko_az\":{10:0},\"lahde\":\"{22}\",\"pilvet\":\"{23}\",\"s2\":[{12}],\"mt\":{13:0.0}}}",
                id, utc, muoto, iss.Lat, iss.Lon, km, IssNyt.NopeusKmh(km), keski.Lat, keski.Lon, mm, az, korkeus, string.Join(",", kuvat), tavut / 1e6,
                kk.Leveys, kk.Korkeus, etaisyys, kk.Leveys / 2.0, kk.Korkeus / 2.0, Valotus.AukkoTeksti(aukko), Valotus.AikaTeksti(aika), iso,
                lahde, pilvet ?? "");
        }
    }
}
