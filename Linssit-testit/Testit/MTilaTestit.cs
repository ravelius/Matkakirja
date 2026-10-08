// HISTORIAMOOTTORI M-OSA (Siirtoseppä 8.10.2026): M-tila tallennukseen ja takaisin samana; muut kentät ennallaan.
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class MTilaTestit
    {
        [Testi] static void KirjoitaJaLueSama()
        {
            var t = new SeikkailuTallennus { DataVersio = "92f6029878e2011b" };
            t.Laukku.Add("liuskekivi"); t.AvatutOvet.Add("tyrma"); t.Arvoitus["kappeli"] = 11;
            var m = new MTila { Avainrengas = true, Kulho = true, Koysi = true, Tiilet = 0b100011, Kilpi1 = 44.6, Kilpi2 = -30, Arkku = false, Kello = true };
            m.Puettu.Add("esiliina"); m.Puettu.Add("myssy"); m.AvatutOvet.Add("muurikaytava");
            m.Kirjoita(t);
            var t2 = SeikkailuTallennus.Lue(t.Kirjoita());
            var m2 = MTila.Lue(t2);
            Oleta.Tosi(t2 != null && !t.Kirjoita().Contains("\u2212"), "negatiivinen luku ASCII-miinuksella (fi-kulttuuri)");
            Oleta.Tosi(m2.Naamio && m2.Avainrengas && m2.Kulho && m2.Koysi && !m2.Arkku && m2.Kello, "liput");
            Oleta.Tosi(m2.Tiilet == 0b100011 && m2.Kilpi1 == 45 && m2.Kilpi2 == -30 && m2.AvatutOvet.Contains("muurikaytava"), "tiilet, kilvet (asteina), ovi");
            Oleta.Tosi(t2.Laukku.Contains("liuskekivi") && t2.AvatutOvet.Contains("tyrma") && t2.Arvoitus["kappeli"] == 11, "P-osan kentät ennallaan");
            // Uudelleenkirjoitus ei tuplaa.
            m2.Kirjoita(t2); m2.Kirjoita(t2);
            Oleta.Tosi(t2.Laukku.FindAll(x => x == "avainrengas").Count == 1 && t2.AvatutOvet.FindAll(x => x == "ovi:muurikaytava").Count == 1, "ei tuplia");
            Oleta.Tosi(!MTila.Lue(null).Naamio && MTila.Lue(new SeikkailuTallennus()).Tiilet == 0, "tyhjä");
        }
    }
}
