using System.Linq;

namespace Matkakirja.Linssit.Testit
{
    public static class TopografiaTestit
    {
        static (ValeYmparisto y, Linssirekisteri r, Topografia t) Luo()
        {
            var y = new ValeYmparisto();
            var r = new Linssirekisteri(y);
            var t = new Topografia();
            r.Lisaa(t);
            return (y, r, t);
        }

        [Testi] static void PeiteNouseeEnnenKerrosta()
        {
            var (y, r, _) = Luo();
            r.Valitse("topografia");
            Oleta.Sama("peite True", y.Loki[0], "peite ensimmäisenä, samassa kehyksessä");
            Oleta.Tosi(y.Loki.IndexOf("rasteri+ topografia") > 0);
            Oleta.Tosi(y.PeitePaalla);
        }

        [Testi] static void ReliefiKorvaaPohjan()
        {
            var (y, r, _) = Luo();
            r.Valitse("topografia");
            var ras = y.Vale.Rasterit["topografia"];
            Oleta.Sama(1f, ras.Alfa);
            Oleta.Sama(Projektio.WebMercator, ras.Projektio);
            Oleta.Sama(8, ras.MaxTaso);
            Oleta.Sama(false, y.Vale.Nakyvat["pohja"]);
        }

        [Testi] static void PelikerroksetPiiloonVastaPeitteenAlla()
        {
            var (y, r, _) = Luo();
            r.Valitse("topografia");
            r.Paivita();
            Oleta.Tosi(y.PelikerroksetNakyvissa, "ei vielä: peite ei ole ehtinyt ruudulle");
            y.Kello = Topografia.PortinViive;
            r.Paivita();
            Oleta.Sama(false, y.PelikerroksetNakyvissa);
        }

        [Testi] static void PeitePysyyKunnesReliefiOnRuudulla()
        {
            var (y, r, t) = Luo();
            r.Valitse("topografia");
            y.Kello = 3; r.Paivita();
            Oleta.Tosi(y.PeitePaalla, "latautuu → peite pysyy");
            y.Vale.Tilat["topografia"] = KerrosTila.Valmis;
            y.Kello = 3.5; r.Paivita();
            Oleta.Sama(false, y.PeitePaalla);
            Oleta.Sama("valmis", t.Peite.Syy);
            Oleta.Sama(3.5, t.Peite.Kesti.Value);
        }

        [Testi] static void KerrosLuovuttaaPeiteHetiJaPohjaPalaa()
        {
            var (y, r, t) = Luo();
            r.Valitse("topografia");
            y.Vale.Tilat["topografia"] = KerrosTila.Luovutti;
            y.Kello = 0.5; r.Paivita();
            Oleta.Sama(false, y.PeitePaalla);
            Oleta.Sama("luovutti", t.Peite.Syy);
            Oleta.Sama(true, y.Vale.Nakyvat["pohja"], "pelaaja näkee oman karttansa");
        }

        [Testi] static void PeiteLaskeeKatossa()
        {
            var (y, r, t) = Luo();
            r.Valitse("topografia");
            y.Kello = Odotuspeite.Katto - 0.01; r.Paivita();
            Oleta.Tosi(y.PeitePaalla);
            y.Kello = Odotuspeite.Katto; r.Paivita();
            Oleta.Sama(false, y.PeitePaalla);
            Oleta.Sama("katto", t.Peite.Syy);
        }

        [Testi] static void SulkeminenPalauttaaKaiken()
        {
            var (y, r, _) = Luo();
            var alku = y.Asento;
            r.Valitse("topografia");
            y.Kello = 1; r.Paivita();
            y.Asento = new Nakyma(27.99, 86.93, 50_000);   // pelaaja zoomasi Everestille
            r.Sulje();
            Oleta.Sama(false, y.PeitePaalla);
            Oleta.Tosi(!y.Vale.Rasterit.ContainsKey("topografia"));
            Oleta.Sama(true, y.Vale.Nakyvat["pohja"]);
            Oleta.Sama(true, y.PelikerroksetNakyvissa);
            Oleta.Sama(null, y.Katto);
            Oleta.Sama(false, y.Musiikkipito);
            Oleta.Sama(alku.Lat, y.Ajo.Value.Lat);
            Oleta.Sama(Topografia.PaluuAjo, y.AjonKesto);
        }

