// PULUN AVARUUSKÄVELYASUN VALOT (Päätoimittaja 30.9.2026, omistajan tilaus; Codexin asu haarassa codex-pulu-avaruuskavely
// e09b4467): kolme erillistä valokerrosta (kasvovalo visiirin sisällä, kypärälamput, maavalo alta) säädetään ISS:n valon
// mukaan. Yöllä (asema maan varjossa) kasvovalo ja lamput vahvoina, maan valo hämärä; päivällä maan heijastama valo vahvana
// ja omat valot hillittyinä. Sama kaava webissä (js/linssit/pulu-eva-valo.js), rinnakkain CupolanValon kanssa:
// aurinkoisuus = ISS auringossa 0…1, maavalo = maa alla valaistu 0,15…1.
using System;

namespace Matkakirja.Linssit.Iss
{
    public static class EvaValo
    {
        /// <summary>Kerrosten peittävyydet 0…1 aurinkoisuudesta (0…1) ja maavalosta (CupolanValo.Maavalo, 0,15…1).</summary>
        public static (float kasvo, float lamput, float maa) Valot(double aurinkoisuus, double maavalo)
        {
            double s = Math.Max(0, Math.Min(1, aurinkoisuus));
            double m = Math.Max(0, Math.Min(1, (maavalo - 0.15) / 0.85));
            return ((float)(1 - 0.65 * s), (float)(1 - 0.75 * s), (float)(0.1 + 0.9 * m));
        }

        /// <summary>Valot hetkellä <paramref name="utc"/> ISS:n paikan mukaan.</summary>
        public static (float kasvo, float lamput, float maa) Nyt(DateTime utc)
        {
            // ylös · aurinko ISS:n alapisteessä (pallo; sama kuin Avaruuskavely.MaanAurinko fotorealismihaarassa).
            var p = IssNyt.Paikka(utc);
            Aurinko.Alihajapiste(Aika.Jd(utc), out double alat, out double alon);
            const double r = Math.PI / 180;
            double ylos = Math.Sin(p.Lat * r) * Math.Sin(alat * r) + Math.Cos(p.Lat * r) * Math.Cos(alat * r) * Math.Cos((p.Lon - alon) * r);
            return Valot(CupolanValo.Aurinkoisuus(ylos, IssNyt.KorkeusKm(utc)), CupolanValo.Maavalo(ylos));
        }
    }
}
