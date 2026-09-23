// IHMISEN MATKA -LINSSIN VIRTALOHKO TYYPITETTYNÄ
// (web js/linssit/ihmisen-matka.js LINSSI.aikajana.virrat; aineisto
// js/linssit/ihmisen-matka-virrat.js ja -maamaski.js).
//
// Sisältöpaketissa lohko on sellaisenaan moduulin js/linssit/ihmisen-matka.js
// exportissa LINSSI (aikajana.virrat); AineistonLukija muuntaa jäsennetyn
// JSONin (Dictionary/List/double, kuten MiniJson) näiksi luokiksi.
//
// KAIKKI AJAT OVAT VUOSIA SITTEN. Kentät, joiden JS-oletus riippuu toisesta
// kentästä (portin reuna, nauhan merisäde, luisun viive), ovat nullable;
// vakio-oletukset on kirjoitettu kentän alkuarvoksi.
namespace Matkakirja.Linssit.Virrat
{
    /// <summary>Laatikko { lat: [etelä, pohjoinen], lon: [länsi, itä] }; null = ei rajaa.</summary>
    public sealed class Laatikko
    {
        public double[] Lat;
        public double[] Lon;
    }

    public sealed class Lahde
    {
        public string Nimi;
        public double Lat, Lon;
        /// <summary>Lähtöaika; NaN (puuttuu) jättää lähteen pois kuten webin Number.isFinite.</summary>
        public double Aika = double.NaN;
    }

    /// <summary>Portin luisun asetus aineistossa; puuttuva kenttä → oletus.</summary>
    public sealed class LuisuAsetus
    {
        public double? Leveys;
        public double? Vuodet;
    }

    public sealed class Portti
    {
        public string Nimi;
        public Laatikko[] Alue;
        public double Avautuu;
        public double Hajonta;
        /// <summary>Rosoreuna asteina; null → virran reuna.</summary>
        public double? Reuna;
        /// <summary>Luisu; null → oletus (Laatikot.Luisu).</summary>
        public LuisuAsetus Luisu;
        /// <summary>Aineistossa `luisu: null`: terävä portti ilman kaistaa.</summary>
        public bool LuisuPois;
    }

    public sealed class Ylitys
    {
        public string Nimi;
        public LatLon A, B;
        /// <summary>[avautuu, sulkeutuu]; null → aina auki.</summary>
        public double[] Ikkuna;
        public double Kesto;
    }

    public sealed class Nauha
    {
        public string Nimi;
        public double Sade = 120;
        /// <summary>Meriruutujen säde; null → 0,6 × Sade.</summary>
        public double? MeriSade;
        /// <summary>Pisteet [lat, lon, aika].</summary>
        public double[][] Pisteet = new double[0][];
    }

    /// <summary>Lähde, joka lukee aikansa toisen virran kentästä (Beringia).</summary>
    public sealed class LahdeToisesta
    {
        public string Nimi;
        public string Virta;
        public LatLon Lue;
        public double Lat, Lon;
        public double[] Ikkuna;
        public double Kesto;
    }

    /// <summary>Nopeus km/vuosi: vakio tai taulu [[vuosiaSitten, kmv], …] laskevassa aikajärjestyksessä.</summary>
    public sealed class Nopeus
    {
        public double Vakio;
        public double[][] Taulu;

        public static Nopeus VakioNopeus(double kmv) => new Nopeus { Vakio = kmv };
    }

    public sealed class VariAskel
    {
        public double Aika;
        public string Vanha, Rintama;
    }

    public sealed class VirranVari
    {
        public string Vanha, Rintama;
        /// <summary>Sävyn liuku kellon mukaan (Amerikat), vanhin ensin; null = ei liukua.</summary>
        public VariAskel[] Liuku;
    }

