// ERIKOISMALLIN LIIKE: MALBORK (omistaja valitsi elämänidean A 27.9. klo 18.4x; speksi docs/raportit/erikoismallit/malbork.md).
// Sama kaava kuin ErikoisLiike.cs: perusliike (ritariturnaus), harvinainen tapahtuma (vuoden 1410 kivikuulan legenda),
// reaktio pelaajaan (ritarit ratsastavat Siltaportista kentälle, napautus = legenda) ja yövalot. Puhdas C#, ei allokaatioita
// kehyksessä (reitit ja jalat varataan konstruktorissa, Asento vertaa nimiä suoraan), aikataulu siemenellä noston id:stä.
using System;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>
    /// Malbork: perusliike = kaksi ritaria (punaloiminen etukaistalla joen puolella, vaalea takakaistalla muurin puolella)
    /// odottavat turnauskentän päissä 15–45 s, laukkaavat toisiaan kohti aidan eri puolilla (3,2 s ±10 %, smootherstep), laskevat
    /// kopjat vaakaan ennen kohtaamista, ohittavat toisensa, hidastavat ja kääntyvät kentän päässä (1,6 s). Noin joka viidennellä
    /// kierroksella vain toinen ratsastaa harjoituskierroksen: laukka kentän yli, kaarto aidan pään ympäri toiselle kaistalle,
    /// paluu ja kaarto takaisin omalle paikalle (noin 8 s). Ratsun runko keinuu laukassa ±4° (0,45 s) ja nousee 0,004.
    /// Harvinainen (noin 1/10 kohtaamisista, oma kanava): Kesärefektorin kivikuula (legenda 1410) — punainen petturin lippu
    /// laskeutuu palatsin ikkunaan (0,5 s), vastarannan tykistä tuprahtaa savu, kivikuula kaartaa joen yli palatsin seinään
    /// (1,6 s, laki 0,12) ja jää siihen tummaksi pisteeksi, lippu vedetään sisään, ja kuula näkyy vielä 6 s ennen kuin katoaa.
    /// Mikään ei rikkoudu, koska kuula osui legendan mukaan seinään eikä pilariin. Reaktio: alkutilassa ritarit ovat
    /// Siltaportissa; lähestyminen tuo ne ravilla kentän päihin (6 s), ja ensimmäinen laukka alkaa heti (odottaessa
    /// lähestyminen aloittaa seuraavan laukan heti). Napautus = legenda heti (enintään kerran 20 s:ssa, myös yöllä). Yöllä
    /// ritarit eivät ratsasta: ne palaavat Siltaporttiin ja tulevat aamulla takaisin (tai heti, kun kamera lähestyy).
    /// Levossa (ritarit odottavat tai portissa, kuula seinässä, valo vakaa) Liikkuu = false, joten elävä kerros piirtää 0 kehystä.
    /// </summary>
    public sealed class MalborkLiike : ErikoisAnimaatio
    {
        // ---- Kenttä (samat kuin Symbolimallit.Mb*-vakiot: muuta molemmat) ----

        /// <summary>Turnauskentän keskikohta X, aidan linja Z, kaistojen etäisyys aidasta, ritarien odotuspaikka keskeltä ja
        /// harjoituskierroksen kaartokohta keskeltä (aidan pää on 0,18:ssa).</summary>
        public const double KenttaX = -0.03, AitaZ = -0.10, Kaista = 0.017, Paa = 0.28, KaartoX = 0.20;
        /// <summary>Siltaportin kulkuaukon sisäpää (ritarit piilossa portissa) ja kaarteen säde portista kaistalle.</summary>
        public const double PorttiX = 0.03, PorttiZ = -0.024, PorttiKaari = 0.015;
        /// <summary>Porttiaukon etupinta: sen takana kopja kulkee eteen kallistettuna (0,8), jotta se mahtuu porttikäytävään.</summary>
        public const double PorttiEtu = -0.063;
        /// <summary>Ritarien lepopaikat (osien pivotit, Symbolimallit.MbRitariPivot): punainen vasemmassa päässä etukaistalla,
        /// vaalea oikeassa päässä takakaistalla.</summary>
        public const double Pivot0X = KenttaX - Paa, Pivot0Z = AitaZ - Kaista, Pivot1X = KenttaX + Paa, Pivot1Z = AitaZ + Kaista;
        /// <summary>Kopjan ote ritarin omassa koordinaatistossa (katse +X), sama kuin Symbolimallit.MbOte.</summary>
        public const double OteX = 0.006, OteY = 0.034, OteZ = -0.004;
        /// <summary>Tykin suu miinus kuulan osumakohta (Symbolimallit.MbTykinSuu − MbKuulaOsuma).</summary>
        public const double KuulaDX = 0.017784, KuulaDY = -0.070789, KuulaDZ = -0.186916;

        // ---- Ajat ja vaihtelu (speksi kohta 6) ----

        public const double LaukkaS = 3.2, KaannosS = 1.6, RaviS = 6, SeisooMinS = 15, SeisooMaxS = 45, TaukoTod = 0.2;
        public const double Harvinainen = 0.1, NapautusValiS = 20;
        /// <summary>Laukan keinunta (±4°, jakso 0,45 s, nousu 0,004) ja ravin keinunta.</summary>
        public const double KeinuAste = 4, KeinuS = 0.45, KeinuNousu = 0.004, RaviAste = 2, RaviJaksoS = 0.36, RaviNousu = 0.002;
        /// <summary>Legenda: lippu laskeutuu, savu, kuulan lento, kuula seinässä, lipun veto sisään ja kuulan katoaminen (s).</summary>
        public const double LippuS = 0.5, SavuAlku = 0.9, SavuKasvaa = 1.2, KuulaAlku = 1.0, KuulaLento = 1.6, KuulaSeinassa = 6,
            LippuPois = 3.4, Katoaa = 0.5, KuulaLaki = 0.12;
        public static double LegendaS => KuulaAlku + KuulaLento + KuulaSeinassa + Katoaa;

        // ---- Reitit: jalat (polku, käännös paikallaan tai tauko) ja palat (suora tai kaari) ----

        struct Pala
        {
            public bool Kaari;
            public double X0, Z0, X1, Z1, Cx, Cz, R, A0, Kulma, Pituus;
        }

        sealed class Jalka
        {
            public int Laji;                   // 0 polku, 1 käännös paikallaan, 2 tauko
            public readonly Pala[] Palat = new Pala[5];
            public int Paloja;
            public double Pituus, Kesto, V0, V1, Suunta0, Suunta1, Kohtaaminen;
            /// <summary>Pehmeä = smootherstep levosta lepoon (muuten Hermite alku- ja loppunopeudella); Turnaus = kahden ritarin
            /// kohtaaminen (legendan arvonta), harjoituskierroksella vain kuvitteellinen.</summary>
            public bool Pehmea, Laukka, Turnaus;
        }

        sealed class Ritari
        {
            public double X, Z, Suunta, Keinu, Nousu, Kopja, Nopeus, Vaihe;
            public bool Nakyy, Etukaista;
            public int Paa;                    // −1 vasen, +1 oikea (odotuspaikka)
            public readonly Jalka[] Jalat = new Jalka[8];
            public int Jalkoja, Nyky;
            public double Aika;
            public Ritari() { for (int i = 0; i < Jalat.Length; i++) Jalat[i] = new Jalka(); }
            public bool Liikkeella => Nyky < Jalkoja;
        }

        enum Vaihe { Portissa, Ulos, Odottaa, Kierros, Paluu }

        readonly Ritari[] ritarit = { new Ritari { Etukaista = true }, new Ritari { Etukaista = false } };
        Vaihe vaihe = Vaihe.Portissa;
        double ajastin, legenda = -1, edellinenLegenda = double.NegativeInfinity;
        int kierroksia, kohtaamisia, legendoja;

        public MalborkLiike(string id) : base(id)
        {
            ajastin = Vali(4, 20, 0, 80);
            for (int k = 0; k < 2; k++) { ritarit[k].X = PorttiX; ritarit[k].Z = PorttiZ; ritarit[k].Suunta = 90; ritarit[k].Vaihe = Vali(0, 1, k, 81); }
        }

        public bool Legenda => legenda >= 0;
        public int Kierroksia => kierroksia;
        public int Kohtaamisia => kohtaamisia;
        /// <summary>Ritarin k paikka (X, Z), suunta (°, 0 = +X, 90 = −Z) ja näkyvyys (testeihin).</summary>
        public (double x, double z, double suunta, bool nakyy) RitarinPaikka(int k) => (ritarit[k].X, ritarit[k].Z, ritarit[k].Suunta, ritarit[k].Nakyy);

        static double Lane(bool etu) => etu ? AitaZ - Kaista : AitaZ + Kaista;

        // ---- Reitin rakentajat (kutsutaan vain vaiheiden alussa; jalat ja palat ovat valmiiksi varattuja) ----

        static Jalka Uusi(Ritari r)
        {
            var j = r.Jalat[r.Jalkoja++];
            j.Laji = 0; j.Paloja = 0; j.Pituus = 0; j.Kesto = 1; j.V0 = 0; j.V1 = 0; j.Pehmea = true; j.Laukka = false; j.Turnaus = false; j.Kohtaaminen = -1;
            return j;
        }

        static void Viiva(Jalka j, double x0, double z0, double x1, double z1)
        {
            ref var p = ref j.Palat[j.Paloja++];
            p.Kaari = false; p.X0 = x0; p.Z0 = z0; p.X1 = x1; p.Z1 = z1;
            p.Pituus = Math.Sqrt((x1 - x0) * (x1 - x0) + (z1 - z0) * (z1 - z0));
            j.Pituus += p.Pituus;
        }

        /// <summary>Kaari keskipisteen (cx, cz) ympäri säteellä r kulmasta a0 (rad, paikka = c + r·(cos a, sin a)) kulman verran
        /// (etumerkillinen).</summary>
        static void Kaari(Jalka j, double cx, double cz, double r, double a0, double kulma)
        {
            ref var p = ref j.Palat[j.Paloja++];
            p.Kaari = true; p.Cx = cx; p.Cz = cz; p.R = r; p.A0 = a0; p.Kulma = kulma; p.Pituus = Math.Abs(kulma) * r;
            j.Pituus += p.Pituus;
        }

        /// <summary>Käännös kentän päässä: aidan pään ympäri toiselle kaistalle (keskipiste x, aidan linjalla), pullistuma
        /// suuntaan ulos (±1 X-akselilla). alkuEtu = lähtökaista etukaista.</summary>
        static void Kaarto(Jalka j, double x, bool alkuEtu, double ulos)
        {
            // Etukaista on aidan eteläpuolella (kulma −π/2), takakaista pohjoispuolella (+π/2). Kiertosuunta valitaan niin, että
            // kaaren puoliväli (kulma a0 ± π/2) osuu pullistuman suuntaan (0 = +X, π = −X).
            double a0 = alkuEtu ? -Math.PI / 2 : Math.PI / 2;
            Kaari(j, x, AitaZ, Kaista, a0, alkuEtu == (ulos > 0) ? Math.PI : -Math.PI);
        }

        /// <summary>Käännös 180° paikallaan (suunnat lasketaan jalan alkaessa, ks. Kaannos).</summary>
        static void Kaanto(Ritari r, double kesto)
        {
            var j = Uusi(r);
            j.Laji = 1; j.Kesto = kesto;
            j.Suunta0 = double.NaN; j.Suunta1 = double.NaN;
        }

        static void Tauko(Ritari r, double kesto)
        {
            var j = Uusi(r);
            j.Laji = 2; j.Kesto = kesto;
        }

        /// <summary>Käännöksen loppusuunta paikallaan: 180° kääntyen aidan puolelle (etukaista pohjoisen kautta, takakaista
        /// etelän kautta), jotta ratsu ei käänny joelle eikä muuria päin.</summary>
        static double Kaannos(double suunta, bool etukaista)
        {
            // Suunnan ψ katse: (cos ψ, −sin ψ). Pohjoisen (+Z) kautta, kun välisuunnan sin < 0.
            double plus = Math.Sin((suunta + 90) * Math.PI / 180);
            bool pohjoinen = etukaista;
            double d = (plus < 0) == pohjoinen ? 1 : -1;
            return suunta + 180 * d;
        }

        /// <summary>Ulos portista: portin aukosta etukaistan kohdalle, kaarre kaistalle kohti päätä p, kaistaa pitkin päähän;
        /// etukaistan ritari kaartaa aidan pään ympäri omalle kaistalleen, takakaistan ritari kääntyy paikallaan.</summary>
        void Ulos(Ritari r, int p, double viive, double kesto)
        {
            r.Jalkoja = 0; r.Nyky = 0; r.Aika = 0; r.Paa = p; r.Nakyy = false;
            r.X = PorttiX; r.Z = PorttiZ; r.Suunta = 90;
            if (viive > 0) Tauko(r, viive);
            var j = Uusi(r);
            j.Kesto = kesto;
            double zt = Lane(false);
            Viiva(j, PorttiX, PorttiZ, PorttiX, zt + PorttiKaari);
            if (p > 0) Kaari(j, PorttiX + PorttiKaari, zt + PorttiKaari, PorttiKaari, Math.PI, Math.PI / 2);
            else Kaari(j, PorttiX - PorttiKaari, zt + PorttiKaari, PorttiKaari, 0, -Math.PI / 2);
            Viiva(j, PorttiX + p * PorttiKaari, zt, KenttaX + p * Paa, zt);
            if (r.Etukaista) Kaarto(j, KenttaX + p * Paa, false, p);
            else Kaanto(r, KaannosS);
        }

        /// <summary>Paluu porttiin (yö): etukaistan ritari kääntyy ensin ulospäin ja kaartaa aidan pään ympäri takakaistalle;
        /// sitten kaistaa pitkin portin kohdalle ja kaarteella portin aukkoon.</summary>
        void Paluu(Ritari r, double viive)
        {
            r.Jalkoja = 0; r.Nyky = 0; r.Aika = 0;
            int p = r.Paa;
            if (viive > 0) Tauko(r, viive);
            double zt = Lane(false), x = KenttaX + p * Paa;
            if (r.Etukaista) Kaanto(r, KaannosS);
            var j = Uusi(r);
            j.Kesto = r.Etukaista ? 6 : 5;
            if (r.Etukaista) Kaarto(j, x, true, p);
            // Kaistaa pitkin portin kohdalle (tulosuunta: portti on keskellä, ritari tulee puolelta p).
            double s = x > PorttiX ? 1 : -1;
            Viiva(j, x, zt, PorttiX + s * PorttiKaari, zt);
            if (s > 0) Kaari(j, PorttiX + PorttiKaari, zt + PorttiKaari, PorttiKaari, -Math.PI / 2, -Math.PI / 2);
            else Kaari(j, PorttiX - PorttiKaari, zt + PorttiKaari, PorttiKaari, -Math.PI / 2, Math.PI / 2);
            Viiva(j, PorttiX, zt + PorttiKaari, PorttiX, PorttiZ);
        }

        /// <summary>Turnauslaukka: ritari laukkaa omaa kaistaansa kentän toiseen päähän (kohtaaminen puolivälissä) ja kääntyy.</summary>
        void Laukka(Ritari r, double kesto)
        {
            r.Jalkoja = 0; r.Nyky = 0; r.Aika = 0;
            double z = Lane(r.Etukaista);
            var j = Uusi(r);
            j.Kesto = kesto; j.Laukka = true; j.Turnaus = true; j.Kohtaaminen = kesto * 0.5;
            Viiva(j, KenttaX + r.Paa * Paa, z, KenttaX - r.Paa * Paa, z);
            r.Paa = -r.Paa;
            Kaanto(r, KaannosS);
        }

        /// <summary>Harjoituskierros yksin: laukka toisen pään kaartokohtaan (kuvitteellinen kohtaaminen keskellä), kaarto aidan
        /// pään ympäri toiselle kaistalle, ravi takaisin ja kaarto oman pään ympäri omalle paikalle.</summary>
        void Harjoitus(Ritari r, double kesto)
        {
            r.Jalkoja = 0; r.Nyky = 0; r.Aika = 0;
            int p = r.Paa;
            double zo = Lane(r.Etukaista), zx = Lane(!r.Etukaista);
            double vk = Math.PI * Kaista / (KaannosS * 0.85);
            var j = Uusi(r);
            j.Kesto = kesto * 0.82; j.Laukka = true; j.Pehmea = false; j.V0 = 0; j.V1 = vk; j.Kohtaaminen = j.Kesto * 0.62;
            Viiva(j, KenttaX + p * Paa, zo, KenttaX - p * KaartoX, zo);
            j = Uusi(r);
            j.Kesto = KaannosS * 0.85; j.Pehmea = false; j.V0 = vk; j.V1 = vk;
            Kaarto(j, KenttaX - p * KaartoX, r.Etukaista, -p);
            j = Uusi(r);
            j.Kesto = 2.8; j.Pehmea = false; j.V0 = vk; j.V1 = vk;
            Viiva(j, KenttaX - p * KaartoX, zx, KenttaX + p * Paa, zx);
            j = Uusi(r);
            j.Kesto = KaannosS * 0.85; j.Pehmea = false; j.V0 = vk; j.V1 = 0;
            Kaarto(j, KenttaX + p * Paa, !r.Etukaista, p);
        }

        void AloitaLegenda()
        {
            legenda = 0; edellinenLegenda = T; legendoja++;
        }

        // ---- Askel ----

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (tapahtuma && legenda < 0 && T - edellinenLegenda >= NapautusValiS) AloitaLegenda();

            switch (vaihe)
            {
                case Vaihe.Portissa:
                    if (yo) ajastin = Vali(5, 20, kierroksia, 82);
                    else
                    {
                        ajastin -= d;
                        if (heraa || ajastin <= 0)
                        {
                            // Punainen (etukaista) ensin vasempaan päähän, vaalea 2,2 s:n päästä oikeaan päähän (punainen on silloin jo
                            // kaistalla); molemmat ovat paikoillaan 6 s:n kohdalla.
                            Ulos(ritarit[0], -1, 0, RaviS - 0.5);
                            Ulos(ritarit[1], 1, 2.2, RaviS - 2.2 - KaannosS);
                            vaihe = Vaihe.Ulos;
                        }
                    }
                    break;
                case Vaihe.Ulos:
                    if (!ritarit[0].Liikkeella && !ritarit[1].Liikkeella) { vaihe = Vaihe.Odottaa; ajastin = 0.3; }
                    break;
                case Vaihe.Odottaa:
                    if (yo)
                    {
                        // Etukaistan ritarilla on pidempi reitti; takakaistan ritari lähtee ensin.
                        Paluu(ritarit[0], 1.2); Paluu(ritarit[1], 0);
                        vaihe = Vaihe.Paluu;
                        break;
                    }
                    if (heraa) ajastin = 0;
                    ajastin -= d;
                    if (ajastin <= 0)
                    {
                        kierroksia++;
                        double kesto = LaukkaS / Vali(0.9, 1.1, kierroksia, 75);
                        if (Arpa(kierroksia, 74) < TaukoTod) Harjoitus(ritarit[Arpa(kierroksia, 73) < 0.5 ? 0 : 1], kesto);
                        else { Laukka(ritarit[0], kesto); Laukka(ritarit[1], kesto); }
                        vaihe = Vaihe.Kierros;
                    }
                    break;
                case Vaihe.Kierros:
                    if (!ritarit[0].Liikkeella && !ritarit[1].Liikkeella) { vaihe = Vaihe.Odottaa; ajastin = Vali(SeisooMinS, SeisooMaxS, kierroksia, 72); }
                    break;
                case Vaihe.Paluu:
                    if (!ritarit[0].Liikkeella && !ritarit[1].Liikkeella)
                    {
                        ritarit[0].Nakyy = ritarit[1].Nakyy = false;
                        vaihe = Vaihe.Portissa; ajastin = Vali(5, 20, kierroksia, 82);
                    }
                    break;
            }

            bool liikkuu = false;
            for (int k = 0; k < 2; k++) liikkuu |= Etene(ritarit[k], d, k, yo);

            if (legenda >= 0)
            {
                double ennen = legenda;
                legenda += d;
                // Liikettä on lipun, savun ja lennon aikana sekä kuulan katoamisessa; seinässä odottava kuula ei vaadi kehyksiä.
                if (ennen < SavuAlku + SavuKasvaa + 2.1 || legenda > KuulaAlku + KuulaLento + KuulaSeinassa) liikkuu = true;
                if (legenda > LegendaS) legenda = -1;
            }
            if (liikkuu && d > 0) Liikkuu = true;
        }

        /// <summary>Ritarin jalan eteneminen ja asennon laskenta (paikka, suunta, keinunta ja kopja). Palauttaa true, jos ritari
        /// liikkuu tässä kehyksessä.</summary>
        bool Etene(Ritari r, double d, int k, bool yo)
        {
            if (!r.Liikkeella) { r.Nopeus = 0; r.Keinu = 0; r.Nousu = 0; return false; }
            r.Aika += d;
            var j = r.Jalat[r.Nyky];
            while (r.Aika >= j.Kesto)
            {
                // Jalka valmis: loppuasento ja seuraava jalka.
                Aseta(r, j, j.Kesto, k);
                r.Aika -= j.Kesto;
                r.Nyky++;
                if (!r.Liikkeella)
                {
                    r.Nopeus = 0; r.Keinu = 0; r.Nousu = 0; r.Kopja = 0;
                    if (vaihe == Vaihe.Paluu && r.X == PorttiX && Math.Abs(r.Z - PorttiZ) < 1e-9) r.Nakyy = false;
                    return true;
                }
                j = r.Jalat[r.Nyky];
                if (j.Laji == 1 && double.IsNaN(j.Suunta0)) { j.Suunta0 = r.Suunta; j.Suunta1 = Kaannos(r.Suunta, r.Etukaista); }
            }
            if (j.Laji == 1 && double.IsNaN(j.Suunta0)) { j.Suunta0 = r.Suunta; j.Suunta1 = Kaannos(r.Suunta, r.Etukaista); }
            double ennen = r.Aika - d;
            Aseta(r, j, r.Aika, k);
            // Kohtaaminen (laukan puoliväli): harvinaisen legendan arvonta, ei yöllä.
            if (j.Turnaus && k == 0 && ennen < j.Kohtaaminen && r.Aika >= j.Kohtaaminen)
            {
                kohtaamisia++;
                if (!yo && legenda < 0 && Arpa(kohtaamisia, 76) < Harvinainen) AloitaLegenda();
            }
            return j.Laji != 2;
        }

        /// <summary>Asento jalan j hetkellä t: polulla paikka, suunta tangentista ja nopeus; käännöksessä suunta; keinunta ja kopja.</summary>
        void Aseta(Ritari r, Jalka j, double t, int k)
        {
            double u = Math.Max(0, Math.Min(1, t / Math.Max(1e-6, j.Kesto)));
            if (j.Laji == 2) { r.Nopeus = 0; r.Keinu = 0; r.Nousu = 0; return; }
            r.Nakyy = true;
            if (j.Laji == 1)
            {
                r.Suunta = j.Suunta0 + (j.Suunta1 - j.Suunta0) * Pehmea(u);
                r.Nopeus = 0; r.Keinu = 0; r.Nousu = 0; r.Kopja = 0;
                return;
            }
            double s, v;
            if (j.Pehmea)
            {
                s = j.Pituus * Pehmea(u);
                v = j.Pituus / j.Kesto * 30 * u * u * (1 - u) * (1 - u);
            }
            else
            {
                double T = j.Kesto, L = j.Pituus;
                s = (u * u * u - 2 * u * u + u) * T * j.V0 + (-2 * u * u * u + 3 * u * u) * L + (u * u * u - u * u) * T * j.V1;
                v = (3 * u * u - 4 * u + 1) * j.V0 + (-6 * u * u + 6 * u) * L / T + (3 * u * u - 2 * u) * j.V1;
                s = Math.Max(0, Math.Min(L, s));
            }
            // Pala, jolla matka s on.
            int i = 0;
            while (i < j.Paloja - 1 && s > j.Palat[i].Pituus) { s -= j.Palat[i].Pituus; i++; }
            ref var p = ref j.Palat[i];
            double f = p.Pituus > 1e-9 ? Math.Min(1, s / p.Pituus) : 0, hx, hz;
            if (!p.Kaari)
            {
                r.X = p.X0 + (p.X1 - p.X0) * f; r.Z = p.Z0 + (p.Z1 - p.Z0) * f;
                hx = p.X1 - p.X0; hz = p.Z1 - p.Z0;
            }
            else
            {
                double a = p.A0 + p.Kulma * f, sg = Math.Sign(p.Kulma);
                r.X = p.Cx + p.R * Math.Cos(a); r.Z = p.Cz + p.R * Math.Sin(a);
                hx = -Math.Sin(a) * sg; hz = Math.Cos(a) * sg;
            }
            if (hx * hx + hz * hz > 1e-12)
            {
                double raaka = Math.Atan2(-hz, hx) * 180 / Math.PI;
                double ero = raaka - r.Suunta;
                ero -= 360 * Math.Floor((ero + 180) / 360);
                r.Suunta += ero;
            }
            r.Nopeus = Math.Abs(v);
            // Keinunta: laukassa ±4° (0,45 s) ja nousu 0,004, ravissa loivempi; voimakkuus nopeuden mukaan.
            double tt = T + r.Vaihe;   // ritarikohtainen vaihe, joten ratsut eivät keinu tahdissa
            if (j.Laukka)
            {
                double w = Math.Min(1, r.Nopeus / 0.12);
                r.Keinu = KeinuAste * w * Math.Sin(2 * Math.PI * tt / KeinuS);
                r.Nousu = KeinuNousu * w * Math.Abs(Math.Sin(Math.PI * tt / KeinuS));
            }
            else
            {
                double w = Math.Min(1, r.Nopeus / 0.05);
                r.Keinu = RaviAste * w * Math.Sin(2 * Math.PI * tt / RaviJaksoS);
                r.Nousu = RaviNousu * w * Math.Abs(Math.Sin(Math.PI * tt / RaviJaksoS));
            }
            // Kopja: laskeutuu vaakaan 1,0–0,4 s ennen kohtaamista ja nousee 0,5–1,2 s sen jälkeen; porttikäytävässä ja sen
            // edustalla kopja kulkee eteen kallistettuna (0,8) ja nousee pystyyn kentällä.
            if (j.Laukka && j.Kohtaaminen >= 0)
                r.Kopja = Pehmea((t - (j.Kohtaaminen - 1.0)) / 0.6) * (1 - Pehmea((t - (j.Kohtaaminen + 0.5)) / 0.7));
            else r.Kopja = 0.8 * (1 - Pehmea((PorttiEtu - r.Z) / 0.018));
        }

        // ---- Asennot ----

        /// <summary>Kvaternion kierto vektorille (v' = q v q*).</summary>
        static (double x, double y, double z) Kierra((double w, double x, double y, double z) q, double vx, double vy, double vz)
        {
            double tx = 2 * (q.y * vz - q.z * vy), ty = 2 * (q.z * vx - q.x * vz), tz = 2 * (q.x * vy - q.y * vx);
            return (vx + q.w * tx + (q.y * tz - q.z * ty), vy + q.w * ty + (q.z * tx - q.x * tz), vz + q.w * tz + (q.x * ty - q.y * tx));
        }

        /// <summary>Ritarin runko: suunta ja keinunta (nokka ylös/alas oman sivuakselin ympäri); vaalean ritarin verkko on
        /// rakennettu katse −X, joten sen kiertoon lisätään −180°.</summary>
        OsanAsento RitariAsento(int k)
        {
            var r = ritarit[k];
            if (!r.Nakyy) return OsanAsento.Piilossa;
            var q = OsanAsento.Tulo(OsanAsento.Kierto(0, 1, 0, r.Suunta), OsanAsento.Kierto(0, 0, 1, r.Keinu));
            if (k == 1) q = OsanAsento.Tulo(q, OsanAsento.Kierto(0, 1, 0, -180));
            double px = k == 0 ? Pivot0X : Pivot1X, pz = k == 0 ? Pivot0Z : Pivot1Z;
            return new OsanAsento { X = r.X - px, Y = r.Nousu, Z = r.Z - pz, Skaala = 1 }.Kierretty(q);
        }

        /// <summary>Kopja: ote seuraa ritarin kättä (suunta ja keinunta), kopja laskeutuu eteenpäin (−88° oman sivuakselin
        /// ympäri) ja kallistuu laskettuna hieman aidan puolelle vastustajaa kohti.</summary>
        OsanAsento KopjaAsento(int k)
        {
            var r = ritarit[k];
            if (!r.Nakyy) return OsanAsento.Piilossa;
            var qr = OsanAsento.Tulo(OsanAsento.Kierto(0, 1, 0, r.Suunta), OsanAsento.Kierto(0, 0, 1, r.Keinu));
            var ote = Kierra(qr, OteX, OteY, OteZ);
            // Lepopaikan ote (pivot): punaisella ote sellaisenaan, vaalealla 180° kierrettynä.
            double px = k == 0 ? Pivot0X + OteX : Pivot1X - OteX, pz = k == 0 ? Pivot0Z + OteZ : Pivot1Z - OteZ;
            // Aita ritarin vasemmalla (+Z omassa koordinaatistossa), jos kosini suunnasta ja aidan puoli ovat samanmerkkiset.
            double vasen = Math.Cos(r.Suunta * Math.PI / 180) * (AitaZ - r.Z) > 0 ? 1 : -1;
            var q = OsanAsento.Tulo(qr, OsanAsento.Tulo(OsanAsento.Kierto(0, 1, 0, -6 * vasen * r.Kopja), OsanAsento.Kierto(0, 0, 1, -88 * r.Kopja)));
            return new OsanAsento { X = r.X + ote.x - px, Y = r.Nousu + ote.y - OteY, Z = r.Z + ote.z - pz, Skaala = 1 }.Kierretty(q);
        }

        public override OsanAsento Asento(string osa)
        {
            switch (osa)
            {
                case "ritari0": return RitariAsento(0);
                case "ritari1": return RitariAsento(1);
                case "kopja0": return KopjaAsento(0);
                case "kopja1": return KopjaAsento(1);
                case "lippu":
                {
                    if (legenda < 0) return OsanAsento.Piilossa;
                    // Laskeutuu ikkunan yläreunasta (kasvaa pivotista alas), liehuu ±6° ja vedetään sisään kuulan osuttua.
                    double s = Pehmea(legenda / LippuS) * (1 - Pehmea((legenda - LippuPois) / 0.5));
                    if (s <= 0.02) return OsanAsento.Piilossa;
                    double liehu = 6 * Math.Sin(2 * Math.PI * legenda / 0.9) * Math.Min(1, legenda / LippuS);
                    return new OsanAsento { Skaala = s }.Kierretty(OsanAsento.Tulo(OsanAsento.Kierto(1, 0, 0, liehu), OsanAsento.Kierto(0, 1, 0, 0.6 * liehu)));
                }
                case "savu":
                {
                    if (legenda < SavuAlku) return OsanAsento.Piilossa;
                    double t = legenda - SavuAlku;
                    // Tuprahtaa nopeasti (kasvaa 1,2 s:ssa skaalaan 1,2 hidastuen), nousee ja hälvenee 2,1 s:ssa.
                    double kasvu = 1 - Math.Pow(1 - Math.Min(1, t / SavuKasvaa), 3);
                    double hälvenee = 1 - Pehmea((t - SavuKasvaa) / 2.1);
                    double s = 1.2 * kasvu * hälvenee;
                    if (s <= 0.02) return OsanAsento.Piilossa;
                    return new OsanAsento { Qw = 1, Y = 0.012 * Pehmea(t / (SavuKasvaa + 2.1)), Skaala = s };
                }
                case "kuula":
                {
                    if (legenda < KuulaAlku) return OsanAsento.Piilossa;
                    double t = legenda - KuulaAlku;
                    if (t < KuulaLento)
                    {
                        // Paraabeli tykin suulta palatsin seinään: vaakasuunnassa tasainen, korkeudessa laki 0,12; kuula pyörii.
                        double u = t / KuulaLento, m = 1 - u;
                        return new OsanAsento { X = KuulaDX * m, Y = KuulaDY * m + 4 * KuulaLaki * u * m, Z = KuulaDZ * m, Skaala = Math.Min(1, t * 6) }
                            .Kierretty(OsanAsento.Kierto(1, 0, 0, -720 * u));
                    }
                    t -= KuulaLento;
                    double s = t < KuulaSeinassa ? 1 : 1 - Pehmea((t - KuulaSeinassa) / Katoaa);
                    return s <= 0.02 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Skaala = s };
                }
                case "valot":
                case "valot1":
                case "valot2":
                case "valot3":
                    return Valot();
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila()
        {
            string Nimi(Ritari r) => !r.Nakyy ? "portissa" : r.Liikkeella ? (r.Jalat[r.Nyky].Laukka ? "laukkaa" : "ratsastaa") : "odottaa";
            return $"turnaus {vaihe} ({ajastin:F0} s), punainen {Nimi(ritarit[0])} x {ritarit[0].X:F2}, vaalea {Nimi(ritarit[1])} x {ritarit[1].X:F2}, " +
                $"kierroksia {kierroksia}, kohtaamisia {kohtaamisia}, legendoja {legendoja}" + (legenda >= 0 ? $", legenda {legenda:F1} s" : "");
        }
    }
}
