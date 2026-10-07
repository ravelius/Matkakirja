// HISTORIAMOOTTORI E3b (Siirtoseppä 7.10.2026): voudin sääntö — vaarahetki, pysähdys ja jatko, laskeutuminen ja kiinni, kova ääni aina,
// kappalaisen käynti estää havainnot, valppaus.
using System;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class VoudinKierrosTestit
    {
        static void Aja(VoudinKierros v, VoudinSyote s, double sek) { for (double t = 0; t < sek; t += 0.1) v.Paivita(0.1, s); }

        [Testi] static void ValoHuomataanVainVaarahetkella()
        {
            var v = new VoudinKierros();
            Aja(v, new VoudinSyote { ValoNakyy = true }, 10);   // kierroksen alku: ei vaarahetkeä
            Oleta.Sama(VoudinTila.Kierros, v.Tila);
            Aja(v, new VoudinSyote(), 7.6);                      // kohti ohitusta (20 s)
            Oleta.Tosi(v.Hehku > 0.2, $"hehku kasvaa ennen ohitusta ({v.Hehku:F2})");
            Aja(v, new VoudinSyote { ValoNakyy = true }, 0.5);
            Oleta.Sama(VoudinTila.Pysahdys, v.Tila);
        }

        [Testi] static void SyyPoistuuJatkaaMuutenLaskeutuuJaKiinni()
        {
            var v = new VoudinKierros();
            Aja(v, new VoudinSyote(), 19);
            Aja(v, new VoudinSyote { TavallinenAani = true }, 0.2);
            Oleta.Sama(VoudinTila.Pysahdys, v.Tila);
            Aja(v, new VoudinSyote(), 3.2);
            Oleta.Sama(VoudinTila.Kierros, v.Tila);              // varoitus, jatkaa
            var w = new VoudinKierros();
            Aja(w, new VoudinSyote(), 19);
            Aja(w, new VoudinSyote { ValoNakyy = true, FoggPortaikossa = true }, 3.5);
            Oleta.Sama(VoudinTila.Laskeutuu, w.Tila);
            Aja(w, new VoudinSyote { FoggPortaikossa = true }, 7);
            Oleta.Sama(VoudinTila.Kiinni, w.Tila);
            w.Tyrmasta();
            Oleta.Tosi(w.Tila == VoudinTila.Kierros && w.Valpas, "tyrmän jälkeen valpas");
        }

        [Testi] static void KovaAaniAinaJaKappalainenEstaa()
        {
            var v = new VoudinKierros();
            Aja(v, new VoudinSyote(), 2);
            Aja(v, new VoudinSyote { KovaAani = true, KappalainenHuoneessa = true }, 0.2);
            Oleta.Sama(VoudinTila.Kierros, v.Tila);
            Aja(v, new VoudinSyote { KovaAani = true }, 0.2);
            Oleta.Sama(VoudinTila.Pysahdys, v.Tila);
        }
    }
}
