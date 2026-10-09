// PALLON KAUPUNKIÄÄNET, SOUNDLY-ERÄ 1 (Linssiseppä 9.10.2026; PT junaan 173, Pelikoodarin aanet/pallo-soundly-v1/manifest.json, 28 ääntä,
// Soundly Pro, ei nimeämisvaatimusta; muoto kuten pallo-kaupunki-v1 + aihe, kaytto, tyyppi). Kaikki −23 LUFS; kertoimet suhteellisia
// maisemaan kuten PalloElavaAanet. Puuttuva manifesti tai tiedosto = hiljaisuus ja vanhat äänet (kellonlyönnit KaupunkiAanimaisemaSoittimesta).
//   lokki-huuto-01…06            kerta, 3D näkyvässä lokkiparvessa (muuten laiturissa), Ydin SoundlyAanet
//   lokki-parvi                  silmukka (25 s, stereo), hiljainen 2D-tausta matalalla veden äärellä
//   kyyhky-kujerrus-01…03, kyyhky-siivet-01…03   kerta, 3D aukiolla tai näkyvässä kyyhkyparvessa
//   kello-lyonti-a…d-01          tuntilyönti (yksi isku + soiminen 5,6–9,2 s), lähin kirkko, kello kirkon siemenestä (Ydin KaupunkiAanet)
//   raitiovaunu-kello-01…03      kerta, 3D näkyvässä raitiovaunussa, harvoin
//   pyora-kello-01…04, laivan-torvi-01…04   lisävaihtoehdot IhmisAanetin kaduille ja laitureille (torvi 01–02 vain isolle vedelle)
// Tunnus, joka on jo pallo-elava-v2:ssa (laivan-torvi-01…03), saa sisäisen nimen "soundly-<tunnus>" (klipin nimi, mikseri).
// Mikseri (pallo, maisema): lyönnit kaupunki.kello (korvaavat vanhan kello-01:n), pyörän kello ja torvi samoihin ääniin kuin v2.
// Puhdas C#: KaupunkiAanetTestit.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Aanet
{
    public sealed class PalloSoundlyAanet
    {
        public const string Juuri = "https://media.matkakirja.app/aanet/pallo-soundly-v1/";
        public const string ManifestiOsoite = Juuri + "manifest.json";
        public const string Etuliite = "soundly-";

        public sealed class Aani { public string Tunnus, Polku; public bool Silmukka; public double KestoS; public string Osoite => Juuri + Polku; }
        public readonly Dictionary<string, Aani> Aanet = new Dictionary<string, Aani>(StringComparer.Ordinal);

        // ---- tunnukset (sisäiset) ----
        public static readonly string[] LokkiHuuto = Sarja("lokki-huuto", 6), KyyhkyKujerrus = Sarja("kyyhky-kujerrus", 3), KyyhkySiivet = Sarja("kyyhky-siivet", 3),
            RaitioKello = Sarja("raitiovaunu-kello", 3), PyoraKello = Sarja("pyora-kello", 4),
            LaivanTorvi = Array.ConvertAll(Sarja("laivan-torvi", 4), Sisainen),
            Lyonnit = { "kello-lyonti-a-01", "kello-lyonti-b-01", "kello-lyonti-c-01", "kello-lyonti-d-01" };
        /// <summary>Torvet 01 (valtamerilaiva) ja 02 (Hurtigruten) kaukaa: vain isolle vedelle; 03–04 lautat kaikkialle.</summary>
        public static readonly string[] TorviIso = { LaivanTorvi[0], LaivanTorvi[1] }, TorviLautta = { LaivanTorvi[2], LaivanTorvi[3] };
        public const string LokkiParvi = "lokki-parvi";

        static string[] Sarja(string alku, int n) { var a = new string[n]; for (int i = 0; i < n; i++) a[i] = $"{alku}-{i + 1:00}"; return a; }

        /// <summary>Manifestin tunnus → sisäinen (pallo-elava-v2:n kanssa päällekkäinen saa etuliitteen).</summary>
        public static string Sisainen(string tunnus) => PalloElavaAanet.MikseriAani(tunnus).Id != null ? Etuliite + tunnus : tunnus;

        /// <summary>Mikserin äänet: tunnus, ryhmä, nimi, klipit. Samalla tunnuksella rekisteröinti lisää klipit olemassa olevaan ääneen.</summary>
        public static readonly (string Id, string Ryhma, string Nimi, string[] Klipit)[] Mikseri =
        {
            ("elava.lokki-huuto", "maisema", "Lokkien huudot", LokkiHuuto),
            ("elava.lokki-parvi", "maisema", "Lokkiparvi satamassa", new[] { LokkiParvi }),
            ("elava.kyyhky-kujerrus", "maisema", "Kyyhkyjen kujerrus", KyyhkyKujerrus),
            ("elava.kyyhky-siivet", "maisema", "Kyyhky lähtee lentoon", KyyhkySiivet),
            ("kaupunki.kello", "maisema", "Kaupungin kellonlyönnit", Lyonnit),
            ("elava.raitiovaunu-kello", "maisema", "Raitiovaunun kello", RaitioKello),
            ("elava.pyoran-kello", "maisema", "Pyörän kello", PyoraKello),
            ("elava.laivan-torvi", "maisema", "Laivan torvi satamassa", LaivanTorvi),
        };

        public static IEnumerable<string> Tunnukset() { foreach (var m in Mikseri) foreach (var k in m.Klipit) yield return k; }

        public static (string Id, string Ryhma) MikseriAani(string tunnus)
        {
            foreach (var m in Mikseri) if (Array.IndexOf(m.Klipit, tunnus) >= 0) return (m.Id, m.Ryhma);
            return (null, null);
        }

        /// <summary>Manifesti; avaimet sisäisinä tunnuksina (Sisainen).</summary>
        public static PalloSoundlyAanet Lue(string json)
        {
            var m = new PalloSoundlyAanet();
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(json)), "aanet")))
            {
                var d = MiniJson.ObjektiTaiNull(o); if (d == null) continue;
                string t = MiniJson.Teksti(d, "tunnus");
                var a = new Aani { Tunnus = string.IsNullOrEmpty(t) ? t : Sisainen(t), Polku = MiniJson.Teksti(d, "aani"), KestoS = MiniJson.Luku(d, "kesto_s") ?? 0,
                    Silmukka = MiniJson.Kentta(d, "silmukka") is bool b && b };
                if (!string.IsNullOrEmpty(a.Tunnus) && !string.IsNullOrEmpty(a.Polku)) m.Aanet[a.Tunnus] = a;
            }
            return m;
        }

        // ---- tasot (kertoimet maiseman Tasoon nähden; mitattu kultaiset/pallo-kaupunkiaanet-tasot-20261009.json, KertojanAlla-testi) ----
        public const double LokkiTaso = 0.5, LokkiParviTaso = 0.2, KujerrusTaso = 0.5, SiivetTaso = 0.45, LyontiTaso = 0.8, RaitioKelloTaso = 0.6;
        /// <summary>Päällekkäiset lyönnit (soiminen 5,6–9,2 s, isku 2,5–3 s välein): momentaarihuippuun varaus testissä.</summary>
        public const double LyontiPaallekkainDb = 2.0;

        /// <summary>Kirkon kello a–d paikan siemenestä (koordinaatit metreinä, sama kirkko = sama kello joka kerta).</summary>
        public static string KirkonKello(double x, double z, int siemen)
        {
            unchecked
            {
                uint h = (uint)(int)Math.Round(x) * 73856093u ^ (uint)(int)Math.Round(z) * 19349663u ^ (uint)siemen * 83492791u;
                h ^= h >> 15; h *= 2246822519u; h ^= h >> 13;
                return Lyonnit[(int)(h % 4)];
            }
        }

        /// <summary>Kirkon lyöntien väli 2,5–3 s paikan siemenestä (kellokoneisto: sama väli joka tunti).</summary>
        public static double LyontiVali(double x, double z, int siemen)
        {
            unchecked
            {
                uint h = (uint)(int)Math.Round(x) * 2654435761u ^ (uint)(int)Math.Round(z) * 40503u ^ (uint)siemen;
                h ^= h >> 16; h *= 2246822519u; h ^= h >> 13;
                return 2.5 + 0.5 * (h % 1000) / 999.0;
            }
        }
    }
}
