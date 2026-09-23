// POHJARAIDAN VALITSIN JA MUSIIKIN TASO (B7 §1.2, §2.1): verkkopelin js/musiikkivalitsin.js
// (musiikkiketju, valitseMusiikki, musiikinVahvistus, musiikinLiuunTeksti) ja
// js/kaupunkimusiikki.js (kaupunginAlue, kaupunginRaidat) puhtaana C#:na.
//
// Ketju parhaasta alkaen: tilat (TILARAIDAT-järjestys) → paikkaraita (etusivu) → kaupungin oma
// kappale → alueen raita → pohjavire; duplikaatit pois. Soitin ottaa ensimmäisen, jota ei ole
// todettu puuttuvaksi. Kultainen jälki (jäljet 1–4) vartioi kaikki 266 kaupunkia.
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Matkakirja.Peli
{
    public sealed class Musiikkivalitsin
    {
        readonly AaniTaulut t;
        public Musiikkivalitsin(AaniTaulut taulut) { t = taulut ?? throw new ArgumentNullException(nameof(taulut)); }

        /// <summary>Webin kaupunginAlue: KAUPUNGIN_ALUE[kaupunki] tai ALUEEN_MAAT[maa] tai null.</summary>
        public string Alue(string kaupunki, string maa)
        {
            if (!string.IsNullOrEmpty(kaupunki) && t.KaupunginAlue.TryGetValue(kaupunki, out var a)) return a;
            if (!string.IsNullOrEmpty(maa) && t.AlueenMaat.TryGetValue(maa, out var b)) return b;
            return null;
        }

        /// <summary>Webin musiikkiketju(cityId, maa) tilajoukolla <paramref name="tilat"/> (tuntemattomat nimet ohitetaan).</summary>
        public List<string> Ketju(IEnumerable<string> tilat, string paikka, string maa)
        {
            var paalla = new HashSet<string>(tilat ?? Array.Empty<string>());
            var polut = new List<string>();
            void Lisaa(string p) { if (p != null && !polut.Contains(p)) polut.Add(p); }
            foreach (var (nimi, tunnus) in t.Tilaraidat) if (paalla.Contains(nimi)) Lisaa(t.MusaPolku(tunnus));
            if (!string.IsNullOrEmpty(paikka) && t.Paikkaraidat.TryGetValue(paikka, out var pt)) Lisaa(t.MusaPolku(pt));
            if (!string.IsNullOrEmpty(paikka) && t.Kaupunkiraidat.Contains(paikka)) Lisaa(t.MusaPolku("musa-kaupunki-" + paikka));
            var alue = Alue(paikka, maa);
            if (alue != null && t.Alueraidat.Contains(alue)) Lisaa(t.MusaPolku("musa-kaupunki-" + alue));
            Lisaa(t.MusaPolku(t.Pohjaraita));
            return polut;
        }

        /// <summary>Webin valitseMusiikki: ketjun ensimmäinen, joka ei ole puuttuvissa; null jos kaikki puuttuvat.</summary>
        public static string Valitse(IReadOnlyList<string> ketju, ICollection<string> puuttuvat)
        {
            foreach (var p in ketju) if (puuttuvat == null || !puuttuvat.Contains(p)) return p;
            return null;
        }
    }

    /// <summary>Musiikin säädin 0–100 ja kaiken musiikin yhteinen kerroin (musiikinKerroin).</summary>
    public static class Musiikkitaso
    {
        /// <summary>Webin musiikinVahvistus: (rajattu liuku / 100)^2,5; kelvoton → oletus 35.</summary>
        public static double Vahvistus(double liuku)
        {
            if (double.IsNaN(liuku) || double.IsInfinity(liuku))
                return Math.Pow((double)AaniVakiot.LiukuOletus / AaniVakiot.LiukuMax, AaniVakiot.MusiikinKayra);
            var rajattu = Math.Min(AaniVakiot.LiukuMax, Math.Max(AaniVakiot.LiukuMin, liuku));
            return Math.Pow(rajattu / AaniVakiot.LiukuMax, AaniVakiot.MusiikinKayra);
        }

        /// <summary>Kaiken musiikin kerroin = vahvistus × MUSIIKIN_KATTO (liuku 35 → 0,58; 43,5 → 1; 100 → 8).</summary>
        public static double Kerroin(double liuku) => Vahvistus(liuku) * AaniVakiot.MusiikinKatto;

        /// <summary>Webin rajaaLiuku: kelvoton → 35, muuten Math.round(rajattu).</summary>
        public static int Rajaa(double liuku)
        {
            if (double.IsNaN(liuku) || double.IsInfinity(liuku)) return AaniVakiot.LiukuOletus;
            return (int)Math.Floor(Math.Min(AaniVakiot.LiukuMax, Math.Max(AaniVakiot.LiukuMin, liuku)) + 0.5);
        }

        /// <summary>Webin musiikinLiuunTeksti: "35 · −23 dB" tai "0 · vaiti" (typografinen miinus).</summary>
        public static string Teksti(double liuku)
        {
            int arvo = Rajaa(liuku);
            double v = Vahvistus(arvo);
            if (v <= 0) return "0 · vaiti";
            var db = (long)Math.Floor(20 * Math.Log10(v) + 0.5);
            return arvo.ToString(CultureInfo.InvariantCulture) + " · " + db.ToString(CultureInfo.InvariantCulture).Replace('-', '−') + " dB";
        }

        /// <summary>Natiivin asetuksesta (Voima.Musiikki 0–1) webin liukuun 0–100.</summary>
        public static double Asetuksesta(double taso) => Math.Floor(taso * 100 + 0.5);
    }
}
