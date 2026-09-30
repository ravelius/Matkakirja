// POIKKILEIKKAUS-LINSSI: Olavinlinna aukileikattuna, dioraamamoottorin koostaja (speksi docs/raportit/
// dioraama-rajapinnat-20260929.md kohta 5). Ei ILinssi itse (Unity-puolen DioraamaSovitin toteuttaa ILinssin
// ja kääntyy tämän kautta, kohta 6) — puhdas C#-koostaja, joka johtaa KAIKEN ajasta ja tallennetuista
// tapahtumista (ElavaKohtaus-malli): sama t antaa saman näkymän (pysäytyskuvat).
//
// TULKINNAT (ei JS-viitettä eikä testivektoreita tälle luokalle — vain speksin kohta 5 + tehtävänannon
// täsmennys "käsikirjoitus alkaa kun kamera on saapunut kohdetilaan; pulu lentää edellisestä
// laskeutumispisteestä tilan laskeutumispisteeseen pulu-lenna-askeleen aikana". Kirjattu myös raporttiin):
//  - Kohdista(tilaId, t) tallentaa Kameratapahtuman heti (Kesto = SiirtymanKesto), mutta Kohdista ei saa
//    pysty-lippua (se tulee vasta NakymaHetkella-kyselyssä). Yleisnäkymän (kohde null) ASENTO kestolaskuun
//    otetaan aina vaakasuunnasta (YleisVaaka): kesto riippuu vain kohteen/etäisyyden erosta, ja vaaka/pysty
//    yleisnäkymillä on sama kohde, joten valinta ei vaikuta itse interpolaatioon (SiirtymaAsento hakee aina
//    ajantasaisen pysty-lipun mukaisen asennon uudestaan kyselyhetkellä).
//  - Käsikirjoituksen paikallinen kello alkaa vasta, kun kamerasiirtymä KOHTEESEEN on valmis (Hetki + Kesto),
//    ei Kohdista-kutsun hetkestä. Ennen saapumista (paikallinen aika &lt; 0) mikään käsikirjoituksen askel ei
//    ole vielä näkyvissä: Pulu istuu edellisellä laskeutumispisteellä, PuluLentaa = false, TauluAuki = false,
//    Kohta = -1.
//  - Pulu lentää ensimmäisen 'pulu-lenna'-askeleen ajan tilan omalle laskeutumispisteelle edellisen VIERAILLUN
//    (ei-null) tilan laskeutumispisteeltä, tai Rakennus.PuluLaskeutumiselta jos mitään tilaa ei ole vielä
//    vierailtu (linnan oma piste). Ennen pulu-lenna-askelta se on lähtöpisteessä, sen jälkeen kohteessa.
//  - Kohta (taulun aktiivinen kohta) on viimeisimmän saavutetun 'kohta'-askeleen N kuluvassa käsikirjoituksessa
//    (pysyy näkyvissä myöhempien askelten ajan). TauluAuki on tosi ensimmäisestä 'taulu'-askeleesta alkaen
//    käsikirjoituksen loppuun ja sen jälkeenkin, kunnes kamera lähtee tilasta (Linnanrakentaja 29.9.: taulu ei
//    välähdä 0,25 s:ssa kiinni). Puhuja ja Repliikki kertovat kuluvan puheaskeleen: 'kohta' = pulu + kohdan teksti,
//    'repliikki' = hahmo + Repliikit[askel.N] (KORJATTU 29.9.2026, katselmointi: ei aina Repliikit[0]), 'reaktio' =
//    pulu + hahmon Reaktio; muuten null. Askel + AskeleenAani kertovat saman askeleen indeksin ja äänipankin id:n
//    (DioraamaAanet.cs käyttää näitä, ei tekstiä, tunnistaakseen askeleen vaihtumisen ja soittaakseen äänen).
//  - Pystynäytössä tilan kamera on KameraPysty, jos data antaa sen (muuten Kamera).
//  - LEIJUNTA JA KIERRON RAJAUS (era 2b, dioraama-rajapinnat-era2b-20260929.md kohta 5, agentti P5): Leijunta-
//    ominaisuus (oletus pois, "poikki drift 0|1" DioraamaSovitin.cs:ssä) lisää Kameraliike.Leijunta-ajelehduksen
//    NakymaHetkellän palauttamaan kameraan VAIN kun kamera on levossa (ei kesken siirtymää) EIKÄ pelaaja vedä/
//    nipistä (VetoKaynnissa-ominaisuus; Unity-puolen DioraamaSyote asettaa tämän joka kehys kosketusten määrän
//    mukaan). RajaaPelaajanAsento on Unity-puolen (DioraamaSyote.Sovita) kutsupiste Kameraliike.RajaaKierrolle:
//    "perus" saa tässä olla NakymaHetkellän palauttama (mahdollisesti leijunnan siirtämä) kamera-asento sellaisenaan
//    — leijunnan ±3°/±1,5°-poikkeama perusasennossa on mitätön kierron rajoihin nähden (±55° tms.), joten erillistä
//    "puhdasta" perusasentoa ei tarvita rajauksen vertailukohdaksi. yleisnakyma-tieto RajaaKierrolle tulee
//    viimeisimmän Kohdista-kutsun kohteesta (null = yleisnäkymä), ei erillisenä parametrina kutsujalta.
//  - AVAUS (Linnanrakentaja 29.9.): ensimmäisessä yleisnäkymässä (tapahtuma 0) ajetaan linnan oma käsikirjoitus
//    AvausViive s avauksen jälkeen: Pulu liitää taivaalta (TaivasPiste) linnan laskeutumispisteeseen, ja taulu
//    esittää linnan 3 ydinasiaa (pulu-lenna, taulu, kohta 0–2). Myöhemmät paluut yleisnäkymään eivät toista sitä.
//  - Napauta(t) tallentaa napautushetken; NakymaHetkella rajaa sen käsikirjoituksen OMAAN "istuntoon" (saapumisen
//    ja seuraavan Kohdista-kutsun välille) ja siirtää sen paikalliselle kellolle ennen Ohjaaja.KasikirjoitusHetkellaa,
//    jotta sama napautus ei vuoda toisen tilan käsikirjoitukseen.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit;

