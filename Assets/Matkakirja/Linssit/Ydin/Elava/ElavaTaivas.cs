// ELÄVÄ TAIVAS (Linssiseppä 9.10.2026; Päätoimittaja juna 170: "elävä taivas (linnut, lentokone, harvoin toinen pallo) + iltavalot"):
// päivällä V-muodostelmassa lentävä lintuparvi ylittää näkymän harvakseltaan (Parvivali), kaukainen lentokone tiivistysvanoineen
// ylittää taivaan, kun sen ääni soi (Kone), ja yöllä harvoin 1–2 valonheittimen keilaa pyyhkii taivasta hitaasti kaupungin laidalta
// (Heitin; Päätoimittaja: ei mistään tunnistettavasta maamerkistä — Eiffelin valaistus on SETE:n suojaama, sitä ei jäljitellä). Koordinaatit
// elävän kaupungin paketin origossa (x itä, z pohjoinen, y korkeus, m). Satunnaisuus annetulla siemenellä (testit). Puhdas C#.
using System;

namespace Matkakirja.Linssit.Elava
{
    public sealed class ElavaTaivas
    {
        public const int ParviLintuja = 9;
        public const double ParviNopeus = 13, ParviKestoS = 75, ParviMinValiS = 70, ParviMaxValiS = 160, ParviLahinM = 350, ParviKaukaisinM = 800;
        public const double KoneKorkeusM = 9500, KoneNopeus = 230, KoneOhitusMinM = 5000, KoneOhitusMaxM = 9000, KoneKestoS = 170;
        public const double HeitinMinValiS = 240, HeitinMaxValiS = 480, HeitinKestoS = 80, HeitinSyttyyS = 6, HeitinMinM = 2500, HeitinMaxM = 4000, HeitinPituusM = 3500;

        public sealed class Lintuparvi { public double X0, Z0, Y, Suunta, Alku; }
        public sealed class Kone { public double X0, Z0, Suunta, Alku; }
        public sealed class Heitin { public double X, Z, Suunta, Alku; public int Maara; }

        public Lintuparvi Parvi { get; private set; }
        public Kone Lentokone { get; private set; }
        public Heitin Valonheitin { get; private set; }
        double seuraavaParvi, seuraavaHeitin;
        readonly Random r;

        public ElavaTaivas(int siemen) { r = new Random(siemen); seuraavaParvi = 30 + 30 * r.NextDouble(); seuraavaHeitin = 60 + 60 * r.NextDouble(); }

        /// <summary>Joka ruutu: aika t (s), kamera (x, y, z); paiva = linnut sallittu (ei yöllä), yo = valonheittimet sallittu.</summary>
        public void Paivita(double t, double kx, double ky, double kz, bool paiva, bool yo = false)
        {
            if (Parvi != null && t - Parvi.Alku > ParviKestoS) Parvi = null;
            if (Lentokone != null && t - Lentokone.Alku > KoneKestoS) Lentokone = null;
            if (Valonheitin != null && (t - Valonheitin.Alku > HeitinKestoS || !yo)) Valonheitin = null;
            if (Valonheitin == null && t >= seuraavaHeitin)
            {
                seuraavaHeitin = t + HeitinMinValiS + (HeitinMaxValiS - HeitinMinValiS) * r.NextDouble();
                if (yo)
                {
                    // Kaupungin laidalla HeitinMinM…MaxM kamerasta satunnaiseen suuntaan; keilat pyyhkivät kameraa kohti olevalla puolella.
                    double su = 2 * Math.PI * r.NextDouble(), d = HeitinMinM + (HeitinMaxM - HeitinMinM) * r.NextDouble();
                    Valonheitin = new Heitin { X = kx + Math.Sin(su) * d, Z = kz + Math.Cos(su) * d, Suunta = (su * 180 / Math.PI + 180) % 360, Alku = t, Maara = r.NextDouble() < 0.5 ? 1 : 2 };
                }
            }
            if (Parvi == null && t >= seuraavaParvi)
            {
                seuraavaParvi = t + ParviMinValiS + (ParviMaxValiS - ParviMinValiS) * r.NextDouble();
                if (!paiva) return;
                // Reitti kulkee kameran ohi ParviLahinM…ParviKaukaisinM:n päästä, keskikohta ParviKestoS/2:n kohdalla.
                double su = 2 * Math.PI * r.NextDouble(), d = ParviLahinM + (ParviKaukaisinM - ParviLahinM) * r.NextDouble(), puoli = r.NextDouble() < 0.5 ? -1 : 1;
                double ux = Math.Sin(su), uz = Math.Cos(su), nx = uz * puoli, nz = -ux * puoli, l = ParviNopeus * ParviKestoS / 2;
                Parvi = new Lintuparvi { X0 = kx + nx * d - ux * l, Z0 = kz + nz * d - uz * l, Y = ky - 30 + 50 * r.NextDouble(), Suunta = su * 180 / Math.PI, Alku = t };
            }
        }

