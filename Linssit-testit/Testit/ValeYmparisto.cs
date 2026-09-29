using System;
// Vale-ympäristö: kirjaa jokaisen linssin kutsun lokiin ja antaa testin
// ohjata aikaa ja kerrosten tilaa.
using System.Collections.Generic;

namespace Matkakirja.Linssit.Testit
{
    public sealed class ValeKerrokset : IKarttaKerrokset
    {
        public readonly List<string> Loki;
        public readonly Dictionary<string, Rasteri> Rasterit = new Dictionary<string, Rasteri>();
        public readonly Dictionary<string, bool> Nakyvat = new Dictionary<string, bool> { ["laatat"] = true };
        public readonly Dictionary<string, KerrosTila> Tilat = new Dictionary<string, KerrosTila>();
        public ValeKerrokset(List<string> loki) { Loki = loki; }

        public void LisaaRasteri(string avain, Rasteri r)
        {
            Loki.Add("rasteri+ " + avain);
            Rasterit[avain] = r;
            Nakyvat[avain] = true;
        }
        public void Poista(string avain)
        {
            Loki.Add("rasteri- " + avain);
            Rasterit.Remove(avain);
            Nakyvat.Remove(avain);
        }
        public void Nakyvyys(string avain, bool n) { Loki.Add($"nakyvyys {avain} {n}"); Nakyvat[avain] = n; }
        public KerrosTila Tila(string avain) => Tilat.TryGetValue(avain, out var t) ? t : KerrosTila.Latautuu;
    }

    /// <summary>Silmukka-kahvan lokiluokka (ISilmukka, Linnanrakentaja erä 2): jokainen Voimakkuus/Lopeta lokiin
    /// tunnuksineen, jotta testi voi todentaa sovittimen kutsujärjestyksen.</summary>
    public sealed class ValeSilmukka : ISilmukka
    {
        public readonly string Tunnus;
        readonly List<string> loki;
        public bool Lopetettu;
        public float ViimeisinTaso;
        public ValeSilmukka(string tunnus, List<string> loki) { Tunnus = tunnus; this.loki = loki; }
        public void Voimakkuus(float taso, float liukuS)
        {
            ViimeisinTaso = taso;
            loki.Add($"silmukka {Tunnus} voimakkuus {taso:0.##} liuku {liukuS:0.##}");
        }
        public void Lopeta(float haiveS = 0.35f)
        {
            Lopetettu = true;
            loki.Add($"silmukka {Tunnus} lopeta {haiveS:0.##}");
        }
    }

    public sealed class ValeYmparisto : ILinssiYmparisto
    {
        public readonly List<string> Loki = new List<string>();
        public readonly ValeKerrokset Vale;
        public Nakyma Asento = new Nakyma(48.85, 2.35, 2_000_000);
        public double? Katto;
        public bool PelikerroksetNakyvissa = true;
        public bool PeitePaalla;
        public bool Musiikkipito;
        public bool Vahennetty;
        public double Kello;
        public Nakyma? Ajo;
        public float AjonKesto;

        public ValeYmparisto() { Vale = new ValeKerrokset(Loki); }

        public IKarttaKerrokset Kerrokset => Vale;
        public Nakyma Kamera => Asento;
        public Func<double, double> AjonPehmennys;
        public double? AjonKallistus;
        public void AjaKamera(Nakyma kohde, float kestoS, Func<double, double> pehmennys = null, double? kallistukseen = null)
        { Loki.Add("ajo"); Ajo = kohde; AjonKesto = kestoS; AjonPehmennys = pehmennys; AjonKallistus = kallistukseen; }
        public double? Lattia;
        public void ZoomiKatto(double? max, double? min = null) { Loki.Add("katto " + (max?.ToString() ?? "pois")); Katto = max; Lattia = min; }
        public (double Lat, double Lon, double Sateita)? Avaruus;
        public void KameraAvaruuteen(double lat, double lon, double sateita) { Loki.Add("avaruus " + sateita); Avaruus = (lat, lon, sateita); }
        public double KokoPallonKorkeus => 25_000_000;
        /// <summary>Vale: 1° ruudun leveydellä = 100 km korkeutta.</summary>
        public double KorkeusLeveydelle(double leveysAsteina) => leveysAsteina * 100_000;
        public double Kuvasuhde { get; set; } = 0.46;
        public double Nakokulma { get; set; } = 50;
        public double Suuntima { get; set; }
        public Kuvakulma? Kuvaus;
        public int Kuvauksia;
        public double? Kentta;
        public void Kuvaa(Kuvakulma a) { Kuvaus = a; Kuvauksia++; }
        public void KuvausLoppui() { Loki.Add("kuvaus loppui"); Kuvaus = null; }
        public void Kenttakulma(double? asteina) { if (Kentta != asteina) Loki.Add("kenttä " + (asteina?.ToString("0") ?? "pois")); Kentta = asteina; }
        public void Pelikerrokset(bool n) { Loki.Add("pelikerrokset " + n); PelikerroksetNakyvissa = n; }
        public void Peite(bool p) { Loki.Add("peite " + p); PeitePaalla = p; }
        public void MusiikkiPitoon(bool p) { Loki.Add("musiikki " + p); Musiikkipito = p; }
        public string Raita;
        public double RaidanTaso = -1;
        public void LinssiMusiikki(string laji) { Loki.Add("raita " + (laji ?? "pois")); Raita = laji; }
        public void LinssiMusiikkiHimmennys(double t) { Loki.Add("raidan taso " + t); RaidanTaso = t; }
        public void Tehoste(string nimi, float voima = 1f) => Loki.Add($"tehoste {nimi} {voima:0.##}");
        public void Taustaaani(string tunnus) => Loki.Add("taustaääni " + (tunnus ?? "pois"));
        public readonly List<ValeSilmukka> Silmukat = new List<ValeSilmukka>();
        public ISilmukka Silmukka(string tunnus)
        {
            Loki.Add("silmukka+ " + tunnus);
            var s = new ValeSilmukka(tunnus, Loki);
            Silmukat.Add(s);
            return s;
        }
        public bool RepliikkiPuhuu;
        public void Repliikki(bool puhuu) { Loki.Add("repliikki " + puhuu); RepliikkiPuhuu = puhuu; }
        public bool VahennettyLiike => Vahennetty;
        public double Aika => Kello;
    }
}
