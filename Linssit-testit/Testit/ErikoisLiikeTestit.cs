// Erikoismallien liike (Mont-Saint-Michel, Stonehenge, Colosseum): kolme kerrosta, lepo, vähennetty liike, yövalot ja
// toistettavuus.
using System;
using Matkakirja.Linssit.Elava;

namespace Matkakirja.Linssit.Testit
{
    public static class ErikoisLiikeTestit
    {
        static void Aja(ErikoisAnimaatio a, double s, ErikoisSyote syote, Action<double> jokaKehys = null)
        {
            for (double t = 0; t < s; t += 1 / 30.0) { a.Paivita(1 / 30.0, syote); jokaKehys?.Invoke(t); }
        }
        static readonly ErikoisSyote Normaali = new ErikoisSyote { Liike = 1 };

        [Testi] static void LuoAvaimella()
        {
            Oleta.Tosi(ErikoisAnimaatio.Luo("mont-saint-michel", "kohde:mont-saint-michel") is MontSaintMichelLiike, "msm");
            Oleta.Tosi(ErikoisAnimaatio.Luo("stonehenge", "kohde:stonehenge") is StonehengeLiike, "stonehenge");
            Oleta.Tosi(ErikoisAnimaatio.Luo("colosseum", "kohde:colosseum") is ColosseumLiike, "colosseum");
            Oleta.Tosi(ErikoisAnimaatio.Luo("akropolis", "kohde:akropolis") == null, "tuntematon ei liiku");
        }

        [Testi] static void VuorovesiNouseeJaLaskeeJaLepaa()
        {
            var a = new MontSaintMichelLiike("kohde:mont-saint-michel");
            double min = 9, max = -9; int lepoKehyksia = 0, kehyksia = 0;
            Aja(a, 900, Normaali, _ => { min = Math.Min(min, a.Taso); max = Math.Max(max, a.Taso); kehyksia++; if (!a.Liikkuu) lepoKehyksia++; });
            Oleta.Tosi(min < 0.01 && max > 0.99, $"taso {min:F2}–{max:F2}");
            // Perusliike ei ole jatkuvaa: vesi seisoo korkealla ja matalalla, jolloin elävä kerros lepää (0 kehystä).
            Oleta.Tosi(lepoKehyksia > kehyksia * 0.5, $"lepo {lepoKehyksia}/{kehyksia}");
            var vesi = a.Asento("vesi");
            Oleta.Tosi(vesi.Y >= MontSaintMichelLiike.Matalalla - 1e-9 && vesi.Y <= MontSaintMichelLiike.Matalalla + MontSaintMichelLiike.Nousu + 1e-9, "vesi rajoissa");
        }

        [Testi] static void KevatvuoksiTapahtumastaJaVaahto()
        {
            var a = new MontSaintMichelLiike("kohde:mont-saint-michel");
            Oleta.Tosi(a.Asento("vaahto").Skaala == 0, "vaahto piilossa tavallisesti");
            a.Paivita(1 / 30.0, new ErikoisSyote { Liike = 1, Tapahtuma = true });
            Oleta.Tosi(a.Kevat, "kevätvuoksi alkoi");
            Aja(a, 2.5, Normaali);
            var v = a.Asento("vaahto");
            Oleta.Tosi(v.Skaala < 1.03 && v.Skaala > 0.8, "vaahto kiertää kohti rantaa: " + v.Skaala);
            Aja(a, 1.5, Normaali);
            Oleta.Tosi(a.Asento("vaahto").Skaala < v.Skaala, "vesiraja etenee saarta kohti");
            Aja(a, 1.2, Normaali);
            Oleta.Tosi(a.Taso > 0.99, "nousu 5 s:ssa");
            Aja(a, 1.2, Normaali);
            Oleta.Tosi(a.Asento("patsas").Skaala > 1.2, "patsas hehkuu huipulla");
        }

        [Testi] static void LahestyminenHerattaaMatalanVeden()
        {
            var a = new MontSaintMichelLiike("x");
            Aja(a, 0.1, Normaali);
            a.Paivita(1 / 30.0, new ErikoisSyote { Liike = 1, Lahella = true });
            Aja(a, 20, new ErikoisSyote { Liike = 1, Lahella = true });
            Oleta.Tosi(a.Taso > 0.99, "lähestyttäessä vesi nousi: " + a.Taso);
        }

