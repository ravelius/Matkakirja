// PALLOMERKIT IRTI (omistaja TF 176, iPad Pro 11 vaaka; LS1 10.10.2026, PT:n päätös B): kaupunkimerkkien päivityspäätös
// ilman UnityEngineä (Kartta-testit). Omistajan kuvassa pyöritetyn pallon takapuolen kohdemerkit näkyivät vanhoissa
// paikoissaan (Moskova pallon ulkopuolella), ja 2D-kartalla ei ollut yhtään kaupunkipistettä → valinta ei osunut.
// KaupunkiMerkit.LateUpdate ohitti päivityksen aina, kun OnDemandRendering.willCurrentFrameRender oli false; jos laite
// piirtää kehyksen, jonka ohitus luuli piirtämättömäksi (120 Hz, piirtovälin vaihto kesken kehyksen), merkit jäävät
// edellisen päivityksen paikkoihin. Simulla vika ei toistunut, joten tämä on varmistus: päivitys ohitetaan vain, kun
// kehys jää piirtämättä JA mikään merkkien paikkaan vaikuttava ei ole muuttunut edellisen PÄIVITYKSEN jälkeen.
namespace Matkakirja
{
    public static class MerkkiPaivitys
    {
        /// <summary>Etupuolen raja: merkki näkyy, kun pinnan normaalin ja kameraan osoittavan suunnan pistetulo ylittää tämän.</summary>
        public const float EtuRaja = 0.12f;

        /// <summary>
        /// Kaikki, mikä siirtää merkkiä ruudulla: kameran paikka ja kierto, projektio (fov, kuvasuhde), ruudun koko ja
        /// pistekerroin, pallon (georeferenssin) muunnos tiivisteenä ja korkeuskerroin.
        /// </summary>
        public readonly struct Asento
        {
            public readonly float Px, Py, Pz, Qx, Qy, Qz, Qw, Fov, Kuvasuhde, Leveys, Korkeus, Pistekerroin, Korkeuskerroin;
            public readonly int Pallo;

            public Asento(float px, float py, float pz, float qx, float qy, float qz, float qw, float fov, float kuvasuhde,
                float leveys, float korkeus, float pistekerroin, float korkeuskerroin, int pallo)
            {
                Px = px; Py = py; Pz = pz; Qx = qx; Qy = qy; Qz = qz; Qw = qw; Fov = fov; Kuvasuhde = kuvasuhde;
                Leveys = leveys; Korkeus = korkeus; Pistekerroin = pistekerroin; Korkeuskerroin = korkeuskerroin; Pallo = pallo;
            }

            /// <summary>Täsmälleen sama asento (pienikin liike päivittää: merkki seuraa kameraa joka piirretyssä kehyksessä).</summary>
            public bool Sama(in Asento b) =>
                Px == b.Px && Py == b.Py && Pz == b.Pz && Qx == b.Qx && Qy == b.Qy && Qz == b.Qz && Qw == b.Qw
                && Fov == b.Fov && Kuvasuhde == b.Kuvasuhde && Leveys == b.Leveys && Korkeus == b.Korkeus
                && Pistekerroin == b.Pistekerroin && Korkeuskerroin == b.Korkeuskerroin && Pallo == b.Pallo;
        }

        /// <summary>
        /// Päivitetäänkö merkit tässä kehyksessä. <paramref name="piirretaan"/> = OnDemandRendering.willCurrentFrameRender,
        /// <paramref name="paivitetty"/> = onko yhtään päivitystä tehty, <paramref name="muuttunut"/> = merkkien tila
        /// (renkaat, suodattimet, korkeudet, tyyli) muuttunut edellisen päivityksen jälkeen.
        /// </summary>
        public static bool Paivitetaanko(bool piirretaan, bool paivitetty, bool muuttunut, in Asento nyt, in Asento viimeksi) =>
            piirretaan || !paivitetty || muuttunut || !nyt.Sama(viimeksi);

        /// <summary>Onko pinnan piste kameran puolella (pistetulo normaalin ja kameraan osoittavan yksikkövektorin välillä).</summary>
        public static bool Edessa(float pistetulo) => pistetulo > EtuRaja;
    }
}
