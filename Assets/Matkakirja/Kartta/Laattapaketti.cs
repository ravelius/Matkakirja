using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;

namespace Matkakirja
{
    /// <summary>
    /// LAATTAPAKETTI (esilatauspolitiikan kohta 1, omistajan hyväksymä: "BUILDISSA MUKANA, ei verkkoa koskaan … pallon pohja
    /// Z0–Z5 koko maailmasta"; löydös 80, kylmä aloitusverho): pallon kaukonäkymän laatat yhtenä tiedostona buildissa
    /// (StreamingAssets = Xcode-projektin Data/Raw), jotta kylmä käynnistys ei odota kolmea verkkohakua laattaa kohden.
    /// Laattapalvelin tarjoaa laatan ensin tästä, sitten levyltä (offline, välimuisti) ja vasta sitten verkosta.
    /// Yksi tiedosto, ei tuhansia pieniä (iOS-paketin tiedostomäärä ja lukunopeus). Puhdas C# (Kartta-testit).
    ///
    /// MUOTO (little-endian; mj = uint16 tavumäärä + UTF-8):
    ///   0  8  taika "MKLAATT1"
    ///   8  4  int32 muodon versio (<see cref="MuodonVersio"/>)
    ///   12 4  int32 sarjoja S
    ///   16 4  int32 laattoja N
    ///   20 8  int64 datan alku D (tiedoston alusta)
    ///   S × { mj etuliite (ämpärin polku "/"-loppuisena, esim. julisteet/pallo/laatat/2026-09-25-pohja-20260925/), mj nimi }
    ///   N × { int32 sarja, mj loppu (avain = etuliite + loppu, ks. <see cref="Avain"/>), int64 alku (D:stä), int32 pituus }
    ///   D… laattojen raakatavut peräkkäin (sama sisältö kuin ämpärissä).
    /// Kirjoittajat: <see cref="Kirjoita"/> (editori, Assets/Matkakirja/Editor/Laattapaketti.cs) ja
    /// tyokalut/laattapaketti.mjs (ilman editoria). Lukija: <see cref="Lue"/> / <see cref="Avaa"/>.
    ///
    /// SARJAN VERSIO: avaimessa on sarjan kansio (esim. pohja-20260925), joten uuden sarjan laatat eivät osu pakettiin.
    /// Lisäksi <see cref="Rajaa"/> ottaa pois käytöstä paketin sarjat, joita kartta ei nyt käytä (vanha paketti uudessa
    /// buildissa), ja kertoo ne lokiin.
    /// </summary>
    public sealed class Laattapaketti : IDisposable
    {
        public const string Taika = "MKLAATT1";
        public const int MuodonVersio = 1;
        /// <summary>Tiedoston nimi StreamingAssetsissa (iOS: Data/Raw/).</summary>
        public const string Tiedostonimi = "laattapaketti.bin";

        public sealed class Sarja
        {
            public string Etuliite, Nimi;
            public int Laattoja;
            public long Tavuja;
            /// <summary>false = kartta ei käytä tätä sarjaa (<see cref="Rajaa"/>): sen laattoja ei tarjota.</summary>
            public bool Kaytossa = true;
        }

        struct Kohta { public int Sarja; public long Alku; public int Pituus; }

        readonly Dictionary<string, Kohta> hakemisto = new Dictionary<string, Kohta>(StringComparer.Ordinal);
        readonly List<Sarja> sarjat = new List<Sarja>();
        readonly object lukko = new object();
        Stream virta;
        long datanAlku;
        int osumia;

        public IReadOnlyList<Sarja> Sarjat => sarjat;
        public int Laattoja => hakemisto.Count;
        /// <summary>Tarjotut laatat (säieturvallinen laskuri lokiin).</summary>
        public int Osumia => Volatile.Read(ref osumia);
        /// <summary>Tiedoston polku (null, jos luettu virrasta).</summary>
        public string Polku { get; private set; }

        Laattapaketti() { }

        /// <summary>Avaa paketin tiedostosta; null, jos tiedostoa ei ole tai se on rikki (virhe kerrotaan <paramref name="virhe"/>ssä).</summary>
        public static Laattapaketti Avaa(string polku, out string virhe)
        {
            virhe = null;
            if (string.IsNullOrEmpty(polku) || !File.Exists(polku)) { virhe = "ei tiedostoa"; return null; }
            FileStream fs = null;
            try
            {
                fs = new FileStream(polku, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, FileOptions.RandomAccess);
                var p = Lue(fs);
                p.Polku = polku;
                return p;
            }
            catch (Exception e)
            {
                fs?.Dispose();
                virhe = e.Message;
                return null;
            }
        }

