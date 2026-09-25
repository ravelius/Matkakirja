// Radiomastojen puhtaat osat (Assets/Matkakirja/Kartta/MastoGeometria.cs): verkkojen koko ja mitat
// havainnekuvan mastot.js:n mukaan, horisonttikarsinta, napautuksen osuma, valon mittakaava, maavalo ja hämärä.
using System;
using System.Linq;
using Num = System.Numerics;

namespace Matkakirja.Kartta.Testit
{
    static class MastoGeometriaTestit
    {
        static void Verkko(int koko, int vahintaan, int enintaan, float leveys)
        {
            var m = MastoGeometria.Verkko(koko);
            Oleta.Tosi(m.Kolmioita >= vahintaan && m.Kolmioita <= enintaan, $"koko {koko}: {m.Kolmioita} kolmiota");
            Oleta.Sama(m.Paikat.Count, m.Normaalit.Count, "normaaleja");
            Oleta.Sama(m.Paikat.Count, m.Varit.Count, "värejä");
            Oleta.Sama(m.Paikat.Count, m.Viivat.Count, "viivatietoja");
            Oleta.Sama(m.Paikat.Count, m.Alut.Count, "alkuja");
            Oleta.Sama(m.Paikat.Count, m.Loput.Count, "loppuja");
            // Jokaisessa mastossa on ruudun pisteinä piirrettäviä viivoja (vähintään antenni), leveys 0,4…2 pt.
            Oleta.Tosi(m.Viivat.Any(v => v.Y > 0), "viivoja");
            Oleta.Tosi(m.Viivat.Where(v => v.Y > 0).All(v => v.Y >= 0.4f && v.Y <= 2f && Math.Abs(Math.Abs(v.X) - 1) < 1e-6), "viivan leveys ja puoli");
            Oleta.Tosi(m.Kolmiot.All(i => i >= 0 && i < m.Paikat.Count), "indeksit");
            Oleta.Tosi(m.Normaalit.All(n => Math.Abs(n.Length() - 1) < 1e-3), "yksikkönormaalit");
            float ala = m.Paikat.Min(p => p.Y), yla = m.Paikat.Max(p => p.Y);
            Oleta.Tosi(Math.Abs(yla - 1) < 1e-4, $"huippu {yla}");
            Oleta.Tosi(ala > -0.03f && ala < 0.02f, $"juuri {ala}");
            float sivu = m.Paikat.Max(p => Math.Max(Math.Abs(p.X), Math.Abs(p.Z)));
            Oleta.Tosi(sivu <= leveys + 0.02f && sivu >= leveys * 0.5f, $"koko {koko}: sivulle {sivu}, odotettu ≈ {leveys}");
        }

        [Testi] static void IsoOnHarustettuRistikko() => Verkko(2, 240, 320, 0.42f * 0.95f);
        [Testi] static void KeskiOnKapenevaTorni() => Verkko(1, 180, 260, 0.13f);
        [Testi] static void PieniOnPutki() => Verkko(0, 30, 90, 0.11f);

        [Testi]
        static void IsollaRistikkoJaHarukset()
        {
            var m = MastoGeometria.Iso();
            int viivoja = m.Viivat.Count(v => v.Y > 0) / 4;
            // 3 tolppaa + 12 kenttää × 3 kylkeä × 3 sauvaa + antenni + 9 harusta.
            Oleta.Sama(3 + 12 * 3 * 3 + 1 + 9, viivoja);
            Oleta.Sama(9, m.Viivat.Where((v, i) => v.Y == 0.5f).Count() / 4, "harukset");
        }

        [Testi]
        static void KorkeusRuudulle()
        {
            // 40°:n viitekulmassa lyheneminen korvataan täsmälleen: 64 px, kun kohtisuora mittakaava on 0,001 px/m.
            float s40 = (float)Math.Sin(40 * Math.PI / 180);
            float h = MastoGeometria.KorkeusRuudulle(64, 0.001f * s40, s40);
            Oleta.Tosi(Math.Abs(h * 0.001f * s40 - 64) < 0.01f, $"40°: {h}");
            // Sivulta (90°) sama ruutukorkeus; ylhäältä (10°) lyhyempi kuin 64 px.
            float h90 = MastoGeometria.KorkeusRuudulle(64, 0.001f, 1);
            Oleta.Tosi(Math.Abs(h90 * 0.001f - 64) < 0.01f, "90°");
            float s10 = (float)Math.Sin(10 * Math.PI / 180);
            float h10 = MastoGeometria.KorkeusRuudulle(64, 0.001f * s10, s10);
            Oleta.Tosi(h10 * 0.001f * s10 < 20, "10° lyhyt");
            Oleta.Sama(0f, MastoGeometria.KorkeusRuudulle(64, 0, 1));
            Oleta.Tosi(Math.Abs(MastoGeometria.Kasvu(2_600_000) - 1) < 1e-5 && MastoGeometria.Kasvu(500_000) > 1.2f, "kasvu");
        }

