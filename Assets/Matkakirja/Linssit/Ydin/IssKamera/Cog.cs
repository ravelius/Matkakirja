// ISS-KAMERA, PELAAJAN KUVA (omistaja 1.10.2026): laukaisun jälkeen laite hakee rajatun näkymän Sentinel-2-datan suoraan
// avoimesta arkistosta (AWS sentinel-cogs, TCI 8-bit COG, range-pyynnöt, ei avaimia). Tämä on Unitysta riippumaton
// COG-lukija: otsakkeen jäsennys (IFD:t = 10 m + yleiskuvatasot 20–160 m), laatan tavualue ja purku.
//
//   TCI.tif (1.10. mitattu, S2C_35VLG_20250804): 10980², RGB 8-bit pikselilomitettu, Deflate (8) + vaakaprediktori (2),
//   laatat 1024² (taso 0) ja 512² (tasot 1–4: 5490, 2745, 1373, 687), otsake ja laattataulukot ensimmäisessä 64 kt:ssa.
//   Georeferenssi: ModelPixelScale (33550) ja ModelTiepoint (33922) UTM-metreinä; vyöhyke MGRS-tunnuksesta.
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;

namespace Matkakirja.Linssit.IssKamera
{
    /// <summary>Yksi COG-taso (IFD): koko, laattakoko ja laattojen tavualueet.</summary>
    public sealed class CogTaso
    {
        public int Leveys, Korkeus, LaattaL, LaattaK, Kanavat, Pakkaus, Prediktori;
        public long[] Alut, Pituudet;
        /// <summary>Laattoja vaaka- ja pystysuunnassa.</summary>
        public int LaattojaX => (Leveys + LaattaL - 1) / LaattaL;
        public int LaattojaY => (Korkeus + LaattaK - 1) / LaattaK;
        /// <summary>Tavualue (alku, pituus) laatalle (tx, ty).</summary>
        public (long alku, long pituus) Alue(int tx, int ty)
        {
            int i = ty * LaattojaX + tx;
            return (Alut[i], Pituudet[i]);
        }
    }

    /// <summary>COG-otsake: tasot suurimmasta pienimpään ja georeferenssi (taso 0).</summary>
    public sealed class CogOtsake
    {
        public readonly List<CogTaso> Tasot = new List<CogTaso>();
        /// <summary>Tason 0 vasen yläkulma (UTM itä, pohjoinen) ja pikselin koko metreinä.</summary>
        public double Ita0, Pohjoinen0, PikseliM;

