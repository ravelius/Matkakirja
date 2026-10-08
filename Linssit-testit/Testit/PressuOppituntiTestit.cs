// VENEYÖN OPPITUNTI PELAAJAN KANNALTA (Linssiseppä 2 Siirtosepän Pressu-ytimelle, 8.10.2026; PT: "lyhty pyyhkäisee, kurkistava pelaaja
// saa varoituksen, piiloutunut ei"; junaan 168). Neljä pelaajaa: piiloutuja (katse alhaalla koko ajan), kurkistaja (katse ylhäällä koko
// ajan), reagoija (kurkistaa, mutta painuu alas varoituksen aikana) ja myöhäinen (painuu alas vasta valon alettua). Lisäksi tulos ei
// riipu kuvataajuudesta, ja oppitunti päättyy veneen matkan aikana (DioraamaSovitin.VeneKestoS 22 s): laiturilla lyhty ei enää pyyhi
// eikä portinvartija sano "Hä?" (SeikkailuVene.Paivita ajetaan myös laiturilla, vene jää kiinnitettynä).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class PressuOppituntiTestit
    {
        public const double VeneKestoS = 22;   // DioraamaSovitin.VeneKestoS (omistaja 8.10.: soutukohtaus lyhyemmäksi)
        const double Ylos = 20, Alas = 0;

        public struct Tulos { public int Nahtiin; public double Opittu; public bool Oppi; public List<double> NahtiinS; }

        /// <summary>Ajaa oppitunnin loppuun (enintään 60 s): katse(aika, vaihe, vaiheS) → pitch.</summary>
        static Tulos Aja(Func<double, PressuVaihe, double, double> katse, Func<int, double> dt = null)
        {
            var p = new Pressu(); var r = new Tulos { Opittu = double.NaN, NahtiinS = new List<double>() }; double t = 0;
            for (int i = 0; t < 60 && p.Vaihe != PressuVaihe.Opittu; i++)
            {
                double d = dt?.Invoke(i) ?? 1 / 60.0;
                p.Paivita(d, katse(t, p.Vaihe, p.VaiheS)); t += d;
                if (p.Nahtiin) { p.Nahtiin = false; r.Nahtiin++; r.NahtiinS.Add(t); }
                if (p.Oppi) { p.Oppi = false; r.Oppi = true; }
            }
            if (p.Vaihe == PressuVaihe.Opittu) r.Opittu = t;
            return r;
        }

        static double Piiloutuja(double t, PressuVaihe v, double s) => Alas;
        static double Kurkistaja(double t, PressuVaihe v, double s) => Ylos;
        /// <summary>Kurkistaa, kunnes valopiiri on kasvanut 1,5 s (varoitus 2 s), sitten pää alas pressun alle.</summary>
        static double Reagoija(double t, PressuVaihe v, double s) => v == PressuVaihe.Valo || v == PressuVaihe.Varoitus && s >= 1.5 ? Alas : Ylos;
        /// <summary>Painuu alas vasta 0,5 s valon alettua.</summary>
        static double Myohainen(double t, PressuVaihe v, double s) => v == PressuVaihe.Valo && s >= 0.5 ? Alas : Ylos;

        [Testi] static void KurkistavaSaaVaroituksenPiiloutunutEi()
        {
            var piilo = Aja(Piiloutuja); var kurkistaja = Aja(Kurkistaja);
            Console.WriteLine($"      piiloutuja: nähtiin {piilo.Nahtiin}, opittu {piilo.Opittu:F1} s; kurkistaja: nähtiin {kurkistaja.Nahtiin} ({string.Join(", ", kurkistaja.NahtiinS.ConvertAll(x => x.ToString("F1")))} s), opittu {kurkistaja.Opittu:F1} s");
            Oleta.Tosi(piilo.Nahtiin == 0 && piilo.Oppi, "piiloutunut: ei 'Hä?', oppi ensimmäisellä pyyhkäisyllä");
            Oleta.Tosi(kurkistaja.Nahtiin == Pressu.Yrityksia && !kurkistaja.Oppi && !double.IsNaN(kurkistaja.Opittu), "kurkistaja: 'Hä?' joka pyyhkäisyllä, sitten läpi ilman rangaistusta");
        }

        [Testi] static void VaroitusAntaaAjanPainuaPiiloon()
        {
            var reagoija = Aja(Reagoija); var myohainen = Aja(Myohainen);
            Oleta.Tosi(reagoija.Nahtiin == 0 && reagoija.Oppi, $"varoituksen aikana alas painunut ei jää kiinni ({reagoija.Nahtiin})");
            Oleta.Tosi(myohainen.Nahtiin >= 1, "valon alettua vielä kurkistava nähdään");
        }

        /// <summary>Nähty ja opittu täsmälleen samat; päättymisaika ±0,5 s (vaihe alkaa nollasta, joten jokainen vaihtuminen hukkaa enintään
        /// yhden ruudun: 9 vaihetta × 1/24 s ≈ 0,4 s; pelaajalle huomaamaton).</summary>
        [Testi] static void KuvataajuusEiMuutaTulosta()
        {
            var vertailu = Aja(Kurkistaja);
            var nopeudet = new (string Nimi, Func<int, double> Dt)[]
            {
                ("30 fps", i => 1 / 30.0), ("120 fps", i => 1 / 120.0), ("vaihteleva", i => i % 3 == 0 ? 1 / 24.0 : 1 / 90.0),
            };
            foreach (var (nimi, dt) in nopeudet)
                foreach (var (pelaaja, katse) in new (string, Func<double, PressuVaihe, double, double>)[] { ("kurkistaja", Kurkistaja), ("reagoija", Reagoija), ("piiloutuja", Piiloutuja) })
                {
                    var a = Aja(katse); var b = Aja(katse, dt);
                    Oleta.Tosi(a.Nahtiin == b.Nahtiin && a.Oppi == b.Oppi && Math.Abs(a.Opittu - b.Opittu) <= 0.5, $"{nimi} {pelaaja}: nähtiin {b.Nahtiin}/{a.Nahtiin}, opittu {b.Opittu:F2}/{a.Opittu:F2} s");
                }
        }

        [Testi] static void OppituntiPaattyyVeneMatkalla()
        {
            var vikoja = new List<string>();
            foreach (var (pelaaja, katse) in new (string, Func<double, PressuVaihe, double, double>)[] { ("piiloutuja", Piiloutuja), ("reagoija", Reagoija), ("myöhäinen", Myohainen), ("kurkistaja", Kurkistaja) })
            {
                var r = Aja(katse);
                double viimeinen = r.NahtiinS.Count > 0 ? r.NahtiinS[r.NahtiinS.Count - 1] : 0;
                Console.WriteLine($"      {pelaaja}: opittu {r.Opittu:F1} s, viimeinen 'Hä?' {viimeinen:F1} s (vene perillä {VeneKestoS:F0} s)");
                if (!(r.Opittu <= VeneKestoS)) vikoja.Add($"{pelaaja} opittu {r.Opittu:F1} s");
            }
            Oleta.Tosi(vikoja.Count == 0, $"oppitunti jatkuu laiturille (lyhty pyyhkii ja 'Hä?' pelaajan katseesta laiturilla): {string.Join("; ", vikoja)}");
        }
    }
}
