using System.Collections.Generic;
using Matkakirja.Linssit.Vuosi;

namespace Matkakirja.Linssit.Testit
{
    public static class MaapallonVuosiTestit
    {
        sealed class ValeKuori : IVuosiKuori
        {
            public readonly HashSet<string> Ladatut = new HashSet<string>(), Luovutetut = new HashSet<string>(), Pyydetyt = new HashSet<string>();
            public readonly List<string> Esiladatut = new List<string>();
            public bool Nakyvissa;
            public (string a, string b, float t, string k1, float a1, string k2, float a2) Viimeisin;
            public void Nayta(bool n) => Nakyvissa = n;
            public bool Valmis(string o) { if (o != null) Pyydetyt.Add(o); return o != null && Ladatut.Contains(o); }
            public bool Epaonnistui(string o) => o != null && Luovutetut.Contains(o);
            public void Esilataa(string o) => Esiladatut.Add(o);
            public void Aseta(string a, string b, float t, string k1, float a1, string k2, float a2) => Viimeisin = (a, b, t, k1, a1, k2, a2);
        }

        const string Luettelo = "{\"kerrokset\":[{\"tunnus\":\"lumi\",\"nimi\":\"Lumipeite\",\"lahde\":\"NASA MODIS\",\"lisenssi\":\"public domain (NASA)\","
            + "\"osoite\":\"data/maapallon-vuosi/lumi/{kk}.png\"},{\"tunnus\":\"sade\",\"nimi\":\"Sademäärä\",\"osoite\":\"data/maapallon-vuosi/sade/{kk}.png\"},"
            + "{\"tunnus\":\"rikki\",\"nimi\":\"Ei kk:ta\",\"osoite\":\"x.png\"},{\"nimi\":\"ei tunnusta\",\"osoite\":\"{kk}.png\"}]}";

        static string Pohja(int kk) => MaapallonVuosiLinssi.KuukaudenPohja(kk);
        static string Lumi(int kk) => "https://media.matkakirja.app/data/maapallon-vuosi/lumi/" + kk.ToString("00") + ".png";

        static (ValeYmparisto y, Linssirekisteri r, MaapallonVuosiLinssi l, ValeKuori k) Luo(int kk = 3)
        {
            var y = new ValeYmparisto();
            var r = new Linssirekisteri(y) { Omistaa = _ => true };
            var k = new ValeKuori();
            var l = new MaapallonVuosiLinssi(k) { AloitusKk = kk };
            l.AsetaKerrokset(MaapallonVuosiLinssi.LueKerrosluettelo(Matkakirja.Peli.MiniJson.Jasenna(Luettelo)));
            r.Lisaa(l);
            return (y, r, l, k);
        }

        [Testi] static void OsoitteetKutenWebissa()
        {
            Oleta.Sama("https://media.matkakirja.app/data/bmng/01-4096.jpg", Pohja(13));
            Oleta.Sama("https://media.matkakirja.app/data/bmng/12-4096.jpg", Pohja(0));
            var ohi = new List<string>();
            var kerrokset = MaapallonVuosiLinssi.LueKerrosluettelo(Matkakirja.Peli.MiniJson.Jasenna(Luettelo), ohi);
            Oleta.Sama(2, kerrokset.Count);
            Oleta.Sama("rikki,?", string.Join(",", ohi));
            Oleta.Sama(Lumi(7), MaapallonVuosiLinssi.KerroksenKuva(kerrokset[0], 7));
            var abs = new VuosiKerros { Osoite = "file:///tmp/lumi/{kk}.png" };
            Oleta.Sama("file:///tmp/lumi/02.png", MaapallonVuosiLinssi.KerroksenKuva(abs, 14));
        }

        [Testi] static void AvausPeitteenAllaJaKokoPallo()
        {
            var (y, r, l, k) = Luo();
            r.Valitse(MaapallonVuosiLinssi.Id);
            Oleta.Sama("peite True", y.Loki[0]);
            Oleta.Tosi(!y.PelikerroksetNakyvissa);
            Oleta.Sama(y.KokoPallonKorkeus, y.Ajo.Value.Korkeus);
            Oleta.Sama(30.0, y.Ajo.Value.Lat);
            r.Paivita();
            Oleta.Tosi(y.PeitePaalla, "pohja ei ole ladattu");
            Oleta.Tosi(!k.Nakyvissa);
            k.Ladatut.Add(Pohja(3));
            y.Kello = 1; r.Paivita();
            Oleta.Tosi(!y.PeitePaalla);
            Oleta.Tosi(k.Nakyvissa);
            Oleta.Sama(Pohja(3), k.Viimeisin.a);
            Oleta.Sama(null, k.Viimeisin.b);
            Oleta.Tosi(k.Esiladatut.Contains(Pohja(4)), "seuraava kuukausi esiladataan");
        }