namespace Matkakirja.Linssit.Dioraama
{
    /// <summary>Yhden hahmon näkyvä tila Nakyma-koosteessa (tila + hahmo yksilöity).</summary>
    public readonly struct HahmoNakyma
    {
        public readonly string TilaId, HahmoId;
        public readonly bool Naky;
        public readonly string Silmukka;
        public readonly int Ruutu;
        public HahmoNakyma(string tilaId, string hahmoId, bool naky, string silmukka, int ruutu)
        { TilaId = tilaId; HahmoId = hahmoId; Naky = naky; Silmukka = silmukka; Ruutu = ruutu; }
    }

    /// <summary>Koko dioraaman näkyvä tila hetkellä t (PoikkileikkausLinssi.NakymaHetkella-metodin paluuarvo).</summary>
    public readonly struct Nakyma
    {
        public readonly Asento Kamera;
        public readonly Dictionary<string, int> Tasot;
        public readonly List<HahmoNakyma> Hahmot;
        public readonly V3 Pulu;
        public readonly bool PuluLentaa;
        public readonly bool TauluAuki;
        public readonly int Kohta;
        public readonly string KohdeTila;
        /// <summary>Kuluvan puheaskeleen puhuja ("pulu" tai hahmon id) ja teksti; null kun kukaan ei puhu.</summary>
        public readonly string Puhuja, Repliikki;
        /// <summary>Kuluvan käsikirjoitusaskeleen indeksi tilan (tai avauksessa linnan) Kasikirjoitus-listassa;
        /// -1 = ei käynnissä olevaa puheaskelta. DioraamaAanet tunnistaa askeleen VAIHTUMISEN parilla
        /// (KohdeTila, Askel), ei tekstillä (korjattu 29.9.2026, katselmointi: teksti on hauras avain).</summary>
        public readonly int Askel;
        /// <summary>Kuluvan askeleen äänipankin id (repliikki[N].Aani, reaktion Aani tai taulun kohdan Aani);
        /// null kun ei puhetta tai askeleella ei ole ääntä.</summary>
        public readonly string AskeleenAani;
        /// <summary>Kuluvan tilan (tai avauksessa linnan) käsikirjoitus on kokonaan läpi ja taulu jää näkyviin
        /// (era 3 kohta 5, Kiertue): seuraava napautus siirtää kiertueella eteenpäin.</summary>
        public readonly bool KasikirjoitusLopussa;
        /// <summary>UUSI LINNA (30.9.2026): kertojan kierroksen jakso (−1 = ei kierrosta) ja sen teksti, kun teksti
        /// näkyy (lennon loppuosa ja pysähdys); null lennon alussa ja kierroksen ulkopuolella.</summary>
        public readonly int KertojaJakso;
        public readonly string KertojaTeksti;

        public Nakyma(Asento kamera, Dictionary<string, int> tasot, List<HahmoNakyma> hahmot, V3 pulu,
            bool puluLentaa, bool tauluAuki, int kohta, string kohdeTila, string puhuja = null, string repliikki = null,
            int askel = -1, string askeleenAani = null, bool kasikirjoitusLopussa = false, int kertojaJakso = -1,
            string kertojaTeksti = null)
        {
            KasikirjoitusLopussa = kasikirjoitusLopussa;
            KertojaJakso = kertojaJakso; KertojaTeksti = kertojaTeksti;
            Kamera = kamera; Tasot = tasot; Hahmot = hahmot; Pulu = pulu;
            PuluLentaa = puluLentaa; TauluAuki = tauluAuki; Kohta = kohta; KohdeTila = kohdeTila;
            Puhuja = puhuja; Repliikki = repliikki; Askel = askel; AskeleenAani = askeleenAani;
        }
    }

