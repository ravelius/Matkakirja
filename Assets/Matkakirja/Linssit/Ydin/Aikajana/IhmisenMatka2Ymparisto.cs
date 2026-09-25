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
using System;

namespace Matkakirja.Linssit.Aikajana
{
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

        public IhmisenMatka2Ymparisto(ILinssiYmparisto sisempi) { y = sisempi ?? throw new ArgumentNullException(nameof(sisempi)); }

        /// <summary>Jakson havainnekuvan kohde (laskeutuminen, kun jakson ajo on perillä) tai null (alue, loppu: ei laskua).</summary>
        public void Lahikuva((double Lat, double Lon)? paikka) => lahikuva = Kallista && !y.VahennettyLiike ? paikka : null;

        /// <summary>Jakso alkaa (IhmisenMatka2Tehosteet): saattolento SaattoJaksossa, muuten pois.</summary>
        public void Jakso(string id)
        {
            Saattaa = id == SaattoJakso && Kallista && !y.VahennettyLiike && Rintama != null;
            saattoAlkoi = false;
            seuraavaAskel = y.Aika;
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
                ajoPerilla = y.Aika + Math.Max(0f, kestoS);
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
            ajoPerilla = y.Aika + Math.Max(0f, kestoS);
            y.AjaKamera(kohde, kestoS, pehmennys, kallistukseen);
        }

        /// <summary>Joka kehys (sovittimen Paivita): laskeutuminen, kun jakson ajo on perillä ja kamera on yhä sen kohteessa.</summary>
        public void Paivita()
        {
            if (Saattaa) { PaivitaSaatto(); return; }
            if (lahikuva is not { } p || y.Aika < ajoPerilla + LaskunViive) return;
            lahikuva = null;
            var nyt = y.Kamera;
            if (ajonKohde is { } k && !Lahella(nyt, k)) return;   // pelaaja siirsi kameraa: ei laskua
            y.AjaKamera(new Nakyma(p.Lat, p.Lon, LaskunKorkeus(nyt.Korkeus)), LaskuS, null, Kallistus);
            omaKallistus = true;
            muutettu = true;
        }

        /// <summary>Saattolennon osa-ajo rintaman eteläpuolelle, tai laskeutuminen, kun rintama on kohteessa.</summary>
        void PaivitaSaatto()
        {
            double nyt = y.Aika;
            if (nyt < seuraavaAskel || Rintama?.Invoke() is not { } r) return;
            if (lahikuva is { } p && Km(r, p) < SaattoPerillaKm)
            {
                Saattaa = false;
                lahikuva = null;
                y.AjaKamera(new Nakyma(p.Lat, p.Lon, LaskunKorkeus(y.Kamera.Korkeus)), LaskuS, null, Kallistus);
                omaKallistus = true;
                muutettu = true;
                return;
            }
            var kohde = new Nakyma(Math.Max(-85.0, r.Lat - SaattoEtaisyysKm / 111.2), r.Lon, SaattoKorkeusKm * 1000.0);
            float kesto = saattoAlkoi ? SaattoAskelS * 1.1f : SaattoAlkuS;
            y.AjaKamera(kohde, kesto, saattoAlkoi ? Lineaarinen : null, SaattoKallistus);
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
