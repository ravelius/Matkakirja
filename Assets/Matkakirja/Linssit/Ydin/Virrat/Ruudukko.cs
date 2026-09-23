// IHMISEN MATKA VÄRIVIRTOINA — RUUDUKKO JA MAAMASKI
// (web js/aikajana-virrat-laskenta.js, osiot "ruudut", "maamaski", "peitto",
// "lähin maa").
//
// 720 × 360 ruutua, rivi 0 pohjoisin (90°N…89,5°N), sarake 0 läntisin
// (180°W…179,5°W) — sama järjestys kuin tasavälisessä pallotekstuurissa.
// Ruudun indeksi on rivi × 720 + sarake. Maski on byte[] (1 = maa), kuten
// webin Uint8Array.
using System;
using System.Collections.Generic;
using System.Text;

namespace Matkakirja.Linssit.Virrat
{
    /// <summary>Piste asteina.</summary>
    public readonly struct LatLon
    {
        public readonly double Lat;
        public readonly double Lon;
        public LatLon(double lat, double lon) { Lat = lat; Lon = lon; }
        public override string ToString() => $"({Lat}, {Lon})";
    }

    /// <summary>Yhtenäiset maa-alueet: ruudun komponentti (−1 = meri) ja komponenttien koot.</summary>
    public sealed class MaaKomponentit
    {
        public int[] Tunnus;
        public List<int> Koot;
    }

    public static class Ruudukko
    {
        public const int Leveys = 720;
        public const int Korkeus = 360;
        /// <summary>Ruudun sivu asteina.</summary>
        public const double Aste = 0.5;
        /// <summary>Leveysasteen pituus kilometreinä (sama vakio kuin js/fokusmitat.js).</summary>
        public const double KmAsteella = 111.32;
        public const double Rad = Math.PI / 180;

        /* ------------------------------------------------------------ ruudut */

        /// <summary>Ruudun indeksi asteista (lat 90…−90, lon −180…180; lon kiertää).</summary>
        public static int Ruutu(double lat, double lon, int leveys = Leveys, int korkeus = Korkeus)
        {
            var l = KierraLon(lon);
            var rivi = (int)Math.Min(korkeus - 1, Math.Max(0, Math.Floor((90 - lat) / Aste)));
            var sarake = (int)Math.Min(leveys - 1, Math.Max(0, Math.Floor((l + 180) / Aste)));
            return rivi * leveys + sarake;
        }

        /// <summary>Ruudun keskipiste asteina.</summary>
        public static LatLon RuudunKeskus(int i, int leveys = Leveys)
        {
            var rivi = i / leveys;
            var sarake = i - rivi * leveys;
            return new LatLon(90 - (rivi + 0.5) * Aste, -180 + (sarake + 0.5) * Aste);
        }

        /// <summary>Rivin keskikohdan leveysaste.</summary>
        public static double RivinLat(int rivi) => 90 - (rivi + 0.5) * Aste;
        /// <summary>Sarakkeen keskikohdan pituusaste.</summary>
        public static double SarakkeenLon(int sarake) => -180 + (sarake + 0.5) * Aste;

        /// <summary>Pituusaste ruudukon [−180, 180) -välille.</summary>
        public static double KierraLon(double lon)
        {
            var l = lon;
            while (l < -180) l += 360;
            while (l >= 180) l -= 360;
            return l;
        }

        /* ---------------------------------------------------------- maamaski */

        /// <summary>
        /// Maski rivijuoksuina: vuorotellen meri- ja maajuoksun pituus
        /// (ensimmäinen on meri, mahdollisesti 0), varint-tavuina base64:nä.
        /// </summary>
        public static string PakkaaMaamaski(byte[] maa)
        {
            var tavut = new List<byte>();
            var nykyinen = 0;
            var pituus = 0;
            for (var i = 0; i < maa.Length; i += 1)
            {
                var arvo = maa[i] != 0 ? 1 : 0;
                if (arvo == nykyinen) { pituus += 1; continue; }
                Varint(tavut, pituus);
                nykyinen = arvo;
                pituus = 1;
            }
            Varint(tavut, pituus);
            return TavuistaBase64(tavut);
        }

