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
// Käyttöliittymä (KUVAA-nappi, rajausruutu, edistyminen) tulee UI-pohjista (omistajan päätös 1.10.: A + Natiivi-UI).
using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CesiumForUnity;
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
        public static string Tila = "valmis";
        public static float Edistyminen;
        public static string ViimeisinKuva;
        /// <summary>Testissä laatat jäävät talteen (iss-kamera/laatat-<id>).</summary>
        public static bool SailytaLaatat;
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
        const float KaariVoima = 6f, KaariHr = 1.5f, KaariSini = 1.3f, KaariUtu = 1.2f, KaariYdin = 1f, KaariSyva = 1.5f;

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

        public static IssKameraKuva Hae()
        {
            if (olio == null) olio = new GameObject("IssKameraKuva").AddComponent<IssKameraKuva>();
            return olio;
        }

        static void Loki(string t) => Debug.Log("MATKAKIRJA linssit: iss-kamera: " + t);

        /// <summary>Laukaisee kuvan (muoto "4:5" oletus, leveys pikseleinä). false = työstö jo käynnissä tai ei kyydissä.</summary>
#if UNITY_IOS && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("__Internal")] static extern ulong os_proc_available_memory();
        /// <summary>Prosessin käytettävissä oleva muisti (Mt) ennen jetsam-rajaa (iOS 13+); muualla tai rajatta −1.</summary>
        public static long VapaaMuistiMt() { ulong v = os_proc_available_memory(); return v == 0 ? -1 : (long)(v / (1024 * 1024)); }   // 0 = ei rajaa (simulaattori)
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
            if (kaynnissa) return false;
            long vapaa = VapaaMuistiMt();
            int sallittu = LeveysMuistille(leveys, vapaa);
            if (sallittu != leveys) Loki($"muisti: vapaata {vapaa} Mt → leveys {leveys} → {sallittu}");
            leveys = sallittu;
            var kerros = FindAnyObjectByType<AstronauttiKerros>();
            var kamera = FindAnyObjectByType<PalloKierto>()?.GetComponent<Camera>();
            var g = FindAnyObjectByType<CesiumGeoreference>();
            if (kerros == null || kamera == null || g == null) { Loki("ei kyytiä tai kameraa"); return false; }
            var m = muoto.Split(':');
            int mw = m.Length == 2 && int.TryParse(m[0], out var a) ? a : 4, mh = m.Length == 2 && int.TryParse(m[1], out var b) ? b : 5;
            StartCoroutine(Ajo(kamera, g, leveys, leveys * mh / mw, muoto));
            return true;
        }

        IEnumerator Ajo(Camera kamera, CesiumGeoreference g, int W, int H, string muoto)
        {
            kaynnissa = true; Edistyminen = 0;
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
            var utc = IssNyt.Kello();
            RenderTexture rt = null;
            try
            {
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
                if (naytteet.Count == 0) { Loki("näkymässä ei maata"); yield break; }
                Tila = "indeksi"; Loki($"laukaisu {id} {muoto} {W}×{H}, kenttä {kamera.fieldOfView:0.0}°, {naytteet.Count} solua, {utc:yyyy-MM-dd HH:mm:ss} UTC, vapaata {VapaaMuistiMt()} Mt");

                // 2) indeksi
                S2Indeksi indeksi = null;
                string indeksiTiedosto = Path.Combine(juuri, "indeksi.json");
                if (!File.Exists(indeksiTiedosto))
                {
                    using var q = UnityWebRequest.Get(S2Indeksi.Osoite);
                    yield return q.SendWebRequest();
                    if (q.result == UnityWebRequest.Result.Success) File.WriteAllBytes(indeksiTiedosto, q.downloadHandler.data);
                    else { Loki("indeksi: " + q.error); yield break; }
                }
                indeksi = S2Indeksi.Jasenna(File.ReadAllText(indeksiTiedosto));
                double w = naytteet.Min(n => n.LonMin), s = naytteet.Min(n => n.LatMin), e = naytteet.Max(n => n.LonMax), nn = naytteet.Max(n => n.LatMax);
                var ehdokkaat = indeksi.Alueella(w, s, e, nn).ToList();
                var ruudut = Kuvasuunnitelma.Ruudut(naytteet, ehdokkaat.Select(x => x.Ruutu()).Where(x => x != null)).Keys.ToList();
                Loki($"indeksi {indeksi.Ruudut.Count} ruutua, näkymässä {ruudut.Count}: {string.Join(" ", ruudut.Select(x => x.Tunnus))}");
                if (ruudut.Count == 0) { Loki("ei S2-ruutuja näkymässä (indeksin ulkopuolella)"); yield break; }

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
                ty.Suunnittele(naytteet);   // laattajoukko ensin: haku lehtilaattojen alueesta

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
                            var px = tex.GetPixelData<Color32>(0); var rgb = new byte[256 * 256 * 3];
                            for (int yy = 0; yy < 256; yy++)
                                for (int xx = 0; xx < 256; xx++)
                                {
                                    var c = px[(255 - yy) * 256 + xx]; int o = (yy * 256 + xx) * 3;
                                    rgb[o] = c.r; rgb[o + 1] = c.g; rgb[o + 2] = c.b;
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
                var pilviset = ty.PilvisetLehdet();
                if (pilviset.Count > 0)
                {
                    var varat = new List<(S2Ruutu vara, UnityWebRequest tq, UnityWebRequest sq)>();
                    foreach (var (ru, _) in ty.Data.Ruudut.Where(r => r.ruutu.Valinta == 0).ToList())
                    {
                        var vara = indeksi.Ruudut.TryGetValue(ru.Mgrs, out var ir) ? ir.Ruutu(1) : null;
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
                    Loki($"pilvimaski: {pilviset.Count} pilvistä lehteä, {varoja} varakuvaa, {haku.Sum(x => x.pit) / 1e6:0.0} Mt");
                    if (haku.Count > 0) yield return Lataa(haku, tila);
                }
                long saatu = tila[0];
                Loki($"haettu {saatu / 1e6:0.0} Mt, virheitä {tila[1]}, {kello.ElapsedMilliseconds / 1000.0:0.0} s");

                // 5) maamaski, pilvet ja laatat levylle
                Tila = "työstö";
                foreach (var ru in ruudut)
                    if (scl.TryGetValue(ru.Tunnus, out var so)) ty.LisaaMaamaski(ru, so, (x, y) => sclPuretut.TryGetValue((ru.Tunnus, x, y), out var l) ? l : null);
                var (az, korkeus) = AurinkoPisteessa(utc, naytteet.Average(n => n.Lat), naytteet.Average(n => n.Lon));
                ty.Pilvet = new Pilvikentta { MaaOsuus = ty.MaaOsuus, AurinkoAz = az, AurinkoKorkeus = korkeus }.Kalibroi();
                ty.MaanSini = MaanSini; ty.Kamera = kk.Paikka; ty.AurinkoEcef = (aEcef.x, aEcef.y, aEcef.z);   // pilvipeitto kasvaa etäisyyden mukaan (Cupola-mallikuva)
                var lista = ty.Laatat.ToList(); int kirjoitettu = 0;
                int ytimia = Math.Max(1, SystemInfo.processorCount - 1);   // vain pääsäikeessä (laitekoe 1.10.: säikeessä poikkeus)
                // Avomeri (ei S2-ruutua): TCI:n tyypillinen meri tci_lutin läpi, ettei täyttö erotu tummana kaistana (laitekoe 2).
                byte[] meri = { 14, 22, 30 };
                // Vesi tasoitetaan merenväriin (Ateena 8648c410: eri päivien meri suorina ruuturajoina), rannikon matala vesi 25 % jää.
                ty.Data.VesiTasoitus = 0.75; ty.Data.Meri = (byte[])meri.Clone();
                if (ty.Data.Lut != null) for (int c = 0; c < 3; c++) meri[c] = ty.Data.Lut[meri[c]];
                // Tasot tarkimmasta juureen (KuvanTyosto.PiirraKaikki): lehti datasta, isä lapsistaan.
                var tyot = Task.Run(() => ty.PiirraKaikki((l, rgba) =>
                {
                    // EncodeArrayToPNG olettaa rivin 0 alimmaksi (Unityn tekstuurijärjestys); laatassa rivi 0 = pohjoinen → käännetään.
                    // Laitekoe 6 (kaistadiagnoosi 1.10.): kääntämättä jokainen laatta oli pystysuunnassa peilattu → vaakakaistat.
                    var kaanto = new byte[rgba.Length];
                    for (int y = 0; y < 256; y++) Buffer.BlockCopy(rgba, y * 1024, kaanto, (255 - y) * 1024, 1024);
                    for (int i = 3; i < kaanto.Length; i += 4) kaanto[i] = 255;   // täyttö merkitty alfalla 254 → kuvaan läpinäkymättömänä
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
                AstronauttiKerros.KuvanPinta = new AstronauttiKerros.Pinta { Url = "file://" + laatat + "/{z}/{x}/{reverseY}.png",
                    W = ty.W, S = ty.S, E = ty.E, N = ty.N, Rx = ty.Rx, Ry = ty.Ry, MaxTaso = zmax - KuvanTyosto.JuuriZ };
                rt = new RenderTexture(W, H, 24, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB) { name = "IssKameraKuva", antiAliasing = 1 };
                rt.Create();
                kamera.targetTexture = rt; kamera.ResetAspect();
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
                    var j = kuva.EncodeToJPG(93); Destroy(kuva);
                    if (k == 0) jpg = j; else { File.WriteAllBytes(Path.Combine(albumi, $"{id}-{k}.jpg"), j); Loki($"sarjakuva {k} (+{10 * k} s)"); }
                }
                ViimeisinKuva = Path.Combine(albumi, id + ".jpg");
                File.WriteAllBytes(ViimeisinKuva, jpg);
                File.WriteAllText(Path.ChangeExtension(ViimeisinKuva, ".json"), Tiedot(id, utc, kk, naytteet, muoto, az, korkeus, ruudut, ehdokkaat, saatu));
                Edistyminen = 1;
                Loki($"VALMIS {ViimeisinKuva} ({jpg.Length / 1e6:0.0} Mt, {W}×{H}), yhteensä {kello.ElapsedMilliseconds / 1000.0:0.0} s, pallo {(pallo != null ? pallo.ComputeLoadProgress() : 0):0.0} %");
            }
            finally
            {
                if (rt != null) { kamera.targetTexture = null; kamera.ResetAspect(); rt.Release(); Destroy(rt); }
                GC.Collect(); Resources.UnloadUnusedAssets();
                Loki($"muisti kuvan jälkeen: vapaata {VapaaMuistiMt()} Mt");
                AstronauttiKerros.KuvanPinta = null;
                Avaruus.KuvaputkiAsetettu = false;
                Avaruus.KuvanNousu = 0f;
                Yokuori.Aallokko = aallokko0; Yokuori.KiillonVoima = kiilto0;
                if (kaariAsetettu) AsetaKaari(1f, 1f, 1f, 1f, 1f, 0f);
                IssNyt.Simu.AsetaKerroin(kerroin0 > 0 ? kerroin0 : 1);
                if (!SailytaLaatat) try { if (Directory.Exists(laatat)) Directory.Delete(laatat, true); } catch { }
                Tila = "valmis"; kaynnissa = false;
            }
        }

        /// <summary>Range-haut enintään Rinnakkain kerrallaan, purku säikeissä; tila: [0] saatu, [1] virheet.</summary>
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

        /// <summary>Julisteen tekstikentät kuvaushetken arvoista (Päätoimittaja 1.10.: paikka, koordinaatit, aika, korkeus, …, lähde).</summary>
        static string Tiedot(string id, DateTime utc, KuvaKamera kk, List<Nayte> naytteet, string muoto, double az, double korkeus,
            List<S2Ruutu> ruudut, List<S2IndeksiRuutu> ehdokkaat, long tavut)
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
                "\"aurinko_deg\":{11:0.0},\"aurinko_az\":{10:0},\"lahde\":\"Contains modified Copernicus Sentinel data\",\"s2\":[{12}],\"mt\":{13:0.0}}}",
                id, utc, muoto, iss.Lat, iss.Lon, km, IssNyt.NopeusKmh(km), keski.Lat, keski.Lon, mm, az, korkeus, string.Join(",", kuvat), tavut / 1e6,
                kk.Leveys, kk.Korkeus, etaisyys, kk.Leveys / 2.0, kk.Korkeus / 2.0, Valotus.AukkoTeksti(aukko), Valotus.AikaTeksti(aika), iso);
        }
    }
}
