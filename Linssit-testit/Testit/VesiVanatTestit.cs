// LAIVOJEN VANAT (Linssiseppä 2, 9.10.2026; omistaja TF 168, PT juna 170): Ydin VesiVanat (valinta ja vaahdon kaava) ja varjostimen
// samat vakiot (VesiPinta.shader).
using System;
using System.IO;
using Matkakirja.Linssit.Ilmakeha;

namespace Matkakirja.Linssit.Testit
{
    public static class VesiVanatTestit
    {
        [Testi] static void ValintaLahimmatJaTuoreet()
        {
            var v = new VesiVanat();
            for (int i = 0; i < 20; i++) v.Aseta(i, i * 100, 0, 1, 0, 5, 30, 10.0);
            v.Aseta(99, 5, 0, 0, 1, 5, 30, 9.0);   // vanhentunut (1 s)
            var l = v.Valitse(0, 0, 10.2);
            Oleta.Sama(VesiVanat.VanojaMax, l.Count, "enintään 16");
            Oleta.Tosi(l[0].X == 0 && l[1].X == 100, "lähimmät ensin");
            Oleta.Tosi(!l.Exists(x => x.X == 5), "vanhentunut pois");
            Oleta.Sama(20, v.Maara, "vanhentunut poistettu varastosta");
        }

        [Testi] static void VaahtoPeraanJaKiilaan()
        {
            double pit = 30, n = 6;
            Oleta.Tosi(VesiVanat.Vaahto(30, 0, pit, n) > 0.2, "keskivana perässä (lyhyt vana 3,5 × pituus)");
            Oleta.Tosi(VesiVanat.Vaahto(30, 0, pit, n) > VesiVanat.Vaahto(90, 0, pit, n), "häipyy pituuden mukana");
            Oleta.Sama(0.0, VesiVanat.Vaahto(pit * VesiVanat.PituusKerroin + 1, 0, pit, n), "loppuu");
            double varsi = VesiVanat.KiilaTan * 80 + Math.Max(2, pit * VesiVanat.LeveysOsuus) * 0.5;
            Oleta.Tosi(VesiVanat.Vaahto(80, varsi, pit, n) > VesiVanat.Vaahto(80, varsi * 0.6, pit, n), "kiilan harja 19,5°");
            Oleta.Tosi(VesiVanat.Vaahto(-pit * 0.5, 0, pit, n) > 0.2, "keula-aalto (hillitty)");
            Oleta.Sama(0.0, VesiVanat.Vaahto(60, 0, pit, 0), "paikallaan ei vanaa");
            Oleta.Sama(VesiVanat.Vaahto(80, 7, pit, n), VesiVanat.Vaahto(80, -7, pit, n), "symmetrinen");
        }

        [Testi] static void VarjostinSamoillaVakioilla()
        {
            string s = File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "..", "Assets", "Matkakirja", "Linssit", "Resources", "Varjostimet", "VesiPinta.shader"));
            Oleta.Tosi(s.Contains("float4 _VesiVana[16]") && VesiVanat.VanojaMax == 16, "16 vanaa");
            Oleta.Tosi(s.Contains("L = pit * 3.5") && s.Contains("b.x / 6.0") && s.Contains("pit * 0.14") && s.Contains("0.354 * max(0.0, taakse)"), "samat vakiot");
            Oleta.Tosi(s.Contains("(keski * 0.45 + kaari * 0.12) * haivy + keula * 0.25 * n"), "sama kaava");
        }
    }
}
