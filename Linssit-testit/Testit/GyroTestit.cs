// Tähtitaivaan gyro: CoreMotionin magneettisen kehyksen asento kameran katseeksi (Gyromatikka).
using System;
using Matkakirja.Linssit.Taivas;

namespace Matkakirja.Linssit.Testit
{
    public static class GyroTestit
    {
        static bool Lahella(Horisontti h, double e, double u, double n) =>
            Math.Abs(h.Ita - e) < 1e-6 && Math.Abs(h.Ylos - u) < 1e-6 && Math.Abs(h.Pohjoinen - n) < 1e-6;

        static (double x, double y, double z, double w) Akseli(double ax, double ay, double az, double asteet)
        {
            double k = asteet * Math.PI / 360, s = Math.Sin(k);
            return (ax * s, ay * s, az * s, Math.Cos(k));
        }

        [Testi] static void TasollaNaytto_YlosTakakameraAlas()
        {
            // Identiteetti: laite pöydällä näyttö ylös, oikea reuna magneettiseen pohjoiseen (yläreuna länteen).
            var (katse, ylos) = Gyromatikka.Kamera(0, 0, 0, 1, Ruutu.Pysty, 0);
            Oleta.Tosi(Lahella(katse, 0, -1, 0), "takakamera alas");
            Oleta.Tosi(Lahella(ylos, -1, 0, 0), "yläreuna länteen");
        }

        [Testi] static void YlareunaPohjoiseen_JaDeklinaatio()
        {
            // −90° z-akselin ympäri: yläreuna (y) → magneettinen pohjoinen (X).
            var q = Akseli(0, 0, 1, -90);
            var (_, ylos) = Gyromatikka.Kamera(q.x, q.y, q.z, q.w, Ruutu.Pysty, 0);
            Oleta.Tosi(Lahella(ylos, 0, 0, 1), $"yläreuna pohjoiseen: {ylos.Ita:F3} {ylos.Ylos:F3} {ylos.Pohjoinen:F3}");
            // Helsingin deklinaatio +10°: magneettinen pohjoinen on 10° todellisesta itään.
            var (_, y10) = Gyromatikka.Kamera(q.x, q.y, q.z, q.w, Ruutu.Pysty, 10);
            Oleta.Tosi(Math.Abs(y10.Atsimuutti - 10) < 1e-6, $"atsimuutti {y10.Atsimuutti:F2}");
        }

        [Testi] static void PystyssaTakakameraHorisonttiin()
        {
            // Laite pystyssä kasvojen edessä takakamera pohjoiseen: ensin yläreuna pohjoiseen (−90° z), sitten 90° kallistus
            // laitteen x-akselin ympäri (yläreuna ylös): katse pohjoiseen vaakatasossa, yläsuunta ylös.
            var a = Akseli(0, 0, 1, -90);
            var b = Akseli(1, 0, 0, 90);
            // q = a ⊗ b (ensin b laitteen kehyksessä, sitten a).
            double qw = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;
            double qx = a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y;
            double qy = a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x;
            double qz = a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w;
            var (katse, ylos) = Gyromatikka.Kamera(qx, qy, qz, qw, Ruutu.Pysty, 0);
            Oleta.Tosi(Math.Abs(katse.Korkeus) < 1e-6 && Math.Abs(katse.Atsimuutti) < 1e-6 || Math.Abs(katse.Atsimuutti - 360) < 1e-6,
                $"katse {katse.Atsimuutti:F2}° / {katse.Korkeus:F2}°");
            Oleta.Tosi(Math.Abs(ylos.Korkeus - 90) < 1e-4, $"ylös {ylos.Korkeus:F2}");
            // Vaaka vasen: yläsuunta on laitteen oikea reuna.
            var (_, yv) = Gyromatikka.Kamera(qx, qy, qz, qw, Ruutu.VaakaVasen, 0);
            Oleta.Tosi(Math.Abs(yv.Korkeus) < 1e-4, "vaakaruudussa yläsuunta vaakatasossa, kun laite on pystyssä");
        }
    }
}
