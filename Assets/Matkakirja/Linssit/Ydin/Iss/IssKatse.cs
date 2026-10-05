// CUPOLAN KATSE VETÄMÄLLÄ LASISTA (omistaja 3.10.2026: "saisiko kupolan ohjaimeen joystickin, millä voisi ohjata mihin
// suuntaan ikkuna osoittaa … Kaikkein paras olisi, jos sitä voisi itse vapaasti ohjata, vähän samalla tavalla kuin
// minimaapalloa. Eli siitä voisi peukalolla tarttua kiinni ja pehmeästi kääntää kupolan ikkunaa johonkin suuntaan.")
// Päätoimittaja: suora veto lasissa, ei erillistä joystickiä eikä uutta ohjainelementtiä (UI-pohjien sääntö).
//
// Puhdas logiikka (Unity: Linssit/Unity/CupolaVeto.cs lukee sormen ja antaa pisteet tänne):
//  - pystyveto kääntää katseen kulmaa vaakatasosta alas (AlasMin … 90°, 90 = suoraan alas), vaakaveto ilmansuuntaa
//    maajäljen suunnasta (360°). Suora tuntuma: maa seuraa sormea (veto ylös → katse alemmas, veto oikealle → katse
//    vasemmalle), asteita pisteelle = ikkunan pystykenttä / ruudun korkeus; ilmansuunta jaetaan cos(alas):lla (rajattu),
//    jotta keskikohta seuraa sormea myös lähes suoraan alas katsottaessa.
//  - pehmeä inertia kuten pallovalitsimessa (minipallo): vauhti hidastuu eksponentiaalisesti (aikavakio 0,3 s), katto
//    ja pysähdysraja; sormen pysähdys ennen irrotusta ei jätä vauhtia.
//  - napautus ja veto erotellaan kynnyksellä (VetoKynnysPt = PalloKierto.napautusLiike 10 pt): lyhyt napautus jää
//    pallon omille kuuntelijoille (Pulun taulu, pöydän pienennys ohi napauttamalla), kaksoisnapautus palauttaa oletukseen
//    pehmeästi (0,6 s; vähennetyllä liikkeellä heti).
//  - Alas = NaN: katse seuraa rajauksen oletusta (IssKuvakulma.IkkunanKatse, horisonttikulma), eli ilman vetoa kuva on
//    sama kuin ennen. Suunta on poikkeama maajäljen suunnasta (−180…180).
//  - Lukittu (kuvaputki KUVAA käynnissä): veto ohitetaan ja liike pysähtyy, jotta kuvattava näkymä ei käänny kesken.
// Testit Linssit-testit/Testit/IssKatseTestit.cs.
using System;

namespace Matkakirja.Linssit.Iss
{
    /// <summary>Ohjaamon joystickin suunta (omistaja 4.10.2026: plus-muotoinen, yksi suunta kerrallaan).</summary>
    public enum JoystickSuunta { Ei, Ylos, Alas, Vasen, Oikea }

    public sealed class IssKatse
    {
        /*
         * JOYSTICK (omistaja 4.10.2026 klo 11.3x, "ISS-OHJAAMO UUSIKSI"; lasin veto 3.10. poistuu): katsetta ohjataan vain
         * paneelin joystickilla. Pystyakseli kääntää katseen kulmaa (ylös = kohti horisonttia, alas = kohti alapistettä), vaaka
         * ilmansuuntaa. Liike jatkuu pidettäessä ja kiihtyy pitkässä painalluksessa (JoyVauhti → × JoyMaxKerroin JoyKiihtymisS:ssä),
         * pysähtyy heti irrotettaessa ilman inertiaa (kuten minipallo). Nopeus ei riipu kaasusta (ajan kerroin).
         */
        public const double JoyVauhti = 15, JoyMaxKerroin = 2.5, JoyKiihtymisS = 1.5;
        /// <summary>Joystickin nykyinen suunta (Ei = irti).</summary>
        public JoystickSuunta Joystick { get; private set; }
        double joyAlku = double.NaN;

        /// <summary>Joystickin nopeus (°/s) pidon kestosta: perusvauhti, pehmeä kiihtyminen enintään JoyMaxKerroin-kertaiseksi.</summary>
        public static double JoyNopeus(double kestoS)
        {
            double u = Math.Max(0, Math.Min(1, kestoS / JoyKiihtymisS));
            return JoyVauhti * (1 + (JoyMaxKerroin - 1) * u * u * (3 - 2 * u));
        }

