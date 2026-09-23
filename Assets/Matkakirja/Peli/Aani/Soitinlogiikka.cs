// ÄÄNISOITTIMEN PUHDAS LOGIIKKA (B7 erä 3, §2.5–§2.7): Unity-soitin (Scripts/Peli/Aanisoitin.cs)
// käyttää näitä, ja Peli-testit ajaa ne ilman Unityä.
//
//   Tasoramppi   lineaarinen ramppi (webin linearRampToValueAtTime nykyisestä arvosta) ruudun
//                aika-askelin; askel rajataan (MaksimiAskelS), joten pääsäikeen jumi tai sovelluksen
//                tauko ei hyppää rampin loppuun (§2.5: "ramppi alkaa ensimmäisestä ruudusta").
//   Silmukka     maiseman kierroksen vaihtohetki (duration − 2,6 s, §2.6).
//   Aanilataus   levyvälimuistin nimi (sama kaava kuin Natiivi-UI:n Aanet.Levy ämpärin osoitteille),
//                striimausraja (> 3 Mt, §5.2) ja latausvirheen luokitus (§2.7).
using System;
using System.Security.Cryptography;
using System.Text;

namespace Matkakirja.Peli
{
    /// <summary>Lineaarinen tasoramppi. Arvo on AudioSource.volume ennen leikkausta ykköseen.</summary>
    public sealed class Tasoramppi
    {
        /// <summary>Yhden ruudun suurin aika-askel: 2 s:n jumi etenee rampissa vain tämän verran.</summary>
        public const double MaksimiAskelS = 0.1;

        public double Arvo { get; private set; }
        public double Kohde { get; private set; }
        double jaljellaS;

        public Tasoramppi(double arvo = 0) { Arvo = Kohde = arvo; }

        public bool Kaynnissa => jaljellaS > 0;

        /// <summary>Ramppi nykyisestä arvosta kohteeseen (ms). 0 tai negatiivinen = heti.</summary>
        public void Aloita(double kohde, double kestoMs)
        {
            if (double.IsNaN(kohde) || double.IsInfinity(kohde)) kohde = 0;
            Kohde = Math.Max(0, kohde);
            if (kestoMs <= 0 || double.IsNaN(kestoMs)) { Arvo = Kohde; jaljellaS = 0; return; }
            jaljellaS = kestoMs / 1000.0;
        }

        /// <summary>Asettaa arvon heti (ramppi pysähtyy).</summary>
        public void Aseta(double arvo) { Arvo = Kohde = Math.Max(0, arvo); jaljellaS = 0; }

        /// <summary>Etenee dt sekuntia (rajattuna MaksimiAskelS:ään). Palauttaa, jatkuuko ramppi.</summary>
        public bool Askel(double dt)
        {
            if (jaljellaS <= 0) return false;
            if (!(dt > 0)) return true;
            dt = Math.Min(dt, MaksimiAskelS);
            if (dt >= jaljellaS - 1e-9) { Arvo = Kohde; jaljellaS = 0; return false; }
            Arvo += (Kohde - Arvo) * (dt / jaljellaS);
            jaljellaS -= dt;
            return true;
        }
    }

    public static class Silmukka
    {
        public const double RistiS = AaniVakiot.SilmukkaRistiMs / 1000.0;

        /// <summary>
        /// Onko maiseman uuden kierroksen aika (webin timeupdate: currentTime ≥ duration − 2,6 s).
        /// Alle kahden ristihäivytyksen mittainen äänite ei vaihda kierrosta ristiin (se soisi
        /// joka ruudussa uudelleen), vaan soitin käyttää AudioSource.loopia (Liianlyhyt).
        /// </summary>
        public static bool Ajoissa(double aikaS, double kestoS) =>
            !Liianlyhyt(kestoS) && aikaS >= kestoS - RistiS;

        public static bool Liianlyhyt(double kestoS) => !(kestoS > 2 * RistiS);
    }

    /// <summary>Latausvirheen seuraus (§2.7).</summary>
    public enum Latausseuraus
    {
        /// <summary>Tila.Puuttuu(kanava): pohja → ketjun seuraava, maisema → alkuperäinen osoite → hiljaisuus.</summary>
        Puuttuu,
        /// <summary>Verkko poissa: kanava on hiljaa tämän yrityksen ajan, ja soitin yrittää myöhemmin uudelleen.</summary>
        YritaMyohemmin,
    }

    public static class Aanilataus
    {
        /// <summary>Tätä suurempi tiedosto soitetaan striimattuna (DownloadHandlerAudioClip.streamAudio, §5.2).</summary>
        public const long StriimausRaja = 3L * 1024 * 1024;
        /// <summary>Uusi verkkoyritys, kun kanava jäi hiljaiseksi verkon puuttuessa.</summary>
        public const double UusintaS = 15;
        /// <summary>Lataus katkaistaan, jos tavuja ei tule tässä ajassa (webin 6 s:n latausvahti).</summary>
        public const double LatausvahtiS = AaniVakiot.LatausvahtiMs / 1000.0;

        public static bool Striimataan(long tavuja) => tavuja > StriimausRaja;

        /// <summary>
        /// Levyvälimuistin suhteellinen nimi (persistentDataPath/aanet/…). Ämpärin osoite: sama kaava kuin
        /// Natiivi-UI:n Aanet.Levy (polku juuren jälkeen, ?=&amp; → _, pääte .mp3), joten tiedosto on yhteinen.
        /// Ulkoinen osoite (Freesound, archive.org): u/&lt;sha256:n 16 ensimmäistä heksaa&gt;.mp3 (pysyvä).
        /// </summary>
        public static string LevyNimi(string url)
        {
            if (string.IsNullOrEmpty(url)) return null;
            string nimi;
            if (url.StartsWith(AaniOsoite.Juuri, StringComparison.Ordinal)) nimi = url.Substring(AaniOsoite.Juuri.Length);
            else
            {
                using var sha = SHA256.Create();
                var tavut = sha.ComputeHash(Encoding.UTF8.GetBytes(url));
                var sb = new StringBuilder("u/");
                for (int i = 0; i < 8; i++) sb.Append(tavut[i].ToString("x2"));
                nimi = sb.ToString();
            }
            foreach (var m in new[] { '?', '=', '&', '#' }) nimi = nimi.Replace(m, '_');
            if (!nimi.EndsWith(".mp3", StringComparison.Ordinal)) nimi += ".mp3";
            return nimi;
        }

        /// <summary>
        /// Latausvirheen luokitus (§2.7 natiivi): HTTP-virhe (≥ 400), purkuvirhe ja latausvahdin
        /// aikakatkaisu = puuttuva raita. Pelkkä verkkovirhe (ei yhteyttä, ei HTTP-vastausta) on
        /// maisemalla puuttuva (kone kokeilee alkuperäistä osoitetta ja on sitten hiljaa, uusi paikka
        /// yrittää uudelleen); musiikkikanavilla se ei merkitse raitaa puuttuvaksi koko istunnoksi,
        /// vaan kanava on hiljaa tämän yrityksen ajan.
        /// </summary>
        public static Latausseuraus Luokittele(Kanava kanava, long httpKoodi, bool verkkovirhe, bool aikakatkaisu, bool purkuvirhe)
        {
            if (purkuvirhe || httpKoodi >= 400 || aikakatkaisu) return Latausseuraus.Puuttuu;
            if (verkkovirhe && kanava != Kanava.Maisema) return Latausseuraus.YritaMyohemmin;
            return Latausseuraus.Puuttuu;
        }
    }
}