    public sealed class PoikkileikkausLinssi
    {
        public static readonly LinssiTiedot PoikkiTiedot = new LinssiTiedot
        {
            Id = "poikkileikkaus",
            Nimi = "Poikkileikkaus",
            Lyhyt = "Olavinlinna aukileikattuna",
            Jarjestys = 250,
            Kesken = true,
            // 24×24: kevyt porrastettu torni + vino leikkausviiva (ei svg-kuorta).
            Ikoni = "<path d=\"M8 21V13H7V10H9V7H11V5H13V7H15V10H17V13H16V21Z\"/>"
                + "<path d=\"M8 16H16\"/>"
                + "<path d=\"M4 20L19 4\" stroke-dasharray=\"1.6 2.2\"/>",
        };

        public LinssiTiedot Tiedot => PoikkiTiedot;
        public Rakennus Rakennus { get; private set; }
        public bool Auki { get; private set; }
        /// <summary>Ajelehtiminen levossa (era 2b, "poikki drift 0|1"); oletus pois. Ks. tiedoston alkukommentti.</summary>
        public bool Leijunta { get; set; }
        /// <summary>Unity-puoli (DioraamaSyote) asettaa tämän joka kehys: tosi kun sormi/sormet ovat ruudulla
        /// ja ele vaikuttaa kameraan (ei UI:n peittämä). Leijunta ei etene tämän ollessa tosi.</summary>
        public bool VetoKaynnissa { get; set; }

        readonly List<Kameratapahtuma> tapahtumat = new List<Kameratapahtuma>();
        readonly List<double> napautukset = new List<double>();
        /// <summary>Linnan oma "tila" avauksen käsikirjoitukselle (taulu = linnan 3 ydinasiaa).</summary>
        Tila linnaTila;

        /// <summary>Avauksen käsikirjoitus alkaa näin monta sekuntia avauksen jälkeen (näkymä ehtii asettua).</summary>
        public const double AvausViive = 0.8;
        /// <summary>Pulun lähtöpiste avauksessa: taivaalta linnan laskeutumispisteen länsi-lounaan yläpuolelta.</summary>
        public static readonly V3 TaivasSiirtyma = new V3(-30, 25, 20);

        // --- ELÄVÄ LINNA: saapumiskaari (käsikirjoitus 29.9. kohta 1; Siirtoseppä) -------------------------------------
        double saapumisKesto, ohitusT = -1, ohitusU;
        /// <summary>Napautus kaaren aikana kiihdyttää loppuun tässä ajassa (s).</summary>
        public const double SaapumisOhitusS = 1.0;

        /// <summary>Kaaren alkuasento: yleisnäkymän kohde (tai saapuminen.alku.kohde), alku-atsimuutti/etäisyys/korkeus.</summary>
        Asento SaapumisAsento(bool pysty)
        {
            var yleis = AsentoFor(null, pysty);
            var s = Rakennus.Saapuminen;
            return new Asento(s.Kohde ?? yleis.Kohde, s.Atsimuutti, s.Korkeus, s.Etaisyys, s.Fov ?? yleis.Fov, yleis.Aukko, yleis.Kierto);
        }

        /// <summary>Kaaren eteneminen 0…1 hetkellä t (ohituksen jälkeen jatkuu tasaisesti loppuun SaapumisOhitusS:ssa).</summary>
        public double SaapuminenOsuus(double t)
        {
            if (!Auki || Rakennus?.Saapuminen == null || saapumisKesto <= 0 || tapahtumat.Count == 0) return 1;
            double alku = tapahtumat[0].Hetki;
            if (ohitusT >= 0) return Math.Min(1, ohitusU + (1 - ohitusU) * Math.Max(0, (t - ohitusT) / SaapumisOhitusS));
            return Math.Max(0, Math.Min(1, (t - alku) / saapumisKesto));
        }

        /// <summary>Onko saapumiskaari kesken (napautus ohittaa eikä kohdista).</summary>
        public bool SaapuminenKaynnissa(double t) => SaapuminenOsuus(t) < 1 && tapahtumat.Count == 1;

        Asento AsentoFor(string kohde, bool pysty)
        {
            if (kohde == null) return pysty ? Rakennus.YleisPysty : Rakennus.YleisVaaka;
            var tila = Rakennus.Tila(kohde);
            return pysty && tila.KameraPysty.HasValue ? tila.KameraPysty.Value : tila.Kamera;
        }

