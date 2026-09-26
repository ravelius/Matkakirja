// ISS-LINSSI: SGP4-ratalaskenta (suunnitelma docs/raportit/iss-linssi-suunnitelma-20260926.md, omistaja hyväksyi 14.4x).
// Puhdas C# ja oma käännös Vallado, Crawford, Hujsak & Kelso 2006 -viitetoteutuksesta ("Revisiting Spacetrack Report
// #3", AIAA 2006-6753; CelesTrakin julkinen sgp4unit), WGS-72-vakiot kuten TLE-aineistossa. Vain lähiradat (kierros
// < 225 min, kuten ISS noin 92 min); syvän avaruuden SDP4 puuttuu, ja Rata.Kaytettavissa on false sellaiselle TLE:lle.
// Tulos TEME-koordinaatistossa (km, km/s); Maahan (ECEF, leveys/pituus/korkeus) Gmst-kierrolla (napaliike ohitetaan,
// virhe < 20 m). Testit: Linssit-testit/Testit/IssTestit.cs (Vallado 2006 -vektori satelliitille 00005).
using System;

namespace Matkakirja.Linssit.Iss
{
    /// <summary>Kahden rivin rataelementit (TLE) jäsennettyinä.</summary>
    public sealed class Tle
    {
        public string Nimi, Rivi1, Rivi2;
        public int Numero;
        /// <summary>Epookki juliaanisena päivänä (UTC).</summary>
        public double EpookkiJd;
        /// <summary>B* (1/maansäde), inklinaatio, solmu, eksentrisyys, perigeum, keskianomalia (rad), keskiliike (rad/min).</summary>
        public double Bstar, Inklinaatio, Solmu, Eksentrisyys, Perigeum, Keskianomalia, Keskiliike;
        public bool TarkisteOk;

        public static Tle Jasenna(string rivi1, string rivi2, string nimi = null)
        {
            if (rivi1 == null || rivi2 == null || rivi1.Length < 69 || rivi2.Length < 69 || rivi1[0] != '1' || rivi2[0] != '2')
                throw new FormatException("TLE: rivit eivät ole muotoa 1…/2… (69 merkkiä)");
            double D(string s) => double.Parse(s.Trim(), System.Globalization.CultureInfo.InvariantCulture);
            // Eksponenttimuoto " 28098-4" = 0.28098e-4 (desimaalipiste oletettu ennen numeroita).
            double E(string s)
            {
                s = s.Trim();
                if (s.Length == 0) return 0;
                int merkki = 1;
                if (s[0] == '-' || s[0] == '+') { if (s[0] == '-') merkki = -1; s = s.Substring(1); }
                int e = s.LastIndexOfAny(new[] { '-', '+' });
                if (e <= 0) return merkki * D("0." + s);
                return merkki * D("0." + s.Substring(0, e)) * Math.Pow(10, int.Parse(s.Substring(e)));
            }
            const double deg = Math.PI / 180;
            var t = new Tle { Nimi = nimi?.Trim(), Rivi1 = rivi1, Rivi2 = rivi2 };
            t.Numero = int.Parse(rivi1.Substring(2, 5).Trim());
            int vuosi = int.Parse(rivi1.Substring(18, 2));
            vuosi += vuosi < 57 ? 2000 : 1900;
            t.EpookkiJd = Aika.Jd(vuosi, 1, 1) - 1 + D(rivi1.Substring(20, 12));
            t.Bstar = E(rivi1.Substring(53, 8));
            t.Inklinaatio = D(rivi2.Substring(8, 8)) * deg;
            t.Solmu = D(rivi2.Substring(17, 8)) * deg;
            t.Eksentrisyys = D("0." + rivi2.Substring(26, 7).Trim());
            t.Perigeum = D(rivi2.Substring(34, 8)) * deg;
            t.Keskianomalia = D(rivi2.Substring(43, 8)) * deg;
            t.Keskiliike = D(rivi2.Substring(52, 11)) * 2 * Math.PI / 1440.0;
            t.TarkisteOk = Tarkiste(rivi1) && Tarkiste(rivi2);
            return t;
        }

        /// <summary>TLE-rivin tarkiste: numeroiden summa + miinusmerkkien määrä, mod 10 = viimeinen merkki.</summary>
        public static bool Tarkiste(string rivi)
        {
            int summa = 0;
            for (int i = 0; i < 68; i++) { char c = rivi[i]; if (c >= '0' && c <= '9') summa += c - '0'; else if (c == '-') summa += 1; }
            return rivi[68] - '0' == summa % 10;
        }

