// IHMISEN MATKA II: KAMERAN KÄÄRE (erä 5, vapaat kädet; Fable 25.9.2026: "kallistettu lento maaston yllä on suunnitelman
// ydin; sama kaava iPhonella ja iPadilla"). Esitys ajaa kameraa ILinssiYmpariston kautta täsmälleen kuten I:ssä; II antaa
// sille tämän kääreen, joka välittää kaiken sellaisenaan ja lisää kohteiden jaksoihin LÄHIKUVAN LASKEUTUMISEN:
//
//   1. SAAPUMINEN: jakson ajo kulkee webin rajaukseen sellaisenaan, joten jakson vana näkyy koko matkalta.
//   2. LASKEUTUMINEN: kun ajo on perillä, kamera laskeutuu kohteen ylle ja kallistuu (Kallistus°) LaskuS sekunnissa, ja vanan
//      hehkuva rintama saapuu kohteeseen maaston yllä. Korkeus = LaskunOsuus × saapumiskorkeus rajattuna LaskuMinKm–LaskuMaxKm:
//      PalloKierto sallii kallistuksen vain matalalla (täysi ≤ 1 500 km, nolla ≥ 7 000 km, horisonttiusvan katto noin 35–50°
//      alle 4 000 km:n), eikä iPhonen webin lähikuva (9 342 km) salli sitä lainkaan. Sama kaava iPhonella ja iPadilla.
//   3. NOUSU: seuraava Esityksen ajo suoristaa kääreen oman kallistuksen (kallistukseen 0); pelaajan oma kallistus säilyy.
//
// Pelaajan siirtämää kameraa ei lasketa (ajon kohteesta poikkeava asento). Sulkiessa paluuajo palauttaa linssin
// avaushetken kallistuksen (IhmisenMatkaLinssi talteen), jos kääre muutti sitä. Vähennetty liike: ei laskeutumista.
//
// SAATTOLENTO (erä 5, Amerikat; suunnitelma "pitkä saattolento rintaman takana"): jaksossa SaattoJakso kamera ei lennä
// suoraan jakson rajaukseen, vaan kulkee etenevän rintaman (vanojen selkärangan kärki, Rintama) edellä. PalloKierto pitää
// pohjoisen ylhäällä ja kallistaa pohjoiseen, joten "takaa" kuvaaminen ei onnistu: kamera on SaattoEtaisyysKm rintaman
// eteläpuolella ja katsoo sitä kohti, jolloin hehkuva rintama tulee kohti ja vana jatkuu sen takana horisonttiin.
// Ensimmäinen osa-ajo on pehmeä (SaattoAlkuS), sen jälkeen lyhyet lineaariset osa-ajot (SaattoAskelS) seuraavat rintamaa sen
// omalla nopeudella. Kun rintama on kohteessa (SaattoPerillaKm), kamera laskeutuu tavalliseen lähikuvaan.
//
// AJON KIRJANPITO (löydös 151, omistaja build 16: "kameraliikkeet liian äkkinäisiä kartan väistäessä"): jokainen ajo, jonka
// kääre antaa kameralle (Esityksen ajo, laskeutuminen, saattolennon osa-ajo), kirjataan (Ajo: numero, alku ja kesto kääreen
// kellossa, käyrä). IhmisenMatka2Tehosteet ajaa havainnekuvan väistön (Linssisiirto) saman ajon käyrällä samassa tahdissa,
// jolloin kuvan väistö ja kameran ajo ovat yksi liike eivätkä kaksi päällekkäistä.
using System;

namespace Matkakirja.Linssit.Aikajana
{
    /// <summary>
    /// KAMERA-AJO, jonka kääre antoi kameralle: numero (kasvava), alku ja kesto kääreen kellossa (IhmisenMatka2Ymparisto.Kello),
    /// käyrä, jolla PalloKierto sen ajaa (null → oletus smootherstep, kuten LinssiOhjain), kohde ja loppukallistus.
    /// </summary>
    public sealed class KameraAjo
    {
        public readonly int Numero;
        public readonly double Alku, KestoS;
        public readonly Func<double, double> Kayra;
        public readonly Nakyma Kohde;
        public readonly double? Kallistukseen;