        /// <summary>Lukee hakemiston virrasta (virta jää paketille; laatat luetaan siitä hakiessa). Heittää, jos muoto on väärä.</summary>
        public static Laattapaketti Lue(Stream s)
        {
            if (!s.CanSeek || !s.CanRead) throw new ArgumentException("virta ei ole haettava");
            var p = new Laattapaketti { virta = s };
            s.Position = 0;
            // Otsake ja hakemisto yhdellä luvulla puskuriin: tuhansia pieniä lukuja FileStreamistä olisi hidasta.
            var alku = new byte[28];
            LueTaysi(s, alku, 0, alku.Length);
            if (Encoding.ASCII.GetString(alku, 0, 8) != Taika) throw new InvalidDataException("ei laattapaketti (taika)");
            int versio = BitConverter.ToInt32(alku, 8);
            if (versio != MuodonVersio) throw new InvalidDataException("tuntematon muodon versio " + versio);
            int S = BitConverter.ToInt32(alku, 12), N = BitConverter.ToInt32(alku, 16);
            long D = BitConverter.ToInt64(alku, 20);
            if (S < 0 || N < 0 || D < alku.Length || D > s.Length) throw new InvalidDataException("otsake rikki");
            var h = new byte[D - alku.Length];
            LueTaysi(s, h, 0, h.Length);
            int i = 0;
            string Mj()
            {
                if (i + 2 > h.Length) throw new InvalidDataException("hakemisto katkesi");
                int n = h[i] | (h[i + 1] << 8);
                i += 2;
                if (i + n > h.Length) throw new InvalidDataException("hakemisto katkesi");
                var t = Encoding.UTF8.GetString(h, i, n);
                i += n;
                return t;
            }
            for (int k = 0; k < S; k++) p.sarjat.Add(new Sarja { Etuliite = Mj(), Nimi = Mj() });
            long dataPituus = s.Length - D;
            for (int k = 0; k < N; k++)
            {
                if (i + 4 > h.Length) throw new InvalidDataException("hakemisto katkesi");
                int sarja = BitConverter.ToInt32(h, i); i += 4;
                string loppu = Mj();
                if (i + 12 > h.Length) throw new InvalidDataException("hakemisto katkesi");
                long a = BitConverter.ToInt64(h, i); i += 8;
                int pit = BitConverter.ToInt32(h, i); i += 4;
                if (sarja < 0 || sarja >= S || a < 0 || pit < 0 || a + pit > dataPituus)
                    throw new InvalidDataException("hakemiston rivi rikki: " + loppu);
                var sr = p.sarjat[sarja];
                p.hakemisto[sr.Etuliite + loppu] = new Kohta { Sarja = sarja, Alku = a, Pituus = pit };
                sr.Laattoja++;
                sr.Tavuja += pit;
            }
            p.datanAlku = D;
            return p;
        }

        static void LueTaysi(Stream s, byte[] b, int o, int n)
        {
            while (n > 0)
            {
                int k = s.Read(b, o, n);
                if (k <= 0) throw new EndOfStreamException("laattapaketti katkesi");
                o += k; n -= k;
            }
        }

        /// <summary>Onko avaimella (<see cref="Avain"/>) laatta käytössä olevassa sarjassa.</summary>
        public bool Onko(string avain) =>
            avain != null && hakemisto.TryGetValue(avain, out var k) && sarjat[k.Sarja].Kaytossa;

        /// <summary>Laatan tavut tai null (ei paketissa, sarja pois käytöstä tai lukuvirhe). Säieturvallinen.</summary>
        public byte[] Hae(string avain)
        {
            if (avain == null || virta == null || !hakemisto.TryGetValue(avain, out var k) || !sarjat[k.Sarja].Kaytossa) return null;
            var b = new byte[k.Pituus];
            try
            {
                lock (lukko)
                {
                    virta.Position = datanAlku + k.Alku;
                    LueTaysi(virta, b, 0, b.Length);
                }
            }
            catch (Exception) { return null; }
            Interlocked.Increment(ref osumia);
            return b;
        }

        /// <summary>
        /// Rajaa paketin sarjat niihin, joiden etuliite on <paramref name="kaytossa"/>-joukossa; muut pois käytöstä.
        /// Palauttaa pois otettujen sarjojen nimet (lokiin: paketti on vanhempi kuin kartan sarja).
        /// </summary>
        public List<string> Rajaa(ICollection<string> kaytossa)
        {
            var pois = new List<string>();
            foreach (var s in sarjat)
            {
                s.Kaytossa = kaytossa != null && kaytossa.Contains(s.Etuliite);
                if (!s.Kaytossa) pois.Add(s.Nimi + " (" + s.Etuliite + ")");
            }
            return pois;
        }

        public void Dispose()
        {
            lock (lukko) { virta?.Dispose(); virta = null; }
        }

        // ---- Avain ----