        /// <summary>Avaa dioraaman hetkellä t: kamera yleisnäkymässä, ei tapahtumia eikä napautuksia vielä.</summary>
        public void Avaa(Rakennus rakennus, double t) => Avaa(rakennus, t, false);

        /// <summary>Kuten yllä; lyhyt = toinen käynti (saapumiskaari Saapuminen.Lyhyt sekuntia, elävä linna).</summary>
        public void Avaa(Rakennus rakennus, double t, bool lyhyt)
        {
            Rakennus = rakennus ?? throw new ArgumentNullException(nameof(rakennus));
            Auki = true;
            linnaTila = new Tila
            {
                Id = null, Nimi = rakennus.Nimi, Taulu = rakennus.Taulu, PuluLaskeutuminen = rakennus.PuluLaskeutuminen,
                Kasikirjoitus = new List<Askel> { new Askel { Tee = "pulu-lenna" }, new Askel { Tee = "taulu" } },
            };
            int kohtia = rakennus.Taulu?.Kohdat?.Count ?? 0;
            for (int k = 0; k < Math.Min(3, kohtia); k++) linnaTila.Kasikirjoitus.Add(new Askel { Tee = "kohta", N = k });
            tapahtumat.Clear();
            // ELÄVÄ LINNA, saapuminen (Siirtoseppä 29.9.): avaustapahtuman kesto = kaaren kesto; käsikirjoitus alkaa
            // vasta kaaren jälkeen (sama Hetki + Kesto -sääntö kuin tiloissa).
            saapumisKesto = rakennus.Saapuminen != null ? Math.Max(0, lyhyt ? rakennus.Saapuminen.Lyhyt : rakennus.Saapuminen.Kesto) : 0;
            ohitusT = -1; ohitusU = 0;
            tapahtumat.Add(new Kameratapahtuma(t, null, saapumisKesto));
            napautukset.Clear();
            kertojaAlku = -1; kertojaLahto = null; kertojaOhitukset.Clear();
            // Toisella käynnillä (lyhyt) kierros ei ala itsestään; ↻ (KertojaUudelleen) toistaa sen.
            kertojaVainUusintana = lyhyt;
        }
        bool kertojaVainUusintana;

        // --- UUSI LINNA: kertojan esittely ja kamerakierros (omistaja 30.9.2026; Siirtosepän toteutus) ---------------------
        // Saapumisen (lyhyt) jälkeen kamera lentää jaksosta toiseen (Rakennus.Kertoja): lento 1,2–2,5 s ja pysähdys jakson keston
        // ajan, teksti näkyy lennon viimeisestä 40 %:sta pysähdyksen loppuun. Napautus päättää jakson heti (seuraava lento alkaa),
        // huoneen kohdistus (Kohdista) katkaisee kierroksen, ja lopuksi kamera palaa yleisnäkymään. Kaikki johdetaan ajasta ja
        // tallennetuista napautuksista (sama t → sama näkymä), kuten muukin linssi.
        double kertojaAlku = -1;           // −1 = ensimmäinen kierros alkaa saapumisen lopussa (seuraa saapumisen ohitusta)
        string kertojaLahto;               // uusinnan lähtötila (null = yleisnäkymä)
        readonly List<double> kertojaOhitukset = new List<double>();
        public const double KertojaLentoMin = 1.2, KertojaLentoMax = 2.5, KertojaTekstiOsuus = 0.6;

        double KertojaAlku => kertojaAlku >= 0 ? kertojaAlku
            : tapahtumat.Count > 0 ? tapahtumat[0].Hetki + tapahtumat[0].Kesto : double.PositiveInfinity;

        /// <summary>Onko kertojan kierros käynnissä hetkellä t (napautus ohittaa jakson, ei kohdista).</summary>
        public bool KertojaKaynnissa(double t) => Auki && Kierros(t, false).Kaynnissa;

        /// <summary>Onko linnalla kierros, joka ei ole käynnissä (UI:n uusintanappi näkyy).</summary>
        public bool KertojaUusittavissa(double t) => Auki && Rakennus?.Kertoja != null && Rakennus.Kertoja.Count > 0
            && t >= KertojaAlku && !Kierros(t, false).Kaynnissa;

        /// <summary>Uusinta (↻-nappi): kierros alusta nykyisestä kamerasta; aiemmat jaksojen ohitukset unohtuvat.</summary>
        public void KertojaUudelleen(double t)
        {
            if (Rakennus?.Kertoja == null || Rakennus.Kertoja.Count == 0) return;
            kertojaLahto = tapahtumat.Count > 0 ? tapahtumat[ViimeisinIndeksi(t)].Kohde : null;
            kertojaAlku = t;
            kertojaOhitukset.Clear();
        }

