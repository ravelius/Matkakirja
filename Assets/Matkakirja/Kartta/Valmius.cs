using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// VALMIUSDIAGNOSTIIKKA (löydös 80, 25.9.2026: aloitusverho ja aloituslennon musta verho osuvat aina kattoonsa,
    /// pallo 10 % / 72 %). Ei muuta käytöstä: kirjaa lokiin 0,5 s välein, mitä pallon valmiusaste
    /// (Cesium3DTileset.ComputeLoadProgress) on ja mistä se koostuu.
    ///
    /// MITÄ ASTE ON (cesium-native 80a22ff, Cesium for Unity 1.25.1, TilesetViewGroup.cpp:finishFrame): edellisen kehyksen
    /// valinnasta 100 × (kaikki − kesken) / kaikki, missä
    ///   kaikki = valinnan läpikäymät solmut (myös karsitut, preloadAncestors-esivanhemmat ja forbidHoles-sisarukset)
    ///            + jokaisen piirrettävän laatan jokainen raster-liitos (pohja, väritaso, lennolla Blue Marble ja Sentinel),
    ///   kesken = työsäikeen jono + pääsäikeen jono + potkitut (tilesKicked) + jo latautuvat
    ///            + piirrettävien laattojen raster-liitokset, jotka eivät ole Attached (esivanhemman rasteri = kesken).
    /// Aste ei siis ole pysyvästi katossa, mutta liikkuva kamera (portin kierto, lennon kamera) tuo joka kehys uusia
    /// laattoja, ja 99 % sallii vain yhden keskeneräisen sadasta.
    ///
    /// Rivi (MATKAKIRJA valmius …): aste, Cesiumin valintatilasto (logSelectionStats kytketään yhdeksi kehykseksi:
    /// käyty/karsittu/piirretty/syvyys/jonot/ladattuja; Cesium kirjoittaa oman rivinsä samalla), laattaobjektit
    /// (aktiiviset/kaikki), raster-kerrokset palvelimen luokittain (kesken olevat pyynnöt, valmistuneet välillä / niistä
    /// verkosta), Laattapalvelimen jonot ja kameran liike (maapiste °/s, korkeus %/s, katse °/s).
    ///
    /// Käynnistys: komento `valmius seuraa [s]` (Komennot) tai automaattisesti verhon alussa, kun kehittäjälippu
    /// PlayerPrefs "matkakirja-valmius-auto" on päällä (1 = <see cref="AutoOletusS"/> s, ≥ 2 = sekunnit; simulaattorissa
    /// sovellus kiinni: defaults write app.matkakirja.proto3d matkakirja-valmius-auto -int 1; komento `valmius auto
    /// paalle [s]`). Verhon lähtörivi (<see cref="VerhoLoppu"/>) kirjataan aina.
    /// </summary>
    public sealed class Valmius : MonoBehaviour
    {
        public const string AutoAvain = "matkakirja-valmius-auto";
        /// <summary>Automaattisen seurannan kesto (s): yli aloitusverhon katon (8 s), jotta näkyy, mihin aste olisi noussut.</summary>
        public const float AutoOletusS = 12f;
        /// <summary>Näytteiden väli (s).</summary>
        public const float Vali = 0.5f;
        /// <summary>Kynnykset, joiden ensimmäinen ylitys kirjataan seurannan loppuun (verhojen rajat 97 ja 99).</summary>
        static readonly float[] Kynnykset = { 80f, 90f, 95f, 97f, 99f, 100f };

        static Valmius instanssi;

        /// <summary>Automaattinen seuranta verhon alussa (s), 0 = pois. Luetaan PlayerPrefsistä kerran.</summary>
        public static float AutoS
        {
            get
            {
                if (!autoLuettu)
                {
                    autoLuettu = true;
                    int v = PlayerPrefs.GetInt(AutoAvain, 0);
                    if (v == 0 && PlayerPrefs.GetString(AutoAvain, "") == "1") v = 1;
                    autoS = v <= 0 ? 0f : v == 1 ? AutoOletusS : v;
                }
                return autoS;
            }
            set
            {
                autoLuettu = true;
                autoS = Mathf.Max(0f, value);
                PlayerPrefs.SetInt(AutoAvain, autoS <= 0f ? 0 : Mathf.Approximately(autoS, AutoOletusS) ? 1 : Mathf.Max(2, Mathf.RoundToInt(autoS)));
                PlayerPrefs.Save();
            }
        }
        static bool autoLuettu;
        static float autoS;

        sealed class Seuranta
        {
            public string Nimi;
            public float Alku, Loppu;
            public float Suurin = -1f, SuurinT;
            public readonly float[] Ylitys = new float[Kynnykset.Length];
            public float? VerhoLahti;
        }
        readonly List<Seuranta> seurannat = new List<Seuranta>();

        /// <summary>Aloittaa (tai jatkaa) seurannan nimellä, kesto s sekuntia.</summary>
        public static void Seuraa(string nimi, float s)
        {
            var v = Hae();
            float nyt = Time.realtimeSinceStartup;
            foreach (var x in v.seurannat)
                if (x.Nimi == nimi) { x.Loppu = Mathf.Max(x.Loppu, nyt + s); return; }
            var uusi = new Seuranta { Nimi = nimi, Alku = nyt, Loppu = nyt + s };
            for (int i = 0; i < uusi.Ylitys.Length; i++) uusi.Ylitys[i] = -1f;
            v.seurannat.Add(uusi);
            Debug.Log($"MATKAKIRJA valmius: seuranta {nimi} alkaa, {s:0.#} s");
        }

        /// <summary>Kaikki seurannat loppuun (yhteenveto lokiin).</summary>
        public static void Lopeta()
        {
            if (instanssi == null) return;
            foreach (var x in instanssi.seurannat) x.Loppu = 0f;
        }

        /// <summary>Verho alkaa: seuranta käyntiin, jos kehittäjälippu on päällä.</summary>
        public static void VerhoAlku(string nimi)
        {
            float s = AutoS;
            if (s > 0f) Seuraa(nimi, s);
        }

        /// <summary>
        /// Verho lähtee: rivi "valmius: verho &lt;nimi&gt; lähti &lt;syy&gt; &lt;ms&gt; ms aste &lt;x&gt; %" aina (syy = valmis tai katto:…),
        /// ja käynnissä olevan seurannan loppuun merkitään lähtöhetki.
        /// </summary>
        public static void VerhoLoppu(string nimi, string syy, double ms, float aste)
        {
            Debug.Log($"MATKAKIRJA valmius: verho {nimi} lähti {syy} {ms:0} ms aste {(aste < 0 ? "-" : aste.ToString("0.0"))} %");
            if (instanssi == null) return;
            foreach (var x in instanssi.seurannat)
                if (x.Nimi == nimi) x.VerhoLahti = Time.realtimeSinceStartup - x.Alku;
        }

        /// <summary>Yksi näyte heti lokiin (komento `valmius tila`).</summary>
        public static void Tila()
        {
            var v = Hae();
            v.nayteHaussa = false;
            v.KaynnistaNayte("tila");
        }

        static Valmius Hae()
        {
            if (instanssi != null) return instanssi;
            var go = new GameObject("Valmius");
            DontDestroyOnLoad(go);
            instanssi = go.AddComponent<Valmius>();
            return instanssi;
        }

        // ---- Näytteenotto ----
        // Cesiumin valintatilasto ei ole julkisessa API:ssa (ViewUpdateResult), mutta logSelectionStats kirjoittaa sen
        // lokiin (Cesium3DTilesetImpl.cpp:updateLastViewUpdateResultState, vain kun jokin luku muuttui edellisestä
        // kirjatusta). Lippu ei luo tilesetiä uudelleen (Cesium3DTileset.cs: pelkkä kenttä), joten se kytketään näytteen
        // ajaksi ja rivi poimitaan Application.logMessageReceivedistä. Enintään 3 kehystä odotetaan; ilman riviä "cesium -".

        static readonly Regex TilastoRe = new Regex(
            @"Visited (\d+), Culled Visited (\d+), Rendered (\d+), Culled (\d+), Max Depth Visited (\d+), Loading-Worker (\d+), Loading-Main (\d+) Total Tiles Resident (\d+)",
            RegexOptions.CultureInvariant);

        float seuraava;
        bool nayteHaussa;
        int nayteKehys;
        string nayteSyy;
        string tilasto;
        Cesium3DTileset tilastoPallo;
        bool tilastoKytketty;

        // Kameran edellinen tila (liikenopeudet näytteiden välillä).
        float kameraT = -1f;
        double3 kameraEcef;
        Quaternion kameraKierto;

        // Palvelimen luokkien valmiit edellisessä näytteessä (välin erotus).
        readonly Dictionary<string, (int valmiit, int verkosta)> edelliset = new Dictionary<string, (int, int)>();

        void OnEnable() => Application.logMessageReceived += Loki;

        void OnDisable()
        {
            Application.logMessageReceived -= Loki;
            PalautaTilasto();
        }

        void Loki(string viesti, string pino, LogType tyyppi)
        {
            if (!nayteHaussa || viesti == null || viesti.IndexOf("Visited ", System.StringComparison.Ordinal) < 0) return;
            var m = TilastoRe.Match(viesti);
            if (!m.Success) return;
            string G(int i) => m.Groups[i].Value;
            tilasto = $"cesium käyty {G(1)} (karsittuja käyty {G(2)}) piirto {G(3)} karsittu {G(4)} syvyys {G(5)} " +
                      $"jono työ {G(6)} pää {G(7)} ladattuja {G(8)}";
        }

        void Update()
        {
            float nyt = Time.realtimeSinceStartup;
            if (nayteHaussa && (tilasto != null || Time.frameCount - nayteKehys >= 3))
            {
                KirjaaNayte(nyt);
                nayteHaussa = false;
                PalautaTilasto();
            }
            if (seurannat.Count == 0) return;
            if (!nayteHaussa && nyt >= seuraava)
            {
                seuraava = nyt + Vali;
                KaynnistaNayte(null);
            }
            for (int i = seurannat.Count - 1; i >= 0; i--)
                if (nyt >= seurannat[i].Loppu && !nayteHaussa)
                {
                    Yhteenveto(seurannat[i]);
                    seurannat.RemoveAt(i);
                }
        }

        void KaynnistaNayte(string syy)
        {
            nayteHaussa = true;
            nayteKehys = Time.frameCount;
            nayteSyy = syy;
            tilasto = null;
            tilastoPallo = Pallo();
            // Vain jos lippu oli pois: kehittäjän itse kytkemää tilastoa ei sammuteta.
            if (tilastoPallo != null && !tilastoPallo.logSelectionStats)
            {
                tilastoPallo.logSelectionStats = true;
                tilastoKytketty = true;
            }
        }

        void PalautaTilasto()
        {
            if (tilastoKytketty && tilastoPallo != null) tilastoPallo.logSelectionStats = false;
            tilastoKytketty = false;
        }

        static Cesium3DTileset Pallo()
        {
            var kk = KarttaKerrokset.Instanssi;
            return kk != null && kk.pallo != null ? kk.pallo : FindAnyObjectByType<Cesium3DTileset>();
        }

        void KirjaaNayte(float nyt)
        {
            var pallo = tilastoPallo != null ? tilastoPallo : Pallo();
            float aste = pallo != null ? pallo.ComputeLoadProgress() : -1f;
            var sb = new StringBuilder("MATKAKIRJA valmius ");
            if (nayteSyy != null) sb.Append(nayteSyy);
            else
            {
                sb.Append('[');
                for (int i = 0; i < seurannat.Count; i++)
                {
                    var x = seurannat[i];
                    if (i > 0) sb.Append(", ");
                    sb.Append(x.Nimi).Append(' ').Append((nyt - x.Alku).ToString("0.0")).Append(" s");
                    if (aste > x.Suurin) { x.Suurin = aste; x.SuurinT = nyt - x.Alku; }
                    for (int k = 0; k < Kynnykset.Length; k++)
                        if (x.Ylitys[k] < 0f && aste >= Kynnykset[k]) x.Ylitys[k] = nyt - x.Alku;
                }
                sb.Append(']');
            }
            sb.Append(" aste ").Append(aste < 0 ? "-" : aste.ToString("0.0")).Append(" %");
            sb.Append(" | ").Append(tilasto ?? "cesium -");
            if (pallo != null)
            {
                // Laattaobjektit: Cesium luo ladatulle laatalle lapsiobjektin ja aktivoi piirrettävät (Cesium3DTilesetImpl.cpp:179–195).
                var t = pallo.transform;
                int aktiivisia = 0;
                for (int i = 0; i < t.childCount; i++) if (t.GetChild(i).gameObject.activeSelf) aktiivisia++;
                sb.Append(" | objektit ").Append(aktiivisia).Append('/').Append(t.childCount);
                sb.Append(" | kerrokset");
                foreach (var o in pallo.GetComponents<CesiumRasterOverlay>())
                {
                    if (o == null || !o.enabled) continue;
                    sb.Append(' ').Append(o.materialKey).Append(':');
                    if (o is CesiumUrlTemplateRasterOverlay u)
                        sb.Append(Laattapalvelin.Luokka(Ampariton(u.templateUrl))).Append("(z").Append(u.minimumLevel).Append('–')
                          .Append(u.maximumLevel).Append(')');
                    else sb.Append(o.GetType().Name);
                }
            }
            sb.Append(" | palvelin ").Append(Laattapalvelin.JonoTila());
            sb.Append(" | luokat");
            foreach (var p in Laattapalvelin.Luokat)
            {
                var a = p.Value;
                int valmiit = System.Threading.Volatile.Read(ref a[1]), verkosta = System.Threading.Volatile.Read(ref a[2]);
                edelliset.TryGetValue(p.Key, out var e);
                edelliset[p.Key] = (valmiit, verkosta);
                int kesken = System.Threading.Volatile.Read(ref a[0]);
                if (kesken == 0 && valmiit == e.valmiit) continue;
                sb.Append(' ').Append(p.Key).Append(" k").Append(kesken).Append(" v").Append(valmiit - e.valmiit)
                  .Append('/').Append(verkosta - e.verkosta);
            }
            sb.Append(" | ").Append(Kamera(nyt));
            sb.Append(" | portti ").Append(PalloKierto.PorttiSumea ? 1 : 0).Append(PalloKierto.PorttiAikaSeis ? " seis" : "")
              .Append(" musta ").Append(Mustaverho.Peitto.ToString("0.00"))
              .Append(" aloitusverho ").Append(Aloitusverho.Nakyvissa ? 1 : 0);
            Debug.Log(sb.ToString());
        }

        static string Ampariton(string url)
        {
            if (url == null) return "";
            string j = Laattapalvelin.Juuri;
            if (j != null && url.StartsWith(j, System.StringComparison.Ordinal)) return url.Substring(j.Length);
            return url.StartsWith(Laattapalvelin.Ampari, System.StringComparison.Ordinal) ? url.Substring(Laattapalvelin.Ampari.Length) : url;
        }

        /// <summary>Kameran liike edellisestä näytteestä: maapisteen kulmanopeus, korkeuden muutos ja katseen kierto.</summary>
        string Kamera(float nyt)
        {
            var kam = Camera.main;
            var kk = KarttaKerrokset.Instanssi;
            var georef = kk != null ? kk.GetComponent<CesiumGeoreference>() : FindAnyObjectByType<CesiumGeoreference>();
            if (kam == null || georef == null) { kameraT = -1f; return "kamera -"; }
            var gt = georef.transform;
            double3 ecef = georef.TransformUnityPositionToEarthCenteredEarthFixed((float3)gt.InverseTransformPoint(kam.transform.position));
            var kierto = kam.transform.rotation;
            double r = math.length(ecef);
            double korkeus = r - CesiumWgs84Ellipsoid.GetMaximumRadius();
            string s = $"kamera korkeus {korkeus / 1000.0:0} km";
            if (kameraT >= 0f && nyt > kameraT && r > 1.0 && math.length(kameraEcef) > 1.0)
            {
                double dt = nyt - kameraT;
                double kulma = math.degrees(math.acos(math.clamp(math.dot(ecef / r, math.normalize(kameraEcef)), -1.0, 1.0)));
                double k0 = math.length(kameraEcef) - CesiumWgs84Ellipsoid.GetMaximumRadius();
                double kMuutos = math.abs(k0) > 1.0 ? (korkeus - k0) / math.abs(k0) * 100.0 / dt : 0.0;
                float katse = Quaternion.Angle(kameraKierto, kierto);
                s += string.Format(", maapiste {0:0.00}°/s, korkeus {1:+0.0;-0.0;0} %/s, katse {2:0.0}°/s",
                    kulma / dt, kMuutos, katse / dt);
            }
            kameraT = nyt;
            kameraEcef = ecef;
            kameraKierto = kierto;
            return s;
        }

        void Yhteenveto(Seuranta x)
        {
            var sb = new StringBuilder($"MATKAKIRJA valmius: seuranta {x.Nimi} loppu {Time.realtimeSinceStartup - x.Alku:0.0} s");
            sb.Append(x.VerhoLahti.HasValue ? $", verho lähti {x.VerhoLahti.Value:0.0} s" : ", verho -");
            sb.Append(", suurin aste ").Append(x.Suurin < 0 ? "-" : x.Suurin.ToString("0.0")).Append(" % (")
              .Append(x.SuurinT.ToString("0.0")).Append(" s), ylitykset");
            for (int k = 0; k < Kynnykset.Length; k++)
                sb.Append(' ').Append(Kynnykset[k].ToString("0")).Append(" %: ")
                  .Append(x.Ylitys[k] < 0f ? "-" : x.Ylitys[k].ToString("0.0") + " s");
            Debug.Log(sb.ToString());
        }
    }
}