        /// <summary>Lentokone ääneen tahdistettuna: ohittaa kameran KoneOhitusMinM…MaxM:n päästä KoneKorkeusM:ssä.</summary>
        public void AloitaKone(double t, double kx, double kz)
        {
            double su = 2 * Math.PI * r.NextDouble(), d = KoneOhitusMinM + (KoneOhitusMaxM - KoneOhitusMinM) * r.NextDouble();
            double ux = Math.Sin(su), uz = Math.Cos(su), l = KoneNopeus * KoneKestoS / 2;
            Lentokone = new Kone { X0 = kx + uz * d - ux * l, Z0 = kz - ux * d - uz * l, Suunta = su * 180 / Math.PI, Alku = t };
        }

        /// <summary>Linnun j paikka (x, y, z), suunta (°) ja siiven vaihe 0…1 hetkellä t (V: johtaja kärjessä, siivet vuorotellen).</summary>
        public (double x, double y, double z, double suunta, double siipi) Lintu(int j, double t)
        {
            var p = Parvi; double s = t - p.Alku, a = p.Suunta * Math.PI / 180, ux = Math.Sin(a), uz = Math.Cos(a);
            int rivi = (j + 1) / 2, puoli = j == 0 ? 0 : (j % 2 == 1 ? -1 : 1);
            double taakse = 4.5 * rivi, sivu = 4.0 * rivi * puoli;
            double x = p.X0 + ux * (ParviNopeus * s - taakse) + uz * sivu, z = p.Z0 + uz * (ParviNopeus * s - taakse) - ux * sivu;
            double y = p.Y + 0.8 * Math.Sin(0.7 * s + j);
            return (x, y, z, p.Suunta, (s * 2.6 + 0.37 * j) % 1.0);
        }

        /// <summary>Lentokoneen paikka (x, y, z) hetkellä t.</summary>
        public (double x, double y, double z) KonePaikka(double t)
        {
            var k = Lentokone; double s = t - k.Alku, a = k.Suunta * Math.PI / 180;
            return (k.X0 + Math.Sin(a) * KoneNopeus * s, KoneKorkeusM, k.Z0 + Math.Cos(a) * KoneNopeus * s);
        }

        /// <summary>Keilan i suunta (° pohjoisesta) ja nousukulma (° vaakatasosta) hetkellä t: hidas pyyhkäisy ±35° ja 55–75°.</summary>
        public (double suunta, double nousu) Keila(int i, double t)
        {
            var h = Valonheitin; double s = t - h.Alku, v = i * Math.PI * 0.8;
            return ((h.Suunta + 35 * Math.Sin(2 * Math.PI * s / 46 + v) + 360) % 360, 65 + 10 * Math.Sin(2 * Math.PI * s / 31 + 1.7 * v));
        }

        /// <summary>Keilojen voima 0…1: syttyy ja sammuu HeitinSyttyyS:ssä.</summary>
        public double HeitinVoima(double t)
        {
            if (Valonheitin == null) return 0;
            double s = t - Valonheitin.Alku;
            return Math.Max(0, Math.Min(1, Math.Min(s, HeitinKestoS - s) / HeitinSyttyyS));
        }
    }
}
