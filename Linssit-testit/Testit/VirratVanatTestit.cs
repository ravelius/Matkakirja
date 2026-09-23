// Kultaiset testit: vanat edeltäjäketjusta, vanan pituus ja aineiston
// lukija (web js/aikajana-virrat-laskenta.js johdaVanat; sisältöpaketin
// LINSSI.aikajana.virrat -muoto).
using System.Collections.Generic;
using Matkakirja.Linssit.Virrat;
using static Matkakirja.Linssit.Testit.VirratApu;

namespace Matkakirja.Linssit.Testit
{
    public static class VirratVanatTestit
    {
        [Testi] static void VanatSamatKarkiKarjelta()
        {
            var tulos = Vanat.JohdaVanat(Laskettu, Aineisto.Vanat, Maa, pysakit: Aineisto.Pysakit);
            var odotettu = O(Kultaiset, "vanat");
            var vanat = L(odotettu, "vanat");
            Oleta.Sama(vanat.Count, tulos.Vanat.Count, "vanoja");
            for (var n = 0; n < vanat.Count; n += 1)
            {
                var o = O(vanat[n]);
                var v = tulos.Vanat[n];
                var nimi = S(o, "tunnus");
                Oleta.Sama(nimi, v.Tunnus, "vanan #" + n + " tunnus");
                Oleta.Sama(S(o, "virta"), v.Virta, nimi + " virta");
                Oleta.Sama(D(o["paksuus"]), v.Paksuus, nimi + " paksuus");
                var pisteet = L(o, "pisteet");
                var virrat = L(o, "virrat");
                Oleta.Sama(pisteet.Count, v.Pisteet.Count, nimi + " kärkiä");
                for (var k = 0; k < pisteet.Count; k += 1)
                {
                    var p = L(pisteet[k]);
                    Oleta.Sama(D(p[0]), v.Pisteet[k].Lat, $"{nimi}[{k}].lat");
                    Oleta.Sama(D(p[1]), v.Pisteet[k].Lon, $"{nimi}[{k}].lon");
                    Oleta.Sama(D(p[2]), v.Pisteet[k].Aika, $"{nimi}[{k}].aika");
                    Oleta.Sama((string)virrat[k], v.Virrat[k], $"{nimi}[{k}].virta");
                }
            }
            var pesat = L(odotettu, "kotipesat");
            Oleta.Sama(pesat.Count, tulos.Kotipesat.Count, "kotipesiä");
            for (var n = 0; n < pesat.Count; n += 1)
            {
                var o = O(pesat[n]);
                var p = tulos.Kotipesat[n];
                Oleta.Sama(S(o, "tunnus"), p.Tunnus);
                Oleta.Sama(D(o["lat"]), p.Lat);
                Oleta.Sama(D(o["lon"]), p.Lon);
                Oleta.Sama(D(o["aika"]), p.Aika);
                Oleta.Sama(D(o["sade"]), p.Sade);
            }
            var pituudet = L(Kultaiset, "pituudet");
            for (var n = 0; n < pituudet.Count; n += 1)
                Lahella(D(pituudet[n]), Vanat.VananPituusKm(tulos.Vanat[n].Pisteet), tulos.Vanat[n].Tunnus + " pituus km");
        }

        [Testi] static void VanaKm()
        {
            foreach (var a in L(Kultaiset, "vanaKm"))
            {
                var r = L(a);
                Lahella(D(r[4]), Vanat.VanaKm(D(r[0]), D(r[1]), D(r[2]), D(r[3])), "vanaKm");
            }
        }

        [Testi] static void TyhjatSyotteetEivatKaada()
        {
            Oleta.Sama(0, Vanat.JohdaVanat(null, Aineisto.Vanat, Maa).Vanat.Count);
            Oleta.Sama(0, Vanat.JohdaVanat(Laskettu, null, Maa).Vanat.Count);
            Oleta.Sama(0, Vanat.JohdaVanat(Laskettu, Aineisto.Vanat, null).Kotipesat.Count);
        }

        [Testi] static void LukijaTayttaaLohkon()
        {
            var a = Aineisto;
            Oleta.Sama(5, a.Virrat.Length);
            Oleta.Sama("paavirta", a.Virrat[0].Tunnus);
            Oleta.Sama(3, a.Virrat[0].Nopeus.Taulu.Length);
            Oleta.Sama(0.45, a.Virrat[0].Sisamaa);
            Oleta.Sama(1.5, a.Virrat[0].Reuna, "oletusreuna");
            Oleta.Sama(1.2, a.Virrat[1].Nopeus.Vakio);
            var tiibet = a.Virrat[0].Portit[4];
            Oleta.Sama(3.0, tiibet.Reuna.Value);
            Oleta.Sama(30000.0, tiibet.Luisu.Vuodet.Value);
            Oleta.Sama(false, tiibet.LuisuPois);
            Oleta.Sama(null, a.Virrat[0].Portit[0].Luisu, "puuttuva luisu → oletus");
            Oleta.Sama("siperia", a.Virrat[3].LahteetToisesta[0].Virta);
            Oleta.Sama(3, a.Virrat[3].Vari.Liuku.Length);
            Oleta.Sama(7, a.Virrat[4].Nauhat.Length);
            Oleta.Sama(60.0, a.Virrat[4].Nauhat[6].MeriSade.Value);
            Oleta.Sama(false, a.Virrat[4].Nauhat[0].MeriSade.HasValue);
            Oleta.Sama(0.6, a.Retki.Peitto.Value);
            Oleta.Sama(2, a.Retki.Sammuu.Length);
            Oleta.Sama(128, a.Vanha.Rgb[0]);
            Oleta.Sama(0.34, a.Vanha.VariPeitto);
            Oleta.Sama(0.42, a.Peitto.Meri);
            Oleta.Sama(720, a.Maamaski.Leveys);
            Oleta.Sama("amerikat", a.Vanat.Selkaranka.Virta);
            Oleta.Sama("selkaranka", a.Vanat.Selkaranka.Tunnus);
            Oleta.Sama(9, a.Vanat.Haarat.Length);
            Oleta.Sama("tyynimeri", a.Vanat.Nauhat);
            Oleta.Sama(16, a.Vanat.Kaista.Alueet.Length);
            Oleta.Sama(Aineisto.Pysakit.Length > 0, true);
            Oleta.Sama(null, a.Piirtokerroin);
        }

        [Testi] static void LukijaLukeeLinssinExportin()
        {
            // Sisältöpaketin muoto: LINSSI-olio, jonka aikajana.virrat on lohko.
            var linssi = new Dictionary<string, object>
            {
                ["tunnus"] = "ihmisen-matka",
                ["aikajana"] = new Dictionary<string, object> { ["virrat"] = AineistoJson },
            };
            var a = AineistonLukija.LueLinssista(linssi);
            Oleta.Sama(Aineisto.Maamaski.Juoksut, a.Maamaski.Juoksut);
            Oleta.Sama(Aineisto.Virrat.Length, a.Virrat.Length);
            Oleta.Heittaa<System.FormatException>(() => AineistonLukija.Lue(new List<object>()));
        }
    }
}