        /// <summary>
        /// Joystickin suunta muuttui (painallus, suunnan vaihto, irrotus = Ei): uusi pito alkaa perusvauhdista; vanha liike, inertia
        /// ja paluu oletukseen loppuvat heti.
        /// </summary>
        public void Ohjaa(JoystickSuunta suunta, double t)
        {
            if (suunta == Joystick) return;
            Joystick = suunta;
            joyAlku = t;
            VAlas = VSuunta = 0;
            Palautuu = false;
            edellinenAskel = t;
        }
        /// <summary>Katseen rajat (° vaakatason alapuolelle). Alaraja nousee horisontin alle (IssKuvakulma.Ikkuna: katse maahan).</summary>
        public const double AlasMin = 20, AlasMax = 90;
        /// <summary>Inertian aikavakio (s), kuten pallovalitsimessa.</summary>
        public const double HidastusS = 0.3;
        /// <summary>Vauhdin katto (°/s) kummallekin akselille: nopea sipaisu ei linkoa kymmeniä kierroksia.</summary>
        public const double MaxVauhti = 240;
        /// <summary>Tätä hitaampi kääntö (°/s) tulkitaan pysähdykseksi.</summary>
        public const double PysahdysRaja = 2;
        /// <summary>Veto, jota seuraa näin pitkä paikallaan olo ennen irrotusta, ei jätä vauhtia (s).</summary>
        public const double VedonVanheneminenS = 0.1;
        /// <summary>Napautuksen ja vedon raja (pt, sama kuin PalloKierto.napautusLiike) ja napautuksen enimmäiskesto (s).</summary>
        public const double VetoKynnysPt = 10, NapautusS = 0.35;
        /// <summary>Kaksoisnapautus: toinen napautus näin pian ja lähellä (KameraEleet.TuplaAikaS / TuplaMatkaPt).</summary>
        public const double TuplaS = 0.3, TuplaPt = 30;
        /// <summary>Pehmeä paluu oletukseen kaksoisnapautuksella (s).</summary>
        public const double PalautusS = 0.6;
        /// <summary>Ilmansuunnan vedon jakajan alaraja: cos(alas) rajataan tähän (lähes suoraan alas ~2,9-kertainen).</summary>
        public const double SuunnanCosMin = 0.35;

        /// <summary>Katse vaakatason alapuolelle (°); NaN = rajauksen oletus.</summary>
        public double Alas { get; private set; } = double.NaN;
        /// <summary>Ilmansuunta poikkeamana maajäljen suunnasta (°, −180…180; + = oikealle).</summary>
        public double Suunta { get; private set; }
        public double VAlas { get; private set; }
        public double VSuunta { get; private set; }
        public bool Kiinni { get; private set; }
        public bool Palautuu { get; private set; }
        /// <summary>Raja-osumat (veto tai inertia pysähtyi ala- tai ylärajaan) ja viimeisin raja (null = ei rajalla).</summary>
        public int RajaOsumat { get; private set; }
        public string Rajalla { get; private set; }

        /// <summary>Kuvaputki käynnissä: veto ohitetaan ja liike pysähtyy.</summary>
        public bool Lukittu
        {
            get => lukittu;
            set { lukittu = value; if (value) { if (Kiinni || painettu) Peru(); VAlas = VSuunta = 0; } }
        }
        bool lukittu;
        /// <summary>Vähennetty liike: ei inertiaa, paluu oletukseen heti.</summary>
        public bool Vahennetty;
        /// <summary>Asteita ruudun pisteelle (ikkunan pystykenttä / ruudun korkeus pt); Unity asettaa joka kehys.</summary>
        public double AsteitaPisteelle = IssKuvakulma.IkkunanPerusKentta / 874.0;

        /// <summary>Viimeisin oletus ja alaraja (Askel); veto ennen ensimmäistä askelta käyttää nykyistä oletusta.</summary>
        double oletus = double.NaN, alaraja = double.NaN;
        double viimeVeto = double.NaN, edellinenAskel = double.NaN;
        double palautusAlku, alasAlku, suuntaAlku;
        // Ele: painallus lasilla, kynnyksen ylitys vedoksi, nosto (napautus tai veto).
        bool painettu, vetaa;
        double painoAika, painoX, painoY, edellX, edellY;
        double viimeNapautus = -1, viimeNapX, viimeNapY;

