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

        [Testi] static void KertomuskuvaLisakuvienKokoisenaJaVasemmalla()
        {
            // Omistaja 10.10. 19.0x: kertomuskuvat lisäkuvien (kuvanappi 40 / 56 pt) kokoisina niiden vasemmalle puolelle.
            foreach (var (n, w, h) in Ruudut)
                foreach (float s in new[] { 0.5f, 1.0f, 2.0f })
                {
                    float koko = w > 700 && h > 700 ? 56f : 40f, oikea = 20f, ala = 90f, rako = 8f;
                    var k = KuvanostoAsettelu.Kulmaan(w, h, s, koko, oikea, ala, rako);
                    Oleta.Tosi(k.Kork == koko && k.Lev <= koko * KuvanostoAsettelu.SuhdeMax + 0.01f, $"{n} {s}: napin korkuinen {k}");
                    Oleta.Tosi(System.Math.Abs(k.X + k.Lev - (w - oikea - koko - rako)) < 0.01f, $"{n} {s}: napin vasemmalla raon päässä {k}");
                    Oleta.Tosi(System.Math.Abs(k.Y + k.Kork - (h - ala)) < 0.01f, $"{n} {s}: alareuna napin linjassa {k}");
                    Oleta.Tosi(k.X >= 0 && k.Ala / (w * h) <= 0.02f, $"{n} {s}: ruudulla ja pieni {k.Ala / (w * h):P1}");
                    var p = KuvanostoAsettelu.Kulmaan(w, h, s, koko, oikea, ala, rako, vieressa: false);
                    Oleta.Tosi(System.Math.Abs(p.X + p.Lev - (w - oikea)) < 0.01f, $"{n} {s}: ilman nappia sen paikalla {p}");
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