        /// <summary>
        /// Ämpärin polun avain paketissa ja levyllä ("/"-erotin): kysely mukaan, jotta ?v=-versiot eivät sekoitu, mutta
        /// Cesiumin maastolaattoihin lisäämä extensions=… jätetään pois (staattinen tiedosto ei riipu siitä). Sama kuin
        /// Laattapalvelin.Tiedosto (joka lisää vain juuren ja käyttöjärjestelmän erottimen) ja tyokalut/laattapaketti.mjs.
        /// </summary>
        public static string Avain(string polku)
        {
            if (polku == null) return null;
            int q = polku.IndexOf('?');
            if (q < 0) return polku;
            string perus = polku.Substring(0, q);
            var osat = new List<string>();
            foreach (var o in polku.Substring(q + 1).Split('&'))
                if (o.Length > 0 && !o.StartsWith("extensions=", StringComparison.Ordinal)) osat.Add(o);
            if (osat.Count > 0) perus += "__" + string.Join("_", osat).Replace('/', '_').Replace('=', '-');
            return perus;
        }

        // ---- Kirjoitus (editorin työkalu ja testit) ----

        /// <summary>Paketin laatta kirjoitusta varten: sarjan indeksi, loppu (avain ilman etuliitettä) ja tavut.</summary>
        public struct Rivi
        {
            public int Sarja;
            public string Loppu;
            public byte[] Data;
            public Rivi(int sarja, string loppu, byte[] data) { Sarja = sarja; Loppu = loppu; Data = data; }
        }

        /// <summary>Kirjoittaa paketin virtaan (muoto yllä). Rivit järjestetään avaimen mukaan (toistettava tulos).</summary>
        public static void Kirjoita(Stream ulos, IList<(string etuliite, string nimi)> sarjaLista, IList<Rivi> rivit)
        {
            var jarj = new List<Rivi>(rivit);
            jarj.Sort((a, b) => string.CompareOrdinal(sarjaLista[a.Sarja].etuliite + a.Loppu, sarjaLista[b.Sarja].etuliite + b.Loppu));
            var h = new MemoryStream();
            var w = new BinaryWriter(h, Encoding.UTF8);
            void Mj(string t)
            {
                var b = Encoding.UTF8.GetBytes(t ?? "");
                if (b.Length > ushort.MaxValue) throw new ArgumentException("liian pitkä merkkijono");
                w.Write((ushort)b.Length);
                w.Write(b);
            }
            foreach (var s in sarjaLista) { Mj(s.etuliite); Mj(s.nimi); }
            long a0 = 0;
            foreach (var r in jarj)
            {
                w.Write(r.Sarja);
                Mj(r.Loppu);
                w.Write(a0);
                w.Write(r.Data.Length);
                a0 += r.Data.Length;
            }
            w.Flush();
            long D = 28 + h.Length;
            var o = new BinaryWriter(ulos, Encoding.UTF8, true);
            o.Write(Encoding.ASCII.GetBytes(Taika));
            o.Write(MuodonVersio);
            o.Write(sarjaLista.Count);
            o.Write(jarj.Count);
            o.Write(D);
            o.Write(h.GetBuffer(), 0, (int)h.Length);
            foreach (var r in jarj) o.Write(r.Data);
            o.Flush();
        }

        // ---- Laattojen luettelointi ----

        /// <summary>Web Mercatorin (XYZ, slippy: rivi 0 pohjoisin) laatat tasoilta zMin–zMax: (z, x, y).</summary>
        public static IEnumerable<(int z, int x, int y)> Mercator(int zMin, int zMax)
        {
            for (int z = zMin; z <= zMax; z++)
            {
                int n = 1 << z;
                for (int x = 0; x < n; x++)
                    for (int y = 0; y < n; y++) yield return (z, x, y);
            }
        }

        /// <summary>Maantieteellisen TMS:n (EPSG:4326, quantized-mesh: taso z = 2^(z+1) × 2^z) laatat: (z, x, y).</summary>
        public static IEnumerable<(int z, int x, int y)> Maantieteellinen(int zMin, int zMax)
        {
            for (int z = zMin; z <= zMax; z++)
            {
                int nx = 2 << z, ny = 1 << z;
                for (int x = 0; x < nx; x++)
                    for (int y = 0; y < ny; y++) yield return (z, x, y);
            }
        }

        /// <summary>URL-mallin ({z} {x} {y} tai {reverseY} = slippy-rivi, kuten Cesiumin pohjassa) täyttö.</summary>
        public static string Tayta(string malli, int z, int x, int y) =>
            malli.Replace("{z}", z.ToString()).Replace("{x}", x.ToString())
                 .Replace("{reverseY}", y.ToString()).Replace("{y}", y.ToString());
    }
}
