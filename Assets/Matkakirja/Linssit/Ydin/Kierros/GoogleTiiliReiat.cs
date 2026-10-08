// GOOGLEN TIILIREIÄT (Varsova 7.10.2026: tumma neliö = Googlen 404 tiilen sisällölle, b-ajossa 38 kpl kaikilla etäisyyksillä; Cesium
// käsittelee epäonnistuneen tiilen tyhjänä, joten forbidHoles ei auta; Päätoimittaja 8.10.: korjaa junaan 166).
// Cesiumin natiivi loki "[TilesetJsonLoader…] Received status code 404 for tile content https://tile.googleapis.com/…" kulkee Unityn
// lokiin; kun kaupungissa on vähintään Raja tällaista riviä, CesiumKaupunki kytkee aluskerroksen (Cesiumin maasto + Bing-kuva hieman
// Googlen pinnan alle), joka täyttää reiät. Kaupungin vaihto nollaa. Säieturvallinen (lokikutsu voi tulla taustasäikeestä).
using System;
using System.Threading;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class GoogleTiiliReiat
    {
        /// <summary>Näin monta 404-tiiltä kaupungissa → aluskerros (yksittäinen satunnainen virhe ei riitä).</summary>
        public const int Raja = 3;
        int maara;

        /// <summary>Googlen 3D-tiilen sisällön 404 (Cesiumin natiivi loki).</summary>
        public static bool OnReika(string rivi) =>
            rivi != null && rivi.IndexOf("status code 404", StringComparison.Ordinal) >= 0
            && rivi.IndexOf("tile content", StringComparison.Ordinal) >= 0 && rivi.IndexOf("tile.googleapis.com", StringComparison.Ordinal) >= 0;

        /// <summary>Lokirivi (mistä säikeestä tahansa); true, jos rivi oli 404-tiili.</summary>
        public bool Kirjaa(string rivi)
        {
            if (!OnReika(rivi)) return false;
            Interlocked.Increment(ref maara);
            return true;
        }

        public int Maara => Volatile.Read(ref maara);
        public bool AluskerrosTarvitaan => Maara >= Raja;
        public void Nollaa() => Interlocked.Exchange(ref maara, 0);
    }
}