        /// <summary>Haun aikaleima ja lähde iss-tle.json-tiedostosta (null, jos TLE on annettu riveinä).</summary>
        public string Haettu, Lahde;

        /// <summary>
        /// Siirtosepän iss-tle.json (PR #3334: Actions 6 h → media.matkakirja.app/data/iss-tle.json, buildiin
        /// StreamingAssets/mukana/iss-tle.json): {nimi, rivi1, rivi2, haettu, lahde}. Palauttaa null, jos tiedosto
        /// on rikki tai tarkiste ei täsmää, jolloin kutsuja käyttää edellistä (buildin) TLE:tä.
        /// </summary>
        public static Tle JasennaJson(string json)
        {
            if (string.IsNullOrEmpty(json)) return null;
            try
            {
                if (!(Matkakirja.Peli.MiniJson.Jasenna(json) is System.Collections.Generic.Dictionary<string, object> d)) return null;
                string S(string avain) => d.TryGetValue(avain, out var v) ? v as string : null;
                var t = Jasenna(S("rivi1"), S("rivi2"), S("nimi"));
                if (!t.TarkisteOk) return null;
                t.Haettu = S("haettu");
                t.Lahde = S("lahde");
                return t;
            }
            catch (Exception) { return null; }
        }
    }

    /// <summary>Juliaaninen päivä ja Greenwichin keskimääräinen tähtiaika.</summary>
    public static class Aika
    {
        /// <summary>Juliaaninen päivä kalenteripäivän alussa (UTC 0.00), gregoriaaninen 1900–2100.</summary>
        public static double Jd(int vuosi, int kuukausi, int paiva, double tunnit = 0) =>
            367.0 * vuosi - Math.Floor(7 * (vuosi + Math.Floor((kuukausi + 9) / 12.0)) * 0.25) + Math.Floor(275 * kuukausi / 9.0)
            + paiva + 1721013.5 + tunnit / 24.0;

        public static double Jd(DateTime utc) => Jd(utc.Year, utc.Month, utc.Day, utc.TimeOfDay.TotalHours);

        /// <summary>GMST radiaaneina (IAU 1982, Vallado gstime).</summary>
        public static double Gmst(double jdUt1)
        {
            double t = (jdUt1 - 2451545.0) / 36525.0;
            double s = -6.2e-6 * t * t * t + 0.093104 * t * t + (876600.0 * 3600 + 8640184.812866) * t + 67310.54841;
            double r = (s * Math.PI / 180 / 240.0) % (2 * Math.PI);
            return r < 0 ? r + 2 * Math.PI : r;
        }
    }

    /// <summary>SGP4-rata yhdelle TLE:lle (lähiradat). Sijainti(minuuttia epookista) → TEME km ja km/s.</summary>
    public sealed class Rata
    {
        // WGS-72 (TLE-aineiston vakiot)
        public const double Maansade = 6378.135, Mu = 398600.8;
        const double J2 = 0.001082616, J3 = -0.00000253881, J4 = -0.00000165597, J3oJ2 = J3 / J2, X2o3 = 2.0 / 3.0;
        static readonly double Xke = 60.0 / Math.Sqrt(Maansade * Maansade * Maansade / Mu);
        const double Tau = 2 * Math.PI;

        public readonly Tle Tle;
        public readonly bool Kaytettavissa;
        public readonly string Syy;

        // Alustetut
        readonly double no, ao, ecco, inclo, nodeo, argpo, mo, bstar;
        readonly double cosio, sinio, con41, x1mth2, x7thm1, eta, cc1, cc4, cc5, d2, d3, d4, delmo, sinmao;
        readonly double mdot, argpdot, nodedot, omgcof, xmcof, nodecf, t2cof, t3cof, t4cof, t5cof, xlcof, aycof;
        readonly bool isimp;

        /// <summary>Kierrosaika minuutteina (Brouwerin keskiliikkeestä).</summary>
        public double KierrosMin => Tau / no;

