using System;
using System.Collections;
using System.Collections.Generic;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.EnhancedTouch;
using Kosketus = UnityEngine.InputSystem.EnhancedTouch.Touch;

namespace Matkakirja
{
    /// <summary>
    /// LENTOPELI VAIHE 1 — PELATTAVA PROTO (Linssiseppä 1.10.2026; omistaja "tee lentopeli", suunnitelma
    /// docs/raportit/lentopeli-suunnitelma-20260927.md). Pelaaja lentää lento v3:n Tiger Mothia itse rengasradalla:
    ///   - Ydin on puhdas C# (<see cref="Lentopeli"/>: lentomalli, polttoaine, rengasrata, autopilotti, testit Kartta-testeissä).
    ///   - Kone ja materiaalit ovat lento v3:n (V3TeeKone, V3AsetaKone; siipiväli 5 km), elo LennonV3.Elosta; nokka ja
    ///     kallistus tulevat lentomallista.
    ///   - Kamera takaviistosta vasemmalta (suunnitelma kohta 5): katse lentosuunta + 30°, etäisyys 30 km, korkeuskulma 13°,
    ///     suunta seuraa 0,4 s:n viiveellä (kallistus näkyy). Kamera on aina alle 20 km:n korkeudella.
    ///   - Ohjaus: peukaloveto missä tahansa UI:n ulkopuolella on sauva vedon alkukohdan suhteen (vaaka kallistaa, ylös
    ///     nostaa nokkaa); sormen nosto oikaisee (avustettu tila). Kaasu ohjaimen KYTKIN-ryhmästä (LentopeliNakyma) tai
    ///     komennolla. Pallon omat eleet ovat lennon ajan pois (PalloKierto.SyoteEstetty).
    ///   - Renkaat ovat musteisia toruksia Symbolimalli-varjostimella; seuraava punainen (Tyylikirja Mark), läpäistyt piiloon.
    ///   - Proto ei veloita eikä tallenna (vaihe 2: Kauppa, kassa, tallennus, lentokortti). Loppu: rata + paluu kotirenkaan
    ///     8 km:n sisään, polttoaine ja korkeus loppu, tai komento "lentopeli pois".
    /// Komennot (Komennot.cs): lentopeli aloita [kaupunki] | pois | kaasu tyhja|talous|matka|taysi | auto 0|1 |
    /// sauva x y | irti | vapaa 0|1 | tila.
    /// </summary>
    public partial class Nappula
    {
        /// <summary>Käynnissä oleva lentopeli (HUD ja komennot); null = ei lentoa.</summary>
        public static LentopeliAjo Lentopelissa { get; private set; }
        /// <summary>HUD:n kytkentä: lentopeli alkoi (true) tai päättyi (false).</summary>
        public static event Action<bool> LentopeliVaihtui;

        /// <summary>Lentopelin tila ulos (HUD lukee joka kehys; komennot kirjoittavat).</summary>
        public sealed class LentopeliAjo
        {
            public Lentopeli.Lento Lento;
            public Lentopeli.Kaasu Kaasu = Lentopeli.Kaasu.Matka;
            public Lentopeli.Tuuli Tuuli;
            public bool Autopilotti, Vapaa;
            /// <summary>Tauko: lento seis, kone ja kamera paikallaan (komento "lentopeli tauko 1"; suunnitelma kohta 7.9).</summary>
            public bool Tauko;
            /// <summary>Latausodotuksen käytävän osuus 0–1 (HUD "Ladataan …"); &lt; 0 = lento käynnissä.</summary>
            public float Lataus = -1f;
            /// <summary>Komennon sauva (simulaattori ilman kosketusta); null = kosketus.</summary>
            public (double X, double Y)? KomentoSauva;
            public string Kaupunki;
            public double PaluuKm, KotiinKm;
            public string Loppu;
            internal Nappula Nappula;
            public void Lopeta(string syy = "lopetettu") { if (Loppu == null) Loppu = syy; }
        }

        /// <summary>Kotirenkaat (proto: Euroopan kaupungit; VAIN EUROOPPA).</summary>
        static readonly Dictionary<string, (double Lat, double Lon)> LpKaupungit = new Dictionary<string, (double, double)>
        {
            ["ateena"] = (37.9838, 23.7275), ["rooma"] = (41.8902, 12.4922), ["pariisi"] = (48.8566, 2.3522),
            ["lontoo"] = (51.5074, -0.1278), ["helsinki"] = (60.1699, 24.9384),
        };

