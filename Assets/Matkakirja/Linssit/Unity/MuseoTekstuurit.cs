// TAIDEMUSEON TEOSKUVAT LAITTEELLA (Natiiviseppä 10.10.2026; PT 09.5x, suunnitelma luvut 5 ja 6.4; ydin Ydin/Museo/MuseoRuudut.cs,
// paketit tyokalut/teos_astc.py). Ämpärireitti, ei Addressablesia: <Juuri>/<teos>/{teos.json, seina.astcm, yks/<z>/<x>_<y>.astc}.
//  - Seinätaso: nykyinen + 3 seuraavaa pysähdystä (MuseoEsilataus), muut näkyvät paikkakuvina; budjetti (MuseoBudjetti) rajaa.
//    4 Gt:n laitteilla ja vakavassa hädässä yksi mip pois (2048 → 1024 px).
//  - Yksityiskohta: vain nykyiselle teokselle. Kamerasta lasketaan, montako näytön pikseliä teoksen leveys vie ja mikä osa näkyy
//    (RuutuValinta) → puuttuvat ruudut ladataan keskeltä ulos, enintään 2 GPU-siirtoa kehyksessä. Ruutu on oma nelikulmio
//    teoksen kuvan edessä (0,5 mm) teoksen materiaalin kopiolla: valaistus lasketaan maailman paikasta (MuseoValaistu),
//    joten ruutu ja seinätaso valaistaan samoin. Ruudut LRU-paikoissa (RuutuVarasto), näkyviä ei häädetä.
//  - MUISTIHÄTÄ (PieniMuistihata kuten kaupungissa): taso 1 → ruudut pois, taso 2 → myös seinätasot 1024 px:iin seuraavissa latauksissa.
//  - Levyvälimuisti temporaryCachePath/museo/ (polut ovat versioituja → muuttumattomia).
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Museo;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class MuseoTekstuurit : MonoBehaviour
    {
        /// <summary>Teoksen kuvan paikka näyttämöllä (MuseoRakennus): kuvan nelikulmion isä, koko (m) ja kankaan z (paikallinen, −Z ulos).
        /// Paketti = teokset.json:n kuva.paketti ("astc-v1/&lt;id&gt;/", suhteessa maan juureen) ja Px sen lähteen pikselit; null/0 = tuntematon.</summary>
        public sealed class Kuvapaikka { public Transform Isa; public Material Materiaali; public float Leveys, Korkeus, Z; public string Paketti; public int PxLeveys, PxKorkeus; }

        /// <summary>Pakettien juuri (…/taidemuseo/&lt;sali&gt;/astc-vN/); null = vain paikkakuvat.</summary>
        public string Juuri;
        /// <summary>Maan juuri (…/taidemuseo/&lt;maa&gt;/); teoksen paketti = MaaJuuri + Kuvapaikka.Paketti (teokset.v2.json kuva.paketti).</summary>
        public string MaaJuuri;
        public Func<string, Kuvapaikka> Paikka;
        public Action<string> Kirjaa;
        /// <summary>Teokselta puuttuu ASTC-paketti (teos.json tai seina.astcm): sovitin lataa JPEG-varakuvan (MuseoSovitin.KuvaJuuri + Teos.Kuva).</summary>
        public Action<string> EiPakettia;
        public int GpuSiirtojaKehyksessa = 2;
        /// <summary>Ruutuja yhtä aikaa haussa + siirtojonossa (iPad 10.10.: rajaton haku kävellessä Yövartiolle kasvatti hallittua kekoa ~590 Mt
        /// 2 s:ssa, kun levyvälimuistin ruudut jonottivat GPU-siirtoa 2/kehys).</summary>
        public int RuutujaMatkalla = 8;
        int ruutujaHaussa;

        readonly Dictionary<string, TeosPyramidi> pyramidit = new Dictionary<string, TeosPyramidi>();
        readonly Dictionary<string, Texture2D> seinat = new Dictionary<string, Texture2D>();
        readonly HashSet<string> haussa = new HashSet<string>(), puuttuu = new HashSet<string>();
        readonly Queue<(RuutuAvain avain, byte[] data)> siirrot = new Queue<(RuutuAvain, byte[])>();
        readonly Dictionary<int, (RuutuAvain avain, Texture2D kuva, GameObject go, Material mat)> paikat = new Dictionary<int, (RuutuAvain, Texture2D, GameObject, Material)>();
        readonly Dictionary<string, Texture2D> paikkakuvat = new Dictionary<string, Texture2D>();
        readonly List<string> seinaJarjestys = new List<string>();
        readonly HashSet<string> tarvitaan = new HashSet<string>();
        readonly Matkakirja.Linssit.Kierros.PieniMuistihata hata = new Matkakirja.Linssit.Kierros.PieniMuistihata();
        RuutuVarasto varasto;
        MuseoBudjetti budjetti;
        string nykyinen;
        float seuraavaMittaus;
        public long SeinaTavut { get; private set; }
        public int Ruutuja => varasto?.Kaytossa ?? 0;

        void Awake()
        {
            budjetti = MuseoBudjetti.Laitteelle(SystemInfo.systemMemorySize / 1024.0);
            varasto = new RuutuVarasto(budjetti.RuutuPaikat);
        }

        /// <summary>Kerran kehyksessä: kamera, nykyinen teos ja kierroksen seuraavat teokset (esilataus).</summary>
        public void Paivita(Camera kamera, string teos, IList<string> jarjestys, int kohta)
        {
            if (Juuri == null || Paikka == null) return;
            MittaaHata();
            tarvitaan.Clear();
            foreach (var id in MuseoEsilataus.Seinat(jarjestys, kohta)) tarvitaan.Add(id);
            if (teos != null) tarvitaan.Add(teos);
            foreach (var id in tarvitaan) Seina(id);
            KarsiSeinat();
            if (teos != nykyinen) { nykyinen = teos; varasto.Pyyda(Array.Empty<RuutuAvain>()); NaytaRuudut(); }
            if (teos != null && kamera != null && pyramidit.TryGetValue(teos, out var p) && p.OnYksityiskohtaa && Paikka(teos) is { } kp)
            {
                // Valinta mahtuu ruutupaikkoihin (karkeampi taso, jos ei); haku lähimmät ensin, vain RuutujaMatkalla kerrallaan.
                var tarve = Nakyvat(kamera, p, kp, varasto.Paikkoja);
                foreach (var a in varasto.Pyyda(tarve))
                {
                    if (ruutujaHaussa + siirrot.Count >= RuutujaMatkalla) break;
                    HaeRuutu(a);
                }
                NaytaRuudut();
            }
            for (int n = 0; n < GpuSiirtojaKehyksessa && siirrot.Count > 0; n++) Siirra(siirrot.Dequeue());
        }

        void MittaaHata()
        {
            if (Time.unscaledTime < seuraavaMittaus) return;
            seuraavaMittaus = Time.unscaledTime + 1;
            long v = CesiumKaupunki.VapaaMuisti();
            if (v <= 0 || !hata.Paivita(v / 1e9, Time.unscaledTime)) return;
            budjetti = MuseoBudjetti.Laitteelle(SystemInfo.systemMemorySize / 1024.0, hata.Taso);
            varasto.Muuta(budjetti.RuutuPaikat);
            foreach (var k in new List<int>(paikat.Keys)) if (!varasto.Onko(paikat[k].avain, out int i) || i != k) VapautaPaikka(k);
            if (budjetti.RuutuPaikat == 0) siirrot.Clear();
            Kirjaa?.Invoke($"museo: MUISTIHÄTÄ {hata.Taso} vapaa {v / 1e9:F2} Gt → ruutupaikat {budjetti.RuutuPaikat}, seinät ohita {budjetti.SeinaOhita}");
        }

        // --- Seinätaso ---------------------------------------------------------------------------------------------------------
        void Seina(string id)
        {
            if (seinat.ContainsKey(id) || haussa.Contains(id) || puuttuu.Contains(id)) return;
            haussa.Add(id);
            StartCoroutine(HaeSeina(id));
        }

        IEnumerator HaeSeina(string id)
        {
            byte[] json = null, data = null;
            var kp0 = Paikka(id);
            // Pyramidi teokset.v2.json:n px:stä (paketti tehty samasta lähteestä); paketin teos.json vain, jos px puuttuu.
            if (kp0 != null && kp0.PxLeveys > 0 && kp0.PxKorkeus > 0) pyramidit[id] = new TeosPyramidi(id, kp0.PxLeveys, kp0.PxKorkeus);
            else
            {
                yield return Hae(Url(id) + "teos.json", b => json = b);
                if (json != null && Matkakirja.Peli.MiniJson.Jasenna(System.Text.Encoding.UTF8.GetString(json)) is Dictionary<string, object> d)
                    pyramidit[id] = new TeosPyramidi(id, Convert.ToInt32(d["leveys"]), Convert.ToInt32(d["korkeus"]));
            }
            if (pyramidit.ContainsKey(id)) yield return Hae(Url(id) + "seina.astcm", b => data = b);
            haussa.Remove(id);
            string syy = data == null ? "lataus" : null;
            // iOS-simulaattorin GPU ei tue ASTC:tä (DioraamaAstc.AstcTuettu) → syy "laite ei tue", JPEG-vara (EiPakettia) kuten suunniteltu.
            var kuva = data != null ? DioraamaAstc.Lue(data, "Museo seinä " + id, out syy, TextureWrapMode.Clamp, budjetti.SeinaOhita) : null;
            if (kuva == null) { puuttuu.Add(id); Kirjaa?.Invoke($"museo: {id} ei pakettia ({(pyramidit.ContainsKey(id) ? "seina.astcm" : "teos.json")} {Url(id)}: {syy ?? "-"}), paikkakuva jää"); EiPakettia?.Invoke(id); yield break; }
            seinat[id] = kuva; seinaJarjestys.Add(id);
            Kirjaa?.Invoke($"museo: {id} seinätaso {kuva.width}×{kuva.height} ASTC");
            SeinaTavut += MuseoMuisti.AstcTavut(kuva.width, kuva.height);
            var kp = Paikka(id);
            if (kp?.Materiaali != null)
            {
                if (!paikkakuvat.ContainsKey(id)) paikkakuvat[id] = kp.Materiaali.mainTexture as Texture2D;
                kp.Materiaali.mainTexture = kuva;
            }
            KarsiSeinat();
        }

        /// <summary>Seinätasojen budjetti (MuseoBudjetti.SeinatTavut): vanhimmat, joita kierros ei nyt tarvitse, takaisin paikkakuviksi.</summary>
        void KarsiSeinat()
        {
            for (int i = 0; SeinaTavut > MuseoBudjetti.SeinatTavut && i < seinaJarjestys.Count;)
            {
                string id = seinaJarjestys[i];
                if (tarvitaan.Contains(id)) { i++; continue; }
                seinaJarjestys.RemoveAt(i);
                var k = seinat[id]; seinat.Remove(id);
                SeinaTavut -= MuseoMuisti.AstcTavut(k.width, k.height);
                var kp = Paikka(id);
                if (kp?.Materiaali != null && paikkakuvat.TryGetValue(id, out var pk)) kp.Materiaali.mainTexture = pk;
                Destroy(k);
            }
        }

        // --- Yksityiskohtaruudut -----------------------------------------------------------------------------------------------
        static readonly Vector3[] kulmat = new Vector3[4];
        static readonly Plane[] tasot = new Plane[1];

        /// <summary>Näkyvä osa teoksesta ja näytön pikselit teoksen leveydellä: näytön kulmien säteet kankaan tasolle.</summary>
        static List<RuutuAvain> Nakyvat(Camera kam, TeosPyramidi p, Kuvapaikka kp, int paikkoja)
        {
            var t = kp.Isa;
            var keski = t.TransformPoint(new Vector3(0, 0, kp.Z));
            var taso = new Plane(t.TransformDirection(Vector3.forward), keski);
            float u0 = 1, u1 = 0, v0 = 1, v1 = 0;
            Vector2[] nk = { new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1) };
            foreach (var n in nk)
            {
                var s = kam.ViewportPointToRay(n);
                if (!taso.Raycast(s, out float e)) { u0 = v0 = 0; u1 = v1 = 1; break; }
                var l = t.InverseTransformPoint(s.GetPoint(e));
                float u = l.x / kp.Leveys + 0.5f, vy = 0.5f - l.y / kp.Korkeus;   // v ylhäältä
                u0 = Mathf.Min(u0, u); u1 = Mathf.Max(u1, u); v0 = Mathf.Min(v0, vy); v1 = Mathf.Max(v1, vy);
            }
            var a = kam.WorldToScreenPoint(t.TransformPoint(new Vector3(-kp.Leveys / 2, 0, kp.Z)));
            var b = kam.WorldToScreenPoint(t.TransformPoint(new Vector3(kp.Leveys / 2, 0, kp.Z)));
            double px = a.z > 0 && b.z > 0 ? Vector2.Distance(a, b) : 0;
            return px <= 0 ? new List<RuutuAvain>() : RuutuValinta.Ruudut(p, px, u0, v0, u1, v1, paikkoja);
        }

        void HaeRuutu(RuutuAvain a)
        {
            string url = Url(a.Teos) + a.Polku;
            if (!haussa.Add(url)) return;
            ruutujaHaussa++;
            StartCoroutine(Hae(url, b => { haussa.Remove(url); ruutujaHaussa--; if (b != null && a.Teos == nykyinen) siirrot.Enqueue((a, b)); }));
        }

        void Siirra((RuutuAvain avain, byte[] data) s)
        {
            if (s.avain.Teos != nykyinen || varasto.Onko(s.avain, out _)) return;
            int i = varasto.Lisaa(s.avain, out var pois);
            if (i < 0) return;
            if (pois.HasValue) VapautaPaikka(i);
            var kuva = Ruutukuva(s.data, s.avain.ToString());
            if (kuva == null) return;
            var kp = Paikka(s.avain.Teos); var p = pyramidit[s.avain.Teos];
            var go = GameObject.CreatePrimitive(PrimitiveType.Quad);
            Destroy(go.GetComponent<Collider>());
            go.name = "Ruutu " + s.avain; go.layer = kp.Isa.gameObject.layer;
            go.transform.SetParent(kp.Isa, false);
            // Ruudun sisältö tasolla z: x0..x1 × y0..y1 (px, y ylhäältä); reunaruudussa täyte jää näkymättä (tekstuurin mittakaava).
            int lw = p.LeveysTasolla(s.avain.Z), lh = p.KorkeusTasolla(s.avain.Z), R = TeosPyramidi.Ruutu;
            int x0 = s.avain.X * R, y0 = s.avain.Y * R, cw = Math.Min(R, lw - x0), ch = Math.Min(R, lh - y0);
            float w = kp.Leveys * cw / lw, h = kp.Korkeus * ch / lh;
            float cx = -kp.Leveys / 2 + kp.Leveys * (x0 + cw / 2f) / lw, cy = kp.Korkeus / 2 - kp.Korkeus * (y0 + ch / 2f) / lh;
            // Unityn Quad on XY-tasossa etupuoli −Z:aan = ulos seinästä (MuseoRakennus: +Z seinään, +X katsojan oikealle).
            go.transform.localPosition = new Vector3(cx, cy, kp.Z - 0.0003f - 0.0001f * s.avain.Z);   // tarkempi taso edempänä
            go.transform.localScale = new Vector3(w, h, 1);
            var mat = new Material(kp.Materiaali) { name = "Ruutu " + s.avain, mainTexture = kuva };
            // Rivit alhaalta ylös: sisältö on tekstuurin yläosassa (täyte alhaalla ja oikealla).
            mat.mainTextureScale = new Vector2((float)cw / R, (float)ch / R);
            mat.mainTextureOffset = new Vector2(0, 1 - (float)ch / R);
            go.GetComponent<MeshRenderer>().sharedMaterial = mat;
            go.GetComponent<MeshRenderer>().shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            paikat[i] = (s.avain, kuva, go, mat);
            NaytaRuudut();
        }

        /// <summary>Näkyvissä vain nykyisen teoksen ruudut (muut jäävät LRU-paikkoihin paluuta varten).</summary>
        void NaytaRuudut()
        {
            foreach (var kv in paikat) if (kv.Value.go != null) kv.Value.go.SetActive(kv.Value.avain.Teos == nykyinen);
        }

        void VapautaPaikka(int i)
        {
            if (!paikat.TryGetValue(i, out var p)) return;
            if (p.go != null) Destroy(p.go);
            if (p.mat != null) Destroy(p.mat);
            if (p.kuva != null) Destroy(p.kuva);
            paikat.Remove(i);
        }

        static Texture2D Ruutukuva(byte[] t, string nimi)
        {
            int R = TeosPyramidi.Ruutu;
            if (t == null || t.Length != 16 + MuseoMuisti.RuutuTavut || t[0] != 0x13 || t[4] != 6 || t[5] != 6) return null;
            if (!SystemInfo.SupportsTextureFormat(TextureFormat.ASTC_6x6)) return null;
            var kuva = new Texture2D(R, R, TextureFormat.ASTC_6x6, false) { name = nimi, filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp };
            var kahva = System.Runtime.InteropServices.GCHandle.Alloc(t, System.Runtime.InteropServices.GCHandleType.Pinned);
            try { kuva.LoadRawTextureData(kahva.AddrOfPinnedObject() + 16, t.Length - 16); }
            finally { kahva.Free(); }
            kuva.Apply(false, true);
            return kuva;
        }

        /// <summary>Teoksen paketin juuri (päättyy /).</summary>
        string Url(string id) => Paikka(id) is { Paketti: { Length: > 0 } pk } && MaaJuuri != null ? MaaJuuri + (pk.EndsWith("/") ? pk : pk + "/") : Juuri + id + "/";

        // --- Lataus ja levyvälimuisti ------------------------------------------------------------------------------------------
        static string Valimuisti(string url)
        {
            int i = url.IndexOf("/taidemuseo/", StringComparison.Ordinal);
            return Path.Combine(Application.temporaryCachePath, "museo", i >= 0 ? url.Substring(i + 12) : url.GetHashCode().ToString("x8"));
        }

        /// <summary>Lataus levyvälimuistin kautta (myös MuseoRakennus.LataaSali).</summary>
        internal static IEnumerator Hae(string url, Action<byte[]> valmis)
        {
            string polku = Valimuisti(url);
            if (File.Exists(polku)) { byte[] b = null; try { b = File.ReadAllBytes(polku); } catch { } if (b != null) { valmis(b); yield break; } }
            using var r = UnityWebRequest.Get(url);
            r.timeout = 30;
            yield return r.SendWebRequest();
            if (r.result != UnityWebRequest.Result.Success) { valmis(null); yield break; }
            var data = r.downloadHandler.data;
            try { Directory.CreateDirectory(Path.GetDirectoryName(polku)); File.WriteAllBytes(polku, data); } catch { }
            valmis(data);
        }

        /// <summary>Museosta poistuttaessa: kaikki tekstuurit pois (MuseoRakennus tuhoaa materiaalit ja kappaleet).</summary>
        public void Vapauta()
        {
            StopAllCoroutines();
            foreach (var k in new List<int>(paikat.Keys)) VapautaPaikka(k);
            foreach (var s in seinat.Values) if (s != null) Destroy(s);
            seinat.Clear(); seinaJarjestys.Clear(); paikkakuvat.Clear(); pyramidit.Clear(); haussa.Clear(); puuttuu.Clear(); siirrot.Clear(); ruutujaHaussa = 0;
            varasto = new RuutuVarasto(budjetti.RuutuPaikat); SeinaTavut = 0; nykyinen = null;
        }

        void OnDestroy() => Vapauta();
    }
}
