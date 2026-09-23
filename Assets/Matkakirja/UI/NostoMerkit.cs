// NOSTOMERKIT: karttaselitteen rivimerkit verkkopelistä (Natiivi-UI, erä 3).
//
// Vektorimerkit ovat webin js/fokusnosto-symbolit.js:n leveäkärkisen kynän
// (nostosymKyna, terän kulma −40°, paksu a 0,775 b 0,36, ohut a 0,50 b 0,235)
// TULOSTEET viewBoxissa −8 −8 16 16, laskettu kerran samalla algoritmilla
// 23.9.2026. Jos webin ohjauspisteet tai terävakiot muuttuvat, polut on
// laskettava uudelleen. Kaikki ovat täytettyjä ääriviivoja (kynän jälki).
// Rasterimerkit (merkki-*.png, 128 × 128) haetaan pelin omalta palvelimelta
// laitevälimuistiin (Kuvat), eivät kasvata sovelluspakettia.
// Aihevärit: webin --sym-* (css/styles.css ~25198–25230).
using System.Collections.Generic;

namespace Matkakirja.Natiivi
{
    public static class NostoMerkit
    {
        public const string KuvaJuuri = "https://matkakirja.app/assets/nostotyypit/";

        /// <summary>Pisteen täyttö (kaupungit, hetket): ympyrä r 3,4 aihevärillä.</summary>
        public const string PisteTaytto = "M-3.40 0.00 A3.40 3.40 0 1 0 3.40 0.00 A3.40 3.40 0 1 0 -3.40 0.00 Z";

        /// <summary>Pisteen musterengas (kynän jälki).</summary>
        public const string PisteRengas =
            "M2.76 0.36 L2.70 0.99 L2.52 1.55 L2.27 1.99 L2.00 2.29 L1.69 2.51 L1.27 2.70 L0.71 2.81 L0.09 2.81 L-0.55 2.68 L-1.15 2.41 L-1.70 2.01 L-2.15 1.51 L-2.49 0.93 L-2.69 0.29 L-2.76 -0.36 L-2.70 -0.99 L-2.52 -1.55 L-2.27 -1.99 L-2.00 -2.29 L-1.69 -2.51 L-1.27 -2.70 L-0.71 -2.81 L-0.09 -2.81 L0.55 -2.68 L1.15 -2.41 L1.70 -2.01 L2.15 -1.51 L2.49 -0.93 L2.69 -0.29 Z "
            + "M3.96 -1.12 L3.73 -1.84 L3.35 -2.49 L2.85 -3.04 L2.25 -3.48 L1.56 -3.79 L0.80 -3.95 L0.00 -3.95 L-0.84 -3.77 L-1.71 -3.38 L-2.55 -2.76 L-3.24 -2.01 L-3.70 -1.21 L-3.95 -0.42 L-4.04 0.36 L-3.96 1.12 L-3.73 1.84 L-3.35 2.49 L-2.85 3.04 L-2.25 3.48 L-1.56 3.79 L-0.80 3.95 L0.00 3.95 L0.84 3.77 L1.71 3.38 L2.55 2.76 L3.24 2.01 L3.70 1.21 L3.95 0.42 L4.04 -0.36 Z";

        /// <summary>Tassu (eläimet): viisi musteläikkää.</summary>
        public const string Tassu =
            "M2.54 0.27 L2.84 1.14 L2.58 2.26 L1.81 3.41 L0.68 4.36 L-0.58 4.92 L-1.73 4.98 L-2.54 4.53 L-2.84 3.66 L-2.58 2.54 L-1.81 1.39 L-0.68 0.44 L0.58 -0.12 L1.73 -0.18 Z "
            + "M-3.41 -1.77 L-3.24 -1.29 L-3.38 -0.68 L-3.81 -0.04 L-4.43 0.48 L-5.12 0.78 L-5.75 0.82 L-6.19 0.57 L-6.36 0.09 L-6.22 -0.52 L-5.79 -1.16 L-5.17 -1.68 L-4.48 -1.98 L-3.85 -2.02 Z "
            + "M-0.31 -4.32 L-0.14 -3.84 L-0.28 -3.23 L-0.71 -2.59 L-1.33 -2.07 L-2.02 -1.77 L-2.65 -1.73 L-3.09 -1.98 L-3.26 -2.46 L-3.12 -3.07 L-2.69 -3.71 L-2.07 -4.23 L-1.38 -4.53 L-0.75 -4.57 Z "
            + "M3.09 -4.32 L3.26 -3.84 L3.12 -3.23 L2.69 -2.59 L2.07 -2.07 L1.38 -1.77 L0.75 -1.73 L0.31 -1.98 L0.14 -2.46 L0.28 -3.07 L0.71 -3.71 L1.33 -4.23 L2.02 -4.53 L2.65 -4.57 Z "
            + "M6.19 -1.77 L6.36 -1.29 L6.22 -0.68 L5.79 -0.04 L5.17 0.48 L4.48 0.78 L3.85 0.82 L3.41 0.57 L3.24 0.09 L3.38 -0.52 L3.81 -1.16 L4.43 -1.68 L5.12 -1.98 L5.75 -2.02 Z";