        /// <summary>Maski takaisin taulukoksi (1 = maa).</summary>
        public static byte[] PuraMaamaski(string juoksut, int koko = Leveys * Korkeus)
        {
            var tavut = Base64Tavuiksi(juoksut);
            var maa = new byte[koko];
            var i = 0;
            var arvo = 0;
            var paikka = 0;
            while (paikka < tavut.Count && i < koko)
            {
                var n = LueVarint(tavut, ref paikka);
                if (arvo != 0) for (var j = Math.Max(0, i); j < Math.Min(koko, i + n); j += 1) maa[j] = 1;
                i += n;
                arvo ^= 1;
            }
            return maa;
        }

        /// <summary>
        /// Maapeitto 0…9 pakattuna: (arvo, juoksun pituus) -pareja, arvo nibblenä
        /// ja pituus varintina, base64:nä. Peitto ratkaisee vain piirron.
        /// </summary>
        public static string PakkaaPeitto(byte[] peitto)
        {
            var tavut = new List<byte>();
            int arvo = peitto.Length > 0 ? peitto[0] : 0;
            var pituus = 0;
            for (var i = 0; i < peitto.Length; i += 1)
            {
                if (peitto[i] == arvo) { pituus += 1; continue; }
                tavut.Add((byte)(arvo & 15));
                Varint(tavut, pituus);
                arvo = peitto[i];
                pituus = 1;
            }
            tavut.Add((byte)(arvo & 15));
            Varint(tavut, pituus);
            return TavuistaBase64(tavut);
        }

        /// <summary>Peitto takaisin taulukoksi (0…9). Tyhjä syöte → null.</summary>
        public static byte[] PuraPeitto(string pakattu, int koko = Leveys * Korkeus)
        {
            if (string.IsNullOrEmpty(pakattu)) return null;
            var tavut = Base64Tavuiksi(pakattu);
            var ulos = new byte[koko];
            var i = 0;
            var paikka = 0;
            while (paikka + 1 < tavut.Count && i < koko)
            {
                var arvo = tavut[paikka] & 15;
                paikka += 1;
                var n = LueVarint(tavut, ref paikka);
                if (arvo != 0) for (var j = Math.Max(0, i); j < Math.Min(koko, i + n); j += 1) ulos[j] = (byte)arvo;
                i += n;
            }
            return ulos;
        }

        static void Varint(List<byte> tavut, int n)
        {
            var v = (uint)n;
            while (v >= 0x80) { tavut.Add((byte)((v & 0x7f) | 0x80)); v >>= 7; }
            tavut.Add((byte)v);
        }

        /// <summary>Varint kuten webissä: puuttuva tavu luetaan nollana (undefined &amp; 0x7f).</summary>
        static int LueVarint(List<byte> tavut, ref int paikka)
        {
            var n = 0;
            var siirto = 0;
            int tavu;
            do
            {
                tavu = paikka < tavut.Count ? tavut[paikka] : 0;
                paikka += 1;
                n |= (tavu & 0x7f) << siirto;
                siirto += 7;
            } while ((tavu & 0x80) != 0);
            return n;
        }

        const string B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

        static string TavuistaBase64(List<byte> tavut)
        {
            var ulos = new StringBuilder((tavut.Count + 2) / 3 * 4);
            for (var i = 0; i < tavut.Count; i += 3)
            {
                int a = tavut[i];
                var onB = i + 1 < tavut.Count;
                var onC = i + 2 < tavut.Count;
                var n = (a << 16) | ((onB ? tavut[i + 1] : 0) << 8) | (onC ? tavut[i + 2] : 0);
                ulos.Append(B64[(n >> 18) & 63]).Append(B64[(n >> 12) & 63])
                    .Append(onB ? B64[(n >> 6) & 63] : '=')
                    .Append(onC ? B64[n & 63] : '=');
            }
            return ulos.ToString();
        }

        static List<byte> Base64Tavuiksi(string teksti)
        {
            var puhdas = new StringBuilder(teksti.Length);
            foreach (var m in teksti) if (B64.IndexOf(m) >= 0) puhdas.Append(m);
            var ulos = new List<byte>(puhdas.Length * 3 / 4 + 3);
            // Puuttuva merkki on webissä indexOf(undefined) = −1.
            int Arvo(int k) => k < puhdas.Length ? B64.IndexOf(puhdas[k]) : -1;
            for (var i = 0; i < puhdas.Length; i += 4)
            {
                var n = (Arvo(i) << 18) | (Arvo(i + 1) << 12) | ((Arvo(i + 2) & 63) << 6) | (Arvo(i + 3) & 63);
                ulos.Add((byte)((n >> 16) & 255));
                if (i + 2 < puhdas.Length) ulos.Add((byte)((n >> 8) & 255));
                if (i + 3 < puhdas.Length) ulos.Add((byte)(n & 255));
            }
            return ulos;
        }

