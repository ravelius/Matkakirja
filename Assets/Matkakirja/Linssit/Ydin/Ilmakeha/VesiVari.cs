// VEDEN MITATTU VÄRI (Linssiseppä 2, 10.10.2026; Karttaseppä vesi/vari-v1/vesivari-kaudet.json, Sentinel-2 L2A 2019–2025, 565 näytettä,
// pintaheijastus poistettu B11:llä): syvän ja matalan veden oma väri lineaarisena RGB:nä kaupungin vesistön ja kauden mukaan
// (Seine; Tukholmassa Saltsjön ja Mälaren). Tukholman vesiverkossa ei ole vesistön tunnistetta, joten meri tunnistetaan kärjen
// korkeudesta: maan kaarevuus korjattuna Saltsjön on ~23,0 m (ellipsoidi), Mälaren 23,64 m ja sisäjärvet muualla (makea vesi).
// PEKING (koekaupunki, PT 10.10. 16.1x; Karttaseppä ls2 vesivari-kaudet-peking, S2 2019–2025): tunniste paikasta (vesialueet-peking.json,
// ENU Taihedianista): 0 = vallihauta (myös Jinshui ja pienet kanavat), 1 = Beihai ja Zhongnanhai länsipuolella (x < −480 m,
// tai x < −440 m pohjoisempana kuin vallihaudan NW-kulma y 663 m). Ilman tätä Peking piirtyi oletussävyllä (vallihauta 6/16/25 vs oikea 54/80/68).
using System;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Ilmakeha
{
    public static class VesiVari
    {
        public const string Osoite = "https://media.matkakirja.app/vesi/vari-v1/vesivari-kaudet.json";
        public const double SaltsjonH = 23.0, MeriToleranssiM = 0.25, MaanSadeM = 6371000;

        public readonly struct Vesi
        {
            public readonly double SR, SG, SB, MR, MG, MB, SameusFnu;
            public Vesi(double[] s, double[] m, double sameus) { SR = s[0]; SG = s[1]; SB = s[2]; MR = m[0]; MG = m[1]; MB = m[2]; SameusFnu = sameus; }
            public override string ToString() => $"syvä {SR:F4}/{SG:F4}/{SB:F4}, matala {MR:F4}/{MG:F4}/{MB:F4}, sameus {SameusFnu:F1} FNU";
        }

        /// <summary>Kaupungin vesistöt: [0] pääasiallinen (tunniste 0), [1] makea vesi (tunniste 1); null, jos kaupungilla ei ole mittausta.</summary>
        public static string[] Vedet(string kaupunki) => kaupunki switch
        {
            "pariisi" => new[] { "Seine", "Seine" },
            "tukholma" => new[] { "Saltsjön", "Mälaren" },
            "peking" => new[] { "vallihauta", "Beihai" },
            _ => null,
        };

        /// <summary>Kärjen vesistötunniste (0 tai 1) paikallisesta ENU-paikasta (x itä, y pohjoinen, u ylös ilman nostoa, m).</summary>
        public static float Tunniste(string kaupunki, double x, double y, double u) => kaupunki switch
        {
            "tukholma" => Math.Abs(u + (x * x + y * y) / (2 * MaanSadeM) - SaltsjonH) > MeriToleranssiM ? 1f : 0f,
            "peking" => x < PekingJarvetX || (x < PekingJarvetPohjoinenX && y > PekingVallihautaPohjoinenY) ? 1f : 0f,
            _ => 0f,
        };

        /// <summary>Pekingin järvien raja (ENU m Taihedianista): vallihauta x −473…467, y −485…663; Beihai x −1035…−456, y 572…1747.</summary>
        public const double PekingJarvetX = -480, PekingJarvetPohjoinenX = -440, PekingVallihautaPohjoinenY = 680;

        /// <summary>Kaupungin vesistön kanavakorjaus mitatun värin päälle (lineaarinen kerroin R, G, B; muualla 1). PEKING (PT 10.10. 18.4x):
        /// ilmakehän kanssa vallihauta piirtyi 25/45/58 ja järvet 38/55/68 (klo 13, syksy, ylhäältä 400 m), S2-ortokuvassa
        /// (Copernicus 2024-10-28) vallihauta 54/80/68 ja Beihai/Zhonghai 78/106/91 ja 63/98/69 (vihertävä harmaa). Kertoimet
        /// kalibroitu junan 179 .appilla kertoimilla 1 / 2,5 / 5 (paloittain lineaarinen sovitus kanavittain).</summary>
        public static (double R, double G, double B) Korjaus(string kaupunki, int vesi) => kaupunki switch
        {
            "peking" => vesi == 0 ? (6.25, 4.32, 2.5) : (3.24, 3.96, 1.9),
            _ => (1, 1, 1),
        };

        public static Vesi? Hae(string json, string kaupunki, string vesi, string kausi)
        {
            if (string.IsNullOrEmpty(json) || kaupunki == null || vesi == null || kausi == null) return null;
            var j = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(json));
            var k = MiniJson.ObjektiTaiNull(MiniJson.Kentta(MiniJson.ObjektiTaiNull(MiniJson.Kentta(j, "vedet")), kaupunki));
            var d = MiniJson.ObjektiTaiNull(MiniJson.Kentta(MiniJson.ObjektiTaiNull(MiniJson.Kentta(k, vesi)), kausi));
            double[] V(string nimi)
            {
                var t = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(d, nimi));
                return t.Count == 3 ? new[] { Convert.ToDouble(t[0]), Convert.ToDouble(t[1]), Convert.ToDouble(t[2]) } : null;
            }
            var s = V("syva_vari_lin"); var m = V("matala_vari_lin");
            if (s == null) return null;
            return new Vesi(s, m ?? s, MiniJson.Luku(d, "sameus_fnu") ?? 0);
        }
    }
}