        public KameraAjo(int numero, double alku, double kestoS, Func<double, double> kayra, Nakyma kohde, double? kallistukseen)
        {
            Numero = numero; Alku = alku; KestoS = Math.Max(0, kestoS); Kohde = kohde; Kallistukseen = kallistukseen;
            Kayra = kayra ?? Matkakirja.Linssit.Kamera.Kamerakayrat.Pehmea;
        }

        /// <summary>Ajan osuus 0…1 kellonajalla (kääreen Kello).</summary>
        public double T(double kello) => KestoS <= 0 ? 1 : Math.Max(0, Math.Min(1, (kello - Alku) / KestoS));
        /// <summary>Käyrän arvo kellonajalla: kuljettu osuus matkasta (kuminauhassa hetkellisesti yli 1).</summary>
        public double Osuus(double kello) => Kayra(T(kello));
        /// <summary>Jäljellä oleva aika (s).</summary>
        public double Jaljella(double kello) => (1 - T(kello)) * KestoS;
    }

    /// <summary>
    /// HAVAINNEKUVAN VÄISTÖ YHTENÄ LIIKKEENÄ KAMERA-AJON KANSSA (löydös 151; IhmisenMatka2Tehosteet ajaa Linssisiirron tällä).
    /// Esitys kutsuu Kuva juuri ennen jakson ajoa, joten väistö ODOTTAA (Pyyda) ja liittyy kääreen seuraavaan ajoon, tai samassa
    /// vaihdossa juuri ennen pyyntöä alkaneeseen (Esityksen loppu ajaa ensin): sama alku, kesto ja käyrä. Jos ajoa ei tule
    /// OdotusS:ssä (Marokon ajo jo matkalla, jakso ilman aluetta), väistö liukuu pehmeästi käynnissä olevan ajon loppuun
    /// (vähintään MinS) tai oletuskestolla (NayttoS, paluu PaluuS). Arvot ruudun osuuksina kuten PalloKierto.Linssisiirto.
    /// </summary>
    public sealed class KuvanVaisto
    {
        /// <summary>Väistö ilman omaa ajoa (s): kuva esiin, kuva pois (paluu), vähimmäisosuus käynnissä olevasta ajosta.</summary>
        public const double NayttoS = 1.6, PaluuS = 1.8, MinS = 1.2;
        /// <summary>Kuinka kauan väistö odottaa jakson ajoa (s): Esitys ajaa samassa kutsussa, saattolento seuraavassa kehyksessä.</summary>
        public const double OdotusS = 0.12;
        /// <summary>Ajo, joka alkoi enintään näin kauan ennen pyyntöä, kuuluu samaan vaihtoon (s).</summary>
        public const double AjoEnnenS = 0.05;

        sealed class Liike
        {
            public (double X, double Y) Mista, Mihin;
            public double Alku, KestoS, E0;
            public Func<double, double> Kayra;
            public int Ajo;
        }

        Liike liike;
        (double X, double Y)? odottava;
        bool paluu;
        double pyyntoKello;
        int pyyntoAjo;

        /// <summary>Väistön arvo viimeisimmästä Arvo-kutsusta (tai Heti).</summary>
        public (double X, double Y) Nyt { get; private set; }
        /// <summary>Väistö odottaa jakson ajoa.</summary>
        public bool Odottaa => odottava != null;
        /// <summary>Väistö liikkuu (ajon tai oman käyrän mukana).</summary>
        public bool Liikkuu => liike != null;
        /// <summary>Loppukohde: odottava, liikkeen määränpää tai nykyinen arvo.</summary>
        public (double X, double Y) Kohde => odottava ?? liike?.Mihin ?? Nyt;

        static bool Sama((double X, double Y) a, (double X, double Y) b) => Math.Abs(a.X - b.X) < 1e-5 && Math.Abs(a.Y - b.Y) < 1e-5;

