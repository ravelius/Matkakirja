// Löydös 176 (Natiiviseppä 26.9.2026): laattapalvelimen porttijako (Kartta/LaattaPortit.cs): luokka polun mukaan,
// porttiehdokkaat, näkyvän jonon rinnakkaisuus ja varmistuslaskurien huiput.
using System.Threading.Tasks;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class LaattaPortitTestit
    {
        [Testi]
        static void LuokkaPolunMukaan()
        {
            // Kerma (Varitaso.Kansio) ja sen _maailma-sarja sekä laatat.json → kerman portti.
            Oleta.Sama(LaattaPortit.Kerma, LaattaPortit.Luokka("julisteet/pallo/kerma/2026-09-25-p045/GR/{z}/{x}/{reverseY}.webp"));
            Oleta.Sama(LaattaPortit.Kerma, LaattaPortit.Luokka("julisteet/pallo/kerma/2026-09-25-p045/_maailma/5/17/11.webp"));
            Oleta.Sama(LaattaPortit.Kerma, LaattaPortit.Luokka("julisteet/pallo/kerma/v1/GR/laatat.json"));
            // Maasto: layer.json ja laatat samasta portista (Cesium ratkaisee laatat layer.jsonin suhteen).
            Oleta.Sama(LaattaPortit.Maasto, LaattaPortit.Luokka("julisteet/maasto/2026-09-24-maailma/layer.json"));
            Oleta.Sama(LaattaPortit.Maasto, LaattaPortit.Luokka("julisteet/maasto/2026-09-24-maailma/7/140/100.terrain?v=1.2.0&extensions=octvertexnormals"));
            Oleta.Sama(LaattaPortit.Maasto, LaattaPortit.Luokka("/julisteet/maasto/x/layer.json"));
            // Pohja ja sileä pohja.
            Oleta.Sama(LaattaPortit.Pohja, LaattaPortit.Luokka("julisteet/pallo/laatat/2026-09-26-pohja-20260926/{z}/{x}/{reverseY}.jpg"));
            Oleta.Sama(LaattaPortit.Pohja, LaattaPortit.Luokka("julisteet/pallo/laatat/2026-09-26-pohja-20260926/6/35/40.jpg"));
            // Muut: lennon pinta, vektorit, tyhjä.
            Oleta.Sama(LaattaPortit.Muu, LaattaPortit.Luokka("julisteet/pallo/satelliitti/v3/bmng-bathy/4/8/5.jpg"));
            Oleta.Sama(LaattaPortit.Muu, LaattaPortit.Luokka("julisteet/pallo/vektorit/v2/joet/3/1.bin"));
            Oleta.Sama(LaattaPortit.Muu, LaattaPortit.Luokka(""));
            Oleta.Sama(LaattaPortit.Muu, LaattaPortit.Luokka(null));
            // Kyselyn sisältö ei vaikuta (esim. ?p=julisteet/pallo/kerma/).
            Oleta.Sama(LaattaPortit.Muu, LaattaPortit.Luokka("muu/x.json?p=julisteet/pallo/kerma/"));
            Oleta.Sama(LaattaPortit.Maara, LaattaPortit.Nimet.Length);
        }

        [Testi]
        static void PorttiEhdokkaat()
        {
            Oleta.Sama(52100, LaattaPortit.PorttiEhdokas(52100, 0));
            Oleta.Sama(52103, LaattaPortit.PorttiEhdokas(52100, 3));
            Oleta.Sama(0, LaattaPortit.PorttiEhdokas(65534, 2), "yli 65535 → käyttöjärjestelmä valitsee");
            Oleta.Sama(0, LaattaPortit.PorttiEhdokas(0, 1));
        }

        [Testi]
        static void NakyvaRinnakkainNouseeVainMonellaPortilla()
        {
            Oleta.Sama(12, LaattaPortit.NakyvaRinnakkain(12, 1), "yksi portti = vanha käytös (B)");
            Oleta.Sama(12, LaattaPortit.NakyvaRinnakkain(12, 0));
            Oleta.Sama(16, LaattaPortit.NakyvaRinnakkain(12, 4));
            Oleta.Sama(20, LaattaPortit.NakyvaRinnakkain(20, 4), "suurempaa ei lasketa");
            // Verhon ja saapumistilan raja (24) säilyy.
            Oleta.Sama(24, SaapumisKiire.NakyvaRaja(LaattaPortit.NakyvaRinnakkain(12, 4), 24, true, false));
        }

        [Testi]
        static void HuippuLukijoittain()
        {
            var h = new LaattaPortit.Huippu();
            h.Lisaa(); h.Lisaa(); h.Lisaa();
            h.Vahenna(); h.Vahenna();
            Oleta.Sama(1, h.Nyt);
            Oleta.Sama(3, h.Istunto);
            Oleta.Sama(3, h.Ikkuna(0), "palvelin-lukijan ikkuna");
            Oleta.Sama(1, h.Ikkuna(0), "nollautui nykyiseen");
            Oleta.Sama(3, h.Ikkuna(1), "valmius-lukijan ikkuna on oma");
            h.Lisaa();
            Oleta.Sama(2, h.Ikkuna(0));
            Oleta.Sama(3, h.Istunto);
        }

        [Testi]
        static void HuippuSaikeista()
        {
            var h = new LaattaPortit.Huippu();
            Parallel.For(0, 2000, _ => { h.Lisaa(); h.Vahenna(); });
            Oleta.Sama(0, h.Nyt);
            Oleta.Tosi(h.Istunto >= 1 && h.Istunto <= 2000, "istunnon huippu " + h.Istunto);
            Oleta.Sama(h.Istunto, h.Ikkuna(1));
        }
    }
}