        const double LpKameraEtaisyysM = 30000.0, LpKameraKorkeuskulma = 13.0, LpKameraTheta = 30.0, LpKameraViive = 0.4;
        const double LpKotiKm = 8.0, LpMaaKm = 0.3, LpSauvaPt = 70.0;
        /// <summary>Latausodotus: lähialueen käytävän kynnys (suunnitelma: "Lähde" ≥ 98 %) ja ehdoton katto (s).</summary>
        const float LpLahialueKynnys = 0.98f, LpOdotusKattoS = 12f;
        /// <summary>Ennakkokamera koneen edessä (s matkanopeudella): sen laatat latautuvat ennen kuin kone ehtii sinne.</summary>
        const double LpEnnakkoS = 12.0;
        const string LpTaukoSyy = "lentopeli";

        Coroutine lpAjo;
        readonly List<Transform> lpRenkaat = new List<Transform>();
        Mesh lpPunainen, lpMuste;
        bool lpNimiotEnnen = true, lpAluenimetEnnen = true;
        (bool Kehä, bool Ranta, bool Rajat) lpViivatEnnen = (true, true, true);

        /// <summary>Aloittaa lentopelin kaupungista (oletus Ateena). Lento v3 ei saa olla kesken.</summary>
        public bool AloitaLentopeli(string kaupunki = "ateena")
        {
            if (Lentopelissa != null || liike != null || georeferenssi == null) return false;
            if (!LpKaupungit.TryGetValue(kaupunki ?? "ateena", out var koti)) return false;
            if (kierto == null) kierto = FindAnyObjectByType<PalloKierto>();
            int siemen = Lentopeli.Siemen(kaupunki, DateTime.UtcNow.DayOfYear);
            var rata = Lentopeli.Rengasrata(siemen, koti.Lat, koti.Lon);
            var lahto = Lentopeli.Lentotila.Lahto(koti.Lat, koti.Lon, 3.0,
                Lentopeli.SuuntimaAst(koti.Lat, koti.Lon, rata[0].Lat, rata[0].Lon));
            var ajo = new LentopeliAjo
            {
                Lento = Lentopeli.Uusi(lahto, koti.Lat, koti.Lon, rata), Kaupunki = kaupunki, Nappula = this,
                // Päivän tuuli siemenestä (suunnitelma kohta 3: 0–25 % matkanopeudesta); proto: enintään 15 %.
                Tuuli = new Lentopeli.Tuuli((siemen & 0xffff) % 360, 0.15 * Lentopeli.Tavoitenopeus(Lentopeli.Kaasu.Matka)
                    * (((siemen >> 16) & 0xff) / 255.0)),
            };
            Lentopelissa = ajo;
            lpAjo = StartCoroutine(LentopeliKulku(ajo, siemen));
            return true;
        }