        /// <summary>Uusi kohde (Kuva-kutsu): odottaa jakson ajoa. Sama kohde kuin nyt tai matkalla: ei mitään (false).</summary>
        public bool Pyyda((double X, double Y) kohde, bool paluuPois, double kello, KameraAjo viimeisin)
        {
            if (Sama(Kohde, kohde)) return false;
            odottava = kohde;
            paluu = paluuPois;
            pyyntoKello = kello;
            pyyntoAjo = viimeisin?.Numero ?? 0;
            return true;
        }

        /// <summary>Heti kohteeseen (vähennetty liike, musta ruutu, sulku).</summary>
        public void Heti((double X, double Y) kohde)
        {
            odottava = null;
            liike = null;
            Nyt = kohde;
        }

        /// <summary>Oma pehmeä liuku heti ilman ajoa (ruudun kierto); odottava kohde vaihtuu uuteen, jos väistö vielä odottaa.</summary>
        public void Liuku((double X, double Y) kohde, double kello, double kestoS)
        {
            if (odottava != null) { odottava = kohde; return; }
            Aloita(kohde, kello, kestoS, Matkakirja.Linssit.Kamera.Kamerakayrat.Pehmea, 0, kello);
        }

        /// <summary>
        /// Odottava väistö liikkeelle: jakson ajo (kääreen Ajo) → sama käyrä ja tahti; muuten OdotusS:n jälkeen pehmeä liuku.
        /// true, kun liike alkoi tässä kutsussa (Kuvaus lokiin).
        /// </summary>
        public bool Ratkaise(double kello, KameraAjo ajo)
        {
            if (odottava is not { } kohde) return false;
            bool jaksonAjo = ajo != null && ajo.KestoS > 0 && ajo.T(kello) < 0.5
                && (ajo.Numero > pyyntoAjo || ajo.Alku >= pyyntoKello - AjoEnnenS);
            if (!jaksonAjo && kello - pyyntoKello < OdotusS) return false;
            odottava = null;
            if (jaksonAjo) Aloita(kohde, ajo.Alku, ajo.KestoS, ajo.Kayra, ajo.Numero, kello);
            else
            {
                double jaljella = ajo?.Jaljella(kello) ?? 0;
                Aloita(kohde, kello, jaljella >= MinS ? jaljella : paluu ? PaluuS : NayttoS, Matkakirja.Linssit.Kamera.Kamerakayrat.Pehmea, 0, kello);
            }
            return true;
        }

        void Aloita((double X, double Y) kohde, double alku, double kestoS, Func<double, double> kayra, int ajo, double kello)
        {
            double t = kestoS <= 0 ? 1 : Math.Max(0, Math.Min(1, (kello - alku) / kestoS));
            // Ajo alkoi jo (saman kehyksen alussa tai juuri ennen): väistö jatkaa sen käyrää tästä hetkestä.
            liike = new Liike { Mista = Nyt, Mihin = kohde, Alku = alku, KestoS = kestoS, Kayra = kayra, Ajo = ajo, E0 = t > 0 ? kayra(t) : 0 };
        }

        /// <summary>Väistön arvo hetkellä kello: liike etenee käyränsä mukaan, lopussa se päättyy kohteeseen.</summary>
        public (double X, double Y) Arvo(double kello)
        {
            var l = liike;
            if (l == null) return Nyt;
            double t = l.KestoS <= 0 ? 1 : Math.Max(0, Math.Min(1, (kello - l.Alku) / l.KestoS));
            if (t >= 1) { liike = null; return Nyt = l.Mihin; }
            double e = l.Kayra(t);
            double s = Math.Abs(1 - l.E0) < 1e-6 ? 1 : (e - l.E0) / (1 - l.E0);
            return Nyt = (l.Mista.X + (l.Mihin.X - l.Mista.X) * s, l.Mista.Y + (l.Mihin.Y - l.Mista.Y) * s);
        }

