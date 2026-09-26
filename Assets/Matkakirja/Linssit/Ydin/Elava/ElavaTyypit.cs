// ELÄVÄ KARTTA: kohtauksen syötteiden tyypit (Linssiseppä 26.9.2026). Puhdas C#, ks. ElavaKohtaus.cs.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>Noston kokoluokka (Raamattu ELÄVÄ KARTTA kohta 2, js/packs/nostojen-kokoluokat.js).</summary>
    public enum Kokoluokka { Paakohde, Kohde, Pieni }

    public readonly struct ElavaNosto
    {
        public readonly string Id;
        public readonly LatLon Paikka;
        public readonly Kokoluokka Luokka;

        public ElavaNosto(string id, double lat, double lon, Kokoluokka luokka)
        { Id = id; Paikka = new LatLon(lat, lon); Luokka = luokka; }
    }

    public sealed class ElavaJoki
    {
        public readonly string Nimi;
        /// <summary>Pisteet lähteestä suistoon.</summary>
        public readonly LatLon[] Pisteet;

        /// <summary>latLon = [lat0, lon0, lat1, lon1, …].</summary>
        public ElavaJoki(string nimi, double[] latLon)
        {
            Nimi = nimi;
            Pisteet = new LatLon[latLon.Length / 2];
            for (int i = 0; i < Pisteet.Length; i++) Pisteet[i] = new LatLon(latLon[2 * i], latLon[2 * i + 1]);
        }
    }

    /// <summary>Maakunta sisältöpaketin maakuntarajoista (Kartta/Maakuntajako: Maa-olio, värinumero 0–4).</summary>
    public sealed class ElavaMaakunta
    {
        public string Id, Nimi;
        public int Varinumero;
        /// <summary>Renkaat (saaret omina renkainaan); pisteet samat kuin aineistossa (pyöristys 1e-3°).</summary>
        public readonly List<LatLon[]> Renkaat = new List<LatLon[]>();
        /// <summary>Nimen paikka: suurimman renkaan painopiste (Maa.KeskusLat/Lon).</summary>
        public LatLon Keskus;
    }

    /// <summary>Kynällä piirrettävä viiva: pisteet piirtosuunnassa, alkuhetki ja kesto sekunteina.</summary>
    public sealed class Piirtoviiva
    {
        public string Nimi;
        public LatLon[] Pisteet;
        public double Alku, Kesto;
        /// <summary>Kuljettu matka asteina pisteittäin (Matkat[0] = 0) ja koko pituus.</summary>
        public double[] Matkat;
        public double Pituus;

        public Piirtoviiva(string nimi, LatLon[] pisteet)
        {
            Nimi = nimi;
            Pisteet = pisteet;
            Matkat = new double[pisteet.Length];
            for (int i = 1; i < pisteet.Length; i++)
                Matkat[i] = Matkat[i - 1] + Kameramatikka.KulmaAsteina(pisteet[i - 1], pisteet[i]);
            Pituus = pisteet.Length > 0 ? Matkat[pisteet.Length - 1] : 0;
        }

        /// <summary>Piirretty osuus hetkellä t (kynän pehmeä kiihdytys ja jarrutus).</summary>
        public double Osuus(double t) => Kesto <= 0 ? (t >= Alku ? 1 : 0) : ElavaKayrat.Pehmea((t - Alku) / Kesto);

        /// <summary>Viivan piste matkan osuudella (0…1), isoympyrää pitkin pisteiden välillä.</summary>
        public LatLon Piste(double osuus)
        {
            if (Pisteet.Length == 0) return default;
            double m = Math.Max(0, Math.Min(1, osuus)) * Pituus;
            for (int i = 1; i < Pisteet.Length; i++)
            {
                if (m > Matkat[i]) continue;
                double v = Matkat[i] - Matkat[i - 1];
                return v <= 0 ? Pisteet[i] : Kameramatikka.IsoympyranPiste(Pisteet[i - 1], Pisteet[i], (m - Matkat[i - 1]) / v);
            }
            return Pisteet[Pisteet.Length - 1];
        }
    }

    /// <summary>Noston pudotus: nosto, alkuhetki, kesto ja maakunta (indeksi, −1 = ei maakunnassa).</summary>
    public sealed class Pudotus
    {
        public ElavaNosto Nosto;
        public double Alku, Kesto;
        public int Maakunta = -1;
    }

    /// <summary>Kameran asento: katsekohde, etäisyys siihen (m), kallistus ja suuntima asteina (PalloKierto.Kuvaa).</summary>
    public readonly struct Asento
    {
        public readonly double Lat, Lon, EtaisyysM, Kallistus, Suuntima;

        public Asento(LatLon kohde, double etaisyysM, double kallistus, double suuntima)
        { Lat = kohde.Lat; Lon = kohde.Lon; EtaisyysM = etaisyysM; Kallistus = kallistus; Suuntima = suuntima; }

        public LatLon Kohde => new LatLon(Lat, Lon);
        public override string ToString() => $"({Lat:F3}, {Lon:F3}, {EtaisyysM / 1000:F0} km, {Kallistus:F1}°, suunta {Suuntima:F1}°)";
    }
}
