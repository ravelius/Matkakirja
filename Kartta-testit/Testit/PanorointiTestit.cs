// PANOROINTI RUUTUPISTEESEEN (löydös 48): puhtaan ratkaisijan testit. Kamera on PalloKierto.LaskeAsento pallomallina
// (kohde pinnalla, kallistus ja suuntima kuten Aseta) ja projektio kuten PalloKierto.Projisoi. Tarkistetaan, että
// piste päätyy maalipikseliin alle 0,25 px:n virheellä muutamassa kierroksessa kallistetulla ja kierretyllä kameralla,
// myös kun piste on alussa ruudun ulkopuolella, ja että taivasta vasten oleva maali ei väitä onnistuvansa.
using System;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class PanorointiTestit
    {
        const double R = 6371000.0;
        const double Leveys = 1640, Korkeus = 2360, Fov = 50.0; // iPad pysty, pikseleinä

        readonly struct V
        {
            public readonly double X, Y, Z;
            public V(double x, double y, double z) { X = x; Y = y; Z = z; }
            public static V operator +(V a, V b) => new V(a.X + b.X, a.Y + b.Y, a.Z + b.Z);
            public static V operator -(V a, V b) => new V(a.X - b.X, a.Y - b.Y, a.Z - b.Z);
            public static V operator *(V a, double k) => new V(a.X * k, a.Y * k, a.Z * k);
            public static double Piste(V a, V b) => a.X * b.X + a.Y * b.Y + a.Z * b.Z;
            public static V Risti(V a, V b) => new V(a.Y * b.Z - a.Z * b.Y, a.Z * b.X - a.X * b.Z, a.X * b.Y - a.Y * b.X);
            public V Yksikko => this * (1.0 / Math.Sqrt(Piste(this, this)));
        }

        static V Yks(double lat, double lon)
        {
            double f = lat * Math.PI / 180, l = lon * Math.PI / 180;
            return new V(Math.Cos(f) * Math.Cos(l), Math.Cos(f) * Math.Sin(l), Math.Sin(f));
        }

        /// <summary>Pallomallin PalloKierto.LaskeAsento + Projisoi: kohteen ruutupaikka kameran katselupisteellä (pit, lev).</summary>
        static Panorointi.Projektio Kamera(double korkeusM, double kallistus, double suuntima, double lat, double lon) =>
            (double pit, double lev, out double x, out double y) =>
            {
                x = y = 0;
                V ylos = Yks(lev, pit), kohde = ylos * R;
                V napa = new V(0, 0, 1);
                V pohjoinen = (napa - ylos * V.Piste(napa, ylos)).Yksikko;
                V ita = V.Risti(pohjoinen, ylos).Yksikko;
                double b = suuntima * Math.PI / 180, k = kallistus * Math.PI / 180;
                V eteenMaa = pohjoinen * Math.Cos(b) + ita * Math.Sin(b);
                V silma = kohde + (ylos * Math.Cos(k) - eteenMaa * Math.Sin(k)) * korkeusM;
                V kameranYlos = eteenMaa * Math.Cos(k) + ylos * Math.Sin(k);
                V eteen = (kohde - silma).Yksikko;
                V yl = (kameranYlos - eteen * V.Piste(kameranYlos, eteen)).Yksikko;
                V oikea = V.Risti(eteen, yl);
                V d = Yks(lat, lon) * R - silma;
                double z = V.Piste(d, eteen);
                if (z <= 0) return false;
                double tanY = Math.Tan(Fov * Math.PI / 360), aspect = Leveys / Korkeus;
                x = (V.Piste(d, oikea) / (z * tanY * aspect) + 1) * 0.5 * Leveys;
                y = (V.Piste(d, yl) / (z * tanY) + 1) * 0.5 * Korkeus;
                return true;
            };

        /// <summary>Asteita pikselille pystysuunnassa (PalloKierto.AstettaPikselille).</summary>
        static double Askel(double korkeusM) => 4.0 * 2.0 * korkeusM * Math.Tan(Fov * Math.PI / 360) / R * 180 / Math.PI / Korkeus;

        static Panorointi.Tulos Aja(double korkeusM, double kallistus, double suuntima, double kamLat, double kamLon,
            double lat, double lon, double mx, double my)
        {
            var f = Kamera(korkeusM, kallistus, suuntima, lat, lon);
            // Alkuarvaus kuten PalloKierto: tasaisen maan siirto. Testissä maalipikselin alla olevan maan sijaan
            // käytetään kohdetta itseään ja kameran katselupistettä (keskikohta), mikä on heikompi arvaus.
            return Panorointi.Ratkaise(f, kamLon, kamLat, mx, my, Askel(korkeusM), 80.0, 0.25, 8);
        }

        [Testi]
        static void SuoraKatseKeskelta()
        {
            // Kallistus 0, pohjoinen ylös: piste 1° koilliseen, maali ruudun vasen yläneljännes.
            var t = Aja(1_200_000, 0, 0, 48.85, 2.35, 49.85, 3.35, 0.3 * Leveys, 0.7 * Korkeus);
            Oleta.Tosi(t.Onnistui, $"virhe {t.Virhe:0.###} px, {t.Kierroksia} kierrosta");
            Oleta.Tosi(t.Kierroksia <= 4, $"kierroksia {t.Kierroksia}");
        }

        [Testi]
        static void KallistettuJaKierretty()
        {
            // Maalit maan puolella: 75°:n kallistuksella 400 km:stä horisontti on noin 0,6 ruudun korkeudella.
            foreach (var (kall, suunt) in new[] { (30.0, 0.0), (60.0, 45.0), (75.0, -120.0), (45.0, 200.0) })
            foreach (var (mx, my) in new[] { (0.3, 0.55), (0.5, 0.2), (0.8, 0.45), (0.1, 0.4) })
            {
                var t = Aja(400_000, kall, suunt, 41.0, 29.0, 41.6, 28.2, mx * Leveys, my * Korkeus);
                Oleta.Tosi(t.Onnistui, $"kall {kall} suunt {suunt} maali ({mx}, {my}): virhe {t.Virhe:0.###} px, {t.Kierroksia} kierrosta");
                Oleta.Tosi(t.Kierroksia <= 6, $"kall {kall} suunt {suunt}: kierroksia {t.Kierroksia}");
            }
        }

        [Testi]
        static void RuudunUlkopuoleltaJaPituusrajanYli()
        {
            // Piste noin 8° kameran takana (ruudun ulkopuolella), ja pituus kiertyy ±180°:n yli.
            var t = Aja(800_000, 20, 10, -17.0, 178.0, -19.0, -174.0, 0.25 * Leveys, 0.5 * Korkeus);
            Oleta.Tosi(t.Onnistui, $"virhe {t.Virhe:0.###} px, {t.Kierroksia} kierrosta");
            Oleta.Tosi(t.Pituus >= -180 && t.Pituus <= 180, $"pituus {t.Pituus}");
        }

        [Testi]
        static void TaivasEiOnnistu()
        {
            // 80°:n kallistuksella lähellä pintaa ruudun ylälaita on taivasta: mikään maan piste ei osu sinne.
            var t = Aja(30_000, 80, 0, 45.0, 7.0, 45.1, 7.0, 0.5 * Leveys, 0.99 * Korkeus);
            Oleta.Tosi(!t.Onnistui, $"virhe {t.Virhe:0.###} px");
            Oleta.Tosi(!double.IsNaN(t.Pituus) && !double.IsNaN(t.Leveys), "ei NaN");
        }

        [Testi]
        static void AlkuarvausTasainenSiirto()
        {
            var (p, l) = Panorointi.Alkuarvaus(179.0, 10.0, 178.5, 11.0, -179.5, 12.0);
            Oleta.Tosi(Math.Abs(p - (-179.0)) < 1e-9 && Math.Abs(l - 11.0) < 1e-9, $"({p}, {l})");
            var (_, lr) = Panorointi.Alkuarvaus(0, 75, 0, 70, 0, 80, 80);
            Oleta.Sama(80.0, lr, "leveysraja");
        }
    }
}