        /// <summary>Käynnissä oleva liike lokiin: mistä, mihin, kesto, ajon numero tai oma käyrä ja käyrän muoto.</summary>
        public string Kuvaus(double kello)
        {
            var l = liike;
            if (l == null) return odottava is { } o ? System.FormattableString.Invariant($"odottaa ajoa → {o.X:0.00},{o.Y:0.00}") : "levossa";
            double t = l.KestoS <= 0 ? 1 : Math.Max(0, Math.Min(1, (kello - l.Alku) / l.KestoS));
            return System.FormattableString.Invariant($"{l.Mista.X:0.00},{l.Mista.Y:0.00} → {l.Mihin.X:0.00},{l.Mihin.Y:0.00} {l.KestoS:0.00} s ") +
                (l.Ajo > 0 ? $"ajon #{l.Ajo} käyrällä" : "omalla käyrällä") +
                System.FormattableString.Invariant($" (ajosta kulunut {t:0.00}), käyrä {IhmisenMatka2Ymparisto.KayranKuvaus(l.Kayra)}");
        }
    }

    public sealed class IhmisenMatka2Ymparisto : ILinssiYmparisto
    {
        /// <summary>Lähikuvan kallistus (°); PalloKierto rajaa sen korkeuden ja horisonttiusvan mukaan (4 000 km:ssä ≥ 35°).</summary>
        public const double Kallistus = 28.0;
        /// <summary>Laskeutumisen korkeus saapumiskorkeudesta ja sen rajat (km).</summary>
        public const double LaskunOsuus = 0.45, LaskuMinKm = 2200.0, LaskuMaxKm = 4000.0;
        /// <summary>Laskeutumisen kesto (s).</summary>
        public const float LaskuS = 6f;
        /// <summary>Laskeutuminen alkaa näin kauan ajon lopun jälkeen (s), ettei se katkaise saapumisen jarrutusta.</summary>
        public const double LaskunViive = 0.3;

        /// <summary>Saattolennon jakso (Amerikat: White Sands → Monte Verde).</summary>
        public const string SaattoJakso = "chile";
        /// <summary>Saattolennon korkeus (km), etäisyys rintaman eteläpuolella (km) ja kallistus (°).</summary>
        public const double SaattoKorkeusKm = 2200.0, SaattoEtaisyysKm = 1300.0, SaattoKallistus = 35.0;
        /// <summary>Ensimmäinen osa-ajo (pehmeä, s) ja seuraavat lineaariset osa-ajot (s).</summary>
        public const float SaattoAlkuS = 1.6f, SaattoAskelS = 0.5f;
        /// <summary>Rintama on kohteessa, kun se on tätä lähempänä (km): saattolento päättyy laskeutumiseen.</summary>
        public const double SaattoPerillaKm = 500.0;

        /// <summary>Etenevän rintaman kärki kellon mukaan (Unity: VanaKerros.Karki(Esitys.Vuosia)); null = ei tiedossa.</summary>
        public Func<(double Lat, double Lon)?> Rintama;
        /// <summary>Saattolento käynnissä.</summary>
        public bool Saattaa { get; private set; }
        bool saattoAlkoi;
        double seuraavaAskel;
        static readonly Func<double, double> Lineaarinen = x => x;

        readonly ILinssiYmparisto y;
        (double Lat, double Lon)? lahikuva;
        Nakyma? ajonKohde;
        double ajoPerilla = double.NegativeInfinity;
        bool omaKallistus, muutettu;

        /// <summary>Linssi auki: laskeutuminen ja suoristus käytössä. false linssin sulkeutuessa → paluu avaushetken kallistukseen.</summary>
        public bool Kallista = true;

        /// <summary>Viimeisin kameralle annettu ajo (null = ei vielä yhtään); havainnekuvan väistö kulkee sen käyrällä.</summary>
        public KameraAjo Ajo { get; private set; }
        int ajoja;

        /// <summary>Kääreen kello (s): ajojen alut ja kestot, laskeutumisen ja saattolennon ajastimet.</summary>
        public double Kello => y.Aika;

