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
    /// paalle [s]`; varakanava Documents/valmius-auto.txt). Verhon lähtörivi (<see cref="VerhoLoppu"/>) kirjataan aina.
    ///
    /// Lisäksi verhojen yhteinen valmiusehto (<see cref="Tasaantunut"/>, BUILD 16) ja verhon kevennys (<see cref="KevennysAlku"/>:
    /// Laattapalvelimen näkyvä jono ylös, tausta tauolle; lähtö- ja näyterivillä "kevennys paalle/pois").
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

        /// <summary>
        /// Automaattinen seuranta verhon alussa (s), 0 = pois. Luetaan kerran: PlayerPrefs (int tai merkkijono) tai tiedosto
        /// Documents/valmius-auto.txt (sekunnit tai 1). Lähde ja arvo kirjataan lokiin ensimmäisellä luennalla.
        ///
        /// HUOM simulaattori (mittaus 25.9.): Unity iOS lukee PlayerPrefsin NSUserDefaultsista (kontin
        /// Library/Preferences/app.matkakirja.proto3d.plist, avain sellaisenaan, int = integer), mutta plist-tiedostoon
        /// suoraan kirjoitettu arvo katoaa, koska simulaattorin cfprefsd pitää domainin välimuistissa ja kirjoittaa sen
        /// päälle. Kirjoita cfprefsd:n kautta (sovellus kiinni): xcrun simctl spawn &lt;UDID&gt; defaults write
        /// app.matkakirja.proto3d matkakirja-valmius-auto -int 1, tai tiedosto kontin Documents-kansioon
        /// (xcrun simctl get_app_container &lt;UDID&gt; app.matkakirja.proto3d data).
        /// </summary>
        public static float AutoS
        {
            get
            {
                if (!autoLuettu)
                {
                    autoLuettu = true;
                    string lahde = "PlayerPrefs";
                    int v = PlayerPrefs.GetInt(AutoAvain, 0);
                    if (v == 0 && int.TryParse(PlayerPrefs.GetString(AutoAvain, ""), out int sv)) v = sv;
                    if (v == 0)
                    {
                        lahde = "tiedosto";
                        try
                        {
                            string f = System.IO.Path.Combine(Application.persistentDataPath, AutoTiedosto);
                            if (System.IO.File.Exists(f) && int.TryParse(System.IO.File.ReadAllText(f).Trim(), out int fv)) v = fv;
                        }
                        catch (System.Exception) { /* valinnainen */ }
                    }
                    autoS = v <= 0 ? 0f : v == 1 ? AutoOletusS : v;
                    Debug.Log(autoS > 0f ? $"MATKAKIRJA valmius: auto {autoS:0.#} s ({lahde})" : "MATKAKIRJA valmius: auto pois");
                }
                return autoS;
            }
            set
            {
                autoLuettu = true;
                autoS = Mathf.Max(0f, value);
                PlayerPrefs.SetInt(AutoAvain, autoS <= 0f ? 0 : Mathf.Approximately(autoS, AutoOletusS) ? 1 : Mathf.Max(2, Mathf.RoundToInt(autoS)));
                PlayerPrefs.Save();
                if (autoS <= 0f)
                    try { System.IO.File.Delete(System.IO.Path.Combine(Application.persistentDataPath, AutoTiedosto)); }
                    catch (System.Exception) { /* ei tiedostoa */ }
            }
        }
        /// <summary>Varakanava kehittäjälipulle (persistentDataPath = Documents): sekunnit tai 1.</summary>
        public const string AutoTiedosto = "valmius-auto.txt";
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
            PyyntoLoki.Merkki("verho " + nimi + " alkaa");
            float s = AutoS;
            if (s > 0f) Seuraa(nimi, s);
        }

        /// <summary>
        /// Verho lähtee: rivi "valmius: verho &lt;nimi&gt; lähti &lt;syy&gt; &lt;ms&gt; ms aste &lt;x&gt; %" aina (syy = valmis tai katto:…),
        /// ja käynnissä olevan seurannan loppuun merkitään lähtöhetki. lisa (valinnainen) rivin loppuun " | lisa": aloituslennon
        /// mustalla verholla lennon pinnan tila (KarttaKerrokset.PintaTila: "pinta valmiina …" tai "pinta luotu nyt").
        /// </summary>
        public static void VerhoLoppu(string nimi, string syy, double ms, float aste, string lisa = null)
        {
            Debug.Log($"MATKAKIRJA valmius: verho {nimi} lähti {syy} {ms:0} ms aste {(aste < 0 ? "-" : aste.ToString("0.0"))} % " +
                      $"kevennys {KevennysTila()}" + (string.IsNullOrEmpty(lisa) ? "" : " | " + lisa));
            PyyntoLoki.Merkki($"verho {nimi} lähti {syy} {ms:0} ms aste {aste:0.0}");
            if (instanssi == null) return;
            foreach (var x in instanssi.seurannat)
                if (x.Nimi == nimi) x.VerhoLahti = Time.realtimeSinceStartup - x.Alku;
        }

        /// <summary>
        /// VERHOJEN YHTEINEN VALMIUSEHTO (Fablen päätös BUILD 16): kirjaa tämän kehyksen asteen olioon ja palauttaa, onko
        /// pallo valmis (ValmiusEhto: ≥ 90 %, nousu ≤ 1 %-yks / 300 ms, ≥ 10 kehystä). Kutsu kerran kehyksessä; ilman palloa
        /// false (katto ratkaisee). Aloitusverho, aloituslennon musta verho ja linssin raster-kerrokset (KarttaKerrokset).
        /// </summary>
        public static bool Tasaantunut(ValmiusEhto ehto, Cesium3DTileset pallo) =>
            ehto != null && pallo != null && ehto.Paivita(Time.realtimeSinceStartupAsDouble, pallo.ComputeLoadProgress());

        // ---- Verhon kevennys (Fablen päätös BUILD 16, löydös 80) ----
        // Verhon ajaksi Laattapalvelimen näkyvän kartan jono saa enemmän rinnakkaisia hakuja ja taustan esilataus on tauolla
        // (Laattapalvelin.VerhoKevennys). Cesiumin valinnan kevennystä (preloadSiblings/preloadAncestors/forbidHoles/
        // loadingDescendantLimit pois verhon ajaksi) EI tehdä: Cesium for Unity 1.25.1:ssä jokainen näistä asettimista kutsuu
        // RecreateTileset():iä (Cesium3DTileset.cs), ja natiivi lukee ne vain tilesetin luonnissa (Cesium3DTilesetImpl.cpp:
        // LoadTileset 650–655), joten vaihto ajon aikana lataisi koko pallon uudelleen.

        /// <summary>Kehittäjälippu A/B-mittaukseen: kevennys pois (PlayerPrefs tai Documents/valmius-kevennys-pois.txt).</summary>
        public const string KevennysPoisAvain = "matkakirja-valmius-kevennys-pois";
        public const string KevennysPoisTiedosto = "valmius-kevennys-pois.txt";
        /// <summary>Kevennys vapautuu viimeistään näin monen sekunnin päästä (verhon korutiini voi keskeytyä ennen loppua).</summary>
        public const float KevennysKatto = 15f;

        public static bool KevennysPois
        {
            get
            {
                if (!kevennysLuettu)
                {
                    kevennysLuettu = true;
                    kevennysPois = PlayerPrefs.GetInt(KevennysPoisAvain, 0) == 1;
                    if (!kevennysPois)
                        try { kevennysPois = System.IO.File.Exists(System.IO.Path.Combine(Application.persistentDataPath, KevennysPoisTiedosto)); }
                        catch (System.Exception) { /* valinnainen */ }
                    if (kevennysPois) Debug.Log("MATKAKIRJA valmius: verhon kevennys pois (kehittäjälippu)");
                }
                return kevennysPois;
            }
            set
            {
                kevennysLuettu = true;
                kevennysPois = value;
                PlayerPrefs.SetInt(KevennysPoisAvain, value ? 1 : 0);
                PlayerPrefs.Save();
                if (!value)
                    try { System.IO.File.Delete(System.IO.Path.Combine(Application.persistentDataPath, KevennysPoisTiedosto)); }
                    catch (System.Exception) { /* ei tiedostoa */ }
            }
        }
        static bool kevennysLuettu, kevennysPois;
        readonly Dictionary<string, float> kevennykset = new Dictionary<string, float>();

        /// <summary>Verho alkaa: kevennys päälle (ellei lippu estä). Sama nimi kahdesti = yksi kevennys.</summary>
        public static void KevennysAlku(string nimi)
        {
            if (KevennysPois) return;
            var v = Hae();
            if (v.kevennykset.ContainsKey(nimi)) return;
            v.kevennykset[nimi] = Time.realtimeSinceStartup;
            Laattapalvelin.VerhoKevennys(true);
        }

        /// <summary>Verho lähtee: kevennys pois (viimeisen verhon jälkeen tausta jatkuu).</summary>
        public static void KevennysLoppu(string nimi)
        {
            if (instanssi == null || !instanssi.kevennykset.Remove(nimi)) return;
            Laattapalvelin.VerhoKevennys(false);
        }

        /// <summary>
        /// Jokin verho odottaa pallon laattoja (kevennys päällä): Ruudunpaivitys pitää täyden taajuuden (build 22, Natiiviseppä
        /// 26.9.: lepotilan 30 fps puolitti Cesiumin pääsäikeen latauskierrokset verhon aikana, kun kamera on paikallaan).
        /// </summary>
        public static bool Verhossa => instanssi != null && instanssi.kevennykset.Count > 0;

        /// <summary>Kevennyksen tila lokiriveille: "paalle (aloitusverho, musta)", "pois" tai "pois (lippu)".</summary>
        public static string KevennysTila()
        {
            if (KevennysPois) return "pois (lippu)";
            if (instanssi == null || instanssi.kevennykset.Count == 0) return "pois";
            return "paalle (" + string.Join(", ", instanssi.kevennykset.Keys) + $", rinnakkain {Laattapalvelin.VerhoRinnakkain})";
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
            // Keskeytyneen verhon kevennys vapautuu katon jälkeen (muuten tausta jäisi tauolle).
            if (kevennykset.Count > 0)
                foreach (var p in new List<KeyValuePair<string, float>>(kevennykset))
                    if (nyt - p.Value > KevennysKatto)
                    {
                        Debug.LogWarning($"MATKAKIRJA valmius: kevennys {p.Key} vapautui katossa {KevennysKatto:0} s (verho ei ilmoittanut loppua)");
                        KevennysLoppu(p.Key);
                    }
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
                // Laattapaketista tarjotut (kaikkiaan, ei välin erotus): p<n>.
                int paketista = a.Length > 3 ? System.Threading.Volatile.Read(ref a[3]) : 0;
                if (paketista > 0) sb.Append(" p").Append(paketista);
            }
            sb.Append(" | ").Append(Kamera(nyt));
            sb.Append(" | portti ").Append(PalloKierto.PorttiSumea ? 1 : 0).Append(PalloKierto.PorttiAikaSeis ? " seis" : "")
              .Append(" musta ").Append(Mustaverho.Peitto.ToString("0.00"))
              .Append(" aloitusverho ").Append(Aloitusverho.Nakyvissa ? 1 : 0)
              .Append(" | kevennys ").Append(KevennysTila());
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