        [Testi] static void SulkeminenPeitteenAikanaEiKoskePorttiin()
        {
            var (y, r, _) = Luo();
            r.Valitse("topografia");
            r.Sulje();   // ennen PortinViivettä
            Oleta.Tosi(!y.Loki.Any(l => l.StartsWith("pelikerrokset")), "porttia ei asetettu eikä palautettu");
            Oleta.Sama(false, y.PeitePaalla);
            Oleta.Sama(1, y.Loki.Count(l => l == "peite False"));
        }

        [Testi] static void VahennettyLiikeHyppaa()
        {
            var (y, r, _) = Luo();
            y.Vahennetty = true;
            r.Valitse("topografia");
            r.Sulje();
            Oleta.Sama(0f, y.AjonKesto);
        }

        [Testi] static void ZoomiKattoKokoPalloon()
        {
            var (y, r, _) = Luo();
            r.Valitse("topografia");
            Oleta.Sama((double?)y.KokoPallonKorkeus, y.Katto);
        }

        [Testi] static void SelitteessaYhdeksanRiviaJaLahde()
        {
            var t = Topografia.TopografiaTiedot;
            Oleta.Sama(9, t.Selite.Count);
            Oleta.Tosi(t.Selite.All(s => s.Vari.Length == 7 && s.Vari[0] == '#'));
            Oleta.Tosi(t.Lahde.Lisenssi.Contains("Public domain"));
            Oleta.Sama(10, t.Jarjestys);
        }
    }

    public static class RekisteriTestit
    {
        sealed class Koe : ILinssi
        {
            public LinssiTiedot Tiedot { get; }
            public bool Auki { get; private set; }
            public int Avauksia, Sulkuja;
            public Koe(string id, int j) { Tiedot = new LinssiTiedot { Id = id, Jarjestys = j }; }
            public void Avaa(ILinssiYmparisto y) { Auki = true; Avauksia++; }
            public void Paivita() { }
            public void Sulje() { Auki = false; Sulkuja++; }
        }

        [Testi] static void JarjestysValitsimessa()
        {
            var r = new Linssirekisteri(new ValeYmparisto());
            r.Lisaa(new Koe("vesistot", 20));
            r.Lisaa(new Koe("topografia", 10));
            r.Lisaa(new Koe("aa", 20));
            Oleta.Sama("topografia,aa,vesistot", string.Join(",", r.Kaikki.Select(l => l.Tiedot.Id)));
        }

        [Testi] static void YksiAukiKerrallaan()
        {
            var r = new Linssirekisteri(new ValeYmparisto());
            var a = new Koe("a", 1); var b = new Koe("b", 2);
            r.Lisaa(a); r.Lisaa(b);
            r.Valitse("a");
            r.Valitse("b");
            Oleta.Sama(1, a.Sulkuja);
            Oleta.Tosi(b.Auki && !a.Auki);
            Oleta.Sama(b, (Koe)r.Auki);
        }

        [Testi] static void SamaValintaSulkee()
        {
            var r = new Linssirekisteri(new ValeYmparisto());
            var a = new Koe("a", 1);
            r.Lisaa(a);
            ILinssi viimeisin = a;
            r.Vaihtui += l => viimeisin = l;
            Oleta.Tosi(r.Valitse("a"));
            Oleta.Sama(false, r.Valitse("a"));
            Oleta.Sama(null, viimeisin);
            Oleta.Sama(null, r.Auki);
        }

        [Testi] static void OmistamatonEiAukea()
        {
            var r = new Linssirekisteri(new ValeYmparisto()) { Saatavilla = id => id != "b" };
            var a = new Koe("a", 1); var b = new Koe("b", 2);
            r.Lisaa(a); r.Lisaa(b);
            Oleta.Sama("a", string.Join(",", r.Valittavat.Select(l => l.Tiedot.Id)));
            Oleta.Sama(false, r.Valitse("b"));
            Oleta.Sama(0, b.Avauksia);
        }

        [Testi] static void KaksoistunnusHeittaa()
        {
            var r = new Linssirekisteri(new ValeYmparisto());
            r.Lisaa(new Koe("a", 1));
            Oleta.Heittaa<System.ArgumentException>(() => r.Lisaa(new Koe("a", 2)));
        }
    }
}
