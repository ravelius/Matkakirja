// HISTORIAMOOTTORI M-OSA: TALLENNETTAVA TILA (Siirtoseppä 8.10.2026; pelattavuusmalli 4.3 ja 8.2). Huoneiden 6–10 eteneminen nykyiseen
// tallennusmuotoon (ei uutta versiota): laukku "puettu:esiliina", "puettu:myssy", "avainrengas"; avatut ovet "ovi:<tunnus>"; arvoitus
// "m-kulho" (kulho voudin pöydällä), "m-koysi" (köysi sakarassa), "m-tiilet" (irti olevat bittinä), "m-kilpi-1/2" (asteet), "m-arkku"
// (auki), "m-kello" (hälytys soinut: pako alkaa krampista). Kiipeily, köysilasku ja ohjatut jaksot eivät tallennu: jatko tarkistuspisteestä.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Seikkailu
{
    public sealed class MTila
    {
        public readonly HashSet<string> Puettu = new HashSet<string>(StringComparer.Ordinal);
        public readonly HashSet<string> AvatutOvet = new HashSet<string>(StringComparer.Ordinal);
        public bool Avainrengas, Kulho, Koysi, Arkku, Kello;
        public int Tiilet;
        public double Kilpi1, Kilpi2;
        public bool Naamio => Puettu.Contains("esiliina") && Puettu.Contains("myssy");

        /// <summary>Kirjoittaa tilan tallennukseen (korvaa aiemmat M-avaimet; muut kentät ennallaan).</summary>
        public void Kirjoita(SeikkailuTallennus t)
        {
            t.Laukku.RemoveAll(x => x.StartsWith("puettu:", StringComparison.Ordinal) || x == "avainrengas");
            foreach (var p in Puettu) t.Laukku.Add("puettu:" + p);
            if (Avainrengas) t.Laukku.Add("avainrengas");
            t.AvatutOvet.RemoveAll(x => x.StartsWith("ovi:", StringComparison.Ordinal));
            foreach (var o in AvatutOvet) t.AvatutOvet.Add("ovi:" + o);
            var a = t.Arvoitus;
            foreach (var k in new[] { "m-kulho", "m-koysi", "m-tiilet", "m-kilpi-1", "m-kilpi-2", "m-arkku", "m-kello" }) a.Remove(k);
            if (Kulho) a["m-kulho"] = 1;
            if (Koysi) a["m-koysi"] = 1;
            if (Tiilet != 0) a["m-tiilet"] = Tiilet;
            if (Kilpi1 != 0) a["m-kilpi-1"] = (int)Math.Round(Kilpi1);
            if (Kilpi2 != 0) a["m-kilpi-2"] = (int)Math.Round(Kilpi2);
            if (Arkku) a["m-arkku"] = 1;
            if (Kello) a["m-kello"] = 1;
        }

        public static MTila Lue(SeikkailuTallennus t)
        {
            var m = new MTila();
            if (t == null) return m;
            foreach (var x in t.Laukku)
            {
                if (x.StartsWith("puettu:", StringComparison.Ordinal)) m.Puettu.Add(x.Substring(7));
                else if (x == "avainrengas") m.Avainrengas = true;
            }
            foreach (var o in t.AvatutOvet) if (o.StartsWith("ovi:", StringComparison.Ordinal)) m.AvatutOvet.Add(o.Substring(4));
            int A(string k) => t.Arvoitus.TryGetValue(k, out var v) ? v : 0;
            m.Kulho = A("m-kulho") != 0; m.Koysi = A("m-koysi") != 0; m.Arkku = A("m-arkku") != 0; m.Kello = A("m-kello") != 0;
            m.Tiilet = A("m-tiilet"); m.Kilpi1 = A("m-kilpi-1"); m.Kilpi2 = A("m-kilpi-2");
            return m;
        }
    }
}