        public Rata(Tle t)
        {
            Tle = t;
            ecco = t.Eksentrisyys; inclo = t.Inklinaatio; nodeo = t.Solmu; argpo = t.Perigeum; mo = t.Keskianomalia; bstar = t.Bstar;
            double noKozai = t.Keskiliike;

            // initl: Kozai → Brouwer-keskiliike
            double eccsq = ecco * ecco, omeosq = 1 - eccsq, rteosq = Math.Sqrt(omeosq);
            cosio = Math.Cos(inclo); double cosio2 = cosio * cosio;
            double ak = Math.Pow(Xke / noKozai, X2o3);
            double d1 = 0.75 * J2 * (3 * cosio2 - 1) / (rteosq * omeosq);
            double del = d1 / (ak * ak);
            double adel = ak * (1 - del * del - del * (1.0 / 3.0 + 134 * del * del / 81.0));
            del = d1 / (adel * adel);
            no = noKozai / (1 + del);
            ao = Math.Pow(Xke / no, X2o3);
            sinio = Math.Sin(inclo);
            double po = ao * omeosq, con42 = 1 - 5 * cosio2;
            con41 = -con42 - cosio2 - cosio2;
            double posq = po * po, rp = ao * (1 - ecco);

            if (Tau / no >= 225) { Kaytettavissa = false; Syy = "syvän avaruuden rata (SDP4 puuttuu)"; return; }
            if (ecco >= 1 || ecco < 0 || no <= 0) { Kaytettavissa = false; Syy = "virheelliset elementit"; return; }

            // sgp4init (lähirata)
            double ss = 78.0 / Maansade + 1, qzms2t = Math.Pow((120.0 - 78.0) / Maansade, 4);
            isimp = rp < 220.0 / Maansade + 1;
            double sfour = ss, qzms24 = qzms2t, perige = (rp - 1) * Maansade;
            if (perige < 156)
            {
                sfour = perige - 78;
                if (perige < 98) sfour = 20;
                qzms24 = Math.Pow((120 - sfour) / Maansade, 4);
                sfour = sfour / Maansade + 1;
            }
            double pinvsq = 1 / posq;
            double tsi = 1 / (ao - sfour);
            eta = ao * ecco * tsi;
            double etasq = eta * eta, eeta = ecco * eta, psisq = Math.Abs(1 - etasq);
            double coef = qzms24 * Math.Pow(tsi, 4), coef1 = coef / Math.Pow(psisq, 3.5);
            double cc2 = coef1 * no * (ao * (1 + 1.5 * etasq + eeta * (4 + etasq)) + 0.375 * J2 * tsi / psisq * con41 * (8 + 3 * etasq * (8 + etasq)));
            cc1 = bstar * cc2;
            double cc3 = ecco > 1e-4 ? -2 * coef * tsi * J3oJ2 * no * sinio / ecco : 0;
            x1mth2 = 1 - cosio2;
            cc4 = 2 * no * coef1 * ao * omeosq * (eta * (2 + 0.5 * etasq) + ecco * (0.5 + 2 * etasq)
                - J2 * tsi / (ao * psisq) * (-3 * con41 * (1 - 2 * eeta + etasq * (1.5 - 0.5 * eeta))
                + 0.75 * x1mth2 * (2 * etasq - eeta * (1 + etasq)) * Math.Cos(2 * argpo)));
            cc5 = 2 * coef1 * ao * omeosq * (1 + 2.75 * (etasq + eeta) + eeta * etasq);
            double cosio4 = cosio2 * cosio2;
            double temp1 = 1.5 * J2 * pinvsq * no, temp2 = 0.5 * temp1 * J2 * pinvsq, temp3 = -0.46875 * J4 * pinvsq * pinvsq * no;
            mdot = no + 0.5 * temp1 * rteosq * con41 + 0.0625 * temp2 * rteosq * (13 - 78 * cosio2 + 137 * cosio4);
            argpdot = -0.5 * temp1 * con42 + 0.0625 * temp2 * (7 - 114 * cosio2 + 395 * cosio4) + temp3 * (3 - 36 * cosio2 + 49 * cosio4);
            double xhdot1 = -temp1 * cosio;
            nodedot = xhdot1 + (0.5 * temp2 * (4 - 19 * cosio2) + 2 * temp3 * (3 - 7 * cosio2)) * cosio;
            omgcof = bstar * cc3 * Math.Cos(argpo);
            xmcof = ecco > 1e-4 ? -X2o3 * coef * bstar / eeta : 0;
            nodecf = 3.5 * omeosq * xhdot1 * cc1;
            t2cof = 1.5 * cc1;
            xlcof = Math.Abs(cosio + 1) > 1.5e-12
                ? -0.25 * J3oJ2 * sinio * (3 + 5 * cosio) / (1 + cosio)
                : -0.25 * J3oJ2 * sinio * (3 + 5 * cosio) / 1.5e-12;
            aycof = -0.5 * J3oJ2 * sinio;
            delmo = Math.Pow(1 + eta * Math.Cos(mo), 3);
            sinmao = Math.Sin(mo);
            x7thm1 = 7 * cosio2 - 1;
            if (!isimp)
            {
                double cc1sq = cc1 * cc1;
                d2 = 4 * ao * tsi * cc1sq;
                double temp = d2 * tsi * cc1 / 3;
                d3 = (17 * ao + sfour) * temp;
                d4 = 0.5 * temp * ao * tsi * (221 * ao + 31 * sfour) * cc1;
                t3cof = d2 + 2 * cc1sq;
                t4cof = 0.25 * (3 * d3 + cc1 * (12 * d2 + 10 * cc1sq));
                t5cof = 0.2 * (3 * d4 + 12 * cc1 * d3 + 6 * d2 * d2 + 15 * cc1sq * (2 * d2 + cc1sq));
            }
            Kaytettavissa = true;
        }

