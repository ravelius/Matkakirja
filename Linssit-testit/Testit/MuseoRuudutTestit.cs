// Taidemuseon kuvapyramidi, ruutuvalinta, LRU-paikat ja muistibudjetti (PT 10.10.2026, suunnitelma luvut 5 ja 6.4).
using System.Collections.Generic;

namespace Matkakirja.Linssit.Testit
{
    public static class MuseoRuudutTestit
    {
        [Testi] static void PyramidiIsostaMaalauksesta()
        {
            var p = new TeosPyramidi("iso", 15000, 9000);
            Oleta.Sama(5, p.Zmax, "512·2^5 = 16384 ≥ 15000");
            Oleta.Sama(15000, p.LeveysTasolla(5));
            Oleta.Sama(7500, p.LeveysTasolla(4));
            Oleta.Sama(2, p.ZSeina, "taso 2 = 1875 px ≤ 2048");
            Oleta.Sama(1875, p.SeinaLeveys());
            Oleta.Sama(938, p.SeinaLeveys(1), "4 Gt:n laite: yksi mip pois");
            Oleta.Sama(30, p.Sarakkeita(5));
            Oleta.Sama(18, p.Riveja(5));
            Oleta.Tosi(p.OnYksityiskohtaa);
        }

        [Testi] static void PieniKuvaOnPelkkaSeinataso()
        {
            var p = new TeosPyramidi("pieni", 1800, 1200);
            Oleta.Sama(p.Zmax, p.ZSeina);
            Oleta.Tosi(!p.OnYksityiskohtaa);
            Oleta.Sama(0, RuutuValinta.Ruudut(p, 5000, 0, 0, 1, 1, 64).Count, "lähikuvassakin seinätaso");
        }

        [Testi] static void KaukaaSeinatasoLahelta5000px()
        {
            var p = new TeosPyramidi("iso", 15000, 9000);
            Oleta.Sama(p.ZSeina, RuutuValinta.Taso(p, 1200), "koko teos 1200 px:n alueella");
            Oleta.Sama(0, RuutuValinta.Ruudut(p, 1200, 0, 0, 1, 1, 64).Count);
            Oleta.Sama(3, RuutuValinta.Taso(p, 3000), "3750 ≥ 3000");
            Oleta.Sama(5, RuutuValinta.Taso(p, 40000), "katto Zmax");
        }

        [Testi] static void NakyvaAlueRajaaRuudut()
        {
            var p = new TeosPyramidi("iso", 15000, 9000);
            // Ken Burns -lähikuva: teoksen leveys 12 000 näytön px, näkyvissä kymmenesosa leveydestä ja kuudesosa korkeudesta.
            var r = RuutuValinta.Ruudut(p, 12000, 0.45, 0.40, 0.55, 0.5667, 64);
            Oleta.Tosi(r.Count > 0 && r.Count <= 64, "ruutuja " + r.Count);
            Oleta.Sama(5, r[0].Z, "täysi tarkkuus");
            foreach (var a in r) Oleta.Tosi(a.X >= 13 && a.X <= 16 && a.Y >= 7 && a.Y <= 10, "alueen sisällä " + a);
            Oleta.Sama("yks/5/" + r[0].X + "_" + r[0].Y + ".astc", r[0].Polku);
        }

        [Testi] static void LiianMontaRuutuaPudottaaTasoa()
        {
            var p = new TeosPyramidi("iso", 15000, 9000);
            var koko = RuutuValinta.Ruudut(p, 40000, 0, 0, 1, 1, 64);   // koko teos täydellä tarkkuudella = 540 ruutua
            Oleta.Tosi(koko.Count <= 64 && koko.Count > 0, "mahtuu 64:ään: " + koko.Count);
            Oleta.Sama(3, koko[0].Z, "taso 3: 8 × 5 = 40 ruutua");
            Oleta.Sama(0, RuutuValinta.Ruudut(p, 40000, 0, 0, 1, 1, 0).Count, "MUISTIHÄTÄ: ei paikkoja");
        }

        [Testi] static void KeskimmainenRuutuEnsin()
        {
            var p = new TeosPyramidi("iso", 15000, 9000);
            var r = RuutuValinta.Ruudut(p, 12000, 0.40, 0.40, 0.60, 0.60, 64);
            double cx = 0, cy = 0; foreach (var a in r) { cx += a.X; cy += a.Y; } cx /= r.Count; cy /= r.Count;
            var e = r[0]; var v = r[r.Count - 1];
            Oleta.Tosi((e.X - cx) * (e.X - cx) + (e.Y - cy) * (e.Y - cy) <= (v.X - cx) * (v.X - cx) + (v.Y - cy) * (v.Y - cy), "keskeltä ulos");
        }