        /// <summary>Liike käynnissä (sormi, inertia tai paluu): Unity herättää täyden ruudunpäivityksen.</summary>
        public bool Liikkuu => Kiinni || VAlas != 0 || VSuunta != 0 || Palautuu || JoystickLiikkuu;
        /// <summary>Joystick pidossa ja katse liikkuu (ei kuvaputken lukossa): suhinaääni soi tämän ajan.</summary>
        public bool JoystickLiikkuu => Joystick != JoystickSuunta.Ei && !lukittu;
        /// <summary>Katse on muutettu oletuksesta.</summary>
        public bool Muutettu => !double.IsNaN(Alas) || Suunta != 0;
        /// <summary>Ele on vetona (kynnys ylitetty).</summary>
        public bool Vetaa => painettu && vetaa;

        /// <summary>Alaraja ISS:n korkeudella: AlasMin, mutta vähintään 1° horisontin alla (420 km: 21,3°).</summary>
        public static double Alaraja(double korkeusM)
        {
            double h = Math.Max(1000, korkeusM);
            return Math.Max(AlasMin, Math.Acos(IssKuvakulma.MaanSadeM / (IssKuvakulma.MaanSadeM + h)) / Deg + 1);
        }

        /// <summary>Katse nyt (°): asetettu tai oletus, rajattuna.</summary>
        public double AlasNyt(double oletusAlas) => Rajaa(double.IsNaN(Alas) ? oletusAlas : Alas, Ala());

        /// <summary>Kaikki oletukseen heti (kyydin alku ja loppu, `astro kyyti katse oletus` vähennetyllä liikkeellä).</summary>
        public void Nollaa()
        {
            Joystick = JoystickSuunta.Ei;
            Alas = double.NaN; Suunta = 0; VAlas = VSuunta = 0;
            Kiinni = Palautuu = painettu = vetaa = false;
            Rajalla = null;
            viimeVeto = double.NaN;
            viimeNapautus = -1;
        }

        /// <summary>Katse suoraan (testikomento `astro kyyti katse &lt;alas&gt; &lt;suunta&gt;`): liike pysähtyy.</summary>
        public void Aseta(double alas, double suunta)
        {
            VAlas = VSuunta = 0; Kiinni = Palautuu = false;
            Alas = Rajaa(alas, Ala());
            Suunta = Kulma(suunta);
        }

        /// <summary>Pehmeä paluu oletukseen (kaksoisnapautus, `astro kyyti katse oletus`); vähennetyllä liikkeellä heti.</summary>
        public void Oletukseen(double t)
        {
            if (Vahennetty || !Muutettu) { Nollaa(); return; }
            VAlas = VSuunta = 0;
            Kiinni = false;
            Palautuu = true;
            palautusAlku = t;
            alasAlku = AlasNyt(Oletus);
            suuntaAlku = Suunta;
        }

        // ---- Ele pisteinä (Unity: CupolaVeto; vain lasilta alkaneet kosketukset) ----

        /// <summary>Sormi lasille (pt, y alas).</summary>
        public void Paina(double t, double x, double y)
        {
            if (lukittu) return;
            painettu = true; vetaa = false;
            painoAika = t; painoX = edellX = x; painoY = edellY = y;
        }

        /// <summary>Sormi liikkuu: kynnyksen (10 pt) jälkeen veto alkaa ja koko siirto painalluksesta käännetään (ei hyppyä).</summary>
        public void Liiku(double t, double x, double y)
        {
            if (!painettu || lukittu) return;
            if (!vetaa)
            {
                double dx0 = x - painoX, dy0 = y - painoY;
                if (dx0 * dx0 + dy0 * dy0 <= VetoKynnysPt * VetoKynnysPt) return;
                vetaa = true;
                Tartu(painoAika);
            }
            VetoPt(x - edellX, y - edellY, t);
            edellX = x; edellY = y;
        }

        public enum Nosto { Ei, Veto, Napautus, Tupla }