        IEnumerator LentopeliKulku(LentopeliAjo ajo, int siemen)
        {
            var kerrokset = KarttaKerrokset.Instanssi;
            var kamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            V3TeeKone();
            if (v3Kone == null) { Lentopelissa = null; lpAjo = null; yield break; }
            LpTeeRenkaat(ajo.Lento.Rata.Length);
            // Kartta kuten lento v3: nappula ja reittikaaret pois, kotikaupungin punainen rengas näkyviin.
            if (olio != null) olio.SetActive(false);
            reititEnnen = kerrokset == null || kerrokset.reitit == null || kerrokset.reitit.Nakyvissa;
            kerrokset?.Nakyvyys("reitit", false);
            // Nimiöt piiloon (suunnitelma kohta 5; Päätoimittaja: kartan nimiöt piirtyivät koneen päälle): nostot ja kaupungit
            // pelkkinä merkkeinä, alue- ja merinimet pois. Palautus LpPurussa.
            NostoKerros.LentopeliPiilottaa = true;
            var kmerkit = FindAnyObjectByType<KaupunkiMerkit>();
            lpNimiotEnnen = kmerkit == null || kmerkit.nimiotNakyvat;
            lpAluenimetEnnen = Nimikerros.Instanssi == null || Nimikerros.Instanssi.paalla;
            kerrokset?.Nakyvyys("nimiot", false);
            kerrokset?.Nakyvyys("aluenimet", false);
            // Maan kehä, rannat ja maarajat pois (simulaattori b5a0b9a3: Kreikan kehän leveys lasketaan ruudun keskeltä, joten
            // matalasta lentokamerasta lähiosat olivat kilometrien levyisiä läpikuultavia nauhoja koneen ympärillä).
            lpViivatEnnen = kerrokset == null ? (true, true, true)
                : (kerrokset.maaraja == null || !kerrokset.maaraja.Piilossa, kerrokset.rannikko == null || !kerrokset.rannikko.Piilossa,
                   kerrokset.rajat == null || !kerrokset.rajat.Piilossa);
            kerrokset?.Nakyvyys("aariviiva", false);
            kerrokset?.Nakyvyys("rannikko", false);
            kerrokset?.Nakyvyys("rajat", false);
            // Maakuntarajat (pelaajan maan alueet) pois samalla tavalla kuin linssin ajaksi (MaaKartta.Linssit).
            if (kerrokset != null && kerrokset.maakunnat != null) kerrokset.maakunnat.Linssit(true);
            var merkit = aloitusMerkit != null ? aloitusMerkit : FindAnyObjectByType<KaupunkiMerkit>();
            string kotiId = merkit != null ? merkit.LahinId(ajo.Lento.KotiLat, ajo.Lento.KotiLon) : null;
            if (merkit != null && kotiId != null) { merkit.Renkaat(new[] { kotiId }, null, LentoPunainen); lentoMerkit = merkit; lentoIdt = new[] { kotiId }; }
            // Maamerkkimallia ei näytetä: se skaalautuu kartan zoomin mukaan ja on lentopelin matalasta kamerasta kilometrien
            // seinä (simulaattori 1.10. 5ac7d518; v3:n aloitusradalla sama linja, omistaja 28.9.). Kiinteäkokoiset maamerkit = vaihe 2.
            // Rengasradan käytävä esiladataan kuten v3:n reitti (koti → renkaat → koti).
            var reitti = new List<(double Lat, double Lon)> { (ajo.Lento.KotiLat, ajo.Lento.KotiLon) };
            foreach (var r in ajo.Lento.Rata) reitti.Add((r.Lat, r.Lon));
            reitti.Add((ajo.Lento.KotiLat, ajo.Lento.KotiLon));
            var kaytava = kerrokset != null ? kerrokset.EsilataaLentoV3(reitti) : null;
            if (kierto != null) kierto.SyoteEstetty = true;
            v3Kone.gameObject.SetActive(true);
            V3Tapahtuma("kaynnistys");
            LentopeliVaihtui?.Invoke(true);
            Debug.Log($"MATKAKIRJA lentopeli: alku {ajo.Kaupunki} siemen {siemen}, {ajo.Lento.Rata.Length} rengasta, tuuli "
                      + $"{ajo.Tuuli.SuuntaAst:0}° {ajo.Tuuli.NopeusKms:0.00} km/s, käytävä {(kaytava != null ? kaytava.Yhteensa : 0)} laattaa");

            // LATAUSODOTUS (Päätoimittaja 2.10., suunnitelma kohdat 1.2 ja 5; diagnoosi 373ad97f: lennon alun läpikuultavat nauhat
            // olivat Cesiumin maastolaattoja kesken latauksen): kone ja kamera lähtöasennossa, taustajono tauolla
            // (AsetaSaapumistila kuten lento v3), ennakkokamera koneen edessä. Lento alkaa, kun lähialueen käytävä on ≥ 98 % ja
            // Cesiumin valinta tasaantunut (Valmius.Tasaantunut), vähintään 0,5 s, katto LpOdotusKattoS.
            Laattapalvelin.AsetaSaapumistila(LpTaukoSyy, true);
            double kameraSuunta = ajo.Lento.Tila.Suunta;
            {
                var ehto = new ValmiusEhto();
                float odotusAlku = Time.unscaledTime;
                string syy;
                while (true)
                {
                    float kulunut = Time.unscaledTime - odotusAlku;
                    var t0 = ajo.Lento.Tila;
                    double h0 = t0.KorkeusKm * 1000.0;
                    V3AsetaKone(kamera, t0.Lat, t0.Lon, h0, t0.Suunta, kulunut, siemen, 0);
                    LpAsetaRenkaat(ajo.Lento);
                    if (kierto != null)
                        kierto.Kuvaa(t0.Lat, t0.Lon, LpKameraEtaisyysM, 90.0 - LpKameraKorkeuskulma, kameraSuunta + LpKameraTheta, h0);
                    LpEnnakko(t0, kamera);
                    float osuus = kaytava != null ? kaytava.Osuus : 1f;
                    ajo.Lataus = osuus;
                    bool tasainen = Valmius.Tasaantunut(ehto, kerrokset != null ? kerrokset.pallo : null);
                    if (osuus >= LpLahialueKynnys && tasainen && kulunut >= 0.5f) { syy = "valmis"; break; }
                    if (kulunut >= LpOdotusKattoS) { syy = $"katto (käytävä {osuus:P0}, pallo {(tasainen ? "tasaantunut" : "kesken")})"; break; }
                    if (ajo.Loppu != null) { syy = "keskeytetty"; break; }
                    yield return null;
                }
                ajo.Lataus = -1f;
                Debug.Log($"MATKAKIRJA lentopeli: latausodotus {Time.unscaledTime - odotusAlku:0.00} s ({syy}), käytävä "
                          + (kaytava != null ? $"{kaytava.Valmis}+{kaytava.Epaonnistui}/{kaytava.Yhteensa}" : "-")
                          + $", pallo {(kerrokset != null && kerrokset.pallo != null ? kerrokset.pallo.ComputeLoadProgress() : 0f):0} %");
            }
            V3Tapahtuma("leikkaus");
            int sormiId = -1;
            Vector2 sormiAlku = default;
            float seuraavaLoki = 0f, alku = Time.unscaledTime;
            var kehykset = new List<float>(4096);
            int lapaistyEnnen = 0;
            while (ajo.Loppu == null)
            {
                float dt = Mathf.Min(Time.unscaledDeltaTime, 0.1f);
                kehykset.Add(Time.unscaledDeltaTime * 1000f);
                var l = ajo.Lento;
                // Ohjaus: autopilotti (video), komennon sauva tai peukaloveto.
                var o = new Lentopeli.Ohjaus { Kaasu = ajo.Kaasu, Avustettu = !ajo.Vapaa };
                if (ajo.Autopilotti)
                {
                    var kohde = l.RataValmis
                        ? new Lentopeli.Rengas { Lat = l.KotiLat, Lon = l.KotiLon, KorkeusKm = 2.0 }
                        : l.Rata[l.Seuraava];
                    o = Lentopeli.Autopilotti(l.Tila, kohde);
                    ajo.Kaasu = o.Kaasu;
                }
                else if (ajo.KomentoSauva.HasValue)
                {
                    o.SauvaX = ajo.KomentoSauva.Value.X; o.SauvaY = ajo.KomentoSauva.Value.Y; o.Sormi = true;
                }
                else
                {
                    var s = LpSauva(ref sormiId, ref sormiAlku);
                    if (s.HasValue) { o.SauvaX = s.Value.x; o.SauvaY = s.Value.y; o.Sormi = true; }
                }
                if (!ajo.Tauko) Lentopeli.Paivita(ref ajo.Lento, dt, o, ajo.Tuuli);
                l = ajo.Lento;
                var t = l.Tila;
                ajo.KotiinKm = Lentopeli.EtaisyysKm(t.Lat, t.Lon, l.KotiLat, l.KotiLon);
                ajo.PaluuKm = Lentopeli.PaluuSadeKm(t.Polttoaine, ajo.Tuuli, Lentopeli.SuuntimaAst(t.Lat, t.Lon, l.KotiLat, l.KotiLon));
                if (l.Lapaisty != lapaistyEnnen)
                {
                    lapaistyEnnen = l.Lapaisty;
                    Debug.Log($"MATKAKIRJA lentopeli: rengas {l.Lapaisty}/{l.Rata.Length} läpi t={t.AikaS:0.0} s, polttoaine {t.Polttoaine:P0}"
                              + (l.RataValmis ? $", rata valmis (+{Lentopeli.PalkkioRengasrata:P0} tankkiin), paluu kotiin {ajo.KotiinKm:0} km" : ""));
                }
                if (l.RataValmis && ajo.KotiinKm < LpKotiKm) ajo.Lopeta("perillä kotirenkaalla");
                else if (t.KorkeusKm < LpMaaKm) ajo.Lopeta(t.Moottori ? "pakkolasku (maa)" : "liitolasku (polttoaine loppui)");

                // Kone, renkaat ja kamera.
                double h = t.KorkeusKm * 1000.0;
                V3AsetaKone(kamera, t.Lat, t.Lon, h, t.Suunta, t.AikaS, siemen, t.Kallistus);
                var elo = LennonV3.Elo(t.AikaS, siemen);
                if (v3Kone.Runko != null)
                    v3Kone.Runko.localRotation = Quaternion.Euler(-(float)(t.Nokka + elo.Nokka), (float)elo.Sivu, -(float)(t.Kallistus + elo.Kallistus));
                double kierr = !t.Moottori ? 0.0 : ajo.Kaasu switch
                {
                    Lentopeli.Kaasu.Tyhjakaynti => 0.45, Lentopeli.Kaasu.Talous => 0.8, Lentopeli.Kaasu.Matka => 0.9, _ => 1.05,
                };
                if (v3Kone.Potkurit != null) v3Kone.Potkurit.nopeus = v3Kone.PotkurinNopeus * (float)kierr;
                LpAsetaRenkaat(l);
                double ero = ((t.Suunta - kameraSuunta + 540.0) % 360.0) - 180.0;
                kameraSuunta += ero * (1.0 - math.exp(-dt / LpKameraViive));
                if (kierto != null)
                    kierto.Kuvaa(t.Lat, t.Lon, LpKameraEtaisyysM, 90.0 - LpKameraKorkeuskulma, kameraSuunta + LpKameraTheta, h);
                V3Aani = new LentoV3Aani { EtaisyysM = (float)LpKameraEtaisyysM, Kierrokset = (float)kierr, Kaasu = (float)kierr };
                LpEnnakko(t, kamera);

                if (Time.unscaledTime >= seuraavaLoki)
                {
                    seuraavaLoki = Time.unscaledTime + 2f;
                    Debug.Log($"MATKAKIRJA lentopeli: t={t.AikaS:0.0} s {t.Lat:0.000} {t.Lon:0.000} h {t.KorkeusKm:0.00} km v {t.NopeusKms:0.00} km/s "
                              + $"suunta {t.Suunta:0}° kall {t.Kallistus:0}° nokka {t.Nokka:0}° kaasu {ajo.Kaasu} polttoaine {t.Polttoaine:P0} "
                              + $"renkaat {l.Lapaisty}/{l.Rata.Length} kotiin {ajo.KotiinKm:0} km paluusäde {ajo.PaluuKm:0} km"
                              + $" ääriviiva {v3ReunaLeveys:0.000}"
                              + (t.Sakkaus > 0 ? " SAKKAUS" : "") + (t.Moottori ? "" : " LIITO") + (ajo.Autopilotti ? " auto" : ""));
                }
                yield return null;
            }

            // Loppu: kehysajat (suunnitelma kohta 7.1: 95 % ≤ 16,7 ms) ja purku.
            kehykset.Sort();
            int yli33 = 0;
            foreach (var k in kehykset) if (k > 33.4f) yli33++;
            float p95 = kehykset.Count > 0 ? kehykset[Mathf.Min(kehykset.Count - 1, (int)(kehykset.Count * 0.95f))] : 0f;
            var lt = ajo.Lento.Tila;
            Debug.Log($"MATKAKIRJA lentopeli: loppu \"{ajo.Loppu}\" lentoaika {lt.AikaS:0} s ({Time.unscaledTime - alku:0} s), renkaat "
                      + $"{ajo.Lento.Lapaisty}/{ajo.Lento.Rata.Length}, polttoaine {lt.Polttoaine:P0}, kehykset {kehykset.Count} p95 {p95:0.0} ms, "
                      + $"yli 33 ms {yli33}, käytävä {(kaytava != null ? $"{kaytava.Valmis}+{kaytava.Epaonnistui}/{kaytava.Yhteensa}" : "-")}");
            kaytava?.Peru();
            LpPurku();
        }

