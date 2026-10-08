// PALLON ÄÄNIMAISEMA (8.10.): Pelikoodarin manifesti (kultainen kopio), silmukat korvaavat liikenteen ja sataman kerrokset,
// kerta-äänten välit ja korkeusvaimennus.
using System;
using Matkakirja.Linssit.Aanet;

namespace Matkakirja.Linssit.Testit
{
    public static class PalloAanimaisemaTestit
    {
        [Testi] static void ManifestiJaKorvaukset()
        {
            var m = PalloAanimaisema.Lue(System.IO.File.ReadAllText("kultaiset/pallo-aanimaisema-v1.json"));
            Oleta.Tosi(m.Kaupungit.ContainsKey("tukholma") && m.Kaupungit.ContainsKey("pariisi"), "kehityskaupungit");
            Oleta.Sama("tukholma/humina.mp3", m.KerroksenPolku("tukholma", KaupunkiAanimaisema.LiikenneHiljainen), "Tukholman humina");
            Oleta.Sama("tukholma/lokit.mp3", m.KerroksenPolku("Tukholma", KaupunkiAanimaisema.Satama), "lokit satamaan");
            Oleta.Sama("pariisi/humina.mp3", m.KerroksenPolku("pariisi", KaupunkiAanimaisema.LiikenneHiljainen), "Pariisin humina");
            Oleta.Tosi(m.KerroksenPolku("pariisi", KaupunkiAanimaisema.Satama) == null && m.KerroksenPolku("praha", KaupunkiAanimaisema.LiikenneHiljainen) == null, "muut ennallaan");
            int kerta = 0; foreach (var a in m.Kaupungit["tukholma"]) if (!a.Silmukka) kerta++;
            Oleta.Sama(3, kerta, "Tukholman kerta-äänet");
            var r = new Random(1);
            for (int i = 0; i < 200; i++)
            {
                double k = PalloAanimaisema.Vali("kellot", r), v = PalloAanimaisema.Vali("vene-ohi", r);
                Oleta.Tosi(k >= 120 && k <= 240 && v >= 60 && v <= 180, "välit");
            }
            Oleta.Tosi(PalloAanimaisema.Korkeudella(100) == 1 && Math.Abs(PalloAanimaisema.Korkeudella(1000) - 0.3) < 1e-9, "korkeus");
            // Seinen äänet omasta kansiostaan Pariisiin: kujerrus omana silmukkana, kerta-äänet omin välein, osoite juuren kanssa.
            var seine = PalloAanimaisema.Lue("{\"kaupungit\":{\"pariisi\":[{\"tunnus\":\"kyyhkyt-kujerrus\",\"aani\":\"pariisi/kyyhkyt-kujerrus.mp3\",\"silmukka\":true,\"kesto_s\":30},"
                + "{\"tunnus\":\"bateau-ohi\",\"aani\":\"pariisi/bateau-ohi.mp3\",\"silmukka\":false,\"kesto_s\":58}]}}", "https://x/seine/");
            m.Yhdista(seine);
            var omat = new System.Collections.Generic.List<PalloAanimaisema.Aani>(m.OmatSilmukat("pariisi"));
            Oleta.Tosi(omat.Count == 1 && omat[0].Osoite == "https://x/seine/pariisi/kyyhkyt-kujerrus.mp3", "kujerrus omana silmukkana");
            Oleta.Sama("pariisi/humina.mp3", m.KerroksenPolku("pariisi", KaupunkiAanimaisema.LiikenneHiljainen), "humina ennallaan");
            double b0 = PalloAanimaisema.Vali("bateau-ohi", r), t0 = PalloAanimaisema.Vali("laivan-torvi", r);
            Oleta.Tosi(b0 >= 120 && b0 <= 240 && t0 >= 240 && t0 <= 480, "Seinen välit");
        }
    }
}
