// M-OSAN VIHJEPORTAAT (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md kohta 5, huoneet 6–10): MVihjeet antaa jokaisessa
// huoneessa vähintään kaksi peräkkäistä kohdetta, kaikki kohteet ovat PelattavaPala.Versio-datassa, huone ja vaihe etenevät kurinalaisen M-kulun mukana
// (MOsanJumiTestit.MKulku oikeilla ytimillä), ja muurikäytävän varjo valitaan pelaajan edestä.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class MVihjeetTestit
    {
        static (double X, double Y, double Z) R(int n) => Huonesimulaatio.Reitti[n - 1];   // reitti:pelaaja-n

        static MEdistys Edistys(MOsanJumiTestit.MKulku m)
        {
            int seuraava = -1; for (int i = 0; i < m.Komero.Tiilet.Maara; i++) if (!m.Komero.Tiilet.Irti(i)) { seuraava = i; break; }
            return new MEdistys
            {
                Naamio = m.Naamio, KulhoKadessa = m.KulhoKadessa, KulhoPoydalla = m.KulhoPoydalla, Avaimet = m.Avaimet, OviAuki = m.OviAuki,
                Koysikieppi = m.Koysikieppi, KoysiSakarassa = m.KoysiSakarassa, KiipeilyValmis = m.KiipeilyValmis, ArkkuAuki = m.Komero.Auki,
                Ote = m.Kiipeily?.Ote ?? 0, SeuraavaTiili = seuraava, Kilpi1 = m.Komero.Lukko.Kilpi1, Kilpi2 = m.Komero.Lukko.Kilpi2,
                KilpiTavoite = m.Komero.Lukko.TavoiteAste, KilpiSallittu = m.Komero.Lukko.SallittuAste, Pako = m.Pako.Vaihe,
            };
        }

        /// <summary>Pelaajan paikka huoneen ja edistyksen mukaan (M-kulku ei mallinna paikkaa): Linnantupa, muuriportaat / muurikäytävä / harja, komero.</summary>
        static (double X, double Y, double Z) Paikka(in MEdistys e) =>
            MVihjeet.Huone(e) == 6 ? R(51) : MVihjeet.Huone(e) == 7 ? (!e.OviAuki ? R(69) : R(83)) : MVihjeet.Huone(e) == 8 ? R(90) : R(93);

        [Testi] static void JokaisessaHuoneessaVihjeportaatDatanMerkeista()
        {
            var d = Huonesimulaatio.Data; var m = new MOsanJumiTestit.MKulku();
            var kohteet = new Dictionary<int, List<string>>(); int edHuone = 6, edVaihe = -1; int askelia = 0;
            for (int n = 0; n < 20000 && !m.Valmis; n++)
            {
                var e = Edistys(m); var p = Paikka(e);
                int huone = MVihjeet.Huone(e); string kohde = MVihjeet.Kohde(e, d, p.X, p.Y, p.Z);
                Oleta.Tosi(huone >= edHuone, $"huone ei taannu ({edHuone} → {huone})");
                if (kohde != null)
                {
                    Oleta.Tosi(MVihjeet.Paikka(d, kohde) != null, $"huone {huone}: kohde {kohde} puuttuu datasta");
                    if (!kohteet.TryGetValue(huone, out var l)) kohteet[huone] = l = new List<string>();
                    if (l.Count == 0 || l[l.Count - 1] != kohde) l.Add(kohde);
                }
                int vaihe = MVihjeet.Vaihe(e); if (vaihe > edVaihe) askelia++;
                edHuone = huone; edVaihe = vaihe;
                var t = m.Seuraava(); if (!m.Tee(t) && t != MOsanJumiTestit.MTeko.Odota) m.Tee(MOsanJumiTestit.MTeko.Odota);
            }
            foreach (var kv in kohteet) Console.WriteLine($"      huone {kv.Key}: {string.Join(" → ", kv.Value)}");
            for (int h = 6; h <= 10; h++) Oleta.Tosi(kohteet.TryGetValue(h, out var l) && l.Count >= 2, $"huone {h}: vähintään 2 vihjekohdetta");
            Oleta.Tosi(askelia >= 20, $"vaihe eteni ({askelia} askelta)");
        }

        [Testi] static void Huone7MuuriportaatOviJaVarjoEdesta()
        {
            var d = Huonesimulaatio.Data;
            var e = new MEdistys { Naamio = true, KulhoPoydalla = true, Avaimet = true, SeuraavaTiili = 0, KilpiTavoite = 45, KilpiSallittu = 10 };
            Oleta.Sama("piilo:muuriporras-2-komero", MVihjeet.Kohde(e, d, R(69).X, R(69).Y, R(69).Z), "muuriportailla komero");
            Oleta.Sama("ovi:muurikaytava", MVihjeet.Kohde(e, d, R(80).X, R(80).Y, R(80).Z), "ampumakäytävässä ovi");
            e.OviAuki = true;
            Oleta.Sama("piilo:muurikaytava-vali-1", MVihjeet.Kohde(e, d, R(82).X, R(82).Y, R(82).Z), "ovelta ensimmäinen varjo");
            Oleta.Sama("piilo:muurikaytava-vali-2", MVihjeet.Kohde(e, d, R(83).X, R(83).Y, R(83).Z), "ensimmäiseltä välistä seuraava edessä");
            Oleta.Sama("kiipeily:tikkaat-harja", MVihjeet.Kohde(e, d, R(86).X, R(86).Y, R(86).Z), "varjojen jälkeen tikkaat");
            Oleta.Sama("esine:koysikieppi", MVihjeet.Kohde(e, d, R(88).X, R(88).Y, R(88).Z), "harjalla köysikieppi");
        }
    }
}