        /// <summary>Jäsentää otsakkeen tiedoston alusta (riittää, kun IFD:t ja laattataulukot ovat puskurissa).</summary>
        public static CogOtsake Jasenna(byte[] b)
        {
            if (b.Length < 8) throw new InvalidDataException("COG: liian lyhyt");
            bool le = b[0] == (byte)'I';
            if (!le && b[0] != (byte)'M') throw new InvalidDataException("COG: ei TIFF");
            ushort U16(long o) => le ? (ushort)(b[o] | b[o + 1] << 8) : (ushort)(b[o] << 8 | b[o + 1]);
            uint U32(long o) => le ? (uint)(b[o] | b[o + 1] << 8 | b[o + 2] << 16 | b[o + 3] << 24)
                                   : (uint)(b[o] << 24 | b[o + 1] << 16 | b[o + 2] << 8 | b[o + 3]);
            double F64(long o)
            {
                var t = new byte[8]; Array.Copy(b, o, t, 0, 8);
                if (le != BitConverter.IsLittleEndian) Array.Reverse(t);
                return BitConverter.ToDouble(t, 0);
            }
            if (U16(2) == 43) throw new InvalidDataException("COG: BigTIFF ei tuettu");
            int Koko(int tyyppi) => tyyppi == 3 ? 2 : tyyppi == 4 ? 4 : tyyppi == 12 ? 8 : 1;
            var o = new CogOtsake();
            long ifd = U32(4); int kierros = 0;
            while (ifd != 0 && kierros++ < 32)
            {
                if (ifd + 2 > b.Length) throw new InvalidDataException("COG: IFD puskurin ulkopuolella");
                int n = U16(ifd);
                var t = new CogTaso { Kanavat = 1, Pakkaus = 1, Prediktori = 1 };
                for (int k = 0; k < n; k++)
                {
                    long e = ifd + 2 + 12 * k;
                    int tag = U16(e), tyyppi = U16(e + 2); long lkm = U32(e + 4);
                    long arvo = lkm * Koko(tyyppi) <= 4 ? e + 8 : U32(e + 8);
                    if (arvo + lkm * Koko(tyyppi) > b.Length) throw new InvalidDataException($"COG: tagi {tag} puskurin ulkopuolella");
                    long Luku(int i) => tyyppi == 3 ? U16(arvo + 2 * i) : U32(arvo + 4 * i);
                    switch (tag)
                    {
                        case 256: t.Leveys = (int)Luku(0); break;
                        case 257: t.Korkeus = (int)Luku(0); break;
                        case 259: t.Pakkaus = (int)Luku(0); break;
                        case 277: t.Kanavat = (int)Luku(0); break;
                        case 317: t.Prediktori = (int)Luku(0); break;
                        case 322: t.LaattaL = (int)Luku(0); break;
                        case 323: t.LaattaK = (int)Luku(0); break;
                        case 324: t.Alut = new long[lkm]; for (int i = 0; i < lkm; i++) t.Alut[i] = Luku(i); break;
                        case 325: t.Pituudet = new long[lkm]; for (int i = 0; i < lkm; i++) t.Pituudet[i] = Luku(i); break;
                        case 33550: if (o.Tasot.Count == 0) o.PikseliM = F64(arvo); break;
                        case 33922: if (o.Tasot.Count == 0) { o.Ita0 = F64(arvo + 24); o.Pohjoinen0 = F64(arvo + 32); } break;
                    }
                }
                if (t.Alut == null || t.Pituudet == null || t.LaattaL == 0) throw new InvalidDataException("COG: ei laatoitettu");
                o.Tasot.Add(t);
                ifd = U32(ifd + 2 + 12 * n);
            }
            return o;
        }

        /// <summary>Tason pikselikoko metreinä (taso 0 = PikseliM, yleiskuvat suhteessa leveyteen).</summary>
        public double TasonPikseliM(int taso) => PikseliM * Tasot[0].Leveys / (double)Tasot[taso].Leveys;

        /// <summary>Karkein taso, jonka pikseli on enintään haluttu (m); jos mikään ei riitä, tarkin taso 0.</summary>
        public int TasoResoluutiolle(double metria)
        {
            for (int i = Tasot.Count - 1; i >= 0; i--) if (TasonPikseliM(i) <= metria * 1.0001) return i;
            return 0;
        }

        /// <summary>
        /// Purkaa laatan: Deflate (zlib-kehys, 8) tai pakkaamaton (1), sitten vaakaprediktori (2) tavuittain kanavan
        /// sisällä. Tulos LaattaL × LaattaK × Kanavat tavua rivi kerrallaan (reunalaatat täytetty kuten tiedostossa).
        /// </summary>
        public static byte[] PuraLaatta(CogTaso t, byte[] pakattu)
        {
            int koko = t.LaattaL * t.LaattaK * t.Kanavat;
            byte[] r;
            if (t.Pakkaus == 1) r = pakattu;
            else if (t.Pakkaus == 8 || t.Pakkaus == 32946)
            {
                r = new byte[koko];
                // zlib: 2 tavun otsake ennen raakaa Deflatea (DeflateStream ei lue sitä).
                using (var s = new DeflateStream(new MemoryStream(pakattu, 2, pakattu.Length - 2), CompressionMode.Decompress))
                {
                    int luettu = 0, n;
                    while (luettu < koko && (n = s.Read(r, luettu, koko - luettu)) > 0) luettu += n;
                    if (luettu != koko) throw new InvalidDataException($"COG: laatta {luettu}/{koko} tavua");
                }
            }
            else throw new NotSupportedException("COG: pakkaus " + t.Pakkaus);
            if (t.Prediktori == 2)
            {
                int rivi = t.LaattaL * t.Kanavat;
                for (int y = 0; y < t.LaattaK; y++)
                {
                    int a = y * rivi;
                    for (int i = t.Kanavat; i < rivi; i++) r[a + i] = (byte)(r[a + i] + r[a + i - t.Kanavat]);
                }
            }
            return r;
        }
    }
}
