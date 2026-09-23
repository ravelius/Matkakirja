// Vartija: sisältöpaketin kokoelma saannot (Siirtoseppä, skeema 1.8+; näyte
// Kultaiset/paketti/saannot.json koepaketista v4) = C#-portin vakiot. Kun web
// muuttaa hintaa tai palkkiota ja paketti viedään uudelleen, tämä kaatuu ja
// kertoo, mikä vakio pitää päivittää (tai lukea paketista). ./kaanna.sh Saannot
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Matkakirja.Peli.Testit
{
    public static class SaannotTestit
    {
        static Dictionary<string, object> Saannot()
        {
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "saannot.json"))));
            return MiniJson.Taulukko(MiniJson.Kentta(juuri, "alkiot")).Select(MiniJson.Objekti)
                .ToDictionary(o => MiniJson.Teksti(o, "id"), o => MiniJson.Kentta(o, "arvo"));
        }

        [Testi] static void LuvutVastaavatVakioita()
        {
            var s = Saannot();
            var odotettu = new Dictionary<string, int>
            {
                ["BUS_FARE"] = Vakiot.BussiHinta, ["FLIGHT_PRICE"] = Vakiot.LentoHinta, ["SEA_FEE"] = Vakiot.MeriHinta,
                ["SEA_FARE"] = Vakiot.MeriHinta, ["START_MONEY"] = Vakiot.AloitusRaha, ["STRANDED_AID"] = Vakiot.HataApu,
                ["TURN_HOURS"] = Vakiot.VuoronTunnit,
                ["EXPLORE_REWARD"] = KysymysVakiot.TutkimusPalkkio, ["FIFTY_FIFTY_PRICE"] = KysymysVakiot.PuolitusHinta,
                ["FLAG_CHOICES"] = KysymysVakiot.LippuVaihtoehdot, ["PHOTO_CHOICES"] = KysymysVakiot.KuvaVaihtoehdot,
                ["HARD_BONUS"] = KysymysVakiot.VaikeaPalkkio, ["HINT_PRICE"] = KysymysVakiot.VihjeHinta,
                ["KAARI_YRITYKSET"] = KysymysVakiot.KaariYritykset, ["KAVERIAPU_HINTA"] = KysymysVakiot.KaveriapuHinta,
                ["QUIZ_SECONDS"] = KysymysVakiot.Sekunnit,
                ["PULLA_HINTA"] = KauppaVakiot.PullaHinta,
                ["RECORD_DAYS"] = LaattaVakiot.EnnatysPaivat, ["STAR_PRIZE"] = LaattaVakiot.PaaaarrePalkkio,
                ["MANNER_AARRE_ARVO"] = LaattaVakiot.MannerAarreArvo,
                ["XP_EXPLORE"] = Kokemus.Tutkiminen, ["XP_HARD_ANSWER"] = Kokemus.VaikeaVastaus, ["XP_NEW_BOARD"] = Kokemus.UusiLauta,
                ["XP_NEW_CITY"] = Kokemus.UusiKaupunki, ["XP_PUZZLE"] = Kokemus.Pulma, ["XP_RECORD"] = Kokemus.Ennatys,
                ["XP_STAR"] = Kokemus.Paaaarre,
            };
            var erot = new List<string>();
            foreach (var kv in odotettu)
            {
                if (!s.TryGetValue(kv.Key, out var a)) { erot.Add(kv.Key + " puuttuu paketista"); continue; }
                if (!(a is double d) || (int)d != kv.Value) erot.Add($"{kv.Key}: paketti {a}, C# {kv.Value}");
            }
            void Vali(string id, int min, int max)
            {
                var o = MiniJson.Objekti(s[id]);
                if ((int)MiniJson.Luku(o, "min") != min || (int)MiniJson.Luku(o, "max") != max) erot.Add($"{id}: paketti {MiniJson.Luku(o, "min")}–{MiniJson.Luku(o, "max")}, C# {min}–{max}");
            }
            Vali("PIENI_AARRE_ARVO", LaattaVakiot.PieniMin, LaattaVakiot.PieniMax);
            Vali("ISO_AARRE_ARVO", LaattaVakiot.IsoMin, LaattaVakiot.IsoMax);
            var painot = MiniJson.Objekti(s["FORM_WEIGHTS"]);
            string[] webNimet = { "quiz", "claim", "photo", "flag", "event" };
            var cs = Kysely.MuotoPainot.ToList();
            Oleta.Sama(webNimet.Length, painot.Count, "FORM_WEIGHTS-avaimet");
            for (int i = 0; i < webNimet.Length; i++)
            {
                // Järjestys on osa arvontaa (Object.entries): sama järjestys ja arvot.
                Oleta.Sama(webNimet[i], painot.Keys.ElementAt(i), "FORM_WEIGHTS-järjestys");
                if ((int)(double)painot[webNimet[i]] != cs[i].Value) erot.Add($"FORM_WEIGHTS.{webNimet[i]}: paketti {painot[webNimet[i]]}, C# {cs[i].Value}");
            }
            if (!Equals(s["MANNERLENTO_ILMOITUS"], KauppaVakiot.MannerlentoIlmoitus)) erot.Add("MANNERLENTO_ILMOITUS-teksti eroaa");
            if (erot.Count > 0) throw new Exception("paketin säännöt ≠ C#: " + string.Join("; ", erot));
        }
    }
}