        /// <summary>Sormi irti: veto jättää inertian; lyhyt napautus kirjataan, ja toinen 0,3 s:n sisällä palauttaa oletukseen.</summary>
        public Nosto Nosta(double t)
        {
            if (!painettu) return Nosto.Ei;
            painettu = false;
            if (vetaa) { vetaa = false; Irti(t); return Nosto.Veto; }
            if (lukittu || t - painoAika > NapautusS) return Nosto.Ei;
            double dx = painoX - viimeNapX, dy = painoY - viimeNapY;
            if (viimeNapautus >= 0 && t - viimeNapautus <= TuplaS && dx * dx + dy * dy <= TuplaPt * TuplaPt)
            {
                viimeNapautus = -1;
                Oletukseen(t);
                return Nosto.Tupla;
            }
            viimeNapautus = t; viimeNapX = painoX; viimeNapY = painoY;
            return Nosto.Napautus;
        }

        /// <summary>Ele keskeytyi (toinen sormi, lukitus, tila vaihtui): ei inertiaa eikä napautusta.</summary>
        public void Peru()
        {
            painettu = vetaa = false;
            if (Kiinni) Irti(double.IsNaN(viimeVeto) ? 0 : viimeVeto, inertia: false);
        }

        // ---- Veto asteina (myös testikomento `astro kyyti veto`) ----

        /// <summary>Tartunta: liike ja paluu pysähtyvät, oletus kiinnittyy nykyiseen arvoon.</summary>
        public void Tartu(double t)
        {
            if (lukittu) return;
            if (double.IsNaN(Alas)) Alas = AlasNyt(Oletus);
            Kiinni = true;
            Palautuu = false;
            VAlas = VSuunta = 0;
            viimeVeto = edellinenAskel = t;
        }

        /// <summary>
        /// Sormen siirto ruudun pisteinä (x oikealle, y alas): maa seuraa sormea. <paramref name="kestoS"/> antaa vauhdin ajan
        /// suoraan (testikomento), muuten aika edellisestä vedosta.
        /// </summary>
        public void VetoPt(double dx, double dy, double t, double kestoS = double.NaN)
        {
            var (da, ds) = PisteetAsteiksi(dx, dy, AsteitaPisteelle, double.IsNaN(Alas) ? AlasNyt(Oletus) : Alas);
            Veto(da, ds, t, kestoS);
        }

        /// <summary>Ruudun siirto (pt) → (Δalas, Δsuunta) asteina: veto ylös laskee katsetta, veto oikealle kääntää vasemmalle.</summary>
        public static (double dAlas, double dSuunta) PisteetAsteiksi(double dx, double dy, double asteitaPisteelle, double alas)
        {
            double c = Math.Max(SuunnanCosMin, Math.Cos((double.IsNaN(alas) ? 45 : alas) * Deg));
            return (-dy * asteitaPisteelle, -dx * asteitaPisteelle / c);
        }

        /// <summary>Siirto asteina; vauhti on siirto / kulunut aika, pehmennettynä (yksittäinen nykäys ei määrää vauhtia).</summary>
        public void Veto(double dAlas, double dSuunta, double t, double kestoS = double.NaN)
        {
            if (!Kiinni || lukittu) return;
            double dt = !double.IsNaN(kestoS) ? kestoS : double.IsNaN(viimeVeto) ? 0 : t - viimeVeto;
            if (dt > 1e-4)
            {
                VAlas = Katto(0.4 * VAlas + 0.6 * dAlas / dt);
                VSuunta = Katto(0.4 * VSuunta + 0.6 * dSuunta / dt);
            }
            Siirra(dAlas, dSuunta);
            viimeVeto = edellinenAskel = t;
        }

        /// <summary>Sormi irti: katse jatkaa vauhdilla, paitsi jos sormi pysähtyi ennen irrotusta tai liike on vähennetty.</summary>
        public void Irti(double t, bool inertia = true, bool pidaVauhti = false)
        {
            if (!Kiinni) return;
            Kiinni = false;
            if (!inertia || Vahennetty || (!pidaVauhti && !double.IsNaN(viimeVeto) && t - viimeVeto > VedonVanheneminenS)) VAlas = VSuunta = 0;
            if (Math.Abs(VAlas) < PysahdysRaja && Math.Abs(VSuunta) < PysahdysRaja) VAlas = VSuunta = 0;
            edellinenAskel = t;
        }

