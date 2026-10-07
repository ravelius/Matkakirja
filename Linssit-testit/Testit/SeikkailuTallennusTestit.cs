// HISTORIAMOOTTORI V6 (Siirtoseppä 7.10.2026): tallennus → palautus = sama tila; rikkinäinen tai vanha tiedosto ei kaada.
using System;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class SeikkailuTallennusTestit
    {
        [Testi] static void TallennusPalautuuSamana()
        {
            var t = new SeikkailuTallennus { DataVersio = "45be74356f79a1c6", OnTarkistus = true, X = -17.6, Y = 9.65, Z = 11.4, TarkistusOsa = "kirkkotorni-portaat", Kadessa = "kynttila", KulunutS = 412.5 };
            t.Laukku.Add("liuskekivi"); t.AvatutOvet.Add("ovi:keittio-piha"); t.Arvoitus["kappeli"] = 6; t.Vihjetasot["5"] = 2; t.Kiinnijaamiset["3"] = 1;
            var u = SeikkailuTallennus.Lue(t.Kirjoita());
            Oleta.Tosi(u != null && u.OnTarkistus && Math.Abs(u.X + 17.6) < 1e-9 && Math.Abs(u.Z - 11.4) < 1e-9 && u.TarkistusOsa == "kirkkotorni-portaat", "tarkistuspiste");
            Oleta.Tosi(u.Kadessa == "kynttila" && u.Laukku.Count == 1 && u.AvatutOvet[0] == "ovi:keittio-piha", "esineet ja ovet");
            Oleta.Tosi(u.Arvoitus["kappeli"] == 6 && u.Vihjetasot["5"] == 2 && u.Kiinnijaamiset["3"] == 1 && Math.Abs(u.KulunutS - 412.5) < 1e-9 && u.DataVersio == "45be74356f79a1c6", "vaiheet ja aika");
            Oleta.Sama(t.Kirjoita(), u.Kirjoita());
        }

        [Testi] static void RikkinainenEiKaada()
        {
            Oleta.Tosi(SeikkailuTallennus.Lue("rikki") == null && SeikkailuTallennus.Lue(null) == null, "rikkinäinen → null");
            var v = SeikkailuTallennus.Lue("{\"versio\": 0, \"tuntematon\": 5, \"laukku\": [3, \"avain\"]}");
            Oleta.Tosi(v != null && !v.OnTarkistus && v.Laukku.Count == 1, "tuntemattomat ohitetaan");
            var w = new SeikkailuTallennus(); w.Laukku.Add("lainaus \"x\"");
            Oleta.Sama("lainaus \"x\"", SeikkailuTallennus.Lue(w.Kirjoita()).Laukku[0]);
        }
    }
}
