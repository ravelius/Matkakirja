using System.Collections.Generic;

namespace Matkakirja
{
    /// <summary>
    /// VERHON VALMIUSEHTO (löydös 80, Fablen päätös BUILD 16): pallon latausaste (Cesium3DTileset.ComputeLoadProgress)
    /// on vähintään <see cref="Raja"/> % JA se ei ole noussut yli <see cref="Nousu"/> %-yksikköä viimeisen
    /// <see cref="Ikkuna"/> s:n aikana (tasaantunut), ja näytteitä on vähintään <see cref="MinKehykset"/> kehykseltä.
    /// 100 % kelpaa heti kehysrajan jälkeen (Cesiumilla ei ole yhtään keskeneräistä laattaa, joten nousua ei voi tulla).
    ///
    /// Miksi ei kiinteää 97–99 %:a: aste on valinnan KAIKISTA laatoista (myös karsitut, esivanhemmat, forbidHoles-sisarukset
    /// ja jokaisen näkyvän laatan jokainen raster-liitos), joten se jää lähikuvassa ja uusien kerrosten jälkeen pitkäksi
    /// aikaa 85–97 %:iin, vaikka näkyvä kuva on jo valmis (mittaus 25.9.: musta-lahi 87 % katossa, Valmius.cs).
    /// Tasaantuminen kertoo, että Cesiumin jono ei enää etene näkyvästi, eli loput ovat esilatauksia.
    ///
    /// Puhdas luokka ilman UnityEngineä (Kartta-testit); Unity-puoli: Valmius.Tasaantunut. Yksi olio per odotus.
    /// </summary>
    public sealed class ValmiusEhto
    {
        /// <summary>Alin kelpaava aste (%).</summary>
        public const float Raja = 90f;
        /// <summary>Suurin sallittu nousu ikkunan aikana (%-yksikköä).</summary>
        public const float Nousu = 1f;
        /// <summary>
        /// Ylempi porras (Fablen päätös 26.9.2026, 1.0.24; aloitusverhon ensikäynnistyksen katto): vähintään tämän asteen
        /// (%) kohdalla nousun katsotaan pysähtyneen, kun aste on ikkunan aikana heilunut enintään <see cref="KorkeaNousu"/>
        /// %-yksikköä. Portin kierto tuo kehys kehykseltä uusia laattoja, jolloin aste heiluu 98,9 ↔ 100 (+1,1) eikä
        /// tiukka ehto täyty koskaan (lokit/aloitusverho-katto).
        /// </summary>
        public const float KorkeaRaja = 96f;
        /// <summary>Sallittu heilunta ylemmässä portaassa (%-yksikköä).</summary>
        public const float KorkeaNousu = 2.5f;
        /// <summary>Tasaantumisen ikkuna (s).</summary>
        public const double Ikkuna = 0.3;
        /// <summary>Vähintään näin monta kehystä, jotta Cesium ehtii pyytää uuden näkymän laatat ennen luentaa.</summary>
        public const int MinKehykset = 10;

        // Näytteet aikajärjestyksessä: ikkunan sisäiset ja uusin ikkunan alkua edeltävä (vertailukohta, jolla tiedetään,
        // että koko ikkuna on katettu).
        readonly List<(double t, float aste)> naytteet = new List<(double, float)>();
        int kehykset;

        /// <summary>Kirjattujen kehysten määrä.</summary>
        public int Kehykset => kehykset;

        /// <summary>Uusi odotus (esim. kamera siirtyi toiseen näkymään).</summary>
        public void Nollaa()
        {
            naytteet.Clear();
            kehykset = 0;
        }

        /// <summary>Kirjaa yhden kehyksen näytteen (aika sekunteina, aste %) ja palauttaa, täyttyykö ehto.</summary>
        public bool Paivita(double t, float aste)
        {
            kehykset++;
            if (float.IsNaN(aste)) return false;
            naytteet.Add((t, aste));
            while (naytteet.Count >= 2 && naytteet[1].t <= t - Ikkuna) naytteet.RemoveAt(0);
            if (kehykset < MinKehykset) return false;
            if (aste >= 100f) return true;
            if (aste < Raja) return false;
            if (t - naytteet[0].t < Ikkuna) return false;   // ikkuna ei vielä katettu
            float alin = aste;
            foreach (var n in naytteet) if (n.aste < alin) alin = n.aste;
            return aste - alin <= (aste >= KorkeaRaja ? KorkeaNousu : Nousu);
        }
    }
}
