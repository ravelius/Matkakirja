// PALLON KAUPUNKIÄÄNET, SOUNDLY v2 (Linssiseppä 10.10.2026; juna 182, Pelikoodarin aanet/pallo-soundly-v2/manifest.json, 37 ääntä,
// Soundly Pro, ei nimeämisvaatimusta; muoto kuten pallo-kaupunki-v1). Kaikki −23 LUFS, pistelähteet mono, tuuli stereo 60 s silmukka;
// kertoimet suhteellisia maisemaan kuten PalloSoundlyAanet. Puuttuva manifesti tai tiedosto = hiljaisuus ja erän 1 äänet ennallaan.
//   lokki-01…05                  kerta, 3D laitureissa (samat paikat kuin satama-vesi), 8–25 s välein (Ydin Soundly2Aanet)
//   kyyhky-kujerrus-01…03, kyyhky-siivet-01…02   kerta, 3D toreilla ja aukioilla 10–30 s välein, siivet harvemmin (Soundly2Aanet)
//   tornikello-tunti-01…03       tasatunnin koko sarja (30 s) lähimmästä kirkosta, VAIN tunteina, joiden lyöntimäärä vastaa
//                                äänitettä (TuntiLyonteja); muina tunteina erän 1 N lyöntiä (Ydin KaupunkiAanet)
//   tornikello-lyonti-01…02      yksi lyönti puolella tunnilla lähimmästä kirkosta, kello kirkon siemenestä (KaupunkiAanet)
//   kirkonkello-soitto-01…05     heiluvien kellojen rinnalle (kirkonkello-01…05), oma mikseririvi (KaupunkiAanet.HeiluvatKellot)
//   raitiovaunu-kello-01…02      satunnaisesti raitiovaunun ohiajon yhteydessä samassa vaunussa (Soundly2Aanet.OhiajonKello)
//   polkupyora-kello-01…06       IhmisAanetin pyörän kello -sarjaan (kadut)
//   laivan-torvi-kaukana-01…05   2D kaukaa satamakaupungeissa (laitureita paketissa) 60–180 s välein (Soundly2Aanet)
//   laivan-torvi-lahi-01…03      IhmisAanetin laituritorviin (3D laiturissa, harvoin: TorviValiMinS)
//   tuuli-tasainen-01            2D-silmukka, taso pallon korkeudesta (TuuliKorkeudesta: katutasolla hiljainen, ylhäällä hillitty)
// Erän 1 kanssa päällekkäiset tunnukset (kyyhky-kujerrus-01…03, kyyhky-siivet-01…02, raitiovaunu-kello-01…02) saavat sisäisen
// nimen "soundly2-<tunnus>" (klipin nimi, mikseri). Mikseri (pallo, maisema): jokaiselle aiheelle oma rivi.
// Puhdas C#: Soundly2AanetTestit.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Aanet
{
    public sealed class PalloSoundly2Aanet
    {
        public const string Juuri = "https://media.matkakirja.app/aanet/pallo-soundly-v2/";
        public const string ManifestiOsoite = Juuri + "manifest.json";
        public const string Etuliite = "soundly2-";

        public sealed class Aani { public string Tunnus, Polku; public bool Silmukka; public double KestoS; public string Osoite => Juuri + Polku; }
        public readonly Dictionary<string, Aani> Aanet = new Dictionary<string, Aani>(StringComparer.Ordinal);

        static string[] Sarja(string alku, int n) { var a = new string[n]; for (int i = 0; i < n; i++) a[i] = Sisainen($"{alku}-{i + 1:00}"); return a; }

        /// <summary>Manifestin tunnus → sisäinen: aiempien erien kanssa päällekkäinen saa etuliitteen (klippien nimet ovat yhteiset).</summary>
        public static string Sisainen(string tunnus) =>
            PalloElavaAanet.MikseriAani(tunnus).Id != null || PalloKaupunkiAanet.MikseriAani(tunnus).Id != null || PalloSoundlyAanet.MikseriAani(tunnus).Id != null
            || PalloLentoAanet.MikseriAani(tunnus).Id != null ? Etuliite + tunnus : tunnus;

        // ---- tunnukset (sisäiset) ----
        public static readonly string[] Lokki = Sarja("lokki", 5), KyyhkyKujerrus = Sarja("kyyhky-kujerrus", 3), KyyhkySiivet = Sarja("kyyhky-siivet", 2),
            TornikelloTunti = Sarja("tornikello-tunti", 3), TornikelloLyonti = Sarja("tornikello-lyonti", 2), KirkonkelloSoitto = Sarja("kirkonkello-soitto", 5),
            RaitioKello = Sarja("raitiovaunu-kello", 2), PolkupyoraKello = Sarja("polkupyora-kello", 6), TorviKaukana = Sarja("laivan-torvi-kaukana", 5),
            TorviLahi = Sarja("laivan-torvi-lahi", 3);
        public static readonly string TuuliTasainen = Sisainen("tuuli-tasainen-01");

        /// <summary>Tuntisarjojen lyöntimäärät: 01 ja 02 Pelikoodarin LAHTEET.md:stä (11 ja 9), 03 (Oslon kaupungintalo: neljä
        /// vartiosäveltä ja 4 lyöntiä 19,9–28,9 s, mitattu 100 ms:n verhokäyrästä 10.10.). Sarja soi vain tunteina, joiden lyöntimäärä
        /// (1–12) on sama; muina tunteina erän 1 lyönnit (oikea määrä).</summary>
        public static readonly int[] TuntiLyonteja = { 11, 9, 4 };
        /// <summary>Tuntisarjan pituus (s): heiluvat kellot alkavat tämän jälkeen.</summary>
        public const double TuntiKestoS = 30;

        /// <summary>Mikserin äänet: tunnus, ryhmä, nimi, klipit (jokainen aihe omana rivinään).</summary>
        public static readonly (string Id, string Ryhma, string Nimi, string[] Klipit)[] Mikseri =
        {
            ("elava.lokki-laituri", "maisema", "Lokit laitureilla", Lokki),
            ("elava.kyyhky-tori", "maisema", "Kyyhkyt torilla: kujerrus", KyyhkyKujerrus),
            ("elava.kyyhky-tori-siivet", "maisema", "Kyyhkyt torilla: siivet", KyyhkySiivet),
            ("kaupunki.tornikello-tunti", "maisema", "Tornikello tasatunnilla", TornikelloTunti),
            ("kaupunki.tornikello-puoli", "maisema", "Tornikello puolella tunnilla", TornikelloLyonti),
            ("elava.kirkonkello-soitto", "maisema", "Kirkonkellojen soitto", KirkonkelloSoitto),
            ("elava.raitiovaunu-kello-ohi", "maisema", "Raitiovaunun kello ohiajossa", RaitioKello),
            ("elava.polkupyora-kello", "maisema", "Polkupyörän kello", PolkupyoraKello),
            ("elava.laivan-torvi-kaukana", "maisema", "Laivan torvi kaukaa", TorviKaukana),
            ("elava.laivan-torvi-lahi", "maisema", "Laivan torvi laiturissa", TorviLahi),
            ("elava.tuuli-korkealla", "maisema", "Tuuli pallon korkeudella", new[] { TuuliTasainen }),
        };

        public static IEnumerable<string> Tunnukset() { foreach (var m in Mikseri) foreach (var k in m.Klipit) yield return k; }

        public static (string Id, string Ryhma) MikseriAani(string tunnus)
        {
            foreach (var m in Mikseri) if (Array.IndexOf(m.Klipit, tunnus) >= 0) return (m.Id, m.Ryhma);
            return (null, null);
        }

        /// <summary>Manifesti; avaimet sisäisinä tunnuksina (Sisainen), tiedosto alkuperäisellä nimellä.</summary>
        public static PalloSoundly2Aanet Lue(string json)
        {
            var m = new PalloSoundly2Aanet();
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

        // ---- tasot (kertoimet maiseman Tasoon nähden; mitattu kultaiset/pallo-soundly2-tasot-20261010.json, KertojanAlla-testi) ----
        public const double LokkiTaso = 0.5, KujerrusTaso = 0.5, SiivetTaso = 0.45, TuntiTaso = 0.8, PuoliTaso = 0.8, RaitioKelloTaso = 0.6,
            TorviKaukanaTaso = 0.35, TuuliTaso = 0.3;
        /// <summary>Tuuli: katutasolla (≤ TuuliAlaM) TuuliPohja × taso, täysi TuuliTaysiM:ssä; välillä pehmeä S-käyrä.</summary>
        public const double TuuliAlaM = 15, TuuliTaysiM = 300, TuuliPohja = 0.12;

        /// <summary>Tuulen taso pallon korkeudesta maasta (m); NaN (korkeus ei tiedossa) = hiljaa.</summary>
        public static double TuuliKorkeudesta(double korkeus)
        {
            if (double.IsNaN(korkeus)) return 0;
            double x = Math.Max(0, Math.Min(1, (korkeus - TuuliAlaM) / (TuuliTaysiM - TuuliAlaM)));
            return TuuliTaso * (TuuliPohja + (1 - TuuliPohja) * x * x * (3 - 2 * x));
        }

        /// <summary>Tasatunnin sarja lyöntimäärästä (1–12) tai null, jos mikään äänite ei vastaa.</summary>
        public static string TuntiSarja(int lyonteja)
        {
            for (int i = 0; i < TuntiLyonteja.Length; i++) if (TuntiLyonteja[i] == lyonteja) return TornikelloTunti[i];
            return null;
        }

        /// <summary>Puolen tunnin lyönti kirkon siemenestä (sama kirkko = sama kello joka kerta).</summary>
        public static string PuoliLyonti(double x, double z, int siemen)
        {
            unchecked
            {
                uint h = (uint)(int)Math.Round(x) * 2246822519u ^ (uint)(int)Math.Round(z) * 3266489917u ^ (uint)siemen * 668265263u;
                h ^= h >> 15; h *= 2654435761u; h ^= h >> 13;
                return TornikelloLyonti[(int)(h % (uint)TornikelloLyonti.Length)];
            }
        }
    }
}