        /// <summary>Kompassiruusu (kadonneet ihmeet).</summary>
        public const string Ruusu =
            "M-0.41 -5.83 L-0.38 -5.15 L-0.13 -4.33 L0.12 -3.51 L0.37 -2.70 L0.62 -1.88 L0.92 -0.99 L1.82 -0.69 L2.63 -0.44 L3.45 -0.19 L4.27 0.06 L5.08 0.31 L5.76 0.36 L5.81 -0.29 L5.00 -0.04 L4.18 0.21 L3.36 0.46 L2.55 0.71 L1.16 1.32 L0.63 2.56 L0.38 3.38 L0.13 4.19 L-0.12 5.01 L-0.37 5.83 L0.41 5.83 L0.38 5.15 L0.13 4.33 L-0.12 3.51 L-0.37 2.70 L-0.62 1.88 L-0.92 0.99 L-1.82 0.69 L-2.63 0.44 L-3.45 0.19 L-4.27 -0.06 L-5.08 -0.31 L-5.76 -0.36 L-5.81 0.29 L-5.00 0.04 L-4.18 -0.21 L-3.36 -0.46 L-2.55 -0.71 L-1.16 -1.32 L-0.63 -2.56 L-0.38 -3.38 L-0.13 -4.19 L0.12 -5.01 L0.37 -5.83 Z "
            + "M-0.87 -5.34 L-1.12 -4.52 L-1.37 -3.71 L-1.62 -2.89 L-1.87 -2.07 L-1.84 -1.68 L-2.09 -1.79 L-2.90 -1.54 L-3.72 -1.29 L-4.54 -1.04 L-5.35 -0.79 L-7.04 0.36 L-6.08 0.81 L-5.27 1.06 L-4.45 1.31 L-3.63 1.56 L-2.82 1.81 L-2.08 2.01 L-1.88 2.75 L-1.63 3.57 L-1.38 4.39 L-1.13 5.20 L-0.88 6.02 L-0.41 6.97 L0.87 5.34 L1.12 4.52 L1.37 3.71 L1.62 2.89 L1.87 2.07 L1.84 1.68 L2.09 1.79 L2.90 1.54 L3.72 1.29 L4.54 1.04 L5.35 0.79 L7.04 -0.36 L6.08 -0.81 L5.27 -1.06 L4.45 -1.31 L3.63 -1.56 L2.82 -1.81 L2.08 -2.01 L1.88 -2.75 L1.63 -3.57 L1.38 -4.39 L1.13 -5.20 L0.88 -6.02 L0.41 -6.97 Z";