        /// <summary>Lokirivit (LinssiOhjain.Kirjaa): ajot numeroineen videon ajoitusten todentamiseen; null = ei lokia.</summary>
        public Action<string> Kirjaa;

        public IhmisenMatka2Ymparisto(ILinssiYmparisto sisempi) { y = sisempi ?? throw new ArgumentNullException(nameof(sisempi)); }

        /// <summary>Ajo kameralle ja kirjanpitoon (Ajo).</summary>
        void Aja(Nakyma kohde, float kestoS, Func<double, double> pehmennys, double? kallistukseen)
        {
            Ajo = new KameraAjo(++ajoja, Kello, y.VahennettyLiike ? 0 : Math.Max(0f, kestoS), pehmennys, kohde, kallistukseen);
            Kirjaa?.Invoke($"kääre: ajo #{Ajo.Numero} {Ajo.KestoS:0.00} s, käyrä {KayranKuvaus(Ajo.Kayra)}" +
                (kallistukseen is double k ? $", kallistus {k:0}°" : ""));
            y.AjaKamera(kohde, kestoS, pehmennys, kallistukseen);
        }

        /// <summary>Käyrän muoto lokiin: arvot neljänneksissä ja suurin arvo (kuminauhan ylitys).</summary>
        public static string KayranKuvaus(Func<double, double> kayra)
        {
            if (kayra == null) return "-";
            double yli = 0;
            for (int i = 0; i <= 50; i++) yli = Math.Max(yli, kayra(i / 50.0));
            return System.FormattableString.Invariant($"¼ {kayra(0.25):0.00} ½ {kayra(0.5):0.00} ¾ {kayra(0.75):0.00} max {yli:0.000}");
        }

        /// <summary>Jakson havainnekuvan kohde (laskeutuminen, kun jakson ajo on perillä) tai null (alue, loppu: ei laskua).</summary>
        public void Lahikuva((double Lat, double Lon)? paikka) => lahikuva = Kallista && !y.VahennettyLiike ? paikka : null;

        /// <summary>Jakso alkaa (IhmisenMatka2Tehosteet): saattolento SaattoJaksossa, muuten pois.</summary>
        public void Jakso(string id)
        {
            Saattaa = id == SaattoJakso && Kallista && !y.VahennettyLiike && Rintama != null;
            saattoAlkoi = false;
            seuraavaAskel = Kello;
        }

        /// <summary>Laskeutumisen korkeus (m) saapumiskorkeudesta: ei koskaan ylöspäin.</summary>
        public static double LaskunKorkeus(double saapuminen) =>
            Math.Min(saapuminen, Math.Clamp(saapuminen * LaskunOsuus, LaskuMinKm * 1000.0, LaskuMaxKm * 1000.0));

        public IKarttaKerrokset Kerrokset => y.Kerrokset;
        public Nakyma Kamera => y.Kamera;

        public void AjaKamera(Nakyma kohde, float kestoS, Func<double, double> pehmennys = null, double? kallistukseen = null)
        {
            if (Saattaa)
            {
                // Saattolento ajaa kameraa itse: Esityksen jakson ajo vain talteen (sen kohde ei ole enää kameran asento).
                ajonKohde = kohde;
                ajoPerilla = Kello + Math.Max(0f, kestoS);
                return;
            }
            if (kallistukseen == null)
            {
                // Esitys ajaa suoraan kääreen oman kallistuksen jälkeen; paluuajo palauttaa avaushetken kallistuksen.
                if (!Kallista && muutettu) kallistukseen = kohde.Kallistus;
                else if (Kallista && omaKallistus) kallistukseen = 0.0;
            }
            if (kallistukseen != null) muutettu = true;
            omaKallistus = false;
            ajonKohde = kohde;
            ajoPerilla = Kello + Math.Max(0f, kestoS);
            Aja(kohde, kestoS, pehmennys, kallistukseen);
        }

