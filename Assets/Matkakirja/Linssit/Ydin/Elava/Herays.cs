// ELÄVÄ KARTTA, kohta 3: maakunta herää (Linssiseppä 26.9.2026; omistajan hyväksymän videon 8,0–11,5 s tiivistettynä).
// Pelaaja löytää maakunnan ensimmäisen noston (PeliOhjain.MaakuntaHeraa): napautuksen rengas, väri valuu maakuntaan
// noston kohdalta (tulva, saaret lopuksi), nimi kirjoittuu käsialalla ja löydösmerkit leimautuvat; lopuksi oma täyttö
// häipyy pelin pysyvään (MaaKartta: herännyt täysin sävyin). Puhdas C#, ajat sekunteina herätyksen alusta.
using System;
using System.Linq;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Elava
{
    public sealed class Herays
    {
        public const double NapautusKesto = 0.35, TulvaAlku = 0.1, TulvaKesto = 0.8, ValmisKesto = 0.3;
        public const double NimiAlku = 0.5, NimiKesto = 1.1, MerkitAlku = 1.6, MerkitKesto = 0.3;
        public const double LuovutusAlku = 2.0, Kesto = 2.4;

        public readonly ElavaMaakunta Maakunta;
        public readonly LatLon Keskus;
        public readonly double TulvaMaxKm;
        public readonly int Loydetyt, Kaikki;

        public Herays(ElavaMaakunta maakunta, LatLon nosto, int loydetyt, int kaikki)
        {
            Maakunta = maakunta;
            Keskus = nosto;
            Loydetyt = loydetyt;
            Kaikki = kaikki;
            // Tulva kattaa noston renkaan (manner); muut renkaat (saaret) täyttyvät lopuksi (Valmis).
            var rengas = maakunta.Renkaat.FirstOrDefault(r => Maakuntarajat.Sisalla(nosto, r))
                ?? maakunta.Renkaat.OrderByDescending(r => r.Length).FirstOrDefault();
            TulvaMaxKm = rengas == null ? 50 : rengas.Max(q => Kameramatikka.KulmaAsteina(nosto, q)) * ElavaKohtaus.KmAsteella + 5;
        }

        static double U(double t, double alku, double kesto) => ElavaKayrat.Rajaa((t - alku) / kesto);

        public (double SadeKm, double Valmis) Tulva(double t) =>
            (TulvaMaxKm * ElavaKayrat.Hidastuva(U(t, TulvaAlku, TulvaKesto), 1.6), ElavaKayrat.Pehmea(U(t, TulvaAlku + TulvaKesto, ValmisKesto)));

        /// <summary>Napautuksen rengas noston kohdalla: roiskeen osuus 0–1 (1 = poissa).</summary>
        public double Rengas(double t) => U(t, 0, NapautusKesto);

        public double NimiOsuus(double t) => ElavaKayrat.Liuku(U(t, NimiAlku, NimiKesto), 0.12);

        public (double Mittakaava, double Peitto) Merkit(double t)
        {
            if (t < MerkitAlku) return (1.5, 0);
            double u = U(t, MerkitAlku, MerkitKesto);
            return (1.5 - 0.5 * ElavaKayrat.Hidastuva(u, 3), Math.Min(1, u * 2.5));
        }

        /// <summary>Omien kerrosten peitto: luovutus pelin pysyvälle täytölle lopussa.</summary>
        public double KerrostenPeitto(double t) => t < LuovutusAlku ? 1 : 1 - ElavaKayrat.Pehmea(U(t, LuovutusAlku, Kesto - LuovutusAlku));
    }
}