        /// <summary>Salama (skandaalit): viisi kynänvetoa.</summary>
        public const string Salama =
            "M2.70 -5.21 L1.80 -4.36 L0.90 -3.51 L0.00 -2.66 L-0.90 -1.81 L-1.75 -0.93 L-2.59 -0.03 L-2.21 0.23 L-1.25 -0.57 L-0.30 -1.39 L0.60 -2.24 L1.50 -3.09 L2.40 -3.94 L3.30 -4.79 Z "
            + "M3.20 -4.91 L2.30 -4.06 L1.40 -3.21 L0.50 -2.36 L-0.40 -1.51 L-1.25 -0.63 L-2.09 0.27 L-1.71 0.53 L-0.75 -0.27 L0.20 -1.09 L1.10 -1.94 L2.00 -2.79 L2.90 -3.64 L3.80 -4.49 Z "
            + "M-2.81 0.67 L-2.09 0.67 L-1.37 0.67 L-0.66 0.67 L0.06 0.67 L0.84 0.57 L1.65 0.45 L2.15 -0.25 L1.52 -0.37 L0.87 -0.47 L0.16 -0.47 L-0.56 -0.47 L-1.28 -0.47 L-1.99 -0.47 Z "
            + "M1.25 -0.07 L0.45 0.75 L-0.35 1.57 L-1.15 2.38 L-1.95 3.20 L-2.69 4.04 L-3.42 4.90 L-2.98 5.10 L-2.11 4.32 L-1.25 3.53 L-0.45 2.72 L0.35 1.90 L1.15 1.08 L1.95 0.27 Z "
            + "M1.75 0.23 L0.95 1.05 L0.15 1.87 L-0.65 2.68 L-1.45 3.50 L-2.19 4.34 L-2.92 5.20 L-2.48 5.40 L-1.61 4.62 L-0.75 3.83 L0.05 3.02 L0.85 2.20 L1.65 1.38 L2.45 0.57 Z";

        /// <summary>Karttaselitteen nappi (webin inline-SVG: kolme palloa ja viivaa).</summary>
        public const string SeliteNappi =
            "<circle cx=\"6\" cy=\"6.5\" r=\"2.1\"/><path d=\"M11 6.5h8\"/><circle cx=\"6\" cy=\"12\" r=\"2.1\"/><path d=\"M11 12h8\"/>"
            + "<circle cx=\"6\" cy=\"17.5\" r=\"2.1\"/><path d=\"M11 17.5h8\"/>";

        /// <summary>Selitteen rivi: id, lyhyt nimi, koko nimi, merkki (vektori tai kuvat) ja aiheväri.</summary>
        public sealed class Rivi
        {
            public string Id, Nimi, Koko, Vektori, Vari;
            public bool Piste;
            public string[] Kuvat = new string[0];
        }

        /// <summary>Webin KARTTASELITE_JARJESTYS (omistaja 22.9.2026) ja KARTTASELITE_MERKIT.</summary>
        public static readonly IReadOnlyList<Rivi> Jarjestys = new[]
        {
            new Rivi { Id = "kaikki", Nimi = "Kaikki", Koko = "Kaikki aiheet" },
            new Rivi { Id = "kaupungit", Nimi = "Kaupungit", Koko = "Kaupungit", Piste = true, Vari = "#8a6d4a" },
            new Rivi { Id = "historia", Nimi = "Historia", Koko = "Historia", Kuvat = new[] { "merkki-historia.png" } },
            new Rivi { Id = "ihmeet", Nimi = "Ihmeet", Koko = "Kadonneet ihmeet", Vektori = Ruusu, Vari = "#b8862b" },
            new Rivi { Id = "hetket", Nimi = "Hetket", Koko = "Historian hetket", Piste = true, Vari = "#6e4a63" },
            new Rivi { Id = "skandaalit", Nimi = "Skandaalit", Koko = "Skandaalit", Vektori = Salama, Vari = "#dda42c" },
            new Rivi { Id = "luonto", Nimi = "Luonto", Koko = "Luonto", Kuvat = new[] { "merkki-vuori.png", "merkki-meri.png" } },
            new Rivi { Id = "elaimet", Nimi = "Eläimet", Koko = "Eläimet", Vektori = Tassu, Vari = "#b98d54" },
            new Rivi { Id = "kulttuuri", Nimi = "Kulttuuri…", Koko = "Kulttuuri ja ruoka", Kuvat = new[] { "merkki-kulttuuri.png", "merkki-ruoka.png" } },
            new Rivi { Id = "kauppa", Nimi = "Kauppa…", Koko = "Kauppa ja tekniikka", Kuvat = new[] { "merkki-kauppa.png", "merkki-tekniikka.png", "merkki-merenkulku.png" } },
            new Rivi { Id = "ei", Nimi = "Ei mitään", Koko = "Ei mitään" },
        };
    }
}
