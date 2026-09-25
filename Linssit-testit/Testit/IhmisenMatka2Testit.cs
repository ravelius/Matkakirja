using Matkakirja.Linssit.Aikajana;

namespace Matkakirja.Linssit.Testit
{
    /// <summary>Ihmisen matka II (omistaja 25.9.2026): oma tunnus ja muisti, omistus I:n kautta, portti kuten I:ssä.</summary>
    public static class IhmisenMatka2Testit
    {
        sealed class Koe : ILinssi
        {
            public LinssiTiedot Tiedot { get; }
            public bool Auki { get; private set; }
            public Koe(LinssiTiedot t) { Tiedot = t; }
            public void Avaa(ILinssiYmparisto y) { Auki = true; }
            public void Paivita() { }
            public void Sulje() { Auki = false; }
        }

        [Testi] static void OmaTunnusJaVierekkainValitsimessa()
        {
            var i = IhmisenMatkaLinssi.IhmisenMatkaTiedot;
            var ii = IhmisenMatkaLinssi.IhmisenMatka2Tiedot;
            Oleta.Sama("ihmisen-matka-2", ii.Id);
            Oleta.Tosi(ii.Id != i.Id, "oma tunnus = oma muisti");
            Oleta.Sama(i.Jarjestys + 1, ii.Jarjestys);
            Oleta.Tosi(IhmisenMatkaLinssi.OnIhmisenMatka(i.Id) && IhmisenMatkaLinssi.OnIhmisenMatka(ii.Id), "molemmat ovat ihmisen matka");
            Oleta.Tosi(!IhmisenMatkaLinssi.OnIhmisenMatka("keksinnot") && !IhmisenMatkaLinssi.OnIhmisenMatka(null), "muut eivät");
        }

        [Testi] static void OmistusSeuraaAlkuperaista()
        {
            bool kehittaja = Linssirekisteri.Kehittajatila;
            try
            {
                Linssirekisteri.Kehittajatila = false;
                var r = new Linssirekisteri(new ValeYmparisto());
                r.Lisaa(new Koe(IhmisenMatkaLinssi.IhmisenMatkaTiedot));
                r.Lisaa(new Koe(IhmisenMatkaLinssi.IhmisenMatka2Tiedot));
                Oleta.Tosi(!r.Saatavilla("ihmisen-matka-2"), "ei omistusta: ei saatavilla");
                r.Omistaa = id => id == "ihmisen-matka";
                Oleta.Tosi(r.Saatavilla("ihmisen-matka-2"), "I omistettu → II saatavilla");
                Oleta.Sama(2, r.Valittavat.Count);
                r.Omistaa = id => id == "ihmisen-matka-2";
                Oleta.Tosi(!r.Saatavilla("ihmisen-matka-2"), "omistus kysytään alkuperäiseltä");
            }
            finally { Linssirekisteri.Kehittajatila = kehittaja; }
        }

        [Testi] static void PorttiKutenI()
        {
            var r = new Linssirekisteri(new ValeYmparisto());
            r.Lisaa(new Koe(IhmisenMatkaLinssi.IhmisenMatka2Tiedot));
            bool kehittaja = Linssirekisteri.Kehittajatila;
            try
            {
                Linssirekisteri.Kehittajatila = true;
                r.Valitse("ihmisen-matka-2");
                Oleta.Tosi(r.EstaaKartan, "II estää kartan kuten I (web linssikarttaEstaa)");
            }
            finally { Linssirekisteri.Kehittajatila = kehittaja; }
        }
    }
}