        [Testi]
        static void KeskiKapenee()
        {
            // Keskin ristikko kapenee: yläpään (y = 0,9) kärjet ovat lähempänä akselia kuin alaosan.
            var m = MastoGeometria.Keski();
            float Sade(Num.Vector3 p) => (float)Math.Sqrt(p.X * p.X + p.Z * p.Z);
            float ala = m.Paikat.Where(p => p.Y < 0.05f).Max(Sade), yla = m.Paikat.Where(p => p.Y > 0.89f && p.Y < 0.91f).Max(Sade);
            Oleta.Tosi(ala > 0.15f && yla < 0.06f, $"ala {ala}, ylä {yla}");
        }

        [Testi]
        static void PallonTakanaKarsitaan()
        {
            var o = Num.Vector3.Zero;
            const float R = 6_371_000f;
            var kamera = new Num.Vector3(0, 0, 3 * R);
            Oleta.Tosi(!MastoGeometria.PallonTakana(kamera, new Num.Vector3(0, 0, R), o, R - 500), "lähin piste näkyy");
            Oleta.Tosi(MastoGeometria.PallonTakana(kamera, new Num.Vector3(0, 0, -R), o, R - 500), "takapuoli karsitaan");
            // Horisontin takana (kulma > acos(1/3) ≈ 70,5°) pinnalla: piilossa; sama kohta 1 000 km korkealla: näkyy.
            double k = 80 * Math.PI / 180;
            var pinta = new Num.Vector3((float)(R * Math.Sin(k)), 0, (float)(R * Math.Cos(k)));
            Oleta.Tosi(MastoGeometria.PallonTakana(kamera, pinta, o, R - 500), "horisontin takana");
            Oleta.Tosi(!MastoGeometria.PallonTakana(kamera, pinta * ((R + 1_000_000f) / R), o, R - 500), "korkea huippu näkyy");
        }

        [Testi]
        static void OsumaMastonPuolivalissa()
        {
            var xs = new[] { 100f, 160f, 400f };
            var ys = new[] { 200f, 200f, 50f };
            Oleta.Sama(0, MastoGeometria.Osuma(xs, ys, 3, 110, 210, 66));
            Oleta.Sama(1, MastoGeometria.Osuma(xs, ys, 3, 140, 200, 66), "lähempi voittaa");
            Oleta.Sama(-1, MastoGeometria.Osuma(xs, ys, 3, 300, 300, 66));
            Oleta.Sama(-1, MastoGeometria.Osuma(xs, ys, 2, 400, 50, 66), "maara rajaa");
            // Neliö eikä ympyrä: kulma (65, 65) osuu.
            Oleta.Sama(0, MastoGeometria.Osuma(xs, ys, 1, 165, 265, 66));
        }

        [Testi]
        static void ValonMittakaava()
        {
            Oleta.Tosi(Math.Abs(MastoGeometria.ValonMittakaava(2_600_000) - 1) < 1e-4, "viitekorkeus");
            Oleta.Tosi(MastoGeometria.ValonMittakaava(500_000) > 1.2f, "lähellä suurempi");
            Oleta.Sama(1.6f, MastoGeometria.ValonMittakaava(1_000));
            Oleta.Sama(0.7f, MastoGeometria.ValonMittakaava(5e8));
        }

        [Testi]
        static void MaavalonSade()
        {
            Oleta.Sama(110_000f, MastoGeometria.MaavalonSadeM(0));
            Oleta.Sama(140_000f, MastoGeometria.MaavalonSadeM(1));
            Oleta.Sama(140_000f, MastoGeometria.MaavalonSadeM(3), "rajattu");
        }

        [Testi]
        static void HamaraKaava()
        {
            Oleta.Sama(0.5f, MastoGeometria.Hamara(0.5f, 0, 0));
            Oleta.Tosi(Math.Abs(MastoGeometria.Hamara(0.5f, 2, 1) - (0.5f * 0.24f + 0.016f)) < 1e-6, "sininen h = 1");
            // Sama kerroin viivalle ja paperille: suhde säilyy (lisäystä lukuun ottamatta).
            float viiva = MastoGeometria.Hamara(0.1f, 0, 1), paperi = MastoGeometria.Hamara(0.8f, 0, 1);
            Oleta.Tosi(paperi / viiva > 5, $"kontrasti {paperi / viiva}");
            Oleta.Tosi(Math.Abs(MastoGeometria.Lineaarinen(1) - 1) < 1e-5 && MastoGeometria.Lineaarinen(0.5f) < 0.22f, "sRGB → lineaarinen");
        }
    }
}