        /// <summary>
        /// Kehyksen askel (IssKyyti.Paivita, Cupolassa): oletus ja alaraja talteen, inertia ja paluu. true = katse liikkui.
        /// </summary>
        public bool Askel(double t, double oletusAlas, double alarajaAlas)
        {
            oletus = oletusAlas; alaraja = alarajaAlas;
            double dt = double.IsNaN(edellinenAskel) ? 0 : t - edellinenAskel;
            edellinenAskel = t;
            if (lukittu) { VAlas = VSuunta = 0; return false; }
            if (Joystick != JoystickSuunta.Ei)
            {
                if (dt <= 0) return true;
                dt = Math.Min(dt, 0.1);
                double v = (Vahennetty ? 0.5 : 1) * JoyNopeus(t - joyAlku) * dt;
                Siirra(Joystick == JoystickSuunta.Alas ? v : Joystick == JoystickSuunta.Ylos ? -v : 0,
                       Joystick == JoystickSuunta.Oikea ? v : Joystick == JoystickSuunta.Vasen ? -v : 0);
                return true;
            }
            if (Palautuu)
            {
                double u = PalautusS > 0 ? (t - palautusAlku) / PalautusS : 1;
                double s = u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
                Alas = alasAlku + (oletusAlas - alasAlku) * s;
                Suunta = Kulma(suuntaAlku * (1 - s));
                if (u >= 1) { Palautuu = false; Alas = double.NaN; Suunta = 0; Rajalla = null; }
                return true;
            }
            if (Kiinni || dt <= 0 || (VAlas == 0 && VSuunta == 0)) return false;
            dt = Math.Min(dt, 0.1);   // pitkä kehys (taustalla) ei hyppää
            Siirra(VAlas * dt, VSuunta * dt);
            double f = Math.Exp(-dt / HidastusS);
            VAlas *= f; VSuunta *= f;
            if (Math.Abs(VAlas) < PysahdysRaja && Math.Abs(VSuunta) < PysahdysRaja) VAlas = VSuunta = 0;
            return true;
        }

        /// <summary>Tila lokiin (`astro kyyti katse tila`).</summary>
        public string Tila(double oletusAlas)
        {
            var c = System.Globalization.CultureInfo.InvariantCulture;
            return string.Format(c, "alas {0:0.0}° ({1}), suunta {2:+0.0;-0.0;0}° maajäljestä, vauhti {3:0.0}/{4:0.0} °/s, {5}{6}, rajat {7:0.0}–{8:0}°, raja-osumat {9}{10}, {11:0.000} °/pt{12}",
                AlasNyt(oletusAlas), double.IsNaN(Alas) ? "oletus" : "asetettu", Suunta, VAlas, VSuunta,
                Kiinni ? "sormi kiinni" : Palautuu ? "paluu oletukseen" : VAlas != 0 || VSuunta != 0 ? "inertia käynnissä" : "levossa",
                Vetaa ? " (veto)" : "", Ala(), AlasMax, RajaOsumat, Rajalla != null ? " (nyt " + Rajalla + ")" : "",
                AsteitaPisteelle, lukittu ? ", LUKITTU (kuvaputki)" : "");
        }

        /// <summary>Alaraja viimeisimmästä askeleesta (ennen ensimmäistä 420 km:n raja).</summary>
        double Ala() => double.IsNaN(alaraja) ? Alaraja(420_000) : alaraja;
        /// <summary>Oletus viimeisimmästä askeleesta (ennen ensimmäistä rajauksen oletus 420 km:ssä).</summary>
        double Oletus => double.IsNaN(oletus) ? IssKuvakulma.IkkunanKatseNyt : oletus;

        void Siirra(double dAlas, double dSuunta)
        {
            double ala = Ala();
            double a = (double.IsNaN(Alas) ? AlasNyt(Oletus) : Alas) + dAlas;
            string raja = a < ala ? "alaraja" : a > AlasMax ? "yläraja" : null;
            if (raja != null)
            {
                a = Rajaa(a, ala);
                VAlas = 0;
                if (Rajalla != raja) RajaOsumat++;
            }
            if (dAlas != 0) Rajalla = raja;
            Alas = a;
            Suunta = Kulma(Suunta + dSuunta);
        }

        static double Rajaa(double a, double ala) => Math.Max(Math.Min(ala, AlasMax), Math.Min(AlasMax, double.IsNaN(a) ? ala : a));

        static double Katto(double v) => Math.Max(-MaxVauhti, Math.Min(MaxVauhti, v));

        /// <summary>Kulma välille −180…180.</summary>
        public static double Kulma(double k)
        {
            k %= 360;
            if (k > 180) k -= 360;
            if (k <= -180) k += 360;
            return k;
        }

        const double Deg = Math.PI / 180;
    }
}