        [Testi] static void VahennettyLiikePysayttaa()
        {
            var a = new MontSaintMichelLiike("kohde:mont-saint-michel");
            a.Paivita(1 / 30.0, new ErikoisSyote { Liike = 1, Tapahtuma = true });
            Aja(a, 1, Normaali);
            double ennen = a.Taso;
            Aja(a, 10, new ErikoisSyote { Liike = 0 });
            Oleta.Tosi(Math.Abs(a.Taso - ennen) < 1e-9, "liike 0 → paikallaan");
        }

        [Testi] static void LampaatPysyvatLaitumellaJaAurinkoNousee()
        {
            var a = new StonehengeLiike("kohde:stonehenge");
            double suurin = 0;
            Aja(a, 1800, Normaali, _ =>
            {
                foreach (var n in new[] { "lammas1", "lammas2", "lammas3" })
                {
                    var l = a.Asento(n); suurin = Math.Max(suurin, Math.Sqrt(l.X * l.X + l.Z * l.Z));
                }
            });
            Oleta.Tosi(suurin < 0.06 && suurin > 0.005, "lampaat liikkuvat mutta pysyvät laitumella: " + suurin);
            var b = new StonehengeLiike("kohde:stonehenge");
            b.Paivita(1 / 30.0, new ErikoisSyote { Liike = 1, Tapahtuma = true });
            Oleta.Tosi(b.Nousee, "tapahtuma nostaa auringon");
            Aja(b, 12, Normaali);
            Oleta.Tosi(b.Asento("aurinko").Y > 0.06 && b.Asento("sade").Skaala > 0.9, "aurinko ylhäällä ja säde koko pituudeltaan");
            Aja(b, 16, Normaali);
            Oleta.Tosi(b.Asento("aurinko").Skaala == 0 && b.Asento("sade").Skaala == 0, "nousun jälkeen piilossa");
        }

        [Testi] static void YollaKuuEikaAurinkoa()
        {
            var a = new StonehengeLiike("kohde:stonehenge");
            var yo = new ErikoisSyote { Liike = 1, Yo = true };
            Aja(a, 2, yo);
            Oleta.Tosi(a.Asento("kuu").Skaala > 0.99, "kuu näkyy yöllä");
            a.Paivita(1 / 30.0, new ErikoisSyote { Liike = 1, Yo = true, Tapahtuma = true });
            Oleta.Tosi(!a.Nousee, "yöllä aurinko ei nouse");
            Aja(a, 2, Normaali);
            Oleta.Tosi(a.Asento("kuu").Skaala == 0, "päivällä kuu piilossa");
        }

        [Testi] static void VelariumAaltoJaParvi()
        {
            var a = new ColosseumLiike("kohde:colosseum");
            a.Paivita(1 / 30.0, new ErikoisSyote { Liike = 1, Tapahtuma = true });
            Aja(a, 1.5, Normaali);
            Oleta.Tosi(a.Sektori(0) > a.Sektori(8) && a.Sektori(15) == 0, "aalto etenee sektori kerrallaan");
            Aja(a, 9, Normaali);
            for (int s = 0; s < 16; s++) Oleta.Tosi(a.Sektori(s) > 0.99, "kaikki auki " + s);
            bool sulkeutui = false;
            Aja(a, 200, Normaali, _ => { if (!a.VelariumKaynnissa && a.Asento("velarium0").Skaala == 0) sulkeutui = true; });
            Oleta.Tosi(sulkeutui, "velarium sulkeutuu tapahtuman jälkeen");
            // Parvi: lähestyttäessä nousee.
            var b = new ColosseumLiike("y");
            Aja(b, 0.1, Normaali);
            b.Paivita(1 / 30.0, new ErikoisSyote { Liike = 1, Lahella = true });
            Aja(b, 2, new ErikoisSyote { Liike = 1, Lahella = true });
            Oleta.Tosi(b.Asento("parvi").Skaala > 0.99, "parvi lentää");
        }

        [Testi] static void SamaIdSamaLiike()
        {
            var a = new ColosseumLiike("kohde:colosseum"); var b = new ColosseumLiike("kohde:colosseum");
            Aja(a, 300, Normaali); Aja(b, 300, Normaali);
            Oleta.Sama(a.Tila(), b.Tila());
            var c = new StonehengeLiike("kohde:stonehenge"); var d = new StonehengeLiike("kohde:stonehenge");
            Aja(c, 300, Normaali); Aja(d, 300, Normaali);
            Oleta.Sama(c.Tila(), d.Tila());
        }
    }
}
