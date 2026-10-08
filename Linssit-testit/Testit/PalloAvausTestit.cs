// PALLON ESITYKSEN ALKU (omistaja TF 168, 9.10.: "parin kertojan lauseen jälkeen kip kääntyy kovalla vauhdilla 180 astetta ja matkaa
// seinen puolelta toiselle ihan turhaan … vauhti alkaa ja loppuu melkein seinään"): kaupunkitilan avaus kuten sovittimessa
// (avausnäkymä 1 100 m / 50° kohti 1. kohdetta, siirtoruutu, avaus, sitten kierros) Pariisissa ja Tukholmassa. Ensimmäinen lento:
// suunnan muutos pieni, kääntö ≤ PalloKaantoAstS, silmä jää kohteen samalle puolelle (ei joen ylitystä), kiihtyvyys ja nykäys rajattuja.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class PalloAvausTestit
    {
        const double Dt = 1 / 30.0;
        public sealed class Tulos { public double SuuntaMuutos, Kaanto, Kiihtyvyys, Nykays, PuoliDot; public bool Perilla; }

        public static Tulos Mittaa(string kaupunki)
        {
            var c = PalloKaupungitTestit.Lue().First(x => x.Id == kaupunki);
            bool vanha = OpasSilmukka.PalloLento; OpasSilmukka.PalloLento = true;
            try
            {
                var s = new OpasSilmukka(OpasSilmukka.Avauskuva(c.Lat + 3, c.Lon)) { AvausEtaisyysOhitus = 1100, AvausKallistusOhitus = 50, PyynnotSeis = true };   // kartalta kaukaa (siirto)
                double t = 0; var vastaukset = new List<(double t, int n, string toive)>();
                s.Pyyda += (n, toive) => vastaukset.Add((t + 2, n, toive));
                s.LatausEdistys = () => 1;
                s.Aloita(c.Nimi);
                s.VaihdaPaikka(c.Lat, c.Lon, c.Nimi);
                var eka = c.Kohteet[0]; bool kohdistettu = false, kierros = false; double avausLoppu = double.NaN;
                var r = new List<(double t, double e, double n, double u, double suunta, OpasVaihe v, string k)>();
                for (int i = 0; i < 30 * 120; i++)
                {
                    t += Dt;
                    if (!kohdistettu && s.Siirtymassa) kohdistettu = s.KohdistaAvausKohteeseen(eka.Nimi, eka.Lat, eka.Lon);
                    if (double.IsNaN(avausLoppu) && !s.Siirtymassa && kohdistettu) avausLoppu = t + 19;   // avauksen ääni ~19 s
                    if (!kierros && !double.IsNaN(avausLoppu) && t >= avausLoppu) { kierros = true; s.PyynnotSeis = false; s.AloitaKierros(c.Kohteet.Select(k => (k.Nimi, k.Lat, k.Lon)).ToList()); }
                    for (int j = vastaukset.Count - 1; j >= 0; j--)
                    {
                        if (vastaukset[j].t > t) continue;
                        var v = vastaukset[j]; vastaukset.RemoveAt(j);
                        var k = Array.Find(c.Kohteet, x => x.Nimi == v.toive);
                        if (k != null) s.Vastaus(v.n, new OpasKohde { Id = k.Id, Nimi = k.Nimi, Lat = k.Lat, Lon = k.Lon, KokoM = k.KokoM, KorkeusM = k.KorkeusM, Luokka = k.Luokka, KestoS = k.KestoS, Kierros = true });
                    }
                    s.Paivita(Dt, _ => 35, () => true);
                    var e = OpasKuvaus.KameraPaikka(s.Asento, c.Lat, c.Lon);
                    r.Add((t, e.e, e.n, e.u, s.Asento.Suuntima, s.Vaihe, s.Nykyinen?.Id));
                    if (kierros && s.Vaihe == OpasVaihe.Puhuu && s.Nykyinen?.Id == eka.Id) break;
                }
                var tulos = new Tulos { Perilla = r.Count > 0 && r[^1].v == OpasVaihe.Puhuu };
                // Avauksen alusta (siirtymän jälkeen) 1. kohteen saapumiseen.
                int a = r.FindIndex(x => x.t >= avausLoppu - 19 + 0.5), b = r.Count - 1;   // siirron sauma (kamera avauskehyksessä) ohi
                if (a < 1) return tulos;
                tulos.SuuntaMuutos = Math.Abs(KierrosLento.Kiedo(r[b].suunta - r[a].suunta));
                var (ke, kn) = ((eka.Lon - c.Lon) * 6371000 * Math.Cos(c.Lat * Math.PI / 180) * Math.PI / 180, (eka.Lat - c.Lat) * 6371000 * Math.PI / 180);
                double ae = r[a].e - ke, an = r[a].n - kn, be = r[b].e - ke, bn = r[b].n - kn;
                tulos.PuoliDot = (ae * be + an * bn) / Math.Max(1, Math.Sqrt(ae * ae + an * an) * Math.Sqrt(be * be + bn * bn));
                (double, double, double) V(int k) => ((r[k].e - r[k - 1].e) / Dt, (r[k].n - r[k - 1].n) / Dt, (r[k].u - r[k - 1].u) / Dt);
                // Kiihtyvyys ja nykäys 0,5 s:n liukuvasta keskiarvosta (yksittäisten ruutujen kohina pois).
                var vs = new List<(double, double, double)>(); for (int k = a + 1; k <= b; k++) vs.Add(V(k));
                int w = 15; var vm = new List<(double x, double y, double z)>();
                for (int k = 0; k + w <= vs.Count; k++) vm.Add((vs.Skip(k).Take(w).Average(q => q.Item1), vs.Skip(k).Take(w).Average(q => q.Item2), vs.Skip(k).Take(w).Average(q => q.Item3)));
                var am = new List<(double x, double y, double z)>();
                for (int k = 1; k < vm.Count; k++) am.Add(((vm[k].x - vm[k - 1].x) / Dt, (vm[k].y - vm[k - 1].y) / Dt, (vm[k].z - vm[k - 1].z) / Dt));
                double P((double x, double y, double z) q) => Math.Sqrt(q.x * q.x + q.y * q.y + q.z * q.z);
                tulos.Kiihtyvyys = am.Count > 0 ? am.Max(P) : 0;
                for (int k = w; k < am.Count; k++) tulos.Nykays = Math.Max(tulos.Nykays, P((am[k].x - am[k - w].x, am[k].y - am[k - w].y, am[k].z - am[k - w].z)) / (w * Dt));
                for (int k = a + 1; k <= b; k++) tulos.Kaanto = Math.Max(tulos.Kaanto, Math.Abs(KierrosLento.Kiedo(r[k].suunta - r[k - 1].suunta)) / Dt);
                if (Environment.GetEnvironmentVariable("AVAUS_DEBUG") == "1")
                    for (int k = a + 1; k <= b; k++) { var v = V(k); double sp = Math.Sqrt(v.Item1 * v.Item1 + v.Item2 * v.Item2 + v.Item3 * v.Item3); if (k % 15 == 0 || sp > 200) Console.WriteLine($"        t {r[k].t:F1} {r[k].v} {r[k].k} nopeus {sp:F1} suunta {r[k].suunta:F0} korkeus {r[k].u:F0}"); }
                return tulos;
            }
            finally { OpasSilmukka.PalloLento = vanha; }
        }

        [Testi] static void AvausJaEnsimmainenLento()
        {
            foreach (var kaupunki in new[] { "pariisi", "tukholma" })
            {
                var m = Mittaa(kaupunki);
                Console.WriteLine($"      {kaupunki}: suunnan muutos {m.SuuntaMuutos:F0}°, kääntö {m.Kaanto:F1} °/s, puoli {m.PuoliDot:F2}, kiihtyvyys {m.Kiihtyvyys:F2} m/s², nykäys {m.Nykays:F2} m/s³, perillä {m.Perilla}");
                Oleta.Tosi(m.Perilla, kaupunki + ": perillä 1. kohteessa");
                Oleta.Tosi(m.SuuntaMuutos < 60, $"{kaupunki}: suunnan muutos {m.SuuntaMuutos:F0}° (ei 180°:n käännöstä)");
                Oleta.Tosi(m.PuoliDot > 0, $"{kaupunki}: silmä kohteen samalla puolella (ei joen ylitystä), {m.PuoliDot:F2}");
                Oleta.Tosi(m.Kaanto <= OpasSilmukka.PalloKaantoAstS + 0.5, $"{kaupunki}: kääntö {m.Kaanto:F1} °/s");
                Oleta.Tosi(m.Kiihtyvyys < 2.0, $"{kaupunki}: kiihtyvyys {m.Kiihtyvyys:F2} m/s²");
                Oleta.Tosi(m.Nykays < 1.5, $"{kaupunki}: nykäys {m.Nykays:F2} m/s³");
            }
        }
    }
}
