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
            // Omistaja 4.10.2026 klo 23.0x: "tuo linna valmiisiin ... luo parempi nimi linnalle" (nimi ja lyhyt Päätoimittajalta).
            Nimi = "Muurien sisällä",
            Lyhyt = "Olavinlinna vuonna 1475 aukileikattuna: kurkista saleihin ja tapaa linnan väki.",
            Jarjestys = 250,
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

        // --- KUVASUHTEEN SOVITUS (arvioijakierros 30.9., 1.1 (75): linna rajautui iPhonella oikeasta reunasta) --------------
        // Laajat kuvat (yleisnäkymä ja kertojan jaksot, joiden etäisyys ≥ 0,8 × yleisnäkymän) keskitetään linnan tilojen
        // pohjapiirroksen (tilojen rajat, massa pois) keskelle kameran sivusuunnassa ja vedetään niin kauas, että koko
        // leveys (+10 %) mahtuu todelliseen vaakakenttään: tan(h/2) = tan(fov/2) · kuvasuhde. Etäisyys vain kasvaa.
        /// <summary>Näkymän leveys/korkeus (Unity asettaa joka ruutu); 0 = ei sovitusta (Ydin-testit).</summary>
        public double Kuvasuhde { get; set; }
        double pohjaMinX, pohjaMaxX, pohjaMinZ, pohjaMaxZ;
        bool pohjaOn, pohjaKuoresta;

        /// <summary>Ulkokuoren todelliset rajat (Unity: kuoren meshin bounds dioraaman koordinaateissa) korvaavat tilojen
        /// rajat (1.1 (76): tunnelma-tilan −80…60 ja laituri vetivät keskipisteen sivuun, linna painui oikealle).</summary>
        public void AsetaPohja(double minX, double maxX, double minZ, double maxZ)
        {
            if (maxX <= minX || maxZ <= minZ) return;
            pohjaMinX = minX; pohjaMaxX = maxX; pohjaMinZ = minZ; pohjaMaxZ = maxZ; pohjaOn = pohjaKuoresta = true;
        }

        void LaskePohja()
        {
            if (pohjaKuoresta) return; // kuoren rajat säilyvät uudelleenavauksen yli (sama rakennus)
            pohjaOn = false;
            pohjaMinX = pohjaMinZ = double.MaxValue; pohjaMaxX = pohjaMaxZ = double.MinValue;
            foreach (var t in Rakennus.Tilat)
            {
                if (t.Id == Aanimaisema.MassaTilaId) continue;
                if (t.RajaMin.X == 0 && t.RajaMax.X == 0 && t.RajaMin.Z == 0 && t.RajaMax.Z == 0) continue;
                pohjaMinX = Math.Min(pohjaMinX, Math.Min(t.RajaMin.X, t.RajaMax.X)); pohjaMaxX = Math.Max(pohjaMaxX, Math.Max(t.RajaMin.X, t.RajaMax.X));
                pohjaMinZ = Math.Min(pohjaMinZ, Math.Min(t.RajaMin.Z, t.RajaMax.Z)); pohjaMaxZ = Math.Max(pohjaMaxZ, Math.Max(t.RajaMin.Z, t.RajaMax.Z));
                pohjaOn = true;
            }
        }

        Asento SovitaKuvasuhteeseen(Asento a)
        {
            if (Kuvasuhde <= 0 || !pohjaOn || a.Fov <= 0 || a.Etaisyys <= 0) return a;
            var (sij, koh) = Kameraliike.AsentoSijainti(a);
            double dx = koh.X - sij.X, dz = koh.Z - sij.Z, pit = Math.Sqrt(dx * dx + dz * dz);
            if (pit < 1e-6) return a;
            double rx = dz / pit, rz = -dx / pit; // kameran sivusuunta vaakatasossa
            double l = double.MaxValue, r = double.MinValue;
            foreach (var (x, z) in new[] { (pohjaMinX, pohjaMinZ), (pohjaMinX, pohjaMaxZ), (pohjaMaxX, pohjaMinZ), (pohjaMaxX, pohjaMaxZ) })
            {
                double p = (x - koh.X) * rx + (z - koh.Z) * rz;
                l = Math.Min(l, p); r = Math.Max(r, p);
            }
            // Syvyys kameran suunnassa (pystykentän tarve: pohja kallistuneena + muurien korkeus noin 20 m).
            double fx = dx / pit, fz = dz / pit, lahin = double.MaxValue, kaukaisin = double.MinValue;
            foreach (var (x, z) in new[] { (pohjaMinX, pohjaMinZ), (pohjaMinX, pohjaMaxZ), (pohjaMaxX, pohjaMinZ), (pohjaMaxX, pohjaMaxZ) })
            { double q = (x - koh.X) * fx + (z - koh.Z) * fz; lahin = Math.Min(lahin, q); kaukaisin = Math.Max(kaukaisin, q); }
            double keski = (l + r) / 2, puoli = (r - l) / 2 * 1.15; // 1.1 (79) pysty: oikea reuna kosketti ruudun reunaa
            double kulma = a.Korkeus * Math.PI / 180.0;
            double puoliPysty = ((kaukaisin - lahin) * Math.Sin(kulma) + 20.0 * Math.Cos(kulma)) / 2 * 1.08;
            double v = a.Fov * Math.PI / 360.0, h = Math.Atan(Math.Tan(v) * Kuvasuhde);
            double tarve = Math.Max(h > 1e-4 ? puoli / Math.Tan(h) : 0, v > 1e-4 ? puoliPysty / Math.Tan(v) : 0);
            // Natiivi-UI:n katselmus 30.9.: linna täyttää ruudun (etäisyys myös lyhenee), rajattuna 0,4…2,5 × datan etäisyys.
            double etaisyys = tarve > 0 ? Math.Max(0.4 * a.Etaisyys, Math.Min(2.5 * a.Etaisyys, tarve)) : a.Etaisyys;
            var kohde = new V3(a.Kohde.X + rx * keski, a.Kohde.Y, a.Kohde.Z + rz * keski);
            kohde = new V3(kohde.X + fx * (lahin + kaukaisin) / 2, kohde.Y, kohde.Z + fz * (lahin + kaukaisin) / 2);
            return new Asento(kohde, a.Atsimuutti, a.Korkeus, etaisyys, a.Fov, a.Aukko, a.Kierto);
        }

        Asento AsentoFor(string kohde, bool pysty)
        {
            if (kohde == null) return SovitaKuvasuhteeseen(pysty ? Rakennus.YleisPysty : Rakennus.YleisVaaka);
            var tila = Rakennus.Tila(kohde);
            if (pysty && tila.KameraPysty.HasValue) return tila.KameraPysty.Value;
            return Kuvasuhde > 1.05 ? SovitaTilaLeveyteen(tila.Kamera, tila) : tila.Kamera;
        }

        /// <summary>Vaakakuvan tila täyttää näkymän leveyden (1.1 (80): keittiön leikkausikkuna ≈73 % leveydestä,
        /// sivuilla tummaa ja naapurirakennuksia; Päätoimittaja: tavoite 100 %). Tilan rajalaatikon kahdeksan kulmaa
        /// projisoidaan kameraan; kohde keskitetään sivusuunnassa ja etäisyys haetaan puolitushaulla niin, että
        /// laatikko täyttää leveyden (1,0). Vain lähemmäs, enintään 0,5 × datan etäisyys; suunta, korkeus ja fov ennallaan.</summary>
        Asento SovitaTilaLeveyteen(Asento a, Tila tila)
        {
            if (a.Fov <= 0 || a.Etaisyys <= 0) return a;
            var mn = tila.RajaMin; var mx = tila.RajaMax;
            if (mn.X == mx.X && mn.Z == mx.Z) return a;
            double k = a.Korkeus * Math.PI / 180, at = a.Atsimuutti * Math.PI / 180, ck = Math.Cos(k);
            double sx = ck * Math.Sin(at), sy = Math.Sin(k), sz = -ck * Math.Cos(at); // kohteesta kameraan (Kameraliike.AsentoSijainti)
            double rx = Math.Cos(at), rz = Math.Sin(at);                            // sivusuunta vaakatasossa
            double ux = -Math.Sin(k) * Math.Sin(at), uy = ck, uz = Math.Sin(k) * Math.Cos(at); // kameran ylös
            double tanV = Math.Tan(a.Fov * Math.PI / 360.0), tanH = tanV * Kuvasuhde;
            var kulmat = new V3[8];
            for (int i = 0; i < 8; i++)
                kulmat[i] = new V3((i & 1) == 0 ? mn.X : mx.X, (i & 2) == 0 ? mn.Y : mx.Y, (i & 4) == 0 ? mn.Z : mx.Z);
            var kohde = a.Kohde;
            // (vasen, oikea) kulmien sivusuhde x/z ja suurin |y/z| etäisyydellä d; null jos kulma on liian lähellä.
            (double l, double r, double y)? Suhteet(double d)
            {
                double l = double.MaxValue, r = double.MinValue, ym = 0;
                foreach (var c in kulmat)
                {
                    double wx = c.X - kohde.X, wy = c.Y - kohde.Y, wz = c.Z - kohde.Z;
                    double z = d - (wx * sx + wy * sy + wz * sz);
                    if (z < 1.0) return null;
                    double x = (wx * rx + wz * rz) / z;
                    l = Math.Min(l, x); r = Math.Max(r, x);
                    ym = Math.Max(ym, Math.Abs(wx * ux + wy * uy + wz * uz) / z);
                }
                return (l, r, ym);
            }
            // Vain lähemmäs: tila, joka jo datan etäisyydellä täyttää leveyden tai korkeuden, pysyy datan asennossa.
            // Pystyssä laatikko saa ylittää ruudun 5 % (tornit, kierreportaat eivät leikkaudu).
            bool Mahtuu((double l, double r, double y)? s) => s != null && (s.Value.r - s.Value.l) / 2 <= tanH && s.Value.y <= tanV * 1.05;
            var alku = Suhteet(a.Etaisyys);
            if (!Mahtuu(alku)) return a;
            double ala = 0.5 * a.Etaisyys, yla = a.Etaisyys, etaisyys = a.Etaisyys;
            for (int kierros = 0; kierros < 3; kierros++)
            {
                double lo = ala, hi = yla;
                for (int i = 0; i < 40; i++)
                {
                    double m = (lo + hi) / 2;
                    if (Mahtuu(Suhteet(m))) hi = m; else lo = m;
                }
                etaisyys = hi;
                var sv = Suhteet(etaisyys);
                if (sv == null) return a;
                double keski = (sv.Value.l + sv.Value.r) / 2 * etaisyys; // sivusiirto kohteen syvyydellä
                kohde = new V3(kohde.X + rx * keski, kohde.Y, kohde.Z + rz * keski);
            }
            return new Asento(kohde, a.Atsimuutti, a.Korkeus, etaisyys, a.Fov, a.Aukko, a.Kierto);
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
            puluPyynnot.Clear();
            kertojaAlku = -1; kertojaLahto = null; kertojaOhitukset.Clear();
            LaskePohja();
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

        /// <summary>
        /// Saapumiskaari päättyy kertojan 1. jakson lepoon (Saapuminen.Loppu == "kertoja"): vain ensimmäisellä kierroksella
        /// (ei uusinnassa eikä lyhyellä käynnillä, jolloin kierros ei ala itsestään). Silloin 1. jaksolla ei ole omaa lentoa.
        /// </summary>
        bool SaapuuKertojaan => Rakennus?.Saapuminen?.Loppu == "kertoja" && Rakennus.Kertoja != null && Rakennus.Kertoja.Count > 0
            && !kertojaVainUusintana && kertojaAlku < 0;

        double KertojaAlku => kertojaAlku >= 0 ? kertojaAlku
            : tapahtumat.Count > 0 ? tapahtumat[0].Hetki + tapahtumat[0].Kesto : double.PositiveInfinity;

        /// <summary>Onko kertojan kierros käynnissä hetkellä t (napautus ohittaa jakson, ei kohdista).</summary>
        public bool KertojaKaynnissa(double t) => Auki && Kierros(t, false).Kaynnissa;

        /// <summary>Onko linnalla kierros, joka ei ole käynnissä (UI:n uusintanappi näkyy).</summary>
        public bool KertojaUusittavissa(double t) => Auki && Rakennus?.Kertoja != null && Rakennus.Kertoja.Count > 0
            && t >= KertojaAlku && !Kierros(t, false).Kaynnissa;

        /// <summary>Saapumiskaaren loppuasento: yleisnäkymä tai (Loppu "kertoja") 1. jakson lepo.</summary>
        Asento SaapumisenKohde(bool pysty) => SaapuuKertojaan ? JaksonAsento(Rakennus.Kertoja[0], pysty) : AsentoFor(null, pysty);

        /// <summary>Uusinta (↻-nappi): kierros alusta nykyisestä kamerasta; aiemmat jaksojen ohitukset unohtuvat.</summary>
        public void KertojaUudelleen(double t)
        {
            if (Rakennus?.Kertoja == null || Rakennus.Kertoja.Count == 0) return;
            kertojaLahto = tapahtumat.Count > 0 ? tapahtumat[ViimeisinIndeksi(t)].Kohde : null;
            kertojaAlku = t;
            kertojaOhitukset.Clear();
        }

        /// <summary>Jakson pysähdys: datan kesto, mutta vähintään puheen kesto + 0,5 s (Päätoimittaja 1.10., #3742: isoisän
        /// puhe ei katkea jakson vaihtuessa, vaikka kesto_s jäisi datassa lyhyeksi). Puhe alkaa tekstin noustessa lennon
        /// lopussa, joten teksti näkyy vähintään tämän ajan.</summary>
        double JaksonKesto(KertojaJakso j)
        {
            double k = j.Kesto;
            if (!string.IsNullOrEmpty(j.Aani) && Rakennus?.Aanet != null && Rakennus.Aanet.TryGetValue(j.Aani, out var a) && a.KestoS > 0)
                k = Math.Max(k, a.KestoS + 0.5);
            return k;
        }

        Asento JaksonAsento(KertojaJakso j, bool pysty)
        {
            // Tilaan sidottu jakso käyttää tilan omaa kameraa (1.1 (75): laiturijakson kopioidut arvot olivat vanhasta
            // sijoituksesta 58 m sivussa, ja kuvassa oli pelkkä muuri ja vesi); jakson oma kamera vain ilman tilaa.
            if (j.Tila != null && Rakennus.Tila(j.Tila) != null) return AsentoFor(j.Tila, pysty);
            var a = pysty && j.KameraPysty.HasValue ? j.KameraPysty.Value : j.Kamera;
            var yleis = pysty ? Rakennus.YleisPysty : Rakennus.YleisVaaka;
            return j.Tila == null && a.Etaisyys >= 0.8 * yleis.Etaisyys ? SovitaKuvasuhteeseen(a) : a; // vain laajat kuvat
        }

        static double KertojaLento(Asento a, Asento b) =>
            Math.Max(KertojaLentoMin, Math.Min(KertojaLentoMax, Kameraliike.SiirtymanKesto(a, b)));

        /// <summary>Kierroksen tila hetkellä t: käynnissä, kamera, jakso (−1 = paluulento yleisnäkymään) ja näkyvä teksti.</summary>
        (bool Kaynnissa, Asento Kamera, int Jakso, string Teksti, double U, double Lento) Kierros(double t, bool pysty)
        {
            var jaksot = Rakennus?.Kertoja;
            if (jaksot == null || jaksot.Count == 0) return (false, default, -1, null, 0, 0);
            if (kertojaVainUusintana && kertojaAlku < 0) return (false, default, -1, null, 0, 0);
            double s = KertojaAlku;
            if (t < s || double.IsInfinity(s)) return (false, default, -1, null, 0, 0);
            // Huoneen kohdistus kierroksen alun jälkeen katkaisee kierroksen. Savu 156 (Laitetestaaja 7.10.): valikon huonevalinta jo
            // SAAPUMISKAAREN aikana (ennen ensimmäisen kierroksen alkua) katkaisee myös sen, muuten kierros alkoi kaaren lopussa ja
            // ohitti valinnan (valikko sulkeutui, ei siirtoa). Uusinnan (↻) alkua edeltävät kohdistukset eivät katkaise uusintaa.
            for (int i = 1; i < tapahtumat.Count; i++)
                if (tapahtumat[i].Hetki <= t && (tapahtumat[i].Hetki > s || kertojaAlku < 0)) return (false, default, -1, null, 0, 0);
            bool suoraan = SaapuuKertojaan;
            var edellinen = suoraan ? JaksonAsento(jaksot[0], pysty) : AsentoFor(kertojaAlku >= 0 ? kertojaLahto : null, pysty);
            double kursori = s;
            int ohitus = 0; // kukin napautus päättää täsmälleen yhden jakson
            while (ohitus < kertojaOhitukset.Count && kertojaOhitukset[ohitus] < s) ohitus++;
            for (int j = 0; j < jaksot.Count; j++)
            {
                var kohde = JaksonAsento(jaksot[j], pysty);
                double lento = suoraan && j == 0 ? 0 : KertojaLento(edellinen, kohde), loppu = kursori + lento + JaksonKesto(jaksot[j]);
                if (ohitus < kertojaOhitukset.Count && kertojaOhitukset[ohitus] < loppu) loppu = Math.Max(kursori, kertojaOhitukset[ohitus++]);
                if (t < loppu)
                {
                    double u = lento > 0 ? (t - kursori) / lento : 1;
                    var kamera = u < 1 ? Kameraliike.SiirtymaAsento(edellinen, kohde, u) : kohde;
                    return (true, kamera, j, u >= KertojaTekstiOsuus ? jaksot[j].Teksti : null, u, lento);
                }
                double uLoppu = lento > 0 ? (loppu - kursori) / lento : 1;
                edellinen = uLoppu < 1 ? Kameraliike.SiirtymaAsento(edellinen, kohde, uLoppu) : kohde;
                kursori = loppu;
            }
            var yleis = AsentoFor(null, pysty);
            double paluu = KertojaLento(edellinen, yleis);
            if (t < kursori + paluu) return (true, Kameraliike.SiirtymaAsento(edellinen, yleis, (t - kursori) / paluu), -1, null, (t - kursori) / paluu, paluu);
            return (false, default, -1, null, 0, 0);
        }

        /// <summary>
        /// TIMELINE (suunnitelma linna-unity-suunnitelma-20261005.md kohta 2b, Siirtoseppä 5.10.2026): kertojan kierroksen
        /// aikataulu Unity-puolen TimelineAssetille. VAIN LUKU: sama silmukka ja samat säännöt kuin Kierros-metodissa (lento =
        /// KertojaLento edellisestä asennosta, pysähdys = JaksonKesto, kukin tallennettu napautus päättää yhden jakson ja seuraava
        /// lento alkaa napautuksen asennosta), mutta koko kierros kerralla eikä yhden hetken näkymä. Kierroksen laskentaa ei
        /// muuteta; Linssit-testien KertojanAikatauluVastaaKierrosta varmistaa, että tämä ja Kierros pysyvät samoina.
        /// Palauttaa true, kun kierros on käynnissä hetkellä t (pysty kuten NakymaHetkella). Absoluuttiset ajat: alut[j] =
        /// jakson lennon alku, lennot[j] = lennon kesto (teksti ja puhe alkavat alut[j] + KertojaTekstiOsuus × lennot[j]),
        /// loput[j] = jakson loppu (napautus lyhentää), loppu = paluulennon loppu. ohituksia = kierroksen napautukset.
        /// </summary>
        public bool KertojanAikataulu(double t, bool pysty, List<double> alut, List<double> lennot, List<double> loput,
            out double alku, out double loppu, out int ohituksia)
        {
            alut.Clear(); lennot.Clear(); loput.Clear();
            alku = loppu = 0; ohituksia = 0;
            var jaksot = Rakennus?.Kertoja;
            if (!Auki || jaksot == null || jaksot.Count == 0) return false;
            if (kertojaVainUusintana && kertojaAlku < 0) return false;
            double s = KertojaAlku;
            if (t < s || double.IsInfinity(s)) return false;
            foreach (var e in tapahtumat) if (e.Hetki > s && e.Hetki <= t) return false;
            bool suoraan = SaapuuKertojaan;
            var edellinen = suoraan ? JaksonAsento(jaksot[0], pysty) : AsentoFor(kertojaAlku >= 0 ? kertojaLahto : null, pysty);
            double kursori = s;
            int ohitus = 0;
            while (ohitus < kertojaOhitukset.Count && kertojaOhitukset[ohitus] < s) ohitus++;
            int ohitusAlku = ohitus;
            for (int j = 0; j < jaksot.Count; j++)
            {
                var kohde = JaksonAsento(jaksot[j], pysty);
                double lento = suoraan && j == 0 ? 0 : KertojaLento(edellinen, kohde), jLoppu = kursori + lento + JaksonKesto(jaksot[j]);
                if (ohitus < kertojaOhitukset.Count && kertojaOhitukset[ohitus] < jLoppu) jLoppu = Math.Max(kursori, kertojaOhitukset[ohitus++]);
                alut.Add(kursori); lennot.Add(lento); loput.Add(jLoppu);
                double uLoppu = lento > 0 ? (jLoppu - kursori) / lento : 1;
                edellinen = uLoppu < 1 ? Kameraliike.SiirtymaAsento(edellinen, kohde, uLoppu) : kohde;
                kursori = jLoppu;
            }
            alku = s;
            loppu = kursori + KertojaLento(edellinen, AsentoFor(null, pysty));
            ohituksia = ohitus - ohitusAlku;
            return t < loppu;
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
        public void Napauta(double t) => Napauta(t, null);

        /// <summary>Napautus; Pulu napautuksesta -tilassa hahmo = napautettu hahmo, kohta = napautetun kohteen taulun kohta (−1 = ei).</summary>
        public void Napauta(double t, string hahmo, int kohta = -1)
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
            // Pulu napautuksesta: hahmoon → Pulun reaktio, huoneeseen → seuraava faktakohta. Kun kohdat on kuultu ja
            // keskustelu on lopussa, napautus huoneeseen vie kiertueella eteenpäin kuten ennen.
            if (PuluNapautuksesta && nyt.KohdeTila != null && (hahmo != null || kohta >= 0 || !nyt.KasikirjoitusLopussa || KohtiaJaljella(t) > 0))
            {
                puluPyynnot.Add((t, hahmo, kohta));
                return;
            }
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
        /// CINEMACHINE (suunnitelma linna-unity-suunnitelma-20261005.md kohta 1, Siirtoseppä 5.10.2026): VAIN LUKU. Mihin kamera on
        /// menossa hetkellä t: Avain = lepoasennon tunnus ("yleis", "tila:&lt;id&gt;" tai "jakso:&lt;n&gt;"), Perus = sen asento ilman
        /// pelaajan poikkeamaa, Jaljella = lennon jäljellä oleva aika (0 = perillä) ja Saapumassa = saapumiskaari kesken (sen polku
        /// tulee yhä NakymaHetkella-metodista). Samat haarat kuin NakymaHetkella ja Kierros: Unity-puoli vaihtaa avaimen vaihtuessa
        /// lepokameraa ja blendaa sinne lennon jäljellä olevassa ajassa, joten leikkausikkuna ja teksti pysyvät Ytimen ajoituksessa.
        /// </summary>
        public (string Avain, Asento Perus, double Jaljella, bool Saapumassa) LepoHetkella(double t, bool pysty)
        {
            var k = Kierros(t, pysty);
            if (k.Kaynnissa)
            {
                double jaljella = Math.Max(0, (1 - k.U) * k.Lento);
                if (k.Jakso < 0) return ("yleis", AsentoFor(null, pysty), jaljella, false);
                return ("jakso:" + k.Jakso, JaksonAsento(Rakennus.Kertoja[k.Jakso], pysty), jaljella, false);
            }
            int i = ViimeisinIndeksi(t);
            var e = tapahtumat[i];
            double loppu = e.Hetki + e.Kesto;
            bool lennossa = e.Kesto > 0 && t < loppu && (i > 0 || Rakennus.Saapuminen != null);
            return (e.Kohde == null ? "yleis" : "tila:" + e.Kohde, AsentoFor(e.Kohde, pysty), lennossa ? loppu - t : 0, lennossa && i == 0);
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
                kamera = Kameraliike.SiirtymaAsento(SaapumisAsento(pysty), SaapumisenKohde(pysty), SaapuminenOsuus(t));
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
                double sessionLoppu = i + 1 < tapahtumat.Count ? tapahtumat[i + 1].Hetki : double.PositiveInfinity;
                var napitLokaali = new List<double>();
                List<Askel> kasikirjoitus;
                List<double> kestot;
                if (PuluNapautuksesta && !avaus)
                    (kasikirjoitus, kestot, _) = Keskustelu(tila, kasikirjoitusAlku, sessionLoppu);
                else
                {
                    kasikirjoitus = tila.Kasikirjoitus;
                    kestot = new List<double>(kasikirjoitus.Count);
                    foreach (var a in kasikirjoitus) kestot.Add(Ohjaaja.AskeleenKesto(a, tila, Rakennus));
                    foreach (var nap in napautukset)
                        if (nap >= kasikirjoitusAlku && nap < sessionLoppu) napitLokaali.Add(nap - kasikirjoitusAlku);
                }

                var edellinenLaskeutuminen = avaus ? Rakennus.PuluLaskeutuminen + TaivasSiirtyma : EdellinenLaskeutuminen(i);
                var tamanLaskeutuminen = tila.PuluLaskeutuminen;

                if (paikallinenAika < 0 || kasikirjoitus.Count == 0)
                {
                    pulu = edellinenLaskeutuminen;
                }
                else
                {
                    var kt = Ohjaaja.KasikirjoitusHetkella(kestot, napitLokaali, paikallinenAika);
                    int idx = kt.Indeksi;
                    lopussa = kt.Valmis;
                    int puluIdx = -1;
                    for (int qi = 0; qi < kasikirjoitus.Count; qi++)
                        if (kasikirjoitus[qi].Tee == "pulu-lenna") { puluIdx = qi; break; }

                    if (puluIdx < 0 || idx < puluIdx) pulu = edellinenLaskeutuminen;
                    else if (idx == puluIdx)
                    {
                        double t01 = kestot[puluIdx] > 0 ? kt.Paikallinen / kestot[puluIdx] : 1;
                        pulu = Ohjaaja.PuluLento(edellinenLaskeutuminen, tamanLaskeutuminen, t01);
                        puluLentaa = true;
                    }
                    else pulu = tamanLaskeutuminen;

                    if (idx >= 0 && idx < kasikirjoitus.Count)
                    {
                        for (int qi = idx; qi >= 0; qi--)
                            if (kasikirjoitus[qi].Tee == "taulu") { tauluAuki = true; break; }
                        for (int qi = idx; qi >= 0; qi--)
                            if (kasikirjoitus[qi].Tee == "kohta") { kohta = kasikirjoitus[qi].N; break; }
                        if (!kt.Valmis)
                        {
                            askel = idx;
                            (puhuja, repliikki, askeleenAani) = Puhe(tila, kasikirjoitus[idx]);
                        }
                    }
                }
            }

            return new Nakyma(kamera, tasot, hahmot, pulu, puluLentaa, tauluAuki, kohta, kohdeTila, puhuja, repliikki,
                askel, askeleenAani, lopussa, kierros.Kaynnissa ? kierros.Jakso : -1, kierros.Kaynnissa ? kierros.Teksti : null);
        }

        // --- PULU NAPAUTUKSESTA (omistajan linnapalaute 5.10.2026 klo 12.4x; Siirtoseppä) --------------------------------
        // "Henkilöt puhuvat toisilleen ilman minkäänlaista taukoa, ja suurin ongelma on, että Pulu puhuu keskustelujen väliin."
        // Lipun ollessa päällä (Unity-puoli asettaa, oletus pois → kultaiset vektorit ennallaan) huoneen käsikirjoituksesta
        // jätetään Pulun kohdat ja reaktiot pois: henkilöiden repliikit soivat yhtenä keskusteluna VuoroTauon välein, ja entisen
        // Pulu-kohdan paikalla (kohtausraja) tauko on KohtausTauko. Pulu puhuu vain napautuksesta (Napauta(t, hahmo)):
        // hahmoon → sen reaktio, huoneeseen → seuraava taulun kohta. Napautus osuu meneillään olevaan askeleeseen, ja Pulun
        // vuoro lisätään sen perään (keskustelu jatkuu Pulun jälkeen); keskustelun jälkeen Pulu puhuu heti. Yksi Pulun vuoro
        // askelta kohden. Kaikki johdetaan ajasta ja tallennetuista napautuksista kuten muukin linssi.
        public bool PuluNapautuksesta { get; set; }
        public const double VuoroTauko = 0.7, KohtausTauko = 1.6;
        readonly List<(double T, string Hahmo, int Kohta)> puluPyynnot = new List<(double T, string Hahmo, int Kohta)>();

        /// <summary>Huoneen keskustelu ilman Pulua: Pulun kohdat ja reaktiot pois, tauot repliikkien väliin.</summary>
        public static List<Askel> KeskusteluIlmanPulua(Tila tila)
        {
            var r = new List<Askel>();
            bool raja = false, puhuttu = false;
            // Huoneen kuunnelma (tila.Kuunnelma, KuunnelmaKaistale) ON henkilöiden keskustelu: käsikirjoituksen repliikit soivat
            // muuten sen kanssa lomittain ja katkaisivat toisiaan (loki 5.10.: k1, kohta-0, kappalainen-1, k2, …).
            bool kuunnelma = tila.Kuunnelma != null && tila.Kuunnelma.Count > 0;
            foreach (var a in tila.Kasikirjoitus)
            {
                if (a.Tee == "kohta") { raja = true; continue; }
                if (a.Tee == "reaktio") continue;
                if (kuunnelma && (a.Tee == "repliikki" || a.Tee == "odota")) continue;
                if (a.Tee == "repliikki")
                {
                    r.Add(new Askel { Tee = "odota", S = puhuttu && raja ? KohtausTauko : VuoroTauko });
                    raja = false; puhuttu = true;
                }
                r.Add(a);
            }
            return r;
        }

        /// <summary>Tämän käynnin käsikirjoitus Pulun napautusvuoroineen (askeleet, kestot, käytetyt taulun kohdat).</summary>
        (List<Askel>, List<double>, int) Keskustelu(Tila tila, double alku, double loppu)
        {
            var pohja = KeskusteluIlmanPulua(tila);
            var pyynnot = new List<(double T, string Hahmo, int Kohta)>();
            foreach (var p in puluPyynnot) if (p.T >= alku && p.T < loppu) pyynnot.Add((p.T - alku, p.Hahmo, p.Kohta));
            pyynnot.Sort((x, y) => x.T.CompareTo(y.T));
            var askeleet = new List<Askel>(pohja.Count + 4);
            var kestot = new List<double>(pohja.Count + 4);
            int kohtia = tila.Taulu?.Kohdat?.Count ?? 0, pi = 0;
            var kuultu = new HashSet<int>();
            double kursori = 0;
            bool tauluAuki = false;
            void Lisaa(Askel a) { askeleet.Add(a); double k = Ohjaaja.AskeleenKesto(a, tila, Rakennus); kestot.Add(k); kursori += k; }
            Askel PuluVuoro(string hahmo, int kohta)
            {
                if (hahmo != null)
                    foreach (var h in tila.Hahmot) if (h.Id == hahmo && h.Reaktio != null) return new Askel { Tee = "reaktio", HahmoId = hahmo };
                // Kohde (taulu.kohdat[].kohde) → juuri se kohta, myös uudelleen; muu napautus → ensimmäinen kuulematon.
                if (kohta >= 0 && kohta < kohtia) { kuultu.Add(kohta); return new Askel { Tee = "kohta", N = kohta }; }
                for (int k = 0; k < kohtia; k++) if (kuultu.Add(k)) return new Askel { Tee = "kohta", N = k };
                return null;
            }
            foreach (var a in pohja)
            {
                Lisaa(a);
                if (a.Tee == "taulu") tauluAuki = true;
                if (!tauluAuki) continue; // Pulu puhuu vasta laskeuduttuaan (taulu auki)
                bool vuoro = false;
                while (pi < pyynnot.Count && pyynnot[pi].T < kursori)
                {
                    if (!vuoro && PuluVuoro(pyynnot[pi].Hahmo, pyynnot[pi].Kohta) is Askel pa)
                    {
                        Lisaa(new Askel { Tee = "odota", S = VuoroTauko });
                        Lisaa(pa);
                        vuoro = true;
                    }
                    pi++;
                }
            }
            for (; pi < pyynnot.Count; pi++)
            {
                if (pyynnot[pi].T < kursori) continue; // edellinen Pulun vuoro vielä kesken
                if (!(PuluVuoro(pyynnot[pi].Hahmo, pyynnot[pi].Kohta) is Askel pa)) continue;
                if (pyynnot[pi].T > kursori) Lisaa(new Askel { Tee = "odota", S = pyynnot[pi].T - kursori });
                Lisaa(pa);
            }
            return (askeleet, kestot, kuultu.Count);
        }

        /// <summary>Kuinka monta taulun kohtaa on vielä kuulematta tämänhetkisessä huoneessa (Pulu napautuksesta).</summary>
        public int KohtiaJaljella(double t)
        {
            if (!Auki || Rakennus == null || tapahtumat.Count == 0) return 0;
            int i = ViimeisinIndeksi(t);
            var e = tapahtumat[i];
            var tila = e.Kohde != null ? Rakennus.Tila(e.Kohde) : null;
            if (tila == null) return 0;
            double loppu = i + 1 < tapahtumat.Count ? tapahtumat[i + 1].Hetki : double.PositiveInfinity;
            var (_, _, kaytetty) = Keskustelu(tila, e.Hetki + e.Kesto, loppu);
            return Math.Max(0, (tila.Taulu?.Kohdat?.Count ?? 0) - kaytetty);
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
