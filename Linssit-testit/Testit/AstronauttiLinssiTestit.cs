// Astronautin kameran elinkaari vale-ympäristössä.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class AstronauttiLinssiTestit
    {
        sealed class ValeNakyma : IAstronautinNakyma
        {
            public readonly List<string> Loki = new List<string>();
            public double PilvienPeitto = -1, SumunPeitto = -1;
            public bool NimetNakyvissa;
            public int IssPaivityksia;
            public void Avaus(AvauksenVaihe v) => Loki.Add("avaus " + v);
            public void Kohteet(IReadOnlyList<Havaintokohde> k) => Loki.Add("kohteet " + k.Count);
            public void Nimet(bool n) { NimetNakyvissa = n; Loki.Add("nimet " + n); }
            public void Pilvet(double p, double k) => PilvienPeitto = p;
            public void Sumu(double p) => SumunPeitto = p;
            public void Tahdet(double p) => Loki.Add("tahdet " + p);
            public void Iss(LatLon p, IReadOnlyList<LatLon> k) => IssPaivityksia++;
            public void Kuva(Havaintokohde k, int i) => Loki.Add($"kuva {k.Tunnus} {i}");
            public void KuvaPois() => Loki.Add("kuva pois");
            public void Pois() => Loki.Add("pois");
            public void Kyyti(Matkakirja.Linssit.Iss.KyydinTila tila, double korkeusKm, double nopeusKmh, bool arvio, Matkakirja.Linssit.Iss.KyydinAika aika) => Loki.Add($"kyyti {tila} {korkeusKm:0} {nopeusKmh:0}{(arvio ? " arvio" : "")}");
        }

        static (AstronauttiLinssi l, ValeYmparisto y, ValeNakyma n) Luo()
        {
            string P(string x) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "paketti", x);
            var a = AstronauttiAineisto.Lue(MiniJson.Jasenna(File.ReadAllText(P("satelliitti-data.json"))),
                MiniJson.Jasenna(File.ReadAllText(P("astronaut-kysymykset.json"))));
            var y = new ValeYmparisto();
            var n = new ValeNakyma();
            return (new AstronauttiLinssi(a, n), y, n);
        }

        static void Aja(AstronauttiLinssi l, ValeYmparisto y, double s)
        {
            double loppu = y.Kello + s;
            while (y.Kello < loppu) { y.Kello += 1 / 60.0; l.Paivita(); }
        }

        [Testi] static void AvausOdottaaLaattojaJaMinimiaikaa()
        {
            var (l, y, n) = Luo();
            l.Avaa(y);
            Oleta.Sama(AvauksenVaihe.Musta, l.Vaihe);
            Oleta.Sama(false, y.Vale.Nakyvat["laatat"], "reliefi pohjan tilalle");
            Oleta.Sama(y.KokoPallonKorkeus, y.Ajo.Value.Korkeus, "pimeässä avauskorkeuteen");
            y.Vale.Tilat[AstronauttiLinssi.Kerros] = KerrosTila.Valmis;
            Aja(l, y, 1.0);
            Oleta.Sama(AvauksenVaihe.Musta, l.Vaihe, "ennen 1800 ms:a musta pysyy");
            Aja(l, y, 0.9);
            Oleta.Sama(AvauksenVaihe.OtsikkoPois, l.Vaihe);
            // ISS-seurannassa zoomi lasketaan joka kehys (kuutiollinen ease-in-out 5 s), suunta aseman alapisteestä.
            Oleta.Tosi(l.IssSeuranta);
            Oleta.Sama(0f, y.AjonKesto, "seuranta asettaa kameran joka kehys");
            Aja(l, y, 0.75);
            Oleta.Sama(AvauksenVaihe.MustaPois, l.Vaihe);
            Aja(l, y, 1.2);
            Oleta.Sama(AvauksenVaihe.Pois, l.Vaihe);
        }

        [Testi] static void KattoPaljastaaIlmanLaattoja()
        {
            var (l, y, _) = Luo();
            l.Avaa(y);
            Aja(l, y, 11.9);
            Oleta.Sama(AvauksenVaihe.Musta, l.Vaihe);
            Aja(l, y, 0.2);
            Oleta.Sama(AvauksenVaihe.OtsikkoPois, l.Vaihe);
        }

        [Testi] static void NimetPilvetJaSumuKorkeudesta()
        {
            var (l, y, n) = Luo();
            l.Avaa(y);
            double avaus = y.KokoPallonKorkeus;
            y.Asento = new Nakyma(0, 0, avaus * 0.26);
            Aja(l, y, 0.1);
            Oleta.Sama(false, n.NimetNakyvissa, "0,26 > 0,25: ei vielä nimiä");
            y.Asento = new Nakyma(0, 0, avaus * 0.24);
            Aja(l, y, 0.1);
            Oleta.Sama(true, n.NimetNakyvissa);
            y.Asento = new Nakyma(0, 0, avaus * 0.28);
            Aja(l, y, 0.1);
            Oleta.Sama(true, n.NimetNakyvissa, "hystereesi: pysyy 0,29:ään asti");
            y.Asento = new Nakyma(0, 0, avaus * 0.3);
            Aja(l, y, 0.1);
            Oleta.Sama(false, n.NimetNakyvissa);
            Oleta.Sama(Astronauttimatikka.PilvienPeitto(0.3, 1), n.PilvienPeitto);
            Oleta.Sama(Astronauttimatikka.SumunPeitto(0.3, 1), n.SumunPeitto);
            Oleta.Tosi(n.IssPaivityksia > 0);
        }

        [Testi] static void NapautusAvaaKuvanVastaPaljastuksenJalkeen()
        {
            var (l, y, n) = Luo();
            l.Avaa(y);
            l.Napauta("etna");
            Oleta.Tosi(!n.Loki.Any(x => x.StartsWith("kuva ")), "mustan aikana ei kuvaa");
            y.Vale.Tilat[AstronauttiLinssi.Kerros] = KerrosTila.Luovutti;
            Aja(l, y, 0.1);
            l.Napauta("etna");
            Oleta.Sama("kuva etna 0", n.Loki.Last());
            l.SuljeKuva();
            Oleta.Sama("kuva pois", n.Loki.Last());
        }

        [Testi] static void IssSeurantaAvauksestaKunnesPelaajaKoskee()
        {
            // Web satelliitti-avaruus.js seuranta (Raamattu PAATOKSET 53): ISS keskellä, Maa pyörii sen alla.
            var (l, y, _) = Luo();
            l.Avaa(y);
            Oleta.Tosi(l.IssSeuranta, "seuranta alkaa avauksesta");
            var iss = Iss.IssNyt.Paikka(Iss.IssNyt.Kello());
            Oleta.Tosi(Iss.Ylilennot.MaaEtaisyysKm(y.Ajo.Value.Lat, y.Ajo.Value.Lon, iss.Lat, iss.Lon) < 50, "pimeässä jo aseman yllä");
            Oleta.Sama(y.KokoPallonKorkeus, y.Ajo.Value.Korkeus);
            // Mustan aikana ote ei vielä päätä seurantaa.
            l.PelaajanEle();
            Oleta.Tosi(l.IssSeuranta);
            y.Vale.Tilat[AstronauttiLinssi.Kerros] = KerrosTila.Luovutti;
            Aja(l, y, 0.1);
            Oleta.Tosi(l.Vaihe != AvauksenVaihe.Musta, "paljastettu");
            // Avauszoomi puolivälissä: korkeus kuutiollisella käyrällä, suunta yhä asemaan.
            Aja(l, y, 2.5);
            double avaus = y.KokoPallonKorkeus, lepo = avaus * Astronauttimatikka.AvausajonLoppu;
            // Zoomi alkoi paljastuksen kehyksestä (ensimmäinen Paivita, kello 1/60 s).
            double odotettu = avaus + (lepo - avaus) * Astronauttimatikka.AvausPehmennys((y.Kello - 1 / 60.0) / 5.0);
            Oleta.Tosi(Math.Abs(y.Ajo.Value.Korkeus - odotettu) < avaus * 0.005, $"zoomi käyrällä: {y.Ajo.Value.Korkeus:0} ≈ {odotettu:0}");
            iss = Iss.IssNyt.Paikka(Iss.IssNyt.Kello());
            Oleta.Tosi(Iss.Ylilennot.MaaEtaisyysKm(y.Ajo.Value.Lat, y.Ajo.Value.Lon, iss.Lat, iss.Lon) < 50, "kamera seuraa asemaa");
            Aja(l, y, 3);
            Oleta.Sama(lepo, y.Ajo.Value.Korkeus, "zoomi perillä lepokorkeudella");
            // Pelaajan ote: seuranta päättyy, eikä kameraa enää kirjoiteta.
            l.PelaajanEle();
            Oleta.Tosi(!l.IssSeuranta);
            int ajoja = y.Loki.Count(x => x == "ajo");
            Aja(l, y, 1);
            Oleta.Sama(ajoja, y.Loki.Count(x => x == "ajo"), "ote: ei enää kamera-ajoja");
        }

        [Testi] static void ZoomikaistaKutenWebissa()
        {
            // Web zoomirajat: säteinä max(0,1; 0,084 × avaus) … 1,3 × avaus.
            var (l, y, _) = Luo();
            l.Avaa(y);
            double avaus = y.KokoPallonKorkeus, R = AstronauttiLinssi.MaanSade;
            Oleta.Tosi(Math.Abs(y.Katto.Value - avaus * 1.3) < 1, $"katto {y.Katto}");
            Oleta.Tosi(Math.Abs(y.Lattia.Value - Math.Max(0.1 * R, 0.084 * avaus)) < 1, $"lattia {y.Lattia}");
            l.Sulje();
            Oleta.Tosi(y.Katto == null && y.Lattia == null, "sulku palauttaa pelin rajat");
        }

        [Testi] static void CupolanEnnakkoOnAvautuvaAsento()
        {
            // iPad 75ddd638: kylmä Cupola karkeana 4 s; ennakkokamera lataa laatat jo kaukonäkymässä samaan asentoon.
            var (l, y, _) = Luo();
            l.Avaa(y);
            y.Vale.Tilat[AstronauttiLinssi.Kerros] = KerrosTila.Luovutti;
            Aja(l, y, 0.2);
            Oleta.Tosi(l.CupolanEnnakko(out var e), "kaukonäkymässä ennakko");
            // Ennakko 20 s eteenpäin: ISS ~7,7 km/s → katsepiste ~150 km radan suuntaan (Natiiviseppä juna 140).
            Oleta.Tosi(l.CupolanEnnakko(out var e20, 20));
            double eteenKm = Matkakirja.Linssit.Iss.IssKuvakulma.Kaari(e.Lat, e.Lon, e20.Lat, e20.Lon) * 111.2;
            Oleta.Tosi(eteenKm > 100 && eteenKm < 200, $"20 s eteenpäin {eteenKm:0} km");
            l.NapautaIss();
            Aja(l, y, 0.05);
            Oleta.Sama(Matkakirja.Linssit.Iss.KyydinTila.Ikkuna, l.Kyyti);
            var a = l.KyydinAsento;
            double km = Matkakirja.Linssit.Iss.IssKuvakulma.Kaari(e.Lat, e.Lon, a.Lat, a.Lon) * 111.2;
            Oleta.Tosi(km < 30 && Math.Abs(e.Kallistus - a.Kallistus) < 1, $"ennakko {e} vs. Cupola {a}: {km:0.0} km");
            Oleta.Tosi(!l.CupolanEnnakko(out _), "kyydissä ei ennakkoa");
            l.Sulje();
            Oleta.Tosi(!l.CupolanEnnakko(out _), "suljettuna ei ennakkoa");
        }

        [Testi] static void IssSeurantaPaattyyKuvaanJaKyytiin()
        {
            var (l, y, _) = Luo();
            l.Avaa(y);
            y.Vale.Tilat[AstronauttiLinssi.Kerros] = KerrosTila.Luovutti;
            Aja(l, y, 0.2);
            l.Napauta("etna");
            Oleta.Tosi(!l.IssSeuranta, "kuva: kamera liukuu kohteen ylle");
            Oleta.Sama(AstronauttiLinssi.KuvaanAjoS, y.AjonKesto);
            l.SuljeKuva();
            // Toinen avaus: kyyti päättää seurannan.
            l.Sulje();
            l.Avaa(y);
            Aja(l, y, 0.2);
            Oleta.Tosi(l.IssSeuranta, "uusi avaus seuraa taas");
            l.NapautaIss();
            Oleta.Tosi(!l.IssSeuranta, "kyyti ottaa kameran");
            l.Sulje();
            // Vähennetty liike: ei seurantaa, zoomi kamera-ajona (hyppy).
            y.Vahennetty = true;
            l.Avaa(y);
            Oleta.Tosi(!l.IssSeuranta);
            Aja(l, y, 0.2);
            Oleta.Sama(y.KokoPallonKorkeus * Astronauttimatikka.AvausajonLoppu, y.Ajo.Value.Korkeus);
            Oleta.Sama(0f, y.AjonKesto);
            l.Sulje();
        }

        [Testi] static void SulkeminenPalauttaaPallon()
        {
            var (l, y, n) = Luo();
            var alku = y.Asento;
            l.Avaa(y);
            Aja(l, y, 3);
            l.Sulje();
            Oleta.Sama(true, y.Vale.Nakyvat["laatat"]);
            Oleta.Sama(true, y.Vale.Nakyvat["reitit"]);
            Oleta.Sama(true, y.PelikerroksetNakyvissa);
            Oleta.Tosi(!y.Vale.Rasterit.ContainsKey(AstronauttiLinssi.Kerros));
            Oleta.Sama(alku.Korkeus, y.Ajo.Value.Korkeus);
            Oleta.Sama(AstronauttiLinssi.PaluuAjoS, y.AjonKesto);   // pehmeä paluu, ei hyppyä (KAMERA-AJOT 24.9.)
            Oleta.Sama("pois", n.Loki.Last());
        }
    
        [Testi] static void KyllaisyysKytkinValitseeSarjan()
        {
            var vanha = (AstronauttiLinssi.Kyllaisyys, AstronauttiLinssi.VaimeaSarja);
            try
            {
                AstronauttiLinssi.Kyllaisyys = 1.0;
                Oleta.Sama(Topografia.ReliefiSarja, AstronauttiLinssi.ReliefinSarja());
                AstronauttiLinssi.Kyllaisyys = AstronauttiLinssi.WebinKyllaisyys;
                AstronauttiLinssi.VaimeaSarja = null;
                Oleta.Sama(Topografia.ReliefiSarja, AstronauttiLinssi.ReliefinSarja(), "ei vaimeaa sarjaa → täysvärinen");
                AstronauttiLinssi.VaimeaSarja = "https://esim/{z}/{x}/{y}.jpg";
                Oleta.Sama("https://esim/{z}/{x}/{y}.jpg", AstronauttiLinssi.ReliefinSarja());
            }
            finally { (AstronauttiLinssi.Kyllaisyys, AstronauttiLinssi.VaimeaSarja) = vanha; }
        }
}
}
