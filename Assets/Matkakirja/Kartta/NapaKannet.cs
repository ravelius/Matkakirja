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
    /// Reliefilinssin ajan kalotti ja kansi ovat piilossa ja niiden tilalla reliefikansi reliefin sävyissä
    /// (web NAPAKANSI_RELIEFI_*; natiivissa reliefisarjan reunaan asti, <see cref="ReliefinJaaraja"/>, löydös 99);
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
        /// <summary>Reliefilinssin sävyt: avomeri ja mannerjää (web MERIVARI, JAAVARI). Pohjoinen reliefikansi käyttää
        /// mitattua reunaa (<see cref="ReliefinPohjoisreuna"/>), eteläinen jään sävyä.</summary>
        public static readonly Color32 ReliefiPohjoinen = new Color32(38, 78, 145, 0xff);
        public static readonly Color32 ReliefiEtela = new Color32(236, 240, 244, 0xff);
        /// <summary>
        /// RELIEFIKANSI (omistajan löydös 99, build 13: topografian navat pyöreinä reikinä). Reliefisarja
        /// (Topografia.ReliefiSarja 20260924) on poltettu 84,0° N:n ja 65,4° S:n väliin (mitattu 25.9. z5-laatoista:
        /// viimeinen reliefirivi 84,0° kaikilla 32 sarakkeella ja −65,40…−65,44° kolmella), ja ulkopuoli on maalattu
        /// avomeren sinisellä (MERIVARI 37,78,144). Reliefin ajaksi kummallakin navalla on oma kansi kannen tilalla:
        ///  • ETELÄ: Etelämanner oli valtamerta, ja 83,7°:sta alkava jäänvalkea kansi näkyi pyöreänä reikänä. Web maalaa
        ///    saman aukon jään sävyllä (js/reliefipyramidi.js JAARAJA_LAT −65 ja reliefinTaustavari, käyttö
        ///    js/pallolaatat.js puuttuvan reliefilaatan taustassa), joten kansi ulottuu reliefin reunaan
        ///    <see cref="ReliefinJaaraja"/> ja häivyttyy sen sisäpuolella <see cref="ReliefinEtelaHaive"/> asteen matkalla
        ///    (alla on sarjan tasainen merensininen, joten häive on meren ja jään liuku eikä vaalea vyö).
        ///  • POHJOINEN: MERIVARI-kansi erottui tummana kiekkona (Natiivisepän kuva 25.9.), koska reliefi 84°:ssa on
        ///    matalan meren ja jään vaaleampaa sinistä ja vaihtelee pituusasteen mukaan (38,78,143 … 150,196,231).
        ///    Kannen reunan väri on siksi mitattu laatoista pituusasteittain (<see cref="ReliefinPohjoisreuna"/>) ja
        ///    liukuu navalle keskiarvoon; kansi on täysi 84,0°:een ja häivyttyy ulos 83,0°:een.
        /// </summary>
        public const double ReliefinJaaraja = 65.4;
        public const double ReliefinEtelaHaive = 3.0;
        public const double ReliefinPohjoisraja = 84.0;
        public const double ReliefinPohjoisHaive = 1.0;
        /// <summary>
        /// Reliefin väri 83,75–83,95° N (z5-laattojen rivit 6–48, tasoaltaan puoliskon keskiarvo), 64 näytettä
        /// 5,625°:n välein pituusasteelta −180 alkaen (näyte i kohdassa −180 + (i + 0,5)·5,625). Sidottu
        /// Topografia.ReliefiSarjan versioon 20260924: uusi poltto = uusi mittaus.
        /// </summary>
        public const string ReliefinPohjoisreuna =
            "4273ae 4575ae 3c689e 4374b0 4070ab 3c6daa 3e6faa 3e6eaa " +
            "325f9d 3561a1 3a69a8 3b6ba7 4071ad 4b7eb9 4e80b6 4d80b8 " +
            "5589c2 6196ca 7bafdb 8cbde4 83b5e0 7fb3de 88bae2 89bae2 " +
            "89bbe2 96c4e7 94c3e6 6697c4 3f6da6 2b5594 325c9b 345d96 " +
            "2f5790 2b538f 264e8e 264e8f 264e8f 275091 295294 295294 " +
            "295294 2b5496 2e599a 325f9f 3360a1 3360a1 335fa0 2f5a9a " +
            "2c5798 2d5698 2c5594 2d5796 284f8e 29508c 244b8e 254c8d " +
            "2b5393 5183b8 4978ad 4372ab 315c99 3360a0 3562a3 3a69a7";

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
        [Tooltip("Syvyyden nosto metreinä ilman liioittelua: Etelämantereen korkein huippu 4 892 m, Pohjoisen kalotin alue alle 3 000 m. Kerrotaan KorkeusKertoimella.")]
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
            /// <summary>Reliefilinssin kansi kannen tilalla (ks. <see cref="ReliefinJaaraja"/>); värit kärkipisteissä.</summary>
            public GameObject Kansi, ReliefiKansi, Kalotti;
            public Material KansiMateriaali, KalotinMateriaali, ReliefiMateriaali;
            public Texture2D Kuva;
        }

        readonly List<Napa> navat = new List<Napa>();
        readonly List<Mesh> verkot = new List<Mesh>();
        bool nakyvat = true, reliefi, purettu;
        float nostoKerroin = float.NaN;

        /// <summary>KarttaKerrokset "napakannet": kannet ja kalotit.</summary>
        public void Nakyvat(bool nakyy) { nakyvat = nakyy; Paivita(); }

        /// <summary>Reliefi on pohjan tilalla (KarttaKerrokset): kalotti ja kansi piiloon, reliefikansi esiin.</summary>
        public void Reliefi(bool paalla)
        {
            if (reliefi == paalla) return;
            reliefi = paalla;
            Paivita();
        }

        /// <summary>
        /// Väritaso päällä (Varitaso): kalotti ja kansi saavat saman kerman kuin laatat (#faf4d6, peitto 0,80,
        /// vain maalle webin R − B -säännöllä varjostimessa), muuten navalla näkyisi värillinen kiekko.
        /// </summary>
        public void Kerma(bool paalla)
        {
            var c = new Color(250f / 255f, 244f / 255f, 214f / 255f, paalla ? 0.80f : 0f);
            foreach (var n in navat)
            {
                if (n.KansiMateriaali != null) n.KansiMateriaali.SetColor("_Kerma", c);
                if (n.KalotinMateriaali != null) n.KalotinMateriaali.SetColor("_Kerma", c);
                if (n.ReliefiMateriaali != null) n.ReliefiMateriaali.SetColor("_Kerma", c);
            }
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

        /// <summary>
        /// Syvyysnosto seuraa korkeuskerrointa (löydös 99): liioiteltu maasto (KorkeusKerroin 2, löydös 29) nousi
        /// Etelämantereella 6 000 m:n noston yli, ja sinisiksi maalatut reliefilaatat puskivat kannen läpi kaarina.
        /// </summary>
        void Update()
        {
            float k = KorkeusKerroin.Arvo;
            if (k == nostoKerroin) return;
            nostoKerroin = k;
            float nosto = syvyysnosto * Mathf.Max(1f, k);
            foreach (var n in navat)
            {
                if (n.KansiMateriaali != null) n.KansiMateriaali.SetFloat("_Nosto", nosto);
                if (n.KalotinMateriaali != null) n.KalotinMateriaali.SetFloat("_Nosto", nosto);
                if (n.ReliefiMateriaali != null) n.ReliefiMateriaali.SetFloat("_Nosto", nosto);
            }
        }

        void OnDestroy()
        {
            purettu = true;
            foreach (var n in navat)
            {
                if (n.KansiMateriaali != null) Destroy(n.KansiMateriaali);
                if (n.KalotinMateriaali != null) Destroy(n.KalotinMateriaali);
                if (n.ReliefiMateriaali != null) Destroy(n.ReliefiMateriaali);
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
            // Reliefikansi (ks. ReliefinJaaraja): väri kärkipisteissä (Napakansi.shader kertoo sillä), materiaalin
            // _BaseColor on laattojen valaistuskerroin kuten kalotilla.
            n.ReliefiMateriaali = new Material(n.KansiMateriaali) { name = "Napakansi reliefi " + puoli };
            n.ReliefiMateriaali.SetColor("_BaseColor", laattojenSavy);
            var rl = new List<double>();
            var ra = new List<float>();
            Func<double, double, Color> rv;
            if (merkki < 0)
            {
                // Täysi jää navalta häiveen sisäreunaan, siitä lineaarisesti läpinäkyväksi reliefin reunaan.
                double sisa = ReliefinJaaraja + ReliefinEtelaHaive;
                for (int k = 0; k <= kalotinKehia; k++)
                {
                    double lat = 90.0 - (90.0 - ReliefinJaaraja) * k / kalotinKehia;
                    rl.Add(lat);
                    ra.Add(lat >= sisa ? 1f : (float)((lat - ReliefinJaaraja) / ReliefinEtelaHaive));
                }
                Color jaa = Lineaarinen(reliefiSavy);
                rv = (lat, lon) => jaa;
            }
            else
            {
                // Täysi 84,0°:een (sarjan tasainen MERIVARI-kaista peittyy), häive ulos 83,0°:een reliefin päälle.
                for (int k = 0; k <= kehia; k++) { rl.Add(90.0 - (90.0 - ReliefinPohjoisraja) * k / kehia); ra.Add(1f); }
                for (int k = 1; k <= 4; k++)
                {
                    rl.Add(ReliefinPohjoisraja - ReliefinPohjoisHaive * k / 4);
                    ra.Add(1f - k / 4f);
                }
                var reunat = Pohjoisreuna();
                var keski = new Color(0f, 0f, 0f, 0f);
                foreach (var c in reunat) keski += c / reunat.Length;
                rv = (lat, lon) =>
                {
                    // Reunaväri pituusasteen mukaan (näytteiden välissä lineaarisesti), navalle päin keskiarvoon.
                    double x = (lon + 180.0) / 360.0 * reunat.Length - 0.5;
                    int i0 = (int)Math.Floor(x);
                    float t = (float)(x - i0);
                    int n0 = (i0 % reunat.Length + reunat.Length) % reunat.Length, n1 = (n0 + 1) % reunat.Length;
                    Color r = Color.Lerp(reunat[n0], reunat[n1], t);
                    float napa = (float)Math.Max(0.0, Math.Min(1.0, (lat - ReliefinPohjoisraja) / (90.0 - ReliefinPohjoisraja)));
                    return Color.Lerp(r, keski, napa);
                };
            }
            n.ReliefiKansi = Kappale("Napakansi reliefi " + puoli,
                Verkko(merkki, rl, ra, kalotinSektoreita, 0.0, rv), n.ReliefiMateriaali);
            return n;
        }

        void Paivita()
        {
            foreach (var n in navat)
            {
                bool kuva = n.Kalotti != null;
                n.KansiMateriaali.SetColor("_BaseColor", Savytetty(n.Savy));
                // Kansi pois, kun kartta on paikallaan (web 11.9.: kansi piirtyi muuten kalotin päälle).
                // Reliefin ajan reliefikansi kannen tilalla (ks. ReliefinJaaraja).
                n.Kansi.SetActive(nakyvat && !reliefi && !kuva);
                n.ReliefiKansi.SetActive(nakyvat && reliefi);
                if (kuva) n.Kalotti.SetActive(nakyvat && !reliefi);
            }
        }

        /// <summary>Webin sävy laattojen valaistukseen: kerroin lineaarisena, tulos sRGB-värinä materiaaliin.</summary>
        Color Savytetty(Color32 vari)
        {
            Color l = ((Color)vari).linear, s = laattojenSavy.linear;
            return new Color(l.r * s.r, l.g * s.g, l.b * s.b, 1f).gamma;
        }

        /// <summary>Kärkipisteen väri varjostimelle: Unity ei muunna kärkipistevärejä, joten sRGB → lineaarinen itse.</summary>
        static Color Lineaarinen(Color32 vari) =>
            QualitySettings.activeColorSpace == ColorSpace.Linear ? ((Color)vari).linear : (Color)vari;

        /// <summary><see cref="ReliefinPohjoisreuna"/> väreinä (lineaarisina kärkipisteille).</summary>
        static Color[] Pohjoisreuna()
        {
            var osat = ReliefinPohjoisreuna.Split(' ');
            var v = new Color[osat.Length];
            for (int i = 0; i < osat.Length; i++)
            {
                int h = Convert.ToInt32(osat[i], 16);
                v[i] = Lineaarinen(new Color32((byte)(h >> 16), (byte)(h >> 8), (byte)h, 255));
            }
            return v;
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
        /// vari(leveys, pituus): kärkipisteen rgb (reliefikansi); null = valkoinen.
        /// </summary>
        Mesh Verkko(int merkki, List<double> leveydet, List<float> alfat, int sektorit, double kuvanReuna,
                    Func<double, double, Color> vari = null)
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
                    Color rgb = vari != null ? vari(leveydet[k], lon) : Color.white;
                    varit[i] = new Color(rgb.r, rgb.g, rgb.b, alfat[k]);
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
