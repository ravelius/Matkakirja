// KEHITYSKAUPUNKIEN JULKISIVUVALOT (Linssiseppä 10.10.2026; PT junaan 175): OSM merkitsee maamerkkien julkisivuvalaistuksen
// (floodlit) harvoin, joten yöllä valaistaan kiinteä lista: Pariisi Notre-Dame, Panthéon ja Riemukaari; Tukholma Kuninkaanlinna,
// Riddarholmen ja Kaupungintalo. Yleinen lämmin valonheitin alhaalta (KaupunkiYovalot.Maamerkit, sama varjostin kuin kierroksen
// maamerkeillä), ei omaa valosuunnitelmaa. EIFFEL EI (PT: valosuunnitelma ja kimallus tekijänoikeuden suojaamia) → pelkät katuvalot.
// Lista ensin, kierroksen muut kohteet perään (yhteensä enintään KaupunkiYovalot.MaamerkkejaMax). Puhdas C#: JulkisivuvalotTestit.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    public static class Julkisivuvalot
    {
        public readonly struct Kohde
        {
            public readonly string Nimi; public readonly double Lat, Lon, SadeM;
            public Kohde(string nimi, double lat, double lon, double sadeM) { Nimi = nimi; Lat = lat; Lon = lon; SadeM = sadeM; }
        }

        /// <summary>Kaksi kohdetta lasketaan samaksi (kierroksen kohde ei saa toista valoa), kun ne ovat tätä lähempänä (m).</summary>
        public const double SamaM = 150;

        static readonly Dictionary<string, Kohde[]> lista = new Dictionary<string, Kohde[]>(StringComparer.Ordinal)
        {
            ["pariisi"] = new[]
            {
                new Kohde("Notre-Dame", 48.85296, 2.34990, 60),
                new Kohde("Panthéon", 48.84622, 2.34610, 55),
                new Kohde("Riemukaari", 48.87378, 2.29504, 30),
            },
            ["tukholma"] = new[]
            {
                new Kohde("Kuninkaanlinna", 59.32680, 18.07160, 70),
                new Kohde("Riddarholmen", 59.32490, 18.06440, 35),
                new Kohde("Kaupungintalo", 59.32750, 18.05440, 60),
            },
        };

        public static IReadOnlyList<Kohde> Kaupungin(string kaupunkiId) =>
            kaupunkiId != null && lista.TryGetValue(kaupunkiId, out var l) ? l : Array.Empty<Kohde>();

        /// <summary>Onko piste jonkin listan kohteen kohdalla (kierroksen kohde ohitetaan, ettei valo tuplaannu).</summary>
        public static bool Listalla(string kaupunkiId, double lat, double lon)
        {
            foreach (var k in Kaupungin(kaupunkiId)) if (KierrosLento.EtaisyysM(lat, lon, k.Lat, k.Lon) < SamaM) return true;
            return false;
        }
    }
}
