// TÄHTITAIVAAN GYRO (Linssiseppä 29.9.2026): CoreMotionin asento magneettisen pohjoisen kehyksessä (X magneettinen pohjoinen,
// Y länsi, Z ylös; Plugins/iOS/MatkakirjaTaivasAsento.mm) kameran katseeksi ja yläsuunnaksi paikallisessa horisontissa (itä,
// ylös, pohjoinen = Unityn x, y, z). Kvaternio vie laitteen kehyksen (x oikealle, y yläreunaan, z ruudusta ulos) viitekehykseen.
// Kamera katsoo takakameran suuntaan (−z); yläsuunta riippuu ruudun kierrosta. Deklinaatio (Wmm) kääntää magneettisen pohjoisen
// todelliseksi. Puhdas C#, testit Linssit-testit/Testit/GyroTestit.cs.
using System;

namespace Matkakirja.Linssit.Taivas
{
    /// <summary>Ruudun asento (Unityn ScreenOrientation-arvot ilman Unityä).</summary>
    public enum Ruutu { Pysty, VaakaVasen, VaakaOikea, Ylosalaisin }

    public static class Gyromatikka
    {
        /// <summary>Kvaternion (x, y, z, w) kierto vektorille v (v' = q v q*).</summary>
        public static (double x, double y, double z) Kierra(double qx, double qy, double qz, double qw, (double x, double y, double z) v)
        {
            // t = 2 q.xyz × v; v' = v + w t + q.xyz × t
            double tx = 2 * (qy * v.z - qz * v.y), ty = 2 * (qz * v.x - qx * v.z), tz = 2 * (qx * v.y - qy * v.x);
            return (v.x + qw * tx + (qy * tz - qz * ty), v.y + qw * ty + (qz * tx - qx * tz), v.z + qw * tz + (qx * ty - qy * tx));
        }

        /// <summary>Viitekehyksen (pohjoinen, länsi, ylös) vektori horisonttiin (itä, ylös, pohjoinen), deklinaatio asteina itään.</summary>
        public static Horisontti Horisonttiin((double x, double y, double z) viite, double deklinaatio)
        {
            double ita = -viite.y, ylos = viite.z, pohjoinen = viite.x;
            // Magneettinen atsimuutti + deklinaatio = todellinen: kierto ylösakselin ympäri.
            double d = deklinaatio * Math.PI / 180, c = Math.Cos(d), s = Math.Sin(d);
            return new Horisontti(ita * c + pohjoinen * s, ylos, -ita * s + pohjoinen * c);
        }

        /// <summary>Kameran katse ja yläsuunta horisontissa laitteen asennosta (kaanteinen = kvaternio kääntäen, A/B-laitetestiin).</summary>
        public static (Horisontti Katse, Horisontti Ylos) Kamera(double qx, double qy, double qz, double qw, Ruutu ruutu, double deklinaatio,
            bool kaanteinen = false)
        {
            if (kaanteinen) { qx = -qx; qy = -qy; qz = -qz; }
            var ylosLaitteessa = ruutu switch
            {
                Ruutu.VaakaVasen => (1.0, 0.0, 0.0),
                Ruutu.VaakaOikea => (-1.0, 0.0, 0.0),
                Ruutu.Ylosalaisin => (0.0, -1.0, 0.0),
                _ => (0.0, 1.0, 0.0),
            };
            var katse = Kierra(qx, qy, qz, qw, (0, 0, -1));
            var ylos = Kierra(qx, qy, qz, qw, ylosLaitteessa);
            return (Horisonttiin(katse, deklinaatio), Horisonttiin(ylos, deklinaatio));
        }
    }
}