        /// <summary>
        /// Sijainti ja nopeus TEME-koordinaatistossa (km, km/s) hetkellä t minuuttia epookista. Palauttaa false, jos rata on
        /// hajonnut (eksentrisyys tai puoliakseli mahdoton, satelliitti pudonnut).
        /// </summary>
        public bool Sijainti(double t, out (double x, double y, double z) r, out (double x, double y, double z) v)
        {
            r = default; v = default;
            if (!Kaytettavissa) return false;
            double xmdf = mo + mdot * t, argpdf = argpo + argpdot * t, nodedf = nodeo + nodedot * t;
            double argpm = argpdf, mm = xmdf, t2 = t * t, nodem = nodedf + nodecf * t2;
            double tempa = 1 - cc1 * t, tempe = bstar * cc4 * t, templ = t2cof * t2;
            if (!isimp)
            {
                double delomg = omgcof * t;
                double delm = xmcof * (Math.Pow(1 + eta * Math.Cos(xmdf), 3) - delmo);
                double temp = delomg + delm;
                mm = xmdf + temp;
                argpm = argpdf - temp;
                double t3 = t2 * t, t4 = t3 * t;
                tempa = tempa - d2 * t2 - d3 * t3 - d4 * t4;
                tempe = tempe + bstar * cc5 * (Math.Sin(mm) - sinmao);
                templ = templ + t3cof * t3 + t4 * (t4cof + t * t5cof);
            }
            double nm = no, em = ecco, inclm = inclo;
            if (nm <= 0) return false;
            double am = Math.Pow(Xke / nm, X2o3) * tempa * tempa;
            nm = Xke / Math.Pow(am, 1.5);
            em = em - tempe;
            if (em >= 1 || em < -0.001) return false;
            if (em < 1e-6) em = 1e-6;
            mm = mm + no * templ;
            double xlm = mm + argpm + nodem;
            nodem %= Tau; argpm %= Tau; xlm %= Tau;
            mm = (xlm - argpm - nodem) % Tau;

            double sinim = Math.Sin(inclm), cosim = Math.Cos(inclm);
            double ep = em, xincp = inclm, argpp = argpm, nodep = nodem, mp = mm, sinip = sinim, cosip = cosim;

            // Pitkäjaksoiset termit
            double axnl = ep * Math.Cos(argpp);
            double tmp = 1 / (am * (1 - ep * ep));
            double aynl = ep * Math.Sin(argpp) + tmp * aycof;
            double xl = mp + argpp + nodep + tmp * xlcof * axnl;

            // Keplerin yhtälö
            double u = (xl - nodep) % Tau, eo1 = u, tem5 = 9999.9, sineo1 = 0, coseo1 = 0;
            for (int k = 1; Math.Abs(tem5) >= 1e-12 && k <= 10; k++)
            {
                sineo1 = Math.Sin(eo1); coseo1 = Math.Cos(eo1);
                tem5 = 1 - coseo1 * axnl - sineo1 * aynl;
                tem5 = (u - aynl * coseo1 + axnl * sineo1 - eo1) / tem5;
                if (Math.Abs(tem5) >= 0.95) tem5 = tem5 > 0 ? 0.95 : -0.95;
                eo1 += tem5;
            }

            // Lyhytjaksoiset termit
            double ecose = axnl * coseo1 + aynl * sineo1, esine = axnl * sineo1 - aynl * coseo1;
            double el2 = axnl * axnl + aynl * aynl, pl = am * (1 - el2);
            if (pl < 0) return false;
            double rl = am * (1 - ecose), rdotl = Math.Sqrt(am) * esine / rl, rvdotl = Math.Sqrt(pl) / rl;
            double betal = Math.Sqrt(1 - el2), tmp2 = esine / (1 + betal);
            double sinu = am / rl * (sineo1 - aynl - axnl * tmp2), cosu = am / rl * (coseo1 - axnl + aynl * tmp2);
            double su = Math.Atan2(sinu, cosu);
            double sin2u = (cosu + cosu) * sinu, cos2u = 1 - 2 * sinu * sinu;
            double tpl = 1 / pl, temp1 = 0.5 * J2 * tpl, temp2 = temp1 * tpl;
            double mrt = rl * (1 - 1.5 * temp2 * betal * con41) + 0.5 * temp1 * x1mth2 * cos2u;
            su = su - 0.25 * temp2 * x7thm1 * sin2u;
            double xnode = nodep + 1.5 * temp2 * cosip * sin2u;
            double xinc = xincp + 1.5 * temp2 * cosip * sinip * cos2u;
            double mvt = rdotl - nm * temp1 * x1mth2 * sin2u / Xke;
            double rvdot = rvdotl + nm * temp1 * (x1mth2 * cos2u + 1.5 * con41) / Xke;

            double sinsu = Math.Sin(su), cossu = Math.Cos(su), snod = Math.Sin(xnode), cnod = Math.Cos(xnode);
            double sini = Math.Sin(xinc), cosi = Math.Cos(xinc);
            double xmx = -snod * cosi, xmy = cnod * cosi;
            double ux = xmx * sinsu + cnod * cossu, uy = xmy * sinsu + snod * cossu, uz = sini * sinsu;
            double vx = xmx * cossu - cnod * sinsu, vy = xmy * cossu - snod * sinsu, vz = sini * cossu;
            if (mrt < 1) return false;   // pudonnut
            double vkm = Maansade * Xke / 60.0;
            r = (mrt * ux * Maansade, mrt * uy * Maansade, mrt * uz * Maansade);
            v = ((mvt * ux + rvdot * vx) * vkm, (mvt * uy + rvdot * vy) * vkm, (mvt * uz + rvdot * vz) * vkm);
            return true;
        }

