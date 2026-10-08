// Kuvanosto (omistaja TF 168, 9.10.2026): pieni reunalla, iso hieman nykyistä korttia suurempi; peitto ≤ 45 %, ruudun sisällä.
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KuvanostoAsetteluTestit
    {
        static readonly (string Nimi, float W, float H)[] Ruudut =
        {
            ("iPhone pysty", 393, 852), ("iPhone vaaka", 852, 393), ("iPad pysty", 820, 1180), ("iPad vaaka", 1180, 820), ("SE", 375, 667),
        };

        [Testi] static void PieniOikeassaReunassaYlanappienAllaJaPieni()
        {
            foreach (var (n, w, h) in Ruudut)
                foreach (float s in new[] { 0.8f, 1.0f, 1.5f })
                {
                    var p = KuvanostoAsettelu.Pieni(w, h, s);
                    Oleta.Tosi(p.X + p.Lev <= w - KuvanostoAsettelu.Reuna + 0.01f && p.X >= w / 2f, $"{n} {s}: oikeassa puoliskossa reunassa {p}");
                    Oleta.Tosi(p.Y >= KuvanostoAsettelu.YlaRaja && p.Y + p.Kork <= h * 0.7f, $"{n} {s}: ylänappien alla, ei alarivin päällä {p}");
                    Oleta.Tosi(p.Ala / (w * h) <= 0.12f, $"{n} {s}: pieni peitto {p.Ala / (w * h):P0}");
                }
        }

        [Testi] static void IsoNykyistaSuurempiJaPeittoEnintaan45()
        {
            foreach (var (n, w, h) in Ruudut)
                foreach (float s in new[] { 0.8f, 1.0f, 1.5f })
                {
                    var i = KuvanostoAsettelu.Iso(w, h, s, 40f);
                    var p = KuvanostoAsettelu.Pieni(w, h, s);
                    Oleta.Tosi(i.Lev > p.Lev * 1.3f, $"{n} {s}: iso selvästi pientä suurempi {i} vs {p}");
                    Oleta.Tosi(i.X >= 0 && i.Y >= 0 && i.X + i.Lev <= w && i.Y + i.Kork + 40f <= h, $"{n} {s}: ruudun sisällä {i}");
                    Oleta.Tosi((i.Ala + i.Lev * 40f) / (w * h) <= 0.45f, $"{n} {s}: peitto {(i.Ala + i.Lev * 40f) / (w * h):P0} ≤ 45 %");
                    if (w < h) Oleta.Tosi(i.Lev >= KorttiAsettelu.LeveysOsuus * w - 0.5f || i.Kork >= KuvanostoAsettelu.IsoKorkPysty * h - 40.5f,
                        $"{n} {s}: vähintään nykyisen kortin leveys (tai korkeusraja)");
                }
        }
    }
}
