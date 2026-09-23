// Sisältöpaketin tuonti: kentät ja reittien tulkinta näytepaketista.
using System;
using System.IO;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    public static class SisaltoTuontiTestit
    {
        [Testi] static void KaupunkienKentat()
        {
            var k = SisaltoTuonti.LueKaupungit(File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "kaupungit.json")));
            Oleta.Sama(266, k.Count);
            var lontoo = k[0];
            Oleta.Sama("lontoo", lontoo.Id);
            Oleta.Sama("Lontoo", lontoo.Nimi);
            Oleta.Sama("GBR", lontoo.Maa);
            Oleta.Sama("GB", lontoo.Maa2);
            Oleta.Sama("europe", lontoo.Manner);
            Oleta.Sama(51.5051, lontoo.Lat);
            Oleta.Sama(-0.115, lontoo.Lon);
            Oleta.Sama(false, lontoo.Saari);
            Oleta.Sama(true, lontoo.Lentokentta);
            Oleta.Sama(true, lontoo.Aloitus);
            Oleta.Sama("kaupunki", lontoo.Tyyppi);
            var dublin = k.First(x => x.Id == "dublin");
            Oleta.Sama(true, dublin.Saari);
            Oleta.Sama(false, dublin.Aloitus);
            Oleta.Sama(k.Count, k.Select(x => x.Id).Distinct().Count(), "tunnukset uniikkeja");
        }

        [Testi] static void ReittienTulkinta()
        {
            var r = SisaltoTuonti.LueReitit(File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "reitit.json")));
            Oleta.Sama(485, r.Count);
            var eka = r[0];
            Oleta.Sama("lontoo|edinburgh", eka.Id);
            Oleta.Sama(ReitinLaji.Maa, eka.Laji);
            Oleta.Sama(3, eka.Askeleet);
            Oleta.Sama(0, eka.Maksu);
            var meri = r.First(x => x.Id == "lontoo|amsterdam");
            Oleta.Sama(ReitinLaji.Meri, meri.Laji);
            Oleta.Sama(100, meri.Maksu);
            var lento = r.First(x => x.Laji == ReitinLaji.Lento);
            Oleta.Sama("lento:lontoo|madrid", lento.Id);
            Oleta.Sama(0, lento.Askeleet);
            Oleta.Sama(71, r.Count(x => x.Laji == ReitinLaji.Lento));
            Oleta.Tosi(r.Where(x => x.Laji == ReitinLaji.Meri).All(x => x.Maksu == Vakiot.MeriHinta), "meren oletusmaksu");
        }

        [Testi] static void MeriMaksuDatasta()
        {
            var json = "{\"nimi\":\"reitit\",\"alkiot\":[{\"id\":\"reitti:0\",\"laji\":\"sea\",\"a\":\"x\",\"b\":\"y\",\"data\":{\"a\":\"x\",\"b\":\"y\",\"type\":\"sea\",\"steps\":4,\"fee\":250}},"
                + "{\"id\":\"reitti:1\",\"laji\":\"maa\",\"a\":\"y\",\"b\":\"z\",\"data\":{\"a\":\"y\",\"b\":\"z\",\"steps\":2,\"fee\":999}}]}";
            var r = SisaltoTuonti.LueReitit(json);
            Oleta.Sama(250, r[0].Maksu);
            Oleta.Sama(4, r[0].Askeleet);
            Oleta.Sama(0, r[1].Maksu, "maareitin fee ohitetaan kuten webissä");
        }

        [Testi] static void VaaraKokoelmaHeittaa()
        {
            bool heitti = false;
            try { SisaltoTuonti.LueReitit("{\"nimi\":\"kaupungit\",\"alkiot\":[]}"); } catch (FormatException) { heitti = true; }
            Oleta.Tosi(heitti, "väärä kokoelma");
        }
    }
}