    /// <summary>Yksi värivirta (myös varhaisten retkien läikkä).</summary>
    public sealed class Virta
    {
        public string Tunnus, Nimi, Yhteenveto;
        public VirranVari Vari;
        public Nopeus Nopeus;
        public double Sisamaa = 0.5;
        public double Reuna = 1.5;
        public Laatikko[] Alue;
        public Laatikko[] Pois;
        public Lahde[] Lahteet;
        public LahdeToisesta[] LahteetToisesta;
        public Portti[] Portit;
        public Ylitys[] Ylitykset;
        public Nauha[] Nauhat;
        /// <summary>Retki: läikän peitto (0–1); null muilla.</summary>
        public double? Peitto;
        /// <summary>Retki: häipymisen alku ja loppu (vuosia sitten); null muilla.</summary>
        public double[] Sammuu;
    }

    /// <summary>Neandertalilaiset ja denisovalaiset: haalea harmaa alue.</summary>
    public sealed class VanhaVaesto
    {
        public string Tunnus, Nimi;
        public int[] Rgb;
        public double VariPeitto;
        public Laatikko[] Alue;
        public double Reuna = 3;
        public double Pehmeys = 2;
        public double[] Nakyy;
        public double[] Haipyy;
    }

    /// <summary>Vanhan alueen, rintaman ja meren peitto (päätös 2).</summary>
    public sealed class PeittoAsetus
    {
        public double Vanha = 0.75, Rintama = 0.95, Meri = 0.42;
    }

    public sealed class Maamaski
    {
        public int Leveys = Ruudukko.Leveys;
        public int Korkeus = Ruudukko.Korkeus;
        /// <summary>Kulkumaski rivijuoksuina (Ruudukko.PuraMaamaski).</summary>
        public string Juoksut;
        /// <summary>Maapeitto 0…9 piirtoa varten (Ruudukko.PuraPeitto); voi puuttua.</summary>
        public string Peitot;
    }

    public sealed class VananPaate
    {
        public string Tunnus;
        public string Virta;
        public LatLon Paate;
        public double Paksuus;
    }

    public sealed class KotipesaAsetus
    {
        public string Tunnus;
        public double Sade = 350;
    }

    /// <summary>Douglas–Peucker km, aikatihennyksen rajat, Chaikin-kierrokset, haaran katkaisu km.</summary>
    public sealed class Yksinkertaistus
    {
        public double DpKm = 60;
        public double AikaV = 1500;
        public double AikaOsuus = 0.06;
        public int Chaikin = 2;
        public double HaaranEroKm = 100;
    }

    /// <summary>Vanan kaistan leveysalue (piirtoa varten; laskenta ei käytä).</summary>
    public sealed class KaistanAlue
    {
        public string Nimi;
        public double[] Lat, Lon;
        public double Kerroin = 1;
        public double? Pehmeys;
    }

    public sealed class Kaista
    {
        public double LeveysKm = 200;
        public double MeriKerroin = 0.3;
        public double Peitto = 0.5;
        public KaistanAlue[] Alueet = new KaistanAlue[0];
    }

    public sealed class VanatAineisto
    {
        public VananPaate Selkaranka;
        public VananPaate[] Haarat = new VananPaate[0];
        /// <summary>Virta, jonka nauhat piirretään sellaisinaan (tyynimeri); null = ei.</summary>
        public string Nauhat;
        public double NauhanPaksuus = 2;
        public KotipesaAsetus[] Kotipesat = new KotipesaAsetus[0];
        public Yksinkertaistus Yksinkertaistus = new Yksinkertaistus();
        public Kaista Kaista;
    }

    public sealed class Pysakki
    {
        public string Tunnus;
        public double Lat, Lon;
        public double VuosiaSitten;
    }

    /// <summary>Koko virtalohko (LINSSI.aikajana.virrat).</summary>
    public sealed class VirtaAineisto
    {
        public Virta[] Virrat = new Virta[0];
        public Virta Retki;
        public VanhaVaesto Vanha;
        public PeittoAsetus Peitto = new PeittoAsetus();
        public Maamaski Maamaski;
        public VanatAineisto Vanat;
        public Pysakki[] Pysakit = new Pysakki[0];
        /// <summary>Kalvon piirtokerroin; null → web PIIRTOKERROIN 2.</summary>
        public double? Piirtokerroin;
    }
}
