using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja
{
    /// <summary>
    /// Navat kuten verkkopelissä (js/pallo.js NAPAKANNET ja NAPAKALOTIT). Web Mercator -laatat
    /// päättyvät 85,05°:een, ja niiden yläreunassa on sauma; Cesium jättää yläpuolelle paljaan
    /// ellipsoidin (omistajan löydös 14, build 6: mustat sektorit ja harmaat täplät navoilla).
    ///
    /// KALOTTI: kummallekin navalle oma atsimutaalinen ekvidistantti karttakuva ämpäristä
    /// (Karttasepän tools/tee-napakalotit.mjs), napa kuvan keskellä, nollameridiaani ylöspäin,
    /// kuvan reuna 80° N ja 60° S. Kuvan ulkokehä on häivytetty läpinäkyväksi, joten kalotti
    /// piirretään laattojen PÄÄLLE ja liukuu niihin. Haku kulkee Laattapalvelimen kautta
    /// (välimuisti, offline: Alueet lataa kalotit maailman mukana).
    ///
    /// KANSI on varakappale: yksivärinen 83,7°:sta napaan ja 0,4°:n häive peitolla 0,4. Se näkyy,
    /// kunnes kalotti on ladattu (verkko poikki tai 404: pallo piirtyy kuten ennen kalotteja).
    /// Reliefilinssin ajan kalotti on piilossa ja kansi reliefin sävyssä (web NAPAKANSI_RELIEFI_*),
    /// KarttaKerrokset kertoo tilan (<see cref="Reliefi"/>).
    ///
    /// Kappaleet ovat pinnan korkeudella (ei liukumista laattojen suhteen), ja maaston yli ne nostaa
    /// varjostimen syvyysnosto (Napakansi.shader). Värit sovitetaan laattoihin
    /// <see cref="laattojenSavy"/>-kertoimella: laatat ovat Cesiumin PBR-materiaalia, kansi ja
    /// kalotti Lambertia (simulaattorikaappaus 23.9.: web #c9c2af näkyi laattojen vieressä
    /// sävynä #bab6a6).
    /// </summary>
    public class NapaKannet : MonoBehaviour
    {
        /// <summary>Kannen peittävä raja (web NAPAKANNEN_LEVEYS, mitattu laattasauman alapuolelle).</summary>
        public const double KannenLeveys = 83.7;
        /// <summary>Häiveen lisäleveys asteina ja peitto (web NAPAKANNEN_HAIVE, NAPAKANNEN_HAIVEPEITTO).</summary>
        public const double KannenHaive = 0.4;
        public const float KannenHaivePeitto = 0.4f;
        /// <summary>Kannen sävyt: Jäämeren merisävy ja napajää laatoissa (web NAPAKANSI_POHJOINEN/ETELA).</summary>
        public static readonly Color32 KansiPohjoinen = new Color32(0xc9, 0xc2, 0xaf, 0xff);
        public static readonly Color32 KansiEtela = new Color32(0xdc, 0xd6, 0xc6, 0xff);
        /// <summary>Reliefilinssin sävyt: avomeri ja mannerjää (web MERIVARI, JAAVARI).</summary>
        public static readonly Color32 ReliefiPohjoinen = new Color32(38, 78, 145, 0xff);
        public static readonly Color32 ReliefiEtela = new Color32(236, 240, 244, 0xff);

        /// <summary>Kalottikuvien versio ämpärissä (web NAPAKALOTTI_VERSIO).</summary>
        public const string KalottiVersio = "2026-09-11b";
        /// <summary>
        /// Tiedostopääte (web NAPAKALOTTI_PAATE). iOS-laitteella ImageIO purkaa webp:n, png:n ja jpg:n
        /// (Plugins/iOS/MatkakirjaKuvat.mm), joten PNG-erä käy vaihtamalla tämä ja versio.
        /// </summary>
        public static string KalottiPaate = "webp";
        /// <summary>Kalotin polku ämpärissä (ilman juurta; sama avain Laattapalvelimen offline-kansiossa).</summary>
        public static string KalotinPolku(string puoli) => $"julisteet/pallo/napakalotit/{KalottiVersio}/{puoli}.{KalottiPaate}";
        public static string KalotinUrl(string puoli) => Laattapalvelin.Ampari + KalotinPolku(puoli);
        /// <summary>Offline-lataukseen maailman mukana (Alueet).</summary>
        public static IEnumerable<string> OfflinePolut()
        {
            yield return KalotinPolku("pohjoinen");
            yield return KalotinPolku("etela");
        }

        public CesiumGeoreference georeferenssi;
        [Tooltip("Materiaalipohja (Matkakirja/Napakansi). Värit asetetaan ajossa; kalottien materiaalit kopioidaan tästä.")]
        public Material pohjoinen;
        public Material etela;
        public int sektoreita = 96;
        public int kehia = 16;
        [Tooltip("Kalotin renkaat navalta kuvan reunaan (web kalotinVerkko 40).")]
        public int kalotinKehia = 40;
        [Tooltip("Kalotin sektorit (web 128).")]
        public int kalotinSektoreita = 128;
        [Tooltip("Kappaleiden korkeus ellipsoidista metreinä. Maaston yli ne nostaa syvyysnosto.")]
        public double pinnanKorkeus = 0.0;
        [Tooltip("Syvyyden nosto metreinä: Etelämantereen korkein huippu 4 892 m, Pohjoisen kalotin alue alle 3 000 m.")]
        public float syvyysnosto = 6000f;
        [Tooltip("Kerroin (lineaarisena), jolla Lambert-kansi ja -kalotti vastaavat Cesiumin laattojen valaistusta.")]
        public Color laattojenSavy = new Color32(236, 240, 242, 255);
        [Tooltip("Kuvan pisin sivu laitteilla, joiden muisti on alle isoMuistiMt (etelä 4096² + mipit = 85 Mt).")]
        public int pieniSivu = 2048;
        public int isoMuistiMt = 5500;

        sealed class Napa
        {
            public string Puoli;
            public int Merkki;
            public double Reuna;
            public Color32 Savy, ReliefiSavy;
            public GameObject Kansi, Kalotti;
            public Material KansiMateriaali, KalotinMateriaali;
            public Texture2D Kuva;
        }

        readonly List<Napa> navat = new List<Napa>();
        readonly List<Mesh> verkot = new List<Mesh>();
        bool nakyvat = true, reliefi, purettu;

        /// <summary>KarttaKerrokset "napakannet": kannet ja kalotit.</summary>
        public void Nakyvat(bool nakyy) { nakyvat = nakyy; Paivita(); }

        /// <summary>Reliefi on pohjan tilalla (KarttaKerrokset): kalotti piiloon, kansi reliefin sävyyn.</summary>
        public void Reliefi(bool paalla)
        {
            if (reliefi == paalla) return;
            reliefi = paalla;
            Paivita();
        }

        /// <summary>Mittareille: onko kalotti ladattu ("pohjoinen" / "etela").</summary>
        public bool KalottiLadattu(string puoli) => navat.Find(n => n.Puoli == puoli)?.Kalotti != null;

        void Start()
        {
            if (georeferenssi == null) georeferenssi = GetComponentInParent<CesiumGeoreference>();
            navat.Add(TeeNapa("pohjoinen", +1, 80.0, KansiPohjoinen, ReliefiPohjoinen, pohjoinen));
            navat.Add(TeeNapa("etela", -1, 60.0, KansiEtela, ReliefiEtela, etela != null ? etela : pohjoinen));
            Paivita();
            StartCoroutine(LataaKalotit());
        }

        void OnDestroy()
        {
            purettu = true;
            foreach (var n in navat)
            {
                if (n.KansiMateriaali != null) Destroy(n.KansiMateriaali);
                if (n.KalotinMateriaali != null) Destroy(n.KalotinMateriaali);
                if (n.Kuva != null) Destroy(n.Kuva);
            }
            foreach (var v in verkot) if (v != null) Destroy(v);
        }

        Napa TeeNapa(string puoli, int merkki, double reuna, Color32 savy, Color32 reliefiSavy, Material malli)
        {
            var n = new Napa { Puoli = puoli, Merkki = merkki, Reuna = reuna, Savy = savy, ReliefiSavy = reliefiSavy };
            n.KansiMateriaali = new Material(malli) { name = "Napakansi " + puoli };
            n.KansiMateriaali.SetFloat("_Nosto", syvyysnosto);
            // Täysi kansi KannenLeveys:stä napaan, sen ulkopuolella häive vakiopeitolla (webissä
            // toinen kappale samassa sävyssä: kaksinkertainen piirto ei muuta väriä kannen päällä).
            var leveydet = new List<double>();
            var alfat = new List<float>();
            for (int k = 0; k <= kehia; k++)
            {
                leveydet.Add(90.0 - (90.0 - KannenLeveys) * k / kehia);
                alfat.Add(1f);
            }
            leveydet.Add(KannenLeveys); alfat.Add(KannenHaivePeitto);
            leveydet.Add(KannenLeveys - KannenHaive); alfat.Add(KannenHaivePeitto);
            n.Kansi = Kappale("Napakansi " + puoli, Verkko(merkki, leveydet, alfat, sektoreita, 0.0), n.KansiMateriaali);
            return n;
        }

        void Paivita()
        {
            foreach (var n in navat)
            {
                bool kuva = n.Kalotti != null;
                n.KansiMateriaali.SetColor("_BaseColor", Savytetty(reliefi ? n.ReliefiSavy : n.Savy));
                // Kansi pois, kun kartta on paikallaan (web 11.9.: kansi piirtyi muuten kalotin päälle).
                n.Kansi.SetActive(nakyvat && (reliefi || !kuva));
                if (kuva) n.Kalotti.SetActive(nakyvat && !reliefi);
            }
        }

        /// <summary>Webin sävy laattojen valaistukseen: kerroin lineaarisena, tulos sRGB-värinä materiaaliin.</summary>
        Color Savytetty(Color32 vari)
        {
            Color l = ((Color)vari).linear, s = laattojenSavy.linear;
            return new Color(l.r * s.r, l.g * s.g, l.b * s.b, 1f).gamma;
        }

        GameObject Kappale(string nimi, Mesh verkko, Material materiaali)
        {
            var go = new GameObject(nimi);
            go.transform.SetParent(georeferenssi.transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = verkko;
            go.AddComponent<MeshRenderer>().sharedMaterial = materiaali;
            return go;
        }

        /// <summary>
        /// Kalotti tai kansi: renkaat navalta ulospäin (leveydet itseisarvoina; kaksi samaa leveyttä
        /// peräkkäin = kova alfan porras ilman kolmioita väliin). kuvanReuna &gt; 0: UV kalotin kuvasta.
        /// </summary>
        Mesh Verkko(int merkki, List<double> leveydet, List<float> alfat, int sektorit, double kuvanReuna)
        {
            int renkaat = leveydet.Count;
            int n = renkaat * (sektorit + 1);
            var paikat = new Vector3[n];
            var normaalit = new Vector3[n];
            var varit = new Color[n];
            var uvt = kuvanReuna > 0 ? new Vector2[n] : null;
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            int i = 0;
            for (int k = 0; k < renkaat; k++)
            {
                double lat = merkki * leveydet[k];
                // Atsimutaalinen ekvidistantti: etäisyys kuvan keskeltä ∝ etäisyys navasta asteina.
                double r = kuvanReuna > 0 ? (90.0 - leveydet[k]) / (90.0 - kuvanReuna) : 0.0;
                for (int s = 0; s <= sektorit; s++)
                {
                    double lon = -180.0 + 360.0 * s / sektorit;
                    double3 ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                        new double3(lon, lat, pinnanKorkeus));
                    double3 u = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
                    paikat[i] = (float3)u;
                    normaalit[i] = (float3)math.normalize(u - keskus);
                    varit[i] = new Color(1, 1, 1, alfat[k]);
                    if (uvt != null)
                    {
                        // Web kalotinKuvapiste: nollameridiaani kuvassa ylöspäin; pohjoisnavan päältä
                        // katsottuna itä on vasemmalla, etelänavan alta oikealla (väärä suunta = peilikuva).
                        // Kuvan y kasvaa alaspäin, tekstuurin v ylöspäin: v = 1 − y.
                        double kulma = math.radians(merkki > 0 ? -lon : lon);
                        uvt[i] = new Vector2((float)(0.5 + 0.5 * r * math.sin(kulma)), (float)(0.5 + 0.5 * r * math.cos(kulma)));
                    }
                    i++;
                }
            }
            var kolmiot = new List<int>((renkaat - 1) * sektorit * 6);
            for (int k = 0; k < renkaat - 1; k++)
            {
                if (leveydet[k] == leveydet[k + 1]) continue;
                for (int s = 0; s < sektorit; s++)
                {
                    int a = k * (sektorit + 1) + s, b = a + 1;
                    int c = a + sektorit + 1, d = c + 1;
                    // Kierto valitaan niin, että etupuoli osoittaa ulospäin kummallakin navalla.
                    if (merkki > 0) kolmiot.AddRange(new[] { a, c, b, b, c, d });
                    else kolmiot.AddRange(new[] { a, b, c, b, d, c });
                }
            }
            var m = new Mesh { name = kuvanReuna > 0 ? "Napakalotti" : "Napakansi" };
            m.vertices = paikat;
            m.normals = normaalit;
            m.colors = varit;
            if (uvt != null) m.uv = uvt;
            m.SetTriangles(kolmiot, 0);
            m.RecalculateBounds();
            verkot.Add(m);
            return m;
        }

        IEnumerator LataaKalotit()
        {
            // Yksi kerrallaan: etelän purettu kuva mipmappeineen on 85 Mt, eikä kahta pidetä muistissa yhtä aikaa.
            foreach (var n in navat.ToArray())
            {
                if (purettu) yield break;
                yield return StartCoroutine(LataaKalotti(n));
            }
        }

        IEnumerator LataaKalotti(Napa n)
        {
            using var pyynto = UnityWebRequest.Get(Laattapalvelin.Paikallinen(KalotinUrl(n.Puoli)));
            pyynto.timeout = 60;
            yield return pyynto.SendWebRequest();
            if (purettu) yield break;
            if (pyynto.result != UnityWebRequest.Result.Success)
            {
                Debug.LogWarning($"MATKAKIRJA napakalotti {n.Puoli}: {pyynto.error}; varakansi jää");
                yield break;
            }
            byte[] tavut = pyynto.downloadHandler.data;
            Texture2D kuva = null;
#if UNITY_IOS && !UNITY_EDITOR
            // Unity ei pura WebP:tä; ImageIO purkaa taustasäikeessä esikerrotuksi RGBA:ksi mipmappeineen.
            // Pienen muistin laitteella pisin sivu rajataan (etelä 4096 → 2048, pohjoinen on jo 2048).
            int sivu = SystemInfo.systemMemorySize < isoMuistiMt ? pieniSivu : 0;
            var tyo = Task.Run(() =>
            {
                IntPtr p = MatkakirjaKuvat_Pura(tavut, tavut.Length, sivu, out int w, out int h, out int koko);
                return (p, w, h, koko);
            });
            while (!tyo.IsCompleted) yield return null;
            var (data, leveys, korkeus, koko) = tyo.Result;
            if (data == IntPtr.Zero)
            {
                Debug.LogWarning($"MATKAKIRJA napakalotti {n.Puoli}: kuvan purku epäonnistui; varakansi jää");
                yield break;
            }
            if (purettu) { MatkakirjaKuvat_Vapauta(data); yield break; }
            try
            {
                kuva = new Texture2D(leveys, korkeus, TextureFormat.RGBA32, Mipit(leveys, korkeus), true);
                kuva.LoadRawTextureData(data, koko);
            }
            finally { MatkakirjaKuvat_Vapauta(data); }
            kuva.Apply(false, true);
#else
            // Editori: Unity ei pura WebP:tä (ImageConversion: PNG, JPG, EXR), joten Mac-editorissa
            // sips muuntaa sen PNG:ksi, jotta kalotin voi tarkistaa pelitilassa.
            if (OnWebp(tavut))
            {
                var tyo = Task.Run(() => SipsPng(tavut));
                while (!tyo.IsCompleted) yield return null;
                tavut = tyo.Result;
                if (purettu) yield break;
                if (tavut == null)
                {
                    Debug.LogWarning($"MATKAKIRJA napakalotti {n.Puoli}: WebP ei purkaudu tällä alustalla; varakansi jää");
                    yield break;
                }
            }
            var lahde = new Texture2D(2, 2, TextureFormat.RGBA32, false);
            if (!lahde.LoadImage(tavut))
            {
                Destroy(lahde);
                Debug.LogWarning($"MATKAKIRJA napakalotti {n.Puoli}: kuvan purku epäonnistui; varakansi jää");
                yield break;
            }
            // Sama muoto kuin laitteella: esikerrottu, sRGB-tavut lineaarisessa tekstuurissa.
            var px = lahde.GetPixels32();
            for (int i = 0; i < px.Length; i++)
            {
                var c = px[i];
                px[i] = new Color32((byte)((c.r * c.a + 127) / 255), (byte)((c.g * c.a + 127) / 255), (byte)((c.b * c.a + 127) / 255), c.a);
            }
            kuva = new Texture2D(lahde.width, lahde.height, TextureFormat.RGBA32, true, true);
            Destroy(lahde);
            kuva.SetPixels32(px);
            kuva.Apply(true, true);
#endif
            kuva.name = "Napakalotti " + n.Puoli;
            kuva.wrapMode = TextureWrapMode.Clamp;
            kuva.filterMode = FilterMode.Trilinear;
            kuva.anisoLevel = 4;
            Asenna(n, kuva);
            Debug.Log($"MATKAKIRJA napakalotti {n.Puoli}: {kuva.width}×{kuva.height}, {kuva.mipmapCount} mipiä");
        }

        void Asenna(Napa n, Texture2D kuva)
        {
            n.Kuva = kuva;
            n.KalotinMateriaali = new Material(n.KansiMateriaali) { name = "Napakalotti " + n.Puoli };
            n.KalotinMateriaali.SetTexture("_MainTex", kuva);
            n.KalotinMateriaali.SetColor("_BaseColor", laattojenSavy);
            // Kuvan ala: napa → reuna (80° N / 60° S); häivytys on kuvan omassa alfassa.
            var leveydet = new List<double>();
            var alfat = new List<float>();
            for (int k = 0; k <= kalotinKehia; k++)
            {
                leveydet.Add(90.0 - (90.0 - n.Reuna) * k / kalotinKehia);
                alfat.Add(1f);
            }
            n.Kalotti = Kappale("Napakalotti " + n.Puoli, Verkko(n.Merkki, leveydet, alfat, kalotinSektoreita, n.Reuna), n.KalotinMateriaali);
            Paivita();
        }

        static int Mipit(int w, int h)
        {
            int m = 1;
            while (w > 1 || h > 1) { w = Math.Max(1, w / 2); h = Math.Max(1, h / 2); m++; }
            return m;
        }

#if UNITY_IOS && !UNITY_EDITOR
        [DllImport("__Internal")]
        static extern IntPtr MatkakirjaKuvat_Pura(byte[] tavut, int pituus, int sivu, out int leveys, out int korkeus, out int koko);
        [DllImport("__Internal")]
        static extern void MatkakirjaKuvat_Vapauta(IntPtr puskuri);
#else
        static bool OnWebp(byte[] t) =>
            t != null && t.Length > 12 && t[0] == 'R' && t[1] == 'I' && t[2] == 'F' && t[3] == 'F'
            && t[8] == 'W' && t[9] == 'E' && t[10] == 'B' && t[11] == 'P';

        /// <summary>WebP → PNG macOS:n sips-työkalulla (vain Mac-editori); muualla null.</summary>
        static byte[] SipsPng(byte[] webp)
        {
            if (Application.platform != RuntimePlatform.OSXEditor) return null;
            string kansio = Path.Combine(Path.GetTempPath(), "matkakirja-kalotti-" + Guid.NewGuid().ToString("N"));
            try
            {
                Directory.CreateDirectory(kansio);
                string sisaan = Path.Combine(kansio, "k.webp"), ulos = Path.Combine(kansio, "k.png");
                File.WriteAllBytes(sisaan, webp);
                var ohje = new System.Diagnostics.ProcessStartInfo("/usr/bin/sips", $"-s format png \"{sisaan}\" --out \"{ulos}\"")
                {
                    UseShellExecute = false,
                    CreateNoWindow = true,
                };
                using (var p = System.Diagnostics.Process.Start(ohje)) p?.WaitForExit(30000);
                return File.Exists(ulos) ? File.ReadAllBytes(ulos) : null;
            }
            catch (Exception e)
            {
                Debug.LogWarning("MATKAKIRJA napakalotti: sips " + e.Message);
                return null;
            }
            finally
            {
                try { Directory.Delete(kansio, true); } catch (Exception) { }
            }
        }
#endif
    }
}
