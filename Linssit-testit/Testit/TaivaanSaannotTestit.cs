// Tähtitaivaan säännöt webin mukaan (pelikoodari-tahtitaivas d9a9438a): aineisto, kirkkausrajat, näkyvät tähdistöt, kysymys.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Taivas;

namespace Matkakirja.Linssit.Testit
{
    public static class TaivaanSaannotTestit
    {
        static TaivasAineisto Aineisto()
        {
            string p = Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Resources", "Taivas", "tahtitaivas.json");
            return TaivasAineisto.Lue(Matkakirja.Peli.MiniJson.Jasenna(File.ReadAllText(p)));
        }

        [Testi] static void AineistoKutenWebissa()
        {
            var a = Aineisto();
            Oleta.Sama(1656, a.Tahdet.Count);
            Oleta.Sama(88, a.Tahdistot.Count);
            Oleta.Sama(4.5, a.Raja1873); Oleta.Sama(3.5, a.RajaNyt); Oleta.Sama(2.5, a.RajaSuurkaupunki);
            Oleta.Sama(20, a.ArvauksenTp);
            Oleta.Sama(3, a.Kysymykset.Count);
            Oleta.Tosi(a.Kortti.StartsWith("Laivastossa tähdet olivat työkaluja"), "Horation kortti");
            var otava = a.Tahdistot.Find(t => t.Lyhenne == "UMa");
            Oleta.Sama("Iso karhu", otava.Suomi);
            Oleta.Tosi(a.Tahdistot.All(t => t.Hrt.All(h => a.Hr.ContainsKey(h))), "jokaisen viivan tähti on aineistossa");
            Oleta.Sama(a.RajaSuurkaupunki, a.Kirkkausraja(false, "lontoo"));
            Oleta.Sama(a.RajaNyt, a.Kirkkausraja(false, "helsinki"));
            Oleta.Sama(a.Raja1873, a.Kirkkausraja(true, "lontoo"));
        }

        [Testi] static void ValosaasteKarsiiTahdistoja()
        {
            // Helsinki syysyönä: 1873 näkyy selvästi enemmän tähdistöjä kuin nyt, ja Iso karhu (Otava) näkyy aina.
            var a = Aineisto();
            double jd = Iss.Aika.Jd(new DateTime(2026, 9, 29, 20, 0, 0, DateTimeKind.Utc));
            var v1873 = a.NakyvatTahdistot(60.17, 24.94, jd, a.Raja1873);
            var nyt = a.NakyvatTahdistot(60.17, 24.94, jd, a.RajaNyt);
            var suur = a.NakyvatTahdistot(60.17, 24.94, jd, a.RajaSuurkaupunki);
            Oleta.Tosi(v1873.Count > nyt.Count && nyt.Count >= suur.Count, $"1873 {v1873.Count}, nyt {nyt.Count}, suurkaupunki {suur.Count}");
            Oleta.Tosi(nyt.Any(n => n.Tahdisto.Lyhenne == "UMa"), "Otava näkyy");
            Oleta.Tosi(v1873.All(n => n.Kirkkain <= a.Raja1873));
        }

        [Testi] static void KysymysNeljastaJaPalaute()
        {
            var a = Aineisto();
            double jd = Iss.Aika.Jd(new DateTime(2026, 9, 29, 20, 0, 0, DateTimeKind.Utc));
            var nakyvat = a.NakyvatTahdistot(60.17, 24.94, jd, a.Raja1873);
            var k = a.ArvoKysymys(nakyvat, new HashSet<string>(), 0, new Random(7));
            Oleta.Tosi(k != null);
            Oleta.Sama(4, k.Vaihtoehdot.Count);
            Oleta.Tosi(k.Vaihtoehdot.Contains(k.Oikea.Tahdisto), "oikea on vaihtoehdoissa");
            Oleta.Sama(4, k.Vaihtoehdot.Distinct().Count());
            Oleta.Tosi(k.Oikea.Kirkkain <= 3.0, "kirkkaat kuviot ensin");
            Oleta.Sama(a.Kysymykset[0], k.Teksti);
            Oleta.Tosi(a.Palaute(true, k.Oikea.Tahdisto).StartsWith("Aivan, " + k.Oikea.Tahdisto.Suomi));
            // Juuri kysytty ei tule heti uudelleen, kun muita on.
            var k2 = a.ArvoKysymys(nakyvat, new HashSet<string> { k.Oikea.Tahdisto.Lyhenne }, 1, new Random(7));
            Oleta.Tosi(k2.Oikea.Tahdisto != k.Oikea.Tahdisto);
            Oleta.Sama(a.Kysymykset[1], k2.Teksti);
        }
    }
}