        /// <summary>Ennakkokamera [0] koneen eteen (LpEnnakkoS) samaan kuvakulmaan kuin lentokamera (Nappula.Aloitusrata).</summary>
        void LpEnnakko(in Lentopeli.Lentotila t, Camera kamera)
        {
            Lentopeli.Siirra(t.Lat, t.Lon, t.Suunta, LpEnnakkoS * Math.Max(1.0, t.NopeusKms), out double la, out double lo);
            EnnakkoAsentoon(0, new AloituslennonRata.Asento(la, lo, LpKameraEtaisyysM, 90.0 - LpKameraKorkeuskulma,
                t.Suunta + LpKameraTheta, t.KorkeusKm * 1000.0), kamera);
        }

        /// <summary>Peukalosauva: ensimmäinen UI:n ulkopuolelta alkanut kosketus; veto LpSauvaPt pisteen päähän = täysi.</summary>
        Vector2? LpSauva(ref int sormiId, ref Vector2 alku)
        {
            float pt = (float)LpSauvaPt * Mathf.Max(0.01f, PalloKierto.Pistekerroin);
            if (EnhancedTouchSupport.enabled)
            {
                foreach (var k in Kosketus.activeTouches)
                {
                    if (sormiId < 0 && k.phase == UnityEngine.InputSystem.TouchPhase.Began
                        && (kierto == null || kierto.UiPeittaa == null || !kierto.UiPeittaa(k.screenPosition)))
                    { sormiId = k.touchId; alku = k.screenPosition; }
                    if (k.touchId != sormiId) continue;
                    if (k.phase == UnityEngine.InputSystem.TouchPhase.Ended || k.phase == UnityEngine.InputSystem.TouchPhase.Canceled)
                    { sormiId = -1; return null; }
                    var d = (k.screenPosition - alku) / pt;
                    return new Vector2(Mathf.Clamp(d.x, -1f, 1f), Mathf.Clamp(d.y, -1f, 1f));
                }
                if (Kosketus.activeTouches.Count == 0) sormiId = -1;
            }
            var hiiri = Mouse.current;
            if (hiiri != null && hiiri.leftButton.isPressed)
            {
                var p = hiiri.position.ReadValue();
                if (hiiri.leftButton.wasPressedThisFrame) alku = p;
                var d = (p - alku) / pt;
                return new Vector2(Mathf.Clamp(d.x, -1f, 1f), Mathf.Clamp(d.y, -1f, 1f));
            }
            return null;
        }

