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
        public bool Laukaise(string muoto = "4:5", int leveys = 3240)
        {
            if (kaynnissa) return false;
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
                var naytteet = Kuvasuunnitelma.Naytteet(kk);
                if (naytteet.Count == 0) { Loki("näkymässä ei maata"); yield break; }
                Tila = "indeksi"; Loki($"laukaisu {id} {muoto} {W}×{H}, kenttä {kamera.fieldOfView:0.0}°, {naytteet.Count} solua, {utc:yyyy-MM-dd HH:mm:ss} UTC");

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
                var ty = new KuvanTyosto(); ty.Data.Lut = indeksi.Lut;
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

                // 4) laatat: TCI näkymän tasoilta, SCL karkeimmalta tasolta
                var haku = new List<(string url, CogTaso taso, long alku, long pit, Action<byte[]> valmis)>();
                foreach (var (ru, o) in ty.Data.Ruudut)
                    foreach (var (taso, tx, tyy) in Kuvasuunnitelma.Laatat(ru, o, naytteet))
                    {
                        var (alku, pit) = o.Tasot[taso].Alue(tx, tyy); var avain = (ru.Tunnus, taso, tx, tyy); var tt = o.Tasot[taso];
                        haku.Add((ru.Url, tt, alku, pit, d => ty.Data.Pakatut[avain] = (tt, d)));   // puretaan piirrossa (Valimuistikatto)
                    }
                var sclPuretut = new ConcurrentDictionary<(string, int, int), byte[]>();
                foreach (var ru in ruudut)
                {
                    if (!scl.TryGetValue(ru.Tunnus, out var so)) continue;
                    var st = so.Tasot[so.Tasot.Count - 1]; string su = sclUrl[ru.Tunnus];
                    for (int x = 0; x < st.LaattojaX; x++) for (int y = 0; y < st.LaattojaY; y++)
                    {
                        var (alku, pit) = st.Alue(x, y); var avain = (ru.Tunnus, x, y);
                        haku.Add((su, st, alku, pit, d => sclPuretut[avain] = CogOtsake.PuraLaatta(st, d)));
                    }
                }
                long tavut = haku.Sum(x => x.pit), saatu = 0; int virheet = 0;
                Tila = "haku"; Loki($"haku {haku.Count} laattaa, {tavut / 1e6:0.0} Mt");
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
                            var data = q.downloadHandler.data; var valmis = haku[i].valmis; saatu += data.Length;
                            purku.Add(Task.Run(() => { try { valmis(data); } catch (Exception x) { Debug.LogWarning("iss-kamera purku: " + x.Message); } }));
                        }
                        else virheet++;
                        q.Dispose();
                    }
                    Edistyminen = 0.6f * saatu / Math.Max(1, tavut);
                }
                while (purku.Any(x => !x.IsCompleted)) yield return null;
                Loki($"haettu {saatu / 1e6:0.0} Mt, virheitä {virheet}, {kello.ElapsedMilliseconds / 1000.0:0.0} s");

                // 5) maamaski, pilvet ja laatat levylle
                Tila = "työstö";
                foreach (var ru in ruudut)
                    if (scl.TryGetValue(ru.Tunnus, out var so)) ty.LisaaMaamaski(ru, so, (x, y) => sclPuretut.TryGetValue((ru.Tunnus, x, y), out var l) ? l : null);
                ty.Suunnittele(naytteet);
                var (az, korkeus) = AurinkoPisteessa(utc, naytteet.Average(n => n.Lat), naytteet.Average(n => n.Lon));
                ty.Pilvet = new Pilvikentta { MaaOsuus = ty.MaaOsuus, AurinkoAz = az, AurinkoKorkeus = korkeus }.Kalibroi();
                var lista = ty.Laatat.ToList(); int kirjoitettu = 0;
                int ytimia = Math.Max(1, SystemInfo.processorCount - 1);   // vain pääsäikeessä (laitekoe 1.10.: säikeessä poikkeus)
                var tyot = Task.Run(() => Parallel.ForEach(lista, new ParallelOptions { MaxDegreeOfParallelism = ytimia }, l =>
                {
                    var rgba = new byte[256 * 256 * 4];
                    ty.Piirra(l.z, l.x, l.y, rgba);
                    for (int i = 0; i < rgba.Length; i += 4) if (rgba[i + 3] == 0) { rgba[i] = 18; rgba[i + 1] = 30; rgba[i + 2] = 38; rgba[i + 3] = 255; }   // avomeri
                    var png = ImageConversion.EncodeArrayToPNG(rgba, UnityEngine.Experimental.Rendering.GraphicsFormat.R8G8B8A8_SRGB, 256, 256);
                    var polku = Path.Combine(laatat, ty.Polku(l.z, l.x, l.y) + ".png");
                    Directory.CreateDirectory(Path.GetDirectoryName(polku)); File.WriteAllBytes(polku, png);
                    System.Threading.Interlocked.Increment(ref kirjoitettu);
                }));
                while (!tyot.IsCompleted) { Edistyminen = 0.6f + 0.25f * kirjoitettu / Math.Max(1, lista.Count); yield return null; }
                if (tyot.IsFaulted) { Loki("työstö: " + tyot.Exception?.GetBaseException().Message); yield break; }
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
                yield return new WaitForEndOfFrame();
                var lukija = AsyncGPUReadback.Request(rt, 0, TextureFormat.RGBA32);
                while (!lukija.done) yield return null;
                if (lukija.hasError) { Loki("luku epäonnistui"); yield break; }
                var kuva = new Texture2D(W, H, TextureFormat.RGBA32, false);
                kuva.LoadRawTextureData(lukija.GetData<byte>()); kuva.Apply(false);
                var jpg = kuva.EncodeToJPG(93); Destroy(kuva);
                string albumi = Path.Combine(Application.persistentDataPath, "iss-albumi"); Directory.CreateDirectory(albumi);
                ViimeisinKuva = Path.Combine(albumi, id + ".jpg");
                File.WriteAllBytes(ViimeisinKuva, jpg);
                File.WriteAllText(Path.ChangeExtension(ViimeisinKuva, ".json"), Tiedot(id, utc, kk, naytteet, muoto, az, korkeus, ruudut, ehdokkaat, saatu));
                Edistyminen = 1;
                Loki($"VALMIS {ViimeisinKuva} ({jpg.Length / 1e6:0.0} Mt, {W}×{H}), yhteensä {kello.ElapsedMilliseconds / 1000.0:0.0} s, pallo {(pallo != null ? pallo.ComputeLoadProgress() : 0):0.0} %");
            }
            finally
            {
                if (rt != null) { kamera.targetTexture = null; kamera.ResetAspect(); rt.Release(); Destroy(rt); }
                AstronauttiKerros.KuvanPinta = null;
                Avaruus.KuvaputkiAsetettu = false;
                IssNyt.Simu.AsetaKerroin(kerroin0 > 0 ? kerroin0 : 1);
                if (!SailytaLaatat) try { if (Directory.Exists(laatat)) Directory.Delete(laatat, true); } catch { }
                Tila = "valmis"; kaynnissa = false;
            }
        }

        static UnityWebRequest Alue(string url, long alku, long pit)
        {
            var q = UnityWebRequest.Get(url);
            q.SetRequestHeader("Range", $"bytes={alku}-{alku + pit - 1}");
            return q;
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
            var iss = IssNyt.Paikka(utc); double km = IssNyt.KorkeusKm(utc);
            var keski = naytteet.OrderBy(n => Math.Abs(n.Sx - 24) + Math.Abs(n.Sy - 18)).First();
            double mm = 12 / Math.Tan(kk.PystykenttaAst * Math.PI / 360);
            var ic = System.Globalization.CultureInfo.InvariantCulture;
            var kuvat = ruudut.Select(r => ehdokkaat.First(x => x.Tunnus == r.Tunnus).Valinnat[0]).Select(v => $"\"{v.Id}\"");
            return string.Format(ic, "{{\"id\":\"{0}\",\"utc\":\"{1:yyyy-MM-ddTHH:mm:ssZ}\",\"muoto\":\"{2}\",\"iss\":{{\"lat\":{3:0.000},\"lon\":{4:0.000},\"km\":{5:0.0},\"kmh\":{6:0}}}," +
                "\"keskipiste\":{{\"lat\":{7:0.000},\"lon\":{8:0.000}}},\"mm\":{9:0},\"aurinko\":{{\"az\":{10:0},\"korkeus\":{11:0.0}}},\"lahde\":\"Contains modified Copernicus Sentinel data\",\"s2\":[{12}],\"mt\":{13:0.0}}}",
                id, utc, muoto, iss.Lat, iss.Lon, km, IssNyt.NopeusKmh(km), keski.Lat, keski.Lon, mm, az, korkeus, string.Join(",", kuvat), tavut / 1e6);
        }
    }
}