        Asento JaksonAsento(KertojaJakso j, bool pysty) => pysty && j.KameraPysty.HasValue ? j.KameraPysty.Value : j.Kamera;

        static double KertojaLento(Asento a, Asento b) =>
            Math.Max(KertojaLentoMin, Math.Min(KertojaLentoMax, Kameraliike.SiirtymanKesto(a, b)));

        /// <summary>Kierroksen tila hetkellä t: käynnissä, kamera, jakso (−1 = paluulento yleisnäkymään) ja näkyvä teksti.</summary>
        (bool Kaynnissa, Asento Kamera, int Jakso, string Teksti, double U) Kierros(double t, bool pysty)
        {
            var jaksot = Rakennus?.Kertoja;
            if (jaksot == null || jaksot.Count == 0) return (false, default, -1, null, 0);
            if (kertojaVainUusintana && kertojaAlku < 0) return (false, default, -1, null, 0);
            double s = KertojaAlku;
            if (t < s || double.IsInfinity(s)) return (false, default, -1, null, 0);
            // Huoneen kohdistus kierroksen alun jälkeen katkaisee kierroksen.
            foreach (var e in tapahtumat) if (e.Hetki > s && e.Hetki <= t) return (false, default, -1, null, 0);
            var edellinen = AsentoFor(kertojaAlku >= 0 ? kertojaLahto : null, pysty);
            double kursori = s;
            int ohitus = 0; // kukin napautus päättää täsmälleen yhden jakson
            while (ohitus < kertojaOhitukset.Count && kertojaOhitukset[ohitus] < s) ohitus++;
            for (int j = 0; j < jaksot.Count; j++)
            {
                var kohde = JaksonAsento(jaksot[j], pysty);
                double lento = KertojaLento(edellinen, kohde), loppu = kursori + lento + jaksot[j].Kesto;
                if (ohitus < kertojaOhitukset.Count && kertojaOhitukset[ohitus] < loppu) loppu = Math.Max(kursori, kertojaOhitukset[ohitus++]);
                if (t < loppu)
                {
                    double u = lento > 0 ? (t - kursori) / lento : 1;
                    var kamera = u < 1 ? Kameraliike.SiirtymaAsento(edellinen, kohde, u) : kohde;
                    return (true, kamera, j, u >= KertojaTekstiOsuus ? jaksot[j].Teksti : null, u);
                }
                double uLoppu = lento > 0 ? (loppu - kursori) / lento : 1;
                edellinen = uLoppu < 1 ? Kameraliike.SiirtymaAsento(edellinen, kohde, uLoppu) : kohde;
                kursori = loppu;
            }
            var yleis = AsentoFor(null, pysty);
            double paluu = KertojaLento(edellinen, yleis);
            if (t < kursori + paluu) return (true, Kameraliike.SiirtymaAsento(edellinen, yleis, (t - kursori) / paluu), -1, null, (t - kursori) / paluu);
            return (false, default, -1, null, 0);
        }

        public void Sulje()
        {
            Auki = false;
        }

        /// <summary>Kohdistaa kameran tilaan (null = yleisnäkymä) hetkellä t; lisää Kameratapahtuman jonka
        /// kesto on Kameraliike.SiirtymanKesto edellisestä kohteesta.</summary>
        public void Kohdista(string tilaId, double t)
        {
            string edellinen = tapahtumat.Count > 0 ? tapahtumat[tapahtumat.Count - 1].Kohde : null;
            var p0 = AsentoFor(edellinen, false);
            var p1 = AsentoFor(tilaId, false);
            // Elävä linna: lento leikkausikkunan kautta 0,8–1,2 s (käsikirjoitus kohta 2); vanha kokemus ennallaan.
            double kesto = Rakennus?.Saapuminen != null ? Kameraliike.LeikkausLennonKesto(p0, p1) : Kameraliike.SiirtymanKesto(p0, p1);
            tapahtumat.Add(new Kameratapahtuma(t, tilaId, kesto));
        }