        /// <summary>Joka kehys (sovittimen Paivita): laskeutuminen, kun jakson ajo on perillä ja kamera on yhä sen kohteessa.</summary>
        public void Paivita()
        {
            if (Saattaa) { PaivitaSaatto(); return; }
            if (lahikuva is not { } p || Kello < ajoPerilla + LaskunViive) return;
            lahikuva = null;
            var nyt = y.Kamera;
            if (ajonKohde is { } k && !Lahella(nyt, k)) return;   // pelaaja siirsi kameraa: ei laskua
            Aja(new Nakyma(p.Lat, p.Lon, LaskunKorkeus(nyt.Korkeus)), LaskuS, null, Kallistus);
            omaKallistus = true;
            muutettu = true;
        }

        /// <summary>Saattolennon osa-ajo rintaman eteläpuolelle, tai laskeutuminen, kun rintama on kohteessa.</summary>
        void PaivitaSaatto()
        {
            double nyt = Kello;
            if (nyt < seuraavaAskel || Rintama?.Invoke() is not { } r) return;
            if (lahikuva is { } p && Km(r, p) < SaattoPerillaKm)
            {
                Saattaa = false;
                lahikuva = null;
                Aja(new Nakyma(p.Lat, p.Lon, LaskunKorkeus(y.Kamera.Korkeus)), LaskuS, null, Kallistus);
                omaKallistus = true;
                muutettu = true;
                return;
            }
            var kohde = new Nakyma(Math.Max(-85.0, r.Lat - SaattoEtaisyysKm / 111.2), r.Lon, SaattoKorkeusKm * 1000.0);
            float kesto = saattoAlkoi ? SaattoAskelS * 1.1f : SaattoAlkuS;
            Aja(kohde, kesto, saattoAlkoi ? Lineaarinen : null, SaattoKallistus);
            seuraavaAskel = nyt + (saattoAlkoi ? SaattoAskelS : SaattoAlkuS * 0.8);
            saattoAlkoi = true;
            omaKallistus = true;
            muutettu = true;
        }

        /// <summary>Isoympyräetäisyys (km).</summary>
        public static double Km((double Lat, double Lon) a, (double Lat, double Lon) b)
        {
            double r = Math.PI / 180.0;
            double c = Math.Sin(a.Lat * r) * Math.Sin(b.Lat * r) + Math.Cos(a.Lat * r) * Math.Cos(b.Lat * r) * Math.Cos((b.Lon - a.Lon) * r);
            return Math.Acos(Math.Clamp(c, -1.0, 1.0)) * 6371.0;
        }

        /// <summary>Kamera ajon kohteessa: sama paikka (1°) ja korkeus (10 %).</summary>
        static bool Lahella(Nakyma a, Nakyma b)
        {
            double dLon = Math.Abs(((a.Lon - b.Lon) % 360 + 540) % 360 - 180);
            return Math.Abs(a.Lat - b.Lat) < 1.0 && dLon < 1.0 && Math.Abs(a.Korkeus - b.Korkeus) <= 0.1 * Math.Max(1.0, b.Korkeus);
        }

        public void ZoomiKatto(double? maxKorkeus) => y.ZoomiKatto(maxKorkeus);
        public void KameraAvaruuteen(double lat, double lon, double pallonSateita) => y.KameraAvaruuteen(lat, lon, pallonSateita);
        public double KokoPallonKorkeus => y.KokoPallonKorkeus;
        public double KorkeusLeveydelle(double leveysAsteina) => y.KorkeusLeveydelle(leveysAsteina);
        public double Kuvasuhde => y.Kuvasuhde;
        public double Nakokulma => y.Nakokulma;
        public void Pelikerrokset(bool nakyvissa) => y.Pelikerrokset(nakyvissa);
        public void Peite(bool paalla) => y.Peite(paalla);
        public void MusiikkiPitoon(bool pidossa) => y.MusiikkiPitoon(pidossa);
        public void LinssiMusiikki(string laji) => y.LinssiMusiikki(laji);
        public void LinssiMusiikkiHimmennys(double taso) => y.LinssiMusiikkiHimmennys(taso);
        public bool VahennettyLiike => y.VahennettyLiike;
        public double Aika => y.Aika;
    }
}