        /// <summary>Renkaat: torus (pääsäde 1, putki 0,07) Symbolimalli-materiaalilla, värit kärkiväreinä.</summary>
        void LpTeeRenkaat(int n)
        {
            if (lpPunainen == null)
            {
                lpPunainen = LpTorus(new Color32(176, 58, 43, 255));
                lpMuste = LpTorus(new Color32(70, 51, 31, 255));
            }
            while (lpRenkaat.Count < n)
            {
                var go = new GameObject("Lentopelin rengas");
                go.transform.SetParent(georeferenssi.transform, false);
                go.AddComponent<MeshFilter>().sharedMesh = lpMuste;
                var r = go.AddComponent<MeshRenderer>();
                r.sharedMaterial = v3Materiaali;
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                r.receiveShadows = false;
                lpRenkaat.Add(go.transform);
            }
            for (int i = 0; i < lpRenkaat.Count; i++) lpRenkaat[i].gameObject.SetActive(i < n);
        }

        static Mesh LpTorus(Color32 vari, int kaari = 48, int putki = 8, float paksuus = 0.07f)
        {
            var v = new Vector3[kaari * putki];
            var nrm = new Vector3[v.Length];
            var c = new Color32[v.Length];
            var tri = new int[kaari * putki * 6];
            for (int i = 0; i < kaari; i++)
            {
                float a = 2f * Mathf.PI * i / kaari;
                var keski = new Vector3(Mathf.Cos(a), Mathf.Sin(a), 0f);
                for (int j = 0; j < putki; j++)
                {
                    float b = 2f * Mathf.PI * j / putki;
                    var n = keski * Mathf.Cos(b) + Vector3.forward * Mathf.Sin(b);
                    int k = i * putki + j;
                    v[k] = keski + n * paksuus;
                    nrm[k] = n;
                    c[k] = vari;
                    int i2 = (i + 1) % kaari, j2 = (j + 1) % putki, t = k * 6;
                    tri[t] = k; tri[t + 1] = i2 * putki + j; tri[t + 2] = i2 * putki + j2;
                    tri[t + 3] = k; tri[t + 4] = i2 * putki + j2; tri[t + 5] = i * putki + j2;
                }
            }
            var m = new Mesh { name = "Lentopelin rengas", vertices = v, normals = nrm, colors32 = c, triangles = tri };
            m.RecalculateBounds();
            return m;
        }

