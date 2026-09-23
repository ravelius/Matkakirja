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
        public void AjaKamera(Nakyma kohde, float kestoS) { Loki.Add("ajo"); Ajo = kohde; AjonKesto = kestoS; }
        public void ZoomiKatto(double? max) { Loki.Add("katto " + (max?.ToString() ?? "pois")); Katto = max; }
        public double KokoPallonKorkeus => 25_000_000;
        public void Pelikerrokset(bool n) { Loki.Add("pelikerrokset " + n); PelikerroksetNakyvissa = n; }
        public void Peite(bool p) { Loki.Add("peite " + p); PeitePaalla = p; }
        public void MusiikkiPitoon(bool p) { Loki.Add("musiikki " + p); Musiikkipito = p; }
        public bool VahennettyLiike => Vahennetty;
        public double Aika => Kello;
    }
}