        /// <summary>Napautus hetkellä t: päättää meneillään olevan käsikirjoitusaskeleen (Ohjaaja.KasikirjoitusHetkella).
        /// KIERTUE (era 3 kohta 5): jos käsikirjoitus on jo lopussa (taulu jää näkyviin), napautus siirtää
        /// kiertueella eteenpäin: Kohdista(SeuraavaKiertueella(nykyinen)), tai yleisnäkymään kun seuraavaa ei ole.
        /// Yleisnäkymässä (linnan avaustaulu lopussa) napautus vie kiertueen ensimmäiseen tilaan. Muuten kuten ennen.</summary>
        public void Napauta(double t)
        {
            // Saapumiskaaren aikana napautus kiihdyttää kaaren loppuun (käsikirjoitus: "ohitettavissa napautuksella").
            if (SaapuminenKaynnissa(t) && ohitusT < 0)
            {
                ohitusU = SaapuminenOsuus(t);
                ohitusT = t;
                var e0 = tapahtumat[0];
                tapahtumat[0] = new Kameratapahtuma(e0.Hetki, null, t + SaapumisOhitusS - e0.Hetki);
                return;
            }
            // Kertojan kierroksella napautus päättää jakson (seuraava lento alkaa heti).
            if (Rakennus != null && Kierros(t, false).Kaynnissa) { kertojaOhitukset.Add(t); kertojaOhitukset.Sort(); return; }
            var nyt = Auki && Rakennus != null && tapahtumat.Count > 0 ? NakymaHetkella(t, false) : default(Nakyma);
            if (nyt.KasikirjoitusLopussa)
            {
                string nykyinen = nyt.KohdeTila;
                // Yleisnäkymässä ilman kiertuetta ei ole minne siirtyä: napautus jää tavalliseksi napautukseksi.
                if (nykyinen != null || Rakennus.Kiertue.Count > 0)
                {
                    Kohdista(Ohjaaja.SeuraavaKiertueella(Rakennus, nykyinen), t);
                    return;
                }
            }
            napautukset.Add(t);
        }

        /// <summary>
        /// Rajaa pelaajan vedon/nipistyksen tuottaman asennon (Kameraliike.PelaajanAsento-tulos) kierron rajoihin
        /// (era 2b, kohta 1/5). Unity-puoli (DioraamaSyote.Sovita) kutsuu tätä sen sijaan, että soveltaisi
        /// Kameraliike.RajaaKierrolle itse — tämä metodi tietää, onko viimeisin kohdistus tila vai yleisnäkymä
        /// (yleisnakyma-parametri Kameraliike.RajaaKierrolle), Unity-puolen ei tarvitse tuntea tapahtumat-listaa.
        /// </summary>
        public Asento RajaaPelaajanAsento(Asento perus, Asento pelaajanAsento)
        {
            bool yleisnakyma = tapahtumat.Count == 0 || tapahtumat[tapahtumat.Count - 1].Kohde == null;
            return Kameraliike.RajaaKierto(perus, pelaajanAsento, yleisnakyma);
        }

        /// <summary>Viimeisen tapahtuman indeksi jonka Hetki ≤ t (sama malli kuin Heratys.ViimeisinKohde).</summary>
        /// <summary>
        /// LINNA, leikkausikkuna (Siirtoseppä 29.9.2026, speksi dioraama-rajapinnat-blender kohta 3): mikä tila on auki
        /// leikattuna ja kuinka paljon (0…1) hetkellä t. Tilaan lennettäessä leikkaus kasvaa 0 → 1 kaarilennon
        /// jälkipuoliskolla (smoothstep), tilasta poistuttaessa se sulkeutuu 1 → 0 alkupuoliskolla; levossa tilassa 1,
        /// yleisnäkymässä (null, 0). Tilasta toiseen: ensin vanha sulkeutuu, sitten uusi aukeaa.
        /// </summary>
        public (string tila, double osuus) LeikkausHetkella(double t)
        {
            // Kertojan kierros: jakson tila (esim. laituri kuoren sisällä) aukeaa lennon jälkipuoliskolla ja sulkeutuu
            // seuraavan lennon alkupuoliskolla (1.1 (74) -kuva: laiturijakso näytti vain kuoren muurin).
            var kierros = Kierros(t, false);
            if (kierros.Kaynnissa)
            {
                double Pehmea(double x) { x = Math.Max(0, Math.Min(1, x)); return x * x * (3 - 2 * x); }
                var jaksot = Rakennus.Kertoja;
                string tama = kierros.Jakso >= 0 ? jaksot[kierros.Jakso].Tila : null;
                string edellinenTila = kierros.Jakso > 0 ? jaksot[kierros.Jakso - 1].Tila
                    : kierros.Jakso < 0 && jaksot.Count > 0 ? jaksot[jaksot.Count - 1].Tila : null;
                if (kierros.U < 0.5 && edellinenTila != null && edellinenTila != tama) return (edellinenTila, 1 - Pehmea(kierros.U * 2));
                if (tama != null) return (tama, edellinenTila == tama ? 1.0 : Pehmea((kierros.U - 0.5) * 2));
                return (null, 0.0);
            }
            int i = ViimeisinIndeksi(t);
            var e = tapahtumat[i];
            string edellinen = i > 0 ? tapahtumat[i - 1].Kohde : null;
            if (i == 0 || e.Kesto <= 0 || t >= e.Hetki + e.Kesto) return (e.Kohde, e.Kohde != null ? 1.0 : 0.0);
            double u = (t - e.Hetki) / e.Kesto;
            double Tasaa(double x) { x = Math.Max(0, Math.Min(1, x)); return x * x * (3 - 2 * x); }
            if (u < 0.5) return edellinen != null ? (edellinen, 1 - Tasaa(u * 2)) : (null, 0.0);
            return e.Kohde != null ? (e.Kohde, Tasaa((u - 0.5) * 2)) : (null, 0.0);
        }

