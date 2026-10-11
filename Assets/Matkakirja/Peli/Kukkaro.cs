// KUKKARON PALAUTE (omistaja 11.10.2026, juna 182): matkakulujen kertymä ja syyrivi. Puhdas logiikka
// (ei UnityEngineä, käännetään myös Peli-testeissä); PeliOhjain.Raha.cs kytkee sen RahaMuuttui-tapahtumaan.
//
// Monen päivän matkalla (pelaaja reitillä, ei kaupungissa) päiväkulut eivät näy päivä kerrallaan: ne
// kertyvät tänne ja näkyvät yhtenä päivityksenä, kun pelaaja on taas kaupungissa ("Matkakulut, 3 yötä:
// ruoka £30, majoitus £20"). Yhden yön kulu pitää vanhan rivinsä ("Yö kaupungissa Pariisi: ruoka £10 …").
// Matkakulun infoteksti näkyy 5 s (Leima), muut rahaleimat oletusajan.
namespace Matkakirja.Peli
{
    public sealed class Kulukertyma
    {
        public int Muutos { get; private set; }
        public int Ruoka { get; private set; }
        public int Majoitus { get; private set; }
        public int Oita { get; private set; }
        /// <summary>Viimeisimmän yön oma rivi ("Yö matkalla: ruoka £10").</summary>
        public string Viimeisin { get; private set; }

        public bool Tyhja => Oita == 0 && Muutos == 0;

        /// <summary>Yksi päiväkulu (Matka.PaivakuluVeloitettiin).</summary>
        public void Yo(int ruoka, int majoitus, string rivi)
        {
            Ruoka += ruoka;
            Majoitus += majoitus;
            Oita++;
            Viimeisin = rivi;
        }

        /// <summary>Kassan muutos, joka jää odottamaan kaupunkiin saapumista.</summary>
        public void Kerry(int muutos) => Muutos += muutos;

        /// <summary>Syyrivi kertymästä: yksi yö = sen oma rivi, useampi = yhteenveto; null ilman öitä.</summary>
        public string Syy()
        {
            if (Oita == 0) return null;
            if (Oita == 1) return Viimeisin;
            return $"Matkakulut, {Oita} yötä: ruoka £{Ruoka}" + (Majoitus > 0 ? $", majoitus £{Majoitus}" : "");
        }

        public void Tyhjenna()
        {
            Muutos = Ruoka = Majoitus = Oita = 0;
            Viimeisin = null;
        }

        /// <summary>Onko rahaleiman syy matkakulu (infoteksti 5 s).</summary>
        public static bool OnMatkakulu(string syy) =>
            syy != null && (syy.StartsWith("Yö ", System.StringComparison.Ordinal) || syy.StartsWith("Matkakulut", System.StringComparison.Ordinal));

        /// <summary>Matkakulun infotekstin kesto (omistaja 11.10.2026: 5 s).</summary>
        public const int MatkakulunNakyvyysMs = 5000;
    }
}