        [Testi] static void PeiteLaskeeKatonJalkeenVaikkaPohjaEiTule()
        {
            var (y, r, _, k) = Luo();
            r.Valitse(MaapallonVuosiLinssi.Id);
            y.Kello = MaapallonVuosiLinssi.PeitteenKatto; r.Paivita();
            Oleta.Tosi(!y.PeitePaalla);
            Oleta.Tosi(k.Nakyvissa);
        }

        [Testi] static void KuukausiHaivyttyyVastaKunKuvaOnLadattu()
        {
            var (y, r, l, k) = Luo();
            k.Ladatut.Add(Pohja(3));
            r.Valitse(MaapallonVuosiLinssi.Id);
            r.Paivita();
            l.AsetaKuukausi(4);
            y.Kello = 2; r.Paivita();
            Oleta.Sama(Pohja(4), k.Viimeisin.b);
            Oleta.Sama(0f, k.Viimeisin.t, "B ei ladattu: kello ei käy");
            k.Ladatut.Add(Pohja(4));
            y.Kello = 3; r.Paivita();
            Oleta.Sama(0f, k.Viimeisin.t, "kello alkaa tästä kehyksestä");
            y.Kello = 3 + MaapallonVuosiLinssi.HaivytysS / 2; r.Paivita();
            Oleta.Tosi(System.Math.Abs(k.Viimeisin.t - 0.5f) < 1e-4, "smoothstep puolivälissä 0,5: " + k.Viimeisin.t);
            y.Kello = 4; r.Paivita();
            Oleta.Sama(Pohja(4), k.Viimeisin.a);
            Oleta.Sama(null, k.Viimeisin.b);
            Oleta.Sama("huhtikuu", l.KuukaudenNimi);
        }

        [Testi] static void VahennettyLiikeVaihtaaSuoraan()
        {
            var (y, r, l, k) = Luo();
            y.Vahennetty = true;
            k.Ladatut.Add(Pohja(3)); k.Ladatut.Add(Pohja(4));
            r.Valitse(MaapallonVuosiLinssi.Id);
            Oleta.Sama(0f, y.AjonKesto);
            l.AsetaKuukausi(4);
            r.Paivita();
            Oleta.Sama(Pohja(4), k.Viimeisin.a);
            Oleta.Sama(null, k.Viimeisin.b);
        }

        [Testi] static void KeskenTullutUusiKuukausiLahteeNakyvasta()
        {
            var h = new Haivytin();
            h.Nollaa("a");
            h.Aseta("b");
            h.Paivita(0, _ => true, 1);
            h.Paivita(0.2, _ => true, 1);   // T < 0,5: ruudulla pääosin a
            h.Aseta("c");
            Oleta.Sama("a", h.Nykyinen);
            Oleta.Sama("c", h.Tuleva);
            h.Paivita(1, _ => true, 1);
            h.Paivita(1.8, _ => true, 1);   // T > 0,5: ruudulla pääosin c
            h.Aseta("d");
            Oleta.Sama("c", h.Nykyinen);
            Oleta.Sama(0f, h.T);
        }