        int ViimeisinIndeksi(double t)
        {
            int i = 0;
            for (int k = 0; k < tapahtumat.Count; k++) if (tapahtumat[k].Hetki <= t) i = k;
            return i;
        }

        /// <summary>Viimeisin laskeutumispiste ENNEN annettua tapahtumaindeksiä (skannaa taaksepäin ensimmäiseen
        /// ei-null-kohteeseen); linnan oma piste jos mitään tilaa ei ole vielä vierailtu.</summary>
        V3 EdellinenLaskeutuminen(int ennenIndeksia)
        {
            for (int k = ennenIndeksia - 1; k >= 0; k--)
            {
                var kohde = tapahtumat[k].Kohde;
                if (kohde == null) continue;
                var tila = Rakennus.Tila(kohde);
                if (tila != null) return tila.PuluLaskeutuminen;
            }
            return Rakennus.PuluLaskeutuminen;
        }

        /// <summary>
        /// Koko näkyvä tila hetkellä t. Kaikki johdetaan ajasta ja tallennetuista tapahtumista (Kohdista,
        /// Napauta): sama t antaa aina saman näkymän. pysty valitsee yleisnäkymän kameran (vaaka/pysty).
        /// </summary>
        public Nakyma NakymaHetkella(double t, bool pysty)
        {
            int i = ViimeisinIndeksi(t);
            var tapahtuma = tapahtumat[i];
            string kohdeTila = tapahtuma.Kohde;
            var p1 = AsentoFor(kohdeTila, pysty);

            Asento kamera;
            if (i == 0 && Rakennus.Saapuminen != null && tapahtuma.Kesto > 0 && t < tapahtuma.Hetki + tapahtuma.Kesto)
                kamera = Kameraliike.SiirtymaAsento(SaapumisAsento(pysty), p1, SaapuminenOsuus(t));
            else if (i == 0 || tapahtuma.Kesto <= 0 || t >= tapahtuma.Hetki + tapahtuma.Kesto)
            {
                // Levossa (ei kesken siirtymää): leijunta saa ajelehtia VAIN tässä haarassa, ei kaarilennon aikana,
                // ja vain kun pelaaja ei vedä/nipistä (VetoKaynnissa) — ks. tiedoston alkukommentti.
                kamera = Leijunta && !VetoKaynnissa ? Kameraliike.Leijunta(p1, t) : p1;
            }
            else
            {
                var p0 = AsentoFor(tapahtumat[i - 1].Kohde, pysty);
                double paikallinenT = (t - tapahtuma.Hetki) / tapahtuma.Kesto;
                kamera = Kameraliike.SiirtymaAsento(p0, p1, paikallinenT);
            }

            var kierros = Kierros(t, pysty);
            if (kierros.Kaynnissa) kamera = kierros.Kamera;

            var tasot = new Dictionary<string, int>();
            var hahmot = new List<HahmoNakyma>();
            foreach (var tila in Rakennus.Tilat)
            {
                var (taso, _) = Heratys.TilanTaso(Rakennus, tapahtumat, tila.Id, t);
                tasot[tila.Id] = taso;
                for (int hi = 0; hi < tila.Hahmot.Count; hi++)
                {
                    var ht = Heratys.HahmonTila(Rakennus, tapahtumat, tila.Id, hi, t);
                    hahmot.Add(new HahmoNakyma(tila.Id, tila.Hahmot[hi].Id, ht.Naky, ht.Silmukka, ht.Ruutu));
                }
            }

            V3 pulu;
            bool puluLentaa = false, tauluAuki = false;
            int kohta = -1;
            string puhuja = null, repliikki = null;
            int askel = -1;
            string askeleenAani = null;
            bool lopussa = false;

            // Uusi linna: kertojan kierros korvaa linnan avaustaulun (Pulun kohdat 1/3).
            bool avaus = kohdeTila == null && i == 0 && Rakennus.Taulu?.Kohdat != null && Rakennus.Taulu.Kohdat.Count > 0
                && (Rakennus.Kertoja == null || Rakennus.Kertoja.Count == 0);
            if (kohdeTila == null && !avaus)
            {
                pulu = EdellinenLaskeutuminen(i + 1);
            }
            else
            {
                var tila = avaus ? linnaTila : Rakennus.Tila(kohdeTila);
                double kasikirjoitusAlku = tapahtuma.Hetki + tapahtuma.Kesto + (avaus ? AvausViive : 0);
                double paikallinenAika = t - kasikirjoitusAlku;
                var kestot = new List<double>(tila.Kasikirjoitus.Count);
                foreach (var a in tila.Kasikirjoitus) kestot.Add(Ohjaaja.AskeleenKesto(a, tila, Rakennus));

                double sessionLoppu = i + 1 < tapahtumat.Count ? tapahtumat[i + 1].Hetki : double.PositiveInfinity;
                var napitLokaali = new List<double>();
                foreach (var nap in napautukset)
                    if (nap >= kasikirjoitusAlku && nap < sessionLoppu) napitLokaali.Add(nap - kasikirjoitusAlku);

                var edellinenLaskeutuminen = avaus ? Rakennus.PuluLaskeutuminen + TaivasSiirtyma : EdellinenLaskeutuminen(i);
                var tamanLaskeutuminen = tila.PuluLaskeutuminen;

                if (paikallinenAika < 0 || tila.Kasikirjoitus.Count == 0)
                {
                    pulu = edellinenLaskeutuminen;
                }
                else
                {
                    var kt = Ohjaaja.KasikirjoitusHetkella(kestot, napitLokaali, paikallinenAika);
                    int idx = kt.Indeksi;
                    lopussa = kt.Valmis;
                    int puluIdx = -1;
                    for (int qi = 0; qi < tila.Kasikirjoitus.Count; qi++)
                        if (tila.Kasikirjoitus[qi].Tee == "pulu-lenna") { puluIdx = qi; break; }

                    if (puluIdx < 0 || idx < puluIdx) pulu = edellinenLaskeutuminen;
                    else if (idx == puluIdx)
                    {
                        double t01 = kestot[puluIdx] > 0 ? kt.Paikallinen / kestot[puluIdx] : 1;
                        pulu = Ohjaaja.PuluLento(edellinenLaskeutuminen, tamanLaskeutuminen, t01);
                        puluLentaa = true;
                    }
                    else pulu = tamanLaskeutuminen;

                    if (idx >= 0 && idx < tila.Kasikirjoitus.Count)
                    {
                        for (int qi = idx; qi >= 0; qi--)
                            if (tila.Kasikirjoitus[qi].Tee == "taulu") { tauluAuki = true; break; }
                        for (int qi = idx; qi >= 0; qi--)
                            if (tila.Kasikirjoitus[qi].Tee == "kohta") { kohta = tila.Kasikirjoitus[qi].N; break; }
                        if (!kt.Valmis)
                        {
                            askel = idx;
                            (puhuja, repliikki, askeleenAani) = Puhe(tila, tila.Kasikirjoitus[idx]);
                        }
                    }
                }
            }

            return new Nakyma(kamera, tasot, hahmot, pulu, puluLentaa, tauluAuki, kohta, kohdeTila, puhuja, repliikki,
                askel, askeleenAani, lopussa, kierros.Kaynnissa ? kierros.Jakso : -1, kierros.Kaynnissa ? kierros.Teksti : null);
        }