        [Testi] static void VarastoHaataaVanhimmanMuttaEiNakyvaa()
        {
            var v = new RuutuVarasto(2);
            RuutuAvain A = new RuutuAvain("t", 3, 0, 0), B = new RuutuAvain("t", 3, 1, 0), C = new RuutuAvain("t", 3, 2, 0);
            Oleta.Sama(2, v.Pyyda(new[] { A, B }).Count);
            Oleta.Tosi(v.Lisaa(A, out _) >= 0 && v.Lisaa(B, out _) >= 0);
            Oleta.Sama(-1, v.Lisaa(C, out _), "A ja B näkyvissä → C ei mahdu");
            var puuttuu = v.Pyyda(new[] { B, C });
            Oleta.Sama(1, puuttuu.Count); Oleta.Tosi(puuttuu[0].Equals(C));
            int i = v.Lisaa(C, out var pois);
            Oleta.Tosi(i >= 0 && pois.HasValue && pois.Value.Equals(A), "A häädettiin");
            Oleta.Tosi(v.Onko(B, out _) && v.Onko(C, out _) && !v.Onko(A, out _));
        }

        [Testi] static void VarastonPienennysHatatilassa()
        {
            var v = new RuutuVarasto(4);
            var k = new List<RuutuAvain>();
            for (int x = 0; x < 4; x++) k.Add(new RuutuAvain("t", 4, x, 0));
            v.Pyyda(k); foreach (var a in k) v.Lisaa(a, out _);
            Oleta.Sama(4, v.Muuta(0).Count, "kaikki pois");
            Oleta.Sama(0, v.Kaytossa);
            v.Muuta(2);
            v.Pyyda(k);
            Oleta.Tosi(v.Lisaa(k[0], out _) >= 0 && v.Lisaa(k[1], out _) >= 0);
            Oleta.Sama(-1, v.Lisaa(k[2], out _));
        }

        [Testi] static void AstcKokoJaBudjetti()
        {
            Oleta.Sama(86L * 86 * 16, MuseoMuisti.AstcTavut(512, 512, 6, false), "512² 6×6 = 86 × 86 lohkoa");
            var p = new TeosPyramidi("iso", 15000, 9000);
            long s = MuseoMuisti.SeinaTavut(p);
            Oleta.Tosi(s > 1_200_000 && s < 1_300_000, "seinätaso 1875 × 1125: 313 × 188 lohkoa × 16 t × 4/3 ≈ 1,26 Mt: " + s);
            var b = MuseoBudjetti.Laitteelle(8);
            Oleta.Sama(0, b.SeinaOhita); Oleta.Sama(64, b.RuutuPaikat);
            Oleta.Tosi(64 * MuseoMuisti.RuutuTavut <= MuseoBudjetti.RuudutTavut, "64 ruutua ≤ 40 Mt");
            var pieni = MuseoBudjetti.Laitteelle(4);
            Oleta.Sama(1, pieni.SeinaOhita); Oleta.Sama(16, pieni.RuutuPaikat);
            Oleta.Sama(0, MuseoBudjetti.Laitteelle(8, 1).RuutuPaikat, "MUISTIHÄTÄ");
            Oleta.Sama(1, MuseoBudjetti.Laitteelle(8, 2).SeinaOhita, "vakava hätä");
            var teokset = new List<TeosPyramidi>();
            for (int i = 0; i < 60; i++) teokset.Add(new TeosPyramidi("t" + i, 4000, 3000));
            int n = b.SeiniaMahtuu(teokset);
            Oleta.Tosi(n >= 30 && n < 60, "30 teoksen sali mahtuu 60 Mt:iin: " + n);
            Oleta.Tosi(MuseoBudjetti.Yhteensa == 160L << 20);
        }

        [Testi] static void EsilatausKolmeEteenpain()
        {
            var j = new[] { "a", "b", "c", "d", "e", "f" };
            Oleta.Sama("c,d,e,f", string.Join(",", MuseoEsilataus.Seinat(j, 2)));
            Oleta.Sama("e,f", string.Join(",", MuseoEsilataus.Seinat(j, 4)));
        }
    }
}