        /* ---------------------------------------------------- rannikko, alueet */

        /// <summary>
        /// Rannikkomaski: maaruutu, jolla on meri naapurina (4-naapurusto,
        /// pituussuunnassa kiertäen). Rannikko leviää täydellä nopeudella,
        /// sisämaa virran `sisamaa`-kertoimella.
        /// </summary>
        public static byte[] RannikkoMaski(byte[] maa, int leveys = Leveys, int korkeus = Korkeus)
        {
            var ulos = new byte[maa.Length];
            for (var r = 0; r < korkeus; r += 1)
            {
                for (var c = 0; c < leveys; c += 1)
                {
                    var i = r * leveys + c;
                    if (maa[i] == 0) continue;
                    var vas = r * leveys + ((c + leveys - 1) % leveys);
                    var oik = r * leveys + ((c + 1) % leveys);
                    var yla = r > 0 ? i - leveys : -1;
                    var ala = r < korkeus - 1 ? i + leveys : -1;
                    if (maa[vas] == 0 || maa[oik] == 0 || (yla >= 0 && maa[yla] == 0) || (ala >= 0 && maa[ala] == 0)) ulos[i] = 1;
                }
            }
            return ulos;
        }

        /// <summary>Yhtenäiset maa-alueet (8-naapurusto), syvyyshaku pinolla kuten webissä.</summary>
        public static MaaKomponentit Komponentit(byte[] maa, int leveys = Leveys, int korkeus = Korkeus)
        {
            var tunnus = new int[maa.Length];
            for (var i = 0; i < tunnus.Length; i += 1) tunnus[i] = -1;
            var koot = new List<int>();
            var pino = new int[maa.Length];
            for (var alku = 0; alku < maa.Length; alku += 1)
            {
                if (maa[alku] == 0 || tunnus[alku] >= 0) continue;
                var id = koot.Count;
                var koko = 0;
                var p = 0;
                pino[p++] = alku;
                tunnus[alku] = id;
                while (p > 0)
                {
                    var i = pino[--p];
                    koko += 1;
                    var r = i / leveys;
                    var c = i - r * leveys;
                    for (var dr = -1; dr <= 1; dr += 1)
                    {
                        var rr = r + dr;
                        if (rr < 0 || rr >= korkeus) continue;
                        for (var dc = -1; dc <= 1; dc += 1)
                        {
                            if (dr == 0 && dc == 0) continue;
                            var j = rr * leveys + ((c + dc + leveys) % leveys);
                            if (maa[j] != 0 && tunnus[j] < 0) { tunnus[j] = id; pino[p++] = j; }
                        }
                    }
                }
                koot.Add(koko);
            }
            return new MaaKomponentit { Tunnus = tunnus, Koot = koot };
        }

        /// <summary>Lähin maaruutu pisteelle (säde ruutuina), tai −1.</summary>
        public static int LahinMaa(byte[] maa, double lat, double lon, int sade = 3, int leveys = Leveys, int korkeus = Korkeus)
        {
            var keski = Ruutu(lat, lon, leveys, korkeus);
            if (maa[keski] != 0) return keski;
            var r0 = keski / leveys;
            var c0 = keski - r0 * leveys;
            var paras = -1;
            var parasEt = int.MaxValue;
            for (var dr = -sade; dr <= sade; dr += 1)
            {
                var r = r0 + dr;
                if (r < 0 || r >= korkeus) continue;
                for (var dc = -sade; dc <= sade; dc += 1)
                {
                    var c = (c0 + dc + leveys) % leveys;
                    var i = r * leveys + c;
                    if (maa[i] == 0) continue;
                    var et = dr * dr + dc * dc;
                    if (et < parasEt) { parasEt = et; paras = i; }
                }
            }
            return paras;
        }
    }
}
