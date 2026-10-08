// VENEYÖN OPPITUNTI (Siirtoseppä 8.10.2026): pressun alla, kurkistus nostaa päätä, lyhdyn pyyhkäisy, nähdyksi tuleminen toistaa ilman
// rangaistusta, enintään 3 yritystä.
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class PressuTestit
    {
        static void Aja(Pressu p, double s, double pitch) { int n = (int)System.Math.Round(s / 0.05); for (int i = 0; i < n; i++) p.Paivita(0.05, pitch); }

        [Testi] static void PiilossaOppiiEnsimmaisella()
        {
            var p = new Pressu();
            Aja(p, 1, 20); Oleta.Tosi(p.Kurkistaa && p.Silma > 0.99, $"kurkistus nostaa silmät ({p.Silma:F2})");
            Aja(p, 1, 0); Oleta.Tosi(!p.Kurkistaa && p.Silma < 0.71, "pää alas pressun alle");
            Aja(p, 5, 0); Oleta.Sama(PressuVaihe.Varoitus, p.Vaihe);
            Aja(p, 2, 0); Oleta.Sama(PressuVaihe.Valo, p.Vaihe);
            Aja(p, 2.5, 0); Oleta.Tosi(p.Vaihe == PressuVaihe.Opittu && p.Oppi && !p.Nahtiin, "piilossa: oppi");
        }

        [Testi] static void NahtyToistuuIlmanRangaistustaJaPaattyy()
        {
            var p = new Pressu();
            Aja(p, 7 + 2, 0); Aja(p, 1, 20);
            Oleta.Tosi(p.Nahtiin, "kurkistus valossa: nähtiin"); p.Nahtiin = false;
            Aja(p, 1.5, 20); Oleta.Tosi(p.Vaihe == PressuVaihe.Tauko && !p.Nahtiin, "tauko, yksi nähty-laukaisu per pyyhkäisy");
            Aja(p, 4 + 2 + 2.5, 0); Oleta.Tosi(p.Vaihe == PressuVaihe.Opittu && p.Oppi, "toinen yritys piilossa: oppi");
            var q = new Pressu();
            Aja(q, 7, 30); for (int i = 0; i < 3; i++) Aja(q, 2 + 2.5 + 4, 30);
            Oleta.Tosi(q.Vaihe == PressuVaihe.Opittu && !q.Oppi && q.Yritys == 3, $"3 yritystä kurkistaen → läpi ilman jumia ({q.Vaihe}, {q.Yritys})");
        }

        [Testi] static void VenePerillaLopettaa()
        {
            // LS2 8.10.: kurkistajan kolmas pyyhkäisy (24–28,5 s) osui laiturille; vene on perillä 22 s → Lopeta, ei enää "Hä?":tä.
            var p = new Pressu();
            Aja(p, 22, 30); p.Nahtiin = false;
            p.Lopeta();
            Aja(p, 8, 30);
            Oleta.Tosi(p.Vaihe == PressuVaihe.Opittu && !p.Nahtiin, $"perillä: oppitunti päättyi ({p.Vaihe}, nähtiin {p.Nahtiin})");
        }
    }
}