        /// <summary>Renkaat paikalleen: taso kohtisuoraan läpilentosuuntaan, seuraava punainen, läpäistyt piiloon.</summary>
        void LpAsetaRenkaat(in Lentopeli.Lento l)
        {
            for (int i = 0; i < l.Rata.Length && i < lpRenkaat.Count; i++)
            {
                var tr = lpRenkaat[i];
                bool nakyy = i >= l.Seuraava;
                if (tr.gameObject.activeSelf != nakyy) tr.gameObject.SetActive(nakyy);
                if (!nakyy) continue;
                var r = l.Rata[i];
                tr.GetComponent<MeshFilter>().sharedMesh = i == l.Seuraava ? lpPunainen : lpMuste;
                LpKehys(tr, r.Lat, r.Lon, r.KorkeusKm * 1000.0, r.SuuntaAst, r.SadeKm * 1000.0);
            }
        }

        /// <summary>Paikallinen kehys (kuten V3AsetaKone): +Z läpilentosuuntaan, +Y ylös, mittakaava metreinä.</summary>
        void LpKehys(Transform tr, double lat, double lon, double h, double suunta, double kokoM)
        {
            double3 ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(lon, lat, h));
            double3 ylos = CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(ecef);
            double3 pohjoinen = math.normalize(new double3(0, 0, 1) - ylos * ylos.z);
            double3 ita = math.normalize(math.cross(pohjoinen, ylos));
            double b = math.radians(suunta);
            double3 eteen = pohjoinen * math.cos(b) + ita * math.sin(b);
            double3 p0 = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            double3 p1 = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef + ylos * kokoM);
            var f = (Vector3)(float3)math.normalize(georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(eteen));
            var y = (Vector3)(float3)math.normalize(georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(ylos));
            tr.localPosition = (float3)p0;
            tr.localRotation = Quaternion.LookRotation(f, y);
            float mitta = (float)math.distance(p0, p1);
            tr.localScale = new Vector3(mitta, mitta, mitta);
        }

        void LpPurku()
        {
            EnnakkoPois();
            Laattapalvelin.AsetaSaapumistila(LpTaukoSyy, false);
            var kerrokset = KarttaKerrokset.Instanssi;
            foreach (var r in lpRenkaat) if (r != null) r.gameObject.SetActive(false);
            if (v3Kone != null) v3Kone.gameObject.SetActive(false);
            if (kierto != null) { kierto.SyoteEstetty = false; kierto.SeurantaLoppui(); }
            if (reititEnnen) kerrokset?.Nakyvyys("reitit", true);
            NostoKerros.LentopeliPiilottaa = false;
            if (lpNimiotEnnen) kerrokset?.Nakyvyys("nimiot", true);
            if (lpAluenimetEnnen) kerrokset?.Nakyvyys("aluenimet", true);
            if (lpViivatEnnen.Kehä) kerrokset?.Nakyvyys("aariviiva", true);
            if (lpViivatEnnen.Ranta) kerrokset?.Nakyvyys("rannikko", true);
            if (lpViivatEnnen.Rajat) kerrokset?.Nakyvyys("rajat", true);
            if (kerrokset != null && kerrokset.maakunnat != null) kerrokset.maakunnat.Linssit(false);
            if (maamerkit != null) maamerkit.Piilota();
            if (lentoMerkit != null)
            {
                lentoMerkit.Renkaat(null);
                lentoMerkit = null;
                lentoIdt = null;
            }
            if (olio != null) olio.SetActive(true);
            V3Aani = new LentoV3Aani { EtaisyysM = -1f };
            V3Tapahtuma("perilla");
            Lentopelissa = null;
            lpAjo = null;
            LentopeliVaihtui?.Invoke(false);
        }

        /// <summary>Komennon "lentopeli tila" lokirivi.</summary>
        public static string LentopeliKuvaus()
        {
            var a = Lentopelissa;
            if (a == null) return "MATKAKIRJA lentopeli: ei lentoa (lentopeli aloita [ateena|rooma|pariisi|lontoo|helsinki])";
            var t = a.Lento.Tila;
            return $"MATKAKIRJA lentopeli: {a.Kaupunki} t={t.AikaS:0} s h {t.KorkeusKm:0.00} km v {t.NopeusKms:0.00} km/s kaasu {a.Kaasu} "
                   + $"polttoaine {t.Polttoaine:P0} renkaat {a.Lento.Lapaisty}/{a.Lento.Rata.Length} auto {(a.Autopilotti ? 1 : 0)} vapaa {(a.Vapaa ? 1 : 0)}";
        }
    }
}
