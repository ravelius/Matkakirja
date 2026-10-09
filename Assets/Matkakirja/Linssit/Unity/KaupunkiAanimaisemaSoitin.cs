// KAUPUNKIÄÄNIMAISEMAN SOITIN (Siirtoseppä 6.10.2026, pilotti Pariisi/Venetsia/Kööpenhamina; uudelleenkäytettävä myös linnassa):
// Ytimen KaupunkiAanimaisema (tasot, alipäästö, suhina, väistö) Unityn omilla AudioSourceilla, ei FMODia/Wwiseä.
//  - silmukat: SilmukanUrl(kerros) → ladataan välimuistiin (temporaryCachePath) ja soitetaan file://-suoratoistona (streamAudio),
//    joten muistiin ei pureta koko silmukkaa; lähde luodaan vasta, kun kerros nousee kuuluvaksi, ja vapautetaan hiljaa 5 s jälkeen.
//  - kaupunkikerroksilla AudioLowPassFilter (korkeus → humina); sade ja tuuli ilman suodinta.
//  - suhina: proseduraalinen kaistanpäästetty kohina (Ydin Kohina + Biquad) omassa lähteessä OnAudioFilterReadilla.
//  - kellot: tasatunnein TasatunninLyonnit, kirkkojen määrä äänikartasta (KirkkojaLahella), KelloUrl kertasoittona.
//  - puhe: Aanisoitin-tilan Voimassa < 1 (kertoja/Pulu) tai OpasSovitin.OpasAaniSoi (William, siltalause) → väistö; Äänimaisema-
//    kytkin ja testimykistys hiljentävät.
// Syötteet asetetaan ulkoa: Kamera (LS1: korkeus, nopeus, kohteen lat/lon), Aanikartta ja SilmukanUrl (Pelikoodari), Sade (COZY).
//  - lähikerrokset (9.10., Ydin KaupunkiMaisema): kehityskaupungeissa raitiovaunu, metro, tori, lapset, kahvila ja laituri
//    kaupunkimaisema-v1/-v2:sta tasolla Tausta × kerroin × paino × korkeus; Pariisin raitiovaunu kerta-ohiajona. Muualla ennallaan.
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Aanet;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class KaupunkiAanimaisemaSoitin : MonoBehaviour
    {
        public static Func<(double KorkeusM, double NopeusMs, double Lat, double Lon)?> Kamera;
        public static Func<double, double, IReadOnlyDictionary<string, double>> Aanikartta;
        public static Func<double, double, int> KirkkojaLahella;
        public static Func<string, string> SilmukanUrl;
        public static Func<double> Sade;
        public static string KelloUrl = Juuri + "aanimaisema-v2/kello-01.mp3";   // v2 8.10.: tuuli-01 vaihdettu (laaduntarkistus), muut kuten v1
        /// <summary>Kaupungin tunnus (LS1: oppaan kaupunki); äänikartta ladataan Juuri + "aanikartta-v1/&lt;id&gt;.json" (Pelikoodari).</summary>
        public static Func<string> KaupunkiId;
        public const string Juuri = "https://media.matkakirja.app/aanet/";
        AaniKartta kartta; string karttaId, karttaLadataan;
        public const float Taso = 0.55f, KelloTaso = 1f, VapautusS = 5f, LyontiS = 2.0f, LyontiHaivytysS = 0.35f;   // äänitteen 2. isku alkaa ~2,4 s   // kello: puheettomana +7–8 dB maiseman yli (Päätoimittaja 7.10.; 0,6 antoi mitaten +4–5 dB)

        static KaupunkiAanimaisemaSoitin instanssi;

        // OPPAAN KYTKENTÄ (LS1 73a0379f, kytkentä toisin päin: OpasSovitin ei tunne soitinta): vahti lukee joka kehys
        // OpasSovitin.KaupunkiNakyvissa (päälle/pois), KaupunkiKamera (korkeus, nopeus, kohde) ja OpasAaniSoi (Williamin väistö).
        // Ulkoa asetetut Kamera/KaupunkiId/Aanikartta voittavat (linna ja testit).
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Vahti() => DontDestroyOnLoad(new GameObject("Kaupunkiäänimaisema vahti").AddComponent<OppaanVahti>().gameObject);

        sealed class OppaanVahti : MonoBehaviour
        {
            void Update()
            {
                bool nakyy = OpasSovitin.KaupunkiNakyvissa;
                if (nakyy != (instanssi != null)) Kaytossa(nakyy);
            }
        }

        static (double KorkeusM, double NopeusMs, double Lat, double Lon)? OppaanKamera()
        {
            var k = OpasSovitin.KaupunkiKamera;
            return k.HasValue ? (k.Value.korkeusM, k.Value.nopeusMs, k.Value.lat, k.Value.lon) : ((double, double, double, double)?)null;
        }

        // NYKYINEN KAUPUNKI (LS1 7.10.: OpasSovitin.NykyinenKaupunkiId, juna 157 linssiseppa/sallitut-157): sallitun kaupungin tunnus
        // kameran paikasta (toive Pariisista Venetsiaan vaihtaa sen), muuten Aloituskaupungin tunnus. Luetaan heijastuksella, kunnes
        // LS1:n haara on samassa rungossa (ilman sitä Aloituskaupunki kuten ennen).
        static System.Reflection.MemberInfo nykyinenJasen; static bool nykyinenHaettu;
        static string NykyinenKaupunki()
        {
            if (!nykyinenHaettu)
            {
                nykyinenHaettu = true;
                const System.Reflection.BindingFlags Lipat = System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static;
                nykyinenJasen = (System.Reflection.MemberInfo)typeof(OpasSovitin).GetProperty("NykyinenKaupunkiId", Lipat) ?? typeof(OpasSovitin).GetField("NykyinenKaupunkiId", Lipat);
            }
            return nykyinenJasen switch
            {
                System.Reflection.PropertyInfo pi => pi.GetValue(null) as string,
                System.Reflection.FieldInfo fi => fi.GetValue(null) as string,
                _ => null,
            };
        }

        /// <summary>Kaupungin tunnus äänikartalle nimestä (Kööpenhamina → koopenhamina): pienet kirjaimet, ä/å → a, ö → o, välit → -.</summary>
        public static string Tunnus(string nimi)
        {
            if (string.IsNullOrEmpty(nimi)) return null;
            var sb = new System.Text.StringBuilder();
            foreach (char c0 in nimi.ToLowerInvariant())
            {
                char c = c0 == 'ä' || c0 == 'å' || c0 == 'á' || c0 == 'à' ? 'a' : c0 == 'ö' || c0 == 'ø' || c0 == 'ó' ? 'o' : c0 == 'é' || c0 == 'è' ? 'e' : c0;
                if (char.IsLetterOrDigit(c)) sb.Append(c); else if (c == ' ' || c == '-') sb.Append('-');
            }
            return sb.ToString();
        }
        readonly KaupunkiAanimaisema mikseri = new KaupunkiAanimaisema();
        readonly AudioSource[] lahteet = new AudioSource[KaupunkiAanimaisema.Kerrokset.Length];
        readonly float[] hiljaaAlkaen = new float[KaupunkiAanimaisema.Kerrokset.Length];
        // KAUPUNKIKOHTAISET SILMUKAT (Linssiseppä 8.10., pallo-aanimaisema-v1; PT: hiljennys kaupunginvaihdossa): ladatun lähteen osoite
        // kerroksittain; jos SilmukanUrl antaa kerrokselle toisen osoitteen (kehityskaupungista muuhun tai päinvastoin), lähde vapautetaan
        // ja oikea ladataan seuraavassa kehyksessä. Tarkistus kerran sekunnissa.
        readonly string[] lahdeUrl = new string[KaupunkiAanimaisema.Kerrokset.Length];
        float urlTarkistettu;
        string KerroksenUrl(string kerros)
        {
            if (Lahi && KaupunkiMaisema.On(kerros)) return maisema.Url(nykyId, kerros);
            // Uudet kerrokset vain kehityskaupungeissa (aanimaisema-v2:ssa ei niitä: ei hakuja olemattomiin).
            if (kerros == KaupunkiAanimaisema.Lapset || kerros == KaupunkiAanimaisema.Metro || kerros == KaupunkiAanimaisema.Laituri) return null;
            return SilmukanUrl != null ? SilmukanUrl(kerros) : Juuri + "aanimaisema-v2/" + kerros + "-01.mp3";
        }

        // LÄHIKERROKSET (Pelikoodari 9.10.): manifestit haetaan vasta kehityskaupungissa, kerran istunnossa (epäonnistunut 60 s päästä).
        public const string MaisemaV1 = Juuri + "kaupunkimaisema-v1/", MaisemaV2 = Juuri + "kaupunkimaisema-v2/";
        static KaupunkiMaisema maisema; static float maisemaYritys = -999f;
        string nykyId;
        bool Lahi => maisema != null && Matkakirja.Linssit.Kehityskaupungit.On(nykyId);
        readonly Dictionary<string, double> lahiPainot = new Dictionary<string, double>();
        Func<string, bool> onSilmukka;

        static IEnumerator HaeMaisema()
        {
            maisemaYritys = Time.unscaledTime;
            using var r1 = UnityWebRequest.Get(MaisemaV1 + "manifest.json"); r1.timeout = 20;
            yield return r1.SendWebRequest();
            using var r2 = UnityWebRequest.Get(MaisemaV2 + "manifest.json"); r2.timeout = 20;
            yield return r2.SendWebRequest();
            if (r1.result != UnityWebRequest.Result.Success || r2.result != UnityWebRequest.Result.Success)
            { Debug.Log($"MATKAKIRJA äänimaisema: kaupunkimaisema ei latautunut ({r1.responseCode}/{r2.responseCode})"); yield break; }
            try { maisema = KaupunkiMaisema.Lue(r1.downloadHandler.text, MaisemaV1, r2.downloadHandler.text, MaisemaV2); Debug.Log("MATKAKIRJA äänimaisema: kaupunkimaisema v1+v2 ladattu"); }
            catch (Exception e) { Debug.Log("MATKAKIRJA äänimaisema: kaupunkimaisema virheellinen: " + e.Message); }
        }

        // PARIISIN RAITIOVAUNU (v2, kerta-ohiajo 36 s): kun raitiovaunun paino > 0, ohiajo 1–3 min välein (PalloAanimaisema.Vali);
        // taso (kerroin × paino × korkeus × vuorokausi × väistö × Tausta) seuraa soinnin ajan.
        AudioSource kertaLahde; AudioClip kertaKlippi; string kertaUrl; bool kertaLadataan; double kertaSeuraava = -1;
        readonly System.Random kertaRnd = new System.Random(20261009);

        void Kerta(double tunti, double korkeusM, float tausta, bool soi)
        {
            const string R = KaupunkiAanimaisema.Raitiovaunu;
            var a = Lahi ? maisema.KertaAani(nykyId, R) : null;
            double paino = a != null ? KaupunkiMaisema.Paino(R, painot, tunti, korkeusM) * KaupunkiAanimaisema.Vuorokausi(R, tunti) : 0;
            float taso = (float)(paino * mikseri.Kokonais) * tausta;
            if (kertaLahde != null && kertaLahde.isPlaying) kertaLahde.volume = taso;
            if (a == null || paino <= 0 || !soi) { kertaSeuraava = -1; return; }
            if (kertaUrl != a.Osoite) { kertaUrl = a.Osoite; kertaKlippi = null; }
            if (kertaKlippi == null)
            {
                if (kertaLadataan || (epaonnistunut.TryGetValue(kertaUrl, out float milloin) && Time.unscaledTime - milloin < UusintaS)) return;
                kertaLadataan = true; string u = kertaUrl;
                StartCoroutine(Lataa(u, c => { kertaLadataan = false; if (c == null) epaonnistunut[u] = Time.unscaledTime; else if (u == kertaUrl) kertaKlippi = c; }));
                return;
            }
            double nyt = Time.unscaledTimeAsDouble;
            if (kertaSeuraava < 0) { kertaSeuraava = nyt + PalloAanimaisema.Vali(a.Tunnus, kertaRnd) * 0.5; return; }
            if (nyt < kertaSeuraava || (kertaLahde != null && kertaLahde.isPlaying)) return;
            kertaSeuraava = nyt + PalloAanimaisema.Vali(a.Tunnus, kertaRnd);
            if (kertaLahde == null) { kertaLahde = gameObject.AddComponent<AudioSource>(); kertaLahde.playOnAwake = false; kertaLahde.spatialBlend = 0; kertaLahde.loop = false; }
            kertaLahde.clip = kertaKlippi; kertaLahde.volume = taso; kertaLahde.Play();
            Debug.Log($"MATKAKIRJA äänimaisema: raitiovaunu ohi ({nykyId}, {taso:F2})");
        }
        readonly HashSet<string> ladataan = new HashSet<string>();
        IReadOnlyDictionary<string, double> painot;
        double karttaLat = double.NaN, karttaLon = double.NaN;
        int edellinenTunti = -1;
        Suhina suhina;
        AudioClip kello;
        (double KorkeusM, double NopeusMs, double Lat, double Lon)? viimeK;
        const double SiirtymaNopeusMs = 250, LentoKorkeusM = 1500;

        /// <summary>Käynnistä (oppaan avaus) tai lopeta (sulku). Tila ja lähteet nollautuvat.</summary>
        public static void Kaytossa(bool paalla)
        {
            if (paalla && instanssi == null)
            {
                instanssi = new GameObject("Kaupunkiäänimaisema").AddComponent<KaupunkiAanimaisemaSoitin>();
                DontDestroyOnLoad(instanssi.gameObject);
                Debug.Log("MATKAKIRJA äänimaisema: päällä");
            }
            else if (!paalla && instanssi != null) { Destroy(instanssi.gameObject); instanssi = null; Debug.Log("MATKAKIRJA äänimaisema: pois"); }
        }

        void Awake()
        {
            var sg = new GameObject("suhina"); sg.transform.SetParent(transform, false);
            var sl = sg.AddComponent<AudioSource>(); sl.playOnAwake = false; sl.spatialBlend = 0; sl.loop = true;
            sl.clip = AudioClip.Create("suhina", 1, 1, AudioSettings.outputSampleRate, false); sl.Play();
            suhina = sg.AddComponent<Suhina>();
            onSilmukka = k => !string.IsNullOrEmpty(KerroksenUrl(k));
            if (!string.IsNullOrEmpty(KelloUrl)) StartCoroutine(Lataa(KelloUrl, c => kello = c));
        }

        void Update()
        {
            var k = Kamera != null ? Kamera() : OppaanKamera();
            // OPPAAN SIIRTYMÄ (simu 7.10. 04.29: lennoilla −90 dB, lähteet vapautuivat): silta antaa siirtymän ajan null-kameran, joten
            // pidetään viimeinen paikka ja korkeus ja annetaan siirtymänopeus → kerrokset hiljenevät mikserin nopeussäännöllä ja suhina soi.
            // Päätoimittaja 7.10. 04.4x: lennoilla ei koskaan täyttä hiljaisuutta; lähtöpaikan maisema jatkuu ja liukuu (mikserin 2,5 s
            // liuku) kohteen maisemaan, kun kamera palaa. Ensimmäisellä lennolla (ei lähtöpaikkaa) tuuli ja suhina lentokorkeudelta.
            if (k.HasValue) viimeK = k;
            else if (Kamera == null && OpasSovitin.KaupunkiNakyvissa)
                k = viimeK.HasValue ? (viimeK.Value.KorkeusM, SiirtymaNopeusMs, viimeK.Value.Lat, viimeK.Value.Lon) : (LentoKorkeusM, SiirtymaNopeusMs, double.NaN, double.NaN);
            if (Time.unscaledTime - urlTarkistettu > 1f)
            {
                urlTarkistettu = Time.unscaledTime;
                for (int i = 0; i < lahteet.Length; i++)
                    if (lahteet[i] != null && lahdeUrl[i] != null && lahdeUrl[i] != KerroksenUrl(KaupunkiAanimaisema.Kerrokset[i]))
                    { Debug.Log($"MATKAKIRJA äänimaisema: {KaupunkiAanimaisema.Kerrokset[i]} vaihtuu kaupungin mukana ({lahdeUrl[i]})"); Vapauta(i); lahdeUrl[i] = null; }
            }
            bool eiPaikkaa = k.HasValue && double.IsNaN(k.Value.Lat);   // ensimmäinen lento: vain tuuli ja suhina, ei kartan reunan ääniä
            if (eiPaikkaa) { painot = null; karttaLat = double.NaN; }
            string nyk = KaupunkiId == null ? NykyinenKaupunki() : null;
            string id = KaupunkiId != null ? KaupunkiId() : !string.IsNullOrEmpty(nyk) ? nyk : Tunnus(OpasSovitin.Aloituskaupunki);
            if (!string.IsNullOrEmpty(id) && id != karttaId && id != karttaLadataan) StartCoroutine(LataaKartta(id));
            nykyId = id;
            if (maisema == null && Matkakirja.Linssit.Kehityskaupungit.On(id) && Time.unscaledTime - maisemaYritys > 60f) StartCoroutine(HaeMaisema());
            var tila = Aanisoitin.Instanssi?.Tila;
            bool paalla = (tila?.Aanimaisema ?? Asetukset.Paalla(Kytkin.Aanimaisema)) && !(TestiMykistys.Paalla && !AaniKaappaus.Kaynnissa);
            if (k.HasValue && !eiPaikkaa && (double.IsNaN(karttaLat) || Etaisyys(k.Value.Lat, k.Value.Lon, karttaLat, karttaLon) > 80))
            {
                karttaLat = k.Value.Lat; karttaLon = k.Value.Lon;
                painot = Aanikartta != null ? Aanikartta(karttaLat, karttaLon) : kartta?.Painot(karttaLat, karttaLon);
            }
            double tunti = k.HasValue && !eiPaikkaa ? Matkakirja.Linssit.Kierros.KaupunkiValo.PaikallinenTunti(DateTime.UtcNow, k.Value.Lon)
                : edellinenTunti >= 0 ? edellinenTunti + 0.5 : 12;   // lennolla ilman paikkaa ei tuntia eikä lyöntejä
            bool lahi = Lahi;
            double korkeus = k?.KorkeusM ?? 100;
            mikseri.Paivita(new KaupunkiAanimaisema.Syote
            {
                Painot = lahi ? KaupunkiMaisema.Painot(painot, tunti, korkeus, onSilmukka, lahiPainot) : painot, Lahiaanet = lahi, KorkeusM = k?.KorkeusM ?? 100, NopeusMs = k?.NopeusMs ?? 0, Tunti = tunti,
                Sade = Sade?.Invoke() ?? 0, Puhe = (tila != null && tila.Voimassa < 0.999) || OpasSovitin.OpasAaniSoi, Paalla = paalla && k.HasValue,
            }, Time.unscaledDeltaTime);
            float kokonais = (float)mikseri.Kokonais * Taso;
            // ☰-mikseri (Natiivi-UI 8.10.): sade ja tuuli "Sää"-tasolla (Voima.Saa), muu äänimaisema "Äänimaisema"-tasolla (Voima.Tausta).
            float saa = Asetukset.Taso(Voima.Saa), tausta = Asetukset.Taso(Voima.Tausta);
            for (int i = 0; i < lahteet.Length; i++)
            {
                string kerros = KaupunkiAanimaisema.Kerrokset[i];
                // Lähikerrokset: Tausta × kerroin (painossa) ilman maiseman Taso-kerrointa (äänisuunnittelijan tasot).
                float t = (float)mikseri.Tasot[i] * (lahi && KaupunkiMaisema.On(kerros) ? (float)mikseri.Kokonais : kokonais) * (kerros == KaupunkiAanimaisema.Sade || kerros == KaupunkiAanimaisema.Tuuli ? saa : tausta);
                var l = lahteet[i];
                if (t > 0.001f && l == null) { Avaa(i); continue; }
                if (l == null) continue;
                Silmukka(i, t);
                Alipaasto(lahteet[i]); Alipaasto(varat[i]);
                if (t <= 0.001f) { if (hiljaaAlkaen[i] <= 0) hiljaaAlkaen[i] = Time.unscaledTime; else if (Time.unscaledTime - hiljaaAlkaen[i] > VapautusS) Vapauta(i); }
                else hiljaaAlkaen[i] = 0;
            }
            suhina.Taso = (float)(mikseri.Suhina * mikseri.Kokonais);
            Kerta(tunti, korkeus, tausta, paalla && k.HasValue && !eiPaikkaa);
            for (int ki = kellot.Count - 1; ki >= 0; ki--)
            {
                var kl = kellot[ki].Lahde;
                if (kl == null) { kellot.RemoveAt(ki); continue; }
                // YKSI LYÖNTI (TF 162, omistaja 7.10.: "kirkon kello kumisee lakkaamatta"): kello-01.mp3 on 34 s:n äänite noin
                // 12 lyönnistä 2,3 s:n välein, ja jokainen lyönti soitti sen kokonaan (7 lyöntiä × 3 kirkkoa = 21 päällekkäistä).
                // Lyönnistä soitetaan vain ensimmäinen isku: LyontiS, sitten häivytys HaivytysS ja lähde pois.
                float f = Mathf.Clamp01(1f - (kl.time - LyontiS) / LyontiHaivytysS);
                if (f <= 0f || !kl.isPlaying) { Destroy(kl); kellot.RemoveAt(ki); continue; }
                kl.volume = kellot[ki].Perus * (float)mikseri.Kokonais * f;   // väistö, ei maiseman Taso-kerrointa (simu 7.10.: vain +3 dB)
            }
            // Tasatunti: lyönnit hajautettuina kirkoittain (vain kun maisema kuuluu).
            int h = (int)Math.Floor(tunti);
            if (edellinenTunti >= 0 && h != edellinenTunti && kello != null && paalla && k.HasValue)
            {
                int kirkkoja = KirkkojaLahella?.Invoke(k.Value.Lat, k.Value.Lon) ?? kartta?.KirkkojaLahella(k.Value.Lat, k.Value.Lon) ?? 0;
                foreach (var (viive, kirkko) in KaupunkiAanimaisema.TasatunninLyonnit(h, Math.Min(kirkkoja, 3), (int)(karttaLat * 1000)))
                    StartCoroutine(Lyo(viive, KelloTaso * (kirkko == 0 ? 1f : 0.6f)));
            }
            edellinenTunti = h;
        }

        // AINEISTOINDEKSI (Pelikoodari 6.10.: ämpäri ja CDN välimuistittavat 404:n): kartta haetaan vain, jos id on Pöllön
        // /opas/aineistot-listalla {"aanikartta":[…]}. Indeksi kerran istunnossa; epäonnistunut haku yritetään uudelleen 60 s päästä.
        static HashSet<string> karttaIndeksi;
        static float indeksiYritys = -999f;

        IEnumerator LataaKartta(string id)
        {
            karttaLadataan = id;
            if (karttaIndeksi == null)
            {
                if (Time.unscaledTime - indeksiYritys < 60f) { karttaLadataan = null; yield break; }
                indeksiYritys = Time.unscaledTime;
                using var ir = UnityWebRequest.Get(Matkakirja.Peli.Lukijaaani.Palvelin + "/opas/aineistot");
                ir.timeout = 10;
                // Natiivin otsakkeet kuten CesiumKaupunki.HaeTunnus (simu 7.10. 03.05: ilman testitunnusta 403 → ei karttaa).
                ir.SetRequestHeader("x-matkakirja-natiivi", Application.identifier);
                Matkakirja.Natiivi.PolloTestitunnus.Lisaa(ir);
                ir.SetRequestHeader("User-Agent", "Matkakirja/" + Application.version + " (" + Application.identifier + ")");
                yield return ir.SendWebRequest();
                if (ir.result == UnityWebRequest.Result.Success && Matkakirja.Peli.MiniJson.Jasenna(ir.downloadHandler.text) is Dictionary<string, object> io)
                {
                    karttaIndeksi = new HashSet<string>();
                    foreach (var x in Matkakirja.Peli.MiniJson.TaulukkoTaiTyhja(Matkakirja.Peli.MiniJson.Kentta(io, "aanikartta"))) if (x is string sx) karttaIndeksi.Add(sx);
                    Debug.Log($"MATKAKIRJA äänimaisema: aineistoindeksi {karttaIndeksi.Count} äänikarttaa");
                }
                else { Debug.Log($"MATKAKIRJA äänimaisema: aineistoindeksi ei saatavilla ({ir.error})"); karttaLadataan = null; yield break; }
            }
            if (!karttaIndeksi.Contains(id)) { karttaId = id; karttaLadataan = null; Debug.Log($"MATKAKIRJA äänimaisema: ei äänikarttaa kaupungille {id}"); yield break; }
            using var r = UnityWebRequest.Get(Juuri + "aanikartta-v1/" + id + ".json");
            yield return r.SendWebRequest();
            karttaLadataan = null;
            if (r.result != UnityWebRequest.Result.Success) { Debug.Log($"MATKAKIRJA äänimaisema: äänikartta {id}: {r.error}"); karttaId = id; yield break; }
            try { kartta = AaniKartta.Lue(r.downloadHandler.text); karttaId = id; karttaLat = double.NaN; Debug.Log($"MATKAKIRJA äänimaisema: äänikartta {id} {kartta.Rivit}×{kartta.Sarakkeet}, {kartta.Ruudut.Count} kerrosta, {kartta.Kirkot.Count} kirkkoa"); }
            catch (Exception e) { Debug.Log($"MATKAKIRJA äänimaisema: äänikartta {id} virheellinen: {e.Message}"); karttaId = id; }
        }

        /// <summary>Testi (linssi-komento "aanimaisema kello [n]"): tasatunnin lyönnit heti (todennus ilman tunnin odotusta).</summary>
        public static string TestiKello(int lyonteja)
        {
            var s = instanssi;
            if (s == null || s.kello == null) return "äänimaisema: kello ei käytettävissä (" + (s == null ? "ei päällä" : "klippi puuttuu") + ")";
            float kokonais = (float)s.mikseri.Kokonais * Taso;
            foreach (var (viive, kirkko) in KaupunkiAanimaisema.TasatunninLyonnit(lyonteja, 2, 1))
                s.StartCoroutine(s.Lyo(viive, KelloTaso * (kirkko == 0 ? 1f : 0.6f)));
            return $"äänimaisema: kello {lyonteja} lyöntiä (taso {KelloTaso * s.mikseri.Kokonais:F2})";
        }

        // KELLO VÄISTÄÄ PUHETTA (Päätoimittaja 7.10.): lyönnin taso seuraa maiseman kokonaistasoa (väistö −9 dB) koko soinnin ajan,
        // ei vain lyöntihetkellä, joten oppaan puheen alkaessa soiva lyönti ei peitä kertojaa.
        readonly List<(AudioSource Lahde, float Perus)> kellot = new List<(AudioSource, float)>();
        IEnumerator Lyo(double viive, float perus)
        {
            yield return new WaitForSecondsRealtime((float)viive);
            if (kello == null) yield break;
            var l = gameObject.AddComponent<AudioSource>(); l.spatialBlend = 0; l.clip = kello; l.loop = false;
            l.volume = perus * (float)mikseri.Kokonais; l.Play();
            kellot.Add((l, perus));
            Destroy(l, Mathf.Min(kello.length, LyontiS + LyontiHaivytysS) + 0.5f);   // varmistus: yksi isku
        }

        void Avaa(int i)
        {
            string kerros = KaupunkiAanimaisema.Kerrokset[i];
            // Oletus: Pelikoodarin nimeäminen aanimaisema-v2/<kerros>-01.mp3 (aanimaisema.json korvaa, kun se on).
            string url = KerroksenUrl(kerros);
            if (string.IsNullOrEmpty(url) || ladataan.Contains(kerros)) return;
            // Puuttuva silmukka (404, esim. tuuli ennen Pelikoodarin vientiä) yritetään uudelleen vasta UusintaS:n päästä (simu 7.10.: 1 209 hakua).
            if (epaonnistunut.TryGetValue(url, out float milloin) && Time.unscaledTime - milloin < UusintaS) return;
            ladataan.Add(kerros);
            StartCoroutine(Lataa(url, c =>
            {
                ladataan.Remove(kerros);
                if (c == null) epaonnistunut[url] = Time.unscaledTime; else epaonnistunut.Remove(url);
                if (c == null || this == null || lahteet[i] != null) return;
                var g = new GameObject(kerros); g.transform.SetParent(transform, false);
                var l = g.AddComponent<AudioSource>(); l.clip = c; l.loop = true; l.spatialBlend = 0; l.volume = 0; l.playOnAwake = false;
                // Satunnainen alkukohta: samat silmukat eivät ala samasta tahdista joka kohteessa.
                if (c.length > 1) l.time = UnityEngine.Random.Range(0f, c.length * 0.9f);
                if (kerros != KaupunkiAanimaisema.Sade && kerros != KaupunkiAanimaisema.Tuuli) g.AddComponent<AudioLowPassFilter>().cutoffFrequency = 22000;
                l.Play();
                lahteet[i] = l; hiljaaAlkaen[i] = 0; lahdeUrl[i] = url;
                AvaaVara(i, url);
                Debug.Log($"MATKAKIRJA äänimaisema: {kerros} soi ({c.length:F0} s)");
            }));
        }

        static readonly Dictionary<string, float> epaonnistunut = new Dictionary<string, float>();
        const float UusintaS = 300f;

        // SILMUKAN RISTIHÄIVYTYS (Päätoimittaja 7.10. 04.4x): mp3:n kooderiviive ja täyte (~44 ms) jäisivät silmukan saumaan, ja
        // suoratoistetun mp3:n pituus on arvio (loki 91 s, todellinen 90,04 s). Siksi toinen lähde (oma klippi samasta välimuistitiedostosta)
        // alkaa XfAlkuS ennen arvioitua loppua kohdasta PadS (viiveen yli) ja ristihäivyttää tasatehoisesti XfS:ssä; sitten vaihto.
        // Jos toinen klippi ei ole vielä valmis, ensimmäinen silmukoi itse (loop = true) kuten ennen.
        readonly AudioSource[] varat = new AudioSource[KaupunkiAanimaisema.Kerrokset.Length];
        readonly float[] xfAlku = new float[KaupunkiAanimaisema.Kerrokset.Length];
        const float XfS = 1.2f, XfAlkuS = 2.5f, PadS = 0.06f;

        void Silmukka(int i, float taso)
        {
            var a = lahteet[i]; var b = varat[i];
            if (b == null || a.clip == null || a.clip.length < 3 * XfAlkuS) { a.volume = taso; return; }
            if (!b.isPlaying && a.isPlaying && a.clip.length - a.time <= XfAlkuS) { b.time = PadS; b.Play(); xfAlku[i] = Time.unscaledTime; }
            if (!b.isPlaying) { a.volume = taso; return; }
            float u = Mathf.Clamp01((Time.unscaledTime - xfAlku[i]) / XfS);
            a.volume = taso * Mathf.Cos(u * Mathf.PI * 0.5f); b.volume = taso * Mathf.Sin(u * Mathf.PI * 0.5f);
            if (u >= 1f) { a.Stop(); a.volume = 0; lahteet[i] = b; varat[i] = a; }
        }

        void Alipaasto(AudioSource l) { if (l != null && l.TryGetComponent<AudioLowPassFilter>(out var f)) f.cutoffFrequency = (float)mikseri.Alipaasto; }

        void AvaaVara(int i, string url)
        {
            StartCoroutine(Lataa(url, c =>
            {
                if (c == null || this == null || lahteet[i] == null || varat[i] != null) { if (c != null) Destroy(c); return; }
                string kerros = KaupunkiAanimaisema.Kerrokset[i];
                var g = new GameObject(kerros + " (vara)"); g.transform.SetParent(transform, false);
                var l = g.AddComponent<AudioSource>(); l.clip = c; l.loop = true; l.spatialBlend = 0; l.volume = 0; l.playOnAwake = false;
                if (kerros != KaupunkiAanimaisema.Sade && kerros != KaupunkiAanimaisema.Tuuli) g.AddComponent<AudioLowPassFilter>().cutoffFrequency = 22000;
                varat[i] = l;
            }));
        }

        void Vapauta(int i)
        {
            if (varat[i] != null) { var vc = varat[i].clip; Destroy(varat[i].gameObject); varat[i] = null; if (vc != null) Destroy(vc); }
            var c = lahteet[i].clip;
            Destroy(lahteet[i].gameObject); lahteet[i] = null; hiljaaAlkaen[i] = 0;
            if (c != null) Destroy(c);
        }

        /// <summary>Silmukka välimuistiin (ensimmäinen kerta) ja file://-suoratoistona soittoon (ei koko PCM:ää muistiin).</summary>
        static IEnumerator Lataa(string url, Action<AudioClip> valmis)
        {
            string tiedosto = Path.Combine(Application.temporaryCachePath, "aanimaisema", Hash(url) + Path.GetExtension(new Uri(url).AbsolutePath));
            if (!File.Exists(tiedosto))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(tiedosto));
                using var r = UnityWebRequest.Get(url);
                r.downloadHandler = new DownloadHandlerFile(tiedosto) { removeFileOnAbort = true };
                yield return r.SendWebRequest();
                if (r.result != UnityWebRequest.Result.Success) { Debug.Log($"MATKAKIRJA äänimaisema: lataus epäonnistui {url}: {r.error}"); valmis(null); yield break; }
            }
            var tyyppi = tiedosto.EndsWith(".wav", StringComparison.OrdinalIgnoreCase) ? AudioType.WAV : AudioType.MPEG;
            using var a = UnityWebRequestMultimedia.GetAudioClip("file://" + tiedosto, tyyppi);
            ((DownloadHandlerAudioClip)a.downloadHandler).streamAudio = true;
            yield return a.SendWebRequest();
            valmis(a.result == UnityWebRequest.Result.Success ? DownloadHandlerAudioClip.GetContent(a) : null);
        }

        static string Hash(string s) { unchecked { ulong h = 1469598103934665603; foreach (char c in s) { h ^= c; h *= 1099511628211; } return h.ToString("x16"); } }

        static double Etaisyys(double lat1, double lon1, double lat2, double lon2)
        {
            double r = Math.PI / 180, x = (lon2 - lon1) * r * Math.Cos((lat1 + lat2) * 0.5 * r), y = (lat2 - lat1) * r;
            return Math.Sqrt(x * x + y * y) * 6371000;
        }

        /// <summary>Proseduraalinen suhina: kaistanpäästetty kohina (~600 Hz–2,5 kHz), taso liukuu pehmeästi audiosäikeessä.</summary>
        sealed class Suhina : MonoBehaviour
        {
            public volatile float Taso;
            Kohina kohina = new Kohina(0x51A7u);
            Biquad ali, yli;
            float nyt;
            int taajuus;

            void Awake()
            {
                taajuus = AudioSettings.outputSampleRate;
                ali.Aseta(Suodin.Alipaasto, 2500, 0.7, taajuus);
                yli.Aseta(Suodin.Ylipaasto, 600, 0.7, taajuus);
            }

            void OnAudioFilterRead(float[] data, int kanavia)
            {
                float tavoite = Taso, k = 1f / (taajuus * 0.15f);
                for (int i = 0; i < data.Length; i += kanavia)
                {
                    nyt += (tavoite - nyt) * k;
                    float x = yli.Suodata(ali.Suodata(kohina.Seuraava())) * nyt * 0.5f;
                    for (int c = 0; c < kanavia; c++) data[i + c] = x;
                }
            }
        }
    }
}