        [Testi] static void KerrosHaivyttyyPeitonPainolla()
        {
            var (y, r, l, k) = Luo();
            k.Ladatut.Add(Pohja(3));
            r.Valitse(MaapallonVuosiLinssi.Id);
            r.Paivita();
            l.AsetaKerros("lumi");
            k.Ladatut.Add(Lumi(3));
            y.Kello = 1; r.Paivita();
            y.Kello = 2; r.Paivita();
            Oleta.Sama(Lumi(3), k.Viimeisin.k1);
            Oleta.Sama(MaapallonVuosiLinssi.OletusPeitto, k.Viimeisin.a1);
            Oleta.Sama(0f, k.Viimeisin.a2);
            l.AsetaPeitto(0.4);
            r.Paivita();
            Oleta.Sama(0.4f, k.Viimeisin.a1);
            Oleta.Tosi(l.LahdeRivi.Contains("Lumipeite: NASA MODIS (public domain (NASA))"), l.LahdeRivi);
            // Kuukausi vaihtuu: vanha kerros himmenee ja uusi kirkastuu samalla käyrällä.
            k.Ladatut.Add(Pohja(4)); k.Ladatut.Add(Lumi(4));
            l.AsetaKuukausi(4);
            y.Kello = 3; r.Paivita();
            y.Kello = 3 + MaapallonVuosiLinssi.HaivytysS / 2; r.Paivita();
            Oleta.Sama(Lumi(3), k.Viimeisin.k1);
            Oleta.Sama(Lumi(4), k.Viimeisin.k2);
            Oleta.Tosi(System.Math.Abs(k.Viimeisin.a1 - 0.2f) < 1e-4 && System.Math.Abs(k.Viimeisin.a2 - 0.2f) < 1e-4, $"{k.Viimeisin.a1} {k.Viimeisin.a2}");
            // Kerros pois: häivytys tyhjään.
            y.Kello = 5; r.Paivita();
            l.AsetaKerros(null);
            y.Kello = 5.1; r.Paivita();
            y.Kello = 5.1 + MaapallonVuosiLinssi.HaivytysS / 2; r.Paivita();
            Oleta.Sama(Lumi(4), k.Viimeisin.k1);
            Oleta.Tosi(System.Math.Abs(k.Viimeisin.a1 - 0.2f) < 1e-4, "puoliksi häivytetty: " + k.Viimeisin.a1);
            y.Kello = 7; r.Paivita();
            Oleta.Sama(null, k.Viimeisin.k1);
        }

        [Testi] static void LuovuttanutKerrosEiJumitaKuukautta()
        {
            var (y, r, l, k) = Luo();
            k.Ladatut.Add(Pohja(3));
            r.Valitse(MaapallonVuosiLinssi.Id);
            l.AsetaKerros("sade");
            k.Luovutetut.Add("https://media.matkakirja.app/data/maapallon-vuosi/sade/03.png");
            y.Kello = 1; r.Paivita();
            y.Kello = 2; r.Paivita();
            Oleta.Sama(0f, k.Viimeisin.a1, "luovuttanutta kuvaa ei piirretä");
            Oleta.Tosi(!y.PeitePaalla);
        }

        [Testi] static void ToistoOdottaaHaivytyksen()
        {
            var (y, r, l, k) = Luo(12);
            k.Ladatut.Add(Pohja(12));
            r.Valitse(MaapallonVuosiLinssi.Id);
            r.Paivita();
            l.Toisto(true);
            y.Kello = MaapallonVuosiLinssi.ToistonKuukausiS; r.Paivita();
            Oleta.Sama(1, l.Kk, "joulu → tammi");
            // Tammikuun kuva ei tule: toisto ei etene.
            y.Kello = 10; r.Paivita();
            Oleta.Sama(1, l.Kk);
            k.Ladatut.Add(Pohja(1));
            y.Kello = 11; r.Paivita();
            y.Kello = 12; r.Paivita();
            y.Kello = 12.1; r.Paivita();
            Oleta.Sama(2, l.Kk);
            l.Toisto(false);
            y.Kello = 30; r.Paivita();
            Oleta.Sama(2, l.Kk);
        }

        [Testi] static void SulkuPalauttaaPelin()
        {
            var (y, r, l, k) = Luo();
            var ennen = y.Asento;
            r.Valitse(MaapallonVuosiLinssi.Id);
            l.Toisto(true);
            r.Sulje();
            Oleta.Tosi(y.PelikerroksetNakyvissa);
            Oleta.Sama(null, y.Katto);
            Oleta.Tosi(!y.PeitePaalla);
            Oleta.Tosi(!k.Nakyvissa);
            Oleta.Tosi(!l.Toistaa);
            Oleta.Sama(ennen.Lat, y.Ajo.Value.Lat);
        }

        [Testi] static void HiomassaEiPelaajalle()
        {
            var r = new Linssirekisteri(new ValeYmparisto());
            var l = new MaapallonVuosiLinssi(new ValeKuori());
            r.Lisaa(l);
            Oleta.Tosi(l.Tiedot.Kesken);
            Oleta.Tosi(!Linssirekisteri.Avauskynnykset.ContainsKey(MaapallonVuosiLinssi.Id));
            Oleta.Tosi(Linssirekisteri.Kehittajatila || !r.Saatavilla(MaapallonVuosiLinssi.Id));
        }
    }
}