        /// <summary>Puheaskeleen puhuja, teksti ja äänipankin id (kohta, repliikki, reaktio); muut askeleet
        /// (null, null, null). KORJATTU (29.9.2026, katselmointi): repliikki-askel käyttää askel.N:ää eikä aina
        /// Repliikit[0]:aa (askel.N valitsee rivin, kuten Ohjaaja.AskeleenKesto tekee jo). Äänen id tulee suoraan
        /// askeleesta, ei DioraamaAanet.cs:n aiemmasta tekstitäsmäytyksestä (EtsiAskeleenAani, poistettu).</summary>
        static (string Puhuja, string Repliikki, string Aani) Puhe(Tila tila, Askel askel)
        {
            switch (askel.Tee)
            {
                case "kohta":
                    var kohdat = tila.Taulu?.Kohdat;
                    return kohdat != null && askel.N >= 0 && askel.N < kohdat.Count
                        ? ("pulu", kohdat[askel.N].Teksti, kohdat[askel.N].Aani) : (null, null, null);
                case "repliikki":
                case "reaktio":
                    Hahmo h = null;
                    foreach (var x in tila.Hahmot) if (x.Id == askel.HahmoId) { h = x; break; }
                    if (h == null) return (null, null, null);
                    if (askel.Tee == "reaktio")
                        return h.Reaktio != null ? ("pulu", h.Reaktio.Teksti, h.Reaktio.Aani) : (null, null, null);
                    return askel.N >= 0 && askel.N < h.Repliikit.Count
                        ? (h.Id, h.Repliikit[askel.N].Teksti, h.Repliikit[askel.N].Aani) : (null, null, null);
                default:
                    return (null, null, null);
            }
        }
    }
}