        /// <summary>Alapiste (geodeettinen leveys ja pituus asteina, korkeus km WGS-84-ellipsoidista) UTC-hetkellä.</summary>
        public bool Alapiste(double jdUtc, out double lat, out double lon, out double korkeusKm)
        {
            lat = lon = korkeusKm = 0;
            if (!Sijainti((jdUtc - Tle.EpookkiJd) * 1440.0, out var r, out _)) return false;
            Maahan(r, jdUtc, out lat, out lon, out korkeusKm);
            return true;
        }

        /// <summary>TEME → ECEF (GMST-kierto) → geodeettinen WGS-84 (Bowringin iteraatio).</summary>
        public static void Maahan((double x, double y, double z) r, double jdUtc, out double lat, out double lon, out double korkeusKm)
        {
            double g = Aika.Gmst(jdUtc), cg = Math.Cos(g), sg = Math.Sin(g);
            double x = cg * r.x + sg * r.y, y = -sg * r.x + cg * r.y, z = r.z;
            const double a = 6378.137, f = 1 / 298.257223563, e2 = f * (2 - f);
            double p = Math.Sqrt(x * x + y * y);
            lon = Math.Atan2(y, x) * 180 / Math.PI;
            double phi = Math.Atan2(z, p * (1 - e2)), n = a;
            for (int i = 0; i < 6; i++)
            {
                double s = Math.Sin(phi);
                n = a / Math.Sqrt(1 - e2 * s * s);
                phi = Math.Atan2(z + e2 * n * s, p);
            }
            lat = phi * 180 / Math.PI;
            korkeusKm = p / Math.Cos(phi) - n;
        }
    }
}
